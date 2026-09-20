// lib/jft-listening-data.ts
// JFT-Basic Listening Practice Test 01 (Official CBT Simulator)
// Level: JFT-Basic A1–A2 | 12 Original Questions across 3 Official Categories

export interface JFTListeningVocab {
  kanji: string;
  reading: string;
  meaningEn: string;
  meaningNe: string;
}

export interface JFTListeningQuestion {
  id: string;
  level: 'JFT';
  mockSet: 'JFT_LISTENING_01';
  section: 'LISTENING';
  category: '社交的なやりとり' | '店や公共機関でのやりとり' | '指示・アナウンス';
  categoryEn: string;
  categoryNe: string;
  situation: string;
  promptEn: string;
  promptNe: string;
  audioScript: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  transcript: string;
  transcriptNepali: string;
  vocabulary: JFTListeningVocab[];
}

export const JFT_LISTENING_01_QUESTIONS: JFTListeningQuestion[] = [
  // =========================================================================
  // Section 1 — 社交的なやりとり (Understanding everyday / social conversations)
  // =========================================================================
  {
    id: 'jft_l_01',
    level: 'JFT',
    mockSet: 'JFT_LISTENING_01',
    section: 'LISTENING',
    category: '社交的なやりとり',
    categoryEn: 'Social interaction in daily life',
    categoryNe: 'दैनिक सामाजिक कुराकानी',
    situation: 'Two coworkers are talking about tomorrow.',
    promptEn: 'What time will the woman come to the office tomorrow?',
    promptNe: 'महिला भोलि कति बजे कार्यालय आउँछिन्?',
    audioScript: '男：明日、何時に会社に来ますか。\n女：いつもは八時半ですが、明日は九時に来ます。\n男：そうですか。わかりました。',
    options: ['8:00', '8:30', '9:00'],
    correctAnswer: '9:00',
    explanation: '「明日は九時に来ます」 = She will come at 9:00 tomorrow (Notice that she usually comes at 8:30, but explicitly specifies 9:00 tomorrow).',
    transcript: '男：明日、何時に会社に来ますか。\n女：いつもは八時半ですが、明日は九時に来ます。\n男：そうですか。わかりました。',
    transcriptNepali: 'पुरुष: भोलि कति बजे कम्पनी (कार्यालय) आउनुहुन्छ?\nमहिला: सधैं आठ बजेर तीस मिनेटमा आउँछु, तर भोलि नौ बजे आउँछु।\nपुरुष: ए हो र? बुझें।',
    vocabulary: [
      { kanji: '明日', reading: 'あした (ashita)', meaningEn: 'tomorrow', meaningNe: 'भोलि' },
      { kanji: '会社', reading: 'かいしゃ (kaisha)', meaningEn: 'company / office', meaningNe: 'कम्पनी / कार्यालय' },
      { kanji: '来ます', reading: 'きます (kimasu)', meaningEn: 'come', meaningNe: 'आउँछु / आउनु' },
      { kanji: '九時', reading: 'くじ (kuji)', meaningEn: "9 o'clock", meaningNe: '९ बजे' },
      { kanji: '八時半', reading: 'はちじはん (hachijihan)', meaningEn: '8:30', meaningNe: '८:३० बजे' },
    ],
  },
  {
    id: 'jft_l_02',
    level: 'JFT',
    mockSet: 'JFT_LISTENING_01',
    section: 'LISTENING',
    category: '社交的なやりとり',
    categoryEn: 'Social interaction in daily life',
    categoryNe: 'दैनिक सामाजिक कुराकानी',
    situation: 'Two friends are talking about lunch.',
    promptEn: 'What does the man want to eat?',
    promptNe: 'पुरुषले के खान चाहन्छ?',
    audioScript: '女：お昼、何を食べますか。\n男：今日はラーメンが食べたいです。\n女：じゃあ、駅の近くの店に行きましょう。',
    options: ['ラーメン', 'すし', 'カレー'],
    correctAnswer: 'ラーメン',
    explanation: '「今日はラーメンが食べたいです」 = The man says he wants to eat ramen today.',
    transcript: '女：お昼、何を食べますか。\n男：今日はラーメンが食べたいです。\n女：じゃあ、駅の近くの店に行きましょう。',
    transcriptNepali: 'महिला: दिउँसो के खानुहुन्छ?\nपुरुष: आज मलाई चाउचाउ (रामेन) खान मन लागेको छ।\nमहिला: त्यसो भए, स्टेशन नजिकैको पसलमा जाऔं।',
    vocabulary: [
      { kanji: '昼', reading: 'ひる (hiru)', meaningEn: 'noon / lunch', meaningNe: 'दिउँसो / खाना' },
      { kanji: '食べたい', reading: 'たべたい (tabetai)', meaningEn: 'want to eat', meaningNe: 'खान मन लागेको' },
      { kanji: '駅', reading: 'えき (eki)', meaningEn: 'station', meaningNe: 'स्टेशन' },
      { kanji: '近く', reading: 'ちかく (chikaku)', meaningEn: 'nearby / close', meaningNe: 'नजिक' },
      { kanji: '店', reading: 'みせ (mise)', meaningEn: 'shop / restaurant', meaningNe: 'पसल / रेस्टुरेन्ट' },
    ],
  },
  {
    id: 'jft_l_03',
    level: 'JFT',
    mockSet: 'JFT_LISTENING_01',
    section: 'LISTENING',
    category: '社交的なやりとり',
    categoryEn: 'Social interaction in daily life',
    categoryNe: 'दैनिक सामाजिक कुराकानी',
    situation: 'A coworker asks about the weekend.',
    promptEn: 'What did the woman do on Sunday?',
    promptNe: 'महिलाले आइतबार के गरिन्?',
    audioScript: '男：日曜日、何をしましたか。\n女：友達と映画を見ました。\n男：何の映画ですか。\n女：日本の映画です。とてもおもしろかったです。',
    options: ['買い物をしました。', '映画を見ました。', '友達と食事をしました。'],
    correctAnswer: '映画を見ました。',
    explanation: '「友達と映画を見ました」 = She watched a movie with her friend on Sunday.',
    transcript: '男：日曜日、何をしましたか。\n女：友達と映画を見ました。\n男：何の映画ですか。\n女：日本の映画です。とてもおもしろかったです。',
    transcriptNepali: 'पुरुष: आइतबार के गर्नुभयो?\nमहिला: साथीसँग चलचित्र (फिल्म) हेरें।\nपुरुष: कुन फिल्म हो?\nमहिला: जापानी फिल्म हो। धेरै रोचक थियो।',
    vocabulary: [
      { kanji: '日曜日', reading: 'にちようび (nichiyoubi)', meaningEn: 'Sunday', meaningNe: 'आइतबार' },
      { kanji: '友達', reading: 'ともだち (tomodachi)', meaningEn: 'friend', meaningNe: 'साथी' },
      { kanji: '映画', reading: 'えいが (eiga)', meaningEn: 'movie / film', meaningNe: 'चलचित्र / फिल्म' },
      { kanji: '見ました', reading: 'みました (mimashita)', meaningEn: 'watched / saw', meaningNe: 'हेरें' },
      { kanji: 'おもしろい', reading: 'おもしろい (omoshiroi)', meaningEn: 'interesting / fun', meaningNe: 'रोचक / रमाइलो' },
    ],
  },

  // =========================================================================
  // Section 2 — 店や公共機関でのやりとり (Shops and public places)
  // =========================================================================
  {
    id: 'jft_l_04',
    level: 'JFT',
    mockSet: 'JFT_LISTENING_01',
    section: 'LISTENING',
    category: '店や公共機関でのやりとり',
    categoryEn: 'Shops & public institutions',
    categoryNe: 'पसल तथा सार्वजनिक ठाउँमा कुराकानी',
    situation: 'A customer is buying something at a convenience store.',
    promptEn: 'How much is the drink?',
    promptNe: 'पेय पदार्थको मूल्य कति हो?',
    audioScript: '男：すみません。このジュースはいくらですか。\n店員：百五十円です。\n男：じゃあ、これをください。',
    options: ['100円', '150円', '500円'],
    correctAnswer: '150円',
    explanation: '「店員：百五十円です。」 = The shop clerk clearly replies that the juice is 150 yen.',
    transcript: '男：すみません。このジュースはいくらですか。\n店員：百五十円です。\n男：じゃあ、これをください。',
    transcriptNepali: 'ग्राहक: माफ गर्नुहोस्, यो जुस कति पर्छ?\nपसले: १५० येन हो।\nग्राहक: त्यसो भए, यो दिनुहोस्।',
    vocabulary: [
      { kanji: '店員', reading: 'てんいん (ten\'in)', meaningEn: 'shop clerk', meaningNe: 'पसले / कर्मचारी' },
      { kanji: '百五十円', reading: 'ひゃくごじゅうえん (hyaku-gojuu-en)', meaningEn: '150 yen', meaningNe: '१५० येन' },
      { kanji: 'ジュース', reading: 'じゅーす (juusu)', meaningEn: 'juice / drink', meaningNe: 'जुस / पेय पदार्थ' },
      { kanji: 'ください', reading: 'ください (kudasai)', meaningEn: 'please give me', meaningNe: 'कृपया दिनुहोस्' },
    ],
  },
  {
    id: 'jft_l_05',
    level: 'JFT',
    mockSet: 'JFT_LISTENING_01',
    section: 'LISTENING',
    category: '店や公共機関でのやりとり',
    categoryEn: 'Shops & public institutions',
    categoryNe: 'पसल तथा सार्वजनिक ठाउँमा कुराकानी',
    situation: 'A person is asking for directions at a train station.',
    promptEn: 'Where does the woman want to go?',
    promptNe: 'महिला कहाँ जान चाहन्छिन्?',
    audioScript: '女：すみません。新宿駅へ行きたいんですが。\n男：新宿駅ですか。この電車に乗ってください。\n女：ありがとうございます。',
    options: ['東京駅', '新宿駅', '渋谷駅'],
    correctAnswer: '新宿駅',
    explanation: '「新宿駅へ行きたいんですが」 = The woman clearly states that she wants to go to Shinjuku Station.',
    transcript: '女：すみません。新宿駅へ行きたいんですが。\n男：新宿駅ですか。この電車に乗ってください。\n女：ありがとうございます。',
    transcriptNepali: 'महिला: माफ गर्नुहोस्, म सिन्जुकु स्टेशन जान चाहन्थें...\nपुरुष: सिन्जुकु स्टेशन हो? यो रेलमा चढ्नुहोस्।\nमहिला: धेरै धेरै धन्यवाद।',
    vocabulary: [
      { kanji: '新宿駅', reading: 'しんじゅくえき (Shinjuku-eki)', meaningEn: 'Shinjuku Station', meaningNe: 'सिन्जुकु स्टेशन' },
      { kanji: '行きたい', reading: 'いきたい (ikitai)', meaningEn: 'want to go', meaningNe: 'जान चाहन्छु' },
      { kanji: '電車', reading: 'でんしゃ (densha)', meaningEn: 'train', meaningNe: 'रेल (ट्रेन)' },
      { kanji: '乗ってください', reading: 'のってください (notte kudasai)', meaningEn: 'please get on / ride', meaningNe: 'कृपया चढ्नुहोस्' },
    ],
  },
  {
    id: 'jft_l_06',
    level: 'JFT',
    mockSet: 'JFT_LISTENING_01',
    section: 'LISTENING',
    category: '店や公共機関でのやりとり',
    categoryEn: 'Shops & public institutions',
    categoryNe: 'पसल तथा सार्वजनिक ठाउँमा कुराकानी',
    situation: 'A customer is talking to a staff member at a department store.',
    promptEn: 'What size does the woman want?',
    promptNe: 'महिलालाई कुन साइज चाहिएको छ?',
    audioScript: '女：すみません。このシャツのMサイズはありますか。\n店員：はい、少々お待ちください。\n女：お願いします。',
    options: ['Sサイズ', 'Mサイズ', 'Lサイズ'],
    correctAnswer: 'Mサイズ',
    explanation: '「このシャツのMサイズはありますか」 = The customer asks for the M (Medium) size.',
    transcript: '女：すみません。このシャツのMサイズはありますか。\n店員：はい、少々お待ちください。\n女：お願いします。',
    transcriptNepali: 'महिला: माफ गर्नुहोस्, यो शर्टको ‘M’ साइज छ?\nकर्मचारी: हजुर, कृपया एकछिन पर्खनुहोस्।\nमहिला: हवस्, धन्यवाद।',
    vocabulary: [
      { kanji: 'シャツ', reading: 'しゃつ (shatsu)', meaningEn: 'shirt', meaningNe: 'शर्ट' },
      { kanji: 'サイズ', reading: 'さいず (saizu)', meaningEn: 'size', meaningNe: 'साइज / आकार' },
      { kanji: '少々', reading: 'しょうしょう (shoushou)', meaningEn: 'a little / short moment', meaningNe: 'एकछिन / थोरै' },
      { kanji: '待ってください', reading: 'まってください (matte kudasai)', meaningEn: 'please wait', meaningNe: 'कृपया पर्खनुहोस्' },
    ],
  },

  // =========================================================================
  // Section 3 — 指示・アナウンス (Instructions and announcements)
  // =========================================================================
  {
    id: 'jft_l_07',
    level: 'JFT',
    mockSet: 'JFT_LISTENING_01',
    section: 'LISTENING',
    category: '指示・アナウンス',
    categoryEn: 'Instructions & Announcements',
    categoryNe: 'निर्देशन तथा सार्वजनिक सूचना',
    situation: 'A train station announcement is being made.',
    promptEn: 'What should passengers do?',
    promptNe: 'यात्रुहरूले के गर्नुपर्छ?',
    audioScript: 'アナウンス：まもなく電車が来ます。黄色い線の内側でお待ちください。',
    options: ['黄色い線の外で待つ。', '黄色い線の内側で待つ。', '電車の中で待つ。'],
    correctAnswer: '黄色い線の内側で待つ。',
    explanation: '「黄色い線の内側でお待ちください」 = Please wait inside the yellow safety line.',
    transcript: 'アナウンス：まもなく電車が来ます。黄色い線の内側でお待ちください。',
    transcriptNepali: 'स्टेशन घोषणा: छिट्टै रेल आउँदैछ। कृपया पहेँलो रेखाको भित्री भागमा पर्खनुहोस्।',
    vocabulary: [
      { kanji: 'まもなく', reading: 'まもなく (mamonaku)', meaningEn: 'soon / shortly', meaningNe: 'चाँडै नै' },
      { kanji: '黄色い', reading: 'きいろい (kiiroi)', meaningEn: 'yellow', meaningNe: 'पहेँलो' },
      { kanji: '線', reading: 'せん (sen)', meaningEn: 'line', meaningNe: 'रेखा / लाइन' },
      { kanji: '内側', reading: 'うちがわ (uchigawa)', meaningEn: 'inside', meaningNe: 'भित्री भाग' },
      { kanji: 'お待ちください', reading: 'おまちください (omachi kudasai)', meaningEn: 'please wait (polite)', meaningNe: 'कृपया पर्खनुहोस्' },
    ],
  },
  {
    id: 'jft_l_08',
    level: 'JFT',
    mockSet: 'JFT_LISTENING_01',
    section: 'LISTENING',
    category: '指示・アナウンス',
    categoryEn: 'Instructions & Announcements',
    categoryNe: 'निर्देशन तथा सार्वजनिक सूचना',
    situation: 'A workplace announcement about cleaning.',
    promptEn: 'What should employees bring tomorrow?',
    promptNe: 'कर्मचारीहरूले भोलि के ल्याउनुपर्छ?',
    audioScript: '男：明日は会社の掃除があります。朝九時までに来てください。それから、手袋を持ってきてください。',
    options: ['帽子', '手袋', '傘'],
    correctAnswer: '手袋',
    explanation: '「それから、手袋を持ってきてください」 = The speaker explicitly tells employees to bring gloves (手袋).',
    transcript: '男：明日は会社の掃除があります。朝九時までに来てください。それから、手袋を持ってきてください。',
    transcriptNepali: 'पुरुष: भोलि कम्पनीको सरसफाइ छ। बिहान नौ बजेभित्र आउनुहोस्। साथै, पञ्जा लिएर आउनुहोस्।',
    vocabulary: [
      { kanji: '掃除', reading: 'そうじ (souji)', meaningEn: 'cleaning', meaningNe: 'सरसफाइ' },
      { kanji: '朝', reading: 'あさ (asa)', meaningEn: 'morning', meaningNe: 'बिहान' },
      { kanji: '手袋', reading: 'てぶくろ (tebukuro)', meaningEn: 'gloves', meaningNe: 'पञ्जा' },
      { kanji: '持ってきてください', reading: 'もってきてください (motte kite kudasai)', meaningEn: 'please bring', meaningNe: 'लिएर आउनुहोस्' },
    ],
  },
  {
    id: 'jft_l_09',
    level: 'JFT',
    mockSet: 'JFT_LISTENING_01',
    section: 'LISTENING',
    category: '指示・アナウンス',
    categoryEn: 'Instructions & Announcements',
    categoryNe: 'निर्देशन तथा सार्वजनिक सूचना',
    situation: 'A fire-safety evacuation announcement.',
    promptEn: 'Where should people go?',
    promptNe: 'मानिसहरू कहाँ जानुपर्छ?',
    audioScript: '男：火事が起きたら、エレベーターを使わないでください。階段を使って外へ出てください。そして、あさひ公園に集まってください。',
    options: ['駅', '会社', 'あさひ公園'],
    correctAnswer: 'あさひ公園',
    explanation: '「そして、あさひ公園に集まってください」 = And please gather at Asahi Park (Evacuation assembly location).',
    transcript: '男：火事が起きたら、エレベーターを使わないでください。階段を使って外へ出てください。そして、あさひ公園に集まってください。',
    transcriptNepali: 'पुरुष: आगलागी भएमा, लिफ्ट प्रयोग नगर्नुहोस्। भर्‍याङ प्रयोग गरी बाहिर निस्कनुहोस्। अनि, असाही पार्कमा भेला हुनुहोस्।',
    vocabulary: [
      { kanji: '火事', reading: 'かじ (kaji)', meaningEn: 'fire', meaningNe: 'आगलागी' },
      { kanji: '階段', reading: 'かいだん (kaidan)', meaningEn: 'stairs', meaningNe: 'भर्‍याङ' },
      { kanji: '外', reading: 'そと (soto)', meaningEn: 'outside', meaningNe: 'बाहिर' },
      { kanji: '公園', reading: 'こうえん (kouen)', meaningEn: 'park', meaningNe: 'पार्क / उद्यान' },
      { kanji: '集まってください', reading: 'あつまってください (atsumatte kudasai)', meaningEn: 'please gather', meaningNe: 'भेला हुनुहोस्' },
    ],
  },
  {
    id: 'jft_l_10',
    level: 'JFT',
    mockSet: 'JFT_LISTENING_01',
    section: 'LISTENING',
    category: '指示・アナウンス',
    categoryEn: 'Instructions & Announcements',
    categoryNe: 'निर्देशन तथा सार्वजनिक सूचना',
    situation: 'A supermarket broadcast announcement.',
    promptEn: 'What time will the supermarket close today?',
    promptNe: 'आज सुपरमार्केट कति बजे बन्द हुन्छ?',
    audioScript: 'アナウンス：本日は午後八時に閉店します。お買い物中のお客様は、八時までにレジへお越しください。',
    options: ['午後6時', '午後7時', '午後8時'],
    correctAnswer: '午後8時',
    explanation: '「本日は午後八時に閉店します」 = Today we will close at 8:00 p.m. Customers must come to the cash register by 8:00.',
    transcript: 'アナウンス：本日は午後八時に閉店します。お買い物中のお客様は、八時までにレジへお越しください。',
    transcriptNepali: 'सुपरमार्केट घोषणा: आज पसल साँझ ८ बजे बन्द हुनेछ। सामान किनमेल गरिरहनुभएका ग्राहकहरूले कृपया ८ बजेभित्र बिलिङ काउन्टरमा आउनुहोला।',
    vocabulary: [
      { kanji: '本日', reading: 'ほんじつ (honjitsu)', meaningEn: 'today (formal)', meaningNe: 'आज' },
      { kanji: '午後', reading: 'ごご (gogo)', meaningEn: 'p.m. / afternoon', meaningNe: 'दिउँसो / साँझ' },
      { kanji: '閉店', reading: 'へいてん (heiten)', meaningEn: 'store closing', meaningNe: 'पसल बन्द' },
      { kanji: '買い物', reading: 'かいもの (kaimono)', meaningEn: 'shopping', meaningNe: 'किनमेल' },
      { kanji: 'お客様', reading: 'おきゃくさま (okyakusama)', meaningEn: 'valued customer', meaningNe: 'ग्राहक महानुभाव' },
    ],
  },
  {
    id: 'jft_l_11',
    level: 'JFT',
    mockSet: 'JFT_LISTENING_01',
    section: 'LISTENING',
    category: '指示・アナウンス',
    categoryEn: 'Instructions & Announcements',
    categoryNe: 'निर्देशन तथा सार्वजनिक सूचना',
    situation: 'A workplace notification about a meeting.',
    promptEn: 'Where will the meeting take place?',
    promptNe: 'बैठक कहाँ हुनेछ?',
    audioScript: '女：明日の会議は三階の会議室で行います。いつもの部屋ではありません。間違えないでください。',
    options: ['1階の会議室', '2階の会議室', '3階の会議室'],
    correctAnswer: '3階の会議室',
    explanation: '「明日の会議は三階の会議室で行います。いつもの部屋ではありません」 = Tomorrow’s meeting is in the 3rd-floor conference room, not the usual room.',
    transcript: '女：明日の会議は三階の会議室で行います。いつもの部屋ではありません。間違えないでください。',
    transcriptNepali: 'महिला: भोलिको बैठक तेस्रो तल्लाको बैठक कोठा (कन्फरेन्स रुम) मा हुनेछ। सधैंको कोठामा होइन। झुक्किएर गल्ती नगर्नुहोला।',
    vocabulary: [
      { kanji: '会議', reading: 'かいぎ (kaigi)', meaningEn: 'meeting / conference', meaningNe: 'बैठक / सभा' },
      { kanji: '三階', reading: 'さんかい (sankai)', meaningEn: '3rd floor', meaningNe: 'तेस्रो तल्ला' },
      { kanji: '会議室', reading: 'かいぎしつ (kaigishitsu)', meaningEn: 'meeting room', meaningNe: 'बैठक कक्ष' },
      { kanji: '部屋', reading: 'へや (heya)', meaningEn: 'room', meaningNe: 'कोठा' },
      { kanji: '間違えないで', reading: 'まちがえないで (machigaenaide)', meaningEn: 'do not mistake', meaningNe: 'नझुक्किनुहोस् / गल्ती नगर्नुहोस्' },
    ],
  },
  {
    id: 'jft_l_12',
    level: 'JFT',
    mockSet: 'JFT_LISTENING_01',
    section: 'LISTENING',
    category: '指示・アナウンス',
    categoryEn: 'Workplace schedule change (A2)',
    categoryNe: 'कार्यतालिका परिवर्तन (A2 स्तर)',
    situation: 'Two coworkers discuss a change in work schedule.',
    promptEn: 'What time does the man need to come to work tomorrow?',
    promptNe: 'पुरुषले भोलि कति बजे काममा आउनुपर्छ?',
    audioScript: '女：明日の仕事ですが、いつもより早く来てください。\n男：何時ですか。\n女：いつもは八時半ですが、明日は八時までに来てください。\n男：わかりました。八時ですね。',
    options: ['7:30', '8:00', '8:30'],
    correctAnswer: '8:00',
    explanation: 'The woman states: 「いつもは八時半ですが、明日は八時までに来てください」(Usually 8:30, but please come by 8:00 tomorrow) and the man confirms: 「わかりました。八時ですね」 (8:00).',
    transcript: '女：明日の仕事ですが、いつもより早く来てください。\n男：何時ですか。\n女：いつもは八時半ですが、明日は八時までに来てください。\n男：わかりました。八時ですね。',
    transcriptNepali: 'महिला: भोलिको कामको बारेमा, सधैंभन्दा अलि छिटो आउनुहोस्।\nपुरुष: कति बजे हो?\nमहिला: सधैं साढे आठ बजे हो, तर भोलि आठ बजेसम्ममा आउनुहोस्।\nपुरुष: बुझें, आठ बजे है।',
    vocabulary: [
      { kanji: '仕事', reading: 'しごと (shigoto)', meaningEn: 'work / job', meaningNe: 'काम' },
      { kanji: '早く', reading: 'はやく (hayaku)', meaningEn: 'early', meaningNe: 'छिटो' },
      { kanji: '八時', reading: 'はちじ (hachiji)', meaningEn: "8 o'clock", meaningNe: '८:०० बजे' },
      { kanji: '八時半', reading: 'はちじはん (hachijihan)', meaningEn: "8:30", meaningNe: '८:३० बजे' },
    ],
  },
];
