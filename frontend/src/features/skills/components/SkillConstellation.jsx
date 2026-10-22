import { useMemo, useRef, useState } from 'react'
import { useLang, useLocalized } from '../../../shared/i18n/useLocalized.js'
import { useReducedMotion } from '../../../shared/hooks/useReducedMotion.js'
import { SkillMark } from './SkillMark.jsx'
import { skillConstellations } from '../skills.data.js'

const UI = {
  maps: { es: 'Mapas de habilidades', en: 'Skill maps' },
  drag: { es: 'Arrastra un nodo para tensar la red', en: 'Drag a node to tension the net' },
  mark: { es: 'CONSTELACIÓN', en: 'CONSTELLATION' },
  connected: { es: 'Nodos conectados', en: 'Connected nodes' },
  alone: { es: 'Nodo autónomo dentro de', en: 'Standalone node inside' },
  group: { es: 'Grupo activo:', en: 'Active group:' },
  tech: { es: 'tecnologías', en: 'technologies' },
  index: { es: 'Índice de', en: 'Index of' },
  az: { es: '(A–Z)', en: '(A–Z)' },
  nodes: { es: 'nodos', en: 'nodes' },
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function neighborsOf(edges, id) {
  const list = []
  for (const edge of edges) {
    if (edge.from === id) list.push(edge.to)
    if (edge.to === id) list.push(edge.from)
  }
  return list
}

export function SkillConstellation() {
  const reduced = useReducedMotion()
  const lang = useLang()
  const groups = useLocalized(skillConstellations)
  const ui = useLocalized(UI)
  const [tab, setTab] = useState(groups[0].id)
  const constellation = groups.find((item) => item.id === tab) ?? groups[0]
  const anchors = useMemo(() => Object.fromEntries(constellation.nodes.map((node) => [node.id, { x: node.x, y: node.y }])), [constellation])
  const [positions, setPositions] = useState(anchors)
  const [focusId, setFocusId] = useState(constellation.nodes[0]?.id ?? null)
  const [dragging, setDragging] = useState(false)
  const mapRef = useRef(null)
  const dragRef = useRef(null)

  const activeEdges = useMemo(() => {
    if (!focusId) return new Set()
    return new Set(constellation.edges.filter((edge) => edge.from === focusId || edge.to === focusId).map((edge) => `${edge.from}-${edge.to}`))
  }, [constellation.edges, focusId])

  const activeNodes = useMemo(() => {
    if (!focusId) return new Set()
    const set = new Set([focusId])
    for (const edge of constellation.edges) {
      if (edge.from === focusId) set.add(edge.to)
      if (edge.to === focusId) set.add(edge.from)
    }
    return set
  }, [constellation.edges, focusId])

  const focused = constellation.nodes.find((node) => node.id === focusId) ?? constellation.nodes[0]
  const connectedNodes = useMemo(() => {
    if (!focused) return []
    const neighborIds = new Set(neighborsOf(constellation.edges, focused.id))
    return constellation.nodes.filter((node) => neighborIds.has(node.id))
  }, [constellation.edges, constellation.nodes, focused])

  const roster = useMemo(
    () => [...constellation.nodes].sort((a, b) => String(a.label).localeCompare(String(b.label), lang === 'en' ? 'en' : 'es')),
    [constellation.nodes, lang],
  )

  const changeTab = (id) => {
    const next = groups.find((item) => item.id === id)
    setTab(id)
    setFocusId(next?.nodes[0]?.id ?? null)
    setPositions(Object.fromEntries((next?.nodes ?? []).map((node) => [node.id, { x: node.x, y: node.y }])))
  }

  const onPointerDown = (id, event) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = { id, x: event.clientX, y: event.clientY, moved: false }
    setDragging(true)
    setFocusId(id)
  }

  const onPointerMove = (id, event) => {
    const drag = dragRef.current
    if (!drag || drag.id !== id || !mapRef.current) return
    const rect = mapRef.current.getBoundingClientRect()
    const dx = ((event.clientX - drag.x) / rect.width) * 100
    const dy = ((event.clientY - drag.y) / rect.height) * 100
    drag.x = event.clientX
    drag.y = event.clientY
    if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) return
    drag.moved = true
    const chain = reduced ? 0 : 0.34
    setPositions((prev) => {
      const next = { ...prev }
      const current = prev[id] ?? anchors[id]
      next[id] = { x: clamp(current.x + dx, 8, 92), y: clamp(current.y + dy, 12, 88) }
      for (const neighborId of neighborsOf(constellation.edges, id)) {
        const neighbor = prev[neighborId]
        if (!neighbor) continue
        next[neighborId] = { x: clamp(neighbor.x + dx * chain, 8, 92), y: clamp(neighbor.y + dy * chain, 12, 88) }
      }
      return next
    })
  }

  const onPointerUp = (id) => {
    const drag = dragRef.current
    dragRef.current = null
    if (drag?.id === id) setPositions(anchors)
    setDragging(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={ui.maps}>
          {groups.map((item) => {
            const active = item.id === tab
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => changeTab(item.id)}
                className={`rounded-[12px] border px-3.5 py-2 font-mono text-xs transition-colors ${
                  active
                    ? 'border-ember-500 bg-ember-500 font-bold text-ink-950'
                    : 'border-ink-700 bg-ink-900 text-fog hover:border-ember-500/60 hover:text-ember-300'
                }`}
              >
                {item.label}
                <span className={`ml-2 font-mono text-[10px] ${active ? 'text-ink-950/75' : 'text-fog-dim'}`}>
                  {item.nodes.length}
                </span>
              </button>
            )
          })}
        </div>
        <p className="m-0 font-mono text-xs text-fog-dim">
          {ui.drag}
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_21rem] lg:items-stretch">
        <div
          ref={mapRef}
          className="relative h-[min(58dvh,30rem)] overflow-hidden rounded-[12px] border border-ink-700 bg-ink-900"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, rgba(255, 91, 20, 0.08), transparent 65%), linear-gradient(to right, rgba(42, 40, 38, 0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 40, 38, 0.45) 1px, transparent 1px)',
            backgroundSize: '100% 100%, 36px 36px, 36px 36px',
          }}
        >
          <div className="pointer-events-none absolute top-3 left-4 z-10 flex items-center gap-2 font-mono text-[11px] text-fog-dim">
            <span className="h-2 w-2 rounded-full bg-ember-500" aria-hidden="true" />
            <span>{ui.mark} · {constellation.label.toUpperCase()}</span>
          </div>

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {constellation.edges.map((edge) => {
              const from = positions[edge.from]
              const to = positions[edge.to]
              if (!from || !to) return null
              const lit = !focusId || activeEdges.has(`${edge.from}-${edge.to}`)
              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={lit ? '#ff5b14' : '#2a2826'}
                  strokeWidth={lit ? 0.65 : 0.35}
                />
              )
            })}
          </svg>

          {constellation.nodes.map((node) => {
            const pos = positions[node.id] ?? anchors[node.id]
            const isSelected = focusId === node.id
            const lit = !focusId || activeNodes.has(node.id)
            return (
              <button
                key={node.id}
                type="button"
                aria-pressed={isSelected}
                onPointerDown={(event) => onPointerDown(node.id, event)}
                onPointerMove={(event) => onPointerMove(node.id, event)}
                onPointerUp={() => onPointerUp(node.id)}
                onPointerCancel={() => onPointerUp(node.id)}
                className={`group absolute flex w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 ${
                  reduced || dragging ? '' : 'transition-[left,top] duration-300'
                }`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <span
                  className={`grid h-12 w-12 place-items-center rounded-[12px] bg-paper transition-transform group-hover:scale-105 ${
                    isSelected
                      ? 'outline outline-2 outline-ember-500 shadow-[0_0_24px_rgba(255,91,20,0.45)]'
                      : lit
                        ? 'outline outline-2 outline-ember-500/75'
                        : ' opacity-65 outline outline-1 outline-ink-700'
                  }`}
                >
                  <SkillMark icon={node.icon} />
                </span>
                <span
                  className={`max-w-20 truncate rounded-[6px] bg-ink-950/90 px-1.5 py-0.5 text-center font-mono text-[10px] leading-tight ${
                    isSelected ? 'font-bold text-ember-300' : lit ? 'text-fog' : 'text-fog-dim'
                  }`}
                >
                  {node.label}
                </span>
              </button>
            )
          })}
        </div>

        <aside
          className="flex flex-col justify-between"
          aria-live="polite"
        >
          {focused ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[12px] bg-paper outline outline-1 outline-ink-700">
                  <SkillMark icon={focused.icon} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="m-0 font-mono text-[11px] uppercase text-ember-300">
                    {constellation.label}
                  </p>
                  <h2 className="m-0 truncate font-display text-2xl font-black uppercase leading-tight text-fog">
                    {focused.label}
                  </h2>
                </div>
                <span className="font-mono text-[11px] text-amber">
                  {focused.levelLabel}
                </span>
              </div>

              <p className="m-0 font-sans text-sm leading-relaxed text-fog">
                {focused.blurb}
              </p>

              <div className="border-t border-ink-700 pt-4">
                <p className="m-0 font-mono text-[10px] uppercase tracking-[0.14em] text-fog-dim">
                  {ui.connected} ({connectedNodes.length})
                </p>
                {connectedNodes.length > 0 ? (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {connectedNodes.map((neighbor) => (
                      <button
                        key={neighbor.id}
                        type="button"
                        onClick={() => setFocusId(neighbor.id)}
                        className="rounded-[12px] border border-ink-700 bg-ink-950 px-2.5 py-1 font-mono text-xs text-fog transition-colors hover:border-ember-500 hover:text-ember-300"
                      >
                        {neighbor.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="m-0 mt-2 font-mono text-xs text-fog-dim">
                    {ui.alone} {constellation.label.toLowerCase()}.
                  </p>
                )}
              </div>
            </div>
          ) : null}

          <div className="mt-6 border-t border-ink-700 pt-4 font-mono text-[11px] text-fog-dim">
            <span>{ui.group} </span>
            <span className="text-fog">{constellation.nodes.length} {ui.tech}</span>
          </div>
        </aside>
      </div>

      <section aria-label={`${ui.index} ${constellation.label}`}>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="m-0 font-mono text-xs uppercase tracking-[0.14em] text-fog-dim">
            {ui.index} {constellation.label} {ui.az}
          </h3>
          <span className="font-mono text-xs text-ember-300">{roster.length} {ui.nodes}</span>
        </div>
        <ul className="m-0 grid list-none gap-2.5 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {roster.map((node) => {
            const isSelected = focusId === node.id
            return (
              <li key={node.id}>
                <button
                  type="button"
                  onClick={() => setFocusId(node.id)}
                  aria-pressed={isSelected}
                  className={`flex w-full items-center gap-3 rounded-[12px] border p-3 text-left transition-colors ${
                    isSelected
                      ? 'border-ember-500 bg-ink-900'
                      : 'border-ink-700 bg-ink-900/60 hover:border-ember-500/60'
                  }`}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-paper">
                    <SkillMark icon={node.icon} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-sm font-bold uppercase text-fog">
                      {node.label}
                    </span>
                    <span className="block font-mono text-[11px] text-ember-300">
                      {node.levelLabel}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

