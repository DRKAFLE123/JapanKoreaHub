'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Award, Search, Filter, Play, CheckCircle2, Sparkles, BookOpen, Layers, X, ChevronDown } from 'lucide-react';
import MobileNavbar from '@/components/layout/MobileNavbar';
import BottomTabBar from '@/components/layout/BottomTabBar';
import { TimedExamEngine } from '@/components/TimedExamEngine';

type Country = 'japan' | 'korea';

interface MockTestCatalogItem {
  id: string;
  level: string;
  title: string;
  specs: string;
  desc: string;
  badge: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  questionsCount: number;
  durationMinutes: number;
  passScore: string;
}

const JAPAN_MOCK_TESTS: MockTestCatalogItem[] = [
  {
    id: 'N5_SET_1',
    level: 'N5',
    title: 'JLPT N5 Official Standard Mock Test — Set 1',
    specs: '⏱ 50 Mins • 📝 10 Questions • 🎯 Pass Mark: 70% • 🎧 Audio Included',
    desc: 'Covers N5 Kanji, vocabulary, particles (で, が, に), and basic audio dialogues matching official JLPT booklet format.',
    badge: 'Official JLPT N5',
    difficulty: 'BEGINNER',
    questionsCount: 10,
    durationMinutes: 50,
    passScore: '80 / 180 Pts',
  },
  {
    id: 'N5_SET_2',
    level: 'N5',
    title: 'JLPT N5 Official Standard Mock Test — Set 2',
    specs: '⏱ 50 Mins • 📝 6 Questions • 🎯 Pass Mark: 70% • 📝 Grammar Focus',
    desc: 'Targeted N5 grammar drill covering ~てもいい, 〜から起点, and counter words for intense speed practice.',
    badge: 'Official JLPT N5',
    difficulty: 'BEGINNER',
    questionsCount: 6,
    durationMinutes: 50,
    passScore: '80 / 180 Pts',
  },
  {
    id: 'N4_SET_1',
    level: 'N4',
    title: 'JLPT N4 Official Model Examination — Set 1',
    specs: '⏱ 50 Mins • 📝 3 Questions • 🎯 Pass Mark: 70% • 🎓 Elementary Level',
    desc: 'Comprehensive JLPT N4 examination covering ~そうです predictions, respectful Keigo forms, and plan vocabulary.',
    badge: 'Official JLPT N4',
    difficulty: 'BEGINNER',
    questionsCount: 3,
    durationMinutes: 50,
    passScore: '90 / 180 Pts',
  },
  {
    id: 'N3_SET_1',
    level: 'N3',
    title: 'JLPT N3 Intermediate Master Mock Exam — Set 1',
    specs: '⏱ 60 Mins • 📝 2 Questions • 🎯 Pass Mark: 70% • 📘 Intermediate Level',
    desc: 'N3 level model test covering ~につきまして, ~に関して, and workplace reading comprehension.',
    badge: 'Official JLPT N3',
    difficulty: 'INTERMEDIATE',
    questionsCount: 2,
    durationMinutes: 60,
    passScore: '95 / 180 Pts',
  },
  {
    id: 'N2_SET_1',
    level: 'N2',
    title: 'JLPT N2 Business & Academic Model Test — Set 1',
    specs: '⏱ 105 Mins • 📝 1 Question • 🎯 Pass Mark: 50% • 🏢 Business Keigo',
    desc: 'N2 level mock exam focusing on business Japanese, editorial news comprehension, and formal compound verbs.',
    badge: 'Official JLPT N2',
    difficulty: 'ADVANCED',
    questionsCount: 1,
    durationMinutes: 105,
    passScore: '90 / 180 Pts',
  },
  {
    id: 'N1_SET_1',
    level: 'N1',
    title: 'JLPT N1 Native Fluency Examination — Set 1',
    specs: '⏱ 110 Mins • 📝 1 Question • 🎯 Pass Mark: 55.5% • 🏛️ Academic Native',
    desc: 'N1 level advanced mock test covering all 2,136 Jōyō kanji, editorial commentary, and technical audio.',
    badge: 'Official JLPT N1',
    difficulty: 'ADVANCED',
    questionsCount: 1,
    durationMinutes: 110,
    passScore: '100 / 180 Pts',
  },
  {
    id: 'JFT_SET_1',
    level: 'JFT',
    title: 'JFT-Basic 250-Mark Official CBT Simulator — Set 1',
    specs: '⏱ 60 Mins • 📝 2 Questions • 🎯 Pass Mark: 200/250 Pts • 💻 Prometric CBT',
    desc: 'Official 250-point Prometric CBT simulator for SSW 1 Specified Skilled Worker visas.',
    badge: 'Official JFT-Basic',
    difficulty: 'INTERMEDIATE',
    questionsCount: 2,
    durationMinutes: 60,
    passScore: '200 / 250 Pts',
  },
];

const KOREA_MOCK_TESTS: MockTestCatalogItem[] = [
  {
    id: 'EPS_SET_1',
    level: 'EPS',
    title: 'EPS-TOPIK 60-Lesson HRD Korea Official Model Test — Set 1',
    specs: '⏱ 50 Mins • 📝 2 Questions • 🎯 Pass Mark: 110 Pts • 🏢 Factory & Safety',
    desc: 'HRD Korea standard CBT format covering factory vocabulary, signboards, and workplace safety rules.',
    badge: 'EPS-TOPIK HRD',
    difficulty: 'BEGINNER',
    questionsCount: 2,
    durationMinutes: 50,
    passScore: '110 / 200 Pts',
  },
  {
    id: 'EPS_SET_2',
    level: 'EPS',
    title: 'EPS-TOPIK Manufacturing & Safety Model Test — Set 2',
    specs: '⏱ 50 Mins • 📝 1 Question • 🎯 Pass Mark: 110 Pts • ⚠️ Safety Warnings',
    desc: 'Targeted EPS CBT exam focusing on warning signs (출입 금지, 경고) and industrial equipment.',
    badge: 'EPS-TOPIK HRD',
    difficulty: 'BEGINNER',
    questionsCount: 1,
    durationMinutes: 50,
    passScore: '110 / 200 Pts',
  },
  {
    id: 'TOPIK1_SET_1',
    level: 'TOPIK1_L1',
    title: 'TOPIK I (Levels 1–2) Official Beginner Model Exam — Set 1',
    specs: '⏱ 60 Mins • 📝 1 Question • 🎯 Pass Mark: 80 Pts • 🎧 Listening & Reading',
    desc: 'Official 100% multiple-choice TOPIK I exam covering daily greetings, locations, and reading notices.',
    badge: 'TOPIK I Standard',
    difficulty: 'BEGINNER',
    questionsCount: 1,
    durationMinutes: 60,
    passScore: '80 / 200 Pts',
  },
  {
    id: 'TOPIK1_SET_2',
    level: 'TOPIK1_L1',
    title: 'TOPIK I (Levels 1–2) Grammar & Particle Drill — Set 2',
    specs: '⏱ 60 Mins • 📝 1 Question • 🎯 Pass Mark: 80 Pts • 📝 Particle Focus',
    desc: 'Targeted practice on location particles (에서, 에게), honorific endings, and reading short notes.',
    badge: 'TOPIK I Standard',
    difficulty: 'BEGINNER',
    questionsCount: 1,
    durationMinutes: 60,
    passScore: '80 / 200 Pts',
  },
  {
    id: 'TOPIK2_SET_1',
    level: 'TOPIK3',
    title: 'TOPIK II (Levels 3–6) Intermediate & Advanced Model Test — Set 1',
    specs: '⏱ 80 Mins • 📝 1 Question • 🎯 Pass Mark: 120 Pts • ✍️ Academic Level',
    desc: 'Standard TOPIK II model test featuring advanced vocabulary, news editorial reading, and writing graph analysis.',
    badge: 'TOPIK II Standard',
    difficulty: 'INTERMEDIATE',
    questionsCount: 1,
    durationMinutes: 80,
    passScore: '120 / 300 Pts',
  },
  {
    id: 'TOPIK2_SET_2',
    level: 'TOPIK3',
    title: 'TOPIK II Task 53 & Essay Writing Special Drill — Set 2',
    specs: '⏱ 50 Mins • 📝 1 Question • 🎯 Pass Mark: 120 Pts • 📊 Graph & Chart Essay',
    desc: 'Dedicated practice for Task 53 graph description essays and Task 54 argumentative essay writing.',
    badge: 'TOPIK II Standard',
    difficulty: 'ADVANCED',
    questionsCount: 1,
    durationMinutes: 50,
    passScore: '120 / 300 Pts',
  },
];

export default function ExamsHubClient({ country }: { country: Country }) {
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeExamLevel, setActiveExamLevel] = useState<string | null>(null);

  const rawMockTests = country === 'japan' ? JAPAN_MOCK_TESTS : KOREA_MOCK_TESTS;

  const levelOptions = country === 'japan'
    ? [
        { id: 'ALL', label: '🌐 All Levels' },
        { id: 'N5',  label: 'JLPT N5' },
        { id: 'N4',  label: 'JLPT N4' },
        { id: 'N3',  label: 'JLPT N3' },
        { id: 'N2',  label: 'JLPT N2' },
        { id: 'N1',  label: 'JLPT N1' },
        { id: 'JFT', label: 'JFT-Basic' },
      ]
    : [
        { id: 'ALL',        label: '🌐 All Levels' },
        { id: 'EPS',        label: 'EPS-TOPIK' },
        { id: 'TOPIK1_L1',  label: 'TOPIK I (Levels 1–2)' },
        { id: 'TOPIK3',     label: 'TOPIK II (Levels 3–6)' },
      ];

  const difficultyOptions = [
    { id: 'ALL',          label: 'All Difficulties' },
    { id: 'BEGINNER',     label: '🟢 Beginner' },
    { id: 'INTERMEDIATE', label: '🟡 Intermediate' },
    { id: 'ADVANCED',     label: '🔴 Advanced' },
  ];

  const filteredTests = useMemo(() => {
    return rawMockTests.filter((test) => {
      if (selectedLevel !== 'ALL' && test.level !== selectedLevel) return false;
      if (selectedDifficulty !== 'ALL' && test.difficulty !== selectedDifficulty) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          test.title.toLowerCase().includes(q) ||
          test.desc.toLowerCase().includes(q) ||
          test.badge.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [rawMockTests, selectedLevel, selectedDifficulty, searchQuery]);

  if (activeExamLevel) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 font-sans">
        <div className="max-w-5xl mx-auto mb-4">
          <button
            onClick={() => setActiveExamLevel(null)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4 text-rose-500" /> Return to Mock Tests Directory
          </button>
        </div>
        <TimedExamEngine
          initialLanguage={country === 'japan' ? 'JAPANESE' : 'KOREAN'}
          currentLevel={activeExamLevel}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      <MobileNavbar user={null} lang="en" onLangToggle={() => {}} onSearchOpen={() => {}} />

      <main className="max-w-6xl mx-auto px-3 sm:px-6 pt-16 md:pt-6 space-y-4">
        {/* Breadcrumb & Header Banner */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-2">
          <Link
            href={`/${country}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{country === 'japan' ? '🇯🇵 Japan Platform' : '🇰🇷 Korea Platform'}</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-lg text-xs font-extrabold ${
              country === 'japan' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
            }`}>
              {country === 'japan' ? '🇯🇵 JAPAN HUB' : '🇰🇷 KOREA HUB'}
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Official Mock Test Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {country === 'japan' ? 'Japanese JLPT & JFT-Basic Mock Tests' : 'Korean EPS-TOPIK & TOPIK I / II Mock Tests'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Practice official timed model examinations with auto-grading, answer keys, listening audio tracks, and detailed scorecards.
          </p>
        </div>

        {/* 🎛️ DROPDOWN FILTER RIBBON BAR */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-xs space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Search Input Box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search mock tests by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-slate-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Exam Level Dropdown Select */}
            <div className="relative">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full appearance-none px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-slate-400 transition-colors cursor-pointer pr-8"
              >
                {levelOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Difficulty Level Dropdown Select */}
            <div className="relative">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full appearance-none px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-slate-400 transition-colors cursor-pointer pr-8"
              >
                {difficultyOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 📋 MOCK TESTS DIRECTORY LISTING (Clean White Background Cards) */}
        <div className="space-y-3">
          {filteredTests.length > 0 ? (
            filteredTests.map((test, idx) => (
              <div
                key={test.id}
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 shadow-xs transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 text-white text-[11px] font-black uppercase">
                      Test #{idx + 1}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold ${
                      country === 'japan' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {test.badge}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-extrabold uppercase">
                      {test.difficulty}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900">{test.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{test.desc}</p>
                  
                  <div className="text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 inline-block">
                    {test.specs}
                  </div>
                </div>

                <button
                  onClick={() => setActiveExamLevel(test.level)}
                  className={`w-full sm:w-auto px-5 py-3 rounded-xl font-extrabold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 ${
                    country === 'japan'
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Mock Exam</span>
                </button>
              </div>
            ))
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center space-y-3">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No Matching Mock Tests</h3>
              <p className="text-xs text-slate-500">Try clearing your search query or level filters to see available tests.</p>
              <button
                onClick={() => {
                  setSelectedLevel('ALL');
                  setSelectedDifficulty('ALL');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold transition-all cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <BottomTabBar />
    </div>
  );
}
