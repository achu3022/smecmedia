'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FRAMES = [
  { number: '01', label: 'Pre-Production' },
  { number: '02', label: 'Cinematography' },
  { number: '03', label: 'Color Grading' },
  { number: '04', label: 'Sound Design' },
  { number: '05', label: 'VFX Compositing' },
  { number: '06', label: 'Motion Graphics' },
  { number: '07', label: 'Post Production' },
  { number: '08', label: 'Final Cut' },
  { number: '09', label: 'Distribution' },
  { number: '10', label: 'Premiere Night' },
]

export default function FilmStripSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(stripRef.current, {
        x: () => -(stripRef.current!.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${stripRef.current!.scrollWidth}`,
          scrub: 1,
          pin: true,
        },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ background: '#000' }}
      aria-label="Film strip scroll section"
    >
      <div className="absolute top-6 left-0 right-0 z-10 flex justify-center pointer-events-none">
        <p className="text-[10px] uppercase tracking-[0.3em] font-mono" style={{ color: 'rgba(250,204,21,0.5)' }}>
          Scroll to explore
        </p>
      </div>

      <div
        ref={stripRef}
        className="flex items-center gap-0 will-change-transform"
        style={{ width: 'max-content' }}
      >
        {/* Top sprocket strip */}
        {FRAMES.map((frame) => (
          <div
            key={frame.number}
            className="flex-shrink-0 flex flex-col"
            style={{ width: 280 }}
          >
            {/* Sprocket holes top */}
            <div
              className="h-8 flex items-center justify-around px-2"
              style={{ background: '#111', borderBottom: '1px solid rgba(250,204,21,0.15)' }}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-sm"
                  style={{ background: '#000', border: '1px solid rgba(250,204,21,0.25)' }}
                />
              ))}
            </div>

            {/* Frame content */}
            <div
              className="flex flex-col items-center justify-center gap-3 py-16"
              style={{ background: frame.number === '01' || frame.number === '05' || frame.number === '09' ? 'rgba(250,204,21,0.04)' : 'rgba(255,255,255,0.01)', borderRight: '1px solid rgba(250,204,21,0.1)' }}
            >
              <span className="font-mono text-5xl font-black" style={{ color: 'rgba(250,204,21,0.7)' }}>
                {frame.number}
              </span>
              <span className="text-xs uppercase tracking-widest font-bold" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {frame.label}
              </span>
            </div>

            {/* Sprocket holes bottom */}
            <div
              className="h-8 flex items-center justify-around px-2"
              style={{ background: '#111', borderTop: '1px solid rgba(250,204,21,0.15)' }}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-sm"
                  style={{ background: '#000', border: '1px solid rgba(250,204,21,0.25)' }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
