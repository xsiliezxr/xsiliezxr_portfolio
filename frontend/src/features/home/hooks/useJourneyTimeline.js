import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { applyPose, chapterFromProgress, floorFromProgress, LOCKED_PROGRESS, poseAt } from '../lib/journeyRig.js'
import { useJourneyStore } from '../store/journey.store.js'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const SPAN = 2
const SLICE = 100 / 7

function roomBeat(index, { phrase = false, last = false, lead = 0.04, type = 0.3 } = {}) {
  const start = index * SLICE
  const end = (index + 1) * SLICE
  const pass = phrase ? start + SLICE * lead : null
  const passOut = phrase ? pass + SLICE * type : null
  return {
    pass,
    passOut,
    room: phrase ? passOut + SLICE * 0.09 : start + SLICE * 0.07,
    roomOut: last ? null : end - SLICE * 0.045,
    atmo: start + SLICE * 0.02,
    atmoOut: last ? null : end + SLICE * 0.04,
  }
}

const BEATS = {
  welcome: {
    pass: null,
    passOut: null,
    room: 5.2,
    roomOut: 12.1,
    atmo: null,
    atmoOut: null,
  },
  // El descenso del setup a Historia ocurre limpio a través del hueco del suelo sin parada fija.
  about: roomBeat(1),
  studies: roomBeat(2),
  experience: roomBeat(3, { phrase: true }),
  tools: roomBeat(4),
  closing: roomBeat(5, { phrase: true }),
  secret: roomBeat(6, { phrase: true, last: true, lead: 0.04, type: 0.26 }),
}

function layerOf(panels, layer, id) {
  return panels.current[`${layer}-${id}`]
}

function hit(progress, start, end) {
  return progress >= start / 100 && progress < (end == null ? 1.01 : (end + SPAN) / 100)
}

export function useJourneyTimeline({ trackRef, scrollerRef, rig, panels, heroRef, sceneRef, unlocked, metrics }) {
  useGSAP(() => {
    if (!metrics || !trackRef.current || !scrollerRef.current) return undefined
    rig.metrics = metrics
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const span = reduce ? 0.01 : SPAN
    let lastFloor = ''
    let heroHidden = false
    const root = trackRef.current
    const court = root?.querySelector('[data-court="secret"]')
    const ball = root?.querySelector('[data-shot="ball"]')
    const rim = root?.querySelector('[data-shot="rim"]')
    const landing = { x: -240, y: -36, lift: -120 }
    let shotLive = false

    const readLanding = () => {
      if (!ball || !rim) return
      const previous = ball.style.transform
      ball.style.transform = 'none'
      const from = ball.getBoundingClientRect()
      const to = rim.getBoundingClientRect()
      ball.style.transform = previous
      if (from.width < 1 || to.width < 1) return
      landing.x = to.left + to.width / 2 - (from.left + from.width / 2)
      landing.y = to.top + to.height / 2 - (from.top + from.height / 2)
      landing.lift = Math.min(landing.y - 24, -92)
    }

    const shot = gsap.timeline({ paused: true })

    if (ball) {
      shot.set(ball, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 0 })
      if (reduce) {
        shot.to(ball, { x: () => landing.x, y: () => landing.y, scale: 0.58, opacity: 1, duration: 0.01, ease: 'none' })
      } else {
        shot
          .to(ball, { opacity: 1, duration: 0.1, ease: 'none' })
          .to(ball, { x: () => landing.x * 0.42, y: () => landing.lift, scale: 0.78, rotation: 200, duration: 0.5, ease: 'power2.out' })
          .to(ball, { x: () => landing.x, y: () => landing.y, scale: 0.58, rotation: 420, duration: 0.4, ease: 'power2.in' })
          .to(ball, { y: () => landing.y + 28, scale: 0.48, opacity: 0, rotation: 540, duration: 0.22, ease: 'power1.in' })
      }
    }

    const syncShot = (progress) => {
      if (!unlocked || !ball) return
      const active = shotLive ? progress >= 0.95 : progress >= 0.966
      if (active === shotLive) return
      shotLive = active
      if (active) {
        readLanding()
        shot.invalidate().restart()
        return
      }
      if (shot.progress() === 0) return
      shot.reverse()
    }

    const apply = (progress) => {
      const journey = unlocked ? progress : Math.min(progress, LOCKED_PROGRESS)
      rig.progress = journey
      rig.metrics = metrics
      rig.platform.x = metrics.platform.x
      rig.platform.z = metrics.platform.z
      const aspect = window.innerWidth / Math.max(window.innerHeight, 1)
      const frame = poseAt(journey, metrics, aspect, unlocked)
      applyPose(rig, frame.shot)
      rig.platform.y = frame.platformY
      rig.setupVisible = frame.setupVisible
      rig.tube = frame.tube

      const raw = floorFromProgress(journey)
      const floorId = raw === 'secret' && !unlocked ? 'closing' : raw
      if (floorId !== lastFloor) {
        lastFloor = floorId
        const store = useJourneyStore.getState()
        store.setFloor(floorId)
        store.setChapter(chapterFromProgress(journey, unlocked))
      }

      Object.values(panels.current).forEach((el) => {
        if (!el || el.dataset.layer !== 'panel') return
        const id = el.dataset.floor
        const beat = BEATS[id]
        const open = beat ? hit(journey, beat.room, beat.roomOut) : false
        el.dataset.live = open ? '1' : '0'
        el.inert = !open
        if (open) el.removeAttribute('aria-hidden')
        else el.setAttribute('aria-hidden', 'true')
        el.querySelectorAll('[data-beat]').forEach((beatEl) => {
          const opacity = Number(gsap.getProperty(beatEl, 'opacity')) || 0
          beatEl.style.pointerEvents = opacity > 0.45 ? 'auto' : 'none'
        })
      })

      Object.values(panels.current).forEach((el) => {
        if (!el || el.dataset.layer !== 'pass') return
        const beat = BEATS[el.dataset.floor]
        const open = beat?.pass != null && hit(journey, beat.pass, beat.passOut)
        if (open) el.removeAttribute('aria-hidden')
        else el.setAttribute('aria-hidden', 'true')
      })

      const hero = heroRef.current
      const gone = progress > 0.045 || (hero ? Number(gsap.getProperty(hero, 'opacity')) < 0.35 : progress > 0.12)
      if (hero && gone !== heroHidden) {
        heroHidden = gone
        hero.inert = gone
        const video = hero.querySelector('video')
        if (gone && progress > 0.14) video?.pause()
        else video?.play()?.catch(() => {})
      }

      syncShot(journey)
    }

    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: trackRef.current,
        scroller: scrollerRef.current,
        start: 'top top',
        end: () => {
          const scroller = scrollerRef.current
          const track = trackRef.current
          if (!scroller || !track) return 'bottom bottom'
          const range = Math.max(track.offsetHeight - scroller.clientHeight, 1)
          const cap = Number(scroller.dataset.journeyCap)
          const limit = Number.isFinite(cap) && cap > 0 ? Math.min(cap, 1) : 1
          return `+=${range / limit}`
        },
        scrub: reduce ? true : 0.8,
        markers: false,
      },
    })
    // La pose lee el progreso ya suavizado por el scrub, no el scroll en crudo.
    timeline.eventCallback('onUpdate', () => apply(timeline.progress()))

    const clock = { p: 0 }
    timeline.to(clock, { p: 1, duration: 100, ease: 'none' }, 0)

    if (sceneRef.current) gsap.set(sceneRef.current, { opacity: 1 })

    const ride = (el, enter, leave, travel, fade = span) => {
      if (!el) return
      gsap.set(el, { opacity: 0, y: reduce ? 0 : travel })
      timeline.to(el, {
        opacity: 1,
        y: 0,
        duration: fade,
        ease: 'none',
        immediateRender: false,
      }, enter)
      if (leave == null) return
      timeline.to(el, {
        opacity: 0,
        y: reduce ? 0 : -Math.abs(travel) * 0.75,
        duration: fade,
        ease: 'none',
        immediateRender: false,
      }, leave)
    }

    const wash = (el, enter, leave) => {
      if (!el) return
      gsap.set(el, { opacity: 0 })
      timeline.to(el, { opacity: 1, duration: span, ease: 'none', immediateRender: false }, enter)
      if (!reduce) {
        const back = el.querySelector('[data-depth="back"]')
        const mid = el.querySelector('[data-depth="mid"]')
        const duration = Math.max((leave ?? 100) - enter, 2)
        if (back) {
          gsap.set(back, { yPercent: 6 })
          timeline.to(back, { yPercent: -6, duration, ease: 'none', immediateRender: false }, enter)
        }
        if (mid) {
          gsap.set(mid, { yPercent: 14 })
          timeline.to(mid, { yPercent: -14, duration, ease: 'none', immediateRender: false }, enter)
        }
      }
      if (leave == null) return
      timeline.to(el, { opacity: 0, duration: span, ease: 'none', immediateRender: false }, leave)
    }

    const rideCards = (panel, enter, leave) => {
      if (!panel) return
      const beats = [...panel.querySelectorAll('[data-beat]')]
      gsap.set(panel, { opacity: 1 })
      if (!beats.length) return
      const end = leave ?? enter + SLICE * 0.78
      const span = Math.max(end - enter, 0.8)
      const count = beats.length
      const step = count <= 1 ? 0 : Math.min(0.45, (span * 0.14) / (count - 1))
      const fade = reduce ? 0.01 : Math.min(0.75, Math.max(0.4, span * 0.14))
      beats.forEach((el, index) => {
        const start = enter + index * step
        const stays = leave == null
        const outAt = stays ? null : end - (count - 1 - index) * (step * 0.5)
        const travel = index % 2 === 0 ? 18 : 28
        ride(el, start, outAt, travel, fade)
      })
    }

    const playPhrase = (el, beat) => {
      if (!el || beat.pass == null) return
      const variant = el.dataset.passVariant || 'console'
      const fadeIn = reduce ? 0.01 : 0.45
      const spanTime = Math.max(beat.passOut - (beat.pass + fadeIn), 0.2)
      gsap.set(el, { opacity: 0, y: reduce ? 0 : 20 })
      timeline.to(el, { opacity: 1, y: 0, duration: fadeIn, ease: 'none', immediateRender: false }, beat.pass)

      if (variant === 'editorial') {
        const slices = [...el.querySelectorAll('[data-pass-slice]')]
        const sweep = el.querySelector('[data-pass-sweep]')
        gsap.set(slices, { yPercent: reduce ? 0 : 100, opacity: reduce ? 1 : 0 })
        if (sweep) gsap.set(sweep, { scaleX: reduce ? 1 : 0 })
        if (!reduce) {
          if (sweep) {
            timeline.to(sweep, { scaleX: 1, duration: spanTime * 0.25, ease: 'none', immediateRender: false }, beat.pass + fadeIn * 0.1)
          }
          slices.forEach((node, index) => {
            timeline.to(node, {
              yPercent: 0,
              opacity: 1,
              duration: spanTime * 0.22,
              ease: 'none',
              immediateRender: false,
            }, beat.pass + fadeIn * 0.2 + index * (spanTime * 0.12))
          })
        }
      } else if (variant === 'led') {
        const leds = [...el.querySelectorAll('[data-pass-led]')]
        gsap.set(leds, { opacity: reduce ? 1 : 0.14, scale: reduce ? 1 : 0.96 })
        if (!reduce && leds.length) {
          leds.forEach((node, index) => {
            timeline.to(node, {
              opacity: 1,
              scale: 1,
              duration: 0.08,
              ease: 'none',
              immediateRender: false,
            }, beat.pass + fadeIn + ((index + 1) / leds.length) * spanTime)
          })
        }
      } else if (variant === 'comic') {
        const card = el.querySelector('[data-pass-comic]')
        const hits = [...el.querySelectorAll('[data-pass-hit]')]
        if (card) gsap.set(card, { scale: reduce ? 1 : 0.88, rotation: reduce ? 0 : -4 })
        gsap.set(hits, { opacity: reduce ? 1 : 0, x: reduce ? 0 : -24 })
        if (!reduce) {
          if (card) {
            timeline.to(card, {
              scale: 1,
              rotation: -1.2,
              duration: spanTime * 0.5,
              ease: 'none',
              immediateRender: false,
            }, beat.pass + fadeIn * 0.4)
          }
          hits.forEach((node, index) => {
            timeline.to(node, {
              opacity: 1,
              x: 0,
              duration: spanTime * 0.42,
              ease: 'none',
              immediateRender: false,
            }, beat.pass + fadeIn + index * (spanTime * 0.38))
          })
        }
      } else {
        const chars = [...el.querySelectorAll('[data-pass-char]')]
        gsap.set(chars, { opacity: reduce ? 1 : 0 })
        if (!reduce && chars.length) {
          const typeStart = beat.pass + fadeIn
          chars.forEach((node, index) => {
            timeline.to(node, {
              opacity: 1,
              duration: 0.012,
              ease: 'none',
              immediateRender: false,
            }, typeStart + ((index + 1) / chars.length) * spanTime)
          })
        }
      }

      const fadeOut = reduce ? 0.01 : Math.max(0.7, (beat.room - beat.passOut) * 0.9)
      timeline.to(el, {
        opacity: 0,
        y: reduce ? 0 : -18,
        duration: fadeOut,
        ease: 'none',
        immediateRender: false,
      }, beat.passOut)
    }

    const ids = ['welcome', 'about', 'studies', 'experience', 'tools', 'closing', 'secret']
    ids.forEach((id) => {
      const beat = BEATS[id]
      const allow = id !== 'secret' || unlocked
      const room = layerOf(panels, 'panel', id)
      const pass = layerOf(panels, 'pass', id)
      if (!allow) {
        if (pass) gsap.set(pass, { opacity: 0, y: 0 })
        if (room) {
          gsap.set(room, { opacity: 0, y: 0 })
          room.querySelectorAll('[data-beat]').forEach((el) => gsap.set(el, { opacity: 0, y: 0 }))
        }
        return
      }
      if (beat.pass != null) playPhrase(pass, beat)
      else if (pass) gsap.set(pass, { opacity: 0, y: 0 })
      rideCards(room, beat.room, beat.roomOut)
      if (beat.atmo != null) {
        if (id === 'secret') wash(court, beat.atmo, beat.atmoOut)
        else wash(layerOf(panels, 'atmo', id), beat.atmo, beat.atmoOut)
      }
    })

    if (!unlocked && court) gsap.set(court, { opacity: 0 })

    const studyStart = BEATS.studies.atmo + 0.4
    const drawStroke = (selector, at, dur, fallbackLen = 520) => {
      const node = root?.querySelector(selector)
      if (!node) return
      const length = Number(node.dataset.len) || fallbackLen
      gsap.set(node, { strokeDasharray: length, strokeDashoffset: reduce ? 0 : length })
      if (!reduce) {
        timeline.to(node, { strokeDashoffset: 0, duration: dur, ease: 'none', immediateRender: false }, at)
      }
    }

    drawStroke('[data-study-draw="axis-y"]', studyStart, 1.3, 140)
    drawStroke('[data-study-draw="axis-x"]', studyStart + 1.4, 1.6, 260)
    drawStroke('[data-study-draw="curve"]', studyStart + 3.1, 2.4, 290)
    drawStroke('[data-eq-id="linear"]', studyStart + 5.6, 2.0, 480)
    drawStroke('[data-study-draw="circle"]', studyStart + 7.8, 2.2, 540)
    drawStroke('[data-eq-id="func"]', studyStart + 10.1, 1.9, 480)

    drawStroke('[data-study-draw="triangle"]', studyStart + 0.2, 3.4, 620)
    drawStroke('[data-eq-id="pythagoras"]', studyStart + 3.8, 2.4, 520)
    drawStroke('[data-study-draw="prism"]', studyStart + 6.6, 3.2, 460)

    const leftPencil = root?.querySelector('[data-pencil="left"]')
    if (leftPencil) {
      gsap.set(leftPencil, { x: 108, y: 230, rotation: reduce ? 0 : -12, opacity: reduce ? 1 : 0 })
      if (!reduce) {
        timeline
          .to(leftPencil, { opacity: 1, duration: 0.35, ease: 'none', immediateRender: false }, studyStart - 0.1)
          .to(leftPencil, { x: 108, y: 90, rotation: -18, duration: 1.3, ease: 'none', immediateRender: false }, studyStart)
          .to(leftPencil, { x: 88, y: 206, rotation: 16, duration: 0.15, ease: 'none', immediateRender: false }, studyStart + 1.3)
          .to(leftPencil, { x: 348, y: 206, rotation: 22, duration: 1.6, ease: 'none', immediateRender: false }, studyStart + 1.4)
          .to(leftPencil, { x: 108, y: 184, rotation: 6, duration: 0.15, ease: 'none', immediateRender: false }, studyStart + 3.0)
          .to(leftPencil, { x: 168, y: 120, rotation: -14, duration: 0.8, ease: 'none', immediateRender: false }, studyStart + 3.1)
          .to(leftPencil, { x: 228, y: 172, rotation: 18, duration: 0.8, ease: 'none', immediateRender: false }, studyStart + 3.9)
          .to(leftPencil, { x: 344, y: 126, rotation: -8, duration: 0.8, ease: 'none', immediateRender: false }, studyStart + 4.7)
          .to(leftPencil, { x: 104, y: 256, rotation: 14, duration: 0.15, ease: 'none', immediateRender: false }, studyStart + 5.5)
          .to(leftPencil, { x: 318, y: 256, rotation: 20, duration: 2.0, ease: 'none', immediateRender: false }, studyStart + 5.6)
          .to(leftPencil, { x: 266, y: 716, rotation: -10, duration: 0.25, ease: 'none', immediateRender: false }, studyStart + 7.6)
          .to(leftPencil, { x: 202, y: 652, rotation: -24, duration: 0.7, ease: 'none', immediateRender: false }, studyStart + 7.8)
          .to(leftPencil, { x: 138, y: 716, rotation: 12, duration: 0.7, ease: 'none', immediateRender: false }, studyStart + 8.5)
          .to(leftPencil, { x: 248, y: 671, rotation: 22, duration: 0.8, ease: 'none', immediateRender: false }, studyStart + 9.2)
          .to(leftPencil, { x: 104, y: 814, rotation: 14, duration: 0.15, ease: 'none', immediateRender: false }, studyStart + 10.0)
          .to(leftPencil, { x: 326, y: 814, rotation: 18, duration: 1.9, ease: 'none', immediateRender: false }, studyStart + 10.1)
          .to(leftPencil, { opacity: 0, duration: 0.5, ease: 'none', immediateRender: false }, studyStart + 12.1)
      }
    }

    const rightPencil = root?.querySelector('[data-pencil="right"]')
    if (rightPencil) {
      gsap.set(rightPencil, { x: 1046, y: 228, rotation: reduce ? 0 : 18, opacity: reduce ? 1 : 0 })
      if (!reduce) {
        timeline
          .to(rightPencil, { opacity: 1, duration: 0.35, ease: 'none', immediateRender: false }, studyStart)
          .to(rightPencil, { x: 1284, y: 228, rotation: 24, duration: 1.2, ease: 'none', immediateRender: false }, studyStart + 0.2)
          .to(rightPencil, { x: 1284, y: 96, rotation: -18, duration: 1.0, ease: 'none', immediateRender: false }, studyStart + 1.4)
          .to(rightPencil, { x: 1046, y: 228, rotation: -32, duration: 1.2, ease: 'none', immediateRender: false }, studyStart + 2.4)
          .to(rightPencil, { x: 1038, y: 274, rotation: 14, duration: 0.2, ease: 'none', immediateRender: false }, studyStart + 3.6)
          .to(rightPencil, { x: 1296, y: 274, rotation: 22, duration: 2.4, ease: 'none', immediateRender: false }, studyStart + 3.8)
          .to(rightPencil, { x: 1054, y: 764, rotation: -14, duration: 0.4, ease: 'none', immediateRender: false }, studyStart + 6.2)
          .to(rightPencil, { x: 1174, y: 652, rotation: -22, duration: 1.1, ease: 'none', immediateRender: false }, studyStart + 6.6)
          .to(rightPencil, { x: 1294, y: 764, rotation: 24, duration: 1.1, ease: 'none', immediateRender: false }, studyStart + 7.7)
          .to(rightPencil, { x: 1174, y: 764, rotation: 8, duration: 1.0, ease: 'none', immediateRender: false }, studyStart + 8.8)
          .to(rightPencil, { opacity: 0, duration: 0.5, ease: 'none', immediateRender: false }, studyStart + 10.2)
      }
    }

    const typeChars = (token, enter, step) => {
      const chars = root?.querySelectorAll(`[data-type="${token}"]`) ?? []
      chars.forEach((el, index) => {
        gsap.set(el, { opacity: reduce ? 1 : 0 })
        if (!reduce) timeline.to(el, { opacity: 1, duration: 0.3, ease: 'none', immediateRender: false }, enter + index * step)
      })
    }

    typeChars('dev', BEATS.experience.room + 0.15, 0.08)

    apply(timeline.progress() || 0)
    ScrollTrigger.refresh()
  }, { dependencies: [metrics, unlocked], scope: trackRef, revertOnUpdate: true })
}
