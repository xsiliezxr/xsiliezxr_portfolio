import { useEffect, useRef } from 'react'
import { useLocaleStore } from '../../../shared/i18n/locale.store.js'
import { hasSeenIntro, useJourneyStore } from '../store/journey.store.js'
import { scrollToProgress } from '../lib/journeyRig.js'
import { hasSeenTour, startJourneyTour } from './journeyTour.js'

function welcomeCardReady() {
  const card = document.querySelector('[data-tour="welcome"]')
  if (!card) return false
  if (document.querySelector('[data-intro="playing"]')) return false

  const beat = card.closest('[data-beat]') || card
  const opacity = Number(window.getComputedStyle(beat).opacity)
  if (opacity < 0.45) return false

  const rect = card.getBoundingClientRect()
  const vh = window.innerHeight || 1
  const visible = rect.bottom > vh * 0.12 && rect.top < vh * 0.92 && rect.height > 24
  return visible
}

export function useWelcomeTour(enabled) {
  const lang = useLocaleStore((state) => state.lang)
  const chromeReady = useJourneyStore((state) => state.chrome.nav && state.chrome.side && state.chrome.counter)
  const ready = useJourneyStore((state) => state.ready)
  const started = useRef(false)

  useEffect(() => {
    if (!enabled || !ready || !chromeReady || started.current) return undefined
    if (!hasSeenIntro() && document.querySelector('[data-intro="playing"]')) return undefined
    if (hasSeenTour()) return undefined

    let cancelled = false
    let observer = null

    const launch = () => {
      if (cancelled || started.current || !welcomeCardReady()) return
      started.current = true
      if (observer) observer.disconnect()
      startJourneyTour(lang)
    }

    const watch = () => {
      const card = document.querySelector('[data-tour="welcome"]')
      if (!card) return
      if (!observer) {
        observer = new IntersectionObserver(() => launch(), { threshold: [0.35, 0.55, 0.75] })
        observer.observe(card)
      }
      launch()
    }

    const nudge = window.setTimeout(() => {
      if (cancelled || started.current || welcomeCardReady()) return
      scrollToProgress(0.09, 'smooth')
    }, 900)

    const poll = window.setInterval(watch, 180)
    const delay = window.setTimeout(watch, 700)

    return () => {
      cancelled = true
      window.clearInterval(poll)
      window.clearTimeout(delay)
      window.clearTimeout(nudge)
      if (observer) observer.disconnect()
    }
  }, [enabled, ready, chromeReady, lang])
}

export function replayWelcomeTour(lang) {
  return startJourneyTour(lang, { force: true })
}
