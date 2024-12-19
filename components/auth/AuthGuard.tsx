'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/utils/supabaseClient'
import { Loading } from '@/components/ui/loading'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        const redirectTo = searchParams.get('redirectTo')
        router.push(`/login${redirectTo ? `?redirectTo=${redirectTo}` : ''}`)
        return
      }

      setIsAuthenticated(true)
    }

    checkAuth()
  }, [router, searchParams])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (!isAuthenticated) {
    return <Loading onLoadingComplete={handleLoadingComplete} />
  }

  if (isLoading) {
    return <Loading onLoadingComplete={handleLoadingComplete} />
  }

  return <>{children}</>
} 