import { GlassCard } from './GlassCard'
import { cn } from '../../utils/cn'

export function StatisticsCard({ label, value, className }) {
  return (
    <GlassCard className={cn('text-center', className)}>
      <div className="font-display text-3xl font-semibold text-concrete-500 sm:text-4xl">{value}</div>
      <div className="mt-2 font-display text-xs font-medium tracking-[0.15em] text-ink-300">{label.toUpperCase()}</div>
    </GlassCard>
  )
}
