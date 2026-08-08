'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Type, Layers, AlignLeft, Headphones, ChevronRight, Award, Sparkles, Filter } from 'lucide-react';
import MobileNavbar from '@/components/layout/MobileNavbar';

type Country = 'japan' | 'korea';

interface LevelOption {
  id: string;
  name: string;
  badge: string;
  desc: string;
  href: string;
}

const JAPAN_LEVEL_COURSES: LevelOption[] = [
  { id: 'basics', name: 'Kana Basics', badge: 'Hiragana & Katakana', desc: 'Audio matrix, stroke order animations & basic greetings', href: '/japan/learn/basics' },
  { id: 'n5', name: 'JLPT N5', badge: 'Lessons 1–25', desc: 'Minna no Nihongo Shokyu I — Vocab, Grammar, Audio & Mock Test', href: '/japan/learn/n5' },
  { id: 'n4', name: 'JLPT N4', badge: 'Lessons 26–50', desc: 'Minna no Nihongo Shokyu II — Vocab, Grammar & Keigo Basics', href: '/japan/learn/n4' },
  { id: 'n3', name: 'JLPT N3', badge: 'Lessons 51–75', desc: 'Intermediate Japanese — 3,000+ Vocab, Grammar & Reading', href: '/japan/learn/n3' },
  { id: 'n2', name: 'JLPT N2', badge: 'Advanced', desc: 'Business Japanese & Advanced Comprehension', href: '/japan/learn/n2' },
  { id: 'n1', name: 'JLPT N1', badge: 'Professional', desc: 'Native Fluency & Academic Article Reading', href: '/japan/learn/n1' },
  { id: 'jft-basic', name: 'JFT-Basic (SSW)', badge: '250-Mark CBT', desc: 'Prometric CBT simulator & daily life scenario grammar', href: '/japan/learn/jft-basic' },
  { id: 'kanji-1000', name: 'Kanji 1,000', badge: '1000 Kanji + SRS', desc: '214 Radicals, Onyomi, Kunyomi & 3D SRS review deck', href: '/japan/learn/kanji-1000' },
];

const KOREA_LEVEL_COURSES: LevelOption[] = [
  { id: 'basics', name: 'Hangul Basics', badge: 'Consonants & Vowels', desc: 'Audio matrix, batchim rules & syllable block writing', href: '/korea/learn/basics' },
  { id: 'eps-topik', name: 'EPS-TOPIK', badge: 'Lessons 1–60', desc: 'Official HRD Korea 60-lesson textbook, audio & CBT tests', href: '/korea/learn/eps-topik' },
  { id: 'topik-1', name: 'TOPIK I', badge: 'Level 1 & 2', desc: 'Beginner Korean reading, listening & 300 common words', href: '/korea/learn/topik-1' },
  { id: 'topik-2', name: 'TOPIK II', badge: 'Level 3 & 4', desc: 'Intermediate Korean sentence structures & essay writing', href: '/korea/learn/topik-2' },
  { id: 'eps-sectors', name: 'EPS Sectors', badge: 'E-9 Work', desc: 'Manufacturing, Agriculture, Construction & Fishing Vocab', href: '/korea/learn/eps-sectors' },
];

export default function LearnHubClient({ country }: { country: Country }) {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const cName = country === 'japan' ? 'Japan' : 'Korea';
  const flag = country === 'japan' ? '🇯🇵' : '🇰🇷';
  const courses = country === 'japan' ? JAPAN_LEVEL_COURSES : KOREA_LEVEL_COURSES;

  const filteredCourses = activeFilter === 'ALL'
    ? courses
    : courses.filter(c => c.id === activeFilter);

  return (
    <div className="min-h-screen bg-white pb-24">
      <main className="pt-14 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="px-4 pt-4 pb-2">
          <Link href={`/${country}`} className="inline-flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to {flag} {cName} Hub
          </Link>
        </div>

        {/* Header */}
        <section className="px-4 py-4 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-bold">
            {flag} {country === 'japan' ? 'JLPT & JFT-Basic Learning Ecosystem' : 'EPS-TOPIK & TOPIK Learning Ecosystem'}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Learn {country === 'japan' ? 'Japanese' : 'Korean'}
          </h1>
          <p className="text-sm text-gray-500">
            All courses in serial sequence from basic alphabet to advanced certification.
          </p>
        </section>

        {/* Level Filter Bar */}
        <section className="px-4 pb-4">
          <div className="flex items-center gap-1 text-xs font-semibold text-gray-400 mb-2">
            <Filter className="w-3.5 h-3.5" /> Jump to Course Level:
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'ALL'
                  ? country === 'japan' ? 'bg-red-600 text-white shadow-sm' : 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Courses ({courses.length})
            </button>
            {courses.map((c) => (
              <Link
                key={c.id}
                href={c.href}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  country === 'japan'
                    ? 'bg-pink-50 text-pink-700 border border-pink-200 hover:bg-pink-600 hover:text-white'
                    : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-600 hover:text-white'
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>

        {/* SRS Review Banner */}
        <section className="px-4 pb-4">
          <Link
            href="/dashboard"
            className="flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl hover:bg-amber-100/80 transition-all shadow-sm"
          >
            <div>
              <p className="text-xs font-extrabold text-amber-950 flex items-center gap-1.5">
                ⚡ Spaced Repetition SRS Memory Review
              </p>
              <p className="text-[11px] text-amber-800 mt-0.5 font-medium">Review due vocabulary &amp; kanji cards according to SM-2 memory curve</p>
            </div>
            <ChevronRight className="w-5 h-5 text-amber-600 flex-shrink-0" />
          </Link>
        </section>

        {/* Serial Course Cards Grid */}
        <section className="px-4 pb-8 space-y-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Curriculum Courses in Serial Order
          </p>

          <div className="space-y-3">
            {filteredCourses.map((c, index) => (
              <Link
                key={c.id}
                href={c.href}
                className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-200 transition-all active:scale-[0.99] group"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5 ${
                    country === 'japan' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    0{index + 1}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-sm text-gray-900 group-hover:text-blue-600">{c.name}</h3>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                        country === 'japan' ? 'bg-pink-50 text-pink-700 border-pink-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {c.badge}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">{c.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 pl-2">
                  <span>Start</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
