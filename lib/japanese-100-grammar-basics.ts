// ============================================================
// JAPANESE 100 GRAMMAR BASICS DATASET
// Foundational Grammar Rules for Beginners (with English & Nepali 🇳🇵)
// ============================================================

export interface BasicGrammarExample {
  target: string;
  reading: string;
  english: string;
  nepali: string;
}

export interface BasicGrammarItem {
  id: number;
  category: 
    | 'Sentence Structure'
    | 'Particles'
    | 'Demonstratives'
    | 'Verbs & Polite Form'
    | 'Te-Form Conjugation'
    | 'Plain & Negative Form'
    | 'Ta-Form & Past'
    | 'Adjectives'
    | 'Desires & Comparison'
    | 'Existence & Counters'
    | 'Giving & Receiving'
    | 'Reasons & Conditions';
  title: string;
  pattern: string;
  explanationEnglish: string;
  explanationNepali: string;
  examples: BasicGrammarExample[];
}

export const JAPANESE_100_GRAMMAR_BASICS: BasicGrammarItem[] = [
  // ─── 1. SENTENCE STRUCTURE & COPULA (1-10) ───
  {
    id: 1,
    category: 'Sentence Structure',
    title: '1. Basic Copula "X is Y" (〜は〜です)',
    pattern: 'N1 は N2 です',
    explanationEnglish: 'States that N1 is N2. は (wa) is the topic particle, and です (desu) is the polite copula (is/am/are).',
    explanationNepali: 'N1 नै N2 हो भनेर जनाउँछ। は (वा) विषय कण हो र です (देसु) शिष्ट क्रिया (हो) हो।',
    examples: [
      { target: 'わたしはラムです。', reading: 'わたし は らむ です。', english: 'I am Ram.', nepali: 'म राम हुँ।' },
      { target: 'かれはせんせいです。', reading: 'かれ は せんせい です。', english: 'He is a teacher.', nepali: 'उहाँ शिक्षक हुनुहुन्छ।' }
    ]
  },
  {
    id: 2,
    category: 'Sentence Structure',
    title: '2. Negative Copula "X is not Y" (〜ではありません)',
    pattern: 'N1 は N2 ではありません / じゃありません',
    explanationEnglish: 'Polite negative form of です. ではありません (dewa arimasen) is formal; じゃありません (ja arimasen) is conversational.',
    explanationNepali: 'です को शिष्ट नकारात्मक रूप। ではありません औपचारिक हो र じゃありません कुराकानीमा प्रयोग गरिन्छ।',
    examples: [
      { target: 'わたしはがくせいではありません。', reading: 'わたし は がくせい ではありません。', english: 'I am not a student.', nepali: 'म विद्यार्थी होइन।' },
      { target: 'ここはびょういんじゃありません。', reading: 'ここ は びょういん じゃありません。', english: 'This is not a hospital.', nepali: 'यो अस्पताल होइन।' }
    ]
  },
  {
    id: 3,
    category: 'Sentence Structure',
    title: '3. Past Copula "X was Y" (〜でした)',
    pattern: 'N1 は N2 でした',
    explanationEnglish: 'Polite past affirmative form of です.',
    explanationNepali: 'です को शिष्ट भूतकाल रूप (थियो/हुनुहुन्थ्यो)।',
    examples: [
      { target: 'きのうはあめでした。', reading: 'きのう は あめ でした。', english: 'Yesterday was rainy.', nepali: 'हिजो पानी परेको थियो।' },
      { target: 'たなかさんはせんせいでした。', reading: 'たなかさん は せんせい でした。', english: 'Mr. Tanaka was a teacher.', nepali: 'तानाका जी शिक्षक हुनुहुन्थ्यो।' }
    ]
  },
  {
    id: 4,
    category: 'Sentence Structure',
    title: '4. Past Negative Copula "X was not Y" (〜ではありませんでした)',
    pattern: 'N1 は N2 ではありませんでした / じゃなかったです',
    explanationEnglish: 'Polite past negative form of です.',
    explanationNepali: 'です को शिष्ट भूतकाल नकारात्मक रूप (थिएन)।',
    examples: [
      { target: 'きのうはやすみではありませんでした。', reading: 'きのう は やすみ ではありませんでした。', english: 'Yesterday was not a holiday.', nepali: 'हिजो बिदा थिएन।' }
    ]
  },
  {
    id: 5,
    category: 'Sentence Structure',
    title: '5. Question Particle (〜ですか)',
    pattern: '[Sentence] か',
    explanationEnglish: 'Adding か (ka) at the end turns any statement into a polite question.',
    explanationNepali: 'वाक्यको अन्त्यमा か (का) थपेर प्रश्न बनाइन्छ।',
    examples: [
      { target: 'あなたはがくせいですか。', reading: 'あなた は がくせい です か。', english: 'Are you a student?', nepali: 'के तपाईं विद्यार्थी हुनुहुन्छ?' }
    ]
  },
  {
    id: 6,
    category: 'Sentence Structure',
    title: '6. Asking "What?" (何ですか)',
    pattern: 'これ / それ / あれ は 何（なん）ですか',
    explanationEnglish: 'Used to ask "What is this/that?"',
    explanationNepali: '"यो/त्यो के हो?" भनी सोध्न प्रयोग गरिन्छ।',
    examples: [
      { target: 'これはなんですか。', reading: 'これ は なん です か。', english: 'What is this?', nepali: 'यो के हो?' }
    ]
  },
  {
    id: 7,
    category: 'Sentence Structure',
    title: '7. Asking "Who?" (誰ですか / だれですか)',
    pattern: 'あの人 は 誰（だれ）ですか',
    explanationEnglish: 'Used to inquire about a person\'s identity.',
    explanationNepali: 'कुनै मानिसको परिचय सोध्न प्रयोग गरिन्छ।',
    examples: [
      { target: 'あのひとはだれですか。', reading: 'あの ひと は だれ です か。', english: 'Who is that person?', nepali: 'त्यो मानिस को हो?' }
    ]
  },
  {
    id: 8,
    category: 'Sentence Structure',
    title: '8. Asking "Where?" (どこですか)',
    pattern: 'N は どこですか',
    explanationEnglish: 'Used to ask the location of a place, object, or person.',
    explanationNepali: 'ठाउँ, वस्तु वा व्यक्तिको स्थान सोध्न प्रयोग गरिन्छ।',
    examples: [
      { target: 'トイレはどこですか。', reading: 'といれ は どこ です か。', english: 'Where is the restroom?', nepali: 'शौचालय कहाँ छ?' }
    ]
  },
  {
    id: 9,
    category: 'Sentence Structure',
    title: '9. Asking "When?" (いつですか)',
    pattern: 'N は いつですか',
    explanationEnglish: 'Used to ask about time or date.',
    explanationNepali: 'समय वा मिति सोध्न प्रयोग गरिन्छ।',
    examples: [
      { target: 'たんじょうびはいつですか。', reading: 'たんじょうび は いつ です か。', english: 'When is your birthday?', nepali: 'तपाईंको जन्मदिन कहिले हो?' }
    ]
  },
  {
    id: 10,
    category: 'Sentence Structure',
    title: '10. Asking "Why?" (なぜ / どうして)',
    pattern: 'どうして / なぜ [Sentence] か',
    explanationEnglish: 'Used to ask for reasons or causes.',
    explanationNepali: 'कारण वा उत्तर माग्न प्रयोग गरिन्छ।',
    examples: [
      { target: 'どうしてちこくしましたか。', reading: 'どうして ちこく しました か。', english: 'Why were you late?', nepali: 'तपाईं किन ढिलो हुनुभयो?' }
    ]
  },

  // ─── 2. CORE PARTICLES (11-30) ───
  {
    id: 11,
    category: 'Particles',
    title: '11. Topic Particle は (wa)',
    pattern: 'N は',
    explanationEnglish: 'Marks the topic of the sentence. Pronounced "wa" when used as a particle.',
    explanationNepali: 'वाक्यको मुख्य विषय जनाउँछ। कणको रूपमा उच्चारण "वा" हुन्छ।',
    examples: [
      { target: 'きょうはあついです。', reading: 'きょう は あつい です。', english: 'Today is hot.', nepali: 'आज गर्मी छ।' }
    ]
  },
  {
    id: 12,
    category: 'Particles',
    title: '12. Subject Particle が (ga)',
    pattern: 'N が V / Adj',
    explanationEnglish: 'Marks the grammatical subject, especially when introducing new information or with existence verbs (ある/いる).',
    explanationNepali: 'व्याकरणिक कर्ता वा नयाँ जानकारी र अस्तित्व जनाउने क्रिया (ある/いる) मा प्रयोग हुन्छ।',
    examples: [
      { target: 'ねこがいます。', reading: 'ねこ が います。', english: 'There is a cat.', nepali: 'बिरालो छ।' }
    ]
  },
  {
    id: 13,
    category: 'Particles',
    title: '13. Direct Object Particle を (o)',
    pattern: 'N を V',
    explanationEnglish: 'Marks the direct object of a transitive verb. Pronounced "o".',
    explanationNepali: 'सकर्मक क्रियाको प्रत्यक्ष कर्म जनाउँछ। उच्चारण "ओ" हुन्छ।',
    examples: [
      { target: 'みずをみます。', reading: 'みず を のみます。', english: 'I drink water.', nepali: 'म पानी पिउँछु।' }
    ]
  },
  {
    id: 14,
    category: 'Particles',
    title: '14. Destination / Target Particle に (ni)',
    pattern: 'Place に 行きます / 来ます',
    explanationEnglish: 'Indicates the destination or direction of movement verbs.',
    explanationNepali: 'चाल वा गति क्रियाहरूको गन्तव्य वा दिशा जनाउँछ।',
    examples: [
      { target: 'がっこうにいきます。', reading: 'がっこう に いきます。', english: 'I go to school.', nepali: 'म विद्यालय जान्छु।' }
    ]
  },
  {
    id: 15,
    category: 'Particles',
    title: '15. Specific Time Particle に (ni)',
    pattern: 'Time に V',
    explanationEnglish: 'Used with specific numeric clock times, days, or months.',
    explanationNepali: 'निदिष्ट घडीको समय, दिन वा महिनासँग प्रयोग गरिन्छ।',
    examples: [
      { target: 'しちじにおきます。', reading: 'しちじ に おきます。', english: 'I wake up at 7 o\'clock.', nepali: 'म ७ बजे उठ्छु।' }
    ]
  },
  {
    id: 16,
    category: 'Particles',
    title: '16. Direction Particle へ (e)',
    pattern: 'Place へ 行きます',
    explanationEnglish: 'Emphasizes the general direction of travel. Pronounced "e".',
    explanationNepali: 'यात्राको सामान्य दिशालाई जोड दिन्छ। उच्चारण "ए" हुन्छ।',
    examples: [
      { target: 'とうきょうへいきます。', reading: 'とうきょう へ いきます。', english: 'I am heading towards Tokyo.', nepali: 'म तोकियो तर्फ जाँदैछु।' }
    ]
  },
  {
    id: 17,
    category: 'Particles',
    title: '17. Location of Action Particle で (de)',
    pattern: 'Place で V',
    explanationEnglish: 'Marks the location where an action takes place.',
    explanationNepali: 'कुनै कार्य सम्पन्न हुने स्थान जनाउँछ।',
    examples: [
      { target: 'としょかんでべんきょうします。', reading: 'としょかん で べんきょう します。', english: 'I study at the library.', nepali: 'म पुस्तकालयमा पढ्छु।' }
    ]
  },
  {
    id: 18,
    category: 'Particles',
    title: '18. Means / Tool Particle で (de)',
    pattern: 'Means で V',
    explanationEnglish: 'Indicates the instrument, tool, transport, or language used.',
    explanationNepali: 'प्रयोग गरिएको औजार, साधन, सवारी वा भाषा जनाउँछ।',
    examples: [
      { target: 'バスでいきます。', reading: 'ばす で いきます。', english: 'I go by bus.', nepali: 'म बसमा जान्छु।' }
    ]
  },
  {
    id: 19,
    category: 'Particles',
    title: '19. Possession / Modification Particle の (no)',
    pattern: 'N1 の N2',
    explanationEnglish: 'Connects two nouns to show possession ("N1\'s N2") or origin.',
    explanationNepali: 'स्वामित्व ("N1 को N2") वा उत्पत्ति जनाउन दुई संज्ञा जोड्छ।',
    examples: [
      { target: 'わたしのかばんです。', reading: 'わたし の かばん です。', english: 'It is my bag.', nepali: 'यो मेरो झोला हो।' }
    ]
  },
  {
    id: 20,
    category: 'Particles',
    title: '20. Companion Particle と (to)',
    pattern: 'Person と V',
    explanationEnglish: 'Means "with" a person or companion.',
    explanationNepali: 'कुनै व्यक्तिसँगै ("सँग") भन्ने अर्थमा प्रयोग हुन्छ।',
    examples: [
      { target: 'ともだちといきます。', reading: 'ともだち と いきます。', english: 'I will go with a friend.', nepali: 'म साथीसँग जान्छु।' }
    ]
  },
  {
    id: 21,
    category: 'Particles',
    title: '21. Complete Listing Particle と (to)',
    pattern: 'N1 と N2',
    explanationEnglish: 'Connects nouns in an exhaustive list ("N1 and N2").',
    explanationNepali: 'संज्ञाहरूको पूर्ण सूची जोड्न प्रयोग हुन्छ ("र")।',
    examples: [
      { target: 'りんごとバナナをかいました。', reading: 'りんご と ばなな を かいました。', english: 'I bought apples and bananas.', nepali: 'मैंने स्याउ र केरा किनेँ।' }
    ]
  },
  {
    id: 22,
    category: 'Particles',
    title: '22. Incomplete Listing Particle や (ya)',
    pattern: 'N1 や N2 [など]',
    explanationEnglish: 'Lists nouns non-exhaustively ("N1, N2, and things like that").',
    explanationNepali: 'अपूर्ण सूची जनाउन प्रयोग हुन्छ ("यस्तै आदि")।',
    examples: [
      { target: '本やペンを買いました。', reading: 'ほん や ぺん を かいました。', english: 'I bought books, pens, etc.', nepali: 'मैले किताब र कलम आदि किनेँ।' }
    ]
  },
  {
    id: 23,
    category: 'Particles',
    title: '23. Starting Point Particle から (kara)',
    pattern: 'Point から',
    explanationEnglish: 'Indicates starting time or starting place ("from").',
    explanationNepali: 'सुरु हुने समय वा स्थान जनाउँछ ("देखि/बाट")।',
    examples: [
      { target: 'くじから はじまります。', reading: 'くじ から はじまります。', english: 'It starts from 9 o\'clock.', nepali: '९ बजेदेखि सुरु हुन्छ।' }
    ]
  },
  {
    id: 24,
    category: 'Particles',
    title: '24. Endpoint Particle まで (made)',
    pattern: 'Point まで',
    explanationEnglish: 'Indicates ending time or limit location ("until / to").',
    explanationNepali: 'अन्त्य हुने समय वा सीमा जनाउँछ ("सम्म")।',
    examples: [
      { target: 'ごじまで はたらきます。', reading: 'ごじ まで はたらきます。', english: 'I work until 5 o\'clock.', nepali: 'म ५ बजेसम्म काम गर्छु।' }
    ]
  },
  {
    id: 25,
    category: 'Particles',
    title: '25. Also / Too Particle も (mo)',
    pattern: 'N も',
    explanationEnglish: 'Replaces は/が/を to mean "also" or "too".',
    explanationNepali: 'は/が/を को सट्टामा "पनि" भन्ने अर्थमा प्रयोग गरिन्छ।',
    examples: [
      { target: 'わたしもがくせいです。', reading: 'わたし も がくせい です。', english: 'I am also a student.', nepali: 'म पनि विद्यार्थी हुँ।' }
    ]
  },
  {
    id: 26,
    category: 'Particles',
    title: '26. Choice / Alternative Particle か (ka)',
    pattern: 'N1 か N2',
    explanationEnglish: 'Connects two choices ("N1 or N2").',
    explanationNepali: 'दुई विकल्पहरू जोड्न प्रयोग हुन्छ ("वा / अथवा")।',
    examples: [
      { target: 'おちゃかコーヒーをのみます。', reading: 'おちゃ か こーひー を のみます。', english: 'I will drink tea or coffee.', nepali: 'म चिया वा कफी पिउँछु।' }
    ]
  },
  {
    id: 27,
    category: 'Particles',
    title: '27. Confirmation Particle ね (ne)',
    pattern: '[Sentence] ね',
    explanationEnglish: 'Placed at end of sentence to seek agreement ("right? / isn\'t it?").',
    explanationNepali: 'वाक्यको अन्त्यमा सहमति माग्न प्रयोग गरिन्छ ("हैन त?")।',
    examples: [
      { target: 'いいてんきですね。', reading: 'いい てんき です ね。', english: 'Nice weather, isn\'t it?', nepali: 'राम्रो मौसम छ, है?' }
    ]
  },
  {
    id: 28,
    category: 'Particles',
    title: '28. Sentence Ending Emphasis Particle よ (yo)',
    pattern: '[Sentence] よ',
    explanationEnglish: 'Used to impart new information or emphasize a point ("you know").',
    explanationNepali: 'नयाँ जानकारी वा जोड दिन प्रयोग गरिन्छ।',
    examples: [
      { target: 'このほんはおもしろいですよ。', reading: 'この ほん は おもしろい です よ。', english: 'This book is interesting, you know!', nepali: 'यो किताब रमाइलो छ है!' }
    ]
  },
  {
    id: 29,
    category: 'Particles',
    title: '29. Nominalizer Particle の (no)',
    pattern: 'V-plain の は Adj です',
    explanationEnglish: 'Turns a verb clause into a noun phrase.',
    explanationNepali: 'क्रियालाई संज्ञा वाक्यांशमा रूपान्तरण गर्छ।',
    examples: [
      { target: 'にほんごをべんきょうするのはたのしいです。', reading: 'にほんご を べんきょう する の は たのしい です。', english: 'Studying Japanese is fun.', nepali: 'जापानी भाषा पढ्नु रमाइलो छ।' }
    ]
  },
  {
    id: 30,
    category: 'Particles',
    title: '30. Combined Particles (へ の / で の)',
    pattern: 'N1 への N2 / N1 での N2',
    explanationEnglish: 'Combines directional/locational particle with の to modify a following noun.',
    explanationNepali: 'पछिल्लो संज्ञालाई रूपान्तरण गर्न directional/locational कणलाई の सँग मिलाइन्छ।',
    examples: [
      { target: 'にほんへのりょこう', reading: 'にほん へ の りょこう', english: 'A trip to Japan', nepali: 'जापानतर्फको यात्रा' }
    ]
  },

  // ─── 3. DEMONSTRATIVES & DIRECTIONS (31-36) ───
  {
    id: 31,
    category: 'Demonstratives',
    title: '31. Demonstrative Pronouns (これ / それ / あれ / どれ)',
    pattern: 'これ (this) / それ (that) / あれ (that over there) / どれ (which)',
    explanationEnglish: 'Stand-alone pronouns referencing objects based on distance from speaker and listener.',
    explanationNepali: 'वक्ता र सुन्ने व्यक्तिको दूरीको आधारमा वस्तु बुझाउने सर्वनाम।',
    examples: [
      { target: 'これはわたしのかばんです。', reading: 'これ は わたし の かばん です。', english: 'This is my bag.', nepali: 'यो मेरो झोला हो।' }
    ]
  },
  {
    id: 32,
    category: 'Demonstratives',
    title: '32. Demonstrative Modifiers (この / その / あの / どの)',
    pattern: 'この N / その N / あの N / どの N',
    explanationEnglish: 'Must directly precede a noun ("this book", "that person").',
    explanationNepali: 'सधैं संज्ञाको अगाडि प्रयोग हुनुपर्छ ("यो किताब", "त्यो मानिस")।',
    examples: [
      { target: 'このほんはたかいです。', reading: 'この ほん は たかい です。', english: 'This book is expensive.', nepali: 'यो किताब महँगो छ।' }
    ]
  },
  {
    id: 33,
    category: 'Demonstratives',
    title: '33. Location Demonstratives (ここ / そこ / あそこ / どこ)',
    pattern: 'ここ (here) / そこ (there) / あそこ (over there) / どこ (where)',
    explanationEnglish: 'Refers to places and physical locations.',
    explanationNepali: 'स्थान र भौतिक ठाउँहरू बुझाउँछ।',
    examples: [
      { target: 'ここはきょうしつです。', reading: 'ここ は きょうしつ です。', english: 'Here is the classroom.', nepali: 'यहाँ कक्षाकोठा हो।' }
    ]
  },
  {
    id: 34,
    category: 'Demonstratives',
    title: '34. Direction & Polite Location (こちら / そちら / あちら / どちら)',
    pattern: 'こちら / そちら / あちら / どちら',
    explanationEnglish: 'Polite way to indicate direction or places.',
    explanationNepali: 'दिशा वा स्थान शिष्ट रूपमा देखाउने तरीका।',
    examples: [
      { target: 'エレベーターはこちらです。', reading: 'えれべーたー は こちら です。', english: 'The elevator is this way.', nepali: 'लिफ्ट यतातिर छ।' }
    ]
  },
  {
    id: 35,
    category: 'Demonstratives',
    title: '35. Type Demonstratives (こんな / そんな / あんな / どんな)',
    pattern: 'どんな N ですか',
    explanationEnglish: 'Describes the nature or type of noun ("what kind of N?").',
    explanationNepali: 'संज्ञाको प्रकार वा स्वभाव सोध्न प्रयोग गरिन्छ ("कस्तो खालको?")।',
    examples: [
      { target: 'どんなまちですか。', reading: 'どんな まち です か。', english: 'What kind of town is it?', nepali: 'यो कस्तो सहर हो?' }
    ]
  },
  {
    id: 36,
    category: 'Demonstratives',
    title: '36. Manner Demonstratives (こう / そう / ああ / どう)',
    pattern: 'どう ですか',
    explanationEnglish: 'Asks "How is it?" or describes manner of doing.',
    explanationNepali: '"कस्तो छ?" वा तरिका सोध्न प्रयोग हुन्छ।',
    examples: [
      { target: 'にほんのせいかつはどうですか。', reading: 'にほん の せいかつ は どう です か。', english: 'How is life in Japan?', nepali: 'जापानको जीवन कस्तो छ?' }
    ]
  },

  // ─── 4. VERBS & POLITE FORM (37-46) ───
  {
    id: 37,
    category: 'Verbs & Polite Form',
    title: '37. Non-Past Polite Form (〜ます)',
    pattern: 'V-stem ます',
    explanationEnglish: 'Polite present/future tense form of verbs.',
    explanationNepali: 'क्रियाको शिष्ट वर्तमान/भविष्य काल रूप।',
    examples: [
      { target: 'まいにちにほんごをべんきょうします。', reading: 'まいにち にほんご を べんきょう します。', english: 'I study Japanese every day.', nepali: 'म दिनहूँ जापानी पढ्छु।' }
    ]
  },
  {
    id: 38,
    category: 'Verbs & Polite Form',
    title: '38. Non-Past Negative Polite (〜ません)',
    pattern: 'V-stem ません',
    explanationEnglish: 'Polite present/future negative form.',
    explanationNepali: 'शिष्ट वर्तमान/भविष्य नकारात्मक रूप।',
    examples: [
      { target: 'あしたはがっこうへいきません。', reading: 'あした は がっこう へ いきません。', english: 'I will not go to school tomorrow.', nepali: 'म भोलि विद्यालय जाँदिन।' }
    ]
  },
  {
    id: 39,
    category: 'Verbs & Polite Form',
    title: '39. Past Affirmative Polite (〜ました)',
    pattern: 'V-stem ました',
    explanationEnglish: 'Polite past tense form.',
    explanationNepali: 'शिष्ट भूतकाल रूप।',
    examples: [
      { target: 'きのうほんをよみました。', reading: 'きのう ほん を よみました。', english: 'I read a book yesterday.', nepali: 'मैले हिजो किताब पढेँ।' }
    ]
  },
  {
    id: 40,
    category: 'Verbs & Polite Form',
    title: '40. Past Negative Polite (〜ませんでした)',
    pattern: 'V-stem ませんでした',
    explanationEnglish: 'Polite past negative tense form.',
    explanationNepali: 'शिष्ट भूतकाल नकारात्मक रूप।',
    examples: [
      { target: 'けさあさごはんをたべませんでした。', reading: 'けさ あさごはん を たべませんでした。', english: 'I didn\'t eat breakfast this morning.', nepali: 'मैले आज बिहान खाना खाइन।' }
    ]
  },
  {
    id: 41,
    category: 'Verbs & Polite Form',
    title: '41. Invitation / Let\'s Do (〜ましょう)',
    pattern: 'V-stem ましょう',
    explanationEnglish: 'Used to propose an action or say "Let\'s do X".',
    explanationNepali: 'प्रस्ताव राख्न वा "गरौं" भन्न प्रयोग गरिन्छ।',
    examples: [
      { target: 'いっしょにやすみましょう。', reading: 'いっしょ に やすみましょう。', english: 'Let\'s rest together.', nepali: 'सँगै आराम गरौं।' }
    ]
  },
  {
    id: 42,
    category: 'Verbs & Polite Form',
    title: '42. Suggestion / Shall We? (〜ましょうか)',
    pattern: 'V-stem ましょうか',
    explanationEnglish: 'Offers help or asks "Shall we do X?"',
    explanationNepali: 'मद्दतको प्रस्ताव गर्न वा "गरौं त?" भन्न प्रयोग गरिन्छ।',
    examples: [
      { target: 'てつだいましょうか。', reading: 'てつだいましょう か。', english: 'Shall I help you?', nepali: 'के म तपाईंलाई मद्दत गरूँ?' }
    ]
  },
  {
    id: 43,
    category: 'Verbs & Polite Form',
    title: '43. Purpose of Movement (〜に行きます)',
    pattern: 'Place に V-stem / N に 行きます',
    explanationEnglish: 'Indicates going somewhere in order to do something.',
    explanationNepali: 'कुनै काम गर्न कतै जाने उद्देश्य जनाउँछ।',
    examples: [
      { target: 'デパートへほんをかいにいきます。', reading: 'でぱーと へ ほん を かい に いきます。', english: 'I go to department store to buy a book.', nepali: 'म किताब किन्न डिपार्टमेन्ट स्टोर जान्छु।' }
    ]
  },
  {
    id: 44,
    category: 'Verbs & Polite Form',
    title: '44. Simultaneous Actions (〜ながら)',
    pattern: 'V1-stem ながら V2',
    explanationEnglish: 'Doing V1 while doing main action V2.',
    explanationNepali: 'V2 मुख्य काम गर्दै गर्दा V1 पनि सँगै गर्नु।',
    examples: [
      { target: 'おんがくをききながらべんきょうします。', reading: 'おんがく を ききながら べんきょう します。', english: 'I study while listening to music.', nepali: 'म संगीत सुन्दै अध्ययन गर्छु।' }
    ]
  },
  {
    id: 45,
    category: 'Verbs & Polite Form',
    title: '45. Habitual Actions (〜ています)',
    pattern: 'V-stem ています',
    explanationEnglish: 'Indicates a repeated habit or ongoing routine.',
    explanationNepali: 'दोहोरिने बानी वा नियमित कार्य जनाउँछ।',
    examples: [
      { target: 'まいにちジョギングをしています。', reading: 'まいにち じょぎんぐ を しています。', english: 'I do jogging every day.', nepali: 'म दिनहूँ जोगिङ गर्छु।' }
    ]
  },
  {
    id: 46,
    category: 'Verbs & Polite Form',
    title: '46. State of Being Married/Living (〜ています)',
    pattern: 'けっこんしています / すんでいます',
    explanationEnglish: 'Uses ています to express current resultant state.',
    explanationNepali: 'हालको परिणामी अवस्था (वैवाहिक status, बसोबास) जनाउँछ।',
    examples: [
      { target: 'わたしはカトマンズにすんでいます。', reading: 'わたし は かとまんず に すんでいます。', english: 'I live in Kathmandu.', nepali: 'म काठमाडौंमा बस्छु।' }
    ]
  },

  // ─── 5. TE-FORM CONJUGATION & USAGE (47-54) ───
  {
    id: 47,
    category: 'Te-Form Conjugation',
    title: '47. Group 1 Verb Te-Form Rules (う/つ/る→った, く→いた, etc.)',
    pattern: 'Group 1 Te-Form Rules',
    explanationEnglish: 'G1 endings: う・つ・る → った | む・ぶ・ぬ → んだ | く → いた (行く→行っと) | ぐ → いだ | す → して',
    explanationNepali: 'G1 अन्त्य: う・つ・る → った | む・ぶ・ぬ → んだ | く → いた | ぐ → いだ | す → して',
    examples: [
      { target: 'かって（買う）、のんで（飲む）、かいて（書く）', reading: 'かって、のんで、かいて', english: 'Buy (te), drink (te), write (te)', nepali: 'किनेर, पिएर, लेखेर' }
    ]
  },
  {
    id: 48,
    category: 'Te-Form Conjugation',
    title: '48. Group 2 & Group 3 Te-Form Rules',
    pattern: 'G2: る → て | G3: する→して, くる→きて',
    explanationEnglish: 'Group 2 verbs drop る and add て. Group 3 are irregular.',
    explanationNepali: 'Group 2 मा る हटाएर て थपिन्छ। Group 3 अनियमित हुन्छन्।',
    examples: [
      { target: 'たべて（食べる）、みち（見る）、きて（来る）', reading: 'たべて、みて、きて', english: 'Eat (te), watch (te), come (te)', nepali: 'खाएर, हेरेर, आएर' }
    ]
  },
  {
    id: 49,
    category: 'Te-Form Conjugation',
    title: '49. Polite Request (〜てください)',
    pattern: 'V-て ください',
    explanationEnglish: 'Polite request saying "Please do X".',
    explanationNepali: 'शिष्ट अनुरोध "कृपया X गर्नुहोस्"।',
    examples: [
      { target: 'ここに名前をかいてください。', reading: 'ここ に なまえ を かいて ください。', english: 'Please write your name here.', nepali: 'कृपया यहाँ आफ्नो नाम लेख्नुहोस्।' }
    ]
  },
  {
    id: 50,
    category: 'Te-Form Conjugation',
    title: '50. Progressive Action (〜 me います)',
    pattern: 'V-て います',
    explanationEnglish: 'Indicates an action currently taking place right now.',
    explanationNepali: 'अहिले भइरहेको निरन्तर कार्य जनाउँछ।',
    examples: [
      { target: 'いまごはんをたべています。', reading: 'いま ごはん を たべて います。', english: 'I am eating food right now.', nepali: 'म अहिले खाना खाँदैछु।' }
    ]
  },
  {
    id: 51,
    category: 'Te-Form Conjugation',
    title: '51. Permission (〜てもいいです)',
    pattern: 'V-て もいいです',
    explanationEnglish: 'Asks or grants permission ("May I do X? / You may do X").',
    explanationNepali: 'अनुमति माग्न वा दिन प्रयोग गरिन्छ ("के म गर्दा हुन्छ?")।',
    examples: [
      { target: 'しゃしんを撮ってもいいですか。', reading: 'しゃしん を とっても いい です か。', english: 'May I take a photo?', nepali: 'के म फोटो खिच्न सक्छु?' }
    ]
  },
  {
    id: 52,
    category: 'Te-Form Conjugation',
    title: '52. Prohibition (〜てはいけません)',
    pattern: 'V-て は いけません',
    explanationEnglish: 'Expresses prohibition ("You must not do X").',
    explanationNepali: 'मनाही वा प्रतिबन्ध जनाउँछ ("गर्नु हुँदैन")।',
    examples: [
      { target: 'ここでたばこをすってはいけません。', reading: 'ここ で たばこ を すって は いけません。', english: 'You must not smoke here.', nepali: 'यहाँ चुरोट पिउनु हुँदैन।' }
    ]
  },
  {
    id: 53,
    category: 'Te-Form Conjugation',
    title: '53. Sequence of Actions (〜てから)',
    pattern: 'V1-て から V2',
    explanationEnglish: 'Expresses "After doing V1, then do V2".',
    explanationNepali: '"V1 गरेपछि V2 गर्नु" भन्ने क्रम जनाउँछ।',
    examples: [
      { target: 'てをあ洗ってからごはんをたべます。', reading: 'て を あらって から ごはん を たべます。', english: 'After washing hands, I eat meal.', nepali: 'हात धोएपछि खाना खान्छु।' }
    ]
  },
  {
    id: 54,
    category: 'Te-Form Conjugation',
    title: '54. Connecting Sentences with Te-Form',
    pattern: 'S1-て、S2',
    explanationEnglish: 'Connects multiple verb actions chronologically.',
    explanationNepali: 'धेरै क्रिया कार्यहरूलाई समयक्रम अनुसार जोड्छ।',
    examples: [
      { target: 'あさおきて、かおをあらって、がっこうへいきます。', reading: 'あさ おきて、かお を あらって、がっこう へ いきます。', english: 'I wake up in the morning, wash face, and go to school.', nepali: 'बिहान उठेर, मुख धोएर, विद्यालय जान्छु।' }
    ]
  },

  // ─── 6. PLAIN & NEGATIVE FORM (55-62) ───
  {
    id: 55,
    category: 'Plain & Negative Form',
    title: '55. Dictionary Form (辞書形)',
    pattern: 'V-plain (dictionary)',
    explanationEnglish: 'The casual non-past affirmative form of a verb.',
    explanationNepali: 'क्रियाको सामान्य अशिष्ट वर्तमान रूप।',
    examples: [
      { target: 'たべる、いく、はなす', reading: 'たべる、いく、はなす', english: 'Eat, go, speak', nepali: 'खानु, जानु, बोल्नु' }
    ]
  },
  {
    id: 56,
    category: 'Plain & Negative Form',
    title: '56. Expressing Ability (〜ことができます)',
    pattern: 'V-dictionary の / ことができます',
    explanationEnglish: 'Expresses potential or ability to do something.',
    explanationNepali: 'कुनै काम गर्न सक्ने क्षमता जनाउँछ।',
    examples: [
      { target: 'わたしはにほんごをはなすことができます。', reading: 'わたし は にほんご を はなす こと が できます。', english: 'I can speak Japanese.', nepali: 'म जापानी भाषा बोल्न सक्छु।' }
    ]
  },
  {
    id: 57,
    category: 'Plain & Negative Form',
    title: '57. Expressing Hobby (趣味は〜ことです)',
    pattern: 'しゅみ は V-dictionary ことです',
    explanationEnglish: 'States one\'s hobby using nominalized dictionary form.',
    explanationNepali: 'आफ्नो रुचि वा सेख बताउन प्रयोग गरिन्छ।',
    examples: [
      { target: 'わたしもしゅみはえいがをみることです。', reading: 'わたし の しゅみ は えいが を みる こと です。', english: 'My hobby is watching movies.', nepali: 'मेरो रुचि चलचित्र हेर्नु हो।' }
    ]
  },
  {
    id: 58,
    category: 'Plain & Negative Form',
    title: '58. Plain Negative Form (ナイ形)',
    pattern: 'G1: a-row + ない | G2: る→ない | G3: する→しない, くる→こない',
    explanationEnglish: 'Casual negative verb form used in informal speech or complex grammar.',
    explanationNepali: 'अनौपचारिक नकारात्मक रूप।',
    examples: [
      { target: 'いかない、たべない、しない、こない', reading: 'いかない、たべない、しない、こない', english: 'Don\'t go, don\'t eat, don\'t do, don\'t come', nepali: 'जाँदिन, खाँदिन, गर्दिन, आउँदिन' }
    ]
  },
  {
    id: 59,
    category: 'Plain & Negative Form',
    title: '59. Obligation / Must Do (〜なければなりません)',
    pattern: 'V-ない (drop い) + ければなりません',
    explanationEnglish: 'Expresses necessity or obligation ("must do X").',
    explanationNepali: 'अनिवार्यता जनाउँछ ("गर्नै पर्छ")।',
    examples: [
      { target: 'くすりをのまなければなりません。', reading: 'くすり を のまなければなりません。', english: 'I must take medicine.', nepali: 'मैले औषधि खानै पर्छ।' }
    ]
  },
  {
    id: 60,
    category: 'Plain & Negative Form',
    title: '60. Non-Necessity / Need Not Do (〜なくてもいいです)',
    pattern: 'V-ない (drop い) + くてもいいです',
    explanationEnglish: 'Expresses that something is not necessary ("don\'t have to").',
    explanationNepali: 'गर्नु नपर्ने छुट जनाउँछ ("नगरे पनि हुन्छ")।',
    examples: [
      { target: 'あしたはこなくてもいいです。', reading: 'あした は こなくても いい です。', english: 'You don\'t have to come tomorrow.', nepali: 'भोलि नआए पनि हुन्छ।' }
    ]
  },
  {
    id: 61,
    category: 'Plain & Negative Form',
    title: '61. Negative Request (〜ないでください)',
    pattern: 'V-ない で ください',
    explanationEnglish: 'Polite request asking someone NOT to do something.',
    explanationNepali: 'कुनै काम नगर्न शिष्ट अनुरोध।',
    examples: [
      { target: '心配しないでください。', reading: 'しんぱい しないで ください。', english: 'Please don\'t worry.', nepali: 'कृपया चिन्ता नगर्नुहोस्।' }
    ]
  },
  {
    id: 62,
    category: 'Plain & Negative Form',
    title: '62. Doing Action Without (〜ないで)',
    pattern: 'V1-ない で V2',
    explanationEnglish: 'Doing V2 without doing V1.',
    explanationNepali: 'V1 काम नगरी V2 काम गर्नु।',
    examples: [
      { target: 'あさごはんをたべないでがっこうへいきました。', reading: 'あさごはん を たべないで がっこう へ いきました。', english: 'I went to school without eating breakfast.', nepali: 'बिहानको खाना नखाई विद्यालय गएँ।' }
    ]
  },

  // ─── 7. TA-FORM & PAST (63-68) ───
  {
    id: 63,
    category: 'Ta-Form & Past',
    title: '63. Ta-Form Conjugation (た形)',
    pattern: 'Same conjugation rules as て-form, replacing て/で with た/だ',
    explanationEnglish: 'The casual past tense form of verbs.',
    explanationNepali: 'क्रियाको अनौपचारिक भूतकाल रूप (て/で को ठाउँमा た/だ)।',
    examples: [
      { target: 'いった（行った）、のんだ（飲んだ）、たべた（食べた）', reading: 'いった、のんだ、たべた', english: 'Went, drank, ate', nepali: 'गएँ, पिएँ, खाएँ' }
    ]
  },
  {
    id: 64,
    category: 'Ta-Form & Past',
    title: '64. Past Experience (〜たことがあります)',
    pattern: 'V-た ことがあります',
    explanationEnglish: 'Expresses past experience ("have had experience of doing X").',
    explanationNepali: 'विगतको अनुभव बताउन प्रयोग गरिन्छ ("गरेको अनुभव छ")।',
    examples: [
      { target: 'わたしはにほんへ行ったことがあります。', reading: 'わたし は にほん へ いった こと が あります。', english: 'I have been to Japan.', nepali: 'म जापान गएको अनुभव छ।' }
    ]
  },
  {
    id: 65,
    category: 'Ta-Form & Past',
    title: '65. Listing Representative Actions (〜たり〜たりします)',
    pattern: 'V1-たり V2-たり します',
    explanationEnglish: 'Lists example actions among others ("doing things like V1 and V2").',
    explanationNepali: 'विभिन्न कार्यहरूमध्ये प्रतिनिधि कार्यहरू उदाहरण दिन प्रयोग हुन्छ।',
    examples: [
      { target: 'しゅうまつはほんをよんだりおんがくをきいたりします。', reading: 'しゅうまつ は ほん を よんだり おんがく を きいたり します。', english: 'On weekends I do things like read books and listen to music.', nepali: 'सप्ताहान्तमा किताब पढ्ने र संगीत सुन्ने जस्ता काम गर्छु।' }
    ]
  },
  {
    id: 66,
    category: 'Ta-Form & Past',
    title: '66. Advice / Suggestion (〜ほうがいいです)',
    pattern: 'V-た ほうがいいです / V-ない ほうがいいです',
    explanationEnglish: 'Gives advice ("it is better to / better not to").',
    explanationNepali: 'सलाह वा सुझाव दिन प्रयोग हुन्छ ("गर्नु राम्रो हुन्छ")।',
    examples: [
      { target: 'はやくねたほうがいいです。', reading: 'はやく ねた ほうが いい です。', english: 'It is better to go to bed early.', nepali: 'छिटो सुत्नु राम्रो हुन्छ।' }
    ]
  },
  {
    id: 67,
    category: 'Ta-Form & Past',
    title: '67. Action Just Completed (〜たばかりです)',
    pattern: 'V-た ばかりです',
    explanationEnglish: 'Expresses that an action has just recently been completed.',
    explanationNepali: 'भर्खरै मात्र सम्पन्न भएको कार्य जनाउँछ।',
    examples: [
      { target: 'さっきごはんをたべたばかりです。', reading: 'さっき ごはん を たべた ばかり です。', english: 'I have just eaten food a moment ago.', nepali: 'भर्खरै मात्र खाना खाएको हुँ।' }
    ]
  },
  {
    id: 68,
    category: 'Ta-Form & Past',
    title: '68. Temporal Sequence (〜たあとで)',
    pattern: 'V-た あとで',
    explanationEnglish: 'Expresses "After having done V".',
    explanationNepali: '"V कार्य गरेपछि" भन्ने समयक्रम जनाउँछ।',
    examples: [
      { target: 'しごとがおわったあとで、のみにいきます。', reading: 'しごと が おわった あとで、のみ に いきます。', english: 'After work is finished, I go for a drink.', nepali: 'काम सकिएपछि पिउन जान्छु।' }
    ]
  },

  // ─── 8. ADJECTIVES & MODIFIERS (69-78) ───
  {
    id: 69,
    category: 'Adjectives',
    title: '69. I-Adjective Present Affirmative (〜い)',
    pattern: 'Adj-い です',
    explanationEnglish: 'Adjectives ending in い express qualities directly.',
    explanationNepali: 'い मा अन्त्य हुने विशेषणहरूले प्रत्यक्ष गुण जनाउँछन्।',
    examples: [
      { target: 'このやまはたかいです。', reading: 'この やま は たかい です。', english: 'This mountain is high.', nepali: 'यो पहाड अग्लो छ।' }
    ]
  },
  {
    id: 70,
    category: 'Adjectives',
    title: '70. I-Adjective Present Negative (〜くないです)',
    pattern: 'Drop い + くないです / くありません',
    explanationEnglish: 'Negative form of い-adjectives.',
    explanationNepali: 'い-विशेषणको नकारात्मक रूप (い हटाएर くないです)।',
    examples: [
      { target: 'きょうはさむくないです。', reading: 'きょう は さむくない です。', english: 'Today is not cold.', nepali: 'आज जाडो छैन।' }
    ]
  },
  {
    id: 71,
    category: 'Adjectives',
    title: '71. I-Adjective Past Affirmative (〜かったです)',
    pattern: 'Drop い + かったです',
    explanationEnglish: 'Past tense form of い-adjectives.',
    explanationNepali: 'い-विशेषणको भूतकाल रूप (い हटाएर かったです)।',
    examples: [
      { target: 'きのうはあつかったです。', reading: 'きのう は あつかったです。', english: 'Yesterday was hot.', nepali: 'हिजो गर्मी थियो।' }
    ]
  },
  {
    id: 72,
    category: 'Adjectives',
    title: '72. I-Adjective Past Negative (〜くなかったです)',
    pattern: 'Drop い + くなかったです',
    explanationEnglish: 'Past negative tense form of い-adjectives.',
    explanationNepali: 'い-विशेषणको भूतकाल नकारात्मक रूप।',
    examples: [
      { target: 'テストはむずかしくなかったです。', reading: 'てすと は むずかしくなかった です。', english: 'The test was not difficult.', nepali: 'परीक्षा गाह्रो थिएन।' }
    ]
  },
  {
    id: 73,
    category: 'Adjectives',
    title: '73. Na-Adjective Present Affirmative & Negative',
    pattern: 'Adj-な です / じゃありません',
    explanationEnglish: 'Na-adjectives act like nouns when conjugated with です/じゃありません.',
    explanationNepali: 'な-विशेषणहरू です/じゃありません सँग संज्ञा जस्तै रूपान्तरण हुन्छन्।',
    examples: [
      { target: 'このまちはしずかです。', reading: 'この まち は しずか です。', english: 'This town is quiet.', nepali: 'यो सहर शान्त छ।' }
    ]
  },
  {
    id: 74,
    category: 'Adjectives',
    title: '74. Na-Adjective Past Forms (〜でした / ではありませんでした)',
    pattern: 'Adj-な でした',
    explanationEnglish: 'Past affirmative and negative forms for な-adjectives.',
    explanationNepali: 'な-विशेषणको भूतकाल रूप।',
    examples: [
      { target: 'こうえんはにぎやかでした。', reading: 'こうえん は にぎやか でした。', english: 'The park was lively.', nepali: 'पार्क चहलपहल भएको थियो।' }
    ]
  },
  {
    id: 75,
    category: 'Adjectives',
    title: '75. Modifying Nouns with Adjectives',
    pattern: 'Adj-い + N / Adj-な + N',
    explanationEnglish: 'Keep い for い-adjectives; keep な for な-adjectives when modifying nouns.',
    explanationNepali: 'संज्ञा रूपान्तरण गर्दा い-विशेषणमा い राखिन्छ र な-विशेषणमा な जोडिन्छ।',
    examples: [
      { target: 'おいしいりょうり、きれいないえ', reading: 'おいしい りょうり、きれい な いえ', english: 'Delicious food, beautiful house', nepali: 'मिठो खाना, सुन्दर घर' }
    ]
  },
  {
    id: 76,
    category: 'Adjectives',
    title: '76. Joining Adjectives (〜くて / 〜で)',
    pattern: 'I-adj: Drop い+くて | Na-adj: Adj+で',
    explanationEnglish: 'Connects multiple adjectives together ("cheap and delicious").',
    explanationNepali: 'धेरै विशेषणहरू एकसाथ जोड्न प्रयोग हुन्छ ("सस्तो र मिठो")।',
    examples: [
      { target: 'このみせはやすくておいしいです。', reading: 'この みせ は やすくて おいしい です。', english: 'This shop is cheap and delicious.', nepali: 'यो पसल सस्तो र मिठो छ।' }
    ]
  },
  {
    id: 77,
    category: 'Adjectives',
    title: '77. Becoming State (〜になります)',
    pattern: 'I-adj: く / Na-adj & N: に + なります',
    explanationEnglish: 'Expresses change of state ("becomes hot / becomes quiet").',
    explanationNepali: 'अवस्थामा परिवर्तन आउनु ("गर्मी हुनु / शान्त हुनु")।',
    examples: [
      { target: 'あたたかくなります。', reading: 'あたたかく なります。', english: 'It becomes warm.', nepali: 'मौसम न्यानो हुँदैछ।' }
    ]
  },
  {
    id: 78,
    category: 'Adjectives',
    title: '78. Excessive Degree (〜すぎます)',
    pattern: 'V-stem / Adj-stem + すぎます',
    explanationEnglish: 'Indicates doing something excessively ("too much / too expensive").',
    explanationNepali: 'अत्यधिक मात्रा जनाउँछ ("अति धेरै / साह्रै महँगो")।',
    examples: [
      { target: 'このふくはたかすぎます。', reading: 'この ふく は たかすぎます。', english: 'These clothes are too expensive.', nepali: 'यो लुगा साह्रै महँगो छ।' }
    ]
  },

  // ─── 9. DESIRES & COMPARISON (79-85) ───
  {
    id: 79,
    category: 'Desires & Comparison',
    title: '79. Wanting an Object (〜が欲しいです)',
    pattern: 'N が ほしいです',
    explanationEnglish: 'Expresses desire to possess an object ("I want N").',
    explanationNepali: 'भौतिक वस्तु पाउने इच्छा जनाउँछ ("मलाई N चाहिन्छ")।',
    examples: [
      { target: 'あたらしいくるまがほしいです。', reading: 'あたらしい くるま が ほしい です。', english: 'I want a new car.', nepali: 'मलाई नयाँ गाडी चाहिन्छ।' }
    ]
  },
  {
    id: 80,
    category: 'Desires & Comparison',
    title: '80. Wanting to Do an Action (〜たいです)',
    pattern: 'V-stem たいです',
    explanationEnglish: 'Expresses desire to perform an action ("I want to do V").',
    explanationNepali: 'कुनै काम गर्ने इच्छा जनाउँछ ("गर्न मन छ")।',
    examples: [
      { target: 'にほんへいきたいです。', reading: 'にほん へ いきたい です。', english: 'I want to go to Japan.', nepali: 'म जापान जान चाहन्छु।' }
    ]
  },
  {
    id: 81,
    category: 'Desires & Comparison',
    title: '81. Likes & Dislikes (〜が好きです / 嫌いです)',
    pattern: 'N が すきです / きらいです',
    explanationEnglish: 'Expresses personal preferences.',
    explanationNepali: 'व्यक्तिगत मनपर्ने/मन नपर्ने रुचि जनाउँछ।',
    examples: [
      { target: 'わたしはさかながすきです。', reading: 'わたし は さかな が すき です。', english: 'I like fish.', nepali: 'मलाई माछा मनपर्छ।' }
    ]
  },
  {
    id: 82,
    category: 'Desires & Comparison',
    title: '82. Ability & Skill (〜が得意です / 苦手です)',
    pattern: 'N / V-こと が じょうずです / へたです',
    explanationEnglish: 'Describes proficiency at a skill or subject.',
    explanationNepali: 'कुनै काम वा विषयमा दक्षता वा नसिपालु हुनु।',
    examples: [
      { target: 'りょうりをするのがじょうずです。', reading: 'りょうり を する の が じょうず です。', english: 'Good at cooking.', nepali: 'खाना पकाउन सिपालु छ।' }
    ]
  },
  {
    id: 83,
    category: 'Desires & Comparison',
    title: '83. Comparison Between Two Items (X は Y より〜です)',
    pattern: 'N1 は N2 より Adj です',
    explanationEnglish: 'Compares two items ("N1 is more Adj than N2").',
    explanationNepali: 'दुई वस्तुहरूको तुलना गर्छ ("N1 भन्दा N2...")।',
    examples: [
      { target: 'しんかんせんはバスよりはやいです。', reading: 'しんかんせん は ばす より はやい です。', english: 'Bullet train is faster than bus.', nepali: 'बुलेट ट्रेन बसभन्दा छिटो हुन्छ।' }
    ]
  },
  {
    id: 84,
    category: 'Desires & Comparison',
    title: '84. Asking Choice Comparison (X と Y と どちらが〜ですか)',
    pattern: 'N1 と N2 と どちらが Adj ですか',
    explanationEnglish: 'Asks which of two options is more Adj.',
    explanationNepali: 'दुई विकल्पहरूमध्ये कुन बढी हो भनी सोध्छ।',
    examples: [
      { target: 'りんごとみかんとどちらがすきですか。', reading: 'りんご と みかん と どちら が すき です か。', english: 'Which do you like better, apples or oranges?', nepali: 'स्याउ र सुन्तलामध्ये कुन बढी मनपर्छ?' }
    ]
  },
  {
    id: 85,
    category: 'Desires & Comparison',
    title: '85. Superlative Degree (〜の中で一番)',
    pattern: 'Category のなかで N が いちばん Adj です',
    explanationEnglish: 'Expresses the most superlative item in a category.',
    explanationNepali: 'कुनै समूहमा सबैभन्दा उत्कृष्ट वा बढी वस्तु जनाउँछ।',
    examples: [
      { target: 'いちねんのなかでなつがいちばんすきです。', reading: 'いちねん の なかで なつ が いちばん すき です。', english: 'I like summer best out of the whole year.', nepali: 'वर्षभरिमा मलाई गर्मी मौसम सबैभन्दा मनपर्छ।' }
    ]
  },

  // ─── 10. EXISTENCE & COUNTERS (86-92) ───
  {
    id: 86,
    category: 'Existence & Counters',
    title: '86. Inanimate Existence (〜があります)',
    pattern: 'Place に N(inanimate) が あります',
    explanationEnglish: 'Expresses location of non-living things or objects.',
    explanationNepali: 'निर्जीव वस्तुहरूको स्थान वा अस्तित्व जनाउँछ ("छ/छन्")।',
    examples: [
      { target: 'つくえのうえにほんがあります。', reading: 'つくえ の うえ に ほん が あります。', english: 'There is a book on the desk.', nepali: 'टेबलमा किताब छ।' }
    ]
  },
  {
    id: 87,
    category: 'Existence & Counters',
    title: '87. Animate Existence (〜にいます)',
    pattern: 'Place に N(living) が います',
    explanationEnglish: 'Expresses location of living things (people, animals).',
    explanationNepali: 'सजीव प्राणीहरूको (मानिस, जनावर) स्थान वा अस्तित्व जनाउँछ।',
    examples: [
      { target: 'へやにねこがいます。', reading: 'へや に ねこ が います。', english: 'There is a cat in the room.', nepali: 'कोठामा बिरालो छ।' }
    ]
  },
  {
    id: 88,
    category: 'Existence & Counters',
    title: '88. Positional Nouns (上 / 下 / 前 / 後ろ / 中 / 隣)',
    pattern: 'N1 の [Position] に',
    explanationEnglish: 'Spatial positions: うえ (on/above), した (under), まえ (front), うしろ (behind), なか (inside), となり (next to).',
    explanationNepali: 'स्थानिय स्थिति: माथि, मुनि, अगाडि, पछाडि, भित्र, छेउमा।',
    examples: [
      { target: 'がっこうのとなりにぎんこうがあります。', reading: 'がっこう の となり に ぎんこう が あります。', english: 'There is a bank next to the school.', nepali: 'विद्यालयको छेउमा बैंक छ।' }
    ]
  },
  {
    id: 89,
    category: 'Existence & Counters',
    title: '89. People Counter (〜人 / にん / ふたり / ひとり)',
    pattern: 'ひとり (1), ふたり (2), さんにん (3), よんにん (4)...',
    explanationEnglish: 'Counting people: 1 (ひとり), 2 (ふたり), 3+ ([num]+にん).',
    explanationNepali: 'मानिस गन्ती गर्ने: १ जना (ひとり), २ जना (ふたり), ३+ जना (にん)।',
    examples: [
      { target: 'かぞくはよんにんです。', reading: 'かぞく は よんにん です。', english: 'There are 4 people in my family.', nepali: 'मेरो परिवारमा ४ जना हुनुहुन्छ।' }
    ]
  },
  {
    id: 90,
    category: 'Existence & Counters',
    title: '90. Thin/Flat Objects Counter (〜枚 / まい)',
    pattern: 'Number + まい',
    explanationEnglish: 'Counter for flat items like paper, shirts, tickets, plates.',
    explanationNepali: 'कागज, लुगा, टिकट, थाली जस्ता पात्ला वस्तु गन्ने एकाइ।',
    examples: [
      { target: 'きっぷをにまいかいました。', reading: 'きっぷ を にまい かいました。', english: 'I bought 2 tickets.', nepali: 'मैले २ वटा टिकट किनेँ।' }
    ]
  },
  {
    id: 91,
    category: 'Existence & Counters',
    title: '91. Long Cylindrical Counter (〜本 / ほん)',
    pattern: 'いっぽん(1), にほん(2), さんぼん(3)...',
    explanationEnglish: 'Counter for bottles, pens, trees, umbrellas.',
    explanationNepali: 'बोतल, कलम, रूख, छाता जस्ता लामो गोलो वस्तु गन्ने एकाइ।',
    examples: [
      { target: 'ペンをさんぼんください。', reading: 'ぺん を さんぼん ください。', english: 'Please give me 3 pens.', nepali: 'कृपया मलाई ३ वटा कलम दिनुहोस्।' }
    ]
  },
  {
    id: 92,
    category: 'Existence & Counters',
    title: '92. General Native Counter (ひとつ、ふたつ、みっつ...)',
    pattern: 'ひとつ(1), ふたつ(2), みっつ(3), よっつ(4), いつつ(5)...',
    explanationEnglish: 'Japanese native general object counter from 1 to 10.',
    explanationNepali: '१ देखि १० सम्मका वस्तुहरू गन्ने जापानी मौलिक एकाइ।',
    examples: [
      { target: 'りんごをひとつください。', reading: 'りんご を ひとつ ください。', english: 'Please give me one apple.', nepali: 'कृपया मलाई एउटा स्याउ दिनुहोस्।' }
    ]
  },

  // ─── 11. GIVING & RECEIVING (93-97) ───
  {
    id: 93,
    category: 'Giving & Receiving',
    title: '93. Giving to Others (〜あげます)',
    pattern: 'Giver は Receiver に Object を あげます',
    explanationEnglish: 'Used when speaker or someone gives an item to another person.',
    explanationNepali: 'वक्ता वा कसैले अरूलाई कुनै वस्तु दिँदा प्रयोग हुन्छ।',
    examples: [
      { target: 'わたしはともだちにほんをあげました。', reading: 'わたし は ともだち に ほん を あげました。', english: 'I gave a book to my friend.', nepali: 'मैले साथीलाई किताब दिएँ।' }
    ]
  },
  {
    id: 94,
    category: 'Giving & Receiving',
    title: '94. Receiving from Someone (〜もらいます)',
    pattern: 'Receiver は Giver に/から Object を もらいます',
    explanationEnglish: 'Used when receiving an item from someone.',
    explanationNepali: 'कसैबाट वस्तु प्राप्त गर्दा प्रयोग गरिन्छ।',
    examples: [
      { target: 'わたしはせんせいからほんをもらいました。', reading: 'わたし は せんせい から ほん を もらいました。', english: 'I received a book from teacher.', nepali: 'मैले शिक्षकबाट किताब पाएँ।' }
    ]
  },
  {
    id: 95,
    category: 'Giving & Receiving',
    title: '95. Giving to Speaker (〜くれます)',
    pattern: 'Giver は わたしに Object を くれます',
    explanationEnglish: 'Used when someone gives something to the speaker or speaker\'s family.',
    explanationNepali: 'कसैले वक्ता वा वक्ताको परिवारलाई केही दिँदा प्रयोग हुन्छ।',
    examples: [
      { target: 'たなかさんはわたしにプレゼンとをくれました。', reading: 'たなかさん は わたし に ぷれぜんと を くれました。', english: 'Mr. Tanaka gave me a gift.', nepali: 'तानाका जीले मलाई उपहार दिनुभयो।' }
    ]
  },
  {
    id: 96,
    category: 'Giving & Receiving',
    title: '96. Doing Favors for Others (〜てあげます)',
    pattern: 'V-て あげます',
    explanationEnglish: 'Doing an action as a favor for someone.',
    explanationNepali: 'अरूको हित वा सहयोगको लागि काम गरिदिनु।',
    examples: [
      { target: 'わたしはともだちににほんごをおしえてあげました。', reading: 'わたし は ともだち に にほんご を おしえて あげました。', english: 'I taught Japanese to my friend as a favor.', nepali: 'मैले साथीलाई जापानी सिकाई दिएँ।' }
    ]
  },
  {
    id: 97,
    category: 'Giving & Receiving',
    title: '97. Polite Request for Favor (〜てくださいませんか)',
    pattern: 'V-て くださいませんか / くれませんか',
    explanationEnglish: 'Polite way to ask someone to do a favor for you.',
    explanationNepali: 'आफ्नो लागि काम गरिदिन नम्र अनुरोध गर्नु।',
    examples: [
      { target: 'もういちどいってくださいませんか。', reading: 'もう いちど いって くださいませんか。', english: 'Could you please say it once more?', nepali: 'कृपया एक पटक फेरि भनिदिनुहुन्छ कि?' }
    ]
  },

  // ─── 12. REASONS, CONDITIONS & CONJUNCTIONS (98-100) ───
  {
    id: 98,
    category: 'Reasons & Conditions',
    title: '98. Reason Particle (〜から)',
    pattern: 'Reason から、[Result]',
    explanationEnglish: 'States a subjective reason or cause ("Because S1, S2").',
    explanationNepali: 'व्यक्तिगत कारण जनाउँछ ("कारणले गर्दा / त्यसैले")।',
    examples: [
      { target: 'あついですから、エアコンをつけます。', reading: 'あつい です から、えあこん を つけます。', english: 'Because it is hot, I will turn on AC.', nepali: 'गर्मी भएकोले एसी चलाउँछु।' }
    ]
  },
  {
    id: 99,
    category: 'Reasons & Conditions',
    title: '99. Conditional "If / When" (〜たら)',
    pattern: 'V-た ら / Adj-たら',
    explanationEnglish: 'Expresses conditional outcome ("If/When X happens, then Y").',
    explanationNepali: 'शर्त वा समयक्रम जनाउँछ ("यदि/जब... भयो भने")।',
    examples: [
      { target: 'じかんがあったら、あそびにいきましょう。', reading: 'じかん が あったら、あそび に いきましょう。', english: 'If there is time, let\'s go play.', nepali: 'समय भयो भने घुम्न जाऔं।' }
    ]
  },
  {
    id: 100,
    category: 'Reasons & Conditions',
    title: '100. Temporal "When" Clause (〜とき)',
    pattern: 'V-plain / Adj / Nの とき',
    explanationEnglish: 'Indicates the time or occasion when an event occurs.',
    explanationNepali: 'कुनै घटना घट्ने समय वा अवसर जनाउँछ ("हुँदा / गर्दा")।',
    examples: [
      { target: 'ひまなとき、ほんをよみます。', reading: 'ひま な とき、ほん を よみます。', english: 'When I have free time, I read books.', nepali: 'फुर्सद हुँदा म किताब पढ्छु।' }
    ]
  }
];
