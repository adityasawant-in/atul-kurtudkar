import { useId } from 'react'

/**
 * Cheap SVG blueprint-grid + drafting-line backdrop shared by every Phase 3
 * section. Deliberately CSS/SVG rather than R3F — these sections don't need
 * a render loop, so a live Canvas per section would burn GPU budget the
 * hero and construction scene already spent. `animated` toggles the slow
 * grid pulse + line-draw keyframes.
 */
export function BlueprintBackdrop({ animated = true, className }) {
  const id = useId()

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`} aria-hidden="true">
      <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.07]">
        <defs>
          <pattern id={`grid-${id}`} width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#4577c2" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${id})`} />
      </svg>

      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        className={`absolute inset-0 h-full w-full opacity-20 ${animated ? 'animate-[dash_18s_linear_infinite]' : ''}`}
      >
        <path
          d="M -50 650 L 300 650 L 420 500 L 900 500 L 1000 250 L 1300 250"
          fill="none"
          stroke="#c9a34e"
          strokeWidth="1"
          strokeDasharray="6 10"
        />
        <path
          d="M -50 150 L 250 150 L 380 320 L 820 320 L 950 620 L 1300 620"
          fill="none"
          stroke="#2a5ba3"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
      </svg>
    </div>
  )
}
