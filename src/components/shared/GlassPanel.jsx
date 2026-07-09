import { cn } from '../../utils/cn'

export function GlassPanel({ children, className, as: As = 'div', ...props }) {
  return (
    <As
      className={cn(
        'glass relative overflow-hidden rounded-lg',
        className
      )}
      {...props}
    >
      {children}
    </As>
  )
}
