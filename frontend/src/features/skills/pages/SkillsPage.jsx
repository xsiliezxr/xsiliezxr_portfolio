import { useHobbiesStore } from '../../../shared/hobbies/hobbies.store.js'
import learn from '../../../assets/images/hobbies/learn.webp'
import { PageShell } from '../../../shared/components/PageShell.jsx'
import { SkillConstellation } from '../components/SkillConstellation.jsx'

export function SkillsPage() {
  const collect = useHobbiesStore((state) => state.collect)

  return (
    <PageShell path="/skills">
      <div className="mx-auto w-full max-w-6xl py-6 sm:py-8">
        <header className="flex flex-wrap items-end justify-between gap-6 border-b border-ink-700 pb-6">
          <div className="min-w-0 max-w-2xl">
            <h1 className="m-0 font-display text-[clamp(2.25rem,7vw,5.5rem)] font-black uppercase leading-[0.88] tracking-[-0.04em] text-fog">
              Habilidades
            </h1>
            <p className="m-0 mt-3 font-sans text-sm leading-relaxed text-fog-dim sm:text-base">
              Lenguajes, bases de datos y herramientas conectadas en un mismo mapa. Arrastra o selecciona cualquier nodo para inspeccionar sus relaciones.
            </p>
          </div>
          <button
            type="button"
            onClick={() => collect('cleancode')}
            aria-label="Marca de estudio"
            className="group flex shrink-0 items-center gap-3 rounded-[12px] border border-ink-700 bg-ink-900/90 px-3 py-2 transition-colors hover:border-ember-500"
          >
            <img src={learn} alt="" className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105" />
            <span className="hidden text-left font-mono text-[11px] leading-tight text-fog-dim sm:block">
              <span className="block text-ember-300">Pista 04</span>
              Estudio continuo
            </span>
          </button>
        </header>
        <div className="mt-6">
          <SkillConstellation />
        </div>
      </div>
    </PageShell>
  )
}

