// ============================================================
// JLPT N3 COMPLETE 12-CHAPTER MASTER SYLLABUS DATASET
// Full 12-Chapter Grammar & Vocabulary Master Syllabus
// Complete definitions, readings, Nepali translations, and example sentences
// ============================================================
import type { VocabItem } from './nihongo-vocab';
import type { GrammarPoint } from './grammar-guide';

export interface N3MasterChapter {
  chapterNumber: number;
  title: string;
  titleJapanese: string;
  theme: string;
  vocabulary: VocabItem[];
  grammarGuides: GrammarPoint[];
}

export const N3_MASTER_SYLLABUS: N3MasterChapter[] = [
  {
    "chapterNumber": 1,
    "title": "Introducing Yourself & Daily Routines",
    "titleJapanese": "自己紹介・日常生活",
    "theme": "Personal identity, habits, daily schedule",
    "vocabulary": [
      {
        "id": "N3-CH01-001",
        "lesson": 51,
        "level": "N3",
        "word": "お辞儀",
        "reading": "おじぎ",
        "meaning": "Bowing / Greeting",
        "meaningNepali": "निहुरिएर नमस्कार गर्नु",
        "kanjiCharacters": [
          "辞",
          "儀"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "お辞儀を使います。",
            "reading": "おじぎをつかいます。",
            "english": "Use Bowing / Greeting.",
            "nepali": "उदाहरण: निहुरिएर नमस्कार गर्नु।"
          }
        ]
      },
      {
        "id": "N3-CH01-002",
        "lesson": 51,
        "level": "N3",
        "word": "向かい合う",
        "reading": "むかいあう",
        "meaning": "To face each other",
        "meaningNepali": "आमनेसामने हुनु",
        "kanjiCharacters": [
          "向",
          "合"
        ],
        "partOfSpeech": "Verb",
        "grammarSentences": [
          {
            "japanese": "向かい合うを使います。",
            "reading": "むかいあうをつかいます。",
            "english": "Use To face each other.",
            "nepali": "उदाहरण: आमनेसामने हुनु।"
          }
        ]
      },
      {
        "id": "N3-CH01-003",
        "lesson": 51,
        "level": "N3",
        "word": "家事",
        "reading": "かじ",
        "meaning": "Housework / Domestic chores",
        "meaningNepali": "घरको काम",
        "kanjiCharacters": [
          "家",
          "事"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "家事を使います。",
            "reading": "かじをつかいます。",
            "english": "Use Housework / Domestic chores.",
            "nepali": "उदाहरण: घरको काम।"
          }
        ]
      },
      {
        "id": "N3-CH01-004",
        "lesson": 51,
        "level": "N3",
        "word": "規則正しい",
        "reading": "きそくただしい",
        "meaning": "Regular / Systematic",
        "meaningNepali": "नियमित / नियमबद्ध",
        "kanjiCharacters": [
          "規",
          "則",
          "正"
        ],
        "partOfSpeech": "I-Adj",
        "grammarSentences": [
          {
            "japanese": "規則正しいを使います。",
            "reading": "きそくただしいをつかいます。",
            "english": "Use Regular / Systematic.",
            "nepali": "उदाहरण: नियमित / नियमबद्ध।"
          }
        ]
      },
      {
        "id": "N3-CH01-005",
        "lesson": 51,
        "level": "N3",
        "word": "早起き",
        "reading": "はやおき",
        "meaning": "Waking up early",
        "meaningNepali": "बिहानै उठ्ने बानी",
        "kanjiCharacters": [
          "早",
          "起"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "早起きを使います。",
            "reading": "はやおきをつかいます。",
            "english": "Use Waking up early.",
            "nepali": "उदाहरण: बिहानै उठ्ने बानी।"
          }
        ]
      }
    ],
    "grammarGuides": [
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
    "chapterNumber": 2,
    "title": "Shopping, Consumer Habits & Housing",
    "titleJapanese": "買い物・住居",
    "theme": "Transactions, bills, furniture & property",
    "vocabulary": [
      {
        "id": "N3-CH02-001",
        "lesson": 52,
        "level": "N3",
        "word": "勘定",
        "reading": "かんじょう",
        "meaning": "Bill / Check / Calculation",
        "meaningNepali": "बिल / हिसाब",
        "kanjiCharacters": [
          "勘",
          "定"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "勘定を使います。",
            "reading": "かんじょうをつかいます。",
            "english": "Use Bill / Check / Calculation.",
            "nepali": "उदाहरण: बिल / हिसाब।"
          }
        ]
      },
      {
        "id": "N3-CH02-002",
        "lesson": 52,
        "level": "N3",
        "word": "領収書",
        "reading": "りょうしゅうしょ",
        "meaning": "Receipt",
        "meaningNepali": "रसिद / भर्पाई",
        "kanjiCharacters": [
          "領",
          "収",
          "書"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "領収書を使います。",
            "reading": "りょうしゅうしょをつかいます。",
            "english": "Use Receipt.",
            "nepali": "उदाहरण: रसिद / भर्पाई।"
          }
        ]
      },
      {
        "id": "N3-CH02-003",
        "lesson": 52,
        "level": "N3",
        "word": "一戸建て",
        "reading": "いっこだて",
        "meaning": "Detached house",
        "meaningNepali": "छुट्टै बनेको घर",
        "kanjiCharacters": [
          "一",
          "戸",
          "建"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "一戸建てを使います。",
            "reading": "いっこだてをつかいます。",
            "english": "Use Detached house.",
            "nepali": "उदाहरण: छुट्टै बनेको घर।"
          }
        ]
      },
      {
        "id": "N3-CH02-004",
        "lesson": 52,
        "level": "N3",
        "word": "家具",
        "reading": "かぐ",
        "meaning": "Furniture",
        "meaningNepali": "फर्निचर",
        "kanjiCharacters": [
          "家",
          "具"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "家具を使います。",
            "reading": "かぐをつかいます。",
            "english": "Use Furniture.",
            "nepali": "उदाहरण: फर्निचर।"
          }
        ]
      },
      {
        "id": "N3-CH02-005",
        "lesson": 52,
        "level": "N3",
        "word": "費やす",
        "reading": "ついやす",
        "meaning": "To spend / To consume",
        "meaningNepali": "खर्च गर्नु / समय बिताउनु",
        "kanjiCharacters": [
          "費"
        ],
        "partOfSpeech": "Verb",
        "grammarSentences": [
          {
            "japanese": "費やすを使います。",
            "reading": "ついやすをつかいます。",
            "english": "Use To spend / To consume.",
            "nepali": "उदाहरण: खर्च गर्नु / समय बिताउनु।"
          }
        ]
      }
    ],
    "grammarGuides": [
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
    "chapterNumber": 3,
    "title": "Visiting Friends & School Life",
    "titleJapanese": "訪問・学校生活",
    "theme": "Hospitality, academics, campus interaction",
    "vocabulary": [
      {
        "id": "N3-CH03-001",
        "lesson": 53,
        "level": "N3",
        "word": "歓迎",
        "reading": "かんげい",
        "meaning": "Welcome",
        "meaningNepali": "स्वागत",
        "kanjiCharacters": [
          "歓",
          "迎"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "歓迎を使います。",
            "reading": "かんげいをつかいます。",
            "english": "Use Welcome.",
            "nepali": "उदाहरण: स्वागत।"
          }
        ]
      },
      {
        "id": "N3-CH03-002",
        "lesson": 53,
        "level": "N3",
        "word": "都合",
        "reading": "つごう",
        "meaning": "Convenience / Circumstances",
        "meaningNepali": "अनुकूलता / समय",
        "kanjiCharacters": [
          "都",
          "合"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "都合を使います。",
            "reading": "つごうをつかいます。",
            "english": "Use Convenience / Circumstances.",
            "nepali": "उदाहरण: अनुकूलता / समय।"
          }
        ]
      },
      {
        "id": "N3-CH03-003",
        "lesson": 53,
        "level": "N3",
        "word": "居眠り",
        "reading": "いねむり",
        "meaning": "Dozing off / Nodding off",
        "meaningNepali": "झुक्नु / निदाउनु",
        "kanjiCharacters": [
          "居",
          "眠"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "居眠りを使います。",
            "reading": "いねむりをつかいます。",
            "english": "Use Dozing off / Nodding off.",
            "nepali": "उदाहरण: झुक्नु / निदाउनु।"
          }
        ]
      },
      {
        "id": "N3-CH03-004",
        "lesson": 53,
        "level": "N3",
        "word": "成績",
        "reading": "せいせき",
        "meaning": "Grades / Academic record",
        "meaningNepali": "प्राप्तांक / नतिजा",
        "kanjiCharacters": [
          "成",
          "績"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "成績を使います。",
            "reading": "せいせきをつかいます。",
            "english": "Use Grades / Academic record.",
            "nepali": "उदाहरण: प्राप्तांक / नतिजा।"
          }
        ]
      },
      {
        "id": "N3-CH03-005",
        "lesson": 53,
        "level": "N3",
        "word": "教授",
        "reading": "きょうじゅ",
        "meaning": "Professor",
        "meaningNepali": "प्राध्यापक",
        "kanjiCharacters": [
          "教",
          "授"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "教授を使います。",
            "reading": "きょうじゅをつかいます。",
            "english": "Use Professor.",
            "nepali": "उदाहरण: प्राध्यापक।"
          }
        ]
      }
    ],
    "grammarGuides": [
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
    "chapterNumber": 4,
    "title": "Dining Out & Culinary Culture",
    "titleJapanese": "外食・料理",
    "theme": "Restaurants, cooking, ingredients",
    "vocabulary": [
      {
        "id": "N3-CH04-001",
        "lesson": 54,
        "level": "N3",
        "word": "看板",
        "reading": "かんばん",
        "meaning": "Signboard / Menu board",
        "meaningNepali": "साइनबोर्ड / बोर्ड",
        "kanjiCharacters": [
          "看",
          "板"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "看板を使います。",
            "reading": "かんばんをつかいます。",
            "english": "Use Signboard / Menu board.",
            "nepali": "उदाहरण: साइनबोर्ड / बोर्ड।"
          }
        ]
      },
      {
        "id": "N3-CH04-002",
        "lesson": 54,
        "level": "N3",
        "word": "行列",
        "reading": "ぎょうれつ",
        "meaning": "Line / Queue",
        "meaningNepali": "लाइन / लहर",
        "kanjiCharacters": [
          "行",
          "列"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "行列を使います。",
            "reading": "ぎょうれつをつかいます。",
            "english": "Use Line / Queue.",
            "nepali": "उदाहरण: लाइन / लहर।"
          }
        ]
      },
      {
        "id": "N3-CH04-003",
        "lesson": 54,
        "level": "N3",
        "word": "材料",
        "reading": "ざいりょう",
        "meaning": "Ingredients / Materials",
        "meaningNepali": "सामग्री / मरमसला",
        "kanjiCharacters": [
          "材",
          "料"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "材料を使います。",
            "reading": "ざいりょうをつかいます。",
            "english": "Use Ingredients / Materials.",
            "nepali": "उदाहरण: सामग्री / मरमसला।"
          }
        ]
      },
      {
        "id": "N3-CH04-004",
        "lesson": 54,
        "level": "N3",
        "word": "調味料",
        "reading": "ちょうみりょう",
        "meaning": "Seasoning / Condiments",
        "meaningNepali": "मसला / स्वाद बढाउने चीज",
        "kanjiCharacters": [
          "調",
          "味",
          "料"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "調味料を使います。",
            "reading": "ちょうみりょうをつかいます。",
            "english": "Use Seasoning / Condiments.",
            "nepali": "उदाहरण: मसला / स्वाद बढाउने चीज।"
          }
        ]
      },
      {
        "id": "N3-CH04-005",
        "lesson": 54,
        "level": "N3",
        "word": "沸騰",
        "reading": "ふっとう",
        "meaning": "Boiling / Bubbling up",
        "meaningNepali": "उम्लिनु",
        "kanjiCharacters": [
          "沸",
          "騰"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "沸騰を使います。",
            "reading": "ふっとうをつかいます。",
            "english": "Use Boiling / Bubbling up.",
            "nepali": "उदाहरण: उम्लिनु।"
          }
        ]
      }
    ],
    "grammarGuides": [
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
    "chapterNumber": 5,
    "title": "Physical Health & Medical Care",
    "titleJapanese": "健康・医療",
    "theme": "Wellness, symptoms, treatment",
    "vocabulary": [
      {
        "id": "N3-CH05-001",
        "lesson": 55,
        "level": "N3",
        "word": "診察",
        "reading": "しんさつ",
        "meaning": "Medical examination",
        "meaningNepali": "स्वास्थ्य जाँच",
        "kanjiCharacters": [
          "診",
          "察"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "診察を使います。",
            "reading": "しんさつをつかいます。",
            "english": "Use Medical examination.",
            "nepali": "उदाहरण: स्वास्थ्य जाँच।"
          }
        ]
      },
      {
        "id": "N3-CH05-002",
        "lesson": 55,
        "level": "N3",
        "word": "症状",
        "reading": "しょうじょう",
        "meaning": "Symptoms",
        "meaningNepali": "लक्षण",
        "kanjiCharacters": [
          "症",
          "状"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "症状を使います。",
            "reading": "しょうじょうをつかいます。",
            "english": "Use Symptoms.",
            "nepali": "उदाहरण: लक्षण।"
          }
        ]
      },
      {
        "id": "N3-CH05-003",
        "lesson": 55,
        "level": "N3",
        "word": "副作用",
        "reading": "ふくさよう",
        "meaning": "Side effect",
        "meaningNepali": "साइड इफेक्ट / पार्श्व प्रभाव",
        "kanjiCharacters": [
          "副",
          "作",
          "用"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "副作用を使います。",
            "reading": "ふくさようをつかいます。",
            "english": "Use Side effect.",
            "nepali": "उदाहरण: साइड इफेक्ट / पार्श्व प्रभाव।"
          }
        ]
      },
      {
        "id": "N3-CH05-004",
        "lesson": 55,
        "level": "N3",
        "word": "予防",
        "reading": "よぼう",
        "meaning": "Prevention / Precaution",
        "meaningNepali": "रोकथाम / पूर्वसावधानी",
        "kanjiCharacters": [
          "予",
          "防"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "予防を使います。",
            "reading": "よぼうをつかいます。",
            "english": "Use Prevention / Precaution.",
            "nepali": "उदाहरण: रोकथाम / पूर्वसावधानी।"
          }
        ]
      },
      {
        "id": "N3-CH05-005",
        "lesson": 55,
        "level": "N3",
        "word": "回復",
        "reading": "かいふく",
        "meaning": "Recovery / Recuperation",
        "meaningNepali": "सुधार / निको हुनु",
        "kanjiCharacters": [
          "回",
          "復"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "回復を使います。",
            "reading": "かいふくをつかいます。",
            "english": "Use Recovery / Recuperation.",
            "nepali": "उदाहरण: सुधार / निको हुनु।"
          }
        ]
      }
    ],
    "grammarGuides": [
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
    "chapterNumber": 6,
    "title": "Town Announcements & Transport",
    "titleJapanese": "街のアナウンス・交通",
    "theme": "Public transit, detours, announcements",
    "vocabulary": [
      {
        "id": "N3-CH06-001",
        "lesson": 56,
        "level": "N3",
        "word": "車掌",
        "reading": "しゃしょう",
        "meaning": "Train conductor",
        "meaningNepali": "ट्रेन कन्डक्टर",
        "kanjiCharacters": [
          "車",
          "掌"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "車掌を使います。",
            "reading": "しゃしょうをつかいます。",
            "english": "Use Train conductor.",
            "nepali": "उदाहरण: ट्रेन कन्डक्टर।"
          }
        ]
      },
      {
        "id": "N3-CH06-002",
        "lesson": 56,
        "level": "N3",
        "word": "往復",
        "reading": "おうふく",
        "meaning": "Round trip",
        "meaningNepali": "आउने जाने (दुवैतर्फी टिकट)",
        "kanjiCharacters": [
          "往",
          "復"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "往復を使います。",
            "reading": "おうふくをつかいます。",
            "english": "Use Round trip.",
            "nepali": "उदाहरण: आउने जाने (दुवैतर्फी टिकट)।"
          }
        ]
      },
      {
        "id": "N3-CH06-003",
        "lesson": 56,
        "level": "N3",
        "word": "混雑",
        "reading": "こんざつ",
        "meaning": "Crowdedness / Congestion",
        "meaningNepali": "भिडभाड / ठेलमठेल",
        "kanjiCharacters": [
          "混",
          "雑"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "混雑を使います。",
            "reading": "こんざつをつかいます。",
            "english": "Use Crowdedness / Congestion.",
            "nepali": "उदाहरण: भिडभाड / ठेलमठेल।"
          }
        ]
      },
      {
        "id": "N3-CH06-004",
        "lesson": 56,
        "level": "N3",
        "word": "遠回り",
        "reading": "とおまわり",
        "meaning": "Detour",
        "meaningNepali": "घुमाउरो बाटो",
        "kanjiCharacters": [
          "遠",
          "回"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "遠回りを使います。",
            "reading": "とおまわりをつかいます。",
            "english": "Use Detour.",
            "nepali": "उदाहरण: घुमाउरो बाटो।"
          }
        ]
      },
      {
        "id": "N3-CH06-005",
        "lesson": 56,
        "level": "N3",
        "word": "踏切",
        "reading": "ふみきり",
        "meaning": "Railway crossing",
        "meaningNepali": "रेलवे क्रसिङ",
        "kanjiCharacters": [
          "踏",
          "切"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "踏切を使います。",
            "reading": "ふみきりをつかいます。",
            "english": "Use Railway crossing.",
            "nepali": "उदाहरण: रेलवे क्रसिङ।"
          }
        ]
      }
    ],
    "grammarGuides": [
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
    "chapterNumber": 7,
    "title": "Festivals, Events & Local Traditions",
    "titleJapanese": "祭り・行事",
    "theme": "Culture, parades, street stalls",
    "vocabulary": [
      {
        "id": "N3-CH07-001",
        "lesson": 57,
        "level": "N3",
        "word": "屋台",
        "reading": "やたい",
        "meaning": "Food stall / Street kiosk",
        "meaningNepali": "सडक पसल / ठेला",
        "kanjiCharacters": [
          "屋",
          "台"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "屋台を使います。",
            "reading": "やたいをつかいます。",
            "english": "Use Food stall / Street kiosk.",
            "nepali": "उदाहरण: सडक पसल / ठेला।"
          }
        ]
      },
      {
        "id": "N3-CH07-002",
        "lesson": 57,
        "level": "N3",
        "word": "行列",
        "reading": "ぎょうれつ",
        "meaning": "Procession / Parade",
        "meaningNepali": "र्याली / झाँकी",
        "kanjiCharacters": [
          "行",
          "列"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "行列を使います。",
            "reading": "ぎょうれつをつかいます。",
            "english": "Use Procession / Parade.",
            "nepali": "उदाहरण: र्याली / झाँकी।"
          }
        ]
      },
      {
        "id": "N3-CH07-003",
        "lesson": 57,
        "level": "N3",
        "word": "伝統",
        "reading": "でんとう",
        "meaning": "Tradition / Heritage",
        "meaningNepali": "परम्परा",
        "kanjiCharacters": [
          "伝",
          "統"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "伝統を使います。",
            "reading": "でんとうをつかいます。",
            "english": "Use Tradition / Heritage.",
            "nepali": "उदाहरण: परम्परा।"
          }
        ]
      },
      {
        "id": "N3-CH07-004",
        "lesson": 57,
        "level": "N3",
        "word": "にぎやか",
        "reading": "にぎやか",
        "meaning": "Lively / Bustling",
        "meaningNepali": "चहलपहल भएको",
        "kanjiCharacters": [
          "賑"
        ],
        "partOfSpeech": "Na-Adj",
        "grammarSentences": [
          {
            "japanese": "にぎやかを使います。",
            "reading": "にぎやかをつかいます。",
            "english": "Use Lively / Bustling.",
            "nepali": "उदाहरण: चहलपहल भएको।"
          }
        ]
      },
      {
        "id": "N3-CH07-005",
        "lesson": 57,
        "level": "N3",
        "word": "開催",
        "reading": "かいさい",
        "meaning": "Holding an event / Hosting",
        "meaningNepali": "आयोजना गर्नु",
        "kanjiCharacters": [
          "開",
          "催"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "開催を使います。",
            "reading": "かいさいをつかいます。",
            "english": "Use Holding an event / Hosting.",
            "nepali": "उदाहरण: आयोजना गर्नु।"
          }
        ]
      }
    ],
    "grammarGuides": [
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
    "chapterNumber": 8,
    "title": "Sports & Leisure Time",
    "titleJapanese": "スポーツ・余暇",
    "theme": "Matches, relaxation, recreation",
    "vocabulary": [
      {
        "id": "N3-CH08-001",
        "lesson": 58,
        "level": "N3",
        "word": "勝敗",
        "reading": "しょうはい",
        "meaning": "Victory or defeat / Outcome",
        "meaningNepali": "हारजीत / नतिजा",
        "kanjiCharacters": [
          "勝",
          "敗"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "勝敗を使います。",
            "reading": "しょうはいをつかいます。",
            "english": "Use Victory or defeat / Outcome.",
            "nepali": "उदाहरण: हारजीत / नतिजा।"
          }
        ]
      },
      {
        "id": "N3-CH08-002",
        "lesson": 58,
        "level": "N3",
        "word": "応援",
        "reading": "おうえん",
        "meaning": "Cheering / Support",
        "meaningNepali": "हौसला / समर्थन",
        "kanjiCharacters": [
          "応",
          "援"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "応援を使います。",
            "reading": "おうえんをつかいます。",
            "english": "Use Cheering / Support.",
            "nepali": "उदाहरण: हौसला / समर्थन।"
          }
        ]
      },
      {
        "id": "N3-CH08-003",
        "lesson": 58,
        "level": "N3",
        "word": "娯楽",
        "reading": "ごらく",
        "meaning": "Entertainment / Amusement",
        "meaningNepali": "मनोरञ्जन",
        "kanjiCharacters": [
          "娯",
          "楽"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "娯楽を使います。",
            "reading": "ごらくをつかいます。",
            "english": "Use Entertainment / Amusement.",
            "nepali": "उदाहरण: मनोरञ्जन।"
          }
        ]
      },
      {
        "id": "N3-CH08-004",
        "lesson": 58,
        "level": "N3",
        "word": "息抜き",
        "reading": "いきぬき",
        "meaning": "Breather / Relaxation",
        "meaningNepali": "थकाइ मेट्नु / विश्राम",
        "kanjiCharacters": [
          "息",
          "抜"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "息抜きを使います。",
            "reading": "いきぬきをつかいます。",
            "english": "Use Breather / Relaxation.",
            "nepali": "उदाहरण: थकाइ मेट्नु / विश्राम।"
          }
        ]
      },
      {
        "id": "N3-CH08-005",
        "lesson": 58,
        "level": "N3",
        "word": "競技",
        "reading": "きょうぎ",
        "meaning": "Game / Match / Contest",
        "meaningNepali": "प्रतियोगिता / खेल",
        "kanjiCharacters": [
          "競",
          "技"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "競技を使います。",
            "reading": "きょうぎをつかいます。",
            "english": "Use Game / Match / Contest.",
            "nepali": "उदाहरण: प्रतियोगिता / खेल।"
          }
        ]
      }
    ],
    "grammarGuides": [
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
    "chapterNumber": 9,
    "title": "Weather Changes & Natural Environment",
    "titleJapanese": "天候・自然",
    "theme": "Climate, disasters, observations",
    "vocabulary": [
      {
        "id": "N3-CH09-001",
        "lesson": 59,
        "level": "N3",
        "word": "雷",
        "reading": "かみなり",
        "meaning": "Thunder / Lightning",
        "meaningNepali": "चट्याङ / गर्जन",
        "kanjiCharacters": [
          "雷"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "雷を使います。",
            "reading": "かみなりをつかいます。",
            "english": "Use Thunder / Lightning.",
            "nepali": "उदाहरण: चट्याङ / गर्जन।"
          }
        ]
      },
      {
        "id": "N3-CH09-002",
        "lesson": 59,
        "level": "N3",
        "word": "異常気象",
        "reading": "いじょうきしょう",
        "meaning": "Abnormal weather",
        "meaningNepali": "अस्वाभाविक मौसम",
        "kanjiCharacters": [
          "異",
          "常",
          "気",
          "象"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "異常気象を使います。",
            "reading": "いじょうきしょうをつかいます。",
            "english": "Use Abnormal weather.",
            "nepali": "उदाहरण: अस्वाभाविक मौसम।"
          }
        ]
      },
      {
        "id": "N3-CH09-003",
        "lesson": 59,
        "level": "N3",
        "word": "湿気",
        "reading": "しっけ",
        "meaning": "Moisture / Humidity",
        "meaningNepali": "चिसोपन / ओस",
        "kanjiCharacters": [
          "湿",
          "気"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "湿気を使います。",
            "reading": "しっけをつかいます。",
            "english": "Use Moisture / Humidity.",
            "nepali": "उदाहरण: चिसोपन / ओस।"
          }
        ]
      },
      {
        "id": "N3-CH09-004",
        "lesson": 59,
        "level": "N3",
        "word": "観測",
        "reading": "かんそく",
        "meaning": "Observation / Surveying",
        "meaningNepali": "अवलोकन / मापन",
        "kanjiCharacters": [
          "観",
          "測"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "観測を使います。",
            "reading": "かんそくをつかいます。",
            "english": "Use Observation / Surveying.",
            "nepali": "उदाहरण: अवलोकन / मापन।"
          }
        ]
      },
      {
        "id": "N3-CH09-005",
        "lesson": 59,
        "level": "N3",
        "word": "避難",
        "reading": "ひなん",
        "meaning": "Evacuation / Seeking refuge",
        "meaningNepali": "सुरक्षित ठाउँमा भाग्राम/सर्नु",
        "kanjiCharacters": [
          "避",
          "難"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "避難を使います。",
            "reading": "ひなんをつかいます。",
            "english": "Use Evacuation / Seeking refuge.",
            "nepali": "उदाहरण: सुरक्षित ठाउँमा भाग्राम/सर्नु।"
          }
        ]
      }
    ],
    "grammarGuides": [
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
    "chapterNumber": 10,
    "title": "Business Operations & Workplace Communication",
    "titleJapanese": "仕事・職場",
    "theme": "Office work, approvals, risk",
    "vocabulary": [
      {
        "id": "N3-CH10-001",
        "lesson": 60,
        "level": "N3",
        "word": "出張",
        "reading": "しゅっちょう",
        "meaning": "Business trip",
        "meaningNepali": "व्यापारिक भ्रमण",
        "kanjiCharacters": [
          "出",
          "張"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "出張を使います。",
            "reading": "しゅっちょうをつかいます。",
            "english": "Use Business trip.",
            "nepali": "उदाहरण: व्यापारिक भ्रमण।"
          }
        ]
      },
      {
        "id": "N3-CH10-002",
        "lesson": 60,
        "level": "N3",
        "word": "日程",
        "reading": "にってい",
        "meaning": "Schedule / Agenda",
        "meaningNepali": "कार्यतालिका",
        "kanjiCharacters": [
          "日",
          "程"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "日程を使います。",
            "reading": "にっていをつかいます。",
            "english": "Use Schedule / Agenda.",
            "nepali": "उदाहरण: कार्यतालिका।"
          }
        ]
      },
      {
        "id": "N3-CH10-003",
        "lesson": 60,
        "level": "N3",
        "word": "上司",
        "reading": "じょうし",
        "meaning": "Boss / Superior",
        "meaningNepali": "हाकिम / वरिष्ठ",
        "kanjiCharacters": [
          "上",
          "司"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "上司を使います。",
            "reading": "じょうしをつかいます。",
            "english": "Use Boss / Superior.",
            "nepali": "उदाहरण: हाकिम / वरिष्ठ।"
          }
        ]
      },
      {
        "id": "N3-CH10-004",
        "lesson": 60,
        "level": "N3",
        "word": "妥協",
        "reading": "だきょう",
        "meaning": "Compromise",
        "meaningNepali": "सम्झौता / सहमति",
        "kanjiCharacters": [
          "妥",
          "協"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "妥協を使います。",
            "reading": "だきょうをつかいます。",
            "english": "Use Compromise.",
            "nepali": "उदाहरण: सम्झौता / सहमति।"
          }
        ]
      },
      {
        "id": "N3-CH10-005",
        "lesson": 60,
        "level": "N3",
        "word": "承認",
        "reading": "しょうにん",
        "meaning": "Approval / Sanction",
        "meaningNepali": "स्वीकृति / अनुमति",
        "kanjiCharacters": [
          "承",
          "認"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "承認を使います。",
            "reading": "しょうにんをつかいます。",
            "english": "Use Approval / Sanction.",
            "nepali": "उदाहरण: स्वीकृति / अनुमति।"
          }
        ]
      }
    ],
    "grammarGuides": [
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
    "chapterNumber": 11,
    "title": "Advanced Social Register & Honorifics",
    "titleJapanese": "敬語・社会",
    "theme": "Keigo, politeness, formal business",
    "vocabulary": [
      {
        "id": "N3-CH11-001",
        "lesson": 61,
        "level": "N3",
        "word": "恐縮",
        "reading": "きょうしゅく",
        "meaning": "Feeling obliged / Sorry to trouble",
        "meaningNepali": "आभारी महसुस / क्षमाप्रार्थी",
        "kanjiCharacters": [
          "恐",
          "縮"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "恐縮を使います。",
            "reading": "きょうしゅくをつかいます。",
            "english": "Use Feeling obliged / Sorry to trouble.",
            "nepali": "उदाहरण: आभारी महसुस / क्षमाप्रार्थी।"
          }
        ]
      },
      {
        "id": "N3-CH11-002",
        "lesson": 61,
        "level": "N3",
        "word": "ご丁寧",
        "reading": "ごていねい",
        "meaning": "Polite / Courteous",
        "meaningNepali": "नम्र / शिष्ट",
        "kanjiCharacters": [
          "丁",
          "寧"
        ],
        "partOfSpeech": "Na-Adj",
        "grammarSentences": [
          {
            "japanese": "ご丁寧を使います。",
            "reading": "ごていねいをつかいます。",
            "english": "Use Polite / Courteous.",
            "nepali": "उदाहरण: नम्र / शिष्ट।"
          }
        ]
      },
      {
        "id": "N3-CH11-003",
        "lesson": 61,
        "level": "N3",
        "word": "拝見",
        "reading": "はいけん",
        "meaning": "Humbly looking at / Seeing",
        "meaningNepali": "नम्रतापूर्वक हेर्नु",
        "kanjiCharacters": [
          "拝",
          "見"
        ],
        "partOfSpeech": "Verb",
        "grammarSentences": [
          {
            "japanese": "拝見を使います。",
            "reading": "はいけんをつかいます。",
            "english": "Use Humbly looking at / Seeing.",
            "nepali": "उदाहरण: नम्रतापूर्वक हेर्नु।"
          }
        ]
      },
      {
        "id": "N3-CH11-004",
        "lesson": 61,
        "level": "N3",
        "word": "存じる",
        "reading": "ぞんじる",
        "meaning": "Humbly knowing / Thinking",
        "meaningNepali": "नम्रतापूर्वक सोच्नु/थाहा पाउनु",
        "kanjiCharacters": [
          "存"
        ],
        "partOfSpeech": "Verb",
        "grammarSentences": [
          {
            "japanese": "存じるを使います。",
            "reading": "ぞんじるをつかいます。",
            "english": "Use Humbly knowing / Thinking.",
            "nepali": "उदाहरण: नम्रतापूर्वक सोच्नु/थाहा पाउनु।"
          }
        ]
      },
      {
        "id": "N3-CH11-005",
        "lesson": 61,
        "level": "N3",
        "word": "お越しになる",
        "reading": "おこしになる",
        "meaning": "Honorific for coming/arriving",
        "meaningNepali": "सवारी हुनु / आउनु (आदरार्थी)",
        "kanjiCharacters": [
          "越"
        ],
        "partOfSpeech": "Verb",
        "grammarSentences": [
          {
            "japanese": "お越しになるを使います。",
            "reading": "おこしになるをつかいます。",
            "english": "Use Honorific for coming/arriving.",
            "nepali": "उदाहरण: सवारी हुनु / आउनु (आदरार्थी)।"
          }
        ]
      }
    ],
    "grammarGuides": [
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
    "chapterNumber": 12,
    "title": "Abstract Ideas & Final Test Reviews",
    "titleJapanese": "抽象的概念・総まとめ",
    "theme": "Advanced concepts, review, logic",
    "vocabulary": [
      {
        "id": "N3-CH12-001",
        "lesson": 62,
        "level": "N3",
        "word": "矛盾",
        "reading": "むじゅん",
        "meaning": "Contradiction",
        "meaningNepali": "बाझिनु / विरोधाभास",
        "kanjiCharacters": [
          "矛",
          "盾"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "矛盾を使います。",
            "reading": "むじゅんをつかいます。",
            "english": "Use Contradiction.",
            "nepali": "उदाहरण: बाझिनु / विरोधाभास।"
          }
        ]
      },
      {
        "id": "N3-CH12-002",
        "lesson": 62,
        "level": "N3",
        "word": "核心",
        "reading": "かくしん",
        "meaning": "Core / Heart of the matter",
        "meaningNepali": "मुख्य भाग / चुरो कुरा",
        "kanjiCharacters": [
          "核",
          "心"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "核心を使います。",
            "reading": "かくしんをつかいます。",
            "english": "Use Core / Heart of the matter.",
            "nepali": "उदाहरण: मुख्य भाग / चुरो कुरा।"
          }
        ]
      },
      {
        "id": "N3-CH12-003",
        "lesson": 62,
        "level": "N3",
        "word": "客観的",
        "reading": "きゃっかんてき",
        "meaning": "Objective / Unbiased",
        "meaningNepali": "वस्तुनिष्ठ / निष्पक्ष",
        "kanjiCharacters": [
          "客",
          "観",
          "的"
        ],
        "partOfSpeech": "Na-Adj",
        "grammarSentences": [
          {
            "japanese": "客観的を使います。",
            "reading": "きゃっかんてきをつかいます。",
            "english": "Use Objective / Unbiased.",
            "nepali": "उदाहरण: वस्तुनिष्ठ / निष्पक्ष।"
          }
        ]
      },
      {
        "id": "N3-CH12-004",
        "lesson": 62,
        "level": "N3",
        "word": "成果",
        "reading": "せいか",
        "meaning": "Fruit of labor / Positive results",
        "meaningNepali": "उपलब्धि / प्रतिफल",
        "kanjiCharacters": [
          "成",
          "果"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "成果を使います。",
            "reading": "せいかをつかいます。",
            "english": "Use Fruit of labor / Positive results.",
            "nepali": "उदाहरण: उपलब्धि / प्रतिफल।"
          }
        ]
      },
      {
        "id": "N3-CH12-005",
        "lesson": 62,
        "level": "N3",
        "word": "一連",
        "reading": "いちれん",
        "meaning": "A series / Sequence of events",
        "meaningNepali": "श्रृंखला / घटनाक्रम",
        "kanjiCharacters": [
          "一",
          "連"
        ],
        "partOfSpeech": "Noun",
        "grammarSentences": [
          {
            "japanese": "一連を使います。",
            "reading": "いちれんをつかいます。",
            "english": "Use A series / Sequence of events.",
            "nepali": "उदाहरण: श्रृंखला / घटनाक्रम।"
          }
        ]
      }
    ],
    "grammarGuides": [
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
  }
];
