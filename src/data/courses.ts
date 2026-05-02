import type { Course } from '@/types/course'

export const COURSES: Course[] = [
  {
    id: 'course-1',
    slug: 'ai-graphic-design',
    title: 'AI Integrated Graphic Designing & Video Editing',
    shortDescription:
      'Master the full creative pipeline from brand identity to motion graphics, powered by AI tools.',
    duration: '7 Months',
    eligibility: 'Plus Two and Above',
    originalFee: '₹90,000',
    offerFee: '₹75,000 / ₹70,000',
    curriculum: [
      {
        title: 'Design Fundamentals',
        topics: ['Color Theory', 'Typography', 'Composition', 'Visual Hierarchy'],
      },
      {
        title: 'Adobe Creative Suite',
        topics: ['Photoshop', 'Illustrator', 'InDesign', 'XD'],
      },
      {
        title: 'Motion Graphics',
        topics: ['After Effects', 'Premiere Pro', 'Animation Principles'],
      },
      {
        title: 'AI-Powered Tools',
        topics: ['Midjourney', 'Adobe Firefly', 'RunwayML', 'Stable Diffusion'],
      },
      {
        title: 'Brand Identity Projects',
        topics: ['Logo Design', 'Brand Guidelines', 'Portfolio', 'Client Presentations'],
      },
    ],
    learningOutcomes: [
      'Create professional brand identities from scratch',
      'Edit and color-grade video content to broadcast standards',
      'Use AI tools to accelerate creative workflows',
      'Build a portfolio of real client-ready projects',
      'Deliver motion graphics for social media and OTT platforms',
      'Design print and digital marketing collateral',
      'Develop UI/UX wireframes and prototypes',
    ],
    careerOpportunities: [
      'Graphic Designer',
      'Motion Graphics Artist',
      'Social Media Content Creator',
      'UI/UX Designer',
      'Brand Identity Consultant',
    ],
    thumbnailImage: '/images/courses/ai-graphic-design.jpg',
  },
  {
    id: 'course-2',
    slug: 'film-editing-post-production',
    title: 'Master Program in Film Editing & Post Production',
    shortDescription:
      'A comprehensive 12-month deep dive into professional film editing, color grading, VFX, and sound design.',
    duration: '12 Months',
    eligibility: 'Plus Two and Above',
    originalFee: '₹1,50,000',
    offerFee: '₹1,25,000 / ₹1,20,000',
    curriculum: [
      {
        title: 'Film Editing Fundamentals',
        topics: ['Story Structure', 'Pacing', 'Continuity', 'Montage Theory'],
      },
      {
        title: 'DaVinci Resolve',
        topics: ['Cut Page', 'Edit Page', 'Color Page', 'Fusion', 'Fairlight'],
      },
      {
        title: 'Visual Effects',
        topics: ['Compositing', 'Green Screen', 'Motion Tracking', 'Rotoscoping'],
      },
      {
        title: 'Sound Design',
        topics: ['Audio Mixing', 'Foley', 'Music Scoring', 'Dialogue Editing'],
      },
      {
        title: 'Industry Projects',
        topics: ['Short Film', 'Documentary', 'Commercial', 'Music Video'],
      },
    ],
    learningOutcomes: [
      'Edit feature-length films and documentaries professionally',
      'Perform advanced color grading for cinematic looks',
      'Create VFX composites using industry-standard tools',
      'Design and mix professional audio for film',
      'Build a showreel that meets industry hiring standards',
      'Understand the full post-production pipeline end-to-end',
      'Collaborate effectively with directors and cinematographers',
      'Deliver projects on broadcast and streaming platform specifications',
    ],
    careerOpportunities: [
      'Film Editor',
      'Colorist',
      'VFX Artist',
      'Post-Production Supervisor',
      'Sound Designer',
      'Documentary Editor',
    ],
    thumbnailImage: '/images/courses/film-editing.jpg',
  },
]

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug)
}

export function getStaticCourseSlugs(): { slug: string }[] {
  return COURSES.map((c) => ({ slug: c.slug }))
}
