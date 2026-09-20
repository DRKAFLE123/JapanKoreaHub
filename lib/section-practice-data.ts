// lib/section-practice-data.ts
// Official Exam Format Section Practice Dataset
// Covers JLPT (N5–N1), JFT-Basic, TOPIK I & II, KIIP, and EPS-TOPIK

export type PracticeSectionType =
  | 'LISTENING'
  | 'READING'
  | 'WRITING'
  | 'GRAMMAR'
  | 'VOCABULARY'
  | 'ORAL_VIVA';

export interface PracticeQuestionOption {
  text: string;
  isCorrect?: boolean;
}

export interface StarQuestion {
  id: string;
  level: string;
  leadSentence: string;      // Sentence part before the 4 blanks
  tailSentence: string;      // Sentence part after the 4 blanks
  starPosition: number;      // 0, 1, 2, or 3 (where ★ sits)
  fragments: string[];       // The 4 fragments to reorder (1-indexed options)
  correctOrder: number[];    // Indices of fragments in correct order [e.g. 1, 3, 0, 2]
  fullSentence: string;      // The completed grammatically correct sentence
  translationEn: string;
  translationNe: string;
  grammarPoint: string;
  explanation: string;
}

export interface ListeningPracticeItem {
  id: string;
  level: string;
  category: string;
  title: string;
  situation?: string;
  audioScript: string;
  translationEn: string;
  translationNe: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanationEn: string;
  explanationNe: string;
  vocabulary?: { word: string; reading?: string; meaningEn: string; meaningNe: string }[];
}

export interface ReadingPassageItem {
  id: string;
  level: string;
  genre: string; // 'Short Notice' | 'Email' | 'Information Retrieval' | 'Mid Passage' | 'Workplace Safety'
  title: string;
  passageHtml: string; // Can contain <ruby> tags or standard text
  passagePlainText: string;
  translationEn: string;
  translationNe: string;
  vocabulary: { word: string; reading?: string; meaningEn: string; meaningNe: string }[];
  questions: {
    q: string;
    options: string[];
    correctIndex: number;
    explanationEn: string;
    explanationNe: string;
  }[];
}

export interface WritingPracticeItem {
  id: string;
  level: string;
  examType: 'TOPIK2' | 'KIIP';
  questionNumber: 'Q51' | 'Q52' | 'Q53' | 'Q54' | 'KIIP_WRITING';
  title: string;
  badge: string;
  minChars?: number;
  maxChars?: number;
  prompt: string;
  instructions: string[];
  hints: string[];
  keyVocabulary: string[];
  sampleModelAnswer: string;
  rubricCriteria: { criterion: string; points: string; tip: string }[];
}

export interface OralVivaItem {
  id: string;
  level: string;
  examType: 'KIIP' | 'EPS';
  title: string;
  questionNumber: number;
  examinerPrompt: string;
  situation: string;
  audioPromptText: string;
  keyPointsToScore: string[];
  modelAnswer: string;
  modelAnswerNe: string;
  recommendedKeywords: string[];
}

// =========================================================================
// 1. JAPANESE LISTENING PRACTICE SAMPLES (JLPT & JFT)
// =========================================================================
export const JAPANESE_LISTENING_PRACTICE: ListeningPracticeItem[] = [
  {
    id: 'jlpt_n5_lis_1',
    level: 'N5',
    category: 'Task-based Comprehension (課題理解)',
    title: '駅での待ち合わせ (Meeting at the Station)',
    situation: '男の人と女の人が電話で話しています。男の人はどこで女の人を待ちますか。',
    audioScript: '男：もしもし、田中さん？今、駅に着いたよ。\n女：あ、山田君。ごめん、今バスの中にいて、あと10分くらいかかるの。\n男：そうか。じゃあ、改札口を出たところのベンチで待っていようか？\n女：今日は外が寒いから、駅の2階にある本屋さんにいてくれる？すぐ行くから。\n男：わかった。じゃあ、2階の本屋で待ってるね。',
    translationEn: 'Man: Hello, Tanaka-san? I just arrived at the station.\nWoman: Ah, Yamada-kun. Sorry, I am on the bus right now, it will take about 10 more minutes.\nMan: I see. Should I wait on the bench just outside the ticket gates?\nWoman: Today is cold outside, so could you wait in the bookstore on the 2nd floor? I will be right there.\nMan: Got it. I will wait at the 2nd-floor bookstore then.',
    translationNe: 'केटो: हेल्लो, तानाका-सान? म भर्खर स्टेशन आइपुगेँ।\nकेटी: ए यामादा-कुन! माफ गर, म अहिले बसमा छु, १० मिनेट जति लाग्छ।\nकेटो: ए हो? त्यसो भए टिकट गेट बाहिरको बेन्चमा कुरूँ त?\nकेटी: आज बाहिर चिसो छ, त्यसैले २ तल्लाको किताब पसलमा कुरिदिन सक्छौ? म तुरुन्तै आउँछु।\nकेटो: बुझेँ। त्यसो भए दोस्रो तल्लाको किताब पसलमै कुर्दै गर्छु।',
    question: '男の人はどこで女の人を待ちますか。(Where will the man wait for the woman?)',
    options: [
      '改札口のベンチ (Bench by the ticket gate)',
      'バス停の前 (In front of the bus stop)',
      '駅の2階の本屋 (Bookstore on the 2nd floor)',
      '駅の外の喫茶店 (Coffee shop outside the station)',
    ],
    correctIndex: 2,
    explanationEn: 'The woman says "駅の2階にある本屋さんにいてくれる？" and the man agrees "じゃあ、2階の本屋で待ってるね", making option 3 the correct answer.',
    explanationNe: 'केटीले बाहिर चिसो भएकाले २ तल्लाको किताब पसलमा कुर्न आग्रह गर्छिन् र केटोले पनि त्यहीँ कुर्न स्वीकार गर्छ, त्यसैले विकल्प ३ सही हो।',
    vocabulary: [
      { word: '改札口', reading: 'かいさつぐち', meaningEn: 'Ticket gate', meaningNe: 'टिकट गेट' },
      { word: '本屋', reading: 'ほんや', meaningEn: 'Bookstore', meaningNe: 'किताब पसल' },
      { word: '待つ', reading: 'まつ', meaningEn: 'To wait', meaningNe: 'पर्खनु' },
    ],
  },
  {
    id: 'jlpt_n4_lis_1',
    level: 'N4',
    category: 'Key Points (ポイント理解)',
    title: '週末の旅行の相談 (Discussing a Weekend Trip)',
    situation: '大学で男の学生と女の学生が話しています。2人はなぜ電車で行くことにしましたか。',
    audioScript: '女：ねえ、今度の土曜日、京都へ行く約束だけど、どうやって行く？\n男：車で行こうかと思ったけど、週末は高速道路がすごく渋滞するらしいよ。\n女：そうだね。新幹線は速いけど、ちょっと高いかな。\n男：普通の電車なら、時間はかかるけど安くて時間も正確だし、のんびり景色も見られるよ。\n女：いいね！学生割引の切符もあるし、電車にしよう！',
    translationEn: 'Woman: Hey, regarding our trip to Kyoto this Saturday, how shall we go?\nMan: I thought about driving, but apparently the highways get heavily congested on weekends.\nWoman: That\'s true. Shinkansen is fast, but it is a bit expensive.\nMan: If we take the regular train, it takes more time, but it is cheap, on time, and we can relax and enjoy the scenery.\nWoman: Sounds great! There is also a student discount ticket, let\'s take the train!',
    translationNe: 'केटी: हेर त, यो शनिबार क्योटो जाने सल्लाह थियो, कसरी जाने त?\nकेटो: मैले कारमा जाने सोचेको थिएँ, तर सप्ताहन्तमा हाइवे धेरै जाम हुन्छ अरे।\nकेटी: त्यो पनि हो। सिन्कान्सेन छिटो त हुन्छ, तर अलि महँगो पर्छ।\nकेटो: सामान्य लोकल रेलमा गए समय धेरै लागे पनि सस्तो पर्छ, समयमै पुगिन्छ, र बाटोको दृश्य हेर्दै जान पाइन्छ।\nकेटी: एकदम राम्रो! विद्यार्थी छुटको टिकट पनि पाइन्छ, रेलमै जाऔँ!',
    question: '2人はなぜ普通の電車で行くことにしましたか。(Why did the two decide to go by regular train?)',
    options: [
      '一番速く着くから (Because it arrives the fastest)',
      '安くて時間通りに行けるから (Because it is cheap and punctual)',
      '車を運転できないから (Because neither can drive a car)',
      '新幹線が満席だったから (Because the Shinkansen was fully booked)',
    ],
    correctIndex: 1,
    explanationEn: 'The man noted "安くて時間も正確だし" (cheap and punctual) and the woman agreed with student discount.',
    explanationNe: 'केटोले सामान्य रेल सस्तो र समयमै पुग्ने उल्लेख गर्छ र केटीले पनि सहमति जनाउँछिन्।',
    vocabulary: [
      { word: '渋滞', reading: 'じゅうたい', meaningEn: 'Traffic congestion', meaningNe: 'ट्राफिक जाम' },
      { word: '正確', reading: 'せいかく', meaningEn: 'Punctual / Accurate', meaningNe: 'समयको पाबन्दी / सही' },
      { word: '学生割引', reading: 'がくせいわりびき', meaningEn: 'Student discount', meaningNe: 'विद्यार्थी छुट' },
    ],
  },
  {
    id: 'jft_lis_sample',
    level: 'JFT',
    category: 'Workplace & Daily Communication (店や職場でのやりとり)',
    title: 'コンビニでの買い物 (Shopping at Convenience Store)',
    situation: 'コンビニのレジで店員とお客さんが話しています。お客さんは袋をもらいますか。',
    audioScript: '店員：いらっしゃいませ。温めますか？\n客：はい、お弁当だけお願いします。\n店員：かしこまりました。レジ袋はご利用になりますか？3円になりますが。\n客：あ、マイバッグを持っているので、大丈夫です。シールのままでいいです。\n店員：承知いたしました。では温めたお弁当をそのままお渡ししますね。',
    translationEn: 'Clerk: Welcome. Would you like this heated?\nCustomer: Yes, just the bento box please.\nClerk: Understood. Would you like a shopping bag? It is 3 yen.\nCustomer: Ah, I brought my own bag, so I am fine without one. Just a tape sticker is fine.\nClerk: Understood. I will hand you the heated bento as is.',
    translationNe: 'कर्मचारी: स्वागत छ। तताइदिऊँ?\nग्राहक: हजुर, यो लन्च बक्स मात्र तताइदिनुहोस्।\nकर्मचारी: हस्। प्लास्टिकको झोला चाहिन्छ? ३ येन लाग्छ।\nग्राहक: ए, मसँग आफ्नै झोला छ, त्यसैले चाहिँदैन। टेप मात्र लगाइदिए पुग्छ।\nकर्मचारी: बुझेँ। त्यसो भए तताएको लन्च बक्स यत्तिकै दिन्छु।',
    question: 'お客さんはレジ袋をどうしますか。(What will the customer do regarding the shopping bag?)',
    options: [
      '3円払って袋をもらう (Pay 3 yen and get a bag)',
      'マイバッグがあるから断る (Decline because they have their own bag)',
      'お弁当と一緒に袋も温めてもらう (Have the bag heated with the bento)',
      '大きいサイズの袋を買い直す (Buy a larger size bag)',
    ],
    correctIndex: 1,
    explanationEn: 'The customer says "マイバッグを持っているので、大丈夫です" (I have my own bag so I am fine), declining the plastic bag.',
    explanationNe: 'ग्राहकले "आफ्नै झोला छ त्यसैले चाहिँदैन" भन्दै झोला लिन अस्वीकार गर्छ।',
    vocabulary: [
      { word: 'レジ袋', reading: 'れじぶくろ', meaningEn: 'Plastic grocery bag', meaningNe: 'प्लास्टिकको किनमेल झोला' },
      { word: '温める', reading: 'あたためる', meaningEn: 'To heat up / microwave', meaningNe: 'तताउनु' },
    ],
  },
];

// =========================================================================
// 2. JAPANESE READING PRACTICE PASSAGES (JLPT & JFT)
// =========================================================================
export const JAPANESE_READING_PRACTICE: ReadingPassageItem[] = [
  {
    id: 'jlpt_n5_rd_1',
    level: 'N5',
    genre: 'Information Retrieval (情報検索)',
    title: '図書館の利用案内 (Library Notice & Hours)',
    passageHtml: `
<div class="space-y-2 text-xs sm:text-sm">
  <p class="font-bold text-slate-800 dark:text-slate-100 border-b pb-1">【さくら市図書館からのおしらせ】</p>
  <p>さくら図書館は、月曜日から金曜日まで午前9時から午後8時まで開いています。</p>
  <p>土曜日と日曜日は午前9時から午後5時までです。</p>
  <p><span class="text-rose-600 font-black">【休みの日】</span>：毎週火曜日と、毎月さいごの水曜日。</p>
  <p>本は一人5さつまで、2しゅうかん借りることができます。</p>
  <p class="text-slate-500 text-[11px]">*CDやDVDは1人2枚まで、1週間借りられます。</p>
</div>
    `,
    passagePlainText: '【さくら市図書館からのおしらせ】\nさくら図書館は、月曜日から金曜日まで午前9時から午後8時まで開いています。土曜日と日曜日は午前9時から午後5時までです。\n【休みの日】：毎週火曜日と、毎月さいごの水曜日。\n本は一人5さつまで、2しゅうかん借りることができます。',
    translationEn: '[Sakura City Library Announcement]\nSakura Library is open Monday through Friday from 9:00 AM to 8:00 PM. On Saturdays and Sundays, it is open from 9:00 AM to 5:00 PM.\n[Closed days]: Every Tuesday and the last Wednesday of each month.\nEach person can borrow up to 5 books for 2 weeks.',
    translationNe: '[साकुरा नगर पुस्तकालयको सूचना]\nसाकुरा पुस्तकालय सोमबारदेखि शुक्रबार बिहान ९ बजेदेखि बेलुकी ८ बजेसम्म खुल्छ। शनिबार र आइतबार बिहान ९ बजेदेखि साँझ ५ बजेसम्म खुल्छ।\n[बन्द हुने दिन]: प्रत्येक मंगलबार र प्रत्येक महिनाको अन्तिम बुधबार।\nएक जनाले ५ वटासम्म किताब २ हप्ताका लागि सापटी लिन सक्छन्।',
    vocabulary: [
      { word: '開く', reading: 'あく', meaningEn: 'To be open', meaningNe: 'खुल्नु' },
      { word: '借りる', reading: 'かりる', meaningEn: 'To borrow', meaningNe: 'सापटी लिनु' },
      { word: '休みの日', reading: 'やすみのひ', meaningEn: 'Closed day / Holiday', meaningNe: 'बिदाको दिन' },
    ],
    questions: [
      {
        q: 'さくら図書館について、正しいものはどれですか。(Which is correct about Sakura Library?)',
        options: [
          '火曜日の午後3時に行くことができる (You can visit on Tuesday at 3 PM)',
          '本を6さつ借りることができる (You can borrow 6 books)',
          '土曜日の午後6時に開いている (It is open on Saturday at 6 PM)',
          '金曜日の午後7時に本を借りることができる (You can borrow books on Friday at 7 PM)',
        ],
        correctIndex: 3,
        explanationEn: 'Friday is open until 8:00 PM (午後8時まで), so you can borrow books at 7:00 PM. Tuesday is closed, Saturday closes at 5:00 PM, and max books is 5.',
        explanationNe: 'शुक्रबार बेलुकी ८ बजेसम्म खुल्ने भएकाले बेलुकी ७ बजे किताब लिन सकिन्छ। मंगलबार बन्द हुन्छ, शनिबार ५ बजे बन्द हुन्छ र ५ वटा मात्र किताब लिन पाइन्छ।',
      },
    ],
  },
  {
    id: 'jlpt_n4_rd_1',
    level: 'N4',
    genre: 'Short Passage (短文読解)',
    title: 'ゴミの分別ルール (Apartment Trash Sorting Rules)',
    passageHtml: `
<div class="space-y-2 text-xs sm:text-sm">
  <p class="font-bold text-slate-800 dark:text-slate-100 border-b pb-1">【アパートの住人のみなさまへ】</p>
  <p>最近、指定されたゴミ袋を使っていない人が多くて困っています。燃えるゴミは必ず市の「黄色い指定袋」に入れて出してください。</p>
  <p>また、ペットボトルやビン・缶は水で洗ってから、透明な袋に別々に入れて出してください。ゴミを出す時間は、回収日の朝8時までです。前日の夜に出すとカラスが集まるので、絶対にやめてください。</p>
</div>
    `,
    passagePlainText: '【アパートの住人のみなさまへ】\n最近、指定されたゴミ袋を使っていない人が多くて困っています。燃えるゴミは必ず市の「黄色い指定袋」に入れて出してください。\nまた、ペットボトルやビン・缶は水で洗ってから、透明な袋に別々に入れて出してください。ゴミを出す時間は、回収日の朝8時までです。前日の夜に出すとカラスが集まるので、絶対にやめてください。',
    translationEn: '[To all apartment residents]\nRecently, we have been troubled because many people are not using designated trash bags. Please make sure to put burnable garbage into the city\'s "yellow designated bag".\nAlso, rinse plastic bottles, glass bottles, and aluminum cans with water, and put them in separate clear bags. Trash must be put out by 8:00 AM on collection morning. Do not put it out the night before as crows gather.',
    translationNe: '[अपार्टमेन्टका सम्पूर्ण बासिन्दाहरूलाई]\nहालसालै तोकिएको फोहोरको झोला प्रयोग नगर्ने व्यक्तिहरू धेरै भएर समस्या भएको छ। जलाउन मिल्ने फोहोर अनिवार्य रूपमा सहरको "पहेंलो तोकिएको झोला" मा राखेर निकाल्नुहोस्।\nसाथै, प्लास्टिकका बोतल, सिसी र क्यानहरू पानीले पखालेर छुट्टाछुट्टै पारदर्शी झोलामा राख्नुहोस्। फोहोर बिहान ८ बजेभित्र निकाल्नुपर्छ। अघिल्लो दिन राती निकाल्दा कागहरू आउने भएकाले राती ननिकाल्नुहोला।',
    vocabulary: [
      { word: '燃えるゴミ', reading: 'もえるごみ', meaningEn: 'Burnable trash', meaningNe: 'जलाउन मिल्ने फोहोर' },
      { word: '指定袋', reading: 'していぶくろ', meaningEn: 'Designated trash bag', meaningNe: 'तोकिएको झोला' },
      { word: '回収日', reading: 'かいしゅうび', meaningEn: 'Collection day', meaningNe: 'फोहोर संकलन दिन' },
    ],
    questions: [
      {
        q: 'ゴミの出し方について、注意されていることは何ですか。(What is the caution regarding trash disposal?)',
        options: [
          '前日の夜9時にゴミを出さなければならない (Must put trash out at 9 PM the previous night)',
          '燃えるゴミは青い袋に入れて出す (Put burnable trash in a blue bag)',
          '朝8時までに出し、前日の夜には出さない (Put out by 8 AM, do not put out the night before)',
          'ペットボトルは洗わずにそのまま袋に入れる (Put plastic bottles without washing them)',
        ],
        correctIndex: 2,
        explanationEn: 'The passage explicitly says "ゴミを出す時間は、回収日の朝8時までです。前日の夜に出すとカラスが集まるので、絶対にやめてください。"',
        explanationNe: 'सूचनामा बिहान ८ बजेभित्र फोहोर निकाल्न र अघिल्लो रात काग लाग्ने हुनाले ननिकाल्न स्पष्ट भनिएको छ।',
      },
    ],
  },
];

// =========================================================================
// 3. JAPANESE STAR QUESTIONS (JLPT 文の組み立て ★)
// =========================================================================
export const JAPANESE_STAR_QUESTIONS: StarQuestion[] = [
  {
    id: 'star_n5_1',
    level: 'N5',
    leadSentence: '私は',
    tailSentence: 'を飲みました。',
    starPosition: 2, // 3rd blank (0, 1, 2, 3)
    fragments: ['喫茶店で', '友達と', 'つめたい', 'ジュース'],
    correctOrder: [1, 0, 2, 3], // 友達と (1) 喫茶店で (0) つめたい (2) ジュース (3)
    fullSentence: '私は友達と喫茶店でつめたいジュースを飲みました。',
    translationEn: 'I drank cold juice with my friend at the coffee shop.',
    translationNe: 'मैले साथीसँग कफी सपमा चिसो जुस पिएँ।',
    grammarPoint: '[Person と] + [Place で] + [Modifier] + [Noun を 飲む]',
    explanation: 'Sentence structure flows: Subject (私は) + Partner (友達と) + Location (喫茶店で) + Adjective (つめたい) + Star [★ = つめたい] + Object (ジュース) + Verb (を飲みました)。Position 3 (star index 2) is "つめたい".',
  },
  {
    id: 'star_n4_1',
    level: 'N4',
    leadSentence: '日曜日、',
    tailSentence: '予定です。',
    starPosition: 2,
    fragments: ['家族に', '手紙を', '書く', 'つもりで'],
    correctOrder: [0, 1, 2, 3], // 家族に (0) 手紙を (1) 書く (2) つもりで (3)
    fullSentence: '日曜日、家族に手紙を書くつもりで予定です。',
    translationEn: 'On Sunday, I plan to write a letter to my family.',
    translationNe: 'आइतबार परिवारलाई चिठी लेख्ने योजना छ।',
    grammarPoint: 'Recipient に + Object を + Verb Dictionary Form + 予定',
    explanation: 'Correct flow is 家族に (1) 手紙を (2) 書く (3:★) 予定です。The star sits on 書く.',
  },
  {
    id: 'star_n3_1',
    level: 'N3',
    leadSentence: 'どんなに忙しくても、',
    tailSentence: 'ようにしています。',
    starPosition: 2,
    fragments: ['健康の', '毎日30分は', 'ために', '運動する'],
    correctOrder: [0, 2, 1, 3], // 健康の (0) ために (2) 毎日30分は (1) 運動する (3)
    fullSentence: 'どんなに忙しくても、健康のために毎日30分は運動するようにしています。',
    translationEn: 'No matter how busy I am, I make an effort to exercise for at least 30 minutes every day for my health.',
    translationNe: 'जतिसुकै व्यस्त भए तापनि, स्वास्थ्यका खातिर दैनिक कम्तीमा ३० मिनेट व्यायाम गर्ने प्रयास गर्छु।',
    grammarPoint: '〜のために (For the sake of) + 〜ようにしている (Making a conscious effort to)',
    explanation: '健康の (1) ために (2) 毎日30分は (3:★) 運動する (4) ようにしています。The star lands on "毎日30分は".',
  },
];

// =========================================================================
// 4. KOREAN WRITING SAMPLES (TOPIK II Q51, Q52, Q53, Q54 & KIIP)
// =========================================================================
export const KOREAN_WRITING_PRACTICE: WritingPracticeItem[] = [
  {
    id: 'topik2_q51_1',
    level: 'TOPIK3',
    examType: 'TOPIK2',
    questionNumber: 'Q51',
    title: 'Q51: 실용문 빈칸 채우기 (Email / Notice Fill-in)',
    badge: 'TOPIK II 쓰기 51번 (10점)',
    prompt: `[다음 안내문을 읽고 ㉠과 ㉡에 들어갈 알맞은 말을 쓰십시오.]

제목: 한국어 교재 나눔합니다.
한국어 공부를 끝내서 제가 보던 TOPIK II 교재를 필요하신 분께 드리고 싶습니다.
책 상태는 매우 깨끗하며 필기도 거의 없습니다.
책을 받고 싶으신 분은 이번 주 금요일까지 이메일로 연락 ( ㉠ ).
신청자가 많을 경우 먼저 연락하신 분께 책을 ( ㉡ ). 감사합니다.`,
    instructions: [
      '격식체 높임말(~(으)시기 바랍니다, ~겠습니다, ~아/어 드리겠습니다)을 정확하게 사용해야 합니다.',
      '앞뒤 문맥과 접속사(호응 관계)를 반드시 확인하십시오.',
    ],
    hints: [
      '㉠: 이메일로 연락을 달라는 정중한 요청 표현 → [주시기 바랍니다 / 주십시오]',
      '㉡: 먼저 연락한 사람에게 책을 주겠다는 약속/의지 표현 → [드리겠습니다 / 드릴 예정입니다]',
    ],
    keyVocabulary: ['연락 주시기 바랍니다', '보내 드리겠습니다', '드리려고 합니다'],
    sampleModelAnswer: '㉠ 주시기 바랍니다 (또는 해 주십시오)\n㉡ 드리겠습니다 (또는 보내 드리겠습니다)',
    rubricCriteria: [
      { criterion: '문맥 호응 (Contextual fit)', points: '5점', tip: '앞 문장 목적과 정중한 요청 표현이 맞는지' },
      { criterion: '어미 활용 (Grammar & Honorifics)', points: '5점', tip: '격식체 높임 어미(-시기 바랍니다/-겠습니다) 준수' },
    ],
  },
  {
    id: 'topik2_q52_1',
    level: 'TOPIK3',
    examType: 'TOPIK2',
    questionNumber: 'Q52',
    title: 'Q52: 설명문 빈칸 채우기 (Explanatory Fill-in)',
    badge: 'TOPIK II 쓰기 52번 (10점)',
    prompt: `[다음 글을 읽고 ㉠과 ㉡에 들어갈 알맞은 말을 쓰십시오.]

사람들은 피곤할 때 단 음식을 찾는다. 단 음식을 먹으면 혈당이 빠르게 올라가 기분이 좋아지기 때문이다.
그러나 단 음식을 너무 많이 먹으면 건강에 ( ㉠ ).
따라서 피로를 풀기 위해서는 단 음식에 의존하기보다 충분한 수면과 가벼운 스트레칭을 하는 것이 ( ㉡ ).`,
    instructions: [
      '설명문이므로 평서문 종결어미(-ㄴ/는다, -아/어지다, -는 것이 좋다)를 사용해야 합니다.',
      '반대 접속사 "그러나"와 결론 표현 "따라서 ~하는 것이 좋다"의 구조를 파악하세요.',
    ],
    hints: [
      '㉠: 단 음식을 과하게 먹었을 때의 부정적 영향 → [해롭다 / 안 좋은 영향을 미친다 / 나쁠 수 있다]',
      '㉡: 피로를 푸는 바람직한 방법 추천 → [좋다 / 바람직하다 / 도움이 된다]',
    ],
    keyVocabulary: ['건강에 해롭다', '도움이 된다', '바람직하다'],
    sampleModelAnswer: '㉠ 해로울 수 있다 (또는 안 좋다 / 부정적인 영향을 미친다)\n㉡ 좋다 (또는 바람직하다 / 더 효과적이다)',
    rubricCriteria: [
      { criterion: '반대 논리 호응 (Logical opposition)', points: '5점', tip: '"그러나" 뒤에 오는 부정적 결과 제시' },
      { criterion: '해결책 종결 (Conclusion statement)', points: '5점', tip: '"~하는 것이 좋다/바람직하다" 설명문체' },
    ],
  },
  {
    id: 'topik2_q53_1',
    level: 'TOPIK3',
    examType: 'TOPIK2',
    questionNumber: 'Q53',
    title: 'Q53: 자료 분석형 글쓰기 (Data & Graph Report)',
    badge: 'TOPIK II 쓰기 53번 (30점) • 200~300자',
    minChars: 200,
    maxChars: 300,
    prompt: `[다음을 참고하여 "국내 1인 가구의 변화"에 대해 200~300자로 글을 쓰십시오.]

1. 조사 기관: 통계청 (2015년 ~ 2023년)
2. 1인 가구 비율 변화:
   - 2015년: 27.2% → 2023년: 34.5% (약 7.3%p 지속적 증가)
3. 증가 원인:
   - 청년층의 독립 및 비혼 선호 증가
   - 고령화로 인한 독거노인 증가
4. 향후 전망:
   - 2030년에는 전체 가구의 40%에 육박할 것으로 예상됨`,
    instructions: [
      '자신의 주관적 의견을 쓰지 말고, 제시된 자료와 수치만을 객관적으로 서술하십시오.',
      '글자 수는 200~300자 이내로 작성하십시오 (원고지 분량 준수).',
      '설명문 어미(~(으)ㄴ 것으로 나타났다, ~때문인 것으로 보인다, ~전망이다)를 사용하십시오.',
    ],
    hints: [
      '도입: 통계청에서 1인 가구의 변화에 대해 조사한 결과에 따르면...',
      '수치 제시: 2015년 27.2%에서 2023년 34.5%로 크게 증가하였다.',
      '원인 분석: 이러한 증가 원인으로는 청년층의 독립과 고령화로 인한 독거노인 증가를 들 수 있다.',
      '전망: 앞으로도 이러한 추세가 이어져 2030년에는 40%에 달할 것으로 전망된다.',
    ],
    keyVocabulary: [
      '조사한 결과에 따르면',
      '지속적으로 증가하고 있다',
      '증가 원인으로는 ~을 들 수 있다',
      '~할 것으로 전망된다/예상된다',
    ],
    sampleModelAnswer: `통계청에서 1인 가구의 변화에 대해 조사한 결과에 따르면, 1인 가구의 비율은 2015년 27.2%에서 2023년 34.5%로 꾸준히 증가한 것으로 나타났다.
이러한 증가 원인으로는 첫째, 청년층의 독립과 비혼 선호 경향이 증가했기 때문이며, 둘째, 고령화로 인해 홀로 사는 노인이 늘어났기 때문이다.
앞으로도 이러한 추세가 지속되어 2030년에는 1인 가구의 비율이 전체 가구의 40%에 육박할 것으로 전망된다.`,
    rubricCriteria: [
      { criterion: '내용 충실성 (Content completeness)', points: '10점', tip: '제시된 기관, 수치, 원인, 전망을 빠짐없이 기술했는가' },
      { criterion: '글의 전개 (Logical flow)', points: '10점', tip: '도입 → 변화 추이 → 원인 분석 → 전망의 유기적 구성' },
      { criterion: '어휘 및 문법 (Vocabulary & Grammar)', points: '10점', tip: '자료 서술 전문 표현 및 정확한 맞춤법' },
    ],
  },
  {
    id: 'topik2_q54_1',
    level: 'TOPIK3',
    examType: 'TOPIK2',
    questionNumber: 'Q54',
    title: 'Q54: 논술형 에세이 (Argumentative Essay)',
    badge: 'TOPIK II 쓰기 54번 (50점) • 600~700자',
    minChars: 600,
    maxChars: 700,
    prompt: `[다음을 주제로 하여 600~700자로 자신의 생각을 논리적으로 글을 쓰십시오.]

주제: 현대 사회에서 '인공지능(AI)의 발전'과 우리의 태도
1. 인공지능의 발전이 우리의 삶에 가져온 긍정적인 변화는 무엇인가?
2. 인공지능의 발전으로 인해 발생할 수 있는 문제점은 무엇인가?
3. 이러한 시대에 우리는 어떤 자세를 가져야 하는가?`,
    instructions: [
      '문제에서 제시한 3가지 질문을 반드시 3개 단락(서론·본론1·본론2·결론)으로 나누어 논리적으로 전개하십시오.',
      '구어체나 높임말(~요, ~습니다)을 쓰지 말고, 논설문 격식 어미(~다, ~ㄴ/는다)를 사용하십시오.',
      '분량은 600자 이상 700자 이하를 엄격히 준수하십시오.',
    ],
    hints: [
      '서론: AI 기술의 급격한 발전과 일상 속 확산 배경.',
      '본론 1 (장점): 업무 효율성 극대화, 의료 진단, 삶의 편리함 증대.',
      '본론 2 (문제점): 일자리 감소 우려, 개인정보 유출, 윤리적 판단 한계.',
      '결론 (대응 자세): AI를 맹신하기보다 인간 중심의 윤리 기준을 세우고 공존하는 역량 배양.',
    ],
    keyVocabulary: [
      '급격한 기술 발전',
      '업무 효율성을 제고하다',
      '일자리 감소와 윤리적 문제',
      '비판적 사고력',
      '공존의 지혜를 모아야 한다',
    ],
    sampleModelAnswer: `현대 사회는 인공지능(AI) 기술의 비약적인 발전으로 인해 큰 변화를 겪고 있다. 인공지능은 이미 의료, 금융, 교육 등 다양한 분야에서 활용되며 인간의 삶을 근본적으로 변화시키고 있다.

인공지능 발전의 가장 큰 긍정적 측면은 삶의 편의성과 업무 효율성의 극대화이다. 방대한 양의 데이터를 순식간에 분석하여 질병을 조기에 진단하고, 위험하거나 반복적인 노동을 대신함으로써 인간이 보다 창의적인 일에 집중할 수 있도록 돕는다. 

하지만 인공지능의 발전은 적지 않은 부작용도 동반한다. 대표적으로 자동화로 인한 인간의 일자리 감소 문제를 꼽을 수 있다. 또한, 알고리즘 편향성으로 인한 불평등이나 데이터 오남용, 기계의 오작동 시 책임 소재 문제 등 윤리적 과제도 심각하게 대두되고 있다.

따라서 우리는 기술을 맹신하거나 두려워하기보다는, 인간 중심의 가치관을 바탕으로 기술을 올바르게 활용하는 자세를 가져야 한다. 인공지능 개발과 활용에 대한 명확한 윤리적 규범을 확립하고, 인간 고유의 비판적 사고력과 공감 능력을 키워 인공지능과 지혜롭게 공존해 나가야 할 것이다.`,
    rubricCriteria: [
      { criterion: '주제 적합성 (Topic relevance)', points: '15점', tip: '3가지 질문 항목을 누락 없이 다루었는가' },
      { criterion: '논리적 구성 (Structural coherence)', points: '15점', tip: '서론-본론-결론의 유기적 단락 연결' },
      { criterion: '언어 사용 (Grammar & Style)', points: '20점', tip: '고급 어휘 사용, 피동/사동, 격식적 종결어미' },
    ],
  },
  {
    id: 'kiip_writing_1',
    level: 'KIIP',
    examType: 'KIIP',
    questionNumber: 'KIIP_WRITING',
    title: 'KIIP 주관식 작문: 한국에서의 분리수거',
    badge: 'KIIP 종합평가 주관식 5줄 작문',
    minChars: 100,
    maxChars: 200,
    prompt: `[다음 질문에 답하여 5문장 내외로 자신의 생각이나 경험을 쓰십시오.]

주제: 한국의 쓰레기 분리수거 방법
1. 한국에서는 쓰레기를 어떻게 나누어 버립니까?
2. 재활용품을 버릴 때 주의할 점은 무엇입니까?
3. 분리수거를 잘하면 어떤 좋은 점이 있습니까?`,
    instructions: [
      '5문장 정도로 작성하십시오 (100자~200자 내외).',
      '설명문 어미(~(으)ㄴ/는다, ~해야 한다, ~기 때문이다)를 적절히 사용하십시오.',
    ],
    hints: [
      '한국에서는 일반 쓰레기, 음식물 쓰레기, 재활용 쓰레기로 분리수거를 합니다.',
      '일반 쓰레기와 음식물 쓰레기는 종량제 봉투에 담아 버려야 합니다.',
      '페트병이나 캔은 물로 깨끗이 씻어서 배출해야 합니다.',
      '분리배출을 철저히 하면 환경을 보호하고 자원을 절약할 수 있습니다.',
    ],
    keyVocabulary: ['종량제 봉투', '분리수거', '재활용품', '환경 보호'],
    sampleModelAnswer: `한국에서는 쓰레기를 일반 쓰레기, 음식물 쓰레기, 재활용품으로 나누어 버립니다. 일반 쓰레기와 음식물 쓰레기는 반드시 규격 종량제 봉투를 사서 버려야 합니다. 그리고 플라스틱이나 캔은 내용물을 깨끗이 씻고 라벨을 떼어내서 배출해야 합니다. 이렇게 분리수거를 잘하면 환경을 깨끗하게 지키고 자원을 재활용하는 데 큰 도움이 됩니다.`,
    rubricCriteria: [
      { criterion: '한국 사회 이해 (Social understanding)', points: 'Pass/Fail', tip: '종량제 봉투 및 분리수거 규정 이해' },
      { criterion: '문장 완성도 (Sentence structure)', points: 'Score', tip: '자연스러운 연결어미 및 한국어 어법' },
    ],
  },
];

// =========================================================================
// 5. KOREAN ORAL INTERVIEW & VIVA (KIIP 구술시험 & EPS 직무구술)
// =========================================================================
export const KOREAN_ORAL_VIVA_PRACTICE: OralVivaItem[] = [
  {
    id: 'kiip_oral_1',
    level: 'KIIP',
    examType: 'KIIP',
    questionNumber: 1,
    title: 'KIIP 구술시험 1번: 자기소개 및 한국 생활',
    situation: '면접관 2명이 응시자의 한국어 구사 능력과 체류 동기를 평가합니다.',
    examinerPrompt: '먼저 간단하게 자기소개를 해 주시고, 한국에 오게 된 이유와 한국에서 살면서 가장 인상 깊었던 점을 말씀해 보세요.',
    audioPromptText: '먼저 간단하게 자기소개를 해 주시고, 한국에 오게 된 이유와 한국에서 살면서 가장 인상 깊었던 점을 말씀해 보세요.',
    keyPointsToScore: [
      '출신 국가, 체류 기간, 현재 직업/학업 소개',
      '한국 체류 목적의 명확성',
      '한국 생활에서의 긍정적인 문화 적응 경험',
    ],
    modelAnswer: '안녕하십니까. 저는 네팔에서 온 라메시라고 합니다. 한국에 온 지는 약 3년이 되었습니다. 저는 선진 기술을 배우고 성실하게 일하기 위해 한국에 오게 되었습니다. 한국에 살면서 대중교통이 매우 편리하고, 이웃들이 친절하게 도와주어 빠르게 적응할 수 있었던 점이 가장 인상 깊었습니다. 앞으로도 한국 사회의 일원으로서 열심히 살아가고 싶습니다.',
    modelAnswerNe: 'नमस्ते। म नेपालबाट आएको रमेश हुँ। म कोरिया आएको करिब ३ वर्ष भयो। म उन्नत प्रविधि सिक्न र लगनशीलताका साथ काम गर्न कोरिया आएको हुँ। कोरियामा बस्दा सार्वजनिक यातायात अत्यन्तै सहज हुनु र छिमेकीहरूले सहयोग गरिदिएर छिट्टै घुलमिल हुन सकेको कुरा मलाई सबैभन्दा मन पर्यो। भविष्यमा पनि कोरियाली समाजको एक जिम्मेवार सदस्यको रूपमा इमान्दारीपूर्वक जीवन बिताउन चाहन्छु।',
    recommendedKeywords: ['자기소개', '적응하다', '대중교통', '성실하게', '이웃'],
  },
  {
    id: 'kiip_oral_2',
    level: 'KIIP',
    examType: 'KIIP',
    questionNumber: 2,
    title: 'KIIP 구술시험 2번: 한국의 이웃 문화와 층간소음',
    situation: '공동주택 거주 시 발생하는 갈등 해결 및 배려 문화에 대한 질문입니다.',
    examinerPrompt: '아파트나 빌라 같은 공동주택에 살 때 위층이나 아래층 이웃 간에 층간소음 문제가 생길 수 있습니다. 이를 예방하거나 해결하기 위해 어떤 노력을 해야 할까요?',
    audioPromptText: '아파트나 빌라 같은 공동주택에 살 때 이웃 간에 층간소음 문제가 생길 수 있습니다. 이를 예방하거나 해결하기 위해 어떤 노력을 해야 할까요?',
    keyPointsToScore: [
      '층간소음의 원인 인지 (늦은 밤 세탁기, 아이들 뛰는 소리 등)',
      '예방 방법 제시 (슬리퍼 착용, 소음 매트 설치)',
      '갈등 발생 시 대화와 중재 절차 활용',
    ],
    modelAnswer: '공동주택에서는 밤늦은 시간에 청소기나 세탁기 사용을 자제하고, 실내에서는 슬리퍼를 신거나 매트를 깔아 발소리를 줄여야 합니다. 만약 이웃 간에 소음으로 불편함이 생기면 직접 찾아가서 화를 내기보다는 관리사무소를 통해 정중하게 양해를 구하고 대화로 서로 배려하는 것이 중요하다고 생각합니다.',
    modelAnswerNe: 'अपार्टमेन्टजस्ता संयुक्त घरमा राती अबेर भ्याकुम क्लिनर वा वाशिङ मेसिन चलाउनु हुँदैन र घरभित्र चप्पल लगाउने वा म्याट ओछ्याएर हिँडाइको आवाज कम गर्नुपर्छ। यदि छिमेकीबीच आवाजले समस्या भइहालेमा पनि सिधै गएर रिसाउनुको सट्टा व्यवस्थापन कार्यालयमार्फत विनम्रतापूर्वक अनुरोध गरेर संवादद्वारा एकअर्कालाई सम्मान गर्नु महत्त्वपूर्ण हुन्छ।',
    recommendedKeywords: ['층간소음', '공동주택', '배려하다', '양해를 구하다', '슬리퍼'],
  },
  {
    id: 'eps_viva_1',
    level: 'EPS',
    examType: 'EPS',
    questionNumber: 1,
    title: 'EPS-TOPIK 직무구술: 작업장 안전 및 비상상황 조치',
    situation: '공장 작업장에서 화재나 기계 고장 비상상황이 발생했을 때의 행동 요령을 평가합니다.',
    examinerPrompt: '작업 도중에 기계에서 이상한 소리가 나거나 불이 났을 때 어떻게 행동해야 합니까?',
    audioPromptText: '작업 도중에 기계에서 이상한 소리가 나거나 불이 났을 때 어떻게 행동해야 합니까?',
    keyPointsToScore: [
      '비상 정지 버튼(Emergency Stop) 즉시 누르기',
      '반장님/관리자에게 즉시 보고하기',
      '화재 시 "불이야" 외치고 소화기 사용 및 안전지대 대피',
    ],
    modelAnswer: '기계에서 이상한 소리가 나면 즉시 비상 정지 버튼을 눌러 기계를 멈추고 반장님께 바로 보고하겠습니다. 그리고 불이 났을 때는 큰 소리로 "불이야" 하고 외쳐 동료들에게 알린 후, 소화기로 초기 진화를 시도하고 비상구를 통해 신속히 안전한 곳으로 대피하겠습니다.',
    modelAnswerNe: 'यदि मेसिनबाट अनौठो आवाज आयो भने तुरुन्तै इमरजेन्सी स्टप बटन थिचेर मेसिन रोक्नेछु र सुपरभाइजरलाई तुरुन्त रिपोर्ट गर्नेछु। र आगो लाग्यो भने ठूलो स्वरले "आगो लाग्यो" भनेर साथीहरूलाई सतर्क गराउनेछु, त्यसपछि फायर एक्स्टिंग्विशरले निभाउने प्रयास गर्दै आपतकालीन ढोकाबाट सुरक्षित ठाउँमा भाग्नेछु।',
    recommendedKeywords: ['비상 정지 버튼', '보고하다', '소화기', '대피하다', '안전모'],
  },
];
