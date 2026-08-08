'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, PlayCircle, BookOpen } from 'lucide-react';
import MobileNavbar from '@/components/layout/MobileNavbar';
import BottomTabBar from '@/components/layout/BottomTabBar';
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
      <div className="min-h-screen bg-slate-950 dark-compat">
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

  return (
    <div className="min-h-screen bg-white pb-24">
      <MobileNavbar user={null} lang="en" onLangToggle={() => {}} onSearchOpen={() => {}} />

      <main className="pt-14">
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

        {/* Syllabus Content (Placeholder) */}
        <section className="px-4 pt-4 pb-8">
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
                  <li>Vocabulary and Kanji</li>
                  <li>Grammar and Reading</li>
                  <li>Listening Comprehension</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </main>
      <BottomTabBar />
    </div>
  );
}
