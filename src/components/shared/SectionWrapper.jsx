import { cn } from '../../utils/cn'

/**
 * Consistent max-width/padding rhythm for every section on every page —
 * matches the spacing already used across the home sections.
 */
export function SectionWrapper({ as: Tag = 'section', id, className, innerClassName, children }) {
  return (
    <Tag id={id} className={cn('relative w-full py-24 sm:py-32', className)}>
      <div className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6', innerClassName)}>{children}</div>
    </Tag>
  )
}
