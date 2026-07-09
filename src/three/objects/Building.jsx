import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { mapRange } from '../../utils/clamp'
import { CONSTRUCTION_STAGES } from '../../constants/animationConfig'

const FLOOR_COUNT = 8
const FLOOR_HEIGHT = 0.85
const BUILDING_WIDTH = 3.2
const BUILDING_DEPTH = 2.6

// Floors are built sequentially across the basement -> facade stages.
const FLOORS_START = CONSTRUCTION_STAGES.basement[0] // 0.3
const FLOORS_END = CONSTRUCTION_STAGES.facade[1] // 0.8

/**
 * The entire building lives at ~20–30% opacity per the brief so the section
 * copy stays readable in front of it. Every sub-element (pit, footings,
 * columns, floors, glass, windows) reads its slice of scroll progress from
 * `progressRef` inside a single `useFrame` loop — no per-element React
 * state, so this stays cheap even with many meshes.
 */
export function Building({ progressRef, maxOpacity = 0.28 }) {
  const excavationRef = useRef()
  const footingRef = useRef()
  const rebarRef = useRef()
  const floorRefs = useRef([])
  const glassRefs = useRef([])
  const windowLightRefs = useRef([])
  const roadRef = useRef()
  const treesRef = useRef()

  const floorSlots = useMemo(
    () =>
      Array.from({ length: FLOOR_COUNT }, (_, i) => {
        const segment = (FLOORS_END - FLOORS_START) / FLOOR_COUNT
        const start = FLOORS_START + i * segment
        const end = start + segment
        return { start, end, y: i * FLOOR_HEIGHT }
      }),
    []
  )

  useFrame(() => {
    const p = progressRef.current
    const globalFade = mapRange(p, 0, 0.04, 0, 1) * maxOpacity // fades the whole building in from blank blueprint

    // ---- Excavation pit (0.1 - 0.2): scales down into the ground ----
    if (excavationRef.current) {
      const ex = mapRange(p, ...CONSTRUCTION_STAGES.excavation)
      excavationRef.current.scale.y = 0.2 + ex * 0.8
      excavationRef.current.material.opacity = globalFade * (1 - mapRange(p, 0.2, 0.3, 0, 1))
      excavationRef.current.visible = p > 0.08 && p < 0.32
    }

    // ---- Foundation footings + rebar (0.2 - 0.3) ----
    if (footingRef.current) {
      const f = mapRange(p, ...CONSTRUCTION_STAGES.foundation)
      footingRef.current.scale.set(f, 1, f)
      footingRef.current.material.opacity = globalFade * mapRange(p, 0.18, 0.24, 0, 1)
    }
    if (rebarRef.current) {
      const f = mapRange(p, ...CONSTRUCTION_STAGES.foundation)
      rebarRef.current.material.opacity = globalFade * f * (1 - mapRange(p, 0.28, 0.34, 0, 1))
    }

    // ---- Floors rising sequentially (0.3 - 0.8) ----
    floorSlots.forEach((slot, i) => {
      const mesh = floorRefs.current[i]
      if (!mesh) return
      const local = mapRange(p, slot.start, slot.end, 0, 1)
      mesh.scale.y = Math.max(0.001, local)
      mesh.position.y = slot.y + (local * FLOOR_HEIGHT) / 2
      mesh.material.opacity = globalFade * local

      const glass = glassRefs.current[i]
      if (glass) {
        // glass installs slightly behind the shell, ramps in during the
        // second half of the building's overall run (per "60%: glass
        // begins installing")
        const glassLocal = mapRange(p, Math.max(slot.start, 0.6), Math.max(slot.end, 0.62), 0, 1)
        glass.material.opacity = globalFade * 0.6 * glassLocal
        glass.position.y = mesh.position.y
        glass.scale.y = mesh.scale.y
      }

      const light = windowLightRefs.current[i]
      if (light) {
        // interior lights switch on one-by-one during 0.9 - 0.95, then glow
        // through night mode
        const stagger = i / FLOOR_COUNT
        const litT = mapRange(p, 0.9 + stagger * 0.04, 0.94 + stagger * 0.04, 0, 1)
        light.intensity = litT * 1.4
        light.position.y = mesh.position.y
      }
    })

    // ---- Landscaping: roads + trees (0.8 - 0.9) ----
    if (roadRef.current) {
      roadRef.current.material.opacity = mapRange(p, ...CONSTRUCTION_STAGES.landscaping) * 0.5
    }
    if (treesRef.current) {
      const t = mapRange(p, 0.82, 0.9, 0, 1)
      treesRef.current.scale.setScalar(t)
      treesRef.current.children.forEach((c) => {
        if (c.material) c.material.opacity = globalFade * t * 3
      })
    }
  })

  return (
    <group position={[0, -2.2, 0]}>
      {/* Excavation pit */}
      <mesh ref={excavationRef} position={[0, -0.6, 0]}>
        <boxGeometry args={[BUILDING_WIDTH + 0.6, 1.2, BUILDING_DEPTH + 0.6]} />
        <meshStandardMaterial color="#1a1d21" transparent opacity={0} />
      </mesh>

      {/* Foundation footing slab */}
      <mesh ref={footingRef} position={[0, -0.05, 0]}>
        <boxGeometry args={[BUILDING_WIDTH + 0.4, 0.12, BUILDING_DEPTH + 0.4]} />
        <meshStandardMaterial color="#a7adb6" transparent opacity={0} />
      </mesh>

      {/* Rebar wireframe cage */}
      <mesh ref={rebarRef} position={[0, 0.3, 0]}>
        <boxGeometry args={[BUILDING_WIDTH, 0.6, BUILDING_DEPTH]} />
        <meshBasicMaterial color="#d9541f" wireframe transparent opacity={0} />
      </mesh>

      {/* Floors */}
      {floorSlots.map((slot, i) => (
        <group key={i}>
          <mesh
            ref={(el) => (floorRefs.current[i] = el)}
            position={[0, slot.y, 0]}
          >
            <boxGeometry args={[BUILDING_WIDTH, FLOOR_HEIGHT * 0.92, BUILDING_DEPTH]} />
            <meshStandardMaterial color="#123468" transparent opacity={0} roughness={0.6} metalness={0.1} />
          </mesh>
          <mesh ref={(el) => (glassRefs.current[i] = el)} position={[0, slot.y, 0]}>
            <boxGeometry args={[BUILDING_WIDTH + 0.04, FLOOR_HEIGHT * 0.92, BUILDING_DEPTH + 0.04]} />
            <meshPhysicalMaterial
              color="#4577c2"
              transparent
              opacity={0}
              roughness={0.1}
              metalness={0.3}
              transmission={0.4}
            />
          </mesh>
          <pointLight
            ref={(el) => (windowLightRefs.current[i] = el)}
            position={[BUILDING_WIDTH / 2 + 0.3, slot.y, BUILDING_DEPTH / 2 + 0.3]}
            color="#f7f1e2"
            intensity={0}
            distance={2.5}
          />
        </group>
      ))}

      {/* Roads */}
      <mesh ref={roadRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.98, 3.2]}>
        <planeGeometry args={[10, 2.4]} />
        <meshStandardMaterial color="#3a3f47" transparent opacity={0} />
      </mesh>

      {/* Trees (simple cone + trunk clusters) */}
      <group ref={treesRef} scale={0}>
        {[-2.6, -1.9, 2.4, 3.1].map((x, i) => (
          <group key={i} position={[x, -1.9, 2.4 + (i % 2) * 0.6]}>
            <mesh position={[0, 0.2, 0]}>
              <coneGeometry args={[0.22, 0.6, 6]} />
              <meshStandardMaterial color="#2a5ba3" transparent opacity={0} />
            </mesh>
            <mesh position={[0, -0.1, 0]}>
              <cylinderGeometry args={[0.04, 0.05, 0.2, 5]} />
              <meshStandardMaterial color="#6b7280" transparent opacity={0} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}
