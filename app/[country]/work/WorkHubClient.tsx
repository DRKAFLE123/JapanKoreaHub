'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Briefcase, ChevronRight, ArrowRight, ShieldCheck, BookOpen, Building, CheckCircle2 } from 'lucide-react';
import MobileNavbar from '@/components/layout/MobileNavbar';
import BottomTabBar from '@/components/layout/BottomTabBar';

type Country = 'japan' | 'korea';

const SECTORS: Record<Country, { id: string; name: string; icon: string; desc: string; demand: string }[]> = {
  japan: [
    { id: 'nursing', name: 'Caregiving (Kaigo)', icon: '🏥', desc: 'High demand in Japanese nursing homes. Requires JFT-Basic + Kaigo Skill Test.', demand: 'Very High' },
    { id: 'agriculture', name: 'Agriculture (Nougyou)', icon: '🌾', desc: 'Crop farming & livestock management under SSW-1 visa.', demand: 'High' },
    { id: 'food_service', name: 'Food Service (Gaishoku)', icon: '🍽️', desc: 'Restaurant, kitchen & food preparation jobs across major Japanese cities.', demand: 'High' },
    { id: 'building_cleaning', name: 'Building Cleaning', icon: '🧹', desc: 'Facility maintenance & commercial building cleaning services.', demand: 'Moderate' },
    { id: 'construction', name: 'Construction (Kensetsu)', icon: '🏗️', desc: 'Carpentry, rebar, scaffolding & infrastructure work.', demand: 'High' },
  ],
  korea: [
    { id: 'manufacturing', name: 'Manufacturing (제조업)', icon: '🏭', desc: 'Assembly lines, plastic molding, metal processing & electronics factories.', demand: 'Very High' },
    { id: 'agriculture', name: 'Agriculture & Livestock (농축산업)', icon: '🍏', desc: 'Fruit orchards, greenhouse farming & dairy livestock management.', demand: 'High' },
    { id: 'construction', name: 'Construction (건설업)', icon: '🏗️', desc: 'Building construction, civil engineering & site work under E-9 visa.', demand: 'High' },
    { id: 'fishing', name: 'Fishery & Marine (어업)', icon: '🐟', desc: 'Inland aquaculture & coastal fishing operations.', demand: 'Moderate' },
    { id: 'service', name: 'Service Industry (서비스업)', icon: '📦', desc: 'Logistics sorting, parcel packaging & hotel cleaning.', demand: 'Growing' },
  ],
};

const STEPS: Record<Country, string[]> = {
  japan: [
    'Pass JFT-Basic or JLPT N4 exam',
    'Pass Sector Skill Evaluation Test (e.g. Kaigo / Agriculture)',
    'Match with Japanese employer / Interview',
    'Sign Employment Contract & Receive COE',
    'Embassy Visa Application & Departure to Japan',
  ],
  korea: [
    'Register for EPS-TOPIK Examination',
    'Pass EPS-TOPIK CBT & Skill Test',
    'Complete Medical Checkup & Enter Job Roster',
    'Employer Selection & Visa Issuance (CCVI)',
    'Pre-departure orientation & Flight to Korea',
  ],
};

export default function WorkHubClient({ country }: { country: Country }) {
  const cName = country === 'japan' ? 'Japan' : 'Korea';
  const flag = country === 'japan' ? '🇯🇵' : '🇰🇷';
  const sectors = SECTORS[country];
  const steps = STEPS[country];

  return (
    <div className="min-h-screen bg-white pb-24">
      <main className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="px-4 pt-4 pb-2">
          <Link href={`/${country}`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            {flag} {cName}
          </Link>
        </div>

        {/* Header */}
        <section className="px-4 py-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-3">
            {flag} Work in {cName} · {country === 'japan' ? 'SSW Working Visa' : 'EPS E-9 Visa'}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Work Opportunities in {cName}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sector-specific vocabulary, skill test guides, and official employment steps.
          </p>
        </section>

        {/* Official Process Flowchart */}
        <section className="px-4 pb-6">
          <div className="card p-5">
            <h2 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
              <Building className="w-5 h-5 text-emerald-600" />
              Official Employment Pathway
            </h2>
            <div className="space-y-2.5">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-xs text-gray-800 font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sector Cards */}
        <section className="px-4 pb-8 space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Job Sectors & Vocabulary</p>
          <div className="space-y-3">
            {sectors.map((sec) => (
              <div
                key={sec.id}
                className="card p-4 flex items-start gap-4 hover:border-emerald-200 hover:shadow-sm transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
                  {sec.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 text-sm">{sec.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {sec.demand} Demand
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{sec.desc}</p>

                  <div className="flex items-center gap-3 mt-3 pt-2 border-t border-gray-100 text-xs">
                    <Link
                      href={`/${country}/learn/vocabulary`}
                      className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Sector Vocab
                    </Link>
                    <span className="text-gray-300">•</span>
                    <Link
                      href={`/${country}/visa`}
                      className="text-gray-600 hover:underline"
                    >
                      Visa Requirements
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Consultancy Assistance */}
        <section className="px-4 pb-8">
          <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between gap-4">
            <div>
              <p className="font-bold text-blue-900 text-sm mb-1">Need help with skill test prep or interview?</p>
              <p className="text-xs text-blue-700 leading-relaxed max-w-md">
                Talk with our counselors for 1-on-1 guidance on SSW skill evaluation or EPS roster entry.
              </p>
            </div>
            <Link
              href="/consultancy"
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors flex-shrink-0"
            >
              Book Counselor
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </main>

      <BottomTabBar />
    </div>
  );
}
