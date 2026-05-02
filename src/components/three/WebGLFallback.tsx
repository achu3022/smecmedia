import Image from 'next/image'

interface WebGLFallbackProps {
  width?: number
  height?: number
  className?: string
}

/**
 * Static image fallback rendered when WebGL is unavailable.
 * Matches the Canvas dimensions to prevent layout shift.
 *
 * Validates: Requirements 7.14
 */
export default function WebGLFallback({
  width = 800,
  height = 600,
  className,
}: WebGLFallbackProps) {
  return (
    <Image
      src="/images/hero-fallback.jpg"
      alt="Cinematic film production still — 3D scene unavailable"
      width={width}
      height={height}
      className={className}
      priority
    />
  )
}
