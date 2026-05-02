'use client'

import Link from 'next/link'
import { motion, useTransform } from 'framer-motion'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant: 'primary' | 'secondary'
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const baseStyles =
  'relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACC15] focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

const variantStyles = {
  primary:   'bg-[#FACC15] text-black hover:bg-[#FDE047] yellow-glow-pulse',
  secondary: 'border border-[rgba(250,204,21,0.5)] text-[#FACC15] hover:bg-[rgba(250,204,21,0.08)] hover:border-[#FACC15]',
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant,
  className,
  type = 'button',
  disabled = false,
}: MagneticButtonProps) {
  const { dx, dy, handleMouseMove, handleMouseLeave } = useMagneticEffect(40)

  const x = useTransform(dx, (v) => v)
  const y = useTransform(dy, (v) => v)

  const combinedClassName = cn(baseStyles, variantStyles[variant], className)

  const motionProps = {
    style: { x, y },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  }

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      {...motionProps}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={combinedClassName}
    >
      {children}
    </motion.button>
  )
}
