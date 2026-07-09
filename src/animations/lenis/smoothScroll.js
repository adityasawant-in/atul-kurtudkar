import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis = null
let rafId = null

/**
 * Creates (or returns) the single Lenis instance for the whole app.
 * ScrollTrigger is told to read scroll position from Lenis instead of the
 * native `window.scrollY`, and Lenis's `scroll` event drives
 * `ScrollTrigger.update()` — this is what keeps GSAP's scrubbed timelines
 * physically glued to the smoothed scroll rather than the raw wheel delta.
 */
export function createSmoothScroll({ reducedMotion = false } = {}) {
  if (lenis) return lenis

  lenis = new Lenis({
    duration: reducedMotion ? 0 : 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !reducedMotion,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
    infinite: false,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  // Web fonts swapping in after first paint change text metrics, which
  // shifts document height — without a refresh here, ScrollTrigger's pin
  // start/end offsets (computed pre-font-load) drift out of sync with the
  // actual layout, most noticeably on the pinned construction section.
  if (typeof document !== 'undefined' && document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh())
  }

  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value, { immediate: true })
      }
      return lenis.scroll
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
    },
  })

  return lenis
}

export function getSmoothScroll() {
  return lenis
}

export function destroySmoothScroll() {
  if (rafId) cancelAnimationFrame(rafId)
  lenis?.destroy()
  lenis = null
}
