import { cn } from '@/lib/utils'

interface PageHeroProps {
  heading: string
  subheading?: string
  backgroundImage?: string
}

export default function PageHero({ heading, subheading, backgroundImage }: PageHeroProps) {
  return (
    <section
      className={cn(
        'relative w-full min-h-[38vh] flex items-center justify-center overflow-hidden',
        !backgroundImage && 'bg-black'
      )}
    >
      {/* Background image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
      )}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 grid-overlay pointer-events-none"
        aria-hidden="true"
      />

      {/* Ambient yellow blob */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'rgba(250,204,21,0.06)', filter: 'blur(100px)' }}
        aria-hidden="true"
      />

      {/* Dark overlay for background images */}
      {backgroundImage && (
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(0,0,0,0.92))' }}
          aria-hidden="true"
        />
      )}

      {/* Top yellow accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(250,204,21,0.5), transparent)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 py-16 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
          {heading}
        </h1>

        {subheading && (
          <p className="text-base md:text-lg max-w-2xl mx-auto mt-4" style={{ color: '#9CA3AF' }}>
            {subheading}
          </p>
        )}
      </div>
    </section>
  )
}
