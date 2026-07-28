import fitz
import os

doc = fitz.open("public/minna-no-nihongo-i-c3bcbersetzungen-grammatikalische-erklc3a4rungen-englisch.pdf")

# Let's save full page renders of pages 90 to 180 specifically for Lessons 13 to 20:
# Let's check candidate pages for Lessons 13-20:
# Lesson 13: PDF Page 92
# Lesson 14: PDF Page 98
# Lesson 15: PDF Page 106
# Lesson 16: PDF Page 112
# Lesson 17: PDF Page 120
# Lesson 18: PDF Page 126
# Lesson 19: PDF Page 134
# Lesson 20: PDF Page 148 (PDF Page 140 was Lesson 19 continuation / section, so Page 148 is Lesson 20!)

print("Writing exact N5 Lessons 13-20 scanned images...")

output_dir = "public/N5-1-25-vocab"
os.makedirs(output_dir, exist_ok=True)

# Exact PDF Page mapping for Lessons 13 to 20:
lesson_pdf_pages_13to20 = {
    13: 92,
    14: 98,
    15: 106,
    16: 112,
    17: 120,
    18: 126,
    19: 134,
    20: 148
}

for lesson, pdf_page in lesson_pdf_pages_13to20.items():
    page_idx = pdf_page - 1
    page = doc[page_idx]
    pix = page.get_pixmap(matrix=fitz.Matrix(2.0, 2.0))
    out_path = os.path.join(output_dir, f"lesson{lesson}.jpg")
    pix.save(out_path)
    print(f"Generated Lesson {lesson} scanned vocabulary sheet from PDF Page {pdf_page} -> {out_path}")

print("Done updating Lessons 13-20 scanned sheets!")
