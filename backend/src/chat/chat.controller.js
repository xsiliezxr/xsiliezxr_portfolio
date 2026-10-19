import { ChatInputError, prepareChat, replySaysMissing } from './chat.boundary.js'
import { ChatUnavailableError, CHAT_UNAVAILABLE_REPLY, replyToChat } from './chat.service.js'

export async function postChat(req, res, next) {
  let prepared
  try {
    prepared = prepareChat(req.body)
    if (prepared.intent !== 'question') {
      res.status(200).json(toBody(prepared.reply, prepared))
      return
    }

    // Gaps ya no se exponen ni se persisten en prod serverless; el chat sigue igual.
    if (prepared.needsGap) {
      console.info('chat gap', { query: prepared.query?.slice(0, 120), matched: prepared.matched })
    }

    const reply = await replyToChat(prepared)
    if (replySaysMissing(reply)) {
      console.info('chat missing', { query: prepared.query?.slice(0, 120) })
    }

    res.status(200).json(toBody(reply, prepared))
  } catch (error) {
    if (error instanceof ChatInputError) {
      res.status(400).json({ error: 'Invalid request payload' })
      return
    }
    if (error instanceof ChatUnavailableError) {
      res.status(503).json({
        reply: CHAT_UNAVAILABLE_REPLY,
        destination: null,
        summary: prepared?.summary ?? '',
        covered: prepared?.covered ?? 0,
      })
      return
    }
    next(error)
  }
}

function toBody(reply, prepared) {
  return {
    reply: reply ?? '',
    destination: prepared.destination,
    summary: prepared.summary,
    covered: prepared.covered,
  }
}
