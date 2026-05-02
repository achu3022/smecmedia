/**
 * Represents a student testimonial.
 */
export interface Testimonial {
  /** Unique identifier */
  id: string
  /** Full name of the student */
  studentName: string
  /** Course title or slug the student completed */
  courseCompleted: string
  /** Star rating from 1 to 5 */
  rating: 1 | 2 | 3 | 4 | 5
  /** Testimonial quote — 1 to 3 sentences */
  quote: string
  /** Optional path to the student's avatar image in /public */
  avatarImage?: string
}
