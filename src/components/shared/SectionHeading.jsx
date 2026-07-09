import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../../animations/framer/variants'

/**
 * Shared eyebrow + heading pattern used by every Phase 3 section, so the
 * "index · eyebrow" / heading rhythm established in the construction scene
 * carries through the rest of the page.
 */
export function SectionHeading({ index, eyebrow, title, description, align = 'left', className }) {
  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      className={`${align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'} flex flex-col ${className ?? ''}`}
    >
      <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
        {index && (
          <>
            <span className="font-display text-xs font-medium tracking-[0.2em] text-concrete-500">
              {index}
            </span>
            <span className="h-px w-8 bg-ink-50/20" />
          </>
        )}
        <span className="font-display text-xs font-medium tracking-[0.2em] text-ink-300">
          {eyebrow.toUpperCase()}
        </span>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="max-w-2xl font-display text-3xl font-semibold leading-tight text-ink-50 sm:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base leading-relaxed text-ink-300">
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
