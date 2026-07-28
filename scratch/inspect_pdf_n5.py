import sys

try:
    import fitz # PyMuPDF
    print("PyMuPDF (fitz) is available!")
except ImportError:
    print("fitz is not available")

try:
    import pypdf
    print("pypdf is available!")
except ImportError:
    print("pypdf is not available")

try:
    from pdf2image import convert_from_path
    print("pdf2image is available!")
except ImportError:
    print("pdf2image is not available")
