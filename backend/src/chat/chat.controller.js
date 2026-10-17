import { ChatInputError, prepareChat } from './chat.boundary.js'
import { ChatUnavailableError, CHAT_UNAVAILABLE_REPLY, replyToChat } from './chat.service.js'

export async function postChat(req, res, next) {
  let prepared
  try {
    prepared = prepareChat(req.body)
    if (prepared.intent !== 'question') {
      res.status(200).json(toBody(prepared.reply, prepared))
      return
    }
    const reply = await replyToChat(prepared)
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
