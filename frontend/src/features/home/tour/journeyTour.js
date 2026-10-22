import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { TOUR_COPY } from './tour.copy.js'

export const TOUR_KEY = 'siliezar-tour-v1'

export function hasSeenTour() {
  try {
    return window.localStorage.getItem(TOUR_KEY) === '1'
  } catch {
    return true
  }
}

export function markTourSeen() {
  try {
    window.localStorage.setItem(TOUR_KEY, '1')
  } catch {
    /* el tour puede repetirse desde el botón */
  }
}

export function clearTourSeen() {
  try {
    window.localStorage.removeItem(TOUR_KEY)
  } catch {
    /* sin efecto */
  }
}

function waitFor(selector, timeout = 5000) {
  return new Promise((resolve) => {
    const ready = (node) => {
      if (!node) return false
      const style = window.getComputedStyle(node)
      if (style.visibility === 'hidden' || style.display === 'none') return false
      if (Number(style.opacity) < 0.2) return false
      const rect = node.getBoundingClientRect()
      return rect.width > 4 && rect.height > 4
    }
    const found = document.querySelector(selector)
    if (ready(found)) {
      resolve(found)
      return
    }
    const started = Date.now()
    const timer = window.setInterval(() => {
      const node = document.querySelector(selector)
      if (ready(node) || Date.now() - started > timeout) {
        window.clearInterval(timer)
        resolve(ready(node) ? node : null)
      }
    }, 80)
  })
}

export async function startJourneyTour(lang = 'es', { force = false } = {}) {
  if (!force && hasSeenTour()) return null
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches && !force) {
    markTourSeen()
    return null
  }

  const copy = TOUR_COPY[lang === 'en' ? 'en' : 'es']
  const targets = [
    { selector: '[data-tour="nav"] .masthead', side: 'bottom', align: 'center' },
    { selector: '[data-tour="sili"] .sili-card', side: 'left', align: 'end' },
    { selector: '[data-tour="hobbies"] .hobby-card', side: 'left', align: 'center' },
    { selector: '[data-tour="contact"]', side: 'left', align: 'start' },
    { selector: '[data-tour="route"]', side: 'top', align: 'start' },
  ]

  const nodes = await Promise.all(targets.map((item) => waitFor(item.selector)))

  const steps = copy.steps
    .map((step, index) => {
      const element = nodes[index]
      if (!element) return null
      return {
        element,
        popover: {
          title: step.title,
          description: step.description,
          side: targets[index].side,
          align: targets[index].align,
        },
      }
    })
    .filter(Boolean)

  if (!steps.length) return null

  const tour = driver({
    showProgress: true,
    animate: true,
    allowClose: true,
    smoothScroll: false,
    overlayOpacity: 0.62,
    stagePadding: 10,
    stageRadius: 0,
    popoverClass: 'siliezar-tour',
    nextBtnText: copy.next,
    prevBtnText: copy.prev,
    doneBtnText: copy.done,
    progressText: copy.progress,
    steps,
    onHighlightStarted: (element) => {
      if (element instanceof HTMLElement) {
        element.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' })
      }
    },
    onDestroyed: () => {
      markTourSeen()
    },
  })

  tour.drive()
  window.requestAnimationFrame(() => tour.refresh())
  return tour
}
