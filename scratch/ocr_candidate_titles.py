import os
from PIL import Image

# Let's inspect the files in scratch/candidate_titles
files = sorted(os.listdir("scratch/candidate_titles"))
print("Candidate title files:", files)

# Let's print out the exact size and metadata of each title image file
for f in files:
    img = Image.open(os.path.join("scratch/candidate_titles", f))
    print(f"{f}: size {img.size}")
