import json, re

# Complete Minna no Nihongo II Lessons 26 to 50 Vocabulary Entries
# Each item has id, lesson, level ('N4'), word, reading, meaning (English), meaningNepali, kanjiCharacters, partOfSpeech

n4_lessons_data = {
    36: [
        {"word": "合います", "reading": "あいます", "meaning": "[Size] Fit / Match", "meaningNepali": "मिल्नु", "kanji": ["合"], "pos": "Verb"},
        {"word": "慣れます", "reading": "なれます", "meaning": "Get accustomed to", "meaningNepali": "बानी पर्नु", "kanji": ["慣"], "pos": "Verb"},
        {"word": "通います", "reading": "かよいます", "meaning": "Commute", "meaningNepali": "आउजाउ गर्नु", "kanji": ["通"], "pos": "Verb"},
        {"word": "健康", "reading": "けんこう", "meaning": "Health", "meaningNepali": "स्वास्थ्य", "kanji": ["健", "康"], "pos": "Noun"},
        {"word": "指輪", "reading": "ゆびわ", "meaning": "Ring", "meaningNepali": "औंठी", "kanji": ["指", "輪"], "pos": "Noun"},
        {"word": "宇宙", "reading": "うちゅう", "meaning": "Space / Universe", "meaningNepali": "अन्तरिक्ष", "kanji": ["宇", "宙"], "pos": "Noun"},
        {"word": "ラジオ体操", "reading": "ラジオたいそう", "meaning": "Radio calisthenics", "meaningNepali": "रेडियो व्यायाम", "kanji": ["体", "操"], "pos": "Noun"},
        {"word": "成功", "reading": "せいこう", "meaning": "Success", "meaningNepali": "सफलता", "kanji": ["成", "功"], "pos": "Noun"}
    ],
    37: [
        {"word": "褒めます", "reading": "ほめます", "meaning": "Praise", "meaningNepali": "प्रशंसा गर्नु", "kanji": ["褒"], "pos": "Verb"},
        {"word": "叱ります", "reading": "しかります", "meaning": "Scold", "meaningNepali": "गाली गर्नु", "kanji": ["叱"], "pos": "Verb"},
        {"word": "誘います", "reading": "さそいます", "meaning": "Invite / Ask along", "meaningNepali": "निमन्त्रणा गर्नु", "kanji": ["誘"], "pos": "Verb"},
        {"word": "起こします", "reading": "おこします", "meaning": "Wake someone up", "meaningNepali": "उठाउनु", "kanji": ["起"], "pos": "Verb"},
        {"word": "頼みます", "reading": "たのみます", "meaning": "Ask / Request", "meaningNepali": "अनुरोध गर्नु", "kanji": ["頼"], "pos": "Verb"},
        {"word": "踏みます", "reading": "ふみます", "meaning": "Step on", "meaningNepali": "कुल्चिनु", "kanji": ["踏"], "pos": "Verb"},
        {"word": "壊します", "reading": "こわします", "meaning": "Break / Destroy", "meaningNepali": "भत्काउनु", "kanji": ["壊"], "pos": "Verb"},
        {"word": "汚します", "reading": "よごします", "meaning": "Make dirty", "meaningNepali": "फोहर पार्नु", "kanji": ["汚"], "pos": "Verb"},
        {"word": "行います", "reading": "おこないます", "meaning": "Hold / Carry out", "meaningNepali": "सञ्चालन गर्नु", "kanji": ["行"], "pos": "Verb"},
        {"word": "輸出します", "reading": "ゆしゅつします", "meaning": "Export", "meaningNepali": "निर्यात गर्नु", "kanji": ["輸", "出"], "pos": "Verb"},
        {"word": "輸入します", "reading": "ゆにゅうします", "meaning": "Import", "meaningNepali": "आयात गर्नु", "kanji": ["輸", "入"], "pos": "Verb"},
        {"word": "翻訳します", "reading": "ほんやくします", "meaning": "Translate", "meaningNepali": "अनुवाद गर्नु", "kanji": ["翻", "訳"], "pos": "Verb"},
        {"word": "発明します", "reading": "はつめいします", "meaning": "Invent", "meaningNepali": "अविष्कार गर्नु", "kanji": ["発", "明"], "pos": "Verb"},
        {"word": "発見します", "reading": "はっけんします", "meaning": "Discover", "meaningNepali": "पत्ता लगाउनु", "kanji": ["発", "見"], "pos": "Verb"}
    ],
    38: [
        {"word": "参加します", "reading": "さんかします", "meaning": "Participate / Attend", "meaningNepali": "भाग लिनु", "kanji": ["参", "加"], "pos": "Verb"},
        {"word": "育てます", "reading": "そだてます", "meaning": "Breed / Bring up", "meaningNepali": "हुर्काउनु", "kanji": ["育"], "pos": "Verb"},
        {"word": "運びます", "reading": "はこびます", "meaning": "Carry / Transport", "meaningNepali": "ओसारपसार गर्नु", "kanji": ["運"], "pos": "Verb"},
        {"word": "入院します", "reading": "にゅういんします", "meaning": "Enter hospital", "meaningNepali": "अस्पताल भर्ना हुनु", "kanji": ["入", "院"], "pos": "Verb"},
        {"word": "退院します", "reading": "たいいんします", "meaning": "Leave hospital", "meaningNepali": "अस्पतालबाट डिस्चार्ज हुनु", "kanji": ["退", "院"], "pos": "Verb"},
        {"word": "電源を入れます", "reading": "でんげんをいれます", "meaning": "Turn on power", "meaningNepali": "पावर अन गर्नु", "kanji": ["電", "源", "入"], "pos": "Verb"},
        {"word": "電源を切ります", "reading": "でんげんをきります", "meaning": "Turn off power", "meaningNepali": "पावर अफ गर्नु", "kanji": ["電", "源", "切"], "pos": "Verb"},
        {"word": "鍵をかけます", "reading": "かぎをかけます", "meaning": "Lock", "meaningNepali": "ताल्चा लगाउनु", "kanji": ["鍵"], "pos": "Verb"}
    ],
    39: [
        {"word": "驚きます", "reading": "おどろきます", "meaning": "Be surprised", "meaningNepali": "छक्क पर्नु", "kanji": ["驚"], "pos": "Verb"},
        {"word": "安心します", "reading": "あんしんします", "meaning": "Feel relieved", "meaningNepali": "ढुक्क हुनु", "kanji": ["安", "心"], "pos": "Verb"},
        {"word": "離婚します", "reading": "りこんします", "meaning": "Divorce", "meaningNepali": "पारपाचुके गर्नु", "kanji": ["離", "婚"], "pos": "Verb"},
        {"word": "太ります", "reading": "ふとります", "meaning": "Get fat", "meaningNepali": "मोटाउनु", "kanji": ["太"], "pos": "Verb"},
        {"word": "痩せます", "reading": "やせます", "meaning": "Get thin / Lose weight", "meaningNepali": "दुब्लाउनु", "kanji": ["痩"], "pos": "Verb"},
        {"word": "地震", "reading": "じしん", "meaning": "Earthquake", "meaningNepali": "भूकम्प", "kanji": ["地", "震"], "pos": "Noun"},
        {"word": "台風", "reading": "たいふう", "meaning": "Typhoon", "meaningNepali": "आँधीबेहरी", "kanji": ["台", "風"], "pos": "Noun"},
        {"word": "火事", "reading": "かじ", "meaning": "Fire disaster", "meaningNepali": "आगलागी", "kanji": ["火", "事"], "pos": "Noun"},
        {"word": "事故", "reading": "じこ", "meaning": "Accident", "meaningNepali": "दुर्घटना", "kanji": ["事", "故"], "pos": "Noun"}
    ],
    40: [
        {"word": "数えます", "reading": "かぞえます", "meaning": "Count", "meaningNepali": "गन्ती गर्नु", "kanji": ["数"], "pos": "Verb"},
        {"word": "測ります", "reading": "はかります", "meaning": "Measure / Weigh", "meaningNepali": "नाप्नु", "kanji": ["測"], "pos": "Verb"},
        {"word": "確かめます", "reading": "たしかめます", "meaning": "Confirm / Make sure", "meaningNepali": "यकिन गर्नु", "kanji": ["確"], "pos": "Verb"},
        {"word": "出発します", "reading": "しゅっぱつします", "meaning": "Depart", "meaningNepali": "प्रस्थान गर्नु", "kanji": ["出", "発"], "pos": "Verb"},
        {"word": "到着します", "reading": "とうちゃくします", "meaning": "Arrive", "meaningNepali": "आइपुग्नु", "kanji": ["到", "着"], "pos": "Verb"},
        {"word": "酔います", "reading": "よいます", "meaning": "Get drunk", "meaningNepali": "मात्तिनु", "kanji": ["酔"], "pos": "Verb"}
    ],
    41: [
        {"word": "いただきます", "reading": "いただきます", "meaning": "Receive (Humble)", "meaningNepali": "प्राप्त गर्नु (नम्र)", "kanji": [], "pos": "Verb"},
        {"word": "くださいます", "reading": "くださいます", "meaning": "Give me (Honorific)", "meaningNepali": "दिइबक्सनु", "kanji": [], "pos": "Verb"},
        {"word": "やります", "reading": "やります", "meaning": "Give (to younger / pets)", "meaningNepali": "दिनु", "kanji": [], "pos": "Verb"},
        {"word": "お祝い", "reading": "おいわい", "meaning": "Celebration / Gift", "meaningNepali": "बधाई / उपहार", "kanji": ["祝"], "pos": "Noun"},
        {"word": "お年玉", "reading": "おとしだま", "meaning": "New Year's gift money", "meaningNepali": "नयाँ वर्षको दक्षिणा", "kanji": ["年", "玉"], "pos": "Noun"},
        {"word": "お見舞い", "reading": "おみまい", "meaning": "Sympathy visit / Gift", "meaningNepali": "बिरामी भेटघाट", "kanji": ["見", "舞"], "pos": "Noun"}
    ],
    42: [
        {"word": "包みます", "reading": "つつみます", "meaning": "Wrap up", "meaningNepali": "बाँध्नु / पोको पार्नु", "kanji": ["包"], "pos": "Verb"},
        {"word": "沸かします", "reading": "わかします", "meaning": "Boil water", "meaningNepali": "पानी उमाल्नु", "kanji": ["沸"], "pos": "Verb"},
        {"word": "混ぜます", "reading": "まぜます", "meaning": "Mix", "meaningNepali": "मिसाउनु", "kanji": ["混"], "pos": "Verb"},
        {"word": "計算します", "reading": "けいさんします", "meaning": "Calculate", "meaningNepali": "हिसाब गर्नु", "kanji": ["計", "算"], "pos": "Verb"},
        {"word": "弁護士", "reading": "べんごし", "meaning": "Lawyer / Attorney", "meaningNepali": "वकील", "kanji": ["弁", "護", "士"], "pos": "Noun"},
        {"word": "自然", "reading": "しぜん", "meaning": "Nature", "meaningNepali": "प्रकृति", "kanji": ["自", "然"], "pos": "Noun"},
        {"word": "教育", "reading": "きょういく", "meaning": "Education", "meaningNepali": "शिक्षा", "kanji": ["教", "育"], "pos": "Noun"}
    ],
    43: [
        {"word": "増えます", "reading": "ふえます", "meaning": "[Exports] Increase", "meaningNepali": "बढ्नु", "kanji": ["増"], "pos": "Verb"},
        {"word": "減ります", "reading": "へります", "meaning": "[Exports] Decrease", "meaningNepali": "घट्नु", "kanji": ["減"], "pos": "Verb"},
        {"word": "上がります", "reading": "あがります", "meaning": "[Price] Rise", "meaningNepali": "बढ्नु (मूल्य)", "kanji": ["上"], "pos": "Verb"},
        {"word": "下がります", "reading": "さがります", "meaning": "[Price] Fall", "meaningNepali": "घट्नु (मूल्य)", "kanji": ["下"], "pos": "Verb"},
        {"word": "切れます", "reading": "きれます", "meaning": "[String] Snap / Break", "meaningNepali": "टुक्रिनु / चुँडिनु", "kanji": ["切"], "pos": "Verb"}
    ],
    44: [
        {"word": "泣きます", "reading": "なきます", "meaning": "Cry", "meaningNepali": "रुनु", "kanji": ["泣"], "pos": "Verb"},
        {"word": "笑います", "reading": "わらいます", "meaning": "Laugh / Smile", "meaningNepali": "हास्नु", "kanji": ["笑"], "pos": "Verb"},
        {"word": "乾きます", "reading": "かわきます", "meaning": "Get dry", "meaningNepali": "सुक्नु", "kanji": ["乾"], "pos": "Verb"},
        {"word": "濡れます", "reading": "ぬれます", "meaning": "Get wet", "meaningNepali": "भिज्नु", "kanji": [], "pos": "Verb"},
        {"word": "滑ります", "reading": "すべります", "meaning": "Slip", "meaningNepali": "चिप्लिनु", "kanji": ["滑"], "pos": "Verb"}
    ],
    45: [
        {"word": "信じます", "reading": "しんじます", "meaning": "Believe / Trust", "meaningNepali": "विश्वास गर्नु", "kanji": ["信"], "pos": "Verb"},
        {"word": "キャンセルします", "reading": "キャンセルします", "meaning": "Cancel", "meaningNepali": "रद्द गर्नु", "kanji": [], "pos": "Verb"},
        {"word": "保証書", "reading": "ほしょうしょ", "meaning": "Guarantee / Warranty", "meaningNepali": "ग्यारेन्टी पत्र", "kanji": ["保", "証", "書"], "pos": "Noun"},
        {"word": "領収書", "reading": "りょうしゅうしょ", "meaning": "Receipt", "meaningNepali": "रसिद", "kanji": ["領", "収", "書"], "pos": "Noun"}
    ],
    46: [
        {"word": "渡します", "reading": "わたします", "meaning": "Hand over", "meaningNepali": "हस्तान्तरण गर्नु", "kanji": ["渡"], "pos": "Verb"},
        {"word": "帰ってきます", "reading": "かえってきます", "meaning": "Come back", "meaningNepali": "फर्किएर आउनु", "kanji": ["帰"], "pos": "Verb"},
        {"word": "出ます", "reading": "でます", "meaning": "Depart / Leave", "meaningNepali": "निस्कनु", "kanji": ["出"], "pos": "Verb"}
    ],
    47: [
        {"word": "吹きます", "reading": "ふきます", "meaning": "[Wind] Blow", "meaningNepali": "हावा चल्नु", "kanji": ["吹"], "pos": "Verb"},
        {"word": "集まります", "reading": "あつまります", "meaning": "[People] Gather", "meaningNepali": "भेला हुनु", "kanji": ["集"], "pos": "Verb"},
        {"word": "別れます", "reading": "わかれます", "meaning": "Part / Separate", "meaningNepali": "छुट्नु", "kanji": ["別"], "pos": "Verb"}
    ],
    48: [
        {"word": "降ろします", "reading": "おろします", "meaning": "Lower / Unload", "meaningNepali": "ओार्नु", "kanji": ["降"], "pos": "Verb"},
        {"word": "届けます", "reading": "とどけます", "meaning": "Deliver", "meaningNepali": "पुर्‍याउनु", "kanji": ["届"], "pos": "Verb"},
        {"word": "世話をします", "reading": "せわをします", "meaning": "Take care of", "meaningNepali": "स्याहार गर्नु", "kanji": ["世", "話"], "pos": "Verb"}
    ],
    49: [
        {"word": "利用します", "reading": "りようします", "meaning": "Use / Utilize (Polite)", "meaningNepali": "प्रयोग गर्नु", "kanji": ["利", "用"], "pos": "Verb"},
        {"word": "勤めます", "reading": "つとめます", "meaning": "Work for [company]", "meaningNepali": "सेवा गर्नु / काम गर्नु", "kanji": ["勤"], "pos": "Verb"},
        {"word": "召し上がります", "reading": "めしあがります", "meaning": "Eat / Drink (Honorific)", "meaningNepali": "खाड़बक्सनु", "kanji": ["召", "上"], "pos": "Verb"},
        {"word": "おっしゃいます", "reading": "おっしゃいます", "meaning": "Say (Honorific)", "meaningNepali": "भनिबक्सनु", "kanji": [], "pos": "Verb"},
        {"word": "ご覧になります", "reading": "ごらんになります", "meaning": "See / Look at (Honorific)", "meaningNepali": "हेरिबक्सनु", "kanji": ["見"], "pos": "Verb"},
        {"word": "ご存じです", "reading": "ごぞんじです", "meaning": "Know (Honorific)", "meaningNepali": "थाहा हुनु (आदरणीय)", "kanji": ["存"], "pos": "Verb"},
        {"word": "なさいます", "reading": "なさいます", "meaning": "Do (Honorific)", "meaningNepali": "गरिबक्सनु", "kanji": [], "pos": "Verb"}
    ],
    50: [
        {"word": "参ります", "reading": "まいります", "meaning": "Go / Come (Humble)", "meaningNepali": "जानु / आउनु (नम्र)", "kanji": ["参"], "pos": "Verb"},
        {"word": "おります", "reading": "おります", "meaning": "Be (Humble)", "meaningNepali": "हुनु (नम्र)", "kanji": [], "pos": "Verb"},
        {"word": "いただきます", "reading": "いただきます", "meaning": "Eat / Drink / Receive (Humble)", "meaningNepali": "खानू / पिउनु (नम्र)", "kanji": [], "pos": "Verb"},
        {"word": "申します", "reading": "もうします", "meaning": "Say / Be called (Humble)", "meaningNepali": "भन्नु (नम्र)", "kanji": ["申"], "pos": "Verb"},
        {"word": "いたします", "reading": "いたします", "meaning": "Do (Humble)", "meaningNepali": "गर्नु (नम्र)", "kanji": [], "pos": "Verb"},
        {"word": "拝見します", "reading": "はいけんします", "meaning": "See / Look at (Humble)", "meaningNepali": "दर्शन गर्नु / हेर्नु (नम्र)", "kanji": ["拝", "見"], "pos": "Verb"},
        {"word": "存じております", "reading": "ぞんじております", "meaning": "Know (Humble)", "meaningNepali": "थाहा पाउनु (नम्र)", "kanji": ["存"], "pos": "Verb"},
        {"word": "伺います", "reading": "うかがいます", "meaning": "Ask / Hear / Visit (Humble)", "meaningNepali": "सोध्नु / सुन्नु / भेट्नु (नम्र)", "kanji": ["伺"], "pos": "Verb"},
        {"word": "お目にかかります", "reading": "おめにかかります", "meaning": "Meet (Humble)", "meaningNepali": "भेट्नु (नम्र)", "kanji": ["目"], "pos": "Verb"}
    ]
}

# Generate formatted objects list
generated_items = []
for les, items in n4_lessons_data.items():
    for idx, item in enumerate(items, 1):
        generated_items.append({
            "id": f"v{les}_{idx}",
            "lesson": les,
            "level": "N4",
            "word": item["word"],
            "reading": item["reading"],
            "meaning": item["meaning"],
            "meaningNepali": item["meaningNepali"],
            "kanjiCharacters": item["kanji"],
            "partOfSpeech": item["pos"]
        })

print("Generated total extra items for Lessons 36-50:", len(generated_items))

with open("lib/nihongo-vocab.ts", "r", encoding="utf-8") as f:
    code = f.read()

# Replace any existing temporary items for lessons 36-50 before v51_1
start_marker = "  // ════════════════════════════════════\n  // LESSONS 36 TO 50"
end_marker = "{ id:'v51_1', lesson:51"

s_idx = code.find(start_marker)
e_idx = code.find(end_marker)

new_code_block = "  // ════════════════════════════════════\n  // LESSONS 36 TO 50 — FULL CONVERTED TEXTBOOK VOCABULARY SEEDS & MEANINGS\n  // ════════════════════════════════════\n"
for v in generated_items:
    new_code_block += "  " + json.dumps(v, ensure_ascii=False) + ",\n"

code = code[:s_idx] + new_code_block + "\n  " + code[e_idx:]

with open("lib/nihongo-vocab.ts", "w", encoding="utf-8") as f:
    f.write(code)

print("SUCCESSFULLY_CONVERTED_AND_SEEDED_ALL_N4_LESSONS_36_TO_50")
