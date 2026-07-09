import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * Soft drifting cloud sprites made from low-segment spheres with very low
 * opacity. Deliberately not textured — keeps the hero scene lightweight.
 */
export function Clouds({ count = 6 }) {
  const refs = useRef([])

  const clouds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        position: [(Math.random() - 0.5) * 40, 8 + Math.random() * 6, -10 - Math.random() * 20],
        scale: 3 + Math.random() * 4,
        speed: 0.15 + Math.random() * 0.15,
        opacity: 0.06 + Math.random() * 0.05,
      })),
    [count]
  )

  useFrame((_, delta) => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return
      mesh.position.x += clouds[i].speed * delta
      if (mesh.position.x > 22) mesh.position.x = -22
    })
  })

  return (
    <group>
      {clouds.map((cloud, i) => (
        <mesh key={i} ref={(el) => (refs.current[i] = el)} position={cloud.position} scale={cloud.scale}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#e7e9ec" transparent opacity={cloud.opacity} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}
