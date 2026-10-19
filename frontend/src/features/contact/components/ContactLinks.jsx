import { EnvelopeSimple, GithubLogo, LinkedinLogo } from '@phosphor-icons/react'

const ICONS = {
  email: EnvelopeSimple,
  linkedin: LinkedinLogo,
  github: GithubLogo,
  'github-kinal': GithubLogo,
}

export function ContactLinks({ links }) {
  if (links.length === 0) {
    return (
      <p className="m-0 text-sm text-fog-dim">
        Configura email, LinkedIn y GitHub en el entorno (<span className="text-ember-300">VITE_*</span>).
      </p>
    )
  }

  return (
    <ul className="m-0 flex list-none flex-col gap-1 p-0" aria-label="Redes y contacto">
      {links.map((link) => {
        const Icon = ICONS[link.id]
        const external = link.href.startsWith('http')
        return (
          <li key={link.href}>
            <a
              href={link.href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer noopener' : undefined}
              className="group flex min-h-11 items-center gap-3 border-b border-ink-700 px-1 py-2.5 transition-colors last:border-b-0 hover:text-ember-300"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center text-ember-500">
                {Icon ? <Icon size={18} weight="bold" aria-hidden="true" /> : null}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-xs font-bold uppercase tracking-[0.08em] text-fog group-hover:text-ember-300">
                  {link.label}
                </span>
                {link.hint ? (
                  <span className="mt-0.5 block truncate font-mono text-[11px] text-fog-dim">{link.hint}</span>
                ) : null}
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
