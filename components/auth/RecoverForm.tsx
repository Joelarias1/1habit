'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { resetPassword } from '@/actions/auth'

export function RecoverForm() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsLoading(true)
      setError(null)

      const formData = new FormData()
      formData.append('email', email)
      
      const result = await resetPassword(formData)

      if (result?.error) {
        throw new Error(result.error)
      }

      setIsSuccess(true)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error sending reset instructions')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <div className="text-emerald-500 text-lg font-medium">
          Reset instructions sent!
        </div>
        <p className="text-white/60">
          Please check your email for password reset instructions
        </p>
        <p className="text-sm text-white/40 mt-2">
          Once reset, you can sign in with your new password
        </p>
        <Button 
          onClick={() => router.push('/login')} 
          variant="outline" 
          className="mt-4"
        >
          Back to Login
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      {error && (
        <div className="bg-red-500/10 text-red-500 text-sm p-3 rounded-md">
          {error}
        </div>
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Sending instructions..." : "Reset Password"}
      </Button>

      <div className="text-center">
        <Link 
          href="/login" 
          className="text-sm text-white/60 hover:text-white transition-colors"
        >
          Back to login
        </Link>
      </div>
    </form>
  )
} 