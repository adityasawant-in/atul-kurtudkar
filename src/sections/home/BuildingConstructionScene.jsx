import { useEffect, useRef, useState, lazy } from 'react'
import { useFrame } from '@react-three/fiber'
import { AnimatePresence, motion } from 'framer-motion'
import { SceneCanvas } from '../../three/canvas/SceneCanvas'
import { Building } from '../../three/objects/Building'
import { Crane } from '../../three/objects/Crane'
import { Lights } from '../../three/environment/Lights'
import { BlueprintGrid } from '../../three/environment/BlueprintGrid'
import { Skyline } from '../../three/environment/Skyline'
import { FloatingParticles } from '../../three/environment/Particles'
import { applyBuildingCameraRig } from '../../animations/three/cameraRigs/buildingCameraRig'
import { createBuildingTimeline } from '../../animations/gsap/timelines/buildingConstruction'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { IS_DESKTOP_QUERY } from '../../constants/breakpoints'

import { DustParticles } from '../../three/environment/Particles'
import { fadeUp, staggerContainer } from '../../animations/framer/variants'
import { Logo } from '../../components/shared/Logo'

const PostFX = lazy(() => import('../../three/canvas/PostFX').then((m) => ({ default: m.PostFX })))

const STAGE_CONTENT = {
  blueprint: {
    index: '01',
    eyebrow: 'Concept & Survey',
    title: 'Every structure begins on paper.',
    body: 'Topographic surveys, soil investigation and engineering grid layouts establish the blueprint before a single foundation stone is placed.',
  },
  excavation: {
    index: '02',
    eyebrow: 'Breaking Ground',
    title: 'Excavation to exact design levels.',
    body: 'Controlled excavation opens the site to the required founding depth, guided by geotechnical data and precise site engineering.',
  },
  foundation: {
    index: '03',
    eyebrow: 'Foundation & Footings',
    title: 'A footing engineered to carry the load.',
    body: 'Reinforced concrete footings and rebar cages are placed to transfer structural loads safely into the bearing strata below.',
  },
  basement: {
    index: '04',
    eyebrow: 'Basement Structure',
    title: 'Columns begin their rise.',
    body: 'Basement walls and the first RCC columns are cast, establishing the vertical structural grid for every floor above.',
  },
  groundFloor: {
    index: '05',
    eyebrow: 'Ground Floor',
    title: 'The slab slides into position.',
    body: 'Formwork, reinforcement and concrete curing come together as the ground floor slab locks the structural frame in place.',
  },
  firstFloor: {
    index: '06',
    eyebrow: 'First Floor',
    title: 'Columns extend, beams connect.',
    body: 'The structural frame climbs — columns extend upward and beams tie each floor into one continuous, code-compliant system.',
  },
  secondFloor: {
    index: '07',
    eyebrow: 'Second Floor & Glazing',
    title: 'Glass begins to define the form.',
    body: 'As the second floor completes, glazing installation begins and the crane repositions for the next lift.',
  },
  facade: {
    index: '08',
    eyebrow: 'Facade & Finishing',
    title: 'The exterior takes its final shape.',
    body: 'Facade cladding and lighting fixtures install as the superstructure reaches completion.',
  },
  landscaping: {
    index: '09',
    eyebrow: 'Roads & Landscaping',
    title: 'The structure meets its surroundings.',
    body: 'Access roads, planting and site landscaping complete the development, ready for occupation.',
  },
  liveIn: {
    index: '10',
    eyebrow: 'Coming to Life',
    title: 'A building designed to be lived in.',
    body: 'Interior lighting, movement and daily life bring the finished structure to life as evening approaches.',
  },
  sunset: {
    index: '11',
    eyebrow: 'Golden Hour',
    title: 'Engineering the Foundations of Tomorrow.',
    body: 'From blueprint to skyline — a structure built on precision, safety and lasting trust.',
  },
}

function ConstructionScene({ progressRef, reducedMotion }) {
  const isDesktop = useMediaQuery(IS_DESKTOP_QUERY)

  useFrame(({ camera, clock }, delta) => {
    applyBuildingCameraRig(camera, progressRef.current, clock.getElapsedTime(), delta)
  })

  return (
    <>
      <color attach="background" args={['#060e1c']} />
      <fog attach="fog" args={['#060e1c', 16, 40]} />

      <Lights progressRef={progressRef} />
      <Skyline count={isDesktop ? 10 : 6} radius={30} />
      {!reducedMotion && <FloatingParticles count={isDesktop ? 120 : 50} spread={18} />}
      <BlueprintGrid opacity={0.22} pulse={!reducedMotion} position={[0, -2.4, 0]} />

      <Building progressRef={progressRef} />
      <Crane progressRef={progressRef} />
      {!reducedMotion && <DustParticles progressRef={progressRef} />}

      <PostFX reducedMotion={reducedMotion || !isDesktop} bloomIntensity={0.45} focusDistance={0.03} />
    </>
  )
}

export function BuildingConstructionScene() {
  const sectionRef = useRef(null)
  const progressRef = useScrollProgress(0)
  const reducedMotion = useReducedMotion()
  const [stage, setStage] = useState('blueprint')
  const [progressPct, setProgressPct] = useState(0)

  useEffect(() => {
    const trigger = createBuildingTimeline({
      sectionEl: sectionRef.current,
      progressRef,
      onStageChange: setStage,
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
    })

    return () => {
      trigger?.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const content = STAGE_CONTENT[stage]
  const isFinalStage = stage === 'sunset'

  return (
    <section
      ref={sectionRef}
      id="construction-experience"
      className="relative h-[100dvh] w-full overflow-hidden bg-structural-950"
    >
      <SceneCanvas
        camera={{ position: [0, 1.2, 11], fov: 42, near: 0.1, far: 120 }}
        fallback={<div className="absolute inset-0 -z-10 bg-structural-950" />}
      >
        <ConstructionScene progressRef={progressRef} reducedMotion={reducedMotion} />
      </SceneCanvas>

      {/* Readability scrim keeps copy legible over the ~20-30% opacity building */}
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

