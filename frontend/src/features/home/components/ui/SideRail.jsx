import { DownloadSimple, EnvelopeSimple } from '@phosphor-icons/react'
import cvUrl from '../../../../assets/cv/cv-siliezar.pdf'
import { contact } from '../../../../shared/config/contact.js'
import { useJourneyStore, floorReadsLight } from '../../store/journey.store.js'

export function SideRail() {
  const mail = contact.email ? `mailto:${contact.email}` : ''
  const shown = useJourneyStore((state) => state.chrome.side)
  const onLight = useJourneyStore((state) => floorReadsLight(state.floorId))
  const border = onLight ? 'border-ink-950 bg-ink-950 text-fog' : 'border-ink-700 bg-ink-950 text-fog'

  return (
    <div className={`side-rail ${shown ? 'is-shown' : ''}`}>
      <a
        data-ui
        href={cvUrl}
        download="Angel-Siliezar-CV.pdf"
        aria-label="Descargar CV"
        className={`editorial-float flex h-11 w-11 items-center justify-center active:scale-[0.98] ${onLight ? 'border-ink-950 bg-ink-950 text-ember-500' : 'border-ink-700 bg-ink-950 text-ember-500'}`}
      >
        <DownloadSimple size={20} />
      </a>
      {mail ? (
        <a
          data-ui
          href={mail}
          aria-label="Escribir por correo"
          className={`editorial-float flex h-11 w-11 items-center justify-center active:scale-[0.98] ${border}`}
        >
          <EnvelopeSimple size={20} />
        </a>
      ) : (
        <a
          data-ui
          href="/contact"
          aria-label="Ir a contacto"
          className={`editorial-float flex h-11 w-11 items-center justify-center active:scale-[0.98] ${border}`}
        >
          <EnvelopeSimple size={20} />
        </a>
      )}
    </div>
  )
}
