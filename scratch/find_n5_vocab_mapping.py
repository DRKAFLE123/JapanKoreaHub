import os
import shutil
from PIL import Image

# Let's inspect the images in scratch/all_pdf_pages
pages = sorted([f for f in os.listdir("scratch/all_pdf_pages") if f.endswith(".jpg")])
print(f"Total page images available: {len(pages)}")

# Let's check page ranges or crop top headers to find the exact starting page of each Lesson (1 to 25)
# In Minna no Nihongo I 212-page PDF:
# Let's inspect pages from page_005.jpg onwards.
# We can create a visual collage or inspect crops of the top header area of each page to find the "第 1 課", "第 2 課"... "第 25 課" headers!

output_dir = "public/N5-1-25-vocab"
os.makedirs(output_dir, exist_ok=True)

# Let's write a python script that crops the top 12% of each page and saves it into scratch/headers/
headers_dir = "scratch/headers"
os.makedirs(headers_dir, exist_ok=True)

for p in pages:
    p_path = os.path.join("scratch/all_pdf_pages", p)
    img = Image.open(p_path)
    w, h = img.size
    header_crop = img.crop((0, 0, w, int(h * 0.15)))
    header_crop.save(os.path.join(headers_dir, p))

print("Header crops created in scratch/headers!")
