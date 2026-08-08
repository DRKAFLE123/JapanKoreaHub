'use client';
import React from 'react';
import Link from 'next/link';
import {
  BookOpen, ClipboardList, Shield, Briefcase,
  GraduationCap, Globe, ChevronRight, ArrowLeft, ArrowRight,
} from 'lucide-react';
import MobileNavbar from '@/components/layout/MobileNavbar';
import BottomTabBar from '@/components/layout/BottomTabBar';

type Country = 'japan' | 'korea';

const COUNTRY_CONFIG = {
  japan: {
    name: 'Japan',
    flag: '🇯🇵',
    accentClass: 'text-red-600',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-100',
    chipClass: 'bg-pink-100 text-pink-700 border-pink-200',
    sections: [
      { href: '/japan/learn',  label: 'Learn Japanese', Icon: BookOpen,     desc: 'Hiragana · Katakana · Vocabulary · Kanji · Grammar · Listening', color: 'text-indigo-600', bg: 'bg-indigo-50' },
      { href: '/japan/exams',  label: 'Exams',          Icon: ClipboardList, desc: 'JLPT N5–N2 · JFT-Basic CBT', color: 'text-amber-600', bg: 'bg-amber-50' },
      { href: '/japan/visa',   label: 'Visa',           Icon: Shield,        desc: 'Student visa · SSW work visa · Interview prep', color: 'text-rose-600', bg: 'bg-rose-50' },
      { href: '/japan/work',   label: 'Work',           Icon: Briefcase,     desc: 'SSW · Sector vocab · Job listings', color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { href: '/japan/study',  label: 'Study',          Icon: GraduationCap, desc: 'Universities · Scholarships · Language schools', color: 'text-blue-600', bg: 'bg-blue-50' },
      { href: '/japan/life',   label: 'Life in Japan',  Icon: Globe,         desc: 'Cost of living · Culture · Housing · Rights', color: 'text-purple-600', bg: 'bg-purple-50' },
    ],
    featuredExams: [
      { href: '/japan/exams/jlpt-n5',  label: 'JLPT N5',   badge: 'Beginner' },
      { href: '/japan/exams/jlpt-n4',  label: 'JLPT N4',   badge: 'Elementary' },
      { href: '/japan/exams/jlpt-n3',  label: 'JLPT N3',   badge: 'Intermediate' },
      { href: '/japan/exams/jft-basic', label: 'JFT-Basic', badge: 'SSW Required' },
    ],
  },
  korea: {
    name: 'Korea',
    flag: '🇰🇷',
    accentClass: 'text-blue-600',
    bgClass: 'bg-blue-50',
    borderClass: 'border-blue-100',
    chipClass: 'bg-blue-100 text-blue-700 border-blue-200',
    sections: [
      { href: '/korea/learn',  label: 'Learn Korean', Icon: BookOpen,     desc: 'Hangul · Vocabulary · Grammar · Listening · 300 Core Words', color: 'text-indigo-600', bg: 'bg-indigo-50' },
      { href: '/korea/exams',  label: 'Exams',        Icon: ClipboardList, desc: 'EPS-TOPIK · TOPIK I · TOPIK II', color: 'text-amber-600', bg: 'bg-amber-50' },
      { href: '/korea/visa',   label: 'Visa',         Icon: Shield,        desc: 'E-9 work visa · Student visa · Interview prep', color: 'text-rose-600', bg: 'bg-rose-50' },
      { href: '/korea/work',   label: 'Work',         Icon: Briefcase,     desc: 'EPS · E-9 · Sector vocab · Job listings', color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { href: '/korea/study',  label: 'Study',        Icon: GraduationCap, desc: 'Universities · Scholarships', color: 'text-blue-600', bg: 'bg-blue-50' },
      { href: '/korea/life',   label: 'Life in Korea', Icon: Globe,        desc: 'Cost of living · Culture · Housing · Rights', color: 'text-purple-600', bg: 'bg-purple-50' },
    ],
    featuredExams: [
      { href: '/korea/exams/eps-topik', label: 'EPS-TOPIK', badge: 'E-9 Required' },
      { href: '/korea/exams/topik-1',   label: 'TOPIK I',   badge: 'Beginner–Intermediate' },
      { href: '/korea/exams/topik-2',   label: 'TOPIK II',  badge: 'Advanced' },
    ],
  },
} as const;

export default function CountryHubClient({ country }: { country: Country }) {
  const cfg = COUNTRY_CONFIG[country];

  return (
    <div className="min-h-screen bg-white">
      <MobileNavbar user={null} lang="en" onLangToggle={() => {}} onSearchOpen={() => {}} />

      <main className="pt-14 pb-24 md:pt-6">

        {/* Breadcrumb */}
        <div className="px-4 pt-4 pb-2">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Home
          </Link>
        </div>

        {/* Hero */}
        <section className="px-4 py-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${cfg.chipClass} text-sm font-medium mb-3`}>
            {cfg.flag} {cfg.name}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {cfg.flag} {cfg.name} Hub
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Everything you need for your {cfg.name} journey
          </p>
        </section>

        {/* Section grid */}
        <section className="px-4 pb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">explore</p>
          <div className="grid grid-cols-2 gap-3">
            {cfg.sections.map(({ href, label, Icon, desc, color, bg }) => (
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

        {/* Featured Exams */}
        <section className="px-4 pb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">exams</p>
            <Link href={`/${country}/exams`} className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1">
              See all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {cfg.featuredExams.map(({ href, label, badge }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between p-3.5 bg-white border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-sm transition-all"
              >
                <div>
                  <span className="font-semibold text-sm text-gray-900">{label}</span>
                  <span className={`ml-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.bgClass} ${cfg.accentClass}`}>
                    {badge}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            ))}
          </div>
        </section>

        {/* Visa CTA */}
        <section className="px-4 pb-6">
          <Link
            href={`/${country}/visa`}
            className="flex items-center justify-between px-4 py-4 bg-amber-50 border border-amber-100 rounded-2xl hover:bg-amber-100 transition-colors"
          >
            <div>
              <p className="font-semibold text-sm text-amber-900">🛂 Visa & Immigration</p>
              <p className="text-xs text-amber-700 mt-0.5">Official guides with verified sources</p>
            </div>
            <ArrowRight className="w-5 h-5 text-amber-500 flex-shrink-0" />
          </Link>
        </section>

        {/* Consultancy CTA */}
        <section className="px-4 pb-4">
          <Link
            href="/consultancy"
            className="flex items-center justify-between px-4 py-4 bg-blue-50 border border-blue-100 rounded-2xl hover:bg-blue-100 transition-colors"
          >
            <div>
              <p className="font-semibold text-sm text-blue-900">🤝 Talk to a consultant</p>
              <p className="text-xs text-blue-600 mt-0.5">Personal visa and application help</p>
            </div>
            <ArrowRight className="w-5 h-5 text-blue-500 flex-shrink-0" />
          </Link>
        </section>
      </main>

      <BottomTabBar />
    </div>
  );
}
