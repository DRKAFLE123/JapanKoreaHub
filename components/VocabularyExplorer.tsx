'use client';

import React, { useState, useRef } from 'react';
import { BookOpen, Search, HelpCircle, Sparkles, Volume2, ChevronDown, MessageSquare, Globe, Award, BookCheck, X, Layers, ExternalLink, FileText, Printer, Music, Headphones, Mic2, Square } from 'lucide-react';
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
  '案': { character: '案', level: 'N4', meanings: ['Plan', 'Suggestion', 'Idea'], meaningsNepali: ['योजना', 'राय'], readingsOnyomi: ['アン'], readingsKunyomi: [], strokeCount: 10, strokeSvgData: [], radicals: [{ radical: '木', meaning: 'Tree', color: '#10b981' }], lessonOrder: 26, compounds: [{ word: '案内', reading: 'あんない', meaning: 'Guidance' }] },
  '内': { character: '内', level: 'N4', meanings: ['Inside', 'Within', 'Home'], meaningsNepali: ['भित्र', 'आन्तरिक'], readingsOnyomi: ['ナイ'], readingsKunyomi: ['うち'], strokeCount: 4, strokeSvgData: [], radicals: [{ radical: '冂', meaning: 'Border', color: '#ec4899' }], lessonOrder: 26, compounds: [{ word: '案内', reading: 'あんない', meaning: 'Guidance' }, { word: '国内', reading: 'こくない', meaning: 'Domestic' }] },
  '探': { character: '探', level: 'N4', meanings: ['Search', 'Look for', 'Explore'], meaningsNepali: ['खोज्नु', 'अन्वेषण'], readingsOnyomi: ['タン'], readingsKunyomi: ['さが.す'], strokeCount: 11, strokeSvgData: [], radicals: [{ radical: '扌', meaning: 'Hand', color: '#ef4444' }], lessonOrder: 26, compounds: [{ word: '探す', reading: 'さがす', meaning: 'Search for' }] },
  '都': { character: '都', level: 'N4', meanings: ['Metropolis', 'Capital'], meaningsNepali: ['राजधानी / सहर'], readingsOnyomi: ['ト', 'ツ'], readingsKunyomi: ['みやこ'], strokeCount: 11, strokeSvgData: [], radicals: [{ radical: '阝', meaning: 'City wall', color: '#8b5cf6' }], lessonOrder: 26, compounds: [{ word: '都合', reading: 'つごう', meaning: 'Convenience' }] },
  '合': { character: '合', level: 'N4', meanings: ['Fit', 'Join', 'Suit'], meaningsNepali: ['मिल्नु / जोड्नु'], readingsOnyomi: ['ゴウ'], readingsKunyomi: ['あ.う'], strokeCount: 6, strokeSvgData: [], radicals: [{ radical: '口', meaning: 'Mouth', color: '#06b6d4' }], lessonOrder: 26, compounds: [{ word: '都合', reading: 'つごう', meaning: 'Convenience' }] },
  '遅': { character: '遅', level: 'N4', meanings: ['Slow', 'Late'], meaningsNepali: ['ढिलो / सुस्त'], readingsOnyomi: ['チ'], readingsKunyomi: ['おく.れる', 'おそ.い'], strokeCount: 12, strokeSvgData: [], radicals: [{ radical: '辶', meaning: 'Road', color: '#10b981' }], lessonOrder: 26, compounds: [{ word: '遅れる', reading: 'おくれる', meaning: 'Be late' }] },
  '参': { character: '参', level: 'N4', meanings: ['Participate', 'Attend', 'Visit'], meaningsNepali: ['सहभागी हुनु / जानु'], readingsOnyomi: ['サン'], readingsKunyomi: ['まい.る'], strokeCount: 8, strokeSvgData: [], radicals: [{ radical: '厶', meaning: 'Private', color: '#f59e0b' }], lessonOrder: 26, compounds: [{ word: '参加', reading: 'さんか', meaning: 'Participation' }] },
  '加': { character: '加', level: 'N4', meanings: ['Add', 'Join', 'Increase'], meaningsNepali: ['थप्नु / जोडिनु'], readingsOnyomi: ['カ'], readingsKunyomi: ['くわ.える'], strokeCount: 5, strokeSvgData: [], radicals: [{ radical: '力', meaning: 'Power', color: '#ef4444' }], lessonOrder: 26, compounds: [{ word: '参加', reading: 'さんか', meaning: 'Participation' }] },
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
    // Stop currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    // If clicking the same track again — toggle off
    if (playingTrack === trackType) {
      setPlayingTrack(null);
      return;
    }
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.play().catch(() => {
      // Fallback to speech synthesis if file not found
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
    <div className="w-full max-w-5xl mx-auto font-sans space-y-4 sm:space-y-5">
      {/* Level Tabs */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-xl">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-rose-400 mb-3 sm:mb-4">
          <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Japanese Language Curriculum System</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {(['N5', 'N4', 'N3'] as const).map((level) => (
            <button
              key={level}
              onClick={() => {
                setSelectedLevel(level);
                setSelectedLesson(getAvailableLessonsForLevel(level)[0] || 1);
                setSearchQuery('');
                setInspectKanji(null);
                setExpandedGrammar(null);
              }}
              className={`p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-all text-left ${
                selectedLevel === level
                  ? 'bg-rose-600 border-rose-400 text-white shadow-glow'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-0.5 sm:mb-1">
                <Award className={`w-3.5 h-3.5 ${selectedLevel === level ? 'text-white' : 'text-rose-400'}`} />
                <span className="text-xs sm:text-sm font-black">JLPT {level}</span>
              </div>
              <div className="text-[9px] sm:text-[10px] opacity-80 leading-tight hidden sm:block">{LEVEL_LABELS[level]}</div>
            </button>
          ))}
        </div>

        {/* Lesson Selector Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 pt-2 sm:pt-3 border-t border-slate-800">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 flex-1 min-w-0">
            <span className="text-[11px] sm:text-xs font-bold text-slate-400 whitespace-nowrap">Lesson:</span>
            {availableLessons.map((n) => (
              <button
                key={n}
                onClick={() => {
                  setSelectedLesson(n);
                  setSearchQuery('');
                  setInspectKanji(null);
                  setExpandedGrammar(null);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap border transition-all flex-shrink-0 ${
                  selectedLesson === n && !searchQuery
                    ? 'bg-rose-600 border-rose-400 text-white shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {n}. {LESSON_TOPICS[n] || `Lesson ${n}`}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* N5 Lesson Audio Tracks — shown only for N5 */}
            {selectedLevel === 'N5' && (() => {
              const tracks = getAudioTracksForLesson(selectedLesson);
              if (!tracks) return null;
              const btns: { type: 'vocab' | 'dialogue' | 'drill'; label: string; labelJp: string; url: string; icon: React.ReactNode; color: string; activeColor: string }[] = [
                { type: 'vocab',    label: 'Vocabulary', labelJp: '単語', url: tracks.vocab,    icon: <Music className="w-3.5 h-3.5 flex-shrink-0" />,     color: 'bg-violet-700 hover:bg-violet-600',    activeColor: 'bg-violet-500 ring-2 ring-violet-300' },
                { type: 'dialogue', label: 'Dialogue',   labelJp: '会話', url: tracks.dialogue, icon: <Headphones className="w-3.5 h-3.5 flex-shrink-0" />, color: 'bg-emerald-700 hover:bg-emerald-600',  activeColor: 'bg-emerald-500 ring-2 ring-emerald-300' },
                { type: 'drill',    label: 'Drills',     labelJp: '練習', url: tracks.drill,    icon: <Mic2 className="w-3.5 h-3.5 flex-shrink-0" />,      color: 'bg-sky-700 hover:bg-sky-600',          activeColor: 'bg-sky-500 ring-2 ring-sky-300' },
              ];
              return (
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap hidden sm:block">🎵 Audio:</span>
                  {btns.map((btn) => (
                    <button
                      key={btn.type}
                      onClick={() => playLessonTrack(btn.type, btn.url)}
                      title={`Play ${btn.label} (${btn.labelJp}) — Lesson ${selectedLesson} Track`}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-white text-[11px] font-bold transition-all shadow whitespace-nowrap ${
                        playingTrack === btn.type ? btn.activeColor : btn.color
                      }`}
                    >
                      {playingTrack === btn.type
                        ? <span className="flex gap-0.5 items-center"><span className="w-1 h-3 bg-white rounded-full animate-bounce" style={{animationDelay:'0ms'}} /><span className="w-1 h-3 bg-white rounded-full animate-bounce" style={{animationDelay:'150ms'}} /><span className="w-1 h-3 bg-white rounded-full animate-bounce" style={{animationDelay:'300ms'}} /></span>
                        : btn.icon
                      }
                      <span className="hidden sm:inline">{btn.label}</span>
                      <span className="font-jp text-[10px] opacity-80">{btn.labelJp}</span>
                    </button>
                  ))}
                  {playingTrack && (
                    <button
                      onClick={stopAudio}
                      title="Stop Audio"
                      className="p-1.5 rounded-lg bg-rose-700 hover:bg-rose-600 text-white transition-all"
                    >
                      <Square className="w-3 h-3 fill-white" />
                    </button>
                  )}
                </div>
              );
            })()}

            {/* Vocab Short Note Sheet Button */}
            <button
              onClick={() => setShowShortNoteModal(true)}
              className="w-full sm:w-auto px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md transition-all whitespace-nowrap"
            >
              <FileText className="w-4 h-4 flex-shrink-0" />
              <span>Vocab Short Note (तालिका)</span>
            </button>

            {/* Grammar Guide Button */}
            <button
              onClick={() => setShowGrammarModal(true)}
              className="w-full sm:w-auto px-3 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md transition-all whitespace-nowrap"
            >
              <BookCheck className="w-4 h-4 flex-shrink-0" />
              <span>Grammar Guide (व्याकरण)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Vocabulary List Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-slate-800">
          <div>
            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-rose-400">
              {LEVEL_LABELS[selectedLevel]}
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
              {searchQuery ? 'Search Results' : `Lesson ${selectedLesson}: ${LESSON_TOPICS[selectedLesson] || ''}`}
            </h2>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search Kanji / Reading / English / Nepali..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2.5 max-h-[60vh] sm:max-h-[560px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {filteredVocab.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs font-semibold">
              No matching vocabulary items found for this lesson.
            </div>
          ) : (
            filteredVocab.map((vocab) => {
              // Extract Kanji characters for clickable Kanji inspection
              const extractedKanji = vocab.kanjiCharacters && vocab.kanjiCharacters.length > 0
                ? vocab.kanjiCharacters
                : vocab.word.split('').filter(c => /[\u4e00-\u9faf]/.test(c));

              return (
                <div
                  key={vocab.id}
                  className="bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        <div className="text-xl sm:text-2xl font-bold font-jp text-white">
                          {vocab.word}
                        </div>

                        <button
                          onClick={() => playPronunciation(vocab.reading)}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-600 text-slate-400 hover:text-white transition-all"
                          title="Play pronunciation"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>

                        {vocab.partOfSpeech && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-rose-500/20 border border-rose-500/30 text-rose-300 font-semibold">
                            {vocab.partOfSpeech}
                          </span>
                        )}

                        {/* Interactive Kanji Breakdown Chips */}
                        {extractedKanji.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Kanji:</span>
                            {extractedKanji.map((kChar, kIdx) => (
                              <button
                                key={kIdx}
                                onClick={() => setInspectKanji(kChar)}
                                className="px-2 py-0.5 rounded-md bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 text-xs font-jp font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                                title={`Click to inspect Kanji ${kChar}`}
                              >
                                <span>{kChar}</span>
                                <Layers className="w-3 h-3" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="text-xs text-slate-400 italic font-jp">Reading: {vocab.reading}</div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs">
                        <span className="font-semibold text-slate-200">🇬🇧 {vocab.meaning}</span>
                        <span className="hidden sm:inline text-slate-700">•</span>
                        <span className="font-semibold text-amber-400">🇳🇵 {vocab.meaningNepali}</span>
                      </div>

                      {vocab.grammarSentences && vocab.grammarSentences.length > 0 && (
                        <div>
                          <button
                            onClick={() => setExpandedGrammar(expandedGrammar === vocab.id ? null : vocab.id)}
                            className="flex items-center gap-1.5 text-[11px] text-rose-400 hover:text-rose-300 font-semibold mt-1 transition-colors"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>{expandedGrammar === vocab.id ? 'Hide example' : 'Show example sentence'}</span>
                            <ChevronDown className={`w-3 h-3 transition-transform ${expandedGrammar === vocab.id ? 'rotate-180' : ''}`} />
                          </button>

                          {expandedGrammar === vocab.id && vocab.grammarSentences.map((gs, idx) => (
                            <div key={idx} className="mt-2 p-2.5 sm:p-3 rounded-xl bg-slate-900/80 border border-rose-900/50 space-y-1.5">
                              <div className="flex items-start gap-2">
                                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mt-0.5 whitespace-nowrap">JP</span>
                                <div className="flex-1">
                                  <div className="text-xs sm:text-sm font-jp font-bold text-white">{gs.japanese}</div>
                                  <div className="text-[10px] sm:text-[11px] text-slate-400 italic">{gs.reading}</div>
                                </div>
                                <button
                                  onClick={() => playPronunciation(gs.japanese)}
                                  className="p-1 rounded bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-all flex-shrink-0"
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
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Clicked Kanji Inspection Modal */}
      {inspectKanjiObj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-[94vw] sm:w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl space-y-3.5 sm:space-y-4 text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Kanji Inspector</span>
              </div>
              <button
                onClick={() => setInspectKanji(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-950 border border-amber-500/40 flex items-center justify-center text-4xl sm:text-5xl font-jp font-black text-amber-300 shadow-inner flex-shrink-0">
                {inspectKanjiObj.character}
              </div>
              <div className="space-y-0.5 sm:space-y-1 min-w-0">
                <div className="text-base sm:text-lg font-extrabold text-white truncate">{inspectKanjiObj.meanings.join(', ')}</div>
                <div className="text-xs sm:text-sm font-bold text-amber-400 truncate">🇳🇵 {inspectKanjiObj.meaningsNepali?.join(', ')}</div>
                <div className="text-[11px] sm:text-xs text-slate-400">Stroke count: {inspectKanjiObj.strokeCount}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-800 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase text-rose-400 block">Onyomi (音読み)</span>
                <span className="font-bold text-slate-200">{inspectKanjiObj.readingsOnyomi.join(', ')}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-400 block">Kunyomi (訓読み)</span>
                <span className="font-bold text-slate-200">{inspectKanjiObj.readingsKunyomi.join(', ')}</span>
              </div>
            </div>

            {/* Radicals */}
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1.5">Radical Breakdown</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {inspectKanjiObj.radicals.map((r, rIdx) => (
                  <span
                    key={rIdx}
                    className="px-2.5 py-1 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-jp font-bold text-slate-950 shadow"
                    style={{ backgroundColor: r.color }}
                  >
                    {r.radical} ({r.meaning})
                  </span>
                ))}
              </div>
            </div>

            {/* Compound Words */}
            {inspectKanjiObj.compounds && inspectKanjiObj.compounds.length > 0 && (
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1.5">Compound Vocabulary</span>
                <div className="space-y-1">
                  {inspectKanjiObj.compounds.map((c, cIdx) => (
                    <div key={cIdx} className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                      <span className="font-jp font-bold text-amber-300">{c.word} ({c.reading})</span>
                      <span className="text-slate-300 font-medium">{c.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={() => setInspectKanji(null)}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Grammar Guide Modal */}
      {showGrammarModal && grammarGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-[94vw] sm:w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-400">
                  Japanese Grammar Explanation Guide (व्याकरण व्याख्या)
                </div>
                <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                  Lesson {selectedLesson}: {grammarGuide.lessonTitle}
                </h3>
              </div>
              <button
                onClick={() => setShowGrammarModal(false)}
                className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-all flex-shrink-0"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="space-y-3.5 sm:space-y-4">
              {grammarGuide.grammarPoints.map((point, idx) => (
                <div key={idx} className="bg-slate-950 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-800 space-y-2.5 sm:space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-xs sm:text-sm font-extrabold text-white">{point.title}</h4>
                    <span className="self-start sm:self-auto px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] sm:text-[11px] font-mono font-bold">
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
                            <span className="text-xs sm:text-sm font-jp font-bold text-white">{ex.target}</span>
                            <button
                              onClick={() => playPronunciation(ex.target)}
                              className="p-1 rounded bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-all flex-shrink-0"
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

      {/* Textbook Vocab Short Note Modal (4-column sheet view) */}
      {showShortNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in print:p-0 print:bg-white">
          <div className="w-[96vw] sm:w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col print:max-h-none print:w-full print:border-none print:shadow-none print:bg-white print:text-black">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 print:hidden">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-400">
                    Lesson {selectedLesson} Vocab Short Note (第{selectedLesson}課 語彙整理)
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    Minna no Nihongo Lesson {selectedLesson}: {LESSON_TOPICS[selectedLesson] || ''} ({lessonVocab.length} Words)
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all"
                  title="Print / Save PDF"
                >
                  <Printer className="w-4 h-4 text-blue-400" />
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

            {/* Print Header for print view */}
            <div className="hidden print:block text-center mb-4">
              <h1 className="text-2xl font-bold text-black">Lesson {selectedLesson} 第 {selectedLesson} 課 語彙</h1>
              <p className="text-sm text-gray-700">Minna no Nihongo Vocabulary Reference Sheet ({lessonVocab.length} words)</p>
            </div>

            {/* 4-Column Table Sheet */}
            <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent border border-slate-800 rounded-xl bg-slate-950/60 print:bg-white print:border-black">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 z-10 bg-slate-950 border-b border-slate-800 text-[11px] sm:text-xs text-blue-300 font-extrabold uppercase tracking-wider print:bg-gray-100 print:text-black print:border-black">
                  <tr>
                    <th className="py-2.5 px-3.5 w-1/4 border-r border-slate-800/60 print:border-black">1. Reading (かな)</th>
                    <th className="py-2.5 px-3.5 w-1/4 border-r border-slate-800/60 print:border-black">2. Kanji (漢字)</th>
                    <th className="py-2.5 px-3.5 w-1/4 border-r border-slate-800/60 print:border-black">3. English Meaning</th>
                    <th className="py-2.5 px-3.5 w-1/4 text-amber-400 print:text-black">4. Nepali Meaning (नेपाली अर्थ)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm font-sans print:divide-black">
                  {lessonVocab.map((v, i) => (
                    <tr
                      key={v.id || i}
                      onClick={() => playPronunciation(v.reading)}
                      className="hover:bg-blue-950/30 transition-colors cursor-pointer group print:hover:bg-transparent"
                    >
                      <td className="py-2.5 px-3.5 font-jp font-bold text-base sm:text-lg text-rose-300 group-hover:text-rose-200 border-r border-slate-800/40 print:text-black print:border-black">
                        {v.reading}
                      </td>
                      <td className="py-2.5 px-3.5 font-jp font-bold text-white text-lg border-r border-slate-800/40 print:text-black print:border-black">
                        {v.word !== v.reading && /[\u4e00-\u9faf]/.test(v.word) ? v.word : ''}
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
              <span className="text-[11px] text-slate-400">💡 Click any row to hear audio pronunciation</span>
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
