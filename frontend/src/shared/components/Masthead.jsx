import { isCurrent, SITE_LINKS } from '../siteNav.js'

export function Masthead({ path = '/', markUi = false }) {
  const ui = markUi ? { 'data-ui': true } : {}

  return (
    <div className={`masthead${path === '/' ? ' masthead-home' : ''} backdrop-blur-md`}>
      <a href="/" className="masthead-name" {...ui}>
        <span className="mr-2 inline-block size-2 bg-ember-500" aria-hidden="true" />
        Angel Siliezar
      </a>
      <nav id="site-index" className="masthead-index" aria-label="Páginas">
        {SITE_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-current={isCurrent(path, link.href) ? 'page' : undefined}
            {...ui}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  )
}
