import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { SectionHeading } from '../../components/shared/SectionHeading'
import { useCountUp } from '../../hooks/useCountUp'
import { useInView } from '../../hooks/useInView'
import { STATS, TRUST_BADGE } from '../../data/stats'
import { staggerContainer, fadeUp } from '../../animations/framer/variants'

function StatCard({ stat, inView, index }) {
  const count = useCountUp(stat.value, { inView, duration: 1.6 + index * 0.15 })

  return (
    <motion.div variants={fadeUp} className="relative">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 140" preserveAspectRatio="none">
        <motion.rect
          x="1" y="1" width="198" height="138" rx="8"
          fill="none" stroke="#2a5ba3" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.5 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="relative flex h-full flex-col items-center justify-center px-6 py-10 text-center">
        <p className="font-display text-4xl font-semibold tabular-nums text-ink-50 sm:text-5xl">
          {count}
          <span className="text-concrete-500">{stat.suffix}</span>
        </p>
        <p className="mt-3 text-xs tracking-[0.15em] text-ink-500">{stat.label.toUpperCase()}</p>
      </div>
    </motion.div>
  )
}

export function Statistics() {
  const [ref, inView] = useInView({ amount: 0.4 })

  return (
    <section ref={ref} className="relative overflow-hidden bg-structural-900 py-32 sm:py-36">
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          index="05"
          eyebrow="By the Numbers"
          title="Engineering trust, quantified."
          align="center"
          className="mx-auto"
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} inView={inView} index={i} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex items-center justify-center gap-3 text-ink-300"
        >
          <ShieldCheck className="h-4 w-4 text-concrete-500" strokeWidth={1.75} />
          <span className="font-display text-sm tracking-[0.1em]">{TRUST_BADGE.toUpperCase()}</span>
        </motion.div>
      </div>
    </section>
  )
}
