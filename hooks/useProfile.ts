import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { useAuth } from './useAuth'

interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string | null
  updated_at: string | null
}

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

  return { profile, loading, error }
} 