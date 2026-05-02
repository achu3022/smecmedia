'use client'

import { MapPin, Phone, Mail } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import { cn } from '@/lib/utils'

const contactDetails = {
  phone: '+91 98765 43210',
  email: 'info@smecmedia.com',
  address: 'Film Institute Building, MG Road, Kochi, Kerala 682016',
}

const socialLinks = [
  { icon: 'instagram', href: 'https://instagram.com/smecmedia', label: 'Instagram' },
  { icon: 'youtube', href: 'https://youtube.com/@smecmedia', label: 'YouTube' },
  { icon: 'facebook', href: 'https://facebook.com/smecmedia', label: 'Facebook' },
  { icon: 'linkedin', href: 'https://linkedin.com/company/smecmedia', label: 'LinkedIn' },
]

// Inline SVG icons — aria-hidden because the parent <a> carries the accessible label
function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const SOCIAL_ICONS: Record<string, React.FC> = {
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
}

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Contact Details */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-display font-semibold text-gold mb-6">
          Get in Touch
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-gold mt-1 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="text-text/80 text-sm">Phone</p>
              <a
                href={`tel:${contactDetails.phone}`}
                className="text-text hover:text-gold transition-colors"
              >
                {contactDetails.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-gold mt-1 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="text-text/80 text-sm">Email</p>
              <a
                href={`mailto:${contactDetails.email}`}
                className="text-text hover:text-gold transition-colors"
              >
                {contactDetails.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gold mt-1 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="text-text/80 text-sm">Address</p>
              <p className="text-text">{contactDetails.address}</p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Google Maps */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-display font-semibold text-gold mb-4">
          Find Us
        </h3>

        <div className="relative w-full h-64 rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.0426!2d76.2673!3d9.9312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTUnNTIuMyJOIDc2wrAxNicwMi4zIkU!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SMEC Media Location"
            className="rounded-lg"
          />
        </div>
      </GlassCard>

      {/* Social Media */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-display font-semibold text-gold mb-4">
          Follow Us
        </h3>

        <div className="flex gap-4">
          {socialLinks.map(({ icon, href, label }) => {
            const Icon = SOCIAL_ICONS[icon]
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${label}`}
                className={cn(
                  'flex items-center justify-center w-12 h-12 rounded-lg',
                  'bg-gold/10 border border-gold/30 text-gold',
                  'hover:bg-gold/20 hover:border-gold/50 hover:scale-105',
                  'transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg'
                )}
              >
                {Icon && <Icon />}
              </a>
            )
          })}
        </div>
      </GlassCard>
    </div>
  )
}