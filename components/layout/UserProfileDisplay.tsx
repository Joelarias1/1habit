import { memo } from 'react'
import { useUserStore } from '@/store/userStore'

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
  const { profile } = useUserStore()

  if (!profile) return null

  const sizes = {
    sm: {
      avatar: 'w-5 h-5 text-xs',
      text: 'text-xs',
      email: 'text-[10px]'
    },
    md: {
      avatar: 'w-8 h-8 text-sm',
      text: 'text-sm',
      email: 'text-xs'
    },
    lg: {
      avatar: 'w-12 h-12 text-lg',
      text: 'text-base',
      email: 'text-sm'
    }
  }

  return (
    <div className="flex items-center gap-2 min-w-0">
      <div className={`${sizes[size].avatar} shrink-0 rounded-full bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center text-white font-medium shadow-lg border border-white/10`}>
        {profile.email[0].toUpperCase()}
      </div>
      <div className="flex flex-col min-w-0">
        <span className={`font-medium text-white/90 truncate ${sizes[size].text}`}>
          {profile.full_name || profile.email?.split('@')[0]}
        </span>
        {showEmail && (
          <span className={`text-white/60 truncate ${sizes[size].email}`}>
            {profile.email}
          </span>
        )}
        {showDetails && (
          <div className={`text-white/60 ${sizes[size].email}`}>
            <p>Age: {profile.age || 'Not set'}</p>
            <p>Timezone: {profile.timezone || 'Not set'}</p>
            <p>Sleep hours: {profile.sleep_hours || 'Not set'}</p>
          </div>
        )}
      </div>
    </div>
  )
})

UserProfileDisplay.displayName = 'UserProfileDisplay'

export default UserProfileDisplay 