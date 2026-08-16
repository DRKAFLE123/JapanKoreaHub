'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, GraduationCap, Award, BookOpen, ShieldCheck, ArrowRight, DollarSign, CheckCircle2 } from 'lucide-react';
import MobileNavbar from '@/components/layout/MobileNavbar';
import BottomTabBar from '@/components/layout/BottomTabBar';

type Country = 'japan' | 'korea';

const SCHOLARSHIPS: Record<Country, { name: string; type: string; coverage: string; desc: string }> = {
  japan: {
    name: 'MEXT Scholarship (Monbukagakusho)',
    type: 'Government Funded',
    coverage: '100% Tuition + Monthly Stipend (~¥117,000–¥145,000/mo)',
    desc: 'Prestigious scholarship offered by the Ministry of Education, Culture, Sports, Science and Technology of Japan.',
  },
  korea: {
    name: 'GKS (Global Korea Scholarship)',
    type: 'Government Funded',
    coverage: '100% Tuition + Roundtrip Airfare + Monthly Stipend (~₩1,000,000/mo)',
    desc: 'Full scholarship provided by NIIED for undergraduate & postgraduate degrees in South Korea.',
  },
};

const PATHWAYS: Record<Country, { title: string; duration: string; requirement: string; desc: string }[]> = {
  japan: [
    { title: 'Japanese Language School (Nihongo Gakko)', duration: '1–2 Years', requirement: 'JLPT N5 / NAT 5Q (150+ hrs)', desc: 'Intensive language course preparing for university admission or SSW employment in Japan.' },
    { title: 'Undergraduate University (Gakubu)', duration: '4 Years', requirement: 'JLPT N2 + EJU Exam', desc: 'Bachelor degree programs taught in Japanese or English.' },
    { title: 'Graduate School (Daigakuin)', duration: '2 Years (Master) / 3 Years (PhD)', requirement: 'JLPT N2/N1 + Bachelor Degree', desc: 'Advanced research & master/doctoral degree programs.' },
  ],
  korea: [
    { title: 'Korean Language Program (D-4 Visa)', duration: '6 Months – 2 Years', requirement: 'High School Completion (TOPIK optional)', desc: 'University-affiliated language institutes for intensive Korean study.' },
    { title: 'Degree Programs (D-2 Visa)', duration: '4 Years (Bachelor) / 2 Years (Master)', requirement: 'TOPIK Level 3+ (or IELTS 5.5+ for English track)', desc: 'Undergraduate and postgraduate degrees at top Korean universities.' },
  ],
};

export default function StudyHubClient({ country }: { country: Country }) {
  const cName = country === 'japan' ? 'Japan' : 'Korea';
  const flag = country === 'japan' ? '🇯🇵' : '🇰🇷';
  const scholarship = SCHOLARSHIPS[country];
  const pathways = PATHWAYS[country];

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200 text-xs font-semibold mb-3">
            {flag} Study in {cName} · Universities & Scholarships
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Study Opportunities in {cName}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Scholarship guides, university pathways, and student visa admission steps.
          </p>
        </section>

        {/* Government Scholarship Spotlight */}
        <section className="px-4 pb-6">
          <div className="card p-5 border-amber-200 bg-amber-50/50">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">{scholarship.type}</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">{scholarship.name}</h2>
            <p className="text-xs font-semibold text-emerald-700 mb-2">Coverage: {scholarship.coverage}</p>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">{scholarship.desc}</p>
            <Link
              href="/consultancy"
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:underline"
            >
              Get SOP & scholarship application guidance →
            </Link>
          </div>
        </section>

        {/* Educational Pathways */}
        <section className="px-4 pb-8 space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Academic Pathways</p>
          <div className="space-y-3">
            {pathways.map((p, idx) => (
              <div key={idx} className="card p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 text-base">{p.title}</h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
                    {p.duration}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
                <div className="pt-2 text-xs text-gray-500 font-medium">
                  Requirement: <span className="text-gray-900 font-semibold">{p.requirement}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Financial & Visa Checklist */}
        <section className="px-4 pb-8">
          <div className="card p-5 space-y-3">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              Financial & Document Preparation
            </h3>
            <div className="space-y-2 text-xs text-gray-700">
              {[
                'Bank Balance Proof (typically NPR 15–20 Lakhs equivalent for 6 months)',
                'Sponsor Relationship Certificate & Tax Clearance',
                'Academic Certificates with Ministry Attestation (MOFA / NOC)',
                'Valid JLPT / TOPIK score card',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <BottomTabBar />
    </div>
  );
}
