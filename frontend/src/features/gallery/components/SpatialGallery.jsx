import { useEffect, useMemo, useRef, useState } from 'react'
import learn from '../../../assets/images/hobbies/learn.webp'
import { FrameDialog } from '../../../shared/components/FrameDialog.jsx'
import { HobbyMark } from '../../../shared/hobbies/HobbyMark.jsx'
import { useReducedMotion } from '../../../shared/hooks/useReducedMotion.js'
import { GALLERY } from '../../../shared/i18n/copy.js'
import { useLocaleStore } from '../../../shared/i18n/locale.store.js'
import { useLocalized } from '../../../shared/i18n/useLocalized.js'
import { galleryFrames as frameRecords } from '../gallery.data.js'

const SIZES = [
  { w: 440, h: 200, aspect: 'landscapeWide' },
  { w: 380, h: 240, aspect: 'landscape' },
  { w: 220, h: 320, aspect: 'portrait' },
  { w: 240, h: 240, aspect: 'medium' },
]

const STEP = { x: 520, y: 420 }

function spiralCells(count) {
  const cells = [[0, 0]]
  const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]]
  let x = 0
  let y = 0
  let dir = 0
  let leg = 1
  while (cells.length < count) {
    for (let turn = 0; turn < 2 && cells.length < count; turn += 1) {
      const [dx, dy] = dirs[dir % 4]
      for (let step = 0; step < leg && cells.length < count; step += 1) {
        x += dx
        y += dy
        cells.push([x, y])
      }
      dir += 1
    }
    leg += 1
  }
  return cells
}

function sceneFor(records) {
  const cells = spiralCells(records.length)
  const frames = records.map((frame, index) => {
    const size = SIZES[index % SIZES.length]
    const [cx, cy] = cells[index]
    return {
      ...frame,
      tx: cx * STEP.x,
      ty: cy * STEP.y,
      w: size.w,
      h: size.h,
      aspect: size.aspect,
    }
  })
  let reachX = 280
  let reachY = 220
  for (const frame of frames) {
    reachX = Math.max(reachX, Math.abs(frame.tx) + frame.w / 2)
    reachY = Math.max(reachY, Math.abs(frame.ty) + frame.h / 2)
  }
  const pad = 220
  return {
    canvas: {
      width: Math.ceil(reachX * 2 + pad),
      height: Math.ceil(reachY * 2 + pad),
      refWidth: 1440,
      refHeight: 900,
    },
    frames,
  }
}

function StoryFrame({ frame, openLabel, onEnter, onLeave, onOpen }) {
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
      aria-label={`${openLabel}: ${frame.title}`}
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
  const ui = GALLERY[useLocaleStore((state) => state.lang)]
  const scene = useMemo(() => sceneFor(frameRecords), [])
  const frames = useLocalized(scene.frames)
  const canvas = scene.canvas
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const scaleRef = useRef(1)
  const dragging = useRef(false)
  const lastTouch = useRef({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const [caption, setCaption] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const selected = frames.find((frame) => frame.id === selectedId) ?? null
  const urlApplied = useRef(false)

  useEffect(() => {
    if (urlApplied.current) return undefined
    urlApplied.current = true
    const params = new URLSearchParams(window.location.search)
    const frameParam = params.get('frame')
    if (!frameParam) return undefined
    const match = frames.find((frame, index) => frame.id === frameParam || String(index + 1) === frameParam)
    if (match) setSelectedId(match.id)
    return undefined
  }, [frames])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined
    const measure = () => {
      const rect = stage.getBoundingClientRect()
      const next = Math.min(rect.width / canvas.refWidth, rect.height / canvas.refHeight)
      scaleRef.current = next
      setScale(next)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reduced || selectedId) return undefined
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
  }, [reduced, selectedId])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || reduced || selectedId) return undefined
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
  }, [reduced, selectedId])

  return (
    <section ref={stageRef} className="relative h-[calc(100dvh-var(--masthead))] w-full touch-none overflow-hidden" aria-label={ui.label}>
      <header className="pointer-events-none absolute top-4 left-4 z-[3] w-[min(86vw,22rem)] sm:top-6 sm:left-8">
        <div className="flex items-end justify-between gap-3">
          <h1 className="m-0 font-display text-[clamp(1.5rem,3.8vw,2.25rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-fog">
            {ui.title}
          </h1>
          <span className="shrink-0 font-mono text-[11px] text-amber">
            {String(frames.length).padStart(2, '0')} {ui.photos}
          </span>
        </div>
        <p className="m-0 mt-2 font-mono text-[11px] text-ember-300">
          {ui.hint}
        </p>
        {caption && !selected ? (
          <p className="m-0 mt-2.5 truncate font-mono text-xs text-amber">
            {caption}
          </p>
        ) : null}
      </header>
      <div className="absolute inset-0 z-[1] flex items-center justify-center overflow-hidden">
        <div
          ref={canvasRef}
          className="relative will-change-transform"
          style={{
            width: canvas.width,
            height: canvas.height,
            transform: reduced || selectedId ? `scale(${scale})` : undefined,
            transformOrigin: 'center center',
          }}
        >
          <HobbyMark
            id="cleancode"
            image={learn}
            className="hobby-mark-gallery"
          />
          {frames.map((frame) => (
            <StoryFrame
              key={frame.id}
              frame={frame}
              openLabel={ui.open}
              onEnter={() => setCaption(frame.caption)}
              onLeave={() => setCaption('')}
              onOpen={() => setSelectedId(frame.id)}
            />
          ))}
        </div>
      </div>
      <FrameDialog open={Boolean(selected)} title={selected?.title ?? ui.photo} closeLabel={ui.close} onClose={() => setSelectedId(null)}>
        {({ titleId, closeRef }) => (
          <>
            <div className="relative min-h-[38vh] bg-paper md:min-h-[28rem]">
              {selected?.src ? <img src={selected.src} alt={selected.alt} className="absolute inset-0 size-full object-contain p-4" /> : null}
            </div>
            <div className="flex flex-col justify-between gap-6 px-5 py-6">
              <div>
                <p className="m-0 font-mono text-xs text-ember-300">{selected?.caption}</p>
                <h2 id={titleId} className="m-0 mt-2 font-display text-2xl font-black uppercase leading-tight text-fog sm:text-3xl">
                  {selected?.title}
                </h2>
                <p className="m-0 mt-4 font-sans text-sm leading-relaxed text-fog">
                  {selected?.description}
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setSelectedId(null)}
                className="self-start rounded-[12px] bg-ember-500 px-4 py-2.5 font-mono text-xs font-bold text-ink-950 transition-colors hover:bg-ember-300"
              >
                {ui.close}
              </button>
            </div>
          </>
        )}
      </FrameDialog>
    </section>
  )
}
