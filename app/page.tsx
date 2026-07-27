'use client';

import React, { useState, useEffect } from 'react';
import {
  Flame, Wifi, WifiOff, BookOpen, Headphones,
  Clock, Layers, Calendar, ShieldCheck, Globe, Sparkles,
  User, LogOut, LogIn, UserPlus, ArrowLeft, CheckCircle2, Award, X, ChevronRight,
  Lock, Unlock, Star, Zap,
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

type ViewMode = 'LANDING' | 'JAPANESE' | 'KOREAN';

type JapaneseTab =
  | 'VOCAB_EXPLORER'
  | 'KANJI_SRS'
  | 'ALPHABET_GRID'
  | 'TIMED_EXAM'
  | 'RADICALS'
  | 'HEATMAP'
  | 'CERTIFICATE';

type KoreanTab =
  | 'KOREAN_VOCAB'
  | 'KOREAN_FLASHCARD'
  | 'ALPHABET_GRID'
  | 'TIMED_EXAM'
  | 'HEATMAP'
  | 'CERTIFICATE';

interface UserProfile {
  name: string;
  email: string;
  streak: number;
}

// Tabs that require login
const PROTECTED_JP_TABS: JapaneseTab[] = ['VOCAB_EXPLORER', 'ALPHABET_GRID', 'TIMED_EXAM'];
const PROTECTED_KR_TABS: KoreanTab[] = ['KOREAN_VOCAB', 'ALPHABET_GRID', 'TIMED_EXAM'];

export default function HomePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('LANDING');
  const [jpTab, setJpTab] = useState<JapaneseTab>('VOCAB_EXPLORER');
  const [krTab, setKrTab] = useState<KoreanTab>('KOREAN_VOCAB');
  const [isOnline, setIsOnline] = useState(true);
  const [unsyncedItems, setUnsyncedItems] = useState(0);

  // Auth states
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  // Auth gate state – which tab triggered the gate
  const [pendingJpTab, setPendingJpTab] = useState<JapaneseTab | null>(null);
  const [pendingKrTab, setPendingKrTab] = useState<KoreanTab | null>(null);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    getUnsyncedCount().then(setUnsyncedItems);
    const saved = localStorage.getItem('lg_user');
    if (saved) { try { setUser(JSON.parse(saved)); } catch (_) {} }
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const name = authMode === 'SIGNUP' ? (authName || 'Learner') : authEmail.split('@')[0];
    const profile: UserProfile = { name, email: authEmail, streak: 14 };
    setUser(profile);
    localStorage.setItem('lg_user', JSON.stringify(profile));
    setShowAuthModal(false);
    setAuthEmail(''); setAuthPassword(''); setAuthName('');
    // Navigate to the pending tab if any
    if (pendingJpTab) { setJpTab(pendingJpTab); setPendingJpTab(null); }
    if (pendingKrTab) { setKrTab(pendingKrTab); setPendingKrTab(null); }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('lg_user');
    // Reset to a free tab on logout
    setJpTab('KANJI_SRS');
    setKrTab('KOREAN_FLASHCARD');
  };

  /** Handle tab click — gate protected tabs */
  const handleJpTabClick = (tabId: JapaneseTab) => {
    if (!user && PROTECTED_JP_TABS.includes(tabId)) {
      setPendingJpTab(tabId);
      setAuthMode('SIGNUP');
      setShowAuthModal(true);
      return;
    }
    setJpTab(tabId);
  };

  const handleKrTabClick = (tabId: KoreanTab) => {
    if (!user && PROTECTED_KR_TABS.includes(tabId)) {
      setPendingKrTab(tabId);
      setAuthMode('SIGNUP');
      setShowAuthModal(true);
      return;
    }
    setKrTab(tabId);
  };

  const japaneseTabs = [
    { id: 'VOCAB_EXPLORER' as JapaneseTab,  label: 'Vocabulary', icon: BookOpen,   protected: true  },
    { id: 'KANJI_SRS' as JapaneseTab,       label: 'Flashcards', icon: Layers,     protected: false },
    { id: 'ALPHABET_GRID' as JapaneseTab,   label: 'Listening',  icon: Headphones, protected: true  },
    { id: 'TIMED_EXAM' as JapaneseTab,      label: 'Mock Test',  icon: Clock,      protected: true  },
    { id: 'RADICALS' as JapaneseTab,        label: 'Radicals',   icon: Layers,     protected: false },
    { id: 'HEATMAP' as JapaneseTab,         label: 'Streak',     icon: Calendar,   protected: false },
    { id: 'CERTIFICATE' as JapaneseTab,     label: 'Certificate',icon: ShieldCheck,protected: false },
  ];

  const koreanTabs = [
    { id: 'KOREAN_VOCAB' as KoreanTab,      label: 'Vocabulary', icon: Globe,      protected: true  },
    { id: 'KOREAN_FLASHCARD' as KoreanTab,  label: 'Flashcards', icon: Layers,     protected: false },
    { id: 'ALPHABET_GRID' as KoreanTab,     label: 'Listening',  icon: Headphones, protected: true  },
    { id: 'TIMED_EXAM' as KoreanTab,        label: 'Mock Test',  icon: Clock,      protected: true  },
    { id: 'HEATMAP' as KoreanTab,           label: 'Streak',     icon: Calendar,   protected: false },
    { id: 'CERTIFICATE' as KoreanTab,       label: 'Certificate',icon: ShieldCheck,protected: false },
  ];

  /* ─── Auth Gate Wall ────────────────────────────────────── */
  const AuthGateWall = ({
    tabLabel,
    onSignIn,
  }: {
    tabLabel: string;
    onSignIn: () => void;
  }) => (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-lg text-center space-y-6">
        {/* Glowing icon ring */}
        <div className="relative mx-auto w-28 h-28 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-indigo-600/20 blur-2xl animate-pulse" />
          <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-700 via-purple-700 to-pink-700 flex items-center justify-center shadow-2xl border border-indigo-500/40">
            <Lock className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Sign in to access <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">{tabLabel}</span>
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
            Create a free account or sign in to unlock the full curriculum — vocabulary, listening tracks, and mock exam engine.
          </p>
        </div>

        {/* Perks list */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          {[
            { icon: BookOpen,  color: 'text-rose-400',    bg: 'bg-rose-500/10 border-rose-500/20',    text: 'Full vocabulary with Nepali meanings' },
            { icon: Headphones,color: 'text-sky-400',     bg: 'bg-sky-500/10 border-sky-500/20',      text: 'Audio listening tracks per lesson'   },
            { icon: Clock,     color: 'text-amber-400',   bg: 'bg-amber-500/10 border-amber-500/20',  text: 'JLPT / EPS-TOPIK mock exams'         },
          ].map(({ icon: Icon, color, bg, text }) => (
            <div key={text} className={`${bg} border rounded-2xl p-3 flex items-start gap-2.5`}>
              <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${color}`} />
              <span className="text-xs text-slate-300 font-medium leading-snug">{text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => { setAuthMode('SIGNUP'); setShowAuthModal(true); }}
            className="flex-1 sm:flex-none px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-sm shadow-2xl flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5"
          >
            <UserPlus className="w-4 h-4" />
            Create Free Account
            <Zap className="w-3.5 h-3.5 text-yellow-300" />
          </button>
          <button
            onClick={() => { setAuthMode('LOGIN'); setShowAuthModal(true); }}
            className="flex-1 sm:flex-none px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-black text-sm flex items-center justify-center gap-2.5 transition-all"
          >
            <LogIn className="w-4 h-4 text-indigo-400" />
            Sign In
          </button>
        </div>

        <p className="text-[11px] text-slate-500">
          Flashcards, Radicals & Streak Heatmap are always free — no account needed.
        </p>
      </div>
    </div>
  );

  /* ─── Shared Header ─────────────────────────────────────── */
  const SharedHeader = () => (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 px-3 sm:px-6 py-2.5 sm:py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
        {/* Logo */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          <button onClick={() => setViewMode('LANDING')} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-black text-xl shadow-glow group-hover:scale-105 transition-transform">
              語
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-extrabold text-white tracking-tight">LanguageGuru</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30 hidden sm:inline">SM-2 SRS</span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Japanese (JLPT N5–N1) & Korean (EPS-TOPIK 1-60)</p>
            </div>
          </button>

          {/* Back to landing (mobile) */}
          {viewMode !== 'LANDING' && (
            <button onClick={() => setViewMode('LANDING')} className="sm:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold transition-all">
              <ArrowLeft className="w-3.5 h-3.5" /> Home
            </button>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-between sm:justify-end">
          {/* Back to landing (desktop) */}
          {viewMode !== 'LANDING' && (
            <button onClick={() => setViewMode('LANDING')} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Hub
            </button>
          )}

          {/* Network badge */}
          <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border ${isOnline ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-400' : 'bg-amber-950/60 border-amber-800/80 text-amber-300'}`}>
            {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            <span>{isOnline ? 'Online' : 'Offline'}</span>
            {unsyncedItems > 0 && <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px]">{unsyncedItems}</span>}
          </div>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 text-xs font-extrabold">
                <Flame className="w-4 h-4 animate-bounce" /><span>{user.streak}D</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-xl text-xs">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-bold text-slate-200 hidden sm:inline">{user.name}</span>
                <button onClick={handleLogout} className="ml-1 p-0.5 hover:bg-slate-800 rounded text-slate-400 hover:text-rose-400 transition-colors" title="Log Out">
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button onClick={() => { setAuthMode('LOGIN'); setShowAuthModal(true); }} className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-extrabold text-xs flex items-center gap-1.5 transition-all">
                <LogIn className="w-3.5 h-3.5 text-indigo-400" /> Sign In
              </button>
              <button onClick={() => { setAuthMode('SIGNUP'); setShowAuthModal(true); }} className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-glow transition-all">
                <UserPlus className="w-3.5 h-3.5" /> Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );

  /* ─── Auth Modal ─────────────────────────────────────────── */
  const AuthModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-glow">
              {authMode === 'LOGIN' ? <LogIn className="w-4 h-4 text-white" /> : <UserPlus className="w-4 h-4 text-white" />}
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">LanguageGuru</div>
              <div className="text-sm font-black text-white">
                {authMode === 'LOGIN' ? 'Welcome back!' : 'Start for free'}
              </div>
            </div>
          </div>
          <button onClick={() => { setShowAuthModal(false); setPendingJpTab(null); setPendingKrTab(null); }} className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Unlock message if pending tab */}
        {(pendingJpTab || pendingKrTab) && (
          <div className="flex items-start gap-3 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-3.5">
            <Unlock className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-indigo-200 leading-snug">
              <span className="font-black text-white">
                {pendingJpTab === 'VOCAB_EXPLORER' || pendingKrTab === 'KOREAN_VOCAB' ? '📚 Vocabulary' :
                 pendingJpTab === 'ALPHABET_GRID' || pendingKrTab === 'ALPHABET_GRID' ? '🎧 Listening Tracks' :
                 pendingJpTab === 'TIMED_EXAM' || pendingKrTab === 'TIMED_EXAM' ? '⏱ Mock Exam Engine' : 'This feature'}
              </span>{' '}
              requires an account. Sign in to unlock instantly — it&apos;s completely free!
            </div>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {authMode === 'SIGNUP' && (
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Your Name</label>
              <input type="text" placeholder="e.g. Dr. Kafle" value={authName} onChange={e => setAuthName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all" />
            </div>
          )}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Email Address</label>
            <input type="email" required placeholder="name@example.com" value={authEmail} onChange={e => setAuthEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all" />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Password</label>
            <input type="password" required placeholder="••••••••" value={authPassword} onChange={e => setAuthPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all" />
          </div>
          <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-glow transition-all flex items-center justify-center gap-2">
            {authMode === 'LOGIN' ? <><LogIn className="w-4 h-4" /> Sign In & Load Progress</> : <><Zap className="w-4 h-4 text-yellow-300" /> Create Account & Start Learning</>}
          </button>
        </form>
        <p className="text-center text-xs text-slate-400">
          {authMode === 'LOGIN' ? (<>Don&apos;t have an account? <button onClick={() => setAuthMode('SIGNUP')} className="text-indigo-400 hover:underline font-bold">Sign Up Free</button></>) :
            (<>Already have an account? <button onClick={() => setAuthMode('LOGIN')} className="text-indigo-400 hover:underline font-bold">Sign In</button></>)}
        </p>
      </div>
    </div>
  );

  /* ─── Landing Page ───────────────────────────────────────── */
  if (viewMode === 'LANDING') {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
        <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="fixed top-1/2 left-0 w-[400px] h-[400px] bg-rose-600/5 rounded-full blur-[120px] pointer-events-none" />

        <SharedHeader />

        <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-14 space-y-16 sm:space-y-20">
          {/* ── Hero ── */}
          <section className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Full-Stack Language Platform • Nepali & English Explanations</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Master{' '}
              <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Japanese</span>
              {' '}&{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Korean</span>
              <br className="hidden sm:block" /> with SRS & AI-Powered Exam Engines
            </h1>

            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Complete handbook for <strong className="text-slate-200">Minna no Nihongo (Lessons 1–75)</strong> &{' '}
              <strong className="text-slate-200">EPS-TOPIK (Lessons 1–60)</strong>. Interactive Kanji Inspector, Kana & Hangul audio matrices, timed exam simulators, vocab short notes, and offline IndexedDB support.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setViewMode('JAPANESE')}
                className="w-full sm:w-auto group px-8 py-4 rounded-2xl bg-gradient-to-br from-rose-600 to-pink-700 hover:from-rose-500 hover:to-pink-600 text-white font-black text-sm shadow-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 hover:shadow-rose-500/20"
              >
                <span className="text-2xl">🇯🇵</span>
                <span>Japanese Platform (JLPT N5–N1)</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => setViewMode('KOREAN')}
                className="w-full sm:w-auto group px-8 py-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-sm shadow-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 hover:shadow-emerald-500/20"
              >
                <span className="text-2xl">🇰🇷</span>
                <span>Korean Platform (EPS-TOPIK 1-60)</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </section>

          {/* ── Language Gateway Cards ── */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Japanese Card */}
            <div className="relative bg-slate-900/90 border border-slate-800 hover:border-rose-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 transition-all duration-300 group overflow-hidden cursor-pointer" onClick={() => setViewMode('JAPANESE')}>
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl group-hover:bg-rose-500/20 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-rose-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-3xl" />

              <div className="flex items-center justify-between relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-rose-950/80 border border-rose-500/30 flex items-center justify-center text-4xl shadow-inner">🇯🇵</div>
                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-extrabold border border-rose-500/30">JLPT N5 → N2</span>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white group-hover:text-rose-300 transition-colors">Japanese Language Platform</h3>
                <p className="text-xs text-slate-400 mt-1 font-jp">日本語 Minna no Nihongo Curriculum (Lessons 1–75)</p>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80 relative z-10">
                {[
                  'Vocab 4-Column Short Note Sheets (Blank Kanji Support)',
                  'Kanji Radical Breakdown & Mnemonic SRS Inspector',
                  'Interactive Hiragana & Katakana Pronunciation Matrix',
                  'Timed JLPT N5–N2 Mock Exam Engine & QR Certificates',
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button onClick={() => setViewMode('JAPANESE')} className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-glow transition-all flex items-center justify-center gap-2 relative z-10">
                Launch Japanese Curriculum <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Korean Card */}
            <div className="relative bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 transition-all duration-300 group overflow-hidden cursor-pointer" onClick={() => setViewMode('KOREAN')}>
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-3xl" />

              <div className="flex items-center justify-between relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-4xl shadow-inner">🇰🇷</div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/30">EPS-TOPIK 60 Lessons</span>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">Korean Language Platform</h3>
                <p className="text-xs text-slate-400 mt-1 font-kr">한국어 EPS-TOPIK & TOPIK Level 2–4 Curriculum</p>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80 relative z-10">
                {[
                  '60 Complete EPS-TOPIK Lessons with Nepali & English notes',
                  'Hangul Matrix: Consonants, Vowels & Double Jamo Audio',
                  'SRS Flashcard System & 4-Column Vocab Short Note Sheets',
                  'EPS & TOPIK Exam Simulator with Auto Grading',
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button onClick={() => setViewMode('KOREAN')} className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-glow transition-all flex items-center justify-center gap-2 relative z-10">
                Launch Korean Curriculum <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </section>

          {/* ── Progress Dashboard & Heatmap ── */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Personal Study Dashboard & Progress Heatmap</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {user ? `Welcome back, ${user.name}! 👋` : 'Track Your Learning Journey'}
                </h2>
              </div>
              {!user && (
                <button onClick={() => { setAuthMode('SIGNUP'); setShowAuthModal(true); }} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold flex items-center gap-2 shadow-glow transition-all">
                  <UserPlus className="w-4 h-4" /> Sign Up to Track Progress
                </button>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {[
                { label: 'Active Streak', value: user ? `${user.streak} Days` : '14 Days', icon: Flame, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
                { label: 'Mastered Vocab', value: '420 Words', icon: BookOpen, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
                { label: 'Exam Pass Rate', value: '92%', icon: Award, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
                { label: 'Lessons Done', value: '56 / 75', icon: CheckCircle2, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
              ].map(({ label, value, icon: Icon, color, bg }) => (
                <div key={label} className={`${bg} border rounded-2xl p-4 space-y-1.5`}>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
                  <div className={`text-xl sm:text-2xl font-black ${color} flex items-center gap-2`}>
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Embedded Heatmap */}
            <StreakHeatmap />
          </section>
        </div>

        <footer className="bg-slate-950 border-t border-slate-800/80 py-4 sm:py-5 px-4 sm:px-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-3">
            <span>LanguageGuru • Japanese JLPT N5–N1 & Korean EPS-TOPIK (Lessons 1-60) / TOPIK 2–4</span>
            <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-slate-400 flex-wrap justify-center">
              <span>SM-2 SRS</span><span>•</span><span>Offline IndexedDB</span><span>•</span><span>QR Certificate Verification</span>
            </div>
          </div>
        </footer>

        {showAuthModal && <AuthModal />}
      </main>
    );
  }

  /* ─── Isolated Platform (Japanese or Korean) ─────────────── */
  const isJapanese = viewMode === 'JAPANESE';
  const tabs = isJapanese ? japaneseTabs : koreanTabs;
  const activeTab = isJapanese ? jpTab : krTab;
  const accentActive = isJapanese ? 'bg-rose-600 border-rose-400' : 'bg-emerald-600 border-emerald-400';

  // Determine if current tab is gated
  const isCurrentTabGated = !user && (
    (isJapanese && PROTECTED_JP_TABS.includes(jpTab)) ||
    (!isJapanese && PROTECTED_KR_TABS.includes(krTab))
  );

  const currentTabLabel = tabs.find(t => t.id === activeTab)?.label || 'this section';

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative">
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <SharedHeader />

      {/* Sub-Tab Navigation */}
      <div className="sticky top-[85px] sm:top-[68px] z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/60 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto py-2.5 flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none" style={{ scrollbarWidth: 'none' }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isLocked = !user && tab.protected;
            return (
              <button
                key={tab.id}
                onClick={() => isJapanese ? handleJpTabClick(tab.id as JapaneseTab) : handleKrTabClick(tab.id as KoreanTab)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-1.5 sm:gap-2 border flex-shrink-0 ${
                  isActive && !isCurrentTabGated
                    ? `${accentActive} text-white shadow-glow`
                    : isLocked
                    ? 'bg-slate-900/60 border-slate-800 text-slate-500 hover:text-slate-300 hover:bg-slate-800/60'
                    : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-white'
                }`}
                title={isLocked ? `Sign in to access ${tab.label}` : tab.label}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{tab.label}</span>
                {isLocked && <Lock className="w-2.5 h-2.5 text-slate-500 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 py-4 sm:py-8">

        {/* Auth Gate Wall — shown when unauthenticated user hits a protected tab */}
        {isCurrentTabGated ? (
          <AuthGateWall
            tabLabel={currentTabLabel}
            onSignIn={() => { setAuthMode('LOGIN'); setShowAuthModal(true); }}
          />
        ) : (
          <>
            {/* Japanese panels */}
            {isJapanese && jpTab === 'VOCAB_EXPLORER' && <VocabularyExplorer />}
            {isJapanese && jpTab === 'KANJI_SRS' && <KanjiCard />}
            {isJapanese && jpTab === 'RADICALS' && <RadicalBreakdown />}

            {/* Korean panels */}
            {!isJapanese && krTab === 'KOREAN_VOCAB' && <KoreanVocabularyExplorer />}
            {!isJapanese && krTab === 'KOREAN_FLASHCARD' && <KoreanFlashcardCard />}

            {/* Shared panels */}
            {activeTab === 'ALPHABET_GRID' && <AlphabetGrid activeLanguage={isJapanese ? 'JAPANESE' : 'KOREAN'} />}
            {activeTab === 'TIMED_EXAM' && <TimedExamEngine activeLanguage={isJapanese ? 'JAPANESE' : 'KOREAN'} />}
            {activeTab === 'HEATMAP' && <StreakHeatmap />}
            {activeTab === 'CERTIFICATE' && <CertificateVerifier />}
          </>
        )}
      </div>

      <footer className="bg-slate-950 border-t border-slate-800/80 py-4 sm:py-5 px-4 sm:px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-3">
          <span>LanguageGuru • Japanese JLPT N5–N1 & Korean EPS-TOPIK (Lessons 1-60) / TOPIK 2–4</span>
          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-slate-400 flex-wrap justify-center">
            <span>SM-2 SRS</span><span>•</span><span>Offline IndexedDB</span><span>•</span><span>QR Certificate Verification</span>
          </div>
        </div>
      </footer>

      {showAuthModal && <AuthModal />}
    </main>
  );
}
