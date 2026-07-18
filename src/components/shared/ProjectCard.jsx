import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { GlassPanel } from './GlassPanel'
import { getProjectImage } from '../../data/projects'

export function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="group block h-full">
      <GlassPanel
        as={motion.div}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="glass-sheen flex h-full flex-col"
      >
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={getProjectImage(project)}
            alt={project.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between p-6">
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
        </div>
      </GlassPanel>
    </Link>
  )
}
