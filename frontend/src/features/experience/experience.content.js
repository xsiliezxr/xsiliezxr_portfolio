// Una entrada nueva es un objeto en WORK o en FIELD. kind: trabajo, hackaton o evento.
export const WORK = [
  {
    id: 'ventas',
    kind: 'trabajo',
    title: 'Vacacionista · asesor de ventas',
    when: 'Desde los 15 años',
    detail: 'Trabajé para armarme un setup. No era un rol tech: aprendí a hablar con gente, aguantar ritmo y no congelarme ante el cliente.',
  },
  {
    id: 'combex',
    kind: 'trabajo',
    title: 'Prácticas en Combex',
    when: '400 horas',
    detail: 'Software aplicado a la logística de carga aérea.',
  },
]

export const FIELD = [
  {
    id: 'uvg',
    kind: 'hackaton',
    title: 'The502Project · UVG',
    when: 'Primer hackathon',
    detail: 'Producto en menos de seis horas. No pasamos a finales. Ahí entendí la presión de armar algo de verdad.',
  },
  {
    id: 'ufg',
    kind: 'hackaton',
    title: 'Hackathon UFG · El Salvador',
    when: 'Más de 24 horas',
    detail: 'Primera vez fuera del país, y no fue a pasear. Poco sueño y aprendizaje a golpe.',
  },
  {
    id: 'buildathon',
    kind: 'hackaton',
    title: 'Cursor Buildathon · San Salvador',
    when: '3 de julio',
    detail: 'Viajé con 15 personas de Guatemala. Casi 32 horas construyendo desde cero, siendo aún estudiante.',
  },
  {
    id: 'hacklatam',
    kind: 'hackaton',
    title: 'Hack@Latam',
    when: '5 países en simultáneo',
    detail: 'Hackatón de indies.la con Oscar Morales como host local. Equipo con Josue Boror y Ricardo González.',
  },
  {
    id: 'expokinal',
    kind: 'evento',
    title: 'Expokinal 2025',
    when: 'Primer gran proyecto público',
    detail: 'Mostrar el trabajo frente a gente de verdad, no solo frente al profe.',
  },
  {
    id: 'aidev',
    kind: 'evento',
    title: 'AI Dev · Innovation Lab',
    when: 'Universidad Galileo',
    detail: 'Charlas y desarrollo con inteligencia artificial, fuera del calendario del colegio.',
  },
  {
    id: 'demo-day',
    kind: 'evento',
    title: 'Startup World Cup y 502 Demo Day',
    when: 'Oyente · The 502 Project',
    detail: 'Vi startups y jueces. Una propuesta se sostiene con un pitch y un valor que se entiende.',
  },
  {
    id: 'comunidad',
    kind: 'evento',
    title: 'Comunidad The502Project',
    when: 'Cursor Hackathon CG · 140 personas',
    detail: 'La hackatón de Ciudad de Guatemala juntó a 140 personas y el 60% vivía su primera.',
  },
]

export const EXPERIENCE_FILTERS = [
  { id: 'all', label: 'Todo' },
  { id: 'trabajo', label: 'Trabajo' },
  { id: 'hackaton', label: 'Hackatones' },
  { id: 'evento', label: 'Eventos' },
]

export const experienceEntries = [...WORK, ...FIELD]
