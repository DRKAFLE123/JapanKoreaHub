import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("scratch/docx_lessons_01_12.json", "r", encoding="utf-8") as f:
    docx_data = json.load(f)

for lesson in range(1, 13):
    items = docx_data[str(lesson)]["vocab"]
    print(f"=== LESSON {lesson} ({len(items)} items) ===")
    for idx, item in enumerate(items, 1):
        kana = item["kana"]
        kanji = item["kanji"]
        romaji = item["romaji"]
        eng = item["english"]
        print(f"  {idx:02d}. Kana: '{kana}' | Kanji: '{kanji}' | Romaji: '{romaji}' | Eng: '{eng}'")

