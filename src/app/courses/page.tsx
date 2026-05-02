import type { Metadata } from 'next'
import { COURSES } from '@/data/courses'
import PageHero from '@/components/ui/PageHero'
import FadeUpOnScroll from '@/components/animations/FadeUpOnScroll'
import CourseCard from '@/components/sections/courses/CourseCard'

export const metadata: Metadata = {
  title: 'Our Programs | SMEC Media',
  description:
    'Explore our flagship training programs in AI Integrated Graphic Designing & Video Editing and Master Program in Film Editing & Post Production.',
}

export default function CoursesPage() {
  return (
    <main>
      <PageHero
        heading="Our Programs"
        subheading="Choose your path to a creative career"
      />

      <section className="py-16 md:py-24 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COURSES.map((course, index) => (
            <FadeUpOnScroll key={course.id} delay={index * 0.15}>
              <CourseCard course={course} />
            </FadeUpOnScroll>
          ))}
        </div>
      </section>
    </main>
  )
}
