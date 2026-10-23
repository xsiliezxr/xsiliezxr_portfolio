import { INJECTION_REPLY, isDestination, navigationReply } from './destinations.js'
import { detectIntent, MESSAGE_MAX, sanitizeMessage } from './intent.js'
import { selectKnowledgeChunks } from './prompt.js'
import { foldAccents } from './retrieve.js'
import { foldTranscript } from './summary.js'

const SUMMARY_INPUT_MAX = 1200
export const CHAT_MESSAGE_CAP = 20

export const GAP_REPLY = {
  es: 'No lo tengo en el portafolio. Pregúntame por Angel, proyectos, skills o contacto.',
  en: "I don't have that in the portfolio. Ask me about Angel, projects, skills, or contact.",
}

export const HELLO_REPLY = {
  es: 'Hola, soy Sili. Pregúntame por Angel Siliezar, sus proyectos, skills o contacto.',
  en: "Hi, I'm Sili. Ask me about Angel Siliezar, his projects, skills, or contact.",
}

const GREETING = /^(hola|hey|buenas|buenos dias|buenas tardes|buenas noches|hi|hello|qué tal|que tal)\b/

const MISSING_REPLY = [
  'no lo tengo',
  'no tengo esa',
  'no tengo ese',
  'no tengo el dato',
  'no tengo ese dato',
  'no tengo esa informacion',
  'no esta en el conocimiento',
  'no figura en',
  'no cuento con',
  "i don't have",
  'i do not have',
  'not in the portfolio',
]

export class ChatInputError extends Error {
  constructor() {
    super('Invalid request payload')
    this.name = 'ChatInputError'
    this.status = 400
  }
}

export function normalizeLang(value) {
  return value === 'en' ? 'en' : 'es'
}

export function prepareChat(body) {
  const lang = normalizeLang(body?.lang)
  const receivedSummary = sanitizeMessage(typeof body.summary === 'string' ? body.summary : '', SUMMARY_INPUT_MAX)
    .replace(/[<>]/g, '')
  const summary = detectIntent(receivedSummary).intent === 'injection' ? '' : receivedSummary
  const messages = []
  for (const item of body.messages) {
    const content = sanitizeMessage(item.content, MESSAGE_MAX)
    if (!content) continue
    messages.push({ role: item.role, content })
  }

  const capped = messages.slice(-CHAT_MESSAGE_CAP)
  const last = capped[capped.length - 1]
  if (!last || last.role !== 'user') throw new ChatInputError()

  const decision = detectIntent(last.content)
  const archival = capped.map((message) => (
    isInjectionTurn(message) ? { role: message.role, content: '' } : message
  ))
  const windowed = foldTranscript(summary, archival)

  if (decision.intent === 'injection') {
    return result('injection', pick(INJECTION_REPLY, lang), null, windowed, lang)
  }

  if (decision.intent === 'navigation' && isDestination(decision.destination)) {
    return result('navigation', navigationReply(decision.destination, lang), decision.destination, windowed, lang)
  }

  if (GREETING.test(foldAccents(last.content))) {
    return result('greeting', HELLO_REPLY[lang], null, windowed, lang)
  }

  const retrieval = selectKnowledgeChunks(last.content)
  return {
    ...result('question', null, null, windowed, lang),
    query: last.content,
    matched: retrieval.matched.map((chunk) => chunk.id),
    retrievalScore: retrieval.score,
    needsGap: false,
  }
}

export function replySaysMissing(reply) {
  const folded = foldAccents(reply)
  return MISSING_REPLY.some((marker) => folded.includes(foldAccents(marker)))
}

function pick(value, lang) {
  if (value && typeof value === 'object') return value[lang] || value.es
  return value
}

function result(intent, reply, destination, windowed, lang) {
  return {
    intent,
    reply,
    destination,
    lang,
    summary: windowed.summary,
    covered: windowed.covered,
    recent: windowed.recent,
    query: null,
    matched: [],
    retrievalScore: 0,
    needsGap: false,
  }
}

function isInjectionTurn(message) {
  if (message.role !== 'assistant') return detectIntent(message.content).intent === 'injection'
  return message.content === INJECTION_REPLY.es || message.content === INJECTION_REPLY.en || message.content === INJECTION_REPLY
}
