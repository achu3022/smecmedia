"use client"

import { useState, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { GalleryItem, GalleryCategory } from '@/types/gallery'
import FilterBar from './FilterBar'
import GalleryItemComponent from './GalleryItem'
import Lightbox from './Lightbox'
import FadeUpOnScroll from '@/components/animations/FadeUpOnScroll'

interface GalleryGridProps {
  items: GalleryItem[]
  categories: GalleryCategory[]
}

export default function GalleryGrid({ items, categories }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | 'All'>('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Store refs for each gallery item button so we can return focus on lightbox close
  const triggerRefs = useRef<Map<string, React.RefObject<HTMLButtonElement>>>(new Map())

  const getOrCreateRef = useCallback(
    (id: string): React.RefObject<HTMLButtonElement> => {
      if (!triggerRefs.current.has(id)) {
        triggerRefs.current.set(id, { current: null })
      }
      return triggerRefs.current.get(id)!
    },
    []
  )

  const filteredItems =
    activeCategory === 'All'
      ? items
      : items.filter((item) => item.category === activeCategory)

  const handleItemClick = (filteredIndex: number) => {
    // Find the index in the full items array for the lightbox
    const clickedItem = filteredItems[filteredIndex]
    const globalIndex = items.findIndex((item) => item.id === clickedItem.id)
    setLightboxIndex(globalIndex)
  }

  const handleLightboxClose = () => {
    const currentItem = lightboxIndex !== null ? items[lightboxIndex] : null
    setLightboxIndex(null)
    // Return focus to the triggering element
    if (currentItem) {
      const ref = triggerRefs.current.get(currentItem.id)
      ref?.current?.focus()
    }
  }

  return (
    <section className="w-full px-4 py-12 max-w-7xl mx-auto">
      <FilterBar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filteredItems.map((item, index) => (
            <FadeUpOnScroll key={item.id} delay={Math.min(index * 0.05, 0.4)}>
              <GalleryItemComponent
                item={item}
                onClick={() => handleItemClick(index)}
                triggerRef={getOrCreateRef(item.id)}
              />
            </FadeUpOnScroll>
          ))}
        </motion.div>
      </AnimatePresence>

      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          initialIndex={lightboxIndex}
          onClose={handleLightboxClose}
        />
      )}
    </section>
  )
}
