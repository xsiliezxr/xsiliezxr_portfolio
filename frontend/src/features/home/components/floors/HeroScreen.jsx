import { forwardRef, useState } from 'react'
import control from '../../../../assets/images/hobbies/control.webp'
import photo from '../../../../assets/images/siliezar-photo.webp'
import hiddenPhoto from '../../../../assets/images/siliezar-photo2.webp'
import { Button } from '../../../../shared/components/ui/Button.jsx'
import { HobbyMark } from '../../../../shared/hobbies/HobbyMark.jsx'
import { about, hero, indicator } from '../../content/journey.content.js'
import { scrollToProgress } from '../../lib/journeyRig.js'
import { useJourneyStore } from '../../store/journey.store.js'
import { CorridorLayout, FloorCard } from './FloorCard.jsx'

export function WelcomeFloor() {
  const left = (
    <FloorCard slot="nw" band="top" tone="ink">
      <p className="journey-card-meta">PISO 05 · ESCRITORIO 3D</p>
      <h2 className="journey-card-title mt-1 text-base md:text-lg">Punto de partida</h2>
      <p className="mt-2 text-xs leading-relaxed text-fog md:text-sm">
        Todo empezó desarmando una PC a los 12 años. Baja con el scroll para recorrer cada piso junto al elevador.
      </p>
      <p className="mt-2 font-mono text-[11px] text-amber" data-hint="model">
        Interactivo: haz clic en la torre o el teclado del setup para cambiar las luces.
      </p>
    </FloorCard>
  )

  const right = (
    <FloorCard slot="se" band="bottom" tone="ink">
      <p className="journey-card-meta">MAPA DEL DESCENSO</p>
      <h2 className="journey-card-title mt-1 text-base md:text-lg">{about.indexTitle}</h2>
      <div className="mt-2.5 grid grid-cols-2 gap-1.5">
        {about.stops.map((stop, idx) => (
          <button
            key={stop.id}
            type="button"
            data-ui
            onClick={() => scrollToProgress(stop.progress)}
            className="flex items-center justify-between border border-ink-700 bg-ink-950 px-2.5 py-1.5 text-left font-mono text-[11px] text-fog transition-colors hover:border-ember-500 hover:text-ember-300"
          >
            <span className="truncate">{stop.label}</span>
            <span className="ml-1.5 text-ember-500">0{4 - idx}</span>
          </button>
        ))}
      </div>
    </FloorCard>
  )

  return (
    <div className="journey-panel">
      <CorridorLayout left={left} right={right} />
    </div>
  )
}

export const HeroScreen = forwardRef(function HeroScreen({ placement = 'fixed' }, ref) {
  const [narrow] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const [hole, setHole] = useState(null)
  const replayIntro = useJourneyStore((state) => state.replayIntro)
  const experienceAt = indicator.find((item) => item.id === 'experience')?.progress ?? 0.46
  const contactAt = indicator.find((item) => item.id === 'closing')?.progress ?? 0.75

  const peel = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    setHole({ x, y })
  }

  const plate = placement === 'fixed'

  return (
    <div ref={ref} className={plate ? 'journey-hero-plate' : 'journey-hero-flow'}>
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-40 grayscale"
        autoPlay
        muted
        loop
        playsInline
        poster={photo}
      >
        <source src={narrow ? '/video/hero_movil.webm' : '/video/hero_desktop.mp4'} type={narrow ? 'video/webm' : 'video/mp4'} />
      </video>
      <div className="absolute inset-0 bg-ink-950/72" />
      <div className="journey-hero-layout">
        <div className="journey-hero-copy">
          <h1>
            {hero.first}
            <span>{hero.last}</span>
          </h1>
          <p className="journey-hero-role">{hero.role}</p>
          <p className="journey-hero-stack">{hero.stack}</p>
          <p className="journey-hero-purpose">{hero.purpose}</p>
          <div className="journey-hero-actions">
            <Button onClick={() => scrollToProgress(experienceAt)}>{hero.primary}</Button>
            <Button tone="ghost" onClick={() => scrollToProgress(contactAt)}>
              {hero.secondary}
            </Button>
            <button type="button" data-ui onClick={replayIntro} className="h-11 px-3 font-mono text-xs text-fog-dim">
              Ver intro
            </button>
          </div>
        </div>
        <div
          tabIndex={0}
          onPointerMove={peel}
          onPointerLeave={() => setHole(null)}
          onFocus={() => setHole((current) => current ?? { x: 50, y: 58 })}
          onBlur={(event) => {
            if (event.currentTarget.contains(event.relatedTarget)) return
            setHole(null)
          }}
          className="journey-hero-photo"
        >
          <img src={hiddenPhoto} alt="" className="h-full w-full object-cover" />
          <img
            src={photo}
            alt={hero.photoAlt}
            className="absolute inset-0 h-full w-full object-cover grayscale contrast-125"
            style={hole ? { WebkitMaskImage: `radial-gradient(circle at ${hole.x}% ${hole.y}%, transparent 16%, #000 46%)`, maskImage: `radial-gradient(circle at ${hole.x}% ${hole.y}%, transparent 16%, #000 46%)` } : undefined}
          />
          {hole ? (
            <span
              className="absolute z-[2]"
              style={{ left: `${hole.x}%`, top: `${hole.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <HobbyMark id="control" image={control} />
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
})
