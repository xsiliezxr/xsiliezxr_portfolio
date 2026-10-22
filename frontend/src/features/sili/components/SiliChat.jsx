import { useEffect, useRef, useState } from 'react'
import cap from '../../../assets/images/hobbies/cap.webp'
import face from '../../../assets/images/sili-face.png'
import { HobbyMark } from '../../../shared/hobbies/HobbyMark.jsx'
import { useLocaleStore } from '../../../shared/i18n/locale.store.js'
import { SILI_MAX_CHARS } from '../api/sili.api.js'
import { useSiliStore } from '../store/sili.store.js'

const COPY = {
  es: {
    line: 'Pregúntame por el portafolio.',
    clear: 'Vaciar conversación',
    empty: 'Pregúntame por el portafolio.',
    you: 'Tú',
    ask: 'Pregúntame',
    send: 'Enviar',
    label: 'Mensaje para Sili',
    rate: 'Demasiadas preguntas. Espera un momento.',
    asleep: 'El servidor está dormido. Intenta de nuevo en un minuto.',
    network: 'No hay conexión con el servidor. Puede estar dormido.',
    fail: 'No pude responder. Intenta de nuevo.',
    waking: 'Despertando el servidor.',
    thinking: 'Pensando.',
  },
  en: {
    line: 'Ask me about the portfolio.',
    clear: 'Clear conversation',
    empty: 'Ask me about the portfolio.',
    you: 'You',
    ask: 'Ask me',
    send: 'Send',
    label: 'Message for Sili',
    rate: 'Too many questions. Wait a moment.',
    asleep: 'The server is asleep. Try again in a minute.',
    network: 'No connection to the server. It may be asleep.',
    fail: "I couldn't reply. Try again.",
    waking: 'Waking the server.',
    thinking: 'Thinking.',
  },
}

export function SiliChat() {
  const lang = useLocaleStore((state) => state.lang) === 'en' ? 'en' : 'es'
  const copy = COPY[lang]
  const messages = useSiliStore((state) => state.messages)
  const summary = useSiliStore((state) => state.summary)
  const status = useSiliStore((state) => state.status)
  const notice = useSiliStore((state) => state.notice)
  const placeNote = useSiliStore((state) => state.placeNote)
  const send = useSiliStore((state) => state.send)
  const clear = useSiliStore((state) => state.clear)
  const [draft, setDraft] = useState('')
  const logRef = useRef(null)
  const busy = status === 'thinking' || status === 'waking'
  const canClear = messages.length > 0 || summary.length > 0

  useEffect(() => {
    const node = logRef.current
    if (node) node.scrollTop = node.scrollHeight
  }, [messages, status, notice, placeNote])

  const submit = (event) => {
    event.preventDefault()
    if (busy) return
    const value = draft
    if (!value.trim()) return
    setDraft('')
    send(value)
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="sili-preview mb-3">
        <img className="sili-face sili-preview-face" src={face} alt="" />
        <div>
          <p className="sili-preview-name">Sili</p>
          <p className="sili-preview-line">{copy.line}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-end gap-2 border-b border-ink-700 pb-2">
        <div className="flex items-center gap-2">
          <HobbyMark id="cap" image={cap} />
          <button
            type="button"
            data-ui
            disabled={!canClear || busy}
            onClick={clear}
            className="shrink-0 border border-ink-700 px-2 py-1 font-mono text-[11px] text-fog-dim disabled:opacity-40"
          >
            {copy.clear}
          </button>
        </div>
      </div>
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        aria-busy={busy}
        className="sili-thread mt-3 min-h-0 flex-1 overflow-y-auto"
      >
        {messages.length === 0 && status === 'idle' ? (
          <p className="sili-thread-empty">{copy.empty}</p>
        ) : null}
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`sili-msg ${message.role === 'assistant' ? 'sili-msg-bot' : 'sili-msg-user'}`}
          >
            <span className="sili-msg-label">{message.role === 'assistant' ? 'Sili' : copy.you}</span>
            <p className="sili-msg-text">{message.content}</p>
          </div>
        ))}
        {placeNote ? (
          <p className="sili-place-note">{placeNote}</p>
        ) : null}
        {busy ? <p className="sili-thread-status">{copy[status]}</p> : null}
        {status === 'error' ? <p className="sili-thread-status is-error">{copy[notice] || copy.fail}</p> : null}
      </div>
      <form onSubmit={submit} className="sili-compose mt-3 flex shrink-0">
        <label className="sr-only" htmlFor="sili-message">{copy.label}</label>
        <input
          id="sili-message"
          value={draft}
          maxLength={SILI_MAX_CHARS}
          autoComplete="off"
          placeholder={copy.ask}
          onChange={(event) => setDraft(event.target.value.slice(0, SILI_MAX_CHARS))}
          className="sili-compose-input"
        />
        <button
          type="submit"
          data-ui
          disabled={busy || draft.trim().length === 0}
          className="sili-compose-send"
        >
          {copy.send}
        </button>
      </form>
    </div>
  )
}
