import { useMediaQuery } from './useMediaQuery'

/**
 * Global reduced-motion flag. Every heavy animation module (GSAP timelines,
 * the R3F camera rig, Framer variants) checks this before running so we
 * never have to special-case accessibility deep inside a scene file.
 */
export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
