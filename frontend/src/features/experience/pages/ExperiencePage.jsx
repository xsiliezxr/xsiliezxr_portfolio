import { useState } from 'react'
import { EditorialBanner } from '../../../shared/components/EditorialBanner.jsx'
import { PageShell } from '../../../shared/components/PageShell.jsx'
import { EXPERIENCE_FILTERS, experienceEntries, listExperience } from '../experience.data.js'

const FILTER_LABELS = {
  trabajo: 'Trabajo',
  hackaton: 'Hackatón',
  evento: 'Evento',
}

const BANNER = ['TRABAJO', 'HACKATONES', 'EVENTOS', 'DETALLE']

export function ExperiencePage() {
  const [filter, setFilter] = useState('all')
  const visible = listExperience(filter)

  const counts = {
    all: experienceEntries.length,
    trabajo: experienceEntries.filter((item) => item.filtro === 'trabajo').length,
    hackaton: experienceEntries.filter((item) => item.filtro === 'hackaton').length,
    evento: experienceEntries.filter((item) => item.filtro === 'evento').length,
  }

  return (
    <PageShell path="/experiencia">
      <div className="mx-auto max-w-6xl py-10 md:py-16">
        <h1 className="sr-only">Experiencia de Angel Siliezar</h1>

        <EditorialBanner phrases={BANNER} marquee className="mb-10" />

        <div className="grid items-start gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
          <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
            <div className="border border-ink-700 bg-ink-900 p-4">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="font-display text-2xl font-black text-ember-500">{counts.trabajo}</p>
                  <p className="font-mono text-[11px] text-fog-dim">Roles</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-black text-ember-500">{counts.hackaton}</p>
                  <p className="font-mono text-[11px] text-fog-dim">Hackatones</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-black text-ember-500">{counts.evento}</p>
                  <p className="font-mono text-[11px] text-fog-dim">Eventos</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2" role="group" aria-label="Filtrar experiencia">
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
              <a href="/history#about-path" className="bg-ember-500 px-4 py-3 text-sm font-bold text-ink-950">
                Arco en Historia
              </a>
              <a href="/projects" className="border border-ink-700 bg-ink-900 px-4 py-3 text-sm font-bold text-fog hover:border-ember-500">
                Ver proyectos
              </a>
            </div>
          </aside>

          <section aria-label="Registro de experiencia">
            <ol className="relative m-0 list-none p-0">
              {visible.map((item, index) => {
                const step = String(index + 1).padStart(2, '0')
                return (
                  <li key={item.id} className="relative pb-6 last:pb-0">
                    <article className="border border-ink-700 bg-ink-900 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-ember-500">#{step}</span>
                          <span className="font-mono text-xs text-ember-300">
                            {item.fecha}{item.lugar ? ` · ${item.lugar}` : ''}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-amber">
                          {FILTER_LABELS[item.filtro] || item.filtro}
                        </span>
                      </div>
                      <h2 className="mt-3 font-display text-xl font-black uppercase tracking-[-0.03em] text-fog sm:text-2xl">
                        {item.rol}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-fog-dim sm:text-base">
                        {item.resumen}
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
