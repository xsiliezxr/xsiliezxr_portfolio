import { floorAnchor } from '../lib/journeyRig.js'

export const hero = {
  first: 'Angel',
  last: 'Siliezar',
  role: { es: 'Desarrollador Full Stack || Desarrollador de IA', en: 'Full Stack Developer || AI Developer' },
  stack: {
    es: 'Constuyo soluciones y agilización de procesos mediante software e Inteligencia Artificial que sean escalables y mantenibles.',
    en: 'I build solutions through software and Artificial Intelligence that are scalable and maintainable.',
  },
  purpose: {
    es: 'Me gusta entender el problema, construir una solución y dejarla funcionando.',
    en: 'I like understanding the problem, building a solution, and leaving it working.',
  },
  primary: { es: 'Ver experiencia', en: 'See experience' },
  secondary: { es: 'Contacto', en: 'Contact' },
  photoAlt: { es: 'Angel Siliezar', en: 'Angel Siliezar' },
}

export const welcome = {
  meta: { es: 'Bienvenido a mi portafolio', en: 'Welcome to my portfolio' },
  title: { es: 'Me llamo Sili...', en: "I'm Sili..." },
  body: {
    es: 'Soy el asistente de Angel. Te voy a mostrar quién es, qué ha construido y cómo trabaja.',
    en: "I'm Angel's assistant. I will show you who he is, what he has built, and how he works.",
  },
  hintTower: {
    es: 'Puedes interactuar con la torre y el teclado del setup.',
    en: 'You can interact with the tower and the setup keyboard.',
  },
  hintChat: {
    es: 'Si tienes una pregunta, abre a Sili desde la esquina inferior derecha.',
    en: 'If you have a question, open Sili from the bottom-right corner.',
  },
  routeMeta: { es: 'RECORRIDO', en: 'TOUR' },
  replayTour: { es: 'Repetir tutorial', en: 'Replay tutorial' },
  writeMe: { es: 'Escribirme', en: 'Write to me' },
}

export const about = {
  title: { es: '¿Quién es Angel Siliezar?', en: "Who is Angel Siliezar?" },
  paragraphs: [
    {
      es: 'Te cuento cómo empezó: no había un mapa, solo curiosidad y una computadora que Angel quería entender.',
      en: "I'll tell you how it started: there was no map, only curiosity and a computer Angel wanted to understand.",
    },
    '',
    {
      es: 'Con el tiempo esa curiosidad se volvió su forma de trabajar: preguntar, probar y arreglar lo que se rompe.',
      en: 'Over time, that curiosity became his way of working: ask, test, and fix what breaks.',
    },
    '',
    {
      es: 'La frase que se quedó con Angel desde su formación es sencilla:',
      en: 'The line Angel kept from school is simple:',
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
      es: 'Te cuento cómo llegó a Kinal: no fue por tener un perfil bonito. No sabía qué estudiar y aquí encontró programación: React, Node, bases de datos y Git trabajando con otras personas.',
      en: "Here's how Angel got to Kinal: it was not for a better-looking profile. He did not know what to study, and here he found programming: React, Node, databases, and Git while working with other people.",
    },
    {
      es: 'Desde ahí ha aprendido arquitectura, IA y lo que cada proyecto exige. Si algo se rompe, lo entiende y lo deja de pie.',
      en: 'Since then he has learned architecture, AI, and whatever each project requires. If something breaks, he understands it and leaves it standing.',
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
    es: '"Busco construir software útil dentro de la industria y en la vida de las personas".',
    en: 'I want to build useful software for industry and for people.',
  },
  purposeTeam: {
    es: 'Una frase que el repite mucho... Además trabaja bien con equipos, tiene responsabilidad y ganas de esforzarse.',
    en: 'I work well with teams that share context, ownership, and the drive to deliver.',
  },
  purposeSeek: {
    es: 'Esta en busca de sus primeras experiencias formales para seguir creciendo con trabajo real y saltar a nuevos retos.',
    en: 'I am looking for my first formal role and more real work to grow through.',
  },
  readMore: { es: '¿Quieres leer más?', en: 'Want to read more?' },
  readStory: { es: 'Leer la historia', en: 'Read the story' },
  indexTitle: { es: '¿Qué vas a encontrar?', en: "What you'll find" },
  stops: [
    { id: 'about', label: { es: '¿Quién es Angel?', en: 'Who is Angel?' }, progress: floorAnchor('about') },
    { id: 'studies', label: { es: '¿Donde se formó?', en: 'Where was he trained?' }, progress: floorAnchor('studies') },
    { id: 'experience', label: { es: 'Qué ha construido', en: "What he's built" }, progress: floorAnchor('experience') },
    { id: 'tools', label: { es: 'Con qué construye', en: 'What I build with' }, progress: floorAnchor('tools') },
    { id: 'closing', label: { es: 'En qué anda ahora', en: "What he's up to now" }, progress: floorAnchor('closing') },
  ],
}

export const studies = {
  leftTitle: { es: 'Formación académica', en: 'Schooling' },
  leftBody: {
    es: 'Te cuento dónde empezó su formación: en Fe y Alegría No. 9-40 aprendió a trabajar con personas, participar y hacerse responsable de lo que empezaba.',
    en: 'I will show you where his training began: at Fe y Alegría No. 9-40 he learned to work with people, participate, and take responsibility for what he started.',
  },
  leftBody2: {
    es: 'Después llegó a Fundación Kinal, donde esas habilidades encontraron un oficio: desarrollo de software.',
    en: 'Then he joined Fundación Kinal, where those skills found a craft: software development.',
  },
  leftNote: {
    es: 'Si quieres ver la evidencia, te llevo a Galería y Reconocimientos.',
    en: 'If you want the evidence, I will take you to Gallery and Awards.',
  },
  rightTitle: { es: 'Formación técnica y profesional', en: 'Technical and professional path' },
  rightBody: {
    es: 'Aquí te muestro lo que aprendió en Kinal: programar, trabajar con Git y separar un problema grande en entregas que sí se pueden probar.',
    en: 'Here I will show you what he learned at Kinal: coding, Git, and breaking a large problem into deliveries that can actually be tested.',
  },
  rightBody2: {
    es: 'En 2026 salió del salón: hackatones, pitches, eventos y prácticas donde tuvo que entregar con el reloj encima.',
    en: 'In 2026 he moved beyond the classroom: hackathons, pitches, events, and an internship where delivery happened against the clock.',
  },
  rightNote: {
    es: 'En 2027 continuará con Ingeniería en Sistemas en la UMG. Te seguiré contando cómo estudia y trabaja en lo que ya está construyendo.',
    en: 'In 2027 he will continue with Systems Engineering at UMG. I will keep showing you how he studies and works on what he is already building.',
  },
  awardsCta: { es: 'Ver reconocimientos', en: 'See awards' },
  galleryCta: { es: 'Ver la galería', en: 'See the gallery' },
}

export const experience = {
  title: { es: '¿Qué ha construido?', en: "What has he built?" },
  body: {
    es: 'Fijate que aprendió a entregar: soluciones problemas concretos y poco tiempo para decidir qué sí entra.',
    en: "Notice that he learned to deliver: solutions to concrete problems and little time to decide what actually makes it in.",
  },
  command: 'pnpm run dev',
  timeline: [
    {
      title: { es: 'Vacacionista · asesor de ventas', en: 'Seasonal hire · sales advisor' },
      date: { es: 'Desde los 15 años', en: 'Since I was 15' },
      detail: {
        es: 'Te cuento cómo empezó: trabajó desde los 15 para armarse un setup decente. No era un rol tech, pero aprendió a hablar con gente, aguantar ritmo y no congelarse ante el cliente.',
        en: "I'll tell you how it started: he worked from 15 to build a decent setup. It was not a tech role, but he learned to talk to people, hold the pace, and not freeze in front of a customer.",
      },
    },
    {
      title: { es: 'Hackathones', en: 'Hackathons' },
      date: { es: 'UVG y UFG', en: 'UVG and UFG' },
      detail: {
        es: 'Aquí te muestro UVG con The502Project (Open2) y UFG en El Salvador: producto con poco tiempo, poco sueño y mucha presión.',
        en: 'Here I will show you UVG with The502Project (Open2) and UFG in El Salvador: a product, almost no time, almost no sleep, and a lot of pressure.',
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
        es: 'Te cuento de su primer viaje fuera del país: viajó con 15 personas de Guatemala a San Salvador para el #CursorBuildathon de Ai Labs, todavía como estudiante.',
        en: 'I will tell you about his first trip abroad: he traveled with 15 people from Guatemala to San Salvador for Ai Labs #CursorBuildathon, still as a student.',
      },
    },
    {
      title: { es: 'Hack@Latam', en: 'Hack@Latam' },
      date: { es: '5 países en simultáneo', en: '5 countries at once' },
      detail: {
        es: 'También participó en el hackatón internacional de indies.la, con Oscar Morales (The 502 Project) como host local y un equipo junto a Josue Boror y Ricardo González.',
        en: 'He also joined indies.la international hackathon, with Oscar Morales (The 502 Project) as the local host and a team with Josue Boror and Ricardo González.',
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
  title: { es: 'Te muestro las herramientas en acción', en: "I'll show you the tools in action" },
  body: {
    es: 'No es una lista de nombres. Te muestro las herramientas que Angel ya usó para construir, probar y desplegar.',
    en: "This is not a list of names. I'll show you the tools Angel has already used to build, test, and deploy.",
  },
  files: [
    {
      id: 'vision.py',
      label: { es: 'Visión', en: 'Vision' },
      level: { es: 'En proyectos', en: 'In projects' },
      summary: {
        es: 'Aquí ves OpenCV, YOLO y Python trabajando para leer el mundo físico en tiempo real.',
        en: 'Here you can see OpenCV, YOLO, and Python reading the physical world in real time.',
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
        es: 'Te muestro Three.js en este portafolio y JMonkeyEngine en el render de AR Java.',
        en: 'I will show you Three.js in this portfolio and JMonkeyEngine in the Java AR render.',
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
        es: 'Aquí ves React, Node, Express y bases relacionales y no relacionales, incluido un SaaS de restaurantes.',
        en: 'Here you can see React, Node, Express, and relational and non-relational databases, including a restaurant SaaS.',
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
        es: 'Te dejo el índice; el archivo está en el piso de estudios: Cisco CCNA e ITN, STEM, Fundación BI, Tech Day, AI Dev y Python.',
        en: 'I will leave you the index; the archive is on the studies floor: Cisco CCNA and ITN, STEM, Fundación BI, Tech Day, AI Dev, and Python.',
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
  line1: { es: 'En resumen es...', en: 'In summary, he is...' },
  line2: { es: 'Un apasionado por construir', en: 'A passionate builder' },
  thanks: {
    es: 'Gracias por bajar hasta aquí. Yo te seguiré guiando si quieres conocer más.',
    en: 'Thanks for coming all the way down. I will keep guiding you if you want to know more.',
  },
  status: {
    es: 'Angel está abierto a oportunidades de trabajo en Guatemala, remoto o por proyectos freelance.',
    en: 'Angel is open to work opportunities in Guatemala, remotely, or through freelance projects.',
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
    es: 'Consigue los 5 hobbies y la compuerta se abre. Y baja a la sala secreta.',
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
      { es: '¿Dónde aprendió a construir?', en: 'Where did he learn to build?' },
      { es: 'Cuando tocó entregar.', en: 'When it was time to deliver.' },
      { es: 'Cuando algo se rompió y tocó arreglarlo.', en: 'When something broke and it was time to fix it.' },
    ],
  },
  {
    id: 'closing',
    variant: 'led',
    lines: [
      { es: 'Si lo puedes imaginar, lo puedes programar.', en: 'If you can imagine it, you can program it.' },
      { es: 'Último año en Kinal. Listo para el primer rol.', en: 'Last year at Kinal. Ready for the first role.' },
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
