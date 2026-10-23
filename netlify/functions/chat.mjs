import { getStore } from '@netlify/blobs'
import { ChatInputError, GAP_REPLY, prepareChat } from '../../backend/src/chat/chat.boundary.js'
import { ChatUnavailableError, CHAT_UNAVAILABLE_REPLY, replyToChat } from '../../backend/src/chat/chat.service.js'

const MESSAGE_MAX = 800
const BODY_MAX = 16 * 1024
const DEFAULT_MIN_IP = 12
const DEFAULT_UNKNOWN_MIN = 8
const DEFAULT_DAY_IP = 40
const DEFAULT_DAY_SITE = 160
const memoryBuckets = new Map()

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
    process.env.CORS_ORIGIN = process.env.URL || process.env.DEPLOY_PRIME_URL
  }
  if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production'
}

function clientIp(req) {
  const direct = req.headers.get('x-nf-client-connection-ip')?.trim()
  return direct || 'unknown'
}

function minuteBucket() {
  return new Date().toISOString().slice(0, 16)
}

function dayBucket() {
  return new Date().toISOString().slice(0, 10)
}

function limit(name, fallback) {
  const value = Number(process.env[name])
  return Number.isFinite(value) && value > 0 ? value : fallback
}

async function readCount(store, key) {
  const raw = await store.get(key)
  if (raw == null) return 0
  const parsed = Number.parseInt(String(raw), 10)
  return Number.isFinite(parsed) ? parsed : 0
}

async function bumpCount(store, key) {
  const next = await readCount(store, key) + 1
  await store.set(key, String(next))
  return next
}

function bumpMemory(key) {
  const next = (memoryBuckets.get(key) || 0) + 1
  memoryBuckets.set(key, next)
  return next
}

function allowInMemory(ip, minCap, dayIpCap, daySiteCap) {
  const minute = minuteBucket()
  const day = dayBucket()
  if (bumpMemory(`m:${ip}:${minute}`) > minCap) return false
  if (bumpMemory(`d:ip:${ip}:${day}`) > dayIpCap) return false
  if (bumpMemory(`d:site:${day}`) > daySiteCap) return false
  return true
}

function rateLimitDisabled() {
  const flag = String(process.env.CHAT_RATE_LIMIT_DISABLED || '').trim().toLowerCase()
  if (flag === '1' || flag === 'true' || flag === 'yes') return true
  if (process.env.NETLIFY_DEV === 'true') return true
  if (process.env.NODE_ENV === 'development') return true
  return false
}

async function allowQuestionRequest(ip) {
  if (rateLimitDisabled()) return true

  const minCap = ip === 'unknown' ? limit('CHAT_RATE_LIMIT_UNKNOWN_MIN', DEFAULT_UNKNOWN_MIN) : limit('CHAT_RATE_LIMIT_MAX', DEFAULT_MIN_IP)
  const dayIpCap = limit('CHAT_RATE_LIMIT_DAY_IP', DEFAULT_DAY_IP)
  const daySiteCap = limit('CHAT_RATE_LIMIT_DAY_SITE', DEFAULT_DAY_SITE)

  try {
    const store = getStore('sili-chat-rate')
    const minute = minuteBucket()
    const day = dayBucket()

    const minCount = await bumpCount(store, `m:${ip}:${minute}`)
    if (minCount > minCap) return false

    const dayIpCount = await bumpCount(store, `d:ip:${ip}:${day}`)
    if (dayIpCount > dayIpCap) return false

    const daySiteCount = await bumpCount(store, `d:site:${day}`)
    if (daySiteCount > daySiteCap) return false

    return true
  } catch (error) {
    console.error('chat rate limit store unavailable, using memory', error)
    return allowInMemory(ip, minCap, dayIpCap, daySiteCap)
  }
}

function parseBody(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null
  if (!Array.isArray(raw.messages) || raw.messages.length < 1 || raw.messages.length > 20) return null
  for (const message of raw.messages) {
    if (!message || typeof message !== 'object') return null
    if (message.role !== 'user' && message.role !== 'assistant') return null
    if (typeof message.content !== 'string') return null
    const content = message.content.trim()
    if (!content || content.length > MESSAGE_MAX) return null
  }
  if (raw.summary != null && (typeof raw.summary !== 'string' || raw.summary.length > 1200)) return null
  const lang = raw.lang === 'en' ? 'en' : 'es'
  return {
    messages: raw.messages.map((message) => ({
      role: message.role,
      content: message.content.trim(),
    })),
    summary: typeof raw.summary === 'string' ? raw.summary : undefined,
    lang,
  }
}

async function readPayload(req) {
  const lengthHeader = req.headers.get('content-length')
  if (lengthHeader) {
    const declared = Number.parseInt(lengthHeader, 10)
    if (Number.isFinite(declared) && declared > BODY_MAX) return { kind: 'too_large' }
  }

  const text = await req.text()
  if (text.length > BODY_MAX) return { kind: 'too_large' }
  if (!text.trim()) return { kind: 'invalid' }

  try {
    return { kind: 'ok', raw: JSON.parse(text) }
  } catch {
    return { kind: 'invalid' }
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

  const payload = await readPayload(req)
  if (payload.kind === 'too_large') return json(413, { error: 'Payload too large' })
  if (payload.kind !== 'ok') return json(400, { error: 'Invalid request payload' })

  const body = parseBody(payload.raw)
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
    if (!(await allowQuestionRequest(clientIp(req)))) {
      return json(429, { error: 'Too many requests' })
    }
  } catch (error) {
    console.error('chat rate limit failed', error)
  }

  if (prepared.needsGap) {
    return json(200, {
      reply: (GAP_REPLY[prepared.lang] || GAP_REPLY.es),
      destination: null,
      summary: prepared.summary,
      covered: prepared.covered,
    })
  }

  try {
    const result = await replyToChat(prepared)
    return json(200, {
      reply: result?.reply ?? '',
      destination: result?.destination || prepared.destination || null,
      summary: prepared.summary,
      covered: prepared.covered,
    })
  } catch (error) {
    const lang = prepared.lang === 'en' ? 'en' : 'es'
    if (error instanceof ChatUnavailableError) {
      return json(503, {
        reply: CHAT_UNAVAILABLE_REPLY[lang] || CHAT_UNAVAILABLE_REPLY.es,
        destination: null,
        summary: prepared.summary ?? '',
        covered: prepared.covered ?? 0,
      })
    }
    console.error('chat function failed', error)
    return json(503, {
      reply: CHAT_UNAVAILABLE_REPLY[lang] || CHAT_UNAVAILABLE_REPLY.es,
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
