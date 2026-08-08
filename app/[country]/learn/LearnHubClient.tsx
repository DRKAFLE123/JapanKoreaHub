'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Type, Layers, AlignLeft, Headphones, Mic, ChevronRight, Lock, Award, Sparkles, Filter } from 'lucide-react';
import MobileNavbar from '@/components/layout/MobileNavbar';
import BottomTabBar from '@/components/layout/BottomTabBar';

type Country = 'japan' | 'korea';

interface LevelOption {
  id: string;
  name: string;
  badge: string;
  desc: string;
}

const JAPAN_LEVELS: LevelOption[] = [
  { id: 'ALL', name: 'All Levels', badge: 'Complete', desc: 'Browse all Japanese modules' },
  { id: 'N5', name: 'JLPT N5', badge: 'Lessons 1–25', desc: 'Beginner grammar & 800+ vocabulary' },
  { id: 'N4', name: 'JLPT N4', badge: 'Lessons 26–50', desc: 'Elementary grammar & 1,500+ vocabulary' },
  { id: 'N3', name: 'JLPT N3', badge: 'Lessons 51–75', desc: 'Intermediate master syllabus' },
  { id: 'JFT', name: 'JFT-Basic', badge: 'SSW Required', desc: '250-mark Prometric CBT simulator & grammar' },
];

const KOREA_LEVELS: LevelOption[] = [
  { id: 'ALL', name: 'All Levels', badge: 'Complete', desc: 'Browse all Korean modules' },
  { id: 'EPS', name: 'EPS-TOPIK', badge: 'Lessons 1–60', desc: 'Official HRD Korea 60-lesson textbook' },
  { id: 'TOPIK1', name: 'TOPIK I', badge: 'Level 1 & 2', desc: 'Beginner Korean reading & listening' },
  { id: 'TOPIK2', name: 'TOPIK II', badge: 'Level 3 & 4', desc: 'Intermediate Korean proficiency' },
  { id: 'SECTORS', name: 'EPS Sectors', badge: 'E-9 Work', desc: 'Manufacturing, Agriculture, Construction, Fishing' },
];

const JAPAN_MODULES = [
  { id: 'basics', label: 'Basics (Kana)', sublabel: 'Hiragana & Katakana stroke order & audio', Icon: Type, href: '/japan/learn/basics', free: true },
  { id: 'vocabulary', label: 'Vocabulary Explorer', sublabel: 'Minna no Nihongo — Lessons 1–75 (N5→N3)', Icon: BookOpen, href: '/japan/learn/vocabulary', free: true },
  { id: 'kanji', label: '1,000 Kanji Cards', sublabel: 'Kanji SRS cards with onyomi, kunyomi & radicals', Icon: Layers, href: '/japan/learn/kanji', free: true },
  { id: 'grammar', label: 'Grammar Guides', sublabel: 'JFT & JLPT N5→N3 sentence structures in Nepali', Icon: AlignLeft, href: '/japan/learn/grammar', free: true },
  { id: 'radicals', label: 'Kanji Radicals', sublabel: '214 Radical breakdown & mnemonics', Icon: Layers, href: '/japan/learn/radicals', free: true },
];

const KOREA_MODULES = [
  { id: 'basics', label: 'Basics (Hangul)', sublabel: 'Consonants, Vowels & Audio Matrix', Icon: Type, href: '/korea/learn/basics', free: true },
  { id: 'vocabulary', label: 'Vocabulary Explorer', sublabel: 'EPS-TOPIK Lessons 1–60 (Nepali & English)', Icon: BookOpen, href: '/korea/learn/vocabulary', free: true },
  { id: 'grammar', label: '100 Grammar Rules', sublabel: 'EPS & TOPIK sentence patterns explained', Icon: AlignLeft, href: '/korea/learn/grammar', free: true },
  { id: 'words', label: '300 Core Words', sublabel: 'High-frequency essential Korean vocabulary', Icon: Layers, href: '/korea/learn/words', free: true },
  { id: 'flashcards', label: 'SRS Flashcards', sublabel: 'Spaced repetition flashcards engine', Icon: Layers, href: '/korea/learn/flashcards', free: true },
  { id: 'sectors', label: 'EPS Sector Vocab', sublabel: 'Manufacturing, Agriculture & Construction terms', Icon: Award, href: '/korea/learn/sectors', free: true },
];

export default function LearnHubClient({ country }: { country: Country }) {
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');

  const cName = country === 'japan' ? 'Japan' : 'Korea';
  const flag = country === 'japan' ? '🇯🇵' : '🇰🇷';
  const levels = country === 'japan' ? JAPAN_LEVELS : KOREA_LEVELS;
  const modules = country === 'japan' ? JAPAN_MODULES : KOREA_MODULES;

  return (
    <div className="min-h-screen bg-white pb-24">
      <MobileNavbar user={null} lang="en" onLangToggle={() => {}} onSearchOpen={() => {}} />

      <main className="pt-14 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="px-4 pt-4 pb-2">
          <Link href={`/${country}`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            {flag} {cName} Hub
          </Link>
        </div>

        {/* Header */}
        <section className="px-4 py-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-semibold mb-3">
            {flag} {country === 'japan' ? 'JLPT & JFT-Basic Learning' : 'EPS-TOPIK & TOPIK Learning'}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Learn {country === 'japan' ? 'Japanese' : 'Korean'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            All levels from basic alphabet to advanced exam prep.
          </p>
        </section>

        {/* Level Filter Chips */}
        <section className="px-4 pb-4">
          <div className="flex items-center gap-1 text-xs font-semibold text-gray-400 mb-2">
            <Filter className="w-3.5 h-3.5" /> Select Proficiency Level:
          </div>
          <div className="flex flex-wrap gap-2">
            {levels.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevel(lvl.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedLevel === lvl.id
                    ? country === 'japan' ? 'bg-red-600 text-white shadow-sm' : 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {lvl.name}
              </button>
            ))}
          </div>
        </section>

        {/* SRS review callout */}
        <section className="px-4 pb-4">
          <Link
            href="/dashboard"
            className="flex items-center justify-between px-4 py-3 bg-amber-50 border border-amber-100 rounded-xl hover:bg-amber-100 transition-colors"
          >
            <div>
              <p className="text-xs font-bold text-amber-900">⚡ Spaced Repetition SRS Review</p>
              <p className="text-[10px] text-amber-700 mt-0.5">Review due vocabulary & kanji cards</p>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-500" />
          </Link>
        </section>

        {/* Learning Modules Grid */}
        <section className="px-4 pb-8 space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {selectedLevel === 'ALL' ? 'All Learning Modules' : `Modules for ${levels.find(l => l.id === selectedLevel)?.name}`}
          </p>

          <div className="space-y-3">
            {modules.map(({ id, label, sublabel, Icon, href, free }) => (
              <Link
                key={id}
                href={href}
                className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-200 transition-all active:scale-[0.99]"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-gray-700" strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">{label}</span>
                    {free && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        FREE ACCESS
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{sublabel}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      </main>

      <BottomTabBar />
    </div>
  );
}
