import { useMemo, useState } from 'react'
import { EditorialBanner } from '../../../shared/components/EditorialBanner.jsx'
import { PageShell } from '../../../shared/components/PageShell.jsx'
import { useLocalized } from '../../../shared/i18n/useLocalized.js'
import { EXPERIENCE_FILTERS, experienceEntries } from '../experience.data.js'

const FILTER_LABELS = {
  trabajo: { es: 'Trabajo', en: 'Work' },
  hackaton: { es: 'Hackatón', en: 'Hackathon' },
  evento: { es: 'Evento', en: 'Event' },
}

const BANNER = [
  { es: 'TRABAJO', en: 'WORK' },
  { es: 'HACKATONES', en: 'HACKATHONS' },
  { es: 'EVENTOS', en: 'EVENTS' },
  { es: 'DETALLE', en: 'DETAIL' },
]

const PAGE = {
  title: { es: 'Experiencia de Angel Siliezar', en: 'Angel Siliezar experience' },
  roles: { es: 'Roles', en: 'Roles' },
  hackathons: { es: 'Hackatones', en: 'Hackathons' },
  filter: { es: 'Filtrar experiencia', en: 'Filter experience' },
  arc: { es: 'Arco en Historia', en: 'Arc in Story' },
  projects: { es: 'Ver proyectos', en: 'See projects' },
  log: { es: 'Registro de experiencia', en: 'Experience log' },
}

const DETAIL = {
  hice: { es: 'Qué hice', en: 'What I built' },
  aprendido: { es: 'Qué aprendí', en: 'What I learned' },
  resolvi: { es: 'Cómo lo resolví', en: 'How I handled it' },
  arco: { es: 'Arco', en: 'Arc' },
}

function DetailBlock({ label, body }) {
  if (!body) return null
  return (
    <div>
      <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ember-300">{label}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-fog">{body}</p>
    </div>
  )
}

export function ExperiencePage() {
  const [filter, setFilter] = useState('all')
  const [openId, setOpenId] = useState(null)
  const page = useLocalized(PAGE)
  const banner = useLocalized(BANNER)
  const filters = useLocalized(EXPERIENCE_FILTERS)
  const labels = useLocalized(FILTER_LABELS)
  const detail = useLocalized(DETAIL)
  const entries = useLocalized(experienceEntries)
  const visible = useMemo(() => {
    const pool = [...entries].sort((a, b) => a.prioridad - b.prioridad)
    if (filter === 'all') return pool
    return pool.filter((item) => item.filtro === filter)
  }, [entries, filter])

  const counts = {
    all: entries.length,
    trabajo: entries.filter((item) => item.filtro === 'trabajo').length,
    hackaton: entries.filter((item) => item.filtro === 'hackaton').length,
  }

  return (
    <PageShell path="/experiencia">
      <div className="mx-auto max-w-6xl py-10 md:py-16">
        <h1 className="sr-only">{page.title}</h1>

        <EditorialBanner phrases={banner} marquee className="mb-10" />

        <div className="grid items-start gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
          <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
            <div className="border border-ink-700 bg-ink-900 p-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="font-display text-2xl font-black text-ember-500">{counts.trabajo}</p>
                  <p className="font-mono text-[11px] text-fog-dim">{page.roles}</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-black text-ember-500">{counts.hackaton}</p>
                  <p className="font-mono text-[11px] text-fog-dim">{page.hackathons}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2" role="group" aria-label={page.filter}>
              <div className="flex flex-wrap gap-2">
                {filters.map((option) => {
                  const active = filter === option.id
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        setFilter(option.id)
                        setOpenId(null)
                      }}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 font-mono text-xs transition-[transform,color,background-color,border-color] duration-150 hover:-translate-y-px active:translate-y-0 active:scale-[0.98] ${
                        active
                          ? 'bg-ember-500 font-bold text-ink-950 hover:bg-ember-300'
                          : 'border border-ink-700 bg-ink-900 text-fog hover:border-ember-500 hover:bg-ink-800 hover:text-ember-300'
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
                {page.arc}
              </a>
              <a href="/projects" className="border border-ink-700 bg-ink-900 px-4 py-3 text-sm font-bold text-fog hover:border-ember-500">
                {page.projects}
              </a>
            </div>
          </aside>

          <section aria-label={page.log}>
            <ol className="relative m-0 list-none p-0">
              {visible.map((item, index) => {
                const step = String(index + 1).padStart(2, '0')
                const open = openId === item.id
                const panelId = `experience-${item.id}`
                return (
                  <li key={item.id} className="relative pb-6 last:pb-0">
                    <article className={`border bg-ink-900 transition-colors ${open ? 'border-ember-500' : 'border-ink-700'}`}>
                      <h2 className="m-0">
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-controls={panelId}
                          onClick={() => setOpenId(open ? null : item.id)}
                          className="w-full p-4 text-left transition-[transform,background-color] duration-150 hover:bg-ink-800 active:scale-[0.995]"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-xs font-bold text-ember-500">#{step}</span>
                              <span className="font-mono text-xs text-ember-300">
                                {item.fecha}{item.lugar ? ` · ${item.lugar}` : ''}
                              </span>
                            </div>
                            <span className="font-mono text-[11px] text-amber">
                              {labels[item.filtro] || item.filtro}
                              <span className="ml-2 text-fog-dim" aria-hidden="true">{open ? '−' : '+'}</span>
                            </span>
                          </div>
                          <span className="mt-3 block font-display text-xl font-black uppercase tracking-[-0.03em] text-fog sm:text-2xl">
                            {item.rol}
                          </span>
                          <span className="mt-2 block text-sm font-normal normal-case leading-relaxed tracking-normal text-fog-dim sm:text-base">
                            {item.resumen}
                          </span>
                        </button>
                      </h2>
                      {open ? (
                        <div id={panelId} className="grid gap-4 border-t border-ink-700 px-4 py-4">
                          <DetailBlock label={detail.hice} body={item.hice} />
                          <DetailBlock label={detail.aprendido} body={item.aprendido} />
                          <DetailBlock label={detail.resolvi} body={item.resolvi} />
                          {item.arco ? <DetailBlock label={detail.arco} body={item.arco} /> : null}
                        </div>
                      ) : null}
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
