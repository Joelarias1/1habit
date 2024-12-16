"use client";

import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/services";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 sparkles">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="sparkle" />
        ))}
      </div>
      <Navbar />
      <main className="relative">
        <Hero />
        <Features />
        <CTA />
      </main>
    </>
  );
}