import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("scratch/formatted_grammar_01to12.json", "r", encoding="utf-8") as f:
    g_01to12 = json.load(f)

# Load current lib/n5-grammar-guides.ts
with open("lib/n5-grammar-guides.ts", "r", encoding="utf-8") as f:
    orig_ts = f.read()

# Find where LESSON 13 starts
l13_pos = orig_ts.find("lesson: 13")
if l13_pos != -1:
    # Go back to the preceding brace '{'
    brace_pos = orig_ts.rfind("{", 0, l13_pos)
    l13_to_25_code = orig_ts[brace_pos:].rstrip()
    if l13_to_25_code.endswith("];"):
        l13_to_25_code = l13_to_25_code[:-2].rstrip()
else:
    print("⚠ COULD NOT FIND LESSON 13 IN TS FILE!")
    sys.exit(1)

# Format Lessons 1-12 as TypeScript objects
ts_objects = []
for item in g_01to12:
    item_json = json.dumps(item, ensure_ascii=False, indent=2)
    # Adjust formatting
    ts_objects.append("  " + item_json.replace("\n", "\n  "))

header = (
    "// ============================================================\n"
    "// MINNA NO NIHONGO JLPT N5 — Complete Grammar Guides (Lessons 1–25)\n"
    "// Official explanations & patterns from Minna no Nihongo I textbook\n"
    "// Full explanations in English & Nepali with pattern rules and examples\n"
    "// ============================================================\n\n"
    "import type { LessonGrammarGuide } from './grammar-guide';\n\n"
    "export const N5_GRAMMAR_GUIDES: LessonGrammarGuide[] = [\n"
)

full_ts = header + ",\n".join(ts_objects) + ",\n\n  " + l13_to_25_code + "\n];\n"

with open("lib/n5-grammar-guides.ts", "w", encoding="utf-8") as f:
    f.write(full_ts)

print("✅ lib/n5-grammar-guides.ts updated with all 71 grammar points for Lessons 1-12!")
