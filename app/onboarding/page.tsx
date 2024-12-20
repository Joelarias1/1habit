import { OnboardingForm } from '@/components/onboarding/OnboardingForm'
import { GridPattern } from '@/components/ui/grid-pattern'

export default function OnboardingPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="fixed inset-0 -z-10">
        <GridPattern className="opacity-50" />
      </div>
      <div className="container max-w-md mx-auto px-4">
        <OnboardingForm />
      </div>
    </div>
  )
} 