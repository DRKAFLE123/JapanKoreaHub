import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Load N3_MASTER_SYLLABUS data from generated python object or parse lib/n3-master-syllabus.ts
with open("lib/n3-master-syllabus.ts", "r", encoding="utf-8") as f:
    ts_code = f.read()

# Extract json block from N3_MASTER_SYLLABUS
start_pos = ts_code.find("export const N3_MASTER_SYLLABUS: N3MasterChapter[] = [")
json_str = ts_code[start_pos + len("export const N3_MASTER_SYLLABUS: N3MasterChapter[] = ["):-2].strip()

sys.path.append('.')
from scratch.build_n3_master_syllabus import chapters_data

all_n3_vocab = []
all_n3_grammar_guides = []

for ch in chapters_data:
    ch_num = ch["chapterNumber"]
    lesson_id = 50 + ch_num
    
    # Vocab items
    for idx, v in enumerate(ch["vocab"], 1):
        all_n3_vocab.append({
            "id": f"N3-CH{ch_num:02d}-{idx:03d}",
            "lesson": lesson_id,
            "level": "N3",
            "word": v["word"],
            "reading": v["reading"],
            "meaning": v["meaning"],
            "meaningNepali": v["meaningNepali"],
            "kanjiCharacters": v["kanji"],
            "partOfSpeech": v["pos"],
            "grammarSentences": [
                {
                    "japanese": f"{v['word']}を使います。",
                    "reading": f"{v['reading']}をつかいます。",
                    "english": f"Use {v['meaning']}.",
                    "nepali": f"उदाहरण: {v['meaningNepali']}।"
                }
            ]
        })
        
    # Grammar Guide Item
    all_n3_grammar_guides.append({
        "language": "JAPANESE",
        "level": "N3",
        "lesson": lesson_id,
        "lessonTitle": f"Chapter {ch_num}: {ch['title']} ({ch['titleJapanese']})",
        "grammarPoints": ch["grammar"]
    })

# Update lib/nihongo-vocab.ts
with open("lib/nihongo-vocab.ts", "r", encoding="utf-8") as f:
    v_code = f.read()

# Remove old N3 syllabus entries if present
v_code = re.sub(r'  \{\s*"id": "N3-CH.*?\n', '', v_code)

array_close = v_code.rfind("];\n\nexport function getVocabByLevel")
if array_close != -1:
    v_items_json = ",\n".join("  " + json.dumps(item, ensure_ascii=False) for item in all_n3_vocab)
    new_v_code = v_code[:array_close].rstrip() + ",\n\n  // ════════════════════════════════════════════════════════\n  // N3 MASTER SYLLABUS VOCABULARY (CHAPTERS 1-12)\n  // ════════════════════════════════════════════════════════\n" + v_items_json + "\n" + v_code[array_close:]
    with open("lib/nihongo-vocab.ts", "w", encoding="utf-8") as f:
        f.write(new_v_code)
    print("✅ lib/nihongo-vocab.ts updated with N3 Master Syllabus Vocabulary!")

# Update lib/grammar-guide.ts
with open("lib/grammar-guide.ts", "r", encoding="utf-8") as f:
    g_code = f.read()

# Remove old N3 syllabus entries if present
g_code = re.sub(r'  \{\s*"language": "JAPANESE",\s*"level": "N3",\s*"lesson": 5.*?\n  \},?\n', '', g_code, flags=re.DOTALL)

korean_pos = g_code.find("// KOREAN GRAMMAR LESSONS")
if korean_pos != -1:
    array_close = g_code.rfind("];", 0, korean_pos)
    g_items_json = ",\n".join("  " + json.dumps(item, ensure_ascii=False, indent=2).replace("\n", "\n  ") for item in all_n3_grammar_guides)
    new_g_code = g_code[:array_close].rstrip() + ",\n\n  // ════════════════════════════════════════════════════════\n  // N3 MASTER SYLLABUS GRAMMAR GUIDES (CHAPTERS 1-12)\n  // ════════════════════════════════════════════════════════\n" + g_items_json + "\n" + g_code[array_close:]
    with open("lib/grammar-guide.ts", "w", encoding="utf-8") as f:
        f.write(new_g_code)
    print("✅ lib/grammar-guide.ts updated with N3 Master Syllabus Grammar Guides!")

