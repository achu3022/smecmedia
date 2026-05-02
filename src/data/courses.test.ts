import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { COURSES, getCourseBySlug, getStaticCourseSlugs } from './courses'

/**
 * Property 10: Course Data Completeness Invariant
 * Validates: Requirements 10.4, 10.5
 */
describe('Course Data Completeness Invariant', () => {
  it('every course has at least 5 learning outcomes', () => {
    fc.assert(
      fc.property(fc.constantFrom(...COURSES), (course) => {
        return course.learningOutcomes.length >= 5
      }),
      { numRuns: 10 },
    )
  })

  it('every course has at least 3 career opportunities', () => {
    fc.assert(
      fc.property(fc.constantFrom(...COURSES), (course) => {
        return course.careerOpportunities.length >= 3
      }),
      { numRuns: 10 },
    )
  })

  it('every course slug matches /^[a-z0-9-]+$/', () => {
    fc.assert(
      fc.property(fc.constantFrom(...COURSES), (course) => {
        return /^[a-z0-9-]+$/.test(course.slug)
      }),
      { numRuns: 10 },
    )
  })

  it('every course has a non-empty curriculum', () => {
    fc.assert(
      fc.property(fc.constantFrom(...COURSES), (course) => {
        return course.curriculum.length > 0
      }),
      { numRuns: 10 },
    )
  })

  it('getCourseBySlug returns the correct course for each slug', () => {
    fc.assert(
      fc.property(fc.constantFrom(...COURSES), (course) => {
        const found = getCourseBySlug(course.slug)
        return found !== undefined && found.id === course.id
      }),
      { numRuns: 10 },
    )
  })

  it('getCourseBySlug returns undefined for an unknown slug', () => {
    expect(getCourseBySlug('non-existent-slug')).toBeUndefined()
  })

  it('getStaticCourseSlugs returns one entry per course', () => {
    const slugs = getStaticCourseSlugs()
    expect(slugs).toHaveLength(COURSES.length)
    COURSES.forEach((course) => {
      expect(slugs).toContainEqual({ slug: course.slug })
    })
  })
})
