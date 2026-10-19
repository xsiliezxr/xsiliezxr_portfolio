import { CHUNKS, GENERAL_CHUNK_IDS, section } from './knowledge.js'

const STOP = new Set([
  'a', 'al', 'de', 'del', 'el', 'la', 'las', 'los', 'un', 'una', 'y', 'o', 'en', 'con', 'por', 'para',
  'que', 'se', 'su', 'sus', 'es', 'son', 'me', 'te', 'lo', 'le', 'mi', 'tu', 'hay', 'como', 'mas',
  'the', 'of', 'and', 'or', 'to', 'in', 'is', 'are', 'what', 'who', 'how',
])

export function foldAccents(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
}

function queryWords(query) {
  return foldAccents(query)
    .split(/[^a-z0-9+#.]+/i)
    .map((word) => word.trim())
    .filter((word) => word.length > 1 && !STOP.has(word))
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
  return chunks.map((chunk) => chunk.text ?? section(chunk.title, '')).join('\n\n')
}

export function bestRetrievalScore(chunks) {
  if (!chunks.length) return 0
  return Math.max(...chunks.map((chunk) => chunk.score ?? 0))
}
