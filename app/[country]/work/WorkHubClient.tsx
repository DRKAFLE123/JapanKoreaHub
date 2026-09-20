'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Briefcase, ChevronRight, ArrowRight, ShieldCheck, BookOpen, Building, CheckCircle2, Play, X } from 'lucide-react';


type Country = 'japan' | 'korea';

const SECTORS: Record<Country, { id: string; name: string; icon: string; desc: string; demand: string }[]> = {
  japan: [
    { id: 'nursing', name: 'Caregiving (Kaigo)', icon: '🏥', desc: 'High demand in Japanese nursing homes. Requires JFT-Basic + Kaigo Skill Test.', demand: 'Very High' },
    { id: 'agriculture', name: 'Agriculture (Nougyou)', icon: '🌾', desc: 'Crop farming & livestock management under SSW-1 visa.', demand: 'High' },
    { id: 'food-service', name: 'Food Service (Gaishoku)', icon: '🍽️', desc: 'Restaurant, kitchen & food preparation jobs across major Japanese cities.', demand: 'High' },
    { id: 'building-cleaning', name: 'Building Cleaning', icon: '🧹', desc: 'Facility maintenance & commercial building cleaning services.', demand: 'Moderate' },
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
  const [showPathwayModal, setShowPathwayModal] = useState(false);
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

        {/* Header - Compact layout with on-demand pathway trigger */}
        <section className="px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold w-fit">
              {flag} Work in {cName} · {country === 'japan' ? 'SSW Working Visa' : 'EPS E-9 Visa'}
            </div>
            <button
              type="button"
              onClick={() => setShowPathwayModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 text-xs font-bold transition-all cursor-pointer shadow-xs self-start sm:self-auto"
            >
              <Building className="w-3.5 h-3.5 text-emerald-600" />
              <span>5-Step Visa Pathway</span>
            </button>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Work Opportunities in {cName}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sector-specific vocabulary, skill test guides, and official study materials.
          </p>
        </section>

        {/* Sector Cards - Placed immediately at the top for optimal page space management */}
        <section className="px-4 pb-8 space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Job Sectors & Vocabulary</p>
          <div className="space-y-3">
            {sectors.map((sec) => (
              <div
                key={sec.id}
                className="card p-4 flex items-start gap-4 hover:border-emerald-300 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-2xl flex-shrink-0">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-gray-100 text-xs">
                    <Link
                      href={`/${country}/work/${sec.id}`}
                      className="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-indigo-200" />
                      <span>Start Learning • Study Hub</span>
                    </Link>
                    <Link
                      href={`/${country}/mock-test/skills?sector=${sec.id}`}
                      className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Mock Tests (5 Sets) ✍️</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Collapsible Pathway Guide - Cleanly tucked at the bottom so upper page space is saved */}
        <section className="px-4 pb-6">
          <details className="group border border-slate-200 bg-slate-50/80 rounded-2xl p-4 sm:p-5 transition-all open:bg-white open:shadow-xs">
            <summary className="flex items-center justify-between cursor-pointer list-none select-none">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm shrink-0">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">Immigration &amp; Visa Timeline</div>
                  <div className="text-sm font-bold text-slate-800">Official {country === 'japan' ? 'SSW' : 'EPS'} Employment Pathway (5 Steps)</div>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-xs text-gray-800 font-medium">{step}</span>
                </div>
              ))}
            </div>
          </details>
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

      {/* Pathway Modal Dialog - Accessible anywhere on demand without taking up page real estate */}
      {showPathwayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl">
                  🏢
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">
                    Official Government Process
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                    {country === 'japan' ? 'SSW Working Visa Pathway' : 'EPS E-9 Employment Pathway'}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPathwayModal(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 py-1">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    {idx + 1}
                  </div>
                  <span className="text-xs text-slate-800 font-semibold leading-relaxed">{step}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowPathwayModal(false)}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Close Pathway Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
