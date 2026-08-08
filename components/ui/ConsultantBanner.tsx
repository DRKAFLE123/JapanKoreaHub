'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ConsultantBanner() {
  return (
    <Link
      href="/consultancy"
      className="flex items-center justify-between px-4 py-4 bg-blue-50 border border-blue-100 rounded-2xl hover:bg-blue-100 transition-colors active:scale-[0.99]"
    >
      <div>
        <p className="font-semibold text-sm text-blue-900">🤝 Talk to a consultant</p>
        <p className="text-xs text-blue-600 mt-0.5">Visa and application help</p>
      </div>
      <ArrowRight className="w-5 h-5 text-blue-500 flex-shrink-0" />
    </Link>
  );
}
