'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen, GraduationCap, Briefcase, Shield,
  ChevronRight, Bell, ArrowRight, Flame, Sparkles
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

/* ── Popular Learning Items ── */
const POPULAR_LEARNING_ITEMS = [
  {
    country: 'KOREA',
    flag: '🇰🇷',
    title: 'EPS-TOPIK',
    subtitle: '60 Lessons · Beginner',
    href: '/korea/exams/eps-topik',
    bgColor: 'bg-blue-50/60',
    borderColor: 'border-blue-100',
    badgeColor: 'bg-blue-100 text-blue-800',
  },
  {
    country: 'JAPAN',
    flag: '🇯🇵',
    title: 'JLPT N5',
    subtitle: 'Vocabulary · Grammar · Kanji',
    href: '/japan/exams/jlpt-n5',
    bgColor: 'bg-pink-50/60',
    borderColor: 'border-pink-100',
    badgeColor: 'bg-pink-100 text-pink-800',
  },
  {
    country: 'KOREA',
    flag: '🇰🇷',
    title: 'Korean Basics',
    subtitle: 'Hangul · Grammar · Vocabulary',
    href: '/korea/learn/basics',
    bgColor: 'bg-blue-50/60',
    borderColor: 'border-blue-100',
    badgeColor: 'bg-blue-100 text-blue-800',
  },
  {
    country: 'JAPAN',
    flag: '🇯🇵',
    title: 'Japanese Basics',
    subtitle: 'Hiragana · Katakana · Grammar',
    href: '/japan/learn/basics',
    bgColor: 'bg-pink-50/60',
    borderColor: 'border-pink-100',
    badgeColor: 'bg-pink-100 text-pink-800',
  },
];

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

      {/* Main content */}
      <main className="pt-14 pb-20 md:pt-0 md:pb-0 max-w-4xl mx-auto">

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

        {/* ── Value-Oriented Consultant CTA Banner ── */}
        <section className="px-4 pb-6">
          <div className="p-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between gap-4 shadow-sm">
            <div>
              <p className="font-extrabold text-sm text-blue-950 flex items-center gap-1.5">
                🤝 Get expert guidance
              </p>
              <p className="text-xs text-blue-700 mt-1 font-medium">
                Visa, study & application assistance
              </p>
            </div>
            <Link
              href="/consultancy"
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all flex-shrink-0"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* ── Latest Japan & Korea Updates Section ── */}
        <section className="px-4 pb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-gray-900 flex items-center gap-1.5 uppercase tracking-wider">
              📢 Latest Japan &amp; Korea Updates
            </p>
            <Link href="/notices" className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1">
              View all notices <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {notices.length > 0 ? (
              notices.map(n => (
                <Link
                  key={n.id}
                  href={`/notices/${n.id}`}
                  className="flex items-center justify-between p-3.5 bg-white border border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-sm px-2 py-0.5 rounded bg-gray-100 border border-gray-200 font-bold flex-shrink-0">
                      {n.country === 'JAPAN' ? '🇯🇵 Japan' : n.country === 'KOREA' ? '🇰🇷 Korea' : '🌏 Both'}
                    </span>
                    <p className="text-xs font-semibold text-gray-900 group-hover:text-blue-600 truncate">
                      {n.title}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
                </Link>
              ))
            ) : (
              /* Hardcoded verified fallback notice ticker items matching prompt */
              [
                { flag: '🇰🇷 Korea', title: 'EPS-TOPIK 2026 registration update', href: '/notices' },
                { flag: '🇯🇵 Japan', title: 'JLPT December 2026 registration', href: '/notices' },
                { flag: '🇯🇵 Japan', title: 'SSW agriculture skill evaluation update', href: '/notices' },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="flex items-center justify-between p-3.5 bg-white border border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs px-2.5 py-0.5 rounded bg-gray-100 border border-gray-200 font-bold flex-shrink-0">
                      {item.flag}
                    </span>
                    <p className="text-xs font-semibold text-gray-900 group-hover:text-blue-600 truncate">
                      {item.title}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
                </Link>
              ))
            )}
          </div>
        </section>

        {/* ── Continue Learning ── */}
        <section className="px-4 pb-6">
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

        {/* ── Popular Learning Section ── */}
        <section className="px-4 pb-8">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-gray-900 flex items-center gap-1.5 uppercase tracking-wider">
              📚 Popular Learning
            </p>
            <Link href="/learn" className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1">
              Explore all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {POPULAR_LEARNING_ITEMS.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className={`p-4 rounded-2xl border ${item.borderColor} ${item.bgColor} flex items-center justify-between hover:shadow-sm transition-all group`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.flag}</span>
                    <h3 className="font-extrabold text-sm text-gray-900 group-hover:text-blue-700">{item.title}</h3>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">{item.subtitle}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
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
