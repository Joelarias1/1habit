"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Track Your Habits",
    description: "Start with a simple chat. Tell us about your goals and current routines. No pressure, just honesty."
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "We analyze your patterns and create a custom roadmap for habit formation using advanced AI."
  },
  {
    number: "03",
    title: "Build & Adapt",
    description: "Time to build those habits. We provide feedback and adjust your plan as you progress."
  },
  {
    number: "04",
    title: "Transform",
    description: "Watch your new habits take root. We monitor your progress and optimize for long-term success."
  }
];

export function Mission() {
  return (
    <section id="mission" className="relative py-24 bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#09090b_100%)] z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#ffffff15_0%,transparent_60%)]" />
      </div>
      
      <div className="container relative mx-auto px-4 z-20">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="text-white/70 font-mono mb-4">
              {'// ONE HABIT ONCE®'}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Unique. Strategic. Timeless.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-16 relative"
          >
            <div className="absolute left-[7%] md:left-[2.5%] top-[40px] bottom-[40px] w-px bg-gradient-to-b from-white/20 via-white/20 to-transparent" />
            
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="grid grid-cols-12 gap-6 items-start relative"
              >
                <div className="absolute left-[7%] md:left-[2.5%] top-[10px] w-2 h-2 rounded-full bg-white/50 -translate-x-1/2" />
                
                <div className="col-span-2 md:col-span-1">
                  <span className="text-sm text-white/50 font-mono">{step.number}</span>
                </div>
                <div className="col-span-10 md:col-span-3">
                  <h3 className="text-xl font-medium text-white mb-1">
                    {step.title}
                  </h3>
                </div>
                <div className="col-span-10 col-start-3 md:col-span-7 md:col-start-5">
                  <p className="text-zinc-400">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 