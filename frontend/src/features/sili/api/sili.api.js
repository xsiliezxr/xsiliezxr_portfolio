export const SILI_MAX_CHARS = 800
export const SILI_MAX_MESSAGES = 16
export const SILI_SUMMARY_MAX = 1200

function fail(kind) {
  const error = new Error(kind)
  error.kind = kind
  return error
}

export function sanitizeChatText(value, max = SILI_MAX_CHARS) {
  return String(value ?? '').replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, max)
}

export function trimMessages(messages) {
  if (!Array.isArray(messages)) return []
  return messages
    .filter((message) => message && (message.role === 'user' || message.role === 'assistant') && typeof message.content === 'string')
    .slice(-SILI_MAX_MESSAGES)
    .map((message) => ({
      role: message.role,
      content: sanitizeChatText(message.content),
    }))
    .filter((message) => message.content.length > 0)
}

export async function postChat({ messages, summary }) {
  const base = String(import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')
  if (!base) throw fail('network')

  let response
  try {
    response = await fetch(`${base}/chat`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: trimMessages(messages),
        summary: sanitizeChatText(summary ?? '', SILI_SUMMARY_MAX),
      }),
    })
  } catch {
    throw fail('network')
  }

  if (response.status === 429) throw fail('rate')

  let data = null
  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (response.status === 503) {
    const error = fail('asleep')
    error.summary = typeof data?.summary === 'string' ? data.summary : ''
    error.covered = coveredOf(data?.covered)
    throw error
  }
  if (!response.ok || !data) throw fail('fail')

  return {
    reply: typeof data.reply === 'string' ? data.reply : '',
    destination: typeof data.destination === 'string' ? data.destination : null,
    summary: typeof data.summary === 'string' ? data.summary : '',
    covered: coveredOf(data.covered),
    gapsHint: typeof data.gapsHint === 'string' && data.gapsHint.trim() ? data.gapsHint.trim().slice(0, 180) : null,
  }
}

function coveredOf(value) {
  return Number.isInteger(value) && value > 0 ? value : 0
}
