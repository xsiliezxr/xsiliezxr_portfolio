import headphones from '../../../../assets/images/hobbies/headphones.webp'
import { HobbyMark } from '../../../../shared/hobbies/HobbyMark.jsx'
import { contact, contactLinks } from '../../../../shared/config/contact.js'
import { SITE_LINKS } from '../../../../shared/siteNav.js'
import { closing } from '../../content/journey.content.js'
import { AsciiHands } from './AsciiHands.jsx'

const YEAR = new Date().getFullYear()
const MAP = SITE_LINKS.filter((link) => link.href !== '/')

function FooterMeta({ links }) {
  return (
    <>
      <nav className="journey-footer-col" aria-label="Mapa del sitio">
        <p className="journey-footer-label">Recorrido</p>
        <ul>
          {MAP.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="journey-footer-col" aria-label="Contacto">
        <p className="journey-footer-label">Contacto</p>
        <ul>
          <li>
            <a href="/contact">Escribirme</a>
          </li>
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
          {contact.email ? (
            <li className="journey-footer-mail">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
          ) : null}
        </ul>
        <div className="journey-footer-hobby">
          <HobbyMark id="headphones" image={headphones} />
        </div>
      </nav>
    </>
  )
}

function FooterBar() {
  return (
    <div className="journey-footer-bar">
      <p className="journey-footer-copy">© {YEAR} Angel Siliezar. Hecho a mano en Guatemala.</p>
      <p className="journey-footer-credit">
        Setup 3D:{' '}
        <a href={closing.creditModel} target="_blank" rel="noreferrer">
          Gaming Setup v2
        </a>
        {' · '}
        <a href={closing.creditLicense} target="_blank" rel="noreferrer">
          CC BY 4.0
        </a>
      </p>
    </div>
  )
}

export function JourneyFooter({ variant = 'stage' }) {
  const links = contactLinks()
  const compact = variant === 'page'

  if (compact) {
    return (
      <footer className="journey-footer is-page" data-footer>
        <div className="journey-footer-shell">
          <div className="journey-footer-brand">
            <p className="journey-footer-kicker">Angel Siliezar</p>
            <p className="journey-footer-phrase">
              <span>{closing.line1}</span>
              <span>{closing.line2}</span>
            </p>
            <p className="journey-footer-status">{closing.status}</p>
            <p className="journey-footer-place">{closing.place}</p>
          </div>
          <div className="journey-footer-cols">
            <FooterMeta links={links} />
          </div>
        </div>
        <FooterBar />
      </footer>
    )
  }

  return (
    <footer className="journey-footer" data-footer>
      <div className="journey-footer-frame">
        <div className="journey-footer-rail">
          <p className="journey-footer-kicker">Angel Siliezar · Pieza de cierre</p>
          <p className="journey-footer-place">{closing.place}</p>
        </div>

        <div className="journey-footer-art">
          <AsciiHands />
          <p className="journey-footer-caption">
            <span>{closing.line1}</span>
            <span>{closing.line2}</span>
          </p>
        </div>

        <div className="journey-footer-base">
          <p className="journey-footer-status">{closing.status}</p>
          <div className="journey-footer-cols">
            <FooterMeta links={links} />
          </div>
        </div>

        <FooterBar />
      </div>
    </footer>
  )
}
