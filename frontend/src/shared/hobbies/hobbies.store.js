import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { HOBBIES, HOBBY_TOTAL } from './hobbies.constants.js'

const KNOWN = new Set(HOBBIES.map((hobby) => hobby.id))

export function knownFound(found) {
  const unique = []
  for (const id of found || []) {
    if (!KNOWN.has(id) || unique.includes(id)) continue
    unique.push(id)
    if (unique.length >= HOBBY_TOTAL) break
  }
  return unique
}

export const useHobbiesStore = create(
  persist(
    (set, get) => ({
      found: [],
      collect: (id) => {
        const next = knownFound([...get().found, id])
        if (next.length === knownFound(get().found).length) return
        set({ found: next })
      },
      reset: () => set({ found: [] }),
    }),
    {
      name: 'portfolio-hobbies-v1',
      partialize: (state) => ({ found: knownFound(state.found) }),
      onRehydrateStorage: () => (state) => {
        if (!state?.found) return
        const found = knownFound(state.found)
        const same = found.length === state.found.length && found.every((id, index) => id === state.found[index])
        if (!same) useHobbiesStore.setState({ found })
      },
    },
  ),
)

export function useUnlocked() {
  return useHobbiesStore((state) => knownFound(state.found).length >= HOBBY_TOTAL)
}
