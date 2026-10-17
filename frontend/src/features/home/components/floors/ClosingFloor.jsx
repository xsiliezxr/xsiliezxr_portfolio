import { useUnlocked } from '../../../../shared/hobbies/hobbies.store.js'
import { closing } from '../../content/journey.content.js'
import { CorridorLayout, FloorCard } from './FloorCard.jsx'

export function ClosingWash() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        data-depth="back"
        className="floor-grid absolute inset-0 opacity-35"
        style={{
          transform: 'perspective(900px) rotateX(24deg) scale(1.15)',
          transformOrigin: '50% 85%',
        }}
      />
      <svg
        data-depth="mid"
        className="absolute inset-0 h-full w-full opacity-35"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="720" cy="540" r="220" fill="none" stroke="#0A0A0A" strokeWidth="2" strokeDasharray="10 8" />
        <circle cx="720" cy="540" r="310" fill="none" stroke="#0A0A0A" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

function ClosingLeft() {
  return (
    <FloorCard slot="nw" band="top" tone="ember">
      <h2 className="journey-card-title text-base md:text-xl text-ember-500">
        {closing.line1}
        <span className="mt-1 block normal-case text-fog">{closing.line2}</span>
      </h2>
      <p className="mt-2 text-xs leading-relaxed text-fog md:text-sm">{closing.status}</p>
      <p className="journey-card-meta">{closing.place}</p>
    </FloorCard>
  )
}

function ClosingRight({ unlocked }) {
  return (
    <FloorCard slot="se" band="bottom" tone="ember">
      <p className="text-xs leading-relaxed text-fog md:text-sm">
        {unlocked ? closing.unlocked : `${closing.locked} ${closing.hobbies}`}
      </p>
      <p className="mt-2 hidden text-xs text-fog-dim md:block">{closing.thanks}</p>
      <div className="mt-2.5 flex flex-wrap items-center gap-3">
        <a href="/contact" data-ui className="journey-card-link">
          Contacto
        </a>
        <a href="/projects" data-ui className="journey-card-link-quiet">
          Proyectos
        </a>
      </div>
    </FloorCard>
  )
}

export function ClosingFloor({ layout = 'panel' }) {
  const unlocked = useUnlocked()

  if (layout === 'static') {
    return (
      <div className="journey-sheet journey-sheet-closing relative text-ink-950">
        <ClosingWash />
        <CorridorLayout layout="static" left={<ClosingLeft />} right={<ClosingRight unlocked={unlocked} />} />
      </div>
    )
  }

  return (
    <div className="journey-panel">
      <CorridorLayout left={<ClosingLeft />} right={<ClosingRight unlocked={unlocked} />} />
    </div>
  )
}
