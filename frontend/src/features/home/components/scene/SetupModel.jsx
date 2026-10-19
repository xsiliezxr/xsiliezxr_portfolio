import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useTexture } from '@react-three/drei'
import { Color, SRGBColorSpace } from 'three'
import heroShotUrl from '../../../../assets/images/hero.png'

const SETUP_URL = '/three/setup_3D-transformed.glb'
const PRESETS = ['#ff5b14', '#ffb000', '#f1efec']

function canTouch(rig, event) {
  if ((rig.setupVisible ?? 1) < 0.35) return false
  const target = event.nativeEvent?.target
  return !target?.closest?.('[data-ui]')
}

export function SetupModel({ rig }) {
  const { nodes, materials } = useGLTF(SETUP_URL, '/draco/')
  const heroShot = useTexture(heroShotUrl)
  const screenMat = useMemo(() => materials['Material.009'].clone(), [materials])
  const [rgbColor, setRgbColor] = useState(PRESETS[0])
  const [lightsOn, setLightsOn] = useState(true)
  const [spectrum, setSpectrum] = useState(false)
  const preset = useRef(0)
  const lightRef = useRef(null)
  const color = useMemo(() => new Color(PRESETS[0]), [])

  useLayoutEffect(() => {
    heroShot.colorSpace = SRGBColorSpace
    heroShot.flipY = true
    heroShot.needsUpdate = true
    screenMat.map = heroShot
    screenMat.emissiveMap = heroShot
    screenMat.emissive.set('#ffffff')
    screenMat.emissiveIntensity = 0.42
    screenMat.needsUpdate = true
  }, [heroShot, screenMat])
  const mats = useMemo(
    () => ({
      front: materials['Material.020'].clone(),
      fans: materials['Material.018'].clone(),
      keys: materials['Material.003'].clone(),
    }),
    [materials],
  )

  useFrame((state) => {
    const plate = Math.min(Math.max(rig?.setupVisible ?? 0, 0), 1)
    screenMat.color.setScalar(1 - plate)
    screenMat.emissiveIntensity = 0.42 * (1 - plate)
    if (spectrum) color.setHSL((state.clock.elapsedTime * 0.07) % 1, 0.9, 0.55)
    else color.set(rgbColor)
    const power = lightsOn ? 1 : 0
    mats.front.emissive.copy(color)
    mats.fans.emissive.copy(color)
    mats.keys.emissive.copy(color)
    mats.front.emissiveIntensity = 2.1 * power
    mats.fans.emissiveIntensity = 1.3 * power
    mats.keys.emissiveIntensity = lightsOn ? 2.4 : 0.12
    if (lightRef.current) {
      lightRef.current.color.copy(color)
      lightRef.current.intensity = lightsOn ? 7 : 0
    }
  })

  const cycleRgb = (event) => {
    event.stopPropagation()
    if (!canTouch(rig, event)) return
    if (spectrum) {
      setSpectrum(false)
      preset.current = 0
      setRgbColor(PRESETS[0])
      return
    }
    preset.current += 1
    if (preset.current >= PRESETS.length) {
      setSpectrum(true)
      return
    }
    setRgbColor(PRESETS[preset.current])
  }

  const toggleLights = (event) => {
    event.stopPropagation()
    if (!canTouch(rig, event)) return
    setLightsOn((on) => !on)
  }

  const hover = (event, active) => {
    if (!canTouch(rig, event) && active) return
    document.body.style.cursor = active ? 'pointer' : ''
  }

  return (
    <group dispose={null}>
      <group position={[-1.405, 4.068, 1.446]} rotation={[0, -0.017, -Math.PI / 2]} scale={1.042}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0, 1.009, 0]} rotation={[-2.91, -0.017, 0.01]}>
            <group rotation={[Math.PI / 2, 0, 0]}>
              <mesh geometry={nodes.Cube003_Material016_0.geometry} material={materials.PaletteMaterial001} position={[0, -0.007, 0]} rotation={[-Math.PI / 2, -Math.PI / 2, 0]} scale={[0.488, 0.068, 0.083]} />
            </group>
          </group>
          <mesh geometry={nodes.Cube002_Material015_0.geometry} material={materials.PaletteMaterial001} rotation={[-Math.PI / 2, -Math.PI / 2, 0]} scale={[0.488, 0.068, 0.083]} />
        </group>
      </group>
      <group position={[-1.405, 4.068, 1.446]} rotation={[-Math.PI, -0.422, Math.PI / 2]} scale={1.042}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0, 1.009, 0]} rotation={[-0.156, -0.017, 0.01]}>
            <group rotation={[Math.PI / 2, 0, 0]}>
              <mesh geometry={nodes.Cube005_Material016_0.geometry} material={materials.PaletteMaterial001} position={[0, -0.007, 0]} rotation={[-Math.PI / 2, -Math.PI / 2, 0]} scale={[0.488, 0.068, 0.083]} />
            </group>
          </group>
          <mesh geometry={nodes.Cube004_Material015_0.geometry} material={materials.PaletteMaterial001} rotation={[-Math.PI / 2, -Math.PI / 2, 0]} scale={[0.488, 0.068, 0.083]} />
        </group>
      </group>
      <mesh geometry={nodes.desk_Material002_0.geometry} material={materials.PaletteMaterial001} />
      <mesh geometry={nodes.desk_Material001_0.geometry} material={materials['Material.001']} />
      <mesh name="screen-main" geometry={nodes.Plane006_Material009_0.geometry} material={screenMat} position={[-0.804, 4.117, -0.062]} rotation={[0, 0, 0.01]} scale={0.837} />
      <mesh name="screen-side" geometry={nodes.Cylinder_screen002_0.geometry} material={materials['screen.002']} position={[0.323, 4.082, 3.564]} rotation={[-Math.PI / 2, -0.02, 0.509]} scale={1.48} />
      <group
        name="pc-case"
        position={[0, 3.622, -2.395]}
        onClick={cycleRgb}
        onPointerOver={(event) => hover(event, true)}
        onPointerOut={(event) => hover(event, false)}
      >
        <mesh geometry={nodes.Plane_Plane001_Material011_0.geometry} material={materials['Material.011']} />
        <mesh geometry={nodes.Plane_Plane001_Material018_0.geometry} material={mats.fans} />
        <mesh geometry={nodes.Plane_Plane001_Material019_0.geometry} material={materials['Material.019']} />
        <mesh geometry={nodes.Plane_Plane001_Material020_0.geometry} material={mats.front} />
      </group>
      <mesh geometry={nodes.pad_Material_0.geometry} material={materials.PaletteMaterial002} position={[0.457, 2.595, 0.065]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.727, 2.011, 1]} />
      <mesh
        geometry={nodes.Plane_Material003_0.geometry}
        material={mats.keys}
        position={[0.533, 2.592, 0.528]}
        rotation={[Math.PI, 1.509, -Math.PI]}
        scale={0.288}
        onClick={toggleLights}
        onPointerOver={(event) => hover(event, true)}
        onPointerOut={(event) => hover(event, false)}
      />
      <mesh geometry={nodes.Plane002_Material004_0.geometry} material={materials['Material.004']} position={[0.572, 2.595, -1.081]} rotation={[0, 1.507, 0]} scale={[0.241, 0.265, 0.241]} />
      <mesh geometry={nodes.Plane001_Material005_0.geometry} material={materials['Material.005']} position={[-0.879, 2.588, 1.671]} rotation={[0, 0.275, 0]} scale={0.292} />
      <mesh geometry={nodes.whole_boundary_Plane004_plastic_0.geometry} material={materials.plastic} position={[2.948, 0, -0.779]} rotation={[0, -0.666, 0]} scale={0.316} />
      <mesh geometry={nodes.whole_boundary_Plane004_chair_material_0.geometry} material={materials.chair_material} position={[2.948, 0, -0.779]} rotation={[0, -0.666, 0]} scale={0.316} />
      <pointLight ref={lightRef} position={[0.95, 3.75, -2.4]} distance={5.5} decay={2} />
    </group>
  )
}

useGLTF.preload(SETUP_URL, '/draco/')
