import { useLayoutEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from '../hooks/useLenis'
import { useSmoothAnchors } from '../hooks/useSmoothAnchors'
import { useRouteScrollReset } from '../hooks/useRouteScrollReset'
import { ErrorBoundary } from '../components/shared/ErrorBoundary'
import { AppRouter } from '../router/AppRouter'

gsap.registerPlugin(ScrollTrigger)

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
}

export function PageWrapper() {
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
      {/*
        BUG FIX — blank screen after clicking a nav link (only fixed by a
        manual refresh):

        `<Routes>` reads the CURRENT location from BrowserRouter's context
        wherever it sits in the tree. Previously `<AppRouter />` (which
        renders `<Routes>`) was passed in as `children` from App.jsx and
        nested inside this component's motion.div, but `<Routes>` isn't
        aware of — or frozen to — this component's own `key`/animation
        state.

        With `mode="wait"`, AnimatePresence keeps the OUTGOING page's
        motion.div mounted (running its exit animation) while React Router
        has already updated `location` to the NEW url. Because `<Routes>`
        was nested inside that still-mounted, still-exiting element, it
        immediately re-rendered to show the NEW page's content — but inside
        the OLD element, which was still animating toward `exit`
        (opacity: 0). AnimatePresence's exit-tracking never received the
        completion signal it expected (the subtree it was tracking had
        changed out from under it), so it got stuck forever at the `exit`
        values: an invisible, blank page that only a full reload (a fresh
        mount with no exit animation in progress) would clear.

        The fix: render `<AppRouter>` directly here (instead of receiving
        it as opaque `children`) and pass it an explicit `location` prop.
        `<Routes location={location}>` then matches against that fixed
        prop value instead of the live router context. Because the
        *outgoing* motion.div was created on a render where `location`
        still pointed at the OLD path, its nested `<Routes>` keeps
        rendering the OLD page's content, frozen, for the whole exit
        animation — exactly what AnimatePresence needs to detect
        completion and move on to mounting/animating in the NEW page.
      */}
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
          <ErrorBoundary resetKey={location.pathname}>
            <AppRouter location={location} />
          </ErrorBoundary>
        </motion.div>
      </AnimatePresence>
    </main>
  )
}
