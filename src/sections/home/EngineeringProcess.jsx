import { motion } from 'framer-motion'
import { SectionHeading } from '../../components/shared/SectionHeading'
import { BlueprintBackdrop } from '../../components/shared/BlueprintBackdrop'
import { PROCESS_STEPS } from '../../data/process'
import { fadeUp, staggerContainer } from '../../animations/framer/variants'

export function EngineeringProcess() {
  return (
    <section className="relative overflow-hidden bg-structural-950 py-32 sm:py-40">
      <BlueprintBackdrop />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Engineering Process"
          title="A disciplined path from consultation to completion."
          align="center"
          className="mx-auto"
        />

        {/* Desktop: horizontal timeline */}
        <div className="relative mt-24 hidden lg:block">
          <div className="absolute left-0 right-0 top-6 h-px bg-ink-50/10" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-6 h-px origin-left bg-concrete-500/60"
          />

          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-7 gap-4"
          >
            {PROCESS_STEPS.map((step) => {
              const Icon = step.icon
              return (
                <motion.div key={step.id} variants={fadeUp} className="flex flex-col items-center text-center">
                  <div className="relative flex h-12 w-12 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-concrete-500/20" />
                    <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-concrete-500/50 bg-structural-950 text-concrete-500">
                      <Icon className="h-4.5 w-4.5" strokeWidth={1.5} />
                    </span>
                  </div>
                  <span className="mt-5 font-display text-xs text-concrete-500">{step.id}</span>
                  <h3 className="mt-1.5 font-display text-sm font-medium text-ink-50">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-500">{step.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Mobile / tablet: vertical timeline */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="relative mt-16 flex flex-col gap-10 lg:hidden"
        >
          <div className="absolute bottom-6 left-6 top-6 w-px bg-ink-50/10" />
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-6 left-6 top-6 w-px origin-top bg-concrete-500/60"
          />

          {PROCESS_STEPS.map((step) => {
            const Icon = step.icon
            return (
              <motion.div key={step.id} variants={fadeUp} className="relative flex items-start gap-5 pl-0">
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-concrete-500/50 bg-structural-950 text-concrete-500">
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.5} />
                </span>
                <div className="pt-1.5">
                  <span className="font-display text-xs text-concrete-500">{step.id}</span>
                  <h3 className="mt-1 font-display text-base font-medium text-ink-50">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{step.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
