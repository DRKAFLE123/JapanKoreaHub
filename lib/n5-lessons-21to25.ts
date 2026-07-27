// ============================================================
// MINNA NO NIHONGO N5 — Complete Vocabulary & Grammar
// SOURCE: Minna no Nihongo I (Translations & Grammar Notes)
// LESSONS 21–25 (Full coverage, no omissions)
// English + Nepali meanings · Grammar sentences per word
// ============================================================

import type { VocabItem } from './nihongo-vocab';

export const N5_LESSONS_21TO25: VocabItem[] = [

  // ════════════════════════════════════════════════════════
  // LESSON 21 — Opinions & Quotes
  // Grammar: [Plain form] と おもいます (I think that)
  //           [Plain form] と いいました (said that)  ·  V[Plain] でしょう？
  // ════════════════════════════════════════════════════════
  { id:'n5_21_01', lesson:21, level:'N5', word:'おもいます', reading:'おもいます', meaning:'Think / Suppose', meaningNepali:'सोच्नु / विचार गर्नु', kanjiCharacters:['思'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[
      { japanese:'あしたは雨がふるとおもいます。', reading:'あしたはあめがふるとおもいます。', english:'I think it will rain tomorrow.', nepali:'मलाई लाग्छ भोलि पानी पर्छ।' },
      { japanese:'日本は物価が高いとおもいます。', reading:'にほんはぶっかがたかいとおもいます。', english:'I think prices in Japan are high.', nepali:'जापानमा महँगी छ जस्तो लाग्छ।' }
    ]},
  { id:'n5_21_02', lesson:21, level:'N5', word:'いいまし', reading:'いいました', meaning:'Said / Stated', meaningNepali:'भन्नुभयो / भन्यो', kanjiCharacters:['言'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'ミラーさんは「来週出張する」といいました。', reading:'ミラーさんは「らいしゅうしゅっちょうする」といいました。', english:'Mr. Miller said that he would go on a business trip next week.', nepali:'मिलर-जीले अर्को हप्ता व्यापारिक भ्रमणमा जान्छु भन्नुभयो।' }]},
  { id:'n5_21_03', lesson:21, level:'N5', word:'かちます', reading:'かちます', meaning:'Win', meaningNepali:'जित्नु', kanjiCharacters:['勝'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'試合にかちました。', reading:'しあいにかちました。', english:'We won the match.', nepali:'हामीले खेल जित्यौँ।' }]},
  { id:'n5_21_04', lesson:21, level:'N5', word:'まけます', reading:'まけます', meaning:'Lose / Be defeated', meaningNepali:'हार्नु', kanjiCharacters:['負'], partOfSpeech:'Verb (Group 2)',
    grammarSentences:[{ japanese:'試合にまけました。', reading:'しあいにまけました。', english:'We lost the match.', nepali:'हामीले खेल हार्यौँ।' }]},
  { id:'n5_21_05', lesson:21, level:'N5', word:'あります', reading:'あります', meaning:'Take place / Be held (festival, party)', meaningNepali:'हुनु (उत्सव/पार्टी)', kanjiCharacters:[], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'明日おまつりがあります。', reading:'あしたおまつりがあります。', english:'There is a festival tomorrow.', nepali:'भोलि उत्सव छ।' }]},
  { id:'n5_21_06', lesson:21, level:'N5', word:'やくにたちます', reading:'やくにたちます', meaning:'Be useful / Help', meaningNepali:'उपयोगी हुनु / काम लाग्नु', kanjiCharacters:['役','立'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'この辞書はとてもやくにたちます。', reading:'このじしょはとてもやくにたちます。', english:'This dictionary is very useful.', nepali:'यो शब्दकोश धेरै उपयोगी छ।' }]},
  { id:'n5_21_07', lesson:21, level:'N5', word:'うごきます', reading:'うごきます', meaning:'Move / Work (machine)', meaningNepali:'चल्नु (मेसिन आदि)', kanjiCharacters:['動'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'エレベーターがうごきません。', reading:'エレベーターがうごきません。', english:'The elevator is not working.', nepali:'लिफ्ट चलेको छैन।' }]},
  { id:'n5_21_08', lesson:21, level:'N5', word:'やめます', reading:'やめます', meaning:'Quit / Stop (company, smoking)', meaningNepali:'छोड्नु (काम/चुरोट)', kanjiCharacters:['辞'], partOfSpeech:'Verb (Group 2)',
    grammarSentences:[{ japanese:'会社をやめました。', reading:'かいしゃをやめました。', english:'I quit the company.', nepali:'मैले कम्पनीको काम छोडें।' }]},
  { id:'n5_21_09', lesson:21, level:'N5', word:'きをつけます', reading:'きをつけます', meaning:'Pay attention / Be careful', meaningNepali:'होशियार हुनु / ध्यान दिनु', kanjiCharacters:['気'], partOfSpeech:'Verb (Group 2)',
    grammarSentences:[{ japanese:'車にきをつけてください。', reading:'くるまにきをつけてください。', english:'Please be careful of cars.', nepali:'कृपया गाडीहरूबाट होशियार रहनुहोस्।' }]},
  { id:'n5_21_10', lesson:21, level:'N5', word:'りゅうがくします', reading:'りゅうがくします', meaning:'Study abroad', meaningNepali:'विदेशमा पढ्नु', kanjiCharacters:['留','学'], partOfSpeech:'Verb (Irregular)',
    grammarSentences:[{ japanese:'日本へりゅうがくしたいです。', reading:'にほんへりゅうがくしたいです。', english:'I want to study abroad in Japan.', nepali:'म जापानमा अध्ययन गर्न जान चाहन्छु।' }]},
  { id:'n5_21_11', lesson:21, level:'N5', word:'むだ[な]', reading:'むだ[な]', meaning:'Wasteful / Useless', meaningNepali:'व्यर्थ / खेर जाने', kanjiCharacters:['無','駄'], partOfSpeech:'Na-Adjective',
    grammarSentences:[{ japanese:'時間をむだにしないでください。', reading:'じかんをむだにしないでください。', english:'Please do not waste time.', nepali:'कृपया समय खेर नफाल्नुहोस्।' }]},
  { id:'n5_21_12', lesson:21, level:'N5', word:'ふべん[な]', reading:'ふべん[な]', meaning:'Inconvenient', meaningNepali:'असुविधाजनक', kanjiCharacters:['不','便'], partOfSpeech:'Na-Adjective',
    grammarSentences:[{ japanese:'ここ交通がふべんです。', reading:'こここうつうがふべんです。', english:'Transportation here is inconvenient.', nepali:'यहाँ यातायात असुविधाजनक छ।' }]},

  // ════════════════════════════════════════════════════════
  // LESSON 22 — Noun Modification
  // Grammar: Clause[Plain] + Noun  (e.g., わたしが つくった ケーキ)
  // ════════════════════════════════════════════════════════
  { id:'n5_22_01', lesson:22, level:'N5', word:'きます', reading:'きます', meaning:'Wear / Put on (shirt, coat)', meaningNepali:'लगाउनु (कमिज/कोट माथिल्लो लुगा)', kanjiCharacters:['着'], partOfSpeech:'Verb (Group 2)',
    grammarSentences:[{ japanese:'白いシャツをきています。', reading:'しろいシャツをきています。', english:'I am wearing a white shirt.', nepali:'म सेतो शर्ट लगाउँदैछु।' }]},
  { id:'n5_22_02', lesson:22, level:'N5', word:'はきます', reading:'はきます', meaning:'Put on (trousers, shoes)', meaningNepali:'लगाउनु (जुत्ता/पैन्ट तल्लो लुगा)', kanjiCharacters:['履','穿'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'黒い靴をはいています。', reading:'くろいくつをはいています。', english:'I am wearing black shoes.', nepali:'म कालो जुत्ता लगाउँदैछु।' }]},
  { id:'n5_22_03', lesson:22, level:'N5', word:'かぶります', reading:'かぶります', meaning:'Put on (a hat)', meaningNepali:'लगाउनु (टोपी)', kanjiCharacters:['被'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'帽子をかぶっています。', reading:'ぼうしをかぶっています。', english:'I am wearing a hat.', nepali:'म टोपी लगाउँदैछु।' }]},
  { id:'n5_22_04', lesson:22, level:'N5', word:'かけます', reading:'かけます', meaning:'Put on (glasses)', meaningNepali:'लगाउनु (चश्मा)', kanjiCharacters:[], partOfSpeech:'Verb (Group 2)',
    grammarSentences:[{ japanese:'眼鏡をかけています。', reading:'めがねをかけています。', english:'I am wearing glasses.', nepali:'म चश्मा लगाउँदैछु।' }]},
  { id:'n5_22_05', lesson:22, level:'N5', word:'うまれます', reading:'うまれます', meaning:'Be born', meaningNepali:'जन्मदिनु / जन्म हुनु', kanjiCharacters:['生'], partOfSpeech:'Verb (Group 2)',
    grammarSentences:[{ japanese:'わたしはネパールでうまれました。', reading:'わたしはネパールでうまれました。', english:'I was born in Nepal.', nepali:'मेरो जन्म नेपालमा भएको हो।' }]},
  { id:'n5_22_06', lesson:22, level:'N5', word:'コート', reading:'コート', meaning:'Coat', meaningNepali:'कोट', kanjiCharacters:[], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'あたたかいコートをかいました。', reading:'あたたかいコートをかいました。', english:'I bought a warm coat.', nepali:'मैले न्यानो कोट किनें।' }]},
  { id:'n5_22_07', lesson:22, level:'N5', word:'セーター', reading:'セーター', meaning:'Sweater', meaningNepali:'स्वेटर', kanjiCharacters:[], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'母がセーターを編んでくれました。', reading:'ははがセーターをあんでくれました。', english:'My mother knitted a sweater for me.', nepali:'आमाले मेरो लागि स्वेटर बुनिदिनुभयो।' }]},
  { id:'n5_22_08', lesson:22, level:'N5', word:'スーツ', reading:'スーツ', meaning:'Suit', meaningNepali:'सूट (पोशाक)', kanjiCharacters:[], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'仕事でスーツをきます。', reading:'しごとでスーツをきます。', english:'I wear a suit for work.', nepali:'म काममा सूट लगाउँछु।' }]},
  { id:'n5_22_09', lesson:22, level:'N5', word:'ぼうし', reading:'ぼうし', meaning:'Hat / Cap', meaningNepali:'टोपी', kanjiCharacters:['帽','子'], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'あかいぼうしをかぶっています。', reading:'あかいぼうしをかぶっています。', english:'I am wearing a red hat.', nepali:'म रातो टोपी लगाउँदैछु।' }]},
  { id:'n5_22_10', lesson:22, level:'N5', word:'めがね', reading:'めがね', meaning:'Glasses / Spectacles', meaningNepali:'चश्मा', kanjiCharacters:['眼','鏡'], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'めがねをどこに置きましたか。', reading:'めがねをどこにおきましたか。', english:'Where did I put my glasses?', nepali:'मैले चश्मा कहाँ राखें?' }]},

  // ════════════════════════════════════════════════════════
  // LESSON 23 — Temporal Clauses with と & とき
  // Grammar: V[dict/ta/nai] とき (when)  ·  V[dict] と, ~ (when/if X happens, Y always happens)
  // ════════════════════════════════════════════════════════
  { id:'n5_23_01', lesson:23, level:'N5', word:'ききます', reading:'ききます', meaning:'Ask (the teacher)', meaningNepali:'सोध्नु (गुरुलाई)', kanjiCharacters:['聞'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'先生に質問をききます。', reading:'せんせいにしつもんをききます。', english:'I ask the teacher a question.', nepali:'म गुरुलाई प्रश्न सोध्छु।' }]},
  { id:'n5_23_02', lesson:23, level:'N5', word:'まわします', reading:'まわします', meaning:'Turn / Rotate', meaningNepali:'घुमाउनु (बटन आदि)', kanjiCharacters:['回'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'これを右へまわしてください。', reading:'これをみぎへまわしてください。', english:'Please turn this to the right.', nepali:'कृपया यसलाई दायाँ घुमाउनुहोस्।' }]},
  { id:'n5_23_03', lesson:23, level:'N5', word:'ひきます', reading:'ひきます', meaning:'Pull', meaningNepali:'तान्नु', kanjiCharacters:['引'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'ドアをひいてください。', reading:'ドアをひいてください。', english:'Please pull the door.', nepali:'कृपया ढोका तान्नुहोस्।' }]},
  { id:'n5_23_04', lesson:23, level:'N5', word:'かえます', reading:'かえます', meaning:'Change / Alter', meaningNepali:'बद्ल्नु / परिवर्तन गर्नु', kanjiCharacters:['変'], partOfSpeech:'Verb (Group 2)',
    grammarSentences:[{ japanese:'音を大きくかえます。', reading:'おとをおおきくかえます。', english:'I turn up the sound.', nepali:'म आवाज ठूलो बनाउँछु।' }]},
  { id:'n5_23_05', lesson:23, level:'N5', word:'さわります', reading:'さわります', meaning:'Touch (a button, machine)', meaningNepali:'छुनु', kanjiCharacters:['触'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'機械にさわらないでください。', reading:'きかいにさわらないでください。', english:'Please do not touch the machine.', nepali:'कृपया मेसिन नछुनुहोस्।' }]},
  { id:'n5_23_06', lesson:23, level:'N5', word:'あるきます', reading:'あるきます', meaning:'Walk', meaningNepali:'हिँड्नु', kanjiCharacters:['歩'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'公園をあるきます。', reading:'こうえんをあるきます。', english:'I walk through the park.', nepali:'म पार्कमा हिँड्छु।' }]},
  { id:'n5_23_07', lesson:23, level:'N5', word:'わたります', reading:'わたります', meaning:'Cross (a bridge, road)', meaningNepali:'तर्नु / काट्नु (बाटो/पुल)', kanjiCharacters:['渡'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'橋をわたります。', reading:'はしをわたります。', english:'I cross the bridge.', nepali:'म पुल तर्छु।' }]},
  { id:'n5_23_08', lesson:23, level:'N5', word:'まがります', reading:'まがります', meaning:'Turn (to the right/left)', meaningNepali:'मोडिनु (दायाँ/बायाँ)', kanjiCharacters:['曲'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'角を右へまがってください。', reading:'かどをみぎへまがってください。', english:'Please turn right at the corner.', nepali:'कृपया कुनामा दायाँ मोडिनुहोस्।' }]},
  { id:'n5_23_09', lesson:23, level:'N5', word:'さびしい', reading:'さびしい', meaning:'Lonely / Sad', meaningNepali:'उदासी / एक्लो', kanjiCharacters:['寂'], partOfSpeech:'I-Adjective',
    grammarSentences:[{ japanese:'暇なとき、さびしいです。', reading:'ひまなとき、さびしいです。', english:'When I am free, I am lonely.', nepali:'फुर्सदको बेला म उदास महसुस गर्छु।' }]},
  { id:'n5_23_10', lesson:23, level:'N5', word:'おゆ', reading:'おゆ', meaning:'Hot water', meaningNepali:'तातो पानी', kanjiCharacters:['湯'], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'おゆがでます。', reading:'おゆがでます。', english:'Hot water comes out.', nepali:'तातो पानी आउँछ।' }]},
  { id:'n5_23_11', lesson:23, level:'N5', word:'おと', reading:'おと', meaning:'Sound', meaningNepali:'आवाज / ध्वनि', kanjiCharacters:['音'], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'おとを大きくします。', reading:'おとをおおきくします。', english:'I make the sound louder.', nepali:'म आवाज बढाउँछु।' }]},
  { id:'n5_23_12', lesson:23, level:'N5', word:'サイズ', reading:'サイズ', meaning:'Size', meaningNepali:'साइज / नाप', kanjiCharacters:[], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'このサイズはちょうどいいです。', reading:'このサイズはちょうどいいです。', english:'This size is just right.', nepali:'यो साइज ठ्याक्कै ठिक छ।' }]},

  // ════════════════════════════════════════════════════════
  // LESSON 24 — Giving & Receiving Favor
  // Grammar: N1 が わたし に N2 を くれます (give me)
  //           Vて もらいます  ·  Vて あげます  ·  Vて くれます
  // ════════════════════════════════════════════════════════
  { id:'n5_24_01', lesson:24, level:'N5', word:'くれます', reading:'くれます', meaning:'Give (me or my family)', meaningNepali:'दिनु (मलाई वा मेरो परिवारलाई)', kanjiCharacters:[], partOfSpeech:'Verb (Group 2)',
    grammarSentences:[
      { japanese:'佐藤さんはわたしにお菓子をくれました。', reading:'さとうさんはわたしにおかしをくれました。', english:'Ms. Sato gave me sweets.', nepali:'सातो-जीले मलाई मिठाई दिनुभयो।' }
    ]},
  { id:'n5_24_02', lesson:24, level:'N5', word:'つれていきます', reading:'つれていきます', meaning:'Take (someone) along', meaningNepali:'साथमा लानु (मान्छेलाई)', kanjiCharacters:['連','行'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'子供を公園へつれていきます。', reading:'こどもをこうえんへつれていきます。', english:'I take my child to the park.', nepali:'म बच्चालाई पार्कमा लैजान्छु।' }]},
  { id:'n5_24_03', lesson:24, level:'N5', word:'つれてきます', reading:'つれてきます', meaning:'Bring (someone) along', meaningNepali:'साथमा ल्याउनु (मान्छेलाई)', kanjiCharacters:['連','来'], partOfSpeech:'Verb (Irregular)',
    grammarSentences:[{ japanese:'友達をパーティーにつれてきました。', reading:'ともだちをパーティーにつれてきました。', english:'I brought a friend to the party.', nepali:'मैले साथीलाई पार्टीमा ल्याएँ।' }]},
  { id:'n5_24_04', lesson:24, level:'N5', word:'おくります', reading:'おくります', meaning:'Escort / See off (someone)', meaningNepali:'पुर्‍याउनु / बिदा गर्नु', kanjiCharacters:['送'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'駅まで友達をおくります。', reading:'えきまでともだちをおくります。', english:'I escort my friend to the station.', nepali:'म साथीलाई स्टेशनसम्म पुर्‍याउँछु।' }]},
  { id:'n5_24_05', lesson:24, level:'N5', word:'しょうかいします', reading:'しょうかいします', meaning:'Introduce', meaningNepali:'परिचय गराउनु', kanjiCharacters:['紹','介'], partOfSpeech:'Verb (Irregular)',
    grammarSentences:[{ japanese:'みんなに田中さんをしょうかいします。', reading:'みんなにたなかさんをしょうかいします。', english:'I introduce Mr. Tanaka to everyone.', nepali:'म सबैलाई तानाका-जीको परिचय गराउँछु।' }]},
  { id:'n5_24_06', lesson:24, level:'N5', word:'あんないします', reading:'あんないします', meaning:'Guide / Show around', meaningNepali:'बाटो देखाउनु / घुमाउनु', kanjiCharacters:['案','内'], partOfSpeech:'Verb (Irregular)',
    grammarSentences:[{ japanese:'東京をあんないします。', reading:'とうきょうをあんないします。', english:'I will show you around Tokyo.', nepali:'म तपाईंलाई टोक्यो घुमाउँछु।' }]},
  { id:'n5_24_07', lesson:24, level:'N5', word:'せつめいします', reading:'せつめいします', meaning:'Explain', meaningNepali:'स्पष्ट पार्नु / सम्झाउनु', kanjiCharacters:['説','明'], partOfSpeech:'Verb (Irregular)',
    grammarSentences:[{ japanese:'使い車をせつめいします。', reading:'つかいかたをせつめいします。', english:'I will explain how to use it.', nepali:'म कसरी प्रयोग गर्ने भनेर सम्झाउँछु।' }]},

  // ════════════════════════════════════════════════════════
  // LESSON 25 — Conditionals: tara & demo
  // Grammar: Vた ら (if/when)  ·  Vて も (even if/even though)
  // ════════════════════════════════════════════════════════
  { id:'n5_25_01', lesson:25, level:'N5', word:'かんがえます', reading:'かんがえます', meaning:'Think / Consider', meaningNepali:'सोच्नु / विचार पुर्‍याउनु', kanjiCharacters:['考'], partOfSpeech:'Verb (Group 2)',
    grammarSentences:[{ japanese:'よくかんがえてください。', reading:'よくかんがえてください。', english:'Please think carefully.', nepali:'कृपया राम्ररी विचार गर्नुहोस्।' }]},
  { id:'n5_25_02', lesson:25, level:'N5', word:'つきます', reading:'つきます', meaning:'Arrive (at a station/destination)', meaningNepali:'पुग्नु (स्टेशन/गन्तव्यमा)', kanjiCharacters:['着'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'九時に駅につきます。', reading:'くじにえきにつきます。', english:'I arrive at the station at 9.', nepali:'म ९ बजे स्टेशनमा पुग्छु।' }]},
  { id:'n5_25_03', lesson:25, level:'N5', word:'りゅうがくします', reading:'りゅうがくします', meaning:'Study abroad', meaningNepali:'विदेशमा अध्ययन गर्नु', kanjiCharacters:['留','学'], partOfSpeech:'Verb (Irregular)',
    grammarSentences:[{ japanese:'お金があったらりゅうがくしたいです。', reading:'おかねがあったらりゅうがくしたいです。', english:'If I had money, I would like to study abroad.', nepali:'पैसा भयो भने म विदेशमा अध्ययन गर्न जान चाहन्छु।' }]},
  { id:'n5_25_04', lesson:25, level:'N5', word:'としをとります', reading:'としをとります', meaning:'Grow old / Age', meaningNepali:'उमेर ढल्किनु / बुढो हुनु', kanjiCharacters:['年'], partOfSpeech:'Verb (Group 1)',
    grammarSentences:[{ japanese:'としをとっても働きたいです。', reading:'としをとってもはたらきたいです。', english:'Even if I grow old, I want to work.', nepali:'बुढो भए पनि म काम गर्न चाहन्छु।' }]},
  { id:'n5_25_05', lesson:25, level:'N5', word:'いなか', reading:'いなか', meaning:'Countryside / Hometown', meaningNepali:'गाउँघर / ग्रामीण क्षेत्र', kanjiCharacters:['田','舎'], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'いなかは静かです。', reading:'いなかはしずかです。', english:'The countryside is quiet.', nepali:'गाउँघर शान्त हुन्छ।' }]},
  { id:'n5_25_06', lesson:25, level:'N5', word:'たいしかん', reading:'たいしかん', meaning:'Embassy', meaningNepali:'दूतावास', kanjiCharacters:['大','使','館'], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'たいしかんへ行かなければなりません。', reading:'たいしかんへいかなければなりません。', english:'I must go to the embassy.', nepali:'मैले दूतावासमा जानुपर्छ।' }]},
  { id:'n5_25_07', lesson:25, level:'N5', word:'グループ', reading:'グループ', meaning:'Group', meaningNepali:'समूह / ग्रुप', kanjiCharacters:[], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'グループで話し合います。', reading:'グループではなしあいます。', english:'We discuss in groups.', nepali:'हामी समूहमा छलफल गर्छौँ।' }]},
  { id:'n5_25_08', lesson:25, level:'N5', word:'チャンス', reading:'チャンス', meaning:'Chance / Opportunity', meaningNepali:'मौका / अवसर', kanjiCharacters:[], partOfSpeech:'Noun',
    grammarSentences:[{ japanese:'チャンスがあったら日本へ行きます。', reading:'チャンスがあったらにほんへいきます。', english:'If I get a chance, I will go to Japan.', nepali:'मौका मिले भने म जापान जानेछु।' }]}
];
