import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Flag,
  CheckCircle2,
  Volume2,
  Award,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Layers,
  HelpCircle,
  Check,
  X,
  Maximize2,
  Minimize2,
  ListFilter,
  Filter,
  Sparkles,
  BookOpen,
  Play,
  ArrowLeft,
  FileText,
  Headphones,
  RotateCcw,
  BarChart3,
  CheckSquare,
  AlertTriangle,
  Globe,
  LayoutList,
  LayoutGrid,
  ShoppingBag,
  Lock,
  Unlock,
  KeyRound,
  CreditCard,
  Tag
} from 'lucide-react';
import { validateExamSubmission } from '@/lib/auth-security';

export interface ExamQuestion {
  id: string;
  level: string; // N5, N4, N3, N2 | EPS, TOPIK2, TOPIK3, TOPIK4
  mockSet?: string; // 'N5_SET_1' | 'N5_SET_2' | 'N4_SET_1' | etc.
  type: 'MULTIPLE_CHOICE' | 'LISTENING' | 'FILL_BLANK';
  prompt: string;
  audioUrl?: string;
  audioScript?: string; // Japanese TTS script for Web Speech API
  reading?: string;    // Furigana reading for kanji questions
  passage?: string;    // Passage text for reading comprehension questions
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface MockTestInfo {
  id: string;
  mockSet: string;
  level: string;
  language: 'JAPANESE' | 'KOREAN';
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  isPremium?: boolean;
  price?: string;
  title: string;
  japaneseTitle?: string;
  description: string;
  timeLimitMinutes: number;
  questionCount: number;
  sections: string[];
  audioCount: number;
  badgeColor: string;
  examFormat: 'JLPT_PAPER' | 'JFT_CBT' | 'EPS_CBT';
}

const MOCK_TEST_CATALOG: MockTestInfo[] = [
  {
    id: 'n5-mock-1',
    mockSet: 'N5_SET_1',
    level: 'N5',
    language: 'JAPANESE',
    difficulty: 'EASY',
    isPremium: false,
    price: 'Free',
    examFormat: 'JLPT_PAPER',
    title: 'JLPT N5 | Mock Test - 1 (Kana Only)',
    japaneseTitle: 'JLPT N5 公式模擬試験 第1集 【かんじ なし・ひらがな】',
    description: 'Beginner N5 paper written in 100% pure Kana (Hiragana & Katakana, NO Kanji in questions). Covers essential N5 greetings, vocabulary, and basic particles.',
    timeLimitMinutes: 30,
    questionCount: 15,
    sections: ['文字・語彙 (Kana Vocab)', '文法 (Basic Grammar)', '会話・聴解 (Kana Dialogue)'],
    audioCount: 2,
    badgeColor: 'from-emerald-600 to-teal-600',
  },
  {
    id: 'n5-mock-2',
    mockSet: 'N5_SET_2',
    level: 'N5',
    language: 'JAPANESE',
    difficulty: 'EASY',
    isPremium: false,
    price: 'Free',
    examFormat: 'JLPT_PAPER',
    title: 'JLPT N5 | Mock Test - 2 (Kana Only)',
    japaneseTitle: 'JLPT N5 公式模擬試験 第2集 【かんじ なし・ひらがな】',
    description: 'Second beginner N5 paper in 100% pure Kana (NO Kanji in questions). Practice verb te-form, time expressions (~に), and basic reading.',
    timeLimitMinutes: 30,
    questionCount: 15,
    sections: ['文字・語彙 (Kana Vocab)', '文法 (Basic Grammar)', '会話・読解 (Kana Reading)'],
    audioCount: 2,
    badgeColor: 'from-emerald-600 to-teal-600',
  },
  {
    id: 'n5-mock-3',
    mockSet: 'N5_SET_3',
    level: 'N5',
    language: 'JAPANESE',
    difficulty: 'MEDIUM',
    isPremium: true,
    price: 'NPR 250',
    examFormat: 'JLPT_PAPER',
    title: 'JLPT N5 | Mock Test - 3 (Medium)',
    japaneseTitle: 'JLPT N5 公式模擬試験 第3集 【漢字・ふりがな】',
    description: 'Standard N5 paper featuring basic N5 Kanji (山, 川, 日, 人) with furigana reading notes, sentence ordering (★), and reading notices.',
    timeLimitMinutes: 45,
    questionCount: 10,
    sections: ['文字・語彙 (Vocab & Kanji)', '文法・読解 (Grammar & Reading)'],
    audioCount: 0,
    badgeColor: 'from-amber-600 to-orange-600',
  },
  {
    id: 'n5-mock-4',
    mockSet: 'N5_SET_4',
    level: 'N5',
    language: 'JAPANESE',
    difficulty: 'HARD',
    isPremium: true,
    price: 'NPR 350',
    examFormat: 'JLPT_PAPER',
    title: 'JLPT N5 | Mock Test - 4 (Hard)',
    japaneseTitle: 'JLPT N5 公式模擬試験 第4集 【本試験レベル】',
    description: 'Full official JLPT N5 exam paper covering advanced N5 expressions, reading comprehension, and official test difficulty.',
    timeLimitMinutes: 45,
    questionCount: 5,
    sections: ['文字・語彙 (Vocab & Kanji)', '文法・読解 (Grammar & Reading)'],
    audioCount: 0,
    badgeColor: 'from-rose-600 to-pink-600',
  },
  {
    id: 'jft-easy-1',
    mockSet: 'JFT_EASY_1',
    level: 'JFT',
    language: 'JAPANESE',
    difficulty: 'EASY',
    isPremium: false,
    price: 'Free',
    examFormat: 'JFT_CBT',
    title: 'JFT-Basic Easy | Mock Test (A2 Level)',
    japaneseTitle: 'JFT-Basic スタイル 模擬試験 【かんたんレベル A2】',
    description: 'A2-level JFT-Basic style test with 28 questions (18 Reading + 10 Listening). Vocabulary is kana-only. Basic kanji appear with furigana in Kanji Recognition and Reading parts. Listening sections use native Japanese TTS audio.',
    timeLimitMinutes: 60,
    questionCount: 28,
    sections: ['語彙 (Vocabulary — kana only)', '漢字認識 (Kanji Recognition + furigana)', '読解 (Short Passages)', '聴解 クイック (Listening Quick Response)', '聴解 理解 (Listening Comprehension)'],
    audioCount: 10,
    badgeColor: 'from-emerald-500 to-cyan-600',
  },
  {
    id: 'jft-cbt-1',
    mockSet: 'JFT_SET_1',
    level: 'JFT',
    language: 'JAPANESE',
    difficulty: 'EASY',
    isPremium: false,
    price: 'Free',
    examFormat: 'JFT_CBT',
    title: 'JFT-Basic 250 | Mock Test - 1',
    japaneseTitle: 'JFT-Basic 国際交流基金日本語基礎テスト 第1集 (50問)',
    description: 'Official Japan Foundation Computer-Based Test for SSW Visa (CEFR A2). 4 Section-locked parts (Script & Vocab 12Q, Conversation 12Q, Listening 12Q, Reading 14Q). 250 Marks Scale with 200/250 passing benchmark.',
    timeLimitMinutes: 60,
    questionCount: 50,
    sections: ['文字・語彙 (Script & Vocab)', '会話・表現 (Conversation)', '聴解 (Listening)', '読解 (Reading)'],
    audioCount: 12,
    badgeColor: 'from-cyan-600 to-blue-600',
  },
  {
    id: 'jft-cbt-2',
    mockSet: 'JFT_SET_2',
    level: 'JFT',
    language: 'JAPANESE',
    difficulty: 'MEDIUM',
    isPremium: false,
    price: 'Free',
    examFormat: 'JFT_CBT',
    title: 'JFT-Basic 250 | Mock Test - 2',
    japaneseTitle: 'JFT-Basic 国際交流基金日本語基礎テスト 第2集 (48問)',
    description: 'Complete 48-question JFT-Basic CBT exam pattern (Script & Vocab 12Q, Conversation 12Q, Listening 12Q, Reading 12Q). 250 Marks Scale with 200/250 passing benchmark.',
    timeLimitMinutes: 60,
    questionCount: 48,
    sections: ['文字・語彙 (Script & Vocab)', '会話・表現 (Conversation)', '聴解 (Listening)', '読解 (Reading)'],
    audioCount: 12,
    badgeColor: 'from-cyan-600 to-blue-600',
  },
  {
    id: 'jft-cbt-3',
    mockSet: 'JFT_SET_3',
    level: 'JFT',
    language: 'JAPANESE',
    difficulty: 'MEDIUM',
    isPremium: true,
    price: 'NPR 300',
    examFormat: 'JFT_CBT',
    title: 'JFT-Basic 250 | Mock Test - 3',
    japaneseTitle: 'JFT-Basic 国際交流基金日本語基礎テスト 第3集 (48問)',
    description: 'Complete 48-question JFT-Basic CBT exam pattern (Script & Vocab 12Q, Conversation 12Q, Listening 12Q, Reading 12Q). 250 Marks Scale with 200/250 passing benchmark.',
    timeLimitMinutes: 60,
    questionCount: 48,
    sections: ['文字・語彙 (Script & Vocab)', '会話・表現 (Conversation)', '聴解 (Listening)', '読解 (Reading)'],
    audioCount: 12,
    badgeColor: 'from-cyan-600 to-blue-600',
  },
  {
    id: 'jft-cbt-4',
    mockSet: 'JFT_SET_4',
    level: 'JFT',
    language: 'JAPANESE',
    difficulty: 'HARD',
    isPremium: true,
    price: 'NPR 350',
    examFormat: 'JFT_CBT',
    title: 'JFT-Basic 250 | Mock Test - 4',
    japaneseTitle: 'JFT-Basic 国際交流基金日本語基礎テスト 第4集 (48問)',
    description: 'Complete 48-question JFT-Basic CBT exam pattern (Script & Vocab 12Q, Conversation 12Q, Listening 12Q, Reading 12Q). 250 Marks Scale with 200/250 passing benchmark.',
    timeLimitMinutes: 60,
    questionCount: 48,
    sections: ['文字・語彙 (Script & Vocab)', '会話・表現 (Conversation)', '聴解 (Listening)', '読解 (Reading)'],
    audioCount: 12,
    badgeColor: 'from-cyan-600 to-blue-600',
  },
  {
    id: 'jft-cbt-5',
    mockSet: 'JFT_SET_5',
    level: 'JFT',
    language: 'JAPANESE',
    difficulty: 'HARD',
    isPremium: true,
    price: 'NPR 350',
    examFormat: 'JFT_CBT',
    title: 'JFT-Basic 250 | Mock Test - 5',
    japaneseTitle: 'JFT-Basic 国際交流基金日本語基礎テスト 第5集 (48問)',
    description: 'Complete 48-question JFT-Basic CBT exam pattern (Script & Vocab 12Q, Conversation 12Q, Listening 12Q, Reading 12Q). 250 Marks Scale with 200/250 passing benchmark.',
    timeLimitMinutes: 60,
    questionCount: 48,
    sections: ['文字・語彙 (Script & Vocab)', '会話・表現 (Conversation)', '聴解 (Listening)', '読解 (Reading)'],
    audioCount: 12,
    badgeColor: 'from-cyan-600 to-blue-600',
  },
  {
    id: 'n4-mock-1',
    mockSet: 'N4_SET_1',
    level: 'N4',
    language: 'JAPANESE',
    difficulty: 'MEDIUM',
    isPremium: false,
    price: 'Free',
    examFormat: 'JLPT_PAPER',
    title: 'JLPT N4 | Mock Test - 1',
    japaneseTitle: 'JLPT N4 標準模擬試験 第1集',
    description: 'Full N4 exam covering intermediate verb conjugations, passive/causative forms, and conversation listening.',
    timeLimitMinutes: 60,
    questionCount: 15,
    sections: ['文字・語彙 (Vocab)', '文法・読解 (Grammar)', '聴解 (Listening)'],
    audioCount: 3,
    badgeColor: 'from-indigo-600 to-purple-600',
  },
  {
    id: 'n3-mock-1',
    mockSet: 'N3_SET_1',
    level: 'N3',
    language: 'JAPANESE',
    difficulty: 'HARD',
    isPremium: true,
    price: 'NPR 400',
    examFormat: 'JLPT_PAPER',
    title: 'JLPT N3 | Mock Test - 1',
    japaneseTitle: 'JLPT N3 公式模擬試験 第1巻 (65問)',
    description: 'Complete 65-question official JLPT N3 examination paper (Part B: Grammar Q26-50, Part C: Reading Passages Q51-70, Part D: Listening Dialogues Q71-90).',
    timeLimitMinutes: 70,
    questionCount: 65,
    sections: ['文法 (Grammar Q26-50)', '読解 (Reading Passages Q51-70)', '聴解 (Listening Dialogues Q71-90)'],
    audioCount: 20,
    badgeColor: 'from-amber-600 to-orange-600',
  },
  {
    id: 'n2-mock-1',
    mockSet: 'ALL_N2',
    level: 'N2',
    language: 'JAPANESE',
    difficulty: 'HARD',
    isPremium: true,
    price: 'NPR 500',
    examFormat: 'JLPT_PAPER',
    title: 'JLPT N2 | Mock Test - 1',
    japaneseTitle: 'JLPT N2 上級模擬試験',
    description: 'N2 advanced expressions, business Japanese structures, and deep comprehension.',
    timeLimitMinutes: 65,
    questionCount: 5,
    sections: ['言語知識 (Language Knowledge)'],
    audioCount: 0,
    badgeColor: 'from-emerald-600 to-teal-600',
  },
  {
    id: 'eps-mock-1',
    mockSet: 'EPS_SET_1',
    level: 'EPS',
    language: 'KOREAN',
    difficulty: 'MEDIUM',
    isPremium: false,
    price: 'Free',
    examFormat: 'EPS_CBT',
    title: 'EPS-TOPIK 60 | Mock Test - 1',
    description: 'Official EPS-TOPIK CBT examination paper containing 20 Reading (읽기) and 20 Listening (듣기) questions. Continuous test flow with free navigation between all 40 questions.',
    timeLimitMinutes: 50,
    questionCount: 40,
    sections: ['읽기 (Reading Q1–20)', '듣기 (Listening Q21–40)'],
    audioCount: 20,
    badgeColor: 'from-emerald-600 to-teal-600',
  },
];



const JAPANESE_QUESTIONS: ExamQuestion[] = [
  // ==========================================
  // JFT-BASIC EASY MOCK TEST (JFT_EASY_1) — A2 Level
  // 18 Reading + 10 Listening = 28 questions
  // Test Title: JFT-Basic Style Mock Test — Easy Level
  // Listening: audio generated via Web Speech API TTS from audioScript field
  // ==========================================

  // ── PART 1: VOCABULARY (Kana-only, Q1–Q7) ──
  { id: 'jfte_r1', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'MULTIPLE_CHOICE',
    prompt: '【語彙 Q1】つぎの ことばの いみは どれですか。\n\n「つかれました」',
    options: ['A. I am tired.', 'B. I am hungry.', 'C. I am cold.', 'D. I am happy.'],
    correctAnswer: 'A', explanation: '「つかれました」は "I am tired" という いみです。' },

  { id: 'jfte_r2', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'MULTIPLE_CHOICE',
    prompt: '【語彙 Q2】つぎの ことばの いみは どれですか。\n\n「やすみます」',
    options: ['A. to work', 'B. to rest / take a day off', 'C. to eat', 'D. to buy'],
    correctAnswer: 'B', explanation: '「やすみます」は "to rest / take a day off" という いみです。' },

  { id: 'jfte_r3', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'MULTIPLE_CHOICE',
    prompt: '【語彙 Q3】つぎの ことばの いみは どれですか。\n\n「おおきい」',
    options: ['A. small', 'B. new', 'C. big', 'D. cheap'],
    correctAnswer: 'C', explanation: '「おおきい」は "big" という いみです。' },

  { id: 'jfte_r4', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'MULTIPLE_CHOICE',
    prompt: '【語彙 Q4】＿＿に はいる ことばを えらんでください。\n\n「かいしゃに ＿＿ で いきます。」',
    options: ['A. でんしゃ', 'B. ごはん', 'C. でんき', 'D. ざっし'],
    correctAnswer: 'A', explanation: '「でんしゃ（電車）」は train で、かいしゃに でんしゃで いくのは しぜんな ひょうげんです。' },

  { id: 'jfte_r5', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'MULTIPLE_CHOICE',
    prompt: '【語彙 Q5】＿＿に はいる ことばを えらんでください。\n\n「まいあさ ＿＿ を のみます。」',
    options: ['A. シャワー', 'B. コーヒー', 'C. テレビ', 'D. ニュース'],
    correctAnswer: 'B', explanation: '「コーヒーを のみます」は "I drink coffee" で、あさに よく つかう ひょうげんです。' },

  { id: 'jfte_r6', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'MULTIPLE_CHOICE',
    prompt: '【語彙 Q6】つぎの ことばの はんたいは どれですか。\n\n「あついです」',
    options: ['A. さむいです', 'B. おいしいです', 'C. あかるいです', 'D. たかいです'],
    correctAnswer: 'A', explanation: '「あついです（hot）」の はんたいは「さむいです（cold）」です。' },

  { id: 'jfte_r7', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'MULTIPLE_CHOICE',
    prompt: '【語彙 Q7】つぎの ことばの いみは どれですか。\n\n「おてあらい」',
    options: ['A. entrance', 'B. bathroom / toilet', 'C. kitchen', 'D. bedroom'],
    correctAnswer: 'B', explanation: '「おてあらい（お手洗い）」は "toilet / bathroom" という いみです。' },

  // ── PART 2: BASIC KANJI RECOGNITION (with furigana, Q8–Q12) ──
  { id: 'jfte_r8', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'MULTIPLE_CHOICE',
    reading: 'やま',
    prompt: '【漢字 Q8】つぎの かんじの よみかたは どれですか。\n\n「山」',
    options: ['A. やま', 'B. かわ', 'C. はな', 'D. みず'],
    correctAnswer: 'A', explanation: '「山」(やま) は mountain という いみです。' },

  { id: 'jfte_r9', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'MULTIPLE_CHOICE',
    reading: 'みぎ',
    prompt: '【漢字 Q9】つぎの かんじの よみかたは どれですか。\n\n「右」',
    options: ['A. うえ', 'B. みぎ', 'C. ひだり', 'D. した'],
    correctAnswer: 'B', explanation: '「右」(みぎ) は right (direction) という いみです。' },

  { id: 'jfte_r10', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'MULTIPLE_CHOICE',
    reading: 'にち・じつ',
    prompt: '【漢字 Q10】つぎの かんじの いみは どれですか。\n\n「日」',
    options: ['A. fire', 'B. water', 'C. sun / day', 'D. moon'],
    correctAnswer: 'C', explanation: '「日」(にち / じつ) は sun または day という いみです。' },

  { id: 'jfte_r11', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'MULTIPLE_CHOICE',
    reading: 'でぐち',
    prompt: '【漢字 Q11】つぎの かんじの よみかたは どれですか。\n\n「出口」',
    options: ['A. いりぐち', 'B. でぐち', 'C. かいだん', 'D. ちかてつ'],
    correctAnswer: 'B', explanation: '「出口」(でぐち) は exit という いみです。「入口」(いりぐち) は entrance です。' },

  { id: 'jfte_r12', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'MULTIPLE_CHOICE',
    reading: 'なんじ',
    prompt: '【漢字 Q12】つぎの かんじの よみかたは どれですか。\n\n「何時」',
    options: ['A. なにか', 'B. なんじ', 'C. いつか', 'D. なんにち'],
    correctAnswer: 'B', explanation: '「何時」(なんじ) は "what time" という いみです。' },

  // ── PART 3: SHORT READING PASSAGES (Q13–Q18) ──
  { id: 'jfte_r13', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'MULTIPLE_CHOICE',
    passage: 'わたしは まいにち でんしゃで かいしゃに いきます。かいしゃは くじから ごじまでです。おひるごはんは かいしゃの ちかくの レストランで たべます。',
    prompt: '【読解 Q13】この ひとは ひるごはんを どこで たべますか。',
    options: ['A. いえで たべます', 'B. かいしゃで たべます', 'C. かいしゃの ちかくの レストランで たべます', 'D. でんしゃの なかで たべます'],
    correctAnswer: 'C', explanation: '「かいしゃの ちかくの レストランで たべます」と ぶんに かいてあります。' },

  { id: 'jfte_r14', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'MULTIPLE_CHOICE',
    passage: 'きょうは どようびです。わたしは ともだちと えいがを みます。えいがは ごごさんじに はじまります。えいがのあとで いっしょに ばんごはんを たべます。',
    prompt: '【読解 Q14】えいがは なんじに はじまりますか。',
    options: ['A. ごぜんさんじ', 'B. ごごいちじ', 'C. ごごさんじ', 'D. ごごごじ'],
    correctAnswer: 'C', explanation: '「えいがは ごごさんじに はじまります」と ぶんに かいてあります。' },

  { id: 'jfte_r15', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'MULTIPLE_CHOICE',
    passage: 'このみせは あさ はちじから よるじゅうじまであいています。にちようびは やすみです。',
    prompt: '【読解 Q15】このみせは にちようびに あいていますか。',
    options: ['A. はい、あいています', 'B. いいえ、やすみです', 'C. ごぜんだけ あいています', 'D. ぶんに かいていません'],
    correctAnswer: 'B', explanation: '「にちようびは やすみです」と かいてあります。' },

  { id: 'jfte_r16', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'MULTIPLE_CHOICE',
    passage: 'スミスさんへ\nあした のかいぎは ごごにじに へんこうに なりました。よろしく おねがいします。\nたなか',
    prompt: '【読解 Q16】かいぎは なんじに なりましたか。',
    options: ['A. ごぜんにじ', 'B. ごごいちじ', 'C. ごごにじ', 'D. ごごさんじ'],
    correctAnswer: 'C', explanation: 'メモに「ごごにじに へんこう」と かいてあります。' },

  { id: 'jfte_r17', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'MULTIPLE_CHOICE',
    passage: 'ゴミの だしかた\n・もえるゴミ：かようびと きんようび\n・もえないゴミ：だいさんもくようび\n・びん・かん：だいいちすいようび',
    prompt: '【読解 Q17】もえるゴミは なんようびに だしますか。',
    options: ['A. すいようびと きんようび', 'B. かようびと きんようび', 'C. もくようびと きんようび', 'D. かようびと もくようび'],
    correctAnswer: 'B', explanation: '「もえるゴミ：かようびと きんようび」と かいてあります。' },

  { id: 'jfte_r18', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'MULTIPLE_CHOICE',
    passage: 'やまもとさんは かいしゃに でんわを かけました。でも、たなかさんは でんしゃの なかでした。やまもとさんは まっています。',
    prompt: '【読解 Q18】なぜ たなかさんと はなせませんでしたか。',
    options: ['A. たなかさんは ねていました', 'B. たなかさんは でんしゃの なかでした', 'C. たなかさんは かいしゃに いませんでした', 'D. やまもとさんは でんわを かけませんでした'],
    correctAnswer: 'B', explanation: '「たなかさんは でんしゃの なかでした」ので はなせませんでした。' },

  // ── PART 4: LISTENING — QUICK RESPONSE (Q19–Q23) ──
  // audioScript is read via Japanese TTS (Web Speech API)
  { id: 'jfte_l1', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'LISTENING',
    audioScript: 'おはようございます。',
    prompt: '【聴解 クイック Q19】きいて、ただしい こたえを えらんでください。',
    options: ['A. おはようございます。', 'B. こんばんは。', 'C. さようなら。', 'D. ありがとうございます。'],
    correctAnswer: 'A', explanation: '「おはようございます」に は「おはようございます」で こたえます。' },

  { id: 'jfte_l2', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'LISTENING',
    audioScript: 'すみません、トイレは どこですか。',
    prompt: '【聴解 クイック Q20】きいて、ただしい こたえを えらんでください。',
    options: ['A. はい、どうぞ。', 'B. あちらです。', 'C. いいえ、ちがいます。', 'D. ありがとうございます。'],
    correctAnswer: 'B', explanation: 'ばしょを きかれたら、「あちらです」などで こたえます。' },

  { id: 'jfte_l3', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'LISTENING',
    audioScript: 'これ、たべますか。',
    prompt: '【聴解 クイック Q21】きいて、ただしい こたえを えらんでください。',
    options: ['A. はい、たべます。', 'B. はい、いきます。', 'C. いいえ、みません。', 'D. はい、かいます。'],
    correctAnswer: 'A', explanation: '「たべますか」に は「はい、たべます」で こたえます。' },

  { id: 'jfte_l4', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'LISTENING',
    audioScript: 'しごとは なんじに おわりますか。',
    prompt: '【聴解 クイック Q22】きいて、ただしい こたえを えらんでください。',
    options: ['A. ごごろくじです。', 'B. かいしゃです。', 'C. まいにちです。', 'D. でんしゃです。'],
    correctAnswer: 'A', explanation: 'なんじに おわりますか と きかれたら、じかんで こたえます。' },

  { id: 'jfte_l5', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'LISTENING',
    audioScript: 'きょうは つかれましたね。',
    prompt: '【聴解 クイック Q23】きいて、ただしい こたえを えらんでください。',
    options: ['A. そうですね、おつかれさまです。', 'B. おはようございます。', 'C. いただきます。', 'D. おやすみなさい。'],
    correctAnswer: 'A', explanation: '「つかれましたね」と いわれたら「おつかれさまです」と こたえます。' },

  // ── PART 5: LISTENING — COMPREHENSION (Q24–Q28) ──
  { id: 'jfte_l6', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'LISTENING',
    audioScript: 'おとこのひと：やまださん、らいしゅうの かいぎは なんようびですか。おんなのひと：もくようびです。でも、ばしょが かわりました。あたらしいかいぎしつは さんかいです。おとこのひと：わかりました。ありがとうございます。',
    prompt: '【聴解 理解 Q24】かいぎは どこで おこなわれますか。',
    options: ['A. にかいの かいぎしつ', 'B. さんかいの かいぎしつ', 'C. いっかいの ロビー', 'D. よんかいの かいぎしつ'],
    correctAnswer: 'B', explanation: '「あたらしいかいぎしつは さんかいです」と いっています。' },

  { id: 'jfte_l7', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'LISTENING',
    audioScript: 'おんなのひと：すみません、このでんしゃは しんじゅくに とまりますか。おとこのひと：いいえ、とまりません。つぎのえきで のりかえてください。おんなのひと：つぎのえきは どこですか。おとこのひと：しぶやです。しぶやで やまのてせんに のりかえてください。',
    prompt: '【聴解 理解 Q25】おんなのひとは なにを しなければ なりませんか。',
    options: ['A. しんじゅくで おりる', 'B. しぶやで やまのてせんに のりかえる', 'C. このでんしゃで ずっと のる', 'D. つぎのえきで まつ'],
    correctAnswer: 'B', explanation: '「しぶやで やまのてせんに のりかえてください」と いっています。' },

  { id: 'jfte_l8', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'LISTENING',
    audioScript: 'おとこのひと：スーパーへ いきますか。おんなのひと：はい、いきます。おとこのひと：たまごと ぎゅうにゅうを かってきて もらえますか。おんなのひと：わかりました。ほかに なにか いりますか。おとこのひと：いいえ、それだけで だいじょうぶです。',
    prompt: '【聴解 理解 Q26】おんなのひとは なにを かいますか。',
    options: ['A. たまごだけ', 'B. ぎゅうにゅうだけ', 'C. たまごと ぎゅうにゅう', 'D. たまごと ぎゅうにゅうと パン'],
    correctAnswer: 'C', explanation: '「たまごと ぎゅうにゅうを かってきて もらえますか」と いっています。' },

  { id: 'jfte_l9', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'LISTENING',
    audioScript: 'てんきよほう：きょうの ごごから あめが ふります。あしたは あさから ゆきに なるでしょう。きおんは れいど いかに なります。あたたかい ふくを きてください。',
    prompt: '【聴解 理解 Q27】あしたの てんきは どうですか。',
    options: ['A. はれです', 'B. あめです', 'C. ゆきです', 'D. くもりです'],
    correctAnswer: 'C', explanation: '「あしたは あさから ゆきに なるでしょう」と てんきよほうが いっています。' },

  { id: 'jfte_l10', level: 'JFT', mockSet: 'JFT_EASY_1', type: 'LISTENING',
    audioScript: 'おんなのひと：すみません、アルバイトの おうぼは まだ できますか。おとこのひと：はい、できます。まず、このもうしこみしょに なまえと れんらくさきを かいてください。おんなのひと：はい、わかりました。おとこのひと：それから、らいしゅうの もくようびに めんせつが あります。',
    prompt: '【聴解 理解 Q28】おんなのひとは はじめに なにを しますか。',
    options: ['A. めんせつを うける', 'B. もうしこみしょに なまえと れんらくさきを かく', 'C. でんわを かける', 'D. らいしゅうまで まつ'],
    correctAnswer: 'B', explanation: '「まず、このもうしこみしょに なまえと れんらくさきを かいてください」と いっています。' },

  // ==========================================
  // JLPT N5 OFFICIAL MOCK TEST SETS (N5_SET_1 to N5_SET_4)
  // ==========================================

  // --- N5 SET 1: EASY (100% PURE KANA, ZERO KANJI) ---
  {"id": "n5_s1_1", "level": "N5", "mockSet": "N5_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q1】「わたし」の いみは どれですか。", "options": ["I / Me", "You", "He", "Friend"], "correctAnswer": "I / Me", "explanation": "「わたし」は 英語で 'I / Me' です。"},
  {"id": "n5_s1_2", "level": "N5", "mockSet": "N5_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q2】「がっこう」の いみは どれですか。", "options": ["School", "Hospital", "Library", "Park"], "correctAnswer": "School", "explanation": "「がっこう」は 英語で 'School' です。"},
  {"id": "n5_s1_3", "level": "N5", "mockSet": "N5_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q3】「せんせい」の いみは どれですか。", "options": ["Teacher", "Student", "Doctor", "Engineer"], "correctAnswer": "Teacher", "explanation": "「せんせい」は 英語で 'Teacher' です。"},
  {"id": "n5_s1_4", "level": "N5", "mockSet": "N5_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q4】「ほん」の いみは どれですか。", "options": ["Book", "Pen", "Desk", "Bag"], "correctAnswer": "Book", "explanation": "「ほん」は 英語で 'Book' です。"},
  {"id": "n5_s1_5", "level": "N5", "mockSet": "N5_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q5】「みず」の いみは どれですか。", "options": ["Water", "Tea", "Juice", "Milk"], "correctAnswer": "Water", "explanation": "「みず」は 英語で 'Water' です。"},
  {"id": "n5_s1_6", "level": "N5", "mockSet": "N5_SET_1", "type": "FILL_BLANK", "prompt": "【文法 Q6】( ) に はいる ものを えらんでください: 「わたし ( ) たなかです。」", "options": ["は", "が", "を", "に"], "correctAnswer": "は", "explanation": "しゅご(Subject)の じょしは「は」です。"},
  {"id": "n5_s1_7", "level": "N5", "mockSet": "N5_SET_1", "type": "FILL_BLANK", "prompt": "【文法 Q7】( ) に はいる ものを えらんでください: 「あした がっこう ( ) いきます。」", "options": ["へ", "を", "で", "から"], "correctAnswer": "へ", "explanation": "いきさき(Destination)を あらわす じょしは「へ」です。"},
  {"id": "n5_s1_8", "level": "N5", "mockSet": "N5_SET_1", "type": "FILL_BLANK", "prompt": "【文法 Q8】( ) に はいる ものを えらんでください: 「レストラン ( ) ひるごはんを たべます。」", "options": ["で", "に", "へ", "は"], "correctAnswer": "で", "explanation": "ばしょ(Action place)を あらわす じょしは「で」です。"},
  {"id": "n5_s1_9", "level": "N5", "mockSet": "N5_SET_1", "type": "FILL_BLANK", "prompt": "【文法 Q9】( ) に はいる ものを えらんでください: 「まいあさ 7じ ( ) おきます。」", "options": ["に", "で", "を", "へ"], "correctAnswer": "に", "explanation": "じかん(Time)の じょしは「に」です。"},
  {"id": "n5_s1_10", "level": "N5", "mockSet": "N5_SET_1", "type": "FILL_BLANK", "prompt": "【文法 Q10】( ) に はいる ものを えらんでください: 「いっしょに えいがを ( )。」", "options": ["みましょう", "みます", "みました", "みません"], "correctAnswer": "みましょう", "explanation": "かんゆう(Invitation)の ひょうげんは「〜ましょう」です。"},
  {"id": "n5_s1_11", "level": "N5", "mockSet": "N5_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【会話 Q11】A: 「おはようございます。」 B: 「( )。」", "options": ["おはようございます", "こんばんは", "さようなら", "おやすみなさい"], "correctAnswer": "おはようございます", "explanation": "あさの あいさつは「おはようございます」です。"},
  {"id": "n5_s1_12", "level": "N5", "mockSet": "N5_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【会話 Q12】A: 「ありがとうございます。」 B: 「( )。」", "options": ["どういたしまして", "ごめんなさい", "はじめまして", "いただきます"], "correctAnswer": "どういたしまして", "explanation": "かんしゃ(Thanks)への かえしは「どういたしまして」です。"},
  {"id": "n5_s1_13", "level": "N5", "mockSet": "N5_SET_1", "type": "LISTENING", "prompt": "【聴解 Q13】A: 「なにを のみますか。」 B: 「おちゃを おねがいします。」\n質問: Bさんは なにを のみますか。", "options": ["おちゃ", "みず", "ジュース", "コーヒー"], "correctAnswer": "おちゃ", "explanation": "かいわより「おちゃ」を のみます。"},
  {"id": "n5_s1_14", "level": "N5", "mockSet": "N5_SET_1", "type": "LISTENING", "prompt": "【聴解 Q14】A: 「いま なんじですか。」 B: 「3じです。」\n質問: いま なんじですか。", "options": ["3じ", "2じ", "4じ", "5じ"], "correctAnswer": "3じ", "explanation": "かいわより「3じ」です。"},
  {"id": "n5_s1_15", "level": "N5", "mockSet": "N5_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Q15】＜おしらせ＞ 「がっこうは どようびと にちようびが お休みです。」\n質問: がっこうが お休みなのは いつですか。", "options": ["どようびと にちようび", "げつようび", "すいようび", "きんようび"], "correctAnswer": "どようびと にちようび", "explanation": "おしらせより「どようびと にちようび」です。"},

  // --- N5 SET 2: EASY (100% PURE KANA, ZERO KANJI) ---
  {"id": "n5_s2_1", "level": "N5", "mockSet": "N5_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q1】「ともだち」の いみは どれですか。", "options": ["Friend", "Family", "Teacher", "Student"], "correctAnswer": "Friend", "explanation": "「ともだち」は 英語で 'Friend' です。"},
  {"id": "n5_s2_2", "level": "N5", "mockSet": "N5_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q2】「たべます」の いみは どれですか。", "options": ["To eat", "To drink", "To see", "To buy"], "correctAnswer": "To eat", "explanation": "「たべます」は 英語で 'To eat' です。"},
  {"id": "n5_s2_3", "level": "N5", "mockSet": "N5_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q3】「かいます」の いみは どれですか。", "options": ["To buy", "To sell", "To write", "To read"], "correctAnswer": "To buy", "explanation": "「かいます」は 英語で 'To buy' です。"},
  {"id": "n5_s2_4", "level": "N5", "mockSet": "N5_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q4】「くるま」の いみは どれですか。", "options": ["Car", "Train", "Bicycle", "Airplane"], "correctAnswer": "Car", "explanation": "「くるま」は 英語で 'Car' です。"},
  {"id": "n5_s2_5", "level": "N5", "mockSet": "N5_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q5】「あつい」の はんたいの ことばは どれですか。", "options": ["さむい", "たかい", "やすい", "ちいさい"], "correctAnswer": "さむい", "explanation": "「あつい」(Hot)の はんたいは「さむい」(Cold)です。"},
  {"id": "n5_s2_6", "level": "N5", "mockSet": "N5_SET_2", "type": "FILL_BLANK", "prompt": "【文法 Q6】( ) に はいる ものを えらんでください: 「パン ( ) ジュースを かいました。」", "options": ["と", "や", "に", "で"], "correctAnswer": "と", "explanation": "へいれつ(Listing items)の じょしは「と」です。"},
  {"id": "n5_s2_7", "level": "N5", "mockSet": "N5_SET_2", "type": "FILL_BLANK", "prompt": "【文法 Q7】( ) に はいる ものを えらんでください: 「きのう えいがを ( )。」", "options": ["みました", "みます", "みましょう", "みてください"], "correctAnswer": "みました", "explanation": "かこ(Past tense)は「〜ました」です。"},
  {"id": "n5_s2_8", "level": "N5", "mockSet": "N5_SET_2", "type": "FILL_BLANK", "prompt": "【文法 Q8】( ) に はいる ものを えらんでください: 「ここに なまえを ( ) ください。」", "options": ["かいて", "かく", "かきます", "かいた"], "correctAnswer": "かいて", "explanation": "いらい(Request)の ひょうげんは「〜てください」です。"},
  {"id": "n5_s2_9", "level": "N5", "mockSet": "N5_SET_2", "type": "FILL_BLANK", "prompt": "【文法 Q9】( ) に はいる ものを えらんでください: 「しゃしんを とっても ( ) ですか。」", "options": ["いい", "すき", "きらい", "ほしい"], "correctAnswer": "いい", "explanation": "きょか(Permission)は「〜てもいいですか」です。"},
  {"id": "n5_s2_10", "level": "N5", "mockSet": "N5_SET_2", "type": "FILL_BLANK", "prompt": "【文法 Q10】( ) に はいる ものを えらんでください: 「あしたは がっこうへ ( )。」", "options": ["いきません", "いきませんでした", "いきました", "いって"], "correctAnswer": "いきません", "explanation": "みらいの ひてい(Future negative)は「〜ません」です。"},
  {"id": "n5_s2_11", "level": "N5", "mockSet": "N5_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "【会話 Q11】A: 「おさきに しつれいします。」 B: 「( )。」", "options": ["おつかれさまでした", "はじめまして", "いただきます", "ごちそうさまでした"], "correctAnswer": "おつかれさまでした", "explanation": "きたくの あいさつは「おつかれさまでした」です。"},
  {"id": "n5_s2_12", "level": "N5", "mockSet": "N5_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "【会話 Q12】A: 「すみません、この ペンを つかっても いいですか。」 B: 「( )。」", "options": ["ええ、どうぞ", "いいえ、かいました", "はい、ペンです", "ごちそうさま"], "correctAnswer": "ええ、どうぞ", "explanation": "きょかへの かえしは「ええ、どうぞ」です。"},
  {"id": "n5_s2_13", "level": "N5", "mockSet": "N5_SET_2", "type": "LISTENING", "prompt": "【聴解 Q13】A: 「どこへ いきますか。」 B: 「スーパーへ いきます。」\n質問: Bさんは どこへ いきますか。", "options": ["スーパー", "えき", "こうえん", "びょういん"], "correctAnswer": "スーパー", "explanation": "かいわより「スーパー」へ いきます。"},
  {"id": "n5_s2_14", "level": "N5", "mockSet": "N5_SET_2", "type": "LISTENING", "prompt": "【聴解 Q14】A: 「この りんごは いくらですか。」 B: 「100えんです。」\n質問: りんごは いくらですか。", "options": ["100えん", "200えん", "500えん", "50えん"], "correctAnswer": "100えん", "explanation": "かいわより「100えん」です。"},
  {"id": "n5_s2_15", "level": "N5", "mockSet": "N5_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Q15】＜めも＞ 「たなかさん、きょうの めんせつは 2じからです。」\n質問: めんせつは なんじからですか。", "options": ["2じ", "1じ", "3じ", "4じ"], "correctAnswer": "2じ", "explanation": "めもより「2じから」です。"},

  // --- N5 SET 3: MEDIUM (BASIC KANJI & FURIGANA) ---
  {"id": "n5_s3_1", "level": "N5", "mockSet": "N5_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q1】下線の言葉のひらがなを選んでください: 【山】に 登ります。", "options": ["やま", "かわ", "うみ", "そら"], "correctAnswer": "やま", "explanation": "「山」は「やま」(Mountain)と読みます。"},
  {"id": "n5_s3_2", "level": "N5", "mockSet": "N5_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q2】下線の言葉の漢字を選んでください: あした【みず】を 買います。", "options": ["水", "火", "木", "土"], "correctAnswer": "水", "explanation": "「みず」の漢字は「水」(Water)です。"},
  {"id": "n5_s3_3", "level": "N5", "mockSet": "N5_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q3】下線の言葉のひらがなを選んでください: 【今日】は いい 天気です。", "options": ["きょう", "あした", "きのう", "まいちに"], "correctAnswer": "きょう", "explanation": "「今日」は「きょう」(Today)と読みます。"},
  {"id": "n5_s3_4", "level": "N5", "mockSet": "N5_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q4】下線の言葉の漢字を選んでください: 【ひと】が たくさん います。", "options": ["人", "入", "八", "大"], "correctAnswer": "人", "explanation": "「ひと」の漢字は「人」(Person)です。"},
  {"id": "n5_s3_5", "level": "N5", "mockSet": "N5_SET_3", "type": "FILL_BLANK", "prompt": "【文法 Q5】( ) に入れるのに最もよいものを選んでください: 部屋 ( ) テレビと テーブルが あります。", "options": ["に", "で", "を", "へ"], "correctAnswer": "に", "explanation": "存在場所を表す助詞は「に」です。"},
  {"id": "n5_s3_6", "level": "N5", "mockSet": "N5_SET_3", "type": "FILL_BLANK", "prompt": "【文法 Q6】( ) に入れるのに最もよいものを選んでください: この 辞書は ( ) です。", "options": ["便利", "静か", "賑やか", "親切"], "correctAnswer": "便利", "explanation": "辞書の特徴として「便利」(Convenient)が適切です。"},
  {"id": "n5_s3_7", "level": "N5", "mockSet": "N5_SET_3", "type": "FILL_BLANK", "prompt": "【文法 Q7】( ) に入れるのに最もよいものを選んでください: 日曜日は どこ ( ) 行きませんでした。", "options": ["へも", "にも", "をも", "でも"], "correctAnswer": "へも", "explanation": "全否定表現は「どこへも行かない」です。"},
  {"id": "n5_s3_8", "level": "N5", "mockSet": "N5_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "【並べ替え Q8】正しい 順番に 並べ替えたとき、★に入るものは どれですか。\n「わたしは ____ ____ _★_ ____ へ 行きます。」\n(1: 図書館  2: 友達と  3: 一緒に  4: 学校の)", "options": ["友達と", "図書館", "一緒に", "学校の"], "correctAnswer": "友達と", "explanation": "「学校の(4) 図書館へ(1) 友達と(2★) 一緒に(3)」の順になります。"},
  {"id": "n5_s3_9", "level": "N5", "mockSet": "N5_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "【会話 Q9】A:「すみません、この 近くに コンビニは ありますか。」\nB:「ええ、( )。」", "options": ["あの 角を 右へ 曲がると ありますよ", "いいえ、買いません", "はい、コンビニです", "わかりませんでした"], "correctAnswer": "あの 角を 右へ 曲がると ありますよ", "explanation": "道案内として「あの角を右へ曲がるとありますよ」が正解です。"},
  {"id": "n5_s3_10", "level": "N5", "mockSet": "N5_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Q10】＜図書館のお知らせ＞ 開館時間：9:00〜17:00。休館日：毎週月曜日。\n質問: 図書館が 閉まっているのは 何曜日ですか。", "options": ["月曜日", "日曜日", "土曜日", "火曜日"], "correctAnswer": "月曜日", "explanation": "お知らせ「休館日：毎週月曜日」より月曜日が正解です。"},

  // --- N5 SET 4: HARD (FULL OFFICIAL PAPER FORMAT) ---
  {"id": "n5_s4_1", "level": "N5", "mockSet": "N5_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q1】下線の言葉のひらがなを選んでください: 【学生】が 教室に います。", "options": ["がくせい", "せんせい", "かいしゃいん", "いしゃ"], "correctAnswer": "がくせい", "explanation": "「学生」は「がくせい」(Student)と読みます。"},
  {"id": "n5_s4_2", "level": "N5", "mockSet": "N5_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q2】下線の言葉の漢字を選んでください: まいにち【日本語】を 勉強します。", "options": ["日本語", "日本国", "日本本", "日本字"], "correctAnswer": "日本語", "explanation": "「にほんご」の漢字は「日本語」です。"},
  {"id": "n5_s4_3", "level": "N5", "mockSet": "N5_SET_4", "type": "FILL_BLANK", "prompt": "【文法 Q3】( ) に入れるのに最もよいものを選んでください: 熱が あるから、今日は 早く ( ) ほうが いいです。", "options": ["寝た", "寝る", "寝ない", "寝て"], "correctAnswer": "寝た", "explanation": "助言の文型は「〜たほうがいい」を使います。"},
  {"id": "n5_s4_4", "level": "N5", "mockSet": "N5_SET_4", "type": "FILL_BLANK", "prompt": "【文法 Q4】( ) に入れるのに最もよいものを選んでください: 傘を 忘れたので、友達に ( )。", "options": ["貸してもらいました", "貸してあげました", "借りました", "あげました"], "correctAnswer": "貸してもらいました", "explanation": "恩恵を受ける表現「〜貸してもらう」が適切です。"},
  {"id": "n5_s4_5", "level": "N5", "mockSet": "N5_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Q5】＜文章＞ 木村さんは 毎朝 7時に 起きます。朝ご飯を 食べてから、8時に 電車で 会社へ 行きます。会社は 5時に 終わります。\n質問: 木村さんは 何で 会社へ 行きますか。", "options": ["電車", "バス", "自転車", "歩いて"], "correctAnswer": "電車", "explanation": "文章「8時に電車で会社へ行きます」より「電車」が正解です。"},

  // ==========================================
  // JFT-BASIC OFFICIAL CBT MOCK TEST SETS (JFT_SET_1 to JFT_SET_5)
  // ==========================================
  {"id": "jft_set1_1", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q1】下線の言葉のひらがなを選んでください: 来週、工場で【安全】の研修があります。", "options": ["あんぜん", "かんぜん", "あぜん", "あんぜ"], "correctAnswer": "あんぜん", "explanation": "「安全」は「あんぜん」(Safety)と読みます。"},
  {"id": "jft_set1_2", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q2】下線の言葉の漢字を選んでください: あした【かいぎ】は 9時から始まります。", "options": ["会議", "会社", "会場", "会長"], "correctAnswer": "会議", "explanation": "「かいぎ」の漢字は「会議」(Meeting)です。"},
  {"id": "jft_set1_3", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q3】( )に入れるのに最もよいものを選んでください: 作業が終わったら、道具を元の場所へ ( ) ください。", "options": ["もどして", "すてて", "こわして", "おとして"], "correctAnswer": "もどして", "explanation": "作業後は道具を元の場所へ戻します(Return items to original place)。"},
  {"id": "jft_set1_4", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q4】下線の言葉のひらがなを選んでください: 機械の【点検】を 毎日 行います。", "options": ["てんけん", "てんかん", "でんけん", "てんきん"], "correctAnswer": "てんけん", "explanation": "「点検」は「てんけん」(Inspection/Check)と読みます。"},
  {"id": "jft_set1_5", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q5】( )に入れるのに最もよいものを選んでください: 熱があるときは、むりをしないで ( ) を 休んでください。", "options": ["しごと", "かいしゃ", "べんきょう", "からだ"], "correctAnswer": "からだ", "explanation": "「体を休める」(Rest your body)が適切な表現です。"},
  {"id": "jft_set1_6", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q6】下線の言葉の漢字を選んでください: 荷物を【はこぶ】ときは 気をつけてください。", "options": ["運ぶ", "通ぶ", "送ぶ", "転ぶ"], "correctAnswer": "運ぶ", "explanation": "「はこぶ」の漢字は「運ぶ」(To carry/transport)です。"},
  {"id": "jft_set1_7", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q7】( )に入れるのに最もよいものを選んでください: この 手袋は ( ) ですから、滑りにくいです。", "options": ["ゴム製", "紙製", "ガラス製", "木製"], "correctAnswer": "ゴム製", "explanation": "「ゴム製」(Made of rubber)の手袋は作業時に滑りにくいです。"},
  {"id": "jft_set1_8", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q8】下線の言葉のひらがなを選んでください: 【非常口】の 前に 荷物を 置かないでください。", "options": ["ひじょうぐち", "ひじょぐち", "ひしょうぐち", "ひちようぐち"], "correctAnswer": "ひじょうぐち", "explanation": "「非常口」は「ひじょうぐち」(Emergency Exit)と読みます。"},
  {"id": "jft_set1_9", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q9】( )に入れるのに最もよいものを選んでください: 電気の スイッチを ( ) に してください。", "options": ["オフ", "アウト", "オープン", "ダウン"], "correctAnswer": "オフ", "explanation": "「スイッチをオフにする」(Turn off switch)が正しい作業指示です。"},
  {"id": "jft_set1_10", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q10】下線の言葉の漢字を選んでください: つぎの【しんごう】を 右へ 曲がってください。", "options": ["信号", "信後", "心号", "新号"], "correctAnswer": "信号", "explanation": "「しんごう」の漢字は「信号」(Traffic light)です。"},
  {"id": "jft_set1_11", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q11】( )に入れるのに最もよいものを選んでください: けがをしたので、( ) で 消毒しました。", "options": ["消毒液", "洗剤", "醤油", "油"], "correctAnswer": "消毒液", "explanation": "けがの消毒には「消毒液」(Disinfectant)を使います。"},
  {"id": "jft_set1_12", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q12】下線の言葉のひらがなを選んでください: 今日の【作業】は これで 終わりです。", "options": ["さぎょう", "さくぎょう", "さぎよう", "さごう"], "correctAnswer": "さぎょう", "explanation": "「作業」は「さぎょう」(Work/Operation)と読みます。"},
  {"id": "jft_set1_13", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【会話・表現 Q13】A:「すみません、この 機械の 使い方を 教えていただけませんか。」\nB:「( )。」", "options": ["ええ、いいですよ。こちらへ どうぞ", "いいえ、使いません", "はい、使い終わりました", "いいえ、けっこうです"], "correctAnswer": "ええ、いいですよ。こちらへ どうぞ", "explanation": "依頼に対する快諾の表現「ええ、いいですよ」が適切です。"},
  {"id": "jft_set1_14", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【会話・表現 Q14】A:「重そうな 荷物ですね。持ちましょうか。」\nB:「あ、すみません。( )。」", "options": ["助かります。お願いします", "持ちません", "要りません", "持ってください"], "correctAnswer": "助かります。お願いします", "explanation": "手伝いに対して「助かります。お願いします」と答えるのが自然です。"},
  {"id": "jft_set1_15", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【会話・表現 Q15】A:「明日、体調が 悪いので 病院へ 行きたいのですが...」\nB:「そうですか。じゃあ、( )。」", "options": ["無理をしないで 休んでくださいね", "病院へ 行かないでください", "もっと 働いてください", "おめでとうございます"], "correctAnswer": "無理をしないで 休んでくださいね", "explanation": "体調不良者への気遣い「無理をしないで休んでくださいね」が適切です。"},
  {"id": "jft_set1_16", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【会話・表現 Q16】A:「この 資料、コピーして おきましょうか。」\nB:「ええ、( ) お願いします。」", "options": ["10部ほど", "10個ほど", "10本ほど", "10着ほど"], "correctAnswer": "10部ほど", "explanation": "書類・資料のカウント単位は「部」(copies)です。"},
  {"id": "jft_set1_17", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【会話・表現 Q17】A:「工場内では 必ず ヘルメットを ( ) なればなりません。」\nB:「わかりました。」", "options": ["被らなければ", "履かなければ", "着なければ", "嵌めなければ"], "correctAnswer": "被らなければ", "explanation": "帽子やヘルメットを装着する動詞は「被る」(かぶる)です。"},
  {"id": "jft_set1_18", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【会話・表現 Q18】A:「ちょっと 熱が あるみたいなんです...」\nB:「それなら、早く ( ) ほうが いいですよ。」", "options": ["帰った", "帰る", "帰らない", "帰って"], "correctAnswer": "帰った", "explanation": "アドバイス表現は「〜たほうがいいです」を使います。"},
  {"id": "jft_set1_19", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【会話・表現 Q19】A:「すみません、落とし物を 拾ったのですが、どこへ 持っていけば いいですか。」\nB:「あちらの ( ) へ 持っていってください。」", "options": ["受付", "食堂", "トイレ", "駐車場"], "correctAnswer": "受付", "explanation": "拾得物は「受付」に届けます。"},
  {"id": "jft_set1_20", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【会話・表現 Q20】A:「田中さん、午後の 会議の 準備は できましたか。」\nB:「はい、もう ( ) あります。」", "options": ["準備して", "準備する", "準備された", "準備し"], "correctAnswer": "準備して", "explanation": "状態の準備完了を表す「〜てあります」が正解です。"},
  {"id": "jft_set1_21", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【会話・表現 Q21】A:「危ないですから、機械に 手を ( ) ください。」\nB:「気をつけます。」", "options": ["触れないで", "触って", "触れて", "触ら"], "correctAnswer": "触れないで", "explanation": "禁止の安全指示「〜ないでください」が適切です。"},
  {"id": "jft_set1_22", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【会話・表現 Q22】A:「お先に 失礼します。」\nB:「( )。」", "options": ["お疲れ様でした", "はじめまして", "ごちそうさまでした", "いってらっしゃい"], "correctAnswer": "お疲れ様でした", "explanation": "退社時の挨拶に対する返答は「お疲れ様でした」です。"},
  {"id": "jft_set1_23", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【会話・表現 Q23】A:「すみません、この 漢字の 読み方を ( )。」\nB:「これは『あんぜん』と 読みますよ。」", "options": ["教えてもらえませんか", "教えましょうか", "教えてあげます", "教えます"], "correctAnswer": "教えてもらえませんか", "explanation": "丁寧な依頼表現「〜てもらえませんか」が正解です。"},
  {"id": "jft_set1_24", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【会話・表現 Q24】A:「今日の 作業は 予定より 早く 終わりましたね。」\nB:「ええ、みんなで ( ) おかげですね。」", "options": ["協力した", "喧嘩した", "休んだ", "忘れた"], "correctAnswer": "協力した", "explanation": "感謝の表現「〜おかげ」が適切です。"},
  {"id": "jft_set1_25", "level": "JFT", "mockSet": "JFT_SET_1", "type": "LISTENING", "prompt": "【聴解 Q25】店員：いらっしゃいませ。ご注文は？\n男の人：アイスコーヒーを 二つと、ショートケーキを 一つ お願いします。\n\n質問: 男の人は 何を いくつ 注文しましたか。", "options": ["アイスコーヒー2つ、ケーキ1つ", "アイスコーヒー1つ、ケーキ2つ", "ホットコーヒー2つ、ケーキ1つ", "アイスコーヒー2つのみ"], "correctAnswer": "アイスコーヒー2つ、ケーキ1つ", "explanation": "会話より「アイスコーヒー2つとショートケーキ1つ」が正解です。"},
  {"id": "jft_set1_26", "level": "JFT", "mockSet": "JFT_SET_1", "type": "LISTENING", "prompt": "【聴解 Q26】女の人：佐藤さん、明日の 作業指示書は どこに ありますか。\n男の人：棚の 上の 青い ファイルの中に 入って いますよ。\n\n質問: 明日の 作業指示書は どこに ありますか。", "options": ["青いファイルの中", "赤いファイルの中", "机の引き出しの中", "パソコンの中"], "correctAnswer": "青いファイルの中", "explanation": "会話より棚の上の「青いファイルの中」にあります。"},
  {"id": "jft_set1_27", "level": "JFT", "mockSet": "JFT_SET_1", "type": "LISTENING", "prompt": "【聴解 Q27】男の人：この 電子レンジ、どうやって 使うんですか。\n女の人：まず 皿を 入れて、扉を 閉めてから、この 緑の ボタンを 押してください。\n\n質問: 最初に 何を しますか。", "options": ["皿を入れる", "緑のボタンを押す", "扉を開ける", "タイマーを回す"], "correctAnswer": "皿を入れる", "explanation": "「まず皿を入れて」が最初の操作です。"},
  {"id": "jft_set1_28", "level": "JFT", "mockSet": "JFT_SET_1", "type": "LISTENING", "prompt": "【聴解 Q28】アナウンス：まもなく 2番線に 東京行き 普通列車が 到着します。黄色い線の 内側まで お下がりください。\n\n質問: 乗客は どこまで 下がらなければなりませんか。", "options": ["黄色い線の内側", "黄色い線の外側", "階段の上", "改札口の前"], "correctAnswer": "黄色い線の内側", "explanation": "アナウンスより「黄色い線の内側」です。"},
  {"id": "jft_set1_29", "level": "JFT", "mockSet": "JFT_SET_1", "type": "LISTENING", "prompt": "【聴解 Q29】男の人：田中さん、午後の 打合せは 何時からですか。\n女の人：もともと 2時からでしたが、3時に 変更に なりました。\n\n質問: 打合せは 何時に 始まりますか。", "options": ["3時", "2時", "1時", "4時"], "correctAnswer": "3時", "explanation": "変更後の時間は「3時」です。"},
  {"id": "jft_set1_30", "level": "JFT", "mockSet": "JFT_SET_1", "type": "LISTENING", "prompt": "【聴解 Q30】女の人：すみません、この 服を 試着しても いいですか。\n店員：はい、どうぞ。あちらの 試着室を ご利用ください。\n\n質問: 女の人は これから 何を しますか。", "options": ["服を試着する", "服を買う", "服を洗う", "服を返品する"], "correctAnswer": "服を試着する", "explanation": "会話より「服を試着する」が正解です。"},
  {"id": "jft_set1_31", "level": "JFT", "mockSet": "JFT_SET_1", "type": "LISTENING", "prompt": "【聴解 Q31】男の人：明日の 天気予報に よると、朝から 大雨が 降るそうです。\n女の人：じゃあ、電車が 遅れるかもしれませんね。早めに 家を 出ましょう。\n\n質問: 二人は 明日の 朝、どうしますか。", "options": ["早めに家を出る", "家で休む", "車で行く", "遅く起きる"], "correctAnswer": "早めに家を出る", "explanation": "大雨で電車遅延が予想されるため「早めに家を出る」が正解です。"},
  {"id": "jft_set1_32", "level": "JFT", "mockSet": "JFT_SET_1", "type": "LISTENING", "prompt": "【聴解 Q32】工場長：皆さん、今日の 作業前 点検を 始めます。まずは 保護メガネと 安全靴を 着用してください。\n\n質問: 作業前に 必ず 装着するものは 何ですか。", "options": ["保護メガネと安全靴", "ヘルメットと手袋", "マスクとエプロン", "帽子と長靴"], "correctAnswer": "保護メガネと安全靴", "explanation": "会話より「保護メガネと安全靴」です。"},
  {"id": "jft_set1_33", "level": "JFT", "mockSet": "JFT_SET_1", "type": "LISTENING", "prompt": "【聴解 Q33】女の人：この 荷物、どこへ 運びますか。\n男の人：2階の 倉庫へ 運んでください。エレベーターを 使ってくださいね。\n\n質問: 荷物を どこへ 運ぶために 何を 使いますか。", "options": ["2階の倉庫へ、エレベーターを使う", "1階の事務所へ、階段を使う", "3階の屋上へ、階段を使う", "トラックへ、フォークリフトを使う"], "correctAnswer": "2階の倉庫へ、エレベーターを使う", "explanation": "「2階の倉庫へエレベーターを使って運ぶ」が正しい指示です。"},
  {"id": "jft_set1_34", "level": "JFT", "mockSet": "JFT_SET_1", "type": "LISTENING", "prompt": "【聴解 Q34】男の人：すみません、体調が 悪いので 早退しても いいですか。\n上司：わかりました。病院へ 行って、ゆっくり 休んでください。\n\n質問: 男の人は これから どうしますか。", "options": ["早退して病院へ行く", "残業して働く", "昼ご飯を食べる", "出張に行く"], "correctAnswer": "早退して病院へ行く", "explanation": "体調不良のため「早退して病院へ行く」が正解です。"},
  {"id": "jft_set1_35", "level": "JFT", "mockSet": "JFT_SET_1", "type": "LISTENING", "prompt": "【聴解 Q35】アナウンス：本日、台風の 影響により、午後の バスは 全便 運休となります。\n\n質問: 午後の バスは どうなりますか。", "options": ["全便運休になる", "通常通り運行する", "無料で乗れる", "増便される"], "correctAnswer": "全便運休になる", "explanation": "「全便運休」がアナウンス内容です。"},
  {"id": "jft_set1_36", "level": "JFT", "mockSet": "JFT_SET_1", "type": "LISTENING", "prompt": "【聴解 Q36】女の人：山田さん、この 書類を 10部 コピーして、会議室に 置いておいてください。\n男の人：わかりました。すぐ やります。\n\n質問: 男の人は コピーした あと、書類を どこに 置きますか。", "options": ["会議室", "自分のデスク", "社長室", "受付"], "correctAnswer": "会議室", "explanation": "「会議室に置いておいてください」より「会議室」が正解です。"},
  {"id": "jft_set1_37", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Q37】＜お知らせ：ゴミの 分別について＞\n・可燃ゴミ（燃えるゴミ）：月曜日・木曜日\n・不燃ゴミ（燃えないゴミ）：水曜日\n・ペットボトル・缶：金曜日\n※ゴミは 朝 8時までに 出してください。\n\n質問: 缶や ペットボトルは 何曜日に 出しますか。", "options": ["金曜日", "月曜日", "水曜日", "木曜日"], "correctAnswer": "金曜日", "explanation": "お知らせより、ペットボトル・缶は「金曜日」です。"},
  {"id": "jft_set1_38", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Q38】＜工場内の 安全ルール＞\n1. 作業中は 必ず ヘルメットと 安全靴を 着用すること。\n2. 危険な 場所には 入らないこと。\n3. 事故が 起きたら、すぐに 班長へ 報告すること。\n\n質問: 事故が 起きたとき、最初に 何を しますか。", "options": ["すぐに班長へ報告する", "自分で修理する", "警察へ電話する", "そのまま帰る"], "correctAnswer": "すぐに班長へ報告する", "explanation": "ルール3より「すぐに班長へ報告すること」が正解です。"},
  {"id": "jft_set1_39", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Q39】＜メール：清掃作業の お願い＞\n田中さんへ\n本日、16時から 3階の 会議室Aで 全員で 清掃を行います。作業服と 軍手を 準備して 集合してください。\n\n質問: 田中さんは 16時に どこへ 行かなければなりませんか。", "options": ["3階の会議室A", "1階の受付", "屋外の駐車場", "2階の食堂"], "correctAnswer": "3階の会議室A", "explanation": "メールより「3階の会議室A」へ集合します。"},
  {"id": "jft_set1_40", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Q40】＜張り紙：エレベーター 点検中＞\n本日 13:00 〜 15:00 まで、点検のため エレベーターは ご利用になれません。階段を ご利用ください。\n\n質問: 14時に 4階へ 行きたいとき、どうしますか。", "options": ["階段を使う", "エレベーターを使う", "明日行く", "エスカレーターを使う"], "correctAnswer": "階段を使う", "explanation": "13〜15時はエレベーター点検中のため「階段を使う」が正解です。"},
  {"id": "jft_set1_41", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Q41】＜シフト表：今週の 休日＞\n・キムさん：火曜日・土曜日\n・アリさん：水曜日・日曜日\n・サントスさん：月曜日・木曜日\n\n質問: 水曜日に お休みなのは 誰ですか。", "options": ["アリさん", "キムさん", "サントスさん", "全員"], "correctAnswer": "アリさん", "explanation": "シフト表より、水曜日が休日なのは「アリさん」です。"},
  {"id": "jft_set1_42", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Q42】＜割引クーポン＞\n【ランチ限定 200円引き】\n※有効期限：2026年 8月末日まで\n※11:00 〜 14:30 のみ 使用可能。\n※他の サービス券との 併用は できません。\n\n質問: この クーポンが 使える 時間は いつですか。", "options": ["11:00 〜 14:30", "18:00 〜 21:00", "終日いつでも", "朝 8:00 〜 10:00"], "correctAnswer": "11:00 〜 14:30", "explanation": "条件より「11:00 〜 14:30 のみ使用可能」です。"},
  {"id": "jft_set1_43", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Q43】＜社内掲示：健康診断の お知らせ＞\n来月 10日（木）に 年1回の 健康診断を 行います。\n受診前の 8時間は 食事を 控えてください。水は 飲んでも かまいません。\n\n質問: 健康診断の 直前 8時間に やってはいけないことは 何ですか。", "options": ["食事をすること", "水を飲むこと", "寝ること", "歩くこと"], "correctAnswer": "食事をすること", "explanation": "「受診前の8時間は食事を控えてください」より「食事をすること」が禁止事項です。"},
  {"id": "jft_set1_44", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Q44】＜食堂の ご案内＞\n・営業時間：11:30 〜 13:30\n・日替わり定食：500円\n・券売機で 食券を 買ってから、カウンターへ お出しください。\n\n質問: 食堂で 食事を するとき、最初に 何を しますか。", "options": ["券売機で食券を買う", "カウンターで注文する", "席に座る", "食器を洗う"], "correctAnswer": "券売機で食券を買う", "explanation": "案内より「券売機で食券を買ってから」とありますので食券の購入が最初です。"},
  {"id": "jft_set1_45", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Q45】＜注意書き：熱中症対策＞\n夏場は こまめに 水分と 塩分を 補給してください。気分が 悪くなった場合は、涼しい 場所で 休んで、近くの人に 声を かけてください。\n\n質問: 作業中に 体調が 悪くなったら どうしますか。", "options": ["涼しい場所で休んで近くの人に声をかける", "無理して作業を続ける", "そのまま倒れる", "一人で家に帰る"], "correctAnswer": "涼しい場所で休んで近くの人に声をかける", "explanation": "注意書きより「涼しい場所で休んで近くの人に声をかける」が正解です。"},
  {"id": "jft_set1_46", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Q46】＜宅配便 不在連絡票＞\nご配達に 伺いましたが、ご不在でした。\n再配達のご希望は、お電話 または Webサイトより お申し込みください。\n\n質問: 荷物を もう一度 送ってもらうには どうすれば いいですか。", "options": ["電話かWebサイトで再配達を申し込む", "郵便局へ行く", "諦める", "荷物を買い直す"], "correctAnswer": "電話かWebサイトで再配達を申し込む", "explanation": "「電話またはWebサイトよりお申し込み」が正解です。"},
  {"id": "jft_set1_47", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Q47】＜研修案内：日本語講習＞\n毎週 水曜日 18:00〜19:30、3階 研修室にて 開講します。テキスト代は 無料です。\n\n質問: この 講習の 受講料や テキスト代は いくらですか。", "options": ["無料", "1,000円", "500円", "5,000円"], "correctAnswer": "無料", "explanation": "案内より「テキスト代は無料です」が正解です。"},
  {"id": "jft_set1_48", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Q48】＜防災訓練のお知らせ＞\n9月1日（金）10:00より 防災訓練を 実施します。サイレンが 鳴ったら、慌てずに 避難場所の グラウンドへ 移動してください。\n\n質問: サイレンが 鳴ったら どこへ 移動しますか。", "options": ["グラウンド", "自分の部屋", "屋上", "食堂"], "correctAnswer": "グラウンド", "explanation": "「避難場所のグラウンドへ移動してください」が正解です。"},
  {"id": "jft_set1_49", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Q49】＜設備利用案内：洗濯機＞\n・利用時間：7:00 〜 22:00\n・1回 200円（100円玉 2枚）\n・洗剤は 自動で 出ますので、持参不要です。\n\n質問: 洗濯機を使うとき、自分で 持っていく必要が ないものは 何ですか。", "options": ["洗剤", "服", "100円玉", "タオル"], "correctAnswer": "洗剤", "explanation": "「洗剤は自動で出ますので持参不要です」より「洗剤」が正解です。"},
  {"id": "jft_set1_50", "level": "JFT", "mockSet": "JFT_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Q50】＜社内ルール：パスワード管理＞\nパソコンの パスワードは 他人に 教えないでください。また、3ヶ月に 1回 変更してください。\n\n質問: パスワードについて 正しいものは どれですか。", "options": ["他人に教えず3ヶ月に1回変更する", "紙に書いて貼っておく", "友達と共有する", "一生変更しない"], "correctAnswer": "他人に教えず3ヶ月に1回変更する", "explanation": "「他人に教えない」「3ヶ月に1回変更」の両方を満たす選択肢が正解です。"},
  {"id": "jft_set2_1", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【文字・語彙 Q1】Choose the correct reading of 病院.", "options": ["びょういん", "びよういん", "こうえん", "がっこう"], "correctAnswer": "びょういん", "explanation": "「病院」の読み方は「びょういん」(Hospital)です。"},
  {"id": "jft_set2_2", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【文字・語彙 Q2】Choose the correct meaning of 会社.", "options": ["Company", "School", "Library", "Bank"], "correctAnswer": "Company", "explanation": "「会社」(かいしゃ) means Company."},
  {"id": "jft_set2_3", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【文字・語彙 Q3】毎日 8時に 会社へ（　　　）。", "options": ["行きます", "食べます", "飲みます", "買います"], "correctAnswer": "行きます", "explanation": "「会社へ行きます」が適切です。"},
  {"id": "jft_set2_4", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【文字・語彙 Q4】Which word means \"traffic light\"?", "options": ["信号", "交差点", "道路", "駅"], "correctAnswer": "信号", "explanation": "「信号」(しんごう) means Traffic light."},
  {"id": "jft_set2_5", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【文字・語彙 Q5】Choose the correct kanji for あした.", "options": ["明日", "今日", "昨日", "毎日"], "correctAnswer": "明日", "explanation": "「あした」(Tomorrow)の漢字は「明日」です。"},
  {"id": "jft_set2_6", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【文字・語彙 Q6】Choose the opposite of 暑い.", "options": ["寒い", "高い", "安い", "狭い"], "correctAnswer": "寒い", "explanation": "「暑い」(Hot)の反対語は「寒い」(Cold)です。"},
  {"id": "jft_set2_7", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【文字・語彙 Q7】Which word means \"gloves\"?", "options": ["手袋", "靴", "帽子", "眼鏡"], "correctAnswer": "手袋", "explanation": "「手袋」(てぶくろ) means Gloves."},
  {"id": "jft_set2_8", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【文字・語彙 Q8】この 機械は（　　　）です。", "options": ["安全", "食べます", "行きます", "見ます"], "correctAnswer": "安全", "explanation": "「この機械は安全です」が適切です。"},
  {"id": "jft_set2_9", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【文字・語彙 Q9】Choose the correct reading of 火.", "options": ["ひ", "みず", "き", "つち"], "correctAnswer": "ひ", "explanation": "「火」の読み方は「ひ」(Fire)です。"},
  {"id": "jft_set2_10", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【文字・語彙 Q10】Which word means \"meeting room\"?", "options": ["会議室", "食堂", "受付", "駐車場"], "correctAnswer": "会議室", "explanation": "「会議室」(かいぎしつ) means Meeting room."},
  {"id": "jft_set2_11", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【文字・語彙 Q11】仕事の あとで（　　　）。", "options": ["休みます", "起きます", "書きます", "読みます"], "correctAnswer": "休みます", "explanation": "「仕事のあとで休みます」が適切です。"},
  {"id": "jft_set2_12", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【文字・語彙 Q12】Which word means \"next week\"?", "options": ["来週", "今週", "先週", "毎週"], "correctAnswer": "来週", "explanation": "「来週」(らいしゅう) means Next week."},
  {"id": "jft_set2_13", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【会話・表現 Q13】A: こんばんは。\nB: （　　　）", "options": ["こんばんは。", "おはようございます。", "さようなら。", "おやすみなさい。"], "correctAnswer": "こんばんは。", "explanation": "夜の挨拶「こんばんは」に対する返答です。"},
  {"id": "jft_set2_14", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【会話・表現 Q14】Someone says \"すみません.\" You reply:", "options": ["いいえ、大丈夫ですよ。", "ありがとうございます。", "おめでとうございます。", "いただきます。"], "correctAnswer": "いいえ、大丈夫ですよ。", "explanation": "謝罪・お詫びに対する返答「いいえ、大丈夫ですよ」が適切です。"},
  {"id": "jft_set2_15", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【会話・表現 Q15】A: お仕事は 何ですか。\nB: （　　　）", "options": ["エンジニアです。", "日本人です。", "東京です。", "20歳です。"], "correctAnswer": "エンジニアです。", "explanation": "職業を聞かれているので「エンジニアです」と答えます。"},
  {"id": "jft_set2_16", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【会話・表現 Q16】You want to ask for permission to take a photo.", "options": ["写真を 撮っても いいですか。", "写真を 撮ります。", "写真が あります。", "写真でした。"], "correctAnswer": "写真を 撮っても いいですか。", "explanation": "許可を求める表現「〜てもいいですか」が適切です。"},
  {"id": "jft_set2_17", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【会話・表現 Q17】Which expression is used before eating a meal?", "options": ["いただきます。", "ごちそうさまでした。", "いってきます。", "ただいま。"], "correctAnswer": "いただきます。", "explanation": "食事を始める前の挨拶は「いただきます」です。"},
  {"id": "jft_set2_18", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【会話・表現 Q18】A:「手伝いましょうか。」\nB:「（　　　）。」", "options": ["ありがとうございます。お願いします", "手伝いません", "要りません", "手伝ってください"], "correctAnswer": "ありがとうございます。お願いします", "explanation": "親切な申し出への感謝の返答です。"},
  {"id": "jft_set2_19", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【会話・表現 Q19】A:「コーヒーと 紅茶、どちらが いいですか。」\nB:「（　　　）。」", "options": ["コーヒーを お願いします", "いいえ、どちらでもないです", "はい、そうです", "美味しくないです"], "correctAnswer": "コーヒーを お願いします", "explanation": "選択肢に対する注文表現です。"},
  {"id": "jft_set2_20", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【会話・表現 Q20】A:「休んでも いいですか。」\nB:「（　　　）。」", "options": ["ええ、どうぞ。お大事に", "いいえ、休みます", "はい、仕事です", "ダメでした"], "correctAnswer": "ええ、どうぞ。お大事に", "explanation": "体調不良による休養許可「ええ、どうぞ。お大事に」が適切です。"},
  {"id": "jft_set2_21", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【会話・表現 Q21】A:「タクシーを 呼びましょうか。」\nB:「（　　　）。」", "options": ["あ、助かります。お願いします", "呼べません", "タクシーです", "知りません"], "correctAnswer": "あ、助かります。お願いします", "explanation": "親切な提案に対する快諾「あ、助かります。お願いします」が適切です。"},
  {"id": "jft_set2_22", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【会話・表現 Q22】A:「ごちそうさまでした！」\nB:「（　　　）。」", "options": ["お粗末様でした", "いただきます", "いってらっしゃい", "はじめまして"], "correctAnswer": "お粗末様でした", "explanation": "食後の感謝への返答です。"},
  {"id": "jft_set2_23", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【会話・表現 Q23】A:「どのくらい 日本語を 勉強しましたか。」\nB:「（　　　）。」", "options": ["1年くらいです", "1人くらいです", "1冊くらいです", "1本くらいです"], "correctAnswer": "1年くらいです", "explanation": "期間を聞かれているので「1年くらいです」が正解です。"},
  {"id": "jft_set2_24", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【会話・表現 Q24】A:「お先に 失礼します。」\nB:「（　　　）。」", "options": ["お疲れ様でした！", "はじめまして！", "いただきます！", "すみません！"], "correctAnswer": "お疲れ様でした！", "explanation": "退社時の挨拶に対する言葉です。"},
  {"id": "jft_set2_25", "level": "JFT", "mockSet": "JFT_SET_2", "type": "LISTENING", "prompt": "[Set 2] 【聴解 Q25】A: 牛乳を 買います。\nB: はい。\n\n質問: What will A buy?", "options": ["Juice", "Milk", "Water", "Tea"], "correctAnswer": "Milk", "explanation": "「牛乳」(Milk)が正解です。"},
  {"id": "jft_set2_26", "level": "JFT", "mockSet": "JFT_SET_2", "type": "LISTENING", "prompt": "[Set 2] 【聴解 Q26】A: 何を 食べますか。\nB: ラーメンを お願いします。\n\n質問: What will B eat?", "options": ["Sushi", "Ramen", "Tempura", "Soba"], "correctAnswer": "Ramen", "explanation": "「ラーメン」が正解です。"},
  {"id": "jft_set2_27", "level": "JFT", "mockSet": "JFT_SET_2", "type": "LISTENING", "prompt": "[Set 2] 【聴解 Q27】A: 今日は 何日ですか。\nB: 15日ですよ。\n\n質問: What is the date today?", "options": ["5th", "10th", "15th", "20th"], "correctAnswer": "15th", "explanation": "「15日」が正解です。"},
  {"id": "jft_set2_28", "level": "JFT", "mockSet": "JFT_SET_2", "type": "LISTENING", "prompt": "[Set 2] 【聴解 Q28】A: 会議は 何時からですか。\nB: 2時からです。\n\n質問: What time does the meeting start?", "options": ["1:00", "2:00", "3:00", "4:00"], "correctAnswer": "2:00", "explanation": "「2時から」が正解です。"},
  {"id": "jft_set2_29", "level": "JFT", "mockSet": "JFT_SET_2", "type": "LISTENING", "prompt": "[Set 2] 【聴解 Q29】A: どこで 買いましたか。\nB: デパートで 買いました。\n\n質問: Where did B buy it?", "options": ["Supermarket", "Department store", "Convenience store", "Market"], "correctAnswer": "Department store", "explanation": "「デパート」(Department store)が正解です。"},
  {"id": "jft_set2_30", "level": "JFT", "mockSet": "JFT_SET_2", "type": "LISTENING", "prompt": "[Set 2] 【聴解 Q30】A: 切符は いくらですか。\nB: 240円です。\n\n質問: How much is the ticket?", "options": ["140 Yen", "240 Yen", "340 Yen", "440 Yen"], "correctAnswer": "240 Yen", "explanation": "「240円」が正解です。"},
  {"id": "jft_set2_31", "level": "JFT", "mockSet": "JFT_SET_2", "type": "LISTENING", "prompt": "[Set 2] 【聴解 Q31】A: 日本の 生活は どうですか。\nB: とても 楽しいです。\n\n質問: How is life in Japan?", "options": ["Difficult", "Very enjoyable", "Busy", "Cold"], "correctAnswer": "Very enjoyable", "explanation": "「とても楽しいです」(Very enjoyable)が正解です。"},
  {"id": "jft_set2_32", "level": "JFT", "mockSet": "JFT_SET_2", "type": "LISTENING", "prompt": "[Set 2] 【聴解 Q32】A: どうやって 工場へ 行きますか。\nB: 自転車で行きます。\n\n質問: How does B go to the factory?", "options": ["Walk", "Bicycle", "Bus", "Train"], "correctAnswer": "Bicycle", "explanation": "「自転車」(Bicycle)が正解です。"},
  {"id": "jft_set2_33", "level": "JFT", "mockSet": "JFT_SET_2", "type": "LISTENING", "prompt": "[Set 2] 【聴解 Q33】A: 部屋に 何が ありますか。\nB: ベッドと テレビが あります。\n\n質問: What is in the room?", "options": ["Bed & TV", "Desk & Chair", "Sofa & Table", "Fridge & Clock"], "correctAnswer": "Bed & TV", "explanation": "「ベッドとテレビ」が正解です。"},
  {"id": "jft_set2_34", "level": "JFT", "mockSet": "JFT_SET_2", "type": "LISTENING", "prompt": "[Set 2] 【聴解 Q34】A: 休みは 何曜日ですか。\nB: 土曜日と 日曜日です。\n\n質問: When are the days off?", "options": ["Monday & Tuesday", "Saturday & Sunday", "Wednesday & Friday", "Everyday"], "correctAnswer": "Saturday & Sunday", "explanation": "「土曜日と日曜日」が正解です。"},
  {"id": "jft_set2_35", "level": "JFT", "mockSet": "JFT_SET_2", "type": "LISTENING", "prompt": "[Set 2] 【聴解 Q35】A: メガネは どこですか。\nB: 鞄の中に あります。\n\n質問: Where are the glasses?", "options": ["On the table", "In the bag", "On the bed", "Under the chair"], "correctAnswer": "In the bag", "explanation": "「鞄の中」(In the bag)が正解です。"},
  {"id": "jft_set2_36", "level": "JFT", "mockSet": "JFT_SET_2", "type": "LISTENING", "prompt": "[Set 2] 【聴解 Q36】A: 昨日の 夜、何を しましたか。\nB: テレビで サッカーの 試合を 見ました。\n\n質問: What did B do last night?", "options": ["Studied Japanese", "Watched soccer match on TV", "Cooked dinner", "Went to sleep early"], "correctAnswer": "Watched soccer match on TV", "explanation": "「テレビでサッカーの試合を見ました」が正解です。"},
  {"id": "jft_set2_37", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【読解 Q37】＜文章＞ ジョンさんは エンジニアです。毎日 8時半に 工場へ 行きます。昼ご飯は 食堂で 食べます。\n\n質問: What is John's job?", "options": ["Teacher", "Engineer", "Doctor", "Driver"], "correctAnswer": "Engineer", "explanation": "文章「エンジニアです」より Engineer が正解です。"},
  {"id": "jft_set2_38", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【読解 Q38】＜文章＞ ジョンさんは エンジニアです。毎日 8時半に 工場へ 行きます。昼ご飯は 食堂で 食べます。\n\n質問: Where does he eat lunch?", "options": ["Cafeteria (食堂)", "Office", "Home", "Restaurant"], "correctAnswer": "Cafeteria (食堂)", "explanation": "文章「食堂で食べます」より Cafeteria が正解です。"},
  {"id": "jft_set2_39", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【読解 Q39】＜お知らせ＞ 市役所は 土曜日・日曜日・祝日は お休みです。受付時間は 8:30〜17:15です。\n\n質問: 市役所が 開いている 時間は いつですか。", "options": ["8:30〜17:15", "9:00〜18:00", "10:00〜16:00", "終日24時間"], "correctAnswer": "8:30〜17:15", "explanation": "「8:30〜17:15」が正解です。"},
  {"id": "jft_set2_40", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【読解 Q40】＜ゴミ出しルール＞ 燃えないゴミは 毎月 第2・第4水曜日の 朝 8時までに 出してください。\n\n質問: 燃えないゴミを 出すのは いつですか。", "options": ["第2・第4水曜日", "毎週月曜日", "毎週金曜日", "毎日"], "correctAnswer": "第2・第4水曜日", "explanation": "「第2・第4水曜日」が正解です。"},
  {"id": "jft_set2_41", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【読解 Q41】＜案内＞ 会社内は すべて 禁煙です。タバコは 屋外の 喫煙所で 吸ってください。\n\n質問: タバコは どこで 吸えますか。", "options": ["屋外の喫煙所", "自分のデスク", "会議室", "食堂"], "correctAnswer": "屋外の喫煙所", "explanation": "「屋外の喫煙所」が正解です。"},
  {"id": "jft_set2_42", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【読解 Q42】＜割引券＞ 【ラーメン100円引き】※他券併用不可。有効期限：今年度末まで。\n\n質問: この券を使うと 何円 安くなりますか。", "options": ["100円", "200円", "半額", "無料"], "correctAnswer": "100円", "explanation": "「100円引き」が正解です。"},
  {"id": "jft_set2_43", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【読解 Q43】＜注意＞ 工場内では 安全靴を 履いてください。サンダルで 入ってはいけません。\n\n質問: 工場内で 履いてはいけないものは 何ですか。", "options": ["サンダル", "安全靴", "靴下", "長靴"], "correctAnswer": "サンダル", "explanation": "「サンダルで入ってはいけません」より サンダル が正解です。"},
  {"id": "jft_set2_44", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【読解 Q44】＜電車運行情報＞ 事故のため、A線は 運転を見合わせています。復旧は 15時の 予定です。\n\n質問: 電車が 再び 動き始める 予定は何時ですか。", "options": ["15時", "12時", "18時", "明日"], "correctAnswer": "15時", "explanation": "「復旧は15時の予定」より 15時 が正解です。"},
  {"id": "jft_set2_45", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【読解 Q45】＜健康メモ＞ 睡眠時間を 毎日 7時間以上 とりましょう。夜遅くの スマホは 控えましょう。\n\n質問: 夜遅くに 控えるべきことは 何ですか。", "options": ["スマホを見ること", "寝ること", "水を飲むこと", "風呂に入ること"], "correctAnswer": "スマホを見ること", "explanation": "「夜遅くのスマホは控えましょう」が正解です。"},
  {"id": "jft_set2_46", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【読解 Q46】＜メール＞ 佐藤さん、明日の 研修資料を 印刷して 10部 準備してください。\n\n質問: 佐藤さんは 資料を 何部 作りますか。", "options": ["5部", "10部", "15部", "20部"], "correctAnswer": "10部", "explanation": "「10部準備してください」が正解です。"},
  {"id": "jft_set2_47", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【読解 Q47】＜貼り紙＞ 本日の 営業は 台風のため 15時で 終了いたします。\n\n質問: 本日は 何時に 店が 閉まりますか。", "options": ["15時", "17時", "20時", "閉まらない"], "correctAnswer": "15時", "explanation": "「15時で終了いたします」より 15時 が正解です。"},
  {"id": "jft_set2_48", "level": "JFT", "mockSet": "JFT_SET_2", "type": "MULTIPLE_CHOICE", "prompt": "[Set 2] 【読解 Q48】＜マンション掲示＞ 清掃作業のため 10:00〜12:00 は 断水（水が出ない）します。\n\n質問: 水が 出なくなる 時間は いつですか。", "options": ["10:00〜12:00", "8:00〜10:00", "12:00〜14:00", "終日"], "correctAnswer": "10:00〜12:00", "explanation": "「10:00〜12:00は断水します」が正解です。"},
  {"id": "jft_set3_1", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【文字・語彙 Q1】Choose the correct reading of 病院.", "options": ["びょういん", "びよういん", "こうえん", "がっこう"], "correctAnswer": "びょういん", "explanation": "「病院」の読み方は「びょういん」(Hospital)です。"},
  {"id": "jft_set3_2", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【文字・語彙 Q2】Choose the correct meaning of 会社.", "options": ["Company", "School", "Library", "Bank"], "correctAnswer": "Company", "explanation": "「会社」(かいしゃ) means Company."},
  {"id": "jft_set3_3", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【文字・語彙 Q3】毎日 8時に 会社へ（　　　）。", "options": ["行きます", "食べます", "飲みます", "買います"], "correctAnswer": "行きます", "explanation": "「会社へ行きます」が適切です。"},
  {"id": "jft_set3_4", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【文字・語彙 Q4】Which word means \"traffic light\"?", "options": ["信号", "交差点", "道路", "駅"], "correctAnswer": "信号", "explanation": "「信号」(しんごう) means Traffic light."},
  {"id": "jft_set3_5", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【文字・語彙 Q5】Choose the correct kanji for あした.", "options": ["明日", "今日", "昨日", "毎日"], "correctAnswer": "明日", "explanation": "「あした」(Tomorrow)の漢字は「明日」です。"},
  {"id": "jft_set3_6", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【文字・語彙 Q6】Choose the opposite of 暑い.", "options": ["寒い", "高い", "安い", "狭い"], "correctAnswer": "寒い", "explanation": "「暑い」(Hot)の反対語は「寒い」(Cold)です。"},
  {"id": "jft_set3_7", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【文字・語彙 Q7】Which word means \"gloves\"?", "options": ["手袋", "靴", "帽子", "眼鏡"], "correctAnswer": "手袋", "explanation": "「手袋」(てぶくろ) means Gloves."},
  {"id": "jft_set3_8", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【文字・語彙 Q8】この 機械は（　　　）です。", "options": ["安全", "食べます", "行きます", "見ます"], "correctAnswer": "安全", "explanation": "「この機械は安全です」が適切です。"},
  {"id": "jft_set3_9", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【文字・語彙 Q9】Choose the correct reading of 火.", "options": ["ひ", "みず", "き", "つち"], "correctAnswer": "ひ", "explanation": "「火」の読み方は「ひ」(Fire)です。"},
  {"id": "jft_set3_10", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【文字・語彙 Q10】Which word means \"meeting room\"?", "options": ["会議室", "食堂", "受付", "駐車場"], "correctAnswer": "会議室", "explanation": "「会議室」(かいぎしつ) means Meeting room."},
  {"id": "jft_set3_11", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【文字・語彙 Q11】仕事の あとで（　　　）。", "options": ["休みます", "起きます", "書きます", "読みます"], "correctAnswer": "休みます", "explanation": "「仕事のあとで休みます」が適切です。"},
  {"id": "jft_set3_12", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【文字・語彙 Q12】Which word means \"next week\"?", "options": ["来週", "今週", "先週", "毎週"], "correctAnswer": "来週", "explanation": "「来週」(らいしゅう) means Next week."},
  {"id": "jft_set3_13", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【会話・表現 Q13】A: こんばんは。\nB: （　　　）", "options": ["こんばんは。", "おはようございます。", "さようなら。", "おやすみなさい。"], "correctAnswer": "こんばんは。", "explanation": "夜の挨拶「こんばんは」に対する返答です。"},
  {"id": "jft_set3_14", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【会話・表現 Q14】Someone says \"すみません.\" You reply:", "options": ["いいえ、大丈夫ですよ。", "ありがとうございます。", "おめでとうございます。", "いただきます。"], "correctAnswer": "いいえ、大丈夫ですよ。", "explanation": "謝罪・お詫びに対する返答「いいえ、大丈夫ですよ」が適切です。"},
  {"id": "jft_set3_15", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【会話・表現 Q15】A: お仕事は 何ですか。\nB: （　　　）", "options": ["エンジニアです。", "日本人です。", "東京です。", "20歳です。"], "correctAnswer": "エンジニアです。", "explanation": "職業を聞かれているので「エンジニアです」と答えます。"},
  {"id": "jft_set3_16", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【会話・表現 Q16】You want to ask for permission to take a photo.", "options": ["写真を 撮っても いいですか。", "写真を 撮ります。", "写真が あります。", "写真でした。"], "correctAnswer": "写真を 撮っても いいですか。", "explanation": "許可を求める表現「〜てもいいですか」が適切です。"},
  {"id": "jft_set3_17", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【会話・表現 Q17】Which expression is used before eating a meal?", "options": ["いただきます。", "ごちそうさまでした。", "いってきます。", "ただいま。"], "correctAnswer": "いただきます。", "explanation": "食事を始める前の挨拶は「いただきます」です。"},
  {"id": "jft_set3_18", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【会話・表現 Q18】A:「手伝いましょうか。」\nB:「（　　　）。」", "options": ["ありがとうございます。お願いします", "手伝いません", "要りません", "手伝ってください"], "correctAnswer": "ありがとうございます。お願いします", "explanation": "親切な申し出への感謝の返答です。"},
  {"id": "jft_set3_19", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【会話・表現 Q19】A:「コーヒーと 紅茶、どちらが いいですか。」\nB:「（　　　）。」", "options": ["コーヒーを お願いします", "いいえ、どちらでもないです", "はい、そうです", "美味しくないです"], "correctAnswer": "コーヒーを お願いします", "explanation": "選択肢に対する注文表現です。"},
  {"id": "jft_set3_20", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【会話・表現 Q20】A:「休んでも いいですか。」\nB:「（　　　）。」", "options": ["ええ、どうぞ。お大事に", "いいえ、休みます", "はい、仕事です", "ダメでした"], "correctAnswer": "ええ、どうぞ。お大事に", "explanation": "体調不良による休養許可「ええ、どうぞ。お大事に」が適切です。"},
  {"id": "jft_set3_21", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【会話・表現 Q21】A:「タクシーを 呼びましょうか。」\nB:「（　　　）。」", "options": ["あ、助かります。お願いします", "呼べません", "タクシーです", "知りません"], "correctAnswer": "あ、助かります。お願いします", "explanation": "親切な提案に対する快諾「あ、助かります。お願いします」が適切です。"},
  {"id": "jft_set3_22", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【会話・表現 Q22】A:「ごちそうさまでした！」\nB:「（　　　）。」", "options": ["お粗末様でした", "いただきます", "いってらっしゃい", "はじめまして"], "correctAnswer": "お粗末様でした", "explanation": "食後の感謝への返答です。"},
  {"id": "jft_set3_23", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【会話・表現 Q23】A:「どのくらい 日本語を 勉強しましたか。」\nB:「（　　　）。」", "options": ["1年くらいです", "1人くらいです", "1冊くらいです", "1本くらいです"], "correctAnswer": "1年くらいです", "explanation": "期間を聞かれているので「1年くらいです」が正解です。"},
  {"id": "jft_set3_24", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【会話・表現 Q24】A:「お先に 失礼します。」\nB:「（　　　）。」", "options": ["お疲れ様でした！", "はじめまして！", "いただきます！", "すみません！"], "correctAnswer": "お疲れ様でした！", "explanation": "退社時の挨拶に対する言葉です。"},
  {"id": "jft_set3_25", "level": "JFT", "mockSet": "JFT_SET_3", "type": "LISTENING", "prompt": "[Set 3] 【聴解 Q25】A: 牛乳を 買います。\nB: はい。\n\n質問: What will A buy?", "options": ["Juice", "Milk", "Water", "Tea"], "correctAnswer": "Milk", "explanation": "「牛乳」(Milk)が正解です。"},
  {"id": "jft_set3_26", "level": "JFT", "mockSet": "JFT_SET_3", "type": "LISTENING", "prompt": "[Set 3] 【聴解 Q26】A: 何を 食べますか。\nB: ラーメンを お願いします。\n\n質問: What will B eat?", "options": ["Sushi", "Ramen", "Tempura", "Soba"], "correctAnswer": "Ramen", "explanation": "「ラーメン」が正解です。"},
  {"id": "jft_set3_27", "level": "JFT", "mockSet": "JFT_SET_3", "type": "LISTENING", "prompt": "[Set 3] 【聴解 Q27】A: 今日は 何日ですか。\nB: 15日ですよ。\n\n質問: What is the date today?", "options": ["5th", "10th", "15th", "20th"], "correctAnswer": "15th", "explanation": "「15日」が正解です。"},
  {"id": "jft_set3_28", "level": "JFT", "mockSet": "JFT_SET_3", "type": "LISTENING", "prompt": "[Set 3] 【聴解 Q28】A: 会議は 何時からですか。\nB: 2時からです。\n\n質問: What time does the meeting start?", "options": ["1:00", "2:00", "3:00", "4:00"], "correctAnswer": "2:00", "explanation": "「2時から」が正解です。"},
  {"id": "jft_set3_29", "level": "JFT", "mockSet": "JFT_SET_3", "type": "LISTENING", "prompt": "[Set 3] 【聴解 Q29】A: どこで 買いましたか。\nB: デパートで 買いました。\n\n質問: Where did B buy it?", "options": ["Supermarket", "Department store", "Convenience store", "Market"], "correctAnswer": "Department store", "explanation": "「デパート」(Department store)が正解です。"},
  {"id": "jft_set3_30", "level": "JFT", "mockSet": "JFT_SET_3", "type": "LISTENING", "prompt": "[Set 3] 【聴解 Q30】A: 切符は いくらですか。\nB: 240円です。\n\n質問: How much is the ticket?", "options": ["140 Yen", "240 Yen", "340 Yen", "440 Yen"], "correctAnswer": "240 Yen", "explanation": "「240円」が正解です。"},
  {"id": "jft_set3_31", "level": "JFT", "mockSet": "JFT_SET_3", "type": "LISTENING", "prompt": "[Set 3] 【聴解 Q31】A: 日本の 生活は どうですか。\nB: とても 楽しいです。\n\n質問: How is life in Japan?", "options": ["Difficult", "Very enjoyable", "Busy", "Cold"], "correctAnswer": "Very enjoyable", "explanation": "「とても楽しいです」(Very enjoyable)が正解です。"},
  {"id": "jft_set3_32", "level": "JFT", "mockSet": "JFT_SET_3", "type": "LISTENING", "prompt": "[Set 3] 【聴解 Q32】A: どうやって 工場へ 行きますか。\nB: 自転車で行きます。\n\n質問: How does B go to the factory?", "options": ["Walk", "Bicycle", "Bus", "Train"], "correctAnswer": "Bicycle", "explanation": "「自転車」(Bicycle)が正解です。"},
  {"id": "jft_set3_33", "level": "JFT", "mockSet": "JFT_SET_3", "type": "LISTENING", "prompt": "[Set 3] 【聴解 Q33】A: 部屋に 何が ありますか。\nB: ベッドと テレビが あります。\n\n質問: What is in the room?", "options": ["Bed & TV", "Desk & Chair", "Sofa & Table", "Fridge & Clock"], "correctAnswer": "Bed & TV", "explanation": "「ベッドとテレビ」が正解です。"},
  {"id": "jft_set3_34", "level": "JFT", "mockSet": "JFT_SET_3", "type": "LISTENING", "prompt": "[Set 3] 【聴解 Q34】A: 休みは 何曜日ですか。\nB: 土曜日と 日曜日です。\n\n質問: When are the days off?", "options": ["Monday & Tuesday", "Saturday & Sunday", "Wednesday & Friday", "Everyday"], "correctAnswer": "Saturday & Sunday", "explanation": "「土曜日と日曜日」が正解です。"},
  {"id": "jft_set3_35", "level": "JFT", "mockSet": "JFT_SET_3", "type": "LISTENING", "prompt": "[Set 3] 【聴解 Q35】A: メガネは どこですか。\nB: 鞄の中に あります。\n\n質問: Where are the glasses?", "options": ["On the table", "In the bag", "On the bed", "Under the chair"], "correctAnswer": "In the bag", "explanation": "「鞄の中」(In the bag)が正解です。"},
  {"id": "jft_set3_36", "level": "JFT", "mockSet": "JFT_SET_3", "type": "LISTENING", "prompt": "[Set 3] 【聴解 Q36】A: 昨日の 夜、何を しましたか。\nB: テレビで サッカーの 試合を 見ました。\n\n質問: What did B do last night?", "options": ["Studied Japanese", "Watched soccer match on TV", "Cooked dinner", "Went to sleep early"], "correctAnswer": "Watched soccer match on TV", "explanation": "「テレビでサッカーの試合を見ました」が正解です。"},
  {"id": "jft_set3_37", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【読解 Q37】＜文章＞ ジョンさんは エンジニアです。毎日 8時半に 工場へ 行きます。昼ご飯は 食堂で 食べます。\n\n質問: What is John's job?", "options": ["Teacher", "Engineer", "Doctor", "Driver"], "correctAnswer": "Engineer", "explanation": "文章「エンジニアです」より Engineer が正解です。"},
  {"id": "jft_set3_38", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【読解 Q38】＜文章＞ ジョンさんは エンジニアです。毎日 8時半に 工場へ 行きます。昼ご飯は 食堂で 食べます。\n\n質問: Where does he eat lunch?", "options": ["Cafeteria (食堂)", "Office", "Home", "Restaurant"], "correctAnswer": "Cafeteria (食堂)", "explanation": "文章「食堂で食べます」より Cafeteria が正解です。"},
  {"id": "jft_set3_39", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【読解 Q39】＜お知らせ＞ 市役所は 土曜日・日曜日・祝日は お休みです。受付時間は 8:30〜17:15です。\n\n質問: 市役所が 開いている 時間は いつですか。", "options": ["8:30〜17:15", "9:00〜18:00", "10:00〜16:00", "終日24時間"], "correctAnswer": "8:30〜17:15", "explanation": "「8:30〜17:15」が正解です。"},
  {"id": "jft_set3_40", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【読解 Q40】＜ゴミ出しルール＞ 燃えないゴミは 毎月 第2・第4水曜日の 朝 8時までに 出してください。\n\n質問: 燃えないゴミを 出すのは いつですか。", "options": ["第2・第4水曜日", "毎週月曜日", "毎週金曜日", "毎日"], "correctAnswer": "第2・第4水曜日", "explanation": "「第2・第4水曜日」が正解です。"},
  {"id": "jft_set3_41", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【読解 Q41】＜案内＞ 会社内は すべて 禁煙です。タバコは 屋外の 喫煙所で 吸ってください。\n\n質問: タバコは どこで 吸えますか。", "options": ["屋外の喫煙所", "自分のデスク", "会議室", "食堂"], "correctAnswer": "屋外の喫煙所", "explanation": "「屋外の喫煙所」が正解です。"},
  {"id": "jft_set3_42", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【読解 Q42】＜割引券＞ 【ラーメン100円引き】※他券併用不可。有効期限：今年度末まで。\n\n質問: この券を使うと 何円 安くなりますか。", "options": ["100円", "200円", "半額", "無料"], "correctAnswer": "100円", "explanation": "「100円引き」が正解です。"},
  {"id": "jft_set3_43", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【読解 Q43】＜注意＞ 工場内では 安全靴を 履いてください。サンダルで 入ってはいけません。\n\n質問: 工場内で 履いてはいけないものは 何ですか。", "options": ["サンダル", "安全靴", "靴下", "長靴"], "correctAnswer": "サンダル", "explanation": "「サンダルで入ってはいけません」より サンダル が正解です。"},
  {"id": "jft_set3_44", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【読解 Q44】＜電車運行情報＞ 事故のため、A線は 運転を見合わせています。復旧は 15時の 予定です。\n\n質問: 電車が 再び 動き始める 予定は何時ですか。", "options": ["15時", "12時", "18時", "明日"], "correctAnswer": "15時", "explanation": "「復旧は15時の予定」より 15時 が正解です。"},
  {"id": "jft_set3_45", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【読解 Q45】＜健康メモ＞ 睡眠時間を 毎日 7時間以上 とりましょう。夜遅くの スマホは 控えましょう。\n\n質問: 夜遅くに 控えるべきことは 何ですか。", "options": ["スマホを見ること", "寝ること", "水を飲むこと", "風呂に入ること"], "correctAnswer": "スマホを見ること", "explanation": "「夜遅くのスマホは控えましょう」が正解です。"},
  {"id": "jft_set3_46", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【読解 Q46】＜メール＞ 佐藤さん、明日の 研修資料を 印刷して 10部 準備してください。\n\n質問: 佐藤さんは 資料を 何部 作りますか。", "options": ["5部", "10部", "15部", "20部"], "correctAnswer": "10部", "explanation": "「10部準備してください」が正解です。"},
  {"id": "jft_set3_47", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【読解 Q47】＜貼り紙＞ 本日の 営業は 台風のため 15時で 終了いたします。\n\n質問: 本日は 何時に 店が 閉まりますか。", "options": ["15時", "17時", "20時", "閉まらない"], "correctAnswer": "15時", "explanation": "「15時で終了いたします」より 15時 が正解です。"},
  {"id": "jft_set3_48", "level": "JFT", "mockSet": "JFT_SET_3", "type": "MULTIPLE_CHOICE", "prompt": "[Set 3] 【読解 Q48】＜マンション掲示＞ 清掃作業のため 10:00〜12:00 は 断水（水が出ない）します。\n\n質問: 水が 出なくなる 時間は いつですか。", "options": ["10:00〜12:00", "8:00〜10:00", "12:00〜14:00", "終日"], "correctAnswer": "10:00〜12:00", "explanation": "「10:00〜12:00は断水します」が正解です。"},
  {"id": "jft_set4_1", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【文字・語彙 Q1】Choose the correct reading of 病院.", "options": ["びょういん", "びよういん", "こうえん", "がっこう"], "correctAnswer": "びょういん", "explanation": "「病院」の読み方は「びょういん」(Hospital)です。"},
  {"id": "jft_set4_2", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【文字・語彙 Q2】Choose the correct meaning of 会社.", "options": ["Company", "School", "Library", "Bank"], "correctAnswer": "Company", "explanation": "「会社」(かいしゃ) means Company."},
  {"id": "jft_set4_3", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【文字・語彙 Q3】毎日 8時に 会社へ（　　　）。", "options": ["行きます", "食べます", "飲みます", "買います"], "correctAnswer": "行きます", "explanation": "「会社へ行きます」が適切です。"},
  {"id": "jft_set4_4", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【文字・語彙 Q4】Which word means \"traffic light\"?", "options": ["信号", "交差点", "道路", "駅"], "correctAnswer": "信号", "explanation": "「信号」(しんごう) means Traffic light."},
  {"id": "jft_set4_5", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【文字・語彙 Q5】Choose the correct kanji for あした.", "options": ["明日", "今日", "昨日", "毎日"], "correctAnswer": "明日", "explanation": "「あした」(Tomorrow)の漢字は「明日」です。"},
  {"id": "jft_set4_6", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【文字・語彙 Q6】Choose the opposite of 暑い.", "options": ["寒い", "高い", "安い", "狭い"], "correctAnswer": "寒い", "explanation": "「暑い」(Hot)の反対語は「寒い」(Cold)です。"},
  {"id": "jft_set4_7", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【文字・語彙 Q7】Which word means \"gloves\"?", "options": ["手袋", "靴", "帽子", "眼鏡"], "correctAnswer": "手袋", "explanation": "「手袋」(てぶくろ) means Gloves."},
  {"id": "jft_set4_8", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【文字・語彙 Q8】この 機械は（　　　）です。", "options": ["安全", "食べます", "行きます", "見ます"], "correctAnswer": "安全", "explanation": "「この機械は安全です」が適切です。"},
  {"id": "jft_set4_9", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【文字・語彙 Q9】Choose the correct reading of 火.", "options": ["ひ", "みず", "き", "つち"], "correctAnswer": "ひ", "explanation": "「火」の読み方は「ひ」(Fire)です。"},
  {"id": "jft_set4_10", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【文字・語彙 Q10】Which word means \"meeting room\"?", "options": ["会議室", "食堂", "受付", "駐車場"], "correctAnswer": "会議室", "explanation": "「会議室」(かいぎしつ) means Meeting room."},
  {"id": "jft_set4_11", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【文字・語彙 Q11】仕事の あとで（　　　）。", "options": ["休みます", "起きます", "書きます", "読みます"], "correctAnswer": "休みます", "explanation": "「仕事のあとで休みます」が適切です。"},
  {"id": "jft_set4_12", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【文字・語彙 Q12】Which word means \"next week\"?", "options": ["来週", "今週", "先週", "毎週"], "correctAnswer": "来週", "explanation": "「来週」(らいしゅう) means Next week."},
  {"id": "jft_set4_13", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【会話・表現 Q13】A: こんばんは。\nB: （　　　）", "options": ["こんばんは。", "おはようございます。", "さようなら。", "おやすみなさい。"], "correctAnswer": "こんばんは。", "explanation": "夜の挨拶「こんばんは」に対する返答です。"},
  {"id": "jft_set4_14", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【会話・表現 Q14】Someone says \"すみません.\" You reply:", "options": ["いいえ、大丈夫ですよ。", "ありがとうございます。", "おめでとうございます。", "いただきます。"], "correctAnswer": "いいえ、大丈夫ですよ。", "explanation": "謝罪・お詫びに対する返答「いいえ、大丈夫ですよ」が適切です。"},
  {"id": "jft_set4_15", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【会話・表現 Q15】A: お仕事は 何ですか。\nB: （　　　）", "options": ["エンジニアです。", "日本人です。", "東京です。", "20歳です。"], "correctAnswer": "エンジニアです。", "explanation": "職業を聞かれているので「エンジニアです」と答えます。"},
  {"id": "jft_set4_16", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【会話・表現 Q16】You want to ask for permission to take a photo.", "options": ["写真を 撮っても いいですか。", "写真を 撮ります。", "写真が あります。", "写真でした。"], "correctAnswer": "写真を 撮っても いいですか。", "explanation": "許可を求める表現「〜てもいいですか」が適切です。"},
  {"id": "jft_set4_17", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【会話・表現 Q17】Which expression is used before eating a meal?", "options": ["いただきます。", "ごちそうさまでした。", "いってきます。", "ただいま。"], "correctAnswer": "いただきます。", "explanation": "食事を始める前の挨拶は「いただきます」です。"},
  {"id": "jft_set4_18", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【会話・表現 Q18】A:「手伝いましょうか。」\nB:「（　　　）。」", "options": ["ありがとうございます。お願いします", "手伝いません", "要りません", "手伝ってください"], "correctAnswer": "ありがとうございます。お願いします", "explanation": "親切な申し出への感謝の返答です。"},
  {"id": "jft_set4_19", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【会話・表現 Q19】A:「コーヒーと 紅茶、どちらが いいですか。」\nB:「（　　　）。」", "options": ["コーヒーを お願いします", "いいえ、どちらでもないです", "はい、そうです", "美味しくないです"], "correctAnswer": "コーヒーを お願いします", "explanation": "選択肢に対する注文表現です。"},
  {"id": "jft_set4_20", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【会話・表現 Q20】A:「休んでも いいですか。」\nB:「（　　　）。」", "options": ["ええ、どうぞ。お大事に", "いいえ、休みます", "はい、仕事です", "ダメでした"], "correctAnswer": "ええ、どうぞ。お大事に", "explanation": "体調不良による休養許可「ええ、どうぞ。お大事に」が適切です。"},
  {"id": "jft_set4_21", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【会話・表現 Q21】A:「タクシーを 呼びましょうか。」\nB:「（　　　）。」", "options": ["あ、助かります。お願いします", "呼べません", "タクシーです", "知りません"], "correctAnswer": "あ、助かります。お願いします", "explanation": "親切な提案に対する快諾「あ、助かります。お願いします」が適切です。"},
  {"id": "jft_set4_22", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【会話・表現 Q22】A:「ごちそうさまでした！」\nB:「（　　　）。」", "options": ["お粗末様でした", "いただきます", "いってらっしゃい", "はじめまして"], "correctAnswer": "お粗末様でした", "explanation": "食後の感謝への返答です。"},
  {"id": "jft_set4_23", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【会話・表現 Q23】A:「どのくらい 日本語を 勉強しましたか。」\nB:「（　　　）。」", "options": ["1年くらいです", "1人くらいです", "1冊くらいです", "1本くらいです"], "correctAnswer": "1年くらいです", "explanation": "期間を聞かれているので「1年くらいです」が正解です。"},
  {"id": "jft_set4_24", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【会話・表現 Q24】A:「お先に 失礼します。」\nB:「（　　　）。」", "options": ["お疲れ様でした！", "はじめまして！", "いただきます！", "すみません！"], "correctAnswer": "お疲れ様でした！", "explanation": "退社時の挨拶に対する言葉です。"},
  {"id": "jft_set4_25", "level": "JFT", "mockSet": "JFT_SET_4", "type": "LISTENING", "prompt": "[Set 4] 【聴解 Q25】A: 牛乳を 買います。\nB: はい。\n\n質問: What will A buy?", "options": ["Juice", "Milk", "Water", "Tea"], "correctAnswer": "Milk", "explanation": "「牛乳」(Milk)が正解です。"},
  {"id": "jft_set4_26", "level": "JFT", "mockSet": "JFT_SET_4", "type": "LISTENING", "prompt": "[Set 4] 【聴解 Q26】A: 何を 食べますか。\nB: ラーメンを お願いします。\n\n質問: What will B eat?", "options": ["Sushi", "Ramen", "Tempura", "Soba"], "correctAnswer": "Ramen", "explanation": "「ラーメン」が正解です。"},
  {"id": "jft_set4_27", "level": "JFT", "mockSet": "JFT_SET_4", "type": "LISTENING", "prompt": "[Set 4] 【聴解 Q27】A: 今日は 何日ですか。\nB: 15日ですよ。\n\n質問: What is the date today?", "options": ["5th", "10th", "15th", "20th"], "correctAnswer": "15th", "explanation": "「15日」が正解です。"},
  {"id": "jft_set4_28", "level": "JFT", "mockSet": "JFT_SET_4", "type": "LISTENING", "prompt": "[Set 4] 【聴解 Q28】A: 会議は 何時からですか。\nB: 2時からです。\n\n質問: What time does the meeting start?", "options": ["1:00", "2:00", "3:00", "4:00"], "correctAnswer": "2:00", "explanation": "「2時から」が正解です。"},
  {"id": "jft_set4_29", "level": "JFT", "mockSet": "JFT_SET_4", "type": "LISTENING", "prompt": "[Set 4] 【聴解 Q29】A: どこで 買いましたか。\nB: デパートで 買いました。\n\n質問: Where did B buy it?", "options": ["Supermarket", "Department store", "Convenience store", "Market"], "correctAnswer": "Department store", "explanation": "「デパート」(Department store)が正解です。"},
  {"id": "jft_set4_30", "level": "JFT", "mockSet": "JFT_SET_4", "type": "LISTENING", "prompt": "[Set 4] 【聴解 Q30】A: 切符は いくらですか。\nB: 240円です。\n\n質問: How much is the ticket?", "options": ["140 Yen", "240 Yen", "340 Yen", "440 Yen"], "correctAnswer": "240 Yen", "explanation": "「240円」が正解です。"},
  {"id": "jft_set4_31", "level": "JFT", "mockSet": "JFT_SET_4", "type": "LISTENING", "prompt": "[Set 4] 【聴解 Q31】A: 日本の 生活は どうですか。\nB: とても 楽しいです。\n\n質問: How is life in Japan?", "options": ["Difficult", "Very enjoyable", "Busy", "Cold"], "correctAnswer": "Very enjoyable", "explanation": "「とても楽しいです」(Very enjoyable)が正解です。"},
  {"id": "jft_set4_32", "level": "JFT", "mockSet": "JFT_SET_4", "type": "LISTENING", "prompt": "[Set 4] 【聴解 Q32】A: どうやって 工場へ 行きますか。\nB: 自転車で行きます。\n\n質問: How does B go to the factory?", "options": ["Walk", "Bicycle", "Bus", "Train"], "correctAnswer": "Bicycle", "explanation": "「自転車」(Bicycle)が正解です。"},
  {"id": "jft_set4_33", "level": "JFT", "mockSet": "JFT_SET_4", "type": "LISTENING", "prompt": "[Set 4] 【聴解 Q33】A: 部屋に 何が ありますか。\nB: ベッドと テレビが あります。\n\n質問: What is in the room?", "options": ["Bed & TV", "Desk & Chair", "Sofa & Table", "Fridge & Clock"], "correctAnswer": "Bed & TV", "explanation": "「ベッドとテレビ」が正解です。"},
  {"id": "jft_set4_34", "level": "JFT", "mockSet": "JFT_SET_4", "type": "LISTENING", "prompt": "[Set 4] 【聴解 Q34】A: 休みは 何曜日ですか。\nB: 土曜日と 日曜日です。\n\n質問: When are the days off?", "options": ["Monday & Tuesday", "Saturday & Sunday", "Wednesday & Friday", "Everyday"], "correctAnswer": "Saturday & Sunday", "explanation": "「土曜日と日曜日」が正解です。"},
  {"id": "jft_set4_35", "level": "JFT", "mockSet": "JFT_SET_4", "type": "LISTENING", "prompt": "[Set 4] 【聴解 Q35】A: メガネは どこですか。\nB: 鞄の中に あります。\n\n質問: Where are the glasses?", "options": ["On the table", "In the bag", "On the bed", "Under the chair"], "correctAnswer": "In the bag", "explanation": "「鞄の中」(In the bag)が正解です。"},
  {"id": "jft_set4_36", "level": "JFT", "mockSet": "JFT_SET_4", "type": "LISTENING", "prompt": "[Set 4] 【聴解 Q36】A: 昨日の 夜、何を しましたか。\nB: テレビで サッカーの 試合を 見ました。\n\n質問: What did B do last night?", "options": ["Studied Japanese", "Watched soccer match on TV", "Cooked dinner", "Went to sleep early"], "correctAnswer": "Watched soccer match on TV", "explanation": "「テレビでサッカーの試合を見ました」が正解です。"},
  {"id": "jft_set4_37", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【読解 Q37】＜文章＞ ジョンさんは エンジニアです。毎日 8時半に 工場へ 行きます。昼ご飯は 食堂で 食べます。\n\n質問: What is John's job?", "options": ["Teacher", "Engineer", "Doctor", "Driver"], "correctAnswer": "Engineer", "explanation": "文章「エンジニアです」より Engineer が正解です。"},
  {"id": "jft_set4_38", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【読解 Q38】＜文章＞ ジョンさんは エンジニアです。毎日 8時半に 工場へ 行きます。昼ご飯は 食堂で 食べます。\n\n質問: Where does he eat lunch?", "options": ["Cafeteria (食堂)", "Office", "Home", "Restaurant"], "correctAnswer": "Cafeteria (食堂)", "explanation": "文章「食堂で食べます」より Cafeteria が正解です。"},
  {"id": "jft_set4_39", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【読解 Q39】＜お知らせ＞ 市役所は 土曜日・日曜日・祝日は お休みです。受付時間は 8:30〜17:15です。\n\n質問: 市役所が 開いている 時間は いつですか。", "options": ["8:30〜17:15", "9:00〜18:00", "10:00〜16:00", "終日24時間"], "correctAnswer": "8:30〜17:15", "explanation": "「8:30〜17:15」が正解です。"},
  {"id": "jft_set4_40", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【読解 Q40】＜ゴミ出しルール＞ 燃えないゴミは 毎月 第2・第4水曜日の 朝 8時までに 出してください。\n\n質問: 燃えないゴミを 出すのは いつですか。", "options": ["第2・第4水曜日", "毎週月曜日", "毎週金曜日", "毎日"], "correctAnswer": "第2・第4水曜日", "explanation": "「第2・第4水曜日」が正解です。"},
  {"id": "jft_set4_41", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【読解 Q41】＜案内＞ 会社内は すべて 禁煙です。タバコは 屋外の 喫煙所で 吸ってください。\n\n質問: タバコは どこで 吸えますか。", "options": ["屋外の喫煙所", "自分のデスク", "会議室", "食堂"], "correctAnswer": "屋外の喫煙所", "explanation": "「屋外の喫煙所」が正解です。"},
  {"id": "jft_set4_42", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【読解 Q42】＜割引券＞ 【ラーメン100円引き】※他券併用不可。有効期限：今年度末まで。\n\n質問: この券を使うと 何円 安くなりますか。", "options": ["100円", "200円", "半額", "無料"], "correctAnswer": "100円", "explanation": "「100円引き」が正解です。"},
  {"id": "jft_set4_43", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【読解 Q43】＜注意＞ 工場内では 安全靴を 履いてください。サンダルで 入ってはいけません。\n\n質問: 工場内で 履いてはいけないものは 何ですか。", "options": ["サンダル", "安全靴", "靴下", "長靴"], "correctAnswer": "サンダル", "explanation": "「サンダルで入ってはいけません」より サンダル が正解です。"},
  {"id": "jft_set4_44", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【読解 Q44】＜電車運行情報＞ 事故のため、A線は 運転を見合わせています。復旧は 15時の 予定です。\n\n質問: 電車が 再び 動き始める 予定は何時ですか。", "options": ["15時", "12時", "18時", "明日"], "correctAnswer": "15時", "explanation": "「復旧は15時の予定」より 15時 が正解です。"},
  {"id": "jft_set4_45", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【読解 Q45】＜健康メモ＞ 睡眠時間を 毎日 7時間以上 とりましょう。夜遅くの スマホは 控えましょう。\n\n質問: 夜遅くに 控えるべきことは 何ですか。", "options": ["スマホを見ること", "寝ること", "水を飲むこと", "風呂に入ること"], "correctAnswer": "スマホを見ること", "explanation": "「夜遅くのスマホは控えましょう」が正解です。"},
  {"id": "jft_set4_46", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【読解 Q46】＜メール＞ 佐藤さん、明日の 研修資料を 印刷して 10部 準備してください。\n\n質問: 佐藤さんは 資料を 何部 作りますか。", "options": ["5部", "10部", "15部", "20部"], "correctAnswer": "10部", "explanation": "「10部準備してください」が正解です。"},
  {"id": "jft_set4_47", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【読解 Q47】＜貼り紙＞ 本日の 営業は 台風のため 15時で 終了いたします。\n\n質問: 本日は 何時に 店が 閉まりますか。", "options": ["15時", "17時", "20時", "閉まらない"], "correctAnswer": "15時", "explanation": "「15時で終了いたします」より 15時 が正解です。"},
  {"id": "jft_set4_48", "level": "JFT", "mockSet": "JFT_SET_4", "type": "MULTIPLE_CHOICE", "prompt": "[Set 4] 【読解 Q48】＜マンション掲示＞ 清掃作業のため 10:00〜12:00 は 断水（水が出ない）します。\n\n質問: 水が 出なくなる 時間は いつですか。", "options": ["10:00〜12:00", "8:00〜10:00", "12:00〜14:00", "終日"], "correctAnswer": "10:00〜12:00", "explanation": "「10:00〜12:00は断水します」が正解です。"},
  {"id": "jft_set5_1", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【文字・語彙 Q1】Choose the correct reading of 病院.", "options": ["びょういん", "びよういん", "こうえん", "がっこう"], "correctAnswer": "びょういん", "explanation": "「病院」の読み方は「びょういん」(Hospital)です。"},
  {"id": "jft_set5_2", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【文字・語彙 Q2】Choose the correct meaning of 会社.", "options": ["Company", "School", "Library", "Bank"], "correctAnswer": "Company", "explanation": "「会社」(かいしゃ) means Company."},
  {"id": "jft_set5_3", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【文字・語彙 Q3】毎日 8時に 会社へ（　　　）。", "options": ["行きます", "食べます", "飲みます", "買います"], "correctAnswer": "行きます", "explanation": "「会社へ行きます」が適切です。"},
  {"id": "jft_set5_4", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【文字・語彙 Q4】Which word means \"traffic light\"?", "options": ["信号", "交差点", "道路", "駅"], "correctAnswer": "信号", "explanation": "「信号」(しんごう) means Traffic light."},
  {"id": "jft_set5_5", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【文字・語彙 Q5】Choose the correct kanji for あした.", "options": ["明日", "今日", "昨日", "毎日"], "correctAnswer": "明日", "explanation": "「あした」(Tomorrow)の漢字は「明日」です。"},
  {"id": "jft_set5_6", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【文字・語彙 Q6】Choose the opposite of 暑い.", "options": ["寒い", "高い", "安い", "狭い"], "correctAnswer": "寒い", "explanation": "「暑い」(Hot)の反対語は「寒い」(Cold)です。"},
  {"id": "jft_set5_7", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【文字・語彙 Q7】Which word means \"gloves\"?", "options": ["手袋", "靴", "帽子", "眼鏡"], "correctAnswer": "手袋", "explanation": "「手袋」(てぶくろ) means Gloves."},
  {"id": "jft_set5_8", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【文字・語彙 Q8】この 機械は（　　　）です。", "options": ["安全", "食べます", "行きます", "見ます"], "correctAnswer": "安全", "explanation": "「この機械は安全です」が適切です。"},
  {"id": "jft_set5_9", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【文字・語彙 Q9】Choose the correct reading of 火.", "options": ["ひ", "みず", "き", "つち"], "correctAnswer": "ひ", "explanation": "「火」の読み方は「ひ」(Fire)です。"},
  {"id": "jft_set5_10", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【文字・語彙 Q10】Which word means \"meeting room\"?", "options": ["会議室", "食堂", "受付", "駐車場"], "correctAnswer": "会議室", "explanation": "「会議室」(かいぎしつ) means Meeting room."},
  {"id": "jft_set5_11", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【文字・語彙 Q11】仕事の あとで（　　　）。", "options": ["休みます", "起きます", "書きます", "読みます"], "correctAnswer": "休みます", "explanation": "「仕事のあとで休みます」が適切です。"},
  {"id": "jft_set5_12", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【文字・語彙 Q12】Which word means \"next week\"?", "options": ["来週", "今週", "先週", "毎週"], "correctAnswer": "来週", "explanation": "「来週」(らいしゅう) means Next week."},
  {"id": "jft_set5_13", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【会話・表現 Q13】A: こんばんは。\nB: （　　　）", "options": ["こんばんは。", "おはようございます。", "さようなら。", "おやすみなさい。"], "correctAnswer": "こんばんは。", "explanation": "夜の挨拶「こんばんは」に対する返答です。"},
  {"id": "jft_set5_14", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【会話・表現 Q14】Someone says \"すみません.\" You reply:", "options": ["いいえ、大丈夫ですよ。", "ありがとうございます。", "おめでとうございます。", "いただきます。"], "correctAnswer": "いいえ、大丈夫ですよ。", "explanation": "謝罪・お詫びに対する返答「いいえ、大丈夫ですよ」が適切です。"},
  {"id": "jft_set5_15", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【会話・表現 Q15】A: お仕事は 何ですか。\nB: （　　　）", "options": ["エンジニアです。", "日本人です。", "東京です。", "20歳です。"], "correctAnswer": "エンジニアです。", "explanation": "職業を聞かれているので「エンジニアです」と答えます。"},
  {"id": "jft_set5_16", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【会話・表現 Q16】You want to ask for permission to take a photo.", "options": ["写真を 撮っても いいですか。", "写真を 撮ります。", "写真が あります。", "写真でした。"], "correctAnswer": "写真を 撮っても いいですか。", "explanation": "許可を求める表現「〜てもいいですか」が適切です。"},
  {"id": "jft_set5_17", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【会話・表現 Q17】Which expression is used before eating a meal?", "options": ["いただきます。", "ごちそうさまでした。", "いってきます。", "ただいま。"], "correctAnswer": "いただきます。", "explanation": "食事を始める前の挨拶は「いただきます」です。"},
  {"id": "jft_set5_18", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【会話・表現 Q18】A:「手伝いましょうか。」\nB:「（　　　）。」", "options": ["ありがとうございます。お願いします", "手伝いません", "要りません", "手伝ってください"], "correctAnswer": "ありがとうございます。お願いします", "explanation": "親切な申し出への感謝の返答です。"},
  {"id": "jft_set5_19", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【会話・表現 Q19】A:「コーヒーと 紅茶、どちらが いいですか。」\nB:「（　　　）。」", "options": ["コーヒーを お願いします", "いいえ、どちらでもないです", "はい、そうです", "美味しくないです"], "correctAnswer": "コーヒーを お願いします", "explanation": "選択肢に対する注文表現です。"},
  {"id": "jft_set5_20", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【会話・表現 Q20】A:「休んでも いいですか。」\nB:「（　　　）。」", "options": ["ええ、どうぞ。お大事に", "いいえ、休みます", "はい、仕事です", "ダメでした"], "correctAnswer": "ええ、どうぞ。お大事に", "explanation": "体調不良による休養許可「ええ、どうぞ。お大事に」が適切です。"},
  {"id": "jft_set5_21", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【会話・表現 Q21】A:「タクシーを 呼びましょうか。」\nB:「（　　　）。」", "options": ["あ、助かります。お願いします", "呼べません", "タクシーです", "知りません"], "correctAnswer": "あ、助かります。お願いします", "explanation": "親切な提案に対する快諾「あ、助かります。お願いします」が適切です。"},
  {"id": "jft_set5_22", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【会話・表現 Q22】A:「ごちそうさまでした！」\nB:「（　　　）。」", "options": ["お粗末様でした", "いただきます", "いってらっしゃい", "はじめまして"], "correctAnswer": "お粗末様でした", "explanation": "食後の感謝への返答です。"},
  {"id": "jft_set5_23", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【会話・表現 Q23】A:「どのくらい 日本語を 勉強しましたか。」\nB:「（　　　）。」", "options": ["1年くらいです", "1人くらいです", "1冊くらいです", "1本くらいです"], "correctAnswer": "1年くらいです", "explanation": "期間を聞かれているので「1年くらいです」が正解です。"},
  {"id": "jft_set5_24", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【会話・表現 Q24】A:「お先に 失礼します。」\nB:「（　　　）。」", "options": ["お疲れ様でした！", "はじめまして！", "いただきます！", "すみません！"], "correctAnswer": "お疲れ様でした！", "explanation": "退社時の挨拶に対する言葉です。"},
  {"id": "jft_set5_25", "level": "JFT", "mockSet": "JFT_SET_5", "type": "LISTENING", "prompt": "[Set 5] 【聴解 Q25】A: 牛乳を 買います。\nB: はい。\n\n質問: What will A buy?", "options": ["Juice", "Milk", "Water", "Tea"], "correctAnswer": "Milk", "explanation": "「牛乳」(Milk)が正解です。"},
  {"id": "jft_set5_26", "level": "JFT", "mockSet": "JFT_SET_5", "type": "LISTENING", "prompt": "[Set 5] 【聴解 Q26】A: 何を 食べますか。\nB: ラーメンを お願いします。\n\n質問: What will B eat?", "options": ["Sushi", "Ramen", "Tempura", "Soba"], "correctAnswer": "Ramen", "explanation": "「ラーメン」が正解です。"},
  {"id": "jft_set5_27", "level": "JFT", "mockSet": "JFT_SET_5", "type": "LISTENING", "prompt": "[Set 5] 【聴解 Q27】A: 今日は 何日ですか。\nB: 15日ですよ。\n\n質問: What is the date today?", "options": ["5th", "10th", "15th", "20th"], "correctAnswer": "15th", "explanation": "「15日」が正解です。"},
  {"id": "jft_set5_28", "level": "JFT", "mockSet": "JFT_SET_5", "type": "LISTENING", "prompt": "[Set 5] 【聴解 Q28】A: 会議は 何時からですか。\nB: 2時からです。\n\n質問: What time does the meeting start?", "options": ["1:00", "2:00", "3:00", "4:00"], "correctAnswer": "2:00", "explanation": "「2時から」が正解です。"},
  {"id": "jft_set5_29", "level": "JFT", "mockSet": "JFT_SET_5", "type": "LISTENING", "prompt": "[Set 5] 【聴解 Q29】A: どこで 買いましたか。\nB: デパートで 買いました。\n\n質問: Where did B buy it?", "options": ["Supermarket", "Department store", "Convenience store", "Market"], "correctAnswer": "Department store", "explanation": "「デパート」(Department store)が正解です。"},
  {"id": "jft_set5_30", "level": "JFT", "mockSet": "JFT_SET_5", "type": "LISTENING", "prompt": "[Set 5] 【聴解 Q30】A: 切符は いくらですか。\nB: 240円です。\n\n質問: How much is the ticket?", "options": ["140 Yen", "240 Yen", "340 Yen", "440 Yen"], "correctAnswer": "240 Yen", "explanation": "「240円」が正解です。"},
  {"id": "jft_set5_31", "level": "JFT", "mockSet": "JFT_SET_5", "type": "LISTENING", "prompt": "[Set 5] 【聴解 Q31】A: 日本の 生活は どうですか。\nB: とても 楽しいです。\n\n質問: How is life in Japan?", "options": ["Difficult", "Very enjoyable", "Busy", "Cold"], "correctAnswer": "Very enjoyable", "explanation": "「とても楽しいです」(Very enjoyable)が正解です。"},
  {"id": "jft_set5_32", "level": "JFT", "mockSet": "JFT_SET_5", "type": "LISTENING", "prompt": "[Set 5] 【聴解 Q32】A: どうやって 工場へ 行きますか。\nB: 自転車で行きます。\n\n質問: How does B go to the factory?", "options": ["Walk", "Bicycle", "Bus", "Train"], "correctAnswer": "Bicycle", "explanation": "「自転車」(Bicycle)が正解です。"},
  {"id": "jft_set5_33", "level": "JFT", "mockSet": "JFT_SET_5", "type": "LISTENING", "prompt": "[Set 5] 【聴解 Q33】A: 部屋に 何が ありますか。\nB: ベッドと テレビが あります。\n\n質問: What is in the room?", "options": ["Bed & TV", "Desk & Chair", "Sofa & Table", "Fridge & Clock"], "correctAnswer": "Bed & TV", "explanation": "「ベッドとテレビ」が正解です。"},
  {"id": "jft_set5_34", "level": "JFT", "mockSet": "JFT_SET_5", "type": "LISTENING", "prompt": "[Set 5] 【聴解 Q34】A: 休みは 何曜日ですか。\nB: 土曜日と 日曜日です。\n\n質問: When are the days off?", "options": ["Monday & Tuesday", "Saturday & Sunday", "Wednesday & Friday", "Everyday"], "correctAnswer": "Saturday & Sunday", "explanation": "「土曜日と日曜日」が正解です。"},
  {"id": "jft_set5_35", "level": "JFT", "mockSet": "JFT_SET_5", "type": "LISTENING", "prompt": "[Set 5] 【聴解 Q35】A: メガネは どこですか。\nB: 鞄の中に あります。\n\n質問: Where are the glasses?", "options": ["On the table", "In the bag", "On the bed", "Under the chair"], "correctAnswer": "In the bag", "explanation": "「鞄の中」(In the bag)が正解です。"},
  {"id": "jft_set5_36", "level": "JFT", "mockSet": "JFT_SET_5", "type": "LISTENING", "prompt": "[Set 5] 【聴解 Q36】A: 昨日の 夜、何を しましたか。\nB: テレビで サッカーの 試合を 見ました。\n\n質問: What did B do last night?", "options": ["Studied Japanese", "Watched soccer match on TV", "Cooked dinner", "Went to sleep early"], "correctAnswer": "Watched soccer match on TV", "explanation": "「テレビでサッカーの試合を見ました」が正解です。"},
  {"id": "jft_set5_37", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【読解 Q37】＜文章＞ ジョンさんは エンジニアです。毎日 8時半に 工場へ 行きます。昼ご飯は 食堂で 食べます。\n\n質問: What is John's job?", "options": ["Teacher", "Engineer", "Doctor", "Driver"], "correctAnswer": "Engineer", "explanation": "文章「エンジニアです」より Engineer が正解です。"},
  {"id": "jft_set5_38", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【読解 Q38】＜文章＞ ジョンさんは エンジニアです。毎日 8時半に 工場へ 行きます。昼ご飯は 食堂で 食べます。\n\n質問: Where does he eat lunch?", "options": ["Cafeteria (食堂)", "Office", "Home", "Restaurant"], "correctAnswer": "Cafeteria (食堂)", "explanation": "文章「食堂で食べます」より Cafeteria が正解です。"},
  {"id": "jft_set5_39", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【読解 Q39】＜お知らせ＞ 市役所は 土曜日・日曜日・祝日は お休みです。受付時間は 8:30〜17:15です。\n\n質問: 市役所が 開いている 時間は いつですか。", "options": ["8:30〜17:15", "9:00〜18:00", "10:00〜16:00", "終日24時間"], "correctAnswer": "8:30〜17:15", "explanation": "「8:30〜17:15」が正解です。"},
  {"id": "jft_set5_40", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【読解 Q40】＜ゴミ出しルール＞ 燃えないゴミは 毎月 第2・第4水曜日の 朝 8時までに 出してください。\n\n質問: 燃えないゴミを 出すのは いつですか。", "options": ["第2・第4水曜日", "毎週月曜日", "毎週金曜日", "毎日"], "correctAnswer": "第2・第4水曜日", "explanation": "「第2・第4水曜日」が正解です。"},
  {"id": "jft_set5_41", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【読解 Q41】＜案内＞ 会社内は すべて 禁煙です。タバコは 屋外の 喫煙所で 吸ってください。\n\n質問: タバコは どこで 吸えますか。", "options": ["屋外の喫煙所", "自分のデスク", "会議室", "食堂"], "correctAnswer": "屋外の喫煙所", "explanation": "「屋外の喫煙所」が正解です。"},
  {"id": "jft_set5_42", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【読解 Q42】＜割引券＞ 【ラーメン100円引き】※他券併用不可。有効期限：今年度末まで。\n\n質問: この券を使うと 何円 安くなりますか。", "options": ["100円", "200円", "半額", "無料"], "correctAnswer": "100円", "explanation": "「100円引き」が正解です。"},
  {"id": "jft_set5_43", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【読解 Q43】＜注意＞ 工場内では 安全靴を 履いてください。サンダルで 入ってはいけません。\n\n質問: 工場内で 履いてはいけないものは 何ですか。", "options": ["サンダル", "安全靴", "靴下", "長靴"], "correctAnswer": "サンダル", "explanation": "「サンダルで入ってはいけません」より サンダル が正解です。"},
  {"id": "jft_set5_44", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【読解 Q44】＜電車運行情報＞ 事故のため、A線は 運転を見合わせています。復旧は 15時の 予定です。\n\n質問: 電車が 再び 動き始める 予定は何時ですか。", "options": ["15時", "12時", "18時", "明日"], "correctAnswer": "15時", "explanation": "「復旧は15時の予定」より 15時 が正解です。"},
  {"id": "jft_set5_45", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【読解 Q45】＜健康メモ＞ 睡眠時間を 毎日 7時間以上 とりましょう。夜遅くの スマホは 控えましょう。\n\n質問: 夜遅くに 控えるべきことは 何ですか。", "options": ["スマホを見ること", "寝ること", "水を飲むこと", "風呂に入ること"], "correctAnswer": "スマホを見ること", "explanation": "「夜遅くのスマホは控えましょう」が正解です。"},
  {"id": "jft_set5_46", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【読解 Q46】＜メール＞ 佐藤さん、明日の 研修資料を 印刷して 10部 準備してください。\n\n質問: 佐藤さんは 資料を 何部 作りますか。", "options": ["5部", "10部", "15部", "20部"], "correctAnswer": "10部", "explanation": "「10部準備してください」が正解です。"},
  {"id": "jft_set5_47", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【読解 Q47】＜貼り紙＞ 本日の 営業は 台風のため 15時で 終了いたします。\n\n質問: 本日は 何時に 店が 閉まりますか。", "options": ["15時", "17時", "20時", "閉まらない"], "correctAnswer": "15時", "explanation": "「15時で終了いたします」より 15時 が正解です。"},
  {"id": "jft_set5_48", "level": "JFT", "mockSet": "JFT_SET_5", "type": "MULTIPLE_CHOICE", "prompt": "[Set 5] 【読解 Q48】＜マンション掲示＞ 清掃作業のため 10:00〜12:00 は 断水（水が出ない）します。\n\n質問: 水が 出なくなる 時間は いつですか。", "options": ["10:00〜12:00", "8:00〜10:00", "12:00〜14:00", "終日"], "correctAnswer": "10:00〜12:00", "explanation": "「10:00〜12:00は断水します」が正解です。"},
  // ==========================================
  // JLPT N4 OFFICIAL PRACTICE EXAM (N4_SET_1)
  // ==========================================
  {"id": "n4_set1_1", "level": "N4", "mockSet": "N4_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q1】下線の言葉のひらがなを選んでください: 昨日の【試合】は とても 面白かったです。", "options": ["しあい", "しがい", "じあい", "じがい"], "correctAnswer": "しあい", "explanation": "「試合」は「しあい」(Match / Game)と読みます。"},
  {"id": "n4_set1_2", "level": "N4", "mockSet": "N4_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q2】( )に入るのに最もよいものを選んでください: バスが 遅れたので、約束の 時間に ( ) でした。", "options": ["間に合いません", "間に合いそう", "遅れました", "間に合わなかった"], "correctAnswer": "間に合わなかった", "explanation": "過去の否定「間に合わなかった」(Did not make it in time)が適切です。"},
  {"id": "n4_set1_3", "level": "N4", "mockSet": "N4_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q3】( )に入るのに最もよいものを選んでください: 頭が 痛い ( )、今日は 早く 帰ります。", "options": ["ので", "のに", "ても", "ながら"], "correctAnswer": "ので", "explanation": "客観的な理由を表す「〜ので」(Because/Since)が適切です。"},
  {"id": "n4_set1_4", "level": "N4", "mockSet": "N4_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q4】( )に入るのに最もよいものを選んでください: 漢字が ( ) ように、毎日 練習しています。", "options": ["書ける", "書く", "書かない", "書かれた"], "correctAnswer": "書ける", "explanation": "目的・能力の目標を表す「〜可能形＋ように」(So that I can write)が正解です。"},
  {"id": "n4_set1_5", "level": "N4", "mockSet": "N4_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q5】( )に入るのに最もよいものを選んでください: 母に 部屋を ( )、困りました。", "options": ["汚されて", "汚して", "汚させて", "汚れた"], "correctAnswer": "汚されて", "explanation": "迷惑の受身形「〜に〜される」(Suffered from having room dirtied)が正解です。"},
  {"id": "n4_set1_6", "level": "N4", "mockSet": "N4_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q6】( )に入るのに最もよいものを選んでください: 明日 雨が 降ったら、旅行は ( ) に なります。", "options": ["中止", "開始", "参加", "出発"], "correctAnswer": "中止", "explanation": "「中止になる」(Be canceled)が適切です。"},
  {"id": "n4_set1_7", "level": "N4", "mockSet": "N4_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q7】( )に入るのに最もよいものを選んでください: 田中さんは 来月 結婚する ( ) です。", "options": ["そう", "らしい", "みたい", "つもり"], "correctAnswer": "そう", "explanation": "伝聞の「〜そうです」(I heard that...)が適切です。"},
  {"id": "n4_set1_8", "level": "N4", "mockSet": "N4_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q8】( )に入るのに最もよいものを選んでください: ドアが ( ) いますから、気をつけてください。", "options": ["開いて", "開けて", "開けられて", "開こう"], "correctAnswer": "開いて", "explanation": "自動詞＋ています「開いています」(Is open)が状態を表します。"},
  {"id": "n4_set1_9", "level": "N4", "mockSet": "N4_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q9】( )に入るのに最もよいものを選んでください: 先生に 本を ( ) いただきました。", "options": ["貸して", "借りて", "見せて", "送って"], "correctAnswer": "貸して", "explanation": "目上からの恩恵「〜ていただく」(Received the favor of lending)です。"},
  {"id": "n4_set1_10", "level": "N4", "mockSet": "N4_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Q10】＜メール＞ 山田さんへ。明日の 会議は 14時から 3階の 第1会議室で 行います。資料は 事前に 読んでおいてください。\n\n質問: 山田さんは 会議の 前に 何を しなければなりませんか。", "options": ["資料を事前に読んでおく", "資料を10部コピーする", "3階を清掃する", "14時に出張する"], "correctAnswer": "資料を事前に読んでおく", "explanation": "メールより「事前に読んでおいてください」が正解です。"},
  {"id": "n4_set1_11", "level": "N4", "mockSet": "N4_SET_1", "type": "LISTENING", "prompt": "【聴解 Q11】男の人：この 書類、明日までに 提出しなければなりませんか。\n女の人：いいえ、来週の 月曜日までに 出せば いいですよ。\n\n質問: 書類は いつまでに 提出しますか。", "options": ["来週の月曜日", "明日", "今日", "来週の金曜日"], "correctAnswer": "来週の月曜日", "explanation": "会話より「来週の月曜日までに」が正解です。"},
  {"id": "n4_set1_12", "level": "N4", "mockSet": "N4_SET_1", "type": "LISTENING", "prompt": "【聴解 Q12】女の人：すみません、図書館は どこですか。\n男の人：あの 角を 右へ 曲がって、100メートルほど 直進すると 左側に あります。\n\n質問: 図書館は どこに ありますか。", "options": ["角を右へ曲がって直進した左側", "角を左へ曲がってすぐ", "駅の目の前", "信号を渡った右側"], "correctAnswer": "角を右へ曲がって直進した左側", "explanation": "「角を右へ曲がって100m直進した左側」が正解です。"},
  {"id": "n4_set1_13", "level": "N4", "mockSet": "N4_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文字・語彙 Q13】下線の言葉のひらがなを選んでください: 事故の 原因を【調査】しています。", "options": ["ちょうさ", "ちょうしゃ", "ちょさ", "てんさ"], "correctAnswer": "ちょうさ", "explanation": "「調査」は「ちょうさ」(Investigation/Research)と読みます。"},
  {"id": "n4_set1_14", "level": "N4", "mockSet": "N4_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q14】( )に入るのに最もよいものを選んでください: 風邪を ひいたので、薬を 飲んで ( ) 寝ます。", "options": ["すぐ", "やっと", "かならず", "ぜんぜん"], "correctAnswer": "すぐ", "explanation": "「すぐ寝ます」(Go to sleep right away)が自然です。"},
  {"id": "n4_set1_15", "level": "N4", "mockSet": "N4_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Q15】＜お知らせ＞ 台風の影響で、明日の 授業は 休講となります。補講は 来週 土曜日に 行います。\n\n質問: 明日の 授業は どうなりますか。", "options": ["休講になる", "通常通り行う", "オンラインで行う", "試験を行う"], "correctAnswer": "休講になる", "explanation": "お知らせより「休講となります」が正解です。"},

  // ==========================================
  // JLPT N3 OFFICIAL PRACTICE BOOK VOLUME 1 (65 QUESTIONS: GRAMMAR, READING, LISTENING)
  // ==========================================
  {"id": "jpn3_v1_1", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q26】雨が降る（　　　）、試合は中止になります。", "options": ["とき", "と", "なら", "まで"], "correctAnswer": "と", "explanation": "条件・仮定を表す接続助詞「と」が正解です。"},
  {"id": "jpn3_v1_2", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q27】日本へ来てから、日本料理が好き（　　　）。", "options": ["になりました", "をしました", "がしました", "をなりました"], "correctAnswer": "になりました", "explanation": "状態の変化を表す「〜が好きになりました」が正解です。"},
  {"id": "jpn3_v1_3", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q28】疲れていた（　　　）、早く寝ました。", "options": ["ので", "ように", "ながら", "まで"], "correctAnswer": "ので", "explanation": "原因・理由を表す「〜ので」(Because)が正解です。"},
  {"id": "jpn3_v1_4", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q29】電車に乗る（　　　）、財布がないことに気がついた。", "options": ["とき", "あいだ", "ため", "しか"], "correctAnswer": "とき", "explanation": "場面・時間を表す「〜とき」(When)が正解です。"},
  {"id": "jpn3_v1_5", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q30】明日までにレポートを（　　　）なければならない。", "options": ["書き", "書く", "書いて", "書いた"], "correctAnswer": "書き", "explanation": "義務表現「〜書かなければならない」の語幹「書き」が正解です。"},
  {"id": "jpn3_v1_6", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q31】部長はまだ来て（　　　）。", "options": ["いません", "あります", "おきます", "しまいます"], "correctAnswer": "いません", "explanation": "動作の未完了を表す「〜来ていません」(Has not arrived)が正解です。"},
  {"id": "jpn3_v1_7", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q32】時間があれば、一緒に映画を（　　　）。", "options": ["見に行きましょう", "見ます", "見た", "見ようです"], "correctAnswer": "見に行きましょう", "explanation": "お誘い・提案の意向表現「〜見に行きましょう」(Let's go watch)が正解です。"},
  {"id": "jpn3_v1_8", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q33】彼は日本語が話せる（　　　）、英語も上手です。", "options": ["だけでなく", "だけ", "しか", "ほど"], "correctAnswer": "だけでなく", "explanation": "累加・付加の表現「〜だけでなく」(Not only... but also)が正解です。"},
  {"id": "jpn3_v1_9", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q34】暑い（　　　）、窓を開けましょう。", "options": ["ので", "のに", "でも", "しか"], "correctAnswer": "ので", "explanation": "理由・客観的根拠「〜ので」が正解です。"},
  {"id": "jpn3_v1_10", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q35】駅へ行く（　　　）バスを利用します。", "options": ["ために", "ように", "だけ", "ほど"], "correctAnswer": "ために", "explanation": "目的を表す「〜ために」(In order to)が正解です。"},
  {"id": "jpn3_v1_11", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q36】私は毎朝コーヒーを飲んで（　　　）。", "options": ["います", "あります", "おきます", "しまいます"], "correctAnswer": "います", "explanation": "日常の習慣を表す「〜飲んでいます」(Am drinking)が正解です。"},
  {"id": "jpn3_v1_12", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q37】今日は昨日（　　　）寒くありません。", "options": ["ほど", "しか", "まで", "だけ"], "correctAnswer": "ほど", "explanation": "比較否定表現「〜ほど...ない」(Not as... as)が正解です。"},
  {"id": "jpn3_v1_13", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q38】先生に宿題を出す（　　{の}）を 忘れました。", "options": ["のを", "のに", "ので", "のが"], "correctAnswer": "のを", "explanation": "動作の目的語を名詞化する「〜のを忘れました」が正解です。"},
  {"id": "jpn3_v1_14", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q39】財布を落として（　　　）。", "options": ["しまいました", "おきました", "あります", "います"], "correctAnswer": "しまいました", "explanation": "遺憾・失敗を表す「〜てしまいました」(Accidentally dropped)が正解です。"},
  {"id": "jpn3_v1_15", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q40】彼は子どもの（　　　）元気です。", "options": ["ように", "ような", "らしい", "みたい"], "correctAnswer": "ように", "explanation": "比喩・様態を表す「〜のように」(Like a child)が正解です。"},
  {"id": "jpn3_v1_16", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q41】会議は３時（　　　）始まります。", "options": ["から", "ごろ", "まで", "しか"], "correctAnswer": "から", "explanation": "開始時点を表す「〜から」(From 3:00)が正解です。"},
  {"id": "jpn3_v1_17", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q42】この問題は私には難し（　　　）。", "options": ["すぎます", "させます", "られます", "なおします"], "correctAnswer": "すぎます", "explanation": "過度を表す「〜難しすぎます」(Too difficult)が正解です。"},
  {"id": "jpn3_v1_18", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q43】病気だった（　　　）、学校を休みました。", "options": ["ので", "のに", "でも", "しか"], "correctAnswer": "ので", "explanation": "理由・原因を表す「〜ので」が正解です。"},
  {"id": "jpn3_v1_19", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q44】友達が来る（　　　）部屋を掃除しました。", "options": ["ので", "ため", "まで", "ように"], "correctAnswer": "ように", "explanation": "目的・準備を表す「〜ように」(So that friend can come)が正解です。"},
  {"id": "jpn3_v1_20", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q45】この薬は食後に飲む（　　　）。", "options": ["べきです", "ことです", "ようです", "はずです"], "correctAnswer": "べきです", "explanation": "義務・当然の推奨「〜飲むべきです」(Should take after meals)が正解です。"},
  {"id": "jpn3_v1_21", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q46】急いでいた（　　　）、転んでしまいました。", "options": ["ので", "のに", "ながら", "ほど"], "correctAnswer": "ので", "explanation": "原因・理由の「〜ので」が正解です。"},
  {"id": "jpn3_v1_22", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q47】彼は約束を守る（　　　）人です。", "options": ["まじめな", "まじめ", "まじめに", "まじめさ"], "correctAnswer": "まじめな", "explanation": "名詞修飾のな形容詞「まじめな」(Serious/Honest person)が正解です。"},
  {"id": "jpn3_v1_23", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q48】雨が降っている（　　　）、出かけます。", "options": ["のに", "ので", "から", "ため"], "correctAnswer": "のに", "explanation": "逆説の「〜のに」(Even though it's raining)が正解です。"},
  {"id": "jpn3_v1_24", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q49】母は料理を作り（　　　）、私は皿を並べた。", "options": ["ながら", "ので", "ても", "しか"], "correctAnswer": "ながら", "explanation": "同時並行動作「〜作りながら」(While cooking)が正解です。"},
  {"id": "jpn3_v1_25", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【文法 Q50】もっと勉強すれば、日本語が上手に（　　　）。", "options": ["なります", "します", "あります", "います"], "correctAnswer": "なります", "explanation": "変化を表す「〜上手に習得してなります」が正解です。"},
  {"id": "jpn3_v1_26", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Passage 1】田中さんは毎日会社へ電車で通っています。しかし、先週から駅の工事が始まり、電車が10分ほど遅れるようになりました。そのため、田中さんはいつもより20分早く家を出ています。最初は大変でしたが、最近は朝の時間に本を読む習慣ができました。\n\n質問 Q51: Why has the train been delayed?", "options": ["Bad weather", "Station construction", "Heavy traffic", "Train accident"], "correctAnswer": "Station construction", "explanation": "Passage specifies station construction (駅の工事) delayed the train."},
  {"id": "jpn3_v1_27", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Passage 1】田中さんは毎日会社へ電車で通っています。しかし、先週から駅の工事が始まり、電車が10分ほど遅れるようになりました。そのため、田中さんはいつもより20分早く家を出ています。最初は大変でしたが、最近は朝の時間に本を読む習慣ができました。\n\n質問 Q52: How much earlier does Tanaka leave home now?", "options": ["10 minutes", "15 minutes", "20 minutes", "30 minutes"], "correctAnswer": "20 minutes", "explanation": "Passage states 20 minutes earlier (20分早く家を出ています)."},
  {"id": "jpn3_v1_28", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Passage 1】田中さんは毎日会社へ電車で通っています。しかし、先週から駅の工事が始まり、電車が10分ほど遅れるようになりました。そのため、田中さんはいつもより20分早く家を出ています。最初は大変でしたが、最近は朝の時間に本を読む習慣ができました。\n\n質問 Q53: What new habit has Tanaka developed?", "options": ["Running", "Reading books", "Cooking breakfast", "Studying English"], "correctAnswer": "Reading books", "explanation": "Passage states reading books (本を読む習慣) in the morning."},
  {"id": "jpn3_v1_29", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Passage 1】田中さんは毎日会社へ電車で通っています。しかし、先週から駅の工事が始まり、電車が10分ほど遅れるようになりました。そのため、田中さんはいつもより20分早く家を出ています。最初は大変でしたが、最近は朝の時間に本を読む習慣ができました。\n\n質問 Q54: Which statement is correct?", "options": ["He drives to work.", "The delays started last month.", "He now leaves earlier than before.", "He changed jobs."], "correctAnswer": "He now leaves earlier than before.", "explanation": "Correct: He leaves 20 minutes earlier than before."},
  {"id": "jpn3_v1_30", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Passage 2】＜図書館のお知らせ＞ 図書館は来週月曜日から水曜日まで館内点検のため休館します。本の返却は入口横の返却ボックスをご利用ください。木曜日から通常どおり開館します。\n\n質問 Q55: Why is the library closed?", "options": ["Holiday", "Staff meeting", "Building inspection", "Festival"], "correctAnswer": "Building inspection", "explanation": "Passage specifies building inspection (館内点検)."},
  {"id": "jpn3_v1_31", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Passage 2】＜図書館のお知らせ＞ 図書館は来週月曜日から水曜日まで館内点検のため休館します。本の返却は入口横の返却ボックスをご利用ください。木曜日から通常どおり開館します。\n\n質問 Q56: How can books be returned?", "options": ["At the reception desk", "By post", "In the return box", "At another library"], "correctAnswer": "In the return box", "explanation": "Passage specifies using the return box (返却ボックス)."},
  {"id": "jpn3_v1_32", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Passage 2】＜図書館のお知らせ＞ 図書館は来週月曜日から水曜日まで館内点検のため休館します。本の返却は入口横の返却ボックスをご利用ください。木曜日から通常どおり開館します。\n\n質問 Q57: When will the library reopen?", "options": ["Wednesday", "Thursday", "Friday", "Saturday"], "correctAnswer": "Thursday", "explanation": "Passage specifies reopening on Thursday (木曜日から通常どおり開館)."},
  {"id": "jpn3_v1_33", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Passage 2】＜図書館のお知らせ＞ 図書館は来週月曜日から水曜日まで館内点検のため休館します。本の返却は入口横の返却ボックスをご利用ください。木曜日から通常どおり開館します。\n\n質問 Q58: What is this passage?", "options": ["Advertisement", "Notice", "Diary", "Story"], "correctAnswer": "Notice", "explanation": "This passage is a Library Notice (お知らせ)."},
  {"id": "jpn3_v1_34", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Passage 3】佐藤さんは新しい仕事を始めました。最初は仕事を覚えるのが大変でしたが、同僚が親切に教えてくれたので、少しずつ自信がついてきました。今では毎日楽しく働いています。\n\n質問 Q59: What was difficult at first?", "options": ["Finding the office", "Learning the job", "Waking up early", "Travelling"], "correctAnswer": "Learning the job", "explanation": "Passage states learning the job was hard (仕事を覚えるのが大変)."},
  {"id": "jpn3_v1_35", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Passage 3】佐藤さんは新しい仕事を始めました。最初は仕事を覚えるのが大変でしたが、同僚が親切に教えてくれたので、少しずつ自信がついてきました。今では毎日楽しく働いています。\n\n質問 Q60: Why did Sato improve?", "options": ["He studied alone.", "His boss was strict.", "His coworkers helped him.", "He changed departments."], "correctAnswer": "His coworkers helped him.", "explanation": "Passage states coworkers kindly taught him (同僚が親切に教えてくれた)."},
  {"id": "jpn3_v1_36", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Passage 3】佐藤さんは新しい仕事を始めました。最初は仕事を覚えるのが大変でしたが、同僚が親切に教えてくれたので、少しずつ自信がついてきました。今では毎日楽しく働いています。\n\n質問 Q61: How does Sato feel now?", "options": ["Worried", "Bored", "Happy", "Angry"], "correctAnswer": "Happy", "explanation": "Passage states he works happily every day (毎日楽しく働いています)."},
  {"id": "jpn3_v1_37", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Passage 3】佐藤さんは新しい仕事を始めました。最初は仕事を覚えるのが大変でしたが、同僚が親切に教えてくれたので、少しずつ自信がついてきました。今では毎日楽しく働いています。\n\n質問 Q62: Choose the best summary.", "options": ["He quit his job.", "He gradually became confident.", "He works only on weekends.", "He dislikes his colleagues."], "correctAnswer": "He gradually became confident.", "explanation": "Passage states he gradually gained confidence (少しずつ自信がついてきました)."},
  {"id": "jpn3_v1_37", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Passage 3】佐藤さんは新しい仕事を始めました。最初は仕事を覚えるのが大変でしたが、同僚が親切に教えてくれたので、少しずつ自信がついてきました。今では毎日楽しく働いています。\n\n質問 Q62: Choose the best summary.", "options": ["He quit his job.", "He gradually became confident.", "He works only on weekends.", "He dislikes his colleagues."], "correctAnswer": "He gradually became confident.", "explanation": "Passage states he gradually gained confidence (少しずつ自信がついてきました)."},
  {"id": "jpn3_v1_38", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Passage 4】＜山本さんへのメール＞ 山本さん、明日の会議は午後2時から3時に変更になりました。場所は3階会議室です。資料は今日中にメールで送ります。 鈴木\n\n質問 Q63: When is the meeting?", "options": ["1:00", "2:00", "3:00", "4:00"], "correctAnswer": "2:00", "explanation": "Passage specifies meeting starts at 2:00 PM (午後2時から3時)."},
  {"id": "jpn3_v1_39", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Passage 4】＜山本さんへのメール＞ 山本さん、明日の会議は午後2時から3時に変更になりました。場所は3階会議室です。資料は今日中にメールで送ります。 鈴木\n\n質問 Q64: Where will it be held?", "options": ["Second floor", "Third floor", "Fourth floor", "Online"], "correctAnswer": "Third floor", "explanation": "Passage specifies 3rd floor meeting room (3階会議室)."},
  {"id": "jpn3_v1_40", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Passage 4】＜山本さんへのメール＞ 山本さん、明日の会議は午後2時から3時に変更になりました。場所は3階会議室です。資料は今日中にメールで送ります。 鈴木\n\n質問 Q65: What will Suzuki send?", "options": ["Tickets", "Lunch", "Documents", "Photos"], "correctAnswer": "Documents", "explanation": "Passage specifies documents (資料は今日中にメールで送ります)."},
  {"id": "jpn3_v1_41", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Passage 4】＜山本さんへのメール＞ 山本さん、明日の会議は午後2時から3時に変更になりました。場所は3階会議室です。資料は今日中にメールで送ります。 鈴木\n\n質問 Q66: When will the documents be sent?", "options": ["Tomorrow morning", "Today", "After the meeting", "Next week"], "correctAnswer": "Today", "explanation": "Passage specifies sending documents today (今日中に)."},
  {"id": "jpn3_v1_42", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Passage 5】山へ行くときは、天気を確認してから出発しましょう。雨が降る可能性がある日は、雨具を持って行くことをおすすめします。また、一人で山へ行くより、友達と一緒に行くほうが安全です。\n\n質問 Q67: What should you check before leaving?", "options": ["Map", "Weather", "Shoes", "Camera"], "correctAnswer": "Weather", "explanation": "Passage advises checking the weather (天気を確認してから)."},
  {"id": "jpn3_v1_43", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Passage 5】山へ行くときは、天気を確認してから出発しましょう。雨が降る可能性がある日は、雨具を持って行くことをおすすめします。また、一人で山へ行くより、友達と一緒に行くほうが安全です。\n\n質問 Q68: What should you bring if rain is possible?", "options": ["Hat", "Umbrella or rain gear", "Food", "Tent"], "correctAnswer": "Umbrella or rain gear", "explanation": "Passage advises bringing rain gear (雨具を持って行く)."},
  {"id": "jpn3_v1_44", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Passage 5】山へ行くときは、天気を確認してから出発しましょう。雨が降る可能性がある日は、雨具を持って行くことをおすすめします。また、一人で山へ行くより、友達と一緒に行くほうが安全です。\n\n質問 Q69: According to the passage, what is safer?", "options": ["Going alone", "Going at night", "Going with friends", "Going by car"], "correctAnswer": "Going with friends", "explanation": "Passage specifies going with friends is safer (友達と一緒に行くほうが安全)."},
  {"id": "jpn3_v1_45", "level": "N3", "mockSet": "N3_SET_1", "type": "MULTIPLE_CHOICE", "prompt": "【読解 Passage 5】山へ行くときは、天気を確認してから出発しましょう。雨が降る可能性がある日は、雨具を持って行くことをおすすめします。また、一人で山へ行くより、友達と一緒に行くほうが安全です。\n\n質問 Q70: What is the main purpose of the passage?", "options": ["Describe a mountain", "Give hiking safety advice", "Explain train travel", "Introduce a new park"], "correctAnswer": "Give hiking safety advice", "explanation": "Main purpose is hiking safety advice."},
  {"id": "jpn3_v1_46", "level": "N3", "mockSet": "N3_SET_1", "type": "LISTENING", "prompt": "【聴解 Dialogue 1】男: 明日の会議は10時からでしたね。\n女: いいえ、部長の予定が変わったので11時からです。\n男: わかりました。では30分前に行きます。\n\n質問 Q71: What time does the meeting start?", "options": ["9:30", "10:00", "11:00", "11:30"], "correctAnswer": "11:00", "explanation": "女の会話「11時からです」より 11:00 が正解です。"},
  {"id": "jpn3_v1_47", "level": "N3", "mockSet": "N3_SET_1", "type": "LISTENING", "prompt": "【聴解 Dialogue 1】男: 明日の会議は10時からでしたね。\n女: いいえ、部長の予定が変わったので11時からです。\n男: わかりました。では30分前に行きます。\n\n質問 Q72: What will the man do?", "options": ["Arrive at 10:30", "Cancel the meeting", "Arrive at 11:30", "Work from home"], "correctAnswer": "Arrive at 10:30", "explanation": "30分前に行くため 10:30 に到着します。"},
  {"id": "jpn3_v1_48", "level": "N3", "mockSet": "N3_SET_1", "type": "LISTENING", "prompt": "【聴解 Dialogue 2】店員: いらっしゃいませ。\n女: このかばんは少し大きいですね。もっと小さいものはありますか。\n店員: はい、こちらはいかがでしょうか。\n\n質問 Q73: What is the woman looking for?", "options": ["Shoes", "A smaller bag", "A jacket", "A suitcase"], "correctAnswer": "A smaller bag", "explanation": "会話より「もっと小さいかばん」(A smaller bag)が正解です。"},
  {"id": "jpn3_v1_49", "level": "N3", "mockSet": "N3_SET_1", "type": "LISTENING", "prompt": "【聴解 Dialogue 2】店員: いらっしゃいませ。\n女: このかばんは少し大きいですね。もっと小さいものはありますか。\n店員: はい、こちらはいかがでしょうか。\n\n質問 Q74: Who is speaking?", "options": ["Two friends", "Teacher and student", "Customer and shop assistant", "Doctor and patient"], "correctAnswer": "Customer and shop assistant", "explanation": "会話者「店員と客」(Customer and shop assistant)です。"},
  {"id": "jpn3_v1_50", "level": "N3", "mockSet": "N3_SET_1", "type": "LISTENING", "prompt": "【聴解 Dialogue 3】男: 今日の天気はどうですか。\n女: 午後から雨が降るそうです。\n男: じゃあ傘を持って行きます。\n\n質問 Q75: What is the weather forecast?", "options": ["Snow", "Strong wind", "Rain in the afternoon", "Sunny all day"], "correctAnswer": "Rain in the afternoon", "explanation": "予報「午後から雨が降る」が正解です。"},
  {"id": "jpn3_v1_51", "level": "N3", "mockSet": "N3_SET_1", "type": "LISTENING", "prompt": "【聴解 Dialogue 3】男: 今日の天気はどうですか。\n女: 午後から雨が降るそうです。\n男: じゃあ傘を持って行きます。\n\n質問 Q76: What will the man do?", "options": ["Stay home", "Take an umbrella", "Ride a bicycle", "Buy a coat"], "correctAnswer": "Take an umbrella", "explanation": "「傘を持って行きます」より Take an umbrella が正解です。"},
  {"id": "jpn3_v1_52", "level": "N3", "mockSet": "N3_SET_1", "type": "LISTENING", "prompt": "【聴解 Dialogue 4】先生: 宿題は来週の月曜日までです。\n学生: 金曜日に出してもいいですか。\n先生: はい、大丈夫です。\n\n質問 Q77: When is the homework due?", "options": ["Friday", "Saturday", "Sunday", "Monday"], "correctAnswer": "Monday", "explanation": "宿題の提出期限は「来週の月曜日」(Monday)です。"},
  {"id": "jpn3_v1_53", "level": "N3", "mockSet": "N3_SET_1", "type": "LISTENING", "prompt": "【聴解 Dialogue 4】先生: 宿題は来週の月曜日までです。\n学生: 金曜日に出してもいいですか。\n先生: はい、大丈夫です。\n\n質問 Q78: What does the student ask?", "options": ["To submit early", "To cancel homework", "To change classes", "To leave school"], "correctAnswer": "To submit early", "explanation": "金曜日に提出（期限前提出）できるか聞いています。"},
  {"id": "jpn3_v1_54", "level": "N3", "mockSet": "N3_SET_1", "type": "LISTENING", "prompt": "【聴解 Dialogue 5】男: 週末は何をしましたか。\n女: 家族と公園へ行って、昼ご飯を食べました。\n\n質問 Q79: Where did the woman go?", "options": ["Library", "Park", "Station", "Office"], "correctAnswer": "Park", "explanation": "会話「公園へ行って」より Park が正解です。"},
  {"id": "jpn3_v1_55", "level": "N3", "mockSet": "N3_SET_1", "type": "LISTENING", "prompt": "【聴解 Dialogue 5】男: 週末は何をしましたか。\n女: 家族と公園へ行って、昼ご飯を食べました。\n\n質問 Q80: Who did she go with?", "options": ["Friends", "Coworkers", "Family", "Alone"], "correctAnswer": "Family", "explanation": "会話「家族と」より Family が正解です。"},
  {"id": "jpn3_v1_56", "level": "N3", "mockSet": "N3_SET_1", "type": "LISTENING", "prompt": "【聴解 Dialogue 6】女: パソコンの調子が悪いです。\n男: 電源を入れ直してみましたか。\n女: はい。でもまだ動きません。\n\n質問 Q81: What is the problem?", "options": ["Phone", "Computer", "Television", "Printer"], "correctAnswer": "Computer", "explanation": "問題になっている機器は「パソコン」(Computer)です。"},
  {"id": "jpn3_v1_57", "level": "N3", "mockSet": "N3_SET_1", "type": "LISTENING", "prompt": "【聴解 Dialogue 6】女: パソコンの調子が悪いです。\n男: 電源を入れ直してみましたか。\n女: はい。でもまだ動きません。\n\n質問 Q82: What has the woman already tried?", "options": ["Buying a new computer", "Restarting it", "Calling a repair shop", "Updating software"], "correctAnswer": "Restarting it", "explanation": "女性が試したのは「電源を入れ直す」(Restarting it)です。"},
  {"id": "jpn3_v1_58", "level": "N3", "mockSet": "N3_SET_1", "type": "LISTENING", "prompt": "【聴解 Dialogue 7】男: 来月旅行に行く予定です。\n女: どこへ行くんですか。\n男: 北海道です。\n\n質問 Q83: Where is the man going?", "options": ["Tokyo", "Osaka", "Hokkaido", "Kyoto"], "correctAnswer": "Hokkaido", "explanation": "行き先は「北海道」(Hokkaido)です。"},
  {"id": "jpn3_v1_59", "level": "N3", "mockSet": "N3_SET_1", "type": "LISTENING", "prompt": "【聴解 Dialogue 7】男: 来月旅行に行く予定です。\n女: どこへ行くんですか。\n男: 北海道です。\n\n質問 Q84: When is the trip?", "options": ["This week", "Next month", "Tomorrow", "Next year"], "correctAnswer": "Next month", "explanation": "時期は「来月」(Next month)です。"},
  {"id": "jpn3_v1_60", "level": "N3", "mockSet": "N3_SET_1", "type": "LISTENING", "prompt": "【聴解 Dialogue 8】店員: この商品は20％引きです。\n客: では一つお願いします。\n\n質問 Q85: What discount is offered?", "options": ["10%", "15%", "20%", "30%"], "correctAnswer": "20%", "explanation": "割引率は「20%引き」(20%)です。"},
  {"id": "jpn3_v1_61", "level": "N3", "mockSet": "N3_SET_1", "type": "LISTENING", "prompt": "【聴解 Dialogue 8】店員: この商品は20％引きです。\n客: では一つお願いします。\n\n質問 Q86: What does the customer decide?", "options": ["Buy one", "Buy two", "Leave the shop", "Ask for another colour"], "correctAnswer": "Buy one", "explanation": "客の決定は「一つ購入する」(Buy one)です。"},
  {"id": "jpn3_v1_62", "level": "N3", "mockSet": "N3_SET_1", "type": "LISTENING", "prompt": "【聴解 Dialogue 9】男: 電車が遅れています。\n女: バスで行きましょう。\n\n質問 Q87: Why do they change plans?", "options": ["Heavy rain", "Train delay", "Road closed", "Bus delay"], "correctAnswer": "Train delay", "explanation": "変更の理由は「電車が遅れている」(Train delay)からです。"},
  {"id": "jpn3_v1_63", "level": "N3", "mockSet": "N3_SET_1", "type": "LISTENING", "prompt": "【聴解 Dialogue 9】男: 電車が遅れています。\n女: バスで行きましょう。\n\n質問 Q88: How will they travel?", "options": ["Taxi", "Train", "Bus", "Bicycle"], "correctAnswer": "Bus", "explanation": "変更後の移動手段は「バス」(Bus)です。"},
  {"id": "jpn3_v1_64", "level": "N3", "mockSet": "N3_SET_1", "type": "LISTENING", "prompt": "【聴解 Dialogue 10】女: レポートは終わりましたか。\n男: あと少しで終わります。\n\n質問 Q89: Has the man finished the report?", "options": ["Yes", "Almost", "No, he hasn't started", "He forgot"], "correctAnswer": "Almost", "explanation": "男性の返答「あと少しで終わります」(Almost)が正解です。"},
  {"id": "jpn3_v1_65", "level": "N3", "mockSet": "N3_SET_1", "type": "LISTENING", "prompt": "【聴解 Dialogue 10】女: レポートは終わりましたか。\n男: あと少しで終わります。\n\n質問 Q90: What is the main topic?", "options": ["Homework", "Shopping", "Report completion", "Travel"], "correctAnswer": "Report completion", "explanation": "主なテーマは「レポートの完了」(Report completion)です。"},
];

const KOREAN_QUESTIONS: ExamQuestion[] = [
  // ============================================================
  // EPS-TOPIK CBT MOCK TEST SET 1 (40 COMPLETE QUESTIONS)
  // Section 1: Reading 읽기 (Q1–Q20)
  // Section 2: Listening 듣기 (Q21–Q40)
  // ============================================================
  
  // ── READING (읽기) Q1 – Q20 ──
  { id: 'eps_s1_1', level: 'EPS', mockSet: 'EPS_SET_1', type: 'MULTIPLE_CHOICE', prompt: '【읽기 Q1: 그림 보기】 다음 그림을 보고 맞는 단어를 고르십시오.\n[🖼️ 밭을 일구는 농기구 "호미"]', options: ['호미', '낫', '괭이', '삽'], correctAnswer: '호미', explanation: '그림의 농기구는 흙을 파거나 잡초를 뽑을 때 쓰는 "호미"(Hand Hoe)입니다.' },
  { id: 'eps_s1_2', level: 'EPS', mockSet: 'EPS_SET_1', type: 'MULTIPLE_CHOICE', prompt: '【읽기 Q2: 그림 보기】 건설 현장에서 머리를 보호하기 위해 착용하는 안전 용구는 무엇입니까?', options: ['안전모', '안전화', '보안경', '귀마개'], correctAnswer: '안전모', explanation: '머리를 보호하는 장비는 "안전모"(Safety Helmet)입니다.' },
  { id: 'eps_s1_3', level: 'EPS', mockSet: 'EPS_SET_1', type: 'MULTIPLE_CHOICE', prompt: '【읽기 Q3: 어휘 관계】 다음 단어와 관계있는 것은 무엇입니까?\n[보기: 사과, 배, 수박, 딸기]', options: ['과일', '야채', '음료수', '가구'], correctAnswer: '과일', explanation: '사과, 배, 수박, 딸기는 모두 "과일"(Fruit)입니다.' },
  { id: 'eps_s1_4', level: 'EPS', mockSet: 'EPS_SET_1', type: 'MULTIPLE_CHOICE', prompt: '【읽기 Q4: 반대말】 다음 단어의 반대말은 무엇입니까?\n[보기: 가깝다]', options: ['멀다', '높다', '넓다', '길다'], correctAnswer: '멀다', explanation: '"가깝다"(Close/Near)의 반대말은 "멀다"(Far)입니다.' },
  { id: 'eps_s1_5', level: 'EPS', mockSet: 'EPS_SET_1', type: 'MULTIPLE_CHOICE', prompt: '【읽기 Q5: 비슷한 말】 다음 단어와 뜻이 비슷한 말은 무엇입니까?\n[보기: 고치다]', options: ['수리하다', '청소하다', '운전하다', '요리하다'], correctAnswer: '수리하다', explanation: '"고치다"(To repair/fix)와 비슷한 말은 "수리하다"(To repair)입니다.' },
  { id: 'eps_s1_6', level: 'EPS', mockSet: 'EPS_SET_1', type: 'FILL_BLANK', prompt: '【읽기 Q6: 빈칸 채우기】 식당에서 음식을 먹은 후에 계산대에서 _____(을/를) 냅니다.', options: ['밥값', '차비', '월세', '입장료'], correctAnswer: '밥값', explanation: '식당에서 음식을 먹은 후 내는 돈은 "밥값"(Meal bill)입니다.' },
  { id: 'eps_s1_7', level: 'EPS', mockSet: 'EPS_SET_1', type: 'FILL_BLANK', prompt: '【읽기 Q7: 빈칸 채우기】 작업장에서는 위험하니까 반드시 _____(을/를) 착용해야 합니다.', options: ['안전복', '양복', '수영복', '한복'], correctAnswer: '안전복', explanation: '작업장에서 위험을 예방하기 위해 입는 옷은 "안전복"(Safety Overalls)입니다.' },
  { id: 'eps_s1_8', level: 'EPS', mockSet: 'EPS_SET_1', type: 'FILL_BLANK', prompt: '【읽기 Q8: 문법 채우기】 한국어 시험이 생각보다 _____ 너무 기뻐요.', options: ['쉬워서', '어려워서', '복잡해서', '무거워서'], correctAnswer: '쉬워서', explanation: '기쁜 이유로 알맞은 것은 시험이 "쉬워서"(Because it was easy)입니다.' },
  { id: 'eps_s1_9', level: 'EPS', mockSet: 'EPS_SET_1', type: 'FILL_BLANK', prompt: '【읽기 Q9: 조사 선택】 저는 매일 아침 8시에 회사_____ 출근합니다.', options: ['에', '에서', '를', '과'], correctAnswer: '에', explanation: '도착/도착 목적지 뒤에는 조사 "에"를 사용합니다 (회사에 출근하다).' },
  { id: 'eps_s1_10', level: 'EPS', mockSet: 'EPS_SET_1', type: 'FILL_BLANK', prompt: '【읽기 Q10: 문법 선택】 이번 주말에는 친구와 같이 영화를 _____.', options: ['보고 싶어요', '보지 마세요', '볼 수 없어요', '보면 안 돼요'], correctAnswer: '보고 싶어요', explanation: '주말 희망 표현으로 "-고 싶어요"(Want to watch)가 정답입니다.' },
  { id: 'eps_s1_11', level: 'EPS', mockSet: 'EPS_SET_1', type: 'MULTIPLE_CHOICE', prompt: '【읽기 Q11: 표지판 이해】 다음 표지판이 의미하는 것은 무엇입니까?\n[⚠️ "관계자 외 출입 금지"]', options: ['허가받지 않은 사람은 들어올 수 없습니다', '담배를 피우지 마십시오', '안전모를 반드시 쓰십시오', '물건을 놓지 마십시오'], correctAnswer: '허가받지 않은 사람은 들어올 수 없습니다', explanation: '"관계자 외 출입 금지"는 허가받지 않은 사람의 출입 금지를 뜻합니다.' },
  { id: 'eps_s1_12', level: 'EPS', mockSet: 'EPS_SET_1', type: 'MULTIPLE_CHOICE', prompt: '【읽기 Q12: 표지판 이해】 다음 중 "손대지 마시오(손질 금지)"를 뜻하는 표지판은 무엇입니까?', options: ['손 대지 마시오 표지', '화기 엄금 표지', '보안경 착용 표지', '보행 금지 표지'], correctAnswer: '손 대지 마시오 표지', explanation: '기계 조작 금지나 위험물에는 "손대지 마시오"(Do not touch) 표지가 붙습니다.' },
  { id: 'eps_s1_13', level: 'EPS', mockSet: 'EPS_SET_1', type: 'MULTIPLE_CHOICE', prompt: '【읽기 Q13: 안내문 이해】 다음 안내문의 내용과 다른 것은 무엇입니까?\n＜공장 휴무 안내＞\n추석 연휴로 인해 9월 15일부터 9월 17일까지 휴무입니다.\n9월 18일(목)부터 정상 근무합니다.', options: ['9월 18일에는 일하지 않습니다', '9월 15일부터 17일까지 쉬어갑니다', '추석 연휴 때문에 휴무합니다', '목요일부터 정상 근무합니다'], correctAnswer: '9월 18일에는 일하지 않습니다', explanation: '안내문에 9월 18일부터 정상 근무한다고 되어 있으므로 일하지 않는다는 설명이 틀렸습니다.' },
  { id: 'eps_s1_14', level: 'EPS', mockSet: 'EPS_SET_1', type: 'MULTIPLE_CHOICE', prompt: '【읽기 Q14: 그래프 이해】 직장인들의 퇴근 후 활동 조사 결과에서 가장 많은 비율을 차지한 것은 무엇입니까?\n[운동 45%, 취미 25%, 공부 20%, 기타 10%]', options: ['운동', '취미', '공부', '기타'], correctAnswer: '운동', explanation: '45%로 가장 높은 비율을 차지한 것은 "운동"(Exercise)입니다.' },
  { id: 'eps_s1_15', level: 'EPS', mockSet: 'EPS_SET_1', type: 'FILL_BLANK', prompt: '【읽기 Q15: 빈칸 채우기】 월급날이 되면 통장에 월급이 들어옵니다. 내일은 _____(을/를) 찾으러 은행에 갑니다.', options: ['현금', '우표', '여권', '비자'], correctAnswer: '현금', explanation: '은행에서 인출하는 것은 "현금"(Cash)입니다.' },
  { id: 'eps_s1_16', level: 'EPS', mockSet: 'EPS_SET_1', type: 'MULTIPLE_CHOICE', prompt: '【읽기 Q16: 글 이해】 다음 글의 내용과 같은 것을 고르십시오.\n"투안 씨는 매일 아침 7시 30분에 기숙사에서 나와 버스를 타고 회사에 갑니다. 회사까지는 20분 정도 걸립니다."', options: ['투안 씨는 버스로 출근합니다', '투안 씨는 걸어서 출근합니다', '기숙사에서 회사까지 1시간 걸립니다', '투안 씨는 8시에 기숙사에서 나옵니다'], correctAnswer: '투안 씨는 버스로 출근합니다', explanation: '글에서 "버스를 타고 회사에 갑니다"라고 언급되었습니다.' },
  { id: 'eps_s1_17', level: 'EPS', mockSet: 'EPS_SET_1', type: 'MULTIPLE_CHOICE', prompt: '【읽기 Q17: 직장 생활】 한국 공장에서 일할 때 안전사고를 예방하기 위해 가장 먼저 해야 할 일은 무엇입니까?', options: ['작업 전 안전 점검과 보호구 착용', '작업 속도를 빨리 올리기', '휴식 시간을 늘리기', '기계를 임의로 개조하기'], correctAnswer: '작업 전 안전 점검과 보호구 착용', explanation: '사고 예방의 기본은 작업 전 사전 안전 점검과 보호구 착용입니다.' },
  { id: 'eps_s1_18', level: 'EPS', mockSet: 'EPS_SET_1', type: 'FILL_BLANK', prompt: '【읽기 Q18: 어휘 선택】 몸이 아파서 출근하지 못할 때는 반장님께 사유를 이야기하고 _____(을/를) 신청해야 합니다.', options: ['병가(결근)', '퇴직금', '잔업', '야근'], correctAnswer: '병가(결근)', explanation: '아파서 쉬는 휴가는 "병가"(Sick leave)입니다.' },
  { id: 'eps_s1_19', level: 'EPS', mockSet: 'EPS_SET_1', type: 'MULTIPLE_CHOICE', prompt: '【읽기 Q19: 글 이해】 다음 글을 읽고 물음에 답하십시오.\n"한국에서는 어른께 물건을 드릴 때 두 손으로 드려야 합니다. 그리고 고개를 약간 숙여 인사하는 것이 예의입니다."', options: ['어른께 물건을 드릴 때는 두 손을 사용합니다', '한 손으로 드리는 것이 예의입니다', '인사를 하지 않아도 됩니다', '어른보다 먼저 식사를 시작합니다'], correctAnswer: '어른께 물건을 드릴 때는 두 손을 사용합니다', explanation: '글의 핵심 내용은 어른께 두 손으로 물건을 드리는 한국 예절입니다.' },
  { id: 'eps_s1_20', level: 'EPS', mockSet: 'EPS_SET_1', type: 'MULTIPLE_CHOICE', prompt: '【읽기 Q20: 종합 이해】 다음 단어들의 공통점은 무엇입니까?\n[소화기, 비상구, 안전모, 보안경]', options: ['안전 및 비상 대피 용품', '주방 요리 도구', '사무실 학용품', '교통 수단'], correctAnswer: '안전 및 비상 대피 용품', explanation: '소화기, 비상구, 안전모, 보안경은 모두 안전 및 비상 대피 관련 용품입니다.' },

  // ── LISTENING (듣기) Q21 – Q40 ──
  { id: 'eps_s1_21', level: 'EPS', mockSet: 'EPS_SET_1', type: 'LISTENING', prompt: '【듣기 Q21: 단어 들으시오】 들려주는 단어를 고르십시오.\n🎧 "공구함"', options: ['공구함', '안전모', '작업대', '스위치'], correctAnswer: '공구함', explanation: '음성에서 "공구함"(Toolbox)을 발음했습니다.' },
  { id: 'eps_s1_22', level: 'EPS', mockSet: 'EPS_SET_1', type: 'LISTENING', prompt: '【듣기 Q22: 숫자 들으시오】 들려주는 금액을 고르십시오.\n🎧 "삼만 오천 원"', options: ['35,000원', '3,500원', '53,000원', '50,000원'], correctAnswer: '35,000원', explanation: '음성에서 "삼만 오천 원"(35,000 Won)을 들려주었습니다.' },
  { id: 'eps_s1_23', level: 'EPS', mockSet: 'EPS_SET_1', type: 'LISTENING', prompt: '【듣기 Q23: 시각 들으시오】 들려주는 시간을 고르십시오.\n🎧 "두 시 삼십 분"', options: ['2:30', '3:20', '12:30', '2:00'], correctAnswer: '2:30', explanation: '음성에서 "두 시 삼십 분"(2:30)을 들려주었습니다.' },
  { id: 'eps_s1_24', level: 'EPS', mockSet: 'EPS_SET_1', type: 'LISTENING', prompt: '【듣기 Q24: 동작 듣기】 들려주는 대화 내용을 보고 알맞은 그림 행동을 고르십시오.\n🎧 "지금 용접 작업을 하고 있습니다."', options: ['용접 작업', '페인트 칠', '청소하기', '운전하기'], correctAnswer: '용접 작업', explanation: '음성에서 "용접 작업"(Welding work)을 언급했습니다.' },
  { id: 'eps_s1_25', level: 'EPS', mockSet: 'EPS_SET_1', type: 'LISTENING', prompt: '【듣기 Q25: 동작 듣기】 질문을 듣고 알맞은 답을 고르십시오.\n🎧 "지금 무엇을 하고 있습니까?" -> "작업장을 청소하고 있습니다."', options: ['청소하고 있습니다', '식사하고 있습니다', '잠을 자고 있습니다', '전화를 받고 있습니다'], correctAnswer: '청소하고 있습니다', explanation: '음성에서 "청소하고 있습니다"(Cleaning the workshop)가 정답입니다.' },
  { id: 'eps_s1_26', level: 'EPS', mockSet: 'EPS_SET_1', type: 'LISTENING', prompt: '【듣기 Q26: 대화 응답】 들려주는 말에 이어질 알맞은 대답을 고르십시오.\n🎧 "처음 뵙겠습니다. 잘 부탁드립니다."', options: ['반갑습니다. 잘 부탁드립니다', '안녕히 가세요', '죄송합니다', '괜찮습니다'], correctAnswer: '반갑습니다. 잘 부탁드립니다', explanation: '첫인사에 대한 알맞은 응답은 "반갑습니다. 잘 부탁드립니다"입니다.' },
  { id: 'eps_s1_27', level: 'EPS', mockSet: 'EPS_SET_1', type: 'LISTENING', prompt: '【듣기 Q27: 대화 응답】 들려주는 말에 이어질 알맞은 대답을 고르십시오.\n🎧 "투안 씨, 이 상자 좀 같이 옮겨 줄래요?"', options: ['네, 알겠습니다. 지금 도울게요', '아니요, 먹지 않겠습니다', '네, 어제 갔습니다', '아니요, 아주 쉬워요'], correctAnswer: '네, 알겠습니다. 지금 도울게요', explanation: '도움 요청에 대한 알맞은 응답은 "네, 알겠습니다. 지금 도울게요"입니다.' },
  { id: 'eps_s1_28', level: 'EPS', mockSet: 'EPS_SET_1', type: 'LISTENING', prompt: '【듣기 Q28: 위치 안내】 들려주는 대화를 듣고 화장실의 위치를 고르십시오.\n🎧 "실례합니다, 화장실이 어디에 있어요?" -> "복도 끝 오른쪽으로 가시면 있습니다."', options: ['복도 끝 오른쪽', '1층 엘리베이터 앞', '건물 밖 주차장', '사무실 안쪽'], correctAnswer: '복도 끝 오른쪽', explanation: '대화에서 "복도 끝 오른쪽"이라고 알려주었습니다.' },
  { id: 'eps_s1_29', level: 'EPS', mockSet: 'EPS_SET_1', type: 'LISTENING', prompt: '【듣기 Q29: 시간 문의】 들려주는 대화를 듣고 퇴근 시간을 고르십시오.\n🎧 "오늘 몇 시에 퇴근해요?" -> "6시에 퇴근해요."', options: ['6시', '5시', '7시', '8시'], correctAnswer: '6시', explanation: '대화에서 "6시"에 퇴근한다고 했습니다.' },
  { id: 'eps_s1_30', level: 'EPS', mockSet: 'EPS_SET_1', type: 'LISTENING', prompt: '【듣기 Q30: 사유 문의】 들려주는 대화를 듣고 늦은 이유를 고르십시오.\n🎧 "오늘 왜 늦었어요?" -> "도로에 차가 너무 막혀서 늦었습니다."', options: ['차가 막혀서', '늦게 깨어나서', '버스를 놓쳐서', '비가 와서'], correctAnswer: '차가 막혀서', explanation: '지각 사유는 "차가 막혀서"(Traffic jam)입니다.' },
  { id: 'eps_s1_31', level: 'EPS', mockSet: 'EPS_SET_1', type: 'LISTENING', prompt: '【듣기 Q31: 작업 지시】 반장님의 지시 사항을 들으시오.\n🎧 "작업을 시작하기 전에 반드시 안전모와 안전장갑을 착용하세요."', options: ['안전모와 안전장갑 착용', '스위치 켜기', '청소도구 가져오기', '퇴근 준비하기'], correctAnswer: '안전모와 안전장갑 착용', explanation: '지시 사항은 "안전모와 안전장갑 착용"입니다.' },
  { id: 'eps_s1_32', level: 'EPS', mockSet: 'EPS_SET_1', type: 'LISTENING', prompt: '【듣기 Q32: 작업 지시】 기계 작업 후 지시 사항을 들으시오.\n🎧 "작업이 끝나면 반드시 메인 전원 스위치를 끄세요."', options: ['전원 스위치 끄기', '기계 기름칠하기', '창문 열기', '문 잠그기'], correctAnswer: '전원 스위치 끄기', explanation: '종료 후 지시 사항은 "전원 스위치 끄기"입니다.' },
  { id: 'eps_s1_33', level: 'EPS', mockSet: 'EPS_SET_1', type: 'LISTENING', prompt: '【듣기 Q33: 안전 지시】 높은 곳 작업 시 지시 사항을 들으시오.\n🎧 "높은 곳에서 일할 때는 추락 예방을 위해 안전대를 걸어야 합니다."', options: ['안전대 걸기', '안경 쓰기', '귀마개 끼기', '마스크 쓰기'], correctAnswer: '안전대 걸기', explanation: '고소 작업 안전 지시는 "안전대 걸기"(Safety belt hook)입니다.' },
  { id: 'eps_s1_34', level: 'EPS', mockSet: 'EPS_SET_1', type: 'LISTENING', prompt: '【듣기 Q34: 업무 대화】 대화를 듣고 남자가 옮겨야 할 수량을 고르십시오.\n🎧 "이 부품 상자 10개만 2층 창고로 옮겨 주세요."', options: ['10개', '5개', '20개', '15개'], correctAnswer: '10개', explanation: '옮길 수량은 "10개"입니다.' },
  { id: 'eps_s1_35', level: 'EPS', mockSet: 'EPS_SET_1', type: 'LISTENING', prompt: '【듣기 Q35: 업무 대화】 대화를 듣고 오늘 야간 잔업 여부를 고르십시오.\n🎧 "오늘 납품 물량이 많아서 2시간 잔업을 해야 합니다."', options: ['2시간 잔업 함', '잔업 없음', '휴무함', '조퇴함'], correctAnswer: '2시간 잔업 함', explanation: '물량이 많아 "2시간 잔업을 해야 합니다"가 정답입니다.' },
  { id: 'eps_s1_36', level: 'EPS', mockSet: 'EPS_SET_1', type: 'LISTENING', prompt: '【듣기 Q36: 안내 방송】 공장 안내 방송을 듣고 내일 교육 시간을 고르십시오.\n🎧 "안내해 드립니다. 내일 오전 10시에 강당에서 안전 교육이 있습니다."', options: ['오전 10시', '오후 2시', '오전 9시', '오후 4시'], correctAnswer: '오전 10시', explanation: '안내 방송 교육 시간은 "오전 10시"입니다.' },
  { id: 'eps_s1_37', level: 'EPS', mockSet: 'EPS_SET_1', type: 'LISTENING', prompt: '【듣기 Q37: 안내 방송】 회사 식당 안내를 들으시오.\n🎧 "오늘 점심 메뉴는 비빔밥과 불고기입니다. 식당은 12시부터 이용 가능합니다."', options: ['12시부터 식당 이용', '11시부터 식당 이용', '1시부터 식당 이용', '식당 휴업'], correctAnswer: '12시부터 식당 이용', explanation: '식당 이용 시작 시각은 "12시부터"입니다.' },
  { id: 'eps_s1_38', level: 'EPS', mockSet: 'EPS_SET_1', type: 'LISTENING', prompt: '【듣기 Q38: 담화 듣기】 남자의 한국 생활 적응 소감을 들으시오.\n🎧 "처음에는 한국어가 어려웠지만, 공장 동료들이 도와줘서 지금은 즐겁게 일하고 있습니다."', options: ['동료들의 도움으로 즐겁게 일함', '한국 생활이 너무 힘들어서 돌아감', '일이 없어서 심심함', '동료들과 싸움'], correctAnswer: '동료들의 도움으로 즐겁게 일함', explanation: '소감의 핵심은 "동료들의 도움으로 즐겁게 일하고 있다"는 점입니다.' },
  { id: 'eps_s1_39', level: 'EPS', mockSet: 'EPS_SET_1', type: 'LISTENING', prompt: '【듣기 Q39: 안내 방송】 급여 및 보너스 지급 안내를 들으시오.\n🎧 "이번 달 25일에 명절 보너스가 기본급의 50% 함께 지급됩니다."', options: ['25일에 명절 보너스 지급', '다음 달 10일에 지급', '보너스 지급 취소', '기본급 100% 삭감'], correctAnswer: '25일에 명절 보너스 지급', explanation: '방송 내용은 "25일에 명절 보너스 50% 지급"입니다.' },
  { id: 'eps_s1_40', level: 'EPS', mockSet: 'EPS_SET_1', type: 'LISTENING', prompt: '【듣기 Q40: 대화 듣기】 회식 약속 장소를 들으시오.\n🎧 "오늘 퇴근하고 회사 앞 삼겹살집에서 회식을 합시다. 6시 30분까지 오세요."', options: ['회사 앞 삼겹살집', '기숙사 휴게실', '역 앞 치킨집', '공장 강당'], correctAnswer: '회사 앞 삼겹살집', explanation: '회식 장소는 "회사 앞 삼겹살집"입니다.' },

  // TOPIK 2
  {
    id: 'ko_t2_1',
    level: 'TOPIK2',
    type: 'MULTIPLE_CHOICE',
    prompt: '다음 글의 주제로 가장 알맞은 것을 골라주십시오: 건강을 유지하기 위해서는 규칙적인 운동과 식사가 필수적이다.',
    options: ['건강 관리의 중요성', '운동의 종류', '식사 요리법', '병원 이용 방법'],
    correctAnswer: '건강 관리의 중요성',
    explanation: '규칙적인 운동과 식사로 건강을 유지하는 중요성을 설명합니다.',
  },

  // TOPIK 3
  {
    id: 'ko_t3_1',
    level: 'TOPIK3',
    type: 'FILL_BLANK',
    prompt: '환경 오염이 심각해짐에 _____ 정부는 새로운 정책을 발표했다.',
    options: ['따라', '대해', '관해', '위해'],
    correctAnswer: '따라',
    explanation: '~에 따라 = according to / as a consequence of.',
  },

  // TOPIK 4
  {
    id: 'ko_t4_1',
    level: 'TOPIK4',
    type: 'MULTIPLE_CHOICE',
    prompt: '다음 중 문맥상 의미가 가장 어색한 표현을 고르시오.',
    options: ['경제 성장이 가속화되고 있다', '기술 혁신이 침체되고 있다', '물가가 지속적으로 상승한다', '고용 시장이 활성화된다'],
    correctAnswer: '기술 혁신이 침체되고 있다',
    explanation: '문맥 및 일반적 표현 비교 시 적절성을 평가합니다.',
  },
];



export interface TimedExamEngineProps {
  activeLanguage?: 'JAPANESE' | 'KOREAN';
  preselectedLevel?: string;
  hideLevelSelector?: boolean;
  hideCategorySelector?: boolean;
  onCompleteExam?: (result: { score: number; passed: boolean; timeSpentSeconds: number }) => void;
}

export const TimedExamEngine: React.FC<TimedExamEngineProps> = ({
  activeLanguage = 'JAPANESE',
  preselectedLevel,
  hideLevelSelector = false,
  hideCategorySelector = false,
  onCompleteExam,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Category Track state (Japanese JLPT/JFT vs Korean EPS/TOPIK)
  const [currentTrack, setCurrentTrack] = useState<'JAPANESE' | 'KOREAN'>(activeLanguage);

  React.useEffect(() => {
    setCurrentTrack(activeLanguage);
  }, [activeLanguage]);

  // View Layout state: LIST vs GRID (default LIST as requested by user)
  const [viewLayout, setViewLayout] = useState<'LIST' | 'GRID'>('LIST');

  // Lobby Header Tab: DIRECTORY vs SCORES
  const [lobbyTab, setLobbyTab] = useState<'DIRECTORY' | 'SCORES'>('DIRECTORY');

  // Unlocked premium sets state (persisted in localStorage)
  const [unlockedMockSetIds, setUnlockedMockSetIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lg_unlocked_mock_sets');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return ['N5_SET_1', 'N5_SET_2', 'JFT_SET_1', 'JFT_SET_2', 'JFT_EASY_1', 'N4_SET_1', 'EPS_SET_1'];
  });

  // Buy & Promo Code Modal States
  const [showBuyModal, setShowBuyModal] = useState<boolean>(false);
  const [selectedBuyTest, setSelectedBuyTest] = useState<MockTestInfo | null>(null);
  const [promoCodeInput, setPromoCodeInput] = useState<string>('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);

  // Past Score History State
  const [pastScoresHistory, setPastScoresHistory] = useState<Array<{
    testId: string;
    title: string;
    score: number;
    passed: boolean;
    date: string;
    timeSpent: string;
  }>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lg_exam_history');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return [
      { testId: 'n5-mock-1', title: 'JLPT N5 | Mock Test - 1', score: 85, passed: true, date: '2026-08-04', timeSpent: '22 Mins' },
      { testId: 'jft-cbt-1', title: 'JFT-Basic 250 | Mock Test - 1', score: 215, passed: true, date: '2026-08-02', timeSpent: '48 Mins' }
    ];
  });

  // Filter state for preselectedLevel and difficulty
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>(preselectedLevel || 'ALL');
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState<'ALL' | 'EASY' | 'MEDIUM' | 'HARD'>('ALL');

  React.useEffect(() => {
    if (preselectedLevel) {
      setSelectedLevelFilter(preselectedLevel);
    }
  }, [preselectedLevel]);

  // Flow State
  const [isExamActive, setIsExamActive] = useState(false);
  const [selectedMockTest, setSelectedMockTest] = useState<MockTestInfo | null>(null);

  // 2-Paper Official JLPT Structure (0: Paper 1 [Vocab/Grammar/Reading], 1: Paper 2 [Listening])
  const [currentPaperIndex, setCurrentPaperIndex] = useState<number>(0);
  const [currentJftSectionIndex, setCurrentJftSectionIndex] = useState<number>(0);
  const [showJftSectionLockModal, setShowJftSectionLockModal] = useState<boolean>(false);
  const [paper1Submitted, setPaper1Submitted] = useState<boolean>(false);
  
  // Modal States
  const [showExitConfirmModal, setShowExitConfirmModal] = useState(false);
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [breakTimerSeconds, setBreakTimerSeconds] = useState(15 * 60);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(60 * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [audioPlaysCount, setAudioPlaysCount] = useState<Record<string, number>>({});

  // Exam Results state with JFT 250 marks support
  const [examResult, setExamResult] = useState<{
    score: number;
    correctCount: number;
    totalQuestions: number;
    passed: boolean;
    timeSpentSeconds: number;
    jftScore?: number;
    cefrRank?: string; // Out of 250 points
    jftSections?: { sectionTitle: string; correct: number; total: number; pts: number }[];
    paper1Score?: { correct: number; total: number; percentage: number };
    paper2Score?: { correct: number; total: number; percentage: number };
  } | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'ALL' | 'INCORRECT' | 'FLAGGED'>('ALL');

  const allQuestions = currentTrack === 'JAPANESE' ? JAPANESE_QUESTIONS : KOREAN_QUESTIONS;

  const isJFT = (selectedMockTest?.examFormat === 'JFT_CBT' || selectedMockTest?.level === 'JFT') && selectedMockTest?.language === 'JAPANESE';
  const isEPS = selectedMockTest?.level === 'EPS' || selectedMockTest?.examFormat === 'EPS_CBT' || selectedMockTest?.language === 'KOREAN';

  const rawQuestions = React.useMemo(() => {
    if (!selectedMockTest) return allQuestions;
    let filtered = allQuestions.filter(
      (q) => q.mockSet === selectedMockTest.mockSet || (selectedMockTest.mockSet.startsWith('ALL_') && q.level === selectedMockTest.level)
    );
    if (filtered.length === 0 && isJFT) {
      filtered = allQuestions.filter((q) => q.level === 'JFT');
    }
    if (filtered.length === 0) {
      filtered = allQuestions.filter((q) => q.level === selectedMockTest.level);
    }
    return filtered;
  }, [allQuestions, selectedMockTest, isJFT]);

  // Filter questions according to current paper (JLPT) vs CBT (JFT)
  const currentPaperQuestions = React.useMemo(() => {
    if (!selectedMockTest || selectedMockTest.language !== 'JAPANESE' || rawQuestions.length < 40) {
      return rawQuestions;
    }
    if (isJFT) {
      if (currentJftSectionIndex === 0) return rawQuestions.slice(0, 12);  // Sec 1: Script & Vocab
      if (currentJftSectionIndex === 1) return rawQuestions.slice(12, 24); // Sec 2: Conversation
      if (currentJftSectionIndex === 2) return rawQuestions.slice(24, 36); // Sec 3: Listening
      return rawQuestions.slice(36); // Sec 4: Reading
    }
    if (currentPaperIndex === 0) return rawQuestions.slice(0, 36); // Paper 1: Vocab + Grammar + Reading (Q1 to Q36)
    return rawQuestions.slice(36); // Paper 2: Audio Listening (Q37 to Q44)
  }, [rawQuestions, currentPaperIndex, currentJftSectionIndex, selectedMockTest, isJFT]);

  const questions = currentPaperQuestions;
  const effectiveLevelFilter = preselectedLevel || selectedLevelFilter;

  const filteredCatalog = MOCK_TEST_CATALOG.filter((test) => {
    if (test.language !== currentTrack) return false;
    if (effectiveLevelFilter !== 'ALL') {
      const activeLvl = (effectiveLevelFilter === 'JFT_BASIC' || effectiveLevelFilter === 'JFT') ? 'JFT' : effectiveLevelFilter;
      if (test.level !== activeLvl) return false;
    }
    if (selectedDifficultyFilter !== 'ALL' && test.difficulty !== selectedDifficultyFilter) {
      return false;
    }
    return true;
  });

  const stopCurrentAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => {
    stopCurrentAudio();
  }, [currentIndex, currentPaperIndex, isSubmitted, showBreakModal, showExitConfirmModal, isExamActive]);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const handleStartExam = (test: MockTestInfo) => {
    stopCurrentAudio();
    setSelectedMockTest(test);
    setCurrentPaperIndex(0);
    setCurrentJftSectionIndex(0);
    setShowJftSectionLockModal(false);
    setPaper1Submitted(false);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setSecondsRemaining((test.timeLimitMinutes || 60) * 60);
    setIsSubmitted(false);
    setExamResult(null);
    setAudioPlaysCount({});
    setReviewFilter('ALL');
    setShowExitConfirmModal(false);
    setShowBreakModal(false);
    setIsExamActive(true);

    if (containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen().catch(() => {});
    }
    setIsFullscreen(true);
  };

  const handleFinishPaper1 = () => {
    stopCurrentAudio();
    setPaper1Submitted(true);
    setShowBreakModal(true);
    setBreakTimerSeconds(15 * 60);
  };

  const handleStartPaper2 = () => {
    stopCurrentAudio();
    setShowBreakModal(false);
    setCurrentPaperIndex(1);
    setCurrentIndex(0);
    setSecondsRemaining(30 * 60); // 30 mins for Paper 2 Listening
  };

  const handleBackButtonClick = () => {
    stopCurrentAudio();
    if (isExamActive && !isSubmitted) {
      setShowExitConfirmModal(true);
    } else {
      handleExitExam();
    }
  };

  const handleExitExam = () => {
    stopCurrentAudio();
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setIsFullscreen(false);
    setIsExamActive(false);
    setSelectedMockTest(null);
    setIsSubmitted(false);
    setExamResult(null);
    setShowExitConfirmModal(false);
    setShowBreakModal(false);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isExamActive || isSubmitted || showBreakModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        const currentQ = questions[currentIndex];
        if (currentQ && currentQ.options[idx]) {
          handleSelectAnswer(currentQ.options[idx]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExamActive, isSubmitted, showBreakModal, currentIndex, questions]);

  useEffect(() => {
    if (!showBreakModal) return;
    const breakInterval = setInterval(() => {
      setBreakTimerSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(breakInterval);
  }, [showBreakModal]);

  useEffect(() => {
    if (!isExamActive || isSubmitted) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
      return 'Your official exam session is currently in progress. Are you sure you want to leave?';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isExamActive, isSubmitted]);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  useEffect(() => {
    stopCurrentAudio();
    setIsExamActive(false);
    setSelectedMockTest(null);
    setSelectedLevelFilter(preselectedLevel || 'ALL');
    setIsSubmitted(false);
    setExamResult(null);
    setShowExitConfirmModal(false);
    setShowBreakModal(false);
  }, [activeLanguage, preselectedLevel]);

  useEffect(() => {
    if (!isExamActive || isSubmitted || showBreakModal) return;
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (currentPaperIndex === 0 && rawQuestions.length >= 40 && !isJFT) {
            handleFinishPaper1();
          } else {
            handleSubmitExam();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamActive, isSubmitted, currentPaperIndex, showBreakModal, isJFT]);

  const currentQ = questions[currentIndex] || questions[0];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (option: string) => {
    if (isSubmitted || !currentQ) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: option }));
  };

  const toggleFlag = (qId: string) => {
    setFlaggedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const playAudioPrompt = () => {
    if (!currentQ) return;
    const currentPlays = audioPlaysCount[currentQ.id] || 0;
    if (currentPlays >= 2) {
      alert('Rule: Audio can only be replayed a maximum of 2 times in official exam rules.');
      return;
    }

    stopCurrentAudio();
    setAudioPlaysCount((prev) => ({ ...prev, [currentQ.id]: currentPlays + 1 }));

    // Prefer explicit audioScript (TTS Japanese script) over audioUrl or prompt fallback
    const ttsText = currentQ.audioScript || currentQ.prompt;

    if (currentQ.audioUrl) {
      const audio = new Audio(currentQ.audioUrl);
      audioRef.current = audio;
      audio.play().catch(() => {
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(ttsText);
          utterance.lang = activeLanguage === 'JAPANESE' ? 'ja-JP' : 'ko-KR';
          utterance.rate = 0.85;
          utterance.pitch = 1.0;
          window.speechSynthesis.speak(utterance);
        }
      });
    } else if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(ttsText);
      utterance.lang = activeLanguage === 'JAPANESE' ? 'ja-JP' : 'ko-KR';
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Helper: works for both correctAnswer formats:
  // 1. Exact match: correctAnswer === "Water"  (old sets)
  // 2. Letter-only: correctAnswer === "A", selected === "A. Water"  (new JFT_EASY sets)
  const isAnswerCorrect = (q: ExamQuestion, selectedAnswer: string | undefined): boolean => {
    if (!selectedAnswer) return false;
    if (selectedAnswer === q.correctAnswer) return true;
    // Letter-prefix match: correctAnswer is single letter like 'A', 'B', 'C', 'D'
    if (/^[A-D]$/.test(q.correctAnswer)) {
      return selectedAnswer.startsWith(q.correctAnswer + '.');
    }
    return false;
  };

  const handleSubmitExam = () => {
    stopCurrentAudio();
    setIsSubmitted(true);
    let correctCount = 0;
    rawQuestions.forEach((q) => {
      if (isAnswerCorrect(q, selectedAnswers[q.id])) {
        correctCount++;
      }
    });

    const totalQ = rawQuestions.length || 1;
    const percentage = Math.round((correctCount / totalQ) * 100);
    const timeSpentSeconds = ((selectedMockTest?.timeLimitMinutes || 60) * 60) - secondsRemaining;

    if (isJFT) {
      // 4 JFT Section Scores (~12 Qs per section, totaling 250 marks)
      const sec1 = rawQuestions.slice(0, 12);
      const sec2 = rawQuestions.slice(12, 24);
      const sec3 = rawQuestions.slice(24, 36);
      const sec4 = rawQuestions.slice(36);

      const calcJftSec = (title: string, arr: ExamQuestion[], maxPts: number) => {
        const c = arr.filter(q => isAnswerCorrect(q, selectedAnswers[q.id])).length;
        const pts = arr.length ? Math.round((c / arr.length) * maxPts) : 0;
        return { sectionTitle: title, correct: c, total: arr.length, pts };
      };

      const jftSec1 = calcJftSec('Script & Vocabulary (文字・語彙)', sec1, 60);
      const jftSec2 = calcJftSec('Conversation & Expression (会話・表現)', sec2, 60);
      const jftSec3 = calcJftSec('Listening Comprehension (聴解)', sec3, 65);
      const jftSec4 = calcJftSec('Reading Comprehension (読解)', sec4, 65);

      const jftPoints = Math.max(10, Math.min(250, jftSec1.pts + jftSec2.pts + jftSec3.pts + jftSec4.pts));
      const passed = jftPoints >= 200;

      let cefrRank = 'Below A1 (Unranked)';
      if (jftPoints >= 200) cefrRank = 'A2.2 Level (SSW Visa Qualified 🎉)';
      else if (jftPoints >= 175) cefrRank = 'A2.1 Level (Elementary)';
      else if (jftPoints >= 145) cefrRank = 'A1 Level (Basic Beginner)';

      setExamResult({
        score: percentage,
        correctCount,
        totalQuestions: totalQ,
        passed,
        timeSpentSeconds: Math.max(1, timeSpentSeconds),
        jftScore: jftPoints,
        cefrRank,
        jftSections: [jftSec1, jftSec2, jftSec3, jftSec4]
      });

      if (onCompleteExam) {
        onCompleteExam({ score: jftPoints, passed, timeSpentSeconds });
      }
    } else {
      // Standard JLPT Paper Exam Scoring
      const passed = percentage >= 70;
      const p1Arr = rawQuestions.slice(0, 36);
      const p2Arr = rawQuestions.slice(36);

      const calcArr = (arr: ExamQuestion[]) => {
        const c = arr.filter(q => selectedAnswers[q.id] === q.correctAnswer).length;
        return { correct: c, total: arr.length, percentage: arr.length ? Math.round((c/arr.length)*100) : 0 };
      };

      setExamResult({
        score: percentage,
        correctCount,
        totalQuestions: totalQ,
        passed,
        timeSpentSeconds: Math.max(1, timeSpentSeconds),
        paper1Score: rawQuestions.length >= 40 ? calcArr(p1Arr) : undefined,
        paper2Score: rawQuestions.length >= 40 ? calcArr(p2Arr) : undefined,
      });

      if (onCompleteExam) {
        onCompleteExam({ score: percentage, passed, timeSpentSeconds });
      }
    }

    // Save to past score history
    if (selectedMockTest) {
      const newScoreRecord = {
        testId: selectedMockTest.id,
        title: selectedMockTest.title,
        score: isJFT ? (Math.max(10, Math.min(250, (percentage/100)*250))) : percentage,
        passed: percentage >= 70,
        date: new Date().toISOString().split('T')[0],
        timeSpent: `${Math.ceil((((selectedMockTest?.timeLimitMinutes || 60) * 60) - secondsRemaining) / 60)} Mins`
      };
      const updatedHistory = [newScoreRecord, ...pastScoresHistory];
      setPastScoresHistory(updatedHistory);
      if (typeof window !== 'undefined') {
        localStorage.setItem('lg_exam_history', JSON.stringify(updatedHistory));
      }
    }

    const check = validateExamSubmission(totalQ, timeSpentSeconds, percentage);
    if (!check.valid) {
      console.warn('[AntiCheat]', check.reason);
    }
  };

  // ----------------------------------------------------
  // LOBBY VIEW: DIRECTORY OF MOCK TESTS
  // ----------------------------------------------------
  if (!isExamActive) {
    return (
      <div className="w-full font-sans space-y-5">

        {/* ── TOP HEADER BAR: TABS & LAYOUT SWITCHER ── */}
        <div className="bg-white border border-[#e8decb] rounded-2xl p-3 shadow-md flex flex-wrap items-center justify-between gap-3 text-[#2d2219]">
          {/* Main Tabs: Mock Test vs Score */}
          <div className="flex items-center gap-1.5 bg-[#fbf6eb] p-1 rounded-xl border border-[#e8decb]">
            <button
              onClick={() => setLobbyTab('DIRECTORY')}
              className={`px-5 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
                lobbyTab === 'DIRECTORY'
                  ? 'bg-rose-800 text-white shadow-xs'
                  : 'text-[#5c4a3c] hover:text-rose-800'
              }`}
            >
              Mock Test
            </button>
            <button
              onClick={() => setLobbyTab('SCORES')}
              className={`px-5 py-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                lobbyTab === 'SCORES'
                  ? 'bg-rose-800 text-white shadow-xs'
                  : 'text-[#5c4a3c] hover:text-rose-800'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Score History</span>
              {pastScoresHistory.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-[#faf6ee] text-[10px] font-bold text-rose-800 border border-[#e8decb]">
                  {pastScoresHistory.length}
                </span>
              )}
            </button>
          </div>

          {/* Right Controls: Level Filter Dropdown & View Layout Switcher */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Level (Difficulty) Dropdown Filter in White Card */}
            <div className="flex items-center gap-1.5 bg-[#fbf6eb] px-3 py-1.5 rounded-xl border border-[#e8decb] shadow-xs">
              <label htmlFor="level-filter-select" className="text-xs font-black text-[#5c4a3c] flex items-center gap-1 shrink-0 cursor-pointer">
                <Filter className="w-3.5 h-3.5 text-rose-800" />
                <span>Level:</span>
              </label>
              <select
                id="level-filter-select"
                value={selectedDifficultyFilter}
                onChange={(e) => setSelectedDifficultyFilter(e.target.value as any)}
                className="bg-transparent text-[#2d2219] font-black text-xs py-0.5 px-1 focus:outline-none cursor-pointer"
              >
                <option value="ALL">All (Easy, Medium, Hard)</option>
                <option value="EASY">🟢 Easy</option>
                <option value="MEDIUM">🟡 Medium</option>
                <option value="HARD">🔴 Hard</option>
              </select>
            </div>

            {/* Exam Level Dropdown Filter */}
            {!preselectedLevel && (
              <div className="flex items-center gap-1.5 bg-[#fbf6eb] px-3 py-1.5 rounded-xl border border-[#e8decb] shadow-xs">
                <label htmlFor="exam-level-filter-select" className="text-xs font-black text-[#5c4a3c] flex items-center gap-1 shrink-0 cursor-pointer">
                  <Layers className="w-3.5 h-3.5 text-indigo-700" />
                  <span>Exam:</span>
                </label>
                <select
                  id="exam-level-filter-select"
                  value={selectedLevelFilter}
                  onChange={(e) => setSelectedLevelFilter(e.target.value)}
                  className="bg-transparent text-[#2d2219] font-black text-xs py-0.5 px-1 focus:outline-none cursor-pointer"
                >
                  <option value="ALL">All Exams</option>
                  {currentTrack === 'JAPANESE' ? (
                    <>
                      <option value="JFT">💻 JFT-Basic (A2)</option>
                      <option value="N5">🇯🇵 JLPT N5</option>
                      <option value="N4">🇯🇵 JLPT N4</option>
                      <option value="N3">🇯🇵 JLPT N3</option>
                      <option value="N2">🇯🇵 JLPT N2</option>
                    </>
                  ) : (
                    <>
                      <option value="EPS">🇰🇷 EPS-TOPIK</option>
                      <option value="TOPIK2">🇰🇷 TOPIK II</option>
                      <option value="TOPIK3">🇰🇷 TOPIK III</option>
                    </>
                  )}
                </select>
              </div>
            )}

            {/* View Switcher: List vs Grid */}
            <div className="flex items-center gap-1 bg-[#fbf6eb] p-1 rounded-xl border border-[#e8decb]">
              <button
                onClick={() => setViewLayout('LIST')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewLayout === 'LIST'
                    ? 'bg-rose-800 text-white shadow-xs'
                    : 'text-[#5c4a3c] hover:text-rose-800'
                }`}
                title="Horizontal List View"
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">List View</span>
              </button>
              <button
                onClick={() => setViewLayout('GRID')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewLayout === 'GRID'
                    ? 'bg-rose-800 text-white shadow-xs'
                    : 'text-[#5c4a3c] hover:text-rose-800'
                }`}
                title="Grid Cards View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid View</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── MOCK TEST DIRECTORY TAB ── */}
        {lobbyTab === 'DIRECTORY' && (
          <div className="space-y-4">
            {/* ── LIST VIEW MODE ── */}
            {viewLayout === 'LIST' ? (
              <div className="space-y-3">
                {filteredCatalog.map((test) => {
                  const isUnlocked = !test.isPremium || unlockedMockSetIds.includes(test.mockSet) || unlockedMockSetIds.includes(test.id);

                  return (
                    <div
                      key={test.id}
                      className="group bg-white border border-[#e8decb] hover:border-rose-300 hover:shadow-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xs transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[#2d2219]"
                    >
                      {/* Left: Title & Info */}
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base sm:text-lg font-black text-[#2d2219] group-hover:text-rose-800 transition-colors">
                            {test.title}
                          </h3>
                        </div>
                        {test.japaneseTitle && (
                          <div className="text-xs font-bold font-jp text-[#7c6a5a]">
                            {test.japaneseTitle}
                          </div>
                        )}
                        <div className="flex items-center gap-3 text-xs font-bold text-[#6e5d4f] flex-wrap pt-1">
                          <span className="flex items-center gap-1 text-amber-900 font-extrabold bg-[#fbf6eb] px-2 py-0.5 rounded-lg border border-[#e8decb]">
                            <Clock className="w-3.5 h-3.5 text-amber-700" />
                            <span>Approx Time : {test.timeLimitMinutes} mins</span>
                          </span>
                          <span>•</span>
                          <span>{test.questionCount} Questions</span>
                          <span>•</span>
                          <span>{test.examFormat === 'EPS_CBT' ? 'EPS CBT' : test.examFormat === 'JFT_CBT' ? 'JFT CBT' : 'Paper Exam'}</span>
                        </div>
                      </div>

                      {/* Middle: Promo Code Link */}
                      <div className="flex items-center justify-start md:justify-center px-2 shrink-0">
                        <button
                          onClick={() => {
                            setSelectedBuyTest(test);
                            setPromoCodeInput('');
                            setPromoMessage(null);
                            setShowBuyModal(true);
                          }}
                          className="text-xs font-bold text-[#7c6a5a] hover:text-rose-800 transition-colors cursor-pointer flex items-center gap-1 group/code"
                        >
                          <span>Have a code?</span>
                          <span className="text-rose-800 underline decoration-rose-800/50 group-hover/code:text-rose-900 font-black">
                            Click here
                          </span>
                        </button>
                      </div>

                      {/* Right: Badges & Action CTA Button */}
                      <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#e8decb]">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2.5 py-1 rounded-lg bg-[#fbf6eb] text-[#2d2219] border border-[#e8decb] text-xs font-black">
                            {test.level === 'JFT' ? 'JFT-Basic' : `JLPT ${test.level}`}
                          </span>
                          {test.difficulty && (
                            <span className={`px-2.5 py-1 rounded-lg text-xs font-black border ${
                              test.difficulty === 'EASY'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : test.difficulty === 'MEDIUM'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : 'bg-rose-50 text-rose-800 border-rose-200'
                            }`}>
                              {test.difficulty === 'EASY' ? 'Easy' : test.difficulty === 'MEDIUM' ? 'Medium' : 'Hard'}
                            </span>
                          )}
                        </div>

                        {/* Action Button: Start vs Buy */}
                        {isUnlocked ? (
                          <button
                            onClick={() => handleStartExam(test)}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-800 to-rose-600 hover:from-rose-700 hover:to-rose-500 text-white text-xs font-black transition-all shadow-sm flex items-center gap-1.5 cursor-pointer min-w-[90px] justify-center"
                          >
                            <Play className="w-3.5 h-3.5 fill-white" />
                            <span>Start</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedBuyTest(test);
                              setPromoCodeInput('');
                              setPromoMessage(null);
                              setShowBuyModal(true);
                            }}
                            className="px-5 py-2.5 rounded-xl bg-[#fbf6eb] hover:bg-rose-50 text-rose-800 border border-rose-300 text-xs font-black transition-all shadow-xs flex items-center gap-1.5 cursor-pointer min-w-[90px] justify-center"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Buy ({test.price})</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* ── GRID CARDS VIEW MODE ── */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCatalog.map((test) => {
                  const isUnlocked = !test.isPremium || unlockedMockSetIds.includes(test.mockSet) || unlockedMockSetIds.includes(test.id);

                  return (
                    <div
                      key={test.id}
                      className="group bg-white border border-[#e8decb] hover:border-rose-300 hover:shadow-md rounded-3xl p-6 shadow-xs transition-all duration-300 flex flex-col justify-between text-[#2d2219]"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-3 py-1 rounded-xl text-xs font-black text-white bg-gradient-to-r ${test.badgeColor} shadow-xs`}>
                              {test.examFormat === 'EPS_CBT' ? '🇰🇷 EPS-TOPIK CBT' : test.examFormat === 'JFT_CBT' ? '💻 JFT-Basic CBT' : `📄 JLPT ${test.level}`}
                            </span>
                            {test.difficulty && (
                              <span className={`px-2 py-0.5 rounded-lg text-xs font-black border ${
                                test.difficulty === 'EASY'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : test.difficulty === 'MEDIUM'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : 'bg-rose-50 text-rose-800 border-rose-200'
                              }`}>
                                {test.difficulty === 'EASY' ? '🟢 Easy' : test.difficulty === 'MEDIUM' ? '🟡 Medium' : '🔴 Hard'}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-black text-amber-900 bg-[#fbf6eb] px-2.5 py-1 rounded-lg border border-[#e8decb]">
                            <Clock className="w-3.5 h-3.5 text-amber-700" />
                            <span>{test.timeLimitMinutes} Mins</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-black text-[#2d2219] group-hover:text-rose-800 transition-colors">
                          {test.title}
                        </h3>
                        {test.japaneseTitle && (
                          <div className="text-xs font-bold font-jp text-[#7c6a5a] mt-0.5 mb-2">
                            {test.japaneseTitle}
                          </div>
                        )}
                        <p className="text-xs text-[#5c4a3c] font-semibold leading-relaxed mb-4">
                          {test.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#e8decb] flex items-center justify-between">
                        <button
                          onClick={() => {
                            setSelectedBuyTest(test);
                            setPromoCodeInput('');
                            setPromoMessage(null);
                            setShowBuyModal(true);
                          }}
                          className="text-xs font-bold text-[#7c6a5a] hover:text-rose-800 transition-colors cursor-pointer"
                        >
                          Have a code? <span className="underline text-rose-800 font-black">Click here</span>
                        </button>

                        {isUnlocked ? (
                          <button
                            onClick={() => handleStartExam(test)}
                            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-800 to-rose-600 hover:from-rose-700 hover:to-rose-500 text-white font-black text-xs shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                          >
                            <Play className="w-4 h-4 fill-white" />
                            <span>Start</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedBuyTest(test);
                              setPromoCodeInput('');
                              setPromoMessage(null);
                              setShowBuyModal(true);
                            }}
                            className="px-5 py-2.5 rounded-2xl bg-[#fbf6eb] hover:bg-rose-50 text-rose-800 border border-rose-300 font-black text-xs transition-all flex items-center gap-2 cursor-pointer"
                          >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Buy ({test.price})</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── PAST SCORE HISTORY TAB ── */}
        {lobbyTab === 'SCORES' && (
          <div className="bg-white border border-[#e8decb] rounded-3xl p-6 shadow-sm space-y-4 font-sans text-[#2d2219]">
            <div className="flex items-center justify-between border-b border-[#e8decb] pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-700" />
                <h2 className="text-lg font-black text-[#2d2219]">Your Exam Score History</h2>
              </div>
              <span className="text-xs font-bold text-[#7c6a5a]">{pastScoresHistory.length} Attempts</span>
            </div>

            {pastScoresHistory.length === 0 ? (
              <div className="text-center py-12 text-[#7c6a5a] text-sm font-bold">
                No past exam attempts recorded yet. Select a mock test to begin!
              </div>
            ) : (
              <div className="divide-y divide-[#e8decb]">
                {pastScoresHistory.map((item, idx) => (
                  <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-black text-[#2d2219]">{item.title}</div>
                      <div className="text-xs font-bold text-[#7c6a5a] flex items-center gap-3 mt-1">
                        <span>📅 {item.date}</span>
                        <span>⏱️ {item.timeSpent}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-xl text-xs font-black border ${
                        item.passed
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}>
                        Score: {item.score} {item.title.includes('JFT') ? '/ 250 Pts' : '%'} ({item.passed ? 'PASSED 🎉' : 'FAILED'})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── PURCHASE & PROMO CODE REDEEM MODAL ── */}
        {showBuyModal && selectedBuyTest && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-5 font-sans relative">
              <button
                onClick={() => setShowBuyModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-600 flex items-center justify-center text-white text-xl shadow-glow">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">{selectedBuyTest.title}</h3>
                  <p className="text-xs font-bold text-rose-400">
                    {selectedBuyTest.isPremium ? `Access Pass Price: ${selectedBuyTest.price}` : 'Free Exam Access'}
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between font-bold">
                  <span>Questions &amp; Duration:</span>
                  <span className="text-white">{selectedBuyTest.questionCount} Qs • {selectedBuyTest.timeLimitMinutes} Mins</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Exam Format:</span>
                  <span className="text-indigo-400">{selectedBuyTest.examFormat}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Audio Listening:</span>
                  <span className="text-emerald-400">{selectedBuyTest.audioCount} Native Audio Tracks</span>
                </div>
              </div>

              {/* Enter Access / Promo Code Section (Have a Code?) */}
              <div className="space-y-2 border-t border-slate-800 pt-3">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  <span>Have a promo code? Enter here:</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="Enter GURU2026 or N5FREE"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-extrabold text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 uppercase"
                  />
                  <button
                    onClick={() => {
                      if (!promoCodeInput.trim()) return;
                      const code = promoCodeInput.trim().toUpperCase();
                      if (['GURU2026', 'N5FREE', 'VIPPASS', 'JFT2026', 'FREEPASS', 'N5PASS', 'EPSVIP'].includes(code)) {
                        const updated = Array.from(new Set([...unlockedMockSetIds, selectedBuyTest.mockSet, selectedBuyTest.id]));
                        setUnlockedMockSetIds(updated);
                        if (typeof window !== 'undefined') {
                          localStorage.setItem('lg_unlocked_mock_sets', JSON.stringify(updated));
                        }
                        setPromoMessage({ text: '🎉 Valid Code! Test unlocked successfully.', success: true });
                        setTimeout(() => {
                          setShowBuyModal(false);
                          setPromoMessage(null);
                        }, 1200);
                      } else {
                        setPromoMessage({ text: 'Invalid code. Try "GURU2026" or "N5FREE".', success: false });
                      }
                    }}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <div className={`text-xs font-bold px-2 py-1 rounded-lg ${promoMessage.success ? 'text-emerald-400 bg-emerald-950/60' : 'text-rose-400 bg-rose-950/60'}`}>
                    {promoMessage.text}
                  </div>
                )}
              </div>

              {/* Unlock / Buy Direct Checkout */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    const updated = Array.from(new Set([...unlockedMockSetIds, selectedBuyTest.mockSet, selectedBuyTest.id]));
                    setUnlockedMockSetIds(updated);
                    if (typeof window !== 'undefined') {
                      localStorage.setItem('lg_unlocked_mock_sets', JSON.stringify(updated));
                    }
                    setPromoMessage({ text: `🎉 Purchase complete! Unlocked ${selectedBuyTest.title}.`, success: true });
                    setTimeout(() => {
                      setShowBuyModal(false);
                      setPromoMessage(null);
                    }, 1200);
                  }}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-black text-xs shadow-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Unlock &amp; Get Test Pass ({selectedBuyTest.price})</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------------------
  // INTERACTIVE ACTIVE EXAM VIEW (FULL SCREEN MODE)
  // ----------------------------------------------------
  return (
    <div
      ref={containerRef}
      className={`w-full font-sans transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 overflow-y-auto bg-slate-950 p-3 sm:p-6 space-y-4'
          : 'max-w-5xl mx-auto space-y-4'
      }`}
    >
      {/* Official 15-Min Break Modal (Between Paper 1 and Paper 2 for JLPT) */}
      {showBreakModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-4xl mx-auto shadow-glow">
              ☕
            </div>

            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black uppercase tracking-wider mb-2">
                ✓ Paper 1 (Vocab, Grammar & Reading) Collected & Saved
              </div>
              <h3 className="text-2xl font-black text-white">
                Official Exam Break Interval
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                In official JLPT exams, Paper 1 is collected before Paper 2 begins. You can rest now for up to 15 minutes before opening Paper 2 (Listening Audio Section).
              </p>
            </div>

            {/* Break Countdown Display */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-center gap-3">
              <Clock className="w-6 h-6 text-amber-400 animate-pulse" />
              <div className="text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Break Timer</div>
                <div className="text-3xl font-black font-mono text-amber-400 tracking-wider">
                  {formatTime(breakTimerSeconds)}
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleStartPaper2}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-glow transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Headphones className="w-4 h-4" />
                <span>Begin Paper 2: Listening Audio Section (30 Mins) ➔</span>
              </button>

              <p className="text-[11px] text-slate-400 italic">
                Note: Once Paper 2 begins, you cannot return to Paper 1 questions.
              </p>
            </div>
          </div>
        </div>
      )}

            {/* Official JFT CBT Section Lock Confirmation Modal */}
      {showJftSectionLockModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-3xl mx-auto shadow-glow">
              🔒
            </div>
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-black uppercase tracking-wider mb-2">
                Prometric CBT Section Lock
              </div>
              <h3 className="text-xl font-black text-white">
                Complete & Seal Section {currentJftSectionIndex + 1}?
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Official Prometric Rule: Once you submit and advance past Section {currentJftSectionIndex + 1}, your answers in this section will be permanently locked and cannot be edited.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  stopCurrentAudio();
                  setShowJftSectionLockModal(false);
                  setCurrentJftSectionIndex((prev) => prev + 1);
                  setCurrentIndex(0);
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-xs shadow-glow transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <span>Lock Section {currentJftSectionIndex + 1} & Proceed to Section {currentJftSectionIndex + 2} 🔒 ➔</span>
              </button>

              <button
                onClick={() => setShowJftSectionLockModal(false)}
                className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all cursor-pointer"
              >
                Review Section {currentJftSectionIndex + 1} Questions
              </button>
            </div>
          </div>
        </div>
      )}

{/* Exit Confirmation Modal Prompt */}
      {showExitConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Exit Official Session?</h3>
                <p className="text-xs text-amber-300 font-medium">An official timed exam paper is in progress.</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
              Leaving now will interrupt your exam for <span className="font-bold text-white">{selectedMockTest?.title}</span>. Submit current answers or exit?
            </p>

            <div className="space-y-2.5 pt-1">
              <button
                onClick={() => {
                  setShowExitConfirmModal(false);
                  handleSubmitExam();
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Exam & View Marks</span>
              </button>

              <button
                onClick={() => {
                  setShowExitConfirmModal(false);
                  handleExitExam();
                }}
                className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-300 font-bold text-xs transition-all flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Exit Without Submitting</span>
              </button>

              <button
                onClick={() => setShowExitConfirmModal(false)}
                className="w-full py-2 rounded-xl text-slate-400 hover:text-white font-bold text-xs transition-colors cursor-pointer"
              >
                ▶ Resume Exam Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackButtonClick}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700 cursor-pointer"
            title="Exit or Submit Exam"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400 flex-wrap">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span>{isJFT ? 'JFT-Basic CBT Official Exam (250 Marks Scale)' : `${selectedMockTest?.level} Official Timed Examination`}</span>
              {rawQuestions.length >= 40 && !isJFT && (
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                  currentPaperIndex === 0 ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/40' : 'bg-emerald-600/30 text-emerald-300 border-emerald-500/40'
                }`}>
                  {currentPaperIndex === 0 ? 'Paper 1: Vocab + Grammar + Reading' : 'Paper 2: Audio Listening'}
                </span>
              )}
              {isJFT && (
                <span className="px-2 py-0.5 rounded-md bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold">
                  {currentJftSectionIndex === 0 && 'Sec 1: 文字・語彙 (Script & Vocab)'}
                  {currentJftSectionIndex === 1 && 'Sec 2: 会話・表現 (Conversation)'}
                  {currentJftSectionIndex === 2 && 'Sec 3: 聴解 (Listening)'}
                  {currentJftSectionIndex === 3 && 'Sec 4: 読解 (Reading)'}
                </span>
              )}
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white mt-0.5">
              {selectedMockTest?.title || 'JLPT Mock Examination'}
            </h2>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800 flex-wrap">
          {/* Full Screen Mode Toggle Button */}
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all cursor-pointer"
            title={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen Exam Mode'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-amber-400" /> : <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit Full Screen' : 'Full Screen'}</span>
          </button>

          {/* Timer Display */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
              secondsRemaining < 180
                ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-slate-950 border-slate-800 text-amber-400'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-base sm:text-lg font-black font-mono tracking-wider">{formatTime(secondsRemaining)}</span>
          </div>

          {!isSubmitted && (
            <button
              onClick={() => {
                if (isJFT) {
                  if (currentJftSectionIndex < 3) setShowJftSectionLockModal(true);
                  else handleSubmitExam();
                } else if (currentPaperIndex === 0 && rawQuestions.length >= 40) {
                  handleFinishPaper1();
                } else {
                  handleSubmitExam();
                }
              }}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-glow transition-all cursor-pointer"
            >
              {isJFT
                ? (currentJftSectionIndex < 3 ? `Lock Section ${currentJftSectionIndex + 1} 🔒 ➔` : 'Submit Final CBT Exam 🏁')
                : (currentPaperIndex === 0 && rawQuestions.length >= 40 ? 'Submit Paper 1 ➔' : 'Submit Final Exam 🏁')}
            </button>
          )}
        </div>
      </div>

      {/* POST-SUBMISSION MARKS & REVIEW SCREEN (PROMETRIC CBT / JLPT SCORECARD) */}
      {isSubmitted && examResult && (
        <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Marks Summary Hero Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-5">
              <div
                className={`w-28 h-28 rounded-3xl flex flex-col items-center justify-center font-black text-white shadow-2xl ${
                  examResult.passed ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-emerald-900/40' : 'bg-gradient-to-tr from-rose-600 to-pink-600 shadow-rose-900/40'
                }`}
              >
                {isJFT ? (
                  <>
                    <span className="text-3xl">{examResult.jftScore}</span>
                    <span className="text-[10px] text-slate-200">/ 250 PTS</span>
                    <span className="text-[9px] uppercase font-bold tracking-wider mt-0.5">{examResult.passed ? 'PASSED' : 'FAILED'}</span>
                  </>
                ) : (
                  <>
                    <span className="text-3xl">{examResult.score}%</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider">{examResult.passed ? 'PASSED' : 'FAILED'}</span>
                  </>
                )}
              </div>

              <div className="space-y-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    {isJFT ? 'Prometric CBT Score Report' : 'Official Exam Scorecard'}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      examResult.passed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {isJFT
                      ? `★ ${examResult.cefrRank || (examResult.passed ? 'A2.2 Level • SSW Visa Qualified (200+ Pts)' : 'Below 200 Pts Benchmark')}`
                      : (examResult.passed ? '★ JLPT Certificate Eligible' : 'Retake Practice Advised')}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white">
                  {selectedMockTest?.title || 'JLPT Mock Examination'}
                </h3>
                <p className="text-xs text-slate-400">
                  Time Spent: <span className="font-bold text-white">{Math.floor(examResult.timeSpentSeconds / 60)}m {examResult.timeSpentSeconds % 60}s</span> • Questions Correct: <span className="font-bold text-white">{examResult.correctCount} / {examResult.totalQuestions}</span> ({examResult.score}%)
                </p>

                {/* Sectional Breakdown for JFT-Basic (250 Marks Scale) */}
                {isJFT && examResult.jftSections && (
                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                    {examResult.jftSections.map((sec, secIdx) => (
                      <div key={secIdx} className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-300 text-[11px] font-bold">{sec.sectionTitle}</span>
                        <span className="text-amber-400 font-extrabold">{sec.pts} Pts ({sec.correct}/{sec.total})</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Sectional Breakdown for JLPT 2-Paper */}
                {!isJFT && examResult.paper1Score && examResult.paper2Score && (
                  <div className="flex items-center gap-2 pt-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-950/80 border border-indigo-800 text-[11px] font-bold text-indigo-300">
                      Paper 1 (Vocab/Grammar/Reading): <span className="text-amber-400">{examResult.paper1Score.correct}/{examResult.paper1Score.total} ({examResult.paper1Score.percentage}%)</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800 text-[11px] font-bold text-emerald-300">
                      Paper 2 (Listening Audio): <span className="text-amber-400">{examResult.paper2Score.correct}/{examResult.paper2Score.total} ({examResult.paper2Score.percentage}%)</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  stopCurrentAudio();
                  setIsSubmitted(false);
                  setExamResult(null);
                  setSelectedAnswers({});
                  setFlaggedQuestions({});
                  setCurrentPaperIndex(0);
    setCurrentJftSectionIndex(0);
    setShowJftSectionLockModal(false);
                  setPaper1Submitted(false);
                  setSecondsRemaining((selectedMockTest?.timeLimitMinutes || 60) * 60);
                  setCurrentIndex(0);
                }}
                className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all flex items-center gap-2 border border-slate-700 shadow cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>Retake Exam</span>
              </button>

              <button
                onClick={handleExitExam}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-glow transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Catalog</span>
              </button>
            </div>
          </div>

          {/* Detailed Review Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Detailed Question Review & Explanation Solutions ({rawQuestions.length} Questions)</span>
              </h4>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setReviewFilter('ALL')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    reviewFilter === 'ALL' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All ({rawQuestions.length})
                </button>
                <button
                  onClick={() => setReviewFilter('INCORRECT')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    reviewFilter === 'INCORRECT' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Incorrect ({rawQuestions.filter((q) => selectedAnswers[q.id] !== q.correctAnswer).length})
                </button>
                <button
                  onClick={() => setReviewFilter('FLAGGED')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    reviewFilter === 'FLAGGED' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Flagged ({Object.keys(flaggedQuestions).filter((k) => flaggedQuestions[k]).length})
                </button>
              </div>
            </div>

            {/* Questions Detailed List */}
            <div className="space-y-4">
              {rawQuestions
                .filter((q) => {
                  if (reviewFilter === 'INCORRECT') return !isAnswerCorrect(q, selectedAnswers[q.id]);
                  if (reviewFilter === 'FLAGGED') return Boolean(flaggedQuestions[q.id]);
                  return true;
                })
                .map((q, qIdx) => {
                  const userAnswer = selectedAnswers[q.id];
                  const isCorrect = isAnswerCorrect(q, userAnswer);
                  // For letter-based answers, identify which option is the correct one
                  const correctOptionText = /^[A-D]$/.test(q.correctAnswer)
                    ? q.options.find(o => o.startsWith(q.correctAnswer + '.'))
                    : q.correctAnswer;

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl border transition-all space-y-3 ${
                        isCorrect ? 'bg-slate-950/80 border-emerald-500/40' : 'bg-slate-950/80 border-rose-500/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                              isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                            }`}
                          >
                            {qIdx + 1}
                          </span>
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                            {q.level} • {q.type}
                          </span>
                        </div>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 ${
                            isCorrect ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {isCorrect ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          {isCorrect ? 'Correct Answer' : 'Incorrect'}
                        </span>
                      </div>

                      <div className="text-sm font-bold text-white">{q.prompt}</div>

                      {/* Audio Track Replay in Review — supports TTS audioScript */}
                      {q.type === 'LISTENING' && (q.audioUrl || q.audioScript) && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              stopCurrentAudio();
                              if (q.audioUrl) {
                                const audio = new Audio(q.audioUrl);
                                audioRef.current = audio;
                                audio.play().catch(() => {
                                  if ('speechSynthesis' in window && q.audioScript) {
                                    const utt = new SpeechSynthesisUtterance(q.audioScript);
                                    utt.lang = 'ja-JP'; utt.rate = 0.85;
                                    window.speechSynthesis.speak(utt);
                                  }
                                });
                              } else if ('speechSynthesis' in window && q.audioScript) {
                                const utt = new SpeechSynthesisUtterance(q.audioScript);
                                utt.lang = 'ja-JP'; utt.rate = 0.85;
                                window.speechSynthesis.speak(utt);
                              }
                            }}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer"
                          >
                            <Volume2 className="w-3.5 h-3.5" /> Replay Audio
                          </button>
                          {q.audioScript && (
                            <span className="text-[11px] text-slate-400 italic truncate max-w-xs">
                              🎧 "{q.audioScript.slice(0, 60)}{q.audioScript.length > 60 ? '…' : ''}"
                            </span>
                          )}
                        </div>
                      )}

                      {/* Options Comparison Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {q.options.map((opt, oIdx) => {
                          const isOptionSelected = userAnswer === opt;
                          const isOptionCorrect = opt === correctOptionText;

                          let style = 'bg-slate-900 border-slate-800 text-slate-400';
                          if (isOptionCorrect) {
                            style = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                          } else if (isOptionSelected) {
                            style = 'bg-rose-950 border-rose-500 text-rose-200 line-through opacity-80';
                          }

                          return (
                            <div key={oIdx} className={`p-2.5 rounded-xl border flex items-center justify-between ${style}`}>
                              <span>{opt}</span>
                              {isOptionCorrect && <span className="text-[10px] font-extrabold text-emerald-400 uppercase">Correct Answer</span>}
                              {isOptionSelected && !isOptionCorrect && <span className="text-[10px] font-extrabold text-rose-400 uppercase">Your Choice</span>}
                            </div>
                          );
                        })}
                      </div>

                      {/* Detailed Explanation */}
                      {q.explanation && (
                        <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/50 text-xs text-indigo-200">
                          <span className="font-bold text-indigo-300 block mb-0.5">💡 Solution Explanation:</span>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Main Interactive Question Panel (When taking exam) */}
      {!isSubmitted && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {currentQ ? (
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl flex flex-col justify-between">
              <div>
                {/* Header info & Top Quick Next/Prev Controls */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 flex-wrap gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-extrabold">
                      Question {currentIndex + 1} of {questions.length}
                    </span>
                    {rawQuestions.length >= 40 && !isJFT && (
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${
                        currentPaperIndex === 0 ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300' : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                      }`}>
                        {currentPaperIndex === 0 ? 'Paper 1 (Vocab/Grammar/Reading)' : 'Paper 2 (Listening Audio)'}
                      </span>
                    )}
                    {isJFT && (
                      <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold">
                        CBT Section Locked
                      </span>
                    )}
                  </div>

                  {/* FAST TOP NEXT / PREV BUTTONS (ALWAYS VISIBLE AT TOP) */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                      disabled={currentIndex === 0}
                      className="px-3 py-1 rounded-lg bg-slate-800 disabled:opacity-30 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Prev
                    </button>

                    {currentIndex < questions.length - 1 ? (
                      <button
                        onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
                        className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-glow cursor-pointer"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (isJFT) {
                            if (currentJftSectionIndex < 3) setShowJftSectionLockModal(true);
                            else handleSubmitExam();
                          } else if (currentPaperIndex === 0 && rawQuestions.length >= 40) {
                            handleFinishPaper1();
                          } else {
                            handleSubmitExam();
                          }
                        }}
                        className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-glow cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>
                          {isJFT
                            ? (currentJftSectionIndex < 3 ? `Lock Sec ${currentJftSectionIndex + 1} 🔒 ➔` : 'Submit Final CBT Exam 🏁')
                            : (currentPaperIndex === 0 && rawQuestions.length >= 40 ? 'Submit Paper 1 ➔' : 'Submit Exam 🏁')}
                        </span>
                      </button>
                    )}

                    <button
                      onClick={() => toggleFlag(currentQ.id)}
                      className={`p-1.5 rounded-lg text-xs border transition-all cursor-pointer ml-1 ${
                        flaggedQuestions[currentQ.id]
                          ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                      title={flaggedQuestions[currentQ.id] ? 'Flagged for Review' : 'Flag Question'}
                    >
                      <Flag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  {currentQ.type === 'LISTENING' && (
                    <div className="mb-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          <Volume2 className="w-5 h-5 animate-pulse" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Audio Listening Track</div>
                          <div className="text-[11px] text-slate-400">
                            Played: {audioPlaysCount[currentQ.id] || 0} / 2 times max
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={playAudioPrompt}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                      >
                        ▶ Play Audio (TTS)
                      </button>
                    </div>
                  )}

                  {/* Reading Passage (for reading comprehension questions) */}
                  {currentQ.passage && (
                    <div className="mb-3 p-4 rounded-2xl bg-slate-950 border border-amber-500/30 text-sm text-slate-200 font-jp leading-relaxed whitespace-pre-line">
                      <div className="text-[10px] font-black uppercase tracking-wider text-amber-400 mb-2">📄 読解パッセージ (Reading Passage)</div>
                      {currentQ.passage}
                    </div>
                  )}

                  {/* Furigana Reading hint (for kanji recognition questions) */}
                  {currentQ.reading && (
                    <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-900/40 border border-indigo-500/30 text-indigo-200 text-xs">
                      <span className="font-black text-indigo-300">読み方:</span>
                      <span className="font-jp text-base font-bold tracking-wider">{currentQ.reading}</span>
                    </div>
                  )}

                  <h3 className="text-sm sm:text-lg font-extrabold text-slate-100 leading-relaxed font-jp whitespace-pre-line bg-slate-950/60 p-3 sm:p-4 rounded-2xl border border-slate-800/80 break-words overflow-hidden">
                    {currentQ.prompt}
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedAnswers[currentQ.id] === option;

                    let optionStyle = 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-slate-700';
                    if (isSelected) {
                      optionStyle = 'bg-indigo-950/90 border-indigo-500 text-indigo-200 shadow-glow font-bold';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectAnswer(option)}
                        className={`w-full text-left p-3 sm:p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer gap-2 ${optionStyle}`}
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                          <span className="w-7 h-7 shrink-0 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                            {idx + 1}
                          </span>
                          <span className="text-xs sm:text-sm font-medium break-words leading-snug">{option}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Action Bar: Previous, Next, and Submit on Last Question */}
              <div className="flex items-center justify-between pt-4 mt-5 border-t border-slate-800 gap-3">
                <button
                  onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 rounded-xl bg-slate-800 disabled:opacity-30 hover:bg-slate-700 text-slate-200 text-xs font-extrabold transition-all flex items-center gap-1.5 border border-slate-700 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="text-[11px] text-slate-400 hidden sm:block">
                  Press <kbd className="px-1.5 py-0.5 bg-slate-950 rounded border border-slate-800 text-slate-300 font-mono">➔</kbd> for Next
                </div>

                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
                    className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-black transition-all flex items-center gap-2 shadow-glow cursor-pointer"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (isJFT) {
                        if (currentJftSectionIndex < 3) setShowJftSectionLockModal(true);
                        else handleSubmitExam();
                      } else if (currentPaperIndex === 0 && rawQuestions.length >= 40) {
                        handleFinishPaper1();
                      } else {
                        handleSubmitExam();
                      }
                    }}
                    className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-black transition-all flex items-center gap-2 shadow-glow cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {isJFT
                        ? (currentJftSectionIndex < 3 ? `Lock Section ${currentJftSectionIndex + 1} & Proceed 🔒 ➔` : 'Submit Final CBT Exam 🏁')
                        : (currentPaperIndex === 0 && rawQuestions.length >= 40 ? 'Submit Paper 1 ➔' : 'Submit Final Exam 🏁')}
                    </span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-8 text-center text-slate-400">
              No questions available for this section.
            </div>
          )}

          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Question Navigator
                </h4>
                {rawQuestions.length >= 40 && !isJFT && (
                  <span className="text-[10px] font-bold text-amber-400">
                    {currentPaperIndex === 0 ? 'Paper 1 (Q1-36)' : 'Paper 2 (Q37-44)'}
                  </span>
                )}
                {isJFT && (
                  <span className="text-[10px] font-bold text-cyan-400">
                    {currentJftSectionIndex === 0 && 'Sec 1 (Q1-12)'}
                    {currentJftSectionIndex === 1 && 'Sec 2 (Q13-24)'}
                    {currentJftSectionIndex === 2 && 'Sec 3 (Q25-36)'}
                    {currentJftSectionIndex === 3 && 'Sec 4 (Q37-end)'}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-5 gap-2 mb-4 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
                {questions.map((q, idx) => {
                  const isAnswered = Boolean(selectedAnswers[q.id]);
                  const isFlagged = Boolean(flaggedQuestions[q.id]);
                  const isCurrent = idx === currentIndex;

                  let gridStyle = 'bg-slate-950 border-slate-800 text-slate-400';

                  if (isCurrent) {
                    gridStyle = 'ring-2 ring-indigo-500 border-indigo-400 text-white font-bold bg-slate-800';
                  } else if (isFlagged) {
                    gridStyle = 'bg-amber-950/80 border-amber-500 text-amber-300 font-bold';
                  } else if (isAnswered) {
                    gridStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative h-9 rounded-xl border text-xs flex items-center justify-center transition-all cursor-pointer ${gridStyle}`}
                    >
                      <span>{idx + 1}</span>
                      {isFlagged && <Flag className="absolute top-0.5 right-0.5 w-2.5 h-2.5 text-amber-400" />}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-400 border-t border-slate-800 pt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-950 border border-emerald-500" />
                    <span>Answered</span>
                  </div>
                  <span className="font-bold text-emerald-400">{questions.filter(q => selectedAnswers[q.id]).length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-amber-950 border border-amber-500" />
                    <span>Flagged</span>
                  </div>
                  <span className="font-bold text-amber-400">{questions.filter(q => flaggedQuestions[q.id]).length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-slate-950 border border-slate-800" />
                    <span>Unanswered</span>
                  </div>
                  <span className="font-bold text-slate-400">{questions.length - questions.filter(q => selectedAnswers[q.id]).length}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-center">
              <button
                onClick={() => {
                  if (isJFT) {
                    if (currentJftSectionIndex < 3) setShowJftSectionLockModal(true);
                    else handleSubmitExam();
                  } else if (currentPaperIndex === 0 && rawQuestions.length >= 40) {
                    handleFinishPaper1();
                  } else {
                    handleSubmitExam();
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-glow transition-all cursor-pointer"
              >
                {isJFT
                  ? (currentJftSectionIndex < 3 ? `Lock Section ${currentJftSectionIndex + 1} 🔒 ➔` : 'Submit Final CBT Exam 🏁')
                  : (currentPaperIndex === 0 && rawQuestions.length >= 40 ? 'Submit Paper 1 ➔' : 'Submit Final Exam 🏁')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
