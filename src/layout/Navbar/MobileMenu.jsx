import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { NAV_LINKS } from './NavLinks'
import { Button } from '../../components/ui/Button'
import {
  mobileMenuPanel,
  mobileLinkItem,
  staggerContainer,
} from '../../animations/framer/variants'

export function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-x-4 top-4 z-[60] lg:hidden"
          variants={mobileMenuPanel}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <div className="glass rounded-3xl px-7 pb-10 pt-7 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-semibold tracking-wide text-ink-50">
                Menu
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-50/15 text-ink-50 transition-colors hover:border-concrete-500/60 hover:text-concrete-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <motion.ul
              variants={staggerContainer(0.06, 0.1)}
              initial="hidden"
              animate="show"
              className="mt-10 flex flex-col gap-1"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.li key={link.label} variants={mobileLinkItem}>
                  <Link
                    to={link.to}
                    onClick={onClose}
                    className="flex items-baseline gap-4 border-b border-ink-50/8 py-4 font-display text-3xl font-medium text-ink-50 transition-colors hover:text-concrete-300"
                  >
                    <span className="text-xs font-normal text-ink-500">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={mobileLinkItem} className="mt-9">
              <Button as={Link} to="/contact" onClick={onClose} className="w-full justify-center">
                Get Consultation
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
