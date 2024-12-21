'use server'

import { createClient } from '@/utils/supabase/server'

interface OnboardingData {
  sleep_hours: number
  age: number
  is_smoker: boolean
  drinks_alcohol: boolean
}

export async function updateUserProfile(data: OnboardingData) {
  const supabase = await createClient()
  
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return { error: 'No authenticated user found' }
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        ...data,
        is_onboarded: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)

    if (error) {
      console.error('Error updating profile:', error)
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { 
      error: 'An unexpected error occurred while updating profile'
    }
  }
} 