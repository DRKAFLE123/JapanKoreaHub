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

export interface SSWInterviewQuestion {
  id: string;
  category: string;
  categoryNe: string;
  questionJp: string;
  questionRomaji: string;
  questionEn: string;
  questionNe: string;
  modelAnswerJp: string;
  modelAnswerRomaji: string;
  modelAnswerEn: string;
  modelAnswerNe: string;
  trapWarning: string;
  trapWarningNe: string;
  tip: string;
  tipNe: string;
  keyPhrases: string[];
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
  listeningDrills?: SSWListeningDrill[];
  interviewPractice: SSWInterviewQuestion[];
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
    interviewPractice: [
      {
        "id": "kaigo-int-1",
        "category": "Self Introduction & Demeanor",
        "categoryNe": "आत्मपरिचय र अभिवादन",
        "questionJp": "自己紹介をお願いします。 (Jikoshoukai o onegai shimasu.)",
        "questionRomaji": "Jikoshoukai o onegai shimasu.",
        "questionEn": "Please introduce yourself.",
        "questionNe": "कृपया आफ्नो परिचय दिनुहोस्।",
        "modelAnswerJp": "はじめまして。ネパールから参りました〇〇と申します。年齢は〇〇歳です。専門分野の介護技能評価試験とJFT-Basic（日本語基礎テスト）に合格いたしました。母国でも家族や高齢者の世話をしており、人と温かく接することが大好きです。利用者様の安全と笑顔を第一に考え、誠心誠意働きます。どうぞよろしくお願いいたします。",
        "modelAnswerRomaji": "Hajimemashite. Nepaaru kara mairimashita [Namae] to moushimasu. Nenrei wa [Nenrei]-sai desu. Senmon bunya no kaigo ginou hyouka shiken to JFT-Basic ni goukaku itashimashita. Bokoku demo kazoku ya koureisha no sewa o shite ori, hito to atatakaku sessuru koto ga daisuki desu. Riyousha-sama no anzen to egao o daiichi ni kangae, seishin-seii hatarakimasu. Douzo yoroshiku onegai itashimasu.",
        "modelAnswerEn": "Nice to meet you. My name is [Name] from Nepal. I am [Age] years old. I have passed the SSW Caregiving Skill Evaluation Test and JFT-Basic. In Nepal, I took care of family and elders, and I love interacting warmly with people. I will prioritize residents' safety and smiles and work with utmost sincerity. Thank you very much.",
        "modelAnswerNe": "नमस्ते। मेरो नाम [नाम] हो, म नेपालबाट आएको हुँ। मेरो उमेर [उमेर] वर्ष भयो। मैले काइगो सीप मूल्याङ्कन परीक्षा र JFT-Basic उत्तीर्ण गरेको छु। नेपालमा पनि परिवारका ज्येष्ठ नागरिकहरूको स्याहार गरेको अनुभव छ र मानिसहरूसँग आत्मीय सम्बन्ध राख्न मन पर्छ। म ज्येष्ठ नागरिकहरूको सुरक्षा र मुस्कानलाई पहिलो प्राथमिकता दिएर इमानदारीपूर्वक काम गर्नेछु। धन्यवाद।",
        "trapWarning": "Never sound monotone or gloomy. Smile gently, make clear eye contact, and end with a confident bow.",
        "trapWarningNe": "अनुहार निन्याउरो नपार्नुहोस्। हल्का मुस्कानका साथ क्यामेरामा हेरेर प्रस्ट आवाजमा बोल्नुहोस् र अन्त्यमा शिर निहुराएर अभिवादन गर्नुहोस्।",
        "tip": "Speak within 45–60 seconds. Highlight your warmth and readiness for elderly care.",
        "tipNe": "४५ देखि ६० सेकेन्डभित्र आफ्नो परिचय सक्नुहोस्। सेवाभाव र आदरार्थी भाषा (Keigo) प्रयोग गर्नुहोस्।",
        "keyPhrases": [
          "はじめまして",
          "〇〇と申します",
          "一生懸命働きます",
          "よろしくお願いいたします"
        ]
      },
      {
        "id": "kaigo-int-2",
        "category": "Motivation for Eldercare in Japan",
        "categoryNe": "जापानमा काइगो रोज्नुको कारण",
        "questionJp": "なぜ日本の介護の仕事を選びましたか？ (Naze Nihon no kaigo no shigoto o erabimashita ka?)",
        "questionRomaji": "Naze Nihon no kaigo no shigoto o erabimashita ka?",
        "questionEn": "Why did you choose eldercare in Japan?",
        "questionNe": "तपाईंले जापानमा काइगो (ज्येष्ठ नागरिक स्याहार) काम किन रोज्नुभयो?",
        "modelAnswerJp": "日本は世界で最も高齢化が進んでおり、最先端の科学的介護技術や尊厳を守るホスピタリティがあります。私は単に作業としての介護ではなく、利用者様一人ひとりの「その人らしい生き方」を支える日本の介護理念に深く感動しました。将来は介護福祉士の国家資格取得を目指し、一生の仕事として誇りを持って取り組みたいです。",
        "modelAnswerRomaji": "Nihon wa sekai de mottomo koureika ga susunde ori, saisentan no kagakuteki kaigo gijutsu ya songen o mamoru hosupitariti ga arimasu. Watashi wa tan ni sagyou to shite no kaigo dewa naku, riyousha-sama hitori-hitori no \"sono hito rashii ikikata\" o sasaeru Nihon no kaigo rinen ni fukaku kandou shimashita. Shourai wa kaigo fukushishi no kokka shikaku shutoku o mezashi, isshou no shigoto to shite hokori o motte torikumitai desu.",
        "modelAnswerEn": "Japan has the world's most advanced eldercare, with scientific techniques and deep respect for human dignity. Rather than viewing it merely as physical labor, I am inspired by the philosophy of supporting each resident to live with pride. I aim to achieve the national Certified Care Worker license and build a lifelong professional career.",
        "modelAnswerNe": "जापान विश्वमै ज्येष्ठ नागरिक स्याहार प्रविधि र मानवीय मर्यादा (Dignity) रक्षा गर्ने क्षेत्रमा सबैभन्दा अगाडि छ। बिरामीको आत्मसम्मान जोगाउँदै व्यक्तिगत रूपमा सहयोग गर्ने जापानी काइगो सिद्धान्तबाट म प्रभावित भएको छु। भविष्यमा राष्ट्रिय लाइसेन्स (Kaigo Fukushishi) प्राप्त गरी दीर्घकालीन रूपमा यसै क्षेत्रमा समर्पित हुन चाहन्छु।",
        "trapWarning": "Never say \"Because Japan has high salaries\" or \"Because it was easy to get a visa\". Focus purely on your respect for the profession.",
        "trapWarningNe": "\"तलब धेरै छ\" वा \"सजिलै भिसा पाइन्छ\" कहिल्यै नभन्नुहोस्। जापानी काइगो प्रविधि र ज्येष्ठ नागरिकप्रतिको सम्मानमा जोड दिनुहोस्।",
        "tip": "Mention the Kaigo Fukushishi national qualification as your long-term goal. Japanese care facility directors love to hire candidates with genuine career dedication.",
        "tipNe": "दीर्घकालीन रूपमा राष्ट्रिय लाइसेन्स (Kaigo Fukushishi) लिने लक्ष्य उल्लेख गर्दा अन्तर्वार्ताकार धेरै सकारात्मक हुन्छन्।",
        "keyPhrases": [
          "尊厳を守る",
          "科学的介護",
          "介護福祉士を目指します"
        ]
      },
      {
        "id": "kaigo-int-3",
        "category": "Physical Stamina & Shift Work",
        "categoryNe": "शारीरिक क्षमता, नाइट सिफ्ट र सरसफाइ",
        "questionJp": "夜勤や排泄介助（オムツ交換）など大変な業務もありますが、大丈夫ですか？ (Yakin ya haisetsu kaijo nado taihen na gyoumu mo arimasu ga, daijoubu desu ka?)",
        "questionRomaji": "Yakin ya haisetsu kaijo nado taihen na gyoumu mo arimasu ga, daijoubu desu ka?",
        "questionEn": "Are you prepared for night shifts, physical transfers, and excretion assistance (diaper changing)?",
        "questionNe": "नाइट सिफ्ट, बिरामी उचाल्ने र दिसा-पिसाब सफा गर्ने (डायपर फेर्ने) जस्ता गाह्रो कामहरू गर्न सक्नुहुन्छ?",
        "modelAnswerJp": "はい、全く問題ございません。排泄介助や入浴介助は利用者様の健康維持と尊厳のために欠かせない最も大切なケアであると十分に理解しております。また、母国でもスポーツを続けており体力や健康管理には自信があります。夜勤についても規則正しい生活リズムを作り、体調を崩さないよう自己管理を徹底いたします。",
        "modelAnswerRomaji": "Hai, mattaku mondai gozaimasen. Haisetsu kaijo ya nyuuyoku kaijo wa riyousha-sama no kenkou iji to songen no tame ni kakasenai mottomo taisetsu na kea de aru to juubun ni rikai shite orimasu. Mata, bokoku demo supootsu o tsuzukete ori tairyoku ya kenkou kanri ni wa jishin ga arimasu. Yakin ni tsuite mo kisoku tadashii seikatsu rizumu o tsukuri, taichou o kuzusanai you jiko kanri o tettei itashimasu.",
        "modelAnswerEn": "Yes, no problem at all. I fully understand that diaper assistance and bathing are fundamental care duties essential for the health and dignity of residents. I maintain strong physical fitness and play sports. For night shifts, I maintain strict self-discipline and sleeping schedules to stay in peak health.",
        "modelAnswerNe": "हजुर, म पूर्ण रूपमा तयार छु र कुनै समस्या छैन। दिसा-पिसाब सहायता र नुहाइदिने काम ज्येष्ठ नागरिकको स्वास्थ्य र मर्यादाको लागि सबैभन्दा महत्त्वपूर्ण सेवा हो भन्ने मैले बुझेको छु। म नियमित व्यायाम गर्ने भएकाले मेरो शारीरिक स्वास्थ्य राम्रो छ। नाइट सिफ्टमा पनि आफ्नो तालिका व्यवस्थापन गरी पूर्ण जिम्मेवारीसाथ काम गर्नेछु।",
        "trapWarning": "Do not hesitate or show disgust about bodily fluids. Employers test whether you will complain or quit after arriving in Japan.",
        "trapWarningNe": "हिचकिचाउने वा घिन मान्ने संकेत नदेखाउनुहोस्। यो कामको अभिन्न अङ्ग हो भन्ने आत्मविश्वास देखाउनुहोस्।",
        "tip": "Use positive expressions like \"尊厳のために欠かせない大切なケア\" (vital care for human dignity).",
        "tipNe": "कामलाई पवित्र सेवाको रूपमा व्याख्या गर्नुहोस् र शारीरिक तन्दुरुस्तीको प्रमाण दिनुहोस्।",
        "keyPhrases": [
          "全く問題ございません",
          "体力には自信があります",
          "体調管理を徹底します"
        ]
      },
      {
        "id": "kaigo-int-4",
        "category": "Handling Difficult Situations & Dementia",
        "categoryNe": "रिसाहा बिरामी वा डिमेन्सियाको व्यवस्थापन",
        "questionJp": "認知症の利用者様から怒鳴られたり、介助を拒否された場合、どう対応しますか？ (Ninshishou no riyousha-sama kara donararetari, kaijo o kyohi sareta baai, dou taiou shimasu ka?)",
        "questionRomaji": "Ninshishou no riyousha-sama kara donararetari, kaijo o kyohi sareta baai, dou taiou shimasu ka?",
        "questionEn": "How will you respond if a dementia patient yells at you or refuses care?",
        "questionNe": "डिमेन्सिया (बिर्सने रोग) भएका बिरामी रिसाएमा वा सहयोग लिन नमानेमा कसरी सम्हाल्नुहुन्छ?",
        "modelAnswerJp": "決して感情的にならず、まずは落ち着いて笑顔で傾聴いたします。怒りや拒否には必ず不安や痛みなどの理由がありますので、無理強いはせず一度距離を置き、気持ちが落ち着かれてから優しい言葉でお声がけします。また、一人で抱え込まず、必ず先輩スタッフや看護師にホウ・レン・ソウ（報告・連絡・相談）して対応いたします。",
        "modelAnswerRomaji": "Kesshite kanjouteki ni narazu, mazu wa ochitsuite egao de keichou itashimasu. Ikari ya kyohi ni wa kanarazu fuan ya itami nado no riyuu ga arimasu node, muriji wa sezu ichido kyori o oki, kimochi ga ochitsukarete kara yasashii kotoba de okoegake shimasu. Mata, hitori de kakaekomazu, kanarazu senpai sutaffu ya kangoshi ni Hou-Ren-Sou shite taiou itashimasu.",
        "modelAnswerEn": "I will never become emotional. I will remain calm, smile, and listen attentively. Refusal or anger usually stems from pain, fear, or anxiety, so I will never force them. I will give them space, then re-approach gently. Crucially, I will report and consult (Hō-Ren-Sō) with senior staff and nurses.",
        "modelAnswerNe": "म कहिल्यै रिसाउने वा आवेगमा आउने छैन। शान्त रहेर उहाँको कुरा सुन्नेछु। बिरामी रिसाउनुको पछाडि दुखाइ वा डर हुन सक्छ, त्यसैले जबर्जस्ती नगरी एकछिन पछि फेरि मायालु स्वरमा आग्रह गर्नेछु। साथै एक्लै निर्णय नगरी सिनियर कर्मचारी र नर्सलाई तुरुन्तै रिपोर्ट (Hō-Ren-Sō) गर्नेछु।",
        "trapWarning": "Never say \"I will scold them\" or \"I will force them to obey\". That is considered elder abuse in Japan.",
        "trapWarningNe": "बिरामीलाई हप्काउने वा जबर्जस्ती गर्ने कुरा कहिल्यै नगर्नुहोस्। जापानमा यसलाई गम्भीर दुर्व्यवहार मानिन्छ।",
        "tip": "Always mention \"傾聴\" (Keichou - active empathetic listening) and \"ホウ・レン・ソウ\" (Hō-Ren-Sō reporting).",
        "tipNe": "सधैं होउ-रेन-सोउ (रिपोर्टिङ) र मायालु सुनाइको नियम सम्झनुहोस्।",
        "keyPhrases": [
          "感情的になりません",
          "笑顔で傾聴します",
          "ホウレンソウを行います"
        ]
      }
    ],
    practiceQuestions: [
      {
        id: 'k-q1',
        question: '高齢者の誤嚕（ごえん）を防ぐための適切な姿勢はどれですか？ (Which posture prevents choking in elderly patients during meals?)',
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

  'building-cleaning': {
    id: 'building-cleaning',
    slug: 'building-cleaning',
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
        descriptionNe: 'भ्याकुम पोलिस मेशिन, रासायनिक सुरक्षा डाटा शीट (SDS) र फ्लोर वाक्सिङ प्रक्रिया समेटिएको आधिकारिक म्यानुअल。',
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
        exampleSentenceNe: 'स्क्विजीलाई माथिबाट तल तानेर पानी हटाइन्छ。',
      },
    ],
    interviewPractice: [
      {
        "id": "clean-int-1",
        "category": "Self Introduction & Reason for Sector",
        "categoryNe": "आत्मपरिचय र सरसफाइ क्षेत्र रोज्नुको कारण",
        "questionJp": "自己紹介と、ビルクリーニングの仕事を選んだ理由を教えてください。 (Jikoshoukai to, biru kuriiningu no shigoto o eranda riyuu o oshiete kudasai.)",
        "questionRomaji": "Jikoshoukai to, biru kuriiningu no shigoto o eranda riyuu o oshiete kudasai.",
        "questionEn": "Please introduce yourself and explain why you chose building cleaning.",
        "questionNe": "आफ्नो परिचय दिनुहोस् र भवन सरसफाइ (Building Cleaning) काम किन रोज्नुभयो?",
        "modelAnswerJp": "はじめまして。ネパール出身の〇〇と申します。年齢は〇〇歳です。ビルクリーニング特定技能試験とJFT-Basicに合格いたしました。私は身の回りを清潔に整理整頓することが得意で、日本の徹底した5S活動（整理・整頓・清掃・清潔・躾）に深く共感しています。施設を利用する多くの方々に快適で安全な環境を提供できるこの仕事に大きな誇りを感じています。一生懸命頑張ります。よろしくお願いいたします。",
        "modelAnswerRomaji": "Hajimemashite. Nepaaru shusshin no [Namae] to moushimasu. Nenrei wa [Nenrei]-sai desu. Biru kuriiningu tokutei ginou shiken to JFT-Basic ni goukaku itashimashita. Watashi wa mi no mawari o seiketsu ni seiri-seiton suru koto ga tokui de, Nihon no tettei shita go-esu katsudou ni fukaku kyoukan shite imasu. Shisetsu o riyou suru ooku no katagata ni kaiteki de anzen na kankyou o teikyou dekiru kono shigoto ni ookina hokori o kanjite imasu. Isshoukenmei gambarimasu. Yoroshiku onegai itashimasu.",
        "modelAnswerEn": "Nice to meet you. I am [Name] from Nepal, [Age] years old. I passed the SSW-1 Building Cleaning Skill Exam and JFT-Basic. I take pride in cleanliness and deeply admire Japan's 5S methodology. Providing a clean, sanitized, and pleasant environment to thousands of building visitors gives me genuine pride. I will work with high dedication.",
        "modelAnswerNe": "नमस्ते। मेरो नाम [नाम] हो, म नेपालबाट आएको हुँ। उमेर [उमेर] वर्ष। मैले बिल्डिङ क्लिनिङ विशेष सीप परीक्षा र JFT-Basic पास गरेको छु। मलाई वरिपरिको वातावरण सफा र चिटिक्क राख्न धेरै मन पर्छ र जापानको ५एस (5S) प्रणाली मलाई धेरै मन पर्छ। भवन प्रयोग गर्ने मानिसहरूलाई स्वच्छ र सुरक्षित वातावरण दिन पाउनु मेरो लागि गौरवको कुरा हो। म कडा परिश्रम गर्नेछु।",
        "trapWarning": "Do not demean cleaning as simple work. In Japan, facility sanitation is regarded as a respected, technical profession.",
        "trapWarningNe": "सरसफाइलाई कहिल्यै सामान्य वा सानो काम नभन्नुहोस्। जापानमा यसलाई उच्च प्राविधिक र सम्मानित पेसा मानिन्छ।",
        "tip": "Mention 5S (Seiri, Seiton, Seisou, Seiketsu, Shitsuke) to prove your professional training.",
        "tipNe": "५एस (5S) को महत्व उल्लेख गर्दा अन्तर्वार्ताकार धेरै प्रभावित हुन्छन्।",
        "keyPhrases": [
          "整理整頓",
          "日本の5S活動",
          "誇りを持って働きます"
        ]
      },
      {
        "id": "clean-int-2",
        "category": "Chemical Dilution & Material Safety",
        "categoryNe": "रसायन घोल सुरक्षा र सामग्रीको संरक्षण",
        "questionJp": "洗剤の希釈（薄め方）や、大理石に酸性洗剤を使ってはいけない理由を理解していますか？ (Senzai no kishaku ya, daiseki ni sansei senzai o tsukatte wa ikenai riyuu o rikai shite imasu ka?)",
        "questionRomaji": "Senzai no kishaku ya, daiseki ni sansei senzai o tsukatte wa ikenai riyuu o rikai shite imasu ka?",
        "questionEn": "Do you understand chemical dilution rules and why acid detergents must never touch marble floors?",
        "questionNe": "रसायन घोल मिसाउने नियम र मार्बलको भुइँमा एसिडिक (अम्लीय) केमिकल किन हाल्न हुँदैन भन्ने थाहा छ?",
        "modelAnswerJp": "はい、しっかりと理解しております。洗剤は必ず指定された倍率通りに水で希釈し、目分量では絶対に使用いたしません。保護メガネと手袋の着用も徹底します。また、大理石は炭酸カルシウムが主成分であるため、酸性洗剤が付着すると化学反応で表面が溶けて艶が失われてしまいます。そのため大理石には必ず中性洗剤を使用いたします。",
        "modelAnswerRomaji": "Hai, shikkitato rikai shite orimasu. Senzai wa kanarazu shitei sareta bairitsu doori ni mizu de kishaku shi, mebunryou dewa zettai ni shiyou itashimasen. Hogo megane to tebukuro no chakuyou mo tettei shimasu. Mata, daiseki wa tansan karushiumu ga shuseibun de aru tame, sansei senzai ga fuchaku suru to kagaku hannou de hyoumen ga tokete tsuya ga ushinawarete shimaimasu. Sono tame daiseki ni wa kanarazu chuusei senzai o shiyou itashimasu.",
        "modelAnswerEn": "Yes, I understand completely. Detergents must always be diluted accurately with measuring cups, never estimated by eye. Goggles and gloves are mandatory. Marble consists primarily of calcium carbonate, which chemically dissolves and loses its shine if exposed to acid. Therefore, only neutral detergent must be used on marble.",
        "modelAnswerNe": "हजुर, मलाई राम्रोसँग थाहा छ। केमिकललाई सधैं तोकिएको अनुपातमा मात्र पानीसँग मिसाउनुपर्छ र कहिल्यै अन्दाजको भरमा हाल्नु हुँदैन। सुरक्षा चश्मा र पन्जा अनिवार्य लगाउनुपर्छ। मार्बल क्याल्सियम कार्बोनेटबाट बन्ने भएकाले एसिड पर्दा पग्लिएर चमक हराउँछ, त्यसैले मार्बलमा सधैं तटस्थ (Neutral / Chusei) केमिकल मात्र प्रयोग गरिन्छ।",
        "trapWarning": "If you fail this technical question, the employer will suspect you memorized answers without studying the textbook.",
        "trapWarningNe": "यस प्राविधिक प्रश्नको गलत उत्तर दिएमा अन्तर्वार्ताकारले तपाईंसँग सीप ज्ञान नभएको ठहर गर्छन्।",
        "tip": "Show that safety compliance (goggles, gloves) and exact dilution ratios are second nature to you.",
        "tipNe": "चश्मा, पन्जा र तटस्थ रसायन (Neutral Detergent) को स्पष्ट जवाफ दिनुहोस्।",
        "keyPhrases": [
          "倍率通りに希釈",
          "保護具の着用",
          "大理石には中性洗剤"
        ]
      },
      {
        "id": "clean-int-3",
        "category": "Handling Mistakes & Property Damage",
        "categoryNe": "गल्ती भएमा वा सामान फुटेमा होउ-रेन-सोउ",
        "questionJp": "清掃中に備品を破損させたり、異常を発見した場合はどうしますか？ (Seisou-chuu ni bihin o hason sasetari, ijou o hakken shita baai wa dou shimasu ka?)",
        "questionRomaji": "Seisou-chuu ni bihin o hason sasetari, ijou o hakken shita baai wa dou shimasu ka?",
        "questionEn": "What will you do if you break an item or discover a hazard while cleaning?",
        "questionNe": "सरसफाइ गर्दा कुनै सामान फुट्यो वा कुनै खतरा देखियो भने के गर्नुहुन्छ?",
        "modelAnswerJp": "絶対に隠したり放置したりせず、直ちに作業を止めて現場の状況を確認し、すぐに責任者・リーダーへ「ホウ・レン・ソウ（報告・連絡・相談）」を行います。二次災害やお客様への危険を防ぐため、安全確保を行って指示を仰ぎます。自分の過失は正直に認め、再発防止に努めます。",
        "modelAnswerRomaji": "Zettai ni kakushitari houchi shitari sezu, tadachini sagyou o tomete genba no joukyou o kakunin shi, sugu ni sekininsha・riidaa e \"Hou-Ren-Sou\" o okonaimasu. Niji saigai ya okyaku-sama e no kiken o fusegu tame, anzen kakuho o okonatte shiji o aogimasu. Jibun no kashitsu wa shoujiki ni mitome, saihatsu boushi ni tsutomemasu.",
        "modelAnswerEn": "I will never conceal it or leave it unattended. I will immediately pause work, assess the scene, and execute Hō-Ren-Sō (Report, Contact, Consult) to my supervisor without delay. I will secure the area to prevent guest accidents, take full responsibility, and implement preventive measures.",
        "modelAnswerNe": "म कहिल्यै पनि गल्ती लुकाउने वा त्यतिकै छोड्ने छैन। तुरुन्तै काम रोकेर आफ्नो सुपरभाइजर वा लिडरलाई होउ-रेन-सोउ (रिपोर्टिङ) गर्नेछु। अरूलाई चोटपटक नलागोस् भनी वरपर सुरक्षित घेरा राख्नेछु र सुपरभाइजरको निर्देशन अनुसार इमानदारीपूर्वक समाधान गर्नेछु।",
        "trapWarning": "Never say \"I will clean it up quietly and replace it\". Japanese managers value honesty and reporting above all.",
        "trapWarningNe": "\"म आफैं सुटुक्क सफा गर्छु वा किनिदिन्छु\" नभन्नुहोस्। तुरुन्त रिपोर्टिङ गर्नु नै जापानी कार्यसंस्कृति हो।",
        "tip": "State the word \"ホウ・レン・ソウ (Hou-Ren-Sou)\" proudly. It is the golden rule of Japanese employment.",
        "tipNe": "होउ-रेन-सोउ (Hō-Ren-Sō) शब्द स्पष्ट रूपमा उच्चारण गर्नुहोस्।",
        "keyPhrases": [
          "絶対に隠しません",
          "直ちにホウレンソウ",
          "二次災害を防ぐ"
        ]
      }
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
    interviewPractice: [
      {
        "id": "const-int-1",
        "category": "Motivation & Safety Consciousness",
        "categoryNe": "निर्माण क्षेत्र रोज्नुको कारण र सुरक्षा चेतना",
        "questionJp": "建設分野（足場・鉄筋・型枠など）を選んだ理由は何ですか？ (Kensetsu bunya o eranda riyuu wa nan desu ka?)",
        "questionRomaji": "Kensetsu bunya o eranda riyuu wa nan desu ka?",
        "questionEn": "Why did you choose the construction sector (scaffolding, rebar, framework, etc.)?",
        "questionNe": "तपाईंले निर्माण क्षेत्र (Construction) किन रोज्नुभयो?",
        "modelAnswerJp": "日本は地震大国でありながら、世界一頑丈で高精度な耐震建築技術を持っています。私はものづくりが好きで、自分の手で建物やインフラを造り上げる達成感に憧れています。厳しい現場だからこそ、「安全第一」とチームワークを徹底し、日本の高度な施工技術を基礎から学びたいと思い志望いたしました。",
        "modelAnswerRomaji": "Nihon wa jishin taikoku de ari nagara, sekaiichi ganjou de kouseido na taishin kenchiku gijutsu o motte imasu. Watashi wa monodukuri ga suki de, jibun no te de tatemono ya infura o tsuriageru tasseikan ni akogarete imasu. Kibishii genba dakara koso, \"anzen daiichi\" to chiimuwaaku o tettei shi, Nihon no koudo na sekou gijutsu o kiso kara manabitai to omoi shibou itashimashita.",
        "modelAnswerEn": "Despite frequent earthquakes, Japan boasts the world's strongest earthquake-resistant building engineering. I love hands-on construction and the immense pride of building lasting infrastructure. Because it is a demanding site, I commit to Safety First, team cooperation, and mastering Japanese techniques.",
        "modelAnswerNe": "जापान भूकम्पीय जोखिम भएको देश भए पनि विश्वकै सबैभन्दा बलियो भूकम्प प्रतिरोधी भवन बनाउने प्रविधि छ। मलाई हातले निर्माण गर्ने काम मन पर्छ। कार्यस्थलमा सुरक्षा पहिलो (Safety First) प्राथमिकतामा राख्दै बलियो टोली कार्य र जापानी निर्माण प्रविधि सिक्न चाहन्छु।",
        "trapWarning": "Do not minimize the danger of construction. Acknowledge the risks and emphasize strict safety compliance.",
        "trapWarningNe": "कामलाई हल्का रूपमा नलिनुहोस्। जोखिम बुझेर सुरक्षा नियम पालना गर्ने प्रतिबद्धता देखाउनुहोस्।",
        "tip": "Use terms like \"安全第一 (Anzen Daiichi - Safety First)\" and \"チームワーク (Teamwork)\".",
        "tipNe": "\"अन्जेन दाइइची\" (सुरक्षा पहिलो) शब्द प्रयोग गर्नुहोस्।",
        "keyPhrases": [
          "安全第一",
          "耐震建築技術",
          "チームワークを徹底"
        ]
      },
      {
        "id": "const-int-2",
        "category": "Heights & Safety Harness Protocols",
        "categoryNe": "उचाइमा काम र फुल-हार्नेस सुरक्षा पेटी",
        "questionJp": "高所作業がありますが、フルハーネス型安全帯の重要性をどう考えていますか？ (Kousho sagyou ga arimasu ga, furu haanesu-gata anzentai no juuyousei o dou kangaete imasu ka?)",
        "questionRomaji": "Kousho sagyou ga arimasu ga, furu haanesu-gata anzentai no juuyousei o dou kangaete imasu ka?",
        "questionEn": "Construction involves working at heights. How do you view full-harness safety rules?",
        "questionNe": "उचाइमा काम गर्दा फुल-हार्नेस (Full Harness) सुरक्षा पेटीको प्रयोगबारे के भन्नुहुन्छ?",
        "modelAnswerJp": "高所作業において墜落災害を防ぐための命綱であり、100%確実に着用・フック掛け（2丁掛け）を行うことが絶対の鉄則であると認識しています。慣れや油断が死亡事故につながるため、作業前点検と指差呼称「ハーネスよし！」を毎日欠かさず実施いたします。",
        "modelAnswerRomaji": "Kousho sagyou ni oite tsuiraku saigai o fusegu tame no inochizuna de ari, hyaku-paasento kakujitsu ni chakuyou・fukku-kake (nichougake) o okonau koto ga zettai no tessoku de aru to ninshiki shite imasu. Nare ya yudan ga shibou jiko ni tsunagaru tame, sagyou-mae tenken to yubisashi koshou \"haanesu yoshi!\" o mainichi kakasazu jisshi itashimasu.",
        "modelAnswerEn": "A full-harness is a literal lifeline preventing fatal fall accidents. Dual-lanyard hooking (2 hooks) must be strictly maintained at all times without exception. To prevent complacency, I will always conduct pre-work gear inspections and pointing-and-calling checks.",
        "modelAnswerNe": "उचाइमा काम गर्दा लड्नबाट जोगाउने यो जीवनरक्षा पेटी हो। दुवै हुक (Dual hook) सधैं अड्काएर मात्र काम गर्नु अनिवार्य नियम हो। काम सुरु गर्नुअघि पेटी जाँच गरी औंलाले देखाएर \"हार्नेस योशी!\" (ठिक छ) भन्ने बानी पालना गर्नेछु।",
        "trapWarning": "Never say \"I have good balance so I do not fall\". That is the number one red flag for Japanese construction directors.",
        "trapWarningNe": "\"मेरो ब्यालेन्स राम्रो छ, म लड्दिन\" कहिल्यै नभन्नुहोस्। यो जापानी कम्पनीका लागि ठूलो खतरा संकेत हो।",
        "tip": "Mention dual-lanyard hooking (2丁掛け - nichougake) to impress the interviewer.",
        "tipNe": "दुवै हुक अनिवार्य लगाउने नियम (2丁掛け) उल्लेख गर्नुहोस्।",
        "keyPhrases": [
          "命綱としての安全帯",
          "2丁掛けの徹底",
          "指差呼称の実施"
        ]
      }
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

  'food-service': {
    id: 'food-service',
    slug: 'food-service',
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
    visaPath: 'SSW-1 (Up to 5 years) ➟ Food Service Manager Upgrade.',
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
    interviewPractice: [
      {
        "id": "food-int-1",
        "category": "Customer Service Manners & Japanese Food",
        "categoryNe": "ग्राहक सेवा, शिष्टाचार र जापानी परिकार",
        "questionJp": "外食業（レストラン・調理・接客）を志望した理由は何ですか？ (Gaishokugyou o shibou shita riyuu wa nan desu ka?)",
        "questionRomaji": "Gaishokugyou o shibou shita riyuu wa nan desu ka?",
        "questionEn": "Why did you choose the food service & restaurant sector?",
        "questionNe": "तपाईंले रेस्टुरेन्ट तथा खाना सेवा (Food Service) किन रोज्नुभयो?",
        "modelAnswerJp": "日本の食文化とおもてなしの心（お客様への細やかな気配り）に深く魅了されたからです。美味しい料理と温かい笑顔の接客を通じて、お客様に「来てよかった」と喜んでいただくことに大きなやりがいを感じます。厨房での調理技術とホールの丁寧な敬語接客を両方身につけ、店舗の戦力として貢献したいです。",
        "modelAnswerRomaji": "Nihon no shokubunka to omotenashi no kokoro ni fukaku miryou sareta kara desu. Oishii ryouri to atatakai egao no sekkyaku o tsuujite, okyaku-sama ni \"kite yokatta\" to yorokonde itadaku koto ni ookina yarigai o kanjimasu. Chuubou de no chouri gijutsu to hooru no teinei na keigo sekkyaku o ryouhou minitsuke, tenpo no senryoku to shite kouken shitai desu.",
        "modelAnswerEn": "I am deeply fascinated by Japanese culinary culture and the spirit of Omotenashi (mindful hospitality). Bringing joy to guests through delicious food and warm smiles gives me high motivation. I want to master both kitchen culinary skills and polite Japanese customer service to be a reliable asset to your team.",
        "modelAnswerNe": "जापानी खाना संस्कृति र \"ओमोतेनाशी\" (अतिथि सत्कार) बाट म धेरै प्रभावित छु। मीठो खाना र मुस्कानसहितको सेवाबाट ग्राहकलाई सन्तुष्ट बनाउन पाउनु ठूलो खुसीको कुरा हो। भान्छामा खाना पकाउने सीप र हलमा शिष्ट जापानी भाषा (Keigo) प्रयोग गरी रेस्टुरेन्टको राम्रो कर्मचारी बन्न चाहन्छु।",
        "trapWarning": "Speak clearly with energetic, cheerful voice inflection. Mumbling in a restaurant interview guarantees rejection.",
        "trapWarningNe": "मसिनो स्वरमा नबोल्नुहोस्। रेस्टुरेन्टमा ऊर्जावान्, प्रस्ट र हँसिलो स्वर अत्यावश्यक हुन्छ।",
        "tip": "Use standard service phrases like \"いらっしゃいませ\" and \"ありがとうございました\".",
        "tipNe": "आदरार्थी भाषा (Keigo) र मुस्कानको विशेष अभ्यास गर्नुहोस्।",
        "keyPhrases": [
          "おもてなしの心",
          "笑顔の接客",
          "いらっしゃいませ"
        ]
      },
      {
        "id": "food-int-2",
        "category": "HACCP Food Safety & Allergen Handling",
        "categoryNe": "HACCP सरसफाइ र खानाको एलर्जी सावधानी",
        "questionJp": "厨房での衛生管理（HACCP）やアレルギー対応で気をつけていることは何ですか？ (Chuubou de no eisei kanri ya arerugii taiou de ki o tsukete iru koto wa nan desu ka?)",
        "questionRomaji": "Chuubou de no eisei kanri ya arerugii taiou de ki o tsukete iru koto wa nan desu ka?",
        "questionEn": "How do you handle kitchen hygiene (HACCP) and food allergen management?",
        "questionNe": "भान्छाको सरसफाइ (HACCP) र खानाको एलर्जी (Allergens) सम्बन्धी के सावधानी अपनाउनुहुन्छ?",
        "modelAnswerJp": "食中毒やアレルギー事故は人命に関わるため、最も厳格に管理いたします。手洗いは2回洗い・アルコール消毒を徹底し、包丁やまな板は肉用・魚用・野菜用で厳密に色分けして交差汚染（二次汚染）を防ぎます。お客様からアレルギーの確認があった場合は、自己判断せず必ず厨房責任者とレシピを確認して正確にお伝えいたします。",
        "modelAnswerRomaji": "Shokuchuudoku ya arerugii jiko wa jinmei ni kakawaru tame, mottomo genkaku ni kanri itashimasu. Tearai wa nikai-arai・arukooru shoudoku o tettei shi, houchou ya manaita wa niku-you・sakana-you・yasai-you de genmitsu ni irowake shite kousa osen o fusegimasu. Okyaku-sama kara arerugii no kakunin ga atta baai wa, jiko handan sezu kanarazu chuubou sekininsha to reshipi o kakunin shite seikaku ni otsutae itashimasu.",
        "modelAnswerEn": "Food poisoning and allergic shocks are life-threatening, so I treat hygiene with absolute strictness. I follow two-step handwashing with alcohol sanitizer. Knives and cutting boards must be color-coded for meat, fish, and vegetables to prevent cross-contamination. If a guest inquires about allergens, I will never guess on my own; I will verify with the head chef and recipe book.",
        "modelAnswerNe": "फुड पोइजनिङ र एलर्जी ज्यानसँग जोडिएको विषय भएकाले म कडा नियम पालना गर्छु। हात दुई पटक साबुनपानीले धोएर अल्कोहल स्यानिटाइजर लगाउनेछु। मासु, माछा र तरकारी काट्ने चक्कु र चपिङ बोर्ड रंग अनुसार छुट्टाछुट्टै प्रयोग गरी किटाणु सर्न (Cross-contamination) दिनेछैन। ग्राहकले एलर्जीबारे सोधेमा आफैं अन्दाज नगरी मुख्य सेफलाई सोधेर मात्र जानकारी दिनेछु।",
        "trapWarning": "Never say \"I will check the dish myself and if it looks fine I will serve it\". Cross-contact can cause fatal anaphylaxis.",
        "trapWarningNe": "\"म आफैं हेरेर ठिकै छ भने दिन्छु\" कहिल्यै नभन्नुहोस्। सधैं सुपरभाइजर र रेसिपी चार्ट जाँच गर्नुपर्छ।",
        "tip": "Mention cross-contamination (二次汚染 / 交差汚染) and color-coded utensils.",
        "tipNe": "चक्कु र चपिङ बोर्डको रंग अनुसार वर्गीकरण (Color-coding) उल्लेख गर्नुहोस्।",
        "keyPhrases": [
          "二次汚染の防止",
          "手洗いとアルコール消毒",
          "自己判断しません"
        ]
      }
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
    interviewPractice: [
      {
        "id": "agri-int-1",
        "category": "Motivation & Agricultural Stamina",
        "categoryNe": "कृषि क्षेत्र रोज्नुको कारण र शारीरिक धैर्य",
        "questionJp": "農業（施設園芸・野菜栽培・畜産など）を志望した理由は何ですか？ (Nougyou o shibou shita riyuu wa nan desu ka?)",
        "questionRomaji": "Nougyou o shibou shita riyuu wa nan desu ka?",
        "questionEn": "Why did you choose the agricultural sector in Japan?",
        "questionNe": "तपाईंले जापानको कृषि (Agriculture) क्षेत्र किन रोज्नुभयो?",
        "modelAnswerJp": "私の実家はネパールで代々農業を営んでおり、幼い頃から作物を育てる喜びを知っています。日本の農業は高い品質管理、スマート農業、ハウス栽培の温度・湿度コントロールなど世界最先端の技術があります。丹精込めて作った高品質な農作物を日本の食卓に届けることに誇りを持ち、どんな天候でも真面目にやり抜く体力と根気があります。",
        "modelAnswerRomaji": "Watashi no jikka wa Nepaaru de daidai nougyou o itonande ori, osanai koro kara sakumotsu o sodateru yorokobi o shitte imasu. Nihon no nougyou wa takai hinshitsu kanri, sumaato nougyou, hausu saibai no ondo・shitsudo kontorooru nado sekai saisentan no gijutsu ga arimasu. Tansei komete tsukutta kouhinshitsu na nousakumotsu o Nihon no shokutaku ni todokeru koto ni hokori o mochi, donna tenkou demo majime ni yarinuku tairyoku to konki ga arimasu.",
        "modelAnswerEn": "My family in Nepal has farmed for generations, so cultivating crops is in my blood. Japanese agriculture leads the world in greenhouse climate control, smart technology, and strict quality. I take pride in producing top-grade produce, and I have the physical stamina and dedication to work in any season.",
        "modelAnswerNe": "मेरो नेपालको घरमा पुस्तौंदेखि खेतीपाती हुँदै आएकाले बालीनाली हुर्काउने काम मलाई राम्रोसँग थाहा छ। जापानमा ग्रीनहाउस तापक्रम-आर्द्रता व्यवस्थापन र आधुनिक स्मार्ट कृषि प्रविधि विश्वस्तरीय छ। गुणस्तरीय अन्नबाली र तरकारी फलाएर जापानी नागरिकहरूको भान्छासम्म पुर्याउन म जुनसुकै मौसममा पनि कडा परिश्रम र धैर्यका साथ काम गर्न सक्छु।",
        "trapWarning": "Do not hide that farming is physically tough. Japanese farm owners want hardy, honest individuals who will not quit during summer heat.",
        "trapWarningNe": "कृषिको शारीरिक परिश्रमलाई सामान्य नठान्नुहोस्। गर्मी र जाडोमा पनि निरन्तर काम गर्न सक्ने इच्छाशक्ति देखाउनुहोस्।",
        "tip": "Emphasize your family background or practical experience with soil and plants.",
        "tipNe": "नेपालको खेतीपातीको पारिवारिक पृष्ठभूमि र शारीरिक तन्दुरुस्ती उल्लेख गर्नुहोस्।",
        "keyPhrases": [
          "作物を育てる喜び",
          "日本のスマート農業",
          "体力と根気"
        ]
      },
      {
        "id": "agri-int-2",
        "category": "Extreme Weather & Peak Season Harvests",
        "categoryNe": "गर्मी-जाडोको सामना र बिहानै फसल उठाउने काम",
        "questionJp": "夏場のハウス内の暑さや、収穫時期の早朝作業（4時起き）に対応できますか？ (Natsuba no hausu-nai no atsusa ya, shuukaku jiki no souchou sagyou ni taiou dekimasu ka?)",
        "questionRomaji": "Natsuba no hausu-nai no atsusa ya, shuukaku jiki no souchou sagyou ni taiou dekimasu ka?",
        "questionEn": "Can you handle greenhouse heat in summer and 4:00 AM early morning harvesting in peak season?",
        "questionNe": "गर्मीमा ग्रीनहाउस भित्रको तापक्रम र सिजनमा बिहान ४ बजे उठेर तरकारी टिप्ने काम गर्न सक्नुहुन्छ?",
        "modelAnswerJp": "はい、全く問題ございません。朝早く起きる習慣は身についており、収穫の鮮度を守るために早朝作業が欠かせないことも理解しております。また、夏の猛暑対策として水分・塩分の定期的な補給や適切な休憩を取り、熱中症予防を徹底して体調管理に努めます。農家の方々と力を合わせて繁忙期を乗り越えます。",
        "modelAnswerRomaji": "Hai, mattaku mondai gozaimasen. Asa hayaku okiru shuukan wa minitsuite ori, shuukaku no sendo o mamoru tame ni souchou sagyou ga kakasenai koto mo rikai shite orimasu. Mata, natsu no mousho taisaku to shite suibun・enbun no teikiteki na hokyuu ya tekisetsu na kyuukei o tori, necchuushou yobou o tettei shite taichou kanri ni tsutomemasu. Nouka no katagata to chikara o awasete hanbouki o norikoemasu.",
        "modelAnswerEn": "Yes, no problem at all. I am accustomed to waking up early, and I understand early morning harvest is essential for fresh vegetable quality. For summer heat, I strictly manage my hydration, electrolytes, and rest breaks to prevent heatstroke. I will work in harmony with the farm family to deliver great results.",
        "modelAnswerNe": "हजुर, कुनै समस्या छैन। म बिहान सबेरै उठ्ने बानी परेको व्यक्ति हुँ र तरकारीको ताजापन जोगाउन बिहान सबेरै टिप्नुपर्छ भन्ने बुझेको छु। गर्मीमा पानी र नुनको मात्रा (ORSL) नियमित खाएर डिहाइड्रेसन र तातो हावा (Heatstroke) बाट जोगिँदै आफ्नो स्वास्थ्यको ख्याल राख्नेछु। किसान परिवारसँग मिलेर काम सम्पन्न गर्नेछु।",
        "trapWarning": "Never be late for the interview itself, or they will assume you cannot wake up early.",
        "trapWarningNe": "अन्तर्वार्तामा ५ मिनेट अगावै उपस्थित हुनुहोस्, समयको पाबन्दी नै मुख्य परीक्षा हो।",
        "tip": "Mention heatstroke prevention (熱中症予防 - necchuushou yobou) and hydration.",
        "tipNe": "तातोबाट जोगिने सुरक्षा (Necchuushou yobou) को शब्द प्रयोग गर्नुहोस्।",
        "keyPhrases": [
          "早朝作業は問題ありません",
          "鮮度を守る",
          "熱中症予防の徹底"
        ]
      }
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
