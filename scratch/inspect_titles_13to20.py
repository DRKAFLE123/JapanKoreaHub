import fitz
import os

pdf_path = "public/minna-no-nihongo-i-c3bcbersetzungen-grammatikalische-erklc3a4rungen-englisch.pdf"
doc = fitz.open(pdf_path)

# Let's save high-res title crops of candidate pages:
candidate_pages = [90, 91, 92, 97, 98, 105, 106, 111, 112, 119, 120, 125, 126, 133, 134, 139, 140, 147, 148]

out_dir = "scratch/candidate_titles"
os.makedirs(out_dir, exist_ok=True)

for p in candidate_pages:
    page = doc[p - 1]
    clip = fitz.Rect(0, 0, page.rect.width * 0.5, page.rect.height * 0.15)
    pix = page.get_pixmap(matrix=fitz.Matrix(2.0, 2.0), clip=clip)
    pix.save(os.path.join(out_dir, f"p{p:03d}_title.jpg"))

print("Saved candidate title crops!")
