'use client'

import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useWebGL } from '@/hooks/useWebGL'
import WebGLFallback from './WebGLFallback'
import FilmCamera from './FilmCamera'
import FilmReel from './FilmReel'
import Clapperboard from './Clapperboard'

/**
 * SSR-safe media query hook.
 * Returns true when window.innerWidth < 768px (mobile breakpoint).
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia(query)
    setMatches(mq.matches)

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])

  return matches
}

/**
 * RTF Canvas wrapper for the Hero Section.
 * - Falls back to <WebGLFallback /> when WebGL is unavailable.
 * - On mobile (< 768px) renders only <FilmReel /> for performance.
 *
 * Validates: Requirements 7.2, 7.3, 7.13, 7.14
 */
export default function HeroScene() {
  const webGLSupported = useWebGL()
  const isMobile = useMediaQuery('(max-width: 767px)')

  if (!webGLSupported) {
    return <WebGLFallback className="w-full h-full object-cover" />
  }

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} className="w-full h-full">
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} color="#D4AF37" intensity={1.2} />
      <Suspense fallback={null}>
        {!isMobile && <FilmCamera />}
        <FilmReel />
        {!isMobile && <Clapperboard />}
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  )
}
