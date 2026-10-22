import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'

export function FrameDialog({ open, title, onClose, closeLabel = 'Cerrar', children }) {
  const titleId = useId()
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    closeRef.current?.focus()
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={title} aria-labelledby={titleId} className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center sm:p-6">
      <button type="button" className="absolute inset-0 bg-ink-950/80" aria-label={closeLabel} onClick={onClose} />
      <article className="relative grid max-h-[92dvh] w-full max-w-5xl overflow-hidden border border-ink-700 bg-ink-900 text-fog md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        {children({ titleId, closeRef })}
      </article>
    </div>,
    document.body,
  )
}
