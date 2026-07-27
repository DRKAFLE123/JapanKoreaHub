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
  // LESSON 13
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 13,
    lessonTitle: 'Desires & Purpose of Movement (欲しい・〜たい・目的)',
    grammarPoints: [
      {
        title: '1. Desiring an Object N が 欲しいです',
        pattern: '[N] が 欲しいです',
        explanationEnglish: '欲しい (hoshii) is an i-adjective expressing desire for a physical thing/object.',
        explanationNepali: '欲しい (चाहिनु) ले भौतिक वस्तुको चाहना जनाउँछ।',
        examples: [
          { target: '新しい車が欲しいです。', reading: 'あたらしいくるまがほしいです。', english: 'I want a new car.', nepali: 'मलाई नयाँ कार चाहिएको छ।' }
        ]
      },
      {
        title: '2. Desiring to do an Action V[masu-stem] たいです',
        pattern: 'V[masu-stem] + たいです',
        explanationEnglish: 'Replace ます with たいです to express "want to do [verb]". Object particle を can change to が.',
        explanationNepali: 'ます को ठाउँमा たいです थपेर "गर्न चाहन्छु" भन्ने अर्थ दिन्छ।',
        examples: [
          { target: '日本へ行きたいです。', reading: 'にほんへいきたいです。', english: 'I want to go to Japan.', nepali: 'म जापान जान चाहन्छु।' }
        ]
      },
      {
        title: '3. Purpose of Movement N(place) へ V[masu-stem] に 行きます',
        pattern: '[Place] へ [V-stem / Noun] に 行きます / 来ます',
        explanationEnglish: 'Particle に marks the purpose of going or coming to a place.',
        explanationNepali: 'निपात に ले कुनै ठाउँमा जानु वा आउनुको उद्देश्य जनाउँछ।',
        examples: [
          { target: 'デパートへ買い物に行きます。', reading: 'デパートへかいものにいきます。', english: 'I am going to the department store to shop.', nepali: 'म किनमेल गर्न डिपार्टमेन्ट स्टोर जान्छु।' }
        ]
      }
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
        title: '1. Verb Te-Form Rules (て形)',
        pattern: 'Gr.1: い/ち/り->て, み/び/に->んで, き->いて, ぎ->いで | Gr.2: ~て | Gr.3: して/きて',
        explanationEnglish: 'Group 1: う/つ/る->て, む/ぶ/ぬ->んで, く->いて, ぐ->いで, す->して. (Exception: 行く->行って). Group 2: drop ます add て.',
        explanationNepali: 'समूह-१: う/つ/る->て, む/ぶ/ぬ->んで, く->いて. (अपवाद: 行く->行って)। समूह-२: ます झिकेर て थप्ने।',
        examples: [
          { target: '本を買って、読みます。', reading: 'ほんをかって、よみます。', english: 'I buy a book and read it.', nepali: 'म किताब किनेर पढ्छु।' }
        ]
      },
      {
        title: '2. Polite Request Vて ください',
        pattern: 'Vて + ください',
        explanationEnglish: 'Used to politely ask or instruct someone to do something.',
        explanationNepali: 'कृपया केही गर्न अनुरोध गर्दा Vて + ください प्रयोग गरिन्छ।',
        examples: [
          { target: 'ここに名前を書いてください。', reading: 'ここになまえをかいてください。', english: 'Please write your name here.', nepali: 'कृपया यहाँ आफ्नो नाम लेख्नुहोस्।' }
        ]
      },
      {
        title: '3. Action in Progress Vて います',
        pattern: 'Vて + います',
        explanationEnglish: 'Expresses an action currently taking place (present continuous "-ing").',
        explanationNepali: 'अहिले भइरहेको काम (निरन्तर वर्तमान) जनाउँछ।',
        examples: [
          { target: '今雨が降っています。', reading: 'いまあめがふっています。', english: 'It is raining right now.', nepali: 'अहिले पानी परिरहेको छ।' }
        ]
      }
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
        title: '1. Asking & Giving Permission Vて もいいです',
        pattern: 'Vて + もいいですか',
        explanationEnglish: 'Expresses "May I do [verb]?" or "You may do [verb]".',
        explanationNepali: '"के म गर्न सक्छु?" वा "गरे हुन्छ" भन्ने अनुमति जनाउँछ।',
        examples: [
          { target: '写真を撮ってもいいですか。', reading: 'しゃしんをとってもいいですか。', english: 'May I take a photo?', nepali: 'के म फोटो खिच्न सक्छु?' }
        ]
      },
      {
        title: '2. Prohibition Vて はいけません',
        pattern: 'Vて + はいけません',
        explanationEnglish: 'Expresses strict prohibition: "You must not do [verb]".',
        explanationNepali: 'कडा मनाही: "गर्न पाइँदैन/हुँदैन"।',
        examples: [
          { target: 'ここで煙草を吸ってはいけません。', reading: 'ここであばこをすってはいけません。', english: 'You must not smoke here.', nepali: 'यहाँ चुरोट पिउन पाइँदैन।' }
        ]
      },
      {
        title: '3. Resulting State & Status Vて います',
        pattern: 'Vて + います (Resulting state)',
        explanationEnglish: 'Expresses a continuous state resulting from past action (e.g. 知っています, 結婚しています, 住んでいます).',
        explanationNepali: 'विगतको कामको निरन्तर अवस्था जनाउँछ (जस्तै: थाहा छ, बिहे भएको छ, बसोबास छ)।',
        examples: [
          { target: '私は結婚しています。', reading: 'わたしはけっこんしています。', english: 'I am married.', nepali: 'मेरो बिहे भइसकेको छ।' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 16
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 16,
    lessonTitle: 'Connecting Sentences & Sequence (て形接続と順番)',
    grammarPoints: [
      {
        title: '1. Connecting Verbs & Adjectives in Sequence',
        pattern: 'Verbs: V1て, V2て, V3ます | i-adj: 〜くて | na-adj/N: 〜で',
        explanationEnglish: 'Connect multiple actions chronologically with て. i-adj replaces い with くて. na-adj and Nouns take で.',
        explanationNepali: 'क्रमानुसार काम जोड्न て प्रयोग गरिन्छ। i-विशेषणमा い को ठाउँमा くて र na-विशेषण/नाममा で आउँछ।',
        examples: [
          { target: '朝起きて、顔を洗って、朝ごはんを食べます。', reading: 'あさおきて、かおをあらって、あさごはんをたべます。', english: 'In the morning I wake up, wash my face, and eat breakfast.', nepali: 'बिहान उठेर, अनुहार धुएर, बिहानको खाना खान्छु।' },
          { target: '東京は賑やかで、面白いです。', reading: 'とうきょうはにぎやかで、おもしろいです。', english: 'Tokyo is lively and interesting.', nepali: 'टोक्यो चहलपहल भएको र रोचक छ।' }
        ]
      },
      {
        title: '2. Sequence "After doing" V1て から, V2',
        pattern: 'V1て + から、V2ます',
        explanationEnglish: 'Means "After doing V1, then V2". Emphasizes that V1 must complete before V2 begins.',
        explanationNepali: 'V1 गरेपछि मात्र V2 गर्ने ("V1 गरेपछि")।',
        examples: [
          { target: '仕事が終わってから、映画をみます。', reading: 'しごとがおわってから、えいがをみます。', english: 'After work ends, I will watch a movie.', nepali: 'काम सकिएपछि म फिल्म हेर्छु।' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 17
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 17,
    lessonTitle: 'Nai-Form, Negative Requests & Obligations (ない形と義務)',
    grammarPoints: [
      {
        title: '1. Verb Nai-Form Rules (ない形)',
        pattern: 'Gr.1: u-vowel -> a-vowel + ない (う->わない) | Gr.2: ~ない | Gr.3: しない/こない',
        explanationEnglish: 'Group 1 changes final u-sound to a-sound + ない (e.g. 書く->書かない, 言う->言わない). Group 2 adds ない to stem. する->しない, 来る->こない.',
        explanationNepali: 'समूह-१: う अक्षरलाई あ अक्षरमा बदलेर ない थप्ने। समूह-२: ます को ठाउँमा ない।',
        examples: [
          { target: '写真を撮らないでください。', reading: 'しゃしんをとらないでください。', english: 'Please do not take photos.', nepali: 'कृपया फोटो नखिच्नुहोस्।' }
        ]
      },
      {
        title: '2. Obligation "Must do" Vなければ なりません',
        pattern: 'V[nai-stem] + なければ なりません',
        explanationEnglish: 'Drop ない and add なければ なりません to express mandatory obligation ("must do").',
        explanationNepali: '"मैले गर्नै पर्छ" भन्ने अनिवार्यता जनाउँछ।',
        examples: [
          { target: '毎日薬をのまなければなりません。', reading: 'まいにちくすりをのまなければなりません。', english: 'I must take medicine every day.', nepali: 'मैले हरेक दिन औषधि खानै पर्छ।' }
        ]
      },
      {
        title: '3. Lack of Obligation "Don\'t have to" Vなくても いいです',
        pattern: 'V[nai-stem] + なくても いいです',
        explanationEnglish: 'Expresses that doing an action is optional ("you don\'t have to do it").',
        explanationNepali: '"गर्नु पर्दैन / नगरे पनि हुन्छ" भन्ने अर्थ दिन्छ।',
        examples: [
          { target: '明日は来なくてもいいです。', reading: 'あしたはこなくてもいいです。', english: 'You don\'t have to come tomorrow.', nepali: 'भोलि नआए पनि हुन्छ।' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 18
  // ────────────────────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N5', lesson: 18,
    lessonTitle: 'Dictionary Form & Abilities (辞書形と可能)',
    grammarPoints: [
      {
        title: '1. Ability V[dict-form] ことができます',
        pattern: 'V[dictionary-form] + ことができます / N が できます',
        explanationEnglish: 'Expresses capability or possibility ("can do [verb]").',
        explanationNepali: '"गर्न सक्छु / क्षमता छ" भन्ने अर्थ दिन्छ।',
        examples: [
          { target: '私は日本語を話すことができます。', reading: 'わたしはにほんごをはなすことができます。', english: 'I can speak Japanese.', nepali: 'म जापानी भाषा बोल्न सक्छु।' }
        ]
      },
      {
        title: '2. Expressing Hobbies 趣味は V[dict-form] ことです',
        pattern: '趣味は V[dictionary-form] ことです',
        explanationEnglish: 'Nominator こと converts a verb into a noun phrase to describe hobbies.',
        explanationNepali: 'रुचि व्यक्त गर्दा V[dictionary-form] + ことです प्रयोग गरिन्छ।',
        examples: [
          { target: '私の趣味は音楽を聴くことです。', reading: 'わたしのしゅみはおんがくをきくことです。', english: 'My hobby is listening to music.', nepali: 'मेरो रुचि सङ्गीत सुन्नु हो।' }
        ]
      },
      {
        title: '3. Before doing V1[dict-form] 前に, V2',
        pattern: 'V1[dictionary-form] / N の + 前に、V2',
        explanationEnglish: 'Means "Before doing V1, V2 is performed". Always uses dictionary form before 前に.',
        explanationNepali: 'V1 गर्नुअघि V2 गर्ने ("गर्नुअघि")।',
        examples: [
          { target: '寝る前に、日記を書きます。', reading: 'ねるまえに、にっきをかきます。', english: 'Before going to bed, I write a diary.', nepali: 'सुत्नुअघि म डायरी लेख्छु।' }
        ]
      }
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
        title: '1. Past Experience Vた ことがあります',
        pattern: 'V[ta-form] + ことがあります',
        explanationEnglish: 'Expresses past personal experience ("have ever done [verb]"). Ta-form is conjugated identically to te-form (て->た, んで->んだ).',
        explanationNepali: 'विगतको अनुभव ("पहिले गरेको छु") जनाउँछ। た-form को रूप て-form जस्तै हुन्छ।',
        examples: [
          { target: '富士山にのぼったことがあります。', reading: 'ふじさんにのぼったことがあります。', english: 'I have climbed Mt. Fuji before.', nepali: 'म पहिले फूजी पर्वत चढेको छु।' }
        ]
      },
      {
        title: '2. Listing Actions Non-sequentially V1たり, V2たり します',
        pattern: 'V1た り、V2た り します',
        explanationEnglish: 'Lists representative actions among others without strict time order ("do things like A and B").',
        explanationNepali: 'क्रमैसँग नभई विभिन्न कामहरू उदाहरणीय रूपमा सूचीबद्ध गर्दा प्रयोग गरिन्छ।',
        examples: [
          { target: '日曜日は部屋を掃除したり、本を読んだりします。', reading: 'にちようびはへやをそうじしたり、ほんをよんだりします。', english: 'On Sundays I do things like clean my room and read books.', nepali: 'आइतबार म कोठा सफा गर्ने, किताब पढ्ने जस्ता काम गर्छु।' }
        ]
      },
      {
        title: '3. Becoming / Change of State 〜になります',
        pattern: 'い-adj(〜く) / な-adj(に) / N(に) + なります',
        explanationEnglish: 'Indicates a change in condition or state ("become Adj/Noun").',
        explanationNepali: 'अवस्थामा परिवर्तन आउनु ("हुनु / बन्नु")।',
        examples: [
          { target: '寒くなります。', reading: 'さむくなります。', english: 'It becomes cold.', nepali: 'जाडो हुँदै जान्छ।' }
        ]
      }
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
        title: '1. Plain vs. Polite Form Rules',
        pattern: 'Polite (丁寧体) vs. Plain (普通体)',
        explanationEnglish: 'Polite forms (〜ます/〜です) are used with strangers/superiors. Plain forms (Dictionary, Nai, Ta) are used with friends/family.',
        explanationNepali: 'नम्र भाषा (〜ます/〜です) अपरिचित/मान्यजनसँग। साधारण भाषा (辞書形/ない形/た形) साथी/परिवारसँग।',
        examples: [
          { target: '明日東京へ行く？－うん、行く。', reading: 'あしたとうきょうへいく？－うん、いく。', english: 'Going to Tokyo tomorrow? - Yeah, going. (casual)', nepali: 'भोलि टोक्यो जाने हो? - अँ, जाने। (अनौपचारिक)' }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
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
