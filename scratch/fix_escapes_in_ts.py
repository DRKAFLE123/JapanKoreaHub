import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

for filepath in ["lib/n5-lessons-11to15.ts", "lib/n5-lessons-16to20.ts", "lib/n5-grammar-guides.ts"]:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Fix double escaped quotes
    fixed = content.replace(r"\\'", r"\'")
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(fixed)
        
    print(f"Cleaned string escapes in {filepath}!")
