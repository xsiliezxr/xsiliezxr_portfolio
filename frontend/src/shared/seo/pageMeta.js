const SITE_NAME = 'Angel Siliezar'
const DEFAULT_DESCRIPTION =
  'Angel Siliezar, desarrollador Full Stack en Guatemala. Historia, experiencia, proyectos, habilidades y contacto.'

export const PAGE_META = {
  '/': {
    title: `${SITE_NAME} · Desarrollador Full Stack`,
    description:
      'Portafolio de Angel Siliezar: recorrido 3D por pisos, sistemas full stack, hackathones y formación en Fundación Kinal.',
  },
  '/history': {
    title: `Historia · ${SITE_NAME}`,
    description:
      'De desarmar una PC a programar full stack en Kinal. Origen, estudios y el camino hasta convertirse en desarrollador.',
  },
  '/experiencia': {
    title: `Experiencia · ${SITE_NAME}`,
    description:
      'Trabajo, prácticas en Combex, hackathones en Guatemala y El Salvador, y eventos tech. Registro priorizado de Angel Siliezar.',
  },
  '/projects': {
    title: `Proyectos · ${SITE_NAME}`,
    description:
      'Sistemas destacados y archivo de proyectos: AI Sentinel, restaurantes, banca y más trabajo en equipo de Angel Siliezar.',
  },
  '/skills': {
    title: `Habilidades · ${SITE_NAME}`,
    description:
      'Stack y mapa de habilidades: React, Node, bases de datos, visión por computadora y herramientas de Angel Siliezar.',
  },
  '/gallery': {
    title: `Galería · ${SITE_NAME}`,
    description: 'Fotos de formación, hackathones y momentos del recorrido de Angel Siliezar.',
  },
  '/certificaciones': {
    title: `Reconocimientos · ${SITE_NAME}`,
    description: 'Diplomas, certificados y badges de Angel Siliezar: Cisco, STEM, Kinal y más.',
  },
  '/contact': {
    title: `Contacto · ${SITE_NAME}`,
    description:
      'Contacto de Angel Siliezar: GitHub, LinkedIn, correo y mensaje directo para hablar de un proyecto.',
  },
}

export function metaForPath(path) {
  return PAGE_META[path] || {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
  }
}

export function siteOrigin() {
  const fromEnv = String(import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '')
  if (fromEnv) return fromEnv
  if (typeof window !== 'undefined' && window.location?.origin) return window.location.origin
  return ''
}
