'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen, GraduationCap, Briefcase, Shield,
  ChevronRight, Bell, ArrowRight, Flame
} from 'lucide-react';
import MobileNavbar from '@/components/layout/MobileNavbar';
import BottomTabBar from '@/components/layout/BottomTabBar';

/* ── Types ── */
interface User { name: string; email: string; streak?: number; }
interface Notice {
  id: string; title: string; category: string;
  country: string; isPinned: boolean; publishedAt: string;
  expiresAt?: string; sourceType: string;
}

/* ── Intent Grid ── */
const INTENT_ITEMS = [
  {
    href: '/learn', label: 'Learn', Icon: BookOpen,
    desc: 'Japanese and Korean lessons',
    color: 'text-indigo-600', bg: 'bg-indigo-50',
  },
  {
    href: '/study', label: 'Study', Icon: GraduationCap,
    desc: 'Universities, scholarships',
    color: 'text-emerald-600', bg: 'bg-emerald-50',
  },
  {
    href: '/work', label: 'Work', Icon: Briefcase,
    desc: 'EPS, SSW, job listings',
    color: 'text-amber-600', bg: 'bg-amber-50',
  },
  {
    href: '/visa', label: 'Visa', Icon: Shield,
    desc: 'Requirements, checklists',
    color: 'text-rose-600', bg: 'bg-rose-50',
  },
] as const;

/* ── Continue Learning data ── */
const CONTINUE_ITEMS = [
  { country: 'JAPAN', label: 'JLPT N5', progress: 42, color: 'bg-red-500', textColor: 'text-red-600', href: '/japan/exams/jlpt-n5' },
  { country: 'KOREA', label: 'EPS-TOPIK', progress: 28, color: 'bg-blue-500', textColor: 'text-blue-600', href: '/korea/exams/eps-topik' },
];

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [lang, setLang] = useState<'en' | 'ne'>('en');
  const [notices, setNotices] = useState<Notice[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    // Load language preference
    const saved = localStorage.getItem('jkh_lang') as 'en' | 'ne' | null;
    if (saved) setLang(saved);

    // Load user session
    fetch('/api/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(d => d?.user && setUser(d.user))
      .catch(() => {});

    // Load recent notices
    fetch('/api/notices?limit=3')
      .then(r => r.ok ? r.json() : null)
      .then(d => d?.notices && setNotices(d.notices))
      .catch(() => {});
  }, []);

  const toggleLang = () => {
    const next = lang === 'en' ? 'ne' : 'en';
    setLang(next);
    localStorage.setItem('jkh_lang', next);
  };

  const categoryColor: Record<string, string> = {
    VISA_UPDATE:    'bg-amber-100 text-amber-700',
    VACANCY:        'bg-green-100 text-green-700',
    EXAM_SCHEDULE:  'bg-blue-100 text-blue-700',
    PLATFORM:       'bg-purple-100 text-purple-700',
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Navbar */}
      <MobileNavbar
        user={user}
        lang={lang}
        onLangToggle={toggleLang}
        onSearchOpen={() => setSearchOpen(true)}
      />

      {/* Main content — offset for navbar on mobile */}
      <main className="pt-14 pb-20 md:pt-0 md:pb-0">

        {/* ── Hero ── */}
        <section className="px-4 pt-8 pb-6 text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            🌏 Your gateway to Japan & Korea
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Learn. Study. Work. Live.
          </h1>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xl mx-auto">
            Japanese & Korean learning, exam preparation, visa information, study opportunities, jobs and life guides — all in one place.
          </p>

          {/* Country navigation chips */}
          <div className="flex justify-center gap-3 pt-2">
            <Link
              href="/japan"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-pink-100 text-pink-800 border border-pink-200 text-sm font-bold hover:bg-pink-200 shadow-sm transition-all"
            >
              🇯🇵 Explore Japan
            </Link>
            <Link
              href="/korea"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-100 text-blue-800 border border-blue-200 text-sm font-bold hover:bg-blue-200 shadow-sm transition-all"
            >
              🇰🇷 Explore Korea
            </Link>
          </div>
        </section>

        {/* ── Intent Grid ── */}
        <section className="px-4 pb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            what brings you here
          </p>
          <div className="grid grid-cols-2 gap-3">
            {INTENT_ITEMS.map(({ href, label, Icon, desc, color, bg }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-200 transition-all active:scale-[0.98]"
              >
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${color}`} strokeWidth={1.8} />
                </div>
                <span className="font-semibold text-sm text-gray-900">{label}</span>
                <span className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Consultant CTA Banner ── */}
        <section className="px-4 pb-6">
          <Link
            href="/consultancy"
            className="flex items-center justify-between px-4 py-4 bg-blue-50 border border-blue-100 rounded-2xl hover:bg-blue-100 transition-colors active:scale-[0.99]"
          >
            <div>
              <p className="font-semibold text-sm text-blue-900">🤝 Talk to a consultant</p>
              <p className="text-xs text-blue-600 mt-0.5">Visa and application help</p>
            </div>
            <ArrowRight className="w-5 h-5 text-blue-500 flex-shrink-0" />
          </Link>
        </section>

        {/* ── Latest Notices ── */}
        {notices.length > 0 && (
          <section className="px-4 pb-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">latest notices</p>
              <Link href="/notices" className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2">
              {notices.map(n => (
                <Link
                  key={n.id}
                  href={`/notices/${n.id}`}
                  className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-xl hover:border-gray-200 transition-colors"
                >
                  {n.isPinned && <Bell className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{n.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${categoryColor[n.category] ?? 'bg-gray-100 text-gray-600'}`}>
                        {n.category.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {n.country === 'JAPAN' ? '🇯🇵' : n.country === 'KOREA' ? '🇰🇷' : '🌏'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Continue Learning ── */}
        <section className="px-4 pb-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            continue learning
          </p>
          <div className="grid grid-cols-2 gap-3">
            {CONTINUE_ITEMS.map(({ country, label, progress, color, textColor, href }) => (
              <Link
                key={country}
                href={href}
                className="p-3 bg-white border border-gray-100 rounded-xl hover:border-gray-200 transition-colors"
              >
                <p className={`text-[10px] font-black tracking-widest ${textColor} mb-1`}>
                  {country}
                </p>
                <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
                <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className={`h-full rounded-full ${color}`} style={{ width: `${progress}%` }} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Tab Bar */}
      <BottomTabBar />
    </div>
  );
}
