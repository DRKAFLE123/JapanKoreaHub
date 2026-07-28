import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("scratch/docx_lessons_13_20.json", "r", encoding="utf-8") as f:
    docx_data = json.load(f)

# Helper function to extract Kanji array from Japanese text
def extract_kanji_array(jp_text):
    kanjis = re.findall(r'[\u4e00-\u9faf]', jp_text)
    return list(dict.fromkeys(kanjis))

def get_pos(jp, eng):
    eng_lower = eng.lower()
    if any(jp.endswith(v) for v in ['ます', 'する']) or 'verb' in eng_lower or 'go' in eng_lower or 'do' in eng_lower:
        return 'Verb'
    elif jp.endswith('い') or 'adjective' in eng_lower:
        return 'I-Adj'
    elif jp.endswith('な'):
        return 'Na-Adj'
    return 'Noun'

nepali_vocab_map = {
    # Lesson 13
    "あそびます": "रमाइलो गर्नु / खेल्नु", "およぎます": "पौडी खेल्नु", "むかえに いきます": "भेट्न जानु / स्वागत गर्नु",
    "つかれます": "थाक्नु", "けっこんします": "विवाह गर्नु", "かいもの": "किनमेल", "しょくじ": "खाना",
    "さんぽ": "घुम्न जानु / पैदल यात्रा", "たいへん": "कठिन / गाह्रो", "ほしい": "चाहिनु / इच्छा हुनु",
    "ひろい": "फराकिलो", "せまい": "साँघुरो", "しやくしょ": "नगरपालिका कार्यालय", "プール": "स्विमिङ पुल",
    "かわ": "नदी / खोला", "びじゅつ": "कला", "つり": "माछा मार्ने कार्य", "スキー": "स्किइङ",
    "週末": "सप्ताहान्त", "お正月": "नयाँ वर्ष", "ころ": "लगभग / करिब", "なにか": "केही", "どこか": "कतै",
    "のどが かわきます": "तिर्खा लाग्नु", "おなかが すきます": "भोक लाग्नु", "そう しましょう": "त्यसै गरौँ",
    "つけます": "बाल्नु / अन गर्नु", "けします": "निभाउनु / अफ गर्नु", "あけます": "खोल्नु", "しめます": "बन्द गर्नु",
    "いそぎます": "हतार गर्नु", "まちます": "पर्खनु", "もちます": "समात्नु / बोक्नु", "とります": "लिनु / दिनु",
    "てつだいます": "सहयोग गर्नु", "よびます": "बोलाउनु", "はなします": "बोल्नु", "つかいます": "प्रयोग गर्नु",
    "とめます": "रोक्नु / पार्क गर्नु", "みせます": "देखाउनु", "おしえます": "सिकाउनु / भन्नु", "すわります": "बस्नु",
    "たちます": "उभिनु", "はいります": "छिर्नु", "でます": "बाहिर निस्कनु", "ふります": "पानी पर्नु",
    "コピーします": "प्रतिलिपि गर्नु", "でんき": "बिजुली / बत्ती", "エアコン": "एयर कन्डिसनर", "パスポート": "राहदानी",
    "なまえ": "नाम", "じゅうしょ": "ठेगाना", "ちず": "नक्सा", "しお": "नुन", "さとん": "चिनी",
    "おきます": "राख्नु", "つくります": "बनाउनु", "うります": "बेच्नु", "しります": "थाहा पाउनु",
    "すみます": "बस्नु / निवास गर्नु", "けんきゅうします": "अनुसन्धान गर्नु", "しりょう": "सामग्री", "カタログ": "क्याटलग"
}

def get_np_vocab(jp, eng):
    jp_clean = jp.strip()
    if jp_clean in nepali_vocab_map:
        return nepali_vocab_map[jp_clean]
    for k, v in nepali_vocab_map.items():
        if k in jp_clean:
            return v
    return f"{eng} (नेपाली)"

# Read current lib/n5-lessons-11to15.ts to keep Lessons 11 and 12
with open("lib/n5-lessons-11to15.ts", "r", encoding="utf-8") as f:
    existing_content = f.read()

# Extract Lesson 11 and 12 part up to Lesson 13 header
split_pos = existing_content.find("// LESSON 13")
if split_pos != -1:
    header_part = existing_content[:split_pos].rstrip()
else:
    header_part = existing_content.split("export const N5_LESSONS_11TO15")[0] + "export const N5_LESSONS_11TO15: VocabItem[] = [\n"

# Generate code for Lessons 13, 14, 15
new_lines = []
for l in [13, 14, 15]:
    v_raw = docx_data[str(l)]["vocab"]
    new_lines.append(f"  // ════════════════════════════════════════════════════════")
    new_lines.append(f"  // LESSON {l} ({len(v_raw)} ITEMS)")
    new_lines.append(f"  // ════════════════════════════════════════════════════════")
    
    for idx, item in enumerate(v_raw, start=1):
        jp = item["japanese"].replace("'", "\\'")
        rom = item["romaji"].replace("'", "\\'")
        eng = item["english"].replace("'", "\\'")
        np_val = get_np_vocab(jp, eng).replace("'", "\\'")
        kanjis = extract_kanji_array(jp)
        pos = get_pos(jp, eng)
        kanji_str = json.dumps(kanjis, ensure_ascii=False)
        
        entry = (
            f"  {{\n"
            f"    id: 'N5-L{l}-{idx:03d}', lesson: {l}, word: '{jp}', reading: '{jp}',\n"
            f"    meaning: '{eng}', meaningNepali: '{np_val}', romaji: '{rom}', category: '{pos}',\n"
            f"    kanjiCharacters: {kanji_str}, partOfSpeech: '{pos}',\n"
            f"    grammarSentences: [\n"
            f"      {{ japanese: '{jp}。', english: 'Example sentence for {eng}.', nepali: '{np_val} प्रयोग गरिएको उदाहरण वाक्य।' }}\n"
            f"    ]\n"
            f"  }},"
        )
        new_lines.append(entry)

final_11to15 = header_part + "\n\n" + "\n".join(new_lines) + "\n];\n"

with open("lib/n5-lessons-11to15.ts", "w", encoding="utf-8") as f:
    f.write(final_11to15)

print("Updated lib/n5-lessons-11to15.ts with official DOCX Lessons 13-15 data!")
