'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Award, Filter, Play, CheckCircle2, Sparkles, BookOpen, Layers, X, ChevronDown, ChevronRight, BarChart2, Globe, Briefcase } from 'lucide-react';

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
  industry?: string;
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
    id: 'JFT_LISTENING_01',
    level: 'JFT',
    title: 'JFT-Basic | Listening Practice Test 01',
    subTitle: 'JFT-Basic A1–A2 公式準拠 聴解実戦模擬試験 第1集 【オリジナル12問】',
    specs: 'Approx Time : 20 mins • 12 Questions • Prometric CBT',
    desc: 'Official-style Prometric CBT listening practice with 12 authentic questions across everyday interaction, shops/public places, and announcements. Max 2 audio plays and full Nepali review.',
    badge: 'JFT Listening',
    difficulty: 'Medium',
    questionsCount: 12,
    durationMinutes: 20,
    passScore: '9 / 12 (75%)',
    formatType: 'CBT Exam',
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
    industry: 'building-cleaning',
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
    industry: 'building-cleaning',
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
    industry: 'building-cleaning',
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
    industry: 'building-cleaning',
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
    industry: 'building-cleaning',
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
    industry: 'nursing',
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
    id: 'KAIGO_SSW1_SET_2',
    level: 'SSW',
    industry: 'nursing',
    title: 'SSW Caregiving (Kaigo) | CBT Mock Test — Set 2 (Meal Assistance & Dysphagia)',
    subTitle: '介護分野特定技能1号評価試験 第2集 【食事介助・誤嚥予防】',
    specs: 'Official 60 mins • 45 Questions • Prometric CBT',
    desc: 'Focus on swallowing posture, choking Heimlich maneuver, thickened liquid ratio, and diabetes meal care.',
    badge: 'SSW Kaigo',
    difficulty: 'Medium',
    questionsCount: 45,
    durationMinutes: 60,
    passScore: '27 / 45 Pts (60%)',
    formatType: 'CBT Exam',
    hasCodePrompt: false,
  },
  {
    id: 'KAIGO_SSW1_SET_3',
    level: 'SSW',
    industry: 'nursing',
    title: 'SSW Caregiving (Kaigo) | CBT Mock Test — Set 3 (Bathing & Dementia Care)',
    subTitle: '介護分野特定技能1号評価試験 第3集 【入浴・認知症ケア】',
    specs: 'Official 60 mins • 45 Questions • Prometric CBT',
    desc: 'Hot water temperature safety (38-40°C), heat shock prevention, and Alzheimer 4-type behavioral support.',
    badge: 'SSW Kaigo',
    difficulty: 'Hard',
    questionsCount: 45,
    durationMinutes: 60,
    passScore: '27 / 45 Pts (60%)',
    formatType: 'CBT Exam',
    hasCodePrompt: false,
  },
  {
    id: 'FOOD_SSW1_SET_1',
    level: 'SSW',
    industry: 'food-service',
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
    id: 'FOOD_SSW1_SET_2',
    level: 'SSW',
    industry: 'food-service',
    title: 'SSW Food Service | CBT Mock Test — Set 2 (Allergen Labeling & Customer Service)',
    subTitle: '外食業分野特定技能1号評価試験 第2集 【アレルギー表示・接客敬語】',
    specs: 'Official 80 mins • 45 Questions • Prometric CBT',
    desc: '8 mandatory food allergen protocols, raw meat temperature control, and polite Japanese dining Keigo.',
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
    industry: 'agriculture',
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
    id: 'AGRI_SSW1_SET_2',
    level: 'SSW',
    industry: 'agriculture',
    title: 'SSW Agriculture | CBT Mock Test — Set 2 (Pesticide Dilution & Quality Grading)',
    subTitle: '農業分野特定技能1号評価試験 第2集 【農薬希釈・収穫出荷調製】',
    specs: 'Official 60 mins • 30 Questions • Prometric CBT',
    desc: 'Pesticide spray ratio calculation, wind direction precautions, and produce sizing quality inspection.',
    badge: 'SSW Agriculture',
    difficulty: 'Hard',
    questionsCount: 30,
    durationMinutes: 60,
    passScore: '60% Pass Mark',
    formatType: 'CBT Exam',
    hasCodePrompt: false,
  },
  {
    id: 'CONST_SSW1_SET_1',
    level: 'SSW',
    industry: 'construction',
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
  {
    id: 'CONST_SSW1_SET_2',
    level: 'SSW',
    industry: 'construction',
    title: 'SSW Construction | CBT Mock Test — Set 2 (Power Tools & Hazard Prediction KYK)',
    subTitle: '建設分野特定技能1号評価試験 第2集 【電動工具・KYK危険予知】',
    specs: 'Official 60 mins • 30 Questions • Prometric CBT',
    desc: 'Electric circular saw safety guards, pointing-and-calling checks (Shisa Koshou), and earth leakage breakers.',
    badge: 'SSW Construction',
    difficulty: 'Hard',
    questionsCount: 30,
    durationMinutes: 60,
    passScore: '60% Pass Mark',
    formatType: 'CBT Exam',
    hasCodePrompt: false,
  },
  {
    id: 'HOSP_SSW1_SET_1',
    level: 'SSW',
    industry: 'hospitality',
    title: 'SSW Hospitality & Hotel | CBT Mock Test — Set 1 (Front Desk & Concierge)',
    subTitle: '宿泊分野特定技能1号評価試験 第1集 【フロント受付・接客マナー】',
    specs: 'Official 60 mins • 30 Questions • Prometric CBT',
    desc: 'Guest check-in formalities, baggage handling, room key cards, and Omotenashi hospitality Keigo.',
    badge: 'SSW Hotel',
    difficulty: 'Medium',
    questionsCount: 30,
    durationMinutes: 60,
    passScore: '65% Pass Mark',
    formatType: 'CBT Exam',
    hasCodePrompt: false,
  },
  {
    id: 'MANUF_SSW1_SET_1',
    level: 'SSW',
    industry: 'manufacture',
    title: 'SSW Food Manufacturing | CBT Mock Test — Set 1 (Factory Sanitation & 5S)',
    subTitle: '飲食料品製造業分野特定技能1号試験 第1集 【工場衛生・異物混入防止】',
    specs: 'Official 80 mins • 40 Questions • Prometric CBT',
    desc: 'Conveyor line foreign object x-ray detection, hair net sanitization, and cleanroom air showers.',
    badge: 'SSW Manufacture',
    difficulty: 'Medium',
    questionsCount: 40,
    durationMinutes: 80,
    passScore: '65% Pass Mark',
    formatType: 'CBT Exam',
    hasCodePrompt: false,
  },
  {
    id: 'AUTO_SSW1_SET_1',
    level: 'SSW',
    industry: 'automobile',
    title: 'SSW Automobile Maintenance | CBT Mock Test — Set 1 (Periodic Inspection)',
    subTitle: '自動車整備分野特定技能1号評価試験 第1集 【定期点検・ブレーキ整備】',
    specs: 'Official 60 mins • 30 Questions • Prometric CBT',
    desc: 'Engine oil viscosity inspection, hydraulic brake pad wear, tire torque wrench tightening, and hoist safety.',
    badge: 'SSW Auto',
    difficulty: 'Hard',
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
    industry: 'general',
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
    industry: 'general',
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
    industry: 'general',
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
    industry: 'manufacturing',
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
    id: 'EPS_SKILL_AGRI',
    level: 'EPS',
    industry: 'agriculture',
    title: 'EPS Skills | Agriculture & Livestock Competency Test (농축산업)',
    subTitle: '농축산업 기능평가 【작물 선별・농기구 판별・온실 관리】',
    specs: 'Approx Time : 20 mins • 15 Questions • CBT Exam',
    desc: 'HRD Korea agriculture evaluation on farm tools (sickle, pruning shears), crop grading, and greenhouse safety.',
    badge: 'EPS Agriculture',
    difficulty: 'Medium',
    questionsCount: 15,
    durationMinutes: 20,
    passScore: 'Pass Benchmark',
    formatType: 'CBT Exam',
    hasCodePrompt: false,
  },
  {
    id: 'EPS_SKILL_CONST',
    level: 'EPS',
    industry: 'construction',
    title: 'EPS Skills | Construction Site Competency Test (건설업)',
    subTitle: '건설업 기능평가 【철근 결속・줄자 계측・안전그네】',
    specs: 'Approx Time : 20 mins • 15 Questions • CBT Exam',
    desc: 'HRD Korea construction evaluation on rebar hook tying, measuring tape accuracy, and safety harness wearing.',
    badge: 'EPS Construction',
    difficulty: 'Hard',
    questionsCount: 15,
    durationMinutes: 20,
    passScore: 'Pass Benchmark',
    formatType: 'CBT Exam',
    hasCodePrompt: false,
  },
  {
    id: 'EPS_SKILL_ORAL',
    level: 'EPS',
    industry: 'oral',
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

export default function ExamsHubClient({ country, initialLevel }: { country: Country; initialLevel?: string }) {
  const mapSlugToLevel = (slug?: string): string => {
    if (!slug) return 'ALL';
    const s = slug.toLowerCase();
    if (s === 'all') return 'ALL';
    if (country === 'japan') {
      if (s === 'n5' || s === 'jlpt-n5') return 'N5';
      if (s === 'n4' || s === 'jlpt-n4') return 'N4';
      if (s === 'n3' || s === 'jlpt-n3') return 'N3';
      if (s === 'n2' || s === 'jlpt-n2') return 'N2';
      if (s === 'n1' || s === 'jlpt-n1') return 'N1';
      if (s === 'jft' || s === 'jft-basic') return 'JFT';
      if (s === 'ssw') return 'SSW';
    } else {
      if (s === 'eps' || s === 'eps-topik') return 'EPS';
      if (s === 'topik-1' || s === 'topik1' || s === 'topik1_l1') return 'TOPIK1_L1';
      if (s === 'topik-2' || s === 'topik2' || s === 'topik3') return 'TOPIK3';
      if (s === 'kiip') return 'KIIP';
    }
    return 'ALL';
  };

  const mapLevelToSlug = (lvl: string): string => {
    if (lvl === 'ALL') return '';
    if (country === 'japan') {
      if (lvl === 'N5') return 'n5';
      if (lvl === 'N4') return 'n4';
      if (lvl === 'N3') return 'n3';
      if (lvl === 'N2') return 'n2';
      if (lvl === 'N1') return 'n1';
      if (lvl === 'JFT') return 'jft';
      if (lvl === 'SSW') return 'ssw';
    } else {
      if (lvl === 'EPS') return 'eps';
      if (lvl === 'TOPIK1_L1') return 'topik-1';
      if (lvl === 'TOPIK3') return 'topik-2';
      if (lvl === 'KIIP') return 'kiip';
    }
    return '';
  };

  const [activeTab, setActiveTab] = useState<'MOCK_TEST' | 'SCORE_HISTORY'>('MOCK_TEST');
  const [selectedCurriculumLevel, setSelectedCurriculumLevel] = useState<string>(() => mapSlugToLevel(initialLevel));
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeExamLevel, setActiveExamLevel] = useState<string | null>(null);
  const [confirmTest, setConfirmTest] = useState<MockTestCatalogItem | null>(null);
  const [showHubExitConfirm, setShowHubExitConfirm] = useState<boolean>(false);
  const [examMode, setExamMode] = useState<'FULL' | 'PARTIAL'>('FULL');
  const [selectedSections, setSelectedSections] = useState<string[]>(['LISTENING', 'READING', 'VOCABULARY', 'GRAMMAR']);
  const [activeExamMockSet, setActiveExamMockSet] = useState<string | null>(null);
  const [activeExamSections, setActiveExamSections] = useState<string[] | null>(null);

  // Sync when initialLevel prop changes
  React.useEffect(() => {
    if (initialLevel) {
      setSelectedCurriculumLevel(mapSlugToLevel(initialLevel));
    }
  }, [initialLevel, country]);

  // Handle browser Back and Forward button events
  React.useEffect(() => {
    const handlePopState = () => {
      if (typeof window === 'undefined') return;
      const pathname = window.location.pathname;
      const segments = pathname.split('/').filter(Boolean);
      if (segments[1] === 'mock-test') {
        const slug = segments[2] || 'ALL';
        setSelectedCurriculumLevel(mapSlugToLevel(slug));
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [country]);

  const handleLevelSelect = (lvlId: string) => {
    setSelectedCurriculumLevel(lvlId);
    const slug = mapLevelToSlug(lvlId);
    const targetUrl = slug ? `/${country}/mock-test/${slug}` : `/${country}/mock-test`;
    if (typeof window !== 'undefined' && window.location.pathname !== targetUrl) {
      window.history.pushState({ level: lvlId }, '', targetUrl);
    }
  };

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

  const japanIndustries = [
    { id: 'ALL', label: 'Industry: All Sectors' },
    { id: 'building-cleaning', label: '🧹 Building Cleaning' },
    { id: 'nursing', label: '🏥 Caregiving (Kaigo)' },
    { id: 'food-service', label: '🍽️ Food Service' },
    { id: 'agriculture', label: '🌾 Agriculture' },
    { id: 'construction', label: '🏗️ Construction' },
    { id: 'hospitality', label: '🏨 Hospitality & Hotel' },
    { id: 'manufacture', label: '🍱 Food Manufacturing' },
    { id: 'automobile', label: '🚗 Automobile Repair' },
  ];

  const koreaIndustries = [
    { id: 'ALL', label: 'Industry: All Sectors' },
    { id: 'manufacturing', label: '🏭 Manufacturing' },
    { id: 'agriculture', label: '🍏 Agriculture & Livestock' },
    { id: 'construction', label: '🏗️ Construction' },
    { id: 'oral', label: '🗣️ Oral Viva Interview' },
    { id: 'general', label: '📦 General & Safety' },
  ];

  const curriculumLevels = country === 'japan' ? japanCurriculumLevels : koreaCurriculumLevels;
  const industriesList = country === 'japan' ? japanIndustries : koreaIndustries;

  const filteredTests = useMemo(() => {
    return rawMockTests.filter((test) => {
      // 1. Course Level filter
      if (selectedCurriculumLevel !== 'ALL') {
        if (test.level !== selectedCurriculumLevel) return false;
      }
      // 2. Difficulty Level filter
      if (selectedDifficulty !== 'ALL') {
        if (test.difficulty !== selectedDifficulty) return false;
      }
      // 3. Industry / Sector filter
      if (selectedIndustry !== 'ALL') {
        if (test.industry) {
          if (test.industry !== selectedIndustry) return false;
        } else {
          const hay = `${test.title} ${test.badge} ${test.desc}`.toLowerCase();
          if (!hay.includes(selectedIndustry.toLowerCase())) return false;
        }
      }
      // 4. Text Search Query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const hay = `${test.title} ${test.subTitle || ''} ${test.badge} ${test.desc} ${test.industry || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [rawMockTests, selectedCurriculumLevel, selectedDifficulty, selectedIndustry, searchQuery]);

  const availableSections = useMemo(() => {
    if (!confirmTest) return [];
    if (confirmTest.id === 'JFT_LISTENING_01') {
      return [
        { id: 'LISTENING', label: '🎧 Listening Comprehension (聴解)', count: 12, desc: 'Everyday conversations, shops, and public announcements' },
      ];
    }
    if (confirmTest.level === 'JFT') {
      return [
        { id: 'LISTENING', label: '🎧 Listening Comprehension (聴解)', count: 12, desc: 'Audio dialogues & announcements (Max 2 replays)' },
        { id: 'READING', label: '📖 Reading Comprehension (読解)', count: 8, desc: 'Notices, messages, short passages' },
        { id: 'VOCABULARY', label: '🔤 Script & Vocabulary (文字・語彙)', count: 10, desc: 'Kanji readings, daily life words' },
        { id: 'GRAMMAR', label: '💬 Conversation & Expressions (会話・表現)', count: 5, desc: 'Workplace & everyday communication' },
      ];
    }
    if (confirmTest.level.startsWith('N')) {
      return [
        { id: 'VOCABULARY', label: '🔤 Script & Vocabulary (文字・語彙)', count: Math.round(confirmTest.questionsCount * 0.4), desc: 'Kanji reading and vocabulary usage' },
        { id: 'GRAMMAR', label: '📖 Grammar & Reading (文法・読解)', count: Math.round(confirmTest.questionsCount * 0.4), desc: 'Particles, conjugation, and passage reading' },
        { id: 'LISTENING', label: '🎧 Listening Comprehension (聴解)', count: Math.max(1, Math.round(confirmTest.questionsCount * 0.2)), desc: 'Spoken dialogue and task comprehension' },
      ];
    }
    return [
      { id: 'READING', label: '📖 Reading (읽기)', count: Math.round(confirmTest.questionsCount * 0.5), desc: 'Vocabulary, grammar, and passage reading' },
      { id: 'LISTENING', label: '🎧 Listening (듣기)', count: Math.round(confirmTest.questionsCount * 0.5), desc: 'Audio dialogue and picture comprehension' },
    ];
  }, [confirmTest]);

  const calculatedDuration = useMemo(() => {
    if (!confirmTest) return 0;
    if (examMode === 'FULL') return confirmTest.durationMinutes;
    if (availableSections.length === 0) return confirmTest.durationMinutes;
    const ratio = selectedSections.length / availableSections.length;
    return Math.max(10, Math.round(confirmTest.durationMinutes * ratio));
  }, [confirmTest, examMode, selectedSections, availableSections]);

  const calculatedQuestions = useMemo(() => {
    if (!confirmTest) return 0;
    if (examMode === 'FULL') return confirmTest.questionsCount;
    if (availableSections.length === 0) return confirmTest.questionsCount;
    const selectedCount = availableSections
      .filter(s => selectedSections.includes(s.id))
      .reduce((acc, curr) => acc + curr.count, 0);
    return selectedCount > 0 ? selectedCount : Math.max(1, Math.round((confirmTest.questionsCount * selectedSections.length) / availableSections.length));
  }, [confirmTest, examMode, selectedSections, availableSections]);

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
          preselectedMockSet={activeExamMockSet || undefined}
          selectedSections={activeExamSections || undefined}
          examMode={examMode}
          autoStart={true}
          onExitExam={() => {
            setActiveExamLevel(null);
            setActiveExamMockSet(null);
            setActiveExamSections(null);
          }}
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

        {/* 🌐 ROW 1: MOCK TEST LEVEL SELECTION BAR */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-1 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-500 whitespace-nowrap pl-1 pr-2">
            <Clock className={`w-3.5 h-3.5 ${country === 'japan' ? 'text-red-500' : 'text-blue-500'}`} />
            <span>Mock Test:</span>
          </div>

          <div className="flex items-center gap-1.5 flex-nowrap">
            {curriculumLevels.map((lvl) => {
              const isSelected = selectedCurriculumLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => handleLevelSelect(lvl.id)}
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
            href={`/${country}/work`}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer"
            title="Open Sector Study Portal, Syllabus & Textbook Lessons"
          >
            <span>{country === 'japan' ? 'Study SSW Skill' : 'Study EPS Skill'}</span>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
          </Link>
        </div>

        {/* 🔝 ROW 2: TOP HEADER CONTROL BAR */}
        <div className="bg-white border border-slate-200 rounded-2xl p-2.5 sm:p-3 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-slate-900">
          {/* Left Controls: Mock Tests and Score History Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('MOCK_TEST')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                activeTab === 'MOCK_TEST'
                  ? country === 'japan' ? 'bg-red-600 text-white border-red-500 font-black shadow-xs' : 'bg-blue-600 text-white border-blue-500 font-black shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Mock Tests</span>
              <span className={`w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center ${
                activeTab === 'MOCK_TEST'
                  ? 'bg-white text-slate-900'
                  : 'bg-slate-300 text-slate-800'
              }`}>
                {filteredTests.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('SCORE_HISTORY')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                activeTab === 'SCORE_HISTORY'
                  ? country === 'japan' ? 'bg-red-600 text-white border-red-500 font-black shadow-xs' : 'bg-blue-600 text-white border-blue-500 font-black shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Score History</span>
              <span className={`w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center ${
                activeTab === 'SCORE_HISTORY'
                  ? 'bg-white text-slate-900'
                  : 'bg-slate-300 text-slate-800'
              }`}>
                2
              </span>
            </button>
          </div>

          {/* Right Controls: Industry Filter & Level Dropdown */}
          <div className="flex items-center gap-2 justify-between lg:justify-end flex-wrap sm:flex-nowrap">
            {/* 🛠️ Extra Filter Option: Industry Filter Dropdown */}
            <div className="relative">
              <select
                value={selectedIndustry}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedIndustry(val);
                  if (val !== 'ALL' && selectedCurriculumLevel !== 'ALL' && selectedCurriculumLevel !== 'SSW' && selectedCurriculumLevel !== 'EPS') {
                    setSelectedCurriculumLevel(country === 'japan' ? 'SSW' : 'EPS');
                  }
                }}
                className="appearance-none pl-7 pr-8 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-slate-400 transition-colors cursor-pointer"
              >
                {industriesList.map((ind) => (
                  <option key={ind.id} value={ind.id}>
                    {ind.label}
                  </option>
                ))}
              </select>
              <Briefcase className="w-3.5 h-3.5 text-indigo-600 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Level/Difficulty Dropdown Select */}
            <div className="relative">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="appearance-none pl-7 pr-8 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-slate-400 transition-colors cursor-pointer"
                title="Filter tests by level"
              >
                <option value="ALL">Level (All)</option>
                <option value="Easy">Easy Level</option>
                <option value="Medium">Medium Level</option>
                <option value="Hard">Hard Level</option>
              </select>
              <Filter className="w-3.5 h-3.5 text-rose-600 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 📋 MOCK TESTS LISTING */}
        {activeTab === 'MOCK_TEST' ? (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
              {/* Desktop Table Header */}
              <div className="hidden lg:grid grid-cols-12 gap-3 px-5 py-3 bg-slate-50/90 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500 items-center">
                <div className="col-span-3">Curriculum / Level</div>
                <div className="col-span-4">Mock Examination Title</div>
                <div className="col-span-3 text-center">Specifications & Benchmark</div>
                <div className="col-span-2 text-right">Action</div>
              </div>

              {/* Rows */}
              {filteredTests.length === 0 ? (
                <div className="p-10 text-center space-y-3">
                  <span className="text-3xl">🔍</span>
                  <h4 className="text-sm font-black text-slate-900">No mock tests found matching your filters</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try selecting &quot;Industry: All Sectors&quot; or clearing your search to view all available exams.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedIndustry('ALL');
                      setSelectedDifficulty('ALL');
                      setSelectedCurriculumLevel('ALL');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
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
              )}
            </div>
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

            {/* Full vs Custom Mock Test Mode Toggle */}
            <div className="p-1 bg-slate-100 rounded-2xl border border-slate-200 flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setExamMode('FULL');
                  setSelectedSections(availableSections.map(s => s.id));
                }}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  examMode === 'FULL'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>🎯 Full Mock Test</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setExamMode('PARTIAL');
                  if (selectedSections.length === 0) {
                    setSelectedSections(availableSections.map(s => s.id));
                  }
                }}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  examMode === 'PARTIAL'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>⚙️ Custom Mock Test</span>
              </button>
            </div>

            {/* In FULL MODE: Test Specs Grid + Concise Exam Rules */}
            {examMode === 'FULL' ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                    <span className="text-[10px] font-black uppercase text-slate-400 block">Duration</span>
                    <span className="font-black text-slate-900 text-sm">{calculatedDuration} Mins</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                    <span className="text-[10px] font-black uppercase text-slate-400 block">Questions</span>
                    <span className="font-black text-slate-900 text-sm">{calculatedQuestions} Qs</span>
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

                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 space-y-1.5">
                  <div className="font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5 text-[11px]">
                    <span>⚠️ Examination Rules</span>
                  </div>
                  <div className="text-slate-700 text-xs space-y-1">
                    <p>• Countdown starts immediately upon clicking <strong>Begin Exam Now</strong>.</p>
                    <p>• Listening audio maximum <strong>2 replays</strong> per question.</p>
                    <p>• Detailed scorecard &amp; Nepali explanations available on submission.</p>
                  </div>
                </div>
              </div>
            ) : (
              /* In CUSTOM MODE: Show section options inside the same card footprint without expanding */
              <div className="space-y-2.5">
                <div className="flex items-center justify-between px-0.5">
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Select Practice Sections:
                  </span>
                  <div className="flex items-center gap-2 text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => setSelectedSections(availableSections.map(s => s.id))}
                      className="text-indigo-600 hover:underline cursor-pointer"
                    >
                      Select All
                    </button>
                    <span className="text-slate-300">•</span>
                    <button
                      type="button"
                      onClick={() => setSelectedSections([])}
                      className="text-slate-500 hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {availableSections.map((sec) => {
                    const isChecked = selectedSections.includes(sec.id);
                    return (
                      <label
                        key={sec.id}
                        className={`flex items-center justify-between gap-2 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                          isChecked
                            ? 'bg-indigo-50/90 border-indigo-400 text-indigo-950 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              if (isChecked) {
                                setSelectedSections(selectedSections.filter(id => id !== sec.id));
                              } else {
                                setSelectedSections([...selectedSections, sec.id]);
                              }
                            }}
                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer shrink-0"
                          />
                          <span className="font-bold text-xs truncate">{sec.label}</span>
                        </div>
                        <span className="text-[10px] font-black text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded shrink-0">
                          {sec.count} Qs
                        </span>
                      </label>
                    );
                  })}
                </div>

                {/* Compact Custom Stats Strip matching the card aesthetic */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <span className="font-bold text-[11px] text-slate-500">Custom Session Target:</span>
                  <span className="font-black text-slate-900">
                    ⏱️ {calculatedDuration} Mins &nbsp;•&nbsp; 📝 {calculatedQuestions} Questions
                  </span>
                </div>
              </div>
            )}

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
                disabled={examMode === 'PARTIAL' && selectedSections.length === 0}
                onClick={() => {
                  if (confirmTest.id.startsWith('BC_SSW1_SET_')) {
                    const setNum = confirmTest.id.replace('BC_SSW1_SET_', '');
                    window.location.href = `/${country}/work/building-cleaning/exam?set=${setNum}`;
                    return;
                  }
                  if (confirmTest.industry === 'nursing' || confirmTest.id.startsWith('KAIGO_SSW1')) {
                    window.location.href = `/${country}/mock-test/skills?sector=nursing`;
                    return;
                  }
                  if (confirmTest.industry === 'food-service' || confirmTest.id.startsWith('FOOD_SSW1')) {
                    window.location.href = `/${country}/mock-test/skills?sector=food-service`;
                    return;
                  }
                  if (confirmTest.industry === 'agriculture' || confirmTest.id.startsWith('AGRI_SSW1')) {
                    window.location.href = country === 'japan' ? `/${country}/mock-test/skills?sector=agriculture` : `/${country}/mock-test/skills?sector=korea_agriculture`;
                    return;
                  }
                  if (confirmTest.industry === 'construction' || confirmTest.id.startsWith('CONST_SSW1')) {
                    window.location.href = country === 'japan' ? `/${country}/mock-test/skills?sector=construction` : `/${country}/mock-test/skills?sector=korea_construction`;
                    return;
                  }
                  if (confirmTest.industry === 'hospitality') {
                    window.location.href = `/${country}/mock-test/skills?sector=hospitality`;
                    return;
                  }
                  if (confirmTest.industry === 'manufacture') {
                    window.location.href = `/${country}/mock-test/skills?sector=manufacture`;
                    return;
                  }
                  if (confirmTest.industry === 'automobile') {
                    window.location.href = `/${country}/mock-test/skills?sector=automobile`;
                    return;
                  }
                  if (confirmTest.industry === 'manufacturing') {
                    window.location.href = `/${country}/mock-test/skills?sector=korea_manufacturing`;
                    return;
                  }
                  if (confirmTest.industry === 'oral') {
                    window.location.href = `/${country}/mock-test/skills?sector=korea_oral`;
                    return;
                  }
                  if (confirmTest.level === 'SSW' || confirmTest.id.startsWith('EPS_SKILL')) {
                    window.location.href = `/${country}/mock-test/skills`;
                    return;
                  }
                  setActiveExamMockSet(confirmTest.id);
                  setActiveExamSections(examMode === 'PARTIAL' ? selectedSections : null);
                  setActiveExamLevel(confirmTest.level);
                  setConfirmTest(null);
                }}
                className={`flex-1 py-3 rounded-xl font-black text-xs text-white shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                  examMode === 'PARTIAL' && selectedSections.length === 0
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed border border-slate-300'
                    : country === 'japan'
                    ? 'bg-red-600 hover:bg-red-500 border border-red-500'
                    : 'bg-blue-600 hover:bg-blue-500 border border-blue-500'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>
                  {examMode === 'PARTIAL' && selectedSections.length === 0
                    ? 'Select ≥1 Section'
                    : `Begin Exam Now (${calculatedQuestions} Qs)`}
                </span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
