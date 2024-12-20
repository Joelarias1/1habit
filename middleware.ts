import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createClient(request, res)
  const { data: { user } } = await supabase.auth.getUser()

  // Si no hay usuario, permitir acceso normal
  if (!user) {
    return res
  }

  // Verificar estado de onboarding
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_onboarded')
    .eq('id', user.id)
    .single()

  const path = request.nextUrl.pathname

  // Redirigir a onboarding si no está onboarded e intenta acceder a dashboard
  if (!profile?.is_onboarded && path.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/onboarding', request.url))
  }

  // Redirigir a dashboard si ya está onboarded e intenta acceder a onboarding
  if (profile?.is_onboarded && path === '/onboarding') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/onboarding']
} 