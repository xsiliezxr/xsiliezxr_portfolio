import cvUrl from '../../../assets/cv/cv-siliezar.pdf'
import llegada from '../../../assets/images/gallery/llegada-kinal.webp'
import portrait from '../../../assets/images/siliezar-photo2.webp'
import { EditorialBanner } from '../../../shared/components/EditorialBanner.jsx'
import { PageShell } from '../../../shared/components/PageShell.jsx'
import { ScrollPhrase } from '../../../shared/components/ScrollPhrase.jsx'
import { useLocalized } from '../../../shared/i18n/useLocalized.js'
import { about as aboutSource, studies as studiesSource } from '../../home/content/journey.content.js'
import { HistoryBrainstorm } from '../components/HistoryBrainstorm.jsx'
import { PathGraph } from '../components/PathGraph.jsx'
import {
  HISTORY_BANNER_PHRASES,
  HISTORY_SCROLL_PHRASES,
  historyChrome,
  historyNarrative,
  historyPath,
  historyStages,
} from '../history.data.js'

function QuoteLine({ quote, mark }) {
  const open = '«'
  const close = '»'
  if (!quote) return null
  const at = mark ? quote.toLowerCase().indexOf(mark.toLowerCase()) : -1
  if (at < 0) {
    return (
      <>
        {open}
        {quote}
        {close}
      </>
    )
  }
  return (
    <>
      {open}
      {quote.slice(0, at)}
      <span className="text-ember-500">{quote.slice(at, at + mark.length)}</span>
      {quote.slice(at + mark.length)}
      {close}
    </>
  )
}

export function HistoryPage() {
  const about = useLocalized(aboutSource)
  const studies = useLocalized(studiesSource)
  const path = useLocalized(historyPath)
  const chrome = useLocalized(historyChrome)
  const banner = useLocalized(HISTORY_BANNER_PHRASES)
  const phrases = useLocalized(HISTORY_SCROLL_PHRASES)
  const stages = useLocalized(historyStages)
  const narrative = useLocalized(historyNarrative)
  const phraseA = phrases[0]
  const phraseB = phrases[1]

  return (
    <PageShell path="/history">
      <div className="history-stack">
        <HistoryBrainstorm />

        <div className="history-content-enter relative mx-auto max-w-6xl">
        <section
          id="about-history"
          className="relative grid scroll-mt-28 items-start gap-12 py-16 md:py-24 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16"
        >
          <div className="relative z-10">
            <h1 className="sr-only">{chrome.title}</h1>
            <blockquote className="m-0 max-w-2xl border-l-2 border-ember-500 pl-4">
              <p
                className="m-0 font-display font-black uppercase tracking-[-0.04em] text-fog"
                style={{ fontSize: 'clamp(1.55rem, 4.2vw, 2.85rem)', lineHeight: 1.12 }}
              >
                <QuoteLine quote={about.quote} mark={about.quoteMark} />
              </p>
              <footer className="mt-3 font-mono text-xs text-amber">{about.author}</footer>
            </blockquote>
            <p className="mt-6 font-mono text-xs text-ember-300">{about.meta}</p>

            <div className="mt-8 space-y-7">
              {about.paragraphs.filter(Boolean).map((paragraph, index) => (
                <p
                  key={`${index}-${paragraph.slice(0, 24)}`}
                  className={
                    index === 0
                      ? 'max-w-2xl text-base font-medium leading-relaxed text-fog sm:text-lg'
                      : 'max-w-2xl text-base leading-relaxed text-fog-dim'
                  }
                >
                  {paragraph}
                </p>
              ))}
              {narrative.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="max-w-2xl text-base leading-relaxed text-fog-dim">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={cvUrl}
                download="Angel-Siliezar-CV.pdf"
                className="bg-ember-500 px-5 py-3 text-sm font-bold text-ink-950"
              >
                {chrome.downloadCv}
              </a>
              <a
                href="/gallery"
                className="border border-ink-700 bg-ink-900 px-5 py-3 text-sm font-bold text-fog hover:border-ember-500"
              >
                {chrome.exploreGallery}
              </a>
            </div>
          </div>

          <div className="relative z-10 lg:pt-4">
            <figure className="comic-frame m-0 lg:ml-auto lg:max-w-md">
              <img src={portrait} alt={about.meta} className="aspect-[3/4] w-full object-cover" />
              <figcaption className="mt-3 flex items-center justify-between font-mono text-xs text-amber">
                <span>{chrome.city}</span>
                <span>{chrome.present}</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <ScrollPhrase phrase={phraseA} />

        <section
          id="about-study"
          className="relative grid scroll-mt-28 items-center gap-12 border-t border-ink-800 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
        >
          <figure className="comic-frame relative z-10 m-0">
            <img
              src={llegada}
              alt={chrome.arrivalAlt}
              className="aspect-[5/4] w-full object-cover"
            />
            <figcaption className="mt-3 flex items-center justify-between font-mono text-xs text-amber">
              <span>{chrome.kinal}</span>
              <span>{chrome.software}</span>
            </figcaption>
          </figure>

          <div className="relative z-10">
            <h2
              className="m-0 font-display font-black uppercase tracking-[-0.04em] text-fog"
              style={{ fontSize: 'clamp(2rem, 5.5vw, 4.25rem)', lineHeight: 1.05 }}
            >
              {about.studyTitle}
            </h2>
            <p className="mt-3 font-mono text-xs text-ember-300">{about.studyRole}</p>

            <div className="mt-8 space-y-6">
              {about.studyParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 28)} className="max-w-xl text-base leading-relaxed text-fog-dim">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <article className="comic-inset">
                <h3 className="font-display text-base font-extrabold uppercase text-fog">{studies.leftTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fog-dim">{studies.leftBody}</p>
              </article>
              <article className="comic-inset">
                <h3 className="font-display text-base font-extrabold uppercase text-fog">{studies.rightTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fog-dim">{studies.rightBody}</p>
              </article>
            </div>

            <p className="mt-6 flex flex-wrap gap-6 font-mono text-xs">
              <a href="/gallery?frame=1" className="text-ember-300 underline decoration-ember-500/50 underline-offset-4 hover:text-ember-500">
                {chrome.photos}
              </a>
              <a href="/certificaciones" className="text-ember-300 underline decoration-ember-500/50 underline-offset-4 hover:text-ember-500">
                {chrome.awardsLink}
              </a>
            </p>
          </div>
        </section>

        <ScrollPhrase phrase={phraseB} />
        <EditorialBanner phrases={banner} marquee />

        <section
          id="about-path"
          className="relative scroll-mt-28 border-t border-ink-800 py-16 md:py-24"
        >
          <div className="relative z-10 max-w-3xl">
            <h2
              className="m-0 font-display font-black uppercase tracking-[-0.04em] text-fog"
              style={{ fontSize: 'clamp(2rem, 5.5vw, 4.25rem)', lineHeight: 1.05 }}
            >
              {path.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-fog-dim">
              {path.body}
            </p>
          </div>

          <div className="relative z-10 mt-10">
            <PathGraph stages={stages} />
          </div>

          <div className="relative z-10 mt-16">
            <h2 className="font-display text-3xl font-black uppercase tracking-[-0.03em] text-fog sm:text-4xl">
              {chrome.awardsTitle}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {about.awards.map((item) => (
                <article key={item.title} className="comic-inset">
                  <p className="font-mono text-xs text-ember-300">{item.date}</p>
                  <h3 className="mt-2 font-display text-lg font-extrabold uppercase text-fog">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fog-dim">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-10 flex flex-wrap gap-3">
            <a href={path.ctaHref} className="bg-ember-500 px-5 py-3 text-sm font-bold text-ink-950">
              {path.cta}
            </a>
            <a href="/projects" className="border border-ink-700 bg-ink-900 px-5 py-3 text-sm font-bold text-fog hover:border-ember-500">
              {chrome.projects}
            </a>
          </div>
        </section>

        <EditorialBanner phrases={banner} marquee className="mt-4 mb-10" />
        </div>
      </div>
    </PageShell>
  )
}
