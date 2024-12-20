import Link from 'next/link';
import Image from 'next/image';
import { GithubIcon, MessageSquare, Heart } from "lucide-react";

const footerLinks = {
  product: {
    title: 'Product',
    links: [
      { name: 'Features', href: '#features' },
      { name: 'Mission', href: '#mission' },
      { name: 'Join Us', href: '#join' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { name: 'GitHub', href: 'https://github.com/Joelarias1/1habit' },
      { name: 'Contact', href: 'mailto:contact@1habit.app' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { name: 'About', href: '#mission' },
      { name: 'Contact', href: 'mailto:contact@1habit.app' },
      { name: 'GitHub', href: 'https://github.com/Joelarias1/1habit' },
      { name: 'Terms & Privacy', href: '/terms' },
    ],
  },
};

export function Footer() {
  return (
    <footer className="relative bg-zinc-900 border-t border-zinc-800">
      <div className="container relative mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/assets/img/logo-1habit.png"
                alt="1habit Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-2xl font-bold tracking-tight text-white">1habit</span>
            </Link>
            <p className="mt-4 text-sm text-zinc-400">
              Transform your daily routines into lasting habits. AI-powered habit tracking and formation for personal growth.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="https://github.com/Joelarias1/1habit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 text-white/70 hover:bg-zinc-700 hover:text-white transition-all border border-zinc-700 hover:border-zinc-600"
                aria-label="GitHub"
              >
                <GithubIcon className="h-4 w-4" />
                <span className="text-sm font-medium">GitHub</span>
              </Link>
              <Link
                href="mailto:contact@1habit.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 text-white/70 hover:bg-zinc-700 hover:text-white transition-all border border-zinc-700 hover:border-zinc-600"
                aria-label="Contact"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm font-medium">Contact</span>
              </Link>
            </div>
          </div>

          {/* Enlaces */}
          <div className="md:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {Object.values(footerLinks).map((section) => (
                <div key={section.title}>
                  <h3 className="text-white font-medium mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-zinc-400 hover:text-white transition-colors"
                          {...(link.href.startsWith('http') || link.href.startsWith('mailto') ? {
                            target: '_blank',
                            rel: 'noopener noreferrer'
                          } : {})}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-zinc-400">
              © {new Date().getFullYear()} 1habit. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span>by</span>
              <Link
                href="https://github.com/joelarias1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
              >
                @joelarias1
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 