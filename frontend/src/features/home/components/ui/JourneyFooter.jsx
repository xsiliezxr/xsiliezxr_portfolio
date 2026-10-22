import headphones from '../../../../assets/images/hobbies/headphones.webp'
import { HobbyMark } from '../../../../shared/hobbies/HobbyMark.jsx'
import { contact, contactLinks } from '../../../../shared/config/contact.js'
import { CHROME, NAV } from '../../../../shared/i18n/copy.js'
import { useLocaleStore } from '../../../../shared/i18n/locale.store.js'
import { SITE_LINKS } from '../../../../shared/siteNav.js'
import { useLocalized } from '../../../../shared/i18n/useLocalized.js'
import { closing as closingSource } from '../../content/journey.content.js'
import { AsciiHands } from './AsciiHands.jsx'

const YEAR = new Date().getFullYear()

function FooterMeta({ links, chrome, labels }) {
  const map = SITE_LINKS.filter((link) => link.href !== '/')
  return (
    <>
      <nav className="journey-footer-col" aria-label={chrome.footerMap}>
        <p className="journey-footer-label">{chrome.footerMap}</p>
        <ul>
          {map.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{labels[link.href] || link.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="journey-footer-col" aria-label={chrome.footerContact}>
        <p className="journey-footer-label">{chrome.footerContact}</p>
        <ul>
          <li>
            <a href="/contact">{chrome.footerWrite}</a>
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

function FooterBar({ chrome, closing }) {
  return (
    <div className="journey-footer-bar">
      <p className="journey-footer-copy">© {YEAR} Angel Siliezar. {chrome.footerMade}</p>
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
  const lang = useLocaleStore((state) => state.lang)
  const chrome = CHROME[lang]
  const labels = NAV[lang]
  const closing = useLocalized(closingSource)
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
            <FooterMeta links={links} chrome={chrome} labels={labels} />
          </div>
        </div>
        <FooterBar chrome={chrome} closing={closing} />
      </footer>
    )
  }

  return (
    <footer className="journey-footer" data-footer>
      <div className="journey-footer-frame">
        <div className="journey-footer-rail">
          <p className="journey-footer-kicker">Angel Siliezar · {chrome.footerPiece}</p>
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
            <FooterMeta links={links} chrome={chrome} labels={labels} />
          </div>
        </div>

        <FooterBar chrome={chrome} closing={closing} />
      </div>
    </footer>
  )
}
