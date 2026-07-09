import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '../../animations/framer/variants'
import { cn } from '../../utils/cn'

/**
 * items: [{ label, duration/date, description? }]
 * Used by the project detail "Construction Timeline" and the About page's
 * company timeline.
 */
export function Timeline({ items, className }) {
  return (
    <motion.ol
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={cn('relative border-l border-ink-50/15 pl-8', className)}
    >
      {items.map((item, i) => (
        <motion.li key={`${item.label}-${i}`} variants={fadeUp} className="relative pb-10 last:pb-0">
          <span className="absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full border-2 border-concrete-500 bg-structural-950" />
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h4 className="font-display text-lg font-semibold text-ink-50">{item.label}</h4>
            {(item.duration || item.date) && (
              <span className="font-display text-xs tracking-[0.15em] text-concrete-500">
                {(item.duration || item.date).toUpperCase()}
              </span>
            )}
          </div>
          {item.description && <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-300">{item.description}</p>}
        </motion.li>
      ))}
    </motion.ol>
  )
}
