import { Masthead } from '../../../../shared/components/Masthead.jsx'
import { useJourneyStore } from '../../store/journey.store.js'

export function Navbar() {
  const shown = useJourneyStore((state) => state.chrome.nav)

  return (
    <header
      data-ui
      aria-hidden={shown ? undefined : true}
      inert={shown ? undefined : true}
      className={`masthead-shell fixed z-[90] ${shown ? 'masthead-shell-on' : ''}`}
    >
      <Masthead path="/" markUi />
    </header>
  )
}
