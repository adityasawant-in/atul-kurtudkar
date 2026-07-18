import { useEffect, useMemo, useRef } from 'react'

/**
 * Real photograph background (hero-construction-main.jpeg) in place of the
 * old drawn sky-gradient + SVG skyline silhouette — the skyline was a
 * stand-in for a real building photo, so it's removed now that one exists.
 * The blueprint-grid pulse, drifting clouds and floating dust are kept:
 * they're the site's ongoing brand texture, not placeholders, and read
 * fine layered over a photo.
 */
export function HeroBackdrop({ reducedMotion = false }) {
  const parallaxRef = useRef(null)
  const rafRef = useRef(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })

  const clouds = useMemo(
    () =>
      Array.from({ length: 4 }, () => ({
        top: 8 + Math.random() * 22,
        size: 180 + Math.random() * 160,
        duration: 60 + Math.random() * 40,
        delay: -Math.random() * 60,
        opacity: 0.05 + Math.random() * 0.05,
      })),
    []
  )

  const dust = useMemo(
    () =>
      Array.from({ length: 26 }, () => ({
        left: Math.random() * 100,
        top: 20 + Math.random() * 70,
        size: 1.5 + Math.random() * 2,
        duration: 8 + Math.random() * 10,
        delay: -Math.random() * 12,
      })),
    []
  )

  // Cheap mouse-parallax: rAF-throttled, only ever touches CSS transform on
  // one element, no React state/re-render involved.
  useEffect(() => {
    if (reducedMotion) return

    function handlePointerMove(e) {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      targetRef.current = { x: nx, y: ny }
    }

    function tick() {
      const el = parallaxRef.current
      if (el) {
        currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.04
        currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.04
        el.style.transform = `translate3d(${currentRef.current.x * -12}px, ${currentRef.current.y * -6}px, 0)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [reducedMotion])

  return (
    <div className="absolute inset-0 overflow-hidden bg-structural-950" aria-hidden="true">
      {/* Hero photograph — loaded eagerly + high priority since it's the
          very first thing painted on the site. */}
      <img
        src="/images/hero-construction-main.jpeg"
        alt=""
        loading="eager"
        fetchPriority="high" 
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Blueprint grid, gently pulsing via CSS animation instead of a per-frame GSAP tween */}
      <div
        className="absolute inset-0 animate-[bp-pulse_6s_ease-in-out_infinite]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(69,119,194,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(69,119,194,0.16) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
          maskImage: 'linear-gradient(to top, black, transparent 75%)',
          WebkitMaskImage: 'linear-gradient(to top, black, transparent 75%)',
        }}
      />

      <div ref={parallaxRef} className="absolute inset-0" style={{ willChange: 'transform' }}>
        {/* Drifting clouds */}
        {!reducedMotion &&
          clouds.map((c, i) => (
            <div
              key={`cloud-${i}`}
              className="absolute rounded-full blur-3xl"
              style={{
                top: `${c.top}%`,
                left: '-20%',
                width: c.size,
                height: c.size * 0.4,
                background: '#ffffff',
                opacity: c.opacity,
                animation: `hero-cloud-drift ${c.duration}s linear infinite`,
                animationDelay: `${c.delay}s`,
              }}
            />
          ))}

        {/* Floating dust */}
        {!reducedMotion &&
          dust.map((d, i) => (
            <span
              key={`dust-${i}`}
              className="absolute rounded-full bg-concrete-500"
              style={{
                left: `${d.left}%`,
                top: `${d.top}%`,
                width: d.size,
                height: d.size,
                opacity: 0.5,
                animation: `hero-dust-float ${d.duration}s ease-in-out infinite`,
                animationDelay: `${d.delay}s`,
              }}
            />
          ))}
      </div>

      {/* Soft warm key-light glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(45% 55% at 62% 30%, rgba(255,244,224,0.10) 0%, transparent 70%)',
        }}
      />

      <style>{`
        @keyframes bp-pulse { 0%, 100% { opacity: 0.85; } 50% { opacity: 1; } }
        @keyframes hero-cloud-drift { from { transform: translateX(0); } to { transform: translateX(140vw); } }
        @keyframes hero-dust-float {
          0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.3; }
          50% { transform: translate3d(6px, -14px, 0); opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}
