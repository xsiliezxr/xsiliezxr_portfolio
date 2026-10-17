import { indicator, nav } from '../../../frontend/src/features/home/content/journey.content.js'
import { SITE_LINKS } from '../../../frontend/src/shared/siteNav.js'

const floorIds = new Set([...nav, ...indicator].map((item) => item.id))
const paths = new Set(SITE_LINKS.map((link) => link.href))

export const INJECTION_REPLY = 'Solo hablo del portafolio de Angel.'

// El id es lo único que sale al cliente. floorId y path solo comprueban que el sitio los tiene.
const DESTINATIONS = {
  inicio: { id: 'inicio', label: 'Inicio', floorId: 'welcome' },
  historia: { id: 'historia', label: 'Historia', floorId: 'about' },
  experiencia: { id: 'experiencia', label: 'Experiencia', path: '/experiencia' },
  proyectos: { id: 'proyectos', label: 'Proyectos', floorId: 'experience' },
  habilidades: { id: 'habilidades', label: 'Habilidades', path: '/skills' },
  certificados: { id: 'certificados', label: 'Certificados', path: '/certificaciones' },
  galeria: { id: 'galeria', label: 'Galería', path: '/gallery' },
  contacto: { id: 'contacto', label: 'Contacto', floorId: 'closing' },
  secret: { id: 'secret', label: 'Sala secreta', floorId: 'secret' },
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

export function navigationReply(id) {
  const destination = DESTINATIONS[id]
  if (!destination) return INJECTION_REPLY
  return `Te llevé a ${destination.label}.`
}
