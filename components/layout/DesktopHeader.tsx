'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Globe,
  ChevronDown,
  User,
  LogIn,
  Menu,
  BookOpen,
  Clock,
  Briefcase,
  Shield,
  Moon,
  Sun,
  ArrowRight,
  Home,
  BarChart2,
  Plus,
  MessageSquare
} from 'lucide-react';
import AuthSheet from '@/components/auth/AuthSheet';
import DirectMessageDrawer from '@/components/community/DirectMessageDrawer';
import PostModal from '@/components/community/PostModal';
import PhoneVerificationModal from '@/components/community/PhoneVerificationModal';
import { useCountry } from '@/lib/context/CountryContext';
import { useTheme } from '@/lib/context/ThemeContext';
import NotificationBell from '@/components/notifications/NotificationBell';
import LanguageDropdown from '@/components/layout/LanguageDropdown';
import PlatformMessageIcon from '@/components/icons/PlatformMessageIcon';

interface DesktopHeaderProps {
  user?: { name: string; email: string } | null;
  onSearchOpen: () => void;
  lang: 'en' | 'ne';
  onLangToggle: () => void;
  onMenuToggle?: () => void;
}

const JAPAN_DROPDOWN = [
  { label: 'Learn Japanese', href: '/japan/learn', icon: BookOpen, desc: 'Minna no Nihongo & Kanji' },
  { label: 'JLPT N5–N2', href: '/japan/exams/jlpt-n5', icon: Clock, desc: 'Exam simulator' },
  { label: 'Visa Guide', href: '/japan/visa', icon: Shield, desc: 'Student, SSW & Work Visas' },
  { label: 'Rooms & Housing', href: '/japan/rooms', icon: Home, desc: 'Apartments & Sharehouses' },
  { label: 'Jobs & Careers', href: '/japan/jobs', icon: Briefcase, desc: 'Part-time & SSW Visas' },
  { label: 'Life & Culture in Japan', href: '/japan/life', icon: Globe, desc: 'Cost of living, housing & etiquette' },
];

const KOREA_DROPDOWN = [
  { label: 'Learn Korean', href: '/korea/learn', icon: BookOpen, desc: 'Hangul & EPS 1–60' },
  { label: 'EPS-TOPIK', href: '/korea/exams/eps-topik', icon: Clock, desc: 'Official CBT simulator' },
  { label: 'Visa Guide', href: '/korea/visa', icon: Shield, desc: 'E-9, E-7 & Study Visas' },
  { label: 'Rooms & Housing', href: '/korea/rooms', icon: Home, desc: 'Goshiwon & One-Room' },
  { label: 'Jobs & Careers', href: '/korea/jobs', icon: Briefcase, desc: 'Student Alba & E-9 Jobs' },
  { label: 'Life & Culture in Korea', href: '/korea/life', icon: Globe, desc: 'Rent, living costs & customs' },
];

export default function DesktopHeader({ user, onSearchOpen, lang, onLangToggle, onMenuToggle }: DesktopHeaderProps) {
  const router = useRouter();
  const [authSheetOpen, setAuthSheetOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const { activeCountry } = useCountry();
  const { isDark, toggleTheme } = useTheme();

  const [openDropdown, setOpenDropdown] = useState<'japan' | 'korea' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Post dropdown & modals
  const [postDropdownOpen, setPostDropdownOpen] = useState(false);
  const postDropdownRef = useRef<HTMLDivElement>(null);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [postType, setPostType] = useState<'JOB' | 'ROOM'>('JOB');
  const [messageDrawerOpen, setMessageDrawerOpen] = useState(false);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState('');

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (postDropdownRef.current && !postDropdownRef.current.contains(e.target as Node)) {
        setPostDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openAuth = (mode: 'signin' | 'register') => {
    setAuthMode(mode);
    setAuthSheetOpen(true);
  };

  const handleTriggerPost = (type: 'JOB' | 'ROOM') => {
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

  const targetCountry = activeCountry === 'korea' ? 'korea' : 'japan';

  return (
    <>
      <header className="hidden md:flex fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 items-center justify-between px-5 lg:px-7 text-slate-900 shadow-xs">
        {/* Left: Brand + Search Bar + Quick Post Action */}
        <div className="flex items-center gap-4 flex-1">
          {onMenuToggle && (
            <button onClick={onMenuToggle} className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100">
              <Menu className="w-5 h-5" />
            </button>
          )}
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo.png" alt="JapanKoreaHub" className="w-8 h-8 rounded-lg object-contain" />
            <span className="font-bold text-base lg:text-lg text-slate-900 tracking-tight">JapanKoreaHub</span>
          </Link>
          
          {/* Global Search Bar */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onSearchOpen();
            }}
            className="flex items-center gap-3 px-4 py-2 w-full max-w-xs lg:max-w-sm bg-slate-100 hover:bg-slate-200/80 text-slate-500 text-xs sm:text-sm rounded-full transition-colors border border-slate-200 focus:border-slate-400 focus:outline-none cursor-pointer"
          >
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="flex-1 text-left truncate">Search lessons, visas, jobs...</span>
            <span className="hidden lg:inline-block px-2 py-0.5 text-[10px] font-semibold bg-white border border-slate-200 rounded text-slate-400">⌘K</span>
          </button>

          {/* "+ Post" Button right next to search */}
          <div className="relative" ref={postDropdownRef}>
            <button
              type="button"
              onClick={() => setPostDropdownOpen(!postDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 active:bg-black text-white text-xs font-bold transition-all shadow-xs hover:shadow cursor-pointer shrink-0"
              title="Post Job or Room"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${postDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {postDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 z-50 animate-fade-in text-xs">
                <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                  Create Listing
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPostDropdownOpen(false);
                    handleTriggerPost('JOB');
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 font-bold transition-colors cursor-pointer text-left"
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Post a Job Opening</div>
                    <div className="text-[10px] text-slate-400 font-normal">Part-time, SSW, Factory</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPostDropdownOpen(false);
                    handleTriggerPost('ROOM');
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-slate-700 hover:bg-purple-50 hover:text-purple-700 font-bold transition-colors cursor-pointer text-left"
                >
                  <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                    <Home className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Post a Room / Housing</div>
                    <div className="text-[10px] text-slate-400 font-normal">Apartments, Sharehouse</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Toolbar: Managed cleanly with compact spacing (LinkedIn-Style) */}
        <div className="flex items-center gap-1.5 lg:gap-2.5" ref={dropdownRef}>
          <nav 
            className="hidden xl:flex items-center gap-1 text-sm font-medium text-slate-600"
            onMouseLeave={() => setOpenDropdown(null)}
          >
            {/* Japan Hub Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'japan' ? null : 'japan')}
                onMouseEnter={() => setOpenDropdown('japan')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer text-xs font-bold ${
                  openDropdown === 'japan' ? 'bg-red-50 text-red-700' : 'hover:text-slate-900 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>🇯🇵 Japan</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'japan' ? 'rotate-180 text-red-600' : 'text-slate-400'}`} />
              </button>

              {openDropdown === 'japan' && (
                <div
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-fade-in"
                >
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-[10px] font-black text-red-600 uppercase tracking-wider">Japan Ecosystem</p>
                  </div>
                  {JAPAN_DROPDOWN.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50/60 transition-colors group"
                    >
                      <item.icon className="w-4 h-4 text-slate-400 group-hover:text-red-600 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-red-700">{item.label}</p>
                        <p className="text-[10px] text-slate-400">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Korea Hub Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'korea' ? null : 'korea')}
                onMouseEnter={() => setOpenDropdown('korea')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer text-xs font-bold ${
                  openDropdown === 'korea' ? 'bg-blue-50 text-blue-700' : 'hover:text-slate-900 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>🇰🇷 Korea</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'korea' ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>

              {openDropdown === 'korea' && (
                <div
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-fade-in"
                >
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-wider">Korea Ecosystem</p>
                  </div>
                  {KOREA_DROPDOWN.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-50/60 transition-colors group"
                    >
                      <item.icon className="w-4 h-4 text-slate-400 group-hover:text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700">{item.label}</p>
                        <p className="text-[10px] text-slate-400">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Rooms & Jobs shortcuts */}
            <Link
              href={activeCountry === 'korea' ? '/korea/rooms' : '/japan/rooms'}
              className="px-2.5 py-1.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-xs font-bold transition-colors"
            >
              Rooms
            </Link>
            <Link
              href={activeCountry === 'korea' ? '/korea/jobs' : '/japan/jobs'}
              className="px-2.5 py-1.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-xs font-bold transition-colors"
            >
              Jobs
            </Link>
          </nav>

          {/* Consult Now CTA */}
          <div className="relative group/consult shrink-0">
            <Link
              href="/consultancy"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-xs font-bold transition-all duration-200 shadow-sm shadow-emerald-500/20 hover:shadow-emerald-500/30 cursor-pointer"
            >
              <span>Consult Now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/consult:translate-x-0.5 transition-transform duration-200" />
            </Link>

            {/* Hover card */}
            <div className="absolute top-full right-0 mt-2 w-56 pointer-events-none
              opacity-0 translate-y-1 group-hover/consult:opacity-100 group-hover/consult:translate-y-0
              transition-all duration-200 ease-out z-50">
              <div className="bg-white border border-indigo-100 rounded-2xl shadow-xl p-3.5">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-wider">Free</span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-wider">15 min</span>
                </div>
                <p className="text-xs font-black text-slate-900 mb-1 leading-snug">
                  Free 15-minutes consultation from expert
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"/>
                  Japan &amp; Korea visa experts
                </div>
              </div>
            </div>
          </div>

          {/* 3-Way Language Dropdown Selector */}
          <LanguageDropdown />

          {/* Interactive Notification Bell */}
          <NotificationBell />

          {/* 💬 Platform Messages Icon */}
          <button
            type="button"
            onClick={() => {
              if (!user) {
                openAuth('signin');
                return;
              }
              setMessageDrawerOpen(true);
            }}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer relative flex items-center justify-center shrink-0"
            title="Messaging & Inquiries"
          >
            <PlatformMessageIcon className="w-5 h-5" />
          </button>

          <div className="w-px h-5 bg-slate-200 mx-0.5 shrink-0" />

          {/* User Profile: LinkedIn-Style Icon-Only with 'Me ▾' */}
          {user ? (
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex flex-col items-center justify-center px-1.5 py-1 rounded-xl hover:bg-slate-100 transition-all cursor-pointer group shrink-0"
                title={user.name}
              >
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex items-center gap-0.5 mt-0.5">
                  <span className="text-[10px] font-semibold text-slate-600 group-hover:text-slate-900 leading-none">
                    Me
                  </span>
                  <ChevronDown className={`w-2.5 h-2.5 text-slate-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-fade-in text-xs font-sans">
                  <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl mb-1 space-y-0.5">
                    <div className="font-bold text-slate-900 text-sm truncate">{user.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                  </div>

                  <div className="space-y-0.5 py-1">
                    <Link
                      href="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 font-bold transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-500" />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      href="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 font-bold transition-colors"
                    >
                      <BarChart2 className="w-4 h-4 text-indigo-500" />
                      <span>My Progress</span>
                    </Link>

                    {/* Dark Mode Toggle Button */}
                    <button
                      type="button"
                      onClick={() => toggleTheme()}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 font-bold transition-colors cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-600" />}
                        <span>Dark Mode</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        isDark ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {isDark ? 'ON' : 'OFF'}
                      </span>
                    </button>
                  </div>

                  <div className="border-t border-slate-200 my-1 pt-1">
                    <button
                      onClick={async () => {
                        setProfileDropdownOpen(false);
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
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => openAuth('signin')}
                className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                Log in
              </button>
              <button
                onClick={() => openAuth('register')}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-full transition-colors cursor-pointer shadow-xs"
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Direct Messaging Drawer */}
      {messageDrawerOpen && (
        <DirectMessageDrawer
          isOpen={messageDrawerOpen}
          onClose={() => setMessageDrawerOpen(false)}
          user={user}
          onRequireAuth={() => openAuth('signin')}
        />
      )}

      {/* Integrated Post Modal */}
      {postModalOpen && (
        <PostModal
          key={`desktop-${targetCountry}-${postType}`}
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
