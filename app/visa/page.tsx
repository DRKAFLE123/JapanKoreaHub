import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';
import MobileNavbar from '@/components/layout/MobileNavbar';
import BottomTabBar from '@/components/layout/BottomTabBar';
import CountryFilterChip from '@/components/ui/CountryFilterChip';

export const metadata: Metadata = {
  title: 'Visa & Immigration Guides (Japan vs Korea) — JapanKoreaHub',
  description: 'Official requirements, document checklists, and visa procedures for Student Visas, SSW Work Visas, and EPS E-9 Visas.',
  alternates: { canonical: 'https://japankoreahub.com/visa' },
};

export default function CombinedVisaPage() {
  return (
    <div className="min-h-screen bg-white pb-24">
      <MobileNavbar user={null} lang="en" onLangToggle={() => {}} onSearchOpen={() => {}} />

      <main className="pt-14 max-w-4xl mx-auto">
        {/* Header */}
        <section className="px-4 py-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-gray-400">Jump to country:</span>
            <CountryFilterChip country="japan" href="/japan/visa" />
            <CountryFilterChip country="korea" href="/korea/visa" />
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Visa & Immigration Guides
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Verified checklists for Student Visas, SSW Work Visas, and EPS E-9 Visas.
          </p>
        </section>

        {/* Visa Comparison Cards */}
        <section className="px-4 pb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Japan Visa */}
          <div className="card p-5 border-pink-200 bg-pink-50/30 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🇯🇵</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-pink-100 text-pink-700">Japan Visa</span>
              </div>
              <h2 className="text-lg font-bold text-gray-900">Japan Student & SSW Visas</h2>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Certificate of Eligibility (COE) checklist, Student Visa, and SSW-1 Work Visa.
              </p>

              <div className="space-y-1.5 mt-4 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-pink-600" />
                  <span>Student Visa & Language School COE</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-pink-600" />
                  <span>SSW-1 Working Visa (Caregiving, Agri, etc.)</span>
                </div>
              </div>
            </div>

            <Link
              href="/japan/visa"
              className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              View Japan Visa Guides
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Korea Visa */}
          <div className="card p-5 border-blue-200 bg-blue-50/30 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🇰🇷</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">Korea Visa</span>
              </div>
              <h2 className="text-lg font-bold text-gray-900">Korea E-9 & Student Visas</h2>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                EPS E-9 Work Visa roster process, D-2 University Visa, and D-4 Language Visa.
              </p>

              <div className="space-y-1.5 mt-4 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>E-9 Non-Professional Employment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>D-2 Degree & D-4 Language Visa</span>
                </div>
              </div>
            </div>

            <Link
              href="/korea/visa"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              View Korea Visa Guides
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <BottomTabBar />
    </div>
  );
}
