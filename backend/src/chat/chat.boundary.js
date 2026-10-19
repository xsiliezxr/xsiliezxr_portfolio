import { INJECTION_REPLY, isDestination, navigationReply } from './destinations.js'
import { detectIntent, MESSAGE_MAX, sanitizeMessage } from './intent.js'
import { selectKnowledgeChunks } from './prompt.js'
import { foldAccents } from './retrieve.js'
import { foldTranscript } from './summary.js'

const SUMMARY_INPUT_MAX = 1200

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
]

export class ChatInputError extends Error {
  constructor() {
    super('Invalid request payload')
    this.name = 'ChatInputError'
    this.status = 400
  }
}

export function prepareChat(body) {
  const receivedSummary = sanitizeMessage(typeof body.summary === 'string' ? body.summary : '', SUMMARY_INPUT_MAX)
    .replace(/[<>]/g, '')
  const summary = detectIntent(receivedSummary).intent === 'injection' ? '' : receivedSummary
  const messages = []
  for (const item of body.messages) {
    const content = sanitizeMessage(item.content, MESSAGE_MAX)
    if (!content) continue
    messages.push({ role: item.role, content })
  }

  const last = messages[messages.length - 1]
  if (!last || last.role !== 'user') throw new ChatInputError()

  const decision = detectIntent(last.content)
  const archival = messages.map((message) => (
    isInjectionTurn(message) ? { role: message.role, content: '' } : message
  ))
  const windowed = foldTranscript(summary, archival)

  if (decision.intent === 'injection') {
    return result('injection', INJECTION_REPLY, null, windowed)
  }

  if (decision.intent === 'navigation' && isDestination(decision.destination)) {
    return result('navigation', navigationReply(decision.destination), decision.destination, windowed)
  }

  const retrieval = selectKnowledgeChunks(last.content)
  return {
    ...result('question', null, null, windowed),
    query: last.content,
    matched: retrieval.matched.map((chunk) => chunk.id),
    retrievalScore: retrieval.score,
    needsGap: retrieval.lowScore,
  }
}

export function replySaysMissing(reply) {
  const folded = foldAccents(reply)
  return MISSING_REPLY.some((marker) => folded.includes(foldAccents(marker)))
}

function result(intent, reply, destination, windowed) {
  return {
    intent,
    reply,
    destination,
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
  if (message.role === 'assistant') return message.content === INJECTION_REPLY
  return detectIntent(message.content).intent === 'injection'
}
