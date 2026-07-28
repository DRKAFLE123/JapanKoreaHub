import fitz
import os

pdf_path = "public/minna-no-nihongo-i-c3bcbersetzungen-grammatikalische-erklc3a4rungen-englisch.pdf"
doc = fitz.open(pdf_path)

output_dir = "public/N5-1-25-vocab"
os.makedirs(output_dir, exist_ok=True)

print(f"Total pages in PDF: {len(doc)}")

# Let's inspect pages from page 1 to page 212 and see how chapters/lessons are structured in Minna no Nihongo I
# In Minna no Nihongo I (212 pages total):
# Usually:
# Table of contents / Intro: Pages 1-10
# Lesson 1 vocabulary: around page 12
# Lesson 2 vocabulary: around page 18
# ...
# Let's save a preview of pages 10 to 200 or extract images directly to inspect!

try:
    import pytesseract
    from PIL import Image
    has_tesseract = True
    print("pytesseract is available!")
except Exception as e:
    has_tesseract = False
    print("pytesseract is not installed:", e)

# If no pytesseract, let's render pages at matrix(1.5, 1.5) to check page text via pytesseract if available, or map page ranges!
lesson_page_map = {}

# In standard Minna no Nihongo I Translation & Grammar Notes (212 pages):
# Each lesson is typically 6-8 pages long:
# Page 1 of lesson = VOCABULARY SHEET (Vocabulary words & translations)
# Page 2-6 of lesson = Grammar Notes
