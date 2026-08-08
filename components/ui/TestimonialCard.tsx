'use client';
import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  outcome: string;
  country: 'JAPAN' | 'KOREA';
  quote: string;
  photoEmoji?: string;
}

export default function TestimonialCard({ name, outcome, country, quote, photoEmoji = '🎓' }: TestimonialCardProps) {
  return (
    <div className="card p-5 space-y-3 border-gray-100 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">
          {photoEmoji}
        </div>
        <div>
          <h4 className="font-bold text-sm text-gray-900">{name}</h4>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            {outcome}
          </span>
        </div>
      </div>
      <p className="text-xs text-gray-600 leading-relaxed italic">"{quote}"</p>
      <div className="flex items-center gap-1 text-amber-400">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
        ))}
      </div>
    </div>
  );
}
