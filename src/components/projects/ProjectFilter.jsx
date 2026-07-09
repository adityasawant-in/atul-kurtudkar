import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export function ProjectFilter({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
      {['All', ...categories].map((category) => {
        const isActive = active === category
        return (
          <button
            key={category}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category)}
            className={cn(
              'relative rounded-full px-5 py-2 font-display text-sm font-medium tracking-wide transition-colors duration-300',
              isActive ? 'text-structural-950' : 'text-ink-300 hover:text-ink-50'
            )}
          >
            {isActive && (
              <motion.span
                layoutId="project-filter-pill"
                className="absolute inset-0 rounded-full bg-concrete-500"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        )
      })}
    </div>
  )
}
