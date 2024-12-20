import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export const quotes = [
  {
    text: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu"
  },
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle"
  },
  {
    text: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier"
  },
  {
    text: "Your future is created by what you do today, not tomorrow.",
    author: "Robert Kiyosaki"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    text: "The difference between ordinary and extraordinary is that little extra.",
    author: "Jimmy Johnson"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker"
  },
  {
    text: "Small daily improvements are the key to staggering long-term results.",
    author: "Anonymous"
  },
  {
    text: "Dreams don't work unless you do.",
    author: "John C. Maxwell"
  },
  {
    text: "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Anonymous"
  }
]

export function QuoteDisplay() {
  const [quote, setQuote] = useState(quotes[0])

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative hidden lg:flex flex-col bg-muted text-white dark:border-r h-full"
    >
      {/* Fondo base */}
      <div className="absolute inset-0 bg-zinc-900" />
      
      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-[0.15]">
        {/* Patrón de puntos */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
        {/* Patrón de líneas */}
        <div className="absolute inset-0 rotate-45" 
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />
      </div>
      
      {/* Gradiente superior para el logo */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-transparent z-10" />
      
      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative z-20 p-8"
      >
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="/assets/img/logo-1habit.png"
            alt="1habit Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="font-bold tracking-tight">1habit</span>
        </Link>
      </motion.div>

      {/* Frase centrada con estilo sutil */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative z-20 flex flex-1 items-center justify-center px-12"
      >
        <div className="relative max-w-2xl">
          <motion.blockquote 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="relative space-y-6"
          >
            <p className="text-4xl md:text-5xl font-light leading-relaxed text-white font-['Playfair_Display'] text-center tracking-normal">
              &ldquo;{quote.text}&rdquo;
            </p>
            <footer className="text-center mt-8 flex flex-col items-center">
              <div className="w-16 h-[1px] bg-white/20 mb-4"></div>
              <span className="text-lg text-white/90 font-['Cormorant_Garamond'] tracking-wide">
                {quote.author}
              </span>
              <div className="w-16 h-[1px] bg-white/20 mt-4"></div>
            </footer>
          </motion.blockquote>
        </div>
      </motion.div>
    </motion.div>
  )
} 