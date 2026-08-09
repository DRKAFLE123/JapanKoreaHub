'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Home, BookOpen, ClipboardList, GraduationCap, Briefcase, Shield, Globe, Bell, FileText, Handshake, User, LogIn, BarChart2 } from 'lucide-react';
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

  const navItems = [
    { key: 'home',         label: 'Home',         href: getScopedHref('home'),     Icon: Home },
    { key: 'learn',        label: 'Learn',        href: getScopedHref('learn'),    Icon: BookOpen },
    { key: 'exams',        label: 'Mock Test',    href: getScopedHref('exams'),    Icon: ClipboardList },
    { key: 'study',        label: 'Study',        href: getScopedHref('study'),    Icon: GraduationCap },
    { key: 'work',         label: 'Work',         href: getScopedHref('work'),     Icon: Briefcase },
    { key: 'visa',         label: 'Visa',         href: getScopedHref('visa'),     Icon: Shield },
    { key: 'life',         label: 'Life',         href: getScopedHref('life'),     Icon: Globe },
    { key: 'dashboard',    label: 'Progress',     href: '/dashboard',             Icon: BarChart2 },
    { key: 'notices',      label: 'Notices',      href: '/notices',               Icon: Bell },
    { key: 'blog',         label: 'Blog',         href: '/blog',                  Icon: FileText },
    { key: 'consultancy',  label: 'Consultancy',  href: '/consultancy',           Icon: Handshake },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
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
          <div className="grid grid-cols-3 gap-1 bg-gray-200/70 p-1 rounded-xl">
            <button
              onClick={() => setCountryFocus('japan')}
              className={`py-1.5 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                activeCountry === 'japan' ? 'bg-red-600 text-white shadow-xs' : 'text-gray-600'
              }`}
            >
              🇯🇵 Japan
            </button>
            <button
              onClick={() => setCountryFocus('korea')}
              className={`py-1.5 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                activeCountry === 'korea' ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-600'
              }`}
            >
              🇰🇷 Korea
            </button>
            <button
              onClick={() => setCountryFocus('all')}
              className={`py-1.5 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                activeCountry === 'all' ? 'bg-gray-900 text-white shadow-xs' : 'text-gray-600'
              }`}
            >
              🌏 Both
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
