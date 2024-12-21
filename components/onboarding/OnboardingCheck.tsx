'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export function OnboardingCheck() {
  const [testResults, setTestResults] = useState<{
    read: boolean;
    update: boolean;
    error?: string;
  }>({ read: false, update: false })

  useEffect(() => {
    async function checkPolicies() {
      const supabase = createClient()
      
      try {
        // Test 1: Leer el perfil
        const { data: profile, error: readError } = await supabase
          .from('profiles')
          .select('*')
          .single()

        if (readError) {
          throw new Error(`Read test failed: ${readError.message}`)
        }

        // Test 2: Intentar actualizar el perfil
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ updated_at: new Date().toISOString() })
          .eq('id', profile.id)

        if (updateError) {
          throw new Error(`Update test failed: ${updateError.message}`)
        }

        setTestResults({
          read: true,
          update: true
        })

      } catch (error) {
        setTestResults(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : 'Unknown error'
        }))
      }
    }

    checkPolicies()
  }, [])

  return (
    <div className="p-4 bg-black/20 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Policy Check Results:</h2>
      <ul className="space-y-2">
        <li className="flex items-center gap-2">
          <span className={testResults.read ? "text-green-500" : "text-red-500"}>
            ● 
          </span>
          Read Access: {testResults.read ? "Passed" : "Failed"}
        </li>
        <li className="flex items-center gap-2">
          <span className={testResults.update ? "text-green-500" : "text-red-500"}>
            ●
          </span>
          Update Access: {testResults.update ? "Passed" : "Failed"}
        </li>
        {testResults.error && (
          <li className="text-red-400 text-sm mt-2">
            Error: {testResults.error}
          </li>
        )}
      </ul>
    </div>
  )
} 