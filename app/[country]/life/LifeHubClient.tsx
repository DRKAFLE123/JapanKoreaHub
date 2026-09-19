'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Home as HomeIcon,
  Phone,
  ShieldAlert,
  HeartPulse,
  Clock,
  Wallet,
  Building,
  FileCheck,
  Scale,
  Sparkles,
  AlertTriangle,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
  Briefcase
} from 'lucide-react';


type Country = 'japan' | 'korea';

type LifeTab = 'SETUP' | 'HOUSING' | 'VISA_RENEWAL' | 'RIGHTS' | 'EMERGENCY';

export default function LifeHubClient({ country }: { country: Country }) {
  const [activeTab, setActiveTab] = useState<LifeTab>('SETUP');
  const isJapan = country === 'japan';
  const cName = isJapan ? 'Japan' : 'South Korea';
  const flag = isJapan ? '🇯🇵' : '🇰🇷';

  const costs = isJapan ? [
    { category: 'Rent (Apartment / Shared)', amount: '¥35,000 – ¥70,000 / mo', note: 'Cheaper outside central Tokyo (e.g. Saitama, Chiba, Kansai)' },
    { category: 'Groceries & Food', amount: '¥25,000 – ¥40,000 / mo', note: 'Cooking at discount supermarkets like Gyomu Super' },
    { category: 'Utilities (Electricity/Gas/Water)', amount: '¥8,000 – ¥15,000 / mo', note: 'Varies with winter AC heating & summer cooling' },
    { category: 'Mobile SIM & WiFi', amount: '¥3,000 – ¥6,000 / mo', note: 'Budget eSIM/SIM (Rakuten Mobile, ahamo, UQ Mobile)' },
    { category: 'National Health Insurance (NHI)', amount: '¥1,500 – ¥3,000 / mo', note: 'Covers 70% of medical costs at all clinics' },
  ] : [
    { category: 'Rent (One-room / Goshiwon)', amount: '₩350,000 – ₩650,000 / mo', note: 'Goshiwon includes free rice/kimchi; One-room requires deposit' },
    { category: 'Food & Groceries', amount: '₩300,000 – ₩450,000 / mo', note: 'Affordable university cafeterias (~₩5,000) & local marts' },
    { category: 'Utilities (Gas/Electric/Water)', amount: '₩50,000 – ₩100,000 / mo', note: 'Ondol underfloor heating in winter' },
    { category: 'Mobile SIM', amount: '₩30,000 – ₩60,000 / mo', note: 'Alteul budget carriers (KT M Mobile, U+)' },
    { category: 'National Health Insurance (NHIS)', amount: '₩70,000 / mo', note: 'Mandatory coverage for all foreign residents' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 font-sans">
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">

        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <Link
            href={`/${country}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-600" />
            <span>Back to {cName} Hub</span>
          </Link>
          <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-black uppercase">
            Guide for Residents &amp; Living There
          </span>
        </div>

        {/* Hero Section */}
        <section className={`rounded-3xl p-6 sm:p-8 shadow-xs border text-white space-y-3 ${
          isJapan 
            ? 'bg-gradient-to-r from-red-700 via-rose-800 to-indigo-950 border-red-500/30' 
            : 'bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-950 border-blue-500/30'
        }`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase">
            <span>{flag} Living in {cName} · दैनिक जीवन र बसोबास निर्देशिका</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black leading-tight">
            Life in {cName}: Complete Resident Guide
          </h1>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium max-w-3xl">
            Everything you need for living smoothly in {cName} — from municipal address registration, My Number/Alien cards, and housing deposits to visa renewal, job transitions, PR pathways, labor rights, and emergency contacts.
          </p>
        </section>

        {/* 5 Clean Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setActiveTab('SETUP')}
            className={`py-3 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'SETUP'
                ? isJapan ? 'bg-red-600 text-white shadow-xs' : 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>1. City Office &amp; Setup</span>
          </button>

          <button
            onClick={() => setActiveTab('HOUSING')}
            className={`py-3 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'HOUSING'
                ? isJapan ? 'bg-red-600 text-white shadow-xs' : 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            <span>2. Housing &amp; Costs</span>
          </button>

          <button
            onClick={() => setActiveTab('VISA_RENEWAL')}
            className={`py-3 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'VISA_RENEWAL'
                ? isJapan ? 'bg-red-600 text-white shadow-xs' : 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>3. Visa Renewal &amp; PR</span>
          </button>

          <button
            onClick={() => setActiveTab('RIGHTS')}
            className={`py-3 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'RIGHTS'
                ? isJapan ? 'bg-red-600 text-white shadow-xs' : 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>4. Rights &amp; 28h Rule</span>
          </button>

          <button
            onClick={() => setActiveTab('EMERGENCY')}
            className={`py-3 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer col-span-2 sm:col-span-1 ${
              activeTab === 'EMERGENCY'
                ? isJapan ? 'bg-red-600 text-white shadow-xs' : 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>5. Helplines &amp; Embassy</span>
          </button>
        </div>

        {/* TAB 1: CITY OFFICE & INITIAL SETUP */}
        {activeTab === 'SETUP' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Building className="w-5 h-5 text-indigo-600" />
                <span>First 14 Days Checklist: Municipal City Office Registration (जिल्ला कार्यालय दर्ता)</span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isJapan 
                  ? 'Within 14 days of arriving or moving to a new apartment in Japan, you must visit your local City or Ward Office (区役所 / 市役所 Kuyakusho / Shiyakusho) to complete address registration.'
                  : 'Within 90 days of arriving in South Korea, you must register at the local Immigration Office (출입국관리사무소) to apply for your Alien Registration Card (ARC) and register address at community center (주민센터).'
                }
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>1. Residence Card &amp; Address Seal</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {isJapan 
                      ? 'Submit your Juminhyo (住民票) moving-in notice. The city officer prints your permanent address on the back of your Residence Card (在留カード Zairyu Card).'
                      : 'Bring your passport, rental lease agreement, and school/work documents to register your residential address.'
                    }
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>2. National Health Insurance (NHI)</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {isJapan 
                      ? 'Enroll in Kokumin Kenko Hoken (国民健康保険). You receive your insurance card on the same day. Foreign students receive low-income premium discounts (~¥1,500/mo).'
                      : 'Enroll in National Health Insurance (국민건강보험 NHIS). Covers clinic visits, dental, and emergency hospitalization at 70%.'
                    }
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>3. Identification Card Setup</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {isJapan 
                      ? 'Apply for the My Number Card (マイナンバーカード). Essential for tax certificates, convenience store official printing, and part-time salary registration.'
                      : 'Obtain your Alien Registration Card (외국인등록증 ARC). It serves as your primary Korean photo ID for SIM cards, online shopping, and banking.'
                    }
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>4. Opening Bank Account &amp; SIM Card</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {isJapan 
                      ? 'Newcomers can immediately open an account with Japan Post Bank (ゆうちょ銀行 Yucho Bank) with passport and Zairyu card. Major banks require 6 months residence.'
                      : 'Open bank accounts at Hana Bank, Shinhan, or Woori with your passport and ARC for wage direct deposit and online banking (KakaoBank).'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HOUSING & MONTHLY LIVING COSTS */}
        {activeTab === 'HOUSING' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-600" />
                <span>Monthly Budget &amp; Apartment Renting Guide (कोठा र खर्च)</span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Realistic breakdown of monthly expenditures and housing rules for students and workers living in {cName}.
              </p>

              <div className="space-y-2 pt-1">
                {costs.map((c, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 rounded-2xl flex items-center justify-between gap-4 border border-slate-100">
                    <div>
                      <p className="font-bold text-xs text-slate-900">{c.category}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{c.note}</p>
                    </div>
                    <span className="text-xs font-black text-indigo-900 whitespace-nowrap bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-100">
                      {c.amount}
                    </span>
                  </div>
                ))}
              </div>

              {/* Housing Tips Card */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-2 text-xs">
                <h3 className="font-bold text-amber-950 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>{isJapan ? 'Japan Renting Terms (Shikikin / Reikin)' : 'Korea Housing Terms (Jeonse / Wolse)'}</span>
                </h3>
                <p className="text-amber-900 leading-relaxed text-[11px]">
                  {isJapan 
                    ? 'When renting an apartment in Japan, be aware of Shikikin (敷金 - refundable deposit), Reikin (礼金 - non-refundable gift money to landlord, usually 1 month), and Guarantor company fee (保証会社). Look for "Zero-Reikin" apartments to save initial move-in costs.'
                    : 'Korea uses two major rent systems: Wolse (월세 - monthly rent with small deposit ₩3M–₩10M) and Jeonse (전세 - large lump-sum deposit ₩50M+ returned at lease end). Students usually start in Goshiwon (고시원) with zero deposit and free utilities.'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: VISA RENEWAL, STATUS CHANGE & PR */}
        {activeTab === 'VISA_RENEWAL' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-indigo-600" />
                <span>Visa Renewal, Status Change &amp; PR Pathways (भिसा नवीकरण र पीआर)</span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Step-by-step guidance for renewing your stay, transitioning from Student to Work visa, and qualifying for Permanent Residency (PR).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>When to Apply for Renewal (नवीकरण कहिले गर्ने?)</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Applications for extension of period of stay can be filed starting <strong>3 months prior</strong> to your visa expiration date at Regional Immigration Bureau. Never let your visa expire!
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>{isJapan ? 'Student to SSW / Engineer Visa' : 'E-9 to E-7-4 Skilled Worker'}</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {isJapan 
                      ? 'Graduating students can transition to SSW-1 (Specified Skilled Worker) with technical exam pass + N4/JFT, or to "Engineer/Specialist in Humanities" visa with a university degree and company job contract.'
                      : 'Diligent E-9 workers with 4+ years residence can convert to E-7-4 point-based skilled worker visa with Korean language proficiency (TOPIK 3+ or KIIP level 3), enabling family accompaniment.'
                    }
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Dependent Family Invitation (परिवार बोलाउने)</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {isJapan 
                      ? 'Work visa holders and SSW-2 workers can invite spouse and children on Dependent Visa (家族滞在 Kazoku Taizai). Requires tax certificate (納税証明書) proving sufficient income.'
                      : 'E-7, D-2 advanced, and long-term professional visa holders can sponsor family under F-3 Dependent Visa.'
                    }
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Permanent Residence (PR 永住権 / 영주권)</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {isJapan 
                      ? 'General requirement is 10 consecutive years of residence (including 5 years on a work visa). Highly Skilled Professionals (HSP) can apply in just 1 to 3 years with 70–80 points.'
                      : 'F-5 Permanent Residency requires passing KIIP (사회통합프로그램) Level 5, continuous residence, and meeting GNI per capita income threshold.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LABOR RIGHTS & 28-HOUR RULE */}
        {activeTab === 'RIGHTS' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-600" />
                <span>Labor Rights, Minimum Wage &amp; Part-Time Rules (कामदारको अधिकार र नियम)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-2">
                  <h3 className="font-bold text-red-950 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-red-600" />
                    <span>Strict Part-Time Limits (हप्तामा २८ घण्टा नियम)</span>
                  </h3>
                  <p className="text-red-900 leading-relaxed text-[11px]">
                    {isJapan 
                      ? 'Student visa holders are strictly capped at 28 hours per week across ALL part-time jobs combined. Working even 29 hours can result in visa renewal rejection and deportation. During official school vacations (summer/winter), up to 40 hours/week (8h/day) is permitted.'
                      : 'D-2 students are limited to 20–25 hours/week during term time. E-9 workers must only work at their registered designated employer site.'
                    }
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-emerald-600" />
                    <span>Minimum Wage Protection (न्यूनतम ज्याला अधिकार)</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {isJapan 
                      ? 'All employers must pay at least the statutory prefectural minimum wage (e.g. Tokyo ¥1,163/hr, Kanagawa ¥1,162/hr, Osaka ¥1,114/hr). Paying less is illegal.'
                      : 'Korea enforces a nationwide statutory minimum wage of approx ₩9,860/hr, with guaranteed holiday pay and severance pay for 1+ year service.'
                    }
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-indigo-600" />
                    <span>Overtime &amp; Night Allowance (ओभरटाइम थप रकम)</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Work exceeding 8 hours/day or 40 hours/week must be paid at 125% regular wage. Night shifts (10:00 PM – 5:00 AM) must receive an additional 25% night shift premium.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-purple-600" />
                    <span>Unpaid Wages &amp; Harassment Recourse</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {isJapan 
                      ? 'If your employer withholds salary or abuses rights, report to the Labor Standards Inspection Office (労働基準監督署 Rouki). They investigate anonymously and compel payment.'
                      : 'Report unpaid wages to the Ministry of Employment and Labor (고용노동부 MOEL) or EPS counseling center for foreign workers.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: EMERGENCY HELPLINES & EMBASSY */}
        {activeTab === 'EMERGENCY' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2 text-red-600">
                <Phone className="w-5 h-5" />
                <span>Emergency Helplines &amp; Embassy Contacts (आपतकालीन सम्पर्क)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-2">
                  <p className="font-bold text-red-950">Police Emergency (प्रहरी)</p>
                  <p className="text-2xl font-black text-red-700">{isJapan ? '110' : '112'}</p>
                  <p className="text-[11px] text-red-800">Traffic accidents, theft, crime report, lost wallet/card</p>
                </div>

                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-2">
                  <p className="font-bold text-red-950">Ambulance &amp; Fire (एम्बुलेन्स तथा दमकल)</p>
                  <p className="text-2xl font-black text-red-700">119</p>
                  <p className="text-[11px] text-red-800">Sudden illness, severe injury, fire accident (Available 24/7)</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <p className="font-bold text-slate-900">Embassy of Nepal ({isJapan ? 'Tokyo' : 'Seoul'})</p>
                  <p className="text-xs font-bold text-indigo-700">
                    {isJapan ? '📍 Meguro-ku, Tokyo · Tel: 03-3713-6240' : '📍 Seongbuk-gu, Seoul · Tel: 02-3789-9770'}
                  </p>
                  <p className="text-[11px] text-slate-600">Passport renewal, consular verification, emergency repatriation assistance</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <p className="font-bold text-slate-900">{isJapan ? 'Japan Health & Medical Hotline' : 'Korea 1345 Immigration Hotline'}</p>
                  <p className="text-xs font-bold text-emerald-700">
                    {isJapan ? 'Tokyo Multilingual Medical Guide: 03-5285-8181' : '1345 Contact Center (Nepali service available)'}
                  </p>
                  <p className="text-[11px] text-slate-600">Finding foreign-friendly doctors and official visa advice in Nepali &amp; English</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
