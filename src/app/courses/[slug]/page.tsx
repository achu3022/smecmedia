import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { COURSES, getCourseBySlug, getStaticCourseSlugs } from '@/data/courses'
import PageHero from '@/components/ui/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'
import GlassCard from '@/components/ui/GlassCard'
import MagneticButton from '@/components/ui/MagneticButton'
import FadeUpOnScroll from '@/components/animations/FadeUpOnScroll'

// ─── Static generation ────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getStaticCourseSlugs()
}

// ─── Dynamic metadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const course = getCourseBySlug(slug)
  if (!course) {
    return { title: 'Course Not Found | SMEC Media' }
  }
  return {
    title: `${course.title} | SMEC Media`,
    description: course.shortDescription,
  }
}

// ─── Page component ───────────────────────────────────────────────────────────

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const course = getCourseBySlug(slug)

  if (!course) {
    notFound()
  }

  // Find the other course for the "Related Course" section
  const relatedCourse = COURSES.find((c) => c.slug !== course.slug)

  return (
    <main>
      {/* Page hero */}
      <PageHero heading={course.title} subheading={course.shortDescription} />

      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 space-y-16">

        {/* Breadcrumb */}
        <FadeUpOnScroll>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Courses', href: '/courses' },
              { label: course.title, href: '#' },
            ]}
          />
        </FadeUpOnScroll>

        {/* Course overview */}
        <FadeUpOnScroll delay={0.1}>
          <GlassCard className="p-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-6">
              {course.title}
            </h2>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
              <div>
                <dt className="text-text/50 uppercase tracking-wider text-xs mb-1">Duration</dt>
                <dd className="text-text font-semibold">{course.duration}</dd>
              </div>
              <div>
                <dt className="text-text/50 uppercase tracking-wider text-xs mb-1">Eligibility</dt>
                <dd className="text-text font-semibold">{course.eligibility}</dd>
              </div>
              <div>
                <dt className="text-text/50 uppercase tracking-wider text-xs mb-1">Original Fee</dt>
                <dd className="text-text/60 line-through">{course.originalFee}</dd>
              </div>
              <div>
                <dt className="text-text/50 uppercase tracking-wider text-xs mb-1">Offer Fee</dt>
                <dd className="text-gold font-bold text-lg">{course.offerFee}</dd>
              </div>
            </dl>
          </GlassCard>
        </FadeUpOnScroll>

        {/* Curriculum */}
        <FadeUpOnScroll delay={0.15}>
          <section aria-labelledby="curriculum-heading">
            <h2
              id="curriculum-heading"
              className="text-2xl md:text-3xl font-display font-bold text-text mb-8"
            >
              Curriculum
            </h2>

            <div className="space-y-4">
              {course.curriculum.map((module, moduleIndex) => (
                <FadeUpOnScroll key={module.title} delay={moduleIndex * 0.08}>
                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold text-gold mb-3">
                      {moduleIndex + 1}. {module.title}
                    </h3>
                    <ul className="flex flex-wrap gap-2">
                      {module.topics.map((topic) => (
                        <li
                          key={topic}
                          className="px-3 py-1 rounded-full text-sm bg-card/60 border border-[rgba(212,175,55,0.2)] text-text/80"
                        >
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </FadeUpOnScroll>
              ))}
            </div>
          </section>
        </FadeUpOnScroll>

        {/* What You Will Learn */}
        <FadeUpOnScroll delay={0.1}>
          <section aria-labelledby="outcomes-heading">
            <h2
              id="outcomes-heading"
              className="text-2xl md:text-3xl font-display font-bold text-text mb-8"
            >
              What You Will Learn
            </h2>

            <ul className="space-y-3">
              {course.learningOutcomes.map((outcome, index) => (
                <FadeUpOnScroll key={outcome} delay={index * 0.07}>
                  <li className="flex items-start gap-3">
                    {/* Checkmark icon */}
                    <span
                      className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-3 h-3 text-gold"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-text/80">{outcome}</span>
                  </li>
                </FadeUpOnScroll>
              ))}
            </ul>
          </section>
        </FadeUpOnScroll>

        {/* Career Opportunities */}
        <FadeUpOnScroll delay={0.1}>
          <section aria-labelledby="careers-heading">
            <h2
              id="careers-heading"
              className="text-2xl md:text-3xl font-display font-bold text-text mb-8"
            >
              Career Opportunities
            </h2>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {course.careerOpportunities.map((career, index) => (
                <FadeUpOnScroll key={career} delay={index * 0.08}>
                  <li>
                    <GlassCard className="p-4 flex items-center gap-3">
                      {/* Career icon */}
                      <span
                        className="flex-shrink-0 w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <svg
                          className="w-4 h-4 text-gold"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 1a3 3 0 100 6 3 3 0 000-6zM3 13c0-2.761 2.239-5 5-5s5 2.239 5 5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                      <span className="text-text font-medium">{career}</span>
                    </GlassCard>
                  </li>
                </FadeUpOnScroll>
              ))}
            </ul>
          </section>
        </FadeUpOnScroll>

        {/* Enroll Now CTA */}
        <FadeUpOnScroll delay={0.1}>
          <div className="flex justify-center py-4">
            <MagneticButton variant="primary" href="/contact" className="text-lg px-10 py-4">
              Enroll Now
            </MagneticButton>
          </div>
        </FadeUpOnScroll>

        {/* Related Course */}
        {relatedCourse && (
          <FadeUpOnScroll delay={0.1}>
            <section aria-labelledby="related-heading">
              <h2
                id="related-heading"
                className="text-2xl md:text-3xl font-display font-bold text-text mb-6"
              >
                Related Course
              </h2>

              <GlassCard className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-text mb-1">
                    {relatedCourse.title}
                  </h3>
                  <p className="text-text/60 text-sm">
                    Duration: <span className="text-gold">{relatedCourse.duration}</span>
                  </p>
                </div>
                <Link
                  href={`/courses/${relatedCourse.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gold text-gold hover:bg-gold/10 transition-colors duration-200 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg whitespace-nowrap"
                >
                  View Details
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </GlassCard>
            </section>
          </FadeUpOnScroll>
        )}
      </div>
    </main>
  )
}
