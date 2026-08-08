'use client';

import React, { useState, useEffect } from 'react';
import {
  BookOpen, Search, Volume2, ChevronDown, ChevronRight, ChevronLeft, MessageSquare, Globe, Award, ListFilter, BookCheck, X, FileText, Printer, Book, Check
} from 'lucide-react';
import {
  KOREAN_VOCAB_DATA, KoreanVocabItem, EPS_LESSON_TITLES,
  getKoreanVocabByLevel, getKoreanVocabByLevelAndLesson,
  getAvailableKoreanLevels, getAvailableKoreanLessons
} from '@/lib/korean-vocab';
import { getGrammarGuide, LessonGrammarGuide } from '@/lib/grammar-guide';

const LEVEL_LABELS: Record<KoreanVocabItem['level'], string> = {
  EPS: 'EPS-TOPIK (60 Complete Lessons)',
  EPS_MFG: 'EPS Manufacturing (제조업)',
  EPS_AGR: 'EPS Agriculture (농업)',
  EPS_CON: 'EPS Construction (건설업)',
  EPS_FISH: 'EPS Fishing (어업)',
  EPS_SAFETY: 'EPS Workplace Safety (산업안전)',
  TOPIK1_L1: 'TOPIK I Level 1 (Beginner)',
  TOPIK2: 'TOPIK I Level 2 (Elementary)',
  TOPIK3: 'TOPIK II Level 3 (Intermediate)',
  TOPIK4: 'TOPIK II Level 4 (Upper-Intermediate)',
  TOPIK2_L5: 'TOPIK II Level 5 (Advanced)',
  TOPIK2_L6: 'TOPIK II Level 6 (Near-Native)',
};

const TOPIK_LESSON_TOPICS: Record<string, string> = {
  'TOPIK2-1': 'Expressing Opinions',
  'TOPIK2-2': 'Describing Changes',
  'TOPIK2-3': 'Expressing Conditions',
  'TOPIK2-4': 'Expressing Emotions',
  'TOPIK2-5': 'Korean Culture & Society',
  'TOPIK3-1': 'Abstract Thinking',
  'TOPIK3-2': 'Economics & Society',
  'TOPIK3-3': 'Environment',
  'TOPIK3-4': 'Technology & Media',
  'TOPIK4-1': 'Academic Writing',
  'TOPIK4-2': 'Advanced Grammar Structures',
  'TOPIK4-3': 'Political & Social Discourse',
};

export interface KoreanVocabularyExplorerProps {
  preselectedLevel?: KoreanVocabItem['level'];
}

export const KoreanVocabularyExplorer: React.FC<KoreanVocabularyExplorerProps> = ({ preselectedLevel }) => {
  const [selectedLevel, setSelectedLevel] = useState<KoreanVocabItem['level']>(preselectedLevel || 'EPS');
  const [selectedLesson, setSelectedLesson] = useState<number>(1);
  const [activeLessonTab, setActiveLessonTab] = useState<'VOCAB' | 'GRAMMAR'>('VOCAB');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedGrammar, setExpandedGrammar] = useState<string | null>(null);
  const [showGrammarModal, setShowGrammarModal] = useState<boolean>(false);
  const [showShortNoteModal, setShowShortNoteModal] = useState<boolean>(false);
  const [mobileLessonMenuOpen, setMobileLessonMenuOpen] = useState<boolean>(false);

  const mainRef = React.useRef<HTMLDivElement | null>(null);
  const vocabListRef = React.useRef<HTMLDivElement | null>(null);
  const grammarListRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (preselectedLevel) {
      setSelectedLevel(preselectedLevel);
      setSelectedLesson(1);
      setActiveLessonTab('VOCAB');
    }
  }, [preselectedLevel]);

  // Auto instant scroll to top of new lesson (Item #1) inside container when selectedLesson changes
  useEffect(() => {
    if (vocabListRef.current) vocabListRef.current.scrollTop = 0;
    if (grammarListRef.current) grammarListRef.current.scrollTop = 0;
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, [selectedLesson]);

  const availableLessons = getAvailableKoreanLessons(selectedLevel);
  const lessonVocab = getKoreanVocabByLevelAndLesson(selectedLevel, selectedLesson);
  const allLevelVocab = getKoreanVocabByLevel(selectedLevel);
  const grammarGuide = getGrammarGuide('KOREAN', selectedLevel, selectedLesson);

  const filteredVocab = searchQuery
    ? allLevelVocab.filter(v =>
        v.word.includes(searchQuery) ||
        v.romanization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.meaningNepali.includes(searchQuery)
      )
    : lessonVocab;

  const playPronunciation = (word: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'ko-KR';
      window.speechSynthesis.speak(utterance);
    }
  };

  const getLessonTitle = (level: KoreanVocabItem['level'], lessonNum: number): string => {
    if (level === 'EPS' || level?.startsWith('EPS_')) {
      return EPS_LESSON_TITLES[lessonNum] || `Lesson ${lessonNum}`;
    }
    return TOPIK_LESSON_TOPICS[`${level}-${lessonNum}`] || `Lesson ${lessonNum}`;
  };

  return (
    <div className="w-full font-sans space-y-4 sm:space-y-5">
      {/* (Top Banner Removed for Clean Full-Width Display) */}

      {/* Main 2-Column Layout: Left Lessons Sidebar + Right White Book Page Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 items-start">
          {/* Left Column: Lessons Sidebar (Japanese Style) */}
          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 text-slate-900 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-emerald-600 uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>LESSONS</span>
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {availableLessons.length} Total
              </span>
            </div>

            {/* Mobile Dropdown Quick Selector (Custom Bounded Picker) */}
            <div className="block lg:hidden relative w-full pb-1 z-30">
              <button
                type="button"
                onClick={() => setMobileLessonMenuOpen(!mobileLessonMenuOpen)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-black text-slate-900 flex items-center justify-between shadow-xs cursor-pointer"
              >
                <span className="truncate">
                  Lesson {selectedLesson}: {getLessonTitle(selectedLevel, selectedLesson)}
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${mobileLessonMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileLessonMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40 bg-slate-950/20" onClick={() => setMobileLessonMenuOpen(false)} />
                  <div className="absolute top-full left-0 right-0 mt-1 w-full max-w-full bg-white border border-slate-200 rounded-2xl p-1.5 shadow-2xl z-50 max-h-64 overflow-y-auto space-y-1 text-slate-900">
                    {availableLessons.map((n) => {
                      const isSel = selectedLesson === n;
                      const title = getLessonTitle(selectedLevel, n);
                      return (
                        <button
                          key={n}
                          type="button"
                          onClick={() => {
                            setSelectedLesson(n);
                            setSearchQuery('');
                            setExpandedGrammar(null);
                            setMobileLessonMenuOpen(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl text-xs font-extrabold flex items-center justify-between gap-2 cursor-pointer ${
                            isSel ? 'bg-emerald-600 text-white font-black shadow-xs' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                        >
                          <span className="truncate">Lesson {n}: {title}</span>
                          {isSel && <Check className="w-3.5 h-3.5 shrink-0 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Scrollable Lesson Items List */}
            <div className="hidden lg:block max-h-[580px] sm:max-h-[640px] overflow-y-auto space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {availableLessons.map((n) => {
              const isSelected = selectedLesson === n;
              const title = getLessonTitle(selectedLevel, n);
              return (
                <button
                  key={n}
                  onClick={() => {
                    setSelectedLesson(n);
                    setSearchQuery('');
                    setExpandedGrammar(null);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white font-black shadow-xs border-l-4 border-emerald-400'
                      : 'bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-6 h-6 rounded-full font-black text-[11px] flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-white text-emerald-800 shadow-xs' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {n}
                    </span>
                    <span className="truncate text-[11px] font-bold">
                      {title}
                    </span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isSelected ? 'text-white translate-x-0.5' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: White Book Paper Mode Reading Content */}
        <div id="korean-vocab-content-area" ref={mainRef} className="lg:col-span-3 bg-white text-slate-900 border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 font-sans scroll-mt-24">
          {/* Header & In-Page View Switcher Tabs (Vocab vs Grammar) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-200">
            <div>
              <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-emerald-700">
                {LEVEL_LABELS[selectedLevel]}
              </div>
              <h2 className="text-base sm:text-xl font-black text-slate-900 mt-0.5">
                {searchQuery ? 'Search Results' : `Lesson ${selectedLesson}: ${getLessonTitle(selectedLevel, selectedLesson)}`}
              </h2>

              {/* Small text links below lesson title */}
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <button
                  onClick={() => setShowShortNoteModal(true)}
                  className="text-[11px] font-bold text-teal-700 hover:text-teal-900 hover:underline flex items-center gap-1 cursor-pointer bg-teal-50 hover:bg-teal-100 px-2 py-0.5 rounded-md border border-teal-200/80 transition-colors"
                >
                  <FileText className="w-3 h-3 text-teal-600" />
                  <span>Meaning Note</span>
                </button>

                <button
                  onClick={() => setShowGrammarModal(true)}
                  className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 hover:underline flex items-center gap-1 cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200/80 transition-colors"
                >
                  <BookCheck className="w-3 h-3 text-emerald-600" />
                  <span>Grammar Note</span>
                </button>
              </div>
            </div>

            {/* In-Page Tab Switcher (Vocabulary vs Grammar) */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/80 self-stretch sm:self-auto justify-center">
              <button
                onClick={() => setActiveLessonTab('VOCAB')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeLessonTab === 'VOCAB'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Book className="w-3.5 h-3.5" />
                <span>Vocabulary ({filteredVocab.length})</span>
              </button>

              <button
                onClick={() => setActiveLessonTab('GRAMMAR')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeLessonTab === 'GRAMMAR'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookCheck className="w-3.5 h-3.5" />
                <span>Chapter Grammar ({grammarGuide?.grammarPoints.length || 0})</span>
              </button>
            </div>
          </div>

          {/* Search Bar for Vocabulary View */}
          {activeLessonTab === 'VOCAB' && (
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search Korean / English / Nepali..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 transition-all font-sans"
              />
            </div>
          )}

          {/* ────────────────────────────────────────────────────────────
              TAB 1: VOCABULARY VIEW (White Compact Book Grid)
          ──────────────────────────────────────────────────────────── */}
          {activeLessonTab === 'VOCAB' && (
            <div ref={vocabListRef} className="max-h-[620px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
              {filteredVocab.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs font-semibold">
                  No matching vocabulary found for this lesson.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-3">
                  {filteredVocab.map((vocab, vIdx) => (
                    <div
                      key={vocab.id}
                      className="bg-white border border-slate-200/90 hover:border-emerald-500/80 rounded-xl p-2.5 sm:p-3 transition-all shadow-xs hover:shadow-md space-y-1.5 group font-sans flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-1.5">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="w-5 h-5 rounded-md bg-emerald-100 border border-emerald-300 text-emerald-950 font-black text-[10px] flex items-center justify-center shrink-0">
                              {vIdx + 1}
                            </span>
                            <span className="text-base sm:text-lg font-black font-kr text-slate-900 leading-none truncate">
                              {vocab.word}
                            </span>
                            <button
                              onClick={() => playPronunciation(vocab.word)}
                              className="p-1 rounded-md bg-slate-100 hover:bg-emerald-600 text-slate-600 hover:text-white border border-slate-200 transition-all cursor-pointer shrink-0"
                              title="Play pronunciation"
                            >
                              <Volume2 className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-[9px] px-1.5 py-0.5 rounded font-black bg-emerald-100 text-emerald-900 border border-emerald-300 shrink-0">
                            {vocab.partOfSpeech || `L${vocab.lesson}`}
                          </span>
                        </div>

                        <div className="text-[11px] font-bold text-emerald-700 italic leading-none">
                          {vocab.romanization}
                        </div>

                        <div className="text-xs font-bold text-slate-800 pt-0.5 space-y-0.5">
                          <div className="text-slate-900">🇬🇧 {vocab.meaning}</div>
                          <div className="text-amber-900 font-black">🇳🇵 {vocab.meaningNepali}</div>
                        </div>
                      </div>

                      {vocab.grammarSentences && vocab.grammarSentences.length > 0 && (
                        <div className="pt-1 border-t border-slate-100">
                          <button
                            onClick={() => setExpandedGrammar(expandedGrammar === vocab.id ? null : vocab.id)}
                            className="flex items-center gap-1 text-[10px] text-emerald-700 hover:text-emerald-800 font-extrabold transition-colors cursor-pointer"
                          >
                            <MessageSquare className="w-2.5 h-2.5" />
                            <span>{expandedGrammar === vocab.id ? 'Hide example' : 'Show example'}</span>
                            <ChevronDown className={`w-2.5 h-2.5 transition-transform ${expandedGrammar === vocab.id ? 'rotate-180' : ''}`} />
                          </button>

                          {expandedGrammar === vocab.id && vocab.grammarSentences.map((gs, idx) => (
                            <div key={idx} className="mt-1.5 p-2 rounded-lg bg-amber-50/60 border border-amber-200/80 space-y-1 text-[11px]">
                              <div className="flex items-start justify-between gap-1">
                                <div className="font-kr font-black text-slate-900 text-xs">{gs.korean}</div>
                                <button
                                  onClick={() => playPronunciation(gs.korean)}
                                  className="p-0.5 rounded bg-white text-slate-600 hover:text-emerald-600 border border-slate-200 shrink-0 cursor-pointer"
                                >
                                  <Volume2 className="w-2.5 h-2.5" />
                                </button>
                              </div>
                              <div className="text-[10px] text-slate-500 italic">{gs.romanization}</div>
                              <div className="text-[10px] text-slate-800">🇬🇧 {gs.english}</div>
                              <div className="text-[10px] text-amber-900 font-bold">🇳🇵 {gs.nepali}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ────────────────────────────────────────────────────────────
              TAB 2: CHAPTER-WISE GRAMMAR VIEW (White Book Paper Mode)
          ──────────────────────────────────────────────────────────── */}
          {activeLessonTab === 'GRAMMAR' && (
            <div ref={grammarListRef} className="max-h-[620px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300 space-y-4 font-sans">
              <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-950 font-bold flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <BookCheck className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>Official HRD Korea Lesson {selectedLesson} Grammar Syllabus</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-700 text-white font-black text-[10px]">
                  Lesson {selectedLesson}
                </span>
              </div>

              {!grammarGuide || grammarGuide.grammarPoints.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs font-semibold">
                  No grammar rules for this lesson.
                </div>
              ) : (
                <div className="space-y-4">
                  {grammarGuide.grammarPoints.map((point, idx) => (
                    <div key={idx} className="bg-amber-50/50 border border-amber-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3 font-sans">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/60 pb-2.5">
                        <h3 className="text-sm sm:text-base font-black text-slate-900 font-kr leading-snug">
                          {point.title}
                        </h3>
                        <span className="self-start sm:self-auto px-2.5 py-1 rounded-lg bg-amber-200/80 text-amber-950 font-mono text-xs font-black border border-amber-300">
                          {point.pattern}
                        </span>
                      </div>

                      {/* Explanations in English & Nepali */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1">
                          <span className="text-[10px] font-black uppercase text-cyan-800 block tracking-wider">🇬🇧 English Explanation</span>
                          <p className="text-slate-800 font-medium leading-relaxed">{point.explanationEnglish}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-amber-100/60 border border-amber-300/80 space-y-1">
                          <span className="text-[10px] font-black uppercase text-amber-950 block tracking-wider">🇳🇵 नेपाली व्याख्या</span>
                          <p className="text-amber-950 font-extrabold leading-relaxed">{point.explanationNepali}</p>
                        </div>
                      </div>

                      {/* Examples */}
                      {point.examples && point.examples.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-amber-200/60">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                            Workplace Examples (उदाहरणहरू):
                          </span>
                          <div className="space-y-2">
                            {point.examples.map((ex, eIdx) => (
                              <div key={eIdx} className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-start justify-between gap-2 text-xs shadow-xs">
                                <div className="space-y-1">
                                  <div className="text-sm font-black text-slate-900 font-kr">{ex.target}</div>
                                  {ex.reading && <div className="text-[10px] font-bold text-emerald-700 italic">{ex.reading}</div>}
                                  <div className="text-xs text-slate-800">🇬🇧 {ex.english}</div>
                                  <div className="text-xs text-amber-900 font-bold">🇳🇵 {ex.nepali}</div>
                                </div>
                                <button
                                  onClick={() => playPronunciation(ex.target)}
                                  className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 transition-all shrink-0 cursor-pointer"
                                  title="Play audio"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bottom Lesson Navigation Bar (Direct Next/Prev Lesson Move) */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-2 font-sans">
            <button
              onClick={() => {
                const idx = availableLessons.indexOf(selectedLesson);
                if (idx > 0) {
                  setSelectedLesson(availableLessons[idx - 1]);
                  setSearchQuery('');
                  setExpandedGrammar(null);
                  setActiveLessonTab('VOCAB');
                }
              }}
              disabled={availableLessons.indexOf(selectedLesson) <= 0}
              className="px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-slate-100 disabled:opacity-30 hover:bg-slate-200 text-slate-800 text-xs font-black flex items-center gap-1.5 transition-all border border-slate-200 cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev Lesson</span>
            </button>

            <div className="text-[11px] font-black text-slate-500 hidden xs:block">
              Lesson {selectedLesson} of {availableLessons[availableLessons.length - 1]}
            </div>

            <button
              onClick={() => {
                const idx = availableLessons.indexOf(selectedLesson);
                if (idx < availableLessons.length - 1) {
                  setSelectedLesson(availableLessons[idx + 1]);
                  setSearchQuery('');
                  setExpandedGrammar(null);
                  setActiveLessonTab('VOCAB');
                }
              }}
              disabled={availableLessons.indexOf(selectedLesson) >= availableLessons.length - 1}
              className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 text-white text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <span>Next Lesson</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Korean Grammar Explanation Modal (White Book Paper Mode) */}
      {showGrammarModal && grammarGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-[94vw] sm:w-full max-w-3xl bg-white text-slate-900 border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[88vh] overflow-y-auto font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-emerald-800">
                  Korean Grammar Explanation Guide (한국어 문법 해설)
                </div>
                <h3 className="text-base sm:text-xl font-black text-slate-900 mt-0.5">
                  Lesson {selectedLesson}: {grammarGuide.lessonTitle}
                </h3>
              </div>
              <button
                onClick={() => setShowGrammarModal(false)}
                className="p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-rose-600 text-slate-500 hover:text-white border border-slate-200 transition-all flex-shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {grammarGuide.grammarPoints.map((point, idx) => (
                <div key={idx} className="bg-amber-50/50 p-4 sm:p-5 rounded-2xl border border-amber-200/90 space-y-3 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-sm sm:text-base font-black text-slate-900 font-kr">{point.title}</h4>
                    <span className="self-start sm:self-auto px-2.5 py-1 rounded-lg bg-amber-200/80 text-amber-950 border border-amber-300 text-xs font-mono font-black">
                      {point.pattern}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 border-t border-amber-200/60">
                    <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                      <span className="text-[10px] font-black uppercase tracking-wider text-cyan-800 block">🇬🇧 English Explanation</span>
                      <p className="text-slate-800 font-medium leading-relaxed mt-0.5">{point.explanationEnglish}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-100/60 border border-amber-300/80">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-950 block">🇳🇵 नेपाली व्याख्या</span>
                      <p className="text-amber-950 font-extrabold leading-relaxed mt-0.5">{point.explanationNepali}</p>
                    </div>
                  </div>

                  {point.examples.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-amber-200/60">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Example Sentences</span>
                      {point.examples.map((ex, eIdx) => (
                        <div key={eIdx} className="bg-white p-3 rounded-xl border border-slate-200/80 flex items-start justify-between gap-2 shadow-xs">
                          <div className="space-y-1">
                            <div className="text-sm font-black font-kr text-slate-900">{ex.target}</div>
                            {ex.reading && <div className="text-[10px] font-bold text-emerald-700 italic">{ex.reading}</div>}
                            <div className="text-xs text-slate-800">🇬🇧 {ex.english}</div>
                            <div className="text-xs text-amber-900 font-bold">🇳🇵 {ex.nepali}</div>
                          </div>
                          <button
                            onClick={() => playPronunciation(ex.target)}
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 transition-all flex-shrink-0 cursor-pointer"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 text-right">
              <button
                onClick={() => setShowGrammarModal(false)}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all cursor-pointer"
              >
                Close Grammar Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Textbook Korean Vocab Short Note Modal (4-column sheet view) */}
      {showShortNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in print:p-0 print:bg-white">
          <div className="w-[96vw] sm:w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col print:max-h-none print:w-full print:border-none print:shadow-none print:bg-white print:text-black text-white">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 print:hidden">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Lesson {selectedLesson} Korean Vocab Short Note (과별 어휘 정리)
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {selectedLevel === 'EPS' ? `EPS-TOPIK Lesson ${selectedLesson}` : selectedLevel}: {getLessonTitle(selectedLevel, selectedLesson)} ({lessonVocab.length} Words)
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Print / Save PDF"
                >
                  <Printer className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">Print / PDF</span>
                </button>
                <button
                  onClick={() => setShowShortNoteModal(false)}
                  className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Print Header */}
            <div className="hidden print:block text-center mb-4">
              <h1 className="text-2xl font-bold text-black">Lesson {selectedLesson} 어휘 정리 Sheet</h1>
              <p className="text-sm text-gray-700">EPS-TOPIK Korean Vocabulary Reference Sheet ({lessonVocab.length} words)</p>
            </div>

            {/* 4-Column Table Sheet */}
            <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent border border-slate-800 rounded-xl bg-slate-950/60 print:bg-white print:border-black">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 z-10 bg-slate-950 border-b border-slate-800 text-[11px] sm:text-xs text-emerald-400 font-extrabold uppercase tracking-wider print:bg-gray-100 print:text-black print:border-black">
                  <tr>
                    <th className="py-2.5 px-3.5 w-1/4 border-r border-slate-800/60 print:border-black">1. Hangul (한국어)</th>
                    <th className="py-2.5 px-3.5 w-1/4 border-r border-slate-800/60 print:border-black">2. Pronunciation (발음)</th>
                    <th className="py-2.5 px-3.5 w-1/4 border-r border-slate-800/60 print:border-black">3. English Meaning</th>
                    <th className="py-2.5 px-3.5 w-1/4 text-amber-400 print:text-black">4. Nepali Meaning (नेपाली अर्थ)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs font-sans print:divide-black">
                  {lessonVocab.map((v, i) => (
                    <tr
                      key={v.id || i}
                      onClick={() => playPronunciation(v.word)}
                      className="hover:bg-emerald-950/30 transition-colors cursor-pointer group print:hover:bg-transparent"
                    >
                      <td className="py-2.5 px-3.5 font-kr font-bold text-emerald-300 group-hover:text-emerald-200 text-sm border-r border-slate-800/40 print:text-black print:border-black">
                        {v.word}
                      </td>
                      <td className="py-2.5 px-3.5 text-slate-300 italic border-r border-slate-800/40 print:text-black print:border-black">
                        {v.romanization}
                      </td>
                      <td className="py-2.5 px-3.5 text-slate-200 font-medium border-r border-slate-800/40 print:text-black print:border-black">
                        {v.meaning}
                      </td>
                      <td className="py-2.5 px-3.5 text-amber-300 font-semibold print:text-black">
                        {v.meaningNepali}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div className="pt-2 sm:pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 print:hidden">
              <span className="text-[11px] text-slate-400">💡 Click any row to hear native Korean audio</span>
              <button
                onClick={() => setShowShortNoteModal(false)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all cursor-pointer"
              >
                Close Sheet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
