'use client';
import React from 'react';
import Link from 'next/link';

const CONTINUE_ITEMS = [
  { country: 'JAPAN', label: 'JLPT N5', progress: 42, color: 'bg-red-500', textColor: 'text-red-600', href: '/japan/exams/jlpt-n5' },
  { country: 'KOREA', label: 'EPS-TOPIK', progress: 28, color: 'bg-blue-500', textColor: 'text-blue-600', href: '/korea/exams/eps-topik' },
];

export default function ContinueLearning() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {CONTINUE_ITEMS.map(({ country, label, progress, color, textColor, href }) => (
        <Link
          key={country}
          href={href}
          className="p-3 bg-white border border-gray-100 rounded-xl hover:border-gray-200 transition-colors"
        >
          <p className={`text-[10px] font-black tracking-widest ${textColor} mb-1`}>
            {country}
          </p>
          <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
          <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
            <div className={`h-full rounded-full ${color}`} style={{ width: `${progress}%` }} />
          </div>
        </Link>
      ))}
    </div>
  );
}
