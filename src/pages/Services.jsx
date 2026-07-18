import { PageHero } from '../components/shared/PageHero'
import { SectionWrapper } from '../components/shared/SectionWrapper'
import { AnimatedGrid } from '../components/shared/AnimatedGrid'
import { GlassCard } from '../components/shared/GlassCard'
import { SEO } from '../components/seo/SEO'
import { SERVICES } from '../data/services'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  PencilRuler,
  Layers,
  SearchCheck,
  HardHat,
  Home as HomeIcon,
  Building2,
  Factory,
  Landmark,
} from 'lucide-react'

const SERVICE_ICONS = {
  'structural-design': PencilRuler,
  'rcc-design': Layers,
  'structural-audit': SearchCheck,
  'construction-consultancy': HardHat,
  'residential-projects': HomeIcon,
  'commercial-projects': Building2,
  'industrial-structures': Factory,
  'institutional-buildings': Landmark,
}

export function Services() {
  return (
    <>
      <SEO
        title="Services"
        description="Structural design, RCC design, structural audits and construction consultancy from Atul Kudtarkar & Associates."
        path="/services"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: SERVICES.map((s, i) => ({ '@type': 'Service', position: i + 1, name: s.title })),
        }}
      />
      <PageHero
        image="/images/services-banner.jpeg"
        eyebrow="Services"
        title="Structural engineering, end to end"
        description="From first sketch to final certification — structural design, audits and on-site consultancy for residential, commercial, industrial and institutional projects."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
      />
      <SectionWrapper>
        <AnimatedGrid
          items={SERVICES}
          columns={3}
          renderItem={(service) => {
            const Icon = SERVICE_ICONS[service.id] ?? PencilRuler
            return (
              <Link to={`/services/${service.id}`} className="group block h-full">
                <GlassCard className="flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md border border-concrete-500/25 bg-concrete-500/10">
                      <Icon className="h-6 w-6 text-concrete-500" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-ink-50">{service.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-300">{service.description}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 font-display text-sm font-medium text-ink-50">
                    Learn More
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                  </div>
                </GlassCard>
              </Link>
            )
          }}
        />
      </SectionWrapper>
    </>
  )
}
