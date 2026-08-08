'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';
import MobileNavbar from '@/components/layout/MobileNavbar';
import BottomTabBar from '@/components/layout/BottomTabBar';
import VisaTrustBanner from '@/components/visa/VisaTrustBanner';

interface Props {
  country: 'japan' | 'korea';
  type: string;
}

const OFFICIAL_SOURCES: Record<string, { name: string; url: string; date: string }> = {
  japan: { name: 'Ministry of Foreign Affairs (MOFA)', url: 'https://www.mofa.go.jp/j_info/visit/visa/', date: 'August 8, 2026' },
  korea: { name: 'Korea Visa Portal', url: 'https://www.visa.go.kr/', date: 'August 8, 2026' },
};

export default function VisaDetailClient({ country, type }: Props) {
  const cName = country === 'japan' ? 'Japan' : 'Korea';
  const typeName = type.toUpperCase();
  const source = OFFICIAL_SOURCES[country];

  return (
    <div className="min-h-screen bg-white pb-24">
      <MobileNavbar user={null} lang="en" onLangToggle={() => {}} onSearchOpen={() => {}} />

      <main className="pt-14">
        {/* Breadcrumb */}
        <div className="px-4 pt-4 pb-2">
          <Link href={`/${country}/visa`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to {cName} Visa Guide
          </Link>
        </div>

        {/* Header */}
        <section className="px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">{typeName} Visa</h1>
          <p className="text-sm text-gray-500 mt-1">Application process and required documents</p>
        </section>

        {/* Trust Banner - REQUIRED */}
        <section className="px-4 pb-4">
          <VisaTrustBanner
            officialSource={source.name}
            sourceUrl={source.url}
            lastVerifiedAt={source.date}
          />
        </section>

        {/* Requirements Checklist */}
        <section className="px-4 pb-6">
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
              <FileCheck className="w-5 h-5 text-gray-700" />
              <h2 className="font-bold text-lg text-gray-900">Document Checklist</h2>
            </div>
            
            <ul className="space-y-3">
              {[
                'Valid Passport (at least 6 months validity)',
                'Completed Visa Application Form',
                'Recent Passport-sized Photograph',
                'Certificate of Eligibility (COE) / Visa Issuance Number',
                'Financial Support Documents (Bank Statement)',
                'Educational Certificates'
              ].map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Professional Assistance */}
        <section className="px-4 pb-6">
          <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-3">🤝 Professional Assistance · Paid Service</p>
          <div className="card p-5 bg-blue-50 border-blue-100">
            <h3 className="font-bold text-gray-900 mb-2">Need help with your application?</h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Our verified visa consultants can review your documents, help you fill out forms, and prepare you for the embassy interview.
            </p>
            <Link
              href="/consultancy"
              className="inline-flex items-center justify-center w-full gap-2 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl hover:bg-blue-700 transition-colors"
            >
              Book a consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Platform Disclaimer Footer */}
        <section className="px-4 pb-4">
          <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex gap-3">
            <ShieldCheck className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <p className="text-[10px] text-gray-500 leading-relaxed">
              <strong>Japan Korea Hub is an independent information platform.</strong> We are not a government agency. The checklist above is for general guidance.
            </p>
          </div>
        </section>

      </main>
      <BottomTabBar />
    </div>
  );
}
