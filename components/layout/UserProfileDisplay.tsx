import { memo } from 'react'
import { useUserStore } from '@/store/userStore'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface UserProfileProps {
  showEmail?: boolean
  showDetails?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const UserProfileDisplay = memo(({ 
  showEmail = false, 
  showDetails = false,
  size = 'md'
}: UserProfileProps) => {
  const { profile, loading } = useUserStore()

  const sizes = {
    sm: {
      avatar: 'w-5 h-5',
      text: 'text-xs',
      email: 'text-[10px]',
      indicator: 'w-2 h-2'
    },
    md: {
      avatar: 'w-8 h-8',
      text: 'text-sm',
      email: 'text-xs',
      indicator: 'w-3 h-3'
    },
    lg: {
      avatar: 'w-12 h-12',
      text: 'text-base',
      email: 'text-sm',
      indicator: 'w-4 h-4'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="relative">
          <Skeleton className={cn(sizes[size].avatar, "rounded-full")} />
          <div className={cn(
            sizes[size].indicator,
            "absolute -bottom-1 -right-1 rounded-full bg-white/10"
          )} />
        </div>
        {!showEmail ? null : (
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        )}
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className={cn(
          sizes[size].avatar,
          "rounded-full bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center text-white font-medium overflow-hidden"
        )}>
          {profile.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={profile.full_name || 'Profile'}
              fill
              className="object-cover"
            />
          ) : (
            <span className={sizes[size].text}>
              {profile.email[0].toUpperCase()}
            </span>
          )}
        </div>
        <div className={cn(
          sizes[size].indicator,
          "absolute -bottom-1 -right-1 rounded-full bg-emerald-500 border-2 border-black/80"
        )} />
      </div>
      {!showEmail ? null : (
        <div className="flex flex-col min-w-0">
          <span className={cn("font-medium text-white/90 truncate", sizes[size].text)}>
            {profile.full_name || profile.email?.split('@')[0]}
          </span>
          <span className={cn("text-white/60 truncate", sizes[size].email)}>
            {profile.email}
          </span>
        </div>
      )}
    </div>
  )
})

UserProfileDisplay.displayName = 'UserProfileDisplay'

export default UserProfileDisplay 