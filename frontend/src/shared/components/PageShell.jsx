import { useEffect, useRef } from 'react'
import { HobbyCounter } from '../../features/home/components/ui/HobbyCounter.jsx'
import { SiliPreview } from '../../features/home/components/ui/SiliPreview.jsx'
import { useJourneyStore } from '../../features/home/store/journey.store.js'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import { canonicalPath } from '../siteNav.js'
import { JourneyFooter } from '../../features/home/components/ui/JourneyFooter.jsx'
import { Masthead } from './Masthead.jsx'

const ATMOSPHERE = {
  '/history': {
    gradient:
      'radial-gradient(ellipse 68% 46% at 72% 22%, rgba(255,91,20,0.12), transparent 64%), radial-gradient(ellipse 52% 40% at 18% 76%, rgba(255,176,0,0.06), transparent 60%)',
    accent: '#ff5b14',
  },
  '/experiencia': {
    gradient:
      'radial-gradient(ellipse 64% 48% at 24% 28%, rgba(255,176,0,0.10), transparent 62%), radial-gradient(ellipse 56% 42% at 82% 72%, rgba(255,91,20,0.10), transparent 62%)',
    accent: '#ffb000',
  },
  '/projects': {
    gradient:
      'radial-gradient(ellipse 64% 44% at 74% 26%, rgba(255,91,20,0.13), transparent 64%), radial-gradient(ellipse 48% 38% at 22% 80%, rgba(194,65,12,0.09), transparent 58%)',
    accent: '#ff5b14',
  },
  '/skills': {
    gradient:
      'radial-gradient(ellipse 70% 50% at 32% 38%, rgba(255,91,20,0.11), transparent 66%), radial-gradient(ellipse 46% 34% at 80% 78%, rgba(255,176,0,0.07), transparent 60%)',
    accent: '#ff5b14',
  },
  '/gallery': {
    gradient:
      'radial-gradient(ellipse 60% 45% at 50% 24%, rgba(255,164,116,0.09), transparent 62%), radial-gradient(ellipse 48% 36% at 80% 72%, rgba(255,91,20,0.08), transparent 56%)',
    accent: '#ffa474',
  },
  '/certificaciones': {
    gradient:
      'radial-gradient(ellipse 58% 48% at 30% 45%, rgba(255,91,20,0.10), transparent 62%), radial-gradient(ellipse 44% 34% at 78% 36%, rgba(255,176,0,0.07), transparent 56%)',
    accent: '#ffb000',
  },
  '/contact': {
    gradient:
      'radial-gradient(ellipse 62% 48% at 68% 42%, rgba(255,91,20,0.13), transparent 62%), radial-gradient(ellipse 48% 38% at 22% 62%, rgba(194,65,12,0.09), transparent 56%)',
    accent: '#ff5b14',
  },
}

const DEFAULT_ATMOSPHERE = ATMOSPHERE['/history']

export function PageShell({ path, children, bleed = false }) {
  const reduced = useReducedMotion()
  const mainRef = useRef(null)
  const routeKey = canonicalPath(path)
  const atmos = ATMOSPHERE[routeKey] || DEFAULT_ATMOSPHERE
  const cornerOpen = useJourneyStore((state) => state.cornerOpen)
  usePageMeta(routeKey)

  useEffect(() => {
    const state = useJourneyStore.getState()
    state.setFloor('welcome')
    state.setChapter('hero')
    state.setCornerOpen(null)
    state.setChrome({ nav: true, rail: true, side: true, counter: true })
  }, [routeKey])

  useEffect(() => {
    const node = mainRef.current
    if (!node || reduced) return undefined
    const done = (event) => {
      if (event.target !== node) return
      node.classList.remove('editorial-reveal')
      window.dispatchEvent(new Event('resize'))
    }
    node.addEventListener('animationend', done)
    return () => node.removeEventListener('animationend', done)
  }, [path, reduced])

  return (
    <div id="page-scroll" className="relative h-full overflow-x-hidden overflow-y-auto bg-ink-950 text-fog">
      <a href="#contenido" className="absolute -left-[999px] top-3 z-50 bg-ember-500 px-3 py-2 text-sm text-ink-950 focus:left-3">
        Saltar al contenido
      </a>
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: atmos.gradient }} />
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: 'radial-gradient(rgba(241, 239, 236, 0.24) 0.75px, transparent 0.85px)',
            backgroundSize: '6px 6px',
          }}
        />
        <div
          className="absolute top-0 left-0 h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent 6%, ${atmos.accent} 50%, transparent 94%)`,
            opacity: 0.65,
          }}
        />
        <div
          className="absolute bottom-0 left-0 h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent 12%, ${atmos.accent} 50%, transparent 88%)`,
            opacity: 0.22,
          }}
        />
      </div>
      <header className="sticky top-0 z-30">
        <Masthead path={path} />
      </header>
      <main
        id="contenido"
        ref={mainRef}
        tabIndex={-1}
        className={`relative z-10 ${reduced ? '' : 'editorial-reveal'} ${bleed ? '' : 'px-4 pb-28 md:px-8'}`}
      >
        {children}
      </main>
      <JourneyFooter variant="page" />
      <div className={`journey-corner${cornerOpen ? ' is-open' : ''}`} style={{ right: '0.75rem' }}>
        <SiliPreview />
        <HobbyCounter />
      </div>
    </div>
  )
}
