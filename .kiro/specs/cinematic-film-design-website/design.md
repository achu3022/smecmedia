# Design Document: Cinematic Film Design Website

## Overview

This document describes the technical architecture and implementation design for a premium cinematic multi-page website for a Graphic Design & Film Editing training institute. The site is built with **Next.js 14 App Router**, delivering an immersive film-industry aesthetic through 3D scenes (React Three Fiber), scroll-based animations (GSAP ScrollTrigger), component-level transitions (Framer Motion), and a glassmorphism design system.

The site has six distinct pages — Home (`/`), Courses (`/courses`), Course Detail (`/courses/[slug]`), About (`/about`), Gallery (`/gallery`), and Contact (`/contact`) — all wrapped in a shared Root Layout that provides the Navbar, Footer, Loading Screen, and Scroll Progress Indicator.

### Key Design Decisions

- **App Router over Pages Router**: Enables React Server Components for static data pages, reducing client-side JS.
- **`ssr: false` dynamic imports for Three.js and heavy GSAP components**: Prevents hydration mismatches and keeps the initial server-rendered HTML lightweight.
- **Static TypeScript data constants** (no database): All course data, testimonials, and gallery items are defined as typed constants in `src/data/`, making the site fully static and deployable to any CDN.
- **Mobile-first Tailwind CSS**: All layout decisions start at the smallest breakpoint and scale up.
- **Framer Motion for component transitions, GSAP for scroll-driven timelines**: Each library is used where it excels — Framer Motion for declarative enter/exit animations, GSAP ScrollTrigger for precise scroll-position-driven effects.

---

## Architecture

### Folder Structure

```
cinematic-film-website/
├── public/
│   ├── images/
│   │   ├── gallery/          # Gallery thumbnails and full-size images
│   │   ├── instructors/      # Instructor profile photos
│   │   └── og/               # Open Graph images
│   ├── models/               # GLTF/GLB 3D model files (camera, reel, clapperboard)
│   └── fonts/                # Self-hosted display fonts (Cinzel, Inter)
│
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # Root Layout (Navbar, Footer, LoadingScreen, ScrollProgress)
│   │   ├── globals.css       # CSS custom properties, base styles, smooth scroll
│   │   ├── page.tsx          # Home page (/)
│   │   ├── courses/
│   │   │   ├── page.tsx      # Courses listing (/courses)
│   │   │   └── [slug]/
│   │   │       └── page.tsx  # Course detail (/courses/[slug])
│   │   ├── about/
│   │   │   └── page.tsx      # About page (/about)
│   │   ├── gallery/
│   │   │   └── page.tsx      # Gallery page (/gallery)
│   │   └── contact/
│   │       └── page.tsx      # Contact/Enrollment page (/contact)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LoadingScreen.tsx
│   │   │   └── ScrollProgressIndicator.tsx
│   │   │
│   │   ├── three/
│   │   │   ├── HeroScene.tsx          # RTF Canvas wrapper (dynamic import, ssr:false)
│   │   │   ├── FilmCamera.tsx         # 3D camera object
│   │   │   ├── FilmReel.tsx           # 3D film reel object
│   │   │   ├── Clapperboard.tsx       # 3D clapperboard object
│   │   │   └── WebGLFallback.tsx      # Static image fallback
│   │   │
│   │   ├── ui/
│   │   │   ├── GlassCard.tsx          # Glassmorphism card primitive
│   │   │   ├── MagneticButton.tsx     # Cursor-following CTA button
│   │   │   ├── TiltCard.tsx           # 3D tilt-on-hover card wrapper
│   │   │   ├── GoldGlow.tsx           # Gold glow highlight wrapper
│   │   │   ├── GoldShimmerHeading.tsx # Section heading with shimmer on scroll entry
│   │   │   ├── PageHero.tsx           # Reusable page hero banner
│   │   │   └── Breadcrumb.tsx         # Breadcrumb navigation
│   │   │
│   │   ├── sections/
│   │   │   ├── home/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── CoursesPreview.tsx
│   │   │   │   ├── WhyChooseUs.tsx
│   │   │   │   ├── FilmStripSection.tsx   # GSAP ScrollTrigger horizontal scroll
│   │   │   │   ├── TimelineSection.tsx    # Video-editor timeline animation
│   │   │   │   ├── TestimonialsCarousel.tsx
│   │   │   │   └── CTABanner.tsx
│   │   │   ├── courses/
│   │   │   │   └── CourseCard.tsx
│   │   │   ├── about/
│   │   │   │   ├── OurStory.tsx
│   │   │   │   ├── BenefitItem.tsx
│   │   │   │   ├── InstructorCard.tsx
│   │   │   │   └── TestimonialsFull.tsx
│   │   │   ├── gallery/
│   │   │   │   ├── GalleryGrid.tsx
│   │   │   │   ├── GalleryItem.tsx
│   │   │   │   ├── FilterBar.tsx
│   │   │   │   └── Lightbox.tsx
│   │   │   └── contact/
│   │   │       ├── EnrollmentForm.tsx
│   │   │       └── ContactInfo.tsx
│   │   │
│   │   └── animations/
│   │       ├── PageTransition.tsx     # Framer Motion page wrapper
│   │       ├── FadeUpOnScroll.tsx     # Intersection Observer + Framer Motion
│   │       └── ParticleOverlay.tsx    # Film grain / particle canvas
│   │
│   ├── data/
│   │   ├── courses.ts         # Course data constants
│   │   ├── testimonials.ts    # Testimonial data constants
│   │   ├── gallery.ts         # Gallery item data constants
│   │   └── navigation.ts      # Nav links and footer links
│   │
│   ├── hooks/
│   │   ├── useScrollProgress.ts   # Scroll position → 0–1 progress value
│   │   ├── useWebGL.ts            # WebGL support detection
│   │   ├── useSessionStorage.ts   # Loading screen session flag
│   │   └── useMagneticEffect.ts   # Cursor tracking for MagneticButton
│   │
│   ├── lib/
│   │   └── utils.ts           # cn() classname helper, validation utilities
│   │
│   └── types/
│       ├── course.ts
│       ├── testimonial.ts
│       └── gallery.ts
│
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

### Route Map

| Route | File | Rendering |
|---|---|---|
| `/` | `app/page.tsx` | Server Component (static) |
| `/courses` | `app/courses/page.tsx` | Server Component (static) |
| `/courses/[slug]` | `app/courses/[slug]/page.tsx` | Static generation (`generateStaticParams`) |
| `/about` | `app/about/page.tsx` | Server Component (static) |
| `/gallery` | `app/gallery/page.tsx` | Server Component (static) |
| `/contact` | `app/contact/page.tsx` | Server Component (static) |

All pages are statically generated at build time. Client-side interactivity is isolated to Client Components (`"use client"`) within the component tree.

---

## Components and Interfaces

### Root Layout (`app/layout.tsx`)

```typescript
// Server Component — wraps every page
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LoadingScreen />          {/* Client Component */}
        <ScrollProgressIndicator /> {/* Client Component */}
        <Navbar />                  {/* Client Component */}
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />                  {/* Client Component */}
      </body>
    </html>
  )
}
```

### Navbar

**Props:** none (reads `usePathname()` internally)

**State:**
- `scrolled: boolean` — true when `window.scrollY > 80`
- `menuOpen: boolean` — mobile hamburger state

**Behavior:**
- `useEffect` attaches a `scroll` event listener; sets `scrolled` when threshold crossed
- Active link detection via `usePathname()` from `next/navigation`
- Background transitions: `transparent` → `rgba(11,11,11,0.85)` with `backdrop-blur-[12px]`
- Mobile: hamburger icon toggles `menuOpen`; full-width dropdown panel with `AnimatePresence`

### LoadingScreen

**Props:** none

**State:** `visible: boolean` — controlled by `useSessionStorage('loading-shown', false)`

**Behavior:**
- On mount, checks `sessionStorage` for `'loading-shown'` key
- If not set: renders full-viewport overlay, plays shimmer animation (CSS keyframe on title text), sets key after 3s, fades out over 600ms
- If already set: renders `null` immediately

### ScrollProgressIndicator

**Props:** none

**Behavior:**
- `useScrollProgress()` hook returns a `motionValue` (0–1)
- Renders a `<motion.div>` with `scaleX` driven by the motion value, `transform-origin: left`
- Fixed position, `top: 64px` (below Navbar), full width, `h-[3px]`, gold background + box-shadow glow

### GlassCard

```typescript
interface GlassCardProps {
  children: React.ReactNode
  className?: string
  tilt?: boolean      // enables TiltCard wrapper
  glow?: boolean      // enables Gold_Glow on hover
}
```

**Styles:** `bg-[rgba(31,41,55,0.6)] backdrop-blur-[16px] border border-[rgba(212,175,55,0.3)] rounded-2xl`

### MagneticButton

```typescript
interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant: 'primary' | 'secondary'  // gold-filled vs gold-outlined
  className?: string
}
```

**Behavior:** `useMagneticEffect(40)` hook tracks cursor position within 40px radius; applies `transform: translate(dx, dy)` via `useSpring` for smooth follow.

### TiltCard

```typescript
interface TiltCardProps {
  children: React.ReactNode
  maxTilt?: number   // default 10 degrees
  className?: string
}
```

**Behavior:** `onMouseMove` calculates normalized cursor position within element bounds; applies `rotateX` and `rotateY` via Framer Motion `useMotionValue` + `useSpring`.

### PageHero

```typescript
interface PageHeroProps {
  heading: string
  subheading?: string
  backgroundImage?: string
}
```

Reused on `/courses`, `/about`, `/gallery`, `/contact` pages. Renders a full-width banner with a cinematic gradient overlay.

### EnrollmentForm

```typescript
interface FormValues {
  fullName: string
  phone: string
  email: string
  courseInterest: 'ai-graphic-design' | 'film-editing-post-production' | ''
  message: string
}

interface FormErrors {
  fullName?: string
  phone?: string
  email?: string
  courseInterest?: string
}
```

**Validation logic** (pure functions, no external library dependency for core logic):
- `validateEmail(email: string): boolean` — regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- `validatePhone(phone: string): boolean` — regex `/^\d{10}$/`
- `validateRequired(value: string): boolean` — `value.trim().length > 0`

**State machine:**
- `idle` → `submitting` → `success` | `error`

### Lightbox

```typescript
interface LightboxProps {
  items: GalleryItem[]
  initialIndex: number
  onClose: () => void
}
```

**Behavior:**
- Renders a full-viewport overlay with `position: fixed`
- `useEffect` attaches `keydown` listener: `ArrowLeft` → prev, `ArrowRight` → next, `Escape` → `onClose()`
- On close, returns focus to the triggering `<button>` element via a stored `ref`
- Navigation wraps around (last → first, first → last)

### HeroScene (Three.js)

Dynamically imported with `ssr: false`:

```typescript
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => <WebGLFallback />
})
```

**Canvas setup:**
- `<Canvas camera={{ position: [0, 0, 5], fov: 60 }}`
- `<ambientLight intensity={0.4} />`
- `<pointLight position={[10, 10, 10]} color="#D4AF37" intensity={1.2} />`
- `<Suspense fallback={null}>` wraps all 3D objects
- `<OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />`

**3D Objects:**

| Component | Geometry | Position | Animation |
|---|---|---|---|
| `FilmCamera` | BoxGeometry (simplified) or GLTF | `[-2, 0.5, 0]` | Sinusoidal Y float, slow Y rotation |
| `FilmReel` | TorusGeometry + CylinderGeometry | `[0, -0.5, -1]` | Sinusoidal Y float (offset phase), spin on Z |
| `Clapperboard` | BoxGeometry composite | `[2, 0.3, 0]` | Sinusoidal Y float (offset phase), slight X tilt |

Each object uses `useFrame((state) => { mesh.current.position.y = Math.sin(state.clock.elapsedTime + phaseOffset) * 0.2 })` for the floating animation.

**Mobile optimization:** A `useMediaQuery('(max-width: 767px)')` hook reduces rendered objects to one (FilmReel only) on mobile.

**WebGL detection:** `useWebGL()` hook calls `document.createElement('canvas').getContext('webgl')` — if `null`, renders `<WebGLFallback />` (a Next.js `<Image>` of a cinematic still).

### FilmStripSection

Dynamically imported with `ssr: false` (uses GSAP):

```typescript
const FilmStripSection = dynamic(
  () => import('@/components/sections/home/FilmStripSection'),
  { ssr: false }
)
```

**GSAP ScrollTrigger setup:**
```typescript
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to(stripRef.current, {
      x: () => -(stripRef.current.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${stripRef.current.scrollWidth}`,
        scrub: 1,
        pin: true,
      }
    })
  }, containerRef)
  return () => ctx.revert()
}, [])
```

### TimelineSection

**GSAP ScrollTrigger setup:**
```typescript
gsap.to(playheadRef.current, {
  x: containerWidth,
  ease: 'none',
  scrollTrigger: {
    trigger: timelineRef.current,
    start: 'top 80%',
    end: '+=300',
    scrub: true,
  }
})
```

### FadeUpOnScroll

Reusable wrapper using Framer Motion `whileInView`:

```typescript
interface FadeUpOnScrollProps {
  children: React.ReactNode
  delay?: number   // stagger delay in seconds
  className?: string
}

// Usage:
<FadeUpOnScroll delay={0.15 * index}>
  <BenefitItem ... />
</FadeUpOnScroll>
```

**Animation variant:**
```typescript
const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}
```

### PageTransition

Wraps page content in Framer Motion `AnimatePresence` + `motion.div`:

```typescript
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit:    { opacity: 0, transition: { duration: 0.3 } }
}
```

---

## Data Models

### Course

```typescript
// src/types/course.ts
export interface CourseModule {
  title: string
  topics: string[]
}

export interface Course {
  id: string
  slug: string                    // URL slug, e.g. 'ai-graphic-design'
  title: string
  shortDescription: string
  duration: string                // e.g. '7 Months'
  eligibility: string
  originalFee: string             // e.g. '₹90,000'
  offerFee: string                // e.g. '₹75,000 / ₹70,000'
  curriculum: CourseModule[]
  learningOutcomes: string[]      // min 5 items
  careerOpportunities: string[]   // min 3 items
  thumbnailImage: string          // path to public/images/
}
```

```typescript
// src/data/courses.ts
export const COURSES: Course[] = [
  {
    id: 'course-1',
    slug: 'ai-graphic-design',
    title: 'AI Integrated Graphic Designing & Video Editing',
    shortDescription: 'Master the full creative pipeline from brand identity to motion graphics, powered by AI tools.',
    duration: '7 Months',
    eligibility: 'Plus Two and Above',
    originalFee: '₹90,000',
    offerFee: '₹75,000 / ₹70,000',
    curriculum: [
      { title: 'Design Fundamentals', topics: ['Color Theory', 'Typography', 'Composition'] },
      { title: 'Adobe Creative Suite', topics: ['Photoshop', 'Illustrator', 'InDesign'] },
      { title: 'Motion Graphics', topics: ['After Effects', 'Premiere Pro'] },
      { title: 'AI-Powered Tools', topics: ['Midjourney', 'Adobe Firefly', 'RunwayML'] },
      { title: 'Brand Identity Projects', topics: ['Logo Design', 'Brand Guidelines', 'Portfolio'] },
    ],
    learningOutcomes: [
      'Create professional brand identities from scratch',
      'Edit and color-grade video content to broadcast standards',
      'Use AI tools to accelerate creative workflows',
      'Build a portfolio of real client-ready projects',
      'Deliver motion graphics for social media and OTT platforms',
    ],
    careerOpportunities: [
      'Graphic Designer',
      'Motion Graphics Artist',
      'Social Media Content Creator',
      'UI/UX Designer',
    ],
    thumbnailImage: '/images/courses/ai-graphic-design.jpg',
  },
  {
    id: 'course-2',
    slug: 'film-editing-post-production',
    title: 'Master Program in Film Editing & Post Production',
    shortDescription: 'A comprehensive 12-month deep dive into professional film editing, color grading, VFX, and sound design.',
    duration: '12 Months',
    eligibility: 'Plus Two and Above',
    originalFee: '₹1,50,000',
    offerFee: '₹1,25,000 / ₹1,20,000',
    curriculum: [
      { title: 'Film Editing Fundamentals', topics: ['Story Structure', 'Pacing', 'Continuity'] },
      { title: 'DaVinci Resolve', topics: ['Cut Page', 'Edit Page', 'Color Page', 'Fusion'] },
      { title: 'Visual Effects', topics: ['Compositing', 'Green Screen', 'Motion Tracking'] },
      { title: 'Sound Design', topics: ['Audio Mixing', 'Foley', 'Music Scoring'] },
      { title: 'Industry Projects', topics: ['Short Film', 'Documentary', 'Commercial'] },
    ],
    learningOutcomes: [
      'Edit feature-length films and documentaries professionally',
      'Perform advanced color grading for cinematic looks',
      'Create VFX composites using industry-standard tools',
      'Design and mix professional audio for film',
      'Build a showreel that meets industry hiring standards',
      'Understand the full post-production pipeline end-to-end',
    ],
    careerOpportunities: [
      'Film Editor',
      'Colorist',
      'VFX Artist',
      'Post-Production Supervisor',
    ],
    thumbnailImage: '/images/courses/film-editing.jpg',
  },
]

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find(c => c.slug === slug)
}

export function getStaticCourseSlugs(): { slug: string }[] {
  return COURSES.map(c => ({ slug: c.slug }))
}
```

### Testimonial

```typescript
// src/types/testimonial.ts
export interface Testimonial {
  id: string
  studentName: string
  courseCompleted: string   // course title or slug
  rating: 1 | 2 | 3 | 4 | 5
  quote: string             // 1–3 sentences
  avatarImage?: string
}
```

```typescript
// src/data/testimonials.ts
export const TESTIMONIALS: Testimonial[] = [
  // 6+ entries with rating 1–5, quote 1–3 sentences
  {
    id: 't1',
    studentName: 'Arjun Menon',
    courseCompleted: 'AI Integrated Graphic Designing & Video Editing',
    rating: 5,
    quote: 'The AI tools module completely changed how I approach design. I landed a job at a production house within two months of graduating.',
  },
  // ... 5 more entries
]
```

### GalleryItem

```typescript
// src/types/gallery.ts
export type GalleryCategory = 'Graphic Design' | 'Film Editing' | 'Events'

export interface GalleryItem {
  id: string
  src: string           // path to public/images/gallery/
  alt: string
  category: GalleryCategory
  type: 'image' | 'video'
  thumbnailSrc?: string // optional separate thumbnail
}
```

```typescript
// src/data/gallery.ts
export const GALLERY_ITEMS: GalleryItem[] = [
  // 12+ items across all three categories
]

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'Graphic Design',
  'Film Editing',
  'Events',
]
```

### Navigation

```typescript
// src/data/navigation.ts
export interface NavLink {
  label: string
  href: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]
```

### Design Tokens (CSS Custom Properties)

```css
/* src/app/globals.css */
:root {
  --color-bg:    #0B0B0B;
  --color-gold:  #D4AF37;
  --color-card:  #1F2937;
  --color-text:  #F9FAFB;

  /* Derived tokens */
  --color-gold-30:  rgba(212, 175, 55, 0.3);
  --color-gold-40:  rgba(212, 175, 55, 0.4);
  --color-card-60:  rgba(31, 41, 55, 0.6);
  --color-bg-85:    rgba(11, 11, 11, 0.85);
}

html {
  scroll-behavior: smooth;
  background-color: var(--color-bg);
  color: var(--color-text);
}
```

```typescript
// tailwind.config.ts — extend theme with design tokens
theme: {
  extend: {
    colors: {
      bg:   '#0B0B0B',
      gold: '#D4AF37',
      card: '#1F2937',
      text: '#F9FAFB',
    },
    fontFamily: {
      display: ['Cinzel', 'serif'],   // headings
      body:    ['Inter', 'sans-serif'],
    },
  }
}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Property-based testing (PBT) is applicable to this feature because it contains several pure functions (scroll progress calculation, parallax offset calculation, form validation, animation math, data filtering) and universal data constraints (course data completeness, gallery item counts, testimonial rendering) that benefit from exhaustive input coverage. The PBT library chosen is **fast-check** (TypeScript-native, works with Vitest/Jest).

---

### Property 1: Active Navbar Link Matches Current Route

*For any* valid pathname in the set of application routes (`/`, `/courses`, `/about`, `/gallery`, `/contact`), the Navbar should highlight exactly one navigation link, and that link's `href` should exactly match the current pathname.

**Validates: Requirements 3.7**

---

### Property 2: Footer Copyright Year Reflects Current Year

*For any* year value passed to the Footer's copyright rendering function, the rendered copyright text should contain that year as a substring.

**Validates: Requirements 4.5**

---

### Property 3: Loading Screen Skips When Session Flag Is Set

*For any* session storage state where the `'loading-shown'` key is set to a truthy value, the `LoadingScreen` component should render `null` (produce no visible output).

**Validates: Requirements 5.5**

---

### Property 4: 3D Object Floating Animation Is Sinusoidal

*For any* elapsed time value `t` (seconds) and phase offset `φ`, the computed Y-axis position of a floating 3D object should equal `Math.sin(t + φ) * amplitude`, where `amplitude` is a fixed constant. The result should always be in the range `[-amplitude, +amplitude]`.

**Validates: Requirements 7.3**

---

### Property 5: Parallax Offset Is Proportional to Scroll Position

*For any* scroll position `scrollY` (non-negative number) and parallax speed factor `f` (where `0 < f < 1`), the computed parallax offset should equal `scrollY * f`. For the Hero Section parallax layers, `f = 0.6`.

**Validates: Requirements 7.10**

---

### Property 6: WebGL Fallback Is Always Shown When WebGL Is Unavailable

*For any* state where the `useWebGL()` hook returns `false`, the `HeroScene` component should render the `WebGLFallback` component and never render the Three.js `Canvas`.

**Validates: Requirements 7.14**

---

### Property 7: Scroll Progress Value Is Clamped to [0, 1]

*For any* scroll position `scrollY` in the range `[0, documentHeight]` and any document height greater than the viewport height, the computed scroll progress value should equal `scrollY / (documentHeight - viewportHeight)`, and the result should always be clamped to the range `[0, 1]` (never negative, never greater than 1).

**Validates: Requirements 8.2**

---

### Property 8: CourseCard Renders Complete Course Data and Navigation

*For any* `Course` object in the data set, the rendered `CourseCard` component should:
- Display the course `title`, `duration`, `eligibility`, and `shortDescription`
- Display `originalFee` with a strikethrough style
- Display `offerFee` highlighted in gold (`#D4AF37`)
- Contain a "View Details" link whose `href` is `/courses/[course.slug]`
- Contain an "Enroll Now" link whose `href` is `/contact`

**Validates: Requirements 9.3, 9.4, 9.5, 9.9, 9.11**

---

### Property 9: Course Detail Page Renders All Course Data

*For any* `Course` object, the rendered `CourseDetailPage` should display:
- The full `title`, `duration`, `eligibility`, `originalFee`, and `offerFee`
- All `curriculum` module titles
- All `learningOutcomes` items
- All `careerOpportunities` items
- A "Related Course" card whose slug is different from the current course's slug

**Validates: Requirements 10.2, 10.3, 10.9**

---

### Property 10: Course Data Completeness Invariant

*For any* `Course` object in the `COURSES` array:
- `learningOutcomes.length` should be `>= 5`
- `careerOpportunities.length` should be `>= 3`
- `slug` should be a non-empty string containing only lowercase letters, digits, and hyphens
- `curriculum` should be a non-empty array

**Validates: Requirements 10.4, 10.5**

---

### Property 11: Lightbox Navigation Wraps Correctly

*For any* gallery items array of length `n > 0` and any current index `i` in `[0, n-1]`:
- Pressing `ArrowRight` should navigate to index `(i + 1) % n`
- Pressing `ArrowLeft` should navigate to index `(i - 1 + n) % n`
- The resulting index should always be in the range `[0, n-1]`

**Validates: Requirements 12.5**

---

### Property 12: Gallery Filter Returns Only Matching Items

*For any* `GalleryCategory` value and any array of `GalleryItem` objects, filtering the array by that category should return only items where `item.category === selectedCategory`. No item from a different category should appear in the filtered result.

**Validates: Requirements 12.8**

---

### Property 13: Form Validation Correctly Identifies Invalid Inputs

*For any* `FormValues` object:
- If `fullName.trim()` is empty, validation should return an error for `fullName`
- If `courseInterest` is empty, validation should return an error for `courseInterest`
- For any string that does not match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, `validateEmail()` should return `false`; for any string that does match, it should return `true`
- For any string that is not exactly 10 consecutive digit characters (`/^\d{10}$/`), `validatePhone()` should return `false`; for any 10-digit string, it should return `true`

**Validates: Requirements 13.5, 13.6, 13.7**

---

### Property 14: Film Strip Horizontal Translation Is Proportional to Scroll Progress

*For any* scroll progress value `p` in `[0, 1]`, strip width `w`, and viewport width `v` (where `w > v`), the computed horizontal translation of the film strip should equal `-p * (w - v)`. At `p = 0` the strip is at its starting position; at `p = 1` the strip has scrolled fully to reveal its end.

**Validates: Requirements 14.2**

---

### Property 15: Testimonial Data Completeness and Card Rendering

*For any* `Testimonial` object in the `TESTIMONIALS` array:
- `rating` should be an integer in `[1, 5]`
- `quote` should be a non-empty string
- `studentName` should be a non-empty string
- `courseCompleted` should be a non-empty string
- The rendered `TestimonialCard` should display all four fields

Additionally, `TESTIMONIALS.length` should be `>= 6` to satisfy both the Home Page preview (3 cards) and the About Page full section (6 cards).

**Validates: Requirements 15.1, 15.2, 15.3**

---

### Property 16: Keyboard Focus Ring Is Applied to All Interactive Elements

*For any* interactive element (button, anchor, input, select, textarea) rendered in the application, the element's `focus-visible` CSS state should apply a gold-colored (`#D4AF37`) outline of at least `2px` width.

**Validates: Requirements 16.4**

---

## Error Handling

### WebGL Unavailability

- `useWebGL()` hook wraps `canvas.getContext('webgl')` in a try/catch
- If WebGL is unavailable (returns `null` or throws), the hook returns `false`
- `HeroScene` renders `<WebGLFallback />` — a Next.js `<Image>` of a cinematic still — instead of the Three.js Canvas
- The fallback image has the same dimensions as the Canvas to prevent layout shift

### Form Submission Errors

- The `EnrollmentForm` uses a local state machine: `idle → submitting → success | error`
- On network error (if a real API is added later), the form transitions to `error` state and displays a generic error message: "Something went wrong. Please try again or call us directly."
- Client-side validation runs on submit and on blur for each field, preventing submission with invalid data
- All validation is synchronous and pure — no async validation

### Dynamic Import Loading States

- `HeroScene` dynamic import shows `<WebGLFallback />` as its loading state (not a spinner, to avoid layout shift)
- `FilmStripSection` and `TimelineSection` show a transparent placeholder `<div>` with the same height as the section during loading
- All dynamic imports use `ssr: false` to prevent server-side rendering errors from Three.js and GSAP's `window` references

### GSAP ScrollTrigger Cleanup

- All GSAP contexts are created with `gsap.context(() => { ... }, containerRef)` and cleaned up with `ctx.revert()` in the `useLayoutEffect` cleanup function
- This prevents memory leaks and animation conflicts when components unmount (e.g., during page navigation)

### Missing Course Slug

- `getCourseBySlug()` returns `undefined` for unknown slugs
- The `[slug]/page.tsx` calls `notFound()` from `next/navigation` if the course is not found, rendering the Next.js 404 page
- `generateStaticParams()` pre-generates only valid slugs, so unknown slugs only occur if someone manually types an invalid URL

### Image Loading Errors

- All `<Image>` components include an `alt` attribute for accessibility
- Gallery images use `placeholder="blur"` with a `blurDataURL` for smooth loading
- Instructor and course images fall back to a generic placeholder if the source is missing

---

## Testing Strategy

### Overview

The testing strategy uses a dual approach:
- **Unit tests** (Vitest + React Testing Library): specific examples, edge cases, component rendering
- **Property-based tests** (Vitest + fast-check): universal properties across generated inputs

Both test types are complementary. Unit tests catch concrete bugs in specific scenarios; property tests verify general correctness across the full input space.

### Test Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
})
```

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom'
// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
  useRouter: vi.fn(() => ({ push: vi.fn() })),
}))
// Mock next/image
vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}))
```

### Property-Based Test Configuration

Each property test uses **fast-check** with a minimum of **100 iterations**:

```typescript
import fc from 'fast-check'
import { it, expect } from 'vitest'

// Tag format: Feature: cinematic-film-design-website, Property N: <property_text>
it('Property 7: scroll progress is clamped to [0,1]', () => {
  // Feature: cinematic-film-design-website, Property 7: scroll progress value is clamped to [0,1]
  fc.assert(
    fc.property(
      fc.integer({ min: 0, max: 10000 }),  // scrollY
      fc.integer({ min: 100, max: 5000 }), // documentHeight
      fc.integer({ min: 100, max: 900 }),  // viewportHeight
      (scrollY, documentHeight, viewportHeight) => {
        fc.pre(documentHeight > viewportHeight)
        const progress = computeScrollProgress(scrollY, documentHeight, viewportHeight)
        return progress >= 0 && progress <= 1
      }
    ),
    { numRuns: 100 }
  )
})
```

### Test File Organization

```
src/
├── __tests__/
│   ├── unit/
│   │   ├── components/
│   │   │   ├── Navbar.test.tsx
│   │   │   ├── Footer.test.tsx
│   │   │   ├── LoadingScreen.test.tsx
│   │   │   ├── GlassCard.test.tsx
│   │   │   ├── EnrollmentForm.test.tsx
│   │   │   ├── Lightbox.test.tsx
│   │   │   └── CourseCard.test.tsx
│   │   └── lib/
│   │       └── utils.test.ts
│   └── property/
│       ├── scrollProgress.property.test.ts   # Property 7
│       ├── parallax.property.test.ts          # Properties 4, 5
│       ├── validation.property.test.ts        # Properties 13
│       ├── lightbox.property.test.ts          # Property 11
│       ├── gallery.property.test.ts           # Properties 12, 15
│       ├── courseData.property.test.ts        # Properties 8, 9, 10
│       ├── testimonialData.property.test.ts   # Property 15
│       ├── filmStrip.property.test.ts         # Property 14
│       └── navbar.property.test.ts            # Properties 1, 2, 3, 6, 16
```

### Unit Test Coverage Targets

| Area | Approach |
|---|---|
| Navbar scroll behavior | Example tests: scrollY=0 (transparent), scrollY=81 (dark), active link highlighting |
| LoadingScreen | Example tests: first visit (visible), return visit (hidden) |
| EnrollmentForm | Example tests: valid submission, empty fields, invalid email, invalid phone |
| Lightbox | Example tests: open, close (Escape), arrow navigation, focus return |
| CourseCard | Example tests: renders all fields, strikethrough fee, gold offer fee |
| GlassCard | Example tests: glassmorphism styles, hover glow, tilt effect |
| Breadcrumb | Example tests: correct trail for each course slug |
| Gallery filter | Example tests: each category filter, "All" filter |

### Property Test Summary

| Property | Test File | fast-check Arbitraries | Iterations |
|---|---|---|---|
| 1: Active nav link | navbar.property.test.ts | `fc.constantFrom('/', '/courses', '/about', '/gallery', '/contact')` | 100 |
| 2: Copyright year | navbar.property.test.ts | `fc.integer({ min: 2000, max: 2100 })` | 100 |
| 3: Loading screen session skip | navbar.property.test.ts | `fc.string()` (truthy session values) | 100 |
| 4: Sinusoidal float | parallax.property.test.ts | `fc.float()` (time), `fc.float()` (phase) | 100 |
| 5: Parallax offset | parallax.property.test.ts | `fc.integer({ min: 0, max: 10000 })` (scrollY) | 100 |
| 6: WebGL fallback | navbar.property.test.ts | `fc.constant(false)` (WebGL unavailable) | 100 |
| 7: Scroll progress clamped | scrollProgress.property.test.ts | `fc.integer` (scrollY, docHeight, viewportHeight) | 100 |
| 8: CourseCard completeness | courseData.property.test.ts | `fc.constantFrom(...COURSES)` | 100 |
| 9: CourseDetailPage completeness | courseData.property.test.ts | `fc.constantFrom(...COURSES)` | 100 |
| 10: Course data invariants | courseData.property.test.ts | `fc.constantFrom(...COURSES)` | 100 |
| 11: Lightbox navigation wraps | lightbox.property.test.ts | `fc.array(fc.string(), {minLength:1})`, `fc.nat()` | 100 |
| 12: Gallery filter correctness | gallery.property.test.ts | `fc.constantFrom(...GALLERY_CATEGORIES)`, `fc.array(galleryItemArb)` | 100 |
| 13: Form validation | validation.property.test.ts | `fc.string()` (email, phone, name) | 100 |
| 14: Film strip translation | filmStrip.property.test.ts | `fc.float({min:0, max:1})` (progress), `fc.integer` (widths) | 100 |
| 15: Testimonial completeness | testimonialData.property.test.ts | `fc.constantFrom(...TESTIMONIALS)` | 100 |
| 16: Focus ring | navbar.property.test.ts | `fc.constantFrom('button', 'a', 'input', 'select', 'textarea')` | 100 |

### Performance Testing

- Lighthouse CI runs on every pull request targeting a score of ≥ 70 on mobile
- Bundle size is monitored with `@next/bundle-analyzer`
- Three.js and GSAP are excluded from the initial bundle via `dynamic()` imports

### Accessibility Testing

- All interactive elements have `aria-label` or visible text
- Lightbox traps focus within the overlay while open (using `focus-trap-react` or a custom hook)
- Keyboard navigation is tested in unit tests (Escape closes lightbox, arrow keys navigate)
- Color contrast ratios for gold (`#D4AF37`) on dark (`#0B0B0B`) background meet WCAG 2.1 AA (contrast ratio ≈ 8.5:1)
- Note: Full WCAG compliance requires manual testing with assistive technologies and expert accessibility review
