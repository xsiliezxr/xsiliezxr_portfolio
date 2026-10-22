export const LEVEL = {
  core: { es: 'Uso diario', en: 'Daily use' },
  solid: { es: 'En proyectos', en: 'In projects' },
  exploring: { es: 'Explorando', en: 'Exploring' },
}

// Una habilidad nueva es un nodo: label técnico plano, blurb {es,en}, más icon, level, x, y y links.
const RAW = [
  {
    id: 'frontend',
    label: { es: 'Frontend', en: 'Frontend' },
    nodes: [
      { id: 'html', label: 'HTML', icon: 'html5', level: 'core', blurb: { es: 'Estructura semántica. La base de una interfaz que se puede leer.', en: 'Semantic structure. The base of an interface you can read.' }, x: 16, y: 28, links: ['css', 'js'] },
      { id: 'css', label: 'CSS', icon: 'css', level: 'core', blurb: { es: 'Layout, tipografía y atmósfera.', en: 'Layout, type, and atmosphere.' }, x: 40, y: 16, links: ['tailwind'] },
      { id: 'js', label: 'JavaScript', icon: 'javascript', level: 'core', blurb: { es: 'Interacción, lógica y puente full stack.', en: 'Interaction, logic, and the full stack bridge.' }, x: 16, y: 64, links: ['react'] },
      { id: 'react', label: 'React', icon: 'react', level: 'core', blurb: { es: 'Componentes y estado para interfaces que se mueven.', en: 'Components and state for interfaces that move.' }, x: 44, y: 48, links: ['tailwind', 'three'] },
      { id: 'tailwind', label: 'Tailwind', icon: 'tailwindcss', level: 'core', blurb: { es: 'Utilidades para sostener el ritmo visual.', en: 'Utilities that hold the visual rhythm.' }, x: 72, y: 24, links: [] },
      { id: 'three', label: 'Three.js', icon: 'threedotjs', level: 'solid', blurb: { es: 'Escenas 3D cuando la interfaz necesita espacio.', en: '3D scenes when the interface needs space.' }, x: 74, y: 70, links: [] },
    ],
  },
  {
    id: 'backend',
    label: { es: 'Backend y datos', en: 'Backend & data' },
    nodes: [
      { id: 'node', label: 'Node.js', icon: 'nodedotjs', level: 'core', blurb: { es: 'APIs y el mismo lenguaje en el servidor.', en: 'APIs and the same language on the server.' }, x: 14, y: 20, links: ['express', 'postgres', 'mongo'] },
      { id: 'express', label: 'Express', icon: 'express', level: 'core', blurb: { es: 'Rutas por dominio y middlewares claros.', en: 'Routes by domain and clear middlewares.' }, x: 38, y: 12, links: ['postgres'] },
      { id: 'java', label: 'Java', icon: 'openjdk', level: 'solid', blurb: { es: 'Tipado fuerte cuando el backend lo pide.', en: 'Strong typing when the backend asks for it.' }, x: 64, y: 16, links: ['spring', 'oracle'] },
      { id: 'spring', label: 'Spring Boot', icon: 'springboot', level: 'solid', blurb: { es: 'Servicios Java: REST y persistencia.', en: 'Java services: REST and persistence.' }, x: 86, y: 36, links: [] },
      { id: 'postgres', label: 'PostgreSQL', icon: 'postgresql', level: 'core', blurb: { es: 'Modelo relacional y consultas en Postgres.', en: 'Relational model and queries in Postgres.' }, x: 16, y: 50, links: ['oracle', 'dbeaver'] },
      { id: 'oracle', label: 'Oracle SQL', icon: 'oracle', level: 'solid', blurb: { es: 'SQL en Oracle: esquema, consultas y el motor que pide el proyecto.', en: 'SQL on Oracle: schema, queries, and the engine the project asks for.' }, x: 42, y: 44, links: ['dbeaver'] },
      { id: 'dbeaver', label: 'DBeaver', icon: 'dbeaver', level: 'core', blurb: { es: 'Cliente para revisar, consultar y administrar las bases.', en: 'Client to inspect, query, and administer databases.' }, x: 68, y: 58, links: ['mongo'] },
      { id: 'mongo', label: 'MongoDB', icon: 'mongodb', level: 'solid', blurb: { es: 'Documentos cuando el esquema se mueve con el producto.', en: 'Documents when the schema moves with the product.' }, x: 28, y: 78, links: [] },
      { id: 'dotnet', label: '.NET', icon: 'dotnet', level: 'exploring', blurb: { es: 'APIs y servicios en C#.', en: 'APIs and services in C#.' }, x: 84, y: 80, links: ['oracle'] },
    ],
  },
  {
    id: 'vision',
    label: { es: 'Visión', en: 'Vision' },
    nodes: [
      { id: 'python', label: 'Python', icon: 'python', level: 'solid', blurb: { es: 'El lenguaje de la visión y de los scripts que mueven el modelo.', en: 'The language of vision and of the scripts that move the model.' }, x: 28, y: 26, links: ['opencv', 'yolo'] },
      { id: 'opencv', label: 'OpenCV', icon: 'opencv', level: 'exploring', blurb: { es: 'Imagen y visión a nivel de píxel.', en: 'Image and vision at pixel level.' }, x: 64, y: 34, links: ['yolo'] },
      { id: 'yolo', label: 'YOLO', icon: 'yolo', level: 'exploring', blurb: { es: 'Detección de objetos, del dataset al modelo.', en: 'Object detection, from the dataset to the model.' }, x: 46, y: 70, links: [] },
    ],
  },
  {
    id: 'ai',
    label: { es: 'IA', en: 'AI' },
    nodes: [
      { id: 'ai-dev', label: 'AI Dev', icon: 'aidev', level: 'core', blurb: { es: 'Modelos y tooling dentro del ciclo de producto.', en: 'Models and tooling inside the product cycle.' }, x: 26, y: 38, links: ['cursor'] },
      { id: 'cursor', label: 'Cursor', icon: 'cursor', level: 'core', blurb: { es: 'IDE con agentes y edición contextual.', en: 'IDE with agents and contextual editing.' }, x: 62, y: 46, links: [] },
    ],
  },
  {
    id: 'tools',
    label: { es: 'Herramientas', en: 'Tools' },
    nodes: [
      { id: 'git', label: 'Git', icon: 'git', level: 'core', blurb: { es: 'Historia limpia y ramas con propósito.', en: 'Clean history and branches with a purpose.' }, x: 20, y: 22, links: ['github', 'vscode', 'gitflow'] },
      { id: 'github', label: 'GitHub', icon: 'github', level: 'core', blurb: { es: 'Pull requests y el taller público del código.', en: 'Pull requests and the public workshop of the code.' }, x: 50, y: 16, links: ['docker'] },
      { id: 'gitflow', label: 'Git Flow', icon: 'git', level: 'solid', blurb: { es: 'Features, releases y hotfixes sin enredo.', en: 'Features, releases, and hotfixes without a tangle.' }, x: 78, y: 28, links: [] },
      { id: 'vscode', label: 'VS Code', icon: 'vscode', level: 'core', blurb: { es: 'Editor diario: debugging y ritmo de edición.', en: 'Daily editor: debugging and editing rhythm.' }, x: 18, y: 64, links: ['vite'] },
      { id: 'vite', label: 'Vite', icon: 'vite', level: 'solid', blurb: { es: 'Build con recarga rápida.', en: 'Build with fast reload.' }, x: 48, y: 72, links: [] },
      { id: 'docker', label: 'Docker', icon: 'docker', level: 'solid', blurb: { es: 'El entorno no depende de una sola máquina.', en: 'The environment does not depend on a single machine.' }, x: 78, y: 64, links: [] },
    ],
  },
  {
    id: 'deploy',
    label: { es: 'Deploy y CI', en: 'Deploy & CI' },
    nodes: [
      { id: 'vercel', label: 'Vercel', icon: 'vercel', level: 'core', blurb: { es: 'Frontend en producción y preview por cada push.', en: 'Frontend in production and a preview on every push.' }, x: 22, y: 30, links: ['github-actions'] },
      { id: 'netlify', label: 'Netlify', icon: 'netlify', level: 'solid', blurb: { es: 'Sitio estático, forms y el build que se publica.', en: 'Static site, forms, and the build that ships.' }, x: 58, y: 20, links: ['github-actions'] },
      { id: 'github-actions', label: 'GitHub Actions', icon: 'github', level: 'solid', blurb: { es: 'CI en cada push: build y checks antes de salir.', en: 'CI on every push: build and checks before it ships.' }, x: 74, y: 66, links: ['vercel', 'netlify'] },
    ],
  },
  {
    id: 'human',
    label: { es: 'Oficio', en: 'Craft' },
    nodes: [
      { id: 'leadership', label: { es: 'Liderazgo', en: 'Leadership' }, icon: 'leadership', level: 'core', blurb: { es: 'Scrum Master en TaKito: equipo y sprints.', en: 'Scrum Master at TaKito: team and sprints.' }, x: 18, y: 28, links: ['communication'] },
      { id: 'communication', label: { es: 'Escucha', en: 'Listening' }, icon: 'communication', level: 'core', blurb: { es: 'Ventas y asesoría: escuchar, explicar y resolver.', en: 'Sales and advising: listen, explain, and solve.' }, x: 50, y: 16, links: ['teamwork'] },
      { id: 'teamwork', label: { es: 'Equipo', en: 'Team' }, icon: 'teamwork', level: 'core', blurb: { es: 'Proyectos en Kinal, hackatones y ExpoKinal.', en: 'Projects at Kinal, hackathons, and ExpoKinal.' }, x: 80, y: 32, links: ['adaptability'] },
      { id: 'adaptability', label: { es: 'Adaptar', en: 'Adapt' }, icon: 'adaptability', level: 'solid', blurb: { es: 'Aprendo cuando el contexto cambia.', en: 'I learn when the context changes.' }, x: 74, y: 70, links: ['initiative'] },
      { id: 'initiative', label: { es: 'Iniciativa', en: 'Initiative' }, icon: 'initiative', level: 'solid', blurb: { es: 'Exploro stacks y construyo por cuenta propia.', en: 'I explore stacks and build on my own.' }, x: 44, y: 78, links: ['discipline'] },
      { id: 'discipline', label: { es: 'Disciplina', en: 'Discipline' }, icon: 'discipline', level: 'core', blurb: { es: 'Méritos Cisco y el trabajo bien hecho.', en: 'Cisco merits and work done properly.' }, x: 16, y: 66, links: ['leadership'] },
    ],
  },
]

export const skillConstellations = RAW.map((group) => ({
  ...group,
  nodes: group.nodes.map((node) => ({ ...node, levelLabel: LEVEL[node.level] ?? node.level })),
  edges: group.nodes.flatMap((node) => node.links.map((target) => ({ from: node.id, to: target }))),
}))
