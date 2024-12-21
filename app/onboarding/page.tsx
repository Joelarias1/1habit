import { OnboardingForm } from '@/components/onboarding/OnboardingForm'
import { GridPattern } from '@/components/ui/grid-pattern'

export default function OnboardingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="fixed inset-0">
        <GridPattern className="opacity-50" />
      </div>
      <OnboardingForm />
    </main>
  )
} 