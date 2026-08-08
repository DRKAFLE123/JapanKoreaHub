'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Globe, ChevronDown, User, LogIn, Menu } from 'lucide-react';
import AuthSheet from '@/components/auth/AuthSheet';

interface DesktopHeaderProps {
  user?: { name: string; email: string } | null;
  onSearchOpen: () => void;
  lang: 'en' | 'ne';
  onLangToggle: () => void;
  onMenuToggle?: () => void;
}

export default function DesktopHeader({ user, onSearchOpen, lang, onLangToggle, onMenuToggle }: DesktopHeaderProps) {
  const [authSheetOpen, setAuthSheetOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');

  const openAuth = (mode: 'signin' | 'register') => {
    setAuthMode(mode);
    setAuthSheetOpen(true);
  };

  return (
    <>
      <header className="hidden md:flex fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-6 flex-1">
          {onMenuToggle && (
            <button onClick={onMenuToggle} className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100">
              <Menu className="w-5 h-5" />
            </button>
          )}
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="JapanKoreaHub" className="w-8 h-8 rounded-lg object-contain" />
            <span className="font-bold text-lg text-gray-900 tracking-tight">JapanKoreaHub</span>
          </Link>
          
          {/* Global Search Bar (Fake Input) */}
          <button
            onClick={onSearchOpen}
            className="flex items-center gap-3 px-4 py-2 w-full max-w-sm bg-gray-100 hover:bg-gray-200 text-gray-500 text-sm rounded-full transition-colors border border-transparent focus:border-gray-300 focus:bg-white focus:outline-none"
          >
            <Search className="w-4 h-4" />
            <span className="flex-1 text-left">Search lessons, visas, jobs...</span>
            <span className="hidden lg:inline-block px-2 py-0.5 text-xs font-semibold bg-white border border-gray-200 rounded text-gray-400">⌘K</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Main Nav Links (Optional, maybe specific links) */}
          <nav className="hidden lg:flex items-center gap-6 mr-4 text-sm font-medium text-gray-600">
            <Link href="/japan" className="hover:text-gray-900 transition-colors">Japan</Link>
            <Link href="/korea" className="hover:text-gray-900 transition-colors">Korea</Link>
            <Link href="/consultancy" className="hover:text-gray-900 transition-colors">Consultancy</Link>
          </nav>

          {/* Lang Toggle */}
          <button onClick={onLangToggle} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Globe className="w-4 h-4 text-gray-400" />
            {lang === 'en' ? 'EN' : 'ने'}
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          <div className="w-px h-6 bg-gray-200 mx-1"></div>

          {/* Auth */}
          {user ? (
            <Link href="/profile" className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden xl:inline-block">{user.name}</span>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuth('signin')}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => openAuth('register')}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-colors"
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      {authSheetOpen && (
        <AuthSheet
          initialMode={authMode}
          onClose={() => setAuthSheetOpen(false)}
        />
      )}
    </>
  );
}
