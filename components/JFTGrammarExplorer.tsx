'use client';

import React, { useState } from 'react';
import { Search, Volume2, Book } from 'lucide-react';
import { JAPANESE_GRAMMAR_GUIDES, getGrammarGuide, LessonGrammarGuide } from '@/lib/grammar-guide';

export const JFTGrammarExplorer: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  return (
    <div className="space-y-4 sm:space-y-6 font-sans">
      {/* Header Banner */}
      <div className="rounded-3xl p-4 sm:p-6 shadow-xs bg-white border border-slate-200 text-slate-900 space-y-4">
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
                <Book className="w-3.5 h-3.5 text-emerald-600" />
                <span>Book Reading Mode</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black mt-1.5 flex items-center gap-2 text-slate-950">
              <span>📝 JFT Grammar Handbook (Lessons 1–50)</span>
            </h2>
            <p className="text-xs sm:text-sm mt-1 text-slate-600 font-medium">
              Master essential sentence patterns, particles, verb conjugations &amp; usage rules with English &amp; Nepali explanations.
            </p>
          </div>

          {/* Lesson Selector Dropdown */}
          <div className="flex items-center gap-2.5">
            <select
              value={selectedLesson}
              onChange={(e) => { setSelectedLesson(Number(e.target.value)); setSearchQuery(''); }}
              className="bg-slate-100 border border-slate-200 text-slate-900 text-xs sm:text-sm font-extrabold rounded-2xl px-4 py-2.5 focus:outline-none focus:border-red-500 cursor-pointer shadow-xs"
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
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3 border-t border-slate-200">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search grammar patterns (e.g., 〜んです, から, ことができます)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500"
            />
          </div>

          {!searchQuery && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <button
                onClick={() => setSelectedLesson(Math.max(1, selectedLesson - 1))}
                disabled={selectedLesson === 1}
                className="px-3 py-1.5 rounded-xl bg-slate-100 disabled:opacity-30 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition-all cursor-pointer"
              >
                ← Prev Lesson
              </button>
              <span className="text-xs font-extrabold text-rose-800 px-2 font-mono">
                Lesson {selectedLesson} / 50
              </span>
              <button
                onClick={() => setSelectedLesson(Math.min(50, selectedLesson + 1))}
                disabled={selectedLesson === 50}
                className="px-3 py-1.5 rounded-xl bg-red-600 disabled:opacity-30 hover:bg-red-500 text-white text-xs font-bold transition-all border border-red-500 cursor-pointer shadow-xs"
              >
                Next Lesson →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grammar Rules Cards List - PURE LIGHT MODE */}
      <div className="space-y-6">
        {matchingGuides.map((guide, gIdx) => (
          <div
            key={gIdx}
            className="rounded-3xl p-5 sm:p-8 space-y-6 border transition-all bg-white border-slate-200 text-slate-900 shadow-xs"
          >
            {/* Lesson Title Ribbon */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-lg border bg-rose-50 text-rose-900 border-rose-200">
                  Lesson {guide.lesson} • {guide.level} Grammar Syllabus
                </span>
                <h3 className="text-xl sm:text-2xl font-black mt-2 font-jp text-slate-950">
                  {guide.lessonTitle}
                </h3>
              </div>
            </div>

            {/* Grammar Points Cards — 2 Column Grid Layout on Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-sans items-start">
              {guide.grammarPoints.map((pt, pIdx) => (
                <div
                  key={pIdx}
                  className="p-5 sm:p-6 rounded-2xl border space-y-4 shadow-xs transition-all h-full flex flex-col justify-between bg-white border-slate-200 text-slate-900 hover:border-slate-300"
                >
                  <div className="space-y-4">
                    {/* Rule Header & Pattern Badge */}
                    <div className="space-y-2">
                      <h4 className="text-base sm:text-lg font-black flex items-center gap-2.5 text-slate-900">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0"></span>
                        <span>{pt.title}</span>
                      </h4>
                      <div className="inline-block px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-mono font-black border shadow-2xs bg-rose-50 text-rose-900 border-rose-200 font-jp">
                        Pattern: {pt.pattern}
                      </div>
                    </div>

                    {/* Dual Explanations: English & Nepali */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 text-xs sm:text-sm">
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 space-y-1">
                        <span className="text-[10px] font-black uppercase text-blue-700 block tracking-wider">🇬🇧 English Explanation</span>
                        <p className="font-medium leading-relaxed text-slate-800">{pt.explanationEnglish}</p>
                      </div>

                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 space-y-1">
                        <span className="text-[10px] font-black uppercase text-rose-800 block tracking-wider">🇳🇵 नेपाली व्याख्या</span>
                        <p className="font-extrabold leading-relaxed text-slate-900">{pt.explanationNepali}</p>
                      </div>
                    </div>
                  </div>

                  {/* Example Sentences */}
                  {pt.examples && pt.examples.length > 0 && (
                    <div className="space-y-3 pt-3 border-t border-slate-200">
                      <span className="text-[11px] font-black uppercase tracking-wider block text-slate-600">
                        Example Sentences (उदाहरण वाक्यहरू):
                      </span>
                      <div className="space-y-3">
                        {pt.examples.map((ex, eIdx) => (
                          <div
                            key={eIdx}
                            className="p-4 rounded-xl border border-slate-200/90 text-slate-900 shadow-2xs bg-slate-50 space-y-2 transition-all"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-0.5">
                                <div className="text-base sm:text-lg font-jp font-black leading-snug text-slate-950">
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
                                className="p-2 rounded-xl bg-white hover:bg-red-600 text-slate-600 hover:text-white border border-slate-200 transition-all shrink-0 cursor-pointer shadow-xs"
                                title="Hear Audio"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="text-xs text-slate-700 font-medium border-t border-slate-200 pt-1.5">
                              🇬🇧 {ex.english}
                            </div>
                            <div className="text-xs text-slate-900 font-extrabold">
                              🇳🇵 {ex.nepali}
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
