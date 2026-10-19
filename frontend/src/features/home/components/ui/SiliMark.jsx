export function SiliMark({ className = '' }) {
  return (
    <svg className={`sili-mark ${className}`} viewBox="0 0 80 108" aria-hidden="true">
      <rect x="18" y="92" width="44" height="8" fill="#ff5b14" />
      <rect x="28" y="84" width="24" height="8" fill="#2a2826" />
      <path d="M16 28h48l-6 8H22z" fill="#1c1b1a" />
      <path d="M14 28c2-16 12-22 26-22s24 6 26 22" fill="#f1efec" />
      <path d="M14 22c8-4 44-4 52 0v8H14z" fill="#c2410c" />
      <circle cx="40" cy="48" r="18" fill="#ffd7c2" />
      <rect x="24" y="46" width="32" height="10" rx="5" fill="#1a1917" />
      <circle cx="32" cy="51" r="3" fill="#f1efec" />
      <circle cx="48" cy="51" r="3" fill="#f1efec" />
      <path d="M22 66h36l4 18H18z" fill="#131313" />
      <path d="M30 70h8l-2 10h-6z" fill="#ffb000" />
    </svg>
  )
}
