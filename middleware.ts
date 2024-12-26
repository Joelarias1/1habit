import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { createClient } from '@/utils/supabase/middleware'  // Comentado temporalmente

export async function middleware(request: NextRequest) {
  // Código original comentado
  /*
  const res = NextResponse.next()
  const supabase = createClient(request, res)
  const { data: { user } } = await supabase.auth.getUser()

  // Rutas públicas
  const publicRoutes = ['/', '/login', '/register', '/recover']
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname)

  // Si es ruta pública y hay usuario autenticado
  if (isPublicRoute && user) {
    // Verificar estado de onboarding
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_onboarded')
      .eq('id', user.id)
      .single()

    // Si no está onboarded, redirigir a onboarding
    if (!profile?.is_onboarded) {
      return NextResponse.redirect(new URL('/onboarding', request.url))
    }

    // Si está onboarded, redirigir a dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Para rutas protegidas
  if (!isPublicRoute && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Si el usuario está autenticado y trata de acceder a rutas protegidas
  if (user && !isPublicRoute) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_onboarded')
      .eq('id', user.id)
      .single()

    // Si no está onboarded y no está en la página de onboarding
    if (!profile?.is_onboarded && request.nextUrl.pathname !== '/onboarding') {
      return NextResponse.redirect(new URL('/onboarding', request.url))
    }

    // Si está onboarded y trata de acceder a onboarding
    if (profile?.is_onboarded && request.nextUrl.pathname === '/onboarding') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return res
  */

  // Nueva lógica simple para redireccionar a /soon
  const protectedRoutes = ['/login', '/register']
  
  if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/soon', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/register',
    // Rutas originales comentadas
    /*
    '/',
    '/recover',
    '/dashboard/:path*',
    '/onboarding',
    */
  ]
} 