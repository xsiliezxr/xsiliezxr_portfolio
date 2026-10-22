import { useEffect, useRef, useState } from 'react'
import { ErrorBoundary } from '../../../shared/components/ErrorBoundary.jsx'
import { usePageMeta } from '../../../shared/hooks/usePageMeta.js'
import { Navbar } from '../components/ui/Navbar.jsx'
import { SideRail } from '../components/ui/SideRail.jsx'
import { HobbyCounter } from '../components/ui/HobbyCounter.jsx'
import { useUnlocked } from '../../../shared/hobbies/hobbies.store.js'
import { JourneyCanvas } from '../components/scene/JourneyCanvas.jsx'
import { AboutFloor, AboutWash } from '../components/floors/AboutFloor.jsx'
import { ClosingFloor, ClosingWash } from '../components/floors/ClosingFloor.jsx'
import { ExperienceTerminal, ExperienceWash } from '../components/floors/ExperienceTerminal.jsx'
import { HeroScreen, WelcomeFloor } from '../components/floors/HeroScreen.jsx'
import { SecretCourt, SecretRoom } from '../components/floors/SecretRoom.jsx'
import { StudiesField, StudiesFloor } from '../components/floors/StudiesFloor.jsx'
import { ToolsIde, ToolsWash } from '../components/floors/ToolsIde.jsx'
import { useLocalized } from '../../../shared/i18n/useLocalized.js'
import { passages } from '../content/journey.content.js'
import { FloorIndicator } from '../components/ui/FloorIndicator.jsx'
import { JourneyFooter } from '../components/ui/JourneyFooter.jsx'
import { SiliPreview } from '../components/ui/SiliPreview.jsx'
import { SiliFace } from '../components/ui/SiliFace.jsx'
import { JourneyBoot } from '../components/ui/JourneyBoot.jsx'
import { bindJourneyScroll, createRig, FALLBACK_METRICS, LOCKED_PROGRESS, scrollToProgress, trackDvh } from '../lib/journeyRig.js'
import { useJourneyTimeline } from '../hooks/useJourneyTimeline.js'
import { useJourneyStore } from '../store/journey.store.js'
import { HeroIntro } from '../components/floors/HeroIntro.jsx'

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function Layer({ id, layer, panels, className, side, align, variant, children }) {
  const bind = (node) => {
    const key = `${layer}-${id}`
    if (node) panels.current[key] = node
    else delete panels.current[key]
  }

  return (
    <section
      ref={bind}
      id={layer === 'panel' && id === 'about' ? 'contenido' : undefined}
      data-layer={layer}
      data-floor={id}
      data-side={side}
      data-align={align}
      data-pass-variant={variant}
      className={className}
      aria-hidden="true"
    >
      {children}
    </section>
  )
}

function Sheet({ children }) {
  return <section className="relative h-[100dvh] overflow-hidden">{children}</section>
}

const PUNCH_WORDS = new Set(['imaginar', 'imagine', 'programar', 'program', 'primer', 'first', 'rol', 'role'])

function bareWord(word) {
  return word.toLowerCase().replace(/[^a-záéíóúüñ]/gi, '')
}

function PassageStop({ stop: rawStop }) {
  const stop = useLocalized(rawStop)
  const { variant = 'console', lines = [] } = stop
  const editorial = variant === 'editorial' || variant === 'comic'

  if (variant !== 'console') {
    return (
      <div className="w-full max-w-4xl" aria-label={lines.join(' ')}>
        <div className="flex flex-col gap-6 sm:gap-7" aria-hidden="true">
          {lines.map((line, lineIndex) => {
            const words = editorial ? [line] : line.split(' ')
            const lineAccent = editorial && lineIndex > 0
            return (
              <p
                key={lineIndex}
                data-pass-token
                data-pass-accent={lineAccent ? '1' : '0'}
                className={`m-0 flex min-w-0 max-w-full flex-wrap items-baseline gap-x-2.5 gap-y-3 leading-[1.4] sm:max-w-[36rem] ${
                  editorial ? 'font-display font-black uppercase tracking-tight' : 'font-mono font-bold uppercase'
                }`}
                style={{ marginLeft: `${lineIndex * 9}%` }}
              >
                {words.map((word, wordIndex) => {
                  const accent = lineAccent || PUNCH_WORDS.has(bareWord(word))
                  return (
                    <span
                      key={wordIndex}
                      className={`inline-block max-w-full ${accent ? 'text-ember-500' : editorial ? 'text-fog' : 'text-amber'}`}
                      style={{
                        fontSize: accent
                          ? 'clamp(1.55rem, 3.7vw, 2.95rem)'
                          : editorial
                            ? 'clamp(1.28rem, 2.9vw, 2.2rem)'
                            : 'clamp(1.05rem, 2.25vw, 1.7rem)',
                        lineHeight: 1.4,
                        marginTop: wordIndex % 2 === 0 ? '0.15rem' : '0.55rem',
                      }}
                    >
                      {word}
                    </span>
                  )
                })}
              </p>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="journey-pass-copy" aria-label={lines.join(' ')}>
      <p className="journey-pass-prompt" aria-hidden="true">&gt;</p>
      <p className="journey-pass-lines" aria-hidden="true">
        {lines.map((line) => (
          <span key={line} className="journey-pass-line" data-pass-line>
            {Array.from(line).map((char, index) => (
              <span key={`${line}-${index}`} data-pass-char>
                {char === ' ' ? '\u00a0' : char}
              </span>
            ))}
          </span>
        ))}
        <span className="journey-caret" aria-hidden="true" />
      </p>
    </div>
  )
}

function SiliPoster() {
  const ready = useJourneyStore((state) => state.avatarReady)
  if (ready) return null
  return (
    <div className="sili-poster" aria-hidden="true">
      <SiliFace />
    </div>
  )
}

function Chrome() {
  const cornerOpen = useJourneyStore((state) => state.cornerOpen)

  return (
    <>
      <Navbar />
      <FloorIndicator />
      <SideRail />
      <div className={`journey-corner${cornerOpen ? ' is-open' : ''}`}>
        <SiliPreview />
        <HobbyCounter />
      </div>
    </>
  )
}

function SceneFallback() {
  useEffect(() => {
    const store = useJourneyStore.getState()
    store.setReady(true)
    store.setChrome({ nav: true, rail: true, side: true, counter: true })
  }, [])
  return null
}

function StaticHome() {
  useEffect(() => {
    const store = useJourneyStore.getState()
    store.setReady(true)
    store.setChrome({ nav: true, rail: true, side: true, counter: true })
  }, [])

  return (
    <div id="journey-scroll">
      <main className="bg-ink-950">
        <HeroScreen placement="flow" />
        <HeroIntro />
        <Sheet><AboutFloor layout="static" /></Sheet>
        <Sheet><StudiesFloor layout="static" /></Sheet>
        <Sheet><ExperienceTerminal layout="static" /></Sheet>
        <Sheet><ToolsIde layout="static" /></Sheet>
        <Sheet><ClosingFloor layout="static" /></Sheet>
        <JourneyFooter />
        <Chrome />
      </main>
    </div>
  )
}

function Journey() {
  const scrollerRef = useRef(null)
  const trackRef = useRef(null)
  const rigRef = useRef(null)
  if (!rigRef.current) rigRef.current = createRig()
  const rig = rigRef.current
  const panels = useRef({})
  const heroRef = useRef(null)
  const sceneRef = useRef(null)
  const [metrics, setMetrics] = useState(null)
  const unlocked = useUnlocked()
  const ready = useJourneyStore((state) => state.ready)

  useJourneyTimeline({
    trackRef,
    scrollerRef,
    rig,
    panels,
    heroRef,
    sceneRef,
    unlocked,
    metrics,
  })

  useEffect(() => {
    const store = useJourneyStore.getState()
    store.setFloor('welcome')
    store.setChapter('hero')
    store.setCornerOpen(null)
    store.setAvatarReady(false)
    store.setReady(false)
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    const node = scrollerRef.current
    if (node) node.scrollTop = 0
    return () => {
      store.setReady(false)
      store.setAvatarReady(false)
      store.setCornerOpen(null)
    }
  }, [])

  useEffect(() => {
    const node = scrollerRef.current
    if (!node) return undefined
    return bindJourneyScroll(node)
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMetrics((current) => current ?? FALLBACK_METRICS)
      const store = useJourneyStore.getState()
      if (store.ready) return
      store.setReady(true)
      store.setChrome({ nav: true, rail: true, side: true, counter: true })
    }, 7000)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!metrics || !ready) return undefined
    const at = Number(new URLSearchParams(window.location.search).get('at'))
    if (!Number.isFinite(at) || at <= 0 || at > 1) return undefined
    const timer = window.setTimeout(() => scrollToProgress(at, 'auto'), 60)
    return () => window.clearTimeout(timer)
  }, [metrics, ready])

  return (
    <div id="journey-scroll" ref={scrollerRef} data-journey-cap={unlocked ? '1' : String(LOCKED_PROGRESS)}>
      <JourneyBoot />
      <div ref={trackRef} className="relative" style={{ height: `${trackDvh(unlocked)}dvh` }}>
        <a href="#contenido" className="absolute -left-[999px] top-4 z-50 bg-ember-500 px-3 py-2 text-sm text-ink-950 focus:left-4">
          Saltar al contenido
        </a>
        <div className="journey-stage">
        <Layer id="about" layer="atmo" panels={panels} className="journey-atmo journey-atmo-about">
          <AboutWash />
        </Layer>
        <Layer id="studies" layer="atmo" panels={panels} className="journey-atmo journey-atmo-studies">
          <StudiesField />
        </Layer>
        <Layer id="experience" layer="atmo" panels={panels} className="journey-atmo">
          <ExperienceWash />
        </Layer>
        <Layer id="tools" layer="atmo" panels={panels} className="journey-atmo">
          <ToolsWash />
        </Layer>
        <Layer id="closing" layer="atmo" panels={panels} className="journey-atmo journey-atmo-closing">
          <ClosingWash />
        </Layer>
        <SecretCourt />
        <div ref={sceneRef} className="journey-scene">
          <ErrorBoundary fallback={<SceneFallback />}>
            <JourneyCanvas
              rig={rig}
              eventSource={scrollerRef}
              onReady={setMetrics}
              unlocked={unlocked}
              plateRef={heroRef}
            />
          </ErrorBoundary>
        </div>
        <SiliPoster />
        <HeroScreen ref={heroRef} />
        <HeroIntro />
        {passages.filter((stop) => stop.id !== 'secret').map((stop) => (
          <Layer
            key={stop.id}
            id={stop.id}
            layer="pass"
            variant={stop.variant}
            panels={panels}
            className="journey-pass"
          >
            <PassageStop stop={stop} />
          </Layer>
        ))}
        <Layer id="welcome" layer="panel" panels={panels} className="journey-floor">
          <WelcomeFloor />
        </Layer>
        <Layer id="about" layer="panel" panels={panels} side="end" className="journey-floor">
          <AboutFloor />
        </Layer>
        <Layer id="studies" layer="panel" panels={panels} side="split" className="journey-floor">
          <StudiesFloor />
        </Layer>
        <Layer id="experience" layer="panel" panels={panels} side="start" align="start" className="journey-floor">
          <ExperienceTerminal />
        </Layer>
        <Layer id="tools" layer="panel" panels={panels} side="end" align="start" className="journey-floor">
          <ToolsIde />
        </Layer>
        <Layer id="closing" layer="panel" panels={panels} side="start" className="journey-floor">
          <ClosingFloor />
        </Layer>
        <Layer id="secret" layer="panel" panels={panels} className="journey-floor journey-secret">
          <SecretRoom />
        </Layer>
        </div>
      </div>
      <JourneyFooter />
      <Chrome />
    </div>
  )
}

export function HomePage() {
  usePageMeta('/')
  const [webgl] = useState(supportsWebGL)
  if (!webgl) return <StaticHome />
  return (
    <ErrorBoundary fallback={<StaticHome />}>
      <Journey />
    </ErrorBoundary>
  )
}
