'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Flame, Wifi, WifiOff, BookOpen, Headphones,
  Clock, Layers, Calendar, ShieldCheck, Globe, Sparkles, Languages,
  User, LogOut, LogIn, UserPlus, ArrowLeft, CheckCircle2, Award, X, ChevronRight, ChevronDown,
  Zap, Menu, FileText,
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
import { LevelHubDashboard, LevelType } from '@/components/LevelHubDashboard';
import { KoreanHubDashboard, KoreanLevelType } from '@/components/KoreanHubDashboard';
import { InfoGuideModal } from '@/components/InfoGuideModal';
import { getUnsyncedCount } from '@/lib/offline-sync';

/* ──────────────────────────────────────────────────────────────
   TYPES
────────────────────────────────────────────────────────────── */
type ViewMode    = 'LANDING' | 'JAPANESE' | 'KOREAN';
type JapaneseTab = 'VOCAB_EXPLORER' | 'KANJI_SRS' | 'ALPHABET_GRID' | 'TIMED_EXAM' | 'RADICALS' | 'HEATMAP' | 'CERTIFICATE';
type KoreanTab   = 'KOREAN_VOCAB'   | 'KOREAN_FLASHCARD' | 'ALPHABET_GRID' | 'TIMED_EXAM' | 'HEATMAP' | 'CERTIFICATE';

interface UserProfile {
  name: string;
  email: string;
  streak: number;
  role?: 'STUDENT' | 'ADMIN' | 'INSTRUCTOR' | 'MANAGER' | string;
}

interface TabDef {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  emoji: string;
  group: 'LEARNING' | 'TOOLS';
}

/* ──────────────────────────────────────────────────────────────
   TAB DEFINITIONS
────────────────────────────────────────────────────────────── */
const JAPANESE_TABS: TabDef[] = [
  { id: 'VOCAB_EXPLORER', label: 'Vocabulary',  sublabel: 'Basics - Kana - N5-N3 Lessons',   icon: BookOpen,    emoji: '📚', group: 'LEARNING' },
  { id: 'KANJI_SRS',      label: 'Flashcards',  sublabel: 'Kanji SRS - SM-2 Algorithm',      icon: Layers,      emoji: '🃏', group: 'LEARNING' },
  { id: 'ALPHABET_GRID',  label: 'Listening',   sublabel: '87 CD Tracks - Lessons 1-25',     icon: Headphones,  emoji: '🎧', group: 'LEARNING' },
  { id: 'TIMED_EXAM',     label: 'Mock Test',   sublabel: 'JLPT N5-N2 Exam Simulator',       icon: Clock,       emoji: '⏱',  group: 'LEARNING' },
  { id: 'RADICALS',       label: 'Radicals',    sublabel: 'Kanji Radical Breakdown',         icon: Layers,      emoji: '🧩', group: 'TOOLS'    },
  { id: 'HEATMAP',        label: 'Streak',      sublabel: 'Study Progress Heatmap',          icon: Calendar,    emoji: '🔥', group: 'TOOLS'    },
  { id: 'CERTIFICATE',    label: 'Certificate', sublabel: 'QR Certificate Verifier',         icon: ShieldCheck, emoji: '🏅', group: 'TOOLS'    },
];

const KOREAN_TABS: TabDef[] = [
  { id: 'KOREAN_VOCAB',    label: 'Vocabulary',  sublabel: 'Lessons 1-60 - Nepali & English', icon: Globe,       emoji: '📚', group: 'LEARNING' },
  { id: 'KOREAN_FLASHCARD',label: 'Flashcards',  sublabel: 'Korean SRS Flashcards',           icon: Layers,      emoji: '🃏', group: 'LEARNING' },
  { id: 'ALPHABET_GRID',   label: 'Listening',   sublabel: 'Hangul Audio Matrix',             icon: Headphones,  emoji: '🎧', group: 'LEARNING' },
  { id: 'TIMED_EXAM',      label: 'Mock Test',   sublabel: 'EPS & TOPIK Exam Engine',         icon: Clock,       emoji: '⏱',  group: 'LEARNING' },
  { id: 'HEATMAP',         label: 'Streak',      sublabel: 'Study Progress Heatmap',          icon: Calendar,    emoji: '🔥', group: 'TOOLS'    },
  { id: 'CERTIFICATE',     label: 'Certificate', sublabel: 'QR Certificate Verifier',         icon: ShieldCheck, emoji: '🏅', group: 'TOOLS'    },
];

/* ──────────────────────────────────────────────────────────────
   AUTH MODAL (Sign In / Sign Up Popup)
────────────────────────────────────────────────────────────── */
interface AuthModalProps {
  authMode: 'LOGIN' | 'SIGNUP';
  setAuthMode: (m: 'LOGIN' | 'SIGNUP') => void;
  authName: string; setAuthName: (v: string) => void;
  authEmail: string; setAuthEmail: (v: string) => void;
  authPassword: string; setAuthPassword: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}
const AuthModal: React.FC<AuthModalProps> = ({
  authMode, setAuthMode,
  authName, setAuthName,
  authEmail, setAuthEmail,
  authPassword, setAuthPassword,
  onSubmit, onClose,
}) => (
  <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-glow">
            {authMode === 'LOGIN' ? <LogIn className="w-4 h-4 text-white" /> : <UserPlus className="w-4 h-4 text-white" />}
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">LanguageGuru</div>
            <div className="text-sm font-black text-white">{authMode === 'LOGIN' ? 'Welcome back!' : 'Create Free Account'}</div>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-all">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-4">
        {authMode === 'SIGNUP' && (
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Your Name</label>
            <input
              type="text"
              autoComplete="name"
              placeholder="e.g. Dr. Kafle"
              value={authName}
              onChange={e => setAuthName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
        )}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Email Address</label>
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="name@example.com"
            value={authEmail}
            onChange={e => setAuthEmail(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Password</label>
          <input
            type="password"
            required
            autoComplete={authMode === 'LOGIN' ? 'current-password' : 'new-password'}
            placeholder="••••••••"
            value={authPassword}
            onChange={e => setAuthPassword(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-glow transition-all flex items-center justify-center gap-2"
        >
          {authMode === 'LOGIN'
            ? <><LogIn className="w-4 h-4" /> Sign In &amp; Save Progress</>
            : <><Zap className="w-4 h-4 text-yellow-300" /> Create Account &amp; Start Learning</>}
        </button>
      </form>

      <p className="text-center text-xs text-slate-400">
        {authMode === 'LOGIN' ? (
          <>Don&apos;t have an account?{' '}
            <button type="button" onClick={() => setAuthMode('SIGNUP')} className="text-indigo-400 hover:underline font-bold">Sign Up Free</button>
          </>
        ) : (
          <>Already have an account?{' '}
            <button type="button" onClick={() => setAuthMode('LOGIN')} className="text-indigo-400 hover:underline font-bold">Sign In</button>
          </>
        )}
      </p>
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────
   SHARED HEADER (Single Top-Left Hamburger Menu Button)
────────────────────────────────────────────────────────────── */
interface SharedHeaderProps {
  viewMode: ViewMode;
  isJapanese: boolean;
  activeTabLabel: string;
  user: UserProfile | null;
  isOnline: boolean;
  unsyncedItems: number;
  drawerOpen: boolean;
  setViewMode: (v: ViewMode) => void;
  setDrawerOpen: (v: boolean) => void;
  openLogin: () => void;
  openSignup: () => void;
  handleLogout: () => void;
  onSelectJpTab?: (tab: JapaneseTab) => void;
  onSelectKrTab?: (tab: KoreanTab) => void;
  onOpenGuide?: (id: string) => void;
  onSwitchLanguage?: () => void;
}

const SharedHeader: React.FC<SharedHeaderProps> = ({
  viewMode, isJapanese, activeTabLabel, user, isOnline, unsyncedItems,
  setViewMode, setDrawerOpen, openLogin, openSignup, handleLogout,
  onSelectJpTab, onSelectKrTab, onOpenGuide, onSwitchLanguage,
}) => {
  const handleNavClick = (fn: () => void) => {
    if (typeof document !== 'undefined' && document.activeElement && 'blur' in document.activeElement) {
      (document.activeElement as HTMLElement).blur();
    }
    fn();
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 lg:px-12 py-2.5 sm:py-3 shadow-lg">
      <div className="w-full max-w-full flex items-center justify-between gap-3">

        {/* Left: Mobile Drawer Button + Official Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all flex-shrink-0 active:scale-95 shadow-sm"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5 text-rose-400" />
          </button>

          <button onClick={() => handleNavClick(() => setViewMode('LANDING'))} className="flex items-center gap-3 group text-left">
            <img
              src="/logo.jpg"
              alt="JapanKoreaHub Logo"
              className="w-10 h-10 rounded-xl object-contain bg-white border border-slate-700 shadow-md group-hover:scale-105 transition-transform p-0.5"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-white tracking-tight leading-tight">
                  JapanKoreaHub
                </span>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[9px] font-black uppercase tracking-wider hidden md:inline">
                  Learn Japanese &amp; Korean
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold hidden sm:block">
                Your Language Learning Hub • JLPT, JFT &amp; EPS-TOPIK
              </p>
            </div>
          </button>
        </div>

        {/* Desktop Navbar Dropdown Menus */}
        <nav className="hidden lg:flex items-center gap-1.5">

          {/* 1. Platforms Dropdown (Strictly Japanese & Korean) */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black text-slate-300 hover:text-white hover:bg-slate-900 transition-all cursor-pointer border border-transparent hover:border-slate-800">
              <Globe className="w-4 h-4 text-indigo-400" />
              <span>Platforms</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute top-full left-0 -mt-1 pt-3 w-72 transform origin-top-left transition-all duration-200 ease-out scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible pointer-events-none group-hover:pointer-events-auto z-[100]">
              <div className="bg-slate-900/98 backdrop-blur-2xl border border-slate-800 rounded-2xl p-2 shadow-2xl space-y-1">
                <button
                  onClick={() => handleNavClick(() => setViewMode('JAPANESE'))}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/90 hover:border hover:border-rose-500/30 flex items-center gap-3 transition-all cursor-pointer group/item"
                >
                  <span className="text-xl group-hover/item:scale-110 transition-transform">🇯🇵</span>
                  <div>
                    <div className="text-xs font-black text-white group-hover/item:text-rose-400 transition-colors">Japanese Platform</div>
                    <div className="text-[10px] text-slate-400">Minna no Nihongo (JLPT N5-N1 &amp; JFT)</div>
                  </div>
                </button>
                <button
                  onClick={() => handleNavClick(() => setViewMode('KOREAN'))}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/90 hover:border hover:border-emerald-500/30 flex items-center gap-3 transition-all cursor-pointer group/item"
                >
                  <span className="text-xl group-hover/item:scale-110 transition-transform">🇰🇷</span>
                  <div>
                    <div className="text-xs font-black text-white group-hover/item:text-emerald-400 transition-colors">Korean Platform</div>
                    <div className="text-[10px] text-slate-400">EPS-TOPIK 60 Lessons &amp; TOPIK I-II</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* 2. Flashcards Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black text-slate-300 hover:text-white hover:bg-slate-900 transition-all cursor-pointer border border-transparent hover:border-slate-800">
              <Layers className="w-4 h-4 text-rose-400" />
              <span>Flashcards</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute top-full left-0 -mt-1 pt-3 w-68 transform origin-top-left transition-all duration-200 ease-out scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible pointer-events-none group-hover:pointer-events-auto z-[100]">
              <div className="bg-slate-900/98 backdrop-blur-2xl border border-slate-800 rounded-2xl p-2 shadow-2xl space-y-1">
                <button
                  onClick={() => handleNavClick(() => { setViewMode('JAPANESE'); if (onSelectJpTab) onSelectJpTab('KANJI_SRS'); })}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/90 hover:border hover:border-rose-500/30 flex items-center gap-2.5 transition-all cursor-pointer group/item"
                >
                  <span className="text-base group-hover/item:scale-110 transition-transform">🃏</span>
                  <div>
                    <div className="text-xs font-black text-white group-hover/item:text-rose-400 transition-colors">Kanji SRS Flashcards</div>
                    <div className="text-[10px] text-slate-400">SM-2 Spaced Repetition Memory Deck</div>
                  </div>
                </button>
                <button
                  onClick={() => handleNavClick(() => { setViewMode('KOREAN'); if (onSelectKrTab) onSelectKrTab('KOREAN_FLASHCARD'); })}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/90 hover:border hover:border-emerald-500/30 flex items-center gap-2.5 transition-all cursor-pointer group/item"
                >
                  <span className="text-base group-hover/item:scale-110 transition-transform">🎴</span>
                  <div>
                    <div className="text-xs font-black text-white group-hover/item:text-emerald-400 transition-colors">Korean Vocab Cards</div>
                    <div className="text-[10px] text-slate-400">EPS-TOPIK 60-Lesson Vocab Deck</div>
                  </div>
                </button>
                <button
                  onClick={() => handleNavClick(() => { setViewMode('JAPANESE'); if (onSelectJpTab) onSelectJpTab('VOCAB_EXPLORER'); })}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/90 hover:border hover:border-amber-500/30 flex items-center gap-2.5 transition-all cursor-pointer group/item"
                >
                  <span className="text-base group-hover/item:scale-110 transition-transform">📝</span>
                  <div>
                    <div className="text-xs font-black text-white group-hover/item:text-amber-400 transition-colors">4-Column Short Note Sheets</div>
                    <div className="text-[10px] text-slate-400">Blank Kanji &amp; Hiragana Writing Practice</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* 3. Mock Tests Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black text-slate-300 hover:text-white hover:bg-slate-900 transition-all cursor-pointer border border-transparent hover:border-slate-800">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Mock Tests</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute top-full left-0 -mt-1 pt-3 w-68 transform origin-top-left transition-all duration-200 ease-out scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible pointer-events-none group-hover:pointer-events-auto z-[100]">
              <div className="bg-slate-900/98 backdrop-blur-2xl border border-slate-800 rounded-2xl p-2 shadow-2xl space-y-1">
                <button
                  onClick={() => handleNavClick(() => { setViewMode('JAPANESE'); if (onSelectJpTab) onSelectJpTab('TIMED_EXAM'); })}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/90 hover:border hover:border-rose-500/30 flex items-center gap-2.5 transition-all cursor-pointer group/item"
                >
                  <span className="text-base group-hover/item:scale-110 transition-transform">⏱</span>
                  <div>
                    <div className="text-xs font-black text-white group-hover/item:text-rose-400 transition-colors">JLPT N5-N2 Simulator</div>
                    <div className="text-[10px] text-slate-400">Timed Auto-Graded Exam Engine</div>
                  </div>
                </button>
                <button
                  onClick={() => handleNavClick(() => { setViewMode('KOREAN'); if (onSelectKrTab) onSelectKrTab('TIMED_EXAM'); })}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/90 hover:border hover:border-emerald-500/30 flex items-center gap-2.5 transition-all cursor-pointer group/item"
                >
                  <span className="text-base group-hover/item:scale-110 transition-transform">🎯</span>
                  <div>
                    <div className="text-xs font-black text-white group-hover/item:text-emerald-400 transition-colors">EPS &amp; TOPIK CBT Engine</div>
                    <div className="text-[10px] text-slate-400">CBT Auto-Graded Mock Exam Engine</div>
                  </div>
                </button>
                <button
                  onClick={() => handleNavClick(() => { setViewMode('KOREAN'); if (onSelectKrTab) onSelectKrTab('TIMED_EXAM'); })}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/90 hover:border hover:border-cyan-500/30 flex items-center gap-2.5 transition-all cursor-pointer group/item"
                >
                  <span className="text-base group-hover/item:scale-110 transition-transform">📊</span>
                  <div>
                    <div className="text-xs font-black text-white group-hover/item:text-cyan-400 transition-colors">Placement Diagnostics Test</div>
                    <div className="text-[10px] text-slate-400">Skill Evaluation &amp; Level Classifier</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* 4. Visa & Career Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black text-slate-300 hover:text-white hover:bg-slate-900 transition-all cursor-pointer border border-transparent hover:border-slate-800">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Visa &amp; Career</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute top-full left-0 -mt-1 pt-3 w-72 transform origin-top-left transition-all duration-200 ease-out scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible pointer-events-none group-hover:pointer-events-auto z-[100]">
              <div className="bg-slate-900/98 backdrop-blur-2xl border border-slate-800 rounded-2xl p-2 shadow-2xl space-y-1">
                <button
                  onClick={() => handleNavClick(() => { setViewMode('JAPANESE'); if (onSelectJpTab) onSelectJpTab('VOCAB_EXPLORER'); })}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/90 hover:border hover:border-rose-500/30 flex items-center gap-2.5 transition-all cursor-pointer group/item"
                >
                  <span className="text-base group-hover/item:scale-110 transition-transform">⛩️</span>
                  <div>
                    <div className="text-xs font-black text-white group-hover/item:text-rose-400 transition-colors">JFT-Basic SSW Guide</div>
                    <div className="text-[10px] text-slate-400">Specified Skilled Worker Visa Route (Japan)</div>
                  </div>
                </button>
                <button
                  onClick={() => handleNavClick(() => { setViewMode('KOREAN'); if (onSelectKrTab) onSelectKrTab('KOREAN_VOCAB'); })}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/90 hover:border hover:border-emerald-500/30 flex items-center gap-2.5 transition-all cursor-pointer group/item"
                >
                  <span className="text-base group-hover/item:scale-110 transition-transform">🏢</span>
                  <div>
                    <div className="text-xs font-black text-white group-hover/item:text-emerald-400 transition-colors">EPS Work Permit (E-9)</div>
                    <div className="text-[10px] text-slate-400">Employment Permit System Guide (Korea)</div>
                  </div>
                </button>
                <button
                  onClick={() => handleNavClick(() => { if (onOpenGuide) onOpenGuide('ssw-checklist'); })}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/90 hover:border hover:border-amber-500/30 flex items-center gap-2.5 transition-all cursor-pointer group/item"
                >
                  <span className="text-base group-hover/item:scale-110 transition-transform">📑</span>
                  <div>
                    <div className="text-xs font-black text-white group-hover/item:text-amber-400 transition-colors">Visa Document Checklist</div>
                    <div className="text-[10px] text-slate-400">Required Embassy &amp; Skill Test Papers</div>
                  </div>
                </button>
                <button
                  onClick={() => handleNavClick(() => { setViewMode('KOREAN'); if (onSelectKrTab) onSelectKrTab('KOREAN_VOCAB'); })}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/90 hover:border hover:border-teal-500/30 flex items-center gap-2.5 transition-all cursor-pointer group/item"
                >
                  <span className="text-base group-hover/item:scale-110 transition-transform">🦺</span>
                  <div>
                    <div className="text-xs font-black text-white group-hover/item:text-teal-400 transition-colors">Workplace Safety &amp; Sector Vocab</div>
                    <div className="text-[10px] text-slate-400">Manufacturing, Agriculture &amp; Construction</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* 5. About Dropdown (Includes Life in Japan & Life in Korea) */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black text-slate-300 hover:text-white hover:bg-slate-900 transition-all cursor-pointer border border-transparent hover:border-slate-800">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>About</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute top-full right-0 -mt-1 pt-3 w-72 transform origin-top-right transition-all duration-200 ease-out scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible pointer-events-none group-hover:pointer-events-auto z-[100]">
              <div className="bg-slate-900/98 backdrop-blur-2xl border border-slate-800 rounded-2xl p-2 shadow-2xl space-y-1">
                <button
                  onClick={() => handleNavClick(() => { if (onOpenGuide) onOpenGuide('life-in-japan'); })}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/90 hover:border hover:border-rose-500/30 flex items-center gap-2.5 transition-all cursor-pointer group/item"
                >
                  <span className="text-base group-hover/item:scale-110 transition-transform">🇯🇵</span>
                  <div>
                    <div className="text-xs font-black text-white group-hover/item:text-rose-400 transition-colors">Life in Japan &amp; Culture Guide</div>
                    <div className="text-[10px] text-slate-400">Living Costs, Etiquette, Trash Rules &amp; Housing</div>
                  </div>
                </button>
                <button
                  onClick={() => handleNavClick(() => { if (onOpenGuide) onOpenGuide('life-in-korea'); })}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/90 hover:border hover:border-emerald-500/30 flex items-center gap-2.5 transition-all cursor-pointer group/item"
                >
                  <span className="text-base group-hover/item:scale-110 transition-transform">🇰🇷</span>
                  <div>
                    <div className="text-xs font-black text-white group-hover/item:text-emerald-400 transition-colors">Life in Korea &amp; EPS Guide</div>
                    <div className="text-[10px] text-slate-400">EPS E-9 Living, Transport &amp; Workplace Rights</div>
                  </div>
                </button>
                <button
                  onClick={() => handleNavClick(() => { setViewMode('JAPANESE'); if (onSelectJpTab) onSelectJpTab('CERTIFICATE'); })}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/90 hover:border hover:border-purple-500/30 flex items-center gap-2.5 transition-all cursor-pointer group/item"
                >
                  <span className="text-base group-hover/item:scale-110 transition-transform">🏅</span>
                  <div>
                    <div className="text-xs font-black text-white group-hover/item:text-purple-400 transition-colors">QR Certificate Verifier</div>
                    <div className="text-[10px] text-slate-400">Official Pass Certification Engine</div>
                  </div>
                </button>
                <button
                  onClick={() => handleNavClick(() => setViewMode('LANDING'))}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/90 hover:border hover:border-indigo-500/30 flex items-center gap-2.5 transition-all cursor-pointer group/item"
                >
                  <span className="text-base group-hover/item:scale-110 transition-transform">🗺️</span>
                  <div>
                    <div className="text-xs font-black text-white group-hover/item:text-indigo-400 transition-colors">Interactive Curriculum Roadmap</div>
                    <div className="text-[10px] text-slate-400">Step-by-Step Japanese &amp; Korean Paths</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">


          {user ? (
            <div className="flex items-center gap-2.5">
              {/* Study Streak Badge on Left Side */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-black shadow-sm" title={`${user.streak || 1} Days Active Study Streak`}>
                <Flame className="w-4 h-4 animate-bounce text-amber-400" />
                <span>{user.streak || 1}D</span>
              </div>

              {/* Pure Circle Profile Avatar Icon & Dropdown Menu */}
              <div className="relative group">
                <button
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-rose-500 hover:scale-105 transition-all cursor-pointer flex items-center justify-center font-black text-sm text-white shadow-md border border-white/20 active:scale-95"
                  title={user.name}
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </button>

                {/* Floating Profile Dropdown Menu */}
                <div className="absolute top-full right-0 -mt-1 pt-3 w-64 transform origin-top-right transition-all duration-200 ease-out scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible pointer-events-none group-hover:pointer-events-auto z-[100]">
                  <div className="bg-slate-900/98 backdrop-blur-2xl border border-slate-800 rounded-3xl p-3 shadow-2xl space-y-3">
                    {/* Header Info */}
                    <div className="flex items-center gap-3 p-2.5 bg-slate-950/90 rounded-2xl border border-slate-800">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-rose-500 flex items-center justify-center font-black text-sm text-white shadow-inner shrink-0 border border-white/20">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-black text-white truncate">{user.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">{user.email || 'student@languageguru.com'}</div>
                        <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-amber-400">
                          <Flame className="w-3 h-3 text-amber-400" />
                          <span>{user.streak || 1} Days Study Streak</span>
                        </div>
                      </div>
                    </div>

                    {/* Menu Actions */}
                    <div className="space-y-1 pt-1 border-t border-slate-800">
                      {(user.role === 'ADMIN' || user.role === 'INSTRUCTOR' || user.role === 'MANAGER') && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-all text-xs font-bold"
                        >
                          <ShieldCheck className="w-4 h-4 text-indigo-400" />
                          <span>Admin CMS Dashboard</span>
                        </Link>
                      )}
                      <button
                        onClick={() => handleNavClick(() => { setViewMode('JAPANESE'); if (onSelectJpTab) onSelectJpTab('CERTIFICATE'); })}
                        className="w-full text-left flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-all text-xs font-bold cursor-pointer"
                      >
                        <Award className="w-4 h-4 text-emerald-400" />
                        <span>My Verified Certificates</span>
                      </button>
                    </div>

                    {/* Logout Action Button */}
                    <div className="pt-1 border-t border-slate-800">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-white border border-rose-800/50 transition-all text-xs font-black cursor-pointer shadow-sm"
                      >
                        <LogOut className="w-4 h-4 text-rose-400" />
                        <span>Log Out of Account</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button onClick={openLogin} className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-extrabold text-xs flex items-center gap-1.5 transition-all">
                <LogIn className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Sign In</span>
                <span className="sm:hidden">Login</span>
              </button>
              <button onClick={openSignup} className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-glow transition-all">
                <UserPlus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Up</span>
                <span className="sm:hidden">Join</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

/* ──────────────────────────────────────────────────────────────
   MOBILE DRAWER — Left Slide-Over Menu
────────────────────────────────────────────────────────────── */
interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  isJapanese: boolean;
  selectedLevel: LevelType;
  onSelectLevel: (lvl: LevelType) => void;
  selectedKoreanLevel: KoreanLevelType;
  onSelectKoreanLevel: (lvl: KoreanLevelType) => void;
  activeTabId: string;
  user: UserProfile | null;
  onTabClick: (id: string) => void;
  onSwitchLanguage: () => void;
  openLogin: () => void;
  openSignup: () => void;
  handleLogout: () => void;
}
const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open, onClose, isJapanese, selectedLevel, onSelectLevel, selectedKoreanLevel, onSelectKoreanLevel,
  activeTabId, user, onTabClick, onSwitchLanguage, openLogin, openSignup, handleLogout,
}) => {
  const accentGradient = isJapanese ? 'from-rose-600 via-pink-600 to-purple-600' : 'from-emerald-600 via-teal-600 to-indigo-600';
  const accentText     = isJapanese ? 'text-rose-400'  : 'text-emerald-400';
  const accentBorder   = isJapanese ? 'border-rose-500/40 bg-rose-500/10' : 'border-emerald-500/40 bg-emerald-500/10';
  const activeBg       = isJapanese
    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-900/40 border-transparent font-extrabold'
    : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/40 border-transparent font-extrabold';

  // Dynamic Level Subtabs
  const getDynamicTabs = (): TabDef[] => {
    if (isJapanese) {
      if (selectedLevel === 'BASICS') {
        return [
          { id: 'BASICS_VOCAB', label: 'Kana & Vowels', sublabel: 'Japanese Basics, Hiragana & Katakana Matrix', icon: BookOpen, emoji: '🌱', group: 'LEARNING' },
          { id: 'RADICALS', label: 'Kanji Radicals', sublabel: '214 Radicals & Stroke Breakdown', icon: Layers, emoji: '🧩', group: 'LEARNING' },
        ];
      }
      if (selectedLevel === 'JFT') {
        return [
          { id: 'TIMED_EXAM', label: 'CBT Exam Engine', sublabel: 'JFT-Basic Specified Skilled Worker Simulator', icon: Clock, emoji: '⏱', group: 'LEARNING' },
          { id: 'CERTIFICATE', label: 'Exam & Syllabus Guide', sublabel: 'Pass Criteria & Scoring Rules', icon: FileText, emoji: '🎓', group: 'LEARNING' },
          { id: 'VOCAB_EXPLORER', label: 'JFT Vocabulary', sublabel: 'Lessons 1-50 Practical Meanings', icon: BookOpen, emoji: '📖', group: 'LEARNING' },
          { id: 'KANJI_SRS', label: 'Kanji Flashcards', sublabel: 'Practical JFT Kanji Memory Deck', icon: Layers, emoji: '🃏', group: 'LEARNING' },
        ];
      }
      return [
        { id: 'VOCAB_EXPLORER', label: `${selectedLevel} Vocabulary`, sublabel: `Minna no Nihongo (${selectedLevel} Lessons & Vocab)`, icon: BookOpen, emoji: '📚', group: 'LEARNING' },
        { id: 'KANJI_SRS', label: `${selectedLevel} Kanji Flashcards`, sublabel: `JLPT ${selectedLevel} Kanji SRS Memory Deck`, icon: Layers, emoji: '🃏', group: 'LEARNING' },
        { id: 'ALPHABET_GRID', label: `${selectedLevel} Listening`, sublabel: `JLPT ${selectedLevel} Audio Matrix & CD Tracks`, icon: Headphones, emoji: '🎧', group: 'LEARNING' },
        { id: 'TIMED_EXAM', label: `${selectedLevel} Mock Test`, sublabel: `Timed JLPT ${selectedLevel} Exam Engine`, icon: Clock, emoji: '⏱', group: 'LEARNING' },
        { id: 'CERTIFICATE', label: 'Exam & Syllabus Guide', sublabel: `JLPT ${selectedLevel} Passing Rules & Scoring`, icon: ShieldCheck, emoji: '🎓', group: 'LEARNING' },
      ];
    } else {
      // Korean Platform
      if (selectedKoreanLevel === 'BASICS') {
        return [
          { id: 'BASICS_MODULES', label: '12 Modules Foundation', sublabel: 'Step-by-Step Interactive Lessons', icon: BookOpen, emoji: '🌱', group: 'LEARNING' },
          { id: 'GRAMMAR_100', label: 'Grammar (100)', sublabel: 'Top 100 Korean Essential Patterns', icon: FileText, emoji: '📝', group: 'LEARNING' },
          { id: 'COMMON_300', label: 'Common Words (300)', sublabel: 'Core Everyday Korean Vocabulary', icon: Globe, emoji: '📖', group: 'LEARNING' },
          { id: 'BASICS_TEST', label: 'Placement Test', sublabel: 'Skill Diagnostic & Level Evaluator', icon: Clock, emoji: '🎯', group: 'LEARNING' },
          { id: 'BASICS_ALPHABET', label: 'Hangeul Chart', sublabel: 'Consonants & Vowels Pronunciation Matrix', icon: Headphones, emoji: '🔤', group: 'LEARNING' },
        ];
      }
      const krLabel = selectedKoreanLevel === 'EPS' ? 'EPS-TOPIK' : selectedKoreanLevel.startsWith('TOPIK') ? 'TOPIK' : 'EPS Sector';
      return [
        { id: 'KOREAN_VOCAB', label: `${krLabel} Vocabulary`, sublabel: `${krLabel} Lessons 1-60 (Nepali & English)`, icon: Globe, emoji: '📚', group: 'LEARNING' },
        { id: 'KOREAN_FLASHCARD', label: `${krLabel} Flashcards`, sublabel: `${krLabel} SRS Spaced Repetition Deck`, icon: Layers, emoji: '🃏', group: 'LEARNING' },
        { id: 'ALPHABET_GRID', label: `${krLabel} Listening`, sublabel: 'Audio Matrix & Dialogue Practice', icon: Headphones, emoji: '🎧', group: 'LEARNING' },
        { id: 'TIMED_EXAM', label: `${krLabel} Mock Test`, sublabel: 'CBT Auto-Graded Exam Simulator', icon: Clock, emoji: '⏱', group: 'LEARNING' },
        { id: 'CERTIFICATE', label: 'Exam & Syllabus Guide', sublabel: 'E-9 Visa & Passing Requirements', icon: ShieldCheck, emoji: '🎓', group: 'LEARNING' },
      ];
    }
  };

  const currentTabs = getDynamicTabs();
  const learningTabs = currentTabs.filter(t => t.group === 'LEARNING');
  const toolTabs = [
    { id: 'HEATMAP', label: 'Streak Heatmap', sublabel: 'Study Progress & Consistency', icon: Calendar, emoji: '🔥', group: 'TOOLS' as const },
    { id: 'CERTIFICATE', label: 'QR Certificate Verifier', sublabel: 'Official Pass Certification Engine', icon: ShieldCheck, emoji: '🏅', group: 'TOOLS' as const },
  ];

  return (
    <>
      {/* Dark Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Left Slide-Over Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[86vw] max-w-[330px] bg-slate-950 border-r border-slate-800/80 shadow-2xl flex flex-col transition-transform duration-300 ease-out font-sans ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* ── Drawer Header ── */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-800 bg-slate-950 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-2xl bg-gradient-to-tr ${accentGradient} flex items-center justify-center text-white font-black text-xl shadow-lg`}>
              {isJapanese ? '語' : '한'}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-white tracking-tight">
                  {isJapanese ? 'Japanese Academy' : 'Korean Academy'}
                </span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase border ${accentBorder} ${accentText}`}>
                  {isJapanese ? 'N5–N1' : 'EPS-TOPIK'}
                </span>
              </div>
              <p className="text-[10px] font-extrabold text-slate-400 mt-0.5">
                {isJapanese ? `JLPT Level: ${selectedLevel}` : `Korean Level: ${selectedKoreanLevel}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700 flex items-center justify-center cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ── User Profile Strip ── */}
        <div className="px-3 py-2.5 border-b border-slate-800/60 bg-slate-900/40 shrink-0">
          {user ? (
            <div className="flex items-center justify-between gap-3 bg-slate-800/60 border border-slate-700/60 rounded-2xl px-3 py-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-sm shrink-0 shadow-md">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-white truncate">{user.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 px-2 py-1 rounded-lg">
                  <Flame className="w-3 h-3 text-amber-400" />
                  <span className="text-[10px] font-black text-amber-300">{user.streak}d</span>
                </div>
                <button
                  onClick={() => { handleLogout(); onClose(); }}
                  className="w-7 h-7 rounded-xl bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-300 transition-colors border border-slate-700 flex items-center justify-center cursor-pointer"
                  title="Log Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => { openLogin(); onClose(); }}
                className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-indigo-400" />
                <span>Sign In</span>
              </button>
              <button
                onClick={() => { openSignup(); onClose(); }}
                className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg transition-all cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </button>
            </div>
          )}
        </div>

        {/* ── Scrollable Nav Menu ── */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">

          {/* Level Selector Pills inside Mobile Drawer */}
          <div>
            <div className="px-1 pb-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center justify-between">
              <span>SELECT LEVEL ({isJapanese ? 'JAPANESE' : 'KOREAN'})</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
              {isJapanese ? (
                [
                  { id: 'BASICS' as LevelType, label: 'Basics' },
                  { id: 'N5' as LevelType,     label: 'N5' },
                  { id: 'N4' as LevelType,     label: 'N4' },
                  { id: 'N3' as LevelType,     label: 'N3' },
                  { id: 'N2' as LevelType,     label: 'N2' },
                  { id: 'N1' as LevelType,     label: 'N1' },
                  { id: 'JFT' as LevelType,    label: 'JFT' },
                  { id: 'KANJI_1000' as LevelType, label: 'Kanji (1000)' },
                ].map((lvl) => {
                  const isActive = selectedLevel === lvl.id;
                  return (
                    <button
                      key={lvl.id}
                      onClick={() => onSelectLevel(lvl.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer border ${
                        isActive
                          ? 'bg-rose-600 text-white border-rose-400 shadow-md font-black scale-105'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  );
                })
              ) : (
                [
                  { id: 'BASICS' as KoreanLevelType,    label: 'Basics' },
                  { id: 'EPS' as KoreanLevelType,       label: 'EPS 60' },
                  { id: 'TOPIK1_L1' as KoreanLevelType, label: 'TOPIK L1' },
                  { id: 'TOPIK2' as KoreanLevelType,    label: 'TOPIK L2' },
                  { id: 'TOPIK3' as KoreanLevelType,    label: 'TOPIK L3' },
                  { id: 'TOPIK4' as KoreanLevelType,    label: 'TOPIK L4' },
                  { id: 'EPS_MFG' as KoreanLevelType,   label: 'Mfg' },
                  { id: 'EPS_AGR' as KoreanLevelType,   label: 'Agr' },
                  { id: 'EPS_SAFETY' as KoreanLevelType,label: 'Safety' },
                ].map((lvl) => {
                  const isActive = selectedKoreanLevel === lvl.id;
                  return (
                    <button
                      key={lvl.id}
                      onClick={() => onSelectKoreanLevel(lvl.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer border ${
                        isActive
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-md font-black scale-105'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Curriculum Subtabs Section */}
          <div>
            <div className="px-1 pb-2 flex items-center gap-2">
              <div className="h-px flex-1 bg-slate-800" />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                {isJapanese ? `JLPT ${selectedLevel} MODULES` : `${selectedKoreanLevel} MODULES`}
              </span>
              <div className="h-px flex-1 bg-slate-800" />
            </div>

            <div className="space-y-1.5">
              {learningTabs.map((tab) => {
                const isActive = activeTabId === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { onTabClick(tab.id); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all text-left border cursor-pointer ${
                      isActive ? activeBg : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800/60 text-slate-300 hover:text-white'
                    }`}
                  >
                    {/* Icon tile */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 transition-transform ${
                      isActive ? 'bg-white/20' : 'bg-slate-800 border border-slate-700'
                    }`}>
                      {tab.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-extrabold leading-tight truncate ${isActive ? 'text-white' : 'text-slate-200'}`}>
                        {tab.label}
                      </div>
                      <div className={`text-[10px] truncate mt-0.5 ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                        {tab.sublabel}
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tools Section */}
          <div>
            <div className="px-1 pb-2 flex items-center gap-2">
              <div className="h-px flex-1 bg-slate-800" />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Tools</span>
              <div className="h-px flex-1 bg-slate-800" />
            </div>

            <div className="space-y-1.5">
              {toolTabs.map((tab) => {
                const isActive = activeTabId === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { onTabClick(tab.id); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-left border cursor-pointer ${
                      isActive ? activeBg : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800/60 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 ${
                      isActive ? 'bg-white/20' : 'bg-slate-800 border border-slate-700'
                    }`}>
                      {tab.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-extrabold truncate ${isActive ? 'text-white' : 'text-slate-200'}`}>{tab.label}</div>
                      <div className={`text-[10px] truncate ${isActive ? 'text-white/80' : 'text-slate-400'}`}>{tab.sublabel}</div>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Footer: Platform Switcher ── */}
        <div className="px-3 py-3 border-t border-slate-800 bg-slate-950 shrink-0 space-y-2">
          <button
            onClick={() => { onSwitchLanguage(); onClose(); }}
            className={`w-full py-3 rounded-2xl bg-gradient-to-r ${
              isJapanese ? 'from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600' : 'from-rose-700 to-pink-700 hover:from-rose-600 hover:to-pink-600'
            } text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer`}
          >
            <span className="text-base">{isJapanese ? '🇰🇷' : '🇯🇵'}</span>
            <span>Switch to {isJapanese ? 'Korean Platform' : 'Japanese Platform'}</span>
            <ChevronRight className="w-3.5 h-3.5 text-white/70" />
          </button>
          <div className="text-[10px] text-slate-500 text-center font-mono">
            LanguageGuru v2.4 • SM-2 SRS Engine
          </div>
        </div>
      </aside>
    </>
  );
};


/* ──────────────────────────────────────────────────────────────
   HOME PAGE (main component)
────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('LANDING');
  const [selectedLevel, setSelectedLevel] = useState<LevelType>('N5');
  const [selectedKoreanLevel, setSelectedKoreanLevel] = useState<KoreanLevelType>('EPS');
  const [jpTab,    setJpTab]    = useState<JapaneseTab | null>(null);
  const [krTab,    setKrTab]    = useState<KoreanTab | null>(null);
  const [activeGuideId, setActiveGuideId] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [unsyncedItems, setUnsyncedItems] = useState(0);

  // Auth state
  const [user,         setUser]         = useState<UserProfile | null>(null);
  const [showAuth,     setShowAuth]     = useState(false);
  const [authMode,     setAuthMode]     = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [authName,     setAuthName]     = useState('');
  const [authEmail,    setAuthEmail]    = useState('');
  const [authPassword, setAuthPassword] = useState('');

  // Mobile drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const up = () => setIsOnline(true);
    const dn = () => setIsOnline(false);
    window.addEventListener('online', up);
    window.addEventListener('offline', dn);
    getUnsyncedCount().then(setUnsyncedItems);
    const saved = localStorage.getItem('lg_user');
    if (saved) { try { setUser(JSON.parse(saved)); } catch (_) {} }
    return () => { window.removeEventListener('online', up); window.removeEventListener('offline', dn); };
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  // Close drawer on tab/view change
  useEffect(() => { setDrawerOpen(false); }, [viewMode, jpTab, krTab]);

  // Dynamic Document Title based on Platform
  useEffect(() => {
    if (viewMode === 'JAPANESE') {
      document.title = "Japanese Academy — Nepal's Complete JLPT N5-N1 Platform";
    } else if (viewMode === 'KOREAN') {
      document.title = "Korean Academy — Nepal's Complete EPS-TOPIK Platform";
    } else {
      document.title = "JapanKoreaHub – Learn Japanese & Korean";
    }
  }, [viewMode]);

  /* ── Helpers ── */
  const openLogin  = () => { setAuthMode('LOGIN');  setShowAuth(true); };
  const openSignup = () => { setAuthMode('SIGNUP'); setShowAuth(true); };
  const closeAuth  = () => { setShowAuth(false); };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const name = authMode === 'SIGNUP' ? (authName || 'Learner') : authEmail.split('@')[0];
    const profile: UserProfile = { name, email: authEmail, streak: 14 };
    setUser(profile);
    localStorage.setItem('lg_user', JSON.stringify(profile));
    closeAuth();
    setAuthEmail(''); setAuthPassword(''); setAuthName('');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('lg_user');
  };

  const handleJpTabClick = (tabId: string) => {
    setJpTab(tabId as JapaneseTab);
  };

  const handleKrTabClick = (tabId: string) => {
    setKrTab(tabId as KoreanTab);
  };

  /* ── Derived values ── */
  const isJapanese   = viewMode === 'JAPANESE';
  const tabs         = isJapanese ? JAPANESE_TABS : KOREAN_TABS;
  const activeTab    = (isJapanese ? jpTab : krTab) || '';
  const activeDef    = tabs.find(t => t.id === activeTab);
  const activeLabel  = activeDef?.label || '';
  const accentActive = isJapanese ? 'bg-rose-600 border-rose-400' : 'bg-emerald-600 border-emerald-400';

  /* ──────────────────────────────────────────────────────────
     LANDING PAGE
  ────────────────────────────────────────────────────────── */
  if (viewMode === 'LANDING') {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
        <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none" />

        <SharedHeader
          viewMode={viewMode} isJapanese={isJapanese} activeTabLabel={activeLabel}
          user={user} isOnline={isOnline} unsyncedItems={unsyncedItems} drawerOpen={drawerOpen}
          setViewMode={setViewMode} setDrawerOpen={setDrawerOpen}
          openLogin={openLogin} openSignup={openSignup} handleLogout={handleLogout}
          onSelectJpTab={handleJpTabClick} onSelectKrTab={handleKrTabClick}
          onOpenGuide={(id) => setActiveGuideId(id)}
          onSwitchLanguage={() => setViewMode(isJapanese ? 'KOREAN' : 'JAPANESE')}
        />

        {/* Mobile Left Drawer for Landing View */}
        <MobileDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          isJapanese={isJapanese}
          selectedLevel={selectedLevel}
          onSelectLevel={(lvl) => { setSelectedLevel(lvl); setJpTab(null); setViewMode('JAPANESE'); }}
          selectedKoreanLevel={selectedKoreanLevel}
          onSelectKoreanLevel={(lvl) => { setSelectedKoreanLevel(lvl); setKrTab(null); setViewMode('KOREAN'); }}
          activeTabId={activeTab}
          user={user}
          onTabClick={id => {
            if (viewMode === 'LANDING') setViewMode(isJapanese ? 'JAPANESE' : 'KOREAN');
            if (isJapanese) handleJpTabClick(id); else handleKrTabClick(id);
          }}
          onSwitchLanguage={() => setViewMode(isJapanese ? 'KOREAN' : 'JAPANESE')}
          openLogin={openLogin}
          openSignup={openSignup}
          handleLogout={handleLogout}
        />

        <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-14 space-y-16 sm:space-y-20">

          {/* Hero */}
          <section className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Full-Stack Language Platform • Nepali &amp; English Explanations</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Master{' '}
              <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Japanese</span>
              {' '}&amp;{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Korean</span>
              <br className="hidden sm:block" /> with SRS &amp; AI-Powered Exam Engines
            </h1>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Complete handbook for <strong className="text-slate-200">Minna no Nihongo (Lessons 1-75)</strong> &amp;{' '}
              <strong className="text-slate-200">EPS-TOPIK (Lessons 1-60)</strong>. Interactive Kanji Inspector, Kana &amp; Hangul audio matrices, timed exam simulators, vocab short notes, and offline IndexedDB support.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button onClick={() => setViewMode('JAPANESE')} className="w-full sm:w-auto group px-8 py-4 rounded-2xl bg-gradient-to-br from-rose-600 to-pink-700 hover:from-rose-500 hover:to-pink-600 text-white font-black text-sm shadow-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1">
                <span className="text-2xl">🇯🇵</span><span>Japanese Platform (JLPT N5-N1)</span><ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button onClick={() => setViewMode('KOREAN')} className="w-full sm:w-auto group px-8 py-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-sm shadow-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1">
                <span className="text-2xl">🇰🇷</span><span>Korean Platform (EPS-TOPIK 1-60)</span><ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </section>

          {/* Language cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              { flag:'🇯🇵', title:'Japanese Language Platform', sub:'Minna no Nihongo Curriculum (Lessons 1-75)',
                badge:'JLPT N5 to N2', accent:'hover:border-rose-500/40', glow:'bg-rose-500/10', bar:'from-rose-600 to-pink-600',
                badgeCls:'bg-rose-500/20 text-rose-300 border-rose-500/30', iconBg:'bg-rose-950/80 border-rose-500/30',
                btnCls:'bg-rose-600 hover:bg-rose-500', chkCls:'text-rose-400',
                features:['Vocab 4-Column Short Note Sheets (Blank Kanji Support)','Kanji Radical Breakdown & Mnemonic SRS Inspector','Interactive Hiragana & Katakana Pronunciation Matrix','Timed JLPT N5-N2 Mock Exam Engine & QR Certificates'],
                onClick:()=>setViewMode('JAPANESE'), btnLabel:'Launch Japanese Curriculum' },
              { flag:'🇰🇷', title:'Korean Language Platform', sub:'EPS-TOPIK & TOPIK Level 2-4 Curriculum',
                badge:'EPS-TOPIK 60 Lessons', accent:'hover:border-emerald-500/40', glow:'bg-emerald-500/10', bar:'from-emerald-600 to-teal-600',
                badgeCls:'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', iconBg:'bg-emerald-950/80 border-emerald-500/30',
                btnCls:'bg-emerald-600 hover:bg-emerald-500', chkCls:'text-emerald-400',
                features:['60 Complete EPS-TOPIK Lessons with Nepali & English notes','Hangul Matrix: Consonants, Vowels & Double Jamo Audio','SRS Flashcard System & 4-Column Vocab Short Note Sheets','EPS & TOPIK Exam Simulator with Auto Grading'],
                onClick:()=>setViewMode('KOREAN'), btnLabel:'Launch Korean Curriculum' },
            ].map(c => (
              <div key={c.title} onClick={c.onClick}
                className={`relative bg-slate-900/90 border border-slate-800 ${c.accent} rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 transition-all duration-300 group overflow-hidden cursor-pointer`}>
                <div className={`absolute -top-10 -right-10 w-48 h-48 ${c.glow} rounded-full blur-3xl group-hover:opacity-150 transition-all duration-500`} />
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${c.bar} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-3xl`} />
                <div className="flex items-center justify-between relative z-10">
                  <div className={`w-16 h-16 rounded-2xl ${c.iconBg} border flex items-center justify-center text-4xl shadow-inner`}>{c.flag}</div>
                  <span className={`px-3 py-1 rounded-full ${c.badgeCls} text-xs font-extrabold border`}>{c.badge}</span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-white">{c.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{c.sub}</p>
                </div>
                <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80 relative z-10">
                  {c.features.map((f,i)=>(
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className={`w-4 h-4 ${c.chkCls} flex-shrink-0`}/><span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-2xl ${c.btnCls} text-white font-black text-xs shadow-glow transition-all flex items-center justify-center gap-2 relative z-10`}>
                  {c.btnLabel} <ChevronRight className="w-4 h-4"/>
                </button>
              </div>
            ))}
          </section>

          {/* Progress dashboard */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                  <Calendar className="w-4 h-4 text-amber-400" /><span>Personal Study Dashboard &amp; Progress Heatmap</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {user ? `Welcome back, ${user.name}! 👋` : 'Track Your Learning Journey'}
                </h2>
              </div>
              {!user && (
                <button onClick={openSignup} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold flex items-center gap-2 shadow-glow transition-all">
                  <UserPlus className="w-4 h-4" /> Sign Up to Track Progress
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {[
                { label:'Active Streak',  value:user?`${user.streak} Days`:'14 Days', icon:Flame,       color:'text-amber-400',  bg:'bg-amber-500/10 border-amber-500/20'   },
                { label:'Mastered Vocab', value:'420 Words',                           icon:BookOpen,    color:'text-rose-400',   bg:'bg-rose-500/10 border-rose-500/20'     },
                { label:'Exam Pass Rate', value:'92%',                                 icon:Award,       color:'text-emerald-400',bg:'bg-emerald-500/10 border-emerald-500/20'},
                { label:'Lessons Done',   value:'56 / 75',                             icon:CheckCircle2,color:'text-indigo-400', bg:'bg-indigo-500/10 border-indigo-500/20' },
              ].map(({label,value,icon:Icon,color,bg})=>(
                <div key={label} className={`${bg} border rounded-2xl p-4 space-y-1.5`}>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
                  <div className={`text-xl sm:text-2xl font-black ${color} flex items-center gap-2`}>
                    <Icon className="w-5 h-5 flex-shrink-0"/><span>{value}</span>
                  </div>
                </div>
              ))}
            </div>
            <StreakHeatmap />
          </section>
        </div>

        <footer className="bg-slate-950 border-t border-slate-800/80 py-4 px-4 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
            <span>LanguageGuru • Japanese JLPT N5–N1 &amp; Korean EPS-TOPIK (Lessons 1-60)</span>
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <span>SM-2 SRS</span><span>•</span><span>Offline IndexedDB</span><span>•</span><span>QR Certificate Verification</span>
            </div>
          </div>
        </footer>

        {showAuth && (
          <AuthModal
            authMode={authMode} setAuthMode={setAuthMode}
            authName={authName} setAuthName={setAuthName}
            authEmail={authEmail} setAuthEmail={setAuthEmail}
            authPassword={authPassword} setAuthPassword={setAuthPassword}
            onSubmit={handleAuth} onClose={closeAuth}
          />
        )}
      </main>
    );
  }

  /* ──────────────────────────────────────────────────────────
     PLATFORM PAGE (Japanese / Korean)
  ────────────────────────────────────────────────────────── */
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative">
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <SharedHeader
        viewMode={viewMode} isJapanese={isJapanese} activeTabLabel={activeLabel}
        user={user} isOnline={isOnline} unsyncedItems={unsyncedItems} drawerOpen={drawerOpen}
        setViewMode={setViewMode} setDrawerOpen={setDrawerOpen}
        openLogin={openLogin} openSignup={openSignup} handleLogout={handleLogout}
        onSelectJpTab={handleJpTabClick} onSelectKrTab={handleKrTabClick}
        onOpenGuide={(id) => setActiveGuideId(id)}
        onSwitchLanguage={() => setViewMode(isJapanese ? 'KOREAN' : 'JAPANESE')}
      />

      {/* Sticky Level Selector Bar (Japanese & Korean) */}
      <div className="sticky top-[57px] sm:top-[68px] z-30 bg-slate-950/98 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 lg:px-12">
        <div className="w-full max-w-full py-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1 text-xs font-black uppercase tracking-wider text-slate-400 shrink-0 mr-1">
            <Globe className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Curriculum Level:</span>
          </div>

          {isJapanese ? (
            /* Japanese Level Pills (Clean text with active pop-out zoom-in effect) */
            <div className="flex items-center gap-2 shrink-0 py-1.5 px-1">
              {[
                { id: 'BASICS' as LevelType, label: 'Basics' },
                { id: 'N5' as LevelType,     label: 'JLPT N5' },
                { id: 'N4' as LevelType,     label: 'JLPT N4' },
                { id: 'N3' as LevelType,     label: 'JLPT N3' },
                { id: 'N2' as LevelType,     label: 'JLPT N2' },
                { id: 'N1' as LevelType,     label: 'JLPT N1' },
                { id: 'JFT' as LevelType,    label: 'JFT-Basic' },
                { id: 'KANJI_1000' as LevelType, label: 'Kanji (1000)' },
              ].map((lvl) => {
                const isActive = selectedLevel === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    onClick={() => { setSelectedLevel(lvl.id); setJpTab(null); }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all duration-300 transform cursor-pointer whitespace-nowrap border ${
                      isActive
                        ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 text-white shadow-xl shadow-rose-600/40 border-rose-400 scale-110 -translate-y-0.5 z-10 ring-2 ring-rose-400 ring-offset-2 ring-offset-slate-950 font-extrabold'
                        : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border-slate-800 scale-95 opacity-70 hover:opacity-100 hover:scale-100 hover:translate-y-0'
                    }`}
                  >
                    <span>{lvl.label}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            /* Korean Level Pills (Clean text with active pop-out zoom-in effect, TOPIK 1-6) */
            <div className="flex items-center gap-2 shrink-0 py-1.5 px-1">
              {[
                { id: 'BASICS' as KoreanLevelType,    label: 'Basics' },
                { id: 'TOPIK1_L1' as KoreanLevelType, label: 'TOPIK I (Level 1)' },
                { id: 'TOPIK2' as KoreanLevelType,    label: 'TOPIK I (Level 2)' },
                { id: 'TOPIK3' as KoreanLevelType,    label: 'TOPIK II (Level 3)' },
                { id: 'TOPIK4' as KoreanLevelType,    label: 'TOPIK II (Level 4)' },
                { id: 'TOPIK2_L5' as KoreanLevelType, label: 'TOPIK II (Level 5)' },
                { id: 'TOPIK2_L6' as KoreanLevelType, label: 'TOPIK II (Level 6)' },
                { id: 'EPS' as KoreanLevelType,       label: 'EPS-TOPIK (1-60)' },
              ].map((lvl) => {
                const isActive = selectedKoreanLevel === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    onClick={() => { setSelectedKoreanLevel(lvl.id); setKrTab(null); }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all duration-300 transform cursor-pointer whitespace-nowrap border ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white shadow-xl shadow-emerald-600/40 border-emerald-400 scale-110 -translate-y-0.5 z-10 ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-950 font-extrabold'
                        : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border-slate-800 scale-95 opacity-70 hover:opacity-100 hover:scale-100 hover:translate-y-0'
                    }`}
                  >
                    <span>{lvl.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>


      {/* Mobile Left Drawer */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        isJapanese={isJapanese}
        selectedLevel={selectedLevel}
        onSelectLevel={(lvl) => { setSelectedLevel(lvl); setJpTab(null); }}
        selectedKoreanLevel={selectedKoreanLevel}
        onSelectKoreanLevel={(lvl) => { setSelectedKoreanLevel(lvl); setKrTab(null); }}
        activeTabId={activeTab}
        user={user}
        onTabClick={id => isJapanese ? handleJpTabClick(id) : handleKrTabClick(id)}
        onSwitchLanguage={() => setViewMode(isJapanese ? 'KOREAN' : 'JAPANESE')}
        openLogin={openLogin}
        openSignup={openSignup}
        handleLogout={handleLogout}
      />

      {/* Content area */}
      <div className="flex-1 w-full max-w-full px-4 sm:px-8 lg:px-12 py-4 sm:py-6">
        {isJapanese ? (
          <LevelHubDashboard
            level={selectedLevel}
            onSelectLevel={setSelectedLevel}
            activeTab={
              jpTab === 'KANJI_SRS' ? 'FLASHCARDS' :
              jpTab === 'ALPHABET_GRID' ? 'LISTENING' :
              jpTab === 'TIMED_EXAM' ? 'EXAMS' :
              jpTab === 'RADICALS' ? 'RADICALS' :
              jpTab === 'CERTIFICATE' ? 'EXAM_GUIDE' :
              jpTab === 'VOCAB_EXPLORER' ? 'VOCABULARY' : undefined
            }
            onTabChange={(t) => {
              if (t === 'FLASHCARDS') setJpTab('KANJI_SRS');
              else if (t === 'VOCABULARY') setJpTab('VOCAB_EXPLORER');
              else if (t === 'LISTENING') setJpTab('ALPHABET_GRID');
              else if (t === 'EXAMS') setJpTab('TIMED_EXAM');
              else if (t === 'RADICALS') setJpTab('RADICALS');
              else if (t === 'EXAM_GUIDE') setJpTab('CERTIFICATE');
            }}
          />
        ) : (
          <KoreanHubDashboard
            level={selectedKoreanLevel}
            onSelectLevel={setSelectedKoreanLevel}
            activeTab={
              krTab === 'KOREAN_FLASHCARD' ? 'FLASHCARDS' :
              krTab === 'ALPHABET_GRID' ? 'LISTENING' :
              krTab === 'TIMED_EXAM' ? 'EXAMS' :
              krTab === 'CERTIFICATE' ? 'EXAM_GUIDE' :
              krTab === 'KOREAN_VOCAB' ? 'VOCABULARY' : undefined
            }
            onTabChange={(t) => {
              if (t === 'FLASHCARDS') setKrTab('KOREAN_FLASHCARD');
              else if (t === 'VOCABULARY') setKrTab('KOREAN_VOCAB');
              else if (t === 'LISTENING') setKrTab('ALPHABET_GRID');
              else if (t === 'EXAMS') setKrTab('TIMED_EXAM');
              else if (t === 'EXAM_GUIDE') setKrTab('CERTIFICATE');
            }}
          />
        )}
      </div>

      <footer className="bg-slate-950 border-t border-slate-800/80 py-4 px-4 sm:px-8 lg:px-12 text-center text-xs text-slate-500">
        <div className="w-full max-w-full flex flex-col md:flex-row items-center justify-between gap-2">
          <span>
            {viewMode === 'JAPANESE'
              ? 'Japanese Academy - Minna no Nihongo (Lessons 1-75) & JLPT N5-N1 Handbook'
              : viewMode === 'KOREAN'
              ? 'Korean Academy - EPS-TOPIK (Lessons 1-60) & TOPIK I-II Handbook'
              : 'JapanKoreaHub – Learn Japanese & Korean'}
          </span>
          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            <span>SM-2 SRS</span><span>•</span><span>Offline IndexedDB</span><span>•</span><span>QR Certificate Verification</span>
          </div>
        </div>
      </footer>

      {showAuth && (
        <AuthModal
          authMode={authMode} setAuthMode={setAuthMode}
          authName={authName} setAuthName={setAuthName}
          authEmail={authEmail} setAuthEmail={setAuthEmail}
          authPassword={authPassword} setAuthPassword={setAuthPassword}
          onSubmit={handleAuth} onClose={closeAuth}
        />
      )}

      {activeGuideId && (
        <InfoGuideModal
          guideId={activeGuideId}
          onClose={() => setActiveGuideId(null)}
          onNavigateView={setViewMode}
        />
      )}
    </main>
  );
}
