import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Shape, ShapeGeometry } from 'three'
import { FLOOR_Y } from '../../lib/journeyRig.js'

// El radio deja el hueco libre alrededor de la plataforma.
const HOLE_RADIUS = 1.48

function floorGeometry(platform, radius = HOLE_RADIUS) {
  const shape = new Shape()
  const span = 14
  shape.moveTo(-span, -span)
  shape.lineTo(span, -span)
  shape.lineTo(span, span)
  shape.lineTo(-span, span)
  shape.closePath()
  const hole = new Shape()
  hole.absarc(platform.x, -platform.z, radius, 0, Math.PI * 2, true)
  shape.holes.push(hole)
  return new ShapeGeometry(shape)
}

export function RoomShell({ metrics }) {
  const geometry = useMemo(() => (metrics ? floorGeometry(metrics.platform) : null), [metrics])

  if (!geometry || !metrics) return null

  const { x, z } = metrics.platform

  return (
    <group>
      <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2a2826" roughness={0.86} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.06, z]}>
        <ringGeometry args={[HOLE_RADIUS + 0.02, HOLE_RADIUS + 0.42, 48]} />
        <meshStandardMaterial color="#ff5b14" emissive="#ff5b14" emissiveIntensity={1.4} roughness={0.35} />
      </mesh>
      <pointLight position={[x, -1.6, z]} color="#ff5b14" intensity={8} distance={9} decay={2} />
    </group>
  )
}

export function ShaftDecks({ metrics, rig, unlocked }) {
  const geometry = useMemo(() => (metrics ? floorGeometry(metrics.platform, HOLE_RADIUS + 0.08) : null), [metrics])
  const leftGate = useRef(null)
  const rightGate = useRef(null)

  useFrame(() => {
    const hatch = unlocked ? Math.min(Math.max(rig?.tube ?? 0, 0), 1) : 0
    const shift = 0.78 + hatch * 1.18
    if (leftGate.current) leftGate.current.position.x = -shift
    if (rightGate.current) rightGate.current.position.x = shift
  })

  if (!geometry || !metrics) return null

  const { x, z } = metrics.platform
  const y = FLOOR_Y.closing

  return (
    <group position={[0, y, 0]}>
      <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#ff5b14" emissive="#c2410c" emissiveIntensity={0.45} roughness={0.82} />
      </mesh>
      <group position={[x, 0, z]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
          <ringGeometry args={[HOLE_RADIUS + 0.06, HOLE_RADIUS + 0.48, 48]} />
          <meshStandardMaterial color="#0a0a0a" emissive="#2a0e03" emissiveIntensity={0.35} roughness={0.6} />
        </mesh>
        <mesh ref={leftGate} position={[-0.78, -0.02, 0]}>
          <boxGeometry args={[1.56, 0.16, 3.12]} />
          <meshStandardMaterial color="#131313" emissive="#6b2508" emissiveIntensity={unlocked ? 0.5 : 0.15} roughness={0.75} />
        </mesh>
        <mesh ref={rightGate} position={[0.78, -0.02, 0]}>
          <boxGeometry args={[1.56, 0.16, 3.12]} />
          <meshStandardMaterial color="#131313" emissive="#6b2508" emissiveIntensity={unlocked ? 0.5 : 0.15} roughness={0.75} />
        </mesh>
      </group>
    </group>
  )
}
