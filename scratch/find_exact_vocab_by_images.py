import fitz
import os
from PIL import Image

pdf_path = "public/minna-no-nihongo-i-c3bcbersetzungen-grammatikalische-erklc3a4rungen-englisch.pdf"
doc = fitz.open(pdf_path)

# Let's inspect pages from page 90 to page 170.
# Each page in this PDF has 1 main image object.
# Let's check image dimensions and properties of each page from page 90 to 170:
print("Inspecting page image properties...")
for p in range(90, 170):
    page = doc[p - 1]
    img_list = page.get_images()
    if img_list:
        xref = img_list[0][0]
        base_image = doc.extract_image(xref)
        w, h = base_image["width"], base_image["height"]
        # print(f"PDF Page {p}: image xref {xref}, size {w}x{h}, ext {base_image['ext']}")

print("Extracted page image info successfully!")
