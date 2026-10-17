const toneStyles = {
  ink: 'border-ink-700 bg-ink-900/95 text-fog shadow-[0_14px_34px_rgba(0,0,0,0.52)]',
  paper: 'border-ink-700 bg-paper text-paper-ink shadow-[6px_6px_0_rgba(26,25,23,0.9)]',
  ember: 'border-ink-950 bg-ink-950 text-fog shadow-[8px_8px_0_rgba(10,10,10,0.85)]',
}

export function FloorCard({ slot, band, tone = 'ink', className = '', children }) {
  return (
    <article
      data-beat
      data-slot={slot}
      data-band={band}
      className={`journey-card journey-card-${tone} !static !w-full !max-w-none !max-h-none !overflow-visible border p-3.5 md:p-5 ${toneStyles[tone] ?? toneStyles.ink} ${className}`}
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
      className={`pointer-events-none relative z-10 grid h-full w-full grid-cols-1 content-between px-3 pt-[calc(var(--masthead)+0.85rem)] pr-12 pb-24 md:grid-cols-[minmax(0,1fr)_minmax(18rem,26vw)_minmax(0,1fr)] md:content-center md:items-center md:gap-6 md:px-8 md:pt-[calc(var(--masthead)+1.5rem)] md:pr-16 md:pb-24 ${className}`}
    >
      <div
        data-corridor-col="left"
        className="flex flex-col gap-2.5 md:gap-4 md:justify-self-end md:w-full md:max-w-[25rem]"
      >
        {left}
      </div>
      <div className="hidden md:block" aria-hidden="true" data-elevator-path />
      <div
        data-corridor-col="right"
        className="flex flex-col gap-2.5 md:gap-4 md:justify-self-start md:w-full md:max-w-[25rem]"
      >
        {right}
      </div>
    </div>
  )
}
