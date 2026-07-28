import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

for filepath in ["lib/n5-lessons-11to15.ts", "lib/n5-lessons-16to20.ts"]:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Replace { japanese: 'X', english: 'Y' } with { japanese: 'X', reading: 'X', english: 'Y' }
    fixed = re.sub(
        r"\{\s*japanese:\s*'([^']*)',\s*english:",
        r"{ japanese: '\1', reading: '\1', english:",
        content
    )
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(fixed)
        
    print(f"Added reading field to grammarSentences in {filepath}!")
