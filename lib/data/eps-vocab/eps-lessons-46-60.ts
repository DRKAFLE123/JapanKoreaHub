import { KoreanVocabItem } from '@/lib/korean-vocab';

// ============================================================================
// EPS-TOPIK LESSONS 46–60 VOCABULARY DATASET (Phase 4)
// Authentic EPS-TOPIK Insurance, Visas, Culture & Life in Korea Vocabulary
// ============================================================================

export const EPS_LESSONS_46_60_VOCAB: KoreanVocabItem[] = [
  // ── LESSON 46: National Health Insurance (국민건강보험 혜택) ──
  {
    id: 'eps_l46_1', lesson: 46, level: 'EPS', word: '국민건강보험', romanization: 'Gungmin geongang bohom',
    meaning: 'National Health Insurance', meaningNepali: 'राष्ट्रीय स्वास्थ्य बीमा (हेल्थ इन्स्योरेन्स)', partOfSpeech: 'Noun', topic: 'Insurance'
  },
  {
    id: 'eps_l46_2', lesson: 46, level: 'EPS', word: '보험료', romanization: 'Bohomryo',
    meaning: 'Insurance premium amount', meaningNepali: 'बीमा शुल्क (प्रिमियम)', partOfSpeech: 'Noun', topic: 'Insurance'
  },

  // ── LESSON 47: Departure Guarantee Insurance & Pension (출국만기보험) ──
  {
    id: 'eps_l47_1', lesson: 47, level: 'EPS', word: '출국만기보험', romanization: 'Chulguk man-gi bohom',
    meaning: 'Departure Guarantee Insurance (Severance Pay)', meaningNepali: 'नेपाल फर्कँदा पाइने विदाई बीमा (विच्छेद भत्ता / सेभरेन्स पे)', partOfSpeech: 'Noun', topic: 'Insurance',
    grammarSentences: [{ korean: '귀국하기 전에 출국만기보험금을 신청해야 합니다.', romanization: 'Gwigukhagi jeone chulguk man-gi bohomgeumeul sincheonghaeya hamnida.', english: 'You must apply for departure guarantee insurance money before returning home.', nepali: 'नेपाल फर्कनु अघि विदाई बीमा रकमको लागि आवेदन दिनुपर्छ।' }]
  },
  {
    id: 'eps_l47_2', lesson: 47, level: 'EPS', word: '귀국비용보험', romanization: 'Gwiguk biyong bohom',
    meaning: 'Return flight insurance', meaningNepali: 'फर्किने टिकट बीमा', partOfSpeech: 'Noun', topic: 'Insurance'
  },

  // ── LESSON 48: Changing Workplace & Application (사업장 변경 신청) ──
  {
    id: 'eps_l48_1', lesson: 48, level: 'EPS', word: '사업장 변경', romanization: 'Saeopjang byeongyeong',
    meaning: 'Changing company / workplace', meaningNepali: 'कम्पनी परिवर्तन गर्नु (कम्पनी सार्नु)', partOfSpeech: 'Noun', topic: 'Workplace Change',
    grammarSentences: [{ korean: '고용센터에서 사업장 변경을 신청했습니다.', romanization: 'Goyong-senteo-eseo saeopjang byeongyeongeul sincheonghaetsseumnida.', english: 'I applied for workplace change at the employment center.', nepali: 'रोजगार केन्द्रमा मैले कम्पनी परिवर्तनको लागि निवेदन दिएँ।' }]
  },
  {
    id: 'eps_l48_2', lesson: 48, level: 'EPS', word: '이적 동의서', romanization: 'Ijeok dong-oiseo',
    meaning: 'Release letter from employer', meaningNepali: 'मालिकको सहमति पत्र (रिलीज लेटर)', partOfSpeech: 'Noun', topic: 'Workplace Change'
  },

  // ── LESSON 49: Visa Extension & Re-entry Permit (체류기간 연장) ──
  {
    id: 'eps_l49_1', lesson: 49, level: 'EPS', word: '체류기간 연장', romanization: 'Chaeryugigan yeonjang',
    meaning: 'Visa stay period extension', meaningNepali: 'भिसाको म्याद थप गर्नु (भिसा एक्सटेन्सन)', partOfSpeech: 'Noun', topic: 'Visa',
    grammarSentences: [{ korean: '출입국관리사무소에서 체류기간을 연장했습니다.', romanization: 'Chul-ipguk gwalli samuso-eseo chaeryugiganeul yeonjanghaetsseumnida.', english: 'I extended my stay visa at the immigration office.', nepali: 'अध्यागमन कार्यालयबाट मैले भिसाको म्याद थप गराएँ।' }]
  },
  {
    id: 'eps_l49_2', lesson: 49, level: 'EPS', word: '외국인등록증', romanization: 'Oegugin deungrokjeung',
    meaning: 'Alien Registration Card (ARC ID)', meaningNepali: 'विदेशी परिचयपत्र (एलियन कार्ड / परिचयपत्र)', partOfSpeech: 'Noun', topic: 'Visa'
  },

  // ── LESSON 50: Preparing for Return Home (귀국 준비와 항공권) ──
  {
    id: 'eps_l50_1', lesson: 50, level: 'EPS', word: '귀국하다', romanization: 'Gwigukhada',
    meaning: 'To return to home country', meaningNepali: 'आफ्नो देश फर्कनु', partOfSpeech: 'Verb', topic: 'Return Home'
  },
  {
    id: 'eps_l50_2', lesson: 50, level: 'EPS', word: '항공권', romanization: 'Hangggonggwon',
    meaning: 'Flight ticket', meaningNepali: 'हवाई टिकट', partOfSpeech: 'Noun', topic: 'Return Home'
  },

  // ── LESSON 51: Korean Culture & Social Customs (한국 문화와 풍습) ──
  {
    id: 'eps_l51_1', lesson: 51, level: 'EPS', word: '존댓말', romanization: 'Jondaetmal',
    meaning: 'Honorific speech / Polite language', meaningNepali: 'आदरार्थी भाषा (मानार्थी बोली)', partOfSpeech: 'Noun', topic: 'Korean Culture'
  },
  {
    id: 'eps_l51_2', lesson: 51, level: 'EPS', word: '반말', romanization: 'Banmal',
    meaning: 'Informal / Casual speech', meaningNepali: 'अनादरार्थी भाषा (साधारण बोली)', partOfSpeech: 'Noun', topic: 'Korean Culture'
  },

  // ── LESSON 52: Traditional Korean Holidays (추석과 설날) ──
  {
    id: 'eps_l52_1', lesson: 52, level: 'EPS', word: '설날', romanization: 'Seollal',
    meaning: 'Korean Lunar New Year', meaningNepali: 'कोरियाली नयाँ वर्ष (सोल्लाल)', partOfSpeech: 'Noun', topic: 'Holidays'
  },
  {
    id: 'eps_l52_2', lesson: 52, level: 'EPS', word: '추석', romanization: 'Chuseok',
    meaning: 'Korean Thanksgiving Harvest Festival', meaningNepali: 'कोरियाली महान चाड (छुसक)', partOfSpeech: 'Noun', topic: 'Holidays'
  },
  {
    id: 'eps_l52_3', lesson: 52, level: 'EPS', word: '떡국', romanization: 'Tteokguk',
    meaning: 'Rice cake soup (New Year food)', meaningNepali: 'चामलको पिठोको सुप (तोकगुक)', partOfSpeech: 'Noun', topic: 'Holidays'
  },
  {
    id: 'eps_l52_4', lesson: 52, level: 'EPS', word: '송편', romanization: 'Songpyeon',
    meaning: 'Half-moon rice cakes (Chuseok food)', meaningNepali: 'चामलको विशेष पकवान (सोङफ्योन)', partOfSpeech: 'Noun', topic: 'Holidays'
  },

  // ── LESSON 53: Four Seasons & Local Festivals (사계절과 축제) ──
  {
    id: 'eps_l53_1', lesson: 53, level: 'EPS', word: '사계절', romanization: 'Sagyejeol',
    meaning: 'Four seasons (Spring, Summer, Autumn, Winter)', meaningNepali: 'चार ऋतुहरू', partOfSpeech: 'Noun', topic: 'Seasons'
  },
  {
    id: 'eps_l53_2', lesson: 53, level: 'EPS', word: '단풍놀이', romanization: 'Danpungnori',
    meaning: 'Autumn foliage sightseeing', meaningNepali: 'शरद् ऋतुमा राताे/पहेंलाे पात हेर्ने भ्रमण', partOfSpeech: 'Noun', topic: 'Seasons'
  },

  // ── LESSON 54: Korean Media & Modern Culture (한류와 대중문화) ──
  {
    id: 'eps_l54_1', lesson: 54, level: 'EPS', word: '한류', romanization: 'Hallyu',
    meaning: 'Korean Wave (K-pop, K-drama)', meaningNepali: 'कोरियाली लहर (हाल्ल्यु - केपप र सिरियल)', partOfSpeech: 'Noun', topic: 'Culture'
  },

  // ── LESSON 55: Emergency Phone Numbers (응급 전화번호 119/112) ──
  {
    id: 'eps_l55_1', lesson: 55, level: 'EPS', word: '119 안전신고센터', romanization: '119 Anjeon singo-senteo',
    meaning: '119 Fire & Ambulance Emergency', meaningNepali: '११९ आगो र एम्बुलेन्स सेवा', partOfSpeech: 'Noun', topic: 'Emergency'
  },
  {
    id: 'eps_l55_2', lesson: 55, level: 'EPS', word: '112 경찰청 신고', romanization: '112 Gyeongchalcheong singo',
    meaning: '112 Police Emergency', meaningNepali: '११२ प्रहरी आकस्मिक सेवा', partOfSpeech: 'Noun', topic: 'Emergency'
  },

  // ── LESSON 56: Utility Bills & Mobile Apps (공과금과 앱 사용) ──
  {
    id: 'eps_l56_1', lesson: 56, level: 'EPS', word: '공과금', romanization: 'Gonggwageum',
    meaning: 'Utility bills (electricity, water, gas)', meaningNepali: 'सरकारी शुल्क/बिलहरू (बिजुली, पानी, ग्याँस)', partOfSpeech: 'Noun', topic: 'Bills'
  },

  // ── LESSON 57: Online Delivery & Shopping (택배와 인터넷 쇼핑) ──
  {
    id: 'eps_l57_1', lesson: 57, level: 'EPS', word: '택배', romanization: 'Taekbae',
    meaning: 'Parcel courier delivery service', meaningNepali: 'कुरियर / होम डेलिभरी सेवा', partOfSpeech: 'Noun', topic: 'Shopping',
    grammarSentences: [{ korean: '기숙사로 택배가 도착했습니다.', romanization: 'Gisuksaro taekbaega dochakhaetsseumnida.', english: 'The courier parcel arrived at the dormitory.', nepali: 'होस्टेलमा कुरियर पार्सल आइपुग्यो।' }]
  },

  // ── LESSON 58: Dining Etiquette & Manners (식사 예절과 수저) ──
  {
    id: 'eps_l58_1', lesson: 58, level: 'EPS', word: '수저 (숟가락과 젓가락)', romanization: 'Sujeo',
    meaning: 'Spoon and chopsticks', meaningNepali: 'चम्चा र काँटा/चपस्टिक', partOfSpeech: 'Noun', topic: 'Etiquette'
  },

  // ── LESSON 59: Transportation Card & Transfers (대중교통 환승) ──
  {
    id: 'eps_l59_1', lesson: 59, level: 'EPS', word: '환승 할인', romanization: 'Hwanseung harin',
    meaning: 'Transfer discount (bus to subway)', meaningNepali: 'यातातयात फेर्दा पाइने छुट (ट्रान्सफर डिस्काउन्ट)', partOfSpeech: 'Noun', topic: 'Transportation'
  },

  // ── LESSON 60: Achieving Success in Korea (성공적인 한국 생활) ──
  {
    id: 'eps_l60_1', lesson: 60, level: 'EPS', word: '성공적인 한국 생활', romanization: 'Seonggongjeogin Hangeuk saenghwal',
    meaning: 'Successful life in Korea', meaningNepali: 'सफल कोरिया बसाइ', partOfSpeech: 'Phrase', topic: 'Success',
    grammarSentences: [{ korean: '열심히 한국어를 공부하여 성공적인 한국 생활을 만드세요!', romanization: 'Yeolsimhi Hangugeoreul gongbuhayeo seonggongjeogin Hangeuk saenghwaleul manduseyo!', english: 'Study Korean hard and achieve a successful life in Korea!', nepali: 'मेहेनतका साथ कोरियाली भाषा पढेर कोरियामा सफल जीवन बनाउनुहोस्!' }]
  }
];
