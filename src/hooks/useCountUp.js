import { useEffect, useRef, useState } from 'react'
import { animate } from 'framer-motion'

/**
 * Animates a number from 0 to `value` once the element scrolls into view.
 * Used by the Statistics section's "blueprint drawing" counters.
 */
export function useCountUp(value, { duration = 1.8, inView = false } = {}) {
  const [display, setDisplay] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!inView || hasRun.current) return
    hasRun.current = true

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })

    return () => controls.stop()
  }, [inView, value, duration])

  return display
}
