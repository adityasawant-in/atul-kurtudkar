import { useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ConstructionLayers, applyConstructionLayers } from './ConstructionLayers'
import { createBuildingTimeline } from '../../animations/gsap/timelines/buildingConstruction'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { mapRange } from '../../utils/clamp'
import { fadeUp, staggerContainer } from '../../animations/framer/variants'
import { Logo } from '../../components/shared/Logo'

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

export function BuildingConstructionScene() {
  const sectionRef = useRef(null)
  const progressRef = useScrollProgress(0)
  const reducedMotion = useReducedMotion()
  const [stage, setStage] = useState('blueprint')
  const [progressPct, setProgressPct] = useState(0)

  // Every layer is a plain DOM ref — updated directly in the GSAP
  // ScrollTrigger tick below, never through React state, so scrubbing
  // costs zero re-renders (same performance contract the old R3F rig had).
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

  // useLayoutEffect (not useEffect) + gsap.context(): the trigger and its
  // pin-spacer are created/reverted synchronously in the commit phase this
  // way, rather than in the deferred passive-effect pass useEffect uses —
  // this is a second, independent safety net on top of the proactive
  // kill-all-triggers-on-navigate in PageWrapper.jsx. ctx.revert() cleans
  // up everything GSAP touched (not just the trigger reference), which is
  // the pattern GSAP's own docs recommend for React.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      createBuildingTimeline({
        sectionEl: sectionRef.current,
        progressRef,
        onStageChange: setStage,
        reducedMotion,
        // Only re-renders when the rounded percentage actually changes, and
        // only fires while this trigger is scrubbing — unlike a setInterval
        // poll, there is zero re-render cost while the section is out of
        // view or the page is idle.
        onProgress: (p) => {
          setProgressPct((prev) => {
            const next = Math.round(p * 100)
            return next === prev ? prev : next
          })
        },
        // Fires on every scrub tick — drives the construction layers via
        // direct style writes, no setState involved.
        onRawProgress: (p) => {
          if (!reducedMotion) {
            applyConstructionLayers(p, layerRefs, mapRange)
          } else {
            // Reduced motion: skip parallax/staggered reveal, just cross-fade
            // straight from blueprint to the finished building.
            const done = mapRange(p, 0.3, 0.9, 0, 1)
            if (layerRefs.blueprint.current) layerRefs.blueprint.current.style.opacity = String(1 - done)
            if (layerRefs.foundation.current) layerRefs.foundation.current.style.opacity = String(done)
            if (layerRefs.columns.current) layerRefs.columns.current.style.opacity = String(done)
            if (layerRefs.structure.current) layerRefs.structure.current.style.opacity = String(done)
            if (layerRefs.walls.current) layerRefs.walls.current.style.opacity = String(done * 0.95)
            if (layerRefs.glass.current) layerRefs.glass.current.style.opacity = String(done * 0.85)
            if (layerRefs.roof.current) layerRefs.roof.current.style.opacity = String(done)
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  const content = STAGE_CONTENT[stage]
  const isFinalStage = stage === 'sunset'

  return (
    <section
      ref={sectionRef}
      id="construction-experience"
      className="relative h-[100dvh] w-full overflow-hidden bg-structural-950"
    >
      <ConstructionLayers refs={layerRefs} />

      {/* Readability scrim keeps copy legible over the layered building */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-structural-950/85 via-structural-950/30 to-structural-950/70" />

      {/* Progress rail */}
      <div className="pointer-events-none absolute inset-x-6 top-24 z-10 flex items-center gap-4 sm:inset-x-10">
        <span className="font-display text-xs tracking-[0.25em] text-ink-500">
          CONSTRUCTION PROGRESS
        </span>
        <div className="h-px flex-1 bg-ink-50/10">
          <motion.div
            className="h-px bg-concrete-500"
            animate={{ width: `${progressPct}%` }}
            transition={{ ease: 'linear', duration: 0.1 }}
          />
        </div>
        <span className="font-display text-xs tabular-nums text-concrete-300">{progressPct}%</span>
      </div>

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
        {Object.keys(STAGE_CONTENT).map((key) => (
          <span
            key={key}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              key === stage ? 'w-8 bg-concrete-500' : 'w-1.5 bg-ink-50/20'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
