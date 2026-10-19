import { useEffect, useId, useState } from 'react'
import logo from '../../assets/images/brand-logo.png'
import { isCurrent, SITE_LINKS } from '../siteNav.js'

export function Masthead({ path = '/', markUi = false }) {
  const ui = markUi ? { 'data-ui': true } : {}
  const menuId = useId()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [path])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onResize = () => {
      if (window.matchMedia('(min-width: 768px)').matches) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <div className={`masthead${path === '/' ? ' masthead-home' : ''}${open ? ' is-open' : ''} backdrop-blur-md`}>
      <a href="/" className="masthead-name" {...ui}>
        <img className="masthead-logo" src={logo} alt="" />
        Angel Siliezar
      </a>

      <button
        type="button"
        className="masthead-toggle"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        onClick={() => setOpen((value) => !value)}
        {...ui}
      >
        <span className="masthead-toggle-mark" aria-hidden="true" />
        <span className="masthead-toggle-label">{open ? 'Cerrar' : 'Menú'}</span>
      </button>

      <nav id={menuId} className="masthead-index" aria-label="Páginas" data-open={open ? '1' : '0'}>
        <span className="masthead-roll" aria-hidden="true" />
        <div className="masthead-index-sheet">
          {SITE_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={isCurrent(path, link.href) ? 'page' : undefined}
              onClick={() => setOpen(false)}
              {...ui}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  )
}
