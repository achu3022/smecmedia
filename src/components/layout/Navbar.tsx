'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV_LINKS } from '@/data/navigation'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    function handleScroll() { setScrolled(window.scrollY > 80) }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[rgba(0,0,0,0.92)] backdrop-blur-[12px] border-b border-[rgba(250,204,21,0.12)]'
          : 'bg-transparent'
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-black text-lg tracking-tight text-white uppercase hover:text-[#FACC15] transition-colors duration-200"
          style={{ letterSpacing: '0.05em' }}
        >
          SMEC <span style={{ color: '#FACC15' }}>Media</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative text-sm font-semibold transition-colors duration-200 pb-1',
                  isActive ? 'text-[#FACC15]' : 'text-white/70 hover:text-white'
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: '#FACC15' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}

          <Link
            href="/contact"
            className="ml-2 rounded-xl border border-[#FACC15] px-4 py-1.5 text-sm font-extrabold text-black bg-[#FACC15] transition-all duration-200 hover:bg-[#FDE047] yellow-glow-pulse focus-visible:outline-2 focus-visible:outline-[#FACC15]"
          >
            Enroll Now
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="flex md:hidden flex-col items-center justify-center gap-[5px] p-2 text-white"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className={cn('block h-[2px] w-6 bg-current transition-transform duration-300', menuOpen && 'translate-y-[7px] rotate-45')} />
          <span className={cn('block h-[2px] w-6 bg-current transition-opacity duration-300', menuOpen && 'opacity-0')} />
          <span className={cn('block h-[2px] w-6 bg-current transition-transform duration-300', menuOpen && '-translate-y-[7px] -rotate-45')} />
        </button>
      </nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-[rgba(0,0,0,0.96)] backdrop-blur-[12px] border-t border-[rgba(250,204,21,0.12)] md:hidden"
          >
            <div className="flex flex-col px-4 py-4 gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'rounded-xl px-3 py-3 text-base font-semibold transition-colors duration-200',
                      isActive
                        ? 'text-[#FACC15] bg-[rgba(250,204,21,0.08)]'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Link
                href="/contact"
                className="mt-2 rounded-xl bg-[#FACC15] px-3 py-3 text-center text-base font-extrabold text-black transition-all duration-200 hover:bg-[#FDE047]"
              >
                Enroll Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
