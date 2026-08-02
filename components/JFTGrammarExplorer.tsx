'use client';

import React, { useState } from 'react';
import { Search, Volume2, Sparkles, BookOpen, ChevronRight, FileText, Globe } from 'lucide-react';
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
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-black uppercase tracking-wider">
                JFT-Basic &amp; JLPT Lessons 1–50
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                {currentLevelLabel}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5 flex items-center gap-2">
              <span>📝 JFT Grammar Handbook (Lessons 1–50)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Master essential sentence patterns, particles, verb conjugations &amp; usage rules with English &amp; Nepali explanations.
            </p>
          </div>

          {/* Lesson Selector Dropdown */}
          <div className="flex items-center gap-2 min-w-[220px]">
            <select
              value={selectedLesson}
              onChange={(e) => { setSelectedLesson(Number(e.target.value)); setSearchQuery(''); }}
              className="bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm font-extrabold rounded-2xl px-4 py-2.5 w-full focus:outline-none focus:border-indigo-500 cursor-pointer shadow-inner"
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
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 border-t border-slate-800/80">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search grammar patterns (e.g., 〜んです, から, ことができます)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {!searchQuery && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <button
                onClick={() => setSelectedLesson(Math.max(1, selectedLesson - 1))}
                disabled={selectedLesson === 1}
                className="px-3 py-1.5 rounded-xl bg-slate-800 disabled:opacity-30 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700 cursor-pointer"
              >
                ← Prev Lesson
              </button>
              <span className="text-xs font-extrabold text-indigo-400 px-2">
                Lesson {selectedLesson} of 50
              </span>
              <button
                onClick={() => setSelectedLesson(Math.min(50, selectedLesson + 1))}
                disabled={selectedLesson === 50}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 disabled:opacity-30 hover:bg-indigo-500 text-white text-xs font-bold transition-all border border-indigo-500/50 cursor-pointer shadow-glow"
              >
                Next Lesson →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grammar Rules List */}
      <div className="space-y-4">
        {matchingGuides.map((guide, gIdx) => (
          <div key={gIdx} className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-md">
                  Lesson {guide.lesson} • {guide.level} Grammar
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                  {guide.lessonTitle}
                </h3>
              </div>
            </div>

            <div className="space-y-6">
              {guide.grammarPoints.map((pt, pIdx) => (
                <div key={pIdx} className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                  {/* Pattern Header */}
                  <div className="space-y-1.5">
                    <h4 className="text-base font-black text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                      <span>{pt.title}</span>
                    </h4>
                    <div className="inline-block px-3 py-1 rounded-xl bg-indigo-950/80 border border-indigo-800/80 text-xs sm:text-sm font-mono font-bold text-indigo-300 shadow-sm">
                      Pattern: {pt.pattern}
                    </div>
                  </div>

                  {/* Dual Explanations: English & Nepali */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1">
                      <span className="text-[10px] font-extrabold uppercase text-blue-400 block">🇬🇧 English Explanation</span>
                      <p className="text-slate-200 font-medium leading-relaxed">{pt.explanationEnglish}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1">
                      <span className="text-[10px] font-extrabold uppercase text-amber-400 block">🇳🇵 नेपाली व्याख्या</span>
                      <p className="text-amber-200 font-medium leading-relaxed">{pt.explanationNepali}</p>
                    </div>
                  </div>

                  {/* Example Sentences */}
                  {pt.examples && pt.examples.length > 0 && (
                    <div className="space-y-2.5 pt-2 border-t border-slate-800/60">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Example Sentences (उदाहरण वाक्यहरू):</span>
                      <div className="space-y-2">
                        {pt.examples.map((ex, eIdx) => (
                          <div key={eIdx} className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1.5">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="text-base sm:text-lg font-jp font-black text-white leading-snug">
                                  {ex.target}
                                </div>
                                {ex.reading && (
                                  <div className="text-xs font-jp font-bold text-rose-300">
                                    {ex.reading}
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => playPronunciation(ex.target)}
                                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-all border border-slate-700 cursor-pointer flex-shrink-0"
                                title="Listen audio"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-800/50">
                              <span className="text-slate-300 font-medium">🇬🇧 {ex.english}</span>
                              <span className="text-amber-300 font-medium">🇳🇵 {ex.nepali}</span>
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
