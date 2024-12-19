'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function RecoverPage() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                35deg,
                transparent,
                transparent 20px,
                currentColor 20px,
                currentColor 21px,
                transparent 21px,
                transparent 40px
              ),
              repeating-linear-gradient(
                -35deg,
                transparent,
                transparent 20px,
                currentColor 20px,
                currentColor 21px,
                transparent 21px,
                transparent 40px
              )
            `
          }}
        />
        <div className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 30px,
                currentColor 30px,
                currentColor 31px,
                transparent 31px,
                transparent 60px
              )
            `
          }}
        />
        <div className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(
                circle at 50% 50%,
                rgba(255, 255, 255, 0.1) 0%,
                transparent 70%
              )
            `,
            backgroundSize: '100% 100%'
          }}
        />
      </div>

      <div className="container relative flex-col items-center justify-center h-full grid lg:max-w-none lg:px-0">
        <Link
          href="/"
          className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2 text-2xl font-bold tracking-tight"
        >
          <Image
            src="/assets/img/logo-1habit.png"
            alt="1habit Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          1habit
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
        >
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Reset your password
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and we&apos;ll send you instructions to reset your password
            </p>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
              />
            </div>
            <Button>
              Send reset instructions
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/login"
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary"
            >
              Back to sign in
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 