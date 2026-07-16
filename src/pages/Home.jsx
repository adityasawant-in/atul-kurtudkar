import { lazy, Suspense } from 'react'
import { SEO } from '../components/seo/SEO'
import { Hero } from '../sections/home/Hero'
import { BuildingConstructionScene } from '../sections/home/BuildingConstructionScene'
import { CompanyOverview } from '../sections/home/CompanyOverview'
import { Services } from '../sections/home/Services'
import { SectionSeam } from '../components/shared/SectionSeam'

// Below-the-fold sections are code-split so the initial bundle only has to
// parse/execute what's needed for the hero + construction experience (the
// two things every visitor sees immediately). Each of these resolves in a
// handful of milliseconds off a warm cache, but keeping them out of the
// critical path measurably helps first-load JS on slower connections.
const FeaturedProject = lazy(() =>
  import('../sections/home/FeaturedProject').then((m) => ({ default: m.FeaturedProject }))
)
const EngineeringProcess = lazy(() =>
  import('../sections/home/EngineeringProcess').then((m) => ({ default: m.EngineeringProcess }))
)
const Statistics = lazy(() =>
  import('../sections/home/Statistics').then((m) => ({ default: m.Statistics }))
)
const WhyChooseUs = lazy(() =>
  import('../sections/home/WhyChooseUs').then((m) => ({ default: m.WhyChooseUs }))
)
const Testimonials = lazy(() =>
  import('../sections/home/Testimonials').then((m) => ({ default: m.Testimonials }))
)
const Contact = lazy(() => import('../sections/home/Contact').then((m) => ({ default: m.Contact })))
const Footer = lazy(() =>
  import('../layout/Footer/Footer').then((m) => ({ default: m.Footer }))
)

// Light surface colors used to blend adjacent sections at the seam —
// mirrors the --color-structural-950 / --color-structural-900 tokens
// (see tokens.css). This site is light-only; these are intentionally
// light values, not the old dark navy ones.
const STRUCTURAL_950 = '#f8fafc'
const STRUCTURAL_900 = '#eef2f6'

// A near-invisible min-height placeholder rather than a visible skeleton —
// these sections load fast enough that a skeleton would just flash, but the
// reserved height still prevents cumulative layout shift while they do.
function SectionFallback() {
  return <div className="min-h-[40vh] w-full bg-structural-950" aria-hidden="true" />
}

export function Home() {
  return (
    <>
      <SEO
        title="Structural Engineering Consultants"
        description="Atul Kudtarkar & Associates — structural design, RCC design, structural audits and construction consultancy across Maharashtra."
        path="/"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Atul Kudtarkar & Associates',
          description: 'Structural engineering consultancy.',
        }}
      />
      <Hero />
      <BuildingConstructionScene />
      <CompanyOverview />
      <Services />

      <SectionSeam from={STRUCTURAL_950} to={STRUCTURAL_900} />
      <Suspense fallback={<SectionFallback />}>
        <FeaturedProject />
      </Suspense>

      <SectionSeam from={STRUCTURAL_900} to={STRUCTURAL_950} />
      <Suspense fallback={<SectionFallback />}>
        <EngineeringProcess />
      </Suspense>

      <SectionSeam from={STRUCTURAL_950} to={STRUCTURAL_900} />
      <Suspense fallback={<SectionFallback />}>
        <Statistics />
      </Suspense>

      <SectionSeam from={STRUCTURAL_900} to={STRUCTURAL_950} />
      <Suspense fallback={<SectionFallback />}>
        <WhyChooseUs />
      </Suspense>

      <SectionSeam from={STRUCTURAL_950} to={STRUCTURAL_900} />
      <Suspense fallback={<SectionFallback />}>
        <Testimonials />
      </Suspense>

      <SectionSeam from={STRUCTURAL_900} to={STRUCTURAL_950} />
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}
