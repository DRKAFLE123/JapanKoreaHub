'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Award, Search, Filter, Play, CheckCircle2, Sparkles, BookOpen, Layers, X, ChevronDown, ChevronRight, LayoutList, LayoutGrid, BarChart2, Globe } from 'lucide-react';

import { TimedExamEngine } from '@/components/TimedExamEngine';

type Country = 'japan' | 'korea';

interface MockTestCatalogItem {
  id: string;
  level: string;
  title: string;
  subTitle?: string;
  specs: string;
  desc: string;
  badge: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questionsCount: number;
  durationMinutes: number;
  passScore: string;
  formatType: 'Paper Exam' | 'CBT Exam';
  hasCodePrompt?: boolean;
}

const JAPAN_MOCK_TESTS: MockTestCatalogItem[] = [
  {
    id: 'N5_SET_1',
    level: 'N5',
    title: 'JLPT N5 | Mock Test - 1 (Kana Only)',
    subTitle: 'JLPT N5 公式模擬試験 第1集 【かんじ なし・ひらがな】',
    specs: 'Approx Time : 30 mins • 15 Questions • Paper Exam',
    desc: 'Covers N5 Hiragana, basic vocabulary, and daily greetings.',
    badge: 'JLPT N5',
    difficulty: 'Easy',
    questionsCount: 15,
    durationMinutes: 30,
    passScore: '80 / 180 Pts',
    formatType: 'Paper Exam',
    hasCodePrompt: true,
  },
  {
    id: 'N5_SET_2',
    level: 'N5',
    title: 'JLPT N5 | Mock Test - 2 (Kana Only)',
    subTitle: 'JLPT N5 公式模擬試験 第2集 【かんじ なし・ひらがな】',
    specs: 'Approx Time : 30 mins • 15 Questions • Paper Exam',
    desc: 'Targeted N5 vocabulary and daily expressions drill.',
    badge: 'JLPT N5',
    difficulty: 'Easy',
    questionsCount: 15,
    durationMinutes: 30,
    passScore: '80 / 180 Pts',
    formatType: 'Paper Exam',
    hasCodePrompt: true,
  },
  {
    id: 'N5_SET_3',
    level: 'N5',
    title: 'JLPT N5 | Mock Test - 3 (Medium)',
    subTitle: 'JLPT N5 公式模擬試験 第3集 【漢字・ふりがな】',
    specs: 'Approx Time : 45 mins • 10 Questions • Paper Exam',
    desc: 'Includes N5 Kanji reading and sentence ordering questions.',
    badge: 'JLPT N5',
    difficulty: 'Medium',
    questionsCount: 10,
    durationMinutes: 45,
    passScore: '90 / 180 Pts',
    formatType: 'Paper Exam',
    hasCodePrompt: true,
  },
  {
    id: 'N5_SET_4',
    level: 'N5',
    title: 'JLPT N5 | Mock Test - 4 (Hard)',
    subTitle: 'JLPT N5 公式模擬試験 第4集 【本試験レベル】',
    specs: 'Approx Time : 45 mins • 5 Questions • Paper Exam',
    desc: 'Full-length official JLPT N5 exam difficulty simulation.',
    badge: 'JLPT N5',
    difficulty: 'Hard',
    questionsCount: 5,
    durationMinutes: 45,
    passScore: '100 / 180 Pts',
    formatType: 'Paper Exam',
    hasCodePrompt: true,
  },
  {
    id: 'N4_SET_1',
    level: 'N4',
    title: 'JLPT N4 | Mock Test - 1 (Elementary)',
    subTitle: 'JLPT N4 公式模擬試験 第1集 【初級まとめ】',
    specs: 'Approx Time : 45 mins • 12 Questions • Paper Exam',
    desc: 'Comprehensive JLPT N4 examination covering ~そうです and Keigo.',
    badge: 'JLPT N4',
    difficulty: 'Medium',
    questionsCount: 12,
    durationMinutes: 45,
    passScore: '90 / 180 Pts',
    formatType: 'Paper Exam',
    hasCodePrompt: true,
  },
  {
    id: 'N3_SET_1',
    level: 'N3',
    title: 'JLPT N3 | Mock Test - 1 (Intermediate Master)',
    subTitle: 'JLPT N3 公式模擬試験 第1集 【中級マスター】',
    specs: 'Approx Time : 60 mins • 15 Questions • Paper Exam',
    desc: 'N3 level model test covering ~につきまして, ~に関して, and workplace reading.',
    badge: 'JLPT N3',
    difficulty: 'Medium',
    questionsCount: 15,
    durationMinutes: 60,
    passScore: '95 / 180 Pts',
    formatType: 'Paper Exam',
    hasCodePrompt: true,
  },
  {
    id: 'N2_SET_1',
    level: 'N2',
    title: 'JLPT N2 | Mock Test - 1 (Business Keigo)',
    subTitle: 'JLPT N2 公式模擬試験 第1集 【ビジネス・新聞語彙】',
    specs: 'Approx Time : 105 mins • 20 Questions • Paper Exam',
    desc: 'N2 level mock exam focusing on business Japanese and news editorial reading.',
    badge: 'JLPT N2',
    difficulty: 'Hard',
    questionsCount: 20,
    durationMinutes: 105,
    passScore: '90 / 180 Pts',
    formatType: 'Paper Exam',
    hasCodePrompt: true,
  },
  {
    id: 'N1_SET_1',
    level: 'N1',
    title: 'JLPT N1 | Mock Test - 1 (Native Mastery)',
    subTitle: 'JLPT N1 公式模擬試験 第1集 【最高峰総合問題】',
    specs: 'Approx Time : 110 mins • 25 Questions • Paper Exam',
    desc: 'N1 level advanced mock test covering all 2,136 Jōyō kanji and editorial commentary.',
    badge: 'JLPT N1',
    difficulty: 'Hard',
    questionsCount: 25,
    durationMinutes: 110,
    passScore: '100 / 180 Pts',
    formatType: 'Paper Exam',
    hasCodePrompt: true,
  },
  {
    id: 'JFT_SET_1',
    level: 'JFT',
    title: 'JFT-Basic | Official CBT Simulator - 1',
    subTitle: 'JFT-Basic Prometric CBT 公式模擬試験 第1集',
    specs: 'Approx Time : 60 mins • 25 Questions • CBT Exam',
    desc: 'Official 250-point Prometric CBT simulator for SSW 1 Specified Skilled Worker visas.',
    badge: 'JFT-Basic',
    difficulty: 'Medium',
    questionsCount: 25,
    durationMinutes: 60,
    passScore: '200 / 250 Pts',
    formatType: 'CBT Exam',
    hasCodePrompt: true,
  },
  {
    id: 'N4_SET_2',
    level: 'N4',
    title: 'JLPT N4 | Mock Test - 2 (Grammar & Short Passages)',
    subTitle: 'JLPT N4 公式模擬試験 第2集 【文法・短文読解】',
    specs: 'Approx Time : 45 mins • 15 Questions • Paper Exam',
    desc: 'Targeted N4 exam with conditional forms (~ば, ~たら, ~なら) and daily conversation.',
    badge: 'JLPT N4',
    difficulty: 'Medium',
    questionsCount: 15,
    durationMinutes: 45,
    passScore: '90 / 180 Pts',
    formatType: 'Paper Exam',
    hasCodePrompt: true,
  },
  {
    id: 'N3_SET_2',
    level: 'N3',
    title: 'JLPT N3 | Mock Test - 2 (Workplace Reading Comprehension)',
    subTitle: 'JLPT N3 公式模擬試験 第2集 【ビジネス読解・語彙】',
    specs: 'Approx Time : 60 mins • 15 Questions • Paper Exam',
    desc: 'N3 workplace communication, notices, emails, and intermediate reading drills.',
    badge: 'JLPT N3',
    difficulty: 'Medium',
    questionsCount: 15,
    durationMinutes: 60,
    passScore: '95 / 180 Pts',
    formatType: 'Paper Exam',
    hasCodePrompt: true,
  },
  {
    id: 'JFT_SET_2',
    level: 'JFT',
    title: 'JFT-Basic | Official CBT Simulator - 2',
    subTitle: 'JFT-Basic Prometric CBT 公式模擬試験 第2集 【生活会話・実務】',
    specs: 'Approx Time : 60 mins • 25 Questions • CBT Exam',
    desc: 'Prometric standard CBT practice exam for SSW visa candidates in everyday Japanese situations.',
    badge: 'JFT-Basic',
    difficulty: 'Medium',
    questionsCount: 25,
    durationMinutes: 60,
    passScore: '200 / 250 Pts',
    formatType: 'CBT Exam',
    hasCodePrompt: true,
  },
  {
    id: 'BC_SSW1_SET_1',
    level: 'SSW',
    title: 'SSW Building Cleaning | CBT Mock Test — Set 1 (Comprehensive)',
    subTitle: 'ビルクリーニング分野特定技能1号評価試験 第1集 【公式60分・30問・全漢字ふりがな付】',
    specs: 'Official 60 mins • 30 Questions • Prometric CBT',
    desc: 'Full official Prometric CBT simulation: 15 True/False and 15 Multiple Choice questions with complete Furigana on all Kanji, visual equipment diagrams, and 60% pass mark.',
    badge: 'SSW Cleaning',
    difficulty: 'Medium',
    questionsCount: 30,
    durationMinutes: 60,
    passScore: '18 / 30 Pts (60%)',
    formatType: 'CBT Exam',
    hasCodePrompt: false,
  },
  {
    id: 'BC_SSW1_SET_2',
    level: 'SSW',
    title: 'SSW Building Cleaning | CBT Mock Test — Set 2 (Tools & Machinery)',
    subTitle: 'ビルクリーニング分野特定技能1号評価試験 第2集 【機材・洗剤希釈】',
    specs: 'Official 60 mins • 30 Questions • Prometric CBT',
    desc: 'Focus on pad colors, squeegees, neutral vs alkaline detergents, and safe electrical cords.',
    badge: 'SSW Cleaning',
    difficulty: 'Medium',
    questionsCount: 30,
    durationMinutes: 60,
    passScore: '18 / 30 Pts (60%)',
    formatType: 'CBT Exam',
    hasCodePrompt: false,
  },
  {
    id: 'BC_SSW1_SET_3',
    level: 'SSW',
    title: 'SSW Building Cleaning | CBT Mock Test — Set 3 (Sanitation & Washrooms)',
    subTitle: 'ビルクリーニング分野特定技能1号評価試験 第3集 【衛生・トイレ清掃】',
    specs: 'Official 60 mins • 30 Questions • Prometric CBT',
    desc: 'Urinal descaling with acidic cleaners, sanitary glove changes, and cross-contamination prevention.',
    badge: 'SSW Cleaning',
    difficulty: 'Medium',
    questionsCount: 30,
    durationMinutes: 60,
    passScore: '18 / 30 Pts (60%)',
    formatType: 'CBT Exam',
    hasCodePrompt: false,
  },
  {
    id: 'BC_SSW1_SET_4',
    level: 'SSW',
    title: 'SSW Building Cleaning | CBT Mock Test — Set 4 (Glass & High Places)',
    subTitle: 'ビルクリーニング分野特定技能1号評価試験 第4集 【ガラス・脚立安全】',
    specs: 'Official 60 mins • 30 Questions • Prometric CBT',
    desc: 'Stepladder 75-degree angle, scraper safety, glass cleaner streak-free wiper techniques.',
    badge: 'SSW Cleaning',
    difficulty: 'Hard',
    questionsCount: 30,
    durationMinutes: 60,
    passScore: '18 / 30 Pts (60%)',
    formatType: 'CBT Exam',
    hasCodePrompt: false,
  },
  {
    id: 'BC_SSW1_SET_5',
    level: 'SSW',
    title: 'SSW Building Cleaning | CBT Mock Test — Set 5 (Final Prometric Simulator)',
    subTitle: 'ビルクリーニング分野特定技能1号評価試験 第5集 【全国統一本試験模倣】',
    specs: 'Official 60 mins • 30 Questions • Prometric CBT',
    desc: 'Simulating official JBMA test center conditions with tricky questions on marble protection and hazard signs.',
    badge: 'SSW Cleaning',
    difficulty: 'Hard',
    questionsCount: 30,
    durationMinutes: 60,
    passScore: '18 / 30 Pts (60%)',
    formatType: 'CBT Exam',
    hasCodePrompt: false,
  },
  {
    id: 'KAIGO_SSW1_SET_1',
    level: 'SSW',
    title: 'SSW Caregiving (Kaigo) | CBT Mock Test — Set 1 (Body Mechanics & Transfer)',
    subTitle: '介護分野特定技能1号評価試験 第1集 【ボディメカニクス・移乗介助】',
    specs: 'Official 60 mins • 45 Questions • Prometric CBT',
    desc: 'MHLW official simulation covering wheelchair transfers, 8 rules of body mechanics, and patient safety.',
    badge: 'SSW Kaigo',
    difficulty: 'Medium',
    questionsCount: 45,
    durationMinutes: 60,
    passScore: '27 / 45 Pts (60%)',
    formatType: 'CBT Exam',
    hasCodePrompt: false,
  },
  {
    id: 'FOOD_SSW1_SET_1',
    level: 'SSW',
    title: 'SSW Food Service | CBT Mock Test — Set 1 (HACCP & Kitchen Sanitation)',
    subTitle: '外食業分野特定技能1号評価試験 第1集 【HACCP衛生管理・厨房安全】',
    specs: 'Official 80 mins • 45 Questions • Prometric CBT',
    desc: 'OTAFF official restaurant evaluation on Norovirus prevention, hand washing, and kitchen safety.',
    badge: 'SSW Food',
    difficulty: 'Medium',
    questionsCount: 45,
    durationMinutes: 80,
    passScore: '65% Pass Mark',
    formatType: 'CBT Exam',
    hasCodePrompt: false,
  },
  {
    id: 'AGRI_SSW1_SET_1',
    level: 'SSW',
    title: 'SSW Agriculture | CBT Mock Test — Set 1 (Crop Cultivation & Machinery)',
    subTitle: '農業分野特定技能1号評価試験 第1集 【栽培管理・トラクター安全】',
    specs: 'Official 60 mins • 30 Questions • Prometric CBT',
    desc: 'ASNET official agricultural simulation covering greenhouse ventilation and machinery safety.',
    badge: 'SSW Agriculture',
    difficulty: 'Medium',
    questionsCount: 30,
    durationMinutes: 60,
    passScore: '60% Pass Mark',
    formatType: 'CBT Exam',
    hasCodePrompt: false,
  },
  {
    id: 'CONST_SSW1_SET_1',
    level: 'SSW',
    title: 'SSW Construction | CBT Mock Test — Set 1 (Safety Harness & Scaffolding)',
    subTitle: '建設分野特定技能1号評価試験 第1集 【フルハーネス・足場安全】',
    specs: 'Official 60 mins • 30 Questions • Prometric CBT',
    desc: 'JAC Prometric construction evaluation covering full harness 2-hook rules and scaffold safety.',
    badge: 'SSW Construction',
    difficulty: 'Medium',
    questionsCount: 30,
    durationMinutes: 60,
    passScore: '60% Pass Mark',
    formatType: 'CBT Exam',
    hasCodePrompt: false,
  },
];

const KOREA_MOCK_TESTS: MockTestCatalogItem[] = [
  {
    id: 'EPS_SET_1',
    level: 'EPS',
    title: 'EPS-TOPIK | Mock Test - 1 (Factory & Workplace Safety)',
    subTitle: 'EPS-TOPIK 고용허가제 공식 모의고사 제1회 【안전수칙】',
    specs: 'Approx Time : 50 mins • 20 Questions • CBT Exam',
    desc: 'HRD Korea standard CBT format covering factory vocabulary and safety signboards.',
    badge: 'EPS-TOPIK',
    difficulty: 'Easy',
    questionsCount: 20,
    durationMinutes: 50,
    passScore: '110 / 200 Pts',
    formatType: 'CBT Exam',
    hasCodePrompt: true,
  },
  {
    id: 'EPS_SET_2',
    level: 'EPS',
    title: 'EPS-TOPIK | Mock Test - 2 (Manufacturing Equipment)',
    subTitle: 'EPS-TOPIK 고용허가제 공식 모의고사 제2회 【제조업 표지판】',
    specs: 'Approx Time : 50 mins • 20 Questions • CBT Exam',
    desc: 'Targeted EPS CBT exam focusing on warning signs (출입 금지, 경고) and equipment.',
    badge: 'EPS-TOPIK',
    difficulty: 'Medium',
    questionsCount: 20,
    durationMinutes: 50,
    passScore: '110 / 200 Pts',
    formatType: 'CBT Exam',
    hasCodePrompt: true,
  },
  {
    id: 'EPS_SET_3',
    level: 'EPS',
    title: 'EPS-TOPIK | Mock Test - 3 (Workplace Dialogues & Instructions)',
    subTitle: 'EPS-TOPIK 고용허가제 공식 모의고사 제3회 【작업지시 대화】',
    specs: 'Approx Time : 50 mins • 20 Questions • CBT Exam',
    desc: 'Standard HRD Korea CBT exam on supervisor instructions, tool inventory, and factory tasks.',
    badge: 'EPS-TOPIK',
    difficulty: 'Medium',
    questionsCount: 20,
    durationMinutes: 50,
    passScore: '110 / 200 Pts',
    formatType: 'CBT Exam',
    hasCodePrompt: true,
  },
  {
    id: 'EPS_SKILL_MFG',
    level: 'EPS',
    title: 'EPS Skills | Manufacturing Competency Test (Caliper & Assembly)',
    subTitle: '제조업 기능평가 【버니어 캘리퍼스・핀 꽂기・작업기초】',
    specs: 'Approx Time : 20 mins • 15 Questions • CBT Exam',
    desc: 'HRD Korea Stage 2 evaluation covering Vernier caliper measurement, pin insertion pegboard, and tool identification.',
    badge: 'EPS Skills',
    difficulty: 'Medium',
    questionsCount: 15,
    durationMinutes: 20,
    passScore: 'Pass Benchmark',
    formatType: 'CBT Exam',
    hasCodePrompt: false,
  },
  {
    id: 'EPS_SKILL_ORAL',
    level: 'EPS',
    title: 'EPS Skills | Oral Viva Interview & Reaction Commands (구술시험)',
    subTitle: '한국어 구술시험 【자기소개・동작 지시・기초 공구】',
    specs: 'Approx Time : 15 mins • 20 Questions • CBT Exam',
    desc: 'Face-to-face spoken Korean evaluation on self-introduction, physical directional reaction commands, and tool flashcards.',
    badge: 'EPS Viva',
    difficulty: 'Medium',
    questionsCount: 20,
    durationMinutes: 15,
    passScore: 'Viva Benchmark',
    formatType: 'CBT Exam',
    hasCodePrompt: false,
  },
  {
    id: 'TOPIK1_SET_1',
    level: 'TOPIK1_L1',
    title: 'TOPIK I | Mock Test - 1 (Levels 1–2 Beginner)',
    subTitle: '한국어능력시험 TOPIK I 공식 모의고사 제1회 【듣기・읽기】',
    specs: 'Approx Time : 60 mins • 30 Questions • Paper Exam',
    desc: 'Official 100% multiple-choice TOPIK I exam covering daily greetings and locations.',
    badge: 'TOPIK I',
    difficulty: 'Easy',
    questionsCount: 30,
    durationMinutes: 60,
    passScore: '80 / 200 Pts',
    formatType: 'Paper Exam',
    hasCodePrompt: true,
  },
  {
    id: 'TOPIK1_SET_2',
    level: 'TOPIK1_L1',
    title: 'TOPIK I | Mock Test - 2 (Grammar & Comprehension)',
    subTitle: '한국어능력시험 TOPIK I 공식 모의고사 제2회 【어휘・문法】',
    specs: 'Approx Time : 60 mins • 30 Questions • Paper Exam',
    desc: 'Beginner TOPIK test covering shopping, transportation, particles (-이/가, -은/는, -을/를), and short passages.',
    badge: 'TOPIK I',
    difficulty: 'Easy',
    questionsCount: 30,
    durationMinutes: 60,
    passScore: '80 / 200 Pts',
    formatType: 'Paper Exam',
    hasCodePrompt: true,
  },
  {
    id: 'TOPIK2_SET_1',
    level: 'TOPIK3',
    title: 'TOPIK II | Mock Test - 1 (Levels 3–6 Intermediate/Advanced)',
    subTitle: '한국어능력시험 TOPIK II 공식 모의고사 제1회 【쓰기・읽기】',
    specs: 'Approx Time : 80 mins • 25 Questions • Paper Exam',
    desc: 'Standard TOPIK II model test featuring news editorial reading and Task 53 essay writing.',
    badge: 'TOPIK II',
    difficulty: 'Hard',
    questionsCount: 25,
    durationMinutes: 80,
    passScore: '120 / 300 Pts',
    formatType: 'Paper Exam',
    hasCodePrompt: true,
  },
  {
    id: 'KIIP_SET_1',
    level: 'KIIP',
    title: 'KIIP | Level 5 Comprehensive Exam (사회통합프로그램 종합평가)',
    subTitle: '법무부 사회통합프로그램 사전평가・중간평가・영주귀화 종합평가',
    specs: 'Approx Time : 50 mins • 20 Questions • CBT Exam',
    desc: 'Ministry of Justice immigration integration test covering Korean society, culture, law, and history for E-7-4, F-2-7, F-5 PR, and Naturalization.',
    badge: 'KIIP (사회통합)',
    difficulty: 'Medium',
    questionsCount: 20,
    durationMinutes: 50,
    passScore: '60 / 100 Pts',
    formatType: 'CBT Exam',
    hasCodePrompt: true,
  },
];

export default function ExamsHubClient({ country }: { country: Country }) {
  const [activeTab, setActiveTab] = useState<'MOCK_TEST' | 'SCORE_HISTORY'>('MOCK_TEST');
  const [viewMode, setViewMode] = useState<'LIST' | 'GRID'>('LIST');
  const [selectedCurriculumLevel, setSelectedCurriculumLevel] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [activeExamLevel, setActiveExamLevel] = useState<string | null>(null);
  const [confirmTest, setConfirmTest] = useState<MockTestCatalogItem | null>(null);
  const [showHubExitConfirm, setShowHubExitConfirm] = useState<boolean>(false);

  const rawMockTests = country === 'japan' ? JAPAN_MOCK_TESTS : KOREA_MOCK_TESTS;

  const japanCurriculumLevels = [
    { id: 'ALL', label: '🌐 All Levels' },
    { id: 'N5',  label: 'JLPT N5' },
    { id: 'N4',  label: 'JLPT N4' },
    { id: 'N3',  label: 'JLPT N3' },
    { id: 'N2',  label: 'JLPT N2' },
    { id: 'N1',  label: 'JLPT N1' },
    { id: 'JFT', label: 'JFT-Basic' },
    { id: 'SSW', label: '🛠️ SSW Skill Tests' },
  ];

  const koreaCurriculumLevels = [
    { id: 'ALL',        label: '🌐 All Levels' },
    { id: 'EPS',        label: 'EPS-TOPIK' },
    { id: 'TOPIK1_L1',  label: 'TOPIK I (Levels 1–2)' },
    { id: 'TOPIK3',     label: 'TOPIK II (Levels 3–6)' },
    { id: 'KIIP',       label: 'KIIP (사회통합)' },
  ];

  const curriculumLevels = country === 'japan' ? japanCurriculumLevels : koreaCurriculumLevels;

  const filteredTests = useMemo(() => {
    return rawMockTests.filter((test) => {
      if (selectedCurriculumLevel !== 'ALL') {
        if (test.level !== selectedCurriculumLevel) return false;
      }
      if (selectedDifficulty !== 'ALL') {
        if (test.difficulty !== selectedDifficulty) return false;
      }
      return true;
    });
  }, [rawMockTests, selectedCurriculumLevel, selectedDifficulty]);

  if (activeExamLevel) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 p-4 font-sans">
        <div className="max-w-5xl mx-auto mb-4">
          <button
            onClick={() => setShowHubExitConfirm(true)}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4 text-rose-500" /> Return to Mock Tests Directory
          </button>
        </div>
        <TimedExamEngine
          initialLanguage={country === 'japan' ? 'JAPANESE' : 'KOREAN'}
          currentLevel={activeExamLevel}
          autoStart={true}
          onExitExam={() => setActiveExamLevel(null)}
        />

        {/* Exit Confirmation Modal */}
        {showHubExitConfirm && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 text-2xl shrink-0">
                  ⚠️
                </div>
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    Exit Exam Session? (परीक्षाबाट बाहिरिने?)
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Level: {activeExamLevel}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200 text-xs text-rose-950 space-y-2">
                <p className="font-semibold leading-relaxed">
                  Are you sure you want to exit the exam? All unsaved progress and answers will be discarded.
                </p>
                <p className="text-indigo-900 font-bold text-[11px]">
                  🇳🇵 के तपाईं साँच्चै परीक्षा छोड्न चाहनुहुन्छ? बाहिरिएमा तपाईंको प्रगति मेटिनेछ।
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowHubExitConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-colors cursor-pointer border border-slate-200 text-center"
                >
                  Resume Exam (जारी राख्नुहोस्)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowHubExitConfirm(false);
                    setActiveExamLevel(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs transition-colors cursor-pointer border border-rose-600 shadow-sm text-center"
                >
                  Yes, Exit Exam (हो, बाहिरिनुहोस्)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      <main className="max-w-6xl mx-auto px-2 sm:px-4 pt-2 sm:pt-4 space-y-3">

        {/* 🌐 ROW 1: CURRICULUM LEVEL SELECTION BAR */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-1 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-500 whitespace-nowrap pl-1 pr-2">
            <Globe className={`w-3.5 h-3.5 ${country === 'japan' ? 'text-red-500' : 'text-blue-500'}`} />
            <span>Course:</span>
          </div>

          <div className="flex items-center gap-1.5 flex-nowrap">
            {curriculumLevels.map((lvl) => {
              const isSelected = selectedCurriculumLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => {
                    setSelectedCurriculumLevel(lvl.id);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap border ${
                    isSelected
                      ? country === 'japan'
                        ? 'bg-red-600 text-white shadow-xs border-red-500 font-black'
                        : 'bg-blue-600 text-white shadow-xs border-blue-500 font-black'
                      : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border-slate-200 font-bold'
                  }`}
                >
                  {lvl.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 🛠️ SKILLS EVALUATION MOCK TESTS HERO BANNER (Country Tailored) */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-300 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2.5 bg-white rounded-2xl border border-emerald-200 shadow-xs shrink-0">🛠️</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                  {country === 'japan' ? 'Prometric SSW-1 Official Track' : 'HRD Korea EPS Stage 2 Track'}
                </span>
                <span className="text-[10px] font-bold text-slate-500">
                  {country === 'japan' ? '8 Sectors • Full Furigana' : 'Vocational Skills & Viva'}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                {country === 'japan' ? 'SSW Skills Evaluation Mock Tests (特定技能評価試験)' : 'EPS-TOPIK Skills & Competency Evaluation (기능시험)'}
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                {country === 'japan' 
                  ? 'Building Cleaning (Official 60 min • 30 Qs • 100% Furigana), Caregiving, Food Service, Agriculture, Construction, etc.'
                  : 'Manufacturing (Caliper & assembly), Agriculture, Construction, Physical Grip Strength & Oral Viva commands.'
                }
              </p>
            </div>
          </div>
          <Link
            href={`/${country}/exams/skills`}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer"
          >
            <span>{country === 'japan' ? 'Open SSW Skills Hub' : 'Open EPS Skills Hub'}</span>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
          </Link>
        </div>

        {/* 🔝 ROW 2: TOP HEADER CONTROL BAR (Matching User Screenshot UI) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-2.5 sm:p-3 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-slate-900">
          {/* Left Pill Controls: Mock Test & Score History */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('MOCK_TEST')}
              className={`px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer border ${
                activeTab === 'MOCK_TEST'
                  ? country === 'japan' ? 'bg-red-600 text-white border-red-500 shadow-xs' : 'bg-blue-600 text-white border-blue-500 shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200 font-bold'
              }`}
            >
              Mock Test
            </button>

            <button
              onClick={() => setActiveTab('SCORE_HISTORY')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                activeTab === 'SCORE_HISTORY'
                  ? country === 'japan' ? 'bg-red-600 text-white border-red-500 font-black shadow-xs' : 'bg-blue-600 text-white border-blue-500 font-black shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Score History</span>
              <span className={`w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center ${
                activeTab === 'SCORE_HISTORY'
                  ? country === 'japan' ? 'bg-white text-red-600' : 'bg-white text-blue-600'
                  : 'bg-red-600 text-white'
              }`}>
                2
              </span>
            </button>
          </div>

          {/* Right Controls: Level/Difficulty Dropdown & List/Grid View Toggle */}
          <div className="flex items-center gap-2 justify-between sm:justify-end">
            {/* Level/Difficulty Dropdown Select */}
            <div className="relative">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="appearance-none pl-7 pr-8 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-slate-400 transition-colors cursor-pointer"
              >
                <option value="ALL">Level: All (Easy, Medium, Hard)</option>
                <option value="Easy">Easy Level Only</option>
                <option value="Medium">Medium Level Only</option>
                <option value="Hard">Hard Level Only</option>
              </select>
              <Filter className="w-3.5 h-3.5 text-rose-600 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* List / Grid View Toggle Pills */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 shrink-0">
              <button
                onClick={() => setViewMode('LIST')}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === 'LIST'
                    ? country === 'japan' ? 'bg-red-600 text-white border-red-500 font-black shadow-xs' : 'bg-blue-600 text-white border-blue-500 font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>List View</span>
              </button>

              <button
                onClick={() => setViewMode('GRID')}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === 'GRID'
                    ? country === 'japan' ? 'bg-red-600 text-white border-red-500 font-black shadow-xs' : 'bg-blue-600 text-white border-blue-500 font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </button>
            </div>
          </div>
        </div>

        {/* 📋 MOCK TESTS LISTING */}
        {activeTab === 'MOCK_TEST' ? (
          viewMode === 'LIST' ? (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
              {/* Desktop Table Header */}
              <div className="hidden lg:grid grid-cols-12 gap-3 px-5 py-3 bg-slate-50/90 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500 items-center">
                <div className="col-span-3">Curriculum / Level</div>
                <div className="col-span-4">Mock Examination Title</div>
                <div className="col-span-3 text-center">Specifications & Benchmark</div>
                <div className="col-span-2 text-right">Action</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-slate-100">
                {filteredTests.map((test) => (
                  <div
                    key={test.id}
                    className="p-3 sm:px-5 sm:py-3.5 hover:bg-slate-50/80 transition-colors flex flex-col lg:grid lg:grid-cols-12 lg:gap-3 lg:items-center group"
                  >
                    {/* Col 1: Level Badge & Format */}
                    <div className="lg:col-span-3 flex items-center gap-2 mb-1.5 lg:mb-0">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-xs font-black whitespace-nowrap">
                        {test.badge}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                        test.formatType === 'CBT Exam'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}>
                        {test.formatType === 'CBT Exam' ? 'CBT' : 'Paper'}
                      </span>
                    </div>

                    {/* Col 2: Title & Subtitle */}
                    <div className="lg:col-span-4 min-w-0 pr-2 space-y-0.5">
                      <h3 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
                        {test.title}
                      </h3>
                      {test.subTitle && (
                        <p className="text-[11px] text-slate-500 truncate font-medium">
                          {test.subTitle}
                        </p>
                      )}
                    </div>

                    {/* Col 3: Specs & Difficulty */}
                    <div className="lg:col-span-3 flex items-center justify-start lg:justify-center gap-1.5 my-2 lg:my-0 text-xs">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px] whitespace-nowrap">
                        ⏱️ {test.durationMinutes}m
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px] whitespace-nowrap">
                        {test.questionsCount} Qs
                      </span>
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border ${
                        test.difficulty === 'Easy'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : test.difficulty === 'Medium'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {test.difficulty}
                      </span>
                    </div>

                    {/* Col 4: Action */}
                    <div className="lg:col-span-2 flex items-center justify-end gap-2 mt-1 lg:mt-0">
                      <button
                        onClick={() => setConfirmTest(test)}
                        className={`px-4 py-2 rounded-xl font-black text-xs text-white shadow-xs transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                          country === 'japan'
                            ? 'bg-red-600 hover:bg-red-500 border border-red-500'
                            : 'bg-blue-600 hover:bg-blue-500 border border-blue-500'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Start Test</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* 2. CARD / GRID VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredTests.map((test) => (
                <div
                  key={test.id}
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-4 sm:p-5 shadow-xs transition-all text-slate-900 flex flex-col justify-between gap-4"
                >
                  {/* Left Card Details */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap pb-1">
                      <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                        {test.badge}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border ${
                        test.difficulty === 'Easy'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : test.difficulty === 'Medium'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {test.difficulty}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">
                        {test.formatType}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      {test.title}
                    </h3>
                    {test.subTitle && (
                      <p className="text-xs text-slate-500 font-medium">
                        {test.subTitle}
                      </p>
                    )}

                    {/* Specs Row */}
                    <div className="flex items-center gap-3 text-xs text-amber-800 font-semibold pt-1 flex-wrap">
                      <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>{test.specs}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-xs font-semibold text-slate-500">
                      Pass: <strong className="text-slate-900">{test.passScore}</strong>
                    </span>
                    <button
                      onClick={() => setConfirmTest(test)}
                      className={`px-5 py-2 rounded-xl font-black text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        country === 'japan'
                          ? 'bg-red-600 hover:bg-red-500 text-white border border-red-500'
                          : 'bg-blue-600 hover:bg-blue-500 text-white border border-blue-500'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Start</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* SCORE HISTORY VIEW */
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 text-center space-y-3 text-slate-900">
            <BarChart2 className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-black text-slate-900">Recent Exam Score History</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              You have completed 2 mock examinations. Pass certificates and auto-graded answer scorecards are saved below.
            </p>
            <div className="max-w-xl mx-auto space-y-2 text-left pt-2">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-slate-900">JLPT N5 Official Standard Mock Test — Set 1</p>
                  <p className="text-[11px] text-slate-500">Completed yesterday • Time spent: 24 mins</p>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs">
                  PASSED (85%)
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-slate-900">JLPT N5 Official Standard Mock Test — Set 2</p>
                  <p className="text-[11px] text-slate-500">Completed 2 days ago • Time spent: 18 mins</p>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs">
                  PASSED (90%)
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── EXAM CONFIRMATION MODAL ── */}
      {confirmTest && (
        <div className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in min-h-screen min-h-[100dvh]">
          <div className="w-full max-w-lg bg-white text-slate-900 border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 my-auto mx-auto shrink-0 font-sans">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-red-50 text-red-600 border border-red-200 text-2xl">
                  ⏱️
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-red-600 flex items-center gap-1.5">
                    <span>{confirmTest.badge}</span>
                    <span>•</span>
                    <span className="text-slate-500">{confirmTest.difficulty} Level</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">{confirmTest.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setConfirmTest(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-rose-600 text-slate-500 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Test Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="text-[10px] font-black uppercase text-slate-400 block">Duration</span>
                <span className="font-black text-slate-900 text-sm">{confirmTest.durationMinutes} Mins</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="text-[10px] font-black uppercase text-slate-400 block">Questions</span>
                <span className="font-black text-slate-900 text-sm">{confirmTest.questionsCount} Qs</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="text-[10px] font-black uppercase text-slate-400 block">Pass Target</span>
                <span className="font-black text-emerald-700 text-xs">{confirmTest.passScore}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="text-[10px] font-black uppercase text-slate-400 block">Format</span>
                <span className="font-black text-slate-900 text-xs">{confirmTest.formatType}</span>
              </div>
            </div>

            {/* Exam Rules & Instructions */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 space-y-2">
              <div className="font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <span>⚠️ Important Examination Rules</span>
              </div>
              <ul className="space-y-1.5 text-slate-800 font-medium pl-1 list-disc list-inside">
                <li>The countdown timer starts immediately upon clicking <strong>Begin Exam Now</strong>.</li>
                <li>Do not refresh or close the browser tab during the test.</li>
                <li>Auto-grading scorecards and detailed feedback are generated upon submission.</li>
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmTest(null)}
                className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-colors cursor-pointer border border-slate-200"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  if (confirmTest.id.startsWith('BC_SSW1_SET_')) {
                    const setNum = confirmTest.id.replace('BC_SSW1_SET_', '');
                    window.location.href = `/${country}/work/building-cleaning/exam?set=${setNum}`;
                    return;
                  }
                  if (confirmTest.id.startsWith('KAIGO_SSW1')) {
                    window.location.href = `/${country}/exams/skills?sector=nursing`;
                    return;
                  }
                  if (confirmTest.id.startsWith('FOOD_SSW1')) {
                    window.location.href = `/${country}/exams/skills?sector=food-service`;
                    return;
                  }
                  if (confirmTest.id.startsWith('AGRI_SSW1')) {
                    window.location.href = `/${country}/exams/skills?sector=agriculture`;
                    return;
                  }
                  if (confirmTest.id.startsWith('CONST_SSW1')) {
                    window.location.href = `/${country}/exams/skills?sector=construction`;
                    return;
                  }
                  if (confirmTest.level === 'SSW') {
                    window.location.href = `/${country}/exams/skills`;
                    return;
                  }
                  setActiveExamLevel(confirmTest.level);
                  setConfirmTest(null);
                }}
                className={`flex-1 py-3 rounded-xl font-black text-xs text-white shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                  country === 'japan'
                    ? 'bg-red-600 hover:bg-red-500 border border-red-500'
                    : 'bg-blue-600 hover:bg-blue-500 border border-blue-500'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Begin Exam Now</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
