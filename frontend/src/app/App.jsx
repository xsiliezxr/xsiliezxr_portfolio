import { useEffect, useState } from 'react'
import { CertificationsPage } from '../features/certifications/pages/CertificationsPage.jsx'
import { ContactPage } from '../features/contact/pages/ContactPage.jsx'
import { ExperiencePage } from '../features/experience/pages/ExperiencePage.jsx'
import { GalleryPage } from '../features/gallery/pages/GalleryPage.jsx'
import { HistoryPage } from '../features/history/pages/HistoryPage.jsx'
import { HomePage } from '../features/home/pages/HomePage.jsx'
import { ProjectsPage } from '../features/projects/pages/ProjectsPage.jsx'
import { SkillsPage } from '../features/skills/pages/SkillsPage.jsx'
import { PageShell } from '../shared/components/PageShell.jsx'
import { SiteCursor } from '../shared/components/SiteCursor.jsx'
import { canonicalPath } from '../shared/siteNav.js'

const PAGES = {
  '/': HomePage,
  '/history': HistoryPage,
  '/gallery': GalleryPage,
  '/experiencia': ExperiencePage,
  '/experience': ExperiencePage,
  '/projects': ProjectsPage,
  '/proyects': ProjectsPage,
  '/certifications': CertificationsPage,
  '/certificaciones': CertificationsPage,
  '/certificados': CertificationsPage,
  '/about': HistoryPage,
  '/skills': SkillsPage,
  '/contact': ContactPage,
}

function normalize(pathname) {
  if (!pathname || pathname === '/') return '/'
  return pathname.replace(/\/$/, '')
}

export function App() {
  const [path, setPath] = useState(() => normalize(window.location.pathname))

  useEffect(() => {
    const sync = () => setPath(normalize(window.location.pathname))
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target.closest('a[href]')
      if (!link) return
      const href = link.getAttribute('href')
      if (!href || !href.startsWith('/') || href.startsWith('//') || link.target) return
      event.preventDefault()
      const next = new URL(href, window.location.origin)
      if (next.pathname === window.location.pathname && next.search === window.location.search) return
      window.history.pushState({}, '', next.pathname + next.search)
      sync()
      window.scrollTo(0, 0)
    }
    window.addEventListener('popstate', sync)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('popstate', sync)
      document.removeEventListener('click', onClick)
    }
  }, [])

  const Page = PAGES[canonicalPath(path)]
  return (
    <>
      <SiteCursor />
      {Page ? <Page /> : (
        <PageShell path={path}>
          <h1 className="py-16 font-display text-5xl font-black uppercase">Esa ruta no existe</h1>
          <a href="/" className="text-ember-300">Volver al inicio</a>
        </PageShell>
      )}
    </>
  )
}
