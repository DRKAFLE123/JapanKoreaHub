import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { ShieldCheck, Award, ArrowLeft, Calendar, CheckCircle2, AlertCircle, Share2, Printer } from 'lucide-react';

interface VerifyCertificatePageProps {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({ params }: VerifyCertificatePageProps): Promise<Metadata> {
  const { code } = await params;
  return {
    title: `Certificate Verification (${code}) — JapanKoreaHub`,
    description: `Official authenticity verification record for certificate ${code} issued by JapanKoreaHub Global Examination Board.`,
  };
}

export default async function VerifyCertificatePage({ params }: VerifyCertificatePageProps) {
  const { code } = await params;
  const cleanCode = code.trim();

  // Load directly from database
  const cert = await db.certificate.findUnique({
    where: { certificateCode: cleanCode },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      course: {
        select: {
          id: true,
          title: true,
          language: true,
          level: true,
        },
      },
    },
  });

  if (!cert) {
    return (
      <main className="min-h-screen bg-slate-50 py-16 px-4 font-sans flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black uppercase tracking-wider">
              Verification Failed
            </span>
            <h1 className="text-xl font-black text-slate-900 mt-2">Certificate Not Found</h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              No official record matching code <strong className="text-slate-800 font-mono">{cleanCode}</strong> was found in our database. Please ensure the code was typed correctly.
            </p>
          </div>

          <div className="pt-4">
            <Link
              href="/exams"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Mock Exams</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const isJapan = cert.course?.language === 'JAPANESE';
  const flag = isJapan ? '🇯🇵' : '🇰🇷';
  const studentName = cert.user?.name || cert.user?.email || 'Certified Examinee';
  const issueDate = new Date(cert.issuedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen bg-slate-100 py-12 px-4 font-sans text-slate-900 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full space-y-6">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/exams"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-extrabold text-slate-700 hover:bg-slate-50 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Exams Hub
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Database Authenticated Record</span>
          </div>
        </div>

        {/* Certificate Card */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-2xl p-8 sm:p-12 relative overflow-hidden space-y-8">
          {/* Decorative Corner Watermarks */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full opacity-60 pointer-events-none blur-xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-50 rounded-full opacity-60 pointer-events-none blur-xl"></div>

          {/* Certificate Header */}
          <div className="text-center space-y-2 border-b border-slate-100 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-black uppercase tracking-widest text-slate-700">
              <span>{flag} JAPAN-KOREA LANGUAGE &amp; VOCATIONAL HUB</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              CERTIFICATE OF ACHIEVEMENT
            </h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              GLOBAL EXAMINATION &amp; VERIFICATION BOARD
            </p>
          </div>

          {/* Recipient & Score Body */}
          <div className="text-center space-y-4 py-2">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              This is to officially certify that
            </p>
            <h2 className="text-2xl sm:text-4xl font-black text-indigo-950 font-serif italic">
              {studentName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              has successfully undertaken the official timed computer-based examination for
            </p>
            <div className="inline-block px-5 py-2.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 font-extrabold text-sm sm:text-base">
              {cert.course?.title || 'Language Examination Course'}
            </div>
            <p className="text-xs text-slate-600">
              demonstrating high proficiency with a passing score of{' '}
              <strong className="text-emerald-700 font-black text-base">{cert.score}%</strong>.
            </p>
          </div>

          {/* Seal & Metadata Grid */}
          <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center text-center sm:text-left text-xs">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Date Issued</span>
              <p className="font-extrabold text-slate-800 flex items-center justify-center sm:justify-start gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{issueDate}</span>
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-400 bg-amber-50 mx-auto flex flex-col items-center justify-center text-amber-800 shadow-xs">
                <Award className="w-6 h-6 text-amber-600" />
                <span className="text-[8px] font-black uppercase">SEAL</span>
              </div>
            </div>

            <div className="space-y-1 text-center sm:text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400">Registry Code</span>
              <p className="font-mono font-black text-xs text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100 inline-block">
                {cert.certificateCode}
              </p>
            </div>
          </div>

          {/* Verification Barcode Note */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Official Verification Status: Active &amp; Valid in MySQL Database</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              ID: {cert.id}
            </span>
          </div>

        </div>

      </div>
    </main>
  );
}
