import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import MagneticButton from '@/components/ui/MagneticButton'
import FadeUpOnScroll from '@/components/animations/FadeUpOnScroll'
import GoldShimmerHeading from '@/components/ui/GoldShimmerHeading'
import OurStory from '@/components/sections/about/OurStory'
import BenefitItem from '@/components/sections/about/BenefitItem'
import InstructorCard from '@/components/sections/about/InstructorCard'
import TestimonialsFull from '@/components/sections/about/TestimonialsFull'

export const metadata: Metadata = {
  title: 'About Us | SMEC Media',
  description:
    'Learn about our founding story, mission, and the industry professionals who train the next generation of cinematic creators.',
}

const benefits = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
        <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.71 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
        <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
      </svg>
    ),
    title: 'Industry-Level Training',
    description: 'Real tools, real projects, real industry standards — the same pipeline used by working professionals.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z" clipRule="evenodd" />
      </svg>
    ),
    title: 'Real Project Experience',
    description: 'Build a portfolio with actual client-ready work before you even graduate.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M16.5 7.5h-9v9h9v-9Z" />
        <path fillRule="evenodd" d="M8.25 2.25A.75.75 0 0 1 9 3v.75h2.25V3a.75.75 0 0 1 1.5 0v.75H15V3a.75.75 0 0 1 1.5 0v.75h.75a3 3 0 0 1 3 3v.75H21A.75.75 0 0 1 21 9h-.75v2.25H21a.75.75 0 0 1 0 1.5h-.75V15H21a.75.75 0 0 1 0 1.5h-.75v.75a3 3 0 0 1-3 3h-.75V21a.75.75 0 0 1-1.5 0v-.75h-2.25V21a.75.75 0 0 1-1.5 0v-.75H9V21a.75.75 0 0 1-1.5 0v-.75h-.75a3 3 0 0 1-3-3v-.75H3A.75.75 0 0 1 3 15h.75v-2.25H3a.75.75 0 0 1 0-1.5h.75V9H3a.75.75 0 0 1 0-1.5h.75v-.75a3 3 0 0 1 3-3h.75V3a.75.75 0 0 1 .75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h10.5a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V6.75Z" clipRule="evenodd" />
      </svg>
    ),
    title: 'AI-Integrated Learning',
    description: 'Stay ahead with the latest AI creative tools — Midjourney, Adobe Firefly, RunwayML, and more.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
        <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
      </svg>
    ),
    title: 'Placement Support',
    description: 'Career guidance and industry connections to help you land your first role after graduation.',
  },
]

const instructors = [
  {
    name: 'Rajesh Kumar',
    role: 'Lead Film Editor & Post-Production Specialist',
    bio: 'With over 12 years of experience editing feature films and OTT content, Rajesh brings the full post-production pipeline into the classroom. He has worked on award-winning Malayalam and Tamil productions and is passionate about teaching the craft of storytelling through editing.',
  },
  {
    name: 'Meera Pillai',
    role: 'Creative Director & Motion Graphics Lead',
    bio: 'Meera is a brand identity designer and motion graphics artist who has worked with national advertising agencies and digital studios. She specialises in AI-integrated design workflows and helps students build portfolios that stand out in a competitive market.',
  },
  {
    name: 'Suresh Nambiar',
    role: 'Colorist & VFX Supervisor',
    bio: 'Suresh is a certified DaVinci Resolve colorist with credits on regional films and commercial productions. He teaches color science, compositing, and visual effects with a focus on practical, industry-ready techniques.',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg">
      {/* 1. Page Hero */}
      <PageHero
        heading="About Us"
        subheading="From Beginner to Film Industry Ready 🎬"
      />

      {/* 2. Our Story */}
      <OurStory />

      {/* 3. Why Choose Us */}
      <section className="py-20 px-4 bg-[rgba(31,41,55,0.2)]">
        <div className="max-w-6xl mx-auto">
          <GoldShimmerHeading
            as="h2"
            className="text-3xl md:text-4xl font-display font-bold text-text mb-12 text-center"
          >
            Why Choose Us
          </GoldShimmerHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <FadeUpOnScroll key={benefit.title} delay={index * 0.15}>
                <BenefitItem
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                />
              </FadeUpOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Cinematic Tagline */}
      <section className="py-24 px-4 text-center relative overflow-hidden">
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)',
          }}
        />
        <FadeUpOnScroll>
          <p className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text leading-tight">
            Not Just Design.{' '}
            <span className="text-gold">Cinematic Creation.</span>
          </p>
          <p className="mt-6 text-text/60 text-lg max-w-xl mx-auto">
            Edit Like a Pro. Design Like a Brand. Turn Creativity into Career 💰
          </p>
        </FadeUpOnScroll>
      </section>

      {/* 5. Our Instructors */}
      <section className="py-20 px-4 bg-[rgba(31,41,55,0.2)]">
        <div className="max-w-6xl mx-auto">
          <GoldShimmerHeading
            as="h2"
            className="text-3xl md:text-4xl font-display font-bold text-text mb-12 text-center"
          >
            Our Instructors
          </GoldShimmerHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructors.map((instructor, index) => (
              <FadeUpOnScroll key={instructor.name} delay={index * 0.15}>
                <InstructorCard
                  name={instructor.name}
                  role={instructor.role}
                  bio={instructor.bio}
                />
              </FadeUpOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials Full */}
      <TestimonialsFull />

      {/* 7. CTA Section */}
      <section className="py-24 px-4 text-center border-t border-[rgba(212,175,55,0.15)]">
        <FadeUpOnScroll>
          <GoldShimmerHeading
            as="h2"
            className="text-3xl md:text-4xl font-display font-bold text-text mb-4"
          >
            Ready to Begin Your Journey?
          </GoldShimmerHeading>
          <p className="text-text/70 text-lg mb-8 max-w-xl mx-auto">
            Join hundreds of graduates who turned their passion for film and design into a thriving career.
          </p>
          <MagneticButton href="/contact" variant="primary" className="text-lg px-8 py-4">
            Enroll Now
          </MagneticButton>
        </FadeUpOnScroll>
      </section>
    </main>
  )
}
