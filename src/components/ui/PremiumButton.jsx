import { Button } from './Button'
import { cn } from '../../utils/cn'

/**
 * The consultation/CTA-grade button used on service and project detail
 * pages — composes the existing Button rather than duplicating its
 * hover/magnetic logic, adding only a slightly larger, elevated look.
 */
export function PremiumButton({ className, ...props }) {
  return <Button className={cn('px-9 py-4 text-base shadow-lg', className)} {...props} />
}
