import { useEffect, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Logo } from '../../components/shared/Logo'
import { NavLinks } from './NavLinks'
import { MobileMenu } from './MobileMenu'
import { Button } from '../../components/ui/Button'
import { MagneticButton } from '../../components/ui/MagneticButton'
import { navSlide } from '../../animations/framer/variants'
import { NAV } from '../../constants/animationConfig'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > NAV.scrollThreshold)
  })

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        variants={navSlide}
        initial="hidden"
        animate="show"
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6"
      >
        <motion.nav
          animate={{
            height: scrolled ? NAV.heightScrolled : NAV.heightIdle,
            paddingInline: scrolled ? 20 : 28,
          }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="glass flex w-full max-w-6xl items-center justify-between rounded-full shadow-md"
          style={{
            backdropFilter: `blur(${scrolled ? 24 : 14}px) saturate(140%)`,
            WebkitBackdropFilter: `blur(${scrolled ? 24 : 14}px) saturate(140%)`,
          }}
        >
          <Link to="/" className="flex items-center gap-2.5">
            <Logo />
            <span className="hidden font-display text-sm font-semibold leading-tight tracking-wide text-ink-50 sm:block">
              ATUL KUDTARKAR
              <span className="block text-[10px] font-normal tracking-[0.2em] text-ink-300">
                &amp; ASSOCIATES
              </span>
            </span>
          </Link>

          <NavLinks />

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <Button as={Link} to="/contact" variant="primary" className="px-6 py-2.5 text-xs">
                Get Consultation
              </Button>
            </div>

            <MagneticButton strength={0.3} className="lg:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-50/15 text-ink-50"
              >
                <Menu className="h-4.5 w-4.5" />
              </button>
            </MagneticButton>
          </div>
        </motion.nav>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
