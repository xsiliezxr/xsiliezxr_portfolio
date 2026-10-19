import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useAnimations, useGLTF, useTexture } from '@react-three/drei'
import { Box3, Euler, LoopRepeat, Quaternion, SRGBColorSpace } from 'three'
import { clone } from 'three/addons/utils/SkeletonUtils.js'
import { AVATAR_SCALE } from '../../lib/journeyRig.js'
import { useJourneyStore } from '../../store/journey.store.js'

const MODEL_URL = '/three/modelo_siliezar.glb'
const IDLE = 'Armature|mirar'
const DOWN = 'Armature|flotar'
const UP = 'Armature|nervioso'

const MAPS = {
  about: '/three/modelo_siliezar.fbm/texture_about_contact.webp',
  studies: '/three/modelo_siliezar.fbm/texture_education.webp',
  experience: '/three/modelo_siliezar.fbm/texture_experience.webp',
  tools: '/three/modelo_siliezar.fbm/texture_toolkit.webp',
  secret: '/three/modelo_siliezar.fbm/texture_secret.webp',
}

const FLOOR_MAP = {
  welcome: null,
  about: 'about',
  studies: 'studies',
  experience: 'experience',
  tools: 'tools',
  closing: 'about',
  secret: 'secret',
}

const HEAD_BONE = 'mixamorigHead'
const LOOK_YAW = 0.1
const LOOK_PITCH = 0.055

function clamp01(value) {
  return Math.min(Math.max(value, 0), 1)
}

function smooth01(value) {
  const x = clamp01(value)
  return x * x * (3 - 2 * x)
}

function deskLook(progress) {
  if (progress < 0.13 || progress > 0.27) return 0
  if (progress < 0.16) return smooth01((progress - 0.13) / 0.03)
  if (progress < 0.22) return 1
  return 1 - smooth01((progress - 0.22) / 0.05)
}

function findHead(root) {
  let bone = null
  root.traverse((node) => {
    if (bone || !node.isBone || node.name !== HEAD_BONE) return
    bone = node
  })
  return bone
}

export function AvatarModel({ rig }) {
  const source = useGLTF(MODEL_URL, '/draco/')
  const scene = useMemo(() => {
    const next = clone(source.scene)
    next.traverse((node) => {
      if (node.isMesh && node.material) node.material = node.material.clone()
    })
    return next
  }, [source.scene])
  const group = useRef(null)
  const { actions, mixer } = useAnimations(source.animations, scene)
  const floorId = useJourneyStore((state) => state.floorId)
  const maps = useTexture(MAPS)
  const clip = useRef('')
  const previousProgress = useRef(0)
  const stillFor = useRef(0)
  const reduced = useRef(false)
  const box = useMemo(() => new Box3(), [])
  const head = useMemo(() => findHead(scene), [scene])
  const look = useRef({ yaw: 0, pitch: 0, allow: false })
  const pointer = useRef({ x: 0, y: 0 })
  const offset = useMemo(() => new Quaternion(), [])
  const euler = useMemo(() => new Euler(0, 0, 0, 'YXZ'), [])

  useLayoutEffect(() => {
    Object.values(maps).forEach((texture) => {
      texture.colorSpace = SRGBColorSpace
      texture.flipY = false
      texture.needsUpdate = true
    })
  }, [maps])

  useLayoutEffect(() => {
    const key = FLOOR_MAP[floorId]
    scene.traverse((node) => {
      if (!node.isMesh || !node.material) return
      if (!node.userData.baseMap && node.material.map) node.userData.baseMap = node.material.map
      node.material.map = key ? maps[key] : node.userData.baseMap
      node.material.needsUpdate = true
    })
  }, [floorId, maps, scene])

  useLayoutEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let bound = false
    const onMove = (event) => {
      if (event.pointerType === 'touch') return
      const nx = (event.clientX / window.innerWidth) * 2 - 1
      const ny = (event.clientY / window.innerHeight) * 2 - 1
      pointer.current.x = Math.min(1, Math.max(-1, nx))
      pointer.current.y = Math.min(1, Math.max(-1, ny))
    }
    const sync = () => {
      reduced.current = reduce.matches
      const allow = fine.matches && !reduce.matches
      look.current.allow = allow
      if (allow && !bound) {
        bound = true
        window.addEventListener('pointermove', onMove)
      } else if (!allow && bound) {
        bound = false
        window.removeEventListener('pointermove', onMove)
      }
      if (!allow) {
        pointer.current.x = 0
        pointer.current.y = 0
      }
    }
    sync()
    fine.addEventListener('change', sync)
    reduce.addEventListener('change', sync)
    return () => {
      fine.removeEventListener('change', sync)
      reduce.removeEventListener('change', sync)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  useLayoutEffect(() => {
    const idle = actions[IDLE]
    if (!idle) return undefined
    const quiet = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    reduced.current = quiet
    idle.reset().setLoop(LoopRepeat, Infinity)
    if (quiet) {
      idle.play()
      idle.paused = true
    } else {
      idle.fadeIn(0.2).play()
    }
    clip.current = IDLE
    mixer.update(0.05)
    useJourneyStore.getState().setAvatarReady(true)
    if (group.current) {
      box.setFromObject(group.current)
      const parentY = group.current.parent?.position.y ?? 0
      group.current.position.y -= box.min.y - parentY
    }
    return () => {
      mixer.stopAllAction()
      useJourneyStore.getState().setAvatarReady(false)
    }
  }, [actions, box, mixer])

  useFrame((_, delta) => {
    const progress = rig?.progress ?? 0
    const deltaP = progress - previousProgress.current
    previousProgress.current = progress
    if (reduced.current) {
      if (clip.current !== IDLE && actions[IDLE]) {
        actions[IDLE].reset().setLoop(LoopRepeat, Infinity).play()
        actions[IDLE].paused = true
        if (clip.current) actions[clip.current]?.stop()
        clip.current = IDLE
      }
      return
    }
    const atDesk = progress >= 0.13 && progress <= 0.27
    const leavingMonitor = progress < 0.125
    let next = IDLE
    if (atDesk || leavingMonitor) {
      next = IDLE
      stillFor.current = 0
    } else if (deltaP > 0.00008) {
      next = DOWN
      stillFor.current = 0
    } else if (deltaP < -0.00008) {
      next = UP
      stillFor.current = 0
    } else {
      stillFor.current += delta
      if (stillFor.current < 0.35) next = clip.current || IDLE
    }
    if (!actions[next] || next === clip.current) return
    // Bajar (progreso +) usa flotar, subir usa nervioso; en el setup manda mirar.
    actions[next].reset().setLoop(LoopRepeat, Infinity).fadeIn(0.22).play()
    actions[clip.current]?.fadeOut(0.22)
    clip.current = next
  })

  useFrame((_, delta) => {
    if (!head) return
    const progress = rig?.progress ?? 0
    const atDesk = progress >= 0.13 && progress <= 0.27
    const weight = look.current.allow && atDesk ? deskLook(progress) : 0
    if (weight < 0.001) {
      look.current.yaw = 0
      look.current.pitch = 0
      return
    }
    const targetYaw = -pointer.current.x * LOOK_YAW * weight
    const targetPitch = pointer.current.y * LOOK_PITCH * weight
    const blend = 1 - Math.exp(-delta * 7)
    look.current.yaw += (targetYaw - look.current.yaw) * blend
    look.current.pitch += (targetPitch - look.current.pitch) * blend
    euler.set(look.current.pitch, look.current.yaw, 0)
    offset.setFromEuler(euler)
    head.quaternion.multiply(offset)
  })

  return <primitive ref={group} object={scene} scale={AVATAR_SCALE} />
}

useGLTF.preload(MODEL_URL, '/draco/')
