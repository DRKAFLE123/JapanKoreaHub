'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Briefcase,
  Award,
  ShieldCheck,
  DollarSign,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BookOpen,
  ClipboardList,
  MessageSquare,
  Building,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useCountry } from '@/lib/context/CountryContext';

interface WorkingVisaMasterClientProps {
  country: 'japan' | 'korea';
  initialType?: string;
}

type WorkSection = 'VISAS' | 'ELIGIBILITY' | 'PIPELINE' | 'WAGES_RIGHTS';

const WORK_TAB_SLUG_MAP: Record<string, WorkSection> = {
  'visas': 'VISAS',
  'types': 'VISAS',
  'eligibility': 'ELIGIBILITY',
  'requirements': 'ELIGIBILITY',
  'pipeline': 'PIPELINE',
  'process': 'PIPELINE',
  'recruitment': 'PIPELINE',
  'wages-rights': 'WAGES_RIGHTS',
  'wages': 'WAGES_RIGHTS',
  'rights': 'WAGES_RIGHTS',
  'pension': 'WAGES_RIGHTS',
};

const WORK_TABS = [
  { key: 'VISAS' as WorkSection, slug: 'visas', label: '1. All Work Visa Types', icon: Briefcase },
  { key: 'ELIGIBILITY' as WorkSection, slug: 'eligibility', label: '2. Requirements & Eligibility', icon: ShieldCheck },
  { key: 'PIPELINE' as WorkSection, slug: 'pipeline', label: '3. Step-by-Step Recruitment', icon: Calendar },
  { key: 'WAGES_RIGHTS' as WorkSection, slug: 'wages-rights', label: '4. Wages, Overtime & Pension', icon: DollarSign },
];

export default function WorkingVisaMasterClient({ country, initialType = 'work' }: WorkingVisaMasterClientProps) {
  const { setCountryFocus } = useCountry();
  const isJapan = country === 'japan';

  const searchParams = useSearchParams();
  const rawTab = searchParams.get('tab')?.toLowerCase();
  const initialSection: WorkSection = (rawTab && WORK_TAB_SLUG_MAP[rawTab]) ? WORK_TAB_SLUG_MAP[rawTab] : 'VISAS';

  const [activeSection, setActiveSection] = useState<WorkSection>(initialSection);

  useEffect(() => {
    const qTab = searchParams.get('tab')?.toLowerCase();
    if (qTab && WORK_TAB_SLUG_MAP[qTab]) {
      setActiveSection(WORK_TAB_SLUG_MAP[qTab]);
    }
  }, [searchParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-24 font-sans">
      
      {/* Hero Banner - Clean, Light & Minimalist UI */}
      <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 mb-6 shadow-xs space-y-4 font-sans">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black uppercase tracking-wider">
              {isJapan ? '🇯🇵 Work Visa & Career Master Guide' : '🇰🇷 Korea Work Visa & EPS Master Guide'}
            </span>
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              2026 Statutory Regulations
            </span>
          </div>

          {/* Country switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <Link
              href="/japan/visa/work"
              onClick={() => setCountryFocus('japan')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                isJapan
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-black'
                  : 'text-slate-600 hover:text-slate-900 font-bold'
              }`}
            >
              🇯🇵 Japan Work
            </Link>
            <Link
              href="/korea/visa/work"
              onClick={() => setCountryFocus('korea')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                !isJapan
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-black'
                  : 'text-slate-600 hover:text-slate-900 font-bold'
              }`}
            >
              🇰🇷 Korea Work
            </Link>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            {isJapan
              ? 'Complete Guide to Working Visas in Japan: SSW-1, SSW-2 & Gijinkoku'
              : 'Complete Guide to Korea Employment Visas: EPS E-9 & E-7-4 Point System'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            {isJapan
              ? 'Everything Nepali candidates need: Specified Skilled Worker (SSW-1/2 across 12 approved sectors), Gijinkoku Engineer/Humanities visas, statutory minimum wages, pension refunds, and permanent residency roadmaps.'
              : 'The comprehensive blueprint for EPS E-9 manufacturing rosters, E-7-4 skilled worker point system upgrades, statutory wages, overtime premiums, and long-term residency pathways in South Korea.'}
          </p>
        </div>

        {/* Quick Inter-Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-slate-100">
          <Link
            href={isJapan ? '/japan/exams/skills' : '/korea/exams'}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors shadow-2xs"
          >
            <Award className="w-4 h-4 text-slate-500 shrink-0" />
            <span>Sector Skill Tests</span>
          </Link>

          <Link
            href={isJapan ? '/japan/learn' : '/korea/learn'}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors shadow-2xs"
          >
            <BookOpen className="w-4 h-4 text-slate-500 shrink-0" />
            <span>Workplace Language</span>
          </Link>

          <Link
            href={isJapan ? '/japan/visa/interview' : '/korea/visa/interview'}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors shadow-2xs"
          >
            <MessageSquare className="w-4 h-4 text-slate-500 shrink-0" />
            <span>Job Interview Prep</span>
          </Link>

          <Link
            href={isJapan ? '/japan/jobs' : '/korea/jobs'}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors shadow-2xs"
          >
            <Briefcase className="w-4 h-4 text-slate-500 shrink-0" />
            <span>Jobs Board</span>
          </Link>
        </div>
      </div>

      {/* Navigation Tabs - SEO Friendly Links to Slugs */}
      <div className="flex items-center gap-1.5 mb-8 border-b border-slate-200 pb-3 overflow-x-auto">
        {WORK_TABS.map((tab) => {
          const Icon = tab.icon;
          const active = activeSection === tab.key;
          return (
            <Link
              key={tab.key}
              href={`/${country}/visa/work?tab=${tab.slug}`}
              scroll={false}
              onClick={() => setActiveSection(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all shrink-0 border ${
                active
                  ? 'bg-indigo-600 text-white shadow-xs border-indigo-600'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-transparent'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>

      {/* TAB 1: ALL WORK VISA TYPES */}
      {activeSection === 'VISAS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {isJapan ? (
              <>
                {/* SSW-1 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-black text-slate-900">SSW-1 (特定技能1号 - Specified Skilled Worker 1)</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-black">12 Sectors</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      Allows foreign nationals to work in 12 labor-shortage sectors (Caregiving, Food Service, Building Cleaning, Agriculture, Accommodation, Construction, Manufacturing, etc.).
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-700 mt-3">
                      <li><strong>Duration:</strong> Up to 5 consecutive years.</li>
                      <li><strong>Language:</strong> JLPT N4 or JFT-Basic (A2).</li>
                      <li><strong>Skill Exam:</strong> Prometric Computer-Based CBT Test for your chosen sector.</li>
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-slate-100 text-xs font-bold text-slate-600 flex items-center justify-between">
                    <span>Pathway to SSW-2 &amp; Indefinite Stay</span>
                    <Link href="/japan/exams/skills" className="hover:underline flex items-center gap-1">
                      Prep Skill Exams &rarr;
                    </Link>
                  </div>
                </div>

                {/* SSW-2 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-black text-slate-900">SSW-2 (特定技能2号 - Specified Skilled Worker 2)</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-black">Family &amp; PR!</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      Advanced skilled worker visa for experienced professionals who pass the Level 2 exam or have supervisor experience.
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-700 mt-3">
                      <li><strong>Duration:</strong> Indefinite renewals (no 5-year limit!).</li>
                      <li><strong>Family Sponsorship:</strong> Bring your spouse and children to live in Japan!</li>
                      <li><strong>Permanent Residency:</strong> Eligible for Japan Permanent Residency (PR) after 10 years!</li>
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-slate-100 text-xs font-bold text-slate-600">
                    ✓ Full Family Dependent Visa Rights
                  </div>
                </div>

                {/* Gijinkoku */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-black text-slate-900">Engineer / Specialist in Humanities (Gijinkoku 技術・人文知識・国際業務)</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-black">White Collar</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      White-collar professional corporate visa for Software Engineers, Business Translators, Marketing Executives, and Accountants.
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-700 mt-3">
                      <li><strong>Requirements:</strong> 4-Year University Degree (Bachelor’s) or 2-Year Japanese Senmon Gakko Diploma.</li>
                      <li><strong>Renewals:</strong> 1, 3, or 5-year renewals indefinitely.</li>
                      <li><strong>Family:</strong> Can sponsor spouse and kids as dependents.</li>
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-slate-100 text-xs font-bold text-slate-600">
                    ✓ Corporate salary scale &amp; annual bonuses
                  </div>
                </div>

                {/* HSP */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-black text-slate-900">Highly Skilled Professional (高度専門職 - HSP)</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-black">Fast-Track PR</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      Point-based immigration system evaluating academic degrees, annual salary, work experience, and JLPT N1 score.
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-700 mt-3">
                      <li><strong>70 Points:</strong> Eligible for Japan Permanent Residency in just 3 years!</li>
                      <li><strong>80 Points:</strong> Eligible for Permanent Residency in just 1 single year!</li>
                      <li><strong>Perks:</strong> Parent invitation for childcare and domestic helper sponsorship.</li>
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-slate-100 text-xs font-bold text-slate-600">
                    ✓ Fastest pathway to Permanent Residency
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* E-9 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-black text-slate-900">E-9 Non-Professional Employment (비전문취업) via EPS</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-black">Govt System</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      Official G2G (Government-to-Government) program administered by HRD Korea and Nepal EPS Office for manufacturing, agriculture, construction, and fisheries.
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-700 mt-3">
                      <li><strong>Stay Period:</strong> 3 Years + 1 Year 10 Months (Total 4 Years 10 Months).</li>
                      <li><strong>Re-entry:</strong> Sincere workers can return for a 2nd term (Total 9 Years 8 Months).</li>
                      <li><strong>Requirement:</strong> Pass official EPS-TOPIK Computer-Based CBT Exam.</li>
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-slate-100 text-xs font-bold text-slate-600">
                    ✓ Zero private agency fees (Strictly government-managed)
                  </div>
                </div>

                {/* E-7-4 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-black text-slate-900">E-7-4 Skilled Foreign Worker Point System (숙련기능인력)</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-black">E-9 Upgrade!</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      The premier upgrade path for E-9 workers to transition into long-term residency without ever having to return to Nepal!
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-700 mt-3">
                      <li><strong>Points Matrix (300 pts total):</strong> Annual salary, TOPIK / KIIP level, age, continuous tenure at company.</li>
                      <li><strong>Indefinite Renewals:</strong> 2-year renewals indefinitely with pathway to F-2 Resident &amp; F-5 PR!</li>
                      <li><strong>Family Invitation:</strong> Invite your spouse and children to South Korea with full work rights!</li>
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-slate-100 text-xs font-bold text-slate-600">
                    ✓ High quota expansion (35,000+ slots allocated annually)
                  </div>
                </div>

                {/* E-7 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-black text-slate-900">E-7 Specific Job (특정활동) Professional Visa</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-black">Specialists</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      For university graduates and skilled specialists in 85 designated fields (Software, Shipbuilding, Hotel Management, Chemical Engineering).
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-700 mt-3">
                      <li><strong>Degree:</strong> Master’s degree or Bachelor’s with 1 year relevant work experience.</li>
                      <li><strong>Korean Salary Benchmark:</strong> Must exceed 80% of Korea’s Gross National Income (GNI).</li>
                      <li><strong>Family:</strong> Can sponsor dependents (F-3 visa).</li>
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-slate-100 text-xs font-bold text-purple-600">
                    ✓ High job mobility across licensed employers
                  </div>
                </div>

                {/* D-10 */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-black text-slate-900">D-10 Job Seeker Visa (구직 비자)</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-black">Bridge Visa</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      Allows Korean university graduates (D-2 alumni) up to 2 years to stay in Korea and interview for E-7 corporate sponsorship.
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-700 mt-3">
                      <li><strong>Point System:</strong> Requires 60 points out of 190 on the D-10 point matrix.</li>
                      <li><strong>Internships:</strong> Legal paid internships allowed while seeking permanent contracts.</li>
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-slate-100 text-xs font-bold text-amber-700">
                    ✓ Essential bridge from student to full employee
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: ELIGIBILITY & REQUIREMENTS */}
      {activeSection === 'ELIGIBILITY' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-black text-slate-900">Requirements &amp; Document Benchmarks</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="font-black text-indigo-600 block">1. Language Benchmarks</span>
                <p className="text-slate-600 leading-relaxed">
                  {isJapan
                    ? 'SSW-1 requires JLPT N4 or JFT-Basic A2. Gijinkoku engineering roles usually require N3/N2. Translation and hospitality require N2/N1.'
                    : 'EPS E-9 requires passing the EPS-TOPIK CBT exam (scoring in top cut-off for the year). E-7-4 upgrade requires TOPIK Level 2–3 or KIIP Stage 2–3.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="font-black text-indigo-600 block">2. Skills Certification</span>
                <p className="text-slate-600 leading-relaxed">
                  {isJapan
                    ? 'Prometric CBT Skill Evaluation Test pass certificate for your sector (Caregiving, Food Service, Building Cleaning, Agriculture, etc.).'
                    : 'Skill test and physical endurance evaluation (color vision, grip strength, weight lifting) during EPS round 2.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="font-black text-indigo-600 block">3. Medical &amp; Police Clearance</span>
                <p className="text-slate-600 leading-relaxed">
                  Police clearance certificate from Nepal Police Headquarters with no felony convictions. Comprehensive chest X-ray and health check at authorized clinic.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STEP-BY-STEP RECRUITMENT PIPELINE */}
      {activeSection === 'PIPELINE' && (
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
            <h3 className="text-base font-black text-slate-900">
              {isJapan ? 'SSW-1 Official Recruitment Pipeline' : 'EPS E-9 Official Recruitment Pipeline'}
            </h3>

            <div className="space-y-4">
              {[
                {
                  step: '01',
                  title: isJapan ? 'Language & Sector Skill Exam Passing' : 'EPS-TOPIK Computer-Based CBT Exam',
                  desc: isJapan
                    ? 'Clear JLPT N4 or JFT-Basic + Prometric Sector Skill Test. Pass results are issued instantly on your Prometric account.'
                    : 'Register for EPS exam through Nepal DoFE portal. Take test at EPS CBT Center, Bhaisepati, Lalitpur.',
                },
                {
                  step: '02',
                  title: isJapan ? 'Employer Matching & Video Interview' : 'Job Roster Registration (HRD Korea)',
                  desc: isJapan
                    ? 'Match with Japanese recruiting company or registered support organization (Toroku Shien Kikan). Conduct video interview in basic Japanese.'
                    : 'Successful candidates added to HRD Korea job roster (Job seekers pool) valid for 2 years.',
                },
                {
                  step: '03',
                  title: isJapan ? 'Employment Contract Signing (Koyou Keiyakusho)' : 'Standard Labor Contract (표준근로계약서)',
                  desc: 'Sign official bilateral employment contract detailing exact hourly/monthly wage, working hours, social insurance, and housing deductions.',
                },
                {
                  step: '04',
                  title: isJapan ? 'Immigration COE Application' : 'CCVI Certificate & Visa Issuance',
                  desc: isJapan
                    ? 'Employer files Certificate of Eligibility (COE) with Regional Immigration Bureau in Japan.'
                    : 'Korean employer obtains Visa Issuance Confirmation (CCVI) from Korea Immigration Service.',
                },
                {
                  step: '05',
                  title: 'Embassy Kathmandu Visa Stamping & Pre-Departure Training',
                  desc: 'Submit passport to Embassy of Japan / Korea in Kathmandu. Attend mandatory pre-departure labor orientation and obtain foreign employment labor permit (Shramik).',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="w-9 h-9 rounded-2xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
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

      {/* TAB 4: WAGES, OVERTIME & PENSION */}
      {activeSection === 'WAGES_RIGHTS' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          <h3 className="text-base font-black text-slate-900">
            {isJapan ? 'Statutory Labor Protections in Japan (労働基準法)' : 'Korean Labor Standards Act (근로기준법)'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Statutory Minimum Wage
              </span>
              <span className="text-lg font-black text-slate-900">
                {isJapan ? '¥1,055 – ¥1,113 / hr' : '₩10,030 / hr (₩2,096,270 / mo)'}
              </span>
              <span className="text-[11px] text-slate-500 block">Guaranteed baseline for 209 regular hours</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Overtime &amp; Night Premium
              </span>
              <span className="text-lg font-black text-emerald-600">+25% to +50%</span>
              <span className="text-[11px] text-slate-500 block">Overtime 1.25x &middot; Holiday work 1.35x</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Social Insurance
              </span>
              <span className="text-lg font-black text-indigo-600">Full Coverage</span>
              <span className="text-[11px] text-slate-500 block">Health, Pension, Unemployment, Injury</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-2 text-xs text-emerald-950">
            <h4 className="font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Pension Lump-Sum Refund (脱退一時金 / Return Cost Insurance)</span>
            </h4>
            <p className="leading-relaxed">
              Foreign workers who pay into the national pension system are legally entitled to a lump-sum refund upon permanently departing Japan or Korea. In Japan, workers can claim back up to 5 years of pension contributions (typically ¥450,000 to ¥1,200,000). In Korea, the Departure Guarantee Insurance and Return Cost Insurance are refunded directly at Incheon International Airport!
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
