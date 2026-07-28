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
    "すみます": "बस्नु / निवास गर्नु", "けんきゅうします": "अनुसन्धान गर्नु", "しりょう": "सामग्री", "カタログ": "क्याटलग",
    "のります": "चढ्नु [रेलमा]", "おります": "ओर्लनु [रेलबाट]", "のりかえます": "फेर्नु", "あびます": "नुहाउनु",
    "いれます": "हाल्नु", "だします": "झिक्नु", "やめます": "छाड्नु", "おします": "थिच्नु", "わかい": "जवान",
    "ながい": "लामो", "みじかい": "छोटो", "あかるい": "उज्यालो", "くらい": "अध्यारो", "からだ": "शरीर",
    "あたま": "टाउको", "かみ": "कपाल", "かお": "अनुहार", "め": "आँखा", "みみ": "कान", "くち": "मुख",
    "は": "दाँत", "おなか": "पेट", "あし": "खुट्टा", "せ": "उचाइ", "サービス": "सेवा", "ジョギング": "जगिङ",
    "おぼえます": "याद गर्नु", "わすれます": "बिर्सनु", "なくします": "हराउनु", "はらいます": "तिर्नु",
    "かえします": "फिर्ता गर्नु", "かけます": "फोन गर्नु", "ぬぎます": "खोल्नु [लुगा]", "もっていきます": "साथमा लैजानु",
    "もってきます": "साथमा ल्याउनु", "しんぱいします": "चिन्ता गर्नु", "ざんぎょうします": "ओभरटाइम गर्नु",
    "できます": "सक्नु", "あらいます": "धुने", "ひきます": "बजाउनु", "うたいました": "गाउनु",
    "あつめます": "संकलन गर्नु", "すてます": "फ्याँक्नु", "かえます": "साट्नु", "うんてんします": "गाडी चलाउनु",
    "のぼります": "चढ्नु [पहाड]", "とまります": "बस्नु [होटल]", "そうじします": "सरसफाइ गर्नु",
    "せんたくします": "धुलाई गर्नु", "なります": "हुनु / बन्नु", "ねむい": "निद्रा लाग्नु", "つよい": "बलियो",
    "いります": "चाहिनु", "しらべます": "जाँच गर्नु", "なおします": "मर्मत गर्नु", "僕": "म", "君": "तिमी"
}

def get_np_vocab(jp, eng):
    jp_clean = jp.strip()
    if jp_clean in nepali_vocab_map:
        return nepali_vocab_map[jp_clean]
    for k, v in nepali_vocab_map.items():
        if k in jp_clean:
            return v
    return f"{eng} (नेपाली)"

def format_vocab_entries(lesson_num):
    v_raw = docx_data[str(lesson_num)]["vocab"]
    lines = []
    lines.append(f"  // ════════════════════════════════════════════════════════")
    lines.append(f"  // LESSON {lesson_num} ({len(v_raw)} ITEMS)")
    lines.append(f"  // ════════════════════════════════════════════════════════")
    
    for idx, item in enumerate(v_raw, start=1):
        jp = item["japanese"]
        rom = item["romaji"]
        eng = item["english"]
        np_val = get_np_vocab(jp, eng)
        kanjis = extract_kanji_array(jp)
        pos = get_pos(jp, eng)
        
        jp_json = json.dumps(jp, ensure_ascii=False)
        eng_json = json.dumps(eng, ensure_ascii=False)
        np_json = json.dumps(np_val, ensure_ascii=False)
        kanji_json = json.dumps(kanjis, ensure_ascii=False)
        pos_json = json.dumps(pos, ensure_ascii=False)
        
        ex_jp_json = json.dumps(f"{jp}。", ensure_ascii=False)
        ex_eng_json = json.dumps(f"Example sentence for {eng}.", ensure_ascii=False)
        ex_np_json = json.dumps(f"{np_val} प्रयोग गरिएको उदाहरण वाक्य।", ensure_ascii=False)
        
        entry = (
            f"  {{\n"
            f"    id: 'N5-L{lesson_num}-{idx:03d}', lesson: {lesson_num}, level: 'N5', word: {jp_json}, reading: {jp_json},\n"
            f"    meaning: {eng_json}, meaningNepali: {np_json},\n"
            f"    kanjiCharacters: {kanji_json}, partOfSpeech: {pos_json},\n"
            f"    grammarSentences: [\n"
            f"      {{ japanese: {ex_jp_json}, reading: {ex_jp_json}, english: {ex_eng_json}, nepali: {ex_np_json} }}\n"
            f"    ]\n"
            f"  }},"
        )
        lines.append(entry)
    return "\n".join(lines)

# Write lib/n5-lessons-16to20.ts
ts_16to20_code = (
    "// ============================================================\n"
    "// MINNA NO NIHONGO JLPT N5 — Vocab (Lessons 16 to 20)\n"
    "// Official textbook definitions from Minna no Nihongo I\n"
    "// ============================================================\n"
    "import type { VocabItem } from './nihongo-vocab';\n\n"
    "export const N5_LESSONS_16TO20: VocabItem[] = [\n" +
    "\n".join(format_vocab_entries(l) for l in [16, 17, 18, 19, 20]) +
    "\n];\n"
)

with open("lib/n5-lessons-16to20.ts", "w", encoding="utf-8") as f:
    f.write(ts_16to20_code)

# Update lib/n5-lessons-11to15.ts
with open("lib/n5-lessons-11to15.ts", "r", encoding="utf-8") as f:
    orig_11to15 = f.read()

pos_l13 = orig_11to15.find("// LESSON 13")
if pos_l13 != -1:
    header = orig_11to15[:pos_l13].rstrip()
else:
    header = orig_11to15.split("export const N5_LESSONS_11TO15")[0] + "export const N5_LESSONS_11TO15: VocabItem[] = [\n"

ts_13to15_code = header + "\n\n" + "\n".join(format_vocab_entries(l) for l in [13, 14, 15]) + "\n];\n"

with open("lib/n5-lessons-11to15.ts", "w", encoding="utf-8") as f:
    f.write(ts_13to15_code)

print("Regenerated lib/n5-lessons-11to15.ts and lib/n5-lessons-16to20.ts with level: 'N5'!")
