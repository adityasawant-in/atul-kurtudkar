import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home as HomeIcon } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { BlueprintBackdrop } from '../components/shared/BlueprintBackdrop'
import { fadeUp, staggerContainer } from '../animations/framer/variants'

/**
 * 404 page. Kept in the same visual language as the rest of the site
 * (blueprint backdrop, structural palette) rather than a generic error
 * page, and marked `noindex` since it should never rank in search.
 */
export function NotFound() {
  useEffect(() => {
    document.title = 'Page Not Found — Atul Kudtarkar & Associates'
    let meta = document.querySelector('meta[name="robots"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'robots')
      document.head.appendChild(meta)
    }
    const previous = meta.getAttribute('content')
    meta.setAttribute('content', 'noindex, nofollow')
    return () => {
      if (previous) meta.setAttribute('content', previous)
      else meta.removeAttribute('content')
    }
  }, [])

  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-structural-950 px-6">
      <BlueprintBackdrop />
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.span variants={fadeUp} className="font-display text-xs tracking-[0.3em] text-concrete-500">
          ERROR 404
        </motion.span>
        <motion.h1 variants={fadeUp} className="mt-5 font-display text-5xl font-semibold text-ink-50 sm:text-7xl">
          Off the blueprint.
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-5 max-w-md text-base leading-relaxed text-ink-300">
          The page you're looking for doesn't exist, or has been moved. Let's get you back to
          solid ground.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-9">
          <Button as={Link} to="/" variant="primary" icon={false}>
            <HomeIcon className="h-4 w-4" strokeWidth={1.75} />
            Back to Home
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
