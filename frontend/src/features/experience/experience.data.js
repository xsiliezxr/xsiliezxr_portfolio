// Orden por defecto: prioridad ASC (1 = más importante).
// hito: true + hitoOrden → aparece en Historia (arco estudios → desarrollador).
export const EXPERIENCE_FILTERS = [
  { id: 'all', label: 'Todo' },
  { id: 'trabajo', label: 'Trabajo' },
  { id: 'hackaton', label: 'Hackatones' },
  { id: 'evento', label: 'Eventos' },
]

export const experienceEntries = [
  {
    id: 'combex',
    prioridad: 1,
    hito: true,
    hitoOrden: 4,
    filtro: 'trabajo',
    rol: 'Prácticas en Combex',
    fecha: '400 horas',
    lugar: 'Combex',
    resumen: 'Software aplicado a la logística de carga aérea.',
    arco: 'Primera vez con software que mueve operación real, no solo demos de clase.',
  },
  {
    id: 'buildathon',
    prioridad: 2,
    hito: true,
    hitoOrden: 3,
    filtro: 'hackaton',
    rol: 'Cursor Buildathon · San Salvador',
    fecha: '3 de julio',
    lugar: 'San Salvador',
    resumen: 'Viajé con 15 personas de Guatemala. Casi 32 horas construyendo desde cero, siendo aún estudiante.',
    arco: 'Salir del país a construir: el salto de estudiante a quien entrega bajo presión.',
    image: 'hack-sv',
  },
  {
    id: 'hacklatam',
    prioridad: 3,
    hito: true,
    hitoOrden: 5,
    filtro: 'hackaton',
    rol: 'Hack@Latam',
    fecha: '5 países en simultáneo',
    lugar: '',
    resumen: 'Hackatón de indies.la con Oscar Morales como host local. Equipo con Josue Boror y Ricardo González.',
    arco: 'Equipo internacional, mismo reloj. Ahí se nota si aguantas el ritmo.',
  },
  {
    id: 'ufg',
    prioridad: 4,
    hito: false,
    hitoOrden: 0,
    filtro: 'hackaton',
    rol: 'Hackathon UFG · El Salvador',
    fecha: 'Más de 24 horas',
    lugar: 'El Salvador',
    resumen: 'Primera vez fuera del país, y no fue a pasear. Poco sueño y aprendizaje a golpe.',
    arco: '',
    image: 'hack-sv',
  },
  {
    id: 'uvg',
    prioridad: 5,
    hito: true,
    hitoOrden: 1,
    filtro: 'hackaton',
    rol: 'The502Project · UVG',
    fecha: 'Primer hackathon',
    lugar: 'UVG',
    resumen: 'Producto en menos de seis horas. No pasamos a finales. Ahí entendí la presión de armar algo de verdad.',
    arco: 'El primer golpe: producto real con reloj en contra.',
    image: 'primer-hackaton',
  },
  {
    id: 'expokinal',
    prioridad: 6,
    hito: true,
    hitoOrden: 2,
    filtro: 'evento',
    rol: 'Expokinal 2025',
    fecha: 'Primer gran proyecto público',
    lugar: '',
    resumen: 'Mostrar el trabajo frente a gente de verdad, no solo frente al profe.',
    arco: 'De la aula al público: el código tiene que explicarse solo.',
    image: 'expokinal-2025',
  },
  {
    id: 'comunidad',
    prioridad: 7,
    hito: false,
    hitoOrden: 0,
    filtro: 'evento',
    rol: 'Comunidad The502Project',
    fecha: 'Cursor Hackathon CG · 140 personas',
    lugar: 'Ciudad de Guatemala',
    resumen: 'La hackatón de Ciudad de Guatemala juntó a 140 personas y el 60% vivía su primera.',
    arco: '',
  },
  {
    id: 'aidev',
    prioridad: 8,
    hito: false,
    hitoOrden: 0,
    filtro: 'evento',
    rol: 'AI Dev · Innovation Lab',
    fecha: 'Universidad Galileo',
    lugar: '',
    resumen: 'Charlas y desarrollo con inteligencia artificial, fuera del calendario del colegio.',
    arco: '',
  },
  {
    id: 'demo-day',
    prioridad: 9,
    hito: false,
    hitoOrden: 0,
    filtro: 'evento',
    rol: 'Startup World Cup y 502 Demo Day',
    fecha: 'Oyente · The 502 Project',
    lugar: '',
    resumen: 'Vi startups y jueces. Una propuesta se sostiene con un pitch y un valor que se entiende.',
    arco: '',
  },
  {
    id: 'ventas',
    prioridad: 10,
    hito: false,
    hitoOrden: 0,
    filtro: 'trabajo',
    rol: 'Vacacionista · asesor de ventas',
    fecha: 'Desde los 15 años',
    lugar: '',
    resumen: 'Trabajé para armarme un setup. No era un rol tech: aprendí a hablar con gente, aguantar ritmo y no congelarme ante el cliente.',
    arco: '',
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
