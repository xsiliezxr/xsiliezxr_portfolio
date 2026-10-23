import cvUrl from '../../../assets/cv/cv-siliezar.pdf'
import { PageShell } from '../../../shared/components/PageShell.jsx'
import { contactLinks } from '../../../shared/config/contact.js'
import { CHROME } from '../../../shared/i18n/copy.js'
import { useLocaleStore } from '../../../shared/i18n/locale.store.js'
import { useLocalized } from '../../../shared/i18n/useLocalized.js'
import { closing as closingSource } from '../../home/content/journey.content.js'
import { ContactForm } from '../components/ContactForm.jsx'
import { ContactLinks } from '../components/ContactLinks.jsx'
import { GuatemalaMap } from '../components/GuatemalaMap.jsx'

export function ContactPage() {
  const links = contactLinks({ includeWhatsapp: false })
  const closing = useLocalized(closingSource)
  const chrome = CHROME[useLocaleStore((state) => state.lang)]

  return (
    <PageShell path="/contact">
      <div className="mx-auto max-w-6xl py-10 md:py-14">
        <header className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_auto] md:items-end">
          <div className="max-w-3xl">
            <h1
              className="m-0 font-display font-black uppercase tracking-[-0.05em] text-fog [overflow-wrap:anywhere]"
              style={{ fontSize: 'clamp(2.25rem, 7vw, 5.5rem)', lineHeight: 0.9 }}
            >
              {chrome.contactTitle}
              <span className="mt-1 block text-ember-500">{chrome.contactTitleAccent}</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-fog-dim sm:text-lg">
              {closing.status}
            </p>
          </div>
          <a
            href={cvUrl}
            download="Angel-Siliezar-CV.pdf"
            className="inline-flex h-12 items-center justify-center bg-ember-500 px-5 text-sm font-bold text-ink-950 transition-[transform,filter] hover:brightness-110 active:scale-[0.98]"
          >
            {chrome.cvDownload}
          </a>
          <div className="md:col-span-2">
            <ContactLinks links={links} />
          </div>
        </header>

        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <div className="min-h-0 lg:h-full">
            <GuatemalaMap />
          </div>

          <section
            aria-label={chrome.contactFormAria}
            className="flex min-h-full flex-col border border-ink-700 bg-ink-900 p-5 text-fog md:p-6"
          >
            <h2 className="m-0 font-display text-2xl font-black uppercase tracking-[-0.03em] text-fog">
              {chrome.contactForm}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-fog-dim">
              {chrome.contactFormHint}
            </p>
            <div className="mt-5 flex-1">
              <ContactForm />
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  )
}
