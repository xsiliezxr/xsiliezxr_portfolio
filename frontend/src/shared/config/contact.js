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
  const text = encodeURIComponent('Hola Angel, vi tu portafolio y quiero hablar de un proyecto.')
  return `https://wa.me/${digits}?text=${text}`
}

export function contactLinks({ includeWhatsapp = false } = {}) {
  return [
    contact.email
      ? { id: 'email', label: 'Email', href: `mailto:${contact.email}`, hint: contact.email }
      : null,
    contact.linkedin
      ? { id: 'linkedin', label: 'LinkedIn', href: contact.linkedin, hint: 'Perfil profesional' }
      : null,
    contact.github
      ? { id: 'github', label: 'GitHub', href: contact.github, hint: 'xsiliezxr' }
      : null,
    contact.githubKinal
      ? { id: 'github-kinal', label: 'GitHub Kinal', href: contact.githubKinal, hint: 'asiliezar-2024342' }
      : null,
    includeWhatsapp && whatsappHref()
      ? { id: 'whatsapp', label: 'WhatsApp', href: whatsappHref(), hint: 'Mensaje directo' }
      : null,
  ].filter(Boolean)
}
