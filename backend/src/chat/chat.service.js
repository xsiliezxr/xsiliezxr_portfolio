import { GoogleGenAI } from '@google/genai'
import { apiKey, model, provider } from '../../configs/llm.js'
import { INJECTION_REPLY } from './destinations.js'
import { PROMPT_LEAK_MARKERS, buildChatInput } from './prompt.js'

const TIMEOUT_MS = 20_000
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const BRIDGE = '{"reply":"Listo."}'

export const CHAT_UNAVAILABLE_REPLY = 'Sili no está disponible en este momento.'

export class ChatUnavailableError extends Error {
  constructor() {
    super(CHAT_UNAVAILABLE_REPLY)
    this.name = 'ChatUnavailableError'
    this.status = 503
  }
}

export async function replyToChat({ summary, recent }) {
  const recentChars = recent.reduce((sum, turn) => sum + turn.content.length, 0)
  console.info(`chat context summaryChars=${summary.length} recentTurns=${recent.length} recentChars=${recentChars}`)

  if (!apiKey) throw new ChatUnavailableError()

  const { instructions, data } = buildChatInput(summary)
  const conversation = conversationForModel(data, recent)

  try {
    const raw = provider === 'groq'
      ? await callGroq(instructions, conversation)
      : await callGemini(instructions, conversation)
    return publicReply(raw)
  } catch (error) {
    if (error instanceof ChatUnavailableError) throw error
    throw new ChatUnavailableError()
  }
}

async function callGemini(instructions, conversation) {
  if (provider !== 'gemini') throw new ChatUnavailableError()

  const ai = new GoogleGenAI({ apiKey, vertexai: false })
  const response = await ai.models.generateContent({
    model,
    contents: conversation.map((turn) => ({
      role: turn.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: turn.content }],
    })),
    config: {
      systemInstruction: instructions,
      temperature: 0.3,
      maxOutputTokens: 400,
      responseMimeType: 'application/json',
      abortSignal: AbortSignal.timeout(TIMEOUT_MS),
      // Apaga el pensamiento para que los 400 tokens salgan en el JSON.
      thinkingConfig: { thinkingBudget: 0 },
    },
  })

  if (typeof response.text !== 'string' || response.text.trim() === '') {
    throw new ChatUnavailableError()
  }
  return response.text
}

async function callGroq(instructions, conversation) {
  const response = await fetch(GROQ_URL, {
    method: 'POST',
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      max_tokens: 400,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: instructions },
        ...conversation,
      ],
    }),
  })

  if (!response.ok) {
    await response.arrayBuffer().catch(() => {})
    throw new ChatUnavailableError()
  }

  const payload = await response.json()
  const text = payload?.choices?.[0]?.message?.content
  if (typeof text !== 'string' || text.trim() === '') throw new ChatUnavailableError()
  return text
}

function publicReply(raw) {
  const text = raw.trim()
  const parsed = parseJsonObject(text)
  const reply = parsed && typeof parsed.reply === 'string' ? parsed.reply.trim() : text
  if (!reply || leaksPrompt(reply)) return INJECTION_REPLY
  return reply.slice(0, 1500)
}

function leaksPrompt(text) {
  return PROMPT_LEAK_MARKERS.some((marker) => text.includes(marker))
}

function parseJsonObject(text) {
  const direct = tryParse(text)
  if (direct) return direct

  const unfenced = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')
  const fromFence = tryParse(unfenced)
  if (fromFence) return fromFence

  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start === -1 || end <= start) return null
  return tryParse(text.slice(start, end + 1))
}

function tryParse(value) {
  try {
    const parsed = JSON.parse(value)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null
    return parsed
  } catch {
    return null
  }
}

function conversationForModel(data, recent) {
  const literal = recent[0]?.role === 'assistant' ? recent.slice(1) : recent
  const turns = [
    { role: 'user', content: data },
    { role: 'assistant', content: BRIDGE },
  ]
  for (const turn of literal) {
    const safe = turn.content.replaceAll('<', '').replaceAll('>', '')
    const last = turns[turns.length - 1]
    if (last.role === turn.role) {
      last.content = `${last.content}\n${safe}`
      continue
    }
    turns.push({ role: turn.role, content: safe })
  }
  return turns
}
