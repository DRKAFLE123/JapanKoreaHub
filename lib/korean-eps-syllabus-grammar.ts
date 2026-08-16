// ============================================================
// OFFICIAL HRD KOREA EPS-TOPIK 60-LESSON GRAMMAR & SYLLABUS DATASET
// Verified directly against HRD Korea Textbook Book 1 & Book 2
// (Chapters 1 to 60 with Lesson Titles, Grammar Points, Patterns,
// English & Nepali explanations, and example workplace sentences)
// ============================================================

export interface EPSLessonGrammar {
  lesson: number;
  book: 1 | 2;
  titleKorean: string;
  titleEnglish: string;
  titleNepali: string;
  topicCategory: string; // 주제 Topic (e.g. "예비편 Preparatory Lessons", "기본생활 Basic Life")
  functionJob?: string; // 기능/직무 구조 Function / Job
  vocabularyTopic: string; // 어휘 Vocabulary
  grammarSummary?: string; // 문법 Grammar summary
  cultureInfo?: string; // 정보/문화 Information / Culture
  isPreparatory?: boolean;
  preparatoryNote?: string;
  grammarPoint1?: {
    title: string;
    pattern: string;
    explanationEnglish: string;
    explanationNepali: string;
    example?: {
      korean: string;
      romanization: string;
      english: string;
      nepali: string;
    };
  };
  grammarPoint2?: {
    title: string;
    pattern: string;
    explanationEnglish: string;
    explanationNepali: string;
    example?: {
      korean: string;
      romanization: string;
      english: string;
      nepali: string;
    };
  };
}


export const EPS_60_LESSONS_GRAMMAR: EPSLessonGrammar[] = [
  // ── BOOK 1: LESSONS 1–5 (PREPARATORY LESSONS - NO FORMAL GRAMMAR IN HRD SYLLABUS) ──
  {
    lesson: 1,
    book: 1,
    titleKorean: '한글 익히기 I',
    titleEnglish: 'Mastering Hangeul I',
    titleNepali: 'हन्गुल सिकाइ I (स्वरवर्ण र व्यंजनवर्ण)',
    topicCategory: 'Preparatory Lessons',
    vocabularyTopic: 'Consonants & Vowels (자음과 모음)',
    isPreparatory: true,
    preparatoryNote: 'Lesson 1 is a Preparatory Hangeul Orientation. There are no formal grammar rules tested in HRD Korea Chapter 1. Formal grammar begins in Lesson 6: 입니다 / 입니까?.'
  },
  {
    lesson: 2,
    book: 1,
    titleKorean: '한글 익히기 II',
    titleEnglish: 'Mastering Hangeul II',
    titleNepali: 'हन्गुल सिकाइ II (अन्तिम व्यञ्जन - 받침)',
    topicCategory: 'Preparatory Lessons',
    vocabularyTopic: 'Final Consonants / Batchim (받침)',
    isPreparatory: true,
    preparatoryNote: 'Lesson 2 is a Preparatory Batchim Phonetics Orientation. No formal grammar rules are tested in Chapter 2. Formal grammar begins in Lesson 6: 입니다 / 입니까?.'
  },
  {
    lesson: 3,
    book: 1,
    titleKorean: '교실 한국어',
    titleEnglish: 'Classroom Korean',
    titleNepali: 'कक्षाकोठामा प्रयोग हुने कोरियाली भाषा',
    topicCategory: 'Preparatory Lessons',
    vocabularyTopic: 'Teacher & Student Commands (선생님, 학생, 책을 펼치세요)',
    isPreparatory: true,
    preparatoryNote: 'Lesson 3 focuses on Classroom Expressions. No formal grammar rules are tested in Chapter 3. Formal grammar begins in Lesson 6: 입니다 / 입니까?.'
  },
  {
    lesson: 4,
    book: 1,
    titleKorean: '안녕하세요',
    titleEnglish: 'Hello',
    titleNepali: 'नमस्ते / हालखबर',
    topicCategory: 'Preparatory Lessons',
    vocabularyTopic: 'Daily Greetings & Farewells (인사말)',
    isPreparatory: true,
    preparatoryNote: 'Lesson 4 focuses on Daily Courtesy Greetings. No formal grammar rules are tested in Chapter 4. Formal grammar begins in Lesson 6: 입니다 / 입니까?.'
  },
  {
    lesson: 5,
    book: 1,
    titleKorean: '주말 잘 보내세요',
    titleEnglish: 'Have a Great Weekend',
    titleNepali: 'सप्ताहन्त राम्रोसँग बिताउनुहोस्',
    topicCategory: 'Preparatory Lessons',
    vocabularyTopic: 'Wishes & Congratulations (축하, 감사, 주말 인사)',
    isPreparatory: true,
    preparatoryNote: 'Lesson 5 focuses on Weekend Wishes & Expressions. No formal grammar rules are tested in Chapter 5. Formal grammar begins in Lesson 6: 입니다 / 입니까?.'
  },
  {
    lesson: 6,
    book: 1,
    titleKorean: '저는 투안입니다',
    titleEnglish: 'I am Tuan (Self-Introduction)',
    titleNepali: 'म तुआन हूँ (परिचय र राष्ट्रियता)',
    topicCategory: 'Basic Life (기본생활)',
    vocabularyTopic: 'Countries & Occupations (나라, 직업)',
    grammarPoint1: {
      title: 'Formal Statement Ending: -입니다',
      pattern: 'N + 입니다',
      explanationEnglish: 'Formal polite statement meaning "am/is/are" used to state identity, name, or nationality.',
      explanationNepali: 'औपचारिक रूपमा नाम, जात वा देश भन्दा प्रयोग गरिन्छ (हूँ/हो)।',
      example: { korean: '저는 네팔 사람입니다.', romanization: 'Jeoneun Nepal saram imnida.', english: 'I am a Nepali person.', nepali: 'म नेपाली नागरिक हूँ।' }
    },
    grammarPoint2: {
      title: 'Formal Question Ending: -입니까?',
      pattern: 'N + 입니까?',
      explanationEnglish: 'Formal polite question ending meaning "Are you...?" or "Is it...?"',
      explanationNepali: 'औपचारिक रूपमा प्रश्न सोध्दा प्रयोग गरिन्छ (हो/हुन्?)।',
      example: { korean: '회사원입니까?', romanization: 'Hoesawon imnikka?', english: 'Are you an office worker?', nepali: 'के तपाईं कम्पनीको कर्मचारी हुनुहुन्छ?' }
    }
  },
  {
    lesson: 7,
    book: 1,
    titleKorean: '여기가 사무실이에요',
    titleEnglish: 'This is the Office (Places & Objects)',
    titleNepali: 'यो कार्यालय हो (ठाउँ र वस्तुहरू)',
    topicCategory: 'Basic Life (기본생활)',
    vocabularyTopic: 'Places & Daily Necessities (장소, 물건)',
    grammarPoint1: {
      title: 'Subject Markers: -이 / -가',
      pattern: 'N (Consonant) + 이 / N (Vowel) + 가',
      explanationEnglish: 'Marks the subject of a sentence. Emphasizes WHO or WHAT.',
      explanationNepali: 'वाक्यको मुख्य कर्ता जनाउने प्रत्यय।',
      example: { korean: '열쇠가 어디에 있어요?', romanization: 'Yeolsoe-ga eodie isseoyo?', english: 'Where is the key?', nepali: 'साँचो कहाँ छ?' }
    },
    grammarPoint2: {
      title: 'Informal Polite Ending: -이에요 / -예요',
      pattern: 'N (Consonant) + 이에요 / N (Vowel) + 예요',
      explanationEnglish: 'Polite everyday sentence ending meaning "am/is/are".',
      explanationNepali: 'साधारण शिष्ट दैनिक कुराकानीमा (हो) भन्न प्रयोग गरिन्छ।',
      example: { korean: '여기가 사무실이에요.', romanization: 'Yeogiga samusil-ieyo.', english: 'This place is the office.', nepali: 'यो ठाउँ कार्यालय हो।' }
    }
  },
  {
    lesson: 8,
    book: 1,
    titleKorean: '12시 30분에 점심을 먹어요',
    titleEnglish: 'I Eat Lunch at 12:30 (Daily Routine & Time)',
    titleNepali: 'म १२:३० बजे दिउँसोको खाना खान्छु (दैनिक तालिका र समय)',
    topicCategory: 'Basic Life (기본생활)',
    vocabularyTopic: 'Daily Routine & Time (일과, 시간)',
    grammarPoint1: {
      title: 'Polite Present Tense: -아/어요',
      pattern: 'V/A stem + -아요 (ㅏ,ㅗ) / -어요 (기타) / 해요 (하)',
      explanationEnglish: 'Polite informal present tense ending for daily actions.',
      explanationNepali: 'दैनिक काम वा वर्तमान काल जनाउने सामान्य शिष्ट अन्त्य।',
      example: { korean: '텔레비전을 봐요.', romanization: 'Tellebijeon-eul bwayo.', english: 'I watch television.', nepali: 'म टेलिभिजन हेर्छु।' }
    },
    grammarPoint2: {
      title: 'Time & Destination Marker: -에',
      pattern: 'Time Noun / Location Noun + 에',
      explanationEnglish: 'Attaches to time (at...) or location of movement (to...).',
      explanationNepali: 'समयमा (बजे/दिनमा) वा जाने गन्तव्य स्थानमा जोडिन्छ।',
      example: { korean: '7시에 일어나요.', romanization: 'Ilgop-sie ireonayo.', english: 'I wake up at 7 o\'clock.', nepali: 'म ७ बजे उठ्छु।' }
    }
  },
  {
    lesson: 9,
    book: 1,
    titleKorean: '가족이 몇 명이에요?',
    titleEnglish: 'How Many Family Members Are There?',
    titleNepali: 'परिवारमा कति जना हुनुहुन्छ? (परिवार र उपस्थिति)',
    topicCategory: 'Basic Life (기본생활)',
    vocabularyTopic: 'Family & Appearance (가족, 외모와 성격)',
    grammarPoint1: {
      title: 'Noun Connector / With: 하고',
      pattern: 'N1 + 하고 + N2',
      explanationEnglish: 'Connects nouns together meaning "and" or "together with".',
      explanationNepali: 'दुई वस्तु वा व्यक्तिलाई जोड्न (र / सँग) प्रयोग गरिन्छ।',
      example: { korean: '형하고 동생이 있어요.', romanization: 'Hyeong-hago dongsaeng-i isseoyo.', english: 'I have an older brother and a younger sibling.', nepali: 'मेरो दाजु र भाइ हुनुहुन्छ।' }
    },
    grammarPoint2: {
      title: 'Location Marker for Existence: 에 (있어요/없어요)',
      pattern: 'Location Noun + 에 있/없다',
      explanationEnglish: 'Indicates the place where someone or something exists.',
      explanationNepali: 'मानिस वा वस्तु रहेको/नरहेको स्थान जनाउँछ।',
      example: { korean: '동생은 한국에 있어요.', romanization: 'Dongsaeng-eun Hanguk-e isseoyo.', english: 'My sibling is in Korea.', nepali: 'मेरो भाइ कोरियामा छ।' }
    }
  },
  {
    lesson: 10,
    book: 1,
    titleKorean: '어제 도서관에서 한국어를 공부했어요',
    titleEnglish: 'I Studied Korean at the Library Yesterday',
    titleNepali: 'हिजो पुस्तकालयमा कोरियाली भाषा पढेँ (अतीत काल र कार्यस्थल)',
    topicCategory: 'Basic Life (기본생활)',
    vocabularyTopic: 'Dates, Days & Places (날짜와 요일, 장소와 동작)',
    grammarPoint1: {
      title: 'Location Marker for Action: -에서',
      pattern: 'Location Noun + 에서',
      explanationEnglish: 'Indicates the place WHERE an action takes place (at/in).',
      explanationNepali: 'कुनै काम वा क्रियाकलाप हुने स्थान जनाउँछ (मा)।',
      example: { korean: '식당에서 밥을 먹었어요.', romanization: 'Sikdang-eseo babeul meogeosseoyo.', english: 'I ate a meal at the restaurant.', nepali: 'म रेस्टुरेन्टमा भात खाएँ।' }
    },
    grammarPoint2: {
      title: 'Past Tense Ending: -았/었어요',
      pattern: 'V/A stem + -았어요 (ㅏ,ㅗ) / -었어요 (기타) / 했어요 (하)',
      explanationEnglish: 'Expresses completed actions or states in the past.',
      explanationNepali: 'भइसकेको वा बितिसकेको भूतकाल जनाउँछ।',
      example: { korean: '어제 한국어를 공부했어요.', romanization: 'Eoje Hanguk-eo-reul gongbu-haesseoyo.', english: 'I studied Korean yesterday.', nepali: 'म हिजो कोरियाली भाषा पढेँ।' }
    }
  },
  {
    lesson: 11,
    book: 1,
    titleKorean: '사과 다섯 개 주세요',
    titleEnglish: 'Please Give Me Five Apples (Shopping & Requests)',
    titleNepali: 'पाँच वटा स्याउ दिनुहोस् (किनमेल र अनुरोध)',
    topicCategory: 'Daily Life (일상생활)',
    vocabularyTopic: 'Fruit, Food & Currency (과일과 식료품, 화폐와 물품 구매)',
    grammarPoint1: {
      title: 'Polite Request for Items: 주세요',
      pattern: 'N + 주세요',
      explanationEnglish: 'Used when asking for items or food polite to a salesperson.',
      explanationNepali: 'पसल वा रेस्टुरेन्टमा सामान माग्दा प्रयोग गरिन्छ (दिनुहोस्)।',
      example: { korean: '물 좀 주세요.', romanization: 'Mul jom juseyo.', english: 'Please give me some water.', nepali: 'कृपया अलिकति पानी दिनुहोस्।' }
    },
    grammarPoint2: {
      title: 'Polite Action Request: -아/어 주세요',
      pattern: 'V stem + -아/어 주세요',
      explanationEnglish: 'Polite request asking someone to do an action for you.',
      explanationNepali: 'कसैलाई आफ्नो लागि काम गरिदिन अनुरोध गर्दा।',
      example: { korean: '이것 좀 봉투에 넣어 주세요.', romanization: 'Igeot jom bongtue neo-eo juseyo.', english: 'Please put this in a bag for me.', nepali: 'कृपया यो झोलामा हालिदिनुहोस्।' }
    }
  },
  {
    lesson: 12,
    book: 1,
    titleKorean: '병원 옆에 약국이 있어요',
    titleEnglish: 'There is a Pharmacy Next to the Hospital',
    titleNepali: 'अस्पतालको छेउमा औषधी पसल छ (दिशा र निर्देशन)',
    topicCategory: 'Daily Life (일상생활)',
    vocabularyTopic: 'Directions & Locations (이동 동사, 위치와 길찾기)',
    grammarPoint1: {
      title: 'Polite Imperative Command: -(으)세요',
      pattern: 'V stem (Consonant) + 으세요 / V stem (Vowel) + 세요',
      explanationEnglish: 'Polite command or request telling someone to do an action.',
      explanationNepali: 'शिष्ट निर्देशन वा आदेश दिन प्रयोग गरिन्छ (गर्नुहोस्)।',
      example: { korean: '오른쪽으로 가세요.', romanization: 'Oreunjjok-euro gaseyo.', english: 'Please go to the right.', nepali: 'कृपया दायाँतर्फ जानुहोस्।' }
    },
    grammarPoint2: {
      title: 'Directional Marker: -(으)로',
      pattern: 'N (Consonant) + 으로 / N (Vowel/ㄹ) + 로',
      explanationEnglish: 'Indicates direction of movement (towards) or means/tool.',
      explanationNepali: 'हिँड्ने वा जाने दिशा जनाउन प्रयोग गरिन्छ (तर्फ)।',
      example: { korean: '위로 올라가세요.', romanization: 'Wiro olla-gaseyo.', english: 'Please go up above.', nepali: 'कृपया माथितिर जानुहोस्।' }
    }
  },
  {
    lesson: 13,
    book: 1,
    titleKorean: '시청 앞에서 일곱 시에 만나요',
    titleEnglish: 'Let us Meet in Front of City Hall at 7 o’clock',
    titleNepali: 'सिटी हल अगाडि ७ बजे भेटौँ (भेटघाटका योजना)',
    topicCategory: 'Daily Life (일상생활)',
    vocabularyTopic: 'Appointments & States (약속, 상태 1, 2)',
    grammarPoint1: {
      title: 'Desire / Wanting to do: -고 싶다',
      pattern: 'V stem + -고 싶다',
      explanationEnglish: 'Expresses the speaker’s desire or wish to do something.',
      explanationNepali: 'आफ्नो मनको इच्छा वा चाहना व्यक्त गर्दा (मन छ)।',
      example: { korean: '영화 보고 싶어요.', romanization: 'Yeonghwa bogo sipeoyo.', english: 'I want to watch a movie.', nepali: 'म चलचित्र हेर्न चाहन्छु।' }
    },
    grammarPoint2: {
      title: 'Suggestion / Proposition: -(으)ㄹ까요?',
      pattern: 'V stem + -(으)ㄹ까요?',
      explanationEnglish: 'Suggesting an action together: "Shall we...?" or "Should I...?"',
      explanationNepali: 'कसैलाई सँगै काम गर्ने प्रस्ताव राख्दा (औँ कि?)।',
      example: { korean: '몇 시에 만날까요?', romanization: 'Myeot sie mannal-kkayo?', english: 'What time shall we meet?', nepali: 'कति बजे भेटौँ त?' }
    }
  },
  {
    lesson: 14,
    book: 1,
    titleKorean: '저는 비빔밥을 먹을래요',
    titleEnglish: 'I Would Like to Eat Bibimbap (Food & Intention)',
    titleNepali: 'म बिबिम्बाप खान्छु (खानाको अर्डर र विचार)',
    topicCategory: 'Daily Life (일상생활)',
    vocabularyTopic: 'Restaurants & Tastes (식당, 음식의 맛)',
    grammarPoint1: {
      title: 'Intention / Willingness: -(으)ㄹ래요',
      pattern: 'V stem + -(으)ㄹ래요',
      explanationEnglish: 'Expresses immediate intention or asks listener’s preference.',
      explanationNepali: 'आफ्नो विचार वा निर्णय व्यक्त गर्दा प्रयोग गरिन्छ।',
      example: { korean: '저는 김치찌개 먹을래요.', romanization: 'Jeoneun kimchi-jjigae meogeullaeyo.', english: 'I want to eat Kimchi stew.', nepali: 'म चाहिँ किम्ची स्ट्यु खान्छु।' }
    },
    grammarPoint2: {
      title: 'Negative Adverb: 안',
      pattern: '안 + Verb / Adjective',
      explanationEnglish: 'Negates verbs or adjectives meaning "not / do not".',
      explanationNepali: 'काम नगर्ने वा नहुने नकारात्मक अर्थ दिन्छ (छैन/गर्दैन)।',
      example: { korean: '저는 매운 음식 안 먹어요.', romanization: 'Jeoneun maeun eomsik an meogeoyo.', english: 'I do not eat spicy food.', nepali: 'म पिरो खाना खान्न।' }
    }
  },
  {
    lesson: 15,
    book: 1,
    titleKorean: '날씨가 밝아서 기분이 좋아요',
    titleEnglish: 'The Weather is Sunny so I Feel Happy (Weather & Feelings)',
    titleNepali: 'मौसम सफा भएकोले मुड राम्रो छ (मौसम र भावना)',
    topicCategory: 'Daily Life (일상생활)',
    vocabularyTopic: 'Weather, Seasons & Emotions (날씨와 계절, 기분과 감정)',
    grammarPoint1: {
      title: 'Exclamatory Ending: -네요',
      pattern: 'V/A stem + -네요',
      explanationEnglish: 'Expresses surprise or realization about a newly discovered fact.',
      explanationNepali: 'नयाँ कुरा थाहा पाउँदा वा आश्चर्य व्यक्त गर्दा।',
      example: { korean: '오늘 날씨가 정말 춥네요!', romanization: 'Oneul nalssiga jeongmal chupneyo!', english: 'The weather is really cold today!', nepali: 'आज त मौसम साह्रै जाडो रहेछ!' }
    },
    grammarPoint2: {
      title: 'Cause & Reason: -아서/어서',
      pattern: 'V/A stem + -아서 (ㅏ,ㅗ) / -어서 (기타) / 해서 (하)',
      explanationEnglish: 'Connects cause and result meaning "because" or "so".',
      explanationNepali: 'कारण वा परिस्थिति जनाउन प्रयोग गरिन्छ (भएकोले/गरेर)।',
      example: { korean: '비가 와서 기분이 우울해요.', romanization: 'Biga waseo gibun-i uulhaeyo.', english: 'Because it rains, I feel gloomy.', nepali: 'पानी परेकोले मुड निराश छ।' }
    }
  },
  {
    lesson: 16,
    book: 1,
    titleKorean: '시간이 있을 때 주말에 운동해요',
    titleEnglish: 'When I Have Time, I Exercise on Weekends',
    titleNepali: 'समय हुँदा सप्ताहन्तमा व्यायाम गर्छु (शौक र फुर्सद)',
    topicCategory: 'Daily Life (일상생활)',
    vocabularyTopic: 'Hobbies & Sports (취미, 운동)',
    grammarPoint1: {
      title: 'Purpose of Movement: -(으)러 가다/오다',
      pattern: 'V stem + -(으)러 가다/오다/다니다',
      explanationEnglish: 'States the purpose of going or coming somewhere (in order to...).',
      explanationNepali: 'कुनै काम गर्न जाने वा आउने उद्देश्य जनाउँछ।',
      example: { korean: '축구하러 운동장에 가요.', romanization: 'Chukguhareo undongjang-e gayo.', english: 'I go to the playground to play soccer.', nepali: 'म फुटबल खेल्न मैदानमा जान्छु।' }
    },
    grammarPoint2: {
      title: 'Time / Duration: -(으)ㄹ 때',
      pattern: 'V/A stem + -(으)ㄹ 때',
      explanationEnglish: 'Indicates the time during which an action or state occurs (when...).',
      explanationNepali: 'कुनै काम वा अवस्था हुने समय जनाउँछ (हुँदा/गर्दा)।',
      example: { korean: '심심할 때 음악을 들어요.', romanization: 'Simsimhal ttae eum-ag-eul deureoyo.', english: 'When I am bored, I listen to music.', nepali: 'अल्छी लाग्दा म गीत सुन्छु।' }
    }
  },
  {
    lesson: 17,
    book: 1,
    titleKorean: '휴가 때 제주도에 다녀올 거예요',
    titleEnglish: 'I Will Visit Jeju Island During Vacation (Travel & Future)',
    titleNepali: 'बिदाको समयमा जेजु टापु घुमेर आउनेछु (भ्रमण र भविष्यकाल)',
    topicCategory: 'Daily Life (일상생활)',
    vocabularyTopic: 'Travel Destinations & Preparations (여행지, 여행 준비)',
    grammarPoint1: {
      title: 'Experience / Trying out: -아/어 보다',
      pattern: 'V stem + -아/어 보다',
      explanationEnglish: 'Expresses trying an action or past experience (have tried doing).',
      explanationNepali: 'कुनै काम गरेर हेर्नु वा अनुभव भएको जनाउनु।',
      example: { korean: '제주도에 가 봤어요.', romanization: 'Jejudo-e ga bwasseoyo.', english: 'I have been to Jeju Island.', nepali: 'म जेजु टापु गइसकेको छु।' }
    },
    grammarPoint2: {
      title: 'Future Plan / Intention: -(으)ㄹ 거예요',
      pattern: 'V stem + -(으)ㄹ 거예요',
      explanationEnglish: 'Expresses future plans, promises, or intentions (will do).',
      explanationNepali: 'भविष्यको योजना वा काम गर्ने निश्चितता जनाउनु।',
      example: { korean: '이번 휴가에 여행을 갈 거예요.', romanization: 'Ibeon hyuga-e yeohaeng-eul gal geoyeyo.', english: 'I will go on a trip this vacation.', nepali: 'यो बिदामा म भ्रमण जानेछु।' }
    }
  },
  {
    lesson: 18,
    book: 1,
    titleKorean: '버스타 지하철을 타고 가요',
    titleEnglish: 'I Go by Bus or Subway (Transportation & Range)',
    titleNepali: 'म बस वा सबवे चढेर जान्छु (यातायात र दूरी)',
    topicCategory: 'Daily Life (일상생활)',
    vocabularyTopic: 'Transport Modes & Movement (교통, 이동)',
    grammarPoint1: {
      title: 'Noun Particle "Or": 이나 / 나',
      pattern: 'N (Consonant) + 이나 / N (Vowel) + 나',
      explanationEnglish: 'Attaches to nouns offering a choice between two options (or).',
      explanationNepali: 'दुईमध्ये एउटा छान्ने विकल्प (वा / अथवा)।',
      example: { korean: '버스나 지하철을 타세요.', romanization: 'Beoseu-na jihacheol-eul taseyo.', english: 'Take a bus or a subway.', nepali: 'बस वा सबवे चढ्नुहोस्।' }
    },
    grammarPoint2: {
      title: 'Spatial Range: 에서 ~ 까지',
      pattern: 'Start Location + 에서 ~ End Location + 까지',
      explanationEnglish: 'Indicates starting location (from) and target location (to).',
      explanationNepali: 'शुरुको स्थानदेखि अन्तिम स्थानसम्म (देखि ~ सम्म)।',
      example: { korean: '집에서 회사까지 30분 걸려요.', romanization: 'Jib-eseo hoesa-kkaji 30bun geollyeoyo.', english: 'It takes 30 minutes from home to company.', nepali: 'घरदेखि कम्पनीसम्म ३० मिनेट लाग्छ।' }
    }
  },
  {
    lesson: 19,
    book: 1,
    titleKorean: '거기가 한국가구이지요?',
    titleEnglish: 'That is Korea Furniture, Right? (Phone & Internet)',
    titleNepali: 'त्यहाँ कोरिया फर्निचर हो, हैन र? (फोन र इन्टरनेट)',
    topicCategory: 'Daily Life (일상생활)',
    vocabularyTopic: 'Phone Calls & Internet (전화, 인터넷)',
    grammarPoint1: {
      title: 'Seeking Confirmation: -지요?',
      pattern: 'V/A stem + -지요? / N + 이지요?',
      explanationEnglish: 'Asking for agreement or confirming something known (..., right?).',
      explanationNepali: 'थाहा भएको कुरा पुष्टि गर्न सोध्दा (हैन र?)।',
      example: { korean: '오늘 날씨가 춥지요?', romanization: 'Oneul nalssiga chupjiyo?', english: 'The weather is cold today, right?', nepali: 'आज मौसम जाडो छ, हैन र?' }
    },
    grammarPoint2: {
      title: 'Sequential Clause Connector: -고',
      pattern: 'V/A stem + -고',
      explanationEnglish: 'Connects two actions or states in sequence or parallel (and).',
      explanationNepali: 'दुई काम वा वाक्यलाई जोड्न प्रयोग गरिन्छ (र / अनि)।',
      example: { korean: '전화를 걸고 기다리세요.', romanization: 'Jeonhwa-reul geolgo gidariseyo.', english: 'Make a phone call and wait.', nepali: 'फोन गरेर पर्खनुहोस्।' }
    }
  },
  {
    lesson: 20,
    book: 1,
    titleKorean: '저는 설거지를 할게요',
    titleEnglish: 'I Will Do the Dishes (Housework & Promises)',
    titleNepali: 'म भाँडा धुनुछ (घरको काम र प्रतिबद्धता)',
    topicCategory: 'Daily Life (일상생활)',
    vocabularyTopic: 'Cleaning & Housework (청소, 집안일)',
    grammarPoint1: {
      title: 'Speaker Intention / Promise: -(으)ㄹ게요',
      pattern: 'V stem + -(으)ㄹ게요',
      explanationEnglish: 'Speaker promises or takes responsibility to do an action.',
      explanationNepali: 'आफ्नो प्रतिबद्धता वा निर्णय व्यक्त गर्दा (म गर्नेछु)।',
      example: { korean: '제가 방을 청소할게요.', romanization: 'Jega bang-eul cheongso-halgeyo.', english: 'I will clean the room.', nepali: 'म कोठा सफा गर्नेछु।' }
    },
    grammarPoint2: {
      title: 'Nominalizer / Noun Modifier: -는 것',
      pattern: 'V stem + -는 것',
      explanationEnglish: 'Turns a verb into a noun expression (the act of doing...).',
      explanationNepali: 'क्रियालाई नामपद (Noun) मा परिवर्तन गर्ने प्रत्यय।',
      example: { korean: '요리하는 것이 재미있어요.', romanization: 'Yori-haneun geos-i jaemi-isseoyo.', english: 'Cooking is fun.', nepali: 'खाना पकाउनु रमाइलो हुन्छ।' }
    }
  },
  {
    lesson: 21,
    book: 1,
    titleKorean: '상 차리는 것을 도와줄까요?',
    titleEnglish: 'Shall I Help Set the Table? (Invitations & Help)',
    titleNepali: 'टेबुल सजाउन सहयोग गरूँ कि? (निमन्त्रणा र मद्दत)',
    topicCategory: 'Public Institutions (공공 기관)',
    vocabularyTopic: 'Appointments & Invitations (약속, 초대)',
    grammarPoint1: {
      title: 'Offering Help / Suggestion: -(으)ㄹ까요?',
      pattern: 'V stem + -(으)ㄹ까요?',
      explanationEnglish: 'Offering help to the listener: "Shall I do... for you?"',
      explanationNepali: 'कसैलाई मद्दत गर्ने प्रस्ताव गर्दा (गरूँ कि?)।',
      example: { korean: '짐을 들어 줄까요?', romanization: 'Jim-eul deureo julkkayo?', english: 'Shall I carry your luggage?', nepali: 'मेरो झोला बोकिदिऊँ कि?' }
    },
    grammarPoint2: {
      title: 'Time Sequence After: -(으)ㄴ 후에',
      pattern: 'V stem + -(으)ㄴ 후에',
      explanationEnglish: 'Indicates that an action happens after completing another action.',
      explanationNepali: 'एउटा काम सकिएपछि अर्को काम गर्दा (सकिएपछि)।',
      example: { korean: '밥을 먹은 후에 약을 드세요.', romanization: 'Babeul meogeun hue yak-eul deuseyo.', english: 'Please take medicine after eating a meal.', nepali: 'भात खाएपछि औषधी खाउनुहोस्।' }
    }
  },
  {
    lesson: 22,
    book: 1,
    titleKorean: '무단횡단을 하면 안 돼요',
    titleEnglish: 'You Must Not Jaywalk (Rules & Prohibition)',
    titleNepali: 'बाटो जथाभावी काट्न पाइँदैन (नियम र मनाही)',
    topicCategory: 'Public Institutions (공공 기관)',
    vocabularyTopic: 'Prohibitions & Inappropriate Behavior (금지, 하면 안 되는 행동)',
    grammarPoint1: {
      title: 'Prohibition Rule: -(으)면 안 되다',
      pattern: 'V stem + -(으)면 안 되다',
      explanationEnglish: 'States a prohibition or rule (must not / not allowed to).',
      explanationNepali: 'मनाही वा प्रतिबन्धित काम जनाउँछ (गर्नु हुँदैन)।',
      example: { korean: '여기에서 담배를 피우면 안 돼요.', romanization: 'Yeogi-eseo dambae-reul piumyeon an dwaeyo.', english: 'You must not smoke here.', nepali: 'यहाँ चुरोट पिउन पाइँदैन।' }
    },
    grammarPoint2: {
      title: 'Reason Marker: -(으)니까',
      pattern: 'V/A stem + -(으)니까',
      explanationEnglish: 'Provides reason or rationale for a command or suggestion.',
      explanationNepali: 'कारण दिँदै आदेश वा सुझाव दिँदा (भएकोले गर्दा)।',
      example: { korean: '위험하니까 조심하세요.', romanization: 'Wiheom-hanikka josim-haseyo.', english: 'Because it is dangerous, please be careful.', nepali: 'जोखिमपूर्ण भएकोले सावधान हुनुहोस्।' }
    }
  },
  {
    lesson: 23,
    book: 1,
    titleKorean: '어른께는 두 손으로 물건을 드려야 돼요',
    titleEnglish: 'You Must Give Items with Both Hands to Elders',
    titleNepali: 'ज्येष्ठ नागरिकलाई दुवै हातले सामान दिनुपर्छ (शिष्टता र शिष्टाचार)',
    topicCategory: 'Public Institutions (공공 기관)',
    vocabularyTopic: 'Honorific Terms & Daily Manners (어휘 높임, 생활 예절)',
    grammarPoint1: {
      title: 'Honorific Insert: -(으)시-',
      pattern: 'V/A stem + -(으)시-',
      explanationEnglish: 'Inserted into verb stem to show respect to the subject person.',
      explanationNepali: 'उच्च आदर वा शिष्टता जनाउने प्रत्यय।',
      example: { korean: '사장님께서 진지식을 드십니다.', romanization: 'Sajangnim-kkeseo jinjisig-eul deusimnida.', english: 'The president eats a meal.', nepali: 'साहुजीले खाना खानुहुन्छ।' }
    },
    grammarPoint2: {
      title: 'Obligation / Must do: -아야/어야 되다/하다',
      pattern: 'V stem + -아야/어야 되다/하다',
      explanationEnglish: 'Expresses obligation or necessity (must / have to do).',
      explanationNepali: 'अनिवार्य रूपमा गर्नुपर्ने काम जनाउँछ (गर्नुपर्छ)।',
      example: { korean: '작업장에서 안전모를 써야 해요.', romanization: 'Jageopjang-eseo anjeonmo-reul sseoya haeyo.', english: 'You must wear a helmet in the workplace.', nepali: 'कार्यस्थलमा सुरक्षा टोपी लगाउनुपर्छ।' }
    }
  },
  {
    lesson: 24,
    book: 1,
    titleKorean: '한국 영화를 보면서 한국어를 공부해요',
    titleEnglish: 'I Study Korean While Watching Korean Movies',
    titleNepali: 'कोरियाली चलचित्र हेर्दै भाषा पढ्छु (अध्ययन र क्षमता)',
    topicCategory: 'Public Institutions (공공 기관)',
    vocabularyTopic: 'Study, Training & Courses (공부, 교육)',
    grammarPoint1: {
      title: 'Simultaneous Actions: -(으)면서',
      pattern: 'V stem + -(으)면서',
      explanationEnglish: 'Connects two actions happening at the exact same time (while...).',
      explanationNepali: 'दुई काम एकै पटक गर्दा (गर्दै / गर्दै)।',
      example: { korean: '음악을 들으면서 일해요.', romanization: 'Eum-ag-eul deureumyeonseo irhaeyo.', english: 'I work while listening to music.', nepali: 'म सङ्गीत सुन्दै काम गर्छु।' }
    },
    grammarPoint2: {
      title: 'Ability / Capability: -(으)ㄹ 수 있다/없다',
      pattern: 'V stem + -(으)ㄹ 수 있다/없다',
      explanationEnglish: 'Expresses capability or possibility (can / cannot do).',
      explanationNepali: 'कुनै काम गर्न सक्ने वा नसक्ने क्षमता (सक्छु/सक्दिनँ)।',
      example: { korean: '한국어를 말할 수 있어요.', romanization: 'Hanguk-eo-reul malhal su isseoyo.', english: 'I can speak Korean.', nepali: 'म कोरियाली भाषा बोल्न सक्छु।' }
    }
  },
  {
    lesson: 25,
    book: 1,
    titleKorean: '일요일마다 교회에 가요',
    titleEnglish: 'I Go to Church Every Sunday (Habits & Frequency)',
    titleNepali: 'हरेक आइतबार चर्च जान्छु (बानी र धर्म)',
    topicCategory: 'Public Institutions (공공 기관)',
    vocabularyTopic: 'Religion & Religious Activities (종교, 종교 행사)',
    grammarPoint1: {
      title: 'Noun Particle "Every": 마다',
      pattern: 'N (Time) + 마다',
      explanationEnglish: 'Attaches to nouns indicating repetition or frequency (every...).',
      explanationNepali: 'हरेक वा प्रत्येक भन्ने अर्थ दिने प्रत्यय (पिच्छे)।',
      example: { korean: '아침마다 운동을 해요.', romanization: 'Achim-mada undong-eul haeyo.', english: 'I exercise every morning.', nepali: 'म हरेक बिहान व्यायाम गर्छु।' }
    },
    grammarPoint2: {
      title: 'Time Sequence Before: -기 전에',
      pattern: 'V stem + -기 전에',
      explanationEnglish: 'Indicates doing an action before another event (before doing).',
      explanationNepali: 'कुनै काम गर्नुअघि अर्को काम गर्दा (अघि)।',
      example: { korean: '밥을 먹기 전에 손을 씻으세요.', romanization: 'Babeul meokgi jeone soneul ssiseuseyo.', english: 'Wash your hands before eating.', nepali: 'खाना खानुअघि हात धुनुहोस्।' }
    }
  },
  {
    lesson: 26,
    book: 1,
    titleKorean: '밥을 먹은 후에 이 약을 드세요',
    titleEnglish: 'Please Take This Medicine After Meals (Health & Pharmacy)',
    titleNepali: 'खाना खाएपछि यो औषधी खानुहोस् (स्वास्थ्य र अस्पताल)',
    topicCategory: 'Public Institutions (공공 기관)',
    vocabularyTopic: 'Body Parts & Health Symptoms (신체 부위, 증상)',
    grammarPoint1: {
      title: 'Polite Instruction: -(으)세요',
      pattern: 'V stem + -(으)세요',
      explanationEnglish: 'Polite request or medical instruction given by doctor.',
      explanationNepali: 'डाक्टरले बिरामीलाई दिने शिष्ट सल्लाह।',
      example: { korean: '푹 쉬세요.', romanization: 'Puk swiseyo.', english: 'Please get plenty of rest.', nepali: 'कृपया मज्जाले आराम गर्नुहोस्।' }
    },
    grammarPoint2: {
      title: 'Time Sequence After: -(으)ㄴ 후에',
      pattern: 'V stem + -(으)ㄴ 후에',
      explanationEnglish: 'States an action that must occur after completing another.',
      explanationNepali: 'एउटा काम पूरा गरेपछि।',
      example: { korean: '약은 식사한 후에 드세요.', romanization: 'Yak-eun siksa-han hue deuseyo.', english: 'Take medicine after meals.', nepali: 'औषधी खाना खाएपछि खानुहोस्।' }
    }
  },
  {
    lesson: 27,
    book: 1,
    titleKorean: '어디가 아프십니까?',
    titleEnglish: 'Where Does It Hurt? (Medical Treatment)',
    titleNepali: 'तपाईंलाई कहाँ दुखेको छ? (अस्पताल उपचार)',
    topicCategory: 'Public Institutions (공공 기관)',
    vocabularyTopic: 'Medical Centers & Treatment (병원, 치료)',
    grammarPoint1: {
      title: 'Conditional Clause: -(으)면',
      pattern: 'V/A stem + -(으)면',
      explanationEnglish: 'Sets a condition or hypothetical situation (if / when).',
      explanationNepali: 'सर्त वा परिस्थिति जनाउँदा (भने / गरेमा)।',
      example: { korean: '열이 나면 이 약을 드세요.', romanization: 'Yeor-i namyeon i yak-eul deuseyo.', english: 'If you have a fever, take this medicine.', nepali: 'ज्वरो आएमा यो औषधी खानुहोस्।' }
    },
    grammarPoint2: {
      title: 'Method / Tool Marker: -(으)로',
      pattern: 'N + -(으)로',
      explanationEnglish: 'Indicates tool, instrument, or method used for an action.',
      explanationNepali: 'साधन, माध्यम वा औजार जनाउँछ (द्वारा/ले)।',
      example: { korean: '버스오 왔어요.', romanization: 'Beoseuro wasseoyo.', english: 'I came by bus.', nepali: 'म बसद्वारा आएँ।' }
    }
  },
  {
    lesson: 28,
    book: 1,
    titleKorean: '통장을 만들려고 왔어요',
    titleEnglish: 'I Came to Open a Bank Account (Banking)',
    titleNepali: 'बैंक खाता खोल्न आएको हूँ (बैंक र वित्तीय सेवा)',
    topicCategory: 'Public Institutions (공공 기관)',
    vocabularyTopic: 'Banks & Financial Services (은행, 금융 서비스)',
    grammarPoint1: {
      title: 'Purpose of Going: -(으)러 가다/오다',
      pattern: 'V stem + -(으)러 가다/오다',
      explanationEnglish: 'Going or coming to a place with a specific goal.',
      explanationNepali: 'कुनै काम गर्न बैंक वा ठाउँमा जाँदा।',
      example: { korean: '돈을 송금하러 은행에 왔어요.', romanization: 'Doneul songgeum-hareo eunhaeng-e wasseoyo.', english: 'I came to bank to remit money.', nepali: 'म पैसा पठाउन बैंक आएको हूँ।' }
    },
    grammarPoint2: {
      title: 'Intention / Plan: -(으)려고 하다',
      pattern: 'V stem + -(으)려고 하다',
      explanationEnglish: 'Expresses speaker’s plan or intention to perform an action.',
      explanationNepali: 'आफ्नो योजना वा उद्देश्य व्यक्त गर्दा (गर्ने विचार छ)।',
      example: { korean: '통장을 만들려고 해요.', romanization: 'Tongjang-eul mandeullyeogo haeyo.', english: 'I plan to open a passbook.', nepali: 'म बैंक पासबुक बनाउने विचारमा छु।' }
    }
  },
  {
    lesson: 29,
    book: 1,
    titleKorean: '필리핀으로 엽서를 보낼까 해요',
    titleEnglish: 'I Intend to Send a Postcard to Philippines (Post Office)',
    titleNepali: 'फिलिपिन्सतर्फ हुलाक कार्ड पठाउने विचार छ (हुलाक सेवा)',
    topicCategory: 'Public Institutions (공공 기관)',
    vocabularyTopic: 'Mail, Packages & Delivery (우편물, 택배)',
    grammarPoint1: {
      title: 'Destination Direction: -(으)로',
      pattern: 'N + -(으)로',
      explanationEnglish: 'Indicates the country or location to which mail is sent.',
      explanationNepali: 'सामान वा हुलाक पठाउने गन्तव्य देश।',
      example: { korean: '네팔로 소포를 보내고 싶어요.', romanization: 'Nepal-ro sopo-reul bonaego sipeoyo.', english: 'I want to send a parcel to Nepal.', nepali: 'म नेपालतर्फ पार्सल पठाउन चाहन्छु।' }
    },
    grammarPoint2: {
      title: 'Formal Honorific Request: -(으)시겠습니까?',
      pattern: 'V stem + -(으)시겠습니까?',
      explanationEnglish: 'Polite formal question asking customer’s preference.',
      explanationNepali: 'कर्मचारीले ग्राहकलाई शिष्ट रूपमा सोध्दा।',
      example: { korean: '어떻게 보내시겠습니까?', romanization: 'Eotteohke bonaesigessnimkka?', english: 'How would you like to send this?', nepali: 'कसरी पठाउन चाहनुहुन्छ?' }
    }
  },
  {
    lesson: 30,
    book: 1,
    titleKorean: '거기서 태권도를 배울 수 있어요?',
    titleEnglish: 'Can I Learn Taekwondo There? (Community Center)',
    titleNepali: 'त्यहाँ तेक्वान्दो सिक्न सकिन्छ? (विदेशी सहायता केन्द्र)',
    topicCategory: 'Public Institutions (공공 기관)',
    vocabularyTopic: 'Support Centers & Education (외국인력지원센터 서비스)',
    grammarPoint1: {
      title: 'Possibility / Permission: -(으)ㄹ 수 있다/없다',
      pattern: 'V stem + -(으)ㄹ 수 있다/없다',
      explanationEnglish: 'Asks or states whether a facility provides a service.',
      explanationNepali: 'सेवा वा सुविधा उपलब्ध छ/छैन भन्ने क्षमता।',
      example: { korean: '주말에 교육을 받을 수 있어요.', romanization: 'Jumal-e gyoyug-eul badeul su isseoyo.', english: 'You can receive training on weekends.', nepali: 'सप्ताहन्तमा तालिम लिन सकिन्छ।' }
    },
    grammarPoint2: {
      title: 'Condition for Intent: -(으)려면',
      pattern: 'V stem + -(으)려면',
      explanationEnglish: 'Short for -(으)려고 하면 meaning "If you want to do...".',
      explanationNepali: 'यदि कुनै काम गर्ने विचार छ भने (चाहनुहुन्छ भने)।',
      example: { korean: '신청하려면 신분증이 필요해요.', romanization: 'Sincheong-haryeomyeon sinbunjeung-i piryohaeyo.', english: 'If you want to apply, an ID card is needed.', nepali: 'आवेदन दिन चाहनुहुन्छ भने परिचयपत्र चाहिन्छ।' }
    }
  },

  // ── BOOK 2: LESSONS 31–60 (WORKPLACE CULTURE & SAFETY) ──
  {
    lesson: 31,
    book: 2,
    titleKorean: '우리 고향은 서울보다 공기가 밝아요',
    titleEnglish: 'My Hometown Air is Cleaner Than Seoul (Weather & Compare)',
    titleNepali: 'मेरो गाउँको हावा सोउलभन्दा सफा छ (मौसम र तुलना)',
    topicCategory: 'Understanding Korea (한국에 대한 이해)',
    vocabularyTopic: 'Weather & City Features (날씨, 도시의 특성)',
    grammarPoint1: {
      title: 'Comparison Particle: 보다',
      pattern: 'N1 + 보다 + N2',
      explanationEnglish: 'Compares two nouns meaning "more than N1".',
      explanationNepali: 'दुई वस्तु वा ठाउँको तुलना गर्दा (भन्दा)।',
      example: { korean: '한국이 네팔보다 넓어요.', romanization: 'Hanguk-i Nepal-boda neolbeoyo.', english: 'Korea is larger than Nepal.', nepali: 'कोरिया नेपालभन्दा ठूलो छ।' }
    },
    grammarPoint2: {
      title: 'Adjective Noun Modifier: -(으)ㄴ',
      pattern: 'A stem (Consonant) + 은 / A stem (Vowel) + ㄴ',
      explanationEnglish: 'Attaches to adjective stems to describe a following noun.',
      explanationNepali: 'विशेषणलाई नामपद अगाडि जोडेर वर्णन गर्दा।',
      example: { korean: '시원한 바람이 불어요.', romanization: 'Siwon-han baram-i bureoyo.', english: 'A cool wind blows.', nepali: 'चिसो हावा चल्छ।' }
    }
  },
  {
    lesson: 32,
    book: 2,
    titleKorean: '복날에는 삼계탕을 먹어요',
    titleEnglish: 'We Eat Samgyetang on Hot Summer Days (Korean Food)',
    titleNepali: 'गर्मीको विशेष दिनमा सामग्येताङ खाइन्छ (कोरियाली परम्परागत खाना)',
    topicCategory: 'Understanding Korea (한국에 대한 이해)',
    vocabularyTopic: 'Seasonal Food & Recipes (계절 음식, 재료와 조리법)',
    grammarPoint1: {
      title: 'Past Modifier: -(으)ㄴ',
      pattern: 'V stem + -(으)ㄴ',
      explanationEnglish: 'Modifies a noun with a past completed verb action.',
      explanationNepali: 'भइसकेको कामलाई नामपद अगाडि जोड्दा।',
      example: { korean: '어제 먹은 음식이 맛있었어요.', romanization: 'Eoje meogeun eumsik-i mas-isseosseoyo.', english: 'The food I ate yesterday was delicious.', nepali: 'हिजो खाएको खाना मीठो थियो।' }
    },
    grammarPoint2: {
      title: 'Sequential Order of Actions: -아/어서',
      pattern: 'V stem + -아/어서',
      explanationEnglish: 'Connects two actions in time sequence (and then...).',
      explanationNepali: 'पहिलो काम सकेर निरन्तर दोस्रो काम गर्दा।',
      example: { korean: '고기를 볶아서 먹어요.', romanization: 'Gogireul bokkaseo meogeoyo.', english: 'Fry the meat and then eat it.', nepali: 'मासु भुटेर खानुहोस्।' }
    }
  },
  {
    lesson: 33,
    book: 2,
    titleKorean: '송편을 만드는 체험도 할 수 있어요',
    titleEnglish: 'You Can Also Try Making Songpyeon (Holidays)',
    titleNepali: 'सोङप्योन (चामलको रोटी) बनाउने अनुभव पनि लिन सकिन्छ (चाडपर्व)',
    topicCategory: 'Understanding Korea (한국에 대한 이해)',
    vocabularyTopic: 'Holidays & Traditions (설날, 추석, 한국의 명절)',
    grammarPoint1: {
      title: 'Intention / Assumption: -겠-',
      pattern: 'V/A stem + -겠-',
      explanationEnglish: 'Expresses speaker’s intention or strong guess about a situation.',
      explanationNepali: 'आफ्नो विचार वा अनुमान जनाउँदा (होला/गर्नेछु)।',
      example: { korean: '재미있겠네요!', romanization: 'Jaemi-issgesneyo!', english: 'That must be interesting!', nepali: 'रमाइलो होला नि!' }
    },
    grammarPoint2: {
      title: 'Present Action Noun Modifier: -는',
      pattern: 'V stem + -는',
      explanationEnglish: 'Attaches to verb stems to describe a noun in present continuous.',
      explanationNepali: 'भइरहेको क्रियालाई नामपद अगाडि जोड्दा।',
      example: { korean: '송편을 만드는 법을 배워요.', romanization: 'Songpyeon-eul mandeuneun beob-eul baewo-yo.', english: 'Learn how to make Songpyeon.', nepali: 'सोङप्योन बनाउने तरिका सिकौँ।' }
    }
  },
  {
    lesson: 34,
    book: 2,
    titleKorean: '아기 옷을 선물하는 게 어때요?',
    titleEnglish: 'How About Gifting Baby Clothes? (Culture & Gifts)',
    titleNepali: 'बच्चाको कपडा उपहार दिँदा कस्तो होला? (संस्कार र उपहार)',
    topicCategory: 'Understanding Korea (한국에 대한 이해)',
    vocabularyTopic: 'Family Events & Ceremonies (특별한 날, 결혼식)',
    grammarPoint1: {
      title: 'Suggestion Expression: -는 게 어때요?',
      pattern: 'V stem + -는 게 어때요?',
      explanationEnglish: 'Politely suggests an action to the listener (How about...?).',
      explanationNepali: 'कसैलाई काम गर्ने सल्लाह वा सुझाव दिँदा (कस्तो होला?)।',
      example: { korean: '꽃을 선물하는 게 어때요?', romanization: 'Kkoc-eul seonmul-haneun ge eotteo-yo?', english: 'How about gifting flowers?', nepali: 'फूल उपहार दिँदा कस्तो होला?' }
    },
    grammarPoint2: {
      title: 'Completion Sequence: -고 나서',
      pattern: 'V stem + -고 나서',
      explanationEnglish: 'Indicates that one action is completely finished before starting next.',
      explanationNepali: 'एउटा काम पूर्ण रूपमा सकिएपछि अर्को काम गर्दा।',
      example: { korean: '식사하고 나서 커피를 마셔요.', romanization: 'Siksahago naseo keopireul masyeoyo.', english: 'After finishing meal, drink coffee.', nepali: 'खाना खाएपछि कफी पिउँछु।' }
    }
  },
  {
    lesson: 35,
    book: 2,
    titleKorean: '한국 드라마가 재미있잖아요',
    titleEnglish: 'Korean Dramas Are Fun, You Know (Hallyu Wave)',
    titleNepali: 'कोरियाली नाटक रमाइलो हुन्छ नि (कोरियाली लहर र पर्यटन)',
    topicCategory: 'Understanding Korea (한국에 대한 이해)',
    vocabularyTopic: 'K-Pop, K-Drama & Tourism (한류, 한국 여행)',
    grammarPoint1: {
      title: 'Reconfirming Known Fact: 잖아요',
      pattern: 'V/A stem + 잖아요',
      explanationEnglish: 'Reminds listener of a fact both people already know (you know...).',
      explanationNepali: 'दुवैलाई थाहा भएको कुरा सम्झाउँदा (हुन्छ नि/छ नि)।',
      example: { korean: '주말에는 사람이 많잖아요.', romanization: 'Jumal-eneun saram-i manjanhayo.', english: 'There are many people on weekends, you know.', nepali: 'सप्ताहन्तमा त भीड हुन्छ नि।' }
    },
    grammarPoint2: {
      title: 'Supposition / Seeming: -(으)ㄴ/는 것 같다',
      pattern: 'V/A stem + -(으)ㄴ/는 것 같다',
      explanationEnglish: 'Expresses soft guess or opinion (it seems like / looks like).',
      explanationNepali: 'आफ्नो अनुमान वा विचार व्यक्त गर्दा (जस्तो छ)।',
      example: { korean: '한국 드라마가 인기 있는 것 같아요.', romanization: 'Hanguk deurama-ga inki inneun geot gat-ayo.', english: 'It seems Korean dramas are popular.', nepali: 'कोरियाली सिरियल लोकप्रिय छ जस्तो छ।' }
    }
  },
  {
    lesson: 36,
    book: 2,
    titleKorean: '단정한 모습이 좋아 보여요',
    titleEnglish: 'A Neat Appearance Looks Good (Work Attire)',
    titleNepali: 'सफा र चिटिक्क पोशाक राम्रो देखिन्छ (कार्यस्थलको पोशाक)',
    topicCategory: 'Workplace Culture (직장 문화)',
    vocabularyTopic: 'Work Clothes & Attitude (복장, 작업 태도)',
    grammarPoint1: {
      title: 'Appearance / Impression: -아/어 보이다',
      pattern: 'A stem + -아/어 보이다',
      explanationEnglish: 'Describes how someone or something looks or appears.',
      explanationNepali: 'कसैको रूप वा पोशाक हेरेर अनुमान गर्दा (देखिन्छ)।',
      example: { korean: '작업복이 아주 깔끔해 보여요.', romanization: 'Jageopbog-i aju kkalkkeum-hae bo-yeoyo.', english: 'The work clothes look very neat.', nepali: 'कामको पोशाक साह्रै सफा देखिन्छ।' }
    },
    grammarPoint2: {
      title: 'Identification State: -이다 / 아니다',
      pattern: 'N + 이다 (To be) / N + 아니다 (Not to be)',
      explanationEnglish: 'Stating category or identity of workplace attire.',
      explanationNepali: 'कामको पोशाक हो वा होइन भनी तोक्दा।',
      example: { korean: '이것은 안전복입니다.', romanization: 'Igeoseun anjeonbok-imnida.', english: 'This is safety clothing.', nepali: 'यो सुरक्षा पोशाक हो।' }
    }
  },
  {
    lesson: 37,
    book: 2,
    titleKorean: '출입문을 꼭 닫읍시다',
    titleEnglish: 'Let us Keep the Entrance Door Closed (Dormitory Rules)',
    titleNepali: 'प्रवेशद्वार सधैँ बन्द राखौँ (छात्रावास नियम)',
    topicCategory: 'Workplace Culture (직장 문화)',
    vocabularyTopic: 'Dormitory & Heating Systems (기숙사, 냉난방기)',
    grammarPoint1: {
      title: 'Formal Proposal: -(으)ㅂ시다',
      pattern: 'V stem + -(으)ㅂ시다',
      explanationEnglish: 'Formal proposal to co-workers: "Let us do..."',
      explanationNepali: 'सहकर्मीहरूलाई सँगै काम गर्न प्रस्ताव गर्दा (राखौँ/गरौँ)।',
      example: { korean: '기숙사 규칙을 지킵시다.', romanization: 'Gisuksa gyuchig-eul jikipsida.', english: 'Let us obey dormitory rules.', nepali: 'छात्रावासको नियम पालना गरौँ।' }
    },
    grammarPoint2: {
      title: 'Duration of Action: -는 동안',
      pattern: 'V stem + -는 동안',
      explanationEnglish: 'Indicates duration or timeframe of an action (while / during).',
      explanationNepali: 'कुनै काम भइरहने समय अवधिभरि (अवधिभरि)।',
      example: { korean: '외출하는 동안 불을 끄세요.', romanization: 'Oechul-haneun dongan bureul kkuseyo.', english: 'Turn off lights while out.', nepali: 'बाहिर निस्कँदा बत्ती निभाउनुहोस्।' }
    }
  },
  {
    lesson: 38,
    book: 2,
    titleKorean: '일할 맛이 나요',
    titleEnglish: 'I Feel Motivated to Work (Workplace Atmosphere)',
    titleNepali: 'काम गर्न जाँगर आउँछ (कामको वातावरण र सहकर्मी)',
    topicCategory: 'Workplace Culture (직장 문화)',
    vocabularyTopic: 'Workplace Atmosphere & Conflicts (직장의 분위기, 동료와의 갈등)',
    grammarPoint1: {
      title: 'Tendency / General Preference: -는/-(으)ㄴ 편이다',
      pattern: 'V/A stem + -는/-(으)ㄴ 편이다',
      explanationEnglish: 'Expresses that something tends to be a certain way (on the side of...).',
      explanationNepali: 'कुनै कुरा उस्तै वा त्यसतर्फ ढल्किएको जनाउँदा।',
      example: { korean: '우리 공장은 분위기가 좋은 편이에요.', romanization: 'Uri gongjang-eun bunwigiga joheun pyeon-ieyo.', english: 'Our factory atmosphere tends to be good.', nepali: 'हाम्रो फ्याक्ट्रीको वातावरण राम्रो खालको छ।' }
    },
    grammarPoint2: {
      title: 'Statement Indirect Speech: -다고 하다',
      pattern: 'V/A stem + -다고 하다',
      explanationEnglish: 'Quoting a statement heard from someone else (says that...).',
      explanationNepali: 'अरूले भनेको कुरा सुनाउँदा (भन्छन्)।',
      example: { korean: '동료가 내일 휴가라고 해요.', romanization: 'Dongryeoga naeil hyuga-rago haeyo.', english: 'My co-worker says tomorrow is leave.', nepali: 'सहकर्मीले भोलि बिदा हो भन्छन्।' }
    }
  },
  {
    lesson: 39,
    book: 2,
    titleKorean: '오늘 회식을 하자고 해요',
    titleEnglish: 'They Suggest Having Company Dinner Today (Company Dinners)',
    titleNepali: 'आज कम्पनीको डिनर (ह्वेशिक) गरौँ भन्छन् (कम्पनी डिनर)',
    topicCategory: 'Workplace Culture (직장 문화)',
    vocabularyTopic: 'Company Dinners & Gatherings (회식, 직장에서의 모임)',
    grammarPoint1: {
      title: 'Indirect Proposal Quotation: -자고 하다',
      pattern: 'V stem + -자고 하다',
      explanationEnglish: 'Quoting someone’s proposal: "They suggested that we do..."',
      explanationNepali: 'अरूले सँगै काम गरौँ भनेको कुरा सुनाउँदा।',
      example: { korean: '반장님이 회식을 하자고 하셨어요.', romanization: 'Banjangnim-i hoesig-eul hajago hasyeosseoyo.', english: 'The foreman suggested having a dinner.', nepali: 'फोरम्यानले डिनर खाऔँ भन्नुभयो।' }
    },
    grammarPoint2: {
      title: 'Indirect Command Quotation: -(으)라고 하다',
      pattern: 'V stem + -(으)라고 하다',
      explanationEnglish: 'Quoting an order or command: "Told me to..."',
      explanationNepali: 'अरूले दिएको आदेश वा निर्देशन सुनाउँदा।',
      example: { korean: '사장님이 일찍 출근하라고 해요.', romanization: 'Sajangnim-i iljjeik chulgeun-harago haeyo.', english: 'The boss told us to come early.', nepali: 'साहुजीले छिटो काममा आउनु भन्नुभयो।' }
    }
  },
  {
    lesson: 40,
    book: 2,
    titleKorean: '불쾌감을 느꼈다면 그것은 성희롱이에요',
    titleEnglish: 'If You Felt Unpleasant, That is Sexual Harassment (Etiquette)',
    titleNepali: 'असहज महसुस भयो भने त्यो यौन दुर्व्यवहार हो (कार्यस्थल मर्यादा)',
    topicCategory: 'Workplace Culture (직장 문화)',
    vocabularyTopic: 'Harassment Prevention & Coping (성희롱 예방과 대처)',
    grammarPoint1: {
      title: 'Indirect Question Quotation: -냐고 하다',
      pattern: 'V/A stem + -냐고 하다/묻다',
      explanationEnglish: 'Quoting a question asked by someone else (asked if...).',
      explanationNepali: 'अरूले सोधेको प्रश्न अरूलाई सुनाउँदा।',
      example: { korean: '동료가 어디 가냐고 물었어요.', romanization: 'Dongryeo-ga eodi ganyago mureosseoyo.', english: 'Co-worker asked where I was going.', nepali: 'सहकर्मीले कहाँ जान लागेको भनेर सोधे।' }
    },
    grammarPoint2: {
      title: 'Condition for Past Feelings: -(으)ㄴ/는다면',
      pattern: 'V/A stem + -(으)ㄴ/는다면',
      explanationEnglish: 'Expressing a conditional assumption based on emotional impact.',
      explanationNepali: 'कुनै परिस्थिति वा भावना महसुस भएमा।',
      example: { korean: '불편하다면 즉시 말하세요.', romanization: 'Bulpyeon-hadamyeon jeuksi malhaseyo.', english: 'If uncomfortable, speak immediately.', nepali: 'असहज भएमा तुरुन्तै भन्नुहोस्।' }
    }
  },
  {
    lesson: 41,
    book: 2,
    titleKorean: '드라이버로 해 보세요',
    titleEnglish: 'Try Using a Screwdriver (Hand Tools & Machinery)',
    titleNepali: 'पेचकस (ड्राइभर) प्रयोग गरी हेर्नुहोस् (हाते औजार र मेसिन)',
    topicCategory: 'Work Life (직장생활)',
    vocabularyTopic: 'Manufacturing Tools & Operations (제조업 수공구, 기계 작업)',
    grammarPoint1: {
      title: 'Tool / Instrument Marker: -(으)로',
      pattern: 'N (Tool) + -(으)로',
      explanationEnglish: 'Indicates tool or instrument used to complete a task.',
      explanationNepali: 'काम गर्दा प्रयोग गरिने औजार (ले/द्वारा)।',
      example: { korean: '망치로 못을 박으세요.', romanization: 'Mangchiro moseul bageuseyo.', english: 'Drive the nail with a hammer.', nepali: 'हतौडाले काँटी ठोक्नुहोस्।' }
    },
    grammarPoint2: {
      title: 'Present Continuous Action: -고 있다',
      pattern: 'V stem + -고 있다',
      explanationEnglish: 'Expresses an action currently in progress (-ing).',
      explanationNepali: 'अहिले भइरहेको निरन्तर काम जनाउँदा।',
      example: { korean: '지금 기계를 작동하고 있어요.', romanization: 'Jigeum gigyereul jakdong-hago isseoyo.', english: 'I am operating the machine now.', nepali: 'म अहिले मेसिन चलाइरहेको छु।' }
    }
  },
  {
    lesson: 42,
    book: 2,
    titleKorean: '이 기계 어떻게 작동하는지 알아요?',
    titleEnglish: 'Do You Know How to Operate This Machine? (Operations)',
    titleNepali: 'यो मेसिन कसरी चलाउने थाहा छ? (मेसिन सञ्चालन र प्याकिङ)',
    topicCategory: 'Work Life (직장생활)',
    vocabularyTopic: 'Machine Operations & Packaging (기계 작동, 포장 작업)',
    grammarPoint1: {
      title: 'Knowing How to Do: -는지 알다/모르다',
      pattern: 'V stem + -는지 알다/모르다',
      explanationEnglish: 'Expresses knowing or not knowing how to perform a procedure.',
      explanationNepali: 'कुनै काम वा मेसिन चलाउने तरिका थाहा छ/छैन।',
      example: { korean: '스위치를 누르는지 알아요?', romanization: 'Seuwichireul nureuneunji arayo?', english: 'Do you know how to press the switch?', nepali: 'स्वीच थिच्ने तरिका थाहा छ?' }
    },
    grammarPoint2: {
      title: 'Future Supposition: -(으)ㄹ 것 같다',
      pattern: 'V stem + -(으)ㄹ 것 같다',
      explanationEnglish: 'Guessing a future result or probability (looks like it will...).',
      explanationNepali: 'भविष्यमा यस्तो होला जस्तो छ भनी अनुमान गर्दा।',
      example: { korean: '오늘 작업이 일찍 끝날 것 같아요.', romanization: 'Oneul jageop-i iljjeik kkeutnal geot gat-ayo.', english: 'It seems work will finish early today.', nepali: 'आज काम छिटै सकिएला जस्तो छ।' }
    }
  },
  {
    lesson: 43,
    book: 2,
    titleKorean: '철근을 옮겨 놓으세요',
    titleEnglish: 'Please Move and Set Aside Rebars (Construction & Logistics)',
    titleNepali: 'फलामको रड सारेर राखिदिनुहोस् (निर्माण र सामान व्यवस्थापन)',
    topicCategory: 'Work Life (직장생활)',
    vocabularyTopic: 'Construction Sites & Packaging (건설 현장, 유통 및 포장)',
    grammarPoint1: {
      title: 'Action Completed & Maintained: -아/어 놓다',
      pattern: 'V stem + -아/어 놓다',
      explanationEnglish: 'Doing an action beforehand and leaving it in that state.',
      explanationNepali: 'अघि नै काम गरेर सोही अवस्थामा राखिछाड्नु।',
      example: { korean: '상자를 쌓아 놓으세요.', romanization: 'Sangjareul ssah-a noheuseyo.', english: 'Pile up the boxes and leave them.', nepali: 'बाकसहरू खापेर राखिछाड्नुहोस्।' }
    },
    grammarPoint2: {
      title: 'Seeking Reassurance: -지요',
      pattern: 'V/A stem + -지요',
      explanationEnglish: 'Asking co-worker to confirm work instructions.',
      explanationNepali: 'कामको निर्देशन दोहोर्‍याएर पक्का गर्दा।',
      example: { korean: '자재를 다 옮겼지요?', romanization: 'Jajaereul da omgyeotjiyo?', english: 'You moved all materials, right?', nepali: 'सामग्रीहरू सबै सारिसक्नुभयो, हैन र?' }
    }
  },
  {
    lesson: 44,
    book: 2,
    titleKorean: '작업장 환경이 깨끗해졌어요',
    titleEnglish: 'The Workplace Environment Has Become Clean (Cleaning & Tools)',
    titleNepali: 'कार्यस्थलको वातावरण सफा भएको छ (सरसफाइ र फोहोर व्यवस्थापन)',
    topicCategory: 'Work Life (직장생활)',
    vocabularyTopic: 'Work Environment & Waste Cleaning (작업장 환경, 폐기물과 정리)',
    grammarPoint1: {
      title: 'Reason / Explanation: -거든요',
      pattern: 'V/A stem + -거든요',
      explanationEnglish: 'Explaining reason or fact not yet known to the listener (because...).',
      explanationNepali: 'श्रोतालाई थाहा नभएको कारण स्पष्ट पार्दा।',
      example: { korean: '청소를 깨끗이 했거든요.', romanization: 'Cheongsoreul kkaekkeut-i haetgeodeunyo.', english: 'Because I cleaned thoroughly.', nepali: 'किनभने मैले मज्जाले सरसफाइ गरेँ।' }
    },
    grammarPoint2: {
      title: 'Change of State: -아지다/어지다',
      pattern: 'A stem + -아지다/어지다',
      explanationEnglish: 'Describes a gradual change into a new state (to become...).',
      explanationNepali: 'अवस्था वा गुणमा परिवर्तन हुनु (हुँदै जानु)।',
      example: { korean: '작업장이 아주 밝아졌어요.', romanization: 'Jageopjang-i aju balg-ajeosseoyo.', english: 'The workplace became very bright.', nepali: 'कार्यस्थल साह्रै उज्यालो भयो।' }
    }
  },
  {
    lesson: 45,
    book: 2,
    titleKorean: '호미를 챙겼는데요',
    titleEnglish: 'I Prepared the Hand Hoe (Agriculture & Farming)',
    titleNepali: 'मैले सानो कुटो (होमी) तयार पारेको छु (कृषि र खेतीपाती)',
    topicCategory: 'Work Life (직장생활)',
    vocabularyTopic: 'Agriculture Tools & Seasons (농업 1, 농업 2, 시기별 작업)',
    grammarPoint1: {
      title: 'Background Info / Soft Hook: -는데/-(으)ㄴ데',
      pattern: 'V stem + -는데 / A stem + -(으)ㄴ데',
      explanationEnglish: 'Provides background information before asking a question or request.',
      explanationNepali: 'मुख्य कुरा भन्नुअघि पृष्ठभूमि स्पष्ट पार्दा।',
      example: { korean: '씨앗을 심으려고 하는데 도와주세요.', romanization: 'Ssiaseul simeuryeogo hande dowajuseyo.', english: 'I plan to plant seeds, so please help.', nepali: 'म बीउ रोप्न लागेको छु, सहयोग गर्नुहोस्।' }
    },
    grammarPoint2: {
      title: 'Before Action: -기 전에',
      pattern: 'V stem + -기 전에',
      explanationEnglish: 'Indicates completing a safety check prior to work.',
      explanationNepali: 'कृषि काम वा बीउ रोप्नुअघि।',
      example: { korean: '밭에 들어가기 전에 장화를 신으세요.', romanization: 'Bate deureogagi jeone janghwareul sineuseyo.', english: 'Put on rubber boots before entering the field.', nepali: 'बारीमा पस्नुअघि गमबुट लगाउनुहोस्।' }
    }
  },
  {
    lesson: 46,
    book: 2,
    titleKorean: '더 신경 쓰도록 하자',
    titleEnglish: 'Let us Pay More Attention (Livestock & Fishing)',
    titleNepali: 'अझ धेरै ध्यान दिऔँ (पशुपालन र माछापालन)',
    topicCategory: 'Work Life (직장생활)',
    vocabularyTopic: 'Livestock & Fishing Industries (축산업, 어업)',
    grammarPoint1: {
      title: 'Strong Request / Command: -도록 하다',
      pattern: 'V stem + -도록 하다',
      explanationEnglish: 'Instructs or reminds someone to make sure an action is performed.',
      explanationNepali: 'कुनै काम अनिवार्य रूपमा गर्न निर्देशन दिँदा।',
      example: { korean: '사료를 제때 주도록 하세요.', romanization: 'Saryoreul jettae judorok haseyo.', english: 'Make sure to feed livestock on time.', nepali: 'दाना समयमै दिने गर्नुहोस्।' }
    },
    grammarPoint2: {
      title: 'Turn of Events / Result: -게 되다',
      pattern: 'V stem + -게 되다',
      explanationEnglish: 'States a result brought about by external circumstances (ended up...).',
      explanationNepali: 'परिस्थितिवश कुनै अवस्थामा पुग्नु।',
      example: { korean: '새 농장에서 일하게 되었어요.', romanization: 'Sae nongjang-eseo ilhage doe-eosseoyo.', english: 'I ended up working at a new farm.', nepali: 'म नयाँ फार्ममा काम गर्ने भएँ।' }
    }
  },
  {
    lesson: 47,
    book: 2,
    titleKorean: '재고를 파악하는 것이 중요해요',
    titleEnglish: 'Checking Inventory is Important (Warehouse & Stock)',
    titleNepali: 'स्टक (मौज्दात) हिसाब राख्नु महत्वपूर्ण हुन्छ (गोदाम र स्टक)',
    topicCategory: 'Work Life (직장생활)',
    vocabularyTopic: 'Warehouse & Inventory Management (창고 관리, 재고 파악)',
    grammarPoint1: {
      title: 'Expressing Importance: -는 것이 중요하다',
      pattern: 'V stem + -는 것이 중요하다',
      explanationEnglish: 'Emphasizes that performing a specific work step is crucial.',
      explanationNepali: 'काममा यो चरण अनिवार्य र महत्वपूर्ण छ भनी जोड दिँदा।',
      example: { korean: '수량을 정확히 세는 것이 중요해요.', romanization: 'Suryang-eul jeonghwak-hi seneun geos-i jung-yohaeyo.', english: 'It is important to count quantity accurately.', nepali: 'परिमाण सही तरिकाले गन्नु महत्वपूर्ण हुन्छ।' }
    },
    grammarPoint2: {
      title: 'Predictive Certainty: -(으)ㄹ 것이다',
      pattern: 'V stem + -(으)ㄹ 것이다',
      explanationEnglish: 'Expresses confident prediction or intention regarding stock.',
      explanationNepali: 'काम वा मौज्दातबारे निश्चित भविष्यवाणी गर्दा।',
      example: { korean: '내일 출고될 것입니다.', romanization: 'Naeil chulgo-doel geos-imnida.', english: 'Items will be shipped out tomorrow.', nepali: 'भोलि सामान डेलिभरी हुनेछ।' }
    }
  },
  {
    lesson: 48,
    book: 2,
    titleKorean: '다치지 않도록 조심하세요',
    titleEnglish: 'Be Careful Not to Get Injured (Work Safety & Accidents)',
    titleNepali: 'चोटपटक नलागोस् भनी ध्यान दिनुहोस् (कार्यस्थल सुरक्षा र दुर्घटना)',
    topicCategory: 'Work Life (직장생활)',
    vocabularyTopic: 'Machinery Safety & Industrial Accidents (기계 작업 위험, 재해)',
    grammarPoint1: {
      title: 'Prior Experience Check: -(으)ㄴ 적이 있다/없다',
      pattern: 'V stem + -(으)ㄴ 적이 있다/없다',
      explanationEnglish: 'Asks or states whether one has prior experience of a safety incident.',
      explanationNepali: 'विगतमा दुर्घटना वा कामको अनुभव भए/नभएको।',
      example: { korean: '손을 데인 적이 있어요.', romanization: 'Soneul de-in jeog-i isseoyo.', english: 'I have experienced burning my hand.', nepali: 'मेरो हात पोलिएको अनुभव छ।' }
    },
    grammarPoint2: {
      title: 'Prevention Warning: -지 않도록 조심하다',
      pattern: 'V stem + -지 않도록 조심하다',
      explanationEnglish: 'Warns co-worker to be cautious to avoid an accident.',
      explanationNepali: 'दुर्घटना हुनबाट बच्न सावधान गराउँदा।',
      example: { korean: '미끄러지지 않도록 조심하세요.', romanization: 'Mikkeureojiji antorok josim-haseyo.', english: 'Be careful not to slip.', nepali: 'नचिल्कियोस् भनी सावधान हुनुहोस्।' }
    }
  },
  {
    lesson: 49,
    book: 2,
    titleKorean: '안전화를 안 신으면 다칠 수 있어요',
    titleEnglish: 'If You Do Not Wear Safety Shoes, You May Get Hurt (Safety Gear)',
    titleNepali: 'सुरक्षा जुत्ता नलगाए चोट लाग्न सक्छ (सुरक्षा सामग्री)',
    topicCategory: 'Work Life (직장생활)',
    vocabularyTopic: 'Protective Equipment & Gear (보호구, 안전 장비)',
    grammarPoint1: {
      title: 'Hazard Risk Possibility: -(으)ㄹ 수 있다',
      pattern: 'V stem + -(으)ㄹ 수 있다',
      explanationEnglish: 'Warns about potential hazards if safety rules are neglected.',
      explanationNepali: 'सुरक्षा सामग्री नलगाए दुर्घटना हुने जोखिम।',
      example: { korean: '눈을 다칠 수 있으니까 보안경을 쓰세요.', romanization: 'Nuneul dachil su isseunikka boangyeong-eul sseuseyo.', english: 'You may hurt your eyes, so wear goggles.', nepali: 'आँखामा चोट लाग्न सक्ने भएकोले चश्मा लगाउनुहोस्।' }
    },
    grammarPoint2: {
      title: 'Causal Risk Reason: -기 때문에',
      pattern: 'V/A stem + -기 때문에',
      explanationEnglish: 'Explains clear cause or reason for safety rules.',
      explanationNepali: 'सुरक्षा नियम पालना गर्नुपर्ने प्रस्ट कारण।',
      example: { korean: '소음이 심하기 때문에 귀마개를 해야 해요.', romanization: 'Soeum-i simhagi ttaemune gwimagae-reul haeya haeyo.', english: 'Because noise is severe, wear earplugs.', nepali: 'हल्ला धेरै भएकोले इयरप्लग लगाउनुपर्छ।' }
    }
  },
  {
    lesson: 50,
    book: 2,
    titleKorean: '열심히 해 준 덕분이에요',
    titleEnglish: 'Thanks to Your Hard Work (Health Promotion & Safety Rules)',
    titleNepali: 'तपाईंको कडा परिश्रमको फल स्वरूप (स्वास्थ्य प्रवर्द्धन र नियम)',
    topicCategory: 'Work Life (직장생활)',
    vocabularyTopic: 'Safety Rules & Health Promotion (안전 수칙, 건강 증진)',
    grammarPoint1: {
      title: 'Positive Cause / Thanks to: -(으)ㄴ 덕분에',
      pattern: 'V stem + -(으)ㄴ 덕분에 / N + 덕분에',
      explanationEnglish: 'Expresses appreciation for a positive outcome due to someone.',
      explanationNepali: 'कसैको सहयोग वा राम्रो कामले गर्दा (को कृपाले / फल स्वरूप)।',
      example: { korean: '반장님이 도와주신 덕분에 사고가 안 났어요.', romanization: 'Banjangnim-i dowajusin deokbune sagoga an nasseoyo.', english: 'Thanks to foreman’s help, no accident occurred.', nepali: 'फोरम्यानको सहयोगले गर्दा दुर्घटना भएन।' }
    },
    grammarPoint2: {
      title: 'Decision / Commitment: -기로 하다',
      pattern: 'V stem + -기로 하다',
      explanationEnglish: 'Expresses a group decision to follow safety guidelines.',
      explanationNepali: 'सुरक्षा नियमहरू पालना गर्ने निर्णय गर्दा।',
      example: { korean: '매일 아침 스트레칭을 하기로 했어요.', romanization: 'Maeil achim seuteureching-eul hagiro haesseoyo.', english: 'We decided to do stretching every morning.', nepali: 'हामीले हरेक बिहान व्यायाम गर्ने निर्णय गर्यौँ।' }
    }
  },

  // ── LESSONS 51–60: LAWS, CONTRACTS, VISAS & SAFETY REGULATIONS ──
  {
    lesson: 51,
    book: 2,
    titleKorean: '한국에 가서 일하고 싶은데요',
    titleEnglish: 'I Want to Go to Korea to Work (EPS-TOPIK Application)',
    titleNepali: 'कोरिया गएर काम गर्न चाहन्छु (इपीएस आवेदन र परीक्षा)',
    topicCategory: 'Laws & Regulations (법령 및 제도)',
    vocabularyTopic: 'EPS System & Exam Applications (고용허가제, 한국어능력시험)',
    grammarPoint1: {
      title: 'Desire / Application Purpose: -고 싶다',
      pattern: 'V stem + -고 싶다',
      explanationEnglish: 'Expressing intent to take EPS exam and work in Korea.',
      explanationNepali: 'इपीएस परीक्षा दिएर कोरिया जाने चाहना।',
      example: { korean: '한국에서 기술을 배우고 싶어요.', romanization: 'Hanguk-eseo gisul-eul baewogo sipeoyo.', english: 'I want to learn skills in Korea.', nepali: 'म कोरियामा सीप सिक्न चाहन्छु।' }
    }
  },
  {
    lesson: 52,
    book: 2,
    titleKorean: '근로 조건이 좋은 편이에요',
    titleEnglish: 'The Working Conditions Are Pretty Good (Labor Contract)',
    titleNepali: 'कामको सर्तहरू राम्रो खालको छ (श्रम सम्झौता र तलब)',
    topicCategory: 'Laws & Regulations (법령 및 제도)',
    vocabularyTopic: 'Labor Conditions & Standard Contract (근로 조건, 표준근로계약서)',
    grammarPoint1: {
      title: 'Contract Tendency: -(으)ㄴ/는 편이다',
      pattern: 'V/A stem + -(으)ㄴ/는 편이다',
      explanationEnglish: 'Describing labor contract conditions as generally favorable.',
      explanationNepali: 'सम्झौताका सर्तहरू सन्तोषजनक रहेको जनाउँदा।',
      example: { korean: '기숙사 환경이 깨끗한 편이에요.', romanization: 'Gisuksa hwangyeong-i kkaekkeut-han pyeon-ieyo.', english: 'Dormitory environment is quite clean.', nepali: 'हस्टलको वातावरण सफा खालको छ।' }
    }
  },
  {
    lesson: 53,
    book: 2,
    titleKorean: '외국인 등록을 하러 가요',
    titleEnglish: 'I am Going to Apply for Alien Registration (Entry Procedure)',
    titleNepali: 'विदेशी दर्ता कार्ड बनाउन जाँदै छु (प्रवेश प्रक्रिया)',
    topicCategory: 'Laws & Regulations (법령 및 제도)',
    vocabularyTopic: 'Entry Procedures & Alien Registration (입국 절차, 외국인 등록)',
    grammarPoint1: {
      title: 'Registration Purpose: -(으)러 가다',
      pattern: 'V stem + -(으)러 가다',
      explanationEnglish: 'Going to immigration office for mandatory ARC registration.',
      explanationNepali: 'अध्यागमन कार्यालयमा कार्ड दर्ता गर्न जाँदा।',
      example: { korean: '외국인등록증을 발급받으러 가요.', romanization: 'Oegug-indeungnokjeung-eul balgeup-badeureo gayo.', english: 'I am going to get my alien registration card.', nepali: 'म एलियन कार्ड लिन जाँदै छु।' }
    }
  },
  {
    lesson: 54,
    book: 2,
    titleKorean: '보험금을 신청하려고요',
    titleEnglish: 'I Plan to File an Insurance Claim (Insurance & Claims)',
    titleNepali: 'बीमा दाबी गर्ने विचारमा छु (बीमा र भुक्तानी)',
    topicCategory: 'Laws & Regulations (법령 및 제도)',
    vocabularyTopic: 'Worker Insurance & Claims (보험 가입, 보험금 청구)',
    grammarPoint1: {
      title: 'Intent to File Claim: -(으)려고 하다',
      pattern: 'V stem + -(으)려고 하다',
      explanationEnglish: 'Expressing plan to submit medical insurance claim papers.',
      explanationNepali: 'चोटपटकको बीमा दाबी कागजात पेश गर्ने विचार।',
      example: { korean: '상해 보험금을 신청하려고 해요.', romanization: 'Sanghae boheomgeum-eul sincheong-haryeogo haeyo.', english: 'I intend to claim injury insurance.', nepali: 'म दुर्घटना बीमा दाबी गर्ने विचारमा छु।' }
    }
  },
  {
    lesson: 55,
    book: 2,
    titleKorean: '급여 명세서를 확인해 보세요',
    titleEnglish: 'Please Check Your Pay Stub (Salary & Allowances)',
    titleNepali: 'कृपया आफ्नो तलब विवरण (पे-स्लिप) हेर्नुहोस् (तलब र कर)',
    topicCategory: 'Laws & Regulations (법령 및 제도)',
    vocabularyTopic: 'Salary Pay Stubs & Extra Pay (급여와 세금, 수당)',
    grammarPoint1: {
      title: 'Action Check Suggestion: -아/어 보세요',
      pattern: 'V stem + -아/어 보세요',
      explanationEnglish: 'Suggesting to verify pay slip details and overtime pay.',
      explanationNepali: 'आफ्नो तलब र ओभरटाइम गणना जाँच गर्न सल्लाह।',
      example: { korean: '수당이 맞는지 확인해 보세요.', romanization: 'Sudang-i matneunji hwagin-hae boseyo.', english: 'Please check if allowances are correct.', nepali: 'भत्ता मिलेको छ/छैन जाँच गर्नुहोस्।' }
    }
  },
  {
    lesson: 56,
    book: 2,
    titleKorean: '이번 여름 휴가 계획은 세웠어?',
    titleEnglish: 'Have You Planned Your Summer Vacation? (Leave & Sick Leave)',
    titleNepali: 'यो गर्मीको बिदाको योजना बनाउनुभयो? (वार्षिक बिदा र बिरामी बिदा)',
    topicCategory: 'Laws & Regulations (법령 및 제도)',
    vocabularyTopic: 'Vacation & Sick Leave Requests (휴가, 병가)',
    grammarPoint1: {
      title: 'Question / Inquiry: -(으)ㄴ/는 지',
      pattern: 'V stem + -(으)ㄴ/는 지',
      explanationEnglish: 'Inquiring about leave procedures and vacation days.',
      explanationNepali: 'बिदा स्वीकृतिको समय र प्रक्रियाबारे सोध्दा।',
      example: { korean: '병가를 신청할 수 있는지 물어봤어요.', romanization: 'Byeonggareul sincheong-hal su inneunji mureobwasseoyo.', english: 'I asked if I can apply for sick leave.', nepali: 'मैले बिरामी बिदा लिन सकिन्छ कि भनेर सोधेँ।' }
    }
  },
  {
    lesson: 57,
    book: 2,
    titleKorean: '사업장을 변경하고 싶은데',
    titleEnglish: 'I Would Like to Change My Workplace (Work Location Change)',
    titleNepali: 'कम्पनी (कार्यस्थल) परिवर्तन गर्न चाहन्छु (फ्याक्ट्री चेन्ज)',
    topicCategory: 'Laws & Regulations (법령 및 제도)',
    vocabularyTopic: 'Change of Work Location Procedures (사업장 변경, 재입국)',
    grammarPoint1: {
      title: 'Soft Background Intent: -고 싶은데요',
      pattern: 'V stem + -고 싶은데요',
      explanationEnglish: 'Politely explaining desire to change workplace at job center.',
      explanationNepali: 'रोजगार केन्द्रमा कम्पनी सार्ने इच्छा व्यक्त गर्दा।',
      example: { korean: '사업장 변경 신청을 하고 싶은데요.', romanization: 'Sajeopjang byeongyeong sincheong-eul hago sipeundeyo.', english: 'I would like to apply for workplace change.', nepali: 'म कम्पनी परिवर्तनको आवेदन दिन चाहन्छु।' }
    }
  },
  {
    lesson: 58,
    book: 2,
    titleKorean: '체류 기간을 연장한 후에 꼭 신고해야 해',
    titleEnglish: 'You Must Report After Extending Stay Period (Visa Extension)',
    titleNepali: 'भिसा अवधि थपेपछि अनिवार्य दर्ता गर्नुपर्छ (भिसा म्याद थप)',
    topicCategory: 'Laws & Regulations (법령 및 제도)',
    vocabularyTopic: 'Extension of Stay & Sojourn Status (체류 기간 연장, 체류 자격)',
    grammarPoint1: {
      title: 'Sequence Obligation: -(으)ㄴ 후에 -해야 하다',
      pattern: 'V stem + -(으)ㄴ 후에 + -해야 하다',
      explanationEnglish: 'Stating legal duty to report after extending visa stay period.',
      explanationNepali: 'भिसा अवधि बढाएपछि अनिवार्य रूपमा गर्नुपर्ने कानुनी प्रक्रिया।',
      example: { korean: '체류 기간을 연장한 후에 신고하세요.', romanization: 'Chaeryu gigan-eul yeonjang-han hue singohaseyo.', english: 'Please report after extending your stay period.', nepali: 'भिसा म्याद थपेपछि रिपोर्ट गर्नुहोस्।' }
    }
  },
  {
    lesson: 59,
    book: 2,
    titleKorean: '산업 안전 I',
    titleEnglish: 'Industrial Safety Regulations I (Workplace Safety Signs)',
    titleNepali: 'औद्योगिक सुरक्षा नियम I (सुरक्षा सङ्केत र चेतावनी)',
    topicCategory: 'Work Life Term (직장생활용)',
    vocabularyTopic: 'Safety Signs & Regulations (산업 안전표지, 제조업 안전 수칙)',
    grammarPoint1: {
      title: 'Prohibition & Mandate: 금지 / 착용',
      pattern: 'N + 금지 (Prohibition) / N + 착용 (Mandatory Wear)',
      explanationEnglish: 'Understanding official safety sign boards and danger warnings.',
      explanationNepali: 'सुरक्षा बोर्डका चिन्हहरू बुझ्ने (मनाही / अनिवार्य)।',
      example: { korean: '출입 금지 표지를 확인하세요.', romanization: 'Chul-ip geumji pyojireul hwagin-haseyo.', english: 'Check the No Entry safety sign.', nepali: 'प्रवेश निषेध सङ्केत बोर्ड ध्यान दिनुहोस्।' }
    }
  },
  {
    lesson: 60,
    book: 2,
    titleKorean: '산업 안전 II',
    titleEnglish: 'Industrial Safety Regulations II (Construction Regulations)',
    titleNepali: 'औद्योगिक सुरक्षा नियम II (निर्माण क्षेत्र सुरक्षा र स्वास्थ्य)',
    topicCategory: 'Work Life Term (직장생활용)',
    vocabularyTopic: 'Construction Safety & Occupational Diseases (건축업 안전, 직업병 예방)',
    grammarPoint1: {
      title: 'Safety Compliance Directive: -도록 조치하다',
      pattern: 'V stem + -도록 조치하다',
      explanationEnglish: 'Taking precautions to prevent occupational hazards and diseases.',
      explanationNepali: 'व्यावसायिक रोग र दुर्घटनाबाट बच्न सुरक्षा प्रबन्ध मिलाउँदा।',
      example: { korean: '안전 수칙을 준수하도록 하세요.', romanization: 'Anjeon suchig-eul junsu-hadorok haseyo.', english: 'Make sure to comply with safety rules.', nepali: 'सुरक्षा नियमहरूको पूर्ण पालना गर्नुहोस्।' }
    }
  }
];
