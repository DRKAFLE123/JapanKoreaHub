import fitz
import os

pdf_path = "public/minna-no-nihongo-i-c3bcbersetzungen-grammatikalische-erklc3a4rungen-englisch.pdf"
doc = fitz.open(pdf_path)

print(f"Total pages: {len(doc)}")

# Let's inspect pages from page 1 to 212:
# In Minna no Nihongo I (English edition):
# Every lesson starts with a vocabulary page.
# Let's write a script that checks each page image by rendering high contrast header crops and searching for numbers!
