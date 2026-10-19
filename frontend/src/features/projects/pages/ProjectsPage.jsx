import basket from '../../../assets/images/hobbies/basket.webp'
import { PageShell } from '../../../shared/components/PageShell.jsx'
import { HobbyMark } from '../../../shared/hobbies/HobbyMark.jsx'
import { FeaturedProjects } from '../components/FeaturedProjects.jsx'
import { ProjectArchive } from '../components/ProjectArchive.jsx'
import { archiveProjects, featuredProjects } from '../projects.data.js'

export function ProjectsPage() {
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
        </div>
      </header>
      <FeaturedProjects projects={featuredProjects} />
      <ProjectArchive projects={archiveProjects} />
      <div className="flex justify-center px-5 pt-10 pb-16">
        <HobbyMark id="basketball" image={basket} />
      </div>
    </PageShell>
  )
}

