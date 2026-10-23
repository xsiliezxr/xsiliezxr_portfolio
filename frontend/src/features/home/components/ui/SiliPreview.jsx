import { useEffect, useState } from 'react'
import { SiliChat } from '../../../sili/components/SiliChat.jsx'
import { useLocaleStore } from '../../../../shared/i18n/locale.store.js'
import { useJourneyStore } from '../../store/journey.store.js'
import { SiliFace } from './SiliFace.jsx'

const LINES = {
  es: {
    '/': [
      'Hola, soy Sili. Yo te voy a contar quién es Angel.',
      'Te enseño su historia, lo que ha construido y cómo trabaja.',
      'Si lo puedes imaginar, lo puedes programar.',
      'Puedes preguntarme lo que quieras sobre este recorrido.',
    ],
    '/history': [
      'Aquí te cuento de dónde viene Angel y cómo empezó a construir.',
      'La curiosidad fue el inicio; el oficio llegó practicando.',
      'En esta historia hay escuela, hackatones y trabajo real.',
      'Si quieres el detalle de cada etapa, ve a Experiencia.',
    ],
    '/experiencia': [
      'Aquí te muestro lo que Angel ha entregado bajo presión.',
      'Cada proyecto empezó con una pregunta y terminó en algo usable.',
      'No te quedes con el título: revisa los detalles de cada etapa.',
      'El código también se aprende cuando toca entregar.',
    ],
    '/gallery': [
      'Estas fotos guardan momentos que Angel convirtió en experiencia.',
      'Aquí hay pitches, hackatones, estudio y muchas horas de práctica.',
      'Puedes arrastrar la galería para recorrer su camino.',
      'Abre una foto y te cuento qué estaba pasando.',
    ],
    '/projects': [
      'Aquí viven los proyectos que Angel ha llevado de idea a producto.',
      'Cada proyecto muestra una decisión, una herramienta y un aprendizaje.',
      'Busca el que más te interese; yo te acompaño.',
      'Construir también es saber qué problema vale la pena resolver.',
    ],
    '/skills': [
      'Estas son las herramientas con las que Angel construye.',
      'No es una lista decorativa: aquí hay código que ya usó.',
      'Frontend, backend, datos e IA se cruzan en sus proyectos.',
      'Pasa por cada habilidad y mira dónde entra en acción.',
    ],
    '/certificaciones': [
      'Aquí están las certificaciones y reconocimientos que Angel ha conseguido.',
      'Cada diploma representa horas de estudio y trabajo constante.',
      'El archivo crece, pero la idea sigue siendo la misma: aprender haciendo.',
      'Puedes abrir cada reconocimiento para ver su contexto.',
    ],
    '/contact': [
      'Si quieres hablar con Angel, este es el lugar.',
      'Puedes escribirle por correo o dejarle un mensaje aquí.',
      'También puedes descargar su CV antes de contactarlo.',
      'Me gusta cerrar los recorridos con una conversación real.',
    ],
  },
  en: {
    '/': [
      "Hi, I'm Sili. I will tell you who Angel is.",
      "I'll show you his story, what he has built, and how he works.",
      'If you can imagine it, you can program it.',
      'You can ask me anything about this tour.',
    ],
    '/history': [
      "Here I'll tell you where Angel comes from and how he started building.",
      'Curiosity was the beginning; craft came from practice.',
      'This story includes school, hackathons, and real work.',
      'For each stage in detail, head to Experience.',
    ],
    '/experiencia': [
      "Here I'll show you what Angel has delivered under pressure.",
      'Every project started with a question and ended as something usable.',
      "Don't stop at the title: inspect each stage in detail.",
      'You also learn to code when it is time to deliver.',
    ],
    '/gallery': [
      'These photos hold moments Angel turned into experience.',
      'You will find pitches, hackathons, study, and many hours of practice.',
      'Drag the gallery to travel through his path.',
      "Open a photo and I'll tell you what was happening.",
    ],
    '/projects': [
      'These are the projects Angel took from idea to product.',
      'Each one shows a decision, a tool, and a lesson.',
      'Pick the one that interests you; I will guide you.',
      'Building also means knowing which problem is worth solving.',
    ],
    '/skills': [
      'These are the tools Angel uses to build.',
      'This is not a decorative list: he has already used this code.',
      'Frontend, backend, data, and AI meet in his projects.',
      'Open each skill and see where it comes into play.',
    ],
    '/certificaciones': [
      'These are the certifications and recognitions Angel has earned.',
      'Each diploma represents hours of study and consistent work.',
      'The archive keeps growing, but the idea stays the same: learn by building.',
      'Open a recognition to see its context.',
    ],
    '/contact': [
      'If you want to talk to Angel, this is the place.',
      'You can email him or leave a message here.',
      'You can also download his CV before reaching out.',
      'I like ending a tour with a real conversation.',
    ],
  },
}

const GAP_MS = 8000
const HOLD_MIN = 2000
const HOLD_MAX = 3200

function holdMs(text) {
  const ratio = Math.min(1, Math.max(0, (text.length - 28) / 36))
  return Math.round(HOLD_MIN + (HOLD_MAX - HOLD_MIN) * ratio)
}

export function SiliPreview({ route = '/' }) {
  const shown = useJourneyStore((state) => state.chrome.counter)
  const open = useJourneyStore((state) => state.cornerOpen === 'sili')
  const setCornerOpen = useJourneyStore((state) => state.setCornerOpen)
  const locale = useLocaleStore((state) => state.lang)
  const routeLines = LINES[locale]?.[route] || LINES[locale]?.['/'] || LINES.es['/']
  const [line, setLine] = useState(0)
  const [bubble, setBubble] = useState(false)

  useEffect(() => {
    if (!shown || open) {
      setBubble(false)
      return undefined
    }

    let cancelled = false
    let gapTimer = 0
    let holdTimer = 0
    let index = line % routeLines.length

    const speak = () => {
      if (cancelled) return
      const text = routeLines[index]
      setLine(index)
      setBubble(true)
      holdTimer = window.setTimeout(() => {
        if (cancelled) return
        setBubble(false)
        index = (index + 1) % routeLines.length
        gapTimer = window.setTimeout(speak, GAP_MS)
      }, holdMs(text))
    }

    gapTimer = window.setTimeout(speak, GAP_MS)

    return () => {
      cancelled = true
      window.clearTimeout(gapTimer)
      window.clearTimeout(holdTimer)
    }
  }, [shown, open, route, locale, routeLines.length])

  return (
    <div data-tour="sili" className={`sili-dock${shown ? ' is-shown' : ''}${open ? ' is-active' : ''}`}>
      {open ? (
        <div data-ui className="sili-panel p-3 text-fog">
          <SiliChat />
          <button type="button" data-ui className="sili-close" onClick={() => setCornerOpen(null)}>
            Cerrar
          </button>
        </div>
      ) : null}
      {!open && bubble ? (
        <div className="sili-bubble" aria-live="polite">
          <p className="sili-bubble-name">Sili</p>
          <p className="sili-bubble-line">{routeLines[line % routeLines.length]}</p>
        </div>
      ) : null}
      <button
        type="button"
        data-ui
        className="sili-card"
        aria-expanded={open}
        aria-label="Abrir a Sili"
        onClick={() => setCornerOpen(open ? null : 'sili')}
      >
        <SiliFace />
      </button>
    </div>
  )
}
