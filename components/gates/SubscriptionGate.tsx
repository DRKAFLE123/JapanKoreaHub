'use client';
import React from 'react';
import { Crown, Check, X, Zap } from 'lucide-react';

interface SubscriptionGateProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscriptionGate({ isOpen, onClose }: SubscriptionGateProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl space-y-6 animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">JapanKoreaHub Pro</span>
            <h2 className="text-xl font-bold text-gray-900">Upgrade to Pro Membership</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 border-2 border-gray-100 rounded-2xl hover:border-gray-200 transition-all">
            <p className="text-xs font-bold text-gray-400 uppercase">Monthly Pass</p>
            <p className="text-2xl font-extrabold text-gray-900 mt-1">NPR 999 <span className="text-xs font-normal text-gray-500">/mo</span></p>
            <p className="text-xs text-gray-500 mt-1">Full access to mock tests & audio downloads</p>
          </div>
          <div className="p-4 border-2 border-indigo-600 bg-indigo-50/50 rounded-2xl relative">
            <span className="absolute -top-2.5 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white uppercase">Best Value</span>
            <p className="text-xs font-bold text-indigo-600 uppercase">Annual Pass</p>
            <p className="text-2xl font-extrabold text-gray-900 mt-1">NPR 4,999 <span className="text-xs font-normal text-gray-500">/yr</span></p>
            <p className="text-xs text-gray-500 mt-1">Includes 1 free visa interview prep session</p>
          </div>
        </div>

        <div className="space-y-2 text-xs text-gray-700">
          {[
            'Unlimited JLPT N5–N2 & EPS-TOPIK mock exam attempts',
            'Official QR-verified certificates',
            'Full CD listening audio library access',
            'Priority 1-on-1 consultancy booking',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 text-white font-bold text-sm hover:opacity-95 transition-opacity shadow-md">
          <Zap className="w-4 h-4 fill-white" />
          Subscribe to Pro
        </button>
      </div>
    </div>
  );
}
