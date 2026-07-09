import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useLenis } from '../hooks/useLenis'
import { useSmoothAnchors } from '../hooks/useSmoothAnchors'
import { useRouteScrollReset } from '../hooks/useRouteScrollReset'

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
}

export function PageWrapper({ children }) {
  useLenis()
  useSmoothAnchors()
  useRouteScrollReset()
  const location = useLocation()

  return (
    <main id="main-content" tabIndex={-1} className="relative w-full outline-none">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}
