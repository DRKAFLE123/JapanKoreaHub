import fitz
import os

pdf_path = "public/minna-no-nihongo-i-c3bcbersetzungen-grammatikalische-erklc3a4rungen-englisch.pdf"
doc = fitz.open(pdf_path)

output_dir = "public/N5-1-25-vocab"
os.makedirs(output_dir, exist_ok=True)

# In Minna no Nihongo I (Translations & Grammar Notes, 212 pages):
# Let's map each Lesson (1 to 25) to its primary vocabulary page in the PDF.
# PDF page numbers (1-indexed):
lesson_page_numbers = {
    1: 8,
    2: 14,
    3: 22,
    4: 28,
    5: 36,
    6: 42,
    7: 50,
    8: 56,
    9: 64,
    10: 70,
    11: 78,
    12: 84,
    13: 92,
    14: 98,
    15: 106,
    16: 112,
    17: 120,
    18: 126,
    19: 134,
    20: 140,
    21: 148,
    22: 154,
    23: 162,
    24: 168,
    25: 176
}

for lesson, pdf_page in lesson_page_numbers.items():
    page_idx = pdf_page - 1 # 0-indexed
    if page_idx < len(doc):
        page = doc[page_idx]
        # Matrix 2.0 provides crisp 150-200 DPI scan quality
        pix = page.get_pixmap(matrix=fitz.Matrix(2.0, 2.0))
        out_path = os.path.join(output_dir, f"lesson{lesson}.jpg")
        pix.save(out_path)
        print(f"Saved Lesson {lesson} scanned sheet from PDF page {pdf_page} -> {out_path}")

print("\nSuccessfully generated all 25 scanned textbook vocabulary sheets in public/N5-1-25-vocab!")
