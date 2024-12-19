'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error || !session) {
        router.push('/login')
        return
      }
      setUser(session.user)
    }

    getUser()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
        
        <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Protected Content</h2>
          <p className="text-zinc-400">
            Welcome to your dashboard! This page is only visible to authenticated users.
          </p>
          <div className="mt-4 p-4 bg-zinc-800 rounded-md">
            <p className="text-sm text-zinc-300">
              Logged in as: {user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 