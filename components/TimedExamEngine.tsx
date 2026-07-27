'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Flag,
  CheckCircle2,
  Volume2,
  Award,
  ChevronRight,
  ChevronLeft,
  Layers,
  HelpCircle,
  Check,
  X,
  Maximize2,
  Minimize2,
  ListFilter,
  Sparkles,
  BookOpen,
  Play,
  ArrowLeft,
  FileText,
  Headphones,
  RotateCcw,
  BarChart3,
  CheckSquare,
  AlertTriangle
} from 'lucide-react';
import { validateExamSubmission } from '@/lib/auth-security';

export interface ExamQuestion {
  id: string;
  level: string; // N5, N4, N3, N2 | EPS, TOPIK2, TOPIK3, TOPIK4
  mockSet?: string; // 'N5_SET_1' | 'N5_SET_2' | 'N4_SET_1' | etc.
  type: 'MULTIPLE_CHOICE' | 'LISTENING' | 'FILL_BLANK';
  prompt: string;
  audioUrl?: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface MockTestInfo {
  id: string;
  mockSet: string;
  level: string;
  language: 'JAPANESE' | 'KOREAN';
  title: string;
  japaneseTitle?: string;
  description: string;
  timeLimitMinutes: number;
  questionCount: number;
  sections: string[];
  audioCount: number;
  badgeColor: string;
  examFormat: 'JLPT_PAPER' | 'JFT_CBT';
}

const MOCK_TEST_CATALOG: MockTestInfo[] = [
  {
    id: 'jft-cbt-1',
    mockSet: 'N5_SET_1',
    level: 'JFT',
    language: 'JAPANESE',
    examFormat: 'JFT_CBT',
    title: 'JFT-Basic Official CBT Examination (SSW A2)',
    japaneseTitle: 'JFT-Basic 国際交流基金日本語基礎テスト (CBT方式)',
    description: 'Official Japan Foundation Computer-Based Test for SSW Visa (CEFR A2). 4 Section-locked parts (Script & Vocab, Conversation, Listening, Reading). 10-250 Points Scale (Pass: 200/250).',
    timeLimitMinutes: 60,
    questionCount: 44,
    sections: ['文字・語彙 (Script & Vocab)', '会話・表現 (Conversation)', '聴解 (Listening)', '読解 (Reading)'],
    audioCount: 8,
    badgeColor: 'from-cyan-600 to-blue-600',
  },
  {
    id: 'n5-mock-1',
    mockSet: 'N5_SET_1',
    level: 'N5',
    language: 'JAPANESE',
    examFormat: 'JLPT_PAPER',
    title: 'JLPT N5 Official Mock Test - Paper 1',
    japaneseTitle: 'JLPT N5 公式模擬試験 第1集 (2-Paper Booklet)',
    description: 'Full official JLPT N5 paper given in 2 booklets (Paper 1: Vocab, Grammar & Reading, 15-Min Break, Paper 2: Audio Listening).',
    timeLimitMinutes: 90,
    questionCount: 44,
    sections: ['文字・語彙 (Vocab & Kanji)', '文法・読解 (Grammar & Reading)', '聴解 (Listening Audio)'],
    audioCount: 8,
    badgeColor: 'from-rose-600 to-pink-600',
  },
  {
    id: 'n5-mock-2',
    mockSet: 'N5_SET_2',
    level: 'N5',
    language: 'JAPANESE',
    examFormat: 'JLPT_PAPER',
    title: 'JLPT N5 Official Mock Test - Paper 2',
    japaneseTitle: 'JLPT N5 公式模擬試験 第2集 (2-Paper Booklet)',
    description: 'Second official N5 paper covering particles (~てもいい, ~から), te-form verbs, reading notices, and audio dialogue tracks.',
    timeLimitMinutes: 90,
    questionCount: 44,
    sections: ['文字・語彙 (Vocab & Kanji)', '文法・読解 (Grammar & Reading)', '聴解 (Listening Audio)'],
    audioCount: 8,
    badgeColor: 'from-rose-600 to-pink-600',
  },
  {
    id: 'n5-mock-3',
    mockSet: 'N5_SET_3',
    level: 'N5',
    language: 'JAPANESE',
    examFormat: 'JLPT_PAPER',
    title: 'JLPT N5 Official Mock Test - Paper 3',
    japaneseTitle: 'JLPT N5 公式模擬試験 第3集 (2-Paper Booklet)',
    description: 'Third full N5 paper with authentic listening dialogues, sentence ordering (★), reading notices, and vocabulary.',
    timeLimitMinutes: 90,
    questionCount: 44,
    sections: ['文字・語彙 (Vocab & Kanji)', '文法・読解 (Grammar & Reading)', '聴解 (Listening Audio)'],
    audioCount: 8,
    badgeColor: 'from-rose-600 to-pink-600',
  },
  {
    id: 'n5-mock-4',
    mockSet: 'N5_SET_4',
    level: 'N5',
    language: 'JAPANESE',
    examFormat: 'JLPT_PAPER',
    title: 'JLPT N5 Official Mock Test - Paper 4',
    japaneseTitle: 'JLPT N5 公式模擬試験 第4集 (2-Paper Booklet)',
    description: 'Fourth official N5 paper covering advanced N5 expressions, store announcements, daily conversations, and listening audio.',
    timeLimitMinutes: 90,
    questionCount: 44,
    sections: ['文字・語彙 (Vocab & Kanji)', '文法・読解 (Grammar & Reading)', '聴解 (Listening Audio)'],
    audioCount: 8,
    badgeColor: 'from-rose-600 to-pink-600',
  },
  {
    id: 'n4-mock-1',
    mockSet: 'N4_SET_1',
    level: 'N4',
    language: 'JAPANESE',
    examFormat: 'JLPT_PAPER',
    title: 'JLPT N4 Standard Practice Exam - Paper 1',
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
    mockSet: 'ALL_N3',
    level: 'N3',
    language: 'JAPANESE',
    examFormat: 'JLPT_PAPER',
    title: 'JLPT N3 Intermediate Mock Test - Sample Set',
    japaneseTitle: 'JLPT N3 中級模擬試験',
    description: 'N3 level grammar nuances, honorifics, complex reading, and inference questions.',
    timeLimitMinutes: 60,
    questionCount: 5,
    sections: ['言語知識 (Language Knowledge)', '読解 (Reading)'],
    audioCount: 0,
    badgeColor: 'from-amber-600 to-orange-600',
  },
  {
    id: 'n2-mock-1',
    mockSet: 'ALL_N2',
    level: 'N2',
    language: 'JAPANESE',
    examFormat: 'JLPT_PAPER',
    title: 'JLPT N2 Advanced Mock Test - Sample Set',
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
    examFormat: 'JFT_CBT',
    title: 'EPS-TOPIK Industry & General Worker Exam',
    description: 'Standard EPS-TOPIK evaluation paper covering factory vocabulary, safety rules, and daily Korean.',
    timeLimitMinutes: 50,
    questionCount: 5,
    sections: ['어휘 (Vocabulary)', '문법 (Grammar)', '안戦 (Safety)'],
    audioCount: 0,
    badgeColor: 'from-emerald-600 to-teal-600',
  },
];



const JAPANESE_QUESTIONS: ExamQuestion[] = [
  {
    "id": "jp_n5_set1_1",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q1】わたしは まいにち 学校 へ 行きます。",
    "options": [
      "がっこう",
      "がくこう",
      "かっこう",
      "がいこう"
    ],
    "correctAnswer": "がっこう",
    "explanation": "正解は「A」の「がっこう」です。"
  },
  {
    "id": "jp_n5_set1_2",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q2】今日 は 天気が いいです。",
    "options": [
      "きょう",
      "こんじつ",
      "いまび",
      "こんび"
    ],
    "correctAnswer": "きょう",
    "explanation": "正解は「A」の「きょう」です。"
  },
  {
    "id": "jp_n5_set1_3",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q3】兄は 会社員 です。",
    "options": [
      "かいしゃいん",
      "かいしゃにん",
      "がいしゃいん",
      "かいじゃいん"
    ],
    "correctAnswer": "かいしゃいん",
    "explanation": "正解は「A」の「かいしゃいん」です。"
  },
  {
    "id": "jp_n5_set1_4",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q4】病院 は えきの ちかくに あります。",
    "options": [
      "びょういん",
      "びよういん",
      "びょうえん",
      "びよいん"
    ],
    "correctAnswer": "びょういん",
    "explanation": "正解は「A」の「びょういん」です。"
  },
  {
    "id": "jp_n5_set1_5",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q5】毎朝 、六時に おきます。",
    "options": [
      "まいあさ",
      "まいちょう",
      "めいあさ",
      "まいてん"
    ],
    "correctAnswer": "まいあさ",
    "explanation": "正解は「A」の「まいあさ」です。"
  },
  {
    "id": "jp_n5_set1_6",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q6】あしたは にちようびですから、がっこうは ___です。",
    "options": [
      "やすみ",
      "しごと",
      "しゅくだい",
      "じかん"
    ],
    "correctAnswer": "やすみ",
    "explanation": "正解は「A」の「やすみ」です。"
  },
  {
    "id": "jp_n5_set1_7",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q7】のどが かわきましたから、___を のみたいです。",
    "options": [
      "みず",
      "えんぴつ",
      "かさ",
      "しんぶん"
    ],
    "correctAnswer": "みず",
    "explanation": "正解は「A」の「みず」です。"
  },
  {
    "id": "jp_n5_set1_8",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q8】きのう えいがを 見て、とても ___でした。",
    "options": [
      "おもしろかった",
      "たかかった",
      "やすかった",
      "ひろかった"
    ],
    "correctAnswer": "おもしろかった",
    "explanation": "正解は「A」の「おもしろかった」です。"
  },
  {
    "id": "jp_n5_set1_9",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q9】まいにち にほんごを べんきょうして、すこし ___に なりました。",
    "options": [
      "じょうずに",
      "げんきに",
      "しずかに",
      "ひまに"
    ],
    "correctAnswer": "じょうずに",
    "explanation": "正解は「A」の「じょうずに」です。"
  },
  {
    "id": "jp_n5_set1_10",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q10】でんしゃが おくれましたから、かいしゃに ___しました。",
    "options": [
      "ちこく",
      "りょこう",
      "せんたく",
      "そうじ"
    ],
    "correctAnswer": "ちこく",
    "explanation": "正解は「A」の「ちこく」です。"
  },
  {
    "id": "jp_n5_set1_11",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q11】わたしは まいにち がっこう に いきます。",
    "options": [
      "学校",
      "字校",
      "学枚",
      "字枚"
    ],
    "correctAnswer": "学校",
    "explanation": "正解は「A」の「学校」です。"
  },
  {
    "id": "jp_n5_set1_12",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q12】やま に のぼりました。",
    "options": [
      "山",
      "川",
      "田",
      "出"
    ],
    "correctAnswer": "山",
    "explanation": "正解は「A」の「山」です。"
  },
  {
    "id": "jp_n5_set1_13",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q13】きょうは あめ です。",
    "options": [
      "雨",
      "雪",
      "電",
      "雲"
    ],
    "correctAnswer": "雨",
    "explanation": "正解は「A」の「雨」です。"
  },
  {
    "id": "jp_n5_set1_14",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q14】この もんだいは かんたんです。",
    "options": [
      "この もんだいは やさしいです。",
      "この もんだいは むずかしいです。",
      "この もんだいは ながいです。",
      "この もんだいは たかいです。"
    ],
    "correctAnswer": "この もんだいは やさしいです。",
    "explanation": "正解は「A」の「この もんだいは やさしいです。」です。"
  },
  {
    "id": "jp_n5_set1_15",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q15】わたしは まいばん 11時に ねます。",
    "options": [
      "わたしは よる 11時に ねます。",
      "わたしは あさ 11時に おきます。",
      "わたしは ひる 11時に たべます。",
      "わたしは まいあさ 11時に でかけます。"
    ],
    "correctAnswer": "わたしは よる 11時に ねます。",
    "explanation": "正解は「A」の「わたしは よる 11時に ねます。」です。"
  },
  {
    "id": "jp_n5_set1_16",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q1】わたし ___ がくせいです。",
    "options": [
      "は",
      "を",
      "に",
      "で"
    ],
    "correctAnswer": "は",
    "explanation": "正解は「A」の「は」です。"
  },
  {
    "id": "jp_n5_set1_17",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q2】まいあさ パン ___ たべます。",
    "options": [
      "は",
      "を",
      "が",
      "と"
    ],
    "correctAnswer": "を",
    "explanation": "正解は「B」の「を」です。"
  },
  {
    "id": "jp_n5_set1_18",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q3】がっこう ___ バスで いきます。",
    "options": [
      "は",
      "を",
      "に",
      "と"
    ],
    "correctAnswer": "に",
    "explanation": "正解は「C」の「に」です。"
  },
  {
    "id": "jp_n5_set1_19",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q4】これ ___ わたしの ほんです。",
    "options": [
      "の",
      "は",
      "を",
      "で"
    ],
    "correctAnswer": "は",
    "explanation": "正解は「B」の「は」です。"
  },
  {
    "id": "jp_n5_set1_20",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q5】きょうしつ ___ がくせいが 五人 います。",
    "options": [
      "に",
      "で",
      "を",
      "は"
    ],
    "correctAnswer": "に",
    "explanation": "正解は「A」の「に」です。"
  },
  {
    "id": "jp_n5_set1_21",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q6】わたしは まいにち にほんご ___ べんきょうします。",
    "options": [
      "を",
      "が",
      "に",
      "と"
    ],
    "correctAnswer": "を",
    "explanation": "正解は「A」の「を」です。"
  },
  {
    "id": "jp_n5_set1_22",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q7】あした 友だち ___ えいがを 見ます。",
    "options": [
      "が",
      "と",
      "を",
      "の"
    ],
    "correctAnswer": "と",
    "explanation": "正解は「B」の「と」です。"
  },
  {
    "id": "jp_n5_set1_23",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q8】この ペン ___ あの ペン ___ どちらが いいですか。",
    "options": [
      "と、と",
      "は、が",
      "の、を",
      "を、に"
    ],
    "correctAnswer": "と、と",
    "explanation": "正解は「A」の「と、と」です。"
  },
  {
    "id": "jp_n5_set1_24",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q9】「日本語 / を / 一年 / 勉強しました」",
    "options": [
      "一年 日本語を 勉強しました",
      "日本語 一年を 勉強しました",
      "を 日本語 一年 勉強しました",
      "勉強しました 一年を 日本語"
    ],
    "correctAnswer": "一年 日本語を 勉強しました",
    "explanation": "正解は「A」の「一年 日本語を 勉強しました」です。"
  },
  {
    "id": "jp_n5_set1_25",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q10】「テレビ / 見ながら / を / ごはんを 食べます」",
    "options": [
      "テレビを 見ながら ごはんを 食べます",
      "ごはんを 見ながら テレビを 食べます",
      "テレビ ごはんを 見ながら を 食べます",
      "見ながら テレビを ごはんを 食べます"
    ],
    "correctAnswer": "テレビを 見ながら ごはんを 食べます",
    "explanation": "正解は「A」の「テレビを 見ながら ごはんを 食べます」です。"
  },
  {
    "id": "jp_n5_set1_26",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q11】「駅 / の / 前に / 銀行 / が あります」",
    "options": [
      "駅の 前に 銀行が あります",
      "銀行の 前に 駅が あります",
      "前に 駅の 銀行が あります",
      "駅が 前に 銀行の あります"
    ],
    "correctAnswer": "駅の 前に 銀行が あります",
    "explanation": "正解は「A」の「駅の 前に 銀行が あります」です。"
  },
  {
    "id": "jp_n5_set1_27",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q12】「窓 / を / 開けても / いいですか」",
    "options": [
      "窓を 開けても いいですか",
      "窓 開けても を いいですか",
      "開けても 窓を いいですか",
      "いいですか 窓を 開けても"
    ],
    "correctAnswer": "窓を 開けても いいですか",
    "explanation": "正解は「A」の「窓を 開けても いいですか」です。"
  },
  {
    "id": "jp_n5_set1_28",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q13】（13）に 入るのは どれですか。",
    "options": [
      "おきます",
      "ねます",
      "かえります",
      "はいります"
    ],
    "correctAnswer": "おきます",
    "explanation": "正解は「A」の「おきます」です。"
  },
  {
    "id": "jp_n5_set1_29",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q14】（14）に 入るのは どれですか。",
    "options": [
      "たべます",
      "のみます",
      "つくります",
      "かいます"
    ],
    "correctAnswer": "たべます",
    "explanation": "正解は「A」の「たべます」です。"
  },
  {
    "id": "jp_n5_set1_30",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q15】（15）に 入るのは どれですか。",
    "options": [
      "へ",
      "を",
      "の",
      "が"
    ],
    "correctAnswer": "へ",
    "explanation": "正解は「A」の「へ」です。"
  },
  {
    "id": "jp_n5_set1_31",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q1】Reading (どっかい)\nわたしの 家族は 四人です。父と 母と 妹と わたしです。父は 会社員で、母は 先生です。妹は まだ 学校に 行っていません。毎週 日曜日に、家族で 公園へ 行きます。\n\n質問: 「わたし」の 家族は 何人ですか。",
    "options": [
      "三人",
      "四人",
      "五人",
      "二人"
    ],
    "correctAnswer": "四人",
    "explanation": "正解は「B」の「四人」です。"
  },
  {
    "id": "jp_n5_set1_32",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q2】Reading (どっかい)\nわたしの 家族は 四人です。父と 母と 妹と わたしです。父は 会社員で、母は 先生です。妹は まだ 学校に 行っていません。毎週 日曜日に、家族で 公園へ 行きます。\n\n質問: お母さんの しごとは 何ですか。",
    "options": [
      "会社員",
      "先生",
      "医者",
      "学生"
    ],
    "correctAnswer": "先生",
    "explanation": "正解は「B」の「先生」です。"
  },
  {
    "id": "jp_n5_set1_33",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q3】Reading (どっかい)\nわたしの 家族は 四人です。父と 母と 妹と わたしです。父は 会社員で、母は 先生です。妹は まだ 学校に 行っていません。毎週 日曜日に、家族で 公園へ 行きます。\nきのう、友だちと デパートへ 行きました。わたしは くつを 買いました。友だちは 何も 買いませんでした。デパートの 中の レストランで ひるごはんを 食べてから、うちへ 帰りました。\n\n質問: 「わたし」は デパートで 何を しましたか。",
    "options": [
      "くつを 買った",
      "本を 買った",
      "えいがを 見た",
      "何も しなかった"
    ],
    "correctAnswer": "くつを 買った",
    "explanation": "正解は「A」の「くつを 買った」です。"
  },
  {
    "id": "jp_n5_set1_34",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q4】Reading (どっかい)\nわたしの 家族は 四人です。父と 母と 妹と わたしです。父は 会社員で、母は 先生です。妹は まだ 学校に 行っていません。毎週 日曜日に、家族で 公園へ 行きます。\nきのう、友だちと デパートへ 行きました。わたしは くつを 買いました。友だちは 何も 買いませんでした。デパートの 中の レストランで ひるごはんを 食べてから、うちへ 帰りました。\n\n質問: 友だちは デパートで 何を 買いましたか。",
    "options": [
      "くつ",
      "ふく",
      "何も 買わなかった",
      "本"
    ],
    "correctAnswer": "何も 買わなかった",
    "explanation": "正解は「C」の「何も 買わなかった」です。"
  },
  {
    "id": "jp_n5_set1_35",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q5】Reading (どっかい)\nわたしの 家族は 四人です。父と 母と 妹と わたしです。父は 会社員で、母は 先生です。妹は まだ 学校に 行っていません。毎週 日曜日に、家族で 公園へ 行きます。\nきのう、友だちと デパートへ 行きました。わたしは くつを 買いました。友だちは 何も 買いませんでした。デパートの 中の レストランで ひるごはんを 食べてから、うちへ 帰りました。\nとしょかんの おしらせ\n・としょかんは 月曜日から 土曜日まで あいています。\n・日曜日は やすみです。\n・じかんは 朝 9時から 夜 7時までです。\n・本は 2週間 かりることが できます。\n\n質問: 日曜日に としょかんへ 行っても いいですか。",
    "options": [
      "はい、行っても いいです。",
      "いいえ、その日は やすみです。",
      "朝だけ あいています。",
      "夜だけ あいています。"
    ],
    "correctAnswer": "いいえ、その日は やすみです。",
    "explanation": "正解は「B」の「いいえ、その日は やすみです。」です。"
  },
  {
    "id": "jp_n5_set1_36",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q6】Reading (どっかい)\nわたしの 家族は 四人です。父と 母と 妹と わたしです。父は 会社員で、母は 先生です。妹は まだ 学校に 行っていません。毎週 日曜日に、家族で 公園へ 行きます。\nきのう、友だちと デパートへ 行きました。わたしは くつを 買いました。友だちは 何も 買いませんでした。デパートの 中の レストランで ひるごはんを 食べてから、うちへ 帰りました。\nとしょかんの おしらせ\n・としょかんは 月曜日から 土曜日まで あいています。\n・日曜日は やすみです。\n・じかんは 朝 9時から 夜 7時までです。\n・本は 2週間 かりることが できます。\n\n質問: 本は どのくらい かりることが できますか。",
    "options": [
      "1週間",
      "2週間",
      "1か月",
      "3日間"
    ],
    "correctAnswer": "2週間",
    "explanation": "正解は「B」の「2週間」です。"
  },
  {
    "id": "jp_n5_set1_37",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "LISTENING",
    "prompt": "【聴解 Q1】男の人：すみません、駅は どこですか。\n女の人：まっすぐ 行って、二つ目の かどを 右に まがってください。\n\n質問: 駅は どこに ありますか。",
    "options": [
      "まっすぐ 行って 右",
      "まっすぐ 行って 左",
      "すぐ 左",
      "すぐ 右"
    ],
    "correctAnswer": "まっすぐ 行って 右",
    "explanation": "正解は「A」の「まっすぐ 行って 右」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_003.mp3"
  },
  {
    "id": "jp_n5_set1_38",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "LISTENING",
    "prompt": "【聴解 Q2】女の人：明日 なんじに 会いましょうか。\n男の人：じゅう時は どうですか。\n女の人：ちょっと 早いですから、じゅういち時に しましょう。\n\n質問: 二人は 明日 なんじに 会いますか。",
    "options": [
      "9時",
      "10時",
      "11時",
      "12時"
    ],
    "correctAnswer": "11時",
    "explanation": "正解は「C」の「11時」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_006.mp3"
  },
  {
    "id": "jp_n5_set1_39",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "LISTENING",
    "prompt": "【聴解 Q3】店員：いらっしゃいませ。\n客：この りんごを 5つと、みかんを 3つ ください。\n\n質問: 客は 何を 買いますか。",
    "options": [
      "りんご5つ、みかん3つ",
      "りんご3つ、みかん5つ",
      "りんご5つだけ",
      "みかん3つだけ"
    ],
    "correctAnswer": "りんご5つ、みかん3つ",
    "explanation": "正解は「A」の「りんご5つ、みかん3つ」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_009.mp3"
  },
  {
    "id": "jp_n5_set1_40",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "LISTENING",
    "prompt": "【聴解 Q4】男の人：しゅくだいは もう おわりましたか。\n女の人：いいえ、まだです。今晩 やります。\n\n質問: 女の人は しゅくだいを もう しましたか。",
    "options": [
      "もう しました",
      "まだ していません",
      "きのう しました",
      "あした します"
    ],
    "correctAnswer": "まだ していません",
    "explanation": "正解は「B」の「まだ していません」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_012.mp3"
  },
  {
    "id": "jp_n5_set1_41",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "LISTENING",
    "prompt": "【聴解 Q5】天気よほう：あしたは 朝は くもりですが、午後から 雨が ふるでしょう。\n\n質問: あしたの 午後の 天気は どうですか。",
    "options": [
      "はれ",
      "くもり",
      "雨",
      "ゆき"
    ],
    "correctAnswer": "雨",
    "explanation": "正解は「C」の「雨」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_015.mp3"
  },
  {
    "id": "jp_n5_set1_42",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "LISTENING",
    "prompt": "【聴解 Q6】女の人：この しゅくだい、いつまでに 出せば いいですか。\n先生：金曜日までに 出してください。\n\n質問: しゅくだいは いつまでに 出しますか。",
    "options": [
      "月曜日",
      "水曜日",
      "金曜日",
      "日曜日"
    ],
    "correctAnswer": "金曜日",
    "explanation": "正解は「C」の「金曜日」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_018.mp3"
  },
  {
    "id": "jp_n5_set1_43",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "LISTENING",
    "prompt": "【聴解 Q7】男の人：コーヒーを 一つと ケーキを 二つ お願いします。\n店員：かしこまりました。\n\n質問: 男の人は 何を たのみましたか。",
    "options": [
      "コーヒー1、ケーキ2",
      "コーヒー2、ケーキ1",
      "コーヒー1、ケーキ1",
      "コーヒー2、ケーキ2"
    ],
    "correctAnswer": "コーヒー1、ケーキ2",
    "explanation": "正解は「A」の「コーヒー1、ケーキ2」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_021.mp3"
  },
  {
    "id": "jp_n5_set1_44",
    "level": "N5",
    "mockSet": "N5_SET_1",
    "type": "LISTENING",
    "prompt": "【聴解 Q8】女の人：この かばん、いくらですか。\n店員：3,500円です。\n女の人：じゃあ、それを ください。\n\n質問: かばんは いくらですか。",
    "options": [
      "3,000円",
      "3,500円",
      "5,300円",
      "3,050円"
    ],
    "correctAnswer": "3,500円",
    "explanation": "正解は「B」の「3,500円」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_024.mp3"
  },
  {
    "id": "jp_n5_set2_1",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q1】弟 は 今年 学生に なりました。",
    "options": [
      "おとうと",
      "いもうと",
      "あに",
      "あね"
    ],
    "correctAnswer": "おとうと",
    "explanation": "正解は「A」の「おとうと」です。"
  },
  {
    "id": "jp_n5_set2_2",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q2】来週 、旅行に 行きます。",
    "options": [
      "らいしゅう",
      "こんしゅう",
      "せんしゅう",
      "まいしゅう"
    ],
    "correctAnswer": "らいしゅう",
    "explanation": "正解は「A」の「らいしゅう」です。"
  },
  {
    "id": "jp_n5_set2_3",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q3】教室 に 学生が たくさん います。",
    "options": [
      "きょうしつ",
      "きょうしゅつ",
      "がくしつ",
      "きょうしち"
    ],
    "correctAnswer": "きょうしつ",
    "explanation": "正解は「A」の「きょうしつ」です。"
  },
  {
    "id": "jp_n5_set2_4",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q4】財布 を 忘れました。",
    "options": [
      "さいふ",
      "ざいふ",
      "さいぶ",
      "ざいぶ"
    ],
    "correctAnswer": "さいふ",
    "explanation": "正解は「A」の「さいふ」です。"
  },
  {
    "id": "jp_n5_set2_5",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q5】夕方 、雨が 降りました。",
    "options": [
      "ゆうがた",
      "ゆうほう",
      "せきがた",
      "ゆがた"
    ],
    "correctAnswer": "ゆうがた",
    "explanation": "正解は「A」の「ゆうがた」です。"
  },
  {
    "id": "jp_n5_set2_6",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q6】からだの ちょうしが わるいですから、___へ 行きます。",
    "options": [
      "びょういん",
      "としょかん",
      "ぎんこう",
      "ゆうびんきょく"
    ],
    "correctAnswer": "びょういん",
    "explanation": "正解は「A」の「びょういん」です。"
  },
  {
    "id": "jp_n5_set2_7",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q7】この にくは ___から、よく やいて ください。",
    "options": [
      "なま",
      "からい",
      "あまい",
      "すっぱい"
    ],
    "correctAnswer": "なま",
    "explanation": "正解は「A」の「なま」です。"
  },
  {
    "id": "jp_n5_set2_8",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q8】でんきを けして ねましたが、へやが まだ ___です。",
    "options": [
      "あかるい",
      "くらい",
      "しずか",
      "にぎやか"
    ],
    "correctAnswer": "くらい",
    "explanation": "正解は「B」の「くらい」です。"
  },
  {
    "id": "jp_n5_set2_9",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q9】しあいに まけて、みんな とても ___そうでした。",
    "options": [
      "うれし",
      "かなし",
      "たのし",
      "いそがし"
    ],
    "correctAnswer": "かなし",
    "explanation": "正解は「B」の「かなし」です。"
  },
  {
    "id": "jp_n5_set2_10",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q10】あのレストランは やすくて ___ですから、いつも こんでいます。",
    "options": [
      "おいしい",
      "まずい",
      "きたない",
      "せまい"
    ],
    "correctAnswer": "おいしい",
    "explanation": "正解は「A」の「おいしい」です。"
  },
  {
    "id": "jp_n5_set2_11",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q11】あさ、 かお を あらいます。",
    "options": [
      "顔",
      "頭",
      "手",
      "足"
    ],
    "correctAnswer": "顔",
    "explanation": "正解は「A」の「顔」です。"
  },
  {
    "id": "jp_n5_set2_12",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q12】きょうは はれ です。",
    "options": [
      "晴",
      "雨",
      "雪",
      "曇"
    ],
    "correctAnswer": "晴",
    "explanation": "正解は「A」の「晴」です。"
  },
  {
    "id": "jp_n5_set2_13",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q13】でんしゃの中で ほん を よみます。",
    "options": [
      "本",
      "木",
      "木本",
      "大"
    ],
    "correctAnswer": "本",
    "explanation": "正解は「A」の「本」です。"
  },
  {
    "id": "jp_n5_set2_14",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q14】この へやは とても しずかです。",
    "options": [
      "この へやは あまり うるさくないです。",
      "この へやは とても にぎやかです。",
      "この へやは あまり ひろくないです。",
      "この へやは とても あかるいです。"
    ],
    "correctAnswer": "この へやは あまり うるさくないです。",
    "explanation": "正解は「A」の「この へやは あまり うるさくないです。」です。"
  },
  {
    "id": "jp_n5_set2_15",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q15】わたしは まいにち 8時間 はたらきます。",
    "options": [
      "わたしは まいにち 8時間 しごとを します。",
      "わたしは まいにち 8時間 ねます。",
      "わたしは まいにち 8時間 やすみます。",
      "わたしは まいにち 8時間 べんきょうします。"
    ],
    "correctAnswer": "わたしは まいにち 8時間 しごとを します。",
    "explanation": "正解は「A」の「わたしは まいにち 8時間 しごとを します。」です。"
  },
  {
    "id": "jp_n5_set2_16",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q1】明日 雨 ___ ふったら、うちに います。",
    "options": [
      "が",
      "を",
      "は",
      "の"
    ],
    "correctAnswer": "が",
    "explanation": "正解は「A」の「が」です。"
  },
  {
    "id": "jp_n5_set2_17",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q2】この しごとは あした ___ おわらせなければ なりません。",
    "options": [
      "までに",
      "まで",
      "から",
      "より"
    ],
    "correctAnswer": "までに",
    "explanation": "正解は「A」の「までに」です。"
  },
  {
    "id": "jp_n5_set2_18",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q3】かぜを ひいた ___ 、がっこうへ 行きました。",
    "options": [
      "ので",
      "から",
      "のに",
      "と"
    ],
    "correctAnswer": "のに",
    "explanation": "正解は「C」の「のに」です。"
  },
  {
    "id": "jp_n5_set2_19",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q4】この 漢字の 読み方 ___ わかりません。",
    "options": [
      "が",
      "を",
      "に",
      "で"
    ],
    "correctAnswer": "が",
    "explanation": "正解は「A」の「が」です。"
  },
  {
    "id": "jp_n5_set2_20",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q5】たなかさんは ギターを ひく ___ できます。",
    "options": [
      "こと が",
      "もの が",
      "の を",
      "ところ が"
    ],
    "correctAnswer": "こと が",
    "explanation": "正解は「A」の「こと が」です。"
  },
  {
    "id": "jp_n5_set2_21",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q6】でかける ___ に、まどを しめて ください。",
    "options": [
      "前",
      "後",
      "中",
      "間"
    ],
    "correctAnswer": "前",
    "explanation": "正解は「A」の「前」です。"
  },
  {
    "id": "jp_n5_set2_22",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q7】この コンピューターは あの コンピューター ___ 高いです。",
    "options": [
      "より",
      "ほど",
      "から",
      "まで"
    ],
    "correctAnswer": "より",
    "explanation": "正解は「A」の「より」です。"
  },
  {
    "id": "jp_n5_set2_23",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q8】どうぞ、はいって ___。",
    "options": [
      "ください",
      "あげます",
      "もらいます",
      "やります"
    ],
    "correctAnswer": "ください",
    "explanation": "正解は「A」の「ください」です。"
  },
  {
    "id": "jp_n5_set2_24",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q9】「宿題 / を / 終わってから / テレビを 見ます」",
    "options": [
      "宿題を 終わってから テレビを 見ます",
      "テレビを 終わってから 宿題を 見ます",
      "終わってから 宿題を テレビを 見ます",
      "宿題 テレビを 終わってから を 見ます"
    ],
    "correctAnswer": "宿題を 終わってから テレビを 見ます",
    "explanation": "正解は「A」の「宿題を 終わってから テレビを 見ます」です。"
  },
  {
    "id": "jp_n5_set2_25",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q10】「駅 / まで / 歩いて / 十五分 かかります」",
    "options": [
      "駅まで 歩いて 十五分 かかります",
      "十五分まで 駅を 歩いて かかります",
      "歩いて 十五分 駅まで かかります",
      "十五分 歩いて 駅まで かかります"
    ],
    "correctAnswer": "駅まで 歩いて 十五分 かかります",
    "explanation": "正解は「A」の「駅まで 歩いて 十五分 かかります」です。"
  },
  {
    "id": "jp_n5_set2_26",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q11】「友達 / に / 誕生日の プレゼントを / もらいました」",
    "options": [
      "友達に 誕生日の プレゼントを もらいました",
      "誕生日の プレゼントに 友達を もらいました",
      "もらいました 友達に 誕生日の プレゼントを",
      "友達を 誕生日の プレゼントに もらいました"
    ],
    "correctAnswer": "友達に 誕生日の プレゼントを もらいました",
    "explanation": "正解は「A」の「友達に 誕生日の プレゼントを もらいました」です。"
  },
  {
    "id": "jp_n5_set2_27",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q12】「エアコン / を / つけたまま / 出かけました」",
    "options": [
      "エアコンを つけたまま 出かけました",
      "エアコン 出かけました つけたまま を",
      "つけたまま エアコンを 出かけました",
      "出かけました エアコンを つけたまま"
    ],
    "correctAnswer": "エアコンを つけたまま 出かけました",
    "explanation": "正解は「A」の「エアコンを つけたまま 出かけました」です。"
  },
  {
    "id": "jp_n5_set2_28",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q13】（13）に 入るのは どれですか。",
    "options": [
      "のぼりました",
      "およぎました",
      "はしりました",
      "とびました"
    ],
    "correctAnswer": "のぼりました",
    "explanation": "正解は「A」の「のぼりました」です。"
  },
  {
    "id": "jp_n5_set2_29",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q14】（14）に 入るのは どれですか。",
    "options": [
      "見ました",
      "見えました",
      "見せました",
      "見られました"
    ],
    "correctAnswer": "見えました",
    "explanation": "正解は「B」の「見えました」です。"
  },
  {
    "id": "jp_n5_set2_30",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q15】（15）に 入るのは どれですか。",
    "options": [
      "たべました",
      "のみました",
      "つくりました",
      "かいました"
    ],
    "correctAnswer": "たべました",
    "explanation": "正解は「A」の「たべました」です。"
  },
  {
    "id": "jp_n5_set2_31",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q1】Reading (どっかい)\nわたしは 毎朝 6時に 起きて、ジョギングを します。それから シャワーを あびて、朝ごはんを 食べます。会社は 9時からですが、いつも 8時半に 着きます。仕事が おわるのは 6時ごろです。\n\n質問: 「わたし」の 朝の 正しい 順番は どれですか。",
    "options": [
      "おきる→ジョギング→シャワー→朝ごはん",
      "おきる→シャワー→ジョギング→朝ごはん",
      "ジョギング→おきる→朝ごはん→シャワー",
      "おきる→朝ごはん→ジョギング→シャワー"
    ],
    "correctAnswer": "おきる→ジョギング→シャワー→朝ごはん",
    "explanation": "正解は「A」の「おきる→ジョギング→シャワー→朝ごはん」です。"
  },
  {
    "id": "jp_n5_set2_32",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q2】Reading (どっかい)\nわたしは 毎朝 6時に 起きて、ジョギングを します。それから シャワーを あびて、朝ごはんを 食べます。会社は 9時からですが、いつも 8時半に 着きます。仕事が おわるのは 6時ごろです。\n\n質問: 会社は 何時に はじまりますか。",
    "options": [
      "8時",
      "8時半",
      "9時",
      "6時"
    ],
    "correctAnswer": "9時",
    "explanation": "正解は「C」の「9時」です。"
  },
  {
    "id": "jp_n5_set2_33",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q3】Reading (どっかい)\nわたしは 毎朝 6時に 起きて、ジョギングを します。それから シャワーを あびて、朝ごはんを 食べます。会社は 9時からですが、いつも 8時半に 着きます。仕事が おわるのは 6時ごろです。\n田中さんは 来月 大阪に 引っ越します。仕事の ために、家族で 引っ越すことに なりました。子どもたちは 新しい 学校に かようことに なり、少し 心配していますが、たのしみにも しています。\n\n質問: 田中さんは なぜ 引っ越しますか。",
    "options": [
      "学校の ため",
      "仕事の ため",
      "家族の ため",
      "旅行の ため"
    ],
    "correctAnswer": "仕事の ため",
    "explanation": "正解は「B」の「仕事の ため」です。"
  },
  {
    "id": "jp_n5_set2_34",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q4】Reading (どっかい)\nわたしは 毎朝 6時に 起きて、ジョギングを します。それから シャワーを あびて、朝ごはんを 食べます。会社は 9時からですが、いつも 8時半に 着きます。仕事が おわるのは 6時ごろです。\n田中さんは 来月 大阪に 引っ越します。仕事の ために、家族で 引っ越すことに なりました。子どもたちは 新しい 学校に かようことに なり、少し 心配していますが、たのしみにも しています。\n\n質問: 子どもたちは どんな 気持ちですか。",
    "options": [
      "うれしいだけ",
      "かなしいだけ",
      "心配と 楽しみと 両方",
      "何も 感じていない"
    ],
    "correctAnswer": "心配と 楽しみと 両方",
    "explanation": "正解は「C」の「心配と 楽しみと 両方」です。"
  },
  {
    "id": "jp_n5_set2_35",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q5】Reading (どっかい)\nわたしは 毎朝 6時に 起きて、ジョギングを します。それから シャワーを あびて、朝ごはんを 食べます。会社は 9時からですが、いつも 8時半に 着きます。仕事が おわるのは 6時ごろです。\n田中さんは 来月 大阪に 引っ越します。仕事の ために、家族で 引っ越すことに なりました。子どもたちは 新しい 学校に かようことに なり、少し 心配していますが、たのしみにも しています。\nプールの りよう時間の おしらせ\n・りよう時間：午前10時〜午後8時\n・休みの日：毎週 水曜日\n・6歳未満の お子さんは 大人と いっしょに 入って ください。\n・タオルは 持って きて ください。\n\n質問: 水曜日に プールへ 行っても いいですか。",
    "options": [
      "はい、いつでも 入れます。",
      "いいえ、水曜日は 休みです。",
      "午前中だけ あいています。",
      "大人だけ 入れます。"
    ],
    "correctAnswer": "いいえ、水曜日は 休みです。",
    "explanation": "正解は「B」の「いいえ、水曜日は 休みです。」です。"
  },
  {
    "id": "jp_n5_set2_36",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q6】Reading (どっかい)\nわたしは 毎朝 6時に 起きて、ジョギングを します。それから シャワーを あびて、朝ごはんを 食べます。会社は 9時からですが、いつも 8時半に 着きます。仕事が おわるのは 6時ごろです。\n田中さんは 来月 大阪に 引っ越します。仕事の ために、家族で 引っ越すことに なりました。子どもたちは 新しい 学校に かようことに なり、少し 心配していますが、たのしみにも しています。\nプールの りよう時間の おしらせ\n・りよう時間：午前10時〜午後8時\n・休みの日：毎週 水曜日\n・6歳未満の お子さんは 大人と いっしょに 入って ください。\n・タオルは 持って きて ください。\n\n質問: 5歳の 子どもは どうやって プールに 入りますか。",
    "options": [
      "一人で 入る",
      "大人と いっしょに 入る",
      "入れない",
      "先生と 入る"
    ],
    "correctAnswer": "大人と いっしょに 入る",
    "explanation": "正解は「B」の「大人と いっしょに 入る」です。"
  },
  {
    "id": "jp_n5_set2_37",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "LISTENING",
    "prompt": "【聴解 Q1】女の人：すみません、この ちかくに ゆうびんきょくは ありますか。\n男の人：はい、この 道を まっすぐ 行くと、右がわに あります。\n\n質問: ゆうびんきょくは どこに ありますか。",
    "options": [
      "まっすぐ行って 右",
      "まっすぐ行って 左",
      "すぐ 後ろ",
      "この 道の 反対側"
    ],
    "correctAnswer": "まっすぐ行って 右",
    "explanation": "正解は「A」の「まっすぐ行って 右」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_027.mp3"
  },
  {
    "id": "jp_n5_set2_38",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "LISTENING",
    "prompt": "【聴解 Q2】男の人：来週の パーティーは 何時からですか。\n女の人：6時からですが、5時半に 集まりましょう。\n\n質問: 二人は 何時に 集まりますか。",
    "options": [
      "5時",
      "5時半",
      "6時",
      "6時半"
    ],
    "correctAnswer": "5時半",
    "explanation": "正解は「B」の「5時半」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_030.mp3"
  },
  {
    "id": "jp_n5_set2_39",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "LISTENING",
    "prompt": "【聴解 Q3】店員：ご注文は。\n客：コーヒーを 二つと、サンドイッチを 一つ お願いします。\n\n質問: 客は 何を 注文しましたか。",
    "options": [
      "コーヒー2、サンドイッチ1",
      "コーヒー1、サンドイッチ2",
      "コーヒー2、サンドイッチ2",
      "コーヒー1、サンドイッチ1"
    ],
    "correctAnswer": "コーヒー2、サンドイッチ1",
    "explanation": "正解は「A」の「コーヒー2、サンドイッチ1」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_033.mp3"
  },
  {
    "id": "jp_n5_set2_40",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "LISTENING",
    "prompt": "【聴解 Q4】女の人：レポートは もう 書きましたか。\n男の人：半分ぐらい 書きました。今晩 終わらせます。\n\n質問: 男の人の レポートは どのくらい できていますか。",
    "options": [
      "全部 できた",
      "半分ぐらい できた",
      "まだ 何も していない",
      "もう 出した"
    ],
    "correctAnswer": "半分ぐらい できた",
    "explanation": "正解は「B」の「半分ぐらい できた」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_036.mp3"
  },
  {
    "id": "jp_n5_set2_41",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "LISTENING",
    "prompt": "【聴解 Q5】天気よほう：今日は 一日中 晴れですが、夜から 風が 強くなるでしょう。\n\n質問: 今日の 夜は どうなりますか。",
    "options": [
      "雨が ふる",
      "風が 強くなる",
      "雪が ふる",
      "晴れが つづく"
    ],
    "correctAnswer": "風が 強くなる",
    "explanation": "正解は「B」の「風が 強くなる」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_039.mp3"
  },
  {
    "id": "jp_n5_set2_42",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "LISTENING",
    "prompt": "【聴解 Q6】先生：レポートは いつまでに 出しますか。\n\n質問: レポートは いつまでに 出しますか。",
    "options": [
      "今週の 金曜日",
      "来週の 月曜日",
      "来週の 金曜日",
      "今週の 月曜日"
    ],
    "correctAnswer": "来週の 月曜日",
    "explanation": "正解は「B」の「来週の 月曜日」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_042.mp3"
  },
  {
    "id": "jp_n5_set2_43",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "LISTENING",
    "prompt": "【聴解 Q7】男の人：この 靴、いくらですか。\n店員：もともと 5,000円ですが、今は 半額です。\n\n質問: 靴は 今 いくらですか。",
    "options": [
      "5,000円",
      "2,500円",
      "1,000円",
      "4,500円"
    ],
    "correctAnswer": "2,500円",
    "explanation": "正解は「B」の「2,500円」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_045.mp3"
  },
  {
    "id": "jp_n5_set2_44",
    "level": "N5",
    "mockSet": "N5_SET_2",
    "type": "LISTENING",
    "prompt": "【聴解 Q8】女の人：明日、映画を 見に 行きませんか。\n男の人：いいですね。何時に 会いましょうか。\n女の人：映画は 2時からですから、1時半に 駅で 会いましょう。\n\n質問: 二人は 何時に、どこで 会いますか。",
    "options": [
      "1時半、駅",
      "2時、駅",
      "1時半、映画館",
      "2時、映画館"
    ],
    "correctAnswer": "1時半、駅",
    "explanation": "正解は「A」の「1時半、駅」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_048.mp3"
  },
  {
    "id": "jp_n5_set3_1",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q1】妹は 来年 大学生に なります。",
    "options": [
      "いもうと",
      "おとうと",
      "あね",
      "あに"
    ],
    "correctAnswer": "いもうと",
    "explanation": "正解は「A」の「いもうと」です。"
  },
  {
    "id": "jp_n5_set3_2",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q2】昨日 は とても さむかったです。",
    "options": [
      "きのう",
      "さくび",
      "せんじつ",
      "きょう"
    ],
    "correctAnswer": "きのう",
    "explanation": "正解は「A」の「きのう」です。"
  },
  {
    "id": "jp_n5_set3_3",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q3】図書館 で 本を かりました。",
    "options": [
      "としょかん",
      "どしょかん",
      "としょうかん",
      "とうしょかん"
    ],
    "correctAnswer": "としょかん",
    "explanation": "正解は「A」の「としょかん」です。"
  },
  {
    "id": "jp_n5_set3_4",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q4】台所 で 料理を しています。",
    "options": [
      "だいどころ",
      "だいところ",
      "たいどころ",
      "だいとこ"
    ],
    "correctAnswer": "だいどころ",
    "explanation": "正解は「A」の「だいどころ」です。"
  },
  {
    "id": "jp_n5_set3_5",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q5】今晩 は うちで ごはんを 食べます。",
    "options": [
      "こんばん",
      "こんや",
      "いまばん",
      "けさ"
    ],
    "correctAnswer": "こんばん",
    "explanation": "正解は「A」の「こんばん」です。"
  },
  {
    "id": "jp_n5_set3_6",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q6】あついですから、まどを ___ください。",
    "options": [
      "あけて",
      "しめて",
      "けして",
      "つけて"
    ],
    "correctAnswer": "あけて",
    "explanation": "正解は「A」の「あけて」です。"
  },
  {
    "id": "jp_n5_set3_7",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q7】この しごとは とても ___ですから、てつだって ください。",
    "options": [
      "いそがしい",
      "ひまな",
      "やさしい",
      "かんたんな"
    ],
    "correctAnswer": "いそがしい",
    "explanation": "正解は「A」の「いそがしい」です。"
  },
  {
    "id": "jp_n5_set3_8",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q8】でんしゃの なかで さいふを ___しまいました。",
    "options": [
      "なくして",
      "みつけて",
      "かって",
      "うって"
    ],
    "correctAnswer": "なくして",
    "explanation": "正解は「A」の「なくして」です。"
  },
  {
    "id": "jp_n5_set3_9",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q9】あめが ふっていますから、かさを ___ください。",
    "options": [
      "もって行って",
      "おいて行って",
      "わすれて",
      "すてて"
    ],
    "correctAnswer": "もって行って",
    "explanation": "正解は「A」の「もって行って」です。"
  },
  {
    "id": "jp_n5_set3_10",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q10】びょうきの とき、___へ 行きます。",
    "options": [
      "びょういん",
      "がっこう",
      "ぎんこう",
      "こうえん"
    ],
    "correctAnswer": "びょういん",
    "explanation": "正解は「A」の「びょういん」です。"
  },
  {
    "id": "jp_n5_set3_11",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q11】きょうは でんき を つかいません。",
    "options": [
      "電気",
      "電木",
      "電池",
      "雨気"
    ],
    "correctAnswer": "電気",
    "explanation": "正解は「A」の「電気」です。"
  },
  {
    "id": "jp_n5_set3_12",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q12】あには くるま を うんてんします。",
    "options": [
      "車",
      "軍",
      "東",
      "連"
    ],
    "correctAnswer": "車",
    "explanation": "正解は「A」の「車」です。"
  },
  {
    "id": "jp_n5_set3_13",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q13】まいばん ほし を 見ます。",
    "options": [
      "星",
      "晴",
      "雲",
      "日"
    ],
    "correctAnswer": "星",
    "explanation": "正解は「A」の「星」です。"
  },
  {
    "id": "jp_n5_set3_14",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q14】この みちは とても せまいです。",
    "options": [
      "この みちは ひろくないです。",
      "この みちは ひろいです。",
      "この みちは ながいです。",
      "この みちは あかるいです。"
    ],
    "correctAnswer": "この みちは ひろくないです。",
    "explanation": "正解は「A」の「この みちは ひろくないです。」です。"
  },
  {
    "id": "jp_n5_set3_15",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q15】わたしは まいにち くるまで かいしゃへ 行きます。",
    "options": [
      "わたしは まいにち くるまを うんてんして かいしゃへ 行きます。",
      "わたしは まいにち あるいて かいしゃへ 行きます。",
      "わたしは まいにち でんしゃで かいしゃへ 行きます。",
      "わたしは まいにち じてんしゃで かいしゃへ 行きます。"
    ],
    "correctAnswer": "わたしは まいにち くるまを うんてんして かいしゃへ 行きます。",
    "explanation": "正解は「A」の「わたしは まいにち くるまを うんてんして かいしゃへ 行きます。」です。"
  },
  {
    "id": "jp_n5_set3_16",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q1】わたしは いぬ ___ ねこと どちらが すきですか。",
    "options": [
      "と",
      "を",
      "が",
      "に"
    ],
    "correctAnswer": "と",
    "explanation": "正解は「A」の「と」です。"
  },
  {
    "id": "jp_n5_set3_17",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q2】まど ___ あいていますから、さむいです。",
    "options": [
      "が",
      "を",
      "に",
      "へ"
    ],
    "correctAnswer": "が",
    "explanation": "正解は「A」の「が」です。"
  },
  {
    "id": "jp_n5_set3_18",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q3】この りょうりは からい ___ 、おいしいです。",
    "options": [
      "ですが",
      "でも",
      "し",
      "と"
    ],
    "correctAnswer": "ですが",
    "explanation": "正解は「A」の「ですが」です。"
  },
  {
    "id": "jp_n5_set3_19",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q4】こどもの とき、よく ここ ___ あそびました。",
    "options": [
      "で",
      "に",
      "を",
      "へ"
    ],
    "correctAnswer": "で",
    "explanation": "正解は「A」の「で」です。"
  },
  {
    "id": "jp_n5_set3_20",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q5】かいぎは 3時 ___ はじまります。",
    "options": [
      "から",
      "まで",
      "より",
      "ので"
    ],
    "correctAnswer": "から",
    "explanation": "正解は「A」の「から」です。"
  },
  {
    "id": "jp_n5_set3_21",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q6】せんせいに しつもん ___ しました。",
    "options": [
      "を",
      "が",
      "に",
      "で"
    ],
    "correctAnswer": "を",
    "explanation": "正解は「A」の「を」です。"
  },
  {
    "id": "jp_n5_set3_22",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q7】この かびんは そぼ ___ もらいました。",
    "options": [
      "に",
      "で",
      "を",
      "が"
    ],
    "correctAnswer": "に",
    "explanation": "正解は「A」の「に」です。"
  },
  {
    "id": "jp_n5_set3_23",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q8】あめ ___ ふっても、しあいは あります。",
    "options": [
      "が",
      "を",
      "に",
      "で"
    ],
    "correctAnswer": "が",
    "explanation": "正解は「A」の「が」です。"
  },
  {
    "id": "jp_n5_set3_24",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q9】「本 / を / 読みながら / お茶を 飲みます」",
    "options": [
      "本を 読みながら お茶を 飲みます",
      "お茶を 読みながら 本を 飲みます",
      "読みながら 本を お茶を 飲みます",
      "本 お茶を 読みながら を 飲みます"
    ],
    "correctAnswer": "本を 読みながら お茶を 飲みます",
    "explanation": "正解は「A」の「本を 読みながら お茶を 飲みます」です。"
  },
  {
    "id": "jp_n5_set3_25",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q10】「明日 / まで / に / レポートを 出して ください」",
    "options": [
      "明日までに レポートを 出して ください",
      "レポートまでに 明日を 出して ください",
      "までに 明日 レポートを 出して ください",
      "出して ください 明日までに レポートを"
    ],
    "correctAnswer": "明日までに レポートを 出して ください",
    "explanation": "正解は「A」の「明日までに レポートを 出して ください」です。"
  },
  {
    "id": "jp_n5_set3_26",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q11】「今日 / の / 会議 / は / 中止に なりました」",
    "options": [
      "今日の 会議は 中止に なりました",
      "会議の 今日は 中止に なりました",
      "中止に 今日の 会議は なりました",
      "なりました 今日の 会議は 中止に"
    ],
    "correctAnswer": "今日の 会議は 中止に なりました",
    "explanation": "正解は「A」の「今日の 会議は 中止に なりました」です。"
  },
  {
    "id": "jp_n5_set3_27",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q12】「友だち / と / いっしょに / 旅行に 行きます」",
    "options": [
      "友だちと いっしょに 旅行に 行きます",
      "いっしょに 友だちと 旅行に 行きます",
      "旅行に 友だちと いっしょに 行きます",
      "行きます 友だちと いっしょに 旅行に"
    ],
    "correctAnswer": "友だちと いっしょに 旅行に 行きます",
    "explanation": "正解は「A」の「友だちと いっしょに 旅行に 行きます」です。"
  },
  {
    "id": "jp_n5_set3_28",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q13】（13）に 入るのは どれですか。",
    "options": [
      "しました",
      "行きました",
      "あげました",
      "かいました"
    ],
    "correctAnswer": "しました",
    "explanation": "正解は「A」の「しました」です。"
  },
  {
    "id": "jp_n5_set3_29",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q14】（14）に 入るのは どれですか。",
    "options": [
      "歌いました",
      "聞きました",
      "話しました",
      "読みました"
    ],
    "correctAnswer": "歌いました",
    "explanation": "正解は「A」の「歌いました」です。"
  },
  {
    "id": "jp_n5_set3_30",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q15】（15）に 入るのは どれですか。",
    "options": [
      "あそびました",
      "ねました",
      "はたらきました",
      "べんきょうしました"
    ],
    "correctAnswer": "あそびました",
    "explanation": "正解は「A」の「あそびました」です。"
  },
  {
    "id": "jp_n5_set3_31",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q1】Reading (どっかい)\nわたしは 先週から 新しい アルバイトを はじめました。スーパーで レジの しごとを しています。はじめは たいへんでしたが、今は 少し なれました。時給は 1,000円で、一週間に 三回 はたらいています。\n\n質問: 「わたし」は どこで アルバイトを していますか。",
    "options": [
      "スーパー",
      "レストラン",
      "としょかん",
      "がっこう"
    ],
    "correctAnswer": "スーパー",
    "explanation": "正解は「A」の「スーパー」です。"
  },
  {
    "id": "jp_n5_set3_32",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q2】Reading (どっかい)\nわたしは 先週から 新しい アルバイトを はじめました。スーパーで レジの しごとを しています。はじめは たいへんでしたが、今は 少し なれました。時給は 1,000円で、一週間に 三回 はたらいています。\n\n質問: 一週間に 何回 はたらきますか。",
    "options": [
      "一回",
      "二回",
      "三回",
      "五回"
    ],
    "correctAnswer": "三回",
    "explanation": "正解は「C」の「三回」です。"
  },
  {
    "id": "jp_n5_set3_33",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q3】Reading (どっかい)\nわたしは 先週から 新しい アルバイトを はじめました。スーパーで レジの しごとを しています。はじめは たいへんでしたが、今は 少し なれました。時給は 1,000円で、一週間に 三回 はたらいています。\n山田さんは 動物が 大好きです。家で 犬を 二匹と ねこを 一匹 かっています。毎朝 犬と さんぽに 行きます。休みの日には 動物園へ 行くことも あります。\n\n質問: 山田さんは 何を かっていますか。",
    "options": [
      "犬2匹と ねこ1匹",
      "犬1匹と ねこ2匹",
      "犬だけ",
      "ねこだけ"
    ],
    "correctAnswer": "犬2匹と ねこ1匹",
    "explanation": "正解は「A」の「犬2匹と ねこ1匹」です。"
  },
  {
    "id": "jp_n5_set3_34",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q4】Reading (どっかい)\nわたしは 先週から 新しい アルバイトを はじめました。スーパーで レジの しごとを しています。はじめは たいへんでしたが、今は 少し なれました。時給は 1,000円で、一週間に 三回 はたらいています。\n山田さんは 動物が 大好きです。家で 犬を 二匹と ねこを 一匹 かっています。毎朝 犬と さんぽに 行きます。休みの日には 動物園へ 行くことも あります。\n\n質問: 山田さんは 毎朝 何を しますか。",
    "options": [
      "犬と さんぽに 行く",
      "動物園へ 行く",
      "ねこと あそぶ",
      "しごとに 行く"
    ],
    "correctAnswer": "犬と さんぽに 行く",
    "explanation": "正解は「A」の「犬と さんぽに 行く」です。"
  },
  {
    "id": "jp_n5_set3_35",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q5】Reading (どっかい)\nわたしは 先週から 新しい アルバイトを はじめました。スーパーで レジの しごとを しています。はじめは たいへんでしたが、今は 少し なれました。時給は 1,000円で、一週間に 三回 はたらいています。\n山田さんは 動物が 大好きです。家で 犬を 二匹と ねこを 一匹 かっています。毎朝 犬と さんぽに 行きます。休みの日には 動物園へ 行くことも あります。\nえいがかんの おしらせ\n・上映時間：10:00 / 13:00 / 16:00 / 19:00\n・学生は チケットが 半額に なります（学生証が ひつようです）。\n・月に 一回、第一月曜日は「サービスデー」で、全員 1,000円です。\n\n質問: 学生が やすく 見るには 何が ひつようですか。",
    "options": [
      "お金",
      "学生証",
      "チケット2枚",
      "よやく"
    ],
    "correctAnswer": "学生証",
    "explanation": "正解は「B」の「学生証」です。"
  },
  {
    "id": "jp_n5_set3_36",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q6】Reading (どっかい)\nわたしは 先週から 新しい アルバイトを はじめました。スーパーで レジの しごとを しています。はじめは たいへんでしたが、今は 少し なれました。時給は 1,000円で、一週間に 三回 はたらいています。\n山田さんは 動物が 大好きです。家で 犬を 二匹と ねこを 一匹 かっています。毎朝 犬と さんぽに 行きます。休みの日には 動物園へ 行くことも あります。\nえいがかんの おしらせ\n・上映時間：10:00 / 13:00 / 16:00 / 19:00\n・学生は チケットが 半額に なります（学生証が ひつようです）。\n・月に 一回、第一月曜日は「サービスデー」で、全員 1,000円です。\n\n質問: 「サービスデー」は いつですか。",
    "options": [
      "毎週月曜日",
      "第一月曜日",
      "毎月最後の日",
      "日曜日"
    ],
    "correctAnswer": "第一月曜日",
    "explanation": "正解は「B」の「第一月曜日」です。"
  },
  {
    "id": "jp_n5_set3_37",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "LISTENING",
    "prompt": "【聴解 Q1】男の人：会議室は どこですか。\n女の人：2階の 一番 奥の へやです。エレベーターの 前を 通って まっすぐです。\n\n質問: 会議室は どこに ありますか。",
    "options": [
      "2階のいちばん奥",
      "1階の入口",
      "3階の左側",
      "地下"
    ],
    "correctAnswer": "2階のいちばん奥",
    "explanation": "正解は「A」の「2階のいちばん奥」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_051.mp3"
  },
  {
    "id": "jp_n5_set3_38",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "LISTENING",
    "prompt": "【聴解 Q2】女の人：チケットは 何枚 いりますか。\n男の人：大人が 二枚と 子どもが 一枚です。\n\n質問: チケットは 何枚 いりますか。",
    "options": [
      "大人2枚子ども1枚",
      "大人1枚子ども2枚",
      "大人3枚",
      "子ども3枚"
    ],
    "correctAnswer": "大人2枚子ども1枚",
    "explanation": "正解は「A」の「大人2枚子ども1枚」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_054.mp3"
  },
  {
    "id": "jp_n5_set3_39",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "LISTENING",
    "prompt": "【聴解 Q3】店員：サイズは いかがですか。\n客：Mサイズは ちょっと 小さいので、Lサイズを ください。\n\n質問: 客は どのサイズを 買いますか。",
    "options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "correctAnswer": "L",
    "explanation": "正解は「C」の「L」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_057.mp3"
  },
  {
    "id": "jp_n5_set3_40",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "LISTENING",
    "prompt": "【聴解 Q4】男の人：あしたの テストの じゅんびは できましたか。\n女の人：まだです。今から 図書館で べんきょうします。\n\n質問: 女の人は これから 何を しますか。",
    "options": [
      "テストを 受ける",
      "図書館で 勉強する",
      "家に 帰る",
      "寝る"
    ],
    "correctAnswer": "図書館で 勉強する",
    "explanation": "正解は「B」の「図書館で 勉強する」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_060.mp3"
  },
  {
    "id": "jp_n5_set3_41",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "LISTENING",
    "prompt": "【聴解 Q5】天気よほう：今夜は 気温が 下がって、寒く なるでしょう。あたたかい ふくを きて ください。\n\n質問: 今夜の 天気は どうですか。",
    "options": [
      "あたたかい",
      "寒くなる",
      "雨がふる",
      "かわらない"
    ],
    "correctAnswer": "寒くなる",
    "explanation": "正解は「B」の「寒くなる」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_063.mp3"
  },
  {
    "id": "jp_n5_set3_42",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "LISTENING",
    "prompt": "【聴解 Q6】先生：しゅくだいは ノートに 書いて、来週 出して ください。\n\n質問: しゅくだいは いつ 出しますか。",
    "options": [
      "今日",
      "明日",
      "来週",
      "来月"
    ],
    "correctAnswer": "来週",
    "explanation": "正解は「C」の「来週」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_066.mp3"
  },
  {
    "id": "jp_n5_set3_43",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "LISTENING",
    "prompt": "【聴解 Q7】男の人：この コート、試着しても いいですか。\n店員：はい、どうぞ。あちらの 試着室を お使い ください。\n\n質問: 男の人は 何を しますか。",
    "options": [
      "コートを 試着する",
      "コートを 買う",
      "コートを 返す",
      "コートを 見るだけ"
    ],
    "correctAnswer": "コートを 試着する",
    "explanation": "正解は「A」の「コートを 試着する」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_069.mp3"
  },
  {
    "id": "jp_n5_set3_44",
    "level": "N5",
    "mockSet": "N5_SET_3",
    "type": "LISTENING",
    "prompt": "【聴解 Q8】女の人：駅までは バスで どのくらい かかりますか。\n男の人：15分ぐらいです。でも 今の 時間は こんでいますから、20分ぐらい かかるかもしれません。\n\n質問: 駅まで バスで だいたい どのくらい かかりますか。",
    "options": [
      "10分",
      "15〜20分",
      "30分",
      "1時間"
    ],
    "correctAnswer": "15〜20分",
    "explanation": "正解は「B」の「15〜20分」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_072.mp3"
  },
  {
    "id": "jp_n5_set4_1",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q1】姉は 看護師です。",
    "options": [
      "あね",
      "いもうと",
      "あに",
      "おとうと"
    ],
    "correctAnswer": "あね",
    "explanation": "正解は「A」の「あね」です。"
  },
  {
    "id": "jp_n5_set4_2",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q2】今朝 は はやく おきました。",
    "options": [
      "けさ",
      "こんあさ",
      "いまあさ",
      "きょうあさ"
    ],
    "correctAnswer": "けさ",
    "explanation": "正解は「A」の「けさ」です。"
  },
  {
    "id": "jp_n5_set4_3",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q3】郵便局 で きってを 買いました。",
    "options": [
      "ゆうびんきょく",
      "ゆびんきょく",
      "ゆうべんきょく",
      "ようびんきょく"
    ],
    "correctAnswer": "ゆうびんきょく",
    "explanation": "正解は「A」の「ゆうびんきょく」です。"
  },
  {
    "id": "jp_n5_set4_4",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q4】冷蔵庫 に ぎゅうにゅうが あります。",
    "options": [
      "れいぞうこ",
      "れいぞうご",
      "れいそうこ",
      "れいぞうごう"
    ],
    "correctAnswer": "れいぞうこ",
    "explanation": "正解は「A」の「れいぞうこ」です。"
  },
  {
    "id": "jp_n5_set4_5",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q5】来月 りょこうに 行きます。",
    "options": [
      "らいげつ",
      "こんげつ",
      "せんげつ",
      "まいつき"
    ],
    "correctAnswer": "らいげつ",
    "explanation": "正解は「A」の「らいげつ」です。"
  },
  {
    "id": "jp_n5_set4_6",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q6】さむいですから、コートを ___ください。",
    "options": [
      "きて",
      "ぬいで",
      "かって",
      "うって"
    ],
    "correctAnswer": "きて",
    "explanation": "正解は「A」の「きて」です。"
  },
  {
    "id": "jp_n5_set4_7",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q7】しゅくだいが おおくて、とても ___です。",
    "options": [
      "たいへん",
      "ひま",
      "かんたん",
      "しずか"
    ],
    "correctAnswer": "たいへん",
    "explanation": "正解は「A」の「たいへん」です。"
  },
  {
    "id": "jp_n5_set4_8",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q8】でんわばんごうを ___しまいました。",
    "options": [
      "わすれて",
      "おぼえて",
      "かいて",
      "よんで"
    ],
    "correctAnswer": "わすれて",
    "explanation": "正解は「A」の「わすれて」です。"
  },
  {
    "id": "jp_n5_set4_9",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q9】こうつうじこが あって、でんしゃが ___。",
    "options": [
      "とまりました",
      "はしりました",
      "でました",
      "つきました"
    ],
    "correctAnswer": "とまりました",
    "explanation": "正解は「A」の「とまりました」です。"
  },
  {
    "id": "jp_n5_set4_10",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q10】しあいに かって、みんな とても ___。",
    "options": [
      "よろこびました",
      "おこりました",
      "なきました",
      "こまりました"
    ],
    "correctAnswer": "よろこびました",
    "explanation": "正解は「A」の「よろこびました」です。"
  },
  {
    "id": "jp_n5_set4_11",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q11】まいにち みず を のみます。",
    "options": [
      "水",
      "氷",
      "木",
      "雨"
    ],
    "correctAnswer": "水",
    "explanation": "正解は「A」の「水」です。"
  },
  {
    "id": "jp_n5_set4_12",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q12】きょうは つき が きれいです。",
    "options": [
      "月",
      "日",
      "星",
      "雲"
    ],
    "correctAnswer": "月",
    "explanation": "正解は「A」の「月」です。"
  },
  {
    "id": "jp_n5_set4_13",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q13】あには いしゃ です。",
    "options": [
      "医者",
      "委者",
      "医社",
      "歯医者"
    ],
    "correctAnswer": "医者",
    "explanation": "正解は「A」の「医者」です。"
  },
  {
    "id": "jp_n5_set4_14",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q14】この もんだいは とても むずかしいです。",
    "options": [
      "この もんだいは かんたんじゃないです。",
      "この もんだいは かんたんです。",
      "この もんだいは みじかいです。",
      "この もんだいは やすいです。"
    ],
    "correctAnswer": "この もんだいは かんたんじゃないです。",
    "explanation": "正解は「A」の「この もんだいは かんたんじゃないです。」です。"
  },
  {
    "id": "jp_n5_set4_15",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【語彙・漢字 Q15】わたしは いつも でんしゃの 中で ねます。",
    "options": [
      "わたしは でんしゃに のっている あいだ、ねます。",
      "わたしは でんしゃを うんてんします。",
      "わたしは でんしゃを まちます。",
      "わたしは でんしゃで しごとを します。"
    ],
    "correctAnswer": "わたしは でんしゃに のっている あいだ、ねます。",
    "explanation": "正解は「A」の「わたしは でんしゃに のっている あいだ、ねます。」です。"
  },
  {
    "id": "jp_n5_set4_16",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q1】きょうしつ ___ だれも いません。",
    "options": [
      "に",
      "で",
      "を",
      "と"
    ],
    "correctAnswer": "に",
    "explanation": "正解は「A」の「に」です。"
  },
  {
    "id": "jp_n5_set4_17",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q2】わたしは あさごはん ___ たべないで、がっこうへ 行きました。",
    "options": [
      "を",
      "が",
      "に",
      "で"
    ],
    "correctAnswer": "を",
    "explanation": "正解は「A」の「を」です。"
  },
  {
    "id": "jp_n5_set4_18",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q3】つかれた ___ 、はやく ねました。",
    "options": [
      "ので",
      "のに",
      "けど",
      "し"
    ],
    "correctAnswer": "ので",
    "explanation": "正解は「A」の「ので」です。"
  },
  {
    "id": "jp_n5_set4_19",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q4】この みちは くるま ___ とおれません。",
    "options": [
      "が",
      "を",
      "で",
      "は"
    ],
    "correctAnswer": "が",
    "explanation": "正解は「A」の「が」です。"
  },
  {
    "id": "jp_n5_set4_20",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q5】わからない ___ あったら、しつもんして ください。",
    "options": [
      "ことが",
      "ものが",
      "のが",
      "ところが"
    ],
    "correctAnswer": "ことが",
    "explanation": "正解は「A」の「ことが」です。"
  },
  {
    "id": "jp_n5_set4_21",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q6】しごとが おわった ___ 、いえに かえります。",
    "options": [
      "あとで",
      "まえに",
      "ときに",
      "あいだに"
    ],
    "correctAnswer": "あとで",
    "explanation": "正解は「A」の「あとで」です。"
  },
  {
    "id": "jp_n5_set4_22",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q7】この カメラは あの カメラ ___ かるいです。",
    "options": [
      "より",
      "ほど",
      "から",
      "まで"
    ],
    "correctAnswer": "より",
    "explanation": "正解は「A」の「より」です。"
  },
  {
    "id": "jp_n5_set4_23",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q8】どうぞ、めしあがって ___。",
    "options": [
      "ください",
      "あげます",
      "くれます",
      "やります"
    ],
    "correctAnswer": "ください",
    "explanation": "正解は「A」の「ください」です。"
  },
  {
    "id": "jp_n5_set4_24",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q9】「宿題 / が / 終わらなくて / 困っています」",
    "options": [
      "宿題が 終わらなくて 困っています",
      "困っています 宿題が 終わらなくて",
      "終わらなくて 宿題が 困っています",
      "宿題 困っています 終わらなくて が"
    ],
    "correctAnswer": "宿題が 終わらなくて 困っています",
    "explanation": "正解は「A」の「宿題が 終わらなくて 困っています」です。"
  },
  {
    "id": "jp_n5_set4_25",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q10】「駅前 / に / 新しい / 店が できました」",
    "options": [
      "駅前に 新しい 店が できました",
      "新しい 駅前に 店が できました",
      "店が 駅前に 新しい できました",
      "できました 駅前に 新しい 店が"
    ],
    "correctAnswer": "駅前に 新しい 店が できました",
    "explanation": "正解は「A」の「駅前に 新しい 店が できました」です。"
  },
  {
    "id": "jp_n5_set4_26",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q11】「テスト / の / 結果 / が / 心配です」",
    "options": [
      "テストの 結果が 心配です",
      "結果の テストが 心配です",
      "心配です テストの 結果が",
      "テストが 結果の 心配です"
    ],
    "correctAnswer": "テストの 結果が 心配です",
    "explanation": "正解は「A」の「テストの 結果が 心配です」です。"
  },
  {
    "id": "jp_n5_set4_27",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q12】「早く / 元気に / なって / ください」",
    "options": [
      "早く 元気に なって ください",
      "元気に 早く なって ください",
      "なって 早く 元気に ください",
      "ください 早く 元気に なって"
    ],
    "correctAnswer": "早く 元気に なって ください",
    "explanation": "正解は「A」の「早く 元気に なって ください」です。"
  },
  {
    "id": "jp_n5_set4_28",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q13】（13）に 入るのは どれですか。",
    "options": [
      "休みました",
      "行きました",
      "はじめました",
      "わすれました"
    ],
    "correctAnswer": "休みました",
    "explanation": "正解は「A」の「休みました」です。"
  },
  {
    "id": "jp_n5_set4_29",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q14】（14）に 入るのは どれですか。",
    "options": [
      "元気",
      "病気",
      "だめ",
      "心配"
    ],
    "correctAnswer": "元気",
    "explanation": "正解は「A」の「元気」です。"
  },
  {
    "id": "jp_n5_set4_30",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "FILL_BLANK",
    "prompt": "【文法 Q15】（15）に 入るのは どれですか。",
    "options": [
      "がんばる",
      "やすむ",
      "わすれる",
      "たべる"
    ],
    "correctAnswer": "がんばる",
    "explanation": "正解は「A」の「がんばる」です。"
  },
  {
    "id": "jp_n5_set4_31",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q1】Reading (どっかい)\nわたしの 趣味は 料理です。週末に よく 新しい りょうりを 作ります。先週は カレーを 作りました。少し からかったですが、家族は「おいしい」と 言って くれました。\n\n質問: 「わたし」の 趣味は 何ですか。",
    "options": [
      "料理",
      "読書",
      "スポーツ",
      "音楽"
    ],
    "correctAnswer": "料理",
    "explanation": "正解は「A」の「料理」です。"
  },
  {
    "id": "jp_n5_set4_32",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q2】Reading (どっかい)\nわたしの 趣味は 料理です。週末に よく 新しい りょうりを 作ります。先週は カレーを 作りました。少し からかったですが、家族は「おいしい」と 言って くれました。\n\n質問: 先週 何を 作りましたか。",
    "options": [
      "カレー",
      "ラーメン",
      "サラダ",
      "ケーキ"
    ],
    "correctAnswer": "カレー",
    "explanation": "正解は「A」の「カレー」です。"
  },
  {
    "id": "jp_n5_set4_33",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q3】Reading (どっかい)\nわたしの 趣味は 料理です。週末に よく 新しい りょうりを 作ります。先週は カレーを 作りました。少し からかったですが、家族は「おいしい」と 言って くれました。\n鈴木さんは 毎年 夏休みに 海外旅行に 行きます。今年は タイへ 行く よていです。飛行機の チケットは もう 買いましたが、ホテルは まだ 予約していません。\n\n質問: 鈴木さんは 今年 どこへ 行きますか。",
    "options": [
      "タイ",
      "日本",
      "アメリカ",
      "中国"
    ],
    "correctAnswer": "タイ",
    "explanation": "正解は「A」の「タイ」です。"
  },
  {
    "id": "jp_n5_set4_34",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q4】Reading (どっかい)\nわたしの 趣味は 料理です。週末に よく 新しい りょうりを 作ります。先週は カレーを 作りました。少し からかったですが、家族は「おいしい」と 言って くれました。\n鈴木さんは 毎年 夏休みに 海外旅行に 行きます。今年は タイへ 行く よていです。飛行機の チケットは もう 買いましたが、ホテルは まだ 予約していません。\n\n質問: まだ していないことは 何ですか。",
    "options": [
      "チケットを 買うこと",
      "ホテルを 予約すること",
      "旅行の 計画を 立てること",
      "パスポートを 作ること"
    ],
    "correctAnswer": "ホテルを 予約すること",
    "explanation": "正解は「B」の「ホテルを 予約すること」です。"
  },
  {
    "id": "jp_n5_set4_35",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q5】Reading (どっかい)\nわたしの 趣味は 料理です。週末に よく 新しい りょうりを 作ります。先週は カレーを 作りました。少し からかったですが、家族は「おいしい」と 言って くれました。\n鈴木さんは 毎年 夏休みに 海外旅行に 行きます。今年は タイへ 行く よていです。飛行機の チケットは もう 買いましたが、ホテルは まだ 予約していません。\nアパートの ごみ出しについて\n・もえるごみ：火曜日と 金曜日\n・もえないごみ：第2・第4水曜日\n・出す時間：朝8時までに 出して ください。\n・ごみは かならず とうめいの ふくろに 入れて ください。\n\n質問: もえるごみは いつ 出しますか。",
    "options": [
      "月曜日と木曜日",
      "火曜日と金曜日",
      "毎日",
      "水曜日だけ"
    ],
    "correctAnswer": "火曜日と金曜日",
    "explanation": "正解は「B」の「火曜日と金曜日」です。"
  },
  {
    "id": "jp_n5_set4_36",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【読解 Q6】Reading (どっかい)\nわたしの 趣味は 料理です。週末に よく 新しい りょうりを 作ります。先週は カレーを 作りました。少し からかったですが、家族は「おいしい」と 言って くれました。\n鈴木さんは 毎年 夏休みに 海外旅行に 行きます。今年は タイへ 行く よていです。飛行機の チケットは もう 買いましたが、ホテルは まだ 予約していません。\nアパートの ごみ出しについて\n・もえるごみ：火曜日と 金曜日\n・もえないごみ：第2・第4水曜日\n・出す時間：朝8時までに 出して ください。\n・ごみは かならず とうめいの ふくろに 入れて ください。\n\n質問: ごみは 何時までに 出しますか。",
    "options": [
      "朝7時",
      "朝8時",
      "夜8時",
      "夜10時"
    ],
    "correctAnswer": "朝8時",
    "explanation": "正解は「B」の「朝8時」です。"
  },
  {
    "id": "jp_n5_set4_37",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "LISTENING",
    "prompt": "【聴解 Q1】女の人：郵便局は どこですか。\n男の人：あの 信号を 渡って、すぐ 左です。\n\n質問: 郵便局は どこに ありますか。",
    "options": [
      "信号を渡って左",
      "信号を渡って右",
      "信号の前",
      "信号を渡らない"
    ],
    "correctAnswer": "信号を渡って左",
    "explanation": "正解は「A」の「信号を渡って左」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_075.mp3"
  },
  {
    "id": "jp_n5_set4_38",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "LISTENING",
    "prompt": "【聴解 Q2】男の人：会議は 何時からですか。\n女の人：10時からですが、資料は 9時半までに 準備して ください。\n\n質問: 資料は 何時までに 準備しますか。",
    "options": [
      "9時",
      "9時半",
      "10時",
      "10時半"
    ],
    "correctAnswer": "9時半",
    "explanation": "正解は「B」の「9時半」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_077.mp3"
  },
  {
    "id": "jp_n5_set4_39",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "LISTENING",
    "prompt": "【聴解 Q3】店員：お飲み物は 何に なさいますか。\n客：アイスコーヒーを 一つ お願いします。\n\n質問: 客は 何を 頼みましたか。",
    "options": [
      "アイスコーヒー",
      "ホットコーヒー",
      "紅茶",
      "ジュース"
    ],
    "correctAnswer": "アイスコーヒー",
    "explanation": "正解は「A」の「アイスコーヒー」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_079.mp3"
  },
  {
    "id": "jp_n5_set4_40",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "LISTENING",
    "prompt": "【聴解 Q4】女の人：宿題、終わりましたか。\n男の人：あと 少しです。あと 10分ぐらいで 終わります。\n\n質問: 男の人の 宿題は どのくらいで 終わりますか。",
    "options": [
      "すぐ終わる",
      "あと10分",
      "あと1時間",
      "もう終わった"
    ],
    "correctAnswer": "あと10分",
    "explanation": "正解は「B」の「あと10分」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_081.mp3"
  },
  {
    "id": "jp_n5_set4_41",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "LISTENING",
    "prompt": "【聴解 Q5】天気よほう：明日は 朝から 雪が 降るでしょう。道が 滑りやすく なりますので、気をつけて ください。\n\n質問: 明日の 天気は どうですか。",
    "options": [
      "晴れ",
      "雨",
      "雪",
      "曇り"
    ],
    "correctAnswer": "雪",
    "explanation": "正解は「C」の「雪」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_083.mp3"
  },
  {
    "id": "jp_n5_set4_42",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "LISTENING",
    "prompt": "【聴解 Q6】先生：次の 授業は 教室じゃなくて、体育館で やります。\n\n質問: 次の 授業は どこで やりますか。",
    "options": [
      "教室",
      "体育館",
      "図書館",
      "校庭"
    ],
    "correctAnswer": "体育館",
    "explanation": "正解は「B」の「体育館」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_084.mp3"
  },
  {
    "id": "jp_n5_set4_43",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "LISTENING",
    "prompt": "【聴解 Q7】男の人：この シャツ、色違いは ありますか。\n店員：はい、青と 白が あります。\n\n質問: シャツには どんな 色が ありますか。",
    "options": [
      "青と白",
      "赤と黒",
      "緑と黄色",
      "白だけ"
    ],
    "correctAnswer": "青と白",
    "explanation": "正解は「A」の「青と白」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_085.mp3"
  },
  {
    "id": "jp_n5_set4_44",
    "level": "N5",
    "mockSet": "N5_SET_4",
    "type": "LISTENING",
    "prompt": "【聴解 Q8】女の人：空港まで タクシーで どのくらい かかりますか。\n男の人：普通は 30分ですが、渋滞していたら 1時間ぐらい かかります。\n\n質問: 渋滞していたら 空港まで どのくらい かかりますか。",
    "options": [
      "30分",
      "45分",
      "1時間",
      "2時間"
    ],
    "correctAnswer": "1時間",
    "explanation": "正解は「C」の「1時間」です。",
    "audioUrl": "/audio/n5/minna_shokyu_1_087.mp3"
  },
  {
    "id": "jp_n4_1_1",
    "level": "N4",
    "mockSet": "N4_SET_1",
    "type": "MULTIPLE_CHOICE",
    "prompt": "【N4 文字・語彙】下線の言葉のひらがなを選んでください: 先生に【相談】しました。",
    "options": [
      "そうだん",
      "しょうだん",
      "さくだん",
      "しょくだん"
    ],
    "correctAnswer": "そうだん",
    "explanation": "「相談」は「そうだん」(Consultation)と読みます。"
  },
  {
    "id": "jp_n4_1_2",
    "level": "N4",
    "mockSet": "N4_SET_1",
    "type": "FILL_BLANK",
    "prompt": "【N4 文法】適切な形を入れてください: 雨が【_____】から、傘を持っていきます。",
    "options": [
      "ふりそう",
      "ふり",
      "ふりつづけて",
      "ふりそうに"
    ],
    "correctAnswer": "ふりそう",
    "explanation": "「〜そうです」(Looks like it will rain)は動詞のます形語幹につきます。"
  },
  {
    "id": "jp_n4_1_3",
    "level": "N4",
    "mockSet": "N4_SET_1",
    "type": "LISTENING",
    "prompt": "【N4 聴解】音声を聞いて、男の人と女の人が何時に出会うか選んでください。",
    "audioUrl": "/audio/n5/minna_shokyu_1_025.mp3",
    "options": [
      "2時",
      "2時半",
      "3時",
      "3時半"
    ],
    "correctAnswer": "2時半",
    "explanation": "音声会話より正解は2時半です。"
  }
];

const KOREAN_QUESTIONS: ExamQuestion[] = [
  // EPS-TOPIK
  {
    id: 'ko_eps_1',
    level: 'EPS',
    type: 'MULTIPLE_CHOICE',
    prompt: '다음 단어와 관계있는 것은 무엇입니까? (다음: 사과, 배, 수박)',
    options: ['야채', '과일', '음료수', '가구'],
    correctAnswer: '과일',
    explanation: '사과(Apple), 배(Pear), 수박(Watermelon)은 모두 과일(Fruit)입니다.',
  },
  {
    id: 'ko_eps_2',
    level: 'EPS',
    type: 'FILL_BLANK',
    prompt: '빈칸에 들어갈 가장 알맞은 것을 골라주십시오: 한국어 시험이 _____ 너무 떨려요.',
    options: ['어려워서', '쉬워서', '재미있어서', '좋아서'],
    correctAnswer: '어려워서',
    explanation: '시험이 어려워서(Because test is difficult) 떨립니다.',
  },
  {
    id: 'ko_eps_3',
    level: 'EPS',
    type: 'MULTIPLE_CHOICE',
    prompt: '공장에서 일할 때 반드시 착용해야 하는 안전 장구는 무엇입니까?',
    options: ['안전모', '운동화', '모자', '슬리퍼'],
    correctAnswer: '안전모',
    explanation: '공장에서는 머리를保護하기 위해 안전모(Safety Helmet)를 착용해야 합니다.',
  },

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
    prompt: '환경 오염이 심각해ジムに _____ 정부는 새로운 정책을 발표했다.',
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
    explanation: '문맥 및 일반적 표현 비교 시 적절性を 평가합니다.',
  },
];



export interface TimedExamEngineProps {
  activeLanguage?: 'JAPANESE' | 'KOREAN';
  onCompleteExam?: (result: { score: number; passed: boolean; timeSpentSeconds: number }) => void;
}

export interface TimedExamEngineProps {
  activeLanguage?: 'JAPANESE' | 'KOREAN';
  onCompleteExam?: (result: { score: number; passed: boolean; timeSpentSeconds: number }) => void;
}

export const TimedExamEngine: React.FC<TimedExamEngineProps> = ({
  activeLanguage = 'JAPANESE',
  onCompleteExam,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Flow State
  const [isExamActive, setIsExamActive] = useState(false);
  const [selectedMockTest, setSelectedMockTest] = useState<MockTestInfo | null>(null);

  // 2-Paper Official JLPT Structure (0: Paper 1 [Vocab/Grammar/Reading], 1: Paper 2 [Listening])
  const [currentPaperIndex, setCurrentPaperIndex] = useState<number>(0);
  const [paper1Submitted, setPaper1Submitted] = useState<boolean>(false);
  
  // Modal States
  const [showExitConfirmModal, setShowExitConfirmModal] = useState(false);
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [breakTimerSeconds, setBreakTimerSeconds] = useState(15 * 60);

  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('ALL');
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
    jftScore?: number; // Out of 250 points
    jftSections?: { sectionTitle: string; correct: number; total: number; pts: number }[];
    paper1Score?: { correct: number; total: number; percentage: number };
    paper2Score?: { correct: number; total: number; percentage: number };
  } | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'ALL' | 'INCORRECT' | 'FLAGGED'>('ALL');

  const allQuestions = activeLanguage === 'JAPANESE' ? JAPANESE_QUESTIONS : KOREAN_QUESTIONS;

  const rawQuestions = selectedMockTest
    ? allQuestions.filter((q) => q.mockSet === selectedMockTest.mockSet || (selectedMockTest.mockSet.startsWith('ALL_') && q.level === selectedMockTest.level))
    : allQuestions;

  const isJFT = selectedMockTest?.examFormat === 'JFT_CBT' || selectedMockTest?.level === 'JFT';

  // Filter questions according to current paper (JLPT) vs CBT (JFT)
  const currentPaperQuestions = React.useMemo(() => {
    if (!selectedMockTest || selectedMockTest.language !== 'JAPANESE' || rawQuestions.length < 40 || isJFT) {
      return rawQuestions;
    }
    if (currentPaperIndex === 0) return rawQuestions.slice(0, 36); // Paper 1: Vocab + Grammar + Reading (Q1 to Q36)
    return rawQuestions.slice(36); // Paper 2: Audio Listening (Q37 to Q44)
  }, [rawQuestions, currentPaperIndex, selectedMockTest, isJFT]);

  const questions = currentPaperQuestions;

  const filteredCatalog = MOCK_TEST_CATALOG.filter((test) => {
    if (test.language !== activeLanguage) return false;
    if (selectedLevelFilter !== 'ALL' && test.level !== selectedLevelFilter) return false;
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
    setSelectedLevelFilter('ALL');
    setIsSubmitted(false);
    setExamResult(null);
    setShowExitConfirmModal(false);
    setShowBreakModal(false);
  }, [activeLanguage]);

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
      alert('Rule: Audio can only be replayed a maximum of 2 times in official JLPT exams.');
      return;
    }

    stopCurrentAudio();

    setAudioPlaysCount((prev) => ({ ...prev, [currentQ.id]: currentPlays + 1 }));

    if (currentQ.audioUrl) {
      const audio = new Audio(currentQ.audioUrl);
      audioRef.current = audio;
      audio.play().catch(() => {
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(currentQ.prompt);
          utterance.lang = activeLanguage === 'JAPANESE' ? 'ja-JP' : 'ko-KR';
          window.speechSynthesis.speak(utterance);
        }
      });
    } else if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentQ.prompt);
      utterance.lang = activeLanguage === 'JAPANESE' ? 'ja-JP' : 'ko-KR';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSubmitExam = () => {
    stopCurrentAudio();
    setIsSubmitted(true);
    let correctCount = 0;
    rawQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const totalQ = rawQuestions.length || 1;
    const percentage = Math.round((correctCount / totalQ) * 100);
    const timeSpentSeconds = ((selectedMockTest?.timeLimitMinutes || 60) * 60) - secondsRemaining;

    if (isJFT) {
      // JFT-Basic CBT Exam 250 Points Scale Scoring (Pass: 200 / 250 pts)
      const jftPoints = Math.round(10 + (correctCount / totalQ) * 240);
      const passed = jftPoints >= 200;

      // 4 JFT Section Scores (~11-12 Qs per section)
      const sec1 = rawQuestions.slice(0, 12);
      const sec2 = rawQuestions.slice(12, 24);
      const sec3 = rawQuestions.slice(24, 36);
      const sec4 = rawQuestions.slice(36);

      const calcJftSec = (title: string, arr: ExamQuestion[], maxPts: number) => {
        const c = arr.filter(q => selectedAnswers[q.id] === q.correctAnswer).length;
        const pts = arr.length ? Math.round((c / arr.length) * maxPts) : 0;
        return { sectionTitle: title, correct: c, total: arr.length, pts };
      };

      setExamResult({
        score: percentage,
        correctCount,
        totalQuestions: totalQ,
        passed,
        timeSpentSeconds: Math.max(1, timeSpentSeconds),
        jftScore: jftPoints,
        jftSections: [
          calcJftSec('Script & Vocabulary (文字・語彙)', sec1, 60),
          calcJftSec('Conversation & Expression (会話・表現)', sec2, 60),
          calcJftSec('Listening Comprehension (聴解)', sec3, 65),
          calcJftSec('Reading Comprehension (読解)', sec4, 65),
        ]
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
      <div className="w-full max-w-5xl mx-auto font-sans space-y-6">
        {/* Lobby Header */}
        <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Official Exam Simulator & Prometric CBT Center</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {activeLanguage === 'JAPANESE' ? 'JLPT Paper & JFT-Basic CBT Official Exam Center' : 'EPS-TOPIK & TOPIK I / II Mock Test Center'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Supports both JLPT Official 2-Paper Booklet Exam (with 15-min Break) and JFT-Basic Computer Test (250 Marks Scale for SSW A2 Visa).
            </p>
          </div>
        </div>

        {/* Level Filter Bar */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-2 rounded-2xl border border-slate-800 flex-wrap">
          <span className="text-xs font-bold text-slate-400 px-2 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-400" /> Choose Level:
          </span>
          <button
            onClick={() => setSelectedLevelFilter('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedLevelFilter === 'ALL' ? 'bg-indigo-600 text-white shadow-glow' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Levels ({MOCK_TEST_CATALOG.filter(t => t.language === activeLanguage).length})
          </button>
          {activeLanguage === 'JAPANESE' ? (
            ['JFT', 'N5', 'N4', 'N3', 'N2'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevelFilter(lvl)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  selectedLevelFilter === lvl
                    ? lvl === 'JFT' ? 'bg-cyan-600 text-white shadow-glow' : 'bg-rose-600 text-white shadow-glow'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {lvl === 'JFT' ? '💻 JFT-Basic (250 Pts CBT)' : `JLPT ${lvl}`} ({MOCK_TEST_CATALOG.filter(t => t.language === 'JAPANESE' && t.level === lvl).length})
              </button>
            ))
          ) : (
            ['EPS', 'TOPIK2', 'TOPIK3'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevelFilter(lvl)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  selectedLevelFilter === lvl ? 'bg-emerald-600 text-white shadow-glow' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {lvl} ({MOCK_TEST_CATALOG.filter(t => t.language === 'KOREAN' && t.level === lvl).length})
              </button>
            ))
          )}
        </div>

        {/* Mock Test Cards Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredCatalog.map((test) => (
            <div
              key={test.id}
              className="group bg-slate-900/90 backdrop-blur-xl border border-slate-800 hover:border-indigo-500/60 rounded-3xl p-6 shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-xl text-xs font-black text-white bg-gradient-to-r ${test.badgeColor} shadow-md`}>
                    {test.examFormat === 'JFT_CBT' ? '💻 JFT-Basic CBT (250 Marks)' : `📄 JLPT ${test.level} Official Paper`}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{test.examFormat === 'JFT_CBT' ? '4 Sections • 60 Mins' : '2 Papers • 90 Mins'}</span>
                  </div>
                </div>

                <h3 className="text-lg font-black text-white group-hover:text-indigo-300 transition-colors">
                  {test.title}
                </h3>
                {test.japaneseTitle && (
                  <div className="text-xs font-bold font-jp text-slate-400 mt-0.5 mb-2">
                    {test.japaneseTitle}
                  </div>
                )}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {test.description}
                </p>

                {/* Section tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {test.examFormat === 'JFT_CBT' ? (
                    <>
                      <span className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-[10px] font-bold text-cyan-300">
                        💻 Prometric CBT Computer Interface
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-500/40 text-[10px] font-bold text-amber-300">
                        🎯 200 / 250 Pass Benchmark (CEFR A2)
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-bold text-emerald-300">
                        🔒 4 Section-Locked Parts
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-950/80 border border-indigo-500/40 text-[10px] font-bold text-indigo-300">
                        📄 Paper 1: Vocab + Grammar + Reading (Q1-36)
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-500/40 text-[10px] font-bold text-amber-300">
                        ☕ 15-Min Break
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-bold text-emerald-300 flex items-center gap-1">
                        <Headphones className="w-3 h-3 text-emerald-400" /> Paper 2: Listening (Q37-44)
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-[11px] text-slate-400 font-medium">
                  {test.questionCount} Questions • Official Exam Rules
                </div>
                <button
                  onClick={() => handleStartExam(test)}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-glow transition-all flex items-center gap-2 group-hover:scale-105 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Official Exam</span>
                </button>
              </div>
            </div>
          ))}
        </div>
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
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400">
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
                  Prometric CBT Interface
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
              onClick={currentPaperIndex === 0 && rawQuestions.length >= 40 && !isJFT ? handleFinishPaper1 : handleSubmitExam}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-glow transition-all cursor-pointer"
            >
              {currentPaperIndex === 0 && rawQuestions.length >= 40 && !isJFT ? 'Submit Paper 1 ➔' : 'Submit Final Exam 🏁'}
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
                      ? (examResult.passed ? '★ CEFR A2 Level • SSW Visa Eligible (200+ Pts)' : 'Below 200 Pts Benchmark')
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
                  if (reviewFilter === 'INCORRECT') return selectedAnswers[q.id] !== q.correctAnswer;
                  if (reviewFilter === 'FLAGGED') return Boolean(flaggedQuestions[q.id]);
                  return true;
                })
                .map((q, qIdx) => {
                  const userAnswer = selectedAnswers[q.id];
                  const isCorrect = userAnswer === q.correctAnswer;

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

                      {/* Audio Track Replay */}
                      {q.type === 'LISTENING' && q.audioUrl && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              stopCurrentAudio();
                              const audio = new Audio(q.audioUrl);
                              audioRef.current = audio;
                              audio.play().catch(() => {});
                            }}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer"
                          >
                            <Volume2 className="w-3.5 h-3.5" /> Replay Audio Clip
                          </button>
                        </div>
                      )}

                      {/* Options Comparison Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {q.options.map((opt, oIdx) => {
                          const isOptionSelected = userAnswer === opt;
                          const isOptionCorrect = q.correctAnswer === opt;

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
                        onClick={currentPaperIndex === 0 && rawQuestions.length >= 40 && !isJFT ? handleFinishPaper1 : handleSubmitExam}
                        className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-glow cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{currentPaperIndex === 0 && rawQuestions.length >= 40 && !isJFT ? 'Submit Paper 1 ➔' : 'Submit Exam 🏁'}</span>
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
                        Play Audio Clip
                      </button>
                    </div>
                  )}

                  <h3 className="text-base sm:text-lg font-extrabold text-slate-100 leading-relaxed font-jp whitespace-pre-line bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
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
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                            {idx + 1}
                          </span>
                          <span className="text-sm font-medium">{option}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-400" />}
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
                    onClick={currentPaperIndex === 0 && rawQuestions.length >= 40 && !isJFT ? handleFinishPaper1 : handleSubmitExam}
                    className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black transition-all flex items-center gap-2 shadow-glow cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{currentPaperIndex === 0 && rawQuestions.length >= 40 && !isJFT ? 'Submit Paper 1 ➔' : 'Submit Final Exam 🏁'}</span>
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
                    JFT CBT (50 Qs)
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
              {currentPaperIndex === 0 && rawQuestions.length >= 40 && !isJFT ? (
                <button
                  onClick={handleFinishPaper1}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-glow transition-all cursor-pointer"
                >
                  Submit Paper 1 ➔
                </button>
              ) : (
                <button
                  onClick={handleSubmitExam}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-glow transition-all cursor-pointer"
                >
                  Submit Final Exam 🏁
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
