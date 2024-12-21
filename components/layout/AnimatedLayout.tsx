'use client'

import { motion, AnimatePresence } from 'framer-motion'

export function AnimatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
} 