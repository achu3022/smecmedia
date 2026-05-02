'use client'

import Link from 'next/link'
import { FOOTER_QUICK_LINKS, SOCIAL_LINKS } from '@/data/navigation'

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
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
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
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

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="border-t bg-[rgba(0,0,0,0.95)] backdrop-blur-[12px]"
      style={{ borderColor: 'rgba(250,204,21,0.18)' }}
      aria-label="Site footer"
    >
      {/* Top accent line */}
      <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(250,204,21,0.4), transparent)' }} />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-black tracking-tight text-white uppercase">
              SMEC <span style={{ color: '#FACC15' }}>Media</span>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
              From Beginner to Film Industry Ready. Master Graphic Design, Film Editing &amp; AI-powered Post Production at SMEC Media.
            </p>
            <address className="not-italic flex flex-col gap-2 text-sm" style={{ color: '#9CA3AF' }}>
              <a href="tel:+919876543210" className="hover:text-[#FACC15] transition-colors duration-200">
                📞 +91 98765 43210
              </a>
              <a href="mailto:info@smecmedia.com" className="hover:text-[#FACC15] transition-colors duration-200">
                ✉️ info@smecmedia.com
              </a>
              <span>📍 123 Film Nagar, Kochi, Kerala 682001</span>
            </address>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold tracking-widest text-white uppercase">Quick Links</h3>
            <nav aria-label="Footer quick links">
              <ul className="flex flex-col gap-2">
                {FOOTER_QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200 hover:text-[#FACC15]"
                      style={{ color: '#6B7280' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Follow Us */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold tracking-widest text-white uppercase">Follow Us</h3>
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform]
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.label}`}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 hover:border-[#FACC15] hover:text-[#FACC15] hover:shadow-[0_0_12px_rgba(250,204,21,0.3)]"
                    style={{ borderColor: 'rgba(250,204,21,0.25)', color: '#6B7280', background: 'rgba(17,17,17,0.8)' }}
                  >
                    {Icon && <Icon />}
                  </a>
                )
              })}
            </div>
            <p className="text-xs" style={{ color: '#4B5563' }}>
              Stay connected for updates, student showcases, and industry insights.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t pt-6" style={{ borderColor: 'rgba(250,204,21,0.1)' }}>
          <p className="text-center text-xs" style={{ color: '#4B5563' }}>
              © {currentYear} SMEC Media. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
