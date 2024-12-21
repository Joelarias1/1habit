'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { resetPassword } from '@/actions/auth'
import { CheckCircle } from 'lucide-react'

export function RecoverForm() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('email', email)
      
      const result = await resetPassword(formData)
      
      if (result?.error) {
        setError(result.error)
      } else if (result?.success) {
        setIsSuccess(true)
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center">
        <div className="space-y-4">
          <CheckCircle className="w-12 h-12 text-white/80 mx-auto" />
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">
              Check your email
            </h3>
            <p className="text-white/60">
              We have sent password reset instructions to your email.
            </p>
          </div>
          <Button 
            asChild
            className="bg-gradient-to-r from-white/90 via-white/80 to-white/70 hover:from-white hover:via-white/90 hover:to-white/80 text-black font-medium"
          >
            <Link href="/login">
              Return to Login
            </Link>
          </Button>
        </div>
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
          required
        />
      </div>
      {error && (
        <div className="bg-red-500/10 text-red-500 text-sm p-3 rounded-md">
          {error}
        </div>
      )}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Reset Instructions"}
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