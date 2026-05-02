import PageHero from '@/components/ui/PageHero'
import EnrollmentForm from '@/components/sections/contact/EnrollmentForm'
import ContactInfo from '@/components/sections/contact/ContactInfo'
import FadeUpOnScroll from '@/components/animations/FadeUpOnScroll'

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Page Hero */}
      <PageHero 
        heading="Get in Touch / Enroll Now"
        subheading="Ready to start your cinematic journey? Get in touch with us today."
      />

      {/* Contact Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Enrollment Form */}
            <FadeUpOnScroll delay={0}>
              <EnrollmentForm />
            </FadeUpOnScroll>

            {/* Contact Information */}
            <FadeUpOnScroll delay={0.15}>
              <ContactInfo />
            </FadeUpOnScroll>
          </div>
        </div>
      </section>
    </main>
  )
}

export const metadata = {
  title: 'Contact & Enrollment | SMEC Media',
  description: 'Get in touch with us to enroll in our graphic design and film editing courses. Contact information, location, and enrollment form.',
}