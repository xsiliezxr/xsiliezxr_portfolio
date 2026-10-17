import { useState } from 'react'
import { contact } from '../../../shared/config/contact.js'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactForm() {
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    const data = new FormData(form)
    const bot = String(data.get('bot-field') ?? '').trim()
    const name = String(data.get('name') ?? '').trim().slice(0, 80)
    const email = String(data.get('email') ?? '').trim().slice(0, 120)
    const message = String(data.get('message') ?? '').trim().slice(0, 2000)

    if (bot) {
      form.reset()
      setStatus('ok')
      return
    }
    if (!name || !message || !EMAIL.test(email)) {
      setStatus('invalid')
      return
    }

    const body = new URLSearchParams({
      'form-name': 'contact',
      subject: 'Portafolio · nuevo mensaje',
      name,
      email,
      message,
      'bot-field': '',
    })

    setStatus('sending')
    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (!response.ok) throw new Error('submit_failed')
      form.reset()
      setStatus('ok')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="relative flex flex-col gap-4" onSubmit={handleSubmit}>
      <p className="pointer-events-none absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          No completar
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="subject" value="Portafolio · nuevo mensaje" />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em]">Nombre</span>
          <input name="name" type="text" required autoComplete="name" maxLength={80} className="bg-ink-950 px-3 py-2 text-fog" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em]">Email</span>
          <input name="email" type="email" required autoComplete="email" maxLength={120} className="bg-ink-950 px-3 py-2 text-fog" />
        </label>
      </div>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em]">Mensaje</span>
        <textarea name="message" required rows={5} maxLength={2000} className="resize-y bg-ink-950 px-3 py-2 text-fog" />
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={status === 'sending'} className="bg-ember-500 px-4 py-3 text-sm font-bold text-ink-950 disabled:cursor-wait disabled:opacity-60">
          {status === 'sending' ? 'Enviando…' : 'Enviar'}
        </button>
        {status === 'ok' ? <p className="font-mono text-xs text-ember-800">Mensaje enviado</p> : null}
        {status === 'invalid' ? <p className="font-mono text-xs" role="alert">Revisa el nombre, el correo y el mensaje.</p> : null}
        {status === 'error' ? (
          <p className="font-mono text-xs" role="alert">
            No se pudo enviar.{contact.email ? ` Escribe a ${contact.email}.` : ' Intenta de nuevo.'}
          </p>
        ) : null}
      </div>
    </form>
  )
}
