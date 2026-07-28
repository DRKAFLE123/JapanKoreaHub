import os
import re
import easyocr

reader = easyocr.Reader(['en', 'ja'], gpu=False)

headers_dir = "scratch/lesson_headers_list"
files = sorted([f for f in os.listdir(headers_dir) if f.endswith("_top.jpg")])

lesson_map = {}

print(f"Scanning {len(files)} header images...")

for f in files:
    page_num = int(f.replace("p", "").replace("_top.jpg", ""))
    img_path = os.path.join(headers_dir, f)
    result = reader.readtext(img_path, detail=0)
    text_combined = " ".join(result)
    
    # Match "LESSON 13" or "第13課" or "LESSON 1" etc.
    match = re.search(r"(?:LESSON|第)\s*(\d{1,2})", text_combined, re.IGNORECASE)
    if match:
        les_num = int(match.group(1))
        if 1 <= les_num <= 25:
            # If "VOCABULARY" or "Vocabulary" or "語彙" or "I. Vocabulary" or "1. Vocabulary" is in header/text
            if "vocab" in text_combined.lower() or "語彙" in text_combined or "1." in text_combined or "i." in text_combined.lower():
                if les_num not in lesson_map:
                    lesson_map[les_num] = page_num
                    print(f"✅ FOUND Lesson {les_num} Vocabulary on PDF Page {page_num}: text='{text_combined}'")

print("\nFinal Lesson Vocabulary PDF Page Mapping:")
for l in sorted(lesson_map.keys()):
    print(f"Lesson {l}: PDF Page {lesson_map[l]}")
