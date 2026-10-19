import { SiliFace } from './SiliFace.jsx'
import { useJourneyStore } from '../../store/journey.store.js'

export function JourneyBoot() {
  const ready = useJourneyStore((state) => state.ready)

  return (
    <div
      className={`journey-boot-gate${ready ? ' is-ready' : ''}`}
      aria-hidden={ready}
      aria-busy={!ready}
      aria-live="polite"
    >
      <div className="journey-boot-mark">
        <SiliFace />
        <span className="journey-boot-ring" aria-hidden="true" />
      </div>
      <p className="journey-boot-label">{ready ? 'Listo' : 'Armando el recorrido'}</p>
    </div>
  )
}
