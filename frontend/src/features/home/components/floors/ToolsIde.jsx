import vscodeShot from '../../../../assets/vscode.png'
import { tools } from '../../content/journey.content.js'
import { CorridorLayout, FloorCard } from './FloorCard.jsx'

export function ToolsWash() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-ink-950" aria-hidden="true">
      <div
        data-depth="back"
        className="journey-atmo-photo opacity-40"
        style={{ '--sheet-image': `url("${vscodeShot}")` }}
      />
      <div
        data-depth="mid"
        className="absolute inset-x-[7%] top-[15%] bottom-[17%] hidden border border-ink-700/80 bg-ink-900/55 shadow-[0_24px_70px_rgba(0,0,0,0.78)] md:block"
        style={{
          transform: 'perspective(1100px) rotateX(5deg) rotateY(4deg)',
        }}
      >
        <div className="flex items-center justify-between border-b border-ink-700 bg-ink-950/90 px-4 py-2 font-mono text-[11px] text-fog-dim">
          <span>WORKSPACE // vision.py · graphics.js · server.js</span>
          <span className="text-ember-500">UTF-8 · ESM</span>
        </div>
      </div>
    </div>
  )
}

function ToolsLeft() {
  const vision = tools.files.find((file) => file.id === 'vision.py')
  const graphics = tools.files.find((file) => file.id === 'graphics.js')

  return (
    <FloorCard slot="nw" band="top">
      <h2 className="journey-card-title text-base md:text-lg">{tools.title}</h2>
      <p className="mt-1.5 text-xs leading-relaxed text-fog-dim md:text-sm">{tools.body}</p>
      <div className="mt-2.5 border-t border-ink-700 pt-2">
        <p className="journey-card-meta">{vision.id} · {vision.label}</p>
        <p className="mt-1 text-xs leading-relaxed text-fog md:text-sm">{vision.summary}</p>
        <p className="journey-card-meta hidden md:block">{graphics.id} · {graphics.label}</p>
        <p className="mt-1 hidden text-xs leading-relaxed text-fog md:block">{graphics.summary}</p>
      </div>
    </FloorCard>
  )
}

function ToolsRight() {
  const stack = tools.files.find((file) => file.id === 'server.js')
  const certs = tools.files.find((file) => file.id === 'certs.md')

  return (
    <FloorCard slot="se" band="bottom">
      <p className="journey-card-meta">{stack.id} · {stack.label}</p>
      <p className="mt-1 text-xs leading-relaxed text-fog md:text-sm">{stack.summary}</p>
      <p className="journey-card-meta hidden md:block">{certs.label}</p>
      <p className="mt-1 hidden text-xs leading-relaxed text-fog-dim md:block">
        Cisco CCNA e ITN, STEM, Fundación BI, Tech Day, AI Dev y Masterclass Python.
      </p>
      <a href="/skills" data-ui className="journey-card-link">
        Abrir herramientas
      </a>
    </FloorCard>
  )
}

export function ToolsIde({ layout = 'panel' }) {
  if (layout === 'static') {
    return (
      <div className="journey-sheet journey-sheet-tools relative text-fog" style={{ '--sheet-image': `url("${vscodeShot}")` }}>
        <ToolsWash />
        <CorridorLayout layout="static" left={<ToolsLeft />} right={<ToolsRight />} />
      </div>
    )
  }

  return (
    <div className="journey-panel">
      <CorridorLayout left={<ToolsLeft />} right={<ToolsRight />} />
    </div>
  )
}
