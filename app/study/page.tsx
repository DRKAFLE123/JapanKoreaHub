import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, GraduationCap, Award, CheckCircle2 } from 'lucide-react';
import CountryFilterChip from '@/components/ui/CountryFilterChip';

export const metadata: Metadata = {
  title: 'Study in Japan & Korea — JapanKoreaHub',
  description: 'Scholarships, university degree programs, Japanese language schools, Korean D-2/D-4 visas, and financial preparation.',
  alternates: { canonical: 'https://japankoreahub.com/study' },
};

export default function CombinedStudyPage() {
  return (
    <main className="pt-14 md:pt-4 max-w-4xl mx-auto pb-24">
      {/* Header */}
      <section className="px-4 py-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold text-gray-400">Jump to country track:</span>
          <CountryFilterChip country="japan" href="/japan/study" />
          <CountryFilterChip country="korea" href="/korea/study" />
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          Study Abroad & Scholarships
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Explore MEXT & GKS government scholarships, university admissions, and visa requirements.
        </p>
      </section>

      {/* Country Study Cards */}
      <section className="px-4 pb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Japan Study */}
        <div className="card p-5 border-pink-200 bg-pink-50/30 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🇯🇵</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-pink-100 text-pink-700">Japan Education</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900">Study in Japan</h2>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              MEXT Monbukagakusho Scholarship, Japanese Language Schools, and University Gakubu degree admissions.
            </p>

            <div className="space-y-1.5 mt-4 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 flex-shrink-0" />
                <span>MEXT 100% Tuition & Monthly Stipend</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 flex-shrink-0" />
                <span>Nihongo Gakko (1-2 Year Language Course)</span>
              </div>
            </div>
          </div>

          <Link
            href="/japan/study"
            className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            Explore Japan Study
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Korea Study */}
        <div className="card p-5 border-blue-200 bg-blue-50/30 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🇰🇷</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-700">Korea Education</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900">Study in Korea</h2>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Global Korea Scholarship (GKS), D-2 Degree admissions, and D-4 Language program visas.
            </p>

            <div className="space-y-1.5 mt-4 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span>GKS Full Government Scholarship</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span>D-2 Degree & D-4 Language Programs</span>
              </div>
            </div>
          </div>

          <Link
            href="/korea/study"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            Explore Korea Study
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
