import { GoogleGenAI } from '@google/genai'
import { env } from '../../configs/env.js'
import { apiKey, model, provider } from '../../configs/llm.js'
import { CHAT_MESSAGE_CAP, normalizeLang } from './chat.boundary.js'
import { INJECTION_REPLY, isDestination } from './destinations.js'
import { PROMPT_LEAK_MARKERS, buildChatInput } from './prompt.js'

const TIMEOUT_MS = 25_000
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_FALLBACK_MODEL = 'openai/gpt-oss-20b'
const GEMINI_FALLBACK_MODEL = 'gemini-3.5-flash-lite'
const REPLY_MAX = 900
const OUTPUT_TOKENS = 420

export const CHAT_UNAVAILABLE_REPLY = {
  es: 'Sili no está disponible en este momento.',
  en: 'Sili is unavailable right now.',
}

export class ChatUnavailableError extends Error {
  constructor(lang = 'es') {
    super(CHAT_UNAVAILABLE_REPLY[normalizeLang(lang)])
    this.name = 'ChatUnavailableError'
    this.status = 503
    this.lang = normalizeLang(lang)
  }
}

export async function replyToChat(prepared) {
  const lang = normalizeLang(prepared?.lang)
  const query = prepared?.query ?? ''
  const summary = prepared?.summary ?? ''
  const thread = Array.isArray(prepared?.recent) ? prepared.recent : []
  const recentChars = thread.reduce((sum, turn) => sum + turn.content.length, 0)
  console.info(`chat context summaryChars=${summary.length} recentTurns=${thread.length} recentChars=${recentChars} lang=${lang}`)

  const { instructions, data } = buildChatInput(summary, query, lang)
  const conversation = conversationForModel(data, thread, query, lang)

  const errors = []
  for (const attempt of providersToTry()) {
    try {
      const raw = attempt.provider === 'groq'
        ? await callGroq(instructions, conversation, attempt.apiKey, attempt.model)
        : await callGemini(instructions, conversation, attempt.apiKey, attempt.model)
      return publicReply(raw, lang)
    } catch (error) {
      errors.push(`${attempt.provider}:${error?.message || error}`)
    }
  }

  console.error('chat llm failed', errors.join(' | '))
  throw new ChatUnavailableError(lang)
}

function providersToTry() {
  const list = []
  if (provider === 'gemini' && apiKey) {
    list.push({ provider: 'gemini', apiKey, model })
  }
  if (provider === 'groq' && apiKey) {
    list.push({ provider: 'groq', apiKey, model })
  }
  if (env.GROQ_API_KEY && !list.some((item) => item.provider === 'groq')) {
    list.push({ provider: 'groq', apiKey: env.GROQ_API_KEY, model: GROQ_FALLBACK_MODEL })
  } else if (provider === 'groq' && apiKey && model !== GROQ_FALLBACK_MODEL) {
    list.push({ provider: 'groq', apiKey, model: GROQ_FALLBACK_MODEL })
  }
  if (env.GEMINI_API_KEY && provider === 'gemini' && model !== GEMINI_FALLBACK_MODEL) {
    list.push({ provider: 'gemini', apiKey: env.GEMINI_API_KEY, model: GEMINI_FALLBACK_MODEL })
  } else if (env.GEMINI_API_KEY && !list.some((item) => item.provider === 'gemini')) {
    list.push({ provider: 'gemini', apiKey: env.GEMINI_API_KEY, model: GEMINI_FALLBACK_MODEL })
  }
  if (!list.length) throw new ChatUnavailableError()
  return list
}

async function callGemini(instructions, conversation, key, modelName) {
  const ai = new GoogleGenAI({ apiKey: key, vertexai: false })
  const response = await ai.models.generateContent({
    model: modelName,
    contents: conversation.map((turn) => ({
      role: turn.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: turn.content }],
    })),
    config: {
      systemInstruction: instructions,
      temperature: 0.35,
      maxOutputTokens: OUTPUT_TOKENS,
      responseMimeType: 'application/json',
      abortSignal: AbortSignal.timeout(TIMEOUT_MS),
    },
  })

  if (typeof response.text !== 'string' || response.text.trim() === '') {
    throw new Error('empty gemini reply')
  }
  return response.text
}

async function callGroq(instructions, conversation, key, modelName) {
  const response = await fetch(GROQ_URL, {
    method: 'POST',
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: modelName,
      temperature: 0.35,
      max_tokens: OUTPUT_TOKENS,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: instructions },
        ...conversation,
      ],
    }),
  })

  if (!response.ok) {
    await response.arrayBuffer().catch(() => {})
    throw new Error(`groq ${response.status}`)
  }

  const payload = await response.json()
  const text = payload?.choices?.[0]?.message?.content
  if (typeof text !== 'string' || text.trim() === '') throw new Error('empty groq reply')
  return text
}

function publicReply(raw, lang = 'es') {
  const text = raw.trim()
  const parsed = parseJsonObject(text)
  const reply = parsed && typeof parsed.reply === 'string' ? parsed.reply.trim() : text
  const destination = parsed && isDestination(parsed.destination) ? parsed.destination : null
  if (!reply || leaksPrompt(reply)) {
    return { reply: INJECTION_REPLY[normalizeLang(lang)], destination: null }
  }
  return { reply: reply.slice(0, REPLY_MAX), destination }
}

function leaksPrompt(text) {
  return PROMPT_LEAK_MARKERS.some((marker) => text.includes(marker))
}

function parseJsonObject(text) {
  const direct = tryParse(text)
  if (direct) return direct

  const unfenced = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')
  const fromFence = tryParse(unfenced)
  if (fromFence) return fromFence

  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start === -1 || end <= start) return null
  return tryParse(text.slice(start, end + 1))
}

function tryParse(value) {
  try {
    const parsed = JSON.parse(value)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null
    return parsed
  } catch {
    return null
  }
}

function conversationForModel(data, recent, query, lang = 'es') {
  const bridge = lang === 'en' ? '{"reply":"Ready.","destination":null}' : '{"reply":"Listo.","destination":null}'
  const turns = [
    { role: 'user', content: data },
    { role: 'assistant', content: bridge },
  ]

  const thread = recent
    .filter((turn) => turn && (turn.role === 'user' || turn.role === 'assistant') && typeof turn.content === 'string')
    .map((turn) => ({
      role: turn.role,
      content: turn.content.replaceAll('<', '').replaceAll('>', '').trim().slice(0, 700),
    }))
    .filter((turn) => turn.content)
    .slice(-CHAT_MESSAGE_CAP)

  for (const turn of thread) turns.push(turn)

  const safe = String(query).replaceAll('<', '').replaceAll('>', '').trim()
  const last = thread[thread.length - 1]
  if (safe && (!last || last.role !== 'user' || last.content !== safe)) {
    turns.push({ role: 'user', content: safe })
  }
  return turns
}
