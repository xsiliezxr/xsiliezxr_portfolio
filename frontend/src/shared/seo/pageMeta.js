import { pick } from '../i18n/localize.js'

const SITE_NAME = 'Angel Siliezar'
const DEFAULT_DESCRIPTION = {
  es: 'Angel Siliezar, desarrollador Full Stack en Guatemala. Historia, experiencia, proyectos, habilidades y contacto.',
  en: 'Angel Siliezar, Full Stack developer in Guatemala. Story, experience, projects, skills, and contact.',
}

export const PAGE_META = {
  '/': {
    title: { es: `${SITE_NAME} · Desarrollador Full Stack`, en: `${SITE_NAME} · Full Stack Developer` },
    description: {
      es: 'Portafolio de Angel Siliezar: recorrido 3D por pisos, sistemas full stack, hackathones y formación en Fundación Kinal.',
      en: 'Angel Siliezar portfolio: a 3D tour through floors, full stack systems, hackathons, and training at Fundación Kinal.',
    },
  },
  '/history': {
    title: { es: `Historia · ${SITE_NAME}`, en: `Story · ${SITE_NAME}` },
    description: {
      es: 'De desarmar una PC a programar full stack en Kinal. Origen, estudios y el camino hasta convertirse en desarrollador.',
      en: 'From taking a PC apart to programming full stack at Kinal. Origin, studies, and the path to becoming a developer.',
    },
  },
  '/experiencia': {
    title: { es: `Experiencia · ${SITE_NAME}`, en: `Experience · ${SITE_NAME}` },
    description: {
      es: 'Trabajo, prácticas en Combex, hackathones en Guatemala y El Salvador, y eventos tech. Registro priorizado de Angel Siliezar.',
      en: 'Work, the Combex internship, hackathons in Guatemala and El Salvador, and tech events. Angel Siliezar’s prioritized log.',
    },
  },
  '/projects': {
    title: { es: `Proyectos · ${SITE_NAME}`, en: `Projects · ${SITE_NAME}` },
    description: {
      es: 'Proyectos destacados y archivo técnico: IA aplicada, EcoBuild, sistemas para restaurantes y más trabajo de Angel Siliezar.',
      en: 'Featured projects and technical archive: applied AI, EcoBuild, restaurant systems, and more work by Angel Siliezar.',
    },
  },
  '/skills': {
    title: { es: `Habilidades · ${SITE_NAME}`, en: `Skills · ${SITE_NAME}` },
    description: {
      es: 'Stack y mapa de habilidades: React, Node, bases de datos, visión por computadora y herramientas de Angel Siliezar.',
      en: 'Stack and skill map: React, Node, databases, computer vision, and Angel Siliezar’s tools.',
    },
  },
  '/gallery': {
    title: { es: `Galería · ${SITE_NAME}`, en: `Gallery · ${SITE_NAME}` },
    description: {
      es: 'Fotos de formación, hackathones y momentos del recorrido de Angel Siliezar.',
      en: 'Photos of training, hackathons, and moments along Angel Siliezar’s path.',
    },
  },
  '/certificaciones': {
    title: { es: `Reconocimientos · ${SITE_NAME}`, en: `Awards · ${SITE_NAME}` },
    description: {
      es: 'Diplomas, certificados y badges de Angel Siliezar: Cisco, STEM, Kinal y más.',
      en: 'Diplomas, certificates, and badges of Angel Siliezar: Cisco, STEM, Kinal, and more.',
    },
  },
  '/contact': {
    title: { es: `Contacto · ${SITE_NAME}`, en: `Contact · ${SITE_NAME}` },
    description: {
      es: 'Contacto de Angel Siliezar: GitHub, LinkedIn, correo y mensaje directo para hablar de un proyecto.',
      en: 'Angel Siliezar contact: GitHub, LinkedIn, email, and a direct message to talk about a project.',
    },
  },
}

export function metaForPath(path, lang = 'es') {
  const page = PAGE_META[path]
  return {
    title: pick(page?.title ?? { es: SITE_NAME, en: SITE_NAME }, lang),
    description: pick(page?.description ?? DEFAULT_DESCRIPTION, lang),
  }
}

export function siteOrigin() {
  const fromEnv = String(import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '')
  if (fromEnv) return fromEnv
  if (typeof window !== 'undefined' && window.location?.origin) return window.location.origin
  return ''
}
