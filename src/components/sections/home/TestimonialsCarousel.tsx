'use client'

import { useRef } from 'react'
import { TESTIMONIALS } from '@/data/testimonials'
import FadeUpOnScroll from '@/components/animations/FadeUpOnScroll'

function StarRating({ rating }: { rating: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < rating ? '#FACC15' : 'rgba(255,255,255,0.15)' }} aria-hidden="true">★</span>
      ))}
    </div>
  )
}

export default function TestimonialsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const displayed = TESTIMONIALS.slice(0, 6)
  const looped = [...displayed, ...displayed]

  return (
    <section className="py-20 overflow-hidden" style={{ background: '#000' }} aria-labelledby="testimonials-heading">
      <div className="px-4 sm:px-6 lg:px-8 mb-12 text-center" id="testimonials-heading">
        <FadeUpOnScroll>
          <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(250,204,21,0.6)' }}>
            Student Reviews
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            What Our Students Say
          </h2>
        </FadeUpOnScroll>
      </div>

      <div
        className="relative"
        onMouseEnter={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused' }}
        onMouseLeave={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running' }}
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10" style={{ background: 'linear-gradient(to right, #000, transparent)' }} aria-hidden="true" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10" style={{ background: 'linear-gradient(to left, #000, transparent)' }} aria-hidden="true" />

        <div ref={trackRef} className="flex gap-5 w-max animate-carousel" style={{ animationDuration: '40s' }}>
          {looped.map((testimonial, index) => (
            <div key={`${testimonial.id}-${index}`} className="w-80 flex-shrink-0">
              <div
                className="p-6 h-full flex flex-col gap-4 rounded-2xl border transition-colors duration-200 hover:border-[rgba(250,204,21,0.4)]"
                style={{ background: 'rgba(17,17,17,0.85)', borderColor: 'rgba(250,204,21,0.18)' }}
              >
                <StarRating rating={testimonial.rating} />

                <blockquote className="text-sm leading-relaxed flex-1 italic" style={{ color: '#9CA3AF' }}>
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="border-t pt-4" style={{ borderColor: 'rgba(250,204,21,0.15)' }}>
                  <p className="font-black text-white text-sm">{testimonial.studentName}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(250,204,21,0.7)' }}>{testimonial.courseCompleted}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
