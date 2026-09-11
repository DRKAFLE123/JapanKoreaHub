'use client';
import React, { useState } from 'react';
import FuriganaText from '@/components/building-cleaning/FuriganaText';
import {
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  ChevronRight,
  Activity,
  Heart,
  Thermometer,
  Clock,
  Sparkles,
  Volume2
} from 'lucide-react';

interface DiagramProps {
  showFurigana?: boolean;
  furiganaType?: 'katakana' | 'hiragana';
  showNepali?: boolean;
}

/**
 * 1. Body Mechanics Diagram (ボディメカニクスの8原則)
 */
export function BodyMechanicsDiagram({
  showFurigana = true,
  furiganaType = 'katakana',
  showNepali = true
}: DiagramProps) {
  const [selectedRule, setSelectedRule] = useState<number>(0);

  const rules = [
    {
      num: 1,
      titleJp: '支持基底面を広く取る',
      titleNe: 'खुट्टा फराकिलो पारेर आधार क्षेत्र बढाउने (Base of Support)',
      descJp: '足を前後に肩幅程度広げて立つことで、介助者の安定性が飛躍的に高まります。',
      descNe: 'खुट्टा काँध बराबर अगाडि-पछाडि फैलाएर उभिँदा शरीरको सन्तुलन धेरै बलियो हुन्छ।',
      icon: '🦶'
    },
    {
      num: 2,
      titleJp: '重心を低くする（膝を曲げる）',
      titleNe: 'घुँडा खुम्च्याएर शरीरको केन्द्रबिन्दु तल झार्ने (Lower Center of Gravity)',
      descJp: '腰を曲げるのではなく、膝をしっかり曲げて腰を落とすことで腰痛を防ぎます。',
      descNe: 'कम्मर ननिहुराई घुँडा खुम्च्याएर शरीरको केन्द्रबिन्दु तल झार्दा ढाड सुरक्षित रहन्छ।',
      icon: '🦵'
    },
    {
      num: 3,
      titleJp: '利用者に身体を近づける',
      titleNe: 'बिरामीलाई आफ्नो शरीरको सकेसम्म नजिक राख्ने (Keep User Close)',
      descJp: '介助者と利用者の距離を近づけることで、てこの腕の長さが短くなり腰の負担が最小になります。',
      descNe: 'बिरामी र आफ्नो शरीर नजिक राख्दा लिभरको दूरी कम भई कम्मरमा भार पर्दैन।',
      icon: '🫂'
    },
    {
      num: 4,
      titleJp: '大きな筋群を使う（大腿四頭筋・臀筋）',
      titleNe: 'ढाडको साटो तिघ्रा र हिपको ठूलो मांसपेशी प्रयोग गर्ने (Use Large Muscles)',
      descJp: '腕や腰の弱い筋肉ではなく、大腿筋や腹筋・臀筋を使って持ち上げます。',
      descNe: 'कमजोर ढाड र हातको साटो तिघ्रा (Quadriceps) र हिपका बलिया मांसपेशी प्रयोग गर्नुपर्छ।',
      icon: '💪'
    },
    {
      num: 5,
      titleJp: '利用者の身体を小さくまとめる',
      titleNe: 'बिरामीका हातखुट्टा छातीमा पट्याएर घर्षण कम गर्ने (Compact Posture)',
      descJp: '利用者に腕を胸の前で組んでもらうことで、ベッドとの摩擦面積を減らし動かしやすくします。',
      descNe: 'बिरामीको हात छातीमा बाँध्न लगाउँदा ओछ्यानसँगको घर्षण कम भई सजिलै सार्न सकिन्छ।',
      icon: '📦'
    },
    {
      num: 6,
      titleJp: '押すより手前に引く力を使う',
      titleNe: 'धकेल्नुको सट्टा आफूतिर तान्ने बल प्रयोग गर्ने (Pull Rather Than Push)',
      descJp: '押す動作よりも、身体全体を使って手前に引く動作の方が効率的に力を発揮できます。',
      descNe: 'धकेल्नुभन्दा शरीरको तौल पछाडि सारेर आफूतिर तान्दा धेरै कम बल लाग्छ।',
      icon: '🧲'
    },
    {
      num: 7,
      titleJp: '身体（体軸）をねじらない',
      titleNe: 'ढाड नबटारी खुट्टाको दिशा घुमाउने (Do Not Twist Torso)',
      descJp: '足先を動かしたい方向へ向けて身体全体で向きを変えます。腰のねじれ骨折や捻挫を防止します。',
      descNe: 'कम्मर नबटारी सार्न खोजेको दिशातर्फ खुट्टा नै घुमाएर सर्दा ढाडमा चोट लाग्दैन।',
      icon: '🔄'
    },
    {
      num: 8,
      titleJp: '水平に移動（持ち上げない）',
      titleNe: 'सिधै माथि नउचाली तेर्सो रूपमा चिप्ल्याउने (Slide Horizontally)',
      descJp: '重力に逆らって持ち上げるのではなく、スライディングシートなどを活用して水平に滑らせます。',
      descNe: 'गुरुत्वाकर्षण विरुद्ध ठाडो उचाल्नुको सट्टा तेर्सो रूपमा चिप्ल्याएर सार्ने।',
      icon: '➡️'
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-800 text-xl border border-emerald-200">
            ⚖️
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">
              Ergonomics &amp; Safety Standard
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              <FuriganaText text="ボディメカニクスの8原則" showFurigana={showFurigana} furiganaType={furiganaType} />
            </h3>
            {showNepali && (
              <p className="text-xs text-slate-600 font-medium">
                बडी मेकानिक्सका ८ आधारभूत नियमहरू (ढाड दुखाइ रोकथाम)
              </p>
            )}
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-black">
          8 Rules
        </span>
      </div>

      {/* Interactive 8 Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {rules.map((r, i) => (
          <button
            key={i}
            onClick={() => setSelectedRule(i)}
            className={`p-2.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center gap-2 text-xs ${
              selectedRule === i
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
            }`}
          >
            <span className="text-base shrink-0">{r.icon}</span>
            <div className="truncate">
              <span className="block font-black text-[11px]">Rule {r.num}</span>
              <span className="truncate block opacity-90 text-[10px]">{r.titleJp.substring(0, 8)}...</span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Rule Detail Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white border border-emerald-200 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{rules[selectedRule].icon}</span>
          <div>
            <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">
              Rule {rules[selectedRule].num} of 8
            </span>
            <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
              <FuriganaText text={rules[selectedRule].titleJp} showFurigana={showFurigana} furiganaType={furiganaType} />
            </h4>
          </div>
        </div>
        {showNepali && (
          <p className="text-xs text-emerald-950 font-bold border-t border-emerald-200/60 pt-1.5">
            🇳🇵 {rules[selectedRule].titleNe}
          </p>
        )}
        <p className="text-xs text-slate-700 leading-relaxed font-medium">
          <FuriganaText text={rules[selectedRule].descJp} showFurigana={showFurigana} furiganaType={furiganaType} />
        </p>
        {showNepali && (
          <p className="text-[11px] text-slate-600 leading-relaxed">
            {rules[selectedRule].descNe}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * 2. Wheelchair Anatomy & Safety Operations (車椅子の構造と安全操作)
 */
export function WheelchairSafetyDiagram({
  showFurigana = true,
  furiganaType = 'katakana',
  showNepali = true
}: DiagramProps) {
  const parts = [
    {
      nameJp: '駐車ブレーキ（パーキングブレーキ）',
      nameNe: 'पार्किङ ब्रेक (Parking Brake)',
      descJp: '乗り降り・移乗時は必ず両輪のブレーキを確実にかけます。',
      descNe: 'ह्वीलचेयरमा बस्दा वा उठ्दा सधैं दुबै पाङ्ग्राको ब्रेक अनिवार्य लगाउनुपर्छ।'
    },
    {
      nameJp: 'フットサポート（足載せ台）',
      nameNe: 'फुटसपोर्ट / खुट्टा अड्याउने प्लेट (Footrest)',
      descJp: '移乗時は必ず跳ね上げ、走行時は両足を載せます。足が巻き込まれるのを防ぎます。',
      descNe: 'सार्ने बेला माथि उठाउने र हिँड्दा खुट्टा अड्याएर पाङ्ग्रामा पर्नबाट जोगाउने।'
    },
    {
      nameJp: 'ティッピングレバー',
      nameNe: 'टिपिङ लिभर / अगाडिको पाङ्ग्रा उठाउने लिभर (Tipping Lever)',
      descJp: '段差を上がる際、介助者が足で踏み込んで前輪（キャスター）を浮かせます。',
      descNe: 'अग्लो ठाउँ चढ्दा खुट्टाले थिचेर अगाडिका साना पाङ्ग्रा माथि उचाल्ने।'
    },
    {
      nameJp: 'キャスター（前輪）',
      nameNe: 'क्यास्टर / अगाडिका साना पाङ्ग्रा (Front Casters)',
      descJp: '360度回転して小回りを利かせます。小さな溝に落ちやすいため段差では浮かします。',
      descNe: 'दिशा घुमाउने साना पाङ्ग्रा। नाली वा खाल्डोमा अड्किन सक्ने हुँदा पेटीमा उठाउनुपर्छ।'
    },
    {
      nameJp: 'ハンドリム（駆動輪リング）',
      nameNe: 'ह्यान्ड रिम (प्रयोगकर्ताले आफैं गुडाउने गोलो रिङ)',
      descJp: '利用者が自走するときに手で握って回す外側の輪です。',
      descNe: 'प्रयोगकर्ता आफैंले हातले घुमाएर अगाडि बढ्ने पाङ्ग्राको बाहिरी रिङ।'
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2.5 rounded-2xl bg-indigo-100 text-indigo-800 text-xl border border-indigo-200">
            ♿
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 block">
              Mobility Equipment
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              <FuriganaText text="車椅子の各部名称と安全操作ルール" showFurigana={showFurigana} furiganaType={furiganaType} />
            </h3>
            {showNepali && (
              <p className="text-xs text-slate-600 font-medium">
                ह्वीलचेयरका मुख्य भागहरू र चलाउँदा ध्यान दिनुपर्ने सुरक्षा नियमहरू
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Safety Rules Callout Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1">
          <div className="flex items-center gap-1.5 text-amber-800 font-black text-xs">
            <AlertTriangle className="w-4 h-4" />
            <span>下り坂の鉄則：必ず「後ろ向き」</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            前向きに進むと利用者が前のめりに転落します。介助者が後退して下ります。
          </p>
          {showNepali && (
            <p className="text-[11px] text-amber-900 font-medium">
              🇳🇵 ओरालो झर्दा बिरामी भुइँमा खस्ने खतरा हुने भएकाले सधैं पछाडि फर्केर झर्नुपर्छ।
            </p>
          )}
        </div>

        <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200 space-y-1">
          <div className="flex items-center gap-1.5 text-indigo-800 font-black text-xs">
            <CheckCircle2 className="w-4 h-4" />
            <span>段差（縁石）の鉄則：ティッピングレバー</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            足でティッピングレバーを踏み前輪（キャスター）を段の上に載せてから進みます。
          </p>
          {showNepali && (
            <p className="text-[11px] text-indigo-900 font-medium">
              🇳🇵 पेटी चढ्दा पछाडिको लिभरमा खुट्टाले थिचेर साना पाङ्ग्रा पहिला माथि चढाउने।
            </p>
          )}
        </div>
      </div>

      {/* Parts List Grid */}
      <div className="space-y-2 pt-1">
        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
          Key Functional Components (主要パーツ)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {parts.map((p, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-900 block leading-snug">
                <FuriganaText text={p.nameJp} showFurigana={showFurigana} furiganaType={furiganaType} />
              </span>
              {showNepali && <p className="text-[10px] text-indigo-900 font-semibold">{p.nameNe}</p>}
              <p className="text-[10px] text-slate-600 leading-relaxed">{p.descNe}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * 3. Hemiplegia Bed-to-Wheelchair Transfer (片麻痺の移乗介助)
 */
export function HemiplegiaTransferDiagram({
  showFurigana = true,
  furiganaType = 'katakana',
  showNepali = true
}: DiagramProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2.5 rounded-2xl bg-cyan-100 text-cyan-800 text-xl border border-cyan-200">
            🔄
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-700 block">
              Clinical Transfer Technique
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              <FuriganaText text="片麻痺のベッド・車椅子移乗ルール（健側20〜30度）" showFurigana={showFurigana} furiganaType={furiganaType} />
            </h3>
            {showNepali && (
              <p className="text-xs text-slate-600 font-medium">
                पक्षघात भएका बिरामीलाई बेडबाट ह्वीलचेयरमा सार्ने विधि (स्वस्थ भागमा २०-३० डिग्री)
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Step-by-Step Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <span className="px-2 py-0.5 rounded-md bg-cyan-100 text-cyan-800 text-[10px] font-black uppercase">
            Step 1: 車椅子の配置
          </span>
          <h4 className="text-xs font-bold text-slate-900">
            <FuriganaText text="必ず「健側」に20〜30度で寄せる" showFurigana={showFurigana} furiganaType={furiganaType} />
          </h4>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            麻痺のない健側の手でアームサポートをつかみ、健側の足で踏ん張れるように配置します。
          </p>
          {showNepali && (
            <p className="text-[10px] text-cyan-900 font-semibold border-t border-slate-200/60 pt-1">
              🇳🇵 ह्वीलचेयर सधैं स्वस्थ भाग (केन्सोकु) तर्फ २०-३० डिग्रीको कोणमा राख्ने।
            </p>
          )}
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <span className="px-2 py-0.5 rounded-md bg-cyan-100 text-cyan-800 text-[10px] font-black uppercase">
            Step 2: 安全確認
          </span>
          <h4 className="text-xs font-bold text-slate-900">
            <FuriganaText text="両輪ブレーキとフットレスト上げ" showFurigana={showFurigana} furiganaType={furiganaType} />
          </h4>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            ブレーキが確実にかかっていることを指差し確認し、足載せ台を上げて足元のスペースを確保します。
          </p>
          {showNepali && (
            <p className="text-[10px] text-cyan-900 font-semibold border-t border-slate-200/60 pt-1">
              🇳🇵 दुबै ब्रेक लागेको र खुट्टा राख्ने प्लेट माथि उठाएको निश्चित गर्ने।
            </p>
          )}
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <span className="px-2 py-0.5 rounded-md bg-cyan-100 text-cyan-800 text-[10px] font-black uppercase">
            Step 3: 立ち上がりと旋回
          </span>
          <h4 className="text-xs font-bold text-slate-900">
            <FuriganaText text="前傾姿勢で健側の足で立ち上がる" showFurigana={showFurigana} furiganaType={furiganaType} />
          </h4>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            上半身を前傾させて重心を足に移し、介助者は患側の膝を支えながら健側を軸に回転します。
          </p>
          {showNepali && (
            <p className="text-[10px] text-cyan-900 font-semibold border-t border-slate-200/60 pt-1">
              🇳🇵 अगाडि निहुरिएर स्वस्थ खुट्टाले टेक्दै बिरामीलाई घुमाएर कुर्चीमा बसाल्ने।
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * 4. Choking Prevention Posture Diagram (誤嚥防止の食事姿勢)
 */
export function ChokingPreventionPostureDiagram({
  showFurigana = true,
  furiganaType = 'katakana',
  showNepali = true
}: DiagramProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2.5 rounded-2xl bg-rose-100 text-rose-800 text-xl border border-rose-200">
            🍚
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 block">
              Aspiration Prevention
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              <FuriganaText text="誤嚥を防ぐ食事姿勢（あごを引く頸部前屈）" showFurigana={showFurigana} furiganaType={furiganaType} />
            </h3>
            {showNepali && (
              <p className="text-xs text-slate-600 font-medium">
                खाना सर्कन नदिने सही आसन (चिउँडो तल झुकाउने नियम)
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Correct Posture */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border-2 border-emerald-400 space-y-2">
          <div className="flex items-center gap-1.5 text-emerald-800 font-black text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>正解：あごを引く姿勢（頸部前屈）</span>
          </div>
          <p className="text-xs text-slate-800 leading-relaxed font-medium">
            あごを軽く引くと喉頭蓋（こうとうがい）が気管の入り口を塞ぎ、食べ物が食道へスムーズに流れます。
          </p>
          {showNepali && (
            <p className="text-[11px] text-emerald-900 font-semibold border-t border-emerald-200 pt-1">
              🇳🇵 चिउँडो हल्का छातीतर्फ झुकाउँदा श्वासनलीको ढक्कन बन्द भएर खाना सुरक्षित रूपमा पेटमा जान्छ।
            </p>
          )}
        </div>

        {/* Dangerous Posture */}
        <div className="p-4 rounded-2xl bg-rose-50/70 border-2 border-rose-300 space-y-2">
          <div className="flex items-center gap-1.5 text-rose-800 font-black text-xs">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>厳禁：あごを突き上げる姿勢</span>
          </div>
          <p className="text-xs text-slate-800 leading-relaxed font-medium">
            あごが上がると喉頭蓋が閉まらず気管が全開になり、激しいムセ・誤嚥・窒息を引き起こします。
          </p>
          {showNepali && (
            <p className="text-[11px] text-rose-900 font-semibold border-t border-rose-200 pt-1">
              🇳🇵 चिउँडो माथि उठाउँदा श्वासनली खुल्छ र खाना फोक्सोमा पसेर सास रोकिन सक्छ।
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * 5. Dressing Rule: Dakken Chakkan (脱健着患の衣服着脱)
 */
export function DakkenChakkanDiagram({
  showFurigana = true,
  furiganaType = 'katakana',
  showNepali = true
}: DiagramProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2.5 rounded-2xl bg-purple-100 text-purple-800 text-xl border border-purple-200">
            👕
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 block">
              Dressing Ergonomics
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              <FuriganaText text="片麻痺の衣服着脱ルール「脱健着患（だっけんちゃっかん）」" showFurigana={showFurigana} furiganaType={furiganaType} />
            </h3>
            {showNepali && (
              <p className="text-xs text-slate-600 font-medium">
                लुगा फेर्ने मुख्य नियम: 'दाक्केन चाक्कान' (फुकाल्दा स्वस्थबाट, लगाउँदा कमजोरबाट)
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Undress Phase */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-black">
            脱ぐとき（脱健: だっけん）
          </span>
          <h4 className="text-sm font-bold text-slate-900">
            <FuriganaText text="「健側（動く側）」から先に脱ぐ" showFurigana={showFurigana} furiganaType={furiganaType} />
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            よく動く健側から先に脱ぐことで服にゆとりができ、動かない患側に負担をかけずに脱がせられます。
          </p>
          {showNepali && (
            <p className="text-[11px] text-indigo-900 font-semibold border-t border-slate-200 pt-1">
              🇳🇵 फुकाल्दा: चल्ने स्वस्थ भागबाट पहिला फुकाल्ने, जसले गर्दा लुगा खुकुलो हुन्छ।
            </p>
          )}
        </div>

        {/* Dress Phase */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
            着るとき（着患: ちゃっかん）
          </span>
          <h4 className="text-sm font-bold text-slate-900">
            <FuriganaText text="「患側（麻痺側）」から先に着せる" showFurigana={showFurigana} furiganaType={furiganaType} />
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            動かない患側の腕や脚から先に袖を通し、後から動かせる健側の袖を通すことで脱臼を防ぎます。
          </p>
          {showNepali && (
            <p className="text-[11px] text-emerald-900 font-semibold border-t border-slate-200 pt-1">
              🇳🇵 लगाउँदा: नचल्ने कमजोर भागमा पहिला बाहुला छिराउने, अनि मात्र स्वस्थ भागमा लगाउने।
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * 6. Pressure Ulcer Bony Prominences & Repositioning (褥瘡予防と体位変換)
 */
export function PressureUlcerPreventionDiagram({
  showFurigana = true,
  furiganaType = 'katakana',
  showNepali = true
}: DiagramProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2.5 rounded-2xl bg-rose-100 text-rose-800 text-xl border border-rose-200">
            🛏️
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 block">
              Bedsore Prevention
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              <FuriganaText text="褥瘡（床ずれ）の好発部位と2時間ごとの体位変換" showFurigana={showFurigana} furiganaType={furiganaType} />
            </h3>
            {showNepali && (
              <p className="text-xs text-slate-600 font-medium">
                ओछ्यानको घाउ हुने जोखिमपूर्ण ठाउँहरू र हरेक २ घण्टामा कोल्टे फेराउने तालिका
              </p>
            )}
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-xs font-black">
          Every 2 Hours
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-black text-slate-400 uppercase">仰臥位（仰向け）</span>
          <h4 className="text-xs font-bold text-slate-900">
            <FuriganaText text="仙骨部（せんこつぶ）＆ 踵（かかと）" showFurigana={showFurigana} furiganaType={furiganaType} />
          </h4>
          <p className="text-[11px] text-slate-600">体重の約44%が臀部にかかり、最も褥瘡ができやすい部位です。</p>
          {showNepali && <p className="text-[10px] text-rose-900 font-semibold">🇳🇵 कम्मर मुनिको हड्डी (Sacrum) र कुर्कुच्चा</p>}
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-black text-slate-400 uppercase">側臥位（横向き）</span>
          <h4 className="text-xs font-bold text-slate-900">
            <FuriganaText text="大転子部（だいてんしぶ）＆ くるぶし" showFurigana={showFurigana} furiganaType={furiganaType} />
          </h4>
          <p className="text-[11px] text-slate-600">股関節の外側にある出っ張った骨に圧力が集中します。</p>
          {showNepali && <p className="text-[10px] text-rose-900 font-semibold">🇳🇵 जाँघको छेउको हड्डी (Greater Trochanter)</p>}
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-black text-slate-400 uppercase">予防の3原則</span>
          <h4 className="text-xs font-bold text-slate-900">
            <FuriganaText text="除圧・清潔・保湿" showFurigana={showFurigana} furiganaType={furiganaType} />
          </h4>
          <p className="text-[11px] text-slate-600">2時間以内の体位変換、シーツのシワ伸ばし、皮膚の保湿を行います。</p>
          {showNepali && <p className="text-[10px] text-rose-900 font-semibold">🇳🇵 दबाब हटाउने, सफा राख्ने र मोइस्चराइज गर्ने</p>}
        </div>
      </div>
    </div>
  );
}

/**
 * 7. Vital Signs Standards Chart (バイタルサイン基準値チャート)
 */
export function VitalSignsStandardsChart({
  showFurigana = true,
  furiganaType = 'katakana',
  showNepali = true
}: DiagramProps) {
  const vitals = [
    { itemJp: '体温 (BT)', normal: '36.0〜37.0℃', itemNe: 'शरीरको तापक्रम', alert: '37.5℃以上は発熱' },
    { itemJp: '血圧 (BP)', normal: '収縮期 <130 / 拡張期 <85 mmHg', itemNe: 'रक्तचाप', alert: '起立時めまい注意' },
    { itemJp: '脈拍 (PR)', normal: '60〜80 回/分', itemNe: 'नाडीको धड्कन', alert: '<60徐脈、>100頻脈' },
    { itemJp: '呼吸数 (RR)', normal: '12〜20 回/分', itemNe: 'श्वासप्रश्वास', alert: '無言で測定する' },
    { itemJp: '酸素飽和度 (SpO2)', normal: '96〜99 %', itemNe: 'रगतको अक्सिजन', alert: '<95%低酸素、<90%緊急' }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-800 text-xl border border-emerald-200">
            📊
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">
              Clinical Assessment
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              <FuriganaText text="バイタルサインの基準値（正常範囲）と異常値の判断" showFurigana={showFurigana} furiganaType={furiganaType} />
            </h3>
            {showNepali && (
              <p className="text-xs text-slate-600 font-medium">
                भाइटल साइन्सका सामान्य मानहरू र खतराका संकेतहरू
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {vitals.map((v, i) => (
          <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-black text-slate-900 block">{v.itemJp}</span>
            {showNepali && <p className="text-[10px] text-slate-500 font-semibold">{v.itemNe}</p>}
            <p className="text-sm font-black text-emerald-700 pt-0.5">{v.normal}</p>
            <span className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
              ⚠️ {v.alert}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 8. Dementia Classification Chart (認知症4大分類比較マップ)
 */
export function DementiaClassificationChart({
  showFurigana = true,
  furiganaType = 'katakana',
  showNepali = true
}: DiagramProps) {
  const types = [
    {
      titleJp: 'アルツハイマー型認知症',
      titleNe: 'अल्जाइमर्स डिमेन्सिया',
      share: '約65%（最多）',
      featuresJp: '記憶障害（直前の出来事を忘れる）、見当識障害。緩やかに進行。女性に多い。',
      featuresNe: 'भर्खरै भएका कुरा बिर्सने, समय र ठाउँ नचिन्नु। बिस्तारै बढ्दै जान्छ। महिलामा बढी।'
    },
    {
      titleJp: '血管性認知症',
      titleNe: 'भास्कुलर डिमेन्सिया',
      share: '約20%',
      featuresJp: '脳梗塞等の再発で階段状に悪化。できることとできないことがある「まだら認知症」。',
      featuresNe: 'स्ट्रोकका कारण सिँढी जस्तै ह्वात्तै बिग्रने। केही कुरा गर्न सक्ने केही नसक्ने (स्पटी डिमेन्सिया)।'
    },
    {
      titleJp: 'レビー小体型認知症',
      titleNe: 'लेवी बडी डिमेन्सिया',
      share: '約4%',
      featuresJp: '鮮明な「幻視（人や虫が見える）」、手足の震えや筋肉のこわばり（パーキンソニズム）。',
      featuresNe: 'नभएको मान्छे वा किरा देखिने (भ्रम/हलुसिनेसन), हातखुट्टा काम्ने र शरीर कडा हुने।'
    },
    {
      titleJp: '前頭側頭型認知症（ピック病）',
      titleNe: 'फ्रन्टो-टेम्पोरल डिमेन्सिया (पिक डिजिज)',
      share: '約1%',
      featuresJp: '「脱抑制（社会性の喪失、万引き、暴言）」、毎日同じ行動を繰り返す「常同行動」。',
      featuresNe: 'सामाजिक मर्यादा बिर्सने, रिसाउने वा चोर्ने र सधैं एउटै काम मात्र दोहोर्‍याइरहने।'
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2.5 rounded-2xl bg-indigo-100 text-indigo-800 text-xl border border-indigo-200">
            🧠
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 block">
              Dementia Care
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              <FuriganaText text="認知症の4大分類と臨床的特徴" showFurigana={showFurigana} furiganaType={furiganaType} />
            </h3>
            {showNepali && (
              <p className="text-xs text-slate-600 font-medium">
                डिमेन्सियाका ४ प्रमुख प्रकारहरू र मुख्य लक्षणहरू
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {types.map((t, idx) => (
          <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900">
                <FuriganaText text={t.titleJp} showFurigana={showFurigana} furiganaType={furiganaType} />
              </h4>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                {t.share}
              </span>
            </div>
            {showNepali && <p className="text-[10px] text-indigo-900 font-semibold">{t.titleNe}</p>}
            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
              <FuriganaText text={t.featuresJp} showFurigana={showFurigana} furiganaType={furiganaType} />
            </p>
            {showNepali && <p className="text-[10px] text-slate-500">{t.featuresNe}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 9. Care Record Reader Card (介護記録・申し送り票の読解)
 */
export function CareRecordReaderCard({
  showFurigana = true,
  furiganaType = 'katakana',
  showNepali = true
}: DiagramProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-800 text-xl border border-emerald-200">
            📋
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">
              Workplace Documentation
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              <FuriganaText text="介護記録・日勤帯申し送り票サンプル（読解演習）" showFurigana={showFurigana} furiganaType={furiganaType} />
            </h3>
            {showNepali && (
              <p className="text-xs text-slate-600 font-medium">
                केयर होमको दैनिक सिफ्ट रिपोर्ट (मौशीओकुरी) पढ्ने व्यावहारिक अभ्यास
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Simulated Care Log */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-300 font-sans space-y-3 text-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-2 border-b border-slate-200">
          <div>
            <span className="text-[10px] text-slate-400 block">利用者名</span>
            <span className="font-bold text-slate-900">高橋 健一 様 (84歳)</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">担当介護職</span>
            <span className="font-bold text-slate-900">タパ（日勤）</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">バイタル</span>
            <span className="font-bold text-slate-900">KT: 36.6℃ / BP: 124/78</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">食事・水分</span>
            <span className="font-bold text-slate-900">主食8割 / とろみ茶150ml</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="font-bold text-slate-800">【経過・特記事項】</span>
          <p className="text-slate-700 leading-relaxed font-medium">
            昼食時にムセなく全量摂取されたが、15時頃「左足に力が入らない」との訴えあり。
            看護師へ報告しベッド上安静。夜間のトイレ移乗は転倒リスク高いため【必ず2名介助】で対応を申し送ります。
          </p>
          {showNepali && (
            <p className="text-[11px] text-indigo-950 bg-white p-2 rounded-lg border border-slate-200 mt-1">
              🇳🇵 दिउँसोको खाना राम्ररी खानुभयो तर ३ बजेतिर देब्रे खुट्टामा बल नपुगेको गुनासो गर्नुभयो। नर्सलाई रिपोर्ट गरियो। राती शौचालय लैजाँदा लड्न सक्ने भएकाले अनिवार्य २ जना मिलेर सहयोग गर्न अनुरोध छ।
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * 10. Care Conversation Card (介護の会話・声かけカード)
 */
export function CaregivingConversationCard({
  showFurigana = true,
  furiganaType = 'katakana',
  showNepali = true
}: DiagramProps) {
  const dialogues = [
    {
      situationJp: '朝の挨拶と体調確認',
      situationNe: 'बिहानी अभिवादन र स्वास्थ्य सोधपुछ',
      nurseJp: '山田様、おはようございます！昨夜はよく眠れましたか？お熱を測りますね。',
      nurseNe: 'यामादा ज्यू, शुभ प्रभात! हिजो राती राम्रोसँग निदाउनुभयो? म ज्वरो नाप्छु है।',
      userJp: 'おはよう。うん、ぐっすり眠れたよ。ありがとう。',
      userNe: 'शुभ प्रभात। अँ, मज्जाले निदाएँ। धन्यवाद।'
    },
    {
      situationJp: '車椅子移乗前の声かけ',
      situationNe: 'ह्वीलचेयरमा सार्नुअघिको पूर्व सहमति',
      nurseJp: 'これから車椅子に移りましょうか。右足をしっかり床につけて、浅く腰掛けてくださいね。',
      nurseNe: 'अब ह्वीलचेयरमा सरौं है। दाहिने खुट्टा भुइँमा बलियोसँग टेक्नुहोस् र अगाडि सरेर बस्नुहोस्।',
      userJp: 'はい、わかりました。つかまりますね。',
      userNe: 'हस, बुझेँ। समात्छु है।'
    },
    {
      situationJp: '食事中の誤嚥予防の声かけ',
      situationNe: 'खाना खाँदा सर्कन नदिने सम्झाउनी',
      nurseJp: 'ゆっくり召し上がってくださいね。あごを少し引いてごっくんしてください。熱くないですか？',
      nurseNe: 'बिस्तारै खानुहोस् है। चिउँडो अलिकति तल झुकाएर निल्नुहोस्। तातो त छैन?',
      userJp: 'ちょうどいい味だよ。おいしいね。',
      userNe: 'ठीक छ। मीठो छ।'
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2.5 rounded-2xl bg-teal-100 text-teal-800 text-xl border border-teal-200">
            💬
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 block">
              Practical Japanese Dialogue
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              <FuriganaText text="介護現場の実践的な声かけ・会話シミュレーション" showFurigana={showFurigana} furiganaType={furiganaType} />
            </h3>
            {showNepali && (
              <p className="text-xs text-slate-600 font-medium">
                केयर होममा बिरामीसँग गरिने व्यावहारिक जापानी संवाद (कोएकाके)
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {dialogues.map((d, i) => (
          <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-100 px-2 py-0.5 rounded-md">
              {d.situationJp} ({d.situationNe})
            </span>
            <div className="space-y-1 pt-1">
              <div className="flex items-start gap-2">
                <span className="font-black text-xs text-emerald-800 shrink-0">介護職:</span>
                <p className="text-xs text-slate-900 font-bold leading-relaxed">
                  <FuriganaText text={d.nurseJp} showFurigana={showFurigana} furiganaType={furiganaType} />
                </p>
              </div>
              {showNepali && <p className="text-[10px] text-slate-500 pl-8">🇳🇵 {d.nurseNe}</p>}

              <div className="flex items-start gap-2 pt-1">
                <span className="font-black text-xs text-indigo-800 shrink-0">利用者:</span>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  <FuriganaText text={d.userJp} showFurigana={showFurigana} furiganaType={furiganaType} />
                </p>
              </div>
              {showNepali && <p className="text-[10px] text-slate-500 pl-8">🇳🇵 {d.userNe}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
