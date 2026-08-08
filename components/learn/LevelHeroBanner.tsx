'use client';
import React from 'react';
import { Flame, Award, BookOpen, Clock, Target, Sparkles } from 'lucide-react';

interface LevelHeroBannerProps {
  title: string;
  subtitle: string;
  badge: string;
  emoji: string;
  country: 'japan' | 'korea';
  progress?: number;
  streakDays?: number;
  stats?: {
    lessons: string | number;
    vocab: string;
    targetScore: string;
  };
}

export default function LevelHeroBanner({
  title,
  subtitle,
  badge,
  emoji,
  country,
  progress = 42,
  streakDays = 7,
  stats = { lessons: '25', vocab: '800+', targetScore: '80 / 180 Pts' },
}: LevelHeroBannerProps) {
  const isJapan = country === 'japan';

  return (
    <div className={`relative overflow-hidden rounded-3xl p-6 border shadow-sm transition-all ${
      isJapan 
        ? 'bg-gradient-to-br from-red-50/90 via-white to-red-100/30 border-red-200' 
        : 'bg-gradient-to-br from-blue-50/90 via-white to-blue-100/30 border-blue-200'
    }`}>
      {/* Background Accent Blob */}
      <div className={`absolute -right-10 -bottom-10 w-48 h-48 rounded-full blur-3xl opacity-20 ${
        isJapan ? 'bg-red-400' : 'bg-blue-400'
      }`} />

      <div className="relative z-10 space-y-4">
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{emoji}</span>
            <span className={`text-xs font-black tracking-wider px-3 py-1 rounded-full uppercase border ${
              isJapan ? 'bg-red-100 text-red-800 border-red-200' : 'bg-blue-100 text-blue-800 border-blue-200'
            }`}>
              {badge}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-800 border border-amber-200 text-xs font-bold">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>{streakDays} Day Streak</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div>
          <h1 className="text-xl md:text-2xl font-black text-gray-900 leading-tight">
            {title}
          </h1>
          <p className="text-xs md:text-sm text-gray-600 mt-1 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-gray-700">Level Progress</span>
            <span className={isJapan ? 'text-red-600' : 'text-blue-600'}>{progress}% Completed</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isJapan ? 'bg-red-600' : 'bg-blue-600'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-center">
          <div className="p-2 bg-white/80 rounded-xl border border-gray-100">
            <p className="text-[10px] font-semibold text-gray-400 uppercase">Total Lessons</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">{stats.lessons}</p>
          </div>
          <div className="p-2 bg-white/80 rounded-xl border border-gray-100">
            <p className="text-[10px] font-semibold text-gray-400 uppercase">Vocab & Kanji</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">{stats.vocab}</p>
          </div>
          <div className="p-2 bg-white/80 rounded-xl border border-gray-100">
            <p className="text-[10px] font-semibold text-gray-400 uppercase">Passing Target</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">{stats.targetScore}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
