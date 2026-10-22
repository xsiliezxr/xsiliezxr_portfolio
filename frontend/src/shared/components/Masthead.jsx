import { useEffect, useId, useState } from 'react'
import logo from '../../assets/images/brand-logo.png'
import { CHROME, NAV } from '../i18n/copy.js'
import { useLocaleStore } from '../i18n/locale.store.js'
import { isCurrent, SITE_LINKS } from '../siteNav.js'

export function Masthead({ path = '/', markUi = false }) {
  const ui = markUi ? { 'data-ui': true } : {}
  const menuId = useId()
  const [open, setOpen] = useState(false)
  const lang = useLocaleStore((state) => state.lang)
  const setLang = useLocaleStore((state) => state.setLang)
  const chrome = CHROME[lang]
  const labels = NAV[lang]

  useEffect(() => {
    setOpen(false)
  }, [path])

  useEffect(() => {
    if (!open) return undefined

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onResize = () => {
      if (window.matchMedia('(min-width: 768px)').matches) setOpen(false)
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <div className={`masthead${path === '/' ? ' masthead-home' : ''}${open ? ' is-open' : ''}`}>
      <a href="/" className="masthead-name" {...ui}>
        <img className="masthead-logo" src={logo} alt="" />
        Angel Siliezar
      </a>

      <div className="masthead-lang" role="group" aria-label={chrome.lang}>
        <button type="button" aria-pressed={lang === 'es'} onClick={() => setLang('es')} {...ui}>
          ES
        </button>
        <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')} {...ui}>
          EN
        </button>
      </div>

      <button
        type="button"
        className="masthead-toggle"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? chrome.menuClose : chrome.menuOpen}
        onClick={() => setOpen((value) => !value)}
        {...ui}
      >
        <span className={`masthead-burger${open ? ' is-open' : ''}`} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <nav id={menuId} className="masthead-index" aria-label={chrome.nav} data-open={open ? '1' : '0'}>
        <div className="masthead-index-sheet">
          <p className="masthead-drawer-kicker">{chrome.drawer}</p>
          {SITE_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={isCurrent(path, link.href) ? 'page' : undefined}
              onClick={() => setOpen(false)}
              {...ui}
            >
              {labels[link.href] || link.label}
            </a>
          ))}
          <button
            type="button"
            className="masthead-drawer-close"
            onClick={() => setOpen(false)}
            {...ui}
          >
            {chrome.close}
          </button>
        </div>
      </nav>
    </div>
  )
}
