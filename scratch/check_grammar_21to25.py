import json
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

with open("scratch/docx_lessons_21_25.json", "r", encoding="utf-8") as f:
    docx_data = json.load(f)

# Check what grammar currently exists in n5-grammar-guides.ts for Lessons 21-25
with open("lib/n5-grammar-guides.ts", "r", encoding="utf-8") as f:
    grammar_ts = f.read()

print("=== GRAMMAR POINTS FROM DOCX ===\n")
for l in range(21, 26):
    g_list = docx_data[str(l)]["grammar"]
    print(f"\nLesson {l} Grammar ({len(g_list)} points from DOCX):")
    for gp in g_list:
        print(f"  • {gp['title'][:100]}")
        print(f"    EX: {gp['examples'][:100]}")

print("\n=== SEARCHING EXISTING GRAMMAR FILE FOR L21-25 ===\n")
# Find if lesson 21-25 grammar exists
for l in range(21, 26):
    keyword = f"lesson: {l}"
    count = grammar_ts.lower().count(keyword)
    print(f"Lesson {l} grammar entries in ts file: {count}")
    
print("\nFile length:", len(grammar_ts), "chars")
print("First 200 chars:", grammar_ts[:200])
