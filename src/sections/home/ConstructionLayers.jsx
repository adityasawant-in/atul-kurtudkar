/**
 * Pure SVG + CSS "construction rises as you scroll" experience — no WebGL,
 * no Canvas, no Three.js. Every layer is a <g> in one shared SVG so nothing
 * can drift out of alignment, and every layer's opacity/transform is driven
 * directly via DOM refs (see applyConstructionLayers below), never through
 * React state — so scrubbing this on scroll costs zero re-renders and stays
 * locked to 60fps exactly like the original R3F rig did.
 *
 * Layers, back to front:
 *  blueprint  -> grid + dashed footprint outline
 *  ground     -> excavation trench
 *  foundation -> concrete footing slab
 *  crane      -> thin construction crane silhouette (temporary)
 *  columns    -> vertical structural columns
 *  structure  -> floor slabs / beams
 *  walls      -> solid facade panels
 *  glass      -> curtain-wall glazing + mullions
 *  roof       -> parapet, roof cap, penthouse
 *  glow       -> warm lit-window glow (liveIn stage)
 *  sunset     -> golden-hour gradient wash (final stage)
 */
export function ConstructionLayers({ refs }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-structural-950">
      {/* Slow-moving background grid for parallax depth */}
      <div
        ref={refs.parallaxBg}
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(69,119,194,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(69,119,194,0.12) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <svg
        viewBox="0 0 640 520"
        preserveAspectRatio="xMidYMax meet"
        className="absolute inset-0 h-full w-full"
        ref={refs.svgWrap}
      >
        <defs>
          <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4577c2" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0b2545" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="sunsetGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#c9a34e" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#a9843a" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#060e1c" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ground line, always visible as a subtle horizon */}
        <line x1="20" y1="460" x2="620" y2="460" stroke="#3a3f47" strokeWidth="1.5" opacity="0.4" />

        {/* Blueprint footprint trace */}
        <g ref={refs.blueprint}>
          <rect
            x="180"
            y="140"
            width="280"
            height="320"
            fill="none"
            stroke="#4577c2"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            opacity="0.7"
          />
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={`bp-v-${i}`}
              x1={200 + i * 48}
              y1="140"
              x2={200 + i * 48}
              y2="460"
              stroke="#4577c2"
              strokeWidth="0.75"
              opacity="0.35"
            />
          ))}
        </g>

        {/* Excavation trench */}
        <g ref={refs.ground}>
          <path d="M170 460 L190 486 L450 486 L470 460 Z" fill="#0b2545" opacity="0.8" />
        </g>

        {/* Foundation slab */}
        <g ref={refs.foundation}>
          <rect x="168" y="450" width="304" height="20" rx="2" fill="#3a3f47" />
        </g>

        {/* Construction crane (temporary, fades out by facade stage) */}
        <g ref={refs.crane} stroke="#a7adb6" strokeWidth="2.5" fill="none" strokeLinecap="round">
          <line x1="520" y1="460" x2="520" y2="90" />
          <line x1="520" y1="95" x2="610" y2="95" />
          <line x1="520" y1="95" x2="500" y2="115" />
          <line x1="596" y1="95" x2="596" y2="150" stroke="#c9a34e" strokeWidth="1.5" />
        </g>

        {/* Structural columns */}
        <g ref={refs.columns} fill="#a7adb6" style={{ transformOrigin: '320px 460px' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={`col-${i}`} x={196 + i * 48} y="150" width="8" height="300" rx="2" />
          ))}
        </g>

        {/* Floor slabs / beams */}
        <g ref={refs.structure} fill="#6b7280">
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={`floor-${i}`} x="182" y={452 - (i + 1) * 40} width="276" height="6" rx="1" />
          ))}
        </g>

        {/* Facade wall panels */}
        <g ref={refs.walls}>
          <rect x="182" y="150" width="276" height="300" fill="#123468" opacity="0.9" />
        </g>

        {/* Curtain-wall glass + mullions */}
        <g ref={refs.glass}>
          <rect x="196" y="156" width="248" height="288" fill="url(#glassGrad)" />
          {Array.from({ length: 7 }).map((_, i) => (
            <line
              key={`mul-${i}`}
              x1={196 + i * 41.3}
              y1="156"
              x2={196 + i * 41.3}
              y2="444"
              stroke="#060e1c"
              strokeWidth="1"
              opacity="0.4"
            />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <line
              key={`mulh-${i}`}
              x1="196"
              y1={156 + i * 41.1}
              x2="444"
              y2={156 + i * 41.1}
              stroke="#060e1c"
              strokeWidth="1"
              opacity="0.35"
            />
          ))}
        </g>

        {/* Roof crown */}
        <g ref={refs.roof} fill="#1a1d21">
          <rect x="160" y="118" width="320" height="12" fill="#a9843a" />
          <rect x="170" y="130" width="300" height="14" />
          <rect x="280" y="90" width="80" height="30" fill="#0a0c0f" />
        </g>

        {/* Lit-window glow */}
        <g ref={refs.glow} fill="#f7f1e2">
          {Array.from({ length: 6 }).flatMap((_, row) =>
            Array.from({ length: 5 }).map((_, col) => (
              <rect
                key={`glow-${row}-${col}`}
                x={205 + col * 47}
                y={168 + row * 47}
                width="22"
                height="26"
                rx="1"
                opacity="0"
              />
            ))
          )}
        </g>

        {/* Golden-hour wash */}
        <rect ref={refs.sunset} x="0" y="0" width="640" height="520" fill="url(#sunsetGrad)" opacity="0" />
      </svg>
    </div>
  )
}

/**
 * Direct DOM writes driven by the shared scroll-progress ref — no React
 * state, no re-renders, called from the same GSAP ScrollTrigger `onUpdate`
 * tick that used to drive the R3F camera rig. `mapRange` isolates each
 * stage's local 0-1 window exactly like the old Building.jsx did.
 */
export function applyConstructionLayers(p, refs, mapRange) {
  const set = (el, opacity, translateY = 0, extra = '') => {
    if (!el) return
    el.style.opacity = opacity
    el.style.transform = `translate3d(0, ${translateY}px, 0) ${extra}`.trim()
  }

  if (refs.parallaxBg.current) {
    refs.parallaxBg.current.style.transform = `translate3d(0, ${-p * 24}px, 0)`
    refs.parallaxBg.current.style.opacity = String(1 - mapRange(p, 0.3, 0.55, 0, 0.7))
  }

  const blueprintOut = mapRange(p, 0.18, 0.36, 0, 1)
  set(refs.blueprint.current, 1 - blueprintOut)

  const groundIn = mapRange(p, 0.09, 0.15, 0, 1)
  const groundOut = mapRange(p, 0.25, 0.31, 0, 1)
  set(refs.ground.current, groundIn * (1 - groundOut))

  const foundation = mapRange(p, 0.18, 0.3, 0, 1)
  set(refs.foundation.current, foundation, (1 - foundation) * 24)

  const craneIn = mapRange(p, 0.2, 0.28, 0, 1)
  const craneOut = mapRange(p, 0.66, 0.76, 0, 1)
  set(refs.crane.current, craneIn * (1 - craneOut))

  const columns = mapRange(p, 0.27, 0.42, 0, 1)
  set(refs.columns.current, columns, 0, `scaleY(${Math.max(0.001, columns)})`)

  const structure = mapRange(p, 0.32, 0.62, 0, 1)
  set(refs.structure.current, structure, (1 - structure) * 30)

  const walls = mapRange(p, 0.56, 0.74, 0, 1)
  set(refs.walls.current, walls * 0.95, (1 - walls) * 20)

  const glass = mapRange(p, 0.6, 0.8, 0, 1)
  set(refs.glass.current, glass * 0.85)

  const roof = mapRange(p, 0.75, 0.88, 0, 1)
  set(refs.roof.current, roof, (1 - roof) * -36)

  const glowT = mapRange(p, 0.88, 0.97, 0, 1)
  if (refs.glow.current) {
    refs.glow.current.querySelectorAll('rect').forEach((rect, i) => {
      const stagger = (i % 11) / 11
      const local = mapRange(p, 0.88 + stagger * 0.03, 0.95 + stagger * 0.03, 0, 1)
      rect.setAttribute('opacity', String(local * 0.85))
    })
  }
  void glowT

  const sunset = mapRange(p, 0.95, 1, 0, 1)
  set(refs.sunset.current, sunset * 0.6)
}
