import os

# Let's build a clean HTML index of header images from page 50 to page 180
# So we can easily check the exact PDF page for each Lesson 13 to 20!

headers_dir = "scratch/header_inspect_13to20"
html_content = """<!DOCTYPE html>
<html>
<head>
<title>Header Inspection Pages 50-184</title>
<style>
  body { background: #0f172a; color: white; font-family: sans-serif; padding: 20px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px; }
  .card { background: #1e293b; padding: 10px; border-radius: 8px; text-align: center; }
  .card img { max-width: 100%; border-radius: 4px; }
  .page-num { font-weight: bold; color: #38bdf8; font-size: 14px; margin-bottom: 5px; }
</style>
</head>
<body>
<h1>Minna no Nihongo PDF Header Inspection (Pages 50-184)</h1>
<div class="grid">
"""

for p in range(50, 185):
    img_name = f"p{p:03d}_header.jpg"
    if os.path.exists(os.path.join(headers_dir, img_name)):
        html_content += f"""  <div class="card">
    <div class="page-num">PDF Page {p}</div>
    <img src="../header_inspect_13to20/{img_name}" />
  </div>\n"""

html_content += """</div>
</body>
</html>
"""

with open("scratch/headers_preview.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("Generated scratch/headers_preview.html!")
