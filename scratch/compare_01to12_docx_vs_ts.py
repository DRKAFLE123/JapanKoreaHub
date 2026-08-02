import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("scratch/docx_lessons_01_12.json", "r", encoding="utf-8") as f:
    docx_data = json.load(f)

# Load existing TS files
ts_files = {
    "1to5": "lib/n5-lessons-1to5.ts",
    "6to10": "lib/n5-lessons-6to10.ts",
    "11to15": "lib/n5-lessons-11to15.ts",
}

ts_contents = {}
for key, path in ts_files.items():
    with open(path, "r", encoding="utf-8") as f:
        ts_contents[key] = f.read()

print("=== CHECKING VOCABULARY IN TS FILES vs DOCX ===")

for lesson in range(1, 13):
    docx_vocab = docx_data[str(lesson)]["vocab"]
    key = "1to5" if lesson <= 5 else ("6to10" if lesson <= 10 else "11to15")
    content = ts_contents[key]
    
    # Match count of items in ts file for this lesson
    # Count occurrences of lesson: lesson or lesson: <l>
    lesson_pattern = rf"lesson:\s*{lesson}\b"
    count_in_ts = len(re.findall(lesson_pattern, content))
    
    print(f"\nLesson {lesson}: DOCX has {len(docx_vocab)} items | TS file has {count_in_ts} items")
    
    # Check sample items
    missing = []
    for item in docx_vocab:
        kana = item["kana"]
        kanji = item["kanji"]
        eng = item["english"]
        # Check if kana or kanji is in TS content
        if kana not in content and (not kanji or kanji not in content):
            missing.append(item)
    
    if missing:
        print(f"  ⚠ {len(missing)} items missing or different in TS file:")
        for m in missing[:5]:
            print(f"    - '{m['kana']}' / '{m['kanji']}' ({m['romaji']}) = {m['english']}")

