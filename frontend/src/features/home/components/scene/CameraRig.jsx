import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'

export function CameraRig({ rig }) {
  const camera = useThree((state) => state.camera)
  const aim = useRef(new Vector3())

  useFrame(() => {
    camera.position.set(rig.pos.x, rig.pos.y, rig.pos.z)
    aim.current.set(rig.target.x, rig.target.y, rig.target.z)
    camera.lookAt(aim.current)
  })

  return null
}
