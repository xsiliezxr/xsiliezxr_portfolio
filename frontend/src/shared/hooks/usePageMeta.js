import { useEffect } from 'react'
import { useLocaleStore } from '../i18n/locale.store.js'
import { metaForPath, siteOrigin } from '../seo/pageMeta.js'

function upsertMeta(selector, attrs) {
  let node = document.head.querySelector(selector)
  if (!node) {
    node = document.createElement('meta')
    document.head.appendChild(node)
  }
  Object.entries(attrs).forEach(([key, value]) => {
    if (value == null || value === '') node.removeAttribute(key)
    else node.setAttribute(key, value)
  })
  return node
}

function upsertLink(rel, href) {
  let node = document.head.querySelector(`link[rel="${rel}"]`)
  if (!node) {
    node = document.createElement('link')
    node.setAttribute('rel', rel)
    document.head.appendChild(node)
  }
  node.setAttribute('href', href)
}

export function usePageMeta(path) {
  const lang = useLocaleStore((state) => state.lang)

  useEffect(() => {
    const meta = metaForPath(path, lang)
    const origin = siteOrigin()
    const canonical = origin ? `${origin}${path === '/' ? '/' : path}` : path

    document.title = meta.title
    upsertMeta('meta[name="description"]', { name: 'description', content: meta.description })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: meta.title })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: meta.description })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: lang === 'en' ? 'en_US' : 'es_GT' })
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: meta.title })
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: meta.description })

    if (origin) {
      upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
      upsertLink('canonical', canonical)
    }
  }, [path, lang])
}
