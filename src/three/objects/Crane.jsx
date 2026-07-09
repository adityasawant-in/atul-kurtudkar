import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { mapRange } from '../../utils/clamp'

/**
 * Simple low-poly tower crane. Its height snaps to whichever floor segment
 * is currently under construction (progress 0.1–0.8), and it fades out once
 * the structure is topped out. Idle jib rotation is time-based (ambient
 * life), not scroll-bound.
 */
export function Crane({ progressRef, baseHeight = 9 }) {
  const group = useRef()
  const jib = useRef()

  useFrame(({ clock }) => {
    if (!group.current) return
    const p = progressRef.current

    const visible = p > 0.08 && p < 0.82
    const towerHeight = baseHeight + mapRange(p, 0.1, 0.8, 0, 5.5)
    const fadeIn = mapRange(p, 0.08, 0.14, 0, 1)
    const fadeOut = 1 - mapRange(p, 0.76, 0.82, 0, 1)
    const opacity = visible ? Math.min(fadeIn, fadeOut) : 0

    group.current.visible = opacity > 0.01
    group.current.position.y = 0
    group.current.scale.setScalar(1)
    group.current.children.forEach((child) => {
      if (child.material) child.material.opacity = opacity
    })

    if (jib.current) {
      jib.current.position.y = towerHeight
      jib.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.12) * 0.5
    }
  })

  return (
    <group ref={group} position={[-3.4, 0, 1.2]}>
      <mesh position={[0, baseHeight / 2, 0]}>
        <boxGeometry args={[0.15, baseHeight + 6, 0.15]} />
        <meshStandardMaterial color="#c9a34e" transparent opacity={0} />
      </mesh>
      <group ref={jib}>
        <mesh position={[1.6, 0, 0]}>
          <boxGeometry args={[3.6, 0.1, 0.1]} />
          <meshStandardMaterial color="#d9541f" transparent opacity={0} />
        </mesh>
        <mesh position={[-0.8, 0, 0]}>
          <boxGeometry args={[1.2, 0.1, 0.1]} />
          <meshStandardMaterial color="#d9541f" transparent opacity={0} />
        </mesh>
      </group>
    </group>
  )
}
