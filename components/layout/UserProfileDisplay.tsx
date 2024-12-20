import { memo } from 'react'
import { useUserStore } from '@/store/userStore'
import Image from 'next/image'

interface UserProfileProps {
  showEmail?: boolean
  showDetails?: boolean
}

const UserProfileDisplay = memo(({ showEmail = false, showDetails = false }: UserProfileProps) => {
  const { user, profile } = useUserStore()

  if (!user || !profile) return null

  return (
    <div className="flex items-center gap-3">
      {profile.avatar_url && (
        <Image 
          src={profile.avatar_url}
          alt="Profile"
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />
      )}
      <div className="flex flex-col">
        <span className="font-medium">
          {profile.full_name || profile.email?.split('@')[0]}
        </span>
        {showEmail && <span className="text-sm text-gray-500">{profile.email}</span>}
        {showDetails && (
          <div className="text-sm text-gray-500">
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