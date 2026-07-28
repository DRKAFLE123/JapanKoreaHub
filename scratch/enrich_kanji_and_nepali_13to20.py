import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("scratch/docx_lessons_13_20.json", "r", encoding="utf-8") as f:
    docx_data = json.load(f)

# ─────────────────────────────────────────────────────────────────
# COMPREHENSIVE KANJI + NEPALI DICTIONARY FOR LESSONS 13-20
# ─────────────────────────────────────────────────────────────────
n5_dict = {
    # ── LESSON 13 ──
    "あそびます":           {"kanji": "遊びます",            "reading": "あそびます",           "nepali": "रमाइलो गर्नु / खेल्नु"},
    "およぎます":           {"kanji": "泳ぎます",            "reading": "およぎます",           "nepali": "पौडी खेल्नु"},
    "むかえに いきます":    {"kanji": "迎えに行きます",      "reading": "むかえにいきます",     "nepali": "भेट्न जानु / स्वागत गर्नु"},
    "つかれます":           {"kanji": "疲れます",            "reading": "つかれます",           "nepali": "थाक्नु"},
    "けっこんします":       {"kanji": "結婚します",          "reading": "けっこんします",       "nepali": "विवाह गर्नु"},
    "かいもの":             {"kanji": "買い物",              "reading": "かいもの",             "nepali": "किनमेल"},
    "しょくじ":             {"kanji": "食事",                "reading": "しょくじ",             "nepali": "खाना / भोजन"},
    "さんぽ":               {"kanji": "散歩",                "reading": "さんぽ",               "nepali": "घुम्न जानु / पैदल यात्रा"},
    "たいへん":             {"kanji": "大変",                "reading": "たいへん",             "nepali": "कठिन / गाह्रो"},
    "ほしい":               {"kanji": "欲しい",              "reading": "ほしい",               "nepali": "चाहिनु / इच्छा हुनु"},
    "ひろい":               {"kanji": "広い",                "reading": "ひろい",               "nepali": "फराकिलो"},
    "せまい":               {"kanji": "狭い",                "reading": "せまい",               "nepali": "साँघुरो"},
    "しやくしょ":           {"kanji": "市役所",              "reading": "しやくしょ",           "nepali": "नगरपालिका कार्यालय"},
    "プール":               {"kanji": "プール",              "reading": "プール",               "nepali": "स्विमिङ पुल"},
    "かわ":                 {"kanji": "川",                  "reading": "かわ",                 "nepali": "नदी / खोला"},
    "びじゅつ":             {"kanji": "美術",                "reading": "びじゅつ",             "nepali": "कला / ललितकला"},
    "つり":                 {"kanji": "釣り",                "reading": "つり",                 "nepali": "माछा मार्ने कार्य"},
    "スキー":               {"kanji": "スキー",              "reading": "スキー",               "nepali": "स्किइङ"},
    "週末":                 {"kanji": "週末",                "reading": "しゅうまつ",           "nepali": "सप्ताहान्त (हप्ताको अन्त्य)"},
    "お正月":               {"kanji": "お正月",              "reading": "おしょうがつ",         "nepali": "जापानी नयाँ वर्ष"},
    "ころ":                 {"kanji": "頃",                  "reading": "ころ",                 "nepali": "लगभग / करिब (समयको)"},
    "なにか":               {"kanji": "何か",                "reading": "なにか",               "nepali": "केही [वस्तु]"},
    "どこか":               {"kanji": "どこか",              "reading": "どこか",               "nepali": "कतै [ठाउँ]"},
    "のどが かわきます":    {"kanji": "喉が渇きます",        "reading": "のどがかわきます",     "nepali": "तिर्खा लाग्नु"},
    "おなかが すきます":    {"kanji": "お腹が空きます",      "reading": "おなかがすきます",     "nepali": "भोक लाग्नु"},
    "そう しましょう":      {"kanji": "そうしましょう",      "reading": "そうしましょう",       "nepali": "त्यसै गरौँ"},
    "ご注文は":             {"kanji": "ご注文は",            "reading": "ごちゅうもんは",       "nepali": "तपाईं के अर्डर गर्नुहुन्छ?"},
    "定食":                 {"kanji": "定食",                "reading": "ていしょく",           "nepali": "सेट खाना"},
    "牛どん":               {"kanji": "牛どん",              "reading": "ぎゅうどん",           "nepali": "गाईको मासु भात (ग्युदोन)"},
    "少々お待ちください":   {"kanji": "少々お待ちください",  "reading": "しょうしょうおまちください", "nepali": "कृपया केही छिन पर्खनुहोस्"},
    "でございます":         {"kanji": "でございます",        "reading": "でございます",         "nepali": "हो (नम्र रूप)"},
    "別々に":               {"kanji": "別々に",              "reading": "べつべつに",           "nepali": "छुट्टाछुट्टा"},

    # ── LESSON 14 ──
    "つけます":             {"kanji": "つけます",            "reading": "つけます",             "nepali": "बाल्नु / अन गर्नु"},
    "けします":             {"kanji": "消します",            "reading": "けします",             "nepali": "निभाउनु / अफ गर्नु"},
    "あけます":             {"kanji": "開けます",            "reading": "あけます",             "nepali": "खोल्नु"},
    "しめます":             {"kanji": "閉めます",            "reading": "しめます",             "nepali": "बन्द गर्नु"},
    "いそぎます":           {"kanji": "急ぎます",            "reading": "いそぎます",           "nepali": "हतार गर्नु"},
    "まちます":             {"kanji": "待ちます",            "reading": "まちます",             "nepali": "पर्खनु"},
    "もちます":             {"kanji": "持ちます",            "reading": "もちます",             "nepali": "समात्नु / बोक्नु"},
    "とります":             {"kanji": "取ります",            "reading": "とります",             "nepali": "लिनु / पास गर्नु"},
    "てつだいます":         {"kanji": "手伝います",          "reading": "てつだいます",         "nepali": "सहयोग गर्नु"},
    "よびます":             {"kanji": "呼びます",            "reading": "よびます",             "nepali": "बोलाउनु"},
    "はなします":           {"kanji": "話します",            "reading": "はなします",           "nepali": "बोल्नु / कुराकानी गर्नु"},
    "つかいます":           {"kanji": "使います",            "reading": "つかいます",           "nepali": "प्रयोग गर्नु"},
    "とめます":             {"kanji": "止めます",            "reading": "とめます",             "nepali": "रोक्नु / पार्क गर्नु"},
    "みせます":             {"kanji": "見せます",            "reading": "みせます",             "nepali": "देखाउनु"},
    "おしえます":           {"kanji": "教えます",            "reading": "おしえます",           "nepali": "सिकाउनु / भन्नु"},
    "すわります":           {"kanji": "座ります",            "reading": "すわります",           "nepali": "बस्नु [कुर्सीमा]"},
    "たちます":             {"kanji": "立ちます",            "reading": "たちます",             "nepali": "उभिनु"},
    "はいります":           {"kanji": "入ります",            "reading": "はいります",           "nepali": "छिर्नु"},
    "でます":               {"kanji": "出ます",              "reading": "でます",               "nepali": "बाहिर निस्कनु"},
    "ふります":             {"kanji": "降ります",            "reading": "ふります",             "nepali": "पानी/हिउँ पर्नु"},
    "コピーします":         {"kanji": "コピーします",        "reading": "コピーします",         "nepali": "प्रतिलिपि गर्नु / फोटोकपी गर्नु"},
    "でんき":               {"kanji": "電気",                "reading": "でんき",               "nepali": "बिजुली / बत्ती"},
    "エアコン":             {"kanji": "エアコン",            "reading": "エアコン",             "nepali": "एयर कन्डिसनर"},
    "パスポート":           {"kanji": "パスポート",          "reading": "パスポート",           "nepali": "राहदानी / पासपोर्ट"},
    "なまえ":               {"kanji": "名前",                "reading": "なまえ",               "nepali": "नाम"},
    "じゅうしょ":           {"kanji": "住所",                "reading": "じゅうしょ",           "nepali": "ठेगाना"},
    "ちず":                 {"kanji": "地図",                "reading": "ちず",                 "nepali": "नक्सा"},
    "しお":                 {"kanji": "塩",                  "reading": "しお",                 "nepali": "नुन"},
    "さとう":               {"kanji": "砂糖",                "reading": "さとう",               "nepali": "चिनी"},
    "もんだい":             {"kanji": "問題",                "reading": "もんだい",             "nepali": "समस्या / प्रश्न"},
    "こたえ":               {"kanji": "答え",                "reading": "こたえ",               "nepali": "उत्तर"},
    "よみかた":             {"kanji": "読み方",              "reading": "よみかた",             "nepali": "पढ्ने तरिका / उच्चारण"},
    "まっすぐ":             {"kanji": "真っ直ぐ",            "reading": "まっすぐ",             "nepali": "सिधा"},
    "ゆっくり":             {"kanji": "ゆっくり",            "reading": "ゆっくり",             "nepali": "बिस्तारै / आरामले"},
    "すぐ":                 {"kanji": "直ぐ",                "reading": "すぐ",                 "nepali": "तुरुन्तै"},
    "また":                 {"kanji": "また",                "reading": "また",                 "nepali": "फेरि"},
    "あとで":               {"kanji": "後で",                "reading": "あとで",               "nepali": "पछि"},
    "もう すこし":          {"kanji": "もう少し",            "reading": "もうすこし",           "nepali": "अझ अलि"},
    "もう":                 {"kanji": "もう",                "reading": "もう",                 "nepali": "अझै / अर्को"},
    "お釣り":               {"kanji": "お釣り",              "reading": "おつり",               "nepali": "फिर्ता पैसा"},

    # ── LESSON 15 ──
    "おきます [置]":        {"kanji": "置きます",            "reading": "おきます",             "nepali": "राख्नु"},
    "おきます":             {"kanji": "置きます",            "reading": "おきます",             "nepali": "राख्नु"},
    "つくります":           {"kanji": "作ります",            "reading": "つくります",           "nepali": "बनाउनु / उत्पादन गर्नु"},
    "うります":             {"kanji": "売ります",            "reading": "うります",             "nepali": "बेच्नु"},
    "しります":             {"kanji": "知ります",            "reading": "しります",             "nepali": "थाहा पाउनु / जान्नु"},
    "すみます":             {"kanji": "住みます",            "reading": "すみます",             "nepali": "बस्नु / निवास गर्नु"},
    "けんきゅうします":     {"kanji": "研究します",          "reading": "けんきゅうします",     "nepali": "अनुसन्धान गर्नु"},
    "しりょう":             {"kanji": "資料",                "reading": "しりょう",             "nepali": "सामग्री / डाटा"},
    "カタログ":             {"kanji": "カタログ",            "reading": "カタログ",             "nepali": "क्याटलग"},
    "じかんわり":           {"kanji": "時間割",              "reading": "じかんわり",           "nepali": "समय तालिका"},
    "ふく":                 {"kanji": "服",                  "reading": "ふく",                 "nepali": "कपडा"},
    "せいひん":             {"kanji": "製品",                "reading": "せいひん",             "nepali": "उत्पादन / सामान"},
    "ソフト":               {"kanji": "ソフト",              "reading": "ソフト",               "nepali": "सफ्टवेयर"},
    "でんしじしょ":         {"kanji": "電子辞書",            "reading": "でんしじしょ",         "nepali": "इलेक्ट्रोनिक शब्दकोश"},
    "けいざい":             {"kanji": "経済",                "reading": "けいざい",             "nepali": "अर्थशास्त्र"},
    "高校":                 {"kanji": "高校",                "reading": "こうこう",             "nepali": "उच्च माध्यमिक विद्यालय"},
    "独身":                 {"kanji": "独身",                "reading": "どくしん",             "nepali": "अविवाहित"},
    "思いだします":         {"kanji": "思い出します",        "reading": "おもいだします",       "nepali": "सम्झनु"},
    "ご家族":               {"kanji": "ご家族",              "reading": "ごかぞく",             "nepali": "तपाईंको परिवार"},
    "いらっしゃいます":     {"kanji": "いらっしゃいます",    "reading": "いらっしゃいます",     "nepali": "हुनुहुन्छ (नम्र रूप)"},

    # ── LESSON 16 ──
    "のります":             {"kanji": "乗ります",            "reading": "のります",             "nepali": "चढ्नु [रेलमा]"},
    "おります":             {"kanji": "降ります",            "reading": "おります",             "nepali": "ओर्लनु [रेलबाट]"},
    "のりかえます":         {"kanji": "乗り換えます",        "reading": "のりかえます",         "nepali": "परिवर्तन गर्नु [रेल/बस]"},
    "あびます":             {"kanji": "浴びます",            "reading": "あびます",             "nepali": "नुहाउनु [शावरबाट]"},
    "いれます":             {"kanji": "入れます",            "reading": "いれます",             "nepali": "हाल्नु / छिराउनु"},
    "だします":             {"kanji": "出します",            "reading": "だします",             "nepali": "झिक्नु [पैसा]"},
    "やめます":             {"kanji": "辞めます",            "reading": "やめます",             "nepali": "छाड्नु / अवकाश लिनु"},
    "おします":             {"kanji": "押します",            "reading": "おします",             "nepali": "थिच्नु / दबाउनु"},
    "わかい":               {"kanji": "若い",                "reading": "わかい",               "nepali": "जवान / कान्छो"},
    "ながい":               {"kanji": "長い",                "reading": "ながい",               "nepali": "लामो"},
    "みじかい":             {"kanji": "短い",                "reading": "みじかい",             "nepali": "छोटो"},
    "あかるい":             {"kanji": "明るい",              "reading": "あかるい",             "nepali": "उज्यालो"},
    "くらい":               {"kanji": "暗い",                "reading": "くらい",               "nepali": "अध्यारो"},
    "からだ":               {"kanji": "体",                  "reading": "からだ",               "nepali": "शरीर"},
    "あたま":               {"kanji": "頭",                  "reading": "あたま",               "nepali": "टाउको"},
    "かみ":                 {"kanji": "髪",                  "reading": "かみ",                 "nepali": "कपाल"},
    "かお":                 {"kanji": "顔",                  "reading": "かお",                 "nepali": "अनुहार"},
    "め":                   {"kanji": "目",                  "reading": "め",                   "nepali": "आँखा"},
    "みみ":                 {"kanji": "耳",                  "reading": "みみ",                 "nepali": "कान"},
    "くち":                 {"kanji": "口",                  "reading": "くち",                 "nepali": "मुख"},
    "は":                   {"kanji": "歯",                  "reading": "は",                   "nepali": "दाँत"},
    "おなか":               {"kanji": "お腹",                "reading": "おなか",               "nepali": "पेट"},
    "あし":                 {"kanji": "足",                  "reading": "あし",                 "nepali": "खुट्टा"},
    "せ":                   {"kanji": "背",                  "reading": "せ",                   "nepali": "उचाइ / कद"},
    "サービス":             {"kanji": "サービス",            "reading": "サービス",             "nepali": "सेवा"},
    "ジョギング":           {"kanji": "ジョギング",          "reading": "ジョギング",           "nepali": "जगिङ"},
    "シャワー":             {"kanji": "シャワー",            "reading": "シャワー",             "nepali": "शावर"},
    "みどり":               {"kanji": "緑",                  "reading": "みどり",               "nepali": "हरियाली / हरियो"},
    "お寺":                 {"kanji": "お寺",                "reading": "おてら",               "nepali": "बौद्ध मन्दिर"},
    "神社":                 {"kanji": "神社",                "reading": "じんじゃ",             "nepali": "शिन्तो मन्दिर"},
    "どうやって":           {"kanji": "どうやって",          "reading": "どうやって",           "nepali": "कसरी"},
    "どの":                 {"kanji": "どの",                "reading": "どの",                 "nepali": "कुन (तीन वा बढीमध्ये)"},
    "どれ":                 {"kanji": "どれ",                "reading": "どれ",                 "nepali": "कुन चाहिँ"},
    "まず":                 {"kanji": "まず",                "reading": "まず",                 "nepali": "पहिले"},
    "キャッシュカード":     {"kanji": "キャッシュカード",    "reading": "キャッシュカード",     "nepali": "क्यास कार्ड"},
    "暗証番号":             {"kanji": "暗証番号",            "reading": "あんしょうばんごう",   "nepali": "पिन कोड / गोप्य नम्बर"},
    "金額":                 {"kanji": "金額",                "reading": "きんがく",             "nepali": "रकम / जम्मा"},
    "確認":                 {"kanji": "確認",                "reading": "かくにん",             "nepali": "पुष्टि गर्नु"},
    "ボタン":               {"kanji": "ボタン",              "reading": "ボタン",               "nepali": "बटन"},

    # ── LESSON 17 ──
    "おぼえます":           {"kanji": "覚えます",            "reading": "おぼえます",           "nepali": "याद गर्नु / घोक्नु"},
    "わすれます":           {"kanji": "忘れます",            "reading": "わすれます",           "nepali": "बिर्सनु"},
    "なくします":           {"kanji": "なくします",          "reading": "なくします",           "nepali": "हराउनु [चिज हराउनु]"},
    "はらいます":           {"kanji": "払います",            "reading": "はらいます",           "nepali": "तिर्नु [पैसा]"},
    "かえします":           {"kanji": "返します",            "reading": "かえします",           "nepali": "फिर्ता गर्नु"},
    "かけます [電話]":      {"kanji": "かけます",            "reading": "かけます",             "nepali": "फोन गर्नु"},
    "かけます":             {"kanji": "かけます",            "reading": "かけます",             "nepali": "फोन गर्नु / लगाउनु"},
    "ぬぎます":             {"kanji": "脱ぎます",            "reading": "ぬぎます",             "nepali": "खोल्नु [लुगा/जुत्ता]"},
    "もっていきます":       {"kanji": "持って行きます",      "reading": "もっていきます",       "nepali": "साथमा लैजानु"},
    "もってきます":         {"kanji": "持って来ます",        "reading": "もってきます",         "nepali": "साथमा ल्याउनु"},
    "しんぱいします":       {"kanji": "心配します",          "reading": "しんぱいします",       "nepali": "चिन्ता गर्नु"},
    "ざんぎょうします":     {"kanji": "残業します",          "reading": "ざんぎょうします",     "nepali": "ओभरटाइम काम गर्नु"},
    "しゅっちょうします":   {"kanji": "出張します",          "reading": "しゅっちょうします",   "nepali": "व्यापारिक भ्रमण गर्नु"},
    "たいせつ":             {"kanji": "大切",                "reading": "たいせつ",             "nepali": "महत्वपूर्ण / कदरयोग्य"},
    "だいじょうぶ":         {"kanji": "大丈夫",              "reading": "だいじょうぶ",         "nepali": "ठिकै छ / समस्या छैन"},
    "あぶない":             {"kanji": "危ない",              "reading": "あぶない",             "nepali": "खतरनाक"},
    "禁煙":                 {"kanji": "禁煙",                "reading": "きんえん",             "nepali": "धुम्रपान निषेध"},
    "保険証":               {"kanji": "保険証",              "reading": "ほけんしょう",         "nepali": "स्वास्थ्य बीमा कार्ड"},
    "熱":                   {"kanji": "熱",                  "reading": "ねつ",                 "nepali": "ज्वरो / बुखार"},
    "病気":                 {"kanji": "病気",                "reading": "びょうき",             "nepali": "बिरामी / रोग"},
    "薬":                   {"kanji": "薬",                  "reading": "くすり",               "nepali": "औषधि"},
    "上着":                 {"kanji": "上着",                "reading": "うわぎ",               "nepali": "ज्याकेट / कोट"},
    "下着":                 {"kanji": "下着",                "reading": "したぎ",               "nepali": "भित्री वस्त्र"},
    "２、３日":             {"kanji": "２、３日",            "reading": "にさんにち",           "nepali": "२ वा ३ दिन"},
    "までに":               {"kanji": "までに",              "reading": "までに",               "nepali": "अघि / भित्रमा [समय सीमा]"},
    "ですから":             {"kanji": "ですから",            "reading": "ですから",             "nepali": "त्यसैले / त्यही कारण"},
    "どうしましたか":       {"kanji": "どうしましたか",      "reading": "どうしましたか",       "nepali": "के भयो?"},
    "喉":                   {"kanji": "喉",                  "reading": "のど",                 "nepali": "घाँटी"},
    "お大事に":             {"kanji": "お大事に",            "reading": "おだいじに",           "nepali": "छिट्टै निको हुनुहोस्"},

    # ── LESSON 18 ──
    "できます":             {"kanji": "出来ます",            "reading": "できます",             "nepali": "सक्नु / सम्भव हुनु"},
    "あらいます":           {"kanji": "洗います",            "reading": "あらいます",           "nepali": "पखाल्नु / धुनु"},
    "ひきます":             {"kanji": "弾きます",            "reading": "ひきます",             "nepali": "बजाउनु [बाजा/पियानो]"},
    "うたいます":           {"kanji": "歌います",            "reading": "うたいます",           "nepali": "गाउनु"},
    "うたいました":         {"kanji": "歌います",            "reading": "うたいます",           "nepali": "गाउनु"},
    "あつめます":           {"kanji": "集めます",            "reading": "あつめます",           "nepali": "संकलन गर्नु / जम्मा गर्नु"},
    "すてます":             {"kanji": "捨てます",            "reading": "すてます",             "nepali": "फ्याँक्नु / फाल्नु"},
    "かえます":             {"kanji": "換えます",            "reading": "かえます",             "nepali": "साट्नु / परिवर्तन गर्नु"},
    "うんてんします":       {"kanji": "運転します",          "reading": "うんてんします",       "nepali": "गाडी चलाउनु"},
    "よやくします":         {"kanji": "予約します",          "reading": "よやくします",         "nepali": "आरक्षित गर्नु / बुक गर्नु"},
    "ピアノ":               {"kanji": "ピアノ",              "reading": "ピアノ",               "nepali": "पियानो"},
    "メートル":             {"kanji": "メートル",            "reading": "メートル",             "nepali": "मिटर"},
    "現金":                 {"kanji": "現金",                "reading": "げんきん",             "nepali": "नगद"},
    "趣味":                 {"kanji": "趣味",                "reading": "しゅみ",               "nepali": "रुचि / हबी"},
    "日記":                 {"kanji": "日記",                "reading": "にっき",               "nepali": "डायरी"},
    "お祈り":               {"kanji": "お祈り",              "reading": "おいのり",             "nepali": "प्रार्थना"},
    "課長":                 {"kanji": "課長",                "reading": "かちょう",             "nepali": "शाखा प्रमुख"},
    "部長":                 {"kanji": "部長",                "reading": "ぶちょう",             "nepali": "विभाग प्रमुख"},
    "社長":                 {"kanji": "社長",                "reading": "しゃちょう",           "nepali": "कम्पनी अध्यक्ष"},
    "動物":                 {"kanji": "動物",                "reading": "どうぶつ",             "nepali": "जनावर"},
    "馬":                   {"kanji": "馬",                  "reading": "うま",                 "nepali": "घोडा"},
    "本当ですか":           {"kanji": "本当ですか",          "reading": "ほんとうですか",       "nepali": "साँच्चै हो?"},
    "ぜひ":                 {"kanji": "ぜひ",                "reading": "ぜひ",                 "nepali": "निश्चय नै / अवश्य"},
    "なかなか":             {"kanji": "なかなか",            "reading": "なかなか",             "nepali": "सजिलैसँग होइन"},
    "牧場":                 {"kanji": "牧場",                "reading": "ぼくじょう",           "nepali": "फार्म / गोठ"},

    # ── LESSON 19 ──
    "のぼります":           {"kanji": "登ります",            "reading": "のぼります",           "nepali": "चढ्नु [पहाड]"},
    "とまります":           {"kanji": "泊まります",          "reading": "とまります",           "nepali": "बस्नु [होटलमा]"},
    "そうじします":         {"kanji": "掃除します",          "reading": "そうじします",         "nepali": "सरसफाइ गर्नु"},
    "せんたくします":       {"kanji": "洗濯します",          "reading": "せんたくします",       "nepali": "धुलाई गर्नु [लुगा]"},
    "れんしゅうします":     {"kanji": "練習します",          "reading": "れんしゅうします",     "nepali": "अभ्यास गर्नु"},
    "なります":             {"kanji": "なります",            "reading": "なります",             "nepali": "हुनु / बन्नु [परिवर्तन]"},
    "ねむい":               {"kanji": "眠い",                "reading": "ねむい",               "nepali": "निद्रा लाग्नु"},
    "つよい":               {"kanji": "強い",                "reading": "つよい",               "nepali": "बलियो / शक्तिशाली"},
    "よわい":               {"kanji": "弱い",                "reading": "よわい",               "nepali": "कमजोर"},
    "ゴルフ":               {"kanji": "ゴルフ",              "reading": "ゴルフ",               "nepali": "गोल्फ"},
    "相撲":                 {"kanji": "相撲",                "reading": "すもう",               "nepali": "सुमो कुश्ती"},
    "パチンコ":             {"kanji": "パチンコ",            "reading": "パチンコ",             "nepali": "पाचिङ्को (खेल)"},
    "お茶":                 {"kanji": "お茶",                "reading": "おちゃ",               "nepali": "चिया / चिया समारोह"},
    "日":                   {"kanji": "日",                  "reading": "ひ",                   "nepali": "दिन / मिति"},
    "調子":                 {"kanji": "調子",                "reading": "ちょうし",             "nepali": "अवस्था / स्थिति"},
    "一度":                 {"kanji": "一度",                "reading": "いちど",               "nepali": "एक पटक"},
    "一度も":               {"kanji": "一度も",              "reading": "いちども",             "nepali": "एक पटक पनि होइन"},
    "だんだん":             {"kanji": "だんだん",            "reading": "だんだん",             "nepali": "बिस्तारै / क्रमैसँग"},
    "もうすぐ":             {"kanji": "もうすぐ",            "reading": "もうすぐ",             "nepali": "छिट्टै नै"},
    "おかげさまで":         {"kanji": "おかげさまで",        "reading": "おかげさまで",         "nepali": "तपाईंको कृपाले"},
    "かんぱい":             {"kanji": "乾杯",                "reading": "かんぱい",             "nepali": "शुभकामना! / चियर्स!"},
    "ダイエット":           {"kanji": "ダイエット",          "reading": "ダイエット",           "nepali": "डाइटिङ / आहार नियन्त्रण"},
    "無理":                 {"kanji": "無理",                "reading": "むり",                 "nepali": "असम्भव / बढी"},

    # ── LESSON 20 ──
    "いります":             {"kanji": "要ります",            "reading": "いります",             "nepali": "चाहिनु / आवश्यक हुनु"},
    "しらべます":           {"kanji": "調べます",            "reading": "しらべます",           "nepali": "जाँच गर्नु / अनुसन्धान गर्नु"},
    "なおします":           {"kanji": "直します",            "reading": "なおします",           "nepali": "मर्मत गर्नु / सच्याउनु"},
    "しゅうりします":       {"kanji": "修理します",          "reading": "しゅうりします",       "nepali": "मर्मत गर्नु"},
    "でんわします":         {"kanji": "電話します",          "reading": "でんわします",         "nepali": "फोन गर्नु"},
    "僕":                   {"kanji": "僕",                  "reading": "ぼく",                 "nepali": "म (अनौपचारिक, पुरुषले प्रयोग गर्ने)"},
    "君":                   {"kanji": "君",                  "reading": "きみ",                 "nepali": "तिमी (साथी/सानालाई)"},
    "サラリーマン":         {"kanji": "サラリーマン",        "reading": "サラリーマン",         "nepali": "कम्पनी कर्मचारी"},
    "ことば":               {"kanji": "言葉",                "reading": "ことば",               "nepali": "शब्द / भाषा"},
    "物価":                 {"kanji": "物価",                "reading": "ぶっか",               "nepali": "वस्तुको मूल्य / महँगी"},
    "着物":                 {"kanji": "着物",                "reading": "きもの",               "nepali": "किमोनो (परम्परागत जापानी लुगा)"},
    "ビザ":                 {"kanji": "ビザ",                "reading": "ビザ",                 "nepali": "भिसा"},
    "はじめ":               {"kanji": "初め",                "reading": "はじめ",               "nepali": "शुरुवात"},
    "終わり":               {"kanji": "終わり",              "reading": "おわり",               "nepali": "अन्त्य / समाप्त"},
    "こっち":               {"kanji": "こっち",              "reading": "こっち",               "nepali": "यता / यो दिशा (अनौपचारिक)"},
    "そっち":               {"kanji": "そっち",              "reading": "そっち",               "nepali": "उता / त्यो दिशा (अनौपचारिक)"},
    "あっち":               {"kanji": "あっち",              "reading": "あっち",               "nepali": "उता पर / त्यहाँ (अनौपचारिक)"},
    "どっち":               {"kanji": "どっち",              "reading": "どっち",               "nepali": "कुन चाहिँ (दुईमध्ये) (अनौपचारिक)"},
    "みんなで":             {"kanji": "みんなで",            "reading": "みんなで",             "nepali": "सबैजना मिलेर"},
    "お腹がいっぱい":       {"kanji": "お腹がいっぱい",      "reading": "おなかがいっぱい",     "nepali": "पेट भरिएको छ"},
}

# ─────────────────────────────────────────────────────────────────
# Helper functions
# ─────────────────────────────────────────────────────────────────
def extract_kanji_array(jp_text):
    """Extract unique kanji characters from text"""
    kanjis = re.findall(r'[\u4e00-\u9faf]', jp_text)
    return list(dict.fromkeys(kanjis))

def get_pos(jp, eng):
    eng_lower = eng.lower()
    if any(jp.endswith(v) for v in ['ます', 'する']) or 'verb' in eng_lower:
        return 'Verb'
    elif jp.endswith('い') and not jp.endswith('ない') and 'adjective' not in eng_lower:
        return 'I-Adj'
    elif jp.endswith('な'):
        return 'Na-Adj'
    return 'Noun'

def lookup(jp_raw):
    """Find entry in dictionary, trying multiple keys"""
    jp_clean = jp_raw.strip()
    if jp_clean in n5_dict:
        return n5_dict[jp_clean]
    # Try partial match
    for key, val in n5_dict.items():
        if key in jp_clean or jp_clean in key:
            return val
    return None

def get_word_data(jp_raw, eng):
    """Get kanji written form, reading, Nepali, and kanji chars"""
    entry = lookup(jp_raw)
    jp_clean = jp_raw.strip()
    
    if entry:
        kanji_word = entry["kanji"]
        reading = entry["reading"]
        nepali = entry["nepali"]
    else:
        kanji_word = jp_clean
        reading = jp_clean
        nepali = f"{eng} (नेपाली)"
    
    # Extract kanji characters from the kanji_word
    kanji_chars = extract_kanji_array(kanji_word)
    
    return kanji_word, reading, nepali, kanji_chars

# ─────────────────────────────────────────────────────────────────
# Generate vocab entries
# ─────────────────────────────────────────────────────────────────
def format_vocab_entries(lesson_num):
    v_raw = docx_data[str(lesson_num)]["vocab"]
    lines = []
    lines.append(f"  // ════════════════════════════════════════════════════════")
    lines.append(f"  // LESSON {lesson_num} ({len(v_raw)} ITEMS)")
    lines.append(f"  // ════════════════════════════════════════════════════════")
    
    for idx, item in enumerate(v_raw, start=1):
        jp = item["japanese"]
        eng = item["english"]
        
        kanji_word, reading, nepali, kanji_chars = get_word_data(jp, eng)
        pos = get_pos(jp, eng)
        
        # Use kanji written form as the word (richer display), hiragana as reading
        word_json    = json.dumps(kanji_word, ensure_ascii=False)
        reading_json = json.dumps(reading, ensure_ascii=False)
        eng_json     = json.dumps(eng, ensure_ascii=False)
        np_json      = json.dumps(nepali, ensure_ascii=False)
        kanji_json   = json.dumps(kanji_chars, ensure_ascii=False)
        pos_json     = json.dumps(pos, ensure_ascii=False)
        
        ex_jp  = json.dumps(f"{kanji_word}。", ensure_ascii=False)
        ex_rd  = json.dumps(f"{reading}。", ensure_ascii=False)
        ex_eng = json.dumps(f"Example: {eng}.", ensure_ascii=False)
        ex_np  = json.dumps(f"उदाहरण: {nepali}।", ensure_ascii=False)
        
        entry = (
            f"  {{\n"
            f"    id: 'N5-L{lesson_num}-{idx:03d}', lesson: {lesson_num}, level: 'N5', word: {word_json}, reading: {reading_json},\n"
            f"    meaning: {eng_json}, meaningNepali: {np_json},\n"
            f"    kanjiCharacters: {kanji_json}, partOfSpeech: {pos_json},\n"
            f"    grammarSentences: [\n"
            f"      {{ japanese: {ex_jp}, reading: {ex_rd}, english: {ex_eng}, nepali: {ex_np} }}\n"
            f"    ]\n"
            f"  }},"
        )
        lines.append(entry)
    return "\n".join(lines)

# ─────────────────────────────────────────────────────────────────
# Write files
# ─────────────────────────────────────────────────────────────────

# lib/n5-lessons-16to20.ts
ts_16to20 = (
    "// ============================================================\n"
    "// MINNA NO NIHONGO JLPT N5 — Vocab (Lessons 16 to 20)\n"
    "// Official definitions from Minna no Nihongo I textbook\n"
    "// With Kanji written forms, proper Nepali translations\n"
    "// ============================================================\n"
    "import type { VocabItem } from './nihongo-vocab';\n\n"
    "export const N5_LESSONS_16TO20: VocabItem[] = [\n" +
    "\n".join(format_vocab_entries(l) for l in [16, 17, 18, 19, 20]) +
    "\n];\n"
)

with open("lib/n5-lessons-16to20.ts", "w", encoding="utf-8") as f:
    f.write(ts_16to20)
print("✅ lib/n5-lessons-16to20.ts written!")

# lib/n5-lessons-11to15.ts — keep L11+L12, replace L13-L15
with open("lib/n5-lessons-11to15.ts", "r", encoding="utf-8") as f:
    orig = f.read()

split_pos = orig.find("// LESSON 13")
if split_pos != -1:
    header = orig[:split_pos].rstrip()
else:
    header = orig.split("export const N5_LESSONS_11TO15")[0] + "export const N5_LESSONS_11TO15: VocabItem[] = [\n"

ts_13to15 = (header + "\n\n" +
    "\n".join(format_vocab_entries(l) for l in [13, 14, 15]) +
    "\n];\n"
)

with open("lib/n5-lessons-11to15.ts", "w", encoding="utf-8") as f:
    f.write(ts_13to15)
print("✅ lib/n5-lessons-11to15.ts written!")

# Print summary
print("\n📊 Summary:")
total = 0
for l in range(13, 21):
    n = len(docx_data[str(l)]["vocab"])
    mapped = sum(1 for item in docx_data[str(l)]["vocab"] if lookup(item["japanese"]))
    total += n
    print(f"  Lesson {l}: {n} items, {mapped} with proper Kanji+Nepali ({n-mapped} using fallback)")
print(f"  TOTAL: {total} vocabulary items processed")
