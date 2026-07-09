import { useRef } from 'react'
import { useInView as useFramerInView } from 'framer-motion'

/**
 * Thin wrapper around Framer Motion's useInView so the rest of the app has
 * one import path, and defaults tuned for scroll-reveal sections (fires
 * once, slightly before the element is fully on screen).
 */
export function useInView({ once = true, amount = 0.35 } = {}) {
  const ref = useRef(null)
  const inView = useFramerInView(ref, { once, amount })
  return [ref, inView]
}
