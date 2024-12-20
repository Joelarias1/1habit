'use client'

import { useProfile } from '@/hooks/useProfile'

export default function OnboardPage() {
  const { profile, loading, error } = useProfile()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="p-4 pb-24 lg:pb-4">
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-6">
          Datos del Perfil
        </h1>
        
        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h2 className="text-lg font-medium text-white mb-2">Datos Actuales</h2>
            <pre className="text-sm text-white/70 overflow-auto">
              {JSON.stringify(profile, null, 2)}
            </pre>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h2 className="text-lg font-medium text-white mb-2">Estado de Onboarding</h2>
            <p className="text-white/70">
              Onboarding completado: {profile?.is_onboarded ? 'Sí' : 'No'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 