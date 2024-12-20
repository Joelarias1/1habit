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
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Listen for authentication state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password')
        } else if (error.message.includes('Email not confirmed')) {
          setError('Please verify your email before signing in')
        } else {
          setError('An error occurred during sign in')
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Register new user
  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      router.push('/verify-email')
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('User already registered')) {
          setError('An account with this email already exists')
        } else {
          setError('An error occurred during sign up')
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Sign out current user
  const signOut = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const { error } = await supabase.auth.signOut()
      if (error) throw error

      router.push('/')
      router.refresh()
    } catch (error) {
      setError('An error occurred during sign out')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    user,
    signIn,
    signUp,
    signOut,
    isLoading,
    error,
  }
} 