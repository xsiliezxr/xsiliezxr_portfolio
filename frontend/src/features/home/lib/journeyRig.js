import * as THREE from 'three'
import { matrixFromQuad } from './projectFace.js'

// fov 35: tele corto para llenar el monitor sin doblar las esquinas. near 0.05 va en el Canvas para no recortar la pantalla.
export const FOV = 35
export const AVATAR_SCALE = 0.018
export const AVATAR_HEIGHT = 190.4 * AVATAR_SCALE
export const JOURNEY_VIEW_DVH = 100
export const FLOOR_SCROLL_DVH = 200
export const FLOOR_IDS = ['welcome', 'about', 'studies', 'experience', 'tools', 'closing', 'secret']
export const FLOOR_COUNT = FLOOR_IDS.length
export const LOCKED_PROGRESS = (FLOOR_COUNT - 1) / FLOOR_COUNT
export const FLOOR_Y = {
  desk: 0,
  about: -5.5,
  studies: -11,
  experience: -18,
  tools: -25,
  closing: -32,
  secret: -42,
}

const _size = new THREE.Vector3()
const _scale = new THREE.Vector3()
const _center = new THREE.Vector3()
const _box = new THREE.Box3()
const _axes = [
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(0, 0, 1),
]
const _world = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]
const _corner = new THREE.Vector3()
const _projected = new THREE.Vector3()

export function createRig() {
  return {
    progress: 0,
    tube: 0,
    setupVisible: 1,
    pos: { x: 0, y: 4, z: 8 },
    target: { x: 0, y: 4, z: 0 },
    platform: { x: 2.4, y: 0, z: 1.2 },
    metrics: null,
  }
}

function measureScreen(mesh) {
  if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox()
  mesh.geometry.boundingBox.getSize(_size)
  const locals = _axes.map((axis, index) => ({
    axis,
    length: index === 0 ? _size.x : index === 1 ? _size.y : _size.z,
  }))
  locals.sort((a, b) => a.length - b.length)
  const thickness = locals[0].axis.clone()
  mesh.updateWorldMatrix(true, true)
  mesh.getWorldScale(_scale)
  const uniform = (Math.abs(_scale.x) + Math.abs(_scale.y) + Math.abs(_scale.z)) / 3
  const face = locals.slice(1).map((entry) => {
    const direction = entry.axis.clone().transformDirection(mesh.matrixWorld).normalize()
    return { direction, length: entry.length * uniform }
  })
  const upEntry = Math.abs(face[0].direction.y) >= Math.abs(face[1].direction.y) ? face[0] : face[1]
  const sideEntry = upEntry === face[0] ? face[1] : face[0]
  if (upEntry.direction.y < 0) upEntry.direction.negate()
  _box.setFromObject(mesh)
  _box.getCenter(_center)
  const normal = thickness.transformDirection(mesh.matrixWorld).normalize()
  if (normal.z < 0) normal.negate()
  return {
    center: { x: _center.x, y: _center.y, z: _center.z },
    right: { x: sideEntry.direction.x, y: sideEntry.direction.y, z: sideEntry.direction.z },
    up: { x: upEntry.direction.x, y: upEntry.direction.y, z: upEntry.direction.z },
    normal: { x: normal.x, y: normal.y, z: normal.z },
    width: sideEntry.length,
    height: upEntry.length,
  }
}

export function readSceneMetrics(group) {
  const wideMesh = group.getObjectByName('screen-main')
  const tallMesh = group.getObjectByName('screen-side')
  if (!wideMesh || !tallMesh) return null
  const wide = measureScreen(wideMesh)
  const tall = measureScreen(tallMesh)
  _box.setFromObject(group)
  _box.getCenter(_center)
  _box.getSize(_size)
  const right = new THREE.Vector3(wide.right.x, wide.right.y, wide.right.z)
  const normal = new THREE.Vector3(wide.normal.x, wide.normal.y, wide.normal.z)
  const platform = _center.clone().addScaledVector(right, _size.x * 0.48).addScaledVector(normal, 0.2)
  return {
    screens: { wide, tall },
    platform: { x: platform.x, y: 0, z: platform.z },
    deskCenter: {
      x: _center.x,
      y: wide.center.y - wide.height * 0.9,
      z: _center.z,
    },
  }
}

function add(point, vector, scale) {
  return {
    x: point.x + vector.x * scale,
    y: point.y + vector.y * scale,
    z: point.z + vector.z * scale,
  }
}

function coverDistance(face, aspect) {
  const vfov = (FOV * Math.PI) / 180
  const hfov = 2 * Math.atan(Math.tan(vfov / 2) * aspect)
  const byHeight = face.height / 2 / Math.tan(vfov / 2)
  const byWidth = face.width / 2 / Math.tan(hfov / 2)
  return Math.min(byHeight, byWidth) * 0.96
}

export function computePose(metrics, aspect = 1.6) {
  const portrait = aspect < 0.92
  const face = portrait ? metrics.screens.tall : metrics.screens.wide
  const distance = coverDistance(face, Math.max(aspect, 0.4))
  const hero = {
    pos: add(face.center, face.normal, distance * 0.92),
    target: { ...face.center },
  }
  const deskReach = distance * 6.4
  const desk = {
    pos: {
      x: face.center.x + face.normal.x * deskReach,
      y: face.center.y * 0.72 + 0.55,
      z: face.center.z + face.normal.z * deskReach,
    },
    target: {
      x: face.center.x * 0.4 + metrics.platform.x * 0.6,
      y: face.center.y * 0.42,
      z: face.center.z * 0.4 + metrics.platform.z * 0.6,
    },
  }
  const lane = (floorY, side = 1) => {
    const vfov = (FOV * Math.PI) / 180
    const span = AVATAR_HEIGHT / (portrait ? 0.46 : 0.4)
    const reach = (span / 2) / Math.tan(vfov / 2)
    const lookY = floorY + AVATAR_HEIGHT * 0.46
    const shift = portrait ? 0.35 : 1.15
    return {
      pos: {
        x: metrics.platform.x + face.normal.x * reach,
        y: lookY + AVATAR_HEIGHT * 0.06,
        z: metrics.platform.z + face.normal.z * reach,
      },
      target: {
        x: metrics.platform.x - face.right.x * side * shift,
        y: lookY,
        z: metrics.platform.z - face.right.z * side * shift,
      },
    }
  }
  const wide = (floorY) => {
    const vfov = (FOV * Math.PI) / 180
    const span = AVATAR_HEIGHT / (portrait ? 0.34 : 0.24)
    const reach = (span / 2) / Math.tan(vfov / 2)
    const lookY = floorY + AVATAR_HEIGHT * 0.5
    const shift = portrait ? 0.2 : 1.7
    return {
      pos: {
        x: metrics.platform.x + face.normal.x * reach,
        y: lookY,
        z: metrics.platform.z + face.normal.z * reach,
      },
      target: {
        x: metrics.platform.x + face.right.x * shift,
        y: lookY,
        z: metrics.platform.z + face.right.z * shift,
      },
    }
  }
  return { hero, desk, about: lane(0, -1), follow: lane, wide, portrait }
}

function smooth(value) {
  const x = Math.min(Math.max(value, 0), 1)
  return x * x * (3 - 2 * x)
}

function mix(a, b, t) {
  return a + (b - a) * t
}

function lerpShot(from, to, t) {
  return {
    pos: {
      x: mix(from.pos.x, to.pos.x, t),
      y: mix(from.pos.y, to.pos.y, t),
      z: mix(from.pos.z, to.pos.z, t),
    },
    target: {
      x: mix(from.target.x, to.target.x, t),
      y: mix(from.target.y, to.target.y, t),
      z: mix(from.target.z, to.target.z, t),
    },
  }
}

const SIDE_KEYS = [
  [0, 0],
  [1, 0],
]

let poseCacheKey = ''
let poseCache = null

function unit(value) {
  return Math.min(Math.max(value, 0), 1)
}

function keyed(keys, progress) {
  const p = unit(progress)
  if (p <= keys[0][0]) return keys[0][1]
  for (let i = 1; i < keys.length; i += 1) {
    if (p <= keys[i][0]) {
      const span = keys[i][0] - keys[i - 1][0] || 1
      return mix(keys[i - 1][1], keys[i][1], smooth((p - keys[i - 1][0]) / span))
    }
  }
  return keys[keys.length - 1][1]
}

export function floorAnchor(id) {
  const index = FLOOR_IDS.indexOf(id)
  if (index <= 0) return 0
  if (id === 'secret') return LOCKED_PROGRESS + 0.05
  return index / FLOOR_COUNT + 0.034
}

function platformKeys(unlocked) {
  const slice = 1 / FLOOR_COUNT
  const keys = [
    [0, 0],
    [slice * 0.82, 0],
    [slice * 1.12, FLOOR_Y.about],
    [slice * 2 - 0.02, FLOOR_Y.about],
    [slice * 2 + 0.035, FLOOR_Y.studies],
    [slice * 3 - 0.015, FLOOR_Y.studies],
    [slice * 3 + 0.035, FLOOR_Y.experience],
    [slice * 4 - 0.015, FLOOR_Y.experience],
    [slice * 4 + 0.035, FLOOR_Y.tools],
    [slice * 5 - 0.015, FLOOR_Y.tools],
    [slice * 5 + 0.035, FLOOR_Y.closing],
    [slice * 6 - 0.012, FLOOR_Y.closing],
    [LOCKED_PROGRESS, FLOOR_Y.closing],
  ]
  if (unlocked) {
    keys.push([LOCKED_PROGRESS + 0.04, FLOOR_Y.secret], [1, FLOOR_Y.secret])
  } else {
    keys.push([1, FLOOR_Y.closing])
  }
  return keys
}

export function poseAt(progress, metrics, aspect, unlocked = false) {
  const key = `${aspect.toFixed(3)}:${metrics.platform.x.toFixed(2)}:${metrics.platform.z.toFixed(2)}`
  if (key !== poseCacheKey) {
    poseCacheKey = key
    poseCache = computePose(metrics, aspect)
  }
  const pose = poseCache
  const p = unit(progress)
  const platformY = keyed(platformKeys(unlocked), p)
  const side = keyed(SIDE_KEYS, p) * (pose.portrait ? 0.25 : 1)
  const ride = pose.follow(platformY, side)
  // Del monitor (hero) hace zoom out al setup (desk) y luego desciende con la plataforma.
  const zoomOut = smooth(unit((p - 0.012) / 0.055))
  const introShot = lerpShot(pose.hero, pose.desk, zoomOut)
  const descend = smooth(unit((p - 0.125) / 0.045))
  const shot = lerpShot(introShot, ride, descend)
  return {
    shot,
    platformY,
    setupVisible: 1 - smooth(unit((p - 0.13) / 0.045)),
    tube: unlocked ? smooth(unit((p - 0.9) / 0.08)) : 0,
  }
}

export function applyPose(rig, shot) {
  rig.pos.x = shot.pos.x
  rig.pos.y = shot.pos.y
  rig.pos.z = shot.pos.z
  rig.target.x = shot.target.x
  rig.target.y = shot.target.y
  rig.target.z = shot.target.z
}

export function projectFace(face, camera, width, height) {
  const center = _corner
  const right = _world[0].set(face.right.x, face.right.y, face.right.z)
  const up = _world[1].set(face.up.x, face.up.y, face.up.z)
  center.set(face.center.x, face.center.y, face.center.z)
  const hw = (face.width / 2) * 1.04
  const hh = (face.height / 2) * 1.04
  const signs = [
    [-1, 1],
    [1, 1],
    [1, -1],
    [-1, -1],
  ]
  const corners = []
  for (let i = 0; i < 4; i += 1) {
    _world[2].copy(center).addScaledVector(right, signs[i][0] * hw).addScaledVector(up, signs[i][1] * hh)
    _projected.copy(_world[2]).project(camera)
    if (_projected.z > 1) return null
    corners.push({
      x: (_projected.x * 0.5 + 0.5) * width,
      y: (-_projected.y * 0.5 + 0.5) * height,
    })
  }
  if (corners[1].x < corners[0].x) {
    const ordered = [corners[1], corners[0], corners[3], corners[2]]
    return matrixFromQuad(width, height, ordered)
  }
  return matrixFromQuad(width, height, corners)
}

export function trackDvh(unlocked) {
  const floors = unlocked ? FLOOR_COUNT : FLOOR_COUNT - 1
  return JOURNEY_VIEW_DVH + FLOOR_SCROLL_DVH * floors
}

function journeyLimit(scroller) {
  const cap = Number(scroller?.dataset?.journeyCap)
  if (!Number.isFinite(cap) || cap <= 0) return 1
  return Math.min(cap, 1)
}

export function scrollToProgress(progress, behavior = 'smooth') {
  const scroller = document.getElementById('journey-scroll')
  const track = scroller?.firstElementChild
  const range = track
    ? Math.max(track.offsetHeight - scroller.clientHeight, 0)
    : Math.max(document.documentElement.scrollHeight - window.innerHeight, 0)
  const limit = scroller ? journeyLimit(scroller) : 1
  const top = (range / limit) * Math.min(Math.max(progress, 0), limit)
  if (behavior === 'auto') {
    if (scroller) scroller.scrollTop = top
    else window.scrollTo(0, top)
    return
  }
  if (scroller) scroller.scrollTo({ top, behavior })
  else window.scrollTo({ top, behavior })
}

// El piso cambia al entrar la parada, para que el indicador coincida con esa lámina.
export function floorFromProgress(progress) {
  const clamped = Math.min(Math.max(progress, 0), 0.999999)
  const index = Math.min(FLOOR_COUNT - 1, Math.floor(clamped * FLOOR_COUNT))
  return FLOOR_IDS[index]
}

export function chapterFromProgress(progress, unlocked) {
  const floor = floorFromProgress(progress)
  if (floor === 'welcome') return 'hero'
  if (floor === 'secret' && !unlocked) return 'closing'
  return floor
}

function pixelDelta(event, scroller) {
  if (event.deltaMode === 1) return event.deltaY * 32
  if (event.deltaMode === 2) return event.deltaY * scroller.clientHeight
  return event.deltaY
}

function scrollLocked(scroller) {
  return scroller.style.overflow === 'hidden' || scroller.style.overflowY === 'hidden'
}

function fieldFocused(target) {
  return target instanceof Element && Boolean(target.closest('input, textarea, select, [contenteditable="true"]'))
}

function innerScrollOwns(target, scroller, delta) {
  let node = target instanceof Element ? target : null
  while (node && node !== scroller) {
    if (node instanceof HTMLElement) {
      const style = getComputedStyle(node)
      const canScroll = style.overflowY === 'auto' || style.overflowY === 'scroll'
      if (canScroll && node.scrollHeight > node.clientHeight + 1) {
        const atTop = node.scrollTop <= 0
        const atBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 1
        if ((delta < 0 && !atTop) || (delta > 0 && !atBottom)) return true
      }
    }
    node = node.parentElement
  }
  return false
}

// El documento no hace scroll: la rueda sobre capas fixed se aplica a este contenedor.
export function bindJourneyScroll(scroller) {
  const apply = (delta) => {
    if (!delta || scrollLocked(scroller)) return false
    scroller.scrollTop += delta
    return true
  }

  const onWheel = (event) => {
    if (event.ctrlKey || scrollLocked(scroller)) return
    const target = event.target
    if (target instanceof Element && target.closest('[role="dialog"]')) return
    if (fieldFocused(target)) return
    const delta = pixelDelta(event, scroller)
    if (!delta || innerScrollOwns(target, scroller, delta)) return
    apply(delta)
    event.preventDefault()
  }

  let touch = null
  const onTouchStart = (event) => {
    if (event.touches.length !== 1) {
      touch = null
      return
    }
    touch = { y: event.touches[0].clientY, scrolling: false }
  }
  const onTouchMove = (event) => {
    if (!touch || event.touches.length !== 1 || scrollLocked(scroller)) return
    const target = event.target
    if (target instanceof Element && target.closest('[role="dialog"]')) return
    if (fieldFocused(target)) return
    const y = event.touches[0].clientY
    const delta = touch.y - y
    if (!touch.scrolling) {
      if (Math.abs(delta) < 10) return
      touch.scrolling = true
    }
    if (innerScrollOwns(target, scroller, delta)) {
      touch.y = y
      return
    }
    touch.y = y
    apply(delta)
    event.preventDefault()
  }
  const onTouchEnd = () => {
    touch = null
  }

  const onKey = (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || scrollLocked(scroller)) return
    if (fieldFocused(event.target)) return
    if (event.target instanceof Element && event.target.closest('[role="dialog"]')) return
    const page = scroller.clientHeight
    const line = page * 0.12
    let delta = 0
    if (event.key === 'ArrowDown') delta = line
    else if (event.key === 'ArrowUp') delta = -line
    else if (event.key === 'PageDown') delta = page * 0.86
    else if (event.key === 'PageUp') delta = -page * 0.86
    else if (event.key === ' ') {
      if (event.target instanceof Element && event.target.closest('button, a, [role="button"]')) return
      delta = event.shiftKey ? -page * 0.86 : page * 0.86
    } else if (event.key === 'Home') {
      scroller.scrollTop = 0
      event.preventDefault()
      return
    } else if (event.key === 'End') {
      scroller.scrollTop = scroller.scrollHeight
      event.preventDefault()
      return
    } else return
    apply(delta)
    event.preventDefault()
  }

  const wheelOptions = { passive: false, capture: true }
  window.addEventListener('wheel', onWheel, wheelOptions)
  window.addEventListener('touchstart', onTouchStart, { passive: true, capture: true })
  window.addEventListener('touchmove', onTouchMove, wheelOptions)
  window.addEventListener('touchend', onTouchEnd, { capture: true })
  window.addEventListener('keydown', onKey)
  return () => {
    window.removeEventListener('wheel', onWheel, wheelOptions)
    window.removeEventListener('touchstart', onTouchStart, { capture: true })
    window.removeEventListener('touchmove', onTouchMove, wheelOptions)
    window.removeEventListener('touchend', onTouchEnd, { capture: true })
    window.removeEventListener('keydown', onKey)
  }
}
