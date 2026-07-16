import { useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { ConstructionLayers, applyConstructionLayers } from './ConstructionLayers'
import { CONSTRUCTION_STAGES } from '../../constants/animationConfig'
import { mapRange } from '../../utils/clamp'
import { fadeUp, staggerContainer } from '../../animations/framer/variants'
import { Logo } from '../../components/shared/Logo'

const STAGE_ORDER = Object.keys(CONSTRUCTION_STAGES)

const STAGE_CONTENT = {
  blueprint: {
    index: '01',
    eyebrow: 'Concept & Survey',
    title: 'Every structure begins on paper.',
    body: 'Topographic surveys, soil investigation and engineering grid layouts establish the blueprint — then controlled excavation opens the site to the exact levels the design calls for.',
  },
  foundation: {
    index: '02',
    eyebrow: 'Foundation & Structure',
    title: 'A footing engineered to carry the load.',
    body: 'Reinforced concrete footings transfer every load safely into the bearing strata below, as basement walls and the first RCC columns establish the vertical grid for every floor above.',
  },
  structure: {
    index: '03',
    eyebrow: 'The Frame Rises',
    title: 'Floor by floor, the frame takes shape.',
    body: 'Slabs, columns and beams climb together into one continuous, code-compliant structural system — and by the upper floors, glazing installation is already underway.',
  },
  facade: {
    index: '04',
    eyebrow: 'Facade & Site Works',
    title: 'The exterior takes its final shape.',
    body: 'Facade cladding and lighting complete the superstructure, while access roads and landscaping bring the site around it to life.',
  },
  sunset: {
    index: '05',
    eyebrow: 'Golden Hour',
    title: 'Engineering the Foundations of Tomorrow.',
    body: 'Interior lighting and daily life bring the finished structure to life — a building shaped by precision, safety and lasting trust.',
  },
}

/**
 * Progress rail, isolated into its own component so its text re-renders
 * (up to ~100 times across one scroll-through, once per 1% of progress)
 * only ever re-render this tiny node — not the whole scene, which also
 * contains the heavier AnimatePresence stage-copy block. The bar itself
 * is a `motion.div` driven straight off `scrollYProgress` via
 * `useTransform`, so it updates on Framer's own rAF-batched loop with
 * zero React re-renders at all.
 */
function ProgressRail({ scrollYProgress }) {
  const width = useTransform(scrollYProgress, (p) => `${Math.round(p * 100)}%`)
  const [pct, setPct] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = Math.round(p * 100)
    setPct((prev) => (prev === next ? prev : next))
  })

  return (
    <div className="pointer-events-none absolute inset-x-6 top-24 z-10 flex items-center gap-4 sm:inset-x-10">
      <span className="font-display text-xs tracking-[0.25em] text-ink-500">
        CONSTRUCTION PROGRESS
      </span>
      <div className="h-px flex-1 bg-ink-50/10">
        <motion.div className="h-px bg-concrete-500" style={{ width }} />
      </div>
      <span className="font-display text-xs tabular-nums text-concrete-300">{pct}%</span>
    </div>
  )
}

/**
 * Rebuilt on native CSS `position: sticky` (for the pinned visual) +
 * Framer Motion's `useScroll` (for progress) instead of GSAP
 * ScrollTrigger's `pin: true` + a manual wheel/touch Observer.
 *
 * The previous scroll-hijacking approach — intercepting wheel/touch events
 * and manually driving progress — kept surfacing new device-specific edge
 * cases (pin-spacer/React DOM conflicts, native touch-scroll leaking past
 * `preventDefault` on some mobile browsers, GSAP/Lenis timing races). Every
 * one of those bugs exists *because* it was fighting the browser's native
 * scroll. This version doesn't fight it at all:
 *
 *  - The section is `STAGE_ORDER.length * 100vh` tall. The visual layer
 *    inside it is `position: sticky; top: 0`, which is plain CSS — the
 *    browser handles the "pinning" natively, on every device, with zero JS.
 *  - `useScroll` tracks that container's scroll progress (0 → 1) with a
 *    passive scroll listener — no preventDefault, nothing to intercept,
 *    nothing that can get "stuck" or desynced from real scroll position.
 *  - Progress maps directly and continuously to real scroll distance, so
 *    it can't skip, jump, or lag independently of the user's own scrolling.
 */
export function BuildingConstructionScene() {
  const containerRef = useRef(null)
  const [stage, setStage] = useState(STAGE_ORDER[0])

  // Every layer is a plain DOM ref, written to directly on scroll — no
  // React state, no re-renders, same zero-cost-per-frame contract as before.
  const layerRefs = {
    parallaxBg: useRef(null),
    svgWrap: useRef(null),
    blueprint: useRef(null),
    ground: useRef(null),
    foundation: useRef(null),
    crane: useRef(null),
    columns: useRef(null),
    structure: useRef(null),
    walls: useRef(null),
    glass: useRef(null),
    roof: useRef(null),
    glow: useRef(null),
    sunset: useRef(null),
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // BUG FIX — building briefly appears fully-constructed at 0% scroll,
  // then "deletes" itself a moment later:
  //
  // None of the SVG layers (walls, columns, roof, glass, ...) have an
  // `opacity` set in ConstructionLayers.jsx — they're only ever styled by
  // `applyConstructionLayers`, which up to now only ran inside
  // `useMotionValueEvent(scrollYProgress, 'change', ...)`. That callback
  // fires on *changes* to the scroll value — it does not fire once with
  // the current value on mount. So on first paint every layer sat at its
  // raw SVG default (no opacity attribute = fully opaque), meaning the
  // *entire* building — walls, roof, glass and all — rendered at once
  // regardless of real scroll position. The instant the first genuine
  // scroll `change` event fired, the function finally ran with the real
  // (near-zero) progress and correctly hid everything again — which
  // looked exactly like "the building gets deleted" a moment after
  // scrolling in.
  //
  // Running it once here, synchronously before paint, with whatever the
  // scroll progress actually is at mount time closes that gap — the
  // layers are correct from the very first frame, with no dependency on
  // an event that might take a moment to fire.
  useLayoutEffect(() => {
    applyConstructionLayers(scrollYProgress.get(), layerRefs, mapRange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    applyConstructionLayers(p, layerRefs, mapRange)

    const idx = Math.min(STAGE_ORDER.length - 1, Math.max(0, Math.floor(p * STAGE_ORDER.length)))
    const key = STAGE_ORDER[idx]
    setStage((prev) => (prev === key ? prev : key))
  })

  const content = STAGE_CONTENT[stage]
  const isFinalStage = stage === STAGE_ORDER[STAGE_ORDER.length - 1]

  return (
    <section
      ref={containerRef}
      id="construction-experience"
      className="relative w-full"
      style={{ height: `${STAGE_ORDER.length * 100}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-structural-950">
        <ConstructionLayers refs={layerRefs} />

        {/* Readability scrim keeps copy legible over the layered building */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-structural-950/85 via-structural-950/30 to-structural-950/70" />

        <ProgressRail scrollYProgress={scrollYProgress} />

        {/* Stage copy */}
        <div className="relative z-10 flex h-full w-full items-center px-6 sm:px-10">
          <div className="max-w-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                variants={staggerContainer(0.08)}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}
              >
                <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
                  <span className="font-display text-xs font-medium tracking-[0.2em] text-concrete-500">
                    {content.index}
                  </span>
                  <span className="h-px w-8 bg-ink-50/20" />
                  <span className="font-display text-xs font-medium tracking-[0.2em] text-ink-300">
                    {content.eyebrow.toUpperCase()}
                  </span>
                </motion.div>

                <motion.h2
                  variants={fadeUp}
                  className={
                    isFinalStage
                      ? 'text-gradient-shimmer font-display text-3xl font-semibold leading-tight sm:text-5xl'
                      : 'font-display text-3xl font-semibold leading-tight text-ink-50 sm:text-5xl'
                  }
                >
                  {content.title}
                </motion.h2>

                <motion.p variants={fadeUp} className="mt-5 text-base leading-relaxed text-ink-300">
                  {content.body}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence>
              {isFinalStage && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.9 }}
                  className="mt-8 flex items-center gap-3 border-t border-ink-50/10 pt-6"
                >
                  <Logo size={30} />
                  <div>
                    <p className="font-display text-sm font-semibold tracking-wide text-ink-50">
                      ATUL KUDTARKAR &amp; ASSOCIATES
                    </p>
                    <p className="text-xs tracking-wide text-ink-500">Badlapur, Maharashtra</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Stage index dots */}
        <div className="pointer-events-none absolute bottom-10 right-6 z-10 hidden flex-col items-end gap-2 sm:right-10 sm:flex">
          {STAGE_ORDER.map((key) => (
            <span
              key={key}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                key === stage ? 'w-8 bg-concrete-500' : 'w-1.5 bg-ink-50/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
