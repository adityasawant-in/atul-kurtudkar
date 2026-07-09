import { PageHero } from '../components/shared/PageHero'
import { SectionWrapper } from '../components/shared/SectionWrapper'
import { AnimatedGrid } from '../components/shared/AnimatedGrid'
import { GlassCard } from '../components/shared/GlassCard'
import { SEO } from '../components/seo/SEO'
import { SERVICES } from '../data/services'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

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
        eyebrow="Services"
        title="Structural engineering, end to end"
        description="From first sketch to final certification — structural design, audits and on-site consultancy for residential, commercial, industrial and institutional projects."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
      />
      <SectionWrapper>
        <AnimatedGrid
          items={SERVICES}
          columns={3}
          renderItem={(service) => (
            <Link to={`/services/${service.id}`} className="group block h-full">
              <GlassCard className="flex h-full flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink-50">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-300">{service.description}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 font-display text-sm font-medium text-ink-50">
                  Learn More
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                </div>
              </GlassCard>
            </Link>
          )}
        />
      </SectionWrapper>
    </>
  )
}
