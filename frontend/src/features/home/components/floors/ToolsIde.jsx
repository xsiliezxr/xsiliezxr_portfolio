import vscodeShot from '../../../../assets/vscode.png'
import { useLocalized } from '../../../../shared/i18n/useLocalized.js'
import { tools as toolsSource } from '../../content/journey.content.js'
import { CorridorLayout, FloorCard } from './FloorCard.jsx'

const SESSION_IDS = ['vision.py', 'graphics.js', 'server.js']

function CodeChars({ text, token }) {
  return Array.from(text).map((char, index) => (
    <span key={`${token}-${index}`} data-ide-char>
      {char === ' ' ? '\u00a0' : char}
    </span>
  ))
}

export function ToolsWash() {
  const tools = useLocalized(toolsSource)
  const session = SESSION_IDS.map((id) => tools.files.find((file) => file.id === id)).filter(Boolean)

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-ink-950">
      <div
        data-depth="back"
        className="journey-atmo-photo journey-atmo-photo-dim"
        style={{ '--sheet-image': `url("${vscodeShot}")` }}
        aria-hidden="true"
      />

      <div className="vscode-mini" data-depth="mid" data-ui aria-label="VS Code">
        <aside className="vscode-activity" aria-hidden="true">
          <span data-active="1" />
          <span />
          <span />
          <span />
        </aside>

        <aside className="vscode-side">
          <p className="vscode-side-title">Explorer</p>
          <p className="vscode-side-folder">PORTAFOLIO</p>
          <ul className="vscode-tree">
            {session.map((file, index) => (
              <li key={file.id} data-ide-file={file.id} data-active={index === 0 ? '1' : '0'}>
                {file.id}
              </li>
            ))}
          </ul>
        </aside>

        <div className="vscode-main">
          <div className="vscode-tabs" role="tablist" aria-label="Files">
            {session.map((file, index) => (
              <span
                key={file.id}
                role="tab"
                data-ide-tab={file.id}
                data-active={index === 0 ? '1' : '0'}
                className="vscode-tab"
              >
                {file.id}
              </span>
            ))}
          </div>

          <div className="vscode-editor">
            {session.map((file, fileIndex) => (
              <div
                key={file.id}
                className="vscode-pane"
                data-ide-pane={file.id}
                data-active={fileIndex === 0 ? '1' : '0'}
                hidden={fileIndex !== 0}
              >
                <div className="vscode-gutter" aria-hidden="true">
                  {file.code.map((_, index) => (
                    <span key={`${file.id}-n-${index}`}>{index + 1}</span>
                  ))}
                </div>
                <pre className="vscode-code">
                  {file.code.map((line, index) => (
                    <span key={`${file.id}-l-${index}`} className="vscode-line" data-ide-line={`${index + 1}`}>
                      <CodeChars text={line || ' '} token={`${file.id}-${index}`} />
                    </span>
                  ))}
                  <span className="vscode-caret" data-ide-caret aria-hidden="true" />
                </pre>
              </div>
            ))}

            <aside className="vscode-chat" data-copilot="chat">
              <p className="journey-copilot-name">Copilot</p>
              <p data-ide-hint>{session[0]?.summary}</p>
            </aside>
          </div>

          <div className="vscode-status">
            <span data-ide-status>{session[0]?.id} · editing</span>
            <span>UTF-8</span>
            <span data-ide-lang>{session[0]?.label || 'Python'}</span>
            <span data-ide-cursor>Ln 1, Col 1</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ToolsLeft() {
  const tools = useLocalized(toolsSource)
  const vision = tools.files.find((file) => file.id === 'vision.py')
  const graphics = tools.files.find((file) => file.id === 'graphics.js')

  return (
    <FloorCard slot="nw" band="top" tone="ide">
      <h2 className="journey-card-title">{tools.title}</h2>
      <div className="copy-bubbles mt-3 text-xs leading-relaxed md:text-sm">
        <p className="copy-bubble-title text-ember-300">{tools.body}</p>
        <p className="copy-bubble copy-bubble-ink">
          {vision.id} · {vision.label}
        </p>
        <p className="copy-bubble copy-bubble-ink">{vision.summary}</p>
        <p className="copy-bubble copy-bubble-ink text-ember-300">
          {graphics.id} · {graphics.label}
        </p>
        <p className="copy-bubble copy-bubble-ink">{graphics.summary}</p>
      </div>
    </FloorCard>
  )
}

function ToolsRight() {
  const tools = useLocalized(toolsSource)
  const stack = tools.files.find((file) => file.id === 'server.js')
  const certs = tools.files.find((file) => file.id === 'certs.md')

  return (
    <FloorCard slot="se" band="bottom" tone="ide">
      <p className="copy-bubble-title text-ember-300">
        {stack.id} · {stack.label}
      </p>
      <h2 className="journey-card-title">{stack.label}</h2>
      <div className="copy-bubbles mt-3 text-xs leading-relaxed md:text-sm">
        <p className="copy-bubble copy-bubble-ink">{stack.summary}</p>
        <p className="copy-bubble copy-bubble-ink text-ember-300">{certs.label}</p>
        <p className="copy-bubble copy-bubble-ink">{certs.summary}</p>
      </div>
      <a href="/skills" data-ui className="journey-card-link">
        {tools.skillsCta}
      </a>
    </FloorCard>
  )
}

export function ToolsIde({ layout = 'panel' }) {
  if (layout === 'static') {
    return (
      <div className="journey-sheet journey-sheet-tools relative text-fog" style={{ '--sheet-image': `url("${vscodeShot}")` }}>
        <ToolsWash />
        <CorridorLayout layout="static" className="journey-side-fit" left={<ToolsLeft />} right={<ToolsRight />} />
      </div>
    )
  }

  return (
    <div className="journey-panel">
      <CorridorLayout className="journey-side-fit" left={<ToolsLeft />} right={<ToolsRight />} />
    </div>
  )
}
