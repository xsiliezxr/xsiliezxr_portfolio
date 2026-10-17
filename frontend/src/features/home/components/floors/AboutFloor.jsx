import { about } from '../../content/journey.content.js'
import { CorridorLayout, FloorCard } from './FloorCard.jsx'

export function AboutWash() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-ink-950" aria-hidden="true">
      <div
        data-depth="back"
        className="absolute inset-0 opacity-65"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255, 91, 20, 0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 91, 20, 0.09) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          transform: 'perspective(900px) rotateX(28deg) scale(1.18)',
          transformOrigin: '50% 80%',
        }}
      />
      <svg
        data-depth="mid"
        className="absolute inset-0 h-full w-full opacity-55"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="720" cy="450" r="240" fill="none" stroke="#2A2826" strokeWidth="1.5" strokeDasharray="8 8" />
        <circle cx="720" cy="450" r="340" fill="none" stroke="#6B2508" strokeWidth="1.2" />
        <line x1="120" y1="180" x2="520" y2="180" stroke="#FF5B14" strokeWidth="1.5" strokeOpacity="0.45" />
        <line x1="920" y1="720" x2="1320" y2="720" stroke="#FF5B14" strokeWidth="1.5" strokeOpacity="0.45" />
        <path d="M 160 660 L 240 580 L 420 580" fill="none" stroke="#FFB000" strokeWidth="1.4" strokeOpacity="0.4" />
        <path d="M 1280 240 L 1200 320 L 1020 320" fill="none" stroke="#FFB000" strokeWidth="1.4" strokeOpacity="0.4" />
      </svg>
    </div>
  )
}

function AboutLeft() {
  return (
    <>
      <FloorCard slot="nw" band="top">
        <h2 className="journey-card-title text-base md:text-lg">{about.title}</h2>
        <p className="mt-2 text-xs leading-relaxed text-fog md:text-sm">
          Soy Angel David Siliezar López, estudiante Full Stack en Fundación Kinal. Nací el 23 de agosto de 2007 en Ciudad de Guatemala.
        </p>
        <p className="mt-2 hidden text-xs leading-relaxed text-fog-dim md:block">
          A los 12 desarmé una PC vieja solo por curiosidad, limpié cada pieza y la dejé funcionando.
        </p>
        <p className="journey-card-meta">{about.meta}</p>
      </FloorCard>
    </>
  )
}

function AboutRight() {
  return (
    <>
      <FloorCard slot="se" band="bottom">
        <p className="text-xs leading-relaxed text-fog md:text-sm">
          El basket llegó en un 21 en el parque. En Kinal encontré programar: React, Node, bases de datos y la regla del trabajo bien hecho.
        </p>
        <div className="mt-2.5 hidden border-t border-ink-700 pt-2.5 md:block">
          <p className="font-mono text-[11px] text-amber">Excelencia académica · Abanderado hasta 2024</p>
        </div>
        <a href="/history" data-ui className="journey-card-link">
          Leer la historia
        </a>
      </FloorCard>
    </>
  )
}

export function AboutFloor({ layout = 'panel' }) {
  if (layout === 'static') {
    return (
      <div className="journey-sheet relative text-fog">
        <AboutWash />
        <CorridorLayout layout="static" left={<AboutLeft />} right={<AboutRight />} />
      </div>
    )
  }

  return (
    <div className="journey-panel">
      <CorridorLayout left={<AboutLeft />} right={<AboutRight />} />
    </div>
  )
}
