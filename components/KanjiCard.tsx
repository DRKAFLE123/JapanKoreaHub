'use client';

import React, { useState } from 'react';
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
  FileText
} from 'lucide-react';
import { calculateSM2, SrsItemState, SrsRating } from '@/lib/srs-engine';
import { getKanjiByLevel, KanjiItem } from '@/lib/kanji-dataset';

export type FlashcardMode = 'KANJI' | 'MEANING' | 'MIXED';

export const KanjiCard: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<'N5' | 'N4' | 'N3' | 'N2'>('N5');
  const [cardMode, setCardMode] = useState<FlashcardMode>('KANJI');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedRating, setSelectedRating] = useState<SrsRating | null>(null);
  const [showAdvanceModal, setShowAdvanceModal] = useState(false);

  // Fetch all Kanji for the selected Level
  const currentKanjiList = getKanjiByLevel(selectedLevel);
  const safeIndex = Math.min(currentIndex, Math.max(0, currentKanjiList.length - 1));
  const currentKanji: KanjiItem = currentKanjiList[safeIndex] || getKanjiByLevel('N5')[0];

  // Determine if the current card displays Meaning on front (in Mixed mode, odd cards show Meaning first)
  const isMeaningFront =
    cardMode === 'MEANING' || (cardMode === 'MIXED' && safeIndex % 2 === 1);

  const strokePaths = currentKanji.strokeSvgData || [
    'M20,30 L80,30',
    'M50,15 L50,85',
    'M25,50 L75,50',
    'M15,85 L85,85',
  ];

  // Dummy SRS State
  const currentSrsState: SrsItemState = { easeFactor: 2.5, intervalDays: 0, repetitions: 0 };
  const srsAgain = calculateSM2(currentSrsState, 1);
  const srsHard = calculateSM2(currentSrsState, 2);
  const srsGood = calculateSM2(currentSrsState, 3);
  const srsEasy = calculateSM2(currentSrsState, 4);

  const playAudio = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentKanji.character);
      utterance.lang = 'ja-JP';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    setSelectedRating(null);
    if (safeIndex < currentKanjiList.length - 1) {
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
    const levels: ('N5' | 'N4' | 'N3' | 'N2')[] = ['N5', 'N4', 'N3', 'N2'];
    const currentIdx = levels.indexOf(selectedLevel);
    if (currentIdx < levels.length - 1) {
      setSelectedLevel(levels[currentIdx + 1]);
      setCurrentIndex(0);
    } else {
      alert('Amazing! You have completed all JLPT Levels in LanguageGuru!');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto font-sans space-y-4">

      {/* ── TOP: Level & Mode Filter Controls ── */}
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 shadow-xl space-y-3">
        
        {/* 1. JLPT Level Selector */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-2xl border border-slate-800 w-full justify-around">
          {(['N5', 'N4', 'N3', 'N2'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setSelectedLevel(lvl);
                setCurrentIndex(0);
                setIsFlipped(false);
                setShowAdvanceModal(false);
              }}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs font-black transition-all ${
                selectedLevel === lvl
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              JLPT {lvl}
            </button>
          ))}
        </div>

        {/* 2. Flashcard Mode Selector (Kanji / Meaning / Mix) */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-indigo-400" /> Mode:
          </span>

          <div className="grid grid-cols-3 gap-1.5 flex-1 max-w-md">
            <button
              onClick={() => { setCardMode('KANJI'); setIsFlipped(false); }}
              className={`py-1.5 px-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1 ${
                cardMode === 'KANJI'
                  ? 'bg-rose-600 text-white shadow'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Kanji First</span>
            </button>

            <button
              onClick={() => { setCardMode('MEANING'); setIsFlipped(false); }}
              className={`py-1.5 px-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1 ${
                cardMode === 'MEANING'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Meaning First</span>
            </button>

            <button
              onClick={() => { setCardMode('MIXED'); setIsFlipped(false); }}
              className={`py-1.5 px-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1 ${
                cardMode === 'MIXED'
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Mix Cards</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Lesson & Counter Header */}
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between shadow-glow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-600 flex items-center justify-center text-white font-black text-xl shadow-md font-jp">
            {currentKanji.character}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                JLPT {selectedLevel} • Lesson {currentKanji.lessonOrder}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-950 text-[10px] font-bold text-amber-400 border border-slate-800">
                {isMeaningFront ? 'Meaning → Kanji' : 'Kanji → Meaning'}
              </span>
            </div>
            <div className="text-sm font-bold text-slate-100 mt-0.5">
              Character {safeIndex + 1} of {currentKanjiList.length}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
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

      {/* Flashcard Component */}
      <div className="relative group">
        <div
          className={`w-full min-h-[480px] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl transition-all duration-300 flex flex-col justify-between ${
            isFlipped ? 'border-indigo-500/50 shadow-glow' : 'hover:border-slate-700'
          }`}
        >
          {/* Card Top Control */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Radicals:</span>
              <div className="flex items-center gap-1.5">
                {currentKanji.radicals.map((rad, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold text-slate-950 shadow-sm"
                    style={{ backgroundColor: rad.color }}
                  >
                    {rad.radical} ({rad.meaning})
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isFlipped ? 'Show Front' : 'Flip Card'}</span>
            </button>
          </div>

          {/* Card Main Body */}
          {!isFlipped ? (
            /* ============================================================ */
            /* CARD FRONT VIEW                                              */
            /* ============================================================ */
            isMeaningFront ? (
              /* MEANING-FIRST FRONT */
              <div className="my-auto py-8 space-y-6 text-center">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30 inline-block">
                    Meaning First • What is the Kanji & Reading?
                  </span>
                  <h3 className="text-3xl font-black text-white pt-2">
                    {currentKanji.meanings.join(', ')}
                  </h3>
                  {currentKanji.meaningsNepali && (
                    <div className="text-lg font-bold text-amber-400">
                      🇳🇵 नेपाली: {currentKanji.meaningsNepali.join(', ')}
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 max-w-sm mx-auto space-y-1">
                  <p className="font-semibold text-slate-300">💡 Challenge Yourself:</p>
                  <p>Visualize the Kanji character and recall its Kunyomi/Onyomi readings before flipping!</p>
                </div>
              </div>
            ) : (
              /* KANJI-FIRST FRONT */
              <div className="my-auto py-4 space-y-6">
                <div className="flex items-center justify-center gap-6">
                  <div className="relative flex items-center justify-center w-36 h-36 rounded-3xl bg-slate-950/80 border border-slate-850 shadow-inner">
                    <div className="text-7xl font-jp font-black text-transparent bg-clip-text bg-gradient-to-tr from-white via-indigo-100 to-indigo-400 select-none">
                      {currentKanji.character}
                    </div>
                    <button
                      onClick={playAudio}
                      className="absolute bottom-2 right-2 p-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-slate-400 hover:text-white transition-all border border-slate-800 shadow"
                      title="Pronounce Kanji"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-left space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">Vocabulary Meaning</span>
                    <h3 className="text-2xl font-black text-white">{currentKanji.meanings.slice(0, 2).join(', ')}</h3>
                    {currentKanji.meaningsNepali && (
                      <span className="text-sm font-semibold text-amber-400 block">नेपाली: {currentKanji.meaningsNepali.join(', ')}</span>
                    )}
                    <span className="text-[11px] text-slate-400 font-medium block">Total strokes: {currentKanji.strokeCount}</span>
                  </div>
                </div>

                {/* Stroke steps */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 block text-left">
                    Stroke-by-Stroke Step Progression (Static Draw Sequence)
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {strokePaths.map((_, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-11 h-11 bg-slate-950 border border-slate-855 rounded-xl flex flex-col items-center justify-center relative"
                      >
                        <svg className="w-9 h-9 stroke-slate-500 fill-none stroke-[3] stroke-linecap-round stroke-linejoin-round">
                          {strokePaths.slice(0, index + 1).map((path, pIdx) => (
                            <path
                              key={pIdx}
                              d={path}
                              className={pIdx === index ? 'stroke-indigo-400 stroke-[4]' : ''}
                            />
                          ))}
                        </svg>
                        <span className="absolute bottom-0.5 right-1 text-[8px] text-slate-500 font-bold">
                          {index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tracing Grid */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 block text-left">
                    Handwriting Tracing / Practice Grid (手書き練習)
                  </span>
                  <div className="text-[9px] text-slate-500 font-semibold mb-1.5 uppercase tracking-wider">
                    ① Trace over the guide character:
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className="relative w-16 h-16 rounded-xl bg-slate-950 border border-slate-700 overflow-hidden flex-shrink-0"
                      >
                        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                          <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#334155" strokeWidth="1" />
                          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#1e3a5f" strokeWidth="1" strokeDasharray="3,3" />
                          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#1e3a5f" strokeWidth="1" strokeDasharray="3,3" />
                          <line x1="0" y1="0" x2="100%" y2="100%" stroke="#1e293b" strokeWidth="1" />
                          <line x1="100%" y1="0" x2="0" y2="100%" stroke="#1e293b" strokeWidth="1" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-jp font-black text-slate-600/60 select-none pointer-events-none leading-none">
                            {currentKanji.character}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-[9px] text-slate-500 font-semibold mb-1.5 uppercase tracking-wider">
                    ② Free write practice (blank):
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <div
                        key={n}
                        className="relative w-16 h-16 rounded-xl bg-slate-950 border border-dashed border-slate-700 overflow-hidden flex-shrink-0"
                      >
                        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#1e3a5f" strokeWidth="1" strokeDasharray="3,3" />
                          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#1e3a5f" strokeWidth="1" strokeDasharray="3,3" />
                          <line x1="0" y1="0" x2="100%" y2="100%" stroke="#1e293b" strokeWidth="1" />
                          <line x1="100%" y1="0" x2="0" y2="100%" stroke="#1e293b" strokeWidth="1" />
                        </svg>
                        <span className="absolute bottom-0.5 right-1 text-[8px] text-slate-700 font-bold select-none">
                          {n}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          ) : (
            /* ============================================================ */
            /* CARD BACK REVEAL VIEW                                        */
            /* ============================================================ */
            <div className="my-auto py-2 space-y-5 text-left">
              {/* Revealed Character Header */}
              <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-inner flex-shrink-0">
                  <span className="text-5xl font-jp font-black text-transparent bg-clip-text bg-gradient-to-tr from-white to-indigo-300">
                    {currentKanji.character}
                  </span>
                  <button
                    onClick={playAudio}
                    className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <div className="text-lg font-black text-white">{currentKanji.meanings.join(', ')}</div>
                  {currentKanji.meaningsNepali && (
                    <div className="text-sm font-bold text-amber-400">🇳🇵 {currentKanji.meaningsNepali.join(', ')}</div>
                  )}
                  <div className="text-xs text-slate-400 mt-0.5">Strokes: {currentKanji.strokeCount}</div>
                </div>
              </div>

              {/* Readings Grid */}
              <div className="grid grid-cols-2 gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block">Onyomi (音読み)</span>
                  <span className="text-sm font-semibold text-slate-200">{currentKanji.readingsOnyomi.join(', ') || '—'}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">Kunyomi (訓読み)</span>
                  <span className="text-sm font-semibold text-slate-200">{currentKanji.readingsKunyomi.join(', ') || '—'}</span>
                </div>
              </div>

              {/* Compounds */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 block">
                  Compound Vocabulary words
                </span>
                <div className="space-y-1.5">
                  {currentKanji.compounds.map((comp, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-jp font-bold text-sm text-indigo-300">{comp.word}</span>
                        <span className="text-slate-400 text-[11px]">({comp.reading})</span>
                      </div>
                      <span className="text-slate-300 font-medium">{comp.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
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
                {safeIndex + 1} / {currentKanjiList.length}
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
            <div className="w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/30">
              <Award className="w-8 h-8 animate-bounce" />
            </div>

            <div>
              <h3 className="text-lg font-black text-white">JLPT Level {selectedLevel} Finished!</h3>
              <p className="text-xs text-slate-400 mt-1">
                You have successfully studied all Kanji in Level {selectedLevel}. Ready to advance to the next level?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowAdvanceModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800 transition-all"
              >
                Review Level
              </button>
              <button
                onClick={handleAdvanceLevel}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-glow transition-all flex items-center justify-center gap-1"
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
