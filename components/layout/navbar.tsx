"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { GithubIcon, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { href: "#features", label: "Features" },
  { href: "#mission", label: "Mission" },
  { href: "#cta", label: "Join Us" },
];

const socialLinks = [
  { 
    href: "https://github.com/Joelarias1/1habit", 
    icon: (props: any) => (
      <GithubIcon {...props} fill="currentColor" />
    ), 
    label: "GitHub" 
  },
  { 
    href: "mailto:contact@1habit.app", 
    icon: (props: any) => (
      <MessageSquare {...props} fill="currentColor" />
    ), 
    label: "Email" 
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.slice(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navbarHeight = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsOpen(false);
    }
  };

  const getLinkClassName = (href: string) => {
    const isActive = activeSection === href.slice(1);
    return `text-sm font-medium transition-colors ${
      isActive 
        ? 'text-white' 
        : 'text-muted-foreground hover:text-foreground'
    }`;
  };

  const getMobileLinkClassName = (href: string) => {
    const isActive = activeSection === href.slice(1);
    return `text-lg font-medium transition-colors ${
      isActive 
        ? 'text-white' 
        : 'text-muted-foreground hover:text-foreground'
    }`;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl"
    >
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link 
          href="/" 
          onClick={(e) => handleScroll(e, '#top')}
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
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className={getLinkClassName(item.href)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="h-6 w-px bg-border/50" />

          <ul className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/60 dark:bg-white/10 text-black/70 dark:text-white/70 hover:bg-white/70 dark:hover:bg-white/20 transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center w-8 h-8 text-foreground hover:text-foreground/80 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-20 bg-background/80 backdrop-blur-xl border-b border-border/50"
          >
            <div className="container mx-auto px-4 py-8">
              <motion.ul 
                className="flex flex-col gap-6 mb-8"
                initial="closed"
                animate="open"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.1 }
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                  }
                }}
              >
                {navItems.map((item) => (
                  <motion.li 
                    key={item.href}
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: 20 }
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleScroll(e, item.href)}
                      className={getMobileLinkClassName(item.href)}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="h-px w-full bg-border/50 mb-8" />

              <motion.ul 
                className="flex items-center gap-3"
                initial="closed"
                animate="open"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                  }
                }}
              >
                {socialLinks.map((link) => (
                  <motion.li 
                    key={link.label}
                    variants={{
                      open: { opacity: 1, scale: 1 },
                      closed: { opacity: 0, scale: 0.3 }
                    }}
                  >
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/60 dark:bg-white/10 text-black/70 dark:text-white/70 hover:bg-white/70 dark:hover:bg-white/20 transition-colors"
                      aria-label={link.label}
                    >
                      <link.icon className="h-4 w-4" />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}