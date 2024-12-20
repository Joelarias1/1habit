'use client'

import { SignInForm } from "@/components/auth/SignInForm"
import { OAuthButtons } from "@/components/auth/OAuthButtons"
import { QuoteDisplay } from "@/components/auth/QuoteDisplay"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useProfile } from '@/hooks/useProfile'
import { GridPattern } from '@/components/ui/grid-pattern'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const [authError, setAuthError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { profile } = useProfile()
  const router = useRouter()

  useEffect(() => {
    const error = searchParams.get('error')
    if (error === 'auth') {
      setAuthError('Authentication failed. Please try again.')
    }
  }, [searchParams])

  useEffect(() => {
    if (profile) {
      setIsLoading(true)
      if (!profile.is_onboarded) {
        router.push('/onboard')
      } else {
        router.push('/dashboard')
      }
    } else {
      setIsLoading(false)
    }
  }, [profile, router])

  if (isLoading) {
    return (
      <div className="h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="h-screen overflow-hidden">
      <div className="grid lg:grid-cols-2 h-full">
        {/* Left section - Quote (se oculta en mobile/tablet) */}
        <div className="hidden lg:block">
          <QuoteDisplay />
        </div>

        {/* Right section - Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex items-center justify-center p-8 h-full overflow-y-auto lg:bg-transparent w-full col-span-2 lg:col-span-1"
        >
          {/* Background Pattern - Solo para mobile/tablet */}
          <div className="absolute inset-0 -z-10 block lg:hidden">
            <GridPattern 
              className="opacity-30" 
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full max-w-[350px] space-y-6 relative z-10"
          >
            {/* Mobile logo */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-8 flex items-center justify-center lg:hidden"
            >
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Image
                  src="/assets/img/logo-1habit.png"
                  alt="1habit Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <span className="font-bold tracking-tight">1habit</span>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col space-y-2 text-center"
            >
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email to sign in to your account
              </p>
            </motion.div>

            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-md bg-red-50 border border-red-200"
              >
                <p className="text-sm text-red-600">{authError}</p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <SignInForm />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <OAuthButtons />
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-center text-sm text-muted-foreground"
            >
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign up
              </Link>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 