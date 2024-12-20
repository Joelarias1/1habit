'use client'

import { useProfile } from '@/hooks/useProfile'
import { OnboardingForm } from './OnboardingForm'
import { Sidebar } from '@/components/layout/sidebar'
import { GridPattern } from '@/components/ui/grid-pattern'

export function OnboardingCheck({ children }: { children: React.ReactNode }) {
  const { profile, loading } = useProfile()

  if (loading) {
    return null
  }

  if (!profile?.is_onboarded) {
    return (
      <div className="flex h-screen relative">
        <GridPattern className="opacity-50" />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md p-4">
            <OnboardingForm />
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-zinc-950 relative">
      <GridPattern className="opacity-50" />
      <Sidebar />
      <main className="flex-1 overflow-auto relative">
        {children}
      </main>
    </div>
  )
} 