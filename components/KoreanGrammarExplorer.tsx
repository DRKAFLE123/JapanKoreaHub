'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Volume2, Sparkles, BookOpen, Layers, CheckCircle2, ChevronRight, FileText, Globe, Book } from 'lucide-react';
import { KOREAN_GRAMMAR_PART1, KOREAN_GRAMMAR_PART2, TOPIK1_L1_GRAMMAR, TOPIK2_L56_GRAMMAR, KoreanGrammarPoint } from '@/lib/korean-grammar-data';
import { EPS_60_LESSONS_GRAMMAR, EPSLessonGrammar } from '@/lib/korean-eps-syllabus-grammar';

interface KoreanGrammarExplorerProps {
  level?: string;
}

export const KoreanGrammarExplorer: React.FC<KoreanGrammarExplorerProps> = ({ level }) => {
  const isEPS = level === 'EPS' || level?.startsWith('EPS_');
  const [activePart, setActivePart] = useState<'EPS_ALL' | 'EPS_L1_15' | 'EPS_L16_30' | 'EPS_L31_45' | 'EPS_L46_60' | 'TOPIK1_L1' | 'TOPIK1_L2' | 'TOPIK2_INTER' | 'TOPIK2_L56' | 'PART1' | 'PART2'>('PART1');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (isEPS) {
      setActivePart('EPS_ALL');
    } else if (level === 'TOPIK1_L1') {
      setActivePart('TOPIK1_L1');
    } else if (level === 'TOPIK2') {
      setActivePart('TOPIK1_L2');
    } else if (level === 'TOPIK3' || level === 'TOPIK4') {
      setActivePart('TOPIK2_INTER');
    } else if (level === 'TOPIK2_L5' || level === 'TOPIK2_L6') {
      setActivePart('TOPIK2_L56');
    } else {
      setActivePart('PART1');
    }
  }, [level, isEPS]);

  const currentDataset: KoreanGrammarPoint[] = useMemo(() => {
    if (activePart === 'TOPIK1_L1') {
      return TOPIK1_L1_GRAMMAR.length > 0 ? TOPIK1_L1_GRAMMAR : KOREAN_GRAMMAR_PART1.filter((rule) => rule.id <= 30);
    }
    if (activePart === 'TOPIK1_L2') {
      return KOREAN_GRAMMAR_PART1.filter((rule) => rule.id >= 31 && rule.id <= 70);
    }
    if (activePart === 'TOPIK2_INTER') {
      return [...KOREAN_GRAMMAR_PART1.filter((rule) => rule.id >= 71), ...KOREAN_GRAMMAR_PART2.filter((rule) => rule.id <= 125)];
    }
    if (activePart === 'TOPIK2_L56') {
      return TOPIK2_L56_GRAMMAR.length > 0 ? TOPIK2_L56_GRAMMAR : KOREAN_GRAMMAR_PART2.filter((rule) => rule.id >= 126);
    }
    if (activePart === 'PART2') {
      return KOREAN_GRAMMAR_PART2;
    }
    return KOREAN_GRAMMAR_PART1;
  }, [activePart]);

  const filteredEPSLessons = useMemo(() => {
    if (!isEPS) return [];
    return EPS_60_LESSONS_GRAMMAR.filter((item) => {
      let matchesPart = true;
      if (activePart === 'EPS_L1_15') matchesPart = item.lesson <= 15;
      else if (activePart === 'EPS_L16_30') matchesPart = item.lesson >= 16 && item.lesson <= 30;
      else if (activePart === 'EPS_L31_45') matchesPart = item.lesson >= 31 && item.lesson <= 45;
      else if (activePart === 'EPS_L46_60') matchesPart = item.lesson >= 46 && item.lesson <= 60;

      if (!searchQuery) return matchesPart;
      const q = searchQuery.toLowerCase();
      return (
        item.lesson.toString().includes(q) ||
        item.titleKorean.toLowerCase().includes(q) ||
        item.titleEnglish.toLowerCase().includes(q) ||
        item.titleNepali.includes(searchQuery) ||
        item.vocabularyTopic.toLowerCase().includes(q) ||
        (item.grammarPoint1 &&
          (item.grammarPoint1.title.toLowerCase().includes(q) ||
            item.grammarPoint1.pattern.toLowerCase().includes(q) ||
            item.grammarPoint1.explanationNepali.includes(searchQuery))) ||
        (item.grammarPoint2 &&
          (item.grammarPoint2.title.toLowerCase().includes(q) ||
            item.grammarPoint2.pattern.toLowerCase().includes(q) ||
            item.grammarPoint2.explanationNepali.includes(searchQuery)))
      );
    });
  }, [isEPS, activePart, searchQuery]);

  const getSyllabusHeaderInfo = () => {
    if (isEPS || activePart.startsWith('EPS_')) {
      return { title: '🎯 Official EPS-TOPIK 60-Lesson Workplace Grammar Syllabus', badge: 'EPS-TOPIK Lessons 1–60', desc: 'Strictly 60 workplace grammar rules required for the EPS-TOPIK employment exam.' };
    }
    switch (activePart) {
      case 'TOPIK1_L1':
        return { title: '⭐ TOPIK I — Level 1 Beginner Grammar Syllabus', badge: 'TOPIK 1급 Beginner', desc: 'Core 30 grammar patterns for TOPIK I Level 1 test takers.' };
      case 'TOPIK1_L2':
        return { title: '⭐⭐ TOPIK I — Level 2 Elementary Grammar Syllabus', badge: 'TOPIK 2급 Elementary', desc: 'Elementary grammar patterns for TOPIK I Level 2 mastery.' };
      case 'TOPIK2_INTER':
        return { title: '🥉 TOPIK II — Level 3/4 Intermediate Grammar Syllabus', badge: 'TOPIK 3급/4급 Intermediate', desc: 'Intermediate grammar rules for TOPIK II Reading, Listening, and Writing.' };
      case 'TOPIK2_L56':
        return { title: '🏆 TOPIK II — Level 5/6 Advanced Grammar Syllabus', badge: 'TOPIK 5급/6급 Advanced', desc: 'Advanced academic and literary grammar patterns for TOPIK II Level 5 & 6.' };
      case 'PART2':
        return { title: '🎓 Master Grammar Part 2 (Rules 101–150)', badge: 'Advanced Handbook', desc: 'Advanced 50 Korean grammar rules for complete fluency.' };
      default:
        return { title: '📘 Master Grammar Part 1 (100 Core Rules)', badge: '100 Essential Rules', desc: '100 high-frequency Korean grammar rules with English & Nepali explanations.' };
    }
  };

  const headerInfo = getSyllabusHeaderInfo();

  const playPronunciation = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredRules = currentDataset.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.id.toString().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.pattern.toLowerCase().includes(q) ||
      item.explanationEnglish.toLowerCase().includes(q) ||
      item.explanationNepali.includes(searchQuery)
    );
  });

  return (
    <div className="space-y-4 sm:space-y-6 font-sans">
      {/* Thin Left-Aligned Header Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 sm:p-4 text-white space-y-2.5 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider">
              {headerInfo.badge}
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-black">
              {isEPS ? `${filteredEPSLessons.length} Lessons` : `${currentDataset.length} Rules`}
            </span>
            <h2 className="text-base sm:text-lg font-black text-white w-full sm:w-auto">
              {headerInfo.title}
            </h2>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search grammar & lessons...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Syllabus Switcher Pills (Left Aligned) */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-1 pb-0.5 no-scrollbar">
          {isEPS ? (
            /* EPS Lesson Range Filter Pills (Strictly EPS Only) */
            <>
              <button
                onClick={() => { setActivePart('EPS_ALL'); setSearchQuery(''); }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer shrink-0 ${
                  activePart === 'EPS_ALL' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white bg-slate-800/80'
                }`}
              >
                <span>🎯 All 60 EPS Lessons</span>
              </button>
              <button
                onClick={() => { setActivePart('EPS_L1_15'); setSearchQuery(''); }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer shrink-0 ${
                  activePart === 'EPS_L1_15' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white bg-slate-800/80'
                }`}
              >
                <span>Lessons 1–15 (Greetings & Basics)</span>
              </button>
              <button
                onClick={() => { setActivePart('EPS_L16_30'); setSearchQuery(''); }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer shrink-0 ${
                  activePart === 'EPS_L16_30' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white bg-slate-800/80'
                }`}
              >
                <span>Lessons 16–30 (Daily & Workplace)</span>
              </button>
              <button
                onClick={() => { setActivePart('EPS_L31_45'); setSearchQuery(''); }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer shrink-0 ${
                  activePart === 'EPS_L31_45' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white bg-slate-800/80'
                }`}
              >
                <span>Lessons 31–45 (Tools & Safety)</span>
              </button>
              <button
                onClick={() => { setActivePart('EPS_L46_60'); setSearchQuery(''); }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer shrink-0 ${
                  activePart === 'EPS_L46_60' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white bg-slate-800/80'
                }`}
              >
                <span>Lessons 46–60 (Work Life & Industry)</span>
              </button>
            </>
          ) : (
            /* General / TOPIK Switcher Pills */
            <>
              <button
                onClick={() => { setActivePart('TOPIK1_L1'); setSearchQuery(''); }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer shrink-0 ${
                  activePart === 'TOPIK1_L1' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-400 hover:text-white bg-slate-800/80'
                }`}
              >
                <span>⭐ TOPIK 1급</span>
              </button>

              <button
                onClick={() => { setActivePart('TOPIK1_L2'); setSearchQuery(''); }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer shrink-0 ${
                  activePart === 'TOPIK1_L2' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white bg-slate-800/80'
                }`}
              >
                <span>⭐⭐ TOPIK 2급</span>
              </button>

              <button
                onClick={() => { setActivePart('TOPIK2_INTER'); setSearchQuery(''); }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer shrink-0 ${
                  activePart === 'TOPIK2_INTER' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white bg-slate-800/80'
                }`}
              >
                <span>🥉 TOPIK 3/4급</span>
              </button>

              <button
                onClick={() => { setActivePart('TOPIK2_L56'); setSearchQuery(''); }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer shrink-0 ${
                  activePart === 'TOPIK2_L56' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-white bg-slate-800/80'
                }`}
              >
                <span>🏆 TOPIK 5/6급</span>
              </button>

              <button
                onClick={() => { setActivePart('PART1'); setSearchQuery(''); }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer shrink-0 ${
                  activePart === 'PART1' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-400 hover:text-white bg-slate-800/80'
                }`}
              >
                <span>📖 All 100 Rules</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Rules Count Header */}
      <div className="flex items-center justify-between px-2">
        <span className="text-xs font-bold text-slate-400">
          Showing {isEPS ? filteredEPSLessons.length : filteredRules.length} {isEPS ? 'Official EPS Chapters' : 'Syllabus Grammar Rules'}
        </span>
        <span className="text-[11px] font-black text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full">
          {headerInfo.badge}
        </span>
      </div>

      {/* Rules List (Compact Book Page 2-Column Grid Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4">
        {isEPS ? (
          /* Render EPS Official 60-Lesson Cards */
          filteredEPSLessons.map((item) => (
            <div
              key={item.lesson}
              className="bg-white text-slate-900 border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3 font-sans hover:border-emerald-500/60 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                {/* Header / Title & Vocabulary Topic */}
                <div className="space-y-1.5 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-black uppercase tracking-wider">
                      Lesson {item.lesson} • Book {item.book}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">HRD Korea EPS</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                    과 {item.lesson}: {item.titleKorean}
                  </h3>
                  <div className="text-xs font-bold text-emerald-800">
                    🇬🇧 {item.titleEnglish} • 🇳🇵 {item.titleNepali}
                  </div>
                  <div className="inline-block px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200 text-[11px] font-sans font-extrabold text-teal-950">
                    📚 Vocab Topic: {item.vocabularyTopic}
                  </div>
                </div>

                {/* Preparatory Note for Lessons 1–5 vs Formal Grammar Points for Lessons 6–60 */}
                {item.isPreparatory ? (
                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
                    <div className="font-extrabold text-amber-950 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                      <span>Preparatory Orientation (예비편)</span>
                    </div>
                    <p className="text-slate-800 text-[11px] font-medium leading-relaxed">
                      {item.preparatoryNote}
                    </p>
                    <div className="text-[10px] font-black text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-lg inline-block">
                      🎯 Formal HRD Grammar starts from Lesson 6 (입니다 / 입니까?)
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Grammar Point 1 */}
                    {item.grammarPoint1 && (
                      <div className="p-3 rounded-xl bg-amber-50/40 border border-amber-200/80 space-y-2 text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-black text-amber-900 text-xs">
                            1. {item.grammarPoint1.title}
                          </span>
                          <span className="px-2 py-0.5 bg-amber-200/80 text-amber-950 rounded-md font-mono text-[10px] font-black">
                            {item.grammarPoint1.pattern}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                          <div className="text-slate-800 font-medium">🇬🇧 {item.grammarPoint1.explanationEnglish}</div>
                          <div className="text-amber-900 font-bold">🇳🇵 {item.grammarPoint1.explanationNepali}</div>
                        </div>

                        {item.grammarPoint1.example && (
                          <div className="p-2 rounded-lg bg-white border border-slate-200/80 flex items-start justify-between gap-2 text-[11px]">
                            <div>
                              <div className="font-black text-slate-900 font-kr">{item.grammarPoint1.example.korean}</div>
                              <div className="text-[10px] font-bold text-emerald-700 italic">{item.grammarPoint1.example.romanization}</div>
                              <div className="text-[10px] text-slate-700">🇬🇧 {item.grammarPoint1.example.english} • 🇳🇵 {item.grammarPoint1.example.nepali}</div>
                            </div>
                            <button
                              onClick={() => playPronunciation(item.grammarPoint1!.example!.korean)}
                              className="p-1 rounded-md bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 cursor-pointer shrink-0 transition-all"
                              title="Listen audio"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Grammar Point 2 (If present) */}
                    {item.grammarPoint2 && (
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-black text-slate-900 text-xs">
                            2. {item.grammarPoint2.title}
                          </span>
                          <span className="px-2 py-0.5 bg-slate-200 text-slate-900 rounded-md font-mono text-[10px] font-black">
                            {item.grammarPoint2.pattern}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                          <div className="text-slate-800 font-medium">🇬🇧 {item.grammarPoint2.explanationEnglish}</div>
                          <div className="text-amber-900 font-bold">🇳🇵 {item.grammarPoint2.explanationNepali}</div>
                        </div>

                        {item.grammarPoint2.example && (
                          <div className="p-2 rounded-lg bg-white border border-slate-200/80 flex items-start justify-between gap-2 text-[11px]">
                            <div>
                              <div className="font-black text-slate-900 font-kr">{item.grammarPoint2.example.korean}</div>
                              <div className="text-[10px] font-bold text-emerald-700 italic">{item.grammarPoint2.example.romanization}</div>
                              <div className="text-[10px] text-slate-700">🇬🇧 {item.grammarPoint2.example.english} • 🇳🇵 {item.grammarPoint2.example.nepali}</div>
                            </div>
                            <button
                              onClick={() => playPronunciation(item.grammarPoint2!.example!.korean)}
                              className="p-1 rounded-md bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 cursor-pointer shrink-0 transition-all"
                              title="Listen audio"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          /* Render General / TOPIK Grammar Cards */
          filteredRules.map((rule) => (
            <div
              key={rule.id}
              className="bg-white text-slate-900 border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3 font-sans hover:border-emerald-500/60 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                {/* Header / Title & Pattern */}
                <div className="space-y-1.5 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-black uppercase tracking-wider">
                      Rule #{rule.id} • {rule.level}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">Book Page Format</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                    {rule.title}
                  </h3>
                  {rule.pattern && (
                    <div className="inline-block px-2.5 py-1 rounded-lg bg-amber-100/90 border border-amber-300/80 text-[11px] font-mono font-bold text-amber-950">
                      Pattern: {rule.pattern}
                    </div>
                  )}
                </div>

                {/* Dual Explanations: English & Nepali */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                    <span className="text-[9px] font-black uppercase tracking-wide text-cyan-800 block">🇬🇧 English</span>
                    <p className="text-slate-800 font-medium leading-relaxed font-sans text-[11px]">{rule.explanationEnglish}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-0.5">
                    <span className="text-[9px] font-black uppercase tracking-wide text-amber-900 block">🇳🇵 नेपाली</span>
                    <p className="text-amber-900 font-bold leading-relaxed text-[11px]">{rule.explanationNepali}</p>
                  </div>
                </div>

                {/* Example Sentences */}
                {rule.examples && rule.examples.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
                      Examples (उदाहरणहरू):
                    </span>
                    <div className="space-y-1.5">
                      {rule.examples.map((ex, eIdx) => (
                        <div key={eIdx} className="p-2.5 rounded-xl bg-amber-50/30 border border-slate-200/80 space-y-1 text-xs">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="text-sm font-black text-slate-900 font-kr leading-snug">
                                {ex.target}
                              </div>
                              {ex.romanization && (
                                <div className="text-[10px] font-bold text-emerald-700 italic">
                                  {ex.romanization}
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => playPronunciation(ex.target)}
                              className="p-1.5 rounded-lg bg-white hover:bg-emerald-600 text-slate-600 hover:text-white transition-all border border-slate-200 cursor-pointer flex-shrink-0 shadow-xs"
                              title="Listen audio"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] pt-1 border-t border-slate-200/60">
                            <span className="text-slate-800 font-medium">🇬🇧 {ex.english}</span>
                            <span className="text-amber-900 font-bold">🇳🇵 {ex.nepali}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
