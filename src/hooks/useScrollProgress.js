import { useRef } from 'react'

/**
 * Returns a mutable ref object `{ current: number }` holding scroll progress
 * (0–1) for a pinned ScrollTrigger section. We deliberately do NOT use
 * React state here — the building-construction scene reads this value every
 * animation frame inside `useFrame`, and funneling that through `setState`
 * would re-render the whole React tree 60 times a second for no reason.
 * GSAP's ScrollTrigger `onUpdate` callback is the only writer.
 */
export function useScrollProgress(initial = 0) {
  const progressRef = useRef(initial)
  return progressRef
}
