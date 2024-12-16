"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function CTA() {
  return (
    <section id="contact" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-muted to-background" />
      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-conic from-primary via-secondary to-primary blur-2xl opacity-20" />
            <h2 className="relative text-4xl font-bold">
              Ready to Build Something Amazing?
            </h2>
          </div>
          <p className="text-xl text-muted-foreground mb-8">
            Let's transform your vision into reality. Get in touch with us today.
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-primary-foreground bg-gradient-to-r from-primary to-secondary rounded-full hover:opacity-90 transition-opacity"
          >
            Start Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}