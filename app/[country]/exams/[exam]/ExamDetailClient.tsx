'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, PlayCircle, BookOpen } from 'lucide-react';

import { TimedExamEngine } from '@/components/TimedExamEngine';

interface Props {
  country: 'japan' | 'korea';
  exam: string;
}

export default function ExamDetailClient({ country, exam }: Props) {
  const [examStarted, setExamStarted] = useState(false);
  const cName = country === 'japan' ? 'Japan' : 'Korea';
  const language = country === 'japan' ? 'JAPANESE' : 'KOREAN';

  const examName = exam.toUpperCase().replace('-', ' ');

  if (examStarted) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <TimedExamEngine
          activeLanguage={language}
          onCompleteExam={(res) => {
            alert(`Exam completed! Score: ${res.score}`);
            setExamStarted(false);
          }}
        />
      </div>
    );
  }

  if (exam === 'kiip') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 font-sans">
        <main className="max-w-5xl mx-auto px-4 py-6 space-y-8">
          
          {/* Breadcrumb Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <Link href={`/${country}/exams`} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-xs transition-colors">
              <ArrowLeft className="w-4 h-4 text-indigo-600" />
              Back to {cName} Exams Hub
            </Link>
            <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black uppercase">
              Ministry of Justice (법무부) Program
            </span>
          </div>

          {/* Hero Banner Box */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-500/20 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl">🇰🇷</span>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400">Official Immigration Track</span>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                  KIIP (사회통합프로그램) Full Guide
                </h1>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-3xl">
              The <strong>Korea Immigration &amp; Integration Program (KIIP / 사회통합프로그램)</strong> is an official government education framework administered by the Korean Ministry of Justice (법무부). Designed for foreign residents, it provides free Korean language and culture education, serving as the primary fast-track pathway for <strong>E-7-4 point upgrades, F-2-7 residency visas, F-5 Permanent Residence (영주권), and Naturalization/Citizenship (귀화)</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setExamStarted(true)}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <PlayCircle className="w-4 h-4" /> Start KIIP Practice Test
              </button>
              <Link
                href="/blog/kiip-korea-immigration-integration-program-nepali-guide"
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" /> Read KIIP Nepali Blog
              </Link>
              <Link
                href="/blog/kiip-korea-immigration-integration-program-full-english-guide"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-emerald-400" /> Read KIIP English Blog
              </Link>
            </div>
          </div>

          {/* Section 1: KIIP Course Structure & Levels (0 to 5) */}
          <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <span className="text-indigo-600">📚</span> KIIP Course Levels &amp; Class Hours (단계별 과정)
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                The program consists of 6 progressive levels (Level 0 through Level 5), totaling up to 515 study hours depending on initial placement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { lvl: 'Level 0', title: 'Beginner Korean (기초)', hours: '15 Hours', score: 'Score 0 – 29 Pts', desc: 'Hangul alphabet, basic greetings, foundation numbers.' },
                { lvl: 'Level 1', title: 'Elementary 1 (초급 1)', hours: '100 Hours', score: 'Score 30 – 49 Pts', desc: 'Basic daily conversation, shopping, ordering food.' },
                { lvl: 'Level 2', title: 'Elementary 2 (초급 2)', hours: '100 Hours', score: 'Score 50 – 69 Pts', desc: 'Workplace interactions, family life, hobbies (~TOPIK Level 2).' },
                { lvl: 'Level 3', title: 'Intermediate 1 (중급 1)', hours: '100 Hours', score: 'Score 70 – 84 Pts', desc: 'Complex social expressions, banking, public services.' },
                { lvl: 'Level 4', title: 'Intermediate 2 (중급 2)', hours: '100 Hours', score: 'Score 85 – 100 Pts', desc: 'News reading, indirect speech, opinion generation (~TOPIK 4).' },
                { lvl: 'Level 5', title: 'Understanding Korean Society (한국사회 이해)', hours: '70 / 100 Hours', score: 'Passed Midterm / Level 4', desc: 'Korean politics, history, geography, law & culture. 70h for PR (영주), 100h for Citizenship (귀화).' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 hover:border-indigo-300 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-lg bg-indigo-600 text-white font-black text-xs">
                      {item.lvl}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {item.hours}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                  <p className="text-[11px] font-semibold text-indigo-700">Placement Req: {item.score}</p>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: KIIP Exams (Placement, Midterm, Final Comprehensive) */}
          <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <span className="text-rose-600">📝</span> KIIP Official Examination Architecture (평가 종류)
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Evaluation tests administered during your KIIP progression journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white font-black text-xs flex items-center justify-center">1</div>
                <h3 className="font-black text-base text-slate-900">Placement Test (사전평가)</h3>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  Conducted before taking classes to evaluate your current Korean level (50 questions + brief speaking evaluation). Assigns you directly to Level 0, 1, 2, 3, 4, or 5.
                </p>
                <span className="inline-block text-[11px] font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300">
                  💡 Note: Valid TOPIK scores can exempt you from the Placement Test!
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center">2</div>
                <h3 className="font-black text-base text-slate-900">Midterm Exam (중간평가)</h3>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  Taken after completing Level 4 (Intermediate 2). Passing score: 60/100 points. Allows entry into Level 5 (Understanding Korean Society).
                </p>
                <span className="inline-block text-[11px] font-bold text-blue-900 bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-300">
                  Passing Level 4 unlocks major points for E-7-4 &amp; F-2-7 visa point systems!
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center">3</div>
                <h3 className="font-black text-base text-slate-900">Comprehensive Exam (종합평가)</h3>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  Final exam taken after Level 5 coursework. Split into <strong>Permanent Residency Track (영주용)</strong> and <strong>Naturalization Track (귀화용)</strong>.
                </p>
                <span className="inline-block text-[11px] font-bold text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-300">
                  Grants official Ministry of Justice Certificate (이수증) for life.
                </span>
              </div>
            </div>
          </section>

          {/* Section 3: TOPIK vs KIIP Comprehensive Comparison Matrix */}
          <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <span className="text-purple-600">⚖️</span> TOPIK vs. KIIP Detailed Comparison (비교 분석)
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Key structural differences between academic TOPIK and immigration-focused KIIP.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-900 font-black uppercase">
                    <th className="px-4 py-3">Metric Feature</th>
                    <th className="px-4 py-3 text-indigo-700">TOPIK (한국어능력시험)</th>
                    <th className="px-4 py-3 text-emerald-700">KIIP (사회통합프로그램)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-bold bg-slate-50 text-slate-900">Governing Body</td>
                    <td className="px-4 py-3">Ministry of Education (NIIED / 국립국제교육원)</td>
                    <td className="px-4 py-3 font-bold text-emerald-800">Ministry of Justice (법무부 / Socinet)</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-bold bg-slate-50 text-slate-900">Primary Objective</td>
                    <td className="px-4 py-3">University admissions, academic proficiency, job applications</td>
                    <td className="px-4 py-3 font-bold text-emerald-800">Immigration settlement, Visa Point System, PR (F-5), Citizenship</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-bold bg-slate-50 text-slate-900">Format &amp; Requirement</td>
                    <td className="px-4 py-3">Exam paper only (No class attendance required)</td>
                    <td className="px-4 py-3">Mandatory class attendance (0–515 hrs) + Evaluations</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-bold bg-slate-50 text-slate-900">Tuition Fee</td>
                    <td className="px-4 py-3">Exam fee (~NPR 3,000–3,500 / KRW 40,000–55,000)</td>
                    <td className="px-4 py-3 font-bold text-emerald-800">100% Free Tuition (Government Funded classes)</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-bold bg-slate-50 text-slate-900">Validity Period</td>
                    <td className="px-4 py-3 text-rose-700 font-bold">2 Years Only (Expires automatically)</td>
                    <td className="px-4 py-3 font-bold text-emerald-800">Lifetime Permanent Qualification (평생 유효)</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-bold bg-slate-50 text-slate-900">Visa Point Bonus</td>
                    <td className="px-4 py-3">Standard points for E-7-4 / F-2-7</td>
                    <td className="px-4 py-3 font-bold text-emerald-800">Maximum bonus points + Exempts written naturalization exam &amp; interview</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: How to Register & Class Formats */}
          <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
            <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2 text-white">
              <span className="text-emerald-400">🌐</span> How to Register &amp; Class Schedules (신청 방법)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 leading-relaxed font-medium">
              <div className="space-y-3 bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                <h3 className="font-black text-sm text-emerald-400 uppercase">1. Portal Registration (Soci-Net)</h3>
                <p>
                  Visit the official Ministry of Justice portal <a href="https://www.socinet.go.kr" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline font-bold">www.socinet.go.kr</a>. Create an account using your Alien Registration Card (ARC / 외국인등록증).
                </p>
                <p>
                  Apply for the <strong>Placement Test (사전평가)</strong> or submit your valid TOPIK score certificate to link your proficiency level.
                </p>
              </div>

              <div className="space-y-3 bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                <h3 className="font-black text-sm text-emerald-400 uppercase">2. Flexible Class Schedules</h3>
                <p>
                  Classes are offered across multicultural centers, universities, and immigration offices nationwide.
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-200">
                  <li><strong>Weekday Morning/Afternoon:</strong> For full-time students or domestic residents.</li>
                  <li><strong>Night &amp; Weekend Classes:</strong> Specifically tailored for E-9, E-7, and worker visa holders.</li>
                  <li><strong>Online Blended Classes:</strong> Video lecture modules supported via Korea Immigration Service portal.</li>
                </ul>
              </div>
            </div>
          </section>

        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <main className="max-w-4xl mx-auto pb-24">
        {/* Breadcrumb */}
        <div className="px-4 pt-4 pb-2">
          <Link href={`/${country}/exams`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to {cName} Exams
          </Link>
        </div>

        {/* Header */}
        <section className="px-4 py-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-gray-50 text-gray-700 text-sm font-medium mb-3 uppercase tracking-wider">
            {country === 'japan' ? '🇯🇵' : '🇰🇷'} {examName}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{examName} Preparation</h1>
          <p className="text-sm text-gray-500 mt-1">Syllabus, mock tests, and passing strategies</p>
        </section>

        {/* Actions */}
        <section className="px-4 py-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => setExamStarted(true)}
            className="flex flex-col items-center justify-center p-4 bg-gray-900 text-white rounded-2xl shadow-sm hover:bg-gray-800 transition-colors active:scale-[0.98]"
          >
            <PlayCircle className="w-6 h-6 mb-2" />
            <span className="font-semibold text-sm">Start Mock Test</span>
          </button>
          <button
            className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl shadow-sm hover:bg-gray-100 transition-colors active:scale-[0.98]"
          >
            <BookOpen className="w-6 h-6 mb-2 text-gray-600" />
            <span className="font-semibold text-sm">View Syllabus</span>
          </button>
        </section>

        {/* Syllabus Content */}
        <section className="px-4 pt-4 pb-8 space-y-6">
          <div className="card p-5">
            <h2 className="font-bold text-lg text-gray-900 border-b border-gray-100 pb-3 mb-4">Exam Overview</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Test Duration</p>
                <p className="text-sm text-gray-900 mt-0.5">Approx. 105 minutes</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Passing Score</p>
                <p className="text-sm text-gray-900 mt-0.5">Overall: 80/180 marks. Must meet sectional minimums.</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Key Sections</p>
                <ul className="list-disc list-inside text-sm text-gray-900 mt-1 space-y-1">
                  <li>Vocabulary and Listening</li>
                  <li>Grammar and Reading</li>
                  <li>Mock Question Drills</li>
                </ul>
              </div>
            </div>
          </div>

          {/* TOPIK vs KIIP & Strategy Guides Card */}
          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-xl border border-indigo-500/20 space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <h3 className="font-black text-lg text-white">Recommended Strategy Guides &amp; KIIP Fast-Track</h3>
            </div>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              Preparing for Korean proficiency or long-term residency? Access our full 6-month TOPIK roadmap and Ministry of Justice KIIP course guide.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <Link
                href="/blog/topik-ii-level-3-6-month-strategy-nepali-guide"
                className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all space-y-1 group"
              >
                <div className="flex items-center justify-between text-xs text-amber-400 font-black">
                  <span>6-Month Strategy Guide</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <h4 className="font-bold text-sm text-white leading-tight">0 देखि TOPIK II Level 3 सम्म ६-महिने रणनीति</h4>
                <p className="text-[11px] text-slate-300">Complete roadmap, grammar equations &amp; Q53 essay templates in Nepali.</p>
              </Link>

              <Link
                href="/korea/exams/kiip"
                className="p-4 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 transition-all space-y-1 group"
              >
                <div className="flex items-center justify-between text-xs text-emerald-400 font-black">
                  <span>KIIP &amp; TOPIK vs KIIP</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <h4 className="font-bold text-sm text-white leading-tight">KIIP (사회통합프로그램) Full Overview</h4>
                <p className="text-[11px] text-emerald-200">Level 0–5 course hours, exams &amp; TOPIK vs KIIP comparison matrix.</p>
              </Link>

              <Link
                href="/blog/kiip-korea-immigration-integration-program-nepali-guide"
                className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all space-y-1 group"
              >
                <div className="flex items-center justify-between text-xs text-indigo-300 font-black">
                  <span>Nepali Blog Guide</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <h4 className="font-bold text-sm text-white leading-tight">KIIP भिसा (E-7-4, F-2-7), PR (F-5) पूर्ण गाइड</h4>
                <p className="text-[11px] text-slate-300">Socinet registration, exam points &amp; PR waivers.</p>
              </Link>

              <Link
                href="/blog/kiip-korea-immigration-integration-program-full-english-guide"
                className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all space-y-1 group"
              >
                <div className="flex items-center justify-between text-xs text-sky-300 font-black">
                  <span>English Blog Guide</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <h4 className="font-bold text-sm text-white leading-tight">KIIP Ultimate Guide (English)</h4>
                <p className="text-[11px] text-slate-300">Detailed course levels, visa points calculation &amp; naturalization.</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
