import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { PROJECTS } from '../../data/projects'
import { SERVICES } from '../../data/services'
import { GlassPanel } from '../shared/GlassPanel'

/**
 * Global Cmd/Ctrl+K search across projects and services. Mounted once in
 * App.jsx; opened either via the shortcut or the Navbar search trigger.
 */
export function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return { projects: [], services: [] }
    return {
      projects: PROJECTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      ).slice(0, 5),
      services: SERVICES.filter(
        (s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      ).slice(0, 5),
    }
  }, [query])

  const hasResults = results.projects.length > 0 || results.services.length > 0

  function goTo(path) {
    navigate(path)
    onClose()
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-structural-950/70 px-4 pt-24 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl"
          >
            <GlassPanel className="p-2">
              <div className="flex items-center gap-3 border-b border-ink-50/10 px-4 py-3">
                <Search className="h-4 w-4 text-ink-300" strokeWidth={2} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects and services…"
                  className="w-full bg-transparent font-display text-sm text-ink-50 outline-none placeholder:text-ink-500"
                />
                <button aria-label="Close search" onClick={onClose} className="text-ink-300 hover:text-ink-50">
                  <X className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto p-2">
                {query.trim() && !hasResults && (
                  <p className="px-3 py-6 text-center text-sm text-ink-300">No results for &ldquo;{query}&rdquo;.</p>
                )}

                {results.projects.length > 0 && (
                  <div className="mb-2">
                    <p className="px-3 py-2 font-display text-xs font-medium tracking-[0.15em] text-ink-500">PROJECTS</p>
                    {results.projects.map((p) => (
                      <button
                        key={p.slug}
                        onClick={() => goTo(`/projects/${p.slug}`)}
                        className="block w-full rounded-md px-3 py-2 text-left transition-colors hover:bg-ink-50/5"
                      >
                        <span className="block font-display text-sm text-ink-50">{p.name}</span>
                        <span className="block text-xs text-ink-300">{p.category} · {p.location}</span>
                      </button>
                    ))}
                  </div>
                )}

                {results.services.length > 0 && (
                  <div>
                    <p className="px-3 py-2 font-display text-xs font-medium tracking-[0.15em] text-ink-500">SERVICES</p>
                    {results.services.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => goTo(`/services/${s.id}`)}
                        className="block w-full rounded-md px-3 py-2 text-left transition-colors hover:bg-ink-50/5"
                      >
                        <span className="block font-display text-sm text-ink-50">{s.title}</span>
                        <span className="block truncate text-xs text-ink-300">{s.description}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </GlassPanel>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
