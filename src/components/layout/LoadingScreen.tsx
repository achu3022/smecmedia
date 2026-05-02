'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSessionStorage } from '@/hooks/useSessionStorage'

export default function LoadingScreen() {
  const [shown, setShown] = useSessionStorage('loading-shown', false)
  const [visible, setVisible] = useState(!shown)

  useEffect(() => {
    if (shown) return
    const timer = setTimeout(() => {
      setShown(true)
      setVisible(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [shown, setShown])

  if (shown) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          aria-label="Loading"
          role="status"
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 grid-overlay pointer-events-none"
            aria-hidden="true"
          />

          {/* Ambient blob */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: 'rgba(250,204,21,0.08)', filter: 'blur(100px)' }}
            aria-hidden="true"
          />

          <div className="relative flex flex-col items-center gap-4">
            {/* Film strip decorative line */}
            <div className="flex gap-1 mb-2" aria-hidden="true">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-4 rounded-sm border"
                  style={{ borderColor: 'rgba(250,204,21,0.3)', background: 'rgba(250,204,21,0.05)' }}
                />
              ))}
            </div>

            <h1
              className="text-4xl md:text-6xl font-black tracking-tight uppercase"
              style={{
                background: 'linear-gradient(90deg, #fff 0%, #fff 30%, #FACC15 50%, #fff 70%, #fff 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shimmer 2s linear infinite',
              }}
            >
              SMEC <span>Media</span>
            </h1>

            <p className="text-xs tracking-[0.4em] uppercase" style={{ color: 'rgba(250,204,21,0.5)' }}>
              Crafting Cinematic Excellence — SMEC Media
            </p>

            {/* Loading bar */}
            <div
              className="mt-4 w-48 h-[2px] rounded-full overflow-hidden"
              style={{ background: 'rgba(250,204,21,0.15)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: '#FACC15', boxShadow: '0 0 8px rgba(250,204,21,0.7)' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.8, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
