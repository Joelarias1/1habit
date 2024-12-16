"use client";

import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/services";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";
import { Mission } from "@/components/sections/mission";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <Features />
        <Mission />
        <CTA />
        <Footer />
      </main>
    </>
  );
}