export const SUMMARY_MESSAGE_THRESHOLD = 12
export const SUMMARY_CHAR_THRESHOLD = 6000
export const RECENT_TURNS = 6
export const SUMMARY_MAX_CHARS = 700

// El historial visible no se toca: este párrafo solo acorta lo que ve el modelo.
export function foldTranscript(previousSummary, messages) {
  const transcriptChars = messages.reduce((sum, message) => sum + message.content.length, 0)
  const over = messages.length > SUMMARY_MESSAGE_THRESHOLD || transcriptChars > SUMMARY_CHAR_THRESHOLD
  const summary = clip(previousSummary, SUMMARY_MAX_CHARS)
  if (!over || messages.length <= RECENT_TURNS) {
    return { summary, covered: 0, recent: messages.filter((message) => message.content) }
  }

  const recent = messages.slice(-RECENT_TURNS)
  const old = messages.slice(0, -RECENT_TURNS)
  const chunk = old
    .filter((message) => message.content)
    .map((message) => `${message.role === 'user' ? 'Visitante' : 'Sil'}: ${message.content}`)
    .join(' ')
  const merged = [summary, chunk].filter(Boolean).join(' ')

  return {
    summary: clip(merged, SUMMARY_MAX_CHARS),
    covered: old.length,
    recent: recent.filter((message) => message.content),
  }
}

function clip(text, max) {
  const clean = String(text ?? '').replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  return `${clean.slice(0, max - 1).trimEnd()}…`
}
