export interface InterviewQuestionItem {
  id: string;
  category: string;
  categoryNe: string;
  questionOriginal: string;
  questionRomaji: string;
  questionEn: string;
  questionNe: string;
  modelAnswerOriginal: string;
  modelAnswerRomaji: string;
  modelAnswerEn: string;
  modelAnswerNe: string;
  trapWarning: string;
  trapWarningNe: string;
  tip: string;
  tipNe: string;
}

export const JAPAN_STUDENT_INTERVIEW: InterviewQuestionItem[] = [
  {
    id: 'js-1',
    category: 'Motivation & Purpose',
    categoryNe: 'उद्देश्य र प्रेरणा',
    questionOriginal: 'なぜ日本へ留学したいのですか？',
    questionRomaji: 'Naze Nihon e ryuugaku shitai no desu ka?',
    questionEn: 'Why do you want to study in Japan?',
    questionNe: 'तपाईं जापानमै गएर किन अध्ययन गर्न चाहनुहुन्छ?',
    modelAnswerOriginal: '私は将来ITエンジニアになりたいと考えています。日本の先進的な技術と教育環境で学び、先端技術の基礎を身につけたいです。そのために、まず日本語学校で2年間しっかり語学力を磨き、大学へ進学したいと考えております。',
    modelAnswerRomaji: 'Watashi wa shourai aiti-enjinia ni naritai to kangaete imasu. Nihon no senshinteki na gijutsu to kyouiku kankyou de manabi, sentan gijutsu no kiso o mi ni tsuketai desu. Sono tame ni, mazu nihongo gakkou de ninenkan shikkari gogakuryoku o migaki, daigaku e shingaku shitai to kangaete orimasu.',
    modelAnswerEn: 'I aspire to become an IT engineer in the future. I want to study Japan’s cutting-edge technology and world-class educational environment. To achieve this, I will first build a strong foundation in Japanese at a language school for 2 years, then advance to a university.',
    modelAnswerNe: 'म भविष्यमा आईटी इन्जिनियर बन्न चाहन्छु। जापानको अत्याधुनिक प्रविधि र शैक्षिक वातावरणबाट सिक्न चाहन्छु। त्यसका लागि पहिले २ वर्ष भाषा स्कुलमा जापानी भाषा राम्रोसँग सिकेर विश्वविद्यालय भर्ना हुने योजना छ।',
    trapWarning: 'Never say "I want to earn money" or "My friends and relatives are in Japan". Immigration immediately flags economic migrant motives.',
    trapWarningNe: 'कहिले पनि "पैसा कमाउन जान लागेको" वा "साथीभाइ/नातेदार भएकाले" नभन्नुहोस्। पढ्ने स्पष्ट उद्देश्य देखाउनुपर्छ।',
    tip: 'Directly connect your field of study with your +2 or Bachelor major in Nepal.',
    tipNe: 'नेपालमा पढेको विषय (+2 वा Bachelor) सँग मिल्दोजुल्दो अध्ययन योजना प्रस्तुत गर्नुहोस्।'
  },
  {
    id: 'js-2',
    category: 'Financial Sponsor',
    categoryNe: 'आर्थिक प्रायोजक',
    questionOriginal: '学費や生活費は誰が支払いますか？',
    questionRomaji: 'Gakuhi ya seikatsuhi wa dare ga shiharaimasu ka?',
    questionEn: 'Who is paying for your tuition and living expenses?',
    questionNe: 'तपाईंको पढाइ र बसाइको सम्पूर्ण खर्च कसले बेहोर्छ?',
    modelAnswerOriginal: '私の父が経費支弁者です。父はネパールで会社を経営しており、年収は約〇〇ルピーです。十分な預金残高と納税証明書も提出しておりますので、留学生活の資金に心配はございません。',
    modelAnswerRomaji: 'Watashi no chichi ga keihi shibensha desu. Chichi wa Nepaaru de kaisha o keiei shite ori, nenshuu wa yaku [gaku] rupii desu. Juubun na yokin zandaka to nouzei shoumeisho mo teishutsu shite orimasu node, ryuugaku seikatsu no shikin ni shinpai wa gozaimasen.',
    modelAnswerEn: 'My father is my financial sponsor. He runs a business in Nepal with an annual income of approx __ NPR. Proof of adequate bank balance and tax clearance certificates have already been submitted, so there are no financial concerns.',
    modelAnswerNe: 'मेरो बुबा मेरो आर्थिक प्रायोजक (Sponsor) हुनुहुन्छ। उहाँ नेपालमा व्यवसाय गर्नुहुन्छ र वार्षिक आम्दानी कर चुक्ता प्रमाणपत्र सहित पेश गरिएको छ। खर्चको कुनै समस्या छैन।',
    trapWarning: 'Stumbling on amounts or stating numbers that contradict your submitted tax documents triggers immediate rejection.',
    trapWarningNe: 'कागजातमा भएको रकम र अन्तर्वार्तामा बोल्ने रकममा फरक पर्नु हुँदैन। ठ्याक्कै आम्दानी याद गर्नुहोस्।',
    tip: 'Memorize your sponsor’s exact annual income, 3-year tax figures, and bank balance in NPR and Yen.',
    tipNe: 'बुबाको आम्दानी, बैंक ब्यालेन्स र कर रकम नेरु र येन दुवैमा कण्ठ पारेर जानुहोस्।'
  },
  {
    id: 'js-3',
    category: 'Future Career Plan',
    categoryNe: 'भविष्यको योजना',
    questionOriginal: '学校を卒業した後はどうしますか？',
    questionRomaji: 'Gakkou o sotsugyou shita ato wa dou shimasu ka?',
    questionEn: 'What will you do after graduating?',
    questionNe: 'पढाइ पूरा भएपछि तपाईं के गर्नुहुन्छ?',
    modelAnswerOriginal: '大学卒業後は、日本で数年間エンジニアとして就職し、実務経験を積みたいと考えています。その後はネパールに帰国し、日本で培った技術とマネジメントを活かして自国のIT産業の発展に貢献したいです。',
    modelAnswerRomaji: 'Daigaku sotsugyou-go wa, Nihon de suunenkan enjinia to shite shuushoku shi, jitsumu keiken o tsumitai to kangaete imasu. Sono ato wa Nepaaru ni kikoku shi, Nihon de tsukatta gijutsu to manejimento o ikashite jikoku no aiti-sangyou no hatten ni kouken shitai desu.',
    modelAnswerEn: 'After graduating university, I plan to work as an engineer in Japan for a few years to gain practical expertise. Afterward, I will return to Nepal to contribute to developing my home country’s IT industry using Japanese technology and management practices.',
    modelAnswerNe: 'कलेज सकिएपछि केही वर्ष जापानकै कम्पनीमा काम गरी व्यावहारिक सीप सिक्नेछु। त्यसपछि नेपाल फर्केर नेपालकै आईटी क्षेत्रको विकासमा योगदान दिनेछु।',
    trapWarning: 'Never say "I want to settle permanently in Japan" on a student visa interview.',
    trapWarningNe: 'विद्यार्थी भिसामा कहिल्यै "जापानमै सधैं बस्छु" नभन्नुहोस्। स्वदेश फर्केर प्रगति गर्ने लक्ष्य देखाउनुहोस्।',
    tip: 'Show that learning in Japan has a tangible return-on-investment for your long-term career.',
    tipNe: 'जापानमा पढेको कुराले तपाईंको भविष्यलाई कसरी उज्यालो बनाउँछ भन्ने स्पष्ट योजना राख्नुहोस्।'
  },
  {
    id: 'js-4',
    category: 'School & City Choice',
    categoryNe: 'स्कुल र सहरको छनोट',
    questionOriginal: 'なぜこの日本語学校を選んだのですか？',
    questionRomaji: 'Naze kono nihongo gakkou o eranda no desu ka?',
    questionEn: 'Why did you choose this particular Japanese language school?',
    questionNe: 'तपाईंले किन यही भाषा स्कुल रोज्नुभएको हो?',
    modelAnswerOriginal: 'この学校は進学指導の実績が非常に高く、JLPT対策や大学入試のサポートが充実しているからです。また、留学生への生活支援体制も整っており、安心して学業に専念できる環境だと確信いたしました。',
    modelAnswerRomaji: 'Kono gakkou wa shingaku shidou no jisseki ga hijou ni takaku, Jerupiti taisaku ya daigaku nyuushi no sapooto ga juujitsu shite iru kara desu. Mata, ryuugakusei e no seikatsu shien taisei mo totonoote ori, anshin shite gakugyou ni sennen dekiru kankyou da to kakushin itashimashita.',
    modelAnswerEn: 'This school has an outstanding track record in university prep, providing excellent JLPT training and university exam guidance. In addition, their student support system is comprehensive, ensuring I can focus solely on my studies.',
    modelAnswerNe: 'यो स्कुलको उच्च शिक्षा मार्गदर्शन (Shingaku) उत्कृष्ट छ र JLPT तथा कलेज प्रवेश परीक्षाको तयारी राम्रो गराइन्छ। विद्यार्थी सहयोग प्रणाली भरपर्दो भएकाले पढाइमा मात्र ध्यान दिन सकिन्छ।',
    trapWarning: 'Do not just say "Because my consultancy recommended it". Know your school’s name, principal, and exact location.',
    trapWarningNe: '"कन्सल्टेन्सीले रोजिदिएको" नभन्नुहोस्। स्कुलको नाम, ठेगाना र विशेषता थाहा हुनुपर्छ।',
    tip: 'Know the nearest train station and prefecture of your school (e.g. Shinjuku, Tokyo).',
    tipNe: 'आफ्नो स्कुल रहेको सहर र नजिकको रेल स्टेसनको नाम याद राख्नुहोस्।'
  },
  {
    id: 'js-5',
    category: 'Part-Time Work Awareness',
    categoryNe: 'पार्ट-टाइम कामको नियम',
    questionOriginal: '日本でアルバイトをする予定はありますか？',
    questionRomaji: 'Nihon de arubaito o suru yotei wa arimasu ka?',
    questionEn: 'Do you plan to work part-time in Japan?',
    questionNe: 'के तपाईं जापानमा पार्ट-टाइम (आरुबाइतो) काम गर्ने योजनामा हुनुहुन्छ?',
    modelAnswerOriginal: '私の最優先事項は学業です。生活費や学費は父が負担いたします。もし日本の社会や文化を学び、会話力を高める機会があれば、入国管理局の規定である週28時間以内を厳格に守って経験程度に行いたいと考えています。',
    modelAnswerRomaji: 'Watashi no saiyuusen jikou wa gakugyou desu. Seikatsuhi ya gakuhi wa chichi ga futan itashimasu. Moshi Nihon no shakai ya bunka o manabi, kaiwaryoku o takameru kikai ga areba, nyuukoku kanrikyoku no kitei de aru shuu nijuuhachijikan inai o genkaku ni mamotte keiken teido ni okonaitai to kangaete imasu.',
    modelAnswerEn: 'My top priority is my studies. My living expenses and tuition are sponsored by my father. If there is an opportunity to learn Japanese work etiquette and improve conversational skills, I may work within the strict legal limit of 28 hours per week.',
    modelAnswerNe: 'मेरो पहिलो प्राथमिकता पढाइ हो। सबै खर्च बुबाले बेहोर्नुहुन्छ। जापानी समाज बुझ्न र भाषा सुधार गर्न मौका मिलेमा अध्यागमनको नियम बमोजिम हप्ताको २८ घण्टा भित्र रहेर मात्र काम गर्नेछु।',
    trapWarning: 'Never calculate your tuition payment based on part-time wages during an interview!',
    trapWarningNe: 'पार्ट-टाइमको कमाइले कलेज फि तिर्छु भन्ने गल्ती कहिल्यै नगर्नुहोस्।',
    tip: 'Highlight the legal 28-hour limit (Shuu nijuuhachi-jikan) to demonstrate legal compliance.',
    tipNe: 'हप्ताको २८ घण्टा (Shuu 28 jikan) को नियम आफूलाई थाहा भएको स्पष्ट पार्नुहोस्।'
  }
];

export const JAPAN_WORKING_INTERVIEW: InterviewQuestionItem[] = [
  {
    id: 'jw-1',
    category: 'Self-Introduction & Greeting',
    categoryNe: 'आत्मपरिचय र अभिवादन',
    questionOriginal: '自己紹介をお願いします。',
    questionRomaji: 'Jikoshoukai o onegai shimasu.',
    questionEn: 'Please introduce yourself.',
    questionNe: 'कृपया आफ्नो परिचय दिनुहोस्।',
    modelAnswerOriginal: 'はじめまして。ネパールから参りました[名前]と申します。年齢は[年齢]歳です。ネパールでは[経歴]を経験いたしました。特定技能評価試験と国際交流基金日本語基礎テストに合格しております。真面目に一生懸命頑張りますので、よろしくお願いいたします。',
    modelAnswerRomaji: 'Hajimemashite. Nepaaru kara mairimashita [Namae] to moushimasu. Nenrei wa [Nenrei]-sai desu. Nepaaru dewa [Keireki] o keiken itashimashita. Tokutei ginou hyouka shiken to kokusai kouryuu kikin nihongo kiso tesuto ni goukaku shite orimasu. Majime ni isshoukenmei gambarimasu node, yoroshiku onegai itashimasu.',
    modelAnswerEn: 'Nice to meet you. My name is [Name] from Nepal. I am [Age] years old. In Nepal, I gained experience in [Field]. I have passed the SSW Sector Exam and JFT-Basic. I will work honestly and diligently. Thank you very much.',
    modelAnswerNe: 'नमस्ते। म नेपालबाट [नाम] हुँ। मेरो उमेर [उमेर] वर्ष भयो। नेपालमा मैले [काम/पढाइ] गरेको छु। मैले SSW सीप परीक्षा र JFT भाषा परीक्षा उत्तीर्ण गरेको छु। म इमानदारीपूर्वक कडा मिहिनेत गर्नेछु।',
    trapWarning: 'Speaking too quietly or failing to bow appropriately leaves a poor impression.',
    trapWarningNe: 'सानो स्वरमा बोल्ने वा आँखा नजुधाई बोल्ने नगर्नुहोस्।',
    tip: 'Deliver your intro in under 60 seconds with clear voice, straight posture, and bow slightly at the end.',
    tipNe: '६० सेकेन्डभित्र सफा स्वरमा बोल्नुहोस् र अन्त्यमा "Yoroshiku onegai itashimasu" भन्दै शिर झुकाउनुहोस्।'
  },
  {
    id: 'jw-2',
    category: 'Job Motivation',
    categoryNe: 'कार्यक्षेत्रको छनोट',
    questionOriginal: 'なぜこの業種（ビルクリーニング/外食/介護など）を選びましたか？',
    questionRomaji: 'Naze kono gyoushu (biru kuriiningu / gaishoku / kaigo nado) o eranda no desu ka?',
    questionEn: 'Why did you choose this specific sector (e.g., Building Cleaning, Food Service, Caregiving)?',
    questionNe: 'तपाईंले किन यही क्षेत्र (जस्तै: सरसफाइ, रेस्टुरेन्ट वा काइगो) रोज्नुभयो?',
    modelAnswerOriginal: '私は清潔で衛生的な環境を作ることや、人を支える仕事に誇りを持っています。日本の高いプロ意識と5S（整理・整頓・清掃・清潔・躾）を学び、現場のチームの一員として信頼される存在になりたいからです。',
    modelAnswerRomaji: 'Watashi wa seiketsu de eiseiteki na kankyou o tsukuru koto ya, hito o sasaeru shigoto ni hokori o motte imasu. Nihon no takai puro ishiki to go-esu (seiri, seiton, seisou, seiketsu, shitsuke) o manabi, gemba no chiimu no ichiin to shite shinrai sareru sonzai ni naritai kara desu.',
    modelAnswerEn: 'I take immense pride in creating clean, hygienic spaces and supporting others. I want to adopt Japan’s professional standards and 5S principles, becoming a dependable, trusted member of the team.',
    modelAnswerNe: 'म सफा, स्वच्छ वातावरण बनाउने र सेवा दिने काममा गर्व गर्छु। जापानको ५-एस प्रणाली (5S) र व्यावसायिक अनुशासन सिकेर कम्पनीको भरपर्दो सदस्य बन्न चाहन्छु।',
    trapWarning: 'Never answer "Because this sector was easy to apply for" or "Because of salary only".',
    trapWarningNe: '"अरू भिसा नपाएर" वा "तलब धेरै भएर" मात्र नभन्नुहोस्। कामप्रतिको लगाव देखाउनुहोस्।',
    tip: 'Mention key terminology relevant to the trade (e.g. 5S, safety equipment, hygiene protocols).',
    tipNe: 'जापानी कार्यस्थलका मुख्य शब्दहरू (5S, Ho-Ren-So) प्रयोग गर्नुहोस्।'
  },
  {
    id: 'jw-3',
    category: 'Overtime & Physical Work',
    categoryNe: 'ओभरटाइम र शारीरिक परिश्रम',
    questionOriginal: '残業やシフト勤務、重い荷物の運搬は大丈夫ですか？',
    questionRomaji: 'Zangyou ya shifuto kimmu, omoi nimotsu no umpan wa daijoubu desu ka?',
    questionEn: 'Are you comfortable with overtime, shift schedules, and physical labor?',
    questionNe: 'के तपाईं ओभरटाइम, सिफ्ट अनुसार काम र शारीरिक परिश्रम गर्न सक्नुहुन्छ?',
    modelAnswerOriginal: 'はい、全く問題ございません。体力には非常に自信があり、健康管理にも普段から気をつけております。会社の指示に従い、残業や休日出勤にも柔軟に対応いたします。',
    modelAnswerRomaji: 'Hai, mattaku mondai gozaimasen. Tairyoku niwa hijou ni jishin ga ari, kenkou kanri ni mo fudan kara ki o tsukete orimasu. Kaisha no shiji ni shitagai, zangyou ya kyuujitsu shutkin ni mo juunan ni taiou itashimasu.',
    modelAnswerEn: 'Yes, absolutely no problem. I have high physical stamina and maintain good health. I will follow the company’s guidelines and flexibly support overtime or holiday shifts as required.',
    modelAnswerNe: 'हजुर, कुनै समस्या छैन। मेरो शारीरिक स्वास्थ्य राम्रो छ। कम्पनीको नियम र निर्देशन अनुसार ओभरटाइम र सिफ्टमा काम गर्न पूर्ण तयार छु।',
    trapWarning: 'Hesitating or requesting strict 9-to-5 schedules will significantly decrease employer scoring.',
    trapWarningNe: 'अलमलिने वा दिनको सिफ्ट मात्र गर्छु भन्ने नगर्नुहोस्।',
    tip: 'Express genuine willingness, reliability, and punctuality.',
    tipNe: 'अनुशासित, समयनिष्ठ र मिहिनेती भावना देखाउनुहोस्।'
  },
  {
    id: 'jw-4',
    category: 'Communication & Rules',
    categoryNe: 'संवाद र कार्यस्थल नियम (हो-रेन-सो)',
    questionOriginal: '職場でわからないことがあった時、どうしますか？',
    questionRomaji: 'Shokuba de wakaranai koto ga atta toki, dou shimasu ka?',
    questionEn: 'What do you do when you do not understand something at work?',
    questionNe: 'कामको क्रममा केही कुरा नबुझेमा तपाईं के गर्नुहुन्छ?',
    modelAnswerOriginal: '勝手に自己判断せず、すぐに先輩や上司に「報告・連絡・相談（ホウレンソウ）」を行います。ミスを防ぐために、メモを取り、指示を復唱して確認いたします。',
    modelAnswerRomaji: 'Katte ni jiko handan sezu, sugu ni sempai ya joushi ni "houkoku, renraku, soudan (hou-ren-sou)" o okonaimasu. Misu o fusegu tame ni, memo o tori, shiji o fukushou shite kakunin itashimasu.',
    modelAnswerEn: 'I never make arbitrary assumptions. I immediately practice Hou-Ren-So (Report, Communicate, Consult) with seniors and supervisors. To prevent mistakes, I take notes and repeat instructions back for confirmation.',
    modelAnswerNe: 'आफैं मनपरी निर्णय गर्दिनँ। तत्काल अग्रज वा सुपरभाइजरलाई हो-रेन-सो (प्रतिवेदन, सम्पर्क, परामर्श) गर्छु। गल्ती हुन नदिन नोट गर्छु र दोहोर्‍याएर पुष्टि गर्छु।',
    trapWarning: 'Pretending to understand when you do not (shitteru furi) causes workplace accidents and is strictly condemned in Japan.',
    trapWarningNe: 'नबुझीकन "बुझें" भनेर काम थाल्नु जापानी कार्यस्थलमा अक्षम्य मानिन्छ।',
    tip: 'Using the phrase "Hou-Ren-So" (報告・連絡・相談) demonstrates workplace readiness.',
    tipNe: 'जापानी कामदार संस्कृतिको मूल मन्त्र "Hou-Ren-So" शब्द अवश्य प्रयोग गर्नुहोस्।'
  }
];

export const JAPAN_DEPENDENT_INTERVIEW: InterviewQuestionItem[] = [
  {
    id: 'jd-1',
    category: 'Marriage Genuineness',
    categoryNe: 'विवाहको वास्तविकता',
    questionOriginal: '配偶者の方とどのように知り合いましたか？',
    questionRomaji: 'Haiguusha no kata to dono you ni shiriai mashita ka?',
    questionEn: 'How did you meet your spouse?',
    questionNe: 'तपाईंको श्रीमान्/श्रीमतीसँग कसरी भेट वा चिनजान भएको थियो?',
    modelAnswerOriginal: '私たちは〇〇年〇月に両親・親族の紹介（または学生時代の知り合い）で出会いました。その後、メッセージやビデオ通話で交流を深め、〇〇年〇月にネパールで伝統的な結婚式を挙げました。結婚証明書や写真も提出しております。',
    modelAnswerRomaji: 'Watashitachi wa [Nen/Getsu] ni ryoushin/shinzoku no shoukai (matawa gakusei jidai no shiriai) de deaimashita. Sono ato, messeeji ya bideo tsuuwa de kouryuu o fukame, [Nen/Getsu] ni Nepaaru de dentouteki na kekkonshiki o agemashita. Kekkon shoumeisho ya shashin mo teishutsu shite orimasu.',
    modelAnswerEn: 'We were introduced by our families in [Month/Year]. After maintaining regular communication via video calls and chats, we held a traditional wedding ceremony in Nepal in [Month/Year]. Photos and our marriage certificate are submitted.',
    modelAnswerNe: 'हाम्रो चिनजान [साल/महिना] मा पारिवारिक माध्यमबाट भएको थियो। नियमित कुराकानीपछि परम्परागत विधि अनुसार विवाह भयो र विवाह दर्ता तथा तस्बिरहरू संलग्न छन्।',
    trapWarning: 'Inconsistencies in courtship dates, engagement dates, or marriage registration trigger immediate sham-marriage suspicions.',
    trapWarningNe: 'विवाह मिति, टीकाटालो मिति वा चिनजानको समय फरक-फरक भन्नुहुँदैन।',
    tip: 'Both partners must memorize identical timelines of the wedding events.',
    tipNe: 'श्रीमान् र श्रीमती दुवैले विवाह र सम्बन्धका मुख्य मितिहरू ठ्याक्कै एउटै याद गर्नुपर्छ।'
  },
  {
    id: 'jd-2',
    category: 'Financial Capability',
    categoryNe: 'आर्थिक अवस्था र बसाइ खर्च',
    questionOriginal: '日本での生活費はどのように賄いますか？',
    questionRomaji: 'Nihon de no seikatsuhi wa dono you ni makanaimasu ka?',
    questionEn: 'How will living expenses be covered in Japan?',
    questionNe: 'जापानमा बस्दा तपाईंहरूको घरखर्च कसरी चल्छ?',
    modelAnswerOriginal: '私の配偶者は日本の企業で正社員（技術・人文知識・国際業務／特定技能2号）として勤務しており、月給は約〇〇万円です。納税も適正に行っており、二人で生活するのに十分な経済力があります。',
    modelAnswerRomaji: 'Watashi no haiguusha wa Nihon no kigyou de seishain to shite kimmu shite ori, gekkyuu wa yaku [gaku] man-en desu. Nouzei mo tekisei ni okonatte ori, futari de seikatsu suru no ni juubun na keizairyoku ga arimasu.',
    modelAnswerEn: 'My spouse works as a full-time professional at a Japanese enterprise with a monthly salary of approx __0,000 Yen. All taxes are fully cleared, and the income is sufficient to sustain both of us comfortably.',
    modelAnswerNe: 'मेरो जीवनसाथी जापानको कम्पनीमा कार्यरत हुनुहुन्छ र उहाँको मासिक आम्दानी करिब [रकम] येन छ। दुवै जनाको बसाइ खर्च राम्रोसँग पुग्छ।',
    trapWarning: 'Never state "I will work full-time to support the household." Dependents are not permitted to work full-time.',
    trapWarningNe: '"म पनि जापान पुगेर फुल-टाइम काम गर्छु" कहिल्यै नभन्नुहोस्। आश्रित भिसामा २८ घण्टा भन्दा बढी काम गर्न पाइँदैन।',
    tip: 'Emphasize your primary purpose is family cohabitation and supporting your spouse.',
    tipNe: 'तपाईंको मुख्य उद्देश्य परिवारसँगै बस्नु (Cohabitation) हो भन्ने कुरामा जोड दिनुहोस्।'
  }
];

export const KOREA_STUDENT_INTERVIEW: InterviewQuestionItem[] = [
  {
    id: 'ks-1',
    category: 'Study Purpose',
    categoryNe: 'अध्ययनको उद्देश्य',
    questionOriginal: '한국에 유학을 가려는 이유는 무엇입니까?',
    questionRomaji: 'Hanguk-e yuhag-eul galyeoneun iyuneun mueos-ibnikka?',
    questionEn: 'Why do you want to study in South Korea?',
    questionNe: 'तपाईं दक्षिण कोरियामा किन अध्ययन गर्न जान चाहनुहुन्छ?',
    modelAnswerOriginal: '저는 IT 및 비즈니스 분야에서 글로벌 전문가가 되고 싶습니다. 한국은 세계적인 IT 강국이며 우수한 고등교육 시스템을 갖추고 있습니다. 어학당에서 한국어를 마스터한 후, 대학교 학위 과정을 성공적으로 이수하고자 합니다.',
    modelAnswerRomaji: 'Jeoneun aiti mit bijeuniseu bunyahaeseo geullobeol jeonmungaga doego sipsumnida. Hangugeun segyejeogin aiti gang-gug-imyeo usuhan godeunggyoyuk siseutem-eul gatchugo issseumnida. Eohakdang-eseo hangugeo-reul maseuteo-han hu, daehakgyo hagwi gwajeong-eul seong-gongjeog-euro isuhagoja hamnida.',
    modelAnswerEn: 'I aspire to become a global specialist in IT and business. South Korea is a premier technology powerhouse with outstanding university education. After mastering Korean at a language institute, I will complete my degree program.',
    modelAnswerNe: 'म आईटी र व्यवसाय क्षेत्रमा दक्ष बन्न चाहन्छु। दक्षिण कोरिया विश्वप्रसिद्ध प्रविधि राष्ट्र हो। पहिले कोरियन भाषा राम्रोसँग सिकेर कलेजको डिग्री पूरा गर्ने मेरो लक्ष्य छ।',
    trapWarning: 'Do not mention part-time work or sending money back home during visa screening.',
    trapWarningNe: 'पार्ट-टाइम काम गरेर पैसा पठाउने कुरा अन्तर्वार्तामा कहिल्यै नगर्नुहोस्।',
    tip: 'Reference specific institutions (e.g. SKY universities, KAIST) and your planned major.',
    tipNe: 'कोरियाली विश्वविद्यालय र आफ्नो विषयको नाम स्पष्टसँग लिनुहोस्।'
  },
  {
    id: 'ks-2',
    category: 'Financial Sponsor',
    categoryNe: 'आर्थिक प्रायोजक',
    questionOriginal: '학비와 생활비는 누가 지원합니까?',
    questionRomaji: 'Hakbiwa saenghwalbineun nuga jiwonhamnikka?',
    questionEn: 'Who is supporting your tuition and living expenses?',
    questionNe: 'तपाईंको पढाइ र बसाइको खर्च कसले बेहोर्छ?',
    modelAnswerOriginal: '제 아버지가 재정 보증인입니다. 아버지는 네팔에서 사업을 운영하고 계시며, 은행 잔고 증명서와 3년간의 소득금액 증명서를 모두 제출하였습니다.',
    modelAnswerRomaji: 'Je abeojiga jaejeong bojeung-in-imnida. Abeojineun Nepareseo sa-eob-eul un-yeonghago gyesimyeo, eunhaeng jango jeungmyeongseowa samnyeongan-ui sodukgeumaek jeungmyeongseo-reul modu jechulhayeossseumnida.',
    modelAnswerEn: 'My father is my financial guarantor. He operates a business in Nepal, and we have submitted official bank statements along with 3 years of income and tax certificates.',
    modelAnswerNe: 'मेरो बुबा मेरो आर्थिक प्रायोजक हुनुहुन्छ। उहाँ नेपालमा व्यवसाय चलाउनुहुन्छ र ३ वर्षको कर चुक्ता तथा बैंक ब्यालेन्स कागजात पेश गरिएको छ।',
    trapWarning: 'Do not hesitate on bank balance amounts in USD / Won.',
    trapWarningNe: 'बैंक ब्यालेन्सको रकममा अलमल नहुनुहोस्।',
    tip: 'Know the minimum balance requirement ($18,000–$20,000 for Seoul universities).',
    tipNe: 'सोलका कलेजहरूको लागि आवश्यक बैंक ब्यालेन्स ($18,000–$20,000) याद राख्नुहोस्।'
  }
];

export const KOREA_WORKING_INTERVIEW: InterviewQuestionItem[] = [
  {
    id: 'kw-1',
    category: 'EPS 2nd Stage Oral Commands',
    categoryNe: 'ईपीएस दोस्रो चरण शारीरिक निर्देशन',
    questionOriginal: '앞으로 가세요! 뒤로 도세요! 오른손을 올리세요!',
    questionRomaji: 'Apeuro gaseyo! Dwiro doseyo! Oreun-soneul olliseyo!',
    questionEn: 'Oral Action Commands: Walk forward! Turn back! Raise your right hand!',
    questionNe: 'निर्देशन: अगाडि बढ्नुहोस्! पछाडि फर्कनुहोस्! दाहिने हात उठाउनुहोस्!',
    modelAnswerOriginal: '[즉각 행동 실행] 네, 알겠습니다! (행동 완료 후) 다 했습니다!',
    modelAnswerRomaji: '[Jeuk-gak haengdong silhaeng] Ne, algesseumnida! (Haengdong wallyo hu) Da haess-seumnida!',
    modelAnswerEn: '[Execute action immediately without hesitating] Yes, understood! [After finishing] Done!',
    modelAnswerNe: '[निर्देशन सुनेर तत्काल विना अलमल गर्ने] हजुर, बुझें! (काम सकिएपछि) भयो हजुर!',
    trapWarning: 'Confusing right (오른쪽 - oreunjjok) and left (왼쪽 - oenjjok) causes heavy point deductions.',
    trapWarningNe: 'दाहिने (Oreun-jjok) र देब्रे (Oen-jjok) झुक्किनु हुँदैन।',
    tip: 'Respond loudly and energetically: "Ne, algesseumnida!"',
    tipNe: 'ठूलो र प्रस्ट स्वरमा "ने, अल्गेस्सुम्निदा" भन्दै छिटो निर्देशन पूरा गर्नुहोस्।'
  },
  {
    id: 'kw-2',
    category: 'Factory Tool Identification',
    categoryNe: 'औजार पहिचान',
    questionOriginal: '이 공구의 이름은 무엇이며 어떻게 사용합니까? [스패너 / 펜치 / 니पर]',
    questionRomaji: 'I gong-gu-ui ireumeun mueosimyeo eotteoke sayonghamnikka? [Seupaeneo / Penchi / Nipeo]',
    questionEn: 'What is the name of this tool and how is it used? [Spanner / Pliers / Wire Cutters]',
    questionNe: 'यो औजारको नाम के हो र कसरी प्रयोग गरिन्छ? [रेन्च, पिलास, कटर]',
    modelAnswerOriginal: '이것은 스패너입니다. 볼트나 너트를 조이거나 풀 때 사용합니다. 안전하게 작업하겠습니다.',
    modelAnswerRomaji: 'Igeoseun seupaeneo-imnida. Bolteuna neoteureul joe-igeona pul ttae sayonghamnida. Anjeonhage jageophagess-seumnida.',
    modelAnswerEn: 'This is a spanner. It is used to tighten or loosen bolts and nuts. I will always work safely.',
    modelAnswerNe: 'यो स्प्यानर (Spanner) हो। यो नट र बोल्ट कस्न वा खोल्न प्रयोग गरिन्छ। म सुरक्षित रूपमा काम गर्नेछु।',
    trapWarning: 'Saying English pronunciation incorrectly instead of standard Korean loanword loses points.',
    trapWarningNe: 'नेपाली वा अंग्रेजी उच्चारणको साटो कोरियन उच्चारण (Seupaeneo, Penchi) बोल्नुपर्छ।',
    tip: 'Memorize all 30 common EPS workplace tools and safety equipment.',
    tipNe: 'कारखानाका ३० वटा औजार र सुरक्षा उपकरणको कोरियन नाम कण्ठ गर्नुहोस्।'
  }
];

export const KOREA_DEPENDENT_INTERVIEW: InterviewQuestionItem[] = [
  {
    id: 'kd-1',
    category: 'F-3 Visa Requirements',
    categoryNe: 'एफ-३ भिसा आवश्यकता',
    questionOriginal: '배우자의 한국 내 체류 자격과 소득은 어떻게 됩니까?',
    questionRomaji: 'Bae-uja-ui hanguk nae cheryu jagyeok-gwa soduk-eun eotteoke doemnikka?',
    questionEn: 'What is your spouse’s visa category and income in Korea?',
    questionNe: 'तपाईंको जीवनसाथीको कोरियामा भिसा वर्ग र आम्दानी कति छ?',
    modelAnswerOriginal: '제 배우자는 한국에서 전문인력 비자(E-7 또는 D-2 연구원)로 정규직 근무 중이며, 연간 소득 증명서와 외국인등록증을 구비하고 있습니다. 안정적인 가정을 꾸릴 재정적 기반이 충분합니다.',
    modelAnswerRomaji: 'Je bae-ujaneun hanguk-eseo jeonmun-inryeok bija-ro jeong-gyujik geunmu jung-imyeo, yeongan soduk jeungmyeongseowa oeguk-in deungnokjeung-eul gubi-hago iss-seumnida. Anjeongjeogin gajeong-eul kkuril jaejeongjeok giban-i chungbun-hamnida.',
    modelAnswerEn: 'My spouse is employed as a regular professional on an eligible visa (E-7 / D-2 advanced), with official annual income proof and Alien Registration Card.',
    modelAnswerNe: 'मेरो जीवनसाथी कोरियामा वैध विशेषज्ञ भिसा (E-7 आदि) मा कार्यरत हुनुहुन्छ र आम्दानी तथा विदेशी दर्ता कार्ड संलग्न छ।',
    trapWarning: 'E-9 general manufacturing visas do not qualify for F-3 family sponsorship.',
    trapWarningNe: 'E-9 भिसामा आश्रित ल्याउन पाइँदैन। भिसा श्रेणी मिल्दो भएको यकिन गर्नुहोस्।',
    tip: 'Present clear joint financial documentation and housing lease contracts.',
    tipNe: 'कोरियाको बसाइ सम्झौता (Housing lease) र कर विवरण प्रस्ट देखाउनुहोस्।'
  }
];
