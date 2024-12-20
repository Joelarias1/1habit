'use client'

import { useProfile } from '@/hooks/useProfile'

export default function DashboardPage() {
  const { profile, loading } = useProfile()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4 pb-24 lg:pb-4">
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white">
          Hola, {profile?.full_name || 'Usuario'} 👋
        </h1>
        <p className="text-white/60 mt-2">
          Bienvenido de nuevo a tu dashboard
        </p>
      </div>
    </div>
  )
} 