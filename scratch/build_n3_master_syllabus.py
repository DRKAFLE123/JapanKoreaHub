import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Complete 12-Chapter Data mapping with English & Nepali definitions
chapters_data = [
    # ── CHAPTER 1 ──
    {
        "chapterNumber": 1,
        "title": "Introducing Yourself & Daily Routines",
        "titleJapanese": "自己紹介・日常生活",
        "theme": "Personal identity, habits, daily schedule",
        "vocab": [
            { "word": "お辞儀", "reading": "おじぎ", "meaning": "Bowing / Greeting", "meaningNepali": "निहुरिएर नमस्कार गर्नु", "kanji": ["辞", "儀"], "pos": "Noun" },
            { "word": "向かい合う", "reading": "むかいあう", "meaning": "To face each other", "meaningNepali": "आमनेसामने हुनु", "kanji": ["向", "合"], "pos": "Verb" },
            { "word": "家事", "reading": "かじ", "meaning": "Housework / Domestic chores", "meaningNepali": "घरको काम", "kanji": ["家", "事"], "pos": "Noun" },
            { "word": "規則正しい", "reading": "きそくただしい", "meaning": "Regular / Systematic", "meaningNepali": "नियमित / नियमबद्ध", "kanji": ["規", "則", "正"], "pos": "I-Adj" },
            { "word": "早起き", "reading": "はやおき", "meaning": "Waking up early", "meaningNepali": "बिहानै उठ्ने बानी", "kanji": ["早", "起"], "pos": "Noun" }
        ],
        "grammar": [
            {
                "title": "1. While a state lasts 〜うちに",
                "pattern": "[Verb dictionary / Adj / Nの] + うちに",
                "explanationEnglish": "Doing something while a current condition lasts, before it changes.",
                "explanationNepali": "कुनै अवस्था कायम रहँदै गर्दा (परिवर्तन हुनुअघि) काम गर्नु।",
                "examples": [
                    { "target": "若いうちに、いろいろな経験をしたい。", "reading": "わかいうちに、いろいろなけいけんをしたい。", "english": "While I am young, I want to gain various experiences.", "nepali": "जवान छँदै अनेकौँ अनुभव हासिल गर्न चाहन्छु।" }
                ]
            },
            {
                "title": "2. As soon as / The moment 〜た途端",
                "pattern": "[Verb た-form] + 途端（に）",
                "explanationEnglish": "Just at the moment something happened, an unexpected event occurred.",
                "explanationNepali": "बित्तिकै / त्यही क्षण (अप्रत्याशित घटना हुनु)।",
                "examples": [
                    { "target": "窓を開けた途端、強い風が入ってきた。", "reading": "まどをあけたとたん、つよいかぜがはいってきた。", "english": "The moment I opened the window, a strong wind blew in.", "nepali": "झ्याल खोल्ने बित्तिकै बलियो हावा भित्र आयो।" }
                ]
            },
            {
                "title": "3. Turning point 〜をきっかけに",
                "pattern": "[Noun / Verbの] + をきっかけに（して）",
                "explanationEnglish": "Using an event as a trigger or turning point to start something new.",
                "explanationNepali": "~ लाई अवसर/मोड बनाएर (नयाँ कुरा सुरुवात गर्नु)।",
                "examples": [
                    { "target": "日本のアニメを見たのをきっかけに、日本語の勉強を始めた。", "reading": "にほんのあにめをみたのをきっかけに、にほんごのべんきょうをはじめた。", "english": "Triggered by watching Japanese anime, I started studying Japanese.", "nepali": "जापानी एनिमे हेरेको अवसरलाई मोड बनाएर जापानी भाषा पढ्न थालेँ।" }
                ]
            },
            {
                "title": "4. In the middle of 〜最中に",
                "pattern": "[Verb ている / Nの] + 最中に",
                "explanationEnglish": "Right in the middle of doing an action when an interruption happens.",
                "explanationNepali": "कुनै काम गरिरहेकै मध्य समयमा (बाधा पर्नु)।",
                "examples": [
                    { "target": "食事の最中に電話がかかってきた。", "reading": "しょくじのさいちゅうにでんわがかかってきた。", "english": "A phone call came right in the middle of a meal.", "nepali": "खाना खाइरहेकै बेला फोन आयो।" }
                ]
            }
        ]
    },

    # ── CHAPTER 2 ──
    {
        "chapterNumber": 2,
        "title": "Shopping, Consumer Habits & Housing",
        "titleJapanese": "買い物・住居",
        "theme": "Transactions, bills, furniture & property",
        "vocab": [
            { "word": "勘定", "reading": "かんじょう", "meaning": "Bill / Check / Calculation", "meaningNepali": "बिल / हिसाब", "kanji": ["勘", "定"], "pos": "Noun" },
            { "word": "領収書", "reading": "りょうしゅうしょ", "meaning": "Receipt", "meaningNepali": "रसिद / भर्पाई", "kanji": ["領", "収", "書"], "pos": "Noun" },
            { "word": "一戸建て", "reading": "いっこだて", "meaning": "Detached house", "meaningNepali": "छुट्टै बनेको घर", "kanji": ["一", "戸", "建"], "pos": "Noun" },
            { "word": "家具", "reading": "かぐ", "meaning": "Furniture", "meaningNepali": "फर्निचर", "kanji": ["家", "具"], "pos": "Noun" },
            { "word": "費やす", "reading": "ついやす", "meaning": "To spend / To consume", "meaningNepali": "खर्च गर्नु / समय बिताउनु", "kanji": ["費"], "pos": "Verb" }
        ],
        "grammar": [
            {
                "title": "1. Contrast / Towards 〜に対して",
                "pattern": "[Noun / Plain form] + に対して",
                "explanationEnglish": "In contrast to A, B is different; or directed towards an object/person.",
                "explanationNepali": "~ को तुलनामा / ~ प्रति।",
                "examples": [
                    { "target": "兄が活発なのに対して、弟は大人しい。", "reading": "あにがかっぱつなのに対して、おとうとはおとなしい。", "english": "In contrast to his active elder brother, the younger brother is quiet.", "nepali": "दाइ चञ्चल भएको तुलनामा भाइ शान्त छ।" }
                ]
            },
            {
                "title": "2. Standpoint 〜にとって",
                "pattern": "[Noun] + にとって",
                "explanationEnglish": "From the standpoint of someone ('for... / from the perspective of').",
                "explanationNepali": "~ का लागि / ~ को दृष्टिकोणबाट।",
                "examples": [
                    { "target": "私にとって、家族が一番大切だ。", "reading": "わたしにとって、かぞくがいちばんたいせつだ。", "english": "For me, family is the most important.", "nepali": "मेरो लागि परिवार नै सबैभन्दा महत्त्वपूर्ण हो।" }
                ]
            },
            {
                "title": "3. Regarding 〜に関する / 〜に関して",
                "pattern": "[Noun] + に関して / に関する [Noun]",
                "explanationEnglish": "About / regarding a specific topic or field of study.",
                "explanationNepali": "~ को बारेमा / ~ सँग सम्बन्धित।",
                "examples": [
                    { "target": "環境問題に関する記事を読む。", "reading": "かんきょうもんだいにかんするきじをよむ。", "english": "Read an article regarding environmental issues.", "nepali": "वातावरणीय समस्यासम्बन्धी लेख पढ्नु।" }
                ]
            },
            {
                "title": "4. Surrounding an Issue 〜をめぐって",
                "pattern": "[Noun] + をめぐって",
                "explanationEnglish": "Concerning / over a dispute, debate, or rumor among multiple people.",
                "explanationNepali": "~ को विवाद वा विषयलाई लिएर।",
                "examples": [
                    { "target": "遺産の分配をめぐって兄弟が争った。", "reading": "いさんのぶんぱいをめぐってきょうだいがあらそった。", "english": "Brothers fought over the distribution of the inheritance.", "nepali": "सम्पत्ति बाँडफाँडको विषयलाई लिएर दाजुभाइ झगडा गरे।" }
                ]
            }
        ]
    },

    # ── CHAPTER 3 ──
    {
        "chapterNumber": 3,
        "title": "Visiting Friends & School Life",
        "titleJapanese": "訪問・学校生活",
        "theme": "Hospitality, academics, campus interaction",
        "vocab": [
            { "word": "歓迎", "reading": "かんげい", "meaning": "Welcome", "meaningNepali": "स्वागत", "kanji": ["歓", "迎"], "pos": "Noun" },
            { "word": "都合", "reading": "つごう", "meaning": "Convenience / Circumstances", "meaningNepali": "अनुकूलता / समय", "kanji": ["都", "合"], "pos": "Noun" },
            { "word": "居眠り", "reading": "いねむり", "meaning": "Dozing off / Nodding off", "meaningNepali": "झुक्नु / निदाउनु", "kanji": ["居", "眠"], "pos": "Noun" },
            { "word": "成績", "reading": "せいせき", "meaning": "Grades / Academic record", "meaningNepali": "प्राप्तांक / नतिजा", "kanji": ["成", "績"], "pos": "Noun" },
            { "word": "教授", "reading": "きょうじゅ", "meaning": "Professor", "meaningNepali": "प्राध्यापक", "kanji": ["教", "授"], "pos": "Noun" }
        ],
        "grammar": [
            {
                "title": "1. Formal Setting Location 〜において",
                "pattern": "[Noun] + において（は）",
                "explanationEnglish": "In / at / on (formal marker for location, era, or field).",
                "explanationNepali": "~ मा / ~ को क्षेत्रमा (औपचारिक स्थान/अवधि)।",
                "examples": [
                    { "target": "現代社会において、インターネットは不可欠だ。", "reading": "げんだいしゃかいにおいて、インターネットはふかけつだ。", "english": "In modern society, the internet is indispensable.", "nepali": "आधुनिक समाजमा इन्टरनेट अपरिहार्य छ।" }
                ]
            },
            {
                "title": "2. Based On 〜に基づいて",
                "pattern": "[Noun] + に基づいて",
                "explanationEnglish": "Based on data, facts, laws, or principles.", "explanationNepali": "~ को आधारमा / ~ अनुसार।",
                "examples": [
                    { "target": "事実に基づいて報告書を作成した。", "reading": "じじつにもとづいてほうこくしょをさくせいした。", "english": "Created the report based on facts.", "nepali": "तथ्यको आधारमा प्रतिवेदन तयार गरियो।" }
                ]
            },
            {
                "title": "3. Through / Throughout 〜を通じて / 〜を通して",
                "pattern": "[Noun] + を通じて / を通して",
                "explanationEnglish": "Through the medium of; or throughout an entire time period.", "explanationNepali": "~ को माध्यमबाट / ~ भरि।",
                "examples": [
                    { "target": "友だちを通じて彼と知り合った。", "reading": "ともだちをつうじてかれとしりあった。", "english": "Got to know him through a friend.", "nepali": "साथीको माध्यमबाट उहाँसँग चिनजान भयो।" }
                ]
            },
            {
                "title": "4. In Response To 〜に応じて",
                "pattern": "[Noun] + に応じて",
                "explanationEnglish": "Depending on / in response to changes in situation or request.", "explanationNepali": "~ को आवश्यकता वा माग अनुसार।",
                "examples": [
                    { "target": "予算に応じてプランを選べます。", "reading": "よさんにおうじてプランをえらべます。", "english": "You can choose a plan depending on your budget.", "nepali": "बजेट अनुसार योजना रोज्न सक्नुहुन्छ।" }
                ]
            }
        ]
    },

    # ── CHAPTER 4 ──
    {
        "chapterNumber": 4,
        "title": "Dining Out & Culinary Culture",
        "titleJapanese": "外食・料理",
        "theme": "Restaurants, cooking, ingredients",
        "vocab": [
            { "word": "看板", "reading": "かんばん", "meaning": "Signboard / Menu board", "meaningNepali": "साइनबोर्ड / बोर्ड", "kanji": ["看", "板"], "pos": "Noun" },
            { "word": "行列", "reading": "ぎょうれつ", "meaning": "Line / Queue", "meaningNepali": "लाइन / लहर", "kanji": ["行", "列"], "pos": "Noun" },
            { "word": "材料", "reading": "ざいりょう", "meaning": "Ingredients / Materials", "meaningNepali": "सामग्री / मरमसला", "kanji": ["材", "料"], "pos": "Noun" },
            { "word": "調味料", "reading": "ちょうみりょう", "meaning": "Seasoning / Condiments", "meaningNepali": "मसला / स्वाद बढाउने चीज", "kanji": ["調", "味", "料"], "pos": "Noun" },
            { "word": "沸騰", "reading": "ふっとう", "meaning": "Boiling / Bubbling up", "meaningNepali": "उम्लिनु", "kanji": ["沸", "騰"], "pos": "Noun" }
        ],
        "grammar": [
            {
                "title": "1. Instead of 〜代わりに",
                "pattern": "[Verb plain / Nの] + 代わりに",
                "explanationEnglish": "Instead of doing something, or in exchange for something.", "explanationNepali": "~ को सट्टामा।",
                "examples": [
                    { "target": "コーヒーの代わりに、お茶を飲む。", "reading": "コーヒーのかわりに、おちゃをのむ。", "english": "Drink tea instead of coffee.", "nepali": "कफीको सट्टामा चिया पिउनु।" }
                ]
            },
            {
                "title": "2. Without 〜ぬきで / 〜ぬきにして",
                "pattern": "[Noun] + ぬきで / ぬきにして",
                "explanationEnglish": "Without / leaving out an element.", "explanationNepali": "~ बिना / ~ लाई छोडेर।",
                "examples": [
                    { "target": "わさびぬきで寿司を注文した。", "reading": "わさびぬきですしをちゅうもんした。", "english": "Ordered sushi without wasabi.", "nepali": "वासाबी बिना सुशी अर्डर गरियो।" }
                ]
            },
            {
                "title": "3. On the other hand 〜反面",
                "pattern": "[Plain form] + 反面",
                "explanationEnglish": "On one hand A, but on the other hand B (contrasting aspect).", "explanationNepali": "एकातिर ~ तर अर्कातिर ~।",
                "examples": [
                    { "target": "便利である反面、危険も伴う。", "reading": "べんりであるはんめん、きけんもともなう。", "english": "While convenient, it also carries risks.", "nepali": "सुविधाजनक हुनुका साथै खतरा पनि जोडिएको छ।" }
                ]
            },
            {
                "title": "4. On one hand... while... 〜一方（で）",
                "pattern": "[Plain form] + 一方で",
                "explanationEnglish": "While one situation develops, another situation exists simultaneously.", "explanationNepali": "एकातिर ~ हुँदा उस्तै समयमा अर्कातिर ~।",
                "examples": [
                    { "target": "都市の開発が進む一方で、自然が失われている。", "reading": "と知のかいはつがすすむいっぽうで、しぜんがうしなわれている。", "english": "While urban development progresses, nature is being lost.", "nepali": "सहरको विकास भइरहँदा अर्कातिर प्रकृति नासिँदैछ।" }
                ]
            }
        ]
    },

    # ── CHAPTER 5 ──
    {
        "chapterNumber": 5,
        "title": "Physical Health & Medical Care",
        "titleJapanese": "健康・医療",
        "theme": "Wellness, symptoms, treatment",
        "vocab": [
            { "word": "診察", "reading": "しんさつ", "meaning": "Medical examination", "meaningNepali": "स्वास्थ्य जाँच", "kanji": ["診", "察"], "pos": "Noun" },
            { "word": "症状", "reading": "しょうじょう", "meaning": "Symptoms", "meaningNepali": "लक्षण", "kanji": ["症", "状"], "pos": "Noun" },
            { "word": "副作用", "reading": "ふくさよう", "meaning": "Side effect", "meaningNepali": "साइड इफेक्ट / पार्श्व प्रभाव", "kanji": ["副", "作", "用"], "pos": "Noun" },
            { "word": "予防", "reading": "よぼう", "meaning": "Prevention / Precaution", "meaningNepali": "रोकथाम / पूर्वसावधानी", "kanji": ["予", "防"], "pos": "Noun" },
            { "word": "回復", "reading": "かいふく", "meaning": "Recovery / Recuperation", "meaningNepali": "सुधार / निको हुनु", "kanji": ["回", "復"], "pos": "Noun" }
        ],
        "grammar": [
            {
                "title": "1. Purpose / Reason 〜ために",
                "pattern": "[Verb dict / Nの] + ために",
                "explanationEnglish": "For the purpose of; or because of (reason).", "explanationNepali": "~ को लागि / ~ को कारणले।",
                "examples": [
                    { "target": "健康のために、毎日運動している。", "reading": "けんこうのために、まいにちうんどうしている。", "english": "I exercise every day for my health.", "nepali": "स्वास्थ्यको लागि म रोज व्यायाम गर्छु।" }
                ]
            },
            {
                "title": "2. By means of / Due to 〜によって / 〜により",
                "pattern": "[Noun] + によって / により",
                "explanationEnglish": "Indicates cause, means, or agent of an action.", "explanationNepali": "~ द्वारा / ~ को कारणले।",
                "examples": [
                    { "target": "台風によって、木が倒れた。", "reading": "たいふうによって、きがたおれた。", "english": "Due to the typhoon, trees collapsed.", "nepali": "आँधीको कारणले रूख ढल्यो।" }
                ]
            },
            {
                "title": "3. Thanks to (Positive) 〜おかげで",
                "pattern": "[Plain form / Nの] + おかげで",
                "explanationEnglish": "Expresses appreciation for a positive outcome.", "explanationNepali": "~ को कृपाले (राम्रो नतिजा)।",
                "examples": [
                    { "target": "薬のおかげで、熱が下がった。", "reading": "くすりのおかげで、ねつがさがった。", "english": "Thanks to the medicine, the fever went down.", "nepali": "औषधिको कृपाले जोरो घट्यो।" }
                ]
            },
            {
                "title": "4. Blame / Due to (Negative) 〜せいで",
                "pattern": "[Plain form / Nの] + せいで",
                "explanationEnglish": "Blames a cause for a bad result.", "explanationNepali": "~ को दोषले / कारणले (नराम्रो नतिजा)।",
                "examples": [
                    { "target": "寝不足のせいで、頭が痛い。", "reading": "ねぶそくのせいで、あたまがいたい。", "english": "Because of lack of sleep, I have a headache.", "nepali": "निद्रा नपुगेको कारणले टाउको दुखेको छ।" }
                ]
            }
        ]
    },

    # ── CHAPTER 6 ──
    {
        "chapterNumber": 6,
        "title": "Town Announcements & Transport",
        "titleJapanese": "街のアナウンス・交通",
        "theme": "Public transit, detours, announcements",
        "vocab": [
            { "word": "車掌", "reading": "しゃしょう", "meaning": "Train conductor", "meaningNepali": "ट्रेन कन्डक्टर", "kanji": ["車", "掌"], "pos": "Noun" },
            { "word": "往復", "reading": "おうふく", "meaning": "Round trip", "meaningNepali": "आउने जाने (दुवैतर्फी टिकट)", "kanji": ["往", "復"], "pos": "Noun" },
            { "word": "混雑", "reading": "こんざつ", "meaning": "Crowdedness / Congestion", "meaningNepali": "भिडभाड / ठेलमठेल", "kanji": ["混", "雑"], "pos": "Noun" },
            { "word": "遠回り", "reading": "とおまわり", "meaning": "Detour", "meaningNepali": "घुमाउरो बाटो", "kanji": ["遠", "回"], "pos": "Noun" },
            { "word": "踏切", "reading": "ふみきり", "meaning": "Railway crossing", "meaningNepali": "रेलवे क्रसिङ", "kanji": ["踏", "切"], "pos": "Noun" }
        ],
        "grammar": [
            {
                "title": "1. Strong Resolve 〜からには",
                "pattern": "[Verb plain] + からには",
                "explanationEnglish": "Now that / since (expressing strong determination or responsibility).", "explanationNepali": "~ भइसकेपछि त (दृढ सङ्कल्प)।",
                "examples": [
                    { "target": "引き受けたからには、最後までやり遂げる。", "reading": "ひきうけたからには、さいごまでやりとげる。", "english": "Now that I've accepted it, I will accomplish it to the end.", "nepali": "जिम्मेवारी लिइसकेपछि त अन्त्यसम्म पूरा गर्नेछु।" }
                ]
            },
            {
                "title": "2. Duty / Intent 〜以上（は）",
                "pattern": "[Plain form] + 以上（は）",
                "explanationEnglish": "Seeing that / since (implying natural duty or expectation).", "explanationNepali": "~ भइसकेको अवस्थामा (कर्तव्य र दायित्व)।",
                "examples": [
                    { "target": "約束した以上は、守らなければならない。", "reading": "やくそくしたいじょうは、まもらなければならない。", "english": "Since I promised, I must keep it.", "nepali": "वाचा गरिसकेको अवस्थामा पालना गर्नैपर्छ।" }
                ]
            },
            {
                "title": "3. Formal Since 〜上は",
                "pattern": "[Verb た-form / dict] + 上は",
                "explanationEnglish": "Highly formal marker meaning 'now that / since'.", "explanationNepali": "~ भइसकेको हुँदा (अत्यन्त औपचारिक)।",
                "examples": [
                    { "target": "試験を受ける上は、全力を尽くす。", "reading": "しけんをうけるうえは、ぜんりょくをつくす。", "english": "Now that I am taking the exam, I will do my best.", "nepali": "परीक्षा दिने भइसकेपछि पूर्ण शक्ति लगाउनेछु।" }
                ]
            },
            {
                "title": "4. Sole Condition 〜さえ〜ば",
                "pattern": "[Noun] + さえ + [Verb ば-form]",
                "explanationEnglish": "If only... then everything else will be fine.", "explanationNepali": "केवल ~ मात्र भइदिए पुग्छ।",
                "examples": [
                    { "target": "体さえ丈夫なら、何でもできる。", "reading": "からださえじょうぶなら、なんでもできる。", "english": "If only your body is strong, you can do anything.", "nepali": "शरीर मात्र बलियो भइदिए जे पनि गर्न सकिन्छ।" }
                ]
            }
        ]
    },

    # ── CHAPTER 7 ──
    {
        "chapterNumber": 7,
        "title": "Festivals, Events & Local Traditions",
        "titleJapanese": "祭り・行事",
        "theme": "Culture, parades, street stalls",
        "vocab": [
            { "word": "屋台", "reading": "やたい", "meaning": "Food stall / Street kiosk", "meaningNepali": "सडक पसल / ठेला", "kanji": ["屋", "台"], "pos": "Noun" },
            { "word": "行列", "reading": "ぎょうれつ", "meaning": "Procession / Parade", "meaningNepali": "र्याली / झाँकी", "kanji": ["行", "列"], "pos": "Noun" },
            { "word": "伝統", "reading": "でんとう", "meaning": "Tradition / Heritage", "meaningNepali": "परम्परा", "kanji": ["伝", "統"], "pos": "Noun" },
            { "word": "にぎやか", "reading": "にぎやか", "meaning": "Lively / Bustling", "meaningNepali": "चहलपहल भएको", "kanji": ["賑"], "pos": "Na-Adj" },
            { "word": "開催", "reading": "かいさい", "meaning": "Holding an event / Hosting", "meaningNepali": "आयोजना गर्नु", "kanji": ["開", "催"], "pos": "Noun" }
        ],
        "grammar": [
            {
                "title": "1. Left Running / Messy 〜っぱなし",
                "pattern": "[Verb stem] + っぱなし",
                "explanationEnglish": "Leaving something in an unfinished or messy state.", "explanationNepali": "~ यत्तिकै छाडिदिनु (लापरवाहीपूर्वक)।",
                "examples": [
                    { "target": "電気をつけっぱなしで寝てしまった。", "reading": "でんきをつけっぱなしでねてしまった。", "english": "I fell asleep with the lights left on.", "nepali": "बत्ती यत्तिकै बालेर सुतेछु।" }
                ]
            },
            {
                "title": "2. Full of / Covered in 〜だらけ",
                "pattern": "[Noun] + だらけ",
                "explanationEnglish": "Covered in or full of undesirable things (dust, mistakes, blood).", "explanationNepali": "~ ले भरिएको (प्रायः नराम्रो कुरा)।",
                "examples": [
                    { "target": "この答案用紙は間違いだらけだ。", "reading": "このとうあんようしはまちがいだらけだ。", "english": "This answer sheet is full of mistakes.", "nepali": "यो उत्तरपुस्तिका गल्तीै गल्तीले भरिएको छ।" }
                ]
            },
            {
                "title": "3. Prone to 〜がち",
                "pattern": "[Verb stem / Noun] + がち",
                "explanationEnglish": "Tending to do something frequently (usually bad habit).", "explanationNepali": "प्रायः ~ हुने बानी हुनु।",
                "examples": [
                    { "target": "一人暮らしの時は野菜が不足しがちだ。", "reading": "ひとりぐらしのときはやさいがふそくしがちだ。", "english": "When living alone, one tends to lack vegetables.", "nepali": "एक्लै बस्दा तरकारी पुग्दैन।" }
                ]
            },
            {
                "title": "4. Slight Feeling 〜気味",
                "pattern": "[Verb stem / Noun] + 気味（ぎみ）",
                "explanationEnglish": "Feeling a little bit of a temporary negative state (cold, tired).", "explanationNepali": "अलि अलि ~ को महसुस हुनु।",
                "examples": [
                    { "target": "少し風邪気味なので、早く寝ます。", "reading": "すこしかぜぎみなので、はやくねます。", "english": "I feel a bit of a cold, so I will sleep early.", "nepali": "अलि रुघा लागे जस्तो छ, छिटो सुत्छु।" }
                ]
            }
        ]
    },

    # ── CHAPTER 8 ──
    {
        "chapterNumber": 8,
        "title": "Sports & Leisure Time",
        "titleJapanese": "スポーツ・余暇",
        "theme": "Matches, relaxation, recreation",
        "vocab": [
            { "word": "勝敗", "reading": "しょうはい", "meaning": "Victory or defeat / Outcome", "meaningNepali": "हारजीत / नतिजा", "kanji": ["勝", "敗"], "pos": "Noun" },
            { "word": "応援", "reading": "おうえん", "meaning": "Cheering / Support", "meaningNepali": "हौसला / समर्थन", "kanji": ["応", "援"], "pos": "Noun" },
            { "word": "娯楽", "reading": "ごらく", "meaning": "Entertainment / Amusement", "meaningNepali": "मनोरञ्जन", "kanji": ["娯", "楽"], "pos": "Noun" },
            { "word": "息抜き", "reading": "いきぬき", "meaning": "Breather / Relaxation", "meaningNepali": "थकाइ मेट्नु / विश्राम", "kanji": ["息", "抜"], "pos": "Noun" },
            { "word": "競技", "reading": "きょうぎ", "meaning": "Game / Match / Contest", "meaningNepali": "प्रतियोगिता / खेल", "kanji": ["競", "技"], "pos": "Noun" }
        ],
        "grammar": [
            {
                "title": "1. Intended for 〜向け",
                "pattern": "[Noun] + 向け",
                "explanationEnglish": "Designed or created specifically for a target group.", "explanationNepali": "~ का लागि लक्षित (डिजाइन गरिएको)।",
                "examples": [
                    { "target": "この本は初心者向けに書かれている。", "reading": "このほんはしょしんしゃむけにかくれている。", "english": "This book is written intended for beginners.", "nepali": "यो किताब शुरुवाती सिक्नेहरूका लागि लक्षित गरी लेखिएको छ।" }
                ]
            },
            {
                "title": "2. Suitable for 〜向き",
                "pattern": "[Noun] + 向き",
                "explanationEnglish": "Naturally suitable or fitting well for someone.", "explanationNepali": "~ का लागि उपयुक्त।",
                "examples": [
                    { "target": "彼は子供の指導に向いている。", "reading": "かれはこどものしどうにむいている。", "english": "He is naturally suited for guiding children.", "nepali": "उहाँ बालबालिकालाई सिकाउन उपयुक्त हुनुहुन्छ।" }
                ]
            },
            {
                "title": "3. As soon as 〜次第",
                "pattern": "[Verb stem] + 次第",
                "explanationEnglish": "As soon as something happens, immediate action follows.", "explanationNepali": "~ हुने बित्तिकै (तत्काल)।",
                "examples": [
                    { "target": "雨がやみ次第、出発しましょう。", "reading": "あめがやみしだい、しゅっぱつしましょう。", "english": "As soon as the rain stops, let's depart.", "nepali": "पानी पर्न रोकिने बित्तिकै निस्कौँ।" }
                ]
            },
            {
                "title": "4. Spanning Across 〜にわたって",
                "pattern": "[Noun] + にわたって / にわたる [Noun]",
                "explanationEnglish": "Spanning over a broad area, time period, or scope.", "explanationNepali": "~ भरि / ~ सम्म फैलिएको।",
                "examples": [
                    { "target": "会議は3日間にわたって行われた。", "reading": "かいぎはみっかかんにわたっておこなわれた。", "english": "The conference was held spanning over three days.", "nepali": "बैठक ३ दिनसम्म सञ्चालन भयो।" }
                ]
            }
        ]
    },

    # ── CHAPTER 9 ──
    {
        "chapterNumber": 9,
        "title": "Weather Changes & Natural Environment",
        "titleJapanese": "天候・自然",
        "theme": "Climate, disasters, observations",
        "vocab": [
            { "word": "雷", "reading": "かみなり", "meaning": "Thunder / Lightning", "meaningNepali": "चट्याङ / गर्जन", "kanji": ["雷"], "pos": "Noun" },
            { "word": "異常気象", "reading": "いじょうきしょう", "meaning": "Abnormal weather", "meaningNepali": "अस्वाभाविक मौसम", "kanji": ["異", "常", "気", "象"], "pos": "Noun" },
            { "word": "湿気", "reading": "しっけ", "meaning": "Moisture / Humidity", "meaningNepali": "चिसोपन / ओस", "kanji": ["湿", "気"], "pos": "Noun" },
            { "word": "観測", "reading": "かんそく", "meaning": "Observation / Surveying", "meaningNepali": "अवलोकन / मापन", "kanji": ["観", "測"], "pos": "Noun" },
            { "word": "避難", "reading": "ひなん", "meaning": "Evacuation / Seeking refuge", "meaningNepali": "सुरक्षित ठाउँमा भाग्राम/सर्नु", "kanji": ["避", "難"], "pos": "Noun" }
        ],
        "grammar": [
            {
                "title": "1. Even if 〜たとえ〜ても",
                "pattern": "たとえ + [Verb て-form / Adj] + も",
                "explanationEnglish": "Even if hypothetical situation A happens, B remains unchanged.", "explanationNepali": "चाहे ~ भए तापनि।",
                "examples": [
                    { "target": "たとえ雨が降っても、試合は行われる。", "reading": "たとえあめがふっても、しあいはおこなわれる。", "english": "Even if it rains, the match will be held.", "nepali": "चाहे पानी परे तापनि खेल हुनेछ।" }
                ]
            },
            {
                "title": "2. Proportional change 〜ば 〜ほど",
                "pattern": "[Verb ば-form] + [Verb dict] + ほど",
                "explanationEnglish": "The more A happens, the more B changes proportionally.", "explanationNepali": "जति ~ गर्यो त्यति नै ~।",
                "examples": [
                    { "target": "日本語は勉強すればするほど面白くなる。", "reading": "にほんごはべんきょうすればするほどおもしろくなる。", "english": "The more you study Japanese, the more interesting it gets.", "nepali": "जापानी भाषा जति पढ्यो त्यति नै रमाइलो हुन्छ।" }
                ]
            },
            {
                "title": "3. High Degree 〜くらい / 〜ほど",
                "pattern": "[Plain form / Noun] + くらい / ほど",
                "explanationEnglish": "To the extent that / so much that.", "explanationNepali": "~ सम्मको हदमा।",
                "examples": [
                    { "target": "声が出ないほど喉が痛い。", "reading": "こえがでないほどのおどがいたい。", "english": "My throat hurts so much that I can't speak.", "nepali": "आवाज ननिस्कने गरी घाँटी दुखेको छ।" }
                ]
            },
            {
                "title": "4. Bound to be 〜に決まっている",
                "pattern": "[Plain form] + に決まっている",
                "explanationEnglish": "Expresses strong subjective certainty ('bound to be / definitely').", "explanationNepali": "नक्की हो / अवश्य हुनुपर्छ।",
                "examples": [
                    { "target": "そんなの嘘に決まっている。", "reading": "そんなのうそにきまっている。", "english": "That is definitely a lie.", "nepali": "त्यो त पक्कै झूट हो।" }
                ]
            }
        ]
    },

    # ── CHAPTER 10 ──
    {
        "chapterNumber": 10,
        "title": "Business Operations & Workplace Communication",
        "titleJapanese": "仕事・職場",
        "theme": "Office work, approvals, risk",
        "vocab": [
            { "word": "出張", "reading": "しゅっちょう", "meaning": "Business trip", "meaningNepali": "व्यापारिक भ्रमण", "kanji": ["出", "張"], "pos": "Noun" },
            { "word": "日程", "reading": "にってい", "meaning": "Schedule / Agenda", "meaningNepali": "कार्यतालिका", "kanji": ["日", "程"], "pos": "Noun" },
            { "word": "上司", "reading": "じょうし", "meaning": "Boss / Superior", "meaningNepali": "हाकिम / वरिष्ठ", "kanji": ["上", "司"], "pos": "Noun" },
            { "word": "妥協", "reading": "だきょう", "meaning": "Compromise", "meaningNepali": "सम्झौता / सहमति", "kanji": ["妥", "協"], "pos": "Noun" },
            { "word": "承認", "reading": "しょうにん", "meaning": "Approval / Sanction", "meaningNepali": "स्वीकृति / अनुमति", "kanji": ["承", "認"], "pos": "Noun" }
        ],
        "grammar": [
            {
                "title": "1. Risk of negative event 〜おそれがある",
                "pattern": "[Verb dict / Nの] + おそれがある",
                "explanationEnglish": "There is a danger/risk that something bad might happen.", "explanationNepali": "~ हुने खतरा/जोखिम छ।",
                "examples": [
                    { "target": "大雨で川が氾濫するおそれがある。", "reading": "おおあめでかわがはんらんするおそれがある。", "english": "There is a risk that the river may flood due to heavy rain.", "nepali": "भारी वर्षाका कारण नदी थुनिने खतरा छ।" }
                ]
            },
            {
                "title": "2. Certainty based on evidence 〜に違いない",
                "pattern": "[Plain form] + に違いない",
                "explanationEnglish": "Expresses strong objective certainty ('must be').", "explanationNepali": "नक्की नै हो।",
                "examples": [
                    { "target": "彼が犯人に違いない。", "reading": "かれがはんにんにちがいない。", "english": "He must be the culprit.", "nepali": "उही दोषी हुनुपर्छ।" }
                ]
            },
            {
                "title": "3. Impossible expectation 〜はずがない",
                "pattern": "[Plain form] + はずがない",
                "explanationEnglish": "Strong conviction that something is logically impossible.", "explanationNepali": "~ हुनै सक्दैन।",
                "examples": [
                    { "target": "真面目な彼が遅刻するはずがない。", "reading": "まじめなかれがちこくするはずがない。", "english": "A serious person like him cannot possibly be late.", "nepali": "अनुशासित उहाँ ढिलो हुनु असम्भव छ।" }
                ]
            },
            {
                "title": "4. Absolute denial 〜わけがない",
                "pattern": "[Plain form] + わけがない",
                "explanationEnglish": "Subjective strong denial ('there is no way that...').", "explanationNepali": "~ हुने सम्भावना नै छैन।",
                "examples": [
                    { "target": "こんなに難しい問題が解けるわけがない。", "reading": "こんなにむずかしいもんだいがとけるわけがない。", "english": "There is no way I can solve such a difficult problem.", "nepali": "यति गाह्रो प्रश्न हल गर्न सकिने कुरै छैन।" }
                ]
            }
        ]
    },

    # ── CHAPTER 11 ──
    {
        "chapterNumber": 11,
        "title": "Advanced Social Register & Honorifics",
        "titleJapanese": "敬語・社会",
        "theme": "Keigo, politeness, formal business",
        "vocab": [
            { "word": "恐縮", "reading": "きょうしゅく", "meaning": "Feeling obliged / Sorry to trouble", "meaningNepali": "आभारी महसुस / क्षमाप्रार्थी", "kanji": ["恐", "縮"], "pos": "Noun" },
            { "word": "ご丁寧", "reading": "ごていねい", "meaning": "Polite / Courteous", "meaningNepali": "नम्र / शिष्ट", "kanji": ["丁", "寧"], "pos": "Na-Adj" },
            { "word": "拝見", "reading": "はいけん", "meaning": "Humbly looking at / Seeing", "meaningNepali": "नम्रतापूर्वक हेर्नु", "kanji": ["拝", "見"], "pos": "Verb" },
            { "word": "存じる", "reading": "ぞんじる", "meaning": "Humbly knowing / Thinking", "meaningNepali": "नम्रतापूर्वक सोच्नु/थाहा पाउनु", "kanji": ["存"], "pos": "Verb" },
            { "word": "お越しになる", "reading": "おこしになる", "meaning": "Honorific for coming/arriving", "meaningNepali": "सवारी हुनु / आउनु (आदरार्थी)", "kanji": ["越"], "pos": "Verb" }
        ],
        "grammar": [
            {
                "title": "1. Humbly Receive Action お/ご〜いただく",
                "pattern": "お + [Verb stem] + いただく / ご + [Noun] + いただく",
                "explanationEnglish": "Humbly receiving an action performed by a superior.", "explanationNepali": "माथिल्लो व्यक्तिबाट काम नम्रतासाथ ग्रहण गर्नु।",
                "examples": [
                    { "target": "社長にご説明いただきました。", "reading": "しゃちょうにごせつめいいただきました。", "english": "I humbly received an explanation from the president.", "nepali": "अध्यक्षज्यूबाट व्याख्या सुन्न पाइयो।" }
                ]
            },
            {
                "title": "2. Superior Performs Action お/ご〜くださる",
                "pattern": "お + [Verb stem] + くださる / ご + [Noun] + くださる",
                "explanationEnglish": "A superior kindly performs an action for me.", "explanationNepali": "उच्च व्यक्तिले मेरो लागि काम गरिदिनु।",
                "examples": [
                    { "target": "先生が本をお貸しくださいました。", "reading": "せんせいがほんをおかしくださいました。", "english": "The teacher kindly lent me a book.", "nepali": "शिक्षकले मलाई किताब पठाएर कृपा गर्नुभयो।" }
                ]
            },
            {
                "title": "3. Honorific State 〜ていらっしゃる",
                "pattern": "[Verb て-form] + いらっしゃる",
                "explanationEnglish": "Honorific equivalent of 〜ている (doing action/state for superior).", "explanationNepali": "गर्नुहुँदैछ (आदरार्थी)।",
                "examples": [
                    { "target": "社長は今、電話をなさっていらっしゃいます。", "reading": "しゃちょうはいま、でんわをなさっていらっしゃいます。", "english": "The president is currently making a call.", "nepali": "अध्यक्षज्यू अहिले फोनमा कुरा गर्दैहुनुहुन्छ।" }
                ]
            },
            {
                "title": "4. Humble State 〜てまいる",
                "pattern": "[Verb て-form] + まいる",
                "explanationEnglish": "Humble equivalent of 〜ていく / 〜てくる.", "explanationNepali": "म जाने/आउने गर्छु (नम्र रूप)।",
                "examples": [
                    { "target": "後ほど資料をお持ちしてまいります。", "reading": "のちほどしりょうをおもちしてまいります。", "english": "I will bring the materials shortly.", "nepali": "केही बेरमा कागजात लिएर आउनेछु।" }
                ]
            }
        ]
    },

    # ── CHAPTER 12 ──
    {
        "chapterNumber": 12,
        "title": "Abstract Ideas & Final Test Reviews",
        "titleJapanese": "抽象的概念・総まとめ",
        "theme": "Advanced concepts, review, logic",
        "vocab": [
            { "word": "矛盾", "reading": "むじゅん", "meaning": "Contradiction", "meaningNepali": "बाझिनु / विरोधाभास", "kanji": ["矛", "盾"], "pos": "Noun" },
            { "word": "核心", "reading": "かくしん", "meaning": "Core / Heart of the matter", "meaningNepali": "मुख्य भाग / चुरो कुरा", "kanji": ["核", "心"], "pos": "Noun" },
            { "word": "客観的", "reading": "きゃっかんてき", "meaning": "Objective / Unbiased", "meaningNepali": "वस्तुनिष्ठ / निष्पक्ष", "kanji": ["客", "観", "的"], "pos": "Na-Adj" },
            { "word": "成果", "reading": "せいか", "meaning": "Fruit of labor / Positive results", "meaningNepali": "उपलब्धि / प्रतिफल", "kanji": ["成", "果"], "pos": "Noun" },
            { "word": "一連", "reading": "いちれん", "meaning": "A series / Sequence of events", "meaningNepali": "श्रृंखला / घटनाक्रम", "kanji": ["一", "連"], "pos": "Noun" }
        ],
        "grammar": [
            {
                "title": "1. Partial Negation 〜わけではない",
                "pattern": "[Plain form] + わけではない",
                "explanationEnglish": "It doesn't mean that... (partial negation).", "explanationNepali": "~ भन्ने चाहिँ होइन (आंशिक अस्वीकार)।",
                "examples": [
                    { "target": "嫌いなわけではないが、あまり食べない。", "reading": "きらいなわけではないが、あまりたべない。", "english": "It's not that I dislike it, but I don't eat it much.", "nepali": "मन नपरेको त होइन, तर धेरै खाँदिन।" }
                ]
            },
            {
                "title": "2. Soft Negation 〜というわけではない",
                "pattern": "[Plain form] + というわけではない",
                "explanationEnglish": "It isn't necessarily the case that...", "explanationNepali": "~ नै हो भन्ने चाहिँ होइन।",
                "examples": [
                    { "target": "全員が賛成したというわけではない。", "reading": "ぜんいんがさんせいしたというわけではない。", "english": "It doesn't mean everyone agreed.", "nepali": "सबैजना सहमत भए भन्ने चाहिँ होइन।" }
                ]
            },
            {
                "title": "3. Not Limited To 〜に限らない",
                "pattern": "[Noun / Plain form] + に限らない",
                "explanationEnglish": "Not limited only to A (applies to others too).", "explanationNepali": "केवल ~ मा मात्र सीमित छैन।",
                "examples": [
                    { "target": "この問題は若者に限らない。", "reading": "このもんだいはわかものにかぎらない。", "english": "This problem is not limited to young people.", "nepali": "यो समस्या युवाहरूमा मात्र सीमित छैन।" }
                ]
            },
            {
                "title": "4. Merely / Just 〜にすぎない",
                "pattern": "[Plain form / Noun] + にすぎない",
                "explanationEnglish": "Nothing more than / merely / just.", "explanationNepali": "केवल ~ बाहेक अरू केही होइन।",
                "examples": [
                    { "target": "それは単なる噂にすぎない。", "reading": "それはたんなるうわさにすぎない。", "english": "That is merely a rumor.", "nepali": "त्यो केवल एउटा हल्ला मात्र हो।" }
                ]
            }
        ]
    }
]

# Write out lib/n3-master-syllabus.ts
ts_code = (
    "// ============================================================\n"
    "// JLPT N3 COMPLETE 12-CHAPTER MASTER SYLLABUS DATASET\n"
    "// Full 12-Chapter Grammar & Vocabulary Master Syllabus\n"
    "// Complete definitions, readings, Nepali translations, and example sentences\n"
    "// ============================================================\n"
    "import type { VocabItem } from './nihongo-vocab';\n"
    "import type { GrammarPoint } from './grammar-guide';\n\n"
    "export interface N3MasterChapter {\n"
    "  chapterNumber: number;\n"
    "  title: string;\n"
    "  titleJapanese: string;\n"
    "  theme: string;\n"
    "  vocabulary: VocabItem[];\n"
    "  grammarGuides: GrammarPoint[];\n"
    "}\n\n"
    "export const N3_MASTER_SYLLABUS: N3MasterChapter[] = [\n"
)

formatted_chapters = []
for ch in chapters_data:
    vocab_items = []
    for idx, v in enumerate(ch["vocab"], 1):
        v_obj = {
            "id": f"N3-CH{ch['chapterNumber']:02d}-{idx:03d}",
            "lesson": 50 + ch["chapterNumber"],
            "level": "N3",
            "word": v["word"],
            "reading": v["reading"],
            "meaning": v["meaning"],
            "meaningNepali": v["meaningNepali"],
            "kanjiCharacters": v["kanji"],
            "partOfSpeech": v["pos"],
            "grammarSentences": [
                {
                    "japanese": f"{v['word']}を使います。",
                    "reading": f"{v['reading']}をつかいます。",
                    "english": f"Use {v['meaning']}.",
                    "nepali": f"उदाहरण: {v['meaningNepali']}।"
                }
            ]
        }
        vocab_items.append(v_obj)
        
    ch_obj = {
        "chapterNumber": ch["chapterNumber"],
        "title": ch["title"],
        "titleJapanese": ch["titleJapanese"],
        "theme": ch["theme"],
        "vocabulary": vocab_items,
        "grammarGuides": ch["grammar"]
    }
    formatted_chapters.append("  " + json.dumps(ch_obj, ensure_ascii=False, indent=2).replace("\n", "\n  "))

ts_code += ",\n".join(formatted_chapters) + "\n];\n"

with open("lib/n3-master-syllabus.ts", "w", encoding="utf-8") as f:
    f.write(ts_code)

print("✅ lib/n3-master-syllabus.ts created with all 12 chapters!")
