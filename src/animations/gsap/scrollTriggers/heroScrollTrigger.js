import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Non-pinned trigger: purely cosmetic exit for the hero copy/background as
 * the pinned building section takes over. Kept separate from the
 * construction timeline so its boundaries can be tuned independently.
 */
export function createHeroExitTrigger({ heroEl, contentEl }) {
  if (!heroEl || !contentEl) return null

  return ScrollTrigger.create({
    trigger: heroEl,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    animation: gsap.to(contentEl, {
      opacity: 0,
      y: -60,
      ease: 'none',
    }),
  })
}
