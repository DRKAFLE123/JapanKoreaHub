'use client';

import React, { useState, useEffect } from 'react';
import {
  Flame, Wifi, WifiOff, BookOpen, Headphones,
  Clock, Layers, Calendar, ShieldCheck, Globe, Sparkles,
  User, LogOut, LogIn, UserPlus, ArrowLeft, CheckCircle2, Award, X, ChevronRight,
  Zap, Menu,
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

/* ──────────────────────────────────────────────────────────────
   TYPES
────────────────────────────────────────────────────────────── */
type ViewMode    = 'LANDING' | 'JAPANESE' | 'KOREAN';
type JapaneseTab = 'VOCAB_EXPLORER' | 'KANJI_SRS' | 'ALPHABET_GRID' | 'TIMED_EXAM' | 'RADICALS' | 'HEATMAP' | 'CERTIFICATE';
type KoreanTab   = 'KOREAN_VOCAB'   | 'KOREAN_FLASHCARD' | 'ALPHABET_GRID' | 'TIMED_EXAM' | 'HEATMAP' | 'CERTIFICATE';

interface UserProfile { name: string; email: string; streak: number; }

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
  { id: 'VOCAB_EXPLORER', label: 'Vocabulary',  sublabel: 'Basics • Kana • N5–N3 Lessons',   icon: BookOpen,    emoji: '📚', group: 'LEARNING' },
  { id: 'KANJI_SRS',      label: 'Flashcards',  sublabel: 'Kanji SRS • SM-2 Algorithm',      icon: Layers,      emoji: '🃏', group: 'LEARNING' },
  { id: 'ALPHABET_GRID',  label: 'Listening',   sublabel: '87 CD Tracks • Lessons 1–25',     icon: Headphones,  emoji: '🎧', group: 'LEARNING' },
  { id: 'TIMED_EXAM',     label: 'Mock Test',   sublabel: 'JLPT N5–N2 Exam Simulator',       icon: Clock,       emoji: '⏱',  group: 'LEARNING' },
  { id: 'RADICALS',       label: 'Radicals',    sublabel: 'Kanji Radical Breakdown',         icon: Layers,      emoji: '🧩', group: 'TOOLS'    },
  { id: 'HEATMAP',        label: 'Streak',      sublabel: 'Study Progress Heatmap',          icon: Calendar,    emoji: '🔥', group: 'TOOLS'    },
  { id: 'CERTIFICATE',    label: 'Certificate', sublabel: 'QR Certificate Verifier',         icon: ShieldCheck, emoji: '🏅', group: 'TOOLS'    },
];

const KOREAN_TABS: TabDef[] = [
  { id: 'KOREAN_VOCAB',    label: 'Vocabulary',  sublabel: 'Lessons 1–60 • Nepali & English', icon: Globe,       emoji: '📚', group: 'LEARNING' },
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
}
const SharedHeader: React.FC<SharedHeaderProps> = ({
  viewMode, isJapanese, activeTabLabel, user, isOnline, unsyncedItems,
  setViewMode, setDrawerOpen, openLogin, openSignup, handleLogout,
}) => (
  <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 px-3 sm:px-6 py-2.5 sm:py-3">
    <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">

      {/* Left: Single official hamburger button + logo */}
      <div className="flex items-center gap-2.5">
        {viewMode !== 'LANDING' && (
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all flex-shrink-0 active:scale-95 shadow-sm"
            aria-label="Open navigation menu"
            title="Open Drawer Menu"
          >
            <Menu className="w-5 h-5 text-rose-400" />
          </button>
        )}
        <button onClick={() => setViewMode('LANDING')} className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-black text-xl shadow-glow group-hover:scale-105 transition-transform flex-shrink-0">
            語
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-white tracking-tight">LanguageGuru</span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">SM-2 SRS</span>
            </div>
            <p className="text-[10px] text-slate-400">Japanese (JLPT N5–N1) &amp; Korean (EPS-TOPIK)</p>
          </div>
          {viewMode !== 'LANDING' && (
            <div className="sm:hidden flex flex-col text-left">
              <span className="text-[11px] font-black text-white leading-tight">LanguageGuru</span>
              <span className="text-[10px] text-rose-400 font-bold">{isJapanese ? '🇯🇵' : '🇰🇷'} {activeTabLabel}</span>
            </div>
          )}
        </button>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        {viewMode !== 'LANDING' && (
          <button onClick={() => setViewMode('LANDING')} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Hub
          </button>
        )}
        <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border ${isOnline ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-400' : 'bg-amber-950/60 border-amber-800/80 text-amber-300'}`}>
          {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
          <span>{isOnline ? 'Online' : 'Offline'}</span>
          {unsyncedItems > 0 && <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px]">{unsyncedItems}</span>}
        </div>
        {user ? (
          <div className="flex items-center gap-1.5">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 text-xs font-extrabold">
              <Flame className="w-4 h-4 animate-bounce" /><span>{user.streak}D</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-xl text-xs">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-bold text-slate-200 hidden sm:inline max-w-[80px] truncate">{user.name}</span>
              <button onClick={handleLogout} className="p-0.5 hover:bg-slate-800 rounded text-slate-400 hover:text-rose-400 transition-colors" title="Log Out">
                <LogOut className="w-3.5 h-3.5" />
              </button>
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

/* ──────────────────────────────────────────────────────────────
   MOBILE DRAWER — Left Slide-Over Menu
────────────────────────────────────────────────────────────── */
interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  tabs: TabDef[];
  activeTabId: string;
  isJapanese: boolean;
  user: UserProfile | null;
  onTabClick: (id: string) => void;
  onSwitchLanguage: () => void;
  openLogin: () => void;
  openSignup: () => void;
  handleLogout: () => void;
}
const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open, onClose, tabs, activeTabId, isJapanese, user,
  onTabClick, onSwitchLanguage, openLogin, openSignup, handleLogout,
}) => {
  const accentGradient = isJapanese ? 'from-rose-600 via-pink-600 to-purple-600' : 'from-emerald-600 via-teal-600 to-indigo-600';
  const accentText     = isJapanese ? 'text-rose-400'  : 'text-emerald-400';
  const accentBorder   = isJapanese ? 'border-rose-500/40 bg-rose-500/10' : 'border-emerald-500/40 bg-emerald-500/10';
  const activeBg       = isJapanese ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-900/30' : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/30';

  const learningTabs = tabs.filter(t => t.group === 'LEARNING');
  const toolTabs     = tabs.filter(t => t.group === 'TOOLS');

  return (
    <>
      {/* Dark Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Left Slide-Over Drawer Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[84vw] max-w-[340px] bg-slate-900/98 border-r border-slate-800 shadow-2xl flex flex-col transition-transform duration-300 ease-out font-sans ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800/80 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-2xl bg-gradient-to-tr ${accentGradient} flex items-center justify-center text-white font-black text-xl shadow-glow`}>
              語
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-extrabold text-white">LanguageGuru</span>
                <span className={`px-1.5 py-0.2 rounded-md text-[9px] font-black uppercase border ${accentBorder} ${accentText}`}>
                  {isJapanese ? 'N5–N1' : 'EPS'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                {isJapanese ? '🇯🇵 Japanese Platform' : '🇰🇷 Korean Platform'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-all border border-slate-700"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Profile / Account Strip */}
        <div className="p-3.5 border-b border-slate-800/80 bg-slate-950/40">
          {user ? (
            <div className="flex items-center justify-between gap-3 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3 shadow-inner">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-base flex-shrink-0 shadow-md">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-white truncate">{user.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <div className="flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 px-2 py-1 rounded-xl">
                  <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                  <span className="text-[11px] font-black text-amber-300">{user.streak}d</span>
                </div>
                <button
                  onClick={() => { handleLogout(); onClose(); }}
                  className="p-1.5 rounded-xl bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-300 transition-colors border border-slate-700"
                  title="Log Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => { openLogin(); onClose(); }}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5 text-indigo-400" />
                <span>Sign In</span>
              </button>
              <button
                onClick={() => { openSignup(); onClose(); }}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-glow transition-all"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign Up Free</span>
              </button>
            </div>
          )}
        </div>

        {/* Scrollable Navigation Menu */}
        <div className="overflow-y-auto flex-1 px-3 py-3 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
          
          {/* 1. Learning Curriculum Section */}
          <div className="space-y-1">
            <div className="px-3 pb-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 flex items-center justify-between">
              <span>Curriculum Modules</span>
              <span className="text-slate-600 font-mono text-[9px]">{learningTabs.length} Tabs</span>
            </div>

            {learningTabs.map((tab) => {
              const isActive = activeTabId === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => { onTabClick(tab.id); onClose(); }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl transition-all text-left group ${
                    isActive
                      ? `${activeBg}`
                      : 'bg-slate-950/40 hover:bg-slate-800/80 border border-slate-800/80 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 transition-transform group-hover:scale-105 ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 border border-slate-700/80 text-slate-300'
                  }`}>
                    {tab.emoji}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black leading-tight truncate">{tab.label}</div>
                    <div className={`text-[10px] truncate mt-0.5 ${isActive ? 'text-slate-100 opacity-90' : 'text-slate-400'}`}>
                      {tab.sublabel}
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-600 group-hover:text-slate-300'}`} />
                </button>
              );
            })}
          </div>

          {/* 2. Tools & Utilities Section */}
          <div className="space-y-1 pt-1 border-t border-slate-800/60">
            <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 flex items-center justify-between">
              <span>Tools &amp; Analytics</span>
            </div>

            {toolTabs.map((tab) => {
              const isActive = activeTabId === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => { onTabClick(tab.id); onClose(); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all text-left group ${
                    isActive
                      ? `${activeBg}`
                      : 'bg-slate-950/40 hover:bg-slate-800/80 border border-slate-800/80 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0 ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 border border-slate-700/80 text-slate-400'
                  }`}>
                    {tab.emoji}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black leading-tight truncate">{tab.label}</div>
                    <div className={`text-[9px] truncate ${isActive ? 'text-slate-100 opacity-90' : 'text-slate-400'}`}>
                      {tab.sublabel}
                    </div>
                  </div>

                  <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Platform Switcher Button */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-950/80 space-y-2">
          <button
            onClick={() => { onSwitchLanguage(); onClose(); }}
            className="w-full py-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <span className="text-base">{isJapanese ? '🇰🇷' : '🇯🇵'}</span>
            <span>Switch to {isJapanese ? 'Korean' : 'Japanese'} Platform</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-2 pt-1 font-mono">
            <span>LanguageGuru v2.4</span>
            <span>•</span>
            <span>SM-2 SRS Engine</span>
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
  const [jpTab,    setJpTab]    = useState<JapaneseTab>('VOCAB_EXPLORER');
  const [krTab,    setKrTab]    = useState<KoreanTab>('KOREAN_VOCAB');
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
  const activeTab    = isJapanese ? jpTab : krTab;
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
              Complete handbook for <strong className="text-slate-200">Minna no Nihongo (Lessons 1–75)</strong> &amp;{' '}
              <strong className="text-slate-200">EPS-TOPIK (Lessons 1–60)</strong>. Interactive Kanji Inspector, Kana &amp; Hangul audio matrices, timed exam simulators, vocab short notes, and offline IndexedDB support.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button onClick={() => setViewMode('JAPANESE')} className="w-full sm:w-auto group px-8 py-4 rounded-2xl bg-gradient-to-br from-rose-600 to-pink-700 hover:from-rose-500 hover:to-pink-600 text-white font-black text-sm shadow-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1">
                <span className="text-2xl">🇯🇵</span><span>Japanese Platform (JLPT N5–N1)</span><ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button onClick={() => setViewMode('KOREAN')} className="w-full sm:w-auto group px-8 py-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-sm shadow-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1">
                <span className="text-2xl">🇰🇷</span><span>Korean Platform (EPS-TOPIK 1-60)</span><ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </section>

          {/* Language cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              { flag:'🇯🇵', title:'Japanese Language Platform', sub:'日本語 Minna no Nihongo Curriculum (Lessons 1–75)',
                badge:'JLPT N5 → N2', accent:'hover:border-rose-500/40', glow:'bg-rose-500/10', bar:'from-rose-600 to-pink-600',
                badgeCls:'bg-rose-500/20 text-rose-300 border-rose-500/30', iconBg:'bg-rose-950/80 border-rose-500/30',
                btnCls:'bg-rose-600 hover:bg-rose-500', chkCls:'text-rose-400',
                features:['Vocab 4-Column Short Note Sheets (Blank Kanji Support)','Kanji Radical Breakdown & Mnemonic SRS Inspector','Interactive Hiragana & Katakana Pronunciation Matrix','Timed JLPT N5–N2 Mock Exam Engine & QR Certificates'],
                onClick:()=>setViewMode('JAPANESE'), btnLabel:'Launch Japanese Curriculum' },
              { flag:'🇰🇷', title:'Korean Language Platform', sub:'한국어 EPS-TOPIK & TOPIK Level 2–4 Curriculum',
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
      />

      {/* Horizontal Scrollable Tab Bar (Mobile + Desktop) */}
      <div className="sticky top-[57px] sm:top-[68px] z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/60 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto py-2 sm:py-2.5 flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => isJapanese ? handleJpTabClick(tab.id) : handleKrTabClick(tab.id)}
                title={tab.label}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-1.5 sm:gap-2 border flex-shrink-0 ${
                  isActive
                    ? `${accentActive} text-white shadow-glow`
                    : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Left Drawer */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        tabs={tabs}
        activeTabId={activeTab}
        isJapanese={isJapanese}
        user={user}
        onTabClick={id => isJapanese ? handleJpTabClick(id) : handleKrTabClick(id)}
        onSwitchLanguage={() => setViewMode(isJapanese ? 'KOREAN' : 'JAPANESE')}
        openLogin={openLogin}
        openSignup={openSignup}
        handleLogout={handleLogout}
      />

      {/* Content area */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 py-4 sm:py-8">
        {isJapanese  && jpTab === 'VOCAB_EXPLORER'   && <VocabularyExplorer />}
        {isJapanese  && jpTab === 'KANJI_SRS'        && <KanjiCard />}
        {isJapanese  && jpTab === 'RADICALS'         && <RadicalBreakdown />}
        {!isJapanese && krTab === 'KOREAN_VOCAB'     && <KoreanVocabularyExplorer />}
        {!isJapanese && krTab === 'KOREAN_FLASHCARD' && <KoreanFlashcardCard />}
        {activeTab === 'ALPHABET_GRID' && <AlphabetGrid activeLanguage={isJapanese ? 'JAPANESE' : 'KOREAN'} />}
        {activeTab === 'TIMED_EXAM'   && <TimedExamEngine activeLanguage={isJapanese ? 'JAPANESE' : 'KOREAN'} />}
        {activeTab === 'HEATMAP'      && <StreakHeatmap />}
        {activeTab === 'CERTIFICATE'  && <CertificateVerifier />}
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
