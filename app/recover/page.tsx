'use client'

import { RecoverForm } from "@/components/auth/RecoverForm"
import { QuoteDisplay } from "@/components/auth/QuoteDisplay"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { GridPattern } from '@/components/ui/grid-pattern'

export default function RecoverPage() {
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex justify-center lg:hidden mb-8"
            >
              <Link href="/" className="flex items-center gap-2">
                <div className="p-1.5 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20">
                  <Image
                    src="/assets/img/logo-1habit.png"
                    alt="1habit Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <span className="font-semibold text-white/95">1habit</span>
              </Link>
            </motion.div>

            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Reset your password
              </h1>
              <p className="text-white/60">
                Enter your email below to receive password reset instructions.
              </p>
            </div>

            <RecoverForm />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 