import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { GlassCard } from './GlassCard'

export function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="group block h-full">
      <GlassCard className="flex h-full flex-col justify-between">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="font-display text-xs font-medium tracking-[0.15em] text-concrete-500">
              {project.category.toUpperCase()}
            </span>
            <span className="font-display text-xs text-ink-500">{project.year}</span>
          </div>
          <h3 className="font-display text-xl font-semibold leading-snug text-ink-50">{project.name}</h3>
          <p className="mt-2 text-sm text-ink-300">{project.location}</p>
          <p className="mt-4 text-sm leading-relaxed text-ink-300 line-clamp-3">{project.description}</p>
        </div>
        <div className="mt-6 flex items-center gap-2 font-display text-sm font-medium text-ink-50">
          View Project
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
        </div>
      </GlassCard>
    </Link>
  )
}
