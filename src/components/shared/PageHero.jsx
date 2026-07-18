import { motion } from 'framer-motion'
import { AnimatedHeading } from './AnimatedHeading'
import { Breadcrumbs } from './Breadcrumbs'
import { BlueprintBackdrop } from './BlueprintBackdrop'

/**
 * Shared hero band for every top-level page (About/Services/Projects/
 * Contact/detail pages) — reuses the existing blueprint backdrop so new
 * pages read as part of the same site, not a bolted-on template.
 *
 * Pass `image` to swap the plain blueprint backdrop for a real photo
 * (dark scrim + white text) — used sparingly, only where a page genuinely
 * benefits from a photographic lead (Services, Contact), not on every page.
 */
export function PageHero({ eyebrow, title, description, breadcrumbs, image, children }) {
  return (
    <section className="relative flex min-h-[100dvh] w-full items-end overflow-hidden pb-20 pt-40">
      {image ? (
        <>
          <img
            src={image}
            alt=""
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
          />
          <div className="absolute inset-0 bg-[#050c17]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050c17]/85 via-[#050c17]/30 to-transparent" />
        </>
      ) : (
        <BlueprintBackdrop className="opacity-40" />
      )}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-8" light={!!image} />}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-5 flex items-center gap-3"
        >
          <span className="font-display text-xs font-medium tracking-[0.2em] text-concrete-300">
            {eyebrow.toUpperCase()}
          </span>
          <span className={`h-px w-8 ${image ? 'bg-white/25' : 'bg-ink-50/20'}`} />
        </motion.div>
        <AnimatedHeading
          text={title}
          className={`max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-6xl lg:text-7xl ${image ? 'text-white' : 'text-ink-50'}`}
        />
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`mt-6 max-w-xl text-base leading-relaxed sm:text-lg ${image ? 'text-white/75' : 'text-ink-300'}`}
          >
            {description}
          </motion.p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  )
}