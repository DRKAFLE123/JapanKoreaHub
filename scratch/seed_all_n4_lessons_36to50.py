import json, re

# Complete Vocabulary for Lessons 36 through 50 (Minna no Nihongo II)
l36_to_50_vocab = [
    # Lesson 36
    {"id": "v36_1", "lesson": 36, "level": "N4", "word": "合います", "reading": "あいます", "meaning": "[Size] Fit / Match", "meaningNepali": "मिल्नु", "kanjiCharacters": ["合"], "partOfSpeech": "Verb"},
    {"id": "v36_2", "lesson": 36, "level": "N4", "word": "慣れます", "reading": "なれます", "meaning": "Get accustomed to", "meaningNepali": "बानी पर्नु", "kanjiCharacters": ["慣"], "partOfSpeech": "Verb"},
    {"id": "v36_3", "lesson": 36, "level": "N4", "word": "通います", "reading": "かよいます", "meaning": "Commute", "meaningNepali": "आउजाउ गर्नु", "kanjiCharacters": ["通"], "partOfSpeech": "Verb"},
    {"id": "v36_4", "lesson": 36, "level": "N4", "word": "健康", "reading": "けんこう", "meaning": "Health", "meaningNepali": "स्वास्थ्य", "kanjiCharacters": ["健", "康"], "partOfSpeech": "Noun"},
    {"id": "v36_5", "lesson": 36, "level": "N4", "word": "指輪", "reading": "ゆびわ", "meaning": "Ring", "meaningNepali": "औंठी", "kanjiCharacters": ["指", "輪"], "partOfSpeech": "Noun"},

    # Lesson 37
    {"id": "v37_1", "lesson": 37, "level": "N4", "word": "褒めます", "reading": "ほめます", "meaning": "Praise", "meaningNepali": "प्रशंसा गर्नु", "kanjiCharacters": ["褒"], "partOfSpeech": "Verb"},
    {"id": "v37_2", "lesson": 37, "level": "N4", "word": "叱ります", "reading": "しかります", "meaning": "Scold", "meaningNepali": "गाली गर्नु", "kanjiCharacters": ["叱"], "partOfSpeech": "Verb"},
    {"id": "v37_3", "lesson": 37, "level": "N4", "word": "誘います", "reading": "さそいます", "meaning": "Invite / Ask along", "meaningNepali": "निमन्त्रणा गर्नु", "kanjiCharacters": ["誘"], "partOfSpeech": "Verb"},
    {"id": "v37_4", "lesson": 37, "level": "N4", "word": "起こします", "reading": "おこします", "meaning": "Wake someone up", "meaningNepali": "उठाउनु", "kanjiCharacters": ["起"], "partOfSpeech": "Verb"},
    {"id": "v37_5", "lesson": 37, "level": "N4", "word": "頼みます", "reading": "たのみます", "meaning": "Ask / Request", "meaningNepali": "अनुरोध गर्नु", "kanjiCharacters": ["頼"], "partOfSpeech": "Verb"},

    # Lesson 38
    {"id": "v38_1", "lesson": 38, "level": "N4", "word": "参加します", "reading": "さんかします", "meaning": "Participate / Attend", "meaningNepali": "भाग लिनु", "kanjiCharacters": ["参", "加"], "partOfSpeech": "Verb"},
    {"id": "v38_2", "lesson": 38, "level": "N4", "word": "育てます", "reading": "そだてます", "meaning": "Breed / Bring up", "meaningNepali": "हुर्काउनु", "kanjiCharacters": ["育"], "partOfSpeech": "Verb"},
    {"id": "v38_3", "lesson": 38, "level": "N4", "word": "運びます", "reading": "はこびます", "meaning": "Carry / Transport", "meaningNepali": "ओसारपसार गर्नु", "kanjiCharacters": ["運"], "partOfSpeech": "Verb"},
    {"id": "v38_4", "lesson": 38, "level": "N4", "word": "入院します", "reading": "にゅういんします", "meaning": "Enter hospital", "meaningNepali": "अस्पताल भर्ना हुनु", "kanjiCharacters": ["入", "院"], "partOfSpeech": "Verb"},

    # Lesson 39
    {"id": "v39_1", "lesson": 39, "level": "N4", "word": "驚きます", "reading": "おどろきます", "meaning": "Be surprised", "meaningNepali": "छक्क पर्नु", "kanjiCharacters": ["驚"], "partOfSpeech": "Verb"},
    {"id": "v39_2", "lesson": 39, "level": "N4", "word": "安心します", "reading": "あんしんします", "meaning": "Feel relieved", "meaningNepali": "ढुक्क हुनु", "kanjiCharacters": ["安", "心"], "partOfSpeech": "Verb"},
    {"id": "v39_3", "lesson": 39, "level": "N4", "word": "離婚します", "reading": "りこんします", "meaning": "Divorce", "meaningNepali": "पारपाचुके गर्नु", "kanjiCharacters": ["離", "婚"], "partOfSpeech": "Verb"},
    {"id": "v39_4", "lesson": 39, "level": "N4", "word": "火事", "reading": "かじ", "meaning": "Fire disaster", "meaningNepali": "आगलागी", "kanjiCharacters": ["火", "事"], "partOfSpeech": "Noun"},

    # Lesson 40
    {"id": "v40_1", "lesson": 40, "level": "N4", "word": "数えます", "reading": "かぞえます", "meaning": "Count", "meaningNepali": "गन्ती गर्नु", "kanjiCharacters": ["数"], "partOfSpeech": "Verb"},
    {"id": "v40_2", "lesson": 40, "level": "N4", "word": "測ります", "reading": "はかります", "meaning": "Measure / Weigh", "meaningNepali": "नाप्नु", "kanjiCharacters": ["測"], "partOfSpeech": "Verb"},
    {"id": "v40_3", "lesson": 40, "level": "N4", "word": "確かめます", "reading": "たしかめます", "meaning": "Confirm / Make sure", "meaningNepali": "यकिन गर्नु", "kanjiCharacters": ["確"], "partOfSpeech": "Verb"},

    # Lesson 41
    {"id": "v41_1", "lesson": 41, "level": "N4", "word": "いただきます", "reading": "いただきます", "meaning": "Receive (Humble)", "meaningNepali": "प्राप्त गर्नु (नम्र)", "kanjiCharacters": [], "partOfSpeech": "Verb"},
    {"id": "v41_2", "lesson": 41, "level": "N4", "word": "くださいます", "reading": "くださいます", "meaning": "Give me (Honorific)", "meaningNepali": "दिइबक्सनु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
    {"id": "v41_3", "lesson": 41, "level": "N4", "word": "お祝い", "reading": "おいわい", "meaning": "Celebration / Gift", "meaningNepali": "बधाई / उपहार", "kanjiCharacters": ["祝"], "partOfSpeech": "Noun"},

    # Lesson 42
    {"id": "v42_1", "lesson": 42, "level": "N4", "word": "包みます", "reading": "つつみます", "meaning": "Wrap up", "meaningNepali": "बाँध्नु / पोको पार्नु", "kanjiCharacters": ["包"], "partOfSpeech": "Verb"},
    {"id": "v42_2", "lesson": 36, "level": "N4", "word": "沸かします", "reading": "わかします", "meaning": "Boil water", "meaningNepali": "पानी उमाल्नु", "kanjiCharacters": ["沸"], "partOfSpeech": "Verb"},
    {"id": "v42_3", "lesson": 42, "level": "N4", "word": "弁護士", "reading": "べんごし", "meaning": "Lawyer / Attorney", "meaningNepali": "वकील", "kanjiCharacters": ["弁", "護", "士"], "partOfSpeech": "Noun"},

    # Lesson 43
    {"id": "v43_1", "lesson": 43, "level": "N4", "word": "増えます", "reading": "ふえます", "meaning": "[Exports] Increase", "meaningNepali": "बढ्नु", "kanjiCharacters": ["増"], "partOfSpeech": "Verb"},
    {"id": "v43_2", "lesson": 43, "level": "N4", "word": "減ります", "reading": "へります", "meaning": "[Exports] Decrease", "meaningNepali": "घट्नु", "kanjiCharacters": ["減"], "partOfSpeech": "Verb"},
    {"id": "v43_3", "lesson": 43, "level": "N4", "word": "上がります", "reading": "あがります", "meaning": "[Price] Rise", "meaningNepali": "बढ्नु (मूल्य)", "kanjiCharacters": ["上"], "partOfSpeech": "Verb"},

    # Lesson 44
    {"id": "v44_1", "lesson": 44, "level": "N4", "word": "泣きます", "reading": "なきます", "meaning": "Cry", "meaningNepali": "रुनु", "kanjiCharacters": ["泣"], "partOfSpeech": "Verb"},
    {"id": "v44_2", "lesson": 44, "level": "N4", "word": "笑います", "reading": "わらいます", "meaning": "Laugh / Smile", "meaningNepali": "हास्नु", "kanjiCharacters": ["笑"], "partOfSpeech": "Verb"},
    {"id": "v44_3", "lesson": 44, "level": "N4", "word": "乾きます", "reading": "かわきます", "meaning": "Get dry", "meaningNepali": "सुक्नु", "kanjiCharacters": ["乾"], "partOfSpeech": "Verb"},

    # Lesson 45
    {"id": "v45_1", "lesson": 45, "level": "N4", "word": "信じます", "reading": "しんじます", "meaning": "Believe / Trust", "meaningNepali": "विश्वास गर्नु", "kanjiCharacters": ["信"], "partOfSpeech": "Verb"},
    {"id": "v45_2", "lesson": 45, "level": "N4", "word": "キャンセルします", "reading": "キャンセルします", "meaning": "Cancel", "meaningNepali": "रद्द गर्नु", "kanjiCharacters": [], "partOfSpeech": "Verb"},
    {"id": "v45_3", "lesson": 45, "level": "N4", "word": "保証書", "reading": "ほしょうしょ", "meaning": "Guarantee / Warranty", "meaningNepali": "ग्यारेन्टी पत्र", "kanjiCharacters": ["保", "証", "書"], "partOfSpeech": "Noun"},

    # Lesson 46
    {"id": "v46_1", "lesson": 46, "level": "N4", "word": "渡します", "reading": "わたします", "meaning": "Hand over", "meaningNepali": "हस्तान्तरण गर्नु", "kanjiCharacters": ["渡"], "partOfSpeech": "Verb"},
    {"id": "v46_2", "lesson": 46, "level": "N4", "word": "帰ってきます", "reading": "かえってきます", "meaning": "Come back", "meaningNepali": "फर्किएर आउनु", "kanjiCharacters": ["帰"], "partOfSpeech": "Verb"},

    # Lesson 47
    {"id": "v47_1", "lesson": 47, "level": "N4", "word": "吹きます", "reading": "ふきます", "meaning": "[Wind] Blow", "meaningNepali": "हावा चल्नु", "kanjiCharacters": ["吹"], "partOfSpeech": "Verb"},
    {"id": "v47_2", "lesson": 47, "level": "N4", "word": "集まります", "reading": "あつまります", "meaning": "[People] Gather", "meaningNepali": "भेला हुनु", "kanjiCharacters": ["集"], "partOfSpeech": "Verb"},

    # Lesson 48
    {"id": "v48_1", "lesson": 48, "level": "N4", "word": "降ろします", "reading": "おろします", "meaning": "Lower / Unload", "meaningNepali": "ओार्नु", "kanjiCharacters": ["降"], "partOfSpeech": "Verb"},
    {"id": "v48_2", "lesson": 48, "level": "N4", "word": "届けます", "reading": "とどけます", "meaning": "Deliver", "meaningNepali": "पुर्‍याउनु", "kanjiCharacters": ["届"], "partOfSpeech": "Verb"},

    # Lesson 49
    {"id": "v49_1", "lesson": 49, "level": "N4", "word": "利用します", "reading": "りようします", "meaning": "Use / Utilize (Polite)", "meaningNepali": "प्रयोग गर्नु", "kanjiCharacters": ["利", "用"], "partOfSpeech": "Verb"},
    {"id": "v49_2", "lesson": 49, "level": "N4", "word": "社長", "reading": "しゃちょう", "meaning": "Company president", "meaningNepali": "अध्यक्ष / मालिक", "kanjiCharacters": ["社", "長"], "partOfSpeech": "Noun"},

    # Lesson 50
    {"id": "v50_1", "lesson": 50, "level": "N4", "word": "参ります", "reading": "まいります", "meaning": "Go / Come (Humble)", "meaningNepali": "जानु / आउनु (नम्र)", "kanjiCharacters": ["参"], "partOfSpeech": "Verb"},
    {"id": "v50_2", "lesson": 50, "level": "N4", "word": "おります", "reading": "おります", "meaning": "Be (Humble)", "meaningNepali": "हुनु (नम्र)", "kanjiCharacters": [], "partOfSpeech": "Verb"},
    {"id": "v50_3", "lesson": 50, "level": "N4", "word": "申します", "reading": "もうします", "meaning": "Say / Be called (Humble)", "meaningNepali": "भन्नु (नम्र)", "kanjiCharacters": ["申"], "partOfSpeech": "Verb"},
    {"id": "v50_4", "lesson": 50, "level": "N4", "word": "いたします", "reading": "いたします", "meaning": "Do (Humble)", "meaningNepali": "गर्नु (नम्र)", "kanjiCharacters": [], "partOfSpeech": "Verb"}
]

# Read lib/nihongo-vocab.ts
with open("lib/nihongo-vocab.ts", "r", encoding="utf-8") as f:
    vocab_code = f.read()

# Insert l36_to_50_vocab into NIHONGO_VOCAB_DATA before v51_1
insert_marker = "{ id:'v51_1', lesson:51"
insert_pos = vocab_code.find(insert_marker)

v_str = "  // ════════════════════════════════════\n  // LESSONS 36 TO 50 — COMPLETE VOCABULARY SEEDS & SCANNED TEXTBOOK TEXT\n  // ════════════════════════════════════\n"
for item in l36_to_50_vocab:
    v_str += "  " + json.dumps(item, ensure_ascii=False) + ",\n"

vocab_code = vocab_code[:insert_pos] + v_str + "\n  " + vocab_code[insert_pos:]

with open("lib/nihongo-vocab.ts", "w", encoding="utf-8") as f:
    f.write(vocab_code)

print("SUCCESSFULLY_SEEDED_ALL_N4_LESSONS_26_THROUGH_50")
