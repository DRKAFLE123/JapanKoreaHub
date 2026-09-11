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
  furiganaType?: 'hiragana' | 'katakana';
  showNepali?: boolean;
}

/**
 * 1. Vacuum Cleaner Diagram (真空掃除機 / バキュームクリーナー)
 */
export function VacuumCleanerDiagram({ showFurigana = true, furiganaType = 'katakana', showNepali = true }: DiagramProps) {
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

/**
 * 7. Stepladder Safety Diagram (脚立・はしごの安全点検と高所墜落防止)
 */
export function StepladderSafetyDiagram({ showFurigana = true, furiganaType = 'katakana', showNepali = true }: DiagramProps) {
  const [selectedPart, setSelectedPart] = useState<'top' | 'lock' | 'feet' | 'rule'>('top');

  const parts: Record<string, { titleJp: string; titleNe: string; descJp: string; descNe: string; cautionJp: string }> = {
    top: {
      titleJp: '[天板|てんばん]（最上段に乗る行為は[厳禁|げんきん]）',
      titleNe: 'भर्याङको सबैभन्दा माथिल्लो भाग (खुट्टा टेक्न कडा मनाही)',
      descJp: '脚立の天板に立ったり、またがって作業することは転倒・墜落の危険が極めて高く、労働安全衛生規則で禁止されています。作業時は天板から２段目以下の踏ざんに立ちます。',
      descNe: 'भर्याङको सबैभन्दा माथिल्लो भागमा उभिँदा सन्तुलन गुमेर लड्ने ठूलो जोखिम हुने भएकाले यसमा कहिल्यै उभिनु हुँदैन। काम गर्दा माथिबाट दोस्रो वा त्योभन्दा तलको खुड्किलोमा उभिनुपर्छ।',
      cautionJp: '【CBT頻出試験問題】「天板にまたがって作業した」→ 必ず×（誤り）。',
    },
    lock: {
      titleJp: '[開|ひら]き[止|ど]め[金具|かなぐ]（完全にロックして固定）',
      titleNe: 'भर्याङ लक गर्ने बिचको धातुको पट्टी (Spread Lock Bracket)',
      descJp: '脚立を開いた際、両側の脚が勝手に閉じたり広がったりしないように固定する金具です。確実に「カチッ」とまっすぐ水平にロックされていることを作業前に目視確認します。',
      descNe: 'भर्याङ खुम्चिन वा अचानक बन्द हुन नदिन बीचमा राखिएको लक गर्ने पट्टी हो। काम सुरु गर्नुअघि यो सीधा र पूर्ण रूपमा लक भएको जाँच गर्नुपर्छ।',
      cautionJp: '金具が外れたり曲がっている状態での使用は厳禁です。',
    },
    feet: {
      titleJp: '[脚|あし]ゴム（すべり[止|ど]めゴム・[設置面|せっちめん]の[確認|かくにん]）',
      titleNe: 'भर्याङको फेदको रबर (Anti-slip Rubber Feet)',
      descJp: '床面と接する脚の先端に装着されたゴム。摩耗・破れ・油の付着がないか点検します。設置場所は必ず水平で平らな安定した床を選び、濡れた床や段差には設置しません。',
      descNe: 'भुइँमा अड्याउने खुट्टाको फेदमा भएको रबर हो। यो खिइएको वा तेल लागेको हुनुहुँदैन। भर्याङ सधैं समतल र नचिप्लने ठाउँमा राख्नुपर्छ।',
      cautionJp: '床に段差や異物がある場所、マンホール上には絶対に設置してはいけません。',
    },
    rule: {
      titleJp: '[三点支持|さんてんしじ]の[原則|げんそく]（両足＋片手 または 両手＋片足）',
      titleNe: 'तीन-बिन्दु समर्थनको नियम (Three-Point Contact Rule)',
      descJp: '昇降時や作業時は、常に身体の３箇所（両足と片手、または両手と片足）が脚立に接触している状態を保ちます。身を乗り出しての作業はバランスを崩すため絶対に行いません。',
      descNe: 'भर्याङ चढ्दा वा ओर्लंदा सधैं शरीरका ३ अङ्ग (दुवै खुट्टा र एक हात, वा दुवै हात र एक खुट्टा) भर्याङमा छोइएको हुनुपर्छ। धेरै बाहिर झुकेर काम गर्नु हुँदैन।',
      cautionJp: '届かない場所は脚立を降りて設置場所を移動させます。無理な身の乗り出しは厳禁。',
    },
  };

  const current = parts[selectedPart];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
            🪜
          </span>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
              <FuriganaText text="[脚立|きゃたつ]の[安全点検|あんぜんてんけん]と[高所墜落防止|こうしょついらくぼうし]" showFurigana={showFurigana} furiganaType={furiganaType} />
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              🇳🇵 भर्याङ प्रयोगको सुरक्षा नियम र लड्नबाट बच्ने उपाय (Stepladder Safety)
            </p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-black uppercase">
          ⚠️ High-Chance Exam Topic
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* SVG Stepladder Diagram */}
        <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center">
          <svg className="w-44 h-56" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Ladder Frame Left & Right Stems */}
            <line x1="60" y1="40" x2="25" y2="215" stroke="#475569" strokeWidth="7" strokeLinecap="round" />
            <line x1="140" y1="40" x2="175" y2="215" stroke="#475569" strokeWidth="7" strokeLinecap="round" />

            {/* Top Plate with Red Caution Stripes */}
            <rect x="50" y="32" width="100" height="14" rx="3" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
            <text x="100" y="43" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900">天板 乗るな！</text>

            {/* Steps */}
            <line x1="53" y1="75" x2="147" y2="75" stroke="#94A3B8" strokeWidth="5" strokeLinecap="round" />
            <line x1="45" y1="115" x2="155" y2="115" stroke="#94A3B8" strokeWidth="5" strokeLinecap="round" />
            <line x1="37" y1="155" x2="163" y2="155" stroke="#94A3B8" strokeWidth="5" strokeLinecap="round" />
            <line x1="29" y1="195" x2="171" y2="195" stroke="#94A3B8" strokeWidth="5" strokeLinecap="round" />

            {/* Spread Lock Bracket (Middle) */}
            <line x1="45" y1="115" x2="100" y2="120" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
            <line x1="100" y1="120" x2="155" y2="115" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
            <circle cx="100" cy="120" r="4" fill="#059669" />

            {/* Rubber Feet */}
            <rect x="18" y="215" width="16" height="12" rx="3" fill="#1E293B" />
            <rect x="166" y="215" width="16" height="12" rx="3" fill="#1E293B" />

            {/* Prohibited standing symbol on top */}
            <circle cx="100" cy="18" r="12" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
            <path d="M94 12 L106 24 M106 12 L94 24" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
          </svg>

          {/* Hotspot Selection Buttons */}
          <div className="grid grid-cols-2 gap-1.5 w-full mt-2">
            {[
              { id: 'top', label: '1. 天板 (乗るな!)' },
              { id: 'lock', label: '2. 開き止め金具' },
              { id: 'feet', label: '3. 脚ゴム・床面' },
              { id: 'rule', label: '4. 三点支持則' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSelectedPart(btn.id as any)}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                  selectedPart === btn.id
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Hotspot Explanation */}
        <div className="md:col-span-7 space-y-2.5">
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
            <h5 className="text-sm font-black text-amber-950">
              <FuriganaText text={current.titleJp} showFurigana={showFurigana} furiganaType={furiganaType} />
            </h5>
            <p className="text-xs font-bold text-amber-800">
              🇳🇵 {current.titleNe}
            </p>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {current.descJp}
            </p>
            {showNepali && (
              <p className="text-xs text-slate-600 leading-relaxed border-t border-amber-200/60 pt-1">
                🇳🇵 {current.descNe}
              </p>
            )}
          </div>

          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950 space-y-1">
            <p className="font-bold flex items-center gap-1 text-rose-800">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>試験・実務の最重要ルール (Exam Trap)</span>
            </p>
            <p className="text-[11px] leading-snug">{current.cautionJp}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 8. Personal Protective Equipment Diagram (個人用保護具 / PPE)
 */
export function PersonalProtectiveEquipmentDiagram({ showFurigana = true, furiganaType = 'katakana', showNepali = true }: DiagramProps) {
  const [selectedGear, setSelectedGear] = useState<'shoes' | 'gloves' | 'goggles' | 'mask'>('shoes');

  const gears: Record<string, { titleJp: string; titleNe: string; roleJp: string; roleNe: string; ruleJp: string }> = {
    shoes: {
      titleJp: '[安全靴|あんぜんぐつ]（つま[先芯|さきしん]入り・[耐滑底|たいかつぞこ]）',
      titleNe: 'सुरक्षा जुत्ता (Safety Shoes with Steel Toe)',
      roleJp: '重い機材（ポリッシャー等）の落下から足先を守る鋼製先芯と、濡れた床・ワックス剥離液で滑らない耐滑ソールを備えています。',
      roleNe: 'गह्रुङ्गो उपकरण खस्दा खुट्टा जोगाउने स्टीलको अगाडिको भाग र चिप्लो भुइँमा नचिप्लने रबरको सोल हुन्छ।',
      ruleJp: '靴ひもがほどけていないか、かかとを踏んで履いていないかを毎朝点検します。',
    },
    gloves: {
      titleJp: '[耐薬品性|たいやくひんせい]ゴム[手袋|てぶくろ]（[酸|さん]・アルカリ・[感染防止|かんせんぼうし]）',
      titleNe: 'रसायन प्रतिरोधी रबर पन्जा (Chemical & Infection Gloves)',
      roleJp: '洗剤（強酸・強アルカリ・剥離剤）による手荒れ・化学熱傷や、トイレ清掃・汚物処理での病原菌感染を防ぐために着用します。',
      roleNe: 'कडा एसिड, अल्कालाइन रसायनले छाला जलाउन नदिन र शौचालय सरसफाइमा कीटाणु सर्नबाट रोक्न लगाइन्छ।',
      ruleJp: 'トイレ用と一般エリア用でゴム手袋を色分け（交差汚染防止）し、使用後は必ず手指消毒します。',
    },
    goggles: {
      titleJp: '[保護|ほご]メガネ（[洗剤飛沫|せんざいひまつ]からの[眼保護|めほご]）',
      titleNe: 'सुरक्षा चस्मा (Safety Splash Goggles)',
      roleJp: '洗剤の希釈時、剥離剤の散布時、高圧洗浄時に、薬剤の飛沫が目に入るのを防ぎます。失明や眼球損傷事故を防止します。',
      roleNe: 'रसायन घोल्दा, भुइँमा छर्कंदा वा पानीको छिटा आँखामा पर्न नदिन लगाइने सुरक्षा चस्मा हो।',
      ruleJp: 'もし洗剤が目に入った場合は、直ちに流水で１５分以上洗い流し、医師の診察を受けます。',
    },
    mask: {
      titleJp: '[防|ぼう]じん・[防毒|ぼうどく]マスク（[粉塵|ふんじん]・[有毒蒸気|ゆうどくじょうき]の[吸入防止|きゅうにゅうぼうし]）',
      titleNe: 'सुरक्षा मास्क (Dust & Chemical Vapor Mask)',
      roleJp: 'ワックス剥離作業の溶剤臭気や、エアコンフィルター清掃時のほこり、トイレ消毒剤の蒸気を吸い込まないように着用します。',
      roleNe: 'वाक्स उप्काउने रसायनको गन्ध, धुलो र कीटाणुनाशक ग्यास फोक्सोमा जान नदिन लगाइन्छ।',
      ruleJp: '作業場所は必ず窓を開けるか換気扇を回して「換気（かんき）」を徹底します。',
    },
  };

  const current = gears[selectedGear];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
            🦺
          </span>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
              <FuriganaText text="[作業前点検|さぎょうまえてんけん]：[個人用保護具|こじんようほごぐ]（PPE）の[完全着用|かんぜんちゃくよう]" showFurigana={showFurigana} furiganaType={furiganaType} />
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              🇳🇵 व्यक्तिगत सुरक्षा उपकरण (Personal Protective Equipment - PPE)
            </p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-black uppercase">
          5S &amp; Safety Standard
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Vector Gear Illustration */}
        <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center">
          <svg className="w-40 h-52" viewBox="0 0 160 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Head & Goggles */}
            <circle cx="80" cy="40" r="22" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />
            <rect x="66" y="32" width="28" height="12" rx="4" fill="#67E8F9" stroke="#0891B2" strokeWidth="2" />
            {/* Mask */}
            <path d="M68 45 C68 55, 92 55, 92 45 Z" fill="#F1F5F9" stroke="#64748B" strokeWidth="2" />
            
            {/* Body / Uniform */}
            <rect x="52" y="65" width="56" height="70" rx="8" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
            <line x1="80" y1="65" x2="80" y2="135" stroke="#1E40AF" strokeWidth="2" />
            
            {/* Arms & Rubber Gloves */}
            <path d="M52 75 L30 115" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
            <path d="M108 75 L130 115" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
            <circle cx="28" cy="120" r="8" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
            <circle cx="132" cy="120" r="8" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />

            {/* Legs & Safety Shoes */}
            <line x1="66" y1="135" x2="66" y2="185" stroke="#1E3A8A" strokeWidth="8" strokeLinecap="round" />
            <line x1="94" y1="135" x2="94" y2="185" stroke="#1E3A8A" strokeWidth="8" strokeLinecap="round" />
            <rect x="54" y="185" width="22" height="12" rx="4" fill="#0F172A" stroke="#334155" strokeWidth="2" />
            <rect x="88" y="185" width="22" height="12" rx="4" fill="#0F172A" stroke="#334155" strokeWidth="2" />
          </svg>

          {/* Hotspot buttons */}
          <div className="grid grid-cols-2 gap-1.5 w-full mt-2">
            {[
              { id: 'shoes', label: '1. 安全靴 (先芯)' },
              { id: 'gloves', label: '2. 耐薬品手袋' },
              { id: 'goggles', label: '3. 保護メガネ' },
              { id: 'mask', label: '4. 防じんマスク' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSelectedGear(btn.id as any)}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                  selectedGear === btn.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Gear Information */}
        <div className="md:col-span-7 space-y-2.5">
          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
            <h5 className="text-sm font-black text-emerald-950">
              <FuriganaText text={current.titleJp} showFurigana={showFurigana} furiganaType={furiganaType} />
            </h5>
            <p className="text-xs font-bold text-emerald-800">
              🇳🇵 {current.titleNe}
            </p>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {current.roleJp}
            </p>
            {showNepali && (
              <p className="text-xs text-slate-600 leading-relaxed border-t border-emerald-200/60 pt-1">
                🇳🇵 {current.roleNe}
              </p>
            )}
          </div>

          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950 space-y-1">
            <p className="font-bold flex items-center gap-1 text-blue-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>始業前点検ルール (Daily Check Rule)</span>
            </p>
            <p className="text-[11px] leading-snug">{current.ruleJp}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 9. Automatic Floor Scrubber Diagram (自動床洗浄機 / オートスクラバー)
 */
export function AutoScrubberDiagram({ showFurigana = true, furiganaType = 'katakana', showNepali = true }: DiagramProps) {
  const [selectedPart, setSelectedPart] = useState<'tank_clean' | 'brush' | 'squeegee' | 'tank_dirty'>('brush');

  const parts: Record<string, { titleJp: string; titleNe: string; descJp: string; descNe: string }> = {
    tank_clean: {
      titleJp: '[洗浄水|せんじょうすい]タンク（[希釈洗剤|きしゃくせんざい]の[投入|とうにゅう]）',
      titleNe: 'सफा पानीको ट्याङ्की (Clean Solution Tank)',
      descJp: '床面を洗浄するための水と中性またはアルカリ性希釈洗剤を蓄えるタンクです。床質に合わせた正しい希釈倍率で給水します。',
      descNe: 'भुइँ सफा गर्न प्रयोग हुने पानी र डिटर्जेन्टको घोल राखिने ट्याङ्की हो।',
    },
    brush: {
      titleJp: '[洗浄|せんじょう]デッキ・ディスクブラシ（床面の[洗浄|せんじょう]）',
      titleNe: 'घुम्ने ब्रश र सफाइ डेक (Scrubbing Disc Brush)',
      descJp: '床面に洗剤を散布しながら高速回転するブラシまたはパッドで汚れを浮かせます。広いエントランスや空港ホールを短時間で洗浄します。',
      descNe: 'डिटर्जेन्ट छर्कंदै तीव्र गतिमा घुमेर भुइँको फोहोर उक्काउने मुख्य भाग हो।',
    },
    squeegee: {
      titleJp: 'バキュームスクイジー（[汚水|おすい]の[即座吸引回収|そくざきゅういんかいしゅう]）',
      titleNe: 'भ्याकुम स्क्विजी (Rear Squeegee & Vacuum Pickup)',
      descJp: '機体の後部に湾曲して取り付けられたゴム製スクイジー。ブラシが洗い出した汚水を強力なバキュームで一滴も残さず瞬時に吸引回収します。',
      descNe: 'धोएर निस्किएको फोहोर पानीलाई तत्कालै चुसेर सुक्खा बनाउने पछाडिको भाग हो।',
    },
    tank_dirty: {
      titleJp: '[回収汚水|かいしゅうおすい]タンク（[満水防止|まんすいぼうし]フロート[弁|べん]）',
      titleNe: 'फोहोर पानीको ट्याङ्की (Recovery Dirty Tank)',
      descJp: '吸引した汚水を溜めるタンク。満水になるとフロート弁が作動してモーターへの浸水を防ぎます。作業後は必ず排水し水洗い清掃します。',
      descNe: 'चुसेको फोहोर पानी जम्मा हुने ट्याङ्की। काम सकिएपछि अनिवार्य खाली गरी सफा गर्नुपर्छ।',
    },
  };

  const current = parts[selectedPart];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
            🚜
          </span>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
              <FuriganaText text="[自動床洗浄機|じどうゆかせんじょうき]（オートスクラバー）のしくみ" showFurigana={showFurigana} furiganaType={furiganaType} />
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              🇳🇵 स्वचालित भुइँ सफा गर्ने मेसिन (Automatic Walk-behind / Ride-on Scrubber)
            </p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-black uppercase">
          Commercial Machinery
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* SVG Auto-Scrubber */}
        <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center">
          <svg className="w-48 h-48" viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Body */}
            <rect x="30" y="45" width="130" height="75" rx="14" fill="#0D9488" stroke="#0F766E" strokeWidth="3" />
            <rect x="40" y="55" width="55" height="40" rx="6" fill="#CCFBF1" stroke="#14B8A6" strokeWidth="2" />
            <rect x="100" y="55" width="50" height="40" rx="6" fill="#99F6E4" stroke="#0D9488" strokeWidth="2" />

            {/* Handlebar */}
            <path d="M160 65 L185 50" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
            
            {/* Front Brush Deck */}
            <rect x="25" y="115" width="40" height="15" rx="3" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
            <circle cx="45" cy="130" r="10" fill="#78350F" />

            {/* Wheels */}
            <circle cx="85" cy="130" r="14" fill="#334155" stroke="#0F172A" strokeWidth="2" />
            <circle cx="145" cy="130" r="14" fill="#334155" stroke="#0F172A" strokeWidth="2" />

            {/* Rear Curved Squeegee */}
            <path d="M165 110 C175 125, 175 140, 165 148" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
            <text x="175" y="132" fill="#EF4444" fontSize="8" fontWeight="bold">Squeegee</text>
          </svg>

          {/* Hotspots */}
          <div className="grid grid-cols-2 gap-1.5 w-full mt-2">
            {[
              { id: 'tank_clean', label: '1. 洗浄液タンク' },
              { id: 'brush', label: '2. ディスクブラシ' },
              { id: 'squeegee', label: '3. 吸水スクイジー' },
              { id: 'tank_dirty', label: '4. 回収タンク' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSelectedPart(btn.id as any)}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                  selectedPart === btn.id
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Part Detail */}
        <div className="md:col-span-7 space-y-2.5">
          <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200 space-y-1.5">
            <h5 className="text-sm font-black text-teal-950">
              <FuriganaText text={current.titleJp} showFurigana={showFurigana} furiganaType={furiganaType} />
            </h5>
            <p className="text-xs font-bold text-teal-800">
              🇳🇵 {current.titleNe}
            </p>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {current.descJp}
            </p>
            {showNepali && (
              <p className="text-xs text-slate-600 leading-relaxed border-t border-teal-200/60 pt-1">
                🇳🇵 {current.descNe}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 10. Floor & Carpet Blower Diagram (送風乾燥機 / ブロアー)
 */
export function FloorBlowerDiagram({ showFurigana = true, furiganaType = 'katakana', showNepali = true }: DiagramProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-200">
            💨
          </span>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
              <FuriganaText text="[送風乾燥機|そうふうかんそうき]（ブロアー）の[役割|やくわり]と[乾燥手順|かんそうてじゅん]" showFurigana={showFurigana} furiganaType={furiganaType} />
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              🇳🇵 भुइँ र कार्पेट सुकाउने शक्तिशाली पंखा (Air Mover / Carpet Blower)
            </p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 text-[10px] font-black uppercase">
          Drying Equipment
        </span>
      </div>

      <div className="p-3.5 rounded-xl bg-cyan-50/70 border border-cyan-200 space-y-2 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-xl border border-cyan-100 space-y-1">
            <p className="font-bold text-cyan-950">① ワックス塗布後の急速乾燥</p>
            <p className="text-slate-600">
              床面にワックスを塗布した後、送風機を床面と平行に向けて風を送り、乾燥ムラを防ぎながら素早く乾燥させます。
            </p>
            <p className="text-[11px] text-cyan-800">🇳🇵 भुइँमा वाक्स लगाएपछि छिटो र बराबर सुकाउन प्रयोग गरिन्छ।</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-cyan-100 space-y-1">
            <p className="font-bold text-cyan-950">② カーペット洗浄後のカビ・臭い防止</p>
            <p className="text-slate-600">
              エクストラクター等で水洗いしたカーペットの奥深くまで風を行き渡らせ、生乾きによる悪臭やカビの発生を完全に防ぎます。
            </p>
            <p className="text-[11px] text-cyan-800">🇳🇵 कार्पेट धोएपछि भित्री भागसम्म सुकाएर ढुसी पर्नबाट रोक्छ।</p>
          </div>
        </div>
      </div>
    </div>
  );
}
