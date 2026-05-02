'use client'

import { useRef, useCallback } from 'react'
import { useSpring, useMotionValue, MotionValue } from 'framer-motion'
import type { MouseEvent } from 'react'

export interface MagneticEffectResult {
  /** Spring-animated horizontal displacement in pixels */
  dx: MotionValue<number>
  /** Spring-animated vertical displacement in pixels */
  dy: MotionValue<number>
  /** Attach to the element's onMouseMove event */
  handleMouseMove: (event: MouseEvent<HTMLElement>) => void
  /** Attach to the element's onMouseLeave event */
  handleMouseLeave: () => void
}

const SPRING_CONFIG = { stiffness: 150, damping: 15, mass: 0.1 }

/**
 * Tracks cursor position within a configurable radius around an element and
 * returns spring-animated dx/dy displacement values for a magnetic follow effect.
 *
 * @param radius - The pixel radius within which the magnetic effect is active
 * @returns dx, dy MotionValues and mouse event handlers
 *
 * Validates: Requirements 7.8, 13.8
 */
export function useMagneticEffect(radius: number): MagneticEffectResult {
  const elementRef = useRef<DOMRect | null>(null)

  const rawDx = useMotionValue(0)
  const rawDy = useMotionValue(0)

  const dx = useSpring(rawDx, SPRING_CONFIG)
  const dy = useSpring(rawDy, SPRING_CONFIG)

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const rect = event.currentTarget.getBoundingClientRect()
      elementRef.current = rect

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = event.clientX - centerX
      const distY = event.clientY - centerY
      const distance = Math.sqrt(distX * distX + distY * distY)

      if (distance <= radius) {
        // Scale displacement proportionally to how close the cursor is to center
        const factor = (radius - distance) / radius
        rawDx.set(distX * factor * 0.4)
        rawDy.set(distY * factor * 0.4)
      } else {
        rawDx.set(0)
        rawDy.set(0)
      }
    },
    [radius, rawDx, rawDy]
  )

  const handleMouseLeave = useCallback(() => {
    rawDx.set(0)
    rawDy.set(0)
  }, [rawDx, rawDy])

  return { dx, dy, handleMouseMove, handleMouseLeave }
}
