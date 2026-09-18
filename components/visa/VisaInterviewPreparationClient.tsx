'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  GraduationCap,
  Briefcase,
  Shield,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Play,
  Volume2,
  Calendar,
  Sparkles,
  ArrowRight,
  UserCheck,
  Building,
  FileCheck
} from 'lucide-react';
import BottomTabBar from '@/components/layout/BottomTabBar';

interface Props {
  country: 'japan' | 'korea';
}

type InterviewTab = 'STUDENT' | 'WORKING' | 'DEPENDENT';

interface InterviewQuestion {
  id: string;
  category: string;
  questionTarget: string; // Japanese or Korean
  questionEn: string;
  questionNe: string;
  modelAnswerTarget: string;
  modelAnswerEn: string;
  modelAnswerNe: string;
  trapWarning: string;
  tip: string;
}

const JAPAN_STUDENT_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'JS_1',
    category: 'Motivation & Purpose',
    questionTarget: 'なぜ日本へ留学したいのですか？ (Naze Nihon e ryuugaku shitai no desu ka?)',
    questionEn: 'Why do you want to study in Japan?',
    questionNe: 'तपाईं जापानमै गएर किन अध्ययन गर्न चाहनुहुन्छ?',
    modelAnswerTarget: '私は将来IT分野でエンジニアになりたいと考えています。日本の技術水準と教育環境は世界最高峰であり、大学で先端技術を学ぶ前に、まず日本語学校で高度な語学力を身につけたいです。',
    modelAnswerEn: 'I want to become an IT engineer in the future. Japan’s technical standards and education are world-class, and I want to master Japanese first before advancing to higher technical education.',
    modelAnswerNe: 'म भविष्यमा आईटी इन्जिनियर बन्न चाहन्छु। जापानको प्रविधि र शिक्षा विश्वस्तरीय छ, त्यसैले कलेज जानुअघि भाषा स्कुलमा राम्रो भाषा सीप हासिल गर्न चाहन्छु।',
    trapWarning: 'Never say "I want to earn money" or "My relatives told me to go". Focus strictly on your academic goals.',
    tip: 'Connect your study plan directly with your previous education in Nepal.'
  },
  {
    id: 'JS_2',
    category: 'Financial Sponsor',
    questionTarget: '学費や生活費は誰が支払いますか？ (Gakuhi ya seikatsuhi wa dare ga shiharaimasu ka?)',
    questionEn: 'Who is paying for your tuition and living expenses?',
    questionNe: 'तपाईंको पढाइ र बसाइको खर्च कसले बेहोर्छ?',
    modelAnswerTarget: '私の父が経費支弁者です。父はネパールでビジネスを経営しており、年収は約〇〇ルピーです。銀行残高証明書と納税証明書も提出しております。',
    modelAnswerEn: 'My father is my financial sponsor. He runs a business in Nepal with an annual income of approximately __ NPR. Bank balance and tax certificates are submitted.',
    modelAnswerNe: 'मेरो बुबा मेरो आर्थिक प्रायोजक (Sponsor) हुनुहुन्छ। उहाँ नेपालमा व्यवसाय गर्नुहुन्छ र वार्षिक आम्दानी कर चुक्ता प्रमाण सहित पेश गरिएको छ।',
    trapWarning: 'Do not hesitate or give amounts different from the tax documents submitted to immigration.',
    tip: 'Memorize your sponsor’s exact business name, annual income, and bank balance figures.'
  },
  {
    id: 'JS_3',
    category: 'Future Plan',
    questionTarget: '卒業後はどうしますか？ (Sotsugyou-go wa dou shimasu ka?)',
    questionEn: 'What will you do after graduating?',
    questionNe: 'पढाइ सकिएपछि के गर्नुहुन्छ?',
    modelAnswerTarget: '卒業後はネパールに帰国し、日本で学んだ知識と経験を活かして、現地のIT企業を立ち上げ、国の発展に貢献したいと考えています。',
    modelAnswerEn: 'After graduation, I plan to return to Nepal, establish an IT business utilizing the knowledge gained in Japan, and contribute to national development.',
    modelAnswerNe: 'पढाइ पूरा भएपछि म नेपाल फर्केर जापानमा सिकेको ज्ञान प्रयोग गरी आईटी कम्पनी सुरु गर्न चाहन्छु।',
    trapWarning: 'Do not give the impression that you want to permanently settle in Japan if applying for student visa.',
    tip: 'Clearly articulate how the degree helps your career in Nepal.'
  }
];

const JAPAN_WORKING_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'JW_1',
    category: 'Self Introduction',
    questionTarget: '自己紹介をお願いします。 (Jikoshoukai o onegai shimasu.)',
    questionEn: 'Please introduce yourself.',
    questionNe: 'कृपया आफ्नो परिचय दिनुहोस्।',
    modelAnswerTarget: 'はじめまして。ネパールから参りました〇〇と申します。年齢は〇〇歳です。専門分野の特定技能試験とJFT-Basicに合格いたしました。真面目に一生懸命働きます。よろしくお願いいたします。',
    modelAnswerEn: 'Nice to meet you. My name is __ from Nepal. I am __ years old. I have passed the SSW technical exam and JFT-Basic. I will work diligently and sincerely.',
    modelAnswerNe: 'नमस्ते। मेरो नाम __ हो, म नेपालबाट आएको हुँ। मैले SSW सीप परीक्षा र JFT भाषा परीक्षा उत्तीर्ण गरेको छु। म इमानदारीपूर्वक कडा परिश्रम गर्नेछु।',
    trapWarning: 'Do not speak too fast or mumble. Maintain good eye contact with the camera/interviewer.',
    tip: 'Keep it within 1 minute and end with a crisp "Yoroshiku onegai itashimasu".'
  },
  {
    id: 'JW_2',
    category: 'Work Sector Motivation',
    questionTarget: 'なぜこの仕事（ビルクリーニング/介護など）を選びましたか？',
    questionEn: 'Why did you choose this sector (e.g. Building Cleaning / Kaigo)?',
    questionNe: 'तपाईंले किन यो क्षेत्र (जस्तै: सरसफाइ वा काइगो) रोज्नुभयो?',
    modelAnswerTarget: '清潔で安全な環境を作ることにやりがいを感じています。日本式の清掃技術や5S活動を学び、専門知識を深めて日本の職場で長く貢献したいからです。',
    modelAnswerEn: 'I find great fulfillment in creating clean and safe environments. I want to learn Japanese cleaning methods, 5S standards, and contribute long-term.',
    modelAnswerNe: 'मलाई सफा र सुरक्षित वातावरण बनाउन मन पर्छ। जापानको ५-एस प्रणाली र प्रविधि सिकेर लामो समय काम गर्न चाहन्छु।',
    trapWarning: 'Never state "Because other visas were hard to get". Show genuine passion for the work.',
    tip: 'Mention specific equipment or practices (e.g. Floor polisher, cross-contamination, 5S).'
  },
  {
    id: 'JW_3',
    category: 'Health & Overtime',
    questionTarget: '残業や夜勤、重労働は大丈夫ですか？',
    questionEn: 'Are you okay with overtime, night shifts, and physical work?',
    questionNe: 'के तपाईं ओभरटाइम, नाइट सिफ्ट र शारीरिक परिश्रम गर्न सक्नुहुन्छ?',
    modelAnswerTarget: 'はい、体力には自信があります。健康管理をしっかり行い、残業やシフト勤務にも柔軟に対応できます。',
    modelAnswerEn: 'Yes, I am confident in my physical stamina. I manage my health well and can flexibly handle overtime and shift schedules.',
    modelAnswerNe: 'हजुर, मेरो स्वास्थ्य र शारीरिक क्षमता राम्रो छ। म नियम अनुसार ओभरटाइम र सिफ्टमा काम गर्न पूर्ण तयार छु।',
    trapWarning: 'Hesitating or saying "I prefer only day shifts" is an immediate disadvantage.',
    tip: 'Employers prioritize reliability, physical health, and punctuality above all.'
  }
];

const JAPAN_DEPENDENT_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'JD_1',
    category: 'Marriage Genuineness',
    questionTarget: '配偶者とどのように知り合いましたか？ (Haiguusha to dono you ni shiriai mashita ka?)',
    questionEn: 'How did you meet your spouse?',
    questionNe: 'तपाईंको श्रीमान्/श्रीमतीसँग कसरी भेट वा चिनजान भयो?',
    modelAnswerTarget: '私たちは〇〇年〇月に家族の紹介（お見合い/恋愛）で知り合いました。交際期間を経て、〇〇年〇月に結婚いたしました。写真やチャット履歴も提出しております。',
    modelAnswerEn: 'We were introduced by our families in [Month/Year]. After courting, we registered our marriage in [Month/Year]. Photos and communication logs are submitted.',
    modelAnswerNe: 'हाम्रो चिनजान पारिवारिक माध्यमबाट भएको हो र केही समयपछि विवाह सम्पन्न भयो। हाम्रा तस्बिर र च्याट रेकर्ड संलग्न छन्।',
    trapWarning: 'Inconsistencies in wedding dates, engagement dates, or courtship timeline can trigger denial.',
    tip: 'Both partners must memorize identical dates and details of family ceremonies.'
  },
  {
    id: 'JD_2',
    category: 'Living Expenses',
    questionTarget: '日本での生活費はどのように賄いますか？',
    questionEn: 'How will you cover your living expenses in Japan?',
    questionNe: 'जापानमा बस्दा तपाईंहरूको खर्च कसरी चल्छ?',
    modelAnswerTarget: '主たる生計維持者である夫（妻）が会社員として正社員で勤務しており、月収は約〇〇万円です。生活費を賄うのに十分な収入があります。',
    modelAnswerEn: 'My spouse works as a regular employee with a monthly salary of approx __ yen, which is sufficient to cover our joint household living costs.',
    modelAnswerNe: 'मेरो जीवनसाथी जापानमा कार्यरत हुनुहुन्छ र उहाँको मासिक आम्दानी दुवै जनालाई पुग्दो छ।',
    trapWarning: 'Do NOT say "I will work full-time immediately". Dependent visa holders cannot work over 28 hrs/week without permit.',
    tip: 'Clearly emphasize that your primary purpose is family cohabitation, not independent earning.'
  }
];

const KOREA_STUDENT_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'KS_1',
    category: 'Study Purpose',
    questionTarget: '한국에 유학을 가려는 이유는 무엇입니까? (Hangug-e yuhag-eul galyeoneun iyuneun mueos-ibnikka?)',
    questionEn: 'Why do you want to study in South Korea?',
    questionNe: 'तपाईं दक्षिण कोरियामा किन पढ्न जान चाहनुहुन्छ?',
    modelAnswerTarget: '한국의 대학은 우수한 교육 시스템과 연구 환경을 갖추고 있습니다. 저는 비즈니스/IT 분야를 전공하여 양국 간의 교류를 잇는 전문가가 되고 싶습니다.',
    modelAnswerEn: 'Korean universities offer excellent education and research infrastructure. I want to major in Business/IT and become a bridge between our countries.',
    modelAnswerNe: 'कोरियाली विश्वविद्यालयहरूको शैक्षिक प्रणाली उत्कृष्ट छ। म त्यहाँ आईटी/व्यवसाय पढेर दुई देशबीच सम्बन्ध विस्तार गर्न चाहन्छु।',
    trapWarning: 'Never mention working part-time to pay back agency loans.',
    tip: 'Mention specific Korean universities (e.g. SNU, Korea University, Yonsei) and their curriculum.'
  },
  {
    id: 'KS_2',
    category: 'Language Proficiency',
    questionTarget: '한국어 공부는 얼마나 했습니까? (Hangugeo gongbuneun eolmana haessseubnikka?)',
    questionEn: 'How long have you studied Korean?',
    questionNe: 'तपाईंले कोरियन भाषा कति समय पढ्नुभयो?',
    modelAnswerTarget: '네팔에서 약 6개월간 한국어 학원에서 공부하였으며, TOPIK 2급(또는 3급)을 취득했습니다. 한국에 입국 후에도 지속적으로 언어 능력을 향상시키겠습니다.',
    modelAnswerEn: 'I studied Korean for about 6 months at an institute in Nepal and obtained TOPIK Level 2/3. I will continue improving my Korean in Korea.',
    modelAnswerNe: 'मैले नेपालमा ६ महिना भाषा पढेर टोपिक परीक्षा दिएको छु र कोरिया गएपछि पनि थप भाषा निखार्नेछु।',
    trapWarning: 'If applying for D-2/D-4, failing to introduce yourself in basic Korean creates a very negative impression.',
    tip: 'Prepare a 30-second self-introduction in natural Korean.'
  }
];

const KOREA_WORKING_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'KW_1',
    category: 'EPS 2nd Stage Viva',
    questionTarget: '앞으로 가세요! 뒤로 도세요! 오른손을 올리세요! (Ap-euro gaseyo! Dwiro doseyo! Oleunson-eul olliseyo!)',
    questionEn: 'Oral Action Commands: Walk forward! Turn back! Raise your right hand!',
    questionNe: 'शारीरिक निर्देशन: अगाडि बढ्नुहोस्! पछाडि फर्कनुहोस्! दाहिने हात उठाउनुहोस्!',
    modelAnswerTarget: '[Follow the action immediately without hesitating] 네, 알겠습니다! (Ne, algesseumnida!)',
    modelAnswerEn: '[Instantly execute the physical instruction and respond clearly: Yes, understood!]',
    modelAnswerNe: '[निर्देशन सुन्नेबित्तिकै विना अलमल काम गर्ने र ठूलो स्वरमा "ने, अल्गेस्सुम्निदा" भन्ने]',
    trapWarning: 'Confusing right (오른쪽) and left (왼쪽) is the most common point deduction in EPS skills viva.',
    tip: 'Practice daily with a partner calling out Korean body movement commands.'
  },
  {
    id: 'KW_2',
    category: 'Tool Identification',
    questionTarget: '이 공구의 이름은 무엇입니까? [Flashcard: 스패너 / 펜치 / 니퍼 / 망치]',
    questionEn: 'What is the name of this tool? [Flashcard displayed]',
    questionNe: 'यो औजारको नाम के हो? [चित्र देखाइनेछ: रेन्च, पिलास, हथौडा]',
    modelAnswerTarget: '이것은 스패너(스패너)입니다. 볼트나 너트를 조이거나 풀 때 사용합니다.',
    modelAnswerEn: 'This is a spanner. It is used to tighten or loosen bolts and nuts.',
    modelAnswerNe: 'यो स्प्यानर हो। यो नट र बोल्ट कस्न वा खोल्न प्रयोग गरिन्छ।',
    trapWarning: 'Saying the English name instead of the official Korean loanword pronunciation will lose points.',
    tip: 'Learn the exact Korean pronunciation for all 30 common factory, agricultural, and construction tools.'
  }
];

const KOREA_DEPENDENT_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'KD_1',
    category: 'F-3 Visa Requirements',
    questionTarget: '배우자의 한국 내 체류 자격과 소득은 어떻게 됩니까?',
    questionEn: 'What is your spouse’s visa status and income in Korea?',
    questionNe: 'तपाईंको जीवनसाथीको कोरियामा भिसा स्थिति र आम्दानी कति छ?',
    modelAnswerTarget: '제 남편(아내)은 E-7(전문직) 또는 D-2(석박사) 비자로 체류 중이며, 연간 소득 증명서와 외국인등록증 사본을 구비하였습니다.',
    modelAnswerEn: 'My spouse is residing on an eligible long-term visa (e.g. E-7, D-2 advanced) with stable annual income documents and Alien Registration Card.',
    modelAnswerNe: 'मेरो जीवनसाथी कोरियामा वैध भिसामा कार्यरत/अध्ययनरत हुनुहुन्छ र उहाँको आम्दानी विवरण र विदेशी दर्ता कार्ड संलग्न छ।',
    trapWarning: 'E-9 non-professional visa holders generally cannot sponsor dependents. Ensure the visa class qualifies for F-3.',
    tip: 'Check that your spouse has been in Korea legally without immigration violations.'
  }
];

export default function VisaInterviewPreparationClient({ country }: Props) {
  const [activeTab, setActiveTab] = useState<InterviewTab>('STUDENT');
  const isJapan = country === 'japan';

  const questionsList: InterviewQuestion[] = useMemo(() => {
    if (isJapan) {
      if (activeTab === 'STUDENT') return JAPAN_STUDENT_QUESTIONS;
      if (activeTab === 'WORKING') return JAPAN_WORKING_QUESTIONS;
      return JAPAN_DEPENDENT_QUESTIONS;
    } else {
      if (activeTab === 'STUDENT') return KOREA_STUDENT_QUESTIONS;
      if (activeTab === 'WORKING') return KOREA_WORKING_QUESTIONS;
      return KOREA_DEPENDENT_QUESTIONS;
    }
  }, [isJapan, activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 font-sans">
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">

        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <Link
            href={`/${country}/visa`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-600" />
            <span>Back to {isJapan ? 'Japan' : 'Korea'} Visa Directory</span>
          </Link>
          <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-black uppercase">
            Official Interview Master Guide
          </span>
        </div>

        {/* Hero Section */}
        <section className={`rounded-3xl p-6 sm:p-8 shadow-xs border text-white space-y-3 ${
          isJapan 
            ? 'bg-gradient-to-r from-red-700 via-rose-700 to-indigo-900 border-red-500/30' 
            : 'bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 border-blue-500/30'
        }`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase">
            <span>{isJapan ? '🇯🇵 Embassy of Japan & Employer Interview Prep' : '🇰🇷 Korean Embassy & EPS Viva Interview Prep'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black leading-tight">
            {isJapan ? 'Japan Visa & Job Interview Master Preparation' : 'Korea Visa & EPS Viva Interview Master Preparation'}
          </h1>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium max-w-2xl">
            Complete interview preparation guide for <strong>Student Visa</strong>, <strong>Working Visa (SSW &amp; EPS)</strong>, and <strong>Dependent Visa</strong>. Real questions asked by embassy interviewers &amp; company employers with model answers, Nepali translations, trap warnings, and etiquette tips.
          </p>
        </section>

        {/* Interview Type Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setActiveTab('STUDENT')}
            className={`py-3 px-2 rounded-xl text-xs font-extrabold flex flex-col sm:flex-row items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'STUDENT'
                ? isJapan
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student Visa Interview</span>
          </button>

          <button
            onClick={() => setActiveTab('WORKING')}
            className={`py-3 px-2 rounded-xl text-xs font-extrabold flex flex-col sm:flex-row items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'WORKING'
                ? isJapan
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Working Visa Interview</span>
          </button>

          <button
            onClick={() => setActiveTab('DEPENDENT')}
            className={`py-3 px-2 rounded-xl text-xs font-extrabold flex flex-col sm:flex-row items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'DEPENDENT'
                ? isJapan
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Dependent Visa Interview</span>
          </button>
        </div>

        {/* Tab Context Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <h2 className="font-bold text-amber-950">
              {activeTab === 'STUDENT' && 'विद्यार्थी भिसा अन्तर्वार्ता: उद्देश्य, कलेज र आर्थिक प्रायोजकको स्पष्टता मुख्य हो।'}
              {activeTab === 'WORKING' && 'कामदार भिसा अन्तर्वार्ता: शारीरिक तन्दुरुस्ती, अनुशासन, कार्यक्षेत्रको ज्ञान र काम गर्ने इच्छाशक्ति हेरिन्छ।'}
              {activeTab === 'DEPENDENT' && 'आश्रित (Dependent) भिसा: विवाहको वास्तविकता, वैधानिक आम्दानी र जापान/कोरियाको बसाइ खर्च प्रमाणित गर्नुपर्छ।'}
            </h2>
            <p className="text-amber-800 leading-relaxed">
              Always maintain confident posture, polite honorific speech ({isJapan ? 'Keigo / です・ます' : '합니다・습니다'}), and ensure all verbal statements 100% align with submitted paperwork.
            </p>
          </div>
        </div>

        {/* Questions & Model Answers List */}
        <section className="space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-600" />
            <span>High-Frequency Questions &amp; Model Answers (बारम्बार सोधिने प्रश्नहरू)</span>
          </h2>

          <div className="space-y-4">
            {questionsList.map((q, idx) => (
              <div
                key={q.id}
                className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4 transition-all hover:border-slate-300"
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-wider">
                      Question {idx + 1} · {q.category}
                    </span>
                    <h3 className="text-base font-black text-slate-900 pt-1">
                      {q.questionTarget}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600">
                      {q.questionEn}
                    </p>
                    <p className="text-xs font-bold text-indigo-700">
                      🇳🇵 {q.questionNe}
                    </p>
                  </div>
                </div>

                {/* Model Answer Box */}
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Recommended Answer (नमुना उत्तर):</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 leading-relaxed font-mono">
                    {q.modelAnswerTarget}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {q.modelAnswerEn}
                  </p>
                  <p className="text-xs text-emerald-950 font-semibold leading-relaxed border-t border-emerald-100 pt-1.5">
                    🇳🇵 {q.modelAnswerNe}
                  </p>
                </div>

                {/* Trap Warning & Pro Tip Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 space-y-1">
                    <strong className="text-rose-900 font-bold flex items-center gap-1 text-[11px]">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      Trap to Avoid (गल्ती नगर्नुहोस्):
                    </strong>
                    <p className="text-rose-800 leading-snug text-[11px]">
                      {q.trapWarning}
                    </p>
                  </div>

                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 space-y-1">
                    <strong className="text-indigo-900 font-bold flex items-center gap-1 text-[11px]">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      Expert Tip (सल्लाह):
                    </strong>
                    <p className="text-indigo-800 leading-snug text-[11px]">
                      {q.tip}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Universal Etiquette & Golden Rules Card */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-600" />
            <span>Interview Etiquette &amp; Golden Rules (अन्तर्वार्ताका महत्वपूर्ण शिष्टाचार नियमहरू)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-800">1. Punctuality &amp; Dress Code (समय र पोसाक)</h3>
              <p className="text-slate-600 leading-relaxed">
                Wear a clean, dark-colored formal business suit (Navy or Black). Be seated in front of your camera 15 minutes before the scheduled time with good lighting and zero background noise.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-800">2. Eye Contact &amp; Posture (आँखाको सम्पर्क र बसाइ)</h3>
              <p className="text-slate-600 leading-relaxed">
                Look directly into the camera lens, not down at the screen. Sit upright with your back straight, hands resting calmly on your knees or desk.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-800">3. Clear Honorific Speech (नम्र भाषा र आदरार्थी)</h3>
              <p className="text-slate-600 leading-relaxed">
                Always respond with clear voice volume. Use polite Japanese (Hai, wakarimashita / Hai, sou desu) or polite Korean (Ne, algesseumnida). If you didn’t catch a question, politely ask: &quot;Mou ichido onegai shimasu&quot; or &quot;Dasi han beon malsseumhae jusigesseumnikka?&quot;.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-800">4. Consistency with Documents (कागजातसँग मेल खाने कुरा)</h3>
              <p className="text-slate-600 leading-relaxed">
                The interviewer will cross-examine your submitted forms. Any contradiction in dates, school names, family income figures, or marriage dates will result in immediate rejection.
              </p>
            </div>
          </div>
        </section>

        {/* 1-on-1 Consultation & Mock Interview CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider">
              Free 15-Minute Expert Mock Session
            </span>
            <h2 className="text-xl sm:text-2xl font-black">
              Need 1-on-1 Mock Interview Practice?
            </h2>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-lg">
              Practice real questions face-to-face with verified Japan &amp; Korea visa counselors. Get your pronunciation, body language, and answers graded before embassy interview.
            </p>
          </div>
          <Link
            href="/consultancy"
            className="px-6 py-3.5 bg-white text-emerald-800 hover:bg-emerald-50 rounded-2xl font-black text-xs shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Book Mock Interview</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

      </main>
      <BottomTabBar />
    </div>
  );
}
