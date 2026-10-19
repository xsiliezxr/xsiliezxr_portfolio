import { useState } from 'react'
import expokinal from '../../../assets/images/gallery/expokinal-2025.webp'
import hackSv from '../../../assets/images/gallery/hack-sv.webp'
import primerHackaton from '../../../assets/images/gallery/primer-hackaton.webp'

const STAGE_IMAGES = {
  'primer-hackaton': primerHackaton,
  'hack-sv': hackSv,
  'expokinal-2025': expokinal,
}

export function PathGraph({ stages }) {
  const [activeId, setActiveId] = useState(stages[0]?.id ?? null)
  const active = stages.find((stage) => stage.id === activeId) ?? stages[0]
  if (!stages.length) return null
  const image = active?.image ? STAGE_IMAGES[active.image] : null

  return (
    <div className="path-graph">
      <div className="path-graph-rail" role="list" aria-label="Camino de trayectoria">
        {stages.map((stage, index) => {
          const on = stage.id === activeId
          return (
            <button
              key={stage.id}
              type="button"
              role="listitem"
              aria-pressed={on}
              className={`path-graph-node ${on ? 'is-active' : ''}`}
              onClick={() => setActiveId(stage.id)}
            >
              <span className="path-graph-dot" aria-hidden="true" />
              <span className="path-graph-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="path-graph-label">{stage.short || stage.rol}</span>
            </button>
          )
        })}
      </div>

      <article className={`path-graph-panel${image ? ' has-media' : ''}`} aria-live="polite">
        {image ? (
          <figure className="path-graph-media m-0">
            <img src={image} alt="" className="path-graph-photo" />
          </figure>
        ) : null}
        <div className="path-graph-copy">
          <p className="m-0 font-mono text-xs text-ember-300">
            {active.fecha}{active.lugar ? ` · ${active.lugar}` : ''}
          </p>
          <h3 className="mt-2 m-0 font-display text-2xl font-black uppercase tracking-[-0.03em] text-fog">
            {active.rol}
          </h3>
          <p className="mt-3 m-0 max-w-2xl text-sm leading-relaxed text-fog-dim sm:text-base">
            {active.arco || active.resumen}
          </p>
        </div>
      </article>
    </div>
  )
}
