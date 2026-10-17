import consoleShot from '../../../../assets/images/console.png'
import { experience } from '../../content/journey.content.js'
import { CorridorLayout, FloorCard } from './FloorCard.jsx'

function Typed({ text, token }) {
  return Array.from(text).map((char, index) => (
    <span key={`${token}-${index}`} data-type={token}>
      {char === ' ' ? '\u00a0' : char}
    </span>
  ))
}

export function ExperienceWash() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-ink-950" aria-hidden="true">
      <div
        data-depth="back"
        className="journey-atmo-photo opacity-45"
        style={{ '--sheet-image': `url("${consoleShot}")` }}
      />
      <div
        data-depth="mid"
        className="terminal-field absolute inset-x-[6%] top-[14%] bottom-[16%] hidden border border-ink-700/80 bg-ink-950/65 shadow-[0_24px_70px_rgba(0,0,0,0.75)] md:block"
        style={{
          transform: 'perspective(1100px) rotateX(6deg) rotateY(-4deg)',
        }}
      >
        <div className="flex items-center justify-between border-b border-ink-700 bg-ink-900/90 px-4 py-2 font-mono text-[11px] text-fog-dim">
          <span>angel@kinal:~/trayectoria</span>
          <span className="text-amber">bash · 80×24</span>
        </div>
      </div>
    </div>
  )
}

function ExperienceLeft() {
  return (
    <FloorCard slot="nw" band="top">
      <p className="journey-card-meta">{experience.prompt}</p>
      <p className="journey-card-command mt-1">
        <span className="text-amber">$ </span>
        <Typed text={experience.command} token="dev" />
        <span className="journey-caret" aria-hidden="true" />
      </p>
      <h2 className="journey-card-title mt-2 text-base md:text-lg">{experience.title}</h2>
      <p className="mt-2 text-xs leading-relaxed text-fog md:text-sm">{experience.body}</p>
      <p className="mt-2 hidden text-xs leading-relaxed text-fog-dim md:block">
        Desde los 15 trabajé como asesor de ventas para armar mi setup. Hackathones en UVG, UFG, Cursor Buildathon en El Salvador y Hack@Latam.
      </p>
    </FloorCard>
  )
}

function ExperienceRight() {
  return (
    <FloorCard slot="se" band="bottom">
      <p className="text-xs leading-relaxed text-fog md:text-sm">
        400 horas de prácticas en Combex aplicando software a logística aérea. En The502Project, la Cursor Hackathon reunió a 140 personas.
      </p>
      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <a href="/projects" data-ui className="journey-card-link">
          Ver proyectos
        </a>
        <a href="/experience" data-ui className="journey-card-link-quiet">
          Ver trayectoria
        </a>
        <a href="/gallery?frame=3" data-ui className="journey-card-link-quiet hidden md:inline-block">
          Hackathon UVG
        </a>
      </div>
    </FloorCard>
  )
}

export function ExperienceTerminal({ layout = 'panel' }) {
  if (layout === 'static') {
    return (
      <div className="journey-sheet journey-sheet-experience relative text-fog" style={{ '--sheet-image': `url("${consoleShot}")` }}>
        <ExperienceWash />
        <CorridorLayout layout="static" left={<ExperienceLeft />} right={<ExperienceRight />} />
      </div>
    )
  }

  return (
    <div className="journey-panel">
      <CorridorLayout left={<ExperienceLeft />} right={<ExperienceRight />} />
    </div>
  )
}
