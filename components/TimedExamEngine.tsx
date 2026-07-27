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
    mockSet: 'JFT_SET_1',
    level: 'JFT',
    language: 'JAPANESE',
    examFormat: 'JFT_CBT',
    title: 'JFT-Basic Official CBT Examination - Set 1',
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
    examFormat: 'JFT_CBT',
    title: 'JFT-Basic Official CBT Examination - Set 2',
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
    examFormat: 'JFT_CBT',
    title: 'JFT-Basic Official CBT Examination - Set 3',
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
    examFormat: 'JFT_CBT',
    title: 'JFT-Basic Official CBT Examination - Set 4',
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
    examFormat: 'JFT_CBT',
    title: 'JFT-Basic Official CBT Examination - Set 5',
    japaneseTitle: 'JFT-Basic 国際交流基金日本語基礎テスト 第5集 (48問)',
    description: 'Complete 48-question JFT-Basic CBT exam pattern (Script & Vocab 12Q, Conversation 12Q, Listening 12Q, Reading 12Q). 250 Marks Scale with 200/250 passing benchmark.',
    timeLimitMinutes: 60,
    questionCount: 48,
    sections: ['文字・語彙 (Script & Vocab)', '会話・表現 (Conversation)', '聴解 (Listening)', '読解 (Reading)'],
    audioCount: 12,
    badgeColor: 'from-cyan-600 to-blue-600',
  },
  {
    id: 'n5-mock-1',
    mockSet: 'N5_SET_1',
    level: 'N5',
    language: 'JAPANESE',
    examFormat: 'JLPT_PAPER',
    title: 'JLPT N5 Official Mock Test - Set 1',
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
    title: 'JLPT N5 Official Mock Test - Set 2',
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
    title: 'JLPT N5 Official Mock Test - Set 3',
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
    title: 'JLPT N5 Official Mock Test - Set 4',
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
    mockSet: 'N3_SET_1',
    level: 'N3',
    language: 'JAPANESE',
    examFormat: 'JLPT_PAPER',
    title: 'JLPT N3 Official Practice Examination - Volume 1',
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
  const [currentJftSectionIndex, setCurrentJftSectionIndex] = useState<number>(0);
  const [showJftSectionLockModal, setShowJftSectionLockModal] = useState<boolean>(false);
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
    jftScore?: number;
    cefrRank?: string; // Out of 250 points
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
      // 4 JFT Section Scores (~12 Qs per section, totaling 250 marks)
      const sec1 = rawQuestions.slice(0, 12);
      const sec2 = rawQuestions.slice(12, 24);
      const sec3 = rawQuestions.slice(24, 36);
      const sec4 = rawQuestions.slice(36);

      const calcJftSec = (title: string, arr: ExamQuestion[], maxPts: number) => {
        const c = arr.filter(q => selectedAnswers[q.id] === q.correctAnswer).length;
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
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-3 py-1 rounded-xl text-xs font-black text-white bg-gradient-to-r ${test.badgeColor} shadow-md`}>
                      {test.examFormat === 'JFT_CBT' ? '💻 JFT-Basic CBT (250 Marks)' : `📄 JLPT ${test.level} Official Paper`}
                    </span>
                    {test.mockSet && (
                      <span className="px-2.5 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-black">
                        {test.mockSet.replace('JFT_SET_', 'Set ').replace('N5_SET_', 'Set ').replace('N4_SET_', 'Set ').replace('EPS_SET_', 'Set ')}
                      </span>
                    )}
                  </div>
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
