import { useMemo } from 'react'
import { localize } from './localize.js'
import { useLocaleStore } from './locale.store.js'

export function useLocalized(source) {
  const lang = useLocaleStore((state) => state.lang)
  return useMemo(() => localize(source, lang), [source, lang])
}

export function useLang() {
  return useLocaleStore((state) => state.lang)
}
