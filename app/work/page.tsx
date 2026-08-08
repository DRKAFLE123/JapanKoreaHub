import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Briefcase, Building, CheckCircle2 } from 'lucide-react';
import CountryFilterChip from '@/components/ui/CountryFilterChip';

export const metadata: Metadata = {
  title: 'Work in Japan & Korea (SSW & EPS E-9) — JapanKoreaHub',
  description: 'Specified Skilled Worker (SSW-1) in Japan and EPS E-9 Worker in Korea. Sector vocabulary, skill evaluation tests, and job rosters.',
  alternates: { canonical: 'https://japankoreahub.com/work' },
};

export default function CombinedWorkPage() {
  return (
    <main className="pt-14 md:pt-4 max-w-4xl mx-auto pb-24">
      {/* Header */}
      <section className="px-4 py-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold text-gray-400">Jump to country track:</span>
          <CountryFilterChip country="japan" href="/japan/work" />
          <CountryFilterChip country="korea" href="/korea/work" />
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          Work & Employment Visas
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Explore Specified Skilled Worker (SSW) sectors in Japan and EPS E-9 employment in Korea.
        </p>
      </section>

      {/* Country Work Cards */}
      <section className="px-4 pb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Japan Work */}
        <div className="card p-5 border-pink-200 bg-pink-50/30 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🇯🇵</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-pink-100 text-pink-700">Japan Work</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900">SSW Working Visa (Japan)</h2>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Specified Skilled Worker (SSW-1) in Caregiving (Kaigo), Agriculture, Food Service, and Construction.
            </p>

            <div className="space-y-1.5 mt-4 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 flex-shrink-0" />
                <span>Kaigo Caregiving & JFT-Basic CBT Test</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 flex-shrink-0" />
                <span>Agriculture & Food Service Skill Assessment</span>
              </div>
            </div>
          </div>

          <Link
            href="/japan/work"
            className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            Explore Japan Work
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Korea Work */}
        <div className="card p-5 border-blue-200 bg-blue-50/30 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🇰🇷</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-700">Korea Work</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900">EPS E-9 Worker (Korea)</h2>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              EPS Employment Permit System in Manufacturing, Agriculture, Construction, and Fishing.
            </p>

            <div className="space-y-1.5 mt-4 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span>Manufacturing & Assembly Sector Vocab</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span>EPS Roster Entry & Medical Checkup Steps</span>
              </div>
            </div>
          </div>

          <Link
            href="/korea/work"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            Explore Korea Work
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
