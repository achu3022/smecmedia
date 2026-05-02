"use client"

import Image from 'next/image'
import type { GalleryItem as GalleryItemType } from '@/types/gallery'

interface GalleryItemProps {
  item: GalleryItemType
  onClick: () => void
  triggerRef?: React.RefObject<HTMLButtonElement>
}

export default function GalleryItem({ item, onClick, triggerRef }: GalleryItemProps) {
  const thumbSrc = item.thumbnailSrc ?? item.src

  return (
    <button
      ref={triggerRef}
      onClick={onClick}
      className="group relative w-full aspect-square overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACC15]"
      style={{ border: '1px solid rgba(250,204,21,0.18)' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(250,204,21,0.5)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(250,204,21,0.2)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(250,204,21,0.18)'; e.currentTarget.style.boxShadow = 'none' }}
      aria-label={`Open lightbox: ${item.alt}`}
    >
      <Image
        src={thumbSrc}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.5)' }}
        aria-hidden="true"
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(250,204,21,0.2)', border: '1px solid rgba(250,204,21,0.5)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#FACC15" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
        </div>
      </div>

      {item.type === 'video' && (
        <div className="absolute bottom-2 right-2 rounded-full p-1" style={{ background: 'rgba(0,0,0,0.8)' }} aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="#FACC15" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      )}
    </button>
  )
}
