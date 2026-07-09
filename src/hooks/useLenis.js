import { useEffect } from 'react'
import { createSmoothScroll, destroySmoothScroll } from '../animations/lenis/smoothScroll'
import { useReducedMotion } from './useReducedMotion'

export function useLenis() {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    createSmoothScroll({ reducedMotion })

    return () => {
      destroySmoothScroll()
    }
    // Intentionally only re-run if the reduced-motion preference flips,
    // otherwise we'd tear down scroll on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])
}
