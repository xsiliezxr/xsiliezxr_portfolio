import { useLocalized } from '../../../../shared/i18n/useLocalized.js'
import { about as aboutSource } from '../../content/journey.content.js'
import { filmFrames } from '../../lib/filmFrames.js'
import { CorridorLayout, FloorCard } from './FloorCard.jsx'

const FILM_ROWS = [
  { id: 'a', rotate: -7.5, top: '4%', origin: 'left center', shift: 1 },
  { id: 'b', rotate: 5.5, top: '22%', origin: 'right center', shift: -1 },
  { id: 'c', rotate: -3.5, top: '40%', origin: 'left center', shift: 1 },
  { id: 'd', rotate: 8, top: '58%', origin: 'right center', shift: -1 },
  { id: 'e', rotate: -6, top: '76%', origin: 'left center', shift: 1 },
  { id: 'f', rotate: 4, top: '92%', origin: 'right center', shift: -1 },
]

function rowFrames(frames, offset) {
  if (!frames.length) return []
  const list = [...frames, ...frames]
  const cut = offset % frames.length
  return [...list.slice(cut), ...list.slice(0, cut)]
}

export function AboutWash() {
  const frames = useLocalized(filmFrames)
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-ink-950" aria-hidden="true">
      <div className="film-unroll">
        {FILM_ROWS.map((row, index) => (
          <div
            key={row.id}
            className="film-strip"
            data-film-strip
            data-layer={index}
            data-rotate={row.rotate}
            data-shift={row.shift}
            data-origin={row.origin}
            style={{ top: row.top, transformOrigin: row.origin }}
          >
            <div className="film-holes" />
            <div className="film-cells">
              {rowFrames(frames, index * 2).map((frame, cell) => (
                <figure key={`${row.id}-${frame.id}-${cell}`} className="film-cell">
                  <img src={frame.src} alt="" />
                  <figcaption>{frame.caption}</figcaption>
                </figure>
              ))}
            </div>
            <div className="film-holes" />
          </div>
        ))}
      </div>
      <div className="film-veil" />
    </div>
  )
}

function AboutLeft() {
  const about = useLocalized(aboutSource)
  return (
    <FloorCard slot="nw" band="top" tone="film">
      <h2 className="journey-card-title text-base md:text-lg">{about.title}</h2>
      <div className="mt-2 space-y-2 text-xs leading-relaxed text-fog md:text-sm">
        {about.paragraphs.map((paragraph, index) =>
          paragraph ? <p key={index}>{paragraph}</p> : <span key={index} className="block h-2" />,
        )}
      </div>
      <p className="journey-card-meta mt-2">{about.meta}</p>
    </FloorCard>
  )
}

function AboutRight() {
  const about = useLocalized(aboutSource)
  return (
    <FloorCard slot="se" band="bottom" tone="film">
      <div className="space-y-2 text-xs leading-relaxed text-fog md:text-sm">
        <p>{about.purposeLead}</p>
        <p>{about.purposeTeam}</p>
        <p>{about.purposeSeek}</p>
      </div>
      <div className="mt-2.5 hidden md:block">
        <p className="font-mono text-[11px] text-amber">{about.readMore}</p>
      </div>
      <a href="/history" data-ui className="journey-card-link">
        {about.readStory}
      </a>
    </FloorCard>
  )
}

export function AboutFloor({ layout = 'panel' }) {
  if (layout === 'static') {
    return (
      <div className="journey-sheet relative text-fog">
        <AboutWash />
        <CorridorLayout layout="static" left={<AboutLeft />} right={<AboutRight />} />
      </div>
    )
  }

  return (
    <div className="journey-panel">
      <CorridorLayout left={<AboutLeft />} right={<AboutRight />} />
    </div>
  )
}
