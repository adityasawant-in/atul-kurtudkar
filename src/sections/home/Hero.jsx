import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { HeroBackdrop } from './HeroBackdrop'
import { Button } from '../../components/ui/Button'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { playHeroIntro } from '../../animations/gsap/timelines/heroIntro'
import { createHeroExitTrigger } from '../../animations/gsap/scrollTriggers/heroScrollTrigger'
import {
  fadeUp,
  staggerContainer,
  staggerLetter,
} from '../../animations/framer/variants'

const HEADING_LINES = ['Engineering Strong Foundations.', 'Building Lasting Trust.']

export function Hero() {
  const reducedMotion = useReducedMotion()
  const heroRef = useRef(null)
  const canvasWrapRef = useRef(null)
  const scrimRef = useRef(null)
  const contentRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      playHeroIntro({
        canvasEl: canvasWrapRef.current,
        scrimEl: scrimRef.current,
      })
      createHeroExitTrigger({
        heroEl: heroRef.current,
        contentEl: contentRef.current,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex h-[100dvh] w-full items-center overflow-hidden bg-structural-950"
    >
      <div ref={canvasWrapRef}>
        <HeroBackdrop reducedMotion={reducedMotion} />
      </div>

      {/* Readability scrim over the hero photograph — deliberately uses
          real dark colors (not the site's structural-950 token, which now
          means "light") since this sits over a photo and needs guaranteed
          contrast regardless of what's in the image. */}
      <div
        ref={scrimRef}
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050c17] via-[#050c17]/55 to-[#050c17]/15"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050c17]/80 via-[#050c17]/30 to-transparent" />

      <div ref={contentRef} className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-36 sm:px-8 sm:pt-40">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 font-display text-xs font-medium tracking-[0.18em] text-concrete-300">
          STRUCTURAL ENGINEERING CONSULTANCY &middot; BADLAPUR, MAHARASHTRA
        </span>

        <motion.h1
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="show"
          className="max-w-4xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          {HEADING_LINES.map((line, i) => (
            <motion.span key={line} variants={staggerLetter} className="block overflow-hidden">
              <span className={i === 1 ? 'text-concrete-300' : ''}>{line}</span>
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.5 }}
          className="mt-7 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
        >
          Premium structural engineering consultancy delivering safe, efficient and
          innovative engineering solutions for residential, commercial and institutional
          developments.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button as={Link} to="/projects" variant="primary">
            Explore Projects
          </Button>
          <Button as={Link} to="/contact" variant="secondary" icon={false}>
            Contact Us
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-white/60"
      >
        <span className="font-display text-[10px] tracking-[0.3em]">SCROLL TO BUILD</span>
        <span className="h-9 w-px animate-pulse bg-gradient-to-b from-concrete-500 to-transparent" />
      </motion.div>
    </section>
  )
}
