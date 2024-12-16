"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function CTA() {
  return (
    <section id="cta" className="relative py-32 pb-0 bg-zinc-950 overflow-hidden">
      {/* Rejilla con gradiente radial */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#09090b_100%)] z-0" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#ffffff15_0%,transparent_60%)]" />
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
              href="#features"
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
          <div className="relative rounded-t-2xl overflow-hidden backdrop-blur-sm border border-white/20 bg-black/40 shadow-2xl border-b-0">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-6 py-4 bg-white/10 border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500" />
                <div className="w-4 h-4 rounded-full bg-yellow-500" />
                <div className="w-4 h-4 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-base text-white/80 font-mono">~/1habit-app</span>
              </div>
            </div>
            
            {/* Terminal Content */}
            <div className="p-12 space-y-8">
              {/* Command Input */}
              <div className="text-center">
                <div className="font-mono text-lg text-white/90">$ show-dashboard --weekly</div>
              </div>

              {/* Dashboard Grid */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-sm text-white/80 mb-2">Daily Streak</div>
                  <div className="text-2xl font-bold text-white">7 Days</div>
                  <div className="h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div className="h-full w-[70%] bg-emerald-500 rounded-full" />
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-sm text-white/80 mb-2">Completion Rate</div>
                  <div className="text-2xl font-bold text-white">92%</div>
                  <div className="h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div className="h-full w-[92%] bg-blue-500 rounded-full" />
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-sm text-white/80 mb-2">Focus Time</div>
                  <div className="text-2xl font-bold text-white">2.5h</div>
                  <div className="h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div className="h-full w-[85%] bg-purple-500 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Progress Graph */}
              <div className="p-6 rounded-lg bg-black/40 border border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-sm text-white">Weekly Progress</div>
                  <div className="text-sm text-emerald-400">+23% vs last week</div>
                </div>
                <div className="relative h-40">
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[100, 75, 50, 25, 0].map((tick) => (
                      <div key={tick} className="w-full border-t border-white/10 relative">
                        <span className="absolute right-full pr-2 text-xs text-white/40">{tick}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="relative h-full flex items-end justify-between gap-2">
                    {[
                      { day: 'M', value: 40, label: '4 habits' },
                      { day: 'T', value: 65, label: '6 habits' },
                      { day: 'W', value: 45, label: '5 habits' },
                      { day: 'T', value: 80, label: '8 habits' },
                      { day: 'F', value: 75, label: '7 habits' },
                      { day: 'S', value: 90, label: '9 habits' },
                      { day: 'S', value: 85, label: '8 habits' }
                    ].map((item, i) => (
                      <div key={i} className="w-full group relative">
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-white/20 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {item.label}
                        </div>
                        <div 
                          className="bg-blue-500 rounded-sm transition-all group-hover:bg-blue-400"
                          style={{ height: `${item.value}%` }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                          <div className="text-xs text-white/60 mt-2 -mb-6">
                            {item.day}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-8 text-sm">
                  <div className="text-white/80">Total: 47 habits completed</div>
                  <div className="text-emerald-400">Best day: Saturday (9)</div>
                </div>
              </div>

              {/* Command Output */}
              <div className="space-y-3 text-center">
                <div className="font-mono text-lg text-emerald-400">
                  [✓] Weekly report generated successfully
                </div>
                <div className="font-mono text-lg text-white/90">
                  → Best streak this week: 7 days
                </div>
                <div className="font-mono text-lg text-blue-400">
                  📈 Overall improvement: +15% from last week
                </div>
              </div>
            </div>
          </div>
          {/* Bottom fade effect */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}