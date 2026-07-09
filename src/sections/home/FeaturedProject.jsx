import { motion } from 'framer-motion'
import { SectionHeading } from '../../components/shared/SectionHeading'
import { Divider } from '../../components/shared/Divider'
import { FEATURED_PROJECT as P } from '../../data/projects'
import { fadeUp, staggerContainer } from '../../animations/framer/variants'

export function FeaturedProject() {
  return (
    <section id="projects" className="relative overflow-hidden bg-structural-900 py-32 sm:py-40">
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading index="03" eyebrow="Featured Project" title={P.name} description={P.description} />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-10">
          {/* Cinematic image placeholder with blueprint overlay */}
          <motion.div
            initial={{ clipPath: 'inset(0 0 0 100%)' }}
            whileInView={{ clipPath: 'inset(0 0 0 0%)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg lg:col-span-3"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-structural-700 via-structural-800 to-structural-950" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(69,119,194,0.25),transparent_55%)]" />

            {/* Wireframe building overlay */}
            <img
              src="/images/ambernath-front-elevation.jpg"
              alt={P.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-structural-950/70 via-transparent to-transparent" />

            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-ink-50/15 bg-structural-950/50 px-3 py-1.5 font-display text-[10px] tracking-[0.2em] text-concrete-300 backdrop-blur-sm">
              {P.category.toUpperCase()}
            </div>
            <div className="absolute bottom-5 right-5 font-display text-[10px] tracking-[0.25em] text-ink-500">
              {P.year}
            </div>
          </motion.div>

          {/* Info column */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-2"
          >
            <motion.p variants={fadeUp} className="font-display text-xs tracking-[0.2em] text-ink-500">
              {P.location.toUpperCase()}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 grid grid-cols-2 gap-6">
              {P.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-xl font-semibold text-ink-50">{stat.value}</p>
                  <p className="mt-1 text-xs tracking-wide text-ink-500">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp}>
              <Divider className="my-8" />
            </motion.div>

            <motion.p variants={fadeUp} className="font-display text-xs tracking-[0.2em] text-ink-500">
              ENGINEERING TIMELINE
            </motion.p>

            <motion.ul variants={staggerContainer(0.08)} className="mt-5 space-y-4">
              {P.timeline.map((item, i) => (
                <motion.li
                  key={item.label}
                  variants={fadeUp}
                  className="flex items-center justify-between border-b border-ink-50/8 pb-4"
                >
                  <span className="flex items-center gap-3 text-sm text-ink-100">
                    <span className="font-display text-xs text-concrete-500">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </span>
                  <span className="text-xs text-ink-500">{item.duration}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
