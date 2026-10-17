import { useEffect, useState } from 'react'
import { SiliChat } from '../../../sili/components/SiliChat.jsx'
import { useHobbiesStore } from '../../../../shared/hobbies/hobbies.store.js'
import { floorReadsLight, useJourneyStore } from '../../store/journey.store.js'

const LINES = [
  'Hola, soy Sil. Pregúntame cuando quieras.',
  'Historia, proyectos y contacto tienen su propia página.',
  'Si lo puedes imaginar, lo puedes programar.',
]

export function SiliPreview() {
  const shown = useJourneyStore((state) => state.chrome.counter)
  const onLight = useJourneyStore((state) => floorReadsLight(state.floorId))
  const collect = useHobbiesStore((state) => state.collect)
  const [open, setOpen] = useState(false)
  const [line, setLine] = useState(0)
  const [bubble, setBubble] = useState(true)

  useEffect(() => {
    if (!shown || open) return undefined
    const timer = window.setInterval(() => {
      setBubble(false)
      window.setTimeout(() => {
        setLine((value) => (value + 1) % LINES.length)
        setBubble(true)
      }, 280)
    }, 5200)
    return () => window.clearInterval(timer)
  }, [shown, open])

  return (
    <div className={`sili-dock ${shown ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
      {bubble && !open ? (
        <p className="caption-panel w-full px-3 py-2 font-mono text-[11px] leading-snug">{LINES[line]}</p>
      ) : null}
      {open ? (
        <div data-ui className="sili-panel w-full p-3 text-fog">
          <SiliChat />
        </div>
      ) : null}
      <button
        type="button"
        data-ui
        aria-expanded={open}
        aria-label="Abrir a Sil"
        onClick={() => {
          collect('cap')
          setOpen((value) => !value)
        }}
        className={`flex h-11 w-11 items-center justify-center border border-ink-700 font-mono text-sm font-bold ${onLight ? 'bg-ink-950 text-ember-500' : 'bg-ember-500 text-ink-950'}`}
      >
        S
      </button>
    </div>
  )
}
