import { KoreanVocabItem } from '@/lib/korean-vocab';

// ============================================================================
// EPS-TOPIK LESSONS 16–30 VOCABULARY DATASET (Phase 2)
// Authentic EPS-TOPIK Workplace, Tools, Safety & Industry Vocabulary
// ============================================================================

export const EPS_LESSONS_16_30_VOCAB: KoreanVocabItem[] = [
  // ── LESSON 16: Hospital & Medical Care (병원과 치료) ──
  {
    id: 'eps_l16_1', lesson: 16, level: 'EPS', word: '내과', romanization: 'Naegwa',
    meaning: 'Internal medicine department', meaningNepali: 'आन्तरिक रोग विभाग (फिजिसियन)', partOfSpeech: 'Noun', topic: 'Hospital'
  },
  {
    id: 'eps_l16_2', lesson: 16, level: 'EPS', word: '정형외과', romanization: 'Jeonghyeong-oegwa',
    meaning: 'Orthopedics (bone clinic)', meaningNepali: 'हाडजोर्नी विभाग', partOfSpeech: 'Noun', topic: 'Hospital'
  },
  {
    id: 'eps_l16_3', lesson: 16, level: 'EPS', word: '치과', romanization: 'Chigwa',
    meaning: 'Dental clinic / Dentistry', meaningNepali: 'दन्त रोग विभाग (दाँत अस्पताल)', partOfSpeech: 'Noun', topic: 'Hospital'
  },
  {
    id: 'eps_l16_4', lesson: 16, level: 'EPS', word: '주사를 맞다', romanization: 'Jusareul matda',
    meaning: 'To get an injection / shot', meaningNepali: 'सुई लगाउनु', partOfSpeech: 'Verb', topic: 'Medical Treatment',
    grammarSentences: [{ korean: '병원에서 독감 예방 주사를 맞았습니다.', romanization: 'Byeongwon-eseo dokgam yebang jusareul 맞았습니다.', english: 'I got a flu shot at the hospital.', nepali: 'अस्पतालमा मैले फ्लु खोप (सुई) लगाएँ।' }]
  },
  {
    id: 'eps_l16_5', lesson: 16, level: 'EPS', word: '처방전', romanization: 'Cheobangjeon',
    meaning: 'Doctor prescription', meaningNepali: 'डाक्टरको सिफारिस पत्र (प्रेस्क्रिप्सन)', partOfSpeech: 'Noun', topic: 'Hospital'
  },

  // ── LESSON 17: Dormitory Life (기숙사 생활) ──
  {
    id: 'eps_l17_1', lesson: 17, level: 'EPS', word: '기숙사', romanization: 'Gisuksa',
    meaning: 'Dormitory / Company hostel', meaningNepali: 'कम्पनीको होस्टेल / मेश', partOfSpeech: 'Noun', topic: 'Dormitory',
    grammarSentences: [{ korean: '우리 회사 기숙사는 아주 깨끗합니다.', romanization: 'Uri hoesa gisuksaneun aju kkaekkeut-hamnida.', english: 'Our company dormitory is very clean.', nepali: 'हाम्रो कम्पनीको होस्टेल धेरै सफा छ।' }]
  },
  {
    id: 'eps_l17_2', lesson: 17, level: 'EPS', word: '룸메이트', romanization: 'Rummeiteu',
    meaning: 'Roommate', meaningNepali: 'कोठाको साथी (रूममेट)', partOfSpeech: 'Noun', topic: 'Dormitory'
  },
  {
    id: 'eps_l17_3', lesson: 17, level: 'EPS', word: '취사장', romanization: 'Chwisajang',
    meaning: 'Dormitory kitchen / Cooking area', meaningNepali: 'खाना पकाउने ठाउँ (भान्छा)', partOfSpeech: 'Noun', topic: 'Dormitory'
  },
  {
    id: 'eps_l17_4', lesson: 17, level: 'EPS', word: '세탁실', romanization: 'Setaksil',
    meaning: 'Laundry room', meaningNepali: 'कपडा धुने कोठा (लुगा धुने ठाउँ)', partOfSpeech: 'Noun', topic: 'Dormitory'
  },
  {
    id: 'eps_l17_5', lesson: 17, level: 'EPS', word: '난방', romanization: 'Nanbang',
    meaning: 'Heating (room heater)', meaningNepali: 'कोठा तातो बनाउने प्रविधि (हिटिङ)', partOfSpeech: 'Noun', topic: 'Dormitory'
  },

  // ── LESSON 18: Housework & Cleaning (집안일과 청소) ──
  {
    id: 'eps_l18_1', lesson: 18, level: 'EPS', word: '청소기', romanization: 'Cheongsogi',
    meaning: 'Vacuum cleaner', meaningNepali: 'भ्याकुम क्लिनर (सरसफाइ मेसिन)', partOfSpeech: 'Noun', topic: 'Cleaning'
  },
  {
    id: 'eps_l18_2', lesson: 18, level: 'EPS', word: '걸레질하다', romanization: 'Geollejilhada',
    meaning: 'To mop the floor', meaningNepali: 'भुइँ पुछ्नु (पोछा लगाउनु)', partOfSpeech: 'Verb', topic: 'Cleaning'
  },
  {
    id: 'eps_l18_3', lesson: 18, level: 'EPS', word: '쓰레기를 버리다', romanization: 'Sseuregireul beorida',
    meaning: 'To throw away garbage', meaningNepali: 'फोहोर फाल्नु', partOfSpeech: 'Verb', topic: 'Cleaning',
    grammarSentences: [{ korean: '쓰레기는 종량제 봉투에 버려야 합니다.', romanization: 'Sseuregineun jongryangje bongtu-e beoryeoya hamnida.', english: 'Garbage must be disposed of in standard designated bags.', nepali: 'फोहोर तोकिएको आधिकारिक प्लास्टिकको झोलामा फाल्नुपर्छ।' }]
  },
  {
    id: 'eps_l18_4', lesson: 18, level: 'EPS', word: '분리수거하다', romanization: 'Bullisugeohada',
    meaning: 'To separate recyclable waste', meaningNepali: 'फोहोर वर्गीकरण गर्नु (पुनर्चक्रण)', partOfSpeech: 'Verb', topic: 'Cleaning'
  },

  // ── LESSON 19: Clothing & Dressing (옷과 차림새) ──
  {
    id: 'eps_l19_1', lesson: 19, level: 'EPS', word: '작업복', romanization: 'Jageopbok',
    meaning: 'Work uniform / Overalls', meaningNepali: 'काम गर्ने पोशाक (युनिफर्म)', partOfSpeech: 'Noun', topic: 'Clothing',
    grammarSentences: [{ korean: '작업장에서는 반드시 작업복을 입으세요.', romanization: 'Jageopjang-eseoneun bandeusi jageopbogeul ibuseyo.', english: 'Please always wear work uniform in the workplace.', nepali: 'कार्यक्षेत्रमा अनिवार्य रूपमा काम गर्ने पोशाक लगाउनुहोस्।' }]
  },
  {
    id: 'eps_l19_2', lesson: 19, level: 'EPS', word: '단정하다', romanization: 'Danjeonghada',
    meaning: 'To be neat / tidy', meaningNepali: 'सफा र सुहाउँदो देखिनु', partOfSpeech: 'Adjective', topic: 'Appearance'
  },
  {
    id: 'eps_l19_3', lesson: 19, level: 'EPS', word: '단추를 잠그다', romanization: 'Danchureul jamgeuda',
    meaning: 'To button up a shirt', meaningNepali: 'टाँक लगाउनु', partOfSpeech: 'Verb', topic: 'Clothing'
  },

  // ── LESSON 20: Public Etiquette & Rules (공공장소 예절) ──
  {
    id: 'eps_l20_1', lesson: 20, level: 'EPS', word: '금연', romanization: 'Geumyeon',
    meaning: 'No smoking', meaningNepali: 'धूम्रपान निषेध', partOfSpeech: 'Noun', topic: 'Public Rules'
  },
  {
    id: 'eps_l20_2', lesson: 20, level: 'EPS', word: '음식물 반입 금지', romanization: 'Eumsikmul banip geumji',
    meaning: 'No food allowed inside', meaningNepali: 'खाना ल्याउन मनाही', partOfSpeech: 'Phrase', topic: 'Public Rules'
  },
  {
    id: 'eps_l20_3', lesson: 20, level: 'EPS', word: '노약자석', romanization: 'Noyakjaseok',
    meaning: 'Priority seat for elderly/disabled', meaningNepali: 'जेष्ठ नागरिक तथा असक्त सिट', partOfSpeech: 'Noun', topic: 'Public Rules'
  },

  // ── LESSON 21: Workplace Etiquette (직장 예절) ──
  {
    id: 'eps_l21_1', lesson: 21, level: 'EPS', word: '반장님', romanization: 'Banjangnim',
    meaning: 'Foreman / Line supervisor', meaningNepali: 'लाइन म्यानेजर / इन्चार्ज (बान्जाङनिम)', partOfSpeech: 'Noun', topic: 'Workplace'
  },
  {
    id: 'eps_l21_2', lesson: 21, level: 'EPS', word: '사장님', romanization: 'Sajangnim',
    meaning: 'Company Boss / CEO', meaningNepali: 'मालिक / साहुजी (साजाङनिम)', partOfSpeech: 'Noun', topic: 'Workplace'
  },
  {
    id: 'eps_l21_3', lesson: 21, level: 'EPS', word: '지각하다', romanization: 'Jigakhada',
    meaning: 'To be late for work', meaningNepali: 'काममा ढिलो हुनु', partOfSpeech: 'Verb', topic: 'Workplace Etiquette',
    grammarSentences: [{ korean: '출근 시간에 지각하면 안 됩니다.', romanization: 'Chulgeun sigane jigakhamyeon an doemnida.', english: 'You must not be late for work arrival time.', nepali: 'काममा आउने समयमा ढिलो हुनुहुँदैन।' }]
  },

  // ── LESSON 22: Hand Tools & Hardware (수공구와 공구) ──
  {
    id: 'eps_l22_1', lesson: 22, level: 'EPS', word: '망치', romanization: 'Mangchi',
    meaning: 'Hammer', meaningNepali: 'हथौडी', partOfSpeech: 'Noun', topic: 'Tools'
  },
  {
    id: 'eps_l22_2', lesson: 22, level: 'EPS', word: '드라이버', romanization: 'Deuraibeo',
    meaning: 'Screwdriver', meaningNepali: 'पेचकस (स्क्रुड्राइभर)', partOfSpeech: 'Noun', topic: 'Tools'
  },
  {
    id: 'eps_l22_3', lesson: 22, level: 'EPS', word: '펜치', romanization: 'Penchi',
    meaning: 'Pliers', meaningNepali: 'प्लायर्स (सँडासी)', partOfSpeech: 'Noun', topic: 'Tools'
  },
  {
    id: 'eps_l22_4', lesson: 22, level: 'EPS', word: '스패너 / 렌치', romanization: 'Supaeneo / Renchi',
    meaning: 'Spanner / Wrench', meaningNepali: 'रेन्ची / स्पाना', partOfSpeech: 'Noun', topic: 'Tools'
  },
  {
    id: 'eps_l22_5', lesson: 22, level: 'EPS', word: '줄자', romanization: 'Julja',
    meaning: 'Measuring tape', meaningNepali: 'नाप्ने फित्ता (इन्चिफित्ता)', partOfSpeech: 'Noun', topic: 'Tools'
  },

  // ── LESSON 23: Safety Equipment & Protective Gear (보호구 착용) ──
  {
    id: 'eps_l23_1', lesson: 23, level: 'EPS', word: '안전모', romanization: 'Anjeonmo',
    meaning: 'Safety helmet / Hard hat', meaningNepali: 'सुरक्षा टोपी (हेलमेट)', partOfSpeech: 'Noun', topic: 'Safety Gear',
    grammarSentences: [{ korean: '공사장에서는 반드시 안전모를 착용해야 합니다.', romanization: 'Gongsajang-eseoneun bandeusi anjeonmoreul chagyeonghaeya hamnida.', english: 'You must wear a safety helmet at the construction site.', nepali: 'निर्माण क्षेत्रमा अनिवार्य रूपमा सुरक्षा हेलमेट लगाउनुपर्छ।' }]
  },
  {
    id: 'eps_l23_2', lesson: 23, level: 'EPS', word: '안전화', romanization: 'Anjeonhwa',
    meaning: 'Safety boots / Steel toe shoes', meaningNepali: 'सुरक्षा जुत्ता (सेफ्टी सुज)', partOfSpeech: 'Noun', topic: 'Safety Gear'
  },
  {
    id: 'eps_l23_3', lesson: 23, level: 'EPS', word: '안전장갑', romanization: 'Anjeonjanggap',
    meaning: 'Safety gloves', meaningNepali: 'सुरक्षा पञ्जा', partOfSpeech: 'Noun', topic: 'Safety Gear'
  },
  {
    id: 'eps_l23_4', lesson: 23, level: 'EPS', word: '보안경', romanization: 'Boangyeong',
    meaning: 'Safety goggles / Glasses', meaningNepali: 'सुरक्षा चश्मा (गगल्स)', partOfSpeech: 'Noun', topic: 'Safety Gear'
  },
  {
    id: 'eps_l23_5', lesson: 23, level: 'EPS', word: '귀마개', romanization: 'Gwimagae',
    meaning: 'Earplugs (for noise protection)', meaningNepali: 'कानको सुरक्षा प्लग (इयरप्लग)', partOfSpeech: 'Noun', topic: 'Safety Gear'
  },
  {
    id: 'eps_l23_6', lesson: 23, level: 'EPS', word: '마스크', romanization: 'Maseukeu',
    meaning: 'Dust mask / Respirator', meaningNepali: 'मास्क (धुलो रोक्ने मास्क)', partOfSpeech: 'Noun', topic: 'Safety Gear'
  },

  // ── LESSON 24: Machine Operations & Control (기계 작동과 스위치) ──
  {
    id: 'eps_l24_1', lesson: 24, level: 'EPS', word: '스위치를 켜다', romanization: 'Seuwichireul kyeoda',
    meaning: 'To turn on the machine switch', meaningNepali: 'मेसिनको स्विच अन गर्नु', partOfSpeech: 'Verb', topic: 'Machine Control'
  },
  {
    id: 'eps_l24_2', lesson: 24, level: 'EPS', word: '스위치를 끄다', romanization: 'Seuwichireul kkeuda',
    meaning: 'To turn off the machine switch', meaningNepali: 'मेसिनको स्विच बन्द गर्नु', partOfSpeech: 'Verb', topic: 'Machine Control'
  },
  {
    id: 'eps_l24_3', lesson: 24, level: 'EPS', word: '비상 정지 버튼', romanization: 'Bisang jeongji beoteun',
    meaning: 'Emergency stop button', meaningNepali: 'आकस्मिक मेसिन रोक्ने बटन (इमर्जेन्सी बटन)', partOfSpeech: 'Noun', topic: 'Safety Control',
    grammarSentences: [{ korean: '사고가 나면 비상 정지 버튼을 누르세요.', romanization: 'Sagoga namyeon bisang jeongji beoteuneul nureuseyo.', english: 'If an accident occurs, press the emergency stop button.', nepali: 'दुर्घटना भएमा आकस्मिक रोक्ने बटन थिच्नुहोस्।' }]
  },

  // ── LESSON 25: Assembly & Packing Work (조립과 포장 작업) ──
  {
    id: 'eps_l25_1', lesson: 25, level: 'EPS', word: '조립하다', romanization: 'Joriphada',
    meaning: 'To assemble parts', meaningNepali: 'पुर्जाहरू जोड्नु (असेम्बल गर्नु)', partOfSpeech: 'Verb', topic: 'Manufacturing'
  },
  {
    id: 'eps_l25_2', lesson: 25, level: 'EPS', word: '포장하다', romanization: 'Pojanghada',
    meaning: 'To pack / package goods', meaningNepali: 'सामान प्याक गर्नु', partOfSpeech: 'Verb', topic: 'Manufacturing'
  },
  {
    id: 'eps_l25_3', lesson: 25, level: 'EPS', word: '상자 / 박스', romanization: 'Sangja / Bakseu',
    meaning: 'Carton box', meaningNepali: 'कार्टुन बाकस', partOfSpeech: 'Noun', topic: 'Manufacturing'
  },
  {
    id: 'eps_l25_4', lesson: 25, level: 'EPS', word: '운반하다', romanization: 'Unbanhada',
    meaning: 'To transport / carry goods', meaningNepali: 'सामान ओसारपसार गर्नु', partOfSpeech: 'Verb', topic: 'Logistics'
  },

  // ── LESSON 26: Welding & Metal Fabrication (용접과 금속 가공) ──
  {
    id: 'eps_l26_1', lesson: 26, level: 'EPS', word: '용접하다', romanization: 'Yongjeobhada',
    meaning: 'To weld metals', meaningNepali: 'वेल्डिङ गर्नु', partOfSpeech: 'Verb', topic: 'Manufacturing',
    grammarSentences: [{ korean: '용접할 때는 용접면을 사용해야 합니다.', romanization: 'Yongjeobhal ttaeneun yongjeobmyeoneul sayonghaeya hamnida.', english: 'You must use a welding shield mask when welding.', nepali: 'वेल्डिङ गर्दा वेल्डिङ मास्क प्रयोग गर्नुपर्छ।' }]
  },
  {
    id: 'eps_l26_2', lesson: 26, level: 'EPS', word: '절단하다', romanization: 'Jeoldanhada',
    meaning: 'To cut metal / sheets', meaningNepali: 'धातु वा पाता काट्नु', partOfSpeech: 'Verb', topic: 'Manufacturing'
  },

  // ── LESSON 27: Painting & Surface Coating (페인트 도장 작업) ──
  {
    id: 'eps_l27_1', lesson: 27, level: 'EPS', word: '페인트칠하다', romanization: 'Peinteuchilhada',
    meaning: 'To paint surfaces', meaningNepali: 'पेन्ट लगाउनु (रङ लगाउनु)', partOfSpeech: 'Verb', topic: 'Painting'
  },
  {
    id: 'eps_l27_2', lesson: 27, level: 'EPS', word: '환기하다', romanization: 'Hwangihada',
    meaning: 'To ventilate air', meaningNepali: 'हावा आउजाउ गराउनु (भेन्टिलेसन)', partOfSpeech: 'Verb', topic: 'Safety'
  },

  // ── LESSON 28: Carpentry & Construction (목공과 건설 현장) ──
  {
    id: 'eps_l28_1', lesson: 28, level: 'EPS', word: '건설 현장', romanization: 'Geonseol hyeonjang',
    meaning: 'Construction site', meaningNepali: 'निर्माण स्थल (कन्स्ट्रक्सन साइट)', partOfSpeech: 'Noun', topic: 'Construction'
  },
  {
    id: 'eps_l28_2', lesson: 28, level: 'EPS', word: '비계', romanization: 'Bigye',
    meaning: 'Scaffolding', meaningNepali: 'अग्लो निर्माणमा टेको/घेरबार (स्काफोल्डिङ)', partOfSpeech: 'Noun', topic: 'Construction'
  },

  // ── LESSON 29: Agriculture & Crop Farming (농업과 농작물 재배) ──
  {
    id: 'eps_l29_1', lesson: 29, level: 'EPS', word: '농장', romanization: 'Nongjang',
    meaning: 'Farm / Agriculture land', meaningNepali: 'फार्म / कृषि फार्म', partOfSpeech: 'Noun', topic: 'Agriculture'
  },
  {
    id: 'eps_l29_2', lesson: 29, level: 'EPS', word: '비닐하우스', romanization: 'Binilhauseu',
    meaning: 'Greenhouse / Vinyl house', meaningNepali: 'प्लास्टिक घर (ग्रीनहाउस)', partOfSpeech: 'Noun', topic: 'Agriculture'
  },
  {
    id: 'eps_l29_3', lesson: 29, level: 'EPS', word: '수확하다', romanization: 'Suhwakhada',
    meaning: 'To harvest crops', meaningNepali: 'बाली भित्र्याउनु / टिप्नु', partOfSpeech: 'Verb', topic: 'Agriculture'
  },

  // ── LESSON 30: Livestock & Poultry Raising (축산업과 가축 사육) ──
  {
    id: 'eps_l30_1', lesson: 30, level: 'EPS', word: '축사', romanization: 'Chuksa',
    meaning: 'Livestock barn / Animal shed', meaningNepali: 'गोठ / पशुपालन फार्म', partOfSpeech: 'Noun', topic: 'Livestock'
  },
  {
    id: 'eps_l30_2', lesson: 30, level: 'EPS', word: '사료를 주다', romanization: 'Saryoreul juda',
    meaning: 'To feed livestock', meaningNepali: 'पशुलाई दाना/घाँस दिनु', partOfSpeech: 'Verb', topic: 'Livestock'
  }
];
