'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserStore } from '@/store/userStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Moon, Clock, Cigarette, Wine, ArrowRight, Check, Skull } from 'lucide-react'

const steps = [
  {
    id: 'sleep',
    title: 'Sleep Habits',
    description: 'Good rest is essential for maintaining healthy habits.',
    icon: Moon,
    field: 'sleep_hours'
  },
  {
    id: 'age',
    title: 'Your Age',
    description: 'Helps us better personalize your goals.',
    icon: Clock,
    field: 'age'
  },
  {
    id: 'habits',
    title: 'Bad Habits',
    description: 'Identifying harmful habits is the first step towards a healthier lifestyle.',
    icon: Skull,
    fields: ['is_smoker', 'drinks_alcohol']
  }
]

export function OnboardingForm() {
  const router = useRouter()
  const { profile, updateProfile } = useUserStore()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    sleep_hours: profile?.sleep_hours || 8,
    is_smoker: profile?.is_smoker || false,
    drinks_alcohol: profile?.drinks_alcohol || false,
    age: profile?.age || 25,
  })

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await updateProfile({
        ...formData,
        is_onboarded: true,
      })
      router.push('/dashboard')
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    const step = steps[currentStep]
    switch (step.id) {
      case 'sleep':
        return (
          <div className="space-y-4">
            <Input
              type="number"
              min={1}
              max={12}
              value={formData.sleep_hours}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                sleep_hours: parseInt(e.target.value)
              }))}
              className="w-full bg-black/10 border border-white/10 rounded-xl px-4 text-white text-lg h-14 focus:border-white/20 focus:ring focus:ring-white/10 transition-all"
              required
            />
            <div className="flex justify-between text-sm text-white/60">
              <span className="text-sm text-white/60">Minimum: 1 hour</span>
              <span className="text-sm text-white/60">Maximum: 12 hours</span>
            </div>
          </div>
        )
      case 'age':
        return (
          <div className="space-y-4">
            <Input
              type="number"
              min={18}
              max={100}
              value={formData.age}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                age: parseInt(e.target.value)
              }))}
              className="w-full bg-black/10 border border-white/10 rounded-xl px-4 text-white text-lg h-14 focus:border-white/20 focus:ring focus:ring-white/10 transition-all"
              required
            />
            <div className="flex justify-between text-sm text-white/60">
              <span>Mínimo: 18 años</span>
              <span>Máximo: 100 años</span>
            </div>
          </div>
        )
      case 'habits':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-5 bg-gradient-to-br from-black/20 to-black/10 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-white/5">
                  <Cigarette className="w-5 h-5 text-white/70" />
                </div>
                <span className="text-lg text-white/90">Do you smoke?</span>
              </div>
              <Switch
                checked={formData.is_smoker}
                onCheckedChange={(checked) => setFormData(prev => ({
                  ...prev,
                  is_smoker: checked
                }))}
                className="data-[state=checked]:bg-white data-[state=checked]:border-white/50"
              />
            </div>
            <div className="flex items-center justify-between p-5 bg-gradient-to-br from-black/20 to-black/10 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-white/5">
                  <Wine className="w-5 h-5 text-white/70" />
                </div>
                <span className="text-lg text-white/90">Do you drink alcohol?</span>
              </div>
              <Switch
                checked={formData.drinks_alcohol}
                onCheckedChange={(checked) => setFormData(prev => ({
                  ...prev,
                  drinks_alcohol: checked
                }))}
                className="data-[state=checked]:bg-white data-[state=checked]:border-white/50"
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const StepIcon = steps[currentStep].icon

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square max-w-[800px]"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.1) 25%, transparent 60%)',
          filter: 'blur(80px)',
          transform: 'translateZ(0)',
          pointerEvents: 'none',
        }}
      />
      
      <div className="relative mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center drop-shadow-glow">
          Customize your experience
        </h1>
        <p className="mt-2 text-white/80 text-center text-sm md:text-base">
          Let&apos;s set up your preferences to get started
        </p>
      </div>
      
      <div className="relative mb-8 md:mb-12">
        <div className="h-2 bg-white/20 rounded-full overflow-hidden shadow-glow">
          <motion.div
            className="h-full bg-gradient-to-r from-white to-white/90 shadow-lg"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>
        <div className="mt-2 flex justify-between text-sm text-white/70">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative space-y-6 md:space-y-8"
        >
          <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-lg border border-white/10 rounded-2xl p-4 md:p-6 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10">
                <StepIcon className="w-7 h-7 text-white/70" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  {steps[currentStep].title}
                </h2>
                <p className="text-white/60 mt-1">
                  {steps[currentStep].description}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {renderStepContent()}
            </div>
          </div>

          <Button
            onClick={handleNext}
            disabled={loading}
            className="w-full bg-gradient-to-r from-white/90 via-white/80 to-white/70 hover:from-white hover:via-white/90 hover:to-white/80 text-black h-12 md:h-14 rounded-xl text-base md:text-lg font-medium transition-all shadow-lg shadow-black/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2 text-black/70">
                Saving...
              </span>
            ) : currentStep === steps.length - 1 ? (
              <span className="flex items-center gap-2">
                Finish <Check className="w-5 h-5" />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Next <ArrowRight className="w-5 h-5" />
              </span>
            )}
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 