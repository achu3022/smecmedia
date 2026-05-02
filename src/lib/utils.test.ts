/**
 * Tests for utility functions in src/lib/utils.ts
 *
 * Includes unit tests and property-based tests using fast-check.
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { cn, validateEmail, validatePhone, validateRequired } from './utils'

// ---------------------------------------------------------------------------
// cn() — classname helper
// ---------------------------------------------------------------------------

describe('cn()', () => {
  it('joins truthy class strings', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('filters out falsy values', () => {
    expect(cn('foo', undefined, null, false, 'bar')).toBe('foo bar')
  })

  it('returns empty string when all values are falsy', () => {
    expect(cn(undefined, null, false)).toBe('')
  })

  it('returns a single class unchanged', () => {
    expect(cn('only')).toBe('only')
  })
})

// ---------------------------------------------------------------------------
// validateRequired()
// ---------------------------------------------------------------------------

describe('validateRequired()', () => {
  it('returns true for a non-empty string', () => {
    expect(validateRequired('hello')).toBe(true)
  })

  it('returns false for an empty string', () => {
    expect(validateRequired('')).toBe(false)
  })

  it('returns false for a whitespace-only string', () => {
    expect(validateRequired('   ')).toBe(false)
  })

  it('returns true for a string with surrounding whitespace but non-empty content', () => {
    expect(validateRequired('  a  ')).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// validateEmail()
// ---------------------------------------------------------------------------

describe('validateEmail()', () => {
  it('returns true for a valid email', () => {
    expect(validateEmail('user@example.com')).toBe(true)
  })

  it('returns false for a string without @', () => {
    expect(validateEmail('userexample.com')).toBe(false)
  })

  it('returns false for a string without domain', () => {
    expect(validateEmail('user@')).toBe(false)
  })

  it('returns false for an empty string', () => {
    expect(validateEmail('')).toBe(false)
  })

  it('returns false for a string with spaces', () => {
    expect(validateEmail('user @example.com')).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// validatePhone()
// ---------------------------------------------------------------------------

describe('validatePhone()', () => {
  it('returns true for exactly 10 digits', () => {
    expect(validatePhone('1234567890')).toBe(true)
  })

  it('returns false for fewer than 10 digits', () => {
    expect(validatePhone('123456789')).toBe(false)
  })

  it('returns false for more than 10 digits', () => {
    expect(validatePhone('12345678901')).toBe(false)
  })

  it('returns false for a string with non-digit characters', () => {
    expect(validatePhone('123-456-789')).toBe(false)
  })

  it('returns false for an empty string', () => {
    expect(validatePhone('')).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// Property 13: Form Validation Correctly Identifies Invalid Inputs
// Validates: Requirements 13.5, 13.6, 13.7
// ---------------------------------------------------------------------------

describe('Property 13: Form Validation Correctly Identifies Invalid Inputs', () => {
  /**
   * validateEmail returns false for strings that do not match the email regex.
   * We generate arbitrary strings and verify that any string without the
   * required structure (local@domain.tld) is rejected.
   */
  it('validateEmail returns false for strings without @ symbol', () => {
    fc.assert(
      fc.property(
        // Strings that definitely cannot be valid emails (no @ character)
        fc.string().filter((s) => !s.includes('@')),
        (s) => {
          expect(validateEmail(s)).toBe(false)
        }
      ),
      { numRuns: 200 }
    )
  })

  it('validateEmail returns false for strings with spaces', () => {
    fc.assert(
      fc.property(
        // Strings containing at least one space character
        fc.string().filter((s) => s.includes(' ')),
        (s) => {
          expect(validateEmail(s)).toBe(false)
        }
      ),
      { numRuns: 200 }
    )
  })

  it('validateEmail returns true for well-formed email strings', () => {
    fc.assert(
      fc.property(
        // Generate valid email-like strings: local@domain.tld
        fc.tuple(
          fc.stringMatching(/^[a-zA-Z0-9]+$/),
          fc.stringMatching(/^[a-zA-Z0-9]+$/),
          fc.stringMatching(/^[a-zA-Z]{2,4}$/)
        ),
        ([local, domain, tld]) => {
          const email = `${local}@${domain}.${tld}`
          expect(validateEmail(email)).toBe(true)
        }
      ),
      { numRuns: 200 }
    )
  })

  it('validatePhone returns false for strings that are not exactly 10 digits', () => {
    fc.assert(
      fc.property(
        // Strings that are NOT exactly 10 consecutive digit characters
        fc.string().filter((s) => !/^\d{10}$/.test(s)),
        (s) => {
          expect(validatePhone(s)).toBe(false)
        }
      ),
      { numRuns: 200 }
    )
  })

  it('validatePhone returns true for exactly 10-digit strings', () => {
    fc.assert(
      fc.property(
        // Generate exactly 10 digit characters
        fc.stringMatching(/^\d{10}$/),
        (phone) => {
          expect(validatePhone(phone)).toBe(true)
        }
      ),
      { numRuns: 200 }
    )
  })

  it('validateRequired returns false for empty or whitespace-only strings', () => {
    fc.assert(
      fc.property(
        // Strings composed entirely of whitespace characters
        fc.array(fc.constantFrom(' ', '\t', '\n', '\r'), { minLength: 0, maxLength: 20 })
          .map((chars) => chars.join('')),
        (s) => {
          expect(validateRequired(s)).toBe(false)
        }
      ),
      { numRuns: 200 }
    )
  })

  it('validateRequired returns true for strings with at least one non-whitespace character', () => {
    fc.assert(
      fc.property(
        // Strings that contain at least one non-whitespace character
        fc.string().filter((s) => s.trim().length > 0),
        (s) => {
          expect(validateRequired(s)).toBe(true)
        }
      ),
      { numRuns: 200 }
    )
  })
})
