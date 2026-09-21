'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCountry } from '@/lib/context/CountryContext';
import { ArrowRight, PlaneTakeoff, Home as HomeIcon, CheckCircle2, X } from 'lucide-react';
import { useBodyScrollLock } from '@/lib/useBodyScrollLock';

export default function CountrySelectionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { setCountryFocus } = useCountry();
  const router = useRouter();
  const pathname = usePathname();

  useBodyScrollLock(isOpen);

  useEffect(() => {
    // Only show if user has never selected a country preference
    const selected = localStorage.getItem('jkh_user_selected_country');
    if (!selected) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSelectCountry = (country: 'japan' | 'korea') => {
    localStorage.setItem('jkh_user_selected_country', country);
    setCountryFocus(country);
    setIsOpen(false);

    if (pathname === '/' || (!pathname.startsWith('/japan') && !pathname.startsWith('/korea'))) {
      router.push(`/${country}`);
    } else {
      const newPath = pathname.startsWith('/japan')
        ? pathname.replace('/japan', `/${country}`)
        : pathname.startsWith('/korea')
          ? pathname.replace('/korea', `/${country}`)
          : `/${country}`;
      router.push(newPath);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in touch-none" onTouchMove={(e) => { if (e.target === e.currentTarget) e.preventDefault(); }}>
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-slate-900 animate-scale-up">
        
        {/* Close / Skip button */}
        <button
          onClick={() => {
            localStorage.setItem('jkh_user_selected_country', 'japan');
            setIsOpen(false);
          }}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer z-10"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Clean Header */}
        <div className="pt-7 pb-4 px-6 sm:px-8 text-center space-y-1.5 border-b border-slate-100 bg-slate-50/50">
          <span className="px-3 py-1 rounded-full bg-slate-200/70 text-slate-700 text-[11px] font-black uppercase tracking-wider">
            LanguageGuru Platform
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Select Your Target Country
          </h2>
          <p className="text-xs text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
            तपाईंको आवश्यकता अनुसार देश छान्नुहोस् — <strong>जाने तयारीमा रहेकाहरू</strong> र <strong>त्यहीँ बसोबास गरिरहेकाहरू</strong> दुवैका लागि।
          </p>
        </div>

        {/* Clean Two Cards Grid */}
        <div className="p-5 sm:p-7 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white">
          
          {/* 🇯🇵 JAPAN CARD */}
          <div
            onClick={() => handleSelectCountry('japan')}
            className="group relative bg-white border-2 border-slate-200 hover:border-red-600 rounded-2xl p-5 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 hover:-translate-y-0.5"
          >
            <div className="space-y-3">
              {/* Flag & Header */}
              <div className="flex items-center gap-3">
                {/* Clean SVG Flag */}
                <div className="w-10 h-10 rounded-full border border-slate-200 shadow-xs flex items-center justify-center bg-white shrink-0 overflow-hidden">
                  <svg viewBox="0 0 900 600" className="w-full h-full">
                    <rect fill="#ffffff" width="900" height="600"/>
                    <circle fill="#bc002d" cx="450" cy="300" r="180"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 group-hover:text-red-600 transition-colors">
                    Japan (जापान)
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Study · Work · Life
                  </span>
                </div>
              </div>

              {/* Dual Audience Bullets */}
              <div className="space-y-2 text-[11px] text-slate-600 pt-1">
                <div className="p-2 rounded-xl bg-red-50/60 border border-red-100/80 space-y-0.5">
                  <strong className="text-red-900 font-bold flex items-center gap-1 text-[11px]">
                    <PlaneTakeoff className="w-3.5 h-3.5 text-red-600" />
                    Planning to Go (तयारी):
                  </strong>
                  <p className="text-slate-600 text-[10.5px]">
                    JLPT N5–N1, JFT-Basic, SSW Skills &amp; Visa
                  </p>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                  <strong className="text-slate-800 font-bold flex items-center gap-1 text-[11px]">
                    <HomeIcon className="w-3.5 h-3.5 text-slate-600" />
                    Already Living There (बसोबास):
                  </strong>
                  <p className="text-slate-600 text-[10.5px]">
                    City Office, Housing, Visa Extension &amp; PR
                  </p>
                </div>
              </div>
            </div>

            <button
              className="w-full py-2.5 px-3 rounded-xl bg-red-600 group-hover:bg-red-700 text-white font-black text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Japan Hub</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 🇰🇷 KOREA CARD */}
          <div
            onClick={() => handleSelectCountry('korea')}
            className="group relative bg-white border-2 border-slate-200 hover:border-blue-600 rounded-2xl p-5 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 hover:-translate-y-0.5"
          >
            <div className="space-y-3">
              {/* Flag & Header */}
              <div className="flex items-center gap-3">
                {/* Clean SVG Flag */}
                <div className="w-10 h-10 rounded-full border border-slate-200 shadow-xs flex items-center justify-center bg-white shrink-0 overflow-hidden">
                  <svg viewBox="0 0 900 600" className="w-full h-full">
                    <rect fill="#ffffff" width="900" height="600"/>
                    <g transform="translate(450,300) scale(0.6)">
                      <circle cx="0" cy="0" r="160" fill="#cd2e3a"/>
                      <path d="M -160,0 A 80,80 0 0,0 0,0 A 80,80 0 0,1 160,0 A 160,160 0 0,1 -160,0" fill="#0047a0"/>
                      <circle cx="-80" cy="0" r="80" fill="#cd2e3a"/>
                      <circle cx="80" cy="0" r="80" fill="#0047a0"/>
                    </g>
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    South Korea (कोरिया)
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    EPS · University · Life
                  </span>
                </div>
              </div>

              {/* Dual Audience Bullets */}
              <div className="space-y-2 text-[11px] text-slate-600 pt-1">
                <div className="p-2 rounded-xl bg-blue-50/60 border border-blue-100/80 space-y-0.5">
                  <strong className="text-blue-900 font-bold flex items-center gap-1 text-[11px]">
                    <PlaneTakeoff className="w-3.5 h-3.5 text-blue-600" />
                    Planning to Go (तयारी):
                  </strong>
                  <p className="text-slate-600 text-[10.5px]">
                    EPS-TOPIK 60 Lessons, Skill Tests &amp; Visas
                  </p>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                  <strong className="text-slate-800 font-bold flex items-center gap-1 text-[11px]">
                    <HomeIcon className="w-3.5 h-3.5 text-slate-600" />
                    Already Living There (बसोबास):
                  </strong>
                  <p className="text-slate-600 text-[10.5px]">
                    Daily Life, Alien Card, E-7-4 Change &amp; Rights
                  </p>
                </div>
              </div>
            </div>

            <button
              className="w-full py-2.5 px-3 rounded-xl bg-blue-600 group-hover:bg-blue-700 text-white font-black text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Korea Hub</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

        {/* Footer Note */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
          <span>You can easily switch between Japan and South Korea anytime from the sidebar or top bar.</span>
        </div>

      </div>
    </div>
  );
}
