import { Button } from '../../../../shared/components/ui/Button.jsx'
import { contactLinks } from '../../../../shared/config/contact.js'
import { secret } from '../../content/journey.content.js'
import { CorridorLayout, FloorCard } from './FloorCard.jsx'

export function SecretCourt() {
  return (
    <>
      <div className="secret-court" data-court="secret" aria-hidden="true">
        <div
          data-depth="back"
          className="absolute inset-0 opacity-65"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255, 91, 20, 0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 91, 20, 0.14) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />

        <svg
          data-depth="mid"
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="secret-key-halftone" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.3" fill="#FF5B14" fillOpacity="0.38" />
            </pattern>
            <linearGradient id="secret-key-wash" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6B2508" stopOpacity="0.72" />
              <stop offset="100%" stopColor="#2A0E03" stopOpacity="0.28" />
            </linearGradient>
          </defs>

          <g opacity="0.95">
            <line x1="0" y1="268" x2="1440" y2="268" stroke="#FF5B14" strokeWidth="2.5" />
            <line x1="0" y1="274" x2="1440" y2="274" stroke="#6B2508" strokeWidth="1" strokeDasharray="6 6" />

            <text
              x="92"
              y="256"
              fill="#FFA474"
              fontSize="11"
              letterSpacing="2"
              fontFamily="Monaspace Neon, ui-monospace, monospace"
            >
              COURT // NIVEL -1 · 28.65M × 15.00M
            </text>
            <text
              x="1084"
              y="256"
              fill="#FFB000"
              fontSize="11"
              letterSpacing="2"
              fontFamily="Monaspace Neon, ui-monospace, monospace"
            >
              23.08.2007 · CLUB LEONES
            </text>

            <rect
              x="592"
              y="268"
              width="256"
              height="248"
              fill="url(#secret-key-wash)"
              stroke="#FFA474"
              strokeWidth="2.5"
            />
            <rect
              x="592"
              y="268"
              width="256"
              height="248"
              fill="url(#secret-key-halftone)"
            />

            <line x1="592" y1="324" x2="572" y2="324" stroke="#FFB000" strokeWidth="2.8" />
            <line x1="592" y1="372" x2="572" y2="372" stroke="#FFB000" strokeWidth="2.8" />
            <line x1="592" y1="420" x2="572" y2="420" stroke="#FFB000" strokeWidth="2.8" />
            <line x1="592" y1="468" x2="572" y2="468" stroke="#FFB000" strokeWidth="2.8" />

            <line x1="848" y1="324" x2="868" y2="324" stroke="#FFB000" strokeWidth="2.8" />
            <line x1="848" y1="372" x2="868" y2="372" stroke="#FFB000" strokeWidth="2.8" />
            <line x1="848" y1="420" x2="868" y2="420" stroke="#FFB000" strokeWidth="2.8" />
            <line x1="848" y1="468" x2="868" y2="468" stroke="#FFB000" strokeWidth="2.8" />

            <path
              d="M 592 516 A 128 64 0 0 0 848 516"
              fill="none"
              stroke="#FFB000"
              strokeWidth="3"
            />
            <path
              d="M 592 516 A 128 64 0 0 1 848 516"
              fill="none"
              stroke="#FFA474"
              strokeWidth="2"
              strokeDasharray="10 8"
            />

            <path
              d="M 276 268 L 276 410 A 444 270 0 0 0 1164 410 L 1164 268"
              fill="none"
              stroke="#FF5B14"
              strokeWidth="3.2"
            />
            <path
              d="M 256 268 L 256 416 A 464 284 0 0 0 1184 416 L 1184 268"
              fill="none"
              stroke="#6B2508"
              strokeWidth="1.4"
              strokeDasharray="8 8"
            />

            <text
              x="674"
              y="704"
              fill="#FFA474"
              fontSize="11"
              letterSpacing="1.8"
              fontFamily="Monaspace Neon, ui-monospace, monospace"
            >
              ARC R = 6.75M
            </text>

            <ellipse
              cx="720"
              cy="600"
              rx="148"
              ry="46"
              fill="none"
              stroke="#6B2508"
              strokeWidth="2"
              strokeDasharray="8 8"
            />
            <ellipse
              cx="720"
              cy="600"
              rx="92"
              ry="28"
              fill="#0A0A0A"
              fillOpacity="0.62"
              stroke="#FF5B14"
              strokeWidth="2.2"
            />

            <circle
              cx="720"
              cy="900"
              r="140"
              fill="none"
              stroke="#FFB000"
              strokeWidth="2.4"
            />
          </g>

          <g>
            <line x1="724" y1="268" x2="724" y2="204" stroke="#6B2508" strokeWidth="12" />
            <line x1="720" y1="268" x2="720" y2="204" stroke="#FF5B14" strokeWidth="6" />
            <line x1="684" y1="268" x2="720" y2="228" stroke="#C2410C" strokeWidth="2.5" />
            <line x1="756" y1="268" x2="720" y2="228" stroke="#C2410C" strokeWidth="2.5" />
            <ellipse cx="720" cy="268" rx="40" ry="10" fill="#0A0A0A" stroke="#FF5B14" strokeWidth="2.4" />

            <rect
              x="592"
              y="74"
              width="244"
              height="134"
              fill="#2A0E03"
              stroke="#C2410C"
              strokeWidth="2.4"
            />
            <line x1="592" y1="74" x2="604" y2="86" stroke="#C2410C" strokeWidth="2.2" />
            <line x1="836" y1="74" x2="848" y2="86" stroke="#C2410C" strokeWidth="2.2" />
            <line x1="592" y1="208" x2="604" y2="220" stroke="#C2410C" strokeWidth="2.2" />
            <line x1="836" y1="208" x2="848" y2="220" stroke="#C2410C" strokeWidth="2.2" />

            <rect
              x="604"
              y="86"
              width="244"
              height="134"
              fill="#131313"
              stroke="#FF5B14"
              strokeWidth="4"
            />
            <line x1="604" y1="112" x2="848" y2="112" stroke="#2A2826" strokeWidth="1.6" />
            <circle cx="618" cy="99" r="3" fill="#FF5B14" />
            <circle cx="834" cy="99" r="3" fill="#FFB000" />
            <text
              x="630"
              y="103"
              fill="#FFB000"
              fontSize="10.5"
              letterSpacing="1.6"
              fontFamily="Monaspace Neon, ui-monospace, monospace"
            >
              HOOP // 3.05M · CANCHA SECRETA
            </text>

            <rect
              x="676"
              y="136"
              width="96"
              height="62"
              fill="#1C1B1A"
              stroke="#FFA474"
              strokeWidth="3"
            />
            <rect x="712" y="194" width="24" height="9" fill="#FF5B14" />

            <g data-shot="rim">
              <ellipse
                cx="724"
                cy="210"
                rx="42"
                ry="13"
                fill="none"
                stroke="#C2410C"
                strokeWidth="4.2"
              />
              <ellipse
                cx="724"
                cy="206"
                rx="42"
                ry="13"
                fill="none"
                stroke="#FFB000"
                strokeWidth="5"
              />
            </g>

            <path
              d="M 684 208 L 696 262 L 752 262 L 764 208"
              fill="none"
              stroke="#FFA474"
              strokeWidth="2.2"
            />
            <path
              d="M 698 210 L 710 262 M 724 218 L 724 262 M 750 210 L 738 262"
              fill="none"
              stroke="#FF5B14"
              strokeWidth="1.8"
            />
            <path
              d="M 689 228 L 759 228 M 693 246 L 755 246"
              fill="none"
              stroke="#FFB000"
              strokeWidth="1.6"
            />
          </g>
        </svg>
      </div>
      <svg className="secret-ball" data-shot="ball" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="20" fill="#FF5B14" />
        <path d="M4 24h40M24 4v40M8 12c8 6 8 18 0 24M40 12c-8 6-8 18 0 24" fill="none" stroke="#0A0A0A" strokeWidth="2.2" />
      </svg>
    </>
  )
}

export function SecretRoom() {
  const links = contactLinks()

  const left = (
    <FloorCard slot="nw" band="top">
      <p className="journey-card-meta">SALA SECRETA · NIVEL -1</p>
      <h2 className="journey-card-title mt-1 text-base md:text-lg">{secret.title}</h2>
      <p className="mt-2 text-xs leading-relaxed text-fog md:text-sm">{secret.message}</p>
      <p className="mt-2 hidden border-t border-ink-700 pt-2 text-xs leading-relaxed text-fog-dim md:block">
        {secret.playlist}
      </p>
    </FloorCard>
  )

  const right = (
    <FloorCard slot="se" band="bottom">
      <p className="journey-card-meta">23 DE AGOSTO · MENTALIDAD DE CANCHA</p>
      <p className="mt-1.5 text-xs leading-relaxed text-fog md:text-sm">
        Cumplo años el mismo día que Kobe Bryant. La beca en Leones se cortó, pero la cancha de colonia sigue.
      </p>
      <p className="mt-2 hidden text-xs leading-relaxed text-fog-dim md:block">{secret.closing}</p>
      {links.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {links.map((link) => (
            <Button key={link.href} href={link.href}>
              {link.label}
            </Button>
          ))}
        </div>
      ) : (
        <p className="journey-card-meta">{secret.reward}</p>
      )}
    </FloorCard>
  )

  return (
    <div className="journey-panel">
      <CorridorLayout left={left} right={right} />
    </div>
  )
}
