'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, Flame, BookOpen, Award, CheckCircle2, 
  Settings, LogOut, Globe, Sparkles, Target, 
  Clock, Bookmark, ChevronRight, ShieldCheck, Edit3
} from 'lucide-react';
import MobileNavbar from '@/components/layout/MobileNavbar';
import AuthSheet from '@/components/auth/AuthSheet';

import { useTheme } from '@/lib/context/ThemeContext';

export default function ProfilePage() {
  const { isDark, toggleTheme } = useTheme();
  const [user, setUser] = useState({
    name: 'Damodar',
    email: 'damodar@example.com',
    countryFocus: 'japan' as 'japan' | 'korea',
    targetLevel: 'JLPT N5',
    dailyGoalMinutes: 30,
    examDate: '2026-12-06',
    streakDays: 7,
    vocabMastered: 480,
    kanjiMastered: 160,
    testsPassed: 5,
    joinedDate: 'August 2026',
  });

  const [authSheetOpen, setAuthSheetOpen] = useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);

  useEffect(() => {
    // 1. Load from localStorage fallback
    const savedUser = localStorage.getItem('jkh_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed.name) {
          setUser(prev => ({
            ...prev,
            name: parsed.name,
            email: parsed.email || prev.email,
          }));
        }
      } catch {}
    }

    // 2. Fetch live logged in user session
    fetch('/api/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d?.user?.name) {
          setUser(prev => ({
            ...prev,
            name: d.user.name,
            email: d.user.email || prev.email,
            streakDays: d.user.streakDays || prev.streakDays,
          }));
          localStorage.setItem('jkh_user', JSON.stringify({ name: d.user.name, email: d.user.email }));
        }
      })
      .catch(() => {});
  }, []);

  const handleSignOut = async () => {
    if (confirm('Are you sure you want to sign out?')) {
      localStorage.removeItem('jkh_user');
      await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      <main className="max-w-4xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6 space-y-6">

        {/* 👤 HERO PROFILE CARD */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-red-500/10 via-rose-500/5 to-transparent rounded-bl-full pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Avatar Initial */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-red-600 to-rose-700 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-md border-2 border-white shrink-0">
                {user.name.charAt(0)}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900">{user.name}</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-black">
                    PRO STUDENT
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">{user.email}</p>
                <div className="flex items-center gap-2 pt-1 text-xs text-slate-600 font-bold flex-wrap">
                  <span className="flex items-center gap-1">
                    {user.countryFocus === 'japan' ? '🇯🇵 Japan Focus' : '🇰🇷 Korea Focus'}
                  </span>
                  <span>•</span>
                  <span>Joined {user.joinedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🔥 STATS METRICS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-amber-500">
              <Flame className="w-5 h-5 fill-amber-500" />
              <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                ACTIVE
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{user.streakDays} Days</div>
            <p className="text-xs text-slate-500 font-medium">Daily Study Streak</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-blue-600">
              <BookOpen className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                VOCAB
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{user.vocabMastered}</div>
            <p className="text-xs text-slate-500 font-medium">Words Learned</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-rose-600">
              <Sparkles className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                KANJI
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{user.kanjiMastered}</div>
            <p className="text-xs text-slate-500 font-medium">Kanji Mastered</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-emerald-600">
              <Award className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                PASSED
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{user.testsPassed}</div>
            <p className="text-xs text-slate-500 font-medium">Mock Exams Passed</p>
          </div>
        </div>

        {/* 🎯 TARGET STUDY GOAL & EXAM TRACKER */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-red-50 text-red-600 border border-red-200">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900">Target Study Goal</h2>
                <p className="text-xs text-slate-500 font-medium">Personalized curriculum roadmap &amp; target exam</p>
              </div>
            </div>

            <button
              onClick={() => setIsEditingGoal(!isEditingGoal)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditingGoal ? 'Done' : 'Edit Goal'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
            {/* Target Level */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Target Level</span>
              {isEditingGoal ? (
                <select
                  value={user.targetLevel}
                  onChange={(e) => setUser({ ...user, targetLevel: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 font-bold text-slate-900 focus:outline-none focus:border-red-500"
                >
                  <option value="JLPT N5">JLPT N5</option>
                  <option value="JLPT N4">JLPT N4</option>
                  <option value="JLPT N3">JLPT N3</option>
                  <option value="JFT-Basic">JFT-Basic</option>
                  <option value="EPS-TOPIK">EPS-TOPIK</option>
                  <option value="TOPIK I">TOPIK I</option>
                </select>
              ) : (
                <div className="text-base font-black text-slate-900 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                  <span>{user.targetLevel}</span>
                </div>
              )}
            </div>

            {/* Daily Goal */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Daily Study Goal</span>
              {isEditingGoal ? (
                <select
                  value={user.dailyGoalMinutes}
                  onChange={(e) => setUser({ ...user, dailyGoalMinutes: Number(e.target.value) })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 font-bold text-slate-900 focus:outline-none focus:border-red-500"
                >
                  <option value={15}>15 Mins / Day</option>
                  <option value={30}>30 Mins / Day</option>
                  <option value={60}>60 Mins / Day</option>
                </select>
              ) : (
                <div className="text-base font-black text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>{user.dailyGoalMinutes} Mins / Day</span>
                </div>
              )}
            </div>

            {/* Target Exam Date */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Target Exam Date</span>
              {isEditingGoal ? (
                <input
                  type="date"
                  value={user.examDate}
                  onChange={(e) => setUser({ ...user, examDate: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 font-bold text-slate-900 focus:outline-none focus:border-red-500"
                />
              ) : (
                <div className="text-base font-black text-slate-900 flex items-center gap-1.5">
                  <span>📅</span>
                  <span>{user.examDate}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 📚 QUICK ACCESS & SAVED ITEMS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/japan/learn/basics"
            className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-red-400 transition-all flex items-center justify-between group"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-red-50 text-red-600 border border-red-200 font-black text-xs">
                  🇯🇵 JLPT
                </span>
                <span className="text-xs font-bold text-slate-500">Continue Learning</span>
              </div>
              <h3 className="font-black text-base text-slate-900 group-hover:text-red-600 transition-colors">
                JLPT N5 Vocabulary &amp; Grammar
              </h3>
              <p className="text-xs text-slate-500 font-medium">Lesson 12 • Expressions &amp; Kanji</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/korea/learn/basics"
            className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 transition-all flex items-center justify-between group"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 font-black text-xs">
                  🇰🇷 EPS
                </span>
                <span className="text-xs font-bold text-slate-500">Continue Learning</span>
              </div>
              <h3 className="font-black text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                EPS-TOPIK Workplace Safety
              </h3>
              <p className="text-xs text-slate-500 font-medium">Lesson 5 • Factory Signboards</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 🔒 ACCOUNT PREFERENCES */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
          <h2 className="text-base sm:text-lg font-black text-slate-900 border-b border-slate-200 pb-3">
            Account Preferences
          </h2>

          <div className="space-y-3 text-xs font-bold">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-slate-500" />
                <div>
                  <div className="text-slate-900">Interface Language</div>
                  <div className="text-[11px] text-slate-500 font-normal">Select English or Nepali explanations</div>
                </div>
              </div>
              <span className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-slate-800 font-black">
                English (🇬🇧)
              </span>
            </div>

            {/* Dark Mode Preference Setting */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <span className="text-base">🌙</span>
                <div>
                  <div className="text-slate-900">Dark Mode Theme</div>
                  <div className="text-[11px] text-slate-500 font-normal">Switch background theme across the app</div>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className={`px-4 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer border ${
                  isDark
                    ? 'bg-indigo-950 text-indigo-300 border-indigo-800'
                    : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {isDark ? '🌙 Dark ON' : '☀️ Light Mode'}
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <div>
                  <div className="text-slate-900">Privacy &amp; Data Protection</div>
                  <div className="text-[11px] text-slate-500 font-normal">Your study progress is safely synced online</div>
                </div>
              </div>
              <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-black">
                Protected
              </span>
            </div>

            {/* Dedicated Sign Out Section at Very Bottom */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200/80 pt-4 mt-2">
              <div className="flex items-center gap-3">
                <LogOut className="w-4 h-4 text-rose-600" />
                <div>
                  <div className="text-slate-900 font-black">Sign Out of Account</div>
                  <div className="text-[11px] text-slate-500 font-normal">Safely end your session on this device</div>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs transition-all cursor-pointer shadow-xs"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* Auth Sheet Modal */}
      {authSheetOpen && (
        <AuthSheet
          initialMode="signin"
          onClose={() => setAuthSheetOpen(false)}
        />
      )}
    </div>
  );
}
