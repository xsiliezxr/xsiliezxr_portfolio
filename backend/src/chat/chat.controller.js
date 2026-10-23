import { ChatInputError, GAP_REPLY, prepareChat, replySaysMissing } from './chat.boundary.js'
import { ChatUnavailableError, CHAT_UNAVAILABLE_REPLY, replyToChat } from './chat.service.js'

export async function postChat(req, res, next) {
  let prepared
  try {
    prepared = prepareChat(req.body)
    if (prepared.intent !== 'question') {
      res.status(200).json(toBody(prepared.reply, prepared))
      return
    }

    if (prepared.needsGap) {
      console.info('chat gap', { matched: prepared.matched.length })
      res.status(200).json(toBody(GAP_REPLY[prepared.lang] || GAP_REPLY.es, prepared))
      return
    }

    const result = await replyToChat(prepared)
    if (replySaysMissing(result.reply)) {
      console.info('chat missing', { matched: prepared.matched.length })
    }

    res.status(200).json(toBody(result.reply, prepared, result.destination))
  } catch (error) {
    if (error instanceof ChatInputError) {
      res.status(400).json({ error: 'Invalid request payload' })
      return
    }
    if (error instanceof ChatUnavailableError) {
      const lang = prepared?.lang || error.lang || 'es'
      res.status(503).json({
        reply: CHAT_UNAVAILABLE_REPLY[lang] || CHAT_UNAVAILABLE_REPLY.es,
        destination: null,
        summary: prepared?.summary ?? '',
        covered: prepared?.covered ?? 0,
      })
      return
    }
    next(error)
  }
}

function toBody(reply, prepared, destination = null) {
  return {
    reply: reply ?? '',
    destination: destination || prepared.destination || null,
    summary: prepared.summary,
    covered: prepared.covered,
  }
}
