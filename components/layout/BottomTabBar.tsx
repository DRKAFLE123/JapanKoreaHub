'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  Home as HomeIcon,
  BookOpen as LearnIcon,
  Shield as VisaIcon,
  User as ProfileIcon,
  Plus,
  Briefcase,
  Home,
  Search,
  LogIn,
  BarChart2,
  Moon,
  Sun
} from 'lucide-react';
import { useCountry } from '@/lib/context/CountryContext';
import { useTheme } from '@/lib/context/ThemeContext';
import PostModal from '@/components/community/PostModal';
import PhoneVerificationModal from '@/components/community/PhoneVerificationModal';
import AuthSheet from '@/components/auth/AuthSheet';
import { useBodyScrollLock } from '@/lib/useBodyScrollLock';

interface BottomTabBarProps {
  user?: { name: string; email: string } | null;
}

export default function BottomTabBar({ user: propUser }: BottomTabBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { activeCountry } = useCountry();
  const { isDark, toggleTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  useBodyScrollLock(menuOpen || profileMenuOpen);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [postType, setPostType] = useState<'JOB' | 'ROOM'>('JOB');
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [authSheetOpen, setAuthSheetOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');

  // User & verification state
  const [user, setUser] = useState<{ name: string; email: string } | null>(propUser || null);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState('');

  useEffect(() => {
    if (propUser) {
      setUser(propUser);
    } else {
      const savedUser = localStorage.getItem('jkh_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {}
      }
    }
  }, [propUser]);

  useEffect(() => {
    if (user?.email) {
      const verified = localStorage.getItem(`jkh_phone_verified_${user.email}`);
      const phone = localStorage.getItem(`jkh_user_phone_${user.email}`);
      if (verified === 'true') {
        setIsPhoneVerified(true);
        setVerifiedPhone(phone || '');
      }
    }
  }, [user]);

  // Close drop-up menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setProfileMenuOpen(false);
  }, [pathname]);

  const getHref = (key: string) => {
    if (key === 'home') return activeCountry === 'japan' ? '/japan' : activeCountry === 'korea' ? '/korea' : '/';
    if (key === 'learn') return activeCountry === 'japan' ? '/japan/learn' : activeCountry === 'korea' ? '/korea/learn' : '/learn';
    if (key === 'visa') return activeCountry === 'japan' ? '/japan/visa' : activeCountry === 'korea' ? '/korea/visa' : '/visa';
    return '/profile';
  };

  const isActive = (href: string) => {
    if (href === '/' || href === '/japan' || href === '/korea') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const openAuth = (mode: 'signin' | 'register') => {
    setAuthMode(mode);
    setProfileMenuOpen(false);
    setMenuOpen(false);
    setAuthSheetOpen(true);
  };

  const handleTriggerPost = (type: 'JOB' | 'ROOM') => {
    setMenuOpen(false);
    if (!user) {
      openAuth('signin');
      return;
    }
    if (!isPhoneVerified) {
      setPostType(type);
      setPhoneModalOpen(true);
      return;
    }
    setPostType(type);
    setPostModalOpen(true);
  };

  const handleNavigate = (path: string) => {
    setMenuOpen(false);
    router.push(path);
  };

  const targetCountry = activeCountry === 'korea' ? 'korea' : 'japan';

  return (
    <>
      {/* Backdrop overlay for Speed-Dial Post Drop-up */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          onTouchMove={(e) => e.preventDefault()}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 md:hidden animate-fade-in transition-opacity touch-none"
        />
      )}

      {/* Backdrop overlay for Profile Drop-up */}
      {profileMenuOpen && (
        <div
          onClick={() => setProfileMenuOpen(false)}
          onTouchMove={(e) => e.preventDefault()}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden animate-fade-in transition-opacity touch-none"
        />
      )}

      {/* Speed-Dial Drop-up Menu (Center Post Button) */}
      {menuOpen && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[90%] max-w-xs bg-white rounded-3xl p-3 shadow-2xl border border-slate-200 z-50 md:hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="text-center pb-2 mb-2 border-b border-slate-100">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              Community Hub Actions
            </span>
          </div>

          <div className="space-y-1.5">
            {/* 1. Post Job */}
            <button
              type="button"
              onClick={() => handleTriggerPost('JOB')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100/80 active:bg-indigo-200/80 text-indigo-900 transition-colors cursor-pointer text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold flex items-center justify-between">
                  <span>Post a Job</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-200/70 text-indigo-800">
                    Vacancy
                  </span>
                </div>
                <p className="text-[10px] text-indigo-600/80 truncate">
                  Part-time, SSW, Factory & Store jobs
                </p>
              </div>
            </button>

            {/* 2. Post Room */}
            <button
              type="button"
              onClick={() => handleTriggerPost('ROOM')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-purple-50 hover:bg-purple-100/80 active:bg-purple-200/80 text-purple-900 transition-colors cursor-pointer text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                <Home className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold flex items-center justify-between">
                  <span>Post a Room</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-200/70 text-purple-800">
                    Housing
                  </span>
                </div>
                <p className="text-[10px] text-purple-600/80 truncate">
                  Apartment, Sharehouse, Goshiwon
                </p>
              </div>
            </button>

            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {/* 3. Find Job */}
              <button
                type="button"
                onClick={() => handleNavigate(`/${targetCountry}/jobs`)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer text-left"
              >
                <Search className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="truncate">Find Job</span>
              </button>

              {/* 4. Find Room */}
              <button
                type="button"
                onClick={() => handleNavigate(`/${targetCountry}/rooms`)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer text-left"
              >
                <Search className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span className="truncate">Find Room</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Drop-Up Menu (Bottom Right) */}
      {profileMenuOpen && (
        <div className="fixed bottom-16 right-2 sm:right-4 w-64 max-w-[calc(100vw-16px)] bg-white rounded-2xl p-2.5 shadow-2xl border border-slate-200 z-50 md:hidden animate-in fade-in slide-in-from-bottom-3 duration-200 text-xs font-sans">
          {user ? (
            <>
              {/* User Profile Info Card */}
              <div className="p-3 bg-gradient-to-br from-slate-50 to-indigo-50/50 border border-slate-200/80 rounded-xl mb-1.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-rose-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-slate-900 text-xs truncate">{user.name}</div>
                  <div className="text-[10px] text-slate-500 truncate">{user.email}</div>
                </div>
              </div>

              {/* Navigation Actions */}
              <div className="space-y-0.5 py-1">
                <Link
                  href="/profile"
                  onClick={() => setProfileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 font-bold transition-colors"
                >
                  <ProfileIcon className="w-4 h-4 text-slate-500" />
                  <span>My Profile</span>
                </Link>

                <Link
                  href="/dashboard"
                  onClick={() => setProfileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 font-bold transition-colors"
                >
                  <BarChart2 className="w-4 h-4 text-indigo-500" />
                  <span>My Progress</span>
                </Link>

                {/* Dark Mode Toggle */}
                <button
                  type="button"
                  onClick={() => toggleTheme()}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 font-bold transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2.5">
                    {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-600" />}
                    <span>Dark Mode</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      isDark ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isDark ? 'ON' : 'OFF'}
                  </span>
                </button>
              </div>

              {/* Sign Out Button */}
              <div className="border-t border-slate-100 my-1 pt-1">
                <button
                  onClick={async () => {
                    setProfileMenuOpen(false);
                    try {
                      await fetch('/api/auth/logout', { method: 'POST' });
                    } catch {}
                    localStorage.removeItem('jkh_user');
                    setUser(null);
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
            <div className="p-1 space-y-1">
              <div className="px-2.5 py-2 border-b border-slate-100 mb-1">
                <p className="text-xs font-bold text-slate-900">Welcome to JapanKoreaHub</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Sign in to sync your progress & post listings</p>
              </div>
              <button
                type="button"
                onClick={() => openAuth('signin')}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-slate-600" />
                Sign in
              </button>
              <button
                type="button"
                onClick={() => openAuth('register')}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                <ProfileIcon className="w-4 h-4 text-white" />
                Create Account
              </button>
            </div>
          )}
        </div>
      )}

      {/* Bottom Tab Bar with Raised Center '+' */}
      <nav className="bottom-tab-bar md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 relative flex items-center justify-between px-2">
        {/* Tab 1: Home */}
        <Link
          href={getHref('home')}
          className="flex flex-col items-center justify-center flex-1 py-2 gap-0.5 transition-colors relative"
        >
          <HomeIcon
            className={`w-[22px] h-[22px] transition-colors ${
              isActive(getHref('home'))
                ? activeCountry === 'japan' ? 'text-red-600' : activeCountry === 'korea' ? 'text-blue-600' : 'text-slate-900'
                : 'text-slate-400'
            }`}
            strokeWidth={isActive(getHref('home')) ? 2.5 : 1.8}
          />
          <span className={`text-[10px] transition-colors ${
            isActive(getHref('home')) ? 'text-slate-900 font-bold' : 'text-slate-400 font-medium'
          }`}>
            Home
          </span>
          {isActive(getHref('home')) && (
            <span className={`absolute bottom-0 w-8 h-0.5 rounded-full ${
              activeCountry === 'japan' ? 'bg-red-600' : activeCountry === 'korea' ? 'bg-blue-600' : 'bg-slate-900'
            }`} />
          )}
        </Link>

        {/* Tab 2: Learn */}
        <Link
          href={getHref('learn')}
          className="flex flex-col items-center justify-center flex-1 py-2 gap-0.5 transition-colors relative"
        >
          <LearnIcon
            className={`w-[22px] h-[22px] transition-colors ${
              isActive(getHref('learn'))
                ? activeCountry === 'japan' ? 'text-red-600' : activeCountry === 'korea' ? 'text-blue-600' : 'text-slate-900'
                : 'text-slate-400'
            }`}
            strokeWidth={isActive(getHref('learn')) ? 2.5 : 1.8}
          />
          <span className={`text-[10px] transition-colors ${
            isActive(getHref('learn')) ? 'text-slate-900 font-bold' : 'text-slate-400 font-medium'
          }`}>
            Learn
          </span>
          {isActive(getHref('learn')) && (
            <span className={`absolute bottom-0 w-8 h-0.5 rounded-full ${
              activeCountry === 'japan' ? 'bg-red-600' : activeCountry === 'korea' ? 'bg-blue-600' : 'bg-slate-900'
            }`} />
          )}
        </Link>

        {/* Tab 3: CENTER '+' RAISED BUTTON */}
        <div className="flex flex-col items-center justify-center flex-1 relative -top-3">
          <button
            type="button"
            onClick={() => {
              setProfileMenuOpen(false);
              setMenuOpen(!menuOpen);
            }}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer ${
              menuOpen
                ? 'bg-slate-900 text-white rotate-45 scale-105 shadow-slate-900/30'
                : 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white hover:scale-105 shadow-indigo-600/35 active:scale-95'
            }`}
            aria-label="Post Job or Room"
          >
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </button>
          <span className="text-[10px] font-bold text-slate-700 mt-0.5">
            Post
          </span>
        </div>

        {/* Tab 4: Visa */}
        <Link
          href={getHref('visa')}
          className="flex flex-col items-center justify-center flex-1 py-2 gap-0.5 transition-colors relative"
        >
          <VisaIcon
            className={`w-[22px] h-[22px] transition-colors ${
              isActive(getHref('visa'))
                ? activeCountry === 'japan' ? 'text-red-600' : activeCountry === 'korea' ? 'text-blue-600' : 'text-slate-900'
                : 'text-slate-400'
            }`}
            strokeWidth={isActive(getHref('visa')) ? 2.5 : 1.8}
          />
          <span className={`text-[10px] transition-colors ${
            isActive(getHref('visa')) ? 'text-slate-900 font-bold' : 'text-slate-400 font-medium'
          }`}>
            Visa
          </span>
          {isActive(getHref('visa')) && (
            <span className={`absolute bottom-0 w-8 h-0.5 rounded-full ${
              activeCountry === 'japan' ? 'bg-red-600' : activeCountry === 'korea' ? 'bg-blue-600' : 'bg-slate-900'
            }`} />
          )}
        </Link>

        {/* Tab 5: Profile (Drop-Up Trigger) */}
        <button
          type="button"
          onClick={() => {
            setMenuOpen(false);
            setProfileMenuOpen(prev => !prev);
          }}
          className="flex flex-col items-center justify-center flex-1 py-2 gap-0.5 transition-colors relative cursor-pointer"
          aria-label="User Profile and Account"
        >
          {user ? (
            <div
              className={`w-[22px] h-[22px] rounded-full bg-rose-600 text-white font-black text-[10px] flex items-center justify-center shadow-xs transition-transform ${
                profileMenuOpen ? 'scale-110 ring-2 ring-rose-400' : ''
              }`}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
          ) : (
            <ProfileIcon
              className={`w-[22px] h-[22px] transition-colors ${
                isActive('/profile') || profileMenuOpen
                  ? activeCountry === 'japan' ? 'text-red-600' : activeCountry === 'korea' ? 'text-blue-600' : 'text-slate-900'
                  : 'text-slate-400'
              }`}
              strokeWidth={isActive('/profile') || profileMenuOpen ? 2.5 : 1.8}
            />
          )}
          <span
            className={`text-[10px] transition-colors ${
              isActive('/profile') || profileMenuOpen ? 'text-slate-900 font-bold' : 'text-slate-400 font-medium'
            }`}
          >
            Profile
          </span>
          {(isActive('/profile') || profileMenuOpen) && (
            <span
              className={`absolute bottom-0 w-8 h-0.5 rounded-full ${
                activeCountry === 'japan' ? 'bg-red-600' : activeCountry === 'korea' ? 'bg-blue-600' : 'bg-slate-900'
              }`}
            />
          )}
        </button>
      </nav>

      {/* Integrated Post Modal */}
      {postModalOpen && (
        <PostModal
          key={`${targetCountry}-${postType}`}
          isOpen={postModalOpen}
          onClose={() => setPostModalOpen(false)}
          defaultType={postType}
          defaultCountry={targetCountry}
          defaultFreeService={true}
          user={user}
          onRequireAuth={() => openAuth('signin')}
          onRequirePhoneVerification={() => setPhoneModalOpen(true)}
          isPhoneVerified={isPhoneVerified}
          verifiedPhone={verifiedPhone}
          onPostCreated={() => {
            setPostModalOpen(false);
            if (postType === 'JOB') {
              router.push(`/${targetCountry}/jobs`);
            } else {
              router.push(`/${targetCountry}/rooms`);
            }
          }}
        />
      )}

      {/* Phone Verification Modal */}
      {phoneModalOpen && (
        <PhoneVerificationModal
          isOpen={phoneModalOpen}
          onClose={() => setPhoneModalOpen(false)}
          onVerified={(phone) => {
            setIsPhoneVerified(true);
            setVerifiedPhone(phone);
            setPhoneModalOpen(false);
            setPostModalOpen(true);
          }}
        />
      )}

      {/* Auth Sheet */}
      {authSheetOpen && (
        <AuthSheet
          initialMode={authMode}
          onClose={() => setAuthSheetOpen(false)}
        />
      )}
    </>
  );
}
