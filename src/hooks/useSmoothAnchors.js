import { useEffect } from 'react'
import { getSmoothScroll } from '../animations/lenis/smoothScroll'
import { NAV } from '../constants/animationConfig'

/**
 * Every in-page nav/footer link points at a `#section-id` anchor. Left to
 * the browser's default behavior those would jump instantly, ignoring the
 * Lenis smoothing the rest of the page uses — this normalizes them to a
 * single smooth-scroll code path, offset to clear the floating nav.
 */
export function useSmoothAnchors() {
  useEffect(() => {
    function handleClick(e) {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return

      const id = anchor.getAttribute('href')?.slice(1)
      if (!id) return
      const target = document.getElementById(id)
      if (!target) return

      e.preventDefault()
      const lenis = getSmoothScroll()
      if (lenis) {
        lenis.scrollTo(target, { offset: -NAV.heightIdle, duration: 1.4 })
      } else {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])
}
