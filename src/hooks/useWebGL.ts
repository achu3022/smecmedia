'use client'

import { useState, useEffect } from 'react'

/**
 * Detects whether WebGL is supported in the current browser environment.
 * Safe for SSR — returns false on the server and checks on the client after mount.
 *
 * Validates: Requirements 7.14
 */
export function useWebGL(): boolean {
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    // Guard against SSR environments
    if (typeof window === 'undefined') {
      setSupported(false)
      return
    }

    try {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setSupported(context !== null)
    } catch {
      setSupported(false)
    }
  }, [])

  return supported
}
