import { ArrowsClockwise, Barbell, Ear, Lightning, Users, UsersThree } from '@phosphor-icons/react'
import { resolveAsset } from '../../../shared/lib/resolveAsset.js'

const files = import.meta.glob('../icons/*.svg', { eager: true, import: 'default' })

const SOFT = {
  leadership: UsersThree,
  communication: Ear,
  teamwork: Users,
  adaptability: ArrowsClockwise,
  initiative: Lightning,
  discipline: Barbell,
  aidev: Lightning,
  agent: Lightning,
  subagent: UsersThree,
  'skills-ai': ArrowsClockwise,
  mcp: Lightning,
  'tools-ai': Users,
  rag: ArrowsClockwise,
  vectors: Lightning,
  notion: UsersThree,
  postman: Lightning,
  pnpm: ArrowsClockwise,
  npm: ArrowsClockwise,
  supabase: Lightning,
}

export function SkillMark({ icon, className = 'h-6 w-6' }) {
  const Soft = SOFT[icon]
  if (Soft) return <Soft size={22} weight="fill" className="text-ink-950" aria-hidden="true" />
  const src = resolveAsset(files, `${icon}.svg`)
  if (!src) return null
  return <img src={src} alt="" draggable={false} className={`${className} pointer-events-none select-none`} />
}
