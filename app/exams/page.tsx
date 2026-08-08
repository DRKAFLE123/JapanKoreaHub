import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Award, CheckCircle2 } from 'lucide-react';
import CountryFilterChip from '@/components/ui/CountryFilterChip';

export const metadata: Metadata = {
  title: 'Exams & Certifications (JLPT vs TOPIK) — JapanKoreaHub',
  description: 'Compare JLPT (N5-N1), JFT-Basic, TOPIK I & II, and EPS-TOPIK mock exam engines and syllabus requirements.',
  alternates: { canonical: 'https://japankoreahub.com/exams' },
};

export default function CombinedExamsPage() {
  return (
    <main className="pt-14 md:pt-4 max-w-4xl mx-auto pb-24">
      {/* Header */}
      <section className="px-4 py-6">
        {/* Country filter chips shown on combined hub pages as canonical navigation */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold text-gray-400">Jump to country:</span>
          <CountryFilterChip country="japan" href="/japan/exams" />
          <CountryFilterChip country="korea" href="/korea/exams" />
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          Language Exams & Certifications
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Compare test formats, scoring systems, and launch timed mock exam simulators.
        </p>
      </section>

      {/* Country Exam Hub Cards */}
      <section className="px-4 pb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Japan Card */}
        <div className="card p-5 border-pink-200 bg-pink-50/30 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🇯🇵</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-pink-100 text-pink-700">Japanese Exams</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900">JLPT & JFT-Basic</h2>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              JLPT Levels N5 to N2 + JFT-Basic CBT simulator for SSW Working Visas.
            </p>

            <div className="space-y-1.5 mt-4 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-600" />
                <span>JLPT N5 (Beginner) & N4 (Elementary)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-600" />
                <span>JFT-Basic 250-mark CBT simulator</span>
              </div>
            </div>
          </div>

          <Link
            href="/japan/exams"
            className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            Explore Japan Exams
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Korea Card */}
        <div className="card p-5 border-blue-200 bg-blue-50/30 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🇰🇷</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">Korean Exams</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900">EPS-TOPIK & TOPIK</h2>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Official EPS-TOPIK CBT exam paper engine (Lessons 1-60) and TOPIK I / II.
            </p>

            <div className="space-y-1.5 mt-4 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>EPS-TOPIK E-9 Worker CBT simulator</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>TOPIK I (Levels 1-2) Reading & Listening</span>
              </div>
            </div>
          </div>

          <Link
            href="/korea/exams"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            Explore Korea Exams
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
