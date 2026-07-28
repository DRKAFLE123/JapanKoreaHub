import os
from PIL import Image

# Let's inspect pages in scratch/all_pdf_pages to find the exact pages containing "Lesson 13 Vocabulary", "Lesson 14 Vocabulary", etc.
# In Minna no Nihongo I (English edition, 212 pages total):
# Let's write a script that crops the top header & top 30% of each page between page 50 and page 200, and prints/inspects them!

pages_dir = "scratch/all_pdf_pages"
headers_inspect_dir = "scratch/header_inspect_13to20"
os.makedirs(headers_inspect_dir, exist_ok=True)

# Let's crop the top 25% of pages 50 to 180 and check them
for p in range(50, 185):
    img_path = os.path.join(pages_dir, f"page_{p:03d}.jpg")
    if os.path.exists(img_path):
        img = Image.open(img_path)
        w, h = img.size
        header = img.crop((0, 0, w, int(h * 0.25)))
        header.save(os.path.join(headers_inspect_dir, f"p{p:03d}_header.jpg"))

print("Exported headers for pages 50 to 184!")
