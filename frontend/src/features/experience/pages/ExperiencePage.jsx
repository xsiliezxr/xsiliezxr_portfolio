import { useState } from 'react'
import { PageShell } from '../../../shared/components/PageShell.jsx'
import { experience } from '../../home/content/journey.content.js'
import { EXPERIENCE_FILTERS, experienceEntries, FIELD, WORK } from '../experience.content.js'

const KIND_LABELS = {
  trabajo: 'Trabajo',
  hackaton: 'Hackatón',
  evento: 'Evento',
}

export function ExperiencePage() {
  const [filter, setFilter] = useState('all')
  const visible = filter === 'all' ? experienceEntries : experienceEntries.filter((item) => item.kind === filter)

  const counts = {
    all: experienceEntries.length,
    trabajo: WORK.length,
    hackaton: FIELD.filter((item) => item.kind === 'hackaton').length,
    evento: FIELD.filter((item) => item.kind === 'evento').length,
  }

  return (
    <PageShell path="/experiencia">
      <div className="mx-auto max-w-6xl py-10 md:py-16">
        <div className="grid items-start gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
          <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
            <div>
              <h1
                className="m-0 font-display font-black uppercase tracking-[-0.05em] text-fog [overflow-wrap:anywhere]"
                style={{ fontSize: 'clamp(2.25rem, 7vw, 5.5rem)', lineHeight: 0.9 }}
              >
                Experiencia
              </h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-fog-dim">
                {experience.body}
              </p>
            </div>

            <div className="border border-ink-700 bg-ink-900">
              <div className="flex items-center justify-between border-b border-ink-700 bg-ink-950 px-4 py-2.5">
                <span className="font-mono text-[11px] text-fog-dim">{experience.prompt}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-amber">activo</span>
              </div>
              <div className="terminal-field space-y-3 p-4 font-mono text-xs leading-relaxed">
                <p className="text-fog">
                  <span className="text-amber">$ </span>
                  {experience.command}
                </p>
                <p className="text-fog-dim">
                  Trabajo real desde los 15 años, 400 horas de prácticas en logística aérea, hackatones en Guatemala y El Salvador y participación activa en comunidad.
                </p>
                <div className="grid grid-cols-3 gap-2 border-t border-ink-700 pt-3">
                  <div>
                    <p className="font-display text-2xl font-black text-ember-500">{counts.trabajo}</p>
                    <p className="text-[11px] text-fog-dim">Roles</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl font-black text-ember-500">{counts.hackaton}</p>
                    <p className="text-[11px] text-fog-dim">Hackatones</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl font-black text-ember-500">{counts.evento}</p>
                    <p className="text-[11px] text-fog-dim">Eventos</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2" role="group" aria-label="Filtrar experiencia">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fog-dim">Filtrar registro</p>
              <div className="flex flex-wrap gap-2">
                {EXPERIENCE_FILTERS.map((option) => {
                  const active = filter === option.id
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setFilter(option.id)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 font-mono text-xs transition-colors ${
                        active
                          ? 'bg-ember-500 font-bold text-ink-950'
                          : 'border border-ink-700 bg-ink-900 text-fog hover:border-ember-500 hover:text-ember-300'
                      }`}
                    >
                      <span>{option.label}</span>
                      <span className={active ? 'text-ink-950/80' : 'text-fog-dim'}>({counts[option.id]})</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a href="/projects" className="bg-ember-500 px-4 py-3 text-sm font-bold text-ink-950">
                Ver proyectos
              </a>
              <a href="/history#about-experience" className="border border-ink-700 bg-ink-900 px-4 py-3 text-sm font-bold text-fog hover:border-ember-500">
                Contexto en Historia
              </a>
            </div>
          </aside>

          <section aria-label="Línea de tiempo de experiencia">
            <ol className="relative m-0 list-none border-l border-ink-700 p-0 pl-6 sm:pl-8">
              {visible.map((item, index) => {
                const step = String(index + 1).padStart(2, '0')
                return (
                  <li key={item.id} className="relative pb-8 last:pb-0">
                    <span
                      className="absolute top-5 -left-[5px] size-2.5 bg-ember-500 ring-4 ring-ink-950"
                      aria-hidden="true"
                    />
                    <article className="border border-ink-700 bg-ink-900/90 p-5 transition-colors hover:border-ember-500/60 sm:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink-800 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-ember-500">{step}</span>
                          <span className="font-mono text-xs text-ember-300">{item.when}</span>
                        </div>
                        <span className="border border-ink-700 bg-ink-950 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-fog-dim">
                          {KIND_LABELS[item.kind] || item.kind}
                        </span>
                      </div>
                      <h2 className="mt-4 font-display text-xl font-black uppercase tracking-[-0.03em] text-fog sm:text-2xl">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-fog-dim sm:text-base">
                        {item.detail}
                      </p>
                    </article>
                  </li>
                )
              })}
            </ol>
          </section>
        </div>
      </div>
    </PageShell>
  )
}
