import { contactLinks } from '../../../../shared/config/contact.js'
import { closing } from '../../content/journey.content.js'

export function JourneyFooter() {
  const links = contactLinks()

  return (
    <footer className="journey-footer" data-footer>
      <p className="journey-footer-name">Angel Siliezar</p>
      <p className="journey-footer-line">{closing.line1} {closing.line2}</p>
      <nav className="journey-footer-links" aria-label="Contacto">
        <a href="/contact">Contacto</a>
        {links.map((link) => (
          <a
            key={link.id}
            href={link.href}
            {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  )
}
