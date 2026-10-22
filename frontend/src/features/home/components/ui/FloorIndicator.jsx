import { LockSimple } from '@phosphor-icons/react'
import { indicator } from '../../content/journey.content.js'
import { floorAnchor, scrollToProgress } from '../../lib/journeyRig.js'
import { floorReadsLight, useJourneyStore } from '../../store/journey.store.js'
import { useUnlocked } from '../../../../shared/hobbies/hobbies.store.js'

export function FloorIndicator() {
  const floorId = useJourneyStore((state) => state.floorId)
  const shown = useJourneyStore((state) => state.chrome.rail)
  const unlocked = useUnlocked()
  const onLight = floorReadsLight(floorId)

  return (
    <nav
      aria-label="Pisos del elevador"
      className={`floor-rail ${shown ? 'is-shown' : ''}`}
    >
      {indicator.map((floor) => {
        const locked = floor.locked && !unlocked
        const active = floorId === floor.id
        return (
          <button
            key={floor.id}
            type="button"
            data-ui
            disabled={locked}
            aria-current={active ? 'true' : undefined}
            aria-label={locked ? 'Piso -1 bloqueado' : `Piso ${floor.number}`}
            onClick={() => scrollToProgress(floorAnchor(floor.id), 'smooth')}
            className={`editorial-float flex h-7 w-7 items-center justify-center font-mono text-[11px] disabled:opacity-40 md:h-8 md:w-8 md:text-xs ${
              active
                ? onLight
                  ? 'border-ink-950 bg-ink-950 text-ember-500'
                  : 'border-ink-950 bg-ember-500 text-ink-950'
                : onLight
                  ? 'border-ink-950 bg-ink-950 text-fog-dim'
                  : 'border-ink-700 bg-ink-950 text-fog-dim'
            }`}
          >
            {locked ? <LockSimple size={14} /> : floor.number}
          </button>
        )
      })}
    </nav>
  )
}
