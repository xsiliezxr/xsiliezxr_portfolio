import { EnvelopeSimple, GithubLogo, LinkedinLogo, WhatsappLogo } from '@phosphor-icons/react'

const ICONS = {
  email: EnvelopeSimple,
  linkedin: LinkedinLogo,
  github: GithubLogo,
  'github-kinal': GithubLogo,
  whatsapp: WhatsappLogo,
}

export function ContactLinks({ links }) {
  if (links.length === 0) {
    return <p className="text-sm text-fog-dim">Los enlaces se publican cuando estén en el entorno.</p>
  }

  return (
    <div className="flex flex-wrap gap-2" aria-label="Redes y contacto">
      {links.map((link) => {
        const Icon = ICONS[link.id]
        const external = link.href.startsWith('http')
        return (
          <a
            key={link.href}
            href={link.href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer noopener' : undefined}
            className="inline-flex h-11 items-center gap-2 border border-ink-700 px-3 text-sm hover:border-ember-500 hover:text-ember-300"
          >
            {Icon ? <Icon size={16} aria-hidden="true" /> : null}
            {link.label}
          </a>
        )
      })}
    </div>
  )
}
