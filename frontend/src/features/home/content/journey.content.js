import { floorAnchor } from '../lib/journeyRig.js'

export const hero = {
  first: 'Angel',
  last: 'Siliezar',
  role: { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' },
  stack: {
    es: 'Construyo soluciones mediante software escalable y mantenible.',
    en: 'I build things with software that can grow and that I can still maintain.',
  },
  purpose: {
    es: 'Me apasiona la tecnología y la innovación. Me gusta crear soluciones que impacten positivamente en la vida de las personas.',
    en: 'I care about technology and building new things. I like making stuff that actually helps people.',
  },
  primary: { es: 'Ver experiencia', en: 'See experience' },
  secondary: { es: 'Contacto', en: 'Contact' },
  photoAlt: { es: 'Angel Siliezar', en: 'Angel Siliezar' },
}

export const welcome = {
  meta: { es: 'Bienvenido a mi portafolio', en: 'Welcome to my portfolio' },
  title: { es: 'Me llamo Sili...', en: "I'm Sili..." },
  body: {
    es: 'Soy el asistente de Angel Siliezar. Te acompañaré en el recorrido para conocer más sobre él.',
    en: "I'm Angel Siliezar's assistant. I'll walk with you through the tour so you can get to know him.",
  },
  hintTower: {
    es: 'Haz clic en la torre o el teclado del setup para cambiar las luces de la torre.',
    en: 'Click the tower or the keyboard on the setup to change the tower lights.',
  },
  hintChat: {
    es: 'Haz click sobre mi imagen abajo a la derecha para hablar conmigo por si tienes alguna pregunta.',
    en: 'Click my face at the bottom right to talk to me if you have a question.',
  },
  routeMeta: { es: 'RECORRIDO', en: 'TOUR' },
  replayTour: { es: 'Repetir tutorial', en: 'Replay tutorial' },
  writeMe: { es: 'Escribirme', en: 'Write to me' },
}

export const about = {
  title: { es: '¿Quién es Angel Siliezar?', en: 'Who is Angel Siliezar?' },
  paragraphs: [
    {
      es: 'Si tuviera que definirme en una frase, sería: "Un apasionado por la tecnología y la innovación".',
      en: 'If I had to put myself in one line: "Someone into technology and building new things."',
    },
    '',
    {
      es: 'Desde pequeño descubrí mi pasión y me siento priveligeado por poder estudiar y trabajar de lo que me gusta.',
      en: 'I found what I like when I was a kid, and I feel lucky I get to study it and work on it.',
    },
    '',
    {
      es: 'Mi trabajo es el reflejo de la frase con la que me formé dentro del colegio:',
      en: 'My work comes from the line I grew up with at school:',
    },
  ],
  meta: { es: '"El trabajo bien hecho."', en: '"Work done right."' },
  quote: {
    es: 'La única manera de hacer un gran trabajo es amar lo que haces.',
    en: 'The only way to do great work is to love what you do.',
  },
  quoteMark: { es: 'amar lo que haces', en: 'love what you do' },
  author: { es: 'Steve Jobs', en: 'Steve Jobs' },
  studyTitle: { es: 'Fundación Kinal', en: 'Fundación Kinal' },
  studyRole: { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' },
  studyParagraphs: [
    {
      es: 'No llegué a Kinal porque sonara bien en un perfil. No sabía qué estudiar y aquí encontré programación: React, Node, bases de datos, Git con gente de verdad, y la idea de que si algo se rompe, es tu problema hasta que lo arregles.',
      en: "I didn't land at Kinal because it would sound good on a profile. I didn't know what to study, and here I found programming: React, Node, databases, Git with real people, and the idea that if something breaks, it's your problem until you fix it.",
    },
    {
      es: 'Voy aprendiendo arquitectura, IA y lo que el proyecto pida. El valor que más me marcaron: el trabajo bien hecho.',
      en: "I'm learning architecture, AI, and whatever the project asks for. The value they drilled into me: work done right.",
    },
  ],
  awards: [
    {
      title: { es: 'Excelencia académica', en: 'Academic excellence' },
      date: { es: 'Fundación BI · Fundación Kinal', en: 'Fundación BI · Fundación Kinal' },
      detail: {
        es: 'Reconocimiento a la excelencia académica por segundo año consecutivo, de Fundación BI y Fundación Kinal.',
        en: 'Recognition for academic excellence, second year in a row, from Fundación BI and Fundación Kinal.',
      },
    },
    {
      title: { es: 'Abanderado', en: 'Flag bearer' },
      date: { es: 'Hasta entrar a Kinal, 2024', en: 'Until I got into Kinal, 2024' },
      detail: {
        es: 'Fui abanderado durante toda la trayectoria académica, hasta llegar a Kinal en 2024.',
        en: 'I was flag bearer my whole school run, until I got to Kinal in 2024.',
      },
    },
  ],
  purposeLead: {
    es: 'Mi propósito es desarrollar software de alto impacto dentro de la industria y en la vida de las personas.',
    en: 'My aim is to build high-impact software for the industry and for people.',
  },
  purposeTeam: {
    es: 'Me encanta trabajar en equipo y poder aportar mis conocimientos y habilidades para el desarrollo de proyectos.',
    en: 'I like working in a team and bringing what I know into real projects.',
  },
  purposeSeek: {
    es: 'En busca de aprender y crecer profesionalmente.',
    en: 'Looking to learn and grow as a professional.',
  },
  readMore: { es: '¿Quieres leer más?', en: 'Want to read more?' },
  readStory: { es: 'Leer la historia', en: 'Read the story' },
  indexTitle: { es: '¿Qué vas a encontrar?', en: "What you'll find" },
  stops: [
    { id: 'about', label: { es: '¿Quién es Angel?', en: 'Who is Angel?' }, progress: floorAnchor('about') },
    { id: 'studies', label: { es: 'Dónde me formé', en: 'Where I trained' }, progress: floorAnchor('studies') },
    { id: 'experience', label: { es: 'Qué he construido', en: "What I've built" }, progress: floorAnchor('experience') },
    { id: 'tools', label: { es: 'Con qué construyo', en: 'What I build with' }, progress: floorAnchor('tools') },
    { id: 'closing', label: { es: 'En qué ando ahora', en: "What I'm on now" }, progress: floorAnchor('closing') },
  ],
}

export const studies = {
  leftTitle: { es: 'Formación académica', en: 'Schooling' },
  leftBody: {
    es: 'Mi formación comenzó en Fe y Alegría No. 9-40: Donde desarrollé mis habilidades blandas y me formé como persona, ya que participé en diferentes programas, actividades y eventos.',
    en: 'School started for me at Fe y Alegría No. 9-40: that is where I built the soft skills and figured out who I was, because I was in programs, activities, and events.',
  },
  leftBody2: {
    es: 'Luego ingresé a Fundación Kinal, donde fortalecí mis conocimientos y pude destacar obteniendo los mejores promedios de mi promoción.',
    en: 'Then I got into Fundación Kinal, where I got sharper and stood out with the best averages in my class.',
  },
  leftNote: {
    es: 'La evidencia está en la sección Galería y reconocimientos.',
    en: 'The proof is in Gallery and awards.',
  },
  rightTitle: { es: 'Formación técnica y profesional', en: 'Technical and professional path' },
  rightBody: {
    es: 'La mayor parte la desarrollé en Fundación Kinal, allí aprendí a programar, trabajar en equipo y la mayoría de mis conocimientos técnicos.',
    en: 'Most of it happened at Fundación Kinal. That is where I learned to code, work with a team, and most of what I know technically.',
  },
  rightBody2: {
    es: 'Pero no todo se aprende en el colegio, así que durante 2026 me dediqué a asitir a Hackatons, talleres, cursos, eventos, conferencias, entre otros donde aplicar y aprender mediante una situación real y contra reloj. ',
    en: 'But you do not learn everything at school, so through 2026 I went to hackathons, workshops, courses, events, talks, and the rest, where I could apply it and learn in a real situation, against the clock.',
  },
  rightNote: {
    es: 'En 2027: Ingeniería en Sistemas en la UMG para poder estudiar y trabajar de lo que me gusta. (Además de obtener más certificaciones).',
    en: 'In 2027: Systems Engineering at UMG so I can study and work on what I like. (And pick up more certifications).',
  },
  awardsCta: { es: 'Ver reconocimientos', en: 'See awards' },
  galleryCta: { es: 'Ver la galería', en: 'See the gallery' },
}

export const experience = {
  title: { es: '¿Qué he construido?', en: 'What have I built?' },
  body: {
    es: 'En mis primeros años no pasaba de proyectos acádemicos... Pero desde 2026 he asistido a hackathones, donde quede en 3er lugar en la Buildathon de la Semana de la construcción ',
    en: 'My first years never got past school projects... Since 2026 I have been at hackathons, and I placed 3rd at the Buildathon of Semana de la construcción',
  },
  command: 'pnpm run dev',
  timeline: [
    {
      title: { es: 'Vacacionista · asesor de ventas', en: 'Seasonal hire · sales advisor' },
      date: { es: 'Desde los 15 años', en: 'Since I was 15' },
      detail: {
        es: 'Trabajé desde los 15 para armarme un setup decente. No era un rol tech, pero aprendí a hablar con gente, aguantar ritmo y no congelarme ante el cliente.',
        en: 'I worked from 15 to put together a decent setup. It was not a tech role, but I learned to talk to people, hold the pace, and not freeze in front of a customer.',
      },
    },
    {
      title: { es: 'Hackathones', en: 'Hackathons' },
      date: { es: 'UVG y UFG', en: 'UVG and UFG' },
      detail: {
        es: 'UVG con The502Project (Open2) y UFG en El Salvador: producto con poco tiempo, poco sueño y mucha presión.',
        en: 'UVG with The502Project (Open2) and UFG in El Salvador: a product, almost no time, almost no sleep, and a lot of pressure.',
      },
      links: [
        { href: '/gallery?frame=3', label: { es: 'Foto del hackathon en UVG', en: 'Photo from the UVG hackathon' } },
        { href: '/gallery?frame=4', label: { es: 'Foto en El Salvador', en: 'Photo in El Salvador' } },
      ],
    },
    {
      title: { es: 'Cursor Buildathon · El Salvador', en: 'Cursor Buildathon · El Salvador' },
      date: { es: '3 de julio', en: 'July 3' },
      detail: {
        es: 'Viajé con 15 personas de Guatemala a San Salvador para el #CursorBuildathon de Ai Labs. Primer viaje fuera del país gracias a la tecnología, siendo aún estudiante.',
        en: 'I traveled with 15 people from Guatemala to San Salvador for Ai Labs #CursorBuildathon. First trip out of the country thanks to tech, still a student.',
      },
    },
    {
      title: { es: 'Hack@Latam', en: 'Hack@Latam' },
      date: { es: '5 países en simultáneo', en: '5 countries at once' },
      detail: {
        es: 'Hackatón internacional de indies.la, con Oscar Morales (The 502 Project) como host local. Equipo con Josue Boror y Ricardo González.',
        en: 'International indie hackathon from indies.la, with Oscar Morales (The 502 Project) as the local host. Team with Josue Boror and Ricardo González.',
      },
    },
    {
      title: { es: 'Prácticas en Combex', en: 'Internship at Combex' },
      date: { es: '400 horas', en: '400 hours' },
      detail: {
        es: 'Software aplicado a la logística de carga aérea.',
        en: 'Software applied to air-cargo logistics.',
      },
    },
    {
      title: { es: 'Oyente · Startup World Cup y 502 Demo Day', en: 'Listener · Startup World Cup and 502 Demo Day' },
      date: { es: 'The 502 Project', en: 'The 502 Project' },
      detail: {
        es: 'Fui de oyente para ver startups y jueces. Quedó claro que una propuesta se sostiene con un pitch y un valor que se entiende.',
        en: 'I went to listen, to watch startups and judges. A proposal holds up when the pitch lands and the value is easy to get.',
      },
    },
    {
      title: { es: 'Comunidad The502Project', en: 'The502Project community' },
      date: { es: 'Cursor Hackathon CG · 140 personas', en: 'Cursor Hackathon CG · 140 people' },
      detail: {
        es: 'Participo en la comunidad tech de Guatemala. En la Cursor Hackathon de Ciudad de Guatemala se juntaron 140 personas y el 60% vivía su primera hackatón.',
        en: 'I am in Guatemala tech community. At the Cursor Hackathon in Guatemala City, 140 people showed up and 60% were at their first hackathon.',
      },
    },
  ],
  prompt: 'angel@kinal:~$',
  unknown: { es: 'Ese comando no existe. Escribe help.', en: 'That command does not exist. Type help.' },
  help: {
    es: 'Comandos: trayectoria, proyectos, hackathones, contacto, clear.',
    en: 'Commands: trayectoria, proyectos, hackathones, contacto, clear.',
  },
  replies: {
    trayectoria: {
      es: 'De Kinal al entregable: UVG, Expokinal, Buildathon, Combex y Hack@Latam. El arco está en Historia; el detalle filtrable, en Experiencia.',
      en: 'From Kinal to the deliverable: UVG, Expokinal, Buildathon, Combex, and Hack@Latam. The arc is in Story; the filterable detail is in Experience.',
    },
    proyectos: {
      es: 'AI Sentinel, EcoBuild y Gestión de Restaurantes son los tres proyectos destacados. El archivo completo está en Proyectos.',
      en: 'AI Sentinel, EcoBuild, and Restaurant Management are the three featured projects. The full archive is in Projects.',
    },
    hackathones: {
      es: 'UVG, UFG, Cursor Buildathon en El Salvador y Hack@Latam. Prototipado rápido y trabajo en equipo con poco tiempo.',
      en: 'UVG, UFG, Cursor Buildathon in El Salvador, and Hack@Latam. Fast prototypes and teamwork with little time.',
    },
    contacto: {
      es: 'Último año en Kinal, Perito en Desarrollo de Software. Busco el primer rol formal. Baja al piso de contacto.',
      en: 'Last year at Kinal, Perito en Desarrollo de Software. Looking for the first formal role. Go down to the contact floor.',
    },
  },
  historyCta: { es: 'Arco en Historia', en: 'Arc in Story' },
  experienceCta: { es: 'Registro completo', en: 'Full record' },
  termLabel: { es: 'bash · interactivo', en: 'bash · interactive' },
}

export const tools = {
  title: { es: 'Herramientas en acción', en: 'Tools in action' },
  body: {
    es: 'Dónde aprendí cada pieza y en qué proyecto la usé de verdad.',
    en: 'Where I learned each piece, and which project I actually used it on.',
  },
  files: [
    {
      id: 'vision.py',
      label: { es: 'Visión', en: 'Vision' },
      level: { es: 'En proyectos', en: 'In projects' },
      summary: {
        es: 'OpenCV, YOLO y Python para leer el mundo físico en tiempo real.',
        en: 'OpenCV, YOLO, and Python to read the physical world in real time.',
      },
      code: [
        'from sentinel.vision import YoloService',
        '',
        'detector = YoloService(weights="sentinel.pt")',
        'frame = camera.read()',
        'boxes = detector.find(frame)',
        'for box in boxes:',
        '    ar.draw(box)',
        '    track.push(box.center)',
      ],
    },
    {
      id: 'graphics.js',
      label: { es: 'Gráficos 3D', en: '3D graphics' },
      level: { es: 'En proyectos', en: 'In projects' },
      summary: {
        es: 'Three.js en este portafolio y JMonkeyEngine en el render de AR Java.',
        en: 'Three.js in this portfolio and JMonkeyEngine in the Java AR render.',
      },
      code: [
        'import { createJourneyRig } from "./rig"',
        '',
        'const rig = createJourneyRig()',
        'camera.position.copy(rig.pos)',
        'camera.lookAt(rig.target)',
        'platform.position.y = rig.lift',
        'controls.update(delta)',
      ],
    },
    {
      id: 'server.js',
      label: { es: 'Full stack', en: 'Full stack' },
      level: { es: 'Uso diario', en: 'Daily use' },
      summary: {
        es: 'React, Node, Express y bases relacionales y no relacionales. Incluye un SaaS de restaurantes.',
        en: 'React, Node, Express, and relational and non-relational databases. Includes a restaurant SaaS.',
      },
      code: [
        'import express from "express"',
        'import { ordersRouter } from "./orders"',
        '',
        'const app = express()',
        'app.use(express.json())',
        'app.use("/api/orders", ordersRouter)',
        'app.listen(port, () => {',
        '  console.log(`ready :${port}`)',
        '})',
      ],
    },
    {
      id: 'certs.md',
      label: { es: 'Certificaciones', en: 'Certifications' },
      level: { es: 'Vigentes', en: 'Current' },
      summary: {
        es: 'El archivo con los diplomas está en el piso de estudios. Aquí solo el índice: Cisco CCNA e ITN, STEM, Fundación BI, Tech Day, AI Dev y Python.',
        en: 'The diploma file is on the studies floor. This is just the index: Cisco CCNA and ITN, STEM, Fundación BI, Tech Day, AI Dev, and Python.',
      },
      code: [
        'Cisco CCNA',
        'Cisco ITN',
        'STEM',
        'Fundación BI',
        'Tech Day',
        'AI Dev',
        'Masterclass Python',
      ],
    },
  ],
  skillsCta: { es: 'Abrir herramientas', en: 'Open tools' },
}

export const closing = {
  line1: { es: 'Si lo puedes imaginar,', en: 'If you can imagine it,' },
  line2: { es: 'lo puedes programar', en: 'you can program it' },
  thanks: {
    es: 'Gracias por el tiempo de bajar hasta aquí.',
    en: 'Thanks for taking the time to come all the way down.',
  },
  status: {
    es: 'Último año en Kinal, Perito en Desarrollo de Software. Busco mi primer rol formal, Full Stack.',
    en: 'Last year at Kinal, Perito en Desarrollo de Software. Looking for my first formal role, Full Stack.',
  },
  place: { es: 'Ciudad de Guatemala', en: 'Guatemala City' },
  hobbies: {
    es: 'Si encuentras los 5 hobbies, se abre una sección secreta.',
    en: 'If you find the 5 hobbies, a secret section opens.',
  },
  locked: {
    es: 'La compuerta del suelo sigue cerrada. El piso -1 está bloqueado.',
    en: 'The floor hatch is still shut. Floor -1 is locked.',
  },
  unlocked: {
    es: 'La base se abre. El avatar entra por el tubo, como si el suelo fuera un conducto.',
    en: 'The base opens. The avatar goes in through the tube, like the floor is a duct.',
  },
  credit: {
    es: 'Escritorio 3D: Gaming Setup v2, LagzDesign.',
    en: '3D desk: Gaming Setup v2, LagzDesign.',
  },
  creditModel: 'https://sketchfab.com/3d-models/gaming-setup-v2-low-poly-c4aafe2ed67841b9b52e80e8e469dbb8',
  creditLicense: 'https://creativecommons.org/licenses/by/4.0/',
  contactCta: { es: 'Contacto', en: 'Contact' },
  projectsCta: { es: 'Proyectos', en: 'Projects' },
}

export const secret = {
  title: { es: 'Recompensas', en: 'Rewards' },
  kicker: { es: 'Sala secreta', en: 'Secret room' },
  message: {
    es: 'Si llegaste hasta aquí, o te aburriste mucho, o nos vamos a llevar bien. Esto no va en el CV.',
    en: 'If you made it here, either you were really bored, or we are going to get along. This does not go on the CV.',
  },
  playlist: {
    es: 'Loops para codear, beats de cancha y soundtrack de bosses. Prioridades.',
    en: 'Loops for coding, court beats, and boss soundtracks. Priorities.',
  },
  setup: {
    es: 'Empezó desarmando una PC a los 12. Hoy tiene pantallas de verdad y la misma manía de abrir las cosas para ver qué hay adentro.',
    en: 'He started by taking a PC apart at 12. Today he has real screens and the same habit of opening things to see what is inside.',
  },
  fact: {
    es: 'Cumplo años el mismo día que Kobe Bryant. Su mentalidad me pegó duro, en la cancha y en el código. Quería representar a Guatemala. La beca en Leones se cortó por temas personales, pero la cancha de colonia sigue. Años después apareció un tema con los riñones: hay que cuidar el ritmo.',
    en: 'My birthday is the same day as Kobe Bryant. His mentality hit me hard, on the court and in the code. I wanted to represent Guatemala. The scholarship at Leones got cut for personal reasons, but the neighborhood court is still there. Years later a kidney issue showed up: you have to watch the pace.',
  },
  closing: {
    es: 'Si leíste hasta acá: curiosidad y disciplina. O aburrimiento. Prefiero pensar que lo primero.',
    en: 'If you read this far: curiosity and discipline. Or boredom. I would rather think it is the first one.',
  },
  reward: {
    es: 'Recompensas próximamente. Por ahora, escríbeme por WhatsApp si quieres coordinar algo.',
    en: 'Rewards coming soon. For now, write me on WhatsApp if you want to set something up.',
  },
}

export const passages = [
  {
    id: 'experience',
    variant: 'editorial',
    lines: [
      { es: '¿Donde he aprendido todo lo que hago?', en: 'Where did I learn everything I do?' },
      { es: 'Haciendo...', en: 'By doing it...' },
      { es: 'Aprendiendo...', en: 'By learning...' },
    ],
  },
  {
    id: 'closing',
    variant: 'led',
    lines: [
      { es: 'Si lo puedes imaginar, lo puedes programar.', en: 'If you can imagine it, you can program it.' },
      { es: 'Último año en Kinal. Busco el primer rol.', en: 'Last year at Kinal. Looking for the first role.' },
    ],
  },
  {
    id: 'secret',
    variant: 'comic',
    lines: [
      { es: 'La compuerta cede bajo la plataforma.', en: 'The hatch gives under the platform.' },
      { es: 'Bajas directo a la cancha secreta.', en: 'You drop straight onto the secret court.' },
    ],
  },
]

export const nav = [
  { id: 'welcome', label: { es: 'Inicio', en: 'Home' }, progress: floorAnchor('welcome') },
  { id: 'about', label: { es: 'Historia', en: 'Story' }, progress: floorAnchor('about') },
  { id: 'studies', label: { es: 'Estudios', en: 'Studies' }, progress: floorAnchor('studies') },
  { id: 'experience', label: { es: 'Proyectos', en: 'Projects' }, progress: floorAnchor('experience') },
  { id: 'tools', label: { es: 'Herramientas', en: 'Tools' }, progress: floorAnchor('tools') },
  { id: 'closing', label: { es: 'Contacto', en: 'Contact' }, progress: floorAnchor('closing') },
]

export const indicator = [
  { id: 'welcome', number: '5', progress: floorAnchor('welcome') },
  { id: 'about', number: '4', progress: floorAnchor('about') },
  { id: 'studies', number: '3', progress: floorAnchor('studies') },
  { id: 'experience', number: '2', progress: floorAnchor('experience') },
  { id: 'tools', number: '1', progress: floorAnchor('tools') },
  { id: 'closing', number: '0', progress: floorAnchor('closing') },
  { id: 'secret', number: '-1', progress: floorAnchor('secret'), locked: true },
]
