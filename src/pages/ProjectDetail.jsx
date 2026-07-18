import { useParams, Navigate } from 'react-router-dom'
import { PageHero } from '../components/shared/PageHero'
import { SectionWrapper } from '../components/shared/SectionWrapper'
import { SectionHeading } from '../components/shared/SectionHeading'
import { Timeline } from '../components/shared/Timeline'
import { StatisticsCard } from '../components/shared/StatisticsCard'
import { ProjectCard } from '../components/shared/ProjectCard'
import { CtaBanner } from '../components/shared/CtaBanner'
import { AnimatedGrid } from '../components/shared/AnimatedGrid'
import { SEO } from '../components/seo/SEO'
import { getProjectBySlug, getRelatedProjects, getProjectImage } from '../data/projects'

export function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) return <Navigate to="/projects" replace />

  const related = getRelatedProjects(project)
  const mapQuery = encodeURIComponent(project.location)

  return (
    <>
      <SEO
        title={project.name}
        description={project.description}
        path={`/projects/${project.slug}`}
        type="article"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.name,
          description: project.description,
          locationCreated: project.location,
        }}
      />
      <PageHero
        eyebrow={project.category}
        title={project.name}
        description={project.description}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Projects', to: '/projects' }, { label: project.name }]}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg border border-ink-50/10">
          <img
            src={getProjectImage(project)}
            alt={project.name}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <SectionWrapper>
        <SectionHeading index="01" eyebrow="Project Overview" title="What the project involved" description={project.overview} />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {project.stats.map((stat) => (
            <StatisticsCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-ink-50/[0.02]">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading index="02" eyebrow="Engineering Challenges" title="What made this project difficult" />
            <ul className="mt-8 space-y-4">
              {project.challenges.map((c) => (
                <li key={c} className="flex gap-3 text-sm leading-relaxed text-ink-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-500" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading index="03" eyebrow="Structural Solutions" title="How we engineered around it" />
            <ul className="mt-8 space-y-4">
              {project.solutions.map((s) => (
                <li key={s} className="flex gap-3 text-sm leading-relaxed text-ink-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-concrete-500" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading index="04" eyebrow="Construction Timeline" title="How the project came together" />
        <div className="mt-10">
          <Timeline items={project.timeline} />
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-ink-50/[0.02]">
        <SectionHeading index="05" eyebrow="Location" title={project.location} />
        <div className="mt-8 overflow-hidden rounded-lg border border-ink-50/10">
          <iframe
            title={`Map location for ${project.name}`}
            src={`https://maps.google.com/maps?q=${mapQuery}&z=13&output=embed`}
            className="h-80 w-full grayscale-[0.15] contrast-[1.02]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </SectionWrapper>

      {related.length > 0 && (
        <SectionWrapper>
          <SectionHeading eyebrow="Related Projects" title="More work in this space" />
          <div className="mt-10">
            <AnimatedGrid items={related} keyField="slug" renderItem={(p) => <ProjectCard project={p} />} />
          </div>
        </SectionWrapper>
      )}

      <CtaBanner
        image="/images/cta-site-banner.jpeg"
        title="Have a project that needs structural engineering like this?"
      />
    </>
  )
}
