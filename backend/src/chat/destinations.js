import { indicator, nav } from '../../../frontend/src/features/home/content/journey.content.js'
import { SITE_LINKS } from '../../../frontend/src/shared/siteNav.js'

const floorIds = new Set([...nav, ...indicator].map((item) => item.id))
const paths = new Set(SITE_LINKS.map((link) => link.href))

export const INJECTION_REPLY = {
  es: 'Solo hablo del portafolio de Angel.',
  en: "I only talk about Angel's portfolio.",
}

// El id es lo único que sale al cliente. floorId y path solo comprueban que el sitio los tiene.
const DESTINATIONS = {
  inicio: { id: 'inicio', label: { es: 'Inicio', en: 'Home' }, floorId: 'welcome' },
  historia: { id: 'historia', label: { es: 'Historia', en: 'History' }, floorId: 'about' },
  experiencia: { id: 'experiencia', label: { es: 'Experiencia', en: 'Experience' }, path: '/experiencia' },
  proyectos: { id: 'proyectos', label: { es: 'Proyectos', en: 'Projects' }, floorId: 'experience' },
  habilidades: { id: 'habilidades', label: { es: 'Habilidades', en: 'Skills' }, path: '/skills' },
  certificados: { id: 'certificados', label: { es: 'Reconocimientos', en: 'Awards' }, path: '/certificaciones' },
  galeria: { id: 'galeria', label: { es: 'Galería', en: 'Gallery' }, path: '/gallery' },
  contacto: { id: 'contacto', label: { es: 'Contacto', en: 'Contact' }, floorId: 'closing' },
  secret: { id: 'secret', label: { es: 'Sala secreta', en: 'Secret room' }, floorId: 'secret' },
}

for (const destination of Object.values(DESTINATIONS)) {
  if (destination.floorId && !floorIds.has(destination.floorId)) {
    throw new Error(`Unknown floor for chat destination ${destination.id}`)
  }
  if (destination.path && !paths.has(destination.path)) {
    throw new Error(`Unknown path for chat destination ${destination.id}`)
  }
}

export function isDestination(id) {
  return typeof id === 'string' && Object.prototype.hasOwnProperty.call(DESTINATIONS, id)
}

export function destinationLabel(id, lang = 'es') {
  const destination = DESTINATIONS[id]
  if (!destination) return null
  const label = destination.label
  if (label && typeof label === 'object') return label[lang === 'en' ? 'en' : 'es'] || label.es
  return label
}

export function navigationReply(id, lang = 'es') {
  const label = destinationLabel(id, lang)
  if (!label) return lang === 'en' ? INJECTION_REPLY.en : INJECTION_REPLY.es
  return lang === 'en' ? `Took you to ${label}.` : `Te llevé a ${label}.`
}
