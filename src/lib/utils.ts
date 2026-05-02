/**
 * Utility functions for the cinematic film design website.
 */

/**
 * Combines class names, filtering out falsy values.
 * Provides clsx/tailwind-merge style logic for conditional class composition.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Validates an email address using a standard regex pattern.
 * @param email - The email string to validate
 * @returns true if the email matches the pattern, false otherwise
 */
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Validates a phone number — must be exactly 10 consecutive digits.
 * @param phone - The phone string to validate
 * @returns true if the phone is exactly 10 digits, false otherwise
 */
export function validatePhone(phone: string): boolean {
  return /^\d{10}$/.test(phone)
}

/**
 * Validates that a value is non-empty after trimming whitespace.
 * @param value - The string to validate
 * @returns true if the trimmed value has length > 0, false otherwise
 */
export function validateRequired(value: string): boolean {
  return value.trim().length > 0
}
