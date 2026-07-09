import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis = null
let rafId = null
let tickerCallback = null

/**
 * Creates (or returns) the single Lenis instance for the whole app.
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

  // Create ticker only once
  tickerCallback = (time) => {
    if (!lenis) return
    lenis.raf(time * 1000)
  }

  gsap.ticker.add(tickerCallback)
  gsap.ticker.lagSmoothing(0)

  if (typeof document !== 'undefined' && document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh())
  }

  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value, { immediate: true })
      }
      return lenis?.scroll || 0
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    },
  })

  return lenis
}

export function getSmoothScroll() {
  return lenis
}

export function destroySmoothScroll() {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback)
    tickerCallback = null
  }

  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
  }

  if (lenis) {
    lenis.off('scroll', ScrollTrigger.update)
    lenis.destroy()
    lenis = null
  }

  ScrollTrigger.clearScrollMemory()
}