import { forwardRef, useState } from 'react'
import control from '../../../../assets/images/hobbies/control.webp'
import photo from '../../../../assets/images/siliezar-photo.webp'
import hiddenPhoto from '../../../../assets/images/siliezar-photo2.webp'
import { Button } from '../../../../shared/components/ui/Button.jsx'
import { HobbyMark } from '../../../../shared/hobbies/HobbyMark.jsx'
import { CHROME } from '../../../../shared/i18n/copy.js'
import { useLocaleStore } from '../../../../shared/i18n/locale.store.js'
import { useLocalized } from '../../../../shared/i18n/useLocalized.js'
import { about as aboutSource, hero as heroSource, welcome as welcomeSource } from '../../content/journey.content.js'
import { floorAnchor, scrollToProgress } from '../../lib/journeyRig.js'
import { useJourneyStore } from '../../store/journey.store.js'
import { replayWelcomeTour, useWelcomeTour } from '../../tour/useWelcomeTour.js'
import { CorridorLayout, FloorCard } from './FloorCard.jsx'

export function WelcomeFloor() {
  const lang = useLocaleStore((state) => state.lang)
  const about = useLocalized(aboutSource)
  const welcome = useLocalized(welcomeSource)
  useWelcomeTour(true)

  const left = (
    <FloorCard slot="nw" band="top" tone="ink">
      <div data-tour="welcome">
        <p className="journey-card-meta">{welcome.meta}</p>
        <h2 className="journey-card-title mt-1 text-base md:text-lg">{welcome.title}</h2>
        <p className="mt-2 text-xs leading-relaxed text-fog md:text-sm">{welcome.body}</p>
        <p className="mt-2 font-mono text-[11px] text-amber" data-hint="model">
          {welcome.hintTower}
        </p>
        <p className="mt-2 font-mono text-[11px] text-amber" data-hint="model">
          {welcome.hintChat}
        </p>
        <button
          type="button"
          data-ui
          onClick={() => replayWelcomeTour(lang)}
          className="mt-3 inline-flex h-9 items-center border border-ink-700 bg-ink-950 px-3 font-mono text-[11px] text-ember-300 transition-colors hover:border-ember-500 hover:text-ember-100 active:scale-[0.98]"
        >
          {welcome.replayTour}
        </button>
      </div>
    </FloorCard>
  )

  const right = (
    <FloorCard slot="se" band="bottom" tone="ink">
      <div data-tour="route">
        <p className="journey-card-meta">{welcome.routeMeta}</p>
        <h2 className="journey-card-title mt-1 text-base md:text-lg">{about.indexTitle}</h2>
        <div className="mt-2.5 grid grid-cols-2 gap-1.5">
          {about.stops.map((stop, idx) => (
            <button
              key={stop.id}
              type="button"
              data-ui
              onClick={() => scrollToProgress(floorAnchor(stop.id), 'smooth')}
              className="flex items-center justify-between border border-ink-700 bg-ink-950 px-2.5 py-1.5 text-left font-mono text-[11px] text-fog transition-colors hover:border-ember-500 hover:text-ember-300 active:scale-[0.98]"
            >
              <span className="truncate">{stop.label}</span>
              <span className="ml-1.5 text-ember-500">0{4 - idx}</span>
            </button>
          ))}
        </div>
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
  const chrome = CHROME[useLocaleStore((state) => state.lang)]
  const hero = useLocalized(heroSource)
  const experienceAt = floorAnchor('experience')
  const contactAt = floorAnchor('closing')

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
        className="absolute inset-0 h-full w-full object-cover opacity-80 grayscale-60"
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
          <p className="journey-hero-role">{chrome.heroRole}</p>
          <p className="journey-hero-stack">{chrome.heroStack}</p>
          <p className="journey-hero-purpose">{chrome.heroPurpose}</p>
          <div className="journey-hero-actions">
            <Button onClick={() => scrollToProgress(experienceAt)}>{chrome.heroPrimary}</Button>
            <Button tone="ghost" onClick={() => scrollToProgress(contactAt)}>
              {chrome.heroSecondary}
            </Button>
            <button
              type="button"
              data-ui
              onClick={replayIntro}
              className="h-11 px-3 font-mono text-xs text-fog-dim transition-colors hover:text-fog active:scale-[0.98]"
            >
              {chrome.replay}
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
            className="absolute inset-0 h-full w-full object-cover grayscale-50 contrast-115"
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
