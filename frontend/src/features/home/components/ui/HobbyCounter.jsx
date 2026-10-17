import { useState } from 'react'
import { HOBBIES, HOBBY_TOTAL } from '../../../../shared/hobbies/hobbies.constants.js'
import { useHobbiesStore } from '../../../../shared/hobbies/hobbies.store.js'
import { useJourneyStore } from '../../store/journey.store.js'

export function HobbyCounter() {
  const found = useHobbiesStore((state) => state.found)
  const shown = useJourneyStore((state) => state.chrome.counter)
  const [open, setOpen] = useState(false)
  const count = `${found.length}/${HOBBY_TOTAL}`

  return (
    <section className={`hobby-counter ${shown ? 'is-shown' : ''} ${open ? 'is-open' : ''}`} aria-label="Hobbies">
      <ol id="hobby-list" hidden={!open}>
        {HOBBIES.map((hobby) => {
          const known = found.includes(hobby.id)
          return (
            <li key={hobby.id} data-known={known ? '1' : '0'} title={known ? hobby.label : hobby.hint}>
              {known ? (
                <img src={hobby.image} alt="" />
              ) : (
                <span className="hobby-slot" aria-hidden="true" />
              )}
              <span>{known ? hobby.label : '???'}</span>
            </li>
          )
        })}
      </ol>
      <button
        type="button"
        data-ui
        className="hobby-count"
        aria-expanded={open}
        aria-controls="hobby-list"
        aria-label={open ? `Ocultar hobbies, ${count}` : `Mostrar hobbies, ${count}`}
        onClick={() => setOpen((value) => !value)}
      >
        {count}
      </button>
    </section>
  )
}
