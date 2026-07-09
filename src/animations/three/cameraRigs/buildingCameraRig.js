import * as THREE from 'three'
import { mapRange } from '../../../utils/clamp'

// Keyframed camera path: [progress, position, lookAt]. Interpolated linearly
// between neighboring keys, matched to the Phase 1 construction timeline
// (ground-level blueprint framing -> slow crane-up -> hero establishing shot
// -> gentle orbit on the finished, lit building).
const KEYFRAMES = [
  { t: 0, pos: [0, 1.2, 11], look: [0, 0, 0] },
  { t: 0.1, pos: [1.5, 1.6, 10], look: [0, -0.5, 0] },
  { t: 0.3, pos: [3, 3.2, 10.5], look: [0, 1, 0] },
  { t: 0.5, pos: [4.5, 5.5, 11.5], look: [0, 3, 0] },
  { t: 0.7, pos: [5.5, 8, 13], look: [0, 5.5, 0] },
  { t: 0.85, pos: [6.5, 10.5, 15], look: [0, 7, 0] },
  { t: 0.95, pos: [8, 11, 16.5], look: [0, 7.5, 0] },
  { t: 1.0, pos: [9.5, 11.5, 17.5], look: [0, 7.5, 0] },
]

const v1 = new THREE.Vector3()
const v2 = new THREE.Vector3()
const lookVec = new THREE.Vector3()
const currentPos = new THREE.Vector3()
const currentLook = new THREE.Vector3()
let initialized = false

function findSegment(t) {
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    if (t >= KEYFRAMES[i].t && t <= KEYFRAMES[i + 1].t) return i
  }
  return KEYFRAMES.length - 2
}

/**
 * Mutates `camera` in place toward the keyframed path for the given
 * progress. Rather than snapping straight to the keyframe-interpolated
 * target, the camera *trails* it with critically-damped exponential
 * smoothing — the same technique used for professional drone/gimbal
 * camera rigs, so even a fast scroll flick reads as a slow, deliberate
 * cinematic move rather than a jump cut.
 */
export function applyBuildingCameraRig(camera, progress, elapsed = 0, delta = 0.016) {
  const idx = findSegment(progress)
  const a = KEYFRAMES[idx]
  const b = KEYFRAMES[idx + 1]
  const localT = mapRange(progress, a.t, b.t, 0, 1)

  v1.set(...a.pos)
  v2.set(...b.pos)
  v1.lerp(v2, localT)

  // Subtle continuous drift so the shot never reads as perfectly static
  // between scroll events — kept gentle (drone-idle, not handheld).
  const wobble = Math.sin(elapsed * 0.12) * 0.08
  v1.x += wobble
  v1.z += Math.cos(elapsed * 0.08) * 0.06

  lookVec.set(
    a.look[0] + (b.look[0] - a.look[0]) * localT,
    a.look[1] + (b.look[1] - a.look[1]) * localT,
    a.look[2] + (b.look[2] - a.look[2]) * localT
  )

  if (!initialized) {
    currentPos.copy(v1)
    currentLook.copy(lookVec)
    initialized = true
  }

  // Damped follow: higher damping = heavier, more "professional gimbal"
  // feel. Frame-rate independent via the delta-based exponential factor.
  const damping = 3.2
  const followT = 1 - Math.exp(-damping * Math.min(delta, 0.05))
  currentPos.lerp(v1, followT)
  currentLook.lerp(lookVec, followT)

  camera.position.copy(currentPos)
  camera.lookAt(currentLook)
}
