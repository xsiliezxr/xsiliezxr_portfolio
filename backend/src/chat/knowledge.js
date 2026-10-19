import { certificates } from '../../../frontend/src/features/certifications/certifications.data.js'
import { EXPERIENCE_FILTERS, experienceEntries } from '../../../frontend/src/features/experience/experience.data.js'
import { galleryFrames } from '../../../frontend/src/features/gallery/gallery.frames.js'
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
import { projects, projectsLead } from '../../../frontend/src/features/projects/projects.list.js'
import { skillConstellations } from '../../../frontend/src/features/skills/skills.data.js'

export function section(title, value) {
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

const publishedIndicator = indicator.filter((floor) => floor.id !== 'secret')

function chunk(id, title, value, terms) {
  return { id, title, text: section(title, value), terms }
}

export const CHUNKS = [
  chunk('hero', 'Inicio', hero, [
    'angel', 'siliezar', 'nombre', 'quien', 'presentacion', 'desarrollador', 'full', 'stack', 'inicio', 'rol', 'frase',
  ]),
  chunk('about', 'Historia', about, [
    'historia', 'sobre', 'about', 'biografia', 'kinal', 'guatemala', 'edad', 'nacimiento', 'basket', 'familia', 'quien',
  ]),
  chunk('studies', 'Estudios', studies, [
    'estudios', 'formacion', 'kinal', 'escuela', 'tecnico', 'carrera', 'universidad', 'fe', 'alegria',
  ]),
  chunk('experience-floor', 'Piso de trayectoria', experience, [
    'trayectoria', 'piso', 'hackaton', 'practicas', 'timeline', 'experiencia', 'vacacionista',
  ]),
  chunk('tools', 'Herramientas', tools, [
    'herramientas', 'stack', 'tecnologias', 'ide', 'tools', 'con', 'que', 'construye',
  ]),
  chunk('closing', 'Cierre', closing, [
    'cierre', 'ahora', 'actual', 'contacto', 'disponible', 'siguiente',
  ]),
  chunk('floors', 'Pisos', { nav, indicator: publishedIndicator }, [
    'pisos', 'navegacion', 'elevador', 'mapa', 'secciones', 'inicio',
  ]),
  chunk('experience', 'Experiencia', { filters: EXPERIENCE_FILTERS, entries: experienceEntries }, [
    'experiencia', 'trabajo', 'hackaton', 'evento', 'combex', 'practicas', 'buildathon', 'hacklatam', 'empleo', 'rol',
  ]),
  chunk('skills', 'Habilidades', skillText, [
    'habilidades', 'skills', 'react', 'node', 'javascript', 'python', 'sql', 'frontend', 'backend', 'ia', 'nivel',
  ]),
  chunk('projects', 'Proyectos', { lead: projectsLead, projects: projectText }, [
    'proyectos', 'aisentinel', 'portfolio', 'repos', 'demo', 'github', 'trabajo', 'productos',
  ]),
  chunk('certificates', 'Reconocimientos', certificateText, [
    'reconocimientos', 'certificados', 'certificaciones', 'diplomas', 'badges', 'cisco', 'cursos', 'meritos',
  ]),
  chunk('gallery', 'Galería', galleryText, [
    'galeria', 'fotos', 'imagenes', 'hackaton', 'eventos', 'recuerdos',
  ]),
  chunk('contact', 'Contacto', {
    page: '/contact',
    githubPersonal: 'https://github.com/xsiliezxr',
    githubKinal: 'https://github.com/asiliezar-2024342',
    note: 'Email, LinkedIn y WhatsApp se publican en la página de contacto cuando están en el entorno. No inventes otros enlaces.',
  }, [
    'contacto', 'email', 'correo', 'linkedin', 'github', 'whatsapp', 'redes', 'escribir', 'hablar', 'mensaje',
  ]),
]

export const GENERAL_CHUNK_IDS = ['hero', 'about', 'studies', 'experience']
