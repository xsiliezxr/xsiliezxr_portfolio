import { useEffect, useState } from 'react'
import cvUrl from '../../../assets/cv/cv-siliezar.pdf'
import hack from '../../../assets/images/gallery/hack-sv.webp'
import llegada from '../../../assets/images/gallery/llegada-kinal.webp'
import portrait from '../../../assets/images/siliezar-photo2.webp'
import { PageShell } from '../../../shared/components/PageShell.jsx'
import { about, experience, studies } from '../../home/content/journey.content.js'

const SECTIONS = [
  { id: 'history', number: '01', label: 'Historia' },
  { id: 'study', number: '02', label: 'Estudios' },
  { id: 'experience', number: '03', label: 'Trayectoria' },
]

export function HistoryPage() {
  const [active, setActive] = useState(SECTIONS[0].id)

  useEffect(() => {
    const root = document.getElementById('page-scroll')
    const nodes = SECTIONS.map((section) => document.getElementById(`about-${section.id}`)).filter(Boolean)
    if (!nodes.length) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const id = visible[0]?.target?.id?.replace(/^about-/, '')
        if (id) setActive(id)
      },
      { root, rootMargin: '-35% 0px -45% 0px', threshold: [0.15, 0.4, 0.7] },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <PageShell path="/history">
      <nav
        className="sticky top-[var(--masthead)] z-20 -mx-4 flex items-center gap-6 overflow-x-auto border-b border-ink-700 bg-ink-950/95 px-4 py-3 backdrop-blur md:-mx-8 md:px-8"
        aria-label="Secciones de la historia"
      >
        {SECTIONS.map((section) => {
          const isCurrentSection = active === section.id
          return (
            <a
              key={section.id}
              href={`#about-${section.id}`}
              aria-current={isCurrentSection ? 'true' : undefined}
              className={`inline-flex shrink-0 items-center gap-2 font-mono text-xs transition-colors ${
                isCurrentSection ? 'font-bold text-ember-500' : 'text-fog-dim hover:text-fog'
              }`}
            >
              <span className={isCurrentSection ? 'text-ember-500' : 'text-ember-300/70'}>{section.number}</span>
              <span>{section.label}</span>
            </a>
          )
        })}
      </nav>

      <div className="mx-auto max-w-6xl">
        <section
          id="about-history"
          className="relative grid scroll-mt-28 items-start gap-12 py-16 md:py-24 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16"
        >
          <p
            className="pointer-events-none absolute top-6 right-0 select-none font-display font-black text-fog/[0.04] uppercase"
            style={{ fontSize: 'clamp(4.5rem, 14vw, 9rem)', lineHeight: 0.85 }}
            aria-hidden="true"
          >
            01
          </p>
          <div className="relative z-10">
            <h1
              className="m-0 font-display font-black uppercase tracking-[-0.05em] text-fog [overflow-wrap:anywhere]"
              style={{ fontSize: 'clamp(2.25rem, 7vw, 5.5rem)', lineHeight: 0.9 }}
            >
              {about.title}
            </h1>
            <p className="mt-4 font-mono text-xs text-ember-300">{about.meta}</p>

            <div className="mt-8 space-y-5">
              {about.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 28)}
                  className={
                    index === 0
                      ? 'max-w-2xl text-base font-medium leading-relaxed text-fog sm:text-lg'
                      : 'max-w-2xl text-base leading-relaxed text-fog-dim'
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={cvUrl}
                download="Angel-Siliezar-CV.pdf"
                className="bg-ember-500 px-5 py-3 text-sm font-bold text-ink-950"
              >
                Descargar CV
              </a>
              <a
                href="/gallery"
                className="border border-ink-700 bg-ink-900 px-5 py-3 text-sm font-bold text-fog hover:border-ember-500"
              >
                Explorar galería
              </a>
            </div>
          </div>

          <div className="relative z-10 lg:pt-4">
            <figure className="m-0 border border-ink-700 bg-paper p-3.5 text-paper-ink shadow-[8px_8px_0_rgba(255,91,20,0.22)] sm:p-4 lg:ml-auto lg:max-w-md">
              <img
                src={portrait}
                alt={about.meta}
                className="aspect-[3/4] w-full object-cover"
              />
              <figcaption className="mt-3 flex items-center justify-between border-t border-paper-ink/15 pt-2.5 font-mono text-xs text-paper-ink">
                <span>Ciudad de Guatemala</span>
                <span>2007 · Presente</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section
          id="about-study"
          className="relative grid scroll-mt-28 items-center gap-12 border-t border-ink-800 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
        >
          <p
            className="pointer-events-none absolute top-6 right-0 select-none font-display font-black text-fog/[0.04] uppercase"
            style={{ fontSize: 'clamp(4.5rem, 14vw, 9rem)', lineHeight: 0.85 }}
            aria-hidden="true"
          >
            02
          </p>
          <figure className="relative z-10 m-0 border border-ink-700 bg-paper p-3.5 text-paper-ink shadow-[8px_8px_0_rgba(255,91,20,0.22)] sm:p-4">
            <img
              src={llegada}
              alt="Llegada a Fundación Kinal"
              className="aspect-[5/4] w-full object-cover"
            />
            <figcaption className="mt-3 flex items-center justify-between border-t border-paper-ink/15 pt-2.5 font-mono text-xs text-paper-ink">
              <span>Fundación Kinal</span>
              <span>Desarrollo de Software</span>
            </figcaption>
          </figure>

          <div className="relative z-10">
            <h2
              className="m-0 font-display font-black uppercase tracking-[-0.04em] text-fog"
              style={{ fontSize: 'clamp(2rem, 5.5vw, 4.25rem)', lineHeight: 0.92 }}
            >
              {about.studyTitle}
            </h2>
            <p className="mt-3 font-mono text-xs text-ember-300">{about.studyRole}</p>

            <div className="mt-6 space-y-4">
              {about.studyParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 28)} className="max-w-xl text-base leading-relaxed text-fog-dim">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <article className="border border-ink-700 bg-ink-900 p-4">
                <h3 className="font-display text-base font-extrabold uppercase text-fog">{studies.leftTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fog-dim">{studies.leftBody}</p>
              </article>
              <article className="border border-ink-700 bg-ink-900 p-4">
                <h3 className="font-display text-base font-extrabold uppercase text-fog">{studies.rightTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fog-dim">{studies.rightBody}</p>
              </article>
            </div>

            <p className="mt-6 flex flex-wrap gap-6 font-mono text-xs">
              <a href="/gallery?frame=1" className="text-ember-300 underline decoration-ember-500/50 underline-offset-4 hover:text-ember-500">
                Fotos de esa etapa →
              </a>
              <a href="/certificaciones" className="text-ember-300 underline decoration-ember-500/50 underline-offset-4 hover:text-ember-500">
                Ver los diplomas →
              </a>
            </p>
          </div>
        </section>

        <section
          id="about-experience"
          className="relative grid scroll-mt-28 items-start gap-12 border-t border-ink-800 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"
        >
          <p
            className="pointer-events-none absolute top-6 right-0 select-none font-display font-black text-fog/[0.04] uppercase"
            style={{ fontSize: 'clamp(4.5rem, 14vw, 9rem)', lineHeight: 0.85 }}
            aria-hidden="true"
          >
            03
          </p>
          <div className="relative z-10">
            <h2
              className="m-0 font-display font-black uppercase tracking-[-0.04em] text-fog"
              style={{ fontSize: 'clamp(2rem, 5.5vw, 4.25rem)', lineHeight: 0.92 }}
            >
              Trayectoria
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-fog-dim">
              {experience.body}
            </p>

            <ol className="mt-8 list-none space-y-4 border-l border-ink-700 p-0 pl-5 sm:pl-7">
              {experience.timeline.map((item, index) => (
                <li key={item.title} className="relative">
                  <span
                    className="absolute top-5 -left-[25px] size-2.5 bg-ember-500 ring-4 ring-ink-950 sm:-left-[33px]"
                    aria-hidden="true"
                  />
                  <article className="border border-ink-700 bg-ink-900/90 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs text-ember-300">{item.date}</span>
                      <span className="font-mono text-[11px] text-fog-dim">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-extrabold uppercase tracking-[-0.02em] text-fog">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-fog-dim">{item.detail}</p>
                    {item.links?.length ? (
                      <p className="mt-3 flex flex-wrap gap-4 font-mono text-xs">
                        {item.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            className="text-ember-300 underline decoration-ember-500/40 underline-offset-4 hover:text-ember-500"
                          >
                            {link.label}
                          </a>
                        ))}
                      </p>
                    ) : null}
                  </article>
                </li>
              ))}
            </ol>

            <div className="mt-14">
              <h2 className="font-display text-3xl font-black uppercase tracking-[-0.03em] text-fog sm:text-4xl">
                Reconocimientos
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {about.awards.map((item) => (
                  <article key={item.title} className="border border-ink-700 bg-ink-900 p-5">
                    <p className="font-mono text-xs text-ember-300">{item.date}</p>
                    <h3 className="mt-2 font-display text-lg font-extrabold uppercase text-fog">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-fog-dim">{item.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-6 lg:sticky lg:top-28">
            <figure className="m-0 border border-ink-700 bg-paper p-3.5 text-paper-ink shadow-[8px_8px_0_rgba(255,91,20,0.22)] sm:p-4">
              <img
                src={hack}
                alt="Hackathon en El Salvador"
                className="aspect-[5/4] w-full object-cover"
              />
              <figcaption className="mt-3 flex items-center justify-between border-t border-paper-ink/15 pt-2.5 font-mono text-xs text-paper-ink">
                <span>Hackathones</span>
                <span>UVG · UFG</span>
              </figcaption>
            </figure>

            <blockquote className="comic-panel m-0 bg-paper p-5 text-paper-ink">
              <p className="font-display text-xl font-black uppercase leading-tight sm:text-2xl">
                «{about.quote}»
              </p>
              <footer className="mt-3 border-t border-paper-ink/20 pt-2 font-mono text-xs text-paper-ink">
                {about.author}
              </footer>
            </blockquote>
          </div>
        </section>

        <div className="flex flex-wrap gap-3 border-t border-ink-800 pt-8 pb-8">
          <a href="/projects" className="bg-ember-500 px-5 py-3 text-sm font-bold text-ink-950">
            Ver proyectos
          </a>
          <a href="/contact" className="border border-fog/40 px-5 py-3 text-sm font-bold text-fog hover:border-ember-500">
            Contacto
          </a>
        </div>
      </div>
    </PageShell>
  )
}
