import { Skeleton } from '@/components/ui/skeleton'

export function SidebarSkeleton() {
  return (
    <div className="p-6 h-screen hidden lg:flex items-start">
      <div className="w-[240px] rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 flex flex-col h-[96vh]">
        {/* Logo Skeleton */}
        <div className="p-4">
          <div className="flex items-center gap-2 px-2">
            <Skeleton className="w-7 h-7 rounded-xl" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Menu Skeletons */}
        <nav className="flex-1 px-3 py-4">
          <div className="space-y-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-start gap-3 px-3 py-3">
                <Skeleton className="w-9 h-9 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* Profile Skeleton */}
        <div className="p-3 space-y-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 