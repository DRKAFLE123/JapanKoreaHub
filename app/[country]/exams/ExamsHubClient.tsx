'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Award, Search, Filter, Play, CheckCircle2, Sparkles, BookOpen, Layers, X, ChevronDown, LayoutList, LayoutGrid, BarChart2, Globe } from 'lucide-react';
import MobileNavbar from '@/components/layout/MobileNavbar';
import BottomTabBar from '@/components/layout/BottomTabBar';
import { TimedExamEngine } from '@/components/TimedExamEngine';

type Country = 'japan' | 'korea';

interface MockTestCatalogItem {
  id: string;
  level: string;
  title: string;
  subTitle?: string;
  specs: string;
  desc: string;
  badge: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questionsCount: number;
  durationMinutes: number;
  passScore: string;
  formatType: 'Paper Exam' | 'CBT Exam';
  hasCodePrompt?: boolean;
}

const JAPAN_MOCK_TESTS: MockTestCatalogItem[] = [
  {
    id: 'N5_SET_1',
    level: 'N5',
    title: 'JLPT N5 | Mock Test - 1 (Kana Only)',
    subTitle: 'JLPT N5 公式模擬試験 第1集 【かんじ なし・ひらがな】',
    specs: 'Approx Time : 30 mins • 15 Questions • Paper Exam',
    desc: 'Covers N5 Hiragana, basic vocabulary, and daily greetings.',
    badge: 'JLPT N5',
    difficulty: 'Easy',
    questionsCount: 15,
    durationMinutes: 30,
    passScore: '80 / 180 Pts',
    formatType: 'Paper Exam',
    hasCodePrompt: true,
  },
  {
    id: 'N5_SET_2',
    level: 'N5',
    title: 'JLPT N5 | Mock Test - 2 (Kana Only)',
    subTitle: 'JLPT N5 公式模擬試験 第2集 【かんじ なし・ひらがな】',
    specs: 'Approx Time : 30 mins • 15 Questions • Paper Exam',
    desc: 'Targeted N5 vocabulary and daily expressions drill.',
    badge: 'JLPT N5',
    difficulty: 'Easy',
    questionsCount: 15,
    durationMinutes: 30,
    passScore: '80 / 180 Pts',
    formatType: 'Paper Exam',
    hasCodePrompt: true,
  },
  {
    id: 'N5_SET_3',
    level: 'N5',
    title: 'JLPT N5 | Mock Test - 3 (Medium)',
    subTitle: 'JLPT N5 公式模擬試験 第3集 【漢字・ふりがな】',
    specs: 'Approx Time : 45 mins • 10 Questions • Paper Exam',
    desc: 'Includes N5 Kanji reading and sentence ordering questions.',
    badge: 'JLPT N5',
    difficulty: 'Medium',
    questionsCount: 10,
    durationMinutes: 45,
    passScore: '90 / 180 Pts',
    formatType: 'Paper Exam',
    hasCodePrompt: true,
  },
  {
    id: 'N5_SET_4',
    level: 'N5',
    title: 'JLPT N5 | Mock Test - 4 (Hard)',
    subTitle: 'JLPT N5 公式模擬試験 第4集 【本試験レベル】',
    specs: 'Approx Time : 45 mins • 5 Questions • Paper Exam',
    desc: 'Full-length official JLPT N5 exam difficulty simulation.',
    badge: 'JLPT N5',
    difficulty: 'Hard',
    questionsCount: 5,
    durationMinutes: 45,
    passScore: '100 / 180 Pts',
    formatType: 'Paper Exam',
    hasCodePrompt: true,
  },
  {
    id: 'N4_SET_1',
    level: 'N4',
    title: 'JLPT N4 | Mock Test - 1 (Elementary)',
    subTitle: 'JLPT N4 公式模擬試験 第1集 【初級まとめ】',
    specs: 'Approx Time : 45 mins • 12 Questions • Paper Exam',
    desc: 'Comprehensive JLPT N4 examination covering ~そうです and Keigo.',
    badge: 'JLPT N4',
    difficulty: 'Medium',
    questionsCount: 12,
    durationMinutes: 45,
    passScore: '90 / 180 Pts',
    formatType: 'Paper Exam',
    hasCodePrompt: true,
  },
  {
    id: 'N3_SET_1',
    level: 'N3',
    title: 'JLPT N3 | Mock Test - 1 (Intermediate Master)',
    subTitle: 'JLPT N3 公式模擬試験 第1集 【中級マスター】',
    specs: 'Approx Time : 60 mins • 15 Questions • Paper Exam',
    desc: 'N3 level model test covering ~につきまして, ~に関して, and workplace reading.',
    badge: 'JLPT N3',
    difficulty: 'Medium',
    questionsCount: 15,
    durationMinutes: 60,
    passScore: '95 / 180 Pts',
    formatType: 'Paper Exam',
    hasCodePrompt: true,
  },
  {
    id: 'N2_SET_1',
    level: 'N2',
    title: 'JLPT N2 | Mock Test - 1 (Business Keigo)',
    subTitle: 'JLPT N2 公式模擬試験 第1集 【ビジネス・新聞語彙】',
    specs: 'Approx Time : 105 mins • 20 Questions • Paper Exam',
    desc: 'N2 level mock exam focusing on business Japanese and news editorial reading.',
    badge: 'JLPT N2',
    difficulty: 'Hard',
    questionsCount: 20,
    durationMinutes: 105,
    passScore: '90 / 180 Pts',
    formatType: 'Paper Exam',
    hasCodePrompt: true,
  },
  {
    id: 'N1_SET_1',
    level: 'N1',
    title: 'JLPT N1 | Mock Test - 1 (Native Mastery)',
    subTitle: 'JLPT N1 公式模擬試験 第1集 【最高峰総合問題】',
    specs: 'Approx Time : 110 mins • 25 Questions • Paper Exam',
    desc: 'N1 level advanced mock test covering all 2,136 Jōyō kanji and editorial commentary.',
    badge: 'JLPT N1',
    difficulty: 'Hard',
    questionsCount: 25,
    durationMinutes: 110,
    passScore: '100 / 180 Pts',
    formatType: 'Paper Exam',
    hasCodePrompt: true,
  },
  {
    id: 'JFT_SET_1',
    level: 'JFT',
    title: 'JFT-Basic | Official CBT Simulator - 1',
    subTitle: 'JFT-Basic Prometric CBT 公式模擬試験 第1集',
    specs: 'Approx Time : 60 mins • 25 Questions • CBT Exam',
    desc: 'Official 250-point Prometric CBT simulator for SSW 1 Specified Skilled Worker visas.',
    badge: 'JFT-Basic',
    difficulty: 'Medium',
    questionsCount: 25,
    durationMinutes: 60,
    passScore: '200 / 250 Pts',
    formatType: 'CBT Exam',
    hasCodePrompt: true,
  },
];

const KOREA_MOCK_TESTS: MockTestCatalogItem[] = [
  {
    id: 'EPS_SET_1',
    level: 'EPS',
    title: 'EPS-TOPIK | Mock Test - 1 (Factory & Workplace Safety)',
    subTitle: 'EPS-TOPIK 고용허가제 공식 모의고사 제1회 【안전수칙】',
    specs: 'Approx Time : 50 mins • 20 Questions • CBT Exam',
    desc: 'HRD Korea standard CBT format covering factory vocabulary and safety signboards.',
    badge: 'EPS-TOPIK',
    difficulty: 'Easy',
    questionsCount: 20,
    durationMinutes: 50,
    passScore: '110 / 200 Pts',
    formatType: 'CBT Exam',
    hasCodePrompt: true,
  },
  {
    id: 'EPS_SET_2',
    level: 'EPS',
    title: 'EPS-TOPIK | Mock Test - 2 (Manufacturing Equipment)',
    subTitle: 'EPS-TOPIK 고용허가제 공식 모의고사 제2회 【제조업 표지판】',
    specs: 'Approx Time : 50 mins • 20 Questions • CBT Exam',
    desc: 'Targeted EPS CBT exam focusing on warning signs (출입 금지, 경고) and equipment.',
    badge: 'EPS-TOPIK',
    difficulty: 'Medium',
    questionsCount: 20,
    durationMinutes: 50,
    passScore: '110 / 200 Pts',
    formatType: 'CBT Exam',
    hasCodePrompt: true,
  },
  {
    id: 'TOPIK1_SET_1',
    level: 'TOPIK1_L1',
    title: 'TOPIK I | Mock Test - 1 (Levels 1–2 Beginner)',
    subTitle: '한국어능력시험 TOPIK I 공식 모의고사 제1회 【듣기・읽기】',
    specs: 'Approx Time : 60 mins • 30 Questions • Paper Exam',
    desc: 'Official 100% multiple-choice TOPIK I exam covering daily greetings and locations.',
    badge: 'TOPIK I',
    difficulty: 'Easy',
    questionsCount: 30,
    durationMinutes: 60,
    passScore: '80 / 200 Pts',
    formatType: 'Paper Exam',
    hasCodePrompt: true,
  },
  {
    id: 'TOPIK2_SET_1',
    level: 'TOPIK3',
    title: 'TOPIK II | Mock Test - 1 (Levels 3–6 Intermediate/Advanced)',
    subTitle: '한국어능력시험 TOPIK II 공식 모의고사 제1회 【쓰기・읽기】',
    specs: 'Approx Time : 80 mins • 25 Questions • Paper Exam',
    desc: 'Standard TOPIK II model test featuring news editorial reading and Task 53 essay writing.',
    badge: 'TOPIK II',
    difficulty: 'Hard',
    questionsCount: 25,
    durationMinutes: 80,
    passScore: '120 / 300 Pts',
    formatType: 'Paper Exam',
    hasCodePrompt: true,
  },
];

export default function ExamsHubClient({ country }: { country: Country }) {
  const [activeTab, setActiveTab] = useState<'MOCK_TEST' | 'SCORE_HISTORY'>('MOCK_TEST');
  const [viewMode, setViewMode] = useState<'LIST' | 'GRID'>('LIST');
  const [selectedCurriculumLevel, setSelectedCurriculumLevel] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [activeExamLevel, setActiveExamLevel] = useState<string | null>(null);
  const [confirmTest, setConfirmTest] = useState<MockTestCatalogItem | null>(null);

  const rawMockTests = country === 'japan' ? JAPAN_MOCK_TESTS : KOREA_MOCK_TESTS;

  const japanCurriculumLevels = [
    { id: 'ALL', label: '🌐 All Levels' },
    { id: 'N5',  label: 'JLPT N5' },
    { id: 'N4',  label: 'JLPT N4' },
    { id: 'N3',  label: 'JLPT N3' },
    { id: 'N2',  label: 'JLPT N2' },
    { id: 'N1',  label: 'JLPT N1' },
    { id: 'JFT', label: 'JFT-Basic' },
  ];

  const koreaCurriculumLevels = [
    { id: 'ALL',        label: '🌐 All Levels' },
    { id: 'EPS',        label: 'EPS-TOPIK' },
    { id: 'TOPIK1_L1',  label: 'TOPIK I (Levels 1–2)' },
    { id: 'TOPIK3',     label: 'TOPIK II (Levels 3–6)' },
  ];

  const curriculumLevels = country === 'japan' ? japanCurriculumLevels : koreaCurriculumLevels;

  const filteredTests = useMemo(() => {
    return rawMockTests.filter((test) => {
      if (selectedCurriculumLevel !== 'ALL') {
        if (test.level !== selectedCurriculumLevel) return false;
      }
      if (selectedDifficulty !== 'ALL') {
        if (test.difficulty !== selectedDifficulty) return false;
      }
      return true;
    });
  }, [rawMockTests, selectedCurriculumLevel, selectedDifficulty]);

  if (activeExamLevel) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 p-4 font-sans">
        <div className="max-w-5xl mx-auto mb-4">
          <button
            onClick={() => setActiveExamLevel(null)}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4 text-rose-500" /> Return to Mock Tests Directory
          </button>
        </div>
        <TimedExamEngine
          initialLanguage={country === 'japan' ? 'JAPANESE' : 'KOREAN'}
          currentLevel={activeExamLevel}
          autoStart={true}
          onExitExam={() => setActiveExamLevel(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      <MobileNavbar user={null} lang="en" onLangToggle={() => {}} onSearchOpen={() => {}} />

      <main className="max-w-6xl mx-auto px-2 sm:px-4 pt-16 md:pt-4 space-y-3">

        {/* 🌐 ROW 1: CURRICULUM LEVEL SELECTION BAR */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-1 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-500 whitespace-nowrap pl-1 pr-2">
            <Globe className={`w-3.5 h-3.5 ${country === 'japan' ? 'text-red-500' : 'text-blue-500'}`} />
            <span>Course:</span>
          </div>

          <div className="flex items-center gap-1.5 flex-nowrap">
            {curriculumLevels.map((lvl) => {
              const isSelected = selectedCurriculumLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => setSelectedCurriculumLevel(lvl.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap border ${
                    isSelected
                      ? country === 'japan'
                        ? 'bg-red-600 text-white shadow-xs border-red-500 font-black'
                        : 'bg-blue-600 text-white shadow-xs border-blue-500 font-black'
                      : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border-slate-200 font-bold'
                  }`}
                >
                  {lvl.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 🔝 ROW 2: TOP HEADER CONTROL BAR (Matching User Screenshot UI) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-2.5 sm:p-3 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-slate-900">
          {/* Left Pill Controls: Mock Test & Score History */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('MOCK_TEST')}
              className={`px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer border ${
                activeTab === 'MOCK_TEST'
                  ? country === 'japan' ? 'bg-red-600 text-white border-red-500 shadow-xs' : 'bg-blue-600 text-white border-blue-500 shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200 font-bold'
              }`}
            >
              Mock Test
            </button>

            <button
              onClick={() => setActiveTab('SCORE_HISTORY')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                activeTab === 'SCORE_HISTORY'
                  ? country === 'japan' ? 'bg-red-600 text-white border-red-500 font-black shadow-xs' : 'bg-blue-600 text-white border-blue-500 font-black shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Score History</span>
              <span className={`w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center ${
                activeTab === 'SCORE_HISTORY'
                  ? country === 'japan' ? 'bg-white text-red-600' : 'bg-white text-blue-600'
                  : 'bg-red-600 text-white'
              }`}>
                2
              </span>
            </button>
          </div>

          {/* Right Controls: Level/Difficulty Dropdown & List/Grid View Toggle */}
          <div className="flex items-center gap-2 justify-between sm:justify-end">
            {/* Level/Difficulty Dropdown Select */}
            <div className="relative">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="appearance-none pl-7 pr-8 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-slate-400 transition-colors cursor-pointer"
              >
                <option value="ALL">Level: All (Easy, Medium, Hard)</option>
                <option value="Easy">Easy Level Only</option>
                <option value="Medium">Medium Level Only</option>
                <option value="Hard">Hard Level Only</option>
              </select>
              <Filter className="w-3.5 h-3.5 text-rose-600 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* List / Grid View Toggle Pills */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 shrink-0">
              <button
                onClick={() => setViewMode('LIST')}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === 'LIST'
                    ? country === 'japan' ? 'bg-red-600 text-white border-red-500 font-black shadow-xs' : 'bg-blue-600 text-white border-blue-500 font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>List View</span>
              </button>

              <button
                onClick={() => setViewMode('GRID')}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === 'GRID'
                    ? country === 'japan' ? 'bg-red-600 text-white border-red-500 font-black shadow-xs' : 'bg-blue-600 text-white border-blue-500 font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </button>
            </div>
          </div>
        </div>

        {/* 📋 MOCK TESTS LISTING (Matching User Screenshot UI Cards) */}
        {activeTab === 'MOCK_TEST' ? (
          <div className={viewMode === 'GRID' ? 'grid grid-cols-1 md:grid-cols-2 gap-3' : 'space-y-3'}>
            {filteredTests.map((test) => (
              <div
                key={test.id}
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-4 sm:p-5 shadow-xs transition-all text-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Left Card Details */}
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    {test.title}
                  </h3>
                  {test.subTitle && (
                    <p className="text-xs text-slate-500 font-medium">
                      {test.subTitle}
                    </p>
                  )}

                  {/* Specs Row */}
                  <div className="flex items-center gap-3 text-xs text-amber-800 font-semibold pt-1 flex-wrap">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{test.specs}</span>
                    </span>
                  </div>
                </div>

                {/* Right Card Actions & Badges */}
                <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto shrink-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {test.hasCodePrompt && (
                      <span className="text-xs font-semibold text-slate-500">
                        Have a code? <button onClick={() => alert('Enter promotional or access code to unlock extra sets.')} className="text-red-700 font-bold hover:underline cursor-pointer">Click here</button>
                      </span>
                    )}

                    <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                      {test.badge}
                    </span>

                    <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border ${
                      test.difficulty === 'Easy'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : test.difficulty === 'Medium'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {test.difficulty}
                    </span>
                  </div>

                  <button
                    onClick={() => setConfirmTest(test)}
                    className={`w-full sm:w-auto px-5 py-2 rounded-xl font-black text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      country === 'japan'
                        ? 'bg-red-600 hover:bg-red-500 text-white border border-red-500'
                        : 'bg-blue-600 hover:bg-blue-500 text-white border border-blue-500'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Start</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* SCORE HISTORY VIEW */
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 text-center space-y-3 text-slate-900">
            <BarChart2 className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-black text-slate-900">Recent Exam Score History</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              You have completed 2 mock examinations. Pass certificates and auto-graded answer scorecards are saved below.
            </p>
            <div className="max-w-xl mx-auto space-y-2 text-left pt-2">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-slate-900">JLPT N5 Official Standard Mock Test — Set 1</p>
                  <p className="text-[11px] text-slate-500">Completed yesterday • Time spent: 24 mins</p>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs">
                  PASSED (85%)
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-slate-900">JLPT N5 Official Standard Mock Test — Set 2</p>
                  <p className="text-[11px] text-slate-500">Completed 2 days ago • Time spent: 18 mins</p>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs">
                  PASSED (90%)
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── EXAM CONFIRMATION MODAL ── */}
      {confirmTest && (
        <div className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in min-h-screen min-h-[100dvh]">
          <div className="w-full max-w-lg bg-white text-slate-900 border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 my-auto mx-auto shrink-0 font-sans">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-red-50 text-red-600 border border-red-200 text-2xl">
                  ⏱️
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-red-600 flex items-center gap-1.5">
                    <span>{confirmTest.badge}</span>
                    <span>•</span>
                    <span className="text-slate-500">{confirmTest.difficulty} Level</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">{confirmTest.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setConfirmTest(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-rose-600 text-slate-500 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Test Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="text-[10px] font-black uppercase text-slate-400 block">Duration</span>
                <span className="font-black text-slate-900 text-sm">{confirmTest.durationMinutes} Mins</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="text-[10px] font-black uppercase text-slate-400 block">Questions</span>
                <span className="font-black text-slate-900 text-sm">{confirmTest.questionsCount} Qs</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="text-[10px] font-black uppercase text-slate-400 block">Pass Target</span>
                <span className="font-black text-emerald-700 text-xs">{confirmTest.passScore}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="text-[10px] font-black uppercase text-slate-400 block">Format</span>
                <span className="font-black text-slate-900 text-xs">{confirmTest.formatType}</span>
              </div>
            </div>

            {/* Exam Rules & Instructions */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 space-y-2">
              <div className="font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <span>⚠️ Important Examination Rules</span>
              </div>
              <ul className="space-y-1.5 text-slate-800 font-medium pl-1 list-disc list-inside">
                <li>The countdown timer starts immediately upon clicking <strong>Begin Exam Now</strong>.</li>
                <li>Do not refresh or close the browser tab during the test.</li>
                <li>Auto-grading scorecards and detailed feedback are generated upon submission.</li>
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmTest(null)}
                className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-colors cursor-pointer border border-slate-200"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveExamLevel(confirmTest.level);
                  setConfirmTest(null);
                }}
                className={`flex-1 py-3 rounded-xl font-black text-xs text-white shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                  country === 'japan'
                    ? 'bg-red-600 hover:bg-red-500 border border-red-500'
                    : 'bg-blue-600 hover:bg-blue-500 border border-blue-500'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Begin Exam Now</span>
              </button>
            </div>

          </div>
        </div>
      )}

      <BottomTabBar />
    </div>
  );
}
