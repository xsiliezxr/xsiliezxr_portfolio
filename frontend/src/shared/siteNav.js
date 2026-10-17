export const SITE_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/history', label: 'Historia' },
  { href: '/experiencia', label: 'Experiencia' },
  { href: '/gallery', label: 'Galería' },
  { href: '/certificaciones', label: 'Certificados' },
  { href: '/projects', label: 'Proyectos' },
  { href: '/skills', label: 'Habilidades' },
  { href: '/contact', label: 'Contacto' },
]

const ALIAS = {
  '/about': '/history',
  '/certifications': '/certificaciones',
  '/certificados': '/certificaciones',
  '/proyects': '/projects',
  '/galery': '/gallery',
  '/galeria': '/gallery',
  '/experience': '/experiencia',
  '/habilidades': '/skills',
}

export function canonicalPath(pathname) {
  const bare = !pathname || pathname === '/' ? '/' : pathname.replace(/\/$/, '')
  return ALIAS[bare] || bare
}

export function isCurrent(path, href) {
  return canonicalPath(path) === href
}
