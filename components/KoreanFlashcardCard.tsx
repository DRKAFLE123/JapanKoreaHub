'use client';

import React, { useState } from 'react';
import { RotateCcw, Volume2, ChevronRight, ChevronLeft, Award, ArrowRight, BookOpen, Globe } from 'lucide-react';
import { calculateSM2, SrsItemState, SrsRating } from '@/lib/srs-engine';
import { KOREAN_VOCAB_DATA, KoreanVocabItem, getKoreanVocabByLevel } from '@/lib/korean-vocab';

export const KoreanFlashcardCard: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<KoreanVocabItem['level']>('EPS');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [selectedRating, setSelectedRating] = useState<SrsRating | null>(null);
  const [showAdvanceModal, setShowAdvanceModal] = useState<boolean>(false);

  const currentList = getKoreanVocabByLevel(selectedLevel);
  const safeIndex = Math.min(currentIndex, Math.max(0, currentList.length - 1));
  const currentItem: KoreanVocabItem = currentList[safeIndex] || currentList[0];

  const currentSrsState: SrsItemState = { easeFactor: 2.5, intervalDays: 0, repetitions: 0 };
  const srsAgain = calculateSM2(currentSrsState, 1);
  const srsHard = calculateSM2(currentSrsState, 2);
  const srsGood = calculateSM2(currentSrsState, 3);
  const srsEasy = calculateSM2(currentSrsState, 4);

  const playAudio = () => {
    if (!currentItem) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentItem.word);
      utterance.lang = 'ko-KR';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    setSelectedRating(null);
    if (safeIndex < currentList.length - 1) {
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
    const levels: KoreanVocabItem['level'][] = ['EPS', 'TOPIK2', 'TOPIK3', 'TOPIK4'];
    const idx = levels.indexOf(selectedLevel);
    if (idx < levels.length - 1) {
      setSelectedLevel(levels[idx + 1]);
      setCurrentIndex(0);
    } else {
      alert('Congratulations! You completed all Korean Flashcard levels!');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto font-sans space-y-4">
      {/* Level Selector Bar */}
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 shadow-xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-2xl border border-slate-800 w-full justify-around">
          {(['EPS', 'TOPIK2', 'TOPIK3', 'TOPIK4'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setSelectedLevel(lvl);
                setCurrentIndex(0);
                setShowAdvanceModal(false);
                setIsFlipped(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                selectedLevel === lvl
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Header Badge */}
      {currentItem && (
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between shadow-glow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white font-black text-xl shadow-md font-kr">
              {currentItem.word.slice(0, 1)}
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                {selectedLevel} • Lesson {currentItem.lesson}
              </div>
              <div className="text-sm font-bold text-slate-100">
                Word {safeIndex + 1} of {currentList.length}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={safeIndex === 0}
              className="p-2 rounded-xl bg-slate-800 disabled:opacity-40 hover:bg-emerald-600 text-white transition-all border border-slate-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all border border-slate-700 shadow-glow"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Flashcard Component */}
      {currentItem && (
        <div className="relative group">
          <div
            className={`w-full min-h-[420px] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl transition-all duration-300 flex flex-col justify-between ${
              isFlipped ? 'border-emerald-500/50 shadow-glow' : 'hover:border-slate-700'
            }`}
          >
            {/* Card Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-400">
                Korean Vocab Flashcard (SM-2 SRS)
              </span>

              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isFlipped ? 'Show Hangul' : 'Flip for meaning'}</span>
              </button>
            </div>

            {/* Front View */}
            {!isFlipped ? (
              <div className="my-auto py-8 text-center space-y-6">
                <div className="relative inline-flex flex-col items-center justify-center p-8 rounded-3xl bg-slate-950/80 border border-slate-800 shadow-inner">
                  <div className="text-6xl font-kr font-black text-transparent bg-clip-text bg-gradient-to-tr from-white via-emerald-100 to-emerald-400 select-none">
                    {currentItem.word}
                  </div>
                  <div className="text-sm font-semibold text-slate-400 italic mt-2">
                    {currentItem.romanization}
                  </div>

                  <button
                    onClick={playAudio}
                    className="mt-4 p-3 rounded-2xl bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white transition-all border border-slate-800 shadow flex items-center gap-2 text-xs font-bold"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Listen Pronunciation</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Back View */
              <div className="my-auto py-4 space-y-4 text-left">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                    English Meaning
                  </div>
                  <div className="text-2xl font-black text-white">{currentItem.meaning}</div>
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                    Nepali Meaning (नेपाली अर्थ)
                  </div>
                  <div className="text-lg font-bold text-amber-300">🇳🇵 {currentItem.meaningNepali}</div>
                </div>

                {currentItem.partOfSpeech && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Part of Speech
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                      {currentItem.partOfSpeech}
                    </span>
                  </div>
                )}

                {currentItem.grammarSentences && currentItem.grammarSentences.length > 0 && (
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                      Example Sentence
                    </span>
                    <div className="text-sm font-kr font-bold text-white">
                      {currentItem.grammarSentences[0].korean}
                    </div>
                    <div className="text-xs text-slate-400 italic">
                      {currentItem.grammarSentences[0].romanization}
                    </div>
                    <div className="text-xs text-amber-300">
                      🇳🇵 {currentItem.grammarSentences[0].nepali}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bottom SRS Rating Buttons */}
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
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

              {/* Prev / Next controls */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800">
                <button
                  onClick={handlePrev}
                  disabled={safeIndex === 0}
                  className="px-4 py-2 rounded-xl bg-slate-800 disabled:opacity-40 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                <span className="text-xs text-slate-400 font-bold">
                  {safeIndex + 1} / {currentList.length}
                </span>

                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auto Advance Modal */}
      {showAdvanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <Award className="w-8 h-8 animate-bounce" />
            </div>

            <div>
              <h3 className="text-lg font-black text-white">{selectedLevel} Korean Completed!</h3>
              <p className="text-xs text-slate-400 mt-1">
                You have studied all flashcards in level {selectedLevel}. Ready to advance?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowAdvanceModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700 transition-all"
              >
                Review Level
              </button>
              <button
                onClick={handleAdvanceLevel}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-glow transition-all flex items-center justify-center gap-1"
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
