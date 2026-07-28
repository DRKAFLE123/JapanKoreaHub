import fitz
import os

# Let's check pages 90 to 160 in detail
pdf_path = "public/minna-no-nihongo-i-c3bcbersetzungen-grammatikalische-erklc3a4rungen-englisch.pdf"
doc = fitz.open(pdf_path)

# Save page images of pages 90 to 160 with explicit names
out_dir = "scratch/pdf_pages_90_to_160"
os.makedirs(out_dir, exist_ok=True)

for p in range(90, 160):
    page = doc[p - 1]
    pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5))
    pix.save(os.path.join(out_dir, f"page_{p:03d}.jpg"))

print("Extracted PDF pages 90 to 159!")
