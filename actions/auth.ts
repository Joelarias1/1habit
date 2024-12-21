'use server'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    // Primero verificar si el usuario existe y está verificado
    const { data: authUser } = await supabase.auth.admin.listUsers()
    const user = authUser?.users.find(u => u.email === email)

    if (user && !user.email_confirmed_at) {
      return { 
        error: 'Please verify your email before signing in. Check your inbox for the verification link.',
        code: 'EMAIL_NOT_VERIFIED'
      }
    }

    // Intentar login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Login error details:', {
        message: error.message,
        status: error.status,
        name: error.name
      })

      // Mensaje más específico para credenciales inválidas
      if (error.message.includes('Invalid login credentials')) {
        return { 
          error: 'The email or password you entered is incorrect. Please try again.',
          code: 'INVALID_CREDENTIALS'
        }
      }

      return { error: error.message }
    }

    if (!data.user) {
      return { error: 'No user found' }
    }

    return { success: true }

  } catch (error) {
    console.error('Unexpected error in login:', error)
    return { 
      error: 'An unexpected error occurred'
    }
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

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
  })

  if (error) {
    return { error: error.message }
  }

  return { 
    success: true,
    message: 'Password reset instructions sent to your email'
  }
}

export async function register(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    full_name: formData.get('full_name') as string,
  }

  try {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        data: {
          full_name: data.full_name
        }
      }
    })

    if (signUpError) {
      return { error: signUpError.message }
    }

    if (!signUpData.user) {
      return { error: 'Registration failed' }
    }

    // Esperamos un momento para asegurar que el usuario se creó
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Crear perfil inicial
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: signUpData.user.id,
        email: data.email,
        full_name: data.full_name,
        is_onboarded: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (profileError) {
      console.error('Profile creation error:', profileError)
      // No retornamos el error al usuario, ya que el registro fue exitoso
    }

    return { 
      success: true,
      message: 'Account created successfully'
    }

  } catch (error) {
    console.error('Registration error:', error)
    return { 
      error: 'An unexpected error occurred'
    }
  }
} 