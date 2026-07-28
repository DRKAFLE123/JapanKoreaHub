import fitz
from PIL import Image
import os

pdf_path = "public/minna-no-nihongo-i-c3bcbersetzungen-grammatikalische-erklc3a4rungen-englisch.pdf"
doc = fitz.open(pdf_path)

# Let's save small thumbnails of pages 1 to 212 in a temporary folder or check their dimensions
print(f"Loaded PDF with {len(doc)} pages.")

# Let's inspect page 1-12 to locate Lesson 1 vocabulary sheet page number
# In Minna no Nihongo I (English edition):
# Table of contents is usually around page 4-6.
# Let's write a script that crops the top-left area (where Lesson number is located) of every 5th page to find the exact page offset!

for p in range(0, len(doc), 4):
    page = doc[p]
    pix = page.get_pixmap(matrix=fitz.Matrix(0.6, 0.6))
    img_path = f"scratch/preview_p{p+1}.jpg"
    pix.save(img_path)

print("Saved preview thumbnails!")
