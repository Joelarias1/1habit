import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { useAuth } from './useAuth'
import type { Profile } from '@/types/supabase'

export function useProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true

    const fetchProfile = async () => {
      try {
        if (!user?.id) return

        const { data, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profileError) throw profileError

        if (mounted) {
          setProfile(data)
        }
      } catch (e) {
        if (mounted) {
          setError(e instanceof Error ? e : new Error('Error loading profile'))
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchProfile()
    return () => { mounted = false }
  }, [user?.id])

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!user?.id) throw new Error('No user logged in')

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error
      setProfile(data)
      return { data, error: null }
    } catch (error) {
      console.error('Error updating profile:', error)
      return { 
        data: null, 
        error: error instanceof Error ? error : new Error('Error updating profile')
      }
    }
  }

  return { profile, loading, error, updateProfile }
} 