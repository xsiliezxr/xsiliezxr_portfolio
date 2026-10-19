import { useEffect, useMemo, useRef, useState } from 'react'
import { FrameDialog } from '../../../shared/components/FrameDialog.jsx'
import { useReducedMotion } from '../../../shared/hooks/useReducedMotion.js'
import { AWARD_FILTERS, listAwardCards } from '../certifications.content.js'
import { computeEditorialRailPositions } from '../editorialRailMath.js'

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function Thumbnail({ cert, active }) {
  const rotated = Boolean(cert.thumbTurn)
  return (
    <img
      src={cert.src}
      alt=""
      draggable={false}
      className={`absolute top-1/2 left-1/2 max-w-none object-contain object-center ${active ? '' : 'grayscale'}`}
      style={{
        width: rotated ? '133.333%' : '100%',
        height: rotated ? '75%' : '100%',
        transform: `translate(-50%, -50%) rotate(${rotated ? 90 : 0}deg)`,
      }}
    />
  )
}

export function CertificateRail() {
  const reduced = useReducedMotion()
  const stageRef = useRef(null)
  const targetOffset = useRef(0)
  const currentOffset = useRef(0)
  const touch = useRef({ active: false, x: 0, y: 0, distance: 0 })
  const frameRef = useRef(0)
  const suppressClick = useRef(false)
  const [filter, setFilter] = useState('all')
  const [offset, setOffset] = useState(0)
  const [selected, setSelected] = useState(null)
  const [sheet, setSheet] = useState('diploma')
  const [viewport, setViewport] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }))

  const awards = useMemo(() => listAwardCards(filter), [filter])

  useEffect(() => {
    const onResize = () => setViewport({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    cancelAnimationFrame(frameRef.current)
    frameRef.current = 0
    targetOffset.current = 0
    currentOffset.current = 0
    setOffset(0)
    setSelected(null)
  }, [filter])

  const isMobile = viewport.width < 640
  const cardHeight = clamp(isMobile ? Math.min(viewport.height * 0.56, viewport.width * 1.18) : viewport.height * 0.56, isMobile ? 300 : 360, 560)
  const cardWidth = cardHeight * 0.75
  const spacing = cardWidth * 0.58
  const rail = useMemo(
    () => computeEditorialRailPositions(awards.length, offset, {
      spacing,
      viewportWidth: viewport.width,
      curveDepth: isMobile ? 30 : 54,
      maxTilt: isMobile ? 7 : 11,
      maxYaw: isMobile ? 3 : 6,
    }),
    [awards.length, isMobile, offset, spacing, viewport.width],
  )
  const active = awards[rail.activeIndex] ?? awards[0]
  const attachment = selected?.attachments?.find((item) => item.file === sheet)
  const imageSrc = attachment?.src || selected?.src
  const imageAlt = attachment?.alt || selected?.alt

  const animateTo = (next) => {
    targetOffset.current = next
    if (reduced || selected) {
      currentOffset.current = next
      setOffset(next)
      return
    }
    if (frameRef.current) return
    const tick = () => {
      const delta = targetOffset.current - currentOffset.current
      if (Math.abs(delta) <= 0.01) {
        currentOffset.current = targetOffset.current
        setOffset(targetOffset.current)
        frameRef.current = 0
        return
      }
      currentOffset.current += delta * 0.075
      setOffset(currentOffset.current)
      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || selected || awards.length === 0) return undefined
    const onWheel = (event) => {
      const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX
      if (Math.abs(delta) < 0.01) return
      event.preventDefault()
      animateTo(targetOffset.current + delta * 0.5)
    }
    stage.addEventListener('wheel', onWheel, { passive: false })
    return () => stage.removeEventListener('wheel', onWheel)
  })

  const openCertificate = (cert) => {
    if (suppressClick.current) {
      suppressClick.current = false
      return
    }
    setSheet('diploma')
    setSelected(cert)
  }

  return (
    <section
      ref={stageRef}
      className="relative h-[calc(100dvh-var(--masthead))] w-full touch-none overflow-hidden"
      aria-label="Reconocimientos"
      tabIndex={0}
      onPointerDown={(event) => {
        if (event.pointerType === 'mouse' || awards.length === 0) return
        touch.current = { active: true, x: event.clientX, y: event.clientY, distance: 0 }
        event.currentTarget.setPointerCapture(event.pointerId)
      }}
      onPointerMove={(event) => {
        if (selected || !touch.current.active || awards.length === 0) return
        const dx = event.clientX - touch.current.x
        const dy = event.clientY - touch.current.y
        touch.current.x = event.clientX
        touch.current.y = event.clientY
        const dominant = Math.abs(dy) >= Math.abs(dx) ? dy : -dx
        touch.current.distance += Math.abs(dominant)
        animateTo(targetOffset.current + dominant * 1.35)
        if (touch.current.distance > 8) suppressClick.current = true
      }}
      onPointerUp={(event) => {
        if (event.pointerType === 'mouse') return
        touch.current.active = false
        window.setTimeout(() => {
          suppressClick.current = false
        }, 0)
      }}
      onKeyDown={(event) => {
        if (selected || awards.length === 0) return
        if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
          event.preventDefault()
          animateTo(targetOffset.current + spacing)
        }
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
          event.preventDefault()
          animateTo(targetOffset.current - spacing)
        }
      }}
    >
      <header className="pointer-events-none absolute top-4 right-4 left-4 z-20 sm:top-6 sm:right-8 sm:left-8">
        <h1 className="m-0 font-display text-2xl font-black uppercase tracking-[-0.04em] text-fog sm:text-3xl">
          Reconocimientos
        </h1>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <div className="pointer-events-auto flex flex-wrap gap-2" role="group" aria-label="Filtrar reconocimientos">
            {AWARD_FILTERS.map((option) => {
              const activeFilter = filter === option.id
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={activeFilter}
                  onClick={() => setFilter(option.id)}
                  className={`px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors ${
                    activeFilter
                      ? 'bg-ember-500 font-bold text-ink-950'
                      : 'border border-ink-700 bg-ink-950/90 text-fog hover:border-ember-500 hover:text-ember-300'
                  }`}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
          <p className="m-0 font-mono text-[11px] text-amber">
            {awards.length === 0
              ? '00 / 00'
              : `${String(rail.activeIndex + 1).padStart(2, '0')} / ${String(awards.length).padStart(2, '0')}`}
          </p>
        </div>
        <p className="m-0 mt-2 font-mono text-[11px] text-ember-300">
          {awards.length === 0 ? (
            filter === 'badge'
              ? 'Aún no hay badges publicados. Cuando lleguen, irán con enlace de verificación.'
              : 'No hay piezas en este filtro.'
          ) : (
            <>
              <span className="hidden md:inline">Rueda para recorrer · Clic para abrir</span>
              <span className="md:hidden">Desliza a un lado o hacia abajo · Toca para abrir</span>
            </>
          )}
        </p>
      </header>

      {awards.length > 0 ? (
        <div className="absolute inset-0 [perspective:1400px]">
          {rail.items.map((item) => {
            const cert = awards[item.index]
            if (!cert) return null
            return (
              <div
                key={cert.id}
                className="absolute top-[58%] left-1/2 aspect-[3/4] origin-bottom"
                style={{
                  height: `${cardHeight}px`,
                  transform: `translate(calc(-50% + ${item.x}px), calc(-50% + ${item.y}px)) rotateZ(${item.tilt}deg) rotateY(${item.yaw}deg) scale(${item.scale})`,
                  zIndex: item.zIndex,
                  pointerEvents: Math.abs(item.x) <= viewport.width * 0.62 ? 'auto' : 'none',
                }}
              >
                <button
                  type="button"
                  aria-label={`Abrir ${cert.title}`}
                  onClick={() => openCertificate(cert)}
                  className={`relative size-full overflow-hidden rounded-[12px] border bg-ink-950 text-left transition-colors ${
                    item.isActive
                      ? 'border-ember-500 shadow-[0_24px_60px_rgba(0,0,0,0.65)]'
                      : 'border-ink-700 hover:border-ember-500/60'
                  }`}
                >
                  <Thumbnail cert={cert} active={item.isActive} />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950 via-ink-950/80 to-transparent px-4 pt-12 pb-4">
                    <span className="block font-mono text-[10px] text-amber">{cert.year} · {cert.category}</span>
                    <span className="mt-1 block font-display text-sm font-bold leading-tight text-fog">{cert.title}</span>
                  </span>
                </button>
              </div>
            )
          })}
        </div>
      ) : null}

      {awards.length > 0 ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex items-end justify-between gap-4 px-4 sm:bottom-6 sm:px-8">
          <button
            type="button"
            className="pointer-events-auto rounded-[12px] border border-ink-700 bg-ink-900/90 px-4 py-2.5 font-mono text-xs text-fog transition-colors hover:border-ember-500 hover:text-ember-300"
            onClick={() => animateTo(targetOffset.current + spacing)}
          >
            ← Anterior
          </button>
          <div className="max-w-md text-center">
            <p className="m-0 font-mono text-[11px] text-ember-300">{active?.institution}</p>
            <p className="m-0 mt-0.5 hidden font-display text-sm font-bold text-fog sm:block">{active?.title}</p>
          </div>
          <button
            type="button"
            className="pointer-events-auto rounded-[12px] border border-ink-700 bg-ink-900/90 px-4 py-2.5 font-mono text-xs text-fog transition-colors hover:border-ember-500 hover:text-ember-300"
            onClick={() => animateTo(targetOffset.current - spacing)}
          >
            Siguiente →
          </button>
        </div>
      ) : null}

      <FrameDialog open={Boolean(selected)} title={selected?.title ?? 'Reconocimiento'} onClose={() => setSelected(null)}>
        {({ titleId, closeRef }) => (
          <>
            <div className="relative min-h-[38vh] bg-paper md:min-h-[28rem]">
              {imageSrc ? <img src={imageSrc} alt={imageAlt} className="absolute inset-0 size-full object-contain p-4" /> : null}
            </div>
            <div className="flex max-h-[46dvh] flex-col justify-between gap-6 overflow-y-auto px-5 py-6 md:max-h-none">
              <div>
                <p className="m-0 font-mono text-xs text-ember-300">{selected?.category} · {selected?.year}</p>
                <h2 id={titleId} className="m-0 mt-2 font-display text-2xl font-black uppercase leading-tight text-fog sm:text-3xl">
                  {selected?.title}
                </h2>
                <p className="m-0 mt-2 font-mono text-xs text-fog-dim">{selected?.institution}</p>
                <p className="m-0 mt-4 font-sans text-sm leading-relaxed text-fog">
                  {selected?.description}
                </p>
                {selected?.attachments?.length ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      type="button"
                      aria-pressed={sheet === 'diploma'}
                      onClick={() => setSheet('diploma')}
                      className={`rounded-[12px] border px-3.5 py-2 font-mono text-xs transition-colors ${
                        sheet === 'diploma'
                          ? 'border-ember-500 bg-ember-500 font-bold text-ink-950'
                          : 'border-ink-700 bg-ink-950 text-fog hover:border-ember-500/60'
                      }`}
                    >
                      Diploma
                    </button>
                    {selected.attachments.map((item) => (
                      <button
                        key={item.file}
                        type="button"
                        aria-pressed={sheet === item.file}
                        onClick={() => setSheet(item.file)}
                        className={`rounded-[12px] border px-3.5 py-2 font-mono text-xs transition-colors ${
                          sheet === item.file
                            ? 'border-ember-500 bg-ember-500 font-bold text-ink-950'
                            : 'border-ink-700 bg-ink-950 text-fog hover:border-ember-500/60'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {selected?.verifyUrl ? (
                  <a
                    href={selected.verifyUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-[12px] border border-ember-500 px-4 py-2.5 font-mono text-xs font-bold text-ember-300 transition-colors hover:bg-ember-500 hover:text-ink-950"
                  >
                    Verificar
                  </a>
                ) : null}
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setSelected(null)}
                  className="self-start rounded-[12px] bg-ember-500 px-4 py-2.5 font-mono text-xs font-bold text-ink-950 transition-colors hover:bg-ember-300"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </>
        )}
      </FrameDialog>
    </section>
  )
}
