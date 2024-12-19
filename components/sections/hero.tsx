"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Spline from '@splinetool/react-spline';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/80 to-zinc-950" />
      
      {/* Spline Background */}
      <div className="absolute -inset-x-[40%] inset-y-0 z-0 opacity-75">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent z-10" />
        <Spline
          scene="https://prod.spline.design/DEYoTQIT8vvzeCoV/scene.splinecode"
          className="w-full h-full scale-[1.75]"
        />
      </div>
      
      <div className="container relative mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <div className="px-4 py-1 rounded-full border border-primary/20 bg-primary/10 text-sm mb-6">
                Your Journey to Better Habits Starts Here
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70"
            >
              Transform Your Life,
              <br />
              One Habit at a Time
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto"
            >
              Build lasting habits that stick with our science-backed approach. Track, analyze,
              and improve your daily routines effortlessly.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4"
            >
              <Link
                href="#features"
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:opacity-90 transition-opacity"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="#dashboard"
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                View Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          {/* Feature Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16"
          >
            {[
              { title: "Track Daily", desc: "Monitor your habits with ease" },
              { title: "Stay Motivated", desc: "Achieve goals with community support" },
              { title: "See Progress", desc: "Visualize your improvement journey" },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + (i * 0.1), duration: 0.8 }}
                viewport={{ once: true }}
                className="relative group p-6 rounded-xl border border-primary/10 bg-primary/5 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}