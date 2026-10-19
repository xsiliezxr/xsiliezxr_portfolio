import { useEffect, useRef } from 'react'
import handsUrl from '../../../../assets/images/ascii-hands.webp'

const RAMP = '·:-=+*#%@'

function sampleHands(image) {
  const cols = 240
  const rows = Math.max(48, Math.round(cols * (image.height / image.width) * 0.48))
  const plate = document.createElement('canvas')
  plate.width = cols
  plate.height = rows
  const context = plate.getContext('2d', { willReadFrequently: true })
  context.drawImage(image, 0, 0, cols, rows)
  const data = context.getImageData(0, 0, cols, rows).data
  const glyphs = []
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const index = (y * cols + x) * 4
      const lum = (data[index] * 0.3 + data[index + 1] * 0.59 + data[index + 2] * 0.11) / 255
      if (lum < 0.08 || data[index + 3] < 16) continue
      const level = Math.min(RAMP.length - 1, Math.max(1, Math.round(lum * (RAMP.length - 1))))
      glyphs.push({
        u: (x + 0.5) / cols,
        v: (y + 0.5) / rows,
        char: RAMP[level],
        weight: 0.62 + lum * 0.7,
        shiftX: 0,
        shiftY: 0,
      })
    }
  }
  return { glyphs, ratio: image.width / image.height }
}

function mixColor(amount) {
  const rest = [200, 196, 188]
  const hot = [255, 91, 20]
  const channel = (index) => Math.round(rest[index] + (hot[index] - rest[index]) * amount)
  return `rgb(${channel(0)} ${channel(1)} ${channel(2)})`
}

export function AsciiHands() {
  const root = useRef(null)
  const canvasRef = useRef(null)
  const field = useRef({
    glyphs: [],
    ratio: 2.4,
    pointer: { x: -9999, y: -9999, on: false },
    frame: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const rootNode = root.current
    if (!canvas || !rootNode) return undefined
    const context = canvas.getContext('2d')
    const image = new Image()
    let alive = true
    image.src = handsUrl

    const fit = () => {
      const width = rootNode.clientWidth
      const height = rootNode.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const place = (width, height) => {
      const imageRatio = field.current.ratio
      const bandRatio = width / Math.max(height, 1)
      let drawW = width
      let drawH = width / imageRatio
      if (imageRatio < bandRatio) {
        drawH = height
        drawW = height * imageRatio
      }
      return {
        x: (width - drawW) / 2,
        y: (height - drawH) / 2,
        w: drawW,
        h: drawH,
      }
    }

    const paint = () => {
      const width = rootNode.clientWidth
      const height = rootNode.clientHeight
      const box = place(width, height)
      const pointer = field.current.pointer
      const radius = Math.min(width, height) * 0.22
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      context.clearRect(0, 0, width, height)
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      const base = Math.max(5, box.w / 250)
      for (const glyph of field.current.glyphs) {
        const restX = box.x + glyph.u * box.w
        const restY = box.y + glyph.v * box.h
        let goalX = 0
        let goalY = 0
        let heat = 0
        if (!reduced && pointer.on) {
          const dx = restX - pointer.x
          const dy = restY - pointer.y
          const dist = Math.hypot(dx, dy) || 0.001
          if (dist < radius) {
            const falloff = (1 - dist / radius) ** 2
            const lift = falloff * radius * 0.95
            goalX = (dx / dist) * falloff * radius * 0.16
            goalY = -lift
            heat = falloff
          }
        }
        glyph.shiftX += (goalX - glyph.shiftX) * 0.18
        glyph.shiftY += (goalY - glyph.shiftY) * 0.18
        context.fillStyle = mixColor(heat)
        context.font = `${base * glyph.weight}px "Monaspace Neon", ui-monospace, monospace`
        context.fillText(glyph.char, restX + glyph.shiftX, restY + glyph.shiftY)
      }
    }

    const tick = () => {
      paint()
      field.current.frame = window.requestAnimationFrame(tick)
    }

    const point = (event) => {
      const rect = canvas.getBoundingClientRect()
      field.current.pointer.x = event.clientX - rect.left
      field.current.pointer.y = event.clientY - rect.top
      field.current.pointer.on = true
    }

    const leave = () => {
      field.current.pointer.on = false
    }

    const onResize = () => fit()

    image.onload = () => {
      if (!alive) return
      const sampled = sampleHands(image)
      field.current.glyphs = sampled.glyphs
      field.current.ratio = sampled.ratio
      fit()
    }

    rootNode.addEventListener('pointermove', point)
    rootNode.addEventListener('pointerleave', leave)
    window.addEventListener('resize', onResize)
    field.current.frame = window.requestAnimationFrame(tick)

    return () => {
      alive = false
      window.cancelAnimationFrame(field.current.frame)
      rootNode.removeEventListener('pointermove', point)
      rootNode.removeEventListener('pointerleave', leave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div ref={root} className="ascii-hands" aria-label="Manos">
      <canvas ref={canvasRef} />
    </div>
  )
}
