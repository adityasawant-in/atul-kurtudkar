import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Thin fixed progress rail for the whole page (distinct from the
 * construction-scene's own local progress readout). Spring-smoothed so it
 * never feels like it's stepping.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-concrete-500/80"
    />
  )
}
