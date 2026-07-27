'use client';

import React, { useState, useMemo } from 'react';
import {
  RotateCcw,
  Volume2,
  Sparkles,
  ChevronRight,
  ChevronLeft,
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
  MessageSquare
} from 'lucide-react';
import { calculateSM2, SrsItemState, SrsRating } from '@/lib/srs-engine';
import { getKanjiByLevel, KanjiItem } from '@/lib/kanji-dataset';
import { getVocabByLevel, VocabItem } from '@/lib/nihongo-vocab';

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

export const KanjiCard: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<'N5' | 'N4' | 'N3' | 'N2'>('N5');
  const [selectedLesson, setSelectedLesson] = useState<number | 'ALL'>('ALL');
  const [contentCategory, setContentCategory] = useState<ContentCategory>('KANJI');
  const [answerLang, setAnswerLang] = useState<AnswerLang>('BOTH');
  const [cardMode, setCardMode] = useState<FlashcardMode>('MIXED');
  const [isShuffled, setIsShuffled] = useState<boolean>(true);
  const [shuffleSeed, setShuffleSeed] = useState<number>(() => Date.now());

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [selectedRating, setSelectedRating] = useState<SrsRating | null>(null);
  const [showAdvanceModal, setShowAdvanceModal] = useState<boolean>(false);

  // Available lessons count by level
  const maxLessonForLevel = selectedLevel === 'N5' ? 25 : selectedLevel === 'N4' ? 50 : selectedLevel === 'N3' ? 75 : 100;
  const minLessonForLevel = selectedLevel === 'N5' ? 1 : selectedLevel === 'N4' ? 26 : selectedLevel === 'N3' ? 51 : 76;

  // Build unified deck based on selected level, lesson, category and shuffle state
  const deck: UnifiedCardItem[] = useMemo(() => {
    let rawVocab = getVocabByLevel(selectedLevel as any);
    let rawKanji = getKanjiByLevel(selectedLevel);

    if (selectedLesson !== 'ALL') {
      rawVocab = rawVocab.filter(v => v.lesson === selectedLesson);
      rawKanji = rawKanji.filter(k => k.lessonOrder === selectedLesson);
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
      lessonNumber: v.lesson,
      lessonLabel: `Lesson ${v.lesson}`,
      grammarSentences: v.grammarSentences,
    }));

    const kanjiCards: UnifiedCardItem[] = rawKanji.map((k) => ({
      id: `kanji_${k.character}_${k.lessonOrder}`,
      itemType: 'KANJI',
      japaneseWord: k.character,
      reading: [...k.readingsOnyomi, ...k.readingsKunyomi].join(', ') || '—',
      meaningEnglish: k.meanings.join(', '),
      meaningNepali: k.meaningsNepali?.join(', ') || '',
      onyomi: k.readingsOnyomi,
      kunyomi: k.readingsKunyomi,
      strokeCount: k.strokeCount,
      strokeSvgData: k.strokeSvgData,
      compounds: k.compounds,
      lessonNumber: k.lessonOrder,
      lessonLabel: `Lesson ${k.lessonOrder}`,
    }));

    let resultDeck: UnifiedCardItem[] = [];
    if (contentCategory === 'VOCAB') resultDeck = vocabCards;
    else if (contentCategory === 'KANJI') resultDeck = kanjiCards;
    else {
      // ALL_MIXED: Interleave vocabulary & kanji cards
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

  // Stroke paths for Kanji view
  const strokePaths = currentCard?.strokeSvgData || [
    'M20,30 L80,30',
    'M50,15 L50,85',
    'M25,50 L75,50',
    'M15,85 L85,85',
  ];

  // SRS Engine Preview
  const currentSrsState: SrsItemState = { easeFactor: 2.5, intervalDays: 0, repetitions: 0 };
  const srsAgain = calculateSM2(currentSrsState, 1);
  const srsHard  = calculateSM2(currentSrsState, 2);
  const srsGood  = calculateSM2(currentSrsState, 3);
  const srsEasy  = calculateSM2(currentSrsState, 4);

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
    const currentIdx = levels.indexOf(selectedLevel);
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
    <div className="w-full max-w-3xl mx-auto font-sans space-y-4">

      {/* ── CONTROLS PANEL ── */}
      <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-3.5">
        
        {/* Row 1: Level Selector & Category */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* JLPT Level Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-2xl border border-slate-800 flex-1">
            {(['N5', 'N4', 'N3', 'N2'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setSelectedLevel(lvl);
                  setSelectedLesson('ALL');
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                  selectedLevel === lvl
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-glow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                JLPT {lvl}
              </button>
            ))}
          </div>

          {/* Category Toggle: Kanji vs Vocab vs All Mix */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => { setContentCategory('KANJI'); setCurrentIndex(0); setIsFlipped(false); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                contentCategory === 'KANJI'
                  ? 'bg-rose-600 text-white shadow-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Kanji</span>
            </button>
            <button
              onClick={() => { setContentCategory('VOCAB'); setCurrentIndex(0); setIsFlipped(false); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                contentCategory === 'VOCAB'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Vocab</span>
            </button>
            <button
              onClick={() => { setContentCategory('ALL_MIXED'); setCurrentIndex(0); setIsFlipped(false); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                contentCategory === 'ALL_MIXED'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Practice Vocabulary & Kanji mixed together"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>🔀 Mix All</span>
            </button>
          </div>
        </div>

        {/* Row 2: Lesson Filter & Random Shuffle Control */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2.5 border-t border-slate-800/80">
          {/* Lesson Filter Dropdown */}
          <div className="flex items-center gap-2 flex-1">
            <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" /> Filter Lesson:
            </span>
            <select
              value={selectedLesson}
              onChange={(e) => {
                const val = e.target.value === 'ALL' ? 'ALL' : Number(e.target.value);
                setSelectedLesson(val);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className="bg-slate-950 border border-slate-800 text-white text-xs font-bold rounded-xl px-3 py-1.5 flex-1 focus:outline-none focus:border-rose-500"
            >
              <option value="ALL">All Lessons ({minLessonForLevel}–{maxLessonForLevel}) • Random Practice</option>
              {Array.from({ length: maxLessonForLevel - minLessonForLevel + 1 }, (_, i) => minLessonForLevel + i).map((n) => (
                <option key={n} value={n}>Lesson {n}</option>
              ))}
            </select>
          </div>

          {/* Random Shuffle Toggle & Re-shuffle Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={triggerReshuffle}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black flex items-center gap-1.5 shadow-md transition-all cursor-pointer whitespace-nowrap"
              title="Reshuffle current deck randomly"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>🔀 Reshuffle Deck</span>
            </button>

            <button
              onClick={() => setIsShuffled(!isShuffled)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all whitespace-nowrap ${
                isShuffled
                  ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-400'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              {isShuffled ? '🎲 Random Order' : '🔢 Serial Order'}
            </button>
          </div>
        </div>

        {/* Row 3: Answer Language & Card Order Mode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2.5 border-t border-slate-800/80">
          {/* Answer Language Choice */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-rose-400" /> Answer Lang:
            </span>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 flex-1">
              <button
                onClick={() => setAnswerLang('ENGLISH')}
                className={`flex-1 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  answerLang === 'ENGLISH' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => setAnswerLang('NEPALI')}
                className={`flex-1 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  answerLang === 'NEPALI' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                🇳🇵 नेपाली
              </button>
              <button
                onClick={() => setAnswerLang('BOTH')}
                className={`flex-1 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  answerLang === 'BOTH' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                🌐 Both
              </button>
            </div>
          </div>

          {/* Flashcard Front Mode */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-indigo-400" /> Front Mode:
            </span>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 flex-1">
              <button
                onClick={() => { setCardMode('JAPANESE_FIRST'); setIsFlipped(false); }}
                className={`flex-1 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  cardMode === 'JAPANESE_FIRST' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
                title="Japanese on front, answer hidden until flip"
              >
                🇯🇵 Japanese
              </button>
              <button
                onClick={() => { setCardMode('MEANING_FIRST'); setIsFlipped(false); }}
                className={`flex-1 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  cardMode === 'MEANING_FIRST' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
                title="Meaning on front, Japanese hidden until flip"
              >
                🗣️ Meaning
              </button>
              <button
                onClick={() => { setCardMode('MIXED'); setIsFlipped(false); }}
                className={`flex-1 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  cardMode === 'MIXED' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
                title="Mix Japanese-first and Meaning-first randomly"
              >
                🔀 Mix
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── CARD HEADER COUNTER & PROMINENT LESSON TRACKER ── */}
      {currentCard ? (
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between shadow-glow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-600 flex items-center justify-center text-white font-black text-xl shadow-md font-jp">
              {currentCard.japaneseWord[0] || '字'}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                {/* PROMINENT LESSON BADGE */}
                <span className="text-xs font-black uppercase tracking-wider text-rose-400 bg-rose-500/15 border border-rose-500/30 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-rose-400" />
                  <span>JLPT {selectedLevel} • {currentCard.lessonLabel}</span>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-950 text-[10px] font-bold text-amber-400 border border-slate-800">
                  {isMeaningFront ? 'Meaning → Japanese' : 'Japanese → Meaning'}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-950 text-[10px] font-bold text-indigo-300 border border-slate-800">
                  {currentCard.itemType}
                </span>
              </div>
              <div className="text-xs font-bold text-slate-300 mt-1">
                Card {safeIndex + 1} of {currentListLength} {isShuffled && '(Random order)'}
              </div>
            </div>
          </div>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={safeIndex === 0}
              className="p-2 rounded-xl bg-slate-800 disabled:opacity-40 hover:bg-indigo-600 text-white transition-all border border-slate-700"
              title="Previous card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all border border-slate-750 shadow-glow"
              title="Next card"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 p-8 rounded-2xl text-center text-slate-400 text-xs">
          No cards found for this lesson filter. Please select "All Lessons".
        </div>
      )}

      {/* ── FLASHCARD BOARD ── */}
      {currentCard && (
        <div className="relative group">
          <div
            className={`w-full min-h-[480px] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl transition-all duration-300 flex flex-col justify-between ${
              isFlipped ? 'border-indigo-500/60 shadow-glow' : 'hover:border-slate-700'
            }`}
          >
            {/* Top Card Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-rose-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                  JLPT {selectedLevel} • {currentCard.lessonLabel}
                </span>
                <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                  {currentCard.partOfSpeech || (currentCard.itemType === 'KANJI' ? 'Kanji Character' : 'Vocab')}
                </span>
              </div>

              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className={`text-xs font-extrabold px-4 py-2 rounded-xl transition-all flex items-center gap-2 shadow-md ${
                  isFlipped
                    ? 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 shadow-glow'
                }`}
              >
                {isFlipped ? <RotateCcw className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{isFlipped ? 'Show Front' : 'Show Answer'}</span>
              </button>
            </div>

            {/* ════════════════════════════════════════════════════════ */}
            {/* CARD FRONT                                                */}
            {/* ════════════════════════════════════════════════════════ */}
            {!isFlipped ? (
              !isMeaningFront ? (
                /* JAPANESE-FIRST FRONT */
                <div className="my-auto py-8 space-y-6 text-center">
                  <div className="space-y-3">
                    <div className="text-5xl sm:text-6xl font-jp font-black text-white tracking-wide">
                      {currentCard.japaneseWord}
                    </div>
                    <button
                      onClick={() => playAudio(currentCard.reading || currentCard.japaneseWord)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-rose-600 text-slate-300 hover:text-white text-xs font-bold transition-all border border-slate-700"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Play Audio</span>
                    </button>
                  </div>
                  <div className="text-xs text-slate-500 font-semibold italic">
                    Tap "Show Answer" below to reveal reading and meaning
                  </div>
                </div>
              ) : (
                /* MEANING-FIRST FRONT */
                <div className="my-auto py-8 space-y-6 text-center">
                  <div className="space-y-3 max-w-lg mx-auto">
                    <div className="text-xs font-bold uppercase tracking-widest text-amber-400">Meaning Prompt</div>
                    {(answerLang === 'ENGLISH' || answerLang === 'BOTH') && (
                      <div className="text-2xl sm:text-3xl font-black text-white leading-snug">
                        🇬🇧 {currentCard.meaningEnglish}
                      </div>
                    )}
                    {(answerLang === 'NEPALI' || answerLang === 'BOTH') && (
                      <div className="text-xl sm:text-2xl font-black text-amber-300 leading-snug">
                        🇳🇵 {currentCard.meaningNepali}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 font-semibold italic">
                    Tap "Show Answer" to reveal Japanese Kanji & Reading
                  </div>
                </div>
              )
            ) : (
              /* ════════════════════════════════════════════════════════ */
              /* CARD BACK (ANSWER FLIPPED)                              */
              /* ════════════════════════════════════════════════════════ */
              <div className="my-auto py-4 space-y-5 text-left">
                {/* Japanese Word & Pronunciation */}
                <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="space-y-1">
                    <div className="text-3xl sm:text-4xl font-jp font-black text-white">
                      {currentCard.japaneseWord}
                    </div>
                    <div className="text-sm font-jp font-bold text-rose-300">
                      Reading: {currentCard.reading}
                    </div>
                  </div>
                  <button
                    onClick={() => playAudio(currentCard.reading || currentCard.japaneseWord)}
                    className="p-3 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-all border border-slate-700"
                    title="Play pronunciation"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                {/* English & Nepali Meanings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(answerLang === 'ENGLISH' || answerLang === 'BOTH') && (
                    <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">English Meaning</span>
                      <span className="text-sm font-bold text-white leading-relaxed">🇬🇧 {currentCard.meaningEnglish}</span>
                    </div>
                  )}
                  {(answerLang === 'NEPALI' || answerLang === 'BOTH') && (
                    <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">Nepali Meaning</span>
                      <span className="text-sm font-bold text-amber-300 leading-relaxed">🇳🇵 {currentCard.meaningNepali}</span>
                    </div>
                  )}
                </div>

                {/* Kanji Specific: Onyomi / Kunyomi / Stroke Count / Compounds */}
                {currentCard.itemType === 'KANJI' && (
                  <div className="p-4 rounded-2xl bg-slate-950/90 border border-indigo-900/40 space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-extrabold text-indigo-400 uppercase tracking-wider text-[11px]">Kanji Breakdown</span>
                      {currentCard.strokeCount && (
                        <span className="text-slate-400 font-medium">Strokes: {currentCard.strokeCount}</span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-rose-400 block uppercase">Onyomi (音読み)</span>
                        <span className="font-jp font-bold text-slate-200">{currentCard.onyomi?.join(', ') || '—'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-emerald-400 block uppercase">Kunyomi (訓読み)</span>
                        <span className="font-jp font-bold text-slate-200">{currentCard.kunyomi?.join(', ') || '—'}</span>
                      </div>
                    </div>

                    {currentCard.compounds && currentCard.compounds.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold uppercase text-slate-400">Common Kanji Compounds:</span>
                        <div className="flex flex-wrap gap-2">
                          {currentCard.compounds.map((cp, cIdx) => (
                            <div key={cIdx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-jp">
                              <span className="font-bold text-white">{cp.word}</span>
                              <span className="text-rose-300 ml-1">({cp.reading})</span>
                              <span className="text-slate-400 ml-1">— {cp.meaning}</span>
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
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <div className="text-[11px] font-bold text-slate-400 text-center uppercase tracking-wider">
                  Select SRS Rating to Advance:
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => { setSelectedRating(1); handleNext(); }}
                    className="p-2.5 rounded-xl bg-rose-950/80 hover:bg-rose-700 border border-rose-800 text-white text-xs font-bold transition-all text-center"
                  >
                    <div className="font-black text-rose-400">Again</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{srsAgain.intervalDays}d</div>
                  </button>
                  <button
                    onClick={() => { setSelectedRating(2); handleNext(); }}
                    className="p-2.5 rounded-xl bg-amber-950/80 hover:bg-amber-700 border border-amber-800 text-white text-xs font-bold transition-all text-center"
                  >
                    <div className="font-black text-amber-400">Hard</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{srsHard.intervalDays}d</div>
                  </button>
                  <button
                    onClick={() => { setSelectedRating(3); handleNext(); }}
                    className="p-2.5 rounded-xl bg-blue-950/80 hover:bg-blue-700 border border-blue-800 text-white text-xs font-bold transition-all text-center"
                  >
                    <div className="font-black text-blue-400">Good</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{srsGood.intervalDays}d</div>
                  </button>
                  <button
                    onClick={() => { setSelectedRating(4); handleNext(); }}
                    className="p-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-700 border border-emerald-800 text-white text-xs font-bold transition-all text-center"
                  >
                    <div className="font-black text-emerald-400">Easy</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{srsEasy.intervalDays}d</div>
                  </button>
                </div>
              </div>
            )}
          </div>
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
