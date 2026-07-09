import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { mapRange } from '../../utils/clamp'

/**
 * Tiny floating dust/particle field, GPU-cheap via a single Points object
 * rather than N meshes.
 */
export function FloatingParticles({ count = 220, spread = 24 }) {
  const pointsRef = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread
      arr[i * 3 + 1] = Math.random() * 10 - 2
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread - 4
    }
    return arr
  }, [count, spread])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const t = clock.getElapsedTime()
    pointsRef.current.rotation.y = t * 0.008
    pointsRef.current.position.y = Math.sin(t * 0.15) * 0.15
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#c9a34e"
        transparent
        opacity={0.5}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

/**
 * Dust particles that rise from ground level, visible only while the
 * excavation stage of the construction timeline is active (per the Phase 2
 * brief: "excavation begins... dust particles"). Reuses the same points
 * technique as FloatingParticles but reads its opacity from the shared
 * construction progress ref instead of always being visible.
 */
export function DustParticles({ progressRef, count = 90 }) {
  const pointsRef = useRef()
  const materialRef = useRef()

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 4.5
      pos[i * 3 + 1] = -2.2 + Math.random() * 1.2
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3.5
      spd[i] = 0.15 + Math.random() * 0.25
    }
    return { positions: pos, speeds: spd }
  }, [count])

  useFrame((_, delta) => {
    const p = progressRef.current
    const active = mapRange(p, 0.08, 0.14, 0, 1) * (1 - mapRange(p, 0.19, 0.24, 0, 1))

    if (materialRef.current) materialRef.current.opacity = active * 0.45
    if (!pointsRef.current) return

    pointsRef.current.visible = active > 0.02
    if (active <= 0.02) return

    const attr = pointsRef.current.geometry.attributes.position
    for (let i = 0; i < count; i++) {
      const idx = i * 3 + 1
      attr.array[idx] += speeds[i] * delta * 0.4
      if (attr.array[idx] > 0.5) attr.array[idx] = -2.2
    }
    attr.needsUpdate = true
  })

  return (
    <points ref={pointsRef} position={[0, 0, 1.5]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.05}
        color="#a7adb6"
        transparent
        opacity={0}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}
