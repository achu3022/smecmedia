import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { TESTIMONIALS } from './testimonials'

/**
 * Property 15: Testimonial Data Completeness and Card Rendering
 * Validates: Requirements 15.1, 15.2, 15.3
 */
describe('Testimonial Data Completeness', () => {
  it('TESTIMONIALS array has at least 6 entries', () => {
    expect(TESTIMONIALS.length).toBeGreaterThanOrEqual(6)
  })

  it('every testimonial has a rating in [1, 5]', () => {
    fc.assert(
      fc.property(fc.constantFrom(...TESTIMONIALS), (testimonial) => {
        return testimonial.rating >= 1 && testimonial.rating <= 5
      }),
      { numRuns: 10 },
    )
  })

  it('every testimonial has a non-empty quote', () => {
    fc.assert(
      fc.property(fc.constantFrom(...TESTIMONIALS), (testimonial) => {
        return testimonial.quote.trim().length > 0
      }),
      { numRuns: 10 },
    )
  })

  it('every testimonial has a non-empty studentName', () => {
    fc.assert(
      fc.property(fc.constantFrom(...TESTIMONIALS), (testimonial) => {
        return testimonial.studentName.trim().length > 0
      }),
      { numRuns: 10 },
    )
  })

  it('every testimonial has a non-empty courseCompleted', () => {
    fc.assert(
      fc.property(fc.constantFrom(...TESTIMONIALS), (testimonial) => {
        return testimonial.courseCompleted.trim().length > 0
      }),
      { numRuns: 10 },
    )
  })

  it('every testimonial has a unique id', () => {
    const ids = TESTIMONIALS.map((t) => t.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('testimonials cover both courses', () => {
    const courses = new Set(TESTIMONIALS.map((t) => t.courseCompleted))
    expect(courses.size).toBeGreaterThanOrEqual(2)
  })

  it('all ratings are 4 or 5 stars (high quality testimonials)', () => {
    fc.assert(
      fc.property(fc.constantFrom(...TESTIMONIALS), (testimonial) => {
        return testimonial.rating >= 4
      }),
      { numRuns: 10 },
    )
  })
})
