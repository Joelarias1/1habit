import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rutas que no requieren autenticación
const publicRoutes = ['/', '/login', '/register', '/verify-email', '/404']

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname)

  // Si es una ruta pública y está autenticado, redirigir al dashboard
  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Si no es una ruta pública y no está autenticado, redirigir al login
  if (!isPublicRoute && !session) {
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico).*)'],
} 