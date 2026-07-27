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
export type ContentCategory = 'VOCAB' | 'KANJI' | 'ALL_MIXED';

export interface UnifiedCardItem {
  id: string;
  itemType: 'VOCAB' | 'KANJI';
  japaneseWord: string;
  reading: string;
  meaningEnglish: string;
  meaningNepali: string;
  kanjiCharacters?: string[];
  partOfSpeech?: string;
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

export const KanjiCard: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<'N5' | 'N4' | 'N3'>('N5');
  const [contentCategory, setContentCategory] = useState<ContentCategory>('ALL_MIXED');
  const [answerLang, setAnswerLang] = useState<AnswerLang>('BOTH');
  const [cardMode, setCardMode] = useState<FlashcardMode>('MIXED');

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [selectedRating, setSelectedRating] = useState<SrsRating | null>(null);
  const [showAdvanceModal, setShowAdvanceModal] = useState<boolean>(false);

  // Build unified deck based on selected level and category
  const deck: UnifiedCardItem[] = useMemo(() => {
    const rawVocab = getVocabByLevel(selectedLevel);
    const rawKanji = getKanjiByLevel(selectedLevel);

    const vocabCards: UnifiedCardItem[] = rawVocab.map((v) => ({
      id: `vocab_${v.id}`,
      itemType: 'VOCAB',
      japaneseWord: v.word,
      reading: v.reading,
      meaningEnglish: v.meaning,
      meaningNepali: v.meaningNepali,
      kanjiCharacters: v.kanjiCharacters,
      partOfSpeech: v.partOfSpeech,
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
      lessonLabel: `Kanji Lesson ${k.lessonOrder}`,
    }));

    if (contentCategory === 'VOCAB') return vocabCards;
    if (contentCategory === 'KANJI') return kanjiCards;

    // ALL_MIXED: Interleave vocabulary & kanji cards
    const mixed: UnifiedCardItem[] = [];
    const maxLen = Math.max(vocabCards.length, kanjiCards.length);
    for (let i = 0; i < maxLen; i++) {
      if (i < vocabCards.length) mixed.push(vocabCards[i]);
      if (i < kanjiCards.length) mixed.push(kanjiCards[i]);
    }
    return mixed;
  }, [selectedLevel, contentCategory]);

  const currentListLength = deck.length;
  const safeIndex = Math.min(currentIndex, Math.max(0, currentListLength - 1));
  const currentCard: UnifiedCardItem = deck[safeIndex] || deck[0];

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

  const handleAdvanceLevel = () => {
    setShowAdvanceModal(false);
    const levels: ('N5' | 'N4' | 'N3')[] = ['N5', 'N4', 'N3'];
    const currentIdx = levels.indexOf(selectedLevel);
    if (currentIdx < levels.length - 1) {
      setSelectedLevel(levels[currentIdx + 1]);
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
            {(['N5', 'N4', 'N3'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setSelectedLevel(lvl);
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

          {/* Category Toggle: Vocab vs Kanji vs All Mix */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 flex-wrap sm:flex-nowrap">
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
              <span>🔀 All Mix (Vocab + Kanji)</span>
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
              onClick={() => { setContentCategory('KANJI'); setCurrentIndex(0); setIsFlipped(false); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                contentCategory === 'KANJI'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Kanji</span>
            </button>
          </div>
        </div>

        {/* Row 2: Answer Language & Card Order Mode */}
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

      {/* ── CARD HEADER COUNTER ── */}
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between shadow-glow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-600 flex items-center justify-center text-white font-black text-xl shadow-md font-jp">
            {currentCard?.japaneseWord[0] || '字'}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                JLPT {selectedLevel} • {currentCard?.lessonLabel}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-950 text-[10px] font-bold text-amber-400 border border-slate-800">
                {isMeaningFront ? 'Meaning → Japanese' : 'Japanese → Meaning'}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-950 text-[10px] font-bold text-indigo-300 border border-slate-800">
                {currentCard?.itemType}
              </span>
            </div>
            <div className="text-sm font-bold text-slate-100 mt-0.5">
              Card {safeIndex + 1} of {currentListLength}
            </div>
          </div>
        </div>

        {/* Prev / Next Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={safeIndex === 0}
            className="p-2 rounded-xl bg-slate-800 disabled:opacity-40 hover:bg-indigo-600 text-white transition-all border border-slate-700"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all border border-slate-750 shadow-glow"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── FLASHCARD BOARD ── */}
      <div className="relative group">
        <div
          className={`w-full min-h-[480px] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl transition-all duration-300 flex flex-col justify-between ${
            isFlipped ? 'border-indigo-500/60 shadow-glow' : 'hover:border-slate-700'
          }`}
        >
          {/* Top Card Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                {currentCard?.partOfSpeech || (currentCard?.itemType === 'KANJI' ? 'Kanji Character' : 'Vocab')}
              </span>
              {currentCard?.kanjiCharacters && currentCard.kanjiCharacters.length > 0 && (
                <div className="flex items-center gap-1">
                  {currentCard.kanjiCharacters.map((kc, kIdx) => (
                    <span key={kIdx} className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-xs font-jp font-bold border border-amber-500/30">
                      {kc}
                    </span>
                  ))}
                </div>
              )}
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
              /* JAPANESE-FIRST FRONT: Japanese strictly on front */
              <div className="my-auto py-8 space-y-6 text-center">
                <div className="space-y-3">
                  <div className="text-5xl sm:text-6xl font-jp font-black text-white tracking-wide">
                    {currentCard?.japaneseWord}
                  </div>

                  <div className="text-xl sm:text-2xl font-jp font-bold text-rose-300">
                    {currentCard?.reading}
                  </div>

                  {/* Audio pronounce button */}
                  <button
                    onClick={() => playAudio(currentCard?.reading || currentCard?.japaneseWord)}
                    className="px-4 py-2 rounded-2xl bg-slate-950 hover:bg-rose-600 text-slate-300 hover:text-white transition-all border border-slate-800 inline-flex items-center gap-2 shadow-inner"
                  >
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold">Listen Pronunciation</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 max-w-sm mx-auto">
                  <div className="text-xs text-slate-400 font-semibold flex items-center justify-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Recall the meaning, then click <strong>Show Answer</strong></span>
                  </div>
                </div>
              </div>
            ) : (
              /* MEANING-FIRST FRONT: Meaning on front */
              <div className="my-auto py-8 space-y-5 text-center">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30 inline-block">
                    Meaning Prompt • Guess Japanese Word
                  </span>
                  
                  {(answerLang === 'ENGLISH' || answerLang === 'BOTH') && (
                    <h3 className="text-2xl sm:text-3xl font-black text-white pt-2">
                      {currentCard?.meaningEnglish}
                    </h3>
                  )}

                  {(answerLang === 'NEPALI' || answerLang === 'BOTH') && (
                    <div className="text-lg sm:text-xl font-bold text-amber-400">
                      🇳🇵 नेपाली: {currentCard?.meaningNepali}
                    </div>
                  )}
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 max-w-sm mx-auto text-xs text-slate-400">
                  <span>What is the Japanese word & reading for this?</span>
                </div>
              </div>
            )
          ) : (
            /* ════════════════════════════════════════════════════════ */
            /* CARD BACK (REVEALED ANSWER)                              */
            /* ════════════════════════════════════════════════════════ */
            <div className="my-auto py-4 space-y-5 text-left">
              
              {/* Header Badge: Japanese Word + Reading */}
              <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <div className="text-2xl sm:text-3xl font-jp font-black text-white">
                    {currentCard?.japaneseWord}
                  </div>
                  <div className="text-sm font-jp font-bold text-rose-400 mt-0.5">
                    {currentCard?.reading}
                  </div>
                </div>

                <button
                  onClick={() => playAudio(currentCard?.reading || currentCard?.japaneseWord)}
                  className="p-3 rounded-2xl bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white transition-all border border-slate-800 shadow"
                  title="Play audio"
                >
                  <Volume2 className="w-5 h-5 text-emerald-400" />
                </button>
              </div>

              {/* Revealed Meanings Section */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-indigo-900/50 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">
                  Revealed Answer ({answerLang})
                </span>

                {(answerLang === 'ENGLISH' || answerLang === 'BOTH') && (
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider mt-0.5">🇬🇧 EN:</span>
                    <span className="text-lg font-bold text-white leading-snug">
                      {currentCard?.meaningEnglish}
                    </span>
                  </div>
                )}

                {(answerLang === 'NEPALI' || answerLang === 'BOTH') && (
                  <div className="flex items-start gap-2 pt-1 border-t border-slate-800/80">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider mt-0.5">🇳🇵 NP:</span>
                    <span className="text-base font-bold text-amber-300 leading-snug">
                      {currentCard?.meaningNepali}
                    </span>
                  </div>
                )}
              </div>

              {/* Extra details for VOCAB vs KANJI */}
              {currentCard?.itemType === 'VOCAB' ? (
                currentCard.grammarSentences && currentCard.grammarSentences.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-400">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Example Sentence (उदाहरण)</span>
                    </div>
                    <div className="font-jp font-bold text-white">{currentCard.grammarSentences[0].japanese}</div>
                    {(answerLang === 'ENGLISH' || answerLang === 'BOTH') && (
                      <div className="text-slate-300">🇬🇧 {currentCard.grammarSentences[0].english}</div>
                    )}
                    {(answerLang === 'NEPALI' || answerLang === 'BOTH') && (
                      <div className="text-amber-400">🇳🇵 {currentCard.grammarSentences[0].nepali}</div>
                    )}
                  </div>
                )
              ) : (
                <div className="grid grid-cols-2 gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block">Onyomi (音読み)</span>
                    <span className="font-bold text-slate-200">{currentCard?.onyomi?.join(', ') || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">Kunyomi (訓読み)</span>
                    <span className="font-bold text-slate-200">{currentCard?.kunyomi?.join(', ') || '—'}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bottom Card Navigation & SRS Ratings */}
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            {/* Anki-style SRS rating buttons */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedRating(1)}
                className={`py-2 px-1 rounded-xl text-center border transition-all ${
                  selectedRating === 1
                    ? 'bg-rose-600 border-rose-400 text-white shadow-lg'
                    : 'bg-rose-950/30 hover:bg-rose-900/50 border-rose-900/60 text-rose-300'
                }`}
              >
                <div className="text-xs font-bold">Again</div>
                <div className="text-[10px] opacity-80">{srsAgain.intervalPreviewText}</div>
              </button>

              <button
                onClick={() => setSelectedRating(2)}
                className={`py-2 px-1 rounded-xl text-center border transition-all ${
                  selectedRating === 2
                    ? 'bg-amber-600 border-amber-400 text-white shadow-lg'
                    : 'bg-amber-950/30 hover:bg-amber-900/50 border-amber-900/60 text-amber-300'
                }`}
              >
                <div className="text-xs font-bold">Hard</div>
                <div className="text-[10px] opacity-80">{srsHard.intervalPreviewText}</div>
              </button>

              <button
                onClick={() => setSelectedRating(3)}
                className={`py-2 px-1 rounded-xl text-center border transition-all ${
                  selectedRating === 3
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                    : 'bg-emerald-950/30 hover:bg-emerald-900/50 border-emerald-900/60 text-emerald-300'
                }`}
              >
                <div className="text-xs font-bold">Good</div>
                <div className="text-[10px] opacity-80">{srsGood.intervalPreviewText}</div>
              </button>

              <button
                onClick={() => setSelectedRating(4)}
                className={`py-2 px-1 rounded-xl text-center border transition-all ${
                  selectedRating === 4
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg'
                    : 'bg-indigo-950/30 hover:bg-indigo-900/50 border-indigo-900/60 text-indigo-300'
                }`}
              >
                <div className="text-xs font-bold">Easy</div>
                <div className="text-[10px] opacity-80">{srsEasy.intervalPreviewText}</div>
              </button>
            </div>

            {/* Left / Right Card navigators */}
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-850">
              <button
                onClick={handlePrev}
                disabled={safeIndex === 0}
                className="px-4 py-2 rounded-xl bg-slate-800 disabled:opacity-40 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <span className="text-xs text-slate-400 font-bold">
                {safeIndex + 1} / {currentListLength}
              </span>

              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-Advance Next Level Modal */}
      {showAdvanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
              <Award className="w-8 h-8 animate-bounce" />
            </div>

            <div>
              <h3 className="text-lg font-black text-white">JLPT Level {selectedLevel} Finished!</h3>
              <p className="text-xs text-slate-400 mt-1">
                You have successfully reviewed all items in Level {selectedLevel}. Ready to advance to the next level?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowAdvanceModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition-all"
              >
                Review Level
              </button>
              <button
                onClick={handleAdvanceLevel}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold shadow-glow transition-all flex items-center justify-center gap-1"
              >
                <span>Start Next Level</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
