'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ArrowRight, ShieldCheck } from 'lucide-react';
import MobileNavbar from '@/components/layout/MobileNavbar';
import BottomTabBar from '@/components/layout/BottomTabBar';
import VisaTrustBanner from '@/components/visa/VisaTrustBanner';

type Country = 'japan' | 'korea';
interface VisaDef { type: string; title: string; desc: string; icon: string; }

const LABELS: Record<Country, { flag: string; name: string; chipClass: string }> = {
  japan: { flag: '🇯🇵', name: 'Japan', chipClass: 'bg-pink-100 text-pink-700 border-pink-200' },
  korea: { flag: '🇰🇷', name: 'Korea', chipClass: 'bg-blue-100 text-blue-700 border-blue-200' },
};

const OFFICIAL_SOURCES: Record<Country, { name: string; url: string; date: string }> = {
  japan: { name: 'Ministry of Foreign Affairs (MOFA)', url: 'https://www.mofa.go.jp/j_info/visit/visa/', date: 'August 8, 2026' },
  korea: { name: 'Korea Visa Portal (K-ETA)', url: 'https://www.visa.go.kr/', date: 'August 8, 2026' },
};

export default function VisaHubClient({ country, visaTypes }: { country: Country; visaTypes: VisaDef[] }) {
  const { flag, name, chipClass } = LABELS[country];
  const source = OFFICIAL_SOURCES[country];

  return (
    <div className="min-h-screen bg-white">
      <MobileNavbar user={null} lang="en" onLangToggle={() => {}} onSearchOpen={() => {}} />

      <main className="pt-14 md:pt-4 max-w-4xl mx-auto pb-24">
        {/* Breadcrumb */}
        <div className="px-4 pt-4 pb-2">
          <Link href={`/${country}`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            {flag} {name}
          </Link>
        </div>

        {/* Header */}
        <section className="px-4 py-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${chipClass} text-sm font-medium mb-3`}>
            {flag} {name}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{name} Visa Guide</h1>
          <p className="text-sm text-gray-500 mt-1">Requirements, processes, and interview preparation</p>
        </section>

        {/* Trust Banner - REQUIRED on all Visa pages */}
        <section className="px-4 pb-2">
          <VisaTrustBanner
            officialSource={source.name}
            sourceUrl={source.url}
            lastVerifiedAt={source.date}
          />
        </section>

        {/* Visa Categories */}
        <section className="px-4 pb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">🛂 Official Information</p>
          <div className="space-y-3">
            {visaTypes.map(({ type, title, desc, icon }) => (
              <Link
                key={type}
                href={`/${country}/visa/${type}`}
                className="flex items-center p-4 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-xl flex-shrink-0 mr-4">
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900">{title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* Professional Assistance (Consultancy CTA) */}
        <section className="px-4 pb-8">
          <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-3">🤝 Professional Assistance · Paid Service</p>
          <Link
            href="/consultancy"
            className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-2xl shadow-sm hover:bg-blue-100 transition-colors"
          >
            <div>
              <p className="font-bold text-sm text-blue-900 mb-1">Talk to a visa consultant</p>
              <p className="text-xs text-blue-700 leading-relaxed max-w-[220px]">
                Get personalized help with documentation, application review, and interview prep.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
          </Link>
        </section>

        {/* Platform Disclaimer Footer */}
        <section className="px-4 pb-8">
          <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex gap-3">
            <ShieldCheck className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <p className="text-[10px] text-gray-500 leading-relaxed">
              <strong>Japan Korea Hub is an independent information and education platform.</strong> We are not a government agency, embassy, or licensed immigration authority. Consultancy services are provided by independent advisors, not government officials.
            </p>
          </div>
        </section>
      </main>

      <BottomTabBar />
    </div>
  );
}
