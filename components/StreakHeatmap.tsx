'use me';
'use client';

import React from 'react';
import { Flame, Trophy, Calendar, Award, TrendingUp, ShieldCheck } from 'lucide-react';

export interface StreakHeatmapProps {
  currentStreak?: number;
  longestStreak?: number;
  totalPoints?: number;
  totalReviews?: number;
}

export const StreakHeatmap: React.FC<StreakHeatmapProps> = ({
  currentStreak = 14,
  longestStreak = 28,
  totalPoints = 1450,
  totalReviews = 680,
}) => {
  // Generate 52 weeks x 7 days mock data
  const days = Array.from({ length: 364 }, (_, i) => {
    // Generate organic activity levels (0: none, 1: light, 2: medium, 3: heavy, 4: intense)
    const seed = (i * 37 + 12) % 100;
    let level = 0;
    if (i > 364 - currentStreak) {
      level = Math.min(4, Math.floor((i % 4) + 1));
    } else if (seed > 65) {
      level = Math.floor((seed % 4) + 1);
    }
    return { dayIndex: i, level };
  });

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-emerald-950 border-emerald-800/60';
      case 2:
        return 'bg-emerald-800 border-emerald-700/80';
      case 3:
        return 'bg-emerald-600 border-emerald-500 shadow-sm';
      case 4:
        return 'bg-emerald-400 border-emerald-300 shadow-glow-kr';
      default:
        return 'bg-slate-950 border-slate-800/80';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl">
      {/* Stats Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-amber-950/40 via-slate-950 to-slate-950 border border-amber-500/30 rounded-2xl p-4 flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-md">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-2xl font-black text-amber-400">{currentStreak} Days</div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Current Streak</div>
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-md">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-purple-300">{longestStreak} Days</div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Longest Streak</div>
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shadow-md">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-indigo-300">{totalPoints}</div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total XP Points</div>
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-300">{totalReviews}</div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">SRS Reviews Done</div>
          </div>
        </div>
      </div>

      {/* GitHub-style Contribution Grid */}
      <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>365-Day Retention Activity Heatmap</span>
          </div>

          {/* Color Legend */}
          <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400">
            <span>Less</span>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-950 border border-slate-800" />
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-950 border border-emerald-800" />
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-800 border border-emerald-700" />
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600 border border-emerald-500" />
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 border border-emerald-300" />
            </div>
            <span>More</span>
          </div>
        </div>

        {/* Calendar Heatmap Grid */}
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-rows-7 grid-flow-col gap-1.5 min-w-[700px]">
            {days.map((day) => (
              <div
                key={day.dayIndex}
                className={`w-3 h-3 rounded-sm border transition-transform hover:scale-125 cursor-pointer ${getLevelColor(
                  day.level
                )}`}
                title={`Day ${day.dayIndex + 1}: Level ${day.level} activity`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
