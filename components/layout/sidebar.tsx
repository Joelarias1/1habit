'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Target, 
  Calendar, 
  BarChart2, 
  Settings,
  LogOut,
  Trophy,
  User
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    description: 'Overview of your habits'
  },
  {
    title: 'My Habits',
    icon: Target,
    href: '/habits',
    description: 'Manage your daily habits'
  },
  {
    title: 'Calendar',
    icon: Calendar,
    href: '/calendar',
    description: 'Track your progress'
  },
  {
    title: 'Analytics',
    icon: BarChart2,
    href: '/analytics',
    description: 'Insights and stats'
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user } = useAuth();

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="p-6 h-screen hidden lg:flex items-start">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-[240px] rounded-2xl bg-black/40 backdrop-blur-xl border border-white/[0.08] shadow-xl flex flex-col h-[96vh]"
      >
        {/* Logo */}
        <div className="p-4">
          <Link href="/dashboard" className="flex items-center gap-2 px-2">
            <div className="p-1 bg-black/30 rounded-xl">
              <Image
                src="/assets/img/logo-1habit.png"
                alt="1habit Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
            <span className="font-semibold text-white/90">1habit</span>
          </Link>
        </div>

        {/* User Profile */}
        <div className="px-4 py-2">
          <div className="p-3 rounded-xl bg-black/20 border border-white/[0.08] flex items-center gap-3">
            <div className="relative">
              {user?.user_metadata?.avatar_url ? (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt="User Avatar"
                  width={36}
                  height={36}
                  className="rounded-lg"
                />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium">
                  {user?.email?.[0].toUpperCase() || '?'}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-xs text-white/60 truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Menu principal */}
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-start gap-3 px-3 py-3 rounded-xl transition-all relative group ${
                    pathname === item.href
                      ? 'bg-white/[0.08] text-white'
                      : 'text-white/60 hover:bg-white/[0.04] hover:text-white/90'
                  }`}
                >
                  <div className={`shrink-0 p-1.5 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-white/10'
                      : 'bg-black/30 group-hover:bg-black/50'
                  }`}>
                    <item.icon className="w-[18px] h-[18px] opacity-80" />
                  </div>
                  <div className="flex flex-col py-0.5">
                    <span className="text-sm font-medium leading-none mb-1">{item.title}</span>
                    <span className="text-xs text-white/40 leading-tight">{item.description}</span>
                  </div>
                  {pathname === item.href && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 top-0 bottom-0 w-1 my-1 bg-white/40 rounded-r"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Botón de cerrar sesión */}
        <div className="p-3">
          <button className="flex items-center gap-3 w-full px-3 py-2.5 text-white/60 hover:text-white/90 hover:bg-white/[0.04] rounded-xl transition-all text-sm font-medium group">
            <div className="p-1.5 rounded-lg bg-black/30 group-hover:bg-black/50">
              <LogOut className="w-[18px] h-[18px] opacity-80" />
            </div>
            <span>Sign Out</span>
          </button>
        </div>
      </motion.div>
    </div>
  );

  // Mobile Navigation
  const MobileNav = () => (
    <>
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-black/40 backdrop-blur-xl border-b border-white/[0.08] flex items-center px-4 lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src="/assets/img/logo-1habit.png"
            alt="1habit Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="font-semibold text-white/90">1habit</span>
        </Link>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-black/40 backdrop-blur-xl border-t border-white/[0.08] lg:hidden">
        <nav className="h-full px-6">
          <ul className="h-full flex items-center justify-between">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center gap-1 min-w-[3rem] transition-all ${
                    pathname === item.href
                      ? 'text-white'
                      : 'text-white/60 hover:text-white/90'
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-colors ${
                    pathname === item.href
                      ? 'bg-white/10'
                      : ''
                  }`}>
                    <item.icon className="w-[20px] h-[20px]" />
                  </div>
                  <span className="text-[10px] font-medium">{item.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="flex flex-col items-center gap-1 min-w-[3rem]"
              >
                <div className="relative p-2 rounded-xl">
                  {user?.user_metadata?.avatar_url ? (
                    <Image
                      src={user.user_metadata.avatar_url}
                      alt="Profile"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-medium">
                      {user?.email?.[0].toUpperCase() || '?'}
                    </div>
                  )}
                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-black" />
                </div>
                <span className="text-[10px] font-medium text-white/60">Profile</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Profile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileMenu(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed bottom-20 right-4 w-48 bg-black/40 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-2 z-50 lg:hidden"
            >
              <div className="space-y-1">
                <Link
                  href="/settings"
                  className="flex items-center gap-2 w-full p-2 text-white/60 hover:text-white/90 hover:bg-white/[0.04] rounded-xl text-sm"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
                <button className="flex items-center gap-2 w-full p-2 text-white/60 hover:text-white/90 hover:bg-white/[0.04] rounded-xl text-sm">
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileNav />
    </>
  );
} 