'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function NotFound() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  const handleNavigation = (e: React.MouseEvent) => {
    e.preventDefault()
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }

  if (user) {
    return null // Prevents flash while redirecting
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
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

          {/* Error Message */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">404</h1>
            <h2 className="text-xl font-semibold text-white">Page not found</h2>
            <p className="text-zinc-400 mt-2">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <button 
              onClick={handleNavigation}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            >
              {user ? 'Return to Dashboard' : 'Go back home'}
            </button>
            <p className="text-sm text-zinc-500">
              Need help?{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Contact Support
              </Link>
            </p>
          </div>

          {/* 404 Background Animation */}
          <motion.div
            className="absolute inset-0 -z-10 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-grid-white/5 bg-[size:3rem_3rem] [mask-image:radial-gradient(white,transparent_70%)]" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 