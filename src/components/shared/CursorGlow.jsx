import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * A soft, low-opacity radial glow that trails the cursor across the whole
 * page — the ambient "premium" cue Awwwards-style dark sites use instead
 * of (or alongside) a hard custom cursor. Deliberately subtle: it reads as
 * atmosphere, not a UI element, and never intercepts pointer events.
 */
export function CursorGlow() {
  const hasFinePointer = useMediaQuery('(pointer: fine)')
  const reducedMotion = useReducedMotion()
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const springX = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 })

  useEffect(() => {
    if (!hasFinePointer || reducedMotion) return
    const handleMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [hasFinePointer, reducedMotion, x, y])

  if (!hasFinePointer || reducedMotion) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-soft-light"
      style={{
        x: springX,
        y: springY,
        background: 'radial-gradient(circle, rgba(201,163,78,0.16), transparent 70%)',
      }}
      aria-hidden="true"
    />
  )
}
