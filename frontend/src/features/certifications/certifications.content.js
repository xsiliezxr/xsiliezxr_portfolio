import { resolveAsset } from '../../shared/lib/resolveAsset.js'
import { certificates as certificateRecords } from './certifications.data.js'

const images = import.meta.glob('../../assets/images/certifications/*.{webp,png,jpg,jpeg}', {
  eager: true,
  import: 'default',
})

export const certificates = certificateRecords.map((item) => ({
  ...item,
  src: resolveAsset(images, item.file),
  attachments: (item.attachments ?? []).map((attachment) => ({
    ...attachment,
    src: resolveAsset(images, attachment.file),
  })),
}))
