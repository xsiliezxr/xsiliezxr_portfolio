import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../../shared/hooks/useReducedMotion.js'
import { HISTORY_BRAINSTORM, HISTORY_CORE_PHRASE } from '../history.data.js'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PHRASE_WORDS = HISTORY_CORE_PHRASE.split(' ')

export function HistoryBrainstorm() {
  const rootRef = useRef(null)
  const reduce = useReducedMotion()

  useGSAP(() => {
    const root = rootRef.current
    const scroller = document.getElementById('page-scroll')
    if (!root || !scroller) return undefined

    const overlay = root.querySelector('[data-brain-overlay]')
    const wordsLayer = root.querySelector('[data-brain-words]')
    const seed = root.querySelector('[data-brain-seed]')
    const rain = gsap.utils.toArray('[data-brain]:not([data-brain-seed])', root)
    const chars = gsap.utils.toArray('[data-core-char]', root)
    const core = root.querySelector('[data-brain-core]')

    if (reduce) {
      gsap.set([seed, ...rain].filter(Boolean), { autoAlpha: 0.75, y: 0, scale: 1 })
      gsap.set(chars, { autoAlpha: 1 })
      if (wordsLayer) {
        wordsLayer.classList.add('is-blurred')
        gsap.set(wordsLayer, { filter: 'blur(5px)' })
      }
      gsap.set(overlay, { autoAlpha: 0 })
      return undefined
    }

    if (seed) {
      gsap.fromTo(
        seed,
        { autoAlpha: 0, scale: 0.7, y: 24 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 },
      )
    }

    gsap.set(rain, { autoAlpha: 0, y: (i) => -40 - (i % 8) * 10, scale: 0.9 })
    gsap.set(chars, { autoAlpha: 0, y: 14 })
    if (wordsLayer) {
      wordsLayer.classList.remove('is-blurred')
      gsap.set(wordsLayer, { filter: 'blur(0px)' })
    }
    gsap.set(overlay, { autoAlpha: 1 })
    gsap.set(core, { autoAlpha: 1 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        scroller,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.55,
        invalidateOnRefresh: true,
      },
    })

    // Lluvia de palabras (primera mitad).
    rain.forEach((chip, index) => {
      const reject = chip.dataset.tone === 'reject'
      tl.to(
        chip,
        {
          autoAlpha: reject ? 0.88 : 0.9,
          y: 0,
          scale: 1,
          ease: 'none',
          duration: 0.1,
        },
        index * 0.014,
      )
    })

    // Frase se construye después de que el collage ya está poblado.
    tl.to(
      chars,
      {
        autoAlpha: 1,
        y: 0,
        ease: 'none',
        stagger: 0.028,
        duration: 0.28,
      },
      0.28,
    )

    // Blur solo en palabras de fondo; frase nítida.
    tl.to(
      wordsLayer,
      {
        filter: 'blur(5px)',
        ease: 'power1.out',
        duration: 0.12,
        onStart: () => wordsLayer?.classList.add('is-blurred'),
      },
      0.58,
    )

    // Hold limpio, luego desvanecimiento tardío de toda la capa.
    tl.to({}, { duration: 0.16 }, 0.7)
    tl.to(
      [overlay, core],
      {
        autoAlpha: 0,
        ease: 'power2.inOut',
        duration: 0.18,
      },
      0.86,
    )

    return undefined
  }, { scope: rootRef, dependencies: [reduce], revertOnUpdate: true })

  return (
    <section ref={rootRef} className="history-brain-stage" aria-hidden="true">
      <div className="history-brain-sticky">
        <div data-brain-overlay className="history-brain-overlay">
          <div data-brain-words className="history-brain">
            {HISTORY_BRAINSTORM.map((item) => {
              const place = {
                top: item.top,
                left: item.left,
                right: item.right,
                bottom: item.bottom,
              }
              return (
                <span
                  key={item.id}
                  data-brain
                  data-brain-seed={item.seed ? '' : undefined}
                  data-tone={item.tone}
                  className="history-brain-anchor"
                  style={place}
                >
                  <span
                    className={`history-brain-chip history-brain-${item.shape} history-brain-${item.tone}`}
                    style={{ fontSize: item.size, transform: `rotate(${item.rotate}deg)` }}
                  >
                    {item.label}
                  </span>
                </span>
              )
            })}
          </div>

          <p data-brain-core className="history-brain-core">
            {PHRASE_WORDS.map((word, wordIndex) => (
              <span key={`${word}-${wordIndex}`} className="history-brain-core-word">
                {Array.from(word).map((char, charIndex) => (
                  <span key={`${word}-${charIndex}`} data-core-char className="history-brain-core-char">
                    {char}
                  </span>
                ))}
                {wordIndex < PHRASE_WORDS.length - 1 ? (
                  <span data-core-char className="history-brain-core-space">
                    {'\u00a0'}
                  </span>
                ) : null}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}
