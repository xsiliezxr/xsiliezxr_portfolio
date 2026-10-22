import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../../shared/hooks/useReducedMotion.js'
import { useLocalized } from '../../../shared/i18n/useLocalized.js'

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
    <div className="relative min-h-0 overflow-hidden border border-ink-700 bg-ink-950">
      <div className="flex items-center justify-between border-b border-ink-700 bg-ink-900 px-4 py-2.5 font-mono text-[11px] text-fog-dim">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 bg-ember-500" aria-hidden="true" />
          <span className="text-ember-300">SISTEMA {num}</span>
        </span>
        <span className="truncate">{project.status}{project.role ? ` · ${project.role}` : ''}</span>
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-950 lg:aspect-auto lg:h-full lg:min-h-[18rem]">
        <img
          src={project.src}
          alt={project.title}
          className="h-full w-full object-cover object-top"
          loading={index === 0 ? 'eager' : 'lazy'}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" aria-hidden="true" />
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
        <span className="font-mono text-[11px] text-amber">
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
            <li key={tag} className="font-mono text-[11px] text-amber">
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
                  className="inline-flex max-w-full items-center gap-1.5 font-mono text-[11px] text-fog-dim underline decoration-ember-500/50 underline-offset-3 transition-colors hover:text-ember-300"
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
            className="inline-flex items-center gap-2 bg-ember-500 px-4 py-2.5 font-mono text-xs font-bold text-ink-950 transition-colors hover:bg-ember-300"
          >
            Demo
            <span aria-hidden="true">↗</span>
          </ExternalLink>
        ) : null}
        {project.repo ? (
          <ExternalLink
            href={project.repo}
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-ember-300 underline decoration-ember-500/50 underline-offset-3 transition-colors hover:text-fog"
          >
            {repoLabel}
            <span aria-hidden="true">→</span>
          </ExternalLink>
        ) : null}
        {(project.links ?? []).map((link) => (
          <ExternalLink
            key={`${link.label}-${link.href}`}
            href={link.href}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-fog-dim underline decoration-ember-500/40 underline-offset-3 transition-colors hover:text-fog"
          >
            {link.label}
            <span aria-hidden="true">↗</span>
          </ExternalLink>
        ))}
      </div>
    </div>
  )
}

function FeaturedCardFace({ project, index, total }) {
  return (
    <div
      className={`grid h-full min-h-0 w-full gap-6 overflow-hidden border border-ink-700 bg-ink-900 p-5 shadow-[0_28px_70px_rgba(0,0,0,0.55)] md:p-7 lg:gap-8 ${project.src ? 'lg:grid-cols-[1.05fr_0.95fr]' : ''}`}
    >
      <FeaturedEvidenceCard project={project} index={index} total={total} />
      <FeaturedVisual project={project} index={index} />
    </div>
  )
}

function FeaturedStack({ projects }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8" aria-label="Proyectos destacados">
      <div className="flex flex-col gap-10">
        {projects.map((project, index) => (
          <article key={project.id} className="min-w-0">
            <FeaturedCardFace project={project} index={index} total={projects.length} />
          </article>
        ))}
      </div>
    </section>
  )
}

const STACK_PEEK = 22

function FeaturedScrub({ projects }) {
  const rootRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const count = projects.length
  const stackPad = Math.max(count - 1, 0) * STACK_PEEK

  useGSAP(() => {
    const root = rootRef.current
    const scroller = document.getElementById('page-scroll')
    if (!root || !scroller) return undefined
    const cards = gsap.utils.toArray('[data-featured-card]', root)
    if (!cards.length) return undefined

    if (cards.length < 2) {
      gsap.set(cards, { yPercent: 0, y: 0, scale: 1, filter: 'none' })
      return undefined
    }

    cards.forEach((card, index) => {
      gsap.set(card, {
        zIndex: index + 1,
        yPercent: index === 0 ? 0 : 108,
        y: 0,
        scale: 1,
        filter: 'brightness(1)',
        transformOrigin: '50% 0%',
      })
    })

    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: root,
        scroller,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.55,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const index = Math.min(
            cards.length - 1,
            Math.max(0, Math.floor(self.progress * cards.length - 0.001)),
          )
          setActiveIndex(index)
        },
      },
    })

    for (let index = 1; index < cards.length; index += 1) {
      const at = index - 1
      for (let depth = 0; depth < index; depth += 1) {
        const layersUnder = index - depth
        timeline.to(cards[depth], {
          y: -(layersUnder * STACK_PEEK),
          scale: 1 - layersUnder * 0.035,
          filter: `brightness(${Math.max(0.42, 1 - layersUnder * 0.22)})`,
          duration: 1,
        }, at)
      }
      timeline.fromTo(
        cards[index],
        { yPercent: 108, y: 0 },
        { yPercent: 0, y: 0, duration: 1 },
        at,
      )
    }

    return undefined
  }, { scope: rootRef, dependencies: [count], revertOnUpdate: true })

  return (
    <section
      ref={rootRef}
      className="relative"
      style={count > 1 ? { height: `${count * 100}dvh` } : undefined}
      aria-label="Proyectos destacados"
    >
      <div className="sticky top-[var(--masthead)] flex h-[calc(100dvh-var(--masthead))] w-full min-w-0 flex-col overflow-hidden px-4 md:px-8">
        <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col py-4 md:py-6">
          <div className="featured-stack relative min-h-0 flex-1">
            {projects.map((project, index) => (
              <article
                key={project.id}
                data-featured-card
                aria-hidden={activeIndex !== index}
                className={`featured-stack-card absolute right-0 bottom-0 left-0 ${activeIndex === index ? '' : 'pointer-events-none'}`}
                style={{ top: stackPad, zIndex: index + 1 }}
              >
                <FeaturedCardFace project={project} index={index} total={count} />
              </article>
            ))}
          </div>
          {count > 1 ? (
            <p className="shrink-0 pt-4 pb-1 font-mono text-xs text-amber">
              {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              <span className="ml-3 text-fog">{projects[activeIndex]?.title}</span>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export function FeaturedProjects({ projects }) {
  const localized = useLocalized(projects)
  const reduced = useReducedMotion()
  if (!localized?.length) return null
  if (reduced) return <FeaturedStack projects={localized} />
  return <FeaturedScrub projects={localized} />
}
