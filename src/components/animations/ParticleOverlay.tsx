"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface ParticleOverlayProps {
  opacity?: number
  className?: string
}

export default function ParticleOverlay({
  opacity = 0.15,
  className,
}: ParticleOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize()

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw random grain/noise particles
      const particleCount = Math.floor((canvas.width * canvas.height) / 800)
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 1.5 + 0.5 // 0.5–2px
        const alpha = Math.random() * 0.6 + 0.1 // 0.1–0.7

        ctx.beginPath()
        ctx.arc(x, y, size / 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ opacity }}
      className={cn(
        "absolute inset-0 w-full h-full pointer-events-none",
        className
      )}
      aria-hidden="true"
    />
  )
}
