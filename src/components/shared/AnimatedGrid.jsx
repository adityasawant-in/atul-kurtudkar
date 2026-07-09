import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '../../animations/framer/variants'
import { cn } from '../../utils/cn'

/**
 * Stagger-in grid wrapper shared by Services, Projects and any other
 * card-grid listing so the reveal animation stays consistent site-wide.
 */
export function AnimatedGrid({ items, renderItem, columns = 3, className, keyField = 'id' }) {
  const colClass =
    columns === 2 ? 'sm:grid-cols-2' : columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={cn('grid grid-cols-1 gap-6', colClass, className)}
    >
      {items.map((item, i) => (
        <motion.div key={item[keyField] ?? i} variants={fadeUp}>
          {renderItem(item, i)}
        </motion.div>
      ))}
    </motion.div>
  )
}
