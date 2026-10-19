import cvUrl from '../../../assets/cv/cv-siliezar.pdf'
import llegada from '../../../assets/images/gallery/llegada-kinal.webp'
import portrait from '../../../assets/images/siliezar-photo2.webp'
import { EditorialBanner } from '../../../shared/components/EditorialBanner.jsx'
import { PageShell } from '../../../shared/components/PageShell.jsx'
import { ScrollPhrase } from '../../../shared/components/ScrollPhrase.jsx'
import { listMilestones } from '../../experience/experience.data.js'
import { about, studies } from '../../home/content/journey.content.js'
import { HistoryBrainstorm } from '../components/HistoryBrainstorm.jsx'
import { PathGraph } from '../components/PathGraph.jsx'
import {
  HISTORY_BANNER_PHRASES,
  HISTORY_SCROLL_PHRASES,
  historyPath,
} from '../history.data.js'

function shortLabel(rol) {
  const head = String(rol).split('·')[0].trim()
  return head.length > 22 ? `${head.slice(0, 20)}…` : head
}

export function HistoryPage() {
  const milestones = listMilestones().map((item) => ({ ...item, short: shortLabel(item.rol) }))
  const phraseA = HISTORY_SCROLL_PHRASES[0]
  const phraseB = HISTORY_SCROLL_PHRASES[1]

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
            <h1 className="sr-only">Historia de Angel Siliezar</h1>
            <blockquote className="m-0 max-w-2xl border-l-2 border-ember-500 pl-4">
              <p
                className="m-0 font-display font-black uppercase tracking-[-0.04em] text-fog"
                style={{ fontSize: 'clamp(1.55rem, 4.2vw, 2.85rem)', lineHeight: 0.95 }}
              >
                «{about.quote}»
              </p>
              <footer className="mt-3 font-mono text-xs text-amber">{about.author}</footer>
            </blockquote>
            <p className="mt-6 font-mono text-xs text-ember-300">{about.meta}</p>

            <div className="mt-8 space-y-5">
              {about.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 28)}
                  className={
                    index === 0
                      ? 'max-w-2xl text-base font-medium leading-relaxed text-fog sm:text-lg'
                      : 'max-w-2xl text-base leading-relaxed text-fog-dim'
                  }
                >
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
                Descargar CV
              </a>
              <a
                href="/gallery"
                className="border border-ink-700 bg-ink-900 px-5 py-3 text-sm font-bold text-fog hover:border-ember-500"
              >
                Explorar galería
              </a>
            </div>
          </div>

          <div className="relative z-10 lg:pt-4">
            <figure className="comic-frame m-0 lg:ml-auto lg:max-w-md">
              <img src={portrait} alt={about.meta} className="aspect-[3/4] w-full object-cover" />
              <figcaption className="mt-3 flex items-center justify-between font-mono text-xs text-amber">
                <span>Ciudad de Guatemala</span>
                <span>2007 · Presente</span>
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
              alt="Llegada a Fundación Kinal"
              className="aspect-[5/4] w-full object-cover"
            />
            <figcaption className="mt-3 flex items-center justify-between font-mono text-xs text-amber">
              <span>Fundación Kinal</span>
              <span>Desarrollo de Software</span>
            </figcaption>
          </figure>

          <div className="relative z-10">
            <h2
              className="m-0 font-display font-black uppercase tracking-[-0.04em] text-fog"
              style={{ fontSize: 'clamp(2rem, 5.5vw, 4.25rem)', lineHeight: 0.92 }}
            >
              {about.studyTitle}
            </h2>
            <p className="mt-3 font-mono text-xs text-ember-300">{about.studyRole}</p>

            <div className="mt-6 space-y-4">
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
                Fotos de esa etapa →
              </a>
              <a href="/certificaciones" className="text-ember-300 underline decoration-ember-500/50 underline-offset-4 hover:text-ember-500">
                Ver reconocimientos →
              </a>
            </p>
          </div>
        </section>

        <ScrollPhrase phrase={phraseB} />
        <EditorialBanner phrases={HISTORY_BANNER_PHRASES} marquee />

        <section
          id="about-path"
          className="relative scroll-mt-28 border-t border-ink-800 py-16 md:py-24"
        >
          <div className="relative z-10 max-w-3xl">
            <h2
              className="m-0 font-display font-black uppercase tracking-[-0.04em] text-fog"
              style={{ fontSize: 'clamp(2rem, 5.5vw, 4.25rem)', lineHeight: 0.92 }}
            >
              {historyPath.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-fog-dim">
              {historyPath.body}
            </p>
          </div>

          <div className="relative z-10 mt-10">
            <PathGraph stages={milestones} />
          </div>

          <div className="relative z-10 mt-14">
            <h2 className="font-display text-3xl font-black uppercase tracking-[-0.03em] text-fog sm:text-4xl">
              Reconocimientos
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
            <a href={historyPath.ctaHref} className="bg-ember-500 px-5 py-3 text-sm font-bold text-ink-950">
              {historyPath.cta}
            </a>
            <a href="/projects" className="border border-ink-700 bg-ink-900 px-5 py-3 text-sm font-bold text-fog hover:border-ember-500">
              Ver proyectos
            </a>
          </div>
        </section>

        <EditorialBanner phrases={HISTORY_BANNER_PHRASES} marquee className="mt-4 mb-10" />
        </div>
      </div>
    </PageShell>
  )
}
