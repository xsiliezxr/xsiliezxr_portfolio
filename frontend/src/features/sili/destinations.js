import { indicator, nav } from '../home/content/journey.content.js'
import { SITE_LINKS } from '../../shared/siteNav.js'

const PATHS = new Set(SITE_LINKS.map((link) => link.href))

function progressOf(floorId) {
  const fromNav = nav.find((item) => item.id === floorId)
  if (fromNav && typeof fromNav.progress === 'number') return fromNav.progress
  const fromIndicator = indicator.find((item) => item.id === floorId)
  if (fromIndicator && typeof fromIndicator.progress === 'number') return fromIndicator.progress
  return null
}

function floor(id, label, hint, floorId) {
  if (progressOf(floorId) == null) return null
  return { id, label, hint, move: { type: 'floor', floorId } }
}

function route(id, label, hint, path) {
  if (!PATHS.has(path)) return null
  return { id, label, hint, move: { type: 'route', path } }
}

// Los ids coinciden con el servidor; una ruta que no esté aquí no se abre.
export const DESTINATIONS = Object.fromEntries(
  [
    floor('inicio', 'Inicio', 'Inicio. El escritorio y la bajada.', 'welcome'),
    floor('historia', 'Historia', 'Historia. De dónde viene y cómo llegó a programar.', 'about'),
    route('experiencia', 'Experiencia', 'Experiencia. Trabajo, hackatones y eventos.', '/experiencia'),
    floor('proyectos', 'Proyectos', 'Proyectos. Trabajo, hackathones y los sistemas que armó.', 'experience'),
    route('habilidades', 'Habilidades', 'Habilidades. Con qué arma las interfaces y el servidor.', '/skills'),
    route('certificados', 'Reconocimientos', 'Reconocimientos. Diplomas, certificados y badges publicados.', '/certificaciones'),
    route('galeria', 'Galería', 'Galería. Fotos de la trayectoria.', '/gallery'),
    floor('contacto', 'Contacto', 'Contacto. El cierre del recorrido y cómo escribirle.', 'closing'),
    floor('secret', 'Sala secreta', 'Sala secreta. Lo que no va en el CV.', 'secret'),
  ].filter(Boolean).map((item) => [item.id, item]),
)

export function destinationById(id) {
  if (typeof id !== 'string') return null
  return DESTINATIONS[id] ?? null
}

export function floorProgress(floorId) {
  return progressOf(floorId)
}
