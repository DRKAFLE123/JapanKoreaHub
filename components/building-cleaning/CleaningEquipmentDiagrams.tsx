'use client';
import React, { useState } from 'react';
import {
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ShieldAlert,
  Volume2,
  Info,
  User,
  MessageSquareQuote,
  Flame,
  ArrowRight
} from 'lucide-react';
import FuriganaText from './FuriganaText';

interface DiagramProps {
  showFurigana?: boolean;
  showNepali?: boolean;
}

/**
 * 1. Vacuum Cleaner Diagram (真空掃除機 / バキュームクリーナー)
 */
export function VacuumCleanerDiagram({ showFurigana = true, showNepali = true }: DiagramProps) {
  const [selectedPart, setSelectedPart] = useState<string>('nozzle');

  const parts: Record<string, { titleJp: string; titleNe: string; descJp: string; descNe: string; cautionJp: string }> = {
    nozzle: {
      titleJp: '[床|ゆか]ノズル（吸込口）',
      titleNe: 'भुइँको नोजल (फोहोर चुस्ने मुख)',
      descJp: '床面のゴミやほこりを直接吸い込む先端部品。ブラシが付いているため定期的に毛くずを除去します。',
      descNe: 'भुइँको धुलो सीधै तान्ने अगाडिको भाग। यसमा झुस अड्किने भएकाले सफा राख्नुपर्छ।',
      cautionJp: '大きな固形物や釘・ガラス片を無理に吸わせるとホースが詰まります。',
    },
    hose: {
      titleJp: 'ホース・[延長管|えんちょうかん]',
      titleNe: 'लचिलो पाइप र लामो रड (Hose & Wand)',
      descJp: '作業者の身長に合わせて姿勢を保ち、腰痛を防ぎながら作業するためのパイプ。',
      descNe: 'ढाड नदुखाइकन सहज मुद्रामा उभिएर सफाइ गर्न प्रयोग हुने लचिलो पाइप।',
      cautionJp: 'ホースを無理に引っ張ると亀裂が入り吸引力が低下します。',
    },
    filter: {
      titleJp: 'フィルター・[集塵袋|しゅうじんぶくろ]',
      titleNe: 'धुलो संकलन झोला र HEPA फिल्टर',
      descJp: '吸い込んだ微細なホコリを捕集し、排気を清潔に保ちます。満杯になると吸引力が激減します。',
      descNe: 'धुलोका सूक्ष्म कणहरू रोकी बाहिर सफा हावा फ्याँक्छ। भरिएपछि भ्याकुमको शक्ति घट्छ।',
      cautionJp: '紙パックの交換時期を見逃さないよう始業前点検で必ず確認します。',
    },
    cord: {
      titleJp: '[電源|でんげん]コード・プラグ',
      titleNe: 'बिजुलीको तार र प्लग',
      descJp: 'コンセントから電力を供給するコード。作業中は足に引っ掛けないよう背後に流します。',
      descNe: 'बिजुली दिने तार। काम गर्दा गोडामा नअल्झियोस् भनी पछाडि राख्नुपर्छ।',
      cautionJp: 'コードを引っ張ってコンセントから抜くのは断線事故の原因になり禁止です。',
    },
  };

  const current = parts[selectedPart];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-sky-50 text-sky-700 border border-sky-200">
            🧹
          </span>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
              <FuriganaText text="[真空掃除機|しんくうそうじき]（バキュームクリーナー）の[構造|こうぞう]と[点検|てんけん]" showFurigana={showFurigana} />
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              🇳🇵 भ्याकुम क्लिनरको संरचना र आवश्यक चेकजाँच
            </p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200 text-[10px] font-black uppercase">
          Machinery Diagram
        </span>
      </div>

      {/* Interactive Vector Graphic */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        <div className="md:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center relative">
          
          {/* SVG Vacuum Illustration */}
          <svg className="w-48 h-56" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Canister Body */}
            <rect x="50" y="110" width="80" height="90" rx="20" fill="#E2E8F0" stroke="#0EA5E9" strokeWidth="3" />
            <rect x="65" y="125" width="50" height="40" rx="8" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
            <circle cx="90" cy="145" r="8" fill="#0284C7" />
            
            {/* Wheels */}
            <circle cx="45" cy="190" r="14" fill="#334155" stroke="#0F172A" strokeWidth="2" />
            <circle cx="135" cy="190" r="14" fill="#334155" stroke="#0F172A" strokeWidth="2" />
            
            {/* Top Handle */}
            <path d="M70 110 V95 C70 90, 110 90, 110 95 V110" stroke="#0284C7" strokeWidth="4" fill="none" strokeLinecap="round" />
            
            {/* Hose coming from body */}
            <path d="M90 120 C90 60, 150 70, 150 110 C150 150, 160 180, 165 210" stroke="#64748B" strokeWidth="7" fill="none" strokeLinecap="round" strokeDasharray="3 1" />
            
            {/* Extension Wand and Floor Nozzle */}
            <line x1="165" y1="130" x2="165" y2="215" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
            <polygon points="140,215 190,215 180,228 150,228" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
            
            {/* Power Cord trailing from back */}
            <path d="M50 160 C20 165, 15 200, 5 205" stroke="#F59E0B" strokeWidth="3" fill="none" strokeDasharray="4 2" />
            <circle cx="5" cy="205" r="4" fill="#F59E0B" />
          </svg>

          {/* Clickable hotspots */}
          <div className="flex flex-wrap justify-center gap-1.5 mt-2">
            {[
              { id: 'nozzle', label: '1. 床ノズル' },
              { id: 'hose', label: '2. ホース・管' },
              { id: 'filter', label: '3. フィルター' },
              { id: 'cord', label: '4. 電源コード' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSelectedPart(btn.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedPart === btn.id
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Part Detail Card */}
        <div className="md:col-span-6 space-y-3">
          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-2">
            <h5 className="text-sm font-black text-sky-950">
              <FuriganaText text={current.titleJp} showFurigana={showFurigana} />
            </h5>
            <p className="text-xs font-bold text-sky-800">
              🇳🇵 {current.titleNe}
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              {current.descJp}
            </p>
            {showNepali && (
              <p className="text-xs text-slate-600 leading-relaxed border-t border-sky-200/60 pt-1.5">
                🇳🇵 {current.descNe}
              </p>
            )}
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
            <p className="font-bold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>[実技試験|じつぎしけん]のチェックポイント (Exam Safety Rule)</span>
            </p>
            <p className="text-[11px] leading-snug">{current.cautionJp}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 2. Floor Polisher Diagram (床みがき機 / ポリッシャー)
 */
export function FloorPolisherDiagram({ showFurigana = true, showNepali = true }: DiagramProps) {
  const [selectedPad, setSelectedPad] = useState<'black' | 'red' | 'white'>('black');

  const pads = {
    black: {
      nameJp: '黒パッド（[剥離用|はくりよう]）',
      nameNe: 'कालो प्याड (वाक्स उप्काउने कडा प्याड)',
      useJp: '研磨粒子が最も粗く、古く黒ずんだワックス皮膜を完全に削り落とす剥離作業に使用します。',
      useNe: 'सबैभन्दा खस्रो प्याड, पुरानो कालो भएको वाक्स पूरै उप्काउन प्रयोग गरिन्छ।',
      color: 'bg-slate-900 text-white border-slate-950',
    },
    red: {
      nameJp: '赤パッド（[洗浄用|せんじょうよう]）',
      nameNe: 'रातो प्याड (दैनिक भुइँ सफाइ)',
      useJp: '日常の定期洗浄に使用。ワックスを傷めずに表面の泥や手あか汚れだけを洗い落とします。',
      useNe: 'दैनिक सफाइमा प्रयोग हुन्छ। वाक्स नबिगारी माथिको फोहोर मात्र सफा गर्छ।',
      color: 'bg-rose-600 text-white border-rose-700',
    },
    white: {
      nameJp: '白パッド（[艶出用|つやだしよう]）',
      nameNe: 'सेतो प्याड (चमक बढाउने पोलिस)',
      useJp: '研磨剤を含まず、ワックス塗布後の乾いた床を磨いて高光沢（ツヤ）を出すために使用します。',
      useNe: 'कुनै खस्रो पदार्थ नभएको, भुइँमा उच्च चमक (Gloss) ल्याउन प्रयोग गरिने प्याड।',
      color: 'bg-slate-100 text-slate-800 border-slate-300',
    },
  };

  const currentPad = pads[selectedPad];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
            ⚙️
          </span>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
              <FuriganaText text="[床|ゆか]みがき[機|き]（ポリッシャー）の[操作|そうさ]とパッドの[種類|しゅるい]" showFurigana={showFurigana} />
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              🇳🇵 फ्लोर पोलिसर मेसिन र प्याडको प्रकार
            </p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-black uppercase">
          Key Exam Machinery
        </span>
      </div>

      {/* Critical Cord Draping Alert */}
      <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <p className="font-black text-rose-950">
            🚨 実技試験で最も減点される超重要ルール：コードの肩掛け（Cord Shoulder Drape）
          </p>
          <p className="text-rose-900 leading-relaxed">
            電源コードは必ず「利き肩にかけて背後に逃がす」ようにさばきます。コードが回転するパッドの下に入ると、一瞬で断線・感電・即失格になります！
          </p>
          {showNepali && (
            <p className="text-rose-800 text-[11px] pt-1 border-t border-rose-200">
              🇳🇵 बिजुलीको तार अनिवार्य रूपमा काँधमाथि राखेर पछाडि छाड्नुपर्छ। घुमिरहेको प्याडले तार बेरेमा तुरुन्तै फेल गरिन्छ!
            </p>
          )}
        </div>
      </div>

      {/* Interactive Pads Showcase */}
      <div className="space-y-3">
        <p className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          試験頻出：ポリッシャー用パッドの色分け（3 Pad Types for Exam）
        </p>

        <div className="grid grid-cols-3 gap-2">
          {(['black', 'red', 'white'] as const).map((colorKey) => (
            <button
              key={colorKey}
              onClick={() => setSelectedPad(colorKey)}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                selectedPad === colorKey
                  ? 'border-emerald-500 ring-2 ring-emerald-200 shadow-xs'
                  : 'border-slate-200 bg-slate-50 hover:bg-white'
              }`}
            >
              <span className={`w-6 h-6 rounded-full border shadow-xs ${pads[colorKey].color}`} />
              <span className="text-xs font-bold text-slate-900 mt-1">
                {colorKey === 'black' ? '黒 (Black)' : colorKey === 'red' ? '赤 (Red)' : '白 (White)'}
              </span>
              <span className="text-[10px] text-slate-500">
                {colorKey === 'black' ? '剥離' : colorKey === 'red' ? '洗浄' : 'ツヤ出し'}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Pad Info */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
          <p className="font-black text-slate-900 text-sm">
            <FuriganaText text={currentPad.nameJp} showFurigana={showFurigana} />
          </p>
          <p className="text-xs font-bold text-indigo-900">
            🇳🇵 {currentPad.nameNe}
          </p>
          <p className="text-slate-700 leading-relaxed">
            {currentPad.useJp}
          </p>
          {showNepali && (
            <p className="text-slate-600 leading-relaxed border-t border-slate-200 pt-1.5">
              🇳🇵 {currentPad.useNe}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * 3. Carpet Extractor Diagram (エクストラクター)
 */
export function CarpetExtractorDiagram({ showFurigana = true, showNepali = true }: DiagramProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
            💦
          </span>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
              <FuriganaText text="エクストラクター（[洗浄抽出機|せんじょうちゅうしゅつき]）のしくみ" showFurigana={showFurigana} />
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              🇳🇵 कार्पेट एक्स्ट्र्याक्टरको काम गर्ने विधि
            </p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200 text-[10px] font-black uppercase">
          Carpet Deep Cleaning
        </span>
      </div>

      {/* Mechanism 3-Step Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-1.5">
          <div className="flex items-center gap-2 text-sky-800 font-bold">
            <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px] font-black">
              1
            </span>
            <span>① [洗剤水|せんざいすい]の[噴射|ふんしゃ]</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            温水または希釈洗剤液を高圧ポンプでカーペット繊維の奥深くまで噴射します。
          </p>
          {showNepali && (
            <p className="text-slate-600 text-[11px] pt-1 border-t border-sky-200/60">
              🇳🇵 डिटर्जेन्ट पानीलाई कार्पेटको भित्री तहसम्म छर्किन्छ।
            </p>
          )}
        </div>

        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-800 font-bold">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black">
              2
            </span>
            <span>② [汚れ|よごれ]の[分解|ぶんかい]・[溶解|ようかい]</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            繊維に付着した泥や飲料のシミ汚れを洗剤成分で浮き上がらせます。
          </p>
          {showNepali && (
            <p className="text-slate-600 text-[11px] pt-1 border-t border-indigo-200/60">
              🇳🇵 केमिकलले टाँसिएको फोहोरलाई पगालेर फुकाउँछ।
            </p>
          )}
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-800 font-bold">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black">
              3
            </span>
            <span>③ [強力汚水吸引|きょうりょくおすいきゅういん]</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            強力なバキュームスロットで汚水を瞬時に吸引し、回収タンクへ送ります。
          </p>
          {showNepali && (
            <p className="text-slate-600 text-[11px] pt-1 border-t border-emerald-200/60">
              🇳🇵 फोहोर पानीलाई शक्तिशाली भ्याकुमले चुसेर ट्याङ्कीमा जम्मा गर्छ।
            </p>
          )}
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2.5">
        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
        <div>
          <span className="font-bold">カビ防止の重要ポイント：</span>
          <span>洗浄後は送風機（フロアブロアー）で急速乾燥させます。湿気が残ると悪臭やカビの温床になります。</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 4. Glass Squeegee & Washer Diagram (スクイジー & ウォッシャー)
 */
export function GlassSqueegeeDiagram({ showFurigana = true, showNepali = true }: DiagramProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
            🪟
          </span>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
              <FuriganaText text="ガラス[清掃|せいそう]の[基本動作|きほんどうさ]（スクイジーの[水切|みずき]り）" showFurigana={showFurigana} />
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              🇳🇵 सिसा सफाइको कला: स्क्विजी चलाउने सही कोण र तरिका
            </p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-black uppercase">
          Practical Test Motion
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Step A: Washer */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-black text-teal-800 text-sm">ステップ１：ウォッシャーで洗浄</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-900">Washer</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            洗剤水をたっぷり含ませて絞ったウォッシャーで、ガラス全体を上から下へ円を描くように洗い、汚れを浮かせます。
          </p>
          {showNepali && (
            <p className="text-slate-600 text-[11px] pt-1 border-t border-slate-200">
              🇳🇵 वासर स्पन्जले डिटर्जेन्ट पानी सिसामा दलेर फोहोर फुकाइन्छ।
            </p>
          )}
        </div>

        {/* Step B: Squeegee */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-black text-teal-800 text-sm">ステップ２：スクイジーで水切り</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-900">Squeegee</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            スクイジーを約45度の角度でガラスに密着させ、上から下へ（またはS字運行）一定のスピードで水滴を一気に切り落とします。
          </p>
          {showNepali && (
            <p className="text-slate-600 text-[11px] pt-1 border-t border-slate-200">
              🇳🇵 स्क्विजीलाई ४५ डिग्री कोणमा अड्याएर माथिबाट तल पानी काटिन्छ।
            </p>
          )}
        </div>
      </div>

      {/* Pro Tip Box */}
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5 text-xs text-emerald-950">
        <p className="font-black flex items-center gap-1.5 text-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          プロの仕上げ：1ストロークごとにゴムを拭き取る
        </p>
        <p className="leading-relaxed">
          スクイジーを一度引くごとに、乾いたタオルでゴムの刃先に残った汚水を拭き取ります。これを怠ると、次のラインに水滴の筋（スジ）が残ってしまいます。
        </p>
      </div>
    </div>
  );
}

/**
 * 5. Color-Coded Mops Diagram (モップの色分け)
 */
export function ColorCodedMopsDiagram({ showFurigana = true, showNepali = true }: DiagramProps) {
  const zones = [
    {
      color: 'bg-rose-500 text-white',
      border: 'border-rose-300 bg-rose-50',
      titleJp: '赤（レッド）：トイレ・[汚物|おぶつ]エリア',
      titleNe: 'रातो: शौचालय तथा युरिनल',
      descJp: '大便器、小便器、汚物入れなど。最も菌数が多いエリア専用。',
      descNe: 'कमोड, युरिनल र फोहोर भाँडोको लागि मात्र प्रयोग हुने।',
    },
    {
      color: 'bg-amber-400 text-slate-950',
      border: 'border-amber-300 bg-amber-50',
      titleJp: '黄（イエロー）：[給湯室|きゅうとうしつ]・[厨房|ちゅうぼう]',
      titleNe: 'पहेंलो: भान्सा र चमेनागृह',
      descJp: '食品や飲料を扱うキッチン、給湯室、配膳室専用。',
      descNe: 'खाना बनाउने र चिया पकाउने ठाउँको लागि प्रयोग हुने।',
    },
    {
      color: 'bg-sky-500 text-white',
      border: 'border-sky-300 bg-sky-50',
      titleJp: '青（ブルー）：[一般事務室|いっぱんじむしつ]・[通路|つうろ]',
      titleNe: 'नीलो: सामान्य अफिस र बरन्डा',
      descJp: 'オフィス執務エリア、廊下、エントランスホール専用。',
      descNe: 'अफिस कोठा, भित्री गल्ली र प्रवेश हलको लागि।',
    },
    {
      color: 'bg-emerald-500 text-white',
      border: 'border-emerald-300 bg-emerald-50',
      titleJp: '緑（グリーン）：[医務室|いむしつ]・[特別室|とくべつしつ]',
      titleNe: 'हरियो: स्वास्थ्य कक्ष/विशेष कोठा',
      descJp: '診療室、医務室、会議室などのクリーンエリア。',
      descNe: 'क्लिनिक र अति सफा राख्नुपर्ने विशेष कोठाहरू।',
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200">
            🧼
          </span>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
              <FuriganaText text="モップ・[雑巾|ぞうきん]の[色分|いろわ]けと[交差汚染防止|こうさおせんぼうし]" showFurigana={showFurigana} />
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              🇳🇵 मप र कपडाको रंग विभाजन र क्रस-कन्टामिनेसन रोकथाम
            </p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-black uppercase">
          Sanitation Standard
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {zones.map((zone, idx) => (
          <div key={idx} className={`p-4 rounded-2xl border ${zone.border} space-y-1.5`}>
            <div className="flex items-center gap-2">
              <span className={`w-4 h-4 rounded-full ${zone.color} shrink-0`} />
              <span className="font-black text-slate-900">
                <FuriganaText text={zone.titleJp} showFurigana={showFurigana} />
              </span>
            </div>
            <p className="text-xs font-bold text-slate-700">
              🇳🇵 {zone.titleNe}
            </p>
            <p className="text-slate-600 leading-snug">
              {zone.descJp}
            </p>
            {showNepali && (
              <p className="text-slate-500 text-[11px] pt-1 border-t border-slate-200/50">
                🇳🇵 {zone.descNe}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 6. Chemical pH Chart (洗剤の液性・酸性・アルカリ性)
 */
export function ChemicalPHChart({ showFurigana = true, showNepali = true }: DiagramProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200">
            🧪
          </span>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
              <FuriganaText text="[洗剤|せんざい]の[液性|えきせい]（ｐＨスケール）と[落|お]とせる[汚|よご]れ" showFurigana={showFurigana} />
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              🇳🇵 डिटर्जेन्टको pH स्तर र हटाउन सकिने फोहोरको वर्गीकरण
            </p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200 text-[10px] font-black uppercase">
          Chemistry Basics
        </span>
      </div>

      {/* pH Spectrum Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        
        {/* Acidic */}
        <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-black text-amber-950 text-sm">酸性（pH 0〜6）</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">Acidic</span>
          </div>
          <p className="font-bold text-amber-900">
            🎯 [落|お]とせる[汚|よご]れ：[尿石|にょうせき]・[水垢|みずあか]・[石鹸|せっけん]カス
          </p>
          <p className="text-slate-700 leading-relaxed">
            アルカリ性の汚れを化学的に中和分解します。
          </p>
          <div className="p-2 rounded-lg bg-rose-100 text-rose-900 font-bold text-[11px]">
            ⚠️ 大理石・金属への使用は腐食するため禁止！
          </div>
        </div>

        {/* Neutral */}
        <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-black text-emerald-950 text-sm">中性（pH 6〜8）</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">Neutral</span>
          </div>
          <p className="font-bold text-emerald-900">
            🎯 [用途|ようと]：[日常清掃|にちじょうせいそう]・[軽|かる]い[手|て]あか
          </p>
          <p className="text-slate-700 leading-relaxed">
            建材を痛めにくく、手肌にも優しい。毎日の拭き掃除の中心洗剤。
          </p>
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-900 font-bold text-[11px]">
            ✅ 大理石やワックス床にも安全に使用可能。
          </div>
        </div>

        {/* Alkaline */}
        <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-300 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-black text-indigo-950 text-sm">アルカリ性（pH 8〜14）</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-200 text-indigo-900">Alkaline</span>
          </div>
          <p className="font-bold text-indigo-900">
            🎯 [落|お]とせる[汚|よご]れ：[油汚|あぶらよご]れ・[皮脂|ひし]・ワックス[剥離|はくり]
          </p>
          <p className="text-slate-700 leading-relaxed">
            酸性の油汚れをケン化（石けん化）して溶解します。
          </p>
          <div className="p-2 rounded-lg bg-indigo-100 text-indigo-900 font-bold text-[11px]">
            ⚠️ 手荒れやゴム手袋の着用が必須。
          </div>
        </div>

      </div>
    </div>
  );
}

/**
 * 7. Workplace Conversation Scenario Card (現場会話シミュレーション)
 */
export interface ConversationLine {
  speaker: 'LEADER' | 'WORKER';
  speakerNameJp: string;
  speakerNameNe: string;
  textJp: string;
  textNe: string;
}

interface ConversationProps {
  titleJp: string;
  titleNe: string;
  badge: string;
  sceneJp: string;
  sceneNe: string;
  lines: ConversationLine[];
  examTipJp: string;
  examTipNe: string;
  showFurigana?: boolean;
  showNepali?: boolean;
}

export function WorkplaceConversationCard({
  titleJp,
  titleNe,
  badge,
  sceneJp,
  sceneNe,
  lines,
  examTipJp,
  examTipNe,
  showFurigana = true,
  showNepali = true,
}: ConversationProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
            <MessageSquareQuote className="w-4 h-4" />
          </span>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900">
              <FuriganaText text={titleJp} showFurigana={showFurigana} />
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              🇳🇵 {titleNe}
            </p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200 text-[10px] font-black uppercase">
          {badge}
        </span>
      </div>

      {/* Scene Context */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-0.5">
        <p className="font-bold text-slate-900 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-500" />
          状況設定（Scene Setting）：
        </p>
        <p>{sceneJp}</p>
        {showNepali && <p className="text-[11px] text-slate-500">🇳🇵 {sceneNe}</p>}
      </div>

      {/* Conversation Dialogues */}
      <div className="space-y-3 pt-1">
        {lines.map((line, idx) => {
          const isLeader = line.speaker === 'LEADER';

          return (
            <div
              key={idx}
              className={`flex items-start gap-3 ${isLeader ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                  isLeader
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-indigo-600 text-white shadow-xs'
                }`}
              >
                {isLeader ? 'L' : 'W'}
              </div>

              {/* Speech Bubble */}
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs space-y-1 ${
                  isLeader
                    ? 'bg-emerald-50/80 border border-emerald-200 text-slate-900 rounded-tl-none'
                    : 'bg-indigo-50/80 border border-indigo-200 text-slate-900 rounded-tr-none'
                }`}
              >
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  {line.speakerNameJp} ({line.speakerNameNe})
                </p>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                  <FuriganaText text={line.textJp} showFurigana={showFurigana} />
                </p>
                {showNepali && (
                  <p className="text-[11px] text-slate-600 border-t border-slate-200/60 pt-1 leading-snug">
                    🇳🇵 {line.textNe}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Exam Tip Note */}
      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
        <p className="font-bold flex items-center gap-1.5">
          <Lightbulb className="w-4 h-4 text-amber-600" />
          試験対策のキーフレーズ（Exam Dialogue Point）：
        </p>
        <p className="leading-relaxed">{examTipJp}</p>
        {showNepali && (
          <p className="text-[11px] text-amber-800 leading-relaxed border-t border-amber-200/60 pt-1">
            🇳🇵 {examTipNe}
          </p>
        )}
      </div>

    </div>
  );
}
