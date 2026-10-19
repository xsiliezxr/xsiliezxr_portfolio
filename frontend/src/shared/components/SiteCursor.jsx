import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

function customCursorAllowed() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isTypingTarget(target) {
  return target instanceof Element && Boolean(target.closest('input, textarea, select, [contenteditable="true"]'))
}

export function SiteCursor() {
  const nodeRef = useRef(null)
  const [allowed, setAllowed] = useState(customCursorAllowed)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setAllowed(fine.matches && !reduced.matches)
    fine.addEventListener('change', sync)
    reduced.addEventListener('change', sync)
    return () => {
      fine.removeEventListener('change', sync)
      reduced.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    if (!allowed) return undefined
    const node = nodeRef.current
    if (!node) return undefined
    const root = document.documentElement
    const xTo = gsap.quickTo(node, 'x', { duration: 0.16, ease: 'power3.out' })
    const yTo = gsap.quickTo(node, 'y', { duration: 0.16, ease: 'power3.out' })

    const place = (event) => {
      if (isTypingTarget(event.target)) {
        node.dataset.on = '0'
        root.classList.remove('has-site-cursor')
        return
      }
      xTo(event.clientX)
      yTo(event.clientY)
      node.dataset.on = '1'
      const clickable = event.target instanceof Element
        && event.target.closest('a, button, [data-ui], [role="button"]')
      node.dataset.pointer = clickable ? '1' : '0'
      // El cursor del sistema se oculta solo cuando este ya sigue al puntero.
      root.classList.add('has-site-cursor')
    }

    const hide = () => {
      node.dataset.on = '0'
      root.classList.remove('has-site-cursor')
    }

    window.addEventListener('pointermove', place, { passive: true })
    document.addEventListener('mouseleave', hide)
    return () => {
      window.removeEventListener('pointermove', place)
      document.removeEventListener('mouseleave', hide)
      root.classList.remove('has-site-cursor')
    }
  }, [allowed])

  if (!allowed) return null

  return <div ref={nodeRef} className="site-cursor" data-on="0" aria-hidden="true" />
}
