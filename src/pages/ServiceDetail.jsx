import { useParams, Navigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { PageHero } from '../components/shared/PageHero'
import { SectionWrapper } from '../components/shared/SectionWrapper'
import { SectionHeading } from '../components/shared/SectionHeading'
import { GlassCard } from '../components/shared/GlassCard'
import { Timeline } from '../components/shared/Timeline'
import { PremiumButton } from '../components/ui/PremiumButton'
import { SEO } from '../components/seo/SEO'
import { getServiceById, SERVICES } from '../data/services'

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <GlassCard className="cursor-pointer" onClick={() => setOpen((o) => !o)}>
      <div className="flex items-center justify-between gap-4">
        <h4 className="font-display text-base font-semibold text-ink-50">{q}</h4>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-concrete-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          strokeWidth={2}
        />
      </div>
      {open && <p className="mt-3 text-sm leading-relaxed text-ink-300">{a}</p>}
    </GlassCard>
  )
}

export function ServiceDetail() {
  const { serviceId } = useParams()
  const service = getServiceById(serviceId)

  if (!service) return <Navigate to="/services" replace />

  return (
    <>
      <SEO
        title={service.title}
        description={service.description}
        path={`/services/${service.id}`}
        type="article"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.description,
          provider: { '@type': 'Organization', name: 'Atul Kudtarkar & Associates' },
        }}
      />
      <PageHero
        eyebrow="Service"
        title={service.title}
        description={service.overview}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: service.title }]}
      />

      <SectionWrapper>
        <SectionHeading index="01" eyebrow="Process" title="How the engagement runs" />
        <div className="mt-10">
          <Timeline items={service.process.map((p) => ({ label: p.title, description: p.detail }))} />
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-ink-50/[0.02]">
        <SectionHeading index="02" eyebrow="Benefits" title="What this means for your project" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {service.benefits.map((benefit) => (
            <GlassCard key={benefit}>
              <p className="text-sm leading-relaxed text-ink-300">{benefit}</p>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading index="03" eyebrow="Technologies & Standards" title="Tools and codes we design against" />
        <div className="mt-8 flex flex-wrap gap-3">
          {service.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-ink-50/15 px-4 py-2 font-display text-xs tracking-wide text-ink-100"
            >
              {tech}
            </span>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-ink-50/[0.02]">
        <SectionHeading index="04" eyebrow="FAQ" title="Frequently asked questions" />
        <div className="mt-10 space-y-4">
          {service.faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="text-center">
        <h3 className="mx-auto max-w-xl font-display text-3xl font-semibold text-ink-50 sm:text-4xl">
          Ready to discuss your {service.title.toLowerCase()} project?
        </h3>
        <div className="mt-8 flex justify-center">
          <PremiumButton as={Link} to="/contact">
            Request a Consultation
          </PremiumButton>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading eyebrow="Other Services" title="Explore more of what we do" />
        <div className="mt-10 flex flex-wrap gap-3">
          {SERVICES.filter((s) => s.id !== service.id).slice(0, 4).map((s) => (
            <Link
              key={s.id}
              to={`/services/${s.id}`}
              className="rounded-full border border-ink-50/15 px-5 py-2.5 font-display text-sm text-ink-100 transition-colors hover:border-concrete-500/70 hover:text-concrete-300"
            >
              {s.title}
            </Link>
          ))}
        </div>
      </SectionWrapper>
    </>
  )
}
