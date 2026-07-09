import { useRef } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Mouse-tilt effect for glass panels (Services section). Returns motion
 * values for rotateX/rotateY plus the raw handlers to spread onto the
 * panel — kept generic so any card can opt in.
 */
export function useTilt({ max = 10, scale = 1.02 } = {}) {
  const ref = useRef(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(y, [0, 1], [max, -max]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [0, 1], [-max, max]), { stiffness: 200, damping: 20 })
  const glowX = useTransform(x, [0, 1], ['0%', '100%'])
  const glowY = useTransform(y, [0, 1], ['0%', '100%'])

  function handleMouseMove(e) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  function handleMouseLeave() {
    x.set(0.5)
    y.set(0.5)
  }

  return {
    ref,
    style: { rotateX, rotateY, scale: 1 },
    hoverScale: scale,
    glowX,
    glowY,
    handlers: { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave },
  }
}
