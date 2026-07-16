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
        <>
          {/* Background Overlay */}
          <motion.div
            className="fixed inset-0 z-[59] bg-structural-500/25 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Mobile Menu */}
          <motion.div
            className="fixed inset-x-4 top-4 z-[60] lg:hidden"
            variants={mobileMenuPanel}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <div
              className="
                rounded-3xl
                border
                border-structural-500/10
                bg-white/95
                backdrop-blur-3xl
                px-7
                pb-10
                pt-7
                shadow-[0_30px_80px_rgba(11,37,69,0.18)]
              "
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-semibold tracking-wide text-ink-50">
                  Menu
                </span>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-structural-500/12
                    bg-structural-500/5
                    text-ink-50
                    transition-all
                    duration-300
                    hover:rotate-90
                    hover:bg-structural-500/10
                    hover:text-concrete-600
                  "
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
                      className="
                        flex
                        items-baseline
                        gap-4
                        rounded-xl
                        border-b
                        border-structural-500/10
                        px-2
                        py-4
                        font-display
                        text-3xl
                        font-medium
                        text-ink-50
                        transition-all
                        duration-300
                        hover:bg-structural-500/5
                        hover:pl-5
                        hover:text-concrete-600
                      "
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
                <Button
                  as={Link}
                  to="/contact"
                  onClick={onClose}
                  className="w-full justify-center"
                >
                  Get Consultation
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
