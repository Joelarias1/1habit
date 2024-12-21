import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createClient } from '@/utils/supabase/client'

interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  is_onboarded: boolean
  age: number | null
  sleep_hours: number | null
  is_smoker: boolean
  drinks_alcohol: boolean
  timezone: string | null
  created_at: string
  updated_at: string
}

interface UserState {
  profile: Profile | null
  loading: boolean
  setProfile: (profile: Profile | null) => void
  setLoading: (loading: boolean) => void
  fetchProfile: () => Promise<void>
  updateProfile: (data: Partial<Profile>) => Promise<{ success?: boolean; error?: string }>
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: null,
      loading: true,
      setProfile: (profile) => set({ profile }),
      setLoading: (loading) => set({ loading }),
      fetchProfile: async () => {
        const supabase = createClient()
        try {
          const { data: { user } } = await supabase.auth.getUser()
          
          if (!user) {
            set({ profile: null, loading: false })
            return
          }

          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          set({ profile, loading: false })
        } catch (error) {
          console.error('Error fetching profile:', error)
          set({ loading: false })
        }
      },
      updateProfile: async (data) => {
        const supabase = createClient()
        try {
          const { data: { user } } = await supabase.auth.getUser()
          if (!user) return { error: 'No user found' }

          const { error } = await supabase
            .from('profiles')
            .update(data)
            .eq('id', user.id)

          if (error) throw error
          await useUserStore.getState().fetchProfile()
          return { success: true }
        } catch (error) {
          console.error('Error updating profile:', error)
          return { error: 'Failed to update profile' }
        }
      }
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ profile: state.profile })
    }
  )
) 