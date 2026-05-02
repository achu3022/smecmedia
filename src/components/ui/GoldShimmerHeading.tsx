'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GoldShimmerHeadingProps {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
}

export default function GoldShimmerHeading({
  children,
  as: Tag = 'h2',
  className,
}: GoldShimmerHeadingProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={cn('relative inline-block overflow-hidden', className)}
    >
      <span className="relative z-10">{children}</span>

      {/* Neon yellow shimmer sweep on scroll entry */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20"
        initial={{ backgroundPosition: '-200% center' }}
        animate={isInView ? { backgroundPosition: '200% center' } : { backgroundPosition: '-200% center' }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(250,204,21,0.45) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          mixBlendMode: 'overlay',
        }}
      />
    </Tag>
  )
}
