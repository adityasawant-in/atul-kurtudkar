/**
 * Fixed, extremely low-opacity film-grain texture over the entire page.
 * This single subtle touch is what keeps large flat dark sections (which
 * this site has a lot of) from reading as "flat vector" rather than
 * "premium cinematic" — the same trick used on most Awwwards dark-theme
 * sites. Pure SVG turbulence filter, no image asset, negligible cost.
 */
export function NoiseOverlay() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 z-[70] h-full w-full opacity-[0.035] mix-blend-overlay"
      aria-hidden="true"
    >
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  )
}
