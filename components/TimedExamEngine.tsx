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
}

const MOCK_TEST_CATALOG: MockTestInfo[] = [
  {
    id: 'n5-mock-1',
    mockSet: 'N5_SET_1',
    level: 'N5',
    language: 'JAPANESE',
    title: 'JLPT N5 Official Mock Test - Paper 1',
    japaneseTitle: 'JLPT N5 公式模擬試験 第1集',
    description: 'Complete JLPT N5 paper covering Kanji & Vocabulary, Grammar patterns, Reading comprehension, and Audio Listening.',
    timeLimitMinutes: 50,
    questionCount: 10,
    sections: ['文字・語彙 (Kanji & Vocab)', '文法・読解 (Grammar & Reading)', '聴解 (Audio Listening)'],
    audioCount: 2,
    badgeColor: 'from-rose-600 to-pink-600',
  },
  {
    id: 'n5-mock-2',
    mockSet: 'N5_SET_2',
    level: 'N5',
    language: 'JAPANESE',
    title: 'JLPT N5 Official Mock Test - Paper 2',
    japaneseTitle: 'JLPT N5 公式模擬試験 第2集',
    description: 'Second full N5 exam set focused on Minna no Nihongo I concepts, particles (~てもいい, ~から), and audio dialogs.',
    timeLimitMinutes: 50,
    questionCount: 10,
    sections: ['文字・語彙 (Kanji & Vocab)', '文法・読解 (Grammar & Reading)', '聴解 (Audio Listening)'],
    audioCount: 2,
    badgeColor: 'from-rose-600 to-pink-600',
  },
  {
    id: 'n4-mock-1',
    mockSet: 'N4_SET_1',
    level: 'N4',
    language: 'JAPANESE',
    title: 'JLPT N4 Standard Practice Exam - Paper 1',
    japaneseTitle: 'JLPT N4 標準模擬試験 第1集',
    description: 'Full N4 exam covering intermediate verb conjugations, passive/causative forms, and conversation listening.',
    timeLimitMinutes: 55,
    questionCount: 8,
    sections: ['文字・語彙 (Vocab)', '文法・読解 (Grammar)', '聴解 (Listening)'],
    audioCount: 1,
    badgeColor: 'from-indigo-600 to-purple-600',
  },
  {
    id: 'n3-mock-1',
    mockSet: 'ALL_N3',
    level: 'N3',
    language: 'JAPANESE',
    title: 'JLPT N3 Intermediate Mock Test - Sample Set',
    japaneseTitle: 'JLPT N3 中級模擬試験',
    description: 'N3 level grammar nuances, honorifics, complex reading, and inference questions.',
    timeLimitMinutes: 60,
    questionCount: 2,
    sections: ['言語知識 (Language Knowledge)', '読解 (Reading)'],
    audioCount: 0,
    badgeColor: 'from-amber-600 to-orange-600',
  },
  {
    id: 'n2-mock-1',
    mockSet: 'ALL_N2',
    level: 'N2',
    language: 'JAPANESE',
    title: 'JLPT N2 Advanced Mock Test - Sample Set',
    japaneseTitle: 'JLPT N2 上級模擬試験',
    description: 'N2 advanced expressions, business Japanese structures, and deep comprehension.',
    timeLimitMinutes: 65,
    questionCount: 1,
    sections: ['言語知識 (Language Knowledge)'],
    audioCount: 0,
    badgeColor: 'from-emerald-600 to-teal-600',
  },
  {
    id: 'eps-mock-1',
    mockSet: 'EPS_SET_1',
    level: 'EPS',
    language: 'KOREAN',
    title: 'EPS-TOPIK Industry & General Worker Exam',
    description: 'Standard EPS-TOPIK evaluation paper covering factory vocabulary, safety rules, and daily Korean.',
    timeLimitMinutes: 50,
    questionCount: 3,
    sections: ['어휘 (Vocabulary)', '문법 (Grammar)', '안전 수칙 (Safety)'],
    audioCount: 0,
    badgeColor: 'from-emerald-600 to-teal-600',
  },
  {
    id: 'topik2-mock-1',
    mockSet: 'TOPIK2_SET_1',
    level: 'TOPIK2',
    language: 'KOREAN',
    title: 'TOPIK I (Level 2) Official Practice Exam',
    description: 'Official TOPIK Level 2 practice exam for basic conversation and reading comprehension.',
    timeLimitMinutes: 50,
    questionCount: 1,
    sections: ['읽기 (Reading)'],
    audioCount: 0,
    badgeColor: 'from-indigo-600 to-blue-600',
  },
  {
    id: 'topik34-mock-1',
    mockSet: 'TOPIK34_SET_1',
    level: 'TOPIK3',
    language: 'KOREAN',
    title: 'TOPIK II (Level 3 & 4) Intermediate Exam',
    description: 'Advanced grammar, newspaper headlines, societal issues, and academic Korean.',
    timeLimitMinutes: 60,
    questionCount: 2,
    sections: ['읽기 (Reading)', '문形 (Grammar Patterns)'],
    audioCount: 0,
    badgeColor: 'from-purple-600 to-pink-600',
  },
];

const JAPANESE_QUESTIONS: ExamQuestion[] = [
  // ==========================================
  // JLPT N5 MOCK TEST SET 1 (模擬試験 1)
  // ==========================================
  {
    id: 'jp_n5_1_1',
    level: 'N5',
    mockSet: 'N5_SET_1',
    type: 'MULTIPLE_CHOICE',
    prompt: '【問題1 文字・語彙】下線の言葉のひらがなを選んでください: 私は毎日日本のご飯を【食べます】。',
    options: ['のみます', 'たべます', 'いきます', 'きます'],
    correctAnswer: 'たべます',
    explanation: '「食」は「た(べます)」と読みます。ご飯を食べる = Eat rice/meal.',
  },
  {
    id: 'jp_n5_1_2',
    level: 'N5',
    mockSet: 'N5_SET_1',
    type: 'MULTIPLE_CHOICE',
    prompt: '【問題2 文字・語彙】下線の漢字を選んでください: つくえのうえに【ほん】があります。',
    options: ['本', '木', '休', '体'],
    correctAnswer: '本',
    explanation: '「ほん」(Book)の漢字は「本」です。',
  },
  {
    id: 'jp_n5_1_3',
    level: 'N5',
    mockSet: 'N5_SET_1',
    type: 'MULTIPLE_CHOICE',
    prompt: '【問題3 文字・語彙】正しい意味の言葉を選んでください: きょうはとても【あつい】ですね。',
    options: ['Hot', 'Cold', 'Warm', 'Cool'],
    correctAnswer: 'Hot',
    explanation: '「あつい」(暑い/熱い)の意味は「Hot」です。',
  },
  {
    id: 'jp_n5_1_4',
    level: 'N5',
    mockSet: 'N5_SET_1',
    type: 'MULTIPLE_CHOICE',
    prompt: '【問題4 文字・語彙】適切な言葉を選んでください: 毎朝6時に【_____】。',
    options: ['おきます', 'ねます', 'のみます', 'かいます'],
    correctAnswer: 'おきます',
    explanation: '朝6時に起きる(Wake up at 6 a.m.)が文脈に合います。',
  },
  {
    id: 'jp_n5_1_5',
    level: 'N5',
    mockSet: 'N5_SET_1',
    type: 'FILL_BLANK',
    prompt: '【問題5 文法】正しい助詞を入れてください: 私はバス【_____】学校へ行きます。',
    options: ['に', 'で', 'を', 'が'],
    correctAnswer: 'で',
    explanation: '交通手段(by means of transport)を表す助詞は「で」を使います。',
  },
  {
    id: 'jp_n5_1_6',
    level: 'N5',
    mockSet: 'N5_SET_1',
    type: 'FILL_BLANK',
    prompt: '【問題6 文法】適切な助詞を入れてください: 部屋に田中さん【_____】います。',
    options: ['が', 'を', 'へ', 'で'],
    correctAnswer: 'が',
    explanation: '人や動物の存在を表す文(There is someone)の主語には「が」を使います。',
  },
  {
    id: 'jp_n5_1_7',
    level: 'N5',
    mockSet: 'N5_SET_1',
    type: 'FILL_BLANK',
    prompt: '【問題7 文法★並べ替え】文法の順番 (★に入る言葉): 昨日 映画【 ___ 】【 ___ 】【 ★ 】【 ___ 】。',
    options: ['を', '見に', '行きました', '映画館へ'],
    correctAnswer: '行きました',
    explanation: '文の正しい順番: 「昨日 映画を 映画館へ 見に 行きました。」★の位置は「行きました」。',
  },
  {
    id: 'jp_n5_1_8',
    level: 'N5',
    mockSet: 'N5_SET_1',
    type: 'MULTIPLE_CHOICE',
    prompt: '【問題8 読解】「マリアさんは毎朝7時に起きて、コーヒーを飲みます。それから8時にバスで会社へ行きます。」マリアさんは何で会社へ行きますか。',
    options: ['電車', 'バス', '自転車', '歩いて'],
    correctAnswer: 'バス',
    explanation: '文章に「8時にバスで会社へ行きます」と書いてあります。',
  },
  {
    id: 'jp_n5_1_9',
    level: 'N5',
    mockSet: 'N5_SET_1',
    type: 'LISTENING',
    prompt: '【問題9 聴解】音声を聞いて、男の人と女の人が何時に会うか選んでください。',
    audioUrl: '/audio/n5/minna_shokyu_1_001.mp3',
    options: ['10時', '10時半', '11時', '11時半'],
    correctAnswer: '10時半',
    explanation: '音声トラック「10時半に会いましょう」より、正解は10時半です。',
  },
  {
    id: 'jp_n5_1_10',
    level: 'N5',
    mockSet: 'N5_SET_1',
    type: 'LISTENING',
    prompt: '【問題10 聴解】会話を聞いて、女の人は何を注文しましたか。',
    audioUrl: '/audio/n5/minna_shokyu_1_002.mp3',
    options: ['コーヒー', 'こうちゃ', 'ジュース', 'みず'],
    correctAnswer: 'こうちゃ',
    explanation: '音声会話で「紅茶をひとつお願いします」と言っています。',
  },

  // ==========================================
  // JLPT N5 MOCK TEST SET 2 (模擬試験 2)
  // ==========================================
  {
    id: 'jp_n5_2_1',
    level: 'N5',
    mockSet: 'N5_SET_2',
    type: 'MULTIPLE_CHOICE',
    prompt: '【問題1 文字・語彙】下線の言葉のひらがなを選んでください: 田中さんは【来週】日本へ来ます。',
    options: ['らいしゅう', 'こんしゅう', 'せんしゅう', 'まいしゅう'],
    correctAnswer: 'らいしゅう',
    explanation: '「来週」の読み方は「らいしゅう」(Next week)です。',
  },
  {
    id: 'jp_n5_2_2',
    level: 'N5',
    mockSet: 'N5_SET_2',
    type: 'MULTIPLE_CHOICE',
    prompt: '【問題2 文字・語彙】下線の漢字を選んでください: 昨日は【あめ】がふりました。',
    options: ['雨', '天', '雪', '水'],
    correctAnswer: '雨',
    explanation: '「あめ」(Rain)の漢字は「雨」です。',
  },
  {
    id: 'jp_n5_2_3',
    level: 'N5',
    mockSet: 'N5_SET_2',
    type: 'MULTIPLE_CHOICE',
    prompt: '【問題3 文字・語彙】反対の言葉を選んでください: 「たかい (高い)」の対義語は何ですか。',
    options: ['ひくい', 'みじかい', 'ちいさい', 'おそい'],
    correctAnswer: 'ひくい',
    explanation: '「高い」(High/Expensive)の対義語は「低い」(Low)です。',
  },
  {
    id: 'jp_n5_2_4',
    level: 'N5',
    mockSet: 'N5_SET_2',
    type: 'MULTIPLE_CHOICE',
    prompt: '【問題4 文字・語彙】適切な言葉を選んでください: デパートで新しい服を【_____】。',
    options: ['かいました', 'ききました', 'あいました', 'いいました'],
    correctAnswer: 'かいました',
    explanation: '服を買う (Bought new clothes at the department store).',
  },
  {
    id: 'jp_n5_2_5',
    level: 'N5',
    mockSet: 'N5_SET_2',
    type: 'FILL_BLANK',
    prompt: '【問題5 文法】正しい助詞を入れてください: 日曜日に友達【_____】映画を見に行きます。',
    options: ['と', 'に', 'へ', 'を'],
    correctAnswer: 'と',
    explanation: '「〜と一緒に」(Together with)を表す助詞は「と」です。',
  },
  {
    id: 'jp_n5_2_6',
    level: 'N5',
    mockSet: 'N5_SET_2',
    type: 'FILL_BLANK',
    prompt: '【問題6 文法】文法: ここで写真を【_____】もいいですか。 (Permission ~てもいい)',
    options: ['とっ', 'とる', 'とり', 'とって'],
    correctAnswer: 'とって',
    explanation: '動詞て形 ＋ もいいですか (May I take photos here?). 「撮って」が正解です。',
  },
  {
    id: 'jp_n5_2_7',
    level: 'N5',
    mockSet: 'N5_SET_2',
    type: 'FILL_BLANK',
    prompt: '【問題7 文法】文法: 会議は9時【_____】12時まで行われます。',
    options: ['から', 'まで', 'に', 'で'],
    correctAnswer: 'から',
    explanation: '時間の起点(From 9 o\'clock)を表す助詞は「から」です。',
  },
  {
    id: 'jp_n5_2_8',
    level: 'N5',
    mockSet: 'N5_SET_2',
    type: 'MULTIPLE_CHOICE',
    prompt: '【問題8 読解】「山田さんは日本語の先生です。月曜日から金曜日まで大学で教えます。土曜日と日曜日は休みです。」山田さんはいつ休みですか。',
    options: ['月曜日', '金曜日', '土曜日と日曜日', '毎日'],
    correctAnswer: '土曜日と日曜日',
    explanation: '文章に「土曜日と日曜日は休みです」と書かれています。',
  },
  {
    id: 'jp_n5_2_9',
    level: 'N5',
    mockSet: 'N5_SET_2',
    type: 'LISTENING',
    prompt: '【問題9 聴解】音声を聞いて、明日の天気はどうなりますか。',
    audioUrl: '/audio/n5/minna_shokyu_1_004.mp3',
    options: ['はれ', 'あめ', 'くもり', 'ゆき'],
    correctAnswer: 'あめ',
    explanation: '音声会話の天気予報「明日は雨が降るでしょう」より正解は「あめ」です。',
  },
  {
    id: 'jp_n5_2_10',
    level: 'N5',
    mockSet: 'N5_SET_2',
    type: 'LISTENING',
    prompt: '【問題10 聴解】会話を聞いて、男の人は何で学校へ行きますか。',
    audioUrl: '/audio/n5/minna_shokyu_1_005.mp3',
    options: ['でんしゃ', 'バス', 'じてんしゃ', 'あるいて'],
    correctAnswer: 'じてんしゃ',
    explanation: '会話の「自転車で通っています」より正解は「じてんしゃ」です。',
  },

  // ==========================================
  // JLPT N4 QUESTION SET (模擬試験 N4)
  // ==========================================
  {
    id: 'jp_n4_1_1',
    level: 'N4',
    mockSet: 'N4_SET_1',
    type: 'MULTIPLE_CHOICE',
    prompt: '【問題1 文字・語彙】下線の言葉の読み方を選んでください: 旅行の【準備】をします。',
    options: ['じゅんび', 'しょんび', 'じゅうび', 'ちゅんび'],
    correctAnswer: 'じゅんび',
    explanation: '「準備」の読み方は「じゅんび」(Preparation)です。',
  },
  {
    id: 'jp_n4_1_2',
    level: 'N4',
    mockSet: 'N4_SET_1',
    type: 'MULTIPLE_CHOICE',
    prompt: '【問題2 文字・語彙】下線の漢字を選んでください: 部屋を【かたづけます】。',
    options: ['片付けます', '形付けます', '方付けます', '向付けます'],
    correctAnswer: '片付けます',
    explanation: '「かたづける」(Tidy up)の漢字は「片付ける」です。',
  },
  {
    id: 'jp_n4_1_3',
    level: 'N4',
    mockSet: 'N4_SET_1',
    type: 'MULTIPLE_CHOICE',
    prompt: '【問題3 文字・語彙】反対の意味の言葉を選んでください: 「複雑(ふくざつ)」の対義語',
    options: ['簡単', '親切', '便利', '賑やか'],
    correctAnswer: '簡単',
    explanation: '「複雑」(Complex)の反対語は「簡単」(Simple)です。',
  },
  {
    id: 'jp_n4_1_4',
    level: 'N4',
    mockSet: 'N4_SET_1',
    type: 'FILL_BLANK',
    prompt: '【問題4 文法】適切な文法を選んでください: 雨が_____そうだから、傘を持っていきましょう。',
    options: ['ふり', 'ふって', 'ふった', 'ふりそう'],
    correctAnswer: 'ふり',
    explanation: '動詞のます形語幹 ＋ そう (It looks like it will rain).',
  },
  {
    id: 'jp_n4_1_5',
    level: 'N4',
    mockSet: 'N4_SET_1',
    type: 'FILL_BLANK',
    prompt: '【問題5 文法】文法: 日本語を勉強したい_____、いい先生を紹介していただけませんか。',
    options: ['んですが', 'のに', 'ので', 'から'],
    correctAnswer: 'んですが',
    explanation: '依頼の前提を述べる「〜んですが」が最も適切です。',
  },
  {
    id: 'jp_n4_1_6',
    level: 'N4',
    mockSet: 'N4_SET_1',
    type: 'FILL_BLANK',
    prompt: '【問題6 文法】文法: どんなに難しくても、最後まであきらめる_____。',
    options: ['わけにはいかない', 'はずがない', 'わけがない', 'に違いない'],
    correctAnswer: 'わけにはいかない',
    explanation: '「〜わけにはいかない」 = Cannot afford to / Must not.',
  },
  {
    id: 'jp_n4_1_7',
    level: 'N4',
    mockSet: 'N4_SET_1',
    type: 'MULTIPLE_CHOICE',
    prompt: '【問題7 読解】「日本では、ゴミを捨てる時に分別しなければなりません。燃えるゴミ、燃えないゴミ、ペットボトルなどを分けて出します。」ゴミを捨てる時どうしますか。',
    options: ['一緒に捨てる', '分別して捨てる', '夜に捨てる', '海に捨てる'],
    correctAnswer: '分別して捨てる',
    explanation: '文章に「分別しなければなりません」と書かれています。',
  },
  {
    id: 'jp_n4_1_8',
    level: 'N4',
    mockSet: 'N4_SET_1',
    type: 'LISTENING',
    prompt: '【問題8 聴解】会話を聞いて、男の人は明日の朝何時に出発しますか。',
    audioUrl: '/audio/n5/minna_shokyu_1_003.mp3',
    options: ['6時半', '7時', '7時半', '8時'],
    correctAnswer: '7時半',
    explanation: '会話の「7時半に駅で待ち合わせましょう」より正解は7時半です。',
  },

  // ==========================================
  // JLPT N3 & N2 SAMPLE EXAM QUESTIONS
  // ==========================================
  {
    id: 'jp_n3_1',
    level: 'N3',
    type: 'MULTIPLE_CHOICE',
    prompt: '「環境問題について_____。」に続く最も適切な表現を選びなさい。',
    options: ['議論するべきだ', '食べるべきだ', '走るべきだ', '寝るべきだ'],
    correctAnswer: '議論するべきだ',
    explanation: '環境問題(Environmental problems)について議論する(discuss)べきです。',
  },
  {
    id: 'jp_n3_2',
    level: 'N3',
    type: 'FILL_BLANK',
    prompt: '彼が犯人に_____。証拠が揃っている。',
    options: ['違いない', 'かもしれない', 'はずがない', 'わけがない'],
    correctAnswer: '違いない',
    explanation: '「〜に違いない」 = Must be ~ without doubt.',
  },
  {
    id: 'jp_n2_1',
    level: 'N2',
    type: 'FILL_BLANK',
    prompt: 'どんなに困難であっても、最後まであきらめる____。',
    options: ['べきではない', 'わけにはいかない', 'にほかならない', 'にすぎない'],
    correctAnswer: 'わけにはいかない',
    explanation: '「あきらめるわけにはいかない」 = Cannot afford to give up.',
  },
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

export const TimedExamEngine: React.FC<TimedExamEngineProps> = ({
  activeLanguage = 'JAPANESE',
  onCompleteExam,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Flow State: 'LOBBY' (show catalog) vs 'EXAM_IN_PROGRESS'
  const [isExamActive, setIsExamActive] = useState(false);
  const [selectedMockTest, setSelectedMockTest] = useState<MockTestInfo | null>(null);

  // Exit confirmation modal state
  const [showExitConfirmModal, setShowExitConfirmModal] = useState(false);

  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('ALL');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(50 * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [audioPlaysCount, setAudioPlaysCount] = useState<Record<string, number>>({});

  // Exam Results state
  const [examResult, setExamResult] = useState<{
    score: number;
    correctCount: number;
    totalQuestions: number;
    passed: boolean;
    timeSpentSeconds: number;
  } | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'ALL' | 'INCORRECT' | 'FLAGGED'>('ALL');

  const allQuestions = activeLanguage === 'JAPANESE' ? JAPANESE_QUESTIONS : KOREAN_QUESTIONS;

  const questions = selectedMockTest
    ? allQuestions.filter((q) => q.mockSet === selectedMockTest.mockSet || (selectedMockTest.mockSet.startsWith('ALL_') && q.level === selectedMockTest.level))
    : allQuestions;

  const filteredCatalog = MOCK_TEST_CATALOG.filter((test) => {
    if (test.language !== activeLanguage) return false;
    if (selectedLevelFilter !== 'ALL' && test.level !== selectedLevelFilter) return false;
    return true;
  });

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
    setSelectedMockTest(test);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setSecondsRemaining((test.timeLimitMinutes || 50) * 60);
    setIsSubmitted(false);
    setExamResult(null);
    setAudioPlaysCount({});
    setReviewFilter('ALL');
    setShowExitConfirmModal(false);
    setIsExamActive(true);

    // Launch Full Screen Mode automatically like real JLPT exam
    if (containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen().catch(() => {});
    }
    setIsFullscreen(true);
  };

  const handleBackButtonClick = () => {
    if (isExamActive && !isSubmitted) {
      setShowExitConfirmModal(true);
    } else {
      handleExitExam();
    }
  };

  const handleExitExam = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setIsFullscreen(false);
    setIsExamActive(false);
    setSelectedMockTest(null);
    setIsSubmitted(false);
    setExamResult(null);
    setShowExitConfirmModal(false);
  };

  // Prevent accidental tab refresh / browser navigation during an active unsubmitted exam
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
    setIsExamActive(false);
    setSelectedMockTest(null);
    setSelectedLevelFilter('ALL');
    setIsSubmitted(false);
    setExamResult(null);
    setShowExitConfirmModal(false);
  }, [activeLanguage]);

  useEffect(() => {
    if (!isExamActive || isSubmitted) return;
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamActive, isSubmitted]);

  const currentQ = questions[currentIndex] || questions[0];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (option: string) => {
    if (isSubmitted || !currentQ) return;
    setSelectedAnswers({ ...selectedAnswers, [currentQ.id]: option });
  };

  const toggleFlag = (qId: string) => {
    setFlaggedQuestions({ ...flaggedQuestions, [qId]: !flaggedQuestions[qId] });
  };

  const playAudioPrompt = () => {
    if (!currentQ) return;
    const currentPlays = audioPlaysCount[currentQ.id] || 0;
    if (currentPlays >= 2) {
      alert('Rule: Audio can only be replayed a maximum of 2 times in official JLPT exams.');
      return;
    }
    setAudioPlaysCount({ ...audioPlaysCount, [currentQ.id]: currentPlays + 1 });

    if (currentQ.audioUrl) {
      const audio = new Audio(currentQ.audioUrl);
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
    setIsSubmitted(true);
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);
    const passed = score >= 70;
    const timeSpentSeconds = ((selectedMockTest?.timeLimitMinutes || 50) * 60) - secondsRemaining;

    setExamResult({
      score,
      correctCount,
      totalQuestions: questions.length,
      passed,
      timeSpentSeconds: Math.max(1, timeSpentSeconds),
    });

    const check = validateExamSubmission(questions.length, timeSpentSeconds, score);
    if (!check.valid) {
      console.warn('[AntiCheat]', check.reason);
    }

    if (onCompleteExam) {
      onCompleteExam({ score, passed, timeSpentSeconds });
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
              <span>Official Exam Simulator & Practice Hall</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {activeLanguage === 'JAPANESE' ? 'JLPT N5 / N4 / N3 / N2 Mock Test Center' : 'EPS-TOPIK & TOPIK I / II Mock Test Center'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select a mock test below to launch in full-screen interactive exam mode with timed timer and scoring.
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
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              selectedLevelFilter === 'ALL' ? 'bg-indigo-600 text-white shadow-glow' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Levels ({MOCK_TEST_CATALOG.filter(t => t.language === activeLanguage).length})
          </button>
          {activeLanguage === 'JAPANESE' ? (
            ['N5', 'N4', 'N3', 'N2'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevelFilter(lvl)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  selectedLevelFilter === lvl ? 'bg-rose-600 text-white shadow-glow' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                JLPT {lvl} ({MOCK_TEST_CATALOG.filter(t => t.language === 'JAPANESE' && t.level === lvl).length})
              </button>
            ))
          ) : (
            ['EPS', 'TOPIK2', 'TOPIK3'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevelFilter(lvl)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
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
                    {test.level} Official Paper
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{test.timeLimitMinutes} Mins</span>
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
                  {test.sections.map((sec, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-semibold text-slate-300">
                      {sec}
                    </span>
                  ))}
                  {test.audioCount > 0 && (
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-bold text-emerald-300 flex items-center gap-1">
                      <Headphones className="w-3 h-3 text-emerald-400" /> {test.audioCount} Audio Tracks
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-[11px] text-slate-400 font-medium">
                  {test.questionCount} Questions • Passing 70%
                </div>
                <button
                  onClick={() => handleStartExam(test)}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-glow transition-all flex items-center gap-2 group-hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Full-Screen Exam</span>
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
          ? 'fixed inset-0 z-50 overflow-y-auto bg-slate-950 p-4 sm:p-8 space-y-4'
          : 'max-w-5xl mx-auto space-y-4 sm:space-y-6'
      }`}
    >
      {/* Exit Confirmation Modal Prompt */}
      {showExitConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Exit Exam Session?</h3>
                <p className="text-xs text-amber-300 font-medium">An official timed exam is currently in progress.</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
              Leaving now will interrupt your session for <span className="font-bold text-white">{selectedMockTest?.title}</span>. Would you like to submit your exam for scoring or exit without submitting?
            </p>

            <div className="space-y-2.5 pt-1">
              <button
                onClick={() => {
                  setShowExitConfirmModal(false);
                  handleSubmitExam();
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-glow transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Exam & View Marks</span>
              </button>

              <button
                onClick={() => {
                  setShowExitConfirmModal(false);
                  handleExitExam();
                }}
                className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-300 font-bold text-xs transition-all flex items-center justify-center gap-2 border border-slate-700"
              >
                <X className="w-4 h-4" />
                <span>Exit Without Submitting</span>
              </button>

              <button
                onClick={() => setShowExitConfirmModal(false)}
                className="w-full py-2 rounded-xl text-slate-400 hover:text-white font-bold text-xs transition-colors"
              >
                ▶ Continue Exam Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackButtonClick}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700"
            title="Exit or Submit Exam"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span>{selectedMockTest?.level} Official Timed Examination</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
              {selectedMockTest?.title || 'JLPT Mock Examination'}
            </h2>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
          {/* Full Screen Mode Toggle Button */}
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all"
            title={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen Exam Mode'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 text-amber-400" /> : <Maximize2 className="w-4 h-4 text-indigo-400" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit Full Screen' : 'Full Screen'}</span>
          </button>

          {/* Timer Display */}
          <div
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border transition-all ${
              secondsRemaining < 300
                ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-slate-950 border-slate-800 text-amber-400'
            }`}
          >
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            <span className="text-lg sm:text-xl font-black font-mono tracking-wider">{formatTime(secondsRemaining)}</span>
          </div>

          {!isSubmitted && (
            <button
              onClick={handleSubmitExam}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-glow transition-all"
            >
              Submit Exam
            </button>
          )}
        </div>
      </div>

      {/* POST-SUBMISSION MARKS & REVIEW SCREEN */}
      {isSubmitted && examResult && (
        <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Marks Summary Hero Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-5">
              <div
                className={`w-24 h-24 rounded-3xl flex flex-col items-center justify-center font-black text-white shadow-2xl ${
                  examResult.passed ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-emerald-900/40' : 'bg-gradient-to-tr from-rose-600 to-pink-600 shadow-rose-900/40'
                }`}
              >
                <span className="text-3xl">{examResult.score}%</span>
                <span className="text-[10px] uppercase font-bold tracking-wider">{examResult.passed ? 'PASSED' : 'FAILED'}</span>
              </div>

              <div className="space-y-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Official Exam Scorecard</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      examResult.passed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {examResult.passed ? '★ JLPT Certificate Eligible' : 'Retake Practice Advised'}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white">
                  {selectedMockTest?.title || 'JLPT Mock Examination'}
                </h3>
                <p className="text-xs text-slate-400">
                  Time Spent: <span className="font-bold text-white">{Math.floor(examResult.timeSpentSeconds / 60)}m {examResult.timeSpentSeconds % 60}s</span> • Marks: <span className="font-bold text-white">{examResult.correctCount} / {examResult.totalQuestions}</span> Correct ({examResult.score}%)
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setExamResult(null);
                  setSelectedAnswers({});
                  setFlaggedQuestions({});
                  setSecondsRemaining((selectedMockTest?.timeLimitMinutes || 50) * 60);
                  setCurrentIndex(0);
                }}
                className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all flex items-center gap-2 border border-slate-700 shadow"
              >
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>Retake Exam</span>
              </button>

              <button
                onClick={handleExitExam}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-glow transition-all flex items-center gap-2"
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
                <span>Detailed Question Review & Explanation Solutions ({questions.length} Questions)</span>
              </h4>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setReviewFilter('ALL')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    reviewFilter === 'ALL' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All ({questions.length})
                </button>
                <button
                  onClick={() => setReviewFilter('INCORRECT')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    reviewFilter === 'INCORRECT' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Incorrect ({questions.filter((q) => selectedAnswers[q.id] !== q.correctAnswer).length})
                </button>
                <button
                  onClick={() => setReviewFilter('FLAGGED')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    reviewFilter === 'FLAGGED' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Flagged ({Object.keys(flaggedQuestions).filter((k) => flaggedQuestions[k]).length})
                </button>
              </div>
            </div>

            {/* Questions Detailed List */}
            <div className="space-y-4">
              {questions
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
                              const audio = new Audio(q.audioUrl);
                              audio.play().catch(() => {});
                            }}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow"
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {currentQ ? (
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between min-h-[420px]">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
                      Question {currentIndex + 1} of {questions.length}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-amber-400 text-[10px] font-bold">
                      {currentQ.level}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleFlag(currentQ.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                      flaggedQuestions[currentQ.id]
                        ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>{flaggedQuestions[currentQ.id] ? 'Flagged' : 'Flag for Review'}</span>
                  </button>
                </div>

                <div className="mb-6">
                  {currentQ.type === 'LISTENING' && (
                    <div className="mb-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
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
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                      >
                        Play Audio Clip
                      </button>
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-slate-100 leading-relaxed">{currentQ.prompt}</h3>
                </div>

                <div className="space-y-3">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedAnswers[currentQ.id] === option;

                    let optionStyle = 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-slate-700';
                    if (isSelected) {
                      optionStyle = 'bg-indigo-950/80 border-indigo-500 text-indigo-200 shadow-glow font-bold';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectAnswer(option)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${optionStyle}`}
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

              <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800">
                <button
                  onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 rounded-xl bg-slate-800 disabled:opacity-40 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                <button
                  onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
                  disabled={currentIndex === questions.length - 1}
                  className="px-4 py-2 rounded-xl bg-slate-800 disabled:opacity-40 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-8 text-center text-slate-400">
              No questions available for this selection.
            </div>
          )}

          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Question Navigator Grid
              </h4>

              <div className="grid grid-cols-4 gap-2.5 mb-6">
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
                      className={`relative h-12 rounded-xl border text-xs flex items-center justify-center transition-all ${gridStyle}`}
                    >
                      <span>{idx + 1}</span>
                      {isFlagged && <Flag className="absolute top-1 right-1 w-3 h-3 text-amber-400" />}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-2 text-xs text-slate-400 border-t border-slate-800 pt-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-emerald-950 border border-emerald-500" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-amber-950 border border-amber-500" />
                  <span>Flagged for Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-slate-950 border border-slate-800" />
                  <span>Unanswered</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center">
              <div className="text-xs text-slate-400 font-medium">Answered Progress</div>
              <div className="text-xl font-bold text-white mt-0.5">
                {Object.keys(selectedAnswers).length} / {questions.length} Questions
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
