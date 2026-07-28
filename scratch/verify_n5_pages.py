import os
import shutil

# Let's inspect the headers in scratch/headers to verify exact page numbers for Lessons 1-25.
# Let's write a script that checks pages and creates public/N5-1-25-vocab/lesson1.jpg to lesson25.jpg!

# Let's check page candidates for each lesson in Minna no Nihongo I (212 pages edition):
# In standard Minna no Nihongo I Translation & Grammar Notes:
# Cover / Intro: Pages 1-7
# Lesson 1 Vocab: Page 8
# Lesson 2 Vocab: Page 14
# Lesson 3 Vocab: Page 22
# Lesson 4 Vocab: Page 28
# Lesson 5 Vocab: Page 36
# Lesson 6 Vocab: Page 42
# Lesson 7 Vocab: Page 50
# Lesson 8 Vocab: Page 56
# Lesson 9 Vocab: Page 64
# Lesson 10 Vocab: Page 70
# Lesson 11 Vocab: Page 78
# Lesson 12 Vocab: Page 84
# Lesson 13 Vocab: Page 92
# Lesson 14 Vocab: Page 98
# Lesson 15 Vocab: Page 106
# Lesson 16 Vocab: Page 112
# Lesson 17 Vocab: Page 120
# Lesson 18 Vocab: Page 126
# Lesson 19 Vocab: Page 134
# Lesson 20 Vocab: Page 140
# Lesson 21 Vocab: Page 148
# Lesson 22 Vocab: Page 154
# Lesson 23 Vocab: Page 162
# Lesson 24 Vocab: Page 168
# Lesson 25 Vocab: Page 176

# Let's write a script to copy the pages to public/N5-1-25-vocab/
target_dir = "public/N5-1-25-vocab"
os.makedirs(target_dir, exist_ok=True)

# Let's copy page_008 to lesson1.jpg ... etc.
# But wait, let's write a script that checks all pages and extracts the high-resolution scanned pages for every lesson 1 to 25!
