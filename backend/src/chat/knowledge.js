import '../../configs/env.js'
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
  chunk('sili', 'Agente Sili', {
    name: 'Sili',
    role: 'Agente del portafolio de Angel Siliezar',
    voice: 'Se llama solo Sili. Habla en el idioma del sitio. No es Angel; presenta su trabajo y puede redirigir a secciones.',
    aboutAngel: 'Angel Siliezar es desarrollador Full Stack estudiante egresado de Fundación Kinal, Guatemala.',
    insidePortfolio: true,
    canDo: [
      'Responder sobre historia, estudios, experiencia, skills, proyectos y reconocimientos de Angel',
      'Indicar páginas del sitio (/history, /projects, /skills, /contact, etc.) y pisos del recorrido',
      'Redirigir con destination cuando el visitante pida ir a una sección',
      'Usar el hilo reciente (hasta 20 mensajes) para recordar la conversación',
    ],
    cannotDo: [
      'No resuelve mates, clima ni temas ajenos al portafolio',
      'Las skills técnicas son de Angel, no del agente',
    ],
  }, [
    'quien', 'eres', 'sili', 'agente', 'asistente', 'chat', 'presentate', 'presentacion',
    'puedes', 'hacer', 'ayuda', 'sirves', 'capacidades', 'anterior', 'pregunte', 'preguntaste', 'resumen',
  ]),
  chunk('hero', 'Inicio', hero, [
    'angel', 'siliezar', 'nombre', 'quien', 'eres', 'presentacion', 'desarrollador', 'full', 'stack', 'inicio', 'rol', 'frase',
  ]),
  chunk('about', 'Historia', about, [
    'historia', 'sobre', 'about', 'biografia', 'kinal', 'guatemala', 'edad', 'anos', 'años', 'nacimiento',
    'basket', 'familia', 'quien', 'eres', 'angel', 'tiene', 'cuantos',
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
    'pisos', 'navegacion', 'elevador', 'mapa', 'secciones', 'inicio', 'apartado', 'pagina',
  ]),
  chunk('experience', 'Experiencia', { filters: EXPERIENCE_FILTERS, entries: experienceEntries }, [
    'experiencia', 'trabajo', 'hackaton', 'evento', 'combex', 'practicas', 'buildathon', 'hacklatam', 'empleo', 'rol',
  ]),
  chunk('skills', 'Habilidades', skillText, [
    'habilidades', 'skills', 'react', 'node', 'javascript', 'python', 'sql', 'frontend', 'backend', 'ia', 'nivel',
    'maneja', 'manejas', 'sabe', 'sabes', 'tecnologias',
  ]),
  chunk('projects', 'Proyectos', { lead: projectsLead, projects: projectText }, [
    'proyectos', 'proyecto', 'aisentinel', 'portfolio', 'repos', 'demo', 'github', 'trabajo', 'productos', 'cuantos',
  ]),
  chunk('certificates', 'Reconocimientos', certificateText, [
    'reconocimientos', 'certificados', 'certificaciones', 'diplomas', 'badges', 'cisco', 'cursos', 'meritos',
  ]),
  chunk('gallery', 'Galería', galleryText, [
    'galeria', 'fotos', 'imagenes', 'hackaton', 'eventos', 'recuerdos',
  ]),
  chunk('contact', 'Contacto', contactPayload(), [
    'contacto', 'contactar', 'contactarlo', 'email', 'correo', 'linkedin', 'github', 'whatsapp',
    'redes', 'escribir', 'hablar', 'mensaje', 'apartado', 'pagina', 'seccion',
  ]),
]

export function contactPayload() {
  const email = process.env.VITE_CONTACT_EMAIL?.trim() || undefined
  const linkedin = process.env.VITE_LINKEDIN_URL?.trim() || undefined
  const githubPersonal = process.env.VITE_GITHUB_URL?.trim() || undefined
  const githubKinal = process.env.VITE_GITHUB_KINAL_URL?.trim() || undefined
  const whatsapp = process.env.VITE_WHATSAPP_NUMBER?.trim() || undefined
  return {
    page: '/contact',
    pageLabel: 'Contacto',
    email,
    linkedin,
    githubPersonal,
    githubKinal,
    whatsapp,
    note: email || linkedin || githubPersonal || githubKinal || whatsapp
      ? 'Puedes mencionar estos enlaces y la página /contact.'
      : 'Los enlaces se ven en la página /contact del sitio. No inventes otros.',
  }
}

export const GENERAL_CHUNK_IDS = ['sili', 'hero', 'about', 'studies']
