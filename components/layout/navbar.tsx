"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { GithubIcon, MessageSquare } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "#features", label: "Features" },
  { href: "#mission", label: "Mission" },
  { href: "#join", label: "Join Us" },
];

const socialLinks = [
  { 
    href: "https://github.com/Joelarias1/1habit", 
    icon: GithubIcon,
    label: "GitHub" 
  },
  { 
    href: "mailto:contact@1habit.app", 
    icon: MessageSquare,
    label: "Contact" 
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // altura del navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-md md:from-black/30 md:to-black/20">
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link 
          href="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-tight"
        >
          <Image
            src="/assets/img/logo-1habit.png"
            alt="1habit Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          1habit
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="ml-auto flex items-center gap-8">
            <Link 
              href="/soon"
              className="px-4 py-2 rounded-lg bg-zinc-800 text-white text-sm font-medium transition-all hover:bg-zinc-700 hover:scale-105 active:scale-95 border border-zinc-700 hover:border-zinc-600"
            >
              Sign In
            </Link>

            <div className="h-6 w-px bg-white/20" />

            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800 text-white/70 hover:bg-zinc-700 hover:text-white transition-all border border-zinc-700 hover:border-zinc-600"
                >
                  <link.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-b border-white/10 bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-md">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="text-lg font-medium text-white/70 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="h-px w-full bg-white/20" />
              
              <Link 
                href="/soon"
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white text-sm font-medium transition-all hover:bg-zinc-700 active:scale-95 border border-zinc-700 hover:border-zinc-600"
              >
                Sign In
              </Link>

              <div className="flex justify-center gap-4">
                {socialLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 text-white/70 hover:bg-zinc-700 hover:text-white transition-all border border-zinc-700 hover:border-zinc-600"
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}