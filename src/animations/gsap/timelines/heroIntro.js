import gsap from 'gsap'

/**
 * The hero's text reveal is owned by Framer Motion (see
 * animations/framer/variants) since it's pure React-state-driven UI. GSAP's
 * job here is limited to the canvas-level entrance: fading the 3D scene and
 * its readability scrim in from black so the very first frame doesn't pop.
 */
export function playHeroIntro({ canvasEl, scrimEl }) {
  if (!canvasEl) return null

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

  tl.fromTo(canvasEl, { opacity: 0 }, { opacity: 1, duration: 1.4 }, 0)

  if (scrimEl) {
    tl.fromTo(scrimEl, { opacity: 0 }, { opacity: 1, duration: 1.8 }, 0.1)
  }

  return tl
}
