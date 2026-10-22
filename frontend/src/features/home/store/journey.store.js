import { create } from 'zustand'

export const INTRO_SEEN = 'siliezar-intro-seen'

const chromeOn = { nav: true, rail: true, side: true, counter: true }
const chromeOff = { nav: false, rail: false, side: false, counter: false }

function linkedFloor() {
  try {
    const at = Number(new URLSearchParams(window.location.search).get('at'))
    return Number.isFinite(at) && at > 0
  } catch {
    return false
  }
}

function readIntroSeen() {
  try {
    if (window.localStorage.getItem(INTRO_SEEN) === '1') return true
    if (window.sessionStorage.getItem(INTRO_SEEN) === '1') {
      window.localStorage.setItem(INTRO_SEEN, '1')
      window.sessionStorage.removeItem(INTRO_SEEN)
      return true
    }
  } catch {
    return true
  }
  return false
}

function introSettled() {
  if (typeof window === 'undefined') return true
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  if (linkedFloor()) return true
  return readIntroSeen()
}

export function markIntroSeen() {
  try {
    window.localStorage.setItem(INTRO_SEEN, '1')
    window.sessionStorage.removeItem(INTRO_SEEN)
  } catch {
    /* la intro sigue aunque el almacenamiento falle */
  }
}

export function hasSeenIntro() {
  if (typeof window === 'undefined') return true
  return readIntroSeen()
}

export function floorReadsLight(floorId) {
  return floorId === 'studies' || floorId === 'closing'
}

export const useJourneyStore = create((set) => ({
  floorId: 'welcome',
  chapter: 'hero',
  ready: false,
  avatarReady: false,
  introToken: 0,
  chrome: introSettled() ? chromeOn : chromeOff,
  cornerOpen: null,
  setFloor: (floorId) => set((state) => (state.floorId === floorId ? state : { floorId })),
  setChapter: (chapter) => set((state) => (state.chapter === chapter ? state : { chapter })),
  setReady: (ready) => set({ ready }),
  setAvatarReady: (avatarReady) => set({ avatarReady }),
  setChrome: (partial) => set((state) => ({ chrome: { ...state.chrome, ...partial } })),
  setCornerOpen: (cornerOpen) => set((state) => (state.cornerOpen === cornerOpen ? state : { cornerOpen })),
  resetJourney: () => set({
    floorId: 'welcome',
    chapter: 'hero',
    ready: false,
    avatarReady: false,
    cornerOpen: null,
  }),
  replayIntro: () => set((state) => ({
    introToken: state.introToken + 1,
    chapter: 'hero',
    cornerOpen: null,
  })),
}))
