function External({ href, className, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" className={className}>
      {children}
    </a>
  )
}

export function ProjectFacts({ project, compact = false, title = 'h2' }) {
  const Title = title
  const extras = [
    project.repo ? { href: project.repo, label: project.repoLabel || 'Repositorio', tone: 'text-amber' } : null,
    project.demo ? { href: project.demo, label: 'Demo', tone: 'text-fog' } : null,
    ...(project.links ?? []).map((link) => ({ href: link.href, label: link.label, tone: 'text-fog-dim' })),
  ].filter(Boolean)

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <p className="font-mono text-xs text-ember-300">
        {project.status}
        {project.role ? ` · ${project.role}` : ''}
      </p>
      <Title className={`font-display font-black uppercase leading-[0.9] tracking-[-0.04em] ${compact ? 'text-[clamp(1.7rem,7vw,2.4rem)]' : 'text-[clamp(2rem,8vw,4.25rem)]'}`}>
        {project.title}
      </Title>
      <p className="copy-bubble copy-bubble-ink max-w-md">{project.summary}</p>
      {project.description ? <p className="copy-bubble copy-bubble-ink max-w-lg">{project.description}</p> : null}
      {project.repos?.length ? (
        <ul className="flex max-w-full flex-wrap gap-2" aria-label="Repositorios del sistema">
          {project.repos.map((repo) => (
            <li key={repo.href} className="max-w-full">
              <External href={repo.href} className="inline-flex max-w-full rounded-[12px] border border-ink-700 px-2 py-1 font-mono text-[11px] break-words hover:text-ember-300">
                {repo.name}{repo.lang ? ` · ${repo.lang}` : ''}
              </External>
            </li>
          ))}
        </ul>
      ) : null}
      {project.tags?.length ? <p className="font-mono text-[11px] text-fog-dim">{project.tags.join(' · ')}</p> : null}
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
