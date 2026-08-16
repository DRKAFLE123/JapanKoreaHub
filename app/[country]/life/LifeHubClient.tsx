'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home as HomeIcon, Phone, ShieldAlert, HeartPulse, Clock, Wallet } from 'lucide-react';
import MobileNavbar from '@/components/layout/MobileNavbar';
import BottomTabBar from '@/components/layout/BottomTabBar';

type Country = 'japan' | 'korea';

const COSTS: Record<Country, { category: string; amount: string; note: string }[]> = {
  japan: [
    { category: 'Rent (Shared / Studio)', amount: '¥35,000 – ¥65,000 / mo', note: 'Cheaper outside central Tokyo (e.g. Saitama, Chiba)' },
    { category: 'Food & Groceries', amount: '¥25,000 – ¥40,000 / mo', note: 'Self-cooking at supermarkets like Gyomu Super' },
    { category: 'Utilities (Gas/Electric/Water)', amount: '¥8,000 – ¥15,000 / mo', note: 'Varies by season (heating in winter)' },
    { category: 'Mobile & WiFi', amount: '¥3,000 – ¥6,000 / mo', note: 'MVNO SIMs (Rakuten Mobile / UQ / ahamo)' },
    { category: 'National Health Insurance (NHI)', amount: '¥1,500 – ¥3,000 / mo', note: 'Covers 70% of medical expenses' },
  ],
  korea: [
    { category: 'Rent (One-room / Goshiwon)', amount: '₩350,000 – ₩650,000 / mo', note: 'Goshiwon includes free rice & kimchi; One-room needs deposit' },
    { category: 'Food & Groceries', amount: '₩300,000 – ₩450,000 / mo', note: 'University cafeteria meals (~₩5,000/meal)' },
    { category: 'Utilities', amount: '₩50,000 – ₩100,000 / mo', note: 'Ondol floor heating in winter' },
    { category: 'Mobile SIM', amount: '₩30,000 – ₩60,000 / mo', note: 'Alteul SIM (budget carriers)' },
    { category: 'National Health Insurance (NHIS)', amount: '₩70,000 / mo', note: 'Mandatory for foreign students & workers' },
  ],
};

export default function LifeHubClient({ country }: { country: Country }) {
  const cName = country === 'japan' ? 'Japan' : 'Korea';
  const flag = country === 'japan' ? '🇯🇵' : '🇰🇷';
  const costs = COSTS[country];

  return (
    <div className="min-h-screen bg-white pb-24">
      <main className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="px-4 pt-4 pb-2">
          <Link href={`/${country}`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            {flag} {cName}
          </Link>
        </div>

        {/* Header */}
        <section className="px-4 py-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200 text-xs font-semibold mb-3">
            {flag} Life in {cName} · Cost of Living & Rights
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Living Guide for {cName}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Monthly budget estimates, health insurance, housing tips, and emergency helplines.
          </p>
        </section>

        {/* Monthly Budget Breakdown */}
        <section className="px-4 pb-6">
          <div className="card p-5 space-y-3">
            <h2 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <Wallet className="w-5 h-5 text-purple-600" />
              Average Monthly Expenses Breakdown
            </h2>

            <div className="space-y-3 pt-2">
              {costs.map((c, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-xl flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-xs text-gray-900">{c.category}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{c.note}</p>
                  </div>
                  <span className="text-xs font-extrabold text-purple-900 whitespace-nowrap">{c.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Legal Part-time Work Limits */}
        <section className="px-4 pb-6">
          <div className="card p-5 space-y-2 border-indigo-100 bg-indigo-50/30">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              Part-Time Work Regulations (Arobaito / Part-time)
            </h3>
            {country === 'japan' ? (
              <p className="text-xs text-gray-600 leading-relaxed">
                Student visa holders are permitted to work up to <strong>28 hours per week</strong> during school semesters and up to <strong>40 hours per week (8 hrs/day)</strong> during long school vacations (Summer/Winter breaks). Must hold a valid <em>Shikakugai Kactivity Permit</em>.
              </p>
            ) : (
              <p className="text-xs text-gray-600 leading-relaxed">
                D-2 student visa holders can work up to <strong>20–25 hours per week</strong> during term time after completing 1 semester. Unlimited hours allowed during official school holidays. Requires permission from Immigration (S-13 permit).
              </p>
            )}
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="px-4 pb-8">
          <div className="card p-5 space-y-3 border-red-100 bg-red-50/20">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2 text-red-900">
              <Phone className="w-5 h-5 text-red-600" />
              Emergency & Support Helplines
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white border border-red-100 rounded-xl">
                <p className="font-bold text-red-800">Police Emergency</p>
                <p className="text-lg font-black text-gray-900 mt-0.5">{country === 'japan' ? '110' : '112'}</p>
              </div>
              <div className="p-3 bg-white border border-red-100 rounded-xl">
                <p className="font-bold text-red-800">Fire & Ambulance</p>
                <p className="text-lg font-black text-gray-900 mt-0.5">{country === 'japan' ? '119' : '119'}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BottomTabBar />
    </div>
  );
}
