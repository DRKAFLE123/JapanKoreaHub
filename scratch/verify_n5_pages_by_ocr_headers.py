import fitz
import os
import re

pdf_path = "public/minna-no-nihongo-i-c3bcbersetzungen-grammatikalische-erklc3a4rungen-englisch.pdf"
doc = fitz.open(pdf_path)

# Let's write a python script that will check page layout and find exact page for each Lesson 13 to 20!
# We will inspect the header images saved in scratch/header_p*.jpg

print("Scanning headers from scratch/header_p*.jpg...")

# Let's inspect pages around Lesson 13 to Lesson 20:
# We rendered headers into scratch/header_p{N}.jpg
# Let's check which page contains Lesson 13, 14, 15, 16, 17, 18, 19, 20!

# Let's write a python script that extracts the exact title box of pages 80 to 160 and checks their dimensions/layout.
lesson_map_13_20 = {}

for p in range(80, 160):
    page = doc[p - 1]
    # Check if page starts with Vocabulary list:
    # In Minna no Nihongo English translation book:
    # Each lesson starts with "I. VOCABULARY" or "Vocabulary"
    # Let's render the top 25% of the page into a crisp image
    clip = fitz.Rect(0, 0, page.rect.width, page.rect.height * 0.25)
    pix = page.get_pixmap(matrix=fitz.Matrix(2.0, 2.0), clip=clip)
    pix.save(f"scratch/header_crop_p{p}.jpg")

print("Created header crops for pages 80 to 159!")
