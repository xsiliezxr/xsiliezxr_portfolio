import learn from '../../../../assets/images/hobbies/learn.webp'
import { HobbyMark } from '../../../../shared/hobbies/HobbyMark.jsx'
import { studies } from '../../content/journey.content.js'
import { CorridorLayout, FloorCard } from './FloorCard.jsx'

function DraftingPencil({ id, stroke = '#C2410C', accent = '#FF5B14' }) {
  return (
    <g data-pencil={id} style={{ transformOrigin: '0px 0px' }}>
      <circle cx="0" cy="0" r="3.2" fill={accent} />
      <path d="M 0 0 L 7 -15 L 15 -7 Z" fill="#1A1917" />
      <path
        d="M 7 -15 L 29 -37 L 37 -29 L 15 -7 Z"
        fill="#EEEDEA"
        stroke={stroke}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M 29 -37 L 34 -42 L 42 -34 L 37 -29 Z"
        fill={accent}
        stroke="#1A1917"
        strokeWidth="1.8"
      />
      <line x1="11" y1="-11" x2="33" y2="-33" stroke={stroke} strokeWidth="1.4" />
    </g>
  )
}

export function StudiesField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        data-depth="back"
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(26, 25, 23, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(26, 25, 23, 0.08) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      >
        <span className="absolute top-[11%] left-[24%] hidden font-mono text-[11px] tracking-widest text-ember-800/55 lg:block">
          f(x) = ∫ x² dx
        </span>
        <span className="absolute top-[12%] right-[24%] hidden font-mono text-[11px] tracking-widest text-paper-ink/45 lg:block">
          O(n log n) · Δx = v₀t + ½at²
        </span>
        <span className="absolute bottom-[11%] left-[25%] hidden font-mono text-[11px] text-ember-800/55 lg:block">
          git commit -m &quot;feat: kinal-fullstack&quot;
        </span>
        <span className="absolute bottom-[11%] right-[22%] hidden font-mono text-[11px] text-paper-ink/45 lg:block">
          x = (-b ± √(b² - 4ac)) / 2a
        </span>
      </div>

      <svg
        data-depth="mid"
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <g opacity="0.92">
          <line
            data-study-draw="axis-y"
            data-len="140"
            className="journey-stroke"
            x1="108"
            y1="230"
            x2="108"
            y2="90"
            stroke="#6B2508"
            strokeWidth="2.2"
          />
          <line
            data-study-draw="axis-x"
            data-len="260"
            className="journey-stroke"
            x1="88"
            y1="206"
            x2="348"
            y2="206"
            stroke="#6B2508"
            strokeWidth="2.2"
          />
          <path
            data-study-draw="curve"
            data-len="290"
            className="journey-stroke"
            d="M 108 184 Q 168 96 228 172 T 344 126"
            fill="none"
            stroke="#C2410C"
            strokeWidth="3"
          />
          <text
            data-equation="studies"
            data-eq-id="linear"
            className="journey-stroke"
            x="104"
            y="264"
            fill="none"
            stroke="#1A1917"
            strokeWidth="2"
            fontSize="38"
            fontFamily="Monaspace Neon, ui-monospace, monospace"
          >
            y = mx + b
          </text>
        </g>

        <g opacity="0.92">
          <path
            data-study-draw="circle"
            data-len="540"
            className="journey-stroke"
            d="M 266 716 A 64 64 0 1 1 265.9 716 L 202 716 L 248 671"
            fill="none"
            stroke="#6B2508"
            strokeWidth="2.3"
          />
          <text
            data-equation="studies"
            data-eq-id="func"
            className="journey-stroke"
            x="104"
            y="822"
            fill="none"
            stroke="#C2410C"
            strokeWidth="2"
            fontSize="38"
            fontFamily="Monaspace Neon, ui-monospace, monospace"
          >
            f(x) = x + 1
          </text>
        </g>

        <g opacity="0.92">
          <path
            data-study-draw="triangle"
            data-len="620"
            className="journey-stroke"
            d="M 1046 228 L 1284 228 L 1284 96 Z"
            fill="none"
            stroke="#C2410C"
            strokeWidth="2.8"
          />
          <path
            d="M 1264 228 L 1264 208 L 1284 208"
            fill="none"
            stroke="#6B2508"
            strokeWidth="1.6"
          />
          <text x="1162" y="250" fill="#6B2508" fontSize="16" fontFamily="Monaspace Neon, monospace">
            a
          </text>
          <text x="1296" y="170" fill="#6B2508" fontSize="16" fontFamily="Monaspace Neon, monospace">
            b
          </text>
          <text x="1146" y="150" fill="#C2410C" fontSize="17" fontWeight="700" fontFamily="Monaspace Neon, monospace">
            c
          </text>
          <text
            data-equation="studies"
            data-eq-id="pythagoras"
            className="journey-stroke"
            x="1038"
            y="282"
            fill="none"
            stroke="#6B2508"
            strokeWidth="2"
            fontSize="40"
            fontFamily="Monaspace Neon, ui-monospace, monospace"
          >
            a² + b² = c²
          </text>
        </g>

        <g opacity="0.9">
          <path
            data-study-draw="prism"
            data-len="460"
            className="journey-stroke"
            d="M 1054 764 L 1174 652 L 1294 764 Z M 1174 652 L 1174 764"
            fill="none"
            stroke="#1A1917"
            strokeWidth="2.2"
          />
          <circle cx="1174" cy="724" r="38" fill="none" stroke="#C2410C" strokeWidth="1.6" strokeDasharray="6 5" />
        </g>

        <DraftingPencil id="left" stroke="#C2410C" accent="#FF5B14" />
        <DraftingPencil id="right" stroke="#6B2508" accent="#FF5B14" />
      </svg>
    </div>
  )
}

function StudiesLeft() {
  return (
    <FloorCard slot="nw" band="top" tone="paper">
      <h2 className="journey-card-title text-base md:text-lg">{studies.leftTitle}</h2>
      <p className="mt-2 text-xs leading-relaxed md:text-sm">{studies.leftBody}</p>
      <p className="mt-2 hidden font-mono text-[11px] text-ember-800 md:block">{studies.leftNote}</p>
      <a href="/certificaciones" data-ui className="journey-card-link">
        Ver reconocimientos
      </a>
    </FloorCard>
  )
}

function StudiesRight() {
  return (
    <FloorCard slot="se" band="bottom" tone="paper">
      <h2 className="journey-card-title text-base md:text-lg">{studies.rightTitle}</h2>
      <p className="mt-2 text-xs leading-relaxed md:text-sm">{studies.rightBody}</p>
      <p className="mt-2 hidden font-mono text-[11px] text-ember-800 md:block">{studies.rightNote}</p>
      <a href="/gallery?frame=1" data-ui className="journey-card-link">
        Ver la galería
      </a>
    </FloorCard>
  )
}

export function StudiesFloor({ layout = 'panel' }) {
  const mark = <HobbyMark id="cleancode" image={learn} className="hobby-mark-high" />

  if (layout === 'static') {
    return (
      <div className="journey-sheet journey-sheet-studies relative text-paper-ink">
        <StudiesField />
        {mark}
        <CorridorLayout layout="static" left={<StudiesLeft />} right={<StudiesRight />} />
      </div>
    )
  }

  return (
    <div className="journey-panel">
      {mark}
      <CorridorLayout left={<StudiesLeft />} right={<StudiesRight />} />
    </div>
  )
}
