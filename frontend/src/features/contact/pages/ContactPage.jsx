import cvUrl from '../../../assets/cv/cv-siliezar.pdf'
import headphones from '../../../assets/images/hobbies/headphones.webp'
import { PageShell } from '../../../shared/components/PageShell.jsx'
import { contactLinks } from '../../../shared/config/contact.js'
import { useHobbiesStore } from '../../../shared/hobbies/hobbies.store.js'
import { closing } from '../../home/content/journey.content.js'
import { ContactForm } from '../components/ContactForm.jsx'
import { ContactLinks } from '../components/ContactLinks.jsx'

export function ContactPage() {
  const links = contactLinks()
  const collect = useHobbiesStore((state) => state.collect)

  return (
    <PageShell path="/contact">
      <div className="mx-auto grid max-w-6xl items-start gap-12 py-10 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <h1
            className="m-0 font-display font-black uppercase tracking-[-0.05em] text-fog [overflow-wrap:anywhere]"
            style={{ fontSize: 'clamp(2.25rem, 7vw, 5.5rem)', lineHeight: 0.9 }}
          >
            Hablemos
            <span className="mt-1 block text-transparent" style={{ WebkitTextStroke: '2px #ff5b14' }}>
              de un proyecto
            </span>
          </h1>

          <p className="m-0 max-w-lg text-base leading-relaxed text-fog-dim sm:text-lg">
            {closing.status}
          </p>

          <p className="m-0 font-mono text-xs text-ember-300">
            Ciudad de Guatemala · Disponible para proyectos · Remoto UTC-6
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={cvUrl}
              download="Angel-Siliezar-CV.pdf"
              className="bg-ember-500 px-5 py-3 text-sm font-bold text-ink-950"
            >
              Descargar CV
            </a>
          </div>

          <div className="border-t border-ink-800 pt-6">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-fog-dim">
              Canales directos
            </p>
            <ContactLinks links={links} />
          </div>

          <div className="flex items-center gap-4 border border-ink-700 bg-ink-900/80 p-4">
            <button
              type="button"
              onClick={() => collect('headphones')}
              aria-label="Audífonos"
              className="shrink-0 border border-ink-700 bg-ink-950 p-2 transition-colors hover:border-ember-500"
            >
              <img src={headphones} alt="" className="h-14 w-14 object-contain" />
            </button>
            <div className="min-w-0">
              <p className="font-mono text-xs text-ember-300">Pieza de hobby</p>
              <p className="mt-1 text-sm text-fog-dim">{closing.hobbies}</p>
            </div>
          </div>
        </div>

        <section
          aria-label="Formulario de contacto"
          className="border border-ink-700 bg-ink-900 p-6 text-fog shadow-[8px_8px_0_rgba(255,91,20,0.18)] sm:p-8"
        >
          <div className="border-b border-ink-700 pb-4">
            <h2 className="m-0 font-display text-2xl font-black uppercase tracking-[-0.03em] text-fog">
              Mensaje directo
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-fog-dim">
              Si prefieres no abrir el correo, deja el mensaje aquí.
            </p>
          </div>
          <div className="mt-6">
            <ContactForm />
          </div>
        </section>
      </div>
    </PageShell>
  )
}
