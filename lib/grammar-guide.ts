// ============================================================
// GRAMMAR GUIDE DATASET (JAPANESE & KOREAN)
// Complete N5 (Lessons 1-25) & N4 (Lessons 26-50) Handbook
// ============================================================
import { N5_GRAMMAR_GUIDES } from './n5-grammar-guides';
import { EPS_60_LESSONS_GRAMMAR } from './korean-eps-syllabus-grammar';

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
// JAPANESE — JLPT N5 (Lessons 1 to 25 Complete)
// ────────────────────────────────────────────────────────────
export const JAPANESE_GRAMMAR_GUIDES: LessonGrammarGuide[] = [
  ...N5_GRAMMAR_GUIDES,

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
    lessonTitle: 'Lesson 27 – Potential Form (可能形)',
    grammarPoints: [
      {
        title: '1. Potential Form Conjugation (可能形)',
        pattern: 'Gr.1: う → え+る (書く→書ける) | Gr.2: る → られる (食べる→食べられる) | Irreg: する→できる, 来る→来られる',
        explanationEnglish: 'The potential form expresses ability or possibility. Group 1 (う-verbs): Change final う sound to え sound + る. Group 2 (る-verbs): Replace る with られる. Irregular: する→できる, 来る→来られる.',
        explanationNepali: 'सम्भावना स्वरूप (可能形) ले क्षमता वा सम्भावना व्यक्त गर्दछ। समूह-१: अन्तिम う ध्वनिलाई え + る मा परिवर्तन गरिन्छ। समूह-२: る को ठाउँमा られる राखिन्छ। अनियमित: する→できる, 来る→来られる।',
        examples: [
          { target: '私は日本語が話せます。', reading: 'わたしはにほんごがはなせます。', english: 'I can speak Japanese.', nepali: 'म जापानी बोल्न सक्छु।' },
          { target: '漢字が読めます。', reading: 'かんじがよめます。', english: 'I can read Kanji.', nepali: 'म काञ्जी पढ्न सक्छु।' },
          { target: '車が運転できます。', reading: 'くるまがうんてんできます。', english: 'I can drive a car.', nepali: 'म गाडी चलाउन सक्छु।' },
          { target: '今日は来られません。', reading: 'きょうはこられません。', english: 'I cannot come today.', nepali: 'म आज आउन सक्दिनँ।' }
        ]
      },
      {
        title: '2. Potential Sentence Pattern (N が Potential Verb)',
        pattern: '[Subject] は [Noun] が [Potential Verb]',
        explanationEnglish: 'The particle が is used to mark the object of ability with potential verbs (instead of を).',
        explanationNepali: 'सम्भावना क्रियामा कर्मलाई जनाउन を को सट्टा が प्रत्यय प्रयोग गरिन्छ।',
        examples: [
          { target: '私は泳げます。', reading: 'わたしはおよげます。', english: 'I can swim.', nepali: 'म पौड्न सक्छु।' },
          { target: '私は泳げません。', reading: 'わたしはおよげません。', english: 'I cannot swim.', nepali: 'म पौड्न सक्दिनँ।' }
        ]
      },
      {
        title: '3. Expressing Possibility vs Permission',
        pattern: 'Possibility: 見える / 見られる / 入れます vs Permission: 入ってもいいです',
        explanationEnglish: '見える / 見られる express visible possibility (e.g. You can see Mt. Fuji from here). Do not confuse potential form (入れます = can enter) with permission (入ってもいいです = may enter).',
        explanationNepali: 'देखिने वा प्रवेश गर्न सकिने सम्भावना व्यक्त गर्दछ। अनुमति (入ってもいいです) र क्षमता (入れます) मा भिन्नता हुन्छ।',
        examples: [
          { target: 'ここから富士山が見えます。', reading: 'ここからふじさんがみえます。', english: 'You can see Mt. Fuji from here.', nepali: 'यहाँबाट फुजि पर्वत देखिन्छ।' },
          { target: 'ここから中に入れます。', reading: 'ここからなかにいれます。', english: 'You can enter inside from here.', nepali: 'यहाँबाट भित्र छिर्न सकिन्छ।' }
        ]
      }
    ]
  },

  {
    language: 'JAPANESE', level: 'N4', lesson: 28,
    lessonTitle: 'Lesson 28 – Simultaneous Actions 〜ながら & Multiple Reasons 〜し〜し',
    grammarPoints: [
      {
        title: '1. Simultaneous Action (〜ながら)',
        pattern: '[Verb ます-stem] + ながら + [Main Verb]',
        explanationEnglish: '〜ながら connects two actions occurring simultaneously by the same subject. The main/primary action is expressed by the second verb.',
        explanationNepali: '〜ながら ले एउटै व्यक्तिले एकैसाथ दुईवटा काम गरिरहेको जनाउँछ। मुख्य काम दोस्रो क्रियामा हुन्छ।',
        examples: [
          { target: '音楽を聞きながら勉強します。', reading: 'おんがくをききながらべんきょうします。', english: 'I study while listening to music.', nepali: 'सङ्गीत सुन्दै पढ्छु।' },
          { target: '歩きながらスマホを見ないでください。', reading: 'あるきながらスマホをみないでください。', english: 'Please do not look at your smartphone while walking.', nepali: 'हिँड्दै स्मार्टफोन नहेर्नुस्।' }
        ]
      },
      {
        title: '2. Habitual Action (〜ています)',
        pattern: '[Verb て-form] + います',
        explanationEnglish: '〜ています describes a continuous habit, routine, or repeated behavior over a long period.',
        explanationNepali: '〜ています ले लामो समयसम्म निरन्तर गरिने बानी वा नियमित दिनचर्या व्यक्त गर्दछ।',
        examples: [
          { target: '毎朝ジョギングをしています。', reading: 'まいあさジョギングをしています。', english: 'I go jogging every morning.', nepali: 'म हरेक बिहान जोगिङ गर्छु।' }
        ]
      },
      {
        title: '3. Listing Reasons (〜し、〜し、)',
        pattern: '[Plain form] し、[Plain form] し、[Conclusion]',
        explanationEnglish: '〜し lists multiple reasons or supporting arguments for a situation or conclusion.',
        explanationNepali: '〜し ले धेरै कारणहरू र तर्कहरू सूचीबद्ध गर्दछ।',
        examples: [
          { target: 'この町は静かだし、空気もいいし、大好きです。', reading: 'このまちはしずかだし、くうきもいいし、だいすきです。', english: 'This town is quiet, the air is clean, so I love it.', nepali: 'यो सहर शान्त छ, हावा पनि सफा छ, त्यसैले मलाई ज्यादै मन पर्छ।' }
        ]
      }
    ]
  },
  {
    language: 'JAPANESE', level: 'N4', lesson: 29,
    lessonTitle: 'Lesson 29 – Resulting State 〜ています & Regret 〜てしまいました',
    grammarPoints: [
      {
        title: '1. Intransitive Verbs Resulting State (N が Intransitive V-て います)',
        pattern: '[Noun] が [Intransitive Verb て-form] ＋ います',
        explanationEnglish: 'Describes a state or condition that remains after an event occurs (e.g. The door is open, the window is broken). Notice particle が is used.',
        explanationNepali: 'कुनै घटनापछि कायम रहेको अवस्था वा स्थिति दर्शाउँछ (जस्तै: ढोका खोलिएको छ, झ्याल बिग्रिएको छ)।',
        examples: [
          { target: 'ドアが開いています。', reading: 'ドアがあいています。', english: 'The door is open.', nepali: 'ढोका खोलिएको छ।' },
          { target: '電気についています。', reading: 'でんきについています。', english: 'The light is on.', nepali: 'बत्ती बलिरहेको छ।' },
          { target: '茶碗が割れています。', reading: 'ちゃわんがわれています。', english: 'The rice bowl is broken.', nepali: 'कटोरा फुटेको छ।' }
        ]
      },
      {
        title: '2. Completion of Action (〜てしまいました / 〜てしまう)',
        pattern: '[Verb て-form] ＋ しまいました',
        explanationEnglish: '1) Expresses that an action has been completely finished. 2) Expresses regret, mistake, or an unintended unfortunate result.',
        explanationNepali: '१) कुनै काम पूर्ण रूपमा सकियो भन्ने जनाउँछ। २) पश्चात्ताप, गल्ती वा नसोचेको नराम्रो परिणाम व्यक्त गर्दछ।',
        examples: [
          { target: '宿題を全部やってしまいました。', reading: 'しゅくだいをぜんぶやってしまいました。', english: 'I have finished all my homework.', nepali: 'गृहकार्य सबै सकेँ।' },
          { target: 'パスポートを落としてしまいました。', reading: 'パスポートをおとしてしまいました。', english: 'I accidentally dropped my passport!', nepali: 'राहदानी खसालेछौँ (दूःखको कुरा)!' }
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

  // ════════════════════════════════════════════════════════
  // N3 COMPLETE — LESSONS 51 TO 60
  // ════════════════════════════════════════════════════════
  {
    "language": "JAPANESE",
    "level": "N3",
    "lesson": 60,
    "lessonTitle": "Representation & Evaluation 〜をはじめとして / 〜に応えて",
    "grammarPoints": [
      {
        "title": "1. Representative Example 〜をはじめとして",
        "pattern": "[Noun] + をはじめ（として）",
        "explanationEnglish": "Means 'starting with / including above all'.",
        "explanationNepali": "~ लाई मुख्य उदाहरण मान्दै।",
        "examples": [
          {
            "target": "社長をはじめ、スタッフ全員に感謝します。",
            "reading": "しゃちょうをはじめ、すたっふぜんいんにかんしゃします。",
            "english": "I thank everyone, starting with the president.",
            "nepali": "अध्यक्षज्यू लगायत सम्पूर्ण कर्मचारी टोलीलाई धन्यवाद दिन्छु。"
          }
        ]
      },
      {
        "title": "2. In Response To 〜に応えて",
        "pattern": "[Noun] + にこたえて",
        "explanationEnglish": "Means 'in response to / answering (expectations, requests)'.",
        "explanationNepali": "~ को माग वा अपेक्षाको सम्बोधन गर्दै।",
        "examples": [
          {
            "target": "ファンの期待に応えて素晴らしい演奏をした。",
            "reading": "ふぁんのきたいにこたえてすばらしいえんそうをした。",
            "english": "Performed wonderfully in response to fans' expectations.",
            "nepali": "प्रशंसकहरूको अपेक्षा बमोजिम उत्कृष्ट प्रस्तुति दिइयो。"
          }
        ]
      }
    ]
  },

  // ════════════════════════════════════════════════════════
  // N3 MASTER SYLLABUS GRAMMAR GUIDES (CHAPTERS 1-12)
  // ════════════════════════════════════════════════════════
  {
    "language": "JAPANESE",
    "level": "N3",
    "lesson": 51,
    "lessonTitle": "Chapter 1: Introducing Yourself & Daily Routines (自己紹介・日常生活)",
    "grammarPoints": [
      {
        "title": "1. While a state lasts 〜うちに",
        "pattern": "[Verb dictionary / Adj / Nの] + うちに",
        "explanationEnglish": "Doing something while a current condition lasts, before it changes.",
        "explanationNepali": "कुनै अवस्था कायम रहँदै गर्दा (परिवर्तन हुनुअघि) काम गर्नु।",
        "examples": [
          {
            "target": "若いうちに、いろいろな経験をしたい。",
            "reading": "わかいうちに、いろいろなけいけんをしたい。",
            "english": "While I am young, I want to gain various experiences.",
            "nepali": "जवान छँदै अनेकौँ अनुभव हासिल गर्न चाहन्छु।"
          }
        ]
      },
      {
        "title": "2. As soon as / The moment 〜た途端",
        "pattern": "[Verb た-form] + 途端（に）",
        "explanationEnglish": "Just at the moment something happened, an unexpected event occurred.",
        "explanationNepali": "बित्तिकै / त्यही क्षण (अप्रत्याशित घटना हुनु)।",
        "examples": [
          {
            "target": "窓を開けた途端、強い風が入ってきた。",
            "reading": "まどをあけたとたん、つよいかぜがはいってきた。",
            "english": "The moment I opened the window, a strong wind blew in.",
            "nepali": "झ्याल खोल्ने बित्तिकै बलियो हावा भित्र आयो।"
          }
        ]
      },
      {
        "title": "3. Turning point 〜をきっかけに",
        "pattern": "[Noun / Verbの] + をきっかけに（して）",
        "explanationEnglish": "Using an event as a trigger or turning point to start something new.",
        "explanationNepali": "~ लाई अवसर/मोड बनाएर (नयाँ कुरा सुरुवात गर्नु)।",
        "examples": [
          {
            "target": "日本のアニメを見たのをきっかけに、日本語の勉強を始めた。",
            "reading": "にほんのあにめをみたのをきっかけに、にほんごのべんきょうをはじめた。",
            "english": "Triggered by watching Japanese anime, I started studying Japanese.",
            "nepali": "जापानी एनिमे हेरेको अवसरलाई मोड बनाएर जापानी भाषा पढ्न थालेँ।"
          }
        ]
      },
      {
        "title": "4. In the middle of 〜最中に",
        "pattern": "[Verb ている / Nの] + 最中に",
        "explanationEnglish": "Right in the middle of doing an action when an interruption happens.",
        "explanationNepali": "कुनै काम गरिरहेकै मध्य समयमा (बाधा पर्नु)।",
        "examples": [
          {
            "target": "食事の最中に電話がかかってきた。",
            "reading": "しょくじのさいちゅうにでんわがかかってきた。",
            "english": "A phone call came right in the middle of a meal.",
            "nepali": "खाना खाइरहेकै बेला फोन आयो।"
          }
        ]
      }
    ]
  },
  {
    "language": "JAPANESE",
    "level": "N3",
    "lesson": 52,
    "lessonTitle": "Chapter 2: Shopping, Consumer Habits & Housing (買い物・住居)",
    "grammarPoints": [
      {
        "title": "1. Contrast / Towards 〜に対して",
        "pattern": "[Noun / Plain form] + に対して",
        "explanationEnglish": "In contrast to A, B is different; or directed towards an object/person.",
        "explanationNepali": "~ को तुलनामा / ~ प्रति।",
        "examples": [
          {
            "target": "兄が活発なのに対して、弟は大人しい。",
            "reading": "あにがかっぱつなのに対して、おとうとはおとなしい。",
            "english": "In contrast to his active elder brother, the younger brother is quiet.",
            "nepali": "दाइ चञ्चल भएको तुलनामा भाइ शान्त छ।"
          }
        ]
      },
      {
        "title": "2. Standpoint 〜にとって",
        "pattern": "[Noun] + にとって",
        "explanationEnglish": "From the standpoint of someone ('for... / from the perspective of').",
        "explanationNepali": "~ का लागि / ~ को दृष्टिकोणबाट।",
        "examples": [
          {
            "target": "私にとって、家族が一番大切だ。",
            "reading": "わたしにとって、かぞくがいちばんたいせつだ。",
            "english": "For me, family is the most important.",
            "nepali": "मेरो लागि परिवार नै सबैभन्दा महत्त्वपूर्ण हो।"
          }
        ]
      },
      {
        "title": "3. Regarding 〜に関する / 〜に関して",
        "pattern": "[Noun] + に関して / に関する [Noun]",
        "explanationEnglish": "About / regarding a specific topic or field of study.",
        "explanationNepali": "~ को बारेमा / ~ सँग सम्बन्धित।",
        "examples": [
          {
            "target": "環境問題に関する記事を読む。",
            "reading": "かんきょうもんだいにかんするきじをよむ。",
            "english": "Read an article regarding environmental issues.",
            "nepali": "वातावरणीय समस्यासम्बन्धी लेख पढ्नु।"
          }
        ]
      },
      {
        "title": "4. Surrounding an Issue 〜をめぐって",
        "pattern": "[Noun] + をめぐって",
        "explanationEnglish": "Concerning / over a dispute, debate, or rumor among multiple people.",
        "explanationNepali": "~ को विवाद वा विषयलाई लिएर।",
        "examples": [
          {
            "target": "遺産の分配をめぐって兄弟が争った。",
            "reading": "いさんのぶんぱいをめぐってきょうだいがあらそった。",
            "english": "Brothers fought over the distribution of the inheritance.",
            "nepali": "सम्पत्ति बाँडफाँडको विषयलाई लिएर दाजुभाइ झगडा गरे।"
          }
        ]
      }
    ]
  },
  {
    "language": "JAPANESE",
    "level": "N3",
    "lesson": 53,
    "lessonTitle": "Chapter 3: Visiting Friends & School Life (訪問・学校生活)",
    "grammarPoints": [
      {
        "title": "1. Formal Setting Location 〜において",
        "pattern": "[Noun] + において（は）",
        "explanationEnglish": "In / at / on (formal marker for location, era, or field).",
        "explanationNepali": "~ मा / ~ को क्षेत्रमा (औपचारिक स्थान/अवधि)।",
        "examples": [
          {
            "target": "現代社会において、インターネットは不可欠だ。",
            "reading": "げんだいしゃかいにおいて、インターネットはふかけつだ。",
            "english": "In modern society, the internet is indispensable.",
            "nepali": "आधुनिक समाजमा इन्टरनेट अपरिहार्य छ।"
          }
        ]
      },
      {
        "title": "2. Based On 〜に基づいて",
        "pattern": "[Noun] + に基づいて",
        "explanationEnglish": "Based on data, facts, laws, or principles.",
        "explanationNepali": "~ को आधारमा / ~ अनुसार।",
        "examples": [
          {
            "target": "事実に基づいて報告書を作成した。",
            "reading": "じじつにもとづいてほうこくしょをさくせいした。",
            "english": "Created the report based on facts.",
            "nepali": "तथ्यको आधारमा प्रतिवेदन तयार गरियो।"
          }
        ]
      },
      {
        "title": "3. Through / Throughout 〜を通じて / 〜を通して",
        "pattern": "[Noun] + を通じて / を通して",
        "explanationEnglish": "Through the medium of; or throughout an entire time period.",
        "explanationNepali": "~ को माध्यमबाट / ~ भरि।",
        "examples": [
          {
            "target": "友だちを通じて彼と知り合った。",
            "reading": "ともだちをつうじてかれとしりあった。",
            "english": "Got to know him through a friend.",
            "nepali": "साथीको माध्यमबाट उहाँसँग चिनजान भयो।"
          }
        ]
      },
      {
        "title": "4. In Response To 〜に応じて",
        "pattern": "[Noun] + に応じて",
        "explanationEnglish": "Depending on / in response to changes in situation or request.",
        "explanationNepali": "~ को आवश्यकता वा माग अनुसार।",
        "examples": [
          {
            "target": "予算に応じてプランを選べます。",
            "reading": "よさんにおうじてプランをえらべます。",
            "english": "You can choose a plan depending on your budget.",
            "nepali": "बजेट अनुसार योजना रोज्न सक्नुहुन्छ।"
          }
        ]
      }
    ]
  },
  {
    "language": "JAPANESE",
    "level": "N3",
    "lesson": 54,
    "lessonTitle": "Chapter 4: Dining Out & Culinary Culture (外食・料理)",
    "grammarPoints": [
      {
        "title": "1. Instead of 〜代わりに",
        "pattern": "[Verb plain / Nの] + 代わりに",
        "explanationEnglish": "Instead of doing something, or in exchange for something.",
        "explanationNepali": "~ को सट्टामा।",
        "examples": [
          {
            "target": "コーヒーの代わりに、お茶を飲む。",
            "reading": "コーヒーのかわりに、おちゃをのむ。",
            "english": "Drink tea instead of coffee.",
            "nepali": "कफीको सट्टामा चिया पिउनु।"
          }
        ]
      },
      {
        "title": "2. Without 〜ぬきで / 〜ぬきにして",
        "pattern": "[Noun] + ぬきで / ぬきにして",
        "explanationEnglish": "Without / leaving out an element.",
        "explanationNepali": "~ बिना / ~ लाई छोडेर।",
        "examples": [
          {
            "target": "わさびぬきで寿司を注文した。",
            "reading": "わさびぬきですしをちゅうもんした。",
            "english": "Ordered sushi without wasabi.",
            "nepali": "वासाबी बिना सुशी अर्डर गरियो।"
          }
        ]
      },
      {
        "title": "3. On the other hand 〜反面",
        "pattern": "[Plain form] + 反面",
        "explanationEnglish": "On one hand A, but on the other hand B (contrasting aspect).",
        "explanationNepali": "एकातिर ~ तर अर्कातिर ~।",
        "examples": [
          {
            "target": "便利である反面、危険も伴う。",
            "reading": "べんりであるはんめん、きけんもともなう。",
            "english": "While convenient, it also carries risks.",
            "nepali": "सुविधाजनक हुनुका साथै खतरा पनि जोडिएको छ।"
          }
        ]
      },
      {
        "title": "4. On one hand... while... 〜一方（で）",
        "pattern": "[Plain form] + 一方で",
        "explanationEnglish": "While one situation develops, another situation exists simultaneously.",
        "explanationNepali": "एकातिर ~ हुँदा उस्तै समयमा अर्कातिर ~।",
        "examples": [
          {
            "target": "都市の開発が進む一方で、自然が失われている。",
            "reading": "と知のかいはつがすすむいっぽうで、しぜんがうしなわれている。",
            "english": "While urban development progresses, nature is being lost.",
            "nepali": "सहरको विकास भइरहँदा अर्कातिर प्रकृति नासिँदैछ।"
          }
        ]
      }
    ]
  },
  {
    "language": "JAPANESE",
    "level": "N3",
    "lesson": 55,
    "lessonTitle": "Chapter 5: Physical Health & Medical Care (健康・医療)",
    "grammarPoints": [
      {
        "title": "1. Purpose / Reason 〜ために",
        "pattern": "[Verb dict / Nの] + ために",
        "explanationEnglish": "For the purpose of; or because of (reason).",
        "explanationNepali": "~ को लागि / ~ को कारणले।",
        "examples": [
          {
            "target": "健康のために、毎日運動している。",
            "reading": "けんこうのために、まいにちうんどうしている。",
            "english": "I exercise every day for my health.",
            "nepali": "स्वास्थ्यको लागि म रोज व्यायाम गर्छु।"
          }
        ]
      },
      {
        "title": "2. By means of / Due to 〜によって / 〜により",
        "pattern": "[Noun] + によって / により",
        "explanationEnglish": "Indicates cause, means, or agent of an action.",
        "explanationNepali": "~ द्वारा / ~ को कारणले।",
        "examples": [
          {
            "target": "台風によって、木が倒れた。",
            "reading": "たいふうによって、きがたおれた。",
            "english": "Due to the typhoon, trees collapsed.",
            "nepali": "आँधीको कारणले रूख ढल्यो।"
          }
        ]
      },
      {
        "title": "3. Thanks to (Positive) 〜おかげで",
        "pattern": "[Plain form / Nの] + おかげで",
        "explanationEnglish": "Expresses appreciation for a positive outcome.",
        "explanationNepali": "~ को कृपाले (राम्रो नतिजा)।",
        "examples": [
          {
            "target": "薬のおかげで、熱が下がった。",
            "reading": "くすりのおかげで、ねつがさがった。",
            "english": "Thanks to the medicine, the fever went down.",
            "nepali": "औषधिको कृपाले जोरो घट्यो।"
          }
        ]
      },
      {
        "title": "4. Blame / Due to (Negative) 〜せいで",
        "pattern": "[Plain form / Nの] + せいで",
        "explanationEnglish": "Blames a cause for a bad result.",
        "explanationNepali": "~ को दोषले / कारणले (नराम्रो नतिजा)।",
        "examples": [
          {
            "target": "寝不足のせいで、頭が痛い。",
            "reading": "ねぶそくのせいで、あたまがいたい。",
            "english": "Because of lack of sleep, I have a headache.",
            "nepali": "निद्रा नपुगेको कारणले टाउको दुखेको छ।"
          }
        ]
      }
    ]
  },
  {
    "language": "JAPANESE",
    "level": "N3",
    "lesson": 56,
    "lessonTitle": "Chapter 6: Town Announcements & Transport (街のアナウンス・交通)",
    "grammarPoints": [
      {
        "title": "1. Strong Resolve 〜からには",
        "pattern": "[Verb plain] + からには",
        "explanationEnglish": "Now that / since (expressing strong determination or responsibility).",
        "explanationNepali": "~ भइसकेपछि त (दृढ सङ्कल्प)।",
        "examples": [
          {
            "target": "引き受けたからには、最後までやり遂げる。",
            "reading": "ひきうけたからには、さいごまでやりとげる。",
            "english": "Now that I've accepted it, I will accomplish it to the end.",
            "nepali": "जिम्मेवारी लिइसकेपछि त अन्त्यसम्म पूरा गर्नेछु।"
          }
        ]
      },
      {
        "title": "2. Duty / Intent 〜以上（は）",
        "pattern": "[Plain form] + 以上（は）",
        "explanationEnglish": "Seeing that / since (implying natural duty or expectation).",
        "explanationNepali": "~ भइसकेको अवस्थामा (कर्तव्य र दायित्व)।",
        "examples": [
          {
            "target": "約束した以上は、守らなければならない。",
            "reading": "やくそくしたいじょうは、まもらなければならない。",
            "english": "Since I promised, I must keep it.",
            "nepali": "वाचा गरिसकेको अवस्थामा पालना गर्नैपर्छ।"
          }
        ]
      },
      {
        "title": "3. Formal Since 〜上は",
        "pattern": "[Verb た-form / dict] + 上は",
        "explanationEnglish": "Highly formal marker meaning 'now that / since'.",
        "explanationNepali": "~ भइसकेको हुँदा (अत्यन्त औपचारिक)।",
        "examples": [
          {
            "target": "試験を受ける上は、全力を尽くす。",
            "reading": "しけんをうけるうえは、ぜんりょくをつくす。",
            "english": "Now that I am taking the exam, I will do my best.",
            "nepali": "परीक्षा दिने भइसकेपछि पूर्ण शक्ति लगाउनेछु।"
          }
        ]
      },
      {
        "title": "4. Sole Condition 〜さえ〜ば",
        "pattern": "[Noun] + さえ + [Verb ば-form]",
        "explanationEnglish": "If only... then everything else will be fine.",
        "explanationNepali": "केवल ~ मात्र भइदिए पुग्छ।",
        "examples": [
          {
            "target": "体さえ丈夫なら、何でもできる。",
            "reading": "からださえじょうぶなら、なんでもできる。",
            "english": "If only your body is strong, you can do anything.",
            "nepali": "शरीर मात्र बलियो भइदिए जे पनि गर्न सकिन्छ।"
          }
        ]
      }
    ]
  },
  {
    "language": "JAPANESE",
    "level": "N3",
    "lesson": 57,
    "lessonTitle": "Chapter 7: Festivals, Events & Local Traditions (祭り・行事)",
    "grammarPoints": [
      {
        "title": "1. Left Running / Messy 〜っぱなし",
        "pattern": "[Verb stem] + っぱなし",
        "explanationEnglish": "Leaving something in an unfinished or messy state.",
        "explanationNepali": "~ यत्तिकै छाडिदिनु (लापरवाहीपूर्वक)।",
        "examples": [
          {
            "target": "電気をつけっぱなしで寝てしまった。",
            "reading": "でんきをつけっぱなしでねてしまった。",
            "english": "I fell asleep with the lights left on.",
            "nepali": "बत्ती यत्तिकै बालेर सुतेछु।"
          }
        ]
      },
      {
        "title": "2. Full of / Covered in 〜だらけ",
        "pattern": "[Noun] + だらけ",
        "explanationEnglish": "Covered in or full of undesirable things (dust, mistakes, blood).",
        "explanationNepali": "~ ले भरिएको (प्रायः नराम्रो कुरा)।",
        "examples": [
          {
            "target": "この答案用紙は間違いだらけだ。",
            "reading": "このとうあんようしはまちがいだらけだ。",
            "english": "This answer sheet is full of mistakes.",
            "nepali": "यो उत्तरपुस्तिका गल्तीै गल्तीले भरिएको छ।"
          }
        ]
      },
      {
        "title": "3. Prone to 〜がち",
        "pattern": "[Verb stem / Noun] + がち",
        "explanationEnglish": "Tending to do something frequently (usually bad habit).",
        "explanationNepali": "प्रायः ~ हुने बानी हुनु।",
        "examples": [
          {
            "target": "一人暮らしの時は野菜が不足しがちだ。",
            "reading": "ひとりぐらしのときはやさいがふそくしがちだ。",
            "english": "When living alone, one tends to lack vegetables.",
            "nepali": "एक्लै बस्दा तरकारी पुग्दैन।"
          }
        ]
      },
      {
        "title": "4. Slight Feeling 〜気味",
        "pattern": "[Verb stem / Noun] + 気味（ぎみ）",
        "explanationEnglish": "Feeling a little bit of a temporary negative state (cold, tired).",
        "explanationNepali": "अलि अलि ~ को महसुस हुनु।",
        "examples": [
          {
            "target": "少し風邪気味なので、早く寝ます。",
            "reading": "すこしかぜぎみなので、はやくねます。",
            "english": "I feel a bit of a cold, so I will sleep early.",
            "nepali": "अलि रुघा लागे जस्तो छ, छिटो सुत्छु।"
          }
        ]
      }
    ]
  },
  {
    "language": "JAPANESE",
    "level": "N3",
    "lesson": 58,
    "lessonTitle": "Chapter 8: Sports & Leisure Time (スポーツ・余暇)",
    "grammarPoints": [
      {
        "title": "1. Intended for 〜向け",
        "pattern": "[Noun] + 向け",
        "explanationEnglish": "Designed or created specifically for a target group.",
        "explanationNepali": "~ का लागि लक्षित (डिजाइन गरिएको)।",
        "examples": [
          {
            "target": "この本は初心者向けに書かれている。",
            "reading": "このほんはしょしんしゃむけにかくれている。",
            "english": "This book is written intended for beginners.",
            "nepali": "यो किताब शुरुवाती सिक्नेहरूका लागि लक्षित गरी लेखिएको छ।"
          }
        ]
      },
      {
        "title": "2. Suitable for 〜向き",
        "pattern": "[Noun] + 向き",
        "explanationEnglish": "Naturally suitable or fitting well for someone.",
        "explanationNepali": "~ का लागि उपयुक्त।",
        "examples": [
          {
            "target": "彼は子供の指導に向いている。",
            "reading": "かれはこどものしどうにむいている。",
            "english": "He is naturally suited for guiding children.",
            "nepali": "उहाँ बालबालिकालाई सिकाउन उपयुक्त हुनुहुन्छ।"
          }
        ]
      },
      {
        "title": "3. As soon as 〜次第",
        "pattern": "[Verb stem] + 次第",
        "explanationEnglish": "As soon as something happens, immediate action follows.",
        "explanationNepali": "~ हुने बित्तिकै (तत्काल)।",
        "examples": [
          {
            "target": "雨がやみ次第、出発しましょう。",
            "reading": "あめがやみしだい、しゅっぱつしましょう。",
            "english": "As soon as the rain stops, let's depart.",
            "nepali": "पानी पर्न रोकिने बित्तिकै निस्कौँ।"
          }
        ]
      },
      {
        "title": "4. Spanning Across 〜にわたって",
        "pattern": "[Noun] + にわたって / にわたる [Noun]",
        "explanationEnglish": "Spanning over a broad area, time period, or scope.",
        "explanationNepali": "~ भरि / ~ सम्म फैलिएको।",
        "examples": [
          {
            "target": "会議は3日間にわたって行われた。",
            "reading": "かいぎはみっかかんにわたっておこなわれた。",
            "english": "The conference was held spanning over three days.",
            "nepali": "बैठक ३ दिनसम्म सञ्चालन भयो।"
          }
        ]
      }
    ]
  },
  {
    "language": "JAPANESE",
    "level": "N3",
    "lesson": 59,
    "lessonTitle": "Chapter 9: Weather Changes & Natural Environment (天候・自然)",
    "grammarPoints": [
      {
        "title": "1. Even if 〜たとえ〜ても",
        "pattern": "たとえ + [Verb て-form / Adj] + も",
        "explanationEnglish": "Even if hypothetical situation A happens, B remains unchanged.",
        "explanationNepali": "चाहे ~ भए तापनि।",
        "examples": [
          {
            "target": "たとえ雨が降っても、試合は行われる。",
            "reading": "たとえあめがふっても、しあいはおこなわれる。",
            "english": "Even if it rains, the match will be held.",
            "nepali": "चाहे पानी परे तापनि खेल हुनेछ।"
          }
        ]
      },
      {
        "title": "2. Proportional change 〜ば 〜ほど",
        "pattern": "[Verb ば-form] + [Verb dict] + ほど",
        "explanationEnglish": "The more A happens, the more B changes proportionally.",
        "explanationNepali": "जति ~ गर्यो त्यति नै ~।",
        "examples": [
          {
            "target": "日本語は勉強すればするほど面白くなる。",
            "reading": "にほんごはべんきょうすればするほどおもしろくなる。",
            "english": "The more you study Japanese, the more interesting it gets.",
            "nepali": "जापानी भाषा जति पढ्यो त्यति नै रमाइलो हुन्छ।"
          }
        ]
      },
      {
        "title": "3. High Degree 〜くらい / 〜ほど",
        "pattern": "[Plain form / Noun] + くらい / ほど",
        "explanationEnglish": "To the extent that / so much that.",
        "explanationNepali": "~ सम्मको हदमा।",
        "examples": [
          {
            "target": "声が出ないほど喉が痛い。",
            "reading": "こえがでないほどのおどがいたい。",
            "english": "My throat hurts so much that I can't speak.",
            "nepali": "आवाज ननिस्कने गरी घाँटी दुखेको छ।"
          }
        ]
      },
      {
        "title": "4. Bound to be 〜に決まっている",
        "pattern": "[Plain form] + に決まっている",
        "explanationEnglish": "Expresses strong subjective certainty ('bound to be / definitely').",
        "explanationNepali": "नक्की हो / अवश्य हुनुपर्छ।",
        "examples": [
          {
            "target": "そんなの嘘に決まっている。",
            "reading": "そんなのうそにきまっている。",
            "english": "That is definitely a lie.",
            "nepali": "त्यो त पक्कै झूट हो।"
          }
        ]
      }
    ]
  },
  {
    "language": "JAPANESE",
    "level": "N3",
    "lesson": 60,
    "lessonTitle": "Chapter 10: Business Operations & Workplace Communication (仕事・職場)",
    "grammarPoints": [
      {
        "title": "1. Risk of negative event 〜おそれがある",
        "pattern": "[Verb dict / Nの] + おそれがある",
        "explanationEnglish": "There is a danger/risk that something bad might happen.",
        "explanationNepali": "~ हुने खतरा/जोखिम छ।",
        "examples": [
          {
            "target": "大雨で川が氾濫するおそれがある。",
            "reading": "おおあめでかわがはんらんするおそれがある。",
            "english": "There is a risk that the river may flood due to heavy rain.",
            "nepali": "भारी वर्षाका कारण नदी थुनिने खतरा छ।"
          }
        ]
      },
      {
        "title": "2. Certainty based on evidence 〜に違いない",
        "pattern": "[Plain form] + に違いない",
        "explanationEnglish": "Expresses strong objective certainty ('must be').",
        "explanationNepali": "नक्की नै हो।",
        "examples": [
          {
            "target": "彼が犯人に違いない。",
            "reading": "かれがはんにんにちがいない。",
            "english": "He must be the culprit.",
            "nepali": "उही दोषी हुनुपर्छ।"
          }
        ]
      },
      {
        "title": "3. Impossible expectation 〜はずがない",
        "pattern": "[Plain form] + はずがない",
        "explanationEnglish": "Strong conviction that something is logically impossible.",
        "explanationNepali": "~ हुनै सक्दैन।",
        "examples": [
          {
            "target": "真面目な彼が遅刻するはずがない。",
            "reading": "まじめなかれがちこくするはずがない。",
            "english": "A serious person like him cannot possibly be late.",
            "nepali": "अनुशासित उहाँ ढिलो हुनु असम्भव छ।"
          }
        ]
      },
      {
        "title": "4. Absolute denial 〜わけがない",
        "pattern": "[Plain form] + わけがない",
        "explanationEnglish": "Subjective strong denial ('there is no way that...').",
        "explanationNepali": "~ हुने सम्भावना नै छैन।",
        "examples": [
          {
            "target": "こんなに難しい問題が解けるわけがない。",
            "reading": "こんなにむずかしいもんだいがとけるわけがない。",
            "english": "There is no way I can solve such a difficult problem.",
            "nepali": "यति गाह्रो प्रश्न हल गर्न सकिने कुरै छैन।"
          }
        ]
      }
    ]
  },
  {
    "language": "JAPANESE",
    "level": "N3",
    "lesson": 61,
    "lessonTitle": "Chapter 11: Advanced Social Register & Honorifics (敬語・社会)",
    "grammarPoints": [
      {
        "title": "1. Humbly Receive Action お/ご〜いただく",
        "pattern": "お + [Verb stem] + いただく / ご + [Noun] + いただく",
        "explanationEnglish": "Humbly receiving an action performed by a superior.",
        "explanationNepali": "माथिल्लो व्यक्तिबाट काम नम्रतासाथ ग्रहण गर्नु।",
        "examples": [
          {
            "target": "社長にご説明いただきました。",
            "reading": "しゃちょうにごせつめいいただきました。",
            "english": "I humbly received an explanation from the president.",
            "nepali": "अध्यक्षज्यूबाट व्याख्या सुन्न पाइयो।"
          }
        ]
      },
      {
        "title": "2. Superior Performs Action お/ご〜くださる",
        "pattern": "お + [Verb stem] + くださる / ご + [Noun] + くださる",
        "explanationEnglish": "A superior kindly performs an action for me.",
        "explanationNepali": "उच्च व्यक्तिले मेरो लागि काम गरिदिनु।",
        "examples": [
          {
            "target": "先生が本をお貸しくださいました。",
            "reading": "せんせいがほんをおかしくださいました。",
            "english": "The teacher kindly lent me a book.",
            "nepali": "शिक्षकले मलाई किताब पठाएर कृपा गर्नुभयो।"
          }
        ]
      },
      {
        "title": "3. Honorific State 〜ていらっしゃる",
        "pattern": "[Verb て-form] + いらっしゃる",
        "explanationEnglish": "Honorific equivalent of 〜ている (doing action/state for superior).",
        "explanationNepali": "गर्नुहुँदैछ (आदरार्थी)।",
        "examples": [
          {
            "target": "社長は今、電話をなさっていらっしゃいます。",
            "reading": "しゃちょうはいま、でんわをなさっていらっしゃいます。",
            "english": "The president is currently making a call.",
            "nepali": "अध्यक्षज्यू अहिले फोनमा कुरा गर्दैहुनुहुन्छ।"
          }
        ]
      },
      {
        "title": "4. Humble State 〜てまいる",
        "pattern": "[Verb て-form] + まいる",
        "explanationEnglish": "Humble equivalent of 〜ていく / 〜てくる.",
        "explanationNepali": "म जाने/आउने गर्छु (नम्र रूप)।",
        "examples": [
          {
            "target": "後ほど資料をお持ちしてまいります。",
            "reading": "のちほどしりょうをおもちしてまいります。",
            "english": "I will bring the materials shortly.",
            "nepali": "केही बेरमा कागजात लिएर आउनेछु।"
          }
        ]
      }
    ]
  },
  {
    "language": "JAPANESE",
    "level": "N3",
    "lesson": 62,
    "lessonTitle": "Chapter 12: Abstract Ideas & Final Test Reviews (抽象的概念・総まとめ)",
    "grammarPoints": [
      {
        "title": "1. Partial Negation 〜わけではない",
        "pattern": "[Plain form] + わけではない",
        "explanationEnglish": "It doesn't mean that... (partial negation).",
        "explanationNepali": "~ भन्ने चाहिँ होइन (आंशिक अस्वीकार)।",
        "examples": [
          {
            "target": "嫌いなわけではないが、あまり食べない。",
            "reading": "きらいなわけではないが、あまりたべない。",
            "english": "It's not that I dislike it, but I don't eat it much.",
            "nepali": "मन नपरेको त होइन, तर धेरै खाँदिन।"
          }
        ]
      },
      {
        "title": "2. Soft Negation 〜というわけではない",
        "pattern": "[Plain form] + というわけではない",
        "explanationEnglish": "It isn't necessarily the case that...",
        "explanationNepali": "~ नै हो भन्ने चाहिँ होइन।",
        "examples": [
          {
            "target": "全員が賛成したというわけではない。",
            "reading": "ぜんいんがさんせいしたというわけではない。",
            "english": "It doesn't mean everyone agreed.",
            "nepali": "सबैजना सहमत भए भन्ने चाहिँ होइन।"
          }
        ]
      },
      {
        "title": "3. Not Limited To 〜に限らない",
        "pattern": "[Noun / Plain form] + に限らない",
        "explanationEnglish": "Not limited only to A (applies to others too).",
        "explanationNepali": "केवल ~ मा मात्र सीमित छैन।",
        "examples": [
          {
            "target": "この問題は若者に限らない。",
            "reading": "このもんだいはわかものにかぎらない。",
            "english": "This problem is not limited to young people.",
            "nepali": "यो समस्या युवाहरूमा मात्र सीमित छैन।"
          }
        ]
      },
      {
        "title": "4. Merely / Just 〜にすぎない",
        "pattern": "[Plain form / Noun] + にすぎない",
        "explanationEnglish": "Nothing more than / merely / just.",
        "explanationNepali": "केवल ~ बाहेक अरू केही होइन।",
        "examples": [
          {
            "target": "それは単なる噂にすぎない。",
            "reading": "それはたんなるうわさにすぎない。",
            "english": "That is merely a rumor.",
            "nepali": "त्यो केवल एउटा हल्ला मात्र हो।"
          }
        ]
      }
    ]
  },

  // ════════════════════════════════════
  // N2 COMPLETE — LESSONS 76 TO 90
  // ════════════════════════════════════
  {
    language: 'JAPANESE', level: 'N2', lesson: 76,
    lessonTitle: 'Business Directives & Discussion — 〜をめぐって / 〜に際して',
    grammarPoints: [
      {
        title: '1. Concerning / Regarding — 〜をめぐって',
        pattern: 'N + をめぐって / をめぐる N',
        explanationEnglish: 'Used when describing arguments, discussions, or rumors surrounding a specific issue or conflict.',
        explanationNepali: 'कुनै विषय, विवाद वा छलफलको सम्बन्धमा बहस हुनु जनाउँदा (को सम्बन्धमा)।',
        examples: [
          { target: '新商品の開発をめぐって意見が対立した。', reading: 'しんしょうひんのかいはつをめぐっていけんがたいりつした。', english: 'Opinions conflicted regarding the development of the new product.', nepali: 'नयाँ उत्पादनको विकासको सम्बन्धमा मतभेद भयो।' }
        ]
      },
      {
        title: '2. On the Occasion of / Upon — 〜に際して',
        pattern: 'N / V-dictionary + に際して',
        explanationEnglish: 'Formal expression used when starting an important action, ceremony, or event.',
        explanationNepali: 'कुनै महत्वपूर्ण काम, समारोह वा घटनाको सुरुवातको अवसरमा।',
        examples: [
          { target: '契約の締結に際して書類を再確認した。', reading: 'けいやくのていけつにさいしてしょるいをさいかくにんした。', english: 'Re-confirmed documents upon signing the contract.', nepali: 'सम्झौतामा हस्ताक्षर गर्ने अवसरमा कागजातहरू पुनः पुष्टि गरियो।' }
        ]
      }
    ]
  },
  {
    language: 'JAPANESE', level: 'N2', lesson: 77,
    lessonTitle: 'Formal Certainty & Negative Intent — 〜に相違ない / 〜まい',
    grammarPoints: [
      {
        title: '1. No Doubt / Must Be — 〜に相違ない',
        pattern: 'Plain form / N + に相違ない',
        explanationEnglish: 'Expresses strong conviction based on evidence: "There is no doubt that...".',
        explanationNepali: 'प्रमाणको आधारमा दृढ विश्वास व्यक्त गर्दा (पक्कै पनि निश्चित हुनु)।',
        examples: [
          { target: '彼が真犯人に相違ない。', reading: 'かれがしんはんにんにそういない。', english: 'He must no doubt be the real culprit.', nepali: 'ऊ पक्कै पनि वास्तविक अपराधी हो।' }
        ]
      },
      {
        title: '2. Will Not / Intend Not To — 〜まい',
        pattern: 'V-dictionary (Group 1) / V-stem (Group 2/3) + まい',
        explanationEnglish: 'Expresses strong negative intention ("I will never...") or negative conjecture.',
        explanationNepali: 'कुनै काम कहिल्यै नगर्ने दृढ सङ्कल्प वा नकारात्मक अनुमान।',
        examples: [
          { target: 'あのような失敗は二度と繰り返すまい。', reading: 'あのようなしっぱいはにどとくりかえすまい。', english: 'I shall never repeat such a failure again.', nepali: 'म त्यस्तो असफलता कहिल्यै दोहोर्याउने छैन।' }
        ]
      }
    ]
  },
  {
    language: 'JAPANESE', level: 'N2', lesson: 78,
    lessonTitle: 'Trigger Events & Continuous Trends — 〜を契機に / 〜一方だ',
    grammarPoints: [
      {
        title: '1. Triggered By / Taking Opportunity — 〜を契機に',
        pattern: 'N + を契機に / を契機として',
        explanationEnglish: 'Indicates a pivotal event or occasion that triggers a big change.',
        explanationNepali: 'ठूलो परिवर्तन ल्याउने मुख्य अवसर वा घटनालाई आधार बनाउँदा।',
        examples: [
          { target: '結婚を契機に新しい家を購入した。', reading: 'けっこんをけいきにあたらしいいえをこうにゅうした。', english: 'Triggered by marriage, we bought a new home.', nepali: 'विवाहको अवसरलाई आधार बनाएर नयाँ घर किनेका हौँ।' }
        ]
      },
      {
        title: '2. Keep On / Tend To Continue — 〜一方だ',
        pattern: 'V-dictionary + 一方だ',
        explanationEnglish: 'Indicates that a situation continues in one direction (usually worsening or increasing).',
        explanationNepali: 'परिस्थिति लगातार एउटै दिशामा बढ्दै वा घट्दै जाँदा (निरन्तर एकोहोरो रूपमा)।',
        examples: [
          { target: '物価は上がる一方だ。', reading: 'ぶっかはあがるいっぽうだ。', english: 'Prices keep on rising continuously.', nepali: 'महङ्गी निरन्तर बढिरहेको छ।' }
        ]
      }
    ]
  },
  {
    language: 'JAPANESE', level: 'N2', lesson: 79,
    lessonTitle: 'Co-occurrence & Risk Warnings — 〜にともなって / 〜おそれがある',
    grammarPoints: [
      {
        title: '1. Along With / As Situation Changes — 〜にともなって',
        pattern: 'N / V-dictionary + にともなって',
        explanationEnglish: 'Expresses that as one change happens, another change occurs simultaneously.',
        explanationNepali: 'एउटा परिवर्तनसँगै अर्को परिवर्तन पनि एकैसाथ हुँदै जाँदा (सँगसँगै)।',
        examples: [
          { target: '技術の進歩にともなって生活が便利になった。', reading: 'ぎじゅつのしんぽにともなってせいかつがべんりになった。', english: 'Along with technological progress, life became convenient.', nepali: 'प्रविधिको विकाससँगै जीवन सहज बनेको छ।' }
        ]
      },
      {
        title: '2. Risk / Fear That — 〜おそれがある',
        pattern: 'V-dictionary / Nの + おそれがある',
        explanationEnglish: 'Warns about a serious potential risk or bad consequence in the future.',
        explanationNepali: 'भविष्यमा आउन सक्ने गम्भीर जोखिम वा खतराको सम्भावना।',
        examples: [
          { target: '大雨により土砂崩れが起こるおそれがある。', reading: 'おおあめによりどしゃくずれがおこるお<ctrl94>れがある。', english: 'There is a risk of landslides due to heavy rain.', nepali: 'भारी वर्षाको कारण पहिरो जाने जोखिम छ।' }
        ]
      }
    ]
  },
  {
    language: 'JAPANESE', level: 'N2', lesson: 80,
    lessonTitle: 'Mediums & Dependency — 〜を通じて / 〜次第だ',
    grammarPoints: [
      {
        title: '1. Through / Via Medium — 〜を通じて',
        pattern: 'N + をを通じて / をとおして',
        explanationEnglish: 'Indicates the medium, intermediary, or period through which an action occurs.',
        explanationNepali: 'कुनै माध्यम वा सम्पूर्ण अवधिभरि काम हुँदा (को माध्यमबाट)।',
        examples: [
          { target: '友人を通じて彼と知り合った。', reading: 'ゆうじんをつうじてかれとしりあった。', english: 'I got to know him through a friend.', nepali: 'साथीको माध्यमबाट उहाँलाई चिनेको हूँ।' }
        ]
      },
      {
        title: '2. Depending On / Subject To — 〜次第だ',
        pattern: 'N + 次第だ / 次第で',
        explanationEnglish: 'States that the result or outcome depends entirely on a condition.',
        explanationNepali: 'परिणाम वा नतिजा पूर्ण रूपमा कुनै सर्तमा निर्भर हुनु (मा निर्भर)।',
        examples: [
          { target: '本人のやる気次第で成果が変わる。', reading: 'ほんにんのやるきしだいでせいかがかわる。', english: 'The result changes depending on motivation.', nepali: 'आफ्नो जाँगरमा निर्भर भएर नतिजा परिवर्तन हुन्छ।' }
        ]
      }
    ]
  },

  // ════════════════════════════════════
  // N1 COMPLETE — LESSONS 91 TO 100
  // ════════════════════════════════════
  {
    language: 'JAPANESE', level: 'N1', lesson: 91,
    lessonTitle: 'High Keigo & Deep Emotion — 〜てやまない / 〜極まりない',
    grammarPoints: [
      {
        title: '1. Never Cease To / Sincerely — 〜てやまない',
        pattern: 'V-te + やまない',
        explanationEnglish: 'Expresses deep, unending emotion or sincere wishes (never cease to...).',
        explanationNepali: 'आफ्नो हृदयदेखिको गहिरो भावना वा निरन्तर कामना (सधैं कामना गरिरहनु)।',
        examples: [
          { target: '卒業生の今後の活躍を期待してやまない。', reading: 'そつぎょうせいのこんごのかつやくをきたいしてやまない。', english: 'I never cease to hope for the future success of the graduates.', nepali: 'स्नातक विद्यार्थीहरूको भविष्यको सफलताको म सधैं कामना गर्दछु।' }
        ]
      },
      {
        title: '2. Extremely / Boundless — 〜極まりない',
        pattern: 'i-Adj / Na-Adj + 極まりない (または 極まる)',
        explanationEnglish: 'Expresses an extreme degree of emotion or state (extremely / boundlessly).',
        explanationNepali: 'अत्यन्तै चरम सीमासम्मको भावना वा अवस्था।',
        examples: [
          { target: '危険極まりない行為だ。', reading: 'きけんきわまりないこういだ。', english: 'It is an extremely dangerous act.', nepali: 'यो अत्यन्तै जोखिमपूर्ण कार्य हो।' }
        ]
      }
    ]
  },
  {
    language: 'JAPANESE', level: 'N1', lesson: 92,
    lessonTitle: 'Forced Conditions & Strong Rationale — 〜を余儀なくされる / 〜ばこそ',
    grammarPoints: [
      {
        title: '1. Forced To Do — 〜を余儀なくされる',
        pattern: 'N + を余儀なくされる',
        explanationEnglish: 'Indicates that someone is forced into an undesirable action due to circumstances.',
        explanationNepali: 'परिस्थितिको बाध्यताले गर्दा अनिच्छुक काम गर्न बाध्य पारिनु।',
        examples: [
          { target: '経営難により会社は解散を余儀なくされた。', reading: 'けいえい난によりかいしゃはかいさんをよぎなくされた。', english: 'Due to financial difficulty, the company was forced to dissolve.', nepali: 'आर्थिक मन्दीको कारण कम्पनी विघटन गर्न बाध्य भइयो।' }
        ]
      },
      {
        title: '2. Precisely Because — 〜ばこそ',
        pattern: 'V-conditional / N + ばこそ',
        explanationEnglish: 'Emphasizes that a specific reason is the precise cause of an outcome.',
        explanationNepali: 'ठूलो वा खास कारण नै परिणामको मुख्य आधार हो भनी जोड दिँदा।',
        examples: [
          { target: '親心があればこそ厳しく指導するのだ。', reading: 'おやごころがあればこそきびしくしどうするのだ。', english: 'Precisely because I have a parent’s heart, I guide strictly.', nepali: 'अभिभावकको माया भएकोले नै कडा मार्गदर्शन दिएको हो।' }
        ]
      }
    ]
  },
  {
    language: 'JAPANESE', level: 'N1', lesson: 93,
    lessonTitle: 'Initiation & High Status — 〜を皮切りに / 〜たる者',
    grammarPoints: [
      {
        title: '1. Starting With / Beginning From — 〜を皮切りに',
        pattern: 'N + を皮切りに / を皮切りにして',
        explanationEnglish: 'Indicates that one event triggers a series of similar actions or events in succession.',
        explanationNepali: 'एउटा घटनाको सुरुवातसँगै लगातार उस्तै कार्यहरूको श्रृंखला चल्दा।',
        examples: [
          { target: '新作映画は東京を皮切りに全国で公開される。', reading: 'しんさくえいがはとうきょうをかわきりにぜんこくでこうかいされる。', english: 'The new movie is released nationwide starting with Tokyo.', nepali: 'नयाँ चलचित्र टोकियोबाट सुरु गर्दै देशव्यापी रूपमा प्रदर्शन हुन्छ।' }
        ]
      },
      {
        title: '2. As a Person Who Is / In Capacity Of — 〜たる者',
        pattern: 'N + たる者',
        explanationEnglish: 'Expresses high duty or noble standard required of someone in a high position.',
        explanationNepali: 'उच्च ओहोदा वा जिम्मेवार हैसियतमा रहेको व्यक्तिले पूरा गर्नुपर्ने दायित्व।',
        examples: [
          { target: '医者たる者、患者の命を最優先に考えるべきだ。', reading: 'いしゃたるもの、かんじゃのいのちをさいゆうせんにかんがえるべきだ。', english: 'A doctor must place patient life as top priority.', nepali: 'डाक्टरको हैसियतले बिरामीको जीवनलाई सर्वोपरी मान्नुपर्छ।' }
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
  },
  {
    language: 'JAPANESE', level: 'N4', lesson: 30,
    lessonTitle: 'Lesson 30 – State of Preparation 〜てあります & Advance Preparation 〜ておきます',
    grammarPoints: [
      {
        title: '1. State of Intentional Action (N が V-て あります)',
        pattern: '[Noun] が [Transitive Verb て-form] + あります',
        explanationEnglish: 'Expresses that a state has been brought about intentionally for a specific purpose by someone.',
        explanationNepali: 'कुनै खास उद्देश्यले कसैद्वारा पूर्व-तयारी गरी राखिएको स्थिति व्यक्त गर्दछ।',
        examples: [
          { target: 'カレンダーに予定が書いてあります。', reading: 'カレンダーによていが書いてあります。', english: 'The schedule is written on the calendar.', nepali: 'पात्रोमा कार्यतालिका लेखिएको छ।' }
        ]
      },
      {
        title: '2. Preparation in Advance (V-て おきます)',
        pattern: '[Verb て-form] + おきます',
        explanationEnglish: '1) Doing an action in advance for future convenience. 2) Leaving a state as it is for the next use.',
        explanationNepali: '१) भविष्यको सुविधाका लागि पहिले नै तयारी स्वरूप काम गर्नु। २) अर्को पटकको प्रयोगका लागि अवस्था यत्तिकै राख्नु।',
        examples: [
          { target: '旅行の前にチケットを買っておきます。', reading: 'りょこうのまえにチケットをかっておきます。', english: 'I will buy the tickets in advance before the trip.', nepali: 'यात्रा अघि नै टिकट किनेर राख्नेछु।' }
        ]
      }
    ]
  },
  {
    language: 'JAPANESE', level: 'N4', lesson: 31,
    lessonTitle: 'Lesson 31 – Volitional Form (意向形) & Expressing Intentions 〜と思っています',
    grammarPoints: [
      {
        title: '1. Volitional Form Conjugation (意向形)',
        pattern: 'Gr.1: う→おう (書く→書こう) | Gr.2: る→よう (食べる→食べよう) | Irreg: する→しよう, 来る→来よう',
        explanationEnglish: 'The casual equivalent of 〜ましょう. Used to invite or express willpower.',
        explanationNepali: '〜ましょう को सामान्य बोलचाल रूप। प्रस्ताव राख्न वा इच्छा व्यक्त गर्न प्रयोग हुन्छ।',
        examples: [
          { target: '一緒にご飯を食べよう。', reading: 'いっしょにごはんをたべよう。', english: 'Let us eat together.', nepali: 'सँगै खाना खाऔँ।' }
        ]
      },
      {
        title: '2. Expressing Intentions (V-Volitional + と思っています)',
        pattern: '[Verb Volitional form] + と思っています',
        explanationEnglish: 'Expresses a decision or plan that the speaker has been holding for some time.',
        explanationNepali: 'वक्ताले केही समयदेखि मनमा बनाइराखेको योजना वा विचार व्यक्त गर्दछ।',
        examples: [
          { target: '週末は海へ行こうと思っています。', reading: 'しゅうまつはうみへいこうとおもっています。', english: 'I am planning to go to the sea this weekend.', nepali: 'यो साताको अन्तमा समुन्द्र जाने सोचिरहेको छु।' }
        ]
      }
    ]
  },
  {
    language: 'JAPANESE', level: 'N4', lesson: 32,
    lessonTitle: 'Lesson 32 – Suggestions 〜ほうがいい & Conjecture 〜でしょう / 〜かもしれない',
    grammarPoints: [
      {
        title: '1. Giving Advice / Suggestion (V-た / V-ない ほうがいいです)',
        pattern: '[Verb た-form / ない-form] + ほうがいいです',
        explanationEnglish: 'Used to give direct advice or recommendations.',
        explanationNepali: 'सुझाव वा सल्लाह दिन प्रयोग गरिन्छ।',
        examples: [
          { target: '毎日運動したほうがいいです。', reading: 'まいにちうんどうしたほうがいいです。', english: 'You had better exercise every day.', nepali: 'हरेक दिन व्यायाम गरेको राम्रो हुन्छ।' }
        ]
      },
      {
        title: '2. Conjecture / Probability (〜でしょう / 〜かもしれない)',
        pattern: '[Plain Form] + でしょう (70-80% likely) / かもしれない (50% possibility)',
        explanationEnglish: '〜でしょう expresses high probability ("probably"). 〜かもしれない expresses possibility ("might/maybe").',
        explanationNepali: '〜でしょう ले उच्च सम्भावना जनाउँछ। 〜かもしれない ले सम्भावना हुन सक्ने जनाउँछ।',
        examples: [
          { target: '明日は雨が降るでしょう。', reading: 'あしたはあめがふるでしょう。', english: 'It will probably rain tomorrow.', nepali: 'भोलि पानी पर्ला।' },
          { target: '時間に間に合わないかもしれない。', reading: 'じかんにまにあわないかもしれない。', english: 'We might not be in time.', nepali: 'समयमा नपुग्न पनि सकिन्छ।' }
        ]
      }
    ]
  },
  {
    language: 'JAPANESE', level: 'N4', lesson: 33,
    lessonTitle: 'Lesson 33 – Imperative / Prohibitive Forms (命令形・禁止形) & Quoting 〜と言っていました',
    grammarPoints: [
      {
        title: '1. Imperative and Prohibitive Forms (命令形・禁止形)',
        pattern: 'Imperative: 行け / 食べろ | Prohibitive: 行くな / 食べるな',
        explanationEnglish: 'Commands and strict prohibitions used in emergencies, sports, or by superiors.',
        explanationNepali: 'आपत्कालीन अवस्था वा खेलकुदमा दिइने कडा आदेश र निषेध।',
        examples: [
          { target: '早く走れ！', reading: 'はやくはしれ！', english: 'Run fast!', nepali: 'छिटो दगुर्!' },
          { target: 'ここに触るな！', reading: 'ここにさわるな！', english: 'Do not touch here!', nepali: 'यहाँ नछोऊ!' }
        ]
      },
      {
        title: '2. Indirect Quoting (〜と言っていました / 〜という意味です)',
        pattern: '[Sentence Plain form] + と言っていました / という意味です',
        explanationEnglish: 'Used to pass on a message or explain the meaning of a sign or word.',
        explanationNepali: 'सन्देश पुर्‍याउन वा कुनै शब्द/चिह्नको अर्थ बुझाउन प्रयोग गरिन्छ।',
        examples: [
          { target: '田中さんは明日休むと言っていました。', reading: 'たなかさんはあしたやすむといっていました。', english: 'Tanaka said he will take tomorrow off.', nepali: 'नाकाजीले भोलि बिदा बस्छु भन्नुभएको थियो।' }
        ]
      }
    ]
  },
  {
    language: 'JAPANESE', level: 'N4', lesson: 34,
    lessonTitle: 'Lesson 34 – Doing as Instructed 〜とおりに & Sequence 〜あとで',
    grammarPoints: [
      {
        title: '1. Doing as Instructed (V-とおりに / N の とおりに)',
        pattern: '[Verb Plain / Noun の] + とおりに',
        explanationEnglish: 'Doing an action in the exact manner as instructed or shown.',
        explanationNepali: 'निर्देशन वा प्रदर्शन अनुसार नै दुरुस्त काम गर्नु।',
        examples: [
          { target: '私が言ったとおりに書いてください。', reading: 'わたしがいったとおりにかいてください。', english: 'Please write down exactly as I said.', nepali: 'मैले भने अनुसार नै लेख्नुहोस्।' }
        ]
      },
      {
        title: '2. Action Sequence (V-た あとで / N の あとで)',
        pattern: '[Verb た-form / Noun の] + あとで',
        explanationEnglish: 'Expresses that an event occurs after completing another action.',
        explanationNepali: 'एउटा काम सकिएपछि अर्को काम गर्ने क्रम जनाउँछ।',
        examples: [
          { target: '仕事が終わったあとで、飲みに行きます。', reading: 'しごとがおわったあとで、のみにいきます。', english: 'After work finishes, we will go for a drink.', nepali: 'काम सकिएपछि पिउन जानेछौँ।' }
        ]
      }
    ]
  },
  {
    language: 'JAPANESE', level: 'N4', lesson: 35,
    lessonTitle: 'Lesson 35 – Conditional Form (条件形 〜ば) & Topic Suggestion 〜なら',
    grammarPoints: [
      {
        title: '1. Conditional Form (〜ば)',
        pattern: 'Gr 1: え+ば (書けば) | Gr 2: れば (食べれば) | い-adj: ければ | N/な: なら',
        explanationEnglish: 'Expresses conditional requirements for a result to occur ("if... then").',
        explanationNepali: 'कुनै परिणाम हुन आवश्यक सर्त व्यक्त गर्दछ ("यदि... भने")।',
        examples: [
          { target: '安ければ、買います。', reading: 'やすければ、かいます。', english: 'If it is cheap, I will buy it.', nepali: 'सस्तो भयो भने, किन्नेछु।' },
          { target: 'ボタンを押せば、お湯が出ます。', reading: 'ボタンをおせば、おゆがでます。', english: 'If you press the button, hot water comes out.', nepali: 'बटन थिच्नुभयो भने तातोपानी आउँछ।' }
        ]
      },
      {
        title: '2. Topic Advice (N なら)',
        pattern: '[Noun] + なら',
        explanationEnglish: 'Used to offer information or recommendations on a topic mentioned by the listener.',
        explanationNepali: 'सुन्ने व्यक्तिले उठाएको विषयमा जानकारी वा सुझाव दिन प्रयोग गरिन्छ।',
        examples: [
          { target: 'カメラなら、秋葉原がいいですよ。', reading: 'カメラなら、あきはばらがいいですよ。', english: 'If you want a camera, Akihabara is great.', nepali: 'क्यामेराको लागि त अकिहाबारा राम्रो छ।' }
        ]
      }
    ]
  },
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
  // Connect Korean EPS Lessons to the official HRD Korea 60-Lesson Dataset
  if (language === 'KOREAN' && (level === 'EPS' || level?.startsWith('EPS_'))) {
    const epsLessonData = EPS_60_LESSONS_GRAMMAR.find(g => g.lesson === lesson);
    if (epsLessonData) {
      if (epsLessonData.isPreparatory) {
        return {
          language: 'KOREAN',
          level,
          lesson,
          lessonTitle: `Lesson ${lesson}: ${epsLessonData.titleKorean} (${epsLessonData.titleEnglish})`,
          grammarPoints: [
            {
              title: `ℹ️ Preparatory Orientation (वर्णमाला र आधारभूत परिचय)`,
              pattern: `Hangeul Alphabet & Basic Greetings`,
              explanationEnglish: `Lessons 1 to 5 are preparatory lessons focusing on the Hangeul alphabet, pronunciation, classroom commands, and basic greetings. According to the official HRD Korea syllabus, there are no formal grammar rules in Chapters 1–5. Formal workplace grammar begins in Lesson 6: 입니다 / 입니까?.`,
              explanationNepali: `इपिएस पाठ १ देखि ५ सम्म हन्गुल वर्णमाला, उच्चारण र आधारभूत अभिवादन सिक्ने अभिमुखीकरण पाठहरू हुन्। HRD Korea को आधिकारिक पाठ्यक्रम अनुसार पाठ १-५ मा कुनै औपचारिक व्याकरण नियम छैन। औपचारिक व्याकरण पाठ ६ (입니다 / 입니까?) बाट सुरु हुन्छ।`,
              examples: []
            }
          ]
        };
      }

      const points: GrammarPoint[] = [];
      if (epsLessonData.grammarPoint1) {
        points.push({
          title: `1. ${epsLessonData.grammarPoint1.title}`,
          pattern: epsLessonData.grammarPoint1.pattern,
          explanationEnglish: epsLessonData.grammarPoint1.explanationEnglish,
          explanationNepali: epsLessonData.grammarPoint1.explanationNepali,
          examples: epsLessonData.grammarPoint1.example ? [
            {
              target: epsLessonData.grammarPoint1.example.korean,
              reading: epsLessonData.grammarPoint1.example.romanization,
              english: epsLessonData.grammarPoint1.example.english,
              nepali: epsLessonData.grammarPoint1.example.nepali
            }
          ] : []
        });
      }
      if (epsLessonData.grammarPoint2) {
        points.push({
          title: `2. ${epsLessonData.grammarPoint2.title}`,
          pattern: epsLessonData.grammarPoint2.pattern,
          explanationEnglish: epsLessonData.grammarPoint2.explanationEnglish,
          explanationNepali: epsLessonData.grammarPoint2.explanationNepali,
          examples: epsLessonData.grammarPoint2.example ? [
            {
              target: epsLessonData.grammarPoint2.example.korean,
              reading: epsLessonData.grammarPoint2.example.romanization,
              english: epsLessonData.grammarPoint2.example.english,
              nepali: epsLessonData.grammarPoint2.example.nepali
            }
          ] : []
        });
      }

      return {
        language: 'KOREAN',
        level,
        lesson,
        lessonTitle: `Lesson ${lesson}: ${epsLessonData.titleKorean} (${epsLessonData.titleEnglish})`,
        grammarPoints: points
      };
    }
  }

  if (language === 'KOREAN' && level?.startsWith('TOPIK')) {
    const topikGrammarMap: Record<number, { title: string; pattern: string; en: string; np: string; exKo: string; exRo: string; exEn: string; exNp: string }> = {
      1: { title: '1. Formal Polite Ending: -입니다 / -입니까?', pattern: 'N + 입니다 / 입니까?', en: 'Formal polite sentence ending used to state identity or ask questions.', np: 'औपचारिक रूपमा नाम वा जात जनाउने शिष्ट अन्त्य (हुँ/हो/हुन्)।', exKo: '저는 학생입니다.', exRo: 'Jeoneun haksaeng-imnida.', exEn: 'I am a student.', exNp: 'म विद्यार्थी हूँ।' },
      2: { title: '2. Subject Particle: -이 / -가', pattern: 'N (Consonant) + 이 / N (Vowel) + 가', en: 'Subject marker emphasizing WHO or WHAT performs the action.', np: 'वाक्यको मुख्य कर्ता जनाउने प्रत्यय।', exKo: '선생님이 오십니다.', exRo: 'Seonsaengnim-i osi-mnida.', exEn: 'The teacher is coming.', exNp: 'शिक्षक आउँदै हुनुहुन्छ।' },
      3: { title: '3. Topic Marker: -은 / -는', pattern: 'N (Consonant) + 은 / N (Vowel) + 는', en: 'Topic marker used to introduce main topic or contrast.', np: 'वाक्यको विषय जनाउने प्रत्यय (चाहिँ)।', exKo: '저는 네팔 사람입니다.', exRo: 'Jeoneun Nepal saram-imnida.', exEn: 'As for me, I am Nepali.', exNp: 'म चाहिँ नेपाली नागरिक हूँ।' },
      4: { title: '4. Informal Polite Tense: -아/어요', pattern: 'V/A stem + -아요 / -어요 / 해요', en: 'Standard polite present tense ending for daily conversation.', np: 'दैनिक कुराकानीमा प्रयोग हुने सामान्य शिष्ट अन्त्य।', exKo: '밥을 먹어요.', exRo: 'Babeul meogeoyo.', exEn: 'I eat rice.', exNp: 'म भात खान्छु।' },
      5: { title: '5. Time & Destination Marker: -e', pattern: 'Time N / Location N + 에', en: 'Attaches to time (at) or destination of movement (to).', np: 'समयमा (बजे) वा जाने स्थानमा (तिर) जोडिन्छ।', exKo: '7시에 학교에 가요.', exRo: 'Ilgop-sie hakgyo-e gayo.', exEn: 'I go to school at 7 o’clock.', exNp: 'म ७ बजे विद्यालय जान्छु।' },
      16: { title: '1. Past Tense Ending: -았/었어요', pattern: 'V/A stem + -았었어요 / -었어요 / 했어요', en: 'Expresses completed past action or state.', np: 'भइसकेको भूतकाल जनाउँछ (गरेँ/भएँ)।', exKo: '어제 영화를 봤어요.', exRo: 'Eoje yeonghwa-reul bwasseoyo.', exEn: 'I watched a movie yesterday.', exNp: 'म हिजो चलचित्र हेरेँ।' },
      17: { title: '2. Future Intention: -(으)ㄹ 거예요', pattern: 'V stem + -(으)ㄹ 거예요', en: 'Expresses future plans or intentions.', np: 'भविष्यको योजना जनाउँछ (गर्नेछु)।', exKo: '내일 여행을 갈 거예요.', exRo: 'Naeil yeohaeng-eul gal geoyeyo.', exEn: 'I will go on a trip tomorrow.', exNp: 'म भोलि भ्रमण जानेछु।' },
      31: { title: '1. Indirect Speech Statement: -다고 하다', pattern: 'Plain verb/adj + -다고 하다', en: 'Used to quote a statement made by someone else.', np: 'कसैले भनेको कुरा अप्रत्यक्ष रूपमा उद्धृत गर्दा (भन्ने कुरा गर्नु)।', exKo: '사장님이 내일 회의가 있다고 해요.', exRo: 'Sajangnim-i naeil hoeui-ga itdago haeyo.', exEn: 'The president says there is a meeting tomorrow.', exNp: 'साहुजीले भोलि बैठक छ भन्नुभयो।' },
      46: { title: '1. Not Only But Also: -(으)ㄹ 뿐만 아니라', pattern: 'V/A stem + -(으)ㄹ 뿐만 아니라', en: 'Expresses addition: "not only A, but also B".', np: 'एउटा मात्र नभई अर्को पनि (मात्र नभई)।', exKo: '그분은 친절할 뿐만 아니라 유능해요.', exRo: 'Geubun-eun chinjeolhal ppunman anira yuneunghaeyo.', exEn: 'He is not only kind, but also competent.', exNp: 'उहाँ दयालु मात्र नभई सक्षम पनि हुनुहुन्छ।' },
      61: { title: '1. Extreme Degree: -기 짝이 없다', pattern: 'A stem + -기 짝이 없다', en: 'Expresses an incomparable, extreme state (unmatched/extremely).', np: 'अत्यन्तै चरम अवस्था वा तुलना गर्न नसकिने भाव।', exKo: '소식이 안타깝기 짝이 없습니다.', exRo: 'Sosig-i antakkapgi jjag-i eobseumnida.', exEn: 'The news is extremely regrettable.', exNp: 'यो समाचार अत्यन्तै दुःखद् छ।' },
      76: { title: '1. Deep Emotion / Boundless: -에 다름 아니다', pattern: 'N + 에 다름 아니다 / 다름없다', en: 'Literary expression meaning "is nothing other than" or "none other than".', np: 'अन्य केही नभई ठ्याक्कै त्यही हुनु।', exKo: '그것은 기적에 다름 아닙니다.', exRo: 'Geugeos-eun gijeoge dareum animnida.', exEn: 'That is nothing other than a miracle.', exNp: 'त्यो चमत्कार बाहेक अरू केही होइन।' }
    };

    const gData = topikGrammarMap[lesson] || {
      title: `1. TOPIK ${level} Lesson ${lesson} Structure`,
      pattern: `[TOPIK ${level} Pattern #${lesson}]`,
      en: `Official TOPIK ${level} grammar rule for Lesson ${lesson}.`,
      np: `पाठ ${lesson} को आधिकारिक TOPIK ${level} व्याकरण नियम।`,
      exKo: `TOPIK ${lesson}과 문법을 연습합니다.`,
      exRo: `TOPIK ${lesson}-gwa munbeob-eul yeonseuphamnida.`,
      exEn: `Practice TOPIK Lesson ${lesson} grammar.`,
      exNp: `उदाहरण: पाठ ${lesson} को व्याकरण अभ्यास गर्नु।`
    };

    return {
      language: 'KOREAN',
      level,
      lesson,
      lessonTitle: `TOPIK ${level} • Lesson ${lesson} Syllabus Guide`,
      grammarPoints: [
        {
          title: gData.title,
          pattern: gData.pattern,
          explanationEnglish: gData.en,
          explanationNepali: gData.np,
          examples: [
            {
              target: gData.exKo,
              reading: gData.exRo,
              english: gData.exEn,
              nepali: gData.exNp
            }
          ]
        }
      ]
    };
  }

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
