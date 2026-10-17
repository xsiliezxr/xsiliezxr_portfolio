import { useHobbiesStore } from '../../../shared/hobbies/hobbies.store.js'
import basket from '../../../assets/images/hobbies/basket.webp'
import { PageShell } from '../../../shared/components/PageShell.jsx'
import { FeaturedProjects } from '../components/FeaturedProjects.jsx'
import { ProjectArchive } from '../components/ProjectArchive.jsx'
import { archiveProjects, featuredProjects, projectsLead } from '../projects.data.js'

export function ProjectsPage() {
  const collect = useHobbiesStore((state) => state.collect)

  return (
    <PageShell path="/projects" bleed>
      <header className="mx-auto flex w-full max-w-7xl min-w-0 flex-wrap items-end justify-between gap-6 border-b border-ink-700 px-4 pt-8 pb-6 md:px-8">
        <div className="min-w-0 max-w-3xl">
          <h1 className="min-w-0 font-display text-[clamp(2.25rem,7vw,5.5rem)] font-black uppercase leading-[0.88] tracking-[-0.04em] text-fog">
            Tres{' '}
            <span className="inline-block text-transparent" style={{ WebkitTextStroke: '2px #ff5b14' }}>
              sistemas
            </span>
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-fog-dim sm:text-lg">
            {projectsLead}
          </p>
        </div>
        <button
          type="button"
          onClick={() => collect('basketball')}
          aria-label="Balón de la cancha"
          className="group flex shrink-0 items-center gap-3 rounded-[12px] border border-ink-700 bg-ink-900/90 px-3 py-2 transition-colors hover:border-ember-500"
        >
          <img src={basket} alt="" className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105" />
          <span className="hidden text-left font-mono text-[11px] leading-tight text-fog-dim sm:block">
            <span className="block text-ember-300">Pista 03</span>
            Cancha y equipo
          </span>
        </button>
      </header>
      <FeaturedProjects projects={featuredProjects} lead={projectsLead} />
      <ProjectArchive projects={archiveProjects} />
    </PageShell>
  )
}

