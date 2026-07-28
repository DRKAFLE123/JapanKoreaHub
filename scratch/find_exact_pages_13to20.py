import os
from PIL import Image

# Let's inspect the page images in scratch/all_pdf_pages:
# Page range for Minna no Nihongo I (English edition):
# Let's check pages 90 to 170.
# We can analyze the horizontal projections or top header banners.
# Banners for "第 XX 課" have a black/grey background box at the top left or top center!

pages_dir = "scratch/all_pdf_pages"

banner_pages = []

for p in range(50, 185):
    img_path = os.path.join(pages_dir, f"page_{p:03d}.jpg")
    if os.path.exists(img_path):
        img = Image.open(img_path).convert("L")
        w, h = img.size
        # Crop top 10%
        top_crop = img.crop((0, 0, w, int(h * 0.12)))
        # Check dark pixels (text/banners)
        pixels = list(top_crop.getdata())
        dark_pixels = sum(1 for px in pixels if px < 80)
        total_px = len(pixels)
        dark_ratio = dark_pixels / total_px
        
        # Vocab pages usually have a distinct dark header banner or strong header text
        if dark_ratio > 0.05:
            banner_pages.append((p, round(dark_ratio, 3)))

print("Pages with header banners / strong headers:")
for bp, r in banner_pages:
    print(f"Page {bp}: dark ratio {r}")
