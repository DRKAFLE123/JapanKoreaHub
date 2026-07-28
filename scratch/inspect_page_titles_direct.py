import os
from PIL import Image

pages_dir = "scratch/pdf_pages_90_to_160"
output_dir = "scratch/header_titles"
os.makedirs(output_dir, exist_ok=True)

# Crop the title box of pages 90 to 160
for p in range(90, 160):
    img_path = os.path.join(pages_dir, f"page_{p:03d}.jpg")
    if os.path.exists(img_path):
        img = Image.open(img_path)
        w, h = img.size
        title_box = img.crop((0, 0, int(w * 0.45), int(h * 0.12)))
        title_box.save(os.path.join(output_dir, f"p{p:03d}_title.jpg"))

print("Extracted title boxes for pages 90 to 159!")
