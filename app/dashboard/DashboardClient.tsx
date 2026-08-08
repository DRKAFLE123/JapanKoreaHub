'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Flame, Layers, Clock, Award, CheckCircle2, BookOpen, ShieldCheck, ArrowRight, User } from 'lucide-react';
import MobileNavbar from '@/components/layout/MobileNavbar';
import BottomTabBar from '@/components/layout/BottomTabBar';

interface UserSession {
  name: string;
  email: string;
  streakDays?: number;
  role?: string;
}

export default function DashboardClient() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white pb-24">
      <MobileNavbar user={user} lang="en" onLangToggle={() => {}} onSearchOpen={() => {}} />

      <main className="pt-14 max-w-4xl mx-auto">
        {/* Header */}
        <section className="px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 font-extrabold text-lg flex items-center justify-center">
              {user ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Welcome back, {user ? user.name : 'Learner'}!
              </h1>
              <p className="text-xs text-gray-500">{user?.email || 'Logged in student dashboard'}</p>
            </div>
          </div>
        </section>

        {/* Streak & SRS Summary */}
        <section className="px-4 pb-6 grid grid-cols-2 gap-3">
          <div className="card p-4 border-amber-200 bg-amber-50/40">
            <div className="flex items-center gap-2 text-amber-700 mb-1">
              <Flame className="w-4 h-4 fill-amber-500" />
              <span className="text-xs font-extrabold uppercase">Study Streak</span>
            </div>
            <p className="text-2xl font-black text-gray-900">{user?.streakDays || 1} Days</p>
            <p className="text-[10px] text-amber-700 mt-1">Keep studying daily to maintain!</p>
          </div>

          <div className="card p-4 border-indigo-200 bg-indigo-50/40">
            <div className="flex items-center gap-2 text-indigo-700 mb-1">
              <Layers className="w-4 h-4" />
              <span className="text-xs font-extrabold uppercase">SRS Queue</span>
            </div>
            <p className="text-2xl font-black text-gray-900">12 Cards</p>
            <p className="text-[10px] text-indigo-700 mt-1">Ready for Spaced Review</p>
          </div>
        </section>

        {/* Continue Learning Quick Links */}
        <section className="px-4 pb-6 space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Quick Action Shortcuts</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/japan/learn/vocabulary"
              className="p-4 bg-white border border-gray-100 rounded-2xl flex items-center justify-between hover:border-gray-200 shadow-sm transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇯🇵</span>
                <div>
                  <p className="font-semibold text-sm text-gray-900">Minna no Nihongo Vocab</p>
                  <p className="text-xs text-gray-500">Lessons 1–75</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </Link>

            <Link
              href="/korea/learn/vocabulary"
              className="p-4 bg-white border border-gray-100 rounded-2xl flex items-center justify-between hover:border-gray-200 shadow-sm transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇰🇷</span>
                <div>
                  <p className="font-semibold text-sm text-gray-900">EPS-TOPIK Vocab</p>
                  <p className="text-xs text-gray-500">Lessons 1–60</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </Link>
          </div>
        </section>

        {/* Certificates Section */}
        <section className="px-4 pb-8">
          <div className="card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                Verified Certificates
              </h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Complete mock exams with 70%+ score to earn official QR-verified certificates.
            </p>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
              <ShieldCheck className="w-8 h-8 text-purple-400 mx-auto mb-1" />
              <p className="text-xs font-semibold text-gray-700">No certificates earned yet</p>
              <p className="text-[10px] text-gray-400 mt-0.5 mb-3">Take a mock exam to earn your first QR certificate</p>
              <Link
                href="/exams"
                className="inline-block px-4 py-2 bg-gray-900 text-white font-semibold text-xs rounded-lg"
              >
                Go to Exam Engine
              </Link>
            </div>
          </div>
        </section>
      </main>

      <BottomTabBar />
    </div>
  );
}
