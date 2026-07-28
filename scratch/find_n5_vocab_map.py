import fitz
import os

pdf_path = "public/minna-no-nihongo-i-c3bcbersetzungen-grammatikalische-erklc3a4rungen-englisch.pdf"
doc = fitz.open(pdf_path)

# Let's inspect the page structure of Minna no Nihongo I Translation & Grammar Notes:
# Total pages: 212
# Lesson 1 to Lesson 25 span pages 8 to 210.
# Each lesson starts with:
# Page 1 of Lesson: I. VOCABULARY (Full page vocabulary list)
# Page 2 of Lesson: II. TRANSLATION (Sentence patterns, Example sentences, Conversation)
# Page 3+ of Lesson: III. GRAMMAR NOTES

# Let's check page 8, 14, 20, 26... etc. to confirm the page numbers for Lesson 1 to 25!

# Let's render pages 1 to 212 into high quality JPEGs (DPI 150 -> scale 2.08) for public/N5-1-25-vocab/
output_dir = "public/N5-1-25-vocab"
os.makedirs(output_dir, exist_ok=True)

# Let's list all pages and check where "Lesson" headers are located.
print("Extracting page titles and headers...")

# Let's render all 212 pages into scratch/pages/ to inspect or map them
pages_dir = "scratch/all_pdf_pages"
os.makedirs(pages_dir, exist_ok=True)

for i in range(len(doc)):
    page = doc[i]
    # Matrix 1.5 gives clear high resolution
    pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5))
    pix.save(f"{pages_dir}/page_{i+1:03d}.jpg")

print(f"Rendered all {len(doc)} pages to {pages_dir}!")
