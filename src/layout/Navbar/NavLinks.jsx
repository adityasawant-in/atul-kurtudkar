import { useState } from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { cn } from '../../utils/cn'

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

export function NavLinks({ className }) {
  const [hovered, setHovered] = useState(null)

  return (
    <ul className={cn('hidden items-center gap-9 lg:flex', className)}>
      {NAV_LINKS.map((link) => (
        <li
          key={link.label}
          className="relative"
          onMouseEnter={() => setHovered(link.label)}
          onMouseLeave={() => setHovered(null)}
        >
          <NavLink
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              cn(
                'font-display text-sm font-medium tracking-wide transition-colors duration-300 hover:text-ink-50',
                isActive ? 'text-ink-50' : 'text-ink-100/85'
              )
            }
          >
            {link.label}
          </NavLink>
          <motion.span
            className="absolute -bottom-1.5 left-0 h-px w-full bg-concrete-500 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: hovered === link.label ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        </li>
      ))}
    </ul>
  )
}
