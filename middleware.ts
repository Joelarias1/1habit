import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Lista de rutas protegidas
  const protectedRoutes = ['/login', '/register', '/dashboard']
  
  // Verificar si la ruta actual está protegida
  if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/soon', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/login/:path*', '/register/:path*', '/dashboard/:path*'],
} 