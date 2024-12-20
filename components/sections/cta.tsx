"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function CTA() {
  return (
    <section id="cta" className="relative pt-32 bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#09090b_100%)] z-10" />
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:24px_24px] w-full h-full"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, transparent 5%, rgba(9,9,11,0.5) 20%, black 30%, black 70%, rgba(9,9,11,0.5) 80%, transparent 95%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, transparent 5%, rgba(9,9,11,0.5) 20%, black 30%, black 70%, rgba(9,9,11,0.5) 80%, transparent 95%, transparent)'
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#ffffff15_0%,transparent_60%)]" />
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-zinc-950 via-zinc-950/50 to-transparent z-20" />
      </div>
      
      <div className="container relative mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-24"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-white/90 font-mono mb-4"
          >
            {'// BEGIN YOUR JOURNEY'}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Complete a 1 min form
              <br />
              and begin your journey.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Link
              href="/register"
              className="inline-flex items-center px-8 py-4 text-base font-medium bg-white text-black rounded-lg hover:bg-white/90 transition-colors shadow-lg"
            >
              GET STARTED
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Terminal Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative max-w-[90%] w-[1200px] mx-auto translate-y-24"
        >
          <DashboardCard />
        </motion.div>
      </div>
    </section>
  );
}

const DashboardCard = () => (
  <div className="relative w-full">
    {/* Terminal Window */}
    <div className="relative bg-zinc-900/80 rounded-xl border border-white/10 shadow-2xl backdrop-blur-sm overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-6 py-4 bg-black/20 border-b border-white/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-sm text-white/60 font-mono">1habit dashboard</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              title: "Daily Streak",
              value: "7",
              unit: "Days",
              progress: 75,
              color: "emerald"
            },
            {
              title: "Completion Rate",
              value: "92",
              unit: "%",
              progress: 92,
              color: "blue"
            },
            {
              title: "Focus Time",
              value: "2.5",
              unit: "Hours",
              progress: 66,
              color: "purple"
            }
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 rounded-lg border border-white/10 p-4 backdrop-blur-sm">
              <div className="text-sm text-white/60">{stat.title}</div>
              <div className="text-2xl font-bold text-white mt-1">{stat.value}</div>
              <div className="text-xs text-white/40 mb-3">{stat.unit}</div>
              <div className={`h-1 bg-${stat.color}-500/20 rounded-full overflow-hidden`}>
                <div 
                  className={`h-full bg-${stat.color}-500 rounded-full transition-all`}
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Progress Graph */}
        <div className="bg-black/20 rounded-lg border border-white/10 p-6 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-white/60">Weekly Progress</div>
            <div className="text-sm text-emerald-400">+23% vs last week</div>
          </div>
          
          {/* Graph content se mantiene igual pero con estilos actualizados */}
          {/* ... */}
        </div>

        {/* Status Messages */}
        <div className="space-y-2 text-center font-mono">
          <div className="text-emerald-400/90">✓ All habits tracked successfully</div>
          <div className="text-white/60">→ Current streak: 7 days</div>
          <div className="text-blue-400/90">↑ 15% improvement this week</div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)] animate-pulse" />
      </div>
    </div>

    {/* Terminal Reflection */}
    <div className="absolute -bottom-24 left-0 right-0 h-24 bg-gradient-to-b from-zinc-950/50 to-transparent blur-sm" />
  </div>
)