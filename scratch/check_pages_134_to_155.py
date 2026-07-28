import fitz
import os

pdf_path = "public/minna-no-nihongo-i-c3bcbersetzungen-grammatikalische-erklc3a4rungen-englisch.pdf"
doc = fitz.open(pdf_path)

# Let's inspect PDF pages 120 to 160 one by one!
# Let's crop the top 20% of each page and save them in scratch/inspect_pages_120_160/

out_dir = "scratch/inspect_pages_120_160"
os.makedirs(out_dir, exist_ok=True)

for p_num in range(120, 165):
    page = doc[p_num - 1]
    pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5))
    out_file = os.path.join(out_dir, f"pdf_page_{p_num:03d}.jpg")
    pix.save(out_file)

print("Saved PDF pages 120 to 164 for inspection!")
