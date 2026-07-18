import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '../../utils/cn'

/**
 * items: [{ label, to? }] — last item (no `to`) renders as the current page.
 * `light`: use white/light tones instead of the default dark-ink tones —
 * for when Breadcrumbs sits over a photographic PageHero background.
 */
export function Breadcrumbs({ items, className, light = false }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-2 text-xs', className)}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={item.label} className="flex items-center gap-2">
            {item.to && !isLast ? (
              <Link
                to={item.to}
                className={cn(
                  'font-display tracking-wide transition-colors hover:text-concrete-400',
                  light ? 'text-white/70' : 'text-ink-300 hover:text-concrete-500'
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isLast ? 'page' : undefined}
                className={cn('font-display tracking-wide', light ? 'text-white' : 'text-ink-50')}
              >
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight className={cn('h-3 w-3', light ? 'text-white/50' : 'text-ink-500')} strokeWidth={2} />}
          </span>
        )
      })}
    </nav>
  )
}
