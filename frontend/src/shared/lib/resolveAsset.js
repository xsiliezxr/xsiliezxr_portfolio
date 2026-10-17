export function resolveAsset(modules, filename) {
  if (!filename) return ''
  const needle = `/${filename}`
  for (const [path, url] of Object.entries(modules)) {
    if (path.replaceAll('\\', '/').endsWith(needle)) return url
  }
  return ''
}
