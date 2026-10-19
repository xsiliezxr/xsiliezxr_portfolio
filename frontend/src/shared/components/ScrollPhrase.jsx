import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function ScrollPhrase({ phrase }) {
  const rootRef = useRef(null)
  const reduce = useReducedMotion()
  const { variant = 'editorial', top, bottom } = phrase
  const comic = variant === 'comic'

  useGSAP(() => {
    const root = rootRef.current
    const scroller = document.getElementById('page-scroll')
    if (!root || !scroller || reduce) return undefined

    const topLine = root.querySelector('[data-phrase="top"]')
    const bottomLine = root.querySelector('[data-phrase="bottom"]')
    gsap.set([topLine, bottomLine], { autoAlpha: 0, y: 28 })
    if (topLine) gsap.set(topLine, { x: -36 })
    if (bottomLine) gsap.set(bottomLine, { x: 36 })

    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: root,
        scroller,
        start: 'top 78%',
        end: 'bottom 28%',
        scrub: 0.4,
        invalidateOnRefresh: true,
      },
    })

    timeline
      .to(topLine, { autoAlpha: 1, x: 0, y: 0, duration: 0.45 }, 0)
      .to(bottomLine, { autoAlpha: 1, x: 0, y: 0, duration: 0.45 }, 0.08)
      .to([topLine, bottomLine], { autoAlpha: 0.35, duration: 0.35 }, 0.72)

    return undefined
  }, { scope: rootRef, dependencies: [reduce, phrase.id], revertOnUpdate: true })

  return (
    <section
      ref={rootRef}
      className={`scroll-phrase ${comic ? 'is-comic' : 'is-editorial'}`}
      aria-label={`${top}. ${bottom}`}
    >
      <p data-phrase="top" className="scroll-phrase-line is-top">
        {top}
      </p>
      <p data-phrase="bottom" className="scroll-phrase-line is-bottom">
        {bottom}
      </p>
    </section>
  )
}
