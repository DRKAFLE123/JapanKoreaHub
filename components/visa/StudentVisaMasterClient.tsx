'use client';
import React, { useState } from 'react';
import Link from 'next/link';
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

export default function StudentVisaMasterClient({ country }: StudentVisaMasterClientProps) {
  const { setCountryFocus } = useCountry();
  const isJapan = country === 'japan';

  const [activeSection, setActiveSection] = useState<
    'COLLEGES' | 'SCHOLARSHIPS' | 'TIPS_SOP' | 'PROCESS' | 'FINANCIALS' | 'CHECKLIST' | 'WORK_RIGHTS'
  >('COLLEGES');

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
      
      {/* Top Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 mb-8 relative overflow-hidden shadow-xl border border-slate-800">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-200 text-xs font-black uppercase tracking-wider">
                {isJapan ? '🇯🇵 Study in Japan Master Guide' : '🇰🇷 Study in Korea Master Guide'}
              </span>
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Updated for 2026/2027 Intakes
              </span>
            </div>

            {/* Country switcher */}
            <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-2xl border border-white/10">
              <Link
                href="/japan/visa/student"
                onClick={() => setCountryFocus('japan')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  isJapan ? 'bg-red-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                🇯🇵 Japan Study
              </Link>
              <Link
                href="/korea/visa/student"
                onClick={() => setCountryFocus('korea')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  !isJapan ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                🇰🇷 Korea Study
              </Link>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
            {isJapan
              ? 'Complete Master Guide to Student Visa (Ryugaku 留学) in Japan'
              : 'Complete Master Guide to Student Visa (D-2 / D-4 유학) in Korea'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            {isJapan
              ? 'Everything Nepali students need: choosing language schools & Senmon Gakko, MEXT scholarships, Statement of Purpose (SOP) blueprints, ward sponsor documents (Nata Pramanit), and Embassy Kathmandu interview readiness.'
              : 'The definitive roadmap for GKS scholarships, D-4 Korean language courses, D-2 degree admissions, Bank balance proof, Ward tax clearance, and TOPIK tuition merit waivers.'}
          </p>

          {/* Quick Inter-Link Navigation Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6 pt-5 border-t border-white/10">
            <Link
              href={isJapan ? '/japan/learn' : '/korea/learn'}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 hover:text-white transition-colors"
            >
              <BookOpen className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Study Materials</span>
            </Link>

            <Link
              href={isJapan ? '/japan/visa/interview' : '/korea/visa/interview'}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 hover:text-white transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Interview Prep</span>
            </Link>

            <Link
              href={isJapan ? '/japan/exams' : '/korea/exams'}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 hover:text-white transition-colors"
            >
              <ClipboardList className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Mock Test CBT</span>
            </Link>

            <Link
              href={isJapan ? '/japan/rooms' : '/korea/rooms'}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 hover:text-white transition-colors"
            >
              <HomeIcon className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Rooms &amp; Housing</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 mb-8 border-b border-slate-200 pb-3 overflow-x-auto">
        {[
          { key: 'COLLEGES', label: '1. Choosing Schools', icon: GraduationCap },
          { key: 'SCHOLARSHIPS', label: '2. Scholarships', icon: Award },
          { key: 'TIPS_SOP', label: '3. SOP & Guidance', icon: FileText },
          { key: 'PROCESS', label: '4. Visa Process', icon: Calendar },
          { key: 'FINANCIALS', label: '5. Sponsor & Ward Docs', icon: DollarSign },
          { key: 'CHECKLIST', label: '6. Document Checklist', icon: CheckSquare },
          { key: 'WORK_RIGHTS', label: '7. Student Work (28h)', icon: Clock },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeSection === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveSection(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                active
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
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
              <h3 className="text-sm font-black">Official Government Full-Ride Scholarships</h3>
              <p className="leading-relaxed">
                Both Japanese and Korean governments offer fully-funded scholarships covering 100% tuition, return airfare, and a substantial monthly living stipend. Nepali students can apply via the Embassy of Japan/Korea in Kathmandu or through direct university recommendations.
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
              <span>Statement of Purpose (SOP / 志望理由書 / 자기소개서) Framework</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your SOP is the single most scrutinized document by Immigration (Tokyo/Osaka Immigration in Japan, or Korea Immigration Service). Immigration officers look for authentic academic purpose rather than economic migrant motives.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <span className="font-black text-indigo-600 block">Paragraph 1: Hook &amp; Background</span>
                <p className="text-slate-600">Why this specific field? Connect your +2 or Bachelor’s major in Nepal with your career ambition.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <span className="font-black text-indigo-600 block">Paragraph 2: Why Japan / Korea?</span>
                <p className="text-slate-600">Why this specific country and city over English-speaking countries? Mention technology, work culture, or research facilities.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <span className="font-black text-indigo-600 block">Paragraph 3: Study Plan</span>
                <p className="text-slate-600">Language school curriculum, target JLPT/TOPIK score in Year 1, and intended college / major in Year 2.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <span className="font-black text-indigo-600 block">Paragraph 4: Career Plan</span>
                <p className="text-slate-600">Clear future trajectory (e.g. working in Japanese IT or returning to establish enterprise in Nepal).</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-rose-50/80 border border-rose-200 text-rose-950 space-y-2">
            <h3 className="text-sm font-black flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>How to Avoid Fake Consultancies &amp; Blacklisted Schools</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-rose-900 leading-relaxed list-disc pl-5">
              <li>Never pay tuition directly to local consultancy bank accounts! Tuition must be wire-transferred directly to the institution’s official bank account.</li>
              <li>Verify that the Japanese language school has a <strong>"Tekikoukou" (適正校 - Proper Accredited School)</strong> designation with over 90% student visa renewal success.</li>
              <li>Avoid consultancies promising "100% full-time work with guaranteed visa" — international student visas legally restrict work to 28 hours per week!</li>
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
                  title: 'Document Submission for COE (Japan) / CoA (Korea) (4–5 Months Before)',
                  desc: isJapan
                    ? 'All translated documents (Nata Pramanit, bank balance, property valuation, transcripts) submitted to Tokyo/Osaka Regional Immigration Bureau for Certificate of Eligibility (COE).'
                    : 'Application reviewed by university registrar. Upon academic clearance, university requests Certificate of Admission (CoA) / Visa Issuance Confirmation (CCVI).',
                },
                {
                  step: '03',
                  title: 'COE / CoA Grant & Tuition Wire Transfer (2 Months Before Intake)',
                  desc: 'Immigration grants your official Certificate of Eligibility. You will receive an invoice. Wire transfer tuition directly to the Japanese/Korean institution bank account via TT (Telegraphic Transfer).',
                },
                {
                  step: '04',
                  title: 'Embassy Kathmandu Visa Submission & VFS Appointment',
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
                  desc: 'Book flight ticket to Tokyo (Narita/Haneda), Osaka (Kansai), or Seoul (Incheon). Receive your Resident Card (Zairyu Card / ARC) directly at the airport immigration counter!',
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
                  <strong>NPR 18 to 25 Lakhs</strong> (approx ¥2.5M to ¥3M or $18,000–$20,000) maintained in a Class 'A' commercial bank of Nepal for 3 to 6 months. Bank statement must clearly explain the authentic source of funds (e.g. land sale, business turnover, or regular salary).
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
                  Tax clearance certificates for the last 3 consecutive fiscal years issued by the Inland Revenue Department (IRD) / local municipality. Incomplete or forged tax records trigger immediate COE rejections.
                </p>
              </div>

            </div>

            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-950 flex items-center justify-between">
              <div>
                <span className="font-bold">Need a template for Sponsor Letter of Guarantee (身元保証書)?</span>
                <p className="text-[11px] text-indigo-700">Download formatted bilingual Nepali &amp; Japanese/Korean financial guarantee forms.</p>
              </div>
              <button
                type="button"
                onClick={() => alert('Sponsor template package prepared for download.')}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-black text-xs cursor-pointer flex items-center gap-1.5 shrink-0"
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
                { id: 'doc3', title: 'Language Certificate (NAT-TEST / JLPT N5 or TOPIK Level 1/2)', cat: 'Applicant' },
                { id: 'doc4', title: 'Statement of Purpose (SOP / 志望理由書) in English & Japanese/Korean', cat: 'Applicant' },
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

      {/* TAB 7: STUDENT WORK RIGHTS (28 HOURS/WEEK) */}
      {activeSection === 'WORK_RIGHTS' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              <span>International Student Part-Time Work Regulations (Arubaito &amp; Alba)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              <div className="p-5 rounded-2xl bg-red-50/50 border border-red-100 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-red-950">🇯🇵 Japan: 28 Hours Rule</h4>
                  <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-800 text-[10px] font-black">Strict Law</span>
                </div>
                <ul className="space-y-1.5 text-slate-700 list-disc pl-4 leading-relaxed">
                  <li><strong>Work Permit:</strong> Stamp for "Permission to Engage in Activity Other Than Permitted" (資格外活動許可) granted free upon arrival at airport immigration.</li>
                  <li><strong>Term Time:</strong> Strictly maximum <strong>28 hours per week</strong> across all combined jobs.</li>
                  <li><strong>Vacation Period:</strong> Up to <strong>40 hours per week (8 hours/day)</strong> during official summer, winter, and spring breaks with school certificate.</li>
                  <li><strong>Prohibited Industries:</strong> Adult entertainment venues, pachinko parlors, and hostess bars are strictly illegal for student visa holders.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-blue-950">🇰🇷 Korea: TOPIK-Based Allowance</h4>
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-black">Permit Required</span>
                </div>
                <ul className="space-y-1.5 text-slate-700 list-disc pl-4 leading-relaxed">
                  <li><strong>Work Permit:</strong> Requires official "Part-Time Work Permit" (시간제취업 허가서) approved by university international coordinator and local immigration.</li>
                  <li><strong>TOPIK Level 3+:</strong> Up to <strong>20–25 hours per week</strong> during semester, unlimited hours during vacations.</li>
                  <li><strong>Below TOPIK 3:</strong> Capped at only <strong>10 hours per week</strong> to encourage Korean language improvement.</li>
                  <li><strong>Language Trainees (D-4):</strong> Must complete at least 6 months of studies before becoming eligible for part-time work permit.</li>
                </ul>
              </div>

            </div>

            {/* Direct Link to Jobs Board */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-black">Looking for verified student jobs in your city?</h4>
                <p className="text-xs text-slate-300">Browse convenience store shifts, restaurant staff, and night sorting jobs adhering strictly to legal hours.</p>
              </div>
              <Link
                href={isJapan ? '/japan/jobs' : '/korea/jobs'}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider transition-colors shrink-0"
              >
                Explore Student Job Board &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
