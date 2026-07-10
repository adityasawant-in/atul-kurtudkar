
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { mapRange } from '../../utils/clamp'
import { CONSTRUCTION_STAGES } from '../../constants/animationConfig'

// ------------------------------------------------------------------
// Same rendering mechanism as before: every element stays MOUNTED the
// whole time and fades in via material.opacity (transparent: true)
// driven by globalFade, combined with real scale/position movement
// per element. Same GROUP_Y (-2.2). Same CONSTRUCTION_STAGES table
// drives every stage transition — no new stage keys introduced, only
// more elements reusing the existing foundation / basement /
// groundFloor / secondFloor / facade / liveIn / sunset stages.
// Geometry has been reworked into a tall commercial office tower:
// central tower + symmetrical wings, curtain-wall glass, aluminium
// fins, floor bands, entrance plaza / lobby, and a roof crown with
// mechanical penthouse + helipad marker.
// ------------------------------------------------------------------

const BUILDING_WIDTH = 4.2
const BUILDING_DEPTH = 3.0
const WING_WIDTH = 2.0
const WING_DEPTH = 2.3

const FLOOR_COUNT = 8        // tall commercial tower
const FLOOR_HEIGHT = 0.78
const WING_FLOOR_COUNT = 5
const WING_FLOOR_HEIGHT = 0.78

const COLUMN_COUNT = 8
const FIN_COUNT = 12
const WINDOW_COLS = 6

const MATERIALS = {
  concrete: { color: '#c3c7cd', roughness: 0.8, metalness: 0.08 },
  concreteDark: { color: '#7d828b', roughness: 0.88, metalness: 0.08 },
  core: { color: '#5b5f68', roughness: 0.75, metalness: 0.1 },
  steel: { color: '#2c2f36', roughness: 0.3, metalness: 0.9 },
  aluminium: { color: '#454a52', roughness: 0.25, metalness: 0.95 },
  glass: { color: '#3f6f9e', roughness: 0.05, metalness: 0.4, transmission: 0.35, envMapIntensity: 1.4 },
  glassDeep: { color: '#2c5478', roughness: 0.04, metalness: 0.45, transmission: 0.3, envMapIntensity: 1.6 },
  roof: { color: '#23262b', roughness: 0.5, metalness: 0.35 },
  paving: { color: '#a9a4a0', roughness: 0.9, metalness: 0.02 },
}

export function Building({ progressRef, maxOpacity = 0.55 }) {
  const foundationRef = useRef()
  const basementRef = useRef()
  const plazaRef = useRef()
  const stepsRef = useRef()

  const columnRefs = useRef([])
  const finRefs = useRef([])
  const beamRefs = useRef([])

  const floorRefs = useRef([])
  const wallRefs = useRef([])
  const glassRefs = useRef([])
  const cornerGlassRefs = useRef([])
  const windowLightRefs = useRef([])

  const wingWallRefs = useRef([])
  const wingGlassRefs = useRef([])
  const wingRoofRefs = useRef([])

  const canopyRef = useRef()
  const lobbyGlassRef = useRef()
  const lobbyColumnRefs = useRef([])

  const roofRef = useRef()
  const parapetRef = useRef()
  const penthouseRef = useRef()
  const roofGlassRef = useRef()
  const helipadRef = useRef()
  const roofLightRefs = useRef([])

  const floorSlots = useMemo(() => {
    const [start, end] = [CONSTRUCTION_STAGES.groundFloor[0], CONSTRUCTION_STAGES.secondFloor[1]]
    const segment = (end - start) / FLOOR_COUNT
    return Array.from({ length: FLOOR_COUNT }, (_, i) => ({
      start: start + i * segment,
      end: start + (i + 1) * segment,
      y: i * FLOOR_HEIGHT,
    }))
  }, [])

  const columnPositions = useMemo(() => {
    const positions = []
    const half = BUILDING_WIDTH / 2 - 0.2
    for (let i = 0; i < COLUMN_COUNT; i++) {
      const x = -half + (i / (COLUMN_COUNT - 1)) * half * 2
      positions.push([x, BUILDING_DEPTH / 2 + 0.35])
    }
    return positions
  }, [])

  const finPositions = useMemo(() => {
    const positions = []
    const half = BUILDING_WIDTH / 2 - 0.15
    for (let i = 0; i < FIN_COUNT; i++) {
      const x = -half + (i / (FIN_COUNT - 1)) * half * 2
      positions.push(x)
    }
    return positions
  }, [])

  const windowGrid = useMemo(() => {
    const cells = []
    for (let f = 0; f < FLOOR_COUNT; f++) {
      for (let c = 0; c < WINDOW_COLS; c++) {
        const x = -BUILDING_WIDTH / 2 + 0.4 + (c / (WINDOW_COLS - 1)) * (BUILDING_WIDTH - 0.8)
        cells.push({ x, floor: f })
      }
    }
    return cells
  }, [])

  const columnFullHeight = FLOOR_COUNT * FLOOR_HEIGHT + 0.8
  const roofY = FLOOR_COUNT * FLOOR_HEIGHT + 0.5
  const wingFullHeight = WING_FLOOR_COUNT * WING_FLOOR_HEIGHT
  const wingRoofY = wingFullHeight + 0.3

  useFrame(() => {
    const p = progressRef.current
    const globalFade = mapRange(p, 0, 0.05, 0, 1) * maxOpacity

    // --- Foundation / plaza / basement -----------------------------
    if (foundationRef.current) {
      const f = mapRange(p, ...CONSTRUCTION_STAGES.foundation)
      foundationRef.current.scale.y = 0.15 + f * 0.85
      foundationRef.current.material.opacity = globalFade * mapRange(p, 0.18, 0.24, 0, 1)
    }
    if (plazaRef.current) {
      const f = mapRange(p, ...CONSTRUCTION_STAGES.foundation)
      plazaRef.current.material.opacity = globalFade * f
    }

    if (basementRef.current) {
      const b = mapRange(p, ...CONSTRUCTION_STAGES.basement)
      basementRef.current.scale.set(0.2 + b * 0.8, 1, 0.2 + b * 0.8)
      basementRef.current.material.opacity = globalFade * b
    }
    if (stepsRef.current) {
      const b = mapRange(p, ...CONSTRUCTION_STAGES.basement)
      stepsRef.current.scale.y = 0.2 + b * 0.8
      stepsRef.current.material.opacity = globalFade * b
    }

    // --- Structural columns + aluminium fins ------------------------
    columnRefs.current.forEach((col) => {
      if (!col) return
      const c = mapRange(p, ...CONSTRUCTION_STAGES.basement)
      col.scale.y = Math.max(0.001, c)
      col.position.y = (columnFullHeight * c) / 2
      col.material.opacity = globalFade * mapRange(p, 0.32, 0.38, 0, 1)
    })

    lobbyColumnRefs.current.forEach((col) => {
      if (!col) return
      const c = mapRange(p, ...CONSTRUCTION_STAGES.basement)
      const h = FLOOR_HEIGHT * 2.1
      col.scale.y = Math.max(0.001, c)
      col.position.y = (h * c) / 2
      col.material.opacity = globalFade * mapRange(p, 0.3, 0.36, 0, 1)
    })

    finRefs.current.forEach((fin) => {
      if (!fin) return
      const f = mapRange(p, ...CONSTRUCTION_STAGES.facade)
      fin.scale.y = Math.max(0.001, f)
      fin.position.y = (columnFullHeight * f) / 2
      fin.material.opacity = globalFade * f * 0.9
    })

    beamRefs.current.forEach((beam) => {
      if (!beam) return
      const b = mapRange(p, CONSTRUCTION_STAGES.groundFloor[0], CONSTRUCTION_STAGES.groundFloor[0] + 0.06, 0, 1)
      beam.scale.x = Math.max(0.001, b)
      beam.position.x = (-BUILDING_WIDTH / 2) * (1 - b)
      beam.material.opacity = globalFade * b
    })

    // --- Entrance canopy + lobby glass -------------------------------
    if (canopyRef.current) {
      const t = mapRange(p, ...CONSTRUCTION_STAGES.facade)
      canopyRef.current.position.y = 1.6 - (1 - t) * 0.5
      canopyRef.current.material.opacity = globalFade * t
    }
    if (lobbyGlassRef.current) {
      const g = mapRange(p, CONSTRUCTION_STAGES.groundFloor[0], CONSTRUCTION_STAGES.facade[1], 0, 1)
      lobbyGlassRef.current.material.opacity = globalFade * 0.7 * g
      lobbyGlassRef.current.position.z = BUILDING_DEPTH / 2 + 0.03 - (1 - g) * 0.4
    }

    // --- Floors: slab / spandrel wall / glass / corner glass / lights
    floorSlots.forEach((slot, i) => {
      const floor = floorRefs.current[i]
      if (floor) {
        const local = mapRange(p, slot.start, slot.end, 0, 1)
        floor.scale.y = Math.max(0.001, local)
        floor.position.y = slot.y + (local * FLOOR_HEIGHT * 0.12) / 2
        floor.material.opacity = globalFade * local
      }

      const wall = wallRefs.current[i]
      if (wall) {
        const w = mapRange(p, ...CONSTRUCTION_STAGES.facade)
        wall.scale.y = Math.max(0.001, w)
        wall.material.opacity = globalFade * w * 0.95
      }

      const glass = glassRefs.current[i]
      if (glass) {
        const g = mapRange(p, CONSTRUCTION_STAGES.secondFloor[0], CONSTRUCTION_STAGES.facade[1], 0, 1)
        glass.material.opacity = globalFade * 0.7 * g
        glass.position.z = BUILDING_DEPTH / 2 + 0.02 - (1 - g) * 0.5
      }

      const corner = cornerGlassRefs.current[i]
      if (corner) {
        const g = mapRange(p, CONSTRUCTION_STAGES.secondFloor[0], CONSTRUCTION_STAGES.facade[1], 0, 1)
        corner.material.opacity = globalFade * 0.65 * g
      }

      const light = windowLightRefs.current[i]
      if (light) {
        const stagger = i / FLOOR_COUNT
        const litT = mapRange(p, CONSTRUCTION_STAGES.liveIn[0] + stagger * 0.02, CONSTRUCTION_STAGES.liveIn[1] + stagger * 0.02, 0, 1)
        light.intensity = litT * 1.4
      }
    })

    // --- Wings: floors / glass strips / roof -------------------------
    wingWallRefs.current.forEach((wall) => {
      if (!wall) return
      const w = mapRange(p, ...CONSTRUCTION_STAGES.facade)
      wall.scale.y = Math.max(0.001, w)
      wall.material.opacity = globalFade * w * 0.95
    })
    wingGlassRefs.current.forEach((glass) => {
      if (!glass) return
      const g = mapRange(p, CONSTRUCTION_STAGES.secondFloor[0], CONSTRUCTION_STAGES.facade[1], 0, 1)
      glass.material.opacity = globalFade * 0.65 * g
    })
    wingRoofRefs.current.forEach((wr) => {
      if (!wr) return
      const r = mapRange(p, ...CONSTRUCTION_STAGES.liveIn)
      wr.position.y = wingRoofY + (1 - r) * 1.4
      wr.material.opacity = globalFade * r
    })

    // --- Roof crown: parapet / penthouse / skylight / helipad --------
    if (roofRef.current) {
      const r = mapRange(p, ...CONSTRUCTION_STAGES.liveIn)
      roofRef.current.position.y = roofY + (1 - r) * 1.6
      roofRef.current.material.opacity = globalFade * r
    }
    if (parapetRef.current) {
      const r = mapRange(p, ...CONSTRUCTION_STAGES.liveIn)
      parapetRef.current.position.y = roofY + 0.15 + (1 - r) * 1.6
      parapetRef.current.material.opacity = globalFade * r
    }
    if (penthouseRef.current) {
      const r = mapRange(p, ...CONSTRUCTION_STAGES.liveIn)
      penthouseRef.current.position.y = roofY + 0.55 + (1 - r) * 1.6
      penthouseRef.current.material.opacity = globalFade * r * 0.95
    }
    if (roofGlassRef.current) {
      const r = mapRange(p, ...CONSTRUCTION_STAGES.liveIn)
      roofGlassRef.current.position.y = roofY + 0.95 + (1 - r) * 1.6
      roofGlassRef.current.material.opacity = globalFade * 0.6 * r
    }
    if (helipadRef.current) {
      const d = mapRange(p, ...CONSTRUCTION_STAGES.sunset)
      helipadRef.current.scale.setScalar(Math.max(0.001, d))
      helipadRef.current.material.opacity = globalFade * d * 0.9
    }
    roofLightRefs.current.forEach((light, i) => {
      if (!light) return
      const stagger = i / 4
      const litT = mapRange(p, CONSTRUCTION_STAGES.liveIn[0] + stagger * 0.02, CONSTRUCTION_STAGES.liveIn[1] + stagger * 0.02, 0, 1)
      light.intensity = litT * 1.1
    })
  })

  return (
    <group position={[0, -2.2, 0]}>
      {/* Foundation */}
      <mesh ref={foundationRef} position={[0, -0.05, 0]}>
        <boxGeometry args={[BUILDING_WIDTH + WING_WIDTH * 2 + 0.8, 0.14, BUILDING_DEPTH + 0.8]} />
        <meshStandardMaterial {...MATERIALS.concreteDark} transparent opacity={0} />
      </mesh>

      {/* Entrance plaza paving */}
      <mesh ref={plazaRef} position={[0, 0.01, BUILDING_DEPTH / 2 + 1.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[BUILDING_WIDTH + WING_WIDTH * 2, 2.2]} />
        <meshStandardMaterial {...MATERIALS.paving} transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      <mesh ref={basementRef} position={[0, 0.12, 0]}>
        <boxGeometry args={[BUILDING_WIDTH + WING_WIDTH * 2 + 0.3, 0.24, BUILDING_DEPTH + 0.3]} />
        <meshStandardMaterial {...MATERIALS.concrete} transparent opacity={0} />
      </mesh>

      {/* Wide entrance stairs */}
      <mesh ref={stepsRef} position={[0, 0.22, BUILDING_DEPTH / 2 + 0.75]}>
        <boxGeometry args={[3.0, 0.2, 1.3]} />
        <meshStandardMaterial {...MATERIALS.concrete} transparent opacity={0} />
      </mesh>

      {/* Facade structural columns */}
      {columnPositions.map(([x, z], i) => (
        <mesh
          key={`col-${i}`}
          ref={(el) => { columnRefs.current[i] = el }}
          position={[x, 0, z]}
          scale={[1, 0.001, 1]}
        >
          <cylinderGeometry args={[0.1, 0.11, columnFullHeight, 10]} />
          <meshStandardMaterial {...MATERIALS.core} transparent opacity={0} />
        </mesh>
      ))}

      {/* Vertical aluminium fins across the curtain wall */}
      {finPositions.map((x, i) => (
        <mesh
          key={`fin-${i}`}
          ref={(el) => { finRefs.current[i] = el }}
          position={[x, 0, BUILDING_DEPTH / 2 + 0.06]}
          scale={[1, 0.001, 1]}
        >
          <boxGeometry args={[0.06, columnFullHeight, 0.14]} />
          <meshStandardMaterial {...MATERIALS.aluminium} transparent opacity={0} />
        </mesh>
      ))}

      {/* Podium beams */}
      {Array.from({ length: 3 }, (_, i) => (
        <mesh
          key={`beam-${i}`}
          ref={(el) => { beamRefs.current[i] = el }}
          position={[0, 0.8 + i * 1.1, BUILDING_DEPTH / 2 + 0.4]}
          scale={[0.001, 1, 1]}
        >
          <boxGeometry args={[BUILDING_WIDTH - 0.3, 0.12, 0.16]} />
          <meshStandardMaterial {...MATERIALS.steel} transparent opacity={0} />
        </mesh>
      ))}

      {/* Double-height lobby columns + glass */}
      {[-1.4, -0.7, 0.7, 1.4].map((x, i) => (
        <mesh
          key={`lobby-col-${i}`}
          ref={(el) => { lobbyColumnRefs.current[i] = el }}
          position={[x, 0, BUILDING_DEPTH / 2 + 0.3]}
          scale={[1, 0.001, 1]}
        >
          <cylinderGeometry args={[0.08, 0.08, FLOOR_HEIGHT * 2.1, 10]} />
          <meshStandardMaterial {...MATERIALS.aluminium} transparent opacity={0} />
        </mesh>
      ))}
      <mesh ref={lobbyGlassRef} position={[0, FLOOR_HEIGHT * 1.05, BUILDING_DEPTH / 2 + 0.03]}>
        <planeGeometry args={[BUILDING_WIDTH - 0.6, FLOOR_HEIGHT * 1.9]} />
        <meshPhysicalMaterial {...MATERIALS.glassDeep} transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      {/* Reception canopy */}
      <mesh ref={canopyRef} position={[0, 1.6, BUILDING_DEPTH / 2 + 0.55]}>
        <boxGeometry args={[3.0, 0.08, 1.2]} />
        <meshStandardMaterial {...MATERIALS.roof} transparent opacity={0} />
      </mesh>

      {/* Floors */}
      {floorSlots.map((slot, i) => (
        <group key={`floor-${i}`}>
          <mesh ref={(el) => { floorRefs.current[i] = el }} position={[0, slot.y, 0]}>
            <boxGeometry args={[BUILDING_WIDTH, FLOOR_HEIGHT * 0.14, BUILDING_DEPTH]} />
            <meshStandardMaterial {...MATERIALS.concrete} transparent opacity={0} />
          </mesh>

          <mesh
            ref={(el) => { wallRefs.current[i] = el }}
            position={[0, slot.y + FLOOR_HEIGHT / 2, 0]}
            scale={[1, 0.001, 1]}
          >
            <boxGeometry args={[BUILDING_WIDTH, FLOOR_HEIGHT * 0.3, BUILDING_DEPTH]} />
            <meshStandardMaterial {...MATERIALS.concreteDark} transparent opacity={0} />
          </mesh>

          <mesh
            ref={(el) => { glassRefs.current[i] = el }}
            position={[0, slot.y + FLOOR_HEIGHT / 2, BUILDING_DEPTH / 2 + 0.02]}
          >
            <planeGeometry args={[BUILDING_WIDTH - 0.35, FLOOR_HEIGHT * 0.78]} />
            <meshPhysicalMaterial {...MATERIALS.glass} transparent opacity={0} side={THREE.DoubleSide} />
          </mesh>

          {/* Corner glass wrap for both side edges of the tower */}
          {[-1, 1].map((side) => (
            <mesh
              key={`corner-${i}-${side}`}
              ref={(el) => { cornerGlassRefs.current[i * 2 + (side === -1 ? 0 : 1)] = el }}
              position={[side * (BUILDING_WIDTH / 2 + 0.01), slot.y + FLOOR_HEIGHT / 2, BUILDING_DEPTH / 2 - 0.35]}
              rotation={[0, Math.PI / 2, 0]}
            >
              <planeGeometry args={[0.7, FLOOR_HEIGHT * 0.78]} />
              <meshPhysicalMaterial {...MATERIALS.glassDeep} transparent opacity={0} side={THREE.DoubleSide} />
            </mesh>
          ))}

          {windowGrid
            .filter((w) => w.floor === i)
            .map((w, wi) => (
              <pointLight
                key={`light-${i}-${wi}`}
                ref={(el) => { windowLightRefs.current[i] = el }}
                position={[w.x, slot.y + FLOOR_HEIGHT / 2, BUILDING_DEPTH / 2 + 0.4]}
                color="#f7f1e2"
                intensity={0}
                distance={1.6}
              />
            ))}
        </group>
      ))}

      {/* Roof: parapet / mechanical penthouse / skylight / helipad */}
      <mesh ref={roofRef} position={[0, roofY, 0]}>
        <boxGeometry args={[BUILDING_WIDTH + 0.3, 0.16, BUILDING_DEPTH + 0.3]} />
        <meshStandardMaterial {...MATERIALS.roof} transparent opacity={0} />
      </mesh>

      <mesh ref={parapetRef} position={[0, roofY + 0.15, 0]}>
        <boxGeometry args={[BUILDING_WIDTH + 0.1, 0.22, BUILDING_DEPTH + 0.1]} />
        <meshStandardMaterial {...MATERIALS.aluminium} transparent opacity={0} wireframe={false} />
      </mesh>

      <mesh ref={penthouseRef} position={[0, roofY + 0.55, 0]}>
        <boxGeometry args={[BUILDING_WIDTH * 0.55, 0.6, BUILDING_DEPTH * 0.55]} />
        <meshStandardMaterial {...MATERIALS.concreteDark} transparent opacity={0} />
      </mesh>

      <mesh ref={roofGlassRef} position={[0, roofY + 0.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[BUILDING_WIDTH * 0.4, BUILDING_DEPTH * 0.4]} />
        <meshPhysicalMaterial {...MATERIALS.glass} transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      <mesh ref={helipadRef} position={[0, roofY + 0.19, BUILDING_DEPTH * 0.18]} rotation={[-Math.PI / 2, 0, 0]} scale={0.001}>
        <ringGeometry args={[0.4, 0.48, 32]} />
        <meshStandardMaterial color="#e8e4da" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      {[
        [BUILDING_WIDTH / 2 - 0.2, roofY + 0.2, BUILDING_DEPTH / 2 - 0.2],
        [-(BUILDING_WIDTH / 2 - 0.2), roofY + 0.2, BUILDING_DEPTH / 2 - 0.2],
        [BUILDING_WIDTH / 2 - 0.2, roofY + 0.2, -(BUILDING_DEPTH / 2 - 0.2)],
        [-(BUILDING_WIDTH / 2 - 0.2), roofY + 0.2, -(BUILDING_DEPTH / 2 - 0.2)],
      ].map((pos, i) => (
        <pointLight
          key={`roof-light-${i}`}
          ref={(el) => { roofLightRefs.current[i] = el }}
          position={pos}
          color="#ffe9c7"
          intensity={0}
          distance={1.4}
        />
      ))}

      {/* Symmetrical side wings */}
      {[-1, 1].map((side, sideIdx) => {
        const wingX = side * (BUILDING_WIDTH / 2 + WING_WIDTH / 2 + 0.25)
        return (
          <group key={`wing-${side}`}>
            {Array.from({ length: WING_FLOOR_COUNT }, (_, i) => (
              <group key={`wing-floor-${side}-${i}`}>
                <mesh
                  ref={(el) => { wingWallRefs.current[sideIdx * WING_FLOOR_COUNT + i] = el }}
                  position={[wingX, i * WING_FLOOR_HEIGHT + WING_FLOOR_HEIGHT / 2, 0]}
                  scale={[1, 0.001, 1]}
                >
                  <boxGeometry args={[WING_WIDTH, WING_FLOOR_HEIGHT * 0.85, WING_DEPTH]} />
                  <meshStandardMaterial {...MATERIALS.concreteDark} transparent opacity={0} />
                </mesh>
                <mesh
                  ref={(el) => { wingGlassRefs.current[sideIdx * WING_FLOOR_COUNT + i] = el }}
                  position={[wingX, i * WING_FLOOR_HEIGHT + WING_FLOOR_HEIGHT / 2, WING_DEPTH / 2 + 0.02]}
                >
                  <planeGeometry args={[WING_WIDTH - 0.3, WING_FLOOR_HEIGHT * 0.65]} />
                  <meshPhysicalMaterial {...MATERIALS.glass} transparent opacity={0} side={THREE.DoubleSide} />
                </mesh>
              </group>
            ))}
            <mesh
              ref={(el) => { wingRoofRefs.current[sideIdx] = el }}
              position={[wingX, wingRoofY, 0]}
            >
              <boxGeometry args={[WING_WIDTH + 0.18, 0.15, WING_DEPTH + 0.18]} />
              <meshStandardMaterial {...MATERIALS.roof} transparent opacity={0} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}