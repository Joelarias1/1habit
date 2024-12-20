'use client'

import { useProfile } from '@/hooks/useProfile'
import { OnboardingForm } from '@/components/onboarding/OnboardingForm'
import { GridPattern } from '@/components/ui/grid-pattern'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function OnboardPage() {
  const { profile, loading } = useProfile()
  const router = useRouter()

  useEffect(() => {
    if (!loading && profile?.is_onboarded) {
      router.push('/dashboard')
    }
  }, [profile?.is_onboarded, loading, router])

  if (loading) return null

  return (
    <div className="min-h-screen">
      <GridPattern className="fixed inset-0" />
      <div className="relative min-h-screen flex items-center justify-center px-4 py-8 md:px-8">
        <OnboardingForm />
      </div>
    </div>
  )
} 