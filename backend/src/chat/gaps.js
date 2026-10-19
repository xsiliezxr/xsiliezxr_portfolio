import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const DATA_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../data')
const GAPS_FILE = path.join(DATA_DIR, 'sili-gaps.jsonl')
const MAX_LINES = 200
const QUERY_MAX = 240

const SECRET_PATTERNS = [
  /\bsk-[a-z0-9_-]{8,}\b/gi,
  /\bBearer\s+[a-z0-9._-]+\b/gi,
  /\bAIza[0-9A-Za-z_-]{20,}\b/g,
  /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/gi,
  /\b(?:api[_-]?key|token|secret|password|passwd|authorization)\s*[:=]\s*\S+/gi,
]

export const GAPS_HINT = 'Anoté esta pregunta para ampliar el conocimiento.'

export function sanitizeGapQuery(query) {
  let text = String(query ?? '').replace(/[<>]/g, ' ').replace(/\s+/g, ' ').trim()
  for (const pattern of SECRET_PATTERNS) {
    text = text.replace(pattern, '[redacted]')
  }
  if (text.length > QUERY_MAX) text = `${text.slice(0, QUERY_MAX)}…`
  return text
}

export async function recordGap({ query, matched = [] }) {
  const entry = {
    at: new Date().toISOString(),
    query: sanitizeGapQuery(query),
    matched: Array.isArray(matched)
      ? matched.map((item) => String(item)).filter(Boolean).slice(0, 12)
      : [],
  }
  if (!entry.query) return entry

  await mkdir(DATA_DIR, { recursive: true })
  let lines = []
  try {
    const raw = await readFile(GAPS_FILE, 'utf8')
    lines = raw.split(/\r?\n/).filter(Boolean)
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error
  }
  lines.push(JSON.stringify(entry))
  if (lines.length > MAX_LINES) lines = lines.slice(-MAX_LINES)
  await writeFile(GAPS_FILE, `${lines.join('\n')}\n`, 'utf8')
  return entry
}

export async function readGaps(limit = 50) {
  let lines = []
  try {
    const raw = await readFile(GAPS_FILE, 'utf8')
    lines = raw.split(/\r?\n/).filter(Boolean)
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error
    return []
  }

  const parsed = []
  for (const line of lines.slice(-Math.max(1, limit))) {
    try {
      const row = JSON.parse(line)
      if (!row || typeof row !== 'object') continue
      parsed.push({
        at: typeof row.at === 'string' ? row.at : '',
        query: sanitizeGapQuery(row.query),
        matched: Array.isArray(row.matched)
          ? row.matched.map((item) => String(item)).filter(Boolean).slice(0, 12)
          : [],
      })
    } catch {
      continue
    }
  }
  return parsed
}
