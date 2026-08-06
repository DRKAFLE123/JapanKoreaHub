'use client';

import React, { useState, useMemo } from 'react';
import {
  Award, BookOpen, Clock, Target, Sparkles, CheckCircle2,
  Zap, FileText, Headphones, Layers, HelpCircle, ArrowRight,
  ShieldCheck, Calendar, ChevronRight, BarChart3, Star,
  Search, ChevronDown, ChevronUp, Volume2, BookMarked, Filter,
  Check, GraduationCap, Globe, Lightbulb, ListFilter, Play
} from 'lucide-react';
import { LevelType } from './LevelHubDashboard';
import { EPS_60_LESSONS_GRAMMAR, EPSLessonGrammar } from '@/lib/korean-eps-syllabus-grammar';
import { N3_MASTER_SYLLABUS } from '@/lib/n3-master-syllabus';

export type ExtendedLevelType = LevelType | 'EPS' | 'EPS_MFG' | 'EPS_AGR' | 'EPS_CON' | 'EPS_FISH' | 'EPS_SAFETY' | 'TOPIK1_L1' | 'TOPIK2' | 'TOPIK3' | 'TOPIK4' | 'TOPIK2_L5' | 'TOPIK2_L6';

interface LevelExamSyllabusGuideProps {
  level: string;
  onSelectTab?: (tab: 'VOCABULARY' | 'FLASHCARDS' | 'EXAMS') => void;
}

export const LevelExamSyllabusGuide: React.FC<LevelExamSyllabusGuideProps> = ({ level, onSelectTab }) => {
  const [activeGuideTab, setActiveGuideTab] = useState<'OVERVIEW' | 'SYLLABUS'>('OVERVIEW');
  const [studyPace, setStudyPace] = useState<'30' | '60' | '90'>('60');

  // EPS Syllabus Explorer State
  const [epsSearchTerm, setEpsSearchTerm] = useState('');
  const [selectedBookFilter, setSelectedBookFilter] = useState<'ALL' | '1' | '2'>('ALL');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');
  const [expandedLessonId, setExpandedLessonId] = useState<number | null>(6); // Default open Lesson 6 (first formal grammar lesson)
  const [expandedAll, setExpandedAll] = useState(false);

  // Audio TTS player
  const speakText = (text: string, lang: 'ko-KR' | 'ja-JP' = 'ko-KR') => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = lang;
      utt.rate = 0.85;
      window.speechSynthesis.speak(utt);
    }
  };

  // Level-specific exam metadata
  const examData: Record<string, any> = {
    N5: {
      title: 'JLPT N5 Examination & Syllabus Guide',
      japaneseTitle: '日本語能力試験 N5 試験概要・シラバス',
      levelCode: 'JLPT N5 (Basic Foundation)',
      passingScore: '80 / 180 Points',
      passPercentage: '44.4%',
      vocabCount: '800+ Words',
      kanjiCount: '103 Kanji Characters',
      studyHours: '80 – 100 Hours',
      examFormat: '2 Paper Booklets (Paper 1: Vocab/Grammar/Reading, Paper 2: Audio Listening)',
      papers: [
        {
          name: 'Paper 1: Language Knowledge (Vocab & Grammar) & Reading',
          duration: '25 Minutes',
          questions: '36 Questions (120 Marks)',
          sections: [
            'Kanji Reading (漢字読み): Identify hiragana for kanji words',
            'Kanji Writing (表記): Select correct kanji for hiragana words',
            'Contextual Vocab (文脈規定): Choose correct word fitting sentence context',
            'Paraphrases (類義言い換え): Identify sentence with closest meaning',
            'Grammar Forms (文法形式): Correct particle (は/が/を/に) and verb conjugations',
            'Sentence Ordering (文の組み立て): Arrange 4 words in correct grammatical sequence (* position)',
            'Short Text Reading (読解): Comprehend short notes, emails, and store notices'
          ]
        },
        {
          name: 'Paper 2: Listening Comprehension (聴解)',
          duration: '30 Minutes',
          questions: '24 Questions (60 Marks)',
          sections: [
            'Task-Based Listening (課題理解): Listen to dialogue and select action to take',
            'Point Comprehension (ポイント理解): Identify key specific detail or reason',
            'Verbal Expressions (発話表現): Select appropriate greeting or response for illustration',
            'Quick Response (即時応答): Match short spoken statement with correct reply'
          ]
        }
      ],
      tricks: [
        'Master the 214 Core Radicals: Over 70% of N5 Kanji use radicals like 氵 (water), 木 (tree), or 人 (person).',
        'SOV Sentence Order: Japanese follows Subject + Object + Verb. Verb ALWAYS comes at the very end of the sentence!',
        'Time Management Rule: Spend max 40 seconds per vocabulary question during Paper 1 to reserve 10 full minutes for Reading.',
        'Listening Pause Strategy: Use the 10-second intro music of each audio track to preview the 4 image options before speech begins!'
      ]
    },
    N4: {
      title: 'JLPT N4 Examination & Syllabus Guide',
      japaneseTitle: '日本語能力試験 N4 試験概要・シラバス',
      levelCode: 'JLPT N4 (Elementary Proficiency)',
      passingScore: '90 / 180 Points',
      passPercentage: '50.0%',
      vocabCount: '1,500+ Words',
      kanjiCount: '300 Kanji Characters',
      studyHours: '150 – 200 Hours',
      examFormat: '2 Paper Booklets (Paper 1: Vocab/Grammar/Reading, Paper 2: Audio Listening)',
      papers: [
        {
          name: 'Paper 1: Language Knowledge (Vocab & Grammar) & Reading',
          duration: '30 Minutes',
          questions: '40 Questions (120 Marks)',
          sections: [
            'Kanji Reading & Writing (漢字読み・表記)',
            'Contextual Vocab & Paraphrases (文脈規定・類義言い換え)',
            'Grammar & Sentence Ordering (文法・星印問題)',
            'Mid-length Essay & Notice Reading (中文読解・情報検索)'
          ]
        },
        {
          name: 'Paper 2: Listening Comprehension (聴解)',
          duration: '35 Minutes',
          questions: '28 Questions (60 Marks)',
          sections: [
            'Task-Based & Point Comprehension (課題理解・ポイント理解)',
            'Verbal Expressions & Quick Response (発話表現・即時応答)'
          ]
        }
      ],
      tricks: [
        'Master Te-Form (て形) & Short Forms: Te-form inflections are required for over 45% of N4 grammar questions!',
        'SSW 1 Visa Minimum: N4 is the mandatory language benchmark for Japan Specified Skilled Worker (SSW 1) visas.',
        'Honorifics Basics (Keigo): Learn Sonkeigo (respectful) and Kenjougo (humble) verb pairs early.',
        'Information Retrieval Strategy: On reading notices, read the question first, then locate key dates or conditions.'
      ]
    },
    N3: {
      title: 'JLPT N3 Examination & Syllabus Guide',
      japaneseTitle: '日本語能力試験 N3 試験概要・シラバス',
      levelCode: 'JLPT N3 (Intermediate Bridge)',
      passingScore: '95 / 180 Points',
      passPercentage: '52.7%',
      vocabCount: '3,000+ Words',
      kanjiCount: '650 Kanji Characters',
      studyHours: '300 – 400 Hours',
      examFormat: '3 Paper Sections (Vocab, Grammar/Reading, Listening)',
      papers: [
        {
          name: 'Section 1: Language Knowledge - Vocabulary (言語知識 - 語彙)',
          duration: '30 Minutes',
          questions: '35 Questions (60 Marks)',
          sections: ['Kanji Reading', 'Orthography', 'Contextual Use', 'Paraphrases', 'Usage (用法)']
        },
        {
          name: 'Section 2: Grammar & Reading (文法・読解)',
          duration: '70 Minutes',
          questions: '30 Questions (60 Marks)',
          sections: ['Grammar Forms', 'Sentence Composition', 'Text Grammar', 'Short/Medium Reading', 'Information Retrieval']
        },
        {
          name: 'Section 3: Listening Comprehension (聴解)',
          duration: '40 Minutes',
          questions: '29 Questions (60 Marks)',
          sections: ['Task Comprehension', 'Point Comprehension', 'Summary Comprehension', 'Quick Response']
        }
      ],
      tricks: [
        'Bridge between Basic & Business: N3 introduces complex conditional patterns (~たら, ~ば, ~なら, ~と).',
        'Grammar Nuances: Pay close attention to subtle grammar pairs like わけにはいかない vs しかない.',
        'Speed Reading: Practice skimming multi-paragraph articles to extract author intent under tight 70-minute limits.'
      ]
    },
    JFT: {
      title: 'JFT-Basic Prometric CBT Examination & Syllabus Guide',
      japaneseTitle: '国際交流基金日本語基礎テスト (JFT-Basic) 試験概要',
      levelCode: 'JFT-Basic (CEFR A2 Level)',
      passingScore: '200 / 250 Points',
      passPercentage: '80.0%',
      vocabCount: '1,200+ Words',
      kanjiCount: '300 Kanji Characters',
      studyHours: '150 Hours',
      examFormat: 'Computer-Based Test (CBT) with 4 Section-locked modules (60 Mins total)',
      papers: [
        {
          name: 'Section 1: Script & Vocabulary (文字・語彙)',
          duration: 'Section Locked',
          questions: '12 Questions (60 Points)',
          sections: ['Reading of Kanji words', 'Meaning of words in daily context', 'Kana orthography']
        },
        {
          name: 'Section 2: Conversation & Expression (会話・表現)',
          duration: 'Section Locked',
          questions: '12 Questions (60 Points)',
          sections: ['Daily greetings & workplace interactions', 'Polite expressions in stores, medical clinics, offices']
        },
        {
          name: 'Section 3: Listening Comprehension (聴解)',
          duration: 'Section Locked',
          questions: '12 Questions (65 Points)',
          sections: ['Audio dialogues with headphones', 'Store announcements, station broadcasts, workplace instructions']
        },
        {
          name: 'Section 4: Reading Comprehension (読解)',
          duration: 'Section Locked',
          questions: '12–14 Questions (65 Points)',
          sections: ['Short letters, emails, bulletin board announcements, schedules, price tags']
        }
      ],
      tricks: [
        'Section Locking Rule: Once you click "Next Section" on Prometric CBT, previous section answers CANNOT be edited!',
        'No Negative Marking: Answer every question! Unanswered questions receive 0 points.',
        'Prometric Test Center Check-in: Bring original Passport matching your Prometric ID details 30 mins prior to exam time.',
        '250-Mark Scale: Scoring 200+ out of 250 points qualifies you for Japanese SSW 1 Specified Skilled Worker visas.'
      ]
    },
    BASICS: {
      title: 'Japanese Fundamentals & Kana Syllabus',
      japaneseTitle: '日本語基礎・仮名シラバス',
      levelCode: 'Level 00 (Kana & Vowels)',
      passingScore: '100% Mastered',
      passPercentage: '100%',
      vocabCount: '300 Words',
      kanjiCount: '46 Hiragana + 46 Katakana',
      studyHours: '20 Hours',
      examFormat: 'Kana Reading & Audio Pronunciation Quizzes',
      papers: [
        {
          name: 'Module 1: Hiragana & Katakana Mastery',
          duration: 'Self-Paced',
          questions: '46 Hiragana + 46 Katakana Characters',
          sections: ['Vowelsあいうえお', 'K/S/T/N/H/M/Y/R/W consonant rows', 'Dakuten濁音 (がざだば) & Handakuten (ぱ)', 'Contracted sounds 拗音 (きゃきゅきょ)']
        }
      ],
      tricks: [
        'Practice daily writing stroke order for 15 minutes to build muscle memory.',
        'Listen to native audio matrix samples for double consonants (っ Batchim effect).'
      ]
    },
    N2: {
      title: 'JLPT N2 Examination & Official Syllabus Overview',
      japaneseTitle: '日本語能力試験 N2 試験概要・公式シラバス',
      levelCode: 'JLPT N2 (Pre-Advanced / Business Professional)',
      passingScore: '90 / 180 Points (Min 19/60 in each section)',
      passPercentage: '50.0%',
      vocabCount: '~6,000 Words (Formal, Business, Compound Verbs)',
      kanjiCount: '~1,000 Kanji Characters (Cumulative N3 + Newspaper/Business)',
      studyHours: '600 Hours (20–24 Weeks Course Pace)',
      examFormat: '2 Combined Timing Papers (Paper 1: 105 Mins, Paper 2: 50 Mins)',
      papers: [
        {
          name: 'Paper 1: Language Knowledge (Vocab/Grammar) & Reading',
          duration: '105 Minutes',
          questions: 'Combined Timing (120 Marks: 60 Vocab/Grammar + 60 Reading)',
          sections: [
            'Vocabulary (言語知識-文字・語彙): Kanji Reading (漢字読み), Contextual Expressions (文脈規定), Paraphrases (類義言い換え), Usage (用法), Orthography & Word Formation (語形成)',
            'Grammar (言語知識-文法): Sentence-form selection (文法形式), Sentence composition (文の組み立て * position), Text grammar (文章の文法)',
            'Reading (読解): Short passages (~200w), Mid-length passages (~500w), Integrated comprehension (統合理解), Thematic comprehension (主張理解), Information retrieval (情報検索 - notices, reports)'
          ]
        },
        {
          name: 'Paper 2: Listening Comprehension (聴解)',
          duration: '50 Minutes',
          questions: 'Task, Point, Summary & Integrated Listening (60 Marks)',
          sections: [
            'Task-Based Listening (課題理解): Extract specific action steps in business & daily situations',
            'Key Point Comprehension (ポイント理解): Understand main reasons, conditions, or key facts',
            'General Outline (概要理解): Identify overall intent, speaker stance, or topic summary',
            'Verbal Expressions (発話表現): Select appropriate formal Keigo response for illustration',
            'Quick Response (即時応答): Match fast spoken statements with immediate correct reply',
            'Integrated Comprehension (総合理解): Compare multiple speakers or longer dialogues'
          ]
        }
      ],
      tricks: [
        'Nuance Drill Priority: Over 50% of N2 grammar errors come from subtle differences between similar patterns (e.g., に限って vs に限らず vs に限ったことではない).',
        'Time Pacing Rule for Paper 1 (105 Mins): Finish Vocab & Grammar in 40 minutes to reserve 65 full minutes for Mid & Long Reading passages.',
        'Word Formation Mastery: Memorize common N2 prefixes (無-, 未-, 非-, 反-) and suffixes (-化, -性, -感, -風) for guaranteed vocabulary marks.',
        'Employment Benchmark: Official requirement for full-time Japanese corporate employment, work visas, and medical licensure.'
      ]
    },
    N1: {
      title: 'JLPT N1 Native Fluency Examination & Syllabus Guide',
      japaneseTitle: '日本語能力試験 N1 最高峰試験概要・公式シラバス',
      levelCode: 'JLPT N1 (Native Mastery / Academic & Technical)',
      passingScore: '100 / 180 Points (Strict min 19 pts in each of 3 sections)',
      passPercentage: '55.5%',
      vocabCount: '10,000 – 15,000 Words (Academic, Technical & Idiomatic)',
      kanjiCount: '~2,000 Kanji Characters (All 2,136 Jōyō常用 Kanji)',
      studyHours: '900+ Hours (24–30 Weeks Course Pace)',
      examFormat: '2 Combined Timing Papers (Paper 1: 110 Mins, Paper 2: 55 Mins)',
      papers: [
        {
          name: 'Paper 1: Language Knowledge (Vocab/Grammar) & Reading',
          duration: '110 Minutes',
          questions: 'Combined Timing (120 Marks: 60 Vocab/Grammar + 60 Reading)',
          sections: [
            'Vocabulary (言語知識-文字・語彙): Kanji Reading (漢字読み), Contextual Expressions (文脈規定), Paraphrases (類義言い換え), Usage (用法) [Note: N1 drops Orthography & Word Formation]',
            'Grammar (言語知識-文法): Sentence-form selection (文法形式), Sentence composition (文の組み立て * position), Text grammar (文章の文法)',
            'Reading (読解): Short passages (~200w), Mid passages (~500w), Standalone Long Passages (~1,000w), Integrated comprehension (統合理解), Thematic long-passage comprehension (主張理解-長文), Information retrieval'
          ]
        },
        {
          name: 'Paper 2: Listening Comprehension (聴解)',
          duration: '55 Minutes',
          questions: 'Fast-paced, Unscripted & Technical Listening (60 Marks)',
          sections: [
            'Task-Based Listening (課題理解): Complex multi-step instructions in academic/workplace settings',
            'Key Point Comprehension (ポイント理解): Unscripted dialogues with subtle implied nuance',
            'General Outline (概要理解): Abstract lectures, panel discussions, editorial commentary',
            'Quick Response (即時応答): Rapid-fire idiomatic expressions and colloquial/formal replies',
            'Integrated Comprehension (総合理解): Compare 2 complex viewpoints or multi-speaker debates'
          ]
        }
      ],
      tricks: [
        'Strict Sectional Minimum (19/60 Rule): You MUST score at least 19 in EVERY section (Vocab/Grammar, Reading, Listening) — failing any single section results in overall exam failure regardless of total score.',
        'Text Grammar Speed Reading: Skim opening/closing paragraphs of long N1 editorials before reading details to quickly catch the author’s primary thesis (主張).',
        'Idiomatic Quick Response: Listen to unscripted Japanese news podcasts daily (NHK News / TBS) to adapt to natural native speech speed.',
        'Full Jōyō Kanji Integration: Master all 2,136 Jōyō kanji readings and formal compound nouns common in Japanese editorial publications.'
      ]
    },

    // KOREAN EXAM LEVELS
    EPS: {
      title: 'EPS-TOPIK 60-Lesson Official HRD Korea Examination & Master Syllabus',
      japaneseTitle: '고용허가제 한국어능력시험 (EPS-TOPIK) 60과 공식 시라버스',
      levelCode: 'EPS-TOPIK (E-9 Working Visa Benchmark)',
      passingScore: '110 / 200 Points',
      passPercentage: '55.0%',
      vocabCount: '2,500+ Workplace Words',
      kanjiCount: '60 Official HRD Lessons & Grammar Points',
      studyHours: '150 – 200 Hours',
      examFormat: 'Computer-Based Test (CBT) / UBT 40 Questions (20 Reading + 20 Listening, 50 Mins total)',
      papers: [
        {
          name: 'Paper 1: Reading Comprehension (읽기)',
          duration: '25 Minutes',
          questions: '20 Questions (100 Marks)',
          sections: [
            'Vocabulary & Fill in the Blanks (어휘 및 빈칸 채우기)',
            'Workplace Safety & Public Signs (안전 표지판 및 신호등)',
            'Short Work Instructions & Notices (작업 지시서 및 공지사항)',
            'Short Essay & Diagram Comprehension (설명문 및 도표 이해)'
          ]
        },
        {
          name: 'Paper 2: Listening Comprehension (듣기)',
          duration: '25 Minutes',
          questions: '20 Questions (100 Marks)',
          sections: [
            'Word & Picture Listening (단어 및 그림 듣기)',
            'Dialogue Action Selection (대화 듣고 행동 선택)',
            'Workplace Communication & Instructions (작업장 대화 및 지시사항)',
            'Audio Question & Reply Matching (질문 듣고 알맞은 대답)'
          ]
        }
      ],
      tricks: [
        'Workplace Vocabulary Priority: Over 80% of EPS-TOPIK listening and reading questions feature factory, farm, construction, or safety terminology.',
        'Master Signboard Icons (안전 표지판): Recognize universal warning signs (금지, 경고, 지시) instantly for guaranteed questions.',
        'Grammar Patterns for EPS: Focus heavily on workplace request/permission forms (-아/어 주세요, -(으)면 안 되다, -(으)ㄹ 수 있다).',
        'CBT Timer Pacing: Spend no more than 60 seconds per reading question to save 5 minutes to review flagged questions.'
      ]
    },
    TOPIK1_L1: {
      title: 'TOPIK I Level 1 Beginner Examination & Syllabus Guide',
      japaneseTitle: '한국어능력시험 (TOPIK I) 1급 시험개요 및 시라버스',
      levelCode: 'TOPIK I — Level 1 (Beginner)',
      passingScore: '80 / 200 Points',
      passPercentage: '40.0%',
      vocabCount: '800+ Basic Words',
      kanjiCount: '30 Core Grammar Patterns',
      studyHours: '80 – 100 Hours',
      examFormat: 'Paper Test (PBT) / IBT 70 Questions (30 Listening + 40 Reading, 100 Mins total)',
      papers: [
        {
          name: 'Section 1: Listening Comprehension (듣기)',
          duration: '40 Minutes',
          questions: '30 Questions (100 Marks)',
          sections: ['Daily Greetings & Shopping Dialogues', 'Time & Schedule Questions', 'Location & Action Selection']
        },
        {
          name: 'Section 2: Reading Comprehension (읽기)',
          duration: '60 Minutes',
          questions: '40 Questions (100 Marks)',
          sections: ['Public Signs & Short Announcements', 'Topic Matching', 'Short Personal Notes & Emails']
        }
      ],
      tricks: [
        'Focus on Core Particles: Master 은/는 (topic), 이/가 (subject), 을/를 (object), 에/에서 (location/time).',
        'Informal Polite Ending (-아/어/해요): Over 90% of TOPIK I dialogues use standard polite style.',
        'Preview Options: Look at visual choices before each audio clip plays to predict target vocabulary.'
      ]
    },
    TOPIK1: {
      title: 'TOPIK I Level 1 Beginner Examination & Syllabus Guide',
      japaneseTitle: '한국어능력시험 (TOPIK I) 1급 시험개요 및 시라버스',
      levelCode: 'TOPIK I — Level 1 (Beginner)',
      passingScore: '80 / 200 Points',
      passPercentage: '40.0%',
      vocabCount: '800+ Basic Words',
      kanjiCount: '30 Core Grammar Patterns',
      studyHours: '80 – 100 Hours',
      examFormat: 'Paper Test (PBT) / IBT 70 Questions (30 Listening + 40 Reading, 100 Mins total)',
      papers: [
        {
          name: 'Section 1: Listening Comprehension (듣기)',
          duration: '40 Minutes',
          questions: '30 Questions (100 Marks)',
          sections: ['Daily Greetings & Shopping Dialogues', 'Time & Schedule Questions', 'Location & Action Selection']
        },
        {
          name: 'Section 2: Reading Comprehension (읽기)',
          duration: '60 Minutes',
          questions: '40 Questions (100 Marks)',
          sections: ['Public Signs & Short Announcements', 'Topic Matching', 'Short Personal Notes & Emails']
        }
      ],
      tricks: [
        'Master topic and subject particles (은/는 vs 이/가).',
        'Learn daily frequency adverbs (자주, 항상, 가끔).'
      ]
    },
    TOPIK2: {
      title: 'TOPIK I Level 2 Elementary Examination & Syllabus Guide',
      japaneseTitle: '한국어능력시험 (TOPIK I) 2급 시험개요 및 시라버스',
      levelCode: 'TOPIK I — Level 2 (Elementary)',
      passingScore: '140 / 200 Points',
      passPercentage: '70.0%',
      vocabCount: '1,500+ Words',
      kanjiCount: '60 Essential Grammar Rules',
      studyHours: '150 – 200 Hours',
      examFormat: 'Paper Test (PBT) / IBT 70 Questions (30 Listening + 40 Reading, 100 Mins total)',
      papers: [
        {
          name: 'Section 1: Listening Comprehension (듣기)',
          duration: '40 Minutes',
          questions: '30 Questions (100 Marks)',
          sections: ['Workplace, Travel & Phone Call Dialogues', 'Main Idea & Details Extraction']
        },
        {
          name: 'Section 2: Reading Comprehension (읽기)',
          duration: '60 Minutes',
          questions: '40 Questions (100 Marks)',
          sections: ['Advertisements, Letters & Articles', 'Paragraph Ordering & Logical Flow']
        }
      ],
      tricks: [
        'Connective Endings (-고, -(으)며, -(으)니까, -지만): Master clause connections to speed up reading.',
        'Target score 140+ out of 200 points to secure official TOPIK Level 2 certification.'
      ]
    },
    TOPIK3: {
      title: 'TOPIK II Level 3 Intermediate Examination & Syllabus Guide',
      japaneseTitle: '한국어능력시험 (TOPIK II) 3급 중급 시험개요',
      levelCode: 'TOPIK II — Level 3 (Intermediate)',
      passingScore: '120 / 300 Points',
      passPercentage: '40.0%',
      vocabCount: '3,000+ Words',
      kanjiCount: '100 Intermediate Grammar Patterns',
      studyHours: '300 – 400 Hours',
      examFormat: '3 Sections (50 Listening, 4 Writing Essays, 50 Reading, 180 Mins total)',
      papers: [
        {
          name: 'Section 1: Listening (듣기)',
          duration: '60 Minutes',
          questions: '50 Questions (100 Marks)',
          sections: ['Lectures, News Reports & Panel Discussions']
        },
        {
          name: 'Section 2: Writing (쓰기)',
          duration: '50 Minutes',
          questions: '4 Questions (100 Marks)',
          sections: ['Tasks 51 & 52: Short Sentence Completion', 'Task 53: Graph & Data Report (200-300 words)']
        },
        {
          name: 'Section 3: Reading (읽기)',
          duration: '70 Minutes',
          questions: '50 Questions (100 Marks)',
          sections: ['Editorials, Articles, Literature & Logical Ordering']
        }
      ],
      tricks: [
        'Task 53 Writing Formula: Memorize standard graph reporting phrases (이/가 증가하였다, N%에 달하였다) for guaranteed 30+ writing marks.',
        'Required benchmark for Korean university undergraduate entry and F-2 points visa.'
      ]
    },
    TOPIK4: {
      title: 'TOPIK II Level 4 Upper-Intermediate Examination Guide',
      japaneseTitle: '한국어능력시험 (TOPIK II) 4급 중상급 시험개요',
      levelCode: 'TOPIK II — Level 4 (Upper-Intermediate)',
      passingScore: '150 / 300 Points',
      passPercentage: '50.0%',
      vocabCount: '4,500+ Words',
      kanjiCount: '150 Advanced Grammar Patterns',
      studyHours: '500 Hours',
      examFormat: '3 Sections (50 Listening, 4 Writing Essays, 50 Reading, 180 Mins total)',
      papers: [
        {
          name: 'Section 1: Listening & Reading',
          duration: '130 Minutes',
          questions: '100 Questions (200 Marks)',
          sections: ['Radio Debates, Social Essays, Cultural Texts']
        },
        {
          name: 'Section 2: Writing (Task 54 Argumentative Essay)',
          duration: '50 Minutes',
          questions: '4 Questions (100 Marks)',
          sections: ['Task 54: 600-700 Word Essay on Social Issues']
        }
      ],
      tricks: [
        'Task 54 Essay Structure: Structure into Introduction (서론), Body (본론), and Conclusion (결론).',
        'Required benchmark for Korean corporate employment & D-2/E-7 Skilled Worker Visas.'
      ]
    },
    TOPIK2_L5: {
      title: 'TOPIK II Level 5 Advanced Examination Guide',
      japaneseTitle: '한국어능력시험 (TOPIK II) 5급 고급 시험개요',
      levelCode: 'TOPIK II — Level 5 (Advanced Academic)',
      passingScore: '190 / 300 Points',
      passPercentage: '63.3%',
      vocabCount: '6,000+ Words',
      kanjiCount: '200 Academic Grammar Rules',
      studyHours: '700 Hours',
      examFormat: '3 Sections (50 Listening, 4 Writing Essays, 50 Reading, 180 Mins total)',
      papers: [
        {
          name: 'Section 1: Listening & Reading',
          duration: '130 Minutes',
          questions: '100 Questions (200 Marks)',
          sections: ['Academic Lectures, Economic Editorials & Philosophy']
        },
        {
          name: 'Section 2: Writing',
          duration: '50 Minutes',
          questions: '4 Questions (100 Marks)',
          sections: ['Academic Graph Analysis & Policy Argument Essay']
        }
      ],
      tricks: [
        'High-level certification for Korean university scholarships and government positions.'
      ]
    },
    TOPIK2_L6: {
      title: 'TOPIK II Level 6 Native Fluency Examination Guide',
      japaneseTitle: '한국어능력시험 (TOPIK II) 6급 최고봉 시험개요',
      levelCode: 'TOPIK II — Level 6 (Native Fluency)',
      passingScore: '230 / 300 Points',
      passPercentage: '76.6%',
      vocabCount: '10,000+ Words',
      kanjiCount: '300 High-Level Literary Rules',
      studyHours: '900+ Hours',
      examFormat: '3 Sections (50 Listening, 4 Writing Essays, 50 Reading, 180 Mins total)',
      papers: [
        {
          name: 'Section 1: Listening & Reading',
          duration: '130 Minutes',
          questions: '100 Questions (200 Marks)',
          sections: ['Expert Academic Debates, Legal Analysis & Classical Texts']
        },
        {
          name: 'Section 2: Writing',
          duration: '50 Minutes',
          questions: '4 Questions (100 Marks)',
          sections: ['Full Academic Thesis-style Essay']
        }
      ],
      tricks: [
        'Pinnacle of Korean language proficiency certification worldwide.'
      ]
    },
    EPS_MFG: {
      title: 'EPS Manufacturing Industry Skill Test & Workplace Guide',
      japaneseTitle: 'EPS 제조업 실기시험 및 공장 직무 시라버스',
      levelCode: 'EPS Sector — Manufacturing (제조업)',
      passingScore: 'Skill Test Threshold',
      passPercentage: 'HRD Korea Standard',
      vocabCount: '800+ Factory & Machine Terms',
      kanjiCount: 'Industrial Tools & Machinery',
      studyHours: '120 Hours',
      examFormat: 'CBT Special Test + Physical/Skill Test (Assembly, Measurement, Safety)',
      papers: [
        {
          name: 'Section 1: Factory Machinery & Metalworking Terminology',
          duration: 'Skill Test',
          questions: 'Factory Safety & Tools',
          sections: ['Lathe, Press, Welding, Mold & Machine Operation Terms']
        },
        {
          name: 'Section 2: Assembling & Measuring Tools',
          duration: 'Skill Test',
          questions: 'Measurement Accuracy',
          sections: ['Vernier Calipers, Micrometer, Wrench & Bolt Assembly']
        }
      ],
      tricks: [
        'Master tool names: Vernier calipers (버니어캘리퍼스), press (프레스), welding (용접), lathe (선반).'
      ]
    },
    EPS_AGR: {
      title: 'EPS Agriculture & Livestock Skill Test Guide',
      japaneseTitle: 'EPS 농축산업 실기시험 및 영농 직무 시라버스',
      levelCode: 'EPS Sector — Agriculture & Livestock (농축산업)',
      passingScore: 'Skill Test Threshold',
      passPercentage: 'HRD Korea Standard',
      vocabCount: '650+ Farming & Animal Terms',
      kanjiCount: 'Crops, Greenhouse & Tools',
      studyHours: '100 Hours',
      examFormat: 'CBT Special Test + Physical/Skill Test (Crop Sorting, Fertilizer Handling)',
      papers: [
        {
          name: 'Section 1: Greenhouse & Crop Cultivation',
          duration: 'Skill Test',
          questions: 'Farming Operations',
          sections: ['Vinyl greenhouse (비닐하우스), Crop Sowing (파종), Harvesting (수확)']
        },
        {
          name: 'Section 2: Agricultural Tools & Livestock Sanitation',
          duration: 'Skill Test',
          questions: 'Tools & Livestock',
          sections: ['Sickle (낫), Hoe (괭이), Shovel (삽), Animal Husbandry (축산업)']
        }
      ],
      tricks: [
        'Focus on seasonal terms: Sowing (파종), harvesting (수확), fertilizing (비료 주기), weeding (잡초 제거).'
      ]
    },
    EPS_CON: {
      title: 'EPS Construction Industry Skill Test & Site Safety Guide',
      japaneseTitle: 'EPS 건설업 실기시험 및 현장 안전 시라버스',
      levelCode: 'EPS Sector — Construction (건설업)',
      passingScore: 'Skill Test Threshold',
      passPercentage: 'HRD Korea Standard',
      vocabCount: '700+ Building & Site Terms',
      kanjiCount: 'Scaffolding & Safety Gear',
      studyHours: '110 Hours',
      examFormat: 'CBT Special Test + Physical/Skill Test (Scaffolding erection, Rebar binding)',
      papers: [
        {
          name: 'Section 1: Site Safety & Personal Protection',
          duration: 'Skill Test',
          questions: 'Safety Standards',
          sections: ['Safety Helmet (안전모), Safety Belt (안전대), Fall Prevention (추락 방지)']
        },
        {
          name: 'Section 2: Building Materials & Heavy Tools',
          duration: 'Skill Test',
          questions: 'Materials & Machinery',
          sections: ['Cement (시멘트), Rebar (철근), Formwork (거푸집), Scaffolding (비계)']
        }
      ],
      tricks: [
        'Fall prevention safety (추락 방지) and harness rules (안전대) are top priority.'
      ]
    },
    EPS_FISH: {
      title: 'EPS Fishery & Marine Industry Skill Test Guide',
      japaneseTitle: 'EPS 어업 실기시험 및 해양 수산 시라버스',
      levelCode: 'EPS Sector — Fishery & Aquaculture (어업)',
      passingScore: 'Skill Test Threshold',
      passPercentage: 'HRD Korea Standard',
      vocabCount: '600+ Fishery & Boat Terms',
      kanjiCount: 'Fishing Nets & Nautical Tools',
      studyHours: '100 Hours',
      examFormat: 'CBT Special Test + Physical/Skill Test (Net repair, Knot tying)',
      papers: [
        {
          name: 'Section 1: Fishing Nets & Gear Maintenance',
          duration: 'Skill Test',
          questions: 'Nautical Gear',
          sections: ['Fishing Nets (그물), Gear Maintenance (어구 정비), Knot Tying (매듭 묶기)']
        },
        {
          name: 'Section 2: Boat Operations & Seafood Processing',
          duration: 'Skill Test',
          questions: 'Maritime Safety',
          sections: ['Net Hauler (양망기), Boat Safety, Aquaculture (양식업), Processing (수산물 가공)']
        }
      ],
      tricks: [
        'Practice knot tying (매듭 묶기) and net repair (그물 손질) for high skill test marks.'
      ]
    },
    EPS_SAFETY: {
      title: 'EPS Industrial Safety, Health & E-9 Labor Law Guide',
      japaneseTitle: '산업안전보건 및 E-9 근로기준법 시라버스',
      levelCode: 'EPS Sector — Industrial Safety & Labor Rights (산업안전·노동법)',
      passingScore: '100% Mastery Recommended',
      passPercentage: '100%',
      vocabCount: '500+ Safety Signs & Legal Terms',
      kanjiCount: 'Labor Contract & Insurance',
      studyHours: '60 Hours',
      examFormat: 'EPS-TOPIK Safety & Emergency Response Modules',
      papers: [
        {
          name: 'Section 1: Industrial Warning & Signboards',
          duration: 'Safety Module',
          questions: 'Signboard Identification',
          sections: ['Prohibition Signs (금지 표지), Warning Signs (경고 표지), Mandatory Signs (지시 표지)']
        },
        {
          name: 'Section 2: E-9 Standard Labor Contract & Insurance',
          duration: 'Labor Law',
          questions: 'Worker Rights',
          sections: ['Standard Contract (근로계약서), Minimum Wage (최저임금), Overtime Pay, Injury Insurance (산재보험)']
        }
      ],
      tricks: [
        'Know your fundamental rights: Minimum wage (최저임금), overtime pay (연장근로수당), and workplace injury claims (산재보험).'
      ]
    }
  };

  const currentExam = examData[level] || examData['EPS'] || examData['N5'];

  const isKoreanLevel = level.startsWith('EPS') || level.startsWith('TOPIK');

  // Filtered EPS Lessons
  const filteredEpsLessons = useMemo(() => {
    return EPS_60_LESSONS_GRAMMAR.filter((lesson) => {
      // Book filter
      if (selectedBookFilter === '1' && lesson.book !== 1) return false;
      if (selectedBookFilter === '2' && lesson.book !== 2) return false;

      // Category filter
      if (selectedCategoryFilter !== 'ALL' && lesson.topicCategory !== selectedCategoryFilter) return false;

      // Search term
      if (epsSearchTerm.trim()) {
        const query = epsSearchTerm.toLowerCase();
        const matchLesson = lesson.lesson.toString().includes(query);
        const matchTitleKr = lesson.titleKorean.toLowerCase().includes(query);
        const matchTitleEn = lesson.titleEnglish.toLowerCase().includes(query);
        const matchTitleNp = lesson.titleNepali.toLowerCase().includes(query);
        const matchVocab = lesson.vocabularyTopic.toLowerCase().includes(query);
        const matchG1Title = lesson.grammarPoint1?.title.toLowerCase().includes(query) || false;
        const matchG1Pattern = lesson.grammarPoint1?.pattern.toLowerCase().includes(query) || false;
        const matchG1Np = lesson.grammarPoint1?.explanationNepali.toLowerCase().includes(query) || false;
        const matchG2Title = lesson.grammarPoint2?.title.toLowerCase().includes(query) || false;
        const matchG2Pattern = lesson.grammarPoint2?.pattern.toLowerCase().includes(query) || false;
        const matchG2Np = lesson.grammarPoint2?.explanationNepali.toLowerCase().includes(query) || false;

        return (
          matchLesson || matchTitleKr || matchTitleEn || matchTitleNp ||
          matchVocab || matchG1Title || matchG1Pattern || matchG1Np ||
          matchG2Title || matchG2Pattern || matchG2Np
        );
      }

      return true;
    });
  }, [epsSearchTerm, selectedBookFilter, selectedCategoryFilter]);

  // Categories present in EPS dataset
  const epsCategories = useMemo(() => {
    const set = new Set<string>();
    EPS_60_LESSONS_GRAMMAR.forEach(l => set.add(l.topicCategory));
    return Array.from(set);
  }, []);

  // High yield grammar points extracted from EPS dataset
  const allEpsGrammarPoints = useMemo(() => {
    const list: { lesson: number; title: string; pattern: string; en: string; np: string; exampleKo?: string; exampleNp?: string }[] = [];
    EPS_60_LESSONS_GRAMMAR.forEach(l => {
      if (l.grammarPoint1) {
        list.push({
          lesson: l.lesson,
          title: l.grammarPoint1.title,
          pattern: l.grammarPoint1.pattern,
          en: l.grammarPoint1.explanationEnglish,
          np: l.grammarPoint1.explanationNepali,
          exampleKo: l.grammarPoint1.example?.korean,
          exampleNp: l.grammarPoint1.example?.nepali
        });
      }
      if (l.grammarPoint2) {
        list.push({
          lesson: l.lesson,
          title: l.grammarPoint2.title,
          pattern: l.grammarPoint2.pattern,
          en: l.grammarPoint2.explanationEnglish,
          np: l.grammarPoint2.explanationNepali,
          exampleKo: l.grammarPoint2.example?.korean,
          exampleNp: l.grammarPoint2.example?.nepali
        });
      }
    });
    return list;
  }, []);

  // Dynamic 30/60/90 Study Plan Roadmap
  const getStudySchedule = () => {
    if (studyPace === '30') {
      return [
        { days: 'Days 1 – 10', goal: 'Curriculum Speed Run', detail: 'Complete 3 lessons per day with 4-column vocabulary notes and grammar inspector.' },
        { days: 'Days 11 – 20', goal: 'SRS Flashcard Intensive', detail: 'Review 40 cards daily on target language first. Focus on workplace particles & forms.' },
        { days: 'Days 21 – 28', goal: 'Timed Mock Test Sets', detail: 'Complete 1 full timed mock test every 2 days under strict section-locking timer.' },
        { days: 'Days 29 – 30', goal: 'Final Error Audit & Relaxation', detail: 'Review incorrect answers in heatmap log and review tricks to pass.' }
      ];
    }
    if (studyPace === '90') {
      return [
        { days: 'Days 1 – 30', goal: 'Comprehensive Lesson Learning', detail: 'Master 1 lesson every 2 days. Practice stroke order / Hangeul writing and native audio tracks.' },
        { days: 'Days 31 – 60', goal: 'Grammar Deep Dive & SRS Retention', detail: 'Daily flashcard review of 20 cards. Complete grammar ordering & workplace sign exercises.' },
        { days: 'Days 61 – 80', goal: 'Reading & Listening Comprehension', detail: 'Read 2 short passages daily and practice audio listening dialogues.' },
        { days: 'Days 81 – 90', goal: 'Full Mock Test Battery', detail: 'Take 4 full mock exams under authentic timed conditions.' }
      ];
    }
    // Default 60 Days
    return [
      { days: 'Days 1 - 20', goal: 'Core Vocabulary & Grammar', detail: 'Learn 20 words and 2 grammar points daily from Book 1.' },
      { days: 'Days 21 - 40', goal: 'Workplace & Industry Modules', detail: 'Master Book 2 safety, machinery, and workplace conversation lessons.' },
      { days: 'Days 41 - 50', goal: 'SRS Review & Weak Areas', detail: 'Focus on flashcard retention, safety signs, and error logs.' },
      { days: 'Days 51 - 60', goal: 'Full Mock Test Battery', detail: 'Take full-length timed mock exams under CBT conditions.' }
    ];
  };

  return (
    <div className="w-full font-sans space-y-6 animate-fade-in">

      {/* 1. Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden text-slate-900">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 hidden pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-black uppercase tracking-wider">
                Official Examination Hub
              </span>
              <span className="px-3 py-1 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold">
                {currentExam.levelCode}
              </span>
              {isKoreanLevel && (
                <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                  60 HRD Lessons
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
              {currentExam.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-mono font-medium">
              {currentExam.japaneseTitle}
            </p>
          </div>

          {/* Quick Action Navigation */}
          {onSelectTab && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
              <button
                onClick={() => onSelectTab('EXAMS')}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-black text-xs shadow-glow transition-all flex items-center justify-center gap-2 cursor-pointer px-5 py-3 rounded-2xl"
              >
                <Clock className="w-4 h-4" />
                <span>Start Timed Mock Test</span>
              </button>
              <button
                onClick={() => onSelectTab('FLASHCARDS')}
                className="px-5 py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-800 font-extrabold text-xs border border-rose-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Layers className="w-4 h-4 text-rose-700" />
                <span>Open Flashcards</span>
              </button>
            </div>
          )}
        </div>

        {/* Inner Sub-Navigation Bar */}
        <div className="relative z-10 mt-6 pt-5 border-t border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveGuideTab('OVERVIEW')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeGuideTab === 'OVERVIEW'
                ? 'bg-rose-600 text-white shadow-glow font-black'
                : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800 font-bold'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Exam Structure &amp; Study Schedule</span>
          </button>

          <button
            onClick={() => setActiveGuideTab('SYLLABUS')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeGuideTab === 'SYLLABUS'
                ? 'bg-rose-600 text-white shadow-glow font-black'
                : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800 font-bold'
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Chapter &amp; Lesson Syllabus ({isKoreanLevel ? '60 Lessons' : level === 'N3' ? '12 Chapters' : 'Units'})</span>
          </button>

          
        </div>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: OFFICIAL LESSON-BY-LESSON SYLLABUS EXPLORER          */}
      {/* ============================================================ */}
      {activeGuideTab === 'SYLLABUS' && (
        <div className="space-y-6">
          {/* Korean 60-Lesson HRD Syllabus */}
          {isKoreanLevel ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-slate-900">

              {/* Title & Controls Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                    <GraduationCap className="w-4 h-4 text-emerald-700" />
                    <span>Official HRD Korea 60-Lesson Textbook Syllabus</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    Korean EPS-TOPIK Complete Chapter-by-Chapter Guide
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">
                    Verified directly against official HRD Korea Textbook (Book 1 &amp; Book 2) with English &amp; Nepali explanations.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExpandedAll(!expandedAll)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-300 hover:bg-slate-100 hover:border-slate-400 text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    {expandedAll ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    <span>{expandedAll ? 'Collapse All' : 'Expand All'}</span>
                  </button>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                  {/* Search Bar */}
                  <div className="relative md:col-span-1">
                    <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={epsSearchTerm}
                      onChange={(e) => setEpsSearchTerm(e.target.value)}
                      placeholder="Search lesson #, title, grammar, or Nepali..."
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-800 transition-all"
                    />
                  </div>

                  {/* Book Selector */}
                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
                    <button
                      onClick={() => setSelectedBookFilter('ALL')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedBookFilter === 'ALL' ? 'bg-rose-800 text-white shadow-xs font-bold' : 'text-slate-700 hover:text-rose-800 font-semibold'
                      }`}
                    >
                      All Books (60)
                    </button>
                    <button
                      onClick={() => setSelectedBookFilter('1')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedBookFilter === '1' ? 'bg-rose-800 text-white shadow-xs font-bold' : 'text-slate-700 hover:text-rose-800 font-semibold'
                      }`}
                    >
                      Book 1 (1–30)
                    </button>
                    <button
                      onClick={() => setSelectedBookFilter('2')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedBookFilter === '2' ? 'bg-rose-800 text-white shadow-xs font-bold' : 'text-slate-700 hover:text-rose-800 font-semibold'
                      }`}
                    >
                      Book 2 (31–60)
                    </button>
                  </div>

                  {/* Category Dropdown */}
                  <div className="relative">
                    <select
                      value={selectedCategoryFilter}
                      onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:border-rose-800 cursor-pointer"
                    >
                      <option value="ALL">All Categories ({epsCategories.length})</option>
                      {epsCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-600 px-1 pt-1">
                  <span>Showing <strong className="text-indigo-900">{filteredEpsLessons.length}</strong> of 60 HRD lessons</span>
                  {epsSearchTerm && (
                    <button
                      onClick={() => setEpsSearchTerm('')}
                      className="text-rose-400 hover:underline font-bold"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              </div>

              {/* Lesson Cards Accordion List */}
              <div className="space-y-3">
                {filteredEpsLessons.map((lesson) => {
                  const isOpen = expandedAll || expandedLessonId === lesson.lesson;

                  return (
                    <div
                      key={lesson.lesson}
                      className={`rounded-2xl border transition-all overflow-hidden ${
                        isOpen
                          ? 'bg-white border-indigo-500/40 shadow-xl'
                          : 'bg-white border-slate-200 hover:border-slate-200'
                      }`}
                    >
                      {/* Lesson Header Row */}
                      <button
                        onClick={() => setExpandedLessonId(isOpen && !expandedAll ? null : lesson.lesson)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          {/* Lesson Badge */}
                          <div className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center font-black text-xs shrink-0 border shadow-inner ${
                            lesson.book === 1
                              ? 'bg-indigo-500/10 text-indigo-800 border-indigo-500/30'
                              : 'bg-purple-500/10 text-purple-800 border-purple-500/30'
                          }`}>
                            <span className="text-[9px] uppercase tracking-tighter text-slate-600 font-bold">과</span>
                            <span className="text-sm font-black -mt-1">{lesson.lesson}</span>
                          </div>

                          {/* Lesson Titles */}
                          <div className="min-w-0 space-y-0.5">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-base font-black text-[#2d2219] font-kr tracking-wide">
                                {lesson.titleKorean}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] text-slate-600 font-mono font-bold">
                                Book {lesson.book}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-900 border border-rose-200 border border-amber-500/20 text-[10px] font-bold">
                                {lesson.topicCategory}
                              </span>
                            </div>

                            <div className="text-xs text-slate-700 font-medium truncate">
                              {lesson.titleEnglish}
                            </div>
                            <div className="text-[11px] text-emerald-800 font-medium">
                              🇳🇵 {lesson.titleNepali}
                            </div>
                          </div>
                        </div>

                        {/* Chevron Icon */}
                        <div className="shrink-0 text-slate-600 p-2">
                          {isOpen ? <ChevronUp className="w-5 h-5 text-indigo-800" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                      </button>

                      {/* Expandable Lesson Details */}
                      {isOpen && (
                        <div className="p-5 pt-0 border-t border-slate-200 space-y-5 bg-white">

                          {/* Preparatory Note if any */}
                          {lesson.isPreparatory && lesson.preparatoryNote && (
                            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs leading-relaxed flex items-start gap-2.5">
                              <Lightbulb className="w-4 h-4 text-indigo-900 shrink-0 mt-0.5" />
                              <div>
                                <div className="font-black text-rose-800 mb-0.5 uppercase tracking-wider text-[10px]">Preparatory Orientation</div>
                                {lesson.preparatoryNote}
                              </div>
                            </div>
                          )}

                          {/* Vocabulary Topic Badge */}
                          <div className="flex items-center gap-2 text-xs bg-white p-3 rounded-xl border border-slate-200">
                            <BookOpen className="w-4 h-4 text-indigo-800 shrink-0" />
                            <span className="text-slate-600 font-bold">Vocabulary Topic:</span>
                            <span className="text-[#2d2219] font-bold font-kr">{lesson.vocabularyTopic}</span>
                          </div>

                          {/* Grammar Points Grid */}
                          {!lesson.isPreparatory && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                              {/* Grammar Point 1 */}
                              {lesson.grammarPoint1 && (
                                <div className="bg-white/80 border border-slate-200 rounded-2xl p-4 space-y-3">
                                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                                    <div className="text-xs font-black text-indigo-900 flex items-center gap-1.5">
                                      <span className="w-5 h-5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 flex items-center justify-center text-[10px] font-black">1</span>
                                      <span>{lesson.grammarPoint1.title}</span>
                                    </div>
                                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-900 border border-indigo-200 font-mono text-[11px] font-black border border-indigo-500/30">
                                      {lesson.grammarPoint1.pattern}
                                    </span>
                                  </div>

                                  <div className="space-y-1.5 text-xs">
                                    <p className="text-slate-700 leading-normal">{lesson.grammarPoint1.explanationEnglish}</p>
                                    <p className="text-emerald-800 font-medium">🇳🇵 {lesson.grammarPoint1.explanationNepali}</p>
                                  </div>

                                  {lesson.grammarPoint1.example && (
                                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm font-black text-rose-800 font-kr">
                                          {lesson.grammarPoint1.example.korean}
                                        </span>
                                        <button
                                          onClick={() => speakText(lesson.grammarPoint1!.example!.korean, 'ko-KR')}
                                          className="p-1 rounded-lg bg-indigo-900/50 hover:bg-indigo-600 text-indigo-900 hover:text-white transition-all cursor-pointer"
                                          title="Listen Korean Pronunciation"
                                        >
                                          <Volume2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                      <div className="text-[11px] text-slate-600 font-mono">{lesson.grammarPoint1.example.romanization}</div>
                                      <div className="text-xs text-slate-700">{lesson.grammarPoint1.example.english}</div>
                                      <div className="text-xs text-emerald-800">🇳🇵 {lesson.grammarPoint1.example.nepali}</div>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Grammar Point 2 */}
                              {lesson.grammarPoint2 && (
                                <div className="bg-white/80 border border-slate-200 rounded-2xl p-4 space-y-3">
                                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                                    <div className="text-xs font-black text-purple-900 flex items-center gap-1.5">
                                      <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-900 flex items-center justify-center text-[10px] font-black">2</span>
                                      <span>{lesson.grammarPoint2.title}</span>
                                    </div>
                                    <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-900 border border-purple-200 font-mono text-[11px] font-black border border-purple-500/30">
                                      {lesson.grammarPoint2.pattern}
                                    </span>
                                  </div>

                                  <div className="space-y-1.5 text-xs">
                                    <p className="text-slate-700 leading-normal">{lesson.grammarPoint2.explanationEnglish}</p>
                                    <p className="text-emerald-800 font-medium">🇳🇵 {lesson.grammarPoint2.explanationNepali}</p>
                                  </div>

                                  {lesson.grammarPoint2.example && (
                                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm font-black text-rose-800 font-kr">
                                          {lesson.grammarPoint2.example.korean}
                                        </span>
                                        <button
                                          onClick={() => speakText(lesson.grammarPoint2!.example!.korean, 'ko-KR')}
                                          className="p-1 rounded-lg bg-purple-900/50 hover:bg-purple-600 text-purple-900 hover:text-white transition-all cursor-pointer"
                                          title="Listen Korean Pronunciation"
                                        >
                                          <Volume2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                      <div className="text-[11px] text-slate-600 font-mono">{lesson.grammarPoint2.example.romanization}</div>
                                      <div className="text-xs text-slate-700">{lesson.grammarPoint2.example.english}</div>
                                      <div className="text-xs text-emerald-800">🇳🇵 {lesson.grammarPoint2.example.nepali}</div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          ) : (
            /* Japanese N3 / N5 / N4 Master Syllabus Breakdown */
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-800">
                    <BookOpen className="w-4 h-4 text-indigo-800" />
                    <span>Official Japanese JLPT Syllabus Explorer</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#2d2219] mt-1">
                    {level} Chapter-by-Chapter Curriculum &amp; Vocabulary Master
                  </h2>
                </div>
              </div>

              {level === 'N3' ? (
                <div className="space-y-4">
                  {N3_MASTER_SYLLABUS.map((ch) => (
                    <div key={ch.chapterNumber} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-black text-xs">
                            Chapter {ch.chapterNumber}
                          </span>
                          <h3 className="text-base font-black text-[#2d2219] font-jp">{ch.titleJapanese} — {ch.title}</h3>
                        </div>
                        <span className="text-xs text-slate-600 font-mono">{ch.theme}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="bg-white p-4 rounded-xl space-y-2">
                          <div className="font-bold text-indigo-900 uppercase tracking-wider text-[11px]">Core Vocabulary ({ch.vocabulary.length} Words)</div>
                          <div className="flex flex-wrap gap-1.5">
                            {ch.vocabulary.slice(0, 10).map((v, idx) => (
                              <span key={idx} className="px-2 py-1 rounded bg-white border border-slate-200 text-slate-200 font-jp font-bold">
                                {v.word} ({v.reading})
                              </span>
                            ))}
                            {ch.vocabulary.length > 10 && (
                              <span className="px-2 py-1 rounded bg-indigo-950 text-indigo-900 font-bold">+{ch.vocabulary.length - 10} more</span>
                            )}
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl space-y-2">
                          <div className="font-bold text-indigo-800 uppercase tracking-wider text-[11px]">Grammar Guides ({ch.grammarGuides.length} Rules)</div>
                          <div className="space-y-1">
                            {ch.grammarGuides.map((g, idx) => (
                              <div key={idx} className="text-slate-700 font-jp flex items-center gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                                <span>{g.pattern} — {g.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* N5 / N4 / JFT Units */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { unit: 'Unit 1: Fundamentals', desc: 'Greetings, Hiragana/Katakana, Noun + です / ではありません, Particles は, が, を, に.' },
                    { unit: 'Unit 2: Daily Life & Verbs', desc: 'Present/Past tense verbs (~ます, ~ました), time expressions, destination particles (へ, で, から, まで).' },
                    { unit: 'Unit 3: Adjectives & Requests', desc: 'い-adjectives & な-adjectives conjugation, ~てください polite requests, ~たい desire form.' },
                    { unit: 'Unit 4: Te-form Connections', desc: 'Te-form verb inflections (~ています, ~てもいいです, ~てはいけません), sentence connectors.' },
                    { unit: 'Unit 5: Expressions & Ability', desc: 'Short forms, plain speech, ~ことができる ability, ~たことがある experience form.' },
                    { unit: 'Unit 6: Mock Exams & Revision', desc: 'Full exam simulation, kanji radical breakdown, reading passage speed drills.' }
                  ].map((u, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-black uppercase">
                        Module 0{idx + 1}
                      </span>
                      <h3 className="text-sm font-black text-[#2d2219]">{u.unit}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{u.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: OVERVIEW & STRATEGY (ORIGINAL HIGH-YIELD OVERVIEW)   */}
      {/* ============================================================ */}
      {activeGuideTab === 'OVERVIEW' && (
        <div className="space-y-6">
          {/* 2. Official Benchmarks Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-1">
              <div className="text-[11px] font-extrabold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-rose-700" /> Passing Mark
              </div>
              <div className="text-lg sm:text-xl font-black text-rose-900">{currentExam.passingScore}</div>
              <div className="text-[10px] text-slate-500 font-medium">Min Threshold: {currentExam.passPercentage}</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xl space-y-1">
              <div className="text-[11px] font-extrabold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-700" /> Vocabulary Goal
              </div>
              <div className="text-lg sm:text-xl font-black text-indigo-950">{currentExam.vocabCount}</div>
              <div className="text-[10px] text-slate-500 font-medium">4-Column Vocab Sheets</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xl space-y-1">
              <div className="text-[11px] font-extrabold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-700" /> Syllabus Scope
              </div>
              <div className="text-lg sm:text-xl font-black text-purple-950">{currentExam.kanjiCount}</div>
              <div className="text-[10px] text-slate-500 font-medium">HRD Lessons / Kanji Target</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xl space-y-1">
              <div className="text-[11px] font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-700" /> Study Hours
              </div>
              <div className="text-lg sm:text-xl font-black text-emerald-950">{currentExam.studyHours}</div>
              <div className="text-[10px] text-slate-500 font-medium">Recommended Prep Time</div>
            </div>
          </div>

          {/* 3. Exam Booklet & Section Breakdown */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-800">
                  <FileText className="w-4 h-4 text-indigo-800" />
                  <span>Official Booklet Structure</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#2d2219] mt-1">Exam Sections &amp; Time Limits</h2>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white text-slate-600 text-xs font-mono border border-slate-200">
                Format: {currentExam.examFormat}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentExam.papers.map((paper: any, idx: number) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-inner">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h3 className="text-sm font-black text-rose-800">{paper.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold border border-indigo-500/30">
                      {paper.duration}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 font-mono">Total Questions: {paper.questions}</div>

                  <ul className="space-y-2 text-xs text-slate-700">
                    {paper.sections.map((sec: string, sIdx: number) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                        <span>{sec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Tips & Tricks to Pass First Try */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-900">
              <Zap className="w-4 h-4 text-indigo-900" />
              <span>High-Yield Strategy</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2d2219]">Proven Tips &amp; Tricks to Pass {currentExam.levelCode}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentExam.tricks.map((trick: string, tIdx: number) => (
                <div key={tIdx} className="bg-white border border-amber-500/20 hover:border-amber-500/40 rounded-2xl p-4 flex items-start gap-3 transition-all">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-indigo-900 flex items-center justify-center font-black text-sm shrink-0 border border-amber-500/20">
                    0{tIdx + 1}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed pt-1">
                    {trick}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Custom Study Plan Generator */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                  <Target className="w-4 h-4 text-emerald-800" />
                  <span>Interactive Roadmap Generator</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#2d2219] mt-1">Recommended Study Schedule</h2>
              </div>

              {/* Pace Selector */}
              <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200">
                {(['30', '60', '90'] as const).map((pace) => (
                  <button
                    key={pace}
                    onClick={() => setStudyPace(pace)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${studyPace === pace
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-glow'
                        : 'text-slate-600 hover:text-white'
                      }`}
                  >
                    {pace} Days Pace
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {getStudySchedule().map((item, iIdx) => (
                <div key={iIdx} className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 shadow-inner">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-900 text-[10px] font-black uppercase border border-emerald-500/30">
                    {item.days}
                  </span>
                  <h3 className="text-sm font-black text-[#2d2219]">{item.goal}</h3>
                  <p className="text-xs text-slate-600 leading-normal">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      </div>
  );
};
