'use client';

import React, { useState } from 'react';
import { Search, Volume2, Sparkles, BookOpen, ChevronRight, FileText, Globe, Moon, Book } from 'lucide-react';
import { JAPANESE_GRAMMAR_GUIDES, getGrammarGuide, LessonGrammarGuide } from '@/lib/grammar-guide';

export const JFTGrammarExplorer: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [readerTheme, setReaderTheme] = useState<'paper' | 'dark'>('paper'); // Default to Book / Paper Mode (White BG)

  const playPronunciation = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const currentLevelLabel = selectedLesson <= 25 ? 'N5 Basic' : 'N4 Intermediate';
  const grammarGuide = getGrammarGuide('JAPANESE', selectedLesson <= 25 ? 'N5' : 'N4', selectedLesson);

  // Filter grammar points if search query exists
  const matchingGuides = searchQuery
    ? JAPANESE_GRAMMAR_GUIDES.filter(g =>
        g.lessonTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.grammarPoints.some(pt =>
          pt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pt.pattern.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pt.explanationEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pt.explanationNepali.includes(searchQuery)
        )
      )
    : [grammarGuide];

  const isPaper = readerTheme === 'paper';

  return (
    <div className="space-y-4 sm:space-y-6 font-sans">
      {/* Header Banner */}
      <div className={`rounded-3xl p-4 sm:p-6 shadow-xl space-y-4 border transition-colors ${
        isPaper
          ? 'bg-white border-slate-200 text-slate-900 shadow-md'
          : 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-slate-800 text-white shadow-2xl'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 text-xs font-black uppercase tracking-wider">
                JFT-Basic &amp; JLPT Lessons 1–50
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-bold">
                {currentLevelLabel}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1">
                <Book className="w-3 h-3 text-emerald-400" />
                <span>Book Reading Mode</span>
              </span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-black mt-1.5 flex items-center gap-2 ${isPaper ? 'text-slate-950' : 'text-white'}`}>
              <span>📝 JFT Grammar Handbook (Lessons 1–50)</span>
            </h2>
            <p className={`text-xs sm:text-sm mt-1 ${isPaper ? 'text-slate-700 font-medium' : 'text-slate-300'}`}>
              Master essential sentence patterns, particles, verb conjugations &amp; usage rules with English &amp; Nepali explanations.
            </p>
          </div>

          {/* Controls: Lesson Dropdown & Theme Toggle */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            {/* Theme Toggle */}
            <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 shrink-0">
              <button
                onClick={() => setReaderTheme('paper')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  isPaper ? 'bg-amber-100 text-amber-950 shadow-sm font-black' : 'text-slate-400 hover:text-white'
                }`}
                title="White / Paper Book Background"
              >
                <Book className="w-3.5 h-3.5 text-amber-800" />
                <span>Book Theme</span>
              </button>
              <button
                onClick={() => setReaderTheme('dark')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  !isPaper ? 'bg-indigo-600 text-white shadow-sm font-black' : 'text-slate-400 hover:text-white'
                }`}
                title="Dark Night Background"
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark</span>
              </button>
            </div>

            {/* Lesson Selector Dropdown */}
            <select
              value={selectedLesson}
              onChange={(e) => { setSelectedLesson(Number(e.target.value)); setSearchQuery(''); }}
              className="bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-extrabold rounded-2xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 cursor-pointer shadow-inner"
            >
              {Array.from({ length: 50 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  Lesson {n} ({n <= 25 ? 'N5 Basic' : 'N4 Intermediate'})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Bar & Lesson Quick Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3 border-t border-slate-800/80">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search grammar patterns (e.g., 〜んです, から, ことができます)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {!searchQuery && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <button
                onClick={() => setSelectedLesson(Math.max(1, selectedLesson - 1))}
                disabled={selectedLesson === 1}
                className="px-3 py-1.5 rounded-xl bg-slate-100 disabled:opacity-30 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold transition-all border border-slate-700 cursor-pointer"
              >
                ← Prev Lesson
              </button>
              <span className="text-xs font-extrabold text-rose-800 px-2 font-mono">
                Lesson {selectedLesson} / 50
              </span>
              <button
                onClick={() => setSelectedLesson(Math.min(50, selectedLesson + 1))}
                disabled={selectedLesson === 50}
                className="px-3 py-1.5 rounded-xl bg-rose-800 disabled:opacity-30 hover:bg-rose-700 text-white text-xs font-bold transition-all border border-indigo-500/50 cursor-pointer shadow-glow"
              >
                Next Lesson →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grammar Rules Cards List - PAPER / BOOK THEME OR DARK THEME */}
      <div className="space-y-6">
        {matchingGuides.map((guide, gIdx) => (
          <div
            key={gIdx}
            className={`rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6 border transition-all ${
              isPaper
                ? 'bg-white border-slate-200 text-slate-900 shadow-xl'
                : 'bg-slate-900/90 border-slate-800 text-white'
            }`}
          >
            {/* Lesson Title Ribbon */}
            <div className={`flex items-center justify-between border-b pb-4 ${
              isPaper ? 'border-slate-200' : 'border-slate-800'
            }`}>
              <div>
                <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-lg border ${
                  isPaper
                    ? 'bg-rose-50 text-rose-900 border-rose-200'
                    : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                }`}>
                  Lesson {guide.lesson} • {guide.level} Grammar Syllabus
                </span>
                <h3 className={`text-xl sm:text-2xl font-black mt-2 font-jp ${
                  isPaper ? 'text-slate-950' : 'text-white'
                }`}>
                  {guide.lessonTitle}
                </h3>
              </div>
            </div>

            {/* Grammar Points Cards — 2 Column Grid Layout on Desktop (1, 2 | 3, 4) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-sans items-start">
              {guide.grammarPoints.map((pt, pIdx) => (
                <div
                  key={pIdx}
                  className={`p-5 sm:p-6 rounded-2xl border space-y-4 shadow-sm transition-all h-full flex flex-col justify-between ${
                    isPaper
                      ? 'bg-white border-slate-200 text-slate-900 hover:border-amber-400'
                      : 'bg-slate-950/80 border-slate-800 text-white'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Rule Header & Pattern Badge */}
                    <div className="space-y-2">
                      <h4 className={`text-base sm:text-lg font-black flex items-center gap-2.5 ${
                        isPaper ? 'text-slate-900' : 'text-white'
                      }`}>
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0"></span>
                        <span>{pt.title}</span>
                      </h4>
                      <div className={`inline-block px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-mono font-black border shadow-xs ${
                        isPaper
                          ? 'bg-rose-50 text-rose-900 border-rose-200 font-jp'
                          : 'bg-indigo-950/80 text-indigo-300 border-indigo-800/80'
                      }`}>
                        Pattern: {pt.pattern}
                      </div>
                    </div>

                    {/* Dual Explanations: English & Nepali */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 text-xs sm:text-sm">
                      <div className={`p-4 rounded-xl border space-y-1 ${
                        isPaper
                          ? 'bg-slate-50 border-slate-200/90 text-slate-900'
                          : 'bg-slate-900/90 border-slate-800/80 text-slate-200'
                      }`}>
                        <span className="text-[10px] font-black uppercase text-blue-700 block tracking-wider">🇬🇧 English Explanation</span>
                        <p className="font-medium leading-relaxed">{pt.explanationEnglish}</p>
                      </div>

                      <div className={`p-4 rounded-xl border space-y-1 ${
                        isPaper
                          ? 'bg-rose-50/60 border-rose-200 text-rose-950'
                          : 'bg-slate-900/90 border-slate-800/80 text-amber-200'
                      }`}>
                        <span className="text-[10px] font-black uppercase text-amber-900 block tracking-wider">🇳🇵 नेपाली व्याख्या</span>
                        <p className="font-extrabold leading-relaxed">{pt.explanationNepali}</p>
                      </div>
                    </div>
                  </div>

                  {/* Example Sentences */}
                  {pt.examples && pt.examples.length > 0 && (
                    <div className={`space-y-3 pt-3 border-t ${
                      isPaper ? 'border-slate-200' : 'border-slate-800/60'
                    }`}>
                      <span className={`text-[11px] font-black uppercase tracking-wider block ${
                        isPaper ? 'text-slate-600' : 'text-slate-400'
                      }`}>
                        Example Sentences (उदाहरण वाक्यहरू):
                      </span>
                      <div className="space-y-3">
                        {pt.examples.map((ex, eIdx) => (
                          <div
                            key={eIdx}
                            className={`p-4 rounded-xl border space-y-2 transition-all ${
                              isPaper
                                ? 'bg-slate-50 border-slate-200 text-slate-900 shadow-xs'
                                : 'bg-slate-900 border-slate-800/80 text-white'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-0.5">
                                <div className={`text-base sm:text-lg font-jp font-black leading-snug ${
                                  isPaper ? 'text-slate-950' : 'text-white'
                                }`}>
                                  {ex.target}
                                </div>
                                {ex.reading && (
                                  <div className="text-xs font-jp font-bold text-rose-700">
                                    {ex.reading}
                                  </div>
                                )}
                              </div>

                              <button
                                onClick={() => playPronunciation(ex.target)}
                                className={`p-2 rounded-xl border transition-all cursor-pointer shrink-0 ${
                                  isPaper
                                    ? 'bg-white hover:bg-rose-600 text-rose-700 hover:text-white border-rose-200 shadow-xs'
                                    : 'bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white border-slate-700'
                                }`}
                                title="Listen Japanese audio"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t ${
                              isPaper ? 'border-slate-200' : 'border-slate-800/50'
                            }`}>
                              <span className={isPaper ? 'text-slate-800 font-medium' : 'text-slate-300 font-medium'}>
                                🇬🇧 {ex.english}
                              </span>
                              <span className={isPaper ? 'text-rose-950 font-bold' : 'text-amber-300 font-medium'}>
                                🇳🇵 {ex.nepali}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
