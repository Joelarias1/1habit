'use client'

import { motion } from 'framer-motion'
import { GridPattern } from '@/components/ui/grid-pattern'
import { Sparkles, Bell } from 'lucide-react'
import Link from 'next/link'

export default function SoonPage() {
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
          className="text-center p-6 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <Bell className="w-4 h-4 text-white/70" />
            <span className="text-sm text-white/70">Early Access Coming Soon</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 relative inline-block">
            Something Amazing
            <br /> is Coming
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -right-8 -top-8"
            >
              <Sparkles className="w-6 h-6 text-white/50" />
            </motion.div>
          </h1>
          
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            We&apos;re working hard to bring you the best habit tracking experience. 
            Join our waitlist to be the first to know when we launch!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/"
              className="px-8 py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl transition-all hover:scale-105 border border-white/10"
            >
              Back to Home
            </Link>
            <a 
              href="mailto:contact@1habit.app"
              className="px-8 py-3 bg-white text-black rounded-xl transition-all hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 