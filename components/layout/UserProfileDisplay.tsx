import { memo } from 'react'
import { useUserStore } from '@/store/userStore'
import { cn } from '@/lib/utils'

interface UserProfileProps {
  showEmail?: boolean
  size?: 'sm' | 'md' | 'lg'
  photoOnly?: boolean
  className?: string
}

const UserProfileDisplay = memo(({ 
  showEmail = false, 
  size = 'md',
  photoOnly = false,
  className
}: UserProfileProps) => {
  const { profile, loading } = useUserStore()

  const sizes = {
    sm: {
      avatar: 'w-8 h-8',
      text: 'text-xs',
      email: 'text-[10px]',
      indicator: 'w-2 h-2'
    },
    md: {
      avatar: 'w-10 h-10',
      text: 'text-sm',
      email: 'text-xs',
      indicator: 'w-2.5 h-2.5'
    },
    lg: {
      avatar: 'w-16 h-16',
      text: 'text-base',
      email: 'text-sm',
      indicator: 'w-3 h-3'
    }
  }



  if (!profile) return null

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="relative">
        <div className={cn(
          sizes[size].avatar,
          "rounded-full bg-white/10 flex items-center justify-center text-white font-medium relative"
        )}>
          <span className={sizes[size].text}>
            {profile.email[0].toUpperCase()}
          </span>
        </div>
        <div className={cn(
          sizes[size].indicator,
          "absolute -bottom-1 -right-1 rounded-full bg-emerald-500 ring-2 ring-black"
        )} />
      </div>
      {!photoOnly && showEmail && (
        <div className="mt-3 text-center">
          <h3 className="font-medium text-white">
            {profile.full_name || profile.email?.split('@')[0]}
          </h3>
          <p className="text-xs text-white/60 mt-0.5">
            {profile.email}
          </p>
        </div>
      )}
    </div>
  )
})

UserProfileDisplay.displayName = 'UserProfileDisplay'

export default UserProfileDisplay 