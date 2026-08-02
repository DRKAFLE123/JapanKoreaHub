import { KoreanVocabItem } from '@/lib/korean-vocab';

// ============================================================================
// EPS-TOPIK LESSONS 31–45 VOCABULARY DATASET (Phase 3)
// Authentic EPS-TOPIK Safety Regulations, Labor Contracts, Salary & Banking
// ============================================================================

export const EPS_LESSONS_31_45_VOCAB: KoreanVocabItem[] = [
  // ── LESSON 31: Fishery & Coastal Operations (어업과 양식장 작업) ──
  {
    id: 'eps_l31_1', lesson: 31, level: 'EPS', word: '그물', romanization: 'Geumul',
    meaning: 'Fishing net', meaningNepali: 'माछा मार्ने जाल', partOfSpeech: 'Noun', topic: 'Fishery'
  },
  {
    id: 'eps_l31_2', lesson: 31, level: 'EPS', word: '양식장', romanization: 'Yangsikjang',
    meaning: 'Fish farm / Aquaculture farm', meaningNepali: 'माछा/समुद्री जीव पालन फार्म', partOfSpeech: 'Noun', topic: 'Fishery'
  },

  // ── LESSON 32: Industrial Safety Regulations (산업 안전 수칙) ──
  {
    id: 'eps_l32_1', lesson: 32, level: 'EPS', word: '안전 수칙', romanization: 'Anjeon suchik',
    meaning: 'Safety rules / Regulations', meaningNepali: 'सुरक्षा नियमहरू', partOfSpeech: 'Noun', topic: 'Safety Regulations',
    grammarSentences: [{ korean: '작업장의 안전 수칙을 반드시 준수해야 합니다.', romanization: 'Jageopjang-ui anjeon suchigeul bandeusi junsuhaeya hamnida.', english: 'You must strictly follow the workplace safety rules.', nepali: 'कार्यस्थलका सुरक्षा नियमहरू अनिवार्य रूपमा पालना गर्नुपर्छ।' }]
  },
  {
    id: 'eps_l32_2', lesson: 32, level: 'EPS', word: '감전 사고', romanization: 'Gamjeon sago',
    meaning: 'Electric shock accident', meaningNepali: 'करन्ट लाग्ने दुर्घटना', partOfSpeech: 'Noun', topic: 'Accident Safety'
  },
  {
    id: 'eps_l32_3', lesson: 32, level: 'EPS', word: '추락 사고', romanization: 'Churak sago',
    meaning: 'Fall accident from heights', meaningNepali: 'अग्लो ठाउँबाट खस्ने दुर्घटना', partOfSpeech: 'Noun', topic: 'Accident Safety'
  },
  {
    id: 'eps_l32_4', lesson: 32, level: 'EPS', word: '끼임 사고', romanization: 'Kkiim sago',
    meaning: 'Entrapment / Caught-in-machine accident', meaningNepali: 'मेसिनमा हात/शरीर च्यापिने दुर्घटना', partOfSpeech: 'Noun', topic: 'Accident Safety'
  },

  // ── LESSON 33: Fire Prevention & Extinguishers (화재 예방과 소화기) ──
  {
    id: 'eps_l33_1', lesson: 33, level: 'EPS', word: '소화기', romanization: 'Sohwagi',
    meaning: 'Fire extinguisher', meaningNepali: 'अग्निशामक यन्त्र (आगो निभाउने सिलिन्डर)', partOfSpeech: 'Noun', topic: 'Fire Safety',
    grammarSentences: [{ korean: '불이 나면 소화기를 사용하세요.', romanization: 'Buri namyeon sohwagireul sayonghaseyo.', english: 'If fire breaks out, use the fire extinguisher.', nepali: 'आगो लागेमा अग्निशामक यन्त्र प्रयोग गर्नुहोस्।' }]
  },
  {
    id: 'eps_l33_2', lesson: 33, level: 'EPS', word: '대피하다', romanization: 'Daepihada',
    meaning: 'To evacuate to safety', meaningNepali: 'सुरक्षित ठाउँमा भाग्नु/निस्कनु', partOfSpeech: 'Verb', topic: 'Fire Safety'
  },
  {
    id: 'eps_l33_3', lesson: 33, level: 'EPS', word: '비상구', romanization: 'Bisanggu',
    meaning: 'Emergency exit', meaningNepali: 'आकस्मिक निस्कने ढोका (इमर्जेन्सी एक्जिट)', partOfSpeech: 'Noun', topic: 'Fire Safety'
  },

  // ── LESSON 34: First Aid & Accident Response (응급처치와 사고 대응) ──
  {
    id: 'eps_l34_1', lesson: 34, level: 'EPS', word: '응급처치', romanization: 'Eunggeupcheochi',
    meaning: 'First aid treatment', meaningNepali: 'प्राथमिक उपचार', partOfSpeech: 'Noun', topic: 'First Aid'
  },
  {
    id: 'eps_l34_2', lesson: 34, level: 'EPS', word: '119에 신고하다', romanization: '119-e singohada',
    meaning: 'To report to 119 emergency rescue', meaningNepali: '११९ (आकस्मिक सेवा) मा फोन गर्नु', partOfSpeech: 'Verb', topic: 'First Aid'
  },

  // ── LESSON 35: Industrial Accident Insurance (산업재해보상보험) ──
  {
    id: 'eps_l35_1', lesson: 35, level: 'EPS', word: '산재보험 (산업재해보상보험)', romanization: 'Sanjaebohom',
    meaning: 'Industrial Accident Compensation Insurance', meaningNepali: 'कामदार दुर्घटना बीमा (सान्जै बोहम)', partOfSpeech: 'Noun', topic: 'Insurance',
    grammarSentences: [{ korean: '일하다가 다치면 산재보험 혜택을 받을 수 있습니다.', romanization: 'Irhadaga dachimyeon sanjaebohom hyaetaegeul badeul su itsseumnida.', english: 'If injured while working, you can receive accident insurance benefits.', nepali: 'काम गर्दा चोट लागेमा दुर्घटना बीमाको सुविधा पाउन सकिन्छ।' }]
  },

  // ── LESSON 36: Employment Permit System Overview (고용허가제 이해) ──
  {
    id: 'eps_l36_1', lesson: 36, level: 'EPS', word: '고용허가제 (EPS)', romanization: 'Goyongheogaje',
    meaning: 'Employment Permit System', meaningNepali: 'रोजगार अनुमति प्रणाली (इपिएस)', partOfSpeech: 'Noun', topic: 'EPS System'
  },
  {
    id: 'eps_l36_2', lesson: 36, level: 'EPS', word: '한국산업인력공단 (HRD Korea)', romanization: 'Hanguk saneup inryeok gongdan',
    meaning: 'Human Resources Development Service of Korea', meaningNepali: 'कोरियाली मानव संसाधन विकास सेवा (एचआरडी कोरिया)', partOfSpeech: 'Noun', topic: 'EPS System'
  },

  // ── LESSON 37: Standard Labor Contract Terms (표준근로계약서) ──
  {
    id: 'eps_l37_1', lesson: 37, level: 'EPS', word: '근로계약서', romanization: 'Geullogeyakseo',
    meaning: 'Labor contract agreement', meaningNepali: 'श्रम सम्झौता पत्र (लेबर कन्ट्र्याक्ट)', partOfSpeech: 'Noun', topic: 'Labor Contract',
    grammarSentences: [{ korean: '근로계약서를 서명하기 전에 조건들을 잘 확인하세요.', romanization: 'Geullogeyakseoreul seomyeonghagi jeone jogeondeureul jal hwaginhaseyo.', english: 'Check terms carefully before signing the labor contract.', nepali: 'श्रम सम्झौता पत्रमा हस्ताक्षर गर्नु अघि सर्तहरू राम्ररी जाँच्नुहोस्।' }]
  },
  {
    id: 'eps_l37_2', lesson: 37, level: 'EPS', word: '계약 기간', romanization: 'Geyak gigan',
    meaning: 'Contract duration / period', meaningNepali: 'सम्झौता अवधि (कन्ट्र्याक्ट पिरियड)', partOfSpeech: 'Noun', topic: 'Labor Contract'
  },
  {
    id: 'eps_l37_3', lesson: 37, level: 'EPS', word: '수습 기간', romanization: 'Suseup gigan',
    meaning: 'Probation period', meaningNepali: 'परीक्षण काल (प्रोबेसन पिरियड)', partOfSpeech: 'Noun', topic: 'Labor Contract'
  },

  // ── LESSON 38: Working Hours & Overtime (근로시간과 연장근로) ──
  {
    id: 'eps_l38_1', lesson: 38, level: 'EPS', word: '기본 근로시간', romanization: 'Gibon geullosigan',
    meaning: 'Standard working hours (8h/day)', meaningNepali: 'आधारभूत काम गर्ने समय (८ घण्टा)', partOfSpeech: 'Noun', topic: 'Working Hours'
  },
  {
    id: 'eps_l38_2', lesson: 38, level: 'EPS', word: '연장 근로', romanization: 'Yeonjang geullo',
    meaning: 'Overtime work', meaningNepali: 'थप काम (ओभरटाइम)', partOfSpeech: 'Noun', topic: 'Working Hours',
    grammarSentences: [{ korean: '연장 근로를 하면 연장 수당이 지급됩니다.', romanization: 'Yeonjang geulloreul hamyeon yeonjang sudangi jigeubdoemnida.', english: 'If you work overtime, overtime allowance is paid.', nepali: 'ओभरटाइम काम गरेमा थप भत्ता पाइन्छ।' }]
  },
  {
    id: 'eps_l38_3', lesson: 38, level: 'EPS', word: '야간 근로', romanization: 'Yagan geullo',
    meaning: 'Night shift work (10PM-6AM)', meaningNepali: 'रात्रिकालीन काम (नाइट सिफ्ट)', partOfSpeech: 'Noun', topic: 'Working Hours'
  },

  // ── LESSON 39: Salary Slip & Wages Calculation (월급 명세서와 임금) ──
  {
    id: 'eps_l39_1', lesson: 39, level: 'EPS', word: '월급 명세서', romanization: 'Wolgeup myeongseseo',
    meaning: 'Salary payslip / Pay stub', meaningNepali: 'तलब विवरण पत्र (पे-स्लिप)', partOfSpeech: 'Noun', topic: 'Wages'
  },
  {
    id: 'eps_l39_2', lesson: 39, level: 'EPS', word: '최저임금', romanization: 'Choejeo-imgeum',
    meaning: 'Minimum legal wage', meaningNepali: 'न्यूनतम कानुनी तलब (मिनिमम वेज)', partOfSpeech: 'Noun', topic: 'Wages'
  },
  {
    id: 'eps_l39_3', lesson: 39, level: 'EPS', word: '공제액', romanization: 'Gongje-aek',
    meaning: 'Deduction amount (taxes/insurance)', meaningNepali: 'कट्टी गरिएको रकम (कर र बीमा)', partOfSpeech: 'Noun', topic: 'Wages'
  },
  {
    id: 'eps_l39_4', lesson: 39, level: 'EPS', word: '실수령액', romanization: 'Silsuryeongaek',
    meaning: 'Net take-home pay', meaningNepali: 'खातामा आउने खुद तलब (इन-ह्यान्ड स्यालरी)', partOfSpeech: 'Noun', topic: 'Wages'
  },

  // ── LESSON 40: Paid Holidays & Annual Leave (휴일과 유급휴가) ──
  {
    id: 'eps_l40_1', lesson: 40, level: 'EPS', word: '유급휴가', romanization: 'Yugeubhuga',
    meaning: 'Paid leave / Paid annual holiday', meaningNepali: 'सतलब बिदा (पेइड लिभ)', partOfSpeech: 'Noun', topic: 'Holidays'
  },
  {
    id: 'eps_l40_2', lesson: 40, level: 'EPS', word: '병가', romanization: 'Byeongga',
    meaning: 'Sick leave', meaningNepali: 'बिरामी बिदा (सिक लिभ)', partOfSpeech: 'Noun', topic: 'Holidays'
  },

  // ── LESSON 41: Dormitory Regulations & Hygiene (기숙사 규칙과 위생) ──
  {
    id: 'eps_l41_1', lesson: 41, level: 'EPS', word: '기숙사 수칙', romanization: 'Gisuksa suchik',
    meaning: 'Dormitory rules', meaningNepali: 'होस्टेलका नियमहरू', partOfSpeech: 'Noun', topic: 'Dormitory Rules'
  },
  {
    id: 'eps_l41_2', lesson: 41, level: 'EPS', word: '외부인 출입 금지', romanization: 'Oebu-in chul-ip geumji',
    meaning: 'No outsiders allowed', meaningNepali: 'बाहिरी व्यक्तिको प्रवेश निषेध', partOfSpeech: 'Phrase', topic: 'Dormitory Rules'
  },

  // ── LESSON 42: Workplace Communication & Reports (직장 내 보고와 지시) ──
  {
    id: 'eps_l42_1', lesson: 42, level: 'EPS', word: '보고하다', romanization: 'Bogohada',
    meaning: 'To report to supervisor', meaningNepali: 'हाकिमलाई प्रतिवेदन/जानकारी दिनु (रिपोर्ट गर्नु)', partOfSpeech: 'Verb', topic: 'Workplace Communication',
    grammarSentences: [{ korean: '작업이 끝나면 반장님께 보고하세요.', romanization: 'Jageobi kkeunnamyeon banjangnimkke bogohaseyo.', english: 'When work is finished, report to the foreman.', nepali: 'काम सकिएपछि म्यानेजरलाई जानकारी गराउनुहोस्।' }]
  },

  // ── LESSON 43: Resolving Workplace Conflicts (갈등 해소와 상담) ──
  {
    id: 'eps_l43_1', lesson: 43, level: 'EPS', word: '상담받다', romanization: 'Sangdambatda',
    meaning: 'To receive counseling / advice', meaningNepali: 'सल्लाह/परामर्श लिनु (काउन्सिलिङ लिनु)', partOfSpeech: 'Verb', topic: 'Counseling'
  },

  // ── LESSON 44: Foreign Worker Support Centers (외국인력지원센터) ──
  {
    id: 'eps_l44_1', lesson: 44, level: 'EPS', word: '외국인력지원센터', romanization: 'Oeguginryeok jiwon-senteo',
    meaning: 'Foreign Worker Support Center', meaningNepali: 'विदेशी कामदार सहयोग केन्द्र', partOfSpeech: 'Noun', topic: 'Support Services'
  },

  // ── LESSON 45: Bank Remittance & Currency Exchange (해외 송금과 환전) ──
  {
    id: 'eps_l45_1', lesson: 45, level: 'EPS', word: '환전하다', romanization: 'Hwanjeonhada',
    meaning: 'To exchange foreign currency', meaningNepali: 'पैसा साट्नु (करन्सी एक्सचेन्ज गर्नु)', partOfSpeech: 'Verb', topic: 'Banking'
  },
  {
    id: 'eps_l45_2', lesson: 45, level: 'EPS', word: '해외 송금 계좌', romanization: 'Hae-oe songgeum gyejwa',
    meaning: 'Overseas remittance bank account', meaningNepali: 'विदेशमा पैसा पठाउने बैंक खाता', partOfSpeech: 'Noun', topic: 'Banking'
  }
];
