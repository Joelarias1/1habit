import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'
import type { Profile } from '@/types/supabase'

interface UserState {
  user: User | null
  loading: boolean
  profile: Profile | null
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setProfile: (profile: Profile | null) => void
  fetchProfile: () => Promise<void>
  updateProfile: (data: Partial<Profile>) => Promise<{ success: boolean } | void>
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: true,
      profile: null,
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
      setProfile: (profile) => set({ profile }),
      fetchProfile: async () => {
        const supabase = createClient()
        const { user } = get()
        
        if (!user) return

        const { data, error } = await supabase
          .from('profiles')
          .select(`
            id,
            email,
            full_name,
            avatar_url,
            timezone,
            created_at,
            updated_at,
            sleep_hours,
            is_smoker,
            drinks_alcohol,
            age,
            is_onboarded
          `)
          .eq('id', user.id)
          .single()

        if (error) {
          console.error('Error fetching profile:', error)
          return
        }

        set({ profile: data })
      },
      updateProfile: async (updates: Partial<Profile>) => {
        const supabase = createClient()
        const { user } = get()
        
        if (!user) {
          console.log('No active session')
          return { success: false, error: 'No active session' }
        }

        try {
          const { data, error } = await supabase
            .from('profiles')
            .update({
              ...updates,
              updated_at: new Date().toISOString()
            })
            .eq('id', user.id)
            .select()

          if (error) throw error

          // Refetch solo si hay sesión activa
          try {
            await get().fetchProfile()
          } catch (e) {
            // Ignorar errores de fetchProfile durante el logout
            console.log('Session ended, skipping profile fetch')
          }
          
          return { success: true }
        } catch (error) {
          console.error('Error updating profile:', error)
          return { success: false, error }
        }
      }
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user, profile: state.profile })
    }
  )
) 