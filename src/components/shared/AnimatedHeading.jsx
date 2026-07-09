import { motion } from 'framer-motion'

/**
 * Word-by-word staggered heading used by page heroes and section intros
 * that want more presence than SectionHeading's inline fade-up.
 */
export function AnimatedHeading({ as: Tag = 'h1', text, className, delay = 0 }) {
  const words = text.split(' ')
  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-1 align-top">
            <motion.span
              className="inline-block"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + i * 0.06,
              }}
            >
              {word}
              {i < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  )
}
