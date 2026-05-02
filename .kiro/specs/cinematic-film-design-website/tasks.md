# Implementation Plan: Cinematic Film Design Website

## Overview

Build a premium cinematic multi-page Next.js 14 App Router website for a Graphic Design & Film Editing training institute. The implementation proceeds in layers: project scaffolding and data → shared layout and UI primitives → page-by-page feature implementation → animations and 3D scenes → testing and polish.

## Tasks

- [x] 1. Project scaffolding, configuration, and type definitions
  - Bootstrap a Next.js 14 App Router project with TypeScript (`npx create-next-app@latest --typescript --tailwind --app`)
  - Configure `tailwind.config.ts` to extend the theme with design tokens: colors (`bg`, `gold`, `card`, `text`), font families (`display: Cinzel`, `body: Inter`)
  - Configure `next.config.ts` with any required image domains and bundle settings
  - Write `src/app/globals.css` with CSS custom properties (`--color-bg`, `--color-gold`, `--color-card`, `--color-text` and derived tokens), `scroll-behavior: smooth`, and base dark-mode body styles
  - Create `src/types/course.ts`, `src/types/testimonial.ts`, and `src/types/gallery.ts` with all interfaces defined in the design (`Course`, `CourseModule`, `Testimonial`, `GalleryItem`, `GalleryCategory`)
  - Install all required dependencies: `framer-motion`, `gsap`, `@gsap/react`, `three`, `@react-three/fiber`, `@react-three/drei`, `fast-check`, `vitest`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/jest-dom`
  - Create `vitest.config.ts` and `src/test/setup.ts` with mocks for `next/navigation` and `next/image`
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

- [x] 2. Static data constants
  - Create `src/data/courses.ts` with the `COURSES` array (both courses with all fields), `getCourseBySlug()`, and `getStaticCourseSlugs()` as defined in the design
  - Create `src/data/testimonials.ts` with at least 6 `Testimonial` entries covering both courses, each with `rating` in `[1,5]`, non-empty `quote`, `studentName`, and `courseCompleted`
  - Create `src/data/gallery.ts` with at least 12 `GalleryItem` entries spread across all three categories (`Graphic Design`, `Film Editing`, `Events`), and export `GALLERY_CATEGORIES`
  - Create `src/data/navigation.ts` with `NAV_LINKS` and footer link arrays
  - _Requirements: 9.3, 9.4, 9.5, 10.2, 10.3, 10.4, 10.5, 12.3, 15.1, 15.2_

  - [ ]* 2.1 Write property test for course data completeness invariant
    - **Property 10: Course Data Completeness Invariant**
    - Verify `learningOutcomes.length >= 5`, `careerOpportunities.length >= 3`, `slug` matches `/^[a-z0-9-]+$/`, `curriculum` is non-empty for every course
    - **Validates: Requirements 10.4, 10.5**

  - [ ]* 2.2 Write property test for testimonial data completeness
    - **Property 15: Testimonial Data Completeness and Card Rendering**
    - Verify `rating` in `[1,5]`, non-empty `quote`, `studentName`, `courseCompleted` for every testimonial; verify `TESTIMONIALS.length >= 6`
    - **Validates: Requirements 15.1, 15.2, 15.3**

- [x] 3. Utility functions and custom hooks
  - Create `src/lib/utils.ts` with `cn()` classname helper, `validateEmail()`, `validatePhone()`, and `validateRequired()` pure functions as specified in the design
  - Create `src/hooks/useScrollProgress.ts` returning a Framer Motion `motionValue` in `[0, 1]` computed from `scrollY / (documentHeight - viewportHeight)`, clamped to `[0, 1]`
  - Create `src/hooks/useWebGL.ts` that calls `document.createElement('canvas').getContext('webgl')` in a try/catch and returns a boolean
  - Create `src/hooks/useSessionStorage.ts` for reading/writing a session storage key
  - Create `src/hooks/useMagneticEffect.ts` that tracks cursor position within a configurable radius and returns `dx`/`dy` spring values
  - _Requirements: 3.2, 3.3, 5.5, 7.8, 7.14, 8.2, 13.5, 13.6, 13.7_

  - [ ]* 3.1 Write property test for scroll progress clamping
    - **Property 7: Scroll Progress Value Is Clamped to [0, 1]**
    - Use `fc.integer` arbitraries for `scrollY`, `documentHeight`, `viewportHeight`; assert result is always in `[0, 1]`
    - **Validates: Requirements 8.2**

  - [ ]* 3.2 Write property test for form validation functions
    - **Property 13: Form Validation Correctly Identifies Invalid Inputs**
    - Use `fc.string()` arbitraries; assert `validateEmail` returns `false` for non-matching strings and `true` for matching; assert `validatePhone` returns `false` for non-10-digit strings
    - **Validates: Requirements 13.5, 13.6, 13.7**

  - [ ]* 3.3 Write property test for sinusoidal float animation math
    - **Property 4: 3D Object Floating Animation Is Sinusoidal**
    - Use `fc.float()` for time `t` and phase `φ`; assert `Math.sin(t + φ) * amplitude` is always in `[-amplitude, +amplitude]`
    - **Validates: Requirements 7.3**

  - [ ]* 3.4 Write property test for parallax offset calculation
    - **Property 5: Parallax Offset Is Proportional to Scroll Position**
    - Use `fc.integer({ min: 0, max: 10000 })` for `scrollY`; assert computed offset equals `scrollY * f` for `f = 0.6`
    - **Validates: Requirements 7.10**

- [x] 4. Checkpoint — Ensure all data and utility tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Core UI primitive components
  - Create `src/components/ui/GlassCard.tsx` with glassmorphism styles (`bg-[rgba(31,41,55,0.6)] backdrop-blur-[16px] border border-[rgba(212,175,55,0.3)] rounded-2xl`) and optional `tilt` / `glow` props
  - Create `src/components/ui/TiltCard.tsx` using Framer Motion `useMotionValue` + `useSpring` to apply `rotateX`/`rotateY` up to `maxTilt` degrees on `onMouseMove`
  - Create `src/components/ui/GoldGlow.tsx` as a wrapper that applies a `#D4AF37` box-shadow glow on hover
  - Create `src/components/ui/MagneticButton.tsx` using `useMagneticEffect(40)` to apply `transform: translate(dx, dy)` via `useSpring`; support `variant: 'primary' | 'secondary'` and optional `href`
  - Create `src/components/ui/GoldShimmerHeading.tsx` that triggers a moving linear-gradient shimmer sweep when the element enters the viewport
  - Create `src/components/ui/PageHero.tsx` accepting `heading`, `subheading`, and `backgroundImage` props; renders a full-width banner with cinematic gradient overlay
  - Create `src/components/ui/Breadcrumb.tsx` accepting an array of `{ label, href }` items and rendering a breadcrumb trail
  - _Requirements: 9.6, 9.7, 9.8, 9.9, 10.7, 16.1, 16.2_

  - [ ]* 5.1 Write unit tests for GlassCard
    - Test glassmorphism styles are applied, hover glow renders, tilt effect activates on mouse move
    - _Requirements: 9.6, 9.7, 9.8_

  - [ ]* 5.2 Write unit tests for MagneticButton
    - Test primary and secondary variants render correctly; test cursor tracking applies transform
    - _Requirements: 7.8, 10.6, 13.8_

- [x] 6. Animation wrapper components
  - Create `src/components/animations/FadeUpOnScroll.tsx` using Framer Motion `whileInView` with `variants: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }` and a configurable `delay` prop
  - Create `src/components/animations/PageTransition.tsx` wrapping children in `AnimatePresence` + `motion.div` with `initial/animate/exit` opacity variants (400ms max)
  - Create `src/components/animations/ParticleOverlay.tsx` as a canvas-based film grain / particle overlay covering the full background
  - _Requirements: 9.10, 10.8, 11.6, 12.9, 13.11, 15.5, 16.6_

- [x] 7. Layout components: Navbar, Footer, LoadingScreen, ScrollProgressIndicator
  - Create `src/components/layout/LoadingScreen.tsx` using `useSessionStorage('loading-shown', false)`: renders full-viewport overlay with gold shimmer CSS keyframe on title text for 3s, then fades out over 600ms; renders `null` if session flag already set
  - Create `src/components/layout/ScrollProgressIndicator.tsx` using `useScrollProgress()` to drive a `motion.div` with `scaleX`, fixed below Navbar, `h-[3px]`, gold background and box-shadow glow
  - Create `src/components/layout/Navbar.tsx` with scroll-aware background transition (transparent → `rgba(11,11,11,0.85)` + `backdrop-blur-[12px]` past 80px), active link detection via `usePathname()`, gold underline on active link, "Enroll Now" CTA, and hamburger menu with `AnimatePresence` dropdown for mobile
  - Create `src/components/layout/Footer.tsx` with institute name, tagline, contact details, Quick Links column, Follow Us column with social icons, copyright notice with current year, glassmorphism style, and responsive single-column collapse below 768px
  - _Requirements: 2.1, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 5.1, 5.2, 5.3, 5.4, 5.5, 8.1, 8.2, 8.3, 8.4_

  - [ ]* 7.1 Write unit tests for Navbar
    - Test transparent background at scroll 0, dark background at scroll > 80, active link highlighting, hamburger toggle
    - _Requirements: 3.2, 3.3, 3.7, 3.8_

  - [ ]* 7.2 Write property test for active navbar link
    - **Property 1: Active Navbar Link Matches Current Route**
    - Use `fc.constantFrom('/', '/courses', '/about', '/gallery', '/contact')`; assert exactly one link is highlighted and its `href` matches the pathname
    - **Validates: Requirements 3.7**

  - [ ]* 7.3 Write property test for footer copyright year
    - **Property 2: Footer Copyright Year Reflects Current Year**
    - Use `fc.integer({ min: 2000, max: 2100 })`; assert rendered copyright text contains the year as a substring
    - **Validates: Requirements 4.5**

  - [ ]* 7.4 Write property test for loading screen session skip
    - **Property 3: Loading Screen Skips When Session Flag Is Set**
    - Use `fc.string()` for truthy session values; assert `LoadingScreen` renders `null` when flag is set
    - **Validates: Requirements 5.5**

  - [ ]* 7.5 Write unit tests for LoadingScreen
    - Test first-visit renders overlay, return-visit renders null
    - _Requirements: 5.1, 5.5_

- [x] 8. Checkpoint — Ensure all layout component tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Root Layout and app entry point
  - Create `src/app/layout.tsx` as a Server Component wrapping every page with `<LoadingScreen />`, `<ScrollProgressIndicator />`, `<Navbar />`, `<PageTransition>{children}</PageTransition>`, and `<Footer />`; apply global CSS and font settings
  - Create `src/app/globals.css` with all CSS custom properties, base styles, and smooth scroll
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 16.3_

- [x] 10. Three.js 3D scene components
  - Create `src/components/three/WebGLFallback.tsx` rendering a Next.js `<Image>` of a cinematic still with the same dimensions as the Canvas
  - Create `src/components/three/FilmCamera.tsx` using `BoxGeometry` (or GLTF) at position `[-2, 0.5, 0]` with sinusoidal Y float via `useFrame` and slow Y rotation
  - Create `src/components/three/FilmReel.tsx` using `TorusGeometry` + `CylinderGeometry` at `[0, -0.5, -1]` with sinusoidal Y float (offset phase) and Z-axis spin
  - Create `src/components/three/Clapperboard.tsx` using composite `BoxGeometry` at `[2, 0.3, 0]` with sinusoidal Y float (offset phase) and slight X tilt
  - Create `src/components/three/HeroScene.tsx` as the RTF `<Canvas>` wrapper with camera, lights, `OrbitControls`, `Suspense`, all three 3D objects, `useWebGL()` check (renders `<WebGLFallback />` if false), and `useMediaQuery` to reduce to one object on mobile
  - Dynamically import `HeroScene` in the Hero section with `ssr: false` and `loading: () => <WebGLFallback />`
  - _Requirements: 7.2, 7.3, 7.13, 7.14_

  - [ ]* 10.1 Write property test for WebGL fallback
    - **Property 6: WebGL Fallback Is Always Shown When WebGL Is Unavailable**
    - Use `fc.constant(false)` for the WebGL hook return; assert `HeroScene` renders `WebGLFallback` and no Canvas
    - **Validates: Requirements 7.14**

- [x] 11. Home page sections
  - Create `src/components/sections/home/HeroSection.tsx` with: full-viewport height, `HeroScene` (dynamic import), `ParticleOverlay`, headline and subheadline with staggered fade-up entrance (1200ms total), two `MagneticButton` CTAs ("Enroll Now" → `/contact`, "View Courses" → `/courses`), scroll indicator at bottom center, and parallax layer shift at 60% scroll speed
  - Create `src/components/sections/home/CoursesPreview.tsx` rendering two `GlassCard` + `TiltCard` course preview cards using data from `COURSES`, each with a "View Details" link and "Enroll Now" link, with staggered `FadeUpOnScroll` entrance
  - Create `src/components/sections/home/WhyChooseUs.tsx` rendering four benefit items with icons, titles, and descriptions; `FadeUpOnScroll` with 150ms stagger; gold glow on hover
  - Create `src/components/sections/home/TestimonialsCarousel.tsx` rendering at least 3 testimonial `GlassCard` items in an auto-scrolling horizontal carousel that pauses on hover, with `FadeUpOnScroll` entrance
  - Create `src/components/sections/home/CTABanner.tsx` with headline "Ready to Start Your Cinematic Journey?" and an "Enroll Now" `MagneticButton` linking to `/contact`
  - Create `src/app/page.tsx` as a Server Component composing all home sections in order: `HeroSection`, `CoursesPreview`, `WhyChooseUs`, `FilmStripSection` (dynamic), `TimelineSection` (dynamic), `TestimonialsCarousel`, `CTABanner`
  - _Requirements: 6.1, 6.2, 6.3, 7.1, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 7.10, 7.11, 7.12, 15.1, 15.4, 15.5, 15.6_

- [x] 12. GSAP scroll-effect sections (Home page)
  - Create `src/components/sections/home/FilmStripSection.tsx` (dynamically imported, `ssr: false`) with GSAP ScrollTrigger horizontal translation: `gsap.to(stripRef, { x: -(scrollWidth - innerWidth), scrub: 1, pin: true })` as specified in the design
  - Create `src/components/sections/home/TimelineSection.tsx` (dynamically imported, `ssr: false`) with GSAP ScrollTrigger playhead animation: `gsap.to(playheadRef, { x: containerWidth, scrub: true, start: 'top 80%', end: '+=300' })`; style the track to resemble a video editing timeline
  - Ensure both components clean up GSAP contexts with `ctx.revert()` in `useLayoutEffect` cleanup
  - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_

  - [ ]* 12.1 Write property test for film strip horizontal translation
    - **Property 14: Film Strip Horizontal Translation Is Proportional to Scroll Progress**
    - Use `fc.float({ min: 0, max: 1 })` for progress `p` and `fc.integer` for strip/viewport widths; assert translation equals `-p * (w - v)`
    - **Validates: Requirements 14.2**

- [x] 13. Courses listing page
  - Create `src/components/sections/courses/CourseCard.tsx` rendering a `GlassCard` + `TiltCard` with: title, duration, eligibility, `shortDescription`, `originalFee` with strikethrough, `offerFee` in gold (`#D4AF37`), "View Details" link to `/courses/[slug]`, and "Enroll Now" link to `/contact`
  - Create `src/app/courses/page.tsx` as a Server Component with `PageHero` ("Our Programs"), two `CourseCard` components in a responsive grid (single-column < 768px, two-column ≥ 768px), with `FadeUpOnScroll` stagger
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 9.10, 9.11_

  - [ ]* 13.1 Write unit tests for CourseCard
    - Test all fields render, strikethrough on `originalFee`, gold color on `offerFee`, correct `href` values on both buttons
    - _Requirements: 9.3, 9.4, 9.5, 9.9, 9.11_

  - [ ]* 13.2 Write property test for CourseCard completeness
    - **Property 8: CourseCard Renders Complete Course Data and Navigation**
    - Use `fc.constantFrom(...COURSES)`; assert all required fields are displayed and link `href` values are correct
    - **Validates: Requirements 9.3, 9.4, 9.5, 9.9, 9.11**

- [x] 14. Course detail pages
  - Create `src/app/courses/[slug]/page.tsx` as a statically generated Server Component using `generateStaticParams()` from `getStaticCourseSlugs()`; call `getCourseBySlug(slug)` and invoke `notFound()` if undefined
  - Render: `Breadcrumb` ("Home > Courses > Course Title"), full title/duration/eligibility/fee structure at top, curriculum section, "What You Will Learn" section (≥ 5 outcomes), "Career Opportunities" section (≥ 3 roles), prominent "Enroll Now" `MagneticButton` → `/contact`, "Related Course" card linking to the other course, all sections with `FadeUpOnScroll` transitions
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9_

  - [ ]* 14.1 Write property test for course detail page completeness
    - **Property 9: Course Detail Page Renders All Course Data**
    - Use `fc.constantFrom(...COURSES)`; assert all curriculum titles, learning outcomes, career opportunities, and related course card are rendered
    - **Validates: Requirements 10.2, 10.3, 10.9**

- [x] 15. Checkpoint — Ensure all course-related tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 16. About page
  - Create `src/components/sections/about/OurStory.tsx` with at least two paragraphs describing the institute's founding, mission, and vision
  - Create `src/components/sections/about/BenefitItem.tsx` accepting `icon`, `title`, and `description` props; apply gold glow on hover
  - Create `src/components/sections/about/InstructorCard.tsx` accepting `name`, `role`, `bio`, and optional `image` props
  - Create `src/components/sections/about/TestimonialsFull.tsx` rendering at least 6 testimonial `GlassCard` items with `FadeUpOnScroll` entrance
  - Create `src/app/about/page.tsx` as a Server Component with: `PageHero` ("About Us"), `OurStory`, "Why Choose Us" section with four `BenefitItem` components (staggered 150ms `FadeUpOnScroll`), at least one cinematic tagline, "Our Instructors" section with at least two `InstructorCard` components, `TestimonialsFull`, and a CTA section with "Enroll Now" `MagneticButton`
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.9, 11.10, 15.2, 15.5, 15.6_

- [x] 17. Gallery page
  - Create `src/components/sections/gallery/FilterBar.tsx` rendering category filter buttons for all `GALLERY_CATEGORIES` plus an "All" option; highlight the active filter
  - Create `src/components/sections/gallery/GalleryItem.tsx` rendering a thumbnail `<button>` with `<Image>` and `alt`; triggers lightbox on click
  - Create `src/components/sections/gallery/GalleryGrid.tsx` rendering filtered items in a masonry/grid layout with staggered `FadeUpOnScroll` entrance; applies smooth fade transition on filter change
  - Create `src/components/sections/gallery/Lightbox.tsx` with full-viewport overlay, keyboard navigation (`ArrowLeft`/`ArrowRight`/`Escape`), wrap-around index logic, and focus return to triggering element on close
  - Create `src/app/gallery/page.tsx` as a Server Component with `PageHero` ("Student Work & Gallery"), `FilterBar`, and `GalleryGrid` with `Lightbox`
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 12.8, 12.9_

  - [ ]* 17.1 Write unit tests for Lightbox
    - Test open/close (Escape key), arrow key navigation, focus return to trigger element
    - _Requirements: 12.4, 12.5, 12.6_

  - [ ]* 17.2 Write property test for lightbox navigation wrapping
    - **Property 11: Lightbox Navigation Wraps Correctly**
    - Use `fc.array(fc.string(), { minLength: 1 })` and `fc.nat()`; assert `ArrowRight` → `(i+1) % n`, `ArrowLeft` → `(i-1+n) % n`, result always in `[0, n-1]`
    - **Validates: Requirements 12.5**

  - [ ]* 17.3 Write property test for gallery filter correctness
    - **Property 12: Gallery Filter Returns Only Matching Items**
    - Use `fc.constantFrom(...GALLERY_CATEGORIES)` and a `fc.array` of gallery item arbitraries; assert filtered result contains only items matching the selected category
    - **Validates: Requirements 12.8**

- [x] 18. Contact and enrollment page
  - Create `src/components/sections/contact/ContactInfo.tsx` rendering phone, email, address, Google Maps embed/static map, and social media icon links
  - Create `src/components/sections/contact/EnrollmentForm.tsx` with fields (Full Name, Phone, Email, Course of Interest select, Message textarea), client-side validation using `validateEmail`/`validatePhone`/`validateRequired` on submit and on blur, inline error messages, state machine (`idle → submitting → success | error`), success message "Thank you! We will contact you shortly.", and "Submit" as a `MagneticButton`
  - Create `src/app/contact/page.tsx` as a Server Component with `PageHero` ("Get in Touch / Enroll Now"), `EnrollmentForm`, and `ContactInfo` side by side, with `FadeUpOnScroll` transitions
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7, 13.8, 13.9, 13.10, 13.11_

  - [ ]* 18.1 Write unit tests for EnrollmentForm
    - Test valid submission shows success message, empty required fields show inline errors, invalid email shows correct error, invalid phone shows correct error
    - _Requirements: 13.4, 13.5, 13.6, 13.7_

- [x] 19. Checkpoint — Ensure all page and form tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 20. Accessibility and focus ring styles
  - Add global `focus-visible` CSS rule applying a `2px` gold (`#D4AF37`) outline to all interactive elements (`button`, `a`, `input`, `select`, `textarea`)
  - Add `aria-label` attributes to all icon-only buttons (social media links, hamburger, lightbox arrows, carousel controls)
  - Implement focus trap in `Lightbox.tsx` while the overlay is open (using `focus-trap-react` or a custom hook)
  - Verify keyboard navigation works for lightbox (Escape, arrow keys) and hamburger menu
  - _Requirements: 12.6, 16.4_

  - [ ]* 20.1 Write property test for keyboard focus ring
    - **Property 16: Keyboard Focus Ring Is Applied to All Interactive Elements**
    - Use `fc.constantFrom('button', 'a', 'input', 'select', 'textarea')`; assert `focus-visible` CSS state applies a gold outline of at least `2px`
    - **Validates: Requirements 16.4**

- [x] 21. Responsive design verification and mobile optimizations
  - Audit all pages for mobile-first Tailwind breakpoints; ensure Hero Section displays correctly at 320px viewport width
  - Verify Courses Page uses single-column layout below 768px and two-column at ≥ 768px
  - Verify "Why Choose Us" / benefit items use two-column grid below 768px and four-column at ≥ 1024px
  - Verify Footer collapses to single-column below 768px
  - Confirm `HeroScene` reduces to one 3D object on mobile via `useMediaQuery('(max-width: 767px)')`
  - Confirm all `<img>` tags use Next.js `<Image>` component for automatic optimization and lazy loading
  - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.6, 17.7_

- [~] 22. Final checkpoint — Ensure all tests pass and build succeeds
  - Run the full test suite and ensure all tests pass, ask the user if questions arise.
  - Run `next build` and confirm no TypeScript or build errors.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at logical milestones
- Property tests use **fast-check** with a minimum of 100 iterations each
- Unit tests use **Vitest** + **React Testing Library**
- All Three.js and heavy GSAP components must use `dynamic()` with `ssr: false` to prevent hydration errors
- GSAP contexts must always be cleaned up with `ctx.revert()` in `useLayoutEffect` cleanup to prevent memory leaks
