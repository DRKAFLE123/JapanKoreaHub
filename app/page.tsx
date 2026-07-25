'use client';

import React, { useState, useEffect } from 'react';
import {
  Flame, Wifi, WifiOff, BookOpen, Headphones,
  Clock, Layers, Calendar, ShieldCheck, Globe, Sparkles,
} from 'lucide-react';
import { KanjiCard } from '@/components/KanjiCard';
import { AlphabetGrid } from '@/components/AlphabetGrid';
import { StreakHeatmap } from '@/components/StreakHeatmap';
import { TimedExamEngine } from '@/components/TimedExamEngine';
import { RadicalBreakdown } from '@/components/RadicalBreakdown';
import { CertificateVerifier } from '@/components/CertificateVerifier';
import { VocabularyExplorer } from '@/components/VocabularyExplorer';
import { KoreanVocabularyExplorer } from '@/components/KoreanVocabularyExplorer';
import { KoreanFlashcardCard } from '@/components/KoreanFlashcardCard';
import { getUnsyncedCount } from '@/lib/offline-sync';

type ActiveTab =
  | 'VOCAB_EXPLORER'
  | 'KANJI_SRS'
  | 'ALPHABET_GRID'
  | 'TIMED_EXAM'
  | 'RADICALS'
  | 'HEATMAP'
  | 'CERTIFICATE'
  | 'KOREAN_VOCAB'
  | 'KOREAN_FLASHCARD';

export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<'JAPANESE' | 'KOREAN'>('JAPANESE');
  const [activeTab, setActiveTab] = useState<ActiveTab>('VOCAB_EXPLORER');
  const [isOnline, setIsOnline] = useState(true);
  const [unsyncedItems, setUnsyncedItems] = useState(0);

  // Connectivity monitoring
  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    getUnsyncedCount().then(setUnsyncedItems);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Reset active tab when language changes
  useEffect(() => {
    if (selectedLanguage === 'KOREAN') {
      setActiveTab('KOREAN_VOCAB');
    } else {
      setActiveTab('VOCAB_EXPLORER');
    }
  }, [selectedLanguage]);

  // Tab definitions
  const japaneseTabs = [
    { id: 'VOCAB_EXPLORER',  label: '1. Japanese Vocab (Lessons 1-75)', icon: BookOpen },
    { id: 'KANJI_SRS',       label: '2. Kanji SRS Flashcards',          icon: Layers   },
    { id: 'ALPHABET_GRID',   label: '3. Kana Matrix (Audio)',           icon: Headphones },
    { id: 'TIMED_EXAM',      label: '4. Mock Exam (JLPT N5-N2)',       icon: Clock    },
    { id: 'RADICALS',        label: '5. Kanji Radicals',                icon: Layers   },
    { id: 'HEATMAP',         label: '6. Streak Heatmap',                icon: Calendar },
    { id: 'CERTIFICATE',     label: '7. Certificate Verifier',         icon: ShieldCheck },
  ] as const;

  const koreanTabs = [
    { id: 'KOREAN_VOCAB',    label: '1. Korean Vocab (Lessons 1-60)',   icon: Globe    },
    { id: 'KOREAN_FLASHCARD',label: '2. Korean SRS Flashcards',         icon: Layers   },
    { id: 'ALPHABET_GRID',   label: '3. Hangul Matrix (Audio)',         icon: Headphones },
    { id: 'TIMED_EXAM',      label: '4. EPS & TOPIK Mock Exam',         icon: Clock    },
    { id: 'HEATMAP',         label: '5. Streak Heatmap',                icon: Calendar },
    { id: 'CERTIFICATE',     label: '6. Certificate Verifier',         icon: ShieldCheck },
  ] as const;

  const currentTabs = selectedLanguage === 'JAPANESE' ? japaneseTabs : koreanTabs;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Background Orbs */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 px-4 md:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-black text-xl shadow-glow">
              語
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold text-white tracking-tight">LanguageGuru</h1>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30 hidden sm:inline">
                  SM-2 SRS & Offline
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Japanese (JLPT N5–N1) & Korean (EPS-TOPIK 1-60 & TOPIK)</p>
            </div>
          </div>

          {/* ─── GLOBAL LANGUAGE SELECTOR ─── */}
          <div className="flex items-center bg-slate-900/90 border border-slate-800 p-1 rounded-2xl flex-shrink-0">
            <button
              id="lang-japanese"
              onClick={() => setSelectedLanguage('JAPANESE')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                selectedLanguage === 'JAPANESE'
                  ? 'bg-rose-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="font-jp">🇯🇵 日本語</span>
              <span className="hidden sm:inline">JLPT N5–N1</span>
            </button>
            <button
              id="lang-korean"
              onClick={() => setSelectedLanguage('KOREAN')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                selectedLanguage === 'KOREAN'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="font-kr">🇰🇷 한국어</span>
              <span className="hidden sm:inline">EPS-TOPIK (60 Lessons)</span>
            </button>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                isOnline
                  ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-400'
                  : 'bg-amber-950/60 border-amber-800/80 text-amber-300'
              }`}
            >
              {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isOnline ? 'Online' : 'Offline'}</span>
              {unsyncedItems > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px]">
                  {unsyncedItems}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 text-xs font-extrabold">
              <Flame className="w-4 h-4 animate-bounce" />
              <span>14 Day Streak</span>
            </div>
          </div>
        </div>
      </header>

      {/* Dynamic Tab Bar */}
      <div className="sticky top-[68px] z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/60 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="flex items-center gap-2 py-3 overflow-x-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {currentTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-2 border flex-shrink-0 ${
                    isActive
                      ? selectedLanguage === 'JAPANESE'
                        ? 'bg-rose-600 border-rose-400 text-white shadow-glow'
                        : 'bg-emerald-600 border-emerald-400 text-white shadow-glow'
                      : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-8">
        {/* Japanese Panels */}
        {activeTab === 'VOCAB_EXPLORER' && selectedLanguage === 'JAPANESE' && (
          <VocabularyExplorer />
        )}

        {activeTab === 'KANJI_SRS' && selectedLanguage === 'JAPANESE' && (
          <KanjiCard />
        )}

        {/* Korean Panels */}
        {activeTab === 'KOREAN_VOCAB' && selectedLanguage === 'KOREAN' && (
          <KoreanVocabularyExplorer />
        )}

        {activeTab === 'KOREAN_FLASHCARD' && selectedLanguage === 'KOREAN' && (
          <KoreanFlashcardCard />
        )}

        {/* Shared Panels */}
        {activeTab === 'ALPHABET_GRID' && (
          <AlphabetGrid activeLanguage={selectedLanguage} />
        )}

        {activeTab === 'TIMED_EXAM' && (
          <TimedExamEngine activeLanguage={selectedLanguage} />
        )}

        {activeTab === 'RADICALS' && selectedLanguage === 'JAPANESE' && (
          <RadicalBreakdown />
        )}

        {activeTab === 'HEATMAP' && (
          <StreakHeatmap />
        )}

        {activeTab === 'CERTIFICATE' && (
          <CertificateVerifier />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-5 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <span>LanguageGuru • Japanese JLPT N5–N1 & Korean EPS-TOPIK (Lessons 1-60) / TOPIK 2–4</span>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>SM-2 SRS</span>
            <span>•</span>
            <span>Offline IndexedDB</span>
            <span>•</span>
            <span>QR Certificate Verification</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
