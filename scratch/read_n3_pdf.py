import sys

sys.stdout.reconfigure(encoding='utf-8')

# Try importing pdf reading libraries
pdf_text = ""
try:
    import fitz # PyMuPDF
    doc = fitz.open("public/VocabList.N3.pdf")
    print(f"PyMuPDF opened VocabList.N3.pdf successfully! Total pages: {len(doc)}")
    for page_num in range(min(5, len(doc))):
        page = doc[page_num]
        print(f"\n--- PAGE {page_num+1} ---")
        print(page.get_text()[:1000])
except Exception as e:
    print(f"PyMuPDF failed: {e}")
    try:
        from pypdf import PdfReader
        reader = PdfReader("public/VocabList.N3.pdf")
        print(f"pypdf opened VocabList.N3.pdf successfully! Total pages: {len(reader.pages)}")
        for i in range(min(5, len(reader.pages))):
            print(f"\n--- PAGE {i+1} ---")
            print(reader.pages[i].extract_text()[:1000])
    except Exception as e2:
        print(f"pypdf failed: {e2}")

