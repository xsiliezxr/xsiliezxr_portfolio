import { CHUNKS, GENERAL_CHUNK_IDS, section, contactPayload } from './knowledge.js'

const STOP = new Set([
  'a', 'al', 'de', 'del', 'la', 'las', 'los', 'un', 'una', 'y', 'o', 'en', 'con', 'por', 'para',
  'que', 'se', 'su', 'sus', 'es', 'son', 'me', 'te', 'lo', 'le', 'mi', 'hay', 'como', 'mas',
  'the', 'of', 'and', 'or', 'to', 'in', 'is', 'are', 'what', 'who', 'how',
])

const ALIASES = {
  anos: ['edad', 'nacimiento'],
  años: ['edad', 'nacimiento'],
  edad: ['anos', 'nacimiento'],
  contactarlo: ['contacto'],
  contactar: ['contacto'],
  contactarme: ['contacto'],
  escribirle: ['contacto', 'email'],
  correo: ['email', 'contacto'],
  mail: ['email', 'contacto'],
  apartado: ['contacto', 'pagina', 'seccion'],
  seccion: ['contacto', 'pagina', 'pisos'],
  pagina: ['contacto', 'seccion'],
  puedes: ['sili', 'ayuda', 'agente'],
  hacer: ['sili', 'ayuda'],
  sirves: ['sili', 'ayuda'],
  ayuda: ['sili', 'agente'],
  manejas: ['skills', 'habilidades', 'angel'],
  maneja: ['skills', 'habilidades', 'angel'],
  sabe: ['skills', 'habilidades'],
  sabes: ['skills', 'habilidades'],
  anterior: ['sili'],
  pregunte: ['sili'],
  preguntaste: ['sili'],
  proyectos: ['proyecto'],
  cuantos: ['proyectos', 'edad'],
}

export function foldAccents(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
}

function queryWords(query) {
  const base = foldAccents(query)
    .split(/[^a-z0-9+#.]+/i)
    .map((word) => word.trim())
    .filter((word) => word.length > 1 && !STOP.has(word))

  const expanded = new Set(base)
  for (const word of base) {
    const aliases = ALIASES[word]
    if (!aliases) continue
    for (const alias of aliases) expanded.add(foldAccents(alias))
  }
  return [...expanded]
}

function scoreChunk(chunk, words) {
  if (words.length === 0) return 0
  const title = foldAccents(chunk.title)
  const terms = chunk.terms.map(foldAccents)
  let score = 0
  for (const word of words) {
    if (title === word || title.includes(word)) score += 2
    for (const term of terms) {
      if (term === word || term.includes(word) || word.includes(term)) {
        score += 1
        break
      }
    }
  }
  return score
}

export function retrieveChunks(query, limit = 3) {
  const words = queryWords(query)
  const ranked = CHUNKS
    .map((chunk) => ({ ...chunk, score: scoreChunk(chunk, words) }))
    .filter((chunk) => chunk.score > 0)
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
  return ranked.slice(0, limit)
}

export function generalChunks(limit = 4) {
  const byId = new Map(CHUNKS.map((chunk) => [chunk.id, chunk]))
  const picked = GENERAL_CHUNK_IDS.map((id) => byId.get(id)).filter(Boolean)
  if (picked.length >= limit) return picked.slice(0, limit).map((chunk) => ({ ...chunk, score: 0 }))
  return CHUNKS.slice(0, limit).map((chunk) => ({ ...chunk, score: 0 }))
}

export function formatKnowledge(chunks) {
  return chunks.map((chunk) => {
    if (chunk.id === 'contact') return section('Contacto', contactPayload())
    return chunk.text ?? section(chunk.title, '')
  }).join('\n\n')
}

export function bestRetrievalScore(chunks) {
  if (!chunks.length) return 0
  return Math.max(...chunks.map((chunk) => chunk.score ?? 0))
}
