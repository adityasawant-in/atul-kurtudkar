import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const DAY = new THREE.Color('#fff4e0')
const DUSK = new THREE.Color('#d9541f')
const NIGHT = new THREE.Color('#0b2545')

/**
 * Three-point rig plus a fourth "bounce" fill light standing in for
 * HDRI-style ambient occlusion — cheaper than a real environment map (no
 * texture fetch/decode) while still giving the building's underside and
 * glass a soft secondary highlight instead of falling to pure black.
 *
 * `progressRef` is optional — when provided (construction scene) the key
 * light temperature interpolates day -> dusk -> night across it, and the
 * bounce light warms/cools to match. When omitted (plain hero background)
 * lighting stays static and cheap.
 */
export function Lights({ progressRef }) {
  const key = useRef()
  const rim = useRef()
  const bounce = useRef()
  const tmp = useRef(new THREE.Color())

  useFrame(() => {
    if (!progressRef || !key.current) return
    const p = progressRef.current

    let color
    if (p < 0.85) color = tmp.current.copy(DAY)
    else if (p < 0.95) color = tmp.current.lerpColors(DAY, DUSK, (p - 0.85) / 0.1)
    else color = tmp.current.lerpColors(DUSK, NIGHT, (p - 0.95) / 0.05)

    key.current.color.copy(color)
    key.current.intensity = p > 0.95 ? 0.6 : 1.4

    if (bounce.current) {
      bounce.current.intensity = p > 0.95 ? 0.12 : 0.28
    }
  })

  return (
    <>
      <directionalLight ref={key} position={[8, 12, 6]} intensity={1.4} color="#fff4e0" castShadow={false} />
      <hemisphereLight args={['#3a5b8a', '#0b2545', 0.5]} />
      <directionalLight ref={rim} position={[-10, 4, -8]} intensity={0.5} color="#4577c2" />
      {/* Soft ground-bounce fill — approximates the ambient occlusion an
          HDRI environment map would otherwise provide */}
      <directionalLight ref={bounce} position={[0, -6, 4]} intensity={0.28} color="#c9a34e" />
    </>
  )
}
