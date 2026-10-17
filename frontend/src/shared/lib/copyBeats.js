export function copyBeats(text, groups = 4) {
  const parts = String(text)
    .split(/(?<=[.!?…])\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
  if (parts.length <= groups) return parts
  const size = Math.ceil(parts.length / groups)
  const beats = []
  for (let index = 0; index < parts.length; index += size) {
    beats.push(parts.slice(index, index + size).join(' '))
  }
  return beats
}
