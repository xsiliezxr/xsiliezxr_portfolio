import { z } from 'zod'
import { MESSAGE_MAX } from './intent.js'

const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().trim().min(1).max(MESSAGE_MAX),
}).strip()

export const chatRequestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(16),
  summary: z.string().max(1200).optional(),
}).strip()
