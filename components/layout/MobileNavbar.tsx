'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, LogIn, X, ChevronDown, User, Bell } from 'lucide-react';
import AuthSheet from '@/components/auth/AuthSheet';
import MobileDrawer from '@/components/layout/MobileDrawer';

import { useCountry } from '@/lib/context/CountryContext';
import NotificationBell from '@/components/notifications/NotificationBell';
import LanguageDropdown from '@/components/layout/LanguageDropdown';

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
        <div className="flex items-center justify-between h-full px-2.5 sm:px-3 gap-1.5">

          {/* Left — Hamburger + Logo */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setDrawerOpen(true)}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="JapanKoreaHub Logo" className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-contain" />
            </Link>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1 shrink-0 ml-auto">
            {/* Interactive Notification Bell */}
            <NotificationBell />

            {/* Search icon */}
            <button
              onClick={onSearchOpen}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* 3-Way Language Toggle Dropdown */}
            <LanguageDropdown />

            {/* Sign In / User Profile button */}
            <div className="relative" ref={dropdownRef}>
              {user ? (
                <button
                  onClick={() => setDropdownOpen(v => !v)}
                  className="w-8 h-8 rounded-full bg-rose-600 text-white font-black text-xs flex items-center justify-center shadow-xs cursor-pointer hover:bg-rose-700 transition-colors"
                  aria-label="User Profile Menu"
                >
                  {user.name.charAt(0).toUpperCase()}
                </button>
              ) : (
                <button
                  onClick={() => setDropdownOpen(v => !v)}
                  className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-400 transition-colors cursor-pointer"
                >
                  <span className="hidden sm:inline">Sign in</span>
                  <span className="sm:hidden">Sign in</span>
                  <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
              )}

              {/* Profile Dropdown Popover */}
              {dropdownOpen && (
                <div className="fixed top-14 right-2 w-56 max-w-[calc(100vw-16px)] sm:absolute sm:top-full sm:right-0 sm:mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in text-xs font-sans">
                  {user ? (
                    <>
                      <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl mb-1 space-y-0.5">
                        <div className="font-bold text-slate-900 text-xs truncate">{user.name}</div>
                        <div className="text-[10px] text-slate-500 truncate">{user.email}</div>
                      </div>

                      <div className="space-y-0.5 py-1">
                        <Link
                          href="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 font-bold transition-colors"
                        >
                          <User className="w-4 h-4 text-slate-500" />
                          <span>My Profile</span>
                        </Link>
                      </div>

                      <div className="border-t border-slate-100 my-1 pt-1">
                        <button
                          onClick={async () => {
                            setDropdownOpen(false);
                            try {
                              await fetch('/api/auth/logout', { method: 'POST' });
                            } catch {}
                            localStorage.removeItem('jkh_user');
                            window.location.href = '/';
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold transition-colors cursor-pointer text-left"
                        >
                          <LogIn className="w-4 h-4 text-rose-600" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => openAuth('signin')}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-50 rounded-xl transition-colors"
                      >
                        <LogIn className="w-4 h-4 text-slate-500" />
                        Sign in
                      </button>
                      <button
                        onClick={() => openAuth('register')}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-50 rounded-xl transition-colors border-t border-slate-100"
                      >
                        <User className="w-4 h-4 text-slate-500" />
                        Register
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
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
