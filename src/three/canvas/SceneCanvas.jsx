import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { cn } from '../../utils/cn'

/**
 * Every R3F scene in the app mounts through this wrapper so DPR capping,
 * frameloop mode and the reduced-motion fallback only have to be reasoned
 * about in one place.
 */
export function SceneCanvas({
  children,
  className,
  camera = { position: [0, 1.2, 11], fov: 40, near: 0.1, far: 100 },
  frameloop = 'always',
  dpr = [1, 1.75],
  fallback = null,
}) {
  return (
    <div className={cn('absolute inset-0', className)} aria-hidden="true">
      <Canvas
        camera={camera}
        dpr={dpr}
        frameloop={frameloop}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
      {fallback}
    </div>
  )
}
