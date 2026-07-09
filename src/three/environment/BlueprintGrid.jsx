import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * A soft, glowing wireframe grid on the ground plane. Used as-is in the hero
 * background, and reused (opacity-driven) as the "blueprint paper" stage of
 * the construction timeline.
 */
export function BlueprintGrid({
  size = 60,
  divisions = 40,
  color = '#2a5ba3',
  position = [0, -2.4, 0],
  opacity = 0.35,
  pulse = true,
}) {
  const grid = useMemo(() => {
    const g = new THREE.GridHelper(size, divisions, color, color)
    g.material.transparent = true
    g.material.opacity = opacity
    return g
  }, [size, divisions, color, opacity])

  useFrame(({ clock }) => {
    if (!pulse || !grid.material) return
    const t = clock.getElapsedTime()
    grid.material.opacity = opacity + Math.sin(t * 0.6) * 0.06
  })

  return <primitive object={grid} position={position} />
}
