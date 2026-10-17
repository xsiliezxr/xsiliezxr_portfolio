import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import { z } from 'zod'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

dotenv.config({ path: path.join(rootDir, '.env') })

const blankToUndefined = (value) => {
  if (typeof value !== 'string') return value
  const trimmed = value.trim()
  return trimmed === '' ? undefined : trimmed
}

const optionalText = z.preprocess(blankToUndefined, z.string().min(1).optional())

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  CORS_ORIGIN: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(900000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
  LLM_PROVIDER: z.preprocess(blankToUndefined, z.enum(['gemini', 'groq']).default('gemini')),
  LLM_MODEL: optionalText,
  // La key no bloquea el arranque; el chat responde 503 y createLlmClient falla si falta.
  GEMINI_API_KEY: optionalText,
  GROQ_API_KEY: optionalText,
  CHAT_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(10),
  CHAT_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60000),
})

const llmCredentialSchema = envSchema
  .pick({
    LLM_PROVIDER: true,
    GEMINI_API_KEY: true,
    GROQ_API_KEY: true,
  })
  .superRefine((value, ctx) => {
    const keyName = value.LLM_PROVIDER === 'gemini' ? 'GEMINI_API_KEY' : 'GROQ_API_KEY'
    if (!value[keyName]) {
      ctx.addIssue({
        code: 'custom',
        path: [keyName],
        message: `${keyName} is required when LLM_PROVIDER is ${value.LLM_PROVIDER}`,
      })
    }
  })

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  throw new Error(`Invalid environment configuration: ${parsed.error.message}`)
}

export const env = parsed.data

export function requireLlmCredentials(config = env) {
  const parsedCredentials = llmCredentialSchema.safeParse(config)
  if (!parsedCredentials.success) {
    const message = parsedCredentials.error.issues.map((issue) => issue.message).join('; ')
    throw new Error(message)
  }
  return parsedCredentials.data
}
