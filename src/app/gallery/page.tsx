import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import GalleryGrid from '@/components/sections/gallery/GalleryGrid'
import { GALLERY_ITEMS, GALLERY_CATEGORIES } from '@/data/gallery'

export const metadata: Metadata = {
  title: 'Student Work & Gallery | SMEC Media',
  description:
    'Explore student projects, film edits, graphic design work, and institute events from our Graphic Design & Film Editing programs.',
}

export default function GalleryPage() {
  return (
    <main>
      <PageHero heading="Student Work & Gallery" />
      <GalleryGrid items={GALLERY_ITEMS} categories={GALLERY_CATEGORIES} />
    </main>
  )
}
