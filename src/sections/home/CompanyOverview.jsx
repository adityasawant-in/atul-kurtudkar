import { motion } from 'framer-motion'
import { ShieldCheck, Compass, Sparkles, Ruler } from 'lucide-react'
import { SectionHeading } from '../../components/shared/SectionHeading'
import { BlueprintBackdrop } from '../../components/shared/BlueprintBackdrop'
import { fadeUp, staggerContainer } from '../../animations/framer/variants'

const PILLARS = [
  { icon: ShieldCheck, label: 'Safety', description: 'Life-safety first in every calculation.' },
  { icon: Ruler, label: 'Precision', description: 'Engineering tolerances that hold on site.' },
  { icon: Compass, label: 'Excellence', description: 'A standard of practice, not a promise.' },
  { icon: Sparkles, label: 'Innovation', description: 'Modern methods, proven fundamentals.' },
]

export function CompanyOverview() {
  return (
    <section id="about" className="relative overflow-hidden bg-structural-950 py-32 sm:py-40">
      <BlueprintBackdrop />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        {/* Left: typography */}
        <div>
          <SectionHeading
            index="01"
            eyebrow="Company Overview"
            title="About Atul Kudtarkar & Associates"
          />

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink-300"
          >
            Founded in <span className="text-ink-50">2018</span> and based in{' '}
            <span className="text-ink-50">Badlapur, Maharashtra</span>, Atul Kudtarkar &amp;
            Associates is a structural engineering consultancy built on a simple principle: a
            building is only as trustworthy as the structure beneath it. We provide RCC
            structural design, structural audits and construction consultation for residential,
            commercial, industrial and institutional developments.
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-xl text-base leading-relaxed text-ink-300"
          >
            Every project is engineered with the same discipline — precise calculation, honest
            assessment, and construction support that stays engaged from blueprint to handover.
          </motion.p>

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="mt-10 grid grid-cols-2 gap-6"
          >
            {PILLARS.map(({ icon: Icon, label, description }) => (
              <motion.div key={label} variants={fadeUp} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-ink-50/12 text-concrete-500">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-display text-sm font-medium text-ink-50">{label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-500">{description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right: animated blueprint elevation */}
        <BlueprintElevation />
      </div>
    </section>
  )
}

function BlueprintElevation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="glass relative aspect-[4/5] w-full overflow-hidden rounded-lg p-6"
    >
      <svg viewBox="0 0 300 380" className="h-full w-full" fill="none">
        <rect x="0.5" y="0.5" width="299" height="379" rx="4" stroke="#4577c2" strokeOpacity="0.2" />

        {/* Building elevation outline, drawn in with stroke-dashoffset */}
        <motion.path
          d="M60 330 V150 L150 90 L240 150 V330"
          stroke="#c9a34e"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Floor divider lines */}
        {[190, 230, 270, 310].map((y, i) => (
          <motion.line
            key={y}
            x1="60"
            y1={y}
            x2="240"
            y2={y}
            stroke="#2a5ba3"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.6 + i * 0.15 }}
          />
        ))}

        {/* Windows grid */}
        {Array.from({ length: 4 }).flatMap((_, row) =>
          Array.from({ length: 3 }).map((_, col) => (
            <motion.rect
              key={`${row}-${col}`}
              x={78 + col * 50}
              y={200 + row * 40}
              width="26"
              height="20"
              stroke="#a7adb6"
              strokeWidth="0.75"
              fill="none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.6 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 1 + (row * 3 + col) * 0.04 }}
            />
          ))
        )}

        {/* Measurement markers */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <line x1="30" y1="150" x2="30" y2="330" stroke="#d9541f" strokeWidth="0.75" />
          <line x1="26" y1="150" x2="34" y2="150" stroke="#d9541f" strokeWidth="0.75" />
          <line x1="26" y1="330" x2="34" y2="330" stroke="#d9541f" strokeWidth="0.75" />
        </motion.g>
      </svg>

      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-display text-[10px] tracking-[0.2em] text-ink-500">
        <span>ELEVATION — TYPICAL</span>
        <span>SCALE N.T.S.</span>
      </div>
    </motion.div>
  )
}
