import { motion } from 'framer-motion'
import { GlassPanel } from './GlassPanel'
import { cn } from '../../utils/cn'

/**
 * GlassPanel + a subtle hover lift, for interactive cards (projects,
 * services, stats) as opposed to GlassPanel's static container use.
 */
export function GlassCard({ children, className, as = 'div', ...props }) {
  return (
    <GlassPanel
      as={motion.create ? motion.create(as) : motion[as]}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn('glass-sheen p-6', className)}
      {...props}
    >
      {children}
    </GlassPanel>
  )
}
