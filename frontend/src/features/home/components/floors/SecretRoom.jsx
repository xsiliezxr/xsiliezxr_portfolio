import { WhatsappLogo } from '@phosphor-icons/react'
import { whatsappHref } from '../../../../shared/config/contact.js'
import { useLocalized } from '../../../../shared/i18n/useLocalized.js'
import { secret as secretSource } from '../../content/journey.content.js'
import { FloorCard } from './FloorCard.jsx'

const FLICKER = [
  { label: '24', x: '12%', y: '62%', delay: '0s' },
  { label: '08', x: '78%', y: '28%', delay: '0.4s' },
  { label: '07', x: '84%', y: '68%', delay: '0.9s' },
  { label: 'LEONES', x: '8%', y: '78%', delay: '1.3s' },
]

export function SecretCourt() {
  return (
    <>
      <div className="secret-court" data-court="secret" aria-hidden="true">
        <svg
          data-depth="mid"
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <g data-shot="hoop" transform="translate(520 168)">
            <line x1="724" y1="268" x2="724" y2="198" stroke="#6B2508" strokeWidth="12" />
            <line x1="720" y1="268" x2="720" y2="198" stroke="#FF5B14" strokeWidth="6" />
            <line x1="684" y1="268" x2="720" y2="222" stroke="#C2410C" strokeWidth="2.5" />
            <line x1="756" y1="268" x2="720" y2="222" stroke="#C2410C" strokeWidth="2.5" />
            <ellipse cx="720" cy="268" rx="40" ry="10" fill="#0A0A0A" stroke="#FF5B14" strokeWidth="2.4" />

            <rect x="604" y="86" width="244" height="134" fill="#131313" stroke="#FF5B14" strokeWidth="4" />
            <rect x="676" y="136" width="96" height="62" fill="#1C1B1A" stroke="#FFA474" strokeWidth="3" />
            <rect x="712" y="194" width="24" height="9" fill="#FF5B14" />

            <g data-shot="rim">
              <ellipse cx="724" cy="210" rx="42" ry="13" fill="none" stroke="#C2410C" strokeWidth="4.2" />
              <ellipse cx="724" cy="206" rx="42" ry="13" fill="none" stroke="#FFB000" strokeWidth="5" />
            </g>

            <path d="M 684 208 L 696 262 L 752 262 L 764 208" fill="none" stroke="#FFA474" strokeWidth="2.2" />
            <path d="M 698 210 L 710 262 M 724 218 L 724 262 M 750 210 L 738 262" fill="none" stroke="#FF5B14" strokeWidth="1.8" />
            <path d="M 689 228 L 759 228 M 693 246 L 755 246" fill="none" stroke="#FFB000" strokeWidth="1.6" />
          </g>
        </svg>

        {FLICKER.map((item) => (
          <span
            key={item.label}
            className="secret-flicker"
            style={{ left: item.x, top: item.y, animationDelay: item.delay }}
          >
            {item.label}
          </span>
        ))}
      </div>
      <svg className="secret-ball" data-shot="ball" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="20" fill="#FF5B14" />
        <path
          d="M4 24h40M24 4v40M8 12c8 6 8 18 0 24M40 12c-8 6-8 18 0 24"
          fill="none"
          stroke="#0A0A0A"
          strokeWidth="2.2"
        />
      </svg>
    </>
  )
}

export function SecretRoom() {
  const whatsapp = whatsappHref()
  const secret = useLocalized(secretSource)

  return (
    <div className="journey-panel secret-deck">
      <FloorCard slot="nw" band="top" tone="court" className="secret-deck-card secret-deck-card-nw">
        <p className="journey-card-meta">{secret.kicker} · -1</p>
        <h2 className="journey-card-title mt-1 text-base md:text-lg">{secret.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-fog">{secret.message}</p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-amber">
          {secret.reward}
        </p>
      </FloorCard>

      <FloorCard slot="se" band="bottom" tone="court" className="secret-deck-card secret-deck-card-se">
        <p className="journey-card-meta">{secret.kicker}</p>
        <p className="mt-2 text-sm leading-relaxed text-fog">{secret.fact}</p>
        <p className="mt-2 text-sm leading-relaxed text-fog-dim">{secret.closing}</p>
        {whatsapp ? (
          <a
            data-ui
            href={whatsapp}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 inline-flex min-h-11 items-center gap-2 bg-ember-500 px-4 py-2.5 text-sm font-bold text-ink-950"
          >
            <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
            WhatsApp directo
          </a>
        ) : (
          <p className="mt-3 font-mono text-[11px] text-amber">{secret.reward}</p>
        )}
      </FloorCard>
    </div>
  )
}
