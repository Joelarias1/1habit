'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function SignInForm() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link 
            href="/recover" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
        />
      </div>
      <Button>
        Sign In
      </Button>
    </div>
  )
} 