'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Type, Layers, AlignLeft, Headphones, ChevronRight, Award, Sparkles, Filter, CheckCircle2, Clock, Flame, ArrowRight } from 'lucide-react';

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

const JAPAN_FEATURED_MODULES = [
  { label: 'Vocabulary Explorer', sublabel: 'Minna no Nihongo L1–75', Icon: BookOpen, href: '/japan/learn/n5?tab=VOCABULARY', tag: '800+ Words' },
  { label: '1,000 Kanji Cards', sublabel: 'SRS Deck + 214 Radicals', Icon: Layers, href: '/japan/learn/kanji-1000', tag: 'Onyomi & Kunyomi' },
  { label: 'Grammar Guide', sublabel: 'Nepali & English explanations', Icon: AlignLeft, href: '/japan/learn/n5?tab=GRAMMAR', tag: '80 Rules' },
  { label: 'JFT-Basic CBT Simulator', sublabel: '250-Mark Prometric Test', Icon: Clock, href: '/japan/learn/jft-basic?tab=EXAMS', tag: 'Timed CBT' },
];

const KOREA_FEATURED_MODULES = [
  { label: 'EPS-TOPIK Vocabulary', sublabel: 'Textbook Lessons 1–60', Icon: BookOpen, href: '/korea/learn/eps-topik?tab=VOCABULARY', tag: 'Official Syllabus' },
  { label: '100 Core Grammar', sublabel: 'Sentence structures & audio', Icon: AlignLeft, href: '/korea/learn/eps-topik?tab=GRAMMAR', tag: '100 Patterns' },
  { label: '300 Common Words', sublabel: 'High frequency Korean words', Icon: Layers, href: '/korea/learn/topik-1', tag: 'TOPIK I Prep' },
  { label: 'EPS Sector Vocab', sublabel: 'Manufacturing, Agri, Fishing', Icon: Award, href: '/korea/learn/eps-sectors', tag: 'E-9 Work' },
];

export default function LearnHubClient({ country }: { country: Country }) {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const cName = country === 'japan' ? 'Japan' : 'Korea';
  const flag = country === 'japan' ? '🇯🇵' : '🇰🇷';
  const courses = country === 'japan' ? JAPAN_LEVEL_COURSES : KOREA_LEVEL_COURSES;
  const featuredModules = country === 'japan' ? JAPAN_FEATURED_MODULES : KOREA_FEATURED_MODULES;

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
                    ? 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-600 hover:text-white'
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
                    country === 'japan' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    0{index + 1}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-sm text-gray-900 group-hover:text-red-600">{c.name}</h3>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                        country === 'japan' ? 'bg-red-50 text-red-800 border-red-200' : 'bg-blue-50 text-blue-800 border-blue-200'
                      }`}>
                        {c.badge}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">{c.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-gray-400 group-hover:text-red-600 transition-colors flex-shrink-0 pl-2">
                  <span>Start</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Below the Fold Section 1: Popular Learning Engines ── */}
        <section className="px-4 pb-8 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              📚 Popular Learning Tools
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {featuredModules.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-200 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    country === 'japan' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    <item.Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-900 group-hover:text-red-600">{item.label}</h4>
                    <p className="text-[11px] text-gray-500 font-medium">{item.sublabel}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                  country === 'japan' ? 'bg-red-50 text-red-800 border-red-200' : 'bg-blue-50 text-blue-800 border-blue-200'
                }`}>
                  {item.tag}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Below the Fold Section 2: Continue Learning Widget ── */}
        <section className="px-4 pb-8">
          <div className="p-5 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-3xl text-white space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="text-xs font-black uppercase tracking-wider text-amber-300">Active Study Session</span>
              </div>
              <span className="text-xs font-bold text-slate-400">🔥 7 Day Streak</span>
            </div>

            <div>
              <h3 className="text-lg font-extrabold">Continue where you left off</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {country === 'japan' ? 'JLPT N5 Lesson 12 — Te-form Verb Conjugation' : 'EPS-TOPIK Lesson 15 — Daily Routine & Time Expressions'}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="w-1/2 bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700">
                <div className={`h-full rounded-full ${country === 'japan' ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: '42%' }} />
              </div>
              <Link
                href={country === 'japan' ? '/japan/learn/n5' : '/korea/learn/eps-topik'}
                className="px-4 py-2 bg-white text-slate-900 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-1"
              >
                Resume Course
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Below the Fold Section 3: 4-Step Exam Strategy Checklist ── */}
        <section className="px-4 pb-8 space-y-3">
          <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            🎯 Proven 4-Step Exam Preparation System
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>1. Alphabet Mastery</span>
              </div>
              <p className="text-gray-600 text-[11px] leading-relaxed">
                Master Hiragana/Katakana or Hangul consonants, vowels &amp; stroke order animations first.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>2. Vocabulary &amp; Kanji SRS</span>
              </div>
              <p className="text-gray-600 text-[11px] leading-relaxed">
                Memorize 800–1,500 core words using our Spaced Repetition card engine.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>3. Native Audio Listening</span>
              </div>
              <p className="text-gray-600 text-[11px] leading-relaxed">
                Listen to daily dialogues at 0.8x / 1.0x speeds with audio script toggles.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>4. Timed CBT Simulator</span>
              </div>
              <p className="text-gray-600 text-[11px] leading-relaxed">
                Complete official timed JLPT &amp; EPS-TOPIK CBT exam papers with real-time scoring.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
