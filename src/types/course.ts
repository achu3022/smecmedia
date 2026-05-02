/**
 * Represents a single module within a course curriculum.
 */
export interface CourseModule {
  title: string
  topics: string[]
}

/**
 * Represents a full course offering at the institute.
 */
export interface Course {
  /** Unique identifier for the course */
  id: string
  /** URL-friendly slug, e.g. 'ai-graphic-design' */
  slug: string
  /** Full course title */
  title: string
  /** Short marketing description (1–2 sentences) */
  shortDescription: string
  /** Duration string, e.g. '7 Months' */
  duration: string
  /** Eligibility requirements, e.g. 'Plus Two and Above' */
  eligibility: string
  /** Original fee before discount, e.g. '₹90,000' */
  originalFee: string
  /** Offer/discounted fee, e.g. '₹75,000 / ₹70,000' */
  offerFee: string
  /** Ordered list of curriculum modules */
  curriculum: CourseModule[]
  /** Key learning outcomes — minimum 5 items */
  learningOutcomes: string[]
  /** Career paths available after completion — minimum 3 items */
  careerOpportunities: string[]
  /** Path to the course thumbnail image in /public */
  thumbnailImage: string
}
