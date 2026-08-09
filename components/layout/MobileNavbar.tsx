'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, LogIn, X, ChevronDown, User, Bell } from 'lucide-react';
import AuthSheet from '@/components/auth/AuthSheet';
import MobileDrawer from '@/components/layout/MobileDrawer';

import { useCountry } from '@/lib/context/CountryContext';

interface MobileNavbarProps {
  user?: { name: string; email: string } | null;
  lang: 'en' | 'ne';
  onLangToggle: () => void;
  onSearchOpen: () => void;
}

export default function MobileNavbar({ user, lang, onLangToggle, onSearchOpen }: MobileNavbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authSheetOpen, setAuthSheetOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { activeCountry, setCountryFocus } = useCountry();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const openAuth = (mode: 'signin' | 'register') => {
    setAuthMode(mode);
    setDropdownOpen(false);
    setAuthSheetOpen(true);
  };

  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 md:hidden text-slate-900 shadow-xs"
        style={{ height: 56 }}>
        <div className="flex items-center justify-between h-full px-3 gap-2">

          {/* Left — Hamburger + Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setDrawerOpen(true)}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="JapanKoreaHub Logo" className="w-8 h-8 rounded-lg object-contain" />
            </Link>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Notification bell — only when logged in */}
            {user && (
              <Link
                href="/notices"
                className="relative w-8 h-8 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {/* Badge */}
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-600 rounded-full ring-2 ring-white" />
              </Link>
            )}

            {/* Search icon */}
            <button
              onClick={onSearchOpen}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* EN / ने toggle */}
            <button
              onClick={onLangToggle}
              className="flex items-center rounded-full overflow-hidden border border-slate-300 text-xs font-semibold cursor-pointer"
              style={{ height: 30 }}
            >
              <span className={`px-2.5 py-1 transition-colors ${lang === 'en' ? 'bg-red-600 text-white' : 'bg-transparent text-slate-500'}`}>
                EN
              </span>
              <span className={`px-2.5 py-1 transition-colors ${lang === 'ne' ? 'bg-red-600 text-white' : 'bg-transparent text-slate-500'}`}>
                ने
              </span>
            </button>

            {/* Sign In / User button */}
            {user ? (
              <Link href="/profile"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-rose-600 text-white font-bold text-sm">
                {user.name.charAt(0).toUpperCase()}
              </Link>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(v => !v)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:border-slate-400 transition-colors cursor-pointer"
                >
                  Sign in
                  <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden animate-fade-in z-50">
                    <button
                      onClick={() => openAuth('signin')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      <LogIn className="w-4 h-4 text-gray-500" />
                      Sign in
                    </button>
                    <button
                      onClick={() => openAuth('register')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors border-t border-gray-50"
                    >
                      <User className="w-4 h-4 text-gray-500" />
                      Register
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Drawer */}
      {drawerOpen && <MobileDrawer onClose={() => setDrawerOpen(false)} user={user} onAuthOpen={openAuth} />}

      {/* Auth sheet */}
      {authSheetOpen && (
        <AuthSheet
          initialMode={authMode}
          onClose={() => setAuthSheetOpen(false)}
        />
      )}
    </>
  );
}
