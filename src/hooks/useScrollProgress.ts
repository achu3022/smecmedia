'use client'

import { useEffect } from 'react'
import { useMotionValue, MotionValue } from 'framer-motion'

/**
 * Returns a Framer Motion MotionValue representing the current scroll progress
 * as a value in [0, 1], computed from scrollY / (documentHeight - viewportHeight).
 * The value is clamped to [0, 1] to handle edge cases.
 *
 * Validates: Requirements 8.2
 */
export function useScrollProgress(): MotionValue<number> {
  const progress = useMotionValue(0)

  useEffect(() => {
    function updateProgress() {
      const scrollY = window.scrollY
      const documentHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight
      const scrollableHeight = documentHeight - viewportHeight

      if (scrollableHeight <= 0) {
        progress.set(0)
        return
      }

      const raw = scrollY / scrollableHeight
      // Clamp to [0, 1]
      const clamped = Math.min(1, Math.max(0, raw))
      progress.set(clamped)
    }

    // Set initial value
    updateProgress()

    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [progress])

  return progress
}
