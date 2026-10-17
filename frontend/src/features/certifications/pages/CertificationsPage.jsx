import { PageShell } from '../../../shared/components/PageShell.jsx'
import { CertificateRail } from '../components/CertificateRail.jsx'

export function CertificationsPage() {
  return (
    <PageShell path="/certificaciones" bleed>
      <CertificateRail />
    </PageShell>
  )
}
