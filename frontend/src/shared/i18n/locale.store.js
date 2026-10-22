import { create } from 'zustand'

const KEY = 'siliezar-lang'

function readLang() {
  try {
    const saved = window.localStorage.getItem(KEY)
    if (saved === 'en' || saved === 'es') return saved
  } catch {
    /* sigue en español */
  }
  return 'es'
}

function applyLang(lang) {
  if (typeof document !== 'undefined') document.documentElement.lang = lang === 'en' ? 'en' : 'es'
}

applyLang(typeof window === 'undefined' ? 'es' : readLang())

export const useLocaleStore = create((set) => ({
  lang: typeof window === 'undefined' ? 'es' : readLang(),
  setLang: (lang) => {
    const next = lang === 'en' ? 'en' : 'es'
    try {
      window.localStorage.setItem(KEY, next)
    } catch {
      /* el idioma sigue en memoria */
    }
    applyLang(next)
    set({ lang: next })
  },
}))
