import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { Color, Fog } from 'three'
import { FALLBACK_METRICS, FOV, projectFace, readSceneMetrics } from '../../lib/journeyRig.js'
import { CameraRig } from './CameraRig.jsx'
import { ElevatorPlatform } from './ElevatorPlatform.jsx'
import { RoomShell, ShaftDecks } from './RoomShell.jsx'
import { SetupModel } from './SetupModel.jsx'

const LIGHT_STOPS = [
  { t: 0, ambient: 0.74, sun: 1.55, fill: 0.32, figure: 6.4, far: 96, near: 34, sunColor: '#fff6ee', fillColor: '#ff8a4a', fog: '#0a0a0a' },
  { t: 0.28, ambient: 0.7, sun: 1.45, fill: 0.34, figure: 6.6, far: 96, near: 30, sunColor: '#fff4ec', fillColor: '#ff8a4a', fog: '#0a0a0a' },
  { t: 0.43, ambient: 0.48, sun: 0.75, fill: 0.2, figure: 4.4, far: 90, near: 24, sunColor: '#f1efec', fillColor: '#c2410c', fog: '#0a0a0a' },
  { t: 0.58, ambient: 0.48, sun: 0.75, fill: 0.2, figure: 4.4, far: 90, near: 24, sunColor: '#f1efec', fillColor: '#c2410c', fog: '#0a0a0a' },
  { t: 0.72, ambient: 0.88, sun: 1.3, fill: 0.42, figure: 6.6, far: 96, near: 32, sunColor: '#fff6ee', fillColor: '#ffe3d3', fog: '#0a0a0a' },
  { t: 1, ambient: 0.58, sun: 0.95, fill: 0.38, figure: 5.6, far: 92, near: 28, sunColor: '#ffe3d3', fillColor: '#ff5b14', fog: '#0a0a0a' },
]

function mixStop(progress) {
  const t = Math.min(Math.max(progress, 0), 1)
  let index = 1
  while (index < LIGHT_STOPS.length && LIGHT_STOPS[index].t < t) index += 1
  const next = LIGHT_STOPS[Math.min(index, LIGHT_STOPS.length - 1)]
  const prev = LIGHT_STOPS[Math.max(index - 1, 0)]
  const span = next.t - prev.t || 1
  const u = Math.min(Math.max((t - prev.t) / span, 0), 1)
  return { prev, next, u }
}

function lerpChannel(from, to, u) {
  return from + (to - from) * u
}

function Measure({ groupRef, onReady }) {
  const done = useRef(false)

  const fire = (metrics) => {
    if (done.current) return
    done.current = true
    onReady(metrics)
  }

  useLayoutEffect(() => {
    if (!groupRef.current) return
    const metrics = readSceneMetrics(groupRef.current)
    if (metrics) fire(metrics)
  }, [groupRef, onReady])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (done.current) return
      const live = groupRef.current ? readSceneMetrics(groupRef.current) : null
      fire(live || FALLBACK_METRICS)
    }, 6500)
    return () => window.clearTimeout(timer)
  }, [groupRef, onReady])

  useFrame(() => {
    if (done.current || !groupRef.current) return
    const metrics = readSceneMetrics(groupRef.current)
    if (metrics) fire(metrics)
  })

  return null
}

function RoomLights({ rig, unlocked }) {
  const scene = useThree((state) => state.scene)
  const ambient = useRef(null)
  const sun = useRef(null)
  const fill = useRef(null)
  const figure = useRef(null)
  const sunA = useRef(new Color())
  const sunB = useRef(new Color())
  const fillA = useRef(new Color())
  const fillB = useRef(new Color())
  const fogA = useRef(new Color())
  const fogB = useRef(new Color())

  const lightKey = useRef(-1)

  useFrame(() => {
    const held = !unlocked && rig.progress > 0.92 ? 0.92 : rig.progress
    const key = Math.round(held * 200)
    if (key !== lightKey.current) {
      lightKey.current = key
      const { prev, next, u } = mixStop(held)
      if (ambient.current) ambient.current.intensity = lerpChannel(prev.ambient, next.ambient, u)
      if (sun.current) {
        sun.current.intensity = lerpChannel(prev.sun, next.sun, u)
        sun.current.color.copy(sunA.current.set(prev.sunColor)).lerp(sunB.current.set(next.sunColor), u)
      }
      if (fill.current) {
        fill.current.intensity = lerpChannel(prev.fill, next.fill, u)
        fill.current.color.copy(fillA.current.set(prev.fillColor)).lerp(fillB.current.set(next.fillColor), u)
      }
      if (scene.fog) {
        scene.fog.near = lerpChannel(prev.near, next.near, u)
        scene.fog.far = lerpChannel(prev.far, next.far, u)
        scene.fog.color.copy(fogA.current.set(prev.fog)).lerp(fogB.current.set(next.fog), u)
      }
      if (figure.current) figure.current.intensity = lerpChannel(prev.figure, next.figure, u)
    }
    if (figure.current) {
      figure.current.position.set(
        rig.platform.x * 0.72 + rig.pos.x * 0.28,
        rig.platform.y + 2.35,
        rig.platform.z * 0.72 + rig.pos.z * 0.28,
      )
    }
  })

  return (
    <>
      <ambientLight ref={ambient} intensity={0.72} />
      <directionalLight ref={sun} position={[5, 8, 7]} intensity={1.55} color="#fff6ee" />
      <directionalLight ref={fill} position={[-6, 4, -2]} intensity={0.28} color="#ff8a4a" />
      <pointLight ref={figure} position={[1.2, 2.4, 2]} intensity={6.5} distance={9} decay={2} color="#ffe3d3" />
    </>
  )
}

function ScreenPlate({ rig, metrics, plateRef, groupRef }) {
  const camera = useThree((state) => state.camera)
  const size = useThree((state) => state.size)
  const last = useRef({ opacity: '', transform: '', width: 0, height: 0, orient: '', visible: true })

  useFrame(() => {
    const shown = Math.min(Math.max(rig.setupVisible ?? 1, 0), 1)
    const visible = shown > 0.02
    if (groupRef?.current && last.current.visible !== visible) {
      groupRef.current.visible = visible
      last.current.visible = visible
    }
    const plate = plateRef.current
    if (!plate) return
    const width = Math.max(size.width, 1)
    const height = Math.max(size.height, 1)
    const portrait = width / height < 0.92
    const orient = portrait ? 'tall' : 'wide'
    if (last.current.orient !== orient) {
      plate.dataset.orient = orient
      last.current.orient = orient
    }
    if (last.current.width !== width || last.current.height !== height) {
      plate.style.width = `${width}px`
      plate.style.height = `${height}px`
      last.current.width = width
      last.current.height = height
    }
    const leaving = Math.min(Math.max(rig.zoomOut ?? 0, 0), 1)
    let opacity = '0'
    let transform = 'none'
    if (shown >= 0.03) {
      if (!metrics || leaving < 0.04) {
        opacity = String(shown)
        transform = 'none'
      } else {
        const face = portrait ? metrics.screens.tall : metrics.screens.wide
        const matrix = projectFace(face, camera, width, height, 1)
        if (matrix) {
          opacity = String(shown)
          transform = `matrix3d(${matrix.join(',')})`
        }
      }
    }
    if (last.current.opacity !== opacity) {
      plate.style.opacity = opacity
      last.current.opacity = opacity
    }
    if (last.current.transform !== transform) {
      plate.style.transform = transform
      last.current.transform = transform
    }
  })

  return null
}

export function JourneyCanvas({ rig, eventSource, onReady, unlocked, plateRef }) {
  const [dpr, setDpr] = useState(1)
  const [metrics, setMetrics] = useState(null)
  const groupRef = useRef(null)
  const readyOnce = useRef(false)

  const handleReady = (next) => {
    if (readyOnce.current) return
    readyOnce.current = true
    setMetrics(next)
    onReady(next)
  }

  return (
    <Canvas
      dpr={dpr}
      eventSource={eventSource}
      eventPrefix="client"
      camera={{ fov: FOV, near: 0.05, far: 120, position: [0, 4, 8] }}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
        failIfMajorPerformanceCaveat: false,
      }}
      performance={{ min: 0.45, max: 1, debounce: 200 }}
      onCreated={({ gl, scene }) => {
        scene.background = null
        scene.fog = new Fog('#0a0a0a', 18, 52)
        gl.setClearColor(0x000000, 0)
        gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.15))
      }}
    >
      <PerformanceMonitor
        onDecline={() => setDpr(0.85)}
        onIncline={() => setDpr(Math.min(window.devicePixelRatio || 1, 1.1))}
      />
      <RoomLights rig={rig} unlocked={unlocked} />
      <Suspense fallback={null}>
        <group ref={groupRef} position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <SetupModel rig={rig} />
        </group>
        <Measure groupRef={groupRef} onReady={handleReady} />
      </Suspense>
      <RoomShell metrics={metrics} rig={rig} />
      <ShaftDecks metrics={metrics} rig={rig} unlocked={unlocked} />
      <Suspense fallback={null}>
        <ElevatorPlatform rig={rig} />
      </Suspense>
      <CameraRig rig={rig} />
      <ScreenPlate rig={rig} metrics={metrics} plateRef={plateRef} groupRef={groupRef} />
    </Canvas>
  )
}
