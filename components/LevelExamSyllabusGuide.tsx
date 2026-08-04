'use client';

import React, { useState } from 'react';
import {
  Award, BookOpen, Clock, Target, Sparkles, CheckCircle2,
  Zap, FileText, Headphones, Layers, HelpCircle, ArrowRight,
  ShieldCheck, Calendar, ChevronRight, BarChart3, Star
} from 'lucide-react';
import { LevelType } from './LevelHubDashboard';

export type ExtendedLevelType = LevelType | 'EPS' | 'EPS_MFG' | 'EPS_AGR' | 'EPS_CON' | 'EPS_FISH' | 'EPS_SAFETY' | 'TOPIK1_L1' | 'TOPIK2' | 'TOPIK3' | 'TOPIK4' | 'TOPIK2_L5' | 'TOPIK2_L6';

interface LevelExamSyllabusGuideProps {
  level: string;
  onSelectTab?: (tab: 'VOCABULARY' | 'FLASHCARDS' | 'EXAMS') => void;
}

export const LevelExamSyllabusGuide: React.FC<LevelExamSyllabusGuideProps> = ({ level, onSelectTab }) => {
  const [studyPace, setStudyPace] = useState<'30' | '60' | '90'>('60');

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
      title: 'JLPT N2 Advanced Examination Guide',
      japaneseTitle: '日本語能力試験 N2 試験概要',
      levelCode: 'JLPT N2 (Pre-Advanced)',
      passingScore: '90 / 180 Points',
      passPercentage: '50.0%',
      vocabCount: '6,000+ Words',
      kanjiCount: '1,000 Kanji Characters',
      studyHours: '600 Hours',
      examFormat: '2 Paper Sections (Vocab/Grammar/Reading, Listening)',
      papers: [
        {
          name: 'Paper 1: Language Knowledge & Reading',
          duration: '105 Minutes',
          questions: '60 Questions (120 Marks)',
          sections: ['Advanced Kanji & Vocab', 'Grammar in Context', 'Long Essay Reading', 'Business Article Analysis']
        },
        {
          name: 'Paper 2: Listening Comprehension',
          duration: '50 Minutes',
          questions: '30 Questions (60 Marks)',
          sections: ['Task, Point, Summary & Integrated Listening']
        }
      ],
      tricks: [
        'Required for full-time Japanese corporate employment and medical visa pathways.'
      ]
    },
    N1: {
      title: 'JLPT N1 Native Fluency Examination Guide',
      japaneseTitle: '日本語能力試験 N1 最高峰試験概要',
      levelCode: 'JLPT N1 (Native Mastery)',
      passingScore: '100 / 180 Points',
      passPercentage: '55.5%',
      vocabCount: '10,000+ Words',
      kanjiCount: '2,000 Kanji Characters',
      studyHours: '900+ Hours',
      examFormat: '2 Paper Sections (Vocab/Grammar/Reading, Listening)',
      papers: [
        {
          name: 'Paper 1: Language Knowledge & Reading',
          duration: '110 Minutes',
          questions: '70 Questions (120 Marks)',
          sections: ['Literary & Editorial Reading', 'Complex Keigo Honorifics', 'Classical Expressions']
        },
        {
          name: 'Paper 2: Listening Comprehension',
          duration: '60 Minutes',
          questions: '35 Questions (60 Marks)',
          sections: ['Fast-paced News Broadcasts, Panel Debates & Implied Nuances']
        }
      ],
      tricks: [
        'Highest certification level in Japanese language proficiency.'
      ]
    },

    // ── KOREAN EXAM LEVELS ──
    EPS: {
      title: 'EPS-TOPIK 60-Lesson Employment Examination & Syllabus Guide',
      japaneseTitle: '고용허가제 한국어능력시험 (EPS-TOPIK) 60과 시라버스',
      levelCode: 'EPS-TOPIK (E-9 Working Visa Benchmark)',
      passingScore: '110 / 200 Points',
      passPercentage: '55.0%',
      vocabCount: '2,500+ Workplace Words',
      kanjiCount: '60 Workplace Grammar Rules',
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
  }[level] || {
    title: `JLPT ${level} Examination & Syllabus Guide`,
    japaneseTitle: `日本語能力試験 ${level} 概要`,
    levelCode: `JLPT ${level}`,
    passingScore: '90 / 180 Points',
    passPercentage: '50%',
    vocabCount: '1,500+ Words',
    kanjiCount: '300 Kanji',
    studyHours: '200 Hours',
    examFormat: '2 Paper Booklets',
    papers: [],
    tricks: ['Practice daily SRS flashcards and timed mock tests.']
  };

  // Dynamic 30/60/90 Study Plan Roadmap
  const getStudySchedule = () => {
    if (studyPace === '30') {
      return [
        { days: 'Days 1 – 10', goal: 'Curriculum Speed Run', detail: 'Complete 3 lessons per day with 4-column vocabulary notes and Kanji radical inspector.' },
        { days: 'Days 11 – 20', goal: 'SRS Flashcard Intensive', detail: 'Review 40 cards daily on Japanese First mode. Focus on particles and short form conjugations.' },
        { days: 'Days 21 – 28', goal: 'Timed Mock Test Sets', detail: 'Complete 1 full timed mock test every 2 days under strict section-locking timer.' },
        { days: 'Days 29 – 30', goal: 'Final Error Audit & Relaxation', detail: 'Review incorrect answers in heatmap log and review tricks to pass.' }
      ];
    }
    if (studyPace === '90') {
      return [
        { days: 'Days 1 – 30', goal: 'Comprehensive Lesson Learning', detail: 'Master 1 lesson every 2 days. Practice stroke order and native audio tracks.' },
        { days: 'Days 31 – 60', goal: 'Grammar Deep Dive & SRS Retention', detail: 'Daily flashcard review of 20 cards. Complete grammar ordering exercises.' },
        { days: 'Days 61 – 80', goal: 'Reading & Listening Comprehension', detail: 'Read 2 short passages daily and practice audio CD dialogues.' },
        { days: 'Days 81 – 90', goal: 'Full Mock Test Battery', detail: 'Take 4 full mock exams under authentic timed conditions.' }
      ];
    }
    // Default 60 Days
    return [
      { days: 'Days 1 - 20', goal: 'Core Vocabulary & Grammar', detail: 'Learn 20 words and 2 grammar points daily.' },
      { days: 'Days 21 - 40', goal: 'Reading & Audio Practice', detail: 'Complete listening dialogues and reading passages.' },
      { days: 'Days 41 - 50', goal: 'SRS Review & Weak Areas', detail: 'Focus on flashcard retention and error logs.' },
      { days: 'Days 51 - 60', goal: 'Full Mock Test Battery', detail: 'Take full-length timed mock exams.' }
    ];
  };

  const currentExam = (examData as any)[level] ?? (examData as any)['N5'];

  // Defensive guard: if level is unknown/transitioning (e.g., BASICS), render nothing
  if (!currentExam || !currentExam.levelCode) return null;

  return (
    <div className="w-full font-sans space-y-6 animate-fade-in">

      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase tracking-wider">
                Official Examination Hub
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
                {currentExam.levelCode}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {currentExam.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              {currentExam.japaneseTitle}
            </p>
          </div>

          {/* Quick Action Navigation */}
          {onSelectTab && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
              <button
                onClick={() => onSelectTab('EXAMS')}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-black text-xs shadow-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Clock className="w-4 h-4" />
                <span>Start Timed Mock Test</span>
              </button>
              <button
                onClick={() => onSelectTab('FLASHCARDS')}
                className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-rose-300 font-black text-xs border border-rose-500/30 hover:border-rose-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-rose-400" />
                <span>Open Flashcards</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Official Benchmarks Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" /> Passing Mark
          </div>
          <div className="text-lg sm:text-xl font-black text-amber-400">{currentExam.passingScore}</div>
          <div className="text-[10px] text-slate-500 font-medium">Min Threshold: {currentExam.passPercentage}</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Vocabulary Goal
          </div>
          <div className="text-lg sm:text-xl font-black text-white">{currentExam.vocabCount}</div>
          <div className="text-[10px] text-slate-500 font-medium">4-Column Vocab Sheets</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" /> Kanji Required
          </div>
          <div className="text-lg sm:text-xl font-black text-rose-300">{currentExam.kanjiCount}</div>
          <div className="text-[10px] text-slate-500 font-medium">Stroke Order &amp; Radicals</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-400" /> Study Hours
          </div>
          <div className="text-lg sm:text-xl font-black text-emerald-300">{currentExam.studyHours}</div>
          <div className="text-[10px] text-slate-500 font-medium">Recommended Prep Time</div>
        </div>
      </div>

      {/* 3. Exam Booklet & Section Breakdown */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Official Booklet Structure</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">Exam Sections &amp; Time Limits</h2>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-slate-950 text-slate-400 text-xs font-mono border border-slate-800">
            Format: {currentExam.examFormat}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentExam.papers.map((paper: any, idx: number) => (
            <div key={idx} className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 space-y-4 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <h3 className="text-sm font-black text-amber-300">{paper.name}</h3>
                <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                  {paper.duration}
                </span>
              </div>

              <div className="text-xs text-slate-400 font-mono">Total Questions: {paper.questions}</div>

              <ul className="space-y-2 text-xs text-slate-300">
                {paper.sections.map((sec: string, sIdx: number) => (
                  <li key={sIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{sec}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Tips & Tricks to Pass First Try */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>High-Yield Strategy</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">Proven Tips &amp; Tricks to Pass {currentExam.levelCode}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentExam.tricks.map((trick: string, tIdx: number) => (
            <div key={tIdx} className="bg-slate-950/80 border border-amber-500/20 hover:border-amber-500/40 rounded-2xl p-4 flex items-start gap-3 transition-all">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-black text-sm shrink-0 border border-amber-500/20">
                0{tIdx + 1}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {trick}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Custom Study Plan Generator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>Interactive Roadmap Generator</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">Recommended Study Schedule</h2>
          </div>

          {/* Pace Selector */}
          <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800">
            {(['30', '60', '90'] as const).map((pace) => (
              <button
                key={pace}
                onClick={() => setStudyPace(pace)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${studyPace === pace
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-glow'
                    : 'text-slate-400 hover:text-white'
                  }`}
              >
                {pace} Days Pace
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {getStudySchedule().map((item, iIdx) => (
            <div key={iIdx} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2 shadow-inner">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase border border-emerald-500/30">
                {item.days}
              </span>
              <h3 className="text-sm font-black text-white">{item.goal}</h3>
              <p className="text-xs text-slate-400 leading-normal">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
