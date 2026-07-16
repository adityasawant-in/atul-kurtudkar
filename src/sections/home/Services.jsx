import { motion } from 'framer-motion'
import {
  Ruler, Layers, ClipboardCheck, HardHat, Home, Building2, Factory, Landmark,
} from 'lucide-react'
import { SectionHeading } from '../../components/shared/SectionHeading'
import { BlueprintBackdrop } from '../../components/shared/BlueprintBackdrop'
import { AmbientParticles } from '../../components/shared/AmbientParticles'
import { useTilt } from '../../hooks/useTilt'
import { SERVICES } from '../../data/services'
import { fadeUp, staggerContainer } from '../../animations/framer/variants'

const ICONS = {
  'structural-design': Ruler,
  'rcc-design': Layers,
  'structural-audit': ClipboardCheck,
  'construction-consultancy': HardHat,
  'residential-projects': Home,
  'commercial-projects': Building2,
  'industrial-structures': Factory,
  'institutional-buildings': Landmark,
}

function ServiceCard({ service, index }) {
  const tilt = useTilt({ max: 6, scale: 1.025 })
  const Icon = ICONS[service.id]
  const floatOffset = index % 3 === 0 ? 0 : index % 3 === 1 ? 14 : -10

  return (
    <motion.div
      variants={fadeUp}
      style={{ marginTop: floatOffset }}
      className="[perspective:1200px]"
    >
      <motion.div
        ref={tilt.ref}
        {...tilt.handlers}
        style={tilt.style}
        whileHover={{ y: -10, scale: tilt.hoverScale }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="glass glass-sheen group relative flex h-full flex-col overflow-hidden rounded-lg p-7 shadow-md transition-shadow duration-500 hover:shadow-lg [transform-style:preserve-3d]"
      >
        {/* Cursor-follow glow */}
        <motion.div
          className="pointer-events-none absolute -inset-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(180px circle at ${tilt.glowX} ${tilt.glowY}, rgba(201,163,78,0.16), transparent 70%)`,
          }}
        />

        {/* Faint internal blueprint grid */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]">
          <defs>
            <pattern id={`svc-grid-${service.id}`} width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M18 0H0V18" fill="none" stroke="#0b2545" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#svc-grid-${service.id})`} />
        </svg>

        {/* Animated line-draw icon */}
        <div className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-md border border-ink-50/12 text-concrete-500 transition-colors duration-300 group-hover:border-concrete-500/50">
          <svg className="absolute inset-0 h-full w-full">
            <motion.rect
              x="1"
              y="1"
              width="46"
              height="46"
              rx="6"
              fill="none"
              stroke="#c9a34e"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileHover={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          </svg>
          <Icon className="relative h-5 w-5" strokeWidth={1.5} />
        </div>

        <h3 className="relative font-display text-lg font-medium text-ink-50">{service.title}</h3>
        <p className="relative mt-2.5 text-sm leading-relaxed text-ink-400">{service.description}</p>

        <div className="relative mt-auto pt-6">
          <span className="h-px w-full origin-left scale-x-0 bg-concrete-500/50 transition-transform duration-500 group-hover:scale-x-100" />
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-structural-950 py-32 sm:py-40">
      <BlueprintBackdrop />
      <AmbientParticles count={16} />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Services"
          title="Engineering solutions, precisely scoped."
          description="From first calculation to final inspection — structural consultancy across every building type."
          align="center"
          className="mx-auto"
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
