'use client'

import { AuthGuard } from '@/components/auth/AuthGuard'
import { Sidebar } from '@/components/layout/sidebar'
import { SidebarSkeleton } from '@/components/layout/SidebarSkeleton'
import { GridPattern } from '@/components/ui/grid-pattern'
import { useUserStore } from '@/store/userStore'
import { motion, AnimatePresence } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect } from 'react'

function DashboardLayoutSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="fixed inset-0">
        <GridPattern className="opacity-30" />
        <div className="absolute inset-0" />
      </div>
      <div className="relative flex min-h-screen">
        <SidebarSkeleton />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Skeleton className="w-16 h-16 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
              <Skeleton className="h-32 w-full rounded-xl" />
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { loading, profile, fetchProfile } = useUserStore()

  useEffect(() => {
    if (!profile) {
      fetchProfile()
    }
  }, [profile, fetchProfile])

  return (
    <AnimatePresence mode="wait">
      {loading && !profile ? (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DashboardLayoutSkeleton />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <AuthGuard>
            <div className="min-h-screen bg-black">
              <div className="fixed inset-0">
                <GridPattern className="opacity-30" />
                <div className="absolute inset-0" />
              </div>
              <div className="relative">
                <Sidebar />
                <main className="lg:pl-[280px] pt-4 md:pt-6">
                  {children}
                </main>
              </div>
            </div>
          </AuthGuard>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 