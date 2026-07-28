import os
from PIL import Image, ImageDraw, ImageFont

pages_dir = "scratch/all_pdf_pages"
output_dir = "scratch/collages"
os.makedirs(output_dir, exist_ok=True)

# Create grid collages of 6 pages per image (2 cols x 3 rows) with page numbers printed clearly on top
page_files = [f"page_{p:03d}.jpg" for p in range(1, 213)]

for chunk_idx in range(0, len(page_files), 6):
    chunk = page_files[chunk_idx:chunk_idx+6]
    collage = Image.new('RGB', (1200, 1600), (30, 30, 30))
    draw = ImageDraw.Draw(collage)
    
    for idx, pf in enumerate(chunk):
        p_num = chunk_idx + idx + 1
        p_path = os.path.join(pages_dir, pf)
        if os.path.exists(p_path):
            img = Image.open(p_path)
            img.thumbnail((580, 500))
            col = idx % 2
            row = idx // 2
            x = col * 600 + 10
            y = row * 520 + 30
            collage.paste(img, (x, y))
            draw.text((x + 10, y - 25), f"PDF PAGE {p_num}", fill=(255, 255, 0))
            
    collage.save(os.path.join(output_dir, f"collage_{chunk_idx+1:03d}_to_{chunk_idx+len(chunk):03d}.jpg"))

print(f"Created collages in {output_dir}!")
