import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("scratch/docx_lessons_21_25.json", "r", encoding="utf-8") as f:
    docx_data = json.load(f)

# ─────────────────────────────────────────────────────────────────
# KANJI MAPPING for Lessons 21-25
# Rule: Only provide kanjiCharacters if the word actually HAS kanji.
# Katakana/pure-hiragana words → empty array []
# ─────────────────────────────────────────────────────────────────
kanji_nepali_map = {
    # ── LESSON 21 ──
    "おもいます":       {"kanji": "思います",        "reading": "おもいます",        "nepali": "सोच्नु / विचार गर्नु"},
    "いいます":         {"kanji": "言います",         "reading": "いいます",          "nepali": "भन्नु"},
    "たります":         {"kanji": "足ります",         "reading": "たります",          "nepali": "पुग्नु / पर्याप्त हुनु"},
    "かちます":         {"kanji": "勝ちます",         "reading": "かちます",          "nepali": "जित्नु"},
    "まけます":         {"kanji": "負けます",         "reading": "まけます",          "nepali": "हार्नु"},
    "やくに たちます":  {"kanji": "役に立ちます",     "reading": "やくにたちます",    "nepali": "उपयोगी हुनु / काम लाग्नु"},
    "うごきます":       {"kanji": "動きます",         "reading": "うごきます",        "nepali": "चल्नु / काम गर्नु (मेसिन)"},
    "やめます":         {"kanji": "辞めます",         "reading": "やめます",          "nepali": "छाड्नु / रोक्नु"},
    "きをつけます":     {"kanji": "気をつけます",     "reading": "きをつけます",      "nepali": "होशियार हुनु / ध्यान दिनु"},
    "みます":           {"kanji": "見ます",           "reading": "みます",            "nepali": "हेर्नु"},
    "むだ[な]":         {"kanji": "無駄",             "reading": "むだ",              "nepali": "व्यर्थ / खेर जाने"},
    "ふべん[な]":       {"kanji": "不便",             "reading": "ふべん",            "nepali": "असुविधाजनक"},
    "すごい":           {"kanji": "凄い",             "reading": "すごい",            "nepali": "अद्भुत / साह्रै"},
    "ほんとう":         {"kanji": "本当",             "reading": "ほんとう",          "nepali": "साँचो / सत्य"},
    "うそ":             {"kanji": "嘘",               "reading": "うそ",              "nepali": "झूट"},
    "じどうしゃ":       {"kanji": "自動車",           "reading": "じどうしゃ",        "nepali": "गाडी / कार"},
    "こうつう":         {"kanji": "交通",             "reading": "こうつう",          "nepali": "यातायात"},
    "ぶっか":           {"kanji": "物価",             "reading": "ぶっか",            "nepali": "वस्तुको मूल्य / महँगी"},
    "ほうそう":         {"kanji": "放送",             "reading": "ほうそう",          "nepali": "प्रसारण"},
    "テレビ":           {"kanji": "テレビ",           "reading": "テレビ",            "nepali": "टेलिभिजन"},
    "ニュース":         {"kanji": "ニュース",         "reading": "ニュース",          "nepali": "समाचार"},
    "たいへん":         {"kanji": "大変",             "reading": "たいへん",          "nepali": "कठिन / गाह्रो"},
    "しあい":           {"kanji": "試合",             "reading": "しあい",            "nepali": "खेल / म्याच"},
    "いけん":           {"kanji": "意見",             "reading": "いけん",            "nepali": "विचार / राय"},
    "はなし":           {"kanji": "話",               "reading": "はなし",            "nepali": "कुराकानी / कथा"},
    "たぶん":           {"kanji": "多分",             "reading": "たぶん",            "nepali": "शायद"},
    "きっと":           {"kanji": "きっと",           "reading": "きっと",            "nepali": "निश्चय नै"},
    "もちろん":         {"kanji": "勿論",             "reading": "もちろん",          "nepali": "निश्चित रूपमा / अवश्य"},
    "みなくちゃ。":     {"kanji": "見なくちゃ。",     "reading": "みなくちゃ",        "nepali": "हेर्नै पर्छ।"},
    "カンガルー":       {"kanji": "カンガルー",       "reading": "カンガルー",        "nepali": "क्याङ्गारू"},
    "キャプテン・クック":{"kanji": "キャプテン・クック","reading": "キャプテンクック", "nepali": "क्याप्टेन जेम्स कुक"},
    # Lesson 21 extras
    "ほんとうに":       {"kanji": "本当に",           "reading": "ほんとうに",        "nepali": "साँचै नै"},
    "そんなに":         {"kanji": "そんなに",         "reading": "そんなに",          "nepali": "त्यति धेरै (नकारात्मक)"},
    "について":         {"kanji": "について",         "reading": "について",          "nepali": "बारेमा"},
    "ひさしぶり":       {"kanji": "久しぶり",         "reading": "ひさしぶり",        "nepali": "धेरै समयपछि"},
    "さいきん":         {"kanji": "最近",             "reading": "さいきん",          "nepali": "हालसालै"},
    "ゆめ":             {"kanji": "夢",               "reading": "ゆめ",              "nepali": "सपना"},
    "てんさい":         {"kanji": "天才",             "reading": "てんさい",          "nepali": "प्रतिभाशाली / जिनियस"},
    "アニメ":           {"kanji": "アニメ",           "reading": "アニメ",            "nepali": "एनिमेसन"},
    "マンガ":           {"kanji": "マンガ",           "reading": "マンガ",            "nepali": "मान्गा / कमिक"},
    "デザイン":         {"kanji": "デザイン",         "reading": "デザイン",          "nepali": "डिजाइन"},
    "ちきゅう":         {"kanji": "地球",             "reading": "ちきゅう",          "nepali": "पृथ्वी"},
    "つき":             {"kanji": "月",               "reading": "つき",              "nepali": "चन्द्रमा"},

    # ── LESSON 22 ──
    "きます [着]":      {"kanji": "着ます",           "reading": "きます",            "nepali": "लगाउनु (शर्ट/कोट)"},
    "きます":           {"kanji": "着ます",           "reading": "きます",            "nepali": "लगाउनु (शर्ट/कोट)"},
    "はきます":         {"kanji": "履きます",         "reading": "はきます",          "nepali": "लगाउनु (जुत्ता/पैन्ट)"},
    "かぶります":       {"kanji": "被ります",         "reading": "かぶります",        "nepali": "लगाउनु (टोपी)"},
    "かけます [眼鏡]":  {"kanji": "かけます",         "reading": "かけます",          "nepali": "लगाउनु (चश्मा)"},
    "うまれます":       {"kanji": "生まれます",       "reading": "うまれます",        "nepali": "जन्म हुनु"},
    "コート":           {"kanji": "コート",           "reading": "コート",            "nepali": "कोट"},
    "スーツ":           {"kanji": "スーツ",           "reading": "スーツ",            "nepali": "सूट (पोशाक)"},
    "セーター":         {"kanji": "セーター",         "reading": "セーター",          "nepali": "स्वेटर"},
    "ぼうし":           {"kanji": "帽子",             "reading": "ぼうし",            "nepali": "टोपी"},
    "めがね":           {"kanji": "眼鏡",             "reading": "めがね",            "nepali": "चश्मा"},
    "よく":             {"kanji": "よく",             "reading": "よく",              "nepali": "प्रायः / धेरैजसो"},
    "おめでとうございます。": {"kanji": "おめでとうございます。", "reading": "おめでとうございます", "nepali": "बधाई छ!"},
    "こちら":           {"kanji": "こちら",           "reading": "こちら",            "nepali": "यहाँ (नम्र रूप) / यो व्यक्ति"},
    "やちん":           {"kanji": "家賃",             "reading": "やちん",            "nepali": "घर भाडा"},
    "そうですねえ。":   {"kanji": "そうですねえ。",   "reading": "そうですねえ",      "nepali": "हम्म...सोच्नुस् त।"},
    "ダイニングキッチン(DK)": {"kanji": "ダイニングキッチン", "reading": "ダイニングキッチン", "nepali": "भान्सा र भोजन कक्ष"},
    "わしつ":           {"kanji": "和室",             "reading": "わしつ",            "nepali": "जापानी शैलीको कोठा"},
    "おしいれ":         {"kanji": "押し入れ",         "reading": "おしいれ",          "nepali": "जापानी शैलीको दराज"},
    "ふとん":           {"kanji": "布団",             "reading": "ふとん",            "nepali": "जापानी गद्दा र ओढ्ने"},
    "アパート":         {"kanji": "アパート",         "reading": "アパート",          "nepali": "अपार्टमेन्ट"},
    "パリ":             {"kanji": "パリ",             "reading": "パリ",              "nepali": "पेरिस"},
    "万里の長城":       {"kanji": "万里の長城",       "reading": "ばんりのちょうじょう", "nepali": "चीनको महान पर्खाल"},
    "レジャー開発センター": {"kanji": "レジャー開発センター", "reading": "レジャーかいはつセンター", "nepali": "फुर्सद विकास केन्द्र"},
    "レジャー白書":     {"kanji": "レジャー白書",     "reading": "レジャーはくしょ",  "nepali": "फुर्सद सम्बन्धी श्वेतपत्र"},
    "家賃":             {"kanji": "家賃",             "reading": "やちん",            "nepali": "घर भाडा"},
    "和室":             {"kanji": "和室",             "reading": "わしつ",            "nepali": "जापानी शैलीको कोठा"},
    "万里の長城":       {"kanji": "万里の長城",       "reading": "ばんりのちょうじょう", "nepali": "चीनको महान पर्खाल"},

    # ── LESSON 23 ──
    "ききます [聞]":    {"kanji": "聞きます",         "reading": "ききます",          "nepali": "सोध्नु [शिक्षकलाई]"},
    "ききます":         {"kanji": "聞きます",         "reading": "ききます",          "nepali": "सोध्नु / सुन्नु"},
    "まわします":       {"kanji": "回します",         "reading": "まわします",        "nepali": "घुमाउनु"},
    "ひきます [引]":    {"kanji": "引きます",         "reading": "ひきます",          "nepali": "तान्नु"},
    "かえます":         {"kanji": "換えます",         "reading": "かえます",          "nepali": "बदल्नु / परिवर्तन गर्नु"},
    "さわります":       {"kanji": "触ります",         "reading": "さわります",        "nepali": "छुनु [ढोकामा]"},
    "でます [出]":      {"kanji": "出ます",           "reading": "でます",            "nepali": "निस्कनु [फिर्ता पैसा]"},
    "うごきます":       {"kanji": "動きます",         "reading": "うごきます",        "nepali": "चल्नु (घडी/मेसिन)"},
    "あるきます":       {"kanji": "歩きます",         "reading": "あるきます",        "nepali": "हिँड्नु [बाटोमा]"},
    "わたります":       {"kanji": "渡ります",         "reading": "わたります",        "nepali": "काट्नु / पार गर्नु [पुल]"},
    "きをつけます":     {"kanji": "気をつけます",     "reading": "きをつけます",      "nepali": "होशियार हुनु [गाडीसँग]"},
    "ひっこしします":   {"kanji": "引越しします",     "reading": "ひっこしします",    "nepali": "घर सर्नु"},
    "でんきや":         {"kanji": "電気屋",           "reading": "でんきや",          "nepali": "बिजुली पसल / इलेक्ट्रिसियन"},
    "～や":             {"kanji": "～屋",             "reading": "～や",              "nepali": "~ को पसल / ~ को व्यक्ति"},
    "サイズ":           {"kanji": "サイズ",           "reading": "サイズ",            "nepali": "साइज"},
    "おと":             {"kanji": "音",               "reading": "おと",              "nepali": "आवाज / ध्वनि"},
    "きかい":           {"kanji": "機械",             "reading": "きかい",            "nepali": "मेसिन"},
    "つまみ":           {"kanji": "つまみ",           "reading": "つまみ",            "nepali": "नब / ह्यान्डल"},
    "こしょう":         {"kanji": "故障",             "reading": "こしょう",          "nepali": "खराब हुनु / बिग्रनु"},
    "みち":             {"kanji": "道",               "reading": "みち",              "nepali": "बाटो / मार्ग"},
    "こうさてん":       {"kanji": "交差点",           "reading": "こうさてん",        "nepali": "चोक / चौबाटो"},
    "しんごう":         {"kanji": "信号",             "reading": "しんごう",          "nepali": "ट्रफिक लाइट"},
    "かど":             {"kanji": "角",               "reading": "かど",              "nepali": "कुनो / मोड"},
    "はし":             {"kanji": "橋",               "reading": "はし",              "nepali": "पुल"},
    "ちゅうしゃじょう": {"kanji": "駐車場",           "reading": "ちゅうしゃじょう",  "nepali": "पार्किङ स्थल"},
    "～ばんめ":         {"kanji": "～番目",           "reading": "～ばんめ",          "nepali": "~ औं (क्रम संख्या)"},
    "おしょうがつ":     {"kanji": "お正月",           "reading": "おしょうがつ",      "nepali": "जापानी नयाँ वर्ष"},
    "ごちそうさまでした。": {"kanji": "ごちそうさまでした。", "reading": "ごちそうさまでした", "nepali": "खाना मीठो थियो। (खाएपछि भनिन्छ)"},
    "たてもの":         {"kanji": "建物",             "reading": "たてもの",          "nepali": "भवन / इमारत"},
    "がいこくじんとうろくしょう": {"kanji": "外国人登録証", "reading": "がいこくじんとうろくしょう", "nepali": "विदेशी दर्ता कार्ड"},
    "しょうとくたいし": {"kanji": "聖徳太子",         "reading": "しょうとくたいし",  "nepali": "प्रिन्स सोतोकू (५७४-६२२)"},
    "ほうりゅうじ":     {"kanji": "法隆寺",           "reading": "ほうりゅうじ",      "nepali": "होर्युजी मन्दिर (नारा)"},
    "げんきちゃ":       {"kanji": "げんきちゃ",       "reading": "げんきちゃ",        "nepali": "जेनकी-चा (काल्पनिक चिया)"},

    # ── LESSON 24 ──
    "くれます":         {"kanji": "くれます",         "reading": "くれます",          "nepali": "दिनु (मलाई)"},
    "つれていきます":   {"kanji": "連れて行きます",   "reading": "つれていきます",    "nepali": "साथमा लैजानु (व्यक्ति)"},
    "つれてきます":     {"kanji": "連れて来ます",     "reading": "つれてきます",      "nepali": "साथमा ल्याउनु (व्यक्ति)"},
    "つれて いきます":  {"kanji": "連れて行きます",   "reading": "つれていきます",    "nepali": "साथमा लैजानु (व्यक्ति)"},
    "つれて きます":    {"kanji": "連れて来ます",     "reading": "つれてきます",      "nepali": "साथमा ल्याउनु (व्यक्ति)"},
    "おくります":       {"kanji": "送ります",         "reading": "おくります",        "nepali": "पठाउनु / बिदाइ गर्नु"},
    "しょうかいします": {"kanji": "紹介します",       "reading": "しょうかいします",  "nepali": "परिचय दिनु"},
    "あんないします":   {"kanji": "案内します",       "reading": "あんないします",    "nepali": "मार्गदर्शन गर्नु / घुमाउनु"},
    "せつめいします":   {"kanji": "説明します",       "reading": "せつめいします",    "nepali": "व्याख्या गर्नु"},
    "いれます [コーヒー]": {"kanji": "入れます",      "reading": "いれます",          "nepali": "बनाउनु [कफी]"},
    "おじいさん":       {"kanji": "お爺さん",         "reading": "おじいさん",        "nepali": "हजुरबा / वृद्ध पुरुष"},
    "おばあさん":       {"kanji": "お婆さん",         "reading": "おばあさん",        "nepali": "हजुरआमा / वृद्ध महिला"},
    "じゅんび":         {"kanji": "準備",             "reading": "じゅんび",          "nepali": "तयारी गर्नु"},
    "いみ":             {"kanji": "意味",             "reading": "いみ",              "nepali": "अर्थ / मतलब"},
    "おかし":           {"kanji": "お菓子",           "reading": "おかし",            "nepali": "मिठाई / खाजा"},
    "みんな":           {"kanji": "みんな",           "reading": "みんな",            "nepali": "सबैजना"},
    "ひとりで":         {"kanji": "一人で",           "reading": "ひとりで",          "nepali": "एक्लैले"},
    "ほかに":           {"kanji": "他に",             "reading": "ほかに",            "nepali": "थप / अन्य"},
    "ワゴンしゃ":       {"kanji": "ワゴン車",         "reading": "ワゴンしゃ",        "nepali": "स्टेशन वागन गाडी"},
    "おべんとう":       {"kanji": "お弁当",           "reading": "おべんとう",        "nepali": "बक्स लञ्च / खाजा डिब्बा"},
    "ははのひ":         {"kanji": "母の日",           "reading": "ははのひ",          "nepali": "आमाको दिन"},

    # ── LESSON 25 ──
    "かんがえます":     {"kanji": "考えます",         "reading": "かんがえます",      "nepali": "सोच्नु / विचार गर्नु"},
    "つきます":         {"kanji": "着きます",         "reading": "つきます",          "nepali": "पुग्नु [स्टेशनमा]"},
    "りゅうがくします": {"kanji": "留学します",       "reading": "りゅうがくします",  "nepali": "विदेशमा पढ्नु"},
    "としをとります":   {"kanji": "年を取ります",     "reading": "としをとります",    "nepali": "बुढो हुनु"},
    "としを とります":  {"kanji": "年を取ります",     "reading": "としをとります",    "nepali": "बुढो हुनु"},
    "いなか":           {"kanji": "田舎",             "reading": "いなか",            "nepali": "गाउँघर / मातृभूमि"},
    "たいしかん":       {"kanji": "大使館",           "reading": "たいしかん",        "nepali": "दूतावास"},
    "グループ":         {"kanji": "グループ",         "reading": "グループ",          "nepali": "समूह"},
    "チャンス":         {"kanji": "チャンス",         "reading": "チャンス",          "nepali": "मौका / अवसर"},
    "おく":             {"kanji": "億",               "reading": "おく",              "nepali": "१० करोड (अरब)"},
    "もし～":           {"kanji": "もし～",           "reading": "もし",              "nepali": "यदि ~ हो भने"},
    "～ても":           {"kanji": "～ても",           "reading": "～ても",            "nepali": "चाहे ~ भए पनि"},
    "てんきん":         {"kanji": "転勤",             "reading": "てんきん",          "nepali": "सरुवा / अर्को ठाउँमा स्थानान्तरण"},
    "こと":             {"kanji": "事",               "reading": "こと",              "nepali": "कुरा / विषय"},
    "いっしょにのみましょう。": {"kanji": "一緒に飲みましょう。", "reading": "いっしょにのみましょう", "nepali": "सँगै खाऔँ।"},
    "iroiro osewa ni narimashita。": {"kanji": "いろいろお世話になりました。", "reading": "いろいろおせわになりました", "nepali": "सबैतिरबाट उपकार भयो।"},
    "いろいろおせわになりました。": {"kanji": "いろいろお世話になりました。", "reading": "いろいろおせわになりました", "nepali": "धेरैतिरबाट सहयोग पाएँ। धन्यवाद।"},
    "がんばります":     {"kanji": "頑張ります",       "reading": "がんばります",      "nepali": "मेहनत गर्नु / जमेर लाग्नु"},
    "おげんきで。":     {"kanji": "お元気で。",       "reading": "おげんきで",        "nepali": "सन्चै रहनुहोस्। (लामो बिछोडमा भनिन्छ)"},

    # ── REMAINING LESSON 21 ITEMS ──
    "あります [催]":      {"kanji": "あります",          "reading": "あります",          "nepali": "हुनु (उत्सव/कार्यक्रम आयोजना हुनु)"},
    "もったいない":        {"kanji": "勿体ない",          "reading": "もったいない",       "nepali": "फोहोर हुनु / बर्बाद हुनु"},
    "ふべん(な)":         {"kanji": "不便",              "reading": "ふべん",             "nepali": "असुविधाजनक"},
    "おなじ":             {"kanji": "同じ",              "reading": "おなじ",             "nepali": "उस्तै / एउटै"},
    "そうりだいじん":     {"kanji": "総理大臣",          "reading": "そうりだいじん",     "nepali": "प्रधानमन्त्री"},
    "だいとうりょう":     {"kanji": "大統領",            "reading": "だいとうりょう",     "nepali": "राष्ट्रपति"},
    "せいじ":             {"kanji": "政治",              "reading": "せいじ",             "nepali": "राजनीति"},
    "スピーチ":           {"kanji": "スピーチ",          "reading": "スピーチ",           "nepali": "भाषण"},
    "アルバイト":         {"kanji": "アルバイト",        "reading": "アルバイト",         "nepali": "पार्ट-टाइम काम"},
    "ユーモア":           {"kanji": "ユーモア",          "reading": "ユーモア",           "nepali": "हास्य / विनोद"},
    "ラッシュ":           {"kanji": "ラッシュ",          "reading": "ラッシュ",           "nepali": "भिडभाड / रश घण्टा"},
    "あまり":             {"kanji": "余り",              "reading": "あまり",             "nepali": "त्यति धेरै होइन (नकारात्मक)"},
    "しかたが ないです。": {"kanji": "仕方がないです。",  "reading": "しかたがないです",   "nepali": "अब केही गर्न सकिँदैन। / विकल्प छैन।"},
    "～でも のみませんか。": {"kanji": "～でも飲みませんか。", "reading": "でものみませんか", "nepali": "~ वा केही पिउन जाउँ?"},

    # ── REMAINING LESSON 23 ITEMS ──
    "きを つけます":      {"kanji": "気をつけます",      "reading": "きをつけます",       "nepali": "होशियार हुनु [गाडीसँग]"},
    "~や":                {"kanji": "~屋",               "reading": "~や",                "nepali": "~ को पसल / ~ गर्ने मान्छे"},
    "~ばんめ":            {"kanji": "~番目",             "reading": "~ばんめ",            "nepali": "~ औं (क्रम संख्या)"},
    "がいこくじん とうろくしょう": {"kanji": "外国人登録証", "reading": "がいこくじんとうろくしょう", "nepali": "विदेशी नागरिक दर्ता कार्ड"},

    # ── REMAINING LESSON 24 ITEMS ──
    "ははの ひ":           {"kanji": "母の日",            "reading": "ははのひ",           "nepali": "आमाको दिन"},

    # ── REMAINING LESSON 25 ITEMS ──
    "もし~":              {"kanji": "もし~",             "reading": "もし",               "nepali": "यदि ~ हो भने"},
    "~ても":              {"kanji": "~ても",             "reading": "~ても",              "nepali": "चाहे ~ भए पनि"},
    "いっしょに のみましょう。": {"kanji": "一緒に飲みましょう。", "reading": "いっしょにのみましょう", "nepali": "सँगै पिउन जाउँ!"},
    "いろいろ おせわに なりました。": {"kanji": "いろいろお世話になりました。", "reading": "いろいろおせわになりました", "nepali": "अनेकन सहयोगका लागि धेरै धन्यवाद।"},
}

def extract_kanji_array(kanji_word):
    """Extract only CJK characters from the Kanji written form"""
    chars = re.findall(r'[\u4e00-\u9faf]', kanji_word)
    return list(dict.fromkeys(chars))

def get_pos(jp, eng):
    eng_lower = eng.lower()
    if any(jp.endswith(v) for v in ['ます', 'する']) or 'verb' in eng_lower:
        return 'Verb'
    elif jp.endswith('い') and '(' not in jp:
        return 'I-Adj'
    elif jp.endswith('[な]') or jp.endswith('(な)') or 'adjective' in eng_lower:
        return 'Na-Adj'
    return 'Noun'

def lookup(jp_raw):
    jp_clean = jp_raw.strip()
    if jp_clean in kanji_nepali_map:
        return kanji_nepali_map[jp_clean]
    for key, val in kanji_nepali_map.items():
        if jp_clean == key.strip():
            return val
    # Partial match
    for key, val in kanji_nepali_map.items():
        if jp_clean in key or key in jp_clean:
            return val
    return None

def format_vocab_entries(lesson_num):
    v_raw = docx_data[str(lesson_num)]["vocab"]
    lines = []
    lines.append(f"  // ════════════════════════════════════════════════════════")
    lines.append(f"  // LESSON {lesson_num} ({len(v_raw)} ITEMS from Minna no Nihongo I)")
    lines.append(f"  // ════════════════════════════════════════════════════════")
    
    for idx, item in enumerate(v_raw, start=1):
        jp  = item["japanese"]
        eng = item["english"]
        
        entry = lookup(jp)
        if entry:
            kanji_word = entry["kanji"]
            reading    = entry["reading"]
            nepali     = entry["nepali"]
        else:
            kanji_word = jp
            reading    = jp
            nepali     = f"{eng}"
        
        # Only include kanji characters if there ARE kanji in the word
        kanji_chars = extract_kanji_array(kanji_word)
        pos = get_pos(jp, eng)
        
        word_json    = json.dumps(kanji_word, ensure_ascii=False)
        reading_json = json.dumps(reading,    ensure_ascii=False)
        eng_json     = json.dumps(eng,        ensure_ascii=False)
        np_json      = json.dumps(nepali,     ensure_ascii=False)
        kanji_json   = json.dumps(kanji_chars,ensure_ascii=False)
        pos_json     = json.dumps(pos,        ensure_ascii=False)
        
        ex_jp  = json.dumps(f"{kanji_word}。",    ensure_ascii=False)
        ex_rd  = json.dumps(f"{reading}。",        ensure_ascii=False)
        ex_eng = json.dumps(f"Example: {eng}.",    ensure_ascii=False)
        ex_np  = json.dumps(f"उदाहरण: {nepali}।", ensure_ascii=False)
        
        lines.append(
            f"  {{\n"
            f"    id: 'N5-L{lesson_num}-{idx:03d}', lesson: {lesson_num}, level: 'N5', word: {word_json}, reading: {reading_json},\n"
            f"    meaning: {eng_json}, meaningNepali: {np_json},\n"
            f"    kanjiCharacters: {kanji_json}, partOfSpeech: {pos_json},\n"
            f"    grammarSentences: [\n"
            f"      {{ japanese: {ex_jp}, reading: {ex_rd}, english: {ex_eng}, nepali: {ex_np} }}\n"
            f"    ]\n"
            f"  }},"
        )
    return "\n".join(lines)

# Write the final file
ts_output = (
    "// ============================================================\n"
    "// MINNA NO NIHONGO JLPT N5 — Vocab (Lessons 21 to 25)\n"
    "// SOURCE: Minna_no_Nihongo_I_Lessons_21-25.docx (official textbook)\n"
    "// Kanji written forms provided where kanji exists; else left empty\n"
    "// Proper Nepali translations for each vocabulary item\n"
    "// ============================================================\n"
    "import type { VocabItem } from './nihongo-vocab';\n\n"
    "export const N5_LESSONS_21TO25: VocabItem[] = [\n" +
    "\n".join(format_vocab_entries(l) for l in [21, 22, 23, 24, 25]) +
    "\n];\n"
)

with open("lib/n5-lessons-21to25.ts", "w", encoding="utf-8") as f:
    f.write(ts_output)

print("✅ lib/n5-lessons-21to25.ts fully rewritten from DOCX!")

# Coverage report
print("\n📊 Coverage:")
total = 0
mapped = 0
for l in range(21, 26):
    items = docx_data[str(l)]["vocab"]
    m = sum(1 for i in items if lookup(i["japanese"]))
    total += len(items)
    mapped += m
    print(f"  Lesson {l}: {len(items)} items, {m} mapped ({'✅' if m==len(items) else f'⚠ {len(items)-m} fallback'})")
print(f"\n  TOTAL: {mapped}/{total} ({mapped/total*100:.1f}%) items mapped")
