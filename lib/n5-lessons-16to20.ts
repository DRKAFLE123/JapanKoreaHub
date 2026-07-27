// ============================================================
// MINNA NO NIHONGO N5 — Complete Vocabulary & Grammar
// SOURCE: Minna no Nihongo I (Translations & Grammar Notes)
// LESSONS 16–20 (Full coverage, no omissions)
// English + Nepali meanings · Grammar sentences per word
// ============================================================

import type { VocabItem } from './nihongo-vocab';

export const N5_LESSONS_16TO20: VocabItem[] = [

  // ════════════════════════════════════════════════════════
  // LESSON 16 — Sequential Actions & Adjective Connection
  // Grammar: V1て, V2て, V3ます (sequence)  ·  い-adj -> ~くて  ·  な-adj/N -> ~で
  //           V1てから, V2ます  ·  N1 は N2 が Adj です
  // ════════════════════════════════════════════════════════
  { id:'n5_16_01', lesson:16, level:'N5', word:'のります', reading:'のります', meaning:'Ride / Get on (train, bus)', meaningNepali:'चढ्नु (गाडी/ट्रेन)', kanjiCharacters:['乗'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'電車にのります。', reading:'でんしゃにのります。', english:'I get on the train.', nepali:'म ट्रेनमा चढ्छु।' }]},
  { id:'n5_16_02', lesson:16, level:'N5', word:'おります', reading:'おります', meaning:'Get off (train, bus)', meaningNepali:'ओर्लनु (गाडी/ट्रेनबाट)', kanjiCharacters:['降'], partOfSpeech:'Verb (Group 2)',
    grammarSentences:[{ japanese:'次の駅でおります。', reading:'つぎのえきでおります。', english:'I will get off at the next station.', nepali:'म अर्को स्टेशनमा ओर्लन्छु।' }]},
  { id:'n5_16_03', lesson:16, level:'N5', word:'のりかえます', reading:'のりかえます', meaning:'Change / Transfer (trains)', meaningNepali:'ट्रेन फेर्नु / परिवर्तन गर्नु', kanjiCharacters:['乗','換'], partOfSpeech:'Verb (Group 2)',
    grammarSentences:[{ japanese:'新宿で電車をのりかえます。', reading:'しんじゅくででんしゃをのりかえます。', english:'I transfer trains at Shinjuku.', nepali:'म शिन्जुकुमा ट्रेन फेर्छु।' }]},
  { id:'n5_16_04', lesson:16, level:'N5', word:'あびます', reading:'あびます', meaning:'Take (a shower)', meaningNepali:'नुहाउनु (शावर)', kanjiCharacters:['浴'], partOfSpeech:'Verb (Group 2)',
    grammarSentences:[{ japanese:'毎朝シャワーをあびます。', reading:'まいあさシャワーをあびます。', english:'I take a shower every morning.', nepali:'म हरेक बिहान शावर लिन्छु।' }]},
  { id:'n5_16_05', lesson:16, level:'N5', word:'いれます', reading:'いれます', meaning:'Put in / Insert', meaningNepali:'हाल्नु / भित्र पसाउनु', kanjiCharacters:['入'], partOfSpeech:'Verb (Group 2)',
    grammarSentences:[{ japanese:'かばんに本をいれます。', reading:'かばんにほんをいれます。', english:'I put a book in the bag.', nepali:'म झोलामा किताब हाल्छु।' }]},
  { id:'n5_16_06', lesson:16, level:'N5', word:'だします', reading:'だします', meaning:'Take out / Hand in (homework)', meaningNepali:'बाहिर निकाल्नु / बुझाउनु', kanjiCharacters:['出'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'ポケットから財布をだしました。', reading:'ポケットからさいふをだしました。', english:'I took out my wallet from my pocket.', nepali:'मैले गोजीबाट वालेट निकालेँ।' }]},
  { id:'n5_16_07', lesson:16, level:'N5', word:'おろします', reading:'おろします', meaning:'Withdraw (money from bank)', meaningNepali:'निकाल्नु (बैंकबाट पैसा)', kanjiCharacters:['降'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'銀行でおかねをおろします。', reading:'ぎんこうでおかねをおろします。', english:'I withdraw money at the bank.', nepali:'म बैंकबाट पैसा निकाल्छु।' }]},
  { id:'n5_16_08', lesson:16, level:'N5', word:'はいります', reading:'はいります', meaning:'Enter (university / bath)', meaningNepali:'भर्ना हुनु / प्रवेश गर्नु', kanjiCharacters:['入'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'大学にはいります。', reading:'だいがくにはいります。', english:'I enter university.', nepali:'म विश्वविद्यालयमा भर्ना हुन्छु।' }]},
  { id:'n5_16_09', lesson:16, level:'N5', word:'でます', reading:'でます', meaning:'Graduate (from university)', meaningNepali:'स्नातक हुनु / निस्कनु', kanjiCharacters:['出'], partOfSpeech:'Verb (Group 2)',
    grammarSentences:[{ japanese:'来年大学をでます。', reading:'らいねんだいがくをでます。', english:'I will graduate from university next year.', nepali:'म अर्को वर्ष विश्वविद्यालयबाट स्नातक गर्छु।' }]},
  { id:'n5_16_10', lesson:16, level:'N5', word:'おします', reading:'おします', meaning:'Push / Press (a button)', meaningNepali:'थिच्नु (बटन)', kanjiCharacters:['押'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'ボタンをおしてください。', reading:'ボタンをおしてください。', english:'Please press the button.', nepali:'कृपया बटन थिच्नुहोस्।' }]},
  { id:'n5_16_11', lesson:16, level:'N5', word:'わかい', reading:'わかい', meaning:'Young', meaningNepali:'जवान / युवा', kanjiCharacters:['若'], partOfSpeech:'I-Adjective',
    grammarSentences:[{ japanese:'ミラーさんはわかいです。', reading:'ミラーさんはわかいです。', english:'Mr. Miller is young.', nepali:'मिलर-जी जवान हुनुहुन्छ।' }]},
  { id:'n5_16_12', lesson:16, level:'N5', word:'ながい', reading:'ながい', meaning:'Long', meaningNepali:'लामो', kanjiCharacters:['長'], partOfSpeech:'I-Adjective',
    grammarSentences:[{ japanese:'彼女はかみがながいです。', reading:'かのじょはかみがながいです。', english:'She has long hair.', nepali:'उनीसँग लामो कपाल छ।' }]},
  { id:'n5_16_13', lesson:16, level:'N5', word:'みじかい', reading:'みじかい', meaning:'Short (length)', meaningNepali:'छोटो', kanjiCharacters:['短'], partOfSpeech:'I-Adjective',
    grammarSentences:[{ japanese:'この鉛筆はみじかいです。', reading:'このえんぴつはみじかいです。', english:'This pencil is short.', nepali:'यो पेन्सिल छोटो छ।' }]},
  { id:'n5_16_14', lesson:16, level:'N5', word:'あかるい', reading:'あかるい', meaning:'Bright / Cheerful', meaningNepali:'उज्यालो / हँसिलो', kanjiCharacters:['明'], partOfSpeech:'I-Adjective',
    grammarSentences:[{ japanese:'この部屋にあかるいです。', reading:'このへやはあかるいです。', english:'This room is bright.', nepali:'यो कोठा उज्यालो छ।' }]},
  { id:'n5_16_15', lesson:16, level:'N5', word:'くらき / くらい', reading:'くらい', meaning:'Dark', meaningNepali:'अध्यारो', kanjiCharacters:['暗'], partOfSpeech:'I-Adjective',
    grammarSentences:[{ japanese:'部屋が深いくらいです。', reading:'へやがくらいです。', english:'The room is dark.', nepali:'कोठा अध्यारो छ।' }]},
  { id:'n5_16_16', lesson:16, level:'N5', word:'からだ', reading:'からだ', meaning:'Body / Health', meaningNepali:'शरीर / स्वास्थ्य', kanjiCharacters:['体'], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'からだにきをつけてください。', reading:'からだにきをつけてください。', english:'Please take care of your body/health.', nepali:'कृपया आफ्नो शरीरको ख्याल राख्नुहोस्।' }]},
  { id:'n5_16_17', lesson:16, level:'N5', word:'あたま', reading:'あたま', meaning:'Head / Brain', meaningNepali:'टाउको / दिमाग', kanjiCharacters:['頭'], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'あたまがいいです。', reading:'あたまがいいです。', english:'He/she is smart (good head).', nepali:'उनी बुद्धिमान छन्।' }]},
  { id:'n5_16_18', lesson:16, level:'N5', word:'かみ', reading:'かみ', meaning:'Hair', meaningNepali:'कपाल', kanjiCharacters:['髪'], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'かみをきりました。', reading:'かみをきりました。', english:'I cut my hair.', nepali:'मैले कपाल काटेँ।' }]},
  { id:'n5_16_19', lesson:16, level:'N5', word:'かお', reading:'かお', meaning:'Face', meaningNepali:'अनुहार', kanjiCharacters:['顔'], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'あさかおをあらいます。', reading:'あさかおをあらいます。', english:'I wash my face in the morning.', nepali:'म बिहान अनुहार धुन्छु।' }]},
  { id:'n5_16_20', lesson:16, level:'N5', word:'め', reading:'め', meaning:'Eye', meaningNepali:'आँखा', kanjiCharacters:['目'], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'めが破おおきいです。', reading:'めがおおきいです。', english:'His/her eyes are big.', nepali:'आँखा ठूला छन्।' }]},
  { id:'n5_16_21', lesson:16, level:'N5', word:'みみ', reading:'みみ', meaning:'Ear', meaningNepali:'कान', kanjiCharacters:['耳'], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'みみが痛いです。', reading:'みみがいたいです。', english:'My ear hurts.', nepali:'मेरो कान दुखेको छ।' }]},
  { id:'n5_16_22', lesson:16, level:'N5', word:'は', reading:'は', meaning:'Tooth', meaningNepali:'दाँत', kanjiCharacters:['歯'], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'毎あさはをみがきます。', reading:'まいあさはをみがきます。', english:'I brush my teeth every morning.', nepali:'म हरेक बिहान दाँत माझ्छु।' }]},
  { id:'n5_16_23', lesson:16, level:'N5', word:'おなか', reading:'おなか', meaning:'Stomach / Belly', meaningNepali:'पेट', kanjiCharacters:[], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'おなかがすきました。', reading:'おなかがすきました。', english:'I am hungry (stomach became empty).', nepali:'मलाई भोक लाग्यो।' }]},
  { id:'n5_16_24', lesson:16, level:'N5', word:'あし', reading:'あし', meaning:'Leg / Foot', meaningNepali:'खुट्टा', kanjiCharacters:['足'], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'あしが痛いです。', reading:'あしがいたいです。', english:'My leg hurts.', nepali:'मेरो खुट्टा दुखेको छ।' }]},
  { id:'n5_16_25', lesson:16, level:'N5', word:'せ', reading:'せ', meaning:'Height (of a person)', meaningNepali:'उचाइ (मान्छेको)', kanjiCharacters:['背'], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'たなかさんはせがたかいです。', reading:'たなかさんはせがたかいです。', english:'Mr. Tanaka is tall.', nepali:'तानाका-जी अग्लो हुनुहुन्छ।' }]},

  // ════════════════════════════════════════════════════════
  // LESSON 17 — Nai-form & Obligations / Prohibition
  // Grammar: Vないで ください (please don't)  ·  Vなければ なりません (must)
  //           Vなくても いいです (don't have to)
  // ════════════════════════════════════════════════════════
  { id:'n5_17_01', lesson:17, level:'N5', word:'おぼえます', reading:'おぼえます', meaning:'Memorize / Remember', meaningNepali:'याद गर्नु / सम्झनु', kanjiCharacters:['覚'], partOfSpeech:'Verb (Group 2)',
    grammarSentences:[{ japanese:'単語をおぼえなければなりません。', reading:'たんごをおぼえなければなりません。', english:'I must memorize vocabulary words.', nepali:'मैले शब्दहरू याद गर्नुपर्छ।' }]},
  { id:'n5_17_02', lesson:17, level:'N5', word:'わすれます', reading:'わすれます', meaning:'Forget', meaningNepali:'बिर्सनु', kanjiCharacters:['忘'], partOfSpeech:'Verb (Group 2)',
    grammarSentences:[{ japanese:'宿題をわすれないでください。', reading:'しゅくだいをわすれないでください。', english:'Please do not forget your homework.', nepali:'कृपया गृहकार्य नबिर्सनुहोस्।' }]},
  { id:'n5_17_03', lesson:17, level:'N5', word:'なくします', reading:'なくします', meaning:'Lose (something)', meaningNepali:'हराउनु (सामान)', kanjiCharacters:['紛'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'パスポートをなくしました。', reading:'パスポートをなくしました。', english:'I lost my passport.', nepali:'मैले मेरो पासपोर्ट हराएँ।' }]},
  { id:'n5_17_04', lesson:17, level:'N5', word:'はらいます', reading:'はらいます', meaning:'Pay', meaningNepali:'तिर्नु (पैसा)', kanjiCharacters:['払'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'現金ではらいます。', reading:'げんきんではらいます。', english:'I will pay in cash.', nepali:'म नगदमा तिर्छु।' }]},
  { id:'n5_17_05', lesson:17, level:'N5', word:'かえします', reading:'かえします', meaning:'Give back / Return (something)', meaningNepali:'फर्ता गर्नु / फर्काउनु', kanjiCharacters:['返'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'明日本をかえさなければなりません。', reading:'あしたほんをかえさなければなりません。', english:'I must return the book tomorrow.', nepali:'मैले भोलि किताब फर्काउनुपर्छ।' }]},
  { id:'n5_17_06', lesson:17, level:'N5', word:'でかけます', reading:'でかけます', meaning:'Go out / Leave home', meaningNepali:'बाहिर जानु', kanjiCharacters:['出'], partOfSpeech:'Verb (Group 2)',
    grammarSentences:[{ japanese:'日曜日どこかへでかけますか。', reading:'にちようびどこかへでかけますか。', english:'Are you going out somewhere on Sunday?', nepali:'आइतबार कतै बाहिर जानुहुन्छ?' }]},
  { id:'n5_17_07', lesson:17, level:'N5', word:'ぬぎます', reading:'ぬぎます', meaning:'Take off (clothes, shoes)', meaningNepali:'खोल्नु / फुकाल्नु (लुगा/जुत्ता)', kanjiCharacters:['脱'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'ここで靴をぬいでください。', reading:'ここでくつをぬいでください。', english:'Please take off your shoes here.', nepali:'कृपया यहाँ जुत्ता फुकाल्नुहोस्।' }]},
  { id:'n5_17_08', lesson:17, level:'N5', word:'もっていきます', reading:'もっていきます', meaning:'Take (something along)', meaningNepali:'लानु (सामान साथमा)', kanjiCharacters:['持'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'傘をもっていきます。', reading:'かさをもっていきます。', english:'I will take an umbrella.', nepali:'म छाता साथमा लान्छु।' }]},
  { id:'n5_17_09', lesson:17, level:'N5', word:'もってきます', reading:'もってきます', meaning:'Bring (something)', meaningNepali:'ल्याउनु (सामान)', kanjiCharacters:['持'], partOfSpeech:'Verb (Irregular)',
    grammarSentences:[{ japanese:'明日辞書をもってきてください。', reading:'あしたじしょをもってきてください。', english:'Please bring your dictionary tomorrow.', nepali:'कृपया भोलि शब्दकोश ल्याउनुहोस्।' }]},
  { id:'n5_17_10', lesson:17, level:'N5', word:'しんぱいします', reading:'しんぱいします', meaning:'Worry', meaningNepali:'चिन्ता गर्नु', kanjiCharacters:['心','配'], partOfSpeech:'Verb (Irregular)',
    grammarSentences:[{ japanese:'しんぱいしないでください。', reading:'しんぱいしないでください。', english:'Please do not worry.', nepali:'कृपया चिन्ता नगर्नुहोस्।' }]},
  { id:'n5_17_11', lesson:17, level:'N5', word:'ざんぎょうします', reading:'ざんぎょうします', meaning:'Work overtime', meaningNepali:'ओभरटाइम काम गर्नु', kanjiCharacters:['残','業'], partOfSpeech:'Verb (Irregular)',
    grammarSentences:[{ japanese:'今晩ざんぎょうしなければなりません。', reading:'こんばんざんぎょうしなければなりません。', english:'I must work overtime tonight.', nepali:'मैले आज राति ओभरटाइम काम गर्नुपर्छ।' }]},
  { id:'n5_17_12', lesson:17, level:'N5', word:'しゅっちょうします', reading:'しゅっちょうします', meaning:'Go on a business trip', meaningNepali:'व्यापारिक भ्रमणमा जान्छु', kanjiCharacters:['出','張'], partOfSpeech:'Verb (Irregular)',
    grammarSentences:[{ japanese:'来週大阪へしゅっちょうします。', reading:'らいしゅうおおさかへしゅっちょうします。', english:'I am going on a business trip to Osaka next week.', nepali:'म अर्को हप्ता ओसाका व्यापारिक भ्रमणमा जान्छु।' }]},
  { id:'n5_17_13', lesson:17, level:'N5', word:'くすり', reading:'くすり', meaning:'Medicine', meaningNepali:'औषधि', kanjiCharacters:['薬'], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'食後につすりをのんでください。', reading:'しょくごにくすりをのんでください。', english:'Please take medicine after meals.', nepali:'कृपया खाना खाएपछि औषधि खानुहोस्।' }]},
  { id:'n5_17_14', lesson:17, level:'N5', word:'ふろ', reading:'ふろ', meaning:'Bath', meaningNepali:'बाथटब / नुहाउने ठाउँ', kanjiCharacters:[], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'おふろにはいります。', reading:'おふろにはいります。', english:'I take a bath.', nepali:'म बाथटबमा नुहाउँछु।' }]},
  { id:'n5_17_15', lesson:17, level:'N5', word:'うわぎ', reading:'うわぎ', meaning:'Jacket / Outer garment', meaningNepali:'ज्याकेट / बाहिरी लुगा', kanjiCharacters:['上','着'], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'うわぎをぬぎます。', reading:'うわぎをぬぎます。', english:'I take off my jacket.', nepali:'म ज्याकेट फुकाल्छु।' }]},

  // ════════════════════════════════════════════════════════
  // LESSON 18 — Dictionary Form & Potential / Hobbies
  // Grammar: V[dict] ことができます (can do)  ·  わたしの しゅみ は V[dict] ことです
  //           V1[dict] まえに, V2ます
  // ════════════════════════════════════════════════════════
  { id:'n5_18_01', lesson:18, level:'N5', word:'できます', reading:'できます', meaning:'Can do / Be able to', meaningNepali:'सक्नु / गर्न योग्य हुनु', kanjiCharacters:[], partOfSpeech:'Verb (Group 2)',
    grammarSentences:[
      { japanese:'日本語をはなすことができます。', reading:'にほんごをはなすことができます。', english:'I can speak Japanese.', nepali:'म जापानी भाषा बोल्न सक्छु।' },
      { japanese:'運転ができますか。', reading:'うんてんができますか。', english:'Can you drive?', nepali:'तपाईं गाडी चलाउन सक्नुहुन्छ?' }
    ]},
  { id:'n5_18_02', lesson:18, level:'N5', word:'洗います', reading:'あ洗います', meaning:'Wash', meaningNepali:'धुनु', kanjiCharacters:['洗'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'手と顔をあらいます。', reading:'てとかおをあらいます。', english:'I wash my hands and face.', nepali:'म हात र अनुहार धुन्छु।' }]},
  { id:'n5_18_03', lesson:18, level:'N5', word:'ひきます', reading:'ひきます', meaning:'Play (string instrument / piano)', meaningNepali:'बजाउनु (गिटार/पियानो)', kanjiCharacters:['弾'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'ピアノをひくことができます。', reading:'ピアノをひくことができます。', english:'I can play the piano.', nepali:'म पियानो बजाउन सक्छु।' }]},
  { id:'n5_18_04', lesson:18, level:'N5', word:'うたいま', reading:'うたいます', meaning:'Sing', meaningNepali:'गाउनु', kanjiCharacters:['歌'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'日本の歌をうたいます。', reading:'にほんのうたをうたいます。', english:'I sing Japanese songs.', nepali:'म जापानी गीत गाउँछु।' }]},
  { id:'n5_18_05', lesson:18, level:'N5', word:'あつめます', reading:'あつめます', meaning:'Collect / Gather', meaningNepali:'जम्मा गर्नु / सङ्कलन गर्नु', kanjiCharacters:['集'], partOfSpeech:'Verb (Group 2)',
    grammarSentences:[{ japanese:'切手をあつめています。', reading:'きってをあつめています。', english:'I am collecting stamps.', nepali:'म टिकटहरू सङ्कलन गर्दैछु।' }]},
  { id:'n5_18_06', lesson:18, level:'N5', word:'すてます', reading:'すてます', meaning:'Throw away / Discard', meaningNepali:'फाल्नु (फोहर आदि)', kanjiCharacters:['捨'], partOfSpeech:'Verb (Group 2)',
    grammarSentences:[{ japanese:'ここにゴミをすてないでください。', reading:'ここにごみをすてないでください。', english:'Please do not throw trash here.', nepali:'कृपया यहाँ फोहर नफाल्नुहोस्।' }]},
  { id:'n5_18_07', lesson:18, level:'N5', word:'かえます', reading:'かえます', meaning:'Change / Exchange', meaningNepali:'फेर्नु / साट्नु', kanjiCharacters:['変','換'], partOfSpeech:'Verb (Group 2)',
    grammarSentences:[{ japanese:'お金をかえます。', reading:'おかねをかえます。', english:'I exchange money.', nepali:'म पैसा साट्छु।' }]},
  { id:'n5_18_08', lesson:18, level:'N5', word:'うんてんします', reading:'うんてんします', meaning:'Drive (a vehicle)', meaningNepali:'गाडी चलाउनु', kanjiCharacters:['運','転'], partOfSpeech:'Verb (Irregular)',
    grammarSentences:[{ japanese:'車をうんてんすることができます。', reading:'くるまをうんてんすることができます。', english:'I can drive a car.', nepali:'म कार चलाउन सक्छु।' }]},
  { id:'n5_18_09', lesson:18, level:'N5', word:'よやくします', reading:'よやくします', meaning:'Reserve / Book', meaningNepali:'आरक्षित गर्नु / बुक गर्नु', kanjiCharacters:['予','約'], partOfSpeech:'Verb (Irregular)',
    grammarSentences:[{ japanese:'ホテルをよやくしました。', reading:'ホテルをよやくしました。', english:'I booked a hotel.', nepali:'मैले होटल बुक गरें।' }]},
  { id:'n5_18_10', lesson:18, level:'N5', word:'ピアノ', reading:'ピアノ', meaning:'Piano', meaningNepali:'पियानो', kanjiCharacters:[], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'ピアノのれんしゅうをします。', reading:'ピアノのれんしゅうをします。', english:'I practice the piano.', nepali:'म पियानो अभ्यास गर्छु।' }]},
  { id:'n5_18_11', lesson:18, level:'N5', word:'メートル', reading:'メートル', meaning:'Meter', meaningNepali:'मिटर', kanjiCharacters:[], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'ひゃくメートルおよぎます。', reading:'ひゃくメートルおよぎます。', english:'I swim 100 meters.', nepali:'म १०० मिटर पौडी खेल्छु।' }]},
  { id:'n5_18_12', lesson:18, level:'N5', word:'げんきん', reading:'げんきん', meaning:'Cash', meaningNepali:'नगद', kanjiCharacters:['現','金'], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'げんきんではらいます。', reading:'げんきんではらいます。', english:'I will pay with cash.', nepali:'म नगदमा तिर्छु।' }]},
  { id:'n5_18_13', lesson:18, level:'N5', word:'しゅみ', reading:'しゅみ', meaning:'Hobby / Interest', meaningNepali:'रुचि / शौक', kanjiCharacters:['趣','味'], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'わたしのしゅみは映画をみることです。', reading:'わたしのしゅみはおいがをみることです。', english:'My hobby is watching movies.', nepali:'मेरो रुचि फिल्म हेर्नु हो।' }]},
  { id:'n5_18_14', lesson:18, level:'N5', word:'にっき', reading:'にっき', meaning:'Diary / Journal', meaningNepali:'डायरी', kanjiCharacters:['日','記'], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'毎晩にっきをかきます。', reading:'まいばんにっきをかきます。', english:'I write a diary every evening.', nepali:'म हरेक साँझ डायरी लेख्छु।' }]},

  // ════════════════════════════════════════════════════════
  // LESSON 19 — Ta-form & Experience / Listing Actions
  // Grammar: Vた ことがあります (have done)  ·  Vたり, Vたり します (do things like X and Y)
  //           Adj/N に なります (become)
  // ════════════════════════════════════════════════════════
  { id:'n5_19_01', lesson:19, level:'N5', word:'のぼります', reading:'のぼります', meaning:'Climb / Ascend (mountain)', meaningNepali:'चढ्नु (पहाड)', kanjiCharacters:['登'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'富士山にのぼったことがあります。', reading:'ふじさんにのぼったことがあります。', english:'I have climbed Mt. Fuji before.', nepali:'म पहिले फूजी पर्वत चढेको छु।' }]},
  { id:'n5_19_02', lesson:19, level:'N5', word:'とまります', reading:'とまります', meaning:'Stay at (a hotel)', meaningNepali:'बस्नु / बास बस्नु (होटलमा)', kanjiCharacters:['泊'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'ホテルにとまります。', reading:'ホテルにとまります。', english:'I stay at a hotel.', nepali:'म होटलमा बास बस्छु।' }]},
  { id:'n5_19_03', lesson:19, level:'N5', word:'そうじします', reading:'そうじします', meaning:'Clean (a room)', meaningNepali:'सफा गर्नु (कोठा)', kanjiCharacters:['掃','除'], partOfSpeech:'Verb (Irregular)',
    grammarSentences:[{ japanese:'日曜日に部屋をそうじします。', reading:'にちようびにへやをそうじします。', english:'I clean my room on Sunday.', nepali:'म आइतबार कोठा सफा गर्छु।' }]},
  { id:'n5_19_04', lesson:19, level:'N5', word:'せんたくします', reading:'せんたくします', meaning:'Wash clothes / Do laundry', meaningNepali:'लुगा धुनु', kanjiCharacters:['洗','濯'], partOfSpeech:'Verb (Irregular)',
    grammarSentences:[{ japanese:'休みの日にせんたくをします。', reading:'やすみのひにせんたくをします。', english:'I do laundry on my day off.', nepali:'म बिदाको दिन लुगा धुन्छु।' }]},
  { id:'n5_19_05', lesson:19, level:'N5', word:'ねむい', reading:'ねむい', meaning:'Sleepy', meaningNepali:'निद्रालु / निन्द्रा लागेको', kanjiCharacters:['眠'], partOfSpeech:'I-Adjective',
    grammarSentences:[{ japanese:'とてもねむいです。', reading:'とてもねむいです。', english:'I am very sleepy.', nepali:'मलाई धेरै निन्द्रा लागेको छ।' }]},
  { id:'n5_19_06', lesson:19, level:'N5', word:'つよい', reading:'つよい', meaning:'Strong', meaningNepali:'बलियो / बलवान', kanjiCharacters:['強'], partOfSpeech:'I-Adjective',
    grammarSentences:[{ japanese:'かれはからだがつよいです。', reading:'かれはからだがつよいです。', english:'He is physically strong.', nepali:'उहाँको शरीर बलियो छ।' }]},
  { id:'n5_19_07', lesson:19, level:'N5', word:'よわい', reading:'よわい', meaning:'Weak', meaningNepali:'कमजोर', kanjiCharacters:['弱'], partOfSpeech:'I-Adjective',
    grammarSentences:[{ japanese:'わたしはおさけによわいです。', reading:'わたしはおさけによわいです।', english:'I am weak to alcohol.', nepali:'मलाई रक्सी लाग्छ (कमजोर छु)।' }]},
  { id:'n5_19_08', lesson:19, level:'N5', word:'ちょうし', reading:'ちょうし', meaning:'Condition / State (health)', meaningNepali:'हालत / अवस्था (स्वास्थ्य)', kanjiCharacters:['調','子'], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'体のちょうしがいいです。', reading:'からだのちょうしがいいです。', english:'My condition/health is good.', nepali:'मेरो स्वास्थ्यको अवस्था राम्रो छ।' }]},

  // ════════════════════════════════════════════════════════
  // LESSON 20 — Informal / Plain Style Expressions
  // Grammar: Plain forms in conversation (たべない, たべた, たべなかった etc.)
  // ════════════════════════════════════════════════════════
  { id:'n5_20_01', lesson:20, level:'N5', word:'いります', reading:'いります', meaning:'Need / Require (a visa)', meaningNepali:'चाहिनु / आवश्यकता हुनु', kanjiCharacters:['要'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'ビザがいります。', reading:'ビザがいります。', english:'I need a visa.', nepali:'मलाई भिसा चाहिन्छ।' }]},
  { id:'n5_20_02', lesson:20, level:'N5', word:'しらべます', reading:'しらべます', meaning:'Investigate / Check', meaningNepali:'जाँच गर्नु / खोजी गर्नु', kanjiCharacters:['調'], partOfSpeech:'Verb (Group 2)',
    grammarSentences:[{ japanese:'辞書で単語をしらべます。', reading:'じしょでたんごをしらべます。', english:'I check the word in the dictionary.', nepali:'म शब्दकोशमा शब्द खोज्छु।' }]},
  { id:'n5_20_03', lesson:20, level:'N5', word:'しゅうりします', reading:'しゅうりします', meaning:'Repair / Fix', meaningNepali:'मर्मत गर्नु', kanjiCharacters:['修','理'], partOfSpeech:'Verb (Irregular)',
    grammarSentences:[{ japanese:'車をしゅうりします。', reading:'くるまをしゅうりします。', english:'I will repair the car.', nepali:'म कार मर्मत गर्छु।' }]},
  { id:'n5_20_04', lesson:20, level:'N5', word:'ぼく', reading:'ぼく', meaning:'I (used by males informally)', meaningNepali:'म (पुरुषहरूको प्रयोग)', kanjiCharacters:['僕'], partOfSpeech:'Pronoun',
    grammarSentences:[{ japanese:'ぼくもいきます。', reading:'ぼくもいきます。', english:'I will go too (informal male).', nepali:'म पनि जान्छु।' }]},
  { id:'n5_20_05', lesson:20, level:'N5', word:'きみ', reading:'きみ', meaning:'You (informal)', meaningNepali:'तिमी (साथी/सानालाई)', kanjiCharacters:['君'], partOfSpeech:'Pronoun',
    grammarSentences:[{ japanese:'きみもくる？', reading:'きみもくる？', english:'Are you coming too? (informal)', nepali:'तिमी पनि आउँछौ?' }]},
  { id:'n5_20_06', lesson:20, level:'N5', word:'うん', reading:'うん', meaning:'Yes (casual)', meaningNepali:'अँ / हो (अनौपचारिक)', kanjiCharacters:[], partOfSpeech:'Expression',
    grammarSentences:[{ japanese:'うん、わかった。', reading:'うん、わかった。', english:'Yeah, I understood.', nepali:'अँ, मैले बुझें।' }]},
  { id:'n5_20_07', lesson:20, level:'N5', word:'うーん', reading:'うーん', meaning:'Well / Let me see...', meaningNepali:'अँ... (सोच्दा)', kanjiCharacters:[], partOfSpeech:'Expression',
    grammarSentences:[{ japanese:'うーん、どうしようかな。', reading:'うーん、どうしようかな。', english:'Hmm, what should I do...', nepali:'अँ... के गरौँ त होला।' }]},
  { id:'n5_20_08', lesson:20, level:'N5', word:'サラリーマン', reading:'サラリーマン', meaning:'Company worker / Office worker', meaningNepali:'जागिरे / तलबदार कर्मचारी', kanjiCharacters:[], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'父はサラリーマンです。', reading:'ちちはサラリーマンです。', english:'My father is an office worker.', nepali:'मेरो बुबा जागिरे हुनुहुन्छ।' }]}
];
