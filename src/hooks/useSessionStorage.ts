'use client'

import { useState, useCallback } from 'react'

/**
 * Generic hook for reading and writing a value in sessionStorage.
 * SSR-safe: falls back to the initialValue when sessionStorage is unavailable.
 *
 * @param key - The sessionStorage key to use
 * @param initialValue - The default value when the key is not set
 * @returns A tuple of [storedValue, setValue]
 *
 * Validates: Requirements 5.5
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // Read the initial value from sessionStorage (SSR-safe)
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.sessionStorage.getItem(key)
      return item !== null ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value)
        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem(key, JSON.stringify(value))
        }
      } catch {
        // Silently ignore sessionStorage errors (e.g., private browsing quota)
      }
    },
    [key]
  )

  return [storedValue, setValue]
}
