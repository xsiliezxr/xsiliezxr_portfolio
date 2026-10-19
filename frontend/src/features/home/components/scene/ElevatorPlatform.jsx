import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { FLOOR_Y } from '../../lib/journeyRig.js'
import { AvatarModel } from './AvatarModel.jsx'

function Thruster() {
  const jet = useRef(null)
  const core = useRef(null)
  const glow = useRef(null)

  useFrame((state) => {
    const flicker = 0.82 + Math.sin(state.clock.elapsedTime * 16) * 0.16
    if (jet.current) {
      jet.current.scale.set(1, flicker, 0.78)
      jet.current.position.y = -0.85 - (flicker - 0.82) * 0.45
    }
    if (core.current) {
      core.current.scale.set(1, 0.65 + flicker * 0.4, 0.78)
    }
    if (glow.current) glow.current.intensity = 10 + Math.sin(state.clock.elapsedTime * 18) * 2
  })

  return (
    <group>
      <mesh ref={jet} position={[0, -0.85, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.95, 1.35, 4]} />
        <meshBasicMaterial color="#ff5b14" transparent opacity={0.9} depthWrite={false} />
      </mesh>
      <mesh ref={core} position={[0, -0.62, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.48, 0.85, 4]} />
        <meshBasicMaterial color="#ffb000" transparent opacity={0.95} depthWrite={false} />
      </mesh>
      <pointLight ref={glow} position={[0, -0.9, 0]} color="#ff5b14" intensity={10} distance={7} decay={2} />
    </group>
  )
}

export function ElevatorPlatform({ rig }) {
  const group = useRef(null)
  const leftDoor = useRef(null)
  const rightDoor = useRef(null)
  const rider = useRef(null)
  const jet = useRef(null)

  useFrame(() => {
    if (!group.current) return
    group.current.position.set(rig.platform.x, rig.platform.y, rig.platform.z)
    const hatch = Math.min(Math.max(rig.tube, 0), 1)
    if (leftDoor.current) leftDoor.current.position.x = -0.24 - hatch * 0.42
    if (rightDoor.current) rightDoor.current.position.x = 0.24 + hatch * 0.42
    if (rider.current) rider.current.position.y = -hatch * 0.35
    if (jet.current) {
      const y = rig.platform.y
      const falling = hatch > 0.05 && y > FLOOR_Y.secret + 1.8
      const leavingDesk = y > -0.8 && y < FLOOR_Y.about + 0.4
      jet.current.visible = leavingDesk || falling
      jet.current.scale.setScalar(falling ? 0.72 : 1)
    }
  })

  return (
    <group ref={group}>
      <mesh position={[0, -0.16, 0]}>
        <boxGeometry args={[1.9, 0.46, 1.5]} />
        <meshStandardMaterial color="#3a332c" roughness={0.92} metalness={0.04} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[1.72, 0.05, 1.32]} />
        <meshStandardMaterial color="#1a1614" roughness={0.78} />
      </mesh>
      <mesh position={[0, 0.02, 0.72]}>
        <boxGeometry args={[1.9, 0.08, 0.06]} />
        <meshStandardMaterial color="#ff5b14" emissive="#ff5b14" emissiveIntensity={0.55} />
      </mesh>
      <mesh position={[0, 0.02, -0.72]}>
        <boxGeometry args={[1.9, 0.08, 0.06]} />
        <meshStandardMaterial color="#6b2508" emissive="#ff5b14" emissiveIntensity={0.2} />
      </mesh>
      <mesh ref={leftDoor} position={[-0.24, 0.09, 0]}>
        <boxGeometry args={[0.46, 0.035, 0.52]} />
        <meshStandardMaterial color="#2a241f" emissive="#ffb000" emissiveIntensity={0.15} />
      </mesh>
      <mesh ref={rightDoor} position={[0.24, 0.09, 0]}>
        <boxGeometry args={[0.46, 0.035, 0.52]} />
        <meshStandardMaterial color="#2a241f" emissive="#ffb000" emissiveIntensity={0.15} />
      </mesh>
      <group ref={jet}>
        <Thruster />
      </group>
      <group ref={rider}>
        <AvatarModel rig={rig} />
      </group>
    </group>
  )
}
