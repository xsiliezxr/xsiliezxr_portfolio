import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../../shared/hooks/useReducedMotion.js'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function ExternalLink({ href, className, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" className={className}>
      {children}
    </a>
  )
}

function FeaturedVisual({ project, index }) {
  if (!project.src) return null
  const num = String(index + 1).padStart(2, '0')

  return (
    <div className="relative overflow-hidden rounded-[12px] border border-ink-700 bg-ink-900 shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
      <div className="flex items-center justify-between border-b border-ink-700 bg-ink-950 px-4 py-2.5 font-mono text-[11px] text-fog-dim">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-ember-500" aria-hidden="true" />
          <span className="text-ember-300">SISTEMA {num}</span>
        </span>
        <span className="truncate">{project.status}{project.role ? ` · ${project.role}` : ''}</span>
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-950">
        <img
          src={project.src}
          alt={project.title}
          className="h-full w-full object-cover object-top"
          loading={index === 0 ? 'eager' : 'lazy'}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/65 via-transparent to-transparent" aria-hidden="true" />
      </div>
    </div>
  )
}

function FeaturedEvidenceCard({ project, index, total }) {
  const num = String(index + 1).padStart(2, '0')
  const totalLabel = String(total).padStart(2, '0')
  const repoLabel = project.repoLabel || 'Repositorio'

  return (
    <div className="flex min-w-0 flex-col justify-center gap-4">
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="font-mono text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-none text-ember-500">
          {num}
        </span>
        <span className="font-mono text-xs text-fog-dim">/ {totalLabel}</span>
        <span className="rounded-[12px] border border-ink-700 bg-ink-900 px-2.5 py-1 font-mono text-[11px] text-ember-300">
          {project.status}{project.role ? ` · ${project.role}` : ''}
        </span>
      </div>

      <h2 className="m-0 font-display text-[clamp(1.85rem,4.8vw,3.75rem)] font-black uppercase leading-[0.9] tracking-[-0.04em] text-fog">
        {project.title}
      </h2>

      <p className="m-0 max-w-xl font-sans text-sm font-medium leading-relaxed text-fog sm:text-base">
        {project.summary}
      </p>

      {project.description ? (
        <p className="m-0 max-w-xl font-sans text-xs leading-relaxed text-fog-dim sm:text-sm">
          {project.description}
        </p>
      ) : null}

      {project.tags?.length ? (
        <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0" aria-label="Stack técnico">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-[12px] border border-ink-700 bg-ink-950 px-2.5 py-1 font-mono text-[11px] text-amber"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      {project.repos?.length ? (
        <div className="min-w-0">
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fog-dim">
            Arquitectura multi-repositorio ({project.repos.length})
          </p>
          <ul className="m-0 flex max-w-full list-none flex-wrap gap-1.5 p-0" aria-label="Repositorios del sistema">
            {project.repos.map((repo) => (
              <li key={repo.href} className="max-w-full">
                <ExternalLink
                  href={repo.href}
                  className="inline-flex max-w-full items-center gap-1.5 rounded-[12px] border border-ink-700 bg-ink-900 px-2.5 py-1 font-mono text-[11px] text-fog transition-colors hover:border-ember-500 hover:text-ember-300"
                >
                  <span className="truncate">{repo.name}</span>
                  {repo.lang ? <span className="text-fog-dim">· {repo.lang}</span> : null}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-1 flex flex-wrap items-center gap-3">
        {project.demo ? (
          <ExternalLink
            href={project.demo}
            className="inline-flex items-center gap-2 rounded-[12px] bg-ember-500 px-4 py-2.5 font-mono text-xs font-bold text-ink-950 transition-colors hover:bg-ember-300"
          >
            Demo
            <span aria-hidden="true">↗</span>
          </ExternalLink>
        ) : null}
        {project.repo ? (
          <ExternalLink
            href={project.repo}
            className={`inline-flex items-center gap-2 rounded-[12px] px-4 py-2.5 font-mono text-xs font-bold transition-colors ${
              project.demo
                ? 'border border-ink-700 bg-ink-900 text-fog hover:border-ember-500 hover:text-ember-300'
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
            className="inline-flex items-center gap-1.5 rounded-[12px] border border-ink-700 bg-ink-950 px-3 py-2 font-mono text-xs text-fog-dim transition-colors hover:border-ember-500 hover:text-fog"
          >
            {link.label}
            <span aria-hidden="true">↗</span>
          </ExternalLink>
        ))}
      </div>
    </div>
  )
}

function FeaturedStack({ projects }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8" aria-label="Proyectos destacados">
      <div className="flex flex-col gap-8">
        {projects.map((project, index) => (
          <article
            key={project.id}
            className="grid min-w-0 items-center gap-8 rounded-[12px] border border-ink-700 bg-ink-900/70 p-5 sm:p-8 lg:grid-cols-[1.05fr_0.95fr]"
          >
            <FeaturedEvidenceCard project={project} index={index} total={projects.length} />
            <FeaturedVisual project={project} index={index} />
          </article>
        ))}
      </div>
    </section>
  )
}

function FeaturedScrub({ projects }) {
  const rootRef = useRef(null)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const count = projects.length

  useGSAP(() => {
    const root = rootRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    const scroller = document.getElementById('page-scroll')
    if (!root || !viewport || !track || !scroller) return
    const panels = gsap.utils.toArray('[data-featured-panel]', track)
    const marks = gsap.utils.toArray('[data-featured-mark]', root)
    const paint = (index) => {
      setActiveIndex(index)
      marks.forEach((mark, markIndex) => {
        mark.style.background = markIndex === index ? '#ff5b14' : '#2a2826'
      })
    }
    paint(0)

    if (panels.length < 2) {
      gsap.fromTo(panels[0], { opacity: 0, y: 28 }, {
        opacity: 1,
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          scroller,
          start: 'top 78%',
          end: 'top 42%',
          scrub: true,
        },
      })
      return
    }

    gsap.set(panels, { opacity: 0.35 })
    gsap.set(panels[0], { opacity: 1 })
    const fade = 1 / panels.length
    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: root,
        scroller,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => paint(Math.round(self.progress * (panels.length - 1))),
      },
    })
    timeline.to(track, {
      x: () => Math.min(0, viewport.offsetWidth - track.offsetWidth),
      duration: 1,
    }, 0)
    panels.forEach((panel, index) => {
      if (index === 0) return
      const slot = index / (panels.length - 1)
      const at = Math.min(Math.max(0, slot - fade * 0.4), 1 - fade)
      timeline.to(panel, { opacity: 1, duration: fade }, at)
    })
  }, { scope: rootRef, dependencies: [count], revertOnUpdate: true })

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden border-b border-ink-700"
      style={count > 1 ? { height: `${count * 100}dvh` } : undefined}
      aria-label="Proyectos destacados"
    >
      <div
        ref={viewportRef}
        className="sticky top-[calc(var(--masthead)+0.5rem)] flex h-[calc(100dvh-var(--masthead)-0.5rem)] w-full min-w-0 flex-col justify-between overflow-hidden"
      >
        <div ref={trackRef} className="flex min-h-0 flex-1 items-center" style={{ width: `${count * 100}%` }}>
          {projects.map((project, index) => (
            <article
              key={project.id}
              data-featured-panel
              className="flex h-full min-w-0 shrink-0 items-center overflow-hidden px-4 py-4 md:px-8"
              style={{ width: `${100 / count}%` }}
            >
              <div className={`mx-auto grid w-full max-w-7xl min-w-0 items-center gap-6 lg:gap-12 ${project.src ? 'lg:grid-cols-[1.05fr_0.95fr]' : ''}`}>
                <FeaturedEvidenceCard project={project} index={index} total={count} />
                <FeaturedVisual project={project} index={index} />
              </div>
            </article>
          ))}
        </div>

        {count > 1 ? (
          <div className="mx-auto w-full max-w-7xl shrink-0 px-4 pb-5 md:px-8">
            <div className="rounded-[12px] border border-ink-700 bg-ink-900/90 px-4 py-3">
              <div className="mb-2 flex items-center justify-between font-mono text-[11px] text-fog-dim">
                <span>Desplaza para recorrer los sistemas destacados</span>
                <span className="text-ember-300">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')} · {projects[activeIndex]?.title}
                </span>
              </div>
              <div className="flex gap-2" aria-hidden="true">
                {projects.map((project) => (
                  <span key={project.id} data-featured-mark className="h-1.5 min-w-0 flex-1 rounded-full bg-ink-700 transition-colors" />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function FeaturedProjects({ projects, lead }) {
  const reduced = useReducedMotion()
  if (!projects?.length) return null
  if (reduced) return <FeaturedStack projects={projects} lead={lead} />
  return <FeaturedScrub projects={projects} lead={lead} />
}

