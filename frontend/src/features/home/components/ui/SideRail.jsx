import { DownloadSimple, EnvelopeSimple } from '@phosphor-icons/react'
import cvUrl from '../../../../assets/cv/cv-siliezar.pdf'
import { contact } from '../../../../shared/config/contact.js'
import { CHROME } from '../../../../shared/i18n/copy.js'
import { useLocaleStore } from '../../../../shared/i18n/locale.store.js'
import { useJourneyStore, floorReadsLight } from '../../store/journey.store.js'

export function SideRail() {
  const mail = contact.email ? `mailto:${contact.email}` : '/contact'
  const shown = useJourneyStore((state) => state.chrome.side)
  const onLight = useJourneyStore((state) => floorReadsLight(state.floorId))
  const chrome = CHROME[useLocaleStore((state) => state.lang)]
  const tone = onLight
    ? 'border-ink-950 bg-ink-950 text-ember-500'
    : 'border-ink-700 bg-ink-950 text-ember-500'

  return (
    <div data-tour="contact" className={`side-rail ${shown ? 'is-shown' : ''}`}>
      <a
        data-ui
        href={cvUrl}
        download="Angel-Siliezar-CV.pdf"
        aria-label={chrome.cvDownload}
        className={`editorial-float flex h-11 w-11 items-center justify-center transition-transform hover:-translate-y-px active:scale-[0.98] ${tone}`}
      >
        <DownloadSimple size={20} />
      </a>
      <a
        data-ui
        href={mail}
        aria-label={chrome.mailWrite}
        className={`editorial-float flex h-11 w-11 items-center justify-center transition-transform hover:-translate-y-px active:scale-[0.98] ${tone}`}
      >
        <EnvelopeSimple size={20} />
      </a>
    </div>
  )
}
