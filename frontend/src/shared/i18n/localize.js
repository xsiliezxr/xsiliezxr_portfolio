export function isLocaleDict(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const keys = Object.keys(value)
  if (!keys.length) return false
  return keys.every((key) => key === 'es' || key === 'en')
}

export function pick(value, lang = 'es') {
  if (!isLocaleDict(value)) return value
  return value[lang] ?? value.es ?? value.en ?? ''
}

export function localize(node, lang = 'es') {
  if (node == null || typeof node === 'number' || typeof node === 'boolean') return node
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map((item) => localize(item, lang))
  if (isLocaleDict(node)) return pick(node, lang)
  const out = {}
  for (const [key, value] of Object.entries(node)) {
    out[key] = localize(value, lang)
  }
  return out
}
