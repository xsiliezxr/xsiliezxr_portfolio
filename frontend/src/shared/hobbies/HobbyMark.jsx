import { useHobbiesStore } from './hobbies.store.js'

export function HobbyMark({ id, image, className = '' }) {
  const collect = useHobbiesStore((state) => state.collect)
  const found = useHobbiesStore((state) => state.found.includes(id))
  if (found) return null

  return (
    <button
      type="button"
      data-ui
      className={`hobby-mark ${className}`}
      aria-label="Pieza oculta"
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.stopPropagation()
        collect(id)
      }}
    >
      <img src={image} alt="" />
    </button>
  )
}
