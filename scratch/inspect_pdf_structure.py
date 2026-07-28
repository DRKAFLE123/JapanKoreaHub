import fitz

pdf_path = "public/minna-no-nihongo-i-c3bcbersetzungen-grammatikalische-erklc3a4rungen-englisch.pdf"
doc = fitz.open(pdf_path)

print(f"Total PDF pages: {len(doc)}")

for i in range(min(15, len(doc))):
    text = doc[i].get_text().strip()
    images = doc[i].get_images()
    print(f"--- Page {i + 1} --- (text len: {len(text)}, images count: {len(images)})")
    if text:
        print(text[:200].replace('\n', ' '))
