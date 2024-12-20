'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useAuth } from './useAuth'
import type { Profile } from '@/types/supabase'

export function useProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getProfile = async () => {
      if (!user) {
        setProfile(null)
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) throw error
        setProfile(data)
      } catch (e) {
        console.error('Error fetching profile:', e)
        setError(e instanceof Error ? e : new Error('Error fetching profile'))
      } finally {
        setLoading(false)
      }
    }

    getProfile()
  }, [user, supabase])

  const getUserDetails = () => {
    if (!profile) return null

    return {
      id: profile.id,
      email: profile.email,
      username: profile.full_name || profile.email?.split('@')[0] || 'User',
      avatarUrl: profile.avatar_url,
      fullName: profile.full_name,
    }
  }

  return {
    profile,
    loading,
    error,
    getUserDetails,
    setProfile
  }
} 