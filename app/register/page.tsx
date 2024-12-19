'use client'

import { SignUpForm } from "@/components/auth/SignUpForm"
import { OAuthButtons } from "@/components/auth/OAuthButtons"
import { QuoteDisplay } from "@/components/auth/QuoteDisplay"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function RegisterPage() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="grid lg:grid-cols-2 h-full">
        <QuoteDisplay />

        {/* Sección derecha - Formulario */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center p-8 h-full overflow-y-auto"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full max-w-[350px] space-y-6"
          >
            {/* Logo móvil */}
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
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <SignUpForm />
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
              Already have an account?{" "}
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign in
              </Link>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 