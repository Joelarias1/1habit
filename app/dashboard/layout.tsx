'use client'

import { useProfile } from '@/hooks/useProfile'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { Sidebar } from '@/components/layout/sidebar'
import { GridPattern } from '@/components/ui/grid-pattern'
import { OnboardingForm } from '@/components/onboarding/OnboardingForm'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { profile, loading } = useProfile()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !profile?.is_onboarded) {
      router.push('/onboard')
    }
  }, [profile?.is_onboarded, loading, router])

  if (loading) return null

  return (
    <AuthGuard>
      <div className="flex h-screen bg-zinc-950 relative">
        <GridPattern className="opacity-50" />
        <Sidebar />
        <main className="flex-1 overflow-auto relative">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  )
} 