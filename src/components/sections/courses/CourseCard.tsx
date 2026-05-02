'use client'

import Link from 'next/link'
import type { Course } from '@/types/course'

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div
      className="rounded-2xl border p-6 md:p-8 flex flex-col gap-5 h-full transition-all duration-300 hover:border-[rgba(250,204,21,0.45)] hover:shadow-[0_0_30px_rgba(250,204,21,0.1)]"
      style={{ background: 'rgba(17,17,17,0.85)', borderColor: 'rgba(250,204,21,0.18)' }}
    >
      {/* Duration + eligibility badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="px-2.5 py-1 rounded-full text-[11px] font-bold border"
          style={{ background: 'rgba(250,204,21,0.1)', borderColor: 'rgba(250,204,21,0.3)', color: '#FACC15' }}
        >
          {course.duration}
        </span>
        <span className="text-xs" style={{ color: '#6B7280' }}>{course.eligibility}</span>
      </div>

      <h2 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight">
        {course.title}
      </h2>

      <p className="text-sm md:text-base leading-relaxed flex-1" style={{ color: '#9CA3AF' }}>
        {course.shortDescription}
      </p>

      {/* Pricing */}
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="text-sm line-through" style={{ color: '#4B5563' }}>{course.originalFee}</span>
        <span className="text-xl md:text-2xl font-black" style={{ color: '#FACC15' }}>{course.offerFee}</span>
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3 mt-2">
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
  )
}
