'use client'

import { useEffect, useRef } from 'react'

interface FlickeringGridProps {
  squareSize?: number
  gridGap?: number
  flickerChance?: number
  color?: string
  maxOpacity?: number
  className?: string
}

export function FlickeringGrid({
  squareSize = 3,
  gridGap = 8,
  flickerChance = 0.2,
  color = 'rgb(255, 255, 255)',
  maxOpacity = 0.08,
  className = '',
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const columns = Math.ceil(canvas.width / (squareSize + gridGap))
      const rows = Math.ceil(canvas.height / (squareSize + gridGap))

      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          if (Math.random() < flickerChance) {
            ctx.fillStyle = color
            ctx.globalAlpha = Math.random() * maxOpacity
            ctx.fillRect(
              i * (squareSize + gridGap),
              j * (squareSize + gridGap),
              squareSize,
              squareSize
            )
          }
        }
      }

      requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [squareSize, gridGap, flickerChance, color, maxOpacity])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ background: 'rgb(9, 9, 11)' }}
    />
  )
} 