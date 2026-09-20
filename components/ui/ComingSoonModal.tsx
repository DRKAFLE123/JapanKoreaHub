'use client';

import React from 'react';
import { Sparkles, X, Bell, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  description?: string;
  phase?: string;
}

export default function ComingSoonModal({
  isOpen,
  onClose,
  featureName,
  description,
  phase = 'Phase 6: Advanced Capabilities',
}: ComingSoonModalProps) {
  const [subscribed, setSubscribed] = React.useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] overflow-y-auto flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-7 space-y-5 my-auto mx-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <Sparkles className="w-6 h-6 text-indigo-600 animate-pulse" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-black uppercase tracking-wider">
              {phase}
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1">Coming Soon · चाँडै आउँदैछ</h3>
          </div>
        </div>

        {/* Feature Details */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <h4 className="font-extrabold text-slate-900 text-sm">{featureName}</h4>
          <p className="text-slate-600 leading-relaxed">
            {description ||
              'This advanced feature is currently under active engineering and quality verification. We are finalizing official datasets and testing infrastructure to ensure 100% accuracy.'}
          </p>
        </div>

        {/* Development Status */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="flex items-center gap-1.5 font-bold">
              <Clock className="w-3.5 h-3.5 text-indigo-600" /> Development Progress:
            </span>
            <span className="font-extrabold text-indigo-600">85% In Progress</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-2 rounded-full w-[85%]"></div>
          </div>
        </div>

        {/* Notification Subscription or Action */}
        <div className="pt-2">
          {subscribed ? (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>You will be notified as soon as this feature launches!</span>
            </div>
          ) : (
            <button
              onClick={() => setSubscribed(true)}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span>Notify Me Upon Launch (सूचना पाउनुहोस्)</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full mt-2 py-2.5 rounded-xl bg-transparent hover:bg-slate-100 text-slate-500 text-xs font-bold transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
