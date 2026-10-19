import { ChatInputError, prepareChat } from '../../backend/src/chat/chat.boundary.js'
import { ChatUnavailableError, CHAT_UNAVAILABLE_REPLY, replyToChat } from '../../backend/src/chat/chat.service.js'

const MESSAGE_MAX = 800
const DEFAULT_WINDOW_MS = 60_000
const DEFAULT_MAX = 10

const buckets = new Map()

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}

function ensureEnv() {
  if (!process.env.CORS_ORIGIN) {
    process.env.CORS_ORIGIN = process.env.URL || process.env.DEPLOY_PRIME_URL || 'https://www.siliezar.studio'
  }
  if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production'
}

function clientIp(req) {
  const forwarded = req.headers.get('x-nf-client-connection-ip')
    || req.headers.get('x-forwarded-for')
    || ''
  const first = forwarded.split(',')[0]?.trim()
  return first || 'unknown'
}

function allowRequest(ip) {
  const windowMs = Number(process.env.CHAT_RATE_LIMIT_WINDOW_MS) || DEFAULT_WINDOW_MS
  const max = Number(process.env.CHAT_RATE_LIMIT_MAX) || DEFAULT_MAX
  const now = Date.now()
  const bucket = buckets.get(ip)
  if (!bucket || now - bucket.start >= windowMs) {
    buckets.set(ip, { start: now, count: 1 })
    return true
  }
  if (bucket.count >= max) return false
  bucket.count += 1
  return true
}

function parseBody(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null
  if (!Array.isArray(raw.messages) || raw.messages.length < 1 || raw.messages.length > 16) return null
  for (const message of raw.messages) {
    if (!message || typeof message !== 'object') return null
    if (message.role !== 'user' && message.role !== 'assistant') return null
    if (typeof message.content !== 'string') return null
    const content = message.content.trim()
    if (!content || content.length > MESSAGE_MAX) return null
  }
  if (raw.summary != null && (typeof raw.summary !== 'string' || raw.summary.length > 1200)) return null
  return {
    messages: raw.messages.map((message) => ({
      role: message.role,
      content: message.content.trim(),
    })),
    summary: typeof raw.summary === 'string' ? raw.summary : undefined,
  }
}

export default async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204 })
  }
  if (req.method !== 'POST') {
    return json(405, { error: 'Method not allowed' })
  }

  ensureEnv()

  if (!allowRequest(clientIp(req))) {
    return json(429, { error: 'Too many requests' })
  }

  let raw
  try {
    raw = await req.json()
  } catch {
    return json(400, { error: 'Invalid request payload' })
  }

  const body = parseBody(raw)
  if (!body) {
    return json(400, { error: 'Invalid request payload' })
  }

  let prepared
  try {
    prepared = prepareChat(body)
  } catch (error) {
    if (error instanceof ChatInputError) return json(400, { error: 'Invalid request payload' })
    console.error('chat function failed', error)
    return json(503, {
      reply: 'Sili no está disponible en este momento.',
      destination: null,
      summary: '',
      covered: 0,
    })
  }

  if (prepared.intent !== 'question') {
    return json(200, {
      reply: prepared.reply ?? '',
      destination: prepared.destination,
      summary: prepared.summary,
      covered: prepared.covered,
    })
  }

  try {
    const reply = await replyToChat(prepared)
    return json(200, {
      reply: reply ?? '',
      destination: prepared.destination,
      summary: prepared.summary,
      covered: prepared.covered,
    })
  } catch (error) {
    if (error instanceof ChatUnavailableError) {
      return json(503, {
        reply: CHAT_UNAVAILABLE_REPLY,
        destination: null,
        summary: prepared.summary ?? '',
        covered: prepared.covered ?? 0,
      })
    }
    console.error('chat function failed', error)
    return json(503, {
      reply: 'Sili no está disponible en este momento.',
      destination: null,
      summary: prepared.summary ?? '',
      covered: prepared.covered ?? 0,
    })
  }
}

export const config = {
  path: '/api/chat',
  method: ['POST', 'OPTIONS'],
}
