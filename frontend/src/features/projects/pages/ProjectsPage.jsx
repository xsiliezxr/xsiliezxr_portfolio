import basket from '../../../assets/images/hobbies/basket.webp'
import { PageShell } from '../../../shared/components/PageShell.jsx'
import { HobbyMark } from '../../../shared/hobbies/HobbyMark.jsx'
import { useLocalized } from '../../../shared/i18n/useLocalized.js'
import { FeaturedProjects } from '../components/FeaturedProjects.jsx'
import { ProjectArchive } from '../components/ProjectArchive.jsx'
import { archiveProjects, featuredProjects } from '../projects.data.js'

const HEAD = {
  lead: { es: 'Tres', en: 'Three' },
  accent: { es: 'Más destacados', en: ' More Featured Projects' },
}

export function ProjectsPage() {
  const head = useLocalized(HEAD)
  return (
    <PageShell path="/projects" bleed>
      <header className="mx-auto flex w-full max-w-7xl min-w-0 flex-wrap items-end justify-between gap-6 border-b border-ink-700 pt-8 pb-6 ">
        <div className="min-w-0 max-w-5xl">
          <h1 className="min-w-0 font-display text-[clamp(2.25rem,7vw,4.5rem)] font-black uppercase leading-[0.88] tracking-[-0.04em] text-fog">
            {head.lead}{' '}
            <span className="inline-block text-transparent" style={{ WebkitTextStroke: '2px #ff5b14' }}>
              {head.accent}
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

