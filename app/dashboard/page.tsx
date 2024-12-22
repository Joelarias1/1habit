'use client'

import { useUserStore } from '@/store/userStore'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, CheckCircle, Sparkles, Clock, Calendar, BarChart2, Trophy, ChevronLeft, ChevronRight, Bell, Megaphone } from 'lucide-react'
import { Loading } from '@/components/ui/loading'
import { cn } from '@/lib/utils'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import 'react-circular-progressbar/dist/styles.css'
import useEmblaCarousel from 'embla-carousel-react'

const timeOptions = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' }
]

// Datos del gráfico con más puntos para una curva más suave
const data = [
  { time: '6am', value: 40 },
  { time: '7am', value: 35 },
  { time: '8am', value: 32 },
  { time: '9am', value: 30 },
  { time: '10am', value: 25 },
  { time: '11am', value: 22 },
  { time: '12pm', value: 20 },
  { time: '1pm', value: 22 },
  { time: '2pm', value: 24 },
  { time: '3pm', value: 25 },
  { time: '4pm', value: 20 },
  { time: '5pm', value: 17 },
  { time: '6pm', value: 15 },
  { time: '7pm', value: 25 },
  { time: '8pm', value: 35 },
  { time: '9pm', value: 40 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-xl shadow-2xl">
        <p className="text-white/80 text-xs font-medium mb-1">{label}</p>
        <p className="text-white text-2xl font-bold">{payload[0].value}</p>
      </div>
    )
  }
  return null
}

// Componente de Card Stats mejorado
const StatCard = ({ title, value, change, icon: Icon }: any) => (
  <div className="bg-white/[0.05] backdrop-blur-lg border border-white/10 rounded-xl p-4 hover:bg-white/[0.08] transition-all group relative overflow-hidden">
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="absolute inset-0 bg-gradient-to-r from-white/[0.07] to-transparent blur-xl" />
    </div>
    
    <div className="relative flex justify-between items-start">
      <div>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-white/[0.07]">
            <Icon className="w-4 h-4 text-white/70" />
          </div>
          <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors">{title}</p>
        </div>
        <h3 className="text-3xl font-bold text-white mt-3">{value}</h3>
        <div className="flex items-center gap-1 mt-2">
          <span className="text-white/90 text-sm font-medium">+{change}%</span>
          <span className="text-white/50 text-xs">vs last week</span>
        </div>
      </div>
      <div className="w-16 h-16 transition-transform group-hover:scale-110">
        <CircularProgressbar
          value={change}
          strokeWidth={8}
          styles={buildStyles({
            pathColor: 'rgba(255, 255, 255, 0.9)',
            trailColor: 'rgba(255, 255, 255, 0.1)',
          })}
        />
      </div>
    </div>
  </div>
)

// Componente para el Banner de Noticias simplificado
const NewsBanner = () => (
  <div className="bg-gradient-to-r from-white/[0.07] to-white/[0.03] backdrop-blur-lg border border-white/10 rounded-2xl p-4 mb-6">
    <div className="flex items-center gap-4">
      <div className="shrink-0 p-2.5 bg-white/10 rounded-xl">
        <Bell className="w-5 h-5 text-white/80" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white/80 text-sm">
          <span className="font-medium">New:</span> Share your achievements and connect with other users!
        </p>
      </div>
      <button className="shrink-0 px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white text-xs font-medium rounded-lg transition-colors">
        Learn more
      </button>
    </div>
  </div>
)

// Componente de Features simplificado
const FeaturesCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    skipSnaps: false,
  })

  const features = [
    {
      title: "Daily Tracking",
      description: "Track your daily habits progress",
      icon: Calendar
    },
    {
      title: "Analytics",
      description: "Visualize your improvement",
      icon: BarChart2
    },
    {
      title: "Achievements",
      description: "Unlock rewards and milestones",
      icon: Trophy
    }
  ]

  return (
    <div className="mb-6">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {features.map((feature, index) => (
            <div className="flex-[0_0_200px]" key={index}>
              <div className="bg-white/[0.05] backdrop-blur-lg border border-white/10 rounded-xl p-3 hover:bg-white/[0.08] transition-all">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <feature.icon className="w-4 h-4 text-white/80" />
                  </div>
                  <div>
                    <h3 className="text-white/90 text-sm font-medium">{feature.title}</h3>
                    <p className="text-white/50 text-xs">{feature.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

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
      <div className="max-w-7xl mx-auto space-y-6 pt-2 px-1 md:pt-3 md:px-2">
        {/* Banner de Noticias */}
        <NewsBanner />

        {/* Contenedor principal de stats y gráfico */}
        <div className="bg-white/[0.08] backdrop-blur-2xl border border-white/20 rounded-2xl">
          <div className="p-4 lg:p-5 border-b border-white/10">
            <div className="max-w-3xl">
              <h1 className="text-2xl font-semibold text-white">Overview</h1>
              <p className="text-white/60 mt-1">
                Here&apos;s an overview of your habit statistics and progress tracking
              </p>
            </div>
          </div>

          <div className="p-4 lg:p-5">
            {/* Features Carousel más compacto */}
            <FeaturesCarousel />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <StatCard
                      title="Total Record"
                      value="2.3k"
                      change={25}
                      icon={BarChart3}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <StatCard
                      title="Total Approve"
                      value="823"
                      change={28}
                      icon={CheckCircle}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="bg-white/[0.05] backdrop-blur-lg border border-white/10 rounded-xl p-4 hover:bg-white/[0.08] transition-all group relative overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/[0.07] to-transparent blur-xl" />
                      </div>
                      
                      <div className="relative flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-white/[0.07]">
                              <Sparkles className="w-4 h-4 text-white/70" />
                            </div>
                            <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors">Current Streak</p>
                          </div>
                          <div className="flex items-baseline gap-2 mt-3">
                            <h3 className="text-3xl font-bold text-white">7</h3>
                            <span className="text-lg text-white/90">days</span>
                          </div>
                          <div className="flex items-center gap-1 mt-2">
                            <span className="text-white/90 text-sm font-medium">+50%</span>
                            <span className="text-white/50 text-xs">vs last week</span>
                          </div>
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                            <span className="text-white/60 text-xs">Best:</span>
                            <span className="text-white/90 text-sm font-medium">14 days</span>
                          </div>
                        </div>
                        <div className="w-16 h-16 transition-transform group-hover:scale-110">
                          <CircularProgressbar
                            value={50}
                            strokeWidth={8}
                            styles={buildStyles({
                              pathColor: 'rgba(255, 255, 255, 0.9)',
                              trailColor: 'rgba(255, 255, 255, 0.1)',
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="bg-white/[0.05] backdrop-blur-lg border border-white/10 rounded-xl p-4 hover:bg-white/[0.08] transition-all group relative overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/[0.07] to-transparent blur-xl" />
                      </div>
                      
                      <div className="relative flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-white/[0.07]">
                              <Clock className="w-4 h-4 text-white/70" />
                            </div>
                            <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors">Time Invested</p>
                          </div>
                          <div className="flex items-baseline gap-2 mt-3">
                            <h3 className="text-3xl font-bold text-white">24.5</h3>
                            <span className="text-lg text-white/90">hrs</span>
                          </div>
                          <div className="flex items-center gap-1 mt-2">
                            <span className="text-white/90 text-sm font-medium">+15%</span>
                            <span className="text-white/50 text-xs">vs last week</span>
                          </div>
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                            <span className="text-white/60 text-xs">Daily Avg:</span>
                            <span className="text-white/90 text-sm font-medium">3.5 hrs</span>
                          </div>
                        </div>
                        <div className="w-16 h-16 transition-transform group-hover:scale-110">
                          <CircularProgressbar
                            value={15}
                            strokeWidth={8}
                            styles={buildStyles({
                              pathColor: 'rgba(255, 255, 255, 0.9)',
                              trailColor: 'rgba(255, 255, 255, 0.1)',
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="bg-white/[0.05] backdrop-blur-lg border border-white/10 rounded-xl p-4 lg:p-6 h-full">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h3 className="text-lg font-semibold text-white">Activity Overview</h3>
                    <div className="hidden md:block min-w-[280px] max-w-[320px]">
                      <div className="bg-white/[0.05] backdrop-blur-sm rounded-xl p-1 flex justify-between">
                        {timeOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setTimeView(option.value)}
                            className={cn(
                              "flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                              timeView === option.value
                                ? "bg-white/10 text-white border border-white/10"
                                : "text-white/70 hover:text-white/90 hover:bg-white/[0.05]"
                            )}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-[250px] sm:h-[300px] lg:h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart 
                        data={data}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
                            <stop offset="95%" stopColor="rgba(255,255,255,0.01)" />
                          </linearGradient>
                          <filter id="glow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                            <feMerge>
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>
                        <XAxis 
                          dataKey="time" 
                          stroke="rgba(255,255,255,0.1)"
                          tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                          dy={10}
                          interval={'preserveStartEnd'}
                        />
                        <YAxis 
                          stroke="rgba(255,255,255,0.1)"
                          tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                          dx={-10}
                        />
                        <Tooltip 
                          content={<CustomTooltip />}
                          cursor={{
                            stroke: 'rgba(255,255,255,0.2)',
                            strokeWidth: 1,
                            strokeDasharray: '4 4'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="rgba(255,255,255,0.9)"
                          strokeWidth={2}
                          fill="url(#areaGradient)"
                          dot={false}
                          activeDot={{
                            r: 6,
                            fill: 'rgba(255,255,255,1)',
                            stroke: 'rgba(255,255,255,0.2)',
                            strokeWidth: 3,
                            filter: 'url(#glow)'
                          }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 