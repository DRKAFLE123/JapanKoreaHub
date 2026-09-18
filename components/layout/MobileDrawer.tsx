'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Home, BookOpen, ClipboardList, GraduationCap, Briefcase, Shield, Globe, Bell, FileText, Handshake, User, LogIn, BarChart2, Building } from 'lucide-react';
import { useCountry } from '@/lib/context/CountryContext';

interface MobileDrawerProps {
  onClose: () => void;
  user?: { name: string; email: string } | null;
  onAuthOpen: (mode: 'signin' | 'register') => void;
}

export default function MobileDrawer({ onClose, user, onAuthOpen }: MobileDrawerProps) {
  const pathname = usePathname();
  const { activeCountry, setCountryFocus } = useCountry();

  const getScopedHref = (key: string) => {
    if (key === 'home') return activeCountry === 'japan' ? '/japan' : activeCountry === 'korea' ? '/korea' : '/';
    if (activeCountry === 'japan') return `/japan/${key}`;
    if (activeCountry === 'korea') return `/korea/${key}`;
    return `/${key}`;
  };

  // Exact Master Sequence: Home → Learn → Mock Test → Visa → Rooms → Jobs → Life → Progress
  const navItems = [
    { key: 'home',         label: 'Home',         href: getScopedHref('home'),     Icon: Home },
    { key: 'learn',        label: 'Learn',        href: getScopedHref('learn'),    Icon: BookOpen },
    { key: 'exams',        label: 'Mock Test',    href: getScopedHref('exams'),    Icon: ClipboardList },
    { key: 'visa',         label: 'Visa',         href: getScopedHref('visa'),     Icon: Shield },
    { key: 'rooms',        label: 'Rooms',        href: getScopedHref('rooms'),    Icon: Building },
    { key: 'jobs',         label: 'Jobs',         href: getScopedHref('jobs'),     Icon: Briefcase },
    { key: 'life',         label: 'Life',         href: getScopedHref('life'),     Icon: Globe },
    { key: 'dashboard',    label: 'Progress',     href: '/dashboard',             Icon: BarChart2 },
    { key: 'notices',      label: 'Notices',      href: '/notices',               Icon: Bell },
    { key: 'blog',         label: 'Blog',         href: '/blog',                  Icon: FileText },
    { key: 'consultancy',  label: 'Consultancy',  href: '/consultancy',           Icon: Handshake },
  ];


  const isActive = (href: string) => {
    if (href === '/' || href === '/japan' || href === '/korea') {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 left-0 bottom-0 z-50 w-[82vw] max-w-xs bg-white shadow-2xl animate-slide-left flex flex-col"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="JapanKoreaHub" className="w-7 h-7 rounded-lg object-contain" />
            <span className="font-bold text-sm text-gray-900">Japan Korea Hub</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Country Focus Switcher Card inside Mobile Drawer */}
        <div className="p-3 border-b border-gray-100 bg-slate-50">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1.5 px-1">Active Platform Hub</p>
          <div className="grid grid-cols-2 gap-1 bg-gray-200/80 p-1 rounded-xl">
            <button
              onClick={() => { setCountryFocus('japan'); onClose(); }}
              className={`py-1.5 px-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeCountry === 'japan' ? 'bg-red-600 text-white shadow-xs' : 'text-gray-700 hover:bg-white/60'
              }`}
            >
              🇯🇵 Japan Hub
            </button>
            <button
              onClick={() => { setCountryFocus('korea'); onClose(); }}
              className={`py-1.5 px-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeCountry === 'korea' ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-700 hover:bg-white/60'
              }`}
            >
              🇰🇷 Korea Hub
            </button>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-1">
          {navItems.map(({ key, href, label, Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={key}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 px-5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? activeCountry === 'japan' ? 'bg-red-50 text-red-700 font-bold' : activeCountry === 'korea' ? 'bg-blue-50 text-blue-700 font-bold' : 'bg-gray-100 text-gray-900 font-bold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${
                  active
                    ? activeCountry === 'japan' ? 'text-red-600' : activeCountry === 'korea' ? 'text-blue-600' : 'text-gray-900'
                    : 'text-gray-500'
                }`} />
                {label}
              </Link>
            );
          })}

          {/* Quick Access Korea Guides & KIIP */}
          {(activeCountry === 'korea' || activeCountry === 'all') && (
            <div className="mt-3 pt-3 border-t border-gray-100 px-4 space-y-1.5">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-wider px-1">🇰🇷 Featured Guides &amp; KIIP</p>
              <Link
                href="/korea/exams/kiip"
                onClick={onClose}
                className="flex items-center gap-2 p-2 rounded-xl bg-blue-50/60 hover:bg-blue-100/70 text-blue-900 text-xs font-bold transition-colors"
              >
                <span>🏛️ KIIP (사회통합) Full Guide</span>
              </Link>
              <Link
                href="/blog/kiip-korea-immigration-integration-program-nepali-guide"
                onClick={onClose}
                className="flex items-center gap-2 p-2 rounded-xl bg-indigo-50/60 hover:bg-indigo-100/70 text-indigo-900 text-xs font-bold transition-colors"
              >
                <span>📜 TOPIK vs KIIP Nepali Guide</span>
              </Link>
              <Link
                href="/blog/topik-ii-level-3-6-month-strategy-nepali-guide"
                onClick={onClose}
                className="flex items-center gap-2 p-2 rounded-xl bg-amber-50/60 hover:bg-amber-100/70 text-amber-900 text-xs font-bold transition-colors"
              >
                <span>🚀 6-Month TOPIK II Strategy</span>
              </Link>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-100 px-5 py-3 space-y-2">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => { onAuthOpen('signin'); onClose(); }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
              >
                <LogIn className="w-4 h-4" /> Sign in
              </button>
              <button
                onClick={() => { onAuthOpen('register'); onClose(); }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-900 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
              >
                <User className="w-4 h-4" /> Register
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
