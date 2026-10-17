import { resolveAsset } from '../../shared/lib/resolveAsset.js'
import { galleryFrames as frameRecords } from './gallery.data.js'

const images = import.meta.glob('../../assets/images/gallery/*.{webp,png,jpg,jpeg}', {
  eager: true,
  import: 'default',
})

const LAYOUT = [
  { tx: -445, ty: -285, w: 460, h: 190, aspect: 'landscapeWide' },
  { tx: 460, ty: 270, w: 380, h: 240, aspect: 'landscape' },
  { tx: -455, ty: 255, w: 420, h: 270, aspect: 'landscape' },
  { tx: 0, ty: -330, w: 210, h: 210, aspect: 'medium' },
  { tx: 480, ty: -215, w: 220, h: 330, aspect: 'portrait' },
  { tx: 0, ty: 280, w: 220, h: 300, aspect: 'portrait' },
]

const FALLBACK_LAYOUT = { tx: 0, ty: 120, w: 280, h: 200, aspect: 'landscape' }

export const galleryFrames = frameRecords.map((frame, index) => ({
  ...frame,
  ...(LAYOUT[index] ?? FALLBACK_LAYOUT),
  src: resolveAsset(images, frame.file),
}))
