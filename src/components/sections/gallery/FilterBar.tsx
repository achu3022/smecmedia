'use client'

import type { GalleryCategory } from '@/types/gallery'
import { cn } from '@/lib/utils'

interface FilterBarProps {
  categories: GalleryCategory[]
  activeCategory: GalleryCategory | 'All'
  onCategoryChange: (category: GalleryCategory | 'All') => void
}

export default function FilterBar({ categories, activeCategory, onCategoryChange }: FilterBarProps) {
  const all: Array<GalleryCategory | 'All'> = ['All', ...categories]

  return (
    <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter gallery by category">
      {all.map((cat) => {
        const isActive = activeCategory === cat
        return (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            aria-pressed={isActive}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-bold border transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACC15]'
            )}
            style={
              isActive
                ? { background: '#FACC15', color: '#000', borderColor: '#FACC15', boxShadow: '0 0 12px rgba(250,204,21,0.4)' }
                : { background: 'rgba(17,17,17,0.85)', color: '#9CA3AF', borderColor: 'rgba(250,204,21,0.2)' }
            }
            onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(250,204,21,0.5)'; e.currentTarget.style.color = '#fff' } }}
            onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(250,204,21,0.2)'; e.currentTarget.style.color = '#9CA3AF' } }}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
