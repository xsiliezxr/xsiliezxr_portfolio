import { useEffect, useRef, useState } from 'react'
import { SILI_MAX_CHARS } from '../api/sili.api.js'
import { useSiliStore } from '../store/sili.store.js'

const NOTICE = {
  rate: 'Demasiadas preguntas. Espera un momento.',
  asleep: 'El servidor está dormido. Intenta de nuevo en un minuto.',
  network: 'No hay conexión con el servidor. Puede estar dormido.',
  fail: 'No pude responder. Intenta de nuevo.',
  waking: 'Despertando el servidor.',
  thinking: 'Pensando.',
}

export function SiliChat() {
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
      <div className="flex shrink-0 items-center justify-between gap-3 border-b-2 border-ember-500 pb-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fog-dim">
          <span className="halftone mr-2 inline-block h-2 w-6 align-middle" aria-hidden="true" />
          Sil
        </p>
        <button
          type="button"
          data-ui
          disabled={!canClear || busy}
          onClick={clear}
          className="shrink-0 border border-ink-700 px-2 py-1 font-mono text-[11px] text-fog-dim disabled:opacity-40"
        >
          Vaciar conversación
        </button>
      </div>
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        aria-busy={busy}
        className="mt-3 min-h-0 flex-1 overflow-y-auto bg-ink-900 p-3 font-mono text-[13px] leading-relaxed"
      >
        {messages.length === 0 && status === 'idle' ? (
          <p className="text-fog-dim">Pregúntame por el portafolio.</p>
        ) : null}
        {messages.map((message, index) => (
          <p
            key={`${message.role}-${index}`}
            className={`whitespace-pre-wrap break-words ${message.role === 'assistant' ? 'mt-3 text-fog first:mt-0' : 'mt-3 text-fog-dim first:mt-0'}`}
          >
            {message.content}
          </p>
        ))}
        {placeNote ? (
          <p className="mt-3 border-l-2 border-ember-500 bg-ink-950 px-2 py-2 text-fog">{placeNote}</p>
        ) : null}
        {busy ? <p className="mt-3 text-fog-dim">{NOTICE[status]}</p> : null}
        {status === 'error' ? <p className="mt-3 text-fog">{NOTICE[notice] || NOTICE.fail}</p> : null}
      </div>
      <form onSubmit={submit} className="mt-3 flex shrink-0">
        <label className="sr-only" htmlFor="sili-message">Mensaje para Sil</label>
        <input
          id="sili-message"
          value={draft}
          maxLength={SILI_MAX_CHARS}
          autoComplete="off"
          placeholder="Pregúntame"
          onChange={(event) => setDraft(event.target.value.slice(0, SILI_MAX_CHARS))}
          className="min-w-0 flex-1 border border-ink-700 bg-ink-950 px-2 py-2 font-mono text-[13px] text-fog placeholder:text-fog-dim"
        />
        <button
          type="submit"
          data-ui
          disabled={busy || draft.trim().length === 0}
          className="bg-ember-500 px-3 py-2 text-sm font-bold text-ink-950 disabled:opacity-40"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
