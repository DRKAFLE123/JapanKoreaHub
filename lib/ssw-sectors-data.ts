export interface SSWTextbook {
  id: string;
  title: string;
  titleNe: string;
  publisher: string;
  language: string;
  fileSize: string;
  pdfUrl: string;
  description: string;
  descriptionNe: string;
  chapters: string[];
}

export interface SSWVocabItem {
  id: string;
  kanji: string;
  kana: string;
  romaji: string;
  english: string;
  nepali: string;
  category: string;
  audioUrl?: string;
  exampleSentence?: string;
  exampleSentenceNe?: string;
}

export interface SSWListeningDrill {
  id: string;
  title: string;
  audioUrl: string;
  duration: string;
  transcriptJp: string;
  transcriptEn: string;
  transcriptNe: string;
  question: string;
  questionNe: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  explanationNe: string;
}

export interface SSWExamQuestion {
  id: string;
  question: string;
  questionNe?: string;
  imageUrl?: string;
  audioUrl?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  explanationNe: string;
}

export interface SSWSectorData {
  id: string;
  slug: string;
  name: string;
  kanji: string;
  icon: string;
  badge: string;
  demand: string;
  testDuration: string;
  passScore: string;
  prometricFee: string;
  summary: string;
  summaryNe: string;
  visaPath: string;
  textbooks: SSWTextbook[];
  vocabList: SSWVocabItem[];
  listeningDrills: SSWListeningDrill[];
  practiceQuestions: SSWExamQuestion[];
}

export const SSW_SECTORS_DATA: Record<string, SSWSectorData> = {
  nursing: {
    id: 'nursing',
    slug: 'nursing',
    name: 'Caregiving (Kaigo / 介護)',
    kanji: '介護技能評価試験',
    icon: '🏥',
    badge: 'Prometric SSW-1 Caregiving',
    demand: 'Very High (High Priority)',
    testDuration: '60 minutes',
    passScore: '60 / 100 Pts (60%)',
    prometricFee: 'NPR 1,000 / ~JPY 1,000',
    summary: 'The Caregiving (Kaigo) SSW evaluation exam tests basic nursing home care, hygiene assistance, transfer techniques, and patient communication skills in Japanese.',
    summaryNe: 'काइगो (Caregiving) परीक्षाले वृद्धाश्रममा बिरामीको हेरचाह, व्यक्तिगत सरसफाइ सहायता, ह्विलचेयर ट्रान्सफर र जापानी भाषामा बिरामी संवाद क्षमता परीक्षण गर्दछ।',
    visaPath: 'SSW-1 (Up to 5 years) ➔ Caregiver National License (介護福祉士) ➔ Unlimited Residency & Family Visa.',
    textbooks: [
      {
        id: 'kaigo-textbook-jp-ne',
        title: 'MHLW Official Nursing Care Study Manual (Japanese - Nepali)',
        titleNe: 'स्वास्थ्य तथा कल्याण मन्त्रालय आधिकारिक काइगो अध्ययन म्यानुअल (नेपाली अनुवाद)',
        publisher: 'Ministry of Health, Labour and Welfare (MHLW / 厚生労働省)',
        language: 'Japanese + Nepali Dual',
        fileSize: '14.2 MB PDF',
        pdfUrl: 'https://www.mhlw.go.jp/content/12000000/000569769.pdf',
        description: 'Official textbook issued by Japan MHLW covering caregiving principles, body mechanics, and medical communication.',
        descriptionNe: 'जापान सरकार स्वास्थ्य मन्त्रालयद्वारा प्रकाशित आधिकारिक काइगो पाठ्यपुस्तक जसमा हेरचाह सिद्धान्त, शरीर मेकानिक्स र मेडिकल शब्दावली समेटिएको छ।',
        chapters: [
          'Chapter 1: Basics of Caregiving (介護の基本)',
          'Chapter 2: Structure of Mind and Body (心と体のしくみ)',
          'Chapter 3: Communication Skills (コミュニケーション技術)',
          'Chapter 4: Daily Life Assistance Techniques (生活支援技術)',
        ],
      },
      {
        id: 'kaigo-vocab-manual',
        title: 'Official Kaigo Japanese Terms & Phrases Manual',
        titleNe: 'काइगो जापानी शब्दभण्डार तथा अभिव्यक्ति म्यानुअल',
        publisher: 'Japan International Corporation Welfare Services (JICWELS)',
        language: 'Japanese + English',
        fileSize: '8.5 MB PDF',
        pdfUrl: 'https://www.mhlw.go.jp/content/12000000/000570535.pdf',
        description: 'Comprehensive guide to nursing home vocabulary, patient logs, shift reports, and emergency protocols.',
        descriptionNe: 'वृद्धाश्रममा प्रयोग हुने जापानी शब्दहरू, बिरामीको रिपोर्ट तयार पार्ने र संकटकालीन निर्देशनको विस्तृत गाइड।',
        chapters: [
          'Section 1: Vital Signs & Symptoms (バイタルサイン)',
          'Section 2: Wheelchair & Mobility Words (車椅子・移動)',
          'Section 3: Dining & Medication Assistance (食事・服薬)',
        ],
      },
    ],
    vocabList: [
      {
        id: 'k-v1',
        kanji: '体温計',
        kana: 'たいおんけい',
        romaji: 'taionkei',
        english: 'Thermometer',
        nepali: 'थर्मामिटर (ज्वरो नाप्ने यन्त्र)',
        category: 'Medical Equipment',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a731ef.mp3',
        exampleSentence: '体温計で熱を測りましょう。',
        exampleSentenceNe: 'थर्मामिटरले ताक्रम नापौं।',
      },
      {
        id: 'k-v2',
        kanji: '血圧計',
        kana: 'けつあつけい',
        romaji: 'ketsuatsukei',
        english: 'Blood pressure monitor',
        nepali: 'रक्तचाप (ब्लड प्रेसर) नाप्ने मेसिन',
        category: 'Medical Equipment',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a731ef.mp3',
        exampleSentence: '毎朝、血圧計で血圧をチェックします。',
        exampleSentenceNe: 'प्रत्येक बिहान ब्लड प्रेसर मेसिनले प्रेसर जाँच गरिन्छ।',
      },
      {
        id: 'k-v3',
        kanji: '車椅子',
        kana: 'くるまいす',
        romaji: 'kurumaisu',
        english: 'Wheelchair',
        nepali: 'ह्विलचेयर (चक्के कुर्सी)',
        category: 'Mobility Equipment',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a731ef.mp3',
        exampleSentence: '車椅子のブレーキをしっかりかけてください。',
        exampleSentenceNe: 'ह्विलचेयरको ब्रेक राम्रोसँग लगाउनुहोस्।',
      },
      {
        id: 'k-v4',
        kanji: '水分補給',
        kana: 'すいぶんほきゅう',
        romaji: 'suibun hokyuu',
        english: 'Hydration / Fluid intake',
        nepali: 'पानी/झोल पदार्थ खुवाउने',
        category: 'Daily Care',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a731ef.mp3',
        exampleSentence: '脱水症状を防ぐために水分補給が必要です。',
        exampleSentenceNe: 'जलवियोजन (Dehydration) रोक्न पानी/झोल खुवाउनु आवश्यक छ।',
      },
      {
        id: 'k-v5',
        kanji: '体位変換',
        kana: 'たいいへんかん',
        romaji: 'taii henkan',
        english: 'Position change (bedridden patient)',
        nepali: 'सुतेको बिरामीको कोल्टो फेराउने (शरीरको दिशा परिवर्तन)',
        category: 'Care Technique',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a731ef.mp3',
        exampleSentence: '2時間ごとに体位変換を行います。',
        exampleSentenceNe: 'प्रत्येक २ घण्टामा बिरामीको कोल्टो फेराइन्छ।',
      },
    ],
    listeningDrills: [
      {
        id: 'k-l1',
        title: 'Drill 1: Wheelchair Transfer Safety Instruction',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a731ef.mp3',
        duration: '0:45',
        transcriptJp: 'スタッフ：「田中さん、これからベッドから車椅子に移動しますね。足元にお気をつけください。ブレーキをかけましたので、ゆっくり立ち上がりましょう。」',
        transcriptEn: 'Staff: "Mr. Tanaka, we are moving from the bed to the wheelchair now. Please watch your feet. The brakes are locked, so let\'s stand up slowly."',
        transcriptNe: 'कर्मचारी: "तानाका ज्यू, अब हामी ओछ्यानबाट ह्विलचेयरमा सर्छौं। गोडामा ध्यान दिनुहोस्। ब्रेक लगाइएको छ, त्यसैले बिस्तारै उठौं।"',
        question: 'スタッフが車椅子に移動する前に確認したことは何ですか？ (What did the staff check before moving the patient to the wheelchair?)',
        questionNe: 'कर्मचारीले बिरामीलाई ह्विलचेयरमा सार्नुअघि के कुरा पक्का गरे?',
        options: [
          '体温計の温度 (Thermometer temperature)',
          '車椅子のブレーキ (Wheelchair brake status)',
          'テレビの電源 (TV power switch)',
          '窓の鍵 (Window lock)',
        ],
        correctAnswer: 1,
        explanation: 'The staff explicitly said "ブレーキをかけましたので" (Because I locked the brake). Checking wheelchair brakes is mandatory before patient transfers.',
        explanationNe: 'कर्मचारीले स्पष्टसँग "ब्रेक लगाइसकेको छु" भनेका छन्। ह्विलचेयरमा सार्नुअघि ब्रेक जाँच गर्नु अनिवार्य सुरक्षा नियम हो।',
      },
    ],
    practiceQuestions: [
      {
        id: 'k-q1',
        question: '高齢者の誤嚥（ごえん）を防ぐための適切な姿勢はどれですか？ (Which posture prevents choking in elderly patients during meals?)',
        questionNe: 'ज्येष्ठ नागरिकहरूलाई खाना खुवाउँदा स्वासप्रश्वास नलीमा खाना अड्किन (Choking) नदिन कुन बसाइ उपयुक्त हुन्छ?',
        options: [
          '体を完全に横にした姿勢 (Lying completely flat)',
          'あごを引き、上体を起こした姿勢 (Slightly tilted chin down, upper body raised 60-90°)',
          '首を後ろに反らした姿勢 (Tilting head backward)',
          'うつ伏せの姿勢 (Lying face down)',
        ],
        correctAnswer: 1,
        explanation: 'Tilting the chin slightly down and keeping the upper body upright (60-90°) prevents food from entering the trachea.',
        explanationNe: 'चिउँडोलाई अलिकति तल झुकाएर र माथिल्लो शरीरलाई ६० देखि ९० डिग्री सीधा राख्दा खाना सासमा अड्किने जोखिम कम हुन्छ।',
      },
    ],
  },

  building_cleaning: {
    id: 'building_cleaning',
    slug: 'building_cleaning',
    name: 'Building Cleaning (ビルクリーニング)',
    kanji: 'ビルクリーニング分野特定技能1号評価試験',
    icon: '🧹',
    badge: 'Prometric SSW-1 Building Cleaning',
    demand: 'Moderate to High',
    testDuration: '60 minutes',
    passScore: '60 / 100 Pts (60%)',
    prometricFee: 'NPR 1,000 / ~JPY 1,000',
    summary: 'Building Cleaning SSW tests knowledge of commercial cleaning machinery, chemical dilution, floor polishing, window safety, and sanitation protocols.',
    summaryNe: 'भवन सरसफाइ (Building Cleaning) परीक्षाले व्यावसायिक भवन सरसफाइ मेशिन, रसायन घोल मिश्रण, भुइँ पोलिस, झ्याल सरसफाइ सुरक्षा र स्वच्छता नियमहरूको ज्ञान मापन गर्दछ।',
    visaPath: 'SSW-1 (Up to 5 years) ➔ Prometric SSW-2 Exam ➔ Unlimited Visa Renewal.',
    textbooks: [
      {
        id: 'clean-textbook-official-bilingual',
        title: 'JBMA Official 12-Chapter SSW-1 Building Cleaning Book & Section Tests',
        titleNe: 'भवन सरसफाइ क्षेत्र विशेष सीप नं. १ मूल्याङ्कन परीक्षा — १२ अध्याय अध्ययन पुस्तिका तथा खण्ड-परीक्षाहरू',
        publisher: 'Japan Building Maintenance Association (JBMA) & LanguageGuru',
        language: 'Japanese + Nepali Full Dual',
        fileSize: 'Complete 12 Chapters + CBT Quizzes',
        pdfUrl: '/BuildingCleaningBookwithmodelqsn.docx',
        description: 'Complete official curriculum textbook with high-chance CBT judgment tests after each chapter, model exam, and full 41-term bilingual glossary.',
        descriptionNe: 'सुरक्षा, ५एस, मेसिन, रसायन घोल (एसिड/अल्कालाइन), भुइँ वाक्स, सिसा स्क्विजी, शौचालय क्रस-कन्टामिनेसन, होटेल ओछ्यान र होउ-रेन-सोउ समेटिएको पूर्ण अध्ययन गाइड।',
        chapters: [
          'Ch 1: SSW System & Field Overview (特定技能制度とビルクリーニング分野)',
          'Ch 2: Safety & Health Management Basics (安全衛生管理の基礎・5S)',
          'Ch 3: Fundamental Cleaning Principles (清掃の基本原則・三大原則)',
          'Ch 4: Cleaning Machinery & Equipment (清掃用機械・器具の知識)',
          'Ch 5: Detergents & Chemical Knowledge (洗剤・薬剤の知識・希釈)',
          'Ch 6: Floor Cleaning & Maintenance (床の清掃・大理石・ワックス剥離)',
          'Ch 7: Glass & Window Cleaning (ガラス面の清掃・スクイジー)',
          'Ch 8: Toilet & Restroom Sanitation (トイレ・洗面所の清掃・尿石)',
          'Ch 9: Hotel Guest Room & Bed Making (ホテル客室の清掃とベッドメイク)',
          'Ch 10: Waste Segregation & Safe Handling (廃棄物の分別と処理)',
          'Ch 11: Workplace Manners & Ho-Ren-So (職場のマナーとホウレンソウ)',
          'Ch 12: CBT Exam Structure & Strategy (評価試験の形式・合格戦略)',
        ],
      },
      {
        id: 'clean-textbook-official',
        title: 'Japan Building Maintenance Association Official Manual',
        titleNe: 'जापान बिल्डिङ मेन्टेनेन्स एसोसिएसन आधिकारिक सरसफाइ म्यानुअल',
        publisher: 'Japan Building Maintenance Association (JBMA)',
        language: 'Japanese + English',
        fileSize: '11.8 MB PDF',
        pdfUrl: 'https://www.jbmc.or.jp/pdf/ssw_textbook_cleaning.pdf',
        description: 'Official guidebook covering vacuum polishers, chemical safety data sheets (SDS), and floor waxing procedures.',
        descriptionNe: 'भ्याकुम पोलिस मेशिन, रासायनिक सुरक्षा डाटा शीट (SDS) र फ्लोर वाक्सिङ प्रक्रिया समेटिएको आधिकारिक म्यानुअल।',
        chapters: [
          'Module 1: Cleaning Tools & Equipment (清掃用具と機械)',
          'Module 2: Chemical Handling & Dilution (洗剤の知識と希釈)',
          'Module 3: Interior Floor & Window Cleaning (床・ガラス清掃)',
          'Module 4: Safety & Hazard Prevention (安全衛生管理)',
        ],
      },
    ],
    vocabList: [
      {
        id: 'bc-v1',
        kanji: '床みがき機（ポリッシャー）',
        kana: 'ぽりっしゃー',
        romaji: 'porisshaa',
        english: 'Floor Polishing Machine',
        nepali: 'भुइँ पोलिस गर्ने मेशिन (Polisher)',
        category: 'Cleaning Machinery',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a731ef.mp3',
        exampleSentence: 'ポリッシャーを使って床のワックスを剥離します。',
        exampleSentenceNe: 'पोलिसर मेशिन प्रयोग गरेर भुइँको पुरानो वाक्स उप्काइन्छ।',
      },
      {
        id: 'bc-v2',
        kanji: '希釈',
        kana: 'きしゃく',
        romaji: 'kishaku',
        english: 'Dilution (liquid detergent with water)',
        nepali: 'रसायन घोल मिसाउने (पानी र डिटर्जेन्टको अनुपात)',
        category: 'Chemical Safety',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a731ef.mp3',
        exampleSentence: '洗剤を50倍に希釈して使用してください。',
        exampleSentenceNe: 'डिटर्जेन्टलाई ५० गुणा पानीमा मिसाएर प्रयोग गर्नुहोस्।',
      },
      {
        id: 'bc-v3',
        kanji: '尿石',
        kana: 'にょうせき',
        romaji: 'nyouseki',
        english: 'Urine Scale / Stone (Alkaline Dirt)',
        nepali: 'पिसाबको कडा दाग (Urine Stone)',
        category: 'Sanitation',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a731ef.mp3',
        exampleSentence: '便器の尿石は酸性洗剤を使って除去します。',
        exampleSentenceNe: 'कमोडको पिसाबको दाग एसिडिक डिटर्जेन्ट प्रयोग गरी हटाइन्छ।',
      },
      {
        id: 'bc-v4',
        kanji: '交差汚染',
        kana: 'こうさおせん',
        romaji: 'kousa osen',
        english: 'Cross-Contamination',
        nepali: 'क्रस-कन्टामिनेसन (एक ठाउँको कीटाणु अर्कोमा सर्नु)',
        category: 'Hygiene & Safety',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a731ef.mp3',
        exampleSentence: '交差汚染を防ぐため、トイレ用雑巾と洗面台用雑巾を色分けします。',
        exampleSentenceNe: 'कीटाणु सर्न नदिन शौचालय र बेसिनको कपडा रंग छुट्याइन्छ।',
      },
      {
        id: 'bc-v5',
        kanji: 'スクイジー',
        kana: 'すくいじー',
        romaji: 'sukuijii',
        english: 'Window Squeegee',
        nepali: 'स्क्विजी (सिसाको पानी तान्ने रबर)',
        category: 'Cleaning Tools',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a731ef.mp3',
        exampleSentence: 'スクイジーを上から下へ動かして水分を切ります。',
        exampleSentenceNe: 'स्क्विजीलाई माथिबाट तल तानेर पानी हटाइन्छ।',
      },
    ],
    listeningDrills: [
      {
        id: 'bc-l1',
        title: 'Drill 1: Chemical Safety & Dilution Instruction',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a731ef.mp3',
        duration: '0:35',
        transcriptJp: 'リーダー：「この剥離剤（はくりざい）は強力なので、必ず保護メガネとゴム手袋を着用してください。原液のまま使ってはいけません。」',
        transcriptEn: 'Leader: "This wax stripper is strong, so be sure to wear protective goggles and rubber gloves. Never use it in concentrated form."',
        transcriptNe: 'लीडर: "यो वाक्स हटाउने रसायन धेरै कडा छ, त्यसैले अनिवार्य रूपमा सुरक्षा चश्मा र रबरको पन्जा लगाउनुहोस्। सिधै प्रयोग नगर्नुहोस्।"',
        question: '作業前に着用しなければならない保護具は何ですか？ (What protective gear must be worn before work?)',
        questionNe: 'काम सुरु गर्नुअघि कुन सुरक्षा सामग्री लगाउनुपर्छ?',
        options: [
          'ヘルメットと安全靴 (Helmet and safety boots)',
          '保護メガネとゴム手袋 (Protective goggles and rubber gloves)',
          '耳栓とマスク (Earplugs and face mask)',
          '防塵服 (Dustproof suit)',
        ],
        correctAnswer: 1,
        explanation: 'The leader instructed to wear protective goggles (保護メガネ) and rubber gloves (ゴム手袋) due to strong chemical concentration.',
        explanationNe: 'कडा रसायन भएकाले सुरक्षा चश्मा र रबरको पन्जा लगाउन लीदरले निर्देशन दिएका हुन्।',
      },
    ],
    practiceQuestions: [
      {
        id: 'bc-q1',
        question: '酸性洗剤と塩素系漂白剤を混ぜて使うとどうなりますか？ (What happens if acidic detergent and chlorine bleach are mixed?)',
        questionNe: 'एसिडिक डिटर्जेन्ट र क्लोरिन ब्लिच मिसाएर प्रयोग गरेमा के हुन्छ?',
        options: [
          '洗浄力が2倍になり早くきれいになる (Cleaning power doubles)',
          '有毒な塩素ガスが発生し極めて危険である (Generates lethal toxic chlorine gas)',
          '香りがよくなり除菌効果が高まる (Smells pleasant)',
          '中性になって安全な水になる (Becomes harmless neutral water)',
        ],
        correctAnswer: 1,
        explanation: 'Mixing acidic detergent with sodium hypochlorite / chlorine bleach creates toxic chlorine gas, which can be fatal. It is strictly prohibited.',
        explanationNe: 'एसिड र क्लोरिन रसायन मिसाउँदा अत्यधिक विषालु क्लोरिन ग्यास बन्छ, जसले ज्यानै लिन सक्छ। यो कडा निषेध छ।',
      },
      {
        id: 'bc-q2',
        question: '大理石の床を清掃する際、使用してはいけない洗剤はどれですか？ (Which cleaner must NEVER be used on marble floors?)',
        questionNe: 'मार्बलको भुइँ सफा गर्दा कुन डिटर्जेन्ट कहिल्यै प्रयोग गर्नुहुँदैन?',
        options: [
          '酸性洗剤 (Acidic detergent)',
          '中性洗剤 (Neutral detergent)',
          '専用光沢剤 (Marble polishing compound)',
          'きれいな水 (Plain water)',
        ],
        correctAnswer: 0,
        explanation: 'Marble contains calcium carbonate, which dissolves and loses its gloss when exposed to acids. Never use acidic cleaners on marble.',
        explanationNe: 'मार्बल क्याल्सियम कार्बोनेटले बनेको हुनाले एसिडले मार्बल पग्लिएर दाग बस्छ। त्यसैले एसिडिक डिटर्जेन्ट निषेध छ।',
      },
      {
        id: 'bc-q3',
        question: 'トイレの尿石（アルカリ性の汚れ）を除去するのに適した洗剤はどれですか？ (Which cleaner removes urine stones?)',
        questionNe: 'शौचालयको पिसाबको कडा दाग (Urine Stone) हटाउन कुन डिटर्जेन्ट उपयुक्त हुन्छ?',
        options: [
          'アルカリ性洗剤 (Alkaline detergent)',
          '酸性洗剤 (Acidic detergent)',
          '研磨剤のみ (Dry abrasive only)',
          'アルコールスプレー (Alcohol spray)',
        ],
        correctAnswer: 1,
        explanation: 'Urine scale is an alkaline inorganic deposit. Chemical neutralization requires an acidic cleaner.',
        explanationNe: 'पिसाबको दाग अल्कालाइन प्रकृतिको हुने भएकाले एसिडिक डिटर्जेन्टले रासायनिक प्रतिक्रिया गराई पगाल्नुपर्छ।',
      },
      {
        id: 'bc-q4',
        question: '清掃作業の基本原則として正しいものはどれですか？ (Which is the correct principle of cleaning order?)',
        questionNe: 'सरसफाइ कार्यको आधारभूत क्रम कुन सही हो?',
        options: [
          '下から上へ、手前から奥へ (From bottom to top, outside to inside)',
          '上から下へ、奥から手前へ (From top to bottom, inside to entrance)',
          '濡れた場所から乾いた場所へ (From wet areas to dry areas)',
          '出入口から部屋の中央へ (From doorway to room center)',
        ],
        correctAnswer: 1,
        explanation: 'Cleaning must proceed from top to bottom (so fallen dust is cleaned) and from inside to entrance (so clean areas are not trodden).',
        explanationNe: 'सफाइ सधैं माथिबाट तल र कोठाको भित्रबाट ढोकातिर गर्नुपर्छ ताकि सफा भएको ठाउँ फेरि फोहोर नहोस्।',
      },
    ],
  },

  construction: {
    id: 'construction',
    slug: 'construction',
    name: 'Construction (Kensetsu / 建設)',
    kanji: '建設分野特定技能1号評価試験',
    icon: '🏗️',
    badge: 'JAC Prometric SSW-1 Construction',
    demand: 'High (High Wages)',
    testDuration: '60 minutes',
    passScore: '60 / 100 Pts (60%)',
    prometricFee: 'NPR 1,000 / ~JPY 1,000',
    summary: 'Construction SSW tests site safety regulations, scaffolding installation, rebar/formwork terminology, heavy machinery signals, and hazard awareness (KYK).',
    summaryNe: 'निर्माण (Construction) परीक्षाले कार्यस्थल सुरक्षा नियम, फलामे खम्बा (Scaffolding), ढलान फर्मवर्किङ, क्रेन र हेभी मेशिन इसारा तथा hazard awareness (KYK) मापन गर्दछ।',
    visaPath: 'SSW-1 (5 Years) ➔ SSW-2 Exam (Permanent Working Visa in Japan with Family).',
    textbooks: [
      {
        id: 'construction-jac-manual',
        title: 'Japan Construction Skills Training Organization (JAC) Manual',
        titleNe: 'जापान कन्सट्रक्सन स्किल्स अर्गनाइजेसन (JAC) निर्माण अध्ययन म्यानुअल',
        publisher: 'Japan Construction Skills Training Organization (JAC)',
        language: 'Japanese + English + Nepali',
        fileSize: '18.4 MB PDF',
        pdfUrl: 'https://ksk-jac.or.jp/pdf/ssw_construction_textbook.pdf',
        description: 'Official construction handbook covering civil engineering, scaffold safety, tool signals, and fall protection gear.',
        descriptionNe: 'सिभिल इन्जिनियरिङ, स्काफोल्डिङ सुरक्षा, औजार इसारा र फराकिलो ठाउँमा खस्नबाट बच्ने Safety Harness सम्बन्धी आधिकारिक गाइड।',
        chapters: [
          'Chapter 1: Safety & Health Regulations (安全衛生)',
          'Chapter 2: Construction Tools & Equipment (建設工具・資材)',
          'Chapter 3: Scaffold & High-Altitude Work (足場・高所作業)',
          'Chapter 4: Hazard Prediction Activity (危険予知活動 KYK)',
        ],
      },
    ],
    vocabList: [
      {
        id: 'con-v1',
        kanji: '安全帯 / フルハーネス',
        kana: 'あんぜんたい / ふるはーねす',
        romaji: 'anzentai / kuru haanesu',
        english: 'Safety Harness / Fall Protection',
        nepali: 'सुरक्षा पेटी / फुल हार्नेस (Safety Harness)',
        category: 'Site Safety Equipment',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a731ef.mp3',
        exampleSentence: '2メートル以上の高所作業ではフルハーネスを着用します。',
        exampleSentenceNe: '२ मिटरभन्दा उच्च ठाउँमा काम गर्दा फुल हार्नेस सुरक्षा पेटी अनिवार्य लगाइन्छ।',
      },
      {
        id: 'con-v2',
        kanji: '足場',
        kana: 'あしば',
        romaji: 'ashiba',
        english: 'Scaffolding',
        nepali: 'काम गर्ने फलामे बास/खम्बा (Scaffolding)',
        category: 'Construction Material',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a731ef.mp3',
        exampleSentence: '足場の点検を行い、手すりのガタツキを確認します。',
        exampleSentenceNe: 'स्काफोल्डिङ जाँच गरी बार हल्लिएको छ कि छैन पक्का गरिन्छ।',
      },
      {
        id: 'con-v3',
        kanji: '指差呼称',
        kana: 'しさこしょう',
        romaji: 'shisa koshou',
        english: 'Pointing and Calling Safety Technique',
        nepali: 'औंलाले देखाएर ठूलो स्वरले सुरक्षा नाम भन्ने प्रविधि (Point & Call)',
        category: 'Safety Culture',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a731ef.mp3',
        exampleSentence: '「ヨシ！」と声を出しながら指差呼称を行います。',
        exampleSentenceNe: '"योशी!" (सबै ठिक छ!) भन्दै औंलाले देखाएर नाम भनिन्छ।',
      },
    ],
    listeningDrills: [
      {
        id: 'con-l1',
        title: 'Drill 1: Site Crane Operation & Clearance Warning',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a731ef.mp3',
        duration: '0:40',
        transcriptJp: '職長：「クレーンで鉄骨を吊り上げます！吊り荷の下には絶対に入らないでください！退避してください！」',
        transcriptEn: 'Foreman: "Lifting steel beams with the crane! Never step under suspended loads! Evacuate the area!"',
        transcriptNe: 'फोरम्यान: "क्रेनले फलामको बीम माथि उठाउँदैछ! झुण्ड्याइएको सामानमुनि झुक्केर पनि नछिर्नुहोस्! पछाडि हट्नुहोस्!"',
        question: '職長は作業員に何を命令しましたか？ (What did the foreman order the workers to do?)',
        questionNe: 'फोरम्यानले कामदारहरूलाई के निर्देशन दिए?',
        options: [
          '鉄骨をつかむこと (Hold the steel beams by hand)',
          '吊り荷の下から退避すること (Evacuate from under the suspended load)',
          'クレーンを運転すること (Operate the crane)',
          '写真を撮ること (Take photos)',
        ],
        correctAnswer: 1,
        explanation: 'The foreman warned workers never to go under suspended loads and to evacuate immediately.',
        explanationNe: 'क्रेनले सामान उठाउँदा मुनि नबस्न र तुरुन्तै सुरक्षित ठाउँमा सर्न निर्देशन दिइएको हो।',
      },
    ],
    practiceQuestions: [
      {
        id: 'con-q1',
        question: '建設現場での「KYK」とは何の略称ですか？ (What does KYK stand for in Japanese construction safety?)',
        questionNe: 'जापानी निर्माण कार्यस्थलमा "KYK" को पूर्ण रूप के हो?',
        options: [
          '危険予知活動 (Kiken Yochi Katsudou / Hazard Prediction Activity)',
          '計画環境管理 (Keikaku Kankyou Kanri)',
          '緊急用具確認 (Kinkyuu Yougu Kakunin)',
          '高所用具点検 (Kousho Yougu Tenken)',
        ],
        correctAnswer: 0,
        explanation: 'KYK stands for Kiken Yochi Katsudou (危険予知活動), a daily hazard prediction activity performed before work begins.',
        explanationNe: 'KYK को अर्थ "Kiken Yochi Katsudou" (जोखिम पूर्वानुमान गतिविधि) हो, जुन काम सुरु गर्नुअघि दैनिक रूपमा गरिन्छ।',
      },
    ],
  },

  food_service: {
    id: 'food_service',
    slug: 'food_service',
    name: 'Food Service (Gaishoku / 飲食)',
    kanji: '外食業特定技能1号技能測定試験',
    icon: '🍽️',
    badge: 'OTAFF Prometric SSW-1 Food Service',
    demand: 'High Demand',
    testDuration: '80 minutes',
    passScore: '60 / 100 Pts (60%)',
    prometricFee: 'NPR 1,000 / ~JPY 1,000',
    summary: 'Food Service SSW tests commercial kitchen food preparation, HACCP food hygiene management, customer service Japanese, and allergen handling.',
    summaryNe: 'रेस्टुरेन्ट तथा रेस्टुरेन्ट फुड सर्भिस (Gaishoku) परीक्षाले व्यावसायिक भान्छा तयारी, HACCP खाना सरसफाइ, ग्राहक सेवा जापानी भाषा र एलर्जेन व्यवस्थापन मापन गर्दछ।',
    visaPath: 'SSW-1 (Up to 5 years) ➔ Food Service Manager Upgrade.',
    textbooks: [
      {
        id: 'food-otaff-manual',
        title: 'OTAFF Food Service Industry Official Training Manual',
        titleNe: 'OTAFF फुड सर्भिस इन्डस्ट्री आधिकारिक अध्ययन म्यानुअल',
        publisher: 'Organization for Food Service Industry Training (OTAFF)',
        language: 'Japanese + English',
        fileSize: '13.5 MB PDF',
        pdfUrl: 'https://otaff.or.jp/pdf/ssw_food_service_textbook.pdf',
        description: 'Covers kitchen cooking hygiene, customer greeting phrases, tableware washing, and food poisoning prevention.',
        descriptionNe: 'भान्छा सरसफाइ, ग्राहक स्वागत बोली, भाँडाकुँडा धुने तरिका र खानाको विषाक्तता (Food Poisoning) रोक्ने उपायहरू।',
        chapters: [
          'Section 1: Food Hygiene & HACCP (衛生管理・HACCP)',
          'Section 2: Cooking & Food Preparation (調理仕込み)',
          'Section 3: Customer Service & Hospitality (接客サービス)',
        ],
      },
    ],
    vocabList: [
      {
        id: 'fs-v1',
        kanji: '食中毒',
        kana: 'しょくちゅうどく',
        romaji: 'shokuchuudoku',
        english: 'Food Poisoning',
        nepali: 'खानाको विषाक्तता (Food Poisoning)',
        category: 'Food Safety',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a731ef.mp3',
        exampleSentence: '食中毒予防の三原則は「つけない・ふやさない・やっつける」です。',
        exampleSentenceNe: 'फूड पोइजनिङ रोक्ने ३ नियम हुन्: नसार्ने, बढ्न नदिने र नष्ट गर्ने।',
      },
      {
        id: 'fs-v2',
        kanji: 'アレルゲン',
        kana: 'あれるげん',
        romaji: 'arerugen',
        english: 'Allergens (Peanuts, Eggs, Milk, etc.)',
        nepali: 'खानाको एलर्जी गराउने तत्त्व (Allergens)',
        category: 'Customer Health',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a731ef.mp3',
        exampleSentence: 'アレルギー物質を含む食材の管理を確認します。',
        exampleSentenceNe: 'एलर्जी गराउने सामग्रीको भण्डारण ध्यानपूर्वक जाँच गरिन्छ।',
      },
    ],
    listeningDrills: [
      {
        id: 'fs-l1',
        title: 'Drill 1: Restaurant Customer Order & Allergen Inquiry',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a731ef.mp3',
        duration: '0:30',
        transcriptJp: '店員：「いらっしゃいませ！ご注文はお決まりですか？」客：「卵アレルギーなのですが、このスープに卵は入っていますか？」店員：「少々お待ちください。厨房に確認してまいります。」',
        transcriptEn: 'Staff: "Welcome! Are you ready to order?" Customer: "I have an egg allergy. Does this soup contain egg?" Staff: "Please wait a moment. I will check with the kitchen."',
        transcriptNe: 'कर्मचारी: "स्वागत छ! अर्डर तय भयो?" ग्राहक: "मलाई अण्डाको एलर्जी छ, यो सूपमा अण्डा छ?" कर्मचारी: "एकैछिन पर्खनुहोस्, म भान्छामा सोधेर आउँछु।"',
        question: '店員はこの後何をしますか？ (What will the staff do next?)',
        questionNe: 'कर्मचारीले अब के गर्छन्?',
        options: [
          'すぐにスープを運ぶ (Bring the soup immediately)',
          '厨房に卵の使用状況を確認する (Check egg ingredients with the kitchen)',
          'お会計をする (Process the bill)',
          'メニューを片付ける (Clear the menu)',
        ],
        correctAnswer: 1,
        explanation: 'The staff stated they will check with the kitchen regarding egg content for the customer\'s allergy.',
        explanationNe: 'ग्राहकको अण्डा एलर्जी भएकाले कर्मचारीले भान्छामा सोध्न जाने कुरा भनेका छन्।',
      },
    ],
    practiceQuestions: [
      {
        id: 'fs-q1',
        question: '加熱調理時のノロウイルス殺菌に必要な温度と時間はどれですか？ (What temperature and time are required to kill Norovirus during cooking?)',
        questionNe: 'पाकाउने क्रममा नोरोभाइरस नष्ट गर्न कति तापक्रम र कति समय तताउनुपर्छ?',
        options: [
          '中心温度85℃〜90℃で90秒以上 (Core temp 85℃–90℃ for 90+ seconds)',
          '中心温度60℃で10秒 (Core temp 60℃ for 10 seconds)',
          '中心温度100℃で1秒 (Core temp 100℃ for 1 second)',
          '加熱は不要 (No heating required)',
        ],
        correctAnswer: 0,
        explanation: 'Norovirus requires heating the center of the food to 85°C to 90°C for at least 90 seconds.',
        explanationNe: 'नोरोभाइरस मार्न खानाको मध्य भाग ८५°C देखि ९०°C मा कम्तीमा ९० सेकेन्ड तताउनु अनिवार्य हुन्छ।',
      },
    ],
  },

  agriculture: {
    id: 'agriculture',
    slug: 'agriculture',
    name: 'Agriculture (Nougyou / 農業)',
    kanji: '農業技能測定試験',
    icon: '🌾',
    badge: 'JA Prometric SSW-1 Agriculture',
    demand: 'High Demand',
    testDuration: '60 minutes',
    passScore: '60 / 100 Pts (60%)',
    prometricFee: 'NPR 1,000 / ~JPY 1,000',
    summary: 'Agriculture SSW tests crop cultivation, greenhouse management, tractor/machinery safety, livestock farming, and produce sorting.',
    summaryNe: 'कृषि (Agriculture) परीक्षाले तरकारी तथा फलफूल खेती, हरितगृह (Greenhouse), ट्र्याक्टर मेशिन सुरक्षा, पशुपालन र फलफूल ग्रेडिङ/प्याकिङ मापन गर्दछ।',
    visaPath: 'SSW-1 (Up to 5 years) ➔ Agricultural Specialist.',
    textbooks: [
      {
        id: 'agri-ja-manual',
        title: 'Japan National Agriculture Training Manual',
        titleNe: 'जापान राष्ट्रिय कृषि संघ आधिकारिक अध्ययन म्यानुअल',
        publisher: 'Japan National Agricultural Co-operative (JA)',
        language: 'Japanese + English + Nepali',
        fileSize: '15.1 MB PDF',
        pdfUrl: 'https://www.nca.or.jp/pdf/ssw_agriculture_textbook.pdf',
        description: 'Covers general crop farming, livestock management, pesticide application rules, and tractor safety.',
        descriptionNe: 'तरकारी खेती, गाईवस्तु पालन, कीटनाशक औषधि प्रयोग नियम र ट्र्याक्टर चलाउने सुरक्षा नियमहरू।',
        chapters: [
          'Module 1: General Crop Cultivation (耕種農業)',
          'Module 2: Livestock Management (畜産農業)',
          'Module 3: Agricultural Machinery & Safety (農業機械・安全作業)',
        ],
      },
    ],
    vocabList: [
      {
        id: 'ag-v1',
        kanji: '農薬',
        kana: 'のうやく',
        romaji: 'nouyaku',
        english: 'Pesticide / Agricultural chemicals',
        nepali: 'कीटनाशक औषधि (Pesticide)',
        category: 'Crop Care',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a731ef.mp3',
        exampleSentence: '農薬の散布時はマスクと長袖を着用します。',
        exampleSentenceNe: 'कीटनाशक छर्कँदा मास्क र लामो बाहुला भएको कपडा लगाइन्छ।',
      },
      {
        id: 'ag-v2',
        kanji: 'ビニールハウス',
        kana: 'びにーるはうす',
        romaji: 'biniiru hausu',
        english: 'Greenhouse / Vinyl house',
        nepali: 'प्लास्टिक टनेल / हरितगृह (Greenhouse)',
        category: 'Farming Facility',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a731ef.mp3',
        exampleSentence: 'ビニールハウス内の温度換気を行ってください。',
        exampleSentenceNe: 'ग्रीनहाउस भित्रको हावा र तापक्रम मिलाउनुहोस्।',
      },
    ],
    listeningDrills: [
      {
        id: 'ag-l1',
        title: 'Drill 1: Tractor Safety & Slope Operation Warning',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a731ef.mp3',
        duration: '0:30',
        transcriptJp: '農長：「傾斜地（けいしゃち）でトラクターを運転するときは、低速ギアに入れて転倒に注意してください。」',
        transcriptEn: 'Farm Head: "When driving the tractor on a slope, switch to low gear and watch out for rollovers."',
        transcriptNe: 'फार्म प्रमुख: "उकालो वा ढलान ठाउँमा ट्र्याक्टर चलाउँदा कम गियरमा राखेर पल्टिनबाट जोगिनुहोस्।"',
        question: '斜面でトラクターを運転する際の注意事項は何ですか？ (What is the warning for tractor driving on slopes?)',
        questionNe: 'उकालो ठाउँमा ट्र्याक्टर चलाउँदा के ध्यान दिनुपर्छ?',
        options: [
          '高速ギアで走る (Drive at high speed)',
          '低速ギアに入れて転倒を防ぐ (Use low gear to prevent rollover)',
          'エンジンを切る (Turn off engine)',
          'ライトを消す (Turn off lights)',
        ],
        correctAnswer: 1,
        explanation: 'Low gear must be engaged on slopes to maintain traction and prevent dangerous tractor rollovers.',
        explanationNe: 'ढलान ठाउँमा ट्र्याक्टर पल्टिन नदिन होसियार भई तल्लो गियर (Low gear) प्रयोग गर्नुपर्छ।',
      },
    ],
    practiceQuestions: [
      {
        id: 'ag-q1',
        question: '野菜の収穫後、品質を保つために行う作業はどれですか？ (What operation preserves vegetable quality right after harvesting?)',
        questionNe: 'तरकारी टिपिसकेपछि गुणस्तर जोगाउन तुरुन्तै के गरिन्छ?',
        options: [
          '予冷（よれい）作業 (Pre-cooling operation)',
          '日光に当てる (Expose to direct hot sun)',
          '高温で乾燥させる (High temp drying)',
          'そのまま放置する (Leave unattended)',
        ],
        correctAnswer: 0,
        explanation: 'Pre-cooling (予冷) lowers field heat immediately after harvest to preserve fresh produce shelf life.',
        explanationNe: 'तरकारी टिपिसकेपछि तुरुन्तै सेलाउने (Pre-cooling) गर्नाले ताजापन लामो समयसम्म रहन्छ।',
      },
    ],
  },
};
