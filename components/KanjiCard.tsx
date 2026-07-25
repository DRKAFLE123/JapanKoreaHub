'use me';
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
} from 'lucide-react';
import { calculateSM2, SrsItemState, SrsRating } from '@/lib/srs-engine';
import { getKanjiByLevel, KanjiItem } from '@/lib/kanji-dataset';

export const KanjiCard: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<'N5' | 'N4' | 'N3' | 'N2'>('N5');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedRating, setSelectedRating] = useState<SrsRating | null>(null);
  const [showAdvanceModal, setShowAdvanceModal] = useState(false);

  // Fetch all Kanji for the selected Level
  const currentKanjiList = getKanjiByLevel(selectedLevel);
  const safeIndex = Math.min(currentIndex, Math.max(0, currentKanjiList.length - 1));
  const currentKanji: KanjiItem = currentKanjiList[safeIndex] || getKanjiByLevel('N5')[0];

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
      // End of level Kanji queue reached
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
      {/* Level Selector Bar */}
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 shadow-xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-2xl border border-slate-800 w-full justify-around">
          {(['N5', 'N4', 'N3', 'N2'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setSelectedLevel(lvl);
                setCurrentIndex(0);
                setShowAdvanceModal(false);
              }}
              className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${
                selectedLevel === lvl
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              JLPT {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Lesson Badge */}
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between shadow-glow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-600 flex items-center justify-center text-white font-black text-xl shadow-md font-jp">
            {currentKanji.character}
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
              JLPT {selectedLevel} • Dynamic Lesson {currentKanji.lessonOrder}
            </div>
            <div className="text-sm font-bold text-slate-100">
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

      {/* Kanji Card Board */}
      <div className="relative group">
        <div
          className={`w-full min-h-[460px] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl transition-all duration-300 flex flex-col justify-between ${
            isFlipped ? 'border-indigo-500/50 shadow-glow' : 'hover:border-slate-700'
          }`}
        >
          {/* Card Top */}
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
              <span>{isFlipped ? 'Show character' : 'Flip meanings'}</span>
            </button>
          </div>

          {/* Card Body */}
          {!isFlipped ? (
            <div className="my-auto py-4 space-y-6">
              {/* Graphic View */}
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

              {/* Static Stroke steps */}
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
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 block text-left">
                  Handwriting Tracing / Practice Grid
                </span>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4].map((gridNum) => (
                    <div
                      key={gridNum}
                      className="w-12 h-12 rounded-xl bg-slate-950 border-2 border-dashed border-slate-800 flex items-center justify-center relative overflow-hidden transition-colors hover:border-indigo-500/40"
                    >
                      <div className="absolute inset-0 border-t border-dashed border-slate-900/50 top-1/2 -translate-y-1/2" />
                      <div className="absolute inset-0 border-l border-dashed border-slate-900/50 left-1/2 -translate-x-1/2" />
                      <span className="text-2xl font-jp font-bold text-slate-850 select-none">
                        {currentKanji.character}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* BACK: Meanings & Compounds */
            <div className="my-auto py-2 space-y-4 text-left">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">Meanings</div>
                <div className="text-xl font-bold text-slate-100">{currentKanji.meanings.join(', ')}</div>
              </div>

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
