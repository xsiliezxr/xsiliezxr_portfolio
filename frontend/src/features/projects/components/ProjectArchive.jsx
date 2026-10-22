import { useState } from 'react'
import { useLocalized } from '../../../shared/i18n/useLocalized.js'
import { ARCHIVE_FILTERS } from '../projects.data.js'

function ExternalLink({ href, className, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" className={className}>
      {children}
    </a>
  )
}

export function ProjectArchive({ projects }) {
  const localized = useLocalized(projects)
  const [filter, setFilter] = useState('all')
  const visible = filter === 'all' ? localized : localized.filter((project) => project.group === filter)
  const countLabel = String(visible.length).padStart(2, '0')

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24" aria-labelledby="archive-title">
      <div className="grid gap-6 border-b border-ink-700 pb-8 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-12">
        <div className="flex items-end gap-4">
          <span
            className="font-mono text-[clamp(3.5rem,9vw,6.5rem)] font-bold leading-[0.8] text-ember-500"
            aria-hidden="true"
          >
            {countLabel}
          </span>
          <p className="m-0 pb-1 font-mono text-xs leading-relaxed text-fog-dim uppercase">
            Proyectos
            <br />
            en archivo
          </p>
        </div>

        <div>
          <h2
            id="archive-title"
            className="m-0 font-display text-[clamp(2rem,6vw,4rem)] font-black uppercase leading-[0.9] tracking-[-0.04em] text-fog"
          >
            Más proyectos
          </h2>
          <p className="m-0 mt-3 max-w-2xl font-sans text-sm leading-relaxed text-fog-dim sm:text-base">
            Piezas personales, visión por computadora, backends y laboratorios académicos en Kinal. Cada tarjeta abre su código fuente o despliegue activo.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar archivo">
          {ARCHIVE_FILTERS.map((option) => {
            const active = filter === option.id
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(option.id)}
                className={`rounded-[12px] border px-3.5 py-2 font-mono text-xs transition-colors ${
                  active
                    ? 'border-ember-500 bg-ember-500 font-bold text-ink-950'
                    : 'border-ink-700 bg-ink-900 text-fog hover:border-ember-500/60 hover:text-ember-300'
                }`}
              >
                {option.label}
              </button>
            )
          })}
        </div>
        <p className="m-0 font-mono text-xs text-fog-dim">{countLabel} registros</p>
      </div>

      <ul className="mt-8 grid min-w-0 list-none gap-5 p-0 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, index) => {
          const itemNum = String(index + 1).padStart(2, '0')
          const repoLabel = project.repoLabel || 'Repositorio'

          return (
            <li key={project.id} className="min-w-0">
              <article className="flex h-full min-w-0 flex-col justify-between">
                <div className="flex min-w-0 flex-col gap-3">
                  <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
                    <span className="text-ember-300">
                      #{itemNum} · {project.status}
                    </span>
                    {project.role ? (
                      <span className="truncate text-fog-dim">{project.role}</span>
                    ) : null}
                  </div>

                  <h3 className="m-0 mt-1 font-display text-[clamp(1.5rem,3.5vw,2.1rem)] font-black uppercase leading-[0.95] tracking-[-0.03em] text-fog">
                    {project.title}
                  </h3>

                  <p className="m-0 font-sans text-sm leading-relaxed text-fog">
                    {project.summary}
                  </p>

                  {project.description ? (
                    <p className="m-0 font-sans text-xs leading-relaxed text-fog-dim">
                      {project.description}
                    </p>
                  ) : null}
                </div>

                <div className="mt-6 flex flex-col gap-4 border-t border-ink-700 pt-4">
                  {project.tags?.length ? (
                    <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0" aria-label="Tecnologías">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="font-mono text-[10px] text-amber"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="flex flex-wrap items-center gap-2.5">
                    {project.demo ? (
                      <ExternalLink
                        href={project.demo}
                        className="inline-flex items-center gap-1.5 rounded-[12px] bg-ember-500 px-3.5 py-2 font-mono text-xs font-bold text-ink-950 transition-colors hover:bg-ember-300"
                      >
                        Demo
                        <span aria-hidden="true">↗</span>
                      </ExternalLink>
                    ) : null}
                    {project.repo ? (
                      <ExternalLink
                        href={project.repo}
                        className={`inline-flex items-center gap-1.5 rounded-[12px] px-3.5 py-2 font-mono text-xs font-bold transition-colors ${
                          project.demo
                            ? 'border border-ink-700 bg-ink-950 text-fog hover:border-ember-500 hover:text-ember-300'
                            : 'bg-ember-500 text-ink-950 hover:bg-ember-300'
                        }`}
                      >
                        {repoLabel}
                        <span aria-hidden="true">→</span>
                      </ExternalLink>
                    ) : null}
                    {(project.links ?? []).map((link) => (
                      <ExternalLink
                        key={`${link.label}-${link.href}`}
                        href={link.href}
                        className="inline-flex items-center gap-1 rounded-[12px] border border-ink-700 bg-ink-950 px-3 py-2 font-mono text-[11px] text-fog-dim transition-colors hover:border-ember-500 hover:text-fog"
                      >
                        {link.label}
                        <span aria-hidden="true">↗</span>
                      </ExternalLink>
                    ))}
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

