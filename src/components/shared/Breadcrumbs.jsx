import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '../../utils/cn'

/**
 * items: [{ label, to? }] — last item (no `to`) renders as the current page.
 */
export function Breadcrumbs({ items, className }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-2 text-xs', className)}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={item.label} className="flex items-center gap-2">
            {item.to && !isLast ? (
              <Link
                to={item.to}
                className="font-display tracking-wide text-ink-300 transition-colors hover:text-concrete-500"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current={isLast ? 'page' : undefined} className="font-display tracking-wide text-ink-50">
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight className="h-3 w-3 text-ink-500" strokeWidth={2} />}
          </span>
        )
      })}
    </nav>
  )
}
