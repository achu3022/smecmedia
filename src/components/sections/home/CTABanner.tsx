import MagneticButton from '@/components/ui/MagneticButton'
import FadeUpOnScroll from '@/components/animations/FadeUpOnScroll'

export default function CTABanner() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black" aria-labelledby="cta-banner-heading">
      <FadeUpOnScroll>
        <div
          className="max-w-4xl mx-auto rounded-2xl border px-8 py-14 text-center relative overflow-hidden"
          style={{ borderColor: 'rgba(250,204,21,0.35)', background: 'rgba(17,17,17,0.9)' }}
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, #FACC15, transparent)' }} />

          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(250,204,21,0.08) 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'rgba(250,204,21,0.6)' }}>
              Start Today
            </p>

            <h2
              id="cta-banner-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight"
            >
              Ready to Start Your{' '}
              <span style={{ color: '#FACC15', textShadow: '0 0 30px rgba(250,204,21,0.5)' }}>
                Cinematic Journey?
              </span>
            </h2>

            <p className="text-sm max-w-xl" style={{ color: '#9CA3AF' }}>
              Join hundreds of students who have transformed their passion into a career.
            </p>

            <MagneticButton variant="primary" href="/contact" className="px-10 py-4 text-base">
              Enroll Now
            </MagneticButton>
          </div>
        </div>
      </FadeUpOnScroll>
    </section>
  )
}
