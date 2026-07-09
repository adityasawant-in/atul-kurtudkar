import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getSmoothScroll } from '../animations/lenis/smoothScroll'

/**
 * On every route change, reset scroll to top — both the native window (for
 * the instant NotFound/first-paint case) and Lenis (so the virtual scroll
 * position used for its rAF loop doesn't carry over from the previous page).
 */
export function useRouteScrollReset() {
  const { pathname } = useLocation()

  useEffect(() => {
    const lenis = getSmoothScroll()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])
}
