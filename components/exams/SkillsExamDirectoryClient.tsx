'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Search,
  Clock,
  Award,
  BookOpen,
  Sparkles,
  Play,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Wrench,
  Activity,
  MessageSquare,
  RotateCcw,
  ExternalLink,
  LayoutList,
  LayoutGrid,
  X
} from 'lucide-react';

export interface SkillExamItem {
  id: string;
  country: 'japan' | 'korea';
  sectorKey: string;
  sectorName: string;
  kanji: string;
  icon: string;
  setNumber: number;
  badge: string;
  title: string;
  titleNe: string;
  description: string;
  descriptionNe: string;
  durationMinutes: number;
  questionsCount: number;
  passBenchmark: string;
  formatType: string;
  isFullTestReady: boolean;
  examUrl: string;
  studyUrl: string;
  topics: string[];
}

export const SKILL_EXAMS_CATALOG: SkillExamItem[] = [
  // ==========================================
  // 🧹 1. BUILDING CLEANING (ビルクリーニング) - 5 SETS
  // ==========================================
  {
    id: 'BC_SET_1',
    country: 'japan',
    sectorKey: 'building-cleaning',
    sectorName: 'Building Cleaning',
    kanji: 'ビルクリーニング分野特定技能１号評価試験',
    icon: '🧹',
    setNumber: 1,
    badge: 'Official Prometric CBT • Full Furigana',
    title: 'Building Cleaning SSW-1 Mock Test — Set 1 (Comprehensive)',
    titleNe: 'भवन सरसफाइ विशेष सीप नं. १ — नमुना परीक्षा सेट १ (व्यापक नमुना परीक्षा)',
    description: 'Authentic 60-minute Prometric CBT simulation covering 15 True/False and 15 Multiple Choice questions with full Furigana on every single Kanji, visual equipment diagrams, and 60% pass threshold.',
    descriptionNe: 'सबै काञ्जीमा फुरिगाना, १५ वटा सही/गलत, १५ वटा ४-विकल्प प्रश्न, मेसिनका चित्रहरू, ६०% पास मार्क र नेपाली अनुवाद सहितको आधिकारिक परीक्षा।',
    durationMinutes: 60,
    questionsCount: 30,
    passBenchmark: '60% (18 / 30 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/building-cleaning/exam?set=1',
    studyUrl: '/japan/work/building-cleaning',
    topics: ['Safety & 5S', 'Floor Polisher & Pads', 'Chemical Dilution & pH', 'Marble Acid Danger', 'Window Squeegee', 'Restroom Sanitation', 'Hotel Bed Making', 'Waste Segregation']
  },
  {
    id: 'BC_SET_2',
    country: 'japan',
    sectorKey: 'building-cleaning',
    sectorName: 'Building Cleaning',
    kanji: 'ビルクリーニング機械・洗剤希釈評価試験',
    icon: '🧹',
    setNumber: 2,
    badge: 'Machinery & Detergent Dilution Focus',
    title: 'Building Cleaning SSW-1 Mock Test — Set 2 (Tools & Chemicals)',
    titleNe: 'भवन सरसफाइ विशेष सीप नं. १ — नमुना परीक्षा सेट २ (मेसिन तथा रसायन घोल)',
    description: 'Specialized 30-question mock test covering Floor Polisher cord safety, red/black/blue pad friction selection, carpet extractor operation, and neutral vs acidic detergent pH chemistry.',
    descriptionNe: 'फ्लोर पोलिस मेसिनका तार सुरक्षा, विभिन्न रङका प्याडहरूको प्रयोग, कार्पेट एक्स्ट्रयाक्टर र अम्ल/क्षार घोल मिश्रण सम्बन्धी ३० प्रश्नहरूको नमुना परीक्षा।',
    durationMinutes: 60,
    questionsCount: 30,
    passBenchmark: '60% (18 / 30 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/building-cleaning/exam?set=2',
    studyUrl: '/japan/work/building-cleaning',
    topics: ['Floor Polisher Cord Safety', 'Pad Color Grading', 'pH Scale (Acidic vs Neutral)', 'Carpet Extractor', 'Chemical PPE', 'Vacuum HEPA Filters']
  },
  {
    id: 'BC_SET_3',
    country: 'japan',
    sectorKey: 'building-cleaning',
    sectorName: 'Building Cleaning',
    kanji: 'ビルクリーニング衛生管理・交差汚染防止試験',
    icon: '🧹',
    setNumber: 3,
    badge: 'Hygiene & Cross-Contamination Focus',
    title: 'Building Cleaning SSW-1 Mock Test — Set 3 (Sanitation & Restrooms)',
    titleNe: 'भवन सरसफाइ विशेष सीप नं. १ — नमुना परीक्षा सेट ३ (सरसफाइ र क्रस-इन्फेक्सन)',
    description: 'Exam set focusing on toilet sanitization protocols, urinal stone acidic descaling, color-coded microfiber towels (red/yellow/blue), and cross-contamination prevention.',
    descriptionNe: 'शौचालय सरसफाइ, पिसाबको कडा दाग हटाउने तरिका, विभिन्न रङका कपडाहरूको विभाजन र ब्याक्टेरिया सर्न नदिने नियम सम्बन्धी नमुना परीक्षा।',
    durationMinutes: 60,
    questionsCount: 30,
    passBenchmark: '60% (18 / 30 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/building-cleaning/exam?set=3',
    studyUrl: '/japan/work/building-cleaning',
    topics: ['Restroom Descaling', 'Color-Coded Mops & Towels', 'Cross-Contamination', 'Disinfection with Alcohol', 'Urine Stone Acid Reaction', 'Odor Control']
  },
  {
    id: 'BC_SET_4',
    country: 'japan',
    sectorKey: 'building-cleaning',
    sectorName: 'Building Cleaning',
    kanji: 'ビルクリーニング高所作業・ベッドメイキング試験',
    icon: '🧹',
    setNumber: 4,
    badge: 'Glass Squeegee & Hotel Bed Making Focus',
    title: 'Building Cleaning SSW-1 Mock Test — Set 4 (Glass & Hotel Rooms)',
    titleNe: 'भवन सरसफाइ विशेष सीप नं. १ — नमुना परीक्षा सेट ४ (झ्यालको सिसा र होटेल रुम)',
    description: 'Targeted drill on window glass squeegee stroke angles, stepladder three-point contact safety, mattress sheet mitered corners (corners 45°), and guest privacy regulations.',
    descriptionNe: 'झ्यालको सिसा स्क्विजीले सफा गर्ने कोण, भर्याङ सुरक्षा, होटेलको ओछ्यान मिलाउने कला (४५ डिग्री कुना) र पाहुनाको गोपनीयता सम्बन्धी परीक्षा।',
    durationMinutes: 60,
    questionsCount: 30,
    passBenchmark: '60% (18 / 30 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/building-cleaning/exam?set=4',
    studyUrl: '/japan/work/building-cleaning',
    topics: ['Squeegee Rubber Blade Angle', 'Stepladder 3-Point Contact', 'Hotel Bed Making (45° Corners)', 'Duvet Cover Insertion', 'Amenity Setup', 'Lost & Found Procedures']
  },
  {
    id: 'BC_SET_5',
    country: 'japan',
    sectorKey: 'building-cleaning',
    sectorName: 'Building Cleaning',
    kanji: 'ビルクリーニング全国統一模擬試験・最終判定',
    icon: '🧹',
    setNumber: 5,
    badge: 'Final JBMA Nationwide Simulation',
    title: 'Building Cleaning SSW-1 Mock Test — Set 5 (Final Examination Simulator)',
    titleNe: 'भवन सरसफाइ विशेष सीप नं. १ — नमुना परीक्षा सेट ५ (अन्तिम परीक्षा सिमुलेटर)',
    description: 'High-difficulty mock exam simulating the actual Prometric test center environment with randomized tricky questions on marble protection, hazard signs, and workplace reporting.',
    descriptionNe: 'मार्बलमा एसिड पर्न नदिने सतर्कता, जोखिम संकेत, कार्यस्थल रिपोर्टिङ (होरेन्सो) र वास्तविक परीक्षा हलको वातावरण दिने उच्चस्तरीय नमुना परीक्षा।',
    durationMinutes: 60,
    questionsCount: 30,
    passBenchmark: '60% (18 / 30 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/building-cleaning/exam?set=5',
    studyUrl: '/japan/work/building-cleaning',
    topics: ['Marble Maintenance', 'Safety Hazard Signs', 'Workplace Ho-Ren-So', 'Emergency Fire Protocol', 'Waste Classification (Hazardous vs Recyclable)', 'Comprehensive CBT Drill']
  },

  // ==========================================
  // 🏥 2. CAREGIVING / KAIGO (介護分野) - 5 SETS
  // ==========================================
  {
    id: 'KAIGO_SET_1',
    country: 'japan',
    sectorKey: 'nursing',
    sectorName: 'Caregiving (Kaigo)',
    kanji: '介護技能評価試験・介護日本語評価試験',
    icon: '🏥',
    setNumber: 1,
    badge: 'MHLW Prometric Official Track',
    title: 'Caregiving (Kaigo) SSW-1 Mock Test — Set 1 (Body Mechanics & Transfers)',
    titleNe: 'हेरचाह (काइगो) विशेष सीप नं. १ — नमुना परीक्षा सेट १ (शरीर मेकानिक्स र ह्विलचेयर)',
    description: 'Ministry of Health, Labour and Welfare (MHLW) official evaluation exam simulation covering patient transfer, wheelchair operation, body mechanics 8 principles, and bed-to-chair assistance.',
    descriptionNe: 'बिरामी ओछ्यानबाट ह्विलचेयरमा सार्ने तरिका, शरीर मेकानिक्सका ८ सिद्धान्तहरू, ह्विलचेयरको ब्रेक सुरक्षा सम्बन्धी ४५ प्रश्नहरूको नमुना परीक्षा।',
    durationMinutes: 60,
    questionsCount: 45,
    passBenchmark: '60% (27 / 45 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/nursing/exam?set=1',
    studyUrl: '/japan/work/nursing',
    topics: ['Body Mechanics (8 Rules)', 'Wheelchair Brake Safety', 'Hemiplegia Transfer Assistance', 'Bed Positioning', 'Fall Prevention', 'Respecting Patient Dignity']
  },
  {
    id: 'KAIGO_SET_2',
    country: 'japan',
    sectorKey: 'nursing',
    sectorName: 'Caregiving (Kaigo)',
    kanji: '介護食事介助・誤嚥防止技能試験',
    icon: '🏥',
    setNumber: 2,
    badge: 'Feeding & Dysphagia Prevention',
    title: 'Caregiving (Kaigo) SSW-1 Mock Test — Set 2 (Meal Assistance & Choking)',
    titleNe: 'हेरचाह (काइगो) विशेष सीप नं. १ — नमुना परीक्षा सेट २ (खाना खुवाउने र स्वासप्रश्वास सुरक्षा)',
    description: 'Comprehensive test on elderly dysphagia (difficulty swallowing), upright meal postures (60-90° tilt with chin down), thickened liquid preparation, and oral hygiene after meals.',
    descriptionNe: 'ज्येष्ठ नागरिकहरूलाई खाना खुवाउँदा स्वास नलीमा अड्किन नदिने बसाइ, बाक्लो झोल बनाउने तरिका र खानापछिको मुख सरसफाइ सम्बन्धी परीक्षा।',
    durationMinutes: 60,
    questionsCount: 45,
    passBenchmark: '60% (27 / 45 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/nursing/exam?set=2',
    studyUrl: '/japan/work/nursing',
    topics: ['Dysphagia (Swallowing Difficulty)', 'Chin-Down Meal Posture', 'Thickened Liquids (Toromi)', 'Oral Care & Denture Cleaning', 'Aspiration Choking First Aid', 'Nutritional Monitoring']
  },
  {
    id: 'KAIGO_SET_3',
    country: 'japan',
    sectorKey: 'nursing',
    sectorName: 'Caregiving (Kaigo)',
    kanji: '介護認知症ケア・コミュニケーション試験',
    icon: '🏥',
    setNumber: 3,
    badge: 'Dementia Care & Technical Japanese',
    title: 'Caregiving (Kaigo) SSW-1 Mock Test — Set 3 (Dementia 4-Types & Communication)',
    titleNe: 'हेरचाह (काइगो) विशेष सीप नं. १ — नमुना परीक्षा सेट ३ (डिमेन्सिया ४ प्रकार र संवाद)',
    description: 'Prometric standard evaluation testing Alzheimer’s, Vascular, Lewy Body, and Frontotemporal dementia characteristics, empathetic listening skills, and technical Kaigo vocabulary.',
    descriptionNe: 'अल्जाइमर तथा डिमेन्सियाका ४ प्रकारहरू, बिरामीसँग आँखा जुधाएर गरिने सहानुभूतिपूर्ण कुराकानी र केयरगिभिङ प्राविधिक शब्दावलीको परीक्षा।',
    durationMinutes: 60,
    questionsCount: 45,
    passBenchmark: '60% (27 / 45 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/nursing/exam?set=3',
    studyUrl: '/japan/work/nursing',
    topics: ['Alzheimer & Vascular Dementia', 'Lewy Body Hallucinations', 'Frontotemporal Disinhibition', 'Empathetic Eye-Level Dialogue', 'BPSD Non-Pharmacological Care', 'Privacy in Japanese Care']
  },
  {
    id: 'KAIGO_SET_4',
    country: 'japan',
    sectorKey: 'nursing',
    sectorName: 'Caregiving (Kaigo)',
    kanji: '介護褥瘡予防・排泄介助技能評価試験',
    icon: '🏥',
    setNumber: 4,
    badge: 'Bedsore Prevention & Excretion Care',
    title: 'Caregiving (Kaigo) SSW-1 Mock Test — Set 4 (Pressure Ulcers & Hygiene)',
    titleNe: 'हेरचाह (काइगो) विशेष सीप नं. १ — नमुना परीक्षा सेट ४ (घाउ हुन नदिने र दिसापिसाब सहयोग)',
    description: 'Assessment covering 2-hour body repositioning for pressure sore prevention (sacrum/heels), portable toilet privacy, diaper size selection, and infection barrier precautions.',
    descriptionNe: 'ओछ्यानमा लामो समय सुत्दा घाउ (Pressure Ulcers) हुन नदिन हरेक २ घण्टामा कोल्टे फेराउने, शौचालयमा मर्यादा कायम गर्ने र पञ्जा प्रयोग सम्बन्धी परीक्षा।',
    durationMinutes: 60,
    questionsCount: 45,
    passBenchmark: '60% (27 / 45 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/nursing/exam?set=4',
    studyUrl: '/japan/work/nursing',
    topics: ['Pressure Ulcer Sites (Sacrum, Heels)', '2-Hour Repositioning Schedule', 'Portable Toilet Assistance', 'Diaper Fit & Skin Dryness', 'Infection Barrier (Gloves/Apron)', 'Vital Signs Normal Ranges']
  },
  {
    id: 'KAIGO_SET_5',
    country: 'japan',
    sectorKey: 'nursing',
    sectorName: 'Caregiving (Kaigo)',
    kanji: '介護全国統一本番想定総合評価試験',
    icon: '🏥',
    setNumber: 5,
    badge: 'Comprehensive Prometric Final CBT',
    title: 'Caregiving (Kaigo) SSW-1 Mock Test — Set 5 (Final Examination Simulator)',
    titleNe: 'हेरचाह (काइगो) विशेष सीप नं. १ — नमुना परीक्षा सेट ५ (अन्तिम परीक्षा सिमुलेटर)',
    description: 'Complete 45-question official simulation integrating care philosophy, clinical situational judgment, emergency response, and nursing handover record interpretation.',
    descriptionNe: 'केयरगिभिङ दर्शन, आपतकालीन अवस्थाको निर्णय क्षमता, लड्दा अपनाइने प्राथमिक उपचार र जापानी मेडिकल रिपोर्टिङ समेटिएको अन्तिम नमुना परीक्षा।',
    durationMinutes: 60,
    questionsCount: 45,
    passBenchmark: '60% (27 / 45 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/nursing/exam?set=5',
    studyUrl: '/japan/work/nursing',
    topics: ['Self-Determination Principle', 'Accident Incident Reporting', 'Hypothermia & Heatstroke', 'Emergency CPR Basics', 'Workplace Shift Handover', 'Full 45-Question Simulator']
  },

  // ==========================================
  // 🍽️ 3. FOOD SERVICE / GAISHOKU (外食業) - 5 SETS
  // ==========================================
  {
    id: 'FOOD_SET_1',
    country: 'japan',
    sectorKey: 'food-service',
    sectorName: 'Food Service',
    kanji: '外食業特定技能1号技能測定試験',
    icon: '🍽️',
    setNumber: 1,
    badge: 'OTAFF Prometric Official Track',
    title: 'Food Service (Gaishoku) SSW-1 Mock Test — Set 1 (HACCP & Hygiene)',
    titleNe: 'रेस्टुरेन्ट तथा खाना सेवा विशेष सीप परीक्षा — नमुना परीक्षा सेट १ (HACCP र खाद्य सरसफाइ)',
    description: 'OTAFF official restaurant evaluation covering food preparation safety, HACCP sanitation standards, cross-contamination, and food poisoning 3 principles.',
    descriptionNe: 'HACCP अन्तर्राष्ट्रिय सरसफाइ मापदण्ड, खाद्य विषाक्तता (Food Poisoning) रोक्ने ३ सिद्धान्त र भान्छामा हात धुने ७ चरण सम्बन्धी ८० मिनेटको परीक्षा।',
    durationMinutes: 80,
    questionsCount: 30,
    passBenchmark: '65% (20 / 30 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/food-service/exam?set=1',
    studyUrl: '/japan/work/food-service',
    topics: ['HACCP 7 Principles', '3 Rules of Food Poisoning', 'Handwashing 7 Steps', 'Norovirus & Salmonella', 'Cross-Contamination Prevention', 'Food Temperature Danger Zone']
  },
  {
    id: 'FOOD_SET_2',
    country: 'japan',
    sectorKey: 'food-service',
    sectorName: 'Food Service',
    kanji: '外食業調理仕込み・アレルギー管理試験',
    icon: '🍽️',
    setNumber: 2,
    badge: 'Allergen Control & Kitchen Prep',
    title: 'Food Service (Gaishoku) SSW-1 Mock Test — Set 2 (Allergens & Kitchen Prep)',
    titleNe: 'रेस्टुरेन्ट तथा खाना सेवा विशेष सीप परीक्षा — नमुना परीक्षा सेट २ (एलर्जी र भान्छा तयारी)',
    description: 'Mock test on Japan mandatory 8 allergen labeling (eggs, milk, wheat, buckwheat, peanuts, shrimp, crab, walnut), cutting board segregation, and raw ingredient thawing.',
    descriptionNe: 'जापानमा अनिवार्य ८ एलर्जी खाद्य पदार्थ, मासु/माछा/तरकारी काट्ने छुट्टाछुट्टै चपिङ बोर्ड र फ्रिजमा कच्चा खाना भण्डारण गर्ने नियम सम्बन्धी परीक्षा।',
    durationMinutes: 80,
    questionsCount: 30,
    passBenchmark: '65% (20 / 30 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/food-service/exam?set=2',
    studyUrl: '/japan/work/food-service',
    topics: ['8 Mandatory Food Allergens', 'Cutting Board Color Coding', 'Knife Sanitation & Storage', 'Safe Defrosting Protocols', 'Internal Cooking Temperature (75°C 1min)', 'Vegetable Chlorine Disinfection']
  },
  {
    id: 'FOOD_SET_3',
    country: 'japan',
    sectorKey: 'food-service',
    sectorName: 'Food Service',
    kanji: '外食業接客サービス・敬語対話試験',
    icon: '🍽️',
    setNumber: 3,
    badge: 'Customer Service & Dining Keigo',
    title: 'Food Service (Gaishoku) SSW-1 Mock Test — Set 3 (Customer Service Keigo)',
    titleNe: 'रेस्टुरेन्ट तथा खाना सेवा विशेष सीप परीक्षा — नमुना परीक्षा सेट ३ (ग्राहक सेवा र केइगो भाषा)',
    description: 'Assessment on greeting guests (いらっしゃいませ), table seating etiquette, taking food orders, handling billing/cashier mistakes, and polite Japanese honorifics.',
    descriptionNe: 'ग्राहक स्वागत (इरास्याइमासे), अर्डर टिप्ने तरिका, टेबल सफा गर्ने नियम, क्यास काउन्टर सेवा र रेस्टुरेन्टको आदरार्थी भाषा (Keigo) सम्बन्धी परीक्षा।',
    durationMinutes: 80,
    questionsCount: 30,
    passBenchmark: '65% (20 / 30 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/food-service/exam?set=3',
    studyUrl: '/japan/work/food-service',
    topics: ['Dining Keigo (Honorifics)', 'Guest Greeting & Seating', 'Order Taking Confirmation', 'Cashier & POS Etiquette', 'Serving Drinks & Dishes', 'Table Busboy Clearance']
  },
  {
    id: 'FOOD_SET_4',
    country: 'japan',
    sectorKey: 'food-service',
    sectorName: 'Food Service',
    kanji: '外食業苦情対応・厨房安全衛生管理試験',
    icon: '🍽️',
    setNumber: 4,
    badge: 'Complaint Handling & Safety',
    title: 'Food Service (Gaishoku) SSW-1 Mock Test — Set 4 (Complaints & Equipment Safety)',
    titleNe: 'रेस्टुरेन्ट तथा खाना सेवा विशेष सीप परीक्षा — नमुना परीक्षा सेट ४ (उजुरी समाधान र भान्छा सुरक्षा)',
    description: 'Drill testing proper responses to food hair contamination, spilled drinks, kitchen deep-fryer burn hazards, slip safety, and fire extinguisher operation.',
    descriptionNe: 'खाना वा पेय पदार्थमा कपाल पस्दा वा पोखिँदा ग्राहकसँग क्षमायाचना गर्ने तरिका, तेल फ्रायरको सुरक्षा र आगलागी नियन्त्रण सम्बन्धी परीक्षा।',
    durationMinutes: 80,
    questionsCount: 30,
    passBenchmark: '65% (20 / 30 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/food-service/exam?set=4',
    studyUrl: '/japan/work/food-service',
    topics: ['Apology & Complaint Protocol', 'Foreign Body Contamination', 'Deep Fryer Burn Prevention', 'Wet Kitchen Slip Safety', 'Fire Blanket & Extinguishers', 'Chemical Dishwasher Sanitization']
  },
  {
    id: 'FOOD_SET_5',
    country: 'japan',
    sectorKey: 'food-service',
    sectorName: 'Food Service',
    kanji: '外食業全国統一総合判定試験',
    icon: '🍽️',
    setNumber: 5,
    badge: 'Comprehensive OTAFF Final Simulation',
    title: 'Food Service (Gaishoku) SSW-1 Mock Test — Set 5 (Final Examination Simulator)',
    titleNe: 'रेस्टुरेन्ट तथा खाना सेवा विशेष सीप परीक्षा — नमुना परीक्षा सेट ५ (अन्तिम परीक्षा सिमुलेटर)',
    description: 'High-yield Prometric simulation mirroring the official OTAFF question distribution across hygiene (40%), kitchen cooking (30%), and hospitality customer service (30%).',
    descriptionNe: 'सरसफाइ (४०%), खाना पकाउने सीप (३०%) र ग्राहक सेवा (३०%) अनुपातमा आधारित पूर्ण नमुना परीक्षा।',
    durationMinutes: 80,
    questionsCount: 30,
    passBenchmark: '65% (20 / 30 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/food-service/exam?set=5',
    studyUrl: '/japan/work/food-service',
    topics: ['Full 30-Question Gaishoku Exam', 'Sanitation Legislation', 'Food Storage Labelling', 'Staff Health Verification', 'Waste Grease Traps', 'Final CBT Score Evaluation']
  },

  // ==========================================
  // 🌾 4. AGRICULTURE / NOUGYOU (農業) - 5 SETS
  // ==========================================
  {
    id: 'AGRI_SET_1',
    country: 'japan',
    sectorKey: 'agriculture',
    sectorName: 'Agriculture',
    kanji: '農業特定技能1号評価試験（栽培農業）',
    icon: '🌾',
    setNumber: 1,
    badge: 'JA Prometric Official Track',
    title: 'Agriculture (Nougyou) SSW-1 Mock Test — Set 1 (Crop Cultivation Basics)',
    titleNe: 'कृषि विशेष सीप नं. १ मूल्याङ्कन परीक्षा — नमुना परीक्षा सेट १ (बालीनाली खेतीको आधारभूत)',
    description: 'Japan Agricultural Cooperatives evaluation covering soil preparation, seedling transplantation, fertilizer ratios (N-P-K), and weed management.',
    descriptionNe: 'माटोको तयारी, बीउ उमार्ने, बिरुवा सार्ने, रासायनिक मल (नाइन्ट्रोजन-फस्फोरस-पोटासियम) र झारपात नियन्त्रण सम्बन्धी ६० मिनेटको परीक्षा।',
    durationMinutes: 60,
    questionsCount: 35,
    passBenchmark: '60% (21 / 35 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/agriculture/exam?set=1',
    studyUrl: '/japan/work/agriculture',
    topics: ['Soil pH & Compost Mixing', 'NPK Fertilizer Ratios', 'Transplanting Seedlings', 'Irrigation Timing', 'Weed Mulching', 'Vegetable Growth Stages']
  },
  {
    id: 'AGRI_SET_2',
    country: 'japan',
    sectorKey: 'agriculture',
    sectorName: 'Agriculture',
    kanji: '施設園芸・ハウス温湿度管理試験',
    icon: '🌾',
    setNumber: 2,
    badge: 'Greenhouse Climate & Irrigation',
    title: 'Agriculture (Nougyou) SSW-1 Mock Test — Set 2 (Greenhouse Climate & Moisture)',
    titleNe: 'कृषि विशेष सीप नं. १ मूल्याङ्कन परीक्षा — नमुना परीक्षा सेट २ (ग्रीनहाउस तापक्रम र सिँचाइ)',
    description: 'Greenhouse horticulture test covering vinyl house roof ventilation, heater temperature control, drip irrigation timing, and plant disease prevention.',
    descriptionNe: 'प्लास्टिक घर (भिनाइल हाउस) भित्र भेन्टिलेसन खोल्ने, जाडोमा हिटर चलाउने, थोपा सिँचाइ र बिरुवामा लाग्ने ढुसी नियन्त्रण सम्बन्धी परीक्षा।',
    durationMinutes: 60,
    questionsCount: 35,
    passBenchmark: '60% (21 / 35 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/agriculture/exam?set=2',
    studyUrl: '/japan/work/agriculture',
    topics: ['Greenhouse Ventilation', 'Day/Night Temperature Ranges', 'Drip Irrigation Systems', 'Mildew & Fungal Diseases', 'Pruning Lateral Shoots', 'Sunlight Shade Curtains']
  },
  {
    id: 'AGRI_SET_3',
    country: 'japan',
    sectorKey: 'agriculture',
    sectorName: 'Agriculture',
    kanji: '農薬散布・安全防護具取り扱い試験',
    icon: '🌾',
    setNumber: 3,
    badge: 'Pesticide Dilution & Protective PPE',
    title: 'Agriculture (Nougyou) SSW-1 Mock Test — Set 3 (Pesticide Safety & Dilution)',
    titleNe: 'कृषि विशेष सीप नं. १ मूल्याङ्कन परीक्षा — नमुना परीक्षा सेट ३ (विषादी सुरक्षा र घोल)',
    description: 'Crucial exam on pesticide dilution calculation (e.g., 1000x ratio), wind direction spray safety, protective respirator masks, and pre-harvest chemical interval rules.',
    descriptionNe: 'कीटनाशक औषधि मिसाउने अनुपात (१००० गुणा), हावाको बहाव हेरेर विषादी छर्ने नियम, मास्क तथा सुरक्षा पोसाक र बाली काट्नुअघिको पर्खने समय।',
    durationMinutes: 60,
    questionsCount: 35,
    passBenchmark: '60% (21 / 35 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/agriculture/exam?set=3',
    studyUrl: '/japan/work/agriculture',
    topics: ['Pesticide Dilution Ratios', 'Respirator & Goggle PPE', 'Spray Direction (Wind Back)', 'Pre-Harvest Interval (PHI)', 'Safe Chemical Disposal', 'Heatstroke in Sun Fields']
  },
  {
    id: 'AGRI_SET_4',
    country: 'japan',
    sectorKey: 'agriculture',
    sectorName: 'Agriculture',
    kanji: '農業機械安全操作・収穫出荷調製試験',
    icon: '🌾',
    setNumber: 4,
    badge: 'Tractor Operation & Harvest Quality',
    title: 'Agriculture (Nougyou) SSW-1 Mock Test — Set 4 (Machinery & Sorting Quality)',
    titleNe: 'कृषि विशेष सीप नं. १ मूल्याङ्कन परीक्षा — नमुना परीक्षा सेट ४ (ट्रयाक्टर सुरक्षा र ग्रेडिङ)',
    description: 'Machinery safety test on walking tillers, tractor PTO shaft hazard awareness, vegetable grading sizes (S/M/L), sorting bruised crops, and cold chain packing.',
    descriptionNe: 'हाते ट्याक्टर र ठूलो ट्याक्टर चलाउँदा कपडा नअड्किने सुरक्षा, फलफूल तथा तरकारीको साइज ग्रेडिङ (S/M/L) र बक्सिङ सम्बन्धी परीक्षा।',
    durationMinutes: 60,
    questionsCount: 35,
    passBenchmark: '60% (21 / 35 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/agriculture/exam?set=4',
    studyUrl: '/japan/work/agriculture',
    topics: ['Tractor PTO Shaft Entanglement Hazard', 'Slope Overturn Prevention', 'Produce Size Classification', 'Bruise Inspection', 'Cardboard Boxing & Pallets', 'Cold Storage Temperature']
  },
  {
    id: 'AGRI_SET_5',
    country: 'japan',
    sectorKey: 'agriculture',
    sectorName: 'Agriculture',
    kanji: '農業全国統一模擬試験・最終判定',
    icon: '🌾',
    setNumber: 5,
    badge: 'Comprehensive JA Prometric Simulator',
    title: 'Agriculture (Nougyou) SSW-1 Mock Test — Set 5 (Final Examination Simulator)',
    titleNe: 'कृषि विशेष सीप नं. १ मूल्याङ्कन परीक्षा — नमुना परीक्षा सेट ५ (अन्तिम परीक्षा सिमुलेटर)',
    description: 'Full-spectrum mock exam testing crop cultivation, livestock handling hygiene, weather disaster mitigation (typhoon/frost), and daily farm logs.',
    descriptionNe: 'बाली उत्पादन, पशुपालन सरसफाइ, आँधीबेहरी र तुसारोबाट बाली जोगाउने उपाय र दैनिक कृषि डायरी सम्बन्धी अन्तिम नमुना परीक्षा।',
    durationMinutes: 60,
    questionsCount: 35,
    passBenchmark: '60% (21 / 35 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/agriculture/exam?set=5',
    studyUrl: '/japan/work/agriculture',
    topics: ['Comprehensive 35 Questions', 'Livestock Biosecurity', 'Typhoon Preparation', 'Frost Damage Prevention', 'Farm Work Safety Reporting', 'Prometric CBT Score Benchmark']
  },

  // ==========================================
  // 🏗️ 5. CONSTRUCTION / KENSETSU (建設分野) - 5 SETS
  // ==========================================
  {
    id: 'CONST_SET_1',
    country: 'japan',
    sectorKey: 'construction',
    sectorName: 'Construction',
    kanji: '建設分野特定技能1号評価試験',
    icon: '🏗️',
    setNumber: 1,
    badge: 'JAC Prometric Official Track',
    title: 'Construction (Kensetsu) SSW-1 Mock Test — Set 1 (KYK & Site Safety)',
    titleNe: 'निर्माण क्षेत्र विशेष सीप नं. १ परीक्षा — नमुना परीक्षा सेट १ (KYK जोखिम पूर्वानुमान र सुरक्षा)',
    description: 'Japan Construction Skills Training Organization exam covering site safety, pointing-and-calling checks (Shisa Koshou), KYK hazard predictions, and morning radio calisthenics.',
    descriptionNe: 'निर्माण स्थलको सुरक्षा नियम, जोखिम पूर्वानुमान (KYK), औंलाले देखाएर ठिक छ भन्दै बोल्ने नियम र बिहानी व्यायाम सम्बन्धी ६० मिनेटको परीक्षा।',
    durationMinutes: 60,
    questionsCount: 30,
    passBenchmark: '60% (18 / 30 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/construction/exam?set=1',
    studyUrl: '/japan/work/construction',
    topics: ['KYK (Hazard Prediction Activity)', 'Pointing-and-Calling (Shisa Koshou)', 'Hard Hat & Chin Strap', 'Site Entry 5S Rules', 'Morning Toolbox Meeting (TBM)', 'Safety Officer Signals']
  },
  {
    id: 'CONST_SET_2',
    country: 'japan',
    sectorKey: 'construction',
    sectorName: 'Construction',
    kanji: '足場組立・フルハーネス安全帯試験',
    icon: '🏗️',
    setNumber: 2,
    badge: 'Full-Harness Dual Hooking & Scaffolding',
    title: 'Construction (Kensetsu) SSW-1 Mock Test — Set 2 (Scaffolding & Fall Protection)',
    titleNe: 'निर्माण क्षेत्र विशेष सीप नं. १ परीक्षा — नमुना परीक्षा सेट २ (स्क्याफोल्डिङ र सुरक्षा बेल्ट)',
    description: 'Assessment on dual-lanyard full-harness wearing (2-丁掛け), working at heights above 2 meters, scaffold plank gap inspections, and toe-board fall prevention.',
    descriptionNe: '२ मिटरभन्दा अग्लो ठाउँमा अनिवार्य लगाइने दुई-हुक हार्नेस सुरक्षा बेल्ट, स्क्याफोल्डिङका फल्याक जोड्ने र औजार तल खस्न नदिने नियम।',
    durationMinutes: 60,
    questionsCount: 30,
    passBenchmark: '60% (18 / 30 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/construction/exam?set=2',
    studyUrl: '/japan/work/construction',
    topics: ['Full Harness 2-Hook Rule (2丁掛け)', '2-Meter Height Regulations', 'Scaffold Plank Gap Limits (under 3cm)', 'Toe-Board Installation', 'Safety Net Erection', 'Lanyard Shock Absorbers']
  },
  {
    id: 'CONST_SET_3',
    country: 'japan',
    sectorKey: 'construction',
    sectorName: 'Construction',
    kanji: '電動工具・丸ノコ・グラインダー点検試験',
    icon: '🏗️',
    setNumber: 3,
    badge: 'Electric Tools & Rotating Blades',
    title: 'Construction (Kensetsu) SSW-1 Mock Test — Set 3 (Power Tools & Pre-Work Checks)',
    titleNe: 'निर्माण क्षेत्र विशेष सीप नं. १ परीक्षा — नमुना परीक्षा सेट ३ (विद्युतीय औजार र ब्लेड सुरक्षा)',
    description: 'Safety questions on disc grinders (wheel speed ratings, safety covers), portable circular saws, earth leakage breakers, and cord damage inspections.',
    descriptionNe: 'डिस्क ग्राइन्डर चलाउँदा सुरक्षा कभर, काठ काट्ने सर्कुलर आरा, अर्थिङ ब्रेकर र बिजुलीको तार जाँच सम्बन्धी प्राविधिक प्रश्नहरूको परीक्षा।',
    durationMinutes: 60,
    questionsCount: 30,
    passBenchmark: '60% (18 / 30 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/construction/exam?set=3',
    studyUrl: '/japan/work/construction',
    topics: ['Disc Grinder Wheel rpm Checks', 'Circular Saw Safety Retractable Guard', 'Earth Leakage Circuit Breakers (ELCB)', 'Damaged Insulation Detection', 'Safety Glasses & Ear Protection', 'Fire Watch for Sparks']
  },
  {
    id: 'CONST_SET_4',
    country: 'japan',
    sectorKey: 'construction',
    sectorName: 'Construction',
    kanji: 'クレーン合図・玉掛け・コンクリート打設試験',
    icon: '🏗️',
    setNumber: 4,
    badge: 'Crane Signals & Rigging (Tamagake)',
    title: 'Construction (Kensetsu) SSW-1 Mock Test — Set 4 (Crane Signals & Concrete Pouring)',
    titleNe: 'निर्माण क्षेत्र विशेष सीप नं. १ परीक्षा — नमुना परीक्षा सेट ४ (क्रेन इसारा, स्लिङ र कंक्रीट)',
    description: 'Testing official whistle and hand signals for cranes, wire rope sling inspection (kink/broken strands limits), rebar tying hooks, and concrete vibrator timing.',
    descriptionNe: 'क्रेन चालकलाई दिइने हातको इसारा र सिठ्ठीको संकेत, क्रेनको तार (Wire Rope) जाँच, रड बाँध्ने हुक र कंक्रीट भाइब्रेटर चलाउने नियम।',
    durationMinutes: 60,
    questionsCount: 30,
    passBenchmark: '60% (18 / 30 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/construction/exam?set=4',
    studyUrl: '/japan/work/construction',
    topics: ['Standard Crane Hand Signals', 'Whistle Signal Patterns', 'Wire Rope Discard Criteria (10% wire breaks)', 'Slop Rebar Binding (Hacker Hook)', 'Concrete Vibrator 5-15s Insertion', 'Exclusion Zones under Suspended Loads']
  },
  {
    id: 'CONST_SET_5',
    country: 'japan',
    sectorKey: 'construction',
    sectorName: 'Construction',
    kanji: '建設全国統一総合判定模擬試験',
    icon: '🏗️',
    setNumber: 5,
    badge: 'Comprehensive JAC Prometric Simulator',
    title: 'Construction (Kensetsu) SSW-1 Mock Test — Set 5 (Final Examination Simulator)',
    titleNe: 'निर्माण क्षेत्र विशेष सीप नं. १ परीक्षा — नमुना परीक्षा सेट ५ (अन्तिम परीक्षा सिमुलेटर)',
    description: 'High-difficulty mock exam simulating the official Prometric test with drawing reading questions, structural terminology, fire safety, and emergency earthquake evacuation.',
    descriptionNe: 'निर्माण नक्सा पढ्ने, जापानी प्राविधिक शब्द, आगलागी सुरक्षा र भूकम्प आउँदा सुरक्षित हुने तरिका समेटिएको अन्तिम नमुना परीक्षा।',
    durationMinutes: 60,
    questionsCount: 30,
    passBenchmark: '60% (18 / 30 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/construction/exam?set=5',
    studyUrl: '/japan/work/construction',
    topics: ['Full 30-Question Construction Exam', 'Blueprint Symbol Interpretation', 'Earthquake Evacuation Protocols', 'Subcontractor Reporting Structure', 'Workplace Heatstroke Prevention', 'Prometric CBT Score Evaluation']
  },

  // ==========================================
  // 🏨 6. HOSPITALITY & HOTEL (宿泊業) - 2 SETS
  // ==========================================
  {
    id: 'HOSPITALITY_SET_1',
    country: 'japan',
    sectorKey: 'hospitality',
    sectorName: 'Hospitality & Hotel',
    kanji: '宿泊業特定技能1号技能測定試験（フロント）',
    icon: '🏨',
    setNumber: 1,
    badge: 'Hotel Association Official Track',
    title: 'Hospitality (Shukuhaku) SSW-1 Mock Test — Set 1 (Front Desk & Keigo)',
    titleNe: 'होटेल तथा आतिथ्य सत्कार विशेष सीप परीक्षा — नमुना परीक्षा सेट १ (फ्रन्ट डेस्क र केइगो)',
    description: 'Official hospitality evaluation covering front desk check-in, guest etiquette (Keigo), passport verification, room key issuance, and polite telephone dialogue.',
    descriptionNe: 'होटेल फ्रन्ट डेस्क सेवा, पाहुनाको चेक-इन, राहदानी प्रमाणीकरण, कोठाको चाबी हस्तान्तरण र फोनमा गरिने आदरार्थी भाषा सम्बन्धी परीक्षा।',
    durationMinutes: 60,
    questionsCount: 30,
    passBenchmark: '65% (20 / 30 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/hospitality/exam?set=1',
    studyUrl: '/japan/work/hospitality',
    topics: ['Front Desk Check-in Dialogue', 'Guest Identification Verification', 'Hospitality Keigo Honorifics', 'Telephone Greeting Etiquette', 'Baggage Tag Handling', 'Room Key Delivery']
  },
  {
    id: 'HOSPITALITY_SET_2',
    country: 'japan',
    sectorKey: 'hospitality',
    sectorName: 'Hospitality & Hotel',
    kanji: '宿泊業レストラン・客室管理・避難誘導試験',
    icon: '🏨',
    setNumber: 2,
    badge: 'Banquet & Emergency Evacuation',
    title: 'Hospitality (Shukuhaku) SSW-1 Mock Test — Set 2 (Banquet & Disaster Safety)',
    titleNe: 'होटेल तथा आतिथ्य सत्कार विशेष सीप परीक्षा — नमुना परीक्षा सेट २ (भोज तथा विपद् सुरक्षा)',
    description: 'Evaluation testing breakfast buffet replenishment, tableware clearing, housekeeping room inspection standards, earthquake evacuation guidance, and guest privacy.',
    descriptionNe: 'होटेल रेस्टुरेन्ट ब्रेकफास्ट बुफे व्यवस्थापन, कोठा सफाइ चेकलिस्ट, भूकम्प तथा आगलागीमा पाहुनालाई बाहिर निकाल्ने निर्देशन सम्बन्धी परीक्षा।',
    durationMinutes: 60,
    questionsCount: 30,
    passBenchmark: '65% (20 / 30 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/hospitality/exam?set=2',
    studyUrl: '/japan/work/hospitality',
    topics: ['Banquet Table Setup', 'Buffet Hygiene Maintenance', 'Housekeeping Inspection Checkpoints', 'Earthquake Evacuation Guidance', 'Guest Data Privacy Compliance', 'Emergency Public Announcements']
  },

  // ==========================================
  // 🍱 7. FOOD MANUFACTURING (飲食料品製造業) - 2 SETS
  // ==========================================
  {
    id: 'FOOD_MFG_SET_1',
    country: 'japan',
    sectorKey: 'manufacture',
    sectorName: 'Food & Beverage Manufacturing',
    kanji: '飲食料品製造業特定技能1号技能測定試験',
    icon: '🍱',
    setNumber: 1,
    badge: 'Prometric Official Track',
    title: 'Food Manufacturing SSW-1 Mock Test — Set 1 (Sanitation & Clothing)',
    titleNe: 'खाद्य तथा पेय उत्पादन विशेष सीप परीक्षा — नमुना परीक्षा सेट १ (कारखाना पोसाक र सरसफाइ)',
    description: 'Food factory evaluation covering lint-roller air shower routines, cleanroom clothing wearing rules, conveyor belt safety, and foreign body contamination prevention.',
    descriptionNe: 'खाद्य कारखानामा एयर शावर लिने नियम, स्वच्छता पोसाक (हेयर क्याप, मास्क), कन्भेयर बेल्ट सुरक्षा र कपाल आदि खस्न नदिने उपायहरूको परीक्षा।',
    durationMinutes: 60,
    questionsCount: 30,
    passBenchmark: '65% (20 / 30 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/manufacture/exam?set=1',
    studyUrl: '/japan/work',
    topics: ['Air Shower & Sticky Roller Routine', 'Sanitary Uniform Wearing Order', 'Conveyor Belt Jam Emergency Stop', 'Foreign Body Prevention (Hair, Bugs)', 'Hand Scrubbing Step 7', 'Jewelry & Nail Polish Ban']
  },
  {
    id: 'FOOD_MFG_SET_2',
    country: 'japan',
    sectorKey: 'manufacture',
    sectorName: 'Food & Beverage Manufacturing',
    kanji: '金属検出機・品質検査・包装表示管理試験',
    icon: '🍱',
    setNumber: 2,
    badge: 'Metal Detector & Quality Control',
    title: 'Food Manufacturing SSW-1 Mock Test — Set 2 (Metal Detection & Packaging)',
    titleNe: 'खाद्य तथा पेय उत्पादन विशेष सीप परीक्षा — नमुना परीक्षा सेट २ (धातु पत्ता लगाउने मेशिन र प्याकेजिङ)',
    description: 'Factory test covering metal detector test piece calibration (Fe/SUS), packaging seal defect detection, expiry date printing validation, and cold storage monitoring.',
    descriptionNe: 'मेटल डिटेक्टर जाँच गर्ने टेस्ट पिस, प्याकेजिङमा हावा छिर्न नदिने सिलिङ, म्याद सकिने मिति (Expiry Date) जाँच र चिसो भण्डारण तापक्रम।',
    durationMinutes: 60,
    questionsCount: 30,
    passBenchmark: '65% (20 / 30 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/manufacture/exam?set=2',
    studyUrl: '/japan/work',
    topics: ['Metal Detector Fe/SUS Calibration', 'X-Ray Machine Basics', 'Packaging Heat-Seal Integrity', 'Expiry & Production Lot Verification', 'Finished Product Weight Checks', 'Cold Chain Transport Rules']
  },

  // ==========================================
  // 🚗 8. AUTOMOBILE REPAIR (自動車整備) - 2 SETS
  // ==========================================
  {
    id: 'AUTO_SET_1',
    country: 'japan',
    sectorKey: 'automobile',
    sectorName: 'Automobile Repair',
    kanji: '自動車整備分野特定技能1号評価試験',
    icon: '🚗',
    setNumber: 1,
    badge: 'JASPA Prometric Official Track',
    title: 'Automobile Maintenance SSW-1 Mock Test — Set 1 (Basic Service & Inspection)',
    titleNe: 'अटोमोबाइल मर्मत विशेष सीप नं. १ मूल्याङ्कन परीक्षा — नमुना परीक्षा सेट १ (दैनिक सर्भिसिङ र जाँच)',
    description: 'Automobile repair evaluation covering engine oil level & viscosity checks, brake pad thickness measurements, tire tread depth gauges, and battery voltage testing.',
    descriptionNe: 'इन्जिन आयलको मात्रा र गुणस्तर, ब्रेक प्याडको मोटाइ (mm), टायरको ग्रिप गहिराइ र ब्याट्री भोल्टेज जाँच सम्बन्धी ६० मिनेटको परीक्षा।',
    durationMinutes: 60,
    questionsCount: 30,
    passBenchmark: '60% (18 / 30 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/automobile/exam?set=1',
    studyUrl: '/japan/work',
    topics: ['Engine Oil Dipstick & Viscosity', 'Brake Pad Vernier Measurement', 'Tire Pressure & Tread Depth Limit (1.6mm)', 'Battery Specific Gravity', 'Hydraulic Lift Mechanical Locks', 'Safety Goggles for Underbody']
  },
  {
    id: 'AUTO_SET_2',
    country: 'japan',
    sectorKey: 'automobile',
    sectorName: 'Automobile Repair',
    kanji: 'トルクレンチ・ブレーキフルード・下回り点検試験',
    icon: '🚗',
    setNumber: 2,
    badge: 'Torque Wrench & Chassis Safety',
    title: 'Automobile Maintenance SSW-1 Mock Test — Set 2 (Torque Wrench & Brake Fluid)',
    titleNe: 'अटोमोबाइल मर्मत विशेष सीप नं. १ मूल्याङ्कन परीक्षा — नमुना परीक्षा सेट २ (टर्क रेन्च र ब्रेक फ्लुइड)',
    description: 'Specialized test on torque wrench calibration and star-pattern wheel nut tightening, brake fluid DOT3/DOT4 boiling points, coolant leaks, and exhaust emission safety.',
    descriptionNe: 'टर्क रेन्चले नट कसिने मानक बल, पाङ्ग्राका नटहरू तारा आकारमा कस्ने नियम, ब्रेक आयल र कुलेन्ट चुहावट जाँच सम्बन्धी परीक्षा।',
    durationMinutes: 60,
    questionsCount: 30,
    passBenchmark: '60% (18 / 30 Correct)',
    formatType: 'Official Prometric CBT',
    isFullTestReady: true,
    examUrl: '/japan/work/automobile/exam?set=2',
    studyUrl: '/japan/work',
    topics: ['Torque Wrench Setting (N·m)', 'Wheel Nut Star-Pattern Tightening', 'Brake Fluid Bleeding Air', 'Coolant Pressure Cap Safety', 'Suspension Bushing Play', 'Carbon Monoxide Exhaust Ventilation']
  },

  // ==========================================
  // 🇰🇷 KOREA EPS SKILL TESTS (STRICTLY KOREA)
  // ==========================================
  {
    id: 'KOREA_EPS_SKILLS_STAGE2',
    country: 'korea',
    sectorKey: 'korea_general',
    sectorName: 'EPS Skill & Competency (기능시험)',
    kanji: 'EPS-TOPIK 제2차 기능시험・직무능력평가 종합',
    icon: '🇰🇷',
    setNumber: 1,
    badge: 'HRD Korea Official Stage 2 Track',
    title: 'EPS-TOPIK Official 2nd Stage Skill & Competency Evaluation (기능시험 종합)',
    titleNe: 'ईपीएस-टोपिक दोस्रो चरणको सीप परीक्षण तथा क्षमता मूल्याङ्कन (EPS Skill Test)',
    description: 'Official HRD Korea 2nd round skill evaluation combining physical fitness (dynamometer grip strength, back lift, color blindness), basic dexterity tests (pin pegboard & bolt assembly), and oral viva interview.',
    descriptionNe: 'शारीरिक तन्दुरुस्ती (हातको शक्ति, ढाडको बल, कलर भिजन), पिन बोर्ड, नट-बोल्ट जोड्ने गति र कोरियन भाषामा मौखिक अन्तर्वार्ताको पूर्ण नमुना अभ्यास।',
    durationMinutes: 30,
    questionsCount: 25,
    passBenchmark: '110 / 200 Total Points',
    formatType: 'HRD Korea EPS Skill Test',
    isFullTestReady: true,
    examUrl: '/korea/work',
    studyUrl: '/korea/work',
    topics: ['Grip Strength (악력)', 'Back Strength (배근력)', 'Color Blindness (색각검사)', 'Pin Pegboard Test', 'Nut & Bolt Fastening', 'Korean Oral Interview']
  },
  {
    id: 'KOREA_EPS_MANUFACTURING',
    country: 'korea',
    sectorKey: 'korea_manufacturing',
    sectorName: 'Manufacturing Skills (제조업)',
    kanji: '제조업 기능평가 (공구 식별・치수측정・부품조립)',
    icon: '🏭',
    setNumber: 1,
    badge: 'EPS Manufacturing • E-9 Track',
    title: 'EPS Manufacturing Vocational Skill Test (Caliper, Assembly & Tools)',
    titleNe: 'उत्पादन क्षेत्र (म्यानुफ्याक्चरिङ) सीप परीक्षण: भर्नियर क्यालिपर, औजार र एसेम्ब्ली',
    description: 'Factory competency evaluation covering Vernier caliper measurement (mm), bolt/nut assembly speed, mechanical hand tool identification (spanner, wrench, pliers), and factory safety gear.',
    descriptionNe: 'भर्नियर क्यालिपरबाट नाप लिने, नट-बोल्ट जोड्ने, कारखानाका औजार चिन्ने र सुरक्षा नियम पालना गर्ने परीक्षा।',
    durationMinutes: 20,
    questionsCount: 20,
    passBenchmark: 'Pass / Fail Benchmark',
    formatType: 'Vocational Competency Drill',
    isFullTestReady: true,
    examUrl: '/korea/work',
    studyUrl: '/korea/work',
    topics: ['Vernier Caliper Measurement', 'Spanner, Wrench & Plier ID', 'Nut-Bolt Fastening Speed', 'Safety Shoes & Earplugs', 'Work Hazard Symbols']
  },
  {
    id: 'KOREA_EPS_AGRICULTURE',
    country: 'korea',
    sectorKey: 'korea_agriculture',
    sectorName: 'Agriculture & Livestock (농축산업)',
    kanji: '농축산업 기능평가 (농기구・작물선별・비닐하우스)',
    icon: '🍏',
    setNumber: 1,
    badge: 'EPS Agriculture • E-9 Track',
    title: 'EPS Agriculture & Livestock Skill Test (Tools, Sorting & Crop Handling)',
    titleNe: 'कृषि तथा पशुपालन सीप परीक्षण: कृषि औजार, फलफूल ग्रेडिङ र ग्रीनहाउस',
    description: 'Farm competency evaluation covering agricultural hand tool identification (hoe, sickle, pruning shears), crop sorting & grading, fertilizer packaging, and greenhouse safety.',
    descriptionNe: 'कुटो, कोदालो, हँसिया र काँटछाँट गर्ने कैंची चिन्ने, फलफूल ग्रेडिङ गर्ने र ग्रीनहाउस सुरक्षा सम्बन्धी सीप परीक्षण।',
    durationMinutes: 20,
    questionsCount: 15,
    passBenchmark: 'Pass / Fail Benchmark',
    formatType: 'Vocational Competency Drill',
    isFullTestReady: true,
    examUrl: '/korea/work',
    studyUrl: '/korea/work',
    topics: ['Farm Tool ID (Sickle, Hoe, Shears)', 'Produce Grading Standards', 'Fertilizer Bag Handling', 'Greenhouse Ventilation Safety', 'Livestock Feed Distribution']
  },
  {
    id: 'KOREA_EPS_CONSTRUCTION',
    country: 'korea',
    sectorKey: 'korea_construction',
    sectorName: 'Construction Skills (건설업)',
    kanji: '건설업 기능평가 (철근결속・줄자측정・안전그네)',
    icon: '🏗️',
    setNumber: 1,
    badge: 'EPS Construction • E-9 Track',
    title: 'EPS Construction Skill Test (Rebar Tying, Measuring Tape & Harness)',
    titleNe: 'निर्माण क्षेत्र सीप परीक्षण: रड बाँध्ने (Rebar Tying), टेप नाप्ने र सुरक्षा बेल्ट',
    description: 'Construction site competency test covering rebar binding wire tie with hook, steel tape measurement precision, scaffold clamp assembly, and safety harness wearing protocol.',
    descriptionNe: 'हुकले रड बाँध्ने कला, इन्च र सेन्टिमिटर टेप नाप्ने, पाइप क्ल्याम्प जोड्ने र सुरक्षा हार्नेस लगाउने सीप परीक्षा।',
    durationMinutes: 20,
    questionsCount: 15,
    passBenchmark: 'Pass / Fail Benchmark',
    formatType: 'Vocational Competency Drill',
    isFullTestReady: true,
    examUrl: '/korea/work',
    studyUrl: '/korea/work',
    topics: ['Rebar Hook Tying', 'Measuring Tape Precision', 'Scaffold Clamp Fitting', 'Safety Harness Protocol', 'Crane Hand Signals']
  },
  {
    id: 'KOREA_EPS_ORAL_INTERVIEW',
    country: 'korea',
    sectorKey: 'korea_oral',
    sectorName: 'Oral Interview & Commands (구술)',
    kanji: '한국어 구술시험 (자기소개・작업지시 동작・안전수칙)',
    icon: '🗣️',
    setNumber: 1,
    badge: 'EPS Oral Viva • 100% Real Evaluation',
    title: 'EPS Korean Oral Interview & Workplace Action Commands Test (구술시험)',
    titleNe: 'कोरियन मौखिक अन्तर्वार्ता (भावा) र कार्यस्थल निर्देशन परीक्षा',
    description: 'Face-to-face Korean spoken evaluation covering self-introduction (자기소개), physical directional reaction commands (앞으로 가세요, 오른손 드세요), tool picture flashcard naming, and emergency responses.',
    descriptionNe: 'परीक्षकसँग प्रत्यक्ष कोरियनमा आत्मपरिचय दिने, हात उठाउने/खुम्च्याउने जस्ता शारीरिक निर्देशन सुन्ने र चित्र हेरेर औजारको नाम भन्ने परीक्षा।',
    durationMinutes: 15,
    questionsCount: 20,
    passBenchmark: 'Oral Evaluation Score',
    formatType: 'Spoken Interview Simulation',
    isFullTestReady: true,
    examUrl: '/korea/work',
    studyUrl: '/korea/work',
    topics: ['Self-Introduction (자기소개)', 'Directional Body Commands', 'Work Tool Identification Cards', 'Emergency Safety Phrases', 'Pronunciation & Politeness']
  }
];

interface ClientProps {
  country?: string;
  initialSector?: string;
}

function SkillsExamDirectoryInner({ country = 'japan', initialSector }: ClientProps) {
  const isJapan = country === 'japan';
  const targetCountry = isJapan ? 'japan' : 'korea';

  const searchParams = useSearchParams();
  const paramSector = searchParams?.get('sector');

  const [selectedSector, setSelectedSector] = useState<string>(() => {
    return paramSector || initialSector || 'ALL';
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [confirmExam, setConfirmExam] = useState<SkillExamItem | null>(null);

  // Sync state if URL query param changes
  useEffect(() => {
    if (paramSector) {
      setSelectedSector(paramSector);
    }
  }, [paramSector]);

  // Sector list with set counts
  const sectorsList = useMemo(() => {
    const list = [
      { id: 'ALL', label: isJapan ? 'All SSW Mock Tests' : 'All EPS Tests', icon: '🌐', count: isJapan ? 29 : 5 }
    ];

    if (isJapan) {
      list.push(
        { id: 'building-cleaning', label: 'Building Cleaning', icon: '🧹', count: 5 },
        { id: 'nursing', label: 'Caregiving (Kaigo)', icon: '🏥', count: 5 },
        { id: 'food-service', label: 'Food Service', icon: '🍽️', count: 5 },
        { id: 'agriculture', label: 'Agriculture', icon: '🌾', count: 5 },
        { id: 'construction', label: 'Construction', icon: '🏗️', count: 5 },
        { id: 'hospitality', label: 'Hospitality & Hotel', icon: '🏨', count: 2 },
        { id: 'manufacture', label: 'Food Manufacturing', icon: '🍱', count: 2 },
        { id: 'automobile', label: 'Automobile Repair', icon: '🚗', count: 2 },
      );
    } else {
      list.push(
        { id: 'korea_general', label: 'EPS 2nd Stage Comprehensive', icon: '🇰🇷', count: 1 },
        { id: 'korea_manufacturing', label: 'Manufacturing Skills', icon: '🏭', count: 1 },
        { id: 'korea_agriculture', label: 'Agriculture Skills', icon: '🍏', count: 1 },
        { id: 'korea_construction', label: 'Construction Skills', icon: '🏗️', count: 1 },
        { id: 'korea_oral', label: 'Oral Interview & Commands', icon: '🗣️', count: 1 },
      );
    }

    return list;
  }, [isJapan]);

  // Strictly filter exams by active country and sector
  const filteredExams = useMemo(() => {
    return SKILL_EXAMS_CATALOG.filter((item) => {
      if (item.country !== targetCountry) {
        return false;
      }
      if (selectedSector !== 'ALL' && item.sectorKey !== selectedSector) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.sectorName.toLowerCase().includes(query);
        const matchesKanji = item.kanji.toLowerCase().includes(query);
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesNe = item.titleNe.toLowerCase().includes(query);
        const matchesBadge = item.badge.toLowerCase().includes(query);
        const matchesTopic = item.topics.some((t) => t.toLowerCase().includes(query));
        const matchesSet = `set ${item.setNumber}`.includes(query) || `set${item.setNumber}`.includes(query);
        if (!matchesName && !matchesKanji && !matchesTitle && !matchesNe && !matchesBadge && !matchesTopic && !matchesSet) {
          return false;
        }
      }
      return true;
    });
  }, [targetCountry, selectedSector, searchQuery]);

  const activeSectorMeta = useMemo(() => {
    if (selectedSector === 'ALL') return null;
    return sectorsList.find(s => s.id === selectedSector);
  }, [selectedSector, sectorsList]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 font-sans">
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <Link
            href={`/${targetCountry}/exams`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-600" />
            <span>Back to All Mock Tests ({isJapan ? 'JLPT, JFT, SSW' : 'EPS-TOPIK, Skills'})</span>
          </Link>
          <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase">
            {isJapan ? 'Prometric SSW-1 Mock Test Hub' : 'HRD Korea EPS Stage 2 Official Track'}
          </span>
        </div>

        {/* Hero Banner — Pure Mock Test Hub */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-300 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl sm:text-5xl p-3 bg-white rounded-2xl border border-emerald-200 shadow-xs">
              📝
            </span>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
                {isJapan ? 'Japan SSW-1 Skills • 特定技能1号評価試験' : 'Korea EPS Skills • 기능시험・직무능력평가'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                {isJapan 
                  ? 'SSW Skills CBT Mock Exams Directory' 
                  : 'Korea EPS Skills Evaluation Mock Tests'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-0.5">
                {isJapan 
                  ? 'प्रत्येक क्षेत्रका ५ वटा आधिकारिक कम्प्युटर नमुना परीक्षाहरू (Prometric CBT Simulators)' 
                  : 'कोरिया ईपीएस प्राविधिक मूल्याङ्कन तथा मौखिक अन्तर्वार्ता नमुना परीक्षाहरू'}
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-4xl">
            {isJapan 
              ? 'Complete computerized CBT mock exam sets across all SSW sectors. Each sector features multiple official test sets (Building Cleaning, Caregiving Kaigo, Food Service, Agriculture, Construction — up to 5 full test sets each) with authentic time limits, 60% pass benchmarks, full Furigana on Kanji, equipment diagrams, and bilingual Nepali explanations.'
              : 'Official HRD Korea 2nd round skill evaluation and oral viva simulation tests featuring grip strength, pegboard dexterity, hand tool identification, and spoken Korean commands.'
            }
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>{isJapan ? 'Official 60–80 Min Timers' : 'Official 15–30 Min Evaluation'}</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
              <Award className="w-4 h-4 text-amber-600" />
              <span>{isJapan ? '60% Passing Benchmark' : '110 / 200 Score Benchmark'}</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>{isJapan ? 'Multiple Mock Sets per Sector (Up to 5 Sets)' : 'Real Oral Viva Audio & Tools'}</span>
            </div>
          </div>
        </div>

        {/* Sector Filter Bar & Search */}
        <div className="space-y-3">
          <div className="flex flex-col gap-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-xs">
            {/* Filter Header with Active State */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
                  Filter by Sector:
                </span>
                {activeSectorMeta && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-black">
                    <span>{activeSectorMeta.icon}</span>
                    <span>{activeSectorMeta.label} ({activeSectorMeta.count} Sets)</span>
                  </span>
                )}
              </div>

              {selectedSector !== 'ALL' && (
                <button
                  onClick={() => setSelectedSector('ALL')}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Show All Sectors ({sectorsList[0].count} Sets)</span>
                </button>
              )}
            </div>

            {/* Sector Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {sectorsList.map((sec) => {
                const isSelected = selectedSector === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setSelectedSector(sec.id)}
                    className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer shrink-0 ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-md font-black ring-2 ring-slate-900/20'
                        : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{sec.icon}</span>
                    <span>{sec.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {sec.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full pt-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Search mock tests by topic, sector, Kanji, or Set (e.g., Set 1, Building Cleaning, Kaigo, HACCP)...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Count Summary & View Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1 text-xs text-slate-500 font-bold">
          <div className="flex items-center gap-2">
            <span>Showing {filteredExams.length} Mock Exam Sets</span>
            {selectedSector !== 'ALL' && (
              <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md text-[11px]">
                {activeSectorMeta?.label}
              </span>
            )}
          </div>

          {/* View Mode Toggle: List View vs Card View */}
          <div className="flex items-center rounded-2xl bg-white border border-slate-200 p-1 shadow-xs self-start sm:self-auto">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-slate-900 text-white shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              title="View as Systematic List"
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>List View</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-slate-900 text-white shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              title="View as Cards"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Card View</span>
            </button>
          </div>
        </div>

        {/* 1. TRUE SYSTEMATIC LIST VIEW (Compact Data-Density Rows) */}
        {viewMode === 'list' ? (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            {/* Table / List Header Bar (Desktop) */}
            <div className="hidden lg:grid grid-cols-12 gap-3 px-5 py-3 bg-slate-50/90 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500 items-center">
              <div className="col-span-2">Set & Sector</div>
              <div className="col-span-5">Mock Exam Details & Key Topics</div>
              <div className="col-span-3 text-center">Specifications</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {/* List Rows */}
            <div className="divide-y divide-slate-100">
              {filteredExams.map((exam) => (
                <div
                  key={exam.id}
                  className="p-3 sm:px-5 sm:py-3.5 hover:bg-slate-50/80 transition-colors flex flex-col lg:grid lg:grid-cols-12 lg:gap-3 lg:items-center group"
                >
                  {/* Col 1: Set & Sector (Col-span 2) */}
                  <div className="lg:col-span-2 flex items-center gap-2.5 mb-2 lg:mb-0">
                    <span className="text-2xl p-2 rounded-xl bg-slate-100/80 border border-slate-200/80 shrink-0">
                      {exam.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                          SET {exam.setNumber}
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 text-[9px] font-bold border border-emerald-200">
                          CBT
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-800 block truncate mt-1">
                        {exam.sectorName}
                      </span>
                    </div>
                  </div>

                  {/* Col 2: Test Details & Topics (Col-span 5) */}
                  <div className="lg:col-span-5 min-w-0 pr-2 space-y-1">
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                      {exam.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 flex-wrap">
                      <span className="font-semibold text-slate-600 truncate max-w-xs">{exam.kanji}</span>
                      <span className="text-slate-300 hidden sm:inline">•</span>
                      <span className="font-semibold text-indigo-900 line-clamp-1">🇳🇵 {exam.titleNe}</span>
                    </div>
                    {/* Compact inline topic chips */}
                    <div className="flex flex-wrap items-center gap-1 pt-0.5">
                      {exam.topics.slice(0, 3).map((topic, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium">
                          {topic}
                        </span>
                      ))}
                      {exam.topics.length > 3 && (
                        <span className="text-[10px] text-slate-400 font-bold">
                          +{exam.topics.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Col 3: Specs Chips (Col-span 3) */}
                  <div className="lg:col-span-3 flex items-center justify-start lg:justify-center gap-2 my-2 lg:my-0 text-xs">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px] whitespace-nowrap">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {exam.durationMinutes}m
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px] whitespace-nowrap">
                      {exam.questionsCount} Qs
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200/60 font-black text-[11px] whitespace-nowrap">
                      {exam.passBenchmark.split(' ')[0]}
                    </span>
                  </div>

                  {/* Col 4: Action Buttons (Col-span 2) */}
                  <div className="lg:col-span-2 flex items-center justify-end gap-2 mt-2 lg:mt-0">
                    <button
                      onClick={() => setConfirmExam(exam)}
                      className="py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-black text-xs transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>Start CBT →</span>
                    </button>
                    <Link
                      href={exam.studyUrl}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all flex items-center justify-center cursor-pointer"
                      title="Open Sector Study Hub"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* 2. CARD / GRID VIEW RENDERING */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {filteredExams.map((exam) => (
              <div
                key={exam.id}
                className={`rounded-3xl border bg-white p-6 shadow-xs flex flex-col justify-between space-y-4 transition-all hover:shadow-md ${
                  exam.isFullTestReady
                    ? 'border-emerald-300 ring-1 ring-emerald-500/20'
                    : 'border-slate-200'
                }`}
              >
                <div className="space-y-3">
                  {/* Card Header: Sector Icon + Set Badge + Status */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                        {exam.icon}
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {/* SET NUMBER BADGE */}
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-black uppercase tracking-wider shadow-xs">
                            SET {exam.setNumber}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                            {exam.sectorName}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-medium hidden sm:inline">
                            {exam.badge}
                          </span>
                        </div>
                        <h2 className="text-base font-black text-slate-900 mt-1">
                          {exam.title}
                        </h2>
                        <p className="text-[11px] font-bold text-slate-500 truncate max-w-xs">
                          {exam.kanji}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow-xs flex items-center gap-1">
                        <Play className="w-3 h-3 fill-white" />
                        CBT Ready
                      </span>
                    </div>
                  </div>

                  {/* Nepali Title */}
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-indigo-900">
                      🇳🇵 {exam.titleNe}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed pt-0.5">
                      {exam.description}
                    </p>
                  </div>

                  {/* Specs Box: Duration, Questions, Pass benchmark */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Duration</span>
                      <strong className="text-slate-900 font-black">{exam.durationMinutes} Mins</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Questions</span>
                      <strong className="text-slate-900 font-black">{exam.questionsCount} Qs</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Benchmark</span>
                      <strong className="text-amber-700 font-black truncate block">{exam.passBenchmark}</strong>
                    </div>
                  </div>

                  {/* Topic Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exam.topics.slice(0, 4).map((topic, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold"
                      >
                        {topic}
                      </span>
                    ))}
                    {exam.topics.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-400 text-[10px] font-bold">
                        +{exam.topics.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Section: Primary is Mock Exam, Secondary is Sector Study Hub */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <button
                    onClick={() => setConfirmExam(exam)}
                    className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-black text-xs transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 cursor-pointer text-center group/exam"
                  >
                    <Play className="w-4 h-4 fill-white shrink-0 group-hover/exam:scale-110 transition-transform" />
                    <span>Start CBT Mock Exam — Set {exam.setNumber} →</span>
                  </button>

                  <div className="flex items-center justify-between px-1 text-[11px]">
                    <span className="text-slate-400 font-medium">Need to review curriculum first?</span>
                    <Link
                      href={exam.studyUrl}
                      className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
                    >
                      <span>Sector Study Hub</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredExams.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <span className="text-4xl">🔍</span>
            <h3 className="text-base font-bold text-slate-800">No mock exam sets match your criteria</h3>
            <p className="text-xs text-slate-500">Try clearing the search query or selecting "All SSW Mock Tests".</p>
            <button
              onClick={() => { setSelectedSector('ALL'); setSearchQuery(''); }}
              className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ── PRE-EXAM CONFIRMATION MODAL ── */}
        {confirmExam && (
          <div className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in min-h-screen min-h-[100dvh]">
            <div className="w-full max-w-lg bg-white text-slate-900 border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 my-auto mx-auto shrink-0 font-sans">
              
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 text-2xl shrink-0">
                    {confirmExam.icon}
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px]">SET {confirmExam.setNumber}</span>
                      <span>•</span>
                      <span className="text-slate-500">{confirmExam.sectorName}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug mt-0.5">{confirmExam.title}</h3>
                    <p className="text-xs text-slate-500 font-bold">{confirmExam.kanji}</p>
                  </div>
                </div>
                <button
                  onClick={() => setConfirmExam(null)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-rose-600 text-slate-500 hover:text-white transition-all cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Test Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                  <span className="text-[10px] font-black uppercase text-slate-400 block">Duration</span>
                  <span className="font-black text-slate-900 text-sm">{confirmExam.durationMinutes} Mins</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                  <span className="text-[10px] font-black uppercase text-slate-400 block">Questions</span>
                  <span className="font-black text-slate-900 text-sm">{confirmExam.questionsCount} Qs</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                  <span className="text-[10px] font-black uppercase text-slate-400 block">Pass Target</span>
                  <span className="font-black text-emerald-700 text-xs">{confirmExam.passBenchmark}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                  <span className="text-[10px] font-black uppercase text-slate-400 block">Format</span>
                  <span className="font-black text-slate-900 text-xs">{confirmExam.formatType}</span>
                </div>
              </div>

              {/* Exam Rules & Instructions */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 space-y-2">
                <div className="font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <span>⚠️ Important Examination Instructions (परीक्षा निर्देशन)</span>
                </div>
                <ul className="space-y-1.5 text-slate-800 font-medium pl-1 list-disc list-inside">
                  <li>The <strong>{confirmExam.durationMinutes}-minute countdown timer</strong> begins immediately upon clicking <strong>Begin CBT Exam Now</strong>.</li>
                  <li>All Kanji questions feature full Furigana (Hiragana/Katakana) and optional Nepali translations.</li>
                  <li>Exiting before submission will ask for confirmation and unsaved progress will be discarded.</li>
                  <li>Auto-grading scorecards and category breakdown are generated upon submission.</li>
                </ul>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setConfirmExam(null)}
                  className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-colors cursor-pointer border border-slate-200 text-center"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const url = confirmExam.examUrl;
                    setConfirmExam(null);
                    window.location.href = url;
                  }}
                  className="flex-1 py-3 rounded-xl font-black text-xs text-white bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Begin CBT Exam Now</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default function SkillsExamDirectoryClient(props: ClientProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-200 text-center space-y-2">
          <span className="text-3xl animate-spin">⏳</span>
          <p className="text-xs font-bold text-slate-600">Loading SSW Mock Tests Directory...</p>
        </div>
      </div>
    }>
      <SkillsExamDirectoryInner {...props} />
    </Suspense>
  );
}
