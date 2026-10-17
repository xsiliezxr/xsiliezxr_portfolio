import { INJECTION_REPLY, isDestination, navigationReply } from './destinations.js'
import { detectIntent, MESSAGE_MAX, sanitizeMessage } from './intent.js'
import { foldTranscript } from './summary.js'

const SUMMARY_INPUT_MAX = 1200

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

  return result('question', null, null, windowed)
}

function result(intent, reply, destination, windowed) {
  return {
    intent,
    reply,
    destination,
    summary: windowed.summary,
    covered: windowed.covered,
    recent: windowed.recent,
  }
}

function isInjectionTurn(message) {
  if (message.role === 'assistant') return message.content === INJECTION_REPLY
  return detectIntent(message.content).intent === 'injection'
}
