import fitz
import re
import os

pdf_path = "public/minna-no-nihongo-i-c3bcbersetzungen-grammatikalische-erklc3a4rungen-englisch.pdf"
doc = fitz.open(pdf_path)

print(f"Total PDF pages: {len(doc)}")

lesson_pages = {}

for page_idx in range(len(doc)):
    page = doc[page_idx]
    text = page.get_text()
    
    # Search for patterns like "第1課" or "第 1 課" or "Lesson 1" or "第 1課 Vocabulary"
    # Or "第1課" / "1課" / "Lesson 1"
    matches = re.findall(r"(?:第\s*(\d+)\s*課|Lesson\s*(\d+)|第\s*(\d+)\s*課\s*語彙|CHAPTER\s*(\d+))", text, re.IGNORECASE)
    for m in matches:
        num_str = next(c for c in m if c)
        num = int(num_str)
        if 1 <= num <= 25:
            # Check if this page contains vocabulary items or header
            if "Vocabulary" in text or "語彙" in text or "わたし" in text or "あなた" in text or "単語" in text or "I. Vocabulary" in text:
                if num not in lesson_pages:
                    lesson_pages[num] = page_idx
                    print(f"Found Lesson {num} on PDF page {page_idx + 1}")

print("\nDiscovered Lesson pages:", sorted(lesson_pages.items()))
