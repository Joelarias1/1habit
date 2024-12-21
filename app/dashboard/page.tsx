'use client'

import { useUserStore } from '@/store/userStore'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import { BarChart3, Calendar, Target, TrendingUp, TrendingDown, ArrowRight, Sparkles, CheckCircle, Clock, Eye } from 'lucide-react'
import { Loading } from '@/components/ui/loading'
import { cn } from '@/lib/utils'

function StatCard({ 
  title, 
  value, 
  icon: Icon,
  description 
}: { 
  title: string
  value: string | number
  icon: any
  description: string
}) {
  return (
    <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-lg border border-white/20 rounded-2xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-white/60">{title}</p>
          <p className="text-2xl font-semibold text-white mt-1">{value}</p>
          <p className="text-sm text-white/40 mt-1">{description}</p>
        </div>
        <div className="p-3 bg-white/5 rounded-xl">
          <Icon className="w-6 h-6 text-white/70" />
        </div>
      </div>
    </div>
  )
}

const timeOptions = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' }
]

export default function DashboardPage() {
  const { profile, loading } = useUserStore()
  const [timeView, setTimeView] = useState('weekly')

  if (loading) return <Loading />

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="p-3 pb-24 lg:pb-6 lg:p-4"
    >
      {/* Contenedor principal más ancho */}
      <div className="bg-white/[0.08] backdrop-blur-2xl border border-white/20 rounded-2xl">
        {/* Header Section */}
        <div className="p-5 lg:p-6 border-b border-white/10">
          <div className="max-w-3xl">
            <h1 className="text-2xl font-semibold text-white">Overview</h1>
            <p className="text-white/60 mt-1">
              Here&apos;s an overview of your habit statistics and progress tracking
            </p>
          </div>
        </div>

        <div className="p-5 lg:p-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 lg:mb-8">
            {/* Total Record Card */}
            <div className="bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-sm border border-white/10 rounded-xl p-5 min-h-[200px] transition-colors">
              <div className="flex flex-col items-center text-center h-full justify-between py-2">
                {/* Círculo exterior */}
                <div className="relative w-20 h-20 rounded-full bg-white/[0.08] flex items-center justify-center">
                  {/* Ícono grande */}
                  <BarChart3 className="w-8 h-8 text-white/90" />
                  {/* Círculo decorativo */}
                  <div className="absolute inset-0 border border-white/10 rounded-full" />
                </div>
                <div className="mt-auto">
                  <h3 className="text-2xl lg:text-3xl font-semibold text-white">2.3k</h3>
                  <span className="text-sm lg:text-base font-medium text-white/60 block mt-1">Total Record</span>
                  <div className="flex items-center justify-center gap-1.5 mt-3">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-medium text-emerald-500">+16.05%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Approve Card */}
            <div className="bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-sm border border-white/10 rounded-xl p-5 min-h-[200px] transition-colors">
              <div className="flex flex-col items-center text-center h-full justify-between py-2">
                {/* Círculo exterior */}
                <div className="relative w-20 h-20 rounded-full bg-white/[0.08] flex items-center justify-center">
                  {/* Ícono grande */}
                  <CheckCircle className="w-8 h-8 text-white/90" />
                  {/* Círculo decorativo */}
                  <div className="absolute inset-0 border border-white/10 rounded-full" />
                </div>
                <div className="mt-auto">
                  <h3 className="text-2xl lg:text-3xl font-semibold text-white">823</h3>
                  <span className="text-sm lg:text-base font-medium text-white/60 block mt-1">Total Approve</span>
                  <div className="flex items-center justify-center gap-1.5 mt-3">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-medium text-emerald-500">+28.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Time Selector y Habits Grid */}
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="bg-white/10 rounded-xl p-1 flex gap-1">
                {timeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTimeView(option.value)}
                    className={cn(
                      "px-8 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      timeView === option.value
                        ? "bg-white/15 text-white"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Habit Cards con el mismo estilo */}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 