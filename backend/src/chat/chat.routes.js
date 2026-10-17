import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { env } from '../../configs/env.js'
import { validate } from '../../middlewares/validate.js'
import { postChat } from './chat.controller.js'
import { chatRequestSchema } from './chat.model.js'

const chatRateLimit = rateLimit({
  windowMs: env.CHAT_RATE_LIMIT_WINDOW_MS ?? 60_000,
  max: env.CHAT_RATE_LIMIT_MAX ?? 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests' },
})

export const chatRoutes = Router()

chatRoutes.post('/', chatRateLimit, validate(chatRequestSchema), postChat)
