'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Type, Layers, AlignLeft, Headphones, Mic, ChevronRight, Lock } from 'lucide-react';
import MobileNavbar from '@/components/layout/MobileNavbar';
import BottomTabBar from '@/components/layout/BottomTabBar';

type Country = 'japan' | 'korea';

const MODULES: Record<Country, {
  id: string; label: string; sublabel: string;
  Icon: React.ElementType; href: string; free: boolean;
}[]> = {
  japan: [
    { id: 'basics',      label: 'Basics',      sublabel: 'Hiragana · Katakana · Stroke order', Icon: Type,      href: '/japan/learn/basics',      free: true  },
    { id: 'vocabulary',  label: 'Vocabulary',  sublabel: 'Minna no Nihongo — Lessons 1–75',    Icon: BookOpen,  href: '/japan/learn/vocabulary',  free: false },
    { id: 'kanji',       label: 'Kanji',       sublabel: '1,000 characters with radicals',     Icon: Layers,    href: '/japan/learn/kanji',       free: false },
    { id: 'grammar',     label: 'Grammar',     sublabel: 'N5→N3 guides — EN + Nepali',        Icon: AlignLeft, href: '/japan/learn/grammar',     free: false },
    { id: 'listening',   label: 'Listening',   sublabel: '87 CD tracks · JFT-Basic prep',     Icon: Headphones,href: '/japan/learn/listening',   free: false },
    { id: 'speaking',    label: 'Speaking',    sublabel: 'Practice sessions',                  Icon: Mic,       href: '/japan/learn/speaking',    free: false },
  ],
  korea: [
    { id: 'basics',      label: 'Basics',      sublabel: 'Hangul consonants + vowels',         Icon: Type,      href: '/korea/learn/basics',      free: true  },
    { id: 'vocabulary',  label: 'Vocabulary',  sublabel: 'EPS-TOPIK — Lessons 1–60',           Icon: BookOpen,  href: '/korea/learn/vocabulary',  free: false },
    { id: 'grammar',     label: 'Grammar',     sublabel: 'EPS + TOPIK guides — EN + Nepali',   Icon: AlignLeft, href: '/korea/learn/grammar',     free: false },
    { id: 'listening',   label: 'Listening',   sublabel: 'EPS audio tracks',                   Icon: Headphones,href: '/korea/learn/listening',   free: false },
    { id: 'words',       label: '300 Core Words', sublabel: 'Quick reference vocabulary',      Icon: Layers,    href: '/korea/learn/words',       free: false },
    { id: 'speaking',    label: 'Speaking',    sublabel: 'Practice sessions',                  Icon: Mic,       href: '/korea/learn/speaking',    free: false },
  ],
};

const LABELS: Record<Country, { flag: string; name: string; chipClass: string }> = {
  japan: { flag: '🇯🇵', name: 'Japanese', chipClass: 'bg-pink-100 text-pink-700 border-pink-200' },
  korea: { flag: '🇰🇷', name: 'Korean',   chipClass: 'bg-blue-100 text-blue-700 border-blue-200' },
};

export default function LearnHubClient({ country }: { country: Country }) {
  const modules = MODULES[country];
  const { flag, name, chipClass } = LABELS[country];

  return (
    <div className="min-h-screen bg-white">
      <MobileNavbar user={null} lang="en" onLangToggle={() => {}} onSearchOpen={() => {}} />

      <main className="pt-14 pb-24">

        {/* Breadcrumb */}
        <div className="px-4 pt-4 pb-2">
          <Link href={`/${country}`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            {flag} {name === 'Japanese' ? 'Japan' : 'Korea'}
          </Link>
        </div>

        {/* Header */}
        <section className="px-4 py-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${chipClass} text-sm font-medium mb-3`}>
            {flag} {name}
          </div>
          {/* NOTE: No country filter chip here — user already chose a country from the URL */}
          <h1 className="text-2xl font-bold text-gray-900">Learn {name}</h1>
          <p className="text-sm text-gray-500 mt-1">Choose a module to start learning</p>
        </section>

        {/* SRS review callout */}
        <section className="px-4 pb-4">
          <Link
            href="/dashboard"
            className="flex items-center justify-between px-4 py-3 bg-amber-50 border border-amber-100 rounded-xl hover:bg-amber-100 transition-colors"
          >
            <div>
              <p className="text-sm font-semibold text-amber-900">⚡ SRS Review Queue</p>
              <p className="text-xs text-amber-700 mt-0.5">You have cards due for review</p>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-500" />
          </Link>
        </section>

        {/* Module list */}
        <section className="px-4 pb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">modules</p>
          <div className="space-y-2.5">
            {modules.map(({ id, label, sublabel, Icon, href, free }) => (
              <Link
                key={id}
                href={href}
                className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-200 transition-all active:scale-[0.99]"
              >
                <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-gray-600" strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-gray-900">{label}</span>
                    {free && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-green-100 text-green-700">FREE</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{sublabel}</p>
                </div>
                {!free ? (
                  <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                )}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <BottomTabBar />
    </div>
  );
}
