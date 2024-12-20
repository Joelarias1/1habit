'use client'

import { AuthGuard } from '@/components/auth/AuthGuard'
import { Sidebar } from '@/components/layout/sidebar'
import { GridPattern } from '@/components/ui/grid-pattern'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen">
        {/* Background Pattern */}
        <div className="fixed inset-0">
          <GridPattern className="opacity-30" />
          <div className="absolute inset-0" />
        </div>

        {/* Content */}
        <div className="relative flex min-h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
} 