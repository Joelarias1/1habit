'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { GridPattern } from '@/components/ui/grid-pattern'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0">
        <GridPattern className="opacity-30" />
        <div className="absolute inset-0" />
      </div>
      <div className="relative min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center p-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Coming Soon
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
            We&apos;re working hard to bring you the best habit tracking experience. Stay tuned!
          </p>
          <a 
            href="/"
            className="inline-block mt-8 px-6 py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl transition-colors"
          >
            Back to Home
          </a>
        </motion.div>
      </div>
    </div>
  )
} 