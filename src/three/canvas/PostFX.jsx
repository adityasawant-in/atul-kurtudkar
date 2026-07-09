import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'

/**
 * Postprocessing is intentionally centralized here rather than duplicated
 * per-scene: the hero and the construction scene both want the same
 * "expensive render" look (soft bloom on lit surfaces, a gentle depth-of-
 * field falloff toward the skyline) without diverging in intensity.
 *
 * Skipped entirely when `reducedMotion` is true — EffectComposer adds a
 * real GPU cost, and readers who've asked for reduced motion are very
 * often also on constrained hardware.
 */
export function PostFX({ reducedMotion = false, focusDistance = 0.02, bloomIntensity = 0.4 }) {
  if (reducedMotion) return null

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.55}
        luminanceSmoothing={0.3}
        mipmapBlur
        radius={0.6}
      />
      <DepthOfField focusDistance={focusDistance} focalLength={0.06} bokehScale={2.5} />
    </EffectComposer>
  )
}
