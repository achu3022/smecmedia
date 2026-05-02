'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * RTF component — clapperboard using composite BoxGeometry (main board + top stripe).
 * Floats with a sinusoidal Y-axis oscillation (phase offset π) and slight X tilt oscillation.
 *
 * Validates: Requirements 7.2, 7.3
 */
export default function Clapperboard() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    // Sinusoidal Y float with phase offset π
    group.current.position.y = 0.3 + Math.sin(t + Math.PI) * 0.2
    // Slight X tilt oscillation
    group.current.rotation.x = Math.sin(t * 0.8) * 0.1
  })

  return (
    <group ref={group} position={[2, 0.3, 0]}>
      {/* Main board */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.0, 1.2, 0.08]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>
      {/* Top stripe */}
      <mesh position={[0, 0.7, 0.01]}>
        <boxGeometry args={[1.0, 0.2, 0.06]} />
        <meshStandardMaterial color="#D4AF37" />
      </mesh>
    </group>
  )
}
