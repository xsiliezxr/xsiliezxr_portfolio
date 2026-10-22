import { certificates } from '../../certifications/certifications.content.js'
import { galleryFrames } from '../../gallery/gallery.data.js'
import { projects } from '../../projects/projects.data.js'

function column(items) {
  const frames = []
  const seen = new Set()
  for (const item of items) {
    if (!item?.src || seen.has(item.src)) continue
    seen.add(item.src)
    frames.push(item)
  }
  return frames
}

function mix(columns) {
  const frames = []
  const seen = new Set()
  const longest = Math.max(0, ...columns.map((items) => items.length))
  for (let index = 0; index < longest; index += 1) {
    for (const items of columns) {
      const frame = items[index]
      if (!frame?.src || seen.has(frame.src)) continue
      seen.add(frame.src)
      frames.push({ id: frame.id, src: frame.src, caption: frame.caption })
    }
  }
  return frames
}

const gallery = column(
  galleryFrames.map((frame) => ({
    id: `gallery-${frame.id}`,
    src: frame.src,
    caption: frame.caption,
  })),
)

const awards = column(
  certificates.flatMap((item) => {
    const frames = []
    if (item.src) {
      frames.push({ id: `award-${item.id}`, src: item.src, caption: item.title })
    }
    for (const attachment of item.attachments ?? []) {
      if (!attachment.src) continue
      frames.push({
        id: `award-${item.id}-${attachment.file}`,
        src: attachment.src,
        caption: attachment.label || item.title,
      })
    }
    return frames
  }),
)

const shots = column(
  projects
    .filter((project) => project.image && project.src)
    .map((project) => ({
      id: `project-${project.id}`,
      src: project.src,
      caption: project.title,
    })),
)

export const filmFrames = mix([gallery, awards, shots])
