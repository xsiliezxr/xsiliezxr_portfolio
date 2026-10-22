import { useLocalized } from '../../../shared/i18n/useLocalized.js'

function External({ href, className, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" className={className}>
      {children}
    </a>
  )
}

export function ProjectFacts({ project, compact = false, title = 'h2' }) {
  const item = useLocalized(project)
  const Title = title
  const extras = [
    item.repo ? { href: item.repo, label: item.repoLabel || 'Repositorio', tone: 'text-amber' } : null,
    item.demo ? { href: item.demo, label: 'Demo', tone: 'text-fog' } : null,
    ...(item.links ?? []).map((link) => ({ href: link.href, label: link.label, tone: 'text-fog-dim' })),
  ].filter(Boolean)

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <p className="font-mono text-xs text-ember-300">
        {item.status}
        {item.role ? ` · ${item.role}` : ''}
      </p>
      <Title className={`font-display font-black uppercase leading-[0.9] tracking-[-0.04em] ${compact ? 'text-[clamp(1.7rem,7vw,2.4rem)]' : 'text-[clamp(2rem,8vw,4.25rem)]'}`}>
        {item.title}
      </Title>
      <p className="copy-bubble copy-bubble-ink max-w-md">{item.summary}</p>
      {item.description ? <p className="copy-bubble copy-bubble-ink max-w-lg">{item.description}</p> : null}
      {item.repos?.length ? (
        <ul className="flex max-w-full flex-wrap gap-2" aria-label="Repositorios del sistema">
          {item.repos.map((repo) => (
            <li key={repo.href} className="max-w-full">
              <External href={repo.href} className="inline-flex max-w-full rounded-[12px] border border-ink-700 px-2 py-1 font-mono text-[11px] break-words hover:text-ember-300">
                {repo.name}{repo.lang ? ` · ${repo.lang}` : ''}
              </External>
            </li>
          ))}
        </ul>
      ) : null}
      {item.tags?.length ? <p className="font-mono text-[11px] text-fog-dim">{item.tags.join(' · ')}</p> : null}
      {extras.length ? (
        <p className="flex max-w-full flex-wrap gap-x-4 gap-y-2 font-mono text-xs">
          {extras.map((link) => (
            <External key={`${link.label}-${link.href}`} href={link.href} className={link.tone}>
              {link.label}
            </External>
          ))}
        </p>
      ) : null}
    </div>
  )
}
