'use client'

import { useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GridPatternProps {
  width?: number
  height?: number
  x?: number
  y?: number
  squares?: number[]
  className?: string
}

export function GridPattern({
  width = 50,
  height = 50,
  x = -1,
  y = -1,
  className = '',
}: GridPatternProps) {
  const id = useId()
  const columns = Math.ceil((typeof window !== 'undefined' ? window.innerWidth : 1920) / width) + 1
  const rows = Math.ceil((typeof window !== 'undefined' ? window.innerHeight : 1080) / height) + 1
  const squares = Array.from({ length: columns * rows }, (_, i) => i)

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
          x={x}
          y={y}
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
          const col = square % columns
          const row = Math.floor(square / columns)
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