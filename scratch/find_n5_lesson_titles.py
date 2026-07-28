import os
from PIL import Image

# Let's inspect the title region (top 200 pixels) of every page from page_001.jpg to page_212.jpg
# We can search for the lesson titles by looking at the page numbers printed in the book or crop the header region for every page.

pages_dir = "scratch/all_pdf_pages"
output_dir = "scratch/lesson_headers_list"
os.makedirs(output_dir, exist_ok=True)

# Save the top header crop (top 200px x 600px) of every page from 1 to 212
for p in range(1, 213):
    img_path = os.path.join(pages_dir, f"page_{p:03d}.jpg")
    if os.path.exists(img_path):
        img = Image.open(img_path)
        w, h = img.size
        # Top-left and top-right area where "LESSON X" or "第 X 課" is printed
        header_left = img.crop((0, 0, int(w * 0.6), int(h * 0.18)))
        header_left.save(os.path.join(output_dir, f"p{p:03d}_top.jpg"))

print("Extracted top header regions for all 212 pages!")
