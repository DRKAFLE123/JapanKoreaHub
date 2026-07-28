import json, re

# Complete Vocabulary for Lesson 28 (Minna no Nihongo II)
l28_vocab = [
    { "id": "v28_1", "lesson": 28, "level": "N4", "word": "売れます", "reading": "うれます", "meaning": "Sell / Be sold", "meaningNepali": "बिक्नु", "kanjiCharacters": ["売"], "partOfSpeech": "Verb" },
    { "id": "v28_2", "lesson": 28, "level": "N4", "word": "踊ります", "reading": "おどります", "meaning": "Dance", "meaningNepali": "नाच्नु", "kanjiCharacters": ["踊"], "partOfSpeech": "Verb" },
    { "id": "v28_3", "lesson": 28, "level": "N4", "word": "かみます", "reading": "かみます", "meaning": "Chew / Bite", "meaningNepali": "चबाउनु / टोक्नु", "kanjiCharacters": [], "partOfSpeech": "Verb" },
    { "id": "v28_4", "lesson": 28, "level": "N4", "word": "選びます", "reading": "えらびます", "meaning": "Choose / Select", "meaningNepali": "छान्नु", "kanjiCharacters": ["選"], "partOfSpeech": "Verb" },
    { "id": "v28_5", "lesson": 28, "level": "N4", "word": "通います", "reading": "かよいます", "meaning": "Commute / Go to and fro", "meaningNepali": "आउजाउ गर्नु", "kanjiCharacters": ["通"], "partOfSpeech": "Verb" },
    { "id": "v28_6", "lesson": 28, "level": "N4", "word": "メモします", "reading": "メモします", "meaning": "Take a note", "meaningNepali": "टिपोट गर्नु", "kanjiCharacters": [], "partOfSpeech": "Verb" },
    { "id": "v28_7", "lesson": 28, "level": "N4", "word": "真面目", "reading": "まじめ", "meaning": "Serious / Earnest", "meaningNepali": "गम्भीर / इमानदार", "kanjiCharacters": ["真", "面", "目"], "partOfSpeech": "Adj" },
    { "id": "v28_8", "lesson": 28, "level": "N4", "word": "熱心", "reading": "ねっしん", "meaning": "Enthusiastic / Zealous", "meaningNepali": "मेहनती / उत्साही", "kanjiCharacters": ["熱", "心"], "partOfSpeech": "Adj" },
    { "id": "v28_9", "lesson": 28, "level": "N4", "word": "偉い", "reading": "えらい", "meaning": "Great / Admirable", "meaningNepali": "महान् / आदरणीय", "kanjiCharacters": ["偉"], "partOfSpeech": "Adj" },
    { "id": "v28_10", "lesson": 28, "level": "N4", "word": "ちょうどいい", "reading": "ちょうどいい", "meaning": "Proper / Just right", "meaningNepali": "बराबर / ठिकै", "kanjiCharacters": [], "partOfSpeech": "Adj" },
    { "id": "v28_11", "lesson": 28, "level": "N4", "word": "景色", "reading": "けしき", "meaning": "Scenery / View", "meaningNepali": "दृश्य", "kanjiCharacters": ["景", "色"], "partOfSpeech": "Noun" },
    { "id": "v28_12", "lesson": 28, "level": "N4", "word": "美容院", "reading": "びよういん", "meaning": "Beauty salon / Hairdresser", "meaningNepali": "ब्युटी पार्लर", "kanjiCharacters": ["美", "容", "院"], "partOfSpeech": "Noun" },
    { "id": "v28_13", "lesson": 28, "level": "N4", "word": "台所", "reading": "だいどこ", "meaning": "Kitchen", "meaningNepali": "भान्सा", "kanjiCharacters": ["台", "所"], "partOfSpeech": "Noun" },
    { "id": "v28_14", "lesson": 28, "level": "N4", "word": "経験", "reading": "けいけん", "meaning": "Experience", "meaningNepali": "अनुभव", "kanjiCharacters": ["経", "験"], "partOfSpeech": "Noun" },
    { "id": "v28_15", "lesson": 28, "level": "N4", "word": "力", "reading": "ちから", "meaning": "Power / Strength", "meaningNepali": "शक्ति", "kanjiCharacters": ["力"], "partOfSpeech": "Noun" },
    { "id": "v28_16", "lesson": 28, "level": "N4", "word": "人気", "reading": "にんき", "meaning": "Popularity", "meaningNepali": "लोकप्रियता", "kanjiCharacters": ["人", "気"], "partOfSpeech": "Noun" },
    { "id": "v28_17", "lesson": 28, "level": "N4", "word": "形", "reading": "かたち", "meaning": "Shape / Form", "meaningNepali": "आकार", "kanjiCharacters": ["形"], "partOfSpeech": "Noun" },
    { "id": "v28_18", "lesson": 28, "level": "N4", "word": "色", "reading": "いろ", "meaning": "Color", "meaningNepali": "रङ", "kanjiCharacters": ["色"], "partOfSpeech": "Noun" },
    { "id": "v28_19", "lesson": 28, "level": "N4", "word": "味", "reading": "あじ", "meaning": "Taste / Flavor", "meaningNepali": "स्वाद", "kanjiCharacters": ["味"], "partOfSpeech": "Noun" },
    { "id": "v28_20", "lesson": 28, "level": "N4", "word": "ガム", "reading": "ガム", "meaning": "Chewing gum", "meaningNepali": "गम / चुइगम", "kanjiCharacters": [], "partOfSpeech": "Noun" },
    { "id": "v28_21", "lesson": 28, "level": "N4", "word": "品物", "reading": "しなもの", "meaning": "Goods / Articles", "meaningNepali": "सामान", "kanjiCharacters": ["品", "物"], "partOfSpeech": "Noun" },
    { "id": "v28_22", "lesson": 28, "level": "N4", "word": "値段", "reading": "ねだん", "meaning": "Price", "meaningNepali": "मूल्य", "kanjiCharacters": ["値", "段"], "partOfSpeech": "Noun" },
    { "id": "v28_23", "lesson": 28, "level": "N4", "word": "給料", "reading": "きゅうりょう", "meaning": "Salary / Pay", "meaningNepali": "तलब", "kanjiCharacters": ["給", "料"], "partOfSpeech": "Noun" },
    { "id": "v28_24", "lesson": 28, "level": "N4", "word": "ボーナス", "reading": "ボーナス", "meaning": "Bonus", "meaningNepali": "बोनस", "kanjiCharacters": [], "partOfSpeech": "Noun" },
    { "id": "v28_25", "lesson": 28, "level": "N4", "word": "番組", "reading": "ばんぐみ", "meaning": "TV/Radio Program", "meaningNepali": "कार्यक्रम", "kanjiCharacters": ["番", "組"], "partOfSpeech": "Noun" },
    { "id": "v28_26", "lesson": 28, "level": "N4", "word": "歌手", "reading": "かしゅ", "meaning": "Singer", "meaningNepali": "गायक", "kanjiCharacters": ["歌", "手"], "partOfSpeech": "Noun" },
    { "id": "v28_27", "lesson": 28, "level": "N4", "word": "小説", "reading": "しょうせつ", "meaning": "Novel", "meaningNepali": "उपन्यास", "kanjiCharacters": ["小", "説"], "partOfSpeech": "Noun" },
    { "id": "v28_28", "lesson": 28, "level": "N4", "word": "小説家", "reading": "しょうせつか", "meaning": "Novelist", "meaningNepali": "उपन्यासकार", "kanjiCharacters": ["小", "説", "家"], "partOfSpeech": "Noun" },
    { "id": "v28_29", "lesson": 28, "level": "N4", "word": "息子", "reading": "むすこ", "meaning": "(My) Son", "meaningNepali": "(मेरो) छोरा", "kanjiCharacters": ["息", "子"], "partOfSpeech": "Noun" },
    { "id": "v28_30", "lesson": 28, "level": "N4", "word": "娘", "reading": "むすめ", "meaning": "(My) Daughter", "meaningNepali": "(मेरो) छोरी", "kanjiCharacters": ["娘"], "partOfSpeech": "Noun" },
    { "id": "v28_31", "lesson": 28, "level": "N4", "word": "自分", "reading": "じぶん", "meaning": "Oneself / Myself", "meaningNepali": "आफू", "kanjiCharacters": ["自", "分"], "partOfSpeech": "Noun" },
    { "id": "v28_32", "lesson": 28, "level": "N4", "word": "将来", "reading": "しょうらい", "meaning": "Future", "meaningNepali": "भविष्य", "kanjiCharacters": ["将", "来"], "partOfSpeech": "Noun" },
    { "id": "v28_33", "lesson": 28, "level": "N4", "word": "しばらく", "reading": "しばらく", "meaning": "For a while / A little while", "meaningNepali": "केही समय", "kanjiCharacters": [], "partOfSpeech": "Adverb" },
    { "id": "v28_34", "lesson": 28, "level": "N4", "word": "たいてい", "reading": "たいてい", "meaning": "Usually / Mostly", "meaningNepali": "साधारणतया", "kanjiCharacters": [], "partOfSpeech": "Adverb" },
    { "id": "v28_35", "lesson": 28, "level": "N4", "word": "それに", "reading": "それに", "meaning": "In addition / Moreover", "meaningNepali": "त्यसमाथि", "kanjiCharacters": [], "partOfSpeech": "Conjunction" },
    { "id": "v28_36", "lesson": 28, "level": "N4", "word": "それで", "reading": "それで", "meaning": "Therefore / So", "meaningNepali": "त्यसैले", "kanjiCharacters": [], "partOfSpeech": "Conjunction" }
]

# Complete Vocabulary for Lesson 29 (Minna no Nihongo II)
l29_vocab = [
    { "id": "v29_1", "lesson": 29, "level": "N4", "word": "開きます", "reading": "あきます", "meaning": "[Door] Open (Intransitive)", "meaningNepali": "[ढोका] खुल्नु", "kanjiCharacters": ["開"], "partOfSpeech": "Verb" },
    { "id": "v29_2", "lesson": 29, "level": "N4", "word": "閉まります", "reading": "しまります", "meaning": "[Door] Close (Intransitive)", "meaningNepali": "[ढोका] बन्द हुनु", "kanjiCharacters": ["閉"], "partOfSpeech": "Verb" },
    { "id": "v29_3", "lesson": 29, "level": "N4", "word": "つきます", "reading": "つきます", "meaning": "[Light] Turn on (Intransitive)", "meaningNepali": "[बत्ती] बल्नु", "kanjiCharacters": [], "partOfSpeech": "Verb" },
    { "id": "v29_4", "lesson": 29, "level": "N4", "word": "消えます", "reading": "きえます", "meaning": "[Light] Go off / Turn off", "meaningNepali": "[बत्ती] निभ्नु", "kanjiCharacters": ["消"], "partOfSpeech": "Verb" },
    { "id": "v29_5", "lesson": 29, "level": "N4", "word": "壊れます", "reading": "こわれます", "meaning": "[Chair] Break (Intransitive)", "meaningNepali": "बिग्रनु / भत्कनु", "kanjiCharacters": ["壊"], "partOfSpeech": "Verb" },
    { "id": "v29_6", "lesson": 29, "level": "N4", "word": "割れます", "reading": "われます", "meaning": "[Glass] Break / Smash", "meaningNepali": "फुट्नु (काँच)", "kanjiCharacters": ["割"], "partOfSpeech": "Verb" },
    { "id": "v29_7", "lesson": 29, "level": "N4", "word": "折れます", "reading": "おれます", "meaning": "[Tree] Snap / Break", "meaningNepali": "भाँचिनु", "kanjiCharacters": ["折"], "partOfSpeech": "Verb" },
    { "id": "v29_8", "lesson": 29, "level": "N4", "word": "破れます", "reading": "やぶれます", "meaning": "[Paper] Tear", "meaningNepali": "च्यातिनु", "kanjiCharacters": ["破"], "partOfSpeech": "Verb" },
    { "id": "v29_9", "lesson": 29, "level": "N4", "word": "汚れます", "reading": "よごれます", "meaning": "[Clothes] Get dirty", "meaningNepali": "फोहर हुनु", "kanjiCharacters": ["汚"], "partOfSpeech": "Verb" },
    { "id": "v29_10", "lesson": 29, "level": "N4", "word": "付きます", "reading": "つきます", "meaning": "[Pocket] Be attached", "meaningNepali": "टाँसिनु / लाग्नु", "kanjiCharacters": ["付"], "partOfSpeech": "Verb" },
    { "id": "v29_11", "lesson": 29, "level": "N4", "word": "外れます", "reading": "はずれます", "meaning": "[Button] Come off / Unfasten", "meaningNepali": "फुकनु", "kanjiCharacters": ["外"], "partOfSpeech": "Verb" },
    { "id": "v29_12", "lesson": 29, "level": "N4", "word": "止まります", "reading": "とまります", "meaning": "[Car] Stop (Intransitive)", "meaningNepali": "रोकिनु", "kanjiCharacters": ["止"], "partOfSpeech": "Verb" },
    { "id": "v29_13", "lesson": 29, "level": "N4", "word": "間違えます", "reading": "まちがえます", "meaning": "Make a mistake", "meaningNepali": "गलती गर्नु", "kanjiCharacters": ["間", "違"], "partOfSpeech": "Verb" },
    { "id": "v29_14", "lesson": 29, "level": "N4", "word": "落とします", "reading": "おとします", "meaning": "Drop / Lose", "meaningNepali": "खसाल्नु", "kanjiCharacters": ["落"], "partOfSpeech": "Verb" },
    { "id": "v29_15", "lesson": 29, "level": "N4", "word": "かかります", "reading": "かかります", "meaning": "Be locked", "meaningNepali": "ताल्चा लाग्नु", "kanjiCharacters": [], "partOfSpeech": "Verb" },
    { "id": "v29_16", "lesson": 29, "level": "N4", "word": "ふきます", "reading": "ふきます", "meaning": "Wipe", "meaningNepali": "पुछ्नु", "kanjiCharacters": [], "partOfSpeech": "Verb" },
    { "id": "v29_17", "lesson": 29, "level": "N4", "word": "取り替えます", "reading": "とりかえます", "meaning": "Exchange / Change", "meaningNepali": "फेर्नु / साट्नु", "kanjiCharacters": ["取", "替"], "partOfSpeech": "Verb" },
    { "id": "v29_18", "lesson": 29, "level": "N4", "word": "片付けます", "reading": "かたづけます", "meaning": "Tidy up / Put in order", "meaningNepali": "व्यवस्थापन गर्नु", "kanjiCharacters": ["片", "付"], "partOfSpeech": "Verb" },
    { "id": "v29_19", "lesson": 29, "level": "N4", "word": "お皿", "reading": "おさら", "meaning": "Plate / Dish", "meaningNepali": "प्लेट / थाल", "kanjiCharacters": ["皿"], "partOfSpeech": "Noun" },
    { "id": "v29_20", "lesson": 29, "level": "N4", "word": "お茶碗", "reading": "おちゃわん", "meaning": "Rice bowl", "meaningNepali": "कटोरा", "kanjiCharacters": ["茶", "碗"], "partOfSpeech": "Noun" },
    { "id": "v29_21", "lesson": 29, "level": "N4", "word": "コップ", "reading": "コップ", "meaning": "Glass / Tumbler", "meaningNepali": "ग्लास", "kanjiCharacters": [], "partOfSpeech": "Noun" },
    { "id": "v29_22", "lesson": 29, "level": "N4", "word": "ガラス", "reading": "ガラス", "meaning": "Glass (material)", "meaningNepali": "काँच", "kanjiCharacters": [], "partOfSpeech": "Noun" },
    { "id": "v29_23", "lesson": 29, "level": "N4", "word": "袋", "reading": "ふくろ", "meaning": "Bag / Sack", "meaningNepali": "झोला", "kanjiCharacters": ["袋"], "partOfSpeech": "Noun" },
    { "id": "v29_24", "lesson": 29, "level": "N4", "word": "書類", "reading": "しょるい", "meaning": "Documents / Papers", "meaningNepali": "कागजात", "kanjiCharacters": ["書", "類"], "partOfSpeech": "Noun" },
    { "id": "v29_25", "lesson": 29, "level": "N4", "word": "枝", "reading": "えだ", "meaning": "Branch / Twig", "meaningNepali": "हाँगा", "kanjiCharacters": ["枝"], "partOfSpeech": "Noun" },
    { "id": "v29_26", "lesson": 29, "level": "N4", "word": "駅員", "reading": "えきいん", "meaning": "Station attendant", "meaningNepali": "स्टेसन कर्मचारी", "kanjiCharacters": ["駅", "員"], "partOfSpeech": "Noun" },
    { "id": "v29_27", "lesson": 29, "level": "N4", "word": "交番", "reading": "こうばん", "meaning": "Police box", "meaningNepali": "प्रहरी चौकी", "kanjiCharacters": ["交", "番"], "partOfSpeech": "Noun" },
    { "id": "v29_28", "lesson": 29, "level": "N4", "word": "返事", "reading": "へんじ", "meaning": "Reply / Answer", "meaningNepali": "जवाफ", "kanjiCharacters": ["返", "事"], "partOfSpeech": "Noun" },
    { "id": "v29_29", "lesson": 29, "level": "N4", "word": "お先にどうぞ", "reading": "おさきにどうぞ", "meaning": "After you / Go ahead", "meaningNepali": "पहिला तपाईं जानुस्", "kanjiCharacters": ["先"], "partOfSpeech": "Expression" }
]

# Read lib/nihongo-vocab.ts
with open("lib/nihongo-vocab.ts", "r", encoding="utf-8") as f:
    vocab_code = f.read()

# Locate Lesson 28 section in nihongo-vocab.ts
l28_start = vocab_code.find("// LESSON 28 — ")
l30_start = vocab_code.find("// LESSON 30 — ")
if l30_start == -1:
    l30_start = vocab_code.find("// ─────────────────────────────────────────────\n  // PART 2:")

new_l28_29_vocab_str = "// ════════════════════════════════════\n  // LESSON 28 — Simultaneous Actions 〜ながら / Multiple Reasons 〜し〜し\n  // ════════════════════════════════════\n"
for v in l28_vocab:
    new_l28_29_vocab_str += "  " + json.dumps(v, ensure_ascii=False) + ",\n"

new_l28_29_vocab_str += "\n  // ════════════════════════════════════\n  // LESSON 29 — Intransitive States 〜ています / Regret 〜てしまいました\n  // ════════════════════════════════════\n"
for v in l29_vocab:
    new_l28_29_vocab_str += "  " + json.dumps(v, ensure_ascii=False) + ",\n"

vocab_code = vocab_code[:l28_start] + new_l28_29_vocab_str + "\n  " + vocab_code[l30_start:]

with open("lib/nihongo-vocab.ts", "w", encoding="utf-8") as f:
    f.write(vocab_code)

print("SUCCESSFULLY_UPDATED_LESSONS_28_29_VOCAB")

# Read lib/grammar-guide.ts
with open("lib/grammar-guide.ts", "r", encoding="utf-8") as f:
    g_code = f.read()

# Replace Lesson 28 & Lesson 29 in grammar-guide.ts
old_l28_g = """  {
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
  },"""

new_l28_l29_g = """  {
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
  },"""

g_code = g_code.replace(old_l28_g, new_l28_l29_g)

with open("lib/grammar-guide.ts", "w", encoding="utf-8") as f:
    f.write(g_code)

print("SUCCESSFULLY_UPDATED_LESSONS_28_29_GRAMMAR_GUIDE")
