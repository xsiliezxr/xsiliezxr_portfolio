import { useState } from 'react'

const PEEK = 3.5

export function CertificateDeck({ items }) {
  const [order, setOrder] = useState(() => items.map((item) => item.id))
  const [sheet, setSheet] = useState('diploma')
  const byId = new Map(items.map((item) => [item.id, item]))
  const active = byId.get(order[0]) ?? items[0]

  if (!active) {
    return <p className="font-mono text-sm">Sin certificados todavía.</p>
  }

  const pass = () => {
    setOrder((current) => (current.length < 2 ? current : [...current.slice(1), current[0]]))
    setSheet('diploma')
  }

  const restore = () => {
    setOrder((current) => (current.length < 2 ? current : [current[current.length - 1], ...current.slice(0, -1)]))
    setSheet('diploma')
  }

  const bring = (id) => {
    setOrder((current) => [id, ...current.filter((item) => item !== id)])
    setSheet('diploma')
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault()
      pass()
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault()
      restore()
    }
  }

  const attachment = active.attachments?.find((item) => item.file === sheet)
  const imageSrc = attachment?.src || active.src
  const imageAlt = attachment?.alt || active.alt
  const turned = active.turn && !attachment

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="order-2 lg:order-1">
        <p className="font-mono text-xs">{items.length} en la pila</p>
        <h2 className="mt-3 font-display text-4xl font-black uppercase leading-none tracking-[-0.04em] sm:text-5xl" aria-live="polite">
          {active.title}
        </h2>
        <p className="mt-3 font-mono text-xs">{active.year} · {active.category}</p>
        <p className="mt-2 text-sm">{active.institution}</p>
        <p className="mt-4 max-w-md text-sm leading-relaxed">{active.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <button type="button" onClick={restore} className="bg-ink-950 px-3 py-2 text-sm font-bold text-fog focus-visible:shadow-[inset_0_0_0_2px_#ffe3d3]">Volver</button>
          <button type="button" onClick={pass} className="bg-ink-950 px-3 py-2 text-sm font-bold text-fog focus-visible:shadow-[inset_0_0_0_2px_#ffe3d3]">Pasar</button>
          {active.attachments?.length ? (
            <>
              <button type="button" aria-pressed={sheet === 'diploma'} onClick={() => setSheet('diploma')} className={`px-3 py-2 text-sm font-bold focus-visible:shadow-[inset_0_0_0_2px_#ffe3d3] ${sheet === 'diploma' ? 'bg-ink-950 text-fog' : 'bg-paper text-ink-950'}`}>
                Diploma
              </button>
              {active.attachments.map((item) => (
                <button key={item.file} type="button" aria-pressed={sheet === item.file} onClick={() => setSheet(item.file)} className={`px-3 py-2 text-sm font-bold focus-visible:shadow-[inset_0_0_0_2px_#ffe3d3] ${sheet === item.file ? 'bg-ink-950 text-fog' : 'bg-paper text-ink-950'}`}>
                  {item.label}
                </button>
              ))}
            </>
          ) : null}
        </div>
      </div>
      <div
        role="list"
        tabIndex={0}
        aria-label="Baraja de diplomas"
        onKeyDown={onKeyDown}
        className="relative order-1 outline-none lg:order-2"
        style={{ minHeight: `calc(28rem + ${(items.length - 1) * PEEK}rem)` }}
      >
        {order.map((id, depth) => {
          const item = byId.get(id)
          if (!item) return null
          const front = depth === 0
          const shared = 'absolute inset-x-0 top-0 flex h-[28rem] flex-col border-2 border-ink-950 bg-paper text-left text-paper-ink motion-safe:transition-transform motion-safe:duration-300'
          const style = {
            transform: `translateY(${depth * PEEK}rem)`,
            zIndex: items.length - depth,
          }
          const footer = (
            <span className="flex h-14 shrink-0 items-center justify-between gap-3 border-t-2 border-ink-950 px-3">
              <span className="truncate text-sm font-bold">{item.title}</span>
              <span className="shrink-0 font-mono text-xs">{item.year}</span>
            </span>
          )
          if (!front) {
            return (
              <button key={id} type="button" role="listitem" aria-label={`Traer al frente: ${item.title}`} onClick={() => bring(id)} className={shared} style={style}>
                <span className="min-h-0 flex-1 bg-ink-950" />
                {footer}
              </button>
            )
          }
          return (
            <article key={id} role="listitem" aria-current="true" className={shared} style={style}>
              <div className="relative min-h-0 flex-1 overflow-hidden bg-paper">
                {imageSrc ? (
                  <img src={imageSrc} alt={imageAlt} className={`absolute inset-0 h-full w-full object-contain ${turned ? 'rotate-90' : ''}`} />
                ) : (
                  <p className="px-4 text-center font-mono text-xs text-paper-ink">Falta el archivo {item.file}</p>
                )}
              </div>
              {footer}
            </article>
          )
        })}
      </div>
    </div>
  )
}
