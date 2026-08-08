'use client';
import React from 'react';
import Link from 'next/link';
import { BookOpen, GraduationCap, Briefcase, Shield } from 'lucide-react';

const INTENT_ITEMS = [
  {
    href: '/learn', label: 'Learn', Icon: BookOpen,
    desc: 'Japanese and Korean lessons',
    color: 'text-indigo-600', bg: 'bg-indigo-50',
  },
  {
    href: '/study', label: 'Study', Icon: GraduationCap,
    desc: 'Universities, scholarships',
    color: 'text-emerald-600', bg: 'bg-emerald-50',
  },
  {
    href: '/work', label: 'Work', Icon: Briefcase,
    desc: 'EPS, SSW, job listings',
    color: 'text-amber-600', bg: 'bg-amber-50',
  },
  {
    href: '/visa', label: 'Visa', Icon: Shield,
    desc: 'Requirements, checklists',
    color: 'text-rose-600', bg: 'bg-rose-50',
  },
] as const;

export default function IntentGrid() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {INTENT_ITEMS.map(({ href, label, Icon, desc, color, bg }) => (
        <Link
          key={href}
          href={href}
          className="flex flex-col p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-200 transition-all active:scale-[0.98]"
        >
          <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
            <Icon className={`w-5 h-5 ${color}`} strokeWidth={1.8} />
          </div>
          <span className="font-semibold text-sm text-gray-900">{label}</span>
          <span className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</span>
        </Link>
      ))}
    </div>
  );
}
