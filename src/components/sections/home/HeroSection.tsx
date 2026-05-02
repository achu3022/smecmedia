'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useRecordingTimer() {
  const [seconds, setSeconds] = useState<number | null>(null)
  useEffect(() => {
    setSeconds(0)
    const id = setInterval(() => setSeconds((s) => (s ?? 0) + 1), 1000)
    return () => clearInterval(id)
  }, [])
  if (seconds === null) return '00:00:00'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

// ─── Live date/time ───────────────────────────────────────────────────────────
function useLiveClock() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  if (!now) return { date: '----/--/--', time: '--:--:--' }
  const pad = (n: number) => String(n).padStart(2, '0')
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  return { date, time }
}

// ─── Animated color meter bars (right side) ───────────────────────────────────
function ColorMeter() {
  // R G B Y channels — animated heights
  const channels = [
    { label: 'R', color: '#EF4444', initial: 72 },
    { label: 'G', color: '#22C55E', initial: 58 },
    { label: 'B', color: '#3B82F6', initial: 85 },
    { label: 'Y', color: '#FACC15', initial: 64 },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
      <span style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(250,204,21,0.45)', letterSpacing: '0.1em', marginBottom: 2 }}>
        COLOR
      </span>
      <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 80 }}>
        {channels.map((ch) => (
          <div key={ch.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <div style={{ width: 6, height: 80, background: 'rgba(255,255,255,0.06)', borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
              <motion.div
                style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: ch.color, borderRadius: 2, opacity: 0.85 }}
                animate={{ height: [`${ch.initial}%`, `${Math.min(ch.initial + 18, 95)}%`, `${Math.max(ch.initial - 12, 20)}%`, `${ch.initial}%`] }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <span style={{ fontFamily: 'monospace', fontSize: 7, color: ch.color, opacity: 0.7 }}>{ch.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Waveform / histogram (bottom bar) ────────────────────────────────────────
function Waveform() {
  const bars = Array.from({ length: 32 }, (_, i) => ({
    h: 20 + Math.sin(i * 0.6) * 14 + Math.random() * 10,
  }))
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, height: 24 }}>
      {bars.map((b, i) => (
        <motion.div
          key={i}
          style={{ width: 3, background: 'rgba(250,204,21,0.35)', borderRadius: 1 }}
          animate={{ height: [b.h, b.h * 0.6, b.h * 1.2, b.h] }}
          transition={{ duration: 2 + (i % 4) * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.05 }}
        />
      ))}
    </div>
  )
}

// ─── Camera Recording Frame ───────────────────────────────────────────────────
// Fixed — starts just below the navbar (top: 64px), fills remaining viewport.
// Full professional camera HUD: ISO · WB · FPS · date/time · color meter · histogram
// ─────────────────────────────────────────────────────────────────────────────
interface CameraFrameProps {
  iso: string
  wb: string
  fps: string
  af: string
  fnum: string
  ss: number
  stab: string
}

function CameraFrame({ iso, wb, fps, af, fnum, ss, stab }: CameraFrameProps) {
  const timer = useRecordingTimer()
  const { date, time } = useLiveClock()

  const NAVBAR_H = 64   // px — matches Navbar height
  const CORNER   = 28
  const THICK    = 2
  const COLOR    = 'rgba(250,204,21,0.88)'
  const INSET    = 10
  const MONO: React.CSSProperties = { fontFamily: 'monospace' }

  const arm = (s: React.CSSProperties) => (
    <div style={{ position: 'absolute', background: COLOR, ...s }} />
  )

  // Camera settings — driven by scroll via props
  const ISO = iso
  const WB  = wb
  const FPS = fps
  const RES = '3840×2160'

  return (
    <div
      className="pointer-events-none select-none"
      style={{ position: 'fixed', top: NAVBAR_H, left: 0, right: 0, bottom: 0, zIndex: 40 }}
      aria-hidden="true"
    >
      {/* ── Thin frame border ── */}
      <div style={{ position: 'absolute', inset: INSET, border: '1px solid rgba(250,204,21,0.14)', borderRadius: 2 }} />

      {/* ══ CORNER BRACKETS ══ */}
      {/* Top-left */}
      <div style={{ position: 'absolute', top: INSET, left: INSET, width: CORNER, height: CORNER }}>
        {arm({ top: 0, left: 0, width: CORNER, height: THICK })}
        {arm({ top: 0, left: 0, width: THICK, height: CORNER })}
      </div>
      {/* Top-right */}
      <div style={{ position: 'absolute', top: INSET, right: INSET, width: CORNER, height: CORNER }}>
        {arm({ top: 0, right: 0, width: CORNER, height: THICK })}
        {arm({ top: 0, right: 0, width: THICK, height: CORNER })}
      </div>
      {/* Bottom-left */}
      <div style={{ position: 'absolute', bottom: INSET, left: INSET, width: CORNER, height: CORNER }}>
        {arm({ bottom: 0, left: 0, width: CORNER, height: THICK })}
        {arm({ bottom: 0, left: 0, width: THICK, height: CORNER })}
      </div>
      {/* Bottom-right */}
      <div style={{ position: 'absolute', bottom: INSET, right: INSET, width: CORNER, height: CORNER }}>
        {arm({ bottom: 0, right: 0, width: CORNER, height: THICK })}
        {arm({ bottom: 0, right: 0, width: THICK, height: CORNER })}
      </div>

      {/* ══ TOP BAR — camera metadata ══ */}
      <div
        style={{
          position: 'absolute',
          top: INSET + 8,
          left: INSET + CORNER + 8,
          right: INSET + CORNER + 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left cluster: REC + timer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <motion.div
              style={{ width: 9, height: 9, borderRadius: '50%', background: '#EF4444', boxShadow: '0 0 8px rgba(239,68,68,1)' }}
              animate={{ opacity: [1, 0.08, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span style={{ ...MONO, fontSize: 10, fontWeight: 900, color: '#EF4444', letterSpacing: '0.18em' }}>REC</span>
          </div>
          <span style={{ ...MONO, fontSize: 11, fontWeight: 700, color: 'rgba(250,204,21,0.9)', letterSpacing: '0.12em' }}>
            {timer}
          </span>
        </div>

        {/* Centre cluster: ISO · WB · FPS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {[ISO, WB, FPS].map((val) => (
            <span key={val} style={{ ...MONO, fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em' }}>
              {val}
            </span>
          ))}
        </div>

        {/* Right cluster: date · time · 4K */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ ...MONO, fontSize: 9, color: 'rgba(250,204,21,0.55)', letterSpacing: '0.08em' }}>{date}</span>
          <span style={{ ...MONO, fontSize: 10, fontWeight: 700, color: 'rgba(250,204,21,0.85)', letterSpacing: '0.1em' }}>{time}</span>
          <span style={{ ...MONO, fontSize: 9, fontWeight: 900, color: '#000', background: '#FACC15', padding: '1px 5px', borderRadius: 2, letterSpacing: '0.1em' }}>
            4K
          </span>
        </div>
      </div>

      {/* ══ RIGHT SIDE — color meter (hidden on mobile) ══ */}
      <div
        className="hidden sm:flex"
        style={{
          position: 'absolute',
          top: '50%',
          right: INSET + 10,
          transform: 'translateY(-50%)',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <ColorMeter />
        {/* Exposure indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, marginTop: 6 }}>
          <span style={{ ...MONO, fontSize: 7, color: 'rgba(250,204,21,0.4)', letterSpacing: '0.1em' }}>EXP</span>
          <div style={{ width: 6, height: 40, background: 'rgba(255,255,255,0.06)', borderRadius: 2, position: 'relative' }}>
            <div style={{ position: 'absolute', bottom: '30%', left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(250,204,21,0.6), rgba(250,204,21,0.2))', borderRadius: 2 }} />
            {/* Centre mark */}
            <div style={{ position: 'absolute', top: '50%', left: -3, right: -3, height: 1, background: 'rgba(250,204,21,0.5)', transform: 'translateY(-50%)' }} />
          </div>
          <span style={{ ...MONO, fontSize: 7, color: 'rgba(250,204,21,0.4)' }}>±0</span>
        </div>
      </div>

      {/* ══ LEFT SIDE — focus / aperture info (hidden on mobile) ══ */}
      <div
        className="hidden sm:flex"
        style={{
          position: 'absolute',
          top: '50%',
          left: INSET + 10,
          transform: 'translateY(-50%)',
          flexDirection: 'column',
          gap: 8,
          alignItems: 'flex-start',
        }}
      >
        {[
          { label: 'AF',   value: af },
          { label: 'f/',   value: fnum },
          { label: 'SS',   value: `1/${ss}` },
          { label: 'STAB', value: stab },
        ].map((item) => (
          <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ ...MONO, fontSize: 7, color: 'rgba(250,204,21,0.35)', letterSpacing: '0.1em' }}>{item.label}</span>
            <span style={{ ...MONO, fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* ══ BOTTOM BAR — waveform + resolution ══ */}
      <div
        style={{
          position: 'absolute',
          bottom: INSET + 8,
          left: INSET + CORNER + 8,
          right: INSET + CORNER + 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Resolution */}
        <span style={{ ...MONO, fontSize: 9, color: 'rgba(250,204,21,0.38)', letterSpacing: '0.08em' }}>{RES}</span>

        {/* Waveform — hidden on mobile */}
        <div className="hidden sm:block">
          <Waveform />
        </div>

        {/* Storage indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 28, height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden', border: '1px solid rgba(250,204,21,0.2)' }}>
            <div style={{ width: '68%', height: '100%', background: '#FACC15', borderRadius: 1 }} />
          </div>
          <span style={{ ...MONO, fontSize: 8, color: 'rgba(250,204,21,0.45)' }}>68%</span>
        </div>
      </div>

      {/* ══ CENTRE CROSSHAIR ══ */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: 28, height: 28 }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(250,204,21,0.18)', transform: 'translateY(-50%)' }} />
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(250,204,21,0.18)', transform: 'translateX(-50%)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: 6, height: 6, border: '1px solid rgba(250,204,21,0.35)', borderRadius: '50%', transform: 'translate(-50%,-50%)' }} />
        </div>
      </div>
    </div>
  )
}

// ─── Scroll-reactive camera values ───────────────────────────────────────────
// Down scroll → values increase. Up scroll → values decrease.
// Each value has a base and a range driven by scroll progress (0–1).
function useScrollValues() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setProgress(maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ISO: 100 → 12800 (log-ish steps)
  const isoSteps = [100, 200, 400, 800, 1600, 3200, 6400, 12800]
  const isoIdx = Math.round(progress * (isoSteps.length - 1))
  const iso = `ISO ${isoSteps[isoIdx]}`

  // WB: 2500K → 9000K
  const wb = `WB ${Math.round(2500 + progress * 6500)}K`

  // FPS: 24 → 120
  const fpsSteps = [24, 25, 30, 48, 50, 60, 90, 120]
  const fpsIdx = Math.round(progress * (fpsSteps.length - 1))
  const fps = `${fpsSteps[fpsIdx]}fps`

  // Left-side values
  const af   = progress < 0.3 ? 'CONT' : progress < 0.7 ? 'FACE' : 'LOCK'
  const fnum = (1.4 + progress * 14).toFixed(1)   // f/1.4 → f/16
  const ss   = Math.round(25 + progress * 975)     // 1/25 → 1/1000
  const stab = progress > 0.5 ? 'OFF' : 'ON'

  return { iso, wb, fps, af, fnum, ss, stab }
}

const SKILLS = [
  'Graphic Design', 'Video Editing', 'Film Post-Production',
  'Motion Graphics', 'AI-Powered Tools', 'Color Grading',
  'Sound Design', 'Brand Identity',
]

const STATS = [
  { value: '50K+', label: 'Students'  },
  { value: '100%', label: 'Placement' },
  { value: '4.9★', label: 'Rating'    },
  { value: '300+', label: 'Partners'  },
]

const JOB_ROLES = [
  'Graphic Designer', 'Video Editor', 'Film Editor',
  'Motion Graphics Designer', 'AI Design Specialist',
  'Brand Identity Designer', 'UI Designer',
  'Post-Production Specialist', 'Creative Director', 'Content Creator',
]

// ─── Hero Section ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  const scrollVals = useScrollValues()

  return (
    <>
      {/* Camera frame — fixed, scroll-reactive HUD */}
      <CameraFrame {...scrollVals} />

      <section
        className="relative flex flex-col"
        style={{ background: '#000', minHeight: 'calc(100vh - 64px)', marginTop: 64 }}
        aria-label="Hero section"
      >
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 45%, rgba(250,204,21,0.04) 0%, transparent 65%)' }}
          aria-hidden="true"
        />

        {/* ── TWO-COLUMN LAYOUT ── */}
        <div className="flex-1 flex items-center justify-center relative z-10 px-5 sm:px-8 lg:px-16 py-10 sm:py-14">
          <div
            className="grid grid-cols-1 lg:grid-cols-2 w-full items-start lg:items-center"
            style={{ maxWidth: 1200, gap: 'clamp(28px, 4vw, 56px)' }}
          >

          {/* ── LEFT — editorial layout ── */}
          <div className="flex flex-col gap-5 sm:gap-7">

            {/* Eyebrow tag */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
            >
              <span
                style={{
                  fontFamily: 'monospace', fontSize: 9, fontWeight: 700,
                  color: '#000', background: '#FACC15',
                  padding: '3px 10px', borderRadius: 2, letterSpacing: '0.2em', textTransform: 'uppercase',
                }}
              >
                SMEC MEDIA · KOCHI
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1
                className="font-black tracking-tight"
                style={{
                  fontSize: 'clamp(2.2rem, 7vw, 5.5rem)',
                  lineHeight: 1.0,
                  color: '#fff',
                }}
              >
                Create.{' '}
                <span className="gfx-flicker" style={{ color: '#FACC15', textShadow: '0 0 40px rgba(250,204,21,0.5)' }}>
                  Edit.
                </span>
                <br />
                <span style={{ color: '#FACC15' }}>Dominate</span>
                <br />
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '52%', fontWeight: 400, letterSpacing: '0.05em' }}>
                  the Screen.
                </span>
              </h1>
            </motion.div>

            {/* Feature list */}
            <motion.ul
              className="flex flex-col gap-2.5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {[
                { icon: '🎨', text: 'Graphic Design & Motion Graphics' },
                { icon: '🎬', text: 'Film Editing & Post Production' },
                { icon: '🤖', text: 'AI-Powered Creative Workflows' },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-3">
                  <span
                    className="flex items-center justify-center shrink-0 rounded-lg text-sm"
                    style={{ width: 32, height: 32, background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.2)' }}
                  >
                    {item.icon}
                  </span>
                  <span style={{ fontSize: 'clamp(0.8rem, 2vw, 0.92rem)', color: 'rgba(255,255,255,0.72)', fontWeight: 500, lineHeight: 1.4 }}>
                    {item.text}
                  </span>
                </li>
              ))}
            </motion.ul>

            {/* Divider */}
            <motion.div
              style={{ height: 1, background: 'linear-gradient(to right, rgba(250,204,21,0.3), transparent)' }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            />

            {/* CTAs */}
            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <div className="flex flex-wrap gap-3">
                <MagneticButton variant="primary" href="/contact" className="flex-1 sm:flex-none px-7 py-3 text-sm justify-center">
                  Enroll Now
                </MagneticButton>
                <MagneticButton variant="secondary" href="/courses" className="flex-1 sm:flex-none px-6 py-3 text-sm justify-center">
                  View Courses
                </MagneticButton>
              </div>
              <p style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.1em' }}>
                No entrance exam · Batch starts monthly · Kochi campus
              </p>
            </motion.div>
          </div>

          {/* ── RIGHT — featured card ── */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, x: 0, y: 24 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            {/* Main feature card */}
            <div
              className="rounded-2xl overflow-hidden border"
              style={{ background: 'rgba(17,17,17,0.9)', borderColor: 'rgba(250,204,21,0.2)' }}
            >
              {/* Card header */}
              <div
                className="flex items-center justify-between px-4 py-2.5 border-b"
                style={{ borderColor: 'rgba(250,204,21,0.12)', background: 'rgba(250,204,21,0.04)' }}
              >
                <span style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(250,204,21,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Featured Program
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 8, color: '#000', background: '#FACC15', padding: '2px 6px', borderRadius: 2, fontWeight: 700 }}>
                  ENROLLING
                </span>
              </div>

              <div className="p-4 sm:p-5 flex flex-col gap-4">
                {/* Course title */}
                <div>
                  <p style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(250,204,21,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 5 }}>
                    Master Program
                  </p>
                  <h3 className="font-black text-white leading-tight" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)' }}>
                    Film Editing &amp; Post Production
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: 3 }}>
                    12 months · Plus Two and Above
                  </p>
                </div>

                {/* Pricing */}
                <div className="flex flex-wrap items-baseline gap-2">
                  <span style={{ fontSize: '0.78rem', color: '#4B5563', textDecoration: 'line-through' }}>₹1,50,000</span>
                  <span className="font-black" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', color: '#FACC15' }}>₹1,25,000</span>
                  <span style={{ fontFamily: 'monospace', fontSize: 8, color: '#22C55E', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', padding: '2px 6px', borderRadius: 3 }}>
                    SAVE ₹25K
                  </span>
                </div>

                {/* Tools */}
                <div>
                  <p style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 7 }}>
                    Tools you will learn
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Premiere Pro', 'DaVinci Resolve', 'After Effects', 'Audition', 'Firefly AI'].map((tool) => (
                      <span
                        key={tool}
                        style={{
                          fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.5)',
                          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                          padding: '3px 7px', borderRadius: 4,
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-2">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center gap-1 rounded-xl py-3 border"
                  style={{ background: 'rgba(17,17,17,0.85)', borderColor: 'rgba(250,204,21,0.12)' }}
                >
                  <span className="font-black tabular-nums" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', color: '#FACC15', lineHeight: 1 }}>
                    {s.value}
                  </span>
                  <span style={{ fontFamily: 'monospace', fontSize: 7, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div
              className="rounded-xl p-3.5 border flex gap-3 items-start"
              style={{ background: 'rgba(17,17,17,0.7)', borderColor: 'rgba(250,204,21,0.1)' }}
            >
              <div
                className="shrink-0 flex items-center justify-center font-black text-sm rounded-full"
                style={{ width: 32, height: 32, background: 'rgba(250,204,21,0.15)', color: '#FACC15', border: '1px solid rgba(250,204,21,0.25)' }}
              >
                A
              </div>
              <div>
                <p style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontStyle: 'italic' }}>
                  &ldquo;Landed a job at a production house within two months of graduating.&rdquo;
                </p>
                <p style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(250,204,21,0.45)', marginTop: 4, letterSpacing: '0.08em' }}>
                  Arjun Menon · Film Editing Graduate
                </p>
              </div>
            </div>
          </motion.div>
          </div>{/* end max-width container */}
        </div>{/* end outer padding wrapper */}

        {/* Scroll indicator */}
        <motion.div
          className="flex flex-col items-center gap-2 pb-6 relative z-10"
          style={{ color: 'rgba(250,204,21,0.4)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          aria-hidden="true"
        >
          <span style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
            Scroll
          </span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}