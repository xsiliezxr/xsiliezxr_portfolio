import { resolveAsset } from '../../shared/lib/resolveAsset.js'
import { galleryFrames as frames } from './gallery.frames.js'

const images = import.meta.glob('../../assets/images/gallery/*.{webp,png,jpg,jpeg}', {
  eager: true,
  import: 'default',
})

export const galleryFrames = frames.map((frame) => ({
  ...frame,
  src: resolveAsset(images, frame.file),
}))
