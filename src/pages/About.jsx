import { PageHero } from '../components/shared/PageHero'
import { SectionWrapper } from '../components/shared/SectionWrapper'
import { SectionHeading } from '../components/shared/SectionHeading'
import { Timeline } from '../components/shared/Timeline'
import { GlassCard } from '../components/shared/GlassCard'
import { GlassPanel } from '../components/shared/GlassPanel'
import { AnimatedGrid } from '../components/shared/AnimatedGrid'
import { CtaBanner } from '../components/shared/CtaBanner'
import { SEO } from '../components/seo/SEO'
import { WHY_CHOOSE_US } from '../data/whyChooseUs'

const CORE_VALUES = [
  { id: 'integrity', title: 'Structural Integrity', description: 'Every design carries a safety margin we would stand behind with our own name.' },
  { id: 'precision', title: 'Precision', description: 'Calculations, detailing and site supervision held to the same exacting standard.' },
  { id: 'transparency', title: 'Transparency', description: 'Clients see the reasoning behind every structural decision, not just the drawing.' },
  { id: 'accountability', title: 'Accountability', description: 'We supervise what we design — engineering doesn\'t end at the drawing board.' },
]

const COMPANY_TIMELINE = [
  { label: 'Practice Founded', date: 'Est.', description: 'Atul Kudtarkar & Associates opens its first structural consultancy practice.' },
  { label: 'First Institutional Project', date: 'Growth', description: 'Delivered our first municipal-scale structural consultancy engagement.' },
  { label: 'Expanded Industrial Practice', date: 'Growth', description: 'Extended into long-span steel and industrial structural design.' },
  { label: 'Structural Audit Division', date: 'Today', description: 'Formalised a dedicated structural audit and rehabilitation practice.' },
]

const LEADERSHIP = [
  {
    id: 'atul-kudtarkar',
    name: 'Atul Kudtarkar',
    role: 'Principal Structural Engineer',
    bio: 'Leads structural design and statutory approvals across every project the practice takes on.',
    photo: '/images/leadership-principal-engineer.jpeg',
  },
]

export function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Atul Kudtarkar & Associates — structural engineering consultancy built on precision, transparency and long-term accountability."
        path="/about"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Atul Kudtarkar & Associates',
        }}
      />
      <PageHero
        eyebrow="About Us"
        title="Engineering built to last, not just to pass inspection"
        description="A structural engineering consultancy grounded in precision, transparency and a belief that good structural design is invisible until you need it most."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      />

      <SectionWrapper>
        <SectionHeading index="01" eyebrow="Our Story" title="Built on structural rigor, project after project" />
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-ink-300">
              Atul Kudtarkar &amp; Associates began as a small structural consultancy and grew, project by project, into
              a practice trusted with municipal, residential, commercial and industrial work across Maharashtra.
              Every engagement — from a single bungalow to a multi-storey civic building — is held to the same
              structural discipline.
            </p>
            <p className="text-base leading-relaxed text-ink-300">
              Our engineering philosophy is simple: a structure should perform exactly as designed for the whole of
              its service life, and the client should understand why. That means calculations that hold up to
              scrutiny, detailing that survives contact with a real construction site, and supervision that catches
              problems before they're poured in concrete.
            </p>
          </div>
          <GlassPanel className="aspect-[4/3] w-full">
            <img
              src="/images/about-office-team.jpeg"
              alt="Atul Kudtarkar & Associates team reviewing structural drawings"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </GlassPanel>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-ink-50/[0.02]">
        <div className="grid gap-8 lg:grid-cols-2">
          <GlassCard>
            <h3 className="font-display text-2xl font-semibold text-ink-50">Mission</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-300">
              To deliver structural engineering that is safe, efficient and built to the realities of the site —
              not just the drawing board — for every client regardless of project scale.
            </p>
          </GlassCard>
          <GlassCard>
            <h3 className="font-display text-2xl font-semibold text-ink-50">Vision</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-300">
              To be the structural consultancy Maharashtra's developers, institutions and homeowners default to
              when a project genuinely needs to be engineered right.
            </p>
          </GlassCard>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading index="02" eyebrow="Engineering Philosophy" title="Design for the site, not just the drawing" description="Structural design that ignores buildability is a liability wearing a calculation. Every scheme we issue is checked against how it will actually be built." />
      </SectionWrapper>

      <SectionWrapper className="bg-ink-50/[0.02]">
        <SectionHeading index="03" eyebrow="Core Values" title="What guides every project we take on" />
        <div className="mt-10">
          <AnimatedGrid items={CORE_VALUES} columns={4} renderItem={(v) => (
            <GlassCard className="h-full">
              <h4 className="font-display text-lg font-semibold text-ink-50">{v.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">{v.description}</p>
            </GlassCard>
          )} />
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading index="04" eyebrow="Leadership" title="The engineer behind every project" />
        <div className="mt-10">
          <AnimatedGrid items={LEADERSHIP} columns={3} renderItem={(person) => (
            <GlassCard>
              <div className="mb-5 h-16 w-16 overflow-hidden rounded-full border border-concrete-500/30">
                <img
                  src={person.photo}
                  alt={person.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <h4 className="font-display text-lg font-semibold text-ink-50">{person.name}</h4>
              <p className="mt-1 font-display text-xs tracking-[0.15em] text-concrete-500">{person.role.toUpperCase()}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-300">{person.bio}</p>
            </GlassCard>
          )} />
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-ink-50/[0.02]">
        <SectionHeading index="05" eyebrow="Our Journey" title="From first project to full-scale consultancy" />
        <div className="mt-10">
          <Timeline items={COMPANY_TIMELINE} />
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading index="06" eyebrow="Why Clients Choose Us" title="Reasons clients come back for their next project" />
        <div className="mt-10">
          <AnimatedGrid
            items={WHY_CHOOSE_US}
            columns={3}
            keyField="title"
            renderItem={(item) => (
              <GlassCard className="h-full">
                <h4 className="font-display text-lg font-semibold text-ink-50">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{item.description}</p>
              </GlassCard>
            )}
          />
        </div>
      </SectionWrapper>

      <CtaBanner
        image="/images/cta-site-banner.jpeg"
        title="Ready to bring structural rigor to your next project?"
      />
    </>
  )
}
