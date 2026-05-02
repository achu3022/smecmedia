export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
  platform: 'instagram' | 'youtube' | 'facebook' | 'linkedin'
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export const FOOTER_QUICK_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    platform: 'instagram',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    platform: 'youtube',
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    platform: 'facebook',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    platform: 'linkedin',
  },
]
