import re, json

with open("lib/nihongo-vocab.ts", "r", encoding="utf-8") as f:
    code = f.read()

# Extract NIHONGO_VOCAB_DATA items
items_start = code.find("export const NIHONGO_VOCAB_DATA: VocabItem[] = [")
items_end = code.find("];\n\nexport function getVocabByLevel")

n4_items = []
for line in code[items_start:items_end].splitlines():
    line = line.strip()
    if line.startswith("{") and ('"level": "N4"' in line or "'N4'" in line):
        if line.endswith(","):
            line = line[:-1]
        try:
            obj = json.loads(line)
            n4_items.append(obj)
        except Exception:
            pass

print("Total N4 Vocabulary Items parsed:", len(n4_items))

with_kanji = [item for item in n4_items if item.get("kanjiCharacters") and len(item["kanjiCharacters"]) > 0]
without_kanji = [item for item in n4_items if not item.get("kanjiCharacters") or len(item["kanjiCharacters"]) == 0]

print(f"Items WITH Kanji: {len(with_kanji)}")
print(f"Items WITHOUT Kanji (Kana / Katakana / Expressions): {len(without_kanji)}")

print("\nSample Without Kanji items:")
for item in without_kanji[:10]:
    word = item.get('word', '')
    meaning = item.get('meaning', '')
    print(f" - Lesson {item.get('lesson')}: {meaning}")
