'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { MouseEvent } from 'react'
import { cn } from '@/lib/utils'

interface TiltCardProps {
  children: React.ReactNode
  maxTilt?: number
  className?: string
}

const SPRING_CONFIG = { stiffness: 200, damping: 20, mass: 0.5 }

export default function TiltCard({ children, maxTilt = 10, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)

  const rotateX = useSpring(rawRotateX, SPRING_CONFIG)
  const rotateY = useSpring(rawRotateY, SPRING_CONFIG)

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()

    // Normalized position: -1 to 1
    const normalizedX = (event.clientX - rect.left) / rect.width - 0.5
    const normalizedY = (event.clientY - rect.top) / rect.height - 0.5

    // rotateY tilts left/right, rotateX tilts up/down (inverted for natural feel)
    rawRotateY.set(normalizedX * maxTilt * 2)
    rawRotateX.set(-normalizedY * maxTilt * 2)
  }

  function handleMouseLeave() {
    rawRotateX.set(0)
    rawRotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('will-change-transform', className)}
    >
      {children}
    </motion.div>
  )
}
