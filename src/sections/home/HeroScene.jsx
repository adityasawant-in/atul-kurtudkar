import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Lights } from '../../three/environment/Lights'
import { Skyline } from '../../three/environment/Skyline'
import { Clouds } from '../../three/environment/Clouds'
import { FloatingParticles } from '../../three/environment/Particles'
import { BlueprintGrid } from '../../three/environment/BlueprintGrid'
import { lazy } from 'react'

const PostFX = lazy(() => import('../../three/canvas/PostFX').then((m) => ({ default: m.PostFX })))
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { IS_DESKTOP_QUERY } from '../../constants/breakpoints'

/**
 * Very slow autonomous camera drift + subtle mouse parallax. `pointer` from
 * R3F's frame state is already normalized to -1..1, so no extra listeners
 * are needed here.
 */
function HeroCameraRig({ reducedMotion }) {
  const basePos = useRef({ x: 0, y: 1.2, z: 11 })

  useFrame(({ camera, pointer, clock }) => {
    if (reducedMotion) return
    const t = clock.getElapsedTime()
    const driftX = Math.sin(t * 0.05) * 0.4
    const driftY = Math.cos(t * 0.04) * 0.15

    const targetX = basePos.current.x + driftX + pointer.x * 0.5
    const targetY = basePos.current.y + driftY + pointer.y * 0.25

    camera.position.x += (targetX - camera.position.x) * 0.02
    camera.position.y += (targetY - camera.position.y) * 0.02
    camera.lookAt(0, 1, 0)
  })

  return null
}

export function HeroScene({ reducedMotion = false }) {
  const isDesktop = useMediaQuery(IS_DESKTOP_QUERY)

  return (
    <>
      <color attach="background" args={['#060e1c']} />
      <fog attach="fog" args={['#060e1c', 14, 34]} />

      <Lights />
      <Skyline count={isDesktop ? 14 : 8} />
      {!reducedMotion && <Clouds count={isDesktop ? 5 : 3} />}
      {!reducedMotion && <FloatingParticles count={isDesktop ? 160 : 70} />}
      <BlueprintGrid opacity={0.28} pulse={!reducedMotion} />

      <HeroCameraRig reducedMotion={reducedMotion} />

      <PostFX reducedMotion={reducedMotion || !isDesktop} bloomIntensity={0.3} focusDistance={0.015} />
    </>
  )
}
