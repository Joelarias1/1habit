'use client'

import { useId, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GridPatternProps {
  width?: number
  height?: number
  className?: string
}

export function GridPattern({
  width = 50,
  height = 50,
  className = '',
}: GridPatternProps) {
  const id = useId()
  const [mounted, setMounted] = useState(false)
  const [squares, setSquares] = useState<number[]>([])

  useEffect(() => {
    setMounted(true)
    const calculateGrid = () => {
      const columns = Math.ceil(window.innerWidth / width) + 1
      const rows = Math.ceil(window.innerHeight / height) + 1
      return Array.from({ length: columns * rows }, (_, i) => i)
    }
    setSquares(calculateGrid())

    const handleResize = () => {
      setSquares(calculateGrid())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [width, height])

  if (!mounted) return null

  return (
    <svg
      className={`fixed inset-0 -z-50 h-full w-full stroke-white/40 [mask-image:radial-gradient(circle_at_center,white_40%,transparent_100%)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${id})`}
      />
      <AnimatePresence>
        {squares.map((square) => {
          const col = square % Math.ceil(window.innerWidth / width)
          const row = Math.floor(square / Math.ceil(window.innerWidth / width))
          const x = col * width
          const y = row * height

          return (
            <motion.rect
              key={square}
              width={width * 0.85}
              height={height * 0.85}
              x={x + width * 0.075}
              y={y + height * 0.075}
              className="fill-white/20"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.8, 0],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: Math.random() * 8
                }
              }}
            />
          )
        })}
      </AnimatePresence>
    </svg>
  )
} 