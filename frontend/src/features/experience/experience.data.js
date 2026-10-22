// Orden por defecto: prioridad ASC (1 = más importante).
// hito: true + hitoOrden → aparece en Historia (arco estudios → desarrollador).
export const EXPERIENCE_FILTERS = [
  { id: 'all', label: { es: 'Todo', en: 'All' } },
  { id: 'trabajo', label: { es: 'Trabajo', en: 'Work' } },
  { id: 'hackaton', label: { es: 'Hackatones', en: 'Hackathons' } },
  { id: 'evento', label: { es: 'Eventos', en: 'Events' } },
]

export const experienceEntries = [
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
    id: 'buildathon',
    prioridad: 2,
    hito: true,
    hitoOrden: 3,
    filtro: 'hackaton',
    rol: { es: 'Cursor Buildathon · San Salvador', en: 'Cursor Buildathon · San Salvador' },
    fecha: { es: '3 de julio', en: 'July 3' },
    lugar: { es: 'San Salvador', en: 'San Salvador' },
    resumen: {
      es: 'El 3 de julio viajé con 15 personas de Guatemala a San Salvador para el #CursorBuildathon de Ai Labs. Casi 32 horas construyendo desde cero, siendo aún estudiante.',
      en: 'On July 3 I traveled with 15 people from Guatemala to San Salvador for Ai Labs’ #CursorBuildathon. I spent nearly 32 hours building from scratch while still a student.',
    },
    arco: {
      es: 'Salir del país a construir: el salto de estudiante a quien entrega bajo presión.',
      en: 'First delivery outside the country, on a fixed deadline, while still a student.',
    },
    hice: {
      es: 'Construí desde cero en la Cursor Buildathon de Ai Labs, casi 32 horas, con el grupo de 15 que salió de Guatemala.',
      en: 'I built from scratch at Ai Labs’ Cursor Buildathon for nearly 32 hours, with the group of 15 that left Guatemala.',
    },
    aprendido: {
      es: 'Fuera del aula el estándar cambia. Ya no era una tarea: era un build con reloj, sueño corto y gente esperando el entregable.',
      en: 'Outside the classroom the standard changes. It was no longer an assignment: it was a build on the clock, with little sleep and people waiting for the delivery.',
    },
    resolvi: {
      es: 'Casi 32 horas y un proyecto que no existía al empezar. Me quedé en el build, con poco sueño, hasta dejar algo construido desde cero.',
      en: 'Nearly 32 hours, and a project that did not exist at the start. I stayed on the build, with little sleep, until there was something made from scratch.',
    },
    image: 'hack-sv',
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
    id: 'pitch-hacktec',
    prioridad: 5.5,
    hito: false,
    hitoOrden: 0,
    filtro: 'hackaton',
    rol: { es: 'Primer pitch · Hackathon TEC', en: 'First pitch · Hackathon TEC' },
    fecha: { es: '4.º lugar', en: '4th place' },
    lugar: { es: 'Fundación Kinal', en: 'Fundación Kinal' },
    resumen: {
      es: 'Primera vez pitcheando, en el Hackathon TEC de Fundación Kinal. El proyecto era una IA para aprender inglés. Quedamos en cuarto lugar.',
      en: 'First pitch, at Hackathon TEC at Fundación Kinal. The project was an AI tool for learning English. The team placed fourth.',
    },
    arco: {
      es: 'El primer pitch, frente a gente de verdad.',
      en: 'The first pitch, in front of a real audience.',
    },
    hice: {
      es: 'Con el equipo armé un proyecto de IA para aprender inglés y lo pitcheé por primera vez. Quedamos en cuarto lugar.',
      en: 'With the team I built an AI project for learning English and pitched it for the first time. We placed fourth.',
    },
    aprendido: {
      es: 'Explicar la idea pesa tanto como el código. Si el jurado no la entiende, el producto no existe para esa sala.',
      en: 'Explaining the idea carries as much weight as the code. If the jury does not understand it, the product does not exist for that room.',
    },
    resolvi: {
      es: 'El nervio era la primera vez frente a gente de verdad. Me quedé con un mensaje corto, mostré el producto y no me escondí detrás de la demo.',
      en: 'The pressure was a first pitch in front of a real audience. I kept the message short, showed the product, and did not hide behind the demo.',
    },
  },
  {
    id: 'becas-bi',
    prioridad: 6.5,
    hito: false,
    hitoOrden: 0,
    filtro: 'evento',
    rol: { es: 'Becas simbólicas Fundación BI', en: 'Fundación BI symbolic scholarships' },
    fecha: { es: '2025 y 2026', en: '2025 and 2026' },
    lugar: { es: 'Fundación Kinal', en: 'Fundación Kinal' },
    resumen: {
      es: 'Beca simbólica para continuar los estudios en Fundación Kinal, dos años seguidos.',
      en: 'Symbolic scholarship supporting continued studies at Fundación Kinal, awarded two consecutive years.',
    },
    arco: {
      es: 'Dos años seguidos. La constancia también se reconoce.',
      en: 'Two years in a row. Consistency was recognized as well.',
    },
    hice: {
      es: 'Recibí la beca simbólica de Fundación BI para seguir en Fundación Kinal, en 2025 y otra vez en 2026.',
      en: 'I received the Fundación BI symbolic scholarship to continue at Fundación Kinal, in 2025 and again in 2026.',
    },
    aprendido: {
      es: 'La constancia también se reconoce. No fue un golpe de un solo ciclo: fueron dos años seguidos de estudio.',
      en: 'Consistency is also recognized. It was not a single-term result: it was two consecutive years of study.',
    },
    resolvi: {
      es: 'No había un atajo. Seguí el ritmo de Kinal y el reconocimiento llegó después del trabajo, no antes.',
      en: 'There was no shortcut. I kept Kinal’s pace, and the recognition followed the work.',
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
