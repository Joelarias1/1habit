import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabaseClient'
import { User } from '@supabase/supabase-js'

/**
 * Hook for managing authentication state and operations
 * @returns {Object} Authentication methods and state
 * 
 * @property {User | null} user - Current authenticated user or null
 * @property {(email: string, password: string) => Promise<void>} signIn - Email/password sign in
 * @property {(email: string, password: string) => Promise<void>} signUp - New user registration
 * @property {() => Promise<void>} signOut - Sign out current user
 * @property {boolean} isLoading - Loading state for auth operations
 * @property {string | null} error - Error message if auth operation fails
 * 
 * @example
 * const { user, signIn, error } = useAuth();
 * // Sign in user
 * await signIn('user@example.com', 'password');
 */
export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return { user, isLoading, error, signOut }
} 