import { useEffect, useState } from 'react'
import { SiliChat } from '../../../sili/components/SiliChat.jsx'
import { useJourneyStore } from '../../store/journey.store.js'
import { SiliFace } from './SiliFace.jsx'

const LINES = [
  'Hola, soy Sil. Pregúntame cuando quieras.',
  'Historia, proyectos y contacto tienen su propia página.',
  'Si lo puedes imaginar, lo puedes programar.',
]

const GAP_MS = 8000
const HOLD_MIN = 2000
const HOLD_MAX = 3200

function holdMs(text) {
  const ratio = Math.min(1, Math.max(0, (text.length - 28) / 36))
  return Math.round(HOLD_MIN + (HOLD_MAX - HOLD_MIN) * ratio)
}

export function SiliPreview() {
  const shown = useJourneyStore((state) => state.chrome.counter)
  const open = useJourneyStore((state) => state.cornerOpen === 'sili')
  const setCornerOpen = useJourneyStore((state) => state.setCornerOpen)
  const [line, setLine] = useState(0)
  const [bubble, setBubble] = useState(false)

  useEffect(() => {
    if (!shown || open) {
      setBubble(false)
      return undefined
    }

    let cancelled = false
    let gapTimer = 0
    let holdTimer = 0
    let index = line

    const speak = () => {
      if (cancelled) return
      const text = LINES[index]
      setLine(index)
      setBubble(true)
      holdTimer = window.setTimeout(() => {
        if (cancelled) return
        setBubble(false)
        index = (index + 1) % LINES.length
        gapTimer = window.setTimeout(speak, GAP_MS)
      }, holdMs(text))
    }

    gapTimer = window.setTimeout(speak, GAP_MS)

    return () => {
      cancelled = true
      window.clearTimeout(gapTimer)
      window.clearTimeout(holdTimer)
    }
  }, [shown, open])

  return (
    <div className={`sili-dock ${shown ? 'is-shown' : ''}`}>
      {open ? (
        <div data-ui className="sili-panel p-3 text-fog">
          <SiliChat />
          <button type="button" data-ui className="sili-close" onClick={() => setCornerOpen(null)}>
            Cerrar
          </button>
        </div>
      ) : null}
      {!open && bubble ? (
        <div className="sili-bubble" aria-live="polite">
          <p className="sili-bubble-name">Sil</p>
          <p className="sili-bubble-line">{LINES[line]}</p>
        </div>
      ) : null}
      <button
        type="button"
        data-ui
        className="sili-card"
        aria-expanded={open}
        aria-label="Abrir a Sil"
        onClick={() => setCornerOpen(open ? null : 'sili')}
      >
        <SiliFace />
      </button>
    </div>
  )
}
