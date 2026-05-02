import FadeUpOnScroll from '@/components/animations/FadeUpOnScroll'
import { TESTIMONIALS } from '@/data/testimonials'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-lg" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < rating ? '#FACC15' : 'rgba(255,255,255,0.15)' }} aria-hidden="true">
          {i < rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  )
}

export default function TestimonialsFull() {
  return (
    <section className="py-20 px-4" style={{ background: '#000' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(250,204,21,0.6)' }}>
            Student Reviews
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            What Our Students Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((testimonial, index) => (
            <FadeUpOnScroll key={testimonial.id} delay={index * 0.1}>
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
            </FadeUpOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
