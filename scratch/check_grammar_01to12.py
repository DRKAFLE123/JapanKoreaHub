import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("scratch/docx_lessons_01_12.json", "r", encoding="utf-8") as f:
    docx_data = json.load(f)

with open("lib/n5-grammar-guides.ts", "r", encoding="utf-8") as f:
    grammar_ts = f.read()

print("=== CHECKING GRAMMAR FOR LESSONS 1-12 ===\n")

for lesson in range(1, 13):
    g_list = docx_data[str(lesson)]["grammar"]
    
    # Check if lesson entry exists in TS file
    pattern = rf"lesson:\s*{lesson}\b"
    found_in_ts = bool(re.search(pattern, grammar_ts))
    
    print(f"Lesson {lesson:02d}: DOCX has {len(g_list)} grammar points | In TS file? {'✅ YES' if found_in_ts else '❌ NO'}")
    for gp in g_list:
        title = gp["title"]
        # Check if key phrase from title exists in TS file
        key_phrase = title.split("-")[0].strip()
        matched = key_phrase.lower() in grammar_ts.lower()
        # print(f"    {'✅' if matched else '⚠'} {title[:70]}")

