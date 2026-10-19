import { HOBBIES, HOBBY_TOTAL } from '../../../../shared/hobbies/hobbies.constants.js'
import { knownFound, useHobbiesStore } from '../../../../shared/hobbies/hobbies.store.js'
import { LOCKED_PROGRESS, scrollToProgress } from '../../lib/journeyRig.js'
import { useJourneyStore } from '../../store/journey.store.js'

function HobbyGlyph() {
  return (
    <svg className="hobby-glyph" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.4 14.7 8l5.9.5-4.5 3.9 1.4 5.7L12 15.8 6.5 18.1l1.4-5.7L3.4 8.5 9.3 8z"
      />
    </svg>
  )
}

export function HobbyCounter() {
  const found = useHobbiesStore((state) => state.found)
  const reset = useHobbiesStore((state) => state.reset)
  const shown = useJourneyStore((state) => state.chrome.counter)
  const floorId = useJourneyStore((state) => state.floorId)
  const open = useJourneyStore((state) => state.cornerOpen === 'hobbies')
  const setCornerOpen = useJourneyStore((state) => state.setCornerOpen)
  const owned = knownFound(found)
  const count = `${owned.length}/${HOBBY_TOTAL}`

  const empty = () => {
    reset()
    setCornerOpen(null)
    if (floorId === 'secret') scrollToProgress(LOCKED_PROGRESS, 'auto')
  }

  return (
    <section className={`hobby-counter ${shown ? 'is-shown' : ''}`} aria-label="Hobbies">
      {open ? (
        <div className="hobby-panel">
          <ul className="hobby-found">
            {HOBBIES.map((hobby) => {
              const got = owned.includes(hobby.id)
              return (
                <li key={hobby.id} data-found={got ? '1' : '0'}>
                  <img src={hobby.image} alt="" />
                  <span>
                    <strong>{hobby.label}</strong>
                    {!got ? <em>{hobby.hint}</em> : null}
                  </span>
                </li>
              )
            })}
          </ul>
          <button type="button" data-ui className="hobby-reset" onClick={empty}>
            Vaciar
          </button>
        </div>
      ) : null}
      <button
        type="button"
        data-ui
        className="hobby-card"
        aria-expanded={open}
        aria-label={`Hobbies ${count}`}
        onClick={() => setCornerOpen(open ? null : 'hobbies')}
      >
        <HobbyGlyph />
        <span>{count}</span>
      </button>
    </section>
  )
}
