import fitz

doc = fitz.open("public/minna-no-nihongo-i-c3bcbersetzungen-grammatikalische-erklc3a4rungen-englisch.pdf")

# Let's save PDF page 140, page 141, page 147, page 148 top headers to inspect
out_files = [134, 135, 140, 141, 147, 148]

for p in out_files:
    page = doc[p - 1]
    clip = fitz.Rect(0, 0, page.rect.width, page.rect.height * 0.25)
    pix = page.get_pixmap(matrix=fitz.Matrix(2.0, 2.0), clip=clip)
    pix.save(f"scratch/check_header_p{p}.jpg")
    print(f"Saved scratch/check_header_p{p}.jpg")
