import { create } from 'zustand'
import { scrollToProgress } from '../../home/lib/journeyRig.js'
import { contact } from '../../../shared/config/contact.js'
import { HOBBY_TOTAL } from '../../../shared/hobbies/hobbies.constants.js'
import { knownFound, useHobbiesStore } from '../../../shared/hobbies/hobbies.store.js'
import { useLocaleStore } from '../../../shared/i18n/locale.store.js'
import { postChat, sanitizeChatText, SILI_MAX_CHARS, SILI_MAX_MESSAGES, SILI_SUMMARY_MAX } from '../api/sili.api.js'
import { destinationById, floorProgress } from '../destinations.js'

const STORAGE_KEY = 'sili-thread'
const LEGACY_KEY = 'sili-chat-turns'
const HISTORY_CAP = 400
const SECRET_LOCKED_REPLY = 'La sala secreta sigue cerrada.'
const SECRET_LOCKED_NOTE = 'Sala secreta. Se abre con los hobbies del recorrido.'

function emptyThread() {
  return { messages: [], summary: '', summarizedCount: 0, placeNote: null }
}

function capThread(messages, summarizedCount) {
  if (messages.length <= HISTORY_CAP) {
    return { messages, summarizedCount: Math.min(summarizedCount, messages.length) }
  }
  const dropped = messages.length - HISTORY_CAP
  const next = messages.slice(dropped)
  return { messages: next, summarizedCount: Math.max(0, Math.min(summarizedCount - dropped, next.length)) }
}

function readThread() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return normalizeThread(JSON.parse(raw))
  } catch {
    // localStorage puede estar bloqueado.
  }
  const legacy = readLegacy()
  if (!legacy.length) return emptyThread()
  const thread = { messages: legacy, summary: '', summarizedCount: 0, placeNote: null }
  writeThread(thread)
  return thread
}

function readLegacy() {
  try {
    const raw = sessionStorage.getItem(LEGACY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((item) => item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string')
      .map((item) => ({ role: item.role, content: sanitizeChatText(item.content) }))
      .filter((item) => item.content)
  } catch {
    return []
  }
}

function normalizeThread(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return emptyThread()
  const messages = Array.isArray(value.messages)
    ? value.messages
      .filter((item) => item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string')
      .map((item) => ({ role: item.role, content: sanitizeChatText(item.content) }))
      .filter((item) => item.content)
    : []
  const summary = sanitizeChatText(typeof value.summary === 'string' ? value.summary : '', SILI_SUMMARY_MAX)
  const summarizedCount = Number.isInteger(value.summarizedCount) && value.summarizedCount > 0 ? value.summarizedCount : 0
  const placeNote = typeof value.placeNote === 'string' && value.placeNote.trim() ? value.placeNote.trim().slice(0, 180) : null
  return { ...capThread(messages, summarizedCount), summary, placeNote }
}

function writeThread(thread) {
  try {
    const capped = capThread(thread.messages, thread.summarizedCount)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      messages: capped.messages,
      summary: thread.summary,
      summarizedCount: capped.summarizedCount,
      placeNote: thread.placeNote,
    }))
    sessionStorage.removeItem(LEGACY_KEY)
  } catch {
    // Si el almacenamiento falla, el hilo sigue en memoria.
  }
}

function onHome() {
  const path = window.location.pathname
  return path === '/' || path === ''
}

function secretOpen() {
  return knownFound(useHobbiesStore.getState().found).length >= HOBBY_TOTAL
}

function goTo(destination) {
  if (destination.move.type === 'floor') {
    if (destination.id === 'secret' && !secretOpen()) return 'locked'
    const progress = floorProgress(destination.move.floorId)
    if (typeof progress !== 'number') return 'invalid'
    if (onHome()) scrollToProgress(progress)
    else openPath(`/?at=${progress}`)
    return 'moved'
  }
  if (destination.move.type !== 'route') return 'invalid'
  const path = destination.move.path
  if (typeof path !== 'string' || !path.startsWith('/') || path.startsWith('//')) return 'invalid'
  openPath(path)
  return 'moved'
}

function openPath(path) {
  const next = new URL(path, window.location.origin)
  if (next.origin !== window.location.origin) return
  if (`${next.pathname}${next.search}` === `${window.location.pathname}${window.location.search}`) return
  window.history.pushState({}, '', `${next.pathname}${next.search}`)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function clampCovered(covered, sent) {
  if (!Number.isInteger(covered) || covered < 0) return 0
  return Math.min(covered, sent)
}

function applyResult(result) {
  const destination = destinationById(result.destination)
  if (!destination) {
    const reply = typeof result.reply === 'string' ? result.reply.trim().slice(0, 1500) : ''
    return { reply, placeNote: null }
  }
  const movement = goTo(destination)
  if (movement === 'locked') return { reply: SECRET_LOCKED_REPLY, placeNote: SECRET_LOCKED_NOTE }
  if (movement !== 'moved') return { reply: '', placeNote: null }
  if (destination.id === 'contacto' && contact.email) {
    window.location.href = `mailto:${contact.email}`
  }
  return { reply: `Te llevé a ${destination.label}.`, placeNote: destination.hint }
}

const initial = typeof window === 'undefined' ? emptyThread() : readThread()

export const useSiliStore = create((set, get) => ({
  status: 'idle',
  messages: initial.messages,
  summary: initial.summary,
  summarizedCount: initial.summarizedCount,
  placeNote: initial.placeNote,
  notice: null,
  epoch: 0,
  armWake: false,
  woke: false,

  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      sessionStorage.removeItem(LEGACY_KEY)
    } catch {
      // El estado en memoria queda vacío aunque el almacenamiento falle.
    }
    set({
      status: 'idle',
      messages: [],
      summary: '',
      summarizedCount: 0,
      placeNote: null,
      notice: null,
      epoch: get().epoch + 1,
      armWake: false,
      woke: false,
    })
  },

  send: async (raw) => {
    const content = sanitizeChatText(raw, SILI_MAX_CHARS)
    if (!content) return
    const current = get()
    if (current.status === 'thinking' || current.status === 'waking') return

    const waking = current.armWake && !current.woke
    const capped = capThread([...current.messages, { role: 'user', content }], current.summarizedCount)
    const epoch = current.epoch
    set({
      status: waking ? 'waking' : 'thinking',
      messages: capped.messages,
      summarizedCount: capped.summarizedCount,
      placeNote: null,
      notice: null,
      armWake: false,
      woke: waking || current.woke,
    })
    writeThread({ ...capped, summary: current.summary, placeNote: null })

    const pending = capped.messages.slice(capped.summarizedCount)
    const skipped = Math.max(0, pending.length - SILI_MAX_MESSAGES)
    const payload = pending.slice(skipped)

    try {
      const lang = useLocaleStore.getState().lang === 'en' ? 'en' : 'es'
      const result = await postChat({ messages: payload, summary: current.summary, lang })
      if (get().epoch !== epoch) return
      const applied = applyResult(result)
      const nextCount = Math.min(
        capped.messages.length,
        capped.summarizedCount + skipped + clampCovered(result.covered, payload.length),
      )
      const stored = capThread(
        applied.reply ? [...capped.messages, { role: 'assistant', content: applied.reply }] : capped.messages,
        nextCount,
      )
      const thread = {
        messages: stored.messages,
        summary: sanitizeChatText(result.summary, SILI_SUMMARY_MAX),
        summarizedCount: stored.summarizedCount,
        placeNote: applied.placeNote || result.gapsHint || null,
      }
      set({
        status: 'idle',
        ...thread,
        notice: null,
        armWake: false,
        woke: false,
      })
      writeThread(thread)
    } catch (error) {
      if (get().epoch !== epoch) return
      const kind = error && typeof error.kind === 'string' ? error.kind : 'fail'
      const woke = get().woke
      const covered = clampCovered(error?.covered, payload.length)
      const summary = typeof error?.summary === 'string'
        ? sanitizeChatText(error.summary, SILI_SUMMARY_MAX)
        : current.summary
      const stored = capThread(capped.messages, capped.summarizedCount + skipped + covered)
      const thread = {
        messages: stored.messages,
        summary,
        summarizedCount: stored.summarizedCount,
        placeNote: null,
      }
      set({
        status: 'error',
        ...thread,
        notice: kind,
        armWake: kind === 'network' && !woke,
      })
      writeThread(thread)
    }
  },
}))
