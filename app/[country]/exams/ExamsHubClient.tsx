'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, ChevronRight, Award } from 'lucide-react';
import MobileNavbar from '@/components/layout/MobileNavbar';
import BottomTabBar from '@/components/layout/BottomTabBar';

type Country = 'japan' | 'korea';
interface ExamDef { exam: string; title: string; badge: string; time: string; passRate: string; }

const LABELS: Record<Country, { flag: string; name: string; chipClass: string; accentClass: string; bgClass: string }> = {
  japan: { flag: '🇯🇵', name: 'Japan', chipClass: 'bg-pink-100 text-pink-700 border-pink-200', accentClass: 'text-red-600', bgClass: 'bg-red-50' },
  korea: { flag: '🇰🇷', name: 'Korea', chipClass: 'bg-blue-100 text-blue-700 border-blue-200', accentClass: 'text-blue-600', bgClass: 'bg-blue-50' },
};

export default function ExamsHubClient({ country, exams }: { country: Country; exams: ExamDef[] }) {
  const { flag, name, chipClass, accentClass, bgClass } = LABELS[country];

  return (
    <div className="min-h-screen bg-white">
      <MobileNavbar user={null} lang="en" onLangToggle={() => {}} onSearchOpen={() => {}} />

      <main className="pt-14 pb-24">
        {/* Breadcrumb */}
        <div className="px-4 pt-4 pb-2">
          <Link href={`/${country}`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            {flag} {name}
          </Link>
        </div>

        {/* Header */}
        <section className="px-4 py-4">
          {/* NOTE: No country filter chip here — country is fixed from URL */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${chipClass} text-sm font-medium mb-3`}>
            {flag} {name}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{name} Exams</h1>
          <p className="text-sm text-gray-500 mt-1">Mock tests · Syllabus guides · Pass strategies</p>
        </section>

        {/* Exam list */}
        <section className="px-4 pb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">available exams</p>
          <div className="space-y-3">
            {exams.map(({ exam, title, badge, time, passRate }) => (
              <Link
                key={exam}
                href={`/${country}/exams/${exam}`}
                className="block p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-200 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-base text-gray-900">{title}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${bgClass} ${accentClass}`}>
                        {badge}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-3 h-3" /> Pass rate {passRate}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                </div>

                {/* CTA row */}
                <div className="flex gap-2 mt-3">
                  <span className="text-xs px-3 py-1.5 rounded-lg bg-gray-900 text-white font-medium">
                    Start mock test
                  </span>
                  <span className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 font-medium">
                    View syllabus
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Certificate callout */}
        <section className="px-4 pb-6">
          <div className="p-4 bg-purple-50 border border-purple-100 rounded-2xl">
            <p className="font-semibold text-sm text-purple-900 mb-1">🏅 Earn a certificate</p>
            <p className="text-xs text-purple-700 leading-relaxed">
              Pass any mock test and receive a QR-verified certificate from JapanKoreaHub Examination Board.
            </p>
          </div>
        </section>
      </main>

      <BottomTabBar />
    </div>
  );
}
