import { ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Logo } from '../../components/shared/Logo'
import { MagneticButton } from '../../components/ui/MagneticButton'
import { NAV_LINKS } from '../Navbar/NavLinks'
import { SERVICES } from '../../data/services'
import { Divider } from '../../components/shared/Divider'


function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-structural-950 pt-20">
      <Divider />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <Logo />
              <span className="font-display text-sm font-semibold leading-tight tracking-wide text-ink-50">
                ATUL KUDTARKAR
                <span className="block text-[10px] font-normal tracking-[0.2em] text-ink-500">
                  &amp; ASSOCIATES
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-500">
              Structural engineering consultancy delivering safe, precise and lasting
              structures across Maharashtra.
            </p>
          </div>

          <div>
            <p className="font-display text-xs tracking-[0.2em] text-ink-500">QUICK LINKS</p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-ink-300 transition-colors hover:text-concrete-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-xs tracking-[0.2em] text-ink-500">SERVICES</p>
            <ul className="mt-5 space-y-3">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.id}`}
                    className="text-sm text-ink-300 transition-colors hover:text-concrete-300"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-xs tracking-[0.2em] text-ink-500">CONTACT</p>
            <div className="mt-5 space-y-3 text-sm leading-relaxed text-ink-300">
              <p>202/203 Shree Yash Apartment, Above Monginis, Near Railway Station, Badlapur East, Thane, Maharashtra 421503</p>
              <p>+91 98765 43210</p>
              <p>info@atulkudtarkar.com</p>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row sm:px-8">
        <p className="text-xs text-ink-500">
          &copy; {new Date().getFullYear()} Atul Kudtarkar &amp; Associates. All rights reserved.
        </p>

        <MagneticButton strength={0.3}>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-50/15 text-ink-50 transition-colors hover:border-concrete-500/60 hover:text-concrete-300"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </MagneticButton>
      </div>
    </footer>
  )
}
