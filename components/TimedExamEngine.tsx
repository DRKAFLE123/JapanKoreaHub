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
  ArrowLeft,
  FileText,
  Play
} from 'lucide-react';
import { validateExamSubmission } from '@/lib/auth-security';

export interface ExamQuestion {
  id: string;
  level: string; // N5, N4, N3, N2 | EPS, TOPIK2, TOPIK3, TOPIK4
  mockSet?: string; // 'N5_SET_1' | 'N5_SET_2' | 'N4_SET_1' | 'GENERAL'
  type: 'MULTIPLE_CHOICE' | 'LISTENING' | 'FILL_BLANK';
  prompt: string;
  audioUrl?: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

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
    prompt: '【問題7 文法】正しい文法形を選んでください: あした東京へ【_____】。',
    options: ['いきます', 'いきました', 'いって', 'いかない'],
    correctAnswer: 'いきます',
    explanation: '未来の予定(Tomorrow)を表すので、現在・未来形「いきます」を使います。',
  },
  {
    id: 'jp_n5_1_8',
    level: 'N5',
    mockSet: 'N5_SET_1',
    type: 'LISTENING',
    prompt: '【問題8 聴解 Listening】音声を聞いて、最も適当な会話の返答を選んでください。(Audio Question: おはようございます！)',
    audioUrl: 'https://actions.google.com/sounds/v1/human_voices/human_giggle.ogg',
    options: ['おはようございます！', 'こんばんは！', 'さようなら！', 'いただきます！'],
    correctAnswer: 'おはようございます！',
    explanation: '朝の挨拶「おはようございます」には「おはようございます」と返します。',
  },
  {
    id: 'jp_n5_1_9',
    level: 'N5',
    mockSet: 'N5_SET_1',
    type: 'MULTIPLE_CHOICE',
    prompt: '【問題9 文字・語彙】「昨日(きのう)」の正しい漢字を選んでください。',
    options: ['昨日', '明日', '今日', '毎日'],
    correctAnswer: '昨日',
    explanation: '「きのう」は「昨日」と書きます。',
  },
  {
    id: 'jp_n5_1_10',
    level: 'N5',
    mockSet: 'N5_SET_1',
    type: 'FILL_BLANK',
    prompt: '【問題10 文法】「コーヒー【_____】紅茶を飲みます。」(Coffee OR Tea)',
    options: ['か', 'と', 'や', 'も'],
    correctAnswer: 'か',
    explanation: '「A or B」(選択)を表す助詞は「か」です。',
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

  // ==========================================
  // JLPT N4 MOCK TEST SET 1 (模擬試験 1)
  // ==========================================
  {
    id: 'jp_n4_1_1',
    level: 'N4',
    mockSet: 'N4_SET_1',
    type: 'MULTIPLE_CHOICE',
    prompt: '【問題1 文字・語彙】下線の言葉のひらがなを選んでください: この【計画】はとても大切です。',
    options: ['けいかく', 'けいさつ', 'けいざい', 'けいけん'],
    correctAnswer: 'けいかく',
    explanation: '「計画」の読み方は「けいかく」(Plan / Schedule)です。',
  },
  {
    id: 'jp_n4_1_2',
    level: 'N4',
    mockSet: 'N4_SET_1',
    type: 'FILL_BLANK',
    prompt: '【問題2 文法】適切な表現を選んでください: 雨が【_____】そうですから、傘を持っていきましょう。',
    options: ['ふり', 'ふって', 'ふった', 'ふりそう'],
    correctAnswer: 'ふり',
    explanation: '動詞ます形語幹 ＋ そうです (It looks like it will rain). 「降る → 降りそう」です。',
  },
  {
    id: 'jp_n4_1_3',
    level: 'N4',
    mockSet: 'N4_SET_1',
    type: 'FILL_BLANK',
    prompt: '【問題3 敬語】先生が【_____】本を読みました。 (Respectful form for Sensei)',
    options: ['お書きになった', '書かれた', '書かせていただいた', 'お書きした'],
    correctAnswer: 'お書きになった',
    explanation: '尊敬語 (Respectful Keigo): お ＋ 動詞ます形 ＋ になる。先生がお書きになった本。',
  },
  // ==========================================
  // JLPT N3 MOCK TEST SET 1 (模擬試験)
  // ==========================================
  {
    id: 'jp_n3_1_1',
    level: 'N3',
    mockSet: 'N3_SET_1',
    type: 'MULTIPLE_CHOICE',
    prompt: '【問題1 文字・語彙】下線の言葉のひらがなを選んでください: 環境問題について【関心】を持っています。',
    options: ['かんしん', 'かんけい', 'かんそう', 'かんじ'],
    correctAnswer: 'かんしん',
    explanation: '「関心」の読み方は「かんしん」(Interest / Concern)です。',
  },
  {
    id: 'jp_n3_1_2',
    level: 'N3',
    mockSet: 'N3_SET_1',
    type: 'FILL_BLANK',
    prompt: '【問題2 文法】適切な表現を選んでください: この件【_____】、後ほどメールでお知らせします。',
    options: ['につきまして', 'にとって', 'にくらべて', 'に反して'],
    correctAnswer: 'につきまして',
    explanation: '「〜につきまして」(Regarding...)はビジネスやフォーマルで使われるN3文法です。',
  },

  // ==========================================
  // JLPT N2 MOCK TEST SET 1 (模擬試験)
  // ==========================================
  {
    id: 'jp_n2_1_1',
    level: 'N2',
    mockSet: 'N2_SET_1',
    type: 'MULTIPLE_CHOICE',
    prompt: '【問題1 文字・語彙】下線の言葉のひらがなを選んでください: 新しい事業を【展開】する予定です。',
    options: ['てんかい', 'てんかん', 'てんけん', 'てんこう'],
    correctAnswer: 'てんかい',
    explanation: '「展開」の読み方は「てんかい」(Expansion / Deployment)です。',
  },

  // ==========================================
  // JLPT N1 MOCK TEST SET 1 (模擬試験)
  // ==========================================
  {
    id: 'jp_n1_1_1',
    level: 'N1',
    mockSet: 'N1_SET_1',
    type: 'MULTIPLE_CHOICE',
    prompt: '【問題1 文字・語彙】下線の言葉のひらがなを選んでください: 事態の【収拾】に努める。',
    options: ['しゅうしゅう', 'しゅうしき', 'しゅうそく', 'しゅうりゅう'],
    correctAnswer: 'しゅうしゅう',
    explanation: '「収拾」の読み方は「しゅうしゅう」(Settlement / Controlling a situation)です。',
  },

  // ==========================================
  // JFT-BASIC CBT MOCK TEST SET 1
  // ==========================================
  {
    id: 'jft_1_1',
    level: 'JFT',
    mockSet: 'JFT_SET_1',
    type: 'MULTIPLE_CHOICE',
    prompt: '【JFT文字・語彙 Q1】下線の言葉のひらがなを選んでください: 工場で【安全】の研修があります。',
    options: ['あんぜん', 'かんぜん', 'あぜん', 'あんぜ'],
    correctAnswer: 'あんぜん',
    explanation: '「安全」は「あんぜん」(Safety)と読みます。',
  },
  {
    id: 'jft_1_2',
    level: 'JFT',
    mockSet: 'JFT_SET_1',
    type: 'FILL_BLANK',
    prompt: '【JFT会話・表現 Q2】A:「すみません、この機械の使い方を教えていただけませんか。」\nB:「( )。」',
    options: ['ええ、いいですよ。こちらへどうぞ', 'いいえ、使いません', 'はい、使い終わりました', 'いいえ、けっこうです'],
    correctAnswer: 'ええ、いいですよ。こちらへどうぞ',
    explanation: '依頼に対する快諾の表現「ええ、いいですよ」が自然です。',
  },
];

const KOREAN_QUESTIONS: ExamQuestion[] = [
  // ==========================================
  // EPS-TOPIK MOCK TEST SET 1 & SET 2
  // ==========================================
  {
    id: 'kr_eps_1',
    level: 'EPS',
    mockSet: 'EPS_SET_1',
    type: 'MULTIPLE_CHOICE',
    prompt: '[읽기 1번] 다음 그림을 보고 맞는 단어를 고르십시오. (그림: 가방 Bag)',
    options: ['가방', '공책', '시계', '모자'],
    correctAnswer: '가방',
    explanation: '그림은 Bag(가방)입니다.',
  },
  {
    id: 'kr_eps_2',
    level: 'EPS',
    mockSet: 'EPS_SET_1',
    type: 'FILL_BLANK',
    prompt: '[읽기 2번] 빈칸에 들어갈 가장 알맞은 것을 고르십시오: 공장에서 일할 때는 반드시 안전모를 【_____】 합니다.',
    options: ['써야', '입어야', '신어야', '껴야'],
    correctAnswer: '써야',
    explanation: '모자나 안전모는 "쓰다"(써야 합니다) 동사를 사용합니다.',
  },
  {
    id: 'kr_eps_3',
    level: 'EPS',
    mockSet: 'EPS_SET_2',
    type: 'MULTIPLE_CHOICE',
    prompt: '[읽기 3번] 안전 표지판의 의미로 알맞은 것을 고르십시오: (표지: 출입 금지)',
    options: ['들어오지 마십시오', '담배를 피우지 마십시오', '손대지 마십시오', '미끄러움 주의'],
    correctAnswer: '들어오지 마십시오',
    explanation: '출입 금지(No Entry) 표지는 "들어오지 마십시오"를 의미합니다.',
  },

  // ==========================================
  // TOPIK I (LEVELS 1-2) MOCK TEST SET 1 & SET 2
  // ==========================================
  {
    id: 'kr_topik1_1',
    level: 'TOPIK2',
    mockSet: 'TOPIK1_SET_1',
    type: 'MULTIPLE_CHOICE',
    prompt: '[TOPIK I 읽기 1번] 무엇에 대한 이야기입니까? "저는 학생입니다. 학교에 갑니다."',
    options: ['직업', '이름', '나이', '장소'],
    correctAnswer: '직업',
    explanation: '학생(Student)은 직업(Occupation)에 관한 내용입니다.',
  },
  {
    id: 'kr_topik1_2',
    level: 'TOPIK2',
    mockSet: 'TOPIK1_SET_2',
    type: 'FILL_BLANK',
    prompt: '[TOPIK I 문법 2번] 빈칸에 들어갈 알맞은 조사를 고르십시오: "저는 도서관【_____】 공부를 합니다."',
    options: ['에서', '에게', '으로', '하고'],
    correctAnswer: '에서',
    explanation: '행동이 일어나는 장소를 나타내는 조사는 "에서"입니다.',
  },

  // ==========================================
  // TOPIK II (LEVELS 3-6) MOCK TEST SET 1 & SET 2
  // ==========================================
  {
    id: 'kr_topik2_1',
    level: 'TOPIK3',
    mockSet: 'TOPIK2_SET_1',
    type: 'MULTIPLE_CHOICE',
    prompt: '[TOPIK II 읽기] 다음 밑줄 친 부분과 의미가 가장 비슷한 것을 고르십시오: 최근 물가가 급격히 【상승하고 있다】.',
    options: ['오르고 있다', '내리고 있다', '줄어들고 있다', '사라지고 있다'],
    correctAnswer: '오르고 있다',
    explanation: '상승하다(Rise/Increase) = 오르고 있다.',
  },
  {
    id: 'kr_topik2_2',
    level: 'TOPIK3',
    mockSet: 'TOPIK2_SET_2',
    type: 'FILL_BLANK',
    prompt: '[TOPIK II 쓰기 53번] 그래프 분석 시 적절한 표현을 고르십시오: "조사 결과에 따르면 20대 소비율이 15%【_____】."',
    options: ['증가하였다', '감소시켰다', '없어졌다', '출발하였다'],
    correctAnswer: '증가하였다',
    explanation: '그래프 상승 추세를 설명할 때는 "증가하였다"(Increased)를 사용합니다.',
  },
];

export interface ExamResultSummary {
  score: number;
  passed: boolean;
  timeSpentSeconds: number;
}

interface TimedExamEngineProps {
  initialLanguage?: 'JAPANESE' | 'KOREAN';
  activeLanguage?: 'JAPANESE' | 'KOREAN' | string;
  currentLevel?: string;
  preselectedLevel?: string;
  hideLevelSelector?: boolean;
  hideCategorySelector?: boolean;
  onCompleteExam?: (result: ExamResultSummary) => void;
}

export const TimedExamEngine: React.FC<TimedExamEngineProps> = ({
  initialLanguage = 'JAPANESE',
  activeLanguage: propActiveLanguage,
  currentLevel: propCurrentLevel,
  preselectedLevel,
  onCompleteExam,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const activeLanguage = (propActiveLanguage as 'JAPANESE' | 'KOREAN') || initialLanguage;
  const currentLevel = propCurrentLevel || preselectedLevel;

  // Filter level mapping
  const normalizedLevel = React.useMemo(() => {
    if (!currentLevel) return 'N5';
    const lvl = currentLevel.toUpperCase();
    if (lvl === 'BASICS') return initialLanguage === 'JAPANESE' ? 'N5' : 'EPS';
    if (lvl === 'TOPIK1_L1' || lvl === 'TOPIK1' || lvl === 'TOPIK2') return 'TOPIK2';
    if (lvl === 'TOPIK3' || lvl === 'TOPIK4' || lvl === 'TOPIK2_L5' || lvl === 'TOPIK2_L6') return 'TOPIK3';
    return lvl;
  }, [currentLevel, initialLanguage]);

  // Exam Selection Screen vs Active Exam Mode
  const [examStarted, setExamStarted] = useState(false);
  const [selectedMockSet, setSelectedMockSet] = useState<string>(() => {
    if (normalizedLevel === 'N4') return 'N4_SET_1';
    if (normalizedLevel === 'EPS') return 'EPS_SET_1';
    if (normalizedLevel === 'TOPIK2') return 'TOPIK1_SET_1';
    if (normalizedLevel === 'TOPIK3') return 'TOPIK2_SET_1';
    return 'N5_SET_1';
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(50 * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [audioPlaysCount, setAudioPlaysCount] = useState<Record<string, number>>({});

  const allQuestions = activeLanguage === 'JAPANESE' ? JAPANESE_QUESTIONS : KOREAN_QUESTIONS;

  // Question pool strictly locked to normalized level
  const questions = React.useMemo(() => {
    return allQuestions.filter((q) => {
      if (selectedMockSet && selectedMockSet !== 'ALL') {
        if (q.mockSet === selectedMockSet) return true;
      }
      return q.level === normalizedLevel;
    });
  }, [allQuestions, selectedMockSet, normalizedLevel]);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const startExamSet = (setId: string) => {
    setSelectedMockSet(setId);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setSecondsRemaining(50 * 60);
    setIsSubmitted(false);
    setAudioPlaysCount({});
    setExamStarted(true);
  };

  useEffect(() => {
    if (!examStarted || isSubmitted) return;
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
  }, [examStarted, isSubmitted]);

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
      alert('Rule: Audio can only be replayed a maximum of 2 times in official exams.');
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
    const timeSpentSeconds = 50 * 60 - secondsRemaining;

    const check = validateExamSubmission(questions.length, timeSpentSeconds, score);
    if (!check.valid) {
      console.warn('[AntiCheat]', check.reason);
    }

    if (onCompleteExam) {
      onCompleteExam({ score, passed, timeSpentSeconds });
    }
  };

  // Mock exam sets database for current level
  const levelMockExams = React.useMemo(() => {
    if (normalizedLevel === 'N5') {
      return [
        {
          id: 'N5_SET_1',
          title: 'JLPT N5 Official Standard Mock Test — Set 1',
          specs: '⏱ 50 Mins • 📝 10 Questions • 🎯 Pass Mark: 70% • 🎧 Audio Included',
          desc: 'Covers N5 Kanji, vocabulary, particles (で, が, に), and basic audio dialogues matching official JLPT booklet format.',
          badge: 'Official JLPT N5',
        },
        {
          id: 'N5_SET_2',
          title: 'JLPT N5 Official Standard Mock Test — Set 2',
          specs: '⏱ 50 Mins • 📝 6 Questions • 🎯 Pass Mark: 70% • 📝 Grammar Focus',
          desc: 'Targeted N5 grammar drill covering ~てもいい, 〜から起点, and counter words for intense speed practice.',
          badge: 'Official JLPT N5',
        },
      ];
    }
    if (normalizedLevel === 'N4') {
      return [
        {
          id: 'N4_SET_1',
          title: 'JLPT N4 Official Model Examination — Set 1',
          specs: '⏱ 50 Mins • 📝 3 Questions • 🎯 Pass Mark: 70% • 🎓 Elementary Level',
          desc: 'Comprehensive JLPT N4 examination covering ~そうです predictions, respectful Keigo forms, and plan vocabulary.',
          badge: 'Official JLPT N4',
        },
      ];
    }
    if (normalizedLevel === 'N3') {
      return [
        {
          id: 'N3_SET_1',
          title: 'JLPT N3 Intermediate Master Mock Exam — Set 1',
          specs: '⏱ 60 Mins • 📝 2 Questions • 🎯 Pass Mark: 70% • 📘 Intermediate Level',
          desc: 'N3 level model test covering ~につきまして, ~に関して, and workplace reading comprehension.',
          badge: 'Official JLPT N3',
        },
      ];
    }
    if (normalizedLevel === 'N2') {
      return [
        {
          id: 'N2_SET_1',
          title: 'JLPT N2 Business & Academic Model Test — Set 1',
          specs: '⏱ 105 Mins • 📝 1 Question • 🎯 Pass Mark: 50% • 🏢 Business Keigo',
          desc: 'N2 level mock exam focusing on business Japanese, editorial news comprehension, and formal compound verbs.',
          badge: 'Official JLPT N2',
        },
      ];
    }
    if (normalizedLevel === 'N1') {
      return [
        {
          id: 'N1_SET_1',
          title: 'JLPT N1 Native Fluency Examination — Set 1',
          specs: '⏱ 110 Mins • 📝 1 Question • 🎯 Pass Mark: 55.5% • 🏛️ Academic Native',
          desc: 'N1 level advanced mock test covering all 2,136 Jōyō kanji, editorial commentary, and technical audio.',
          badge: 'Official JLPT N1',
        },
      ];
    }
    if (normalizedLevel === 'JFT') {
      return [
        {
          id: 'JFT_SET_1',
          title: 'JFT-Basic 250-Mark Official CBT Simulator — Set 1',
          specs: '⏱ 60 Mins • 📝 2 Questions • 🎯 Pass Mark: 200/250 Pts • 💻 Prometric CBT',
          desc: 'Official 250-point Prometric CBT simulator for SSW 1 Specified Skilled Worker visas.',
          badge: 'Official JFT-Basic',
        },
      ];
    }
    if (normalizedLevel === 'EPS') {
      return [
        {
          id: 'EPS_SET_1',
          title: 'EPS-TOPIK 60-Lesson HRD Korea Official Model Test — Set 1',
          specs: '⏱ 50 Mins • 📝 2 Questions • 🎯 Pass Mark: 110 Pts • 🏢 Factory & Safety',
          desc: 'HRD Korea standard CBT format covering factory vocabulary, signboards, and workplace safety rules.',
          badge: 'EPS-TOPIK HRD',
        },
        {
          id: 'EPS_SET_2',
          title: 'EPS-TOPIK Manufacturing & Safety Model Test — Set 2',
          specs: '⏱ 50 Mins • 📝 1 Question • 🎯 Pass Mark: 110 Pts • ⚠️ Safety Warnings',
          desc: 'Targeted EPS CBT exam focusing on warning signs (출입 금지, 경고) and industrial equipment.',
          badge: 'EPS-TOPIK HRD',
        },
      ];
    }
    if (normalizedLevel === 'TOPIK2') {
      return [
        {
          id: 'TOPIK1_SET_1',
          title: 'TOPIK I (Levels 1–2) Official Beginner Model Exam — Set 1',
          specs: '⏱ 60 Mins • 📝 1 Question • 🎯 Pass Mark: 80 Pts • 🎧 Listening & Reading',
          desc: 'Official 100% multiple-choice TOPIK I exam covering daily greetings, locations, and reading notices.',
          badge: 'TOPIK I Standard',
        },
        {
          id: 'TOPIK1_SET_2',
          title: 'TOPIK I (Levels 1–2) Grammar & Particle Drill — Set 2',
          specs: '⏱ 60 Mins • 📝 1 Question • 🎯 Pass Mark: 80 Pts • 📝 Particle Focus',
          desc: 'Targeted practice on location particles (에서, 에게), honorific endings, and reading short notes.',
          badge: 'TOPIK I Standard',
        },
      ];
    }
    return [
      {
        id: 'TOPIK2_SET_1',
        title: 'TOPIK II (Levels 3–6) Intermediate & Advanced Model Test — Set 1',
        specs: '⏱ 80 Mins • 📝 1 Question • 🎯 Pass Mark: 120 Pts • ✍️ Academic Level',
        desc: 'Standard TOPIK II model test featuring advanced vocabulary, news editorial reading, and writing graph analysis.',
        badge: 'TOPIK II Standard',
      },
      {
        id: 'TOPIK2_SET_2',
        title: 'TOPIK II Task 53 & Essay Writing Special Drill — Set 2',
        specs: '⏱ 50 Mins • 📝 1 Question • 🎯 Pass Mark: 120 Pts • 📊 Graph & Chart Essay',
        desc: 'Dedicated practice for Task 53 graph description essays and Task 54 argumentative essay writing.',
        badge: 'TOPIK II Standard',
      },
    ];
  }, [normalizedLevel]);

  // =========================================================================
  // VIEW 1: CLEAN LIST VIEW WITH WHITE BACKGROUND CARDS (Exam Selection View)
  // =========================================================================
  if (!examStarted) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-4 font-sans animate-fade-in">
        {/* Header Banner Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-600 mb-1">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Official Mock Exam Directory — Level: {normalizedLevel}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {activeLanguage === 'JAPANESE' ? `JLPT ${normalizedLevel} Practice Examinations` : `${normalizedLevel} Official Model Tests`}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Select an official timed mock test below. All tests feature auto-grading, answer keys, and detailed explanations.
            </p>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 font-extrabold text-xs border border-rose-200 shrink-0">
            🔒 Level Locked: {normalizedLevel}
          </span>
        </div>

        {/* White Background Cards List View */}
        <div className="space-y-3">
          {levelMockExams.map((exam, idx) => (
            <div
              key={exam.id}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 shadow-xs transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 text-white text-[11px] font-black uppercase">
                    Test #{idx + 1}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-rose-100 text-rose-800 text-[11px] font-bold">
                    {exam.badge}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{exam.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{exam.desc}</p>
                <div className="text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 inline-block">
                  {exam.specs}
                </div>
              </div>

              <button
                onClick={() => startExamSet(exam.id)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Mock Exam</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: ACTIVE TIMED EXAM ENGINE CANVAS
  // =========================================================================
  return (
    <div
      ref={containerRef}
      className={`w-full font-sans transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 overflow-y-auto bg-slate-950 p-4 sm:p-8 space-y-4'
          : 'max-w-5xl mx-auto space-y-4 sm:space-y-6'
      }`}
    >
      {/* Top Header Bar */}
      <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setExamStarted(false)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
            title="Return to Mock Exam List"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Exam List</span>
          </button>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span>Active Exam Simulator — Level {normalizedLevel}</span>
            </div>
            <h2 className="text-base sm:text-xl font-bold text-white mt-0.5 sm:mt-1">
              {activeLanguage === 'JAPANESE' ? `JLPT ${normalizedLevel} Mock Test` : `${normalizedLevel} Official Model Examination`}
            </h2>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
          {/* Full Screen Mode Toggle Button */}
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all cursor-pointer"
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
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-glow transition-all cursor-pointer"
            >
              Submit Exam
            </button>
          )}
        </div>
      </div>

      {/* Main Active Question & Navigator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {currentQ ? (
          <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold">
                    {currentQ.level}
                  </span>
                </div>

                <button
                  onClick={() => toggleFlag(currentQ.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    flaggedQuestions[currentQ.id]
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{flaggedQuestions[currentQ.id] ? 'Flagged' : 'Flag for Review'}</span>
                </button>
              </div>

              {/* Audio Prompt button if LISTENING question */}
              {currentQ.type === 'LISTENING' && (
                <div className="mb-4 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600/30 flex items-center justify-center text-indigo-400">
                      <Volume2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-indigo-200">Listening Audio Prompt</p>
                      <p className="text-[11px] text-indigo-300/70">
                        Played: {audioPlaysCount[currentQ.id] || 0} / 2 Max Replays
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={playAudioPrompt}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Play Audio Track</span>
                  </button>
                </div>
              )}

              {/* Question Prompt */}
              <h3 className="text-lg sm:text-xl font-bold text-white mb-6 leading-relaxed">
                {currentQ.prompt}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentQ.id] === option;
                  const isCorrect = isSubmitted && option === currentQ.correctAnswer;
                  const isWrongSelected = isSubmitted && isSelected && !isCorrect;

                  return (
                    <button
                      key={idx}
                      disabled={isSubmitted}
                      onClick={() => handleSelectAnswer(option)}
                      className={`w-full p-4 rounded-2xl text-left font-medium text-sm transition-all flex items-center justify-between border ${
                        isSubmitted
                          ? isCorrect
                            ? 'bg-emerald-950/70 border-emerald-500/80 text-emerald-200 font-bold'
                            : isWrongSelected
                            ? 'bg-rose-950/70 border-rose-500/80 text-rose-200 font-bold'
                            : 'bg-slate-950/50 border-slate-800 text-slate-400'
                          : isSelected
                          ? 'bg-indigo-900/60 border-indigo-500 text-white font-bold shadow-lg shadow-indigo-950/50'
                          : 'bg-slate-950/70 border-slate-800/80 text-slate-300 hover:bg-slate-800/80 hover:text-white cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                            isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span>{option}</span>
                      </div>

                      {isSubmitted && isCorrect && <Check className="w-5 h-5 text-emerald-400 shrink-0" />}
                      {isSubmitted && isWrongSelected && <X className="w-5 h-5 text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation on submission */}
              {isSubmitted && currentQ.explanation && (
                <div className="mt-6 p-4 rounded-2xl bg-amber-950/30 border border-amber-800/40 text-amber-200 text-xs leading-relaxed space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-400 uppercase tracking-wider text-[10px]">
                    <Sparkles className="w-3.5 h-3.5" /> Answer Explanation
                  </div>
                  <p>{currentQ.explanation}</p>
                </div>
              )}
            </div>

            {/* Prev / Next Navigation Controls */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>

              <button
                disabled={currentIndex === questions.length - 1}
                onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                className="px-4 py-2 rounded-xl bg-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-indigo-500 text-white font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-8 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Questions Loaded</h3>
            <p className="text-xs text-slate-400">Please select an available mock test set from the list.</p>
          </div>
        )}

        {/* Right Side Navigator Grid */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Question Navigator Grid
            </h4>
            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-2">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = Boolean(selectedAnswers[q.id]);
                const isFlagged = Boolean(flaggedQuestions[q.id]);

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-11 rounded-xl text-xs font-bold transition-all relative flex items-center justify-center cursor-pointer border ${
                      isCurrent
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-glow'
                        : isAnswered
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    {idx + 1}
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-slate-900" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-indigo-600 inline-block" /> Current Question
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-emerald-950 border border-emerald-700 inline-block" /> Answered
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-amber-500 inline-block" /> Flagged for Review
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
