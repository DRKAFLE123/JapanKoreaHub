import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("scratch/docx_lessons_01_12.json", "r", encoding="utf-8") as f:
    docx_data = json.load(f)

# Load lib/n5-grammar-guides.ts
with open("lib/n5-grammar-guides.ts", "r", encoding="utf-8") as f:
    grammar_ts = f.read()

# Let's inspect the grammar points per lesson in the TS file
print("=== DETAILED GRAMMAR CHECK: DOCX VS TS FILE (LESSONS 1-12) ===\n")

missing_grammar_count = 0
total_grammar_count = 0

for lesson in range(1, 13):
    docx_gp = docx_data[str(lesson)]["grammar"]
    total_grammar_count += len(docx_gp)
    print(f"\n--- LESSON {lesson} ({len(docx_gp)} grammar points in DOCX) ---")
    
    for idx, gp in enumerate(docx_gp, 1):
        title = gp["title"]
        # Extract main pattern keyword (e.g., "N1は N2です", "これ／それ／あれ", etc.)
        match_key = re.sub(r'^\d+\.\s*', '', title).split('-')[0].strip()
        
        # Search in TS file
        found = match_key[:15].lower() in grammar_ts.lower()
        if not found:
            # try searching with first 8 chars
            found = match_key[:8].lower() in grammar_ts.lower()
            
        status = "✅" if found else "❌ MISSING"
        if not found:
            missing_grammar_count += 1
        print(f"  {idx}. {status} DOCX: '{title[:65]}'")

print(f"\nSummary: {total_grammar_count - missing_grammar_count}/{total_grammar_count} grammar points found in TS file.")
