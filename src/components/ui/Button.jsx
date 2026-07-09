import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '../../utils/cn'
import { MagneticButton } from './MagneticButton'
import { buttonHover } from '../../animations/framer/variants'

const VARIANTS = {
  primary:
    'bg-concrete-500 text-structural-950 hover:bg-concrete-300 shadow-md hover:shadow-lg',
  secondary:
    'bg-transparent text-ink-50 border border-ink-50/25 hover:border-concrete-500/70 hover:text-concrete-300',
  ghost: 'bg-transparent text-ink-50/80 hover:text-ink-50 px-0',
}

/**
 * `as` accepts any component (string tag like 'a'/'button', or a component
 * such as React Router's `Link`) and is wrapped once with `motion()` so
 * hover/tap variants apply directly to the real interactive element —
 * no invisible overlay hacks, keeps it keyboard + screen-reader correct.
 */
export function Button({
  children,
  variant = 'primary',
  icon = true,
  className,
  magnetic = true,
  as = 'button',
  ...props
}) {
  const MotionEl = typeof as === 'string' ? motion[as] ?? motion.button : motion.create(as)

  const content = (
    <MotionEl
      variants={buttonHover}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className={cn(
        'group relative inline-flex items-center gap-2 rounded-sm px-7 py-3.5',
        'font-display text-sm font-medium tracking-wide transition-[background-color,color,box-shadow] duration-300',
        'cursor-pointer select-none glass-sheen',
        VARIANTS[variant],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {icon && (
        <ArrowUpRight
          className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2}
        />
      )}
    </MotionEl>
  )

  return magnetic ? <MagneticButton strength={0.25}>{content}</MagneticButton> : content
}
