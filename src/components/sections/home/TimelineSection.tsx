'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TIME_LABELS = ['00:00', '00:05', '00:10', '00:15', '00:20', '00:25', '00:30']

const CLIPS = [
  { left: '2%',  width: '12%', color: 'rgba(250,204,21,0.55)',  label: 'Intro' },
  { left: '16%', width: '18%', color: 'rgba(59,130,246,0.55)',  label: 'Scene 1' },
  { left: '36%', width: '10%', color: 'rgba(16,185,129,0.55)',  label: 'B-Roll' },
  { left: '48%', width: '20%', color: 'rgba(239,68,68,0.55)',   label: 'Scene 2' },
  { left: '70%', width: '14%', color: 'rgba(168,85,247,0.55)',  label: 'VFX' },
  { left: '86%', width: '12%', color: 'rgba(250,204,21,0.55)',  label: 'Outro' },
]

export default function TimelineSection() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const playheadRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const containerWidth = trackRef.current ? trackRef.current.offsetWidth : 800
      gsap.to(playheadRef.current, {
        x: containerWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          end: '+=300',
          scrub: true,
        },
      })
    }, timelineRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={timelineRef}
      className="py-20 px-4 sm:px-6 md:px-12"
      style={{ background: '#0A0A0A' }}
      aria-label="Video editing timeline animation"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(250,204,21,0.6)' }}>
            Your Journey
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            From First Frame to Final Cut
          </h2>
        </div>

        <div className="relative select-none">
          {/* Time labels */}
          <div className="flex justify-between mb-2 px-1">
            {TIME_LABELS.map((label) => (
              <span key={label} className="text-[10px] font-mono tabular-nums" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {label}
              </span>
            ))}
          </div>

          {/* Tick marks */}
          <div className="relative h-3 mb-1">
            {TIME_LABELS.map((_, i) => (
              <div
                key={i}
                className="absolute top-0 h-full"
                style={{ left: `${(i / (TIME_LABELS.length - 1)) * 100}%`, width: 1, background: 'rgba(250,204,21,0.2)' }}
              />
            ))}
          </div>

          {/* Track */}
          <div
            ref={trackRef}
            className="relative h-14 rounded"
            style={{ background: 'rgba(250,204,21,0.04)', border: '1px solid rgba(250,204,21,0.18)' }}
          >
            {CLIPS.map((clip, i) => (
              <div
                key={i}
                className="absolute top-2 bottom-2 rounded flex items-center justify-center overflow-hidden"
                style={{ left: clip.left, width: clip.width, background: clip.color, border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <span className="text-[10px] font-mono font-bold truncate px-1 text-white">
                  {clip.label}
                </span>
              </div>
            ))}

            {/* Playhead */}
            <div
              ref={playheadRef}
              className="absolute top-0 bottom-0"
              style={{ width: 2, background: '#FACC15', boxShadow: '0 0 8px rgba(250,204,21,0.8)' }}
              aria-hidden="true"
            >
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2"
                style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '6px solid #FACC15' }}
              />
            </div>
          </div>

          <div className="mt-3 flex justify-between">
            <span className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.25)' }}>IN</span>
            <span className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.25)' }}>OUT</span>
          </div>
        </div>
      </div>
    </section>
  )
}
