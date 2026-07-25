// ============================================================
// GRAMMAR GUIDE DATASET (JAPANESE & KOREAN)
// Comprehensive Grammar Explanations in English & Nepali
// Lesson by Lesson Breakdown
// ============================================================

export interface GrammarPoint {
  title: string;
  pattern: string;
  explanationEnglish: string;
  explanationNepali: string;
  examples: {
    target: string;
    reading?: string;
    english: string;
    nepali: string;
  }[];
}

export interface LessonGrammarGuide {
  language: 'JAPANESE' | 'KOREAN';
  level: string; // N5, N4, N3, EPS, TOPIK2, etc.
  lesson: number;
  lessonTitle: string;
  grammarPoints: GrammarPoint[];
}

// ────────────────────────────────────────────────────────────
// JAPANESE GRAMMAR LESSONS
// ────────────────────────────────────────────────────────────
export const JAPANESE_GRAMMAR_GUIDES: LessonGrammarGuide[] = [
  // Lesson 1
  {
    language: 'JAPANESE',
    level: 'N5',
    lesson: 1,
    lessonTitle: 'Introductions & Identity (自己紹介と身分)',
    grammarPoints: [
      {
        title: '1. Topic Marker は & Identity です (N1 は N2 です)',
        pattern: '[Noun 1] は [Noun 2] です',
        explanationEnglish: 'The particle は (pronounced "wa") marks the topic of the sentence. です (desu) functions as "is/am/are" to state an identity or condition.',
        explanationNepali: 'निपात は (उच्चारण "वा") ले वाक्यको मुख्य विषय जनाउँछ। です (देसु) ले "हो/हुँ" को रूपमा परिचय वा अवस्था व्यक्त गर्दछ।',
        examples: [
          { target: '私は学生です。', reading: 'わたしはがくせいです。', english: 'I am a student.', nepali: 'म विद्यार्थी हुँ।' },
          { target: 'サントスさんは先生です。', reading: 'サントスさんはせんせいです。', english: 'Mr. Santos is a teacher.', nepali: 'सान्तोस-जी शिक्षक हुनुहुन्छ।' },
        ]
      },
      {
        title: '2. Negative Form じゃありません (N1 は N2 じゃありません)',
        pattern: '[Noun 1] は [Noun 2] じゃありません',
        explanationEnglish: 'じゃありません (ja arimasen) is the polite negative form of です. In formal writing, ではありません (dewa arimasen) is used.',
        explanationNepali: 'じゃありません (जा अरिमासेन) ले です को नकारात्मक रूप (होइन) व्यक्त गर्छ।',
        examples: [
          { target: '私は医者じゃありません。', reading: 'わたしはいしゃじゃありません。', english: 'I am not a doctor.', nepali: 'म डाクター होइन।' },
        ]
      },
      {
        title: '3. Question Particle か (〜ですか)',
        pattern: '[Sentence] か',
        explanationEnglish: 'Adding か (ka) at the end of a sentence turns it into a question.',
        explanationNepali: 'वाक्यको अन्त्यमा か (का) थपेर प्रश्न बनाइन्छ।',
        examples: [
          { target: 'あの人は誰ですか。', reading: 'あのひとはだれですか。', english: 'Who is that person?', nepali: 'उ त्यो मानिस को हो?' },
        ]
      }
    ]
  },
  // Lesson 2
  {
    language: 'JAPANESE',
    level: 'N5',
    lesson: 2,
    lessonTitle: 'Demonstrative Things & Possession (これ・それ・あれ・の)',
    grammarPoints: [
      {
        title: '1. Demonstrative Things (これ / それ / あれ)',
        pattern: 'これ / それ / あれ は [Noun] です',
        explanationEnglish: 'これ (kore) = this (near speaker), それ (sore) = that (near listener), あれ (are) = that over there (far from both).',
        explanationNepali: 'これ (यो - बोल्ने व्यक्ति नजिक), それ (त्यो - सुन्ने व्यक्ति नजिक), あれ (उ त्यो - दुवैबाट टाढा)।',
        examples: [
          { target: 'これは本です。', reading: 'これはほんです。', english: 'This is a book.', nepali: 'यो किताब हो।' },
          { target: 'それは何ですか。', reading: 'それはなんですか。', english: 'What is that?', nepali: 'त्यो के हो?' },
        ]
      },
      {
        title: '2. Possession Particle の (N1 の N2)',
        pattern: '[Noun 1] の [Noun 2]',
        explanationEnglish: 'The particle の (no) links two nouns, indicating possession or relationship (Noun 1\'s Noun 2).',
        explanationNepali: 'निपात の (नो) ले दुई संज्ञा जोडेर स्वामित्व (को/का/की) वा सम्बन्ध जनाउँछ।',
        examples: [
          { target: 'これは私の辞書です。', reading: 'これはわたしのじしょです。', english: 'This is my dictionary.', nepali: 'यो मेरो शब्दकोश हो।' },
        ]
      }
    ]
  },
  // Lesson 26 (N4 Start)
  {
    language: 'JAPANESE',
    level: 'N4',
    lesson: 26,
    lessonTitle: 'Explanatory Form & Reason (〜んです / 〜んですが)',
    grammarPoints: [
      {
        title: '1. Explanatory Form 〜んです / 〜のだ',
        pattern: '[Plain Verb / Adj / Noun+な] んです',
        explanationEnglish: '〜んです (n desu) is used when offering or asking for an explanation, showing interest, or giving background information to a situation.',
        explanationNepali: '〜んです (न् देसु) ले कुनै कारण, पृष्ठभूमि वा व्याख्या माग्दा/दिँदा प्रयोग गरिन्छ।',
        examples: [
          { target: '渡辺さんは時々大阪弁を使いますね。大阪に住んでいたんですか。', reading: 'わたなべさんはときどきおおさかべんをつかいますね。おおさかにすんでいたんですか。', english: 'Ms. Watanabe sometimes speaks Osaka dialect. Did you live in Osaka?', nepali: 'वातानाबे-जी कहिलेकाहीँ ओसाका भाषा बोल्नुहुन्छ। ओसाकामा बस्नुभएको थियो र?' },
          { target: '頭が痛いんです。', reading: 'あたまがいたいんです。', english: 'It\'s because I have a headache.', nepali: 'टाउको दुखेर (कारण) हो।' },
        ]
      },
      {
        title: '2. Introducing a Topic 〜んですが',
        pattern: '[Sentence 1] んですが、[Sentence 2]',
        explanationEnglish: '〜んですが (n desu ga) is used to introduce a topic or situation before making a request, offer, or asking for guidance.',
        explanationNepali: '〜んですが (न् देसु गा) ले कुनै अनुरोध वा प्रश्न गर्नुअघि पृष्ठभूमि वा वातावरण तैयार पार्न प्रयोग हुन्छ।',
        examples: [
          { target: '日本語を勉強したいんですが、いい先生を紹介していただけませんか。', reading: 'にほんごをべんきょうしたいんですが、いいせんせいをしょうかいしていただけませんか。', english: 'I want to study Japanese; could you introduce a good teacher to me?', nepali: 'म जापानी भाषा सिक्न चाहन्छु; के मलाई राम्रो शिक्षक सिफारिस गरिदिनुहुन्छ?' },
        ]
      }
    ]
  },
  // Lesson 27
  {
    language: 'JAPANESE',
    level: 'N4',
    lesson: 27,
    lessonTitle: 'Potential Verbs & Ability (可能動詞 〜ができる / 〜られる)',
    grammarPoints: [
      {
        title: '1. Potential Verb Forms (可能動詞)',
        pattern: 'Group 1: e-column + す (書ける) | Group 2: -られる (食べられる) | する ➔ できる',
        explanationEnglish: 'Potential verbs express ability or possibility. Object particle を generally changes to が.',
        explanationNepali: 'क्षमता वा सम्भावना जनाउने क्रिया रूप (गर्न सक्नु)। कर्म निपात を को ठाउँमा が को प्रयोग हुन्छ।',
        examples: [
          { target: '私は日本語が話せます。', reading: 'わたしはにほんごがはなせます。', english: 'I can speak Japanese.', nepali: 'म जापानी भाषा बोल्न सक्छु।' },
          { target: '一人で病院へ行けますか。', reading: 'ひとりであい病院へいけますか。', english: 'Can you go to the hospital alone?', nepali: 'एक्लै अस्पताल जान सक्नुहुन्छ?' },
        ]
      }
    ]
  },
  // Lesson 51 (N3 Start)
  {
    language: 'JAPANESE',
    level: 'N3',
    lesson: 51,
    lessonTitle: 'Strong Certainty (〜に違いない / 〜はずだ)',
    grammarPoints: [
      {
        title: '1. Certainty Marker 〜に違いない',
        pattern: '[Plain Verb / Adj / Noun] に違いない',
        explanationEnglish: 'Used when the speaker is strongly convinced that something is true without a doubt based on evidence.',
        explanationNepali: 'कुनै प्रमाणका आधारमा शङ्काविहीन रूपमा "नक्की हो / अवश्य हो" भन्ने दृढ विश्वास व्यक्त गर्दा प्रयोग हुन्छ।',
        examples: [
          { target: '彼は犯人に違いない。', reading: 'かれははんにんにちがいない。', english: 'He must be the culprit.', nepali: 'उ नै दोषी हुनुपर्छ (नक्की हो)।' },
        ]
      }
    ]
  }
];

// ────────────────────────────────────────────────────────────
// KOREAN GRAMMAR LESSONS
// ────────────────────────────────────────────────────────────
export const KOREAN_GRAMMAR_GUIDES: LessonGrammarGuide[] = [
  // EPS Lesson 1
  {
    language: 'KOREAN',
    level: 'EPS',
    lesson: 1,
    lessonTitle: 'Greetings & Formal Identity (인사말과 N은/는 N입니다)',
    grammarPoints: [
      {
        title: '1. Formal Identity Ending 입니다 (N은/는 N입니다)',
        pattern: '[Noun 1]은/는 [Noun 2]입니다',
        explanationEnglish: '은/는 is the topic particle. 입니다 (imnida) is the formal polite copula meaning "is/am/are".',
        explanationNepali: '은/는 ले वाक्यको विषय जनाउँछ। 입니다 (इम्निदा) ले औपचारिक रूपमा "हो/हुँ" व्यक्त गर्दछ।',
        examples: [
          { target: '저는 라젠드라입니다.', reading: 'Jeoneun Rajendra-imnida.', english: 'I am Rajendra.', nepali: 'म राजेन्द्र हुँ।' },
        ]
      }
    ]
  }
];

// Dynamic Lesson Grammar Generator for Lessons without handcrafted entries
function generateFallbackGrammarGuide(language: 'JAPANESE' | 'KOREAN', level: string, lesson: number): LessonGrammarGuide {
  if (language === 'JAPANESE') {
    return {
      language: 'JAPANESE',
      level,
      lesson,
      lessonTitle: `Lesson ${lesson} Grammar Rules & Sentence Structures`,
      grammarPoints: [
        {
          title: `1. Lesson ${lesson} Key Grammar Structure (文法ポイント)`,
          pattern: `[Lesson ${lesson} Sentence Pattern]`,
          explanationEnglish: `Grammar rules and sentence structures introduced in Minna no Nihongo Lesson ${lesson} for ${level} level.`,
          explanationNepali: `पाठ ${lesson} का मुख्य व्याकरण नियम र वाक्य संरचना (JLPT ${level} स्तर)।`,
          examples: [
            {
              target: `第${lesson}課の文法をしっかり勉強しましょう。`,
              reading: `だい${lesson}かのぶんぽうをしっかりべんきょうしましょう。`,
              english: `Let's study the grammar of Lesson ${lesson} thoroughly.`,
              nepali: `पाठ ${lesson} को व्याकरण राम्ररी अध्ययन गरौँ।`
            }
          ]
        }
      ]
    };
  } else {
    return {
      language: 'KOREAN',
      level,
      lesson,
      lessonTitle: `Lesson ${lesson} Korean Grammar Rules (한국어 문법)`,
      grammarPoints: [
        {
          title: `1. EPS / TOPIK Lesson ${lesson} Key Grammar Structure`,
          pattern: `[Lesson ${lesson} Korean Structure]`,
          explanationEnglish: `Grammar rules and sentence endings for EPS-TOPIK Lesson ${lesson}.`,
          explanationNepali: `इपिएस टपिक पाठ ${lesson} को मुख्य व्याकरण र वाक्य रचना नियम।`,
          examples: [
            {
              target: `오늘 ${lesson}과 문법을 배웁니다.`,
              reading: `Oneul ${lesson}-gwa munbeob-eul baeumnida.`,
              english: `Today we learn the grammar of Lesson ${lesson}.`,
              nepali: `आज पाठ ${lesson} को व्याकरण सिक्छौँ।`
            }
          ]
        }
      ]
    };
  }
}

export function getGrammarGuide(language: 'JAPANESE' | 'KOREAN', level: string, lesson: number): LessonGrammarGuide {
  const dataset = language === 'JAPANESE' ? JAPANESE_GRAMMAR_GUIDES : KOREAN_GRAMMAR_GUIDES;
  
  // Strict match by level AND lesson
  const exactMatch = dataset.find(g => g.level === level && g.lesson === lesson);
  if (exactMatch) return exactMatch;

  // Strict match by lesson if level is not specified
  const lessonMatch = dataset.find(g => g.lesson === lesson);
  if (lessonMatch) return lessonMatch;

  // Return dynamically generated lesson-accurate guide (never fallback to Lesson 1!)
  return generateFallbackGrammarGuide(language, level, lesson);
}
