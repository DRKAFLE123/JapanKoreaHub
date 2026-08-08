import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe, Home as HomeIcon, CheckCircle2 } from 'lucide-react';
import CountryFilterChip from '@/components/ui/CountryFilterChip';

export const metadata: Metadata = {
  title: 'Life in Japan & Korea (Cost of Living, Housing & Rights) — JapanKoreaHub',
  description: 'Monthly budget breakdown, apartment renting tips, health insurance, part-time work legal limits, and emergency helplines.',
  alternates: { canonical: 'https://japankoreahub.com/life' },
};

export default function CombinedLifePage() {
  return (
    <main className="pt-14 md:pt-4 max-w-4xl mx-auto pb-24">
      {/* Header */}
      <section className="px-4 py-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold text-gray-400">Jump to country track:</span>
          <CountryFilterChip country="japan" href="/japan/life" />
          <CountryFilterChip country="korea" href="/korea/life" />
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          Life & Living Guides
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Monthly cost of living, apartment renting deposits, health insurance, and workplace rights.
        </p>
      </section>

      {/* Country Life Cards */}
      <section className="px-4 pb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Japan Life */}
        <div className="card p-5 border-pink-200 bg-pink-50/30 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🇯🇵</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-pink-100 text-pink-700">Japan Life</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900">Living in Japan</h2>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Cost of living breakdown in Tokyo vs regional prefectures, Shikikin/Reikin key money, and NHI health insurance.
            </p>

            <div className="space-y-1.5 mt-4 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 flex-shrink-0" />
                <span>28 Hours/Week Part-Time Work Regulation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 flex-shrink-0" />
                <span>Apartment Renting & 70% NHI Coverage</span>
              </div>
            </div>
          </div>

          <Link
            href="/japan/life"
            className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            Explore Japan Life
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Korea Life */}
        <div className="card p-5 border-blue-200 bg-blue-50/30 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🇰🇷</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-700">Korea Life</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900">Living in Korea</h2>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Seoul living costs, Goshiwon vs One-room housing deposits, NHIS insurance, and emergency support.
            </p>

            <div className="space-y-1.5 mt-4 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span>Goshiwon & Wolse Deposit Housing Tips</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span>D-2 Part-Time Work Permit & NHIS Health Plan</span>
              </div>
            </div>
          </div>

          <Link
            href="/korea/life"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            Explore Korea Life
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
