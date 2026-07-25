'use client';

import React, { useState } from 'react';
import { BookOpen, Search, Volume2, ChevronDown, MessageSquare, Globe, Award, ListFilter, BookCheck, X, FileText, Printer } from 'lucide-react';
import {
  KOREAN_VOCAB_DATA, KoreanVocabItem, EPS_LESSON_TITLES,
  getKoreanVocabByLevel, getKoreanVocabByLevelAndLesson,
  getAvailableKoreanLevels, getAvailableKoreanLessons
} from '@/lib/korean-vocab';
import { getGrammarGuide, LessonGrammarGuide } from '@/lib/grammar-guide';

const LEVEL_LABELS: Record<KoreanVocabItem['level'], string> = {
  EPS: 'EPS-TOPIK (60 Complete Lessons)',
  TOPIK2: 'TOPIK Level 2 (Intermediate)',
  TOPIK3: 'TOPIK Level 3 (Upper-Intermediate)',
  TOPIK4: 'TOPIK Level 4 (Advanced)',
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

export const KoreanVocabularyExplorer: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<KoreanVocabItem['level']>('EPS');
  const [selectedLesson, setSelectedLesson] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedGrammar, setExpandedGrammar] = useState<string | null>(null);
  const [showGrammarModal, setShowGrammarModal] = useState<boolean>(false);
  const [showShortNoteModal, setShowShortNoteModal] = useState<boolean>(false);

  const availableLessons = getAvailableKoreanLessons(selectedLevel);
  const lessonVocab = getKoreanVocabByLevelAndLesson(selectedLevel, selectedLesson);
  const allLevelVocab = getKoreanVocabByLevel(selectedLevel);
  const grammarGuide = getGrammarGuide('KOREAN', selectedLevel, selectedLesson);

  const filteredVocab = (searchQuery
    ? allLevelVocab.filter(v =>
        v.word.includes(searchQuery) ||
        v.romanization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.meaningNepali.includes(searchQuery)
      )
    : lessonVocab
  );

  const playPronunciation = (word: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'ko-KR';
      window.speechSynthesis.speak(utterance);
    }
  };

  const getLessonTitle = (level: KoreanVocabItem['level'], lessonNum: number): string => {
    if (level === 'EPS') {
      return EPS_LESSON_TITLES[lessonNum] || `Lesson ${lessonNum}`;
    }
    return TOPIK_LESSON_TOPICS[`${level}-${lessonNum}`] || `Lesson ${lessonNum}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto font-sans space-y-4 sm:space-y-5">
      {/* Level Tabs */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 sm:mb-4">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Korean EPS-TOPIK (60 Lessons) & TOPIK Learning System</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] sm:text-xs font-black border border-emerald-500/30">
            {selectedLevel === 'EPS' ? '60 Lessons Available' : `${availableLessons.length} Modules`}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-2 mb-4 sm:mb-5">
          {getAvailableKoreanLevels().map(level => (
            <button
              key={level}
              onClick={() => {
                setSelectedLevel(level);
                setSelectedLesson(1);
                setSearchQuery('');
                setExpandedGrammar(null);
              }}
              className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition-all text-left ${
                selectedLevel === level
                  ? 'bg-emerald-600 border-emerald-400 text-white shadow-glow'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-0.5 sm:mb-1">
                <Award className={`w-3.5 h-3.5 ${selectedLevel === level ? 'text-white' : 'text-emerald-400'}`} />
                <span className="text-xs sm:text-sm font-black">{level}</span>
              </div>
              <div className="text-[9px] sm:text-[10px] opacity-80 leading-tight hidden sm:block">{LEVEL_LABELS[level]}</div>
            </button>
          ))}
        </div>

        {/* Quick Lesson Jump Selector */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 pt-2.5 sm:pt-3 border-t border-slate-800">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5">
              <ListFilter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              <span className="text-[11px] sm:text-xs font-bold text-slate-300">Select Lesson:</span>
            </div>

            <select
              value={selectedLesson}
              onChange={(e) => {
                setSelectedLesson(Number(e.target.value));
                setSearchQuery('');
                setExpandedGrammar(null);
              }}
              className="bg-slate-950 border border-slate-800 text-xs font-bold text-white px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl focus:outline-none focus:border-emerald-500 cursor-pointer flex-1 sm:flex-initial"
            >
              {availableLessons.map(n => (
                <option key={n} value={n}>
                  Lesson {n}: {getLessonTitle(selectedLevel, n)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Vocab Short Note Sheet Button */}
            <button
              onClick={() => setShowShortNoteModal(true)}
              className="w-full sm:w-auto px-3 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md transition-all whitespace-nowrap"
            >
              <FileText className="w-4 h-4 flex-shrink-0" />
              <span>Vocab Short Note (어휘 정리)</span>
            </button>

            {/* Korean Grammar Guide Button */}
            <button
              onClick={() => setShowGrammarModal(true)}
              className="w-full sm:w-auto px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md transition-all whitespace-nowrap"
            >
              <BookCheck className="w-4 h-4 flex-shrink-0" />
              <span>Grammar Guide (문법 해설)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Vocabulary List Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-slate-800">
          <div>
            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400">
              {LEVEL_LABELS[selectedLevel]}
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
              {searchQuery ? 'Search Results' : `Lesson ${selectedLesson}: ${getLessonTitle(selectedLevel, selectedLesson)}`}
            </h2>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search Korean / English / Nepali..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2.5 max-h-[60vh] sm:max-h-[560px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {filteredVocab.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs font-semibold">
              No matching vocabulary found for this lesson.
            </div>
          ) : (
            filteredVocab.map((vocab) => (
              <div
                key={vocab.id}
                className="bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <div className="text-xl sm:text-2xl font-bold font-kr text-white">
                        {vocab.word}
                      </div>

                      <button
                        onClick={() => playPronunciation(vocab.word)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-emerald-600 text-slate-400 hover:text-white transition-all"
                        title="Play pronunciation"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>

                      {vocab.partOfSpeech && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-semibold">
                          {vocab.partOfSpeech}
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-400 italic">{vocab.romanization}</div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs">
                      <span className="font-semibold text-slate-200">🇬🇧 {vocab.meaning}</span>
                      <span className="hidden sm:inline text-slate-700">•</span>
                      <span className="font-semibold text-amber-400">🇳🇵 {vocab.meaningNepali}</span>
                    </div>

                    {vocab.grammarSentences && vocab.grammarSentences.length > 0 && (
                      <div>
                        <button
                          onClick={() => setExpandedGrammar(expandedGrammar === vocab.id ? null : vocab.id)}
                          className="flex items-center gap-1.5 text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold mt-1 transition-colors"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>{expandedGrammar === vocab.id ? 'Hide example' : 'Show example sentence'}</span>
                          <ChevronDown className={`w-3 h-3 transition-transform ${expandedGrammar === vocab.id ? 'rotate-180' : ''}`} />
                        </button>

                        {expandedGrammar === vocab.id && vocab.grammarSentences.map((gs, idx) => (
                          <div key={idx} className="mt-2 p-2.5 sm:p-3 rounded-xl bg-slate-900/80 border border-emerald-900/50 space-y-1.5">
                            <div className="flex items-start gap-2">
                              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mt-0.5 whitespace-nowrap">KR</span>
                              <div className="flex-1">
                                <div className="text-xs sm:text-sm font-kr font-bold text-white">{gs.korean}</div>
                                <div className="text-[10px] sm:text-[11px] text-slate-400 italic">{gs.romanization}</div>
                              </div>
                              <button
                                onClick={() => playPronunciation(gs.korean)}
                                className="p-1 rounded bg-slate-800 hover:bg-emerald-600 text-slate-400 hover:text-white transition-all flex-shrink-0"
                              >
                                <Volume2 className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="flex items-start gap-2 pt-1 border-t border-slate-800">
                              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mt-0.5 whitespace-nowrap">EN</span>
                              <span className="text-xs text-slate-300">{gs.english}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mt-0.5 whitespace-nowrap">NP</span>
                              <span className="text-xs text-amber-300">{gs.nepali}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex-shrink-0">
                    <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg font-black border bg-emerald-950/80 border-emerald-800 text-emerald-300">
                      {vocab.level}-L{vocab.lesson}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Korean Grammar Explanation Modal */}
      {showGrammarModal && grammarGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-[94vw] sm:w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Korean Grammar Explanation Guide (한국어 문법 해설)
                </div>
                <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                  Lesson {selectedLesson}: {grammarGuide.lessonTitle}
                </h3>
              </div>
              <button
                onClick={() => setShowGrammarModal(false)}
                className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-400 hover:text-white transition-all flex-shrink-0"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="space-y-3.5 sm:space-y-4">
              {grammarGuide.grammarPoints.map((point, idx) => (
                <div key={idx} className="bg-slate-950 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-800 space-y-2.5 sm:space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-xs sm:text-sm font-extrabold text-white">{point.title}</h4>
                    <span className="self-start sm:self-auto px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] sm:text-[11px] font-mono font-bold">
                      {point.pattern}
                    </span>
                  </div>

                  <div className="space-y-2 pt-1 border-t border-slate-900">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block">English Explanation</span>
                      <p className="text-xs text-slate-300 leading-relaxed font-medium">{point.explanationEnglish}</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">Nepali Explanation (नेपाली व्याख्या)</span>
                      <p className="text-xs text-amber-300 leading-relaxed font-semibold">{point.explanationNepali}</p>
                    </div>
                  </div>

                  {point.examples.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-slate-900">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Example Sentences</span>
                      {point.examples.map((ex, eIdx) => (
                        <div key={eIdx} className="bg-slate-900/80 p-2.5 sm:p-3 rounded-xl border border-slate-800 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-kr font-bold text-white">{ex.target}</span>
                            <button
                              onClick={() => playPronunciation(ex.target)}
                              className="p-1 rounded bg-slate-800 hover:bg-emerald-600 text-slate-400 hover:text-white transition-all flex-shrink-0"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {ex.reading && <div className="text-[10px] sm:text-[11px] text-slate-400 italic">{ex.reading}</div>}
                          <div className="text-xs text-slate-300">🇬🇧 {ex.english}</div>
                          <div className="text-xs text-amber-300">🇳🇵 {ex.nepali}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 sm:pt-3 border-t border-slate-800 text-right">
              <button
                onClick={() => setShowGrammarModal(false)}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all"
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
          <div className="w-[96vw] sm:w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col print:max-h-none print:w-full print:border-none print:shadow-none print:bg-white print:text-black">
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
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all"
                  title="Print / Save PDF"
                >
                  <Printer className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">Print / PDF</span>
                </button>
                <button
                  onClick={() => setShowShortNoteModal(false)}
                  className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-all"
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
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all"
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
