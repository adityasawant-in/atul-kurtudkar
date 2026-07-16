import { motion } from 'framer-motion'

/**
 * A 1px blueprint measurement line that draws itself across the seam
 * between two sections, with a soft vertical gradient blending the two
 * section backgrounds into each other. Purely decorative, placed at
 * `top-0` of the section that follows it — keeps the "hard cut" feeling
 * out of an otherwise block-colored page without touching each section's
 * own internal layout. Defaults are the site's light surface tones
 * (--color-structural-950 / --color-structural-900) — this site is
 * light-only.
 */
export function SectionSeam({ from = '#f8fafc', to = '#eef2f6' }) {
  return (
    <div className="pointer-events-none relative z-10 h-16 w-full overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(to bottom, ${from}, ${to})` }}
      />
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.4 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-1/2 h-px w-full origin-center -translate-x-1/2 -translate-y-1/2"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #c9a34e 0 6px, transparent 6px 14px)',
        }}
      />
    </div>
  )
}
