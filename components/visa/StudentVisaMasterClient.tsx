'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  GraduationCap,
  Award,
  FileText,
  Calendar,
  DollarSign,
  CheckSquare,
  Clock,
  ArrowRight,
  BookOpen,
  MessageSquare,
  ClipboardList,
  Home as HomeIcon,
  ShieldAlert,
  Download,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useCountry } from '@/lib/context/CountryContext';

interface StudentVisaMasterClientProps {
  country: 'japan' | 'korea';
}

type StudentSection = 'COLLEGES' | 'SCHOLARSHIPS' | 'TIPS_SOP' | 'PROCESS' | 'FINANCIALS' | 'CHECKLIST' | 'WORK_RIGHTS';

const STUDENT_TAB_SLUG_MAP: Record<string, StudentSection> = {
  'schools': 'COLLEGES',
  'colleges': 'COLLEGES',
  'scholarships': 'SCHOLARSHIPS',
  'sop': 'TIPS_SOP',
  'tips': 'TIPS_SOP',
  'process': 'PROCESS',
  'financials': 'FINANCIALS',
  'sponsor': 'FINANCIALS',
  'checklist': 'CHECKLIST',
  'work-rights': 'WORK_RIGHTS',
  'work': 'WORK_RIGHTS',
};

const STUDENT_TABS = [
  { key: 'COLLEGES' as StudentSection, slug: 'schools', label: '1. Choosing Schools', icon: GraduationCap },
  { key: 'SCHOLARSHIPS' as StudentSection, slug: 'scholarships', label: '2. Scholarships', icon: Award },
  { key: 'TIPS_SOP' as StudentSection, slug: 'sop', label: '3. SOP & Guidance', icon: FileText },
  { key: 'PROCESS' as StudentSection, slug: 'process', label: '4. Visa Process', icon: Calendar },
  { key: 'FINANCIALS' as StudentSection, slug: 'financials', label: '5. Sponsor & Ward Docs', icon: DollarSign },
  { key: 'CHECKLIST' as StudentSection, slug: 'checklist', label: '6. Document Checklist', icon: CheckSquare },
  { key: 'WORK_RIGHTS' as StudentSection, slug: 'work-rights', label: '7. Student Work (28h)', icon: Clock },
];

export default function StudentVisaMasterClient({ country }: StudentVisaMasterClientProps) {
  const { setCountryFocus } = useCountry();
  const isJapan = country === 'japan';

  const searchParams = useSearchParams();
  const rawTab = searchParams.get('tab')?.toLowerCase();
  const initialSection: StudentSection = (rawTab && STUDENT_TAB_SLUG_MAP[rawTab]) ? STUDENT_TAB_SLUG_MAP[rawTab] : 'COLLEGES';

  const [activeSection, setActiveSection] = useState<StudentSection>(initialSection);

  useEffect(() => {
    const qTab = searchParams.get('tab')?.toLowerCase();
    if (qTab && STUDENT_TAB_SLUG_MAP[qTab]) {
      setActiveSection(STUDENT_TAB_SLUG_MAP[qTab]);
    }
  }, [searchParams]);

  const [checklistItems, setChecklistItems] = useState<Record<string, boolean>>({
    doc1: true,
    doc2: true,
    doc3: false,
    doc4: false,
    doc5: false,
    doc6: false,
    doc7: false,
    doc8: false,
  });

  const toggleChecklist = (id: string) => {
    setChecklistItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-24 font-sans">
      
      {/* Top Header Section - Clean, Light & Minimalist UI */}
      <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 mb-6 shadow-xs space-y-4 font-sans">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black uppercase tracking-wider">
              {isJapan ? '🇯🇵 Study in Japan Master Guide' : '🇰🇷 Study in Korea Master Guide'}
            </span>
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Updated for 2026/2027 Intakes
            </span>
          </div>

          {/* Country Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <Link
              href="/japan/visa/student"
              onClick={() => setCountryFocus('japan')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                isJapan
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-black'
                  : 'text-slate-600 hover:text-slate-900 font-bold'
              }`}
            >
              🇯🇵 Japan Study
            </Link>
            <Link
              href="/korea/visa/student"
              onClick={() => setCountryFocus('korea')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                !isJapan
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-black'
                  : 'text-slate-600 hover:text-slate-900 font-bold'
              }`}
            >
              🇰🇷 Korea Study
            </Link>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            {isJapan
              ? 'Complete Master Guide to Student Visa (Ryugaku 留学) in Japan'
              : 'Complete Master Guide to Student Visa (D-2 / D-4 유학) in Korea'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            {isJapan
              ? 'Everything Nepali students need: choosing language schools & Senmon Gakko, MEXT scholarships, Statement of Purpose (SOP) blueprints, ward sponsor documents (Nata Pramanit), and Embassy Kathmandu interview readiness.'
              : 'The definitive roadmap for GKS scholarships, D-4 Korean language courses, D-2 degree admissions, Bank balance proof, Ward tax clearance, and TOPIK tuition merit waivers.'}
          </p>
        </div>

        {/* Quick Inter-Link Navigation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-slate-100">
          <Link
            href={isJapan ? '/japan/learn' : '/korea/learn'}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors shadow-2xs"
          >
            <BookOpen className="w-4 h-4 text-slate-500 shrink-0" />
            <span>Study Materials</span>
          </Link>

          <Link
            href={isJapan ? '/japan/visa/interview' : '/korea/visa/interview'}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors shadow-2xs"
          >
            <MessageSquare className="w-4 h-4 text-slate-500 shrink-0" />
            <span>Interview Prep</span>
          </Link>

          <Link
            href={isJapan ? '/japan/exams' : '/korea/exams'}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors shadow-2xs"
          >
            <ClipboardList className="w-4 h-4 text-slate-500 shrink-0" />
            <span>Mock Test CBT</span>
          </Link>

          <Link
            href={isJapan ? '/japan/rooms' : '/korea/rooms'}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors shadow-2xs"
          >
            <HomeIcon className="w-4 h-4 text-slate-500 shrink-0" />
            <span>Rooms &amp; Housing</span>
          </Link>
        </div>
      </div>

      {/* Navigation Tabs - SEO Friendly Links to Slugs */}
      <div className="flex items-center gap-1.5 mb-6 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
        {STUDENT_TABS.map((tab) => {
          const Icon = tab.icon;
          const active = activeSection === tab.key;
          return (
            <Link
              key={tab.key}
              href={`/${country}/visa/student?tab=${tab.slug}`}
              scroll={false}
              onClick={() => setActiveSection(tab.key)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 border ${
                active
                  ? 'bg-indigo-600 text-white shadow-xs border-indigo-600 font-black'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>

      {/* TAB 1: CHOOSING SCHOOLS & COLLEGES */}
      {activeSection === 'COLLEGES' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Language Schools */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-2xl mb-2 block">{isJapan ? '🏫' : '🏛️'}</span>
                <h3 className="text-base font-black text-slate-900">
                  {isJapan ? 'Japanese Language Schools (日本語学校)' : 'University Language Institutes (어학당)'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  {isJapan
                    ? 'Primary gateway for 1 to 2-year intensive study. Prepares students for JLPT N2/N1, EJU exams, and university/Senmon Gakko admission.'
                    : '10-week intensive terms at recognized Korean universities (Yonsei, Korea Univ, SNU, Pusan). Focuses on TOPIK Level 3–4 attainment for degree transfer.'}
                </p>
                <div className="mt-4 space-y-1.5 text-xs text-slate-700">
                  <p><strong>Selection Criteria:</strong> Ministry accreditation, visa passing rate (&gt;90%), hostel availability, JLPT pass rate.</p>
                  <p><strong>Tuition:</strong> {isJapan ? '¥700,000 – ¥850,000 / year' : '₩5,000,000 – ₩6,800,000 / year'}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 font-bold">
                ✓ Intakes: {isJapan ? 'April, July, October, January' : 'March, June, September, December'}
              </div>
            </div>

            {/* Vocational Colleges / Senmon Gakko */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-2xl mb-2 block">⚙️</span>
                <h3 className="text-base font-black text-slate-900">
                  {isJapan ? 'Vocational Colleges (専門学校 - Senmon Gakko)' : 'Junior Colleges (전문대학)'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  {isJapan
                    ? '2-year diploma granting technical colleges focused on 100% employment in IT, Automotive, Hotel, Caregiving, and Business Translation.'
                    : '2 to 3-year practical industry training in South Korea with fast-track direct employment E-7 work visa conversion.'}
                </p>
                <div className="mt-4 space-y-1.5 text-xs text-slate-700">
                  <p><strong>Admission Requirement:</strong> JLPT N2 (or N3 with 6 months language school) / TOPIK Level 3.</p>
                  <p><strong>Degree Conferred:</strong> Senmonshi (専門士 - Diploma) eligible for work visa.</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 font-bold">
                ✓ Leads directly to Gijinkoku or E-7 Work Visa
              </div>
            </div>

            {/* Universities */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-2xl mb-2 block">🎓</span>
                <h3 className="text-base font-black text-slate-900">
                  {isJapan ? 'Universities (大学 - Daigaku)' : 'Universities (대학교 - 4-Year)'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  4-year Bachelor’s or 2-year Master’s degree programs. Offers both Japanese/Korean-medium degree tracks and all-English EMI degree programs.
                </p>
                <div className="mt-4 space-y-1.5 text-xs text-slate-700">
                  <p><strong>Top Institutions:</strong> {isJapan ? 'Tokyo, Kyoto, Waseda, Keio, APU' : 'SKY (Seoul National, Korea, Yonsei), KAIST, Sungkyunkwan'}</p>
                  <p><strong>Merit Waivers:</strong> 30% to 100% tuition waivers widely granted based on academic entrance score.</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 font-bold">
                ✓ Maximum PR Points (Highly Skilled Professional Track)
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: SCHOLARSHIPS DIRECTORY */}
      {activeSection === 'SCHOLARSHIPS' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200 text-amber-950 flex items-start gap-3">
            <Award className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <h3 className="text-sm font-black">
                {isJapan ? 'Official Japanese Government & JASSO Scholarships' : 'Official Korean Government (GKS) & University Scholarships'}
              </h3>
              <p className="leading-relaxed">
                {isJapan
                  ? 'The Japanese government and private foundations offer fully-funded scholarships covering 100% tuition, return airfare, and a substantial monthly living stipend. Nepali students can apply via the Embassy of Japan in Kathmandu (Panipokhari) or through university and language school recommendations.'
                  : 'The Korean government (NIIED) and universities offer fully-funded scholarships covering 100% tuition, return airfare, and monthly living stipends. Nepali students can apply via the Embassy of the Republic of Korea in Kathmandu (Tahachal) or directly through university tracks.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {isJapan ? (
              <>
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-slate-900">MEXT (Monbukagakusho) Scholarship</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-black">100% Full Ride</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span><strong>Benefits:</strong> 100% tuition waiver + ¥117,000 to ¥145,000 monthly living stipend + roundtrip flights.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span><strong>Tracks:</strong> Undergraduate (5 yrs), Research/Master (2-3 yrs), College of Technology (4 yrs).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span><strong>Kathmandu Timeline:</strong> Applications open April/May at Embassy of Japan, Panipokhari, Kathmandu. Written exam in English/Japanese/Maths.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-slate-900">JASSO Honors Scholarship</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-black">¥48,000 / mo</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Benefit:</strong> ¥48,000 per month (¥576,000 / year) awarded to self-financed students with top GPA and attendance.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Eligibility:</strong> Enrolled in Japanese language school or university with &gt;90% attendance record.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Nomination:</strong> Recommended directly by your school principal after arrival in Japan.</span>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-slate-900">Global Korea Scholarship (GKS)</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-black">100% Full Ride</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>Benefits:</strong> 100% tuition + ₩1,000,000 monthly living stipend + settlement allowance + roundtrip airfare.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>Tracks:</strong> Embassy Track (Embassy of ROK, Tahachal, Kathmandu) and University Direct Track.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>Timeline:</strong> September (Undergrad) and February (Graduate/Master’s). Includes 1 free year of Korean language training!</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-slate-900">University TOPIK Merit Waivers</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-black">30% to 100% Off</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span><strong>TOPIK Level 3:</strong> Automatically grants 30% to 50% tuition reduction at most universities.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span><strong>TOPIK Level 4–6:</strong> Grants 70% to 100% full tuition waiver plus on-campus dormitory support.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span><strong>BK21+ Assistantships:</strong> Research &amp; teaching assistantships in STEM majors with monthly lab stipends.</span>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: SOP WRITING & CRUCIAL TIPS */}
      {activeSection === 'TIPS_SOP' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>{isJapan ? 'Statement of Purpose (SOP / 志望理由書) Framework' : 'Statement of Purpose (SOP / 자기소개서) Framework'}</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isJapan
                ? 'Your SOP is the single most scrutinized document by Japanese Immigration (Tokyo/Osaka Immigration). Officers assess authentic academic purpose, genuine Japanese study necessity, and clear financial solvency.'
                : 'Your SOP is the single most scrutinized document by Korean university admissions and Korea Immigration Service. Officers assess genuine motivation, academic study plan, and post-graduation goals.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <span className="font-black text-indigo-600 block">Paragraph 1: Hook &amp; Background</span>
                <p className="text-slate-600">Why this specific field? Connect your +2 or Bachelor’s major in Nepal with your career ambition.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <span className="font-black text-indigo-600 block">{isJapan ? 'Paragraph 2: Why Japan?' : 'Paragraph 2: Why South Korea?'}</span>
                <p className="text-slate-600">
                  {isJapan
                    ? 'Why Japan over English-speaking countries? Mention technology, work culture, specialized Senmon skills, or academic research.'
                    : 'Why South Korea over other destinations? Mention industry innovation, TOPIK advancement, campus research, and Korean work culture.'}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <span className="font-black text-indigo-600 block">Paragraph 3: Study Plan</span>
                <p className="text-slate-600">
                  {isJapan
                    ? 'Language school curriculum, target JLPT score in Year 1 (N2/N1), and intended college / Senmon major in Year 2.'
                    : 'Language institute targets, reaching TOPIK Level 4+ in Year 1, and undergraduate/graduate degree coursework in Year 2.'}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <span className="font-black text-indigo-600 block">Paragraph 4: Career Plan</span>
                <p className="text-slate-600">
                  {isJapan
                    ? 'Clear future trajectory (e.g. working in Japanese IT/hospitality via Gijinkoku or returning to establish enterprise in Nepal).'
                    : 'Clear future trajectory (e.g. working in Korean tech/industry via E-7 or applying knowledge to advance sectors in Nepal).'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-rose-50/80 border border-rose-200 text-rose-950 space-y-2">
            <h3 className="text-sm font-black flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>{isJapan ? 'How to Avoid Fake Consultancies & Unaccredited Japanese Schools' : 'How to Avoid Fake Consultancies & Uncertified Korean Universities'}</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-rose-900 leading-relaxed list-disc pl-5">
              <li>Never pay tuition directly to local consultancy bank accounts in Nepal. Tuition must always be transferred directly to the school’s official institutional bank account via bank TT.</li>
              {isJapan ? (
                <>
                  <li>Verify that the Japanese language school has a <strong>"Tekikoukou" (適正校 - Proper Accredited School)</strong> designation with over 90% student visa renewal success.</li>
                  <li>Avoid consultancies promising "100% full-time work with guaranteed visa" — international student visas in Japan strictly restrict work to 28 hours per week by law!</li>
                </>
              ) : (
                <>
                  <li>Ensure the Korean university is certified under the <strong>IEQAS (International Education Quality Assurance System)</strong> by the Korean Ministry of Education to avoid visa-restricted institutions.</li>
                  <li>Beware of false claims regarding full-time work on D-4 visas — Korean language trainees cannot legally work part-time during their first 6 months!</li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* TAB 4: STEP-BY-STEP PROCESS */}
      {activeSection === 'PROCESS' && (
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
            <h3 className="text-base font-black text-slate-900">
              {isJapan ? 'The 6-Step Japan Student Visa Pipeline' : 'The 6-Step Korea Student Visa Pipeline'}
            </h3>

            <div className="space-y-4">
              {[
                {
                  step: '01',
                  title: 'School Selection & Online Video Interview (6–8 Months Before Intake)',
                  desc: isJapan
                    ? 'Select your accredited language school. Attend a 15-minute Zoom/Skype interview with Japanese school staff to assess your motivation and elementary Japanese.'
                    : 'Submit preliminary application to university D-4/D-2 department. Conduct video interview with international admissions officer.',
                },
                {
                  step: '02',
                  title: isJapan ? 'Document Submission for COE (Japan Immigration) (4–5 Months Before)' : 'Document Submission for CoA / Visa Confirmation (4–5 Months Before)',
                  desc: isJapan
                    ? 'All translated documents (Nata Pramanit, bank balance, property valuation, transcripts) submitted to Tokyo/Osaka Regional Immigration Bureau for Certificate of Eligibility (COE).'
                    : 'Application reviewed by university registrar. Upon academic clearance, university requests Certificate of Admission (CoA) / Visa Issuance Confirmation (CCVI).',
                },
                {
                  step: '03',
                  title: isJapan ? 'COE Grant & Tuition Wire Transfer (2 Months Before Intake)' : 'CoA Grant & Tuition Wire Transfer (2 Months Before Intake)',
                  desc: isJapan
                    ? 'Immigration grants your official Certificate of Eligibility (COE). You will receive an invoice. Wire transfer tuition directly to the Japanese institution bank account via TT (Telegraphic Transfer).'
                    : 'University grants your official Certificate of Admission (CoA). Wire transfer 1st-semester tuition directly to the Korean university bank account via international TT.',
                },
                {
                  step: '04',
                  title: isJapan ? 'Embassy of Japan Kathmandu Visa Submission' : 'Embassy of the Republic of Korea Kathmandu Visa Submission',
                  desc: isJapan
                    ? 'Book appointment at Embassy of Japan in Panipokhari or authorized VFS Global Center in Kathmandu. Submit Original COE, Passport, and Visa Application Form.'
                    : 'Submit visa dossier to Embassy of the Republic of Korea in Tahachal, Kathmandu. Biometrics and passport collection.',
                },
                {
                  step: '05',
                  title: 'Ministry of Education (MOE) Sanothimi NOC Processing',
                  desc: 'Apply online for the No Objection Certificate (NOC) through the Ministry of Education portal at Sanothimi, Bhaktapur. Essential for exchanging foreign currency at Nepal Rastra Bank approved commercial banks.',
                },
                {
                  step: '06',
                  title: 'Flight Booking, Housing Arrangement & Departure',
                  desc: isJapan
                    ? 'Book flight ticket to Tokyo (Narita/Haneda) or Osaka (Kansai). Receive your Resident Card (在留カード - Zairyu Card) and 28-hour part-time work permit stamp directly at the airport immigration counter!'
                    : 'Book flight ticket to Seoul (Incheon) or Busan (Gimhae). Receive your Alien Registration Card (ARC / 외국인등록증) at the local Korean Immigration Office within 90 days of arrival.',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="w-9 h-9 rounded-2xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: FINANCIALS & SPONSOR REQUIREMENTS */}
      {activeSection === 'FINANCIALS' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-indigo-600" />
              <span>Nepal Ward Office &amp; Financial Sponsor Requirements</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Immigration requires strict proof that your sponsor has genuine capacity to cover your tuition and living expenses without relying on illegal work.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h4 className="font-black text-slate-900">1. Eligible Sponsors (नाता प्रमाणित)</h4>
                <p className="text-slate-600 leading-relaxed">
                  First blood relation only: <strong>Father or Mother</strong> is strongly recommended. Real elder brother or sister can also sponsor if their tax and income documents are exceptional. Relationship verification (नाता प्रमाणित) must be issued by the local Ward Office with official seal.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h4 className="font-black text-slate-900">2. Bank Balance Certificate &amp; Statement</h4>
                <p className="text-slate-600 leading-relaxed">
                  <strong>NPR 18 to 25 Lakhs</strong> {isJapan ? '(approx ¥2.5M to ¥3M)' : '(approx $18,000 to $20,000 USD)'} maintained in a Class 'A' commercial bank of Nepal for 3 to 6 months. Bank statement must clearly explain the authentic source of funds (e.g. land sale, business turnover, or regular salary).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h4 className="font-black text-slate-900">3. Annual Income Proof (वार्षिक आम्दानी)</h4>
                <p className="text-slate-600 leading-relaxed">
                  Sponsor’s annual income should be <strong>NPR 8 to 15 Lakhs</strong> per year. Income sources can combine: registered business earnings, agricultural income certificate, house rental contract, or government/corporate salary certificate.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h4 className="font-black text-slate-900">4. Tax Clearance (कर चुक्ता प्रमाणपत्र)</h4>
                <p className="text-slate-600 leading-relaxed">
                  Tax clearance certificates for the last 3 consecutive fiscal years issued by the Inland Revenue Department (IRD) / local municipality. Incomplete or forged tax records trigger immediate visa rejections.
                </p>
              </div>

            </div>

            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-950 flex items-center justify-between">
              <div>
                <span className="font-bold">
                  {isJapan ? 'Need a template for Sponsor Letter of Guarantee (身元保証書)?' : 'Need a template for Sponsor Letter of Guarantee (재정보증서)?'}
                </span>
                <p className="text-[11px] text-indigo-700">
                  {isJapan ? 'Download formatted bilingual Nepali & Japanese financial guarantee forms.' : 'Download formatted bilingual Nepali & Korean financial guarantee forms.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => alert('Sponsor template package prepared for download.')}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-black text-xs cursor-pointer flex items-center gap-1.5 shrink-0 hover:bg-indigo-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Form</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: INTERACTIVE DOCUMENT CHECKLIST */}
      {activeSection === 'CHECKLIST' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">Document Dossier Checklist</h3>
                <p className="text-xs text-slate-500">Track and verify all essential documents before submitting to immigration.</p>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print Checklist</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {[
                { id: 'doc1', title: 'Valid Passport (Minimum 2 years validity remaining)', cat: 'Applicant' },
                { id: 'doc2', title: 'Academic Transcripts & Character Certificates (SEE, +2, Bachelor)', cat: 'Applicant' },
                {
                  id: 'doc3',
                  title: isJapan ? 'Language Certificate (NAT-TEST / JLPT N5 or J-CERT)' : 'Language Certificate (TOPIK Level 1/2 or Sejong Institute)',
                  cat: 'Applicant',
                },
                {
                  id: 'doc4',
                  title: isJapan ? 'Statement of Purpose (SOP / 志望理由書) in English & Japanese' : 'Statement of Purpose (SOP / 자기소개서) in English & Korean',
                  cat: 'Applicant',
                },
                { id: 'doc5', title: 'Relationship Verification (नाता प्रमाणित) from Ward Office', cat: 'Sponsor' },
                { id: 'doc6', title: 'Bank Balance Certificate & 6-Month Bank Statement (NPR 18–25L)', cat: 'Sponsor' },
                { id: 'doc7', title: 'Annual Income Verification Certificate & 3-Year Tax Clearance (कर चुक्ता)', cat: 'Sponsor' },
                { id: 'doc8', title: 'Property Valuation Certificate (सम्पत्ति मूल्याङ्कन) with Map', cat: 'Sponsor' },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    checklistItems[item.id]
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checklistItems[item.id] || false}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className="text-xs">{item.title}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-black uppercase">
                    {item.cat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: STUDENT WORK RIGHTS (ARUBAITO / ALBA) */}
      {activeSection === 'WORK_RIGHTS' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              <span>
                {isJapan
                  ? 'Japan International Student Part-Time Work Regulations (Arubaito - アルバイト)'
                  : 'Korea International Student Part-Time Work Regulations (Alba - 시간제취업)'}
              </span>
            </h3>

            {isJapan ? (
              /* JAPAN EXCLUSIVE CONTENT */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-5 rounded-2xl bg-red-50/50 border border-red-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-red-950">🇯🇵 Japan: Strict 28 Hours / Week Rule</h4>
                    <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-800 text-[10px] font-black">Strict Law</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-700 list-disc pl-4 leading-relaxed">
                    <li><strong>Work Permit Stamp:</strong> Stamp for "Permission to Engage in Activity Other Than Permitted" (資格外活動許可) is issued free at airport immigration upon arrival (Narita/Haneda/Kansai).</li>
                    <li><strong>Term Time Limit:</strong> Strictly maximum <strong>28 hours per week</strong> across all combined employers. Immigration actively audits payroll tax records.</li>
                    <li><strong>Vacation Periods:</strong> Up to <strong>40 hours per week (8 hours/day)</strong> during official summer, winter, and spring breaks with school-issued vacation certificate.</li>
                    <li><strong>Prohibited Industries:</strong> Adult entertainment venues, pachinko parlors, clubs, and bars (風俗営業) are strictly forbidden under penalty of deportation.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-slate-900">💡 Practical Guidance for Students in Japan</h4>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[10px] font-black">Student Tips</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-700 list-disc pl-4 leading-relaxed">
                    <li><strong>Hourly Wages:</strong> Standard minimum wage is <strong>¥1,113/hr in Tokyo</strong> and ~¥1,000–¥1,064/hr in other prefectures. Night shifts (22:00–05:00) pay a 25% premium.</li>
                    <li><strong>Starter Jobs:</strong> Bento food factories, Yamato/Sagawa warehouse sorting (require minimal Japanese), convenience stores (Lawson/7-Eleven), and family restaurants (require JLPT N3+).</li>
                    <li><strong>Tax Caution:</strong> Keep annual income under <strong>¥1.03 Million</strong> to avoid heavy resident tax (住民税 - Juminzei) and remain eligible as dependent.</li>
                    <li><strong>Resident Card:</strong> Always carry your Zairyu Card when commuting or working; employers must verify your permission stamp.</li>
                  </ul>
                </div>
              </div>
            ) : (
              /* KOREA EXCLUSIVE CONTENT */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-blue-950">🇰🇷 Korea: TOPIK-Based Allowance</h4>
                    <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-black">Permit Required</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-700 list-disc pl-4 leading-relaxed">
                    <li><strong>Work Permit:</strong> Requires official "Part-Time Work Permit" (시간제취업 허가서) approved by university international coordinator and local immigration (HiKorea).</li>
                    <li><strong>TOPIK Level 3+:</strong> Up to <strong>20–25 hours per week</strong> during semester, unlimited hours during vacations and weekends.</li>
                    <li><strong>Below TOPIK 3:</strong> Capped at only <strong>10 hours per week</strong> to encourage Korean language improvement.</li>
                    <li><strong>Language Trainees (D-4):</strong> Must complete at least 6 months (2 terms) of studies with &gt;90% attendance before becoming eligible for part-time work.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-slate-900">💡 Practical Guidance for Students in Korea</h4>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[10px] font-black">Student Tips</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-700 list-disc pl-4 leading-relaxed">
                    <li><strong>Statutory Minimum Wage:</strong> National statutory minimum wage is <strong>₩9,860/hr</strong> across all provinces in South Korea.</li>
                    <li><strong>Permitted Sectors:</strong> General restaurant service, café staff, convenience stores (CU, GS25), translation, and on-campus administrative support.</li>
                    <li><strong>Strictly Prohibited:</strong> Factory manufacturing lines, construction labor, and entertainment establishments are strictly off-limits on student visas.</li>
                    <li><strong>ARC Registration:</strong> You must register for your Alien Registration Card (외국인등록증) before applying for the student work permit.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Direct Link to Jobs Board - Clean Light UI */}
            <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-indigo-950 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-black text-slate-900">
                  {isJapan ? 'Looking for student jobs (Arubaito) in Japan?' : 'Looking for student jobs (Alba) in Korea?'}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  {isJapan
                    ? 'Browse convenience store shifts, restaurant staff, and logistics sorting jobs strictly adhering to 28 hours/week.'
                    : 'Browse campus jobs, restaurant shifts, and student opportunities conforming strictly to Korean immigration regulations.'}
                </p>
              </div>
              <Link
                href={isJapan ? '/japan/jobs' : '/korea/jobs'}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider transition-colors shrink-0 shadow-xs"
              >
                {isJapan ? 'Explore Japan Student Jobs →' : 'Explore Korea Student Jobs →'}
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
