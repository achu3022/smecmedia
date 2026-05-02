'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * RTF component — simplified film camera shape using BoxGeometry.
 * Floats with a sinusoidal Y-axis oscillation and slow Y rotation.
 *
 * Validates: Requirements 7.2, 7.3
 */
export default function FilmCamera() {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!mesh.current) return
    // Sinusoidal Y float
    mesh.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime) * 0.2
    // Slow Y rotation
    mesh.current.rotation.y += 0.005
  })

  return (
    <mesh ref={mesh} position={[-2, 0.5, 0]}>
      <boxGeometry args={[1.2, 0.8, 0.6]} />
      <meshStandardMaterial color="#8B7355" />
    </mesh>
  )
}
