import { floorAnchor } from '../lib/journeyRig.js'

export const hero = {
  first: 'Angel',
  last: 'Siliezar',
  role: 'Desarrollador Full Stack',
  stack: 'Armo aplicaciones web y microservicios de punta a punta.',
  purpose: 'Me engancha pasar de un problema real a software limpio, claro y que aguante.',
  primary: 'Ver experiencia',
  secondary: 'Contacto',
  photoAlt: 'Angel Siliezar',
}

export const about = {
  title: 'Mi historia',
  paragraphs: [
    'Soy Angel David Siliezar López, estudiante Full Stack en Fundación Kinal, Ciudad de Guatemala. Nací el 23 de agosto de 2007. Desde chiquito me volvían loco las computadoras… aunque mi laptop no pudiera correr casi nada, así que me la pasaba viendo a otros jugar en YouTube.',
    'A los 12 agarré una PC vieja que andaba por ahí, la desarmé solo por curiosidad, limpié todo y la dejé funcionando. Ese día confirmé lo obvio: me gustaba ver qué había adentro y hacerlo andar otra vez.',
    'El basket llegó un día en el parque, en un 21. De ahí para adelante: colonia, campeonatos locales, beca en Club Leones. Quería representar a Guatemala. No terminó como en la película, pero la cancha sigue siendo mi terapia barata y efectiva.',
    'Cuando terminé básicos no tenía idea de qué carrera agarrar ni dónde. Di con Kinal, entré, y me topé con lo que me enganchó de verdad: programar. Ahora armo cosas full stack y trato de que el trabajo bien hecho no sea solo frase de la pared.',
  ],
  meta: '18 años, Kinal, Guatemala',
  quote: 'La única manera de hacer un gran trabajo es amar lo que haces.',
  quoteMark: 'amar lo que haces',
  author: 'Steve Jobs',
  studyTitle: 'Fundación Kinal',
  studyRole: 'Desarrollador Full Stack',
  studyParagraphs: [
    'No llegué a Kinal porque sonara bien en un perfil. No sabía qué estudiar y aquí encontré programación: React, Node, bases de datos, Git con gente de verdad, y la idea de que si algo se rompe, es tu problema hasta que lo arregles.',
    'Voy aprendiendo arquitectura, IA y lo que el proyecto pida. El valor que más me marcaron: el trabajo bien hecho.',
  ],
  awards: [
    {
      title: 'Excelencia académica',
      date: 'Fundación BI · Fundación Kinal',
      detail: 'Reconocimiento a la excelencia académica por segundo año consecutivo, de Fundación BI y Fundación Kinal.',
    },
    {
      title: 'Abanderado',
      date: 'Hasta entrar a Kinal, 2024',
      detail: 'Fui abanderado durante toda la trayectoria académica, hasta llegar a Kinal en 2024.',
    },
  ],
  indexTitle: 'Qué vas a encontrar',
  stops: [
    { id: 'studies', label: 'Dónde me formé', progress: floorAnchor('studies') },
    { id: 'experience', label: 'Qué he construido', progress: floorAnchor('experience') },
    { id: 'tools', label: 'Con qué construyo', progress: floorAnchor('tools') },
    { id: 'closing', label: 'En qué ando ahora', progress: floorAnchor('closing') },
  ],
}

export const studies = {
  leftTitle: 'Bases y disciplina',
  leftBody: 'Mi formación comenzó en Fe y Alegría: esfuerzo, resiliencia y compañerismo. Ahí nació la curiosidad por abrir máquinas.',
  leftNote: 'Los diplomas completos viven en reconocimientos. Las fotos de esa etapa, en la galería.',
  rightTitle: 'Especialización y futuro',
  rightBody: 'Hoy soy técnico en Kinal, perfil Full Stack: React, Node.js y bases de datos relacionales y no relacionales.',
  rightNote: 'A futuro: Ingeniería en Sistemas o Ciencias de la Computación, y más certificaciones de industria.',
}

export const experience = {
  title: 'Trayectoria',
  body: 'Del aula al entregable: hackathones, prácticas y sistemas en equipo. El arco está en Historia; el detalle, en Experiencia.',
  command: 'pnpm run dev',
  timeline: [
    {
      title: 'Vacacionista · asesor de ventas',
      date: 'Desde los 15 años',
      detail: 'Trabajé desde los 15 para armarme un setup decente. No era un rol tech, pero aprendí a hablar con gente, aguantar ritmo y no congelarme ante el cliente.',
    },
    {
      title: 'Hackathones',
      date: 'UVG y UFG',
      detail: 'UVG con The502Project (Open2) y UFG en El Salvador: producto con poco tiempo, poco sueño y mucha presión.',
      links: [
        { href: '/gallery?frame=3', label: 'Foto del hackathon en UVG' },
        { href: '/gallery?frame=4', label: 'Foto en El Salvador' },
      ],
    },
    {
      title: 'Cursor Buildathon · El Salvador',
      date: '3 de julio',
      detail: 'Viajé con 15 personas de Guatemala a San Salvador para el #CursorBuildathon de Ai Labs. Primer viaje fuera del país gracias a la tecnología, siendo aún estudiante.',
    },
    {
      title: 'Hack@Latam',
      date: '5 países en simultáneo',
      detail: 'Hackatón internacional de indies.la, con Oscar Morales (The 502 Project) como host local. Equipo con Josue Boror y Ricardo González.',
    },
    {
      title: 'Prácticas en Combex',
      date: '400 horas',
      detail: 'Software aplicado a la logística de carga aérea.',
    },
    {
      title: 'Oyente · Startup World Cup y 502 Demo Day',
      date: 'The 502 Project',
      detail: 'Fui de oyente para ver startups y jueces. Quedó claro que una propuesta se sostiene con un pitch y un valor que se entiende.',
    },
    {
      title: 'Comunidad The502Project',
      date: 'Cursor Hackathon CG · 140 personas',
      detail: 'Participo en la comunidad tech de Guatemala. En la Cursor Hackathon de Ciudad de Guatemala se juntaron 140 personas y el 60% vivía su primera hackatón.',
    },
  ],
  prompt: 'angel@kinal:~$',
  unknown: 'Ese comando no existe. Escribe help.',
  help: 'Comandos: trayectoria, proyectos, hackathones, contacto, clear.',
  replies: {
    trayectoria: 'De Kinal al entregable: UVG, Expokinal, Buildathon, Combex y Hack@Latam. El arco está en Historia; el detalle filtrable, en Experiencia.',
    proyectos: 'AI Sentinel, Gestión Restaurantes y Sistema Bancario son los tres sistemas de equipo. El archivo completo está en Proyectos.',
    hackathones: 'UVG, UFG, Cursor Buildathon en El Salvador y Hack@Latam. Prototipado rápido y trabajo en equipo con poco tiempo.',
    contacto: 'Último año en Kinal, Perito en Desarrollo de Software. Busco el primer rol formal. Baja al piso de contacto.',
  },
}

export const tools = {
  title: 'Herramientas en acción',
  body: 'Dónde aprendí cada pieza y en qué proyecto la usé de verdad.',
  files: [
    {
      id: 'vision.py',
      label: 'Visión',
      level: 'En proyectos',
      summary: 'OpenCV, YOLO y Python para leer el mundo físico en tiempo real.',
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
      label: 'Gráficos 3D',
      level: 'En proyectos',
      summary: 'Three.js en este portafolio y JMonkeyEngine en el render de AR Java.',
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
      label: 'Full stack',
      level: 'Uso diario',
      summary: 'React, Node, Express y bases relacionales y no relacionales. Incluye un SaaS de restaurantes.',
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
      label: 'Certificaciones',
      level: 'Vigentes',
      summary: 'El archivo con los diplomas está en el piso de estudios. Aquí solo el índice: Cisco CCNA e ITN, STEM, Fundación BI, Tech Day, AI Dev y Python.',
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
}

export const closing = {
  line1: 'Si lo puedes imaginar,',
  line2: 'lo puedes programar',
  thanks: 'Gracias por el tiempo de bajar hasta aquí.',
  status: 'Último año en Kinal, Perito en Desarrollo de Software. Busco mi primer rol formal, Full Stack.',
  place: 'Ciudad de Guatemala',
  hobbies: 'Si encuentras los 5 hobbies, se abre una sección secreta.',
  locked: 'La compuerta del suelo sigue cerrada. El piso -1 está bloqueado.',
  unlocked: 'La base se abre. El avatar entra por el tubo, como si el suelo fuera un conducto.',
  credit: 'Escritorio 3D: Gaming Setup v2, LagzDesign.',
  creditModel: 'https://sketchfab.com/3d-models/gaming-setup-v2-low-poly-c4aafe2ed67841b9b52e80e8e469dbb8',
  creditLicense: 'https://creativecommons.org/licenses/by/4.0/',
}

export const secret = {
  title: 'Recompensas',
  kicker: 'Sala secreta',
  message: 'Si llegaste hasta aquí, o te aburriste mucho, o nos vamos a llevar bien. Esto no va en el CV.',
  playlist: 'Loops para codear, beats de cancha y soundtrack de bosses. Prioridades.',
  setup: 'Empezó desarmando una PC a los 12. Hoy tiene pantallas de verdad y la misma manía de abrir las cosas para ver qué hay adentro.',
  fact: 'Cumplo años el mismo día que Kobe Bryant. Su mentalidad me pegó duro, en la cancha y en el código. Quería representar a Guatemala. La beca en Leones se cortó por temas personales, pero la cancha de colonia sigue. Años después apareció un tema con los riñones: hay que cuidar el ritmo.',
  closing: 'Si leíste hasta acá: curiosidad y disciplina. O aburrimiento. Prefiero pensar que lo primero.',
  reward: 'Recompensas próximamente. Por ahora, escríbeme por WhatsApp si quieres coordinar algo.',
}

export const passages = [
  {
    id: 'experience',
    variant: 'editorial',
    lines: [
      'Hechos públicos: trabajo y hackathones.',
      'Los sistemas los armé en equipo.',
    ],
  },
  {
    id: 'closing',
    variant: 'led',
    lines: [
      'Si lo puedes imaginar, lo puedes programar.',
      'Último año en Kinal. Busco el primer rol.',
    ],
  },
  {
    id: 'secret',
    variant: 'comic',
    lines: [
      'La compuerta cede bajo la plataforma.',
      'Bajas directo a la cancha secreta.',
    ],
  },
]

export const nav = [
  { id: 'welcome', label: 'Inicio', progress: floorAnchor('welcome') },
  { id: 'about', label: 'Historia', progress: floorAnchor('about') },
  { id: 'studies', label: 'Estudios', progress: floorAnchor('studies') },
  { id: 'experience', label: 'Proyectos', progress: floorAnchor('experience') },
  { id: 'tools', label: 'Herramientas', progress: floorAnchor('tools') },
  { id: 'closing', label: 'Contacto', progress: floorAnchor('closing') },
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
