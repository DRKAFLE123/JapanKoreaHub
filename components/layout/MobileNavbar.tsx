'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, MessageSquare } from 'lucide-react';
import AuthSheet from '@/components/auth/AuthSheet';
import MobileDrawer from '@/components/layout/MobileDrawer';
import DirectMessageDrawer from '@/components/community/DirectMessageDrawer';
import NotificationBell from '@/components/notifications/NotificationBell';
import PlatformMessageIcon from '@/components/icons/PlatformMessageIcon';
import { useUnreadMessages } from '@/lib/useUnreadMessages';

interface MobileNavbarProps {
  user?: { name: string; email: string } | null;
  lang?: 'en' | 'ne';
  onLangToggle?: () => void;
  onSearchOpen: () => void;
}

export default function MobileNavbar({ user, onSearchOpen }: MobileNavbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authSheetOpen, setAuthSheetOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [messageDrawerOpen, setMessageDrawerOpen] = useState(false);
  const { unreadCount: unreadMessageCount } = useUnreadMessages(user);

  const openAuth = (mode: 'signin' | 'register') => {
    setAuthMode(mode);
    setAuthSheetOpen(true);
  };

  const lastSearchTriggerRef = React.useRef(0);
  const handleSearchTrigger = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastSearchTriggerRef.current < 400) return; // Prevent double-trigger from touch + click
    lastSearchTriggerRef.current = now;

    if (onSearchOpen) {
      try {
        onSearchOpen();
      } catch (err) {
        console.error('onSearchOpen failed:', err);
      }
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-global-search'));
    }
  };

  return (
    <>
      {/* Mobile Top Navbar */}
      <header
        className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 md:hidden text-slate-900 shadow-xs"
        style={{ height: 56 }}
      >
        <div className="flex items-center justify-between h-full px-2.5 sm:px-3 gap-2">
          {/* Left — Hamburger Menu + Logo */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setDrawerOpen(true)}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/" className="flex items-center shrink-0">
              <img
                src="/logo.png"
                alt="JapanKoreaHub Logo"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-contain"
              />
            </Link>
          </div>

          {/* Center — Long Search Bar Button */}
          <button
            type="button"
            onClick={handleSearchTrigger}
            className="flex-1 flex items-center gap-2 px-3 h-9 rounded-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-500 transition-all border border-slate-200 text-xs min-w-0 cursor-pointer shadow-xs touch-manipulation select-none active:scale-[0.99]"
            aria-label="Search lessons, visas, jobs, rooms"
          >
            <Search className="w-4 h-4 text-slate-400 shrink-0 pointer-events-none" />
            <span className="truncate text-slate-500 font-medium text-[11px] sm:text-xs pointer-events-none">
              Search lessons, jobs, rooms...
            </span>
          </button>

          {/* Right — Notification Bell & Direct Messaging Icon */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Interactive Notification Bell */}
            <NotificationBell />

            {/* Direct Message Icon */}
            <button
              type="button"
              onClick={() => {
                if (!user) {
                  openAuth('signin');
                  return;
                }
                setMessageDrawerOpen(true);
              }}
              className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer relative"
              aria-label="Messaging & Inquiries"
              title="Messaging & Inquiries"
            >
              <PlatformMessageIcon className="w-5 h-5" />
              {unreadMessageCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-black border-2 border-white min-w-[18px] text-center shadow-xs animate-pulse">
                  {unreadMessageCount > 9 ? '9+' : unreadMessageCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Drawer */}
      {drawerOpen && (
        <MobileDrawer
          onClose={() => setDrawerOpen(false)}
          user={user}
          onAuthOpen={openAuth}
        />
      )}

      {/* Direct Messaging Drawer */}
      <DirectMessageDrawer
        isOpen={messageDrawerOpen}
        onClose={() => setMessageDrawerOpen(false)}
        user={user}
        onRequireAuth={() => openAuth('signin')}
      />

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
