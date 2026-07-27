'use client';

import React, { useState, useRef } from 'react';
import {
  BookOpen,
  Search,
  HelpCircle,
  Sparkles,
  Volume2,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Globe,
  Award,
  BookCheck,
  X,
  Layers,
  ExternalLink,
  FileText,
  Printer,
  Music,
  Headphones,
  Mic2,
  Square
} from 'lucide-react';
import { getAudioTracksForLesson, LessonAudioTracks } from '@/lib/n5-audio-tracks';
import {
  NIHONGO_VOCAB_DATA, VocabItem,
  getVocabByLevel, getVocabByLevelAndLesson, getAvailableLessonsForLevel
} from '@/lib/nihongo-vocab';
import { getKanjiByLevelAndLesson, KanjiItem } from '@/lib/kanji-dataset';
import { getGrammarGuide, LessonGrammarGuide } from '@/lib/grammar-guide';

const LEVEL_LABELS: Record<'N5' | 'N4' | 'N3', string> = {
  N5: 'JLPT N5 (Basic Minna no Nihongo 1–25)',
  N4: 'JLPT N4 (Elementary Minna no Nihongo 26–50)',
  N3: 'JLPT N3 (Intermediate Japanese 51–75)',
};

const LESSON_TOPICS: Record<number, string> = {
  1: 'Introductions & Identity (は・です)', 2: 'Demonstratives (これ・それ・あれ)', 3: 'Location (ここ・そこ・あそこ)', 4: 'Time & Verb Tenses (〜ます)', 5: 'Movement & Transport (へ・で)',
  6: 'Objects & Invitations (を・ませんか)', 7: 'Tools, Giving & Receiving (で・あげる・もらう)', 8: 'Adjectives (い形・な形)', 9: 'Preferences & Reasons (が好き・から)', 10: 'Existence & Location (あります・います)',
  11: 'Counters & Frequency (助数詞・〜に〜回)', 12: 'Comparisons & Superlatives (〜より・一番)', 13: 'Desires & Purpose (欲しい・〜たい・に)', 14: 'Te-form Conjugation & Requests (〜てください)', 15: 'Permission & Prohibition (〜てもいい・〜てはいけない)',
  16: 'Connecting & Sequence (〜て・〜てから)', 17: 'Nai-form & Obligations (〜なければ)', 18: 'Dictionary Form & Ability (〜ことができる)', 19: 'Ta-form & Experience (〜たことがある)', 20: 'Plain Speech Style (普通体)',
  21: 'Opinions & Quotes (〜と思います)', 22: 'Relative Clauses (連体修飾)', 23: 'Time Clauses & Conditionals (とき・と)', 24: 'Giving & Receiving Favors (〜てくれる)', 25: 'Conditionals & Concessions (〜たら・〜ても)',
  26: 'Explanatory (〜んです)', 27: 'Potential Verbs', 28: 'Simultaneous Actions (〜ながら)', 29: 'States of Being', 30: 'Preparatory Action (〜ておく)',
  31: 'Volitional Form (おう/よう)', 32: 'Advice & Probabilities', 33: 'Imperative & Prohibition', 34: 'Instructions (〜通りに)', 35: 'Conditional (〜ば)',
  36: 'Habits (〜ようにする)', 37: 'Passive Voice (〜れる/られる)', 38: 'Nominalization (〜の)', 39: 'Causes & Reasons', 40: 'Embedded Questions (〜かどうか)',
  41: 'Polite Giving (いただきます)', 42: 'Purpose (〜ために)', 43: 'Conjecture (〜そうです)', 44: 'Excess (〜すぎる)', 45: 'Cases (〜場合は)',
  46: 'Timing (〜ところ)', 47: 'Hearsay (〜そうです)', 48: 'Causative (〜させる)', 49: 'Honorific Keigo (尊敬語)', 50: 'Humble Keigo (謙譲語)',
  51: 'Must Be (〜に違いない)', 52: 'Regarding (〜に関して)', 53: 'Centered On (〜を中心に)', 54: 'Through (〜を通じて)', 55: 'Depending On (〜によって)',
};

// Kanji Details Dataset Lookup
const KANJI_LOOKUP_DATABASE: Record<string, KanjiItem> = {
  '見': { character: '見', level: 'N5', meanings: ['See', 'Look', 'Show'], meaningsNepali: ['हेर्नु', 'देखाउनु'], readingsOnyomi: ['ケン'], readingsKunyomi: ['み.る', 'み.える'], strokeCount: 7, strokeSvgData: [], radicals: [{ radical: '目', meaning: 'Eye', color: '#f59e0b' }, { radical: '儿', meaning: 'Legs', color: '#3b82f6' }], lessonOrder: 1, compounds: [{ word: '見学', reading: 'けんがく', meaning: 'Study tour' }, { word: '意見', reading: 'いけん', meaning: 'Opinion' }] },
  '学': { character: '学', level: 'N5', meanings: ['Study', 'Learn', 'Science'], meaningsNepali: ['सिक्नु', 'पढ्नु'], readingsOnyomi: ['ガク'], readingsKunyomi: ['まな.ぶ'], strokeCount: 8, strokeSvgData: [], radicals: [{ radical: '子', meaning: 'Child', color: '#10b981' }], lessonOrder: 1, compounds: [{ word: '学生', reading: 'がくせい', meaning: 'Student' }, { word: '学校', reading: 'がっこう', meaning: 'School' }] },
};

export const VocabularyExplorer: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<'N5' | 'N4' | 'N3'>('N5');
  const [selectedLesson, setSelectedLesson] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectKanji, setInspectKanji] = useState<string | null>(null);
  const [expandedGrammar, setExpandedGrammar] = useState<string | null>(null);
  const [showGrammarModal, setShowGrammarModal] = useState<boolean>(false);
  const [showShortNoteModal, setShowShortNoteModal] = useState<boolean>(false);

  // Audio player state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingTrack, setPlayingTrack] = useState<'vocab' | 'dialogue' | 'drill' | null>(null);

  const playLessonTrack = (trackType: 'vocab' | 'dialogue' | 'drill', url: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (playingTrack === trackType) {
      setPlayingTrack(null);
      return;
    }
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.play().catch(() => {
      if ('speechSynthesis' in window) {
        const utt = new SpeechSynthesisUtterance(`レッスン ${selectedLesson} の ${trackType === 'vocab' ? '単語' : trackType === 'dialogue' ? '会話' : '練習'} です。`);
        utt.lang = 'ja-JP';
        window.speechSynthesis.speak(utt);
      }
    });
    audio.onended = () => setPlayingTrack(null);
    setPlayingTrack(trackType);
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayingTrack(null);
  };

  const availableLessons = getAvailableLessonsForLevel(selectedLevel);
  const lessonVocab = getVocabByLevelAndLesson(selectedLevel, selectedLesson);
  const allLevelVocab = getVocabByLevel(selectedLevel);
  const grammarGuide = getGrammarGuide('JAPANESE', selectedLevel, selectedLesson);

  const filteredVocab = searchQuery
    ? allLevelVocab.filter((v) =>
        v.word.includes(searchQuery) ||
        v.reading.includes(searchQuery) ||
        v.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.meaningNepali.includes(searchQuery)
      )
    : lessonVocab;

  const getInspectKanjiDetails = (char: string): KanjiItem => {
    if (KANJI_LOOKUP_DATABASE[char]) return KANJI_LOOKUP_DATABASE[char];
    return {
      character: char,
      level: selectedLevel,
      meanings: ['Kanji Character'],
      meaningsNepali: ['काञ्जी अक्षर'],
      readingsOnyomi: ['—'],
      readingsKunyomi: ['—'],
      strokeCount: 8,
      strokeSvgData: [],
      radicals: [{ radical: char, meaning: 'Radical Component', color: '#f59e0b' }],
      lessonOrder: selectedLesson,
      compounds: [],
    };
  };

  const playPronunciation = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      window.speechSynthesis.speak(utterance);
    }
  };

  const inspectKanjiObj = inspectKanji ? getInspectKanjiDetails(inspectKanji) : null;

  return (
    <div className="w-full max-w-7xl mx-auto font-sans space-y-3.5">

      {/* ── TOP: Compact Level Selector Bar ── */}
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-3 shadow-xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-400">
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">Japanese Curriculum</span>
        </div>

        {/* Compact Level Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 flex-1 max-w-lg">
          {(['N5', 'N4', 'N3'] as const).map((level) => (
            <button
              key={level}
              onClick={() => {
                setSelectedLevel(level);
                setSelectedLesson(getAvailableLessonsForLevel(level)[0] || 1);
                setSearchQuery('');
                setInspectKanji(null);
                setExpandedGrammar(null);
                stopAudio();
              }}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                selectedLevel === level
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>JLPT {level}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── BODY: Left Sidebar + Right Content ── */}
      <div className="flex gap-3.5 items-start">

        {/* ════ LEFT SIDEBAR — Scrollable Lesson Navigator ════ */}
        <aside className="hidden lg:flex flex-col w-60 xl:w-64 flex-shrink-0 sticky top-4">
          <div className="bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-3.5 py-2.5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-black text-white uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-rose-400" />
                <span>Lessons</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                {availableLessons.length} Total
              </span>
            </div>

            <div className="overflow-y-auto max-h-[calc(100vh-180px)] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent py-1 space-y-0.5">
              {availableLessons.map((n) => {
                const isActive = selectedLesson === n && !searchQuery;
                const tracks = selectedLevel === 'N5' ? getAudioTracksForLesson(n) : undefined;
                return (
                  <button
                    key={n}
                    onClick={() => {
                      setSelectedLesson(n);
                      setSearchQuery('');
                      setInspectKanji(null);
                      setExpandedGrammar(null);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center gap-2.5 transition-all group border-l-[3px] ${
                      isActive
                        ? 'bg-rose-600/15 border-l-rose-500 text-white'
                        : 'border-l-transparent text-slate-400 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <span className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black transition-all ${
                      isActive ? 'bg-rose-600 text-white shadow-sm' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-white'
                    }`}>
                      {n}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className={`text-[11px] font-bold leading-tight truncate ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                        {LESSON_TOPICS[n] || `Lesson ${n}`}
                      </div>
                      {isActive && tracks && (
                        <div className="text-[9px] font-bold text-emerald-400 mt-0.5">🎵 Audio Ready</div>
                      )}
                    </div>

                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* ════ RIGHT MAIN CONTENT ════ */}
        <div className="flex-1 min-w-0 space-y-3.5">

          {/* Mobile horizontal lesson strip */}
          <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto scrollbar-none bg-slate-900/90 border border-slate-800 rounded-xl p-2">
            <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap pl-1">Lesson:</span>
            {availableLessons.map((n) => (
              <button
                key={n}
                onClick={() => {
                  setSelectedLesson(n);
                  setSearchQuery('');
                  setInspectKanji(null);
                  setExpandedGrammar(null);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap border transition-all flex-shrink-0 ${
                  selectedLesson === n && !searchQuery
                    ? 'bg-rose-600 border-rose-400 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          {/* ── Sleek Compact Lesson Header Card ── */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                  {LEVEL_LABELS[selectedLevel]}
                </div>
                <h2 className="text-sm sm:text-base font-black text-white mt-0.5">
                  {searchQuery ? 'Search Results' : `Lesson ${selectedLesson}: ${LESSON_TOPICS[selectedLesson] || ''}`}
                </h2>
              </div>

              {/* Action Buttons & Audio Track Controls */}
              <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
                {selectedLevel === 'N5' && (() => {
                  const tracks = getAudioTracksForLesson(selectedLesson);
                  if (!tracks) return null;
                  const btns: { type: 'vocab' | 'dialogue' | 'drill'; label: string; url: string; icon: React.ReactNode; color: string; activeColor: string }[] = [
                    { type: 'vocab',    label: 'Vocab',    url: tracks.vocab,    icon: <Music className="w-3 h-3" />,     color: 'bg-violet-700/80 hover:bg-violet-600',   activeColor: 'bg-violet-500 ring-1 ring-violet-300' },
                    { type: 'dialogue', label: 'Dialogue', url: tracks.dialogue, icon: <Headphones className="w-3 h-3" />, color: 'bg-emerald-700/80 hover:bg-emerald-600', activeColor: 'bg-emerald-500 ring-1 ring-emerald-300' },
                    { type: 'drill',    label: 'Drills',   url: tracks.drill,    icon: <Mic2 className="w-3 h-3" />,      color: 'bg-sky-700/80 hover:bg-sky-600',         activeColor: 'bg-sky-500 ring-1 ring-sky-300' },
                  ];
                  return (
                    <div className="flex items-center gap-1">
                      {btns.map((btn) => (
                        <button
                          key={btn.type}
                          onClick={() => playLessonTrack(btn.type, btn.url)}
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-white text-[11px] font-bold transition-all shadow-sm ${
                            playingTrack === btn.type ? btn.activeColor : btn.color
                          }`}
                        >
                          {playingTrack === btn.type
                            ? <span className="flex gap-0.5 items-center"><span className="w-0.5 h-2.5 bg-white rounded-full animate-bounce" /><span className="w-0.5 h-2.5 bg-white rounded-full animate-bounce" /></span>
                            : btn.icon
                          }
                          <span>{btn.label}</span>
                        </button>
                      ))}
                      {playingTrack && (
                        <button onClick={stopAudio} className="p-1 rounded-lg bg-rose-700 hover:bg-rose-600 text-white">
                          <Square className="w-3 h-3 fill-white" />
                        </button>
                      )}
                    </div>
                  );
                })()}

                {/* Vocab Short Note Sheet Button */}
                <button
                  onClick={() => setShowShortNoteModal(true)}
                  className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-extrabold flex items-center gap-1 shadow-sm transition-all whitespace-nowrap cursor-pointer"
                >
                  <FileText className="w-3 h-3" />
                  <span>Vocab Note</span>
                </button>

                {/* Grammar Guide Button */}
                <button
                  onClick={() => setShowGrammarModal(true)}
                  className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-extrabold flex items-center gap-1 shadow-sm transition-all whitespace-nowrap cursor-pointer"
                >
                  <BookCheck className="w-3 h-3" />
                  <span>Grammar Guide</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── Vocabulary List Box ── */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-2xl space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-800">
              <div className="text-xs font-bold text-slate-300">
                {filteredVocab.length} vocabulary words in {searchQuery ? 'search' : `Lesson ${selectedLesson}`}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search Kanji / Reading / English / Nepali..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-all"
                />
              </div>
            </div>

            {/* Compact Word List Container */}
            <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {filteredVocab.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs font-semibold">
                  No matching vocabulary items found for this lesson.
                </div>
              ) : (
                filteredVocab.map((vocab) => {
                  const extractedKanji = vocab.kanjiCharacters && vocab.kanjiCharacters.length > 0
                    ? vocab.kanjiCharacters
                    : vocab.word.split('').filter(c => /[\u4e00-\u9faf]/.test(c));

                  return (
                    <div
                      key={vocab.id}
                      className="bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl p-2.5 sm:p-3 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        
                        {/* Word + Pronunciation + Kanji Breakdown */}
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <div className="text-lg sm:text-xl font-bold font-jp text-white leading-none">
                            {vocab.word}
                          </div>

                          <span className="text-xs font-bold font-jp text-rose-300">
                            {vocab.reading}
                          </span>

                          <button
                            onClick={() => playPronunciation(vocab.reading)}
                            className="p-1 rounded-md bg-slate-900 hover:bg-rose-600 text-slate-400 hover:text-white transition-all"
                            title="Play pronunciation"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>

                          {vocab.partOfSpeech && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-rose-500/15 border border-rose-500/30 text-rose-300 font-semibold">
                              {vocab.partOfSpeech}
                            </span>
                          )}

                          {/* Kanji Chips */}
                          {extractedKanji.length > 0 && (
                            <div className="flex items-center gap-1">
                              {extractedKanji.map((kChar, kIdx) => (
                                <button
                                  key={kIdx}
                                  onClick={() => setInspectKanji(kChar)}
                                  className="px-1.5 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30 text-xs font-jp font-bold transition-all flex items-center gap-0.5 cursor-pointer"
                                  title={`Inspect Kanji ${kChar}`}
                                >
                                  <span>{kChar}</span>
                                  <Layers className="w-2.5 h-2.5" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Meanings: English + Nepali */}
                        <div className="flex items-center gap-2 text-xs flex-wrap sm:flex-nowrap">
                          <span className="font-semibold text-slate-200">🇬🇧 {vocab.meaning}</span>
                          <span className="text-slate-700 hidden sm:inline">•</span>
                          <span className="font-semibold text-amber-400">🇳🇵 {vocab.meaningNepali}</span>
                        </div>
                      </div>

                      {/* Optional Grammar Sentence Example */}
                      {vocab.grammarSentences && vocab.grammarSentences.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-slate-800/80">
                          <button
                            onClick={() => setExpandedGrammar(expandedGrammar === vocab.id ? null : vocab.id)}
                            className="flex items-center gap-1 text-[11px] text-rose-400 hover:text-rose-300 font-semibold transition-colors"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>{expandedGrammar === vocab.id ? 'Hide sentence' : 'Show example sentence'}</span>
                            <ChevronDown className={`w-3 h-3 transition-transform ${expandedGrammar === vocab.id ? 'rotate-180' : ''}`} />
                          </button>

                          {expandedGrammar === vocab.id && vocab.grammarSentences.map((gs, idx) => (
                            <div key={idx} className="mt-1.5 p-2 rounded-lg bg-slate-900/90 border border-rose-900/40 space-y-1 text-xs">
                              <div className="flex items-center justify-between gap-2">
                                <div className="font-jp font-bold text-white">{gs.japanese}</div>
                                <button
                                  onClick={() => playPronunciation(gs.japanese)}
                                  className="p-1 rounded bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white"
                                >
                                  <Volume2 className="w-3 h-3" />
                                </button>
                              </div>
                              <div className="text-slate-300 text-[11px]">🇬🇧 {gs.english}</div>
                              <div className="text-amber-400 text-[11px]">🇳🇵 {gs.nepali}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── 1. GRAMMAR GUIDE MODAL ── */}
      {showGrammarModal && grammarGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="w-[96vw] sm:w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <BookCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    JLPT {selectedLevel} • Lesson {selectedLesson} Grammar Guide
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white">{grammarGuide.lessonTitle}</h3>
                </div>
              </div>
              <button
                onClick={() => setShowGrammarModal(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-all border border-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Grammar Points List */}
            <div className="space-y-4">
              {grammarGuide.grammarPoints.map((pt, pIdx) => (
                <div key={pIdx} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                    <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                      Rule {pIdx + 1}: {pt.title}
                    </span>
                    <span className="text-xs font-jp font-bold text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">{pt.pattern}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">🇬🇧 {pt.explanationEnglish}</p>
                  <p className="text-xs font-bold text-amber-300">🇳🇵 {pt.explanationNepali}</p>

                  {/* Examples */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Example Sentences:</span>
                    {pt.examples.map((ex, eIdx) => (
                      <div key={eIdx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-jp font-bold text-white text-sm">{ex.target}</span>
                          <button
                            onClick={() => playPronunciation(ex.target)}
                            className="p-1 rounded bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white"
                          >
                            <Volume2 className="w-3 h-3" />
                          </button>
                        </div>
                        {ex.reading && <div className="text-slate-400 text-[11px] italic font-jp">{ex.reading}</div>}
                        <div className="text-slate-200">🇬🇧 {ex.english}</div>
                        <div className="text-amber-400 font-semibold">🇳🇵 {ex.nepali}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 2. VOCAB SHORT NOTE TABLE MODAL ── */}
      {showShortNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="w-[96vw] sm:w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 print:hidden">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    JLPT {selectedLevel} • Lesson {selectedLesson} Vocabulary Sheet
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white">Vocabulary Quick Note (शब्दावली तालिका)</h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-all"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Sheet</span>
                </button>
                <button
                  onClick={() => setShowShortNoteModal(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-all border border-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Print Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 font-bold uppercase text-[10px]">
                    <th className="py-2.5 px-3.5 border-r border-slate-800">No.</th>
                    <th className="py-2.5 px-3.5 border-r border-slate-800">Kanji (अक्षर)</th>
                    <th className="py-2.5 px-3.5 border-r border-slate-800">Reading (उच्चारण)</th>
                    <th className="py-2.5 px-3.5 border-r border-slate-800">English (अंग्रेजी)</th>
                    <th className="py-2.5 px-3.5">Nepali (नेपाली)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-900/60">
                  {lessonVocab.map((v, i) => (
                    <tr
                      key={v.id}
                      onClick={() => playPronunciation(v.reading)}
                      className="hover:bg-slate-800/60 cursor-pointer transition-colors"
                    >
                      <td className="py-2.5 px-3.5 font-bold text-slate-500 border-r border-slate-800/40 text-center">
                        {i + 1}
                      </td>
                      <td className="py-2.5 px-3.5 font-jp font-bold text-lg text-white border-r border-slate-800/40">
                        {v.word}
                      </td>
                      <td className="py-2.5 px-3.5 font-jp text-base sm:text-lg text-rose-300 font-bold border-r border-slate-800/40">
                        {v.reading}
                      </td>
                      <td className="py-2.5 px-3.5 text-slate-200 font-medium border-r border-slate-800/40">
                        {v.meaning}
                      </td>
                      <td className="py-2.5 px-3.5 text-amber-300 font-semibold">
                        {v.meaningNepali}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── 3. KANJI INSPECTOR MODAL ── */}
      {inspectKanjiObj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Kanji Details</span>
              </div>
              <button onClick={() => setInspectKanji(null)} className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-amber-500/40 flex items-center justify-center text-4xl font-jp font-black text-amber-300 shadow-inner flex-shrink-0">
                {inspectKanjiObj.character}
              </div>
              <div>
                <div className="text-base font-extrabold text-white">{inspectKanjiObj.meanings.join(', ')}</div>
                <div className="text-xs font-bold text-amber-400">🇳🇵 {inspectKanjiObj.meaningsNepali?.join(', ')}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Strokes: {inspectKanjiObj.strokeCount}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase text-rose-400 block">Onyomi</span>
                <span className="font-bold text-slate-200">{inspectKanjiObj.readingsOnyomi.join(', ')}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-400 block">Kunyomi</span>
                <span className="font-bold text-slate-200">{inspectKanjiObj.readingsKunyomi.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
