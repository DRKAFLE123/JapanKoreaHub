import fitz
import os

pdf_path = "public/minna-no-nihongo-i-c3bcbersetzungen-grammatikalische-erklc3a4rungen-englisch.pdf"
doc = fitz.open(pdf_path)

# Let's check pages 130 to 155 in detail
print("Inspecting page numbers & headers around Lessons 18, 19, 20...")

for p in range(125, 155):
    page = doc[p - 1]
    # Render top 250 pixels
    rect = page.rect
    clip = fitz.Rect(0, 0, rect.width, 180)
    pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5), clip=clip)
    out_file = f"scratch/header_p{p}.jpg"
    pix.save(out_file)
    print(f"Saved PDF Page {p} header to scratch/header_p{p}.jpg")
