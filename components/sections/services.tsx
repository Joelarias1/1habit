"use client";

import { Calendar, Target, Bell, TrendingUp, Users, Award } from "lucide-react";
import { motion } from "framer-motion";

const StatusIndicator = ({ status }: { status: "in_development" | "on_roadmap" | "future" }) => {
  const styles = {
    in_development: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-500",
      dot: "bg-emerald-400",
      dotRing: "bg-emerald-500",
      label: "In development"
    },
    on_roadmap: {
      bg: "bg-orange-500/10",
      text: "text-orange-500",
      dot: "bg-orange-400",
      dotRing: "bg-orange-500",
      label: "On roadmap"
    },
    future: {
      bg: "bg-zinc-500/10",
      text: "text-zinc-400",
      dot: "bg-zinc-400",
      dotRing: "bg-zinc-500",
      label: "Future release"
    }
  };

  const style = styles[status];

  return (
    <div className={`flex items-center gap-1.5 px-2 py-1 ${style.bg} rounded-lg w-fit mb-4`}>
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full rounded-full ${style.dot} blur-[2px] animate-glow-soft`}></span>
        <span className={`absolute inline-flex h-full w-full rounded-full ${style.dot} blur-[4px] animate-glow-soft scale-150 opacity-50`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${style.dotRing} shadow-lg`}></span>
      </span>
      <span className={`text-[10px] uppercase tracking-wider ${style.text} font-medium`}>{style.label}</span>
    </div>
  );
};

const features = [
  {
    title: "Habit Tracking",
    description: "Smart tracking system that adapts to your routine, making habit formation effortless.",
    icon: Calendar,
    status: "in_development" as const
  },
  {
    title: "Analytics",
    description: "Deep insights into your habits with beautiful, actionable visualizations.",
    icon: TrendingUp,
    status: "in_development" as const
  },
  {
    title: "Goal Setting",
    description: "Powerful goal-setting framework backed by behavioral science.",
    icon: Target,
    status: "on_roadmap" as const
  },
  {
    title: "Smart Reminders",
    description: "AI-powered notifications that know the perfect time to remind you.",
    icon: Bell,
    status: "future" as const
  },
  {
    title: "Community",
    description: "Connect with like-minded people who inspire and motivate you.",
    icon: Users,
    status: "future" as const
  },
  {
    title: "Achievements",
    description: "Gamified system that celebrates your progress and consistency.",
    icon: Award,
    status: "future" as const
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-32 bg-zinc-950 overflow-hidden">
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
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent z-20" />
      </div>
      
      <div className="container relative mx-auto px-4 z-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4 mb-16 max-w-3xl"
          >
            <p className="text-white/70 font-mono">{'// FEATURES'}</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              The tools you need to build better habits.
            </h2>
            <p className="text-white/70 text-lg">
              With years of research in behavioral psychology, we&apos;ve crafted the perfect set of features to help you succeed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                viewport={{ once: true }}
                className="relative group rounded-xl border border-primary/10 bg-primary/5 p-6 backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  {feature.status && <StatusIndicator status={feature.status} />}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.05]">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white/30 text-sm">0{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}