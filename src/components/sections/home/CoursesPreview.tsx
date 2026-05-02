import Link from 'next/link'
import { COURSES } from '@/data/courses'
import FadeUpOnScroll from '@/components/animations/FadeUpOnScroll'

export default function CoursesPreview() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black" aria-labelledby="courses-preview-heading">
      {/* Top accent line */}
      <div className="h-px mb-16 max-w-6xl mx-auto" style={{ background: 'linear-gradient(to right, transparent, rgba(250,204,21,0.3), transparent)' }} />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12" id="courses-preview-heading">
          <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(250,204,21,0.6)' }}>
            Our Programs
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Choose Your Path
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COURSES.map((course, index) => (
            <FadeUpOnScroll key={course.id} delay={index * 0.15}>
              <div
                className="rounded-2xl border p-6 md:p-8 flex flex-col gap-5 h-full transition-all duration-300 hover:border-[rgba(250,204,21,0.45)] hover:shadow-[0_0_30px_rgba(250,204,21,0.1)]"
                style={{ background: 'rgba(17,17,17,0.85)', borderColor: 'rgba(250,204,21,0.18)' }}
              >
                {/* Duration badge */}
                <div className="flex items-center gap-2">
                  <span
                    className="px-2.5 py-1 rounded-full text-[11px] font-bold border"
                    style={{ background: 'rgba(250,204,21,0.1)', borderColor: 'rgba(250,204,21,0.3)', color: '#FACC15' }}
                  >
                    {course.duration}
                  </span>
                  <span className="text-xs" style={{ color: '#6B7280' }}>{course.eligibility}</span>
                </div>

                <h3 className="text-xl font-black text-white leading-snug tracking-tight">
                  {course.title}
                </h3>

                <p className="text-sm leading-relaxed flex-1" style={{ color: '#9CA3AF' }}>
                  {course.shortDescription}
                </p>

                {/* Pricing */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-sm line-through" style={{ color: '#4B5563' }}>{course.originalFee}</span>
                  <span className="text-xl font-black" style={{ color: '#FACC15' }}>{course.offerFee}</span>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 mt-auto pt-2">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border text-sm font-bold transition-all duration-200 hover:border-[#FACC15] hover:text-[#FACC15]"
                    style={{ borderColor: 'rgba(250,204,21,0.35)', color: '#9CA3AF' }}
                  >
                    View Details
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-extrabold text-black transition-all duration-200 hover:bg-[#FDE047] yellow-glow-pulse"
                    style={{ background: '#FACC15' }}
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            </FadeUpOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
