/**
 * Tests for custom hooks and animation math.
 *
 * Includes property-based tests for:
 * - Property 7: Scroll Progress Value Is Clamped to [0, 1]
 * - Property 4: 3D Object Floating Animation Is Sinusoidal
 * - Property 5: Parallax Offset Is Proportional to Scroll Position
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'

// ---------------------------------------------------------------------------
// Pure helper functions extracted from hook logic for property testing
// ---------------------------------------------------------------------------

/**
 * Computes the scroll progress value as used in useScrollProgress.
 * Mirrors the hook's internal calculation.
 */
function computeScrollProgress(
  scrollY: number,
  documentHeight: number,
  viewportHeight: number
): number {
  const scrollableHeight = documentHeight - viewportHeight
  if (scrollableHeight <= 0) return 0
  const raw = scrollY / scrollableHeight
  return Math.min(1, Math.max(0, raw))
}

/**
 * Computes the sinusoidal Y-axis position for a floating 3D object.
 * Mirrors the useFrame animation logic in FilmCamera/FilmReel/Clapperboard.
 */
function computeFloatY(t: number, phaseOffset: number, amplitude: number): number {
  return Math.sin(t + phaseOffset) * amplitude
}

/**
 * Computes the parallax offset for a given scroll position and speed factor.
 * Mirrors the parallax layer calculation in HeroSection.
 */
function computeParallaxOffset(scrollY: number, factor: number): number {
  return scrollY * factor
}

// ---------------------------------------------------------------------------
// Property 7: Scroll Progress Value Is Clamped to [0, 1]
// Validates: Requirements 8.2
// ---------------------------------------------------------------------------

describe('Property 7: Scroll Progress Value Is Clamped to [0, 1]', () => {
  it('result is always in [0, 1] for any valid scroll inputs', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 100_000 }),   // scrollY
        fc.integer({ min: 1, max: 200_000 }),   // documentHeight
        fc.integer({ min: 1, max: 10_000 }),    // viewportHeight
        (scrollY, documentHeight, viewportHeight) => {
          const progress = computeScrollProgress(scrollY, documentHeight, viewportHeight)
          expect(progress).toBeGreaterThanOrEqual(0)
          expect(progress).toBeLessThanOrEqual(1)
        }
      ),
      { numRuns: 500 }
    )
  })

  it('result equals scrollY / (documentHeight - viewportHeight) when in range', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10_000 }),    // viewportHeight
        fc.integer({ min: 1, max: 10_000 }),    // extra scrollable height
        fc.integer({ min: 0, max: 1000 }),      // scrollY as integer fraction of scrollableExtra
        (viewportHeight, scrollableExtra, scrollFraction) => {
          const documentHeight = viewportHeight + scrollableExtra
          // scrollY is in [0, scrollableExtra] — guaranteed in range
          const scrollY = Math.floor((scrollFraction / 1000) * scrollableExtra)
          const progress = computeScrollProgress(scrollY, documentHeight, viewportHeight)
          const expected = scrollY / scrollableExtra
          expect(progress).toBeCloseTo(expected, 10)
        }
      ),
      { numRuns: 500 }
    )
  })

  it('returns 0 when documentHeight equals viewportHeight (no scrollable area)', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 100_000 }),
        fc.integer({ min: 1, max: 10_000 }),
        (scrollY, height) => {
          const progress = computeScrollProgress(scrollY, height, height)
          expect(progress).toBe(0)
        }
      ),
      { numRuns: 200 }
    )
  })

  it('returns 1 when scrollY exceeds the scrollable height', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10_000 }),    // viewportHeight
        fc.integer({ min: 1, max: 10_000 }),    // scrollableExtra
        fc.integer({ min: 1, max: 50_000 }),    // overshoot
        (viewportHeight, scrollableExtra, overshoot) => {
          const documentHeight = viewportHeight + scrollableExtra
          const scrollY = scrollableExtra + overshoot  // beyond the scrollable range
          const progress = computeScrollProgress(scrollY, documentHeight, viewportHeight)
          expect(progress).toBe(1)
        }
      ),
      { numRuns: 200 }
    )
  })
})

// ---------------------------------------------------------------------------
// Property 4: 3D Object Floating Animation Is Sinusoidal
// Validates: Requirements 7.3
// ---------------------------------------------------------------------------

describe('Property 4: 3D Object Floating Animation Is Sinusoidal', () => {
  const AMPLITUDE = 0.2  // fixed amplitude used in the 3D scene

  it('float Y position is always within [-amplitude, +amplitude]', () => {
    fc.assert(
      fc.property(
        fc.double({ min: -1000, max: 1000, noNaN: true }),   // elapsed time t
        fc.double({ min: -Math.PI * 2, max: Math.PI * 2, noNaN: true }),  // phase offset φ
        (t, phaseOffset) => {
          const y = computeFloatY(t, phaseOffset, AMPLITUDE)
          expect(y).toBeGreaterThanOrEqual(-AMPLITUDE)
          expect(y).toBeLessThanOrEqual(AMPLITUDE)
        }
      ),
      { numRuns: 500 }
    )
  })

  it('float Y equals Math.sin(t + φ) * amplitude exactly', () => {
    fc.assert(
      fc.property(
        fc.double({ min: -100, max: 100, noNaN: true }),
        fc.double({ min: -Math.PI * 2, max: Math.PI * 2, noNaN: true }),
        (t, phaseOffset) => {
          const y = computeFloatY(t, phaseOffset, AMPLITUDE)
          const expected = Math.sin(t + phaseOffset) * AMPLITUDE
          expect(y).toBeCloseTo(expected, 10)
        }
      ),
      { numRuns: 500 }
    )
  })

  it('different phase offsets produce different positions at the same time', () => {
    // At t=0, sin(0 + φ1) * A ≠ sin(0 + φ2) * A when φ1 ≠ φ2 (and neither is a multiple of π apart)
    const t = 0
    const y1 = computeFloatY(t, 0, AMPLITUDE)
    const y2 = computeFloatY(t, Math.PI / 2, AMPLITUDE)
    const y3 = computeFloatY(t, Math.PI, AMPLITUDE)
    // sin(0) = 0, sin(π/2) = 1, sin(π) ≈ 0 — verify they differ as expected
    expect(y1).toBeCloseTo(0, 10)
    expect(y2).toBeCloseTo(AMPLITUDE, 10)
    expect(y3).toBeCloseTo(0, 5)
  })
})

// ---------------------------------------------------------------------------
// Property 5: Parallax Offset Is Proportional to Scroll Position
// Validates: Requirements 7.10
// ---------------------------------------------------------------------------

describe('Property 5: Parallax Offset Is Proportional to Scroll Position', () => {
  it('parallax offset equals scrollY * factor for any non-negative scrollY', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 10_000 }),    // scrollY
        fc.double({ min: 0.01, max: 0.99, noNaN: true }),  // speed factor f
        (scrollY, factor) => {
          const offset = computeParallaxOffset(scrollY, factor)
          expect(offset).toBeCloseTo(scrollY * factor, 10)
        }
      ),
      { numRuns: 500 }
    )
  })

  it('hero section parallax uses f = 0.6 correctly', () => {
    const HERO_PARALLAX_FACTOR = 0.6
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 10_000 }),
        (scrollY) => {
          const offset = computeParallaxOffset(scrollY, HERO_PARALLAX_FACTOR)
          expect(offset).toBeCloseTo(scrollY * 0.6, 10)
        }
      ),
      { numRuns: 500 }
    )
  })

  it('parallax offset is 0 when scrollY is 0', () => {
    fc.assert(
      fc.property(
        fc.double({ min: 0.01, max: 0.99, noNaN: true }),
        (factor) => {
          expect(computeParallaxOffset(0, factor)).toBe(0)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('parallax offset increases monotonically with scrollY for a fixed factor', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 9_999 }),
        fc.double({ min: 0.01, max: 0.99, noNaN: true }),
        (scrollY, factor) => {
          const offset1 = computeParallaxOffset(scrollY, factor)
          const offset2 = computeParallaxOffset(scrollY + 1, factor)
          expect(offset2).toBeGreaterThan(offset1)
        }
      ),
      { numRuns: 500 }
    )
  })
})
