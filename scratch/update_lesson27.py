import json, re

# Define all 40 vocabulary words for Lesson 27
l27_vocab = [
    { "id": "v27_1", "lesson": 27, "level": "N4", "word": "できる", "reading": "できる", "meaning": "Can do", "meaningNepali": "गर्न सक्नु", "kanjiCharacters": [], "partOfSpeech": "Potential Verb" },
    { "id": "v27_2", "lesson": 27, "level": "N4", "word": "話せる", "reading": "はなせる", "meaning": "Can speak", "meaningNepali": "बोल्न सक्नु", "kanjiCharacters": ["話"], "partOfSpeech": "Potential Verb" },
    { "id": "v27_3", "lesson": 27, "level": "N4", "word": "読める", "reading": "よめる", "meaning": "Can read", "meaningNepali": "पढ्न सक्नु", "kanjiCharacters": ["読"], "partOfSpeech": "Potential Verb" },
    { "id": "v27_4", "lesson": 27, "level": "N4", "word": "書ける", "reading": "かける", "meaning": "Can write", "meaningNepali": "लेख्न सक्नु", "kanjiCharacters": ["書"], "partOfSpeech": "Potential Verb" },
    { "id": "v27_5", "lesson": 27, "level": "N4", "word": "聞ける", "reading": "きける", "meaning": "Can hear / Can listen", "meaningNepali": "सुन्न सक्नु", "kanjiCharacters": ["聞"], "partOfSpeech": "Potential Verb" },
    { "id": "v27_6", "lesson": 27, "level": "N4", "word": "見える", "reading": "みえる", "meaning": "Can be seen (visible)", "meaningNepali": "देखिनु", "kanjiCharacters": ["見"], "partOfSpeech": "Potential Verb" },
    { "id": "v27_7", "lesson": 27, "level": "N4", "word": "見られる", "reading": "みられる", "meaning": "Can watch", "meaningNepali": "हेर्न सक्नु", "kanjiCharacters": ["見"], "partOfSpeech": "Potential Verb" },
    { "id": "v27_8", "lesson": 27, "level": "N4", "word": "食べられる", "reading": "たべられる", "meaning": "Can eat", "meaningNepali": "खान सक्नु", "kanjiCharacters": ["食"], "partOfSpeech": "Potential Verb" },
    { "id": "v27_9", "lesson": 27, "level": "N4", "word": "飲める", "reading": "のめる", "meaning": "Can drink", "meaningNepali": "पिउन सक्नु", "kanjiCharacters": ["飲"], "partOfSpeech": "Potential Verb" },
    { "id": "v27_10", "lesson": 27, "level": "N4", "word": "行ける", "reading": "いける", "meaning": "Can go", "meaningNepali": "जान सक्नु", "kanjiCharacters": ["行"], "partOfSpeech": "Potential Verb" },
    { "id": "v27_11", "lesson": 27, "level": "N4", "word": "来られる", "reading": "こられる", "meaning": "Can come", "meaningNepali": "आउन सक्नु", "kanjiCharacters": ["来"], "partOfSpeech": "Potential Verb" },
    { "id": "v27_12", "lesson": 27, "level": "N4", "word": "泳げる", "reading": "およげる", "meaning": "Can swim", "meaningNepali": "पौड्न सक्नु", "kanjiCharacters": ["泳"], "partOfSpeech": "Potential Verb" },
    { "id": "v27_13", "lesson": 27, "level": "N4", "word": "乗れる", "reading": "のれる", "meaning": "Can ride", "meaningNepali": "चढ्न सक्नु", "kanjiCharacters": ["乗"], "partOfSpeech": "Potential Verb" },
    { "id": "v27_14", "lesson": 27, "level": "N4", "word": "歩ける", "reading": "あるける", "meaning": "Can walk", "meaningNepali": "हिँड्न सक्नु", "kanjiCharacters": ["歩"], "partOfSpeech": "Potential Verb" },
    { "id": "v27_15", "lesson": 27, "level": "N4", "word": "運転できる", "reading": "うんてんできる", "meaning": "Can drive", "meaningNepali": "गाडी चलाउन सक्नु", "kanjiCharacters": ["運", "転"], "partOfSpeech": "Potential Verb" },
    { "id": "v27_16", "lesson": 27, "level": "N4", "word": "歌える", "reading": "うたえる", "meaning": "Can sing", "meaningNepali": "गाउन सक्नु", "kanjiCharacters": ["歌"], "partOfSpeech": "Potential Verb" },
    { "id": "v27_17", "lesson": 27, "level": "N4", "word": "踊れる", "reading": "おどれる", "meaning": "Can dance", "meaningNepali": "नाच्न सक्नु", "kanjiCharacters": ["踊"], "partOfSpeech": "Potential Verb" },
    { "id": "v27_18", "lesson": 27, "level": "N4", "word": "習う", "reading": "ならう", "meaning": "Learn", "meaningNepali": "सिक्नु", "kanjiCharacters": ["習"], "partOfSpeech": "Verb" },
    { "id": "v27_19", "lesson": 27, "level": "N4", "word": "練習", "reading": "れんしゅう", "meaning": "Practice", "meaningNepali": "अभ्यास", "kanjiCharacters": ["練", "習"], "partOfSpeech": "Noun" },
    { "id": "v27_20", "lesson": 27, "level": "N4", "word": "上手", "reading": "じょうず", "meaning": "Skillful / Good at", "meaningNepali": "सीपालु / जान्ने", "kanjiCharacters": ["上", "手"], "partOfSpeech": "Adj" },
    { "id": "v27_21", "lesson": 27, "level": "N4", "word": "下手", "reading": "へた", "meaning": "Unskillful / Poor at", "meaningNepali": "असीपालु / नजान्ने", "kanjiCharacters": ["下", "手"], "partOfSpeech": "Adj" },
    { "id": "v27_22", "lesson": 27, "level": "N4", "word": "得意", "reading": "とくい", "meaning": "Good at (strong point)", "meaningNepali": "दक्ष / राम्रो", "kanjiCharacters": ["特", "意"], "partOfSpeech": "Adj" },
    { "id": "v27_23", "lesson": 27, "level": "N4", "word": "苦手", "reading": "にがて", "meaning": "Weak at (weak point)", "meaningNepali": "कमजोर", "kanjiCharacters": ["苦", "手"], "partOfSpeech": "Adj" },
    { "id": "v27_24", "lesson": 27, "level": "N4", "word": "趣味", "reading": "しゅみ", "meaning": "Hobby", "meaningNepali": "रुचि / हबी", "kanjiCharacters": ["趣", "味"], "partOfSpeech": "Noun" },
    { "id": "v27_25", "lesson": 27, "level": "N4", "word": "経験", "reading": "けいけん", "meaning": "Experience", "meaningNepali": "अनुभव", "kanjiCharacters": ["経", "験"], "partOfSpeech": "Noun" },
    { "id": "v27_26", "lesson": 27, "level": "N4", "word": "外国", "reading": "がいこく", "meaning": "Foreign country", "meaningNepali": "विदेश", "kanjiCharacters": ["外", "国"], "partOfSpeech": "Noun" },
    { "id": "v27_27", "lesson": 27, "level": "N4", "word": "会話", "reading": "かいわ", "meaning": "Conversation", "meaningNepali": "कुराकानी", "kanjiCharacters": ["会", "話"], "partOfSpeech": "Noun" },
    { "id": "v27_28", "lesson": 27, "level": "N4", "word": "発音", "reading": "はつおん", "meaning": "Pronunciation", "meaningNepali": "उच्चारण", "kanjiCharacters": ["発", "音"], "partOfSpeech": "Noun" },
    { "id": "v27_29", "lesson": 27, "level": "N4", "word": "漢字", "reading": "かんじ", "meaning": "Kanji", "meaningNepali": "काञ्जी", "kanjiCharacters": ["漢", "字"], "partOfSpeech": "Noun" },
    { "id": "v27_30", "lesson": 27, "level": "N4", "word": "単語", "reading": "たんご", "meaning": "Vocabulary / Word", "meaningNepali": "शब्द", "kanjiCharacters": ["単", "語"], "partOfSpeech": "Noun" },
    { "id": "v27_31", "lesson": 27, "level": "N4", "word": "試験", "reading": "しけん", "meaning": "Examination / Test", "meaningNepali": "परीक्षा", "kanjiCharacters": ["試", "験"], "partOfSpeech": "Noun" },
    { "id": "v27_32", "lesson": 27, "level": "N4", "word": "合格", "reading": "ごうかく", "meaning": "Pass (an exam)", "meaningNepali": "उत्तीर्ण", "kanjiCharacters": ["合", "格"], "partOfSpeech": "Noun" },
    { "id": "v27_33", "lesson": 27, "level": "N4", "word": "不合格", "reading": "ふごうかく", "meaning": "Fail (an exam)", "meaningNepali": "अनुत्तीर्ण", "kanjiCharacters": ["不", "合", "格"], "partOfSpeech": "Noun" },
    { "id": "v27_34", "lesson": 27, "level": "N4", "word": "勉強", "reading": "べんきょう", "meaning": "Study", "meaningNepali": "अध्ययन", "kanjiCharacters": ["勉", "強"], "partOfSpeech": "Noun" },
    { "id": "v27_35", "lesson": 27, "level": "N4", "word": "質問", "reading": "しつもん", "meaning": "Question", "meaningNepali": "प्रश्न", "kanjiCharacters": ["質", "問"], "partOfSpeech": "Noun" },
    { "id": "v27_36", "lesson": 27, "level": "N4", "word": "回答", "reading": "かいとう", "meaning": "Answer / Response", "meaningNepali": "उत्तर", "kanjiCharacters": ["回", "答"], "partOfSpeech": "Noun" },
    { "id": "v27_37", "lesson": 27, "level": "N4", "word": "挑戦", "reading": "ちょうせん", "meaning": "Challenge", "meaningNepali": "चुनौती", "kanjiCharacters": ["挑", "戦"], "partOfSpeech": "Noun" },
    { "id": "v27_38", "lesson": 27, "level": "N4", "word": "自信", "reading": "じしん", "meaning": "Confidence", "meaningNepali": "आत्मविश्वास", "kanjiCharacters": ["自", "信"], "partOfSpeech": "Noun" },
    { "id": "v27_39", "lesson": 27, "level": "N4", "word": "成功", "reading": "せいこう", "meaning": "Success", "meaningNepali": "सफलता", "kanjiCharacters": ["成", "功"], "partOfSpeech": "Noun" },
    { "id": "v27_40", "lesson": 27, "level": "N4", "word": "努力", "reading": "どりょく", "meaning": "Effort", "meaningNepali": "प्रयास / मेहनत", "kanjiCharacters": ["努", "力"], "partOfSpeech": "Noun" }
]

# Read lib/nihongo-vocab.ts
with open("lib/nihongo-vocab.ts", "r", encoding="utf-8") as f:
    vocab_code = f.read()

# Locate Lesson 27 section in nihongo-vocab.ts
l27_start = vocab_code.find("// LESSON 27 — ")
l28_start = vocab_code.find("// LESSON 28 — ")

new_l27_vocab_str = "// ════════════════════════════════════\n  // LESSON 27 — Potential Form (可能形) (Full 40 Words)\n  // ════════════════════════════════════\n"
for v in l27_vocab:
    new_l27_vocab_str += "  " + json.dumps(v, ensure_ascii=False).replace('":', '":').replace('",', '", ') + ",\n"

vocab_code = vocab_code[:l27_start] + new_l27_vocab_str + "\n  " + vocab_code[l28_start:]

with open("lib/nihongo-vocab.ts", "w", encoding="utf-8") as f:
    f.write(vocab_code)

print("SUCCESSFULLY_UPDATED_LESSON_27_VOCAB")

# Read lib/grammar-guide.ts
with open("lib/grammar-guide.ts", "r", encoding="utf-8") as f:
    g_code = f.read()

# Replace Lesson 27 in grammar-guide.ts with full textbook structure
old_l27_g = """  {
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
  },"""

new_l27_g = """  {
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
  },"""

g_code = g_code.replace(old_l27_g, new_l27_g)

with open("lib/grammar-guide.ts", "w", encoding="utf-8") as f:
    f.write(g_code)

print("SUCCESSFULLY_UPDATED_LESSON_27_GRAMMAR_GUIDE")
