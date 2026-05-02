"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import type { GalleryItem } from '@/types/gallery'

interface LightboxProps {
  items: GalleryItem[]
  initialIndex: number
  onClose: () => void
}

export default function Lightbox({ items, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const currentItem = items[currentIndex]

  const goNext = useCallback(() => setCurrentIndex((i) => (i + 1) % items.length), [items.length])
  const goPrev = useCallback(() => setCurrentIndex((i) => (i - 1 + items.length) % items.length), [items.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      else if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev, onClose])

  useEffect(() => { closeButtonRef.current?.focus() }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusable = dialog.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last?.focus() } }
      else { if (document.activeElement === last) { e.preventDefault(); first?.focus() } }
    }
    dialog.addEventListener('keydown', handleFocusTrap)
    return () => dialog.removeEventListener('keydown', handleFocusTrap)
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const btnStyle = {
    background: 'rgba(17,17,17,0.9)',
    border: '1px solid rgba(250,204,21,0.25)',
    color: '#9CA3AF',
  }

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(8px)' }}
    >
      {/* Close */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-4 right-4 z-10 p-2 rounded-xl transition-all duration-200 hover:border-[#FACC15] hover:text-[#FACC15] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACC15]"
        style={btnStyle}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      <button
        onClick={goPrev}
        aria-label="Previous image"
        className="absolute left-4 z-10 p-3 rounded-xl transition-all duration-200 hover:border-[#FACC15] hover:text-[#FACC15] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACC15]"
        style={btnStyle}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={goNext}
        aria-label="Next image"
        className="absolute right-4 z-10 p-3 rounded-xl transition-all duration-200 hover:border-[#FACC15] hover:text-[#FACC15] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACC15]"
        style={btnStyle}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image */}
      <div className="relative w-full h-full flex flex-col items-center justify-center px-20 py-16">
        <div className="relative w-full max-w-5xl max-h-[80vh] aspect-video">
          <Image key={currentItem.id} src={currentItem.src} alt={currentItem.alt} fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-contain" priority />
        </div>
        <p className="mt-4 text-sm text-center max-w-2xl px-4" style={{ color: '#6B7280' }}>{currentItem.alt}</p>
        <p className="mt-2 text-xs tabular-nums" style={{ color: 'rgba(250,204,21,0.4)' }} aria-live="polite" aria-atomic="true">
          {currentIndex + 1} / {items.length}
        </p>
      </div>
    </div>
  )
}
