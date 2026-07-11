import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from 'gsap/Observer'
import { BUILDING_SCROLL_LENGTH, CONSTRUCTION_STAGES } from '../../../constants/animationConfig'
import { getSmoothScroll } from '../../lenis/smoothScroll'

gsap.registerPlugin(ScrollTrigger, Observer)

const STAGE_ORDER = Object.keys(CONSTRUCTION_STAGES)

function stageMidpoint(key) {
  const [start, end] = CONSTRUCTION_STAGES[key]
  return (start + end) / 2
}

/**
 * Pins `sectionEl` and steps through CONSTRUCTION_STAGES one at a time —
 * every wheel/touch gesture advances or retreats exactly one stage,
 * animated smoothly over ~0.85s, regardless of how hard or light the
 * gesture was. This replaces the old continuous scrub (raw scroll distance
 * mapped 1:1 to progress), which let a single fast — or even just a
 * slightly-too-eager — scroll blow straight through two or three stages
 * at once.
 *
 * How it works:
 *  - GSAP's Observer plugin (not native scroll) reads wheel/touch intent
 *    while the section is pinned, with `preventDefault: true` so the
 *    browser's own scroll never advances during that time.
 *  - Each gesture calls `step(±1)`, which tweens `progressRef.current`
 *    from wherever it is to the midpoint of the next/previous stage.
 *  - While that tween is running, further gestures are ignored outright
 *    (not queued) — so a fast flick still only ever moves one stage.
 *  - At the first/last stage, the *next* gesture in that direction
 *    releases the pin by smoothly scrolling just past its start/end
 *    boundary, handing control back to normal (Lenis) scrolling.
 *  - Lenis itself is paused for the duration the pin is engaged, so its
 *    own wheel handling never fights with the Observer's.
 *
 * `onStageChange` fires whenever the active named stage changes.
 * `onProgress` / `onRawProgress` fire on every tween tick — the latter is
 * meant for direct DOM/style writes (no setState), matching the contract
 * every visual layer already relies on.
 */
export function createBuildingTimeline({
  sectionEl,
  progressRef,
  onStageChange,
  onProgress,
  onRawProgress,
  reducedMotion = false,
}) {
  if (!sectionEl) return null

  let currentIndex = 0
  let animating = false
  let lastStage = null
  let observer = null
  let lastStepAt = 0
  // Hard floor between accepted steps, independent of the tween's own
  // `animating` flag — a second, unconditional guard so that even if a
  // burst of touch events on mobile ever slipped past the first one
  // (some devices report touchmove in bursts faster than a single
  // synchronous JS tick), nothing can advance more than one stage before
  // this window has fully elapsed.
  const MIN_STEP_INTERVAL_MS = 700

  const lenis = () => getSmoothScroll()

  const emit = (p) => {
    progressRef.current = p
    onProgress?.(p)
    onRawProgress?.(p)
    const key = STAGE_ORDER[currentIndex]
    if (key !== lastStage) {
      lastStage = key
      onStageChange?.(key)
    }
  }

  const pinTrigger = ScrollTrigger.create({
    trigger: sectionEl,
    start: 'top top',
    end: `+=${BUILDING_SCROLL_LENGTH}`,
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    onEnter: () => {
      currentIndex = 0
      emit(stageMidpoint(STAGE_ORDER[0]))
      lenis()?.stop()
      observer?.enable()
    },
    onEnterBack: () => {
      currentIndex = STAGE_ORDER.length - 1
      emit(stageMidpoint(STAGE_ORDER[currentIndex]))
      lenis()?.stop()
      observer?.enable()
    },
    onLeave: () => {
      observer?.disable()
      lenis()?.start()
    },
    onLeaveBack: () => {
      observer?.disable()
      lenis()?.start()
    },
  })

  const releaseUp = () => {
    observer?.disable()
    lenis()?.start()
    const target = pinTrigger.start - 20
    const l = lenis()
    if (l) l.scrollTo(target, { duration: 0.8 })
    else window.scrollTo({ top: target, behavior: 'smooth' })
  }

  const releaseDown = () => {
    observer?.disable()
    lenis()?.start()
    const target = pinTrigger.end + 20
    const l = lenis()
    if (l) l.scrollTo(target, { duration: 0.8 })
    else window.scrollTo({ top: target, behavior: 'smooth' })
  }

  const step = (direction) => {
    const now = performance.now()
    if (animating || now - lastStepAt < MIN_STEP_INTERVAL_MS) return
    lastStepAt = now

    const nextIndex = currentIndex + direction

    if (nextIndex < 0) {
      releaseUp()
      return
    }
    if (nextIndex >= STAGE_ORDER.length) {
      releaseDown()
      return
    }

    animating = true
    currentIndex = nextIndex
    const proxy = { p: progressRef.current }
    gsap.to(proxy, {
      p: stageMidpoint(STAGE_ORDER[currentIndex]),
      duration: reducedMotion ? 0.15 : 0.85,
      ease: 'power2.out',
      onUpdate: () => emit(proxy.p),
      onComplete: () => {
        animating = false
      },
    })
  }

  observer = Observer.create({
    target: window,
    type: 'wheel,touch',
    wheelSpeed: 1,
    tolerance: 24,
    preventDefault: true,
    onUp: () => step(-1),
    onDown: () => step(1),
  })
  observer.disable()

  // Seed the initial stage/progress so the overlay isn't blank before the
  // user has scrolled into the pin for the first time.
  emit(stageMidpoint(STAGE_ORDER[0]))

  return {
    kill: () => {
      observer?.kill()
      pinTrigger.kill()
      lenis()?.start()
    },
  }
}
