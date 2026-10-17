import { isDestination } from './destinations.js'

export const MESSAGE_MAX = 800

const PLACES = [
  { id: 'secret', terms: ['sala secreta', 'piso secreto', 'piso -1', 'seccion secreta'] },
  { id: 'certificados', terms: ['certificaciones', 'certificados', 'certificado'] },
  { id: 'experiencia', terms: ['experiencia'] },
  { id: 'proyectos', terms: ['proyectos', 'proyecto'] },
  { id: 'habilidades', terms: ['habilidades', 'habilidad', 'skills'] },
  { id: 'galeria', terms: ['galeria'] },
  { id: 'historia', terms: ['historia'] },
  { id: 'contacto', terms: ['contacto'] },
  { id: 'inicio', terms: ['inicio', 'portada', 'home'] },
]

const INJECTION_PATTERNS = [
  /ignora(?:r)?\b[\s\S]{0,80}\b(instrucciones|reglas|ordenes|prompt)\b/,
  /olvida(?:r)?\b[\s\S]{0,80}\b(instrucciones|reglas|ordenes|lo anterior)\b/,
  /\b(revela|muestra|ensena|dame|imprime|repite|filtra)\b[\s\S]{0,48}\b(prompt|instrucciones|system prompt|mensaje del sistema)\b/,
  /system prompt/,
  /mensaje del sistema/,
  /\bjailbreak\b/,
  /finge (?:ser|que eres)/,
  /actua como (?:el )?sistema/,
  /you are now/,
  /ignore (?:all |the )?(?:previous|prior|above) instructions/,
  /disregard (?:your |all )?(?:rules|instructions|previous)/,
  /\b(api[_ -]?key|credenciales|jwt secret)\b/,
  /developer mode/,
  /modo desarrollador/,
]

export function sanitizeMessage(value, max = MESSAGE_MAX) {
  if (typeof value !== 'string') return ''
  return value.replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, max)
}

export function detectIntent(text) {
  const folded = fold(sanitizeMessage(text))
  if (!folded) return { intent: 'question', destination: null }
  if (INJECTION_PATTERNS.some((pattern) => pattern.test(folded))) {
    return { intent: 'injection', destination: null }
  }
  const destination = findPlace(folded)
  if (destination && isDestination(destination) && wantsToGo(folded, destination)) {
    return { intent: 'navigation', destination }
  }
  return { intent: 'question', destination: null }
}

function fold(value) {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
}

function findPlace(folded) {
  for (const place of PLACES) {
    if (place.terms.some((term) => hasTerm(folded, term))) return place.id
  }
  if (hasTerm(folded, 'secreto') || hasTerm(folded, 'secreta')) return 'secret'
  return null
}

function wantsToGo(folded, destination) {
  if (hasNavCue(folded)) return true
  const place = PLACES.find((item) => item.id === destination)
  const terms = place ? place.terms : []
  const extra = destination === 'secret' ? ['secreto', 'secreta'] : []
  return isBarePlace(folded, [...terms, ...extra])
}

function hasNavCue(folded) {
  if (/\b(llevame|llevarme|quiero ir|vamos a|abre|abreme|muestrame|ensename|bajame|baja a|subeme|sube a|anda a|navega|pasame|entremos|ir a|llevar a)\b/.test(folded)) {
    return true
  }
  return /^(?:quiero\s+)?ver\b/.test(folded) || /\bquiero ver\b/.test(folded)
}

function isBarePlace(folded, terms) {
  const tail = folded.replace(/[¿?¡!.,]/g, '').trim()
  return terms.some((term) => new RegExp(`^(?:a |al |a la |a el |el |la |los |las )?${escapeRegExp(term)}$`).test(tail))
}

function hasTerm(folded, term) {
  const index = folded.indexOf(term)
  if (index === -1) return false
  const before = index === 0 || !/[\p{L}\p{N}]/u.test(folded[index - 1])
  const afterIndex = index + term.length
  const after = afterIndex >= folded.length || !/[\p{L}\p{N}]/u.test(folded[afterIndex])
  return before && after
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
