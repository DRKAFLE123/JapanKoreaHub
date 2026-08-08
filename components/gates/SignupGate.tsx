'use client';
import React, { useState } from 'react';
import { Sparkles, Lock, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import AuthSheet from '@/components/auth/AuthSheet';

interface SignupGateProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: string;
}

export default function SignupGate({ isOpen, onClose, reason }: SignupGateProps) {
  const [authSheetOpen, setAuthSheetOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
        <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-5 animate-slide-up">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Free Account Required</span>
            <h2 className="text-xl font-bold text-gray-900 mt-1">Unlock Unlimited Learning</h2>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              {reason || 'Create a free account to track your study streak, save flashcards, and take unlimited mock tests.'}
            </p>
          </div>

          <div className="space-y-2 py-1">
            {[
              '100% Free curriculum (Minna no Nihongo & EPS-TOPIK)',
              'Spaced Repetition System (SRS) card reviews',
              'Instant progress & streak tracking',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setAuthSheetOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-colors"
          >
            Create Free Account
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-center text-xs text-gray-400">
            Already registered?{' '}
            <button
              onClick={() => setAuthSheetOpen(true)}
              className="text-gray-900 font-semibold hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>

      {authSheetOpen && (
        <AuthSheet
          initialMode="register"
          onClose={() => {
            setAuthSheetOpen(false);
            onClose();
          }}
        />
      )}
    </>
  );
}
