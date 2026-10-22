import { PageShell } from '../../../shared/components/PageShell.jsx'
import { useLocalized } from '../../../shared/i18n/useLocalized.js'
import { SkillConstellation } from '../components/SkillConstellation.jsx'

const PAGE = {
  title: { es: 'Habilidades de Angel Siliezar', en: 'Angel Siliezar skills' },
  intro: {
    es: 'Lenguajes, bases de datos y herramientas en un mismo mapa. Arrastra o selecciona un nodo para ver relaciones.',
    en: 'Languages, databases, and tools on one map. Drag or select a node to see how they connect.',
  },
}

export function SkillsPage() {
  const page = useLocalized(PAGE)

  return (
    <PageShell path="/skills">
      <div className="mx-auto w-full max-w-6xl py-6 sm:py-8">
        <h1 className="sr-only">{page.title}</h1>
        <p className="m-0 max-w-2xl border-b border-ink-700 pb-6 font-sans text-sm leading-relaxed text-fog-dim sm:text-base">
          {page.intro}
        </p>
        <div className="mt-6">
          <SkillConstellation />
        </div>
      </div>
    </PageShell>
  )
}

