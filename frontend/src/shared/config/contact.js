function read(name) {
  const value = import.meta.env[name]
  return typeof value === 'string' ? value.trim() : ''
}

export const contact = {
  email: read('VITE_CONTACT_EMAIL'),
  linkedin: read('VITE_LINKEDIN_URL'),
  github: read('VITE_GITHUB_URL'),
  githubKinal: read('VITE_GITHUB_KINAL_URL'),
  whatsapp: read('VITE_WHATSAPP_NUMBER'),
}

export function whatsappHref() {
  const digits = contact.whatsapp.replace(/[^\d]/g, '')
  if (!digits) return ''
  const text = encodeURIComponent('Hola Angel, vi tu portafolio y llegué a la sala secreta.')
  return `https://wa.me/${digits}?text=${text}`
}

export function contactLinks() {
  return [
    contact.email ? { id: 'email', label: 'Email', href: `mailto:${contact.email}` } : null,
    contact.linkedin ? { id: 'linkedin', label: 'LinkedIn', href: contact.linkedin } : null,
    contact.github ? { id: 'github', label: 'GitHub personal', href: contact.github } : null,
    contact.githubKinal ? { id: 'github-kinal', label: 'GitHub Kinal', href: contact.githubKinal } : null,
    whatsappHref() ? { id: 'whatsapp', label: 'WhatsApp', href: whatsappHref() } : null,
  ].filter(Boolean)
}
