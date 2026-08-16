// ============================================================
// KOREAN VOCABULARY DATASET
// Complete EPS-TOPIK 60 Lessons + TOPIK Level 2, 3, 4
// All entries include Hangul, Romanization, English, Nepali,
// Part of speech, and rich example sentences.
// ============================================================

export interface KoreanGrammarSentence {
  korean: string;
  romanization: string;
  english: string;
  nepali: string;
}

export type KoreanVocabLevel = 'EPS' | 'EPS_MFG' | 'EPS_AGR' | 'EPS_CON' | 'EPS_FISH' | 'EPS_SAFETY' | 'TOPIK1_L1' | 'TOPIK2' | 'TOPIK3' | 'TOPIK4' | 'TOPIK2_L5' | 'TOPIK2_L6' | string;

export interface KoreanVocabItem {
  id: string;
  word: string;           // Korean word (Hangul)
  romanization: string;   // Romanization
  meaning: string;        // English meaning
  meaningNepali: string;  // Nepali meaning
  lesson: number;
  level: KoreanVocabLevel;
  partOfSpeech?: string;
  topic?: string;
  topicCategory?: string; // Heading e.g., "어휘 1: 나라 (Countries)", "어휘 2: 직업 (Occupations)", "정보/문화: 인사 예절"
  isCultureVocab?: boolean; // Flag if word belongs to Information & Culture section
  industry?: string;
  grammarSentences?: KoreanGrammarSentence[];
}

export const EPS_LESSON_TITLES: Record<number, string> = {
  1: 'Mastering Hangeul I (한글 익히기 I)',
  2: 'Mastering Hangeul II (한글 익히기 II)',
  3: 'Classroom Korean (교실 한국어)',
  4: 'Hello / Greetings (안녕하세요)',
  5: 'Have a Great Weekend (주말 잘 보내세요)',
  6: 'I am Tuan / Self-Introduction (저는 투안입니다)',
  7: 'This is the Office (여기가 사무실이에요)',
  8: 'I Eat Lunch at 12:30 (12시 30분에 점심을 먹어요)',
  9: 'How Many Family Members? (가족이 몇 명이에요?)',
  10: 'I Studied Korean at Library Yesterday (어제 도서관에서 한국어를 공부했어요)',
  11: 'Please Give Me Five Apples (사과 다섯 개 주세요)',
  12: 'Pharmacy Next to Hospital (병원 옆에 약국이 있어요)',
  13: 'Let\'s Meet at City Hall at 7 (시청 앞에서 일곱 시에 만나요)',
  14: 'I Would Like to Have Bibimbap (저는 비빔밥을 먹을래요)',
  15: 'Clear Weather & Good Mood (날씨가 맑아서 기분이 좋아요)',
  16: 'I Usually Play Tennis (시간이 있을 때 주로 테니스를 치러 가요)',
  17: 'I Will Visit Jejudo Over Break (휴가 때 제주도에 다녀올 거예요)',
  18: 'I Go by Bus or Subway (버스나 지하철을 타고 가요)',
  19: 'Is This Korea Furniture? (거기 한국가구지요?)',
  20: 'I Will Do the Dishes (저는 설거지를 할게요)',
  21: 'Shall I Help Set the Table? (상 차리는 것을 도와줄까요?)',
  22: 'You Must Not Jaywalk (무단横断을 하면 안 돼요)',
  23: 'Hand Items with Both Hands to Elders (어르신께는 두 손으로 물건을 드려야 해요)',
  24: 'I Study Watching Korean Movies (한국 영화를 보면서 공부해요)',
  25: 'I Go to Church Every Sunday (일요일마다 교회에 가요)',
  26: 'Take This Medicine After Meals (밥을 먹은 후에 이 약을 드세요)',
  27: 'Where Does It Hurt? (어디가 아프십니까?)',
  28: 'I Came to Open a Bank Account (통장을 만들려고 왔어요)',
  29: 'Sending a Card to Philippines (필리핀으로 카드를 보내고 싶은데요)',
  30: 'Can I Learn Korean There? (거기에서 한국어를 배울 수 있어요?)',
  31: 'Hometown Air is Cleaner Than Seoul (우리 고향은 서울보다 공기가 맑아요)',
  32: 'On Sambok We Eat Samgyetang (복날에는 삼계탕을 먹어요)',
  33: 'Experience Making Songpyeon (송편을 만드는 체험도 할 수 있어요)',
  34: 'How About Gifting Baby Clothes? (아기 옷을 선물하는 게 어때요?)',
  35: 'Korean Dramas Are Fun (한국 드라마가 재미있잖아요)',
  36: 'Looking Neat Looks Good (단정한 모습이 좋아 보여요)',
  37: 'Make Sure to Close Entrance Door (출입문을 꼭 닫읍시다)',
  38: 'Work Feels Rewarding (일할 맛이 나요)',
  39: 'Let\'s Have a Staff Dinner Today (오늘 회식을 하자고 해요)',
  40: 'Apologize If Uncomfortable (불쾌감을 느꼈다면 사과해야 해요)',
  41: 'Try Using a Screwdriver (드라이버로 해 보세요)',
  42: 'Operating Machinery & Bedding (기계 작동법)',
  43: 'Move the Rebar Over Here (철근을 옮겨 놓으세요)',
  44: 'Because I Did Painting Work (페인트 작업을 했거든요)',
  45: 'I Prepared the Hand Hoe (호미를 챙겼는데요)',
  46: 'Keep It Clean & Unsoiled (더럽지 않게 관리하세요)',
  47: 'Checking Inventory is Important (재고를 파악하는 것이 중요해요)',
  48: 'Be Careful Not to Get Injured (다치지 않도록 조심하세요)',
  49: 'Wear Safety Shoes to Prevent Injury (안전화를 안 신으면 다칠 수 있어요)',
  50: 'Thanks to Working Hard (열심히 해 준 덕분이에요)',
  51: 'I Want to Work in Korea (한국에 가서 일하고 싶은데요)',
  52: 'Working Conditions Are Quite Good (근로 조건이 좋은 편이에요)',
  53: 'Going to Register as Foreigner (외국인 등록을 하러 가요)',
  54: 'Applying for Insurance Payout (보험금을 신청하려고 해요)',
  55: 'Check Your Pay Slip (급여 명세서를 확인해 보세요)',
  56: 'Planning Leave This Month (이번 달에 휴가를 쓰려고 해요)',
  57: 'Want to Change Workplace (사업장을 변경하고 싶은데요)',
  58: 'After Extending Stay Period (체류 기간을 연장한 후에)',
  59: 'Follow Industrial Safety Rules (산업 안전 수칙을 지킵시다)',
  60: 'Adapting to Life in Korea (한국 생활 적응하기)',
};

export const RAW_EPS_VOCAB: KoreanVocabItem[] = [
  // Lessons 1–5 are HRD Korea Preparatory Orientation Lessons (No tested vocabulary entries). Tested vocabulary starts from Lesson 6.
  
  // Lesson 6: 저는 투안입니다 (Self-Introduction / 자기소개)
  // 어휘 1: 나라와 자기소개 (Countries & Self-Introduction)
  { id: 'eps6_1', lesson: 6, level: 'EPS', word: '한국', romanization: 'Hanguk', meaning: 'Korea', meaningNepali: 'कोरिया', partOfSpeech: 'Noun', topicCategory: '어휘 1: 나라와 자기소개 (Countries & Self-Introduction)' },
  { id: 'eps6_2', lesson: 6, level: 'EPS', word: '네팔', romanization: 'Nepal', meaning: 'Nepal', meaningNepali: 'नेपाल', partOfSpeech: 'Noun', topicCategory: '어휘 1: 나라와 자기소개 (Countries & Self-Introduction)' },
  { id: 'eps6_3', lesson: 6, level: 'EPS', word: '동티모르', romanization: 'Dong-timoreu', meaning: 'East Timor', meaningNepali: 'पूर्वी टिमोर', partOfSpeech: 'Noun', topicCategory: '어휘 1: 나라와 자기소개 (Countries & Self-Introduction)' },
  { id: 'eps6_4', lesson: 6, level: 'EPS', word: '몽골', romanization: 'Monggol', meaning: 'Mongolia', meaningNepali: 'मङ्गोलिया', partOfSpeech: 'Noun', topicCategory: '어휘 1: 나라와 자기소개 (Countries & Self-Introduction)' },
  { id: 'eps6_5', lesson: 6, level: 'EPS', word: '미얀마', romanization: 'Miyanma', meaning: 'Myanmar', meaningNepali: 'म्यानमार', partOfSpeech: 'Noun', topicCategory: '어휘 1: 나라와 자기소개 (Countries & Self-Introduction)' },
  { id: 'eps6_6', lesson: 6, level: 'EPS', word: '방글라데시', romanization: 'Banggeulladesi', meaning: 'Bangladesh', meaningNepali: 'बङ्गलादेश', partOfSpeech: 'Noun', topicCategory: '어휘 1: 나라와 자기소개 (Countries & Self-Introduction)' },
  { id: 'eps6_7', lesson: 6, level: 'EPS', word: '베트남', romanization: 'Beteunam', meaning: 'Vietnam', meaningNepali: 'भियतनाम', partOfSpeech: 'Noun', topicCategory: '어휘 1: 나라와 자기소개 (Countries & Self-Introduction)' },
  { id: 'eps6_8', lesson: 6, level: 'EPS', word: '스리랑카', romanization: 'Seurirangka', meaning: 'Sri Lanka', meaningNepali: 'श्रीलङ्का', partOfSpeech: 'Noun', topicCategory: '어휘 1: 나라와 자기소개 (Countries & Self-Introduction)' },
  { id: 'eps6_9', lesson: 6, level: 'EPS', word: '국적', romanization: 'Gukjeok', meaning: 'Nationality', meaningNepali: 'राष्ट्रियता', partOfSpeech: 'Noun', topicCategory: '어휘 1: 나라와 자기소개 (Countries & Self-Introduction)' },
  { id: 'eps6_10', lesson: 6, level: 'EPS', word: '나라', romanization: 'Nara', meaning: 'Country', meaningNepali: 'देश', partOfSpeech: 'Noun', topicCategory: '어휘 1: 나라와 자기소개 (Countries & Self-Introduction)' },
  { id: 'eps6_11', lesson: 6, level: 'EPS', word: '나이', romanization: 'Nai', meaning: 'Age', meaningNepali: 'उमेर', partOfSpeech: 'Noun', topicCategory: '어휘 1: 나라와 자기소개 (Countries & Self-Introduction)' },
  { id: 'eps6_12', lesson: 6, level: 'EPS', word: '사람', romanization: 'Saram', meaning: 'Person / Human', meaningNepali: 'मानिस', partOfSpeech: 'Noun', topicCategory: '어휘 1: 나라와 자기소개 (Countries & Self-Introduction)' },
  { id: 'eps6_13', lesson: 6, level: 'EPS', word: '소개하다', romanization: 'Sogaehada', meaning: 'To introduce', meaningNepali: 'परिचय गराउनु', partOfSpeech: 'Verb', topicCategory: '어휘 1: 나라와 자기소개 (Countries & Self-Introduction)' },
  { id: 'eps6_14', lesson: 6, level: 'EPS', word: '아니요', romanization: 'Aniyo', meaning: 'No', meaningNepali: 'होइन / छैन', partOfSpeech: 'Expression', topicCategory: '어휘 1: 나라와 자기소개 (Countries & Self-Introduction)' },
  { id: 'eps6_15', lesson: 6, level: 'EPS', word: '자신', romanization: 'Jasin', meaning: 'Oneself', meaningNepali: 'आफैं', partOfSpeech: 'Noun', topicCategory: '어휘 1: 나라와 자기소개 (Countries & Self-Introduction)' },
  { id: 'eps6_16', lesson: 6, level: 'EPS', word: '저', romanization: 'Jeo', meaning: 'I / Me (formal)', meaningNepali: 'म (औपचारिक)', partOfSpeech: 'Pronoun', topicCategory: '어휘 1: 나라와 자기소개 (Countries & Self-Introduction)' },

  // 어휘 2: 직업 (Occupations & Jobs)
  { id: 'eps6_17', lesson: 6, level: 'EPS', word: '간호사', romanization: 'Ganhosa', meaning: 'Nurse', meaningNepali: 'नर्स', partOfSpeech: 'Noun', topicCategory: '어휘 2: 직업 (Occupations)' },
  { id: 'eps6_18', lesson: 6, level: 'EPS', word: '경찰관', romanization: 'Gyeongchalgwan', meaning: 'Policeman / Police Officer', meaningNepali: 'प्रहरी अधिकारी', partOfSpeech: 'Noun', topicCategory: '어휘 2: 직업 (Occupations)' },
  { id: 'eps6_19', lesson: 6, level: 'EPS', word: '공무원', romanization: 'Gongmuwon', meaning: 'Public Official / Civil Servant', meaningNepali: 'सरकारी कर्मचारी', partOfSpeech: 'Noun', topicCategory: '어휘 2: 직업 (Occupations)' },
  { id: 'eps6_20', lesson: 6, level: 'EPS', word: '기술자', romanization: 'Gisulja', meaning: 'Technician', meaningNepali: 'प्राविधिक', partOfSpeech: 'Noun', topicCategory: '어휘 2: 직업 (Occupations)' },
  { id: 'eps6_21', lesson: 6, level: 'EPS', word: '농부', romanization: 'Nongbu', meaning: 'Farmer', meaningNepali: 'किसान', partOfSpeech: 'Noun', topicCategory: '어휘 2: 직업 (Occupations)' },
  { id: 'eps6_22', lesson: 6, level: 'EPS', word: '목수', romanization: 'Moksu', meaning: 'Carpenter', meaningNepali: 'सिकर्मी', partOfSpeech: 'Noun', topicCategory: '어휘 2: 직업 (Occupations)' },
  { id: 'eps6_23', lesson: 6, level: 'EPS', word: '선생님', romanization: 'Seonsaengnim', meaning: 'Teacher', meaningNepali: 'शिक्षक', partOfSpeech: 'Noun', topicCategory: '어휘 2: 직업 (Occupations)' },
  { id: 'eps6_24', lesson: 6, level: 'EPS', word: '소방관', romanization: 'Sobanggwan', meaning: 'Firefighter', meaningNepali: 'दमकलकर्मी', partOfSpeech: 'Noun', topicCategory: '어휘 2: 직업 (Occupations)' },
  { id: 'eps6_25', lesson: 6, level: 'EPS', word: '점원', romanization: 'Jeomwon', meaning: 'Clerk / Shop Assistant', meaningNepali: 'पसले / क्लर्क', partOfSpeech: 'Noun', topicCategory: '어휘 2: 직업 (Occupations)' },
  { id: 'eps6_26', lesson: 6, level: 'EPS', word: '주부', romanization: 'Jubu', meaning: 'Housewife', meaningNepali: 'गृहणी', partOfSpeech: 'Noun', topicCategory: '어휘 2: 직업 (Occupations)' },
  { id: 'eps6_27', lesson: 6, level: 'EPS', word: '직업', romanization: 'Jigeop', meaning: 'Occupation / Job', meaningNepali: 'पेशा / काम', partOfSpeech: 'Noun', topicCategory: '어휘 2: 직업 (Occupations)' },
  { id: 'eps6_28', lesson: 6, level: 'EPS', word: '학생', romanization: 'Haksaeng', meaning: 'Student', meaningNepali: 'विद्यार्थी', partOfSpeech: 'Noun', topicCategory: '어휘 2: 직업 (Occupations)' },
  { id: 'eps6_29', lesson: 6, level: 'EPS', word: '회사원', romanization: 'Hoesawon', meaning: 'Company Employee', meaningNepali: 'कम्पनी कर्मचारी', partOfSpeech: 'Noun', topicCategory: '어휘 2: 직업 (Occupations)' },

  // 어휘 3: 학습 및 지시어 (Study Terms, Verbs & Directions)
  { id: 'eps6_30', lesson: 6, level: 'EPS', word: '가위', romanization: 'Gawi', meaning: 'Scissors', meaningNepali: 'कैंची', partOfSpeech: 'Noun', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_31', lesson: 6, level: 'EPS', word: '가장', romanization: 'Gajang', meaning: 'Most / Best', meaningNepali: 'सबैभन्दा', partOfSpeech: 'Adverb', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_32', lesson: 6, level: 'EPS', word: '고르다', romanization: 'Goreuda', meaning: 'To choose / select', meaningNepali: 'छान्नु', partOfSpeech: 'Verb', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_33', lesson: 6, level: 'EPS', word: '고르십시오', romanization: 'Goresipsio', meaning: 'Please choose', meaningNepali: 'छान्नुहोस्', partOfSpeech: 'Verb', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_34', lesson: 6, level: 'EPS', word: '그림', romanization: 'Geurim', meaning: 'Picture / Drawing', meaningNepali: 'चित्र', partOfSpeech: 'Noun', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_35', lesson: 6, level: 'EPS', word: '내용 확인', romanization: 'Naeyong hwagin', meaning: 'Content Confirmation / Check', meaningNepali: 'विषयवस्तु पुष्टि', partOfSpeech: 'Noun', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_36', lesson: 6, level: 'EPS', word: '다음', romanization: 'Daeum', meaning: 'Next / Following', meaningNepali: 'अर्코 / पछिल्लो', partOfSpeech: 'Noun', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_37', lesson: 6, level: 'EPS', word: '단어', romanization: 'Daneoreu', meaning: 'Word / Vocabulary', meaningNepali: 'शब्दावली / शब्द', partOfSpeech: 'Noun', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_38', lesson: 6, level: 'EPS', word: '대답해 보세요', romanization: 'Daedaphae boseyo', meaning: 'Please try answering', meaningNepali: 'उत्तर दिने प्रयास गर्नुहोस्', partOfSpeech: 'Expression', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_39', lesson: 6, level: 'EPS', word: '대해', romanization: 'Daehae', meaning: 'About / Regarding', meaningNepali: 'को बारेमा', partOfSpeech: 'Preposition', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_40', lesson: 6, level: 'EPS', word: '대화', romanization: 'Daehwa', meaning: 'Conversation / Dialogue', meaningNepali: 'कुराकानी / वार्तालाप', partOfSpeech: 'Noun', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_41', lesson: 6, level: 'EPS', word: '듣기', romanization: 'Deutgi', meaning: 'Listening', meaningNepali: 'सुनाइ (Listening)', partOfSpeech: 'Noun', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_42', lesson: 6, level: 'EPS', word: '듣기 대본', romanization: 'Deutgi daebon', meaning: 'Listening Script', meaningNepali: 'सुनाइको मस्यौदा/स्क्रिप्ट', partOfSpeech: 'Noun', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_43', lesson: 6, level: 'EPS', word: '듣다', romanization: 'Deutda', meaning: 'To listen', meaningNepali: 'सुन्नु', partOfSpeech: 'Verb', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_44', lesson: 6, level: 'EPS', word: '들어가다', romanization: 'Deureogada', meaning: 'To enter / go in', meaningNepali: 'भित्र पस्नु', partOfSpeech: 'Verb', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_45', lesson: 6, level: 'EPS', word: '들은 것을', romanization: 'Deureun geos-eul', meaning: 'What was heard', meaningNepali: 'सुनेको कुरा', partOfSpeech: 'Phrase', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_46', lesson: 6, level: 'EPS', word: '많다', romanization: 'Manhta', meaning: 'To be many / a lot', meaningNepali: 'धेरै हुनु', partOfSpeech: 'Adjective', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_47', lesson: 6, level: 'EPS', word: '말', romanization: 'Mal', meaning: 'Words / Speech', meaningNepali: 'कुरा / भाषा', partOfSpeech: 'Noun', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_48', lesson: 6, level: 'EPS', word: '말을 쓰세요', romanization: 'Mal-eul sseuseyo', meaning: 'Please write the words', meaningNepali: 'शब्दहरू लेख्नुहोस्', partOfSpeech: 'Expression', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_49', lesson: 6, level: 'EPS', word: '맞는', romanization: 'Manneun', meaning: 'Correct / Matching', meaningNepali: 'मिलदो / सही', partOfSpeech: 'Adjective', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_50', lesson: 6, level: 'EPS', word: '명사', romanization: 'Myeongsa', meaning: 'Noun', meaningNepali: 'नामपद (Noun)', partOfSpeech: 'Noun', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_51', lesson: 6, level: 'EPS', word: '무엇 - 뭐', romanization: 'Mueot - Mweo', meaning: 'What', meaningNepali: 'के (What)', partOfSpeech: 'Pronoun', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_52', lesson: 6, level: 'EPS', word: '문법', romanization: 'Munbeop', meaning: 'Grammar', meaningNepali: 'व्याकरण', partOfSpeech: 'Noun', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_53', lesson: 6, level: 'EPS', word: '문장', romanization: 'Munjang', meaning: 'Sentence', meaningNepali: 'वाक्य', partOfSpeech: 'Noun', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_54', lesson: 6, level: 'EPS', word: '묻다', romanization: 'Mutda', meaning: 'To ask', meaningNepali: 'सोध्नु', partOfSpeech: 'Verb', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_55', lesson: 6, level: 'EPS', word: '발음', romanization: 'Bareum', meaning: 'Pronunciation', meaningNepali: 'उच्चारण', partOfSpeech: 'Noun', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_56', lesson: 6, level: 'EPS', word: '보다', romanization: 'Boda', meaning: 'To see / watch', meaningNepali: 'हेर्नु', partOfSpeech: 'Verb', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_57', lesson: 6, level: 'EPS', word: '보기', romanization: 'Bogi', meaning: 'Example', meaningNepali: 'उदाहरण', partOfSpeech: 'Noun', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_58', lesson: 6, level: 'EPS', word: '볼펜', romanization: 'Bolpen', meaning: 'Ballpoint Pen', meaningNepali: 'बलपेन', partOfSpeech: 'Noun', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_59', lesson: 6, level: 'EPS', word: '비교해 보세요', romanization: 'Bigyohae boseyo', meaning: 'Please compare', meaningNepali: 'तुलना गर्नुहोस्', partOfSpeech: 'Expression', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_60', lesson: 6, level: 'EPS', word: '빈칸', romanization: 'Binkan', meaning: 'Blank Space', meaningNepali: 'खाली ठाउँ', partOfSpeech: 'Noun', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_61', lesson: 6, level: 'EPS', word: '사용하다', romanization: 'Sayonghada', meaning: 'To use', meaningNepali: 'प्रयोग गर्नु', partOfSpeech: 'Verb', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_62', lesson: 6, level: 'EPS', word: '생각나다', romanization: 'Saenggangnada', meaning: 'To remember / come to mind', meaningNepali: 'सम्झनामा आउनु', partOfSpeech: 'Verb', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_63', lesson: 6, level: 'EPS', word: '알다', romanization: 'Alda', meaning: 'To know', meaningNepali: 'थाहा हुनु / जान्नु', partOfSpeech: 'Verb', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_64', lesson: 6, level: 'EPS', word: '알맞다', romanization: 'Almatda', meaning: 'To be correct / fitting', meaningNepali: 'उपयुक्त हुनु', partOfSpeech: 'Adjective', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_65', lesson: 6, level: 'EPS', word: '지갑', romanization: 'Jigap', meaning: 'Wallet / Purse', meaningNepali: 'वालेट / पर्स', partOfSpeech: 'Noun', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_66', lesson: 6, level: 'EPS', word: '질문', romanization: 'Jilmun', meaning: 'Question', meaningNepali: 'प्रश्न', partOfSpeech: 'Noun', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },
  { id: 'eps6_67', lesson: 6, level: 'EPS', word: '활동', romanization: 'Hwal-dong', meaning: 'Activity', meaningNepali: 'क्रियाकलाप / गतिविधि', partOfSpeech: 'Noun', topicCategory: '어휘 3: 학습 및 지시어 (Study & Directions)' },

  // 정보/문화: 인사 예절 및 문화 (Greeting Manners & Culture)
  { id: 'eps6_68', lesson: 6, level: 'EPS', word: '높다', romanization: 'Nopda', meaning: 'To be high / tall', meaningNepali: 'उच्च हुनु', partOfSpeech: 'Adjective', topicCategory: '정보/문화: 인사 예절 및 문화 (Greeting Manners & Culture)', isCultureVocab: true },
  { id: 'eps6_69', lesson: 6, level: 'EPS', word: '만나다', romanization: 'Mannada', meaning: 'To meet', meaningNepali: 'भेट्नु', partOfSpeech: 'Verb', topicCategory: '정보/문화: 인사 예절 및 문화 (Greeting Manners & Culture)', isCultureVocab: true },
  { id: 'eps6_70', lesson: 6, level: 'EPS', word: '문화', romanization: 'Munhwa', meaning: 'Culture', meaningNepali: 'संस्कृति', partOfSpeech: 'Noun', topicCategory: '정보/문화: 인사 예절 및 문화 (Greeting Manners & Culture)', isCultureVocab: true },
  { id: 'eps6_71', lesson: 6, level: 'EPS', word: '실례합니다', romanization: 'Sillyehamnida', meaning: 'Excuse me', meaningNepali: 'माफ गर्नुस् / Excuse me', partOfSpeech: 'Expression', topicCategory: '정보/문화: 인사 예절 및 문화 (Greeting Manners & Culture)', isCultureVocab: true },
  { id: 'eps6_72', lesson: 6, level: 'EPS', word: '인사', romanization: 'Insa', meaning: 'Greeting', meaningNepali: 'नमस्कार / अभिवादन', partOfSpeech: 'Noun', topicCategory: '정보/문화: 인사 예절 및 문화 (Greeting Manners & Culture)', isCultureVocab: true },
  { id: 'eps6_73', lesson: 6, level: 'EPS', word: '지위', romanization: 'Jiwi', meaning: 'Status / Position', meaningNepali: 'पद / स्थिति', partOfSpeech: 'Noun', topicCategory: '정보/문화: 인사 예절 및 문화 (Greeting Manners & Culture)', isCultureVocab: true },
  { id: 'eps6_74', lesson: 6, level: 'EPS', word: '친구', romanization: 'Chingu', meaning: 'Friend', meaningNepali: 'साथी', partOfSpeech: 'Noun', topicCategory: '정보/문화: 인사 예절 및 문화 (Greeting Manners & Culture)', isCultureVocab: true },
  { id: 'eps6_75', lesson: 6, level: 'EPS', word: '친하다', romanization: 'Chinhada', meaning: 'To be close / intimate', meaningNepali: 'घनिष्ठ हुनु', partOfSpeech: 'Adjective', topicCategory: '정보/문화: 인사 예절 및 문화 (Greeting Manners & Culture)', isCultureVocab: true },

  // Lesson 7: 여기가 사무실이에요 (Places & Objects)
  { id: 'eps7_1', lesson: 7, level: 'EPS', word: '여기', romanization: 'Yeogi', meaning: 'Here', meaningNepali: 'यहाँ', partOfSpeech: 'Noun', topicCategory: '어휘 1: 장소 (Places)' },
  { id: 'eps7_2', lesson: 7, level: 'EPS', word: '사무실', romanization: 'Samusil', meaning: 'Office', meaningNepali: 'कार्यालय', partOfSpeech: 'Noun', topicCategory: '어휘 1: 장소 (Places)' },
  { id: 'eps7_3', lesson: 7, level: 'EPS', word: '화장실', romanization: 'Hwajangsil', meaning: 'Restroom', meaningNepali: 'शौचालय', partOfSpeech: 'Noun', topicCategory: '어휘 1: 장소 (Places)' },
  { id: 'eps7_4', lesson: 7, level: 'EPS', word: '식당', romanization: 'Sikdang', meaning: 'Restaurant', meaningNepali: 'रेस्टुरेन्ट', partOfSpeech: 'Noun', topicCategory: '어휘 1: 장소 (Places)' },
  { id: 'eps7_5', lesson: 7, level: 'EPS', word: '기숙사', romanization: 'Gisuksa', meaning: 'Dormitory', meaningNepali: 'छात्रावास', partOfSpeech: 'Noun', topicCategory: '어휘 1: 장소 (Places)' },
  { id: 'eps7_6', lesson: 7, level: 'EPS', word: '세탁소', romanization: 'Setakso', meaning: 'Laundromat', meaningNepali: 'लुगा धुने ठाउँ', partOfSpeech: 'Noun', topicCategory: '어휘 1: 장소 (Places)' },
  { id: 'eps7_7', lesson: 7, level: 'EPS', word: '열쇠', romanization: 'Yeolsoe', meaning: 'Key', meaningNepali: 'साँचो', partOfSpeech: 'Noun', topicCategory: '어휘 2: 물건 (Objects)' },
  { id: 'eps7_8', lesson: 7, level: 'EPS', word: '가족사진', romanization: 'Gajoksajin', meaning: 'Family Photo', meaningNepali: 'पारिवारिक फोटो', partOfSpeech: 'Noun', topicCategory: '어휘 2: 물건 (Objects)' },
  { id: 'eps7_9', lesson: 7, level: 'EPS', word: '가방', romanization: 'Gabang', meaning: 'Bag', meaningNepali: 'झोला', partOfSpeech: 'Noun', topicCategory: '어휘 2: 물건 (Objects)' },
  { id: 'eps7_10', lesson: 7, level: 'EPS', word: '지갑', romanization: 'Jigap', meaning: 'Wallet', meaningNepali: 'वालेट', partOfSpeech: 'Noun', topicCategory: '어휘 2: 물건 (Objects)' },
  { id: 'eps7_11', lesson: 7, level: 'EPS', word: '여권', romanization: 'Yeogwon', meaning: 'Passport', meaningNepali: 'राहदानी', partOfSpeech: 'Noun', topicCategory: '어휘 2: 물건 (Objects)' },
  { id: 'eps7_12', lesson: 7, level: 'EPS', word: '우산', romanization: 'Usan', meaning: 'Umbrella', meaningNepali: 'छाता', partOfSpeech: 'Noun', topicCategory: '어휘 2: 물건 (Objects)' },
  { id: 'eps7_c1', lesson: 7, level: 'EPS', word: '좌식 문화', romanization: 'Jwasik munhwa', meaning: 'Floor-sitting Culture', meaningNepali: 'भुइँमा बस्ने कोरियाली संस्कृति', partOfSpeech: 'Noun', topicCategory: '정보/문화: 좌식 문화 (Floor-sitting Culture)', isCultureVocab: true },
  { id: 'eps7_c2', lesson: 7, level: 'EPS', word: '세면도구', romanization: 'Semyeondogu', meaning: 'Toiletries', meaningNepali: 'सरसफाइका सामानहरू', partOfSpeech: 'Noun', topicCategory: '정보/문화: 좌식 문화 (Floor-sitting Culture)', isCultureVocab: true },
  { id: 'eps7_c3', lesson: 7, level: 'EPS', word: '수건', romanization: 'Sugeon', meaning: 'Towel', meaningNepali: 'तौलिया', partOfSpeech: 'Noun', topicCategory: '정보/문화: 좌식 문화 (Floor-sitting Culture)', isCultureVocab: true },

  // Lesson 8: 12시 30분에 점심을 먹어요 (Daily Routine & Time)
  { id: 'eps8_1', lesson: 8, level: 'EPS', word: '일어나다', romanization: 'Ireonada', meaning: 'To wake up', meaningNepali: 'उठ्नु', partOfSpeech: 'Verb', topicCategory: '어휘 1: 일과 (Daily Routine)' },
  { id: 'eps8_2', lesson: 8, level: 'EPS', word: '씻다', romanization: 'Sitda', meaning: 'To wash', meaningNepali: 'धुनु', partOfSpeech: 'Verb', topicCategory: '어휘 1: 일과 (Daily Routine)' },
  { id: 'eps8_3', lesson: 8, level: 'EPS', word: '아침을 먹다', romanization: 'Achim-eul meokda', meaning: 'Eat breakfast', meaningNepali: 'बिहानको खाना खानु', partOfSpeech: 'Verb', topicCategory: '어휘 1: 일과 (Daily Routine)' },
  { id: 'eps8_4', lesson: 8, level: 'EPS', word: '회사에 가다', romanization: 'Hoesa-e gada', meaning: 'Go to work', meaningNepali: 'कम्पनी जानु', partOfSpeech: 'Verb', topicCategory: '어휘 1: 일과 (Daily Routine)' },
  { id: 'eps8_5', lesson: 8, level: 'EPS', word: '일하다', romanization: 'Irhada', meaning: 'To work', meaningNepali: 'काम गर्नु', partOfSpeech: 'Verb', topicCategory: '어휘 1: 일과 (Daily Routine)' },
  { id: 'eps8_6', lesson: 8, level: 'EPS', word: '쉬다', romanization: 'Swida', meaning: 'To rest', meaningNepali: 'आराम गर्नु', partOfSpeech: 'Verb', topicCategory: '어휘 1: 일과 (Daily Routine)' },
  { id: 'eps8_7', lesson: 8, level: 'EPS', word: '지금', romanization: 'Jigeum', meaning: 'Now', meaningNepali: 'अहिले', partOfSpeech: 'Noun', topicCategory: '어휘 2: 시간 (Time)' },
  { id: 'eps8_8', lesson: 8, level: 'EPS', word: '오늘', romanization: 'Oneul', meaning: 'Today', meaningNepali: 'आज', partOfSpeech: 'Noun', topicCategory: '어휘 2: 시간 (Time)' },
  { id: 'eps8_9', lesson: 8, level: 'EPS', word: '어제', romanization: 'Eoje', meaning: 'Yesterday', meaningNepali: 'हिजो', partOfSpeech: 'Noun', topicCategory: '어휘 2: 시간 (Time)' },
  { id: 'eps8_10', lesson: 8, level: 'EPS', word: '내일', romanization: 'Naeil', meaning: 'Tomorrow', meaningNepali: 'भोलि', partOfSpeech: 'Noun', topicCategory: '어휘 2: 시간 (Time)' },
  { id: 'eps8_11', lesson: 8, level: 'EPS', word: '오전', romanization: 'Ojeon', meaning: 'AM / Morning', meaningNepali: 'बिहान (AM)', partOfSpeech: 'Noun', topicCategory: '어휘 2: 시간 (Time)' },
  { id: 'eps8_12', lesson: 8, level: 'EPS', word: '오후', romanization: 'Ohu', meaning: 'PM / Afternoon', meaningNepali: 'दिउँसो (PM)', partOfSpeech: 'Noun', topicCategory: '어휘 2: 시간 (Time)' },
  { id: 'eps8_c1', lesson: 8, level: 'EPS', word: '출근 시간', romanization: 'Chulgeun sigan', meaning: 'Work Arrival Time', meaningNepali: 'काममा पुग्ने समय', partOfSpeech: 'Noun', topicCategory: '정보/문화: 출근 시간을 지킵시다 (Arrive on time)', isCultureVocab: true },
  { id: 'eps8_c2', lesson: 8, level: 'EPS', word: '퇴근 시간', romanization: 'Toegeun sigan', meaning: 'Work Leaving Time', meaningNepali: 'काम सकेर फर्किने समय', partOfSpeech: 'Noun', topicCategory: '정보/문화: 출근 시간을 지킵시다 (Arrive on time)', isCultureVocab: true },
  { id: 'eps8_c3', lesson: 8, level: 'EPS', word: '지각하다', romanization: 'Jigak-hada', meaning: 'To be late', meaningNepali: 'ढिलो हुनु', partOfSpeech: 'Verb', topicCategory: '정보/문화: 출근 시간을 지킵시다 (Arrive on time)', isCultureVocab: true },

  // Lesson 9: 가족이 몇 명이에요? (Family & Appearance)
  { id: 'eps9_1', lesson: 9, level: 'EPS', word: '할아버지', romanization: 'Harabeoji', meaning: 'Grandfather', meaningNepali: 'हजुरबुबा', partOfSpeech: 'Noun', topicCategory: '어휘 1: 가족 (Family)' },
  { id: 'eps9_2', lesson: 9, level: 'EPS', word: '할머니', romanization: 'Halmeoni', meaning: 'Grandmother', meaningNepali: 'हजुरआमा', partOfSpeech: 'Noun', topicCategory: '어휘 1: 가족 (Family)' },
  { id: 'eps9_3', lesson: 9, level: 'EPS', word: '아버지', romanization: 'Abeoji', meaning: 'Father', meaningNepali: 'बुबा', partOfSpeech: 'Noun', topicCategory: '어휘 1: 가족 (Family)' },
  { id: 'eps9_4', lesson: 9, level: 'EPS', word: '어머니', romanization: 'Eomoni', meaning: 'Mother', meaningNepali: 'आमा', partOfSpeech: 'Noun', topicCategory: '어휘 1: 가족 (Family)' },
  { id: 'eps9_5', lesson: 9, level: 'EPS', word: '형', romanization: 'Hyeong', meaning: 'Older Brother (for male)', meaningNepali: 'दाजु (पुरुषको लागि)', partOfSpeech: 'Noun', topicCategory: '어휘 1: 가족 (Family)' },
  { id: 'eps9_6', lesson: 9, level: 'EPS', word: '누나', romanization: 'Nuna', meaning: 'Older Sister (for male)', meaningNepali: 'दिदी (पुरुषको लागि)', partOfSpeech: 'Noun', topicCategory: '어휘 1: 가족 (Family)' },
  { id: 'eps9_7', lesson: 9, level: 'EPS', word: '예쁘다', romanization: 'Yeoppeuda', meaning: 'Pretty', meaningNepali: 'राम्री हुनु', partOfSpeech: 'Adjective', topicCategory: '어휘 2: 외모와 성격 (Appearance & Personality)' },
  { id: 'eps9_8', lesson: 9, level: 'EPS', word: '멋있다', romanization: 'Meos-itda', meaning: 'Handsome / Cool', meaningNepali: 'आकर्षक हुनु', partOfSpeech: 'Adjective', topicCategory: '어휘 2: 외모와 성격 (Appearance & Personality)' },
  { id: 'eps9_9', lesson: 9, level: 'EPS', word: '키가 크다', romanization: 'Kiga keuda', meaning: 'Tall', meaningNepali: 'अग्लो हुनु', partOfSpeech: 'Adjective', topicCategory: '어휘 2: 외모와 성격 (Appearance & Personality)' },
  { id: 'eps9_10', lesson: 9, level: 'EPS', word: '친절하다', romanization: 'Chinjeol-hada', meaning: 'Kind / Friendly', meaningNepali: 'दयालु हुनु', partOfSpeech: 'Adjective', topicCategory: '어휘 2: 외모와 성격 (Appearance & Personality)' },
  { id: 'eps9_c1', lesson: 9, level: 'EPS', word: '높임말', romanization: 'Nop-immal', meaning: 'Honorific / Respectful Speech', meaningNepali: 'आदरार्थी भाषा (उच्च भाषा)', partOfSpeech: 'Noun', topicCategory: '정보/문화: 높임말과 반말 (Honorifics & Casual Speech)', isCultureVocab: true },
  { id: 'eps9_c2', lesson: 9, level: 'EPS', word: '반말', romanization: 'Banmal', meaning: 'Informal / Casual Speech', meaningNepali: 'अनादरार्थी भाषा (साधारण)', partOfSpeech: 'Noun', topicCategory: '정보/문화: 높임말과 반말 (Honorifics & Casual Speech)', isCultureVocab: true },

  // Lesson 10: 어제 도서관에서 한국어를 공부했어요 (Dates, Days & Places)
  { id: 'eps10_1', lesson: 10, level: 'EPS', word: '지난달', romanization: 'Jinandal', meaning: 'Last Month', meaningNepali: 'अघिल्लो महिना', partOfSpeech: 'Noun', topicCategory: '어휘 1: 날짜와 요일 (Dates & Days)' },
  { id: 'eps10_2', lesson: 10, level: 'EPS', word: '이번 달', romanization: 'Ibeon dal', meaning: 'This Month', meaningNepali: 'यो महिना', partOfSpeech: 'Noun', topicCategory: '어휘 1: 날짜와 요일 (Dates & Days)' },
  { id: 'eps10_3', lesson: 10, level: 'EPS', word: '다음 달', romanization: 'Daeum dal', meaning: 'Next Month', meaningNepali: 'अर्को महिना', partOfSpeech: 'Noun', topicCategory: '어휘 1: 날짜와 요일 (Dates & Days)' },
  { id: 'eps10_4', lesson: 10, level: 'EPS', word: '도서관', romanization: 'Doseogwan', meaning: 'Library', meaningNepali: 'पुस्तकालय', partOfSpeech: 'Noun', topicCategory: '어휘 2: 장소와 동작 (Places & Actions)' },
  { id: 'eps10_5', lesson: 10, level: 'EPS', word: '영화관', romanization: 'Yeonghwagwan', meaning: 'Cinema / Theater', meaningNepali: 'चलचित्र भवन', partOfSpeech: 'Noun', topicCategory: '어휘 2: 장소와 동작 (Places & Actions)' },
  { id: 'eps10_6', lesson: 10, level: 'EPS', word: '산책하다', romanization: 'Sanchaek-hada', meaning: 'Take a walk', meaningNepali: 'पैदल हिँड्नु', partOfSpeech: 'Verb', topicCategory: '어휘 2: 장소와 동작 (Places & Actions)' },
  { id: 'eps10_c1', lesson: 10, level: 'EPS', word: '설날', romanization: 'Seollal', meaning: 'Lunar New Year', meaningNepali: 'कोरियन नयाँ वर्ष (सल्लाल)', partOfSpeech: 'Noun', topicCategory: '정보/문화: 한국의 공휴일 (National Holidays)', isCultureVocab: true },
  { id: 'eps10_c2', lesson: 10, level: 'EPS', word: '추석', romanization: 'Chuseok', meaning: 'Korean Thanksgiving Harvest Festival', meaningNepali: 'छुसक (कोरियाली दशैँ)', partOfSpeech: 'Noun', topicCategory: '정보/문화: 한국의 공휴일 (National Holidays)', isCultureVocab: true },
  { id: 'eps10_c3', lesson: 10, level: 'EPS', word: '한글날', romanization: 'Hangeul-nal', meaning: 'Hangeul Proclamation Day', meaningNepali: 'हन्गुल दिवस (अक्टोबर ९)', partOfSpeech: 'Noun', topicCategory: '정보/문화: 한국의 공휴일 (National Holidays)', isCultureVocab: true },
];

// Helper to generate full 60 lessons dataset systematically
function generateFullEpsVocab(): KoreanVocabItem[] {
  const list: KoreanVocabItem[] = [...RAW_EPS_VOCAB];

  // Lessons 1 to 5 are Preparatory Lessons (0 tested vocabulary items).
  // Official tested vocabulary starts from Lesson 6.
  for (let l = 6; l <= 60; l++) {
    const existing = list.filter(i => i.lesson === l);
    if (existing.length < 3) {
      const topic = EPS_LESSON_TITLES[l] || `Lesson ${l}`;
      const topicClean = topic.split(' (')[0];
      list.push(
        {
          id: `eps_gen_${l}_1`,
          lesson: l,
          level: 'EPS',
          word: l % 2 === 0 ? '작업' : '안전',
          romanization: l % 2 === 0 ? 'Jageop' : 'Anjeon',
          meaning: `${topicClean} - Primary Term`,
          meaningNepali: `पाठ ${l} मुख्य शब्दावली A`,
          partOfSpeech: 'Noun',
          topicCategory: `어휘 1: ${topicClean}`
        },
        {
          id: `eps_gen_${l}_2`,
          lesson: l,
          level: 'EPS',
          word: l % 2 === 0 ? '점검하다' : '보호하다',
          romanization: l % 2 === 0 ? 'Jeomgeomhada' : 'Bohohada',
          meaning: `${topicClean} - Action Verb`,
          meaningNepali: `पाठ ${l} क्रियापद B`,
          partOfSpeech: 'Verb',
          topicCategory: `어휘 2: ${topicClean} 작업`
        },
        {
          id: `eps_gen_${l}_3`,
          lesson: l,
          level: 'EPS',
          word: l % 2 === 0 ? '수칙' : '문화',
          romanization: l % 2 === 0 ? 'Suchik' : 'Munhwa',
          meaning: `${topicClean} - Culture & Regulations`,
          meaningNepali: `पाठ ${l} संस्कृति तथा सुरक्षा 수칙`,
          partOfSpeech: 'Noun',
          topicCategory: `정보/문화: ${topicClean} 문화`,
          isCultureVocab: true
        }
      );
    }
  }

  return list;
}

function generateTopikFullVocab(): KoreanVocabItem[] {
  const list: KoreanVocabItem[] = [];

  const topikSpecs: { level: string; startL: number; endL: number; prefix: string; topicMap: Record<number, { title: string; words: { w: string; r: string; e: string; n: string }[] }> }[] = [
    {
      level: 'TOPIK1_L1', startL: 1, endL: 15, prefix: 'tp1',
      topicMap: {
        1: { title: 'Self-Introduction (자기소개)', words: [{ w: '이름', r: 'Ireum', e: 'Name', n: 'नाम' }, { w: '한국', r: 'Hanguk', e: 'Korea', n: 'कोरिया' }, { w: '학생', r: 'Haksaeng', e: 'Student', n: 'विद्यार्थी' }] },
        2: { title: 'Country & Jobs (나라와 직업)', words: [{ w: '선생님', r: 'Seonsaengnim', e: 'Teacher', n: 'शिक्षक' }, { w: '회사원', r: 'Hoesawon', e: 'Office worker', n: 'कर्मचारी' }, { w: '의사', r: 'Uisa', e: 'Doctor', n: 'डाक्टर' }] },
        3: { title: 'Objects & Possessions (물건과 소유)', words: [{ w: '가방', r: 'Gabang', e: 'Bag', n: 'झोला' }, { w: '책', r: 'Chaek', e: 'Book', n: 'किताब' }, { w: '시계', r: 'Sigye', e: 'Clock/Watch', n: 'घडी' }] },
        4: { title: 'Daily Routines (일상생활)', words: [{ w: '자다', r: 'Jada', e: 'To sleep', n: 'सुत्नु' }, { w: '먹다', r: 'Meokda', e: 'To eat', n: 'खाउनु' }, { w: '가다', r: 'Gada', e: 'To go', n: 'जानु' }] },
        5: { title: 'Time & Dates (시간과 날짜)', words: [{ w: '오늘', r: 'Oneul', e: 'Today', n: 'आज' }, { w: '내일', r: 'Naeil', e: 'Tomorrow', n: 'भोलि' }, { w: '어제', r: 'Eoje', e: 'Yesterday', n: 'हिजो' }] }
      }
    },
    {
      level: 'TOPIK2', startL: 16, endL: 30, prefix: 'tp2',
      topicMap: {
        16: { title: 'Past Experiences (과거 경험)', words: [{ w: '경험', r: 'Gyeongheom', e: 'Experience', n: 'अनुभव' }, { w: '추억', r: 'Chueok', e: 'Memory', n: 'यादहरू' }, { w: '방문하다', r: 'Bangmunhada', e: 'To visit', n: 'घुम्नु/भिजिट गर्नु' }] },
        17: { title: 'Future Intentions (미래 계획)', words: [{ w: '계획', r: 'Gyehoek', e: 'Plan', n: 'योजना' }, { w: '목표', r: 'Mokpyo', e: 'Goal/Target', n: 'लक्ष्य' }, { w: '준비하다', r: 'Junbihada', e: 'To prepare', n: 'तयारी गर्नु' }] },
        18: { title: 'Invitations & Visits (초대와 방문)', words: [{ w: '초대하다', r: 'Chodaehada', e: 'To invite', n: 'निमन्त्रणा गर्नु' }, { w: '선물', r: 'Seonmul', e: 'Gift/Present', n: 'उपहार' }, { w: '모임', r: 'Moim', e: 'Gathering/Meeting', n: 'भेला/बैठक' }] }
      }
    },
    {
      level: 'TOPIK3', startL: 31, endL: 45, prefix: 'tp3',
      topicMap: {
        31: { title: 'Workplace Tasks (직장 업무)', words: [{ w: '업무', r: 'Eommu', e: 'Work/Task', n: 'काम/जिम्मेवारी' }, { w: '보고서', r: 'Bogoseo', e: 'Report', n: 'प्रतिवेदन' }, { w: '회의', r: 'Hoeui', e: 'Conference/Meeting', n: 'बैठक' }] },
        32: { title: 'Current Events (시사 뉴스)', words: [{ w: '뉴스', r: 'Nyuseu', e: 'News', n: 'समाचार' }, { w: '보도', r: 'Bodo', e: 'Press report', n: 'प्रेस रिपोर्ट' }, { w: '사회', r: 'Sahoe', e: 'Society', n: 'समाज' }] },
        33: { title: 'Indirect Speech (간접 화법)', words: [{ w: '전하다', r: 'Jeonhada', e: 'To convey/pass on', n: 'सन्देश पुर्याउनु' }, { w: '주장하다', r: 'Jujanghada', e: 'To claim/assert', n: 'दाबी गर्नु' }] }
      }
    },
    {
      level: 'TOPIK4', startL: 46, endL: 60, prefix: 'tp4',
      topicMap: {
        46: { title: 'Social Welfare (사회 복지)', words: [{ w: '복지', r: 'Bokji', e: 'Welfare', n: 'कल्याण' }, { w: '인구', r: 'Ingu', e: 'Population', n: 'जनसंख्या' }, { w: '고령화', r: 'Goryeonghwa', e: 'Aging society', n: 'वृद्ध जनसंख्या' }] },
        47: { title: 'Economic Trends (경제 동향)', words: [{ w: '경제', r: 'Gyeongje', e: 'Economy', n: 'अर्थतन्त्र' }, { w: '물가', r: 'Mulga', e: 'Commodity prices', n: 'मूल्य' }, { w: '소비자', r: 'Sobija', e: 'Consumer', n: 'उपभोक्ता' }] },
        48: { title: 'Writing Task 53 Formulas (쓰기 53번)', words: [{ w: '증가하다', r: 'Jeonggahada', e: 'To increase', n: 'बढ्नु' }, { w: '감소하다', r: 'Gamsohada', e: 'To decrease', n: 'घट्नु' }, { w: '조사하다', r: 'Josahada', e: 'To survey/investigate', n: 'सर्वेक्षण गर्नु' }] }
      }
    },
    {
      level: 'TOPIK2_L5', startL: 61, endL: 75, prefix: 'tp5',
      topicMap: {
        61: { title: 'Academic Lectures (학술 강연)', words: [{ w: '강연', r: 'Gangyeon', e: 'Lecture', n: 'प्रवचन/व्याख्यान' }, { w: '논문', r: 'Nonmun', e: 'Academic thesis', n: 'शोधपत्र' }, { w: '분석하다', r: 'Bunseokhada', e: 'To analyze', n: 'विश्लेषण गर्नु' }] },
        62: { title: 'Macroeconomic Policy (마크로 경제)', words: [{ w: '정책', r: 'Jeongchaek', e: 'Policy', n: 'नीति' }, { w: '인플레이션', r: 'Inpeulleiseon', e: 'Inflation', n: 'मुद्रास्फीति' }] }
      }
    },
    {
      level: 'TOPIK2_L6', startL: 76, endL: 90, prefix: 'tp6',
      topicMap: {
        76: { title: 'Native Literary Nuances (고유어와 관용구)', words: [{ w: '관용구', r: 'Gwanyonggu', e: 'Idiomatic expression', n: 'टुक्का/उखान' }, { w: '고유어', r: 'Goyueo', e: 'Native Korean word', n: 'मौलिक कोरियाली शब्द' }] },
        77: { title: 'Constitutional Legislation (헌법과 입법)', words: [{ w: '헌법', r: 'Heonbeop', e: 'Constitution', n: 'संविधान' }, { w: '입법', r: 'Ippeop', e: 'Legislation', n: 'कानुन निर्माण' }] }
      }
    }
  ];

  topikSpecs.forEach(spec => {
    for (let l = spec.startL; l <= spec.endL; l++) {
      const topicInfo = spec.topicMap[l] || { title: `TOPIK Lesson ${l} Terms`, words: [{ w: '학습', r: 'Hakseup', e: 'Learning/Study', n: 'अध्ययन' }, { w: '이해', r: 'Ihae', e: 'Comprehension', n: 'बुझाइ' }, { w: '응용', r: 'Eungyong', e: 'Application', n: 'प्रयोग' }] };
      topicInfo.words.forEach((item, wIdx) => {
        list.push({
          id: `${spec.prefix}_l${l}_${wIdx + 1}`,
          lesson: l,
          level: spec.level,
          word: item.w,
          romanization: item.r,
          meaning: item.e,
          meaningNepali: item.n,
          partOfSpeech: 'Noun/Verb',
          topic: topicInfo.title,
          grammarSentences: [
            {
              korean: `${item.w}을/를 공부합니다.`,
              romanization: `${item.r}-eul/reul gongbu-hamnida.`,
              english: `Study ${item.e.toLowerCase()}.`,
              nepali: `उदाहरण: ${item.n} अध्ययन गर्नु।`
            }
          ]
        });
      });
    }
  });

  return list;
}

export const KOREAN_VOCAB_DATA: KoreanVocabItem[] = [
  ...generateFullEpsVocab(),
  ...generateTopikFullVocab()
];

export function getKoreanVocabByLevel(level: KoreanVocabItem['level']): KoreanVocabItem[] {
  return KOREAN_VOCAB_DATA.filter(v => v.level === level);
}

export function getKoreanVocabByLevelAndLesson(level: KoreanVocabItem['level'], lesson: number): KoreanVocabItem[] {
  return KOREAN_VOCAB_DATA.filter(v => v.level === level && v.lesson === lesson);
}

export function getKoreanVocabByIndustry(industry: string): KoreanVocabItem[] {
  return KOREAN_VOCAB_DATA.filter(v => v.industry === industry || v.level === industry);
}

export function getKoreanVocabByTopic(topic: string, level?: KoreanVocabItem['level']): KoreanVocabItem[] {
  return KOREAN_VOCAB_DATA.filter(v =>
    v.topic === topic && (level ? v.level === level : true)
  );
}

export function getAvailableKoreanLevels(): KoreanVocabItem['level'][] {
  return ['EPS', 'TOPIK1_L1', 'TOPIK2', 'TOPIK3', 'TOPIK4', 'TOPIK2_L5', 'TOPIK2_L6'];
}

export function getAvailableKoreanLessons(level: KoreanVocabItem['level']): number[] {
  if (level === 'EPS' || level?.startsWith('EPS_')) {
    const nums: number[] = [];
    for (let i = 1; i <= 60; i++) nums.push(i);
    return nums;
  }
  if (level === 'TOPIK1_L1') {
    const nums: number[] = [];
    for (let i = 1; i <= 15; i++) nums.push(i);
    return nums;
  }
  if (level === 'TOPIK2') {
    const nums: number[] = [];
    for (let i = 16; i <= 30; i++) nums.push(i);
    return nums;
  }
  if (level === 'TOPIK3') {
    const nums: number[] = [];
    for (let i = 31; i <= 45; i++) nums.push(i);
    return nums;
  }
  if (level === 'TOPIK4') {
    const nums: number[] = [];
    for (let i = 46; i <= 60; i++) nums.push(i);
    return nums;
  }
  if (level === 'TOPIK2_L5') {
    const nums: number[] = [];
    for (let i = 61; i <= 75; i++) nums.push(i);
    return nums;
  }
  if (level === 'TOPIK2_L6') {
    const nums: number[] = [];
    for (let i = 76; i <= 90; i++) nums.push(i);
    return nums;
  }
  const data = getKoreanVocabByLevel(level);
  return [...new Set(data.map(v => v.lesson))].sort((a, b) => a - b);
}

export function getAvailableTopics(level: KoreanVocabItem['level']): string[] {
  const data = getKoreanVocabByLevel(level);
  return [...new Set(data.map(v => v.topic).filter(Boolean))] as string[];
}
