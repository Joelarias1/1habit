'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/userStore'

export function useAuth() {
  const { setProfile, setLoading, fetchProfile } = useUserStore()
  const [error, setError] = useState<Error | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) throw error
        if (user) {
          await fetchProfile()
        } else {
          setProfile(null)
        }
      } catch (e) {
        console.error('Error getting user:', e)
        setError(e instanceof Error ? e : new Error('Error getting user'))
      } finally {
        setLoading(false)
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await fetchProfile()
        } else {
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth, setProfile, setLoading, fetchProfile])

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setProfile(null)
      router.push('/login')
    } catch (e) {
      console.error('Error signing out:', e)
      setError(e instanceof Error ? e : new Error('Error signing out'))
    }
  }

  return { error, logout }
} 