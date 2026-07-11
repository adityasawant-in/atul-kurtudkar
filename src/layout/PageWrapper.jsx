import { useLayoutEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from '../hooks/useLenis'
import { useSmoothAnchors } from '../hooks/useSmoothAnchors'
import { useRouteScrollReset } from '../hooks/useRouteScrollReset'
import { ErrorBoundary } from '../components/shared/ErrorBoundary'

gsap.registerPlugin(ScrollTrigger)

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

  // GSAP's `pin: true` (the construction section) wraps its element in a
  // pin-spacer div, restructuring the DOM completely outside React's
  // knowledge. If that's still in place by the time AnimatePresence
  // actually unmounts the outgoing page (after its ~450ms exit animation),
  // React's recorded parent/child references no longer match the real DOM
  // and `removeChild` throws NotFoundError -> blank screen until reload.
  //
  // Killing every ScrollTrigger synchronously the instant the route
  // changes (this component never unmounts, only `location.pathname`
  // does, so this fires immediately on navigation) reverts every
  // pin-spacer well before that later removal ever happens.
  useLayoutEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [location.pathname])

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
          {/* Scoped to the page content only (not the navbar/shell), and
              keyed to the route so a crash on one page never takes down
              navigation, and clears itself the moment the user moves on
              instead of requiring a manual reload. */}
          <ErrorBoundary resetKey={location.pathname}>{children}</ErrorBoundary>
        </motion.div>
      </AnimatePresence>
    </main>
  )
}