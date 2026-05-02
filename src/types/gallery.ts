/**
 * Valid categories for gallery items.
 */
export type GalleryCategory = 'Graphic Design' | 'Film Editing' | 'Events'

/**
 * Represents a single item in the gallery (image or video).
 */
export interface GalleryItem {
  /** Unique identifier */
  id: string
  /** Path to the full-size image or video in /public */
  src: string
  /** Accessible alt text describing the item */
  alt: string
  /** Category used for filtering */
  category: GalleryCategory
  /** Media type */
  type: 'image' | 'video'
  /** Optional separate thumbnail path (used for video items) */
  thumbnailSrc?: string
}
