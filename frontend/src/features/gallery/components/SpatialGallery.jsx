import { useEffect, useRef, useState } from 'react'
import { FrameDialog } from '../../../shared/components/FrameDialog.jsx'
import { useReducedMotion } from '../../../shared/hooks/useReducedMotion.js'
import { galleryFrames } from '../gallery.content.js'

const CANVAS = { width: 2820, height: 2350, refWidth: 1440, refHeight: 900 }

function StoryFrame({ frame, onEnter, onLeave, onOpen }) {
  const origin = useRef(null)

  return (
    <figure
      className="group absolute left-1/2 top-1/2 m-0 cursor-pointer"
      style={{
        width: frame.w,
        height: frame.h,
        transform: `translate(calc(-50% + ${frame.tx}px), calc(-50% + ${frame.ty}px))`,
      }}
      role="button"
      tabIndex={0}
      aria-label={`Abrir detalle: ${frame.title}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onPointerDown={(event) => {
        origin.current = { x: event.clientX, y: event.clientY }
      }}
      onClick={(event) => {
        const start = origin.current
        origin.current = null
        if (start && (Math.abs(event.clientX - start.x) > 8 || Math.abs(event.clientY - start.y) > 8)) return
        onOpen()
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpen()
        }
      }}
    >
      <div className="relative size-full overflow-hidden rounded-[12px] border border-ink-700 bg-ink-800 transition-colors duration-300 group-hover:border-ember-500">
        <img
          src={frame.src}
          alt={frame.alt}
          draggable={false}
          className="size-full object-cover grayscale transition-[filter,transform] duration-500 group-hover:scale-[1.02] group-hover:grayscale-0 group-focus-visible:grayscale-0"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/90 via-ink-950/40 to-transparent px-3 pt-8 pb-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="block truncate font-mono text-[10px] text-amber">{frame.caption}</span>
          <span className="block truncate font-display text-xs font-bold uppercase text-fog">{frame.title}</span>
        </div>
      </div>
    </figure>
  )
}

export function SpatialGallery() {
  const reduced = useReducedMotion()
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const scaleRef = useRef(1)
  const dragging = useRef(false)
  const lastTouch = useRef({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const [caption, setCaption] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const frameParam = params.get('frame')
    if (!frameParam) return
    const match = galleryFrames.find((frame, index) => frame.id === frameParam || String(index + 1) === frameParam)
    if (match) setSelected(match)
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined
    const measure = () => {
      const rect = stage.getBoundingClientRect()
      const next = Math.min(rect.width / CANVAS.refWidth, rect.height / CANVAS.refHeight)
      scaleRef.current = next
      setScale(next)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reduced || selected) return undefined
    let frame = 0
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.06
      current.current.y += (target.current.y - current.current.y) * 0.06
      const canvas = canvasRef.current
      if (canvas) {
        canvas.style.transform = `translate3d(${-current.current.x * 160}px, ${-current.current.y * 120}px, 0) scale(${scaleRef.current})`
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [reduced, selected])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || reduced || selected) return undefined
    const onPointerMove = (event) => {
      if (dragging.current) return
      const rect = stage.getBoundingClientRect()
      target.current = {
        x: Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1)),
        y: Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1)),
      }
    }
    const onTouchStart = (event) => {
      const touch = event.touches[0]
      if (!touch) return
      dragging.current = true
      lastTouch.current = { x: touch.clientX, y: touch.clientY }
    }
    const onTouchMove = (event) => {
      const touch = event.touches[0]
      if (!touch || !dragging.current) return
      const dx = (touch.clientX - lastTouch.current.x) / (stage.clientWidth * 0.35)
      const dy = (touch.clientY - lastTouch.current.y) / (stage.clientHeight * 0.35)
      lastTouch.current = { x: touch.clientX, y: touch.clientY }
      target.current = {
        x: Math.max(-1, Math.min(1, target.current.x - dx)),
        y: Math.max(-1, Math.min(1, target.current.y - dy)),
      }
    }
    const onTouchEnd = () => {
      dragging.current = false
    }
    stage.addEventListener('pointermove', onPointerMove)
    stage.addEventListener('touchstart', onTouchStart, { passive: true })
    stage.addEventListener('touchmove', onTouchMove, { passive: true })
    stage.addEventListener('touchend', onTouchEnd)
    stage.addEventListener('touchcancel', onTouchEnd)
    return () => {
      stage.removeEventListener('pointermove', onPointerMove)
      stage.removeEventListener('touchstart', onTouchStart)
      stage.removeEventListener('touchmove', onTouchMove)
      stage.removeEventListener('touchend', onTouchEnd)
      stage.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [reduced, selected])

  return (
    <section ref={stageRef} className="relative h-[calc(100dvh-var(--masthead))] w-full touch-none overflow-hidden" aria-label="Galería">
      <header className="pointer-events-none absolute top-4 left-4 z-[3] w-[min(86vw,22rem)] rounded-[12px] border border-ink-700 bg-ink-900/90 p-4 backdrop-blur-sm sm:top-6 sm:left-8 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <h1 className="m-0 font-display text-[clamp(1.5rem,3.8vw,2.25rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-fog">
            Cosas que me pasaron
          </h1>
          <span className="shrink-0 rounded-[12px] border border-ink-700 bg-ink-950 px-2.5 py-1 font-mono text-[11px] text-amber">
            {String(galleryFrames.length).padStart(2, '0')} fotos
          </span>
        </div>
        <p className="m-0 mt-2 font-mono text-[11px] text-ember-300">
          Mueve el cursor o arrastra · Clic para abrir
        </p>
        {caption && !selected ? (
          <p className="m-0 mt-2.5 truncate border-t border-ink-700 pt-2 font-mono text-xs text-fog">
            {caption}
          </p>
        ) : null}
      </header>
      <div className="absolute inset-0 z-[1] flex items-center justify-center overflow-hidden">
        <div
          ref={canvasRef}
          className="relative will-change-transform"
          style={{
            width: CANVAS.width,
            height: CANVAS.height,
            transform: reduced || selected ? `scale(${scale})` : undefined,
            transformOrigin: 'center center',
          }}
        >
          {galleryFrames.map((frame) => (
            <StoryFrame
              key={frame.id}
              frame={frame}
              onEnter={() => setCaption(frame.caption)}
              onLeave={() => setCaption('')}
              onOpen={() => setSelected(frame)}
            />
          ))}
        </div>
      </div>
      <FrameDialog open={Boolean(selected)} title={selected?.title ?? 'Foto'} onClose={() => setSelected(null)}>
        {({ titleId, closeRef }) => (
          <>
            <div className={`relative bg-ink-950 ${selected?.aspect === 'portrait' ? 'min-h-[42vh] md:min-h-[28rem]' : 'min-h-[34vh] md:min-h-[24rem]'}`}>
              {selected?.src ? <img src={selected.src} alt={selected.alt} className="absolute inset-0 h-full w-full object-cover" /> : null}
            </div>
            <div className="flex flex-col justify-between gap-6 px-5 py-6">
              <div>
                <p className="m-0 font-mono text-xs text-ember-300">{selected?.caption}</p>
                <h2 id={titleId} className="m-0 mt-2 font-display text-2xl font-black uppercase leading-tight text-fog sm:text-3xl">
                  {selected?.title}
                </h2>
                <p className="m-0 mt-4 rounded-[12px] border border-ink-700 bg-ink-950 p-4 font-sans text-sm leading-relaxed text-fog">
                  {selected?.description}
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setSelected(null)}
                className="self-start rounded-[12px] bg-ember-500 px-4 py-2.5 font-mono text-xs font-bold text-ink-950 transition-colors hover:bg-ember-300"
              >
                Cerrar
              </button>
            </div>
          </>
        )}
      </FrameDialog>
    </section>
  )
}
