/**
 * Previously a soft radial darkening toward the viewport edges (dark
 * navy vignette) for depth on the old dark theme. This site is now
 * light-only and a dark edge vignette has no place in a clean corporate
 * light design, so the effect is retired. Component kept as a no-op so
 * call sites (App.jsx) don't need to change.
 */
export function Vignette() {
  return null
}
