import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Preloader: a blueprint corner-frame draws itself in around the mark
 * while a thin progress line fills, then the whole thing exits with a
 * clip-path wipe rather than a plain opacity fade — reads as far more
 * intentional than a spinner.
 */
export function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-structural-950"
          exit={{
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 0.7, ease: [0.7, 0, 0.84, 0] },
          }}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="relative flex h-16 w-16 items-center justify-center">
              <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full">
                <motion.rect
                  x="1.5" y="1.5" width="61" height="61" rx="10"
                  fill="none" stroke="#c9a34e" strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-display text-[10px] tracking-[0.25em] text-concrete-500"
              >
                AKA
              </motion.span>
            </div>

            <div className="h-px w-28 overflow-hidden bg-ink-50/10">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease: 'linear', delay: 0.1 }}
                className="h-full w-full origin-left bg-concrete-500"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
