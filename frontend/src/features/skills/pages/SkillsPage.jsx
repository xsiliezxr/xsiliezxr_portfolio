import { PageShell } from '../../../shared/components/PageShell.jsx'
import { SkillConstellation } from '../components/SkillConstellation.jsx'

export function SkillsPage() {
  return (
    <PageShell path="/skills">
      <div className="mx-auto w-full max-w-6xl py-6 sm:py-8">
        <h1 className="sr-only">Habilidades de Angel Siliezar</h1>
        <p className="m-0 max-w-2xl border-b border-ink-700 pb-6 font-sans text-sm leading-relaxed text-fog-dim sm:text-base">
          Lenguajes, bases de datos y herramientas en un mismo mapa. Arrastra o selecciona un nodo para ver relaciones.
        </p>
        <div className="mt-6">
          <SkillConstellation />
        </div>
      </div>
    </PageShell>
  )
}

