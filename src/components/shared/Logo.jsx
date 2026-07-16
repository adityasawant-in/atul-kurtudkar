/**
 * Single source of truth for the company mark. Previously duplicated
 * inline in Navbar, Footer and the construction scene's final reveal —
 * extracted here in Phase 4 so brand geometry only ever changes in one
 * place.
 */
export function Logo({ size = 34, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none" aria-hidden="true" className={className}>
      <rect x="1" y="1" width="32" height="32" rx="8" stroke="#C9A34E" strokeWidth="1.2" />
      <path d="M9 24V14L17 9L25 14V24" stroke="#0B2545" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M13 24V17.5H21V24" stroke="#C9A34E" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}
