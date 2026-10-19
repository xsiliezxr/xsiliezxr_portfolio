import { useReducedMotion } from '../hooks/useReducedMotion.js'

function joinPhrases(phrases) {
  return phrases.filter(Boolean).join(' · ')
}

export function EditorialBanner({ phrases = [], text = '', marquee = false, className = '' }) {
  const reduce = useReducedMotion()
  const label = phrases.length ? joinPhrases(phrases) : text
  const letters = Array.from(label)
  const runMarquee = marquee && !reduce && letters.length > 0

  const row = (
    <p className={`editorial-banner-row ${runMarquee ? 'is-marquee' : ''}`}>
      {letters.map((char, index) => {
        if (char === ' ') {
          return <span key={`sp-${index}`} className="editorial-banner-space" aria-hidden="true" />
        }
        if (char === '·') {
          return (
            <span key={`sep-${index}`} className="editorial-banner-sep" aria-hidden="true">
              ·
            </span>
          )
        }
        return (
          <span key={`${char}-${index}`} className="editorial-banner-char">
            {char}
          </span>
        )
      })}
    </p>
  )

  return (
    <div className={`editorial-banner ${className}`.trim()} aria-hidden="true">
      {runMarquee ? (
        <div className="editorial-banner-track">
          {row}
          {row}
        </div>
      ) : (
        row
      )}
    </div>
  )
}
