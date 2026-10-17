function stable(value) {
  return Math.round(value * 1_000_000) / 1_000_000
}

function wrapCentered(value, cycle) {
  if (cycle <= 0) return 0
  return stable((((value + cycle / 2) % cycle) + cycle) % cycle - cycle / 2)
}

export function computeEditorialRailPositions(count, offset, options = {}) {
  if (!Number.isFinite(count) || count <= 0) {
    return { activeIndex: 0, cycle: 0, items: [] }
  }

  if (count === 1) {
    return {
      activeIndex: 0,
      cycle: 0,
      items: [{ index: 0, x: 0, y: 0, scale: 1, tilt: 0, yaw: 0, zIndex: 1000, isActive: true }],
    }
  }

  const spacing = Math.max(1, options.spacing ?? 220)
  const viewportWidth = Math.max(spacing, options.viewportWidth ?? 1440)
  const safeOffset = Number.isFinite(offset) ? offset : 0
  const cycle = spacing * count
  const fanRadius = Math.max(spacing * 3, viewportWidth * 0.5)
  const curveDepth = Math.max(0, options.curveDepth ?? 54)
  const maxTilt = Math.max(0, options.maxTilt ?? 11)
  const maxYaw = Math.max(0, options.maxYaw ?? 6)

  const items = Array.from({ length: count }, (_, index) => {
    const x = wrapCentered(index * spacing + safeOffset, cycle)
    const distance = Math.abs(x)
    const fanPosition = Math.max(-1, Math.min(1, x / fanRadius))
    const fanDistance = Math.abs(fanPosition)
    return {
      index,
      x,
      y: stable(fanDistance ** 2 * curveDepth),
      scale: stable(1 - fanDistance * 0.07),
      tilt: stable(fanPosition * maxTilt),
      yaw: fanPosition === 0 ? 0 : stable(-fanPosition * maxYaw),
      zIndex: Math.max(1, 1000 - Math.round(distance)),
      isActive: false,
    }
  })

  let activeIndex = 0
  let shortestDistance = Infinity
  for (const item of items) {
    const distance = Math.abs(item.x)
    if (distance < shortestDistance) {
      shortestDistance = distance
      activeIndex = item.index
    }
  }
  for (const item of items) item.isActive = item.index === activeIndex
  return { activeIndex, cycle, items }
}
