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
import { passages } from '../content/journey.content.js'
import { FloorIndicator } from '../components/ui/FloorIndicator.jsx'
import { JourneyFooter } from '../components/ui/JourneyFooter.jsx'
import { SiliPreview } from '../components/ui/SiliPreview.jsx'
import { SiliFace } from '../components/ui/SiliFace.jsx'
import { JourneyBoot } from '../components/ui/JourneyBoot.jsx'
import { bindJourneyScroll, createRig, LOCKED_PROGRESS, scrollToProgress, trackDvh } from '../lib/journeyRig.js'
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

function PassageStop({ stop }) {
  const { variant = 'console', lines = [] } = stop

  if (variant === 'editorial') {
    return (
      <div className="w-full max-w-4xl" aria-label={lines.join(' ')}>
        <div className="flex flex-col gap-2.5" aria-hidden="true">
          {lines.map((line, index) => (
            <div key={line} className="overflow-hidden py-1">
              <p
                data-pass-slice
                className={`m-0 font-display text-[clamp(1.35rem,3.4vw,2.75rem)] font-black uppercase leading-[1.12] tracking-tight ${
                  index === 0 ? 'text-fog' : 'text-ember-500'
                }`}
              >
                {line}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'led') {
    return (
      <div className="w-full max-w-4xl" aria-label={lines.join(' ')}>
        <div className="flex flex-col gap-3" aria-hidden="true">
          {lines.map((line, lineIndex) => (
            <p key={line} className="m-0 flex flex-wrap gap-2 font-mono text-[clamp(1.05rem,2.3vw,1.7rem)] font-bold uppercase">
              {line.split(' ').map((word, wordIndex) => (
                <span
                  key={`${lineIndex}-${wordIndex}`}
                  data-pass-led
                  className={`inline-block ${lineIndex === 0 ? 'text-amber' : 'text-ember-500'}`}
                >
                  {word}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'comic') {
    return (
      <div data-pass-comic className="w-full max-w-3xl" aria-label={lines.join(' ')}>
        <div className="flex flex-col gap-2" aria-hidden="true">
          {lines.map((line, index) => (
            <p
              key={line}
              data-pass-hit
              className={`m-0 font-display text-[clamp(1.35rem,3.2vw,2.5rem)] font-black uppercase leading-[1.05] tracking-tight ${
                index === 0 ? 'text-fog' : 'text-ember-500'
              }`}
            >
              {line}
            </p>
          ))}
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
  return (
    <>
      <Navbar />
      <FloorIndicator />
      <SideRail />
      <div className="journey-corner">
        <SiliPreview />
        <HobbyCounter />
      </div>
    </>
  )
}

function StaticHome() {
  return (
    <div id="journey-scroll">
      <main className="bg-ink-950">
        <HeroScreen placement="flow" />
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
          <JourneyCanvas
            rig={rig}
            eventSource={scrollerRef}
            onReady={setMetrics}
            unlocked={unlocked}
            plateRef={heroRef}
          />
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
