import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { scrollToProgress } from '../../lib/journeyRig.js'
import { CHROME } from '../../../../shared/i18n/copy.js'
import { useLocaleStore } from '../../../../shared/i18n/locale.store.js'
import { hasSeenIntro, markIntroSeen, useJourneyStore } from '../../store/journey.store.js'
import { SiliFace } from '../ui/SiliFace.jsx'

const WIRE_TARGETS = {
  nav: '.masthead-shell .masthead',
  rail: '.floor-rail',
  title: '.journey-hero-copy',
  photo: '.journey-hero-photo',
  side: '.side-rail',
}

function shouldPlay(token) {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  const at = Number(new URLSearchParams(window.location.search).get('at'))
  if (token === 0 && Number.isFinite(at) && at > 0) return false
  if (token > 0) return true
  return !hasSeenIntro()
}

function placeWire(node, target) {
  if (!node) return false
  if (!target) {
    gsap.set(node, { autoAlpha: 0 })
    return false
  }
  const rect = target.getBoundingClientRect()
  if (rect.width < 2 || rect.height < 2) {
    gsap.set(node, { autoAlpha: 0 })
    return false
  }
  gsap.set(node, {
    position: 'fixed',
    top: rect.top,
    left: rect.left,
    width: Math.ceil(rect.width),
    height: Math.ceil(rect.height),
    x: 0,
    y: 0,
  })
  return true
}

function syncWires(root) {
  if (!root) return {}
  const q = gsap.utils.selector(root)
  const placed = {}
  for (const [key, selector] of Object.entries(WIRE_TARGETS)) {
    placed[key] = placeWire(q(`[data-wire="${key}"]`)[0], document.querySelector(selector))
  }
  return placed
}

export function HeroIntro() {
  const token = useJourneyStore((state) => state.introToken)
  const ready = useJourneyStore((state) => state.ready)
  const chrome = CHROME[useLocaleStore((state) => state.lang)]
  const root = useRef(null)
  const timelineRef = useRef(null)
  const finishedRef = useRef(false)
  const [play, setPlay] = useState(false)

  useLayoutEffect(() => {
    if (!ready) {
      setPlay(false)
      return
    }
    setPlay(shouldPlay(token))
  }, [token, ready])

  useLayoutEffect(() => {
    if (play || !ready) return undefined
    useJourneyStore.getState().setChrome({ nav: true, rail: true, side: true, counter: true })
    return undefined
  }, [play, token, ready])

  useLayoutEffect(() => {
    if (!ready || !play || !root.current) return undefined

    const scroller = document.getElementById('journey-scroll')
    if (scroller) scroller.style.overflow = 'hidden'
    scrollToProgress(0, 'auto')
    useJourneyStore.getState().setChrome({ nav: false, rail: false, side: false, counter: false })
    finishedRef.current = false

    const finish = () => {
      if (finishedRef.current) return
      finishedRef.current = true
      markIntroSeen()
      useJourneyStore.getState().setChrome({ nav: true, rail: true, side: true, counter: true })
      if (scroller) scroller.style.overflow = ''
      setPlay(false)
      window.setTimeout(() => scrollToProgress(0.09, 'smooth'), 380)
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root.current)
      const stage = q('[data-chat]')
      const wires = q('[data-wire]')
      const ink = q('[data-ink]')
      const navWire = q('[data-wire="nav"]')
      const railWire = q('[data-wire="rail"]')
      const titleWire = q('[data-wire="title"]')
      const photoWire = q('[data-wire="photo"]')
      const sideWire = q('[data-wire="side"]')

      gsap.set([ink, stage], { autoAlpha: 1, y: 0, clearProps: 'opacity,visibility' })
      gsap.set(wires, { autoAlpha: 0 })
      syncWires(root.current)

      const onResize = () => {
        if (finishedRef.current) return
        syncWires(root.current)
      }
      window.addEventListener('resize', onResize)

      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } })
      timelineRef.current = timeline

      timeline
        .to(stage, { autoAlpha: 0, y: -14, duration: 0.35 }, 4.1)
        .add(() => {
          const placed = syncWires(root.current)
          gsap.set(wires, { autoAlpha: 0, scaleX: 1, scaleY: 1 })

          const grow = (node, axis, at) => {
            if (!node?.[0]) return
            const vertical = axis === 'y'
            gsap.set(node, {
              autoAlpha: 1,
              scaleX: vertical ? 1 : 0,
              scaleY: vertical ? 0 : 1,
              transformOrigin: vertical ? 'top center' : 'left center',
            })
            timeline.to(node, { scaleX: 1, scaleY: 1, duration: 0.52, ease: 'power2.out' }, at)
          }

          if (placed.nav) grow(navWire, 'x', 4.35)
          if (placed.rail) grow(railWire, 'y', 4.85)
          if (placed.title) grow(titleWire, 'x', 5.35)
          if (placed.photo) grow(photoWire, 'y', 5.5)
          if (placed.side) grow(sideWire, 'y', 5.85)
        }, 4.3)
        .add(() => useJourneyStore.getState().setChrome({ nav: true }), 4.7)
        .add(() => useJourneyStore.getState().setChrome({ rail: true }), 5.2)
        .add(() => useJourneyStore.getState().setChrome({ side: true, counter: true }), 6.1)
        .to([wires, ink], { autoAlpha: 0, duration: 0.4 }, 6.35)
        .add(finish, 6.8)

      return () => window.removeEventListener('resize', onResize)
    }, root.current)

    return () => {
      timelineRef.current = null
      ctx.revert()
      if (scroller) scroller.style.overflow = ''
      if (!finishedRef.current) {
        useJourneyStore.getState().setChrome({ nav: true, rail: true, side: true, counter: true })
      }
    }
  }, [play, token, ready])

  if (!play) return null

  return (
    <div
      ref={root}
      data-intro="playing"
      className="fixed inset-0 z-[120] overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label={chrome.introLabel}
    >
      <div data-ink className="absolute inset-0 bg-ink-950" />
      <div data-chat className="sili-intro-stage">
        <div className="sili-intro-agent" aria-hidden="true">
          <SiliFace className="sili-intro-face" />
          <span className="sili-intro-agent-tag">Sili · agente</span>
        </div>
        <div className="sili-panel sili-intro">
          <header className="sili-chat-bar">
            <span className="sili-chat-dot" aria-hidden="true" />
            Sili
          </header>
          <div className="sili-thread sili-intro-thread">
            <p data-line="hello" className="sili-bubble sili-bubble-bot">
              {chrome.hello}
            </p>
            <p data-line="user" className="sili-bubble sili-bubble-user">
              {chrome.prompt}
            </p>
            <p data-line="think" className="sili-bubble sili-bubble-bot sili-typing" aria-hidden="true">
              <span />
              <span />
              <span />
            </p>
            <p data-line="reply" className="sili-bubble sili-bubble-bot">
              {chrome.reply}
            </p>
          </div>
        </div>
      </div>
      <div className="intro-wire pointer-events-none fixed z-[1] border border-ember-500" data-wire="nav" aria-hidden="true" />
      <div className="intro-wire pointer-events-none fixed z-[1] border border-ember-500" data-wire="rail" aria-hidden="true" />
      <div className="intro-wire pointer-events-none fixed z-[1] border border-ember-500" data-wire="title" aria-hidden="true" />
      <div className="intro-wire pointer-events-none fixed z-[1] border border-ember-300" data-wire="photo" aria-hidden="true" />
      <div className="intro-wire pointer-events-none fixed z-[1] border border-ember-500" data-wire="side" aria-hidden="true" />
      <button
        type="button"
        data-ui
        onClick={() => timelineRef.current?.progress(1)}
        className="absolute right-6 bottom-6 z-10 border border-ink-700 bg-ink-950/90 px-3 py-2 font-mono text-xs text-fog"
      >
        {chrome.skipIntro}
      </button>
    </div>
  )
}
