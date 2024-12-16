"use client";

import { Calendar, Target, Bell, TrendingUp, Users, Award } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Habit Tracking",
    description: "Smart tracking system that adapts to your routine, making habit formation effortless.",
    icon: Calendar,
  },
  {
    title: "Goal Setting",
    description: "Powerful goal-setting framework backed by behavioral science.",
    icon: Target,
  },
  {
    title: "Smart Reminders",
    description: "AI-powered notifications that know the perfect time to remind you.",
    icon: Bell,
  },
  {
    title: "Analytics",
    description: "Deep insights into your habits with beautiful, actionable visualizations.",
    icon: TrendingUp,
  },
  {
    title: "Community",
    description: "Connect with like-minded people who inspire and motivate you.",
    icon: Users,
  },
  {
    title: "Achievements",
    description: "Gamified system that celebrates your progress and consistency.",
    icon: Award,
  },
];

export function Features() {
  return (
    <section className="relative py-32 bg-zinc-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container relative mx-auto px-4">
        <div className="space-y-4 mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white/70 font-mono"
          >
            {'// FEATURES'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white"
          >
            The tools you need to build better habits.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/70 text-lg max-w-3xl"
          >
            With years of research in behavioral psychology, we&apos;ve crafted the perfect set of features to help you succeed.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-8 rounded-3xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 h-full backdrop-blur-sm transition-colors">
                <feature.icon className="h-8 w-8 mb-4 text-white/80" />
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}