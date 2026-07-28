import fitz
import os

pdf_path = "public/minna-no-nihongo-i-c3bcbersetzungen-grammatikalische-erklc3a4rungen-englisch.pdf"
doc = fitz.open(pdf_path)

output_dir = "scratch/n5_page_previews"
os.makedirs(output_dir, exist_ok=True)

print(f"Total PDF pages: {len(doc)}")

# Render page 1 to 212 at low resolution (scale 0.5) to check page contents
# Or render top headers to inspect
for page_num in range(len(doc)):
    page = doc[page_num]
    pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5))
    # We can inspect the pages
