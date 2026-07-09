import { useMemo } from 'react'

/**
 * Lightweight CSS-only floating dust particles for sections that don't run
 * an R3F canvas. Pure divs + a CSS keyframe — negligible GPU/CPU cost
 * compared to a Points-based Three.js field, which is reserved for the
 * hero and construction scenes.
 */
export function AmbientParticles({ count = 18, className }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 2,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 6,
      })),
    [count]
  )

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`} aria-hidden="true">
      {dots.map((dot, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-concrete-500"
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            opacity: 0.2,
            animation: `float-particle ${dot.duration}s ease-in-out ${dot.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
