import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { scrollToProgress } from '../../lib/journeyRig.js'
import { INTRO_SEEN, useJourneyStore } from '../../store/journey.store.js'

const PROMPT = '¿Quién es Angel Siliezar?'
const GATHERING = 'Preparando la plancha de impresión del portafolio…'
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
  const root = useRef(null)
  const timelineRef = useRef(null)
  const [play, setPlay] = useState(() => shouldPlay(0))

  useEffect(() => {
    setPlay(shouldPlay(token))
  }, [token])

  useEffect(() => {
    if (play) return undefined
    useJourneyStore.getState().setChrome({ nav: true, rail: true, side: true, counter: true })
    return undefined
  }, [play, token])

  useEffect(() => {
    if (!play || !root.current) return undefined
    const scroller = document.getElementById('journey-scroll')
    if (scroller) scroller.style.overflow = 'hidden'
    scrollToProgress(0, 'auto')
    const store = useJourneyStore.getState()
    store.setChrome({ nav: false, rail: false, side: false, counter: false })
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
      const user = q('[data-line="user"]')
      const think = q('[data-line="think"]')
      const gather = q('[data-line="gather"]')
      const reply = q('[data-line="reply"]')
      const chat = q('[data-chat]')
      const navWire = q('[data-wire="nav"]')
      const railWire = q('[data-wire="rail"]')
      const titleWire = q('[data-wire="title"]')
      const photoWire = q('[data-wire="photo"]')
      const sideWire = q('[data-wire="side"]')
      const ink = q('[data-ink]')

      gsap.set([think, gather, reply], { autoAlpha: 0, display: 'none' })
      gsap.set(user, { clipPath: 'inset(0 100% 0 0)' })
      gsap.set([navWire, titleWire], { scaleX: 0, transformOrigin: 'left center' })
      gsap.set([railWire, photoWire, sideWire], { scaleY: 0, transformOrigin: 'top center' })

      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } })
      timelineRef.current = timeline

      timeline
        .addLabel('ask', 0)
        .to(user, { clipPath: 'inset(0 0% 0 0)', duration: 1.05, ease: 'none' }, 'ask')
        .addLabel('think', 'ask+=1.25')
        .set(think, { display: 'block' }, 'think')
        .to(think, { autoAlpha: 1, y: 0, duration: 0.28 }, 'think')
        .addLabel('gather', 'think+=0.38')
        .to(think, { autoAlpha: 0, duration: 0.18 }, 'gather')
        .set(think, { display: 'none' }, 'gather+=0.18')
        .set(gather, { display: 'block' }, 'gather+=0.18')
        .to(gather, { autoAlpha: 1, duration: 0.28 }, 'gather+=0.18')
        .addLabel('reply', 'gather+=0.62')
        .set(gather, { display: 'none' }, 'reply')
        .set(reply, { display: 'block', clipPath: 'inset(0 100% 0 0)' }, 'reply')
        .to(reply, { autoAlpha: 1, duration: 0.12 }, 'reply')
        .to(reply, { clipPath: 'inset(0 0% 0 0)', duration: 1.7, ease: 'none' }, 'reply')
        .addLabel('build', 'reply+=2.05')
        .to(chat, { autoAlpha: 0, y: -16, duration: 0.35 }, 'build')
        .addLabel('nav', 'build+=0.2')
        .to(navWire, { scaleX: 1, duration: 0.7 }, 'nav')
        .call(() => useJourneyStore.getState().setChrome({ nav: true }), [], 'nav+=0.42')
        .addLabel('rail', 'nav+=0.55')
        .to(railWire, { scaleY: 1, duration: 0.75 }, 'rail')
        .call(() => useJourneyStore.getState().setChrome({ rail: true }), [], 'rail+=0.45')
        .addLabel('hero', 'rail+=0.6')
        .to(titleWire, { scaleX: 1, duration: 0.65 }, 'hero')
        .to(photoWire, { scaleY: 1, duration: 0.6 }, 'hero+=0.18')
        .addLabel('side', 'hero+=0.55')
        .to(sideWire, { scaleY: 1, duration: 0.4 }, 'side')
        .call(() => useJourneyStore.getState().setChrome({ side: true, counter: true }), [], 'side+=0.22')
        .addLabel('reveal', 'side+=0.45')
        .to(ink, { autoAlpha: 0, duration: 0.7 }, 'reveal')
        .call(finish, [], 'reveal+=0.72')
    }, root)

    return () => {
      ctx.revert()
      if (scroller) scroller.style.overflow = ''
    }
  }, [play, token])

  if (!play) return null

  return (
    <div ref={root} className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Introducción al portafolio">
      <div data-ink className="absolute inset-0 bg-ink-950" />
      <div data-chat className="absolute top-1/2 left-1/2 w-[min(92vw,34rem)] -translate-x-1/2 -translate-y-1/2 border border-ember-800 bg-ink-900">
        <div className="flex gap-2 border-b border-ink-700 px-4 py-3">
          <span className="h-2.5 w-2.5 bg-ember-500" />
          <span className="h-2.5 w-2.5 bg-amber" />
          <span className="h-2.5 w-2.5 bg-fog-dim" />
        </div>
        <div className="flex flex-col gap-4 px-5 py-6">
          <p data-line="user" className="max-w-[80%] self-end bg-ember-500 px-3 py-2 text-sm text-ink-950">
            {PROMPT}
          </p>
          <p data-line="think" className="font-mono text-xs text-ember-300">···</p>
          <p data-line="gather" className="font-mono text-xs text-ember-300">{GATHERING}</p>
          <p data-line="reply" className="max-w-[88%] bg-ink-800 px-3 py-2 text-sm leading-relaxed text-fog">
            {REPLY}
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-4 top-0 h-16 border border-ember-500 md:inset-x-6" data-wire="nav" />
      <div className="pointer-events-none absolute top-20 right-3 bottom-24 flex w-8 flex-col items-center justify-center gap-2" data-wire="rail">
        {['5', '4', '3', '2', '1', '0', '-1'].map((floor) => (
          <span key={floor} className="flex h-8 w-8 items-center justify-center border border-ember-500 font-mono text-[10px] text-ember-300">
            {floor}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-8 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-[8vw]">
        <div data-wire="title" className="h-36 w-full max-w-3xl border border-ember-500" />
        <div data-wire="photo" className="h-72 w-full max-w-[220px] border border-ember-300 lg:max-w-[280px]" />
      </div>
      <div data-wire="side" className="pointer-events-none absolute bottom-4 left-4 flex flex-col gap-2">
        <span className="h-11 w-11 border border-ember-500" />
        <span className="h-11 w-11 border border-ink-700" />
      </div>
      <button type="button" data-ui onClick={() => timelineRef.current?.progress(1)} className="absolute right-6 bottom-6 z-10 font-mono text-xs text-fog-dim">
        Saltar
      </button>
    </div>
  )
}
