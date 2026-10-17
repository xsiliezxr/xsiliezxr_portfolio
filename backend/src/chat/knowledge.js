import { certificates } from '../../../frontend/src/features/certifications/certifications.data.js'
import { EXPERIENCE_FILTERS, experienceEntries } from '../../../frontend/src/features/experience/experience.content.js'
import { galleryFrames } from '../../../frontend/src/features/gallery/gallery.data.js'
import {
  about,
  closing,
  experience,
  hero,
  indicator,
  nav,
  studies,
  tools,
} from '../../../frontend/src/features/home/content/journey.content.js'
import { projects, projectsLead } from '../../../frontend/src/features/projects/projects.data.js'
import { skillConstellations } from '../../../frontend/src/features/skills/skills.content.js'

function section(title, value) {
  return `${title}\n${JSON.stringify(value)}`
}

function omit(record, keys) {
  const next = {}
  for (const key of Object.keys(record)) {
    if (!keys.has(key)) next[key] = record[key]
  }
  return next
}

const projectText = projects.map((project) => omit(project, new Set(['image'])))

const certificateText = certificates.map((certificate) => {
  const next = omit(certificate, new Set(['file']))
  if (Array.isArray(certificate.attachments)) {
    next.attachments = certificate.attachments.map((item) => omit(item, new Set(['file'])))
  }
  return next
})

const galleryText = galleryFrames.map((frame) => omit(frame, new Set(['file'])))

const skillText = skillConstellations.map((group) => ({
  id: group.id,
  label: group.label,
  nodes: group.nodes.map((node) => ({
    id: node.id,
    label: node.label,
    level: node.level,
    levelLabel: node.levelLabel,
    blurb: node.blurb,
  })),
}))

// Omite el piso secret y las rutas de imagen: uno sigue bloqueado y las otras no son texto.
const publishedIndicator = indicator.filter((floor) => floor.id !== 'secret')

export const KNOWLEDGE = [
  section('Inicio', hero),
  section('Historia', about),
  section('Estudios', studies),
  section('Piso de trayectoria', experience),
  section('Herramientas', tools),
  section('Cierre', closing),
  section('Pisos', { nav, indicator: publishedIndicator }),
  section('Experiencia', { filters: EXPERIENCE_FILTERS, entries: experienceEntries }),
  section('Habilidades', skillText),
  section('Proyectos', { lead: projectsLead, projects: projectText }),
  section('Certificados', certificateText),
  section('Galería', galleryText),
].join('\n\n')
