import os
from PIL import Image

# Let's check the size / features of pages or analyze where vocabulary pages are located.
# Vocabulary pages in Minna no Nihongo I (English edition):
# They have a clear "第 1 課" ... "第 25 課" title at top left or top right, and VOCABULARY column.
# Let's print out the file names and inspect a few key pages (e.g., page 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160, 168, 176, 184, 192, 200).

# Let's check page numbers for Minna no Nihongo I:
# Typically, each lesson occupies:
# Lesson 1: Pages 8-13 (Vocab on Page 8)
# Lesson 2: Pages 14-19 (Vocab on Page 14)
# Lesson 3: Pages 20-25 (Vocab on Page 20)
# Lesson 4: Pages 26-31 (Vocab on Page 26)
# Lesson 5: Pages 32-37 (Vocab on Page 32)
# Lesson 6: Pages 38-43 (Vocab on Page 38)
# Lesson 7: Pages 44-49 (Vocab on Page 44)
# Lesson 8: Pages 50-55 (Vocab on Page 50)
# Lesson 9: Pages 56-61 (Vocab on Page 56)
# Lesson 10: Pages 62-67 (Vocab on Page 62)
# Lesson 11: Pages 68-73 (Vocab on Page 68)
# Lesson 12: Pages 74-79 (Vocab on Page 74)
# Lesson 13: Pages 80-85 (Vocab on Page 80)
# Lesson 14: Pages 86-91 (Vocab on Page 86)
# Lesson 15: Pages 92-97 (Vocab on Page 92)
# Lesson 16: Pages 98-103 (Vocab on Page 98)
# Lesson 17: Pages 104-109 (Vocab on Page 104)
# Lesson 18: Pages 110-115 (Vocab on Page 110)
# Lesson 19: Pages 116-121 (Vocab on Page 116)
# Lesson 20: Pages 122-127 (Vocab on Page 122)
# Lesson 21: Pages 128-133 (Vocab on Page 128)
# Lesson 22: Pages 134-139 (Vocab on Page 134)
# Lesson 23: Pages 140-145 (Vocab on Page 140)
# Lesson 24: Pages 146-151 (Vocab on Page 146)
# Lesson 25: Pages 152-157 (Vocab on Page 152)

# Let's verify these pages by writing a script that copies the exact page for each lesson to public/N5-1-25-vocab/lesson{N}.jpg
