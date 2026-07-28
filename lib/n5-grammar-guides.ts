// ============================================================
// MINNA NO NIHONGO JLPT N5 — Complete Grammar Guides (Lessons 1–25)
// Full explanations in English & Nepali with pattern rules and examples
// ============================================================

import type { LessonGrammarGuide } from './grammar-guide';

export const N5_GRAMMAR_GUIDES: LessonGrammarGuide[] = [
  // ────────────────────────────────────────────────────────────
  // LESSON 1
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 1,
    lessonTitle: 'Introductions & Identity (自己紹介と身分)',
    grammarPoints: [
      {
        title: '1. Topic Marker は & Identity です',
        pattern: '[N1] は [N2] です',
        explanationEnglish: 'The particle は (pronounced wa) marks N1 as the sentence topic. です (desu) means "is/am/are" and makes the sentence polite.',
        explanationNepali: 'は (वा) निपातले वाक्यको मुख्य विषय जनाउँछ। です (देसु) ले "हो/हुँ/हुनुहुन्छ" भन्ने नम्र अर्थ दिन्छ।',
        examples: [
          { target: '私は学生です。', reading: 'わたしはがくせいです。', english: 'I am a student.', nepali: 'म विद्यार्थी हुँ।' },
          { target: 'サントスさんは先生です。', reading: 'サントスさんはせんせいです。', english: 'Mr. Santos is a teacher.', nepali: 'सान्तोस-जी शिक्षक हुनुहुन्छ।' }
        ]
      },
      {
        title: '2. Negative Form じゃありません / ではありません',
        pattern: '[N1] は [N2] じゃありません',
        explanationEnglish: 'じゃありません (ja arimasen) is the polite negative form of です. In formal writing, ではありません (dewa arimasen) is used.',
        explanationNepali: 'じゃありません ले です को नकारात्मक (होइन) रूप जनाउँछ। औपचारिक लेखनमा ではありません प्रयोग गरिन्छ।',
        examples: [
          { target: '私は医者じゃありません。', reading: 'わたしはいしゃじゃありません。', english: 'I am not a doctor.', nepali: 'म डाक्टर होइन।' },
          { target: 'サントスさんは学生じゃありません。', reading: 'サントスさんはがくせいじゃありません。', english: 'Mr. Santos is not a student.', nepali: 'सान्तोस-जी विद्यार्थी हुनुहुन्न।' }
        ]
      },
      {
        title: '3. Question Particle か',
        pattern: '[Sentence] か',
        explanationEnglish: 'The particle か (ka) turns any sentence into a polite question without altering word order.',
        explanationNepali: 'वाक्यको अन्त्यमा か (का) थपेर प्रश्न बनाइन्छ।',
        examples: [
          { target: 'ミラーさんは会社員ですか。', reading: 'ミラーさんはかいしゃいんですか。', english: 'Is Mr. Miller a company employee?', nepali: 'के मिलर-जी कम्पनी कर्मचारी हुनुहुन्छ?' }
        ]
      },
      {
        title: '4. Also Particle も & Possessive の',
        pattern: '[N1] も / [N1] の [N2]',
        explanationEnglish: 'も (mo) means "also/too". の (no) connects two nouns, showing possession or category (N1\'s N2).',
        explanationNepali: 'も ले "पनि" र の ले "को" (स्वामित्व वा सम्बन्ध) जनाउँछ।',
        examples: [
          { target: '私も学生です。', reading: 'わたしもがくせいです。', english: 'I am also a student.', nepali: 'म पनि विद्यार्थी हुँ।' },
          { target: 'これは私の本です。', reading: 'これはわたしのほんです。', english: 'This is my book.', nepali: 'यो मेरो किताब हो।' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 2
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 2,
    lessonTitle: 'Demonstratives & Objects (これ・それ・あれ)',
    grammarPoints: [
      {
        title: '1. Demonstratives これ, それ, あれ',
        pattern: 'これ / それ / あれ は [N] です',
        explanationEnglish: 'これ (this, near speaker), それ (that, near listener), あれ (that over there, far from both).',
        explanationNepali: 'これ (यो - वक्ता नजिक), それ (त्यो - श्रोता नजिक), あれ (त्यो - दुवैबाट टाढा)।',
        examples: [
          { target: 'これは本です。', reading: 'これはほんです。', english: 'This is a book.', nepali: 'यो किताब हो।' },
          { target: 'それは私のかばんです。', reading: 'それはわたしのかばんです。', english: 'That is my bag.', nepali: 'त्यो मेरो झोला हो।' }
        ]
      },
      {
        title: '2. Noun Modifiers この, その, あの',
        pattern: 'この / その / あの [N] は [Predicate]',
        explanationEnglish: 'この (this N), その (that N), あの (that N over there) directly modify a following noun.',
        explanationNepali: 'この (यो + नाम), その (त्यो + नाम), あの (त्यो + नाम) नामको अगाडि आउँछन्।',
        examples: [
          { target: 'この本は面白いです。', reading: 'このほんはおもしろいです。', english: 'This book is interesting.', nepali: 'यो किताब रोचक छ।' }
        ]
      },
      {
        title: '3. Affirmation そうです & Negation ちがいます',
        pattern: 'はい、そうです / いいえ、ちがいます',
        explanationEnglish: 'そう (so) means "so/right". Use 「はい、そうです」 (Yes, that\'s right) or 「いいえ、ちがいます」 (No, it is wrong).',
        explanationNepali: '「はい、そうです」(हो, सही हो) र 「いいえ、ちがいます」(होइन, गलत हो)।',
        examples: [
          { target: 'それは辞書ですか。－はい、そうです。', reading: 'それはじしょですか。－はい、そうです。', english: 'Is that a dictionary? - Yes, it is.', nepali: 'के त्यो शब्दकोश हो? - हजुर, हो।' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 3
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 3,
    lessonTitle: 'Location Demonstratives & Places (ここ・そこ・あそこ)',
    grammarPoints: [
      {
        title: '1. Place Demonstratives ここ, そこ, あそこ, どこ',
        pattern: 'ここ / そこ / あそこ / どこ',
        explanationEnglish: 'ここ (here), そこ (there), あそこ (over there), どこ (where). Polite direction forms: こちら, そちら, あちら, どちら.',
        explanationNepali: 'ここ (यहाँ), そこ (त्यहाँ), あそこ (त्यहाँ टाढा), どこ (कहाँ)। नम्र रूप: こちら, そちら, あちら, どちら।',
        examples: [
          { target: 'お手洗いはどこですか。', reading: 'おてあらいはどこですか。', english: 'Where is the restroom?', nepali: 'शौचालय कहाँ छ?' },
          { target: '事務所にあちらです。', reading: 'じむしょはあちらです。', english: 'The office is that way (polite).', nepali: 'कार्यालय त्यता हो।' }
        ]
      },
      {
        title: '2. Location Pattern N1 は N2 (Place) です',
        pattern: '[N1] は [Place] です',
        explanationEnglish: 'Expresses where a person, place, or item is located.',
        explanationNepali: 'व्यक्ति वा वस्तु कुन ठाउँमा छ भनी जनाउँछ।',
        examples: [
          { target: '教室は2階です。', reading: 'きょうしつはにかいです。', english: 'The classroom is on the 2nd floor.', nepali: 'कक्षाकोठा दोस्रो तलामा छ।' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 4
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 4,
    lessonTitle: 'Time, Days & Verb Conjugation (時間と動詞)',
    grammarPoints: [
      {
        title: '1. Telling Time 〜時 〜分',
        pattern: '今 [Hour]時 [Minute]分 です',
        explanationEnglish: '〜時 (ji) = o\'clock, 〜分 (fun/pun) = minute(s). 今何時ですか (Iman nanjidesu ka = What time is it now?).',
        explanationNepali: '〜時 (जी = बजे), 〜分 (फुन/पुल = मिनेट)। 今何時ですか (अहिले कति बज्यो?)।',
        examples: [
          { target: '今9時30分(半)です。', reading: 'いまくじさんじゅっぷん(はん)です。', english: 'It is 9:30 now.', nepali: 'अहिले साढे ९ बजेको छ।' }
        ]
      },
      {
        title: '2. Polite Verb Tenses (〜ます / 〜ません / 〜ました / 〜ませんでした)',
        pattern: 'Present: 〜ます / 〜ません | Past: 〜ました / 〜ませんでした',
        explanationEnglish: 'Non-past positive: 〜ます (masu), Non-past negative: 〜ません (masen). Past positive: 〜ました (mashita), Past negative: 〜ませんでした (masen deshita).',
        explanationNepali: 'वर्तमान/भविष्य: 〜ます / 〜ません। भूतकाल: 〜ました / 〜ませんでした।',
        examples: [
          { target: '毎朝7時におきます。', reading: 'まいあさしちじにおきます。', english: 'I wake up at 7 every morning.', nepali: 'म हरेक बिहान ७ बजे उठ्छु।' },
          { target: '昨日勉強しました。', reading: 'きのうべんきょうしました。', english: 'I studied yesterday.', nepali: 'मैले हिजो अध्ययन गरें।' }
        ]
      },
      {
        title: '3. Specific Time Marker に & Range から 〜 まで',
        pattern: '[Time] に V / [Start] から [End] まで',
        explanationEnglish: 'Particle に (ni) marks a specific numerical time. から (kara = from) and まで (made = until) mark time/place boundaries.',
        explanationNepali: 'निपात に ले निश्चित समय जनाउँछ। から (देखि) र まで (सम्म) ले समय वा स्थानको सीमा जनाउँछ।',
        examples: [
          { target: '9時から5時まで働きます。', reading: 'くじからごじまではたらきます。', english: 'I work from 9 to 5.', nepali: 'म ९ बजेदेखि ५ बजेसम्म काम गर्छु।' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 5
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 5,
    lessonTitle: 'Movement Verbs & Means of Transport (移動と交通手段)',
    grammarPoints: [
      {
        title: '1. Direction Marker へ with 行きます / 来ます / 帰ります',
        pattern: '[Place] へ 行きます / 来ます / 帰ります',
        explanationEnglish: 'The particle へ (pronounced e) indicates direction toward a destination.',
        explanationNepali: 'निपात へ (ए) ले गन्तव्य दिशा जनाउँछ। 行きます (जानु), 来ます (आउनु), 帰ります (फर्कनु)।',
        examples: [
          { target: '東京へ行きます。', reading: 'とうきょうへいきます。', english: 'I am going to Tokyo.', nepali: 'म टोक्यो जाँदैछु।' }
        ]
      },
      {
        title: '2. Total Negation どこ[へ]も 行きません',
        pattern: 'どこ[へ]も + Negative Verb',
        explanationEnglish: 'Question word + も + negative verb means "nowhere / nothing / nobody".',
        explanationNepali: 'प्रश्नवाचक शब्द + も + नकारात्मक क्रिया = "कतै पनि जाँदिन/केही पनि गर्दिन"।',
        examples: [
          { target: '日曜日はどこへも行きませんでした。', reading: 'にちようびはどこへもいきませんでした。', english: 'I didn\'t go anywhere on Sunday.', nepali: 'म आइतबार कतै पनि गइनँ।' }
        ]
      },
      {
        title: '3. Means Marker で (Transportation)',
        pattern: '[Vehicle/Means] で 行きます',
        explanationEnglish: 'Particle で (de) indicates the means of transportation. Exception: 歩いて (aruite = on foot, no で).',
        explanationNepali: 'निपात で ले सवारी साधन जनाउँछ। अपवाद: 歩いて (हिँडेर)।',
        examples: [
          { target: '電車で会社へ行きます。', reading: 'でんしゃでかいしゃへいきます。', english: 'I go to work by train.', nepali: 'म ट्रेनले काममा जान्छु।' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 6
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 6,
    lessonTitle: 'Direct Objects, Action Places & Invitations (目的語と勧誘)',
    grammarPoints: [
      {
        title: '1. Direct Object Marker を',
        pattern: '[N] を [Transitive Verb]',
        explanationEnglish: 'The particle を (pronounced o) marks the direct object of an action.',
        explanationNepali: 'निपात を ले क्रियाको प्रत्यक्ष कर्म जनाउँछ।',
        examples: [
          { target: 'ジュースを飲みます。', reading: 'ジュースをのみます。', english: 'I drink juice.', nepali: 'म जुस पिउँछु।' }
        ]
      },
      {
        title: '2. Action Location Marker で',
        pattern: '[Place] で [Action Verb]',
        explanationEnglish: 'Particle で (de) indicates the location where an action takes place.',
        explanationNepali: 'निपात で ले काम हुने स्थान जनाउँछ।',
        examples: [
          { target: 'レストランで晩ごはんを食べます。', reading: 'レストランでばんごはんをたべます。', english: 'I eat dinner at a restaurant.', nepali: 'म रेस्टुरेन्टमा रातिको खाना खान्छु।' }
        ]
      },
      {
        title: '3. Invitations 〜ませんか & Suggestions 〜ましょう',
        pattern: 'V[masu-stem] ませんか / V[masu-stem] ましょう',
        explanationEnglish: '〜ませんか (masen ka) politely invites someone ("won\'t you...?"). 〜ましょう (mashou) suggests doing something together ("let\'s...").',
        explanationNepali: '〜ませんか (निमन्त्रणा - के गर्ने हो?) / 〜ましょう (सुझाव - गरौँ)।',
        examples: [
          { target: '一緒に買い物をしませんか。', reading: 'いっしょにかいものをしませんか。', english: 'Won\'t you go shopping together with me?', nepali: 'सँगै किनमेल गर्ने हो?' },
          { target: 'ちょっと休みましょう。', reading: 'ちょっとやすみましょう。', english: 'Let\'s take a short break.', nepali: 'एकछिन आराम गरौँ।' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 7
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 7,
    lessonTitle: 'Tools, Giving & Receiving (道具と授受)',
    grammarPoints: [
      {
        title: '1. Instrument/Means Marker で',
        pattern: '[Tool/Language] で V',
        explanationEnglish: 'Particle で marks tools, instruments, or languages used to complete an action.',
        explanationNepali: 'निपात で ले प्रयोग गरिने औजार, साधन वा भाषा जनाउँछ।',
        examples: [
          { target: 'スプーンでカレーを食べます。', reading: 'スプーンでカレーをたべます。', english: 'I eat curry with a spoon.', nepali: 'म चम्चाले करी खान्छु।' },
          { target: '日本語でレポートを書きます。', reading: 'にほんごでレポートをかきます。', english: 'I write the report in Japanese.', nepali: 'म जापानी भाषामा रिपोर्ट लेख्छु।' }
        ]
      },
      {
        title: '2. Giving あげます & Receiving もらいます',
        pattern: 'Giver は Receiver に N を あげます / Receiver は Giver に N を もらいます',
        explanationEnglish: 'あげます (agemasu = give to someone), もらいます (moraimasu = receive from someone). The target person takes に.',
        explanationNepali: 'あげます (दिनु) / もらいます (पाउनु)। सम्बन्धित व्यक्तिसँग に लाग्छ।',
        examples: [
          { target: '山田さんは母に花をあげました。', reading: 'やまださんははなにはなをあげました。', english: 'Mr. Yamada gave flowers to my mother.', nepali: 'यामाडा-जीले आमालाई फूल दिनुभयो।' },
          { target: '先生に本をもらいました。', reading: 'せんせいにほんをもらいました。', english: 'I received a book from the teacher.', nepali: 'मैले गुरुबाट किताब पाएँ।' }
        ]
      },
      {
        title: '3. Already 〜もう Vました',
        pattern: 'もう Vました',
        explanationEnglish: 'もう (mou) means "already". Answer positive with 「はい、もう Vました」, negative with 「いいえ、まだです」 (not yet).',
        explanationNepali: 'もう (भइसक्यो)। सकारात्मक: はい、もう Vました (हो, भइसक्यो), नकारात्मक: いいえ、まだです (अझै छैन)।',
        examples: [
          { target: 'もう昼ごはんを食べましたか。－いいえ、まだです。', reading: 'もうひるごはんをたべましたか。－いいえ、まだです。', english: 'Have you eaten lunch already? - No, not yet.', nepali: 'के तपाईंले दिउँसोको खाना खाइसक्नुभयो? - होइन, अझै छैन।' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 8
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 8,
    lessonTitle: 'Adjectives: i-Adjectives & na-Adjectives (形容詞)',
    grammarPoints: [
      {
        title: '1. Adjective Types & Present Conjugations',
        pattern: 'い-adj: 〜いです / 〜くないです | な-adj: 〜です / 〜じゃありません',
        explanationEnglish: 'i-adjectives end in い (e.g. 高い -> 高くないです). na-adjectives use じゃありません in negative (e.g. 親切 -> 親切じゃありません).',
        explanationNepali: 'i-विशेषण (उच्च: 高い -> 高くないです)। na-विशेषण (親切 -> 親切じゃありません)।',
        examples: [
          { target: 'この本は高いです。高くなのいです。', reading: 'このほんはたかいです。たかくないです。', english: 'This book is expensive. It is not expensive.', nepali: 'यो किताब महँगो छ। महँगो छैन।' },
          { target: '富士山は有名です。', reading: 'ふじさんはゆうめいです。', english: 'Mt. Fuji is famous.', nepali: 'फूजी पर्वत प्रख्यात छ।' }
        ]
      },
      {
        title: '2. Modifying Nouns with Adjectives',
        pattern: 'い-adj + N / な-adj な + N',
        explanationEnglish: 'i-adjectives connect directly to nouns. na-adjectives append な before nouns.',
        explanationNepali: 'i-विशेषण सिधै नामसँग जोडिन्छ। na-विशेषण पछि な थपेर नामसँग जोडिन्छ।',
        examples: [
          { target: '高い車を買いました。', reading: 'たかいくるまをかいました。', english: 'I bought an expensive car.', nepali: 'मैले महँगो कार किनें।' },
          { target: '親切な人にあいました。', reading: 'しんせつな人にあいました。', english: 'I met a kind person.', nepali: 'मैले दयालु मान्छेलाई भेटें।' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 9
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 9,
    lessonTitle: 'Preferences, Skills & Reasons (好き・上手・から)',
    grammarPoints: [
      {
        title: '1. Object Marker が for Likes, Dislikes & Abilities',
        pattern: 'N が 好きです / 嫌いです / 上手です / 下手です / わかります / あります',
        explanationEnglish: 'Feelings, skills, and possession/understanding take particle が (ga) instead of を.',
        explanationNepali: 'मनपर्ने, नपर्ने, सीप र क्षमता जनाउँदा を को ठाउँमा が निपात आउँछ।',
        examples: [
          { target: '私はスポーツが好きです。', reading: 'わたしはスポーツがすきです。', english: 'I like sports.', nepali: 'मलाई खेलकुद मनपर्छ।' },
          { target: '日本語が分かります。', reading: 'にほんごがわかります。', english: 'I understand Japanese.', nepali: 'म जापानी भाषा बुझ्छु।' }
        ]
      },
      {
        title: '2. Reason Marker から',
        pattern: '[Reason sentence] から、[Result sentence]',
        explanationEnglish: 'から (kara) means "because / so" and placed at the end of the cause clause.',
        explanationNepali: 'から (कारणले/भएकाले) ले कारण र परिणाम जोड्छ।',
        examples: [
          { target: '時間がないから、タクシーで行きます。', reading: 'じかんがないから、タクシーでいきます。', english: 'Because I don\'t have time, I will go by taxi.', nepali: 'समय नभएकाले म ट्याक्सीमा जान्छु।' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 10
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 10,
    lessonTitle: 'Existence & Position Expressions (存在と位置表現)',
    grammarPoints: [
      {
        title: '1. Existence Verbs あります & います',
        pattern: 'Inanimate: N が あります | Animate (person/animal): N が います',
        explanationEnglish: 'あります (arimasu) is for non-living objects/plants. います (imasu) is for living people and animals.',
        explanationNepali: 'あります (निर्जीव वस्तुको लागि छ)। います (मान्छे र जनावरको लागि छ)।',
        examples: [
          { target: '机の上に本があります。', reading: 'つくえのうえにほんがあります。', english: 'There is a book on the desk.', nepali: 'डेस्कमाथि किताब छ।' },
          { target: '公園に子供がいます。', reading: 'こうえんにこどもがいます。', english: 'There are children in the park.', nepali: 'पार्कमा बच्चाहरू छन्।' }
        ]
      },
      {
        title: '2. Positional Nouns (上, 下, 前, 後ろ, 中, 隣, あいだ)',
        pattern: 'N1 の [Position] に N2 が あります/います',
        explanationEnglish: 'Use N1 の 上(ue = top), 下(shita = under), 前(mae = front), 後ろ(ushiro = back), 中(naka = inside), 隣(tonari = next to), あいだ(aida = between).',
        explanationNepali: 'N1 को स्थान: 上 (माथि), 下 (मुनि), 前 (अगाडि), 後ろ (पछाडि), 中 (भित्र), 隣 (छेउमा)।',
        examples: [
          { target: '銀行は郵便局の隣にあります。', reading: 'ぎんこうはゆうびんきょくのとなりになります。', english: 'The bank is next to the post office.', nepali: 'बैंक हुलाक घरको छेउमा छ।' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 11
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 11,
    lessonTitle: 'Quantifiers, Counters & Frequency (助数詞と頻度)',
    grammarPoints: [
      {
        title: '1. Counter Word Position',
        pattern: '[N を] [Quantity Counter] V',
        explanationEnglish: 'Counters (一つ, 二つ, 3人, 2枚, 1台) usually go directly after the object particle を or subject particle が.',
        explanationNepali: 'गन्ती शब्दहरू (一つ, 二つ, 3人 आदि) निपात を वा が को पछाडि आउँछन्।',
        examples: [
          { target: 'りんごを3つ買いました。', reading: 'りんごをみっつかいました。', english: 'I bought 3 apples.', nepali: 'मैले ३ वटा स्याउ किनें।' },
          { target: '外国人の先生が2人います。', reading: 'がいこくじんのせんせいがふたりいます。', english: 'There are two foreign teachers.', nepali: 'दुईजना विदेशी शिक्षकहरू हुनुहुन्छ।' }
        ]
      },
      {
        title: '2. Frequency Pattern 〜に〜回',
        pattern: '[Time Period] に [Times]回 V',
        explanationEnglish: 'Expresses frequency: e.g. 1か月に2回 (twice a month).',
        explanationNepali: 'आवृति जनाउँछ: जस्तै 1か月に2回 (महिनामा दुई पटक)।',
        examples: [
          { target: '1週間に2回スポーツをします。', reading: 'いっしゅうかんににかいスポーツをします。', english: 'I play sports twice a week.', nepali: 'म हप्तामा दुई पटक खेलकुद गर्छु।' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 12
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 12,
    lessonTitle: 'Past Adjectives & Comparisons (過去形と比較)',
    grammarPoints: [
      {
        title: '1. Past Adjectives Conjugations',
        pattern: 'い-adj: 〜かったです / 〜くなかったです | な-adj/N: 〜でした / 〜じゃありませんでした',
        explanationEnglish: 'i-adj past drops い and adds かったです. na-adj & Nouns take でした (dewa/ja arimasen deshita).',
        explanationNepali: 'i-विशेषण भूतकाल: 〜かったです। na-विशेषण र नाम: 〜でした।',
        examples: [
          { target: '昨日は寒かったです。', reading: 'きのうはさむかったです。', english: 'Yesterday was cold.', nepali: 'हिजो जाडो थियो।' },
          { target: '旅行は大変でした。', reading: 'りょこうはたいへんでした。', english: 'The trip was tough.', nepali: 'भ्रमण गाह्रो थियो।' }
        ]
      },
      {
        title: '2. Comparative N1 は N2 より Adj です',
        pattern: '[N1] は [N2] より [Adj] です',
        explanationEnglish: 'Means "N1 is more Adj than N2". より (yori) means "than".',
        explanationNepali: '"N1 भन्दा N2 बढी विशेषण हो"। より ले "भन्दा" अर्थ दिन्छ।',
        examples: [
          { target: '新幹線は飛行機より安いです。', reading: 'しんかんせんはひこうきよりやすいです。', english: 'The bullet train is cheaper than the airplane.', nepali: 'बुलेट ट्रेन हवाइजहाज भन्दा सस्तो छ।' }
        ]
      },
      {
        title: '3. Superlative N1 の中で N2 が 一番 Adj です',
        pattern: '[Group/Range] の中で [N] が 一番 [Adj] です',
        explanationEnglish: 'Means "Among N1, N2 is the most Adj". 一番 (ichiban) means "most/number one".',
        explanationNepali: '"N1 मध्ये N2 सबैभन्दा बढी विशेषण हो"। 一番 (सबैभन्दा बढी)।',
        examples: [
          { target: '1年の中で夏がいちばん好きです。', reading: 'いちねんのなかでなつがいちばんすきです。', english: 'I like summer best of all the year.', nepali: 'मलाई वर्षभरिमा गर्मी ऋतु सबैभन्दा मनपर्छ।' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────
  // LESSON 13
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 13,
    lessonTitle: 'Desires & Purpose of Movement (欲しい・〜たい・目的)',
    grammarPoints: [
      {
        title: '1. Nが ほしいです',
        pattern: '1. Nが ほしいです',
        explanationEnglish: 'Expresses the speaker\'s desire to possess/have an object; also used to ask what the listener wants. The object is marked by が. ほしい is an い-adjective.',
        explanationNepali: 'N が ほしいです ले कुनै भौतिक वस्तुको चाहना (\'मलाई... चाहिएको छ\') व्यक्त गर्दछ।',
        examples: [
          { target: 'わたしは 友だちが ほしいです。', reading: 'わたしは 友だちが ほしいです。', english: 'I want a friend.', nepali: 'मलाई साथी चाहिएको छ।' },
          { target: '今 何が いちばん ほしいですか。― 車が いちばん ほしいです。', reading: '今 何が いちばん ほしいですか。― 車が いちばん ほしいです。', english: '今 何が いちばん ほしいですか。― 車が いちばん ほしいです。', nepali: '今 何が いちばん ほしいですか。― 車が いちばん ほしいです。' }
        ]
      },
      {
        title: '2. Verb ます-form → ます-stem; V(ます-stem)たいです',
        pattern: '2. Verb ます-form → ます-stem; V(ます-stem)たいです',
        explanationEnglish: 'Expresses the speaker\'s desire to do something; also used to ask the listener\'s wish. The object particle を can be replaced by が (only in this construction). たい inflects like an い-adjective. Cannot be used for a third person\'s desire; not used to offer something (use くださいませんか / いかがですか instead).',
        explanationNepali: 'Verb ます-stem + たいです ले कुनै कार्य गर्ने इच्छा (\'गर्न चाहन्छु\') व्यक्त गर्दछ।',
        examples: [
          { target: 'おきなわへ 行きたいです。', reading: 'おきなわへ 行きたいです。', english: 'I want to go to Okinawa.', nepali: 'I want to go to Okinawa. (नेपाली)' },
          { target: 'てんぷらが/を 食べたいです。', reading: 'てんぷらが/を 食べたいです。', english: 'てんぷらが/を 食べたいです。', nepali: 'てんぷらが/を 食べたいです。' }
        ]
      },
      {
        title: '3. V(ます-stem)に 行きます／来ます／帰ります — Purpose of movement',
        pattern: '3. V(ます-stem)に 行きます／来ます／帰ります — Purpose of movement',
        explanationEnglish: 'Expresses the purpose of going/coming/returning, marked with に. A noun before に must denote an action (or an event such as a festival/concert).',
        explanationNepali: 'V(dictionary form) / Nの まえに ले कुनै कार्य गर्नुअघि (\'गर्नुअघि\') अर्को कार्य हुनु जनाउँछ।',
        examples: [
          { target: '神戸へ インド料理を 食べに 行きます。', reading: '神戸へ インド料理を 食べに 行きます。', english: 'I\'m going to Kobe to eat Indian food.', nepali: 'I\'m going to Kobe to eat Indian food. (नेपाली)' },
          { target: '買い物に 行きます。', reading: '買い物に 行きます。', english: '買い物に 行きます。', nepali: '買い物に 行きます。' }
        ]
      },
      {
        title: '4. Nに 乗ります／Nを 降ります',
        pattern: '4. Nに 乗ります／Nを 降ります',
        explanationEnglish: 'に marks the goal with verbs like 乗ります(get on); を marks the starting point with verbs like 降ります(get off), 出ます(leave).',
        explanationNepali: 'に marks the goal with verbs like 乗ります(get on); を marks the starting point with verbs like 降ります(get off), 出ます(leave). (नेपाली व्याख्या)',
        examples: [
          { target: 'あの きっさてんに 入りましょう。', reading: 'あの きっさてんに 入りましょう。', english: 'あの きっさてんに 入りましょう。', nepali: 'あの きっさてんに 入りましょう。' }
        ]
      },
      {
        title: '5. どこか／なにか',
        pattern: '5. どこか／なにか',
        explanationEnglish: 'どこか = anywhere/somewhere; なにか = anything/something. The particles に and を can be omitted.',
        explanationNepali: 'どこか = anywhere/somewhere; なにか = anything/something. The particles に and を can be omitted. (नेपाली व्याख्या)',
        examples: [
          { target: '冬休みは どこか 行きましたか。― ええ、行きました。', reading: '冬休みは どこか 行きましたか。― ええ、行きました。', english: '冬休みは どこか 行きましたか。― ええ、行きました。', nepali: '冬休みは どこか 行きましたか。― ええ、行きました。' },
          { target: 'のどが かわきましたから、何か 飲みたいです。', reading: 'のどが かわきましたから、何か 飲みたいです。', english: 'のどが かわきましたから、何か 飲みたいです。', nepali: 'のどが かわきましたから、何か 飲みたいです。' }
        ]
      },
      {
        title: '6. ご~',
        pattern: '6. ご~',
        explanationEnglish: 'A prefix added to some words to express respect/politeness.',
        explanationNepali: 'A prefix added to some words to express respect/politeness. (नेपाली व्याख्या)',
        examples: [
          { target: 'ごちゅうもんは。', reading: 'ごちゅうもんは。', english: 'May I have your order?', nepali: 'May I have your order? (नेपाली)' }
        ]
      },
    ]
  },
  // ────────────────────────────────────────────────────────────
  // LESSON 14
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 14,
    lessonTitle: 'Te-Form Conjugation & Polite Requests (て形と依頼)',
    grammarPoints: [
      {
        title: '1. Verb conjugation & verb groups',
        pattern: '1. Verb conjugation & verb groups',
        explanationEnglish: 'Japanese verbs conjugate and are divided into three groups. Group I: ます-stem ends in an い-line sound (かきます, のみます). Group II: ます-stem mostly ends in an え-line sound, some in い-line (たべます, みせます, みます). Group III: irregular — します and \'noun+します\', and きます.',
        explanationNepali: 'Japanese verbs conjugate and are divided into three groups. Group I: ます-stem ends in an い-line sound (かきます, のみます). Group II: ます-stem mostly ends in an え-line sound, some in い-line (たべます, みせます, みます). Group III: irregular — します and \'noun+します\', and きます. (नेपाली व्याख्या)',
        examples: [

        ]
      },
      {
        title: '2. Verb て-form',
        pattern: '2. Verb て-form',
        explanationEnglish: 'The verb form ending in て or で is called the て-form. Group I: formed depending on the last sound of the ます-form (see conjugation table; いきます→いって is an exception). Group II: attach て to the ます-stem. Group III: attach て to the ます-stem (します→して, きます→きて).',
        explanationNepali: 'The verb form ending in て or で is called the て-form. Group I: formed depending on the last sound of the ます-form (see conjugation table; いきます→いって is an exception). Group II: attach て to the ます-stem. Group III: attach て to the ます-stem (します→して, きます→きて). (नेपाली व्याख्या)',
        examples: [

        ]
      },
      {
        title: '3. Vて-form ください',
        pattern: '3. Vて-form ください',
        explanationEnglish: 'Used to ask, instruct, or encourage the listener to do something (not for superiors). すみませんが is often added before the request to make it more polite.',
        explanationNepali: 'V(dictionary form) / Nの まえに ले कुनै कार्य गर्नुअघि (\'गर्नुअघि\') अर्को कार्य हुनु जनाउँछ।',
        examples: [
          { target: 'ここに 名前と 住所を 書いて ください。', reading: 'ここに 名前と 住所を 書いて ください。', english: 'Please write your name and address here.', nepali: 'कृपया यहाँ आफ्नो नाम लेख्नुहोस्।' },
          { target: 'すみませんが、この かんじの 読み方を 教えて ください。', reading: 'すみませんが、この かんじの 読み方を 教えて ください。', english: 'すみませんが、この かんじの 読み方を 教えて ください。', nepali: 'すみませんが、この かんじの 読み方を 教えて ください。' }
        ]
      },
      {
        title: '4. Vて-form います (progressive)',
        pattern: '4. Vて-form います (progressive)',
        explanationEnglish: 'Indicates that an action/motion is currently in progress.',
        explanationNepali: 'Indicates that an action/motion is currently in progress. (नेपाली व्याख्या)',
        examples: [
          { target: 'ミラーさんは 今 電話を かけて います。', reading: 'ミラーさんは 今 電話を かけて います。', english: 'Mr. Miller is making a phone call now.', nepali: 'Mr. Miller is making a phone call now. (नेपाली)' },
          { target: '今 雨が 降って いますか。', reading: '今 雨が 降って いますか。', english: '今 雨が 降って いますか。', nepali: '今 雨が 降って いますか。' }
        ]
      },
      {
        title: '5. Vます-stem ましょうか',
        pattern: '5. Vます-stem ましょうか',
        explanationEnglish: 'Used when the speaker offers to do something for the listener.',
        explanationNepali: 'Vましょうか ले सुन्ने व्यक्तिका लागि मद्दत वा कार्य गर्ने प्रस्ताव गर्दा प्रयोग गरिन्छ।',
        examples: [
          { target: '明日も 来ましょうか。― ええ、10時に 来て ください。/ かさを 貸しましょうか。― ええ、お願いします。', reading: '明日も 来ましょうか。― ええ、10時に 来て ください。/ かさを 貸しましょうか。― ええ、お願いします。', english: '明日も 来ましょうか。― ええ、10時に 来て ください。/ かさを 貸しましょうか。― ええ、お願いします。', nepali: '明日も 来ましょうか。― ええ、10時に 来て ください。/ かさを 貸しましょうか。― ええ、お願いします。' }
        ]
      },
      {
        title: '6. ～が (light connective)',
        pattern: '6. ～が (light connective)',
        explanationEnglish: 'The conjunctive particle が, learned in Lesson 8, is also used—losing its original contrastive meaning—to lightly connect two sentences as an introductory remark.',
        explanationNepali: 'The conjunctive particle が, learned in Lesson 8, is also used—losing its original contrastive meaning—to lightly connect two sentences as an introductory remark. (नेपाली व्याख्या)',
        examples: [
          { target: 'すみませんが、お名前は。', reading: 'すみませんが、お名前は。', english: 'すみませんが、お名前は。', nepali: 'すみませんが、お名前は。' },
          { target: 'すみませんが、塩を 取って ください。', reading: 'すみませんが、塩を 取って ください。', english: 'すみませんが、塩を 取って ください。', nepali: 'すみませんが、塩を 取って ください。' }
        ]
      },
      {
        title: '7. Nが (subject of natural phenomena)',
        pattern: '7. Nが (subject of natural phenomena)',
        explanationEnglish: 'When describing a natural phenomenon, the subject is marked with が.',
        explanationNepali: 'When describing a natural phenomenon, the subject is marked with が. (नेपाली व्याख्या)',
        examples: [
          { target: '雨が 降って います。', reading: '雨が 降って います。', english: 'It is raining.', nepali: 'अहिले पानी परिरहेको छ।' }
        ]
      },
    ]
  },
  // ────────────────────────────────────────────────────────────
  // LESSON 15
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 15,
    lessonTitle: 'Permission, Prohibition & States (許可・禁止・状態)',
    grammarPoints: [
      {
        title: '1. Vて-form も いいです',
        pattern: '1. Vて-form も いいです',
        explanationEnglish: 'Grants permission (\'you may do...\'). Question form used to ask permission; euphemistic phrasing (すみません、ちょっと…) used to deny it.',
        explanationNepali: 'Vて もいいです ले कुनै काम गर्ने अनुमति (\'गरे हुन्छ\') व्यक्त गर्दछ।',
        examples: [
          { target: '写真を 撮っても いいです。', reading: '写真を 撮っても いいです。', english: 'You may take pictures.', nepali: 'You may take pictures. (नेपाली)' },
          { target: 'たばこを 吸っても いいですか。― ええ、いいですよ。／すみません、ちょっと…。', reading: 'たばこを 吸っても いいですか。― ええ、いいですよ。／すみません、ちょっと…。', english: 'たばこを 吸っても いいですか。― ええ、いいですよ。／すみません、ちょっと…。', nepali: 'たばこを 吸っても いいですか。― ええ、いいですよ。／すみません、ちょっと…。' }
        ]
      },
      {
        title: '2. Vて-form は いけません',
        pattern: '2. Vて-form は いけません',
        explanationEnglish: 'Expresses prohibition (\'you must not do...\'). Cannot be used by an inferior toward a superior.',
        explanationNepali: 'Vて は いけません ले कडा मनाही (\'गर्नु हुँदैन\') व्यक्त गर्दछ।',
        examples: [
          { target: 'ここで たばこを 吸っては いけません。ここは きんえんですから。', reading: 'ここで たばこを 吸っては いけません。ここは きんえんですから。', english: 'You must not smoke here — this is a no-smoking area.', nepali: 'यहाँ धुम्रपान गर्नु हुँदैन।' }
        ]
      },
      {
        title: '3. Vて-form います (resulting state)',
        pattern: '3. Vて-form います (resulting state)',
        explanationEnglish: 'In addition to the progressive meaning (Lesson 14), て-form います also describes a continuing state resulting from a past action.',
        explanationNepali: 'Vて います ले हाल भइरहेको कार्य (निरन्तर वर्तमान) वा कार्यको नतिजाको स्थिति जनाउँछ।',
        examples: [
          { target: '結婚して います。', reading: '結婚して います。', english: 'I\'m married.', nepali: 'म विवाहित हुँ।' },
          { target: '田中さんを 知って います。', reading: '田中さんを 知って います。', english: 'I know Mr. Tanaka.', nepali: 'म तानाका-जीलाई चिन्छु।' },
          { target: '大阪に 住んで います。', reading: '大阪に 住んで います。', english: '大阪に 住んで います。', nepali: '大阪に 住んで います。' },
          { target: 'カメラを 持って います。', reading: 'カメラを 持って います。', english: '持って います also means \'possess\'.', nepali: '持って います also means \'possess\'. (नेपाली)' }
        ]
      },
      {
        title: '4. Vて-form います (habitual action)',
        pattern: '4. Vて-form います (habitual action)',
        explanationEnglish: 'Also describes a habitual/repeated action — expressing one\'s occupation.',
        explanationNepali: 'Also describes a habitual/repeated action — expressing one\'s occupation. (नेपाली व्याख्या)',
        examples: [
          { target: 'IMCは コンピューターの ソフトを 作って います。', reading: 'IMCは コンピューターの ソフトを 作って います。', english: 'IMC makes computer software.', nepali: 'IMC makes computer software. (नेपाली)' },
          { target: 'ミラーさんは IMCで 働いて います。', reading: 'ミラーさんは IMCで 働いて います。', english: 'ミラーさんは IMCで 働いて います。', nepali: 'ミラーさんは IMCで 働いて います。' }
        ]
      },
      {
        title: '5. Negative of 知って います',
        pattern: '5. Negative of 知って います',
        explanationEnglish: 'The negative of 知って います is 知りません (not 知って いません).',
        explanationNepali: 'The negative of 知って います is 知りません (not 知って いません). (नेपाली व्याख्या)',
        examples: [
          { target: '市役所の 電話番号を 知って いますか。― はい、知って います。／いいえ、知りません。', reading: '市役所の 電話番号を 知って いますか。― はい、知って います。／いいえ、知りません。', english: '市役所の 電話番号を 知って いますか。― はい、知って います。／いいえ、知りません。', nepali: '市役所の 電話番号を 知って いますか。― はい、知って います。／いいえ、知りません。' }
        ]
      },
    ]
  },
  // ────────────────────────────────────────────────────────────
  // LESSON 16
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 16,
    lessonTitle: 'Connecting Sentences & Actions in Sequence (文の接続)',
    grammarPoints: [
      {
        title: '1. Vて-form, Vて-form, ~',
        pattern: '1. Vて-form, Vて-form, ~',
        explanationEnglish: 'Used to connect verb sentences where two or more actions occur in succession, in the order mentioned. Sentence tense is determined by the last verb.',
        explanationNepali: 'Used to connect verb sentences where two or more actions occur in succession, in the order mentioned. Sentence tense is determined by the last verb. (नेपाली व्याख्या)',
        examples: [
          { target: '朝 ジョギングを して、シャワーを あびて、会社へ 行きます。/ 神戸へ 行って、映画を 見て、お茶を 飲みました。', reading: '朝 ジョギングを して、シャワーを あびて、会社へ 行きます。/ 神戸へ 行って、映画を 見て、お茶を 飲みました。', english: '朝 ジョギングを して、シャワーを あびて、会社へ 行きます。/ 神戸へ 行って、映画を 見て、お茶を 飲みました。', nepali: '朝 ジョギングを して、シャワーを あびて、会社へ 行きます。/ 神戸へ 行って、映画を 見て、お茶を 飲みました。' }
        ]
      },
      {
        title: '2. い-adjective(～い→～くて), ~',
        pattern: '2. い-adjective(～い→～くて), ~',
        explanationEnglish: 'When joining an い-adjective sentence to another, drop い and attach くて (いい becomes よくて, exceptionally).',
        explanationNepali: 'い-adj(く) / な-adj(に) / N(に) なります ले स्थितिमा परिवर्तन (\'हुनु / बन्नु\') जनाउँछ।',
        examples: [
          { target: 'ミラーさんは 若くて 元気です。', reading: 'ミラーさんは 若くて 元気です。', english: 'Mr. Miller is young and lively.', nepali: 'मिलर-जी जवान र ऊर्जावान हुनुहुन्छ।' },
          { target: 'きのうは いい天気で、暑かったです。', reading: 'きのうは いい天気で、暑かったです。', english: 'きのうは いい天気で、暑かったです。', nepali: 'きのうは いい天気で、暑かったです。' }
        ]
      },
      {
        title: '3. N／な-adjective, ~ (です→で)',
        pattern: '3. N／な-adjective, ~ (です→で)',
        explanationEnglish: 'When joining noun sentences or な-adjective sentences, です changes to で. Can connect sentences about different topics; not used to connect sentences of contradictory meaning (use が instead).',
        explanationNepali: 'When joining noun sentences or な-adjective sentences, です changes to で. Can connect sentences about different topics; not used to connect sentences of contradictory meaning (use が instead). (नेपाली व्याख्या)',
        examples: [
          { target: 'カリナさんは インドネシア人で、京都大学の 学生です。/ この 部屋は 小さいですが、きれいです。', reading: 'カリナさんは インドネシア人で、京都大学の 学生です。/ この 部屋は 小さいですが、きれいです。', english: 'カリナさんは インドネシア人で、京都大学の 学生です。/ この 部屋は 小さいですが、きれいです。', nepali: 'カリナさんは インドネシア人で、京都大学の 学生です。/ この 部屋は 小さいですが、きれいです。' }
        ]
      },
      {
        title: '4. V1て-form から、V2',
        pattern: '4. V1て-form から、V2',
        explanationEnglish: 'Indicates that upon completion of V1, the action of V2 is conducted. Tense determined by the last verb. The subject of a subordinate clause is marked with が.',
        explanationNepali: 'Indicates that upon completion of V1, the action of V2 is conducted. Tense determined by the last verb. The subject of a subordinate clause is marked with が. (नेपाली व्याख्या)',
        examples: [
          { target: '国へ 帰ってから、父の 会社で 働きます。/ コンサートが 終わってから、レストランで 食事しました。', reading: '国へ 帰ってから、父の 会社で 働きます。/ コンサートが 終わってから、レストランで 食事しました。', english: '国へ 帰ってから、父の 会社で 働きます。/ コンサートが 終わってから、レストランで 食事しました。', nepali: '国へ 帰ってから、父の 会社で 働きます。/ コンサートが 終わってから、レストランで 食事しました。' }
        ]
      },
      {
        title: '5. N1は N2が [な-adjective]',
        pattern: '5. N1は N2が [な-adjective]',
        explanationEnglish: 'Describes an attribute of a thing or person. N1 is the topic; N2 is the subject of the adjective\'s description.',
        explanationNepali: 'Describes an attribute of a thing or person. N1 is the topic; N2 is the subject of the adjective\'s description. (नेपाली व्याख्या)',
        examples: [
          { target: '大阪は 食べ物が おいしいです。/ マリアさんは 髪が 長いです。', reading: '大阪は 食べ物が おいしいです。/ マリアさんは 髪が 長いです。', english: '大阪は 食べ物が おいしいです。/ マリアさんは 髪が 長いです。', nepali: '大阪は 食べ物が おいしいです。/ マリアさんは 髪が 長いです。' }
        ]
      },
      {
        title: '6. どうやって',
        pattern: '6. どうやって',
        explanationEnglish: 'Used to ask the way/method of doing something; answered using the て-form connective pattern.',
        explanationNepali: 'Used to ask the way/method of doing something; answered using the て-form connective pattern. (नेपाली व्याख्या)',
        examples: [
          { target: '大学まで どうやって 行きますか。― 京都駅から 16番の バスに 乗って、大学前で 降ります。', reading: '大学まで どうやって 行きますか。― 京都駅から 16番の バスに 乗って、大学前で 降ります。', english: '大学まで どうやって 行きますか。― 京都駅から 16番の バスに 乗って、大学前で 降ります。', nepali: '大学まで どうやって 行きますか。― 京都駅から 16番の バスに 乗って、大学前で 降ります。' }
        ]
      },
      {
        title: '7. どの',
        pattern: '7. どの',
        explanationEnglish: 'どの asks the listener to identify one among more than two concrete items.',
        explanationNepali: 'どの asks the listener to identify one among more than two concrete items. (नेपाली व्याख्या)',
        examples: [
          { target: 'サントスさんは どの 人ですか。― あの 髪の 黒い、背の 高い 人です。', reading: 'サントスさんは どの 人ですか。― あの 髪の 黒い、背の 高い 人です。', english: 'サントスさんは どの 人ですか。― あの 髪の 黒い、背の 高い 人です。', nepali: 'サントスさんは どの 人ですか。― あの 髪の 黒い、背の 高い 人です。' }
        ]
      },
    ]
  },
  // ────────────────────────────────────────────────────────────
  // LESSON 17
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 17,
    lessonTitle: 'Nai-Form, Instructions & Must-Do Rules (ない形と義務)',
    grammarPoints: [
      {
        title: '1. Verb い-form',
        pattern: '1. Verb い-form',
        explanationEnglish: 'The verb form used with た/たり is called the い-form (e.g., かいて\'s かい is the い-form of かきます). Group I: replace the い-line ます-stem sound with the appropriate sound (いきます is an exception: いって→いい-form). Group II: same as the ます-form. Group III: same as the ます-form (します→して, きます→きて — pattern parallels て-form).',
        explanationNepali: 'The verb form used with た/たり is called the い-form (e.g., かいて\'s かい is the い-form of かきます). Group I: replace the い-line ます-stem sound with the appropriate sound (いきます is an exception: いって→いい-form). Group II: same as the ます-form. Group III: same as the ます-form (します→して, きます→きて — pattern parallels て-form). (नेपाली व्याख्या)',
        examples: [

        ]
      },
      {
        title: '2. Vない-form ないで ください',
        pattern: '2. Vない-form ないで ください',
        explanationEnglish: 'Used to ask or instruct someone NOT to do something.',
        explanationNepali: 'Vないで ください ले कृपया कुनै काम नगर्न अनुरोध (\'नगर्नुहोस्\') गर्दा प्रयोग गरिन्छ।',
        examples: [
          { target: '心配しないで ください。', reading: '心配しないで ください。', english: 'Please don\'t worry.', nepali: 'Please don\'t worry. (नेपाली)' },
          { target: 'ここで 写真を 撮らないで ください。', reading: 'ここで 写真を 撮らないで ください。', english: 'ここで 写真を 撮らないで ください。', nepali: 'ここで 写真を 撮らないで ください。' }
        ]
      },
      {
        title: '3. Vない-form なければ なりません',
        pattern: '3. Vない-form なければ なりません',
        explanationEnglish: 'Means something must be done regardless of the actor\'s will. Not a negative meaning despite the ない form.',
        explanationNepali: 'Vなければ なりません ले अनिवार्य रूपमा गर्नुपर्ने दायित्व (\'गर्नै पर्छ\') व्यक्त गर्दछ।',
        examples: [
          { target: '薬を 飲まなければ なりません。', reading: '薬を 飲まなければ なりません。', english: 'I must take medicine.', nepali: 'मलाई औषधि खानै पर्छ।' }
        ]
      },
      {
        title: '4. Vない-form なくても いいです',
        pattern: '4. Vない-form なくても いいです',
        explanationEnglish: 'Indicates that the action described does not have to be done.',
        explanationNepali: 'Vて もいいです ले कुनै काम गर्ने अनुमति (\'गरे हुन्छ\') व्यक्त गर्दछ।',
        examples: [
          { target: '明日 来なくても いいです。', reading: '明日 来なくても いいです。', english: 'You don\'t have to come tomorrow.', nepali: 'You don\'t have to come tomorrow. (नेपाली)' }
        ]
      },
      {
        title: '5. N(object)は',
        pattern: '5. N(object)は',
        explanationEnglish: 'The direct-object particle を can be replaced by は to make the object a topic.',
        explanationNepali: 'The direct-object particle を can be replaced by は to make the object a topic. (नेपाली व्याख्या)',
        examples: [
          { target: '荷物は ここに 置かないで ください。', reading: '荷物は ここに 置かないで ください。', english: 'As for the parcel, please don\'t put it here.', nepali: 'As for the parcel, please don\'t put it here. (नेपाली)' },
          { target: '昼ごはんは 会社の食堂で 食べます。', reading: '昼ごはんは 会社の食堂で 食べます。', english: '昼ごはんは 会社の食堂で 食べます。', nepali: '昼ごはんは 会社の食堂で 食べます。' }
        ]
      },
      {
        title: '6. N(time)までに',
        pattern: '6. N(time)までに',
        explanationEnglish: 'までに marks the time limit by which an action must be completed (contrast with まで, meaning \'until\', L.4).',
        explanationNepali: 'までに marks the time limit by which an action must be completed (contrast with まで, meaning \'until\', L.4). (नेपाली व्याख्या)',
        examples: [
          { target: '会議は 5時までに 終わります。/ 土曜日までに 本を 返さなければ なりません。', reading: '会議は 5時までに 終わります。/ 土曜日までに 本を 返さなければ なりません。', english: '会議は 5時までに 終わります。/ 土曜日までに 本を 返さなければ なりません。', nepali: '会議は 5時までに 終わります。/ 土曜日までに 本を 返さなければ なりません。' }
        ]
      },
    ]
  },
  // ────────────────────────────────────────────────────────────
  // LESSON 18
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 18,
    lessonTitle: 'Dictionary Form & Expressing Ability/Hobbies (辞書形と可能)',
    grammarPoints: [
      {
        title: '1. Verb dictionary form',
        pattern: '1. Verb dictionary form',
        explanationEnglish: 'The basic (plain, non-past affirmative) form. Group I: replace the い-line ます-stem sound with a う-line sound. Group II: attach る to the ます-stem. Group III: します→する, きます→くる.',
        explanationNepali: 'The basic (plain, non-past affirmative) form. Group I: replace the い-line ます-stem sound with a う-line sound. Group II: attach る to the ます-stem. Group III: します→する, きます→くる. (नेपाली व्याख्या)',
        examples: [

        ]
      },
      {
        title: '2. N／V dictionary form こと が できます — can...',
        pattern: '2. N／V dictionary form こと が できます — can...',
        explanationEnglish: 'できます expresses ability/possibility. A noun (denoting an action) or a nominalized verb phrase (dictionary form + こと) marks what one can do.',
        explanationNepali: 'N / V(dictionary form) ことが できます ले क्षमता वा सम्भावना (\'गर्न सक्नु\') व्यक्त गर्दछ।',
        examples: [
          { target: 'ミラーさんは 日本語を 話す ことが できます。', reading: 'ミラーさんは 日本語を 話す ことが できます。', english: 'Mr. Miller can speak Japanese.', nepali: 'मिलर-जी जापानी बोल्न सक्नुहुन्छ।' },
          { target: 'ミラーさんは 漢字を 読む ことが できます。', reading: 'ミラーさんは 漢字を 読む ことが できます。', english: 'ミラーさんは 漢字を 読む ことが できます。', nepali: 'ミラーさんは 漢字を 読む ことが できます。' },
          { target: 'クレジットカードで 払う ことが できます。', reading: 'クレジットカードで 払う ことが できます。', english: 'クレジットカードで 払う ことが できます。', nepali: 'クレジットカードで 払う ことが できます。' }
        ]
      },
      {
        title: '3. わたしの しゅみは N／V dictionary form こと です — My hobby is...',
        pattern: '3. わたしの しゅみは N／V dictionary form こと です — My hobby is...',
        explanationEnglish: 'V dictionary form こと can express the content of a hobby more concretely than a noun alone.',
        explanationNepali: 'わたしの しゅみは V(dictionary form) ことです ले आफ्नो रुचि/हबी स्पष्ट रूपमा व्यक्त गर्दछ।',
        examples: [
          { target: 'わたしの しゅみは 音楽です。／わたしの しゅみは 音楽を 聞く ことです。', reading: 'わたしの しゅみは 音楽です。／わたしの しゅみは 音楽を 聞く ことです。', english: 'わたしの しゅみは 音楽です。／わたしの しゅみは 音楽を 聞く ことです。', nepali: 'わたしの しゅみは 音楽です。／わたしの しゅみは 音楽を 聞く ことです。' }
        ]
      },
      {
        title: '4. V dictionary form／N の まえに、~ — before...',
        pattern: '4. V dictionary form／N の まえに、~ — before...',
        explanationEnglish: 'Indicates that the action of the main clause occurs before that of the subordinate clause. The subordinate verb is always in the dictionary form, regardless of the main clause\'s tense. With a noun, の is inserted; with a quantifier (period of time), no particle is needed.',
        explanationNepali: 'V(dictionary form) / Nの まえに ले कुनै कार्य गर्नुअघि (\'गर्नुअघि\') अर्को कार्य हुनु जनाउँछ।',
        examples: [
          { target: '日本へ 来る まえに、日本語を 勉強しました。', reading: '日本へ 来る まえに、日本語を 勉強しました。', english: 'I studied Japanese before I came to Japan.', nepali: 'I studied Japanese before I came to Japan. (नेपाली)' },
          { target: '食事の まえに、手を 洗います。', reading: '食事の まえに、手を 洗います。', english: '食事の まえに、手を 洗います。', nepali: '食事の まえに、手を 洗います。' },
          { target: '田中さんは 1時間まえに 帰りました。', reading: '田中さんは 1時間まえに 帰りました。', english: '田中さんは 1時間まえに 帰りました。', nepali: '田中さんは 1時間まえに 帰りました。' }
        ]
      },
      {
        title: '5. あまり～ (negative)',
        pattern: '5. あまり～ (negative)',
        explanationEnglish: 'When paired with a negative, あまり means \'not easily\' or \'not as expected\'.',
        explanationNepali: 'When paired with a negative, あまり means \'not easily\' or \'not as expected\'. (नेपाली व्याख्या)',
        examples: [
          { target: '日本では あまり 馬を 見る ことが できません。', reading: '日本では あまり 馬を 見る ことが できません。', english: 'In Japan we can rarely see horses.', nepali: 'In Japan we can rarely see horses. (नेपाली)' }
        ]
      },
      {
        title: '6. ぜひ',
        pattern: '6. ぜひ',
        explanationEnglish: 'Used with expressions of hope/request (~たいです, ~ませんか, ~てください) to emphasize the wish.',
        explanationNepali: 'Used with expressions of hope/request (~たいです, ~ませんか, ~てください) to emphasize the wish. (नेपाली व्याख्या)',
        examples: [
          { target: 'ぜひ 北海道へ 行きたいです。', reading: 'ぜひ 北海道へ 行きたいです。', english: 'I really want to go to Hokkaido.', nepali: 'I really want to go to Hokkaido. (नेपाली)' },
          { target: 'ぜひ 家へ 来て ください。', reading: 'ぜひ 家へ 来て ください。', english: 'ぜひ 家へ 来て ください。', nepali: 'ぜひ 家へ 来て ください。' }
        ]
      },
    ]
  },
  // ────────────────────────────────────────────────────────────
  // LESSON 19
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 19,
    lessonTitle: 'Ta-Form & Past Experiences (た形と経験)',
    grammarPoints: [
      {
        title: '1. Verb た-form',
        pattern: '1. Verb た-form',
        explanationEnglish: 'Formed by changing て/で of the て-form to た/だ respectively (e.g., 買って→買った; 飲んで→飲んだ). Same grouping pattern as the て-form.',
        explanationNepali: 'Formed by changing て/で of the て-form to た/だ respectively (e.g., 買って→買った; 飲んで→飲んだ). Same grouping pattern as the て-form. (नेपाली व्याख्या)',
        examples: [

        ]
      },
      {
        title: '2. Vた-form ことが あります — have the experience of...',
        pattern: '2. Vた-form ことが あります — have the experience of...',
        explanationEnglish: 'Describes a past experience (parallels N/普通形+んです patterns from L.9). The content of the experience is the nominalized phrase Vた-form こと.',
        explanationNepali: 'Vた ことがあります ले विगतको व्यक्तिगत अनुभव (\'पहिले गरेको छु\') व्यक्त गर्दछ।',
        examples: [
          { target: '馬に 乗った ことが あります。(I have ridden a horse.) — distinct from a sentence simply stating that something happened at a fixed past time.', reading: '馬に 乗った ことが あります。(I have ridden a horse.) — distinct from a sentence simply stating that something happened at a fixed past time.', english: '馬に 乗った ことが あります。(I have ridden a horse.) — distinct from a sentence simply stating that something happened at a fixed past time.', nepali: '馬に 乗った ことが あります。(I have ridden a horse.) — distinct from a sentence simply stating that something happened at a fixed past time.' }
        ]
      },
      {
        title: '3. Vた-form り、Vた-form り します — do such things as V, V, and so on',
        pattern: '3. Vた-form り、Vた-form り します — do such things as V, V, and so on',
        explanationEnglish: 'Refers to some (not all) actions among several, similar to ～や～(など) for nouns (L.10). Sentence-final tense shows overall tense.',
        explanationNepali: 'Refers to some (not all) actions among several, similar to ～や～(など) for nouns (L.10). Sentence-final tense shows overall tense. (नेपाली व्याख्या)',
        examples: [
          { target: '日曜日は テニスを したり、映画を 見たり します。(On Sundays I do things like play tennis, see a movie, etc.) — Note: distinct from a plain て-form sequence, which implies a fixed chronological order; たり implies example activities, not necessarily sequential or exhaustive.', reading: '日曜日は テニスを したり、映画を 見たり します。(On Sundays I do things like play tennis, see a movie, etc.) — Note: distinct from a plain て-form sequence, which implies a fixed chronological order; たり implies example activities, not necessarily sequential or exhaustive.', english: '日曜日は テニスを したり、映画を 見たり します。(On Sundays I do things like play tennis, see a movie, etc.) — Note: distinct from a plain て-form sequence, which implies a fixed chronological order; たり implies example activities, not necessarily sequential or exhaustive.', nepali: '日曜日は テニスを したり、映画を 見たり します。(On Sundays I do things like play tennis, see a movie, etc.) — Note: distinct from a plain て-form sequence, which implies a fixed chronological order; たり implies example activities, not necessarily sequential or exhaustive.' }
        ]
      },
      {
        title: '4. い-adjective(～い→～く)/な-adjective(に) なります — become...',
        pattern: '4. い-adjective(～い→～く)/な-adjective(に) なります — become...',
        explanationEnglish: 'なります indicates a change of state or condition. い-adjective: drop い, add く; な-adjective/noun: add に before なります.',
        explanationNepali: 'V(dictionary form) / Nの まえに ले कुनै कार्य गर्नुअघि (\'गर्नुअघि\') अर्को कार्य हुनु जनाउँछ।',
        examples: [
          { target: '寒く なります。', reading: '寒く なります。', english: 'It becomes cold.', nepali: 'जाडो हुँदै जान्छ।' },
          { target: '元気に なります。', reading: '元気に なります。', english: 'become well', nepali: 'become well (नेपाली)' },
          { target: '25歳に なります。', reading: '25歳に なります。', english: 'turn 25', nepali: 'turn 25 (नेपाली)' }
        ]
      },
      {
        title: '5. そうですね',
        pattern: '5. そうですね',
        explanationEnglish: 'Used to agree/sympathize with the conversation partner. Differs from そうですか (an exclamation upon learning new information); そうですね expresses agreement with something already known/shared.',
        explanationNepali: 'Used to agree/sympathize with the conversation partner. Differs from そうですか (an exclamation upon learning new information); そうですね expresses agreement with something already known/shared. (नेपाली व्याख्या)',
        examples: [
          { target: '寒く なりましたね。― そうですね。', reading: '寒く なりましたね。― そうですね。', english: 'It\'s gotten cold, hasn\'t it? — Yes, it has.', nepali: 'It\'s gotten cold, hasn\'t it? — Yes, it has. (नेपाली)' }
        ]
      },
    ]
  },
  // ────────────────────────────────────────────────────────────
  // LESSON 20
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 20,
    lessonTitle: 'Casual & Plain Speech Style (普通体と会話)',
    grammarPoints: [
      {
        title: '1. Polite style and plain style',
        pattern: '1. Polite style and plain style',
        explanationEnglish: 'Japanese has two speech styles: polite style (です/ます forms) and plain style (だ / plain verb forms). Predicates accompanied by です or ます are the polite form; predicates in plain-style sentences are the plain form.',
        explanationNepali: 'जापानी भाषामा दुई शैली हुन्छन्: नम्र शैली (です/ます) र साधारण शैली (普通体 - साथी र परिवारका बीच)।',
        examples: [
          { target: '明日 東京へ 行きます。／明日 東京へ 行く。 (polite', reading: '明日 東京へ 行きます。／明日 東京へ 行く。 (polite', english: '明日 東京へ 行きます。／明日 東京へ 行く。 (polite', nepali: '明日 東京へ 行きます。／明日 東京へ 行く。 (polite' },
          { target: 'plain) — 忙しいです。／忙しい。 — すもうが 好きです。／すもうが 好きだ。', reading: 'plain) — 忙しいです。／忙しい。 — すもうが 好きです。／すもうが 好きだ。', english: 'plain) — 忙しいです。／忙しい。 — すもうが 好きです。／すもうが 好きだ。', nepali: 'plain) — 忙しいです。／忙しい。 — すもうが 好きです。／すもうが 好きだ。' }
        ]
      },
      {
        title: '2. Proper use of polite and plain style',
        pattern: '2. Proper use of polite and plain style',
        explanationEnglish: 'Polite style can be used at any time, in any place, to anybody — it is the standard for conversation between adults who aren\'t close, with strangers, superiors, or people of similar age one isn\'t close to. Plain style is used with close friends, colleagues, and family. Using plain style inappropriately can sound rude, so when unsure, polite style is safer. Plain style is also standard in written work (newspapers, books, theses, diaries); most letters use polite style.',
        explanationNepali: 'जापानी भाषामा दुई शैली हुन्छन्: नम्र शैली (です/ます) र साधारण शैली (普通体 - साथी र परिवारका बीच)।',
        examples: [

        ]
      },
      {
        title: '3. Conversation in the plain style',
        pattern: '3. Conversation in the plain style',
        explanationEnglish: '(1) Questions omit か and end with a rising intonation. (2) In noun/な-adjective questions, plain-form だ is omitted (affirmative answers ending flatly in だ can sound rough; women rarely use だ). (3) Certain particles (を, へ, etc.) are often dropped when meaning is clear from context, though が, は, で, と, etc. are usually kept. (4) In plain style, the い of Vて-form いい is often dropped (e.g., 持って(い)る).',
        explanationNepali: 'जापानी भाषामा दुई शैली हुन्छन्: नम्र शैली (です/ます) र साधारण शैली (普通体 - साथी र परिवारका बीच)।',
        examples: [
          { target: 'コーヒー 飲む？― うん、飲む。', reading: 'コーヒー 飲む？― うん、飲む。', english: 'コーヒー 飲む？― うん、飲む。', nepali: 'コーヒー 飲む？― うん、飲む。' },
          { target: '今晩 暇？― うん、暇。(men) ／ ええ、暇。(women) ― ううん、暇じゃない。', reading: '今晩 暇？― うん、暇。(men) ／ ええ、暇。(women) ― ううん、暇じゃない。', english: '今晩 暇？― うん、暇。(men) ／ ええ、暇。(women) ― ううん、暇じゃない。', nepali: '今晩 暇？― うん、暇。(men) ／ ええ、暇。(women) ― ううん、暇じゃない。' },
          { target: 'ご飯[を] 食べる？', reading: 'ご飯[を] 食べる？', english: 'ご飯[を] 食べる？', nepali: 'ご飯[を] 食べる？' },
          { target: '辞書 持ってる？― うん、持ってる。／ううん、持ってない。', reading: '辞書 持ってる？― うん、持ってる。／ううん、持ってない。', english: '辞書 持ってる？― うん、持ってる。／ううん、持ってない。', nepali: '辞書 持ってる？― うん、持ってる。／ううん、持ってない。' }
        ]
      },
    ]
  },

  // LESSON 21
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 21,
    lessonTitle: 'Opinions & Quotations (意見と引用)',
    grammarPoints: [
      {
        title: '1. Expressing Opinions [Plain Form] と 思います',
        pattern: '[Plain form sentence] と 思います',
        explanationEnglish: 'Expresses personal opinion or conjecture ("I think that...").',
        explanationNepali: '"मलाई लाग्छ कि..." भनी व्यक्तिगत विचार व्यक्त गर्दा प्रयोग गरिन्छ।',
        examples: [
          { target: '明日はいい天気になると想います。', reading: 'あしたはいいてんきになるとおもいます。', english: 'I think it will be good weather tomorrow.', nepali: 'मलाई लाग्छ भोलि मौसम राम्रो हुनेछ।' }
        ]
      },
      {
        title: '2. Quoting Speech [Plain Form / Direct Quote] と 言いました',
        pattern: '[Quote] と 言いました',
        explanationEnglish: 'Reports what someone said ("said that...").',
        explanationNepali: 'कसैले भनेको कुरा उद्धृत गर्दा ("भन्नुभयो") प्रयोग गरिन्छ।',
        examples: [
          { target: '田中さんは「来週出張する」と言いました。', reading: 'たなかさんは「らいしゅうしゅっちょうする」といいました。', english: 'Mr. Tanaka said he will go on a business trip next week.', nepali: 'तानाका-जीले अर्को हप्ता व्यापारिक भ्रमणमा जान्छु भन्नुभयो।' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 22
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 22,
    lessonTitle: 'Noun Modification with Relative Clauses (連体修飾)',
    grammarPoints: [
      {
        title: '1. Modifying Nouns with Verb Clauses',
        pattern: '[Clause in Plain Form] + Noun',
        explanationEnglish: 'Japanese places relative clauses BEFORE the noun they describe (e.g. "the cake that I made"). Subject in the clause takes が.',
        explanationNepali: 'जापानी भाषामा विशेषण वाक्य नामको अगाडि आउँछ (जस्तै: "मैले बनाएको केक")। वाक्यको कर्तासँग が लाग्छ।',
        examples: [
          { target: 'これは私が作ったケーキです。', reading: 'これはわたしがつくったケーキです。', english: 'This is the cake that I made.', nepali: 'यो मैले बनाएको केक हो।' },
          { target: 'あそこで眼鏡をかけている人は田中さんです。', reading: 'あそこでめがねをかけているひとはたなかさんです。', english: 'The person wearing glasses over there is Mr. Tanaka.', nepali: 'त्यहाँ चश्मा लगाइरहेको मान्छे तानाका-जी हुनुहुन्छ।' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 23
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 23,
    lessonTitle: 'Time Clauses & Natural Conditionals (とき・と)',
    grammarPoints: [
      {
        title: '1. Time Clause とき (When)',
        pattern: 'V[dict/ta/nai] / い-adj / な-adj な / N の + とき',
        explanationEnglish: 'Expresses "when [situation/action]". V[dict]とき = before completing action, V[ta]とき = after completing action.',
        explanationNepali: '"कुनै काम वा अवस्था हुँदा (बेलामा)"।',
        examples: [
          { target: '図書館で本を借りるとき、カードがいります。', reading: 'としょかんでほんをかりるとき、カードがいります。', english: 'When borrowing a book at the library, you need a card.', nepali: 'पुस्तकालयमा किताब सापट लिँदा कार्ड चाहिन्छ।' }
        ]
      },
      {
        title: '2. Natural Conditional と (If/When)',
        pattern: 'V[dictionary-form] + と、[Result]',
        explanationEnglish: 'Expresses an inevitable natural result or mechanical reaction ("whenever X happens, Y automatically occurs").',
        explanationNepali: 'प्राकृतिक वा स्वचालित परिणाम ("यसो गर्दा स्वतः त्यसो हुन्छ")।',
        examples: [
          { target: 'このボタンを押すと、お湯が出ます。', reading: 'このボタンをおすと、おゆがでます。', english: 'When you press this button, hot water comes out.', nepali: 'यो बटन थिच्दा तातो पानी निस्कन्छ।' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 24
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 24,
    lessonTitle: 'Favors of Action (〜て くれます・もらいます・あげます)',
    grammarPoints: [
      {
        title: '1. Someone gives to me くれます',
        pattern: '[Giver] が わたしに [Object] を くれます',
        explanationEnglish: 'くれます (kuremasu) means someone gives something to me or my family.',
        explanationNepali: 'कसैले मलाई वा मेरो परिवारलाई दिँदा くれます प्रयोग हुन्छ।',
        examples: [
          { target: '佐藤さんが私に本をくれました。', reading: 'さとうさんがわたしにほんをくれました。', english: 'Ms. Sato gave a book to me.', nepali: 'सातो-जीले मलाई किताब दिनुभयो।' }
        ]
      },
      {
        title: '2. Action Favors Vて くれます / Vて もらいます / Vて あげます',
        pattern: 'Vて くれます (do for me) | Vて もらいます (have done for me) | Vて あげます (do for someone)',
        explanationEnglish: 'Vてくれます: someone does a favor for me. Vてもらいます: I receive the favor of someone doing an action for me.',
        explanationNepali: 'Vてくれます: कसैले मेरो लागि गरिदिने। Vてもらいます: अरूबाट काम गराउने/पाउने।',
        examples: [
          { target: '山田さんが写真を撮ってくれました。', reading: 'やまださんがしゃしんをとってくれました。', english: 'Mr. Yamada kindly took a photo for me.', nepali: 'यामाडा-जीले मेरो लागि फोटो खिचिदिनुभयो।' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 25
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 25,
    lessonTitle: 'Conditionals & Concessions (〜たら・〜ても)',
    grammarPoints: [
      {
        title: '1. Conditional "If / When" 〜たら',
        pattern: 'Vた ら / い-adj(〜かったら) / な-adj・N(〜だったら)',
        explanationEnglish: 'Formed by adding ら to the past ta-form. Expresses conditional "if" or temporal "when/after".',
        explanationNepali: 'भूतकाल (た形) मा ら थपेर "भने / गरेपछि" भन्ने अर्थ दिन्छ।',
        examples: [
          { target: '雨が降ったら、出かけません。', reading: 'あめがふったら、でかけません。', english: 'If it rains, I will not go out.', nepali: 'पानी पर्यो भने म बाहिर जान्दिन।' },
          { target: '駅についたら、電話をしてください。', reading: 'えきについたら、でんわをしてください。', english: 'When you arrive at the station, please call me.', nepali: 'स्टेशनमा पुगेपछि मलाई फोन गर्नुहोस्।' }
        ]
      },
      {
        title: '2. Concession "Even if / Even though" 〜ても',
        pattern: 'Vて も / い-adj(〜くても) / な-adj・N(〜でも)',
        explanationEnglish: 'Formed by adding も to the te-form. Expresses "even if / even though".',
        explanationNepali: 'て形 मा も थपेर "भए पनि / गरे पनि" भन्ने अर्थ दिन्छ।',
        examples: [
          { target: '安くても、買いません。', reading: 'やすくても、かいません。', english: 'Even if it is cheap, I won\'t buy it.', nepali: 'सस्तो भए पनि म किन्दिन।' }
        ]
      }
    ]
  }
];
