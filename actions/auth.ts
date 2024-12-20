'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  // Verificar si el usuario necesita onboarding
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_onboarded')
    .eq('id', (await supabase.auth.getUser()).data.user!.id)
    .single()

  revalidatePath('/', 'layout')
  
  // Redirigir según el estado de onboarding
  if (!profile?.is_onboarded) {
    redirect('/onboarding')
  } else {
    redirect('/dashboard')
  }
}

export async function signOut() {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
    return { success: true }
  } catch (error) {
    console.error('Error signing out:', error)
    return { success: false, error }
  }
}

export async function getUser() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return { user: null }
  }

  return { user }
} 