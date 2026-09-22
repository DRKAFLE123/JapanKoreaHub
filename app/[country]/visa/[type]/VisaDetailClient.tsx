'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';
import VisaTrustBanner from '@/components/visa/VisaTrustBanner';
import { useTranslation } from '@/lib/i18n/LanguageContext';

interface Props {
  country: 'japan' | 'korea';
  type: string;
}

const OFFICIAL_SOURCES: Record<string, { name: string; url: string; date: string }> = {
  japan: { name: 'Ministry of Foreign Affairs (MOFA)', url: 'https://www.mofa.go.jp/j_info/visit/visa/', date: 'August 8, 2026' },
  korea: { name: 'Korea Visa Portal', url: 'https://www.visa.go.kr/', date: 'August 8, 2026' },
};

export default function VisaDetailClient({ country, type }: Props) {
  const { lang, langMode } = useTranslation();
  const isNe = lang === 'ne' || langMode === 'ne';

  const cName = country === 'japan' ? (isNe ? 'जापान' : 'Japan') : (isNe ? 'कोरिया' : 'Korea');
  const typeName = type.toUpperCase();
  const source = OFFICIAL_SOURCES[country];

  const checklistItems = isNe
    ? [
        'सक्कल राहदानी (कम्तीमा ६ महिना म्याद बाँकी भएको)',
        'पूर्ण रूपमा भरिएको भिसा आवेदन फारम',
        'हालसालै खिचिएको पासपोर्ट साइजको रंगीन फोटो',
        'योग्यता प्रमाणपत्र (COE) / भिसा जारी पुष्टि नम्बर (CCVI)',
        'आर्थिक सहयोग कागजात (बैंक मौज्दात तथा स्टेटमेन्ट)',
        'शैक्षिक प्रमाणपत्रहरू (चारित्रिक तथा शैक्षिक ट्रान्सक्रिप्ट)',
      ]
    : [
        'Valid Passport (at least 6 months validity)',
        'Completed Visa Application Form',
        'Recent Passport-sized Photograph',
        'Certificate of Eligibility (COE) / Visa Issuance Number',
        'Financial Support Documents (Bank Statement)',
        'Educational Certificates',
      ];

  return (
    <div className="min-h-screen bg-white pb-24 font-sans">
      <main className="max-w-4xl mx-auto pb-24">
        {/* Breadcrumb */}
        <div className="px-4 pt-4 pb-2">
          <Link href={`/${country}/visa`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            {isNe ? `फर्कनुहोस्: ${cName} भिसा गाइड` : `Back to ${cName} Visa Guide`}
          </Link>
        </div>

        {/* Header */}
        <section className="px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">{typeName} Visa</h1>
          <p className="text-sm text-gray-500 mt-1">
            {isNe ? 'आवेदन प्रक्रिया र आवश्यक कागजातहरूको विवरण' : 'Application process and required documents'}
          </p>
        </section>

        {/* Trust Banner - REQUIRED */}
        <section className="px-4 pb-4">
          <VisaTrustBanner
            officialSource={source.name}
            sourceUrl={source.url}
            lastVerifiedAt={source.date}
          />
        </section>

        {/* Requirements Checklist */}
        <section className="px-4 pb-6">
          <div className="card p-5 border border-slate-200 rounded-2xl bg-white shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
              <FileCheck className="w-5 h-5 text-gray-700" />
              <h2 className="font-bold text-lg text-gray-900">
                {isNe ? 'आवश्यक कागजात चेकलिस्ट' : 'Document Checklist'}
              </h2>
            </div>
            
            <ul className="space-y-3">
              {checklistItems.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Professional Assistance */}
        <section className="px-4 pb-6">
          <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-3">
            {isNe ? '🤝 व्यावसायिक परामर्श सेवा' : '🤝 Professional Assistance · Paid Service'}
          </p>
          <div className="card p-5 bg-blue-50 border border-blue-100 rounded-2xl shadow-xs">
            <h3 className="font-bold text-gray-900 mb-2">
              {isNe ? 'आवेदन प्रक्रियामा मद्दत चाहिन्छ?' : 'Need help with your application?'}
            </h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {isNe
                ? 'हाम्रा अनुभवी भिसा कन्सल्टेन्टहरूले तपाईंका कागजात पुनरावलोकन गर्न, फारम भर्न र दूतावास अन्तर्वार्ताको पूर्ण तयारी गर्न मद्दत गर्नेछन्।'
                : 'Our verified visa consultants can review your documents, help you fill out forms, and prepare you for the embassy interview.'}
            </p>
            <Link
              href="/consultancy"
              className="inline-flex items-center justify-center w-full gap-2 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl hover:bg-blue-700 transition-colors shadow-xs"
            >
              {isNe ? 'परामर्श बुक गर्नुहोस्' : 'Book a consultation'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Platform Disclaimer Footer */}
        <section className="px-4 pb-4">
          <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex gap-3">
            <ShieldCheck className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <p className="text-[10px] text-gray-500 leading-relaxed">
              {isNe ? (
                <>
                  <strong>Japan Korea Hub एक स्वतन्त्र सूचना प्लेटफर्म हो।</strong> हामी सरकारी निकाय होइनौं। माथिको चेकलिस्ट सामान्य मार्गदर्शनका लागि मात्र प्रस्तुत गरिएको हो।
                </>
              ) : (
                <>
                  <strong>Japan Korea Hub is an independent information platform.</strong> We are not a government agency. The checklist above is for general guidance.
                </>
              )}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
