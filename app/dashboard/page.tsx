'use client'

import { useProfile } from '@/hooks/useProfile'

export default function DashboardPage() {
  const { getUserDetails } = useProfile()
  const userDetails = getUserDetails()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-xl p-6">
          <h1 className="text-2xl font-bold text-white">
            Hello, {userDetails?.username} 👋
          </h1>
          <p className="text-white/60 mt-2">
            Welcome back to your dashboard
          </p>
        </div>
      </div>
    </div>
  )
} 