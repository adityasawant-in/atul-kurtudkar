/**
 * Visually hidden until focused — standard "skip to content" link for
 * keyboard users so they aren't forced to tab through the entire floating
 * nav (and, on this site, past a decorative canvas) before reaching the
 * page content.
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-md bg-concrete-500 px-4 py-2.5 font-display text-sm font-medium text-structural-950 transition-transform duration-200 focus:translate-y-0"
    >
      Skip to content
    </a>
  )
}
