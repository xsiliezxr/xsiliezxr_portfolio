import { PageShell } from '../../../shared/components/PageShell.jsx'
import { SpatialGallery } from '../components/SpatialGallery.jsx'

export function GalleryPage() {
  return (
    <PageShell path="/gallery" bleed>
      <SpatialGallery />
    </PageShell>
  )
}
