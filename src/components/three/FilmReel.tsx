'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * RTF component — film reel using TorusGeometry (outer ring) + CylinderGeometry (center hub).
 * Floats with a sinusoidal Y-axis oscillation (phase offset π/2) and spins on Z axis.
 *
 * Validates: Requirements 7.2, 7.3
 */
export default function FilmReel() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!group.current) return
    // Sinusoidal Y float with phase offset π/2
    group.current.position.y = -0.5 + Math.sin(state.clock.elapsedTime + Math.PI / 2) * 0.2
    // Z-axis spin
    group.current.rotation.z += 0.01
  })

  return (
    <group ref={group} position={[0, -0.5, -1]}>
      {/* Outer ring */}
      <mesh>
        <torusGeometry args={[0.8, 0.15, 16, 64]} />
        <meshStandardMaterial color="#2C2C2C" />
      </mesh>
      {/* Center hub */}
      <mesh>
        <cylinderGeometry args={[0.25, 0.25, 0.2, 32]} />
        <meshStandardMaterial color="#2C2C2C" />
      </mesh>
    </group>
  )
}
