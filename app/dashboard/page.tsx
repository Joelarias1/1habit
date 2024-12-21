'use client'

import { useUserStore } from '@/store/userStore'
import { useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'

function DashboardSkeleton() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      <div className="grid gap-6">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { profile, loading, fetchProfile } = useUserStore()

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  if (loading) {
    return <DashboardSkeleton />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="p-8"
    >
      <div className="flex items-center gap-4 mb-6">
        {profile?.avatar_url ? (
          <div className="relative w-16 h-16">
            <Image 
              src={profile.avatar_url}
              alt={profile.full_name || 'Profile'}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center text-2xl text-white/90">
            {profile?.email?.[0].toUpperCase()}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome back, {profile?.full_name || profile?.email?.split('@')[0]}! 👋
          </h1>
          <p className="text-white/60 mt-1">
            {profile?.email}
          </p>
        </div>
      </div>
      <div className="grid gap-6">
        {/* Aquí puedes agregar más contenido del dashboard */}
      </div>
    </motion.div>
  )
} 