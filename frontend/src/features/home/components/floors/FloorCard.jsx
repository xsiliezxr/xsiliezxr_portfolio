const toneStyles = {
  ink: 'border-ink-700 text-fog',
  film: 'border-ink-700 text-fog',
  paper: 'border-ink-700 text-paper-ink',
  term: 'border-ink-700 text-fog',
  ide: 'border-ink-700 text-fog',
  ember: 'border-ink-950 text-fog',
  court: 'border-ember-500 text-fog',
}

export function FloorCard({ slot, band, tone = 'ink', className = '', children }) {
  return (
    <article
      data-beat
      data-slot={slot}
      data-band={band}
      className={`journey-card journey-card-${tone} border p-3.5 md:p-5 ${toneStyles[tone] ?? toneStyles.ink} ${className}`}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
    >
      {children}
    </article>
  )
}

export function CorridorLayout({ left, right, layout = 'panel', className = '' }) {
  if (layout === 'static') {
    return (
      <div className={`mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-4 py-20 md:grid-cols-2 md:gap-8 md:px-10 ${className}`}>
        <div className="flex flex-col gap-3.5">{left}</div>
        <div className="flex flex-col gap-3.5">{right}</div>
      </div>
    )
  }

  return (
    <div
      data-corridor
      className={`pointer-events-none relative z-10 grid h-full w-full grid-cols-1 content-between gap-3 px-3 pt-[calc(var(--masthead)+0.75rem)] pr-12 pb-[6.75rem] sm:px-4 md:grid-cols-[minmax(0,1fr)_minmax(16rem,24vw)_minmax(0,1fr)] md:content-center md:items-center md:gap-5 md:px-8 md:pt-[calc(var(--masthead)+1.35rem)] md:pr-16 md:pb-24 ${className}`}
    >
      <div
        data-corridor-col="left"
        className="flex max-w-[min(100%,22rem)] flex-col gap-2.5 justify-self-start md:gap-4 md:max-w-[24rem] md:justify-self-end md:w-full"
      >
        {left}
      </div>
      <div className="hidden md:block" aria-hidden="true" data-elevator-path />
      <div
        data-corridor-col="right"
        className="flex max-w-[min(100%,22rem)] flex-col gap-2.5 justify-self-end md:gap-4 md:max-w-[24rem] md:justify-self-start md:w-full"
      >
        {right}
      </div>
    </div>
  )
}
