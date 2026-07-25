// ============================================================
// GRAMMAR GUIDE DATASET (JAPANESE & KOREAN)
// Complete N4 Lesson Grammar Explanations in English & Nepali
// Lessons 26–50 All Covered
// ============================================================

export interface GrammarPoint {
  title: string;
  pattern: string;
  explanationEnglish: string;
  explanationNepali: string;
  examples: {
    target: string;
    reading?: string;
    english: string;
    nepali: string;
  }[];
}

export interface LessonGrammarGuide {
  language: 'JAPANESE' | 'KOREAN';
  level: string;
  lesson: number;
  lessonTitle: string;
  grammarPoints: GrammarPoint[];
}

// ────────────────────────────────────────────────────────────
// JAPANESE — JLPT N5 (Lesson 1)
// ────────────────────────────────────────────────────────────
export const JAPANESE_GRAMMAR_GUIDES: LessonGrammarGuide[] = [
  {
    language: 'JAPANESE', level: 'N5', lesson: 1,
    lessonTitle: 'Introductions & Identity (自己紹介と身分)',
    grammarPoints: [
      {
        title: '1. Topic Marker は & Identity です',
        pattern: '[N1] は [N2] です',
        explanationEnglish: 'The particle は (wa) marks the topic. です (desu) means "is/am/are".',
        explanationNepali: 'は (वा) निपातले विषय जनाउँछ। です (देसु) ले "हो/हुँ" जनाउँछ।',
        examples: [
          { target: '私は学生です。', reading: 'わたしはがくせいです。', english: 'I am a student.', nepali: 'म विद्यार्थी हुँ।' },
        ]
      },
      {
        title: '2. Negative じゃありません',
        pattern: '[N1] は [N2] じゃありません',
        explanationEnglish: 'じゃありません (ja arimasen) is the polite negative of です.',
        explanationNepali: 'じゃありません ले "होइन" अर्थ दिन्छ।',
        examples: [
          { target: '私は医者じゃありません。', reading: 'わたしはいしゃじゃありません。', english: 'I am not a doctor.', nepali: 'म डाक्टर होइन।' },
        ]
      }
    ]
  },

  // ════════════════════════════════════
  // N4 COMPLETE — LESSONS 26 TO 50
  // ════════════════════════════════════

  {
    language: 'JAPANESE', level: 'N4', lesson: 26,
    lessonTitle: 'Explanatory Form — 〜んです / 〜んですが',
    grammarPoints: [
      {
        title: '1. Explanatory 〜んです / 〜のだ',
        pattern: '[Plain form] んです',
        explanationEnglish: '〜んです (n desu) provides an explanation or background for a situation. It implies the speaker wants the listener to understand the reason or context.',
        explanationNepali: '〜んです (न् देसु) ले कारण वा पृष्ठभूमि प्रस्तुत गर्दा प्रयोग हुन्छ। वक्ताले सुन्नेलाई परिस्थिति बुझाउन चाहन्छ।',
        examples: [
          { target: '頭が痛いんです。', reading: 'あたまがいたいんです。', english: 'The thing is, I have a headache.', nepali: 'कुरा के भने, टाउको दुखेको छ।' },
          { target: '日本語を勉強しているんですか。', reading: 'にほんごをべんきょうしているんですか。', english: 'Are you studying Japanese (I see)?', nepali: 'के तपाईं जापानी पढ्दैहुनुहुन्छ?', },
        ]
      },
      {
        title: '2. Introducing a Request 〜んですが',
        pattern: '[Situation] んですが、[Request/Question]',
        explanationEnglish: '〜んですが sets up a situation before making a request or asking for guidance. It softens the statement and invites help.',
        explanationNepali: '〜んですが ले अनुरोध वा प्रश्नअघि परिस्थिति तयार पार्न र नरम तरिकाले मद्दत माग्न प्रयोग हुन्छ।',
        examples: [
          { target: '道に迷ったんですが、駅はどこですか。', reading: 'みちにまよったんですが、えきはどこですか。', english: 'I am lost; where is the station?', nepali: 'बाटो बिराएँ, स्टेशन कहाँ छ?' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 27,
    lessonTitle: 'Potential Verb Forms (可能動詞)',
    grammarPoints: [
      {
        title: '1. Group 1 Potential: u→e+る',
        pattern: 'Gr.1: 書く → 書ける | Gr.2: 食べる → 食べられる | する → できる',
        explanationEnglish: 'Potential verbs express ability. The direct object particle を changes to が. Group 1 verbs change the final う sound to え+る. Group 2 add られる.',
        explanationNepali: 'सम्भावना क्रियाले क्षमता जनाउँछ। を को ठाउँ में が आउँछ। समूह-१ मा अन्तिम う → え+る हुन्छ। समूह-२ मा られる थपिन्छ।',
        examples: [
          { target: '私は日本語が話せます。', reading: 'わたしはにほんごがはなせます。', english: 'I can speak Japanese.', nepali: 'म जापानी बोल्न सक्छु।' },
          { target: '漢字が読めますか。', reading: 'かんじがよめますか。', english: 'Can you read Kanji?', nepali: 'काञ्जी पढ्न सक्नुहुन्छ?' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 28,
    lessonTitle: 'Simultaneous Actions 〜ながら / Multiple Reasons 〜し〜し',
    grammarPoints: [
      {
        title: '1. Simultaneous Action 〜ながら',
        pattern: '[Verb ます-stem] + ながら + [Main Verb]',
        explanationEnglish: '〜ながら connects two actions happening at the same time by the same subject. The main action is the second verb.',
        explanationNepali: '〜ながら ले एकै समयमा एउटै व्यक्तिले दुई काम गर्दा प्रयोग हुन्छ। मुख्य काम दोस्रो क्रियामा हुन्छ।',
        examples: [
          { target: '音楽を聞きながら勉強します。', reading: 'おんがくをききながらべんきょうします。', english: 'I study while listening to music.', nepali: 'सङ्गीत सुन्दै पढ्छु।' },
        ]
      },
      {
        title: '2. Listing Reasons 〜し、〜し、',
        pattern: '[Sentence 1] し、[Sentence 2] し、[Conclusion]',
        explanationEnglish: '〜し lists multiple reasons or characteristics, often leading to a conclusion. It is softer and more conversational than だから.',
        explanationNepali: '〜し ले धेरै कारण वा विशेषता सूचीबद्ध गर्दछ। यो だから भन्दा नरम र बोलचालमा बढी प्रयोग हुन्छ।',
        examples: [
          { target: 'この町は静かだし、空気もいいし、気に入っています。', reading: 'このまちはしずかだし、くうきもいいし、きにいっています。', english: 'This town is quiet and the air is clean, so I like it.', nepali: 'यो सहर शान्त पनि छ, हावा पनि सफा छ, त्यसैले मन पर्छ।' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 29,
    lessonTitle: 'Resultant States 〜ています (Ongoing State)',
    grammarPoints: [
      {
        title: '1. Ongoing State from Change of State 〜ています',
        pattern: '[Change-of-State Verb て-form] + います',
        explanationEnglish: 'When 〜ています follows a momentary/change-of-state verb, it expresses the current state resulting from a past change, not an ongoing action.',
        explanationNepali: 'परिवर्तन-अवस्था क्रिया पछि 〜ています आएमा अहिलेको स्थिति (परिणाम) जनाउँछ, निरन्तर काम होइन।',
        examples: [
          { target: 'ドアが開いています。', reading: 'ドアがあいています。', english: 'The door is open.', nepali: 'ढोका खुलेको छ।' },
          { target: '田中さんは結婚しています。', reading: 'たなかさんはけっこんしています。', english: 'Mr. Tanaka is married.', nepali: 'तानाका-जी विवाहित हुनुहुन्छ।' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 30,
    lessonTitle: 'Preparatory Action 〜ておきます / Visible Result 〜てあります',
    grammarPoints: [
      {
        title: '1. Do in Advance 〜ておきます',
        pattern: '[Verb て-form] + おきます',
        explanationEnglish: '〜ておきます means to do something in advance for future benefit. The action is completed now in preparation for later.',
        explanationNepali: '〜ておきます ले भविष्यको लागि अगाडि नै केही काम गरेर राख्नु भन्ने जनाउँछ।',
        examples: [
          { target: '旅行の前にホテルを予約しておきます。', reading: 'りょこうのまえにホテルをよやくしておきます。', english: 'I will book the hotel in advance before the trip.', nepali: 'यात्राअघि होटल अगाडि नै बुक गर्छु।' },
        ]
      },
      {
        title: '2. Visible Prepared State 〜てあります',
        pattern: '[Transitive Verb て-form] + あります',
        explanationEnglish: '〜てあります shows that something has been done (by someone) and the result is visible now. It emphasizes the current visible state.',
        explanationNepali: '〜てあります ले कसैले गरेको काम अहिले पनि दृश्यमान छ भन्ने जनाउँछ।',
        examples: [
          { target: '壁に地図が貼ってあります。', reading: 'かべにちずがはってあります。', english: 'A map has been pasted on the wall.', nepali: 'भित्तामा नक्सा टाँसिएको छ।' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 31,
    lessonTitle: 'Volitional Form 〜おう/〜よう + 〜と思っています',
    grammarPoints: [
      {
        title: '1. Volitional Form (意向形)',
        pattern: 'Gr.1: く→こう | Gr.2: る→よう | する→しよう | くる→こよう',
        explanationEnglish: 'The volitional form expresses the speaker\'s intention or invites others to do something together (Let\'s / I will ~).',
        explanationNepali: 'इच्छा रूपले वक्ताको इरादा वा अरूलाई सँगै काम गर्न आमन्त्रण (गरौँ / गर्छु) व्यक्त गर्दछ।',
        examples: [
          { target: '来年、転職しよう。', reading: 'らいねん、てんしょくしよう。', english: 'I will change jobs next year.', nepali: 'अर्को वर्ष काम परिवर्तन गरौँ।' },
        ]
      },
      {
        title: '2. Future Intention 〜と思っています',
        pattern: '[Volitional form] + と思っています',
        explanationEnglish: '〜と思っています expresses a firm personal intention or plan that the speaker has already decided on.',
        explanationNepali: '〜と思っています ले वक्ताको पक्का इरादा वा पहिले नै निर्णय भइसकेको योजना जनाउँछ।',
        examples: [
          { target: '来年、日本へ行こうと思っています。', reading: 'らいねん、にほんへいこうとおもっています。', english: 'I am thinking of going to Japan next year.', nepali: 'अर्को वर्ष जापान जाने सोचेको छु।' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 32,
    lessonTitle: 'Advice & Probability 〜ほうがいい / 〜でしょう / 〜かもしれない',
    grammarPoints: [
      {
        title: '1. Advice 〜ほうがいい (You should ~)',
        pattern: '[Verb た-form] + ほうがいい / [Verb ない-form] + ほうがいい',
        explanationEnglish: '〜ほうがいい gives advice or recommendation. Using past tense (〜た) often sounds more direct.',
        explanationNepali: '〜ほうがいい ले सल्लाह वा सुझाव दिन्छ। भूतकाल (〜た) प्रयोगले सल्लाह अझ प्रत्यक्ष हुन्छ।',
        examples: [
          { target: '早く病院へ行ったほうがいいです。', reading: 'はやくびょういんへいったほうがいいです。', english: 'You should go to the hospital soon.', nepali: 'चाँडो अस्पताल जानु राम्रो हुन्छ।' },
        ]
      },
      {
        title: '2. Probability 〜でしょう (Probably)',
        pattern: '[Plain form] + でしょう',
        explanationEnglish: '〜でしょう expresses a prediction or supposition. It is softer than a plain statement.',
        explanationNepali: '〜でしょう ले अनुमान वा भविष्यवाणी जनाउँछ। सरल भनाइभन्दा नरम छ।',
        examples: [
          { target: '明日は晴れるでしょう。', reading: 'あしたははれるでしょう。', english: 'It will probably be sunny tomorrow.', nepali: 'भोलि घाम लाग्ला।' },
        ]
      },
      {
        title: '3. Possibility 〜かもしれない (Might be)',
        pattern: '[Plain form] + かもしれない',
        explanationEnglish: '〜かもしれない expresses uncertainty or possibility. It is less certain than 〜でしょう.',
        explanationNepali: '〜かもしれない ले अनिश्चितता वा सम्भावना जनाउँछ। 〜でしょう भन्दा कम निश्चित छ।',
        examples: [
          { target: '彼女は来ないかもしれません。', reading: 'かのじょはこないかもしれません。', english: 'She might not come.', nepali: 'उनी नआउनी पनि सक्छिन्।' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 33,
    lessonTitle: 'Imperative & Prohibition 命令形 / 禁止形 / 〜という意味',
    grammarPoints: [
      {
        title: '1. Imperative Form 命令形 (Do ~!)',
        pattern: 'Gr.1: く→け (書け!) | Gr.2: る→ろ (食べろ!) | する→しろ | くる→こい',
        explanationEnglish: 'The imperative form expresses a command (informal/urgent). Used in emergencies, rulebooks, or by superiors to inferiors.',
        explanationNepali: 'आदेश रूपले जोडदार निर्देश दिन्छ (अनौपचारिक/अत्यावश्यक)। आपतकाल, नियम, वा ठूलाबाट सानोलाई।',
        examples: [
          { target: '急げ！ここを走るな！', reading: 'いそげ！ここをはしるな！', english: 'Hurry! Don\'t run here!', nepali: 'हतार गर! यहाँ नदौड!' },
        ]
      },
      {
        title: '2. Prohibition Form 禁止形 (Don\'t ~!)',
        pattern: '[Plain Verb] + な',
        explanationEnglish: 'Adding な after a plain verb form creates a prohibition (Don\'t ~ / No ~). Direct and forceful.',
        explanationNepali: 'सरल क्रिया पछि な थपेर निषेध बनाइन्छ (नगर / निषेध)। प्रत्यक्ष र बलियो।',
        examples: [
          { target: 'ここで写真を撮るな！', reading: 'ここでしゃしんをとるな！', english: 'Do not take photos here!', nepali: 'यहाँ फोटो नखिच!' },
        ]
      },
      {
        title: '3. Meaning Expression 〜という意味です',
        pattern: '[Word] は [Explanation] という意味です',
        explanationEnglish: '〜という意味です is used to explain the meaning of a word or expression.',
        explanationNepali: '〜という意味です ले कुनै शब्द वा अभिव्यक्तिको अर्थ बताउन प्रयोग हुन्छ।',
        examples: [
          { target: '「親切」は「kind」という意味です。', reading: '「しんせつ」は「kind」といういみです。', english: '「親切」 means "kind".', nepali: '「親切」 को अर्थ "दयालु" हो।' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 34,
    lessonTitle: 'Instructions 〜通りに / After 〜あとで / Without 〜ないで',
    grammarPoints: [
      {
        title: '1. Exactly As Taught 〜とおりに',
        pattern: '[Noun の / Verb た-form] + とおりに',
        explanationEnglish: '〜とおりに means to do exactly as stated, just as shown or told.',
        explanationNepali: '〜とおりに ले "ठ्याक्कै ~ अनुसार" भन्ने जनाउँछ।',
        examples: [
          { target: '先生が教えたとおりにやってください。', reading: 'せんせいがおしえたとおりにやってください。', english: 'Please do it exactly as the teacher taught.', nepali: 'शिक्षकले सिकाएको ठ्याक्कै गर्नुस्।' },
        ]
      },
      {
        title: '2. After Doing 〜あとで',
        pattern: '[Verb た-form] + あとで / [Noun の] + あとで',
        explanationEnglish: '〜あとで means "after doing ~". The first action is completed before the second begins.',
        explanationNepali: '〜あとで ले "~ गरेपछि" भन्ने जनाउँछ। पहिलो काम सिद्धिएपछि दोस्रो सुरु हुन्छ।',
        examples: [
          { target: '仕事のあとで飲みに行きましょう。', reading: 'しごとのあとでのみにいきましょう。', english: 'Let\'s go for a drink after work.', nepali: 'काम सकेपछि पिउन जाऔँ।' },
        ]
      },
      {
        title: '3. Without Doing 〜ないで',
        pattern: '[Verb ない-form] + で',
        explanationEnglish: '〜ないで means "without doing ~" or "please do not do ~".',
        explanationNepali: '〜ないで ले "~ नगरिकन" वा "~ नगर्नुस्" भन्ने जनाउँछ।',
        examples: [
          { target: '確認しないで送ってしまいました。', reading: 'かくにんしないでおくってしまいました。', english: 'I sent it without confirming.', nepali: 'जाँच नगरिकन पठाइहालेँ।' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 35,
    lessonTitle: 'Conditional 〜ば / Contextual Condition 〜なら',
    grammarPoints: [
      {
        title: '1. Conditional Form 〜ば',
        pattern: 'Gr.1: く→けば | Gr.2: る→れば | する→すれば | くる→くれば',
        explanationEnglish: '〜ば expresses a general conditional "if ~ then ~". Often used for natural consequences or advice.',
        explanationNepali: '〜ば ले सामान्य शर्त "यदि ~ भए ~" जनाउँछ। प्राकृतिक परिणाम वा सल्लाहमा प्रयोग हुन्छ।',
        examples: [
          { target: '右に曲がれば、病院が見えます。', reading: 'みぎにまがれば、びょういんがみえます。', english: 'If you turn right, you can see the hospital.', nepali: 'दाहिने मोडे अस्पताल देखिन्छ।' },
        ]
      },
      {
        title: '2. Contextual Condition 〜なら',
        pattern: '[Sentence/Noun] + なら',
        explanationEnglish: '〜なら is used when the condition is based on something the listener already mentioned or a situation just introduced. It means "if that is the case".',
        explanationNepali: '〜なら ले सुन्नेले भनेको कुरा वा अभर्खर उल्लेख भएको परिस्थितिका आधारमा शर्त जनाउँछ। "त्यस्तो भए" भन्ने अर्थ।',
        examples: [
          { target: '日本語を習いたいなら、あの先生がいいですよ。', reading: 'にほんごをならいたいなら、あのせんせいがいいですよ。', english: 'If you want to learn Japanese, that teacher is good.', nepali: 'जापानी सिक्न चाहनुहुन्छ भने, त्यो शिक्षक राम्रो छन्।' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 36,
    lessonTitle: 'Habits & Change 〜ようにします / 〜ようになりました',
    grammarPoints: [
      {
        title: '1. Making an Effort 〜ようにします',
        pattern: '[Verb Dictionary] + ようにします',
        explanationEnglish: '〜ようにします expresses a conscious effort or rule the speaker sets for themselves.',
        explanationNepali: '〜ようにします ले जानाजान प्रयास वा आफूले आफूलाई दिएको नियम जनाउँछ।',
        examples: [
          { target: '毎朝早く起きるようにしています。', reading: 'まいあさはやくおきるようにしています。', english: 'I try to wake up early every morning.', nepali: 'हरेक बिहान चाँडो उठ्ने प्रयास गर्छु।' },
        ]
      },
      {
        title: '2. Gradual Change 〜ようになりました',
        pattern: '[Verb Dictionary / ない] + ようになりました',
        explanationEnglish: '〜ようになりました shows a gradual change in ability or habit — something that was not possible or done before, but now is.',
        explanationNepali: '〜ようになりました ले क्षमता वा बानीमा क्रमशः आएको परिवर्तन जनाउँछ — पहिले नसक्थिएँ, अब सक्छु।',
        examples: [
          { target: '日本語が少し話せるようになりました。', reading: 'にほんごがすこしはなせるようになりました。', english: 'I have come to be able to speak some Japanese.', nepali: 'अलि-अलि जापानी बोल्न सक्ने भएँ।' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 37,
    lessonTitle: 'Passive Voice 受身形 〜れる / 〜られる',
    grammarPoints: [
      {
        title: '1. Passive Form 受身形',
        pattern: 'Gr.1: く→かれる (書かれる) | Gr.2: る→られる (食べられる) | する→される | くる→こられる',
        explanationEnglish: 'The passive voice shows that the subject receives the action. The doer (agent) is marked by に. Often expresses inconvenience or being affected by something.',
        explanationNepali: 'कर्मवाच्य रूपमा विषय (subject) क्रियाको प्रभाव पाउने हुन्छ। कर्ता に द्वारा जनाइन्छ। प्रायः असुविधा वा प्रभाव पर्दा प्रयोग हुन्छ।',
        examples: [
          { target: '先生に叱られました。', reading: 'せんせいにしかられました。', english: 'I was scolded by the teacher.', nepali: 'शिक्षकबाट डाँट खाएँ।' },
          { target: '鈴木さんは社長にほめられました。', reading: 'すずきさんはしゃちょうにほめられました。', english: 'Mr. Suzuki was praised by the company president.', nepali: 'सुजुकी-जीलाई अध्यक्षले प्रशंसा गर्नुभयो।' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 38,
    lessonTitle: 'Nominalization 〜のは / 〜のが / 〜のを',
    grammarPoints: [
      {
        title: '1. Noun Clause with の',
        pattern: '[Verb Dictionary] + の + は / が / を',
        explanationEnglish: 'の (no) nominalizes a verb phrase, making it function like a noun in the sentence. 〜のが好き = like doing ~. 〜のは〜です = The thing that is ~ is ~.',
        explanationNepali: 'の (नो) ले क्रिया वाक्यांशलाई संज्ञा जस्तो बनाउँछ। 〜のが好き = ~ गर्न मन पर्छ। 〜のは〜です = ~ हो भन्ने कुरा ~ हो।',
        examples: [
          { target: '歌を歌うのが好きです。', reading: 'うたをうたうのがすきです。', english: 'I like singing.', nepali: 'गाउन मन पर्छ।' },
          { target: '私の趣味は写真を撮ることです。', reading: 'わたしのしゅみはしゃしんをとることです。', english: 'My hobby is taking photos.', nepali: 'मेरो शौख फोटो खिच्नु हो।' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 39,
    lessonTitle: 'Cause & Effect 〜て / Reason 〜ので / 〜のに (Contrast)',
    grammarPoints: [
      {
        title: '1. Cause Expression 〜て (Causation)',
        pattern: '[Verb て-form] + [Effect]',
        explanationEnglish: 'When 〜て connects two clauses, the first can show the cause of the second. Common in explaining unintended or natural consequences.',
        explanationNepali: '〜て ले दुई वाक्य जोड्दा पहिलो वाक्य दोस्रोको कारण बन्न सक्छ। अनपेक्षित वा स्वाभाविक परिणाम बताउन प्रयोग।',
        examples: [
          { target: '台風が来て、電車が止まりました。', reading: 'たいふうがきて、でんしゃがとまりました。', english: 'A typhoon came and the trains stopped.', nepali: 'आँधीबेहरी आएर रेल रोकियो।' },
        ]
      },
      {
        title: '2. Reason 〜ので (Objective Cause)',
        pattern: '[Plain form / Adj な + な] + ので',
        explanationEnglish: '〜ので expresses an objective reason or cause. It sounds more formal and logical than から.',
        explanationNepali: '〜ので ले वस्तुनिष्ठ कारण जनाउँछ। から भन्दा बढी औपचारिक र तार्किक लाग्छ।',
        examples: [
          { target: '今日は雨なので、試合は中止になりました。', reading: 'きょうはあめなので、しあいはちゅうしになりました。', english: 'Because it is raining today, the match was cancelled.', nepali: 'आज पानी परेकाले खेल रद्द भयो।' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 40,
    lessonTitle: 'Embedded Questions 〜かどうか / 〜か (Indirect Questions)',
    grammarPoints: [
      {
        title: '1. Whether or Not 〜かどうか',
        pattern: '[Plain form] + かどうか + [知っていますか / わかりません etc.]',
        explanationEnglish: '〜かどうか embeds a yes/no question into a statement. It means "whether or not ~".',
        explanationNepali: '〜かどうか ले हो/होइन प्रश्नलाई वाक्यभित्र राख्छ। "~ हो कि होइन" भन्ने अर्थ।',
        examples: [
          { target: '彼が来るかどうか分かりません。', reading: 'かれがくるかどうかわかりません。', english: 'I don\'t know whether he will come.', nepali: 'उ आउँछ कि आउँदैन थाहा छैन।' },
        ]
      },
      {
        title: '2. Indirect Wh-Question 〜か',
        pattern: '[Question word + Plain form] + か + [Main clause]',
        explanationEnglish: '〜か at the end of an embedded clause converts a wh-question (who, what, where, when, how) into an indirect question.',
        explanationNepali: '〜か ले प्रश्न वाक्यलाई अप्रत्यक्ष प्रश्नमा रूपान्तरण गर्दछ (को, के, कहाँ, कति, कसरी)।',
        examples: [
          { target: '駅がどこにあるか知っていますか。', reading: 'えきがどこにあるかしっていますか。', english: 'Do you know where the station is?', nepali: 'स्टेशन कहाँ छ थाहा छ?' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 41,
    lessonTitle: 'Polite Giving & Receiving くれる / もらう / あげる (Honorific Levels)',
    grammarPoints: [
      {
        title: '1. Honorific and Humble Giving/Receiving',
        pattern: 'いただく (humble receive) | くださる (honorific give) | さしあげる (humble give)',
        explanationEnglish: 'Japanese has different verbs for giving and receiving depending on the social hierarchy. いただく is the humble form of もらう. くださる is the honorific form of くれる.',
        explanationNepali: 'जापानीमा दिनु/पाउनुका लागि सामाजिक स्तर अनुसार फरक-फरक क्रिया छन्। いただく = विनम्र "पाउनु"। くださる = आदरार्थी "दिनुहुन्छ"।',
        examples: [
          { target: '社長から賞をいただきました。', reading: 'しゃちょうからしょうをいただきました。', english: 'I received an award from the president.', nepali: 'अध्यक्षबाट पुरस्कार पाएँ।' },
          { target: '先生が本をくださいました。', reading: 'せんせいがほんをくださいました。', english: 'The teacher gave me a book.', nepali: 'शिक्षकले मलाई किताब दिनुभयो।' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 42,
    lessonTitle: 'Purpose 〜ために / Usage 〜のに使います',
    grammarPoints: [
      {
        title: '1. Purpose 〜ために',
        pattern: '[Verb Dictionary] + ために / [Noun の] + ために',
        explanationEnglish: '〜ために expresses purpose — doing something in order to achieve a goal. The subject of both clauses should be the same.',
        explanationNepali: '〜ために ले उद्देश्य जनाउँछ — लक्ष्य पाउनका लागि केही गर्नु। दुवै उपवाक्यको कर्ता एउटै हुन्छ।',
        examples: [
          { target: 'JLPT N4に合格するために毎日勉強します。', reading: 'JLPTエヌよんにごうかくするためにまいにちべんきょうします。', english: 'I study every day in order to pass JLPT N4.', nepali: 'JLPT N4 पास गर्नका लागि हरेक दिन पढ्छु।' },
        ]
      },
      {
        title: '2. Used For 〜のに使います',
        pattern: '[Noun は] [Verb Dictionary] + のに使います',
        explanationEnglish: '〜のに使います explains what something is used for.',
        explanationNepali: '〜のに使います ले कुनै चिजको प्रयोग उद्देश्य बताउँछ।',
        examples: [
          { target: 'このナイフは野菜を切るのに使います。', reading: 'このナイフはやさいをきるのにつかいます。', english: 'This knife is used for cutting vegetables.', nepali: 'यो चाकु तरकारी काट्नका लागि प्रयोग गरिन्छ।' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 43,
    lessonTitle: 'Conjecture from Appearance 〜そうです (様態) / Hearsay-like 〜らしい',
    grammarPoints: [
      {
        title: '1. Appearance-Based Conjecture 〜そうです (様態)',
        pattern: '[Verb ます-stem / Adj stem] + そうです',
        explanationEnglish: '〜そうです (appearance-based) is used when you judge how something looks or seems directly from observation.',
        explanationNepali: '〜そうです (प्रत्यक्ष अवलोकन) ले प्रत्यक्ष हेरेर कुनै चिजको अवस्था अनुमान गर्दा प्रयोग हुन्छ।',
        examples: [
          { target: 'この料理はおいしそうですね。', reading: 'このりょうりはおいしそうですね。', english: 'This food looks delicious.', nepali: 'यो खाना स्वादिलो देखिन्छ।' },
        ]
      },
      {
        title: '2. Inference from Evidence 〜らしい',
        pattern: '[Plain form] + らしい',
        explanationEnglish: '〜らしい expresses a conclusion based on indirect evidence, rumour, or general impression. It can also mean "typical of ~".',
        explanationNepali: '〜らしい ले अप्रत्यक्ष प्रमाण वा हल्लाका आधारमा निष्कर्ष जनाउँछ। "~ जस्तो लाग्छ" वा "~ को लागि उचित" पनि हुन्छ।',
        examples: [
          { target: '彼は結婚するらしいです。', reading: 'かれはけっこんするらしいです。', english: 'It seems he is going to get married.', nepali: 'उ विवाह गर्ने जस्तो देखिन्छ।' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 44,
    lessonTitle: 'Excess 〜すぎます / Ease 〜やすい / Difficulty 〜にくい',
    grammarPoints: [
      {
        title: '1. Excessiveness 〜すぎます',
        pattern: '[Verb ます-stem / Adj stem] + すぎます',
        explanationEnglish: '〜すぎます means "too much" or "excessively". When negative it expresses "too little".',
        explanationNepali: '〜すぎます ले "अत्यधिक" वा "धेरै नै ~" जनाउँछ।',
        examples: [
          { target: '食べすぎて、お腹が痛いです。', reading: 'たべすぎて、おなかがいたいです。', english: 'I ate too much and my stomach hurts.', nepali: 'धेरै खाएर पेट दुख्यो।' },
        ]
      },
      {
        title: '2. Easy to Do 〜やすい',
        pattern: '[Verb ます-stem] + やすい',
        explanationEnglish: '〜やすい means "easy to ~" or "tends to ~".',
        explanationNepali: '〜やすい ले "~ गर्न सजिलो" वा "~ हुने प्रवृत्ति" जनाउँछ।',
        examples: [
          { target: 'このペンは書きやすいです。', reading: 'このペンはかきやすいです。', english: 'This pen is easy to write with.', nepali: 'यो कलम लेख्न सजिलो छ।' },
        ]
      },
      {
        title: '3. Difficult to Do 〜にくい',
        pattern: '[Verb ます-stem] + にくい',
        explanationEnglish: '〜にくい means "difficult to ~" or "hard to ~".',
        explanationNepali: '〜にくい ले "~ गर्न गाह्रो" जनाउँछ।',
        examples: [
          { target: 'この言葉は発音しにくいです。', reading: 'このことばははつおんしにくいです。', english: 'This word is difficult to pronounce.', nepali: 'यो शब्द उच्चारण गर्न गाह्रो छ।' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 45,
    lessonTitle: 'Situation 〜場合は / Role 〜として / Replacement 〜代わりに',
    grammarPoints: [
      {
        title: '1. In the Event of 〜場合は',
        pattern: '[Noun の / Verb Dict/た] + 場合は',
        explanationEnglish: '〜場合は means "in the case of / in the event of ~". More formal than 〜なら or 〜とき.',
        explanationNepali: '〜場合は ले "~ को अवस्थामा / ~ भएमा" जनाउँछ। 〜なら वा 〜とき भन्दा बढी औपचारिक।',
        examples: [
          { target: '火事の場合は、すぐに119番に電話してください。', reading: 'かじのばあいは、すぐに119ばんにでんわしてください。', english: 'In case of fire, please immediately call 119.', nepali: 'आगलागीको अवस्थामा तुरुन्त 119 मा फोन गर्नुस्।' },
        ]
      },
      {
        title: '2. In the Role of 〜として',
        pattern: '[Noun] + として',
        explanationEnglish: '〜として marks a role, capacity, or identity. "As ~ / In the capacity of ~".',
        explanationNepali: '〜として ले भूमिका, क्षमता वा पहिचान जनाउँछ। "~ को रूपमा"।',
        examples: [
          { target: '通訳として会議に出席しました。', reading: 'つうやくとしてかいぎにしゅっせきしました。', english: 'I attended the meeting as an interpreter.', nepali: 'दोभाषेको रूपमा मिटिङमा उपस्थित भएँ।' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 46,
    lessonTitle: 'Timing 〜ところです / Expectation 〜はずです',
    grammarPoints: [
      {
        title: '1. Timing with 〜ところです (Just about to / In the middle of / Just finished)',
        pattern: 'About to: [Dict.] + ところ | Middle: [て-form+いる] + ところ | Just done: [た] + ところ',
        explanationEnglish: '〜ところ expresses the precise timing of an action: just before, during, or just after.',
        explanationNepali: '〜ところ ले कुनै कामको ठ्याक्कै समय जनाउँछ: भर्खर गर्न लागेको, गर्दैछु, वा भर्खरै सकेको।',
        examples: [
          { target: '今、出かけるところです。', reading: 'いま、でかけるところです。', english: 'I am just about to go out now.', nepali: 'भर्खर बाहिर जान लागेको छु।' },
          { target: 'ちょうど昼ご飯を食べたところです。', reading: 'ちょうどひるごはんをたべたところです。', english: 'I just finished eating lunch.', nepali: 'भर्खरै दिउँसोको खाना खाएँ।' },
        ]
      },
      {
        title: '2. Expectation 〜はずです',
        pattern: '[Plain form / Noun の] + はずです',
        explanationEnglish: '〜はずです expresses a logical expectation — something should be the case based on prior knowledge or reasoning.',
        explanationNepali: '〜はずです ले तर्कसंगत अपेक्षा जनाउँछ — ज्ञान वा कारणका आधारमा "हुनुपर्ने हो"।',
        examples: [
          { target: '田中さんはもう来ているはずです。', reading: 'たなかさんはもうきているはずです。', english: 'Mr. Tanaka should already be here.', nepali: 'तानाका-जी पहिले नै आइसक्नुपर्ने हो।' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 47,
    lessonTitle: 'Hearsay 〜そうです (伝聞) / According to 〜によると',
    grammarPoints: [
      {
        title: '1. Hearsay 〜そうです (伝聞 Reported Speech)',
        pattern: '[Plain form] + そうです',
        explanationEnglish: '〜そうです (hearsay) indicates the speaker heard or read information from an external source. Different from appearance-based 〜そう.',
        explanationNepali: '〜そうです (सुनेको कुरा) ले वक्ताले अरूबाट सुनेको वा पढेको कुरा जनाउँछ। दृश्यमा आधारित 〜そう भन्दा फरक।',
        examples: [
          { target: '天気予報によると、明日は雪が降るそうです。', reading: 'てんきよほうによると、あしたはゆきがふるそうです。', english: 'According to the weather forecast, it will snow tomorrow.', nepali: 'मौसम भविष्यवाणी अनुसार भोलि हिउँ पर्ने रे।' },
        ]
      },
      {
        title: '2. According to 〜によると',
        pattern: '[Source] + によると、[Reported info] + そうです/らしい',
        explanationEnglish: '〜によると introduces the source of information ("According to ~"). Usually followed by 〜そうです or 〜らしい.',
        explanationNepali: '〜によると ले जानकारीको स्रोत बताउँछ ("~ अनुसार")। प्रायः 〜そうです वा 〜らしい पछि आउँछ।',
        examples: [
          { target: 'ニュースによると、大きな地震があったそうです。', reading: 'ニュースによると、おおきなじしんがあったそうです。', english: 'According to the news, there was a big earthquake.', nepali: 'समाचार अनुसार, ठूलो भूकम्प गएको रे।' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 48,
    lessonTitle: 'Causative Form 使役形 〜させる (Make / Let)',
    grammarPoints: [
      {
        title: '1. Causative Form 使役形',
        pattern: 'Gr.1: く→かせる (書かせる) | Gr.2: る→させる (食べさせる) | する→させる | くる→こさせる',
        explanationEnglish: 'The causative form expresses making or letting someone do something. The agent of the action is marked by に (if forced) or を (if allowed).',
        explanationNepali: 'प्रेरणार्थक रूपले कसैलाई केही गराउनु वा गर्न दिनु जनाउँछ। जबरजस्ती हो भने に, स्वतन्त्रता दिनु हो भने を।',
        examples: [
          { target: '子供に部屋を掃除させました。', reading: 'こどもにへやをそうじさせました。', english: 'I made my child clean the room.', nepali: 'बच्चालाई कोठा सफा गराएँ।' },
          { target: '好きな科目を勉強させてあげます。', reading: 'すきなかもくをべんきょうさせてあげます。', english: 'I will let you study the subject you like.', nepali: 'मन पर्ने विषय पढ्न दिन्छु।' },
        ]
      },
      {
        title: '2. Requesting Permission 〜させてください',
        pattern: '[Verb させ] + てください',
        explanationEnglish: '〜させてください is used to politely request permission to do something yourself.',
        explanationNepali: '〜させてください ले आफूले केही गर्न अनुमति माग्दा विनम्र रूपमा प्रयोग हुन्छ।',
        examples: [
          { target: '少し考えさせてください。', reading: 'すこしかんがえさせてください。', english: 'Please let me think for a moment.', nepali: 'अलि सोच्न दिनुस् त।' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 49,
    lessonTitle: 'Honorific Keigo 尊敬語 (Respectful Language)',
    grammarPoints: [
      {
        title: '1. Honorific Verbs 尊敬語',
        pattern: 'いる→いらっしゃる | 言う→おっしゃる | する→なさる | 食べる/飲む→めしあがる | 知る→ご存知',
        explanationEnglish: 'Honorific language (sonkeigo) elevates the listener\'s actions to show respect. Special verbs replace ordinary verbs when describing what a superior does.',
        explanationNepali: 'सम्मानार्थी भाषा (सोन्केइगो) ले सुन्नेको कार्यलाई आदरसहित व्यक्त गर्छ। सामान्य क्रियाको ठाउँमा विशेष क्रिया प्रयोग हुन्छ।',
        examples: [
          { target: '部長はもうお帰りになりましたか。', reading: 'ぶちょうはもうおかえりになりましたか。', english: 'Has the department manager already gone home?', nepali: 'विभाग प्रमुख पहिले नै घर फर्किनुभयो?' },
          { target: '社長は何とおっしゃいましたか。', reading: 'しゃちょうはなんとおっしゃいましたか。', english: 'What did the company president say?', nepali: 'अध्यक्षले के भन्नुभयो?' },
        ]
      },
      {
        title: '2. Honorific Pattern お〜になります',
        pattern: 'お + [Verb ます-stem] + になります',
        explanationEnglish: 'The お〜になります pattern is a productive honorific pattern that can be used with many verbs to show respect toward the listener\'s actions.',
        explanationNepali: 'お〜になります ढाँचा धेरै क्रियाहरूसँग प्रयोग हुन सक्ने उत्पादक आदरार्थी ढाँचा हो।',
        examples: [
          { target: '社長はもうお着きになりましたか。', reading: 'しゃちょうはもうおつきになりましたか。', english: 'Has the president already arrived?', nepali: 'अध्यक्ष पहिले नै आइपुग्नुभयो?' },
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 50,
    lessonTitle: 'Humble Keigo 謙譲語 (Self-Lowering Language)',
    grammarPoints: [
      {
        title: '1. Humble Verbs 謙譲語',
        pattern: 'する→いたす | 行く/来る→参る | 言う→申す | いる→おる | もらう→いただく | あげる→さしあげる | 見る→拝見する | 知る→存じる',
        explanationEnglish: 'Humble language (kenjougo) lowers the speaker\'s own actions to elevate the listener. Used when describing what YOU do for a superior.',
        explanationNepali: 'नम्र भाषा (केन्जोउगो) ले वक्ताको आफ्नै कार्यलाई सानो देखाएर सुन्नेलाई आदर दर्साउँछ। आफूले ठूलाका लागि गर्ने काम बताउँदा प्रयोग।',
        examples: [
          { target: '私が会場までご案内いたします。', reading: 'わたしがかいじょうまでごあんないいたします。', english: 'I will guide you to the venue (humble).', nepali: 'म तपाईंलाई कार्यक्रमस्थलसम्म लैजान्छु (विनम्र)।' },
          { target: '田中と申します。よろしくお願いいたします。', reading: 'たなかともうします。よろしくおねがいいたします。', english: 'My name is Tanaka. Pleased to meet you (humble).', nepali: 'मेरो नाम तानाका हो। सहयोगको अपेक्षा गर्छु (विनम्र)।' },
        ]
      },
      {
        title: '2. Humble Pattern お〜します',
        pattern: 'お + [Verb ます-stem] + します',
        explanationEnglish: 'The お〜します pattern is the humble counterpart of お〜になります. It describes the speaker\'s actions toward the listener humbly.',
        explanationNepali: 'お〜します ढाँचा お〜になります को विनम्र प्रतिरूप हो। वक्ताले सुन्नेका लागि गर्ने काम नम्रतासाथ वर्णन गर्छ।',
        examples: [
          { target: 'お荷物をお持ちします。', reading: 'おにもつをおもちします。', english: 'I will carry your luggage for you.', nepali: 'म तपाईंको सामान बोक्छु (विनम्र)।' },
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // N3 (Lesson 51)
  // ─────────────────────────────────────────────
  {
    language: 'JAPANESE', level: 'N3', lesson: 51,
    lessonTitle: 'Strong Certainty 〜に違いない / Expectation 〜はずだ',
    grammarPoints: [
      {
        title: '1. Strong Certainty 〜に違いない',
        pattern: '[Plain Verb / Adj / Noun] + に違いない',
        explanationEnglish: 'Used when the speaker is strongly convinced that something is true without a doubt based on evidence or reasoning.',
        explanationNepali: 'प्रमाण वा तर्कका आधारमा "नक्की हो / अवश्य हो" भन्ने दृढ विश्वास व्यक्त गर्दा प्रयोग।',
        examples: [
          { target: '彼は犯人に違いない。', reading: 'かれははんにんにちがいない。', english: 'He must be the culprit.', nepali: 'उ नै दोषी हुनुपर्छ।' },
        ]
      }
    ]
  }
];

// ────────────────────────────────────────────────────────────
// KOREAN GRAMMAR LESSONS
// ────────────────────────────────────────────────────────────
export const KOREAN_GRAMMAR_GUIDES: LessonGrammarGuide[] = [
  {
    language: 'KOREAN', level: 'EPS', lesson: 1,
    lessonTitle: 'Greetings & Formal Identity (인사말과 N은/는 N입니다)',
    grammarPoints: [
      {
        title: '1. Formal Identity Ending 입니다',
        pattern: '[Noun 1]은/는 [Noun 2]입니다',
        explanationEnglish: '은/는 is the topic particle. 입니다 (imnida) is the formal polite copula meaning "is/am/are".',
        explanationNepali: '은/는 ले विषय जनाउँछ। 입니다 (इम्निदा) ले "हो/हुँ" औपचारिक रूपमा जनाउँछ।',
        examples: [
          { target: '저는 라젠드라입니다.', reading: 'Jeoneun Rajendra-imnida.', english: 'I am Rajendra.', nepali: 'म राजेन्द्र हुँ।' },
        ]
      }
    ]
  }
];

// Dynamic fallback generator — NEVER returns Lesson 1 for wrong lesson
function generateFallbackGrammarGuide(language: 'JAPANESE' | 'KOREAN', level: string, lesson: number): LessonGrammarGuide {
  if (language === 'JAPANESE') {
    return {
      language: 'JAPANESE',
      level,
      lesson,
      lessonTitle: `Lesson ${lesson} Grammar Rules (文法ポイント)`,
      grammarPoints: [
        {
          title: `1. Lesson ${lesson} Key Grammar Structure`,
          pattern: `[Lesson ${lesson} Sentence Pattern]`,
          explanationEnglish: `Grammar rules and sentence structures introduced in Minna no Nihongo Lesson ${lesson} for ${level} level.`,
          explanationNepali: `पाठ ${lesson} का मुख्य व्याकरण नियम र वाक्य संरचना (JLPT ${level} स्तर)।`,
          examples: [
            {
              target: `第${lesson}課の文法をしっかり勉強しましょう。`,
              reading: `だい${lesson}かのぶんぽうをしっかりべんきょうしましょう。`,
              english: `Let's study the grammar of Lesson ${lesson} thoroughly.`,
              nepali: `पाठ ${lesson} को व्याकरण राम्ररी अध्ययन गरौँ।`
            }
          ]
        }
      ]
    };
  } else {
    return {
      language: 'KOREAN',
      level,
      lesson,
      lessonTitle: `Lesson ${lesson} Korean Grammar (한국어 문법)`,
      grammarPoints: [
        {
          title: `1. EPS Lesson ${lesson} Key Grammar`,
          pattern: `[Lesson ${lesson} Korean Structure]`,
          explanationEnglish: `Grammar rules and sentence endings for EPS-TOPIK Lesson ${lesson}.`,
          explanationNepali: `इपिएस-टपिक पाठ ${lesson} को मुख्य व्याकरण नियम।`,
          examples: [
            {
              target: `오늘 ${lesson}과 문법을 배웁니다.`,
              reading: `Oneul ${lesson}-gwa munbeob-eul baeumnida.`,
              english: `Today we learn the grammar of Lesson ${lesson}.`,
              nepali: `आज पाठ ${lesson} को व्याकरण सिक्छौँ।`
            }
          ]
        }
      ]
    };
  }
}

export function getGrammarGuide(language: 'JAPANESE' | 'KOREAN', level: string, lesson: number): LessonGrammarGuide {
  const dataset = language === 'JAPANESE' ? JAPANESE_GRAMMAR_GUIDES : KOREAN_GRAMMAR_GUIDES;

  // Strict match: same level AND same lesson
  const exactMatch = dataset.find(g => g.level === level && g.lesson === lesson);
  if (exactMatch) return exactMatch;

  // Lesson-only match (different level label but same lesson)
  const lessonMatch = dataset.find(g => g.lesson === lesson);
  if (lessonMatch) return lessonMatch;

  // Always dynamically generate — NEVER fall back to Lesson 1
  return generateFallbackGrammarGuide(language, level, lesson);
}
