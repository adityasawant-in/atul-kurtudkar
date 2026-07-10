import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { cn } from '../../utils/cn'

/**
 * Every R3F scene in the app mounts through this wrapper so DPR capping,
 * frameloop mode and the reduced-motion fallback only have to be reasoned
 * about in one place.
 *
 * Also handles WebGL context loss: on 'webglcontextlost' we preventDefault
 * so the browser attempts to restore the context instead of killing it
 * permanently; on 'webglcontextrestored' we remount the scene subtree so
 * geometries/materials/textures get recreated cleanly. On unmount we
 * force-dispose the renderer so navigating away frees the GPU context
 * immediately instead of leaving it to be garbage-collected later, which
 * is what causes contexts to pile up under fast navigation.
 */
export function SceneCanvas({
  children,
  className,
  camera = { position: [0, 1.2, 11], fov: 40, near: 0.1, far: 100 },
  frameloop = 'always',
  dpr = [1, 1.75],
  fallback = null,
}) {
  const [contextKey, setContextKey] = useState(0)
  const glRef = useRef(null)
  const listenersRef = useRef({ el: null, onLost: null, onRestored: null })

  const handleCreated = useCallback((state) => {
    glRef.current = state.gl
    const el = state.gl.domElement

    const onLost = (event) => {
      // REQUIRED: without this the browser treats the loss as permanent
      // and 'webglcontextrestored' never fires
      event.preventDefault()
      console.warn('[SceneCanvas] WebGL context lost — waiting for restore')
    }

    const onRestored = () => {
      console.info('[SceneCanvas] WebGL context restored — remounting scene')
      setContextKey((k) => k + 1)
    }

    el.addEventListener('webglcontextlost', onLost, false)
    el.addEventListener('webglcontextrestored', onRestored, false)
    listenersRef.current = { el, onLost, onRestored }
  }, [])

  useEffect(() => {
    return () => {
      const { el, onLost, onRestored } = listenersRef.current
      if (el) {
        el.removeEventListener('webglcontextlost', onLost)
        el.removeEventListener('webglcontextrestored', onRestored)
      }
      // free the GPU context deterministically on unmount instead of
      // waiting on garbage collection — this is what stops contexts
      // from piling up when you navigate quickly between pages
      const gl = glRef.current
      if (gl) {
        gl.forceContextLoss?.()
        gl.dispose?.()
      }
    }
  }, [])

  return (
    <div className={cn('absolute inset-0', className)} aria-hidden="true">
      <Canvas
        camera={camera}
        dpr={dpr}
        frameloop={frameloop}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={handleCreated}
      >
        <Suspense fallback={null}>
          <group key={contextKey}>{children}</group>
        </Suspense>
      </Canvas>
      {fallback}
    </div>
  )
}