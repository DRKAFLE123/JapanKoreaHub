import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Load docx data
with open("scratch/docx_lessons_21_25.json", "r", encoding="utf-8") as f:
    docx_data = json.load(f)

# Load current n5-lessons-21to25.ts to extract existing vocab words
with open("lib/n5-lessons-21to25.ts", "r", encoding="utf-8") as f:
    existing_ts = f.read()

# Extract existing word values from the file
import re
existing_words = set(re.findall(r'"word":\s*"([^"]+)"', existing_ts))
existing_readings = set(re.findall(r'"reading":\s*"([^"]+)"', existing_ts))

print(f"Existing vocab in n5-lessons-21to25.ts: {len(existing_words)} words\n")

print("=== DOCX VOCAB vs EXISTING — COMPARISON ===\n")

for l in range(21, 26):
    docx_vocab = docx_data[str(l)]["vocab"]
    print(f"\nLesson {l} ({len(docx_vocab)} items from DOCX):")
    
    missing_in_ts = []
    for item in docx_vocab:
        jp = item["japanese"]
        rom = item["romaji"]
        eng = item["english"]
        # Check if the reading (hiragana) exists in the file
        found = (jp in existing_words) or (rom in existing_readings) or \
                any(r in existing_ts for r in [jp, rom])
        if not found:
            missing_in_ts.append(item)
        status = "✅" if not missing_in_ts or item not in missing_in_ts else "❌ MISSING"
        print(f"  {status} '{jp}' ({rom}) = {eng}")

print(f"\n\n=== GRAMMAR POINTS FROM DOCX ===\n")
for l in range(21, 26):
    g_list = docx_data[str(l)]["grammar"]
    print(f"\nLesson {l} Grammar ({len(g_list)} points):")
    for gp in g_list:
        print(f"  • {gp['title'][:80]}")
