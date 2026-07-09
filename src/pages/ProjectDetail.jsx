import { useParams, Navigate, Link } from 'react-router-dom'
import { PageHero } from '../components/shared/PageHero'
import { SectionWrapper } from '../components/shared/SectionWrapper'
import { SectionHeading } from '../components/shared/SectionHeading'
import { Timeline } from '../components/shared/Timeline'
import { StatisticsCard } from '../components/shared/StatisticsCard'
import { ProjectCard } from '../components/shared/ProjectCard'
import { AnimatedGrid } from '../components/shared/AnimatedGrid'
import { PremiumButton } from '../components/ui/PremiumButton'
import { SEO } from '../components/seo/SEO'
import { getProjectBySlug, getRelatedProjects } from '../data/projects'

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
        <SectionHeading index="05" eyebrow="Project Gallery" title="Selected moments from the build" />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {project.gallery.map((item) => (
            <div
              key={item.caption}
              className="glass relative flex aspect-[4/3] items-end overflow-hidden rounded-lg p-3"
            >
              {item.image && (
                <img src={item.image} alt={item.caption} className="absolute inset-0 h-full w-full object-cover" />
              )}
              <span className="relative z-10 font-display text-xs text-ink-300">{item.caption}</span>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading index="06" eyebrow="Location" title={project.location} />
        <div className="mt-8 overflow-hidden rounded-lg border border-ink-50/10">
          <iframe
            title={`Map location for ${project.name}`}
            src={`https://maps.google.com/maps?q=${mapQuery}&z=13&output=embed`}
            className="h-80 w-full grayscale invert-[0.92] contrast-[1.1]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </SectionWrapper>

      {related.length > 0 && (
        <SectionWrapper className="bg-ink-50/[0.02]">
          <SectionHeading eyebrow="Related Projects" title="More work in this space" />
          <div className="mt-10">
            <AnimatedGrid items={related} keyField="slug" renderItem={(p) => <ProjectCard project={p} />} />
          </div>
        </SectionWrapper>
      )}

      <SectionWrapper className="text-center">
        <h3 className="mx-auto max-w-xl font-display text-3xl font-semibold text-ink-50 sm:text-4xl">
          Have a project that needs structural engineering like this?
        </h3>
        <div className="mt-8 flex justify-center">
          <PremiumButton as={Link} to="/contact">
            Start a Conversation
          </PremiumButton>
        </div>
      </SectionWrapper>
    </>
  )
}
