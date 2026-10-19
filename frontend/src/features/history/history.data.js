export const HISTORY_BANNER_PHRASES = [
  'FULL STACK',
  'KINAL',
  'CANCHA',
  'CÓDIGO',
  'TRABAJO BIEN HECHO',
]

export const HISTORY_SCROLL_PHRASES = [
  {
    id: 'history-study',
    variant: 'editorial',
    top: 'NO TENÍA EL MAPA',
    bottom: 'IGUAL EMPECÉ A CONSTRUIR',
  },
  {
    id: 'study-path',
    variant: 'comic',
    top: 'APRENDER HACIENDO',
    bottom: 'ROMPER · ENTENDER · VOLVER A INTENTAR',
  },
]

export const historyPath = {
  title: 'De estudiante a desarrollador',
  body: 'Desde Kinal hasta sistemas reales. Toca una etapa. El detalle completo está en Experiencia.',
  cta: 'Ver registro completo',
  ctaHref: '/experiencia',
}

export const HISTORY_CORE_PHRASE = 'El trabajo bien hecho'

// Collage denso. seed = aparece al cargar. reject = tachada (eso no va conmigo).
export const HISTORY_BRAINSTORM = [
  { id: 'seed', label: 'Disciplina', seed: true, top: '18%', left: '8%', rotate: -8, size: 'clamp(1.8rem, 5.5vw, 3.4rem)', shape: 'block', tone: 'virtue' },

  { id: 'constancia', label: 'Constancia', top: '5%', left: '4%', rotate: -11, size: 'clamp(1.2rem, 3.4vw, 2.2rem)', shape: 'tag', tone: 'virtue' },
  { id: 'resiliencia', label: 'Resiliencia', top: '4%', right: '5%', rotate: 8, size: 'clamp(1.15rem, 3.2vw, 2.1rem)', shape: 'pill', tone: 'virtue' },
  { id: 'liderazgo', label: 'Liderazgo', top: '9%', left: '28%', rotate: -3, size: 'clamp(1.35rem, 4vw, 2.6rem)', shape: 'block', tone: 'virtue' },
  { id: 'trabajo', label: 'Trabajo', top: '7%', right: '22%', rotate: 12, size: 'clamp(1.5rem, 4.5vw, 2.9rem)', shape: 'tag', tone: 'virtue' },
  { id: 'compromiso', label: 'Compromiso', top: '14%', right: '8%', rotate: 5, size: 'clamp(1.05rem, 2.9vw, 1.85rem)', shape: 'pill', tone: 'virtue' },
  { id: 'escucha', label: 'Escucha', top: '22%', left: '3%', rotate: 10, size: 'clamp(1.1rem, 3vw, 1.95rem)', shape: 'tag', tone: 'virtue' },
  { id: 'humildad', label: 'Humildad', top: '16%', left: '78%', rotate: -14, size: 'clamp(0.95rem, 2.6vw, 1.65rem)', shape: 'tag', tone: 'virtue' },
  { id: 'foco', label: 'Foco', top: '26%', right: '3%', rotate: -6, size: 'clamp(1.4rem, 4.2vw, 2.7rem)', shape: 'block', tone: 'virtue' },
  { id: 'entrega', label: 'Entrega', top: '30%', left: '6%', rotate: 4, size: 'clamp(1.25rem, 3.6vw, 2.3rem)', shape: 'tag', tone: 'virtue' },
  { id: 'curiosidad', label: 'Curiosidad', top: '34%', right: '4%', rotate: 9, size: 'clamp(1.1rem, 3.1vw, 2rem)', shape: 'pill', tone: 'virtue' },
  { id: 'honestidad', label: 'Honestidad', top: '38%', left: '3%', rotate: -7, size: 'clamp(1rem, 2.8vw, 1.75rem)', shape: 'tag', tone: 'virtue' },
  { id: 'responsabilidad', label: 'Responsabilidad', top: '28%', right: '22%', rotate: 3, size: 'clamp(0.9rem, 2.5vw, 1.55rem)', shape: 'block', tone: 'virtue' },
  { id: 'iniciativa', label: 'Iniciativa', top: '64%', left: '4%', rotate: -10, size: 'clamp(1.15rem, 3.3vw, 2.1rem)', shape: 'pill', tone: 'virtue' },
  { id: 'empatia', label: 'Empatía', top: '68%', right: '4%', rotate: 11, size: 'clamp(1.05rem, 2.9vw, 1.85rem)', shape: 'tag', tone: 'virtue' },
  { id: 'perseverancia', label: 'Perseverancia', top: '72%', left: '18%', rotate: -4, size: 'clamp(0.95rem, 2.7vw, 1.7rem)', shape: 'pill', tone: 'virtue' },
  { id: 'calidad', label: 'Calidad', top: '62%', right: '6%', rotate: 7, size: 'clamp(1.3rem, 3.8vw, 2.4rem)', shape: 'block', tone: 'virtue' },
  { id: 'pasion', label: 'Pasión', top: '66%', left: '8%', rotate: -12, size: 'clamp(1.2rem, 3.4vw, 2.15rem)', shape: 'tag', tone: 'virtue' },
  { id: 'aprender', label: 'Aprender', top: '70%', right: '20%', rotate: 5, size: 'clamp(1.1rem, 3vw, 1.95rem)', shape: 'pill', tone: 'virtue' },
  { id: 'construir', label: 'Construir', top: '74%', left: '26%', rotate: -8, size: 'clamp(1.25rem, 3.5vw, 2.25rem)', shape: 'block', tone: 'virtue' },
  { id: 'equipo', label: 'Equipo', top: '78%', right: '8%', rotate: 6, size: 'clamp(1.35rem, 4vw, 2.55rem)', shape: 'tag', tone: 'virtue' },
  { id: 'presion', label: 'Presión', top: '82%', left: '10%', rotate: -5, size: 'clamp(1.05rem, 2.9vw, 1.85rem)', shape: 'pill', tone: 'virtue' },
  { id: 'resultado', label: 'Resultado', top: '86%', right: '24%', rotate: 9, size: 'clamp(1rem, 2.8vw, 1.75rem)', shape: 'block', tone: 'virtue' },
  { id: 'detalle', label: 'Detalle', top: '90%', left: '4%', rotate: -9, size: 'clamp(1.15rem, 3.2vw, 2.05rem)', shape: 'tag', tone: 'virtue' },
  { id: 'claridad', label: 'Claridad', top: '88%', right: '4%', rotate: 4, size: 'clamp(1.05rem, 2.9vw, 1.85rem)', shape: 'block', tone: 'virtue' },

  { id: 'react', label: 'React', top: '11%', left: '58%', rotate: -6, size: 'clamp(1.4rem, 4.2vw, 2.7rem)', shape: 'tag', tone: 'tech' },
  { id: 'node', label: 'Node', top: '19%', right: '32%', rotate: 8, size: 'clamp(1.15rem, 3.2vw, 2rem)', shape: 'pill', tone: 'tech' },
  { id: 'js', label: 'JavaScript', top: '24%', left: '78%', rotate: -4, size: 'clamp(1rem, 2.8vw, 1.75rem)', shape: 'block', tone: 'tech' },
  { id: 'sql', label: 'SQL', top: '28%', left: '68%', rotate: 11, size: 'clamp(1.25rem, 3.5vw, 2.2rem)', shape: 'tag', tone: 'tech' },
  { id: 'git', label: 'Git', top: '8%', left: '38%', rotate: -15, size: 'clamp(0.95rem, 2.5vw, 1.55rem)', shape: 'pill', tone: 'tech' },
  { id: 'fullstack', label: 'Full Stack', top: '14%', right: '28%', rotate: 3, size: 'clamp(1.15rem, 3.3vw, 2.1rem)', shape: 'block', tone: 'tech' },
  { id: 'three', label: 'Three.js', top: '70%', left: '62%', rotate: 7, size: 'clamp(0.95rem, 2.6vw, 1.65rem)', shape: 'tag', tone: 'tech' },
  { id: 'api', label: 'API', top: '48%', right: '4%', rotate: -8, size: 'clamp(1.3rem, 3.7vw, 2.35rem)', shape: 'pill', tone: 'tech' },
  { id: 'typescript', label: 'TypeScript', top: '78%', left: '58%', rotate: 5, size: 'clamp(0.9rem, 2.4vw, 1.5rem)', shape: 'tag', tone: 'tech' },
  { id: 'mongo', label: 'MongoDB', top: '58%', right: '3%', rotate: -3, size: 'clamp(1rem, 2.7vw, 1.7rem)', shape: 'tag', tone: 'tech' },
  { id: 'express', label: 'Express', top: '84%', left: '72%', rotate: 10, size: 'clamp(1.05rem, 2.9vw, 1.85rem)', shape: 'pill', tone: 'tech' },
  { id: 'gsap', label: 'GSAP', top: '68%', left: '68%', rotate: -11, size: 'clamp(1.2rem, 3.4vw, 2.15rem)', shape: 'block', tone: 'tech' },
  { id: 'vite', label: 'Vite', top: '72%', right: '32%', rotate: 6, size: 'clamp(1.1rem, 3vw, 1.9rem)', shape: 'tag', tone: 'tech' },
  { id: 'ia', label: 'IA', top: '76%', left: '52%', rotate: -5, size: 'clamp(1.55rem, 4.6vw, 3rem)', shape: 'block', tone: 'tech' },
  { id: 'saas', label: 'SaaS', top: '80%', right: '36%', rotate: 8, size: 'clamp(1.15rem, 3.2vw, 2rem)', shape: 'pill', tone: 'tech' },
  { id: 'docker', label: 'Docker', top: '84%', left: '42%', rotate: -7, size: 'clamp(0.95rem, 2.6vw, 1.65rem)', shape: 'tag', tone: 'tech' },
  { id: 'css', label: 'CSS', top: '12%', right: '42%', rotate: 14, size: 'clamp(1.05rem, 2.9vw, 1.8rem)', shape: 'pill', tone: 'tech' },
  { id: 'html', label: 'HTML', top: '40%', left: '72%', rotate: -9, size: 'clamp(1rem, 2.7vw, 1.7rem)', shape: 'pill', tone: 'tech' },

  { id: 'kinal', label: 'Kinal', top: '20%', left: '72%', rotate: -2, size: 'clamp(1.5rem, 4.5vw, 2.9rem)', shape: 'block', tone: 'identity' },
  { id: 'guatemala', label: 'Guatemala', top: '92%', left: '42%', rotate: 4, size: 'clamp(0.9rem, 2.4vw, 1.5rem)', shape: 'tag', tone: 'identity' },
  { id: 'cancha', label: 'Cancha', top: '60%', left: '78%', rotate: 12, size: 'clamp(1.05rem, 2.9vw, 1.85rem)', shape: 'tag', tone: 'identity' },
  { id: 'hackathon', label: 'Hackathon', top: '4%', left: '62%', rotate: -6, size: 'clamp(0.95rem, 2.5vw, 1.55rem)', shape: 'pill', tone: 'identity' },
  { id: 'sili', label: 'Sili', top: '92%', right: '14%', rotate: 7, size: 'clamp(1.2rem, 3.4vw, 2.15rem)', shape: 'tag', tone: 'identity' },
  { id: 'programar', label: 'Programar', top: '8%', left: '72%', rotate: -10, size: 'clamp(1.1rem, 3vw, 1.95rem)', shape: 'block', tone: 'identity' },
  { id: 'imaginar', label: 'Imaginar', top: '94%', left: '28%', rotate: 5, size: 'clamp(1rem, 2.8vw, 1.75rem)', shape: 'pill', tone: 'identity' },

  { id: 'excusas', label: 'Excusas', top: '10%', left: '44%', rotate: -16, size: 'clamp(1.15rem, 3.2vw, 2.1rem)', shape: 'slash', tone: 'reject' },
  { id: 'ego', label: 'Ego', top: '20%', right: '40%', rotate: 13, size: 'clamp(1.35rem, 3.8vw, 2.4rem)', shape: 'slash', tone: 'reject' },
  { id: 'mediocridad', label: 'Mediocridad', top: '32%', left: '20%', rotate: -5, size: 'clamp(1.1rem, 3vw, 1.95rem)', shape: 'slash', tone: 'reject' },
  { id: 'procrastinar', label: 'Procrastinar', top: '36%', right: '18%', rotate: 8, size: 'clamp(1.05rem, 2.9vw, 1.85rem)', shape: 'slash', tone: 'reject' },
  { id: 'soberbia', label: 'Soberbia', top: '66%', left: '36%', rotate: -12, size: 'clamp(1.2rem, 3.3vw, 2.15rem)', shape: 'slash', tone: 'reject' },
  { id: 'improvisar', label: 'Improvisar a ciegas', top: '74%', right: '28%', rotate: 4, size: 'clamp(0.95rem, 2.5vw, 1.55rem)', shape: 'slash', tone: 'reject' },
  { id: 'quejarse', label: 'Quejarse', top: '80%', left: '48%', rotate: -9, size: 'clamp(1.15rem, 3.1vw, 2rem)', shape: 'slash', tone: 'reject' },
  { id: 'flojo', label: 'Flojo', top: '88%', left: '22%', rotate: 11, size: 'clamp(1.25rem, 3.5vw, 2.25rem)', shape: 'slash', tone: 'reject' },
  { id: 'copiar', label: 'Copiar sin entender', top: '12%', right: '6%', rotate: -3, size: 'clamp(0.95rem, 2.5vw, 1.55rem)', shape: 'slash', tone: 'reject' },
  { id: 'rendirse', label: 'Rendirse', top: '86%', left: '62%', rotate: 6, size: 'clamp(1.2rem, 3.4vw, 2.15rem)', shape: 'slash', tone: 'reject' },
  { id: 'toxicidad', label: 'Toxicidad', top: '94%', right: '8%', rotate: -7, size: 'clamp(1.1rem, 3vw, 1.9rem)', shape: 'slash', tone: 'reject' },
  { id: 'mentir', label: 'Mentir', top: '42%', left: '82%', rotate: 9, size: 'clamp(1.15rem, 3.2vw, 2.05rem)', shape: 'slash', tone: 'reject' },
]
