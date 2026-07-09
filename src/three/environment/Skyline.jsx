import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * Cheap background silhouette layer: a row of simple box towers using
 * MeshBasicMaterial (never lit — keeps the GPU budget for the hero
 * building). Drifts slower than the main scene for a subtle parallax depth
 * cue, per the Phase 1 skyline spec.
 */
export function Skyline({ count = 14, radius = 26, color = '#0b2545' }) {
  const group = useRef()

  const towers = useMemo(() => {
    const items = []
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI - Math.PI / 2
      const height = 3 + Math.random() * 6
      const width = 0.8 + Math.random() * 0.6
      items.push({
        position: [Math.cos(angle) * radius, height / 2 - 3, -Math.sin(angle) * radius - 8],
        args: [width, height, width],
      })
    }
    return items
  }, [count, radius])

  useFrame(({ clock }) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.02) * 0.03
  })

  return (
    <group ref={group}>
      {towers.map((tower, i) => (
        <mesh key={i} position={tower.position}>
          <boxGeometry args={tower.args} />
          <meshBasicMaterial color={color} transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  )
}
