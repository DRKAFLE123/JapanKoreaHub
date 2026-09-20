import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe, Home as HomeIcon, CheckCircle2, Sparkles, Smile, Utensils, Briefcase, Heart, BookOpen, Clock } from 'lucide-react';
import CountryFilterChip from '@/components/ui/CountryFilterChip';

export const metadata: Metadata = {
  title: 'Life & Culture in Japan & Korea (Living Costs, Housing, Etiquette & Traditions) — JapanKoreaHub',
  description: 'Monthly budget breakdown, apartment renting tips, health insurance, workplace rights, and deep cultural etiquette (Bowing, Chopstick taboos, Two-hand rule, Hou-Ren-So, and Hoesik).',
  alternates: { canonical: 'https://japankoreahub.com/life' },
};

export default function CombinedLifePage() {
  return (
    <main className="pt-14 md:pt-4 max-w-5xl mx-auto pb-24 px-4 space-y-8">
      {/* Header */}
      <section className="py-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-slate-400">Jump to country track:</span>
          <CountryFilterChip country="japan" href="/japan/life" />
          <CountryFilterChip country="korea" href="/korea/life" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black uppercase">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Living, Culture &amp; Etiquette · जीवन, बसोबास तथा संस्कृति</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">
            Life &amp; Culture in Japan &amp; South Korea
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Essential guides for living smoothly, respecting local customs, and succeeding abroad. Explore cost of living breakdowns, housing systems, labor rights, and rich cultural traditions from bowing etiquette to factory teamwork.
          </p>
        </div>
      </section>

      {/* Country Track Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Japan Life & Culture */}
        <div className="card p-6 border-rose-200 bg-gradient-to-b from-rose-50/50 to-white flex flex-col justify-between space-y-5 rounded-3xl shadow-xs hover:border-rose-300 transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🇯🇵</span>
                <div>
                  <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
                    Japan Track
                  </span>
                  <h2 className="text-lg font-black text-slate-900 mt-1">Living &amp; Culture in Japan</h2>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              From apartment key money (Shikikin/Reikin) and 28-hour student work caps to bowing (Ojigi), table etiquette, and company Hou-Ren-So.
            </p>

            {/* Cultural Highlights Pill Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-rose-100 flex items-center gap-2">
                <Smile className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="text-[11px] font-bold text-slate-800">Bowing (Ojigi 15°-45°)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-rose-100 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="text-[11px] font-bold text-slate-800">No Tipping Culture</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-rose-100 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="text-[11px] font-bold text-slate-800">Hou-Ren-So (報連相)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-rose-100 flex items-center gap-2">
                <HomeIcon className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="text-[11px] font-bold text-slate-800">Genkan Shoes Off</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700 bg-rose-50/70 p-3 rounded-2xl border border-rose-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                <span>Tokyo vs Regional Living Costs (~¥80k-¥120k/mo)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                <span>Strict 28-hr/week Part-time Rule for Students</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                <span>National Health Insurance (NHI) 70% Clinic Subsidy</span>
              </div>
            </div>
          </div>

          <Link
            href="/japan/life"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <span>Explore Japan Life &amp; Culture</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Korea Life & Culture */}
        <div className="card p-6 border-blue-200 bg-gradient-to-b from-blue-50/50 to-white flex flex-col justify-between space-y-5 rounded-3xl shadow-xs hover:border-blue-300 transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🇰🇷</span>
                <div>
                  <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    Korea Track
                  </span>
                  <h2 className="text-lg font-black text-slate-900 mt-1">Living &amp; Culture in Korea</h2>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Goshiwon vs Wolse housing, Alien Registration Card (ARC), age hierarchy, two-hand etiquette, Palli-Palli speed, and company Hoesik.
            </p>

            {/* Cultural Highlights Pill Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-blue-100 flex items-center gap-2">
                <Smile className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-[11px] font-bold text-slate-800">Two-Hand Rule (두 손)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-blue-100 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-[11px] font-bold text-slate-800">Dining with Elders</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-blue-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-[11px] font-bold text-slate-800">Palli-Palli (빨리빨리)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-blue-100 flex items-center gap-2">
                <Heart className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-[11px] font-bold text-slate-800">Hoesik (회식 Dinners)</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700 bg-blue-50/70 p-3 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span>Goshiwon vs One-room Wolse (~₩350k-₩650k/mo)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span>E-9 Workplace Rights &amp; E-7-4 Transition Pathway</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span>NHIS Health Insurance &amp; 1345 Multilingual Line</span>
              </div>
            </div>
          </div>

          <Link
            href="/korea/life"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <span>Explore Korea Life &amp; Culture</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Cultural Comparison Section */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <span>Cultural Etiquette Comparison: Japan vs South Korea</span>
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          While both societies share East Asian Confucian roots and deep respect for elders, their daily social dynamics differ in important ways:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
          <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2">
            <h3 className="font-extrabold text-rose-950 flex items-center gap-2">
              <span>🇯🇵 Japan Cultural Nuances</span>
            </h3>
            <ul className="space-y-1.5 text-[11px] text-slate-700 list-disc pl-4">
              <li><strong>Quiet Public Spaces:</strong> Talking loudly on trains or buses is taboo; phones must be on &quot;Manner Mode&quot;.</li>
              <li><strong>Slurping Noodles:</strong> Slurping ramen and soba shows appreciation for the broth.</li>
              <li><strong>Indirect Communication (Honne &amp; Tatemae):</strong> Disagreements are expressed gently rather than bluntly.</li>
              <li><strong>Zero Tipping:</strong> Excellent hospitality (Omotenashi) is included; never leave extra cash.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
            <h3 className="font-extrabold text-blue-950 flex items-center gap-2">
              <span>🇰🇷 South Korea Cultural Nuances</span>
            </h3>
            <ul className="space-y-1.5 text-[11px] text-slate-700 list-disc pl-4">
              <li><strong>The Two-Hand Rule:</strong> Always give and receive items with both hands to show respect.</li>
              <li><strong>Speed Mindset (Palli-Palli):</strong> Prompt execution, high energy, and responsiveness are celebrated.</li>
              <li><strong>Age Hierarchy First:</strong> People ask age right away to choose polite honorifics (Jondaenmal).</li>
              <li><strong>Turn Away When Drinking:</strong> Turn slightly away from elders when sipping alcohol at company dinners.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
