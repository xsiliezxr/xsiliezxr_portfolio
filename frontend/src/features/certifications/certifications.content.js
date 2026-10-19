import { resolveAsset } from '../../shared/lib/resolveAsset.js'
import { AWARD_FILTERS, certificates as certificateRecords, listAwards } from './certifications.data.js'

const images = import.meta.glob('../../assets/images/awards/*.{webp,png,jpg,jpeg}', {
  eager: true,
  import: 'default',
})

export { AWARD_FILTERS, listAwards }

export const certificates = certificateRecords.map((item) => ({
  ...item,
  src: resolveAsset(images, item.file),
  attachments: (item.attachments ?? []).map((attachment) => ({
    ...attachment,
    src: resolveAsset(images, attachment.file),
  })),
}))

export function listAwardCards(filter = 'all') {
  const ids = new Set(listAwards(filter).map((item) => item.id))
  return certificates.filter((item) => ids.has(item.id))
}
