import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { scrollToProgress } from '../../lib/journeyRig.js'
import { INTRO_SEEN, useJourneyStore } from '../../store/journey.store.js'

const HELLO = 'Hola, soy Sil. Pregúntame cuando quieras.'
const PROMPT = '¿Quién es Angel Siliezar?'
const REPLY = 'Listo. En segundos generé el portafolio: bienvenida, trayectoria y el recorrido completo.'

function shouldPlay(token) {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  const at = Number(new URLSearchParams(window.location.search).get('at'))
  if (token === 0 && Number.isFinite(at) && at > 0) return false
  if (token > 0) return true
  try {
    return window.sessionStorage.getItem(INTRO_SEEN) !== '1'
  } catch {
    return false
  }
}

export function HeroIntro() {
  const token = useJourneyStore((state) => state.introToken)
  const ready = useJourneyStore((state) => state.ready)
  const root = useRef(null)
  const timelineRef = useRef(null)
  const [play, setPlay] = useState(false)

  useLayoutEffect(() => {
    if (!ready) {
      setPlay(false)
      return
    }
    setPlay(shouldPlay(token))
  }, [token, ready])

  useLayoutEffect(() => {
    if (play) return undefined
    if (!ready) return undefined
    useJourneyStore.getState().setChrome({ nav: true, rail: true, side: true, counter: true })
    return undefined
  }, [play, token, ready])

  useLayoutEffect(() => {
    if (!ready || !play || !root.current) return undefined
    const scroller = document.getElementById('journey-scroll')
    if (scroller) scroller.style.overflow = 'hidden'
    scrollToProgress(0, 'auto')
    useJourneyStore.getState().setChrome({ nav: false, rail: false, side: false, counter: false })
    let finished = false

    const finish = () => {
      if (finished) return
      finished = true
      try {
        window.sessionStorage.setItem(INTRO_SEEN, '1')
      } catch {
        /* la intro sigue aunque el almacenamiento falle */
      }
      useJourneyStore.getState().setChrome({ nav: true, rail: true, side: true, counter: true })
      if (scroller) scroller.style.overflow = ''
      setPlay(false)
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root.current)
      const hello = q('[data-line="hello"]')
      const user = q('[data-line="user"]')
      const think = q('[data-line="think"]')
      const reply = q('[data-line="reply"]')
      const chat = q('[data-chat]')
      const navWire = q('[data-wire="nav"]')
      const railWire = q('[data-wire="rail"]')
      const titleWire = q('[data-wire="title"]')
      const photoWire = q('[data-wire="photo"]')
      const sideWire = q('[data-wire="side"]')
      const ink = q('[data-ink]')

      gsap.set([hello, user, think, reply], { autoAlpha: 0, y: 12 })
      gsap.set(ink, { autoAlpha: 1 })
      gsap.set(chat, { autoAlpha: 1, y: 0 })
      gsap.set([navWire, titleWire], { scaleX: 0, transformOrigin: 'left center' })
      gsap.set([railWire, photoWire, sideWire], { scaleY: 0, transformOrigin: 'top center' })

      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } })
      timelineRef.current = timeline

      timeline
        .fromTo(hello, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.15)
        .fromTo(user, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.85)
        .fromTo(think, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.28 }, 1.4)
        .to(think, { autoAlpha: 0, y: -8, duration: 0.22 }, 2.45)
        .fromTo(reply, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.45 }, 2.65)
        .to(chat, { autoAlpha: 0, y: -12, duration: 0.4 }, 4.2)
        .to(navWire, { scaleX: 1, duration: 0.7 }, 4.45)
        .call(() => useJourneyStore.getState().setChrome({ nav: true }), [], 4.85)
        .to(railWire, { scaleY: 1, duration: 0.75 }, 5.05)
        .call(() => useJourneyStore.getState().setChrome({ rail: true }), [], 5.5)
        .to(titleWire, { scaleX: 1, duration: 0.65 }, 5.7)
        .to(photoWire, { scaleY: 1, duration: 0.6 }, 5.9)
        .to(sideWire, { scaleY: 1, duration: 0.4 }, 6.35)
        .call(() => useJourneyStore.getState().setChrome({ side: true, counter: true }), [], 6.55)
        .to(ink, { autoAlpha: 0, duration: 0.7 }, 6.85)
        .call(finish, [], 7.55)
    }, root)

    return () => {
      ctx.revert()
      if (scroller) scroller.style.overflow = ''
    }
  }, [play, token, ready])

  if (!play) return null

  return (
    <div ref={root} className="fixed inset-0 z-[120]" role="dialog" aria-modal="true" aria-label="Introducción al portafolio">
      <div data-ink className="absolute inset-0 bg-ink-950" />
      <div data-chat className="sili-panel sili-intro top-[46%] left-1/2 z-[2] -translate-x-1/2 -translate-y-1/2">
        <header className="sili-chat-bar">
          <span className="sili-chat-dot" aria-hidden="true" />
          Sil
        </header>
        <div className="sili-thread">
          <p data-line="hello" className="sili-bubble sili-bubble-bot">{HELLO}</p>
          <p data-line="user" className="sili-bubble sili-bubble-user">{PROMPT}</p>
          <p data-line="think" className="sili-bubble sili-bubble-bot sili-typing" aria-hidden="true">
            <span />
            <span />
            <span />
          </p>
          <p data-line="reply" className="sili-bubble sili-bubble-bot">{REPLY}</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-4 top-0 z-[1] h-16 border border-ember-500 md:inset-x-6" data-wire="nav" />
      <div className="pointer-events-none absolute top-20 right-3 bottom-24 z-[1] flex w-8 flex-col items-center justify-center gap-2" data-wire="rail">
        {['5', '4', '3', '2', '1', '0', '-1'].map((floor) => (
          <span key={floor} className="flex h-8 w-8 items-center justify-center border border-ember-500 font-mono text-[10px] text-ember-300">
            {floor}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] flex flex-col justify-center gap-8 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-[8vw]">
        <div data-wire="title" className="h-36 w-full max-w-3xl border border-ember-500" />
        <div data-wire="photo" className="h-72 w-full max-w-[220px] border border-ember-300 lg:max-w-[280px]" />
      </div>
      <div data-wire="side" className="pointer-events-none absolute bottom-4 left-4 z-[1] flex flex-col gap-2">
        <span className="h-11 w-11 border border-ember-500" />
        <span className="h-11 w-11 border border-ink-700" />
      </div>
      <button
        type="button"
        data-ui
        onClick={() => timelineRef.current?.progress(1)}
        className="absolute right-6 bottom-6 z-10 border border-ink-700 bg-ink-950/90 px-3 py-2 font-mono text-xs text-fog"
      >
        Saltar
      </button>
    </div>
  )
}
