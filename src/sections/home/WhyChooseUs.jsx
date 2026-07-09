import { motion } from 'framer-motion'
import { SectionHeading } from '../../components/shared/SectionHeading'
import { WHY_CHOOSE_US } from '../../data/whyChooseUs'

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-structural-950 py-32 sm:py-40">
      <div className="relative mx-auto max-w-5xl px-6 sm:px-8">
        <SectionHeading
          index="06"
          eyebrow="Why Choose Us"
          title="What sets our engineering apart."
          align="center"
          className="mx-auto"
        />

        <div className="relative mt-20">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-ink-50/10 md:block" />
          <div className="absolute left-0 top-0 h-full w-px bg-ink-50/10 md:hidden" />

          <div className="flex flex-col gap-14 md:gap-4">
            {WHY_CHOOSE_US.map((item, i) => {
              const isLeft = i % 2 === 0
              return (
                <div key={item.title} className="relative flex items-center md:min-h-[7rem]">
                  {/* Node */}
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-0 top-1 h-2.5 w-2.5 -translate-x-[calc(50%-0.5px)] rounded-full bg-concrete-500 md:left-1/2"
                  />

                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-full pl-8 md:w-1/2 md:pl-0 ${
                      isLeft ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
                    }`}
                  >
                    <h3 className="font-display text-lg font-medium text-ink-50">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.description}</p>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
