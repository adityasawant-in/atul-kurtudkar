import { useMemo, useState } from 'react'
import { PageHero } from '../components/shared/PageHero'
import { SectionWrapper } from '../components/shared/SectionWrapper'
import { AnimatedGrid } from '../components/shared/AnimatedGrid'
import { ProjectCard } from '../components/shared/ProjectCard'
import { ProjectFilter } from '../components/projects/ProjectFilter'
import { CtaBanner } from '../components/shared/CtaBanner'
import { SEO } from '../components/seo/SEO'
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projects'

export function Projects() {
  const [active, setActive] = useState('All')

  const filtered = useMemo(
    () => (active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === active)),
    [active]
  )

  return (
    <>
      <SEO
        title="Projects"
        description="Structural engineering projects delivered by Atul Kudtarkar & Associates across residential, commercial, industrial and institutional sectors."
        path="/projects"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: PROJECTS.map((p, i) => ({ '@type': 'CreativeWork', position: i + 1, name: p.name })),
        }}
      />
      <PageHero
        eyebrow="Projects"
        title="Structures we've engineered across Maharashtra"
        description="A cross-section of residential, commercial, industrial and institutional work — plus structural audits and consultancy engagements."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Projects' }]}
      />
      <SectionWrapper>
        <ProjectFilter categories={PROJECT_CATEGORIES} active={active} onChange={setActive} />
        <div className="mt-10">
          {filtered.length > 0 ? (
            <AnimatedGrid items={filtered} keyField="slug" renderItem={(project) => <ProjectCard project={project} />} />
          ) : (
            <p className="py-16 text-center text-ink-300">No projects found in this category yet.</p>
          )}
        </div>
      </SectionWrapper>
      <CtaBanner
        image="/images/cta-site-banner.jpeg"
        title="Ready to start engineering your next project?"
      />
    </>
  )
}
