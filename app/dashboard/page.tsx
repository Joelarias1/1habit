'use client'

import { useUserStore } from '@/store/userStore'
import { useEffect } from 'react'
import Image from 'next/image'

export default function DashboardPage() {
  const { profile, loading, fetchProfile } = useUserStore()

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-6">
        {profile?.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt="Profile"
            width={64}
            height={64}
            className="rounded-full"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center text-2xl text-white/90">
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
    </div>
  )
} 