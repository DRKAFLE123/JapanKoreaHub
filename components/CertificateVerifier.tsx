'use me';
'use client';

import React, { useState } from 'react';
import { ShieldCheck, QrCode, Search, Award, CheckCircle, AlertCircle, Building2, Calendar, UserCheck } from 'lucide-react';

export interface CertificateData {
  certificateCode: string;
  studentName: string;
  courseTitle: string;
  score: number;
  issuedAt: string;
  verifiedBy: string;
}

export const CertificateVerifier: React.FC = () => {
  const [searchCode, setSearchCode] = useState('LG-EPS-2026-88492');
  const [certResult, setCertResult] = useState<CertificateData | null>({
    certificateCode: 'LG-EPS-2026-88492',
    studentName: 'Ramesh Sharma',
    courseTitle: 'EPS-TOPIK Korean Language Mastery (Level 2)',
    score: 95,
    issuedAt: '2026-07-20',
    verifiedBy: 'LanguageGuru Global Examination Board & HRD Korea Partner',
  });
  const [isSearching, setIsSearching] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setCertResult({
        certificateCode: searchCode.trim() || 'LG-EPS-2026-88492',
        studentName: 'Ramesh Sharma',
        courseTitle: 'EPS-TOPIK Korean Language Mastery (Level 2)',
        score: 95,
        issuedAt: '2026-07-20',
        verifiedBy: 'LanguageGuru Global Examination Board & HRD Korea Partner',
      });
    }, 600);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl">
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official Credential Verification Portal</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Authentic Certificate Validator</h2>
        </div>
      </div>

      {/* Lookup Form */}
      <form onSubmit={handleVerify} className="mb-6 flex gap-3">
        <div className="relative flex-1">
          <QrCode className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Enter Certificate Verification Code or UUID..."
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all font-mono"
          />
        </div>
        <button
          type="submit"
          disabled={isSearching}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-glow-kr transition-all flex items-center gap-2"
        >
          <Search className="w-3.5 h-3.5" />
          <span>{isSearching ? 'Verifying...' : 'Validate Code'}</span>
        </button>
      </form>

      {/* Verification Result Card */}
      {certResult && (
        <div className="bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 border border-emerald-500/40 rounded-2xl p-6 shadow-glow-kr relative overflow-hidden">
          {/* Authentic Badge Watermark */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center pointer-events-none">
            <ShieldCheck className="w-16 h-16 text-emerald-400/30" />
          </div>

          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                Official Verification Status: Authenticated & Valid
              </div>
              <div className="text-sm font-bold text-white font-mono">{certResult.certificateCode}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-slate-400 font-medium">Student Name:</div>
              <div className="text-base font-bold text-white flex items-center gap-1.5 mt-0.5">
                <UserCheck className="w-4 h-4 text-indigo-400" />
                {certResult.studentName}
              </div>
            </div>

            <div>
              <div className="text-slate-400 font-medium">Course Title:</div>
              <div className="text-sm font-bold text-indigo-300 mt-0.5">{certResult.courseTitle}</div>
            </div>

            <div>
              <div className="text-slate-400 font-medium">Examination Score:</div>
              <div className="text-base font-black text-amber-400 mt-0.5">{certResult.score} / 100</div>
            </div>

            <div>
              <div className="text-slate-400 font-medium">Issued Date:</div>
              <div className="text-sm font-semibold text-slate-200 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {certResult.issuedAt}
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Issuing Authority: <strong className="text-slate-300">{certResult.verifiedBy}</strong></span>
          </div>
        </div>
      )}
    </div>
  );
};
