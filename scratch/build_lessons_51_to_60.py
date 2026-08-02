import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

# ─────────────────────────────────────────────────────────────────
# 1. LESSONS 51-60 VOCABULARY DATASET (N3 Level)
# ─────────────────────────────────────────────────────────────────
n3_vocab_lessons_51_60 = [
    # ── LESSON 51: Strong Certainty & Evidence ──
    {"id": "v51_01", "lesson": 51, "level": "N3", "word": "間違いない", "reading": "まちがいない", "meaning": "No mistake / Certain", "meaningNepali": "निसन्देह / पक्का", "kanjiCharacters": ["違"], "partOfSpeech": "I-Adj", "grammarSentences": [{"japanese": "彼が犯人に違いない。", "reading": "かれがはんにんにちがいない。", "english": "He must be the culprit.", "nepali": "उही अपराधी हो।"}]},
    {"id": "v51_02", "lesson": 51, "level": "N3", "word": "確信", "reading": "かくしん", "meaning": "Conviction / Confidence", "meaningNepali": "दृढ विश्वास", "kanjiCharacters": ["確", "信"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "勝利を確信している。", "reading": "しょうりをかくしんしている。", "english": "I am convinced of victory.", "nepali": "म जितमा विश्वस्त छु।"}]},
    {"id": "v51_03", "lesson": 51, "level": "N3", "word": "証拠", "reading": "しょうこ", "meaning": "Evidence / Proof", "meaningNepali": "प्रमाण", "kanjiCharacters": ["証", "拠"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "十分な証拠がある。", "reading": "じゅうぶんなしょうこがある。", "english": "There is sufficient evidence.", "nepali": "पर्याप्त प्रमाण छ।"}]},
    {"id": "v51_04", "lesson": 51, "level": "N3", "word": "当然", "reading": "とうぜん", "meaning": "Natural / Matter of course", "meaningNepali": "स्वाभाविक / अवश्य", "kanjiCharacters": ["当", "然"], "partOfSpeech": "Na-Adj", "grammarSentences": [{"japanese": "努力すれば成功するのは当然だ。", "reading": "どりょくすればせいこうするのはとうぜんだ。", "english": "It is natural to succeed if you make an effort.", "nepali": "मेहनत गरे सफल हुनु स्वाभाविक हो।"}]},
    {"id": "v51_05", "lesson": 51, "level": "N3", "word": "事実", "reading": "じじつ", "meaning": "Fact / Reality", "meaningNepali": "तथ्य / यथार्थ", "kanjiCharacters": ["事", "実"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "それが紛れもない事実だ。", "reading": "それがまぎれもないじじつだ。", "english": "That is an undeniable fact.", "nepali": "त्यो अकाट्य तथ्य हो।"}]},
    {"id": "v51_06", "lesson": 51, "level": "N3", "word": "政治", "reading": "せいじ", "meaning": "Politics / Government", "meaningNepali": "राजनीति", "kanjiCharacters": ["政", "治"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "彼は政治に強い関心を持っている。", "reading": "かれはせいじにつよいかんしんをもっている。", "english": "He has a strong interest in politics.", "nepali": "उहाँको राजनीतिमा गहिरो रुचि छ।"}]},

    # ── LESSON 52: Contrast & Concession ──
    {"id": "v52_01", "lesson": 52, "level": "N3", "word": "立場", "reading": "たちば", "meaning": "Standpoint / Position", "meaningNepali": "दृष्टिकोण / स्थिति", "kanjiCharacters": ["立", "場"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "相手の立場になって考える。", "reading": "あいてのたちばになってかんがえる。", "english": "Consider things from the other person's standpoint.", "nepali": "अर्काको स्थितिमा रहेर विचार गर्नुहोस्।"}]},
    {"id": "v52_02", "lesson": 52, "level": "N3", "word": "反対", "reading": "はんたい", "meaning": "Opposite / Opposition", "meaningNepali": "विपरित / विरोध", "kanjiCharacters": ["反", "対"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "彼の意見に反対する。", "reading": "かれのいけんにはんたいする。", "english": "I oppose his opinion.", "nepali": "म उहाँको विचारको विरोध गर्छु।"}]},
    {"id": "v52_03", "lesson": 52, "level": "N3", "word": "苦労", "reading": "くろう", "meaning": "Hardship / Trouble", "meaningNepali": "दुःख / कष्ट", "kanjiCharacters": ["苦", "労"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "多くの苦労を乗り越えた。", "reading": "おおくのくろうをのりこえた。", "english": "Overcame many hardships.", "nepali": "अनेकौँ दुःख पार गरे।"}]},
    {"id": "v52_04", "lesson": 52, "level": "N3", "word": "会議", "reading": "かいぎ", "meaning": "Meeting / Conference", "meaningNepali": "बैठक / सभा", "kanjiCharacters": ["会", "議"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "明日の会議に出席する。", "reading": "あしたのかいぎにしゅっせきする。", "english": "Attend tomorrow's meeting.", "nepali": "भोलिको बैठकमा उपस्थित हुनेछ।"}]},
    {"id": "v52_05", "lesson": 52, "level": "N3", "word": "議論", "reading": "ぎろん", "meaning": "Discussion / Debate", "meaningNepali": "छलफल / बहस", "kanjiCharacters": ["議", "論"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "活発な議論が行われた。", "reading": "かっぱつなぎろんがおこなわれた。", "english": "Lively discussion took place.", "nepali": "सक्रिय छलफल भयो।"}]},

    # ── LESSON 53: Focus & Center ──
    {"id": "v53_01", "lesson": 53, "level": "N3", "word": "中心", "reading": "ちゅうしん", "meaning": "Center / Core", "meaningNepali": "केन्द्र", "kanjiCharacters": ["中", "心"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "台風は東京を中心に接近している。", "reading": "たいふうはとうきょうをちゅうしんにせっきんしている。", "english": "The typhoon is approaching centered on Tokyo.", "nepali": "आँधी टोकीयोलाई केन्द्र बनाएर नजिकिँदैछ।"}]},
    {"id": "v53_02", "lesson": 53, "level": "N3", "word": "焦点", "reading": "しょうてん", "meaning": "Focus / Focal point", "meaningNepali": "मुख्य ध्यान / केन्द्रविन्दु", "kanjiCharacters": ["焦", "点"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "問題の焦点が明確になった。", "reading": "もんだいのしょうてんがめいかくになった。", "english": "The focus of the problem became clear.", "nepali": "समस्याको केन्द्रविन्दु स्पष्ट भयो।"}]},
    {"id": "v53_03", "lesson": 53, "level": "N3", "word": "国民", "reading": "こくみん", "meaning": "National / People", "meaningNepali": "जनता / नागरिक", "kanjiCharacters": ["国", "民"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "国民の生活を守る。", "reading": "こくみんのせいかつをまもる。", "english": "Protect the lives of the citizens.", "nepali": "नागरिकको जीवन रक्षा गर्नु।"}]},
    {"id": "v53_04", "lesson": 53, "level": "N3", "word": "市民", "reading": "しみん", "meaning": "Citizen / City resident", "meaningNepali": "नगरवासी", "kanjiCharacters": ["市", "民"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "市民公園を清掃する。", "reading": "しみんこうえんをせいそうする。", "english": "Clean the citizens' park.", "nepali": "नगरवासी पार्क सफा गर्नु।"}]},
    {"id": "v53_05", "lesson": 53, "level": "N3", "word": "民主主義", "reading": "みんしゅしゅぎ", "meaning": "Democracy", "meaningNepali": "प्रजातन्त्र / लोकतन्त्र", "kanjiCharacters": ["民", "主", "義"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "民主主義の精神を尊重する。", "reading": "みんしゅしゅぎのせいしんをそんちょうする。", "english": "Respect the spirit of democracy.", "nepali": "लोकतन्त्रको भावनाको सम्मान गर्नु।"}]},

    # ── LESSON 54: Cause & Result ──
    {"id": "v54_01", "lesson": 54, "level": "N3", "word": "結果", "reading": "けっか", "meaning": "Result / Outcome", "meaningNepali": "परिणाम / नतिजा", "kanjiCharacters": ["結", "果"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "努力の結果、試験に合格した。", "reading": "どりょくのけっか、しけんにごうかくした。", "english": "As a result of effort, passed the exam.", "nepali": "मेहनतको परिणाम स्वरूप परीक्षा पास गरियो।"}]},
    {"id": "v54_02", "lesson": 54, "level": "N3", "word": "影響", "reading": "えいきょう", "meaning": "Influence / Effect", "meaningNepali": "प्रभाव", "kanjiCharacters": ["影", "響"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "環境への影響を懸念する。", "reading": "かんきょうへのえいきょうをけねんする。", "english": "Worry about the effect on the environment.", "nepali": "वातावरणमा पर्ने प्रभावको चिन्ता गर्नु।"}]},
    {"id": "v54_03", "lesson": 54, "level": "N3", "word": "連絡", "reading": "れんらく", "meaning": "Contact / Connection", "meaningNepali": "सम्पर्क", "kanjiCharacters": ["連", "絡"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "すぐにお客様に連絡します。", "reading": "すぐにおきゃくさまにれんらくします。", "english": "I will contact the customer immediately.", "nepali": "तुरुन्तै ग्राहकलाई सम्पर्क गर्नेछु।"}]},
    {"id": "v54_04", "lesson": 54, "level": "N3", "word": "連れて行く", "reading": "つれていく", "meaning": "Take someone along", "meaningNepali": "साथमा लैजानु", "kanjiCharacters": ["連", "行"], "partOfSpeech": "Verb", "grammarSentences": [{"japanese": "子供を公園に連れて行く。", "reading": "こどもをこうえんにつれていく。", "english": "Take the child to the park.", "nepali": "बच्चालाई पार्कमा लैजानु।"}]},

    # ── LESSON 55: Limit & Extent ──
    {"id": "v55_01", "lesson": 55, "level": "N3", "word": "限界", "reading": "げんかい", "meaning": "Limit / Bound", "meaningNepali": "सीमा / हद", "kanjiCharacters": ["限", "界"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "体力に限界を感じる。", "reading": "たいりょくにげんかいをかんじる。", "english": "Feel the limits of physical strength.", "nepali": "शारीरिक क्षमताको सीमा महसुस हुनु।"}]},
    {"id": "v55_02", "lesson": 55, "level": "N3", "word": "制限", "reading": "せいげん", "meaning": "Restriction / Limitation", "meaningNepali": "प्रतिबन्ध / सीमांकन", "kanjiCharacters": ["制", "限"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "速度制限を守ってください。", "reading": "そくどせいげんをまもってください。", "english": "Please observe the speed limit.", "nepali": "कृपया गति सीमा पालना गर्नुहोस्।"}]},
    {"id": "v55_03", "lesson": 55, "level": "N3", "word": "対象", "reading": "たいしょう", "meaning": "Target / Object", "meaningNepali": "लक्ष्य / दायरा", "kanjiCharacters": ["対", "象"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "高校生を対象としたセミナー。", "reading": "こうこうせいをたいしょうとしたセミナー。", "english": "Seminar targeted at high school students.", "nepali": "उच्च मावि विद्यार्थीहरू लक्षित सेमिनार।"}]},

    # ── LESSON 56: Tendency & Characteristics ──
    {"id": "v56_01", "lesson": 56, "level": "N3", "word": "傾向", "reading": "けいこう", "meaning": "Tendency / Trend", "meaningNepali": "प्रवृत्ति / झुकाव", "kanjiCharacters": ["傾", "向"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "若者の活字離れの傾向が見られる。", "reading": "わかもののかつじばなれのけいこうがみられる。", "english": "A trend of young people reading less is observed.", "nepali": "युवाहरूमा पुस्तक पढ्ने कम हुने प्रवृत्ति देखिन्छ।"}]},
    {"id": "v56_02", "lesson": 56, "level": "N3", "word": "特徴", "reading": "とくちょう", "meaning": "Feature / Characteristic", "meaningNepali": "विशेषता / लक्षण", "kanjiCharacters": ["特", "徴"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "この商品の特徴を説明する。", "reading": "このしょうひんのとくちょうをせつめいする。", "english": "Explain the features of this product.", "nepali": "यस सामानको विशेषता व्याख्या गर्नु।"}]},
    {"id": "v56_03", "lesson": 56, "level": "N3", "word": "部分", "reading": "ぶぶん", "meaning": "Part / Portion", "meaningNepali": "भाग / खण्ड", "kanjiCharacters": ["部", "分"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "文章の重要な部分に線を引く。", "reading": "ぶんしょうのじゅうようなぶぶんにせんをひく。", "english": "Underline important parts of the text.", "nepali": "लेखको महत्वपूर्ण भागमा रेखा तान्नु।"}]},

    # ── LESSON 57: Change & Progression ──
    {"id": "v57_01", "lesson": 57, "level": "N3", "word": "変化", "reading": "へんか", "meaning": "Change / Variation", "meaningNepali": "परिवर्तन / फेरबदल", "kanjiCharacters": ["変", "化"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "社会の急激な変化に対応する。", "reading": "しゃかいのきゅうげきなへんかにたいおうする。", "english": "Adapt to rapid social changes.", "nepali": "समाजको तीव्र परिवर्तनसँग अनुकूल हुनु।"}]},
    {"id": "v57_02", "lesson": 57, "level": "N3", "word": "発展", "reading": "はってん", "meaning": "Development / Growth", "meaningNepali": "विकास / उन्नति", "kanjiCharacters": ["発", "展"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "経済が急速に発展している。", "reading": "けいざいがきゅうそくにはってんしている。", "english": "The economy is developing rapidly.", "nepali": "अर्थतन्त्र तीव्र रूपमा विकास भइरहेको छ।"}]},
    {"id": "v57_03", "lesson": 57, "level": "N3", "word": "割合", "reading": "わりあい", "meaning": "Ratio / Percentage / Relatively", "meaningNepali": "अनुपात / तुलनात्मक रूपमा", "kanjiCharacters": ["割", "合"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "今日は割合に暖かい。", "reading": "きょうはわりあいにあたたかい。", "english": "It is relatively warm today.", "nepali": "आज तुलनात्मक रूपमा न्यानो छ।"}]},

    # ── LESSON 58: Condition & Premise ──
    {"id": "v58_01", "lesson": 58, "level": "N3", "word": "前提", "reading": "ぜんてい", "meaning": "Premise / Condition", "meaningNepali": "पूर्वसर्त / आधार", "kanjiCharacters": ["前", "提"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "結婚を前提に付き合っている。", "reading": "けっこんをぜんていにつきあっている。", "english": "Dating on the premise of marriage.", "nepali": "विवाहको सर्तमा सम्बन्धमा रहनु।"}]},
    {"id": "v58_02", "lesson": 58, "level": "N3", "word": "条件", "reading": "じょうけん", "meaning": "Condition / Requirement", "meaningNepali": "सर्त / आवश्यकता", "kanjiCharacters": ["条", "件"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "採用の条件を確認する。", "reading": "さいようのじょうけんをかくにんする。", "english": "Confirm the hiring conditions.", "nepali": "भर्नाका सर्तहरू पुष्टि गर्नु।"}]},
    {"id": "v58_03", "lesson": 58, "level": "N3", "word": "都市", "reading": "とし", "meaning": "City / Metropolis", "meaningNepali": "सहर / महानगर", "kanjiCharacters": ["都", "市"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "大都市での生活に慣れる。", "reading": "だいとしでのせいかつになれる。", "english": "Get used to life in a big city.", "nepali": "ठूलो सहरको जीवनमा अभ्यस्त हुनु।"}]},

    # ── LESSON 59: Advice & Interior ──
    {"id": "v59_01", "lesson": 59, "level": "N3", "word": "助言", "reading": "じょげん", "meaning": "Advice / Suggestion", "meaningNepali": "सल्लाह / परामर्श", "kanjiCharacters": ["助", "言"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "先輩からの適切な助言を受けた。", "reading": "せんぱいからのてきせつなじょげんをうけた。", "english": "Received appropriate advice from a senior.", "nepali": "वरिष्ठबाट उपयुक्त सल्लाह पाइयो।"}]},
    {"id": "v59_02", "lesson": 59, "level": "N3", "word": "案内", "reading": "あんない", "meaning": "Guidance / Information", "meaningNepali": "मार्गदर्शन / जानकारी", "kanjiCharacters": ["案", "内"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "館内を案内いたします。", "reading": "かんないをあんないいたします。", "english": "I will guide you through the building.", "nepali": "भवन भित्र मार्गदर्शन गराउनेछु।"}]},
    {"id": "v59_03", "lesson": 59, "level": "N3", "word": "内容", "reading": "ないよう", "meaning": "Content / Substance", "meaningNepali": "सामग्री / विषयवस्तु", "kanjiCharacters": ["内", "容"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "本の内容を深く理解する。", "reading": "ほんのないようをふかくりかいする。", "english": "Deeply understand the content of the book.", "nepali": "किताबको विषयवस्तु गहिरो गरी बुझ्नु।"}]},

    # ── LESSON 60: Evaluation & Mutual ──
    {"id": "v60_01", "lesson": 60, "level": "N3", "word": "評価", "reading": "ひょうか", "meaning": "Evaluation / Rating", "meaningNepali": "मूल्यांकन", "kanjiCharacters": ["評", "価"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "高い評価を受ける。", "reading": "たかいひょうかをうける。", "english": "Receive a high evaluation.", "nepali": "उच्च मूल्यांकन प्राप्त गर्नु।"}]},
    {"id": "v60_02", "lesson": 60, "level": "N3", "word": "相談", "reading": "そうだん", "meaning": "Consultation / Discussion", "meaningNepali": "परामर्श / छलफल", "kanjiCharacters": ["相", "談"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "先生に進路を相談する。", "reading": "せんせいにしんろをそうだんする。", "english": "Consult a teacher about future career.", "nepali": "शिक्षकसँग भविष्यको बाटोबारे परामर्श गर्नु।"}]},
    {"id": "v60_03", "lesson": 60, "level": "N3", "word": "相手", "reading": "あいて", "meaning": "Partner / Opponent", "meaningNepali": "साझेदार / विपक्षी", "kanjiCharacters": ["相", "手"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "対戦相手の動きを観察する。", "reading": "たいせんあいてのうごきをかんさつする。", "english": "Observe the movements of the opponent.", "nepali": "विपक्षी खेलाडीको चाल अवलोकन गर्नु।"}]},
    {"id": "v60_04", "lesson": 60, "level": "N3", "word": "首相", "reading": "しゅしょう", "meaning": "Prime Minister", "meaningNepali": "प्रधानमन्त्री", "kanjiCharacters": ["首", "相"], "partOfSpeech": "Noun", "grammarSentences": [{"japanese": "首相が記者会見を行う。", "reading": "しゅしょうがきしゃかいけんをおこなう。", "english": "The Prime Minister holds a press conference.", "nepali": "प्रधानमन्त्रीले पत्रकार सम्मेलन गर्नुहुन्छ।"}]}
]

# ─────────────────────────────────────────────────────────────────
# 2. LESSONS 51-60 GRAMMAR GUIDES DATASET (N3 Level)
# ─────────────────────────────────────────────────────────────────
n3_grammar_lessons_51_60 = [
    {
        "language": "JAPANESE", "level": "N3", "lesson": 51,
        "lessonTitle": "Strong Certainty 〜に違いない & Expectation 〜はずだ",
        "grammarPoints": [
            {
                "title": "1. Strong Certainty 〜に違いない",
                "pattern": "[Plain form] + に違いない",
                "explanationEnglish": "Expresses strong conviction based on reasoning or evidence ('must be', 'there is no doubt').",
                "explanationNepali": "प्रमाण वा तर्कका आधारमा 'नक्की हो / अवश्य हो' भन्ने दृढ विश्वास व्यक्त।",
                "examples": [
                    {"target": "彼が犯人に違いない。", "reading": "かれがはんにんにちがいない。", "english": "He must be the culprit.", "nepali": "उ नै दोषी हुनुपर्छ।"},
                    {"target": "このニュースは本当であるに違いない。", "reading": "このニュースはほんとうであるにちがいない。", "english": "This news must be true.", "nepali": "यो समाचार साँचो हुनुपर्छ।"}
                ]
            },
            {
                "title": "2. Natural Expectation 〜はずだ",
                "pattern": "[Plain form / Nの / Adjな] + はずだ",
                "explanationEnglish": "Expresses expected outcome based on facts or schedule ('should be', 'expected to').",
                "explanationNepali": "तथ्य वा कार्यतालिकाका आधारमा 'हुनुपर्ने हो' भन्ने अपेक्षा।",
                "examples": [
                    {"target": "彼は今日来るはずだ。", "reading": "かれはきょうくるはずだ。", "english": "He is expected to come today.", "nepali": "उहाँ आज आउनुपर्ने हो।"}
                ]
            }
        ]
    },
    {
        "language": "JAPANESE", "level": "N3", "lesson": 52,
        "lessonTitle": "Contrast & Concession 〜ものの / 〜にもかかわらず",
        "grammarPoints": [
            {
                "title": "1. Concession 〜ものの",
                "pattern": "[Verb/Adj plain] + ものの",
                "explanationEnglish": "Means 'although / even though' (acknowledging a fact but adding a contrasting result).",
                "explanationNepali": "यद्यपि / तापनि (तथ्य स्वीकारेर पनि विपरित नतिजा प्रस्तुत गर्दा)।",
                "examples": [
                    {"target": "車を買ったものの、あまり乗っていない。", "reading": "くるまをかったものの、あまりのっていない。", "english": "Although I bought a car, I rarely drive it.", "nepali": "गाडी किने तापनि खासै चलाएको छैन।"}
                ]
            },
            {
                "title": "2. Unexpected Contrast 〜にもかかわらず",
                "pattern": "[Noun / Plain form] + にもかかわらず",
                "explanationEnglish": "Means 'despite / in spite of' (unexpected result contrary to expectation).",
                "explanationNepali": "बावजुद पनि (अपेक्षा विपरित अप्रत्याशित परिणाम हुँदा)।",
                "examples": [
                    {"target": "大雨にもかかわらず、多くの人が集まった。", "reading": "おおあめにもかかわらず、おおくのひとがあつまった。", "english": "Despite the heavy rain, many people gathered.", "nepali": "भारी वर्षाका बावजुद धेरै मानिसहरू जम्मा भए।"}
                ]
            }
        ]
    },
    {
        "language": "JAPANESE", "level": "N3", "lesson": 53,
        "lessonTitle": "Focus & Topic 〜を中心として / 〜をめぐって",
        "grammarPoints": [
            {
                "title": "1. Centered On 〜を中心として",
                "pattern": "[Noun] + を中心として / を中心に",
                "explanationEnglish": "Means 'centered around / mainly focusing on'.",
                "explanationNepali": "~ लाई केन्द्र बनाएर / मुख्य ध्यान दिएर।",
                "examples": [
                    {"target": "若者を中心として流行している。", "reading": "わかものをちゅうしんとしてりゅうこうしている。", "english": "It is popular centered around young people.", "nepali": "युवाहरूलाई केन्द्र बनाएर यो लोकप्रिय भइरहेछ।"}
                ]
            },
            {
                "title": "2. Concerning / Over a Topic 〜をめぐって",
                "pattern": "[Noun] + をめぐって",
                "explanationEnglish": "Means 'concerning / surrounding / over' (a dispute, discussion, or rumor).",
                "explanationNepali": "~ को विषयलाई लिएर (विवाद, बहस वा चर्चा)।",
                "examples": [
                    {"target": "新しい法律をめぐって議論が続いている。", "reading": "あたらしいほうりつをめぐってぎろんがつづいている。", "english": "Debate continues over the new law.", "nepali": "नयाँ कानूनलाई लिएर बहस जारी छ।"}
                ]
            }
        ]
    },
    {
        "language": "JAPANESE", "level": "N3", "lesson": 54,
        "lessonTitle": "Cause & Result 〜おかげで / 〜せいで / 〜の結果",
        "grammarPoints": [
            {
                "title": "1. Positive Cause 〜おかげで",
                "pattern": "[Plain form / Nの] + おかげで",
                "explanationEnglish": "Expresses gratitude for a positive result ('thanks to...').",
                "explanationNepali": "~ को कृपाले / धन्यवादले (सकारात्मक नतिजा)।",
                "examples": [
                    {"target": "先生のおかげで合格できました。", "reading": "せんせいのおかげでごうかくできました。", "english": "Thanks to the teacher, I passed.", "nepali": "शिक्षकको कृपाले पास हुन सकें।"}
                ]
            },
            {
                "title": "2. Blame / Negative Cause 〜せいで",
                "pattern": "[Plain form / Nの] + せいで",
                "explanationEnglish": "Blames a cause for a bad result ('because of / due to...').",
                "explanationNepali": "~ को दोषले / कारणले (नकारात्मक परिणाम)।",
                "examples": [
                    {"target": "雨のせいで試合が中止になった。", "reading": "あめのせいでしあいがちゅうしになった。", "english": "The match was canceled because of the rain.", "nepali": "पानीको कारणले खेल रद्द भयो।"}
                ]
            }
        ]
    },
    {
        "language": "JAPANESE", "level": "N3", "lesson": 55,
        "lessonTitle": "Limit & Condition 〜かぎり / 〜に限り",
        "grammarPoints": [
            {
                "title": "1. As Long As 〜かぎり",
                "pattern": "[Verb plain / Nである] + 限り",
                "explanationEnglish": "Means 'as long as / so long as' (condition continues).",
                "explanationNepali": "जबसम्म ~ (सर्त कायम रहन्छ)।",
                "examples": [
                    {"target": "生きている限り勉強を続ける。", "reading": "いきているかぎりべんきょうをつづける。", "english": "As long as I live, I will continue studying.", "nepali": "बाँचुन्जेल पढाइ जारी राख्नेछु।"}
                ]
            },
            {
                "title": "2. Exception / Limited To 〜に限り",
                "pattern": "[Noun] + に限り",
                "explanationEnglish": "Means 'limited only to / strictly for'.",
                "explanationNepali": "केवल ~ का लागि मात्र सीमित।",
                "examples": [
                    {"target": "本日ご来店のお客様に限り割引いたします。", "reading": "ほんじつごらいてんのおきゃくさまにかぎりわりびきいたします。", "english": "Discount is limited only to customers visiting today.", "nepali": "छुट आज आउने ग्राहकहरूका लागि मात्र सीमित छ।"}
                ]
            }
        ]
    },
    {
        "language": "JAPANESE", "level": "N3", "lesson": 56,
        "lessonTitle": "Tendency & Feature 〜がちだ / 〜っぽい",
        "grammarPoints": [
            {
                "title": "1. Negative Tendency 〜がちだ",
                "pattern": "[Verb stem / Noun] + がちだ",
                "explanationEnglish": "Expresses a frequent tendency to do something (usually undesirable).",
                "explanationNepali": "प्रायः ~ हुने प्रवृत्ति (प्रायः नराम्रो काम)।",
                "examples": [
                    {"target": "最近、風邪を引きがちだ。", "reading": "さいきん、かぜをひきがちだ。", "english": "Lately, I tend to catch colds.", "nepali": "हालसालै रुघा लाग्ने प्रवृत्ति बढेको छ।"}
                ]
            },
            {
                "title": "2. Resemblance / Quality 〜っぽい",
                "pattern": "[Noun / Verb stem] + っぽい",
                "explanationEnglish": "Means '-ish / like / prone to' (resembling a characteristic).",
                "explanationNepali": "~ जस्तो / ~ प्रकृतिको।",
                "examples": [
                    {"target": "彼は子供っぽい性格だ。", "reading": "かれはこどもっぽいせいかくだ。", "english": "He has a childish personality.", "nepali": "उहाँको बच्चा जस्तै स्वभाव छ।"}
                ]
            }
        ]
    },
    {
        "language": "JAPANESE", "level": "N3", "lesson": 57,
        "lessonTitle": "Ongoing Change 〜つつある / 〜一方だ",
        "grammarPoints": [
            {
                "title": "1. Gradual Ongoing Change 〜つつある",
                "pattern": "[Verb stem] + つつある",
                "explanationEnglish": "Expresses a gradual process of change in progress ('is in the process of...').",
                "explanationNepali": "क्रमिक रूपमा परिवर्तन भइरहेको प्रक्रिया ('हुँदैछ')।",
                "examples": [
                    {"target": "景気は回復しつつある。", "reading": "けいきはかいふくしつつある。", "english": "The economy is in the process of recovering.", "nepali": "अर्थतन्त्र सुधार हुने क्रममा छ।"}
                ]
            },
            {
                "title": "2. Continuous One-way Trend 〜一方だ",
                "pattern": "[Verb dictionary form] + 一方だ",
                "explanationEnglish": "Expresses a trend continuing in one direction ('keeps on...').",
                "explanationNepali": "एउटै दिशामा लगातार बढिरहेको स्थिति।",
                "examples": [
                    {"target": "物価は上がる一方だ。", "reading": "ぶっかはあがるいっぽうだ。", "english": "Prices keep on rising.", "nepali": "महँगी लगातार बढिरहेको छ।"}
                ]
            }
        ]
    },
    {
        "language": "JAPANESE", "level": "N3", "lesson": 58,
        "lessonTitle": "Hypothesis & Assumption 〜とすれば / 〜としたら",
        "grammarPoints": [
            {
                "title": "1. Hypothetical Assumption 〜とすれば",
                "pattern": "[Plain form] + とすれば / としたら",
                "explanationEnglish": "Means 'assuming that / if we suppose that'.",
                "explanationNepali": "यदि ~ भन्ने मान्ने हो भने।",
                "examples": [
                    {"target": "もしタイムマシンがあるとしたら、過去に行きたい。", "reading": "もしたいむましんがあるとしたら、かこにいきたい。", "english": "If we suppose a time machine exists, I'd go to the past.", "nepali": "यदि टाइम मेसिन छ भने म विगतमा जान चाहन्छु।"}
                ]
            }
        ]
    },
    {
        "language": "JAPANESE", "level": "N3", "lesson": 59,
        "lessonTitle": "Obligation & Advice 〜べきだ / 〜たほうがいい",
        "grammarPoints": [
            {
                "title": "1. Moral Obligation 〜べきだ",
                "pattern": "[Verb dictionary form] + べきだ (する→すべきだ)",
                "explanationEnglish": "Expresses moral obligation or social expectation ('should / ought to').",
                "explanationNepali": "नैतिक कर्तव्य वा सामाजिक दायित्व ('गर्नुपर्छ')।",
                "examples": [
                    {"target": "約束は守るべきだ。", "reading": "やくそくはまもるべきだ。", "english": "Promises ought to be kept.", "nepali": "वाचा पालना गर्नुपर्छ।"}
                ]
            }
        ]
    },
    {
        "language": "JAPANESE", "level": "N3", "lesson": 60,
        "lessonTitle": "Representation & Evaluation 〜をはじめとして / 〜に応えて",
        "grammarPoints": [
            {
                "title": "1. Representative Example 〜をはじめとして",
                "pattern": "[Noun] + をはじめ（として）",
                "explanationEnglish": "Means 'starting with / including above all'.",
                "explanationNepali": "~ लाई मुख्य उदाहरण मान्दै।",
                "examples": [
                    {"target": "社長をはじめ、スタッフ全員に感謝します。", "reading": "しゃちょうをはじめ、すたっふぜんいんにかんしゃします。", "english": "I thank everyone, starting with the president.", "nepali": "अध्यक्षज्यू लगायत सम्पूर्ण कर्मचारी टोलीलाई धन्यवाद दिन्छु।"}
                ]
            },
            {
                "title": "2. In Response To 〜に応えて",
                "pattern": "[Noun] + にこたえて",
                "explanationEnglish": "Means 'in response to / answering (expectations, requests)'.",
                "explanationNepali": "~ को माग वा अपेक्षाको सम्बोधन गर्दै।",
                "examples": [
                    {"target": "ファンの期待に応えて素晴らしい演奏をした。", "reading": "ふぁんのきたいにこたえてすばらしいえんそうをした。", "english": "Performed wonderfully in response to fans' expectations.", "nepali": "प्रशंसकहरूको अपेक्षा बमोजिम उत्कृष्ट प्रस्तुति दिइयो।"}
                ]
            }
        ]
    }
]

# ─────────────────────────────────────────────────────────────────
# 3. LESSONS 51-60 KANJI DATASET (N3 Level)
# ─────────────────────────────────────────────────────────────────
n3_kanji_lessons_51_60 = [
    { "character": "政", "level": "N3", "lessonOrder": 51, "strokeCount": 9, "readingsOnyomi": ["SEI", "SHŌ"], "readingsKunyomi": ["matsurigoto"], "meanings": ["Politics", "Government"], "meaningsNepali": ["राजनीति"], "radicals": [{"radical": "攵", "meaning": "Whip/Action", "color": "#3b82f6"}], "compounds": [{"word": "政治", "reading": "seiji", "meaning": "Politics"}, {"word": "政府", "reading": "seifu", "meaning": "Government"}] },
    { "character": "議", "level": "N3", "lessonOrder": 52, "strokeCount": 20, "readingsOnyomi": ["GI"], "readingsKunyomi": [], "meanings": ["Deliberate", "Discuss", "Meeting"], "meaningsNepali": ["छलफल", "सभा"], "radicals": [{"radical": "言", "meaning": "Speech", "color": "#10b981"}], "compounds": [{"word": "会議", "reading": "kaigi", "meaning": "Meeting"}, {"word": "議論", "reading": "giron", "meaning": "Debate"}] },
    { "character": "民", "level": "N3", "lessonOrder": 53, "strokeCount": 5, "readingsOnyomi": ["MIN"], "readingsKunyomi": ["tami"], "meanings": ["People", "Nation"], "meaningsNepali": ["जनता", "नागरिक"], "radicals": [{"radical": "氏", "meaning": "Clan", "color": "#ffb703"}], "compounds": [{"word": "国民", "reading": "kokumin", "meaning": "National/Citizens"}, {"word": "市民", "reading": "shimin", "meaning": "Citizen"}] },
    { "character": "連", "level": "N3", "lessonOrder": 54, "strokeCount": 10, "readingsOnyomi": ["REN"], "readingsKunyomi": ["tsuna-garu", "tsure-ru"], "meanings": ["Connect", "Take along"], "meaningsNepali": ["जोड्नु", "साथमा लैजानु"], "radicals": [{"radical": "辶", "meaning": "Walk", "color": "#ff4d6d"}], "compounds": [{"word": "連絡", "reading": "renraku", "meaning": "Contact"}, {"word": "国連", "reading": "kokuren", "meaning": "United Nations"}] },
    { "character": "対", "level": "N3", "lessonOrder": 55, "strokeCount": 7, "readingsOnyomi": ["TAI", "TSUI"], "readingsKunyomi": [], "meanings": ["Oppose", "Target", "Versus"], "meaningsNepali": ["विपरित", "लक्ष्य"], "radicals": [{"radical": "寸", "meaning": "Measurement", "color": "#8b5cf6"}], "compounds": [{"word": "反対", "reading": "hantai", "meaning": "Opposition"}, {"word": "対象", "reading": "taishō", "meaning": "Target"}] },
    { "character": "部", "level": "N3", "lessonOrder": 56, "strokeCount": 11, "readingsOnyomi": ["BU"], "readingsKunyomi": [], "meanings": ["Section", "Department", "Part"], "meaningsNepali": ["विभाग", "भाग"], "radicals": [{"radical": "⻌", "meaning": "City", "color": "#06b6d4"}], "compounds": [{"word": "部屋", "reading": "heya", "meaning": "Room"}, {"word": "部分", "reading": "bubun", "meaning": "Part"}] },
    { "character": "合", "level": "N3", "lessonOrder": 57, "strokeCount": 6, "readingsOnyomi": ["GŌ", "GAT"], "readingsKunyomi": ["a-u", "a-waseru"], "meanings": ["Combine", "Fit", "Match"], "meaningsNepali": ["मिलाउनु", "उस्तै हुनु"], "radicals": [{"radical": "口", "meaning": "Mouth", "color": "#10b981"}], "compounds": [{"word": "合格", "reading": "gōkaku", "meaning": "Pass exam"}, {"word": "割合", "reading": "wariai", "meaning": "Ratio"}] },
    { "character": "市", "level": "N3", "lessonOrder": 58, "strokeCount": 5, "readingsOnyomi": ["SHI"], "readingsKunyomi": ["ichi"], "meanings": ["City", "Market"], "meaningsNepali": ["सहर", "बजार"], "radicals": [{"radical": "巾", "meaning": "Towel", "color": "#ffb703"}], "compounds": [{"word": "市民", "reading": "shimin", "meaning": "Citizen"}, {"word": "都市", "reading": "toshi", "meaning": "City"}] },
    { "character": "内", "level": "N3", "lessonOrder": 59, "strokeCount": 4, "readingsOnyomi": ["NAI", "DAI"], "readingsKunyomi": ["uchi"], "meanings": ["Inside", "Within"], "meaningsNepali": ["भित्र"], "radicals": [{"radical": "冂", "meaning": "Border", "color": "#3b82f6"}], "compounds": [{"word": "案内", "reading": "annai", "meaning": "Guidance"}, {"word": "内容", "reading": "naiyō", "meaning": "Content"}] },
    { "character": "相", "level": "N3", "lessonOrder": 60, "strokeCount": 9, "readingsOnyomi": ["SŌ", "SHŌ"], "readingsKunyomi": ["ai"], "meanings": ["Mutual", "Minister", "Aspect"], "meaningsNepali": ["आपसी", "मन्त्री"], "radicals": [{"radical": "目", "meaning": "Eye", "color": "#ff4d6d"}], "compounds": [{"word": "相談", "reading": "sōdan", "meaning": "Consultation"}, {"word": "相手", "reading": "aite", "meaning": "Partner/Opponent"}] }
]

print("Ready to update nihongo-vocab.ts, grammar-guide.ts, and kanji-dataset.ts for Lessons 51-60!")
