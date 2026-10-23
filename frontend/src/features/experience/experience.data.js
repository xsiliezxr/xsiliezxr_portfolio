// Orden por defecto: prioridad ASC (1 = más importante).
// hito: true + hitoOrden → aparece en Historia (arco estudios → desarrollador).
export const EXPERIENCE_FILTERS = [
  { id: 'all', label: { es: 'Todo', en: 'All' } },
  { id: 'trabajo', label: { es: 'Trabajo', en: 'Work' } },
  { id: 'hackaton', label: { es: 'Hackatones', en: 'Hackathons' } },
]

const RAW_EXPERIENCE_ENTRIES = [
  {
    id: 'combex',
    prioridad: 1,
    hito: true,
    hitoOrden: 4,
    filtro: 'trabajo',
    rol: { es: 'Prácticas en Combex', en: 'Internship at Combex' },
    fecha: { es: '400 horas', en: '400 hours' },
    lugar: { es: 'Combex', en: 'Combex' },
    resumen: {
      es: 'Software aplicado a la logística de carga aérea. Más de 400 horas en IT y entre los seis mejores practicantes.',
      en: 'Completed more than 400 hours in the IT department, building software for air-cargo logistics. Recognized among the top six interns.',
    },
    arco: {
      es: 'Primera vez con software que mueve operación real, no solo demos de clase.',
      en: 'First engagement with software that supports a live operation rather than a classroom demo.',
    },
    hice: {
      es: 'En el departamento de IT de CombexIM trabajé software para la logística de carga aérea. Cerré más de 400 horas y quedé entre los seis mejores practicantes.',
      en: 'In the CombexIM IT department I worked on software for air-cargo logistics. I completed more than 400 hours and was recognized among the top six interns.',
    },
    aprendido: {
      es: 'Un sistema de operación no perdona el demo. Si se cae, se cae el trabajo de alguien más, no una nota de clase.',
      en: 'Operational software does not tolerate demo-grade work. A failure affects another person’s job, not a classroom grade.',
    },
    resolvi: {
      es: 'Cuando el ritmo apretaba, preguntaba pronto, dejaba el cambio pequeño y lo probaba antes de seguir. El desayuno con el Director Ejecutivo me dejó claro que la constancia se nota.',
      en: 'When the pace tightened, I asked early, kept each change small, and verified it before continuing. Breakfast with the Executive Director made it clear that consistency is visible.',
    },
  },
  {
    id: 'qtalk-hackathon',
    prioridad: 2,
    hito: true,
    hitoOrden: 3,
    filtro: 'hackaton',
    rol: { es: 'Cursor · Hackathon TEC · Open2 · Q-Talk', en: 'Cursor · TEC Hackathon · Open2 · Q-Talk' },
    fecha: { es: '4.º lugar', en: '4th place' },
    lugar: { es: 'Fundación Kinal', en: 'Fundación Kinal' },
    resumen: {
      es: 'Con Q-Talk quedamos en cuarto lugar. Construimos un tutor de inglés por voz con IA y lo presentamos con un tiempo limitado.',
      en: 'Q-Talk placed fourth. We built an AI voice tutor for English practice and presented it under a tight deadline.',
    },
    arco: {
      es: 'El primer pitch donde la voz, la interfaz y la idea tenían que funcionar juntas.',
      en: 'The first pitch where voice, interface, and idea had to work together.',
    },
    hice: {
      es: 'Diseñé el frontend, la experiencia de llamada y la integración con Gemini Live para capturar y reproducir audio en el navegador.',
      en: 'I designed the frontend, call experience, and Gemini Live integration for capturing and playing audio in the browser.',
    },
    aprendido: {
      es: 'Una demo de voz se siente frágil si el estado no está claro. La interfaz tiene que explicar qué está escuchando y qué está respondiendo.',
      en: 'A voice demo feels fragile when state is unclear. The interface has to explain what it is hearing and what it is answering.',
    },
    resolvi: {
      es: 'Separé el estado de la llamada, la captura de audio y la reproducción para que el equipo pudiera mostrar el flujo completo.',
      en: 'I separated call state, audio capture, and playback so the team could show the complete flow.',
    },
  },
  {
    id: 'radas-hackathon',
    prioridad: 3,
    hito: false,
    hitoOrden: 0,
    filtro: 'hackaton',
    rol: { es: 'Hackathon RADAS', en: 'RADAS Hackathon' },
    fecha: { es: 'Equipo nuevo · tiempo limitado', en: 'New team · limited time' },
    lugar: { es: 'Hackatón', en: 'Hackathon' },
    resumen: {
      es: 'Me integré a un equipo formado por personas que no conocía. Trabajamos, aprendimos y nos divertimos; por tiempo tuve que retirarme del desarrollo principal y terminé apoyando con la landing.',
      en: 'I joined a team made up of people I did not know. We worked, learned, and had fun; because of time, I stepped away from the main build and finished by supporting the landing page.',
    },
    arco: {
      es: 'Aprender a integrarme rápido y seguir aportando aunque mi rol cambie.',
      en: 'Learning to integrate quickly and keep contributing when my role changes.',
    },
    hice: {
      es: 'Me incorporé al equipo, entendí el producto y desarrollé la landing para que el trabajo pudiera presentarse de forma clara.',
      en: 'I joined the team, understood the product, and built the landing page so the work could be presented clearly.',
    },
    aprendido: {
      es: 'Trabajar con desconocidos exige escuchar, adaptarse y dejar claro qué puedes entregar en el tiempo que queda.',
      en: 'Working with strangers requires listening, adapting, and being clear about what you can deliver in the time left.',
    },
    resolvi: {
      es: 'Cuando ya no podía seguir el desarrollo principal, cambié de frente y cerré una landing que ayudara al equipo a explicar RADAS.',
      en: 'When I could no longer continue the main build, I changed focus and finished a landing page that helped the team explain RADAS.',
    },
  },
  {
    id: 'aisentinel',
    prioridad: 2,
    hito: true,
    hitoOrden: 3,
    filtro: 'trabajo',
    rol: { es: 'AI Sentinel · visión por computadora', en: 'AI Sentinel · computer vision' },
    fecha: { es: 'ExpoKinal 2026', en: 'ExpoKinal 2026' },
    lugar: { es: 'Proyecto de equipo', en: 'Team project' },
    resumen: {
      es: 'Desarrollé el servicio de visión y coordiné entregas entre repositorios para un sistema que reconoce estudiantes, revisa uniformes y notifica incidencias.',
      en: 'I developed the computer vision service and coordinated deliveries across repositories for a system that recognizes students, checks uniforms, and reports incidents.',
    },
    arco: {
      es: 'Pasar de aprender IA a llevarla a una operación concreta.',
      en: 'Moving from learning AI to applying it to a concrete operation.',
    },
    hice: {
      es: 'Construí la API de visión en Python con FastAPI, ChromaDB, YOLO y Docker con soporte para GPU. También amplié el backend administrativo con tiempo real, cámaras, reportes y healthcheck.',
      en: 'I built the Python vision API with FastAPI, ChromaDB, YOLO, and Docker with GPU support. I also extended the admin backend with real-time updates, cameras, reports, and a healthcheck.',
    },
    aprendido: {
      es: 'Un modelo no es el producto. También hay que integrarlo, observarlo y hacer que el resto del sistema pueda confiar en él.',
      en: 'A model is not the product. It also has to be integrated, observed, and made reliable for the rest of the system.',
    },
    resolvi: {
      es: 'Separé el servicio de visión, lo dejé ejecutable con Docker y conecté sus resultados con el backend y las notificaciones del equipo.',
      en: 'I separated the vision service, made it runnable with Docker, and connected its results to the backend and the team notifications.',
    },
  },
  {
    id: 'ecobuild',
    prioridad: 1.5,
    hito: false,
    hitoOrden: 0,
    filtro: 'hackaton',
    rol: { es: 'Buildathon · 3er lugar EcoBuild', en: 'Buildathon · 3rd place, EcoBuild' },
    fecha: { es: 'Semana de la Construcción · 2026', en: 'Construction Week · 2026' },
    lugar: { es: 'Cámara de la Construcción', en: 'Cámara de la Construcción' },
    resumen: {
      es: 'Tercer lugar con EcoBuild en la Semana de la Construcción 2026, en la Cámara de la Construcción. Fue el segundo pitch del año, frente a gente que no era el profe, y dejó un financiamiento semilla de 2000 USD.',
      en: 'Third place with EcoBuild at Construction Week 2026, at the Cámara de la Construcción. It was the second pitch of the year, delivered to an audience outside the classroom, and it secured USD 2,000 in seed funding.',
    },
    arco: {
      es: 'Un pitch que se sostuvo: tercer lugar y capital semilla para seguir.',
      en: 'A pitch that held: third place and seed capital to continue.',
    },
    hice: {
      es: 'Presenté EcoBuild en la Semana de la Construcción. El proyecto quedó en tercer lugar y se llevó un financiamiento semilla de 2000 USD.',
      en: 'I presented EcoBuild at Construction Week. The project placed third and received USD 2,000 in seed funding.',
    },
    aprendido: {
      es: 'Un pitch se sostiene si el valor se entiende rápido. El aula no prepara esa sala: ahí no basta con que el profe ya conozca el proyecto.',
      en: 'A pitch holds when the value is understood quickly. The classroom does not prepare that room: it is not enough that a teacher already knows the project.',
    },
    resolvi: {
      es: 'Era el segundo pitch del año, frente a gente de la construcción y no del aula. Seguí con EcoBuild hasta el tercer lugar y el financiamiento de 2000 USD.',
      en: 'It was the second pitch of the year, in front of people from construction rather than the classroom. I stayed with EcoBuild through third place and the USD 2,000 in funding.',
    },
  },
  {
    id: 'restaurantes',
    prioridad: 3,
    hito: true,
    hitoOrden: 4,
    filtro: 'trabajo',
    rol: { es: 'Gestión de Restaurantes', en: 'Restaurant Management' },
    fecha: { es: 'Proyecto de equipo', en: 'Team project' },
    lugar: { es: 'Sistema multi-servicio', en: 'Multi-service system' },
    resumen: {
      es: 'Trabajé en autenticación, API de dominio y clientes web para pedidos, reservas, promociones y administración.',
      en: 'I worked on authentication, a domain API, and web clients for orders, reservations, promotions, and administration.',
    },
    arco: {
      es: 'Construir un sistema que un negocio pueda usar todos los días.',
      en: 'Building a system a business could use every day.',
    },
    hice: {
      es: 'Desarrollé el servicio de autenticación en C# .NET 8 y buena parte de la API en Node.js y MongoDB. También construí flujos de la app de clientes y documenté endpoints para el equipo.',
      en: 'I developed the C# .NET 8 authentication service and much of the Node.js and MongoDB API. I also built client-app flows and documented endpoints for the team.',
    },
    aprendido: {
      es: 'Separar identidad, negocio e interfaz ayuda a que cada parte pueda cambiar sin romper todo el sistema.',
      en: 'Separating identity, business, and interface helps each part change without breaking the whole system.',
    },
    resolvi: {
      es: 'Trabajé por responsabilidad, probé los endpoints antes de conectarlos y dejé documentación para que otros pudieran integrarse.',
      en: 'I worked by responsibility, tested endpoints before connecting them, and left documentation so others could integrate.',
    },
  },
  {
    id: 'shootai',
    prioridad: 4,
    hito: false,
    hitoOrden: 0,
    filtro: 'trabajo',
    rol: { es: 'Shoot AI · backend y despliegue', en: 'Shoot AI · backend and deployment' },
    fecha: { es: 'Cursor Buildathon', en: 'Cursor Buildathon' },
    lugar: { es: 'San Salvador', en: 'San Salvador' },
    resumen: {
      es: 'Construí el backend para convertir briefs de moda en combinaciones de prendas usando extracción de requisitos, análisis de imágenes y color.',
      en: 'I built the backend that turns fashion briefs into clothing combinations using requirement extraction, image analysis, and color.',
    },
    arco: {
      es: 'De una idea rápida a un backend que el frontend puede usar.',
      en: 'From a fast idea to a backend the frontend can use.',
    },
    hice: {
      es: 'Implementé empresas, clientes, proyectos y catálogo en Express y Supabase. Integré OpenAI, Firecrawl, Cloudinary, lectura de PDF, CORS y despliegue.',
      en: 'I implemented companies, clients, projects, and a catalog in Express and Supabase. I integrated OpenAI, Firecrawl, Cloudinary, PDF reading, CORS, and deployment.',
    },
    aprendido: {
      es: 'En un build corto, el backend debe resolver lo esencial y dejar claros sus límites para que el equipo pueda avanzar.',
      en: 'In a short build, the backend must solve the essential part and make its limits clear so the team can move forward.',
    },
    resolvi: {
      es: 'Cerré el flujo de datos, conecté el frontend del equipo y resolví proxy, CORS y variables de entorno para desplegar.',
      en: 'I closed the data flow, connected the team frontend, and handled proxying, CORS, and environment variables for deployment.',
    },
  },
  {
    id: 'hacklatam',
    prioridad: 3,
    hito: true,
    hitoOrden: 5,
    filtro: 'hackaton',
    rol: { es: 'Hack@Latam', en: 'Hack@Latam' },
    fecha: { es: '5 países en simultáneo', en: '5 countries at once' },
    lugar: { es: 'UFM · 2026', en: 'UFM · 2026' },
    resumen: {
      es: 'Hack@Latam 2026 en la UFM, de indies.la, con Oscar Morales (The 502 Project) como host local. Corría en cinco países a la vez, entre ellos Colombia, Chile y El Salvador. Lo entregué con Josue Boror y Ricardo González.',
      en: 'Hack@Latam 2026 at UFM, organized by indies.la, with Oscar Morales (The 502 Project) as local host. It ran in five countries at the same time, including Colombia, Chile, and El Salvador. I delivered it with Josue Boror and Ricardo González.',
    },
    arco: {
      es: 'Equipo internacional, mismo reloj. Ahí se nota si aguantas el ritmo.',
      en: 'International team on a shared clock. The pace shows whether the work holds.',
    },
    hice: {
      es: 'Entregué Hack@Latam en la UFM con Josue Boror y Ricardo González, en un hackatón que corría en cinco países al mismo tiempo.',
      en: 'I delivered Hack@Latam at UFM with Josue Boror and Ricardo González, in a hackathon running in five countries at the same time.',
    },
    aprendido: {
      es: 'El ritmo internacional no espera a que termines de alinearte. Si el equipo no corta alcance, no hay nada que mostrar cuando suena el reloj.',
      en: 'An international pace does not wait for alignment to finish. If the team does not cut scope, there is nothing to show when the clock ends.',
    },
    resolvi: {
      es: 'La presión era el mismo reloj en varios países. Me apoyé en Josue Boror, en Ricardo González y en Oscar Morales como host local, y cerré un entregable que se podía mostrar.',
      en: 'The pressure was the same clock across several countries. I relied on Josue Boror, on Ricardo González, and on Oscar Morales as local host, and I closed a delivery that could be shown.',
    },
  },
  {
    id: 'ufg',
    prioridad: 4,
    hito: false,
    hitoOrden: 0,
    filtro: 'hackaton',
    rol: { es: 'Hackathon UFG · El Salvador', en: 'Hackathon UFG · El Salvador' },
    fecha: { es: 'Más de 24 horas', en: 'More than 24 hours' },
    lugar: { es: 'El Salvador', en: 'El Salvador' },
    resumen: {
      es: 'Hackathon en la UFG, El Salvador, 2026. Primera vez fuera del país, y no fue a pasear: más de 24 horas despiertos, poco sueño y aprendizaje a golpe.',
      en: 'Hackathon at UFG, El Salvador, in 2026. It was the first time outside the country, and the trip was for the event rather than sightseeing: more than 24 hours awake, limited sleep, and a steep learning curve.',
    },
    arco: '',
    hice: {
      es: 'Construí en la UFG con un reloj de más de 24 horas, lejos de casa y sin margen para pasear.',
      en: 'I built at UFG on a clock of more than 24 hours, away from home, with no margin for sightseeing.',
    },
    aprendido: {
      es: 'El sueño se acaba antes que el problema. Ahí se ve si de verdad sabes lo que dices que sabes.',
      en: 'Sleep runs out before the problem does. That is where it becomes clear whether the claimed skill is real.',
    },
    resolvi: {
      es: 'Cuando el sueño ganaba, no me fui. Seguí las horas que faltaban hasta dejar el trabajo de pie.',
      en: 'When sleep was winning, I did not leave. I stayed through the remaining hours until the work was standing.',
    },
    image: 'hack-sv',
  },
  {
    id: 'uvg',
    prioridad: 5,
    hito: true,
    hitoOrden: 1,
    filtro: 'hackaton',
    rol: { es: 'The502Project · UVG', en: 'The502Project · UVG' },
    fecha: { es: 'Primer hackathon', en: 'First hackathon' },
    lugar: { es: 'UVG', en: 'UVG' },
    resumen: {
      es: 'Primer hackathon, en 2026, con The502Project (Open2) en la UVG. Armamos un producto en menos de seis horas. No pasamos a finales, y ahí entendí lo que pesa construir algo de verdad con el reloj encima.',
      en: 'First hackathon, in 2026, with The502Project (Open2) at UVG. The team delivered a product in under six hours and did not advance to the finals. The round made the weight of building a real product against the clock concrete.',
    },
    arco: {
      es: 'El primer golpe: producto real con reloj en contra.',
      en: 'First test: a real product against the clock.',
    },
    hice: {
      es: 'Con The502Project (Open2) entregué un producto en la UVG en menos de seis horas. No pasamos a finales.',
      en: 'With The502Project (Open2) I delivered a product at UVG in under six hours. The team did not advance to the finals.',
    },
    aprendido: {
      es: 'No llegar a finales no borra lo que aprendiste. Un reloj de seis horas enseña a decidir qué entra y qué se queda afuera.',
      en: 'Missing the finals does not erase what was learned. A six-hour clock teaches what belongs in the build and what stays out.',
    },
    resolvi: {
      es: 'Seis horas no dan para dudar. Armamos lo que sí se podía terminar y lo mostramos, aunque la final quedara fuera.',
      en: 'Six hours leave no room to hesitate. We built what could actually be finished and showed it, even though the final stayed out of reach.',
    },
    image: 'primer-hackaton',
  },
  {
    id: 'expokinal',
    prioridad: 6,
    hito: true,
    hitoOrden: 2,
    filtro: 'evento',
    rol: { es: 'Expokinal 2025', en: 'Expokinal 2025' },
    fecha: { es: 'Primer gran proyecto público', en: 'First big public project' },
    lugar: '',
    resumen: {
      es: 'Mostrar el trabajo frente a gente de verdad, no solo frente al profe.',
      en: 'Presented the work to a public audience, beyond the classroom.',
    },
    arco: {
      es: 'De la aula al público: el código tiene que explicarse solo.',
      en: 'From the classroom to a public audience: the product had to stand on its own.',
    },
    hice: {
      es: 'Mostré ARJava en Expokinal 2025: una aplicación de realidad aumentada hecha en Java, frente a gente que no era el profe.',
      en: 'I presented ARJava at Expokinal 2025: an augmented-reality application built in Java, to an audience outside the classroom.',
    },
    aprendido: {
      es: 'En público el proyecto tiene que explicarse solo. Si solo lo entiende el equipo, todavía no está listo.',
      en: 'In public the project has to explain itself. If only the team understands it, it is not ready.',
    },
    resolvi: {
      es: 'El nervio era la sala, no el código. Preparé el funcionamiento para que se viera, y no para que yo lo narrara entero.',
      en: 'The pressure was the room, not the code. I prepared the demo so the behavior was visible, rather than narrating the whole system.',
    },
    image: 'expokinal-2025',
  },
  {
    id: 'comunidad',
    prioridad: 7,
    hito: false,
    hitoOrden: 0,
    filtro: 'hackaton',
    rol: { es: 'Comunidad The502Project', en: 'The502Project community' },
    fecha: { es: 'Cursor Hackathon CG · 140 personas', en: 'Cursor Hackathon CG · 140 people' },
    lugar: { es: 'Ciudad de Guatemala', en: 'Guatemala City' },
    resumen: {
      es: 'Cursor Hackathon en Ciudad de Guatemala, con The502Project. La sala juntó a 140 personas y el 60% vivía su primera hackatón.',
      en: 'Cursor Hackathon in Guatemala City, with The502Project. The room gathered 140 people, and 60 percent were attending a hackathon for the first time.',
    },
    arco: '',
    hice: {
      es: 'Participé en la Cursor Hackathon de Ciudad de Guatemala, en una sala de 140 personas donde el 60% estaba en su primera hackatón.',
      en: 'I took part in the Cursor Hackathon in Guatemala City, in a room of 140 people where 60 percent were at their first hackathon.',
    },
    aprendido: {
      es: 'Una comunidad se mide por quién llega la primera vez y se queda a construir. Con tanta gente nueva, hay que explicar el formato, no solo competir.',
      en: 'A community is measured by who arrives for the first time and stays to build. With so many first-timers, the format has to be explained, not only competed in.',
    },
    resolvi: {
      es: 'En una sala así es fácil perderse. Me quedé cerca del equipo, del entregable y de la gente que también estaba aprendiendo cómo se juega un hackatón.',
      en: 'In a room that size it is easy to get lost. I stayed close to the team, to the delivery, and to the people who were also learning how a hackathon works.',
    },
  },
  {
    id: 'aidev',
    prioridad: 8,
    hito: false,
    hitoOrden: 0,
    filtro: 'evento',
    rol: { es: 'AI Dev · Innovation Lab', en: 'AI Dev · Innovation Lab' },
    fecha: { es: 'Universidad Galileo', en: 'Universidad Galileo' },
    lugar: '',
    resumen: {
      es: 'Charlas y desarrollo con inteligencia artificial, fuera del calendario del colegio.',
      en: 'Talks and applied development with artificial intelligence, outside the school calendar.',
    },
    arco: '',
    hice: {
      es: 'Fui a charlas y a desarrollo con inteligencia artificial en el Innovation Lab de la Universidad Galileo, fuera del calendario de Kinal.',
      en: 'I attended talks and applied artificial-intelligence development at Universidad Galileo’s Innovation Lab, outside the Kinal calendar.',
    },
    aprendido: {
      es: 'El semestre no marca el ritmo del mundo tech. Si esperas a que termine el ciclo, llegas tarde.',
      en: 'The semester does not set the pace of the technology field. Waiting for the term to end means arriving late.',
    },
    resolvi: {
      es: 'Metí esos eventos entre clases. No esperé a que el horario me diera permiso para empezar a aplicar IA.',
      en: 'I fitted those events between classes. I did not wait for the schedule to grant permission to start applying AI.',
    },
  },
  {
    id: 'demo-day',
    prioridad: 9,
    hito: false,
    hitoOrden: 0,
    filtro: 'evento',
    rol: { es: 'Startup World Cup y 502 Demo Day', en: 'Startup World Cup and 502 Demo Day' },
    fecha: { es: 'Oyente · The 502 Project', en: 'Attendee · The 502 Project' },
    lugar: '',
    resumen: {
      es: 'Vi startups y jueces. Una propuesta se sostiene con un pitch y un valor que se entiende.',
      en: 'Attended to observe startups and judges. A proposal holds when the pitch is clear and the value is easy to understand.',
    },
    arco: '',
    hice: {
      es: 'Fui de oyente al Startup World Cup y al 502 Demo Day, de The 502 Project. Vi startups y jueces, sin subir a presentar.',
      en: 'I attended the Startup World Cup and the 502 Demo Day, both from The 502 Project, as a listener. I watched startups and judges without presenting.',
    },
    aprendido: {
      es: 'Una propuesta se sostiene con un pitch claro y un valor que se entiende. El adorno no salva una idea floja.',
      en: 'A proposal holds with a clear pitch and a value that is easy to understand. Ornament does not save a weak idea.',
    },
    resolvi: {
      es: 'No estaba en el escenario. Me llevé el patrón: qué preguntan los jueces y qué pitch se cae cuando el valor no se entiende.',
      en: 'I was not on stage. I left with the pattern: what judges ask, and which pitch fails when the value is not understood.',
    },
  },
  {
    id: 'ventas',
    prioridad: 10,
    hito: false,
    hitoOrden: 0,
    filtro: 'trabajo',
    rol: { es: 'Vacacionista · asesor de ventas', en: 'Seasonal sales advisor' },
    fecha: { es: 'Desde los 15 años', en: 'Since age 15' },
    lugar: '',
    resumen: {
      es: 'Trabajé para armarme un setup. No era un rol tech: aprendí a hablar con gente, aguantar ritmo y no congelarme ante el cliente.',
      en: 'Worked from age 15 to fund a personal workstation. The role was not technical. It developed client communication, pace, and composure with customers.',
    },
    arco: '',
    hice: {
      es: 'Desde los 15 trabajé de vacacionista como asesor de ventas para armarme un setup. El rol no era tech.',
      en: 'From age 15 I worked seasonally as a sales advisor to fund a personal workstation. The role was not technical.',
    },
    aprendido: {
      es: 'Aprendí a hablar con gente, aguantar el ritmo del día y no congelarme ante el cliente. Eso después sirvió en cada pitch.',
      en: 'I learned to speak with people, hold the pace of a full day, and stay composed with a customer. That later carried into every pitch.',
    },
    resolvi: {
      es: 'El día pesaba igual aunque no hubiera código. Me quedé con el turno, atendí y no solté la meta del setup.',
      en: 'The day was heavy even without code. I stayed on the shift, served the customer, and did not drop the goal of the setup.',
    },
  },
]

const EXPERIENCE_ONLY_IDS = new Set([
  'comunidad',
  'aidev',
  'demo-day',
  'expokinal',
  'aisentinel',
  'restaurantes',
  'shootai',
])
export const experienceEntries = RAW_EXPERIENCE_ENTRIES.filter((item) => !EXPERIENCE_ONLY_IDS.has(item.id))

export function listExperience(filter = 'all') {
  const pool = [...experienceEntries].sort((a, b) => a.prioridad - b.prioridad)
  if (filter === 'all') return pool
  return pool.filter((item) => item.filtro === filter)
}

export function listMilestones() {
  return experienceEntries
    .filter((item) => item.hito)
    .sort((a, b) => a.hitoOrden - b.hitoOrden)
}
