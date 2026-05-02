import dynamic from 'next/dynamic'
import HeroSection from '@/components/sections/home/HeroSection'
import CoursesPreview from '@/components/sections/home/CoursesPreview'
import WhyChooseUs from '@/components/sections/home/WhyChooseUs'
import TestimonialsCarousel from '@/components/sections/home/TestimonialsCarousel'
import CTABanner from '@/components/sections/home/CTABanner'

/**
 * FilmStripSection — GSAP ScrollTrigger horizontal scroll effect.
 * Dynamically imported with ssr: false to avoid window/GSAP SSR issues.
 *
 * Validates: Requirements 14.1, 14.2
 */
const FilmStripSection = dynamic(
  () => import('@/components/sections/home/FilmStripSection'),
  { ssr: false }
)

/**
 * TimelineSection — GSAP ScrollTrigger playhead animation.
 * Dynamically imported with ssr: false to avoid window/GSAP SSR issues.
 *
 * Validates: Requirements 14.4, 14.5
 */
const TimelineSection = dynamic(
  () => import('@/components/sections/home/TimelineSection'),
  { ssr: false }
)

/**
 * Home page — Server Component.
 * Composes all home sections in order.
 *
 * Validates: Requirements 6.1, 6.2, 6.3
 */
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CoursesPreview />
      <WhyChooseUs />
      <FilmStripSection />
      <TimelineSection />
      <TestimonialsCarousel />
      <CTABanner />
    </main>
  )
}
