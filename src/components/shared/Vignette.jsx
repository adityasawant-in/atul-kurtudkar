/**
 * Soft radial darkening toward the viewport edges — adds depth to every
 * section without touching individual section markup.
 */
export function Vignette() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[65]"
      style={{
        background:
          'radial-gradient(ellipse at center, transparent 45%, rgba(6,14,28,0.55) 100%)',
      }}
      aria-hidden="true"
    />
  )
}
