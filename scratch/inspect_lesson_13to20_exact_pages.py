import fitz
import os
import re

# Let's inspect the page headers from page 90 to page 180 to locate the EXACT vocabulary list page for each Lesson 13 to 20!
pdf_path = "public/minna-no-nihongo-i-c3bcbersetzungen-grammatikalische-erklc3a4rungen-englisch.pdf"
doc = fitz.open(pdf_path)

# In Minna no Nihongo I (Translations & Grammar Notes, 212 pages total):
# Let's check page ranges around 90 - 180:
# Let's check which page contains the word "I. Vocabulary" or "VOCABULARY" or Japanese word lists!

# We can search by extracting text blocks or checking page header images!
# Let's write a script that checks each PDF page between 90 and 180 and crops the top 15% header to check them.

out_dir = "scratch/vocab_headers_13_20"
os.makedirs(out_dir, exist_ok=True)

# Save high-res top headers of pages 90 to 180
for p in range(90, 180):
    page = doc[p - 1] # 0-indexed
    # Crop top 20%
    rect = page.rect
    header_rect = fitz.Rect(0, 0, rect.width, rect.height * 0.22)
    pix = page.get_pixmap(matrix=fitz.Matrix(2.0, 2.0), clip=header_rect)
    pix.save(os.path.join(out_dir, f"page_{p:03d}_header.jpg"))

print("Extracted top headers for pages 90 to 179!")
