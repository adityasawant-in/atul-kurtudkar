import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BUILDING_SCROLL_LENGTH, CONSTRUCTION_STAGES } from '../../../constants/animationConfig'

gsap.registerPlugin(ScrollTrigger)

const STAGE_ORDER = Object.keys(CONSTRUCTION_STAGES)

function resolveStage(progress) {
  for (const key of STAGE_ORDER) {
    const [start, end] = CONSTRUCTION_STAGES[key]
    if (progress >= start && progress < end) return key
  }
  return STAGE_ORDER[STAGE_ORDER.length - 1]
}

/**
 * Pins `sectionEl` for BUILDING_SCROLL_LENGTH px of scroll and scrubs a
 * single progress value (0-1) into `progressRef` every frame — this ref is
 * the one thing the R3F building, crane, camera rig and lighting rig all
 * read from, so scroll position and 3D state can never drift out of sync.
 *
 * `onStageChange` fires only when the active named stage changes (not every
 * frame), so the overlay copy can safely use React state without causing a
 * 60fps re-render loop.
 */
export function createBuildingTimeline({ sectionEl, progressRef, onStageChange, onProgress }) {
  if (!sectionEl) return null

  let lastStage = null

  const trigger = ScrollTrigger.create({
    trigger: sectionEl,
    start: 'top top',
    end: `+=${BUILDING_SCROLL_LENGTH}`,
    scrub: 1,
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      progressRef.current = self.progress
      onProgress?.(self.progress)

      const stage = resolveStage(self.progress)
      if (stage !== lastStage) {
        lastStage = stage
        onStageChange?.(stage)
      }
    },
  })

  return trigger
}
