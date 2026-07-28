import os
import fitz

# Let's inspect the exact PDF pages for Lessons 13 to 20:
# In Minna no Nihongo I (English edition, 212 pages):
# Let's check page range 85 to 160:
# Page 92: Lesson 13 Vocabulary
# Page 98: Lesson 14 Vocabulary
# Page 106: Lesson 15 Vocabulary
# Page 112: Lesson 16 Vocabulary
# Page 120: Lesson 17 Vocabulary
# Page 126: Lesson 18 Vocabulary
# Page 134: Lesson 19 Vocabulary
# Page 140: Lesson 20 Vocabulary

# Wait! Let's check PDF page 140 vs PDF page 148:
# PDF page 140: Lesson 19 or Lesson 20?
# Let's verify by inspecting PDF page 134, 140, 148!

doc = fitz.open("public/minna-no-nihongo-i-c3bcbersetzungen-grammatikalische-erklc3a4rungen-englisch.pdf")

print("PDF Page 134 size:", doc[133].rect) # 0-indexed
print("PDF Page 140 size:", doc[139].rect)
print("PDF Page 148 size:", doc[147].rect)
