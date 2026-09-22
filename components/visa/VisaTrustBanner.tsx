'use client';
import React from 'react';
import { ExternalLink, AlertTriangle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

interface VisaTrustBannerProps {
  officialSource: string;
  sourceUrl: string;
  lastVerifiedAt: string; // ISO date string or formatted
}

export default function VisaTrustBanner({ officialSource, sourceUrl, lastVerifiedAt }: VisaTrustBannerProps) {
  const { lang, langMode } = useTranslation();
  const isNe = lang === 'ne' || langMode === 'ne';

  return (
    <div className="visa-trust-banner mb-5">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-amber-900 mb-1">
            {isNe ? 'आधिकारिक सूचना (Important Notice)' : 'Information notice'}
          </p>
          <p className="text-xs text-amber-800 leading-relaxed">
            {isNe
              ? 'भिसाका आवश्यकताहरू र सरकारी अध्यागमन नीतिहरू समयअनुसार परिवर्तन हुन सक्छन्। आवेदन दिनुअघि सम्बन्धित आधिकारिक निकायबाट सधैं पछिल्लो नियम प्रमाणीकरण गर्नुहोस्।'
              : 'Visa requirements and immigration policies can change. Always verify the latest requirements with the relevant official authority before applying.'}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-900 hover:underline"
            >
              {isNe ? 'आधिकारिक स्रोत:' : 'Official source:'} {officialSource}
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-xs text-amber-600">
              {isNe ? 'अद्यावधिक मिति:' : 'Last verified:'} {lastVerifiedAt}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
