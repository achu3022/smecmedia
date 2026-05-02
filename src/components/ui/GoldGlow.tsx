'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GoldGlowProps {
  children: React.ReactNode
  className?: string
}

export default function GoldGlow({ children, className }: GoldGlowProps) {
  return (
    <motion.div
      className={cn('transition-shadow duration-300', className)}
      whileHover={{
        boxShadow: '0 0 20px rgba(250,204,21,0.4), 0 0 40px rgba(250,204,21,0.15)',
      }}
      initial={{
        boxShadow: '0 0 0px rgba(250,204,21,0)',
      }}
    >
      {children}
    </motion.div>
  )
}
