import React, { useState, useEffect } from 'react';
import { X, Calendar, Target, CheckCircle2, Clock, Sparkles, Flame, RefreshCw } from 'lucide-react';

interface LevelStudyPlanModalProps {
  level: 'BASICS' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'JFT';
  onClose: () => void;
}

export interface SavedPlan {
  level: string;
  durationDays: number;
  startDate: string;
  targetExamDate: string;
  dailyLessons: number;
  dailyVocab: number;
  dailyGrammar: number;
  dailyTimeMinutes: number;
  completedDays: number;
}

export const LevelStudyPlanModal: React.FC<LevelStudyPlanModalProps> = ({ level, onClose }) => {
  const [durationDays, setDurationDays] = useState<number>(30);
  const [customDaysInput, setCustomDaysInput] = useState<string>('30');
  const [planSaved, setPlanSaved] = useState<boolean>(false);
  const [existingPlan, setExistingPlan] = useState<SavedPlan | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`language_guru_plan_${level}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setExistingPlan(parsed);
        setDurationDays(parsed.durationDays);
        setCustomDaysInput(String(parsed.durationDays));
      }
    } catch (e) {
      console.error(e);
    }
  }, [level]);

  // Quota Calculator based on level & duration
  const getQuotas = (days: number) => {
    const totalVocab = level === 'BASICS' ? 100 : level === 'N5' ? 800 : level === 'N4' ? 1500 : level === 'N3' ? 3000 : level === 'N2' ? 6000 : level === 'N1' ? 10000 : 1200;
    const totalGrammar = level === 'BASICS' ? 15 : level === 'N5' ? 40 : level === 'N4' ? 50 : level === 'N3' ? 60 : level === 'N2' ? 80 : level === 'N1' ? 100 : 45;
    const totalLessons = level === 'BASICS' ? 10 : level === 'N5' ? 25 : level === 'N4' ? 25 : level === 'N3' ? 12 : level === 'N2' ? 18 : level === 'N1' ? 20 : 20;

    const dailyVocab = Math.max(5, Math.ceil(totalVocab / days));
    const dailyGrammar = Math.max(1, Math.ceil(totalGrammar / days));
    const dailyLessons = (totalLessons / days).toFixed(1);
    const dailyTimeMinutes = Math.min(120, Math.max(15, Math.ceil((dailyVocab * 0.8) + (dailyGrammar * 3) + 10)));

    return { totalVocab, totalGrammar, totalLessons, dailyVocab, dailyGrammar, dailyLessons, dailyTimeMinutes };
  };

  const currentQuotas = getQuotas(durationDays);

  const handleSavePlan = () => {
    const today = new Date();
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + durationDays);

    const newPlan: SavedPlan = {
      level,
      durationDays,
      startDate: today.toISOString().split('T')[0],
      targetExamDate: targetDate.toISOString().split('T')[0],
      dailyLessons: parseFloat(currentQuotas.dailyLessons),
      dailyVocab: currentQuotas.dailyVocab,
      dailyGrammar: currentQuotas.dailyGrammar,
      dailyTimeMinutes: currentQuotas.dailyTimeMinutes,
      completedDays: 1,
    };

    try {
      localStorage.setItem(`language_guru_plan_${level}`, JSON.stringify(newPlan));
      setExistingPlan(newPlan);
      setPlanSaved(true);
      setTimeout(() => setPlanSaved(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 md:p-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-slate-950/30 text-2xl border border-white/10 shadow-md">
              🎯
            </span>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-white/80 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> AI Study Plan Generator
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white">Make Your {level} Study Plan</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-950/40 hover:bg-slate-950 text-white/80 hover:text-white border border-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 md:p-6 overflow-y-auto space-y-5">
          {/* Duration Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Select Study Duration / Days Until Exam
            </label>
            <div className="grid grid-cols-4 gap-2.5 mb-3">
              {[15, 30, 60, 90].map((days) => (
                <button
                  key={days}
                  onClick={() => {
                    setDurationDays(days);
                    setCustomDaysInput(String(days));
                  }}
                  className={`p-3 rounded-2xl border text-xs font-black transition-all flex flex-col items-center gap-1 ${
                    durationDays === days
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-glow'
                      : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  {days} Days
                </button>
              ))}
            </div>

            {/* Custom Days Input */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs">
              <span className="text-slate-400 font-bold whitespace-nowrap">Or custom target days:</span>
              <input
                type="number"
                min="7"
                max="365"
                value={customDaysInput}
                onChange={(e) => {
                  setCustomDaysInput(e.target.value);
                  const num = intVal(e.target.value);
                  if (num > 0) setDurationDays(num);
                }}
                className="w-20 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:outline-none focus:border-indigo-500"
              />
              <span className="text-slate-500">Days</span>
            </div>
          </div>

          {/* Generated Daily Targets Card */}
          <div className="p-5 rounded-3xl bg-slate-950/80 border border-indigo-500/30 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="text-xs font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" /> Daily Target Quota ({durationDays}-Day Plan)
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Level {level}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-slate-500 text-[10px] uppercase font-bold">Daily Vocab</div>
                <div className="text-lg font-black text-white mt-1">{currentQuotas.dailyVocab} Words</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Total: {currentQuotas.totalVocab}</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-slate-500 text-[10px] uppercase font-bold">Daily Grammar</div>
                <div className="text-lg font-black text-emerald-400 mt-1">{currentQuotas.dailyGrammar} Rules</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Total: {currentQuotas.totalGrammar}</div>
              </div>

              <div className="col-span-2 md:col-span-1 p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-slate-500 text-[10px] uppercase font-bold">Est. Study Time</div>
                <div className="text-lg font-black text-amber-400 mt-1">{currentQuotas.dailyTimeMinutes} Mins/Day</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Consistent Habits</div>
              </div>
            </div>

            {/* Timeline Milestones */}
            <div className="pt-2">
              <div className="text-[11px] font-bold text-slate-400 mb-2">Milestone Schedule:</div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>Day 01–{Math.ceil(durationDays * 0.4)}:</strong> Cover Core Vocabulary & Lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span><strong>Day {Math.ceil(durationDays * 0.4) + 1}–{Math.ceil(durationDays * 0.75)}:</strong> SRS Flashcards & Listening Matrix</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span><strong>Day {Math.ceil(durationDays * 0.75) + 1}–{durationDays}:</strong> Full Timed Mock Exams & Sectional Drills</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Notification */}
          {planSaved && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 justify-center animate-fade-in">
              <CheckCircle2 className="w-4 h-4" /> Study Plan saved successfully! Daily targets active.
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSavePlan}
            className="flex-1 max-w-xs px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-xs transition-all shadow-glow flex items-center justify-center gap-2"
          >
            <Target className="w-4 h-4" /> Save & Activate Plan
          </button>
        </div>
      </div>
    </div>
  );
};

function intVal(val: string): number {
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? 0 : parsed;
}
