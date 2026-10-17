const LEVEL = {
  core: 'Uso diario',
  solid: 'En proyectos',
  exploring: 'Explorando',
}

// Una habilidad nueva es un nodo con icon (archivo en icons/, sin .svg), posición y links.
const RAW = [
  {
    id: 'frontend',
    label: 'Frontend',
    nodes: [
      { id: 'html', label: 'HTML', icon: 'html5', level: 'core', blurb: 'Estructura semántica. La base de una interfaz que se puede leer.', x: 16, y: 28, links: ['css', 'js'] },
      { id: 'css', label: 'CSS', icon: 'css', level: 'core', blurb: 'Layout, tipografía y atmósfera.', x: 40, y: 16, links: ['tailwind'] },
      { id: 'js', label: 'JavaScript', icon: 'javascript', level: 'core', blurb: 'Interacción, lógica y puente full stack.', x: 16, y: 64, links: ['react'] },
      { id: 'react', label: 'React', icon: 'react', level: 'core', blurb: 'Componentes y estado para interfaces que se mueven.', x: 44, y: 48, links: ['tailwind', 'three'] },
      { id: 'tailwind', label: 'Tailwind', icon: 'tailwindcss', level: 'core', blurb: 'Utilidades para sostener el ritmo visual.', x: 72, y: 24, links: [] },
      { id: 'three', label: 'Three.js', icon: 'threedotjs', level: 'solid', blurb: 'Escenas 3D cuando la interfaz necesita espacio.', x: 74, y: 70, links: [] },
    ],
  },
  {
    id: 'backend',
    label: 'Backend y datos',
    nodes: [
      { id: 'node', label: 'Node.js', icon: 'nodedotjs', level: 'core', blurb: 'APIs y el mismo lenguaje en el servidor.', x: 14, y: 20, links: ['express', 'postgres', 'mongo'] },
      { id: 'express', label: 'Express', icon: 'express', level: 'core', blurb: 'Rutas por dominio y middlewares claros.', x: 38, y: 12, links: ['postgres'] },
      { id: 'java', label: 'Java', icon: 'openjdk', level: 'solid', blurb: 'Tipado fuerte cuando el backend lo pide.', x: 64, y: 16, links: ['spring', 'oracle'] },
      { id: 'spring', label: 'Spring Boot', icon: 'springboot', level: 'solid', blurb: 'Servicios Java: REST y persistencia.', x: 86, y: 36, links: [] },
      { id: 'postgres', label: 'PostgreSQL', icon: 'postgresql', level: 'core', blurb: 'Modelo relacional y consultas en Postgres.', x: 16, y: 50, links: ['oracle', 'dbeaver'] },
      { id: 'oracle', label: 'Oracle SQL', icon: 'oracle', level: 'solid', blurb: 'SQL en Oracle: esquema, consultas y el motor que pide el proyecto.', x: 42, y: 44, links: ['dbeaver'] },
      { id: 'dbeaver', label: 'DBeaver', icon: 'dbeaver', level: 'core', blurb: 'Cliente para revisar, consultar y administrar las bases.', x: 68, y: 58, links: ['mongo'] },
      { id: 'mongo', label: 'MongoDB', icon: 'mongodb', level: 'solid', blurb: 'Documentos cuando el esquema se mueve con el producto.', x: 28, y: 78, links: [] },
      { id: 'dotnet', label: '.NET', icon: 'dotnet', level: 'exploring', blurb: 'APIs y servicios en C#.', x: 84, y: 80, links: ['oracle'] },
    ],
  },
  {
    id: 'vision',
    label: 'Visión',
    nodes: [
      { id: 'python', label: 'Python', icon: 'python', level: 'solid', blurb: 'El lenguaje de la visión y de los scripts que mueven el modelo.', x: 28, y: 26, links: ['opencv', 'yolo'] },
      { id: 'opencv', label: 'OpenCV', icon: 'opencv', level: 'exploring', blurb: 'Imagen y visión a nivel de píxel.', x: 64, y: 34, links: ['yolo'] },
      { id: 'yolo', label: 'YOLO', icon: 'yolo', level: 'exploring', blurb: 'Detección de objetos, del dataset al modelo.', x: 46, y: 70, links: [] },
    ],
  },
  {
    id: 'ai',
    label: 'IA',
    nodes: [
      { id: 'ai-dev', label: 'AI Dev', icon: 'aidev', level: 'core', blurb: 'Modelos y tooling dentro del ciclo de producto.', x: 26, y: 38, links: ['cursor'] },
      { id: 'cursor', label: 'Cursor', icon: 'cursor', level: 'core', blurb: 'IDE con agentes y edición contextual.', x: 62, y: 46, links: [] },
    ],
  },
  {
    id: 'tools',
    label: 'Herramientas',
    nodes: [
      { id: 'git', label: 'Git', icon: 'git', level: 'core', blurb: 'Historia limpia y ramas con propósito.', x: 20, y: 22, links: ['github', 'vscode', 'gitflow'] },
      { id: 'github', label: 'GitHub', icon: 'github', level: 'core', blurb: 'Pull requests y el taller público del código.', x: 50, y: 16, links: ['docker'] },
      { id: 'gitflow', label: 'Git Flow', icon: 'git', level: 'solid', blurb: 'Features, releases y hotfixes sin enredo.', x: 78, y: 28, links: [] },
      { id: 'vscode', label: 'VS Code', icon: 'vscode', level: 'core', blurb: 'Editor diario: debugging y ritmo de edición.', x: 18, y: 64, links: ['vite'] },
      { id: 'vite', label: 'Vite', icon: 'vite', level: 'solid', blurb: 'Build con recarga rápida.', x: 48, y: 72, links: [] },
      { id: 'docker', label: 'Docker', icon: 'docker', level: 'solid', blurb: 'El entorno no depende de una sola máquina.', x: 78, y: 64, links: [] },
    ],
  },
  {
    id: 'human',
    label: 'Oficio',
    nodes: [
      { id: 'leadership', label: 'Liderazgo', icon: 'leadership', level: 'core', blurb: 'Scrum Master en TaKito: equipo y sprints.', x: 18, y: 28, links: ['communication'] },
      { id: 'communication', label: 'Escucha', icon: 'communication', level: 'core', blurb: 'Ventas y asesoría: escuchar, explicar y resolver.', x: 50, y: 16, links: ['teamwork'] },
      { id: 'teamwork', label: 'Equipo', icon: 'teamwork', level: 'core', blurb: 'Proyectos en Kinal, hackatones y ExpoKinal.', x: 80, y: 32, links: ['adaptability'] },
      { id: 'adaptability', label: 'Adaptar', icon: 'adaptability', level: 'solid', blurb: 'Aprendo cuando el contexto cambia.', x: 74, y: 70, links: ['initiative'] },
      { id: 'initiative', label: 'Iniciativa', icon: 'initiative', level: 'solid', blurb: 'Exploro stacks y construyo por cuenta propia.', x: 44, y: 78, links: ['discipline'] },
      { id: 'discipline', label: 'Disciplina', icon: 'discipline', level: 'core', blurb: 'Méritos Cisco y el trabajo bien hecho.', x: 16, y: 66, links: ['leadership'] },
    ],
  },
]

export const skillConstellations = RAW.map((group) => ({
  ...group,
  nodes: group.nodes.map((node) => ({ ...node, levelLabel: LEVEL[node.level] ?? node.level })),
  edges: group.nodes.flatMap((node) => node.links.map((target) => ({ from: node.id, to: target }))),
}))
