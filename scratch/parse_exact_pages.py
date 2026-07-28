import sys
import os
import re
import easyocr

sys.stdout.reconfigure(encoding='utf-8')

reader = easyocr.Reader(['en', 'ja'], gpu=False)

headers_dir = "scratch/vocab_headers_13_20"
files = sorted([f for f in os.listdir(headers_dir) if f.endswith("_header.jpg")])

print(f"Scanning {len(files)} header images...")

for f in files:
    page_num = int(f.replace("page_", "").replace("_header.jpg", ""))
    img_path = os.path.join(headers_dir, f)
    result = reader.readtext(img_path, detail=0)
    text_combined = " ".join(result)
    
    # Check if this header contains Lesson number or Vocabulary keyword
    if "lesson" in text_combined.lower() or "第" in text_combined or "語彙" in text_combined or "vocab" in text_combined.lower():
        print(f"PDF Page {page_num}: '{text_combined}'")

