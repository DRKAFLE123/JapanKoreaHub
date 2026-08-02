import { KoreanVocabItem } from '@/lib/korean-vocab';

// ============================================================================
// EPS-TOPIK LESSONS 1–15 VOCABULARY DATASET (Phase 1)
// Authentic EPS-TOPIK Textbook Data with Bilingual English & Nepali Meanings
// ============================================================================

export const EPS_LESSONS_1_15_VOCAB: KoreanVocabItem[] = [
  // ── LESSON 1: Greetings & Self-Introduction (인사말과 자기소개) ──
  {
    id: 'eps_l1_1', lesson: 1, level: 'EPS', word: '안녕하세요', romanization: 'Annyeonghaseyo',
    meaning: 'Hello (formal)', meaningNepali: 'नमस्कार (औपचारिक)', partOfSpeech: 'Expression', topic: 'Greetings',
    grammarSentences: [{ korean: '안녕하세요! 저는 라젠드라입니다.', romanization: 'Annyeonghaseyo! Jeoneun Rajendra-imnida.', english: 'Hello! I am Rajendra.', nepali: 'नमस्कार! म राजेन्द्र हुँ।' }]
  },
  {
    id: 'eps_l1_2', lesson: 1, level: 'EPS', word: '만나서 반갑습니다', romanization: 'Mannaseo bangapseumnida',
    meaning: 'Nice to meet you', meaningNepali: 'भेटेर खुसी लाग्यो', partOfSpeech: 'Expression', topic: 'Greetings',
    grammarSentences: [{ korean: '만나서 반갑습니다. 잘 부탁드립니다.', romanization: 'Mannaseo bangapseumnida. Jal 부탁드립니다.', english: 'Nice to meet you. Please treat me well.', nepali: 'भेटेर खुसी लाग्यो। कृपया राम्रो व्यवहार गरिदिनुहोला।' }]
  },
  {
    id: 'eps_l1_3', lesson: 1, level: 'EPS', word: '이름', romanization: 'Ireum',
    meaning: 'Name', meaningNepali: 'नाम', partOfSpeech: 'Noun', topic: 'Self-Introduction',
    grammarSentences: [{ korean: '이름이 무엇입니까?', romanization: 'Ireumi mueosimnikka?', english: 'What is your name?', nepali: 'तपाईंको नाम के हो?' }]
  },
  {
    id: 'eps_l1_4', lesson: 1, level: 'EPS', word: '국적', romanization: 'Gukjeok',
    meaning: 'Nationality', meaningNepali: 'राष्ट्रियता', partOfSpeech: 'Noun', topic: 'Self-Introduction'
  },
  {
    id: 'eps_l1_5', lesson: 1, level: 'EPS', word: '네팔 사람', romanization: 'Nepal saram',
    meaning: 'Nepali person', meaningNepali: 'नेपाली नागरिक', partOfSpeech: 'Noun', topic: 'Self-Introduction',
    grammarSentences: [{ korean: '저는 네팔 사람입니다.', romanization: 'Jeoneun Nepal saram-imnida.', english: 'I am a Nepali person.', nepali: 'म नेपाली नागरिक हुँ।' }]
  },
  {
    id: 'eps_l1_6', lesson: 1, level: 'EPS', word: '직업', romanization: 'Jigeop',
    meaning: 'Occupation / Job', meaningNepali: 'पेशा / काम', partOfSpeech: 'Noun', topic: 'Self-Introduction'
  },
  {
    id: 'eps_l1_7', lesson: 1, level: 'EPS', word: '근로자', romanization: 'Geulloja',
    meaning: 'Worker / Employee', meaningNepali: 'कामदार / श्रमिक', partOfSpeech: 'Noun', topic: 'Self-Introduction',
    grammarSentences: [{ korean: '저는 한국에서 일하는 근로자입니다.', romanization: 'Jeoneun Hangeuk-eseo ilhaneun geulloja-imnida.', english: 'I am a worker working in Korea.', nepali: 'म कोरियामा काम गर्ने कामदार हुँ।' }]
  },

  // ── LESSON 2: Classroom & Office Items (교실과 사무용품) ──
  {
    id: 'eps_l2_1', lesson: 2, level: 'EPS', word: '선생님', romanization: 'Seonsaengnim',
    meaning: 'Teacher', meaningNepali: 'शिक्षक / गुरु', partOfSpeech: 'Noun', topic: 'Classroom'
  },
  {
    id: 'eps_l2_2', lesson: 2, level: 'EPS', word: '학생', romanization: 'Haksaeng',
    meaning: 'Student', meaningNepali: 'विद्यार्थी', partOfSpeech: 'Noun', topic: 'Classroom'
  },
  {
    id: 'eps_l2_3', lesson: 2, level: 'EPS', word: '칠판', romanization: 'Chilpan',
    meaning: 'Blackboard / Whiteboard', meaningNepali: 'ब्ल्याकबोर्ड / पाटी', partOfSpeech: 'Noun', topic: 'Classroom'
  },
  {
    id: 'eps_l2_4', lesson: 2, level: 'EPS', word: '책상', romanization: 'Chaeksang',
    meaning: 'Desk', meaningNepali: 'डेस्क / टेबुल', partOfSpeech: 'Noun', topic: 'Classroom'
  },
  {
    id: 'eps_l2_5', lesson: 2, level: 'EPS', word: '의자', romanization: 'Uija',
    meaning: 'Chair', meaningNepali: 'कुर्सी', partOfSpeech: 'Noun', topic: 'Classroom'
  },
  {
    id: 'eps_l2_6', lesson: 2, level: 'EPS', word: '볼펜', romanization: 'Bolpen',
    meaning: 'Ballpoint pen', meaningNepali: 'कलम', partOfSpeech: 'Noun', topic: 'Stationery'
  },
  {
    id: 'eps_l2_7', lesson: 2, level: 'EPS', word: '지우개', romanization: 'Jiwugae',
    meaning: 'Eraser', meaningNepali: 'डस्टर / इरेजर', partOfSpeech: 'Noun', topic: 'Stationery'
  },
  {
    id: 'eps_l2_8', lesson: 2, level: 'EPS', word: '시계', romanization: 'Sigye',
    meaning: 'Clock / Watch', meaningNepali: 'घडी', partOfSpeech: 'Noun', topic: 'Classroom'
  },

  // ── LESSON 3: Daily Schedule & Time (일과와 시간) ──
  {
    id: 'eps_l3_1', lesson: 3, level: 'EPS', word: '몇 시', romanization: 'Myeot si',
    meaning: 'What time', meaningNepali: 'कति बजे', partOfSpeech: 'Phrase', topic: 'Time',
    grammarSentences: [{ korean: '지금 몇 시입니까?', romanization: 'Jigeum myeot si-imnikka?', english: 'What time is it now?', nepali: 'अहिले कति बजेको छ?' }]
  },
  {
    id: 'eps_l3_2', lesson: 3, level: 'EPS', word: '오전', romanization: 'Ojeon',
    meaning: 'AM / Morning', meaningNepali: 'पूर्वाह्न / बिहान', partOfSpeech: 'Noun', topic: 'Time'
  },
  {
    id: 'eps_l3_3', lesson: 3, level: 'EPS', word: '오후', romanization: 'Ohu',
    meaning: 'PM / Afternoon', meaningNepali: 'अपराह्न / दिउँसो', partOfSpeech: 'Noun', topic: 'Time'
  },
  {
    id: 'eps_l3_4', lesson: 3, level: 'EPS', word: '출근하다', romanization: 'Chulgeunhada',
    meaning: 'To go to work', meaningNepali: 'काममा जानु', partOfSpeech: 'Verb', topic: 'Work Schedule',
    grammarSentences: [{ korean: '매일 아침 8시에 출근합니다.', romanization: 'Maeil achim 8-si-e chulgeunhamnida.', english: 'I go to work at 8 AM every morning.', nepali: 'म हरेक बिहान ८ बजे काममा जान्छु।' }]
  },
  {
    id: 'eps_l3_5', lesson: 3, level: 'EPS', word: '퇴근하다', romanization: 'Toegeunhada',
    meaning: 'To leave / finish work', meaningNepali: 'कामबाट छुट्टिनु', partOfSpeech: 'Verb', topic: 'Work Schedule',
    grammarSentences: [{ korean: '저녁 6시에 퇴근합니다.', romanization: 'Jeonyeok 6-si-e toegeunhamnida.', english: 'I finish work at 6 PM.', nepali: 'म साँझ ६ बजे कामबाट छुट्टिन्छु।' }]
  },
  {
    id: 'eps_l3_6', lesson: 3, level: 'EPS', word: '점심시간', romanization: 'Jeomsimsigan',
    meaning: 'Lunch break', meaningNepali: 'खाना खाने समय', partOfSpeech: 'Noun', topic: 'Daily Routine'
  },

  // ── LESSON 4: Family & Appearance (가족과 외모) ──
  {
    id: 'eps_l4_1', lesson: 4, level: 'EPS', word: '할아버지', romanization: 'Harabeoji',
    meaning: 'Grandfather', meaningNepali: 'हजुरबुबा', partOfSpeech: 'Noun', topic: 'Family'
  },
  {
    id: 'eps_l4_2', lesson: 4, level: 'EPS', word: '할머니', romanization: 'Halmeoni',
    meaning: 'Grandmother', meaningNepali: 'हजुरआमा', partOfSpeech: 'Noun', topic: 'Family'
  },
  {
    id: 'eps_l4_3', lesson: 4, level: 'EPS', word: '부모님', romanization: 'Bumonim',
    meaning: 'Parents', meaningNepali: 'अभिभावक / आमाबुबा', partOfSpeech: 'Noun', topic: 'Family'
  },
  {
    id: 'eps_l4_4', lesson: 4, level: 'EPS', word: '키가 크다', romanization: 'Kiga keuda',
    meaning: 'To be tall', meaningNepali: 'अग्लो हुनु', partOfSpeech: 'Adjective', topic: 'Appearance'
  },
  {
    id: 'eps_l4_5', lesson: 4, level: 'EPS', word: '날씬하다', romanization: 'Nalssinhada',
    meaning: 'To be slim / thin', meaningNepali: 'दुब्लो / आकर्षक हुनु', partOfSpeech: 'Adjective', topic: 'Appearance'
  },

  // ── LESSON 5: Date & Weather (날짜와 날씨) ──
  {
    id: 'eps_l5_1', lesson: 5, level: 'EPS', word: '몇 월 몇 일', romanization: 'Myeot wol myeot il',
    meaning: 'What date', meaningNepali: 'कति महिना कति गते', partOfSpeech: 'Phrase', topic: 'Date'
  },
  {
    id: 'eps_l5_2', lesson: 5, level: 'EPS', word: '맑다', romanization: 'Makda',
    meaning: 'To be clear / sunny', meaningNepali: 'सफा / घमाइलो हुनु', partOfSpeech: 'Adjective', topic: 'Weather'
  },
  {
    id: 'eps_l5_3', lesson: 5, level: 'EPS', word: '흐리다', romanization: 'Heurida',
    meaning: 'To be cloudy', meaningNepali: 'बादल लाग्नु', partOfSpeech: 'Adjective', topic: 'Weather'
  },
  {
    id: 'eps_l5_4', lesson: 5, level: 'EPS', word: '비가 오다', romanization: 'Biga oda',
    meaning: 'To rain', meaningNepali: 'पानी पर्नु', partOfSpeech: 'Verb', topic: 'Weather'
  },
  {
    id: 'eps_l5_5', lesson: 5, level: 'EPS', word: '눈이 오다', romanization: 'Nuni oda',
    meaning: 'To snow', meaningNepali: 'हिउँ पर्नु', partOfSpeech: 'Verb', topic: 'Weather'
  },
  {
    id: 'eps_l5_6', lesson: 5, level: 'EPS', word: '따뜻하다', romanization: 'Ttatteuthada',
    meaning: 'To be warm', meaningNepali: 'न्यानो हुनु', partOfSpeech: 'Adjective', topic: 'Weather'
  },
  {
    id: 'eps_l5_7', lesson: 5, level: 'EPS', word: '춥다', romanization: 'Chupda',
    meaning: 'To be cold', meaningNepali: 'जाडो हुनु', partOfSpeech: 'Adjective', topic: 'Weather'
  },

  // ── LESSON 6: Buying Goods & Shopping (물건 사고파기) ──
  {
    id: 'eps_l6_1', lesson: 6, level: 'EPS', word: '얼마예요', romanization: 'Eolmayeyo',
    meaning: 'How much is it?', meaningNepali: 'यसको कति पर्छ?', partOfSpeech: 'Expression', topic: 'Shopping',
    grammarSentences: [{ korean: '이 사과 얼마예요?', romanization: 'I sagwa eolmayeyo?', english: 'How much is this apple?', nepali: 'यो स्याउको कति पर्छ?' }]
  },
  {
    id: 'eps_l6_2', lesson: 6, level: 'EPS', word: '깎아 주세요', romanization: 'Kkak-a juseyo',
    meaning: 'Please give a discount', meaningNepali: 'कृपया केही मिलाइदिनुस् / घटाइदिनुस्', partOfSpeech: 'Expression', topic: 'Shopping'
  },
  {
    id: 'eps_l6_3', lesson: 6, level: 'EPS', word: '현금', romanization: 'Hyeongeum',
    meaning: 'Cash', meaningNepali: 'नगद पैसा', partOfSpeech: 'Noun', topic: 'Shopping'
  },
  {
    id: 'eps_l6_4', lesson: 6, level: 'EPS', word: '신용카드', romanization: 'Sinyongkadeu',
    meaning: 'Credit card', meaningNepali: 'क्रेडिट कार्ड', partOfSpeech: 'Noun', topic: 'Shopping'
  },
  {
    id: 'eps_l6_5', lesson: 6, level: 'EPS', word: '영수증', romanization: 'Yeongsujeung',
    meaning: 'Receipt', meaningNepali: 'रसीद / बिल', partOfSpeech: 'Noun', topic: 'Shopping'
  },
  {
    id: 'eps_l6_6', lesson: 6, level: 'EPS', word: '포장해 주세요', romanization: 'Pojanghae juseyo',
    meaning: 'Please pack / wrap it', meaningNepali: 'कृपया प्याक गरिदिनुस्', partOfSpeech: 'Expression', topic: 'Shopping'
  },

  // ── LESSON 7: Location & Directions (위치와 방향) ──
  {
    id: 'eps_l7_1', lesson: 7, level: 'EPS', word: '어디', romanization: 'Eodi',
    meaning: 'Where', meaningNepali: 'कहाँ', partOfSpeech: 'Pronoun', topic: 'Directions',
    grammarSentences: [{ korean: '화장실이 어디에 있습니까?', romanization: 'Hwajangsiri eodie itsseumnikka?', english: 'Where is the restroom?', nepali: 'शौचालय कहाँ छ?' }]
  },
  {
    id: 'eps_l7_2', lesson: 7, level: 'EPS', word: '앞', romanization: 'Ap',
    meaning: 'In front of', meaningNepali: 'अगाडि', partOfSpeech: 'Noun', topic: 'Location'
  },
  {
    id: 'eps_l7_3', lesson: 7, level: 'EPS', word: '뒤', romanization: 'Dwi',
    meaning: 'Behind / Back', meaningNepali: 'पछाडि', partOfSpeech: 'Noun', topic: 'Location'
  },
  {
    id: 'eps_l7_4', lesson: 7, level: 'EPS', word: '옆', romanization: 'Yeop',
    meaning: 'Next to / Beside', meaningNepali: 'छेउमा / नजिकै', partOfSpeech: 'Noun', topic: 'Location'
  },
  {
    id: 'eps_l7_5', lesson: 7, level: 'EPS', word: '오른쪽', romanization: 'Oreunjjok',
    meaning: 'Right side', meaningNepali: 'दायाँ तर्फ', partOfSpeech: 'Noun', topic: 'Directions'
  },
  {
    id: 'eps_l7_6', lesson: 7, level: 'EPS', word: '왼쪽', romanization: 'Oenjjok',
    meaning: 'Left side', meaningNepali: 'बायाँ तर्फ', partOfSpeech: 'Noun', topic: 'Directions'
  },
  {
    id: 'eps_l7_7', lesson: 7, level: 'EPS', word: '직진하다', romanization: 'Jikjinhada',
    meaning: 'To go straight', meaningNepali: 'सीधा अगाडि जानु', partOfSpeech: 'Verb', topic: 'Directions'
  },

  // ── LESSON 8: Daily Activities & Routines (일상생활) ──
  {
    id: 'eps_l8_1', lesson: 8, level: 'EPS', word: '일어나다', romanization: 'Ireonada',
    meaning: 'To wake up / get up', meaningNepali: 'उठ्नु', partOfSpeech: 'Verb', topic: 'Daily Routine'
  },
  {
    id: 'eps_l8_2', lesson: 8, level: 'EPS', word: '씻다', romanization: 'Sitda',
    meaning: 'To wash (face/hands)', meaningNepali: 'मुख/हात धुनु', partOfSpeech: 'Verb', topic: 'Daily Routine'
  },
  {
    id: 'eps_l8_3', lesson: 8, level: 'EPS', word: '아침을 먹다', romanization: 'Achimeul meokda',
    meaning: 'To eat breakfast', meaningNepali: 'बिहानको खाना खानु', partOfSpeech: 'Verb', topic: 'Daily Routine'
  },
  {
    id: 'eps_l8_4', lesson: 8, level: 'EPS', word: '일하다', romanization: 'Irhada',
    meaning: 'To work', meaningNepali: 'काम गर्नु', partOfSpeech: 'Verb', topic: 'Daily Routine',
    grammarSentences: [{ korean: '공장에서 열심히 일합니다.', romanization: 'Gongjang-eseo yeolsimhi irhamnida.', english: 'I work hard at the factory.', nepali: 'म कारखानामा कडा मेहेनतका साथ काम गर्छु।' }]
  },
  {
    id: 'eps_l8_5', lesson: 8, level: 'EPS', word: '쉬다', romanization: 'Swida',
    meaning: 'To rest / take a break', meaningNepali: 'आराम गर्नु', partOfSpeech: 'Verb', topic: 'Daily Routine'
  },
  {
    id: 'eps_l8_6', lesson: 8, level: 'EPS', word: '자다', romanization: 'Jada',
    meaning: 'To sleep', meaningNepali: 'सुत्नु', partOfSpeech: 'Verb', topic: 'Daily Routine'
  },

  // ── LESSON 9: Hobbies & Sports (취미와 운동) ──
  {
    id: 'eps_l9_1', lesson: 9, level: 'EPS', word: '취미', romanization: 'Chwimi',
    meaning: 'Hobby / Interest', meaningNepali: 'रुचि / शौक', partOfSpeech: 'Noun', topic: 'Hobbies'
  },
  {
    id: 'eps_l9_2', lesson: 9, level: 'EPS', word: '독서하다', romanization: 'Dokseohada',
    meaning: 'To read books', meaningNepali: 'किताब पढ्नु', partOfSpeech: 'Verb', topic: 'Hobbies'
  },
  {
    id: 'eps_l9_3', lesson: 9, level: 'EPS', word: '등산하다', romanization: 'Deungsanhada',
    meaning: 'To hike / climb mountain', meaningNepali: 'पहाड चढ्नु / ट्रेकिङ गर्नु', partOfSpeech: 'Verb', topic: 'Hobbies'
  },
  {
    id: 'eps_l9_4', lesson: 9, level: 'EPS', word: '축구하다', romanization: 'Chukguhada',
    meaning: 'To play soccer', meaningNepali: 'फुटबल खेल्नु', partOfSpeech: 'Verb', topic: 'Sports'
  },
  {
    id: 'eps_l9_5', lesson: 9, level: 'EPS', word: '수영하다', romanization: 'Suyeonghada',
    meaning: 'To swim', meaningNepali: 'पौडी खेल्नु', partOfSpeech: 'Verb', topic: 'Sports'
  },
  {
    id: 'eps_l9_6', lesson: 9, level: 'EPS', word: '영화 보다', romanization: 'Yeonghwa boda',
    meaning: 'To watch a movie', meaningNepali: 'फिल्म हेर्नु', partOfSpeech: 'Verb', topic: 'Hobbies'
  },

  // ── LESSON 10: Transportation & Travel (교통과 여행) ──
  {
    id: 'eps_l10_1', lesson: 10, level: 'EPS', word: '버스', romanization: 'Beoseu',
    meaning: 'Bus', meaningNepali: 'बस', partOfSpeech: 'Noun', topic: 'Transportation'
  },
  {
    id: 'eps_l10_2', lesson: 10, level: 'EPS', word: '지하철', romanization: 'Jihacheol',
    meaning: 'Subway / Metro train', meaningNepali: 'मेट्रो ट्रेन', partOfSpeech: 'Noun', topic: 'Transportation'
  },
  {
    id: 'eps_l10_3', lesson: 10, level: 'EPS', word: '택시', romanization: 'Taeksi',
    meaning: 'Taxi', meaningNepali: 'ट्याक्सी', partOfSpeech: 'Noun', topic: 'Transportation'
  },
  {
    id: 'eps_l10_4', lesson: 10, level: 'EPS', word: '비행기', romanization: 'Bihaenggi',
    meaning: 'Airplane', meaningNepali: 'हवाई जहाज', partOfSpeech: 'Noun', topic: 'Transportation'
  },
  {
    id: 'eps_l10_5', lesson: 10, level: 'EPS', word: '교통카드', romanization: 'Gyotongkadeu',
    meaning: 'Transportation card (T-Money)', meaningNepali: 'यातातयात कार्ड', partOfSpeech: 'Noun', topic: 'Transportation'
  },
  {
    id: 'eps_l10_6', lesson: 10, level: 'EPS', word: '환승하다', romanization: 'Hwanseunghada',
    meaning: 'To transfer (bus/subway)', meaningNepali: 'गाडी फेर्नु (ट्रान्सफर गर्नु)', partOfSpeech: 'Verb', topic: 'Transportation'
  },

  // ── LESSON 11: Food & Restaurants (음식과 식당) ──
  {
    id: 'eps_l11_1', lesson: 11, level: 'EPS', word: '메뉴판', romanization: 'Menyupan',
    meaning: 'Menu board / card', meaningNepali: 'मेनू कार्ड', partOfSpeech: 'Noun', topic: 'Restaurant'
  },
  {
    id: 'eps_l11_2', lesson: 11, level: 'EPS', word: '주문하다', romanization: 'Jumunhada',
    meaning: 'To order food', meaningNepali: 'खाना अर्डर गर्नु', partOfSpeech: 'Verb', topic: 'Restaurant',
    grammarSentences: [{ korean: '비빔밥 2인분 주문하겠습니다.', romanization: 'Bibimbap 2-inbun jumunhagessumnida.', english: 'I would like to order 2 portions of bibimbap.', nepali: 'म २ जनाको लागि बिबिमबाब अर्डर गर्न चाहन्छु।' }]
  },
  {
    id: 'eps_l11_3', lesson: 11, level: 'EPS', word: '맛있다', romanization: 'Masitda',
    meaning: 'To be delicious', meaningNepali: 'मीठो हुनु', partOfSpeech: 'Adjective', topic: 'Food'
  },
  {
    id: 'eps_l11_4', lesson: 11, level: 'EPS', word: '맵다', romanization: 'Maepda',
    meaning: 'To be spicy', meaningNepali: 'पीरो हुनु', partOfSpeech: 'Adjective', topic: 'Food'
  },
  {
    id: 'eps_l11_5', lesson: 11, level: 'EPS', word: '물', romanization: 'Mul',
    meaning: 'Water', meaningNepali: 'पानी', partOfSpeech: 'Noun', topic: 'Food'
  },
  {
    id: 'eps_l11_6', lesson: 11, level: 'EPS', word: '계산서', romanization: 'Gyesanseo',
    meaning: 'Bill / Invoice', meaningNepali: 'बिल / हिसाब किताब', partOfSpeech: 'Noun', topic: 'Restaurant'
  },

  // ── LESSON 12: Post Office & Banking (우체국과 은행) ──
  {
    id: 'eps_l12_1', lesson: 12, level: 'EPS', word: '우체국', romanization: 'Ucheguk',
    meaning: 'Post office', meaningNepali: 'हुलाक कार्यालय', partOfSpeech: 'Noun', topic: 'Post Office'
  },
  {
    id: 'eps_l12_2', lesson: 12, level: 'EPS', word: '소포를 보내다', romanization: 'Soporeul bonaeda',
    meaning: 'To send a parcel / package', meaningNepali: 'पार्सल पठाउनु', partOfSpeech: 'Verb', topic: 'Post Office'
  },
  {
    id: 'eps_l12_3', lesson: 12, level: 'EPS', word: '통장', romanization: 'Tongjang',
    meaning: 'Bank passbook', meaningNepali: 'बैंक पासबुक', partOfSpeech: 'Noun', topic: 'Banking'
  },
  {
    id: 'eps_l12_4', lesson: 12, level: 'EPS', word: '입금하다', romanization: 'Ipgeumhada',
    meaning: 'To deposit money', meaningNepali: 'पैसा जम्मा गर्नु', partOfSpeech: 'Verb', topic: 'Banking'
  },
  {
    id: 'eps_l12_5', lesson: 12, level: 'EPS', word: '출금하다', romanization: 'Chulgeumhada',
    meaning: 'To withdraw money', meaningNepali: 'पैसा झिक्नु', partOfSpeech: 'Verb', topic: 'Banking'
  },
  {
    id: 'eps_l12_6', lesson: 12, level: 'EPS', word: '송금하다', romanization: 'Songgeumhada',
    meaning: 'To remit / transfer money overseas', meaningNepali: 'विदेशमा पैसा पठाउनु (रेमिट्यान्स)', partOfSpeech: 'Verb', topic: 'Banking',
    grammarSentences: [{ korean: '네팔로 월급을 송금하고 싶습니다.', romanization: 'Nepallo wolgeubeul songgeumhago sipseumnida.', english: 'I want to remit my salary to Nepal.', nepali: 'म मेरो तलब नेपालमा रेमिट्यान्स गर्न चाहन्छु।' }]
  },

  // ── LESSON 13: Telephone & Internet (전화와 인터넷) ──
  {
    id: 'eps_l13_1', lesson: 13, level: 'EPS', word: '휴대전화', romanization: 'Hyudaejeonhwa',
    meaning: 'Mobile phone / Smartphone', meaningNepali: 'मोबाइल फोन', partOfSpeech: 'Noun', topic: 'Telecom'
  },
  {
    id: 'eps_l13_2', lesson: 13, level: 'EPS', word: '전화를 걸다', romanization: 'Jeonhwareul geolda',
    meaning: 'To make a phone call', meaningNepali: 'फोन गर्नु', partOfSpeech: 'Verb', topic: 'Telecom'
  },
  {
    id: 'eps_l13_3', lesson: 13, level: 'EPS', word: '전화를 받다', romanization: 'Jeonhwareul batda',
    meaning: 'To answer a phone call', meaningNepali: 'फोन उठाउनु', partOfSpeech: 'Verb', topic: 'Telecom'
  },
  {
    id: 'eps_l13_4', lesson: 13, level: 'EPS', word: '문자 메시지', romanization: 'Munjja meseiji',
    meaning: 'Text message / SMS', meaningNepali: 'मेसेज / म्यासेज', partOfSpeech: 'Noun', topic: 'Telecom'
  },
  {
    id: 'eps_l13_5', lesson: 13, level: 'EPS', word: '와이파이', romanization: 'Waipai',
    meaning: 'Wi-Fi', meaningNepali: 'वाईफाई', partOfSpeech: 'Noun', topic: 'Internet'
  },

  // ── LESSON 14: Appointments & Schedules (약속과 일정) ──
  {
    id: 'eps_l14_1', lesson: 14, level: 'EPS', word: '약속', romanization: 'Yaksok',
    meaning: 'Appointment / Promise', meaningNepali: 'भेट्ने समय / बाचा', partOfSpeech: 'Noun', topic: 'Schedule',
    grammarSentences: [{ korean: '오늘 저녁에 친구와 약속이 있습니다.', romanization: 'Oneul jeonyeoge chinguwa yaksogi itsseumnida.', english: 'I have an appointment with a friend tonight.', nepali: 'आज साँझ मेरो साथीसँग भेट्ने समय तय छ।' }]
  },
  {
    id: 'eps_l14_2', lesson: 14, level: 'EPS', word: '약속을 취소하다', romanization: 'Yaksogeul chwisohada',
    meaning: 'To cancel an appointment', meaningNepali: 'भेट्ने कार्यक्रम रद्द गर्नु', partOfSpeech: 'Verb', topic: 'Schedule'
  },
  {
    id: 'eps_l14_3', lesson: 14, level: 'EPS', word: '시간이 있다', romanization: 'Sigani itda',
    meaning: 'To have time / free', meaningNepali: 'समय हुनु', partOfSpeech: 'Phrase', topic: 'Schedule'
  },
  {
    id: 'eps_l14_4', lesson: 14, level: 'EPS', word: '바쁘다', romanization: 'Bappeuda',
    meaning: 'To be busy', meaningNepali: 'व्यस्त हुनु', partOfSpeech: 'Adjective', topic: 'Schedule'
  },

  // ── LESSON 15: Health & Pharmacy (건강과 약국) ──
  {
    id: 'eps_l15_1', lesson: 15, level: 'EPS', word: '아프다', romanization: 'Apeuda',
    meaning: 'To be sick / hurt', meaningNepali: 'बिरामी हुनु / दुख्नु', partOfSpeech: 'Adjective', topic: 'Health',
    grammarSentences: [{ korean: '머리가 아파서 약을 먹었습니다.', romanization: 'Meoriga apaseo yageul meogeotsseumnida.', english: 'My head hurts, so I took medicine.', nepali: 'टाउको दुखेकोले मैले औषधि खाएँ।' }]
  },
  {
    id: 'eps_l15_2', lesson: 15, level: 'EPS', word: '감기', romanization: 'Gamgi',
    meaning: 'Cold / Flu', meaningNepali: 'रुघाखोकी', partOfSpeech: 'Noun', topic: 'Health'
  },
  {
    id: 'eps_l15_3', lesson: 15, level: 'EPS', word: '열이 나다', romanization: 'Yeori nada',
    meaning: 'To have a fever', meaningNepali: 'ज्वरो आउनु', partOfSpeech: 'Verb', topic: 'Health'
  },
  {
    id: 'eps_l15_4', lesson: 15, level: 'EPS', word: '약국', romanization: 'Yakguk',
    meaning: 'Pharmacy / Drugstore', meaningNepali: 'औषधि पसल / फार्मेसी', partOfSpeech: 'Noun', topic: 'Health'
  },
  {
    id: 'eps_l15_5', lesson: 15, level: 'EPS', word: '소화제', romanization: 'Sohwaje',
    meaning: 'Digestive medicine', meaningNepali: 'पाचन औषधि (हजमोला)', partOfSpeech: 'Noun', topic: 'Health'
  },
  {
    id: 'eps_l15_6', lesson: 15, level: 'EPS', word: '진통제', romanization: 'Jintongje',
    meaning: 'Painkiller', meaningNepali: 'दुखाइ कम गर्ने औषधि', partOfSpeech: 'Noun', topic: 'Health'
  },
  {
    id: 'eps_l15_7', lesson: 15, level: 'EPS', word: '파스', romanization: 'Paseu',
    meaning: 'Pain relief patch / Plaster', meaningNepali: 'दुखाइ कम गर्ने पट्टी (पेन रिलिफ प्याच)', partOfSpeech: 'Noun', topic: 'Health'
  }
];
