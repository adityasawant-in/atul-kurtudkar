import { motion } from 'framer-motion'
import { AnimatedHeading } from './AnimatedHeading'
import { Breadcrumbs } from './Breadcrumbs'
import { BlueprintBackdrop } from './BlueprintBackdrop'

/**
 * Shared hero band for every top-level page (About/Services/Projects/
 * Contact/detail pages) — reuses the existing blueprint backdrop so new
 * pages read as part of the same site, not a bolted-on template.
 */
export function PageHero({ eyebrow, title, description, breadcrumbs, children }) {
  return (
    <section className="relative flex min-h-[70vh] w-full items-end overflow-hidden pb-20 pt-40 sm:min-h-[60vh]">
      <BlueprintBackdrop className="opacity-40" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-8" />}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-5 flex items-center gap-3"
        >
          <span className="font-display text-xs font-medium tracking-[0.2em] text-concrete-500">
            {eyebrow.toUpperCase()}
          </span>
          <span className="h-px w-8 bg-ink-50/20" />
        </motion.div>
        <AnimatedHeading
          text={title}
          className="max-w-3xl font-display text-4xl font-semibold leading-tight text-ink-50 sm:text-6xl lg:text-7xl"
        />
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink-300 sm:text-lg"
          >
            {description}
          </motion.p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  )
}
