'use client'

import { cn } from '@/lib/utils'
import TiltCard from './TiltCard'
import GoldGlow from './GoldGlow'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  tilt?: boolean
  glow?: boolean
}

export default function GlassCard({ children, className, tilt = false, glow = false }: GlassCardProps) {
  const cardContent = (
    <div
      className={cn(
        'bg-[rgba(17,17,17,0.85)] border border-[rgba(250,204,21,0.18)] rounded-2xl transition-colors duration-200 hover:border-[rgba(250,204,21,0.45)]',
        className
      )}
    >
      {children}
    </div>
  )

  if (tilt && glow) {
    return (
      <TiltCard>
        <GoldGlow>{cardContent}</GoldGlow>
      </TiltCard>
    )
  }

  if (tilt) return <TiltCard>{cardContent}</TiltCard>
  if (glow) return <GoldGlow>{cardContent}</GoldGlow>

  return cardContent
}
