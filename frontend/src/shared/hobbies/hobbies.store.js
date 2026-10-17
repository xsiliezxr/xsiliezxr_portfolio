import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { HOBBIES, HOBBY_TOTAL } from './hobbies.constants.js'

const KNOWN = new Set(HOBBIES.map((hobby) => hobby.id))

export const useHobbiesStore = create(
  persist(
    (set, get) => ({
      found: [],
      collect: (id) => {
        if (!KNOWN.has(id) || get().found.includes(id)) return
        set({ found: [...get().found, id] })
      },
    }),
    {
      name: 'portfolio-hobbies-v1',
      partialize: (state) => ({ found: state.found.filter((id) => KNOWN.has(id)) }),
    },
  ),
)

export function useUnlocked() {
  return useHobbiesStore((state) => state.found.length >= HOBBY_TOTAL)
}
