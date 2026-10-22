import { useState } from 'react'
import consoleShot from '../../../../assets/images/console.png'
import basket from '../../../../assets/images/hobbies/basket.webp'
import { HobbyMark } from '../../../../shared/hobbies/HobbyMark.jsx'
import { useLocalized } from '../../../../shared/i18n/useLocalized.js'
import { experience as experienceSource } from '../../content/journey.content.js'
import { CorridorLayout, FloorCard } from './FloorCard.jsx'

const BOOT_LINES = [
  { kind: 'status', text: 'compiled' },
  { kind: 'status', text: 'ready' },
  { kind: 'status', text: 'listening' },
  { kind: 'plain', text: 'trayectoria' },
  { kind: 'plain', text: 'hackathones' },
  { kind: 'plain', text: 'combex' },
]

export function ExperienceWash() {
  const experience = useLocalized(experienceSource)
  const [input, setInput] = useState('')
  const [lines, setLines] = useState(BOOT_LINES)

  const replyFor = (raw) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return null
    if (cmd === 'help') return experience.help
    if (cmd === 'clear') return '__clear__'
    return experience.replies[cmd] || experience.unknown
  }

  const run = (event) => {
    event.preventDefault()
    const value = input.trim()
    if (!value) return
    const answer = replyFor(value)
    setInput('')
    if (answer === '__clear__') {
      setLines([])
      return
    }
    setLines((current) => [
      ...current,
      { kind: 'cmd', text: value },
      { kind: 'out', text: answer },
    ])
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-ink-950">
      <div
        data-depth="back"
        className="journey-atmo-photo journey-atmo-photo-dim"
        style={{ '--sheet-image': `url("${consoleShot}")` }}
        aria-hidden="true"
      />
      <div className="journey-boot" data-depth="mid" data-ui aria-label="Terminal">
        <header className="journey-boot-bar">
          <span>angel@kinal:~</span>
          <span>{experience.termLabel}</span>
        </header>
        <div className="journey-boot-body">
          <p className="journey-log">
            <span className="journey-term-prompt">{experience.prompt} </span>
            <span>{experience.command}</span>
            <span className="journey-caret" aria-hidden="true" />
          </p>
          {lines.map((line, index) => (
            <p key={`${line.kind}-${index}-${line.text.slice(0, 12)}`} data-log className="journey-stream journey-log">
              {line.kind === 'status' ? <span className="journey-log-status">{`> ${line.text}`}</span> : null}
              {line.kind === 'cmd' ? (
                <>
                  <span className="journey-term-prompt">{experience.prompt} </span>
                  {line.text}
                </>
              ) : null}
              {line.kind === 'plain' || line.kind === 'out' ? line.text : null}
            </p>
          ))}
          <form className="journey-term-form" onSubmit={run} onPointerDown={(event) => event.stopPropagation()}>
            <label className="journey-term-prompt" htmlFor="journey-term-input">
              {experience.prompt}
            </label>
            <input
              id="journey-term-input"
              data-ui
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="help"
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

function ExperienceLeft() {
  const experience = useLocalized(experienceSource)
  const sales = experience.timeline[0]
  const hack = experience.timeline[1]

  return (
    <FloorCard slot="nw" band="top" tone="term">
      <h2 className="journey-card-title">{experience.title}</h2>
      <div className="mt-2 space-y-2 text-xs leading-relaxed md:text-sm">
        <p>{experience.body}</p>
        <p>
          {sales.title}, {sales.date}. {sales.detail}
        </p>
        <p>
          {hack.title}. {hack.detail}
        </p>
      </div>
    </FloorCard>
  )
}

function ExperienceRight() {
  const experience = useLocalized(experienceSource)
  const combex = experience.timeline[4]
  const community = experience.timeline[6]

  return (
    <FloorCard slot="se" band="bottom" tone="term">
      <h2 className="journey-card-title">{combex.title}</h2>
      <div className="mt-2 space-y-2 text-xs leading-relaxed md:text-sm">
        <p>
          {combex.date}. {combex.detail}
        </p>
        <p>
          {community.title}. {community.detail}
        </p>
      </div>
      <a href="/history#about-path" data-ui className="journey-card-link">
        {experience.historyCta}
      </a>
      <a href="/experiencia" data-ui className="journey-card-link-quiet">
        {experience.experienceCta}
      </a>
    </FloorCard>
  )
}

export function ExperienceTerminal({ layout = 'panel' }) {
  const mark = <HobbyMark id="basketball" image={basket} className="hobby-mark-low" />

  if (layout === 'static') {
    return (
      <div className="journey-sheet journey-sheet-experience relative text-fog" style={{ '--sheet-image': `url("${consoleShot}")` }}>
        <ExperienceWash />
        {mark}
        <CorridorLayout layout="static" className="journey-side-fit" left={<ExperienceLeft />} right={<ExperienceRight />} />
      </div>
    )
  }

  return (
    <div className="journey-panel">
      {mark}
      <CorridorLayout className="journey-side-fit" left={<ExperienceLeft />} right={<ExperienceRight />} />
    </div>
  )
}
