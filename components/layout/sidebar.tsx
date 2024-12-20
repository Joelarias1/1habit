'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { signOut } from '@/actions/auth'

interface Profile {
  email?: string;
  avatar_url?: string;
  full_name?: string;
}

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    description: 'Overview of your habits'
  },
  {
    title: 'Habits',
    mobileTitle: 'Habits',
    icon: Target,
    href: '/habits',
    description: 'Manage your daily habits'
  },
  {
    title: 'Calendar',
    icon: Calendar,
    href: '/calendar',
    description: 'Track your progress',
    disabled: true
  },
  {
    title: 'Analytics',
    icon: BarChart2,
    href: '/analytics',
    description: 'Insights and stats'
  },
  {
    title: 'Achievements',
    icon: Trophy,
    href: '/achievements',
    description: 'Your milestones and rewards',
    disabled: true
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, profile, setUser } = useUserStore();

  const handleSignOut = async () => {
    try {
      const { success } = await signOut()
      if (success) {
        useUserStore.getState().setUser(null)
        useUserStore.getState().setProfile(null)
        useUserStore.persist.clearStorage()
        router.push('/login')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setShowMobileMenu(false)
    }
  }

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="p-6 h-screen hidden lg:flex items-start">
      <div className="w-[240px] rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 flex flex-col h-[96vh]">
        {/* Logo */}
        <div className="p-4">
          <Link href="/dashboard" className="flex items-center gap-2 px-2">
            <div className="p-1.5 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20">
              <Image
                src="/assets/img/logo-1habit.png"
                alt="1habit Logo"
                width={28}
                height={28}
                className="w-7 h-7"
              />
            </div>
            <span className="font-semibold text-white/95">1habit</span>
          </Link>
        </div>

        {/* Menu principal */}
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.disabled ? '#' : item.href}
                  className={`flex items-start gap-3 px-3 py-3 rounded-xl transition-all relative group ${
                    pathname === item.href
                      ? 'bg-gradient-to-br from-white/15 to-white/5 text-white border border-white/20'
                      : 'text-white/70 hover:bg-white/[0.05] hover:text-white/90'
                  } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={e => item.disabled && e.preventDefault()}
                >
                  <div className={`shrink-0 p-2 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-gradient-to-br from-white/15 to-white/5 border border-white/20'
                      : 'bg-white/[0.05] group-hover:bg-white/[0.08]'
                  }`}>
                    <item.icon className="w-5 h-5 opacity-90" />
                  </div>
                  <div className="flex flex-col py-0.5">
                    <span className="text-sm font-medium leading-none mb-1">{item.title}</span>
                    <span className="text-xs text-white/50 leading-tight">{item.description}</span>
                  </div>
                  {pathname === item.href && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 top-0 bottom-0 w-1 my-1 bg-white/50 rounded-r"
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

        {/* Footer con perfil y logout */}
        <div className="p-3 space-y-2">
          {/* User Profile */}
          <div className="p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 flex items-center gap-3">
            <div className="relative">
              {profile?.avatar_url ? (
                <Image
                  src={profile.avatar_url}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center text-white font-medium">
                  {profile?.email?.[0].toUpperCase() || '?'}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black/80" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white/95 truncate">
                {profile?.full_name || 'Usuario'}
              </p>
              <p className="text-xs text-white/50 truncate">
                {profile?.email}
              </p>
            </div>
          </div>

          {/* Settings */}
          <Link
            href="/settings"
            className="flex items-center gap-3 w-full px-3 py-2.5 text-white/70 hover:text-white/90 hover:bg-white/[0.06] rounded-xl transition-all text-sm font-medium group"
          >
            <div className="p-2 rounded-lg bg-white/[0.05] group-hover:bg-white/[0.08]">
              <Settings className="w-5 h-5 opacity-90" />
            </div>
            <span>Settings</span>
          </Link>

          {/* Botón de cerrar sesión */}
          <button 
            onClick={handleSignOut} 
            className="flex items-center gap-3 w-full px-3 py-2.5 text-white/70 hover:text-white/90 hover:bg-white/[0.06] rounded-xl transition-all text-sm font-medium group"
          >
            <div className="p-2 rounded-lg bg-white/[0.05] group-hover:bg-white/[0.08]">
              <LogOut className="w-5 h-5 opacity-90" />
            </div>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Mobile Navigation
  const MobileNav = () => (
    <>
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-white/5 backdrop-blur-lg border-t border-white/20 lg:hidden">
        <nav className="h-full">
          <div className="h-full overflow-x-auto scrollbar-hide">
            <div className="h-full flex justify-start md:justify-center">
              <ul className="h-full flex items-center gap-8 px-8 min-w-max">
                <li className="w-12 shrink-0" aria-hidden="true" />
                {menuItems.map((item) => (
                  <li key={item.href} className="shrink-0">
                    <Link
                      href={item.disabled ? '#' : item.href}
                      className={`flex flex-col items-center gap-1 min-w-[4rem] transition-all ${
                        pathname === item.href
                          ? 'text-white'
                          : 'text-white/70 hover:text-white/90'
                      } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={e => item.disabled && e.preventDefault()}
                    >
                      <div className={`p-2 rounded-xl transition-colors ${
                        pathname === item.href
                          ? 'bg-gradient-to-br from-white/15 to-white/5 border border-white/20'
                          : 'hover:bg-white/[0.06]'
                      }`}>
                        <item.icon className="w-5 h-5 opacity-90" />
                      </div>
                      <span className="text-[10px] font-medium">{item.mobileTitle || item.title}</span>
                    </Link>
                  </li>
                ))}
                <li className="shrink-0">
                  <button
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className="flex flex-col items-center gap-1 min-w-[4rem]"
                  >
                    <div className="relative p-2 rounded-xl hover:bg-white/[0.06]">
                      {profile?.avatar_url ? (
                        <Image
                          src={profile.avatar_url}
                          alt="Profile"
                          width={20}
                          height={20}
                          className="rounded-lg w-5 h-5"
                        />
                      ) : (
                        <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center text-white text-[10px] font-medium">
                          {profile?.email?.[0].toUpperCase() || '?'}
                        </div>
                      )}
                      <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-black/80" />
                    </div>
                    <span className="text-[10px] font-medium text-white/70">Profile</span>
                  </button>
                </li>
                <li className="w-12 shrink-0" aria-hidden="true" />
              </ul>
            </div>
          </div>
        </nav>
      </div>

      {/* Profile Menu Overlay */}
      {showMobileMenu && (
        <>
          <div
            onClick={() => setShowMobileMenu(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
          />
          <div className="fixed bottom-20 right-4 w-48 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-2 z-50 lg:hidden">
            <div className="space-y-1">
              <Link
                href="/settings"
                className="flex items-center gap-2 w-full p-2 text-white/70 hover:text-white/90 hover:bg-white/[0.06] rounded-xl text-sm"
                onClick={() => setShowMobileMenu(false)}
              >
                <div className="p-2 rounded-lg bg-white/[0.05]">
                  <Settings className="w-5 h-5 opacity-90" />
                </div>
                <span>Settings</span>
              </Link>
              <button 
                onClick={handleSignOut} 
                className="flex items-center gap-2 w-full p-2 text-white/70 hover:text-white/90 hover:bg-white/[0.06] rounded-xl text-sm"
              >
                <div className="p-2 rounded-lg bg-white/[0.05]">
                  <LogOut className="w-5 h-5 opacity-90" />
                </div>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileNav />
    </>
  );
}