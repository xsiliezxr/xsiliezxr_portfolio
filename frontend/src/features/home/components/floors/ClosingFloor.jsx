import { useUnlocked } from '../../../../shared/hobbies/hobbies.store.js'
import { useLocalized } from '../../../../shared/i18n/useLocalized.js'
import { closing as closingSource } from '../../content/journey.content.js'
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
        <circle cx="720" cy="540" r="220" fill="none" stroke="#FFB000" strokeWidth="1.2" strokeDasharray="6 10" />
        <path d="M160 220 H520 M920 680 H1280" fill="none" stroke="#FF5B14" strokeWidth="1.4" strokeOpacity="0.7" />
        <path d="M240 160 V420 M1180 480 V760" fill="none" stroke="#2A2826" strokeWidth="1.2" />
      </svg>
    </div>
  )
}

function ClosingLeft() {
  const closing = useLocalized(closingSource)
  return (
    <FloorCard slot="nw" band="top" tone="ember">
      <h2 className="journey-card-title text-base md:text-xl">
        {closing.line1}
        <span className="mt-1 block normal-case">{closing.line2}</span>
      </h2>
      <div className="copy-bubbles mt-3 text-xs leading-relaxed md:text-sm">
        <p className="copy-bubble-title">{closing.status}</p>
        <p className="copy-bubble copy-bubble-ink">{closing.place}</p>
      </div>
    </FloorCard>
  )
}

function ClosingRight({ unlocked }) {
  const closing = useLocalized(closingSource)
  return (
    <FloorCard slot="se" band="bottom" tone="ember">
      <div className="copy-bubbles text-xs leading-relaxed md:text-sm">
        <p className="copy-bubble-title">
        {unlocked ? closing.unlocked : `${closing.locked} ${closing.hobbies}`}
        </p>
        <p className="copy-bubble copy-bubble-ink mt-2 hidden md:block">{closing.thanks}</p>
      </div>
      <div className="mt-2.5 flex flex-wrap items-center gap-3">
        <a href="/contact" data-ui className="journey-card-link">
          {closing.contactCta}
        </a>
        <a href="/projects" data-ui className="journey-card-link-quiet">
          {closing.projectsCta}
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
