'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/userStore'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { profile } = useUserStore()

  useEffect(() => {
    if (!profile) {
      router.push('/login')
    }
  }, [profile, router])

  if (!profile) return null

  return <>{children}</>
} 