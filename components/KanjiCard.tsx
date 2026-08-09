'use client';

import React, { useState, useMemo } from 'react';
import {
  RotateCcw,
  Volume2,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Filter,
  CheckCircle,
  ArrowRight,
  Award,
  BookOpen,
  Shuffle,
  HelpCircle,
  FileText,
  Globe,
  Layers,
  Eye,
  EyeOff,
  MessageSquare
} from 'lucide-react';
import { calculateSM2, SrsItemState, SrsRating } from '@/lib/srs-engine';
import { getKanjiByLevel, KanjiItem } from '@/lib/kanji-dataset';
import { getVocabByLevel, VocabItem } from '@/lib/nihongo-vocab';
import { KANJI_1000_DATA, Kanji1000Item } from '@/lib/kanji-1000-data';

export type FlashcardMode = 'JAPANESE_FIRST' | 'MEANING_FIRST' | 'MIXED';
export type AnswerLang = 'ENGLISH' | 'NEPALI' | 'BOTH';
export type ContentCategory = 'KANJI' | 'VOCAB' | 'ALL_MIXED';

export interface UnifiedCardItem {
  id: string;
  itemType: 'VOCAB' | 'KANJI';
  japaneseWord: string;
  reading: string;
  meaningEnglish: string;
  meaningNepali: string;
  kanjiCharacters?: string[];
  partOfSpeech?: string;
  lessonNumber: number;
  lessonLabel: string;
  // Kanji specific
  onyomi?: string[];
  kunyomi?: string[];
  strokeCount?: number;
  strokeSvgData?: string[];
  compounds?: { word: string; reading: string; meaning: string }[];
  // Vocab specific
  grammarSentences?: { japanese: string; reading: string; english: string; nepali: string }[];
}

// Simple deterministic/seeded shuffle algorithm
function shuffleArray<T>(array: T[], seed: number): T[] {
  const arr = [...array];
  let m = arr.length, t: T, i: number;
  let randomSeed = seed;
  const pseudoRandom = () => {
    const x = Math.sin(randomSeed++) * 10000;
    return x - Math.floor(x);
  };
  while (m) {
    i = Math.floor(pseudoRandom() * m--);
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
}

export interface KanjiCardProps {
  currentLevel?: 'BASICS' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'JFT' | 'KANJI_1000';
  hideLevelSelector?: boolean;
}

export const KanjiCard: React.FC<KanjiCardProps> = ({ currentLevel, hideLevelSelector = false }) => {
  const [selectedLevel, setSelectedLevel] = useState<'BASICS' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'JFT' | 'KANJI_1000'>(currentLevel || 'N5');

  React.useEffect(() => {
    if (currentLevel) {
      setSelectedLevel(currentLevel);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  }, [currentLevel]);

  const [selectedLesson, setSelectedLesson] = useState<number | 'ALL'>('ALL');
  const [contentCategory, setContentCategory] = useState<ContentCategory>('KANJI');
  const [answerLang, setAnswerLang] = useState<AnswerLang>('BOTH');
  const [cardMode, setCardMode] = useState<FlashcardMode>('JAPANESE_FIRST');
  const [isShuffled, setIsShuffled] = useState<boolean>(true);
  const [shuffleSeed, setShuffleSeed] = useState<number>(() => Date.now());
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [selectedRating, setSelectedRating] = useState<SrsRating | null>(null);
  const [showAdvanceModal, setShowAdvanceModal] = useState<boolean>(false);

  // Available lessons count by level
  const maxLessonForLevel = selectedLevel === 'N5' ? 25 :
                            selectedLevel === 'N4' ? 50 :
                            selectedLevel === 'N3' ? 75 :
                            selectedLevel === 'BASICS' ? 4 :
                            selectedLevel === 'JFT' ? 20 : 40;
  const minLessonForLevel = 1;

  // Build unified deck based on selected level, lesson, category and shuffle state
  const deck: UnifiedCardItem[] = useMemo(() => {
    const vocabLevel = (selectedLevel === 'KANJI_1000' || selectedLevel === 'BASICS' || selectedLevel === 'JFT') ? 'N5' : selectedLevel as any;
    let rawVocab = getVocabByLevel(vocabLevel);

    let slicedKanji1000: Kanji1000Item[] = [];
    if (selectedLevel === 'N5' || selectedLevel === 'BASICS') {
      slicedKanji1000 = KANJI_1000_DATA.slice(0, 100);
    } else if (selectedLevel === 'N4') {
      slicedKanji1000 = KANJI_1000_DATA.slice(0, 300);
    } else if (selectedLevel === 'JFT') {
      slicedKanji1000 = KANJI_1000_DATA.slice(0, 500);
    } else if (selectedLevel === 'N3') {
      slicedKanji1000 = KANJI_1000_DATA.slice(0, 650);
    } else {
      // N2, N1, KANJI_1000
      slicedKanji1000 = KANJI_1000_DATA;
    }

    if (selectedLesson !== 'ALL') {
      rawVocab = rawVocab.filter(v => v.lesson === selectedLesson);
      slicedKanji1000 = slicedKanji1000.filter(k => Math.ceil(k.number / 25) === selectedLesson);
    }

    const vocabCards: UnifiedCardItem[] = rawVocab.map((v) => ({
      id: `vocab_${v.id}`,
      itemType: 'VOCAB',
      japaneseWord: v.word,
      reading: v.reading,
      meaningEnglish: v.meaning,
      meaningNepali: v.meaningNepali,
      kanjiCharacters: v.kanjiCharacters,
      partOfSpeech: v.partOfSpeech,
      lessonNumber: v.lesson || 0,
      lessonLabel: v.lesson ? `Lesson ${v.lesson}` : 'General',
      grammarSentences: v.grammarSentences,
    }));

    const kanjiCards: UnifiedCardItem[] = slicedKanji1000.map((k) => {
      const parts = k.readings.split(' 、 ');
      const onyomi = parts[0] ? parts[0].split(', ') : [];
      const kunyomi = parts[1] ? parts[1].split(', ') : [];

      const compounds = (k.examples || []).map(ex => {
        const mainParts = ex.split(' - ');
        const meaning = mainParts[1] || '';
        const wordParts = (mainParts[0] || '').trim().split(' ');
        const word = wordParts[0] || '';
        const reading = wordParts.slice(1).join(' ') || '';
        return { word, reading, meaning };
      });

      return {
        id: `kanji1000_${k.number}_${k.character}`,
        itemType: 'KANJI',
        japaneseWord: k.character,
        reading: k.readings,
        meaningEnglish: k.meaningEn,
        meaningNepali: k.meaningNe,
        onyomi: onyomi,
        kunyomi: kunyomi,
        strokeCount: 1,
        compounds: compounds,
        lessonNumber: Math.ceil(k.number / 25),
        lessonLabel: `Group ${Math.ceil(k.number / 25)}`,
      };
    });

    let resultDeck: UnifiedCardItem[] = [];
    if (contentCategory === 'VOCAB') {
      resultDeck = vocabCards;
    } else if (contentCategory === 'KANJI') {
      resultDeck = kanjiCards;
    } else {
      const maxLen = Math.max(vocabCards.length, kanjiCards.length);
      for (let i = 0; i < maxLen; i++) {
        if (i < kanjiCards.length) resultDeck.push(kanjiCards[i]);
        if (i < vocabCards.length) resultDeck.push(vocabCards[i]);
      }
    }

    if (isShuffled && resultDeck.length > 0) {
      return shuffleArray(resultDeck, shuffleSeed);
    }
    return resultDeck;
  }, [selectedLevel, selectedLesson, contentCategory, isShuffled, shuffleSeed]);

  const currentListLength = deck.length;
  const safeIndex = Math.min(currentIndex, Math.max(0, currentListLength - 1));
  const currentCard: UnifiedCardItem | undefined = deck[safeIndex] || deck[0];

  // Determine if the current card displays Meaning on front
  const isMeaningFront =
    cardMode === 'MEANING_FIRST' || (cardMode === 'MIXED' && safeIndex % 2 === 1);

  // SRS Engine Preview
  const currentSrsState: SrsItemState = { easeFactor: 2.5, intervalDays: 0, repetitions: 0 };
  const srsAgain = calculateSM2(currentSrsState, 1);
  const srsHard = calculateSM2(currentSrsState, 2);
  const srsGood = calculateSM2(currentSrsState, 3);
  const srsEasy = calculateSM2(currentSrsState, 4);

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    setSelectedRating(null);
    if (safeIndex < currentListLength - 1) {
      setCurrentIndex(safeIndex + 1);
    } else {
      setShowAdvanceModal(true);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setSelectedRating(null);
    if (safeIndex > 0) {
      setCurrentIndex(safeIndex - 1);
    }
  };

  const triggerReshuffle = () => {
    setShuffleSeed(Date.now());
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleAdvanceLevel = () => {
    setShowAdvanceModal(false);
    const levels: ('N5' | 'N4' | 'N3' | 'N2')[] = ['N5', 'N4', 'N3', 'N2'];
    const currentIdx = levels.indexOf(selectedLevel as any);
    if (currentIdx < levels.length - 1) {
      setSelectedLevel(levels[currentIdx + 1]);
      setSelectedLesson('ALL');
      setCurrentIndex(0);
      setIsFlipped(false);
    } else {
      alert('Amazing! You have completed all JLPT Levels in LanguageGuru!');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto font-sans space-y-3 sm:space-y-4">

      {/* ── UNIFIED FLASHCARD BOARD ── */}
      {currentCard ? (
        <div className="relative group">
          <div
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.closest('button') || target.closest('select') || target.closest('a')) return;
              setIsFlipped(prev => !prev);
            }}
            style={{ cursor: 'pointer' }}
            className={`w-full min-h-[380px] sm:min-h-[440px] bg-white text-slate-900 border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-xs transition-all duration-300 flex flex-col justify-between select-none overflow-hidden ${isFlipped ? 'border-rose-600/60 shadow-sm' : 'hover:border-slate-300'
              }`}
          >
            {/* Card Header Bar (Integrated Lesson Badge, Counter & Flip button) */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-black text-base shadow-xs font-jp flex-shrink-0">
                  {contentCategory === 'VOCAB' ? (currentCard.reading[0] || 'あ') : (currentCard.japaneseWord[0] || '字')}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] sm:text-xs font-black uppercase text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md flex items-center gap-1 whitespace-nowrap">
                      <BookOpen className="w-3 h-3 text-rose-700" />
                      <span>JLPT {selectedLevel} • {currentCard.lessonLabel}</span>
                    </span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border whitespace-nowrap ${currentCard.itemType === 'VOCAB' ? 'bg-indigo-50 text-indigo-800 border-indigo-200' : 'bg-amber-50 text-amber-900 border-amber-200'
                      }`}>
                      {currentCard.itemType === 'VOCAB' ? (contentCategory === 'VOCAB' ? '📖 Vocab (Kana)' : '📖 Vocab') : '🥞 Kanji'}
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-500 mt-0.5 truncate">
                    Card {safeIndex + 1} of {currentListLength} {isShuffled && '(Random)'}
                  </div>
                </div>
              </div>

              {/* Quick Header Controls */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {/* 1. Header Eye Button (Left of Filter) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(prev => !prev);
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer select-none active:scale-95 shadow-2xs"
                  title={isFlipped ? "Click to hide answer" : "Click to show answer"}
                >
                  {isFlipped ? (
                    <>
                      <Eye className="w-3.5 h-3.5 text-rose-700" />
                      <span className="hidden xs:inline">Hide</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-rose-700" />
                      <span className="hidden xs:inline">Show</span>
                    </>
                  )}
                </button>

                {/* 2. Filter Dropdown Button with Event Isolation */}
                <div className="relative filter-popover-container" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowOptions(!showOptions);
                    }}
                    className="text-xs font-black px-3 py-1.5 rounded-xl bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                    title="Filter Kanji, Vocab & Lessons"
                  >
                    <Filter className="w-3.5 h-3.5 text-rose-700" />
                    <span className="hidden xs:inline">
                      {contentCategory === 'KANJI' ? 'Kanji' : contentCategory === 'VOCAB' ? 'Vocab (Kana)' : 'Mix'}
                      {selectedLesson !== 'ALL' ? ` • L${selectedLesson}` : ''}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${showOptions ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Filter Dropdown Popover */}
                  {showOptions && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setShowOptions(false); }} />
                      <div onClick={(e) => e.stopPropagation()} className="absolute right-0 top-full mt-2 w-72 bg-white border border-slate-200 rounded-2xl p-3.5 shadow-2xl z-50 space-y-3 font-sans text-left text-slate-900">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                          <div className="flex items-center gap-1.5 text-xs font-black text-rose-700">
                            <Filter className="w-3.5 h-3.5 text-rose-700" />
                            <span>Japanese Flashcard Filters</span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-bold">{currentListLength} items</span>
                        </div>

                        {/* Level Selection (If unlocked) */}
                        {!hideLevelSelector && !currentLevel && (
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-600 block mb-1.5">
                              JLPT Level Selection
                            </label>
                            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                              {(['N5', 'N4', 'N3', 'N2'] as const).map((lvl) => (
                                <button
                                  key={lvl}
                                  onClick={() => {
                                    setSelectedLevel(lvl);
                                    setSelectedLesson('ALL');
                                    setCurrentIndex(0);
                                    setIsFlipped(false);
                                  }}
                                  className={`flex-1 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                                    selectedLevel === lvl
                                      ? 'bg-rose-600 text-white shadow-xs'
                                      : 'text-slate-600 hover:text-rose-700'
                                  }`}
                                >
                                  {lvl}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Content Category: Kanji / Vocab / Mix */}
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-600 block mb-1.5">
                            Category Selection
                          </label>
                          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                            <button
                              onClick={() => { setContentCategory('KANJI'); setCurrentIndex(0); setIsFlipped(false); }}
                              className={`px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl text-xs font-extrabold transition-all flex items-center gap-1 cursor-pointer ${
                                contentCategory === 'KANJI'
                                  ? 'bg-rose-600 text-white shadow-xs'
                                  : 'text-slate-600 hover:text-rose-700'
                              }`}
                              title="Show only Kanji study cards"
                            >
                              <Layers className="w-3.5 h-3.5" />
                              <span>Kanji</span>
                            </button>
                            <button
                              onClick={() => { setContentCategory('VOCAB'); setCurrentIndex(0); setIsFlipped(false); }}
                              className={`px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl text-xs font-extrabold transition-all flex items-center gap-1 cursor-pointer ${
                                contentCategory === 'VOCAB'
                                  ? 'bg-rose-600 text-white shadow-xs'
                                  : 'text-slate-600 hover:text-rose-700'
                              }`}
                              title="Show only Vocabulary cards (in Kana, no Kanji)"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Vocab (Kana)</span>
                            </button>
                            <button
                              onClick={() => { setContentCategory('ALL_MIXED'); setCurrentIndex(0); setIsFlipped(false); }}
                              className={`px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl text-xs font-extrabold transition-all flex items-center gap-1 cursor-pointer ${
                                contentCategory === 'ALL_MIXED'
                                  ? 'bg-rose-600 text-white shadow-xs'
                                  : 'text-slate-600 hover:text-rose-700'
                              }`}
                              title="Practice Vocabulary & Kanji mixed together"
                            >
                              <Shuffle className="w-3.5 h-3.5" />
                              <span>Mix</span>
                            </button>
                          </div>
                        </div>

                        {/* Lesson Selection */}
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-600 block mb-1">
                            Lesson Filter
                          </label>
                          <select
                            value={selectedLesson}
                            onChange={(e) => {
                              setSelectedLesson(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value));
                              setCurrentIndex(0);
                              setIsFlipped(false);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-rose-600"
                          >
                            <option value="ALL">All Lessons ({minLessonForLevel}–{maxLessonForLevel})</option>
                            {Array.from({ length: maxLessonForLevel - minLessonForLevel + 1 }, (_, i) => minLessonForLevel + i).map((n) => (
                              <option key={n} value={n}>Lesson {n}</option>
                            ))}
                          </select>
                        </div>

                        {/* Shuffle Mode Toggle */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                            <Shuffle className="w-3.5 h-3.5 text-rose-700" />
                            <span>Shuffle Order</span>
                          </div>
                          <button
                            onClick={() => {
                              setIsShuffled(!isShuffled);
                              setCurrentIndex(0);
                            }}
                            className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${isShuffled ? 'bg-rose-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600'
                              }`}
                          >
                            {isShuffled ? 'Random' : 'Serial'}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* ════════════════════════════════════════════════════════ */}
            {/* CARD FRONT (Inner White Card Body)                         */}
            {/* ════════════════════════════════════════════════════════ */}
            {!isFlipped && (
              <div className="my-auto w-full max-w-lg mx-auto h-[250px] sm:h-[280px] bg-slate-50/80 border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xs flex flex-col items-center justify-center space-y-3 overflow-y-auto scrollbar-thin">
                {!isMeaningFront ? (
                  /* JAPANESE-FIRST FRONT */
                  <div className="w-full space-y-3 text-center">
                    {(() => {
                      const text = contentCategory === 'VOCAB' ? currentCard.reading : currentCard.japaneseWord;
                      const len = text.length;
                      const sizeClass = len <= 2 ? 'text-5xl sm:text-7xl' : len <= 4 ? 'text-3xl sm:text-5xl' : len <= 8 ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl font-bold';
                      return (
                        <div className="space-y-2">
                          <div className={`${sizeClass} font-jp font-black text-slate-900 tracking-wide select-none leading-tight break-words px-2`}>
                            {text}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              playAudio(text);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white hover:bg-rose-600 text-rose-700 hover:text-white text-xs font-bold transition-all border border-slate-200 cursor-pointer shadow-2xs"
                          >
                            <Volume2 className="w-3.5 h-3.5 text-rose-700 hover:text-white" />
                            <span>Play Audio</span>
                          </button>
                        </div>
                      );
                    })()}
                    <div className="text-[11px] sm:text-xs text-slate-500 font-semibold italic">
                      {contentCategory === 'VOCAB' ? 'Pure Kana Vocabulary (No Kanji)' : 'Click card body or top 👁 Eye button to toggle'}
                    </div>
                  </div>
                ) : (
                  /* MEANING-FIRST FRONT */
                  <div className="w-full space-y-4 text-center">
                    <div className="space-y-2 max-w-lg mx-auto">
                      <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-800">Meaning Prompt</div>
                      {(answerLang === 'ENGLISH' || answerLang === 'BOTH') && (
                        <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                          🇬🇧 {currentCard.meaningEnglish}
                        </div>
                      )}
                      {(answerLang === 'NEPALI' || answerLang === 'BOTH') && (
                        <div className="text-xl sm:text-2xl font-black text-slate-700 leading-snug font-jp">
                          🇳🇵 {currentCard.meaningNepali}
                        </div>
                      )}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-500 font-semibold italic">
                      Click card body or top 👁 Eye button to toggle
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Front Card Navigation Bar */}
            {!isFlipped && (
              <div className="pt-3 mt-auto border-t border-slate-200 flex items-center justify-between gap-4">
                <button
                  onClick={handlePrev}
                  disabled={safeIndex === 0}
                  className="px-4 py-2 sm:px-5 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-black disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5 transition-all shadow-2xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleNext}
                  className="px-5 py-2 sm:px-6 sm:py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* CARD BACK (ANSWER FLIPPED) */}
            {isFlipped && (
              <div className="my-auto w-full max-w-lg mx-auto h-[250px] sm:h-[280px] bg-slate-50/80 border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between space-y-3 overflow-y-auto scrollbar-thin text-left">
                {/* Japanese Word & Pronunciation */}
                <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white border border-slate-200">
                  <div className="space-y-0.5 min-w-0">
                    {(() => {
                      const text = contentCategory === 'VOCAB' ? currentCard.reading : currentCard.japaneseWord;
                      const len = text.length;
                      const sizeClass = len <= 3 ? 'text-2xl sm:text-3xl' : len <= 6 ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg font-bold';
                      return (
                        <div className={`${sizeClass} font-jp font-black text-slate-900 truncate`}>
                          {text}
                        </div>
                      );
                    })()}
                    {contentCategory !== 'VOCAB' && (
                      <div className="text-xs font-jp font-bold text-rose-700 truncate">
                        Reading: {currentCard.reading}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => playAudio(currentCard.reading || currentCard.japaneseWord)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-rose-600 text-rose-700 hover:text-white transition-all border border-slate-200 shrink-0 cursor-pointer shadow-2xs"
                    title="Play pronunciation"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* English & Nepali Meanings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(answerLang === 'ENGLISH' || answerLang === 'BOTH') && (
                    <div className="p-3 rounded-2xl bg-white border border-slate-200 space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 block">English Meaning</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">🇬🇧 {currentCard.meaningEnglish}</span>
                    </div>
                  )}
                  {(answerLang === 'NEPALI' || answerLang === 'BOTH') && (
                    <div className="p-3 rounded-2xl bg-white border border-slate-200 space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">Nepali Meaning</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed font-jp">🇳🇵 {currentCard.meaningNepali}</span>
                    </div>
                  )}
                </div>

                {/* Kanji Specific: Onyomi / Kunyomi / Stroke Count / Compounds */}
                {currentCard.itemType === 'KANJI' && contentCategory !== 'VOCAB' && (
                  <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                      <span className="font-extrabold text-rose-700 uppercase tracking-wider text-[10px] sm:text-[11px]">Kanji Breakdown</span>
                      {currentCard.strokeCount && (
                        <span className="text-slate-500 text-[11px] font-medium">Strokes: {currentCard.strokeCount}</span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-rose-700 block uppercase">Onyomi (音読み)</span>
                        <span className="font-jp font-bold text-slate-900 text-[11px]">{currentCard.onyomi?.join(', ') || '—'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-amber-800 block uppercase">Kunyomi (訓読み)</span>
                        <span className="font-jp font-bold text-slate-900 text-[11px]">{currentCard.kunyomi?.join(', ') || '—'}</span>
                      </div>
                    </div>

                    {currentCard.compounds && currentCard.compounds.length > 0 && (
                      <div className="space-y-1 pt-1 border-t border-slate-200/80">
                        <span className="text-[10px] font-bold uppercase text-slate-500">Common Kanji Compounds:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {currentCard.compounds.map((cp, cIdx) => (
                            <div key={cIdx} className="px-2 py-0.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] sm:text-[11px] font-jp">
                              <span className="font-bold text-slate-900">{cp.word}</span>
                              <span className="text-rose-700 ml-1">({cp.reading})</span>
                              <span className="text-slate-600 ml-1">— {cp.meaning}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}


            {/* SRS Review Controls */}
            {isFlipped && (
              <div className="pt-3 border-t border-slate-200 space-y-2">
                <div className="text-[10px] font-black text-slate-500 text-center uppercase tracking-wider">
                  Select SRS Rating to Advance:
                </div>
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  <button
                    onClick={() => { setSelectedRating(1); handleNext(); }}
                    className="p-2 sm:p-2.5 rounded-xl bg-rose-50 hover:bg-rose-600 hover:text-white border border-rose-200 text-rose-950 text-xs font-black transition-all text-center cursor-pointer shadow-2xs group/srs"
                  >
                    <div className="font-black text-rose-700 group-hover/srs:text-white text-xs">Again</div>
                    <div className="text-[9px] sm:text-[10px] text-rose-700/80 group-hover/srs:text-rose-100 mt-0.5">{srsAgain.intervalDays}d</div>
                  </button>
                  <button
                    onClick={() => { setSelectedRating(2); handleNext(); }}
                    className="p-2 sm:p-2.5 rounded-xl bg-amber-50 hover:bg-amber-600 hover:text-white border border-amber-200 text-amber-950 text-xs font-black transition-all text-center cursor-pointer shadow-2xs group/srs"
                  >
                    <div className="font-black text-amber-800 group-hover/srs:text-white text-xs">Hard</div>
                    <div className="text-[9px] sm:text-[10px] text-amber-800/80 group-hover/srs:text-amber-100 mt-0.5">{srsHard.intervalDays}d</div>
                  </button>
                  <button
                    onClick={() => { setSelectedRating(3); handleNext(); }}
                    className="p-2 sm:p-2.5 rounded-xl bg-sky-50 hover:bg-sky-600 hover:text-white border border-sky-200 text-sky-950 text-xs font-black transition-all text-center cursor-pointer shadow-2xs group/srs"
                  >
                    <div className="font-black text-sky-800 group-hover/srs:text-white text-xs">Good</div>
                    <div className="text-[9px] sm:text-[10px] text-sky-800/80 group-hover/srs:text-sky-100 mt-0.5">{srsGood.intervalDays}d</div>
                  </button>
                  <button
                    onClick={() => { setSelectedRating(4); handleNext(); }}
                    className="p-2 sm:p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-200 text-emerald-950 text-xs font-black transition-all text-center cursor-pointer shadow-2xs group/srs"
                  >
                    <div className="font-black text-emerald-800 group-hover/srs:text-white text-xs">Easy</div>
                    <div className="text-[9px] sm:text-[10px] text-emerald-800/80 group-hover/srs:text-emerald-100 mt-0.5">{srsEasy.intervalDays}d</div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 p-8 rounded-2xl text-center text-slate-400 text-xs">
          No cards found for this lesson filter. Please select "All Lessons".
        </div>
      )}

      {/* Reset Deck Option Below Card */}
      {currentCard && (
        <div className="flex items-center justify-center pt-1">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="text-xs font-extrabold text-slate-400 hover:text-rose-400 flex items-center gap-1.5 transition-colors cursor-pointer py-1.5 px-3.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Deck to Card 1</span>
          </button>
        </div>
      )}

      {/* ── ADVANCE LEVEL MODAL ── */}
      {showAdvanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-3xl mx-auto shadow-glow">
              🏆
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Deck Completed!</h3>
              <p className="text-xs text-slate-400 mt-1">
                You've reviewed all cards in JLPT {selectedLevel} {selectedLesson !== 'ALL' ? `Lesson ${selectedLesson}` : ''}.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => { setShowAdvanceModal(false); triggerReshuffle(); }}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700"
              >
                🔄 Repeat Random Deck
              </button>
              <button
                onClick={handleAdvanceLevel}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold transition-all shadow-glow flex items-center justify-center gap-1"
              >
                <span>Next Level</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
