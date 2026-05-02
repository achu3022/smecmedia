import type { GalleryItem, GalleryCategory } from '@/types/gallery'

export const GALLERY_ITEMS: GalleryItem[] = [
  // Graphic Design — 5 items
  {
    id: 'g1',
    src: '/images/gallery/graphic-design-1.jpg',
    alt: 'Student brand identity project featuring a minimalist logo and colour palette',
    category: 'Graphic Design',
    type: 'image',
  },
  {
    id: 'g2',
    src: '/images/gallery/graphic-design-2.jpg',
    alt: 'Motion graphics reel thumbnail showcasing kinetic typography for a product launch',
    category: 'Graphic Design',
    type: 'image',
  },
  {
    id: 'g3',
    src: '/images/gallery/graphic-design-3.jpg',
    alt: 'Social media content pack designed for a fashion brand — Instagram grid layout',
    category: 'Graphic Design',
    type: 'image',
  },
  {
    id: 'g4',
    src: '/images/gallery/graphic-design-4.jpg',
    alt: 'AI-generated concept art combined with Photoshop compositing for a movie poster',
    category: 'Graphic Design',
    type: 'image',
  },
  {
    id: 'g5',
    src: '/images/gallery/graphic-design-5.jpg',
    alt: 'Complete brand guidelines document spread for a student capstone project',
    category: 'Graphic Design',
    type: 'image',
  },

  // Film Editing — 5 items
  {
    id: 'g6',
    src: '/images/gallery/film-editing-1.jpg',
    alt: 'Color-graded still from a student short film — cinematic teal and orange grade',
    category: 'Film Editing',
    type: 'image',
  },
  {
    id: 'g7',
    src: '/images/gallery/film-editing-2.jpg',
    alt: 'DaVinci Resolve color page screenshot showing a student grading session',
    category: 'Film Editing',
    type: 'image',
  },
  {
    id: 'g8',
    src: '/images/gallery/film-editing-3.jpg',
    alt: 'VFX composite frame from a student project featuring green screen replacement',
    category: 'Film Editing',
    type: 'image',
  },
  {
    id: 'g9',
    src: '/images/gallery/film-editing-4.jpg',
    alt: 'Behind-the-scenes still from a student documentary production',
    category: 'Film Editing',
    type: 'image',
  },
  {
    id: 'g10',
    src: '/images/gallery/film-editing-5.jpg',
    alt: 'Editing timeline screenshot of a student commercial cut in Premiere Pro',
    category: 'Film Editing',
    type: 'image',
  },

  // Events — 4 items
  {
    id: 'g11',
    src: '/images/gallery/events-1.jpg',
    alt: 'Annual graduation ceremony — students receiving certificates on stage',
    category: 'Events',
    type: 'image',
  },
  {
    id: 'g12',
    src: '/images/gallery/events-2.jpg',
    alt: 'Industry guest lecture by a senior film editor from a leading production house',
    category: 'Events',
    type: 'image',
  },
  {
    id: 'g13',
    src: '/images/gallery/events-3.jpg',
    alt: 'Student film screening night — audience watching short films in the institute auditorium',
    category: 'Events',
    type: 'image',
  },
  {
    id: 'g14',
    src: '/images/gallery/events-4.jpg',
    alt: 'Design hackathon — students collaborating on a 24-hour branding challenge',
    category: 'Events',
    type: 'image',
  },
]

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'Graphic Design',
  'Film Editing',
  'Events',
]
