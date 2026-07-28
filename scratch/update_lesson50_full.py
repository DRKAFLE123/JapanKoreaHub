import json, re

# Complete 42 Authentic Vocabulary Words for Lesson 50 (Minna no Nihongo II)
l50_full_vocab = [
    { "id": "v50_1", "lesson": 50, "level": "N4", "word": "参ります", "reading": "まいります", "meaning": "Go / Come (Humble 謙譲語)", "meaningNepali": "जानु / आउनु (नम्र)", "kanjiCharacters": ["参"], "partOfSpeech": "Verb" },
    { "id": "v50_2", "lesson": 50, "level": "N4", "word": "おります", "reading": "おります", "meaning": "Be / Stay (Humble 謙譲語)", "meaningNepali": "हुनु / बस्नु (नम्र)", "kanjiCharacters": [], "partOfSpeech": "Verb" },
    { "id": "v50_3", "lesson": 50, "level": "N4", "word": "いただきます", "reading": "いただきます", "meaning": "Eat / Drink / Receive (Humble 謙譲語)", "meaningNepali": "खानू / पिउनु / पाउनु (नम्र)", "kanjiCharacters": [], "partOfSpeech": "Verb" },
    { "id": "v50_4", "lesson": 50, "level": "N4", "word": "申します", "reading": "もうします", "meaning": "Say / Be named (Humble 謙譲語)", "meaningNepali": "भन्नु / नाउँ हुनु (नम्र)", "kanjiCharacters": ["申"], "partOfSpeech": "Verb" },
    { "id": "v50_5", "lesson": 50, "level": "N4", "word": "いたします", "reading": "いたします", "meaning": "Do (Humble 謙譲語)", "meaningNepali": "गर्नु (नम्र)", "kanjiCharacters": [], "partOfSpeech": "Verb" },
    { "id": "v50_6", "lesson": 50, "level": "N4", "word": "拝見します", "reading": "はいけんします", "meaning": "See / Look at (Humble 謙譲語)", "meaningNepali": "दर्शन गर्नु / हेर्नु (नम्र)", "kanjiCharacters": ["拝", "見"], "partOfSpeech": "Verb" },
    { "id": "v50_7", "lesson": 50, "level": "N4", "word": "存じております", "reading": "ぞんじております", "meaning": "Know (Humble 謙譲語)", "meaningNepali": "थाहा पाउनु (नम्र)", "kanjiCharacters": ["存"], "partOfSpeech": "Verb" },
    { "id": "v50_8", "lesson": 50, "level": "N4", "word": "伺います", "reading": "うかがいます", "meaning": "Ask / Hear / Visit (Humble 謙譲語)", "meaningNepali": "सोध्नु / सुन्नु / भेट्नु (नम्र)", "kanjiCharacters": ["伺"], "partOfSpeech": "Verb" },
    { "id": "v50_9", "lesson": 50, "level": "N4", "word": "お目にかかります", "reading": "おめにかかります", "meaning": "Meet (Humble 謙譲語)", "meaningNepali": "भेट्नु (नम्र)", "kanjiCharacters": ["目"], "partOfSpeech": "Verb" },
    { "id": "v50_10", "lesson": 50, "level": "N4", "word": "淹れます", "reading": "いれます", "meaning": "Make [coffee/tea]", "meaningNepali": "चिया/कफी बनाउनु", "kanjiCharacters": ["淹"], "partOfSpeech": "Verb" },
    { "id": "v50_11", "lesson": 50, "level": "N4", "word": "用意します", "reading": "よういします", "meaning": "Prepare / Ready", "meaningNepali": "तयारी गर्नु", "kanjiCharacters": ["用", "意"], "partOfSpeech": "Verb" },
    { "id": "v50_12", "lesson": 50, "level": "N4", "word": "私", "reading": "わたくし", "meaning": "I (Polite / Formal)", "meaningNepali": "म (आदरणीय)", "kanjiCharacters": ["私"], "partOfSpeech": "Noun" },
    { "id": "v50_13", "lesson": 50, "level": "N4", "word": "ガイド", "reading": "ガイド", "meaning": "Tour guide", "meaningNepali": "गाइड", "kanjiCharacters": [], "partOfSpeech": "Noun" },
    { "id": "v50_14", "lesson": 50, "level": "N4", "word": "メールアドレス", "reading": "メールアドレス", "meaning": "E-mail address", "meaningNepali": "इमेल ठेगाना", "kanjiCharacters": [], "partOfSpeech": "Noun" },
    { "id": "v50_15", "lesson": 50, "level": "N4", "word": "スケジュール", "reading": "スケジュール", "meaning": "Schedule", "meaningNepali": "कार्यतालिका", "kanjiCharacters": [], "partOfSpeech": "Noun" },
    { "id": "v50_16", "lesson": 50, "level": "N4", "word": "再来週", "reading": "さらいしゅう", "meaning": "The week after next", "meaningNepali": "परार हप्ता", "kanjiCharacters": ["再", "来", "週"], "partOfSpeech": "Noun" },
    { "id": "v50_17", "lesson": 50, "level": "N4", "word": "再来月", "reading": "さらいげつ", "meaning": "The month after next", "meaningNepali": "परार महिना", "kanjiCharacters": ["再", "来", "月"], "partOfSpeech": "Noun" },
    { "id": "v50_18", "lesson": 50, "level": "N4", "word": "再来年", "reading": "さらいねん", "meaning": "The year after next", "meaningNepali": "परार वर्ष", "kanjiCharacters": ["再", "来", "年"], "partOfSpeech": "Noun" },
    { "id": "v50_19", "lesson": 50, "level": "N4", "word": "初めに", "reading": "はじめに", "meaning": "First of all / At first", "meaningNepali": "सबैभन्दा पहिला", "kanjiCharacters": ["初"], "partOfSpeech": "Adverb" },
    { "id": "v50_20", "lesson": 50, "level": "N4", "word": "江戸東京博物館", "reading": "えどとうきょうはくぶつかん", "meaning": "Edo-Tokyo Museum", "meaningNepali": "एडो-टोकियो सङ्ग्रहालय", "kanjiCharacters": ["江", "戸", "東", "京", "博", "物", "館"], "partOfSpeech": "Noun" },
    { "id": "v50_21", "lesson": 50, "level": "N4", "word": "緊張します", "reading": "きんちょうします", "meaning": "Become tense / Nervous", "meaningNepali": "तनावग्रस्त हुनु / हडबडाउनु", "kanjiCharacters": ["緊", "張"], "partOfSpeech": "Verb" },
    { "id": "v50_22", "lesson": 50, "level": "N4", "word": "放送します", "reading": "ほうそうします", "meaning": "Broadcast", "meaningNepali": "प्रसारण गर्नु", "kanjiCharacters": ["放", "送"], "partOfSpeech": "Verb" },
    { "id": "v50_23", "lesson": 50, "level": "N4", "word": "ビデオに撮ります", "reading": "ビデオにとります", "meaning": "Record on video", "meaningNepali": "भिडियो रेकर्ड गर्नु", "kanjiCharacters": ["撮"], "partOfSpeech": "Verb" },
    { "id": "v50_24", "lesson": 50, "level": "N4", "word": "賞金", "reading": "しょうきん", "meaning": "Prize money", "meaningNepali": "पुरस्कार रकम", "kanjiCharacters": ["賞", "金"], "partOfSpeech": "Noun" },
    { "id": "v50_25", "lesson": 50, "level": "N4", "word": "自然", "reading": "しぜん", "meaning": "Nature", "meaningNepali": "प्रकृति", "kanjiCharacters": ["自", "然"], "partOfSpeech": "Noun" },
    { "id": "v50_26", "lesson": 50, "level": "N4", "word": "きりん", "reading": "きりん", "meaning": "Giraffe", "meaningNepali": "जिराफ", "kanjiCharacters": [], "partOfSpeech": "Noun" },
    { "id": "v50_27", "lesson": 50, "level": "N4", "word": "象", "reading": "ぞう", "meaning": "Elephant", "meaningNepali": "हात्ती", "kanjiCharacters": ["象"], "partOfSpeech": "Noun" },
    { "id": "v50_28", "lesson": 50, "level": "N4", "word": "ころ", "reading": "ころ", "meaning": "Times / Days (when...)", "meaningNepali": "समय / बेला", "kanjiCharacters": [], "partOfSpeech": "Noun" },
    { "id": "v50_29", "lesson": 50, "level": "N4", "word": "叶います", "reading": "かないます", "meaning": "[Dream] Come true", "meaningNepali": "सपना पूरा हुनु", "kanjiCharacters": ["叶"], "partOfSpeech": "Verb" },
    { "id": "v50_30", "lesson": 50, "level": "N4", "word": "ひとこと", "reading": "ひとこと", "meaning": "A word / Brief remark", "meaningNepali": "एक शब्द / थोरै भनाइ", "kanjiCharacters": [], "partOfSpeech": "Noun" },
    { "id": "v50_31", "lesson": 50, "level": "N4", "word": "感謝します", "reading": "かんしゃします", "meaning": "Thank / Be grateful", "meaningNepali": "धन्यवाद दिनु", "kanjiCharacters": ["感", "謝"], "partOfSpeech": "Verb" },
    { "id": "v50_32", "lesson": 50, "level": "N4", "word": "お礼", "reading": "おれい", "meaning": "Expression of thanks / Gift", "meaningNepali": "कृतज्ञता व्यक्त / उपहार", "kanjiCharacters": ["礼"], "partOfSpeech": "Noun" },
    { "id": "v50_33", "lesson": 50, "level": "N4", "word": "拝啓", "reading": "はいけい", "meaning": "Dear Sirs (Letter greeting)", "meaningNepali": "महोदय (पत्रको सुरु)", "kanjiCharacters": ["拝", "啓"], "partOfSpeech": "Expression" },
    { "id": "v50_34", "lesson": 50, "level": "N4", "word": "敬具", "reading": "けいぐ", "meaning": "Sincerely yours (Letter closing)", "meaningNepali": "भवदीय (पत्रको अन्त्य)", "kanjiCharacters": ["敬", "具"], "partOfSpeech": "Expression" },
    { "id": "v50_35", "lesson": 50, "level": "N4", "word": "美しい", "reading": "うつくしい", "meaning": "Beautiful", "meaningNepali": "सुन्दर", "kanjiCharacters": ["美"], "partOfSpeech": "Adj" },
    { "id": "v50_36", "lesson": 50, "level": "N4", "word": "お城", "reading": "おしろ", "meaning": "Castle", "meaningNepali": "दरबार", "kanjiCharacters": ["城"], "partOfSpeech": "Noun" },
    { "id": "v50_37", "lesson": 50, "level": "N4", "word": "心から", "reading": "こころから", "meaning": "From bottom of heart", "meaningNepali": "हृदयदेखि", "kanjiCharacters": ["心"], "partOfSpeech": "Adverb" },
    { "id": "v50_38", "lesson": 50, "level": "N4", "word": "応援します", "reading": "おうえんします", "meaning": "Support / Cheer for", "meaningNepali": "समर्थन गर्नु", "kanjiCharacters": ["応", "援"], "partOfSpeech": "Verb" },
    { "id": "v50_39", "lesson": 50, "level": "N4", "word": "喜んで", "reading": "よろこんで", "meaning": "Gladly / With pleasure", "meaningNepali": "खुसीसाथ", "kanjiCharacters": ["喜"], "partOfSpeech": "Adverb" },
    { "id": "v50_40", "lesson": 50, "level": "N4", "word": "誠に", "reading": "まことに", "meaning": "Truly / Sincerely", "meaningNepali": "साँच्चै नै", "kanjiCharacters": ["誠"], "partOfSpeech": "Adverb" },
    { "id": "v50_41", "lesson": 50, "level": "N4", "word": "社長室", "reading": "しゃちょうしつ", "meaning": "Company President's Office", "meaningNepali": "अध्यक्षको कार्यकक्ष", "kanjiCharacters": ["社", "長", "室"], "partOfSpeech": "Noun" },
    { "id": "v50_42", "lesson": 50, "level": "N4", "word": "案内状", "reading": "あんないじょう", "meaning": "Invitation letter / Notice", "meaningNepali": "निमन्त्रणा पत्र", "kanjiCharacters": ["案", "内", "状"], "partOfSpeech": "Noun" }
]

with open("lib/nihongo-vocab.ts", "r", encoding="utf-8") as f:
    code = f.read()

# Replace Lesson 50 section in lib/nihongo-vocab.ts
l50_start = code.find("// LESSON 50")
if l50_start == -1:
    l50_start = code.find("{\"id\": \"v50_1\"")
    if l50_start != -1:
        l50_start = code.rfind("\n", 0, l50_start)

l51_start = code.find("{ id:'v51_1'")
if l51_start == -1:
    l51_start = code.find("{\"id\": \"v51_1\"")

new_l50_str = "  // ════════════════════════════════════\n  // LESSON 50 — FULL TEXTBOOK VOCABULARY SHEET (42 WORDS)\n  // ════════════════════════════════════\n"
for item in l50_full_vocab:
    new_l50_str += "  " + json.dumps(item, ensure_ascii=False) + ",\n"

code = code[:l50_start] + new_l50_str + "\n  " + code[l51_start:]

with open("lib/nihongo-vocab.ts", "w", encoding="utf-8") as f:
    f.write(code)

print("SUCCESSFULLY_UPDATED_LESSON_50_WITH_ALL_42_TEXTBOOK_WORDS")
