import { GoogleGenAI } from '@google/genai'
import { env, requireLlmCredentials } from './env.js'

const DEFAULT_MODELS = {
  gemini: 'gemma-4-31b-it',
  groq: 'llama-3.3-70b-versatile',
}

export const provider = env.LLM_PROVIDER
export const model = env.LLM_MODEL ?? DEFAULT_MODELS[provider]
export const apiKey = provider === 'gemini' ? env.GEMINI_API_KEY : env.GROQ_API_KEY

export function createLlmClient() {
  const credentials = requireLlmCredentials()
  const key = provider === 'gemini' ? credentials.GEMINI_API_KEY : credentials.GROQ_API_KEY
  if (provider === 'groq') {
    return { provider, model, apiKey: key }
  }
  return new GoogleGenAI({ apiKey: key, vertexai: false })
}
