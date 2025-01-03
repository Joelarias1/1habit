'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LoadingProps {
  onLoadingComplete?: () => void;
}

export function Loading({ onLoadingComplete }: LoadingProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-zinc-950 flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative flex flex-col items-center"
      >
        <div className="relative w-16 h-16">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Image
              src="/assets/img/logo-1habit.png"
              alt="1habit Logo"
              width={64}
              height={64}
              className="w-16 h-16"
              priority
            />
          </motion.div>
        </div>
        <div className="mt-6 h-1.5 w-32 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-white rounded-full"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              repeat: 0,
              duration: 2,
              ease: "easeInOut"
            }}
            onAnimationComplete={onLoadingComplete}
          />
        </div>
        <motion.span 
          className="mt-4 text-sm text-white/60 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          loading...
        </motion.span>
      </motion.div>
    </div>
  )
} 