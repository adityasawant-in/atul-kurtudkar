import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PremiumButton } from '../ui/PremiumButton'
import { SectionWrapper } from './SectionWrapper'

/**
 * Full-bleed photographic CTA band, reused at the end of Projects,
 * Project Detail, and Service Detail pages. Deliberately uses real dark
 * colors for the scrim (not the site's structural-950 token, which now
 * means "light") since this sits over a photo and needs guaranteed text
 * contrast regardless of what's in the image — same reasoning as the
 * Hero section's scrim.
 */
export function CtaBanner({
  image,
  eyebrow = 'Let\u2019s Build Something',
  title,
  buttonLabel = 'Start a Conversation',
  buttonTo = '/contact',
}) {
  return (
    <SectionWrapper className="relative overflow-hidden">
      <img
        src={image}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#050c17]/72" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050c17]/80 via-transparent to-[#050c17]/30" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center"
      >
        {eyebrow && (
          <p className="mb-4 font-display text-xs font-medium tracking-[0.2em] text-concrete-300">
            {eyebrow.toUpperCase()}
          </p>
        )}
        <h3 className="mx-auto max-w-xl font-display text-3xl font-semibold text-white sm:text-4xl">{title}</h3>
        <div className="mt-8 flex justify-center">
          <PremiumButton as={Link} to={buttonTo}>
            {buttonLabel}
          </PremiumButton>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}
