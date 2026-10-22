export const HISTORY_BANNER_PHRASES = {
  es: ['FULL STACK', 'KINAL', 'CANCHA', 'CÓDIGO', 'TRABAJO BIEN HECHO'],
  en: ['FULL STACK', 'KINAL', 'THE COURT', 'CODE', 'WORK DONE RIGHT'],
}

export const HISTORY_SCROLL_PHRASES = [
  {
    id: 'history-study',
    variant: 'editorial',
    top: { es: 'NO TENÍA EL MAPA', en: "I DIDN'T HAVE THE MAP" },
    bottom: { es: 'IGUAL EMPECÉ A CONSTRUIR', en: 'I STARTED BUILDING ANYWAY' },
  },
  {
    id: 'study-path',
    variant: 'comic',
    top: { es: 'APRENDER HACIENDO', en: 'LEARN BY DOING' },
    bottom: {
      es: 'ROMPER · ENTENDER · VOLVER A INTENTAR',
      en: 'BREAK · UNDERSTAND · TRY AGAIN',
    },
  },
]

export const historyPath = {
  title: { es: 'De estudiante a desarrollador', en: 'From student to developer' },
  body: {
    es: 'De Fe y Alegría No. 9-40, donde me formé como persona, a Fundación Kinal, donde el código se volvió oficio. De los hackathones de 2026 (UVG, UFG, la Buildathon, EcoBuild y Hack@Latam) a las prácticas en Combex, con software de operación real. De la comunidad 502, que me sacó del aula, hacia Ingeniería en Sistemas en la UMG en 2027. Toca una etapa. El detalle de cada entregable está en Experiencia.',
    en: 'From Fe y Alegría No. 9-40, where I was formed as a person, to Fundación Kinal, where code became a craft. From the 2026 hackathons (UVG, UFG, the Buildathon, EcoBuild, and Hack@Latam) to the Combex internship, with software on a live operation. From the 502 community, which pulled me out of the classroom, toward Systems Engineering at UMG in 2027. Tap a stage. The detail of each delivery is in Experience.',
  },
  cta: { es: 'Ver registro completo', en: 'See the full record' },
  ctaHref: '/experiencia',
}

export const historyChrome = {
  title: { es: 'Historia de Angel Siliezar', en: "Angel Siliezar's story" },
  downloadCv: { es: 'Descargar CV', en: 'Download CV' },
  exploreGallery: { es: 'Explorar galería', en: 'Explore gallery' },
  city: { es: 'Ciudad de Guatemala', en: 'Guatemala City' },
  present: { es: '2007 · Presente', en: '2007 · Present' },
  arrivalAlt: { es: 'Llegada a Fundación Kinal', en: 'Arrival at Fundación Kinal' },
  kinal: { es: 'Fundación Kinal', en: 'Fundación Kinal' },
  software: { es: 'Desarrollo de Software', en: 'Software Development' },
  photos: { es: 'Fotos de esa etapa →', en: 'Photos from that stage →' },
  awardsLink: { es: 'Ver reconocimientos →', en: 'See awards →' },
  awardsTitle: { es: 'Reconocimientos', en: 'Awards' },
  projects: { es: 'Ver proyectos', en: 'See projects' },
}

export const historyStages = [
  {
    id: 'fe-y-alegria',
    rol: { es: 'Fe y Alegría', en: 'Fe y Alegría' },
    short: { es: 'Fe y Alegría', en: 'Fe y Alegría' },
    fecha: { es: 'Antes de Kinal', en: 'Before Kinal' },
    lugar: { es: 'No. 9-40', en: 'No. 9-40' },
    arco: {
      es: 'Ahí me formé como persona, antes de tomar el código en serio. Estudié en el No. 9-40, entre programas, actividades y eventos. Las habilidades blandas salieron de esa escuela, no de un taller. Cuando después tuve que hablar frente a un jurado, esa base ya estaba.',
      en: 'That is where I became a person, before I took code seriously. I studied at No. 9-40, among programs, activities, and events. The soft skills came from that school, not from a workshop. When I later had to speak in front of a jury, that base was already there.',
    },
  },
  {
    id: 'kinal',
    rol: { es: 'Fundación Kinal', en: 'Fundación Kinal' },
    short: { es: 'Kinal', en: 'Kinal' },
    fecha: { es: 'Desde 2024', en: 'Since 2024' },
    lugar: { es: 'Desarrollo de Software', en: 'Software Development' },
    arco: {
      es: 'No sabía qué estudiar. En Fundación Kinal, desde 2024, encontré programación: React, Node, bases de datos y Git con gente de verdad. Si algo se rompe, es mi problema hasta que lo arreglo. Ahí también salieron los mejores promedios de la promoción y la idea del trabajo bien hecho.',
      en: "I didn't know what to study. At Fundación Kinal, since 2024, I found programming: React, Node, databases, and Git with real people. If something breaks, it is my problem until I fix it. That is also where the best averages in the class came from, and the idea of work done right.",
    },
  },
  {
    id: 'hackathones-2026',
    rol: { es: 'Hackathones 2026', en: 'Hackathons 2026' },
    short: { es: 'Hackathones', en: 'Hackathons' },
    fecha: { es: 'UVG · UFG · pitches', en: 'UVG · UFG · pitches' },
    lugar: { es: '2026', en: '2026' },
    arco: {
      es: 'El aula se quedó corta. El primer golpe fue la UVG con The502Project: un producto en menos de seis horas, sin pasar a finales. Después vinieron El Salvador (UFG y la Cursor Buildathon de Ai Labs), el primer pitch en el Hackathon TEC y EcoBuild en tercer lugar, con 2000 USD de semilla. Aprender contra reloj, con poco sueño, y aun así entregar.',
      en: 'The classroom ran out of room. The first hit was UVG with The502Project: a product in under six hours, without reaching the finals. Then came El Salvador (UFG and Ai Labs’ Cursor Buildathon), the first pitch at Hackathon TEC, and EcoBuild in third place, with USD 2,000 in seed funding. Learning against the clock, on little sleep, and still delivering.',
    },
    image: 'primer-hackaton',
  },
  {
    id: 'combex',
    rol: { es: 'Prácticas en Combex', en: 'Internship at Combex' },
    short: { es: 'Combex', en: 'Combex' },
    fecha: { es: '+400 horas · IT', en: '+400 hours · IT' },
    lugar: { es: 'Combex', en: 'Combex' },
    arco: {
      es: 'Primera vez con software que mueve operación real: logística de carga aérea en CombexIM. Cerré más de 400 horas en IT y quedé entre los seis mejores practicantes. El desayuno con el Director Ejecutivo cerró la etapa con consejos, no con un diploma vacío. Ahí dejó de ser tarea de clase.',
      en: 'First time with software that moves a real operation: air-cargo logistics at CombexIM. I closed more than 400 hours in IT and landed among the top six interns. Breakfast with the Executive Director closed the stage with advice, not an empty diploma. That is where it stopped being a class assignment.',
    },
  },
  {
    id: 'comunidad-502',
    rol: { es: 'Comunidad 502', en: '502 community' },
    short: { es: 'Comunidad 502', en: '502 community' },
    fecha: { es: 'The502Project', en: 'The502Project' },
    lugar: { es: 'Guatemala', en: 'Guatemala' },
    arco: {
      es: 'La comunidad tech de Guatemala, con The502Project. Hackathones, demo days y gente que construye de verdad. En la Cursor Hackathon de Ciudad de Guatemala se juntaron 140 personas y el 60% vivía su primera. También estuve de oyente en el Startup World Cup y el 502 Demo Day: un pitch se sostiene si el valor se entiende.',
      en: 'Guatemala’s tech community, with The502Project. Hackathons, demo days, and people who actually build. At the Cursor Hackathon in Guatemala City, 140 people showed up and 60% were at their first one. I also attended the Startup World Cup and the 502 Demo Day as a listener: a pitch holds when the value is understood.',
    },
  },
  {
    id: 'umg-2027',
    rol: { es: 'Hacia la UMG', en: 'Toward UMG' },
    short: { es: 'UMG 2027', en: 'UMG 2027' },
    fecha: { es: '2027', en: '2027' },
    lugar: { es: 'Ingeniería en Sistemas', en: 'Systems Engineering' },
    arco: {
      es: 'En 2027 entro a Ingeniería en Sistemas en la UMG, para seguir estudiando y trabajando de lo que me gusta. Kinal me dio el oficio; la universidad es el siguiente tramo, no un reinicio. En el camino van más certificaciones. La meta sigue siendo software que sirva, no solo que se vea en un perfil.',
      en: 'In 2027 I start Systems Engineering at UMG, so I can keep studying and working on what I like. Kinal gave me the craft; university is the next stretch, not a restart. More certifications come along the way. The aim is still software that is useful, not only software that looks good on a profile.',
    },
  },
]

export const historyNarrative = [
  {
    es: 'No tuve un mapa. En Fe y Alegría aprendí a estar con gente; en Kinal aprendí a construir. El resto lo fui armando en hackathones, en Combex y en la comunidad, con el reloj encima y sin esperar a que alguien me dijera que ya estaba listo.',
    en: 'I did not have a map. At Fe y Alegría I learned how to be with people; at Kinal I learned how to build. The rest came together in hackathons, at Combex, and in the community, on the clock, without waiting for someone to tell me I was ready.',
  },
  {
    es: 'Me gusta el trabajo que se puede mostrar. Un pitch, un sistema que usa alguien, una hora de más cuando el demo todavía no corre. Si se rompe, es mío hasta que queda de pie. Esa es la frase del colegio que se me quedó: el trabajo bien hecho.',
    en: 'I care about work that can be shown. A pitch, a system someone uses, an extra hour when the demo still does not run. If it breaks, it is mine until it stands. That is the school line that stayed with me: work done right.',
  },
  {
    es: 'Lo que sigue es la UMG y el primer rol formal. No para empezar de cero. Para seguir con lo mismo, con más oficio y con la misma exigencia.',
    en: 'What comes next is UMG and a first formal role. Not to start from zero. To continue the same work, with more craft and the same standard.',
  },
]

export const HISTORY_CORE_PHRASE = {
  es: 'El trabajo bien hecho',
  en: 'Work done right',
}

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
